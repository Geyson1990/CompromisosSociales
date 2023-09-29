import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AlertSectorDto, AlertSectorServiceProxy } from '@shared/service-proxies/application/alert-sector-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-alertsector',
    templateUrl: 'create-edit-alert-sector.component.html',
    styleUrls: [
        'create-edit-alert-sector.component.css'
    ]
})
export class CreateEditAlertSectorComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    indexes: number[] = [];
    item: AlertSectorDto = new AlertSectorDto();
    state: string;
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector, private _alertsectorServiceProxy: AlertSectorServiceProxy) {
        super(_injector);
        for (let i = 0; i <= 30; i++)
            this.indexes.push(i);
    }

    show(id?: number): void {

        this.saving = false;
        this.item = new AlertSectorDto();
        this.item.index = 1;
        this.state = 'true';

        if (id) {
            this._alertsectorServiceProxy.get(id).subscribe(result => {
                this.item = result;
                this.state = result.enabled ? 'true' : 'false';
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
        this.saving = true;
        this.item.enabled = this.state && this.state == 'true';

        if (this.item.id) {
            this._alertsectorServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        } else {
            this._alertsectorServiceProxy
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
