import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ActorMovementComponent } from './actor-movement/actor-movement.component';
import { ActorTypeComponent } from './actor-type/actor-type.component';
import { AlertDemandComponent } from './alert-demand/alert-demand.component';
import { AlertResponsibleComponent } from './alert-responsible/alert-responsible.component';
import { AlertRiskComponent } from './alert-risk/alert-risk.component';
import { AlertSealComponent } from './alert-seal/alert-seal.component';
import { AlertSectorComponent } from './alert-sector/alert-sector.component';
import { AnalystComponent } from './analyst/analyst.component';
import { CoordinatorComponent } from './coordinator/coordinator.component';
import { FactComponent } from './fact/fact.component';
import { DirectoryGovernmentComponent } from './directory-government/directory-government.component';
import { ManagementComponent } from './management/management.component';
import { ManagerComponent } from './manager/manager.component';
import { RegionComponent } from './region/region.component';
import { ResponsibleActorComponent } from './responsible-actor/responsible-actor.component';
import { RiskComponent } from './risk/risk.component';
import { SectorComponent } from './sector/sector.component';
import { TerritorialUnitComponent } from './territorial-unit/territorial-unit.component';
import { TypologyComponent } from './typology/typology.component';
import { UbigeoComponent } from './ubigeo/ubigeo.component';
import { DirectorySectorComponent } from './directory-sector/directory-sector.component';
import { DirectoryResponsibleComponent } from './directory-responsible/directory-responsible.component';
import { DirectoryGovernmentSectorComponent } from './directory-government-sector/directory-government-sector.component';
import { DirectoryDialogComponent } from './directory-dialog/directory-dialog.component';
import { DirectoryIndustryComponent } from './directory-industry/directory-industry.component';
import { DirectoryGovernmentLevelComponent } from './directory-government-level/directory-government-level.component';
import { DirectoryConflictTypeComponent } from './directory-conflict-type/directory-conflict-type.component';
import { PhaseComponent } from './phase/phase.component';
import { InterventionPlanOptionComponent } from './intervention-plan-option/actor-movement.component';
import { InterventionPlanActivityComponent } from './intervention-plan-activity/intervention-plan-activity.component';
import { InterventionPlanEntityComponent } from './intervention-plan-entity/intervention-plan-entity.component';
import { InterventionPlanRoleComponent } from './intervention-plan-role/intervention-plan-role.component';
import { CrisisCommitteeJobComponent } from './crisis-committee-jobs/crisis-committee-job.component';
import { CompromiseLabelComponent } from './compromise-label/compromise-label.component';
import { ResponsibleTypeComponent } from './responsible-type/responsible-type.component';
import { DirectoryGovernmentTypeComponent } from './directory-government-type/directory-government-type.component';
import { RecordResourceTypeComponent } from './record-resource-type/record-resource-type.component';
import { CompromiseStateComponent } from './compromise-state/compromise-state.component';
import { DialogSpaceDocumentTypeComponent } from './dialog-space-document-type/dialog-space-document-type.component';
import { DialogSpaceHolidayComponent } from './dialog-space-holiday/dialog-space-holiday.component';
import { DialogSpaceTypeComponent } from './dialog-space-type/dialog-space-type.component';
import { DialogSpaceDocumentSituationComponent } from './dialog-space-document-situation/dialog-space-document-situation.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'ubigeos', component: UbigeoComponent, data: { permission: 'Pages.Maintenance.Ubigeo' } },
                    { path: 'regions', component: RegionComponent, data: { permission: 'Pages.Maintenance.Ubigeo' } },
                    { path: 'typologies', component: TypologyComponent, data: { permission: 'Pages.Maintenance.Typology' } },
                    { path: 'risks', component: RiskComponent, data: { permission: 'Pages.Maintenance.Risk' } },
                    { path: 'alert-risks', component: AlertRiskComponent, data: { permission: 'Pages.Maintenance.AlertRisk' } },
                    { path: 'facts', component: FactComponent, data: { permission: 'Pages.Maintenance.Fact' } },
                    { path: 'sectors', component: SectorComponent, data: { permission: 'Pages.Maintenance.Sector' } },
                    { path: 'alert-sectors', component: AlertSectorComponent, data: { permission: 'Pages.Maintenance.AlertSector' } },
                    { path: 'alert-seals', component: AlertSealComponent, data: { permission: 'Pages.Maintenance.AlertSeal' } },
                    { path: 'managements', component: ManagementComponent, data: { permission: 'Pages.Maintenance.Management' } },
                    { path: 'responsible-actors', component: ResponsibleActorComponent, data: { permission: 'Pages.Maintenance.ResponsibleActor' } },
                    { path: 'territorial-units', component: TerritorialUnitComponent, data: { permission: 'Pages.Maintenance.TerritorialUnit' } },
                    { path: 'actor-types', component: ActorTypeComponent, data: { permission: 'Pages.Maintenance.ActorType' } },
                    { path: 'actor-movements', component: ActorMovementComponent, data: { permission: 'Pages.Maintenance.ActorMovement' } },
                    { path: 'analysts', component: AnalystComponent, data: { permission: 'Pages.Maintenance.Analyst' } },
                    { path: 'coordinators', component: CoordinatorComponent, data: { permission: 'Pages.Maintenance.Coordinator' } },
                    { path: 'managers', component: ManagerComponent, data: { permission: 'Pages.Maintenance.Manager' } },
                    { path: 'alert-demands', component: AlertDemandComponent, data: { permission: 'Pages.Maintenance.AlertDemand' } },
                    { path: 'alert-responsibles', component: AlertResponsibleComponent, data: { permission: 'Pages.Maintenance.AlertResponsible' } },
                    { path: 'directory-governments', component: DirectoryGovernmentComponent, data: { permission: 'Pages.Catalog.DirectoryGovernment' } },
                    { path: 'directory-sectors', component: DirectorySectorComponent, data: { permission: 'Pages.Maintenance.DirectorySector' } },
                    { path: 'directory-responsibles', component: DirectoryResponsibleComponent, data: { permission: 'Pages.Maintenance.DirectoryResponsible' } },
                    { path: 'directory-government-sectors', component: DirectoryGovernmentSectorComponent, data: { permission: 'Pages.Maintenance.DirectoryGovernmentSector' } },
                    { path: 'directory-government-types', component: DirectoryGovernmentTypeComponent, data: { permission: 'Pages.Maintenance.DirectoryGovernmentType' } },
                    { path: 'directory-dialogs', component: DirectoryDialogComponent, data: { permission: 'Pages.Catalog.DirectoryDialog' } },
                    { path: 'directory-industries', component: DirectoryIndustryComponent, data: { permission: 'Pages.Catalog.DirectoryIndustry' } },
                    { path: 'directory-government-levels', component: DirectoryGovernmentLevelComponent, data: { permission: 'Pages.Maintenance.DirectoryGovernmentLevel' } },
                    { path: 'directory-conflict-types', component: DirectoryConflictTypeComponent, data: { permission: 'Pages.Maintenance.DirectoryConflictType' } },
                    { path: 'intervention-plan-options', component: InterventionPlanOptionComponent, data: { permission: 'Pages.Maintenance.InterventionPlanOption' } },
                    { path: 'intervention-plan-activities', component: InterventionPlanActivityComponent, data: { permission: 'Pages.Maintenance.InterventionPlanActivity' } },
                    { path: 'intervention-plan-entities', component: InterventionPlanEntityComponent, data: { permission: 'Pages.Maintenance.InterventionPlanEntity' } },
                    { path: 'intervention-plan-roles', component: InterventionPlanRoleComponent, data: { permission: 'Pages.Maintenance.InterventionPlanRole' } },
                    { path: 'crisis-committee-jobs', component: CrisisCommitteeJobComponent, data: { permission: 'Pages.Maintenance.CrisisCommitteeJob' } },
                    { path: 'compromise-labels', component: CompromiseLabelComponent, data: { permission: 'Pages.Maintenance.CompromiseLabel' } },
                    { path: 'responsible-types', component: ResponsibleTypeComponent, data: { permission: 'Pages.Maintenance.ResponsibleType' } },
                    { path: 'phases', component: PhaseComponent, data: { permission: 'Pages.Maintenance.Phase' } },
                    { path: 'record-resource-types', component: RecordResourceTypeComponent, data: { permission: 'Pages.Maintenance.RecordResourceType' } },
                    { path: 'compromise-states', component: CompromiseStateComponent, data: { permission: 'Pages.Maintenance.CompromiseState' } },
                    { path: 'dialog-space-document-types', component: DialogSpaceDocumentTypeComponent, data: { permission: 'Pages.Maintenance.DialogSpaceDocumentType' } },
                    { path: 'dialog-space-holidays', component: DialogSpaceHolidayComponent, data: { permission: 'Pages.Maintenance.DialogSpaceHoliday' } },
                    { path: 'dialog-space-types', component: DialogSpaceTypeComponent, data: { permission: 'Pages.Maintenance.DialogSpaceType' } },
                    { path: 'dialog-space-document-situations', component: DialogSpaceDocumentSituationComponent, data: { permission: 'Pages.Maintenance.DialogSpaceDocumentSituation' } },
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
export class MaintenanceRoutingModule {

    constructor(private router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                window.scroll(0, 0);
            }
        });
    }
}
