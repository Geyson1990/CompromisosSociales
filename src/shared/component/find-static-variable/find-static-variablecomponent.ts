import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ProjectStageServiceProxy, ProjectStageStaticVariableDto } from '@shared/service-proxies/application/project-stage-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'find-static-variable',
    templateUrl: 'find-static-variable.component.html',
    styleUrls: [
        'find-static-variable.component.css'
    ]
})
export class FindStaticVariableModalComponent extends AppComponentBase {

    @ViewChild('findDataTable', { static: false }) dataTable: Table;
    @ViewChild('findPaginator', { static: false }) paginator: Paginator;
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<ProjectStageStaticVariableDto> = new EventEmitter<ProjectStageStaticVariableDto>();

    active: boolean = false;
    filterText: string = '';

    constructor(_injector: Injector, private _projectStageServiceProxy: ProjectStageServiceProxy) {
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
        this._projectStageServiceProxy
            .getAllStaticVariables(
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

    onShown(): void {

    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    selectItem(item: ProjectStageStaticVariableDto) {
        this.modalSave.emit(item);
        this.close();
    }

}
