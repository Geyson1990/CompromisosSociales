import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { InterventionPlanDto, InterventionPlanSolutionLocationDto } from '@shared/service-proxies/application/intervention-plan-proxie';

@Component({
    selector: 'create-edit-solution-information-intervention-plan',
    templateUrl: 'create-edit-solution-information.component.html',
    styleUrls: [
        'create-edit-solution-information.component.css'
    ]
})
export class CreateEditSolutionInformationInterventionPlanComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: InterventionPlanSolutionLocationDto, index: number }> = new EventEmitter<{ value: InterventionPlanSolutionLocationDto, index: number }>();

    risks: InterventionPlanDto[];
    item: InterventionPlanSolutionLocationDto = new InterventionPlanSolutionLocationDto();
    riskTime: Date;
    rowIndex: number;

    active: boolean;
    saving: boolean;
    
    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: InterventionPlanSolutionLocationDto): void {
        this.rowIndex = rowIndex;
        this.saving = false;
        this.item = new InterventionPlanSolutionLocationDto(item);

        this.active = true;
        this.modal.show();
    }

    onShown(): void {
        document.getElementById('SolutionDescription')?.focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if(this.isNullEmptyOrWhiteSpace(this.item.description)) {
            this.message.error('La descripción de la evaluación de resultados es obligatorio', 'Aviso');
            return;
        }

        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}
