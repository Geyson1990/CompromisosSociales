import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FileDownloadRequestComponent } from '@shared/component/file-download-request/file-download-request.component';
import { FileDownloadComponent } from '@shared/component/file-download/file-download.component';
import { FindSocialConflictComponent } from '@shared/component/find-social-conflict/find-social-conflict.component';
import { ReportServiceProxy, ReportType } from '@shared/service-proxies/application/report-proxie';
import { SectorMeetDto, SectorMeetServiceProxy, SectorMeetSocialConflict } from '@shared/service-proxies/application/sector-meet-proxie';
import { SectorMeetSessionDto } from '@shared/service-proxies/application/sector-meet-session-proxie';
import { UtilitySocialConflictDto } from '@shared/service-proxies/application/utility-proxie';
import { finalize } from 'rxjs/operators';
import { SectorMeetStateService } from '../shared/sector-meet-state.service';

@Component({
    templateUrl: 'create-edit-sector-meet.component.html',
    styleUrls: [
        'create-edit-sector-meet.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class CreateEditSectorMeetComponent extends AppComponentBase implements OnInit {

    @ViewChild('findSocialConflictModal', { static: false }) findSocialConflictModal: FindSocialConflictComponent;
    @ViewChild('fileDownloader', { static: true }) fileDownloader: FileDownloadComponent;
    @ViewChild('fileDownloadRequest', { static: true }) fileDownloadRequest: FileDownloadRequestComponent;

    id: number;
    loaded: boolean = false;
    busy: boolean = false;
    tabIndex: number = 0;

    state: SectorMeetStateService;

    constructor(_injector: Injector, private _activatedRoute: ActivatedRoute, private _sectorMeetServiceProxy: SectorMeetServiceProxy, private _reportServiceProxy: ReportServiceProxy) {
        super(_injector);
        this.state = _injector.get(SectorMeetStateService);
    }

    ngOnInit() {
        const parameter = this._activatedRoute.snapshot.paramMap.get('id');

        this.id = parameter ? +parameter.replace('[^0-9]', '') : undefined;

        if (this.id && !this.isGranted('Pages.ConflictTools.SectorMeet.Edit')) {
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción');
            this.backButtonPressed();
            return;
        }

        if (!this.id && !this.isGranted('Pages.ConflictTools.SectorMeet.Create')) {
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción');
            this.backButtonPressed();
            return;
        }

        setTimeout(() => {

            this.showMainSpinner('Cargando información');

            this._sectorMeetServiceProxy
                .get(this.id)
                .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1500)))
                .subscribe(response => {
                    this.state.territorialUnits = response.territorialUnits;

                    if (response.sectorMeet)
                        this.state.sectorMeet = response.sectorMeet;
                    else
                        this.state.sectorMeet = new SectorMeetDto();

                    this.loaded = true;
                }, () => this.backButtonPressed());

        }, 500);
    }

    showSocialConflictModal() {
        this.findSocialConflictModal.show();
    }

    addSession() {
        if (this.id) {
            this.goToSession();
        } else {
            this.message.confirm('Se registrará la reunión multisectorial para habilitar la creación de sesiones. ¿Esta seguro de continuar?', 'Aviso', confirmation => {
                if (confirmation) {
                    this.goToSession();
                }
            });
        }
    }

    editSession(session: SectorMeetSessionDto) {
        this.goToSession(session.id);
    }

    selectSocialConflict(socialConflict: UtilitySocialConflictDto) {
        this.state.sectorMeet.socialConflict = new SectorMeetSocialConflict({
            id: socialConflict.id,
            code: socialConflict.code,
            caseName: socialConflict.caseName
        });
        if (socialConflict.locations.length > 0) {
            const locationIndex: number = this.state.territorialUnits.findIndex(p => p.id == socialConflict.locations[0].territorialUnit.id);
            if (locationIndex != -1) {
                this.state.sectorMeet.territorialUnit = this.state.territorialUnits[locationIndex];
            }
        }
    }

    save(callback?: (id: number) => void) {

        if (this.isNullEmptyOrWhiteSpace(this.state.sectorMeet.meetName)) {
            this.message.info('Debe ingresar el nombre de la reunión antes de guardar los cambios');
            return;
        }

        if (this.state.sectorMeet.territorialUnit.id == -1) {
            this.message.info('Debe seleccionar la unidad territorial antes de guardar los cambios');
            return;
        }

        if (this.state.sectorMeet.replaceCode) {
            if (+this.state.sectorMeet.replaceCode <= 0 || (<any>this.state.sectorMeet.replaceCode + '').trim() == '') {
                this.message.info('El Código (Número) de reemplazo es obligatorio', 'Aviso');
                return;
            }
            if (+this.state.sectorMeet.replaceYear <= 0 || (<any>this.state.sectorMeet.replaceYear + '').trim() == '') {
                this.message.info('El Código (Año) de reemplazo es obligatorio', 'Aviso');
                return;
            }
        }

        this.showMainSpinner('Guardando información, por favor espere...');
        this.completeSaving(callback);
    }

    showDownloader(sectorMeetSession: SectorMeetSessionDto) {
        this.fileDownloader.formats.pdf.enabled = true;
        this.fileDownloader.formats.xlsx.enabled = true;
        this.fileDownloader.show(`Archivo de sesión de reuniones ${this.state.sectorMeet.code}`, sectorMeetSession, ReportType.DOCX);
    }

    completeDownload(event: { format: ReportType, parameter: SectorMeetSessionDto }) {
        this.showMainSpinner('Generando reporte, por favor espere...');

        const fileName: string = `RE_${this.state.sectorMeet.count < 10 ? '0' : ''}${this.state.sectorMeet.count}_${this.state.sectorMeet.year}`;

        this.fileDownloadRequest.show();
        this._reportServiceProxy
            .createSectorMeetSession(event.parameter.id, event.format)
            .pipe(finalize(() => {
                this.hideMainSpinner();
                this.fileDownloadRequest.hide();
            })).subscribe((response) => {
                const fileURL: any = URL.createObjectURL(response);
                const a = document.createElement("a");
                a.href = fileURL;
                a.download = fileName;
                a.click();
            });
    }

    backButtonPressed() {
        this.router.navigate(['/app/conflict-tools/sector-meet/dashboard']);
    }

    private goToSession(sessionId?: number) {
        this.save((sectorMeetId: number) => {
            this.hideMainSpinner();
            if (sessionId)
                this.router.navigate(['/app/conflict-tools/sector-meet/edit-session', sectorMeetId, sessionId]);
            else
                this.router.navigate(['/app/conflict-tools/sector-meet/create-session', sectorMeetId]);
        });
    }

    private completeSaving(callback?: (id: number) => void) {
        this.showMainSpinner('Guardando información, por favor espere...');

        if (this.id)
            this._sectorMeetServiceProxy
                .update(this.state.sectorMeet)
                .subscribe(() => {
                    if (callback) {
                        setTimeout(() => {
                            this.hideMainSpinner();
                            callback(this.state.sectorMeet.id);
                        }, 1000);
                    } else {
                        this.loaded = false;
                        this.notify.success('Se actualizó correctamente la información', 'Aviso');
                        this.resetAndInit();
                    }
                }, () => setTimeout(() => this.hideMainSpinner(), 1500));
        else
            this._sectorMeetServiceProxy
                .create(this.state.sectorMeet)
                .subscribe((response) => {
                    if (callback) {
                        setTimeout(() => {
                            this.hideMainSpinner();
                            callback(response.id);
                        }, 1000);
                    } else {
                        this.loaded = false;
                        this.notify.success('Se registro correctamente la información', 'Aviso');
                        this.router.navigate(['/app/conflict-tools/sector-meet/edit', response.id]);
                    }
                }, () => setTimeout(() => this.hideMainSpinner(), 1500));
    }

    private resetAndInit() {
        this.loaded = false;
        this.busy = false;
        this.ngOnInit();
    }
}