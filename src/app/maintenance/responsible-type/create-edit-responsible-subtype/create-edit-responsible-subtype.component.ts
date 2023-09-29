import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ResponsibleSubTypeDto, ResponsibleSubTypeResponsibleTypeDto, ResponsibleSubTypeServiceProxy } from '@shared/service-proxies/application/responsible-sub-type-proxie';
import { ResponsibleTypeServiceProxy } from '@shared/service-proxies/application/responsible-type-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-responsible-subtype',
    templateUrl: 'create-edit-responsible-subtype.component.html',
    styleUrls: [
        'create-edit-responsible-subtype.component.css'
    ]
})
export class CreateEditResponsibleSubTypeComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    item: ResponsibleSubTypeDto = new ResponsibleSubTypeDto();
    state: string;
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector, private _responsibleTypeServiceProxy: ResponsibleTypeServiceProxy, private _responsibleSubTypeServiceProxy: ResponsibleSubTypeServiceProxy) {
        super(_injector);
    }

    show(subTypeId: number, id?: number): void {
        this.saving = false;
        this.item = new ResponsibleSubTypeDto();
        this.state = 'true';

        if (id) {
            this._responsibleSubTypeServiceProxy.get(id).subscribe(result => {
                this.item = result;
                this.state = result.enabled ? 'true' : 'false';
                this.active = true;
                this.modal.show();
            });
        } else {
            this._responsibleTypeServiceProxy.get(subTypeId).subscribe(response => {
                this.item.responsibleType = ResponsibleSubTypeResponsibleTypeDto.fromJS(response);
                this.active = true;
                this.modal.show();
            });
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
            this._responsibleSubTypeServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        } else {
            this._responsibleSubTypeServiceProxy
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
