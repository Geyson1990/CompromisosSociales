import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CreateEditActorComponent } from '@app/maintenance/actor/create-edit-actor/create-edit-actor.component';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FindActorComponent } from '@shared/component/find-actor/find-actor.component';
import { SocialConflictAlertDto, SocialConflictAlertActorLocationDto } from '@shared/service-proxies/application/social-conflict-alert-proxie';
import { UtilityRecordDto } from '@shared/service-proxies/application/utility-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'actor-information-social-conflict-alert',
    templateUrl: 'actor-information.component.html',
    styleUrls: [
        'actor-information.component.css'
    ]
})
export class ActorInformationSocialConflictAlertComponent extends AppComponentBase implements OnInit {
 
    private _busy: boolean;
    private _socialConflictAlert: SocialConflictAlertDto;
    socialConflictSelect: SocialConflictAlertActorLocationDto;
    @ViewChild('findActorModal', { static: true }) findRecord: FindActorComponent;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModal', { static: true }) createEditModal: CreateEditActorComponent;
    @Input() get busy(): boolean {
        return this._busy;
    }

    set busy(value: boolean) {
        this._busy = value;
    }
  
    @Input() get socialConflictAlert(): SocialConflictAlertDto {
        return this._socialConflictAlert;
    }
 
    set socialConflictAlert(value: SocialConflictAlertDto) {
        this._socialConflictAlert = value;
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    @Output() addActor: EventEmitter<void> = new EventEmitter<void>();
    @Output() showSocialFindActorModal: EventEmitter<void> = new EventEmitter<void>();

    private skipCount: number;
    private maxResultCount: number;

    constructor(_injector: Injector) {
        super(_injector);
        this.primengTableHelper.defaultRecordsCountPerPage = 5;
        this.skipCount = 0;
        this.maxResultCount = this.primengTableHelper.defaultRecordsCountPerPage;
    }

    ngOnInit(): void {
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    createItem() {
        this.createEditModal.statusId = 1;
        this.createEditModal.show();
    }

    getData(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    saveActor () {
         console.log("guardo existoso")
    }

    removeItem(actor: SocialConflictAlertActorLocationDto, index: number) {
        if (actor.id) {
            actor.remove = true;
            this.notify.warn('Se ha marcado para eliminar el actor seleccionado');
        } else {
            this.socialConflictAlert.actors.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(actor: SocialConflictAlertActorLocationDto) {
        actor.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar de la actor seleccionado');
    }

    addEvent() {
        this.showSocialFindActorModal.emit();
    }
    actorEvent() {
        this.router.navigate(['/app/maintenance/actors'], { queryParams: { returnUrl: 'actors' } });
    }

    addOrUpdateItem(event: { value: SocialConflictAlertActorLocationDto, index: number }) {
        this.socialConflictSelect = event.value;
        const existe = this.socialConflictAlert.actors.filter((actor) =>  actor.actorId === this.socialConflictSelect.actorId);

        if (existe?.length > 0) {
            this.notify.warn('El actor seleccionado ya existe');
            return;
        }
        if (event.index || event.index == 0) {
            this.socialConflictAlert.actors[event.index] = event.value;
        } else {
            this.socialConflictAlert.actors.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;
        for (let item of this.socialConflictAlert.actors) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }

    selectRecord(record: UtilityRecordDto) {
        this.showMainSpinner('Cargando localizaciones del conflicto social...');

    }
}
