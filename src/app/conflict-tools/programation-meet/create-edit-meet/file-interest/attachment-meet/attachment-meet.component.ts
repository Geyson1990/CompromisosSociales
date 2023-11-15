import { Component, Injector } from '@angular/core';
import { ProgramationMeetStateService } from '@app/conflict-tools/programation-meet/shared/programation-meet-state.service';
import { ProgramationSessionStateService } from '@app/conflict-tools/programation-meet/shared/programation-session-state.service';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'files-attachment-meet',
    templateUrl: 'attachment-meet.component.html',
    styleUrls: [
        'attachment-meet.component.css'
    ]
})
export class FilesAttachmentMeetComponent extends AppComponentBase {

    state: ProgramationMeetStateService;

    constructor(_injector: Injector) {
        super(_injector);
        this.state = _injector.get(ProgramationMeetStateService);
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