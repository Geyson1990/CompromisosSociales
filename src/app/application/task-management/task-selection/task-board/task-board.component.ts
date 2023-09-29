import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CommentType, TaskBoardServiceProxy, TaskCommentCreateDto, TaskManagementAssignmentDto, TaskManagementCompromiseDto, TaskManagementDto, TaskManagementGetAllDto, TaskManagementPersonRelationDto, TaskSelection, TaskStatus } from '@shared/service-proxies/application/task-board-proxie';
import { EntityDto } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'task-board',
    templateUrl: 'task-board.component.html',
    styleUrls: [
        'task-board.component.css'
    ]
})
export class TaskBoardComponent extends AppComponentBase implements OnInit {

    @Input() compromise: TaskManagementCompromiseDto;
    @Output() back: EventEmitter<TaskSelection> = new EventEmitter<TaskSelection>();
    @Output() taskLoaded: EventEmitter<TaskManagementGetAllDto[]> = new EventEmitter<TaskManagementGetAllDto[]>();
    @Output() onShowExpandDeadLine: EventEmitter<TaskManagementDto> = new EventEmitter<TaskManagementDto>();
    @Output() onShowPerson: EventEmitter<TaskManagementDto> = new EventEmitter<TaskManagementDto>();
    @Output() onShowSender: EventEmitter<TaskManagementDto> = new EventEmitter<TaskManagementDto>();
    @Output() onShowEmail: EventEmitter<TaskManagementDto> = new EventEmitter<TaskManagementDto>();

    pending: TaskManagementGetAllDto[] = [];
    incomplete: TaskManagementGetAllDto[] = [];
    complete: TaskManagementGetAllDto[] = [];

    orderBy: string = 'CreationTime';

    steps = {
        taskBoard: 0,
        taskCreate: 1
    }

    step: number = this.steps.taskBoard;

    editingTask: TaskManagementDto;
    editingStartTime: Date;
    editingDeadLine: Date;
    saving: boolean;

    commentDescription: string;
    commentSend: boolean;
    commentTypes = {
        system: CommentType.SYSTEM,
        user: CommentType.USER
    }

    get personsTitle(): string {
        if (!this.editingTask || !this.editingTask?.persons || this.editingTask?.persons?.length == 0)
            return 'Seleccionar responsable';

        return this.editingTask.personNames;
    }

    constructor(_injector: Injector, private _taskBoardServiceProxy: TaskBoardServiceProxy) {
        super(_injector);
    }

