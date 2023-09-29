import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogSpaceDocumentResourceDto } from '@shared/service-proxies/application/dialog-space-document-proxie';
import { HelpMemoryResourceDto } from '@shared/service-proxies/application/help-memory-proxie';
import { QuizDetailResourceDto } from '@shared/service-proxies/application/quiz-detail-proxie';
import { RecordResourceDto } from '@shared/service-proxies/application/record-proxie';
import { DownloadServiceProxy } from '@shared/service-proxies/application/resource-downloader';
import { SocialConflictAlertResourceDto } from '@shared/service-proxies/application/social-conflict-alert-proxie';
import { SocialConflictResourceDto } from '@shared/service-proxies/application/social-conflict-proxie';

@Component({
    selector: 'file-resource-item',
    templateUrl: 'file-resource-item.component.html',
    styleUrls: [
        'file-resource-item.component.css'
    ]
})
export class FileResourceItemComponent implements OnInit {

    @Input() resource: RecordResourceDto | SocialConflictResourceDto | SocialConflictAlertResourceDto | HelpMemoryResourceDto | QuizDetailResourceDto | DialogSpaceDocumentResourceDto;
    @Input() removeDisabled: boolean = false;
    @Output() removeResource: EventEmitter<any> = new EventEmitter<any>();
    @Output() restoreResource: EventEmitter<any> = new EventEmitter<any>();

    constructor(private _downloadServiceProxy: DownloadServiceProxy) { }

    ngOnInit() { }

    openInNewTab() {
        this._downloadServiceProxy.dowloadSource(this.resource.resource, this.resource.fileName).subscribe((response) => {
            const fileURL: any = URL.createObjectURL(response);
            const a = document.createElement("a");
            a.href = fileURL;
            a.download = this.resource.fileName;
            a.click();
        });
    }
}