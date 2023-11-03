import { AbpHttpInterceptor, RefreshTokenService, AbpHttpConfigurationService } from 'abp-ng2-module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import * as ApiServiceProxies from './service-proxies';
import { ZeroRefreshTokenService } from '@account/auth/zero-refresh-token.service';
import { ZeroTemplateHttpConfigurationService } from './zero-template-http-configuration.service';
import { DepartmentServiceProxy } from './application/department-proxie';
import { ProvinceServiceProxy } from './application/province-proxie';
import { DistrictServiceProxy } from './application/district-proxie';
import { ResponsibleActorServiceProxy } from './application/responsible-actor-proxie';
import { SocialConflictServiceProxy } from './application/social-conflict-proxie';
import { TerritorialUnitServiceProxy } from './application/territorial-unit-proxie';
import { UtilityServiceProxy } from './application/utility-proxie';
import { UploadServiceProxy } from './application/upload-proxie';
import { RecordServiceProxy } from './application/record-proxie';
import { CompromiseServiceProxy } from './application/compromise-proxie';
import { TaskBoardServiceProxy } from './application/task-board-proxie';
import { OrderServiceProxy } from './application/order-proxie';
import { ComplianceServiceProxy } from './application/compliance-proxie';
import { DashboardServiceProxy } from './application/dashboard-proxie';
import { PIPMEFServiceProxy } from './application/pip-mef-proxie';
import { DinamicVariableServiceProxy } from './application/dinamic-variable-proxie';
import { StaticVariableServiceProxy } from './application/static-variable-proxie';
import { ProspectiveRiskServiceProxy } from './application/prospective-risk-proxie';
import { ProjectStageServiceProxy } from './application/project-stage-proxie';
import { ProjectRiskServiceProxy } from './application/project-risk-proxie';
import { TypologyServiceProxy } from './application/typology-proxie';
import { SubTypologyServiceProxy } from './application/sub-typology-proxie';
import { RiskServiceProxy } from './application/risk-proxie';
import { FactServiceProxy } from './application/fact-proxie';
import { SectorServiceProxy } from './application/sector-proxie';
import { ManagementServiceProxy } from './application/management-proxie';
import { ActorTypeServiceProxy } from './application/actor-type-proxie';
import { ActorMovementServiceProxy } from './application/actor-movement-proxie';
import { AnalystServiceProxy } from './application/analyst-proxie';
import { ManagerServiceProxy } from './application/manager-proxie';
import { CoordinatorServiceProxy } from './application/coordinator-proxie';
import { SocialConflictAlertServiceProxy } from './application/social-conflict-alert-proxie';
import { AlertRiskServiceProxy } from './application/alert-risk-proxie';
import { AlertSectorServiceProxy } from './application/alert-sector-proxie';
import { AlertSealServiceProxy } from './application/alert-seal-proxie';
import { AlertDemandServiceProxy } from './application/alert-demand-proxie';
import { AlertResponsibleServiceProxy } from './application/alert-responsible-proxie';
import { RegionServiceProxy } from './application/region-proxie';
import { SocialConflictSensibleServiceProxy } from './application/social-conflict-sensible-proxie';
import { ReportServiceProxy } from './application/report-proxie';
import { SocialConflictAlertHistoryServiceProxy } from './application/social-conflict-alert-history-proxie';
import { DirectoryGovernmentServiceProxy } from './application/directory-government-proxie';
import { DirectoryGovernmentSectorServiceProxy } from './application/directory-government-sector';
import { DirectorySectorServiceProxy } from './application/directory-sector-proxie';
import { DirectoryResponsibleServiceProxy } from './application/directory-responsible-proxie';
import { DirectoryDialogServiceProxy } from './application/directory-dialog-proxie';
import { DirectoryIndustryServiceProxy } from './application/directory-industry-proxie';
import { SocialConflictTaskManagementServiceProxy } from './application/social-conflict-task-management-proxie';
import { DirectoryConflictTypeServiceProxy } from './application/directory-conflict-type-proxie';
import { DirectoryGovernmentLevelServiceProxy } from './application/directory-government-level-proxie';
import { NotificationManagerServiceProxy } from './application/notification-manager-proxie';
import { HelpMemoryServiceProxy } from './application/help-memory-proxie';
import { SocialConflictTaskManagementHistoryServiceProxy } from './application/social-conflict-task-management-history-proxie';
import { TaskManagementHistoryServiceProxy } from './application/task-management-history-proxie';
import { PhaseServiceProxy } from './application/phase-proxie';
import { MilestoneServiceProxy } from './application/milestone-proxie';
import { InterventionPlanOptionServiceProxy } from './application/intervention-plan-option';
import { InterventionPlanServiceProxy } from './application/intervention-plan-proxie';
import { InterventionPlanActivityServiceProxy } from './application/intervention-plan-activity-proxie';
import { InterventionPlanEntityServiceProxy } from './application/intervention-plan-entity-proxie';
import { InterventionPlanRoleServiceProxy } from './application/intervention-plan-role-proxie';
import { CrisisCommitteeJobServiceProxy } from './application/crisis-committee-job-proxie';
import { CrisisCommitteeServiceProxy } from './application/crisis-committee-proxie';
import { CompromiseLabelServiceProxy } from './application/compromise-label-proxie';
import { ResponsibleTypeServiceProxy } from './application/responsible-type-proxie';
import { ResponsibleSubTypeServiceProxy } from './application/responsible-sub-type-proxie';
import { DirectoryGovernmentTypeServiceProxy } from './application/directory-government-type-proxie';
import { QuizStateServiceProxy } from './application/quiz-state-proxie';
import { QuizResponseServiceProxy } from './application/quiz-response-proxie';
import { QuizAdministrativeServiceProxy } from './application/quiz-customer-proxie';
import { QuizDetailServiceProxy } from './application/quiz-detail-proxie';
import { DownloadServiceProxy } from './application/resource-downloader';
import { RecordResourceTypeServiceProxy } from './application/record-resource-type-proxie';
import { CompromiseStateServiceProxy } from './application/compromise-state-proxie';
import { CompromiseSubStateServiceProxy } from './application/compromise-sub-state-proxie';
import { SectorMeetServiceProxy } from './application/sector-meet-proxie';
import { SectorMeetSessionServiceProxy } from './application/sector-meet-session-proxie';
import { DialogSpaceServiceProxy } from './application/dialog-space.proxie';
import { PortalServiceProxy } from './application/portal-proxie';
import { DialogSpaceDocumentTypeServiceProxy } from './application/dialog-space-document-type-proxie';
import { DialogSpaceDocumentServiceProxy } from './application/dialog-space-document-proxie';
import { DialogSpaceHolidayServiceProxy } from './application/dialog-space-holiday-proxie';
import { DialogSpaceTypeServiceProxy } from './application/dialog-space-type-proxie';
import { DialogSpaceDocumentSituationServiceProxy } from './application/dialog-space-document-situation-proxie';
import { SectorMeetSessionAgreementServiceProxy } from './application/sector-meet-session-agreement-proxie';

