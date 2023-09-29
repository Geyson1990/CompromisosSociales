import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictDto, SocialConflictManagementLocationDto } from '@shared/service-proxies/application/social-conflict-proxie';
import { LazyLoadEvent, Paginator, SelectItem } from 'primeng';

@Component({
    selector: 'management-information-social-conflict',
    templateUrl: 'management-information.component.html',
    styleUrls: [
        'management-information.component.css'
    ]
})
export class ManagementInformationSocialConflictComponent extends AppComponentBase implements OnInit {

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
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    @Input() hasPermission: boolean;

    @Output() addManagement: EventEmitter<void> = new EventEmitter<void>();
    @Output() editManagement: EventEmitter<{ value: SocialConflictManagementLocationDto, index: number }> = new EventEmitter<{ value: SocialConflictManagementLocationDto, index: number }>();
    @Output() showResources: EventEmitter<{ value: SocialConflictManagementLocationDto, index: number }> = new EventEmitter<{ value: SocialConflictManagementLocationDto, index: number }>();

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

    ngOnInit() {
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    getData(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    showFiles(management: SocialConflictManagementLocationDto, index: number) {
        this.showResources.emit({ index: index, value: management });
    }

    editEvent(management: SocialConflictManagementLocationDto, index: number) {
        this.editManagement.emit({ index: index, value: management });;
    }

    change(rowIndex: number) {
        this.socialConflict.managements[rowIndex].verificationChange = true;
    }

    removeItem(management: SocialConflictManagementLocationDto, index: number) {
        if (management.id) {
            management.remove = true;
            this.notify.warn('Se ha marcado para eliminar la gestión seleccionada');
        } else {
            this.socialConflict.managements.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(management: SocialConflictManagementLocationDto) {
        management.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar la gestión seleccionada');
    }

    addOrUpdateItem(event: { value: SocialConflictManagementLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.socialConflict.managements[event.index] = event.value;
        } else {
            this.socialConflict.managements.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        this.socialConflict.managements = this.socialConflict.managements.sort((a, b) => b.managementTime.toDate().getTime() - a.managementTime.toDate().getTime());

        for (let item of this.socialConflict.managements) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}