import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FileDownloadRequestComponent } from '@shared/component/file-download-request/file-download-request.component';
import { CompromiseDto, CompromiseServiceProxy } from '@shared/service-proxies/application/compromise-proxie';
import {UtilityServiceProxy, UtilityTerritorialUnitDto } from '@shared/service-proxies/application/utility-proxie';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as moment from 'moment';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'compromise.component.html',
    styleUrls: [
        'compromise.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class CompromiseComponent extends AppComponentBase implements OnInit {
   
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @ViewChild('fileDownloadRequest', { static: true }) fileDownloadRequest: FileDownloadRequestComponent;
    
    compromiseType: number = -1;
    compromiseCode: string;
    recordCode: string;
    socialCode: string;
    territorialUnit: number = -1;
    territorialUnits: UtilityTerritorialUnitDto[] = [];
    selectedCompromises!: any;
    filterByDate: boolean = false;
    dateRange: Date[] = [moment().startOf('month').toDate(), moment().endOf('day').toDate()];

    advancedFiltersAreShown: boolean = false;
    filterText: string;

    constructor(_injector: Injector, private _utilityServiceProxy: UtilityServiceProxy, private _compromiseServiceProxy: CompromiseServiceProxy, private _fileDownloadService: FileDownloadService) {
        super(_injector);
    }

    ngOnInit(): void {
        this._utilityServiceProxy
            .getTerritorialUnits()
            .pipe(finalize(() => this.hideMainSpinner()))
            .subscribe(response => this.territorialUnits = response.items);
    }

    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._compromiseServiceProxy.getAll(
            this.filterText,
            this.advancedFiltersAreShown ? this.compromiseType : <any>undefined,
            this.advancedFiltersAreShown ? this.compromiseCode : <any>undefined,
            this.advancedFiltersAreShown ? this.recordCode : <any>undefined,
            this.advancedFiltersAreShown ? this.socialCode : <any>undefined,
            this.advancedFiltersAreShown ? this.territorialUnit : <any>undefined,
            this.advancedFiltersAreShown ? this.filterByDate : <any>undefined,
            this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[0]).startOf('day') : <any>undefined,
            this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[1]).endOf('day') : <any>undefined,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event)
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    createCompromise() {
        this.router.navigate(['/app/application/create-edit-compromises']);
    }

    editCompromise(compromise: CompromiseDto) {
        this.router.navigate(['/app/application/create-edit-compromises'], { queryParams: { id: compromise.id } });
    }

    deleteCompromise(compromise: CompromiseDto) {
        this.message.confirm(`¿Esta seguro de eliminar de la bandeja de compromisos el caso conflictivo ${compromise.code}?`, 'Aviso', confirm => {
            if(confirm) {
                this._compromiseServiceProxy
                .delete(compromise.id)
                .subscribe(() => {
                    this.reloadPage();
                    this.notify.error('Eliminado satisfactoriamente');
                });
            }
        });
    }

    exportMatrixToExcel(): void {
        this.fileDownloadRequest.show();
        this._compromiseServiceProxy.getMatrixToExcel(
            this.filterText,
            this.advancedFiltersAreShown ? this.compromiseType : <any>undefined,
            this.advancedFiltersAreShown ? this.compromiseCode : <any>undefined,
            this.advancedFiltersAreShown ? this.recordCode : <any>undefined,
            this.advancedFiltersAreShown ? this.socialCode : <any>undefined,
            this.advancedFiltersAreShown ? this.territorialUnit : <any>undefined,
            this.advancedFiltersAreShown ? this.filterByDate : <any>undefined,
            this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[0]).startOf('day') : <any>undefined,
            this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[1]).endOf('day') : <any>undefined,
            this.primengTableHelper.getSorting(this.dataTable)
        ).pipe(finalize(() => {
            this.primengTableHelper.hideLoadingIndicator();
            this.fileDownloadRequest.hide();
        })).subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
        });
    }

    exportAllToExcel(): void {
        this.fileDownloadRequest.show();
        this._compromiseServiceProxy.getAllToExcel(
            this.filterText,
            this.advancedFiltersAreShown ? this.compromiseType : <any>undefined,
            this.advancedFiltersAreShown ? this.compromiseCode : <any>undefined,
            this.advancedFiltersAreShown ? this.recordCode : <any>undefined,
            this.advancedFiltersAreShown ? this.socialCode : <any>undefined,
            this.advancedFiltersAreShown ? this.territorialUnit : <any>undefined,
            this.advancedFiltersAreShown ? this.filterByDate : <any>undefined,
            this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[0]).startOf('day') : <any>undefined,
            this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[1]).endOf('day') : <any>undefined,
            this.primengTableHelper.getSorting(this.dataTable)
        ).pipe(finalize(() => {
            this.primengTableHelper.hideLoadingIndicator();
            this.fileDownloadRequest.hide();
        })).subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
        });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    deleteRecords() {
        console.log("compromises",this.selectedCompromises);
    }

}