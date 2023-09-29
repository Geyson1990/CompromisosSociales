import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FactDto, FactServiceProxy } from '@shared/service-proxies/application/fact-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditFactComponent } from './create-edit-fact/create-edit-fact.component';

@Component({
    templateUrl: 'fact.component.html',
    styleUrls: [
        'fact.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class FactComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalFact', { static: true }) createEditModalFact: CreateEditFactComponent;

    filterText: string;

    constructor(_injector: Injector, private _factServiceProxy: FactServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalFact.show();
    }

    editItem(fact: FactDto) {
        this.createEditModalFact.show(fact.id);
    }

    deleteItem(fact: FactDto) {
        this.message.confirm(`¿Esta seguro de eliminar el hecho ${fact.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._factServiceProxy.delete(fact.id).subscribe(() => {
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
        this._factServiceProxy
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