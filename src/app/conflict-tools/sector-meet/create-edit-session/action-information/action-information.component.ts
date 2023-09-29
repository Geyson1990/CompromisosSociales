import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SectorMeetSessionActionLocationDto } from '@shared/service-proxies/application/sector-meet-session-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';
import { SectorSessionStateService } from '../../shared/sector-session-state.service';

@Component({
    selector: 'action-information',
    templateUrl: 'action-information.component.html',
    styleUrls: [
        'action-information.component.css'
    ]
})
export class ActionInformationComponent extends AppComponentBase implements OnInit {

    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Output() addAction: EventEmitter<void> = new EventEmitter<void>();
    @Output() editAction: EventEmitter<{ index: number, value: SectorMeetSessionActionLocationDto }> = new EventEmitter<{ index: number, value: SectorMeetSessionActionLocationDto }>();

    state: SectorSessionStateService;
    
    private skipCount: number;
    private maxResultCount: number;

    constructor(_injector: Injector) {
        super(_injector);
        this.state = _injector.get(SectorSessionStateService);
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

    removeItem(action: SectorMeetSessionActionLocationDto, index: number) {
        if (action.id) {
            action.remove = true;
            this.notify.warn('Se ha marcado para eliminar el registro seleccionado');
        } else {
            this.state.sectorMeetSession.actions.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(action: SectorMeetSessionActionLocationDto) {
        action.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar del registro seleccionado');
    }

    editEvent(value: SectorMeetSessionActionLocationDto, index: number) {
        this.editAction.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: SectorMeetSessionActionLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.state.sectorMeetSession.actions[event.index] = event.value;
        } else {
            this.state.sectorMeetSession.actions.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.state.sectorMeetSession.actions) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}