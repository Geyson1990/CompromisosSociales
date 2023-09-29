import { NgModule } from '@angular/core';
import { AppSharedModule } from '@shared/utils/app-shared.module';
import { ActorInformationInterventionPlanComponent } from './create-edit-intervention-plan/actor-information/actor-information.component';
import { CreateEditActorInformationInterventionPlanComponent } from './create-edit-intervention-plan/actor-information/create-edit-actor-information/create-edit-actor-information.component';
import { CreateEditInterventionPlanComponent } from './create-edit-intervention-plan/create-edit-intervention-plan.component';
import { GeneralInformationInterventionPlanComponent } from './create-edit-intervention-plan/general-information/general-information.component';
import { CreateEditMethodologyInformationInterventionPlanComponent } from './create-edit-intervention-plan/methodology-information/create-edit-methodology-information/create-edit-methodology-information.component';
import { MethodologyInformationInterventionPlanComponent } from './create-edit-intervention-plan/methodology-information/methodology-information.component';
import { CreateEditRiskInformationInterventionPlanComponent } from './create-edit-intervention-plan/risk-information/create-edit-risk-information/create-edit-risk-information.component';
import { RiskInformationInterventionPlanComponent } from './create-edit-intervention-plan/risk-information/risk-information.component';
import { CreateEditScheduleInformationInterventionPlanComponent } from './create-edit-intervention-plan/schedule-information/create-edit-schedule-information/create-edit-schedule-information.component';
import { FindMethodologyComponent } from './create-edit-intervention-plan/schedule-information/find-methodology/find-methodology.component';
import { ScheduleInformationInterventionPlanComponent } from './create-edit-intervention-plan/schedule-information/schedule-information.component';
import { CreateEditSolutionInformationInterventionPlanComponent } from './create-edit-intervention-plan/solution-information/create-edit-state-solution/create-edit-solution-information.component';
import { SolutionInformationInterventionPlanComponent } from './create-edit-intervention-plan/solution-information/solution-information.component';
import { CreateEditStateInformationInterventionPlanComponent } from './create-edit-intervention-plan/state-information/create-edit-state-information/create-edit-state-information.component';
import { StateInformationInterventionPlanComponent } from './create-edit-intervention-plan/state-information/state-information.component';
import { CreateEditTeamInformationInterventionPlanComponent } from './create-edit-intervention-plan/team-information/create-edit-team-information/create-edit-team-information.component';
import { TeamInformationInterventionPlanComponent } from './create-edit-intervention-plan/team-information/team-information.component';
import { InterventionPlanComponent } from './dashboard/intervention-plan.component';
import { InterventionPlanRoutingModule } from './intervention-plan-routing.module';


@NgModule({
    imports: [
        AppSharedModule,
        InterventionPlanRoutingModule
    ],
    declarations: [
        InterventionPlanComponent,
        CreateEditInterventionPlanComponent,

        GeneralInformationInterventionPlanComponent,

        ActorInformationInterventionPlanComponent,
        CreateEditActorInformationInterventionPlanComponent,

        StateInformationInterventionPlanComponent,
        CreateEditStateInformationInterventionPlanComponent,

        MethodologyInformationInterventionPlanComponent,
        CreateEditMethodologyInformationInterventionPlanComponent,

        RiskInformationInterventionPlanComponent,
        CreateEditRiskInformationInterventionPlanComponent,

        ScheduleInformationInterventionPlanComponent,
        CreateEditScheduleInformationInterventionPlanComponent,
        FindMethodologyComponent,

        TeamInformationInterventionPlanComponent,
        CreateEditTeamInformationInterventionPlanComponent,

        SolutionInformationInterventionPlanComponent,
        CreateEditSolutionInformationInterventionPlanComponent,
    ],
    providers: [

    ]
})
export class InterventionPlanModule { }
