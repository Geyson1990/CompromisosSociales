import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ProspectiveRiskDto, ProspectiveRiskHistoryDto, ProspectiveRiskServiceProxy, ProspectiveRiskStaticVariableOptionDetailDto } from '@shared/service-proxies/application/prospective-risk-proxie';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'create-edit-prospective-risk.component.html',
    styleUrls: [
        'create-edit-prospective-risk.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class CreateEditProspectiveRiskComponent extends AppComponentBase implements OnInit {

    id: number;
    loaded: boolean = false;
    busy: boolean = false;
    editing: boolean = false;
    tabIndex: number = 0;

    item: ProspectiveRiskDto;
    hasHistory: boolean = false;
    history: ProspectiveRiskHistoryDto;

    constructor(_injector: Injector, private route: ActivatedRoute, private _prospectiveRiskServiceProxy: ProspectiveRiskServiceProxy) {
        super(_injector);
    }

    ngOnInit() {
        const parameter = this.route.snapshot.paramMap.get('provinceId');
        this.id = parameter ? +parameter.replace('[^0-9]', '') : undefined;

        if (this.id && !this.isGranted('Pages.Management.ProspectiveRisk.Edit')) {
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción');
            this.backButtonPressed();
            return;
        }

        if (this.id) {
            this._prospectiveRiskServiceProxy.get(this.id).subscribe((response) => {
                this.formatDetails(response);
                this.formatRisk(response);
                this.item = response;
                this.loaded = true;
            }, () => this.backButtonPressed());
        } else {
            this.backButtonPressed();
        }
    }

    save() {

        if(!this.item.evaluatedTime) {
            this.message.info('La fecha de análisis es obligatoria');
            return;
        }

        if (this.busy)
            return;
            
        this.busy = true;
        this.showMainSpinner('Guardando información, por favor espere...');
        this._prospectiveRiskServiceProxy.createOrUpdate(this.item).pipe(finalize(() => setTimeout(() => {
            this.busy = false;
            this.hideMainSpinner();
        }, 1000))).subscribe(() => {
            this.notify.success('Actualizado satisfactoriamente');
            this.ngOnInit();
        });
    }

    showHistory(item: ProspectiveRiskHistoryDto) {
        this.history = item;
        this.hasHistory = true;
        this.tabIndex = 2;
    }

    historyLoadError() {
        this.history = undefined;
        this.hasHistory = false;
        this.tabIndex = 1;
    }

    formatInformation(item: ProspectiveRiskDto) {
        this.formatRisk(item);
    }

    backButtonPressed() {
        this.router.navigate(['/app/management/prospective-risk']);
    }

    private formatDetails(item: ProspectiveRiskDto) {
        for (let variable of item.variables) {
            for (let option of variable.options) {
                let detailValue: { id: number, value: number } = undefined;
                const index: number = item.details.findIndex(p => p.staticVariableOptionId == option.id);

                if (index != -1) {
                    const value: number = item.details[index].value;
                    detailValue = this.formatOptionDetailId(option.details, value);
                } else {
                    detailValue = this.formatOptionDetailId(option.details, 0);
                }

                option.relationId = detailValue?.id;
                option.relationValue = detailValue?.value;
            }
        }
    }

    private formatOptionDetailId(details: ProspectiveRiskStaticVariableOptionDetailDto[], value: number): { id: number, value: number } {
        if(details.length > 0) {
            const length: number = details.length;
            const max = details.reduce((prev, current) => (prev.value > current.value) ? prev : current);
            const min = details.reduce((prev, current) => (prev.value < current.value) ? prev : current);
    
            for (let i: number = 0; i < length; i++) {
                const initialValue: number = typeof details[i - 1] === 'undefined' ? details[i].value : details[i - 1].value;
                const endValue: number = details[i].value;
    
                if (value > initialValue && value <= endValue)
                    return { id: details[i].id, value: value };
            }
    
            if (value >= max.value)
                return { id: max.id, value: value };
    
            return min.value == 0 ? { id: min.id, value: value } : undefined;
        } else {
            return undefined;
        }
    }

    private formatRisk(item: ProspectiveRiskDto) {

        let weight: number = 0;
        let risk: number = 0;

        for (let variable of item.variables) {
            for (let option of variable.options) {
                weight += option.value;
                risk += option.relationValue * option.value;
            }
        }

        risk = this.roundNumber((weight > 0 ? (risk / weight) * item.fixRate : 0), 2);

        item.value = risk;
    }
}