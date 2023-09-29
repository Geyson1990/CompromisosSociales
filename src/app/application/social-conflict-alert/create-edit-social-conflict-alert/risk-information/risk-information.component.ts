import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictAlertDto, SocialConflictAlertRiskLocationDto } from '@shared/service-proxies/application/social-conflict-alert-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'risk-information-social-conflict-alert',
    templateUrl: 'risk-information.component.html',
    styleUrls: [
        'risk-information.component.css'
    ]
})
export class RiskInformationSocialConflictAlertComponent extends AppComponentBase implements OnInit {

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

    @Output() addRisk: EventEmitter<void> = new EventEmitter<void>();
    @Output() editRisk: EventEmitter<{ index: number, value: SocialConflictAlertRiskLocationDto }> = new EventEmitter<{ index: number, value: SocialConflictAlertRiskLocationDto }>();

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

    removeItem(risk: SocialConflictAlertRiskLocationDto, index: number) {
        if (risk.id) {
            risk.remove = true;
            this.notify.warn('Se ha marcado para eliminar el nivel de riesgo seleccionado');
        } else {
            this.socialConflictAlert.risks.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(risk: SocialConflictAlertRiskLocationDto) {
        risk.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar para el nivel de riesgo seleccionado');
    }

    editEvent(value: SocialConflictAlertRiskLocationDto, index: number) {
        this.editRisk.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: SocialConflictAlertRiskLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.socialConflictAlert.risks[event.index] = event.value;
        } else {
            this.socialConflictAlert.risks.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        this.socialConflictAlert.risks = this.socialConflictAlert.risks.sort((a, b) => b.riskTime.toDate().getTime() - a.riskTime.toDate().getTime());
        this.socialConflictAlert.lastRisk = undefined;

        for (let item of this.socialConflictAlert.risks) {
            if (index == 0)
                this.socialConflictAlert.lastRisk = item;

            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}