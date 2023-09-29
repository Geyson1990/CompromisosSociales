import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { InterventionPlanActivityDto, InterventionPlanActivityServiceProxy } from '@shared/service-proxies/application/intervention-plan-activity-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-intervention-plan-activity',
    templateUrl: 'create-edit-intervention-plan-activity.component.html',
    styleUrls: [
        'create-edit-intervention-plan-activity.component.css'
    ]
})
export class CreateEditInterventionPlanActivityComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<void> = new EventEmitter<void>();

    item: InterventionPlanActivityDto = new InterventionPlanActivityDto();
    state: string;
    showDescription: string;
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector, private _interventionPlanActivityServiceProxy: InterventionPlanActivityServiceProxy) {
        super(_injector);
    }

    show(id?: number): void {

        this.saving = false;
        this.item = new InterventionPlanActivityDto();
        this.state = 'true';
        this.showDescription = 'false';

        if (id) {
            this._interventionPlanActivityServiceProxy.get(id).subscribe(result => {
                this.item = result;
                this.state = result.enabled ? 'true' : 'false';
                this.showDescription = result.showDescription ? 'true' : 'false';
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
        this.item.showDescription = this.showDescription && this.showDescription == 'true';

        if (this.item.id) {
            this._interventionPlanActivityServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        } else {
            this._interventionPlanActivityServiceProxy
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
