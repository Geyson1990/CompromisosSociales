import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ResponsibleActorDto, ResponsibleActorServiceProxy, ResponsibleActorSubTypeDto, ResponsibleActorTypeDto } from '@shared/service-proxies/application/responsible-actor-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-responsible-actor',
    templateUrl: 'create-edit-responsible-actor.component.html',
    styleUrls: [
        'create-edit-responsible-actor.component.css'
    ]
})
export class CreateEditResponsibleActorComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    item: ResponsibleActorDto = new ResponsibleActorDto();
    active: boolean;
    saving: boolean;

    types: ResponsibleActorTypeDto[];
    selectedSubTypes: ResponsibleActorSubTypeDto[];

    constructor(_injector: Injector, private _responsibleActorServiceProxy: ResponsibleActorServiceProxy) {
        super(_injector);
    }

    show(id?: number): void {

        this.selectedSubTypes = [];
        this.types = [];
        this.saving = false;
        this.item = new ResponsibleActorDto();

        this._responsibleActorServiceProxy
            .get(id)
            .subscribe((result) => {

                this.types = result.types;

                if (result.responsibleActor) {
                    this.item = result.responsibleActor;
                    
                    if (this.item.responsibleType && this.item.responsibleType.id > 0) {
                        const index: number = this.types.findIndex(p => p.id == this.item.responsibleType.id);
                        if (index != -1)
                            this.selectedSubTypes = this.types[index].subTypes;
                    }
                }

                this.active = true;
                this.modal.show();
            });

    }

    onTypeChange(event: any) {
        const typeId: number = +event.target.value;
        const index: number = this.types.findIndex(p => p.id == typeId);

        if (index != -1) {
            this.item.responsibleType.name = this.types[index].name;
            this.selectedSubTypes = this.types[index].subTypes;
        } else {
            this.item.responsibleType.id = -1;
            this.item.responsibleType.name = undefined;
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
        if (this.isNullEmptyOrWhiteSpace(this.item.name)) {
            this.message.error('Debe ingresar el nombre del actor antes de guardar los cambios');
            return;
        }
        if (this.item.responsibleType.id == -1) {
            this.message.error('Debe seleccionar tipo de actor antes de guardar los cambios');
            return;
        }

        if (this.item.responsibleSubType.id == -1) {
            this.message.error('Debe seleccionar subtipo de actor antes de guardar los cambios');
            return;
        }

        this.saving = true;
        if (this.item.id)
            this._responsibleActorServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        else
            this._responsibleActorServiceProxy
                .create(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Creado satisfactoriamente');
                    this.close();
                });
    }
}
