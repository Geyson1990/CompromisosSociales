import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SocialConflictAlertStateLocationDto as SocialConflictAlertStateLocationDto } from '@shared/service-proxies/application/social-conflict-alert-proxie';
import * as moment from 'moment';

@Component({
    selector: 'create-edit-state-information-social-conflict-alert',
    templateUrl: 'create-edit-state-information.component.html',
    styleUrls: [
        'create-edit-state-information.component.css'
    ]
})
export class CreateEditStateInformationSocialConflictAlertComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: SocialConflictAlertStateLocationDto, index: number }> = new EventEmitter<{ value: SocialConflictAlertStateLocationDto, index: number }>();

    stateTime: Date;
    item: SocialConflictAlertStateLocationDto = new SocialConflictAlertStateLocationDto();
    rowIndex: number;

    active: boolean;
    saving: boolean;

    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: SocialConflictAlertStateLocationDto): void {
        this.rowIndex = rowIndex;
        this.saving = false;
        this.item = new SocialConflictAlertStateLocationDto(item);
        this.stateTime = item && item.stateTime ? item.stateTime.toDate() : <any>undefined;
        this.active = true;
        this.modal.show();
    }

    onShown(): void {
        document.getElementById('StateDescription').focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if (this.isNullEmptyOrWhiteSpace(this.item.description)) {
            this.message.error('Debe ingresar la descripción antes de guardar los cambios', 'Aviso');
            return;
        }
        if (!this.stateTime || (this.stateTime && (<any>this.stateTime == 'Invalid Date'))) {
            this.message.info('Debe ingresar una fecha válida antes de continuar', 'Aviso');
            return;
        }
        this.item.stateTime = this.stateTime ? moment(this.stateTime) : <any>undefined;
        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}
