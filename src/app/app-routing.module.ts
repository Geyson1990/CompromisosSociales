import { NgModule } from '@angular/core';
import { NavigationEnd, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from './shared/common/auth/auth-route-guard';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsComponent } from './shared/layout/notifications/notifications.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'app',
                component: AppComponent,
                canActivate: [AppRouteGuard],
                canActivateChild: [AppRouteGuard],
                children: [
                    {
                        path: '',
                        children: [
                            { path: 'notifications', component: NotificationsComponent },
                            { path: '', redirectTo: '/app/main/dashboard', pathMatch: 'full' }
                        ]
                    },
                    {
                        path: 'admin',
                        loadChildren: () => import('app/admin/admin.module').then(m => m.AdminModule), //Lazy load admin module
                        data: { preload: true },
                        canLoad: [AppRouteGuard]
                    },
                    {
                        path: 'maintenance',
                        loadChildren: () => import('app/maintenance/maintenance.module').then(m => m.MaintenanceModule), //Lazy load maintenance module
                        data: { preload: true },
                        canLoad: [AppRouteGuard]
                    },
                    {
                        path: 'application',
                        loadChildren: () => import('app/application/application.module').then(m => m.ApplicationModule), //Lazy load application module
                        data: { preload: true },
                        canLoad: [AppRouteGuard]
                    },
                    {
                        path: 'management',
                        loadChildren: () => import('app/management/management.module').then(m => m.ManagementModule), //Lazy load management module
                        data: { preload: true },
                        canLoad: [AppRouteGuard]
                    },
                    {
                        path: 'quiz',
                        loadChildren: () => import('app/quiz/quiz.module').then(m => m.QuizModule), //Lazy load management module
                        data: { preload: true },
                        canLoad: [AppRouteGuard]
                    },
                    {
                        path: 'conflict-tools',
                        loadChildren: () => import('app/conflict-tools/conflict-tools.module').then(m => m.ConflictToolsModule), //Lazy load conflict-tools module
                        data: { preload: true },
                        canLoad: [AppRouteGuard]
                    },
                    {
                        path: '**', redirectTo: 'notifications'
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {
    constructor(
        private router: Router,
        private spinnerService: NgxSpinnerService
    ) {
        router.events.subscribe((event) => {

            if (event instanceof RouteConfigLoadStart) {
                spinnerService.show();
            }

            if (event instanceof RouteConfigLoadEnd) {
                spinnerService.hide();
            }

            if (event instanceof NavigationEnd) {
                document.querySelector('meta[property=og\\:url').setAttribute('content', window.location.href);
            }
        });
    }
}
