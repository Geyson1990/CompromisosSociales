import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ComplianceServiceProxy, PortalPipMefDto, ReportResponsibleStatusDto, ReportSummaryDto } from '@shared/service-proxies/application/compliance-proxie';
import { UtilityDepartmentDataDto, UtilityDistrictDataDto, UtilityProvinceDataDto, UtilityServiceProxy, UtilitySocialConflictDto, UtilityTerritorialUnitDto } from '@shared/service-proxies/application/utility-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';
import { finalize } from 'rxjs/operators';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ChartOutsideLabels from 'chartjs-plugin-piechart-outlabels';

@Component({
    selector: 'compliance-state',
    templateUrl: 'compliance-state.component.html',
    styleUrls: [
        'compliance-state.component.css'
    ]
})
export class ComplianceStateComponent extends AppComponentBase implements OnInit {

    @ViewChild('paginator', { static: true }) paginator: Paginator;

    busy: boolean = true;
    busyPip: boolean = true;

    dataPieOne: any;
    dataPieTwo: any;

    dataPieTwoLabels: string[] = [];

    barDetails: { name: string, percentage: number, summary: string, color: string }[];

    summaryDetails: { total: number, proyectQuantity: number, numberText: string } = {
        total: undefined,
        proyectQuantity: undefined,
        numberText: undefined
    }

    conflictId: number = -1;
    selectedTerritorialUnit: string = undefined;
    territorialUnitId: number = -1;
    departmentId: number = -1;
    provinceId: number = -1;
    districtId: number = -1;

    socialConflicst: UtilitySocialConflictDto[];
    departments: UtilityDepartmentDataDto[];
    territorialUnits: UtilityTerritorialUnitDto[];
    selectedConflicts: UtilitySocialConflictDto[];
    selectedDepartments: UtilityDepartmentDataDto[];
    selectedProvinces: UtilityProvinceDataDto[];
    selectedDistricts: UtilityDistrictDataDto[];
    summary: ReportSummaryDto[];
    summaryTotals = {
        activityTotal: 0,
        pipTotal: 0,
        total: 0
    }
    responsibleStatus: ReportResponsibleStatusDto[] = [];
    responsibleStatusTotals = {
        activityTotal: 0,
        activityCompliments: 0,
        activityAdd: 0,
        pipTotal: 0,
        pipCompliments: 0,
        pipAdd: 0
    }

    optionsPieDefault: any = {
        legend: {
            display: true,
            position: 'bottom',
            align: 'center',
            labels: {
                boxWidth: 15
            },
            onClick: (event: any, legendItem: any, legend: any) => {
            }
        },
        tooltips: {
            callbacks: {
                label: (tooltipItem: any, data: any) => {
                    return `${data.labels[tooltipItem.index]}`;
                }
            }
        },
        layout: {
            padding: {
                left: 20,
                right: 20,
                bottom: 20,
                top: 20,
            },
        },
        plugins: {
            datalabels: {
                display: false
            },
            outlabels: {
                display: true,
                text: (context: any) => {
                    return `${context.chart.data.outLabels[context.dataIndex]}`;
                },
                color: 'white',
                stretch: 12,
                font: {
                    resizable: true,
                    minSize: 12,
                    maxSize: 12
                }
            }
        }
    };

    stackedData: any;
    dataBarOne: any;

    optionsBarChart: any = {
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: {
            display: false
        },
        plugins: {
            datalabels: {
                color: '#fff',
                font: {
                    weight: 'bold',
                    size: 20,
                }
            }
        }
    };

