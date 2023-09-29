import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AccountServiceProxy, codeText, SendPasswordResetCodeInput } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'send-password-reset.component.html',
    styleUrls: [
        'send-password-reset.component.css'
    ]
})
export class SendResetPasswordComponent extends AppComponentBase {

    emailAddress: string;

    constructor(_injector: Injector, private _accountServiceProxy: AccountServiceProxy) {
        super(_injector);
    }

    send() {
        if (!this.testEmail(this.emailAddress)) {
            this.message.error('El correo electrónico ingresado es inválido', 'Aviso');
            return;
        }

        this.showMainSpinner('Por favor espere...');

        this._accountServiceProxy.sendPasswordResetCode(new SendPasswordResetCodeInput({
            emailAddress: codeText(this.emailAddress)
        })).pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1500)))
            .subscribe(() => {
                this.message.success('Hemos enviado un correo electrónico con un código que es necesario para restablecer el acceso a la plataforma', 'Aviso');
                this.router.navigate(['account', 'reset-password', this.emailAddress]);
            });
    }
}