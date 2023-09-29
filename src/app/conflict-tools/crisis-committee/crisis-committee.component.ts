import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FileDownloadRequestComponent } from '@shared/component/file-download-request/file-download-request.component';
import { FileDownloadComponent } from '@shared/component/file-download/file-download.component';
import { CrisisCommitteeDto, CrisisCommitteeServiceProxy } from '@shared/service-proxies/application/crisis-committee-proxie';
import { ReportServiceProxy, ReportType } from '@shared/service-proxies/application/report-proxie';
import * as moment from 'moment';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'crisis-committee.component.html',
    styleUrls: [
        'crisis-committee.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class CrisisCommitteeComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @ViewChild('fileDownloader', { static: true }) fileDownloader: FileDownloadComponent;
    @ViewChild('fileDownloadRequest', { static: true }) fileDownloadRequest: FileDownloadRequestComponent;

    advancedFiltersAreShown: boolean = false;

    code: string;
    caseName: string;
    interventionPlanCode: string;
    interventionPlanCaseName: string;
    dateRange: Date[] = [moment().startOf('month').toDate(), moment().endOf('day').toDate()];
    filterByDate: boolean;

    constructor(_injector: Injector, private _crisisCommitteeServiceProxy: CrisisCommitteeServiceProxy, private _reportServiceProxy: ReportServiceProxy) {
        super(_injector);
    }

    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._crisisCommitteeServiceProxy.getAll(
            this.advancedFiltersAreShown ? this.code : <any>undefined,
            this.advancedFiltersAreShown ? this.caseName : <any>undefined,
            this.advancedFiltersAreShown ? this.interventionPlanCode : <any>undefined,
            this.advancedFiltersAreShown ? this.interventionPlanCaseName : <any>undefined,
            this.advancedFiltersAreShown ? this.filterByDate : false,
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

    createCrisisCommittee(): void {
        this.router.navigate(['/app/conflict-tools/create-crisis-committee']);
    }

    editCrisisCommittee(crisisCommittee: CrisisCommitteeDto): void {
        this.router.navigate(['/app/conflict-tools/edit-crisis-committee', crisisCommittee.id]);
    }

    deleteCrisisCommittee(crisisCommittee: CrisisCommitteeDto): void {
        this.message.confirm(`¿Esta seguro de eliminar el plan de intervención ${crisisCommittee.code}?`, 'Aviso',
            (isConfirmed) => {
                if (isConfirmed) {
                    this.showMainSpinner('Actualizando información, por favor espere...');
                    this._crisisCommitteeServiceProxy
                        .delete(crisisCommittee.id)
                        .pipe(finalize(() => this.hideMainSpinner()))
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.error('Eliminado satisfactoriamente');
                        });
                }
            }
        );
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    resetFilters(): void {
        this.code = '';
        this.caseName = '';
        this.interventionPlanCode = '';
        this.interventionPlanCode = '';
    }

    showDownloader(crisisCommittee: CrisisCommitteeDto) {
        this.fileDownloader.formats.pdf.enabled = true;
        this.fileDownloader.formats.xlsx.enabled = true;
        this.fileDownloader.show(`Archivo de Comité de Crisis ${crisisCommittee.code}`, crisisCommittee, ReportType.DOCX);
    }

    completeDownload(event: { format: ReportType, parameter: CrisisCommitteeDto }) {
        this.showMainSpinner('Generando reporte, por favor espere...');

        const fileName: string = `CC_${event.parameter.count < 10 ? '0' : ''}${event.parameter.count}_${event.parameter.year}`;

        this.fileDownloadRequest.show();
        this._reportServiceProxy
            .createCrisisCommittee(event.parameter.id, event.format)
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