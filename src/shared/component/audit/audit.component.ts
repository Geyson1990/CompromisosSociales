import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Audit } from '@shared/service-proxies/application/utility-proxie';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'audit',
    templateUrl: 'audit.component.html',
    styleUrls: [
        'audit.component.css'
    ]
})
export class AuditComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active: boolean = false;
    saving: boolean = false;
    createUser: string;
    creationTime:  moment.Moment;
    editUser:string;
    lastModificationTime: moment.Moment;

    constructor(_injector: Injector, ) {
        super(_injector);
    }

    show(item? : Audit): void {
        if (item.creatorUser) { 
            this.createUser = item.creatorUser;
            this.creationTime = item.creationTime;
        }
        if (item.editUser) {  
            this.editUser = item.editUser;
            this.lastModificationTime = item.lastModificationTime;
        }                
        this.active = true;
        this.modal.show();
    }

    onShown(): void {
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

}
