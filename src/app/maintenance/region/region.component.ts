import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { RegionDto, RegionServiceProxy } from '@shared/service-proxies/application/region-proxie';
import { CreateEditRegionComponent } from './create-edit-region/create-edit-region.component';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'region.component.html',
    styleUrls: [
        'region.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class RegionComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditRegionModal', { static: true }) createEditModalRisk: CreateEditRegionComponent;

    filterText: string;

    constructor(_injector: Injector, private _regionServiceProxy: RegionServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalRisk.show();
    }

    editItem(region: RegionDto) {
        this.createEditModalRisk.show(region.id);
    }

    deleteItem(region: RegionDto) {
        this.message.confirm(`¿Esta seguro de eliminar el centro poblado ${region.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._regionServiceProxy.delete(region.id).subscribe(() => {
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
        this._regionServiceProxy
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