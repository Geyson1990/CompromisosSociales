import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { UtilityServiceProxy, UtilitySocialConflictDto, UtilityTerritorialUnitDto } from '@shared/service-proxies/application/utility-proxie';
import { UserAssignmentDto, UserAssignmentListDto, UserEditDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    selector: 'assign-conflict-user',
    templateUrl: 'assign-conflict-user.component.html',
    styleUrls: [
        'assign-conflict-user.component.css'
    ]
})

export class AssignConflictUserComponent extends AppComponentBase implements OnInit {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('dataTable', { static: false }) dataTable: Table;
    @ViewChild('paginator', { static: false }) paginator: Paginator;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    user: UserEditDto;
    active: boolean = false;
    saving: boolean = false;

    filterText: string;
    socialConflictCode: string;
    advancedFiltersAreShown: boolean = false;
    territorialUnit: number = -1;
    territorialUnits: UtilityTerritorialUnitDto[] = [];
    dateRange: moment.Moment[] = [moment().startOf('month'), moment().endOf('day')];
    changes: UserAssignmentDto[] = [];
    selectAll: boolean = false;
    busy: boolean = false;

    constructor(_injector: Injector,
        private _utilityServiceProxy: UtilityServiceProxy,
        private _userService: UserServiceProxy) {
        super(_injector);
    }


    ngOnInit(): void {
        this._utilityServiceProxy
            .getTerritorialUnits()
            .pipe(finalize(() => this.hideMainSpinner()))
            .subscribe(response => this.territorialUnits = response.items);
    }

    show(userId?: number): void {
        this._userService.getUserForEdit(userId).subscribe(userResult => {
            this.user = userResult.user;
            this.active = true;
            this.modal.show();
        });
    }

    onShown() {

    }

    getData(event?: LazyLoadEvent) {
        if (!this.active)
            return;

        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);

            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._utilityServiceProxy.getAllUserSocialConflicts(
            this.filterText,
            this.user?.id,
            this.advancedFiltersAreShown ? this.socialConflictCode : <any>undefined,
            this.advancedFiltersAreShown ? this.territorialUnit : <any>undefined,
            this.advancedFiltersAreShown ? this.dateRange[0].startOf('day') : <any>undefined,
            this.advancedFiltersAreShown ? this.dateRange[1].endOf('day') : <any>undefined,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event)
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {

            for (let item of result.items) {
                const index: number = this.changes.findIndex(p => p.id == item.id);
                if (index != -1) {
                    item.selected = this.changes[index].checked;
                }
            }

            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    selectRecord(event: any, record: UtilitySocialConflictDto) {
        const index: number = this.changes.findIndex(p => p.id == record.id);
        const checked: boolean = (event == true);
        if (!checked)
            this.selectAll = false;

        if (index == -1) {
            this.changes.push(new UserAssignmentDto({ id: record.id, checked: checked }));
        } else {
            this.changes[index].checked = checked;
        }
    }

    selectAllRecords(event: any) {
        const checked: boolean = (event == true);
        this.showMainSpinner('Cargando información por favor espere');
        this.changes = [];
        this.busy = true;
        setTimeout(() => this.proccessAllRecords(0, 1000, checked), 500);
    }

    private proccessAllRecords(skipCount: number, maxResultCount: number, checked: boolean) {

        this._utilityServiceProxy.getAllUserSocialConflicts(
            this.filterText,
            this.user?.id,
            this.advancedFiltersAreShown ? this.socialConflictCode : <any>undefined,
            this.advancedFiltersAreShown ? this.territorialUnit : <any>undefined,
            this.advancedFiltersAreShown ? this.dateRange[0].startOf('day') : <any>undefined,
            this.advancedFiltersAreShown ? this.dateRange[1].endOf('day') : <any>undefined,
            undefined,
            maxResultCount,
            skipCount).subscribe((result) => {
                const totalResult: number = skipCount + maxResultCount;
                this.changeMainSpinner(`Cargando información ${totalResult > result.totalCount ? result.totalCount : totalResult}-${result.totalCount}`);

                for (let item of result.items) {
                    this.changes.push(new UserAssignmentDto({ id: item.id, checked: checked }));
                }

                if ((skipCount + maxResultCount) < result.totalCount) {
                    this.proccessAllRecords((skipCount + 1000), 1000, checked);
                } else {
                    this.notify.success(`Se ha agregado acceso de manera exitosa a ${result.totalCount} registros`);
                    this.busy = false;
                    this.hideMainSpinner();
                    this.getData();
                }
            }, () => {
                this.hideMainSpinner();
                this.busy = false;
                this.changes = [];
            });
    }

    save() {
        this.busy = true;
        this.saving = true;
        this._userService
            .assignSocialConflicts(new UserAssignmentListDto({ userId: this.user.id, assignments: this.changes }))
            .pipe(finalize(() => {
                this.busy = false;
                this.saving = false;
            })).subscribe(() => {
                this.notify.success('Cambios guardados exitosamente');
                this.close();
            });
    }

    close(): void {
        this.primengTableHelper.totalRecordsCount = 0;
        this.primengTableHelper.records = [];
        this.selectAll = false;
        this.changes = [];
        this.active = false;
        this.modal.hide();
    }

}