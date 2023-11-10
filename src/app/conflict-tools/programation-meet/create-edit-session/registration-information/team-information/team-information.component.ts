import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SectorMeetSessionEntityType, SectorMeetSessionLeaderRelationDto, SectorMeetSessionTeamRelationDto } from '@shared/service-proxies/application/sector-meet-session-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'team-information',
    templateUrl: 'team-information.component.html',
    styleUrls: [
        'team-information.component.css'
    ]
})
export class TeamInformationComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Output() modalSave: EventEmitter<{ value: SectorMeetSessionLeaderRelationDto, index: number }> = new EventEmitter<{ value: SectorMeetSessionLeaderRelationDto, index: number }>();
    @Output() addTeam: EventEmitter<void> = new EventEmitter<void>();
    @Output() editTeam: EventEmitter<{ value: SectorMeetSessionTeamRelationDto, index: number }> = new EventEmitter<{ value: SectorMeetSessionTeamRelationDto, index: number }>();

    item: SectorMeetSessionLeaderRelationDto = new SectorMeetSessionLeaderRelationDto();
    rowIndex: number;
    types = {
        none: SectorMeetSessionEntityType.NONE,
        company: SectorMeetSessionEntityType.COMPANY,
        entity: SectorMeetSessionEntityType.ESTATAL_ENTITY,
        civilSociety: SectorMeetSessionEntityType.CIVIL_SOCIETY,
        other: SectorMeetSessionEntityType.OTHER
    }

    active: boolean;
    saving: boolean;

    private skipCount: number;
    private maxResultCount: number;

    constructor(_injector: Injector) {
        super(_injector);
        this.primengTableHelper.defaultRecordsCountPerPage = 5;
        this.skipCount = 0;
        this.maxResultCount = this.primengTableHelper.defaultRecordsCountPerPage;
    }

    show(rowIndex: number, item: SectorMeetSessionLeaderRelationDto): void {
        this.rowIndex = rowIndex;
        this.saving = false;
        this.item = new SectorMeetSessionLeaderRelationDto(item);

        this.active = true;
        this.modal.show();
    }

    getData(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    addOrUpdateItem(event: { value: SectorMeetSessionTeamRelationDto, index: number }) {
        if (event.index || event.index == 0) {
            this.item.teams[event.index] = event.value;
        } else {
            this.item.teams.push(event.value);
        }
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    editEvent(value: SectorMeetSessionTeamRelationDto, index: number) {
        this.editTeam.emit({ index: index, value: value });
    }

    removeItem(team: SectorMeetSessionTeamRelationDto, index: number) {
        if (team.id) {
            team.remove = true;
            this.notify.warn('Se ha marcado para eliminar el registro seleccionado');
        } else {
            this.item.teams.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(team: SectorMeetSessionTeamRelationDto) {
        team.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar del registro seleccionado');
    }

    onShown() {

    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save() {
        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.item.teams) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}