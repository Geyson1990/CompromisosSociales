import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/shared/common/app-common.module';
import { UtilsModule } from '@shared/utils/utils.module';
import { FileUploadModule } from 'ng2-file-upload';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerConfig, BsDaterangepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule as PrimeNgFileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TreeModule } from 'primeng/tree';
import { DragDropModule } from 'primeng/dragdrop';
import { TreeDragDropService } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CountoModule } from 'angular2-counto';
import { TextMaskModule } from 'angular2-text-mask';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxBootstrapDatePickerConfigService } from 'assets/ngx-bootstrap/ngx-bootstrap-datepicker-config.service';
import { DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from 'primeng/chips';

// Metronic
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AppBsModalModule } from '@shared/common/appBsModal/app-bs-modal.module';
import { SocialConflictComponent } from './social-conflict/social-conflict.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { CreateEditSocialConflictComponent } from './social-conflict/create-edit-social-conflict/create-edit-social-conflict.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CreateEditRecordComponent } from './record/create-edit-record/create-edit-record.component';
import { RecordComponent } from './record/record.component';
import { ComponentModule } from '@shared/component/component.module';
import { CreateEditCompromiseComponent } from './compromise/create-edit-compromise/create-edit-compromise.component';
import { CompromiseComponent } from './compromise/compromise.component';
import { CompromiseGeneralInformationComponent } from './compromise/create-edit-compromise/general-information/general-information.component';
import { CompromiseInvolvedComponent } from './compromise/create-edit-compromise/involved/involved.component';
import { CompromiseTracingComponent } from './compromise/create-edit-compromise/compromise-tracing/compromise-tracing.component';
import { CompromisePipComponent } from './compromise/create-edit-compromise/pip/pip.component';
import { CompromiseTaskManagementComponent } from './compromise/create-edit-compromise/task-management/task-management.component';
import { TaskManagementComponent } from './task-management/task-management.component';
import { TaskCalendarComponent } from './task-management/task-calendar/task-calendar.component';
import { TaskBoardComponent } from './task-management/task-selection/task-board/task-board.component';
import { TaskListComponent } from './task-management/task-list/task-list.component';
import { TaskSelectionComponent } from './task-management/task-selection/task-selection.compoment';
import { TaskExpandDeadlineComponent } from './task-management/task-selection/task-expand-deadline/task-expand-deadline.component';
import { CreateEditOrderComponent } from './order/create-edit-order/create-edit-order.component';
import { OrderComponent } from './order/order.component';
import { ComplianceComponent } from './compliance/compliance.component';
import { ComplianceStateComponent } from './compliance/compliance-state/compliance-state.component';
import { LogoutComponent } from './logout/logout.component';
import { GeneralInformationSocialConflcitComponent } from './social-conflict/create-edit-social-conflict/general-information/general-information.component';
import { ActorInformationSocialConflictComponent } from './social-conflict/create-edit-social-conflict/actor-information/actor-information.component';
import { EditActorInformationSocialConflictComponent } from './social-conflict/create-edit-social-conflict/actor-information/edit-actor-information/edit-actor-information.component';
import { RiskInformationSocialConflictComponent } from './social-conflict/create-edit-social-conflict/risk-information/risk-information.component';
import { FactInformationSocialConflictComponent } from './social-conflict/create-edit-social-conflict/fact-information/fact-information.component';
import { CreateEditFactInformationSocialConflictComponent } from './social-conflict/create-edit-social-conflict/fact-information/create-edit-fact-information/create-edit-fact-information.component';
import { SugerenceInformationSocialConflictComponent } from './social-conflict/create-edit-social-conflict/sugerence-information/sugerence-information.component';
import { CompromiseInformationSocialConflictComponent } from './social-conflict/create-edit-social-conflict/compromise-information/compromise-information.component';
import { ManagementInformationSocialConflictComponent } from './social-conflict/create-edit-social-conflict/management-information/management-information.component';
import { CreateEditManagementInformationSocialConflictComponent } from './social-conflict/create-edit-social-conflict/management-information/create-edit-management/create-edit-management.component';
import { StateInformationSocialConflictComponent } from './social-conflict/create-edit-social-conflict/state-information/state-information.component';
import { CreateEditStateInformationSocialConflictComponent } from './social-conflict/create-edit-social-conflict/state-information/create-edit-state/create-edit-state.component';
import { ActorListComponent } from './actor/actor-list.component';
import { ViolenceFactInformationSocialConflictComponent } from './social-conflict/create-edit-social-conflict/violence-fact-information/violence-fact-information.component';
import { CreateEditViolenceFactSocialConflictComponent } from './social-conflict/create-edit-social-conflict/violence-fact-information/create-edit-violence-fact/create-edit-violence-fact.component';
import { CalendarModule } from 'primeng';
import { CreateEditRiskInformationSocialConflictComponent } from './social-conflict/create-edit-social-conflict/risk-information/create-edit-risk-information/create-edit-risk-information.component';
import { ConditionInformationSocialConflictComponent } from './social-conflict/create-edit-social-conflict/condition-information/condition-information.component';
import { CreateEditConditionInformationSocialConflictComponent } from './social-conflict/create-edit-social-conflict/condition-information/create-edit-condition-information/create-edit-condition-information.component';
import { SocialConflictAlertComponent } from './social-conflict-alert/social-conflict-alert.component';
import { CreateEditSocialConflictAlertComponent } from './social-conflict-alert/create-edit-social-conflict-alert/create-edit-social-conflict-alert.component';
import { GeneralInformationSocialConflictAlertComponent } from './social-conflict-alert/create-edit-social-conflict-alert/general-information/general-information.component';
import { RiskInformationSocialConflictAlertComponent } from './social-conflict-alert/create-edit-social-conflict-alert/risk-information/risk-information.component';
import { CreateEditRiskInformationSocialConflictAlertComponent } from './social-conflict-alert/create-edit-social-conflict-alert/risk-information/create-edit-risk-information/create-edit-risk-information.component';
import { SectorInformationSocialConflictAlertComponent } from './social-conflict-alert/create-edit-social-conflict-alert/sector-information/sector-information.component';
import { CreateEditSectorInformationSocialConflictAlertComponent } from './social-conflict-alert/create-edit-social-conflict-alert/sector-information/create-edit-sector-information/create-edit-sector-information.component';
import { StateInformationSocialConflictAlertComponent } from './social-conflict-alert/create-edit-social-conflict-alert/state-information/state-information.component';
import { CreateEditStateInformationSocialConflictAlertComponent } from './social-conflict-alert/create-edit-social-conflict-alert/state-information/create-edit-state-information/create-edit-state-information.component';
import { SealInformationSocialConflictAlertComponent } from './social-conflict-alert/create-edit-social-conflict-alert/seal-information/seal-information.component';
import { CreateEditSealInformationSocialConflictAlertComponent } from './social-conflict-alert/create-edit-social-conflict-alert/seal-information/create-edit-seal-information/create-edit-seal-information.component';
import { ActorInformationSocialConflictAlertComponent } from './social-conflict-alert/create-edit-social-conflict-alert/actor-information/actor-information.component';
import { CreateEditActorInformationSocialConflictAlertComponent } from './social-conflict-alert/create-edit-social-conflict-alert/actor-information/edit-actor-information/edit-actor-information.component';
import { AditionalInformationSocialConflictAlertComponent } from './social-conflict-alert/create-edit-social-conflict-alert/aditional-information/aditional-information.component';
import { AttachedFileManagementInformationSocialConflictComponent } from './social-conflict/create-edit-social-conflict/management-information/attached-file-management/attached-file-management.component';
import { CreateEditSugerenceInformationSocialConflictComponent } from './social-conflict/create-edit-social-conflict/sugerence-information/create-edit-sugerence/create-edit-sugerence-information.component';
import { SocialConflictSensibleComponent } from './social-conflict-sensible/social-conflict-sensible.component';
import { CreateEditSocialConflictSensibleSensibleComponent } from './social-conflict-sensible/create-edit-social-conflict-sensible/create-edit-social-conflict-sensible.component';
import { ActorInformationSocialConflictSensibleComponent } from './social-conflict-sensible/create-edit-social-conflict-sensible/actor-information/actor-information.component';
import { EditActorInformationSocialConflictSensibleComponent } from './social-conflict-sensible/create-edit-social-conflict-sensible/actor-information/edit-actor-information/edit-actor-information.component';
import { ConditionInformationSocialConflictSensibleComponent } from './social-conflict-sensible/create-edit-social-conflict-sensible/condition-information/condition-information.component';
import { CreateEditConditionInformationSocialConflictSensibleComponent } from './social-conflict-sensible/create-edit-social-conflict-sensible/condition-information/create-edit-condition-information/create-edit-condition-information.component';
import { CreateEditFactInformationSocialConflictSensibleComponent } from './social-conflict-sensible/create-edit-social-conflict-sensible/fact-information/create-edit-fact-information/create-edit-fact-information.component';
import { FactInformationSocialConflictSensibleComponent } from './social-conflict-sensible/create-edit-social-conflict-sensible/fact-information/fact-information.component';
import { AttachedFileManagementInformationSocialConflictSensibleComponent } from './social-conflict-sensible/create-edit-social-conflict-sensible/management-information/attached-file-management/attached-file-management.component';
import { CreateEditManagementInformationSocialConflictSensibleComponent } from './social-conflict-sensible/create-edit-social-conflict-sensible/management-information/create-edit-management/create-edit-management.component';
import { ManagementInformationSocialConflictSensibleComponent } from './social-conflict-sensible/create-edit-social-conflict-sensible/management-information/management-information.component';
import { CreateEditRiskInformationSocialConflictSensibleComponent } from './social-conflict-sensible/create-edit-social-conflict-sensible/risk-information/create-edit-risk-information/create-edit-risk-information.component';
import { RiskInformationSocialConflictSensibleComponent } from './social-conflict-sensible/create-edit-social-conflict-sensible/risk-information/risk-information.component';
import { CreateEditStateInformationSocialConflictSensibleComponent } from './social-conflict-sensible/create-edit-social-conflict-sensible/state-information/create-edit-state/create-edit-state.component';
import { StateInformationSocialConflictSensibleComponent } from './social-conflict-sensible/create-edit-social-conflict-sensible/state-information/state-information.component';
import { CreateEditSugerenceInformationSocialConflictSensibleComponent } from './social-conflict-sensible/create-edit-social-conflict-sensible/sugerence-information/create-edit-sugerence/create-edit-sugerence-information.component';
import { SugerenceInformationSocialConflictSensibleComponent } from './social-conflict-sensible/create-edit-social-conflict-sensible/sugerence-information/sugerence-information.component';
import { GeneralInformationSocialConflictSensibleComponent } from './social-conflict-sensible/create-edit-social-conflict-sensible/general-information/general-information.component';
import { EmailSenderInformationSocialConflictAlertComponent } from './social-conflict-alert/create-edit-social-conflict-alert/email-sender/email-sender.component';
import { SocialConflictAlertHistoryComponent } from './social-conflict-alert-history/social-conflict-alert-history.component';
import { TaskPersonComponent } from './task-management/task-selection/task-person/task-person.component';
import { SocialConflictTaskManagementComponent } from './social-conflict-task-management/social-conflict-task-management.component';
import { SocialConflictTaskManagementListComponent } from './social-conflict-task-management/task-list/social-conflict-task-management-list.component';
import { SocialConflictTaskManagementCalendarComponent } from './social-conflict-task-management/task-calendar/social-conflict-task-management-calendar.component';
import { SocialConflictTaskManagementSelectionComponent } from './social-conflict-task-management/task-selection/social-conflict-task-management-selection.compoment';
import { SocialConflictTaskManagementBoardComponent } from './social-conflict-task-management/task-selection/task-board/social-conflict-task-management-board.component';
import { SocialConflictTaskManagementPersonComponent } from './social-conflict-task-management/task-selection/task-person/social-conflict-task-management-person.component';
import { SocialConflictTaskManagementExpandDeadlineComponent } from './social-conflict-task-management/task-selection/task-expand-deadline/social-conflict-task-management-expand-deadline.component';
import { TaskInformationSocialConflictAlertComponent } from './social-conflict-alert/create-edit-social-conflict-alert/task-information/task-information.component';
import { TaskInformationSocialConflictComponent } from './social-conflict/create-edit-social-conflict/task-information/task-information.component';
import { TaskInformationSocialConflictSensibleComponent } from './social-conflict-sensible/create-edit-social-conflict-sensible/task-information/task-information.component';
import { SocialConflictTaskManagementSenderComponent } from './social-conflict-task-management/task-selection/task-sender/social-conflict-task-management-sender.component';
import { TaskManagementSenderComponent } from './task-management/task-selection/task-sender/task-management-sender.component';
import { HelpMemoryComponent } from './help-memory/help-memory.component';
import { CreateEditHelpMemoryComponent } from './help-memory/create-edit-help-memory/create-edit-memory.component';
import { GeneralInformationHelpMemoryComponent } from './help-memory/create-edit-help-memory/general-information/general-information.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ResourceInformationSocialConflictComponent } from './social-conflict/create-edit-social-conflict/resource-information/resource-information.component';
import { SocialConflictTaskManagementEmailComponent } from './social-conflict-task-management/task-selection/task-email/social-conflict-task-management-email.component';
import { SocialConflictTaskManagementHistoryComponent } from './social-conflict-task-management-history/social-conflict-task-management-history.component';
import { TaskManagementEmailComponent } from './task-management/task-selection/task-email/task-management-email.component';
import { TaskManagementHistoryComponent } from './task-management-history/task-management-history.component';
import { CompromisePhaseMilestoneInformationComponent } from './compromise/create-edit-compromise/phase-milestone-information/phase-milestone-information.component';
import { CompromiseCreateEditPhaseMilestoneModalComponent } from './compromise/create-edit-compromise/phase-milestone-information/create-edit-phase-milestone/create-edit-phase-milestone.component';
import { ResourceInformationSocialConflictSensibleComponent } from './social-conflict-sensible/create-edit-social-conflict-sensible/resource-information/resource-information.component';
import { CompromiseResponsibleActorComponent } from './compromise/create-edit-compromise/responsible-actor/responsible-actor.component';
import { CompromiseResponsibleActorOldComponent } from './compromise/create-edit-compromise/responsible-actor-old/responsible-actor.component';
import { NoteInformationSocialConflictComponent } from './social-conflict/create-edit-social-conflict/note-information/note-information.component';
import { NoteInformationSocialConflictSensibleComponent } from './social-conflict-sensible/create-edit-social-conflict-sensible/note-information/note-information.component';
import { EditActorInformationComponent } from './actor/actor-information/actor-information.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    // suppressScrollX: true
};

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        FileUploadModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        PopoverModule.forRoot(),
        BsDropdownModule.forRoot(),
        BsDatepickerModule.forRoot(),
        UtilsModule,
        AppCommonModule,
        TableModule,
        TreeModule,
        DragDropModule,
        ContextMenuModule,
        PaginatorModule,
        PrimeNgFileUploadModule,
        AutoCompleteModule,
        EditorModule,
        InputMaskModule,
        NgxChartsModule,
        CountoModule,
        TextMaskModule,
        ImageCropperModule,
        PerfectScrollbarModule,
        DropdownModule,
        AppBsModalModule,
        ApplicationRoutingModule,
        InputTextareaModule,
        ComponentModule,
        TooltipModule,
        CalendarModule,
        ChipsModule,
        SelectButtonModule
    ],
    declarations: [
        //SocialConflict
        SocialConflictComponent,
        CreateEditSocialConflictComponent,
        GeneralInformationSocialConflcitComponent,
        RiskInformationSocialConflictComponent,
        CreateEditRiskInformationSocialConflictComponent,
        ActorInformationSocialConflictComponent,
        EditActorInformationComponent,
        EditActorInformationSocialConflictComponent,
        FactInformationSocialConflictComponent,
        CreateEditFactInformationSocialConflictComponent,
        SugerenceInformationSocialConflictComponent,
        CreateEditSugerenceInformationSocialConflictComponent,
        CompromiseInformationSocialConflictComponent,
        ManagementInformationSocialConflictComponent,
        CreateEditManagementInformationSocialConflictComponent,
        AttachedFileManagementInformationSocialConflictComponent,
        StateInformationSocialConflictComponent,
        CreateEditStateInformationSocialConflictComponent,
        ViolenceFactInformationSocialConflictComponent,
        CreateEditViolenceFactSocialConflictComponent,
        ConditionInformationSocialConflictComponent,
        CreateEditConditionInformationSocialConflictComponent,
        TaskInformationSocialConflictComponent,
        ResourceInformationSocialConflictComponent,
        NoteInformationSocialConflictComponent,
        //Alerts
        SocialConflictAlertComponent,
        CreateEditSocialConflictAlertComponent,
        GeneralInformationSocialConflictAlertComponent,
        RiskInformationSocialConflictAlertComponent,
        CreateEditRiskInformationSocialConflictAlertComponent,
        SectorInformationSocialConflictAlertComponent,
        CreateEditSectorInformationSocialConflictAlertComponent,
        StateInformationSocialConflictAlertComponent,
        CreateEditStateInformationSocialConflictAlertComponent,
        SealInformationSocialConflictAlertComponent,
        CreateEditSealInformationSocialConflictAlertComponent,
        ActorInformationSocialConflictAlertComponent,
        CreateEditActorInformationSocialConflictAlertComponent,
        AditionalInformationSocialConflictAlertComponent,
        EmailSenderInformationSocialConflictAlertComponent,
        TaskInformationSocialConflictAlertComponent,
        //Sensibles
        SocialConflictSensibleComponent,
        GeneralInformationSocialConflictSensibleComponent,
        CreateEditSocialConflictSensibleSensibleComponent,
        ActorInformationSocialConflictSensibleComponent,
        EditActorInformationSocialConflictSensibleComponent,
        ConditionInformationSocialConflictSensibleComponent,
        CreateEditConditionInformationSocialConflictSensibleComponent,
        CreateEditFactInformationSocialConflictSensibleComponent,
        FactInformationSocialConflictSensibleComponent,
        AttachedFileManagementInformationSocialConflictSensibleComponent,
        CreateEditManagementInformationSocialConflictSensibleComponent,
        ManagementInformationSocialConflictSensibleComponent,
        CreateEditRiskInformationSocialConflictSensibleComponent,
        RiskInformationSocialConflictSensibleComponent,
        CreateEditStateInformationSocialConflictSensibleComponent,
        StateInformationSocialConflictSensibleComponent,
        CreateEditSugerenceInformationSocialConflictSensibleComponent,
        SugerenceInformationSocialConflictSensibleComponent,
        TaskInformationSocialConflictSensibleComponent,
        ResourceInformationSocialConflictSensibleComponent,
        NoteInformationSocialConflictSensibleComponent,
        //Alert History
        SocialConflictAlertHistoryComponent,
        //Records
        RecordComponent,
        CreateEditRecordComponent,
        //Compromises
        CompromiseComponent,
        CreateEditCompromiseComponent,
        CompromiseGeneralInformationComponent,
        CompromiseInvolvedComponent,
        CompromiseResponsibleActorComponent,
        CompromiseResponsibleActorOldComponent,
        CompromiseTracingComponent,
        CompromisePipComponent,
        CompromiseTaskManagementComponent,
        CompromisePhaseMilestoneInformationComponent,
        CompromiseCreateEditPhaseMilestoneModalComponent,
        //Task Managements
        TaskManagementComponent,
        TaskListComponent,
        TaskCalendarComponent,
        TaskBoardComponent,
        TaskSelectionComponent,
        TaskExpandDeadlineComponent,
        TaskPersonComponent,
        TaskManagementSenderComponent,
        TaskManagementEmailComponent,
        TaskManagementHistoryComponent,
        //Social Conflict Task Managements
        SocialConflictTaskManagementComponent,
        SocialConflictTaskManagementListComponent,
        SocialConflictTaskManagementCalendarComponent,
        SocialConflictTaskManagementSelectionComponent,
        SocialConflictTaskManagementBoardComponent,
        SocialConflictTaskManagementPersonComponent,
        SocialConflictTaskManagementExpandDeadlineComponent,
        SocialConflictTaskManagementSenderComponent,
        SocialConflictTaskManagementEmailComponent,
        SocialConflictTaskManagementHistoryComponent,
        //Help Memory
        HelpMemoryComponent,
        CreateEditHelpMemoryComponent,
        GeneralInformationHelpMemoryComponent,

        OrderComponent,
        CreateEditOrderComponent,
        ComplianceComponent,
        ComplianceStateComponent,
        ActorListComponent,
        LogoutComponent
    ],
    exports: [
    ],
    providers: [
        TreeDragDropService,
        { provide: BsDatepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerConfig },
        { provide: BsDaterangepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDaterangepickerConfig },
        { provide: BsLocaleService, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerLocale },
        { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
    ]
})
export class ApplicationModule { }
