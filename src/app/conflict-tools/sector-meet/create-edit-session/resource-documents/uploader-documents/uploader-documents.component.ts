import { Component, Injector } from '@angular/core';
import { SectorSessionStateService } from '@app/conflict-tools/sector-meet/shared/sector-session-state.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SectorMeetSessionAttachmentUploadDto } from '@shared/service-proxies/application/sector-meet-session-proxie';
import { PersonType } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

@Component({
    selector: 'uploader-documents',
    templateUrl: 'uploader-documents.component.html',
    styleUrls: [
        'uploader-documents.component.css'
    ]
})
export class UploaderDocumentsComponent extends AppComponentBase {

    attachment: SectorMeetSessionAttachmentUploadDto;
    title: string;
    state: SectorSessionStateService;

    constructor(_injector: Injector) {
        super(_injector);
        this.state = _injector.get(SectorSessionStateService);
    }

    addAttachment() {
        if (this.isNullEmptyOrWhiteSpace(this.title)) {
            this.message.error('El nombre del documento es obligatorio');
            return;
        }

        this.attachment.name = this.title;

        this.state.sectorMeetSession.uploadFiles.push(this.attachment);
        this.uploadFileComplete();
    }

    dragOverHandler(event: any) {
        event.preventDefault();
    }

    dropHandler(event: any) {
        event.preventDefault();

        if (event.dataTransfer.items) {
            for (let i = 0; i < event.dataTransfer.items.length; i++) {
                if (event.dataTransfer.items[i].kind === 'file') {
                    let file = <File>event.dataTransfer.items[i].getAsFile();

                    if (this.fileIsValid(file.name)) {
                        if (file.size > this.getSize()) {
                            this.message.warn(`El límite de tamaño de los archivos es de 5MB`);
                        } else {
                            this.attachment = new SectorMeetSessionAttachmentUploadDto({
                                fileName: file.name,
                                name: undefined,
                                token: undefined,
                                file: file,
                                size: this.bytesToSize(file.size),
                                extension: this.getFileExtension(file.name),
                                className: this.getFileClass(file.name),
                                creationTime: moment()
                            });
                        }
                    } else {
                        this.message.error(`El archivo ${file.name} no posee un formato válido`);
                    }

                }
            }
        }
        this.removeDragData(event);
    }

    removeCurrentFile() { 

        (<any>document.getElementById('fileInput')).value = '';
    }

    fileChangeEvent(event: any): void {
        if (event.target.files[0].size > this.getSize()) {
            this.message.warn(`El límite de tamaño de los archivos es de 5MB`);
            return;
        }

        let file: File = event.target.files[0];
        let reader: FileReader = new FileReader();

        reader.onloadend = (e: any) => {

            if (this.fileIsValid(file.name)) {
                this.attachment = new SectorMeetSessionAttachmentUploadDto({
                    fileName: file.name,
                    name: undefined,
                    token: undefined,
                    file: file,
                    size: this.bytesToSize(file.size),
                    extension: this.getFileExtension(file.name),
                    className: this.getFileClass(file.name),
                    creationTime: moment()
                });
            } else {
                this.message.error(`El archivo ${file.name} no posee un formato válido`);
            }
        }

        reader.readAsDataURL(file);
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
            case 'jpg': return 'fas fa-image';
            case 'jpeg': return 'fas fa-image';
            case 'jpe': return 'fas fa-image';
            case 'png': return 'fas fa-image';
            case 'pdf': return 'fas fa-image';
            default: return 'fas fa-cloud-upload-alt';
        }
    }

    fileIsValid(value: string): boolean {
        if (value.lastIndexOf('.') == -1)
            return false;

        const extension: string = value.substring(value.lastIndexOf('.') + 1).toLocaleLowerCase();

        switch (extension) {
            case 'jpg': return true;
            case 'jpeg': return true;
            case 'jpe': return true;
            case 'png': return true;
            case 'pdf': return true;
            default: return false;
        }
    }

    getSize(): number {
        return 1_048_576 * 5;
    }

    private uploadFileComplete() {
        this.title = undefined;
        this.attachment = undefined;
        (<any>document.getElementById('fileInput')).value = '';
    }
}