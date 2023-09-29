import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DepartmentDto, DepartmentServiceProxy } from '@shared/service-proxies/application/department-proxie';
import { DistrictDto, DistrictServiceProxy } from '@shared/service-proxies/application/district-proxie';
import { ProvinceDto, ProvinceServiceProxy } from '@shared/service-proxies/application/province-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditDepartmentComponent } from './create-edit-department/create-edit-department.component';
import { CreateEditDistrictComponent } from './create-edit-district/create-edit-district.component';
import { CreateEditProvinceComponent } from './create-edit-province/create-edit-province.component';

@Component({
    templateUrl: 'ubigeo.component.html',
    styleUrls: [
        'ubigeo.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class UbigeoComponent extends AppComponentBase implements OnInit {

    @ViewChild('dataTableDeparment', { static: true }) dataTableDeparment: Table;
    @ViewChild('paginatorDeparment', { static: true }) paginatorDeparment: Paginator;

    @ViewChild('dataTableProvince', { static: true }) dataTableProvince: Table;
    @ViewChild('paginatorProvince', { static: true }) paginatorProvince: Paginator;

    @ViewChild('createOrEditModalDepartment', { static: true }) createOrEditModalDepartment: CreateEditDepartmentComponent;
    @ViewChild('createOrEditModalProvince', { static: true }) createOrEditModalProvince: CreateEditProvinceComponent;
    @ViewChild('createOrEditModalDisctrict', { static: true }) createOrEditModalDisctrict: CreateEditDistrictComponent;

    departments: DepartmentDto[] = [];
    departmentTotalRecordsCount: number = 0;
    selectedDepartment: DepartmentDto;
    departmentFilterText: string;

    provinces: ProvinceDto[] = [];
    provinceTotalRecordsCount: number = 0;
    provinceFilterText: string;

    constructor(_injector: Injector, private _departmentServiceProxy: DepartmentServiceProxy, private _provinceServiceProxy: ProvinceServiceProxy, private _districtServiceProxy: DistrictServiceProxy) {
        super(_injector);
    }

    ngOnInit() { }

    //#region Department

    createDepartment() {
        this.createOrEditModalDepartment.show();
    }

    onDepartmentSelect(deparmentEvent: any) {
        const department = <DepartmentDto>deparmentEvent.data;
        if (department && department.id)
            this.getDataProvinces(undefined, department);
    }

    onSelectedDepartmentUpdate(departmentUpdated: DepartmentDto) {
        this.selectedDepartment = departmentUpdated;
    }

    editCurrentDepartment() {
        if (this.selectedDepartment && this.selectedDepartment.id)
            this.createOrEditModalDepartment.show(this.selectedDepartment.id);
    }

    deleteCurrentDepartment() {
        if (this.selectedDepartment && this.selectedDepartment.id)
            this.message.confirm('¿Esta seguro de eliminar el registro ' + this.selectedDepartment.name + '?', 'Aviso',
                (isConfirmed) => {
                    if (isConfirmed)
                        this._departmentServiceProxy
                            .delete(this.selectedDepartment.id)
                            .subscribe(() => {
                                this.reloadPageDepartment();
                                this.selectedDepartment = undefined;
                                this.notify.error('Eliminado satisfactoriamente');
                            });
                }
            );
    }

    reloadPageDepartment(): void {
        this.paginatorDeparment.changePage(this.paginatorDeparment.getPage());
    }

    getDataDepartments(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginatorDeparment.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._departmentServiceProxy
            .getAll(
                this.departmentFilterText,
                this.primengTableHelper.getSorting(this.dataTableDeparment),
                this.primengTableHelper.getMaxResultCount(this.paginatorDeparment, event),
                this.primengTableHelper.getSkipCount(this.paginatorDeparment, event))
            .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
            .subscribe((result) => {
                this.departmentTotalRecordsCount = result.totalCount;
                this.departments = result.items;
                this.primengTableHelper.hideLoadingIndicator();
            });
    }

    //#endregion

    //#region Province

    createProvince() {
        if (this.selectedDepartment && this.selectedDepartment.id)
            this.createOrEditModalProvince.show(this.selectedDepartment);
    }

    editProvince(province: ProvinceDto) {
        this.createOrEditModalProvince.show(this.selectedDepartment, province.id);
    }

    getDataProvinces(event?: LazyLoadEvent, department?: DepartmentDto) {

        if ((!this.selectedDepartment || !this.selectedDepartment.id) && !department)
            return;

        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginatorProvince.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._provinceServiceProxy
            .getAll(
                this.provinceFilterText,
                department ? department.id : this.selectedDepartment.id,
                this.primengTableHelper.getSorting(this.dataTableProvince),
                this.primengTableHelper.getMaxResultCount(this.paginatorProvince, event),
                this.primengTableHelper.getSkipCount(this.paginatorProvince, event))
            .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
            .subscribe((result) => {
                this.provinceTotalRecordsCount = result.totalCount;
                this.provinces = result.items;
                this.primengTableHelper.hideLoadingIndicator();
            });
    }

    reloadPageProvince() {
        this.paginatorProvince.changePage(this.paginatorProvince.getPage());
    }

    deleteProvince(item: ProvinceDto) {
        this.message.confirm('¿Esta seguro de eliminar el registro ' + item.name + '?', 'Aviso',
            (isConfirmed) => {
                if (isConfirmed)
                    this._provinceServiceProxy
                        .delete(this.selectedDepartment.id)
                        .subscribe(() => {
                            this.reloadPageProvince();
                            this.notify.error('Eliminado satisfactoriamente');
                        });
            }
        );
    }

    //#endregion

    //#region District

    createDistrict(province: ProvinceDto) {
        this.createOrEditModalDisctrict.show(this.selectedDepartment, province);
    }

    deleteDistrict(district: DistrictDto) {
        this.message.confirm('¿Esta seguro de eliminar el registro ' + district.name + '?', 'Aviso',
            (isConfirmed) => {
                if (isConfirmed)
                    this._districtServiceProxy
                        .delete(this.selectedDepartment.id)
                        .subscribe(() => {
                            this.reloadPageProvince();
                            this.notify.error('Eliminado satisfactoriamente');
                        });
            }
        );
    }

    editDistrict(province: ProvinceDto, district: DistrictDto) {
        this.createOrEditModalDisctrict.show(this.selectedDepartment, province, district.id);
    }
    //#endregion
}