@NgModule({
    providers: [
        ApiServiceProxies.AuditLogServiceProxy,
        ApiServiceProxies.CachingServiceProxy,
        ApiServiceProxies.ChatServiceProxy,
        ApiServiceProxies.CommonLookupServiceProxy,
        ApiServiceProxies.EditionServiceProxy,
        ApiServiceProxies.FriendshipServiceProxy,
        ApiServiceProxies.HostSettingsServiceProxy,
        ApiServiceProxies.InstallServiceProxy,
        ApiServiceProxies.LanguageServiceProxy,
        ApiServiceProxies.NotificationServiceProxy,
        ApiServiceProxies.OrganizationUnitServiceProxy,
        ApiServiceProxies.PermissionServiceProxy,
        ApiServiceProxies.ProfileServiceProxy,
        ApiServiceProxies.RoleServiceProxy,
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.TenantServiceProxy,
        ApiServiceProxies.TenantDashboardServiceProxy,
        ApiServiceProxies.TenantSettingsServiceProxy,
        ApiServiceProxies.TimingServiceProxy,
        ApiServiceProxies.UserServiceProxy,
        ApiServiceProxies.UserLinkServiceProxy,
        ApiServiceProxies.UserLoginServiceProxy,
        ApiServiceProxies.WebLogServiceProxy,
        ApiServiceProxies.AccountServiceProxy,
        ApiServiceProxies.TokenAuthServiceProxy,
        ApiServiceProxies.TenantRegistrationServiceProxy,
        ApiServiceProxies.HostDashboardServiceProxy,
        ApiServiceProxies.PaymentServiceProxy,
        ApiServiceProxies.DemoUiComponentsServiceProxy,
        ApiServiceProxies.InvoiceServiceProxy,
        ApiServiceProxies.SubscriptionServiceProxy,
        ApiServiceProxies.InstallServiceProxy,
        ApiServiceProxies.UiCustomizationSettingsServiceProxy,
        ApiServiceProxies.PayPalPaymentServiceProxy,
        ApiServiceProxies.StripePaymentServiceProxy,
        ApiServiceProxies.DashboardCustomizationServiceProxy,
        ApiServiceProxies.WebhookEventServiceProxy,
        ApiServiceProxies.WebhookSubscriptionServiceProxy,
        ApiServiceProxies.WebhookSendAttemptServiceProxy,
        ApiServiceProxies.UserDelegationServiceProxy,
        ApiServiceProxies.DynamicParameterServiceProxy,
        ApiServiceProxies.DynamicEntityParameterDefinitionServiceProxy,
        ApiServiceProxies.EntityDynamicParameterServiceProxy,
        ApiServiceProxies.DynamicParameterValueServiceProxy,
        ApiServiceProxies.EntityDynamicParameterValueServiceProxy,
        DepartmentServiceProxy,
        DistrictServiceProxy,
        ProvinceServiceProxy,
        ResponsibleActorServiceProxy,
        SocialConflictServiceProxy,
        SocialConflictAlertServiceProxy,
        TerritorialUnitServiceProxy,
        UtilityServiceProxy,
        UploadServiceProxy,
        RecordServiceProxy,
        CompromiseServiceProxy,
        TaskBoardServiceProxy,
        OrderServiceProxy,
        ComplianceServiceProxy,
        DashboardServiceProxy,
        PIPMEFServiceProxy,
        DinamicVariableServiceProxy,
        StaticVariableServiceProxy,
        ProspectiveRiskServiceProxy,
        ProjectStageServiceProxy,
        ProjectRiskServiceProxy,
        ActorTypeServiceProxy,
        ActorMovementServiceProxy,
        TypologyServiceProxy,
        SubTypologyServiceProxy,
        RiskServiceProxy,
        FactServiceProxy,
        SectorServiceProxy,
        ManagementServiceProxy,
        AnalystServiceProxy,
        CoordinatorServiceProxy,
        ManagerServiceProxy,
        AlertRiskServiceProxy,
        AlertSectorServiceProxy,
        AlertSealServiceProxy,
        AlertDemandServiceProxy,
        AlertResponsibleServiceProxy,
        RegionServiceProxy,
        SocialConflictSensibleServiceProxy,
        ReportServiceProxy,
        SocialConflictAlertHistoryServiceProxy,
        DirectoryGovernmentServiceProxy,
        DirectoryGovernmentSectorServiceProxy,
        DirectorySectorServiceProxy,
        DirectoryResponsibleServiceProxy,
        DirectoryDialogServiceProxy,
        DirectoryIndustryServiceProxy,
        DirectoryGovernmentLevelServiceProxy,
        DirectoryConflictTypeServiceProxy,
        SocialConflictTaskManagementServiceProxy,
        NotificationManagerServiceProxy,
        HelpMemoryServiceProxy,
        SocialConflictTaskManagementHistoryServiceProxy,
        TaskManagementHistoryServiceProxy,
        PhaseServiceProxy,
        MilestoneServiceProxy,
        InterventionPlanOptionServiceProxy,
        InterventionPlanServiceProxy,
        InterventionPlanActivityServiceProxy,
        InterventionPlanEntityServiceProxy,
        InterventionPlanRoleServiceProxy,
        CrisisCommitteeServiceProxy,
        CrisisCommitteeJobServiceProxy,
        CompromiseLabelServiceProxy,
        ResponsibleTypeServiceProxy,
        ResponsibleSubTypeServiceProxy,
        DirectoryGovernmentTypeServiceProxy,
        QuizStateServiceProxy,
        QuizResponseServiceProxy,
        QuizAdministrativeServiceProxy,
        QuizDetailServiceProxy,
        DownloadServiceProxy,
        RecordResourceTypeServiceProxy,
        CompromiseStateServiceProxy,
        CompromiseSubStateServiceProxy,
        SectorMeetServiceProxy,
        SectorMeetSessionServiceProxy,
        SectorMeetSessionAgreementServiceProxy,
        DialogSpaceServiceProxy,
        DialogSpaceDocumentServiceProxy,
        DialogSpaceDocumentTypeServiceProxy,
        DialogSpaceHolidayServiceProxy,
        DialogSpaceTypeServiceProxy,
        DialogSpaceDocumentSituationServiceProxy,
        PortalServiceProxy,
        { provide: RefreshTokenService, useClass: ZeroRefreshTokenService },
        { provide: AbpHttpConfigurationService, useClass: ZeroTemplateHttpConfigurationService },
        { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true }
    ]
})
export class ServiceProxyModule { }
