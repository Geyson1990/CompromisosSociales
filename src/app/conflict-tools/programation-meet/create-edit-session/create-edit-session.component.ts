import { HttpResponse } from '@angular/common/http';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SectorMeetSessionActionLocationDto, SectorMeetSessionAgreementLocationDto, SectorMeetSessionCriticalAspectLocationDto, SectorMeetSessionLeaderRelationDto, SectorMeetSessionScheduleLocationDto, SectorMeetSessionServiceProxy, SectorMeetSessionSummaryLocationDto, SectorMeetSessionTeamRelationDto, SectorMeetSessionType } from '@shared/service-proxies/application/sector-meet-session-proxie';
import { UploadServiceProxy } from '@shared/service-proxies/application/upload-proxie';
import { TokenService } from 'abp-ng2-module';
// import { ActionInformationComponent } from './action-information/action-information.component';
// import { CreateEditActionInformationComponent } from './action-information/create-edit-action/create-edit-action-information.component';
// import { AgreementInformationComponent } from './agreement-information/agreement-information.component';
// import { CreateEditAgreementInformationComponent } from './agreement-information/create-edit-agreement/create-edit-agreement-information.component';
import { CreateEditCriticalAspectInformationComponent } from './critical-aspect-information/create-edit-critical-aspect/create-edit-critical-aspect-information.component';
import { CriticalAspectInformationComponent } from './critical-aspect-information/critical-aspect-information.component';
import { CreateEditScheduleInformationComponent } from './schedule-information/create-edit-schedule/create-edit-schedule-information.component';
import { ScheduleInformationComponent } from './schedule-information/schedule-information.component';
// import { CreateEditSummaryInformationComponent } from './summary-information/create-edit-summary/create-edit-summary-information.component';
// import { SummaryInformationComponent } from './summary-information/summary-information.component';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';
import { CreateEditLeaderInformationComponent } from './registration-information/leader-information/leader-information.component';
import { UtilityDirectoryGovernmentDto, UtilityDirectoryIndustryDto } from '@shared/service-proxies/application/utility-proxie';
import { FindDirectoryGovernmentComponent } from '@shared/component/find-directory-government/find-directory-government.component';
import { RegistrationInformationComponent } from './registration-information/registration-information.component';
import { FindDirectoryIndustryComponent } from '@shared/component/find-directory-industry/find-directory-industry.component';
import { TeamInformationComponent } from './registration-information/team-information/team-information.component';
import { CreateEditTeamInformationComponent } from './registration-information/team-information/create-edit-team/create-edit-team.component';
import { CreateEditRiskFactorWeekComponent } from './risk-factors-week/create-edit-risk-factors-week/create-edit-risk-factors-week.component';
import { RiskFactorWeekComponent } from './risk-factors-week/risk-factors-week.component';
import { SectorSessionStateService } from '@app/conflict-tools/sector-meet/shared/sector-session-state.service';
// import { FindLeaderSectorMeetSessionComponent } from './summary-information/find-leader/find-leader.component';

