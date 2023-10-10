import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FileDownloadRequestComponent } from '@shared/component/file-download-request/file-download-request.component';
import { RecordDto, RecordServiceProxy } from '@shared/service-proxies/application/record-proxie';
import { UtilityServiceProxy, UtilityTerritorialUnitDto } from '@shared/service-proxies/application/utility-proxie';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as moment from 'moment';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'record.component.html',
    styleUrls: [
        'record.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class RecordComponent extends AppComponentBase implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @ViewChild('fileDownloadRequest', { static: true }) fileDownloadRequest: FileDownloadRequestComponent;
    
    advancedFiltersAreShown: boolean = false;
    territorialUnit: number = -1;
    conflictCode: string;
    filterText: string;
    recordCode: string;
    territorialUnits: UtilityTerritorialUnitDto[] = [];
    dateRange: Date[] = [moment().startOf('month').toDate(), moment().endOf('day').toDate()];
    filterByDate: boolean;

    constructor(_injector: Injector, private _utilityServiceProxy: UtilityServiceProxy, private _recordServiceProxy: RecordServiceProxy, private _fileDownloadService: FileDownloadService) {
        super(_injector);
    }

    ngOnInit(): void {
        this._utilityServiceProxy
            .getTerritorialUnits()
            .pipe(finalize(() => this.hideMainSpinner()))
            .subscribe(response => this.territorialUnits = response.items);
    }

    ngAfterViewInit(): void {
        this.primengTableHelper.adjustScroll(this.dataTable);
    }

    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._recordServiceProxy.getAll(
            this.filterText,
            this.advancedFiltersAreShown ? this.conflictCode : <any>undefined,
            this.advancedFiltersAreShown ? this.recordCode : <any>undefined,
            this.advancedFiltersAreShown ? this.territorialUnit : <any>undefined,
            this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[0]).startOf('day') : <any>undefined,
            this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[1]).endOf('day') : <any>undefined,
            this.advancedFiltersAreShown ? this.filterByDate : <any>undefined,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event)
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });

    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    exportMatrixToExcel(): void {
        this.fileDownloadRequest.show();
        this._recordServiceProxy.getMatrixToExcel(
            this.filterText,
            this.advancedFiltersAreShown ? this.conflictCode : <any>undefined,
            this.advancedFiltersAreShown ? this.recordCode : <any>undefined,
            this.advancedFiltersAreShown ? this.territorialUnit : <any>undefined,
            this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[0]).startOf('day') : <any>undefined,
            this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[1]).endOf('day') : <any>undefined,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, undefined),
            this.primengTableHelper.getSkipCount(this.paginator, undefined)
        ).pipe(finalize(() => {
            this.primengTableHelper.hideLoadingIndicator();
            this.fileDownloadRequest.hide();
        })).subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
        });
    }

    createRecord() {
        this.router.navigate(['/app/application/create-edit-record']);
    }

    editRecord(record: RecordDto) {
        this.router.navigate(['/app/application/create-edit-record'], { queryParams: { id: record.id } });
    }

    deleteRecord(record: RecordDto) {
        this.message.confirm(`¿Esta seguro de eliminar el acta Nº ${record.code}?`, 'Aviso',
            (isConfirmed) => {
                if (isConfirmed) {
                    this.showMainSpinner('Actualizando información, por favor espere...');
                    this._recordServiceProxy
                        .delete(record.id)
                        .pipe(finalize(() => this.hideMainSpinner()))
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.error('Eliminado satisfactoriamente');
                        });
                }
            }
        );
    }

    exportActasMatrixToZip(): void {
        this.fileDownloadRequest.show();
        this._recordServiceProxy.getActasZip(
            this.filterText,
            this.advancedFiltersAreShown ? this.conflictCode : <any>undefined,
            this.advancedFiltersAreShown ? this.recordCode : <any>undefined,
            this.advancedFiltersAreShown ? this.territorialUnit : <any>undefined,
            this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[0]).startOf('day') : <any>undefined,
            this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[1]).endOf('day') : <any>undefined,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, undefined),
            this.primengTableHelper.getSkipCount(this.paginator, undefined)
        ).pipe(finalize(() => {
            this.primengTableHelper.hideLoadingIndicator();
            this.fileDownloadRequest.hide();
        })).subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
        });
    }
}