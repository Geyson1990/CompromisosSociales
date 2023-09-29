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
import { ProjectRiskComponent } from './project-risk/project-risk.component';
import { ProspectiveRiskComponent } from './prospective-risk/prospective-risk.component';
import { ManagementRoutingModule } from './management-routing.module';
import { DinamicVariableComponent } from './dinamic-variable/dinamic-variable.component';
import { StaticVariableComponent } from './static-variable/static-variable.component';
import { CreateEditDinamicVariableComponent } from './dinamic-variable/create-edit-dinamic-variable/create-edit-dinamic-variable.component';
import { CreateEditStaticVariableComponent } from './static-variable/create-edit-static-variable/create-edit-static-variable.component';
import { CreateEditOptionVariableModalComponent } from './static-variable/create-edit-option-variable/create-edit-option-variable.component';
import { ComponentModule } from '@shared/component/component.module';
import { CreateEditProspectiveRiskComponent } from './prospective-risk/create-edit-prospective-risk/create-edit-prospective-risk.component';
import { GeneralInformationProspectiveRiskComponent } from './prospective-risk/create-edit-prospective-risk/general-information/general-information.component';
import { CreateEditProjectStageComponent } from './project-stage/create-edit-project-stage/create-edit-project-stage.component';
import { ProjectStageComponent } from './project-stage/project-stage.component';
import { CreateEditProjectRiskComponent } from './project-risk/create-edit-project-risk/create-edit-project-risk.component';
import { GeneralInformationProjectRiskComponent } from './project-risk/create-edit-project-risk/general-information/general-information.component';
import { VariableDetailProjectRiskComponent } from './project-risk/create-edit-project-risk/variable-detail/variable-detail.component';
import { DetailBoxProjectRiskComponent } from './project-risk/create-edit-project-risk/detail-box/detail-box.component';
import { ProspectiveRiskHistoryComponent } from './prospective-risk/create-edit-prospective-risk/history-information/history-information.component';
import { ProspectiveRiskHistoryDetailComponent } from './prospective-risk/create-edit-prospective-risk/history-detail/history-detail.component';
import { ProjectRiskHistoryComponent } from './project-risk/create-edit-project-risk/history-information/history-information.component';
import { ProjectRiskHistoryDetailComponent } from './project-risk/create-edit-project-risk/history-detail/history-detail.component';

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
        ComponentModule,
        ManagementRoutingModule
    ],
    declarations: [
        ProspectiveRiskComponent,
        CreateEditProspectiveRiskComponent,
        GeneralInformationProspectiveRiskComponent,
        ProspectiveRiskHistoryComponent,
        ProspectiveRiskHistoryDetailComponent,
        ProjectRiskComponent,
        CreateEditProjectRiskComponent,
        GeneralInformationProjectRiskComponent,
        VariableDetailProjectRiskComponent,
        ProjectRiskHistoryComponent,
        ProjectRiskHistoryDetailComponent,
        DetailBoxProjectRiskComponent,
        DinamicVariableComponent,
        CreateEditDinamicVariableComponent,
        StaticVariableComponent,
        CreateEditStaticVariableComponent,
        CreateEditOptionVariableModalComponent,
        ProjectStageComponent,
        CreateEditProjectStageComponent
    ],
    providers: [
        TreeDragDropService,
        { provide: BsDatepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerConfig },
        { provide: BsDaterangepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDaterangepickerConfig },
        { provide: BsLocaleService, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerLocale },
        { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
    ]
})
export class ManagementModule { }
