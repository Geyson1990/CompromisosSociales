import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DinamicVariableType } from '@shared/service-proxies/application/dinamic-variable-proxie';
import { StaticVariableCuantitativeDto, StaticVariableFamilyType, StaticVariableServiceProxy } from '@shared/service-proxies/application/static-variable-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'find-dinamic-variable',
    templateUrl: 'find-dinamic-variable.component.html',
    styleUrls: [
        'find-dinamic-variable.component.css'
    ]
})
export class FindDinamicVariableModalComponent extends AppComponentBase {

    @ViewChild('findDataTable', { static: false }) dataTable: Table;
    @ViewChild('findPaginator', { static: false }) paginator: Paginator;
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<StaticVariableCuantitativeDto> = new EventEmitter<StaticVariableCuantitativeDto>();

    active: boolean = false;
    filterText: string = '';

    constructor(_injector: Injector, private route: ActivatedRoute, private _staticVariableServiceProxy: StaticVariableServiceProxy) {
        super(_injector);
    }

    show(): void {
        this.filterText = '';
        this.active = true;
        this.modal.show();
    }

    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._staticVariableServiceProxy
            .getAllDinamicVariables(
                this.filterText,
                this.route.snapshot.data.type == StaticVariableFamilyType.ProjectRisk ? DinamicVariableType.ProjectRisk : DinamicVariableType.ProspectiveRisk,
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

    onShown(): void {

    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    selectItem(item: StaticVariableCuantitativeDto) {
        this.modalSave.emit(item);
        this.close();
    }

}
