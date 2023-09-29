import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { RecordResourceTypeDto, RecordResourceTypeServiceProxy } from '@shared/service-proxies/application/record-resource-type-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditRecordResourceTypeComponent } from './create-edit-record-resource-type/create-edit-record-resource-type.component';

@Component({
    templateUrl: 'record-resource-type.component.html',
    styleUrls: [
        'record-resource-type.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class RecordResourceTypeComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalRecordResourceType', { static: true }) createEditModalRecordResourceType: CreateEditRecordResourceTypeComponent;

    filterText: string;

    constructor(_injector: Injector, private _recordResourceTypeServiceProxy: RecordResourceTypeServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalRecordResourceType.show();
    }

    editItem(recordResourceType: RecordResourceTypeDto) {
        this.createEditModalRecordResourceType.show(recordResourceType.id);
    }

    deleteItem(recordResourceType: RecordResourceTypeDto) {
        this.message.confirm(`¿Esta seguro de eliminar el tipo de gestión ${recordResourceType.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._recordResourceTypeServiceProxy.delete(recordResourceType.id).subscribe(() => {
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
        this._recordResourceTypeServiceProxy
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