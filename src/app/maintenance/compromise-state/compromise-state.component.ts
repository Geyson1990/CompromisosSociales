import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CompromiseSubStateDto, CompromiseSubStateServiceProxy } from '@shared/service-proxies/application/compromise-sub-state-proxie';
import { CompromiseStateDto, CompromiseStateServiceProxy } from '@shared/service-proxies/application/compromise-state-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditCompromiseStateComponent } from './create-edit-state/create-edit-state.component';
import { CreateEditCompromiseSubStateComponent } from './create-edit-sub-state/create-edit-sub-state.component';

@Component({
    templateUrl: 'compromise-state.component.html',
    styleUrls: [
        'compromise-state.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class CompromiseStateComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalCompromiseState', { static: true }) createEditModalCompromiseState: CreateEditCompromiseStateComponent;
    @ViewChild('createEditModalSubCompromiseState', { static: true }) createEditModalSubCompromiseState: CreateEditCompromiseSubStateComponent;

    filterText: string;

    constructor(_injector: Injector, private _compromiseStateServiceProxy: CompromiseStateServiceProxy, private _compromiseSubStateServiceProxy: CompromiseSubStateServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalCompromiseState.show();
    }

    editItem(compromisestate: CompromiseStateDto) {
        this.createEditModalCompromiseState.show(compromisestate.id);
    }

    deleteItem(compromisestate: CompromiseStateDto) {
        this.message.confirm(`¿Esta seguro de eliminar la tipología general ${compromisestate.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._compromiseStateServiceProxy.delete(compromisestate.id).subscribe(() => {
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
        this._compromiseStateServiceProxy
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

    createSubItem(compromisestate: CompromiseStateDto) {
        this.createEditModalSubCompromiseState.show(compromisestate);
    }

    editSubItem(compromisestate: CompromiseStateDto, subCompromiseState: CompromiseSubStateDto) {
        this.createEditModalSubCompromiseState.show(compromisestate, subCompromiseState.id);
    }

    deleteSubItem(subCompromiseState: CompromiseSubStateDto) {
        this.message.confirm(`¿Esta seguro de eliminar la tipología detallada ${subCompromiseState.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed) {
                this._compromiseSubStateServiceProxy.delete(subCompromiseState.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.error('Eliminado satisfactoriamente');
                });
            }
        });
    }
}