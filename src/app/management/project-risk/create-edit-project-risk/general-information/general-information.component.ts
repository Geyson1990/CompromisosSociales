import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ProjectRiskDepartmentDto, ProjectRiskDto, ProjectRiskProvinceDto, ProjectRiskServiceProxy, ProjectRiskStageDto, ProjectRiskStaticVariableOptionDetailDto } from '@shared/service-proxies/application/project-risk-proxie';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'general-information-project-risk',
    templateUrl: 'general-information.component.html',
    styleUrls: [
        'general-information.component.css'
    ]
})
export class GeneralInformationProjectRiskComponent extends AppComponentBase {

    private _projectRisk: ProjectRiskDto;
    private _busy: boolean;
    private _provinces: ProjectRiskProvinceDto[];

    @Input() get busy(): boolean {
        return this._busy;
    }

    @Input() get projectRisk(): ProjectRiskDto {
        return this._projectRisk;
    }

    @Input() get provinces(): ProjectRiskProvinceDto[] {
        return this._provinces;
    }

    set busy(value: boolean) {
        this._busy = value;
        this.busyChange.emit(value);
    }

    set projectRisk(value: ProjectRiskDto) {
        this._projectRisk = value;
        this.projectRiskChange.emit(value);
    }

    set provinces(value: ProjectRiskProvinceDto[]) {
        this._provinces = value;
        this.provincesChange.emit(value);
    }

    @Input() departments: ProjectRiskDepartmentDto[];
    @Input() stages: ProjectRiskStageDto[];

    @Output() busyChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() projectRiskChange: EventEmitter<ProjectRiskDto> = new EventEmitter<ProjectRiskDto>();
    @Output() provincesChange: EventEmitter<ProjectRiskProvinceDto[]> = new EventEmitter<ProjectRiskProvinceDto[]>();
    @Output() optionValueChange: EventEmitter<ProjectRiskDto> = new EventEmitter<ProjectRiskDto>();

    constructor(_injector: Injector, private _projectRiskServiceProxy: ProjectRiskServiceProxy) {
        super(_injector);
    }

    onDepartmentChange(event: any) {
        this.projectRisk.provinceId = -1;
        this.projectRisk.territorialUnitText = '';
        const id: number = +event.target.value;
        const index: number = this.departments.findIndex(p => p.id == id);

        if (index != -1) {
            this.projectRisk.department = this.departments[index];
            this.projectRisk.territorialUnitText = this.departments[index].territorialUnitText ?? 'NINGUNA';
            this.provinces = this.departments[index].provinces;
        }
    }

    onProvinceChange(event: any) {
        const id: number = +event.target.value;
        const index: number = this.departments.findIndex(p => p.id == id);

        if (index != -1) {
            this.showMainSpinner('Cargando valores de variables cuantitativas, por favor espere...');
            this._projectRiskServiceProxy.getAllDinamicValues(id).pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1000))).subscribe(response => {
                this.projectRisk.dinamicValues = response.items;
                if (this.projectRisk.stage) {
                    this.optionValueChange.emit(this.projectRisk);
                }
            }, () => {
                this.projectRisk.provinceId = -1;
            });
        }
    }

    onStageChange(event: any) {
        const id: number = +event.target.value;
        const index: number = this.stages.findIndex(p => p.id == id);

        if (index != -1) {
            this.projectRisk.stage = this.stages[index];
            this.optionValueChange.emit(this.projectRisk);
        }
    }

    onFixRateChange(event: any) {
        this.optionValueChange.emit(this.projectRisk);
    }
}