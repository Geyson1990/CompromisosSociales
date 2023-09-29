import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { InterventionPlanRoleDto, InterventionPlanRoleServiceProxy } from '@shared/service-proxies/application/intervention-plan-role-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-intervention-plan-role',
    templateUrl: 'create-edit-intervention-plan-role.component.html',
    styleUrls: [
        'create-edit-intervention-plan-role.component.css'
    ]
})
export class CreateEditInterventionPlanRoleComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<void> = new EventEmitter<void>();

    item: InterventionPlanRoleDto = new InterventionPlanRoleDto();
    state: string;
    showDescription: string;
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector, private _interventionPlanRoleServiceProxy: InterventionPlanRoleServiceProxy) {
        super(_injector);
    }

    show(id?: number): void {

        this.saving = false;
        this.item = new InterventionPlanRoleDto();
        this.state = 'true';
        this.showDescription = 'false';

        if (id) {
            this._interventionPlanRoleServiceProxy.get(id).subscribe(result => {
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
            this._interventionPlanRoleServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        } else {
            this._interventionPlanRoleServiceProxy
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
