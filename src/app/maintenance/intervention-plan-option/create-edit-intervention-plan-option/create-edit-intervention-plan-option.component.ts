import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { InterventionPlanOptionDto, InterventionPlanOptionServiceProxy } from '@shared/service-proxies/application/intervention-plan-option';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-intervention-plan-option',
    templateUrl: 'create-edit-intervention-plan-option.component.html',
    styleUrls: [
        'create-edit-intervention-plan-option.component.css'
    ]
})
export class CreateEditInterventionPlanOptionComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    item: InterventionPlanOptionDto = new InterventionPlanOptionDto();
    state: string;
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector, private _interventionplanoptionServiceProxy: InterventionPlanOptionServiceProxy) {
        super(_injector);
    }

    show(id?: number): void {

        this.saving = false;
        this.item = new InterventionPlanOptionDto();
        this.state = 'true';

        if (id) {
            this._interventionplanoptionServiceProxy.get(id).subscribe(result => {
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
            this._interventionplanoptionServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        } else {
            this._interventionplanoptionServiceProxy
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
