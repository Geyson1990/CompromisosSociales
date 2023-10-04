import { AfterViewInit, Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FileUploadComponent } from '@shared/component/file-upload/file-upload.component';
import { CompromiseDto, CompromiseResourceDto, CompromiseStateLocationDto, CompromiseSubStateLocationDto, CompromiseTracingDto, CompromiseUploadTracingDto } from '@shared/service-proxies/application/compromise-proxie';
import { DownloadServiceProxy } from '@shared/service-proxies/application/resource-downloader';
import { AttachmentUploadDto, UtilityParameterDto } from '@shared/service-proxies/application/utility-proxie';
import * as moment from 'moment';

@Component({
    selector: 'compromise-tracing',
    templateUrl: 'compromise-tracing.component.html',
    styleUrls: [
        'compromise-tracing.component.css',
        '../create-edit-compromise.component.css'
    ]
})
export class CompromiseTracingComponent extends AppComponentBase implements AfterViewInit {

    @Input() compromise: CompromiseDto;
    @Input() deadLine: Date;
    @Input() dueDate: Date;
    @ViewChild('fileUploadItems', { static: false }) fileUploadItemContent: FileUploadComponent;

    @Input() statuses: UtilityParameterDto[] = [];
    @Input() states: CompromiseStateLocationDto[] = [];
    subStates: CompromiseSubStateLocationDto[] = [];

    description: string;
    esCierre: boolean = false;

    constructor(_injector: Injector, private _downloadServiceProxy: DownloadServiceProxy) {
        super(_injector);
    }

    ngAfterViewInit(): void {
        this.esCierre = this.compromise.compromiseState.name === "Cerrado";
        if (this.compromise.compromiseState.id > 0) {
            const index: number = this.states.findIndex(p => p.id == this.compromise.compromiseState.id);
            if (index != -1)
                this.subStates = this.states[index].subStates;
            
        }

        this.dueDate = this.compromise.dueDate?.toDate();
        this.deadLine = this.compromise.deadLine?.toDate();
    }

    changeToPriority() {
        this.compromise.isPriority = true;
        this.compromise.reversePriority = false;
    }

    changeToNoPriority() {
        this.compromise.isPriority = false;
        this.compromise.reversePriority = true;
    }

    userEditHtml() {

    }

    onStateChange(event: any) {
        const itemId: number = +event.target.value;
        const index: number = this.states.findIndex(p => p.id == itemId);

        if (index != -1) {
            this.esCierre = index === 1;
            this.compromise.compromiseState.name = this.states[index].name;
            this.subStates = this.states[index].subStates;
        } else {
            this.compromise.compromiseState.name = undefined;
            this.subStates = [];
        }

        this.compromise.compromiseSubState.id = -1;
        this.compromise.compromiseSubState.name = undefined;
    }

    onSubStateChange(event: any) {
        const itemId: number = +event.target.value;
        const index: number = this.subStates.findIndex(p => p.id == itemId);

        if (index != -1) {
            this.compromise.compromiseSubState.name = this.subStates[index].name;
        } else {
            this.compromise.compromiseSubState.name = undefined;
        }
    }

    onDeadLineChange(value: any){
        this.compromise.deadLine = moment(value);
    }

    onDueDateChange(value: any){
        this.compromise.dueDate = moment(value);
    }

    saveAttachment(attachment: AttachmentUploadDto) {
        if (!this.description || this.isNullEmptyOrWhiteSpace(this.description)) {
            this.message.info('Debe ingresar la descripción antes de agregar el elemento a la línea de tiempo', 'Aviso');
            return;
        }

        if (!this.compromise.uploads)
            this.compromise.uploads = [];

        this.compromise.uploads.push(new CompromiseUploadTracingDto({
            creationTime: moment(new Date()),
            description: this.description,
            uploadFile: attachment
        }));

        this.description = undefined;
        this.fileUploadItemContent.crearUploader();
    }

    removeItemUpload(tracing: CompromiseUploadTracingDto, index: number) {
        this.message.confirm('¿Esta seguro de eliminar el registro seleccionado?', 'Aviso', confirmation => {
            if (confirmation)
                this.compromise.uploads.splice(index, 1);
        });
    }

    removeItem(tracing: CompromiseTracingDto, index: number) {
        if (tracing.id) {
            tracing.remove = true;
            this.notify.warn('Se ha marcado para eliminar el registro de la línea de tiempo seleccionado');
        } else {
            this.compromise.situations.splice(index, 1);
        }
    }

    cancelRemove(tracing: CompromiseTracingDto) {
        tracing.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar del registro de la línea de tiempo seleccionado');
    }

    openInNewTab(resource: CompromiseResourceDto) {
        this._downloadServiceProxy.dowloadSource(resource.resource, resource.fileName).subscribe((response) => {
            const fileURL: any = URL.createObjectURL(response);
            const a = document.createElement("a");
            a.href = fileURL;
            a.download = resource.fileName;
            a.click();
        });
    }
}