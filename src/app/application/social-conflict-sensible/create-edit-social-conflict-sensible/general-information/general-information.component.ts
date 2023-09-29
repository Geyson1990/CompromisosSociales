import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { GeographycType, SocialConflictSensibleDepartmentDto, SocialConflictSensibleDistrictDto, SocialConflictSensibleDto, SocialConflictSensibleLocationDto, SocialConflictSensiblePersonDto, SocialConflictSensibleProvinceDto, SocialConflictSensibleRegionDto, SocialConflictSensibleTerritorialUnitDto, SocialConflictSensibleTypologyDto, SocialConflictSensibleUserDto } from '@shared/service-proxies/application/social-conflict-sensible-proxie';
import { UtilityRegionDto, UtilityServiceProxy } from '@shared/service-proxies/application/utility-proxie';
import { OptionDto, PersonType } from '@shared/service-proxies/service-proxies';
import { LazyLoadEvent, Paginator, SelectItem } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'general-information-social-conflict-sensible',
    templateUrl: 'general-information.component.html',
    styleUrls: [
        'general-information.component.css'
    ]
})
export class GeneralInformationSocialConflictSensibleComponent extends AppComponentBase implements OnInit {

    private _busy: boolean;
    private _socialConflictSensible: SocialConflictSensibleDto;
    private _verificationEnabled: boolean = false;

    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Input() get busy(): boolean {
        return this._busy;
    }

    set busy(value: boolean) {
        this._busy = value;
    }

    @Input() get socialConflictSensible(): SocialConflictSensibleDto {
        return this._socialConflictSensible;
    }

    set socialConflictSensible(value: SocialConflictSensibleDto) {
        this._socialConflictSensible = value;
    }

    @Input() departments: SocialConflictSensibleDepartmentDto[];
    @Input() territorialUnits: SocialConflictSensibleTerritorialUnitDto[];
    @Input() persons: SocialConflictSensiblePersonDto[];
    @Input() typologies: SocialConflictSensibleTypologyDto[];

    @Output() socialConflictSensibleChange: EventEmitter<SocialConflictSensibleDto> = new EventEmitter<SocialConflictSensibleDto>();
    @Output() busyChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    managers: SocialConflictSensiblePersonDto[];
    analysts: SocialConflictSensiblePersonDto[];
    coordinators: SocialConflictSensiblePersonDto[];

    selectedDepartments: SocialConflictSensibleDepartmentDto[] = [];
    selectedProvinces: SocialConflictSensibleProvinceDto[] = [];
    selectedDistricts: SocialConflictSensibleDistrictDto[] = [];
    selectedRegions: UtilityRegionDto[] = [];
    selectedTypologies: SocialConflictSensibleTypologyDto[] = [];

    selectedTerritorialUnit: number = -1;
    selectedDepartmentId: number = -1;
    selectedProvinceId: number = -1;
    selectedDistrictId: number = -1;
    selectedRegionId: number = -1;
    selectedUbicationText: string;
    selectedTypologyId: number = -1;
    selectedSubTypologyId: number = -1;
    selectedSectorId: number = -1;
    selectedSubSectorId: number = -1;

    geograficTypes: OptionDto[] = [
        { name: 'Regional', value: GeographycType.Region },
        { name: 'Multiregional', value: GeographycType.Location },
        { name: 'Nacional', value: GeographycType.National }
    ];

    get finalCode(): string {
        return (this.socialConflictSensible.replaceCount ? this.socialConflictSensible.replaceCount : '') + ' - ' +
            (this.socialConflictSensible.replaceYear ? this.socialConflictSensible.replaceYear : '');
    }

    options: SelectItem[] = [
        { label: 'Aprobado', value: 'true', styleClass: 'state-aproved' },
        { label: 'No aprobado', value: 'false', styleClass: 'state-not-aproved' }
    ];

    get verificationEnabled() {
        return this._verificationEnabled;
    }

    personTypes = {
        none: PersonType.None,
        coordinator: PersonType.Coordinator,
        manager: PersonType.Manager,
        analyst: PersonType.Analyst
    }

    private skipCount: number = 0;
    private maxResultCount: number = 0;

    constructor(_injector: Injector, private _utilityServiceProxy: UtilityServiceProxy) {
        super(_injector);
        this.primengTableHelper.defaultRecordsCountPerPage = 5;
        this.skipCount = 0;
        this.maxResultCount = this.primengTableHelper.defaultRecordsCountPerPage;
        this._verificationEnabled = this.permission.isGranted('Pages.Application.SocialConflictSensible.Verification');
    }

