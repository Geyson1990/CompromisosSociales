import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictDto, SocialConflictNoteLocationDto } from '@shared/service-proxies/application/social-conflict-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'note-information-social-conflict',
    templateUrl: 'note-information.component.html',
    styleUrls: [
        'note-information.component.css'
    ]
})
export class NoteInformationSocialConflictComponent extends AppComponentBase implements OnInit {

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

    removeItem(fact: SocialConflictNoteLocationDto, index: number) {
        if (fact.id) {
            fact.remove = true;
            this.notify.warn('Se ha marcado para eliminar el hecho relevante seleccionado');
        } else {
            this.socialConflict.notes.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(fact: SocialConflictNoteLocationDto) {
        fact.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar para el hecho relevante seleccionado');
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.socialConflict.notes) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}