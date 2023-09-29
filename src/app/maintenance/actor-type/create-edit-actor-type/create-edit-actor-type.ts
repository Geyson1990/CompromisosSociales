import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ActorTypeDto, ActorTypeServiceProxy } from '@shared/service-proxies/application/actor-type-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-actor-type',
    templateUrl: 'create-edit-actor-type.html',
    styleUrls: [
        'create-edit-actor-type.css'
    ]
})
export class CreateEditActorTypeComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    indexes: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    item: ActorTypeDto = new ActorTypeDto();
    state: string;
    showDetail: string;
    showMovement: string;
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector, private _actortypeServiceProxy: ActorTypeServiceProxy) {
        super(_injector);
    }

    show(id?: number): void {

        this.saving = false;
        this.item = new ActorTypeDto();
        this.state = 'true';
        this.showDetail = 'false';
        this.showMovement = 'false';

        if (id) {
            this._actortypeServiceProxy.get(id).subscribe(result => {
                this.item = result;
                this.state = result.enabled ? 'true' : 'false';
                this.showDetail = result.showDetail ? 'true' : 'false';
                this.showMovement = result.showMovement ? 'true' : 'false';
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
        this.item.showDetail = this.showDetail && this.showDetail == 'true';
        this.item.showMovement = this.showMovement && this.showMovement == 'true';

        if (this.item.id) {
            this._actortypeServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        } else {
            this._actortypeServiceProxy
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
