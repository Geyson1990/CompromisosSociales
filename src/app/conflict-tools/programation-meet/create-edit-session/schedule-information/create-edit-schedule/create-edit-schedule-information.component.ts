import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SectorMeetSessionScheduleLocationDto } from '@shared/service-proxies/application/sector-meet-session-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'create-edit-schedule',
    templateUrl: 'create-edit-schedule-information.component.html',
    styleUrls: [
        'create-edit-schedule-information.component.css'
    ]
})
export class CreateEditScheduleInformationComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: SectorMeetSessionScheduleLocationDto, index: number }> = new EventEmitter<{ value: SectorMeetSessionScheduleLocationDto, index: number }>();

    item: SectorMeetSessionScheduleLocationDto = new SectorMeetSessionScheduleLocationDto();
    riskTime: Date;
    rowIndex: number;

    active: boolean;
    saving: boolean;
    
    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, item: SectorMeetSessionScheduleLocationDto): void {
        this.rowIndex = rowIndex;
        this.saving = false;
        this.item = new SectorMeetSessionScheduleLocationDto(item);

        this.active = true;
        this.modal.show();
    }

    onShown(): void {
        document.getElementById('ScheduleDescription')?.focus();
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
