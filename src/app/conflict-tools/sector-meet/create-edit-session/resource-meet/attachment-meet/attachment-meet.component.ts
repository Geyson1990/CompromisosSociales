import { Component, Injector } from '@angular/core';
import { SectorSessionStateService } from '@app/conflict-tools/sector-meet/shared/sector-session-state.service';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'attachment-meet',
    templateUrl: 'attachment-meet.component.html',
    styleUrls: [
        'attachment-meet.component.css'
    ]
})
export class AttachmentMeetComponent extends AppComponentBase {

    state: SectorSessionStateService;

    constructor(_injector: Injector) {
        super(_injector);
        this.state = _injector.get(SectorSessionStateService);
        console.log("state:",this.state)
    }

    removeAttachment(index: number) {
        this.message.confirm('¿Esta seguro de eliminar el registro seleccionado?', 'Aviso', confirmation => {
            if (confirmation) {
                this.state.sectorMeetSession.uploadFilesPDF.splice(index, 1);
            }
        });
    }
}