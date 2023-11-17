import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SectorMeetSessionDistrictDto, SectorMeetSessionDistrictReverseDto, SectorMeetSessionEntityType, SectorMeetSessionLeaderRelationDto, SectorMeetSessionProvinceDto, SectorMeetSessionProvinceReverseDto, SectorMeetSessionType } from '@shared/service-proxies/application/sector-meet-session-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';
import { SectorSessionStateService } from '../../shared/sector-session-state.service';
import { DashboardServiceProxy, ReportDashboardStatusDto, ReportDashboardStatusListDto, ReportDashboardSummaryDto } from '@shared/service-proxies/application/dashboard-proxie';
import { UtilityDepartmentDataDto, UtilityDistrictDataDto, UtilityProvinceDataDto, UtilityServiceProxy, UtilityTerritorialUnitDto } from '@shared/service-proxies/application/utility-proxie';
import { finalize } from 'rxjs/operators';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ChartOutsideLabels from 'chartjs-plugin-piechart-outlabels';

@Component({
    selector: 'registration-information',
    templateUrl: 'registration-information.component.html',
    styleUrls: [
        'registration-information.component.css'
    ]
})
export class RegistrationInformationComponent extends AppComponentBase implements OnInit {

    @ViewChild('paginator', { static: true }) paginator: Paginator;
    
    @Output() addLeader: EventEmitter<void> = new EventEmitter<void>();
    @Output() editLeader: EventEmitter<{ index: number, value: SectorMeetSessionLeaderRelationDto }> = new EventEmitter<{ index: number, value: SectorMeetSessionLeaderRelationDto }>();
    @Output() showTeam: EventEmitter<{ index: number, value: SectorMeetSessionLeaderRelationDto }> = new EventEmitter<{ index: number, value: SectorMeetSessionLeaderRelationDto }>();

    state: SectorSessionStateService;
    types = {
        none: SectorMeetSessionType.NONE,
        presential: SectorMeetSessionType.PRESENTIAL,
        remote: SectorMeetSessionType.REMOTE      
    } 

    selectedProvinces: SectorMeetSessionProvinceDto[];
    selectedDistricts: SectorMeetSessionDistrictDto[];

    leaderTypes = {
        none: SectorMeetSessionEntityType.NONE,
        company: SectorMeetSessionEntityType.COMPANY,
        entity: SectorMeetSessionEntityType.ESTATAL_ENTITY,
        civilSociety: SectorMeetSessionEntityType.CIVIL_SOCIETY,
        other: SectorMeetSessionEntityType.OTHER 
    }

    institutionTypes = {
        none: SectorMeetSessionEntityType.NONE,
        company: SectorMeetSessionEntityType.COMPANY,
        entity: SectorMeetSessionEntityType.ESTATAL_ENTITY,
        civilSociety: SectorMeetSessionEntityType.CIVIL_SOCIETY,
        other: SectorMeetSessionEntityType.OTHER,
        all: SectorMeetSessionEntityType.ALL
    }
    

    private skipCount: number;
    private maxResultCount: number;

    selectedTerritorialUnit: string = undefined;
    territorialUnitId: number = -1;
    departmentId: number = -1;
    provinceId: number = -1;
    districtId: number = -1;

    busy: boolean = true;
    loadTable: boolean = false;
    statusList: ReportDashboardStatusListDto[];
    closedStatuses: ReportDashboardStatusListDto[] = [];
   
    columns: ReportDashboardStatusListDto[] = [];

    departments: UtilityDepartmentDataDto[];
    territorialUnits: UtilityTerritorialUnitDto[];
    selectedDepartments: UtilityDepartmentDataDto[]; 
    summary: ReportDashboardSummaryDto[]; 

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

    chartTypes = {
        pie: 0,
        bar: 1
    }

    charts = {
        compromisGenderStates: {
            type: this.chartTypes.pie,
            pie: undefined,
            bar: undefined
        },
        compromisInstitutionStates: {
            type: this.chartTypes.pie,
            pie: undefined,
            bar: undefined
        }
    }
    
