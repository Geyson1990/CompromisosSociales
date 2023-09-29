import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { GeographycType, GovernmentLevelType, SocialConflictDepartmentDto, SocialConflictDistrictDto, SocialConflictDto, SocialConflictLocationDto, SocialConflictPersonDto, SocialConflictProvinceDto, SocialConflictRegionDto, SocialConflictSectorDto, SocialConflictSubTypologyDto, SocialConflictTerritorialUnitDto, SocialConflictTypologyDto, SocialConflictUserDto } from '@shared/service-proxies/application/social-conflict-proxie';
import { UtilityRegionDto, UtilityServiceProxy } from '@shared/service-proxies/application/utility-proxie';
import { OptionDto, PersonType } from '@shared/service-proxies/service-proxies';
import { LazyLoadEvent, Paginator, SelectItem } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'general-information-social-conflict',
    templateUrl: 'general-information.component.html',
    styleUrls: [
        'general-information.component.css'
    ]
})
export class GeneralInformationSocialConflcitComponent extends AppComponentBase implements OnInit {

    private _busy: boolean;
    private _socialConflict: SocialConflictDto;
    private _verificationEnabled: boolean = false;

    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Input() get busy(): boolean {
        return this._busy;
    }

    set busy(value: boolean) {
        this._busy = value;
    }

    @Input() get socialConflict(): SocialConflictDto {
        return this._socialConflict;
    }

    set socialConflict(value: SocialConflictDto) {
        this._socialConflict = value;
    }

    @Input() departments: SocialConflictDepartmentDto[];
    @Input() territorialUnits: SocialConflictTerritorialUnitDto[];
    @Input() persons: SocialConflictPersonDto[];
    @Input() typologies: SocialConflictTypologyDto[];
    @Input() sectors: SocialConflictSectorDto[];
    @Input() hasPermission: boolean;

    @Output() socialConflictChange: EventEmitter<SocialConflictDto> = new EventEmitter<SocialConflictDto>();
    @Output() busyChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    managers: SocialConflictPersonDto[];
    analysts: SocialConflictPersonDto[];
    coordinators: SocialConflictPersonDto[];

    selectedDepartments: SocialConflictDepartmentDto[] = [];
    selectedProvinces: SocialConflictProvinceDto[] = [];
    selectedDistricts: SocialConflictDistrictDto[] = [];
    selectedRegions: UtilityRegionDto[] = [];
    selectedTypologies: SocialConflictTypologyDto[] = [];
    selectedSubTypologies: SocialConflictSubTypologyDto[] = [];
    selectedSectors: SocialConflictSectorDto[] = [];

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

    get finalCode(): string {
        return (this.socialConflict.replaceCount ? this.socialConflict.replaceCount : '') + ' - ' +
            (this.socialConflict.replaceYear ? this.socialConflict.replaceYear : '');
    }

    geograficTypes: OptionDto[] = [
        { name: 'Regional', value: GeographycType.Region },
        { name: 'Multiregional', value: GeographycType.Location },
        { name: 'Nacional', value: GeographycType.National }
    ];

    governmentLevelTypes: OptionDto[] = [
        { name: 'Seleccione', value: GovernmentLevelType.None },
        { name: 'Local', value: GovernmentLevelType.Location },
        { name: 'Regional', value: GovernmentLevelType.Region },
        { name: 'Nacional', value: GovernmentLevelType.National }
    ];

    personTypes = {
        none: PersonType.None,
        coordinator: PersonType.Coordinator,
        manager: PersonType.Manager,
        analyst: PersonType.Analyst
    }
    
    options: SelectItem[] = [
        { label: 'Aprobado', value: 'true', styleClass: 'state-aproved' },
        { label: 'No aprobado', value: 'false', styleClass: 'state-not-aproved' }
    ];

    get verificationEnabled() {
        return this._verificationEnabled;
    }

    private skipCount: number = 0;
    private maxResultCount: number = 0;

    constructor(_injector: Injector, private _utilityServiceProxy: UtilityServiceProxy) {
        super(_injector);
        this.primengTableHelper.defaultRecordsCountPerPage = 5;
        this.skipCount = 0;
        this.maxResultCount = this.primengTableHelper.defaultRecordsCountPerPage;
        this._verificationEnabled = this.permission.isGranted('Pages.Application.SocialConflict.Verification');
    }

