import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CrisisCommitteeDto, CrisisCommitteeActionLocationDto } from '@shared/service-proxies/application/crisis-committee-proxie';

@Component({
    selector: 'create-edit-action-information-crisis-committee',
    templateUrl: 'create-edit-action-information.component.html',
    styleUrls: [
        'create-edit-action-information.component.css'
    ]
})
export class CreateEditActionInformationCrisisCommitteeComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: CrisisCommitteeActionLocationDto, index: number }> = new EventEmitter<{ value: CrisisCommitteeActionLocationDto, index: number }>();

    risks: CrisisCommitteeDto[];
    item: CrisisCommitteeActionLocationDto = new CrisisCommitteeActionLocationDto();
    riskTime: Date;
    rowIndex: number;

    active: boolean;
    saving: boolean;
    
    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: CrisisCommitteeActionLocationDto): void {
        this.rowIndex = rowIndex;
        this.saving = false;
        this.item = new CrisisCommitteeActionLocationDto(item);

        this.active = true;
        this.modal.show();
    }

    onShown(): void {
        document.getElementById('ActionDescription')?.focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if(this.isNullEmptyOrWhiteSpace(this.item.description)) {
            this.message.error('La descripción de la acción es obligatoria', 'Aviso');
            return;
        }

        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}
