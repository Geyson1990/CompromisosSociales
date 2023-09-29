import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CrisisCommitteeDto, CrisisCommitteeTaskLocationDto } from '@shared/service-proxies/application/crisis-committee-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'task-information-crisis-committee',
    templateUrl: 'task-information.component.html',
    styleUrls: [
        'task-information.component.css'
    ]
})
export class TaskInformationCrisisCommitteeComponent extends AppComponentBase implements OnInit {

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

    @Output() addTask: EventEmitter<void> = new EventEmitter<void>();
    @Output() editTask: EventEmitter<{ index: number, value: CrisisCommitteeTaskLocationDto }> = new EventEmitter<{ index: number, value: CrisisCommitteeTaskLocationDto }>();

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

    removeItem(task: CrisisCommitteeTaskLocationDto, index: number) {
        if (task.id) {
            task.remove = true;
            this.notify.warn('Se ha marcado para eliminar la tarea seleccionada');
        } else {
            this.crisisCommittee.tasks.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(risk: CrisisCommitteeTaskLocationDto) {
        risk.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar de la tarea seleccionada');
    }

    addEvent() {
        this.addTask.emit();
    }

    editEvent(value: CrisisCommitteeTaskLocationDto, index: number) {
        this.editTask.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: CrisisCommitteeTaskLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.crisisCommittee.tasks[event.index] = event.value;
        } else {
            this.crisisCommittee.tasks.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.crisisCommittee.tasks) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}