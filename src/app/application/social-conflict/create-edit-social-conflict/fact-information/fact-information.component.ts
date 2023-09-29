import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictDto, SocialConflictGeneralFactDto } from '@shared/service-proxies/application/social-conflict-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'fact-information-social-conflict',
    templateUrl: 'fact-information.component.html',
    styleUrls: [
        'fact-information.component.css'
    ]
})
export class FactInformationSocialConflictComponent extends AppComponentBase implements OnInit {

    private _busy: boolean;
    private _socialConflict: SocialConflictDto;

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
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    @Input() hasPermission: boolean;
    
    @Output() addFact: EventEmitter<void> = new EventEmitter<void>();
    @Output() editFact: EventEmitter<{ index: number, value: SocialConflictGeneralFactDto }> = new EventEmitter<{ index: number, value: SocialConflictGeneralFactDto }>();

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

    removeItem(fact: SocialConflictGeneralFactDto, index: number) {
        if (fact.id) {
            fact.remove = true;
            this.notify.warn('Se ha marcado para eliminar el hecho relevante seleccionado');
        } else {
            this.socialConflict.generalFacts.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(fact: SocialConflictGeneralFactDto) {
        fact.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar para el hecho relevante seleccionado');
    }

    addEvent() {
        this.addFact.emit();
    }

    editEvent(value: SocialConflictGeneralFactDto, index: number) {
        this.editFact.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: SocialConflictGeneralFactDto, index: number }) {
        if (event.index || event.index == 0) {
            this.socialConflict.generalFacts[event.index] = event.value;
        } else {
            this.socialConflict.generalFacts.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }


    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        this.socialConflict.generalFacts = this.socialConflict.generalFacts.sort((a, b) => b.factTime.toDate().getTime() - a.factTime.toDate().getTime());
        
        for (let item of this.socialConflict.generalFacts) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}