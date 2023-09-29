import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ProjectRiskDto, ProjectRiskHistoryDto, ProjectRiskServiceProxy } from '@shared/service-proxies/application/project-risk-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'history-information-project-risk',
    templateUrl: 'history-information.component.html',
    styleUrls: [
        'history-information.component.css'
    ]
})
export class ProjectRiskHistoryComponent extends AppComponentBase implements OnInit {

    private _projectRisk: ProjectRiskDto;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Input() get projectRisk(): ProjectRiskDto {
        return this._projectRisk;
    }

    set projectRisk(item: ProjectRiskDto) {
        this._projectRisk = item;
    }

    @Output() showHistory: EventEmitter<ProjectRiskHistoryDto> = new EventEmitter<ProjectRiskHistoryDto>();

    filterText: string;

    constructor(_injector: Injector, private _projectRiskServiceProxy: ProjectRiskServiceProxy) {
        super(_injector);
    }

    ngOnInit() {

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
        this._projectRiskServiceProxy
            .getAllHistories(
                this.filterText,
                this.projectRisk?.id,
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

    showItem(item: ProjectRiskHistoryDto) {
        this.showHistory.emit(item);
    }

    deleteItem(item: ProjectRiskHistoryDto) {
        this.message.confirm(`¿Esta seguro de eliminar el registro seleccionado, el proceso es irreversible?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._projectRiskServiceProxy.deleteHistory(item.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.error('Registro eliminado satisfactoriamente');
                });
        });
    }
}