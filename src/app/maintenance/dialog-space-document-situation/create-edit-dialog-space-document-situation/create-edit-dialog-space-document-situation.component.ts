import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DialogSpaceDocumentSituationDto, DialogSpaceDocumentSituationServiceProxy } from '@shared/service-proxies/application/dialog-space-document-situation-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-dialog-space-document-situation',
    templateUrl: 'create-edit-dialog-space-document-situation.component.html',
    styleUrls: [
        'create-edit-dialog-space-document-situation.component.css'
    ]
})
export class CreateEditDialogSpaceDocumentSituationComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    item: DialogSpaceDocumentSituationDto = new DialogSpaceDocumentSituationDto();
    state: string;
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector, private _dialogspacedocumentsituationServiceProxy: DialogSpaceDocumentSituationServiceProxy) {
        super(_injector);
    }

    show(id?: number): void {

        this.saving = false;
        this.item = new DialogSpaceDocumentSituationDto();
        this.state = 'true';

        if (id) {
            this._dialogspacedocumentsituationServiceProxy.get(id).subscribe(result => {
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
        document.getElementById('DialogSpaceDocumentSituationName').focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        this.saving = true;
        this.item.enabled = this.state && this.state == 'true';

        if (this.item.id) {
            this._dialogspacedocumentsituationServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        } else {
            this._dialogspacedocumentsituationServiceProxy
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
