import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CrisisCommitteeDto, CrisisCommitteeAgreementLocationDto } from '@shared/service-proxies/application/crisis-committee-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'agreement-information-crisis-committee',
    templateUrl: 'agreement-information.component.html',
    styleUrls: [
        'agreement-information.component.css'
    ]
})
export class AgreementInformationCrisisCommitteeComponent extends AppComponentBase implements OnInit {

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

    @Output() addAgreement: EventEmitter<void> = new EventEmitter<void>();
    @Output() editAgreement: EventEmitter<{ index: number, value: CrisisCommitteeAgreementLocationDto }> = new EventEmitter<{ index: number, value: CrisisCommitteeAgreementLocationDto }>();

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

    removeItem(agreement: CrisisCommitteeAgreementLocationDto, index: number) {
        if (agreement.id) {
            agreement.remove = true;
            this.notify.warn('Se ha marcado para eliminar el acuerdo seleccionado');
        } else {
            this.crisisCommittee.agreements.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(risk: CrisisCommitteeAgreementLocationDto) {
        risk.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar del acuerdo seleccionado');
    }

    addEvent() {
        this.addAgreement.emit();
    }

    editEvent(value: CrisisCommitteeAgreementLocationDto, index: number) {
        this.editAgreement.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: CrisisCommitteeAgreementLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.crisisCommittee.agreements[event.index] = event.value;
        } else {
            this.crisisCommittee.agreements.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.crisisCommittee.agreements) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}