import { Injector, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbpMultiTenancyService, AbpSessionService } from 'abp-ng2-module';
import { ImpersonationService } from '@app/admin/users/impersonation.service';
import { AppAuthService } from '@app/shared/common/auth/app-auth.service';
import { AppConsts } from '@shared/AppConsts';
import { ThemesLayoutBaseComponent } from '@app/shared/layout/themes/themes-layout-base.component';
import { ChangeUserLanguageDto, LinkedUserDto, ProfileServiceProxy, UserLinkServiceProxy } from '@shared/service-proxies/service-proxies';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import * as _ from 'lodash';

@Component({
    templateUrl: './topbar.component.html',
    selector: 'topbar',
    encapsulation: ViewEncapsulation.None
})
export class TopBarComponent extends ThemesLayoutBaseComponent implements OnInit {

    private defaultProfilePicture = AppConsts.appBaseUrl + '/assets/common/images/default-profile-picture.png';

    isHost = false;
    languages: abp.localization.ILanguageInfo[];
    currentLanguage: abp.localization.ILanguageInfo;
    isImpersonatedLogin = false;
    isMultiTenancyEnabled = false;
    shownLoginName = '';
    tenancyName = '';
    userName = '';
    names = '';
    emailAddress = '';
    role = '';
    profilePicture = this.defaultProfilePicture;
    defaultLogo = AppConsts.appBaseUrl + '/assets/common/images/app-logo-on-' + this.currentTheme.baseSettings.menu.asideSkin + '.svg';
    recentlyLinkedUsers: LinkedUserDto[];
    unreadChatMessageCount = 0;
    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;
    chatConnected = false;
    isQuickThemeSelectEnabled: boolean = this.setting.getBoolean('App.UserManagement.IsQuickThemeSelectEnabled');
    installationMode = true;

    constructor(
        injector: Injector,
        private _abpSessionService: AbpSessionService,
        private _abpMultiTenancyService: AbpMultiTenancyService,
        private _profileServiceProxy: ProfileServiceProxy,
        private _userLinkServiceProxy: UserLinkServiceProxy,
        private _authService: AppAuthService,
        private _impersonationService: ImpersonationService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.installationMode = UrlHelper.isInstallUrl(location.href);
        this.isHost = !this._abpSessionService.tenantId;
        this.isMultiTenancyEnabled = this._abpMultiTenancyService.isEnabled;
        this.languages = _.filter(this.localization.languages, l => (l).isDisabled === false);
        this.currentLanguage = this.localization.currentLanguage;
        this.isImpersonatedLogin = this._abpSessionService.impersonatorUserId > 0;
        this.setCurrentLoginInformations();
        this.getProfilePicture();
        this.getRecentlyLinkedUsers();

        this.registerToEvents();
        this
    }

    registerToEvents() {
        abp.event.on('app.show.profilePictureChanged', () => {
            this.getProfilePicture();
        });

        abp.event.on('app.chat.unreadMessageCountChanged', messageCount => {
            this.unreadChatMessageCount = messageCount;
        });

        abp.event.on('app.chat.connected', () => {
            this.chatConnected = true;
        });

        abp.event.on('app.getRecentlyLinkedUsers', () => {
            this.getRecentlyLinkedUsers();
        });

        abp.event.on('app.onMySettingsModalSaved', () => {
            this.setCurrentLoginInformations();
        });
    }

    changeLanguage(languageName: string): void {
        const input = new ChangeUserLanguageDto();
        input.languageName = languageName;

        this._profileServiceProxy.changeLanguage(input).subscribe(() => {
            abp.utils.setCookieValue(
                'Abp.Localization.CultureName',
                languageName,
                new Date(new Date().getTime() + 5 * 365 * 86400000), //5 year
                abp.appPath
            );

            window.location.reload();
        });
    }

    setCurrentLoginInformations(): void {
        this.shownLoginName = this.appSession.getShownLoginName();
        this.tenancyName = this.appSession.tenancyName;
        this.userName = this.appSession.user.userName;
        this.names = `${(this.appSession.user.name ||'')} ${(this.appSession.user.surname ||'')} ${(this.appSession.user.surname2 ||'')}`
        this.emailAddress = this.appSession.user.emailAddress;
        this.role = this.appSession.user.role;
    }

    getShownUserName(linkedUser: LinkedUserDto): string {
        if (!this._abpMultiTenancyService.isEnabled) {
            return linkedUser.username;
        }

        return (linkedUser.tenantId ? linkedUser.tenancyName : '.') + '\\' + linkedUser.username;
    }

    getProfilePicture(): void {
        if(this.appSession.user.profilePicture) {
            this.profilePicture = `${AppConsts.remoteServiceBaseUrl}/Resource/LoadProfilePictureResource?resource=${this.appSession.user.profilePicture}&time=${new Date().getTime()}`;
        } else {
            this.profilePicture = this.defaultProfilePicture;
        }
    }

    getRecentlyLinkedUsers(): void {
        this._userLinkServiceProxy.getRecentlyUsedLinkedUsers().subscribe(result => {
            this.recentlyLinkedUsers = result.items;
        });
    }

    showLoginAttempts(): void {
        abp.event.trigger('app.show.loginAttemptsModal');
    }

    showLinkedAccounts(): void {
        abp.event.trigger('app.show.linkedAccountsModal');
    }

    showUserDelegations(): void {
        abp.event.trigger('app.show.userDelegationsModal');
    }

    changePassword(): void {
        abp.event.trigger('app.show.changePasswordModal');
    }

    changeProfilePicture(): void {
        abp.event.trigger('app.show.changeProfilePictureModal');
    }

    changeMySettings(): void {
        abp.event.trigger('app.show.mySettingsModal');
    }

    logout(): void {
        this._authService.logout();
    }

    backToMyAccount(): void {
        this._impersonationService.backToImpersonator();
    }

    switchToLinkedUser(linkedUser: LinkedUserDto): void {
      
    }

    downloadCollectedData(): void {
        this._profileServiceProxy.prepareCollectedData().subscribe(() => {
            this.message.success(this.l('GdprDataPrepareStartedNotification'));
        });
    }
}
