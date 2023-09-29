import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FileDownloadRequestComponent } from '@shared/component/file-download-request/file-download-request.component';
import { FileDownloadComponent } from '@shared/component/file-download/file-download.component';
import { ReportServiceProxy, ReportType } from '@shared/service-proxies/application/report-proxie';
import { SocialConflictAlertDto, SocialConflictAlertServiceProxy, SocialConflictAlertTerritorialUnitDto } from '@shared/service-proxies/application/social-conflict-alert-proxie';
import { UtilityAlertRiskDto, UtilityDepartmentDataDto, UtilityDistrictDataDto, UtilityPersonDto, UtilityProvinceDataDto, UtilitySealDto, UtilityServiceProxy, UtilitySocialConflictAlertResponsibleDto, UtilityTypologyDto } from '@shared/service-proxies/application/utility-proxie';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { EmailSenderInformationSocialConflictAlertComponent } from './create-edit-social-conflict-alert/email-sender/email-sender.component';
import * as moment from 'moment';

@Component({
    templateUrl: 'social-conflict-alert.component.html',
    styleUrls: [
        'social-conflict-alert.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class SocialConflictAlertComponent extends AppComponentBase implements OnInit, AfterViewInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @ViewChild('fileDownloader', { static: true }) fileDownloader: FileDownloadComponent;
    @ViewChild('emailSenderModal', { static: false }) emailSenderModal: EmailSenderInformationSocialConflictAlertComponent;
    @ViewChild('fileDownloadRequest', { static: true }) fileDownloadRequest: FileDownloadRequestComponent;

    socialConflictAlertCode: string;
    socialConflictAlertDescription: string;
    socialConflictAlertInformation: string;
    advancedFiltersAreShown: boolean = false;
    territorialUnitId: number = -1;
    territorialUnits: SocialConflictAlertTerritorialUnitDto[] = [];
    departmentId: number = -1;
    departments: UtilityDepartmentDataDto[];
    selectedDepartments: UtilityDepartmentDataDto[];
    provinceId: number = -1;
    selectedProvinces: UtilityProvinceDataDto[];
    districtId: number = -1;
    selectedDistricts: UtilityDistrictDataDto[];
    personId: number = -1;
    persons: UtilityPersonDto[];
    responsibleId: number = -1;
    responsibles: UtilitySocialConflictAlertResponsibleDto[];
    typologyId: number = -1;
    typologies: UtilityTypologyDto[];
    riskId: number = -1;
    risks: UtilityAlertRiskDto[];
    sealId: number = -1;
    seals: UtilitySealDto[];
    filterByDate: boolean;
    dateRange: Date[] = [moment().startOf('month').toDate(), moment().endOf('day').toDate()];

    private reportTypes = {
        normal: 0,
        ejecutive: 1
    }

    constructor(
        injector: Injector,
        private _utilityServiceProxy: UtilityServiceProxy,
        private _socialConflictAlertServiceProxy: SocialConflictAlertServiceProxy,
        private _reportServiceProxy: ReportServiceProxy,
        private _fileDownloadService: FileDownloadService) {
        super(injector);
    }

    ngOnInit(): void {
        this._utilityServiceProxy
            .getAllSocialConflictAlertFilters()
            .pipe(finalize(() => this.hideMainSpinner()))
            .subscribe(response => {
                this.departments = response.departments;
                this.persons = response.persons;
                this.responsibles = response.responsibles;
                this.territorialUnits = response.territorialUnits;
                this.typologies = response.typologies;
                this.risks = response.risks;
                this.seals = response.seals;
            });
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

        this._socialConflictAlertServiceProxy.getAll(
            this.advancedFiltersAreShown ? this.socialConflictAlertCode : <any>undefined,
            this.advancedFiltersAreShown ? this.socialConflictAlertDescription : <any>undefined,
            this.advancedFiltersAreShown ? this.socialConflictAlertInformation : <any>undefined,
            this.advancedFiltersAreShown ? this.territorialUnitId : <any>undefined,
            this.advancedFiltersAreShown ? this.departmentId : <any>undefined,
            this.advancedFiltersAreShown ? this.provinceId : <any>undefined,
            this.advancedFiltersAreShown ? this.districtId : <any>undefined,
            this.advancedFiltersAreShown ? this.personId : <any>undefined,
            this.advancedFiltersAreShown ? this.responsibleId : <any>undefined,
            this.advancedFiltersAreShown ? this.typologyId : <any>undefined,
            this.advancedFiltersAreShown ? this.riskId : <any>undefined,
            this.advancedFiltersAreShown ? this.sealId : <any>undefined,
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
        this._socialConflictAlertServiceProxy.getMatrizToExcel(
            this.advancedFiltersAreShown ? this.socialConflictAlertCode : <any>undefined,
            this.advancedFiltersAreShown ? this.socialConflictAlertDescription : <any>undefined,
            this.advancedFiltersAreShown ? this.socialConflictAlertInformation : <any>undefined,
            this.advancedFiltersAreShown ? this.territorialUnitId : <any>undefined,
            this.advancedFiltersAreShown ? this.departmentId : <any>undefined,
            this.advancedFiltersAreShown ? this.provinceId : <any>undefined,
            this.advancedFiltersAreShown ? this.districtId : <any>undefined,
            this.advancedFiltersAreShown ? this.personId : <any>undefined,
            this.advancedFiltersAreShown ? this.responsibleId : <any>undefined,
            this.advancedFiltersAreShown ? this.typologyId : <any>undefined,
            this.advancedFiltersAreShown ? this.riskId : <any>undefined,
            this.advancedFiltersAreShown ? this.sealId : <any>undefined,
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

    resetFilters(): void {
        this.socialConflictAlertCode = '';
        this.socialConflictAlertDescription = '';
        this.socialConflictAlertInformation = '';
        this.territorialUnitId = -1;
        this.departmentId = -1;
        this.provinceId = -1;
        this.districtId = -1;
        this.personId = -1;
        this.responsibleId = -1;
        this.typologyId = -1;
        this.riskId = -1;
        this.sealId = -1;
        this.filterByDate = false;
    }

    createAlert(): void {
        this.router.navigate(['/app/application/create-alert']);
    }

    editAlert(alert: SocialConflictAlertDto): void {
        this.router.navigate(['/app/application/edit-alert', alert.id]);
    }

    deleteAlert(alert: SocialConflictAlertDto): void {
        this.message.confirm(`¿Esta seguro de eliminar el alerta Nº ${alert.code}?`, 'Aviso',
            (isConfirmed) => {
                if (isConfirmed) {
                    this.showMainSpinner('Actualizando información, por favor espere...');
                    this._socialConflictAlertServiceProxy
                        .delete(alert.id)
                        .pipe(finalize(() => this.hideMainSpinner()))
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.error('Eliminado satisfactoriamente');
                        });
                }
            }
        );
    }

    showEmailSender(alert: SocialConflictAlertDto) {
        this.emailSenderModal.show(alert);
    }

    onTerritorialUnitChange(event: any) {

        const territorialUnitId: number = +event.target.value;
        const index: number = this.territorialUnits.findIndex(p => p.id == territorialUnitId);

        if (index != -1)
            this.selectedDepartments = this.departments.filter(p => p.territorialUnitIds.findIndex(p => p.id == territorialUnitId) != -1);

        const departmentIndex: number = this.selectedDepartments.findIndex(p => p.id == this.departmentId);

        if (departmentIndex == -1) {
            this.departmentId = -1;
            this.provinceId = -1;
            this.districtId = -1;
            this.selectedProvinces = [];
            this.selectedDistricts = [];
        }
    }

    onDepartmentChange(event: any) {
        const departmentId: number = +event.target.value;
        const index: number = this.selectedDepartments.findIndex(p => p.id == departmentId);
        this.provinceId = -1;
        this.districtId = -1;
        this.selectedProvinces = [];
        this.selectedDistricts = [];

        if (index != -1)
            this.selectedProvinces = this.selectedDepartments[index].provinces;
    }

    onProvinceChange(event: any) {
        const provinceId: number = +event.target.value;
        const index: number = this.selectedProvinces.findIndex(p => p.id == provinceId);
        this.selectedDistricts = [];
        this.districtId = -1;
        this.selectedDistricts = this.selectedProvinces[index].districts;
    }

    showDownloaderNormal(alert: SocialConflictAlertDto) {
        this.fileDownloader.show(`Alerta de situaciones conflictivas ${alert.code}`, { item: alert, type: this.reportTypes.normal }, ReportType.PDF);
    }

    showDownloaderResume(alert: SocialConflictAlertDto) {
        this.fileDownloader.show(`Alerta de situaciones conflictivas ${alert.code}`, { item: alert, type: this.reportTypes.ejecutive }, ReportType.PDF);
    }

    completeDownload(event: { format: ReportType, parameter: { item: SocialConflictAlertDto, type: number } }) {
        this.showMainSpinner('Generando reporte, por favor espere...');

        const fileName: string = `${event.parameter.type == this.reportTypes.ejecutive ? 'RE_' : ''}ALERTA_SGSD_` +
            `${event.parameter.item.generation ? ((event.parameter.item.count < 10 ? "0" : "") + event.parameter.item.count + "_" + event.parameter.item.year) : event.parameter.item.id.toString()}`;

        if (event.parameter.type == this.reportTypes.normal) {
            this.fileDownloadRequest.show();
            this._reportServiceProxy
                .createSocialConflictAlert(event.parameter.item.id, event.format)
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
        if (event.parameter.type == this.reportTypes.ejecutive) {
            this.fileDownloadRequest.show();
            this._reportServiceProxy
                .createSocialConflictAlertResume(event.parameter.item.id, event.format)
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
