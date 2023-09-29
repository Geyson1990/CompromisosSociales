import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictConditionDto, SocialConflictDto } from '@shared/service-proxies/application/social-conflict-proxie';
import { ConditionType } from '@shared/service-proxies/application/utility-proxie';
import { LazyLoadEvent, Paginator, SelectItem } from 'primeng';

@Component({
    selector: 'condition-information-social-conflict',
    templateUrl: 'condition-information.component.html',
    styleUrls: [
        'condition-information.component.css'
    ]
})
export class ConditionInformationSocialConflictComponent extends AppComponentBase implements OnInit {

    private _busy: boolean;
    private _socialConflict: SocialConflictDto;
    private _verificationEnabled: boolean = false;

    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Input() get busy(): boolean {
        return this._busy;
    }

    set busy(value: boolean) {
        this._busy = value;
    }

    @Input() get socialConflict(): SocialConflictDto {
        return this._socialConflict;
    }

    set socialConflict(value: SocialConflictDto) {
        this._socialConflict = value;
    }

    @Input() hasPermission: boolean;
    
    @Output() addCondition: EventEmitter<void> = new EventEmitter<void>();
    @Output() editCondition: EventEmitter<{ index: number, value: SocialConflictConditionDto }> = new EventEmitter<{ index: number, value: SocialConflictConditionDto }>();

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
        this._verificationEnabled = this.permission.isGranted('Pages.Application.SocialConflict.Verification');
    }

    ngOnInit(): void {
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    getData(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    removeItem(condition: SocialConflictConditionDto, index: number) {
        if (condition.id) {
            condition.remove = true;
            this.notify.warn('Se ha marcado para eliminar el estado del caso seleccionado');
        } else {
            this.socialConflict.conditions.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(condition: SocialConflictConditionDto) {
        condition.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar el estado del caso seleccionado');
    }

    editEvent(value: SocialConflictConditionDto, index: number) {
        this.editCondition.emit({ index: index, value: value });
    }

    change(rowIndex: number) {
        this.socialConflict.conditions[rowIndex].verificationChange = true;
    }

    addOrUpdateItem(event: { value: SocialConflictConditionDto, index: number }) {
        if (event.index || event.index == 0) {
            this.socialConflict.conditions[event.index] = event.value;
        } else {
            this.socialConflict.conditions.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        this.socialConflict.conditions = this.socialConflict.conditions.sort((a, b) => b.conditionTime.toDate().getTime() - a.conditionTime.toDate().getTime());

        for (let item of this.socialConflict.conditions) {
            if(index == 0)
                this.socialConflict.lastCondition = item;
                
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}