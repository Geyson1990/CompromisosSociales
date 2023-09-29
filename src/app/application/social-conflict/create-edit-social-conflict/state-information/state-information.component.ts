import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictDto, SocialConflictStateLocationDto } from '@shared/service-proxies/application/social-conflict-proxie';
import { LazyLoadEvent, Paginator, SelectItem } from 'primeng';

@Component({
    selector: 'state-information-social-conflict',
    templateUrl: 'state-information.component.html',
    styleUrls: [
        'state-information.component.css'
    ]
})
export class StateInformationSocialConflictComponent extends AppComponentBase implements OnInit {

    private _busy: boolean;
    private _socialConflict: SocialConflictDto;
    private _verificationEnabled: boolean = false;
    
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

    @Output() addState: EventEmitter<void> = new EventEmitter<void>();
    @Output() editState: EventEmitter<{ value: SocialConflictStateLocationDto, index: number }> = new EventEmitter<{ value: SocialConflictStateLocationDto, index: number }>();

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
        this._verificationEnabled = this.permission.isGranted('Pages.Application.SocialConflict.Verification');
    }

    ngOnInit() {
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    getData(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    editEvent(state: SocialConflictStateLocationDto, index: number) {
        this.editState.emit({ index: index, value: state });;
    }

    change(rowIndex: number) {
        this.socialConflict.states[rowIndex].verificationChange = true;
    }

    removeItem(state: SocialConflictStateLocationDto, index: number) {
        if (state.id) {
            state.remove = true;
            this.notify.warn('Se ha marcado para eliminar la situación actual seleccionada');
        } else {
            this.socialConflict.states.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(state: SocialConflictStateLocationDto) {
        state.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar la situación actual seleccionada');
    }

    addOrUpdateItem(event: { value: SocialConflictStateLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.socialConflict.states[event.index] = event.value;
        } else {
            this.socialConflict.states.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        this.socialConflict.states = this.socialConflict.states.sort((a, b) => b.stateTime.toDate().getTime() - a.stateTime.toDate().getTime());

        for (let item of this.socialConflict.states) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}