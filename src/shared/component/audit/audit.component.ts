import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ActorDto } from '@shared/service-proxies/application/actor-proxie';
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

    item: ActorDto = new ActorDto();
    state: string = 'true';
    politic: string = 'false';
    active: boolean = false;
    saving: boolean = false;
    createUser: string;
    creationTime:  moment.Moment;
    editUser:string;
    lastModificationTime: moment.Moment;

    constructor(_injector: Injector, ) {
        super(_injector);
    }

//    show(createUser: string,creationTime: moment.Moment,editUser?:string,lastModificationTime?:moment.Moment): void {
    show(): void {
        console.log("item de show")
        // this.createUser = createUser;
        // this.creationTime = creationTime;
        // if (editUser) {  
        //     this.editUser = editUser;
        //     this.lastModificationTime = lastModificationTime;
        // }                
        this.active = true;
        this.modal.show();
    }

    onShown(): void {
        document.getElementById('ActorName')?.focus();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

}
