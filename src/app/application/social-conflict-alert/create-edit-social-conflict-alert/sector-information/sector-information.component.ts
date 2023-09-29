import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictAlertDto, SocialConflictAlertSectorLocationDto } from '@shared/service-proxies/application/social-conflict-alert-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'sector-information-social-conflict-alert',
    templateUrl: 'sector-information.component.html',
    styleUrls: [
        'sector-information.component.css'
    ]
})
export class SectorInformationSocialConflictAlertComponent extends AppComponentBase implements OnInit {

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
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    get socialConflictAlert(): SocialConflictAlertDto {
        return this._socialConflictAlert;
    }

    @Output() addSector: EventEmitter<void> = new EventEmitter<void>();
    @Output() editSector: EventEmitter<{ index: number, value: SocialConflictAlertSectorLocationDto }> = new EventEmitter<{ index: number, value: SocialConflictAlertSectorLocationDto }>();

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

    removeItem(sector: SocialConflictAlertSectorLocationDto, index: number) {
        if (sector.id) {
            sector.remove = true;
            this.notify.warn('Se ha marcado para eliminar el sector de atención seleccionado');
        } else {
            this.socialConflictAlert.sectors.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(sector: SocialConflictAlertSectorLocationDto) {
        sector.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar para el sector de atención seleccionado');
    }

    editEvent(value: SocialConflictAlertSectorLocationDto, index: number) {
        this.editSector.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: SocialConflictAlertSectorLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.socialConflictAlert.sectors[event.index] = event.value;
        } else {
            this.socialConflictAlert.sectors.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        this.socialConflictAlert.sectors = this.socialConflictAlert.sectors.sort((a, b) => b.sectorTime.toDate().getTime() - a.sectorTime.toDate().getTime());

        for (let item of this.socialConflictAlert.sectors) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}