import { PermissionCheckerService, RefreshTokenService } from 'abp-ng2-module';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { AppSessionService } from '@shared/common/session/app-session.service';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { Observable } from '@node_modules/rxjs/internal/Observable';
import { of, Subject } from 'rxjs';

@Injectable()
export class AppRouteGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(
        private _permissionChecker: PermissionCheckerService,
        private _router: Router,
        private _sessionService: AppSessionService,
        private _refreshTokenService: RefreshTokenService
    ) { }

    canActivateInternal(data: any, state: RouterStateSnapshot): Observable<boolean> {
        if (UrlHelper.isInstallUrl(location.href)) {
            return of(true);
        }

        if (!this._sessionService.user) {
            let sessionObservable = new Subject<any>();

            this._refreshTokenService.tryAuthWithRefreshToken()
                .subscribe(
                    (autResult: boolean) => {
                        if (autResult) {
                            sessionObservable.next(true);
                            sessionObservable.complete();
                            location.reload();
                        } else {
                            sessionObservable.next(false);
                            sessionObservable.complete();
                            this._router.navigate(['/account/login']);
                        }
                    },
                    (error) => {
                        sessionObservable.next(false);
                        sessionObservable.complete();
                        this._router.navigate(['/account/login']);
                    }
                );
            return sessionObservable;
        }

        if (!data || !data['permission'] || !data['permissions']) {
            return of(true);
        }

        if (data['permission'] && this._permissionChecker.isGranted(data['permission'])) {
            return of(true);
        }

        if(data['permissions']) {
            for (const permission of data['permissions']) {
                if (this._permissionChecker.isGranted(permission)) {
                    return of(true);
                }
            }
        }

        this._router.navigate([this.selectBestRoute()]);
        return of(false);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivateInternal(route.data, state);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(route, state);
    }

    canLoad(route: any): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivateInternal(route.data, null);
    }

    selectBestRoute(): string {

        if (!this._sessionService.user) {
            return '/account/login';
        }

        if (this._permissionChecker.isGranted('Pages.Administration.Host.Dashboard')) {
            return '/app/admin/hostDashboard';
        }

        if (this._permissionChecker.isGranted('Pages.Tenants')) {
            return '/app/admin/tenants';
        }

        if (this._permissionChecker.isGranted('Pages.Administration.Users')) {
            return '/app/admin/users';
        }

        return '/app/notifications';
    }
}
