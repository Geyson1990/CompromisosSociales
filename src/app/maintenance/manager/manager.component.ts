import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ManagerDto, ManagerServiceProxy } from '@shared/service-proxies/application/manager-proxie';
import { CreateEditManagerComponent } from './create-edit-manager/create-edit-manager.component';

@Component({
    templateUrl: 'manager.component.html',
    styleUrls: [
        'manager.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class ManagerComponent extends AppComponentBase implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModal', { static: true }) createEditModal: CreateEditManagerComponent;

    filterText: string;

    constructor(_injector: Injector, private _managerServiceProxy: ManagerServiceProxy) {
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
        this._managerServiceProxy
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

    editItem(manager: ManagerDto) {
        this.createEditModal.show(manager.id);
    }

    deleteItem(manager: ManagerDto) {
        this.message.confirm(`¿Esta seguro de eliminar el gestor ${manager.name}?`, 'Aviso',
            (isConfirmed) => {
                if (isConfirmed)
                    this._managerServiceProxy
                        .delete(manager.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.error('Eliminado satisfactoriamente');
                        });
            }
        );
    }
}