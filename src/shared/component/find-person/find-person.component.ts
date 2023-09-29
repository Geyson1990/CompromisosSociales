import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { UtilityPersonDto, UtilityServiceProxy } from '@shared/service-proxies/application/utility-proxie';
import { PersonType } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'find-person',
    templateUrl: 'find-person.component.html',
    styleUrls: [
        'find-person.component.css'
    ]
})
export class FindPersonComponent extends AppComponentBase {

    @ViewChild('findDataTable', { static: false }) dataTable: Table;
    @ViewChild('findPaginator', { static: false }) paginator: Paginator;

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<UtilityPersonDto> = new EventEmitter<UtilityPersonDto>();

    filterText: string;

    constructor(_injector: Injector, private _utilityServiceProxy: UtilityServiceProxy) {
        super(_injector);
    }

    ngOnInit(): void {

    }

    show(): void {
        this.filterText = undefined;
        this.modal.show();
    }

    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._utilityServiceProxy.getAllPersons(
            this.filterText,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event)
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    onShown(): void {

    }

    close(): void {
        this.modal.hide();
    }

    selectPerson(person: UtilityPersonDto) {
        this.modalSave.emit(person);
        this.close();
    }

    userTypeSelected(type: number): string {
        return type == PersonType.Coordinator ? 'Coordinador' :
            type == PersonType.Manager ? 'Gestor' :
                type == PersonType.Analyst ? 'Analista' : 'Administrativo';
    }
}
