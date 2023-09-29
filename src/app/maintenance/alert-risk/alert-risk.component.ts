import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AlertRiskDto, AlertRiskServiceProxy } from '@shared/service-proxies/application/alert-risk-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditAlertRiskComponent } from './create-edit-alert-risk/create-edit-alert-risk.component';

@Component({
    templateUrl: 'alert-risk.component.html',
    styleUrls: [
        'alert-risk.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class AlertRiskComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalAlertRisk', { static: true }) createEditModalAlertRisk: CreateEditAlertRiskComponent;

    filterText: string;

    constructor(_injector: Injector, private _alertriskServiceProxy: AlertRiskServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalAlertRisk.show();
    }

    editItem(alertrisk: AlertRiskDto) {
        this.createEditModalAlertRisk.show(alertrisk.id);
    }

    deleteItem(alertrisk: AlertRiskDto) {
        this.message.confirm(`¿Esta seguro de eliminar el riesgo ${alertrisk.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._alertriskServiceProxy.delete(alertrisk.id).subscribe(() => {
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
        this._alertriskServiceProxy
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