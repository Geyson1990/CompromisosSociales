import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { RecordResourceTypeDto, RecordResourceTypeServiceProxy } from '@shared/service-proxies/application/record-resource-type-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-record-resource-type',
    templateUrl: 'create-edit-record-resource-type.component.html',
    styleUrls: [
        'create-edit-record-resource-type.component.css'
    ]
})
export class CreateEditRecordResourceTypeComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    item: RecordResourceTypeDto = new RecordResourceTypeDto();
    state: string;
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector, private _recordResourceTypeServiceProxy: RecordResourceTypeServiceProxy) {
        super(_injector);
    }

    show(id?: number): void {

        this.saving = false;
        this.item = new RecordResourceTypeDto();
        this.state = 'true';

        if (id) {
            this._recordResourceTypeServiceProxy.get(id).subscribe(result => {
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
        document.getElementById('RecordResourceTypeName').focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        this.saving = true;
        this.item.enabled = this.state && this.state == 'true';

        if (this.item.id) {
            this._recordResourceTypeServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        } else {
            this._recordResourceTypeServiceProxy
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
