import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictSensibleDto, SocialConflictSensibleSugerenceDto, SocialConflictSensibleUserDto, SugerenceType } from '@shared/service-proxies/application/social-conflict-sensible-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'sugerence-information-social-conflict-sensible',
    templateUrl: 'sugerence-information.component.html',
    styleUrls: [
        'sugerence-information.component.css'
    ]
})
export class SugerenceInformationSocialConflictSensibleComponent extends AppComponentBase implements OnInit {

    private _busy: boolean;
    private _socialConflictSensible: SocialConflictSensibleDto;

    @ViewChild('acceptedPaginator', { static: false }) acceptedPaginator: Paginator;
    @ViewChild('pendingPaginator', { static: false }) pendingPaginator: Paginator;

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
        this.formatPendingPagination(this.skipPendingCount, this.maxPendingResultCount);
        this.formatAcceptedPagination(this.skipAcceptedCount, this.maxAcceptedResultCount);
    }

    @Output() addSugerence: EventEmitter<{ type: SugerenceType }> = new EventEmitter<{ type: SugerenceType }>();
    @Output() editSugerence: EventEmitter<{ index: number, type: SugerenceType, value: SocialConflictSensibleSugerenceDto }> = new EventEmitter<{ index: number, type: SugerenceType, value: SocialConflictSensibleSugerenceDto }>();

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

    editSugerences(sugerence: SocialConflictSensibleSugerenceDto, index: number, type: SugerenceType) {
        this.editSugerence.emit({ value: sugerence, index: index, type: type });
    }

    acceptSugerences(sugerence: SocialConflictSensibleSugerenceDto, index: number, type: SugerenceType) {
        const numberInformation: string = (index < 10 ? '0' : '') + (index + 1);
        this.message.confirm(`El proceso aceptará la recomendación seleccionada Nº ${numberInformation}`, '¿Estas seguro?', confirmation => {
            if (confirmation) {
                this.socialConflictSensible.pendingSugerences[index].accepted = true;
                this.socialConflictSensible.pendingSugerences[index].acceptedUser = new SocialConflictSensibleUserDto({
                    id: this.appSession.user.id,
                    name: this.appSession.user.name,
                    surname: this.appSession.user.surname
                });
                this.socialConflictSensible.acceptedSugerences.push(this.socialConflictSensible.pendingSugerences[index]);
                this.socialConflictSensible.pendingSugerences.splice(index, 1);
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

    removeItem(sugerence: SocialConflictSensibleSugerenceDto, index: number, type: SugerenceType) {
        if (type == SugerenceType.Accepted) {
            if (sugerence.id) {
                sugerence.remove = true;
                this.notify.warn('Se ha marcado para eliminar la recomendación seleccionada');
            } else {
                this.socialConflictSensible.acceptedSugerences.splice(index, 1);
                this.formatAcceptedPagination(this.skipAcceptedCount, this.maxAcceptedResultCount);
            }
        } else {
            if (sugerence.id) {
                sugerence.remove = true;
                this.notify.warn('Se ha marcado para eliminar la recomendación seleccionada');
            } else {
                this.socialConflictSensible.pendingSugerences.splice(index, 1);
                this.formatPendingPagination(this.skipPendingCount, this.maxPendingResultCount);
            }
        }
    }

    cancelRemove(sugerence: SocialConflictSensibleSugerenceDto) {
        sugerence.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar para la recomendación seleccionada');
    }


    addOrUpdateItem(event: { value: SocialConflictSensibleSugerenceDto, index: number, type: SugerenceType }) {
        if (event.type == SugerenceType.Accepted) {
            event.value.accepted = true;
            if (event.index || event.index == 0) {
                this.socialConflictSensible.acceptedSugerences[event.index] = event.value;
            } else {
                this.socialConflictSensible.acceptedSugerences.push(event.value);
            }
            this.formatAcceptedPagination(this.skipAcceptedCount, this.maxAcceptedResultCount);
        } else {
            event.value.accepted = false;
            if (event.index || event.index == 0) {
                this.socialConflictSensible.pendingSugerences[event.index] = event.value;
            } else {
                this.socialConflictSensible.pendingSugerences.push(event.value);
            }
            this.formatPendingPagination(this.skipPendingCount, this.maxPendingResultCount);
        }
    }

    private formatAcceptedPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;
        for (let item of this.socialConflictSensible.acceptedSugerences) {
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
        for (let item of this.socialConflictSensible.pendingSugerences) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}