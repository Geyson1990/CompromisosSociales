import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { UtilityRecordDto, UtilityServiceProxy, UtilityTerritorialUnitDto } from '@shared/service-proxies/application/utility-proxie';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'find-record',
    templateUrl: 'find-record.component.html',
    styleUrls: [
        'find-record.component.css'
    ]
})
export class FindRecordComponent extends AppComponentBase {

    @ViewChild('findDataTable', { static: false }) dataTable: Table;
    @ViewChild('findPaginator', { static: false }) paginator: Paginator;

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<UtilityRecordDto> = new EventEmitter<UtilityRecordDto>();

    active: boolean = false;
    advancedFiltersAreShown: boolean = false;
    territorialUnit: number = -1;
    conflictCode: string;
    filterText: string;
    filterByDate: boolean;
    recordCode: string;
    territorialUnits: UtilityTerritorialUnitDto[] = [];
    dateRange: moment.Moment[] = [moment().startOf('month'), moment().endOf('day')];

    constructor(_injector: Injector, private _utilityServiceProxy: UtilityServiceProxy) {
        super(_injector);
    }

    ngOnInit(): void {
        this._utilityServiceProxy
            .getTerritorialUnits()
            .pipe(finalize(() => this.hideMainSpinner()))
            .subscribe(response => this.territorialUnits = response.items);
    }

    show(): void {
        this.filterText = undefined;
        this.active = true;
        this.modal.show();
    }

    getData(dataTable: Table, paginator: Paginator, event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            if (!this.paginator)
                paginator.changePage(0);
            else
                this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._utilityServiceProxy.getAllRecords(
            this.filterText,
            this.advancedFiltersAreShown ? this.conflictCode : <any>undefined,
            this.advancedFiltersAreShown ? this.recordCode : <any>undefined,
            this.advancedFiltersAreShown ? this.territorialUnit : <any>undefined,
            this.advancedFiltersAreShown ? this.filterByDate : <any>undefined,
            this.advancedFiltersAreShown ? this.dateRange[0].startOf('day') : <any>undefined,
            this.advancedFiltersAreShown ? this.dateRange[1].endOf('day') : <any>undefined,
            this.primengTableHelper.getSorting(dataTable),
            this.primengTableHelper.getMaxResultCount(paginator, event),
            this.primengTableHelper.getSkipCount(paginator, event)
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

    selectSocialConflict(record: UtilityRecordDto) {
        this.modalSave.emit(record);
        this.close();
    }

}
