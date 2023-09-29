import { Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FileDownloadRequestComponent } from '@shared/component/file-download-request/file-download-request.component';
import { SocialConflictTaskAssignmentDto } from '@shared/service-proxies/application/social-conflict-task-management-proxie';
import { TaskManagementDto, TaskSelection } from '@shared/service-proxies/application/task-board-proxie';
import { Subscription } from 'rxjs';
import { TaskCalendarComponent } from './task-calendar/task-calendar.component';
import { TaskManagementEmailComponent } from './task-selection/task-email/task-management-email.component';
import { TaskExpandDeadlineComponent } from './task-selection/task-expand-deadline/task-expand-deadline.component';
import { TaskPersonComponent } from './task-selection/task-person/task-person.component';
import { TaskSelectionComponent } from './task-selection/task-selection.compoment';
import { TaskManagementSenderComponent } from './task-selection/task-sender/task-management-sender.component';

@Component({
    templateUrl: 'task-management.component.html',
    styleUrls: [
        'task-management.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class TaskManagementComponent extends AppComponentBase implements OnInit, OnDestroy {

    @ViewChild('taskExpandDeadlineModal', { static: true }) taskExpandDeadline: TaskExpandDeadlineComponent;
    @ViewChild('taskCalendar', { static: true }) taskCalendar: TaskCalendarComponent;
    @ViewChild('taskSelection', { static: true }) taskSelection: TaskSelectionComponent;
    @ViewChild('taskPerson', { static: true }) taskPerson: TaskPersonComponent;
    @ViewChild('taskSender', { static: true }) taskSender: TaskManagementSenderComponent;
    @ViewChild('taskEmail', { static: true }) taskEmail: TaskManagementEmailComponent;
    
    @ViewChild('fileDownloadRequest', { static: true }) fileDownloadRequest: FileDownloadRequestComponent;
    
    tabList = {
        taskList: 0,
        taskBoard: 1,
        taskCalendar: 2
    }

    private _activeIndex: number = this.tabList.taskList;

    set activeIndex(value: number) {
        this._activeIndex = value;

        if (value == this.tabList.taskCalendar)
            this.taskCalendar.loadTasks();
    }

    get activeIndex(): number {
        return this._activeIndex;
    };

    private navigationSubscription: Subscription;

    constructor(_injector: Injector) {
        super(_injector);

        this.navigationSubscription = this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                const id = +this.getQueryParameter('id') <= 0 ? undefined : +this.getQueryParameter('id');

                if (id) {
                    this.activeIndex = this.tabList.taskBoard;
                }
            }
        });
    }

    ngOnInit() {

    }

    ngOnDestroy(): void {
        this.navigationSubscription?.unsubscribe();
    }

    openExpandDeadLine(editingTask: TaskManagementDto) {
        this.taskExpandDeadline.show(editingTask);
    }

    openPersons(editingTask: TaskManagementDto) {
        this.taskPerson.show(editingTask);
    }

    openSender(editingTask: TaskManagementDto) {
        this.taskSender.show(editingTask);
    }

    openEmail(editingTask: TaskManagementDto) {
        this.taskEmail.show(editingTask);
    }

    showCompromise(compromiseId: number) {
        this.activeIndex = this.tabList.taskBoard;
        this.taskSelection.loadCompromise(compromiseId, false, TaskSelection.List);
    }

    savePersons(changes: SocialConflictTaskAssignmentDto[]) {
        this.taskSelection.selectPersons(changes);
    }

    showDownloadModal() {
        this.fileDownloadRequest.show();
    }

    hideDownloadModal() {
        this.fileDownloadRequest.hide();
    }

    onBackPressed(selection: TaskSelection) {
        if (selection == TaskSelection.List)
            this.activeIndex = this.tabList.taskList;
        if (selection == TaskSelection.Search)
            this.activeIndex = this.tabList.taskBoard;
        if (selection == TaskSelection.Calendar)
            this.activeIndex = this.tabList.taskCalendar;
    }

}