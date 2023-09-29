import { Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictTaskAssignmentDto, SocialConflictTaskManagementDto, SocialConflictTaskManagementSelection } from '@shared/service-proxies/application/social-conflict-task-management-proxie';
import { SocialConflictTaskManagementCalendarComponent } from './task-calendar/social-conflict-task-management-calendar.component';
import { SocialConflictTaskManagementListComponent } from './task-list/social-conflict-task-management-list.component';
import { SocialConflictTaskManagementSelectionComponent } from './task-selection/social-conflict-task-management-selection.compoment';
import { SocialConflictTaskManagementExpandDeadlineComponent } from './task-selection/task-expand-deadline/social-conflict-task-management-expand-deadline.component';
import { SocialConflictTaskManagementPersonComponent } from './task-selection/task-person/social-conflict-task-management-person.component';
import { SocialConflictTaskManagementSenderComponent } from './task-selection/task-sender/social-conflict-task-management-sender.component';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { ConflictSite } from '@shared/service-proxies/application/utility-proxie';
import { SocialConflictTaskManagementEmailComponent } from './task-selection/task-email/social-conflict-task-management-email.component';

@Component({
    templateUrl: 'social-conflict-task-management.component.html',
    styleUrls: [
        'social-conflict-task-management.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class SocialConflictTaskManagementComponent extends AppComponentBase implements OnInit, OnDestroy {

    @ViewChild('taskList', { static: true }) taskList: SocialConflictTaskManagementListComponent;
    @ViewChild('taskCalendar', { static: true }) taskCalendar: SocialConflictTaskManagementCalendarComponent;
    @ViewChild('taskSelection', { static: true }) taskSelection: SocialConflictTaskManagementSelectionComponent;
    @ViewChild('taskPerson', { static: true }) taskPerson: SocialConflictTaskManagementPersonComponent;
    @ViewChild('taskExpandDeadlineModal', { static: true }) taskExpandDeadline: SocialConflictTaskManagementExpandDeadlineComponent;
    @ViewChild('taskSender', { static: true }) taskSender: SocialConflictTaskManagementSenderComponent;
    @ViewChild('taskEmail', { static: true }) taskEmail: SocialConflictTaskManagementEmailComponent;
    
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

    exportMatrixToExcel() {
        this.taskList.exportMatrixToExcel();
    }

    showConflict(event: { conflictId: number, site: ConflictSite }) {
        this.activeIndex = this.tabList.taskBoard;
        this.taskSelection.loadConflict(event.conflictId, event.site, false, SocialConflictTaskManagementSelection.List);
    }

    savePersons(changes: SocialConflictTaskAssignmentDto[]) {
        this.taskSelection.selectPersons(changes);
    }

    loadTasks() {
        this.taskCalendar.loadTasks();
    }

    saveDeadLine(newDeadLine: moment.Moment) {
        this.taskSelection.selectNewDeadLine(newDeadLine);
    }

    openExpandDeadLine(editingTask: SocialConflictTaskManagementDto) {
        this.taskExpandDeadline.show(editingTask);
    }

    openPersons(editingTask: SocialConflictTaskManagementDto) {
        this.taskPerson.show(editingTask);
    }

    openSender(editingTask: SocialConflictTaskManagementDto) {
        this.taskSender.show(editingTask);
    }

    openEmail(editingTask: SocialConflictTaskManagementDto) {
        this.taskEmail.show(editingTask);
    }

    onBackPressed(selection: SocialConflictTaskManagementSelection) {
        if (selection == SocialConflictTaskManagementSelection.List)
            this.activeIndex = this.tabList.taskList;
        if (selection == SocialConflictTaskManagementSelection.Search)
            this.activeIndex = this.tabList.taskBoard;
        if (selection == SocialConflictTaskManagementSelection.Calendar)
            this.activeIndex = this.tabList.taskCalendar;
    }
}