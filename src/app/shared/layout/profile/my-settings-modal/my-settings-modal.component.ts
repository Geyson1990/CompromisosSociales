import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CurrentUserProfileEditDto, ProfileServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'mySettingsModal',
    templateUrl: './my-settings-modal.component.html'
})
export class MySettingsModalComponent extends AppComponentBase {

    @ViewChild('mySettingsModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    user: CurrentUserProfileEditDto;

    constructor(injector: Injector, private _profileService: ProfileServiceProxy) {
        super(injector);
    }

    show(): void {
        this.active = true;
        this._profileService.getCurrentUserProfileForEdit().subscribe((result) => {
            this.user = result;
            this.modal.show();
        });
    }

    onShown(): void {
        document.getElementById('Name').focus();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    save(): void {
        this.saving = true;
        this._profileService.updateCurrentUserProfile(this.user)
            .pipe(finalize(() => this.saving = false))
            .subscribe(() => {
                this.appSession.user.document = (this.user.document || '').trim();
                this.appSession.user.name = (this.user.name || '').toUpperCase().trim();
                this.appSession.user.surname = (this.user.surname || '').toUpperCase().trim();
                this.appSession.user.surname2 = (this.user.surname2 || '').toUpperCase().trim();
                this.notify.info('Perfil actualziado satisfactoriamente');
                abp.event.trigger('app.onMySettingsModalSaved');
                this.close();
            });
    }

}
