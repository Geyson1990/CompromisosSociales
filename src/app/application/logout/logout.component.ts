import { Component, Injector, OnInit } from '@angular/core';
import { AppAuthService } from '@app/shared/common/auth/app-auth.service';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    templateUrl: 'logout.component.html',
    styleUrls: [
        'logout.component.css'
    ]
})

export class LogoutComponent extends AppComponentBase implements OnInit {

    constructor(_injector: Injector, private _appAuthService: AppAuthService) {
        super(_injector);
    }

    ngOnInit() { 
        this.showMainSpinner('Cerrando sesión');

        this._appAuthService.logout(true);
    }
}