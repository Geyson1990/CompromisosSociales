import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FindDirectoryGovernmentComponent } from '@shared/component/find-directory-government/find-directory-government.component';
import { DirectoryDialogDto, DirectoryDialogGovernmentDto, DirectoryDialogServiceProxy } from '@shared/service-proxies/application/directory-dialog-proxie';
import { UtilityDirectoryGovernmentDto } from '@shared/service-proxies/application/utility-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditDirectoryDialogComponent } from './create-edit-directory-dialog/create-edit-directory-dialog.component';

@Component({
    templateUrl: 'directory-dialog.component.html',
    styleUrls: [
        'directory-dialog.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class DirectoryDialogComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalDirectoryDialog', { static: true }) createEditModalDirectoryDialog: CreateEditDirectoryDialogComponent;
    @ViewChild('findDirectoryGovernmentDialog', { static: true }) findDirectoryGovernmentDialog: FindDirectoryGovernmentComponent;

    filterText: string;

    constructor(_injector: Injector, private _directorydialogServiceProxy: DirectoryDialogServiceProxy) {
        super(_injector);
    }

    findDirectoryGovernment() {
        this.findDirectoryGovernmentDialog.show();
    }

    selectDirectoryGovernment(directoryGovernment: UtilityDirectoryGovernmentDto) {
        this.createEditModalDirectoryDialog.selectDirectoryGovernment(DirectoryDialogGovernmentDto.fromJS(directoryGovernment));
    }

    createItem() {
        this.createEditModalDirectoryDialog.show();
    }

    editItem(directorydialog: DirectoryDialogDto) {
        this.createEditModalDirectoryDialog.show(directorydialog.id);
    }

    deleteItem(directorydialog: DirectoryDialogDto) {
        this.message.confirm(`¿Esta seguro de eliminar el registro ${directorydialog.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._directorydialogServiceProxy.delete(directorydialog.id).subscribe(() => {
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
        this._directorydialogServiceProxy
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