import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FileDownloadRequestComponent } from '@shared/component/file-download-request/file-download-request.component';
import { SocialConflictAlertHistoryServiceProxy } from '@shared/service-proxies/application/social-conflict-alert-history-proxie';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'social-conflict-alert-history.component.html',
    styleUrls: [
        'social-conflict-alert-history.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class SocialConflictAlertHistoryComponent extends AppComponentBase implements AfterViewInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @ViewChild('fileDownloadRequest', { static: true }) fileDownloadRequest: FileDownloadRequestComponent;
    
    code: string;
    subject: string;
    template: string;
    to: string;
    copy: string;
    advancedFiltersAreShown: boolean;

    constructor(injector: Injector,
        private _socialConflictAlertHistoryServiceProxy: SocialConflictAlertHistoryServiceProxy,
        private _fileDownloadService: FileDownloadService) {
        super(injector);
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

        this._socialConflictAlertHistoryServiceProxy.getAll(
            this.advancedFiltersAreShown ? this.code : <any>undefined,
            this.advancedFiltersAreShown ? this.subject : <any>undefined,
            this.advancedFiltersAreShown ? this.template : <any>undefined,
            this.advancedFiltersAreShown ? this.to : <any>undefined,
            this.advancedFiltersAreShown ? this.copy : <any>undefined,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event)
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    exportMatrizToExcel() {
        this.fileDownloadRequest.show();
        this._socialConflictAlertHistoryServiceProxy.getMatrizToExcel(
            this.advancedFiltersAreShown ? this.code : <any>undefined,
            this.advancedFiltersAreShown ? this.subject : <any>undefined,
            this.advancedFiltersAreShown ? this.template : <any>undefined,
            this.advancedFiltersAreShown ? this.to : <any>undefined,
            this.advancedFiltersAreShown ? this.copy : <any>undefined,
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

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    resetFilters(): void {
        this.code = '';
        this.subject = '';
        this.template = '';
        this.to = '';
        this.copy = '';
    }
}
