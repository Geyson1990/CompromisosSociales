import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ActorDto, ActorUserDto, ActorServiceProxy } from '@shared/service-proxies/application/actor-proxie';
import { CreateEditActorComponent } from './create-edit-actor/create-edit-actor.component';
import { AuditComponent } from '@shared/component/audit/audit.component';
import { Audit } from '@shared/service-proxies/application/utility-proxie';

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
    @ViewChild('auditModal', { static: true }) AuditModal: AuditComponent;

    filterText: string;
    item: ActorDto = new ActorDto();
    audit: Audit = new Audit;

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
    auditItem(item: ActorDto) {
        if (item.id > 0){
            this._actorServiceProxy.get(item.id).subscribe(result => {
                if (result.actor.creatorUser) { 
                    this.audit.creatorUser = result.actor.creatorUser.name;
                    this.audit.creationTime = result.actor.creationTime;
                }
                if (result.actor.editUser) { 
                    this.audit.editUser = result.actor.editUser.name;
                    this.audit.lastModificationTime = result.actor.lastModificationTime;
                }
                this.AuditModal.show(this.audit);
            });
        }
    }
}