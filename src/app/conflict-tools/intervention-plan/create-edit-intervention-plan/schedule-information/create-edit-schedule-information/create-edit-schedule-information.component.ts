import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { InterventionPlanActivityLocationDto, InterventionPlanAlertResponsibleLocationDto, InterventionPlanDirectoryGovernmentLocationDto, InterventionPlanDto, InterventionPlanEntityLocationDto, InterventionPlanMethodologyLocationDto, InterventionPlanScheduleLocationDto } from '@shared/service-proxies/application/intervention-plan-proxie';
import { InterventionPlanEntityType, UtilityDirectoryGovernmentDto } from '@shared/service-proxies/application/utility-proxie';
import * as moment from 'moment';

@Component({
    selector: 'create-edit-schedule-information-intervention-plan',
    templateUrl: 'create-edit-schedule-information.component.html',
    styleUrls: [
        'create-edit-schedule-information.component.css'
    ]
})
export class CreateEditScheduleInformationInterventionPlanComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: InterventionPlanScheduleLocationDto, index: number }> = new EventEmitter<{ value: InterventionPlanScheduleLocationDto, index: number }>();
    @Output() findDirectoryGovernment: EventEmitter<void> = new EventEmitter<void>();
    @Output() findMethodology: EventEmitter<void> = new EventEmitter<void>();

    item: InterventionPlanScheduleLocationDto = new InterventionPlanScheduleLocationDto();
    scheduleTime: Date;
    rowIndex: number;

    activities: InterventionPlanActivityLocationDto[];
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

    get objectiveText(): string {
        return this.item.interventionPlanMethodology ? this.item.interventionPlanMethodology.methodology : 'Buscar objetivos...';
    }

    constructor(_injector: Injector) {
        super(_injector);
    }

    show(
        rowIndex: number,
        item: InterventionPlanScheduleLocationDto,
        activities: InterventionPlanActivityLocationDto[],
        entities: InterventionPlanEntityLocationDto[],
        alertResponsibles: InterventionPlanAlertResponsibleLocationDto[]): void {

        this.activities = activities;
        this.entities = entities;
        this.alertResponsibles = alertResponsibles;

        this.rowIndex = rowIndex;
        this.saving = false;

        if (item) {
            this.rowIndex = rowIndex;
            this.item = InterventionPlanScheduleLocationDto.fromJS(item);
            this.scheduleTime = this.item.scheduleTime?.toDate();
        } else {
            this.rowIndex = undefined;
            this.scheduleTime = undefined;
            this.item = new InterventionPlanScheduleLocationDto();
        }

        if (this.item?.interventionPlanActivity && this.item.interventionPlanActivity.id != -1 && this.item.interventionPlanActivity.id != 0) {
            const interventionPlanActivityIndex: number = this.activities.findIndex(p => p.id == this.item.interventionPlanActivity.id);

            if (interventionPlanActivityIndex == -1) {
                this.activities.push(InterventionPlanActivityLocationDto.fromJS(this.item.interventionPlanActivity));
                this.activities = this.activities.sort((a, b) => a.name.localeCompare(b.name));
            }
        }
        if (this.item?.interventionPlanEntity && this.item.interventionPlanEntity.id != -1 && this.item.interventionPlanEntity.id != 0) {
            const interventionPlanEntityIndex: number = this.entities.findIndex(p => p.id == this.item.interventionPlanEntity.id);

            if (interventionPlanEntityIndex == -1) {
                this.entities.push(InterventionPlanEntityLocationDto.fromJS(this.item.interventionPlanEntity));
                this.entities = this.entities.sort((a, b) => a.name.localeCompare(b.name));
            }
        }
        this.active = true;
        this.modal.show();
    }

    onActivityChange(event: any) {
        const activityId: number = +event.target.value;
        const index: number = this.activities.findIndex(p => p.id == activityId);

        if (index != -1) {
            this.item.interventionPlanActivity.name = this.activities[index].name;
            this.item.interventionPlanActivity.showDescription = this.activities[index].showDescription;
        } else {
            this.item.interventionPlanActivity.id = -1;
            this.item.interventionPlanActivity.name = undefined;
            this.item.interventionPlanActivity.showDescription = false;
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

    findObjectiveEvent() {
        this.findMethodology.emit();
    }

    removeObjective() {
        this.item.interventionPlanMethodology = undefined;
    }

    addOrUpdateMethodology(event: InterventionPlanMethodologyLocationDto) {
        this.item.interventionPlanMethodology = event;
    }

    onShown(): void {
        document.getElementById('ScheduleDescription')?.focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if (this.item.interventionPlanActivity.id == -1) {
            this.message.info('Debe seleccionar el tipo de actividad antes de guardar los cambios', 'Aviso');
            return;
        }
        if (!this.scheduleTime || (<any>this.scheduleTime == 'Invalid Date')) {
            this.message.error('Debe seleccionar la fecha del plazo de ejecución antes de agregarlo a la lista', 'Aviso');
            return;
        }
        if (this.item.interventionPlanActivity.showDescription && this.isNullEmptyOrWhiteSpace(this.item.activity)) {
            this.message.info('Debe ingresar la descripción del tipo de actividad "Otros" antes de guardar los cambios', 'Aviso');
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
        if(!this.item.interventionPlanMethodology) {
            this.message.info('Debe seleccionar un objetivo antes de guardar los cambios', 'Aviso');
            return;
        }
        if (this.isNullEmptyOrWhiteSpace(this.item.schedule)) {
            this.message.error('Debe ingresar la actividad planificada antes de guardar los cambios', 'Aviso');
            return;
        }

        this.item.scheduleTime = moment(this.scheduleTime);
        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}
