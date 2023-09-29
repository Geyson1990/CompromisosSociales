import { Component, EventEmitter, Injector, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent, Paginator } from 'primeng';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';
import { SocialConflictTaskAssignmentDto, SocialConflictTaskManagementConflictDto, SocialConflictTaskManagementDto, SocialConflictTaskManagementPersonRelationDto, SocialConflictTaskManagementSelection, SocialConflictTaskManagementServiceProxy } from '@shared/service-proxies/application/social-conflict-task-management-proxie';
import { SocialConflictTaskManagementBoardComponent } from './task-board/social-conflict-task-management-board.component';
import { NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConflictSite } from '@shared/service-proxies/application/utility-proxie';

@Component({
    selector: 'social-conflict-task-management-selection',
    templateUrl: 'social-conflict-task-management-selection.compoment.html',
    styleUrls: [
        'social-conflict-task-management-selection.compoment.css'
    ]
})
export class SocialConflictTaskManagementSelectionComponent extends AppComponentBase implements OnInit, OnDestroy {

    @ViewChild('paginator', { static: false }) paginator: Paginator;
    @ViewChild('taskBoard', { static: false }) taskBoard: SocialConflictTaskManagementBoardComponent;
    @Output() onShowExpandDeadLine: EventEmitter<SocialConflictTaskManagementDto> = new EventEmitter<SocialConflictTaskManagementDto>();
    @Output() onShowPerson: EventEmitter<SocialConflictTaskManagementDto> = new EventEmitter<SocialConflictTaskManagementDto>();
    @Output() onShowSender: EventEmitter<SocialConflictTaskManagementDto> = new EventEmitter<SocialConflictTaskManagementDto>();
    @Output() onShowEmail: EventEmitter<SocialConflictTaskManagementDto> = new EventEmitter<SocialConflictTaskManagementDto>();

    sites = {
        all: ConflictSite.All,
        conflict: ConflictSite.SocialConflict,
        alert: ConflictSite.SocialConflictAlert,
        sensible: ConflictSite.SocialConflictSensible
    }

    names: string;
    codes: string;
    site: ConflictSite = this.sites.all;
    filterByDate: boolean = false;
    dateRange: moment.Moment[] = [moment().startOf('month'), moment().endOf('day')];

    orderBy: string = 'CreationTime';
    step: number = 0;
    selectedConflict: SocialConflictTaskManagementConflictDto;
    tasks: SocialConflictTaskManagementDto[];
    option: SocialConflictTaskManagementSelection = SocialConflictTaskManagementSelection.List;

    @Output() back: EventEmitter<SocialConflictTaskManagementSelection> = new EventEmitter<SocialConflictTaskManagementSelection>();
    
    private navigationSubscription: Subscription;
    
    constructor(_injector: Injector, private _socialConflictTaskManagementServiceProxy: SocialConflictTaskManagementServiceProxy) {
        super(_injector);

        this.navigationSubscription = this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                const id = +this.getQueryParameter('id') <= 0 ? undefined : +this.getQueryParameter('id');
                const site = +this.getQueryParameter('site') <= 0 ? undefined : +this.getQueryParameter('site');
        
                if (id) {
                    this.loadConflict(id, site, true);
                }
            }
        });
    }

    ngOnInit() {
        setTimeout(async () => {
            this.getData();
        }, 500);
    }

    ngOnDestroy(): void {
        this.navigationSubscription?.unsubscribe();
    }

    loadConflict(id: number, site: ConflictSite, fromLink?: boolean, selection?: SocialConflictTaskManagementSelection) {
        this.showMainSpinner('Cargando información del compromiso, por favor espere...');
        this._socialConflictTaskManagementServiceProxy.getConflict(id, site).subscribe(response => {
            this.hideMainSpinner();
            this.selectedConflict = response;
            this.selectedConflict.fromLink = fromLink;
            this.selectedConflict.selection = selection;
            this.step = 2;
        }, () => this.hideMainSpinner());
    }

    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._socialConflictTaskManagementServiceProxy.getAllConflicts(
            this.names,
            this.codes,
            this.site,
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

    selectConflict(conflict: SocialConflictTaskManagementConflictDto) {
        this.selectedConflict = conflict;
        this.selectedConflict.fromLink = false;
        this.selectedConflict.selection = SocialConflictTaskManagementSelection.Search;
        this.step = 2;
    }

    selectPersons(changes: SocialConflictTaskAssignmentDto[]) {
        this.taskBoard.selectPersons(changes);
    }

    openExpandDeadLine(editingTask: SocialConflictTaskManagementDto) {
        this.onShowExpandDeadLine.emit(editingTask);
    }

    openPersons(editingTask: SocialConflictTaskManagementDto) {
        this.onShowPerson.emit(editingTask);
    }

    openSender(editingTask: SocialConflictTaskManagementDto) {
        this.onShowSender.emit(editingTask);
    }

    openEmail(editingTask: SocialConflictTaskManagementDto) {
        this.onShowEmail.emit(editingTask);
    }

    selectNewDeadLine(newDeadLine: moment.Moment) {
        this.taskBoard.selectNewDeadLine(newDeadLine);
    }

    onBackPressed(selection: SocialConflictTaskManagementSelection) {
        this.step = 1;
        this.back.emit(selection);
    }
}