import { Component, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictTaskManagementDto, SocialConflictTaskManagementEmailConfigurationDto, SocialConflictTaskManagementServiceProxy } from '@shared/service-proxies/application/social-conflict-task-management-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'social-conflict-task-management-email',
    templateUrl: 'social-conflict-task-management-email.component.html',
    styleUrls: [
        'social-conflict-task-management-email.component.css'
    ]
})
export class SocialConflictTaskManagementEmailComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    task: SocialConflictTaskManagementDto;

    active: boolean = false;
    saving: boolean = false;

    toEmailAddresses: string[] = [];
    copyEmailAddresses: string[] = [];

    configuration: SocialConflictTaskManagementEmailConfigurationDto = new SocialConflictTaskManagementEmailConfigurationDto();

    toFocused: boolean;
    copyFocused: boolean;

    constructor(_injector: Injector, private _socialConflictTaskManagementServiceProxy: SocialConflictTaskManagementServiceProxy) {
        super(_injector);
    }

    focusChipTo() {
        this.toFocused = true;
    }

    focusChipCopy() {
        this.copyFocused = true;
    }

    onBlurTo() {
        this.toFocused = false;
        this.toEmailAddresses = [...new Set(this.toEmailAddresses)].filter(p => this.testEmail(p));
    }

    onBlurCopy() {
        this.copyFocused = false;
        this.copyEmailAddresses = [...new Set(this.copyEmailAddresses)].filter(p => this.testEmail(p));
    }

    onAddCopy(event: any) {
        const email: string = (event.value ? event.value : '').replace(/[^a-zA-Z0-9-._@]/g, "");
        const index: number = this.copyEmailAddresses.findIndex(p => p == event.value);
        if (index != -1) {
            if (this.testEmail(email)) {
                this.copyEmailAddresses[index] = email;
            } else {
                this.copyEmailAddresses.splice(index, 1);
            }
        }
    }

    onAddTo(event: any) {
        const email: string = (event.value ? event.value : '').replace(/[^a-zA-Z0-9-._@]/g, "");
        const index: number = this.toEmailAddresses.findIndex(p => p == event.value);
        if (index != -1) {
            if (this.testEmail(email)) {
                this.toEmailAddresses[index] = email;
            } else {
                this.toEmailAddresses.splice(index, 1);
            }
        }
    }

    show(task: SocialConflictTaskManagementDto) {
        this.task = task;
        this.saving = false;
        this._socialConflictTaskManagementServiceProxy.getEmailConfiguration(task.id).subscribe(response => {
            this.configuration = response;
            this.active = true;
            this.modal.show();
        });
    }

    onShown() {

    }

    close(): void {
        this.modal.hide();
        this.active = false;
        this.saving = false;
        this.toEmailAddresses = [];
        this.copyEmailAddresses = [];
    }

    save() {
        if (this.toEmailAddresses.length == 0 && this.copyEmailAddresses.length == 0) {
            this.message.error('Debe agregar al menos un destinatario', 'Aviso');
            return;
        }
        this.saving = true;
        this._socialConflictTaskManagementServiceProxy
            .sendNotification(
                this.task.id,
                this.toEmailAddresses,
                this.copyEmailAddresses,
                this.configuration.subject,
                this.configuration.template)
            .pipe(finalize(() => this.saving = false))
            .subscribe(() => {
                this.message.success('Se ha enviado la notificación de manera existosa', 'Aviso');
                this.close();
            });
    }
}