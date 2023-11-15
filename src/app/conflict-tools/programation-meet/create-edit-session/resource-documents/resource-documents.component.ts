import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PersonType } from '@shared/service-proxies/service-proxies';
import { ProgramationSessionStateService } from '../../shared/programation-session-state.service';

@Component({
    selector: 'resource-documents',
    templateUrl: 'resource-documents.component.html',
    styleUrls: [
        'resource-documents.component.css'
    ]
})
export class ResourceDocumentsComponent extends AppComponentBase implements OnInit {
    
    state: ProgramationSessionStateService;
    
    personTypes = {
        none: PersonType.None,
        coordinator: PersonType.Coordinator,
        manager: PersonType.Manager,
        analyst: PersonType.Analyst
    }
    
    constructor(_injector: Injector) {
        super(_injector);
        this.state = _injector.get(ProgramationSessionStateService);
    }

    ngOnInit() { }
}