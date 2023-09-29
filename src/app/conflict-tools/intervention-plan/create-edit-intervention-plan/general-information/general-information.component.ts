import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { InterventionPlanDepartmentDto, InterventionPlanDistrictDto, InterventionPlanDto, InterventionPlanLocationDto, InterventionPlanPersonDto, InterventionPlanProvinceDto, InterventionPlanRegionDto, InterventionPlanSocialConflictDto, InterventionPlanSocialConflictSensibleDto, InterventionPlanTerritorialUnitDto, InterventionPlanUserDto } from '@shared/service-proxies/application/intervention-plan-proxie';
import { ConflictSite, UtilityConflictListGetAllDto, UtilityRegionDto, UtilityServiceProxy } from '@shared/service-proxies/application/utility-proxie';
import { PersonType } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { LazyLoadEvent, Paginator } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'general-information-intervention-plan',
    templateUrl: 'general-information.component.html',
    styleUrls: [
        'general-information.component.css'
    ]
})
export class GeneralInformationInterventionPlanComponent extends AppComponentBase implements OnInit {

    private _interventionPlan: InterventionPlanDto;

    @ViewChild('paginator', { static: true }) paginator: Paginator;

    get interventionPlan(): InterventionPlanDto {
        return this._interventionPlan;
    }

    @Input() set interventionPlan(value: InterventionPlanDto) {
        this._interventionPlan = value;

        if (this._interventionPlan.interventionPlanTime)
            this.interventionPlanTime = this._interventionPlan.interventionPlanTime.toDate();
    }

    @Output() interventionPlanChange: EventEmitter<InterventionPlanDto> = new EventEmitter<InterventionPlanDto>();
    @Output() showSocialConflictSearch: EventEmitter<void> = new EventEmitter<void>();

    @Input() departments: InterventionPlanDepartmentDto[];
    @Input() territorialUnits: InterventionPlanTerritorialUnitDto[];
    @Input() persons: InterventionPlanPersonDto[];

    interventionPlanTime: Date;
    managers: InterventionPlanPersonDto[];
    analysts: InterventionPlanPersonDto[];
    coordinators: InterventionPlanPersonDto[];

    selectedDepartments: InterventionPlanDepartmentDto[] = [];
    selectedProvinces: InterventionPlanProvinceDto[] = [];
    selectedDistricts: InterventionPlanDistrictDto[] = [];
    selectedRegions: UtilityRegionDto[] = [];

    selectedTerritorialUnit: number = -1;
    selectedDepartmentId: number = -1;
    selectedProvinceId: number = -1;
    selectedDistrictId: number = -1;
    selectedRegionId: number = -1;
    selectedUbicationText: string;

    sites = {
        all: ConflictSite.All,
        socialConflict: ConflictSite.SocialConflict,
        socialConflictSensible: ConflictSite.SocialConflictSensible
    };

    get finalCode(): string {
        return (this.interventionPlan.replaceCount ? this.interventionPlan.replaceCount : '') + ' - ' +
            (this.interventionPlan.replaceYear ? this.interventionPlan.replaceYear : '');
    }

    get socialConflictTitle(): string {
        if (this.interventionPlan.socialConflict)
            return `${this.interventionPlan.socialConflict.code} - ${this.interventionPlan.socialConflict.caseName}`;

        if (this.interventionPlan.socialConflictSensible)
            return `${this.interventionPlan.socialConflictSensible.code} - ${this.interventionPlan.socialConflictSensible.caseName}`;

        return 'Presione el botón de búsqueda para seleccionar un caso conflictivo o situación sensible';
    }

    private skipCount: number = 0;
    private maxResultCount: number = 0;

    constructor(_injector: Injector, private _utilityServiceProxy: UtilityServiceProxy) {
        super(_injector);
        this.primengTableHelper.defaultRecordsCountPerPage = 5;
        this.skipCount = 0;
        this.maxResultCount = this.primengTableHelper.defaultRecordsCountPerPage;
    }

