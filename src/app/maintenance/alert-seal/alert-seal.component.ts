import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AlertSealDto, AlertSealServiceProxy } from '@shared/service-proxies/application/alert-seal-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditAlertSealComponent } from './create-edit-alert-seal/create-edit-alert-seal.component';

@Component({
    templateUrl: 'alert-seal.component.html',
    styleUrls: [
        'alert-seal.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class AlertSealComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalAlertSeal', { static: true }) createEditModalAlertSeal: CreateEditAlertSealComponent;

    filterText: string;

    constructor(_injector: Injector, private _alertsealServiceProxy: AlertSealServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalAlertSeal.show();
    }

    editItem(alertseal: AlertSealDto) {
        this.createEditModalAlertSeal.show(alertseal.id);
    }

    deleteItem(alertseal: AlertSealDto) {
        this.message.confirm(`¿Esta seguro de eliminar el registro ${alertseal.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._alertsealServiceProxy.delete(alertseal.id).subscribe(() => {
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
        this._alertsealServiceProxy
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