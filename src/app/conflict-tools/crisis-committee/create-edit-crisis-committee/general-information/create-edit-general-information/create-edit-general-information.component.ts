import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CrisisCommitteeAlertResponsibleLocationDto, CrisisCommitteeJobLocationDto, CrisisCommitteeTeamLocationDto } from '@shared/service-proxies/application/crisis-committee-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'create-edit-general-information-crisis-committee',
    templateUrl: 'create-edit-general-information.component.html',
    styleUrls: [
        'create-edit-general-information.component.css'
    ]
})
export class CreateEditGeneralInformationCrisisCommitteeComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ index: number, value: CrisisCommitteeTeamLocationDto }> = new EventEmitter<{ index: number, value: CrisisCommitteeTeamLocationDto }>();

    rowIndex: number;
    item: CrisisCommitteeTeamLocationDto = new CrisisCommitteeTeamLocationDto();
    alertResponsibles: CrisisCommitteeAlertResponsibleLocationDto[];
    jobs: CrisisCommitteeJobLocationDto[];
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: CrisisCommitteeTeamLocationDto, alertResponsibles: CrisisCommitteeAlertResponsibleLocationDto[], jobs: CrisisCommitteeJobLocationDto[]): void {

        this.alertResponsibles = alertResponsibles.map(p => CrisisCommitteeAlertResponsibleLocationDto.fromJS(p));
        this.jobs = jobs.map(p => CrisisCommitteeJobLocationDto.fromJS(p));

        if (item) {
            this.rowIndex = rowIndex;
            this.item = CrisisCommitteeTeamLocationDto.fromJS(item);
        } else {
            this.rowIndex = undefined;
            this.item = new CrisisCommitteeTeamLocationDto();
        }

        if (this.item?.alertResponsible && this.item.alertResponsible.id > 0) {
            const alertResponsibleIndex: number = this.alertResponsibles.findIndex(p => p.id == this.item.alertResponsible.id);

            if (alertResponsibleIndex == -1) {
                this.alertResponsibles.push(CrisisCommitteeAlertResponsibleLocationDto.fromJS(this.item.alertResponsible));
                this.alertResponsibles = this.alertResponsibles.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        if (this.item?.crisisCommitteeJob && this.item.crisisCommitteeJob.id > 0) {
            const crisisCommitteeJobIndex: number = this.jobs.findIndex(p => p.id == this.item.crisisCommitteeJob.id);

            if (crisisCommitteeJobIndex == -1) {
                this.jobs.push(CrisisCommitteeJobLocationDto.fromJS(this.item.crisisCommitteeJob));
                this.jobs = this.jobs.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        this.active = true;
        this.modal.show();
    }

    onResponsibleChange(event: any) {
        const responsibleId: number = +event.target.value;
        const index: number = this.alertResponsibles.findIndex(p => p.id == responsibleId);

        if (index != -1) {
            this.item.alertResponsible.name = this.alertResponsibles[index].name;
        } else {
            this.item.alertResponsible.id = -1;
            this.item.alertResponsible.name = undefined;
        }
    }

    onJobChange(event: any) {
        const jobId: number = +event.target.value;
        const index: number = this.jobs.findIndex(p => p.id == jobId);

        if (index != -1) {
            this.item.crisisCommitteeJob.name = this.jobs[index].name;
            this.item.crisisCommitteeJob.showDescription = this.jobs[index].showDescription;
        } else {
            this.item.crisisCommitteeJob.id = -1;
            this.item.crisisCommitteeJob.name = undefined;
        }
    }

    onShown(): void {
        document.getElementById('CrisisCommitteeTeamName')?.focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save() {
        if (this.item.alertResponsible.id == -1) {
            this.message.info('Debe seleccionar la secretaría/subsecretaría antes de guardar los cambios', 'Aviso');
            return;
        }
        if (this.item.crisisCommitteeJob.id == -1) {
            this.message.info('Debe seleccionar el cargo antes de guardar los cambios', 'Aviso');
            return;
        }
        if(this.item.crisisCommitteeJob.showDescription && this.isNullEmptyOrWhiteSpace(this.item.job)) {
            this.message.info('Debe ingresar el cargo antes de guardar los cambios', 'Aviso');
            return;  
        }
        if(this.isNullEmptyOrWhiteSpace(this.item.name)) {
            this.message.info('Debe ingresar el nombre antes de guardar los cambios', 'Aviso');
            return;  
        }
        if(this.isNullEmptyOrWhiteSpace(this.item.surname)) {
            this.message.info('Debe ingresar el apellido antes de guardar los cambios', 'Aviso');
            return;  
        }

        this.item.name = (this.item.name ? this.item.name : '').trim().toUpperCase();
        this.item.surname = (this.item.surname ? this.item.surname : '').trim().toUpperCase();
        this.item.secondSurname = (this.item.secondSurname ? this.item.secondSurname : '').trim().toUpperCase();

        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}