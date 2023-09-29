import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { InterventionPlanRoleDto, InterventionPlanRoleServiceProxy } from '@shared/service-proxies/application/intervention-plan-role-proxie';
import { CreateEditInterventionPlanRoleComponent } from './create-edit-intervention-plan-role/create-edit-intervention-plan-role.component';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'intervention-plan-role.component.html',
    styleUrls: [
        'intervention-plan-role.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class InterventionPlanRoleComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalInterventionPlanRole', { static: true }) createEditModalInterventionPlanRole: CreateEditInterventionPlanRoleComponent;

    filterText: string;

    constructor(_injector: Injector, private _interventionPlanRoleServiceProxy: InterventionPlanRoleServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalInterventionPlanRole.show();
    }

    editItem(interventionplanrole: InterventionPlanRoleDto) {
        this.createEditModalInterventionPlanRole.show(interventionplanrole.id);
    }

    deleteItem(interventionplanrole: InterventionPlanRoleDto) {
        this.message.confirm(`¿Esta seguro de eliminar el rol de equipo ${interventionplanrole.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._interventionPlanRoleServiceProxy.delete(interventionplanrole.id).subscribe(() => {
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
        this._interventionPlanRoleServiceProxy
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