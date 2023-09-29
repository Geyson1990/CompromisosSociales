import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CoordinatorDto, CoordinatorServiceProxy, CoordinatorTerritorialUnitDto } from '@shared/service-proxies/application/coordinator-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'find-coordinator-territorial-unit',
    templateUrl: 'find-territorial-unit.component.html',
    styleUrls: [
        'find-territorial-unit.component.css'
    ]
})
export class FindCoordinatorTerritorialUnitComponent extends AppComponentBase {

    @ViewChild('findDataTable', { static: false }) dataTable: Table;
    @ViewChild('findPaginator', { static: false }) paginator: Paginator;

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active: boolean = false;
    textFilter: string;
    coordinator: CoordinatorDto;

    constructor(_injector: Injector, private _coordinatorServiceProxy: CoordinatorServiceProxy) {
        super(_injector);
    }

    show(coordinator: CoordinatorDto): void {
        this.coordinator = coordinator;
        this.textFilter = undefined;
        this.active = true;
        this.modal.show();
    }

    getData(dataTable: Table, paginator: Paginator, event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            if (!this.paginator)
                paginator.changePage(0);
            else
                this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();

        this._coordinatorServiceProxy
            .getAllTerritorialUnits(
                this.textFilter,
                this.coordinator.id,
                this.primengTableHelper.getSorting(dataTable),
                this.primengTableHelper.getMaxResultCount(paginator, event),
                this.primengTableHelper.getSkipCount(paginator, event))
            .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
            .subscribe((result) => {
                this.primengTableHelper.totalRecordsCount = result.totalCount;
                this.primengTableHelper.records = result.items;
                this.primengTableHelper.hideLoadingIndicator();
            });
    }

    onShown(): void {

    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    selectTerritorialUnit(item: CoordinatorTerritorialUnitDto) {
        this.showMainSpinner('Guardando información');
        this._coordinatorServiceProxy
            .addTerritorialUnit(this.coordinator.id, item.id)
            .pipe(finalize(() => this.hideMainSpinner()))
            .subscribe(() => {
                this.modalSave.emit();
                this.notify.success(`Se agregó correctamente la unidad territorial ${item.name} al coordinador ${this.coordinator.name}`);
                this.close();
            });
    }

}
