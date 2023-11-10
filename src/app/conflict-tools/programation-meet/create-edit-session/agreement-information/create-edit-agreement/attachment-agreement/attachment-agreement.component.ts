import { Component, Injector } from '@angular/core';
import { ProgramationSessionStateService } from '@app/conflict-tools/programation-meet/shared/programation-session-state.service';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'attachment-agreement',
    templateUrl: 'attachment-agreement.component.html',
    styleUrls: [
        'attachment-agreement.component.css'
    ]
})
export class AttachmentagreementComponent extends AppComponentBase {

    state: ProgramationSessionStateService;

    constructor(_injector: Injector) {
        super(_injector);
        this.state = _injector.get(ProgramationSessionStateService);
    }

    removeAttachment(index: number) {
        this.message.confirm('¿Esta seguro de eliminar el registro seleccionado?', 'Aviso', confirmation => {
            if (confirmation) {
                this.state.sectorMeetSession.uploadFiles.splice(index, 1);
            }
        });
    }
}