import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { SectorMeetStateService } from '@app/conflict-tools/sector-meet/shared/sector-meet-state.service';
import { SectorSessionStateService } from '@app/conflict-tools/sector-meet/shared/sector-session-state.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ResourceSizeType } from '@shared/component/file-uploader/file-uploader.component';
import { SectorMeetSessionAttachmentUploadDto } from '@shared/service-proxies/application/sector-meet-session-proxie';
import { AttachmentResourceTypeDto, AttachmentUploadDto } from '@shared/service-proxies/application/utility-proxie';
import { PersonType } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

@Component({
    selector: 'files-interest',
    templateUrl: 'files-interest.component.html',
    styleUrls: [
        'files-interest.component.css'
    ]
})
export class FilesInterestComponent extends AppComponentBase {

    private _attachments: AttachmentUploadDto[];
    state: SectorMeetStateService;

    currentAttachment: AttachmentUploadDto;
    documentTitle: string;
    description: string;
    reportType: number = -1;

    @Input() get attachments(): AttachmentUploadDto[] {
        return this._attachments;
    }

    set attachments(value: AttachmentUploadDto[]) {
        this._attachments = value;
    }

    @Input() hideType: boolean = false;
    @Input() hideTitle: boolean = false;
    @Input() hideHeader: boolean = false;
    @Input() hideUploader: boolean = false;
    @Input() header: string = 'Agregar archivos';
    @Input() subtitle: string = 'Ud. puede seleccionar un archivo WORD (doc, docx), PDF (.pdf), Excel (.xslx, .xlsl) con un tamaño máximo de 5MB.';
    @Input() size: ResourceSizeType = ResourceSizeType.MB5;
    @Input() files: boolean = true;
    @Input() images: boolean = false;
    @Input() disabled: boolean = false;
    @Input() extensions: boolean = false;
    @Input() extension: string = undefined;
    @Input() avaliableExtensions: string[] = [];
    @Input() recordResourceTypes: AttachmentResourceTypeDto[] = [];
    @Output() saveAttachment: EventEmitter<AttachmentUploadDto> = new EventEmitter<AttachmentUploadDto>();

    constructor(_injector: Injector) {
        super(_injector);
        this.state = _injector.get(SectorMeetStateService);
    }

    addAttachment(attachment: AttachmentUploadDto) {

        if (!this.attachments) {
            this.attachments = []; // Si this.attachments es undefined, inicialízalo como un array vacío.
        }

        const index: number = this.attachments.findIndex(p => p.name == attachment.name);

        if (!this.hideTitle && index != -1) {
            this.message.error('Ya existe un archivo con el mismo nombre', 'Aviso');
            return;
        }

        if (!this.hideTitle && this.isNullEmptyOrWhiteSpace(this.documentTitle)) {
            this.message.error('Ingrese el título referente al documento antes de continuar', 'Aviso');
            return;
        }

        if (!this.hideTitle && this.isNullEmptyOrWhiteSpace(this.description)) {
            this.message.error('Ingrese una descripción referente al documento antes de continuar', 'Aviso');
            return;
        }

        attachment.name = this.documentTitle;
        attachment.description = this.description;

        this.state.sectorMeet.uploadFiles.push(attachment);
        this.uploadFile();
    }

    ngOnInit() { }

    private uploadFile() {
        this.documentTitle = undefined;
        this.description = undefined;
        this.reportType = -1;
        this.currentAttachment = undefined;
        (<any>document.getElementById('fileInput')).value = '';
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
                        if (file.size > this.getSize(this.size)) {
                            this.message.warn(`El límite de tamaño de los archivos es de ${this.getSizeText(this.size)}`);
                        } else {
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
                    } else {
                        this.message.error(`El archivo ${file.name} no posee un formato válido`);
                    }

                }
            }
        }
        this.removeDragData(event);
    }

    removeCurrentFile() {
        this.uploadFile();
    }

    fileChangeEvent(event: any): void {
        if (event.target.files[0].size > this.getSize(this.size)) {
            this.message.warn(`El límite de tamaño de los archivos es de ${this.getSizeText(this.size)}`);
            return;
        }

        let file: File = event.target.files[0];
        let reader: FileReader = new FileReader();

        reader.onloadend = (e: any) => {

            if (this.fileIsValid(file.name)) {
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

    removeFile(index: number) {
        this.attachments.splice(index, 1);
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
            case 'jpg': return 'fas fa-image';
            case 'jpeg': return 'fas fa-image';
            case 'jpe': return 'fas fa-image';
            case 'png': return 'fas fa-image';
            default: return 'fas fa-cloud-upload-alt';
        }
    }

    fileIsValid(value: string): boolean {
        if (value.lastIndexOf('.') == -1)
            return false;

        const extension: string = value.substring(value.lastIndexOf('.') + 1).toLocaleLowerCase();

        if (this.extensions && this.extension)
            return extension == this.extension;

        if (this.avaliableExtensions.length > 0) {
            for (let extension of this.avaliableExtensions) {
                if (extension == extension)
                    return true;
            }
            return false;
        }

        if (this.images) {
            switch (extension) {
                case 'jpg': return true;
                case 'jpeg': return true;
                case 'jpe': return true;
                case 'png': return true;
            }
        }

        if (this.files) {
            switch (extension) {
                case 'pdf': return true;
                case 'xlsx': return true;
                case 'xls': return true;
                case 'csv': return true;
                case 'doc': return true;
                case 'docx': return true;
                case 'odt': return true;
            }
        }

        return false;
    }

    getSize(size: ResourceSizeType): number {

        const mb: number = 1_048_576;

        switch (size) {
            case ResourceSizeType.MB1: return mb * 1.5;
            case ResourceSizeType.MB2: return mb * 2;
            case ResourceSizeType.MB3: return mb * 3;
            case ResourceSizeType.MB4: return mb * 4;
            case ResourceSizeType.MB5: return mb * 5;
            default: return mb * 5;
        }
    }

    getSizeText(size: ResourceSizeType): string {
        switch (size) {
            case ResourceSizeType.MB1: return '1.5MB';
            case ResourceSizeType.MB2: return '2MB';
            case ResourceSizeType.MB3: return '3MB';
            case ResourceSizeType.MB4: return '4MB';
            case ResourceSizeType.MB5: return '5MB';
            default: return '5MB';
        }
    }
}