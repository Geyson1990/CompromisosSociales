import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { RiskDto, RiskServiceProxy } from '@shared/service-proxies/application/risk-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditRiskComponent } from './create-edit-risk/create-edit-risk.component';

@Component({
    templateUrl: 'risk.component.html',
    styleUrls: [
        'risk.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class RiskComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalRisk', { static: true }) createEditModalRisk: CreateEditRiskComponent;

    filterText: string;

    constructor(_injector: Injector, private _riskServiceProxy: RiskServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalRisk.show();
    }

    editItem(risk: RiskDto) {
        this.createEditModalRisk.show(risk.id);
    }

    deleteItem(risk: RiskDto) {
        this.message.confirm(`¿Esta seguro de eliminar el riesgo ${risk.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._riskServiceProxy.delete(risk.id).subscribe(() => {
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
        this._riskServiceProxy
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