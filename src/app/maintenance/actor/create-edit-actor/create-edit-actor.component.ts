import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ActorDto, ActorTypeDto, ActorTypologyDto, ActorSubTypologyDto, ActorMovementDto, ActorServiceProxy, ActorSocialConflictDto, ActorSocialConflictAlertDto, ActorSocialConflictSensibleDto } from '@shared/service-proxies/application/actor-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { TabView } from 'primeng';

@Component({
    selector: 'create-edit-actor',
    templateUrl: 'create-edit-actor.component.html',
    styleUrls: [
        'create-edit-actor.component.css'
    ]
})
export class CreateEditActorComponent extends AppComponentBase {
    @ViewChild('primeTabView', { static: false }) primeTabView: TabView;
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    
    activeIndex: number = 0;
    item: ActorDto = new ActorDto();
    actorTypes: ActorTypeDto[];
    actorTypologies: ActorTypologyDto[];
    actorMovements: ActorMovementDto[];
    socialConflicts: ActorSocialConflictDto[];
    socialConflictAlerts: ActorSocialConflictAlertDto[];
    socialConflictSensibles: ActorSocialConflictSensibleDto[];

    state: string = 'true';
    politic: string = 'false';
    active: boolean = false;
    saving: boolean = false;
    statusId: number = 0;

    selectedTypologies: ActorTypologyDto[];
    selectedSubTypologies: ActorSubTypologyDto[];

    defaultRecordsCountPerPage : Number = 5;

    constructor(_injector: Injector, private _actorServiceProxy: ActorServiceProxy) {
        super(_injector);
    }

   show(id?: number, item?: ActorDto): void {
        this.item = new ActorDto(item);
        this.saving = false;
        this.state = 'true';
        this._actorServiceProxy.get(id).subscribe(result => {
            if (result.actor) {  
                this.item = result.actor;                
                this.socialConflicts = result.socialConflicts;
                this.socialConflictAlerts = result.socialConflictAlerts;
                this.socialConflictSensibles = result.socialConflictSensibles;
                this.state = this.item.enabled ? 'true' : 'false';
            }      
            this.actorTypes = result.actorTypes;
            this.actorMovements = result.actorMovements;
            this.politic = this.item && this.item.isPoliticalAssociation ? 'true' : 'false';
            this.active = true;
            this.modal.show();
        });
    }

    onActorTypeChange(event: any) {
        const actorTypeId: number = +event.target.value;
        const index: number = this.actorTypes.findIndex(p => p.id == actorTypeId);

        if (index != -1) {
            this.item.actorType.name = this.actorTypes[index].name;
            this.item.actorType.showDetail = this.actorTypes[index].showDetail;
            this.item.actorType.showMovement = this.actorTypes[index].showMovement;
        } else {
            this.item.actorType.id = -1;
            this.item.actorType.name = undefined;
            this.item.actorType.showDetail = false;
        }
    }

    onActorMovementChange(event: any) {
        const actorMovementId: number = +event.target.value;
        const index: number = this.actorMovements.findIndex(p => p.id == actorMovementId);

        if (index != -1) {
            this.item.actorMovement.name = this.actorMovements[index].name;
        } else {
            this.item.actorMovement.id = -1;
            this.item.actorMovement.name = undefined;
        }
    }
    onShown(): void {
        document.getElementById('ActorName')?.focus();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    save() {
        if (this.item.statusId == 1 && this.item.id > 0) {
            this.message.confirm(`El actor pasará de estado Pendiente de revisión a Aprobado.`,'¿Esta seguro de continuar?', (confirm) => {
                if (confirm == false) {
                    return;
                }
            });
        }
        this.saving = true;
        this.item.enabled = this.state == 'true';
        this.item.isPoliticalAssociation = this.politic == 'true';

        if (this.item.id)
        {
            this.item.statusId = 2;
            this._actorServiceProxy
            .update(this.item)
            .pipe(finalize(() => this.saving = false))
            .subscribe(() => {
                this.close();
                this.modalSave.emit();
                this.notify.success('Registro actualizado satisfactoriamente');
            });
        }
        else {
            this.item.statusId = this.statusId;
            this._actorServiceProxy
                .create(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.close();
                    this.modalSave.emit();
                    this.notify.success('Registro creado satisfactoriamente');
                });
            }
    }

}
