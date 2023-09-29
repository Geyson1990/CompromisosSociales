import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FileDownloadRequestComponent } from '@shared/component/file-download-request/file-download-request.component';
import { FileDownloadComponent } from '@shared/component/file-download/file-download.component';
import { InterventionPlanDto, InterventionPlanServiceProxy } from '@shared/service-proxies/application/intervention-plan-proxie';
import { ReportServiceProxy, ReportType } from '@shared/service-proxies/application/report-proxie';
import { ConflictSite, UtilityDepartmentDataDto, UtilityDistrictDataDto, UtilityPersonDto, UtilityProvinceDataDto, UtilityServiceProxy, UtilityTerritorialUnitDto } from '@shared/service-proxies/application/utility-proxie';
import * as moment from 'moment';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'intervention-plan.component.html',
    styleUrls: [
        'intervention-plan.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class InterventionPlanComponent extends AppComponentBase implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @ViewChild('fileDownloader', { static: true }) fileDownloader: FileDownloadComponent;
    @ViewChild('fileDownloadRequest', { static: true }) fileDownloadRequest: FileDownloadRequestComponent;

    advancedFiltersAreShown: boolean = false;

    code: string;
    caseName: string;
    territorialUnitId: number = -1;
    territorialUnits: UtilityTerritorialUnitDto[] = [];
    departmentId: number = -1;
    departments: UtilityDepartmentDataDto[];
    selectedDepartments: UtilityDepartmentDataDto[];
    provinceId: number = -1;
    selectedProvinces: UtilityProvinceDataDto[];
    districtId: number = -1;
    selectedDistricts: UtilityDistrictDataDto[];
    personId: number = -1;
    persons: UtilityPersonDto[];
    site: ConflictSite;
    dateRange: Date[] = [moment().startOf('month').toDate(), moment().endOf('day').toDate()];
    filterByDate: boolean;

    constructor(_injector: Injector, private _interventionPlanServiceProxy: InterventionPlanServiceProxy, private _utilityServiceProxy: UtilityServiceProxy, private _reportServiceProxy: ReportServiceProxy) {
        super(_injector);

    }

    ngOnInit(): void {
        this._utilityServiceProxy
            .getAllInterventionPlanFilters()
            .pipe(finalize(() => this.hideMainSpinner()))
            .subscribe(response => {
                this.departments = response.departments;
                this.persons = response.persons;
                this.territorialUnits = response.territorialUnits;
            });
    }

    createInterventionPlan(): void {
        this.router.navigate(['/app/conflict-tools/intervention-plan/create']);
    }

    editInterventionPlan(interventionPlan: InterventionPlanDto): void {
        this.router.navigate(['/app/conflict-tools/intervention-plan/edit', interventionPlan.id]);
    }

    deleteInterventionPlan(interventionPlan: InterventionPlanDto): void {
        this.message.confirm(`¿Esta seguro de eliminar el plan de intervención ${interventionPlan.code}?`, 'Aviso',
            (isConfirmed) => {
                if (isConfirmed) {
                    this.showMainSpinner('Actualizando información, por favor espere...');
                    this._interventionPlanServiceProxy
                        .delete(interventionPlan.id)
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
        this.territorialUnitId = -1;
        this.departmentId = -1;
        this.provinceId = -1;
        this.districtId = -1;
        this.personId = -1;
    }

    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._interventionPlanServiceProxy.getAll(
            this.advancedFiltersAreShown ? this.code : <any>undefined,
            this.advancedFiltersAreShown ? this.caseName : <any>undefined,
            this.advancedFiltersAreShown && this.territorialUnitId != -1 ? this.territorialUnitId : <any>undefined,
            this.advancedFiltersAreShown && this.departmentId != -1 ? this.departmentId : <any>undefined,
            this.advancedFiltersAreShown && this.provinceId != -1 ? this.provinceId : <any>undefined,
            this.advancedFiltersAreShown && this.districtId != -1 ? this.districtId : <any>undefined,
            this.advancedFiltersAreShown && this.personId != -1 ? this.personId : <any>undefined,
            this.advancedFiltersAreShown ? this.site : ConflictSite.All,
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

    showDownloader(interventionPlan: InterventionPlanDto) {
        this.fileDownloader.formats.pdf.enabled = true;
        this.fileDownloader.formats.xlsx.enabled = true;
        this.fileDownloader.show(`Archivo de Plan de Intervención ${interventionPlan.code}`, interventionPlan, ReportType.DOCX);
    }

    completeDownload(event: { format: ReportType, parameter: InterventionPlanDto }) {
        this.showMainSpinner('Generando reporte, por favor espere...');

        const fileName: string = `PI_${event.parameter.count < 10 ? '0' : ''}${event.parameter.count}_${event.parameter.year}`;

        this.fileDownloadRequest.show();
        this._reportServiceProxy
            .createInterventionPlan(event.parameter.id, event.format)
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