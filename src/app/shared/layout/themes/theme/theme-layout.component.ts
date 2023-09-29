import { Injector, ElementRef, Component, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ThemesLayoutBaseComponent } from '@app/shared/layout/themes/themes-layout-base.component';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { AppConsts } from '@shared/AppConsts';
import { OffcanvasOptions } from '@metronic/app/core/_base/layout/directives/offcanvas.directive';

@Component({
    templateUrl: 'theme-layout.component.html',
    selector: 'theme-layout',
    animations: [appModuleAnimation()]
})
export class ThemeLayoutComponent extends ThemesLayoutBaseComponent implements OnInit {

    menuCanvasOptions: OffcanvasOptions = {
        baseClass: 'kt-aside',
        overlay: true,
        closeBy: 'kt_aside_close_btn',
        toggleBy: {
            target: 'kt_aside_mobile_toggler',
            state: 'kt-header-mobile__toolbar-toggler--active'
        }
    };

    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    ngOnInit() {
        this.installationMode = UrlHelper.isInstallUrl(location.href);
        this.defaultLogo = AppConsts.appBaseUrl + '/assets/common/images/jpg/account-icon.jpg';
    }
}
