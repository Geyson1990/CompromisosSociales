import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SectorMeetSessionEntityType, SectorMeetSessionSummaryLocationDto } from '@shared/service-proxies/application/sector-meet-session-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';
import { SectorSessionStateService } from '../../shared/sector-session-state.service';

@Component({
    selector: 'summary-information',
    templateUrl: 'summary-information.component.html',
    styleUrls: [
        'summary-information.component.css'
    ]
})
export class SummaryInformationComponent extends AppComponentBase implements OnInit {

    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Output() addSummary: EventEmitter<void> = new EventEmitter<void>();
    @Output() editSummary: EventEmitter<{ index: number, value: SectorMeetSessionSummaryLocationDto }> = new EventEmitter<{ index: number, value: SectorMeetSessionSummaryLocationDto }>();

    state: SectorSessionStateService;
    
    leaderTypes = {
        none: SectorMeetSessionEntityType.NONE,
        company: SectorMeetSessionEntityType.COMPANY,
        entity: SectorMeetSessionEntityType.ESTATAL_ENTITY,
        civilSociety: SectorMeetSessionEntityType.CIVIL_SOCIETY,
        other: SectorMeetSessionEntityType.OTHER
    }
    
    private skipCount: number;
    private maxResultCount: number;
    public IsDescriptionSocialConflict: boolean = false;

    constructor(_injector: Injector) {
        super(_injector);
        this.state = _injector.get(SectorSessionStateService);
        this.primengTableHelper.defaultRecordsCountPerPage = 5;
        this.skipCount = 0;
        this.maxResultCount = this.primengTableHelper.defaultRecordsCountPerPage;
    }

    ngOnInit(): void {
        this.formatPagination(this.skipCount, this.maxResultCount);
        this.IsDescriptionSocialConflict = this.state.sectorMeetSession.isDescriptionSocialConflict;
    }

    getData(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    removeItem(summary: SectorMeetSessionSummaryLocationDto, index: number) {
        if (summary.id) {
            summary.remove = true;
            this.notify.warn('Se ha marcado para eliminar el registro seleccionado');
        } else {
            this.state.sectorMeetSession.summaries.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(summary: SectorMeetSessionSummaryLocationDto) {
        summary.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar del registro seleccionado');
    }

    editEvent(value: SectorMeetSessionSummaryLocationDto, index: number) {
        this.editSummary.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: SectorMeetSessionSummaryLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.state.sectorMeetSession.summaries[event.index] = event.value;
        } else {
            this.state.sectorMeetSession.summaries.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.state.sectorMeetSession.summaries) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}