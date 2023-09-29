import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { InterventionPlanDto, InterventionPlanStateLocationDto } from '@shared/service-proxies/application/intervention-plan-proxie';

@Component({
    selector: 'create-edit-state-information-intervention-plan',
    templateUrl: 'create-edit-state-information.component.html',
    styleUrls: [
        'create-edit-state-information.component.css'
    ]
})
export class CreateEditStateInformationInterventionPlanComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: InterventionPlanStateLocationDto, index: number }> = new EventEmitter<{ value: InterventionPlanStateLocationDto, index: number }>();

    risks: InterventionPlanDto[];
    item: InterventionPlanStateLocationDto = new InterventionPlanStateLocationDto();
    riskTime: Date;
    rowIndex: number;

    active: boolean;
    saving: boolean;
    
    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: InterventionPlanStateLocationDto): void {
        this.rowIndex = rowIndex;
        this.saving = false;
        this.item = new InterventionPlanStateLocationDto(item);

        this.active = true;
        this.modal.show();
    }

    onShown(): void {
        document.getElementById('StateDescription')?.focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if(this.isNullEmptyOrWhiteSpace(this.item.description)) {
            this.message.error('La descripción del objetivo es obligatorio', 'Aviso');
            return;
        }

        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}
