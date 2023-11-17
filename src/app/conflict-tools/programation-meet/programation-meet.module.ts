import { NgModule } from '@angular/core';
import { AppSharedModule } from '@shared/utils/app-shared.module';
import { CreateEditSectorMeetComponent } from './create-edit-meet/create-edit-sector-meet.component';
import { GeneralInformationComponent } from './create-edit-meet/general-information/general-information.component';
import { CreateEditSessionComponent } from './create-edit-session/create-edit-session.component';
import { CreateEditCriticalAspectInformationComponent } from './create-edit-session/critical-aspect-information/create-edit-critical-aspect/create-edit-critical-aspect-information.component';
import { CriticalAspectInformationComponent } from './create-edit-session/critical-aspect-information/critical-aspect-information.component';
import { CreateEditLeaderInformationComponent } from './create-edit-session/registration-information/leader-information/leader-information.component';
import { RegistrationInformationComponent } from './create-edit-session/registration-information/registration-information.component';
import { CreateEditTeamInformationComponent } from './create-edit-session/registration-information/team-information/create-edit-team/create-edit-team.component';
import { TeamInformationComponent } from './create-edit-session/registration-information/team-information/team-information.component';
import { CreateEditScheduleInformationComponent } from './create-edit-session/schedule-information/create-edit-schedule/create-edit-schedule-information.component';
import { ScheduleInformationComponent } from './create-edit-session/schedule-information/schedule-information.component';
import { ProgramationMeetComponent } from './dashboard/programation-meet.component';
import { ProgramationMeetRoutingModule } from './programation-meet-routing.module';
import { CreateEditRiskFactorWeekComponent } from './create-edit-session/risk-factors-week/create-edit-risk-factors-week/create-edit-risk-factors-week.component';
import { RiskFactorWeekComponent } from './create-edit-session/risk-factors-week/risk-factors-week.component';
import { SectorMeetStateService } from '../sector-meet/shared/sector-meet-state.service';
import { SectorSessionStateService } from '../sector-meet/shared/sector-session-state.service';

@NgModule({
    imports: [
        AppSharedModule,
        ProgramationMeetRoutingModule
    ], 
    declarations: [
        ProgramationMeetComponent,
        CreateEditSectorMeetComponent,
        GeneralInformationComponent,
        CreateEditSessionComponent,
        ScheduleInformationComponent,
        CreateEditScheduleInformationComponent,
        CriticalAspectInformationComponent,
        CreateEditCriticalAspectInformationComponent,
        CreateEditRiskFactorWeekComponent,
        RiskFactorWeekComponent,
        RegistrationInformationComponent,
        CreateEditLeaderInformationComponent,
        TeamInformationComponent,
        CreateEditTeamInformationComponent,
    ],
    providers: [
        SectorMeetStateService,
        SectorSessionStateService
    ]
})
export class ProgramationMeetModule { }
