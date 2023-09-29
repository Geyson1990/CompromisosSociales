import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { InterventionPlanActivityLocationDto, InterventionPlanAlertResponsibleLocationDto, InterventionPlanDirectoryGovernmentLocationDto, InterventionPlanDto, InterventionPlanEntityLocationDto, InterventionPlanRoleLocationDto, InterventionPlanTeamLocationDto } from '@shared/service-proxies/application/intervention-plan-proxie';
import { InterventionPlanEntityType, UtilityDirectoryGovernmentDto } from '@shared/service-proxies/application/utility-proxie';
import * as moment from 'moment';

@Component({
    selector: 'create-edit-team-information-intervention-plan',
    templateUrl: 'create-edit-team-information.component.html',
    styleUrls: [
        'create-edit-team-information.component.css'
    ]
})
export class CreateEditTeamInformationInterventionPlanComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: InterventionPlanTeamLocationDto, index: number }> = new EventEmitter<{ value: InterventionPlanTeamLocationDto, index: number }>();
    @Output() findDirectoryGovernment: EventEmitter<void> = new EventEmitter<void>();

    item: InterventionPlanTeamLocationDto = new InterventionPlanTeamLocationDto();
    rowIndex: number;

    roles: InterventionPlanRoleLocationDto[];
    entities: InterventionPlanEntityLocationDto[];
    alertResponsibles: InterventionPlanAlertResponsibleLocationDto[];

    active: boolean;
    saving: boolean;

    types = {
        sector: InterventionPlanEntityType.Sector,
        responsible: InterventionPlanEntityType.Responsible,
        other: InterventionPlanEntityType.Other
    }

    get activityDirectoryGovernmentText(): string {
        return this.item.directoryGovernment ? this.item.directoryGovernment.name : 'Buscar Entidad del Estado Peruano...';
    }

    constructor(_injector: Injector) {
        super(_injector);
    }

    show(
        rowIndex: number,
        item: InterventionPlanTeamLocationDto,
        roles: InterventionPlanRoleLocationDto[],
        entities: InterventionPlanEntityLocationDto[],
        alertResponsibles: InterventionPlanAlertResponsibleLocationDto[]): void {

        this.roles = roles;
        this.entities = entities;
        this.alertResponsibles = alertResponsibles;

        this.rowIndex = rowIndex;
        this.saving = false;

        if (item) {
            this.rowIndex = rowIndex;
            this.item = InterventionPlanTeamLocationDto.fromJS(item);
        } else {
            this.rowIndex = undefined;
            this.item = new InterventionPlanTeamLocationDto();
        }


        this.active = true;
        this.modal.show();
    }

    onRoleChange(event: any) {
        const roleId: number = +event.target.value;
        const index: number = this.roles.findIndex(p => p.id == roleId);

        if (index != -1) {
            this.item.interventionPlanRole.name = this.roles[index].name;
            this.item.interventionPlanRole.showDescription = this.roles[index].showDescription;
        } else {
            this.item.interventionPlanRole.id = -1;
            this.item.interventionPlanRole.name = undefined;
            this.item.interventionPlanRole.showDescription = false;
        }
    }

    onEntityChange(event: any) {
        const entityId: number = +event.target.value;
        const index: number = this.entities.findIndex(p => p.id == entityId);

        if (index != -1) {
            this.item.interventionPlanEntity.name = this.entities[index].name;
            this.item.interventionPlanEntity.type = this.entities[index].type;
        } else {
            this.item.interventionPlanEntity.id = -1;
            this.item.interventionPlanEntity.name = undefined;
            this.item.interventionPlanEntity.type = InterventionPlanEntityType.None;
        }
    }

    onAlertResponsible(event: any) {
        const alertResponsibleId: number = +event.target.value;
        const index: number = this.alertResponsibles.findIndex(p => p.id == alertResponsibleId);

        if (index != -1) {
            this.item.alertResponsible.name = this.alertResponsibles[index].name;
            this.item.alertResponsible.shortName = this.alertResponsibles[index].shortName;
        } else {
            this.item.alertResponsible.id = -1;
            this.item.alertResponsible.name = undefined;
            this.item.alertResponsible.shortName = undefined;
        }
    }

    addOrUpdateDirectoryGovernmentItem(event: UtilityDirectoryGovernmentDto) {
        this.item.directoryGovernment = InterventionPlanDirectoryGovernmentLocationDto.fromJS(event);
    }

    findDirectoryGovernmentEvent() {
        this.findDirectoryGovernment.emit();
    }

    removeDirectoryGovernment() {
        this.item.directoryGovernment = undefined;
    }

    onShown(): void {
        document.getElementById('TeamName')?.focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if(this.isNullEmptyOrWhiteSpace(this.item.name)) {
            this.message.info('Debe ingresar el nombre antes de guardar los cambios', 'Aviso');
            return;  
        }
        if(this.isNullEmptyOrWhiteSpace(this.item.surname)) {
            this.message.info('Debe ingresar el apellido antes de guardar los cambios', 'Aviso');
            return;  
        }
        if(this.isNullEmptyOrWhiteSpace(this.item.job)) {
            this.message.info('Debe ingresar el cargo antes de guardar los cambios', 'Aviso');
            return;  
        }
        if (this.item.interventionPlanEntity.id == -1) {
            this.message.info('Debe seleccionar el tipo de entidad antes de guardar los cambios', 'Aviso');
            return;
        }
        if ((this.item.interventionPlanEntity.type == this.types.responsible && this.item.alertResponsible.id == -1) ||
            (this.item.interventionPlanEntity.type == this.types.sector && !this.item.directoryGovernment) ||
            (this.item.interventionPlanEntity.type == this.types.other && this.isNullEmptyOrWhiteSpace(this.item.entity))) {
            this.message.info('Debe seleccionar la entidad responsable antes de guardar los cambios', 'Aviso');
            return;
        }
        if (this.isNullEmptyOrWhiteSpace(this.item.job)) {
            this.message.error('Debe ingresar el cargo antes de guardar los cambios', 'Aviso');
            return;
        }
        if (this.item.interventionPlanRole.id == -1) {
            this.message.info('Debe seleccionar el rol en el proceso antes de guardar los cambios', 'Aviso');
            return;
        }
        if (this.item.interventionPlanRole.showDescription && this.isNullEmptyOrWhiteSpace(this.item.role)) {
            this.message.info('Debe ingresar la descripción del rol en el proceso "Otros" antes de guardar los cambios', 'Aviso');
            return;
        }
        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}
