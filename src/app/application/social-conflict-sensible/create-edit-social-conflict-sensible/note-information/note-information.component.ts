import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictSensibleDto, SocialConflictSensibleNoteLocationDto } from '@shared/service-proxies/application/social-conflict-sensible-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'note-information-social-conflict-sensible',
    templateUrl: 'note-information.component.html',
    styleUrls: [
        'note-information.component.css'
    ]
})
export class NoteInformationSocialConflictSensibleComponent extends AppComponentBase implements OnInit {

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

    removeItem(note: SocialConflictSensibleNoteLocationDto, index: number) {
        if (note.id) {
            note.remove = true;
            this.notify.warn('Se ha marcado para eliminar la nota seleccionada');
        } else {
            this.socialConflictSensible.notes.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(note: SocialConflictSensibleNoteLocationDto) {
        note.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar para la nota seleccionada');
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.socialConflictSensible.notes) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}