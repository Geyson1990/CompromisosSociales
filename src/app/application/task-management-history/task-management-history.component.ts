import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TaskManagementHistoryServiceProxy } from '@shared/service-proxies/application/task-management-history-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'task-management-history.component.html',
    styleUrls: [
        'task-management-history.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class TaskManagementHistoryComponent extends AppComponentBase implements AfterViewInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    code: string;
    subject: string;
    template: string;
    to: string;
    copy: string;
    advancedFiltersAreShown: boolean;

    constructor(injector: Injector, private _taskManagementHistoryServiceProxy: TaskManagementHistoryServiceProxy) {
        super(injector);
    }

    ngAfterViewInit(): void {
        this.primengTableHelper.adjustScroll(this.dataTable);
    }

    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._taskManagementHistoryServiceProxy.getAll(
            this.advancedFiltersAreShown ? this.code : <any>undefined,
            this.advancedFiltersAreShown ? this.subject : <any>undefined,
            this.advancedFiltersAreShown ? this.template : <any>undefined,
            this.advancedFiltersAreShown ? this.to : <any>undefined,
            this.advancedFiltersAreShown ? this.copy : <any>undefined,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event)
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    resetFilters(): void {
        this.code = '';
        this.subject = '';
        this.template = '';
        this.to = '';
        this.copy = '';
    }
}