@Component({
    templateUrl: 'create-edit-session.component.html',
    styleUrls: [
        'create-edit-session.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class CreateEditSessionComponent extends AppComponentBase implements OnInit {
 
    @ViewChild('registrationInformation', { static: false }) registrationInformation: RegistrationInformationComponent;
    @ViewChild('scheduleInformation', { static: false }) scheduleInformation: ScheduleInformationComponent;
    // @ViewChild('agreementInformation', { static: false }) agreementInformation: AgreementInformationComponent;
    @ViewChild('criticalAspectInformation', { static: false }) criticalAspectInformation: CriticalAspectInformationComponent;
    // @ViewChild('actionInformation', { static: false }) actionInformation: ActionInformationComponent;
    // @ViewChild('summaryInformation', { static: false }) summaryInformation: SummaryInformationComponent;

    @ViewChild('createEditScheduleModal', { static: false }) createEditScheduleModal: CreateEditScheduleInformationComponent;
    // @ViewChild('createEditAgreementModal', { static: false }) createEditAgreementModal: CreateEditAgreementInformationComponent;
    @ViewChild('createEditCriticalAspectModal', { static: false }) createEditCriticalAspectModal: CreateEditCriticalAspectInformationComponent;
    @ViewChild('riskFactorWeekComponent', { static: false }) riskFactorWeekComponent: RiskFactorWeekComponent;
    @ViewChild('createEditRiskFactorWeekModal', { static: false }) createEditRiskFactorWeekModal: CreateEditRiskFactorWeekComponent;

    // @ViewChild('createEditActionModal', { static: false }) createEditActionModal: CreateEditActionInformationComponent;
    // @ViewChild('createEditSummaryModal', { static: false }) createEditSummaryModal: CreateEditSummaryInformationComponent;
    @ViewChild('createEditLeaderModal', { static: false }) createEditLeaderModal: CreateEditLeaderInformationComponent;
    @ViewChild('createEditTeamModal', { static: false }) createEditTeamModal: CreateEditTeamInformationComponent;

    @ViewChild('teamInformationModal', { static: false }) teamInformationModal: TeamInformationComponent;

    @ViewChild('findDirectoryGovernmentModal', { static: false }) findDirectoryGovernmentModal: FindDirectoryGovernmentComponent;
    @ViewChild('findDirectoryIndustryModal', { static: false }) findDirectoryIndustryModal: FindDirectoryIndustryComponent;
    // @ViewChild('findSectorMeetSessionModal', { static: false }) findSectorMeetSessionModal: FindLeaderSectorMeetSessionComponent;
    
    id: number;
    meetId: number;
    loaded: boolean = false;
    busy: boolean = false;
    tabIndex: number = 0;

    state: SectorSessionStateService;

    types = {
        none: SectorMeetSessionType.NONE,
        presential: SectorMeetSessionType.PRESENTIAL,
        remote: SectorMeetSessionType.REMOTE
    }
    
    constructor(_injector: Injector,
        private _activatedRoute: ActivatedRoute,
        private _sectorMeetSessionServiceProxy: SectorMeetSessionServiceProxy,
        private _uploadServiceProxy: UploadServiceProxy,
        private _tokenService: TokenService) {
        super(_injector);
        this.state = _injector.get(SectorSessionStateService);
    }

    ngOnInit() {
        const idParameter = this._activatedRoute.snapshot.paramMap.get('id');
        const meetParameter = this._activatedRoute.snapshot.paramMap.get('meet');

        this.id = idParameter ? +idParameter.replace('[^0-9]', '') : undefined;
        this.meetId = meetParameter ? +meetParameter.replace('[^0-9]', '') : undefined;

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

            this._sectorMeetSessionServiceProxy
                .get(this.meetId, this.id)
                .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1500)))
                .subscribe(response => {
                    this.state.departments = response.departments;
                    this.state.persons = response.persons;
                    this.state.sectorMeetSession = response.sectorMeetSession;
                    this.state.sessionDate = response.sectorMeetSession.sessionTime ? response.sectorMeetSession.sessionTime.toDate() : <any>undefined;
                    this.state.sessionTime = response.sectorMeetSession.sessionTime ? response.sectorMeetSession.sessionTime.toDate() : <any>undefined;
                    this.state.personTime = response.sectorMeetSession.personTime ? response.sectorMeetSession.personTime.toDate() : <any>undefined;
                    this.loaded = true;
                }, () => this.backButtonPressed());

        }, 500);
    }

    addSchedule() {
        this.createEditScheduleModal.show(undefined, undefined);
    }

    editSchedule(event: { index: number, value: SectorMeetSessionScheduleLocationDto }) {
        this.createEditScheduleModal.show(event.index, event.value);
    }

    saveSchedule(event: { index: number, value: SectorMeetSessionScheduleLocationDto }) {
        this.scheduleInformation.addOrUpdateItem(event);
    }

    addAgreement() {
        // this.createEditAgreementModal.show(undefined, undefined);
    }

    editAgreement(event: { index: number, value: SectorMeetSessionAgreementLocationDto }) {
        // this.createEditAgreementModal.show(event.index, event.value);
    }

    saveAgreement(event: { index: number, value: SectorMeetSessionAgreementLocationDto }) {
        // this.agreementInformation.addOrUpdateItem(event);
    }

    addCriticalAspect() {
        this.createEditCriticalAspectModal.show(undefined, undefined);
    }

    editCriticalAspect(event: { index: number, value: SectorMeetSessionCriticalAspectLocationDto }) {
        this.createEditCriticalAspectModal.show(event.index, event.value);
    }

    addRiskFactorWeek() {
        this.createEditRiskFactorWeekModal.show(undefined, undefined);
    }

    editRiskFactorWeek(event: { index: number, value: SectorMeetSessionCriticalAspectLocationDto }) {
        this.createEditRiskFactorWeekModal.show(event.index, event.value);
    }

    saveCriticalAspect(event: { index: number, value: SectorMeetSessionCriticalAspectLocationDto }) {
        this.criticalAspectInformation.addOrUpdateItem(event);
    }

    saveRiskCriticalWeek(event: { index: number, value: SectorMeetSessionCriticalAspectLocationDto }) {
        this.riskFactorWeekComponent.addOrUpdateItem(event);
    }
 
    addAction() {
        // this.createEditActionModal.show(undefined, undefined);
    }

    editAction(event: { index: number, value: SectorMeetSessionActionLocationDto }) {
        // this.createEditActionModal.show(event.index, event.value);
    }

    saveAction(event: { index: number, value: SectorMeetSessionActionLocationDto }) {
        // this.actionInformation.addOrUpdateItem(event);
    }

    addSummary() {
        // this.createEditSummaryModal.show(undefined, undefined);
    }

    editSummary(event: { index: number, value: SectorMeetSessionSummaryLocationDto }) {
        // this.createEditSummaryModal.show(event.index, event.value);
    }

    saveSummary(event: { index: number, value: SectorMeetSessionSummaryLocationDto }) {
        // this.summaryInformation.addOrUpdateItem(event);
    }

    saveSummaryDirectory(sectorMeetSessionLeader: SectorMeetSessionLeaderRelationDto) {
        // this.createEditSummaryModal.addOrUpdateItem(sectorMeetSessionLeader);
    }

    addLeader() {
        this.createEditLeaderModal.show(undefined, undefined);
    }

    editLeader(event: { index: number, value: SectorMeetSessionLeaderRelationDto }) {
        this.createEditLeaderModal.show(event.index, event.value);
    }

    saveLeader(event: { index: number, value: SectorMeetSessionLeaderRelationDto }) {
        this.registrationInformation.addOrUpdateItem(event);
    }

    findDirectoryGovernment() {
        this.findDirectoryGovernmentModal.show();
    }

    findDirectoryIndustry() {
        this.findDirectoryIndustryModal.show();
    }

    saveDirectoryGoverment(event: UtilityDirectoryGovernmentDto) {
        this.createEditLeaderModal.selectDirectoryGovernment(event);
    }

    saveDirectoryIndustry(event: UtilityDirectoryIndustryDto) {
        this.createEditLeaderModal.selectDirectoryIndustry(event);
    }

    showTeam(event: { index: number, value: SectorMeetSessionLeaderRelationDto }) {
        this.teamInformationModal.show(event.index, event.value);
    }

    addTeam() {
        this.createEditTeamModal.show(undefined, undefined);
    }

    editTeam(event: { index: number, value: SectorMeetSessionTeamRelationDto }) {
        this.createEditTeamModal.show(event.index, event.value);
    }

    saveTeam(event: { index: number, value: SectorMeetSessionTeamRelationDto }) {
        this.teamInformationModal.addOrUpdateItem(event);
    }

    save() {
        let sessionDate: moment.Moment = this.state.sessionDate ? moment(this.state.sessionDate) : <any>undefined;
        let sessionTime: moment.Moment = this.state.sessionTime ? moment(this.state.sessionTime) : <any>undefined;
        let personTime: moment.Moment = this.state.personTime ? moment(this.state.personTime) : <any>undefined;

        if (!sessionDate || !sessionDate.isValid()) {
            this.message.error('La fecha de la sesión es obligatoria', 'Aviso');
            return;
        }
        if (!sessionTime || !sessionTime.isValid()) {
            this.message.error('La hora de la sesión es obligatoria', 'Aviso');
            return;
        }
        if(personTime && personTime.isValid()) {
            this.state.sectorMeetSession.personTime = personTime;
        } else {
            this.state.sectorMeetSession.personTime = undefined;
        }

        sessionDate.set('hour', sessionTime.hour());
        sessionDate.set('minute', sessionTime.minute());
        sessionDate.set('second', 0);
        
        this.state.sectorMeetSession.sessionTime = sessionDate;

        if (this.state.sectorMeetSession.type == SectorMeetSessionType.PRESENTIAL) {
            if (this.state.sectorMeetSession.department.id <= 0) {
                this.message.error('El departamento sede de la sesión es obligatoria', 'Aviso');
                return;
            }
            if (this.state.sectorMeetSession.province.id <= 0) {
                this.message.error('La provincia sede de la sesión es obligatoria', 'Aviso');
                return;
            }
            if (this.state.sectorMeetSession.district.id <= 0) {
                this.message.error('El distrito sede de la sesión es obligatoria', 'Aviso');
                return;
            }
            if (this.isNullEmptyOrWhiteSpace(this.state.sectorMeetSession.location)) {
                this.message.error('La descripción de la sede de la sesión es obligatoria', 'Aviso');
                return;
            }
        }

        this.showMainSpinner('Guardando información, por favor espere...');

        if (this.state.sectorMeetSession.uploadFiles.length == 0 && this.state.sectorMeetSession.uploadFilesPDF.length == 0) {
            this.completeSave();
            return;
        }
        
        if (this.state.sectorMeetSession.uploadFiles.length == 0 && this.state.sectorMeetSession.uploadFilesPDF.length > 0) {
            this.uploadResourcesFilesPDF(() => {
               this.completeSave();
            });
            return;
        }

        if (this.state.sectorMeetSession.uploadFilesPDF.length == 0 && this.state.sectorMeetSession.uploadFiles.length > 0) {
            this.uploadResources(() => {
               this.completeSave();
            });
            return;
        }

        if (this.state.sectorMeetSession.uploadFilesPDF.length > 0 && this.state.sectorMeetSession.uploadFiles.length > 0) {
           this.uploadResources(() => {
            this.uploadResourcesFilesPDF(() => {
                this.completeSave();
            });
        });
            return;
        }

    }

    backButtonPressed() {
        this.router.navigate(['app/conflict-tools/programation-meet/edit-meet', this.meetId]);
    }

    private uploadResources(callback: () => void) {

        this._uploadServiceProxy
            .uploadFiles(this.state.sectorMeetSession.uploadFiles.map(p => p.file), this._tokenService.getToken())
            .subscribe(event => {
                if (event instanceof HttpResponse) {
                    if (event.body.success) {
                        let index: number = 0;
                        for (let token of event.body.result.fileTokens) {
                            this.state.sectorMeetSession.uploadFiles[index].token = token;
                            index++;
                        }
                        callback();
                    } else {
                        this.message.info(event.body.error?.details ? event.body.error?.details : 'No se pudo completar la transacción, intente nuevamente mas tarde', 'Aviso');
                        setTimeout(() => this.hideMainSpinner(), 1500);
                    }
                }
            }, (error) => {
                this.message.error(error?.error?.error?.details ? error.error.error.details : 'No se pudo completar la transacción, intente nuevamente mas tarde', 'Aviso');
                setTimeout(() => this.hideMainSpinner(), 1500);
            });
    }

    private uploadResourcesFilesPDF(callback: () => void) {

        this._uploadServiceProxy
            .uploadFiles(this.state.sectorMeetSession.uploadFilesPDF.map(p => p.file), this._tokenService.getToken())
            .subscribe(event => {
                if (event instanceof HttpResponse) {
                    if (event.body.success) {
                        let index: number = 0;
                        for (let token of event.body.result.fileTokens) {
                            this.state.sectorMeetSession.uploadFilesPDF[index].token = token;
                            index++;
                        }
                        callback();
                    } else {
                        this.message.info(event.body.error?.details ? event.body.error?.details : 'No se pudo completar la transacción, intente nuevamente mas tarde', 'Aviso');
                        setTimeout(() => this.hideMainSpinner(), 1500);
                    }
                }
            }, (error) => {
                this.message.error(error?.error?.error?.details ? error.error.error.details : 'No se pudo completar la transacción, intente nuevamente mas tarde', 'Aviso');
                setTimeout(() => this.hideMainSpinner(), 1500);
            });
    }

    private completeSave() {

        if (this.id)
            this._sectorMeetSessionServiceProxy
                .update(this.state.sectorMeetSession)
                .subscribe(() => {
                    this.loaded = false;
                    this.notify.success('Se actualizó correctamente la información', 'Aviso');
                    this.resetAndInit();
                }, () => setTimeout(() => this.hideMainSpinner(), 1500));
        else
            this._sectorMeetSessionServiceProxy
                .create(this.state.sectorMeetSession)
                .subscribe((response) => {
                    this.loaded = false;
                    this.notify.success('Se registro correctamente la información', 'Aviso');
                    this.router.navigate(['/app/conflict-tools/programation-meet/edit-session', this.meetId, response.id]);
                }, () => setTimeout(() => this.hideMainSpinner(), 1500));
    }

    private resetAndInit() {
        this.loaded = false;
        this.busy = false;
        this.ngOnInit();
    }
}