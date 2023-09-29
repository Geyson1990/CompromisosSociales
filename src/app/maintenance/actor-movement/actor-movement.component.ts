import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ActorMovementDto, ActorMovementServiceProxy } from '@shared/service-proxies/application/actor-movement-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditActorMovementComponent } from './create-edit-actor-movement/create-edit-actor-movement.component';

@Component({
    templateUrl: 'actor-movement.component.html',
    styleUrls: [
        'actor-movement.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class ActorMovementComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalActorMovement', { static: true }) createEditModalActorMovement: CreateEditActorMovementComponent;

    filterText: string;

    constructor(_injector: Injector, private _actormovementServiceProxy: ActorMovementServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalActorMovement.show();
    }

    editItem(actormovement: ActorMovementDto) {
        this.createEditModalActorMovement.show(actormovement.id);
    }

    deleteItem(actormovement: ActorMovementDto) {
        this.message.confirm(`¿Esta seguro de eliminar el tipo de gestión ${actormovement.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._actormovementServiceProxy.delete(actormovement.id).subscribe(() => {
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
        this._actormovementServiceProxy
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