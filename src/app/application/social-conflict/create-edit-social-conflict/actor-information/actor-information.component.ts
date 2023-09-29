import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictDto, SocialConflictActorLocationDto } from '@shared/service-proxies/application/social-conflict-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'actor-information-social-conflict',
    templateUrl: 'actor-information.component.html',
    styleUrls: [
        'actor-information.component.css'
    ]
})
export class ActorInformationSocialConflictComponent extends AppComponentBase implements OnInit {

    private _busy: boolean;
    private _socialConflict: SocialConflictDto;

    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Input() get busy(): boolean {
        return this._busy;
    }

    set busy(value: boolean) {
        this._busy = value;
    }

    @Input() get socialConflict(): SocialConflictDto {
        return this._socialConflict;
    }

    set socialConflict(value: SocialConflictDto) {
        this._socialConflict = value;
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    @Input() hasPermission: boolean;

    @Output() addActor: EventEmitter<void> = new EventEmitter<void>();
    @Output() editActor: EventEmitter<{ index: number, value: SocialConflictActorLocationDto }> = new EventEmitter<{ index: number, value: SocialConflictActorLocationDto }>();

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

    removeItem(actor: SocialConflictActorLocationDto, index: number) {
        if (actor.id) {
            actor.remove = true;
            this.notify.warn('Se ha marcado para eliminar el actor seleccionado');
        } else {
            this.socialConflict.actors.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(actor: SocialConflictActorLocationDto) {
        actor.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar de la actor seleccionado');
    }

    editEvent(value: SocialConflictActorLocationDto, index: number) {
        this.editActor.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: SocialConflictActorLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.socialConflict.actors[event.index] = event.value;
        } else {
            this.socialConflict.actors.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;
        for (let item of this.socialConflict.actors) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}