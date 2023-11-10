import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { SectorMeetSessionEntityType, SectorMeetSessionLeaderRelationDto, SectorMeetSessionServiceProxy } from '@shared/service-proxies/application/sector-meet-session-proxie';

@Component({
    selector: 'find-leader-sector-meet-session',
    templateUrl: 'find-leader.component.html',
    styleUrls: [
        'find-leader.component.css'
    ]
})
export class FindLeaderSectorMeetSessionComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: false }) dataTable: Table;
    @ViewChild('paginator', { static: false }) paginator: Paginator;

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<SectorMeetSessionLeaderRelationDto> = new EventEmitter<SectorMeetSessionLeaderRelationDto>();

    active: boolean = false;
    filterText: string;
    sectorMeetSessionId: number;

    leaderTypes = {
        none: SectorMeetSessionEntityType.NONE,
        company: SectorMeetSessionEntityType.COMPANY,
        entity: SectorMeetSessionEntityType.ESTATAL_ENTITY,
        civilSociety: SectorMeetSessionEntityType.CIVIL_SOCIETY,
        other: SectorMeetSessionEntityType.OTHER
    }
    
    constructor(_injector: Injector, private _sectorMeetSessionServiceProxy: SectorMeetSessionServiceProxy) {
        super(_injector);
    }

    show(sectorMeetSessionId: number): void {
        this.sectorMeetSessionId = sectorMeetSessionId;
        this.active = true;
        this.modal.show();
    }

    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._sectorMeetSessionServiceProxy.getAllLeaders(
            this.filterText,
            this.sectorMeetSessionId,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event)
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    onShown(): void {

    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    selectSocialConflict(sectorMeetSessionLeader: SectorMeetSessionLeaderRelationDto) {
        this.modalSave.emit(sectorMeetSessionLeader);
        this.close();
    }
}
