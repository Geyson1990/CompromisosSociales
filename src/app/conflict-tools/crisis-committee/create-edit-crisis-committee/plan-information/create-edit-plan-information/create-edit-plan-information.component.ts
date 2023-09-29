import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CrisisCommitteeDto, CrisisCommitteePlanLocationDto } from '@shared/service-proxies/application/crisis-committee-proxie';

@Component({
    selector: 'create-edit-plan-information-crisis-committee',
    templateUrl: 'create-edit-plan-information.component.html',
    styleUrls: [
        'create-edit-plan-information.component.css'
    ]
})
export class CreateEditPlanInformationCrisisCommitteeComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: CrisisCommitteePlanLocationDto, index: number }> = new EventEmitter<{ value: CrisisCommitteePlanLocationDto, index: number }>();

    risks: CrisisCommitteeDto[];
    item: CrisisCommitteePlanLocationDto = new CrisisCommitteePlanLocationDto();
    riskTime: Date;
    rowIndex: number;

    active: boolean;
    saving: boolean;
    
    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: CrisisCommitteePlanLocationDto): void {
        this.rowIndex = rowIndex;
        this.saving = false;
        this.item = new CrisisCommitteePlanLocationDto(item);

        this.active = true;
        this.modal.show();
    }

    onShown(): void {
        document.getElementById('PlanDescription')?.focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if(this.isNullEmptyOrWhiteSpace(this.item.description)) {
            this.message.error('La descripción del plan es obligatorio', 'Aviso');
            return;
        }

        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}
