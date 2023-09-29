import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictSensibleDto, SocialConflictSensibleGeneralFactDto } from '@shared/service-proxies/application/social-conflict-sensible-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'fact-information-social-conflict-sensible',
    templateUrl: 'fact-information.component.html',
    styleUrls: [
        'fact-information.component.css'
    ]
})
export class FactInformationSocialConflictSensibleComponent extends AppComponentBase implements OnInit {

    private _busy: boolean;
    private _socialConflictSensible: SocialConflictSensibleDto;

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
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    @Output() addFact: EventEmitter<void> = new EventEmitter<void>();
    @Output() editFact: EventEmitter<{ index: number, value: SocialConflictSensibleGeneralFactDto }> = new EventEmitter<{ index: number, value: SocialConflictSensibleGeneralFactDto }>();

    private skipCount: number;
    private maxResultCount: number;

    constructor(_injector: Injector) {
        super(_injector);
        this.primengTableHelper.defaultRecordsCountPerPage = 5;
        this.skipCount = 0;
        this.maxResultCount = this.primengTableHelper.defaultRecordsCountPerPage;
    }

    ngOnInit() {
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    getData(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    removeItem(fact: SocialConflictSensibleGeneralFactDto, index: number) {
        if (fact.id) {
            fact.remove = true;
            this.notify.warn('Se ha marcado para eliminar el hecho relevante seleccionado');
        } else {
            this.socialConflictSensible.generalFacts.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(fact: SocialConflictSensibleGeneralFactDto) {
        fact.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar para el hecho relevante seleccionado');
    }

    addEvent() {
        this.addFact.emit();
    }

    editEvent(value: SocialConflictSensibleGeneralFactDto, index: number) {
        this.editFact.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: SocialConflictSensibleGeneralFactDto, index: number }) {
        if (event.index || event.index == 0) {
            this.socialConflictSensible.generalFacts[event.index] = event.value;
        } else {
            this.socialConflictSensible.generalFacts.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }


    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        this.socialConflictSensible.generalFacts = this.socialConflictSensible.generalFacts.sort((a, b) => b.factTime.toDate().getTime() - a.factTime.toDate().getTime());
        
        for (let item of this.socialConflictSensible.generalFacts) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}