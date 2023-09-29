import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { QuizStateDto, QuizStateServiceProxy } from '@shared/service-proxies/application/quiz-state-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-quiz-state',
    templateUrl: 'create-edit-state.component.html',
    styleUrls: [
        'create-edit-state.component.css'
    ]
})
export class CreateEditQuizStateComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    
    item: QuizStateDto = new QuizStateDto();
    state: string;
    defaultState: string;
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector, private _quizstateServiceProxy: QuizStateServiceProxy) {
        super(_injector);
    }

    show(id?: number): void {

        this.saving = false;
        this.item = new QuizStateDto();
        this.state = 'true';
        this.defaultState = 'false';

        if (id) {
            this._quizstateServiceProxy.get(id).subscribe(result => {
                this.item = result;
                this.state = result.enabled ? 'true' : 'false';
                this.defaultState = result.default ? 'true' : 'false';
                this.active = true;
                this.modal.show();
            });
        } else {
            this.active = true;
            this.modal.show();
        }

    }
    onShown(): void {
        document.getElementById('Name').focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        this.saving = true;
        this.item.enabled = this.state && this.state == 'true';
        this.item.default = this.defaultState && this.defaultState == 'true';
        
        if (this.item.id) {
            this._quizstateServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        } else {
            this._quizstateServiceProxy
                .create(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Creado satisfactoriamente');
                    this.close();
                });
        }

    }
}
