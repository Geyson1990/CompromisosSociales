import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CrisisCommitteeJobDto, CrisisCommitteeJobServiceProxy } from '@shared/service-proxies/application/crisis-committee-job-proxie';
import { CreateEditCrisisCommitteeJobComponent } from './create-edit-crisis-committee-job/create-edit-crisis-committee-job.component';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'crisis-committee-job.component.html',
    styleUrls: [
        'crisis-committee-job.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class CrisisCommitteeJobComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalCrisisCommitteeJob', { static: true }) createEditModalCrisisCommitteeJob: CreateEditCrisisCommitteeJobComponent;

    filterText: string;

    constructor(_injector: Injector, private _crisisCommitteeJobServiceProxy: CrisisCommitteeJobServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalCrisisCommitteeJob.show();
    }

    editItem(crisiscommitteejob: CrisisCommitteeJobDto) {
        this.createEditModalCrisisCommitteeJob.show(crisiscommitteejob.id);
    }

    deleteItem(crisiscommitteejob: CrisisCommitteeJobDto) {
        this.message.confirm(`¿Esta seguro de eliminar el tipo de actividad ${crisiscommitteejob.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._crisisCommitteeJobServiceProxy.delete(crisiscommitteejob.id).subscribe(() => {
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
        this._crisisCommitteeJobServiceProxy
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