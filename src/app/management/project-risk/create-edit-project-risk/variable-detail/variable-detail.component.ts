import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectRiskDepartmentDto, ProjectRiskDetailDto, ProjectRiskDto, ProjectRiskStageDetailDto, ProjectRiskStageDto, ProjectRiskStaticVariableDto, ProjectRiskStaticVariableOptionDto } from '@shared/service-proxies/application/project-risk-proxie';
import { StaticVariableType } from '@shared/service-proxies/application/prospective-risk-proxie';
import { StaticVariableSiteType } from '@shared/service-proxies/application/static-variable-proxie';

@Component({
    selector: 'variable-detail-project-risk',
    templateUrl: 'variable-detail.component.html',
    styleUrls: [
        'variable-detail.component.css'
    ]
})
export class VariableDetailProjectRiskComponent {

    private _projectRisk: ProjectRiskDto;
    private _busy: boolean;

    @Input() get busy(): boolean {
        return this._busy;
    }

    @Input() get projectRisk(): ProjectRiskDto {
        return this._projectRisk;
    }

    set busy(value: boolean) {
        this._busy = value;
        this.busyChange.emit(value);
    }

    set projectRisk(value: ProjectRiskDto) {
        this._projectRisk = value;
        this.projectRiskChange.emit(value);
    }

    @Input() departments: ProjectRiskDepartmentDto[];
    @Input() stages: ProjectRiskStageDto[];

    @Output() busyChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() projectRiskChange: EventEmitter<ProjectRiskDto> = new EventEmitter<ProjectRiskDto>();
    @Output() optionValueChange: EventEmitter<ProjectRiskDto> = new EventEmitter<ProjectRiskDto>();

    tabIndex: number = 0;

    optionTypes = {
        cuantitative: StaticVariableType.Cuantitative,
        cualitative: StaticVariableType.Cualitative
    }

    sites = {
        none: StaticVariableSiteType.None,
        impact: StaticVariableSiteType.Impact,
        probability: StaticVariableSiteType.Probability
    }

    constructor() { }


    optionChange(stageDetail: ProjectRiskStageDetailDto, option: ProjectRiskStaticVariableOptionDto, event: any) {
        const valueIndex: number = option.details.findIndex(p => p.id == event.target.value);

        if (valueIndex == -1)
            return;
        if (!this.projectRisk.details)
            this.projectRisk.details = [];

        option.relationValue = option.details[valueIndex].value;
        const index: number = this.projectRisk.details.findIndex(p => p.projectStageDetailId == stageDetail.id && p.staticVariableOptionId == option.id);

        if (index == -1) {
            this.projectRisk.details.push(new ProjectRiskDetailDto({
                id: undefined,
                projectStageDetailId: stageDetail.id,
                staticVariableOptionId: option.id,
                value: option.details[valueIndex].value
            }));
        } else {
            this.projectRisk.details[index].value = option.details[valueIndex].value;
        }

        this.optionValueChange.emit(this.projectRisk);
    }
}