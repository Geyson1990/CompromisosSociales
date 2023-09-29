import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { InterventionPlanDto, InterventionPlanSolutionLocationDto } from '@shared/service-proxies/application/intervention-plan-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'solution-information-intervention-plan',
    templateUrl: 'solution-information.component.html',
    styleUrls: [
        'solution-information.component.css'
    ]
})
export class SolutionInformationInterventionPlanComponent extends AppComponentBase implements OnInit {

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

    @Output() addSolution: EventEmitter<void> = new EventEmitter<void>();
    @Output() editSolution: EventEmitter<{ index: number, value: InterventionPlanSolutionLocationDto }> = new EventEmitter<{ index: number, value: InterventionPlanSolutionLocationDto }>();

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

    removeItem(solution: InterventionPlanSolutionLocationDto, index: number) {
        if (solution.id) {
            solution.remove = true;
            this.notify.warn('Se ha marcado para eliminar la evaluación de resultados seleccionado');
        } else {
            this.interventionPlan.solutions.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(risk: InterventionPlanSolutionLocationDto) {
        risk.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar la evaluación de resultados seleccionado');
    }

    editEvent(value: InterventionPlanSolutionLocationDto, index: number) {
        this.editSolution.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: InterventionPlanSolutionLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.interventionPlan.solutions[event.index] = event.value;
        } else {
            this.interventionPlan.solutions.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.interventionPlan.solutions) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}