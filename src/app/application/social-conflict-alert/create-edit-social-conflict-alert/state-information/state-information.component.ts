import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictAlertDto, SocialConflictAlertStateLocationDto } from '@shared/service-proxies/application/social-conflict-alert-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'state-information-social-conflict-alert',
    templateUrl: 'state-information.component.html',
    styleUrls: [
        'state-information.component.css'
    ]
})
export class StateInformationSocialConflictAlertComponent extends AppComponentBase implements OnInit {

    private _socialConflictAlert: SocialConflictAlertDto;
    private _busy: boolean;

    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Input() set busy(value: boolean) {
        this._busy = value;
    }

    get busy(): boolean {
        return this._busy;
    }

    @Input() set socialConflictAlert(value: SocialConflictAlertDto) {
        this._socialConflictAlert = value;
    }

    get socialConflictAlert(): SocialConflictAlertDto {
        return this._socialConflictAlert;
    }

    @Output() addState: EventEmitter<void> = new EventEmitter<void>();
    @Output() editState: EventEmitter<{ index: number, value: SocialConflictAlertStateLocationDto }> = new EventEmitter<{ index: number, value: SocialConflictAlertStateLocationDto }>();

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

    removeItem(state: SocialConflictAlertStateLocationDto, index: number) {
        if (state.id) {
            state.remove = true;
            this.notify.warn('Se ha marcado para eliminar la actualización de alerta seleccionada');
        } else {
            this.socialConflictAlert.states.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(state: SocialConflictAlertStateLocationDto) {
        state.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar de la actualización de alerta seleccionada');
    }

    editEvent(value: SocialConflictAlertStateLocationDto, index: number) {
        this.editState.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: SocialConflictAlertStateLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.socialConflictAlert.states[event.index] = event.value;
        } else {
            this.socialConflictAlert.states.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        this.socialConflictAlert.states = this.socialConflictAlert.states.sort((a, b) => b.stateTime.toDate().getTime() - a.stateTime.toDate().getTime());

        for (let item of this.socialConflictAlert.states) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}