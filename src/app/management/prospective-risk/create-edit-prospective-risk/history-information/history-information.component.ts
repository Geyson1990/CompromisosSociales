import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ProspectiveRiskDto, ProspectiveRiskHistoryDto, ProspectiveRiskServiceProxy } from '@shared/service-proxies/application/prospective-risk-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'history-information-prospective-risk',
    templateUrl: 'history-information.component.html'
})

export class ProspectiveRiskHistoryComponent extends AppComponentBase implements OnInit {

    private _item: ProspectiveRiskDto;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Input() get item(): ProspectiveRiskDto {
        return this._item;
    }

    set item(item: ProspectiveRiskDto) {
        this._item = item;
    }

    @Output() showHistory: EventEmitter<ProspectiveRiskHistoryDto> = new EventEmitter<ProspectiveRiskHistoryDto>();

    constructor(_injector: Injector, private _prospectiveRiskServiceProxy: ProspectiveRiskServiceProxy) {
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
        this._prospectiveRiskServiceProxy
            .getAllHistories(
                this.item?.id,
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

    showItem(item: ProspectiveRiskHistoryDto) {
        this.showHistory.emit(item);
    }

    deleteItem(item: ProspectiveRiskHistoryDto) {
        this.message.confirm(`¿Esta seguro de eliminar el registro seleccionado, el proceso es irreversible?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._prospectiveRiskServiceProxy.deleteHistory(item.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.error('Registro eliminado satisfactoriamente');
                });
        });
    }
}