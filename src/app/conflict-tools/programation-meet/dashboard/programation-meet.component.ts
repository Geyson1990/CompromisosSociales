import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SectorMeetDto, SectorMeetServiceProxy } from '@shared/service-proxies/application/sector-meet-proxie';
import { SectorMeetSessionType } from '@shared/service-proxies/application/sector-meet-session-proxie';
import { UtilityDepartmentDataDto, UtilityDistrictDataDto, UtilityPersonDto, UtilityProvinceDataDto, UtilityServiceProxy } from '@shared/service-proxies/application/utility-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    templateUrl: 'programation-meet.component.html',
    styleUrls: [
        'programation-meet.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class ProgramationMeetComponent extends AppComponentBase implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown: boolean;
    currentDate: moment.Moment = moment();
    sectorMeetCode: string;
    sectorMeetName: string;
    sectorMeetSessionType: SectorMeetSessionType = SectorMeetSessionType.NONE;
    departmentId: number = -1;
    departments: UtilityDepartmentDataDto[];
    provinceId: number = -1;
    selectedProvinces: UtilityProvinceDataDto[];
    districtId: number = -1;
    selectedDistricts: UtilityDistrictDataDto[];
    personId: number = -1;
    persons: UtilityPersonDto[];
    filterByDate: boolean;
    dateRange: Date[] = [moment().startOf('month').toDate(), moment().endOf('day').toDate()];
    types = {
        none: SectorMeetSessionType.NONE,
        presential: SectorMeetSessionType.PRESENTIAL,
        remote: SectorMeetSessionType.REMOTE
    }

    constructor(_injector: Injector, private _utilityServiceProxy: UtilityServiceProxy, private _sectorMeetServiceProxy: SectorMeetServiceProxy) {
        super(_injector);
    }

    ngOnInit(): void {
        this._utilityServiceProxy
            .getAllSocialConflictAlertFilters()
            .pipe(finalize(() => this.hideMainSpinner()))
            .subscribe(response => {
                this.departments = response.departments;
                this.persons = response.persons;
            });
    }
 
    createItem() {
        this.router.navigate(['app/conflict-tools/programation-meet/create-meet']);
    }

    editItem(item: SectorMeetDto) {
        this.router.navigate(['app/conflict-tools/programation-meet/edit-meet', item.id]);
    }

    deleteItem(item: SectorMeetDto): void {
        this.message.confirm(`¿Esta seguro de eliminar la reunión multisectorial Nº ${item.code}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed) {
                this.showMainSpinner('Actualizando información, por favor espere...');
                this._sectorMeetServiceProxy
                    .delete(item.id)
                    .pipe(finalize(() => this.hideMainSpinner()))
                    .subscribe(() => {
                        this.reloadPage();
                        this.notify.error('Eliminado satisfactoriamente');
                    });
            }
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

        this._sectorMeetServiceProxy.getAll(
            this.advancedFiltersAreShown ? this.sectorMeetCode : <any>undefined,
            this.advancedFiltersAreShown ? this.sectorMeetName : <any>undefined,
            this.advancedFiltersAreShown ? this.sectorMeetSessionType : <any>undefined,
            this.advancedFiltersAreShown ? this.departmentId : <any>undefined,
            this.advancedFiltersAreShown ? this.provinceId : <any>undefined,
            this.advancedFiltersAreShown ? this.districtId : <any>undefined,
            this.advancedFiltersAreShown ? this.personId : <any>undefined,
            this.advancedFiltersAreShown ? this.filterByDate : <any>undefined,
            this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[0]).startOf('day') : <any>undefined,
            this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[1]).endOf('day') : <any>undefined,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event),
            1
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    addMeet(id:number) {
        this.message.confirm('Se registrará una reunión. ¿Esta seguro de continuar?', 'Aviso', confirmation => {
            if (confirmation) {
                this.completeSaving(id);
            }
        });
    }

    private completeSaving(id: number) {
        this.showMainSpinner('Guardando información, por favor espere...');

            this._sectorMeetServiceProxy
                .createMeet(id)
                .subscribe(() => {
                        this.notify.success('Se registro correctamente la información', 'Aviso');
                        this.hideMainSpinner();
                        this.reloadPage();
                }, () => setTimeout(() => this.hideMainSpinner(), 1500));
    }

    redirectMeet(id: number) {
        this.router.navigate(['app/conflict-tools/sector-meet/edit-meet',id]);
    }

    showOption(record: any) {
        if(  record.state === 2 || record.creationTime.isSameOrAfter(this.currentDate)) {
            return false;
        }
        if( record.state !== 2 ) {
            return true;
        }
        return true;
    }

    getState(state:number) {
        return  state === 2 ? 'Generado' : 'Pendiente';
    }

    onDepartmentChange(event: any) {
        const departmentId: number = +event.target.value;
        const index: number = this.departments.findIndex(p => p.id == departmentId);
        this.provinceId = -1;
        this.districtId = -1;
        this.selectedProvinces = [];
        this.selectedDistricts = [];

        if (index != -1)
            this.selectedProvinces = this.departments[index].provinces;
    }

    onProvinceChange(event: any) {
        const provinceId: number = +event.target.value;
        const index: number = this.selectedProvinces.findIndex(p => p.id == provinceId);
        this.selectedDistricts = [];
        this.districtId = -1;
        this.selectedDistricts = this.selectedProvinces[index].districts;
    }

    resetFilters() {
        this.sectorMeetCode = '';
        this.sectorMeetName = '';
        this.sectorMeetSessionType = SectorMeetSessionType.NONE;
        this.departmentId = -1;
        this.provinceId = -1;
        this.districtId = -1;
        this.personId = -1;
    }
}