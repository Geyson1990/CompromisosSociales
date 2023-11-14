import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CompromiseDto, CompromiseLabelLocationDto } from '@shared/service-proxies/application/compromise-proxie';
import { SectorMeetSessionAgreementDto } from '@shared/service-proxies/application/sector-meet-session-agreement-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'compromise-general-information',
    templateUrl: 'general-information.component.html',
    styleUrls: [
        '../create-edit-compromise.component.css'
    ]
})
export class CompromiseGeneralInformationComponent extends AppComponentBase implements OnInit {
 
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    
    @Input() compromise: CompromiseDto;
    @Input() labels: CompromiseLabelLocationDto[];
    @Input() conflicts: SectorMeetSessionAgreementDto[];
    @Input() type: number;
    @Output() listConflictPending: EventEmitter<void> = new EventEmitter<void>();

    @Output() openFindRecord: EventEmitter<void> = new EventEmitter<void>();

    private skipCount: number = 0;
    private maxResultCount: number = 0;

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
    
    showFindRecord() {
        
        this.openFindRecord.emit();
    }

    listDataConflicts() {
        this.listConflictPending.emit();
    }

    onWomanCompromiseChange(event: any) {
        this.compromise.womanCompromise = (event.target.value == 'true');
    }
    
    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.compromise.compromiseLocations) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}