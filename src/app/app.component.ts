import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { SubscriptionStartType } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { AppComponentBase } from 'shared/common/app-component-base';
import { NotificationSettingsModalComponent } from './shared/layout/notifications/notification-settings-modal.component';
import { UserNotificationHelper } from './shared/layout/notifications/UserNotificationHelper';
import { ChangePasswordModalComponent } from './shared/layout/profile/change-password-modal/change-password-modal.component';
import { ChangeProfilePictureModalComponent } from './shared/layout/profile/change-profile-picture-modal/change-profile-picture-modal.component';
import { MySettingsModalComponent } from './shared/layout/profile/my-settings-modal/my-settings-modal.component';

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent extends AppComponentBase implements OnInit {

    subscriptionStartType = SubscriptionStartType;
    theme: string;

    @ViewChild('chatBarComponent') chatBarComponent;
    @ViewChild('notificationSettingsModal', { static: true }) notificationSettingsModal: NotificationSettingsModalComponent;
    @ViewChild('changePasswordModal', { static: true }) changePasswordModal: ChangePasswordModalComponent;
    @ViewChild('changeProfilePictureModal', { static: true }) changeProfilePictureModal: ChangeProfilePictureModalComponent;
    @ViewChild('mySettingsModal', { static: true }) mySettingsModal: MySettingsModalComponent;
    
    isQuickThemeSelectEnabled: boolean = this.setting.getBoolean('App.UserManagement.IsQuickThemeSelectEnabled');
    IsSessionTimeOutEnabled: boolean = this.setting.getBoolean('App.UserManagement.SessionTimeOut.IsEnabled') && this.appSession.userId != null;

    public constructor(injector: Injector, private _userNotificationHelper: UserNotificationHelper) {
        super(injector);
    }

    ngOnInit(): void {
        this._userNotificationHelper.settingsModal = this.notificationSettingsModal;
        this.theme = abp.setting.get('App.UiManagement.Theme').toLocaleLowerCase();
        this.registerModalOpenEvents();
    }

    subscriptionStatusBarVisible(): boolean {
        return this.appSession.tenantId > 0 &&
            (this.appSession.tenant.isInTrialPeriod ||
                this.subscriptionIsExpiringSoon());
    }

    subscriptionIsExpiringSoon(): boolean {
        if (this.appSession.tenant.subscriptionEndDateUtc) {
            return moment().utc().add(AppConsts.subscriptionExpireNootifyDayCount, 'days') >= moment(this.appSession.tenant.subscriptionEndDateUtc);
        }

        return false;
    }

    registerModalOpenEvents(): void {
        abp.event.on('app.show.changePasswordModal', () => this.changePasswordModal.show());
        abp.event.on('app.show.changeProfilePictureModal', () => this.changeProfilePictureModal.show());
        abp.event.on('app.show.mySettingsModal', () => this.mySettingsModal.show());
    }

    getRecentlyLinkedUsers(): void {
        abp.event.trigger('app.getRecentlyLinkedUsers');
    }

    onMySettingsModalSaved(): void {
        abp.event.trigger('app.onMySettingsModalSaved');
    }
}
