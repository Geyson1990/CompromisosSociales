import {
    PermissionCheckerService,
    FeatureCheckerService,
    LocalizationService,
    MessageService,
    AbpMultiTenancyService,
    NotifyService,
    SettingService
} from 'abp-ng2-module';
import { Injector } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppUrlService } from '@shared/common/nav/app-url.service';
import { AppSessionService } from '@shared/common/session/app-session.service';
import { AppUiCustomizationService } from '@shared/common/ui/app-ui-customization.service';
import { PrimengTableHelper } from 'shared/helpers/PrimengTableHelper';
import { UiCustomizationSettingsDto } from '@shared/service-proxies/service-proxies';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerTextService } from '@app/shared/ngx-spinner-text.service';
import { Router } from '@angular/router';
import { LocaleSettings } from 'primeng';

export abstract class AppComponentBase {

    localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;

    es: LocaleSettings;
    localization: LocalizationService;
    permission: PermissionCheckerService;
    feature: FeatureCheckerService;
    notify: NotifyService;
    setting: SettingService;
    message: MessageService;
    multiTenancy: AbpMultiTenancyService;
    appSession: AppSessionService;
    primengTableHelper: PrimengTableHelper;
    ui: AppUiCustomizationService;
    appUrlService: AppUrlService;
    spinnerService: NgxSpinnerService;
    router: Router;
    backButtonText: string = '<';
    private ngxSpinnerTextService: NgxSpinnerTextService;

    constructor(injector: Injector) {
        this.localization = injector.get(LocalizationService);
        this.permission = injector.get(PermissionCheckerService);
        this.feature = injector.get(FeatureCheckerService);
        this.notify = injector.get(NotifyService);
        this.setting = injector.get(SettingService);
        this.message = injector.get(MessageService);
        this.multiTenancy = injector.get(AbpMultiTenancyService);
        this.appSession = injector.get(AppSessionService);
        this.ui = injector.get(AppUiCustomizationService);
        this.appUrlService = injector.get(AppUrlService);
        this.primengTableHelper = new PrimengTableHelper();
        this.spinnerService = injector.get(NgxSpinnerService);
        this.ngxSpinnerTextService = injector.get(NgxSpinnerTextService);
        this.router = injector.get(Router);
        this.es = {
            firstDayOfWeek: 1,
            dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
            dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
            dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
            monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
            today: 'Hoy',
            clear: 'Borrar'
        };
    }

    flattenDeep(array) {
        return array.reduce((acc, val) =>
            Array.isArray(val) ?
                acc.concat(this.flattenDeep(val)) :
                acc.concat(val),
            []);
    }

    l(key: string, ...args: any[]): string {
        args.unshift(key);
        args.unshift(this.localizationSourceName);
        return this.ls.apply(this, args);
    }

    ls(sourcename: string, key: string, ...args: any[]): string {
        let localizedText = this.localization.localize(key, sourcename);

        if (!localizedText) {
            localizedText = key;
        }

        if (!args || !args.length) {
            return localizedText;
        }

        args.unshift(localizedText);
        return abp.utils.formatString.apply(this, this.flattenDeep(args));
    }

    isGranted(permissionName: string): boolean {
        return this.permission.isGranted(permissionName);
    }

    isGrantedAny(...permissions: string[]): boolean {
        if (!permissions) {
            return false;
        }

        for (const permission of permissions) {
            if (this.isGranted(permission)) {
                return true;
            }
        }

        return false;
    }

    s(key: string): string {
        return abp.setting.get(key);
    }

    appRootUrl(): string {
        return this.appUrlService.appRootUrl;
    }

    get currentTheme(): UiCustomizationSettingsDto {
        return this.appSession.theme;
    }

    get containerClass(): string {
        if (this.appSession.theme.baseSettings.layout.layoutType === 'fluid') {
            return 'kt-container kt-container--fluid';
        }

        return 'kt-container';
    }

    showMainSpinner(text?: string): void {
        this.ngxSpinnerTextService.currentText = text;
        this.spinnerService.show();
    }

    changeMainSpinner(text?: string): void {
        this.ngxSpinnerTextService.currentText = text;
    }

    hideMainSpinner(text?: string): void {
        this.spinnerService.hide();
    }

    getQueryParameter(key: string): string {
        const parameters = new URLSearchParams(window.location.search);
        return parameters.get(key);
    }

    roundNumber(number: number, length: number): number {
        return +(Math.round((number + Number.EPSILON) * Math.pow(10, length)) / Math.pow(10, length)).toFixed(length);
    }

    formatNumber(number: number, length: number): string {
        return number.toLocaleString('en-US', { minimumFractionDigits: length, maximumFractionDigits: length });
    }

    isNullEmptyOrWhiteSpace(value: string): boolean {
        if (!value)
            return true;

        return value.trim().length == 0;
    }

    length(value: string): number {
        return value ? value.trim().length : 0;
    }

