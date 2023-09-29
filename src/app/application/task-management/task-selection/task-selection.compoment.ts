import { Component, EventEmitter, Injector, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TaskBoardServiceProxy, TaskManagementCompromiseDto, TaskManagementDto, TaskManagementGetAllDto, TaskManagementPersonRelationDto, TaskSelection } from '@shared/service-proxies/application/task-board-proxie';
import { UtilityServiceProxy, UtilityTerritorialUnitDto } from '@shared/service-proxies/application/utility-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';
import { TaskBoardComponent } from './task-board/task-board.component';
import { NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { SocialConflictTaskAssignmentDto } from '@shared/service-proxies/application/social-conflict-task-management-proxie';

@Component({
    selector: 'task-selection',
    templateUrl: 'task-selection.compoment.html',
    styleUrls: [
        'task-selection.compoment.css'
    ]
})
export class TaskSelectionComponent extends AppComponentBase implements OnInit, OnDestroy {

    @ViewChild('paginator', { static: false }) paginator: Paginator;
    @ViewChild('taskBoard', { static: false }) taskBoard: TaskBoardComponent;
    @Output() onShowExpandDeadLine: EventEmitter<TaskManagementDto> = new EventEmitter<TaskManagementDto>();
    @Output() onShowPerson: EventEmitter<TaskManagementDto> = new EventEmitter<TaskManagementDto>();
    @Output() onShowSender: EventEmitter<TaskManagementDto> = new EventEmitter<TaskManagementDto>();
    @Output() onShowEmail: EventEmitter<TaskManagementDto> = new EventEmitter<TaskManagementDto>();

    filterText: string;
    compromiseType: number = -1;
    compromiseCode: string;
    recordCode: string;
    socialCode: string;
    territorialUnit: number = -1;
    territorialUnits: UtilityTerritorialUnitDto[] = [];
    dateRange: moment.Moment[] = [moment().startOf('month'), moment().endOf('day')];
    orderBy: string = 'CreationTime';
    step: number = 0;
    selectedCompromise: TaskManagementCompromiseDto;
    tasks: TaskManagementGetAllDto[];
    option: TaskSelection = TaskSelection.List;

    @Output() back: EventEmitter<TaskSelection> = new EventEmitter<TaskSelection>();

    private navigationSubscription: Subscription;

    constructor(_injector: Injector, private _utilityServiceProxy: UtilityServiceProxy, private _taskBoardServiceProxy: TaskBoardServiceProxy) {
        super(_injector);

        this.navigationSubscription = this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                const id = +this.getQueryParameter('id') <= 0 ? undefined : +this.getQueryParameter('id');
                if (id) {
                    this.loadCompromise(id, true);
                }
            }
        });

    }

    ngOnInit(): void {
        this._utilityServiceProxy
            .getTerritorialUnits()
            .pipe(finalize(() => this.hideMainSpinner()))
            .subscribe(response => {
                this.territorialUnits = response.items;
                this.getData();
            });
    }
        
    ngOnDestroy(): void {
        this.navigationSubscription?.unsubscribe();
    }

    loadCompromise(id: number, fromLink?: boolean, selection?: TaskSelection) {
        this.showMainSpinner('Cargando información del compromiso, por favor espere...');
        this._taskBoardServiceProxy.getCompromise(id).subscribe(response => {
            this.hideMainSpinner();
            this.selectedCompromise = response;
            this.selectedCompromise.fromLink = fromLink;
            this.selectedCompromise.selection = selection;
            this.step = 2;
        }, () => this.hideMainSpinner());
    }

    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._taskBoardServiceProxy.getAllCompromises(
            this.filterText,
            this.compromiseType,
            this.compromiseCode,
            this.recordCode,
            this.socialCode,
            this.territorialUnit,
            this.dateRange[0].startOf('day'),
            this.dateRange[1].endOf('day'),
            this.orderBy,
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event)
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    selectCompromise(compromise: TaskManagementCompromiseDto) {
        this.selectedCompromise = compromise;
        this.selectedCompromise.fromLink = false;
        this.selectedCompromise.selection = TaskSelection.Search;
        this.step = 2;
    }

    selectPersons(changes: SocialConflictTaskAssignmentDto[]) {
        this.taskBoard.selectPersons(changes);
    }

    openExpandDeadLine(editingTask: TaskManagementDto) {
        this.onShowExpandDeadLine.emit(editingTask);
    }

    openPersons(editingTask: TaskManagementDto) {
        this.onShowPerson.emit(editingTask);
    }

    openSender(editingTask: TaskManagementDto) {
        this.onShowSender.emit(editingTask);
    }
    
    openEmail(editingTask: TaskManagementDto) {
        this.onShowEmail.emit(editingTask);
    }
    
    onBackPressed(selection: TaskSelection) {
        this.step = 1;
        this.back.emit(selection);
    }
}