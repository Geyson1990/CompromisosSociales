import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ResourceSizeType } from '@shared/component/file-uploader/file-uploader.component';
import { QuizAdministrativeDataDto, QuizAdministrativeFormDto, QuizAdministrativeServiceProxy, QuizFormResourceDto } from '@shared/service-proxies/application/quiz-customer-proxie';
import { UploadServiceProxy } from '@shared/service-proxies/application/upload-proxie';
import { AttachmentUploadDto } from '@shared/service-proxies/application/utility-proxie';
import { TokenService } from 'abp-ng2-module';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'form.component.html',
    styleUrls: [
        'form.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class QuizFormComponent extends AppComponentBase implements AfterViewInit {

    busy: boolean = false;
    loaded: boolean = false;

    forms: QuizAdministrativeFormDto[] = [];
    resources: QuizFormResourceDto[] = [];
    uploadFiles: AttachmentUploadDto[] = [];
    size: ResourceSizeType = ResourceSizeType.MB3;
    avaliableExtensions: string[] = ["pdf", "jpg", "jpeg", "jpe", "png", "doc", "docx"];

    constructor(_injector: Injector,
        private _tokenService: TokenService,
        private _uploadServiceProxy: UploadServiceProxy,
        private _quizAdministrativeServiceProxy: QuizAdministrativeServiceProxy) {
        super(_injector);
    }

    ngAfterViewInit(): void {
        setTimeout(async () => {
            this.showMainSpinner('Cargando información por favor espere...');
            this._quizAdministrativeServiceProxy.getQuestions().pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1500))).subscribe(response => {
                this.forms = response.items;

                for (let form of this.forms) {
                    if (form.options.length == 1)
                        form.selectedOptionId = form.options[0].id;
                }

                this.loaded = true;
            });
        }, 500);
    }

    saveAttach(attachment: AttachmentUploadDto) {
        this.uploadFiles.push(attachment);
    }

    removeResource(resource: QuizFormResourceDto, index: number) {
        resource.remove = true;
    }

    restoreResource(resource: QuizFormResourceDto) {
        resource.remove = false;
    }

    save() {
        let index: number = this.forms.findIndex(p => p.selectedOptionId == -1 || (p.options.length == 1 && p.options[0].extra && p.required && this.isNullEmptyOrWhiteSpace(p.options[0].response)));

        if (index != -1) {
            this.message.info('Por favor complete todas las preguntas antes de enviar la encuesta', 'Aviso');
            return;
        }

        this.message.confirm(this.uploadFiles.length == 0 ? '¿Estas seguro de enviar la encuesta? Aún no has adjuntado ningún documento' : '¿Estas seguro de enviar la encuesta?', 'Aviso', confirmation => {
            if (confirmation) this.startSaving();
        });
    }

    private startSaving() {

        this.showMainSpinner('Guardando información, por favor espere...');

        if (this.uploadFiles.length == 0) {
            this.completeSave();
            return;
        }

        this._uploadServiceProxy
            .uploadFiles(this.uploadFiles.map(p => p.file), this._tokenService.getToken())
            .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1500)))
            .subscribe(event => {
                if (event instanceof HttpResponse) {
                    if (event.body.success) {
                        let index: number = 0;
                        for (let token of event.body.result.fileTokens) {
                            this.uploadFiles[index].token = token;
                            index++;
                        }
                        this.completeSave();
                    } else {
                        this.message.info(event.body.error?.details ? event.body.error?.details : 'No se pudo completar la transacción, intente nuevamente mas tarde', 'Aviso');
                        setTimeout(() => this.hideMainSpinner(), 1500);
                    }
                }
            }, (error) => {
                this.message.error(error?.error?.error?.details ? error.error.error.details : 'No se pudo completar la transacción, intente nuevamente mas tarde', 'Aviso');
                setTimeout(() => this.hideMainSpinner(), 1500);
            });
    }
    private completeSave() {
        let input: QuizAdministrativeDataDto = new QuizAdministrativeDataDto();
        input.forms = this.forms;
        input.resources = this.resources;
        input.uploadFiles = this.uploadFiles;

        this._quizAdministrativeServiceProxy
            .create(input)
            .subscribe(() => {
                setTimeout(() => {
                    this.loaded = false;
                    this.hideMainSpinner();
                    this.message.success('Se registro correctamente la encuesta, gracias por apoyarnos con su opinión', 'Aviso');
                }, 1500);
            }, () => setTimeout(() => this.hideMainSpinner(), 1500));
    }
}