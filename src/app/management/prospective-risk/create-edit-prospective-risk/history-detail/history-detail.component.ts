import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ProspectiveRiskDto, ProspectiveRiskHistoryDto, ProspectiveRiskServiceProxy, ProspectiveRiskStaticVariableOptionDetailDto } from '@shared/service-proxies/application/prospective-risk-proxie';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'history-detail-prospective-risk',
    templateUrl: 'history-detail.component.html',
    styleUrls: [
        'history-detail.component.css'
    ]
})
export class ProspectiveRiskHistoryDetailComponent extends AppComponentBase {

    private _history: ProspectiveRiskHistoryDto;

    @Input() prospectiveRisk: ProspectiveRiskDto;
    @Input() get history(): ProspectiveRiskHistoryDto {
        return this._history;
    }

    set history(value: ProspectiveRiskHistoryDto) {
        this._history = value;
        if (value && value?.id) {
            this.load();
        }
    }

    @Output() loadError: EventEmitter<void> = new EventEmitter<void>();

    historyDetail: ProspectiveRiskHistoryDto = new ProspectiveRiskHistoryDto();

    constructor(_injector: Injector, private _prospectiveRiskServiceProxy: ProspectiveRiskServiceProxy) {
        super(_injector);
    }

    load() {
        this.showMainSpinner('Cargando información, por favor espere');
        this._prospectiveRiskServiceProxy
            .getHistory(this.history.id)
            .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1000)))
            .subscribe(response => {
                this.historyDetail = response;
                this.formatDetails(this.historyDetail);
            }, () => this.loadError.emit());
    }

    private formatDetails(item: ProspectiveRiskHistoryDto) {
        for (let variable of item.variables) {
            for (let option of variable.options) {
                option.relationId = this.formatOptionDetailId(option.details, option.value);
            }
        }
    }

    private formatOptionDetailId(details: ProspectiveRiskStaticVariableOptionDetailDto[], value: number): number {
        const length: number = details.length;
        const max = details.reduce((prev, current) => (prev.value > current.value) ? prev : current);
        const min = details.reduce((prev, current) => (prev.value < current.value) ? prev : current);

        for (let i: number = 0; i < length; i++) {
            const initialValue: number = typeof details[i - 1] === 'undefined' ? details[i].value : details[i - 1].value;
            const endValue: number = details[i].value;

            if (value > initialValue && value <= endValue)
                return details[i].id;
        }

        if (value >= max.value)
            return max.id;

        return min.value == 0 ? min.id : undefined;
    }

}