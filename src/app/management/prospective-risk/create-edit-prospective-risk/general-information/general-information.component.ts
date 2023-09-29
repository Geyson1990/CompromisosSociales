import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProspectiveRiskDetailGetDto, ProspectiveRiskDto, ProspectiveRiskStaticVariableOptionDto, StaticVariableType } from '@shared/service-proxies/application/prospective-risk-proxie';

@Component({
    selector: 'general-information-prospective-risk',
    templateUrl: 'general-information.component.html',
    styleUrls: [
        'general-information.component.css'
    ]
})

export class GeneralInformationProspectiveRiskComponent {

    private _item: ProspectiveRiskDto;

    @Input() get item(): ProspectiveRiskDto {
        return this._item;
    }

    set item(item: ProspectiveRiskDto) {
        this._item = item;
    }

    @Output() itemChange: EventEmitter<ProspectiveRiskDto> = new EventEmitter<ProspectiveRiskDto>();
    @Output() optionValueChange: EventEmitter<ProspectiveRiskDto> = new EventEmitter<ProspectiveRiskDto>();

    tabIndex: number;
    optionTypes = {
        cuantitative: StaticVariableType.Cuantitative,
        cualitative: StaticVariableType.Cualitative
    }

    constructor() { }

    optionChange(option: ProspectiveRiskStaticVariableOptionDto, event: any) {
        const valueIndex: number = option.details.findIndex(p => p.id == event.target.value);

        if (valueIndex == -1)
            return;
        option.relationValue = option.details[valueIndex].value;
        const index: number = this.item.details.findIndex(p => p.staticVariableOptionId == option.id);

        if (index == -1) {
            this.item.details.push(new ProspectiveRiskDetailGetDto({
                id: undefined,
                staticVariableOptionId: option.id,
                value: option.details[valueIndex].value
            }));
        } else {
            this.item.details[index].value = option.details[valueIndex].value;
        }

        this.optionValueChange.emit(this.item);
    }

    onFixRateChange(event: any) {
        this.optionValueChange.emit(this.item);
    }
}