import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { InterventionPlanEntityDto, InterventionPlanEntityServiceProxy } from '@shared/service-proxies/application/intervention-plan-entity-proxie';
import { InterventionPlanEntityType } from '@shared/service-proxies/application/utility-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-intervention-plan-entity',
    templateUrl: 'create-edit-intervention-plan-entity.component.html',
    styleUrls: [
        'create-edit-intervention-plan-entity.component.css'
    ]
})
export class CreateEditInterventionPlanEntityComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<void> = new EventEmitter<void>();

    item: InterventionPlanEntityDto = new InterventionPlanEntityDto();
    state: string;
    active: boolean;
    saving: boolean;

    types = {
        none: InterventionPlanEntityType.None,
        sector: InterventionPlanEntityType.Sector,
        responsible: InterventionPlanEntityType.Responsible,
        other: InterventionPlanEntityType.Other
    }

    constructor(_injector: Injector, private _interventionPlanEntityServiceProxy: InterventionPlanEntityServiceProxy) {
        super(_injector);
    }

    show(id?: number): void {

        this.saving = false;
        this.item = new InterventionPlanEntityDto();
        this.item.type = this.types.none;
        this.state = 'true';

        if (id) {
            this._interventionPlanEntityServiceProxy.get(id).subscribe(result => {
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

        if(this.isNullEmptyOrWhiteSpace(this.item.name)) {
            this.message.info('Aviso', 'Debe ingresar el nombre de la entidad antes de continuar');
            return;
        }
        if(this.item.type == this.types.none) {
            this.message.info('Aviso', 'Debe seleccionar el tipo de entidad');
            return;
        }

        if (this.item.id) {
            this._interventionPlanEntityServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        } else {
            this._interventionPlanEntityServiceProxy
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
