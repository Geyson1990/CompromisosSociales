import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ConditionType, SocialConflictSensibleConditionDto, SocialConflictSensibleDto } from '@shared/service-proxies/application/social-conflict-sensible-proxie';
import { LazyLoadEvent, Paginator, SelectItem } from 'primeng';

@Component({
    selector: 'condition-information-social-conflict-sensible',
    templateUrl: 'condition-information.component.html',
    styleUrls: [
        'condition-information.component.css'
    ]
})
export class ConditionInformationSocialConflictSensibleComponent extends AppComponentBase implements OnInit {

    private _busy: boolean;
    private _socialConflictSensible: SocialConflictSensibleDto;
    private _verificationEnabled: boolean = false;

    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Input() get busy(): boolean {
        return this._busy;
    }

    set busy(value: boolean) {
        this._busy = value;
    }

    @Input() get socialConflictSensible(): SocialConflictSensibleDto {
        return this._socialConflictSensible;
    }

    set socialConflictSensible(value: SocialConflictSensibleDto) {
        this._socialConflictSensible = value;
    }

    @Output() addCondition: EventEmitter<void> = new EventEmitter<void>();
    @Output() editCondition: EventEmitter<{ index: number, value: SocialConflictSensibleConditionDto }> = new EventEmitter<{ index: number, value: SocialConflictSensibleConditionDto }>();

    types = {
        open: ConditionType.Open,
        closed: ConditionType.Closed
    };

    options: SelectItem[] = [
        { label: 'Aprobado', value: 'true', styleClass: 'state-aproved' },
        { label: 'No aprobado', value: 'false', styleClass: 'state-not-aproved' }
    ];

    get verificationEnabled() {
        return this._verificationEnabled;
    }
    
    private skipCount: number;
    private maxResultCount: number;

    constructor(_injector: Injector) {
        super(_injector);
        this.primengTableHelper.defaultRecordsCountPerPage = 5;
        this.skipCount = 0;
        this.maxResultCount = this.primengTableHelper.defaultRecordsCountPerPage;
        this._verificationEnabled = this.permission.isGranted('Pages.Application.SocialConflictSensible.Verification');
    }

    ngOnInit(): void {
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    getData(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    removeItem(condition: SocialConflictSensibleConditionDto, index: number) {
        if (condition.id) {
            condition.remove = true;
            this.notify.warn('Se ha marcado para eliminar el estado del caso seleccionado');
        } else {
            this.socialConflictSensible.conditions.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(condition: SocialConflictSensibleConditionDto) {
        condition.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar el estado del caso seleccionado');
    }

    editEvent(value: SocialConflictSensibleConditionDto, index: number) {
        this.editCondition.emit({ index: index, value: value });
    }

    change(rowIndex: number) {
        this.socialConflictSensible.conditions[rowIndex].verificationChange = true;
    }

    addOrUpdateItem(event: { value: SocialConflictSensibleConditionDto, index: number }) {
        if (event.index || event.index == 0) {
            this.socialConflictSensible.conditions[event.index] = event.value;
        } else {
            this.socialConflictSensible.conditions.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        this.socialConflictSensible.conditions = this.socialConflictSensible.conditions.sort((a, b) => b.conditionTime.toDate().getTime() - a.conditionTime.toDate().getTime());
        this.socialConflictSensible.lastCondition = undefined;
        for (let item of this.socialConflictSensible.conditions) {

            if(index == 0) 
                this.socialConflictSensible.lastCondition = item;

            item.isHidden = true;

            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            
            index++;
        }
    }
}