import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictSensibleDto, SocialConflictSensibleManagementLocationDto } from '@shared/service-proxies/application/social-conflict-sensible-proxie';
import { LazyLoadEvent, Paginator, SelectItem } from 'primeng';

@Component({
    selector: 'management-information-social-conflict-sensible',
    templateUrl: 'management-information.component.html',
    styleUrls: [
        'management-information.component.css'
    ]
})
export class ManagementInformationSocialConflictSensibleComponent extends AppComponentBase implements OnInit {

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
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    @Output() addManagement: EventEmitter<void> = new EventEmitter<void>();
    @Output() editManagement: EventEmitter<{ value: SocialConflictSensibleManagementLocationDto, index: number }> = new EventEmitter<{ value: SocialConflictSensibleManagementLocationDto, index: number }>();
    @Output() showResources: EventEmitter<{ value: SocialConflictSensibleManagementLocationDto, index: number }> = new EventEmitter<{ value: SocialConflictSensibleManagementLocationDto, index: number }>();

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

    ngOnInit() {
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    getData(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    showFiles(management: SocialConflictSensibleManagementLocationDto, index: number) {
        this.showResources.emit({ index: index, value: management });
    }

    editEvent(management: SocialConflictSensibleManagementLocationDto, index: number) {
        this.editManagement.emit({ index: index, value: management });;
    }

    change(rowIndex: number) {
        this.socialConflictSensible.managements[rowIndex].verificationChange = true;
    }

    removeItem(management: SocialConflictSensibleManagementLocationDto, index: number) {
        if (management.id) {
            management.remove = true;
            this.notify.warn('Se ha marcado para eliminar la gestión seleccionada');
        } else {
            this.socialConflictSensible.managements.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(management: SocialConflictSensibleManagementLocationDto) {
        management.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar la gestión seleccionada');
    }

    addOrUpdateItem(event: { value: SocialConflictSensibleManagementLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.socialConflictSensible.managements[event.index] = event.value;
        } else {
            this.socialConflictSensible.managements.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        this.socialConflictSensible.managements = this.socialConflictSensible.managements.sort((a, b) => b.managementTime.toDate().getTime() - a.managementTime.toDate().getTime());

        for (let item of this.socialConflictSensible.managements) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}