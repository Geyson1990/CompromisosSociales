import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ActorSite, SocialConflictActorGetAllDto, SocialConflictServiceProxy } from '@shared/service-proxies/application/social-conflict-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { FileDownloadRequestComponent } from '@shared/component/file-download-request/file-download-request.component';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    templateUrl: 'actor-list.component.html',
    styleUrls: [
        'actor.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class ActorListComponent extends AppComponentBase implements OnInit, AfterViewInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @ViewChild('fileDownloadRequest', { static: true }) fileDownloadRequest: FileDownloadRequestComponent;
    
    nameSurnameFilter: string;
    documentFilter: string;
    advancedFiltersAreShown: boolean = false;

    sites = {
        socialConflict: ActorSite.SocialConflict,
        socialConflictAlert: ActorSite.SocialConflictAlert,
        socialConflictSensible: ActorSite.SocialConflictSensible
    }

    constructor(injector: Injector,
        private _socialConflictServiceProxy: SocialConflictServiceProxy,
        private _fileDownloadService: FileDownloadService) {
        super(injector);
    }

    ngOnInit(): void {

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

        this._socialConflictServiceProxy.getAllActors(
            this.nameSurnameFilter,
            this.documentFilter,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event)
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    exportMatrizToExcel() {
        this.fileDownloadRequest.show();
        this._socialConflictServiceProxy.getActorMatrizToExcel(
            this.nameSurnameFilter,
            this.documentFilter,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, undefined),
            this.primengTableHelper.getSkipCount(this.paginator, undefined)
        ).pipe(finalize(() => {
            this.primengTableHelper.hideLoadingIndicator();
            this.fileDownloadRequest.hide();
        })).subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
        });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    showSocialConflict(actor: SocialConflictActorGetAllDto) {
        this.router.navigate(['/app/application/edit-social-conflict', actor.conflictId], { queryParams: { returnUrl: 'actors' } });
    }

    showAlert(actor: SocialConflictActorGetAllDto) {
        this.router.navigate(['/app/application/edit-alert', actor.conflictId], { queryParams: { returnUrl: 'actors' } });
    }

    showSensible(actor: SocialConflictActorGetAllDto) {
        this.router.navigate(['/app/application/edit-sensible', actor.conflictId], { queryParams: { returnUrl: 'actors' } });
    }
}
