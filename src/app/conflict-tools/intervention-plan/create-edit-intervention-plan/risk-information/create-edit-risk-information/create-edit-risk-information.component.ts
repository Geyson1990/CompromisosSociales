import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { InterventionPlanRiskLevelLocationDto, InterventionPlanRiskLocationDto } from '@shared/service-proxies/application/intervention-plan-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as moment from 'moment';

@Component({
    selector: 'create-edit-risk-information-intervention-plan',
    templateUrl: 'create-edit-risk-information.component.html',
    styleUrls: [
        'create-edit-risk-information.component.css'
    ]
})
export class CreateEditRiskInformationInterventionPlanComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: InterventionPlanRiskLocationDto, index: number }> = new EventEmitter<{ value: InterventionPlanRiskLocationDto, index: number }>();

    risks: InterventionPlanRiskLevelLocationDto[];
    item: InterventionPlanRiskLocationDto = new InterventionPlanRiskLocationDto();
    rowIndex: number;

    active: boolean;
    saving: boolean;
    
    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: InterventionPlanRiskLocationDto, risks: InterventionPlanRiskLevelLocationDto[]): void {
        this.rowIndex = rowIndex;
        this.saving = false;
        this.item = InterventionPlanRiskLocationDto.fromJS(item);
        this.risks = Object.assign([], risks);

        if (this.item?.risk && this.item.risk.id != -1 && this.item.risk.id != 0) {
            const riskIndex: number = this.risks.findIndex(p => p.id == this.item.risk.id);

            if (riskIndex == -1) {
                this.risks.push(InterventionPlanRiskLevelLocationDto.fromJS(this.item.risk));
                this.risks = this.risks.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        this.active = true;
        this.modal.show();
    }

    onRiskChange(event: any) {
        const riskId: number = +event.target.value;
        const index: number = this.risks.findIndex(p => p.id == riskId);

        if (index != -1) {
            this.item.risk.name = this.risks[index].name;
            this.item.risk.color = this.risks[index].color;
        } else {
            this.item.risk.id = -1;
            this.item.risk.name = undefined;
            this.item.risk.color = undefined;
        }
    }

    onShown(): void {
        document.getElementById('FactDescription').focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if(this.item.risk.id == -1) {
            this.message.error('Debe seleccionar el nivel de riesgo antes de agregarlo a la lista', 'Aviso');
            return;
        }

        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}
