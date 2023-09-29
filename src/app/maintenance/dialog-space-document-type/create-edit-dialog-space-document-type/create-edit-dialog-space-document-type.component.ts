import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DialogSpaceDocumentTypeDto, DialogSpaceDocumentTypeServiceProxy } from '@shared/service-proxies/application/dialog-space-document-type-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-dialog-space-document-type',
    templateUrl: 'create-edit-dialog-space-document-type.component.html',
    styleUrls: [
        'create-edit-dialog-space-document-type.component.css'
    ]
})
export class CreateEditDialogSpaceDocumentTypeComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    indexes: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    item: DialogSpaceDocumentTypeDto = new DialogSpaceDocumentTypeDto();
    state: string;
    showDetail: string;
    showMovement: string;
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector, private _dialogSpaceDocumentTypeServiceProxy: DialogSpaceDocumentTypeServiceProxy) {
        super(_injector);
    }

    show(id?: number): void {

        this.saving = false;
        this.item = new DialogSpaceDocumentTypeDto();
        this.state = 'true';
        this.showDetail = 'false';
        this.showMovement = 'false';

        if (id) {
            this._dialogSpaceDocumentTypeServiceProxy.get(id).subscribe(result => {
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
            this._dialogSpaceDocumentTypeServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        } else {
            this._dialogSpaceDocumentTypeServiceProxy
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
