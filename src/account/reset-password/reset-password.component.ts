import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AccountServiceProxy, codeText, PasswordComplexitySetting, ProfileServiceProxy, ResetPasswordInput } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'reset-password.component.html',
    styleUrls: [
        'reset-password.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class ResetPasswordComponent extends AppComponentBase implements OnInit {

    loaded: boolean = false;

    emailAddress: string;
    code: string;
    passwordComplexitySettings: PasswordComplexitySetting;

    password: string;
    confirmPassword: string;

    constructor(_injector: Injector, private _activatedRoute: ActivatedRoute, private _profileServiceProxy: ProfileServiceProxy, private _accountServiceProxy: AccountServiceProxy) {
        super(_injector);
    }

    ngOnInit() {
        this._activatedRoute.params.subscribe((params) => {
            const emailAdress: string = params["emailAddress"];

            if (this.testEmail(emailAdress)) {
                this.emailAddress = emailAdress;

                this.showMainSpinner('Cargando información. Por favor espere...');

                this._profileServiceProxy
                    .getPasswordComplexitySetting()
                    .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1500)))
                    .subscribe((response) => {
                        this.passwordComplexitySettings = response.setting;
                        this.loaded = true;
                    }, () => this.goLogin());
            } else {
                this.goLogin();
            }
        });
    }

    save() {
        if (this.isNullEmptyOrWhiteSpace(this.code) || this.length(this.code) != 6) {
            this.message.info('Por favor ingrese un código de verificación válido', 'Aviso');
            return;
        }
        if (this.isNullEmptyOrWhiteSpace(this.password)) {
            this.message.info('Por favor ingrese la nueva contraseña antes de continuar', 'Aviso');
            return;
        }

        this.showMainSpinner('Verificando información. Por favor espere...');

        this._accountServiceProxy.resetPassword(new ResetPasswordInput({
            emailAddress: codeText(this.emailAddress),
            password: codeText(this.password),
            resetCode: codeText(this.code)
        })).pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1500)))
            .subscribe(() => {
                this.message.success('Hemos restablecido tu contraseña de manera exitosa. Ya puedes iniciar sesión nuevamente', 'Aviso');
                this.goLogin();
            });
    }

    goLogin() {
        this.router.navigate(['account', 'login']);
    }
}