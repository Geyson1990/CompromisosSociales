import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictAlertTerritorialUnitDto } from '@shared/service-proxies/application/social-conflict-alert-proxie';
import { ConditionType, UtilityDepartmentDataDto, UtilityDistrictDataDto, UtilityPersonDto, UtilityProvinceDataDto, UtilityServiceProxy, UtilitySocialConflictDto, UtilityTerritorialUnitDto, UtilityTypologyDto } from '@shared/service-proxies/application/utility-proxie';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'find-social-conflict',
    templateUrl: 'find-social-conflict.component.html',
    styleUrls: [
        'find-social-conflict.component.css'
    ]
})
export class FindSocialConflictComponent extends AppComponentBase {

    @ViewChild('findDataTable', { static: false }) dataTable: Table;
    @ViewChild('findPaginator', { static: false }) paginator: Paginator;

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<UtilitySocialConflictDto> = new EventEmitter<UtilitySocialConflictDto>();

    active: boolean = false;

    socialConflictCode: string;
    socialConflictDescription: string;
    advancedFiltersAreShown: boolean = false;
    condition: number = -1;
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
    typologyId: number = -1;
    typologies: UtilityTypologyDto[];

    conditions = {
        none: ConditionType.None,
        open: ConditionType.Open,
        closed: ConditionType.Closed
    };

    constructor(_injector: Injector, private _utilityServiceProxy: UtilityServiceProxy) {
        super(_injector);
    }

    show(): void {
        this._utilityServiceProxy
            .getAllSocialConflictFilters()
            .pipe(finalize(() => this.hideMainSpinner()))
            .subscribe(response => {
                this.departments = response.departments;
                this.persons = response.persons;
                this.territorialUnits = response.territorialUnits;
                this.typologies = response.typologies;
                this.active = true;
                this.modal.show();
            });
    }

    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._utilityServiceProxy.getAllSocialConflicts(
            this.advancedFiltersAreShown ? this.socialConflictCode : <any>undefined,
            this.advancedFiltersAreShown ? this.socialConflictDescription : <any>undefined,
            this.advancedFiltersAreShown ? this.territorialUnitId : <any>undefined,
            this.advancedFiltersAreShown ? this.departmentId : <any>undefined,
            this.advancedFiltersAreShown ? this.provinceId : <any>undefined,
            this.advancedFiltersAreShown ? this.districtId : <any>undefined,
            this.advancedFiltersAreShown ? this.condition : <any>undefined,
            this.advancedFiltersAreShown ? this.personId : <any>undefined,
            this.advancedFiltersAreShown ? this.typologyId : <any>undefined,
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

    selectSocialConflict(socialConflict: UtilitySocialConflictDto) {
        this.modalSave.emit(socialConflict);
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

    resetFilters() {
        this.socialConflictCode = '';
        this.socialConflictDescription = '';
        this.condition = -1;
        this.territorialUnitId = -1;
        this.departmentId = -1;
        this.provinceId = -1;
        this.districtId = -1;
        this.personId = -1;
        this.typologyId = -1;
    }
}
