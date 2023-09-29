import { AfterViewInit, Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SocialConflictDto, SocialConflictServiceProxy } from '@shared/service-proxies/application/social-conflict-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'compromise-information-social-conflict',
    templateUrl: 'compromise-information.component.html',
    styleUrls: [
        'compromise-information.component.css'
    ]
})

export class CompromiseInformationSocialConflictComponent extends AppComponentBase implements AfterViewInit {
    
    private _busy: boolean;
    
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    
    @Input() get busy(): boolean {
        return this._busy;
    }

    set busy(value: boolean) {
        this._busy = value;
    }

    @Input() socialConflict: SocialConflictDto;
    @Input() hasPermission: boolean;
    
    filterText: string;

    constructor(_injector: Injector, private _socialConflictServiceProxy: SocialConflictServiceProxy) {
        super(_injector);
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

        this._socialConflictServiceProxy.getAllCompromises(
            this.filterText,
            this.socialConflict?.id,
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

}