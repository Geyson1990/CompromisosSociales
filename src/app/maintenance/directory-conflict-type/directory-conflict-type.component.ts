import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DirectoryConflictTypeDto, DirectoryConflictTypeServiceProxy } from '@shared/service-proxies/application/directory-conflict-type-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditDirectoryConflictTypeComponent } from './create-edit-conflict-type/create-edit-directory-conflict-type.component';

@Component({
    templateUrl: 'directory-conflict-type.component.html',
    styleUrls: [
        'directory-conflict-type.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class DirectoryConflictTypeComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalDirectoryConflictType', { static: true }) createEditModalDirectoryConflictType: CreateEditDirectoryConflictTypeComponent;

    filterText: string;

    constructor(_injector: Injector, private _directoryconflicttypeServiceProxy: DirectoryConflictTypeServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalDirectoryConflictType.show();
    }

    editItem(directoryconflicttype: DirectoryConflictTypeDto) {
        this.createEditModalDirectoryConflictType.show(directoryconflicttype.id);
    }

    deleteItem(directoryconflicttype: DirectoryConflictTypeDto) {
        this.message.confirm(`¿Esta seguro de eliminar el registro ${directoryconflicttype.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._directoryconflicttypeServiceProxy.delete(directoryconflicttype.id).subscribe(() => {
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
        this._directoryconflicttypeServiceProxy
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