import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictSensibleDto, SocialConflictSensibleStateLocationDto } from '@shared/service-proxies/application/social-conflict-sensible-proxie';
import { LazyLoadEvent, Paginator, SelectItem } from 'primeng';

@Component({
    selector: 'state-information-social-conflict-sensible',
    templateUrl: 'state-information.component.html',
    styleUrls: [
        'state-information.component.css'
    ]
})
export class StateInformationSocialConflictSensibleComponent extends AppComponentBase implements OnInit {

    private _busy: boolean;
    private _socialConflictSensible: SocialConflictSensibleDto;
    private _verificationEnabled: boolean = false;

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

    @Output() addState: EventEmitter<void> = new EventEmitter<void>();
    @Output() editState: EventEmitter<{ value: SocialConflictSensibleStateLocationDto, index: number }> = new EventEmitter<{ value: SocialConflictSensibleStateLocationDto, index: number }>();

    options: SelectItem[] = [
        { label: 'Aprobado', value: 'true', styleClass: 'state-aproved' },
        { label: 'No aprobado', value: 'false', styleClass: 'state-not-aproved' }
    ];

    get verificationEnabled() {
        return this._verificationEnabled;
    }

    private skipCount: number;
    private maxResultCount: number;

    constructor(_injector: Injector) {
        super(_injector);
        this.primengTableHelper.defaultRecordsCountPerPage = 5;
        this.skipCount = 0;
        this.maxResultCount = this.primengTableHelper.defaultRecordsCountPerPage;
        this._verificationEnabled = this.permission.isGranted('Pages.Application.SocialConflictSensible.Verification');
    }

    ngOnInit() {
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    getData(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    editEvent(state: SocialConflictSensibleStateLocationDto, index: number) {
        this.editState.emit({ index: index, value: state });;
    }

    change(rowIndex: number) {
        this.socialConflictSensible.states[rowIndex].verificationChange = true;
    }

    removeItem(state: SocialConflictSensibleStateLocationDto, index: number) {
        if (state.id) {
            state.remove = true;
            this.notify.warn('Se ha marcado para eliminar la situación actual seleccionada');
        } else {
            this.socialConflictSensible.states.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(state: SocialConflictSensibleStateLocationDto) {
        state.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar la situación actual seleccionada');
    }

    addOrUpdateItem(event: { value: SocialConflictSensibleStateLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.socialConflictSensible.states[event.index] = event.value;
        } else {
            this.socialConflictSensible.states.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        this.socialConflictSensible.states = this.socialConflictSensible.states.sort((a, b) => b.stateTime.toDate().getTime() - a.stateTime.toDate().getTime());

        for (let item of this.socialConflictSensible.states) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}