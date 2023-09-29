import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ResponsibleActorDto, ResponsibleActorServiceProxy, ResponsibleActorType, ResponsibleSubActorDto } from '@shared/service-proxies/application/responsible-actor-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditResponsibleActorComponent } from './create-edit-responsible-actor/create-edit-responsible-actor.component';
import { CreateEditSubResponsibleActorComponent } from './create-edit-responsible-subactor/create-edit-responsible-subactor.component';

@Component({
    templateUrl: 'responsible-actor.component.html',
    styleUrls: [
        'responsible-actor.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class ResponsibleActorComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalResponsableActor', { static: true }) createEditResponsableActor: CreateEditResponsibleActorComponent;
    @ViewChild('createEditModalSubResponsableActor', { static: true }) createEditModalSubResponsableActor: CreateEditSubResponsibleActorComponent;

    filterText: string;
    
    reponsibleActorTypes = {
        none: ResponsibleActorType.None,
        national: ResponsibleActorType.National,
        regional: ResponsibleActorType.Regional,
        local: ResponsibleActorType.Local,
        other: ResponsibleActorType.Other
    }
    
    constructor(_injector: Injector, private _responsibleActorServiceProxy: ResponsibleActorServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditResponsableActor.show();
    }

    editItem(responsibleActor: ResponsibleActorDto) {
        this.createEditResponsableActor.show(responsibleActor.id);
    }

    deleteItem(responsibleActor: ResponsibleActorDto) {
        this.message.confirm(`¿Esta seguro de eliminar el registro ${responsibleActor.name}?`, 'Aviso',
            (isConfirmed) => {
                if (isConfirmed)
                    this._responsibleActorServiceProxy
                        .delete(responsibleActor.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.error('Eliminado satisfactoriamente');
                        });
            }
        );
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
        this._responsibleActorServiceProxy
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


    createSubResposibleActor(responsibleActor: ResponsibleActorDto) {
        this.createEditModalSubResponsableActor.show(undefined, responsibleActor);
    }

    deleteSubResposibleActor(responsibleSubActor: ResponsibleSubActorDto) {
        this.message.confirm(`¿Esta seguro de eliminar el responsable específicos ${responsibleSubActor.name}?`, 'Aviso',
            (isConfirmed) => {
                if (isConfirmed)
                    this._responsibleActorServiceProxy
                        .deleteResponsibleSubActor(responsibleSubActor.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.error('Eliminado satisfactoriamente');
                        });
            }
        );
    }

    editSubResposibleActor(responsibleSubActor: ResponsibleSubActorDto, responsibleActor: ResponsibleActorDto) {
        this.createEditModalSubResponsableActor.show(responsibleSubActor.id, responsibleActor);
    }
}