import { HttpResponse } from '@angular/common/http';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FileDownloadComponent } from '@shared/component/file-download/file-download.component';
import { FindSocialConflictComponent } from '@shared/component/find-social-conflict/find-social-conflict.component';
import { ReportServiceProxy, ReportType } from '@shared/service-proxies/application/report-proxie';
import { SocialConflictAlertConflictDto, SocialConflictAlertDepartmentDto, SocialConflictAlertDto, SocialConflictAlertRiskLocationDto, SocialConflictAlertRiskDto, SocialConflictAlertServiceProxy, SocialConflictAlertTerritorialUnitDto, SocialConflictAlertSectorDto, SocialConflictAlertSectorLocationDto, SocialConflictAlertStateLocationDto, SocialConflictAlertSealDto, SocialConflictAlertSealLocationDto, SocialConflictAlertActorTypeDto, SocialConflictAlertActorMovementDto, SocialConflictAlertActorLocationDto, SocialConflictAlertPersonDto, SocialConflictAlertTypologyDto, SocialConflictAlertDemandDto, SocialConflictAlertResponsibleDto } from '@shared/service-proxies/application/social-conflict-alert-proxie';
import { UploadServiceProxy } from '@shared/service-proxies/application/upload-proxie';
import { ConditionType, UtilitySocialConflictDto } from '@shared/service-proxies/application/utility-proxie';
import { TokenService } from 'abp-ng2-module';
import { finalize } from 'rxjs/operators';
import { ActorInformationSocialConflictAlertComponent } from './actor-information/actor-information.component';
import { CreateEditActorInformationSocialConflictAlertComponent } from './actor-information/edit-actor-information/edit-actor-information.component';
import { AditionalInformationSocialConflictAlertComponent } from './aditional-information/aditional-information.component';
import { EmailSenderInformationSocialConflictAlertComponent } from './email-sender/email-sender.component';
import { GeneralInformationSocialConflictAlertComponent } from './general-information/general-information.component';
import { CreateEditRiskInformationSocialConflictAlertComponent } from './risk-information/create-edit-risk-information/create-edit-risk-information.component';
import { RiskInformationSocialConflictAlertComponent } from './risk-information/risk-information.component';
import { CreateEditSealInformationSocialConflictAlertComponent } from './seal-information/create-edit-seal-information/create-edit-seal-information.component';
import { SealInformationSocialConflictAlertComponent } from './seal-information/seal-information.component';
import { CreateEditSectorInformationSocialConflictAlertComponent } from './sector-information/create-edit-sector-information/create-edit-sector-information.component';
import { SectorInformationSocialConflictAlertComponent } from './sector-information/sector-information.component';
import { CreateEditStateInformationSocialConflictAlertComponent } from './state-information/create-edit-state-information/create-edit-state-information.component';
import { StateInformationSocialConflictAlertComponent } from './state-information/state-information.component';

