import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ProjectRiskDto, ProjectRiskHistoryDto, ProjectRiskServiceProxy, ProjectRiskStaticVariableOptionDetailDto } from '@shared/service-proxies/application/project-risk-proxie';
import { StaticVariableType } from '@shared/service-proxies/application/prospective-risk-proxie';
import { StaticVariableSiteType } from '@shared/service-proxies/application/static-variable-proxie';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'history-detail-project-risk',
    templateUrl: 'history-detail.component.html',
    styleUrls: [
        'history-detail.component.css'
    ]
})

export class ProjectRiskHistoryDetailComponent extends AppComponentBase {
    private _history: ProjectRiskHistoryDto;

    @Input() projectRisk: ProjectRiskDto;
    @Input() get history(): ProjectRiskHistoryDto {
        return this._history;
    }

    set history(value: ProjectRiskHistoryDto) {
        this._history = value;
        if (value && value?.id) {
            this.loaded = false;
            this.load();
        }
    }

    @Output() loadError: EventEmitter<void> = new EventEmitter<void>();

    loaded: boolean = false;
    historyDetail: ProjectRiskHistoryDto = new ProjectRiskHistoryDto();

    sites = {
        none: StaticVariableSiteType.None,
        impact: StaticVariableSiteType.Impact,
        probability: StaticVariableSiteType.Probability
    }

    optionTypes = {
        cuantitative: StaticVariableType.Cuantitative,
        cualitative: StaticVariableType.Cualitative
    }

    constructor(_injector: Injector, private _projectRiskServiceProxy: ProjectRiskServiceProxy) {
        super(_injector);
    }

    load() {
        this.showMainSpinner('Cargando información, por favor espere');
        this._projectRiskServiceProxy
            .getHistory(this.history.id)
            .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1000)))
            .subscribe(response => {
                this.loaded = true;
                this.historyDetail = response;
                this.formatDetails(this.historyDetail);
            }, () => this.loadError.emit());
    }

    private formatDetails(history: ProjectRiskHistoryDto) {
        for (let detail of history.stage.details) {
            for (let option of detail.staticVariable.options) {
                option.relationId =  this.formatOptionDetailId(option.details, option.value);
            }
        }
    }

    private formatOptionDetailId(details: ProjectRiskStaticVariableOptionDetailDto[], value: number): number {
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