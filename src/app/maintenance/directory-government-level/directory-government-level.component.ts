import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DirectoryGovernmentLevelDto, DirectoryGovernmentLevelServiceProxy } from '@shared/service-proxies/application/directory-government-level-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditDirectoryGovernmentLevelComponent } from './create-edit-government-level/create-edit-directory-government-level.component';

@Component({
    templateUrl: 'directory-government-level.component.html',
    styleUrls: [
        'directory-government-level.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class DirectoryGovernmentLevelComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalDirectoryGovernmentLevel', { static: true }) createEditModalDirectoryGovernmentLevel: CreateEditDirectoryGovernmentLevelComponent;

    filterText: string;

    constructor(_injector: Injector, private _directorygovernmentlevelServiceProxy: DirectoryGovernmentLevelServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalDirectoryGovernmentLevel.show();
    }

    editItem(directorygovernmentlevel: DirectoryGovernmentLevelDto) {
        this.createEditModalDirectoryGovernmentLevel.show(directorygovernmentlevel.id);
    }

    deleteItem(directorygovernmentlevel: DirectoryGovernmentLevelDto) {
        this.message.confirm(`¿Esta seguro de eliminar el registro ${directorygovernmentlevel.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._directorygovernmentlevelServiceProxy.delete(directorygovernmentlevel.id).subscribe(() => {
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
        this._directorygovernmentlevelServiceProxy
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