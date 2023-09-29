import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TaskBoardServiceProxy, TaskStatus } from '@shared/service-proxies/application/task-board-proxie';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { Console } from 'console';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'task-list',
    templateUrl: 'task-list.component.html',
    styleUrls: [
        'task-list.component.css'
    ]
})
export class TaskListComponent extends AppComponentBase implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    
    @Output() showCompromise: EventEmitter<number> = new EventEmitter<number>();
    @Output() showDownloadModal: EventEmitter<void> = new EventEmitter<void>();
    @Output() hideDownloadModal: EventEmitter<void> = new EventEmitter<void>();

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

    constructor(_injector: Injector, private _taskBoardServiceProxy: TaskBoardServiceProxy, private _fileDownloadService: FileDownloadService) {
        super(_injector);
    }

    ngOnInit() {

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

        this._taskBoardServiceProxy.getAllTasks(
            undefined,
            this.filterText,
            this.status == this.taskStatus.none ? undefined : this.status,
            this.title,
            this.description,
            this.compromiseName,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event)
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        })
    }
        
    exportMatrixToExcel(): void {
        this.showDownloadModal.emit();
        this._taskBoardServiceProxy.getMatrixToExcel(
            undefined,
            this.filterText,
            this.status == this.taskStatus.none ? undefined : this.status,
            this.description,
            this.compromiseName,
            this.primengTableHelper.getSorting(this.dataTable)
        ).pipe(finalize(() =>{
            this.primengTableHelper.hideLoadingIndicator();
            this.hideDownloadModal.emit();
        })).subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
        });
    }

}