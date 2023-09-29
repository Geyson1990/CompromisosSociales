import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictDepartmentDto, SocialConflictDistrictDto, SocialConflictFactDto, SocialConflictPersonDto, SocialConflictProvinceDto, SocialConflictRegionDto, SocialConflictViolenceFactDto, SocialConflictViolenceFactLocationDto } from '@shared/service-proxies/application/social-conflict-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LazyLoadEvent, LocaleSettings, Paginator } from 'primeng';
import * as moment from 'moment';
import { UtilityRegionDto, UtilityServiceProxy } from '@shared/service-proxies/application/utility-proxie';
import { finalize } from 'rxjs/operators';
import { PersonType } from '@shared/service-proxies/service-proxies';

@Component({
    selector: 'create-edit-violence-fact-social-conflict',
    templateUrl: 'create-edit-violence-fact.component.html',
    styleUrls: [
        'create-edit-violence-fact.component.css'
    ]
})
export class CreateEditViolenceFactSocialConflictComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Output() modalSave: EventEmitter<{ value: SocialConflictViolenceFactDto, index: number }> = new EventEmitter<{ value: SocialConflictViolenceFactDto, index: number }>();

    departments: SocialConflictDepartmentDto[];
    facts: SocialConflictFactDto[];
    persons: SocialConflictPersonDto[];
    managers: SocialConflictPersonDto[];

    rowIndex: number;
    item: SocialConflictViolenceFactDto = new SocialConflictViolenceFactDto();
    startTime: Date;
    endTime: Date;

    active: boolean;
    saving: boolean;

    selectedDepartmentId: number = -1;
    selectedProvinceId: number = -1;
    selectedProvinces: SocialConflictProvinceDto[] = [];
    selectedDistrictId: number = -1;
    selectedDistricts: SocialConflictDistrictDto[] = [];
    selectedRegions: UtilityRegionDto[] = [];
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

    show(rowIndex: number, item: SocialConflictViolenceFactDto, departments: SocialConflictDepartmentDto[], facts: SocialConflictFactDto[], persons: SocialConflictPersonDto[]): void {
        this.rowIndex = rowIndex;
        this.item = item ? item : new SocialConflictViolenceFactDto();
        this.startTime = item && item.startTime ? item.startTime.toDate() : <any>undefined;
        this.endTime = item && item.endTime ? item.endTime.toDate() : <any>undefined;
        this.departments = Object.assign([], departments);
        this.facts = Object.assign([], facts);
        this.persons = Object.assign([], persons);
        this.managers = this.persons.filter(p => p.type == PersonType.Coordinator || p.type == PersonType.Manager);

        if (this.item?.manager && this.item.manager.id != -1) {
            const managerIndex: number = this.managers.findIndex(p => p.id == this.item.manager.id);

            if (managerIndex == -1) {
                this.managers.push(SocialConflictPersonDto.fromJS(this.item.manager));
                this.managers = this.managers.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        this.formatPagination(this.skipCount, this.maxResultCount);
        this.active = true;
        this.modal.show();
    }

    onManagerChange(event: any) {
        const managerId: number = +event.target.value;
        const index: number = this.managers.findIndex(p => p.id == managerId);

        if (index != -1) {
            this.item.manager.name = this.managers[index].name;
        } else {
            this.item.manager.id = -1;
            this.item.manager.name = undefined;
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
        this.selectedRegions = [];
        this.selectedDistrictId = -1;
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

    onFactChange(event: any) {
        const factId: number = +event.target.value;
        const index: number = this.facts.findIndex(p => p.id == factId);

        if (index != -1) {
            this.item.fact.name = this.facts[index].name;
        } else {
            this.item.fact.id = -1;
            this.item.fact.name = undefined;
        }
    }

    addRegion() {
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

        const departmentIndex: number = this.departments.findIndex(p => p.id == this.selectedDepartmentId);
        const provinceIndex: number = this.departments[departmentIndex].provinces.findIndex(p => p.id == this.selectedProvinceId);
        const districtIndex: number = this.departments[departmentIndex].provinces[provinceIndex].districts.findIndex(p => p.id == this.selectedDistrictId);
        const regionIndex: number = this.selectedRegionId <= 0 ? -1 : this.selectedRegions.findIndex(p => p.id == this.selectedRegionId);

        this.item.locations.push(new SocialConflictViolenceFactLocationDto({
            id: undefined,
            department: this.departments[departmentIndex],
            province: this.departments[departmentIndex].provinces[provinceIndex],
            district: this.departments[departmentIndex].provinces[provinceIndex].districts[districtIndex],
            region: regionIndex == -1 ? undefined : new SocialConflictRegionDto(this.selectedRegions[regionIndex]),
            ubication: this.selectedUbicationText ? this.selectedUbicationText.toUpperCase() : undefined,
            remove: false
        }));

        this.selectedRegionId = -1;
        this.selectedUbicationText = '';

        this.notify.success('Se agregó correctamente el territorio a la lista de regiones del hecho conflictivo', 'Aviso');
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    getData(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    removeItemFromLocation(location: SocialConflictViolenceFactLocationDto, index: number) {
        if (location.id) {
            location.remove = true;
            this.notify.warn('Se ha marcado para eliminar la localización seleccionada');
        } else {
            this.item.locations.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemoveLocation(location: SocialConflictViolenceFactLocationDto) {
        location.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar de la localización seleccionada');
    }

    onShown(): void {

    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if (this.item.fact.id == -1) {
            this.message.info('Debe seleccionar el tipo de hecho antes de continuar');
            return;
        }
        if (this.isNullEmptyOrWhiteSpace(this.item.description)) {
            this.message.info('Debe ingresar la descripción del hecho antes de continuar');
            return;
        }
        if (!this.startTime || (<any>this.startTime == 'Invalid Date')) {
            this.message.info('Debe ingresar la fecha de inicio del hecho antes de continuar');
            return;
        }
        if (this.endTime && (<any>this.endTime == 'Invalid Date')) {
            this.message.info('Debe ingresar una fecha de término válida del hecho antes de continuar');
            return;
        }

        if (this.startTime && this.endTime && this.startTime.getTime() > this.endTime.getTime()) {
            this.message.info('La fecha de inicio no debe ser mayor a la fecha de término del hecho');
            return;
        }

        this.item.responsible = this.item.responsible ? this.item.responsible.toUpperCase() : '';
        this.item.startTime = moment(this.startTime);
        this.item.endTime = this.endTime ? moment(this.endTime) : <any>undefined;

        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;
        for (let item of this.item.locations) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}