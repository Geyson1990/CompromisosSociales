import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DialogSpaceDocumentSituationDto, DialogSpaceDocumentSituationServiceProxy } from '@shared/service-proxies/application/dialog-space-document-situation-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditDialogSpaceDocumentSituationComponent } from './create-edit-dialog-space-document-situation/create-edit-dialog-space-document-situation.component';

@Component({
    templateUrl: 'dialog-space-document-situation.component.html',
    styleUrls: [
        'dialog-space-document-situation.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class DialogSpaceDocumentSituationComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalDialogSpaceDocumentSituation', { static: true }) createEditModalDialogSpaceDocumentSituation: CreateEditDialogSpaceDocumentSituationComponent;

    filterText: string;

    constructor(_injector: Injector, private _dialogSpaceDocumentSituationServiceProxy: DialogSpaceDocumentSituationServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalDialogSpaceDocumentSituation.show();
    }

    editItem(dialogSpaceDocumentSituation: DialogSpaceDocumentSituationDto) {
        this.createEditModalDialogSpaceDocumentSituation.show(dialogSpaceDocumentSituation.id);
    }

    deleteItem(dialogSpaceDocumentSituation: DialogSpaceDocumentSituationDto) {
        this.message.confirm(`¿Esta seguro de eliminar la situación ${dialogSpaceDocumentSituation.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._dialogSpaceDocumentSituationServiceProxy.delete(dialogSpaceDocumentSituation.id).subscribe(() => {
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
        this._dialogSpaceDocumentSituationServiceProxy
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