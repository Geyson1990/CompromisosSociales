import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictAlertDto, SocialConflictAlertActorLocationDto } from '@shared/service-proxies/application/social-conflict-alert-proxie';
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

    @ViewChild('paginator', { static: true }) paginator: Paginator;

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
    @Output() editActor: EventEmitter<{ index: number, value: SocialConflictAlertActorLocationDto }> = new EventEmitter<{ index: number, value: SocialConflictAlertActorLocationDto }>();

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

    editEvent(value: SocialConflictAlertActorLocationDto, index: number) {
        this.editActor.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: SocialConflictAlertActorLocationDto, index: number }) {
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
}