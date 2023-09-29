import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DialogSpaceLeaderRelationDto, DialogSpaceTeamRelationDto } from '@shared/service-proxies/application/dialog-space.proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'create-edit-team',
    templateUrl: 'create-edit-team.component.html',
    styleUrls: [
        'create-edit-team.component.css'
    ]
})
export class CreateEditTeamInformationComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ leader: DialogSpaceLeaderRelationDto, leaderIndex: number, teamIndex: number, team: DialogSpaceTeamRelationDto }> = new EventEmitter<{ leader: DialogSpaceLeaderRelationDto, leaderIndex: number, teamIndex: number, team: DialogSpaceTeamRelationDto }>();

    team: DialogSpaceTeamRelationDto = new DialogSpaceTeamRelationDto();
    riskTime: Date;
    teamIndex: number;

    active: boolean;
    saving: boolean;

    leader: DialogSpaceLeaderRelationDto;
    leaderIndex: number;

    constructor(_injector: Injector) {
        super(_injector);
    }

    show(leader: DialogSpaceLeaderRelationDto, leaderIndex: number, team: DialogSpaceTeamRelationDto, teamIndex: number): void {
        this.saving = false;

        this.leader = leader;
        this.leaderIndex = leaderIndex;

        this.teamIndex = teamIndex;
        this.team = new DialogSpaceTeamRelationDto(team);

        this.active = true;
        this.modal.show();
    }

    onShown(): void {

    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if (this.isNullEmptyOrWhiteSpace(this.team.name)) {
            this.message.error('El Órgano de Alta Dirección/Línea/Otro es obligatorio. Por favor verifique la información antes de continuar', 'Aviso');
            return;
        }
        this.team.name = this.team.name.trim().toUpperCase();

        this.modalSave.emit({ leader: this.leader, leaderIndex: this.leaderIndex, team: this.team, teamIndex: this.teamIndex });
        this.close();
    }
}
