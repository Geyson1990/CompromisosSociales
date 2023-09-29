import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AttachmentUploadDto } from '@shared/service-proxies/application/utility-proxie';
import * as moment from 'moment';

@Component({
    selector: 'file-upload',
    templateUrl: 'file-upload.component.html',
    styleUrls: [
        'file-upload.component.css'
    ]
})
export class FileUploadComponent extends AppComponentBase {

    @Input() titleEmpty: string;
    @Input() title: string;

    currentAttachment: AttachmentUploadDto;

    @Output() saveAttachment: EventEmitter<AttachmentUploadDto> = new EventEmitter<AttachmentUploadDto>();

    constructor(_injector: Injector) {
        super(_injector);
    }

    addAttachment(attachment: AttachmentUploadDto) {
        this.saveAttachment.emit(attachment);
    }

    getAttachment(): AttachmentUploadDto {
        return this.currentAttachment;
    }
    
    crearUploader() {
        this.currentAttachment = undefined;
        (<any>document.getElementById('fileInput')).value = '';
    }

    dragOverHandler(event: any) {
        event.preventDefault();
    }

    dropHandler(event: any) {
        event.preventDefault();

        if (event.dataTransfer.items) {
            for (var i = 0; i < event.dataTransfer.items.length; i++) {
                if (event.dataTransfer.items[i].kind === 'file') {
                    var file = <File>event.dataTransfer.items[i].getAsFile();
                    this.currentAttachment = new AttachmentUploadDto({
                        fileName: file.name,
                        name: undefined,
                        token: undefined,
                        file: file,
                        size: this.bytesToSize(file.size),
                        creationTime: moment(new Date()),
                        creatorUserName: (this.appSession.user.name ? this.appSession.user.name : '') + ' ' + (this.appSession.user.surname ? this.appSession.user.surname : ''),
                        extension: this.getFileExtension(file.name),
                        className: this.getFileClass(file.name),
                        recordResourceType: undefined
                    });
                }
            }
        }
        this.removeDragData(event);
    }

    fileChangeEvent(event: any): void {
        if (event.target.files[0].size > 5242880) { //5MB
            this.message.warn("El limite de tamaño de la imagen es 5MB");
            return;
        }

        var file: File = event.target.files[0];
        var myReader: FileReader = new FileReader();

        myReader.onloadend = (e: any) => {
            this.currentAttachment = new AttachmentUploadDto({
                fileName: file.name,
                name: undefined,
                token: undefined,
                file: file,
                size: this.bytesToSize(file.size),
                creationTime: moment(new Date()),
                creatorUserName: (this.appSession.user.name ? this.appSession.user.name : '') + ' ' + (this.appSession.user.surname ? this.appSession.user.surname : ''),
                extension: this.getFileExtension(file.name),
                className: this.getFileClass(file.name),
                recordResourceType: undefined
            });
        }
        myReader.readAsDataURL(file);
    }

    removeDragData(event: any) {
        if (event.dataTransfer.items)
            event.dataTransfer.items.clear();
        else
            event.dataTransfer.clearData();
    }

    bytesToSize(bytes: number) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0)
            return '0 Byte';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return this.roundNumber(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

    getFileExtension(value: string): string {
        return value.lastIndexOf('.') == -1 ? '' : value.substring(value.lastIndexOf('.') + 1);
    }

    getFileClass(value: string): string {
        if (value.lastIndexOf('.') == -1)
            return 'fas fa-cloud-upload-alt';

        switch (value.substring(value.lastIndexOf('.') + 1).toLocaleLowerCase()) {
            case 'pdf': return 'far fa-file-pdf';
            case 'xlsx': return 'far fa-file-excel';
            case 'xls': return 'far fa-file-excel';
            case 'csv': return 'far fa-file-excel';
            case 'doc': return 'far fa-file-word';
            case 'docx': return 'far fa-file-word';
            case 'odt': return 'far fa-file-word';
            default: return 'fas fa-cloud-upload-alt';
        }
    }
}