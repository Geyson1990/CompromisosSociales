import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DialogSpaceDocumentDialogSpaceDto, DialogSpaceDocumentDto, DialogSpaceDocumentRange, DialogSpaceDocumentRangeSide, DialogSpaceDocumentServiceProxy, DialogSpaceDocumentSituationRelationDto, DialogSpaceDocumentType, DialogSpaceDocumentTypeRelationDto } from '@shared/service-proxies/application/dialog-space-document-proxie';
import { UploadServiceProxy } from '@shared/service-proxies/application/upload-proxie';
import { TokenService } from 'abp-ng2-module';
import { DialogSpaceDocumentGeneralInformationComponent } from './general-information/general-information.component';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';
import { HttpResponse } from '@angular/common/http';

@Component({
    templateUrl: 'create-edit-document.component.html',
    styleUrls: [
        'create-edit-document.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class CreateEditDocumentComponent extends AppComponentBase implements OnInit {

    @ViewChild('generalInformationDialogSpaceDocument', { static: false }) generalInformationDialogSpaceDocument: DialogSpaceDocumentGeneralInformationComponent;

    dialogSpace: DialogSpaceDocumentDialogSpaceDto;
    dialogSpaceDocument: DialogSpaceDocumentDto;

    documentTypes: DialogSpaceDocumentTypeRelationDto[];
    situations: DialogSpaceDocumentSituationRelationDto[];

    id: number;
    loaded: boolean = false;
    busy: boolean = false;
    tabIndex: number = 0;

    constructor(_injector: Injector,
        private _activatedRoute: ActivatedRoute,
        private _dialogSpaceDocumentServiceProxy: DialogSpaceDocumentServiceProxy,
        private _uploadServiceProxy: UploadServiceProxy,
        private _tokenService: TokenService) {
        super(_injector);
    }

    ngOnInit() {

        this._activatedRoute.params.subscribe((params) => {
            const dialogSpaceIdParam: string = (params["dialogSpaceId"] || '').replace('[^0-9]', '');
            const dialogSpaceDocumentIdParam: string = (params["dialogSpaceDocumentId"] || '').replace('[^0-9]', '');

            if (dialogSpaceDocumentIdParam != '' && !this.isGranted('Pages.ConflictTools.DialogSpace.Edit')) {
                this.notify.error('Usted no posee permisos suficientes para realizar esta acción');
                this.backButtonPressed();
                return;
            }

            if (dialogSpaceDocumentIdParam == '' && !this.isGranted('Pages.ConflictTools.DialogSpace.Create')) {
                this.notify.error('Usted no posee permisos suficientes para realizar esta acción');
                this.backButtonPressed();
                return;
            }

            const dialogSpaceId = dialogSpaceIdParam == '' ? undefined : +dialogSpaceIdParam;
            const dialogSpaceDocumentId = dialogSpaceDocumentIdParam == '' ? undefined : +dialogSpaceDocumentIdParam;

            setTimeout(() => {
                this.showMainSpinner('Cargando información');

                this._dialogSpaceDocumentServiceProxy
                    .get(dialogSpaceId, dialogSpaceDocumentId)
                    .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1500)))
                    .subscribe(response => {
                        this.dialogSpace = response.dialogSpace;
                        this.documentTypes = response.documentTypes;
                        this.situations = response.situations;

                        if (response.dialogSpaceDocument)
                            this.dialogSpaceDocument = response.dialogSpaceDocument;
                        else
                            this.dialogSpaceDocument = new DialogSpaceDocumentDto();

                        this.loaded = true;

                    }, () => this.backButtonPressed());

            }, 500);
        });
    }

    save() {

        this.dialogSpaceDocument.documentTime = moment(this.generalInformationDialogSpaceDocument.documentTime);
        this.dialogSpaceDocument.installationTime = this.generalInformationDialogSpaceDocument.installationTime ? moment(this.generalInformationDialogSpaceDocument.installationTime) : undefined;
        this.dialogSpaceDocument.installationMaxTime = this.generalInformationDialogSpaceDocument.installationMaxTime ? moment(this.generalInformationDialogSpaceDocument.installationMaxTime) : undefined;
        this.dialogSpaceDocument.vigencyTime = this.generalInformationDialogSpaceDocument.vigencyTime ? moment(this.generalInformationDialogSpaceDocument.vigencyTime) : undefined;

        if (!this.dialogSpaceDocument.documentTime.isValid()) {
            this.message.info('La fecha de publicación es inválida', 'Aviso');
            return;
        }
        if (this.dialogSpaceDocument.installationTime && !this.dialogSpaceDocument.installationTime.isValid()) {
            this.message.info('La fecha de instalación es inválida', 'Aviso');
            return;
        }
        if (this.dialogSpaceDocument.installationMaxTime && !this.dialogSpaceDocument.installationMaxTime.isValid())
            this.dialogSpaceDocument.installationMaxTime = undefined;
        if (this.dialogSpaceDocument.vigencyTime && !this.dialogSpaceDocument.vigencyTime.isValid())
            this.dialogSpaceDocument.vigencyTime = undefined;
        if (this.isNullEmptyOrWhiteSpace(this.dialogSpaceDocument.document)) {
            this.message.info('El número de documento es obligatorio', 'Aviso');
            return;
        }
        if (this.dialogSpaceDocument.dialogSpaceDocumentType.id == -1) {
            this.message.info('El tipo de documento es obligatorio', 'Aviso');
            return;
        }
        if (this.dialogSpaceDocument.dialogSpaceDocumentSituation.id == -1) {
            this.message.info('La situación actual es obligatoria', 'Aviso');
            return;
        }
        if (this.dialogSpaceDocument.type == DialogSpaceDocumentType.NONE) {
            this.message.info('Debe seleccionar si el documento oficial es de creación o actualización', 'Aviso');
            return;
        }
        if (this.dialogSpaceDocument.hasInstallation && this.dialogSpaceDocument.range == DialogSpaceDocumentRange.NONE) {
            this.message.info('Debe seleccionar desde cuando se contabiliza el plazo de instalación', 'Aviso');
            return;
        }
        if (this.dialogSpaceDocument.rangeSide == DialogSpaceDocumentRangeSide.NONE) {
            this.message.info('Debe seleccionar si el plazo máximo para la instalación en (días) se contabiliza en días hábiles o días calendario', 'Aviso');
            return;
        }

        this.showMainSpinner('Guardando información, por favor espere...');

        this.uploadResources(() => {
            this.completeSave();
        });

        this.uploadResourcesFilesPDF(() => {
            this.completeSave();
        });
    }

    backButtonPressed() {
        this.router.navigate(['/app/conflict-tools/dialog-space/edit-dialog-space', this.dialogSpace.id]);
    }

    private uploadResources(callback: () => void) {
        const files: globalThis.File[] = this.dialogSpaceDocument.uploadFiles.map(p => p.file);

        if (files.length == 0) {
            callback();
        } else {
            this._uploadServiceProxy
                .uploadFiles(files, this._tokenService.getToken())
                .subscribe(event => {
                    if (event instanceof HttpResponse) {
                        if (event.body.success) {
                            let index: number = 0;
                            for (let token of event.body.result.fileTokens) {
                                this.dialogSpaceDocument.uploadFiles[index].token = token;
                                index++;
                            }
                            callback();
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
    }

    private uploadResourcesFilesPDF(callback: () => void) {
        const files: globalThis.File[] = this.dialogSpaceDocument.uploadFilesPDF.map(p => p.file);

        if (files.length == 0) {
            callback();
        } else {
            this._uploadServiceProxy
                .uploadFiles(files, this._tokenService.getToken())
                .subscribe(event => {
                    if (event instanceof HttpResponse) {
                        if (event.body.success) {
                            let index: number = 0;
                            for (let token of event.body.result.fileTokens) {
                                this.dialogSpaceDocument.uploadFilesPDF[index].token = token;
                                index++;
                            }
                            callback();
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
    }


    private completeSave() {
        if (this.dialogSpaceDocument.id) {
            this._dialogSpaceDocumentServiceProxy
                .update(this.dialogSpaceDocument)
                .subscribe(() => {
                    this.loaded = false;
                    this.notify.success('Se actualizó correctamente la información', 'Aviso');
                    this.resetAndInit();
                }, () => setTimeout(() => this.hideMainSpinner(), 1500));
        } else {
            this.dialogSpaceDocument.dialogSpace = this.dialogSpace;
            this._dialogSpaceDocumentServiceProxy
                .create(this.dialogSpaceDocument)
                .subscribe((response) => {
                    this.loaded = false;
                    this.notify.success('Se registro correctamente la información', 'Aviso');
                    this.router.navigate(['/app/conflict-tools/dialog-space/edit-document', this.dialogSpace.id, response.id]);
                }, () => setTimeout(() => this.hideMainSpinner(), 1500));
        }
    }

    private resetAndInit() {
        this.loaded = false;
        this.busy = false;
        this.ngOnInit();
    }

}