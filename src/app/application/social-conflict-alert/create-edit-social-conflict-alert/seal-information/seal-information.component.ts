import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictAlertDto, SocialConflictAlertSealLocationDto } from '@shared/service-proxies/application/social-conflict-alert-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'seal-information-social-conflict-alert',
    templateUrl: 'seal-information.component.html',
    styleUrls: [
        'seal-information.component.css'
    ]
})
export class SealInformationSocialConflictAlertComponent extends AppComponentBase implements OnInit {

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

    @Output() addSeal: EventEmitter<void> = new EventEmitter<void>();
    @Output() editSeal: EventEmitter<{ index: number, value: SocialConflictAlertSealLocationDto }> = new EventEmitter<{ index: number, value: SocialConflictAlertSealLocationDto }>();

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

    removeItem(seal: SocialConflictAlertSealLocationDto, index: number) {
        if (seal.id) {
            seal.remove = true;
            this.notify.warn('Se ha marcado para eliminar el cierre de alerta seleccionado');
        } else {
            this.socialConflictAlert.seals.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(seal: SocialConflictAlertSealLocationDto) {
        seal.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar para el cierre de alerta seleccionado');
    }

    editEvent(value: SocialConflictAlertSealLocationDto, index: number) {
        this.editSeal.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: SocialConflictAlertSealLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.socialConflictAlert.seals[event.index] = event.value;
        } else {
            this.socialConflictAlert.seals.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;
        
        this.socialConflictAlert.seals = this.socialConflictAlert.seals.sort((a, b) => b.sealTime.toDate().getTime() - a.sealTime.toDate().getTime());

        for (let item of this.socialConflictAlert.seals) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}