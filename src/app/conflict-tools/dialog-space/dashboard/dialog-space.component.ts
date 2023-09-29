import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DialogSpaceGetAllDto, DialogSpaceServiceProxy } from '@shared/service-proxies/application/dialog-space.proxie';
import { UtilityDepartmentDataDto, UtilityDialogSpaceTypeDto, UtilityDistrictDataDto, UtilityProvinceDataDto, UtilityServiceProxy, UtilityTerritorialUnitDto } from '@shared/service-proxies/application/utility-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';
import { DialogSpaceDocumentType } from '@shared/service-proxies/application/dialog-space-document-proxie';

@Component({
    templateUrl: 'dialog-space.component.html',
    styleUrls: [
        'dialog-space.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class DialogSpaceDashboardComponent extends AppComponentBase implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

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
    dialogSpaceTypeId: number = -1;
    dialogSpaceTypes: UtilityDialogSpaceTypeDto[];
    dateRange: Date[] = [moment().startOf('month').toDate(), moment().endOf('day').toDate()];
    filterByDate: boolean;

    dialogSpaceDocumentTypes = {
        none: DialogSpaceDocumentType.NONE,
        create: DialogSpaceDocumentType.CREATE,
        update: DialogSpaceDocumentType.UPDATE
    }

    constructor(_injector: Injector, private _utilityServiceProxy: UtilityServiceProxy, private _dialogSpaceServiceProxy: DialogSpaceServiceProxy) {
        super(_injector);

    }

    ngOnInit(): void {
        this._utilityServiceProxy.getAllDialogSpaceFilters().subscribe((response) => {
            this.territorialUnits = response.territorialUnits;
            this.departments = response.departments;
            this.dialogSpaceTypes = response.dialogSpaceTypes;
        });
    }

    createItem(): void {
        this.router.navigate(['/app/conflict-tools/dialog-space/create-dialog-space']);
    }

    editItem(dialogSpace: DialogSpaceGetAllDto): void {
        this.router.navigate(['/app/conflict-tools/dialog-space/edit-dialog-space', dialogSpace.id]);
    }

    deleteItem(dialogSpace: DialogSpaceGetAllDto): void {
        this.message.confirm(`¿Esta seguro de eliminar el espacio de diálogo ${dialogSpace.code}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed) {
                this.showMainSpinner('Actualizando información, por favor espere...');
                this._dialogSpaceServiceProxy
                    .delete(dialogSpace.id)
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

    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._dialogSpaceServiceProxy.getAll(
            this.advancedFiltersAreShown ? this.code : <any>undefined,
            this.advancedFiltersAreShown ? this.caseName : <any>undefined,
            this.advancedFiltersAreShown && this.territorialUnitId != -1 ? this.territorialUnitId : <any>undefined,
            this.advancedFiltersAreShown && this.departmentId != -1 ? this.departmentId : <any>undefined,
            this.advancedFiltersAreShown && this.provinceId != -1 ? this.provinceId : <any>undefined,
            this.advancedFiltersAreShown && this.districtId != -1 ? this.districtId : <any>undefined,
            this.advancedFiltersAreShown && this.dialogSpaceTypeId != -1 ? this.dialogSpaceTypeId : <any>undefined,
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

    resetFilters() {
        this.code = '';
        this.caseName = '';
        this.territorialUnitId = -1;
        this.departmentId = -1;
        this.provinceId = -1;
        this.districtId = -1;
        this.dialogSpaceTypeId = -1;
    }
}