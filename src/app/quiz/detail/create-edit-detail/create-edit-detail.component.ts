import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { QuizCompleteType, QuizDetailDto, QuizDetailServiceProxy, QuizDetailStateDto } from '@shared/service-proxies/application/quiz-detail-proxie';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'create-edit-detail.component.html',
    styleUrls: [
        'create-edit-detail.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class CreateEditDetailQuizComponent extends AppComponentBase implements OnInit {

    busy: boolean = false;
    loaded: boolean = false;

    name: string;
    surname: string;
    secondSurname: string;
    emailAddress: string;
    quiz: QuizDetailDto;
    quizStates: QuizDetailStateDto[];

    constructor(_injector: Injector, private _activatedRoute: ActivatedRoute, private _quizDetailServiceProxy: QuizDetailServiceProxy) {
        super(_injector);
    }

    ngOnInit() {
        const parameter = +this._activatedRoute.snapshot.paramMap.get('id');

        setTimeout(() => {
            this.showMainSpinner('Cargando información, por favor espere...');
            this._quizDetailServiceProxy
                .get(parameter)
                .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1500)))
                .subscribe(response => {
                    this.quiz = response.quiz;
                    this.quizStates = response.states;

                    if(this.quiz.type == QuizCompleteType.ADMINITRATIVE) {
                        this.name = this.quiz.customer?.name;
                        this.surname = this.quiz.customer?.surname;
                        this.secondSurname = this.quiz.customer?.secondSurname;
                        this.emailAddress = this.quiz.customer?.emailAddress;
                    } else {
                        this.name = this.quiz.name;
                        this.surname = this.quiz.surname;
                        this.secondSurname = this.quiz.secondSurname;
                        this.emailAddress = this.quiz.emailAddress;
                    }

                    this.loaded = true;
                }, () => this.backButtonPressed());
        }, 500);

    }

    save() {
        if (this.quiz.quizState.id == -1) {
            this.message.info('Debe seleccionar un estado antes de guardar los cambios', 'Aviso');
            return;
        }

        this.showMainSpinner('Guardando información, por favor espere...');
        this._quizDetailServiceProxy
            .update(this.quiz)
            .pipe(finalize(() => this.busy = false))
            .subscribe(() => {
                setTimeout(() => {
                    this.backButtonPressed();
                    this.hideMainSpinner();
                }, 1500);
            }, () => setTimeout(() => this.hideMainSpinner(), 1500));
    }

    backButtonPressed() {
        this.router.navigate(['/app/quiz/platform'], { queryParams: {} });
    }

}