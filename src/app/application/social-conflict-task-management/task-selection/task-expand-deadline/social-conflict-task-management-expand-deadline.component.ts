import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictTaskManagementDto, SocialConflictTaskManagementExtendCreateDto, SocialConflictTaskManagementServiceProxy } from '@shared/service-proxies/application/social-conflict-task-management-proxie';
import { EntityDto } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'social-conflict-task-management-expand-deadline',
    templateUrl: 'social-conflict-task-management-expand-deadline.component.html',
    styleUrls: [
        'social-conflict-task-management-expand-deadline.component.css'
    ]
})
export class SocialConflictTaskManagementExpandDeadlineComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<moment.Moment> = new EventEmitter<moment.Moment>();

    item: SocialConflictTaskManagementDto;
    minDate: Date;
    description: string;
    lastDeadline: Date;
    deadline: moment.Moment;
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector, private _socialConflictTaskManagementServiceProxy: SocialConflictTaskManagementServiceProxy) {
        super(_injector);
    }

    show(task: SocialConflictTaskManagementDto): void {
        this.item = task;
        this.lastDeadline = task.deadline.toDate();
        this.minDate = task.deadline.toDate();
        this.active = true;
        this.modal.show();
    }

    onShown(): void {
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if (this.isNullEmptyOrWhiteSpace(this.description)) {
            this.message.error('La descripción de la ampliación de la fecha de vencimiento es obligatoria', 'Aviso');
            return;
        }
        if (!this.deadline) {
            this.message.error('Debe ingresar la nueva fecha de vencimiento antes de continuar', 'Aviso');
            return;
        }

        this.saving = true;
        this._socialConflictTaskManagementServiceProxy.createTaskExtend(new SocialConflictTaskManagementExtendCreateDto({
            description: this.description,
            deadline: this.deadline,
            socialConflictTaskManagement: new EntityDto({
                id: this.item.id
            })
        })).pipe(finalize(() => this.saving = false))
            .subscribe(() => {
                this.modalSave.emit(this.deadline);
                this.notify.success('Fecha de vencimiento actualizada satisfactoriamente');
                this.close();
            });
    }
}
