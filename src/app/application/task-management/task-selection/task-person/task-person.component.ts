import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TaskBoardServiceProxy, TaskManagementAssignmentDto, TaskManagementDto, TaskManagementPersonDto } from '@shared/service-proxies/application/task-board-proxie';
import { PersonType } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'task-person',
    templateUrl: 'task-person.component.html',
    styleUrls: [
        'task-person.component.css'
    ]
})
export class TaskPersonComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('dataTable', { static: false }) dataTable: Table;
    @ViewChild('paginator', { static: false }) paginator: Paginator;
    @Output() modalSave: EventEmitter<TaskManagementAssignmentDto[]> = new EventEmitter<TaskManagementAssignmentDto[]>();

    active: boolean = false;
    saving: boolean = false;
    item: TaskManagementDto;

    advancedFiltersAreShown: boolean = false;
    document: string;
    names: string;
    emailAddress: string;
    changes: TaskManagementAssignmentDto[] = [];

    types = {
        adminitrative: PersonType.None,
        coordinator: PersonType.Coordinator,
        manager: PersonType.Manager,
        analyst: PersonType.Analyst
    }

    constructor(_injector: Injector, private _taskBoardServiceProxy: TaskBoardServiceProxy) {
        super(_injector);
    }

    show(task: TaskManagementDto): void {
        this.primengTableHelper.records = [];
        this.primengTableHelper.totalRecordsCount = 0;
        if (!task.persons)
            task.persons = [];
        this.changes = task.persons.map(p => new TaskManagementAssignmentDto({
            id: p.person.id,
            person: p.person,
            checked: !p.remove
        }));
        this.item = task;
        this.active = true;
        this.modal.show();
    }

    onShown(): void {
    }

    close(): void {
        this.modal.hide();
        this.active = false;
        this.changes = [];
    }

    resetFilters() {
        this.document = '';
        this.names = '';
        this.emailAddress = '';
    }

    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._taskBoardServiceProxy.getAllPersons(
            this.item.id,
            this.advancedFiltersAreShown ? this.document : <any>undefined,
            this.advancedFiltersAreShown ? this.emailAddress : <any>undefined,
            this.advancedFiltersAreShown ? this.names : <any>undefined,
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

    selectPerson(event: any, person: TaskManagementPersonDto) {
        const index: number = this.changes.findIndex(p => p.id == person.id);
        const checked: boolean = (event == true);
        if (index == -1) {
            this.changes.push(new TaskManagementAssignmentDto({ id: person.id, person: person, checked: checked }));
        } else {
            this.changes[index].checked = checked;
        }
    }

    save(): void {
        this.modalSave.emit(this.changes);
        this.close();
    }
}