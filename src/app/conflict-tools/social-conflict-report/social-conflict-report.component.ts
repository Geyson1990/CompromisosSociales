import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ReportServiceProxy, ReportType } from '@shared/service-proxies/application/report-proxie';
import { SocialConflictTerritorialUnitDto } from '@shared/service-proxies/application/social-conflict-proxie';
import { ConflictVerificationState, UtilityServiceProxy } from '@shared/service-proxies/application/utility-proxie';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    templateUrl: 'social-conflict-report.component.html',
    styleUrls: [
        'social-conflict-report.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class SocialConflictReportComponent extends AppComponentBase implements OnInit {


    filterText: string;
    socialConflictCode: string;
    advancedFiltersAreShown: boolean = false;
    territorialUnit: number = -1;
    territorialUnits: SocialConflictTerritorialUnitDto[] = [];
    filterByDate: boolean;
    dateRange: Date[] = [moment().startOf('month').toDate(), moment().endOf('day').toDate()];
    verificationState: number = -1;
    nameReport: string = 'Reporte_de_participantes_en_reuniones';
    verificationStates = {
        denied: ConflictVerificationState.Denied,
        process: ConflictVerificationState.Process,
        accepted: ConflictVerificationState.Accepted
    }

    reports = {
        socialConflict: 0,
        helpMemory: 1
    }

    constructor(
        injector: Injector,
        private _utilityServiceProxy: UtilityServiceProxy,
        private _reportServiceProxy: ReportServiceProxy) {
        super(injector);
    }

    ngOnInit(): void {
        this._utilityServiceProxy
            .getTerritorialUnits()
            .pipe(finalize(() => this.hideMainSpinner()))
            .subscribe(response => this.territorialUnits = response.items);
    }
    
    completeDownload() {
        this.showMainSpinner('Generando reporte, por favor espere...');

            const fileName: string = `${this.nameReport}`;
            this._reportServiceProxy
                .createSocialConflictReport(this.filterText,
                    this.verificationState && this.verificationState > -1 ? this.verificationState : <any>undefined,
                    this.socialConflictCode ? this.socialConflictCode : <any>undefined,
                    this.territorialUnit ? this.territorialUnit : <any>undefined,
                    this.filterByDate && this.filterByDate ? moment(this.dateRange[0]).startOf('day') : <any>undefined,
                    this.filterByDate && this.filterByDate ? moment(this.dateRange[1]).endOf('day') : <any>undefined,
                    )
                .pipe(finalize(() => {
                    this.hideMainSpinner();
                })).subscribe((response) => {
                    const fileURL: any = URL.createObjectURL(response);
                    const a = document.createElement("a");
                    a.href = fileURL;
                    a.download = fileName;
                    a.click();
                });
        
    } 
}
