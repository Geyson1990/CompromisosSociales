import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SectorMeetSessionEntityType, SectorMeetSessionLeaderRelationDto, SectorMeetSessionSummaryLocationDto } from '@shared/service-proxies/application/sector-meet-session-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'create-edit-summary',
    templateUrl: 'create-edit-summary-information.component.html',
    styleUrls: [
        'create-edit-summary-information.component.css'
    ]
})
export class CreateEditSummaryInformationComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() findDirectory: EventEmitter<void> = new EventEmitter<void>();
    @Output() modalSave: EventEmitter<{ value: SectorMeetSessionSummaryLocationDto, index: number }> = new EventEmitter<{ value: SectorMeetSessionSummaryLocationDto, index: number }>();

    item: SectorMeetSessionSummaryLocationDto = new SectorMeetSessionSummaryLocationDto();
    riskTime: Date;
    rowIndex: number;

    active: boolean;
    saving: boolean;

    get leaderText(): string {
        if (this.item.sectorMeetSessionLeader) {
            if (this.item.sectorMeetSessionLeader.type == SectorMeetSessionEntityType.ESTATAL_ENTITY)
                return this.item.sectorMeetSessionLeader.directoryGovernment?.name || '';
            if (this.item.sectorMeetSessionLeader.type == SectorMeetSessionEntityType.COMPANY)
                return this.item.sectorMeetSessionLeader.directoryIndustry?.name || '';
            return this.item.sectorMeetSessionLeader.role;
        }

        return 'Buscar institución';
    }

    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: SectorMeetSessionSummaryLocationDto): void {
        this.rowIndex = rowIndex;
        this.saving = false;
        this.item = new SectorMeetSessionSummaryLocationDto(item);

        this.active = true;
        this.modal.show();
    }

    showFindDirectory() {
        this.findDirectory.emit();
    }

    removeDirectory() {
        this.message.confirm('¿Está seguro de eliminar la institución?', 'Aviso', confirmation => {
            if (confirmation) {
                this.item.sectorMeetSessionLeader = undefined;
            }
        });
    }

    onShown(): void {
        document.getElementById('SummaryDescription')?.focus();
    }

    addOrUpdateItem(sectorMeetSessionLeader: SectorMeetSessionLeaderRelationDto) {
        this.item.sectorMeetSessionLeader = sectorMeetSessionLeader;
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if (this.isNullEmptyOrWhiteSpace(this.item.description)) {
            this.message.error('La descripción es obligatorio', 'Aviso');
            return;
        }

        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}
