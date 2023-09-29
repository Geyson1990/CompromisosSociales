import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DashboardServiceProxy, ReportDashboardStatusDto, ReportDashboardStatusListDto, ReportDashboardSummaryDto } from '@shared/service-proxies/application/dashboard-proxie';
import { UtilityDepartmentDataDto, UtilityDistrictDataDto, UtilityProvinceDataDto, UtilityServiceProxy, UtilityTerritorialUnitDto } from '@shared/service-proxies/application/utility-proxie';
import { finalize } from 'rxjs/operators';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ChartOutsideLabels from 'chartjs-plugin-piechart-outlabels';

@Component({
    templateUrl: './host-dashboard.component.html',
    styleUrls: [
        './host-dashboard.component.less'
    ],
    encapsulation: ViewEncapsulation.None,
    animations: [
        appModuleAnimation()
    ]
})
export class HostDashboardComponent extends AppComponentBase {

    busy: boolean = true;

    dataPieOne: any;
    dataPieTwo: any;
    dataPieThree: any;

    selectedTerritorialUnit: string = undefined;
    territorialUnitId: number = -1;
    departmentId: number = -1;
    provinceId: number = -1;
    districtId: number = -1;

    departments: UtilityDepartmentDataDto[];
    territorialUnits: UtilityTerritorialUnitDto[];
    selectedDepartments: UtilityDepartmentDataDto[];
    selectedProvinces: UtilityProvinceDataDto[];
    selectedDistricts: UtilityDistrictDataDto[];
    summary: ReportDashboardSummaryDto[];

    loadTable: boolean = false;
    statusList: ReportDashboardStatusListDto[];
    closedStatuses: ReportDashboardStatusListDto[] = [];
    openStatuses: ReportDashboardStatusListDto[] = [];
    columns: ReportDashboardStatusListDto[] = [];

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
                top: 40,
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

