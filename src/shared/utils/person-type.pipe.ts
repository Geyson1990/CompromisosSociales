import { PipeTransform, Pipe } from "@angular/core";
import { PersonType } from '@shared/service-proxies/service-proxies';

@Pipe({ name: 'personType' })
export class PersonTypePipe implements PipeTransform {

    constructor() { }

    transform(personType: PersonType) {
        switch (personType) {
            case PersonType.Analyst:
                return ' - ANALISTA';
            case PersonType.Coordinator:
                return ' - COORDINADOR';
            case PersonType.Manager:
                return ' - GESTOR';
            default: return '';
        }
    }
}