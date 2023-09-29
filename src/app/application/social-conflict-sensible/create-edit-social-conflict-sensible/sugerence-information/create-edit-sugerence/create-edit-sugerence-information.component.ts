import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictSensibleSugerenceDto, SugerenceType } from '@shared/service-proxies/application/social-conflict-sensible-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as moment from 'moment';

@Component({
    selector: 'create-edit-sugerence-information-sensible',
    templateUrl: 'create-edit-sugerence-information.component.html',
    styleUrls: [
        'create-edit-sugerence-information.component.css'
    ]
})
export class CreateEditSugerenceInformationSocialConflictSensibleComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ index: number, type: SugerenceType, value: SocialConflictSensibleSugerenceDto }> = new EventEmitter<{ index: number, type: SugerenceType, value: SocialConflictSensibleSugerenceDto }>();

    rowIndex: number;
    item: SocialConflictSensibleSugerenceDto = new SocialConflictSensibleSugerenceDto();
    active: boolean;
    saving: boolean;

    private type: SugerenceType;

    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: SocialConflictSensibleSugerenceDto, type: SugerenceType): void {
        this.rowIndex = rowIndex;
        this.type = type;
        this.saving = false;
        this.item = new SocialConflictSensibleSugerenceDto(item);
        this.active = true;
        this.modal.show();
    }

    onShown(): void {
        document.getElementById('FactDescription').focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if (this.isNullEmptyOrWhiteSpace(this.item.description)) {
            this.message.error('Debe ingresar la descripción del hecho antes de agregarlo a la lista', 'Aviso');
            return;
        }
        this.modalSave.emit({ index: this.rowIndex, value: this.item, type: this.type });
        this.close();
    }
}
