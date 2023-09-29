import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ManagementDto, ManagementServiceProxy } from '@shared/service-proxies/application/management-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditManagementComponent } from './create-edit-management/create-edit-management';

@Component({
    templateUrl: 'management.component.html',
    styleUrls: [
        'management.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class ManagementComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalManagement', { static: true }) createEditModalManagement: CreateEditManagementComponent;

    filterText: string;

    constructor(_injector: Injector, private _managementServiceProxy: ManagementServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalManagement.show();
    }

    editItem(management: ManagementDto) {
        this.createEditModalManagement.show(management.id);
    }

    deleteItem(management: ManagementDto) {
        this.message.confirm(`¿Esta seguro de eliminar el tipo de gestión ${management.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._managementServiceProxy.delete(management.id).subscribe(() => {
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
        this._managementServiceProxy
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