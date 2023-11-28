import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CreateEditActorComponent } from '@app/maintenance/actor/create-edit-actor/create-edit-actor.component';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictSensibleDto, SocialConflictSensibleActorLocationDto } from '@shared/service-proxies/application/social-conflict-sensible-proxie';
import { UtilityRecordDto } from '@shared/service-proxies/application/utility-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'actor-information-social-conflict-sensible',
    templateUrl: 'actor-information.component.html',
    styleUrls: [
        'actor-information.component.css'
    ]
})
export class ActorInformationSocialConflictSensibleComponent extends AppComponentBase implements OnInit {
  
    private _busy: boolean;
    private _socialConflictSensible: SocialConflictSensibleDto;
    socialConflictSelect: SocialConflictSensibleActorLocationDto;
    @ViewChild('createEditModal', { static: true }) createEditModal: CreateEditActorComponent;

    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Input() get busy(): boolean {
        return this._busy;
    }

    set busy(value: boolean) {
        this._busy = value;
    }

    @Input() get socialConflictSensible(): SocialConflictSensibleDto {
        return this._socialConflictSensible;
    }

    set socialConflictSensible(value: SocialConflictSensibleDto) {
        this._socialConflictSensible = value;
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    @Output() openFindActor: EventEmitter<void> = new EventEmitter<void>();
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

    getData(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    removeItem(actor: SocialConflictSensibleActorLocationDto, index: number) {
        if (actor.id) {
            actor.remove = true;
            this.notify.warn('Se ha marcado para eliminar el actor seleccionado');
        } else {
            this.socialConflictSensible.actors.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    createItem() {
        this.createEditModal.statusId = 1;
        this.createEditModal.show();
    }

    saveActor() {}

    cancelRemove(actor: SocialConflictSensibleActorLocationDto) {
        actor.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar de la actor seleccionado');
    }

    addEvent() {
        this.showSocialFindActorModal.emit();
    }
    
    actorEvent() {
        this.router.navigate(['/app/maintenance/actors'], { queryParams: { returnUrl: 'actors' } });
    }

    addActorEvent() {
        debugger;
        this.openFindActor.emit();
    }

    // editEvent(value: SocialConflictSensibleActorLocationDto, index: number) {
    //     this.editActor.emit({ index: index, value: value });
    // }

    addOrUpdateItem(event: { value: SocialConflictSensibleActorLocationDto, index: number }) {
        this.socialConflictSelect = event.value;

        const existe = this.socialConflictSensible.actors.filter((actor) =>  actor.actorId === this.socialConflictSelect.actorId);

        if (existe?.length > 0) {
            this.notify.warn('El actor seleccionado ya existe');
            return;
        }

        if (event.index || event.index == 0) {
            this.socialConflictSensible.actors[event.index] = event.value;
        } else {
            this.socialConflictSensible.actors.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;
        for (let item of this.socialConflictSensible.actors) {
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
