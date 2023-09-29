import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    templateUrl: 'compliance.component.html',
    styleUrls: [
        'compliance.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class ComplianceComponent extends AppComponentBase implements OnInit {

    activeIndex: number;
    
    constructor(_injector: Injector) {
        super(_injector);
    }

    ngOnInit(): void {

    }
}