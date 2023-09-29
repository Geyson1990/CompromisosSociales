import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictTaskAssignmentDto, SocialConflictTaskManagementCommentCreateDto, SocialConflictTaskManagementCommentType, SocialConflictTaskManagementConflictDto, SocialConflictTaskManagementDto, SocialConflictTaskManagementGetAllDto, SocialConflictTaskManagementPersonRelationDto, SocialConflictTaskManagementResourceDto, SocialConflictTaskManagementSelection, SocialConflictTaskManagementServiceProxy, SocialConflictTaskManagementStatus } from '@shared/service-proxies/application/social-conflict-task-management-proxie';
import { ConflictSite } from '@shared/service-proxies/application/utility-proxie';
import { EntityDto } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'social-conflict-task-management-board',
    templateUrl: 'social-conflict-task-management-board.component.html',
    styleUrls: [
        'social-conflict-task-management-board.component.css'
    ]
})
export class SocialConflictTaskManagementBoardComponent extends AppComponentBase implements OnInit {

    @Input() conflict: SocialConflictTaskManagementConflictDto;
    @Output() back: EventEmitter<SocialConflictTaskManagementSelection> = new EventEmitter<SocialConflictTaskManagementSelection>();
    @Output() taskLoaded: EventEmitter<SocialConflictTaskManagementGetAllDto[]> = new EventEmitter<SocialConflictTaskManagementGetAllDto[]>();
    @Output() onShowExpandDeadLine: EventEmitter<SocialConflictTaskManagementDto> = new EventEmitter<SocialConflictTaskManagementDto>();
    @Output() onShowPerson: EventEmitter<SocialConflictTaskManagementDto> = new EventEmitter<SocialConflictTaskManagementDto>();
    @Output() onShowSender: EventEmitter<SocialConflictTaskManagementDto> = new EventEmitter<SocialConflictTaskManagementDto>();
    @Output() onShowEmail: EventEmitter<SocialConflictTaskManagementDto> = new EventEmitter<SocialConflictTaskManagementDto>();

    pending: SocialConflictTaskManagementGetAllDto[] = [];
    incomplete: SocialConflictTaskManagementGetAllDto[] = [];
    complete: SocialConflictTaskManagementGetAllDto[] = [];

    orderBy: string = 'CreationTime';

    steps = {
        taskBoard: 0,
        taskCreate: 1
    }

    step: number = this.steps.taskBoard;

    editingTask: SocialConflictTaskManagementDto;
    editingStartTime: Date;
    editingDeadLine: Date;
    saving: boolean;

    commentDescription: string;
    commentSend: boolean;
    commentTypes = {
        system: SocialConflictTaskManagementCommentType.SYSTEM,
        user: SocialConflictTaskManagementCommentType.USER
    }

    get personsTitle(): string {
        if (!this.editingTask || !this.editingTask?.persons || this.editingTask?.persons?.length == 0)
            return 'Seleccionar responsable';

        return this.editingTask.personNames;
    }

    constructor(_injector: Injector, private _socialConflictTaskManagementServiceProxy: SocialConflictTaskManagementServiceProxy) {
        super(_injector);
    }

