import { Component } from '@angular/core';
import * as chart from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as pluginPiechartOutlabels from 'chartjs-plugin-piechart-outlabels';

@Component({
    template: `<router-outlet></router-outlet>`
})
export class DashboardComponent {

    constructor() {
        chart.pluginService.register({
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

        chart.plugins.register(<any>pluginDataLabels);
        chart.plugins.register(pluginPiechartOutlabels);
    }
}