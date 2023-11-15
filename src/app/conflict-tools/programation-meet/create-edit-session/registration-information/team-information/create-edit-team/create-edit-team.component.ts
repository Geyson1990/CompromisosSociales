import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SectorMeetSessionTeamRelationDto } from '@shared/service-proxies/application/sector-meet-session-proxie';
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
    @Output() modalSave: EventEmitter<{ value: SectorMeetSessionTeamRelationDto, index: number }> = new EventEmitter<{ value: SectorMeetSessionTeamRelationDto, index: number }>();

    item: SectorMeetSessionTeamRelationDto = new SectorMeetSessionTeamRelationDto();
    riskTime: Date;
    rowIndex: number;

    active: boolean;
    saving: boolean;

    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: SectorMeetSessionTeamRelationDto): void {
        this.rowIndex = rowIndex;
        this.saving = false;
        this.item = new SectorMeetSessionTeamRelationDto(item);

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
        if (this.isNullEmptyOrWhiteSpace(this.item.name)) {
            this.message.error('El nombre del integrante es obligatorio', 'Aviso');
            return;
        }
        if (this.isNullEmptyOrWhiteSpace(this.item.surname)) {
            this.message.error('El apellido del integrante es obligatorio', 'Aviso');
            return;
        }
        if (this.isNullEmptyOrWhiteSpace(this.item.job)) {
            this.message.error('El cargo del integrante es obligatorio', 'Aviso');
            return;
        }
        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}
