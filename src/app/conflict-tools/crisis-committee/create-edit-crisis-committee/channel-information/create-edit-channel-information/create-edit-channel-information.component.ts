import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CrisisCommitteeDto, CrisisCommitteeChannelLocationDto } from '@shared/service-proxies/application/crisis-committee-proxie';

@Component({
    selector: 'create-edit-channel-information-crisis-committee',
    templateUrl: 'create-edit-channel-information.component.html',
    styleUrls: [
        'create-edit-channel-information.component.css'
    ]
})
export class CreateEditChannelInformationCrisisCommitteeComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: CrisisCommitteeChannelLocationDto, index: number }> = new EventEmitter<{ value: CrisisCommitteeChannelLocationDto, index: number }>();

    risks: CrisisCommitteeDto[];
    item: CrisisCommitteeChannelLocationDto = new CrisisCommitteeChannelLocationDto();
    riskTime: Date;
    rowIndex: number;

    active: boolean;
    saving: boolean;
    
    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: CrisisCommitteeChannelLocationDto): void {
        this.rowIndex = rowIndex;
        this.saving = false;
        this.item = new CrisisCommitteeChannelLocationDto(item);

        this.active = true;
        this.modal.show();
    }

    onShown(): void {
        document.getElementById('ChannelDescription')?.focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if(this.isNullEmptyOrWhiteSpace(this.item.description)) {
            this.message.error('La descripción del canal de comunicación es obligatorio', 'Aviso');
            return;
        }

        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}
