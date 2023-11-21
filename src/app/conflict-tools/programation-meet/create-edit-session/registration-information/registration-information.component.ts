import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { SectorSessionStateService } from '@app/conflict-tools/sector-meet/shared/sector-session-state.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SectorMeetSessionDistrictDto, SectorMeetSessionDistrictReverseDto, SectorMeetSessionEntityType, SectorMeetSessionLeaderRelationDto, SectorMeetSessionProvinceDto, SectorMeetSessionProvinceReverseDto, SectorMeetSessionType } from '@shared/service-proxies/application/sector-meet-session-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

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
    today: Date = new Date();
    tomorrow: Date = new Date(this.today);
    
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
 
    private skipCount: number;
    private maxResultCount: number;

    constructor(_injector: Injector) {
        super(_injector);
        this.state = _injector.get(SectorSessionStateService);
        this.primengTableHelper.defaultRecordsCountPerPage = 5;
        this.skipCount = 0;
        this.maxResultCount = this.primengTableHelper.defaultRecordsCountPerPage;
    }

    ngOnInit() {
         this.tomorrow.setDate(this.today.getDate() + 1); 
    
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
}