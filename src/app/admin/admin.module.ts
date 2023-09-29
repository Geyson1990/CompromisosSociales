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
import { AdminRoutingModule } from './admin-routing.module';
import { AuditLogDetailModalComponent } from './audit-logs/audit-log-detail-modal.component';
import { AuditLogsComponent } from './audit-logs/audit-logs.component';
import { HostDashboardComponent } from './dashboard/host-dashboard.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { CreateOrEditRoleModalComponent } from './roles/create-or-edit-role-modal.component';
import { RolesComponent } from './roles/roles.component';
import { TenantSettingsComponent } from './settings/tenant-settings.component';
import { OrganizationUnitsTreeComponent } from './shared/organization-unit-tree.component';
import { PermissionComboComponent } from './shared/permission-combo.component';
import { PermissionTreeComponent } from './shared/permission-tree.component';
import { CreateEditUserModalComponent } from './users/create-edit-user/create-edit-user.component';
import { ImpersonationService } from './users/impersonation.service';
import { UsersComponent } from './users/users.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CountoModule } from 'angular2-counto';
import { TextMaskModule } from 'angular2-text-mask';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxBootstrapDatePickerConfigService } from 'assets/ngx-bootstrap/ngx-bootstrap-datepicker-config.service';
import { DropdownModule } from 'primeng/dropdown';

// Metronic
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AppBsModalModule } from '@shared/common/appBsModal/app-bs-modal.module';
import { ComponentModule } from '@shared/component/component.module';
import { AssignConflictUserComponent } from './users/assing-conflict-user/assign-conflict-user.component';

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
        AdminRoutingModule,
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
        ComponentModule
    ],
    declarations: [
        UsersComponent,
        PermissionComboComponent,
        CreateEditUserModalComponent,
        AssignConflictUserComponent,
        PermissionTreeComponent,
        OrganizationUnitsTreeComponent,
        RolesComponent,
        CreateOrEditRoleModalComponent,
        AuditLogsComponent,
        AuditLogDetailModalComponent,
        MaintenanceComponent,
        TenantSettingsComponent,
        HostDashboardComponent
    ],
    providers: [
        ImpersonationService,
        TreeDragDropService,
        { provide: BsDatepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerConfig },
        { provide: BsDaterangepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDaterangepickerConfig },
        { provide: BsLocaleService, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerLocale },
        { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
    ]
})
export class AdminModule { }
