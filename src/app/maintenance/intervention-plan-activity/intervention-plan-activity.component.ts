import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { InterventionPlanActivityDto, InterventionPlanActivityServiceProxy } from '@shared/service-proxies/application/intervention-plan-activity-proxie';
import { CreateEditInterventionPlanActivityComponent } from './create-edit-intervention-plan-activity/create-edit-intervention-plan-activity.component';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'intervention-plan-activity.component.html',
    styleUrls: [
        'intervention-plan-activity.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class InterventionPlanActivityComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalInterventionPlanActivity', { static: true }) createEditModalInterventionPlanActivity: CreateEditInterventionPlanActivityComponent;

    filterText: string;

    constructor(_injector: Injector, private _interventionPlanActivityServiceProxy: InterventionPlanActivityServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalInterventionPlanActivity.show();
    }

    editItem(interventionplanactivity: InterventionPlanActivityDto) {
        this.createEditModalInterventionPlanActivity.show(interventionplanactivity.id);
    }

    deleteItem(interventionplanactivity: InterventionPlanActivityDto) {
        this.message.confirm(`¿Esta seguro de eliminar el tipo de actividad ${interventionplanactivity.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._interventionPlanActivityServiceProxy.delete(interventionplanactivity.id).subscribe(() => {
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
        this._interventionPlanActivityServiceProxy
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