    constructor(
        _injector: Injector, 
        private _dashboardServiceProxy: DashboardServiceProxy) {
        super(_injector);
        this.state = _injector.get(SectorSessionStateService);
        this.primengTableHelper.defaultRecordsCountPerPage = 5;
        this.skipCount = 0;
        this.maxResultCount = this.primengTableHelper.defaultRecordsCountPerPage;
        
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

    

    ngOnInit() {
    
        if (this.state.sectorMeetSession.type == SectorMeetSessionType.PRESENTIAL) {
            let departmentId: number = this.state.sectorMeetSession.department.id;
            let provinceId: number = this.state.sectorMeetSession.province.id;
            let districtId: number = this.state.sectorMeetSession.district.id;

            if (departmentId > 0) {
                this.state.sectorMeetSession.department.id = departmentId;
                this.onDepartmentChange({ target: { value: departmentId } });

                if (provinceId > 0) {
                    this.state.sectorMeetSession.province.id = provinceId;
                    this.onProvinceChange({ target: { value: provinceId } });

                    this.state.sectorMeetSession.district.id = districtId;
                }
            }
        }

        this.formatPagination(this.skipCount, this.maxResultCount);
        this.state.sectorMeetSession.institutionType = 5;
        this.dataGraphicsPie(5);
    }

    getData(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    onDepartmentChange(event: any) {
        const departmentId: number = +event.target.value;
        const index: number = this.state.departments.findIndex(p => p.id == departmentId);

        this.state.sectorMeetSession.province = new SectorMeetSessionProvinceReverseDto({
            id: -1,
            name: undefined,
            department: undefined
        });
        this.state.sectorMeetSession.district = new SectorMeetSessionDistrictReverseDto({
            id: -1,
            name: undefined,
            province: undefined
        });
        this.selectedDistricts = [];

        if (index != -1) {
            this.selectedProvinces = this.state.departments[index].provinces;
        } else {
            this.selectedProvinces = [];
        }
    }

    onProvinceChange(event: any) {
        const provinceId: number = +event.target.value;
        const index: number = this.selectedProvinces.findIndex(p => p.id == provinceId);

        this.state.sectorMeetSession.district = new SectorMeetSessionDistrictReverseDto({
            id: -1,
            name: undefined,
            province: undefined
        });

        if (index != -1) {
            this.selectedDistricts = this.selectedProvinces[index].districts;
        } else {
            this.selectedDistricts = [];
        }
    }

    addOrUpdateItem(event: { value: SectorMeetSessionLeaderRelationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.state.sectorMeetSession.leaders[event.index] = event.value;
        } else {
            this.state.sectorMeetSession.leaders.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }
    
    editEvent(value: SectorMeetSessionLeaderRelationDto, index: number) {
        this.editLeader.emit({ index: index, value: value });
    }

    editTeamEvent(value: SectorMeetSessionLeaderRelationDto, index: number) {
        this.showTeam.emit({ index: index, value: value });
    }

    removeItem(leader: SectorMeetSessionLeaderRelationDto, index: number) {
        if (leader.id) {
            leader.remove = true;
            this.notify.warn('Se ha marcado para eliminar el registro seleccionado');
        } else {
            this.state.sectorMeetSession.leaders.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(leader: SectorMeetSessionLeaderRelationDto) {
        leader.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar del registro seleccionado');
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.state.sectorMeetSession.leaders) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
 

    onInstituteChange(event:any){
      
        var opcion = event.target.value
       this.dataGraphicsPie(opcion);

    }

    dataGraphicsPie(opcion){
        this.busy = true;
      
        var totalParticipantes = 0;
        var totalHombres = 0;
        var totalMujeres = 0; 
        var totalpersonas = 0;
        var totalEmpresa = 0; 
        var totalEntidad = 0;  
        var totalSociedad = 0; 
        var totalOtros = 0;

        var data: ReportDashboardStatusDto[]; 
        var nameStatus ="";
        let leaders = this.state.sectorMeetSession.leaders;
        var objeto =  []; 
        var objetoInstitucion =  []; 
        for (var i = 0; i < leaders.length; i++) 
        {
            for (var x = 0; x < leaders[i].teams.length; x++) {
                
 
                if(leaders[i].type == 1 && (leaders[i].teams[x].gender === "M" || leaders[i].teams[x].gender === "F" )){
                totalEmpresa =totalEmpresa+1;                    
                }  
        
                if(leaders[i].type == 2 && (leaders[i].teams[x].gender === "M" || leaders[i].teams[x].gender === "F"  )){
                totalEntidad =totalEntidad+1;                    
                }  
            
                if(leaders[i].type == 3 && (leaders[i].teams[x].gender === "M" || leaders[i].teams[x].gender === "F"  )){
                totalSociedad =totalSociedad+1;                    
                }  
                if(leaders[i].type == 4 && (leaders[i].teams[x].gender === "M" || leaders[i].teams[x].gender === "F"  )){
                totalOtros =totalOtros+1;                    
                }  


            if(leaders[i].type == opcion){

                if(leaders[i].teams[x].gender === "M"){
                    totalHombres =totalHombres+1;                        
                   }        

                if(leaders[i].teams[x].gender === "F"){
                    totalMujeres =totalMujeres+1;                    
                   }
            }     

            if(opcion=="5"){
                       if(leaders[i].teams[x].gender === "M"){
                        totalHombres =totalHombres+1;
                        nameStatus = "Hombre";
                       }    

                       if(leaders[i].teams[x].gender === "F"){
                        totalMujeres =totalMujeres+1;
                        nameStatus = "Mujer";                      
                       }  
                    }
            }            
        } 

        objeto[0]  =   { 
            status: "Hombres",
            count: totalHombres
            }
        objeto[1]  =   { 
                status: "Mujeres",
                count: totalMujeres
                }
        
        objetoInstitucion[0]  =   { 
            status: "Empresa",
            count: totalEmpresa
            }
        objetoInstitucion[1]  =   { 
            status: "Entidad Estatal",
            count: totalEntidad
            }
        objetoInstitucion[2]  =   { 
            status: "Sociedad Civil",
            count: totalSociedad
            }
         objetoInstitucion[3]  =   { 
            status: "Otros",
            count: totalOtros
            }

        totalParticipantes = totalHombres +totalMujeres;  
        debugger;  

        this.formatGender(objeto);
        this.formatInstitution(objetoInstitucion);
       
        this.busy = false;
    }
    private formatGender(data: ReportDashboardStatusDto[]) {
        debugger;
                const total: number = data.reduce((p, c) => p + c.count, 0);
        
                if (data.length > this.primengTableHelper.defaultRecordCountPerPie) {
                    this.charts.compromisGenderStates.type = this.chartTypes.bar;
                    this.charts.compromisGenderStates.bar = {
                        labels: data.map(p => p.status),
                        datasets: [
                            {
                                label: 'Total Participantes por Género',
                                tooltipLabels: data.map(p => this.formatNumber(this.roundNumber((p.count / total) * 100, 2), 0) + '% '),
                                data: data.map(p => p.count),
                                backgroundColor: this.backgroundColors(),
                                hoverBackgroundColor: this.hoverBackgroundColor()
                            }
                        ]
                    };
                } else {
                    this.charts.compromisGenderStates.type = this.chartTypes.pie;
                    this.charts.compromisGenderStates.pie = {
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
    
            private formatInstitution(data: ReportDashboardStatusDto[]) {
                debugger;
                        const total: number = data.reduce((p, c) => p + c.count, 0);
                
                        if (data.length > this.primengTableHelper.defaultRecordCountPerPie) {
                            this.charts.compromisInstitutionStates.type = this.chartTypes.bar;
                            this.charts.compromisInstitutionStates.bar = {
                                labels: data.map(p => p.status),
                                datasets: [
                                    {
                                        label: 'Total Partcipantes por Institución',
                                        tooltipLabels: data.map(p => this.formatNumber(this.roundNumber((p.count / total) * 100, 2), 0) + '% '),
                                        data: data.map(p => p.count),
                                        backgroundColor: this.backgroundColors(),
                                        hoverBackgroundColor: this.hoverBackgroundColor()
                                    }
                                ]
                            };
                        } else {
                            this.charts.compromisInstitutionStates.type = this.chartTypes.pie;
                            this.charts.compromisInstitutionStates.pie = {
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