    ngOnInit(): void {
        this.managers = this.persons;
        this.analysts = this.persons.filter(p => p.type == PersonType.Analyst);
        this.coordinators = this.persons.filter(p => p.type == PersonType.Coordinator);
        this.selectedTypologies = this.typologies;

        if (this.socialConflictSensible.analyst.id != -1) {
            const index: number = this.analysts.findIndex(p => p.id == this.socialConflictSensible.analyst.id);

            if (index == -1) {
                this.analysts.push(this.socialConflictSensible.analyst);
                this.analysts = this.analysts.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        if (this.socialConflictSensible.coordinator.id != -1) {
            const index: number = this.coordinators.findIndex(p => p.id == this.socialConflictSensible.coordinator.id);

            if (index == -1) {
                this.coordinators.push(this.socialConflictSensible.coordinator);
                this.coordinators = this.coordinators.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        if (this.socialConflictSensible.manager.id != -1) {
            const index: number = this.managers.findIndex(p => p.id == this.socialConflictSensible.manager.id);

            if (index == -1) {
                this.managers.push(this.socialConflictSensible.manager);
                this.managers = this.managers.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        if (this.socialConflictSensible.typology.id != -1) {
            let index: number = this.selectedTypologies.findIndex(p => p.id == this.socialConflictSensible.typology.id);

            if (index == -1) {
                this.selectedTypologies.push(this.socialConflictSensible.typology);
                this.selectedTypologies = this.selectedTypologies.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    change(command: 'caseName' | 'problem') {
        switch (command) {
            case 'caseName': this.socialConflictSensible.caseNameVerificationChange = true; break;
            case 'problem': this.socialConflictSensible.problemVerificationChange = true; break;
        }
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

    getData(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
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

        this.socialConflictSensible.locations.push(new SocialConflictSensibleLocationDto({
            id: undefined,
            territorialUnit: this.territorialUnits[territorialIndex],
            department: this.selectedDepartments[departmentIndex],
            province: this.selectedDepartments[departmentIndex].provinces[provinceIndex],
            district: this.selectedDepartments[departmentIndex].provinces[provinceIndex].districts[districtIndex],
            region: regionIndex == -1 ? undefined : new SocialConflictSensibleRegionDto(this.selectedRegions[regionIndex]),
            ubication: this.selectedUbicationText ? this.selectedUbicationText.toUpperCase() : undefined,
            remove: false
        }));

        this.selectedUbicationText = '';

        this.notify.success('Se agregó correctamente el territorio a la lista de territorios del conflicto social', 'Aviso');
        this.onProvinceChange({ target: { value: this.selectedProvinceId } });

        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    onGeneralTypologyChange(event: any) {
        const typologyId: number = +event.target.value;
        const index: number = this.selectedTypologies.findIndex(p => p.id == typologyId);

        if (index != -1) {
            this.socialConflictSensible.typology.name = this.selectedTypologies[index].name;
        } else {
            this.socialConflictSensible.typology = new SocialConflictSensibleTypologyDto({ id: -1, name: undefined });
        }
    }

    removeItemFromLocation(location: SocialConflictSensibleLocationDto, index: number) {
        if (location.id) {
            location.remove = true;
            this.notify.warn('Se ha marcado para eliminar la localización seleccionada');
        } else {
            this.socialConflictSensible.locations.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemoveLocation(location: SocialConflictSensibleLocationDto) {
        location.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar de la localización seleccionada');
    }

    getUserName(user: SocialConflictSensibleUserDto): string {
        if (!user)
            return '';

        return (user.name ? user.name : '').trim() + ' ' + (user.surname ? user.surname : '').trim();
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;
        for (let item of this.socialConflictSensible.locations) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }

        const regionCount: number = this.socialConflictSensible.locations
            .map(p => p.department.id)
            .filter((value, index, self) => self.indexOf(value) === index).length;

        switch (regionCount) {
            case 0: this.socialConflictSensible.geographicType = GeographycType.Region; break;
            case 1: this.socialConflictSensible.geographicType = GeographycType.Region; break;
            case 2: this.socialConflictSensible.geographicType = GeographycType.Location; break;
            case 3: this.socialConflictSensible.geographicType = GeographycType.National; break;
            default: this.socialConflictSensible.geographicType = GeographycType.National; break;
        }
    }
}