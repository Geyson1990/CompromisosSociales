import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ConditionType, ConflictSite, UtilityConflictListGetAllDto, UtilityDepartmentDataDto, UtilityDistrictDataDto, UtilityProvinceDataDto, UtilityServiceProxy } from '@shared/service-proxies/application/utility-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'find-conflict',
    templateUrl: 'find-conflict.component.html',
    styleUrls: [
        'find-conflict.component.css'
    ]
})
export class FindConflictComponent extends AppComponentBase {

    @ViewChild('findDataTable', { static: false }) dataTable: Table;
    @ViewChild('findPaginator', { static: false }) paginator: Paginator;

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<UtilityConflictListGetAllDto> = new EventEmitter<UtilityConflictListGetAllDto>();

    active: boolean = false;

    socialConflictCode: string;
    socialConflictDescription: string;
    advancedFiltersAreShown: boolean = false;

    departmentId: number = -1;
    departments: UtilityDepartmentDataDto[];

    provinceId: number = -1;
    provinces: UtilityProvinceDataDto[];

    districtId: number = -1;
    districts: UtilityDistrictDataDto[];

    site: ConflictSite = ConflictSite.All;

    sites = {
        all: ConflictSite.All,
        socialConflict: ConflictSite.SocialConflict,
        socialConflictSensible: ConflictSite.SocialConflictSensible
    };

    state: ConditionType = ConditionType.None;

    states = {
        all: ConditionType.None,
        open: ConditionType.Open,
        closed: ConditionType.Closed
    };

    private loaded: boolean = false;

    constructor(_injector: Injector, private _utilityServiceProxy: UtilityServiceProxy) {
        super(_injector);
    }

    show(): void {

        if(this.loaded) {
            this.active = true;
            this.modal.show();
        } else {
            this.showMainSpinner('Cargando, por favor espere....');
            this._utilityServiceProxy
            .getAllDepartments()
            .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1500)))
            .subscribe(response => {
                this.loaded = true;
                this.departments = response.items;
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

        this._utilityServiceProxy.getAllConflictList(
            this.advancedFiltersAreShown ? this.socialConflictCode : <any>undefined,
            this.advancedFiltersAreShown ? this.socialConflictDescription : <any>undefined,
            this.advancedFiltersAreShown ? this.site : <any>undefined,
            this.advancedFiltersAreShown ? this.state : <any>undefined,
            this.advancedFiltersAreShown ? this.departmentId : <any>undefined,
            this.advancedFiltersAreShown ? this.provinceId : <any>undefined,
            this.advancedFiltersAreShown ? this.districtId : <any>undefined,
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

    selectSocialConflict(conflict: UtilityConflictListGetAllDto) {
        this.modalSave.emit(conflict);
        this.close();
    }

    onDepartmentChange(event: any) {
        const departmentId: number = +event.target.value;
        const index: number = this.departments.findIndex(p => p.id == departmentId);
        this.provinceId = -1;
        this.districtId = -1;
        this.provinces = [];
        this.districts = [];

        if (index != -1)
            this.provinces = this.departments[index].provinces;
    }

    onProvinceChange(event: any) {
        const provinceId: number = +event.target.value;
        const index: number = this.provinces.findIndex(p => p.id == provinceId);
        this.districts = [];
        this.districtId = -1;
        this.districts = this.provinces[index].districts;
    }

    resetFilters() {
        this.socialConflictCode = '';
        this.socialConflictDescription = '';
        this.site = ConflictSite.All;
        this.departmentId = -1;
        this.provinceId = -1;
        this.districtId = -1;
    }
}
