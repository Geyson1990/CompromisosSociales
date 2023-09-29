import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AnalystDto, AnalystServiceProxy } from '@shared/service-proxies/application/analyst-proxie';
import { CreateEditAnalystComponent } from './create-edit-analyst/create-edit-analyst.component';

@Component({
    templateUrl: 'analyst.component.html',
    styleUrls: [
        'analyst.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class AnalystComponent extends AppComponentBase implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModal', { static: true }) createEditModal: CreateEditAnalystComponent;

    filterText: string;

    constructor(_injector: Injector, private _analystServiceProxy: AnalystServiceProxy) {
        super(_injector);
    }

    ngOnInit() { }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._analystServiceProxy
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

    createItem() {
        this.createEditModal.show();
    }

    editItem(analyst: AnalystDto) {
        this.createEditModal.show(analyst.id);
    }

    deleteItem(analyst: AnalystDto) {
        this.message.confirm(`¿Esta seguro de eliminar el analista ${analyst.name}?`, 'Aviso',
            (isConfirmed) => {
                if (isConfirmed)
                    this._analystServiceProxy
                        .delete(analyst.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.error('Eliminado satisfactoriamente');
                        });
            }
        );
    }
}