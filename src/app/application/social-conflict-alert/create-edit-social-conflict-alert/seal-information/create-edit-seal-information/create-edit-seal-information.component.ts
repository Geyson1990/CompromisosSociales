import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SocialConflictAlertSealLocationDto as SocialConflictAlertSealLocationDto, SocialConflictAlertSealDto } from '@shared/service-proxies/application/social-conflict-alert-proxie';
import * as moment from 'moment';

@Component({
    selector: 'create-edit-seal-information-social-conflict-alert',
    templateUrl: 'create-edit-seal-information.component.html',
    styleUrls: [
        'create-edit-seal-information.component.css'
    ]
})
export class CreateEditSealInformationSocialConflictAlertComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: SocialConflictAlertSealLocationDto, index: number }> = new EventEmitter<{ value: SocialConflictAlertSealLocationDto, index: number }>();

    sealTime: Date;
    item: SocialConflictAlertSealLocationDto = new SocialConflictAlertSealLocationDto();
    rowIndex: number;
    seals: SocialConflictAlertSealDto[];

    active: boolean;
    saving: boolean;

    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: SocialConflictAlertSealLocationDto, seals: SocialConflictAlertSealDto[]): void {
        this.rowIndex = rowIndex;
        this.saving = false;
        this.item = new SocialConflictAlertSealLocationDto(item);
        this.sealTime = item && item.sealTime ? item.sealTime.toDate() : <any>undefined;
        this.seals = Object.assign([], seals);

        if (this.item?.alertSeal && this.item.alertSeal.id != -1) {
            const alertSealIndex: number = this.seals.findIndex(p => p.id == this.item.alertSeal.id);

            if (alertSealIndex == -1) {
                this.seals.push(SocialConflictAlertSealDto.fromJS(this.item.alertSeal));
                this.seals = this.seals.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        this.active = true;
        this.modal.show();
    }

    onShown(): void {
        document.getElementById('SealDescription').focus();
    }

    onSealChange(event: any) {
        const sealId: number = +event.target.value;
        const index: number = this.seals.findIndex(p => p.id == sealId);

        if (index != -1) {
            this.item.alertSeal.name = this.seals[index].name;
        } else {
            this.item.alertSeal.id = -1;
            this.item.alertSeal.name = undefined;
        }
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if (this.item.alertSeal.id == -1) {
            this.message.error('Debe seleccionar el tipo de cierre antes de guardar los cambios', 'Aviso');
            return;
        }
        if (!this.sealTime || (this.sealTime && (<any>this.sealTime == 'Invalid Date'))) {
            this.message.info('Debe ingresar una fecha válida antes de continuar', 'Aviso');
            return;
        }
        this.item.sealTime = this.sealTime ? moment(this.sealTime) : <any>undefined;
        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}
