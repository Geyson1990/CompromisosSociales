import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CoordinatorDto, CoordinatorServiceProxy, CoordinatorTerritorialUnitRelationDto } from '@shared/service-proxies/application/coordinator-proxie';
import { CreateEditCoordinatorComponent } from './create-edit-coordinator/create-edit-coordinator.component';
import { FindCoordinatorTerritorialUnitComponent } from './find-territorial-unit/find-territorial-unit.component';

@Component({
    templateUrl: 'coordinator.component.html',
    styleUrls: [
        'coordinator.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class CoordinatorComponent extends AppComponentBase implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModal', { static: true }) createEditModal: CreateEditCoordinatorComponent;
    @ViewChild('findCoordinatorTerritorialUnitModal', { static: true }) findCoordinatorTerritorialUnit: FindCoordinatorTerritorialUnitComponent;

    filterText: string;

    constructor(_injector: Injector, private _coordinatorServiceProxy: CoordinatorServiceProxy) {
        super(_injector);
    }

    ngOnInit() { }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._coordinatorServiceProxy
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

    createItem() {
        this.createEditModal.show();
    }

    editItem(coordinator: CoordinatorDto) {
        this.createEditModal.show(coordinator.id);
    }

    deleteItem(coordinator: CoordinatorDto) {
        this.message.confirm(`¿Esta seguro de eliminar el coordinador ${coordinator.name}?`, 'Aviso',
            (isConfirmed) => {
                if (isConfirmed)
                    this._coordinatorServiceProxy
                        .delete(coordinator.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.error('Eliminado satisfactoriamente');
                        });
            }
        );
    }

    deleteTerritorialUnit(coordinator: CoordinatorDto, territorialUnit: CoordinatorTerritorialUnitRelationDto) {
        this.message.confirm(`¿Esta seguro de eliminar la unidad territorial ${territorialUnit.territorialUnit.name} del coordinador ${coordinator.name}?`, 'Aviso',
            (isConfirmed) => {
                if (isConfirmed)
                    this._coordinatorServiceProxy
                        .deleteTerritorialUnit(territorialUnit.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.error('Eliminado satisfactoriamente');
                        });
            }
        );
    }

    addTerritorialUnit(coordinator: CoordinatorDto) {
        this.findCoordinatorTerritorialUnit.show(coordinator);
    }
}