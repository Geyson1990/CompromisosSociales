import { Component, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { NotificationManagerServiceProxy } from '@shared/service-proxies/application/notification-manager-proxie';
import { TaskManagementDto } from '@shared/service-proxies/application/task-board-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'task-management-sender',
    templateUrl: 'task-management-sender.component.html',
    styleUrls: [
        'task-management-sender.component.css'
    ]
})
export class TaskManagementSenderComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    task: TaskManagementDto;
    subject: string = 'La notificación esta por vencer';

    active: boolean = false;
    saving: boolean = false;

    constructor(_injector: Injector, private _notificationManagerServiceProxy: NotificationManagerServiceProxy) {
        super(_injector);
    }

    show(task: TaskManagementDto) {
        this.task = task;
        this.active = true;
        this.modal.show();
    }

    onShown() {

    }

    close(): void {
        this.modal.hide();
        this.active = false;
        this.saving = false;
        this.subject = '';
    }

    save() {
        if (this.isNullEmptyOrWhiteSpace(this.subject)) {
            this.message.error('El asunto del mensaje es obligatorio', 'Aviso');
            return;
        }
        this.saving = true;
        this._notificationManagerServiceProxy
            .sendCompromiseTaskManagementNotification(
                this.task.id,
                this.subject)
            .pipe(finalize(() => this.saving = false))
            .subscribe(() => {
                this.message.success('Se ha enviado la alerta de manera existosa', 'Aviso');
                this.close();
            });
    }
}