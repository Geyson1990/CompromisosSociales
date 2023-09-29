import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DirectoryGovernmentTypeDto, DirectoryGovernmentTypeServiceProxy } from '@shared/service-proxies/application/directory-government-type-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditDirectoryGovernmentTypeComponent } from './create-edit-directory-government-type/create-edit-directory-government-type.component';

@Component({
    templateUrl: 'directory-government-type.component.html',
    styleUrls: [
        'directory-government-type.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class DirectoryGovernmentTypeComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalDirectoryGovernmentType', { static: true }) createEditModalDirectoryGovernmentType: CreateEditDirectoryGovernmentTypeComponent;

    filterText: string;

    constructor(_injector: Injector, private _directorygovernmenttypeServiceProxy: DirectoryGovernmentTypeServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalDirectoryGovernmentType.show();
    }

    editItem(directorygovernmenttype: DirectoryGovernmentTypeDto) {
        this.createEditModalDirectoryGovernmentType.show(directorygovernmenttype.id);
    }

    deleteItem(directorygovernmenttype: DirectoryGovernmentTypeDto) {
        this.message.confirm(`¿Esta seguro de eliminar el tipo de gestión ${directorygovernmenttype.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._directorygovernmenttypeServiceProxy.delete(directorygovernmenttype.id).subscribe(() => {
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
        this._directorygovernmenttypeServiceProxy
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