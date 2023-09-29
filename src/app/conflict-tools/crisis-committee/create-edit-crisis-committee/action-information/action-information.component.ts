import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CrisisCommitteeDto, CrisisCommitteeActionLocationDto } from '@shared/service-proxies/application/crisis-committee-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'action-information-crisis-committee',
    templateUrl: 'action-information.component.html',
    styleUrls: [
        'action-information.component.css'
    ]
})
export class ActionInformationCrisisCommitteeComponent extends AppComponentBase implements OnInit {

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

    @Output() addAction: EventEmitter<void> = new EventEmitter<void>();
    @Output() editAction: EventEmitter<{ index: number, value: CrisisCommitteeActionLocationDto }> = new EventEmitter<{ index: number, value: CrisisCommitteeActionLocationDto }>();

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

    removeItem(action: CrisisCommitteeActionLocationDto, index: number) {
        if (action.id) {
            action.remove = true;
            this.notify.warn('Se ha marcado para eliminar la acción seleccionada');
        } else {
            this.crisisCommittee.actions.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(risk: CrisisCommitteeActionLocationDto) {
        risk.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar de la acción seleccionada');
    }

    addEvent() {
        this.addAction.emit();
    }

    editEvent(value: CrisisCommitteeActionLocationDto, index: number) {
        this.editAction.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: CrisisCommitteeActionLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.crisisCommittee.actions[event.index] = event.value;
        } else {
            this.crisisCommittee.actions.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.crisisCommittee.actions) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}