import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SocialConflictAlertSectorLocationDto as SocialConflictAlertSectorLocationDto, SocialConflictAlertSectorDto } from '@shared/service-proxies/application/social-conflict-alert-proxie';
import * as moment from 'moment';

@Component({
    selector: 'create-edit-sector-information-social-conflict-alert',
    templateUrl: 'create-edit-sector-information.component.html',
    styleUrls: [
        'create-edit-sector-information.component.css'
    ]
})
export class CreateEditSectorInformationSocialConflictAlertComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: SocialConflictAlertSectorLocationDto, index: number }> = new EventEmitter<{ value: SocialConflictAlertSectorLocationDto, index: number }>();

    sectorTime: Date;
    item: SocialConflictAlertSectorLocationDto = new SocialConflictAlertSectorLocationDto();
    rowIndex: number;
    sectors: SocialConflictAlertSectorDto[];

    active: boolean;
    saving: boolean;

    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: SocialConflictAlertSectorLocationDto, sectors: SocialConflictAlertSectorDto[]): void {
        this.rowIndex = rowIndex;
        this.saving = false;
        this.item = new SocialConflictAlertSectorLocationDto(item);
        this.sectorTime = item && item.sectorTime ? item.sectorTime.toDate() : <any>undefined;
        this.sectors = Object.assign([], sectors);

        if (this.item?.alertSector && this.item.alertSector.id != -1) {
            const alertSectorIndex: number = this.sectors.findIndex(p => p.id == this.item.alertSector.id);

            if (alertSectorIndex == -1) {
                this.sectors.push(SocialConflictAlertSectorDto.fromJS(this.item.alertSector));
                this.sectors = this.sectors.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        this.active = true;
        this.modal.show();
    }

    onShown(): void {
        document.getElementById('SectorDescription').focus();
    }

    onSectorChange(event: any) {
        const sectorId: number = +event.target.value;
        const index: number = this.sectors.findIndex(p => p.id == sectorId);

        if (index != -1) {
            this.item.alertSector.name = this.sectors[index].name;
        } else {
            this.item.alertSector.id = -1;
            this.item.alertSector.name = undefined;
        }
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if (this.item.alertSector.id == -1) {
            this.message.error('Debe seleccionar el nivel de riesgo antes de guardar los cambios', 'Aviso');
            return;
        }
        if (this.isNullEmptyOrWhiteSpace(this.item.description)) {
            this.message.error('Debe ingresar la descripción del nivel de riesgo antes de guardar los cambios', 'Aviso');
            return;
        }
        if (!this.sectorTime || (this.sectorTime && (<any>this.sectorTime == 'Invalid Date'))) {
            this.message.info('Debe ingresar una fecha válida antes de continuar', 'Aviso');
            return;
        }
        this.item.sectorTime = this.sectorTime ? moment(this.sectorTime) : <any>undefined;
        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}
