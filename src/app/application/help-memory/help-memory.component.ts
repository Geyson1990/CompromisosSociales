import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FindConflictComponent } from '@shared/component/find-conflict/find-conflict.component';
import { FindDirectoryGovernmentComponent } from '@shared/component/find-directory-government/find-directory-government.component';
import { HelpMemoryDto, HelpMemoryServiceProxy } from '@shared/service-proxies/application/help-memory-proxie';
import { ConflictSite, UtilityConflictListGetAllDto, UtilityDirectoryGovernmentDto } from '@shared/service-proxies/application/utility-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'help-memory.component.html',
    styleUrls: [
        'help-memory.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class HelpMemoryComponent extends AppComponentBase implements AfterViewInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('findConflictModal', { static: true }) findConflictModal: FindConflictComponent;
    @ViewChild('findDirectoryGovernmentModal', { static: true }) findDirectoryGovernmentModal: FindDirectoryGovernmentComponent;

    advancedFiltersAreShown: boolean = false;

    helpMemoryRequest: string;
    conflict: UtilityConflictListGetAllDto;
    directoryGovernment: UtilityDirectoryGovernmentDto;

    get conflictTitle(): string {
        if (!this.conflict)
            return 'Buscar...';

        return this.conflict.code + " - " + this.conflict.name;
    }

    get directoryGovernmentTitle(): string {
        if (!this.directoryGovernment)
            return 'Buscar...';

        return this.directoryGovernment.name;
    }

    sites = {
        all: ConflictSite.All,
        socialConflict: ConflictSite.SocialConflict,
        socialConflictAlert: ConflictSite.SocialConflictAlert,
        socialConflictSensible: ConflictSite.SocialConflictSensible
    };

    constructor(injector: Injector, private _helpMemoryServiceProxy: HelpMemoryServiceProxy) {
        super(injector);
    }

    ngAfterViewInit(): void {
        this.primengTableHelper.adjustScroll(this.dataTable);
    }

    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._helpMemoryServiceProxy.getAll(
            this.advancedFiltersAreShown && this.conflict && this.conflict.site == this.sites.socialConflict ? this.conflict.id : <any>undefined,
            this.advancedFiltersAreShown && this.conflict && this.conflict.site == this.sites.socialConflictSensible ? this.conflict.id : <any>undefined,
            this.advancedFiltersAreShown && this.directoryGovernment ? this.directoryGovernment.id : <any>undefined,
            this.advancedFiltersAreShown ? this.helpMemoryRequest : <any>undefined,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event)
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    createHelpMemory(): void {
        this.router.navigate(['/app/application/create-help-memory']);
    }

    editHelpMemory(helpMemory: HelpMemoryDto): void {
        this.router.navigate(['/app/application/edit-help-memory', helpMemory.id]);
    }

    deleteHelpMemory(item: HelpMemoryDto): void {
        this.message.confirm(`¿Esta seguro de eliminar la ayuda memoria Nº ${item.code}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed) {
                this.showMainSpinner('Actualizando información, por favor espere...');
                this._helpMemoryServiceProxy
                    .delete(item.id)
                    .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 500)))
                    .subscribe(() => {
                        this.reloadPage();
                        this.notify.error('Eliminado satisfactoriamente');
                    });
            }
        });
    }

    showSelectConflict() {
        this.findConflictModal.show();
    }

    selectConflict(conflict: UtilityConflictListGetAllDto) {
        this.conflict = conflict;
    }

    removeConflict() {
        this.conflict = undefined;
    }

    showDirectoryGovernment() {
        this.findDirectoryGovernmentModal.show();
    }

    selectDirectoryGovernment(directoryGovernment: UtilityDirectoryGovernmentDto) {
        this.directoryGovernment = directoryGovernment;
    }

    removeDirectoryGovernment() {
        this.directoryGovernment = undefined;
    }

    resetFilters() {
        this.conflict = undefined;
        this.directoryGovernment = undefined;
        this.helpMemoryRequest = undefined;
    }
}
