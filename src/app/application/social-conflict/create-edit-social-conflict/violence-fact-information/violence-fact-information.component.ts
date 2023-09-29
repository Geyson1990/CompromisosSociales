import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictDto, SocialConflictViolenceFactDto } from '@shared/service-proxies/application/social-conflict-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'violence-fact-information-social-conflict',
    templateUrl: 'violence-fact-information.component.html',
    styleUrls: [
        'violence-fact-information.component.css'
    ]
})
export class ViolenceFactInformationSocialConflictComponent extends AppComponentBase implements OnInit {

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
    @Output() editFact: EventEmitter<{ value: SocialConflictViolenceFactDto, index: number }> = new EventEmitter<{ value: SocialConflictViolenceFactDto, index: number }>();

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

    editEvent(violenceFact: SocialConflictViolenceFactDto, index: number) {
        this.editFact.emit({ index: index, value: violenceFact });;
    }

    removeItem(violenceFact: SocialConflictViolenceFactDto, index: number) {
        if (violenceFact.id) {
            violenceFact.remove = true;
            this.notify.warn('Se ha marcado para eliminar el hecho de violencia seleccionado');
        } else {
            this.socialConflict.violenceFacts.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(violenceFact: SocialConflictViolenceFactDto) {
        violenceFact.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar para el hecho de violencia seleccionado');
    }

    addOrUpdateItem(event: { value: SocialConflictViolenceFactDto, index: number }) {
        if (event.index || event.index == 0) {
            this.socialConflict.violenceFacts[event.index] = event.value;
        } else {
            this.socialConflict.violenceFacts.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        this.socialConflict.violenceFacts = this.socialConflict.violenceFacts.sort((a, b) => b.startTime.toDate().getTime() - a.startTime.toDate().getTime());

        for (let item of this.socialConflict.violenceFacts) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}