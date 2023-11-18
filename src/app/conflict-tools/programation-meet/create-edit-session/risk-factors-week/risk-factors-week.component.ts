import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { SectorSessionStateService } from '@app/conflict-tools/sector-meet/shared/sector-session-state.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SectorMeetSessionCriticalAspectLocationDto } from '@shared/service-proxies/application/sector-meet-session-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'risk-factors-week',
    templateUrl: 'risk-factors-week.component.html',
    styleUrls: [
        'risk-factors-week.component.css'
    ]
})
export class RiskFactorWeekComponent extends AppComponentBase implements OnInit {

    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Output() addRiskFactorWeek: EventEmitter<void> = new EventEmitter<void>();
    @Output() editRiskFactorWeek: EventEmitter<{ index: number, value: SectorMeetSessionCriticalAspectLocationDto }> = new EventEmitter<{ index: number, value: SectorMeetSessionCriticalAspectLocationDto }>();

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

    removeItem(criticalaspect: SectorMeetSessionCriticalAspectLocationDto, index: number) {
        if (criticalaspect.id) {
            criticalaspect.remove = true;
            this.notify.warn('Se ha marcado para eliminar el registro seleccionado');
        } else {
            this.state.sectorMeetSession.riskFactors.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(criticalaspect: SectorMeetSessionCriticalAspectLocationDto) {
        criticalaspect.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar del registro seleccionado');
    }

    editEvent(value: SectorMeetSessionCriticalAspectLocationDto, index: number) {
        this.editRiskFactorWeek.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: SectorMeetSessionCriticalAspectLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.state.sectorMeetSession.riskFactors[event.index] = event.value;
        } else {
            this.state.sectorMeetSession.riskFactors.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.state.sectorMeetSession.riskFactors) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}