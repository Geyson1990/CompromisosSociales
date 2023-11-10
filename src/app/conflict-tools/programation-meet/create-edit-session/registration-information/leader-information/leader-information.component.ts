import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SectorMeetSessionDirectoryGovernmentLocationDto, SectorMeetSessionDirectoryIndustryLocationDto, SectorMeetSessionEntityType, SectorMeetSessionLeaderRelationDto } from '@shared/service-proxies/application/sector-meet-session-proxie';
import { UtilityDirectoryGovernmentDto, UtilityDirectoryIndustryDto } from '@shared/service-proxies/application/utility-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'create-edit-leader',
    templateUrl: 'leader-information.component.html',
    styleUrls: [
        'leader-information.component.css'
    ]
})
export class CreateEditLeaderInformationComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: SectorMeetSessionLeaderRelationDto, index: number }> = new EventEmitter<{ value: SectorMeetSessionLeaderRelationDto, index: number }>();
    @Output() findDirectoryGovernment: EventEmitter<void> = new EventEmitter<void>();
    @Output() findDirectoryIndustry: EventEmitter<void> = new EventEmitter<void>();

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

    get directoryGovernmentText(): string {
        return this.item.directoryGovernment ? this.item.directoryGovernment.name : 'Buscar Entidad del Estado Peruano...';
    }

    get directoryIndustryText(): string {
        return this.item.directoryIndustry ? this.item.directoryIndustry.name : 'Buscar Empresas Privadas...';
    }

    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: SectorMeetSessionLeaderRelationDto): void {
        this.rowIndex = rowIndex;
        this.saving = false;
        this.item = new SectorMeetSessionLeaderRelationDto(item);

        this.active = true;
        this.modal.show();
    }

    onShown() {

    }

    findDirectoryGovernmentEvent() {
        this.findDirectoryGovernment.emit();
    }

    findDirectoryIndustryEvent() {
        this.findDirectoryIndustry.emit();
    }

    selectDirectoryGovernment(event: UtilityDirectoryGovernmentDto) {
        this.item.directoryGovernment = SectorMeetSessionDirectoryGovernmentLocationDto.fromJS(event);
    }

    selectDirectoryIndustry(event: UtilityDirectoryIndustryDto) {
        this.item.directoryIndustry = SectorMeetSessionDirectoryIndustryLocationDto.fromJS(event);
    }

    removeDirectoryGovernment() {
        this.item.directoryGovernment = undefined;
    }

    removeDirectoryIndustry() {
        this.item.directoryIndustry = undefined;
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save() {
        if (this.item.type == this.types.none) {
            this.message.error('El tipo de institución es obligatorio', 'Aviso');
            return;
        }
        if ((this.item.type == this.types.civilSociety || this.item.type == this.types.other) && this.isNullEmptyOrWhiteSpace(this.item.role)) {
            this.message.error('La descripción de los Sector(es) que preside(n) el espacio de diálogo es obligatorio', 'Aviso');
            return;
        }
        if (this.item.type == this.types.company && !this.item.directoryIndustry) {
            this.message.error('La selección de la empresa privada es obligatorio', 'Aviso');
            return;
        }
        if (this.item.type == this.types.entity && !this.item.directoryGovernment) {
            this.message.error('La selección de la Entidad del Estado Peruano es obligatorio', 'Aviso');
            return;
        }
        if (this.item.type != this.types.civilSociety && this.item.type != this.types.other && this.isNullEmptyOrWhiteSpace(this.item.entity)) {
            this.message.error('La descripción del Órgano/Área/Etc es obligatorio', 'Aviso');
            return;
        }

        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}