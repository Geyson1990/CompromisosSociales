import { Component, Injector } from '@angular/core';
import { SectorMeetStateService } from '@app/conflict-tools/sector-meet/shared/sector-meet-state.service';
import { SectorSessionStateService } from '@app/conflict-tools/sector-meet/shared/sector-session-state.service';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'files-attachment-meet',
    templateUrl: 'attachment-meet.component.html',
    styleUrls: [
        'attachment-meet.component.css'
    ]
})
export class FilesAttachmentMeetComponent extends AppComponentBase {

    state: SectorMeetStateService;

    constructor(_injector: Injector) {
        super(_injector);
        this.state = _injector.get(SectorMeetStateService);
        console.log("state:",this.state)
    }

    removeAttachment(index: number) {
        this.message.confirm('¿Esta seguro de eliminar el registro seleccionado?', 'Aviso', confirmation => {
            if (confirmation) {
                this.state.sectorMeet.uploadFiles.splice(index, 1);
            }
        });
    }
}