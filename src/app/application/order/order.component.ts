import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FileDownloadRequestComponent } from '@shared/component/file-download-request/file-download-request.component';
import { CompromiseServiceProxy } from '@shared/service-proxies/application/compromise-proxie';
import { OrderServiceProxy } from '@shared/service-proxies/application/order-proxie';
import { UtilityServiceProxy, UtilityTerritorialUnitDto } from '@shared/service-proxies/application/utility-proxie';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as moment from 'moment';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'order.component.html',
    styleUrls: [
        'order.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class OrderComponent extends AppComponentBase implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @ViewChild('fileDownloadRequest', { static: true }) fileDownloadRequest: FileDownloadRequestComponent;
    
    orderType: number = -1;
    socialConflictCode: string;
    territorialUnit: number = -1;
    territorialUnits: UtilityTerritorialUnitDto[] = [];
    dateRange: Date[] = [moment().startOf('month').toDate(), moment().endOf('day').toDate()];

    advancedFiltersAreShown: boolean = false;
    filterText: string;
    filterByDate: boolean;

    constructor(_injector: Injector, private _utilityServiceProxy: UtilityServiceProxy, private _orderServiceProxy: OrderServiceProxy, private _fileDownloadService: FileDownloadService) {
        super(_injector);
    }

    ngOnInit() {
        this._utilityServiceProxy.getTerritorialUnits().subscribe(response => {
            this.territorialUnits = response.items;
        });
    }

    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._orderServiceProxy.getAll(
            this.filterText,
            this.advancedFiltersAreShown ? this.orderType : <any>undefined,
            this.advancedFiltersAreShown ? this.socialConflictCode : <any>undefined,
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

    createOrder() {
        this.router.navigate(['/app/application/create-edit-order']);
    }

    editOrder(order: any) {
        this.router.navigate(['/app/application/create-edit-order'], { queryParams: { id: order.id } });
    }

    deleteOrder(compromise: any) {

    }

    exportMatrixToExcel(): void {
        this.fileDownloadRequest.show();
        this._orderServiceProxy.getMatrixToExcel(
            this.filterText,
            this.advancedFiltersAreShown ? this.orderType : <any>undefined,
            this.advancedFiltersAreShown ? this.socialConflictCode : <any>undefined,
            this.advancedFiltersAreShown ? this.territorialUnit : <any>undefined,
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
}