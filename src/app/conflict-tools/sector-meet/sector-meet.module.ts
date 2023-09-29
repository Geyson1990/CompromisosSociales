import { NgModule } from '@angular/core';
import { AppSharedModule } from '@shared/utils/app-shared.module';
import { CreateEditSectorMeetComponent } from './create-edit-meet/create-edit-sector-meet.component';
import { GeneralInformationComponent } from './create-edit-meet/general-information/general-information.component';
import { ActionInformationComponent } from './create-edit-session/action-information/action-information.component';
import { CreateEditActionInformationComponent } from './create-edit-session/action-information/create-edit-action/create-edit-action-information.component';
import { AgreementInformationComponent } from './create-edit-session/agreement-information/agreement-information.component';
import { CreateEditAgreementInformationComponent } from './create-edit-session/agreement-information/create-edit-agreement/create-edit-agreement-information.component';
import { CreateEditSessionComponent } from './create-edit-session/create-edit-session.component';
import { CreateEditCriticalAspectInformationComponent } from './create-edit-session/critical-aspect-information/create-edit-critical-aspect/create-edit-critical-aspect-information.component';
import { CriticalAspectInformationComponent } from './create-edit-session/critical-aspect-information/critical-aspect-information.component';
import { CreateEditLeaderInformationComponent } from './create-edit-session/registration-information/leader-information/leader-information.component';
import { RegistrationInformationComponent } from './create-edit-session/registration-information/registration-information.component';
import { CreateEditTeamInformationComponent } from './create-edit-session/registration-information/team-information/create-edit-team/create-edit-team.component';
import { TeamInformationComponent } from './create-edit-session/registration-information/team-information/team-information.component';
import { AttachmentInformationComponent } from './create-edit-session/resource-information/attachment-information/attachment-information.component';
import { FileInformationComponent } from './create-edit-session/resource-information/file-information/file-information.component';
import { ResourceInformationComponent } from './create-edit-session/resource-information/resource-information.component';
import { UploaderInformationComponent } from './create-edit-session/resource-information/uploader-information/uploader-information.component';
import { CreateEditScheduleInformationComponent } from './create-edit-session/schedule-information/create-edit-schedule/create-edit-schedule-information.component';
import { ScheduleInformationComponent } from './create-edit-session/schedule-information/schedule-information.component';
import { CreateEditSummaryInformationComponent } from './create-edit-session/summary-information/create-edit-summary/create-edit-summary-information.component';
import { FindLeaderSectorMeetSessionComponent } from './create-edit-session/summary-information/find-leader/find-leader.component';
import { SummaryInformationComponent } from './create-edit-session/summary-information/summary-information.component';
import { SectorMeetComponent } from './dashboard/sector-meet.component';
import { SectorMeetRoutingModule } from './sector-meet-routing.module';
import { SectorMeetStateService } from './shared/sector-meet-state.service';
import { SectorSessionStateService } from './shared/sector-session-state.service';

@NgModule({
    imports: [
        AppSharedModule,
        SectorMeetRoutingModule
    ],
    declarations: [
        SectorMeetComponent,
        CreateEditSectorMeetComponent,
        GeneralInformationComponent,
        CreateEditSessionComponent,
        ScheduleInformationComponent,
        CreateEditScheduleInformationComponent,
        AgreementInformationComponent,
        CreateEditAgreementInformationComponent,
        CriticalAspectInformationComponent,
        CreateEditCriticalAspectInformationComponent,
        ActionInformationComponent,
        CreateEditActionInformationComponent,
        RegistrationInformationComponent,
        SummaryInformationComponent,
        CreateEditSummaryInformationComponent,
        FindLeaderSectorMeetSessionComponent,
        ResourceInformationComponent,
        UploaderInformationComponent,
        AttachmentInformationComponent,
        FileInformationComponent,
        CreateEditLeaderInformationComponent,
        TeamInformationComponent,
        CreateEditTeamInformationComponent
    ],
    providers: [
        SectorMeetStateService,
        SectorSessionStateService
    ]
})
export class SectorMeetModule { }
