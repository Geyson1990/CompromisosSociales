import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CompromiseLabelDto, CompromiseLabelServiceProxy } from '@shared/service-proxies/application/compromise-label-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditCompromiseLabelComponent } from './create-edit-compromise-label/create-edit-compromise-label.component';

@Component({
    templateUrl: 'compromise-label.component.html',
    styleUrls: [
        'compromise-label.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class CompromiseLabelComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalCompromiseLabel', { static: true }) createEditModalCompromiseLabel: CreateEditCompromiseLabelComponent;

    filterText: string;

    constructor(_injector: Injector, private _compromiselabelServiceProxy: CompromiseLabelServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalCompromiseLabel.show();
    }

    editItem(compromiselabel: CompromiseLabelDto) {
        this.createEditModalCompromiseLabel.show(compromiselabel.id);
    }

    deleteItem(compromiselabel: CompromiseLabelDto) {
        this.message.confirm(`¿Esta seguro de eliminar la etiqueta ${compromiselabel.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._compromiselabelServiceProxy.delete(compromiselabel.id).subscribe(() => {
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
        this._compromiselabelServiceProxy
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