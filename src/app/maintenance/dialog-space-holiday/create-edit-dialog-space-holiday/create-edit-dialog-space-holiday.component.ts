import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DialogSpaceHolidayDto, DialogSpaceHolidayServiceProxy, HolidayType } from '@shared/service-proxies/application/dialog-space-holiday-proxie';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-dialog-space-holiday',
    templateUrl: 'create-edit-dialog-space-holiday.component.html',
    styleUrls: [
        'create-edit-dialog-space-holiday.component.css'
    ]
})
export class CreateEditDialogSpaceHolidayComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    item: DialogSpaceHolidayDto = new DialogSpaceHolidayDto();
    holidayTime: Date;
    active: boolean;
    saving: boolean;

    holidayTypes = {
        none: HolidayType.NONE,
        static: HolidayType.STATIC,
        dinamic: HolidayType.DINAMIC
    }

    constructor(_injector: Injector, private _dialogSpaceHolidayServiceProxy: DialogSpaceHolidayServiceProxy) {
        super(_injector);
    }

    show(id?: number): void {

        this.saving = false;
        this.item = new DialogSpaceHolidayDto();

        if (id) {
            this._dialogSpaceHolidayServiceProxy.get(id).subscribe(result => {
                this.item = result;
                this.holidayTime = result.holiday.toDate();
                this.active = true;
                this.modal.show();
            });
        } else {
            this.active = true;
            this.modal.show();
        }

    }
    onShown(): void {
        document.getElementById('Name').focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        this.item.holiday = moment(this.holidayTime);

        if (this.isNullEmptyOrWhiteSpace(this.item.name)) {
            this.message.info('El nombre del día feriado es obligatorio. Verifique la información antes de continuar', 'Aviso');
            return;
        }
        if (!this.item.holiday.isValid()) {
            this.message.info('La fecha del día feriado es inválida. Verifique la información antes de continuar', 'Aviso');
            return;
        }
        if(this.item.type == HolidayType.NONE) {
            this.message.info('Debe seleccionar el tipo de fecha. Verifique la información antes de continuar', 'Aviso');
            return;
        }

        this.saving = true;

        if (this.item.id) {
            this._dialogSpaceHolidayServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        } else {
            this._dialogSpaceHolidayServiceProxy
                .create(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Creado satisfactoriamente');
                    this.close();
                });
        }

    }
}
