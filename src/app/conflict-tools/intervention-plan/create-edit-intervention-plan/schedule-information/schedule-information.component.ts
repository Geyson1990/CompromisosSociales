import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { InterventionPlanDto, InterventionPlanScheduleLocationDto } from '@shared/service-proxies/application/intervention-plan-proxie';
import { InterventionPlanEntityType } from '@shared/service-proxies/application/utility-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'schedule-information-intervention-plan',
    templateUrl: 'schedule-information.component.html',
    styleUrls: [
        'schedule-information.component.css'
    ]
})
export class ScheduleInformationInterventionPlanComponent extends AppComponentBase implements OnInit {

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

    @Output() addSchedule: EventEmitter<void> = new EventEmitter<void>();
    @Output() editSchedule: EventEmitter<{ index: number, value: InterventionPlanScheduleLocationDto }> = new EventEmitter<{ index: number, value: InterventionPlanScheduleLocationDto }>();

    types = {
        sector: InterventionPlanEntityType.Sector,
        responsible: InterventionPlanEntityType.Responsible,
        other: InterventionPlanEntityType.Other
    }
    
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

    removeItem(schedule: InterventionPlanScheduleLocationDto, index: number) {
        if (schedule.id) {
            schedule.remove = true;
            this.notify.warn('Se ha marcado para eliminar el cronograma de actividades seleccionado');
        } else {
            this.interventionPlan.schedules.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(schedule: InterventionPlanScheduleLocationDto) {
        schedule.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar del cronograma de actividades seleccionado');
    }

    editEvent(value: InterventionPlanScheduleLocationDto, index: number) {
        this.editSchedule.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: InterventionPlanScheduleLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.interventionPlan.schedules[event.index] = event.value;
        } else {
            this.interventionPlan.schedules.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        this.interventionPlan.schedules = this.interventionPlan.schedules.sort((a, b) => b.scheduleTime.toDate().getTime() - a.scheduleTime.toDate().getTime());
        for (let item of this.interventionPlan.schedules) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}