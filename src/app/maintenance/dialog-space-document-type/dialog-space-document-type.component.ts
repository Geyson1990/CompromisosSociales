import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DialogSpaceDocumentTypeDto, DialogSpaceDocumentTypeServiceProxy } from '@shared/service-proxies/application/dialog-space-document-type-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditDialogSpaceDocumentTypeComponent } from './create-edit-dialog-space-document-type/create-edit-dialog-space-document-type.component';

@Component({
    templateUrl: 'dialog-space-document-type.component.html',
    styleUrls: [
        'dialog-space-document-type.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class DialogSpaceDocumentTypeComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalDialogSpaceDocumentType', { static: true }) createEditModalDialogSpaceDocumentType: CreateEditDialogSpaceDocumentTypeComponent;

    filterText: string;

    constructor(_injector: Injector, private _dialogSpaceDocumentTypeServiceProxy: DialogSpaceDocumentTypeServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalDialogSpaceDocumentType.show();
    }

    editItem(dialogSpaceDocumentType: DialogSpaceDocumentTypeDto) {
        this.createEditModalDialogSpaceDocumentType.show(dialogSpaceDocumentType.id);
    }

    deleteItem(dialogSpaceDocumentType: DialogSpaceDocumentTypeDto) {
        this.message.confirm(`¿Esta seguro de eliminar el tipo de espacio de diálogo: ${dialogSpaceDocumentType.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._dialogSpaceDocumentTypeServiceProxy.delete(dialogSpaceDocumentType.id).subscribe(() => {
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
        this._dialogSpaceDocumentTypeServiceProxy
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