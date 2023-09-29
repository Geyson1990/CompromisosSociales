import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CrisisCommitteeDto, CrisisCommitteeChannelLocationDto } from '@shared/service-proxies/application/crisis-committee-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'channel-information-crisis-committee',
    templateUrl: 'channel-information.component.html',
    styleUrls: [
        'channel-information.component.css'
    ]
})
export class ChannelInformationCrisisCommitteeComponent extends AppComponentBase implements OnInit {

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

    @Output() addChannel: EventEmitter<void> = new EventEmitter<void>();
    @Output() editChannel: EventEmitter<{ index: number, value: CrisisCommitteeChannelLocationDto }> = new EventEmitter<{ index: number, value: CrisisCommitteeChannelLocationDto }>();

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

    removeItem(channel: CrisisCommitteeChannelLocationDto, index: number) {
        if (channel.id) {
            channel.remove = true;
            this.notify.warn('Se ha marcado para eliminar el canal de comunicación seleccionado');
        } else {
            this.crisisCommittee.channels.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(risk: CrisisCommitteeChannelLocationDto) {
        risk.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar del canal de comunicación seleccionado');
    }

    addEvent() {
        this.addChannel.emit();
    }

    editEvent(value: CrisisCommitteeChannelLocationDto, index: number) {
        this.editChannel.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: CrisisCommitteeChannelLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.crisisCommittee.channels[event.index] = event.value;
        } else {
            this.crisisCommittee.channels.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.crisisCommittee.channels) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}