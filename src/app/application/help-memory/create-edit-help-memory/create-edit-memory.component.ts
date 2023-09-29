import { HttpResponse } from '@angular/common/http';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FindConflictComponent } from '@shared/component/find-conflict/find-conflict.component';
import { FindDirectoryGovernmentComponent } from '@shared/component/find-directory-government/find-directory-government.component';
import { HelpMemoryDto, HelpMemoryServiceProxy } from '@shared/service-proxies/application/help-memory-proxie';
import { UploadServiceProxy } from '@shared/service-proxies/application/upload-proxie';
import { UtilityConflictListGetAllDto, UtilityDirectoryGovernmentDto } from '@shared/service-proxies/application/utility-proxie';
import { TokenService } from 'abp-ng2-module';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';
import { GeneralInformationHelpMemoryComponent } from './general-information/general-information.component';

@Component({
    templateUrl: 'create-edit-memory.component.html',
    styleUrls: [
        'create-edit-memory.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class CreateEditHelpMemoryComponent extends AppComponentBase implements OnInit {

    @ViewChild('generalInformation', { static: false }) generalInformation: GeneralInformationHelpMemoryComponent;

    @ViewChild('findConflictModal', { static: false }) findConflictModal: FindConflictComponent;
    @ViewChild('findDirectoryGovernmentModal', { static: false }) findDirectoryGovernmentModal: FindDirectoryGovernmentComponent;

    id: number;
    returnUrl: string;

    helpMemory: HelpMemoryDto;

    tabIndex: number = 0;
    loaded: boolean = false;
    busy: boolean = false;

    constructor(
        _injector: Injector,
        private _route: ActivatedRoute,
        private _helpMemoryServiceProxy: HelpMemoryServiceProxy,
        private _uploadServiceProxy: UploadServiceProxy,
        private _tokenService: TokenService) {
        super(_injector);
        this.primengTableHelper.defaultRecordsCountPerPage = 500;
    }

    ngOnInit() {
        const parameter = this._route.snapshot.paramMap.get('id');
        this.id = parameter ? +parameter.replace('[^0-9]', '') : undefined;

        if (this.id && !this.isGranted('Pages.Application.HelpMemory.Edit')) {
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción');
            this.backButtonPressed();
            return;
        }

        if (!this.id && !this.isGranted('Pages.Application.HelpMemory.Create')) {
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción');
            this.backButtonPressed();
            return;
        }

        setTimeout(() => {

            if (this.id) {

                this.showMainSpinner('Cargando información de ayuda memoria');

                this._helpMemoryServiceProxy
                    .get(this.id)
                    .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1500)))
                    .subscribe(response => {
                        this.loaded = true;
                        this.helpMemory = response;
                    }, () => this.backButtonPressed());
            } else {
                this.loaded = true;
                this.helpMemory = new HelpMemoryDto();
            }

        }, 500);
    }

    save() {
        this.helpMemory.requestTime = this.generalInformation.helpMemoryDate ? moment(this.generalInformation.helpMemoryDate) : <any>undefined;

        if (!this.helpMemory.requestTime) {
            this.message.info('Aviso', 'Por favor ingrese la fecha de corte antes de continuar.');
            return;
        }
        if (!this.helpMemory.directoryGovernment) {
            this.message.info('Aviso', 'Por favor seleccione la entidad solicitante antes de continuar.');
            return;
        }
        if (this.isNullEmptyOrWhiteSpace(this.helpMemory.request)) {
            this.message.info('Aviso', 'Por favor ingrese la persona solicitante antes de continuar.');
            return;
        }
        if (!this.helpMemory.socialConflict && !this.helpMemory.socialConflictSensible) {
            this.message.info('Aviso', 'Por favor iseleccione el caso o situación sensible antes de continuar.');
            return;
        }

        this.uploadImages();
    }

    showConflictModal() {
        this.findConflictModal.show();
    }

    selectConflict(conflict: UtilityConflictListGetAllDto) {
        this.generalInformation.selectConflict(conflict);
    }

    showDirectoryGovernmentModal() {
        this.findDirectoryGovernmentModal.show();
    }

    selectDirectoryGovernment(directoryGovernment: UtilityDirectoryGovernmentDto) {
        this.generalInformation.selectDirectoryGovernment(directoryGovernment);
    }

    backButtonPressed() {
        this.router.navigate(['/app/application/help-memories'], { queryParams: {} });
    }

    private uploadImages() {

        if (!this.helpMemory.uploadFiles || this.helpMemory.uploadFiles.length == 0) {
            this.completeSave(true);
            return;
        }

        const files: globalThis.File[] = this.helpMemory.uploadFiles.map(p => p.file);

        this.showMainSpinner('Guardando información, por favor espere...');

        this._uploadServiceProxy
            .uploadFiles(files, this._tokenService.getToken())
            .pipe(finalize(() => this.hideMainSpinner()))
            .subscribe(event => {
                if (event instanceof HttpResponse) {
                    if (event.body.success) {
                        let index: number = 0;
                        for (let token of event.body.result.fileTokens) {
                            this.helpMemory.uploadFiles[index].token = token;
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

    private completeSave(showMainSpinner?: boolean) {
        if (showMainSpinner)
            this.showMainSpinner('Guardando información, por favor espere...');

        if (this.helpMemory.id)
            this._helpMemoryServiceProxy
                .update(this.helpMemory)
                .subscribe(() => {
                    this.loaded = false;
                    this.notify.success('Se actualizó la ayuda memoria correctamente', 'Aviso');
                    this.resetAndInit();
                }, () => setTimeout(() => this.hideMainSpinner(), 1500));
        else
            this._helpMemoryServiceProxy
                .create(this.helpMemory)
                .subscribe((response) => {
                    this.loaded = false;
                    this.notify.success('Se guardó correctamente la ayuda memoria', 'Aviso');
                    this.router.navigate(['/app/application/edit-help-memory', response.id]);
                }, () => setTimeout(() => this.hideMainSpinner(), 1500));
    }

    private resetAndInit() {
        this.loaded = false;
        this.busy = false;
        this.ngOnInit();
    }
}