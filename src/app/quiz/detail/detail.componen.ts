import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { QuizCompleteType, QuizDetailDto, QuizDetailServiceProxy } from '@shared/service-proxies/application/quiz-detail-proxie';
import { UtilityQuizStateDto, UtilityServiceProxy } from '@shared/service-proxies/application/utility-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { FileDownloadRequestComponent } from '@shared/component/file-download-request/file-download-request.component';

@Component({
    templateUrl: 'detail.componen.html',
    styleUrls: [
        'detail.componen.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class QuizDetailComponent extends AppComponentBase implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @ViewChild('fileDownloadRequest', { static: true }) fileDownloadRequest: FileDownloadRequestComponent;
    
    stateId: number = -1;
    completeType: number = -1;
    completeTypes = {
        administrative: QuizCompleteType.ADMINITRATIVE,
        public: QuizCompleteType.PUBLIC
    }
    states: UtilityQuizStateDto[] = [];
    advancedFiltersAreShown: boolean = false;
    filterByDate: boolean;
    dateRange: Date[] = [moment().startOf('month').toDate(), moment().endOf('day').toDate()];

    constructor(_injector: Injector,
        private _quizDetailServiceProxy: QuizDetailServiceProxy,
        private _utilityServiceProxy: UtilityServiceProxy,
        private _fileDownloadService: FileDownloadService) {
        super(_injector);
    }

    ngOnInit(): void {
        this._utilityServiceProxy.getAllQuizFilters().subscribe(response => {
            this.states = response.quizStates;
        });
    }

    editItem(quizDetail: QuizDetailDto) {
        this.router.navigate(['/app/quiz/edit-platform', quizDetail.id]);
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
        this._quizDetailServiceProxy
            .getAll(
                this.advancedFiltersAreShown ? this.stateId : undefined,
                this.advancedFiltersAreShown && this.completeType != -1 ? this.completeType : undefined,
                this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[0]).startOf('day') : <any>undefined,
                this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[1]).endOf('day') : <any>undefined,
                this.advancedFiltersAreShown ? this.filterByDate : <any>undefined,
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

    exportAdministrativeMatrizToExcel() {
        this.fileDownloadRequest.show();
        this._quizDetailServiceProxy
            .exportAdministrativeMatriz(
                this.advancedFiltersAreShown ? this.stateId : undefined,
                this.advancedFiltersAreShown && this.completeType != -1 ? this.completeType : undefined,
                this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[0]).startOf('day') : <any>undefined,
                this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[1]).endOf('day') : <any>undefined,
                this.advancedFiltersAreShown ? this.filterByDate : <any>undefined,
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

    exportPublicMatrizToExcel() {
        this.fileDownloadRequest.show();
        this._quizDetailServiceProxy
            .exportPublicMatriz(
                this.advancedFiltersAreShown ? this.stateId : undefined,
                this.advancedFiltersAreShown && this.completeType != -1 ? this.completeType : undefined,
                this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[0]).startOf('day') : <any>undefined,
                this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[1]).endOf('day') : <any>undefined,
                this.advancedFiltersAreShown ? this.filterByDate : <any>undefined,
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
}