    drop(event: CdkDragDrop<TaskManagementGetAllDto[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
        else {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
            if (event.container.id == 'cdk-drop-list-1') {
                this._taskBoardServiceProxy.changeStateToPending(new EntityDto({ id: event.container.data[0].id })).subscribe(() => { });
            }
            if (event.container.id == 'cdk-drop-list-2') {
                this._taskBoardServiceProxy.changeStateToNonComplete(new EntityDto({ id: event.container.data[0].id })).subscribe(() => { });
            }
            if (event.container.id == 'cdk-drop-list-3') {
                this._taskBoardServiceProxy.changeStateToComplete(new EntityDto({ id: event.container.data[0].id })).subscribe(() => { });
            }
        }

    }


    ngOnInit() {
        setTimeout(() => {
            this.showMainSpinner('Cargando información de tareas');
            this._taskBoardServiceProxy
                .getAllTasks(this.compromise.id, undefined, TaskStatus.None, undefined, undefined, undefined, this.orderBy, 1000, 0)
                .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 500)))
                .subscribe(response => {
                    this.taskLoaded.emit(response.items);
                    this.pending = response.items.filter(p => p.status == TaskStatus.Pending);
                    this.incomplete = response.items.filter(p => p.status == TaskStatus.NonCompleted);
                    this.complete = response.items.filter(p => p.status == TaskStatus.Completed);

                    const taskId = +this.getQueryParameter('task') <= 0 ? undefined : +this.getQueryParameter('task');

                    if (taskId) {
                        const taskIndex: number = response.items.findIndex(p => p.id == taskId);

                        if (taskIndex != -1) {
                            this.editTask(response.items[taskIndex]);
                        }
                    }

                });

            abp.event.on('application.modal.expand.newdeadline', (newdeadline: moment.Moment) => {
                if (this.editingTask) {
                    this.editingTask.deadline = newdeadline;
                    this.editingDeadLine = newdeadline ? moment(newdeadline.toISOString()).toDate() : undefined;
                }
            });
        }, 200);
    }

    newPendingTask() {
        this.editingTask = new TaskManagementDto();
        this.editingTask.status = TaskStatus.Pending;
        this.editingTask.compromise = this.compromise;
        this.editingStartTime = undefined;
        this.editingDeadLine = undefined;
        this.step = this.steps.taskCreate;
    }

    newIncompleteTask() {
        this.editingTask = new TaskManagementDto();
        this.editingTask.status = TaskStatus.NonCompleted;
        this.editingTask.compromise = this.compromise;
        this.editingStartTime = undefined;
        this.editingDeadLine = undefined;
        this.step = this.steps.taskCreate;
    }

    newCompleteTask() {
        this.editingTask = new TaskManagementDto();
        this.editingTask.status = TaskStatus.Completed;
        this.editingTask.compromise = this.compromise;
        this.editingStartTime = undefined;
        this.editingDeadLine = undefined;
        this.step = this.steps.taskCreate;
    }

    editTask(task: TaskManagementGetAllDto) {
        this.showMainSpinner('Cargando información de la tarea seleccionada');
        this._taskBoardServiceProxy
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

    deleteTask(task: TaskManagementGetAllDto, index: number, type: 'pending' | 'incomplete' | 'complete') {
        this.message.confirm('¿Estas seguro de eliminar la tarea seleccionada?', 'Aviso', (confirmation) => {
            if (confirmation) {
                this._taskBoardServiceProxy.deleteTask(task.id).subscribe(() => {
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
        if (this.compromise.fromLink) {
            this.router.navigate(['/app/application/create-edit-compromises'], { queryParams: { id: this.compromise.id, tab: 4 } });
        } else {
            this.back.emit(this.compromise.selection);
        }
    }

    saveTask(): void {
        const taskId = +this.getQueryParameter('task') <= 0 ? undefined : +this.getQueryParameter('task');

        let copy: TaskManagementDto = new TaskManagementDto(this.editingTask);
        if (!this.editingTask.startTime && this.editingStartTime)
            copy.startTime = moment(this.editingStartTime);
        if (!this.editingTask.deadline && this.editingDeadLine)
            copy.deadline = moment(this.editingDeadLine);

        this.saving = true;

        if (this.editingTask.id)
            this._taskBoardServiceProxy
                .updateTask(copy)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.notify.success('Actualizado satisfactoriamente');

                    if (taskId && this.compromise.fromLink) {
                        this.router.navigate(['/app/application/create-edit-compromises'], { queryParams: { id: this.compromise.id, tab: 4 } });
                    } else {
                        this.step = this.steps.taskBoard;
                        this.ngOnInit();
                    }
                });
        else
            this._taskBoardServiceProxy
                .createTask(copy)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.notify.success('Creado satisfactoriamente');

                    if (taskId && this.compromise.fromLink) {
                        this.router.navigate(['/app/application/create-edit-compromises'], { queryParams: { id: this.compromise.id, tab: 4 } });
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
            let copy: TaskManagementDto = new TaskManagementDto(this.editingTask);
            if (!this.editingTask.startTime && this.editingStartTime)
                copy.startTime = moment(this.editingStartTime);
            if (!this.editingTask.deadline && this.editingDeadLine)
                copy.deadline = moment(this.editingDeadLine);

            this.saving = true;
            this._taskBoardServiceProxy
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

    selectPersons(changes: TaskManagementAssignmentDto[]) {
        if (!this.editingTask.persons)
            this.editingTask.persons = [];
        for (let change of changes) {
            const index: number = this.editingTask.persons.findIndex(p => p.person.id == change.id);
            if (index == -1) {
                this.editingTask.persons.push(new TaskManagementPersonRelationDto({
                    id: undefined,
                    person: change.person,
                    remove: !change.checked
                }));
            } else {
                this.editingTask.persons[index].remove = !change.checked;
            }
        }
    }

    private registerComment() {
        this.commentSend = true;
        this._taskBoardServiceProxy
            .createComment(new TaskCommentCreateDto({
                description: this.commentDescription,
                taskManagement: new EntityDto({
                    id: this.editingTask.id
                })
            })).pipe(finalize(() => this.commentSend = false))
            .subscribe(response => {
                this.commentDescription = '';
                this.editingTask.comments.push(response);
            })
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

        if (taskId && this.compromise.fromLink) {
            this.router.navigate(['/app/application/create-edit-compromises'], { queryParams: { id: this.compromise.id, tab: 4 } });
        } else {
            this.step = this.steps.taskBoard;
            this.ngOnInit();
        }

    }
}