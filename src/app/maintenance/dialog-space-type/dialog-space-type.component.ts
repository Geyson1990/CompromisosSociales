import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DialogSpaceTypeDto, DialogSpaceTypeServiceProxy } from '@shared/service-proxies/application/dialog-space-type-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditDialogSpaceTypeComponent } from './create-edit-dialog-space-type/create-edit-dialog-space-type.component';

@Component({
    templateUrl: 'dialog-space-type.component.html',
    styleUrls: [
        'dialog-space-type.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class DialogSpaceTypeComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalDialogSpaceType', { static: true }) createEditModalDialogSpaceType: CreateEditDialogSpaceTypeComponent;

    filterText: string;

    constructor(_injector: Injector, private _dialogSpaceTypeServiceProxy: DialogSpaceTypeServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalDialogSpaceType.show();
    }

    editItem(dialogSpaceType: DialogSpaceTypeDto) {
        this.createEditModalDialogSpaceType.show(dialogSpaceType.id);
    }

    deleteItem(dialogSpaceType: DialogSpaceTypeDto) {
        this.message.confirm(`¿Esta seguro de eliminar el tipo de gestión ${dialogSpaceType.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._dialogSpaceTypeServiceProxy.delete(dialogSpaceType.id).subscribe(() => {
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
        this._dialogSpaceTypeServiceProxy
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