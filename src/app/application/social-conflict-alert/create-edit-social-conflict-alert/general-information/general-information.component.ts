import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictAlertDepartmentDto, SocialConflictAlertDistrictDto, SocialConflictAlertDto, SocialConflictAlertLocationDto, SocialConflictAlertProvinceDto, SocialConflictAlertRegionDto, SocialConflictAlertTerritorialUnitDto, SocialConflictAlertUserDto } from '@shared/service-proxies/application/social-conflict-alert-proxie';
import { UtilityRegionDto, UtilityServiceProxy } from '@shared/service-proxies/application/utility-proxie';
import * as moment from 'moment';
import { LazyLoadEvent, Paginator } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'general-information-social-conflict-alert',
    templateUrl: 'general-information.component.html',
    styleUrls: [
        'general-information.component.css'
    ]
})
export class GeneralInformationSocialConflictAlertComponent extends AppComponentBase {

    private _socialConflictAlert: SocialConflictAlertDto;
    private _busy: boolean;
    private _alertTime: Date;

    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Input() set busy(value: boolean) {
        this._busy = value;
    }

    get busy(): boolean {
        return this._busy;
    }

    @Input() set socialConflictAlert(value: SocialConflictAlertDto) {
        this._socialConflictAlert = value;
        this._alertTime = value.alertTime?.toDate();
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    get socialConflictAlert(): SocialConflictAlertDto {
        return this._socialConflictAlert;
    }

    set alertTime(value: Date) {
        this._alertTime = value;
        this._socialConflictAlert.alertTime = moment(value);
    }

    get alertTime(): Date {
        return this._alertTime;
    }

    get socialConflictTitle(): string {
        if (this.socialConflictAlert.socialConflict)
            return `${this.socialConflictAlert.socialConflict.code} - ${this.socialConflictAlert.socialConflict.caseName}`;

        return 'Presione el botón de búsqueda para seleccionar un caso conflictivo';
    }

    @Input() departments: SocialConflictAlertDepartmentDto[];
    @Input() territorialUnits: SocialConflictAlertTerritorialUnitDto[];

    @Output() busyChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() socialConflictAlertChange: EventEmitter<SocialConflictAlertDto> = new EventEmitter<SocialConflictAlertDto>();
    @Output() showSocialConflictSearch: EventEmitter<void> = new EventEmitter<void>();

    selectedDepartments: SocialConflictAlertDepartmentDto[] = [];
    selectedProvinces: SocialConflictAlertProvinceDto[] = [];
    selectedDistricts: SocialConflictAlertDistrictDto[] = [];
    selectedRegions: UtilityRegionDto[] = [];

    selectedTerritorialUnitId: number = -1;
    selectedDepartmentId: number = -1;
    selectedProvinceId: number = -1;
    selectedDistrictId: number = -1;
    selectedRegionId: number = -1;
    selectedUbicationText: string;

    private skipCount: number = 0;
    private maxResultCount: number = 0;

    constructor(_injector: Injector, private _utilityServiceProxy: UtilityServiceProxy) {
        super(_injector);
        this.primengTableHelper.defaultRecordsCountPerPage = 5;
        this.skipCount = 0;
        this.maxResultCount = this.primengTableHelper.defaultRecordsCountPerPage;
    }

    getData(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    findSocialConflict() {
        this.showSocialConflictSearch.emit();
    }

    onTerritorialUnitChange(event: any) {

        const territorialUnitId: number = +event.target.value;
        const index: number = this.territorialUnits.findIndex(p => p.id == territorialUnitId);

        if (index != -1)
            this.selectedDepartments = this.departments.filter(p => p.territorialUnitId == territorialUnitId);

        const departmentIndex: number = this.selectedDepartments.findIndex(p => p.id == this.selectedDepartmentId);

        if (departmentIndex == -1) {
            this.selectedDepartmentId = -1;
            this.selectedProvinceId = -1;
            this.selectedDistrictId = -1;
            this.selectedRegionId = -1;
            this.selectedProvinces = [];
            this.selectedDistricts = [];
            this.selectedRegions = [];
        }
    }

    onDepartmentChange(event: any) {
        const departmentId: number = +event.target.value;
        const index: number = this.departments.findIndex(p => p.id == departmentId);
        this.selectedProvinceId = -1;
        this.selectedDistrictId = -1;
        this.selectedRegionId = -1;
        this.selectedProvinces = [];
        this.selectedDistricts = [];
        this.selectedRegions = [];

        if (index != -1)
            this.selectedProvinces = this.departments[index].provinces;
    }

    onProvinceChange(event: any) {
        const provinceId: number = +event.target.value;
        const index: number = this.selectedProvinces.findIndex(p => p.id == provinceId);
        this.selectedDistricts = [];
        this.selectedDistrictId = -1;
        this.selectedRegions = [];
        this.selectedRegionId = -1;
        this.selectedDistricts = this.selectedProvinces[index].districts;
    }

    onDistrictChange(event: any) {
        const districtId: number = +event.target.value;
        const index: number = this.selectedDistricts.findIndex(p => p.id == districtId);
        this.selectedRegions = [];
        this.selectedRegionId = -1;

        if (index != -1) {
            this.showMainSpinner('Cargando centros poblados, por favor espere...');
            this._utilityServiceProxy
                .getAllRegions(undefined, districtId, 'Name ASC', 1000, 0)
                .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1000)))
                .subscribe(response => {
                    this.selectedRegions = response.items;
                });
        } else {
            this.selectedRegions = [];
        }
    }

    addTerritorialUnit() {

        if (!this.selectedDepartmentId || this.selectedDepartmentId <= 0) {
            this.message.error('Debe seleccionar el departamento antes de agregarlo a la lista de territorios del conflicto social', 'Aviso');
            return;
        }
        if (!this.selectedProvinceId || this.selectedProvinceId <= 0) {
            this.message.error('Debe seleccionar la provincia antes de agregarlo a la lista de territorios del conflicto social', 'Aviso');
            return;
        }
        if (!this.selectedDistrictId || this.selectedDistrictId <= 0) {
            this.message.error('Debe seleccionar el distrito antes de agregarlo a la lista de territorios del conflicto social', 'Aviso');
            return;
        }

        const territorialIndex: number = this.territorialUnits.findIndex(p => p.id == this.selectedTerritorialUnitId);
        const departmentIndex: number = this.selectedDepartments.findIndex(p => p.id == this.selectedDepartmentId);
        const provinceIndex: number = this.selectedDepartments[departmentIndex].provinces.findIndex(p => p.id == this.selectedProvinceId);
        const districtIndex: number = this.selectedDepartments[departmentIndex].provinces[provinceIndex].districts.findIndex(p => p.id == this.selectedDistrictId);
        const regionIndex: number = this.selectedRegionId <= 0 ? -1 : this.selectedRegions.findIndex(p => p.id == this.selectedRegionId);

        this.socialConflictAlert.locations.push(new SocialConflictAlertLocationDto({
            id: undefined,
            territorialUnit: this.territorialUnits[territorialIndex],
            department: this.selectedDepartments[departmentIndex],
            province: this.selectedDepartments[departmentIndex].provinces[provinceIndex],
            district: this.selectedDepartments[departmentIndex].provinces[provinceIndex].districts[districtIndex],
            region: regionIndex == -1 ? undefined : new SocialConflictAlertRegionDto(this.selectedRegions[regionIndex]),
            ubication: this.selectedUbicationText ? this.selectedUbicationText.toUpperCase() : undefined,
            remove: false
        }));

        this.selectedTerritorialUnitId = -1;
        this.selectedDepartmentId = -1;
        this.selectedProvinceId = -1;
        this.selectedDistrictId = -1;
        this.selectedRegionId = -1;
        this.selectedProvinces = [];
        this.selectedDistricts = [];
        this.selectedRegions = [];
        this.selectedUbicationText = '';

        this.notify.success('Se agregó correctamente el territorio a la lista de ámbito geográfico', 'Aviso');
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    removeItemFromLocation(location: SocialConflictAlertLocationDto, index: number) {
        if (location.id) {
            location.remove = true;
            this.notify.warn('Se ha marcado para eliminar la localización seleccionada');
        } else {
            this.socialConflictAlert.locations.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemoveLocation(location: SocialConflictAlertLocationDto) {
        location.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar de la localización seleccionada');
    }

    getUserName(user: SocialConflictAlertUserDto): string {
        if (!user)
            return '';

        return (user.name ? user.name : '').trim() + ' ' + (user.surname ? user.surname : '').trim();
    }

    removeSocialConflict() {
        this.message.confirm('¿Estas seguro de eliminar el caso seleccionado de la alerta?', 'Aviso', confirmation => {
            if (confirmation) {
                this.socialConflictAlert.socialConflict = undefined;
            }
        });
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.socialConflictAlert.locations) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}