    drop(event: CdkDragDrop<SocialConflictTaskManagementGetAllDto[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
        else {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
            if (event.container.id == 'cdk-drop-list-1') {
                this._socialConflictTaskManagementServiceProxy.changeStateToPending(new EntityDto({ id: event.container.data[0].id })).subscribe(() => { });
            }
            if (event.container.id == 'cdk-drop-list-2') {
                this._socialConflictTaskManagementServiceProxy.changeStateToNonComplete(new EntityDto({ id: event.container.data[0].id })).subscribe(() => { });
            }
            if (event.container.id == 'cdk-drop-list-3') {
                this._socialConflictTaskManagementServiceProxy.changeStateToComplete(new EntityDto({ id: event.container.data[0].id })).subscribe(() => { });
            }
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this.showMainSpinner('Cargando información de tareas');
            this._socialConflictTaskManagementServiceProxy
                .getAllTask(this.conflict.id, undefined, undefined, undefined, undefined, this.conflict.type, undefined, this.orderBy, 1000, 0)
                .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 500)))
                .subscribe(response => {
                    this.taskLoaded.emit(response.items);
                    this.pending = response.items.filter(p => p.status == SocialConflictTaskManagementStatus.Pending);
                    this.incomplete = response.items.filter(p => p.status == SocialConflictTaskManagementStatus.NonCompleted);
                    this.complete = response.items.filter(p => p.status == SocialConflictTaskManagementStatus.Completed);

                    const taskId = +this.getQueryParameter('task') <= 0 ? undefined : +this.getQueryParameter('task');

                    if (taskId) {
                        const taskIndex: number = response.items.findIndex(p => p.id == taskId);

                        if (taskIndex != -1) {
                            this.editTask(response.items[taskIndex]);
                        }
                    }

                });
        }, 200);
    }

    newPendingTask() {
        this.editingTask = new SocialConflictTaskManagementDto();
        this.editingTask.status = SocialConflictTaskManagementStatus.Pending;
        this.editingTask.conflict = this.conflict;
        this.editingStartTime = undefined;
        this.editingDeadLine = undefined;
        this.step = this.steps.taskCreate;
    }

    newIncompleteTask() {
        this.editingTask = new SocialConflictTaskManagementDto();
        this.editingTask.status = SocialConflictTaskManagementStatus.NonCompleted;
        this.editingTask.conflict = this.conflict;
        this.editingStartTime = undefined;
        this.editingDeadLine = undefined;
        this.step = this.steps.taskCreate;
    }

    newCompleteTask() {
        this.editingTask = new SocialConflictTaskManagementDto();
        this.editingTask.status = SocialConflictTaskManagementStatus.Completed;
        this.editingTask.conflict = this.conflict;
        this.editingStartTime = undefined;
        this.editingDeadLine = undefined;
        this.step = this.steps.taskCreate;
    }

    editTask(task: SocialConflictTaskManagementGetAllDto) {
        this.showMainSpinner('Cargando información de la tarea seleccionada');
        this._socialConflictTaskManagementServiceProxy
            .getTask(task.id)
            .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 500)))
            .subscribe(response => {
                this.editingStartTime = undefined;
                this.editingDeadLine = undefined;
                this.editingTask = response;
                this.editingStartTime = response.startTime ? moment(response.startTime.toISOString()).toDate() : undefined;
                this.editingDeadLine = response.deadline ? moment(response.deadline.toISOString()).toDate() : undefined;
                this.step = this.steps.taskCreate;
            });
    }

    deleteTask(task: SocialConflictTaskManagementGetAllDto, index: number, type: 'pending' | 'incomplete' | 'complete') {
        this.message.confirm('¿Estas seguro de eliminar la tarea seleccionada?', 'Aviso', (confirmation) => {
            if (confirmation) {
                this._socialConflictTaskManagementServiceProxy.deleteTask(task.id).subscribe(() => {
                    if (type == 'pending')
                        this.pending.splice(index, 1);
                    if (type == 'incomplete')
                        this.incomplete.splice(index, 1);
                    if (type == 'complete')
                        this.complete.splice(index, 1);

                    this.notify.success('Se ha eliminado la tarea satisfactoriamente');
                });
            }
        });
    }

    backButtonPressed() {
        if (this.conflict.fromLink) {
            if (this.conflict.type == ConflictSite.SocialConflict) {
                this.router.navigate(['/app/application/edit-social-conflict', this.conflict.id], { queryParams: { tab: 10 } });
                return;
            }
            if (this.conflict.type == ConflictSite.SocialConflictAlert) {
                this.router.navigate(['/app/application/edit-alert', this.conflict.id], { queryParams: { tab: 7 } });
                return;
            }
            if (this.conflict.type == ConflictSite.SocialConflictSensible) {
                this.router.navigate(['/app/application/edit-sensible', this.conflict.id], { queryParams: { tab: 8 } });
                return;
            }
            this.back.emit(this.conflict.selection);
        } else {
            this.back.emit(this.conflict.selection);
        }
    }

    saveTask(): void {
        const taskId = +this.getQueryParameter('task') <= 0 ? undefined : +this.getQueryParameter('task');

        let copy: SocialConflictTaskManagementDto = new SocialConflictTaskManagementDto(this.editingTask);
        if (!this.editingTask.startTime && this.editingStartTime)
            copy.startTime = moment(this.editingStartTime);
        if (!this.editingTask.deadline && this.editingDeadLine)
            copy.deadline = moment(this.editingDeadLine);

        this.saving = true;

        if (this.editingTask.id)
            this._socialConflictTaskManagementServiceProxy
                .updateTask(copy)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.notify.success('Actualizado satisfactoriamente');
                    if (taskId && this.conflict.fromLink) {
                        this.backButtonPressed();
                    } else {
                        this.step = this.steps.taskBoard;
                        this.ngOnInit();
                    }
                });
        else
            this._socialConflictTaskManagementServiceProxy
                .createTask(copy)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.notify.success('Creado satisfactoriamente');

                    if (taskId && this.conflict.fromLink) {
                        this.backButtonPressed();
                    } else {
                        this.step = this.steps.taskBoard;
                        this.ngOnInit();
                    }
                });
    }

    sendComment() {
        if (this.isNullEmptyOrWhiteSpace(this.commentDescription))
            return;

        if (!this.editingTask.id) {
            let copy: SocialConflictTaskManagementDto = new SocialConflictTaskManagementDto(this.editingTask);
            if (!this.editingTask.startTime && this.editingStartTime)
                copy.startTime = moment(this.editingStartTime);
            if (!this.editingTask.deadline && this.editingDeadLine)
                copy.deadline = moment(this.editingDeadLine);

            this.saving = true;
            this._socialConflictTaskManagementServiceProxy
                .createTask(copy)
                .pipe(finalize(() => this.saving = false))
                .subscribe((response) => {
                    this.notify.success('Creado satisfactoriamente');
                    this.editingTask = response;
                    this.registerComment();
                });

        } else {
            this.registerComment();
        }

    }

    selectPersons(changes: SocialConflictTaskAssignmentDto[]) {
        if (!this.editingTask.persons)
            this.editingTask.persons = [];
        for (let change of changes) {
            const index: number = this.editingTask.persons.findIndex(p => p.person.id == change.id);
            if (index == -1) {
                this.editingTask.persons.push(new SocialConflictTaskManagementPersonRelationDto({
                    id: undefined,
                    person: change.person,
                    remove: !change.checked
                }));
            } else {
                this.editingTask.persons[index].remove = !change.checked;
            }
        }
    }

    selectNewDeadLine(newdeadline: moment.Moment) {
        if (this.editingTask) {
            this.editingTask.deadline = newdeadline;
            this.editingDeadLine = newdeadline ? moment(newdeadline.toISOString()).toDate() : undefined;
        }
    }

    removeResource(resource: SocialConflictTaskManagementResourceDto, index: number) {
        resource.remove = true;
    }

    restoreResource(resource: SocialConflictTaskManagementResourceDto) {
        resource.remove = false;
    }

    openExpandDeadLine() {
        this.onShowExpandDeadLine.emit(this.editingTask);
    }

    openPersons() {
        this.onShowPerson.emit(this.editingTask);
    }

    openSender() {
        this.onShowSender.emit(this.editingTask);
    }

    openEmail() {
        this.onShowEmail.emit(this.editingTask);
    }

    goTaskBoard() {
        const taskId = +this.getQueryParameter('task') <= 0 ? undefined : +this.getQueryParameter('task');

        if (taskId && this.conflict.fromLink) {
            this.backButtonPressed();
        } else {
            this.step = this.steps.taskBoard;
            this.ngOnInit();
        }

    }

    private registerComment() {
        this.commentSend = true;
        this._socialConflictTaskManagementServiceProxy
            .createComment(new SocialConflictTaskManagementCommentCreateDto({
                description: this.commentDescription,
                socialConflictTaskManagement: new EntityDto({
                    id: this.editingTask.id
                })
            })).pipe(finalize(() => this.commentSend = false))
            .subscribe(response => {
                this.commentDescription = '';
                this.editingTask.comments.push(response);
            })
    }
}