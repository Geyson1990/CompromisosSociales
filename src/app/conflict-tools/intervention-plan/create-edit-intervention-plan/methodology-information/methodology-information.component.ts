import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { InterventionPlanDto, InterventionPlanMethodologyLocationDto } from '@shared/service-proxies/application/intervention-plan-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'methodology-information-intervention-plan',
    templateUrl: 'methodology-information.component.html',
    styleUrls: [
        'methodology-information.component.css'
    ]
})
export class MethodologyInformationInterventionPlanComponent extends AppComponentBase implements OnInit {

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

    @Output() addMethodology: EventEmitter<void> = new EventEmitter<void>();
    @Output() editMethodology: EventEmitter<{ index: number, value: InterventionPlanMethodologyLocationDto }> = new EventEmitter<{ index: number, value: InterventionPlanMethodologyLocationDto }>();

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

    removeItem(methodology: InterventionPlanMethodologyLocationDto, index: number) {
        if (methodology.id) {
            methodology.remove = true;
            this.notify.warn('Se ha marcado para eliminar el nivel de riesgo seleccionado');
        } else {
            this.interventionPlan.methodologies.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(methodology: InterventionPlanMethodologyLocationDto) {
        methodology.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar del nivel de riesgo seleccionado');
    }

    editEvent(value: InterventionPlanMethodologyLocationDto, index: number) {
        this.editMethodology.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: InterventionPlanMethodologyLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.interventionPlan.methodologies[event.index] = event.value;
        } else {
            this.interventionPlan.methodologies.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.interventionPlan.methodologies) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}