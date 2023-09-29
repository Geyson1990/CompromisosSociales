import { Injector } from "@angular/core";
import { AppComponentBase } from "@shared/common/app-component-base";
import { DashboardService } from "./dashboard.service";

export abstract class DashboardComponentBase extends AppComponentBase {

    indexes = {
        compromises: 0,
        projects: 1,
        conflictivity: 2,
        alerts: 3,
        sensibles: 4
    }

    filters = {
        conflictId: -1,
        territorialUnitId: -1,
        territorialUnitName: undefined,
        departmentId: -1,
        provinceId: -1,
        districtId: -1,
        riskId: -1,
        geographicId: -1
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

    shared: DashboardService;

    constructor(_injector: Injector) {
        super(_injector);
        
        this.shared = _injector.get(DashboardService);
    }
}