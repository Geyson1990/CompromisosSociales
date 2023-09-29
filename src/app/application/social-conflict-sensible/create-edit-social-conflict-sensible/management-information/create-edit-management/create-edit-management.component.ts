import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictSensibleManagementDto, SocialConflictSensibleManagementLocationDto, SocialConflictSensiblePersonDto, SocialConflictSensibleResourceDto } from '@shared/service-proxies/application/social-conflict-sensible-proxie';
import { AttachmentUploadDto } from '@shared/service-proxies/application/utility-proxie';
import { PersonType } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'create-edit-management-information-social-conflict-sensible',
    templateUrl: 'create-edit-management.component.html',
    styleUrls: [
        'create-edit-management.component.css'
    ]
})
export class CreateEditManagementInformationSocialConflictSensibleComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: SocialConflictSensibleManagementLocationDto, index: number }> = new EventEmitter<{ value: SocialConflictSensibleManagementLocationDto, index: number }>();

    managements: SocialConflictSensibleManagementDto[];
    persons: SocialConflictSensiblePersonDto[];
    managers: SocialConflictSensiblePersonDto[]

    item: SocialConflictSensibleManagementLocationDto = new SocialConflictSensibleManagementLocationDto();
    managementTime: Date;
    active: boolean;
    saving: boolean;
    rowIndex: number;

    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: SocialConflictSensibleManagementLocationDto, managements: SocialConflictSensibleManagementDto[], persons: SocialConflictSensiblePersonDto[]): void {
        
        if (item) {
            this.rowIndex = rowIndex;
            this.item = new SocialConflictSensibleManagementLocationDto(item);
            this.managementTime = this.item.managementTime?.toDate();
        } else {
            this.rowIndex = undefined;
            this.managementTime = undefined;
            this.item = new SocialConflictSensibleManagementLocationDto();
        }

        this.persons = Object.assign([], persons);
        this.managers = this.persons.filter(p => p.type == PersonType.Coordinator || p.type == PersonType.Manager);
        this.managements = Object.assign([], managements);

        if (this.item?.management && this.item.management.id != -1) {
            const managementIndex: number = this.managements.findIndex(p => p.id == this.item.management.id);

            if (managementIndex == -1) {
                this.managements.push(SocialConflictSensibleManagementDto.fromJS(this.item.management));
                this.managements = this.managements.sort((a, b) => a.name.localeCompare(b.name));
            }
        }
        
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

    onManagementChange(event: any) {
        const managementId: number = +event.target.value;
        const index: number = this.managements.findIndex(p => p.id == managementId);

        if (index != -1) {
            this.item.management.name = this.managements[index].name;
            this.item.management.showDetail = this.managements[index].showDetail;
        } else {
            this.item.management.id = -1;
            this.item.management.name = undefined;
            this.item.management.showDetail = false;
        }
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

    saveAttach(attachment: AttachmentUploadDto) {
        this.item.uploadFiles.push(attachment);
    }

    save(): void {

        if (this.item.management.id == -1) {
            this.message.error('Debe seleccionar el tipo de gestión antes de agregarlo a la lista', 'Aviso');
            return;
        }
        if (this.isNullEmptyOrWhiteSpace(this.item.description)) {
            this.message.error('Debe ingresar la descripción de la gestión antes de agregarlo a la lista', 'Aviso');
            return;
        }

        if (!this.managementTime || (<any>this.managementTime == 'Invalid Date')) {
            this.message.error('Debe seleccionar la fecha de la gestión antes de agregarlo a la lista', 'Aviso');
            return;
        }

        if (this.item.manager.id == -1) {
            this.message.error('Debe seleccionar al responsable de la gestión antes de agregarlo a la lista', 'Aviso');
            return;
        }

        if (!this.item.management.showDetail) {
            this.item.civilMen = undefined;
            this.item.civilWomen = undefined;
            this.item.companyMen = undefined;
            this.item.companyWomen = undefined;
            this.item.stateMen = undefined;
            this.item.stateWomen = undefined;
        }

        this.item.managementTime = moment(this.managementTime);

        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }

    removeResource(resource: SocialConflictSensibleResourceDto, index: number) {
        resource.remove = true;
    }

    restoreResource(resource: SocialConflictSensibleResourceDto) {
        resource.remove = false;
    }
}
