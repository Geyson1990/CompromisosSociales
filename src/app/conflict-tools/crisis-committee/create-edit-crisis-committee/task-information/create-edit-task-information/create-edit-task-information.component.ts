import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CrisisCommitteeDto, CrisisCommitteeTaskLocationDto } from '@shared/service-proxies/application/crisis-committee-proxie';

@Component({
    selector: 'create-edit-task-information-crisis-committee',
    templateUrl: 'create-edit-task-information.component.html',
    styleUrls: [
        'create-edit-task-information.component.css'
    ]
})
export class CreateEditTaskInformationCrisisCommitteeComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: CrisisCommitteeTaskLocationDto, index: number }> = new EventEmitter<{ value: CrisisCommitteeTaskLocationDto, index: number }>();

    risks: CrisisCommitteeDto[];
    item: CrisisCommitteeTaskLocationDto = new CrisisCommitteeTaskLocationDto();
    riskTime: Date;
    rowIndex: number;

    active: boolean;
    saving: boolean;
    
    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: CrisisCommitteeTaskLocationDto): void {
        this.rowIndex = rowIndex;
        this.saving = false;
        this.item = new CrisisCommitteeTaskLocationDto(item);

        this.active = true;
        this.modal.show();
    }

    onShown(): void {
        document.getElementById('TaskDescription')?.focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if(this.isNullEmptyOrWhiteSpace(this.item.description)) {
            this.message.error('La descripción de la tarea es obligatoria', 'Aviso');
            return;
        }

        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}
