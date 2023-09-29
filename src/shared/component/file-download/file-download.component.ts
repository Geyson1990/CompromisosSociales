import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ReportType } from '@shared/service-proxies/application/report-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'file-download',
    templateUrl: 'file-download.component.html',
    styleUrls: [
        'file-download.component.css'
    ]
})

export class FileDownloadComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ format: ReportType, parameter: any }> = new EventEmitter<{ format: ReportType, parameter: any }>();

    title: string;
    format: ReportType = ReportType.PDF;
    active: boolean = false;
    saving: boolean = false;

    private parameter: any;

    formats = {
        pdf: { type: ReportType.PDF, enabled: true },
        xlsx: { type: ReportType.XLSX, enabled: true },
        html: { type: ReportType.HTML, enabled: true },
        docx: { type: ReportType.DOCX, enabled: true }
    }

    constructor(_injector: Injector) {
        super(_injector);
    }

    show(title: string, parameter: any, format: ReportType): void {
        this.title = title;
        this.parameter = parameter;
        this.format = format;
        this.active = true;
        this.modal.show();
    }

    onShown(): void {

    }

    save() {
        this.modalSave.emit({ format: this.format, parameter: this.parameter });
        this.modal.hide();
    }

    close(): void {
        this.active = false;
        this.saving = false;
        this.modal.hide();
    }
}