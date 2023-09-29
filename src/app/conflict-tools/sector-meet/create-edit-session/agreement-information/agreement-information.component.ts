import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SectorMeetSessionAgreementLocationDto } from '@shared/service-proxies/application/sector-meet-session-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';
import { SectorSessionStateService } from '../../shared/sector-session-state.service';

@Component({
    selector: 'agreement-information',
    templateUrl: 'agreement-information.component.html',
    styleUrls: [
        'agreement-information.component.css'
    ]
})
export class AgreementInformationComponent extends AppComponentBase implements OnInit {

    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Output() addAgreement: EventEmitter<void> = new EventEmitter<void>();
    @Output() editAgreement: EventEmitter<{ index: number, value: SectorMeetSessionAgreementLocationDto }> = new EventEmitter<{ index: number, value: SectorMeetSessionAgreementLocationDto }>();

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

    removeItem(agreement: SectorMeetSessionAgreementLocationDto, index: number) {
        if (agreement.id) {
            agreement.remove = true;
            this.notify.warn('Se ha marcado para eliminar el registro seleccionado');
        } else {
            this.state.sectorMeetSession.agreements.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(agreement: SectorMeetSessionAgreementLocationDto) {
        agreement.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar del registro seleccionado');
    }

    editEvent(value: SectorMeetSessionAgreementLocationDto, index: number) {
        this.editAgreement.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: SectorMeetSessionAgreementLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.state.sectorMeetSession.agreements[event.index] = event.value;
        } else {
            this.state.sectorMeetSession.agreements.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.state.sectorMeetSession.agreements) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}