@Component({
    templateUrl: 'create-edit-social-conflict-alert.component.html',
    styleUrls: [
        'create-edit-social-conflict-alert.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class CreateEditSocialConflictAlertComponent extends AppComponentBase implements OnInit {

    @ViewChild('generalInformation', { static: false }) generalInformation: GeneralInformationSocialConflictAlertComponent;
    @ViewChild('aditionalInformation', { static: false }) aditionalInformation: AditionalInformationSocialConflictAlertComponent;
    @ViewChild('actorInformation', { static: false }) actorInformation: ActorInformationSocialConflictAlertComponent;
    @ViewChild('riskInformation', { static: false }) riskInformation: RiskInformationSocialConflictAlertComponent;
    @ViewChild('sectorInformation', { static: false }) sectorInformation: SectorInformationSocialConflictAlertComponent;
    @ViewChild('stateInformation', { static: false }) stateInformation: StateInformationSocialConflictAlertComponent;
    @ViewChild('sealInformation', { static: false }) sealInformation: SealInformationSocialConflictAlertComponent;

    @ViewChild('findSocialConflictModal', { static: false }) findSocialConflictModal: FindSocialConflictComponent;
    @ViewChild('createEditActorModal', { static: false }) createEditActorModal: CreateEditActorInformationSocialConflictAlertComponent;
    @ViewChild('createEditRiskModal', { static: false }) createEditRiskModal: CreateEditRiskInformationSocialConflictAlertComponent;
    @ViewChild('createEditSectorModal', { static: false }) createEditSectorModal: CreateEditSectorInformationSocialConflictAlertComponent;
    @ViewChild('createEditStateModal', { static: false }) createEditStateModal: CreateEditStateInformationSocialConflictAlertComponent;
    @ViewChild('createEditSealModal', { static: false }) createEditSealModal: CreateEditSealInformationSocialConflictAlertComponent;
    @ViewChild('emailSenderModal', { static: false }) emailSenderModal: EmailSenderInformationSocialConflictAlertComponent;

    @ViewChild('fileDownloader', { static: false }) fileDownloader: FileDownloadComponent;

    id: number;
    returnUrl: string;

    socialConflictAlert: SocialConflictAlertDto;

    departments: SocialConflictAlertDepartmentDto[];
    territorialUnits: SocialConflictAlertTerritorialUnitDto[];
    risks: SocialConflictAlertRiskDto[];
    sectors: SocialConflictAlertSectorDto[];
    seals: SocialConflictAlertSealDto[];
    actorTypes: SocialConflictAlertActorTypeDto[];
    actorMovements: SocialConflictAlertActorMovementDto[];
    persons: SocialConflictAlertPersonDto[];
    typologies: SocialConflictAlertTypologyDto[];
    demands: SocialConflictAlertDemandDto[];
    responsibles: SocialConflictAlertResponsibleDto[];

    tabIndex: number = 0;
    busy: boolean = false;
    loaded: boolean = false;

    conditionTypes = {
        open: ConditionType.Open,
        closed: ConditionType.Closed
    };
    
    constructor(
        _injector: Injector,
        private _route: ActivatedRoute,
        private _tokenService: TokenService,
        private _uploadServiceProxy: UploadServiceProxy,
        private _socialConflictAlertServiceProxy: SocialConflictAlertServiceProxy,
        private _reportServiceProxy: ReportServiceProxy) {
        super(_injector);
        this.primengTableHelper.defaultRecordsCountPerPage = 500;
    }

    ngOnInit() {
        const parameter = this._route.snapshot.paramMap.get('id');
        const tabId: number = +this.getQueryParameter('tab');

        this.id = parameter ? +parameter.replace('[^0-9]', '') : undefined;
        this.returnUrl = this.getQueryParameter('returnUrl');

        if (this.id && !this.isGranted('Pages.Application.SocialConflictAlert.Edit')) {
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción');
            this.backButtonPressed();
            return;
        }

        if (!this.id && !this.isGranted('Pages.Application.SocialConflictAlert.Create')) {
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción');
            this.backButtonPressed();
            return;
        }
        setTimeout(() => {

            this.showMainSpinner('Cargando información');

            this._socialConflictAlertServiceProxy
                .get(this.id)
                .subscribe(response => {
                    this.departments = response.departments;
                    this.territorialUnits = response.territorialUnits;
                    this.risks = response.risks;
                    this.sectors = response.sectors;
                    this.seals = response.seals;
                    this.actorTypes = response.actorTypes;
                    this.actorMovements = response.actorMovements;
                    this.persons = response.persons;
                    this.typologies = response.typologies;
                    this.demands = response.demands;
                    this.responsibles = response.responsibles;
                    this.socialConflictAlert = response.socialConflictAlert;
                    this.loaded = true;
                    if(tabId) 
                        this.tabIndex = tabId;
                    setTimeout(() => this.hideMainSpinner(), 1000);
                }, () => {
                    this.hideMainSpinner();
                    this.backButtonPressed();
                });

        }, 500);
    }

    showDownloader() {
        this.fileDownloader.show(`Alerta de situaciones conflictivas ${this.socialConflictAlert.code}`, this.socialConflictAlert, ReportType.PDF);
    }

    completeDownload(event: { format: ReportType, parameter: SocialConflictAlertDto }) {
        this.showMainSpinner('Generando reporte, por favor espere...');

        const fileName: string = `ALERTA_SGSD_${event.parameter.generation ? ((event.parameter.count < 10 ? "0" : "") + event.parameter.count + "_" + event.parameter.year) : event.parameter.id.toString()}`;

        this._reportServiceProxy
            .createSocialConflictAlert(event.parameter.id, event.format)
            .pipe(finalize(() => this.hideMainSpinner()))
            .subscribe((response) => {
                const fileURL: any = URL.createObjectURL(response);
                const a = document.createElement("a");
                a.href = fileURL;
                a.download = fileName;
                a.click();
            });
    }

    findSocialConflict() {
        this.findSocialConflictModal.show();
    }

    selectSocialConflict(socialConflict: UtilitySocialConflictDto) {
        this.socialConflictAlert.socialConflict = new SocialConflictAlertConflictDto({
            id: socialConflict.id,
            code: socialConflict.code,
            caseName: socialConflict.caseName
        });
    }

    addActor() {
        this.createEditActorModal.show(undefined, undefined, this.actorTypes, this.actorMovements);
    }

    editActor(event: { index: number, value: SocialConflictAlertActorLocationDto }) {
        this.createEditActorModal.show(event.index, event.value, this.actorTypes, this.actorMovements);
    }

    saveActor(event: { value: SocialConflictAlertActorLocationDto, index: number }) {
        this.actorInformation.addOrUpdateItem(event);
    }

    addRisk() {
        this.createEditRiskModal.show(undefined, undefined, this.risks);
    }

    editRisk(event: { index: number, value: SocialConflictAlertRiskLocationDto }) {
        this.createEditRiskModal.show(event.index, event.value, this.risks);
    }

    saveRisk(event: { value: SocialConflictAlertRiskLocationDto, index: number }) {
        this.riskInformation.addOrUpdateItem(event);
    }

    addSector() {
        this.createEditSectorModal.show(undefined, undefined, this.sectors);
    }

    editSector(event: { index: number, value: SocialConflictAlertSectorLocationDto }) {
        this.createEditSectorModal.show(event.index, event.value, this.sectors);
    }

    saveSector(event: { value: SocialConflictAlertSectorLocationDto, index: number }) {
        this.sectorInformation.addOrUpdateItem(event);
    }

    addState() {
        this.createEditStateModal.show(undefined, undefined);
    }

    editState(event: { index: number, value: SocialConflictAlertStateLocationDto }) {
        this.createEditStateModal.show(event.index, event.value);
    }

    saveState(event: { value: SocialConflictAlertStateLocationDto, index: number }) {
        this.stateInformation.addOrUpdateItem(event);
    }

    addSeal() {
        this.createEditSealModal.show(undefined, undefined, this.seals);
    }

    editSeal(event: { index: number, value: SocialConflictAlertSealLocationDto }) {
        this.createEditSealModal.show(event.index, event.value, this.seals);
    }

    saveSeal(event: { value: SocialConflictAlertSealLocationDto, index: number }) {
        this.sealInformation.addOrUpdateItem(event);
    }

    showEmailSender() {
        this.emailSenderModal.show(this.socialConflictAlert);
    }

    save() {
        if (!this.socialConflictAlert.alertTime) {
            this.message.info('Debes seleccionar la fecha de emisión del alerta antes de continuar');
            return;
        }
        if (this.isNullEmptyOrWhiteSpace(this.socialConflictAlert.description)) {
            this.message.info('Debes ingresar la descripción del alerta antes de continuar');
            return;
        }
        this.uploadImages();
    }

    backButtonPressed() {
        if (this.returnUrl == 'actors')
            this.router.navigate(['/app/application/social-conflict-actors'], { queryParams: {} });
        else
            this.router.navigate(['/app/application/alerts'], { queryParams: {} });
    }

    private completeSave() {
        this.changeMainSpinner('Guardando información, por favor espere...');

        if (this.id)
            this._socialConflictAlertServiceProxy
                .update(this.socialConflictAlert)
                .subscribe(() => {
                    this.loaded = false;
                    this.notify.success('Se actualizó correctamente el alerta', 'Aviso');
                    this.ngOnInit();
                }, () => setTimeout(() => this.hideMainSpinner(), 500));
        else
            this._socialConflictAlertServiceProxy
                .create(this.socialConflictAlert)
                .subscribe((response) => {
                    this.notify.success('Se registro correctamente el alerta', 'Aviso');
                    this.router.navigate(['/app/application/edit-alert', response.id]);
                }, () => setTimeout(() => this.hideMainSpinner(), 500));
    }

    private uploadImages() {
        this.showMainSpinner('Guardando información, por favor espere...');

        if (this.socialConflictAlert.uploadFiles.length == 0) {
            this.completeSave();
            return;
        }

        this.changeMainSpinner('Subiendo archivos, por favor espere...');

        this._uploadServiceProxy
            .uploadFiles(this.socialConflictAlert.uploadFiles.map(p => p.file), this._tokenService.getToken())
            .subscribe(event => {
                if (event instanceof HttpResponse) {
                    if (event.body.success) {
                        let index: number = 0;
                        for (let token of event.body.result.fileTokens) {
                            this.socialConflictAlert.uploadFiles[index].token = token;
                            index++;
                        }
                        this.completeSave();
                    } else {
                        this.hideMainSpinner();
                        this.message.info(event.body.error?.details ? event.body.error?.details : 'No se pudo completar la transacción, intente nuevamente mas tarde', 'Aviso');
                    }
                }
            }, (error) => {
                this.hideMainSpinner();
                this.message.error(error?.error?.error?.details ? error.error.error.details : 'No se pudo completar la transacción, intente nuevamente mas tarde', 'Aviso');
            });
    }
}