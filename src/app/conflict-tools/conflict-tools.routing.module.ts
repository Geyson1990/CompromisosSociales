import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CreateEditCrisisCommitteeComponent } from './crisis-committee/create-edit-crisis-committee/create-edit-crisis-committee.component';
import { CrisisCommitteeComponent } from './crisis-committee/crisis-committee.component';
import { SocialConflictReportComponent } from './social-conflict-report/social-conflict-report.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'crisis-committee', component: CrisisCommitteeComponent, data: { permission: 'Pages.Application.CrisisCommittee' } },
                    { path: 'create-crisis-committee', component: CreateEditCrisisCommitteeComponent, data: { permission: 'Pages.ConflictTools.CrisisCommittee.Create' } },
                    { path: 'edit-crisis-committee/:id', component: CreateEditCrisisCommitteeComponent, data: { permission: 'Pages.ConflictTools.CrisisCommittee.Edit' } },              
                    {
                        path: 'dialog-space',
                        loadChildren: () => import('./dialog-space/dialog-space.module').then(m => m.DialogSpaceModule), //Lazy load admin module
                        data: { permission: 'Pages.ConflictTools.DialogSpace' }
                    },
                    {
                        path: 'intervention-plan',
                        loadChildren: () => import('./intervention-plan/intervention-plan.module').then(m => m.InterventionPlanModule), //Lazy load admin module
                        data: { permission: 'Pages.ConflictTools.InterventionPlan' }
                    },
                    {
                        path: 'sector-meet',
                        loadChildren: () => import('./sector-meet/sector-meet.module').then(m => m.SectorMeetModule), //Lazy load admin module
                        data: { permission: 'Pages.ConflictTools.SectorMeet' }
                    },
                    {
                        path: 'programation-meet',
                        loadChildren: () => import('./programation-meet/programation-meet.module').then(m => m.ProgramationMeetModule), //Lazy load admin module
                        data: { permission: 'Pages.ConflictTools.ProgramationMeet' }
                    },
                    { path: 'social-conflict-report', component: SocialConflictReportComponent },
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
export class ConflictToolsRoutingModule {

    constructor(router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                window.scroll(0, 0);
            }
        });
    }
}
