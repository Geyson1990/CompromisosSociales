import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppLocalizationService } from '@app/shared/common/localization/app-localization.service';
import { AppNavigationService } from '@app/shared/layout/nav/app-navigation.service';
import { ContableCommonModule } from '@shared/common/common.module';
import { UtilsModule } from '@shared/utils/utils.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule, BsDatepickerConfig, BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { AppAuthService } from './auth/app-auth.service';
import { AppRouteGuard } from './auth/auth-route-guard';
import { CommonLookupModalComponent } from './lookup/common-lookup-modal.component';
import { EntityTypeHistoryModalComponent } from './entityHistory/entity-type-history-modal.component';
import { EntityChangeDetailModalComponent } from './entityHistory/entity-change-detail-modal.component';
import { DateRangePickerInitialValueSetterDirective } from './timing/date-range-picker-initial-value.directive';
import { DatePickerInitialValueSetterDirective } from './timing/date-picker-initial-value.directive';
import { DateTimeService } from './timing/date-time.service';
import { TimeZoneComboComponent } from './timing/timezone-combo.component';
import { GridsterModule } from 'angular-gridster2';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxBootstrapDatePickerConfigService } from 'assets/ngx-bootstrap/ngx-bootstrap-datepicker-config.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CountoModule } from 'angular2-counto';
import { AppBsModalModule } from '@shared/common/appBsModal/app-bs-modal.module';
import { SingleLineStringInputTypeComponent } from './input-types/single-line-string-input-type/single-line-string-input-type.component';
import { ComboboxInputTypeComponent } from './input-types/combobox-input-type/combobox-input-type.component';
import { CheckboxInputTypeComponent } from './input-types/checkbox-input-type/checkbox-input-type.component';
import { MultipleSelectComboboxInputTypeComponent } from './input-types/multiple-select-combobox-input-type/multiple-select-combobox-input-type.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PasswordInputWithShowButtonComponent } from './password-input-with-show-button/password-input-with-show-button.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FullCalendarModule } from 'primeng/fullcalendar';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        UtilsModule,
        ContableCommonModule,
        TableModule,
        PaginatorModule,
        GridsterModule,
        TabsModule.forRoot(),
        BsDropdownModule.forRoot(),
        NgxChartsModule,
        BsDatepickerModule.forRoot(),
        PerfectScrollbarModule,
        CountoModule,
        AppBsModalModule,
        AutoCompleteModule,
        DragDropModule,
        FullCalendarModule
    ],
    declarations: [
        TimeZoneComboComponent,
        CommonLookupModalComponent,
        EntityTypeHistoryModalComponent,
        EntityChangeDetailModalComponent,
        DateRangePickerInitialValueSetterDirective,
        DatePickerInitialValueSetterDirective,
        SingleLineStringInputTypeComponent,
        ComboboxInputTypeComponent,
        CheckboxInputTypeComponent,
        MultipleSelectComboboxInputTypeComponent,
        PasswordInputWithShowButtonComponent
    ],
    exports: [
        TimeZoneComboComponent,
        CommonLookupModalComponent,
        EntityTypeHistoryModalComponent,
        EntityChangeDetailModalComponent,
        DateRangePickerInitialValueSetterDirective,
        DatePickerInitialValueSetterDirective,
        NgxChartsModule,
        PasswordInputWithShowButtonComponent,
        DragDropModule,
        FullCalendarModule
    ],
    providers: [
        DateTimeService,
        AppLocalizationService,
        AppNavigationService,
        { provide: BsDatepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerConfig },
        { provide: BsDaterangepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDaterangepickerConfig }
    ],

    entryComponents: [
        SingleLineStringInputTypeComponent,
        ComboboxInputTypeComponent,
        CheckboxInputTypeComponent,
        MultipleSelectComboboxInputTypeComponent
    ]
})
export class AppCommonModule {
    static forRoot(): ModuleWithProviders<AppCommonModule> {
        return {
            ngModule: AppCommonModule,
            providers: [
                AppAuthService,
                AppRouteGuard
            ]
        };
    }
}
