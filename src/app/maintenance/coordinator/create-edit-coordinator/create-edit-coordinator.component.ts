import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CoordinatorDto, CoordinatorServiceProxy } from '@shared/service-proxies/application/coordinator-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-coordinator',
    templateUrl: 'create-edit-coordinator.component.html',
    styleUrls: [
        'create-edit-coordinator.component.css'
    ]
})
export class CreateEditCoordinatorComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    item: CoordinatorDto = new CoordinatorDto();
    state: string = 'true';
    active: boolean = false;
    saving: boolean = false;

    constructor(_injector: Injector, private _coordinatorServiceProxy: CoordinatorServiceProxy) {
        super(_injector);
    }

    show(id?: number): void {

        this.saving = false;
        this.item = new CoordinatorDto();
        this.state = 'true';

        if (id) {
            this._coordinatorServiceProxy.get(id).subscribe(result => {
                this.item = result;
                this.state = this.item.enabled ? 'true' : 'false';
                this.active = true;
                this.modal.show();
            });
        } else {
            this.active = true;
            this.modal.show();
        }
    }

    onShown(): void {
        document.getElementById('CoordinatorName')?.focus();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    save(): void {
        this.saving = true;
        this.item.enabled = this.state == 'true';
        
        if (this.item.id)
            this._coordinatorServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.close();
                    this.modalSave.emit();
                    this.notify.success('Registro actualizado satisfactoriamente');
                });

        else
            this._coordinatorServiceProxy
                .create(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.close();
                    this.modalSave.emit();
                    this.notify.success('Registro creado satisfactoriamente');
                });
    }

}