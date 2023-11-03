import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ActorDto, ActorServiceProxy } from '@shared/service-proxies/application/actor-proxie';
import { CreateEditActorComponent } from './create-edit-actor/create-edit-actor.component';

@Component({
    templateUrl: 'actor.component.html',
    styleUrls: [
        'actor.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class ActorComponent extends AppComponentBase implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModal', { static: true }) createEditModal: CreateEditActorComponent;

    filterText: string;

    constructor(_injector: Injector, private _actorServiceProxy: ActorServiceProxy) {
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
        console.log('Valor de la datatable:', this.dataTable);
        
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

    createItem() {
        this.createEditModal.show();
    }

    editItem(actor: ActorDto) {
        this.createEditModal.show(actor.id);
    }

    deleteItem(actor: ActorDto) {
        this.message.confirm(`¿Esta seguro de eliminar el actor ${actor.fullName}?`, 'Aviso',
            (isConfirmed) => {
                if (isConfirmed)
                    this._actorServiceProxy
                        .delete(actor.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.error('Eliminado satisfactoriamente');
                        });
            }
        );
    }
}