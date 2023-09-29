import { Component, Input } from '@angular/core';
import { QuizDetailFormDto } from '@shared/service-proxies/application/quiz-detail-proxie';

@Component({
    selector: 'quiz-detail-form-option',
    templateUrl: 'detail-option.component.html',
    styleUrls: [
        'detail-option.component.css'
    ]
})
export class QuizDetailOptionComponent {

    @Input() form: QuizDetailFormDto;
    @Input() write: boolean = true;
}