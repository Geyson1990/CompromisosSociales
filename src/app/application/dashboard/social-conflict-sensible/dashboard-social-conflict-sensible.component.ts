import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PortalServiceProxy, PortalSocialConflictSensibleGeographycTypeDto, PortalSocialConflictSensibleLocationDto, PortalSocialConflictSensibleRiskDto } from '@shared/service-proxies/application/portal-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';
import { Subscription } from 'rxjs';
import { DashboardComponentBase } from '../dashboard-shared/dashboard.component';
import { SharedWindow } from '../dashboard-shared/dashboard.service';

@Component({
    templateUrl: 'dashboard-social-conflict-sensible.component.html',
    styleUrls: [
        '../dashboard.style.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class DashboardSocialConflictSensibleComponent extends DashboardComponentBase implements OnInit {

    @ViewChild('riskPaginator', { static: true }) riskPaginator: Paginator;
    @ViewChild('locationPaginator', { static: true }) locationPaginator: Paginator;
    @ViewChild('geographycTypePaginator', { static: true }) geographycTypePaginator: Paginator;

    risks: PortalSocialConflictSensibleRiskDto[] = [];
    geographycTypes: PortalSocialConflictSensibleGeographycTypeDto[] = [];
    locations: PortalSocialConflictSensibleLocationDto[] = [];

    isBusyChart: boolean = true;
    isLoading: boolean = true;


    summaries = {
        risks: 0,
        locations: 0,
        geographycTypes: 0
    }

    paginations = {
        risks: {
            maxResultCount: 10,
            skipCount: 0
        },
        locations: {
            maxResultCount: 10,
            skipCount: 0
        },
        geographycTypes: {
            maxResultCount: 10,
            skipCount: 0
        }
    }

    charts = {
        risks: {
            type: this.chartTypes.pie,
            pie: undefined,
            bar: undefined
        },
        locations: {
            type: this.chartTypes.pie,
            pie: undefined,
            bar: undefined
        },
        geographycTypes: {
            type: this.chartTypes.pie,
            pie: undefined,
            bar: undefined
        }
    }

    private subscription: Subscription;

    constructor(_injector: Injector, private _portalServiceProxy: PortalServiceProxy) {
        super(_injector);
    }

    ngOnInit(): void {
        this.subscription = this.shared.refresh.subscribe(response => {
            if (response == SharedWindow.All || response == SharedWindow.Social_Conflict_Sensible)
                this.loadInformation();
        })
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    getRisks(event?: LazyLoadEvent) {
        this.paginations.risks.maxResultCount = this.primengTableHelper.getMaxResultCount(this.riskPaginator, event);
        this.paginations.risks.skipCount = this.primengTableHelper.getSkipCount(this.riskPaginator, event);
        this.formatRisks(this.paginations.risks.skipCount, this.paginations.risks.maxResultCount);
    }

    getLocations(event?: LazyLoadEvent) {
        this.paginations.locations.maxResultCount = this.primengTableHelper.getMaxResultCount(this.locationPaginator, event);
        this.paginations.locations.skipCount = this.primengTableHelper.getSkipCount(this.locationPaginator, event);
        this.formatLocations(this.paginations.locations.skipCount, this.paginations.locations.maxResultCount);
    }

    getGeographycTypes(event?: LazyLoadEvent) {
        this.paginations.geographycTypes.maxResultCount = this.primengTableHelper.getMaxResultCount(this.geographycTypePaginator, event);
        this.paginations.geographycTypes.skipCount = this.primengTableHelper.getSkipCount(this.geographycTypePaginator, event);
        this.formatRisks(this.paginations.geographycTypes.skipCount, this.paginations.geographycTypes.maxResultCount);
    }

    private loadInformation() {
        this._portalServiceProxy
            .getAllSocialConflictSensibles(
                this.shared.filters.territorialUnitId == -1 ? undefined : this.shared.filters.territorialUnitId,
                this.shared.filters.departmentId == -1 ? undefined : this.shared.filters.departmentId,
                this.shared.filters.provinceId == -1 ? undefined : this.shared.filters.provinceId,
                this.shared.filters.districtId == -1 ? undefined : this.shared.filters.districtId,
                this.shared.filters.riskId == -1 ? undefined : this.shared.filters.riskId,
                this.shared.filters.geographicId == -1 ? undefined : this.shared.filters.geographicId)
            .subscribe(response => {
                this.risks = response.risks;
                this.geographycTypes = response.geographycTypes;
                this.locations = response.locations;

                this.loadRiskInformation();
                this.loadLocationInformation();
                this.loadGeographycTypeInformation();

                this.isBusyChart = false;
                this.isLoading = false;
            });
    }

    private loadRiskInformation() {
        this.summaries.risks = this.risks.reduce((l, c) => c.count + l, 0);

        if (this.risks.length > this.primengTableHelper.defaultRecordCountPerPie) {
            this.charts.risks.type = this.chartTypes.bar;
            this.charts.risks.bar = {
                labels: this.risks.map(p => p.name),
                datasets: [
                    {
                        label: 'Niveles de riesgo',
                        tooltipLabels: this.risks.map(p => p.count + '; ' + this.formatNumber(this.roundNumber((p.count / this.summaries.risks) * 100, 2), 0) + '% '),
                        data: this.risks.map(p => p.count),
                        backgroundColor: this.backgroundColors(),
                        hoverBackgroundColor: this.hoverBackgroundColor()
                    }
                ]
            };
        } else {
            this.charts.risks.type = this.chartTypes.pie;
            this.charts.risks.pie = {
                totals: this.summaries.risks,
                labels: this.risks.map(p => p.name),
                tooltipLabels: this.risks.map(p => this.formatNumber(this.roundNumber((p.count / this.summaries.risks) * 100, 2), 0) + '% '),
                outLabels: this.risks.map(p => p.count + '; ' + this.formatNumber(this.roundNumber((p.count / this.summaries.risks) * 100, 2), 0) + '% '),
                datasets: [
                    {
                        data: this.risks.map(p => p.count),
                        backgroundColor: this.backgroundColors(),
                        hoverBackgroundColor: this.hoverBackgroundColor()
                    }
                ]
            };
        }

        this.formatRisks(this.paginations.risks.skipCount, this.paginations.risks.maxResultCount);
    }

    private loadLocationInformation() {
        this.summaries.locations = this.locations.reduce((l, c) => c.count + l, 0);

        if (this.locations.length > this.primengTableHelper.defaultRecordCountPerPie) {
            this.charts.locations.type = this.chartTypes.bar;
            this.charts.locations.bar = {
                labels: this.locations.map(p => p.name),
                datasets: [
                    {
                        label: 'Atención a los sectores',
                        tooltipLabels: this.locations.map(p => p.count + '; ' + this.formatNumber(this.roundNumber((p.count / this.summaries.locations) * 100, 2), 0) + '% '),
                        data: this.locations.map(p => p.count),
                        backgroundColor: this.backgroundColors(),
                        hoverBackgroundColor: this.hoverBackgroundColor()
                    }
                ]
            };
        } else {
            this.charts.locations.type = this.chartTypes.pie;
            this.charts.locations.pie = {
                totals: this.summaries.locations,
                labels: this.locations.map(p => p.name),
                tooltipLabels: this.locations.map(p => this.formatNumber(this.roundNumber((p.count / this.summaries.locations) * 100, 2), 0) + '% '),
                outLabels: this.locations.map(p => p.count + '; ' + this.formatNumber(this.roundNumber((p.count / this.summaries.locations) * 100, 2), 0) + '% '),
                datasets: [
                    {
                        data: this.locations.map(p => p.count),
                        backgroundColor: this.backgroundColors(),
                        hoverBackgroundColor: this.hoverBackgroundColor()
                    }
                ]
            };
        }

        this.formatLocations(this.paginations.locations.skipCount, this.paginations.locations.maxResultCount);
    }

    private loadGeographycTypeInformation() {
        this.summaries.geographycTypes = this.geographycTypes.reduce((l, c) => c.count + l, 0);

        if (this.geographycTypes.length > this.primengTableHelper.defaultRecordCountPerPie) {
            this.charts.geographycTypes.type = this.chartTypes.bar;
            this.charts.geographycTypes.bar = {
                labels: this.geographycTypes.map(p => p.name),
                datasets: [
                    {
                        label: 'Atención a los sectores',
                        tooltipLabels: this.geographycTypes.map(p => p.count + '; ' + this.formatNumber(this.roundNumber((p.count / this.summaries.geographycTypes) * 100, 2), 0) + '% '),
                        data: this.geographycTypes.map(p => p.count),
                        backgroundColor: this.backgroundColors(),
                        hoverBackgroundColor: this.hoverBackgroundColor()
                    }
                ]
            };
        } else {
            this.charts.geographycTypes.type = this.chartTypes.pie;
            this.charts.geographycTypes.pie = {
                totals: this.summaries.geographycTypes,
                labels: this.geographycTypes.map(p => p.name),
                tooltipLabels: this.geographycTypes.map(p => this.formatNumber(this.roundNumber((p.count / this.summaries.geographycTypes) * 100, 2), 0) + '% '),
                outLabels: this.geographycTypes.map(p => p.count + '; ' +  this.formatNumber(this.roundNumber((p.count / this.summaries.geographycTypes) * 100, 2), 0) + '% '),
                datasets: [
                    {
                        data: this.geographycTypes.map(p => p.count),
                        backgroundColor: this.backgroundColors(),
                        hoverBackgroundColor: this.hoverBackgroundColor()
                    }
                ]
            };
        }

        this.formatGeographycTypes(this.paginations.geographycTypes.skipCount, this.paginations.geographycTypes.maxResultCount);
    }

    private formatRisks(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;
        for (let item of this.risks) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }

    private formatLocations(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;
        for (let item of this.locations) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }

    private formatGeographycTypes(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;
        for (let item of this.geographycTypes) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}