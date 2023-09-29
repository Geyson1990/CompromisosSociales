import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictSensibleStateLocationDto, SocialConflictSensiblePersonDto } from '@shared/service-proxies/application/social-conflict-sensible-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as moment from 'moment';

@Component({
    selector: 'create-edit-state-information-social-conflict-sensible',
    templateUrl: 'create-edit-state.component.html',
    styleUrls: [
        'create-edit-state.component.css'
    ]
})
export class CreateEditStateInformationSocialConflictSensibleComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: SocialConflictSensibleStateLocationDto, index: number }> = new EventEmitter<{ value: SocialConflictSensibleStateLocationDto, index: number }>();

    persons: SocialConflictSensiblePersonDto[];
    managers: SocialConflictSensiblePersonDto[];
    item: SocialConflictSensibleStateLocationDto = new SocialConflictSensibleStateLocationDto();
    stateTime: Date;
    active: boolean;
    saving: boolean;
    rowIndex: number;

    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: SocialConflictSensibleStateLocationDto, persons: SocialConflictSensiblePersonDto[]): void {

        if (item) {
            this.rowIndex = rowIndex;
            this.item = SocialConflictSensibleStateLocationDto.fromJS(item);
            this.stateTime = this.item.stateTime?.toDate();
        } else {
            this.rowIndex = undefined;
            this.stateTime = undefined;
            this.item = new SocialConflictSensibleStateLocationDto();
        }

        this.persons = Object.assign([], persons);
        this.managers = this.persons;

        if (this.item?.manager && this.item.manager.id != -1) {
            const managerIndex: number = this.managers.findIndex(p => p.id == this.item.manager.id);

            if (managerIndex == -1) {
                this.managers.push(SocialConflictSensiblePersonDto.fromJS(this.item.manager));
                this.managers = this.managers.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        this.saving = false;
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

    onShown(): void {

    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if (this.item.manager.id == -1) {
            this.message.error('Debe seleccionar al responsable de la situación actual antes de agregarlo a la lista', 'Aviso');
            return;
        } 
        if (!this.stateTime || (<any>this.stateTime == 'Invalid Date')) {
            this.message.error('Debe seleccionar la fecha de la situación actual antes de agregarlo a la lista', 'Aviso');
            return;
        }
        if (this.isNullEmptyOrWhiteSpace(this.item.state)) {
            this.message.error('Debe ingresar la proyección y acciones propuestas antes de agregarlo a la lista', 'Aviso');
            return;
        }
        if (this.isNullEmptyOrWhiteSpace(this.item.description)) {
            this.message.error('Debe ingresar la situación actual antes de agregarlo a la lista', 'Aviso');
            return;
        }

        this.item.stateTime = moment(this.stateTime);

        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}
