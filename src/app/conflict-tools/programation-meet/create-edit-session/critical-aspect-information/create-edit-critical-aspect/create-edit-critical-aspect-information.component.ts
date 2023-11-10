import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SectorMeetSessionCriticalAspectLocationDto } from '@shared/service-proxies/application/sector-meet-session-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'create-edit-critical-aspect',
    templateUrl: 'create-edit-critical-aspect-information.component.html',
    styleUrls: [
        'create-edit-critical-aspect-information.component.css'
    ]
})
export class CreateEditCriticalAspectInformationComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: SectorMeetSessionCriticalAspectLocationDto, index: number }> = new EventEmitter<{ value: SectorMeetSessionCriticalAspectLocationDto, index: number }>();

    item: SectorMeetSessionCriticalAspectLocationDto = new SectorMeetSessionCriticalAspectLocationDto();
    riskTime: Date;
    rowIndex: number;

    active: boolean;
    saving: boolean;
    
    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: SectorMeetSessionCriticalAspectLocationDto): void {
        this.rowIndex = rowIndex;
        this.saving = false;
        this.item = new SectorMeetSessionCriticalAspectLocationDto(item);

        this.active = true;
        this.modal.show();
    }

    onShown(): void {
        document.getElementById('CriticalAspectDescription')?.focus();
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
