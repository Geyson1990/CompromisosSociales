import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CompromiseDto } from '@shared/service-proxies/application/compromise-proxie';
import { TaskBoardServiceProxy, TaskStatus } from '@shared/service-proxies/application/task-board-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'compromise-task-management',
    templateUrl: 'task-management.component.html',
    styleUrls: [
        '../create-edit-compromise.component.css'
    ]
})
export class CompromiseTaskManagementComponent extends AppComponentBase implements OnInit {

    @ViewChild('dataTable', { static: false }) dataTable: Table;
    @ViewChild('paginator', { static: false }) paginator: Paginator;

    @Input() compromise: CompromiseDto;

    filterText: string;
    title: string;
    description: string;
    compromiseName: string;
    taskStatus = {
        none: TaskStatus.None,
        pending: TaskStatus.Pending,
        completed: TaskStatus.Completed,
        nonCompleted: TaskStatus.NonCompleted
    }

    status: TaskStatus = this.taskStatus.none;


    constructor(_injector: Injector, private _taskBoardServiceProxy: TaskBoardServiceProxy) {
        super(_injector);
    }

    ngOnInit() {

    }

    ngAfterViewInit(): void {
        this.primengTableHelper.adjustScroll(this.dataTable);
    }

    getData(dataTable: Table, paginator: Paginator, event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            if (this.paginator)
                this.paginator.changePage(0);
            else
                paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._taskBoardServiceProxy.getAllTasks(
            this.compromise.id,
            this.filterText,
            this.status == this.taskStatus.none ? undefined : this.status,
            this.title,
            this.description,
            this.compromiseName,
            this.primengTableHelper.getSorting(this.dataTable ? this.dataTable : dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator ? this.paginator : paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator ? this.paginator : paginator, event)
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        })
    }

    goTaskManagement() {
        this.router.navigate(['/app/application/task-management'], { queryParams: { id: this.compromise.id } });
    }

    showCompromise(taskId: number) {
        this.router.navigate(['/app/application/task-management'], { queryParams: { id: this.compromise.id, task: taskId } });
    }
}