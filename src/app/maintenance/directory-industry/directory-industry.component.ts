import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DirectoryIndustryDto, DirectoryIndustryServiceProxy } from '@shared/service-proxies/application/directory-industry-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CreateEditDirectoryIndustryComponent } from './create-edit-directory-industry/create-edit-directory-industry.component';

@Component({
    templateUrl: 'directory-industry.component.html',
    styleUrls: [
        'directory-industry.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class DirectoryIndustryComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalDirectoryIndustry', { static: true }) createEditModalDirectoryIndustry: CreateEditDirectoryIndustryComponent;
    
    filterText: string;

    constructor(_injector: Injector, private _directoryindustryServiceProxy: DirectoryIndustryServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalDirectoryIndustry.show();
    }

    editItem(directoryindustry: DirectoryIndustryDto) {
        this.createEditModalDirectoryIndustry.show(directoryindustry.id);
    }

    deleteItem(directoryindustry: DirectoryIndustryDto) {
        this.message.confirm(`¿Esta seguro de eliminar la entidad ${directoryindustry.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._directoryindustryServiceProxy.delete(directoryindustry.id).subscribe(() => {
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
        this._directoryindustryServiceProxy
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