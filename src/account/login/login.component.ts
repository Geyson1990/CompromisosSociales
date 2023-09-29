import { Component, Injector, OnInit } from '@angular/core';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LoginService } from './login.service';

@Component({
    templateUrl: './login.component.html',
    animations: [accountModuleAnimation()],
    styleUrls: ['./login.component.less']
})
export class LoginComponent extends AppComponentBase implements OnInit {

    submitting = false;

    captchaBusy: boolean = true;
    captchaLoadingException: boolean = false;
    captchaResourceImage: string;

    constructor(injector: Injector, public loginService: LoginService) {
        super(injector);
    }

    ngOnInit(): void {
        this.loginService.init();
        this.refresh();
    }

    refresh(): void {
        this.captchaLoadingException = false;
        this.captchaBusy = true;
        this.captchaResourceImage = undefined;
        this.loginService.authenticateModel.captchaKey = undefined;
        this.loginService.authenticateModel.captchaSecurityCode = undefined;

        this.loginService.generateCaptcha((captchaResponse) => {
            this.captchaLoadingException = false;
            this.captchaBusy = false;
            this.captchaResourceImage = captchaResponse.resource;
            this.loginService.authenticateModel.captchaSecurityCode = captchaResponse.securityCode;
        }, () => this.captchaLoadingException = true);
    }

    login(): void {
        this.showMainSpinner();

        this.submitting = true;
        this.loginService.authenticate(() => {
            this.submitting = false;
            this.hideMainSpinner();
        }, null, () => this.refresh());
    }
}
