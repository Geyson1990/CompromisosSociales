import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutoFocusDirective } from './auto-focus.directive';
import { BusyIfDirective } from './busy-if.directive';
import { ButtonBusyDirective } from './button-busy.directive';
import { FileDownloadService } from './file-download.service';
import { FriendProfilePictureComponent } from './friend-profile-picture.component';
import { LocalStorageService } from './local-storage.service';
import { MomentFormatPipe } from '../common/pipes/moment-format.pipe';
import { MomentFromNowPipe } from '../common/pipes/moment-from-now.pipe';
import { ValidationMessagesComponent } from './validation-messages.component';
import { EqualValidator } from './validation/equal-validator.directive';
import { PasswordComplexityValidator } from './validation/password-complexity-validator.directive';
import { NullDefaultValueDirective } from './null-value.directive';
import { ScriptLoaderService } from './script-loader.service';
import { StyleLoaderService } from './style-loader.service';
import { ArrayToTreeConverterService } from './array-to-tree-converter.service';
import { TreeDataHelperService } from './tree-data-helper.service';
import { LocalizePipe } from '@shared/common/pipes/localize.pipe';
import { PermissionPipe } from '@shared/common/pipes/permission.pipe';
import { PermissionAnyPipe } from '@shared/common/pipes/permission-any.pipe';
import { PermissionAllPipe } from '@shared/common/pipes/permission-all.pipe';
import { FeatureCheckerPipe } from '@shared/common/pipes/feature-checker.pipe';
import { DatePickerMomentModifierDirective } from './date-picker-moment-modifier.directive';
import { DateRangePickerMomentModifierDirective } from './date-range-picker-moment-modifier.directive';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { WeekFormatPipe } from './week-pipe';
import { CdkTextareaAutosize } from './autosize.directive';
import { ChartModule } from 'primeng/chart';
import { PrimaryLevelPipe } from '@shared/common/pipes/primary-level.pipe';
import { SecondaryLevelPipe } from '@shared/common/pipes/secondary-level.pipe';
import { ImpactProbabilityLevelPipe } from '@shared/common/pipes/impact-probability-level.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { PersonTypePipe } from './person-type.pipe';
import { SafeResourcePipe } from './safe-resource.pipe';

@NgModule({
    imports: [
        CommonModule,
        TabViewModule,
        CheckboxModule,
        ChartModule
    ],
    providers: [
        FileDownloadService,
        LocalStorageService,
        ScriptLoaderService,
        StyleLoaderService,
        ArrayToTreeConverterService,
        TreeDataHelperService
    ],
    declarations: [
        EqualValidator,
        PasswordComplexityValidator,
        ButtonBusyDirective,
        AutoFocusDirective,
        BusyIfDirective,
        FriendProfilePictureComponent,
        MomentFormatPipe,
        MomentFromNowPipe,
        ImpactProbabilityLevelPipe,
        ValidationMessagesComponent,
        NullDefaultValueDirective,
        LocalizePipe,
        PermissionPipe,
        PermissionAnyPipe,
        FeatureCheckerPipe,
        DatePickerMomentModifierDirective,
        DateRangePickerMomentModifierDirective,
        PermissionAllPipe,
        WeekFormatPipe,
        CdkTextareaAutosize,
        PrimaryLevelPipe,
        SecondaryLevelPipe,
        SafeHtmlPipe,
        PersonTypePipe,
        SafeResourcePipe
    ],
    exports: [
        ChartModule,
        EqualValidator,
        PasswordComplexityValidator,
        ButtonBusyDirective,
        AutoFocusDirective,
        BusyIfDirective,
        ImpactProbabilityLevelPipe,
        FriendProfilePictureComponent,
        MomentFormatPipe,
        MomentFromNowPipe,
        ValidationMessagesComponent,
        NullDefaultValueDirective,
        LocalizePipe,
        PermissionPipe,
        PermissionAnyPipe,
        FeatureCheckerPipe,
        DatePickerMomentModifierDirective,
        DateRangePickerMomentModifierDirective,
        PermissionAllPipe,
        TabViewModule,
        CheckboxModule,
        WeekFormatPipe,
        CdkTextareaAutosize,
        PrimaryLevelPipe,
        SecondaryLevelPipe,
        SafeHtmlPipe,
        PersonTypePipe,
        SafeResourcePipe
    ]
})
export class UtilsModule { }
