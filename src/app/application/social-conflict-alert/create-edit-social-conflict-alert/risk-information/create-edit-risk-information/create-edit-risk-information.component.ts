import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SocialConflictAlertRiskLocationDto as SocialConflictAlertRiskLocationDto, SocialConflictAlertRiskDto } from '@shared/service-proxies/application/social-conflict-alert-proxie';
import * as moment from 'moment';

@Component({
    selector: 'create-edit-risk-information-social-conflict-alert',
    templateUrl: 'create-edit-risk-information.component.html',
    styleUrls: [
        'create-edit-risk-information.component.css'
    ]
})
export class CreateEditRiskInformationSocialConflictAlertComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: SocialConflictAlertRiskLocationDto, index: number }> = new EventEmitter<{ value: SocialConflictAlertRiskLocationDto, index: number }>();

    riskTime: Date;
    item: SocialConflictAlertRiskLocationDto = new SocialConflictAlertRiskLocationDto();
    rowIndex: number;
    risks: SocialConflictAlertRiskDto[];

    active: boolean;
    saving: boolean;

    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: SocialConflictAlertRiskLocationDto, risks: SocialConflictAlertRiskDto[]): void {
        this.rowIndex = rowIndex;
        this.saving = false;
        this.item = new SocialConflictAlertRiskLocationDto(item);
        this.riskTime = item && item.riskTime ? item.riskTime.toDate() : <any>undefined;
        this.risks = Object.assign([], risks);

        if (this.item?.alertRisk && this.item.alertRisk.id != -1) {
            const alertRiskIndex: number = this.risks.findIndex(p => p.id == this.item.alertRisk.id);

            if (alertRiskIndex == -1) {
                this.risks.push(SocialConflictAlertRiskDto.fromJS(this.item.alertRisk));
                this.risks = this.risks.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        this.active = true;
        this.modal.show();
    }

    onShown(): void {
        document.getElementById('RiskDescription').focus();
    }

    onRiskChange(event: any) {
        const riskId: number = +event.target.value;
        const index: number = this.risks.findIndex(p => p.id == riskId);

        if (index != -1) {
            this.item.alertRisk.name = this.risks[index].name;
        } else {
            this.item.alertRisk.id = -1;
            this.item.alertRisk.name = undefined;
        }
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if (this.item.alertRisk.id == -1) {
            this.message.error('Debe seleccionar el nivel de riesgo antes de guardar los cambios', 'Aviso');
            return;
        }
        if (this.isNullEmptyOrWhiteSpace(this.item.description)) {
            this.message.error('Debe ingresar la descripción del nivel de riesgo antes de guardar los cambios', 'Aviso');
            return;
        }
        if (!this.riskTime || (this.riskTime && (<any>this.riskTime == 'Invalid Date'))) {
            this.message.info('Debe ingresar una fecha válida antes de continuar', 'Aviso');
            return;
        }
        this.item.riskTime = this.riskTime ? moment(this.riskTime) : <any>undefined;
        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}
