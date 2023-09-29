import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DirectoryGovernmentDto, DirectoryGovernmentServiceProxy } from '@shared/service-proxies/application/directory-government-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditDirectoryGovernmentComponent } from './create-edit-directory-government/create-edit-directory-government';

@Component({
    templateUrl: 'directory-government.component.html',
    styleUrls: [
        'directory-government.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class DirectoryGovernmentComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalDirectoryGovernment', { static: true }) createEditModalDirectoryGovernment: CreateEditDirectoryGovernmentComponent;
    
    filterText: string;

    constructor(_injector: Injector, private _directorygovernmentServiceProxy: DirectoryGovernmentServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalDirectoryGovernment.show();
    }

    editItem(directorygovernment: DirectoryGovernmentDto) {
        this.createEditModalDirectoryGovernment.show(directorygovernment.id);
    }

    deleteItem(directorygovernment: DirectoryGovernmentDto) {
        this.message.confirm(`¿Esta seguro de eliminar la entidad ${directorygovernment.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._directorygovernmentServiceProxy.delete(directorygovernment.id).subscribe(() => {
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
        this._directorygovernmentServiceProxy
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