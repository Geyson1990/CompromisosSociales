import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AlertResponsibleDto, AlertResponsibleServiceProxy } from '@shared/service-proxies/application/alert-responsible-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-alert-responsible',
    templateUrl: 'create-edit-alert-responsible.component.html',
    styleUrls: [
        'create-edit-alert-responsible.component.css'
    ]
})
export class CreateEditAlertResponsibleComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    item: AlertResponsibleDto = new AlertResponsibleDto();
    state: string;
    tracing: string;
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector, private _alertresponsibleServiceProxy: AlertResponsibleServiceProxy) {
        super(_injector);
    }

    show(id?: number): void {

        this.saving = false;
        this.item = new AlertResponsibleDto();
        this.state = 'true';
        this.tracing = 'false';

        if (id) {
            this._alertresponsibleServiceProxy.get(id).subscribe(result => {
                this.item = result;
                this.state = result.enabled ? 'true' : 'false';
                this.tracing = result.tracing ? 'true' : 'false';
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
        this.item.tracing = this.tracing && this.tracing == 'true';

        if (this.item.id) {
            this._alertresponsibleServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        } else {
            this._alertresponsibleServiceProxy
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
