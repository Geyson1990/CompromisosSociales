import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'file-download-request',
    templateUrl: 'file-download-request.component.html',
    styleUrls: [
        'file-download-request.component.css'
    ]
})

export class FileDownloadRequestComponent extends AppComponentBase implements OnInit {

    isHidden: boolean = true;
    
    constructor(_injector: Injector) {
        super(_injector);
    }

    ngOnInit() { }

    show() {
        this.isHidden = false;
    }

    hide() {
        this.isHidden = true;
    }
}