    calculateWeekRange(date: Date): string {
        if (!date)
            return '';

        const een_week = 1000 * 60 * 60 * 24 * 7;
        const d1ms = new Date().getTime();
        const d2ms = date.getTime();
        const verschilms = Math.abs(d1ms - d2ms);
        const weken = Math.floor(verschilms / een_week);

        return `${weken} semanas`;
    }

    formatDateISOString(date: Date) {
        let d = date.getDate();
        let m = date.getMonth() + 1; //Month from 0 to 11
        let y = date.getFullYear();
        return '' + y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + 'T00:00:00';
    }

    /**
     * <input (keypress)="keyPressWhiteSpace($event)"/>
     */
    keyPressWhiteSpace(event: any) {
        if (!(event.charCode >= 97 && event.charCode <= 122) &&
            !(event.charCode >= 65 && event.charCode <= 90) &&
            !(event.charCode >= 48 && event.charCode <= 57) &&
            event.charCode != 46 && event.charCode != 45 &&
            event.charCode != 64 && event.charCode != 95)
            event.preventDefault();
    }

    keyPressOnlyNumbers(event: any) {
        event = (event) ? event : window.event;
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault();
        }
    }

    keyPressPhoneNumber(event: any) {
        event = (event) ? event : window.event;
        var charCode = (event.which) ? event.which : event.keyCode;
        if ((charCode != 32 && charCode != 43 && charCode != 44 && charCode != 45) && (charCode < 48 || charCode > 57)) {
            event.preventDefault();
        }
    }

    /**
      * <input (keyup)="keyUpOnlyValidTex($event)"/>
      */
    keyUpOnlyValidTex(event: any) {
        event.target.value = event.target.value.replace(/[^a-zA-Z0-9-._@]/g, "");
    }

    /**
     * <input (keyup)="keyUpOnlyNumber($event)"/>
     */
    keyUpOnlyNumber(event: any) {
        event.target.value = this.zfillDecimal(event.target.value.replace(/[^0-9]/g, ""));
    }

    keyUpOnlyInteger(event: any) {
        event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }

    keyUpPhoneNumber(event: any) {
        event.target.value = event.target.value.replace(/[^0-9,+-.\s]/gm, "").replace(/\s\s+/g, "");
    }

    keyPressDecimal(event: any) {

        if ((((event.which != 44 && event.which != 46) || (event.which == this.divisorKey && event.target.value == '')) || event.target.value.indexOf(this.dotSeparator) != -1 || event.target.value.indexOf(this.commaSeparator) != -1) && (event.which < 48 || event.which > 57))
            event.preventDefault();

        const arrayNumbers: any[] = event.target.value.split(this.divisor);

        if (arrayNumbers.length > 1 && arrayNumbers[1].length >= this.decimalCount)
            event.preventDefault();
    }

    onFocus(event: any) {
        event.target.select();
    }

    keyUpDecimal(event: any) {
        event.target.value = this.zfillDecimal(event.target.value);
        this.completeKeyUp(event);
    }

    testEmail(email: string): boolean {
        return new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g).test(email);
    }

    private completeKeyUp(event: any) {
        if (event.key === 'Enter')
            event.target.blur();
    }

    private zfillDecimal(numbers: any) {
        const text: string = numbers.toString().replace(this.divisorReversed, this.divisor);

        if (text == this.divisor)
            return '';

        const array: string[] = Array.from(text);
        const index: number = text.lastIndexOf(this.divisor);

        if (index == -1) {
            const onlyzeros = array.findIndex(p => p != '0') == -1;

            return onlyzeros && array.length > 0 ? array[0] : text.replace(/\D|^0+/g, '');
        }

        const numbersLeft: string[] = array.slice(0, index).filter(p => p != this.divisor && p != this.divisorReversed);
        const numbersRight: string[] = array.slice(index).filter(p => p != this.divisor && p != this.divisorReversed);

        return numbersLeft.join('') + this.divisor + numbersRight.join('');

    }

    get divisor(): string {
        return '.';//this.appSession.application.divisor;
    }

    get divisorReversed(): string {
        return this.divisor == this.dotSeparator ? this.commaSeparator : this.dotSeparator;
    }

    get divisorKey(): number {
        //44 comma, 46 dot
        return this.divisor == "." ? 46 : 44;
    }

    get commaSeparator(): string {
        return ',';
    }

    get dotSeparator(): string {
        return '.';
    }

    get decimalCount(): number {
        return 2;//this.appSession.application.decimal;
    }

    get maxIntValue(): number {
        return 2147483647;
    }

    get lang(): string {
        return 'en-US';//this.appSession.application.lang;
    }

    get numberFormat(): string {
        return '1.2-2';//this.appSession.application.format;
    }

    backgroundColors(): string[] {
        return [
            "#6f777b",
            "#2b6cb0",
            "#1b9d6b",
            "#474d98",
            "#d20042",
            "#ffbf47"
        ];
    }

    hoverBackgroundColor(): string[] {
        return [
            "#99a3a8",
            "#5799de",
            "#1a7351",
            "#737ad1",
            "#9e0e3b",
            "#a37621"
        ];
    }
}

