import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CreateEditInterventionPlanComponent } from './create-edit-intervention-plan/create-edit-intervention-plan.component';
import { InterventionPlanComponent } from './dashboard/intervention-plan.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'dashboard', component: InterventionPlanComponent, data: { permission: 'Pages.ConflictTools.InterventionPlan' } },
                    { path: 'create', component: CreateEditInterventionPlanComponent, data: { permission: 'Pages.ConflictTools.InterventionPlan.Create' } },    
                    { path: 'edit/:id', component: CreateEditInterventionPlanComponent, data: { permission: 'Pages.ConflictTools.InterventionPlan.Edit' } },                    
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
export class InterventionPlanRoutingModule {

    constructor(router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                window.scroll(0, 0);
            }
        });
    }
}
