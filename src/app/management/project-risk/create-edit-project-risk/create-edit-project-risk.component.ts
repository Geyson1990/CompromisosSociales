import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ProjectRiskDepartmentDto, ProjectRiskDto, ProjectRiskHistoryDto, ProjectRiskProvinceDto, ProjectRiskServiceProxy, ProjectRiskStageDto, ProjectRiskStaticVariableOptionDetailDto } from '@shared/service-proxies/application/project-risk-proxie';
import { StaticVariableSiteType } from '@shared/service-proxies/application/static-variable-proxie';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'create-edit-project-risk.component.html',
    styleUrls: [
        'create-edit-project-risk.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class CreateEditProjectRiskComponent extends AppComponentBase implements OnInit {

    id: number;
    loaded: boolean;
    busy: boolean;
    tabIndex: number;

    item: ProjectRiskDto = new ProjectRiskDto();
    departments: ProjectRiskDepartmentDto[];
    provinces: ProjectRiskProvinceDto[];
    stages: ProjectRiskStageDto[];

    history: ProjectRiskHistoryDto;
    hasHistory: boolean = false;

    constructor(_injector: Injector, private route: ActivatedRoute, private _projectRiskServiceProxy: ProjectRiskServiceProxy) {
        super(_injector);
    }

    ngOnInit() {
        const parameter = this.route.snapshot.paramMap.get('id');
        this.id = parameter ? +parameter.replace('[^0-9]', '') : undefined;

        if (this.id && !this.isGranted('Pages.Management.ProjectRisk.Edit')) {
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción');
            this.backButtonPressed();
            return;
        }

        if (!this.id && !this.isGranted('Pages.Management.ProjectRisk.Create')) {
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción');
            this.backButtonPressed();
            return;
        }

        this.item.stageId = -1;
        this.item.provinceId = -1;
        this.item.departmentId = -1;
        this.item.fixImpactRate = 1;
        this.item.fixProbabilityRate = 1;

        this._projectRiskServiceProxy.get(this.id).subscribe((response) => {
            this.departments = response.departments;
            this.stages = response.stages;

            if (response.projectRisk) {
                this.item = response.projectRisk;
                this.item.dinamicValues = response.dinamicValues;

                const departmentIndex: number = this.departments.findIndex(p => p.id == response.projectRisk.departmentId);
                if (departmentIndex != -1) {
                    const provinceIndex: number = this.departments[departmentIndex].provinces.findIndex(p => p.id == response.projectRisk.provinceId);
                    if (provinceIndex != -1) {
                        this.provinces = this.departments[departmentIndex].provinces;
                        this.item.province = this.departments[departmentIndex].provinces[provinceIndex];
                        this.item.provinceId = this.departments[departmentIndex].provinces[provinceIndex].id;
                        this.item.department = this.departments[departmentIndex];
                        this.item.departmentId = this.departments[departmentIndex].id;
                        this.item.territorialUnitText = this.departments[departmentIndex].territorialUnitText ?? 'NINGUNO';
                    }
                }
                const stageIndex: number = this.stages.findIndex(p => p.id == response.projectRisk.stageId);
                if (stageIndex != -1) {
                    this.item.stage = this.stages[stageIndex];
                    this.formatDetails(this.item, this.item.stage);
                    this.formatRisk(this.item);
                }
                this.loaded = true;
            } else {
                this.loaded = true;
            }
        }, () => this.backButtonPressed());

    }

    showHistory(history: ProjectRiskHistoryDto) {
        this.history = history;
        this.hasHistory = true;
        this.tabIndex = 3;
    }

    historyLoadError() {
        this.history = undefined;
        this.hasHistory = false;
        this.tabIndex = 2;
    }

    save() {
        if (this.isNullEmptyOrWhiteSpace(this.item.code)) {
            this.message.info('Por favor ingrese el código del proyecto antes de continuar', 'Aviso');
            return;
        }
        if (this.isNullEmptyOrWhiteSpace(this.item.name)) {
            this.message.info('Por favor ingrese el nombre del proyecto antes de continuar', 'Aviso');
            return;
        }
        if (!this.item.evaluatedTime) {
            this.message.info('Por favor ingrese la fecha de análisis del proyecto antes de continuar', 'Aviso');
            return;
        }
        if (this.item.provinceId == -1) {
            this.message.info('Por favor ingrese la provincia del proyecto antes de continuar', 'Aviso');
            return;
        }
        if (this.item.stageId == -1) {
            this.message.info('Por favor ingrese la fase del proyecto antes de continuar', 'Aviso');
            return;
        }
        if (this.busy)
            return;
        this.busy = true;
        this.showMainSpinner('Guardando información, por favor espere...');
        this._projectRiskServiceProxy.createOrUpdate(this.item).pipe(finalize(() => setTimeout(() => {
            this.busy = false;
            this.hideMainSpinner()
        }, 1000))).subscribe((response) => {
            this.notify.success('Actualizado satisfactoriamente');
            if (this.id) {
                this.ngOnInit();
            } else {
                this.router.navigate(['/app/management/project-risk/edit', `${response.id}`]);
            }
        });
    }

    formatInformation(item: ProjectRiskDto, details?: boolean) {
        if (details)
            this.formatDetails(item, item.stage);

        this.formatRisk(item);
    }

    backButtonPressed() {
        this.router.navigate(['/app/management/project-risk']);
    }

    private formatDetails(item: ProjectRiskDto, stage: ProjectRiskStageDto) {
        if (!item.details)
            item.details = [];
        if (!item.dinamicValues)
            item.dinamicValues = [];

        for (let detail of stage.details) {
            for (let option of detail.staticVariable.options) {

                let detailValue: { id: number, value: number } = undefined;

                if (option.dinamicVariable) {
                    const index: number = item.dinamicValues.findIndex(p => p.dinamicVariableId == option.dinamicVariable.id);
                    if (index != -1) {
                        const value: number = item.dinamicValues[index].value;
                        detailValue = this.formatOptionDetailId(option.details, value);
                    } else {
                        detailValue = this.formatOptionDetailId(option.details, 0);
                    }
                } else {
                    const index: number = item.details.findIndex(p => p.projectStageDetailId == detail.id && p.staticVariableOptionId == option.id);
                    if (index != -1) {
                        const value: number = item.details[index].value;
                        detailValue = this.formatOptionDetailId(option.details, value);
                    } else {
                        detailValue = this.formatOptionDetailId(option.details, 0);
                    }
                }

                option.relationId = detailValue?.id;
                option.relationValue = detailValue?.value;
            }
        }
    }

    private formatOptionDetailId(details: ProjectRiskStaticVariableOptionDetailDto[], value: number): { id: number, value: number } {
        const length: number = details.length;
        const max = details.reduce((prev, current) => (prev.value > current.value) ? prev : current);
        const min = details.reduce((prev, current) => (prev.value < current.value) ? prev : current);

        for (let i: number = 0; i < length; i++) {
            const initialValue: number = typeof details[i - 1] === 'undefined' ? details[i].value : details[i - 1].value;
            const endValue: number = details[i].value;

            if (value > initialValue && value <= endValue)
                return { id: details[i].id, value: value };
        }

        if (value >= max.value)
            return { id: max.id, value: value };
        if (value <= min.value)
            return { id: min.id, value: value };
        return min.value == 0 ? { id: min.id, value: value } : undefined;
    }

    private formatRisk(item: ProjectRiskDto) {
        if (!item.details)
            item.details = [];
        if (!item.dinamicValues)
            item.dinamicValues = [];
        if (!this.item.stage || !this.item.province) {
            this.item.probability = 0;
            this.item.impact = 0;
            this.item.value = 0;
            return;
        }

        let impactWeight: number = 0;
        let impact: number = 0;
        let probabilityWeight: number = 0;
        let probability: number = 0;
        let risk: number = 0;

        for (let detail of item.stage.details) {
            for (let option of detail.staticVariable.options) {
                if (option.site == StaticVariableSiteType.Impact) {
                    impactWeight += option.value;
                    impact += (option.value * option.relationValue);
                }
                if (option.site == StaticVariableSiteType.Probability) {
                    probabilityWeight += option.value;
                    probability += (option.value * option.relationValue);
                }
            }
        }

        impact = this.roundNumber((impactWeight > 0 ? (impact / impactWeight) * item.fixImpactRate : 0), 2);
        probability = this.roundNumber((probabilityWeight > 0 ? (probability / probabilityWeight) * item.fixProbabilityRate : 0), 2);
        risk = this.roundNumber(impact * probability, 2);

        this.item.impact = impact;
        this.item.probability = probability;
        this.item.value = risk;
    }
}