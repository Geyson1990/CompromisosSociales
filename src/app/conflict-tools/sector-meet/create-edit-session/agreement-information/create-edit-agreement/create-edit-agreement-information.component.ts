import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SectorMeetSessionAgreementLocationDto } from '@shared/service-proxies/application/sector-meet-session-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'create-edit-agreement',
    templateUrl: 'create-edit-agreement-information.component.html',
    styleUrls: [
        'create-edit-agreement-information.component.css'
    ]
})
export class CreateEditAgreementInformationComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: SectorMeetSessionAgreementLocationDto, index: number }> = new EventEmitter<{ value: SectorMeetSessionAgreementLocationDto, index: number }>();

    item: SectorMeetSessionAgreementLocationDto = new SectorMeetSessionAgreementLocationDto();
    riskTime: Date;
    rowIndex: number;

    active: boolean;
    saving: boolean;
    
    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: SectorMeetSessionAgreementLocationDto): void {
        this.rowIndex = rowIndex;
        this.saving = false;
        this.item = new SectorMeetSessionAgreementLocationDto(item);

        this.active = true;
        this.modal.show();
    }

    onShown(): void {
        document.getElementById('AgreementDescription')?.focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if(this.isNullEmptyOrWhiteSpace(this.item.description)) {
            this.message.error('La descripción es obligatorio', 'Aviso');
            return;
        }

        this.modalSave.emit({ index: this.rowIndex, value: this.item });
        this.close();
    }
}
