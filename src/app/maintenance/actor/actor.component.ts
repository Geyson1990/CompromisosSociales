import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ActorTypeDto, ActorTypeServiceProxy } from '@shared/service-proxies/application/actor-type-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditActorComponent } from './create-edit-actor/create-edit-actor';
@Component({
    templateUrl: 'actor.component.html',
    styleUrls: [
        'actor.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class ActorComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalActor', { static: true }) createEditModalActor: CreateEditActorComponent;

    filterText: string;

    constructor(_injector: Injector, private _actortypeServiceProxy: ActorTypeServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalActor.show();
    }

    editItem(actortype: ActorTypeDto) {
        this.createEditModalActor.show(actortype.id);
    }

    deleteItem(actortype: ActorTypeDto) {
        this.message.confirm(`¿Esta seguro de eliminar el tipo de gestión ${actortype.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._actortypeServiceProxy.delete(actortype.id).subscribe(() => {
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
        this._actortypeServiceProxy
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