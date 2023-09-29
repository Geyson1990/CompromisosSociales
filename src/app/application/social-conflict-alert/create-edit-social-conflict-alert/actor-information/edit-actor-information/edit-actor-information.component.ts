import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictAlertActorLocationDto, SocialConflictAlertActorMovementDto, SocialConflictAlertActorTypeDto } from '@shared/service-proxies/application/social-conflict-alert-proxie';

import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'edit-actor-information-social-conflict-alert',
    templateUrl: 'edit-actor-information.component.html',
    styleUrls: [
        'edit-actor-information.component.css'
    ]
})
export class CreateEditActorInformationSocialConflictAlertComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ index: number, value: SocialConflictAlertActorLocationDto }> = new EventEmitter<{ index: number, value: SocialConflictAlertActorLocationDto }>();

    rowIndex: number;
    item: SocialConflictAlertActorLocationDto = new SocialConflictAlertActorLocationDto();
    actorTypes: SocialConflictAlertActorTypeDto[];
    actorMovements: SocialConflictAlertActorMovementDto[];
    politic: string = 'false';
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: SocialConflictAlertActorLocationDto, actorTypes: SocialConflictAlertActorTypeDto[], actorMovements: SocialConflictAlertActorMovementDto[]): void {
        this.rowIndex = rowIndex;
        this.item = new SocialConflictAlertActorLocationDto(item);
        this.politic = item && item.isPoliticalAssociation ? 'true' : 'false';
        this.actorTypes = Object.assign([], actorTypes);
        this.actorMovements = Object.assign([], actorMovements);

        if (this.item?.actorType && this.item.actorType.id != -1) {
            const managementIndex: number = this.actorTypes.findIndex(p => p.id == this.item.actorType.id);

            if (managementIndex == -1) {
                this.actorTypes.push(SocialConflictAlertActorTypeDto.fromJS(this.item.actorType));
                this.actorTypes = this.actorTypes.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        if (this.item?.actorMovement && this.item.actorMovement.id != -1) {
            const managerIndex: number = this.actorMovements.findIndex(p => p.id == this.item.actorMovement.id);

            if (managerIndex == -1) {
                this.actorMovements.push(SocialConflictAlertActorMovementDto.fromJS(this.item.actorMovement));
                this.actorMovements = this.actorMovements.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        this.active = true;
        this.modal.show();
    }

    onActorTypeChange(event: any) {
        const actorTypeId: number = +event.target.value;
        const index: number = this.actorTypes.findIndex(p => p.id == actorTypeId);

        if (index != -1) {
            this.item.actorType.name = this.actorTypes[index].name;
            this.item.actorType.showDetail = this.actorTypes[index].showDetail;
            this.item.actorType.showMovement = this.actorTypes[index].showMovement;
        } else {
            this.item.actorType.id = -1;
            this.item.actorType.name = undefined;
            this.item.actorType.showDetail = false;
        }
    }

    onActorMovementChange(event: any) {
        const actorMovementId: number = +event.target.value;
        const index: number = this.actorMovements.findIndex(p => p.id == actorMovementId);

        if (index != -1) {
            this.item.actorMovement.name = this.actorMovements[index].name;
        } else {
            this.item.actorMovement.id = -1;
            this.item.actorMovement.name = undefined;
        }
    }

    onShown(): void {
        document.getElementById('ActorName').focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if (this.isNullEmptyOrWhiteSpace(this.item.name)) {
            this.message.info('Debe ingresar el nombre y apellido del actor antes de continuar');
            return;
        }
        if (this.item.actorType.id == -1) {
            this.message.info('Debe seleccionar el tipo de actor antes de continuar');
            return;
        }
        if (this.item.actorType.showMovement && this.item.actorMovement.id == -1) {
            this.message.info('Debe seleccionar la capacidad de movilización del actor antes de continuar');
            return;
        }
        if (this.isNullEmptyOrWhiteSpace(this.item.community)) {
            this.message.info('Debe ingresar la institución del actor antes de continuar');
            return;
        }

        this.item.name = this.item.name ? this.item.name.toUpperCase() : <any>undefined;
        this.item.isPoliticalAssociation = this.politic == 'true';
        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}
