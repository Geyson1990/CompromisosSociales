import { Component, Injector } from '@angular/core';
import { ProgramationSessionStateService } from '@app/conflict-tools/programation-meet/shared/programation-session-state.service';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'attachment-meet',
    templateUrl: 'attachment-meet.component.html',
    styleUrls: [
        'attachment-meet.component.css'
    ]
})
export class AttachmentMeetComponent extends AppComponentBase {

    state: ProgramationSessionStateService;

    constructor(_injector: Injector) {
        super(_injector);
        this.state = _injector.get(ProgramationSessionStateService);
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