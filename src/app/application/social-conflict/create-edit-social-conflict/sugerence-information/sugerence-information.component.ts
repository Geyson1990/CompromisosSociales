import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictActorLocationDto, SocialConflictDto, SocialConflictSugerenceDto, SocialConflictUserDto, SugerenceType } from '@shared/service-proxies/application/social-conflict-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'sugerence-information-social-conflict',
    templateUrl: 'sugerence-information.component.html',
    styleUrls: [
        'sugerence-information.component.css'
    ]
})
export class SugerenceInformationSocialConflictComponent extends AppComponentBase implements OnInit {

    private _busy: boolean;
    private _socialConflict: SocialConflictDto;

    @ViewChild('acceptedPaginator', { static: false }) acceptedPaginator: Paginator;
    @ViewChild('pendingPaginator', { static: false }) pendingPaginator: Paginator;

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
        this.formatPendingPagination(this.skipPendingCount, this.maxPendingResultCount);
        this.formatAcceptedPagination(this.skipAcceptedCount, this.maxAcceptedResultCount);
    }

    @Input() hasPermission: boolean;

    @Output() addSugerence: EventEmitter<{ type: SugerenceType }> = new EventEmitter<{ type: SugerenceType }>();
    @Output() editSugerence: EventEmitter<{ index: number, type: SugerenceType, value: SocialConflictSugerenceDto }> = new EventEmitter<{ index: number, type: SugerenceType, value: SocialConflictSugerenceDto }>();

    private skipPendingCount: number;
    private maxPendingResultCount: number;
    private skipAcceptedCount: number;
    private maxAcceptedResultCount: number;

    defaultPendingRecordsCountPerPage: number = 5;
    defaultAcceptedRecordsCountPerPage: number = 5;

    types = {
        pending: SugerenceType.Pending,
        accepted: SugerenceType.Accepted
    }

    constructor(_injector: Injector) {
        super(_injector);
        this.skipPendingCount = 0;
        this.maxPendingResultCount = this.defaultPendingRecordsCountPerPage;
        this.skipAcceptedCount = 0;
        this.maxAcceptedResultCount = this.defaultAcceptedRecordsCountPerPage;
    }

    ngOnInit(): void {
        this.formatAcceptedPagination(this.skipAcceptedCount, this.maxAcceptedResultCount);
        this.formatPendingPagination(this.skipPendingCount, this.maxPendingResultCount);
    }

    getData(event: LazyLoadEvent, type: SugerenceType) {
        if (type == SugerenceType.Accepted) {
            this.skipAcceptedCount = this.primengTableHelper.getSkipCount(this.acceptedPaginator, event);
            this.maxAcceptedResultCount = this.primengTableHelper.getMaxResultCount(this.acceptedPaginator, event);
            this.formatPendingPagination(this.skipAcceptedCount, this.maxAcceptedResultCount);
        } else {
            this.skipPendingCount = this.primengTableHelper.getSkipCount(this.pendingPaginator, event);
            this.maxPendingResultCount = this.primengTableHelper.getMaxResultCount(this.pendingPaginator, event);
            this.formatPendingPagination(this.skipPendingCount, this.maxPendingResultCount);
        }
    }

    editSugerences(sugerence: SocialConflictSugerenceDto, index: number, type: SugerenceType) {
        this.editSugerence.emit({ value: sugerence, index: index, type: type });
    }

    acceptSugerences(sugerence: SocialConflictSugerenceDto, index: number, type: SugerenceType) {
        const numberInformation: string = (index < 10 ? '0' : '') + (index + 1);
        this.message.confirm(`El proceso aceptará la recomendación seleccionada Nº ${numberInformation}`, '¿Estas seguro?', confirmation => {
            if (confirmation) {
                this.socialConflict.pendingSugerences[index].accepted = true;
                this.socialConflict.pendingSugerences[index].acceptedUser = new SocialConflictUserDto({
                    id: this.appSession.user.id,
                    name: this.appSession.user.name,
                    surname: this.appSession.user.surname
                });
                this.socialConflict.acceptedSugerences.push(this.socialConflict.pendingSugerences[index]);
                this.socialConflict.pendingSugerences.splice(index, 1);
                this.formatPendingPagination(this.skipPendingCount, this.maxPendingResultCount);
                this.formatAcceptedPagination(this.skipAcceptedCount, this.maxAcceptedResultCount);
            }
        });
    }

    addNewSugerence() {
        this.addSugerence.emit({ type: SugerenceType.Pending });
    }

    addNewAceptedSugerence() {
        this.addSugerence.emit({ type: SugerenceType.Accepted });
    }

    removeItem(sugerence: SocialConflictSugerenceDto, index: number, type: SugerenceType) {
        if (type == SugerenceType.Accepted) {
            if (sugerence.id) {
                sugerence.remove = true;
                this.notify.warn('Se ha marcado para eliminar la recomendación seleccionada');
            } else {
                this.socialConflict.acceptedSugerences.splice(index, 1);
                this.formatAcceptedPagination(this.skipAcceptedCount, this.maxAcceptedResultCount);
            }
        } else {
            if (sugerence.id) {
                sugerence.remove = true;
                this.notify.warn('Se ha marcado para eliminar la recomendación seleccionada');
            } else {
                this.socialConflict.pendingSugerences.splice(index, 1);
                this.formatPendingPagination(this.skipPendingCount, this.maxPendingResultCount);
            }
        }
    }

    cancelRemove(sugerence: SocialConflictSugerenceDto) {
        sugerence.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar para la recomendación seleccionada');
    }


    addOrUpdateItem(event: { value: SocialConflictSugerenceDto, index: number, type: SugerenceType }) {
        if (event.type == SugerenceType.Accepted) {
            event.value.accepted = true;
            if (event.index || event.index == 0) {
                this.socialConflict.acceptedSugerences[event.index] = event.value;
            } else {
                this.socialConflict.acceptedSugerences.push(event.value);
            }
            this.formatAcceptedPagination(this.skipAcceptedCount, this.maxAcceptedResultCount);
        } else {
            event.value.accepted = false;
            if (event.index || event.index == 0) {
                this.socialConflict.pendingSugerences[event.index] = event.value;
            } else {
                this.socialConflict.pendingSugerences.push(event.value);
            }
            this.formatPendingPagination(this.skipPendingCount, this.maxPendingResultCount);
        }
    }

    private formatAcceptedPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;
        for (let item of this.socialConflict.acceptedSugerences) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }

    private formatPendingPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;
        for (let item of this.socialConflict.pendingSugerences) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}