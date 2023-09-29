import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictConditionDto } from '@shared/service-proxies/application/social-conflict-proxie';
import { ConditionType } from '@shared/service-proxies/application/utility-proxie';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'create-edit-condition-information-social-conflict',
    templateUrl: 'create-edit-condition-information.component.html',
    styleUrls: [
        'create-edit-condition-information.component.css'
    ]
})
export class CreateEditConditionInformationSocialConflictComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: SocialConflictConditionDto, index: number }> = new EventEmitter<{ value: SocialConflictConditionDto, index: number }>();

    item: SocialConflictConditionDto = new SocialConflictConditionDto();
    conditionTime: Date;
    rowIndex: number;

    active: boolean;
    saving: boolean;
    
    types = {
        none: ConditionType.None,
        open: ConditionType.Open,
        closed: ConditionType.Closed
    };
    
    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex?: number, item?: SocialConflictConditionDto): void {

        if (item) {
            this.rowIndex = rowIndex;
            this.item = SocialConflictConditionDto.fromJS(item);
            this.conditionTime = this.item.conditionTime?.toDate();
        } else {
            this.rowIndex = undefined;
            this.conditionTime = undefined;
            this.item = new SocialConflictConditionDto();
        }

        this.saving = false;
        this.active = true;
        this.modal.show();
    }

    onShown(): void {
        document.getElementById('ConditionDescription').focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if(this.item.type == this.types.none) {
            this.message.error('Debe ingresar el estado del caso antes de agregarlo a la lista', 'Aviso');
            return;
        }
        if (!this.conditionTime || (<any>this.conditionTime == 'Invalid Date')) {
            this.message.error('Debe seleccionar la fecha de estado antes de agregarlo a la lista', 'Aviso');
            return;
        }
        this.item.conditionTime = moment(this.conditionTime);
        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}
