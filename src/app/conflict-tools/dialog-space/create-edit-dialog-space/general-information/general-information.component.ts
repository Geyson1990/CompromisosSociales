import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DialogSpaceDocumentGetAllDto, DialogSpaceDocumentServiceProxy, DialogSpaceDocumentType } from '@shared/service-proxies/application/dialog-space-document-proxie';
import { DialogSpaceDepartmentDto, DialogSpaceDistrictDto, DialogSpaceDto, DialogSpaceLeaderRelationDto, DialogSpaceLocationDto, DialogSpacePersonDto, DialogSpaceProvinceDto, DialogSpaceRegionDto, DialogSpaceSocialConflictDto, DialogSpaceTeamRelationDto, DialogSpaceTerritorialUnitDto, DialogSpaceTypeRelationDto, DialogSpaceUserDto } from '@shared/service-proxies/application/dialog-space.proxie';
import { UtilityRegionDto, UtilityServiceProxy, UtilitySocialConflictDto } from '@shared/service-proxies/application/utility-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

interface ITeamEvent {
    leader: DialogSpaceLeaderRelationDto;
    leaderIndex: number;
    team: DialogSpaceTeamRelationDto;
    teamIndex: number;
}

@Component({
    selector: 'general-information-dialog-space',
    templateUrl: 'general-information.component.html',
    styleUrls: [
        'general-information.component.css'
    ]
})
export class DialogSpaceGeneralInformationComponent extends AppComponentBase implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @ViewChild('territorialUnitpaginator', { static: true }) territorialUnitpaginator: Paginator;

    @ViewChild('leadersTable', { static: true }) leadersTable: Table;

    @Input() dialogSpace: DialogSpaceDto;
    @Input() departments: DialogSpaceDepartmentDto[];
    @Input() territorialUnits: DialogSpaceTerritorialUnitDto[];
    @Input() types: DialogSpaceTypeRelationDto[];
    @Input() persons: DialogSpacePersonDto[];

    @Output() showSocialConflictSearch: EventEmitter<void> = new EventEmitter<void>();
    @Output() showDirectoryGovernmentSearch: EventEmitter<void> = new EventEmitter<void>();
    @Output() showTeam: EventEmitter<ITeamEvent> = new EventEmitter<ITeamEvent>();
    @Output() showAddDocument: EventEmitter<void> = new EventEmitter<void>();
    @Output() showEditDocument: EventEmitter<DialogSpaceDocumentGetAllDto> = new EventEmitter<DialogSpaceDocumentGetAllDto>();

    get finalCode(): string {
        return `${(this.dialogSpace.replaceCount ? this.dialogSpace.replaceCount : '')} - ${(this.dialogSpace.replaceYear ? this.dialogSpace.replaceYear : '')}`;
    }

    get socialConflictTitle(): string {
        return this.dialogSpace.socialConflict ? `${this.dialogSpace.socialConflict.code} - ${this.dialogSpace.socialConflict.caseName}` : 'Presione el botón de búsqueda para seleccionar un caso conflictivo';
    }

    selectedDepartments: DialogSpaceDepartmentDto[] = [];
    selectedProvinces: DialogSpaceProvinceDto[] = [];
    selectedDistricts: DialogSpaceDistrictDto[] = [];
    selectedRegions: UtilityRegionDto[] = [];

    selectedTerritorialUnit: number = -1;
    selectedDepartmentId: number = -1;
    selectedProvinceId: number = -1;
    selectedDistrictId: number = -1;
    selectedRegionId: number = -1;
    selectedUbicationText: string;

    dialogSpaceDocumentTypes = {
        none: DialogSpaceDocumentType.NONE,
        create: DialogSpaceDocumentType.CREATE,
        update: DialogSpaceDocumentType.UPDATE
    }

    private skipCount: number = 0;
    private maxResultCount: number = 0;

    constructor(_injector: Injector, private _dialogSpaceDocumentServiceProxy: DialogSpaceDocumentServiceProxy, private _utilityServiceProxy: UtilityServiceProxy) {
        super(_injector);
        this.primengTableHelper.defaultRecordsCountPerPage = 5;
        this.skipCount = 0;
        this.maxResultCount = this.primengTableHelper.defaultRecordsCountPerPage;
    }

    ngOnInit() {
        this.formatPagination(this.skipCount, this.maxResultCount);
        this.formatLeaderIndexes();
    }

    getDataTerritorialUnits(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.territorialUnitpaginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.territorialUnitpaginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._dialogSpaceDocumentServiceProxy.getAll(
            this.dialogSpace?.id,
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

        this.dialogSpace.locations.push(new DialogSpaceLocationDto({
            id: undefined,
            territorialUnit: DialogSpaceTerritorialUnitDto.fromJS(this.territorialUnits[territorialIndex]),
            department: DialogSpaceDepartmentDto.fromJS(this.selectedDepartments[departmentIndex]),
            province: DialogSpaceProvinceDto.fromJS(this.selectedDepartments[departmentIndex].provinces[provinceIndex]),
            district: DialogSpaceDistrictDto.fromJS(this.selectedDepartments[departmentIndex].provinces[provinceIndex].districts[districtIndex]),
            region: regionIndex == -1 ? undefined : DialogSpaceRegionDto.fromJS(this.selectedRegions[regionIndex]),
            ubication: this.selectedUbicationText ? this.selectedUbicationText.toUpperCase() : undefined,
            remove: false
        }));

        this.selectedUbicationText = '';

        this.notify.success('Se agregó correctamente el territorio a la lista de territorios', 'Aviso');
        this.onProvinceChange({ target: { value: this.selectedProvinceId } });

        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    selectConflict(conflict: UtilitySocialConflictDto) {
        this.dialogSpace.socialConflict = new DialogSpaceSocialConflictDto({
            id: conflict.id,
            code: conflict.code,
            caseName: conflict.caseName
        });

        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    findSocialConflict() {
        this.showSocialConflictSearch.emit();
    }

    findDirectoryGovernment() {
        this.showDirectoryGovernmentSearch.emit();
    }

    removeSocialConflict() {
        this.dialogSpace.socialConflict = undefined;
    }

    removeItemFromLocation(location: DialogSpaceLocationDto, index: number) {
        if (location.id) {
            location.remove = true;
            this.notify.warn('Se ha marcado para eliminar la localización seleccionada');
        } else {
            this.dialogSpace.locations.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemoveLocation(location: DialogSpaceLocationDto) {
        location.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar de la localización seleccionada');
    }

    removeItem(leader: DialogSpaceLeaderRelationDto, index: number) {
        if (leader.id) {
            leader.remove = true;
            this.notify.warn('Se ha marcado para eliminar el registro seleccionado');
        } else {
            this.dialogSpace.leaders.splice(index, 1);
            this.formatLeaderIndexes();
        }
    }

    cancelRemove(leader: DialogSpaceLeaderRelationDto) {
        leader.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar del registro seleccionado');
    }

    addTeam(leader: DialogSpaceLeaderRelationDto, leaderIndex: number) {
        this.showTeam.emit({ leader: leader, leaderIndex: leaderIndex, team: undefined, teamIndex: undefined });
    }

    editTeam(leader: DialogSpaceLeaderRelationDto, leaderIndex: number, team: DialogSpaceTeamRelationDto, teamIndex: number) {
        this.showTeam.emit({ leader: leader, leaderIndex: leaderIndex, team: team, teamIndex: teamIndex });
    }

    addOrUpdateTeam(event: ITeamEvent) {
        if (event.teamIndex || event.teamIndex == 0) {
            this.dialogSpace.leaders[event.leaderIndex].teams[event.teamIndex] = event.team;
        } else {
            this.dialogSpace.leaders[event.leaderIndex].teams.push(event.team);
        }

        this.formatLeaderIndexes();
    }

    removeTeam(leader: DialogSpaceLeaderRelationDto, leaderIndex: number, team: DialogSpaceTeamRelationDto, teamIndex: number) {
        if (team.id) {
            team.remove = true;
            this.notify.warn('Se ha marcado para eliminar el registro seleccionado');
        } else {
            this.dialogSpace.leaders[leaderIndex].teams.splice(teamIndex, 1);
        }

        this.formatLeaderIndexes();
    }

    cancelRemoveTeam(team: DialogSpaceTeamRelationDto) {
        team.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar del registro seleccionado');
    }

    addDocument() {
        this.showAddDocument.emit();
    }

    editDocument(document: DialogSpaceDocumentGetAllDto) {
        this.showEditDocument.emit(document);
    }

    deleteDocument(dialogSpaceDocument: DialogSpaceDocumentGetAllDto, rowIndex: number) {
        this.message.confirm(`¿Estas seguro de eliminar el documento oficial seleccionado? La operación es irreversible`, 'Aviso', (confirmation) => {
            if (confirmation) {
                this.showMainSpinner('Verificando informacion. Por favor espere...');
                this._dialogSpaceDocumentServiceProxy
                    .delete(dialogSpaceDocument.id)
                    .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1000)))
                    .subscribe(() => {
                        this.notify.success('Documento oficial eliminado satisfactoriamente');
                        this.primengTableHelper.records.splice(rowIndex, 1);
                    });
            }
        });
    }

    getUserName(user: DialogSpaceUserDto): string {
        if (!user)
            return '';

        return (user.name ? user.name : '').trim() + ' ' + (user.surname ? user.surname : '').trim();
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.dialogSpace.locations) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }

    private formatLeaderIndexes() {
        let index: number = 0;
        for (let leader of this.dialogSpace.leaders) {
            leader.index = index;
            this.leadersTable.expandedRowKeys[index] = true;
            index++;
        }
    }
}