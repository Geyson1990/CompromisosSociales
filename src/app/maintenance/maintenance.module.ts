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

// Metronic
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AppBsModalModule } from '@shared/common/appBsModal/app-bs-modal.module';

import { MaintenanceRoutingModule } from './maintenance-routing.module';

import { UbigeoComponent } from './ubigeo/ubigeo.component';
import { CreateEditDepartmentComponent } from './ubigeo/create-edit-department/create-edit-department.component';
import { CreateEditProvinceComponent } from './ubigeo/create-edit-province/create-edit-province.component';
import { CreateEditDistrictComponent } from './ubigeo/create-edit-district/create-edit-district.component';
import { ResponsibleActorComponent } from './responsible-actor/responsible-actor.component';
import { CreateEditResponsibleActorComponent } from './responsible-actor/create-edit-responsible-actor/create-edit-responsible-actor.component';
import { CreateEditSubResponsibleActorComponent } from './responsible-actor/create-edit-responsible-subactor/create-edit-responsible-subactor.component';
import { TerritorialUnitComponent } from './territorial-unit/territorial-unit.component';
import { CreateEditTerritorialUnitComponent } from './territorial-unit/create-edit-territorial-unit/create-edit-territorial-unit.component';
import { FindTerritorialUnitDepartmentComponent } from './territorial-unit/find-territorial-unit/find-territorial-unit-department.component';
import { TypologyComponent } from './typology/typology.component';
import { CreateEditTypologyComponent } from './typology/create-edit-typology/create-edit-typology.component';
import { CreateEditSubTypologyComponent } from './typology/create-edit-sub-typology/create-edit-sub-typology.component';
import { RiskComponent } from './risk/risk.component';
import { CreateEditRiskComponent } from './risk/create-edit-risk/create-edit-risk.component';
import { ColorPickerModule } from 'primeng';
import { FactComponent } from './fact/fact.component';
import { CreateEditFactComponent } from './fact/create-edit-fact/create-edit-fact.component';
import { SectorComponent } from './sector/sector.component';
import { CreateEditSectorComponent } from './sector/create-edit-sector/create-edit-sector.component';
import { ManagementComponent } from './management/management.component';
import { CreateEditManagementComponent } from './management/create-edit-management/create-edit-management';
import { ActorTypeComponent } from './actor-type/actor-type.component';
import { CreateEditActorTypeComponent } from './actor-type/create-edit-actor-type/create-edit-actor-type';
import { ActorMovementComponent } from './actor-movement/actor-movement.component';
import { CreateEditActorMovementComponent } from './actor-movement/create-edit-actor-movement/create-edit-actor-movement.component';
import { AnalystComponent } from './analyst/analyst.component';
import { CreateEditAnalystComponent } from './analyst/create-edit-analyst/create-edit-analyst.component';
import { ManagerComponent } from './manager/manager.component';
import { CreateEditManagerComponent } from './manager/create-edit-manager/create-edit-manager.component';
import { CoordinatorComponent } from './coordinator/coordinator.component';
import { CreateEditCoordinatorComponent } from './coordinator/create-edit-coordinator/create-edit-coordinator.component';
import { CreateEditAlertRiskComponent } from './alert-risk/create-edit-alert-risk/create-edit-alert-risk.component';
import { AlertRiskComponent } from './alert-risk/alert-risk.component';
import { CreateEditAlertSectorComponent } from './alert-sector/create-edit-alert-sector/create-edit-alert-sector.component';
import { AlertSectorComponent } from './alert-sector/alert-sector.component';
import { CreateEditAlertSealComponent } from './alert-seal/create-edit-alert-seal/create-edit-alert-seal.component';
import { AlertSealComponent } from './alert-seal/alert-seal.component';
import { AlertDemandComponent } from './alert-demand/alert-demand.component';
import { CreateEditAlertDemandComponent } from './alert-demand/create-edit-alert-demand/create-edit-alert-demand.component';
import { AlertResponsibleComponent } from './alert-responsible/alert-responsible.component';
import { CreateEditAlertResponsibleComponent } from './alert-responsible/create-edit-alert-responsible/create-edit-alert-responsible.component';
import { CreateEditRegionComponent } from './region/create-edit-region/create-edit-region.component';
import { RegionComponent } from './region/region.component';
import { DirectoryGovernmentComponent } from './directory-government/directory-government.component';
import { CreateEditDirectoryGovernmentComponent } from './directory-government/create-edit-directory-government/create-edit-directory-government';
import { DirectorySectorComponent } from './directory-sector/directory-sector.component';
import { CreateEditDirectorySectorComponent } from './directory-sector/create-edit-sector/create-edit-directory-sector.component';
import { DirectoryResponsibleComponent } from './directory-responsible/directory-responsible.component';
import { CreateEditDirectoryResponsibleComponent } from './directory-responsible/create-edit-directory-responsible/create-edit-directory-responsible.component';
import { DirectoryGovernmentSectorComponent } from './directory-government-sector/directory-government-sector.component';
import { CreateEditDirectoryGovernmentSectorComponent } from './directory-government-sector/create-edit-government-sector/create-edit-government-sector.component';
import { ComponentModule } from '@shared/component/component.module';
import { DirectoryDialogComponent } from './directory-dialog/directory-dialog.component';
import { CreateEditDirectoryDialogComponent } from './directory-dialog/create-edit-directory-dialog/create-edit-directory-dialog.component';
import { DirectoryIndustryComponent } from './directory-industry/directory-industry.component';
import { CreateEditDirectoryIndustryComponent } from './directory-industry/create-edit-directory-industry/create-edit-directory-industry.component';
import { FindTerritorialUnitPersonComponent } from './territorial-unit/find-person/find-territorial-unit-person.component';
import { FindCoordinatorTerritorialUnitComponent } from './coordinator/find-territorial-unit/find-territorial-unit.component';
import { DirectoryGovernmentLevelComponent } from './directory-government-level/directory-government-level.component';
import { CreateEditDirectoryGovernmentLevelComponent } from './directory-government-level/create-edit-government-level/create-edit-directory-government-level.component';
import { DirectoryConflictTypeComponent } from './directory-conflict-type/directory-conflict-type.component';
import { CreateEditDirectoryConflictTypeComponent } from './directory-conflict-type/create-edit-conflict-type/create-edit-directory-conflict-type.component';
import { PhaseComponent } from './phase/phase.component';
import { CreateEditPhaseModalComponent } from './phase/create-edit-phase/create-edit-phase.component';
import { CreateEditMilestoneModalComponent } from './phase/create-edit-milestone/create-edit-milestone.component';
import { InterventionPlanOptionComponent } from './intervention-plan-option/actor-movement.component';
import { CreateEditInterventionPlanOptionComponent } from './intervention-plan-option/create-edit-intervention-plan-option/create-edit-intervention-plan-option.component';
import { InterventionPlanActivityComponent } from './intervention-plan-activity/intervention-plan-activity.component';
import { CreateEditInterventionPlanActivityComponent } from './intervention-plan-activity/create-edit-intervention-plan-activity/create-edit-intervention-plan-activity.component';
import { InterventionPlanEntityComponent } from './intervention-plan-entity/intervention-plan-entity.component';
import { CreateEditInterventionPlanEntityComponent } from './intervention-plan-entity/create-edit-intervention-plan-entity/create-edit-intervention-plan-entity.component';
import { InterventionPlanRoleComponent } from './intervention-plan-role/intervention-plan-role.component';
import { CreateEditInterventionPlanRoleComponent } from './intervention-plan-role/create-edit-intervention-plan-role/create-edit-intervention-plan-role.component';
import { CrisisCommitteeJobComponent } from './crisis-committee-jobs/crisis-committee-job.component';
import { CreateEditCrisisCommitteeJobComponent } from './crisis-committee-jobs/create-edit-crisis-committee-job/create-edit-crisis-committee-job.component';
import { CompromiseLabelComponent } from './compromise-label/compromise-label.component';
import { CreateEditCompromiseLabelComponent } from './compromise-label/create-edit-compromise-label/create-edit-compromise-label.component';
import { ResponsibleTypeComponent } from './responsible-type/responsible-type.component';
import { CreateEditResponsibleTypeComponent } from './responsible-type/create-edit-responsible-type/create-edit-responsible-type.component';
import { CreateEditResponsibleSubTypeComponent } from './responsible-type/create-edit-responsible-subtype/create-edit-responsible-subtype.component';
import { DirectoryGovernmentTypeComponent } from './directory-government-type/directory-government-type.component';
import { CreateEditDirectoryGovernmentTypeComponent } from './directory-government-type/create-edit-directory-government-type/create-edit-directory-government-type.component';
import { RecordResourceTypeComponent } from './record-resource-type/record-resource-type.component';
import { CreateEditRecordResourceTypeComponent } from './record-resource-type/create-edit-record-resource-type/create-edit-record-resource-type.component';
import { CompromiseStateComponent } from './compromise-state/compromise-state.component';
import { CreateEditCompromiseStateComponent } from './compromise-state/create-edit-state/create-edit-state.component';
import { CreateEditCompromiseSubStateComponent } from './compromise-state/create-edit-sub-state/create-edit-sub-state.component';
import { DialogSpaceDocumentTypeComponent } from './dialog-space-document-type/dialog-space-document-type.component';
import { CreateEditDialogSpaceDocumentTypeComponent } from './dialog-space-document-type/create-edit-dialog-space-document-type/create-edit-dialog-space-document-type.component';
import { DialogSpaceHolidayComponent } from './dialog-space-holiday/dialog-space-holiday.component';
import { CreateEditDialogSpaceHolidayComponent } from './dialog-space-holiday/create-edit-dialog-space-holiday/create-edit-dialog-space-holiday.component';
import { DialogSpaceTypeComponent } from './dialog-space-type/dialog-space-type.component';
import { CreateEditDialogSpaceTypeComponent } from './dialog-space-type/create-edit-dialog-space-type/create-edit-dialog-space-type.component';
import { DialogSpaceDocumentSituationComponent } from './dialog-space-document-situation/dialog-space-document-situation.component';
import { CreateEditDialogSpaceDocumentSituationComponent } from './dialog-space-document-situation/create-edit-dialog-space-document-situation/create-edit-dialog-space-document-situation.component';
import { CreateEditActorComponent } from './actor/create-edit-actor/create-edit-actor';
import { ActorComponent } from './actor/actor.component';

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
        MaintenanceRoutingModule,
        ColorPickerModule,
        ComponentModule
    ],
    declarations: [
        UbigeoComponent,
        CreateEditDepartmentComponent,
        CreateEditProvinceComponent,
        CreateEditDistrictComponent,
        ResponsibleActorComponent,
        CreateEditResponsibleActorComponent,
        CreateEditSubResponsibleActorComponent,
        TerritorialUnitComponent,
        CreateEditTerritorialUnitComponent,
        FindTerritorialUnitDepartmentComponent,
        FindTerritorialUnitPersonComponent,
        TypologyComponent,
        CreateEditTypologyComponent,
        CreateEditSubTypologyComponent,
        RiskComponent,
        CreateEditRiskComponent,
        FactComponent,
        CreateEditFactComponent,
        SectorComponent,
        CreateEditSectorComponent,
        ManagementComponent,
        CreateEditManagementComponent,
        ActorTypeComponent,
        CreateEditActorTypeComponent,
        ActorMovementComponent,
        CreateEditActorMovementComponent,
        AnalystComponent,
        CreateEditAnalystComponent,
        CoordinatorComponent,
        CreateEditCoordinatorComponent,
        FindCoordinatorTerritorialUnitComponent,
        ManagerComponent,
        CreateEditManagerComponent,
        AlertRiskComponent,
        CreateEditAlertRiskComponent,
        AlertSectorComponent,
        CreateEditAlertSectorComponent,
        AlertSealComponent,
        CreateEditAlertSealComponent,
        AlertDemandComponent,
        CreateEditAlertDemandComponent,
        AlertResponsibleComponent,
        CreateEditAlertResponsibleComponent,
        RegionComponent,
        CreateEditRegionComponent,
        DirectoryGovernmentComponent,
        CreateEditDirectoryGovernmentComponent,
        DirectorySectorComponent,
        CreateEditDirectorySectorComponent,
        DirectoryResponsibleComponent,
        CreateEditDirectoryResponsibleComponent,
        DirectoryGovernmentSectorComponent,
        CreateEditDirectoryGovernmentSectorComponent,
        DirectoryDialogComponent,
        CreateEditDirectoryDialogComponent,
        DirectoryIndustryComponent,
        CreateEditDirectoryIndustryComponent,
        DirectoryGovernmentLevelComponent,
        CreateEditDirectoryGovernmentLevelComponent,
        DirectoryConflictTypeComponent,
        CreateEditDirectoryConflictTypeComponent,
        PhaseComponent,
        CreateEditPhaseModalComponent,
        CreateEditMilestoneModalComponent,
        InterventionPlanOptionComponent,
        CreateEditInterventionPlanOptionComponent,
        InterventionPlanActivityComponent,
        CreateEditInterventionPlanActivityComponent,
        InterventionPlanEntityComponent,
        CreateEditInterventionPlanEntityComponent,
        InterventionPlanRoleComponent,
        CreateEditInterventionPlanRoleComponent,
        CrisisCommitteeJobComponent,
        CreateEditCrisisCommitteeJobComponent,
        CompromiseLabelComponent,
        CreateEditCompromiseLabelComponent,
        ResponsibleTypeComponent,
        CreateEditResponsibleTypeComponent,
        CreateEditResponsibleSubTypeComponent,
        DirectoryGovernmentTypeComponent,
        CreateEditDirectoryGovernmentTypeComponent,
        RecordResourceTypeComponent,
        CreateEditRecordResourceTypeComponent,
        CompromiseStateComponent,
        CreateEditCompromiseStateComponent,
        CreateEditCompromiseSubStateComponent,
        DialogSpaceDocumentTypeComponent,
        CreateEditDialogSpaceDocumentTypeComponent,
        DialogSpaceHolidayComponent,
        CreateEditDialogSpaceHolidayComponent,
        DialogSpaceTypeComponent,
        CreateEditDialogSpaceTypeComponent,
        DialogSpaceDocumentSituationComponent,
        CreateEditDialogSpaceDocumentSituationComponent,
        ActorComponent,
        CreateEditActorComponent
    ],
    providers: [
        TreeDragDropService,
        { provide: BsDatepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerConfig },
        { provide: BsDaterangepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDaterangepickerConfig },
        { provide: BsLocaleService, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerLocale },
        { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
    ]
})
export class MaintenanceModule { }
