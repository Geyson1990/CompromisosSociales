import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictManagementDto, SocialConflictManagementLocationDto, SocialConflictPersonDto, SocialConflictResourceDto } from '@shared/service-proxies/application/social-conflict-proxie';
import { AttachmentUploadDto } from '@shared/service-proxies/application/utility-proxie';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'attached-file-management-information-social-conflict',
    templateUrl: 'attached-file-management.component.html',
    styleUrls: [
        'attached-file-management.component.css'
    ]
})
export class AttachedFileManagementInformationSocialConflictComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: SocialConflictManagementLocationDto, index: number }> = new EventEmitter<{ value: SocialConflictManagementLocationDto, index: number }>();

    item: SocialConflictManagementLocationDto;
    active: boolean;

    constructor(_injector: Injector) {
        super(_injector);
    }

    show(item: SocialConflictManagementLocationDto): void {
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

    removeResource(resource: SocialConflictResourceDto, index: number) {
        resource.remove = true;
    }

    restoreResource(resource: SocialConflictResourceDto) {
        resource.remove = false;
    }

    removeFile(index: number) {
        
    }
}
