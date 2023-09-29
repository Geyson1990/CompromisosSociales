import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CrisisCommitteeDto, CrisisCommitteeMessageLocationDto } from '@shared/service-proxies/application/crisis-committee-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'message-information-crisis-committee',
    templateUrl: 'message-information.component.html',
    styleUrls: [
        'message-information.component.css'
    ]
})
export class MessageInformationCrisisCommitteeComponent extends AppComponentBase implements OnInit {

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

    @Output() addMessage: EventEmitter<void> = new EventEmitter<void>();
    @Output() editMessage: EventEmitter<{ index: number, value: CrisisCommitteeMessageLocationDto }> = new EventEmitter<{ index: number, value: CrisisCommitteeMessageLocationDto }>();

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

    removeItem(message: CrisisCommitteeMessageLocationDto, index: number) {
        if (message.id) {
            message.remove = true;
            this.notify.warn('Se ha marcado para eliminar el mensaje seleccionado');
        } else {
            this.crisisCommittee.messages.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(risk: CrisisCommitteeMessageLocationDto) {
        risk.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar del mensaje seleccionado');
    }

    addEvent() {
        this.addMessage.emit();
    }

    editEvent(value: CrisisCommitteeMessageLocationDto, index: number) {
        this.editMessage.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: CrisisCommitteeMessageLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.crisisCommittee.messages[event.index] = event.value;
        } else {
            this.crisisCommittee.messages.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.crisisCommittee.messages) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}