    stackedOptions: any = {
        tooltips: {
            enabled: false
        },
        scales: {
            xAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                    stacked: true,
                    display: false
                }
            ],
            yAxes: [
                {
                    stacked: true,
                    display: false
                }
            ]
        },
        legend: {
            display: false
        },
        plugins: {
            datalabels: {
                color: '#fff',
                font: {
                    weight: 'bold',
                    size: 18,
                }
            }
        }
    }

    paginations = {
        tables: {
            maxResultCount: 10,
            skipCount: 0
        }
    }

    pipMefData: PortalPipMefDto;

    constructor(_injector: Injector, private _utilityServiceProxy: UtilityServiceProxy, private _complianceServiceProxy: ComplianceServiceProxy) {
        super(_injector);

        Chart.pluginService.register({
            beforeDraw: (chart: any) => {

                if (chart.chart.config.type == 'horizontalBar')
                    return;

                if (!chart.chart.legend?.formatted) {
                    chart.chartArea.top = 100;
                    chart.chart.legend.defaultTop = chart.chart.legend.top;
                    chart.chart.legend.formatted = true;
                    chart.chart.legend.top = chart.chart.legend.defaultTop + 30;
                }
            }
        });

        Chart.plugins.register(ChartDataLabels);
        Chart.plugins.register(ChartOutsideLabels);
    }

    ngOnInit(): void {
        this._utilityServiceProxy.getReportFilters().subscribe(response => {
            this.territorialUnits = response.territorialUnits;
            this.departments = response.departments;
            this.socialConflicst = response.socialConflicts;
            this.selectedConflicts = response.socialConflicts;
            this.loadInformation();
        });
    }

    getData(event?: LazyLoadEvent) {
        this.paginations.tables.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.paginations.tables.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatData(this.paginations.tables.skipCount, this.paginations.tables.maxResultCount);
    }

    loadInformation() {
        this.selectedConflicts = this.socialConflicst
            .filter(p => this.territorialUnitId != -1 ? p.locations.find(d => d.territorialUnit && d.territorialUnit.id == this.territorialUnitId) : true)
            .filter(p => this.departmentId != -1 ? p.locations.find(d => d.department && d.department.id == this.departmentId) : true)
            .filter(p => this.provinceId != -1 ? p.locations.find(d => d.province && d.province.id == this.provinceId) : true)
            .filter(p => this.districtId != -1 ? p.locations.find(d => d.district && d.district.id == this.districtId) : true);

        if (this.conflictId != -1 && this.selectedConflicts.findIndex(p => p.id == this.conflictId) == -1) {
            this.conflictId = -1;
        }

        this.busy = true;
        this._complianceServiceProxy
            .getAll(
                this.territorialUnitId == -1 ? undefined : this.territorialUnitId,
                this.departmentId == -1 ? undefined : this.departmentId,
                this.provinceId == -1 ? undefined : this.provinceId,
                this.districtId == -1 ? undefined : this.districtId,
                this.conflictId == -1 ? undefined : this.conflictId)
            .pipe(finalize(() => this.busy = false))
            .subscribe(response => {
                this.summary = response.summary;
                this.summaryTotals.activityTotal = response.summary.reduce((p, c, a) => p + c.activityTotal, 0);
                this.summaryTotals.pipTotal = response.summary.reduce((p, c, a) => p + c.pipTotal, 0);
                this.summaryTotals.total = this.summaryTotals.activityTotal + this.summaryTotals.pipTotal;

                this.responsibleStatus = response.responsibleStatus;
                this.responsibleStatusTotals = {
                    activityTotal: this.responsibleStatus.reduce((last, current) => last + (current.activityTotal ? current.activityTotal : 0), 0),
                    activityCompliments: this.responsibleStatus.reduce((last, current) => last + (current.activityCompliments ? current.activityCompliments : 0), 0),
                    activityAdd: +this.formatNumber(this.responsibleStatus.reduce((last, current) => {
                        if (current.activityCompliments > 0)
                            return last + ((current.activityCompliments / current.activityTotal) * 100);
                        return last;
                    }, 0) / this.responsibleStatus.filter(p => p.activityTotal > 0).length, 2),
                    pipTotal: this.responsibleStatus.reduce((last, current) => last + (current.pipTotal ? current.pipTotal : 0), 0),
                    pipCompliments: this.responsibleStatus.reduce((last, current) => last + (current.pipCompliments ? current.pipCompliments : 0), 0),
                    pipAdd: +this.formatNumber(this.responsibleStatus.reduce((last, current) => {
                        if (current.pipCompliments > 0)
                            return last + ((current.pipCompliments / current.pipTotal) * 100);
                        return last;
                    }, 0) / this.responsibleStatus.filter(p => p.pipTotal > 0).length, 0)
                };

                this.formatData(this.paginations.tables.skipCount, this.paginations.tables.maxResultCount);

                const dataPieOneTotal: number = response.status.reduce((p, c) => p + c.count, 0);

                this.dataPieOne = {
                    totals: dataPieOneTotal,
                    labels: response.status.map(p => p.status),
                    tooltipLabels: response.status.map(p => this.formatNumber(this.roundNumber((p.count / dataPieOneTotal) * 100, 2), 0) + '% '),
                    outLabels: response.status.map(p => p.count + '; ' + this.formatNumber(this.roundNumber((p.count / dataPieOneTotal) * 100, 2), 0) + '%'),
                    datasets: [
                        {
                            data: response.status.map(p => p.count),
                            backgroundColor: this.backgroundColors(),
                            hoverBackgroundColor: this.hoverBackgroundColor()
                        }
                    ]
                };

                const dataPieTwoTotal: number = response.openStatus.reduce((p, c) => p + c.count, 0);
                this.dataPieTwo = {
                    totals: dataPieTwoTotal,
                    labels: response.openStatus.map(p => p.status),
                    tooltipLabels: response.openStatus.map(p => this.formatNumber(this.roundNumber((p.count / dataPieTwoTotal) * 100, 2), 0) + '% '),
                    outLabels: response.openStatus.map(p => p.count + '; ' + this.formatNumber(this.roundNumber((p.count / dataPieTwoTotal) * 100, 2), 0) + '%'),
                    datasets: [
                        {
                            data: response.openStatus.map(p => p.count),
                            backgroundColor: this.backgroundColors(),
                            hoverBackgroundColor: this.hoverBackgroundColor()
                        }
                    ]
                };

                this.completeLoadPip();
            });
    }

    onTerritorialUnitChange(event: any) {
        const territorialUnitId: number = +event.target.value;
        const index: number = this.territorialUnits.findIndex(p => p.id == territorialUnitId);

        if (index != -1) {
            this.selectedTerritorialUnit = this.territorialUnits[index].name;
            this.selectedDepartments = this.departments.filter(p => p.territorialUnitIds.find(d => d.id == territorialUnitId));
        } else {
            this.selectedTerritorialUnit = undefined;
            this.selectedDepartments = [];
        }

        this.selectedProvinces = [];
        this.selectedDistricts = [];
        this.departmentId = -1;
        this.provinceId = -1;
        this.districtId = -1;
        this.loadInformation();
    }

    onDepartmentChange(event: any) {
        const departmentId: number = +event.target.value;
        const index: number = this.departments.findIndex(p => p.id == departmentId);
        this.provinceId = -1;
        this.districtId = -1;
        this.selectedProvinces = [];
        this.selectedDistricts = [];

        if (index != -1)
            this.selectedProvinces = this.departments[index].provinces;

        this.loadInformation();
    }

    onProvinceChange(event: any) {
        const provinceId: number = +event.target.value;
        const index: number = this.selectedProvinces.findIndex(p => p.id == provinceId);
        this.selectedDistricts = [];
        this.districtId = -1;
        if (index != -1)
            this.selectedDistricts = this.selectedProvinces[index].districts;

        this.loadInformation();
    }

    onDistrictChange(event: any) {
        this.loadInformation();
    }

    onSocialConflictChange(event: any) {
        this.loadInformation();
    }

    private completeLoadPip() {
        this.busyPip = true;
        this._complianceServiceProxy
            .getPipMef(
                this.territorialUnitId == -1 ? undefined : this.territorialUnitId,
                this.departmentId == -1 ? undefined : this.departmentId,
                this.provinceId == -1 ? undefined : this.provinceId,
                this.districtId == -1 ? undefined : this.districtId,
                this.conflictId == -1 ? undefined : this.conflictId)
            .pipe(finalize(() => this.busyPip = false)).subscribe(response => {
                this.pipMefData = response;

                const labels: string[] = response.phases.map(p => p.name);
                const data: number[] = response.phases.map(p => p.count);

                this.summaryDetails.total = response.total;
                this.summaryDetails.proyectQuantity = response.proyectQuantity;
                this.summaryDetails.numberText = response.numberText;

                this.dataBarOne = {
                    labels: labels,
                    datasets: [
                        {
                            minBarLength: 45,
                            backgroundColor: ['#5B9BD5', '#6FA7DA', '#6FA8DA', '#D6E6F5', '#C1DAEF', '#C5C5C5', '#1F497D'],
                            data: data
                        }
                    ]
                };

                this.barDetails = [];

                const barOptionsIds: number[] = response.phases.map(p => p.step).filter(this.onlyUnique);
                const totalBarOptionIds: number = response.phases.reduce((p, c) => p + c.count, 0);

                for (let barOptionsId of barOptionsIds) {

                    const labelText = response.phases.filter(p => p.step == barOptionsId).reduce((p, c) => p + c.count, 0);

                    this.barDetails.push({
                        name: barOptionsId == 1 ? "Programación" : barOptionsId == 2 ? "Pre Inversión" : barOptionsId == 3 ? "Inversión" : barOptionsId == 4 ? "Funcionamiento" : barOptionsId == 5 ? "Desactivo" : "No asignado",
                        percentage: totalBarOptionIds > 0 ? (response.phases.filter(p => p.step == barOptionsId).reduce((p, c) => p + c.count, 0) / totalBarOptionIds) * 100 : 0,
                        color: barOptionsId == 1 ? "#3366cc" : barOptionsId == 2 ? "#dc3912" : barOptionsId == 3 ? "#ff9900" : barOptionsId == 4 ? "#109618" : barOptionsId == 5 ? "#990099" : "#0099c6",
                        summary: `${labelText}`
                    });

                }

            });
    }

    onlyUnique(value: any, index: any, self: any) {
        return self.indexOf(value) === index;
    }

    async enterPopUp(event: any, item: any) {

    }

    async outPopUp(event: any, item: any) {

    }

    private formatData(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;
        for (let item of this.responsibleStatus) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}