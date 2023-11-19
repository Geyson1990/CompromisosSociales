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

import { ColorPickerModule, TabViewModule } from 'primeng';
import { ComponentModule } from '@shared/component/component.module';
import { ConflictToolsRoutingModule } from './conflict-tools.routing.module';
import { CrisisCommitteeComponent } from './crisis-committee/crisis-committee.component';
import { CreateEditCrisisCommitteeComponent } from './crisis-committee/create-edit-crisis-committee/create-edit-crisis-committee.component';
import { GeneralInformationCrisisCommitteeComponent } from './crisis-committee/create-edit-crisis-committee/general-information/general-information.component';
import { PlanInformationCrisisCommitteeComponent } from './crisis-committee/create-edit-crisis-committee/plan-information/plan-information.component';
import { CreateEditPlanInformationCrisisCommitteeComponent } from './crisis-committee/create-edit-crisis-committee/plan-information/create-edit-plan-information/create-edit-plan-information.component';
import { ActionInformationCrisisCommitteeComponent } from './crisis-committee/create-edit-crisis-committee/action-information/action-information.component';
import { CreateEditActionInformationCrisisCommitteeComponent } from './crisis-committee/create-edit-crisis-committee/action-information/create-edit-action-information/create-edit-action-information.component';
import { MessageInformationCrisisCommitteeComponent } from './crisis-committee/create-edit-crisis-committee/message-information/message-information.component';
import { CreateEditMessageInformationCrisisCommitteeComponent } from './crisis-committee/create-edit-crisis-committee/message-information/create-edit-message-information/create-edit-message-information.component';
import { ChannelInformationCrisisCommitteeComponent } from './crisis-committee/create-edit-crisis-committee/channel-information/channel-information.component';
import { CreateEditChannelInformationCrisisCommitteeComponent } from './crisis-committee/create-edit-crisis-committee/channel-information/create-edit-channel-information/create-edit-channel-information.component';
import { SectorInformationCrisisCommitteeComponent } from './crisis-committee/create-edit-crisis-committee/sector-information/sector-information.component';
import { CreateEditSectorInformationCrisisCommitteeComponent } from './crisis-committee/create-edit-crisis-committee/sector-information/create-edit-sector-information/create-edit-sector-information.component';
import { AgreementInformationCrisisCommitteeComponent } from './crisis-committee/create-edit-crisis-committee/agreement-information/agreement-information.component';
import { CreateEditAgreementInformationCrisisCommitteeComponent } from './crisis-committee/create-edit-crisis-committee/agreement-information/create-edit-agreement-information/create-edit-agreement-information.component';
import { TaskInformationCrisisCommitteeComponent } from './crisis-committee/create-edit-crisis-committee/task-information/task-information.component';
import { CreateEditTaskInformationCrisisCommitteeComponent } from './crisis-committee/create-edit-crisis-committee/task-information/create-edit-task-information/create-edit-task-information.component';
import { CreateEditGeneralInformationCrisisCommitteeComponent } from './crisis-committee/create-edit-crisis-committee/general-information/create-edit-general-information/create-edit-general-information.component';
import { SocialConflictReportComponent } from './social-conflict-report/social-conflict-report.component';

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
        ConflictToolsRoutingModule,
        ColorPickerModule,
        ComponentModule,
        TabViewModule
    ],
    declarations: [
        //Crisis Committe
        CrisisCommitteeComponent,
        CreateEditCrisisCommitteeComponent,
        GeneralInformationCrisisCommitteeComponent,
        PlanInformationCrisisCommitteeComponent,
        CreateEditPlanInformationCrisisCommitteeComponent,
        ActionInformationCrisisCommitteeComponent,
        CreateEditActionInformationCrisisCommitteeComponent,
        MessageInformationCrisisCommitteeComponent,
        CreateEditMessageInformationCrisisCommitteeComponent,
        ChannelInformationCrisisCommitteeComponent,
        CreateEditChannelInformationCrisisCommitteeComponent,
        SectorInformationCrisisCommitteeComponent,
        CreateEditSectorInformationCrisisCommitteeComponent,
        AgreementInformationCrisisCommitteeComponent,
        CreateEditAgreementInformationCrisisCommitteeComponent,
        TaskInformationCrisisCommitteeComponent,
        CreateEditTaskInformationCrisisCommitteeComponent,
        CreateEditGeneralInformationCrisisCommitteeComponent,
        SocialConflictReportComponent
    ],
    providers: [
        TreeDragDropService,
        { provide: BsDatepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerConfig },
        { provide: BsDaterangepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDaterangepickerConfig },
        { provide: BsLocaleService, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerLocale },
        { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
    ]
})
export class ConflictToolsModule { }
