import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardSocialConflictAlertComponent } from './social-conflict-alert/dashboard-social-conflict-alert.component';
import { DashboardSocialConflictSensibleComponent } from './social-conflict-sensible/dashboard-social-conflict-sensible.component';
import { DashboardSocialConflictComponent } from './social-conflict/dashboard-social-conflict.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: DashboardComponent,
                children: [
                    { path: 'social-conflict', component: DashboardSocialConflictComponent, data: { permission: 'Pages.Application.SocialConflictDashboard' } },
                    { path: 'social-conflict-alert', component: DashboardSocialConflictAlertComponent, data: { permission: 'Pages.Application.SocialConflictAlertDashboard' } },
                    { path: 'social-conflict-sensible', component: DashboardSocialConflictSensibleComponent, data: { permission: 'Pages.Application.SocialConflictSensibleDashboard' } },
                    { path: '', redirectTo: '/app/admin/hostDashboard', pathMatch: 'full' },
                    { path: '**', redirectTo: '/app/admin/hostDashboard' }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule {

    constructor(private router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                window.scroll(0, 0);
            }
        });
    }
}
