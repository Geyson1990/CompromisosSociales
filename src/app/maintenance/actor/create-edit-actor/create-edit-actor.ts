import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ActorTypeDto, ActorTypeServiceProxy } from '@shared/service-proxies/application/actor-type-proxie';
import { SocialConflictAlertActorTypeDto } from '@shared/service-proxies/application/social-conflict-alert-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-actor',
    templateUrl: 'create-edit-actor.html',
    styleUrls: [
        'create-edit-actor.css'
    ]
})
export class CreateEditActorComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    indexes: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    item: ActorTypeDto = new ActorTypeDto();
    state: string;
    showDetail: string;
    showMovement: string;
    active: boolean;
    saving: boolean;
    actorTypes: SocialConflictAlertActorTypeDto[];

    constructor(_injector: Injector, private _actortypeServiceProxy: ActorTypeServiceProxy) {
        super(_injector);
    }

    show(id?: number,  actorTypes?: SocialConflictAlertActorTypeDto[]): void {

        this.saving = false;
        this.item = new ActorTypeDto();
        this.state = 'true';
        this.showDetail = 'false';
        this.showMovement = 'false';
        this.actorTypes = Object.assign([], actorTypes);
        
        if (this.item?.actorType && this.item.actorType.id != -1) {
            const managementIndex: number = this.actorTypes.findIndex(p => p.id == this.item.actorType.id);

            if (managementIndex == -1) {
                this.actorTypes.push(SocialConflictAlertActorTypeDto.fromJS(this.item.actorType));
                this.actorTypes = this.actorTypes.sort((a, b) => a.name.localeCompare(b.name));
            }
        }
        if (id) {
            this._actortypeServiceProxy.get(id).subscribe(result => {
                this.item = result;
                this.state = result.enabled ? 'true' : 'false';
                this.showDetail = result.showDetail ? 'true' : 'false';
                this.showMovement = result.showMovement ? 'true' : 'false';
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
        this.item.showDetail = this.showDetail && this.showDetail == 'true';
        this.item.showMovement = this.showMovement && this.showMovement == 'true';

        if (this.item.id) {
            this._actortypeServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        } else {
            this._actortypeServiceProxy
                .create(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Creado satisfactoriamente');
                    this.close();
                });
        }

    }

    onActorTypeChange(event: any) {
        // const actorTypeId: number = +event.target.value;
        // const index: number = this.actorTypes.findIndex(p => p.id == actorTypeId);

        // if (index != -1) {
        //     this.item.actorType.name = this.actorTypes[index].name;
        //     this.item.actorType.showDetail = this.actorTypes[index].showDetail;
        //     this.item.actorType.showMovement = this.actorTypes[index].showMovement;
        // } else {
        //     this.item.actorType.id = -1;
        //     this.item.actorType.name = undefined;
        //     this.item.actorType.showDetail = false;
        // }
    }

}
