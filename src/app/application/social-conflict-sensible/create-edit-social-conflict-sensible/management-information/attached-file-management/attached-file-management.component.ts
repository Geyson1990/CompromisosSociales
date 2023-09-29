import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import {  SocialConflictSensibleManagementLocationDto, SocialConflictSensibleResourceDto } from '@shared/service-proxies/application/social-conflict-sensible-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'attached-file-management-information-social-conflict-sensible',
    templateUrl: 'attached-file-management.component.html',
    styleUrls: [
        'attached-file-management.component.css'
    ]
})
export class AttachedFileManagementInformationSocialConflictSensibleComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: SocialConflictSensibleManagementLocationDto, index: number }> = new EventEmitter<{ value: SocialConflictSensibleManagementLocationDto, index: number }>();

    item: SocialConflictSensibleManagementLocationDto;
    active: boolean;

    constructor(_injector: Injector) {
        super(_injector);
    }

    show(item: SocialConflictSensibleManagementLocationDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    onShown(): void {

    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    removeResource(resource: SocialConflictSensibleResourceDto, index: number) {
        resource.remove = true;
    }

    restoreResource(resource: SocialConflictSensibleResourceDto) {
        resource.remove = false;
    }

    removeFile(index: number) {
        
    }
}
