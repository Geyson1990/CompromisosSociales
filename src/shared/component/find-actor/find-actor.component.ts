import { Component, EventEmitter, Injector, Input, Output, ViewChild } from '@angular/core';
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

    @Input() actorTypeModal: string;
    active: boolean = false;
    advancedFiltersAreShown: boolean = false;
    filterText: string;
    filterByDate: boolean;
    name:string;
    dateRange: moment.Moment[] = [moment().startOf('month'), moment().endOf('day')];
    
    constructor(_injector: Injector, private _actorServiceProxy: ActorServiceProxy) {
        super(_injector);
    }

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
        if (this.actorTypeModal="socialConflict")
            this.modalSave.emit(actor);
        else if (this.actorTypeModal="socialConflictAlert")
            this.modalSave.emit(actor);
        else if (this.actorTypeModal="socialConflictSensible")
            this.modalSave.emit(actor);
        this.close();
    }

     resetFilters() {
         this.filterText = '';
         this.getData();
     }
}
