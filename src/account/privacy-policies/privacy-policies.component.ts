import { Component, Injector } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    templateUrl: 'privacy-policies.component.html',
    styleUrls: [
        'privacy-policies.component.css'
    ]
})
export class PrivacyPoliciesComponent extends AppComponentBase {

    src: string = AppConsts.remoteServiceBaseUrl + '/Resource/LoadPrivacyPolicies';

    constructor(_injector: Injector) {
        super(_injector);
    }

}