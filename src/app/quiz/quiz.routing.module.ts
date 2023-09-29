import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CreateEditDetailQuizComponent } from './detail/create-edit-detail/create-edit-detail.component';
import { QuizDetailComponent } from './detail/detail.componen';
import { QuizFormComponent } from './form/form.component';
import { QuizResponseComponent } from './response/response.component';
import { QuizStateComponent } from './state/state.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'states', component: QuizStateComponent, data: { permission: 'Pages.Quiz.States' } },
                    { path: 'responses', component: QuizResponseComponent, data: { permission: 'Pages.Quiz.Responses' } },
                    { path: 'customers', component: QuizFormComponent, data: { permission: 'Pages.Quiz.Customer' } },
                    { path: 'platform', component: QuizDetailComponent, data: { permission: 'Pages.Quiz.Platform' } },
                    { path: 'edit-platform/:id', component: CreateEditDetailQuizComponent, data: { permission: 'Pages.Quiz.Platform' } },
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
export class QuizRoutingModule {

    constructor(router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                window.scroll(0, 0);
            }
        });
    }
}
