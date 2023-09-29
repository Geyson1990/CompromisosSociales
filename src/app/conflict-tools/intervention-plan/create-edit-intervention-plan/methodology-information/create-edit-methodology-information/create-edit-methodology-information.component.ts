import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { InterventionPlanOptionLocationDto, InterventionPlanMethodologyLocationDto } from '@shared/service-proxies/application/intervention-plan-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'create-edit-methodology-information-intervention-plan',
    templateUrl: 'create-edit-methodology-information.component.html',
    styleUrls: [
        'create-edit-methodology-information.component.css'
    ]
})
export class CreateEditMethodologyInformationInterventionPlanComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: InterventionPlanMethodologyLocationDto, index: number }> = new EventEmitter<{ value: InterventionPlanMethodologyLocationDto, index: number }>();

    options: InterventionPlanOptionLocationDto[];
    item: InterventionPlanMethodologyLocationDto = new InterventionPlanMethodologyLocationDto();
    rowIndex: number;

    active: boolean;
    saving: boolean;
    
    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: InterventionPlanMethodologyLocationDto, options: InterventionPlanOptionLocationDto[]): void {
        this.rowIndex = rowIndex;
        this.saving = false;
        this.item = InterventionPlanMethodologyLocationDto.fromJS(item);
        this.options = options;

        if (this.item?.interventionPlanOption && this.item.interventionPlanOption.id != -1 && this.item.interventionPlanOption.id != 0) {
            const interventionPlanOptionIndex: number = this.options.findIndex(p => p.id == this.item.interventionPlanOption.id);

            if (interventionPlanOptionIndex == -1) {
                this.options.push(InterventionPlanOptionLocationDto.fromJS(this.item.methodology));
                this.options = this.options.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        this.active = true;
        this.modal.show();
    }

    onOptionChange(event: any) {
        const optionId: number = +event.target.value;
        const index: number = this.options.findIndex(p => p.id == optionId);

        if (index != -1) {
            this.item.interventionPlanOption.name = this.options[index].name;
        } else {
            this.item.interventionPlanOption.name = undefined;
        }
    }

    onShown(): void {
        document.getElementById('MethodologyInterventionPlan')?.focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if(this.isNullEmptyOrWhiteSpace(this.item.methodology)) {
            this.message.error('La metodología de intervención es obligatoria', 'Aviso');
            return;
        }
        if(this.item.interventionPlanOption.id == -1) {
            this.message.error('Debe seleccionar la opción de intervención', 'Aviso');
            return;
        }
        if(this.isNullEmptyOrWhiteSpace(this.item.description)) {
            this.message.error('El detalle de la opción de intervención es obligatoria', 'Aviso');
            return;
        }

        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}
