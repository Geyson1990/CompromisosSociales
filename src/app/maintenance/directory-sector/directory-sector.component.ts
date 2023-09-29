import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DirectorySectorDto, DirectorySectorServiceProxy } from '@shared/service-proxies/application/directory-sector-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditDirectorySectorComponent } from './create-edit-sector/create-edit-directory-sector.component';

@Component({
    templateUrl: 'directory-sector.component.html',
    styleUrls: [
        'directory-sector.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class DirectorySectorComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalDirectorySector', { static: true }) createEditModalDirectorySector: CreateEditDirectorySectorComponent;

    filterText: string;

    constructor(_injector: Injector, private _directorysectorServiceProxy: DirectorySectorServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalDirectorySector.show();
    }

    editItem(directorysector: DirectorySectorDto) {
        this.createEditModalDirectorySector.show(directorysector.id);
    }

    deleteItem(directorysector: DirectorySectorDto) {
        this.message.confirm(`¿Esta seguro de eliminar el sector ${directorysector.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._directorysectorServiceProxy.delete(directorysector.id).subscribe(() => {
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
        this._directorysectorServiceProxy
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