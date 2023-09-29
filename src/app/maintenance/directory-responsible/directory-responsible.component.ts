import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DirectoryResponsibleDto, DirectoryResponsibleServiceProxy } from '@shared/service-proxies/application/directory-responsible-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditDirectoryResponsibleComponent } from './create-edit-directory-responsible/create-edit-directory-responsible.component';

@Component({
    templateUrl: 'directory-responsible.component.html',
    styleUrls: [
        'directory-responsible.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class DirectoryResponsibleComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalDirectoryResponsible', { static: true }) createEditModalDirectoryResponsible: CreateEditDirectoryResponsibleComponent;

    filterText: string;

    constructor(_injector: Injector, private _directoryresponsibleServiceProxy: DirectoryResponsibleServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalDirectoryResponsible.show();
    }

    editItem(directoryresponsible: DirectoryResponsibleDto) {
        this.createEditModalDirectoryResponsible.show(directoryresponsible.id);
    }

    deleteItem(directoryresponsible: DirectoryResponsibleDto) {
        this.message.confirm(`¿Esta seguro de eliminar el responsable ${directoryresponsible.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._directoryresponsibleServiceProxy.delete(directoryresponsible.id).subscribe(() => {
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
        this._directoryresponsibleServiceProxy
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