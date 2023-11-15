import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '@shared/utils/utils.module';
import { BsDatepickerConfig, BsDatepickerModule, BsDaterangepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FileResourceItemComponent } from './file-resource-item/file-resource-item.component';
import { FileUploaderItemComponent } from './file-uploader-item/file-uploader-item.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { FindSocialConflictComponent } from './find-social-conflict/find-social-conflict.component';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { NgxBootstrapDatePickerConfigService } from 'assets/ngx-bootstrap/ngx-bootstrap-datepicker-config.service';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AutoCompleteModule, ContextMenuModule, DragDropModule, DropdownModule, EditorModule, InputMaskModule, InputTextareaModule, TooltipModule, TreeModule } from 'primeng';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppCommonModule } from '@app/shared/common/app-common.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import CountoModule from 'angular2-counto';
import { TextMaskModule } from 'angular2-text-mask';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AppBsModalModule } from '@shared/common/appBsModal/app-bs-modal.module';
import { ButtonModule } from 'primeng/button';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FindRecordComponent } from './find-record/find-record.component';
import { AppSpinnerComponent } from './app-spinner/app-spinner.component';
import { FindDinamicVariableModalComponent } from './find-dinamic-variable/find-dinamic-variable.component';
import { FindStaticVariableModalComponent } from './find-static-variable/find-static-variablecomponent';
import { FindPersonComponent } from './find-person/find-person.component';
import { FileDownloadComponent } from './file-download/file-download.component';
import { FindDirectoryGovernmentComponent } from './find-directory-government/find-directory-government.component';
import { FindConflictComponent } from './find-conflict/find-conflict.component';
import { FindInterventionPlanComponent } from './find-intervention-plan/find-intervention-plan.component';
import { FindDirectoryIndustryComponent } from './find-directory-industry/find-directory-industry.component';
import { FileDownloadRequestComponent } from './file-download-request/file-download-request.component';
import { FindActorComponent } from './find-actor/find-actor.component';
import { AuditComponent } from './audit/audit.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    // suppressScrollX: true
};

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ModalModule,
        TabsModule,
        PopoverModule,
        BsDropdownModule,
        BsDatepickerModule,
        UtilsModule,
        AppCommonModule,
        TableModule,
        TreeModule,
        DragDropModule,
        ContextMenuModule,
        PaginatorModule,
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
        InputTextareaModule,
        ButtonModule
    ],
    exports: [
        FileUploaderComponent,
        FileUploaderItemComponent,
        FileResourceItemComponent,
        FindSocialConflictComponent,
        FindDinamicVariableModalComponent,
        FileUploadComponent,
        FindRecordComponent,
        FindStaticVariableModalComponent,
        AppSpinnerComponent,
        FindPersonComponent,
        FileDownloadComponent,
        FindDirectoryGovernmentComponent,
        FindConflictComponent,
        FindInterventionPlanComponent,
        FindDirectoryIndustryComponent,
        FileDownloadRequestComponent,
        FindActorComponent,
        AuditComponent
    ],
    declarations: [
        FileUploaderComponent,
        FileUploaderItemComponent,
        FileResourceItemComponent,
        FindSocialConflictComponent,
        FindDinamicVariableModalComponent,
        FileUploadComponent,
        FindRecordComponent,
        FindStaticVariableModalComponent,
        AppSpinnerComponent,
        FindPersonComponent,
        FileDownloadComponent,
        FindDirectoryGovernmentComponent,
        FindConflictComponent,
        FindInterventionPlanComponent,
        FindDirectoryIndustryComponent,
        FileDownloadRequestComponent,
        FindActorComponent,
        AuditComponent
    ],
    providers: [
        { provide: BsDatepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerConfig },
        { provide: BsDaterangepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDaterangepickerConfig },
        { provide: BsLocaleService, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerLocale },
        { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
    ],
})
export class ComponentModule { }
