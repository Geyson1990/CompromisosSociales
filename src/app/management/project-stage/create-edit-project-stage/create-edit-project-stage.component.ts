import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FindStaticVariableModalComponent } from '@shared/component/find-static-variable/find-static-variablecomponent';
import { ProjectStageDetailDto, ProjectStageDto, ProjectStageStaticVariableDto, ProjectStageServiceProxy } from '@shared/service-proxies/application/project-stage-proxie';
import { StaticVariableFamilyType, StaticVariableOptionType, StaticVariableSiteType } from '@shared/service-proxies/application/static-variable-proxie';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'create-edit-project-stage.component.html',
    styleUrls: [
        'create-edit-project-stage.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})

export class CreateEditProjectStageComponent extends AppComponentBase implements OnInit {

    @ViewChild('findStaticVariableModal', { static: true }) findStaticVariableModal: FindStaticVariableModalComponent;

    id: number;
    loaded: boolean;
    editing: boolean;
    busy: boolean;

    item: ProjectStageDto = new ProjectStageDto();
    details: ProjectStageDetailDto[] = [];

    deletedDetails: ProjectStageDetailDto[] = [];

    types = {
        none: StaticVariableOptionType.None,
        cualitative: StaticVariableOptionType.Cualitative,
        cuantitative: StaticVariableOptionType.Cuantitative
    }

    families = {
        none: StaticVariableFamilyType.None,
        prospectiveRisk: StaticVariableFamilyType.ProspectiveRisk,
        projectRisk: StaticVariableFamilyType.ProjectRisk
    }

    sites = {
        none: StaticVariableSiteType.None,
        impact: StaticVariableSiteType.Impact,
        probability: StaticVariableSiteType.Probability
    }

    constructor(_injector: Injector, private route: ActivatedRoute, private _projectStageServiceProxy: ProjectStageServiceProxy) {
        super(_injector);
    }

    ngOnInit() {
        const parameter = this.route.snapshot.paramMap.get('id');
        this.id = parameter ? +parameter.replace('[^0-9]', '') : undefined;

        if (this.id && !this.isGranted('Pages.Management.StaticVariable.Edit')) {
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción');
            this.backButtonPressed();
            return;
        }

        if (!this.id && !this.isGranted('Pages.Management.StaticVariable.Create')) {
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción');
            this.backButtonPressed();
            return;
        }

        if (this.id) {
            this._projectStageServiceProxy.get(this.id).subscribe((response) => {
                this.item = response;
                this.details = response.details;
                this.loaded = true;
            }, () => this.backButtonPressed());
        } else {
            this.item.details = [];
            this.loaded = true;
        }
    }

    addStaticVariable(staticVariable: ProjectStageStaticVariableDto) {
        const index: number = this.details.findIndex(p => p.staticVariable.id == staticVariable.id);

        if (index == -1) {
            this.details.push(new ProjectStageDetailDto({
                id: undefined,
                staticVariable: staticVariable
            }));
        }
    }

    deleteStaticVariable(projectStageDetail: ProjectStageDetailDto, index: number) {
        this.message.confirm(`¿Esta seguro de eliminar la variable estática ${projectStageDetail.staticVariable.name}?`, 'Aviso', confirmation => {
            if (confirmation) {
                if (projectStageDetail.id)
                    this.deletedDetails.push(projectStageDetail);
                this.details.splice(index, 1);
            }
        });
    }

    showStaticVariableModal() {
        this.findStaticVariableModal.show();
    }

    save() {
        if (this.isNullEmptyOrWhiteSpace(this.item.name)) {
            this.message.info('Debe ingresar el nombre de la etapa del proyecto antes de continuar', 'Aviso');
            return;
        }
        if (this.details.length == 0) {
            this.message.info('Por favor asocie al menos una variable a esta estapa del proyecto', 'Aviso');
            return;
        }

        if (this.busy)
            return;

        this.busy = true;
        this.item.details = undefined;
        this.item.deletedDetails = undefined;

        if (this.id) {
            this.item.details = this.details.filter(p => p.id == undefined);
            this.item.deletedDetails = this.deletedDetails;
            this._projectStageServiceProxy.update(this.item).pipe(finalize(() => this.busy = false)).subscribe(() => {
                this.notify.success('Actualizado satisfactoriamente');
                this.deletedDetails = [];
                this.ngOnInit();
            });
        } else {
            this.item.details = this.details;
            this._projectStageServiceProxy.create(this.item).pipe(finalize(() => this.busy = false)).subscribe(() => {
                this.notify.success('Creado satisfactoriamente');
                this.backButtonPressed();
            });
        }
    }

    backButtonPressed() {
        this.router.navigate(['/app/management/project-stage']);
    }

}