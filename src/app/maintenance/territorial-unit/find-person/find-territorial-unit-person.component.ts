import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TerritorialUnitDto, TerritorialUnitPersonDto, TerritorialUnitServiceProxy } from '@shared/service-proxies/application/territorial-unit-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'find-territorial-unit-person',
    templateUrl: 'find-territorial-unit-person.component.html',
    styleUrls: [
        'find-territorial-unit-person.component.css'
    ]
})
export class FindTerritorialUnitPersonComponent extends AppComponentBase {

    @ViewChild('findDataTable', { static: false }) dataTable: Table;
    @ViewChild('findPaginator', { static: false }) paginator: Paginator;

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<TerritorialUnitPersonDto> = new EventEmitter<TerritorialUnitPersonDto>();

    active: boolean = false;
    textFilter: string;
    territorialUnit: TerritorialUnitDto;

    constructor(_injector: Injector, private _territorialUnitServiceProxy: TerritorialUnitServiceProxy) {
        super(_injector);
    }

    show(territorialUnit: TerritorialUnitDto): void {
        this.territorialUnit = territorialUnit;
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

        this._territorialUnitServiceProxy
            .getAllPersons(
                this.textFilter,
                this.territorialUnit.id,
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

    selectDepartment(item: TerritorialUnitPersonDto) {
        this.modalSave.emit(item);
        this.close();
    }
}
