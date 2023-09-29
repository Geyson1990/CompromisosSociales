import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DirectoryGovernmentSectorDto, DirectoryGovernmentSectorServiceProxy } from '@shared/service-proxies/application/directory-government-sector';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditDirectoryGovernmentSectorComponent } from './create-edit-government-sector/create-edit-government-sector.component';

@Component({
    templateUrl: 'directory-government-sector.component.html',
    styleUrls: [
        'directory-government-sector.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class DirectoryGovernmentSectorComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalDirectoryGovernmentSector', { static: true }) createEditModalDirectoryGovernmentSector: CreateEditDirectoryGovernmentSectorComponent;

    filterText: string;

    constructor(_injector: Injector, private _directorygovernmentsectorServiceProxy: DirectoryGovernmentSectorServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalDirectoryGovernmentSector.show();
    }

    editItem(directorygovernmentsector: DirectoryGovernmentSectorDto) {
        this.createEditModalDirectoryGovernmentSector.show(directorygovernmentsector.id);
    }

    deleteItem(directorygovernmentsector: DirectoryGovernmentSectorDto) {
        this.message.confirm(`¿Esta seguro de eliminar el sector ${directorygovernmentsector.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._directorygovernmentsectorServiceProxy.delete(directorygovernmentsector.id).subscribe(() => {
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
        this._directorygovernmentsectorServiceProxy
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