import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { DinamicVariableType } from '@shared/service-proxies/application/dinamic-variable-proxie';
import { StaticVariableFamilyType } from '@shared/service-proxies/application/static-variable-proxie';
import { CreateEditDinamicVariableComponent } from './dinamic-variable/create-edit-dinamic-variable/create-edit-dinamic-variable.component';
import { DinamicVariableComponent } from './dinamic-variable/dinamic-variable.component';
import { CreateEditProjectRiskComponent } from './project-risk/create-edit-project-risk/create-edit-project-risk.component';
import { ProjectRiskComponent } from './project-risk/project-risk.component';
import { CreateEditProjectStageComponent } from './project-stage/create-edit-project-stage/create-edit-project-stage.component';
import { ProjectStageComponent } from './project-stage/project-stage.component';
import { CreateEditProspectiveRiskComponent } from './prospective-risk/create-edit-prospective-risk/create-edit-prospective-risk.component';
import { ProspectiveRiskComponent } from './prospective-risk/prospective-risk.component';
import { CreateEditStaticVariableComponent } from './static-variable/create-edit-static-variable/create-edit-static-variable.component';
import { StaticVariableComponent } from './static-variable/static-variable.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'prospective-risk', component: ProspectiveRiskComponent, data: { permission: 'Pages.Management.PropectiveRisk' } },
                    { path: 'prospective-risk/:provinceId', component: CreateEditProspectiveRiskComponent, data: { permission: 'Pages.Management.PropectiveRisk' } },

                    { path: 'prospective-risk-static-variable', component: StaticVariableComponent, data: { permission: 'Pages.Management.StaticVariable', type: StaticVariableFamilyType.ProspectiveRisk } },
                    { path: 'prospective-risk-static-variable/create', component: CreateEditStaticVariableComponent, data: { permission: 'Pages.Management.StaticVariable.Create', type: StaticVariableFamilyType.ProspectiveRisk } },
                    { path: 'prospective-risk-static-variable/edit/:id', component: CreateEditStaticVariableComponent, data: { permission: 'Pages.Application.StaticVariable.Edit', type: StaticVariableFamilyType.ProspectiveRisk } },

                    { path: 'prospective-risk-dinamic-variable', component: DinamicVariableComponent, data: { permission: 'Pages.Management.DinamicVariable', type: DinamicVariableType.ProspectiveRisk } },
                    { path: 'prospective-risk-dinamic-variable/create', component: CreateEditDinamicVariableComponent, data: { permission: 'Pages.Management.DinamicVariable.Create', type: DinamicVariableType.ProspectiveRisk } },
                    { path: 'prospective-risk-dinamic-variable/edit/:id', component: CreateEditDinamicVariableComponent, data: { permission: 'Pages.Application.DinamicVariable.Edit', type: DinamicVariableType.ProspectiveRisk } },

                    { path: 'project-risk', component: ProjectRiskComponent, data: { permission: 'Pages.Management.ProjectRisk' } },
                    { path: 'project-risk/create', component: CreateEditProjectRiskComponent, data: { permission: 'Pages.Management.ProjectRisk.Create' } },
                    { path: 'project-risk/edit/:id', component: CreateEditProjectRiskComponent, data: { permission: 'Pages.Application.ProjectRisk.Edit' } },

                    { path: 'project-risk-static-variable', component: StaticVariableComponent, data: { permission: 'Pages.Management.StaticVariable', type: StaticVariableFamilyType.ProjectRisk } },
                    { path: 'project-risk-static-variable/create', component: CreateEditStaticVariableComponent, data: { permission: 'Pages.Management.StaticVariable.Create', type: StaticVariableFamilyType.ProjectRisk } },
                    { path: 'project-risk-static-variable/edit/:id', component: CreateEditStaticVariableComponent, data: { permission: 'Pages.Application.StaticVariable.Edit', type: StaticVariableFamilyType.ProjectRisk } },

                    { path: 'project-risk-dinamic-variable', component: DinamicVariableComponent, data: { permission: 'Pages.Management.DinamicVariable', type: DinamicVariableType.ProjectRisk } },
                    { path: 'project-risk-dinamic-variable/create', component: CreateEditDinamicVariableComponent, data: { permission: 'Pages.Management.DinamicVariable.Create', type: DinamicVariableType.ProjectRisk } },
                    { path: 'project-risk-dinamic-variable/edit/:id', component: CreateEditDinamicVariableComponent, data: { permission: 'Pages.Application.DinamicVariable.Edit', type: DinamicVariableType.ProjectRisk } },

                    { path: 'project-stage', component: ProjectStageComponent, data: { permission: 'Pages.Management.ProjectStage' } },
                    { path: 'project-stage/create', component: CreateEditProjectStageComponent, data: { permission: 'Pages.Management.ProjectStage.Create' } },
                    { path: 'project-stage/edit/:id', component: CreateEditProjectStageComponent, data: { permission: 'Pages.Application.ProjectStage.Edit' } },

                    { path: '', redirectTo: '/app/admin/hostDashboard', pathMatch: 'full' },
                    { path: '**', redirectTo: '/app/admin/hostDashboard' }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ManagementRoutingModule {

    constructor(private router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                window.scroll(0, 0);
            }
        });
    }
}
