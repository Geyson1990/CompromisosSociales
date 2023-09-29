import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CreateEditSectorMeetComponent } from './create-edit-meet/create-edit-sector-meet.component';
import { CreateEditSessionComponent } from './create-edit-session/create-edit-session.component';
import { SectorMeetComponent } from './dashboard/sector-meet.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'dashboard', component: SectorMeetComponent, data: { permission: 'Pages.ConflictTools.SectorMeet' } },
                    { path: 'create-meet', component: CreateEditSectorMeetComponent, data: { permission: 'Pages.ConflictTools.SectorMeet.Create' } },
                    { path: 'edit-meet/:id', component: CreateEditSectorMeetComponent, data: { permission: 'Pages.ConflictTools.SectorMeet.Edit' } },         
                    { path: 'create-session/:meet', component: CreateEditSessionComponent, data: { permission: 'Pages.ConflictTools.SectorMeet.Create' } },
                    { path: 'edit-session/:meet/:id', component: CreateEditSessionComponent, data: { permission: 'Pages.ConflictTools.SectorMeet.Edit' } },                    
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
export class SectorMeetRoutingModule {

    constructor(router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                window.scroll(0, 0);
            }
        });
    }
}
