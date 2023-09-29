import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FileDownloadRequestComponent } from '@shared/component/file-download-request/file-download-request.component';
import { FileDownloadComponent } from '@shared/component/file-download/file-download.component';
import { ReportServiceProxy, ReportType } from '@shared/service-proxies/application/report-proxie';
import { SocialConflictDto, SocialConflictServiceProxy, SocialConflictTerritorialUnitDto } from '@shared/service-proxies/application/social-conflict-proxie';
import { ConflictVerificationState, UtilityServiceProxy } from '@shared/service-proxies/application/utility-proxie';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    templateUrl: 'social-conflict.component.html',
    styleUrls: [
        'social-conflict.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class SocialConflictComponent extends AppComponentBase implements OnInit, AfterViewInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @ViewChild('fileDownloader', { static: true }) fileDownloader: FileDownloadComponent;
    @ViewChild('fileDownloadRequest', { static: true }) fileDownloadRequest: FileDownloadRequestComponent;

    filterText: string;
    socialConflictCode: string;
    advancedFiltersAreShown: boolean = false;
    territorialUnit: number = -1;
    territorialUnits: SocialConflictTerritorialUnitDto[] = [];
    filterByDate: boolean;
    dateRange: Date[] = [moment().startOf('month').toDate(), moment().endOf('day').toDate()];
    verificationState: number = -1;

    verificationStates = {
        denied: ConflictVerificationState.Denied,
        process: ConflictVerificationState.Process,
        accepted: ConflictVerificationState.Accepted
    }

    reports = {
        socialConflict: 0,
        helpMemory: 1
    }

    constructor(
        injector: Injector,
        private _socialConflictServiceProxy: SocialConflictServiceProxy,
        private _utilityServiceProxy: UtilityServiceProxy,
        private _reportServiceProxy: ReportServiceProxy,
        private _fileDownloadService: FileDownloadService) {
        super(injector);
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

        this._socialConflictServiceProxy.getAll(
            this.filterText,
            this.advancedFiltersAreShown && this.verificationState > -1 ? this.verificationState : <any>undefined,
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

    exportMatrizToExcel() {
        this.fileDownloadRequest.show();
        this._socialConflictServiceProxy.getMatrizToExcel(
            this.filterText,
            this.advancedFiltersAreShown && this.verificationState > -1 ? this.verificationState : <any>undefined,
            this.advancedFiltersAreShown ? this.socialConflictCode : <any>undefined,
            this.advancedFiltersAreShown ? this.territorialUnit : <any>undefined,
            this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[0]).startOf('day') : <any>undefined,
            this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[1]).endOf('day') : <any>undefined,
            this.advancedFiltersAreShown ? this.filterByDate : <any>undefined,
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

    exportManagementToExcel() {
        this.fileDownloadRequest.show();
        this._socialConflictServiceProxy.getManagementToExcel(
            this.filterText,
            this.advancedFiltersAreShown && this.verificationState > -1 ? this.verificationState : <any>undefined,
            this.advancedFiltersAreShown ? this.socialConflictCode : <any>undefined,
            this.advancedFiltersAreShown ? this.territorialUnit : <any>undefined,
            this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[0]).startOf('day') : <any>undefined,
            this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[1]).endOf('day') : <any>undefined,
            this.advancedFiltersAreShown ? this.filterByDate : <any>undefined,
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

    exportStateToExcel() {
        this.fileDownloadRequest.show();
        this._socialConflictServiceProxy.getStateToExcel(
            this.filterText,
            this.advancedFiltersAreShown && this.verificationState > -1 ? this.verificationState : <any>undefined,
            this.advancedFiltersAreShown ? this.socialConflictCode : <any>undefined,
            this.advancedFiltersAreShown ? this.territorialUnit : <any>undefined,
            this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[0]).startOf('day') : <any>undefined,
            this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[1]).endOf('day') : <any>undefined,
            this.advancedFiltersAreShown ? this.filterByDate : <any>undefined,
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

    createSocialConflict(): void {
        this.router.navigate(['/app/application/create-social-conflict']);
    }

    editSocialConflict(socialConflict: SocialConflictDto): void {
        this.router.navigate(['/app/application/edit-social-conflict', socialConflict.id]);
    }

    deleteSocialConflict(item: SocialConflictDto): void {
        this.message.confirm(`¿Esta seguro de eliminar el conflicto social Nº ${item.code}?`, 'Aviso',
            (isConfirmed) => {
                if (isConfirmed) {
                    this.showMainSpinner('Actualizando información, por favor espere...');
                    this._socialConflictServiceProxy
                        .delete(item.id)
                        .pipe(finalize(() => this.hideMainSpinner()))
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.error('Eliminado satisfactoriamente');
                        });
                }
            }
        );
    }

    showDownloaderSocialConflict(conflict: SocialConflictDto) {
        this.showDownloader(conflict, this.reports.socialConflict);
    }

    showDownloaderHelpMemory(conflict: SocialConflictDto) {
        this.showDownloader(conflict, this.reports.helpMemory);
    }

    private showDownloader(conflict: SocialConflictDto, reportType: number) {
        const title: string = reportType == this.reports.helpMemory ? `Archivo de Ayuda Memoria ${conflict.code}` : `Reporte del Conflicto ${conflict.code}`;
        this.fileDownloader.show(title, { item: conflict, type: reportType }, ReportType.DOCX);
    }

    completeDownload(event: { format: ReportType, parameter: { item: SocialConflictDto, type: number } }) {
        this.showMainSpinner('Generando reporte, por favor espere...');

        if (event.parameter.type == this.reports.helpMemory) {
            const fileName: string = `AM_SGSD_${event.parameter.item.generation ? ((event.parameter.item.count < 10 ? "0" : "") + event.parameter.item.count + "_" + event.parameter.item.year) : event.parameter.item.id.toString()}`;
            this.fileDownloadRequest.show();
            this._reportServiceProxy
                .createSocialConflictHelpMemory(event.parameter.item.id, event.format)
                .pipe(finalize(() => {
                    this.hideMainSpinner();
                    this.fileDownloadRequest.hide();
                })).subscribe((response) => {
                    const fileURL: any = URL.createObjectURL(response);
                    const a = document.createElement("a");
                    a.href = fileURL;
                    a.download = fileName;
                    a.click();
                });
        } else {
            const fileName: string = `CASO_SGSD_${event.parameter.item.generation ? ((event.parameter.item.count < 10 ? "0" : "") + event.parameter.item.count + "_" + event.parameter.item.year) : event.parameter.item.id.toString()}`;
            this.fileDownloadRequest.show();
            this._reportServiceProxy
                .createSocialConflict(event.parameter.item.id, event.format)
                .pipe(finalize(() => {
                    this.hideMainSpinner();
                    this.fileDownloadRequest.hide();
                })).subscribe((response) => {
                    const fileURL: any = URL.createObjectURL(response);
                    const a = document.createElement("a");
                    a.href = fileURL;
                    a.download = fileName;
                    a.click();
                });
        }
    }
}
