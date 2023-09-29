import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CompromiseDto, CompromiseTimelineDto } from '@shared/service-proxies/application/compromise-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'phase-milestone-information',
    templateUrl: 'phase-milestone-information.component.html',
    styleUrls: [
        'phase-milestone-information.component.css'
    ]
})
export class CompromisePhaseMilestoneInformationComponent extends AppComponentBase implements OnInit {

    private _busy: boolean;
    private _compromise: CompromiseDto;

    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Input() get busy(): boolean {
        return this._busy;
    }

    set busy(value: boolean) {
        this._busy = value;
    }

    @Input() get compromise(): CompromiseDto {
        return this._compromise;
    }

    set compromise(value: CompromiseDto) {
        this._compromise = value;
    }

    @Output() addCompromise: EventEmitter<void> = new EventEmitter<void>();
    @Output() editCompromise: EventEmitter<{ index: number, value: CompromiseTimelineDto }> = new EventEmitter<{ index: number, value: CompromiseTimelineDto }>();
    
    private skipCount: number;
    private maxResultCount: number;

    constructor(_injector: Injector) {
        super(_injector);
        this.primengTableHelper.defaultRecordsCountPerPage = 5;
        this.skipCount = 0;
        this.maxResultCount = this.primengTableHelper.defaultRecordsCountPerPage;
    }

    ngOnInit(): void {
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    getData(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    removeItem(timeline: CompromiseTimelineDto, index: number) {
        if (timeline.id) {
            timeline.remove = true;
            this.notify.warn('Se ha marcado para eliminar el estado del caso seleccionado');
        } else {
            this.compromise.timelines.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(timeline: CompromiseTimelineDto) {
        timeline.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar el estado del caso seleccionado');
    }

    addEvent() {
        this.addCompromise.emit();
    }
    
    editEvent(value: CompromiseTimelineDto, index: number) {
        this.editCompromise.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: CompromiseTimelineDto, index: number }) {
        if (event.index || event.index == 0) {
            this.compromise.timelines[event.index] = event.value;
        } else {
            this.compromise.timelines.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        this.compromise.timelines = this.compromise.timelines.sort((a, b) => (a.phase.order + a.milestone.order) - (b.phase.order + b.milestone.order));

        for (let item of this.compromise.timelines) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}