    ngOnInit(): void {
        this.managers = this.persons.filter(p => p.type == PersonType.Manager || p.type == PersonType.Coordinator);
        this.analysts = this.persons.filter(p => p.type == PersonType.Analyst);
        this.coordinators = this.persons.filter(p => p.type == PersonType.Coordinator);

        if (this.interventionPlan.person.id != -1) {
            const index: number = this.persons.findIndex(p => p.id == this.interventionPlan.person.id);

            if (index == -1) {
                this.persons.push(InterventionPlanPersonDto.fromJS(this.interventionPlan.person));
                this.persons = this.persons.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    getData(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    selectConflict(conflict: UtilityConflictListGetAllDto) {
        if (conflict.site == this.sites.socialConflict) {
            this.interventionPlan.site = conflict.site;
            this.interventionPlan.socialConflict = new InterventionPlanSocialConflictDto({
                id: conflict.id,
                code: conflict.code,
                caseName: conflict.name
            });
        }

        if (conflict.site == this.sites.socialConflictSensible) {
            this.interventionPlan.site = conflict.site;
            this.interventionPlan.socialConflictSensible = new InterventionPlanSocialConflictSensibleDto({
                id: conflict.id,
                code: conflict.code,
                caseName: conflict.name
            });
        }

        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    onTerritorialUnitChange(event: any) {

        const territorialUnitId: number = +event.target.value;
        const index: number = this.territorialUnits.findIndex(p => p.id == territorialUnitId);

        if (index != -1)
            this.selectedDepartments = this.departments.filter(p => p.territorialUnitIds.findIndex(p => p == territorialUnitId) != -1);

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

        const territorialIndex: number = this.territorialUnits.findIndex(p => p.id == this.selectedTerritorialUnit);
        const departmentIndex: number = this.selectedDepartments.findIndex(p => p.id == this.selectedDepartmentId);
        const provinceIndex: number = this.selectedDepartments[departmentIndex].provinces.findIndex(p => p.id == this.selectedProvinceId);
        const districtIndex: number = this.selectedDepartments[departmentIndex].provinces[provinceIndex].districts.findIndex(p => p.id == this.selectedDistrictId);
        const regionIndex: number = this.selectedRegionId <= 0 ? -1 : this.selectedRegions.findIndex(p => p.id == this.selectedRegionId);

        this.interventionPlan.locations.push(new InterventionPlanLocationDto({
            id: undefined,
            territorialUnit: InterventionPlanTerritorialUnitDto.fromJS(this.territorialUnits[territorialIndex]),
            department: InterventionPlanDepartmentDto.fromJS(this.selectedDepartments[departmentIndex]),
            province: InterventionPlanProvinceDto.fromJS(this.selectedDepartments[departmentIndex].provinces[provinceIndex]),
            district: InterventionPlanDistrictDto.fromJS(this.selectedDepartments[departmentIndex].provinces[provinceIndex].districts[districtIndex]),
            region: regionIndex == -1 ? undefined : InterventionPlanRegionDto.fromJS(this.selectedRegions[regionIndex]),
            ubication: this.selectedUbicationText ? this.selectedUbicationText.toUpperCase() : undefined,
            remove: false
        }));

        this.selectedUbicationText = '';

        this.notify.success('Se agregó correctamente el territorio a la lista de territorios', 'Aviso');
        this.onProvinceChange({ target: { value: this.selectedProvinceId } });

        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    removeItemFromLocation(location: InterventionPlanLocationDto, index: number) {
        if (location.id) {
            location.remove = true;
            this.notify.warn('Se ha marcado para eliminar la localización seleccionada');
        } else {
            this.interventionPlan.locations.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemoveLocation(location: InterventionPlanLocationDto) {
        location.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar de la localización seleccionada');
    }

    processInterventionPlanTime(): boolean {
        if (!this.interventionPlanTime || (<any>this.interventionPlanTime == 'Invalid Date')) {
            this.message.error('Debe seleccionar la fecha de elaboración antes de guardar los cambios.', 'Aviso');
            return false;
        }

        this.interventionPlan.interventionPlanTime = moment(this.interventionPlanTime);

        return true;
    }

    findSocialConflict() {
        this.showSocialConflictSearch.emit();
    }

    removeSocialConflict() {
        this.interventionPlan.socialConflict = undefined;
        this.interventionPlan.socialConflictSensible = undefined;
    }

    getUserName(user: InterventionPlanUserDto): string {
        if (!user)
            return '';

        return (user.name ? user.name : '').trim() + ' ' + (user.surname ? user.surname : '').trim();
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.interventionPlan.locations) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}