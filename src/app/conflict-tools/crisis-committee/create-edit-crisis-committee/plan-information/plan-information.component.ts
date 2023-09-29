import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CrisisCommitteeDto, CrisisCommitteePlanLocationDto } from '@shared/service-proxies/application/crisis-committee-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'plan-information-crisis-committee',
    templateUrl: 'plan-information.component.html',
    styleUrls: [
        'plan-information.component.css'
    ]
})
export class PlanInformationCrisisCommitteeComponent extends AppComponentBase implements OnInit {

    private _busy: boolean;
    private _crisisCommittee: CrisisCommitteeDto;

    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Input() get busy(): boolean {
        return this._busy;
    }

    set busy(value: boolean) {
        this._busy = value;
    }

    @Input() get crisisCommittee(): CrisisCommitteeDto {
        return this._crisisCommittee;
    }

    set crisisCommittee(value: CrisisCommitteeDto) {
        this._crisisCommittee = value;
    }

    @Output() addPlan: EventEmitter<void> = new EventEmitter<void>();
    @Output() editPlan: EventEmitter<{ index: number, value: CrisisCommitteePlanLocationDto }> = new EventEmitter<{ index: number, value: CrisisCommitteePlanLocationDto }>();

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

    removeItem(plan: CrisisCommitteePlanLocationDto, index: number) {
        if (plan.id) {
            plan.remove = true;
            this.notify.warn('Se ha marcado para eliminar el escenario seleccionado');
        } else {
            this.crisisCommittee.plans.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(risk: CrisisCommitteePlanLocationDto) {
        risk.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar el escenario seleccionado');
    }

    addEvent() {
        this.addPlan.emit();
    }

    editEvent(value: CrisisCommitteePlanLocationDto, index: number) {
        this.editPlan.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: CrisisCommitteePlanLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.crisisCommittee.plans[event.index] = event.value;
        } else {
            this.crisisCommittee.plans.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.crisisCommittee.plans) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}