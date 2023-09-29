import { TokenService } from 'abp-ng2-module';
import { Component, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ProfileServiceProxy, UpdateProfilePictureInput } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { UploadServiceProxy } from '@shared/service-proxies/application/upload-proxie';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'changeProfilePictureModal',
    templateUrl: './change-profile-picture-modal.component.html'
})
export class ChangeProfilePictureModalComponent extends AppComponentBase {

    @ViewChild('changeProfilePictureModal', { static: true }) modal: ModalDirective;

    active: boolean = false;
    temporaryPictureUrl: string;
    saving: boolean = false;
    maxProfilPictureBytesUserFriendlyValue = 5;
    imageChangedEvent: any = '';

    resource: globalThis.File;

    constructor(injector: Injector,
        private _profileServiceProxy: ProfileServiceProxy,
        private _uploadServiceProxy: UploadServiceProxy,
        private _tokenService: TokenService) {
        super(injector);
    }

    show(): void {
        this.active = true;
        this.temporaryPictureUrl = '';
        this.resource = undefined;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.imageChangedEvent = '';
        this.modal.hide();
    }

    fileChangeEvent(event: any): void {
        if (event.target.files[0].size > 5242880) { //5MB
            this.message.warn('La image de perfil no puede exceder los 5MB', 'Aviso');
            return;
        }

        this.imageChangedEvent = event;
    }

    imageCroppedFile(event: ImageCroppedEvent) {
        this.resource = <File>base64ToFile(event.base64);
    }

    save(): void {
        if (!this.resource) {
            this.message.info('Estimado usuario, debe ingresar una imagen de perfil. Verifique la información antes de continuar', 'Aviso');
            return;
        }

        this.uploadFiles((token) => {
            this._profileServiceProxy
                .updateProfilePicture(new UpdateProfilePictureInput({
                    token: token,
                    extension: this.resource.type.split('/')[1]
                })).pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1500)))
                .subscribe((response) => {
                    this.appSession.user.profilePicture = response.resource;
                    this.notify.success('Se ha cambiado satisfactoriamente la imagen de perfil', 'Aviso');
                    abp.event.trigger('app.show.profilePictureChanged');
                    this.close();
                })
        });
    }

    private uploadFiles(callback: (token: string) => void) {

        this.showMainSpinner('Guardando información, por favor espere...');

        this._uploadServiceProxy
            .uploadFiles([this.resource], this._tokenService.getToken())
            .subscribe(event => {
                if (event instanceof HttpResponse) {
                    if (event.body.success) {
                        callback(event.body.result.fileTokens[0]);
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
