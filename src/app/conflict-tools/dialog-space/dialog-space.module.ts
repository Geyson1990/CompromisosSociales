import { NgModule } from '@angular/core';
import { ComponentModule } from '@shared/component/component.module';
import { AppSharedModule } from '@shared/utils/app-shared.module';
import { CreateEditDialogSpaceComponent } from './create-edit-dialog-space/create-edit-dialog-space.component';
import { CreateEditTeamInformationComponent } from './create-edit-dialog-space/general-information/create-edit-team/create-edit-team.component';
import { DialogSpaceGeneralInformationComponent } from './create-edit-dialog-space/general-information/general-information.component';
import { CreateEditDocumentComponent } from './create-edit-document/create-edit-document.component';
import { DialogSpaceDocumentGeneralInformationComponent } from './create-edit-document/general-information/general-information.component';
import { DialogSpaceDashboardComponent } from './dashboard/dialog-space.component';
import { DialogSpaceRoutingModule } from './dialog-space.routing.module';

@NgModule({
    imports: [
        AppSharedModule,
        ComponentModule,
        DialogSpaceRoutingModule
    ],
    declarations: [
        //DIALOG SPACE
        DialogSpaceDashboardComponent,
        CreateEditDialogSpaceComponent,
        DialogSpaceGeneralInformationComponent,
        CreateEditTeamInformationComponent,

        //DOCUMENTS
        CreateEditDocumentComponent,
        DialogSpaceDocumentGeneralInformationComponent
    ]
})
export class DialogSpaceModule { }
