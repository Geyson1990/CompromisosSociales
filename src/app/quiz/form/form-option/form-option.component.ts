import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuizAdministrativeFormDto, QuizAdministrativeFormOptionDto } from '@shared/service-proxies/application/quiz-customer-proxie';

@Component({
    selector: 'quiz-form-option',
    templateUrl: 'form-option.component.html',
    styleUrls: [
        'form-option.component.css'
    ]
})
export class QuizOptionComponent implements OnInit {

    private _form: QuizAdministrativeFormDto;

    @Input() set form(value: QuizAdministrativeFormDto) {
        this._form = value;
        this.formChange.emit(this._form);
    }

    get form(): QuizAdministrativeFormDto {
        return this._form;
    }

    @Output() formChange: EventEmitter<QuizAdministrativeFormDto> = new EventEmitter<QuizAdministrativeFormDto>();

    ngOnInit(): void {

    }

    change(value: QuizAdministrativeFormOptionDto) {
        if (this.form.selectedOptionId == value.id) {
            this.form.selectedOptionId = -1;
        } else {
            this.form.selectedOptionId = value.id;
        }
    }

}