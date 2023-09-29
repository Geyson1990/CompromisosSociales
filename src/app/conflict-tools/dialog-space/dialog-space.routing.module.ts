import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CreateEditDialogSpaceComponent } from './create-edit-dialog-space/create-edit-dialog-space.component';
import { CreateEditDocumentComponent } from './create-edit-document/create-edit-document.component';
import { DialogSpaceDashboardComponent } from './dashboard/dialog-space.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'dashboard', component: DialogSpaceDashboardComponent, data: { permission: 'Pages.Application.DialogSpace' } },
                    { path: 'create-dialog-space', component: CreateEditDialogSpaceComponent, data: { permission: 'Pages.Application.DialogSpace.Create' } },
                    { path: 'edit-dialog-space/:id', component: CreateEditDialogSpaceComponent, data: { permission: 'Pages.Application.DialogSpace.Edit' } },
                    { path: 'create-document/:dialogSpaceId', component: CreateEditDocumentComponent, data: { permission: 'Pages.Application.DialogSpace.Create' } },
                    { path: 'edit-document/:dialogSpaceId/:dialogSpaceDocumentId', component: CreateEditDocumentComponent, data: { permission: 'Pages.Application.DialogSpace.Edit' } },
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
export class DialogSpaceRoutingModule {

    constructor(router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                window.scroll(0, 0);
            }
        });
    }
}
