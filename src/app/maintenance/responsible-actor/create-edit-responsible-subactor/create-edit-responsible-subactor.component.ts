import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ResponsibleActorDto, ResponsibleActorServiceProxy, ResponsibleActorType, ResponsibleSubActorDto } from '@shared/service-proxies/application/responsible-actor-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-responsible-subactor',
    templateUrl: 'create-edit-responsible-subactor.component.html',
    styleUrls: [
        'create-edit-responsible-subactor.component.css'
    ]
})
export class CreateEditSubResponsibleActorComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    item: ResponsibleSubActorDto = new ResponsibleSubActorDto();
    responsibleActor: ResponsibleActorDto = new ResponsibleActorDto();
    active: boolean;
    saving: boolean;
    
    constructor(_injector: Injector, private _responsibleActorServiceProxy: ResponsibleActorServiceProxy) {
        super(_injector);
    }

    show(id: number, responsibleActor: ResponsibleActorDto): void {

        this.saving = false;
        this.item = new ResponsibleSubActorDto();
        this.responsibleActor = responsibleActor;

        if (id) {
            this._responsibleActorServiceProxy
                .getResponsibleSubActor(id)
                .subscribe(
                    result => {
                        this.item = result;
                        this.active = true;
                        this.modal.show();
                    });
        }
        else {
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
        this.item.responsibleActorId = this.responsibleActor.id;
        if (this.item.id)
            this._responsibleActorServiceProxy
                .updateResponsibleSubActor(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        else
            this._responsibleActorServiceProxy
                .createResponsibleSubActor(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Creado satisfactoriamente');
                    this.close();
                });
    }
}
