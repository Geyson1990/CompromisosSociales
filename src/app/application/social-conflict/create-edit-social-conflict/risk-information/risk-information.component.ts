import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictDto, SocialConflictRiskLocationDto } from '@shared/service-proxies/application/social-conflict-proxie';
import { LazyLoadEvent, Paginator, SelectItem } from 'primeng';

@Component({
    selector: 'risk-information-social-conflict',
    templateUrl: 'risk-information.component.html',
    styleUrls: [
        'risk-information.component.css'
    ]
})
export class RiskInformationSocialConflictComponent extends AppComponentBase implements OnInit {

    private _busy: boolean;
    private _socialConflict: SocialConflictDto;
    private _verificationEnabled: boolean = false;

    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Input() get busy(): boolean {
        return this._busy;
    }

    set busy(value: boolean) {
        this._busy = value;
    }

    @Input() get socialConflict(): SocialConflictDto {
        return this._socialConflict;
    }

    set socialConflict(value: SocialConflictDto) {
        this._socialConflict = value;
    }

    @Input() hasPermission: boolean;
    
    @Output() addRisk: EventEmitter<void> = new EventEmitter<void>();
    @Output() editRisk: EventEmitter<{ index: number, value: SocialConflictRiskLocationDto }> = new EventEmitter<{ index: number, value: SocialConflictRiskLocationDto }>();

    options: SelectItem[] = [
        { label: 'Aprobado', value: 'true', styleClass: 'state-aproved' },
        { label: 'No aprobado', value: 'false', styleClass: 'state-not-aproved' }
    ];

    get verificationEnabled() {
        return this._verificationEnabled;
    }

    private skipCount: number;
    private maxResultCount: number;

    constructor(_injector: Injector) {
        super(_injector);
        this.primengTableHelper.defaultRecordsCountPerPage = 5;
        this.skipCount = 0;
        this.maxResultCount = this.primengTableHelper.defaultRecordsCountPerPage;
        this._verificationEnabled = this.permission.isGranted('Pages.Application.SocialConflict.Verification');
    }

    ngOnInit(): void {
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    getData(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    removeItem(risk: SocialConflictRiskLocationDto, index: number) {
        if (risk.id) {
            risk.remove = true;
            this.notify.warn('Se ha marcado para eliminar el nivel de riesgo seleccionado');
        } else {
            this.socialConflict.risks.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(risk: SocialConflictRiskLocationDto) {
        risk.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar del nivel de riesgo seleccionado');
    }

    editEvent(value: SocialConflictRiskLocationDto, index: number) {
        this.editRisk.emit({ index: index, value: value });
    }

    change(rowIndex: number) {
        this.socialConflict.risks[rowIndex].verificationChange = true;
    }

    addOrUpdateItem(event: { value: SocialConflictRiskLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.socialConflict.risks[event.index] = event.value;
        } else {
            this.socialConflict.risks.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        this.socialConflict.risks = this.socialConflict.risks.sort((a, b) => b.riskTime.toDate().getTime() - a.riskTime.toDate().getTime());
        for (let item of this.socialConflict.risks) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}