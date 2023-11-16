import { Component, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DownloadServiceProxy } from '@shared/service-proxies/application/resource-downloader';
import { AuditLogServiceProxy, EntityChangeListDto, EntityPropertyChangeDto } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'resource-detail-acta-modal',
    templateUrl: './resource-detail-modal.component.html'
})
export class ResourceDetailActaModalComponent extends AppComponentBase {

    @ViewChild('resourceDetail', {static: true}) modal: ModalDirective;
 
    active = false;
    entityChange: any;
    constructor(
        injector: Injector,
        private _downloadServiceProxy: DownloadServiceProxy
    ) {
        super(injector);
    }

    show(record: any): void {
        const self = this;
        self.active = true;
        self.entityChange = record?.resources;
        this.entityChange = record?.resources;
        self.modal.show();
    }

    openInNewTab(file: any) {
        this._downloadServiceProxy.dowloadSource(file?.resource, file?.fileName).subscribe((response) => {
            const fileURL: any = URL.createObjectURL(response);
            const a = document.createElement("a");
            a.href = fileURL;
            a.download = file?.fileName;
            a.click();
        });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
