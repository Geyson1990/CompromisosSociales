import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttachmentUploadDto } from '@shared/service-proxies/application/utility-proxie';

@Component({
    selector: 'file-uploader-item',
    templateUrl: 'file-uploader-item.component.html',
    styleUrls: [
        'file-uploader-item.component.css'
    ]
})
export class FileUploaderItemComponent implements OnInit {

    @Input() attachment: AttachmentUploadDto;
    @Output() removeAttachment: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() { }
}