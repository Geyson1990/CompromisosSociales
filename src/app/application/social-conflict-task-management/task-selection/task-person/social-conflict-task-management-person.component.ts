import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictTaskAssignmentDto, SocialConflictTaskManagementDto, SocialConflictTaskManagementPersonDto, SocialConflictTaskManagementPersonRelationDto, SocialConflictTaskManagementServiceProxy } from '@shared/service-proxies/application/social-conflict-task-management-proxie';
import { PersonType } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'social-conflict-task-management-person',
    templateUrl: 'social-conflict-task-management-person.component.html',
    styleUrls: [
        'social-conflict-task-management-person.component.css'
    ]
})
export class SocialConflictTaskManagementPersonComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('dataTable', { static: false }) dataTable: Table;
    @ViewChild('paginator', { static: false }) paginator: Paginator;
    @Output() modalSave: EventEmitter<SocialConflictTaskAssignmentDto[]> = new EventEmitter<SocialConflictTaskAssignmentDto[]>();

    active: boolean = false;
    saving: boolean = false;
    item: SocialConflictTaskManagementDto;

    advancedFiltersAreShown: boolean = false;
    document: string;
    names: string;
    emailAddress: string;
    changes: SocialConflictTaskAssignmentDto[] = [];

    types = {
        adminitrative: PersonType.None,
        coordinator: PersonType.Coordinator,
        manager: PersonType.Manager,
        analyst: PersonType.Analyst
    }

    constructor(_injector: Injector, private _socialConflictTaskManagementServiceProxy: SocialConflictTaskManagementServiceProxy) {
        super(_injector);
    }

    show(task: SocialConflictTaskManagementDto): void {
        this.primengTableHelper.records = [];
        this.primengTableHelper.totalRecordsCount = 0;
        if (!task.persons)
            task.persons = [];
        this.changes = task.persons.map(p => new SocialConflictTaskAssignmentDto({
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

        this._socialConflictTaskManagementServiceProxy.getAllPersons(
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

    selectPerson(event: any, person: SocialConflictTaskManagementPersonDto) {
        const index: number = this.changes.findIndex(p => p.id == person.id);
        const checked: boolean = (event == true);
        if (index == -1) {
            this.changes.push(new SocialConflictTaskAssignmentDto({ id: person.id, person: person, checked: checked }));
        } else {
            this.changes[index].checked = checked;
        }
    }

    save(): void {
        this.modalSave.emit(this.changes);
        this.close();
    }
}