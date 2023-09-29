import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CrisisCommitteeDto, CrisisCommitteeMessageLocationDto } from '@shared/service-proxies/application/crisis-committee-proxie';

@Component({
    selector: 'create-edit-message-information-crisis-committee',
    templateUrl: 'create-edit-message-information.component.html',
    styleUrls: [
        'create-edit-message-information.component.css'
    ]
})
export class CreateEditMessageInformationCrisisCommitteeComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: CrisisCommitteeMessageLocationDto, index: number }> = new EventEmitter<{ value: CrisisCommitteeMessageLocationDto, index: number }>();

    risks: CrisisCommitteeDto[];
    item: CrisisCommitteeMessageLocationDto = new CrisisCommitteeMessageLocationDto();
    riskTime: Date;
    rowIndex: number;

    active: boolean;
    saving: boolean;
    
    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: CrisisCommitteeMessageLocationDto): void {
        this.rowIndex = rowIndex;
        this.saving = false;
        this.item = new CrisisCommitteeMessageLocationDto(item);

        this.active = true;
        this.modal.show();
    }

    onShown(): void {
        document.getElementById('MessageDescription')?.focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if(this.isNullEmptyOrWhiteSpace(this.item.description)) {
            this.message.error('La descripción del mensaje es obligatorio', 'Aviso');
            return;
        }

        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}
