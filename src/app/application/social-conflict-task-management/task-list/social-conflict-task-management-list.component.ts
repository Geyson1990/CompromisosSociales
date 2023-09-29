import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictTaskManagementGetAllDto, SocialConflictTaskManagementServiceProxy, SocialConflictTaskManagementStatus } from '@shared/service-proxies/application/social-conflict-task-management-proxie';
import { ConflictSite } from '@shared/service-proxies/application/utility-proxie';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'social-conflict-task-management-list',
    templateUrl: 'social-conflict-task-management-list.component.html',
    styleUrls: [
        'social-conflict-task-management-list.component.css'
    ]
})
export class SocialConflictTaskManagementListComponent extends AppComponentBase implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @Output() showConflict: EventEmitter<{ conflictId: number, site: ConflictSite }> = new EventEmitter<{ conflictId: number, site: ConflictSite }>();

    conflictCode: string;
    conflictName: string;
    taskTitle: string;

    taskStatus = {
        none: SocialConflictTaskManagementStatus.None,
        pending: SocialConflictTaskManagementStatus.Pending,
        completed: SocialConflictTaskManagementStatus.Completed,
        nonCompleted: SocialConflictTaskManagementStatus.NonCompleted
    }

    sites = {
        all: ConflictSite.All,
        conflict: ConflictSite.SocialConflict,
        alert: ConflictSite.SocialConflictAlert,
        sensible: ConflictSite.SocialConflictSensible
    }

    site: ConflictSite = this.sites.all;
    status: SocialConflictTaskManagementStatus = this.taskStatus.none;

    constructor(_injector: Injector, private _socialConflictTaskManagementServiceProxy: SocialConflictTaskManagementServiceProxy, private _fileDownloadService: FileDownloadService) {
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

        this._socialConflictTaskManagementServiceProxy.getAllTask(
            undefined,
            this.conflictCode,
            this.conflictName,
            this.taskTitle,
            this.status == this.taskStatus.none ? undefined : this.status,
            ConflictSite.All,
            this.site,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event)
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        })
    }

    goToConflict(conflict: SocialConflictTaskManagementGetAllDto) {
        this.showConflict.emit({ conflictId: conflict.conflictId, site: conflict.conflictSite });
    }

    exportMatrixToExcel(): void {
        this._socialConflictTaskManagementServiceProxy.getMatrixToExcel(
            undefined,
            this.conflictCode,
            this.conflictName,
            this.taskTitle,
            this.status == this.taskStatus.none ? undefined : this.status,
            ConflictSite.All,
            this.primengTableHelper.getSorting(this.dataTable)
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
        });
    }

}