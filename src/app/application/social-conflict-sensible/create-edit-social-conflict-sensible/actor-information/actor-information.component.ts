import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
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
    @Output() editActor: EventEmitter<{ index: number, value: SocialConflictSensibleActorLocationDto }> = new EventEmitter<{ index: number, value: SocialConflictSensibleActorLocationDto }>();

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

    cancelRemove(actor: SocialConflictSensibleActorLocationDto) {
        actor.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar de la actor seleccionado');
    }

    actorEvent() {
        this.router.navigate(['/app/maintenance/actors'], { queryParams: { returnUrl: 'actors' } });
    }

    addActorEvent() {
        debugger;
        this.openFindActor.emit();
    }

    editEvent(value: SocialConflictSensibleActorLocationDto, index: number) {
        this.editActor.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: SocialConflictSensibleActorLocationDto, index: number }) {
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

        // this._utilityServiceProxy
        //     .getAllSocialConflictLocations(record.socialConflict.id)
        //     .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1000)))
        //     .subscribe(response => {
        //         this.compromise.record = record;
        //         this.compromise.compromiseLocations = response.items.map(p => {
        //             return new CompromiseLocationDto({
        //                 id: undefined,
        //                 socialConflictLocation: p,
        //                 check: false
        //             });
        //         });
        //     });
    }
}