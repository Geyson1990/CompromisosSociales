import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { InterventionPlanDto, InterventionPlanStateLocationDto } from '@shared/service-proxies/application/intervention-plan-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'state-information-intervention-plan',
    templateUrl: 'state-information.component.html',
    styleUrls: [
        'state-information.component.css'
    ]
})
export class StateInformationInterventionPlanComponent extends AppComponentBase implements OnInit {

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

    @Output() addState: EventEmitter<void> = new EventEmitter<void>();
    @Output() editState: EventEmitter<{ index: number, value: InterventionPlanStateLocationDto }> = new EventEmitter<{ index: number, value: InterventionPlanStateLocationDto }>();

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

    removeItem(state: InterventionPlanStateLocationDto, index: number) {
        if (state.id) {
            state.remove = true;
            this.notify.warn('Se ha marcado para eliminar el nivel de riesgo seleccionado');
        } else {
            this.interventionPlan.states.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(risk: InterventionPlanStateLocationDto) {
        risk.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar del nivel de riesgo seleccionado');
    }

    editEvent(value: InterventionPlanStateLocationDto, index: number) {
        this.editState.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: InterventionPlanStateLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.interventionPlan.states[event.index] = event.value;
        } else {
            this.interventionPlan.states.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.interventionPlan.states) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}