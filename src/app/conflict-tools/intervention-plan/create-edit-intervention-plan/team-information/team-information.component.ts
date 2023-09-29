import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { InterventionPlanDto, InterventionPlanTeamLocationDto } from '@shared/service-proxies/application/intervention-plan-proxie';
import { InterventionPlanEntityType } from '@shared/service-proxies/application/utility-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'team-information-intervention-plan',
    templateUrl: 'team-information.component.html',
    styleUrls: [
        'team-information.component.css'
    ]
})
export class TeamInformationInterventionPlanComponent extends AppComponentBase implements OnInit {

    private _busy: boolean;
    private _interventionPlan: InterventionPlanDto;

    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Input() get busy(): boolean {
        return this._busy;
    }

    set busy(value: boolean) {
        this._busy = value;
    }

    @Input() get interventionPlan(): InterventionPlanDto {
        return this._interventionPlan;
    }

    set interventionPlan(value: InterventionPlanDto) {
        this._interventionPlan = value;
    }

    @Output() addTeam: EventEmitter<void> = new EventEmitter<void>();
    @Output() editTeam: EventEmitter<{ index: number, value: InterventionPlanTeamLocationDto }> = new EventEmitter<{ index: number, value: InterventionPlanTeamLocationDto }>();

    types = {
        sector: InterventionPlanEntityType.Sector,
        responsible: InterventionPlanEntityType.Responsible,
        other: InterventionPlanEntityType.Other
    }
    
    private skipCount: number;
    private maxResultCount: number;

    constructor(_injector: Injector) {
        super(_injector);
        this.primengTableHelper.defaultRecordsCountPerPage = 5;
        this.skipCount = 0;
        this.maxResultCount = this.primengTableHelper.defaultRecordsCountPerPage;
    }

    ngOnInit(): void {
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    getData(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    removeItem(team: InterventionPlanTeamLocationDto, index: number) {
        if (team.id) {
            team.remove = true;
            this.notify.warn('Se ha marcado para eliminar el equipo de intervención seleccionado');
        } else {
            this.interventionPlan.teams.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(team: InterventionPlanTeamLocationDto) {
        team.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar del equipo de intervención seleccionado');
    }

    editEvent(value: InterventionPlanTeamLocationDto, index: number) {
        this.editTeam.emit({ index: index, value: value });
    }

    addOrUpdateItem(event: { value: InterventionPlanTeamLocationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.interventionPlan.teams[event.index] = event.value;
        } else {
            this.interventionPlan.teams.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.interventionPlan.teams) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}