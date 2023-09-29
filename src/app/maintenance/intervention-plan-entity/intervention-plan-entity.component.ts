import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { InterventionPlanEntityDto, InterventionPlanEntityServiceProxy } from '@shared/service-proxies/application/intervention-plan-entity-proxie';
import { CreateEditInterventionPlanEntityComponent } from './create-edit-intervention-plan-entity/create-edit-intervention-plan-entity.component';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { InterventionPlanEntityType } from '@shared/service-proxies/application/utility-proxie';

@Component({
    templateUrl: 'intervention-plan-entity.component.html',
    styleUrls: [
        'intervention-plan-entity.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class InterventionPlanEntityComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalInterventionPlanEntity', { static: true }) createEditModalInterventionPlanEntity: CreateEditInterventionPlanEntityComponent;

    filterText: string;

    types = {
        sector: InterventionPlanEntityType.Sector,
        responsible: InterventionPlanEntityType.Responsible,
        other: InterventionPlanEntityType.Other
    }

    constructor(_injector: Injector, private _interventionPlanEntityServiceProxy: InterventionPlanEntityServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalInterventionPlanEntity.show();
    }

    editItem(interventionplanentity: InterventionPlanEntityDto) {
        this.createEditModalInterventionPlanEntity.show(interventionplanentity.id);
    }

    deleteItem(interventionplanentity: InterventionPlanEntityDto) {
        this.message.confirm(`¿Esta seguro de eliminar el tipo de entidad ${interventionplanentity.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._interventionPlanEntityServiceProxy.delete(interventionplanentity.id).subscribe(() => {
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
        this._interventionPlanEntityServiceProxy
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