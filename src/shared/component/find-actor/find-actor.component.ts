import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ActorServiceProxy, ActorDto} from '@shared/service-proxies/application/actor-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    selector: 'find-actor',
    templateUrl: 'find-actor.component.html',
    styleUrls: [
        'find-actor.component.css'
    ]
})
export class FindActorComponent extends AppComponentBase {

    @ViewChild('findDataTable', { static: false }) dataTable: Table;
    @ViewChild('findPaginator', { static: false }) paginator: Paginator;
    @ViewChild('findActorModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<ActorDto> = new EventEmitter<ActorDto>();
    @Output() modalSaveAlert: EventEmitter<ActorDto> = new EventEmitter<ActorDto>();
    active: boolean = false;
    advancedFiltersAreShown: boolean = false;
    filterText: string;
    filterByDate: boolean;
    name:string;
    dateRange: moment.Moment[] = [moment().startOf('month'), moment().endOf('day')];

    constructor(_injector: Injector, private _actorServiceProxy: ActorServiceProxy) {
        super(_injector);
    }

    // show(skippedDirectoryGovernmentsIds?: number[]): void {

    //     this.showMainSpinner('Cargando información, por favor espere...');
    //     this.skippedDirectoryGovernmentsIds = skippedDirectoryGovernmentsIds;
    //     this._actorServiceProxy
    //         .getAllDirectoryGovermentFilters()
    //         .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1000)))
    //         .subscribe(response => {
    //             this.sectors = response.sectors;
    //             this.active = true;
    //             this.modal.show();
    //         });
    // }
    show(): void {
        this.filterText = "";
        this.modal.show();
    }    

    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();
        this._actorServiceProxy
        .getAll(
            this.filterText,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event))
        .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
        .subscribe((result) => {
            this.primengTableHelper.records = result.items;
            console.log('resultados',result.items)
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

    selectActor(actor: ActorDto) {
        this.modalSave.emit(actor);
        this.close();
    }

    // onActorTypeChange(event: any) {
    //     const departmentId: number = +event.target.value;
    //     const index: number = this.selectedDepartments.findIndex(p => p.id == departmentId);
    //     this.provinceId = -1;
    //     this.districtId = -1;
    //     this.selectedProvinces = [];
    //     this.selectedDistricts = [];
    // }

     resetFilters() {
         this.filterText = '';
         this.getData();
     }
}
