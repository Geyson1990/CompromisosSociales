import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { InterventionPlanOptionDto, InterventionPlanOptionServiceProxy } from '@shared/service-proxies/application/intervention-plan-option';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditInterventionPlanOptionComponent } from './create-edit-intervention-plan-option/create-edit-intervention-plan-option.component';

@Component({
    templateUrl: 'actor-movement.component.html',
    styleUrls: [
        'actor-movement.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class InterventionPlanOptionComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalInterventionPlanOption', { static: true }) createEditModalInterventionPlanOption: CreateEditInterventionPlanOptionComponent;

    filterText: string;

    constructor(_injector: Injector, private _interventionplanoptionServiceProxy: InterventionPlanOptionServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalInterventionPlanOption.show();
    }

    editItem(interventionplanoption: InterventionPlanOptionDto) {
        this.createEditModalInterventionPlanOption.show(interventionplanoption.id);
    }

    deleteItem(interventionplanoption: InterventionPlanOptionDto) {
        this.message.confirm(`¿Esta seguro de eliminar la opción de intervención ${interventionplanoption.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._interventionplanoptionServiceProxy.delete(interventionplanoption.id).subscribe(() => {
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
        this._interventionplanoptionServiceProxy
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