    ngOnInit(): void {
        this.managers = this.persons.filter(p => p.type == PersonType.Manager || p.type == PersonType.Coordinator);
        this.analysts = this.persons.filter(p => p.type == PersonType.Analyst);
        this.coordinators = this.persons.filter(p => p.type == PersonType.Coordinator);
        this.selectedTypologies = this.typologies;
        this.selectedSectors = this.sectors;

        if (this.socialConflict.analyst.id != -1) {
            const index: number = this.analysts.findIndex(p => p.id == this.socialConflict.analyst.id);

            if (index == -1) {
                this.analysts.push(this.socialConflict.analyst);
                this.analysts = this.analysts.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        if (this.socialConflict.coordinator.id != -1) {
            const index: number = this.coordinators.findIndex(p => p.id == this.socialConflict.coordinator.id);

            if (index == -1) {
                this.coordinators.push(this.socialConflict.coordinator);
                this.coordinators = this.coordinators.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        if (this.socialConflict.manager.id != -1) {
            const index: number = this.managers.findIndex(p => p.id == this.socialConflict.manager.id);

            if (index == -1) {
                this.managers.push(this.socialConflict.manager);
                this.managers = this.managers.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        if (this.socialConflict.typology.id != -1) {
            let index: number = this.selectedTypologies.findIndex(p => p.id == this.socialConflict.typology.id);

            if (index == -1) {
                this.selectedTypologies.push(this.socialConflict.typology);
                this.selectedTypologies = this.selectedTypologies.sort((a, b) => a.name.localeCompare(b.name));

                if (this.socialConflict.subTypology.id != -1) {
                    this.selectedSubTypologies = [this.socialConflict.subTypology];
                }
            } else {
                this.selectedSubTypologies = this.selectedTypologies[index].subTypologies;

                if (this.socialConflict.subTypology.id != -1) {
                    index = this.selectedSubTypologies.findIndex(p => p.id == this.socialConflict.subTypology.id);

                    if (index == -1) {
                        this.selectedSubTypologies.push(this.socialConflict.subTypology);
                        this.selectedSubTypologies = this.selectedSubTypologies.sort((a, b) => a.name.localeCompare(b.name));
                    }
                }
            }
        }

        if (this.socialConflict.sector.id != -1) {
            let index: number = this.selectedSectors.findIndex(p => p.id == this.socialConflict.sector.id);

            if (index == -1) {
                this.selectedSectors.push(this.socialConflict.sector);
                this.selectedSectors = this.selectedSectors.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    change(command: 'caseName' | 'description' | 'problem') {
        switch (command) {
            case 'caseName': this.socialConflict.caseNameVerificationChange = true; break;
            case 'description': this.socialConflict.descriptionVerificationChange = true; break;
            case 'problem': this.socialConflict.problemVerificationChange = true; break;
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

        this.socialConflict.locations.push(new SocialConflictLocationDto({
            id: undefined,
            territorialUnit: this.territorialUnits[territorialIndex],
            department: this.selectedDepartments[departmentIndex],
            province: this.selectedDepartments[departmentIndex].provinces[provinceIndex],
            district: this.selectedDepartments[departmentIndex].provinces[provinceIndex].districts[districtIndex],
            region: regionIndex == -1 ? undefined : new SocialConflictRegionDto(this.selectedRegions[regionIndex]),
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

        this.socialConflict.subTypology = new SocialConflictSubTypologyDto({ id: -1, name: undefined });

        if (index != -1) {
            this.socialConflict.typology.name = this.selectedTypologies[index].name;
            this.selectedSubTypologies = this.selectedTypologies[index].subTypologies;
        } else {
            this.socialConflict.typology = new SocialConflictTypologyDto({ id: -1, name: undefined, subTypologies: [] });
            this.selectedSubTypologies = [];
        }
    }

    removeItemFromLocation(location: SocialConflictLocationDto, index: number) {
        if (location.id) {
            location.remove = true;
            this.notify.warn('Se ha marcado para eliminar la localización seleccionada');
        } else {
            this.socialConflict.locations.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemoveLocation(location: SocialConflictLocationDto) {
        location.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar de la localización seleccionada');
    }

    getUserName(user: SocialConflictUserDto): string {
        if (!user)
            return '';

        return (user.name ? user.name : '').trim() + ' ' + (user.surname ? user.surname : '').trim();
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;
        for (let item of this.socialConflict.locations) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }

        const regionCount: number = this.socialConflict.locations
            .map(p => p.department.id)
            .filter((value, index, self) => self.indexOf(value) === index).length;

        switch (regionCount) {
            case 0: this.socialConflict.geographicType = GeographycType.Region; break;
            case 1: this.socialConflict.geographicType = GeographycType.Region; break;
            case 2: this.socialConflict.geographicType = GeographycType.Location; break;
            case 3: this.socialConflict.geographicType = GeographycType.National; break;
            default: this.socialConflict.geographicType = GeographycType.National; break;
        }
    }
}