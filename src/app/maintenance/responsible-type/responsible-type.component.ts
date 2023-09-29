import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ResponsibleSubTypeServiceProxy } from '@shared/service-proxies/application/responsible-sub-type-proxie';
import { ResponsibleTypeDto, ResponsibleTypeResponsibleSubTypeDto, ResponsibleTypeServiceProxy } from '@shared/service-proxies/application/responsible-type-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditResponsibleSubTypeComponent } from './create-edit-responsible-subtype/create-edit-responsible-subtype.component';
import { CreateEditResponsibleTypeComponent } from './create-edit-responsible-type/create-edit-responsible-type.component';

@Component({
    templateUrl: 'responsible-type.component.html',
    styleUrls: [
        'responsible-type.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class ResponsibleTypeComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalResponsibleType', { static: true }) createEditModalResponsibleType: CreateEditResponsibleTypeComponent;
    @ViewChild('createEditModalResponsibleSubType', { static: true }) createEditModalResponsibleSubType: CreateEditResponsibleSubTypeComponent;

    filterText: string;

    constructor(_injector: Injector, private _responsibletypeServiceProxy: ResponsibleTypeServiceProxy, private _responsibleSubTypeServiceProxy: ResponsibleSubTypeServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalResponsibleType.show();
    }

    editItem(responsibletype: ResponsibleTypeDto) {
        this.createEditModalResponsibleType.show(responsibletype.id);
    }

    deleteItem(responsibletype: ResponsibleTypeDto) {
        this.message.confirm(`¿Esta seguro de eliminar el tipo de actor ${responsibletype.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._responsibletypeServiceProxy.delete(responsibletype.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.error('Eliminado satisfactoriamente');
                });
        });
    }

    createSubItem(responsibleType: ResponsibleTypeDto) {
        this.createEditModalResponsibleSubType.show(responsibleType.id);
    }

    editSubItem(responsibleType: ResponsibleTypeDto, responsibleSubType: ResponsibleTypeResponsibleSubTypeDto) {
        this.createEditModalResponsibleSubType.show(responsibleType.id, responsibleSubType.id);
    }

    deleteSubItem(responsibleSubType: ResponsibleTypeResponsibleSubTypeDto) {
        this.message.confirm(`¿Esta seguro de eliminar el subtipo de actor ${responsibleSubType.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._responsibleSubTypeServiceProxy.delete(responsibleSubType.id).subscribe(() => {
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
        this._responsibletypeServiceProxy
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