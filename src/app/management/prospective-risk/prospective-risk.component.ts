import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ProspectiveRiskDto, ProspectiveRiskServiceProxy } from '@shared/service-proxies/application/prospective-risk-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'prospective-risk.component.html',
    styleUrls: [
        'prospective-risk.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class ProspectiveRiskComponent extends AppComponentBase implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    filterText: string;
    busy: boolean = false;

    constructor(_injector: Injector, private _prospectiveRiskServiceProxy: ProspectiveRiskServiceProxy) {
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
        this._prospectiveRiskServiceProxy
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

    editItem(item: ProspectiveRiskDto) {
        this.router.navigate(['/app/management/prospective-risk', `${item.province.id}`]);
    }

    processItem() {
        this.busy = true;
        this._prospectiveRiskServiceProxy.process().pipe(finalize(() => this.busy = false)).subscribe(() => {
            this.message.success('Proceso terminado existosamente', 'Aviso');
        });
    }

}