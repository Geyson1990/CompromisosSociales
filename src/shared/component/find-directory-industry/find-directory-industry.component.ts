import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { UtilityDepartmentDataDto, UtilityDirectoryGovernmentSectorDto, UtilityDirectoryIndustryDto, UtilityDistrictDataDto, UtilityProvinceDataDto, UtilityServiceProxy } from '@shared/service-proxies/application/utility-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    selector: 'find-directory-industry',
    templateUrl: 'find-directory-industry.component.html',
    styleUrls: [
        'find-directory-industry.component.css'
    ]
})
export class FindDirectoryIndustryComponent extends AppComponentBase {

    @ViewChild('findDataTable', { static: false }) dataTable: Table;
    @ViewChild('findPaginator', { static: false }) paginator: Paginator;

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<UtilityDirectoryIndustryDto> = new EventEmitter<UtilityDirectoryIndustryDto>();

    active: boolean = false;

    advancedFiltersAreShown: boolean = false;

    address: string;
    shortName: string;

    departments: UtilityDepartmentDataDto[];

    selectedDepartments: UtilityDepartmentDataDto[];
    departmentId: number = -1;

    selectedProvinces: UtilityProvinceDataDto[];
    provinceId: number = -1;

    selectedDistricts: UtilityDistrictDataDto[];
    districtId: number = -1;

    sectorId: number = -1;
    sectors: UtilityDirectoryGovernmentSectorDto[];

    constructor(_injector: Injector, private _utilityServiceProxy: UtilityServiceProxy) {
        super(_injector);
    }

    show(): void {

        this.showMainSpinner('Cargando información, por favor espere...');

        this._utilityServiceProxy
            .getAllDirectoryGovermentFilters()
            .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1000)))
            .subscribe(response => {
                this.departments = response.departments;
                this.selectedDepartments = response.departments;
                this.sectors = response.sectors;
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

        this._utilityServiceProxy.getAllDirectoryIndustries(
            this.advancedFiltersAreShown ? this.shortName : <any>undefined,
            this.advancedFiltersAreShown ? this.address : <any>undefined,
            this.advancedFiltersAreShown ? this.departmentId : <any>undefined,
            this.advancedFiltersAreShown ? this.provinceId : <any>undefined,
            this.advancedFiltersAreShown ? this.districtId : <any>undefined,
            this.advancedFiltersAreShown ? this.sectorId : <any>undefined,
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

    selectSocialConflict(directoryGovernmentDto: UtilityDirectoryIndustryDto) {
        this.modalSave.emit(directoryGovernmentDto);
        this.close();
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
        this.address = '';
        this.shortName = '';
        this.departmentId = -1;
        this.provinceId = -1;
        this.districtId = -1;
        this.sectorId = -1;
        this.selectedProvinces = [];
        this.selectedDistricts = [];
    }
}
