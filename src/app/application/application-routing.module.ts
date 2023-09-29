import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ActorComponent } from './actor/actor.component';
import { ComplianceComponent } from './compliance/compliance.component';
import { CompromiseComponent } from './compromise/compromise.component';
import { CreateEditCompromiseComponent } from './compromise/create-edit-compromise/create-edit-compromise.component';
import { CreateEditHelpMemoryComponent } from './help-memory/create-edit-help-memory/create-edit-memory.component';
import { HelpMemoryComponent } from './help-memory/help-memory.component';
import { LogoutComponent } from './logout/logout.component';
import { CreateEditOrderComponent } from './order/create-edit-order/create-edit-order.component';
import { OrderComponent } from './order/order.component';
import { CreateEditRecordComponent } from './record/create-edit-record/create-edit-record.component';
import { RecordComponent } from './record/record.component';
import { SocialConflictAlertHistoryComponent } from './social-conflict-alert-history/social-conflict-alert-history.component';
import { CreateEditSocialConflictAlertComponent } from './social-conflict-alert/create-edit-social-conflict-alert/create-edit-social-conflict-alert.component';
import { SocialConflictAlertComponent } from './social-conflict-alert/social-conflict-alert.component';
import { CreateEditSocialConflictSensibleSensibleComponent } from './social-conflict-sensible/create-edit-social-conflict-sensible/create-edit-social-conflict-sensible.component';
import { SocialConflictSensibleComponent } from './social-conflict-sensible/social-conflict-sensible.component';
import { SocialConflictTaskManagementHistoryComponent } from './social-conflict-task-management-history/social-conflict-task-management-history.component';
import { SocialConflictTaskManagementComponent } from './social-conflict-task-management/social-conflict-task-management.component';
import { CreateEditSocialConflictComponent } from './social-conflict/create-edit-social-conflict/create-edit-social-conflict.component';
import { SocialConflictComponent } from './social-conflict/social-conflict.component';
import { TaskManagementHistoryComponent } from './task-management-history/task-management-history.component';
import { TaskManagementComponent } from './task-management/task-management.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    {
                        path: 'dashboard',
                        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
                    },
                    { path: 'social-conflicts', component: SocialConflictComponent, data: { permission: 'Pages.Application.SocialConflict' } },
                    { path: 'social-conflict-actors', component: ActorComponent, data: { permission: 'Pages.Application.SocialConflict.Actor' } },
                    { path: 'create-social-conflict', component: CreateEditSocialConflictComponent, data: { permission: 'Pages.Application.SocialConflict.Create' } },
                    { path: 'edit-social-conflict/:id', component: CreateEditSocialConflictComponent, data: { permission: 'Pages.Application.SocialConflict' } },
                    { path: 'sensibles', component: SocialConflictSensibleComponent, data: { permission: 'Pages.Application.SocialConflictSensible' } },
                    { path: 'create-sensible', component: CreateEditSocialConflictSensibleSensibleComponent, data: { permission: 'Pages.Application.SocialConflictSensible.Create' } },
                    { path: 'edit-sensible/:id', component: CreateEditSocialConflictSensibleSensibleComponent, data: { permission: 'Pages.Application.SocialConflictSensible.Edit' } },
                    { path: 'alerts', component: SocialConflictAlertComponent, data: { permission: 'Pages.Application.SocialConflictAlert' } },
                    { path: 'create-alert', component: CreateEditSocialConflictAlertComponent, data: { permission: 'Pages.Application.SocialConflictAlert.Create' } },
                    { path: 'edit-alert/:id', component: CreateEditSocialConflictAlertComponent, data: { permission: 'Pages.Application.SocialConflictAlert.Edit' } },
                    { path: 'alert-histories', component: SocialConflictAlertHistoryComponent, data: { permission: 'Pages.Application.SocialConflictAlert.History' } },
                    { path: 'records', component: RecordComponent, data: { permission: 'Pages.Application.Record' } },
                    { path: 'create-edit-record', component: CreateEditRecordComponent, data: { permissions: ['Pages.Application.Record.Create', 'Pages.Application.Record.Edit'] } },
                    { path: 'compromises', component: CompromiseComponent, data: { permission: 'Pages.Application.Compromise' } },
                    { path: 'create-edit-compromises', component: CreateEditCompromiseComponent, data: { permissions: ['Pages.Application.Compromise.Create', 'Pages.Application.Compromise.Edit'] } },
                    { path: 'task-management', component: TaskManagementComponent, data: { permission: 'Pages.Application.TaskManagement' } },
                    { path: 'task-management-histories', component: TaskManagementHistoryComponent, data: { permission: 'Pages.Application.TaskManagement.History' } },
                    { path: 'sc-task-managements', component: SocialConflictTaskManagementComponent, data: { permission: 'Pages.Application.SocialConflictTaskManagement' } },
                    { path: 'sc-task-management-histories', component: SocialConflictTaskManagementHistoryComponent, data: { permission: 'Pages.Application.SocialConflictTaskManagement.History' } },
                    { path: 'help-memories', component: HelpMemoryComponent, data: { permission: 'Pages.Application.HelpMemory' } },
                    { path: 'create-help-memory', component: CreateEditHelpMemoryComponent, data: { permission: 'Pages.Application.HelpMemory.Create' } },
                    { path: 'edit-help-memory/:id', component: CreateEditHelpMemoryComponent, data: { permission: 'Pages.Application.HelpMemory.Edit' } },
                    { path: 'orders', component: OrderComponent, data: { permission: 'Pages.Application.Order' } },
                    { path: 'create-edit-order', component: CreateEditOrderComponent, data: { permissions: ['Pages.Application.Order.Create', 'Pages.Application.Order.Edit'] } },
                    { path: 'compliances', component: ComplianceComponent, data: { permission: 'Pages.Application.Compliance' } },
                    { path: 'logout', component: LogoutComponent },
                    { path: '', pathMatch: 'full', redirectTo: '/app/admin/hostDashboard' },
                    { path: '**', redirectTo: '/app/admin/hostDashboard' }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ApplicationRoutingModule {

    constructor(private router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                window.scroll(0, 0);
            }
        });
    }
}
