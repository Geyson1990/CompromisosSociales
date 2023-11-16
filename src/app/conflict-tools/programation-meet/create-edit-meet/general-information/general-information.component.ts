import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SectorMeetSessionDto, SectorMeetSessionServiceProxy, SectorMeetSessionType } from '@shared/service-proxies/application/sector-meet-session-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { ProgramationMeetStateService } from '../../shared/programation-meet-state.service';
import { SectorMeetSessionProgramServiceProxy } from '@shared/service-proxies/application/sector-meet-session-program-proxie';

@Component({
    selector: 'general-information',
    templateUrl: 'general-information.component.html',
    styleUrls: [
        'general-information.component.css'
    ]
})
export class GeneralInformationComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;


    @Output() showAddSession: EventEmitter<void> = new EventEmitter<void>();
    @Output() showEditSession: EventEmitter<SectorMeetSessionDto> = new EventEmitter<SectorMeetSessionDto>();
    @Output() showSocialConflictModal: EventEmitter<void> = new EventEmitter<void>();
    @Output() showReport: EventEmitter<SectorMeetSessionDto> = new EventEmitter<SectorMeetSessionDto>();
    
    meetingRiskLevels: any[] = [
        {
            id: 1,
            name: "Nivel de riesgo 1",
        },{
            id: 2,
            name: "Nivel de riesgo 2",
        }
    ];
    typesMeeting: any[] = [{
        id: 1,
        name: "tipo de reunión 1"
    }, {
        id: 2,
        name: "tipo de reunión 2"
    }]

    state: ProgramationMeetStateService;
    types = {
        none: SectorMeetSessionType.NONE,
        presential: SectorMeetSessionType.PRESENTIAL,
        remote: SectorMeetSessionType.REMOTE
    }

    get finalCode(): string {
        return (this.state.sectorMeet?.replaceCount ? this.state.sectorMeet?.replaceCount : '') + ' - ' +
            (this.state.sectorMeet?.replaceYear ? this.state.sectorMeet?.replaceYear : '');
    }

    get socialConflictTitle(): string {
        if (this.state.sectorMeet?.socialConflict)
            return `${this.state.sectorMeet?.socialConflict.code} - ${this.state.sectorMeet?.socialConflict.caseName}`;

        return 'Presione el botón de búsqueda para seleccionar un caso conflictivo';
    }

    constructor(_injector: Injector, private _sectorMeetSessionServiveProxy: SectorMeetSessionProgramServiceProxy) {
        super(_injector);
        this.state = _injector.get(ProgramationMeetStateService);
        this.state.sectorMeet.state = 0;
        this.state.sectorMeet.modality = 0;
        this.state.sectorMeet.rolId = 0;
        this.state.sectorMeet.object = '';
    }

    addSession() {
        this.showAddSession.emit();
    }

    editSession(session: SectorMeetSessionDto) {
        this.showEditSession.emit(session);
    }

    createReport(session: SectorMeetSessionDto) {
        this.showReport.emit(session);
    }

    deleteSession(session: SectorMeetSessionDto) {
        this.message.confirm('¿Esta seguro de continuar, se eliminará la sesión seleccionada?', 'Aviso', confirmation => {
            if (confirmation) {
                this.showMainSpinner('Actualizando información, por favor espere...');
                this._sectorMeetSessionServiveProxy
                    .delete(session.id)
                    .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 500)))
                    .subscribe(() => {
                        this.getData();
                    });
            }
        });
    }

    findSocialConflict() {
        this.showSocialConflictModal.emit();
    }

    removeSocialConflict() {
        this.message.confirm('¿Estas seguro de eliminar el caso seleccionado?', 'Aviso', confirmation => {
            if (confirmation) {
                this.state.sectorMeet.socialConflict = undefined;
            }
        });
    }


    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._sectorMeetSessionServiveProxy.getAll(
            undefined,
            this.state.sectorMeet.id ?? 0,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event)
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }
}