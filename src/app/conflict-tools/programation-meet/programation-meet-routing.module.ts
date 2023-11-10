import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CreateEditSectorMeetComponent } from './create-edit-meet/create-edit-sector-meet.component';
import { CreateEditSessionComponent } from './create-edit-session/create-edit-session.component';
import { ProgramationMeetComponent } from './dashboard/programation-meet.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'dashboard', component: ProgramationMeetComponent, data: { permission: 'Pages.ConflictTools.ProgramationMeet' } },
                    { path: 'create-meet', component: CreateEditSectorMeetComponent, data: { permission: 'Pages.ConflictTools.ProgramationMeet.Create' } },
                    { path: 'edit-meet/:id', component: CreateEditSectorMeetComponent, data: { permission: 'Pages.ConflictTools.ProgramationMeet.Edit' } },         
                    { path: 'create-session/:meet', component: CreateEditSessionComponent, data: { permission: 'Pages.ConflictTools.ProgramationMeet.Create' } },
                    { path: 'edit-session/:meet/:id', component: CreateEditSessionComponent, data: { permission: 'Pages.ConflictTools.ProgramationMeet.Edit' } },                    
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    { path: '**', redirectTo: 'dashboard' }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ProgramationMeetRoutingModule {

    constructor(router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                window.scroll(0, 0);
            }
        });
    }
}
