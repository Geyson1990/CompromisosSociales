import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DirectoryGovernmentSectorDto, DirectoryGovernmentSectorServiceProxy } from '@shared/service-proxies/application/directory-government-sector';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-government-sector',
    templateUrl: 'create-edit-government-sector.component.html',
    styleUrls: [
        'create-edit-government-sector.component.css'
    ]
})
export class CreateEditDirectoryGovernmentSectorComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    
    item: DirectoryGovernmentSectorDto = new DirectoryGovernmentSectorDto();
    state: string;
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector, private _directorygovernmentsectorServiceProxy: DirectoryGovernmentSectorServiceProxy) {
        super(_injector);
    }

    show(id?: number): void {

        this.saving = false;
        this.item = new DirectoryGovernmentSectorDto();
        this.state = 'true';

        if (id) {
            this._directorygovernmentsectorServiceProxy.get(id).subscribe(result => {
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
            this._directorygovernmentsectorServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        } else {
            this._directorygovernmentsectorServiceProxy
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
