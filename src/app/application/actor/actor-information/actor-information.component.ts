import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CrisisCommitteeDirectoryGovernmentRelationDto, CrisisCommitteeDto, CrisisCommitteeSectorLocationDto } from '@shared/service-proxies/application/crisis-committee-proxie';
import { UtilityDirectoryGovernmentDto } from '@shared/service-proxies/application/utility-proxie';
import { ActorDto } from '@shared/service-proxies/application/actor-proxie';

@Component({
    selector: 'actor-information',
    templateUrl: 'actor-information.component.html',
    styleUrls: [
        'actor-information.component.css'
    ]
})
export class EditActorInformationComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    // @Output() modalSave: EventEmitter<{ value: CrisisCommitteeSectorLocationDto, index: number }> = new EventEmitter<{ value: CrisisCommitteeSectorLocationDto, index: number }>();
    @Output() showFindDirectoryGovernment: EventEmitter<void> = new EventEmitter<void>();

    risks: CrisisCommitteeDto[];
    item: ActorDto = new ActorDto();
    riskTime: Date;
    rowIndex: number;

    active: boolean;
    saving: boolean;
    actortText:any;

    // get activityDirectoryGovernmentText(): string {
    //     return this.item.directoryGovernment ? this.item.directoryGovernment.name : 'Buscar Entidad del Estado Peruano...';
    // }

    constructor(_injector: Injector) {
        super(_injector);
    }

    show(): void {      
        this.modal.show();
    }

    findActorEvent() {
        this.showFindDirectoryGovernment.emit();
    }

    // addOrUpdateDirectoryGovernmentItem(event: UtilityDirectoryGovernmentDto) {
    //     this.item.directoryGovernment = CrisisCommitteeDirectoryGovernmentRelationDto.fromJS(event);
    // }

    removeDirectoryGovernment() {
        this.message.confirm('¿Esta seguro de eliminar la entidad del estado peruano?', 'Aviso', (confirmation) => {
            // if (confirmation) {
            //     this.item.directoryGovernment = undefined;
            // }
        });
    }

    onShown(): void {
        document.getElementById('ActorDescription')?.focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        // if (!this.item.directoryGovernment) {
        //     this.message.info('Debe seleccionar el actor antes de guardar los cambios', 'Aviso');
        //     return;
        // }

        // this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}
