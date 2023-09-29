import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { QuizResponseDto, QuizResponseServiceProxy } from '@shared/service-proxies/application/quiz-response-proxie';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'response.component.html',
    styleUrls: [
        'response.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class QuizResponseComponent extends AppComponentBase implements AfterViewInit {

    busy: boolean = false;
    loaded: boolean = false;

    configuration: QuizResponseDto = new QuizResponseDto();

    constructor(_injector: Injector, private _quizResponseServiceProxy: QuizResponseServiceProxy) {
        super(_injector);
    }

    ngAfterViewInit(): void {
        setTimeout(async () => {
            this.showMainSpinner('Cargando configuración por favor espere...');

            this._quizResponseServiceProxy.get().pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1500))).subscribe(response => {
                this.configuration.customerSubject = response.customerSubject;
                this.configuration.customerBody = response.customerBody;

                this.configuration.adminSubject = response.adminSubject;
                this.configuration.adminBody = response.adminBody;
                this.loaded = true;
            });
        }, 500);
    }

    save() {
        if (this.isNullEmptyOrWhiteSpace(this.configuration.adminSubject)) {
            this.message.info('El asunto del mensaje de respuesta al usuario de la SGSD es obligatorio', 'Aviso');
            return;
        }
        if (this.isNullEmptyOrWhiteSpace(this.configuration.adminBody)) {
            this.message.info('El cuerpo del mensaje de respuesta al usuario de la SGSD es obligatorio', 'Aviso');
            return;
        }
        if (this.isNullEmptyOrWhiteSpace(this.configuration.customerSubject)) {
            this.message.info('El asunto del mensaje de respuesta al ciudadano es obligatorio', 'Aviso');
            return;
        }
        if (this.isNullEmptyOrWhiteSpace(this.configuration.customerBody)) {
            this.message.info('El cuerpo del mensaje de respuesta al ciudadano es obligatorio', 'Aviso');
            return;
        }

        this.showMainSpinner('Guardando configuración por favor espere...');
        this.busy = true;

        this._quizResponseServiceProxy.update(this.configuration).pipe(finalize(() => setTimeout(() => {
            this.busy = false;
            this.hideMainSpinner();
        }, 1500))).subscribe(() => {
            this.notify.success('Cambios guardados satisfactoriamente');
        });
    }
}