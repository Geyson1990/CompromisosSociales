import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CrisisCommitteeDto, CrisisCommitteeSectorLocationDto } from '@shared/service-proxies/application/crisis-committee-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'sector-information-crisis-committee',
    templateUrl: 'sector-information.component.html',
    styleUrls: [
        'sector-information.component.css'
    ]
})
export class SectorInformationCrisisCommitteeComponent extends AppComponentBase implements OnInit {

    private _busy: boolean;
    private _crisisCommittee: CrisisCommitteeDto;

    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Input() get busy(): boolean {
        return this._busy;
    }

    set busy(value: boolean) {
        this._busy = value;
    }

    @Input() get crisisCommittee(): CrisisCommitteeDto {
        return this._crisisCommittee;
    }

    set crisisCommittee(value: CrisisCommitteeDto) {
        this._crisisCommittee = value;
    }

    @Output() addSector: EventEmitter<void> = new EventEmitter<void>();
    @Output() editSector: EventEmitter<{ index: number, value: CrisisCommitteeSectorLocationDto }> = new EventEmitter<{ index: number, value: CrisisCommitteeSectorLocationDto }>();

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

    removeItem(sector: CrisisCommitteeSectorLocationDto, index: number) {
        if (sector.id) {
            sector.remove = true;
            this.notify.warn('Se ha marcado para eliminar el sector identificado seleccionado');
        } else {
            this.crisisCommittee.sectors.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(risk: CrisisCommitteeSectorLocationDto) {
        risk.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar del sector identificado seleccionado');
    }

    addEvent() {
        this.addSector.emit();
    }

    editEvent(value: CrisisCommitteeSectorLocationDto, index: number) {
        this.editSector.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: CrisisCommitteeSectorLocationDto, index: number }) {
        const index: number = this.crisisCommittee.sectors.findIndex(p => p.directoryGovernment && p.directoryGovernment.id == event.value.directoryGovernment.id);

        if (index != -1) {
            this.message.error(`El sector identificado ${event.value.directoryGovernment.name} ya esta agregado`, 'Aviso');
            return;
        }

        if (event.index || event.index == 0) {
            this.crisisCommittee.sectors[event.index] = event.value;
        } else {
            this.crisisCommittee.sectors.push(event.value);
        }
        
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.crisisCommittee.sectors) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}