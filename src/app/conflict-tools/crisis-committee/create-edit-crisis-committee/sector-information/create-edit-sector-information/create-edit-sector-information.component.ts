import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CrisisCommitteeDirectoryGovernmentRelationDto, CrisisCommitteeDto, CrisisCommitteeSectorLocationDto } from '@shared/service-proxies/application/crisis-committee-proxie';
import { UtilityDirectoryGovernmentDto } from '@shared/service-proxies/application/utility-proxie';

@Component({
    selector: 'create-edit-sector-information-crisis-committee',
    templateUrl: 'create-edit-sector-information.component.html',
    styleUrls: [
        'create-edit-sector-information.component.css'
    ]
})
export class CreateEditSectorInformationCrisisCommitteeComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: CrisisCommitteeSectorLocationDto, index: number }> = new EventEmitter<{ value: CrisisCommitteeSectorLocationDto, index: number }>();
    @Output() showFindDirectoryGovernment: EventEmitter<void> = new EventEmitter<void>();

    risks: CrisisCommitteeDto[];
    item: CrisisCommitteeSectorLocationDto = new CrisisCommitteeSectorLocationDto();
    riskTime: Date;
    rowIndex: number;

    active: boolean;
    saving: boolean;

    get activityDirectoryGovernmentText(): string {
        return this.item.directoryGovernment ? this.item.directoryGovernment.name : 'Buscar Entidad del Estado Peruano...';
    }

    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: CrisisCommitteeSectorLocationDto): void {
        this.rowIndex = rowIndex;
        this.saving = false;
        this.item = CrisisCommitteeSectorLocationDto.fromJS(item);

        this.active = true;
        this.modal.show();
    }

    findDirectoryGovernmentEvent() {
        this.showFindDirectoryGovernment.emit();
    }

    addOrUpdateDirectoryGovernmentItem(event: UtilityDirectoryGovernmentDto) {
        this.item.directoryGovernment = CrisisCommitteeDirectoryGovernmentRelationDto.fromJS(event);
    }

    removeDirectoryGovernment() {
        this.message.confirm('¿Esta seguro de eliminar la entidad del estado peruano?', 'Aviso', (confirmation) => {
            if (confirmation) {
                this.item.directoryGovernment = undefined;
            }
        });
    }

    onShown(): void {
        document.getElementById('SectorDescription')?.focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if (!this.item.directoryGovernment) {
            this.message.info('Debe seleccionar la entidad responsable antes de guardar los cambios', 'Aviso');
            return;
        }

        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}
