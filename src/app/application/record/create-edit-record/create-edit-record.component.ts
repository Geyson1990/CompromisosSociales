import { HttpResponse } from '@angular/common/http';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FindSocialConflictComponent } from '@shared/component/find-social-conflict/find-social-conflict.component';
import { RecordDto, RecordResourceDto, RecordServiceProxy, RecordUserDto } from '@shared/service-proxies/application/record-proxie';
import { UploadServiceProxy } from '@shared/service-proxies/application/upload-proxie';
import { AttachmentResourceTypeDto, AttachmentUploadDto, UtilitySocialConflictDto } from '@shared/service-proxies/application/utility-proxie';
import { TokenService } from 'abp-ng2-module';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'create-edit-record.component.html',
    styleUrls: [
        'create-edit-record.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class CreateEditRecordComponent extends AppComponentBase implements OnInit {

    @ViewChild('findSocialConflictModal', { static: true }) findSocialConflictModal: FindSocialConflictComponent;

    id: number;
    record: RecordDto = new RecordDto();
    recordResourceTypes: AttachmentResourceTypeDto[];

    constructor(_injector: Injector,
        private _tokenService: TokenService,
        private _uploadServiceProxy: UploadServiceProxy,
        private _recordServiceProxy: RecordServiceProxy) {
        super(_injector);
    }

    ngOnInit() {
        this.id = +this.getQueryParameter('id') <= 0 ? undefined : +this.getQueryParameter('id');

        if (this.id && !this.isGranted('Pages.Application.Record.Edit')) {
            this.router.navigate(['/app/application/records'], { queryParams: {} });
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción')
            return;
        }

        if (!this.id && !this.isGranted('Pages.Application.Record.Create')) {
            this.router.navigate(['/app/application/records'], { queryParams: {} });
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción')
            return;
        }

        this.showMainSpinner(this.id ? 'Cargando información del acta' : 'Cargando información');

        this._recordServiceProxy
            .get(this.id)
            .pipe(finalize(() => this.hideMainSpinner()))
            .subscribe(response => {
                if (response.record)
                    this.record = response.record;

                this.record.uploadFiles = [];
                this.recordResourceTypes = response.resourceTypes;

                if (!this.record.resources)
                    this.record.resources = [];
            }, () => this.router.navigate(['/app/application/records'], { queryParams: {} }));
    }

    showFindSocialConflict() {
        if (this.record.id)
            return;

        this.findSocialConflictModal.show();
    }

    save() {
        if (!this.record.socialConflict) {
            this.message.error('Debe seleccionar el conflicto social antes de continuar', 'Aviso');
            return;
        }
        if (!this.record.recordTime) {
            this.message.error('La fecha del acta es obligatoria', 'Aviso');
            return;
        }
        this.uploadImages();
    }

    getUserName(user: RecordUserDto): string {
        if (!user)
            return '';

        return (user.name ? user.name : '').trim() + ' ' + (user.surname ? user.surname : '').trim();
    }

    private completeSave() {
        this.showMainSpinner('Guardando información, por favor espere...');

        if (this.id)
            this._recordServiceProxy
                .update(this.record)
                .pipe(finalize(() => this.hideMainSpinner()))
                .subscribe(() => {
                    this.notify.success('Se actualizó correctamente el conflicto social', 'Aviso');
                    this.router.navigate(['/app/application/records'], { queryParams: {} });
                });
        else
            this._recordServiceProxy
                .create(this.record)
                .pipe(finalize(() => this.hideMainSpinner()))
                .subscribe(() => {
                    this.notify.success('Se registro correctamente conflicto social', 'Aviso');
                    this.router.navigate(['/app/application/records'], { queryParams: {} });
                });
    }

    private uploadImages() {
        this.showMainSpinner('Guardando información, por favor espere...');
        if (this.record.uploadFiles.length == 0) {
            this.completeSave();
            return;
        }

        this._uploadServiceProxy
            .uploadFiles(this.record.uploadFiles.map(p => p.file), this._tokenService.getToken())
            .pipe(finalize(() => this.hideMainSpinner()))
            .subscribe(event => {
                if (event instanceof HttpResponse) {
                    if (event.body.success) {
                        let index: number = 0;
                        for (let token of event.body.result.fileTokens) {
                            this.record.uploadFiles[index].token = token;
                            index++;
                        }
                        this.completeSave();
                    } else
                        this.message.info(event.body.error?.details ? event.body.error?.details : 'No se pudo completar la transacción, intente nuevamente mas tarde', 'Aviso');
                }
            }, (error) => {
                this.message.error(error?.error?.error?.details ? error.error.error.details : 'No se pudo completar la transacción, intente nuevamente mas tarde', 'Aviso');
            });
    }

    removeResource(resource: RecordResourceDto, index: number) {
        resource.remove = true;
    }

    restoreResource(resource: RecordResourceDto) {
        resource.remove = false;
    }

    selectSocialConflict(socialConflict: UtilitySocialConflictDto) {
        this.record.socialConflict = socialConflict;
        this.record.womanCompromise = socialConflict.womanCompromise;
    }

    saveAttach(attachment: AttachmentUploadDto) {
        this.record.uploadFiles.push(attachment);
    }

    backButtonPressed() {
        this.router.navigate(['/app/application/records'], { queryParams: {} });
    }
}