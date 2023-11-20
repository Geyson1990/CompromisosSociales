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
    templateUrl: 'day-alert.component.html',
    styleUrls: [
        'day-alert.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class DayAlertComponent extends AppComponentBase {

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

        this._recordServiceProxy.getAllPersons(
            this.filterText,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event)
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });

    }

    getType(type: number) {
       let  retorno = '';
       if ( type === 0) {
        retorno = 'Ninguno';
       }
       if ( type === 1) {
        retorno = 'Coordinador';
       }
       if ( type === 2) {
        retorno = 'Administrativo';
       }
       return retorno;
    }

    active(active:string, id: number) {
        this._recordServiceProxy
        .createSendAlert({
            "id": id
          })
        .subscribe(() => {
            this.notify.success('Registro '+active+' satisfactoriamente');
            this.reloadPage();
        });
    }

    getState(state: boolean) {
    return state === true ? 'Disponible' : 'No disponible'
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

}