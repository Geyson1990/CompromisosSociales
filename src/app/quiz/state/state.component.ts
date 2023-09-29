import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { QuizStateDto, QuizStateServiceProxy } from '@shared/service-proxies/application/quiz-state-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditQuizStateComponent } from './create-edit-state/create-edit-state.component';

@Component({
    templateUrl: 'state.component.html',
    styleUrls: [
        'state.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class QuizStateComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalQuizState', { static: true }) createEditModalQuizState: CreateEditQuizStateComponent;

    filterText: string;

    constructor(_injector: Injector, private _quizstateServiceProxy: QuizStateServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalQuizState.show();
    }

    editItem(quizstate: QuizStateDto) {
        this.createEditModalQuizState.show(quizstate.id);
    }

    deleteItem(quizstate: QuizStateDto) {
        this.message.confirm(`¿Esta seguro de eliminar el estado de encuesta ${quizstate.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._quizstateServiceProxy.delete(quizstate.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.error('Eliminado satisfactoriamente');
                });
        });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._quizstateServiceProxy
            .getAll(
                this.filterText,
                this.primengTableHelper.getSorting(this.dataTable),
                this.primengTableHelper.getMaxResultCount(this.paginator, event),
                this.primengTableHelper.getSkipCount(this.paginator, event))
            .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
            .subscribe((result) => {
                this.primengTableHelper.records = result.items;
                this.primengTableHelper.totalRecordsCount = result.totalCount;
                this.primengTableHelper.hideLoadingIndicator();
            });
    }
}