    optionsBarDefault: any = {
        legend: {
            display: false
        },
        tooltips: {
            callbacks: {
                label: (tooltipItem: any, data: any) => {
                    return `${data.datasets[0].tooltipLabels[tooltipItem.index]}`;
                }
            }
        },
        layout: {
            padding: {
                right: 30
            },
        },
        scales: {
            xAxes: [
                {
                    display: false,
                    offset: true,
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        min: 0
                    }
                }
            ],
            yAxes: [
                {
                    offset: true,
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        min: 0
                    }
                }
            ]
        },
        plugins: {
            datalabels: {
                align: 'right',
                anchor: 'end',
                font: {
                    size: 12
                },
                formatter: (value: any, data: any) => {
                    return `${data.dataset.tooltipLabels[data.dataIndex]}`;
                }
            }
        }
    };
    
    chartTypes = {
        pie: 0,
        bar: 1
    }

    charts = {
        compromiseStates: {
            type: this.chartTypes.pie,
            pie: undefined,
            bar: undefined
        },
        compromiseOpenedStates: {
            type: this.chartTypes.pie,
            pie: undefined,
            bar: undefined
        },
        compromisClosedStates: {
            type: this.chartTypes.pie,
            pie: undefined,
            bar: undefined
        }
    }

    constructor(_injector: Injector, private _utilityServiceProxy: UtilityServiceProxy, private _dashboardServiceProxy: DashboardServiceProxy) {
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
            this.loadInformation();
        });
    }

    loadInformation() {
        this.loadTable = false;
        this.busy = true;
        this._dashboardServiceProxy
            .getAll(
                this.territorialUnitId == -1 ? undefined : this.territorialUnitId,
                this.departmentId == -1 ? undefined : this.departmentId,
                this.provinceId == -1 ? undefined : this.provinceId,
                this.districtId == -1 ? undefined : this.districtId)
            .pipe(finalize(() => this.busy = false))
            .subscribe(response => {
                this.columns = [];
                this.summary = response.summary;

                this.openStatuses = response.statusList.filter(p => p.value.indexOf('Abierto') != -1);
                this.closedStatuses = response.statusList.filter(p => p.value.indexOf('Cerrado') != -1);

                for (let openStatus of this.openStatuses) {
                    this.columns.push(new ReportDashboardStatusListDto({ id: openStatus.id, value: openStatus.value.replace('Abierto', '').replace('/', '').trim() }));
                }

                for (let closedStatus of this.closedStatuses) {
                    this.columns.push(new ReportDashboardStatusListDto({ id: closedStatus.id, value: closedStatus.value.replace('Cerrado', '').replace('/', '').trim() }));
                }

                this.statusList = this.openStatuses.concat(this.closedStatuses);

                response.status = response.status.sort(p => p.count);
                response.openStatus = response.openStatus.sort(p => p.count);
                response.closeStatus = response.closeStatus.sort(p => p.count);

                this.formatStatus(response.status);
                this.formatOpened(response.openStatus);
                this.formatClosed(response.closeStatus);

                this.loadTable = true;
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

    private formatStatus(data: ReportDashboardStatusDto[]) {

        const total: number = data.reduce((p, c) => p + c.count, 0);

        if (data.length > this.primengTableHelper.defaultRecordCountPerPie) {
            this.charts.compromiseStates.type = this.chartTypes.bar;
            this.charts.compromiseStates.bar = {
                labels: data.map(p => p.status),
                datasets: [
                    {
                        label: 'Total compromisos abiertos vs cerrados',
                        tooltipLabels: data.map(p => this.formatNumber(this.roundNumber((p.count / total) * 100, 2), 0) + '% '),
                        data: data.map(p => p.count),
                        backgroundColor: this.backgroundColors(),
                        hoverBackgroundColor: this.hoverBackgroundColor()
                    }
                ]
            };
        } else {
            this.charts.compromiseStates.type = this.chartTypes.pie;
            this.charts.compromiseStates.pie = {
                totals: total,
                labels: data.map(p => p.status),
                tooltipLabels: data.map(p => this.formatNumber(this.roundNumber((p.count / total) * 100, 2), 0) + '% '),
                outLabels: data.map(p => p.count + '; ' + this.formatNumber(this.roundNumber((p.count / total) * 100, 2), 0) + '%'),
                datasets: [
                    {
                        data: data.map(p => p.count),
                        backgroundColor: this.backgroundColors(),
                        hoverBackgroundColor: this.hoverBackgroundColor()
                    }
                ]
            };
        }
    }

    private formatOpened(data: ReportDashboardStatusDto[]) {

        const total: number = data.reduce((p, c) => p + c.count, 0);

        if (data.length > this.primengTableHelper.defaultRecordCountPerPie) {
            this.charts.compromiseOpenedStates.type = this.chartTypes.bar;
            this.charts.compromiseOpenedStates.bar = {
                labels: data.map(p => p.status),
                datasets: [
                    {
                        label: 'Total compromisos abiertos por estado',
                        tooltipLabels: data.map(p => this.formatNumber(this.roundNumber((p.count / total) * 100, 2), 0) + '% '),
                        data: data.map(p => p.count),
                        backgroundColor: this.backgroundColors(),
                        hoverBackgroundColor: this.hoverBackgroundColor()
                    }
                ]
            };
        } else {
            this.charts.compromiseOpenedStates.type = this.chartTypes.pie;
            this.charts.compromiseOpenedStates.pie = {
                totals: total,
                labels: data.map(p => p.status),
                tooltipLabels: data.map(p => this.formatNumber(this.roundNumber((p.count / total) * 100, 2), 0) + '% '),
                outLabels: data.map(p => p.count + '; ' + this.formatNumber(this.roundNumber((p.count / total) * 100, 2), 0) + '%'),
                datasets: [
                    {
                        data: data.map(p => p.count),
                        backgroundColor: this.backgroundColors(),
                        hoverBackgroundColor: this.hoverBackgroundColor()
                    }
                ]
            };
        }
    }

    private formatClosed(data: ReportDashboardStatusDto[]) {

        const total: number = data.reduce((p, c) => p + c.count, 0);

        if (data.length > this.primengTableHelper.defaultRecordCountPerPie) {
            this.charts.compromisClosedStates.type = this.chartTypes.bar;
            this.charts.compromisClosedStates.bar = {
                labels: data.map(p => p.status),
                datasets: [
                    {
                        label: 'Total compromisos abiertos por estado',
                        tooltipLabels: data.map(p => this.formatNumber(this.roundNumber((p.count / total) * 100, 2), 0) + '% '),
                        data: data.map(p => p.count),
                        backgroundColor: this.backgroundColors(),
                        hoverBackgroundColor: this.hoverBackgroundColor()
                    }
                ]
            };
        } else {
            this.charts.compromisClosedStates.type = this.chartTypes.pie;
            this.charts.compromisClosedStates.pie = {
                totals: total,
                labels: data.map(p => p.status),
                tooltipLabels: data.map(p => this.formatNumber(this.roundNumber((p.count / total) * 100, 2), 0) + '% '),
                outLabels: data.map(p => p.count + '; ' + this.formatNumber(this.roundNumber((p.count / total) * 100, 2), 0) + '%'),
                datasets: [
                    {
                        data: data.map(p => p.count),
                        backgroundColor: this.backgroundColors(),
                        hoverBackgroundColor: this.hoverBackgroundColor()
                    }
                ]
            };
        }
    }
}