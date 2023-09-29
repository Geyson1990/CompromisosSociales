import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { InterventionPlanDto, InterventionPlanRiskLocationDto } from '@shared/service-proxies/application/intervention-plan-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'risk-information-intervention-plan',
    templateUrl: 'risk-information.component.html',
    styleUrls: [
        'risk-information.component.css'
    ]
})
export class RiskInformationInterventionPlanComponent extends AppComponentBase implements OnInit {

    private _busy: boolean;
    private _interventionPlan: InterventionPlanDto;

    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Input() get busy(): boolean {
        return this._busy;
    }

    set busy(value: boolean) {
        this._busy = value;
    }

    @Input() get interventionPlan(): InterventionPlanDto {
        return this._interventionPlan;
    }

    set interventionPlan(value: InterventionPlanDto) {
        this._interventionPlan = value;
    }

    @Output() addRisk: EventEmitter<void> = new EventEmitter<void>();
    @Output() editRisk: EventEmitter<{ index: number, value: InterventionPlanRiskLocationDto }> = new EventEmitter<{ index: number, value: InterventionPlanRiskLocationDto }>();

    private skipCount: number;
    private maxResultCount: number;

    constructor(_injector: Injector) {
        super(_injector);
        this.primengTableHelper.defaultRecordsCountPerPage = 5;
        this.skipCount = 0;
        this.maxResultCount = this.primengTableHelper.defaultRecordsCountPerPage;
    }

    ngOnInit(): void {
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    getData(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    removeItem(risk: InterventionPlanRiskLocationDto, index: number) {
        if (risk.id) {
            risk.remove = true;
            this.notify.warn('Se ha marcado para eliminar el nivel de riesgo seleccionado');
        } else {
            this.interventionPlan.risks.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(risk: InterventionPlanRiskLocationDto) {
        risk.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar del nivel de riesgo seleccionado');
    }

    addEvent() {
        if(this.interventionPlan.risks.length > 0) {
            this.message.info('Aviso', 'Solo puede agregar un nivel de riesgo por plan de intervención');
            return;
        }
        
        this.addRisk.emit();
    }

    editEvent(value: InterventionPlanRiskLocationDto, index: number) {
        this.editRisk.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: InterventionPlanRiskLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.interventionPlan.risks[event.index] = event.value;
        } else {
            this.interventionPlan.risks.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.interventionPlan.risks) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}