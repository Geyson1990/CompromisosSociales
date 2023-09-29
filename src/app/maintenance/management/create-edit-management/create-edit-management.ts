import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ManagementDto, ManagementServiceProxy } from '@shared/service-proxies/application/management-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-management',
    templateUrl: 'create-edit-management.html',
    styleUrls: [
        'create-edit-management.css'
    ]
})
export class CreateEditManagementComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    indexes: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    item: ManagementDto = new ManagementDto();
    state: string;
    detail: string;
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector, private _managementServiceProxy: ManagementServiceProxy) {
        super(_injector);
    }

    show(id?: number): void {

        this.saving = false;
        this.item = new ManagementDto();
        this.state = 'true';
        this.detail = 'false';

        if (id) {
            this._managementServiceProxy.get(id).subscribe(result => {
                this.item = result;
                this.state = result.enabled ? 'true' : 'false';
                this.detail = result.showDetail ? 'true' : 'false';
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
        this.item.showDetail = this.detail && this.detail == 'true';

        if (this.item.id) {
            this._managementServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        } else {
            this._managementServiceProxy
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
