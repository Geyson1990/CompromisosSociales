import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ConflictSite, UtilityDepartmentDataDto, UtilityDistrictDataDto, UtilityInterventionPlanGetAllDto, UtilityPersonDto, UtilityProvinceDataDto, UtilityServiceProxy, UtilityTerritorialUnitDto } from '@shared/service-proxies/application/utility-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'find-intervention-plan',
    templateUrl: 'find-intervention-plan.component.html',
    styleUrls: [
        'find-intervention-plan.component.css'
    ]
})
export class FindInterventionPlanComponent extends AppComponentBase {

    @ViewChild('findDataTable', { static: false }) dataTable: Table;
    @ViewChild('findPaginator', { static: false }) paginator: Paginator;

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<UtilityInterventionPlanGetAllDto> = new EventEmitter<UtilityInterventionPlanGetAllDto>();

    active: boolean = false;

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

    private loaded: boolean = false;

    constructor(_injector: Injector, private _utilityServiceProxy: UtilityServiceProxy) {
        super(_injector);
    }

    show(): void {

        if (this.loaded) {
            this.active = true;
            this.modal.show();
        } else {
            this.showMainSpinner('Cargando, por favor espere....');
            this._utilityServiceProxy
                .getAllInterventionPlanFilters()
                .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1500)))
                .subscribe(response => {
                    this.departments = response.departments;
                    this.persons = response.persons;
                    this.territorialUnits = response.territorialUnits;
                    this.active = true;
                    this.modal.show();
                });
        }
    }

    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._utilityServiceProxy.getAllInterventionPlans(
            this.advancedFiltersAreShown ? this.code : <any>undefined,
            this.advancedFiltersAreShown ? this.caseName : <any>undefined,
            this.advancedFiltersAreShown && this.territorialUnitId != -1 ? this.territorialUnitId : <any>undefined,
            this.advancedFiltersAreShown && this.departmentId != -1 ? this.departmentId : <any>undefined,
            this.advancedFiltersAreShown && this.provinceId != -1 ? this.provinceId : <any>undefined,
            this.advancedFiltersAreShown && this.districtId != -1 ? this.districtId : <any>undefined,
            this.advancedFiltersAreShown && this.personId != -1 ? this.personId : <any>undefined,
            this.advancedFiltersAreShown ? this.site : ConflictSite.All,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event)
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

    selectSocialConflict(interventionPlan: UtilityInterventionPlanGetAllDto) {
        this.modalSave.emit(interventionPlan);
        this.close();
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

    resetFilters(): void {
        this.code = '';
        this.caseName = '';
        this.territorialUnitId = -1;
        this.departmentId = -1;
        this.provinceId = -1;
        this.districtId = -1;
        this.personId = -1;
    }

}
