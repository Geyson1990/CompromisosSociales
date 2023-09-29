import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FindDirectoryGovernmentComponent } from '@shared/component/find-directory-government/find-directory-government.component';
import { FindInterventionPlanComponent } from '@shared/component/find-intervention-plan/find-intervention-plan.component';
import { CrisisCommitteeActionLocationDto, CrisisCommitteeAgreementLocationDto, CrisisCommitteeAlertResponsibleLocationDto, CrisisCommitteeChannelLocationDto, CrisisCommitteeDto, CrisisCommitteeInterventionPlanLocationDto, CrisisCommitteeJobLocationDto, CrisisCommitteeMessageLocationDto, CrisisCommitteePersonDto, CrisisCommitteePlanLocationDto, CrisisCommitteeSectorLocationDto, CrisisCommitteeServiceProxy, CrisisCommitteeTaskLocationDto, CrisisCommitteeTeamLocationDto } from '@shared/service-proxies/application/crisis-committee-proxie';
import { UtilityDirectoryGovernmentDto, UtilityInterventionPlanGetAllDto } from '@shared/service-proxies/application/utility-proxie';
import { finalize } from 'rxjs/operators';
import { ActionInformationCrisisCommitteeComponent } from './action-information/action-information.component';
import { CreateEditActionInformationCrisisCommitteeComponent } from './action-information/create-edit-action-information/create-edit-action-information.component';
import { AgreementInformationCrisisCommitteeComponent } from './agreement-information/agreement-information.component';
import { CreateEditAgreementInformationCrisisCommitteeComponent } from './agreement-information/create-edit-agreement-information/create-edit-agreement-information.component';
import { ChannelInformationCrisisCommitteeComponent } from './channel-information/channel-information.component';
import { CreateEditChannelInformationCrisisCommitteeComponent } from './channel-information/create-edit-channel-information/create-edit-channel-information.component';
import { CreateEditGeneralInformationCrisisCommitteeComponent } from './general-information/create-edit-general-information/create-edit-general-information.component';
import { GeneralInformationCrisisCommitteeComponent } from './general-information/general-information.component';
import { CreateEditMessageInformationCrisisCommitteeComponent } from './message-information/create-edit-message-information/create-edit-message-information.component';
import { MessageInformationCrisisCommitteeComponent } from './message-information/message-information.component';
import { CreateEditPlanInformationCrisisCommitteeComponent } from './plan-information/create-edit-plan-information/create-edit-plan-information.component';
import { PlanInformationCrisisCommitteeComponent } from './plan-information/plan-information.component';
import { CreateEditSectorInformationCrisisCommitteeComponent } from './sector-information/create-edit-sector-information/create-edit-sector-information.component';
import { SectorInformationCrisisCommitteeComponent } from './sector-information/sector-information.component';
import { CreateEditTaskInformationCrisisCommitteeComponent } from './task-information/create-edit-task-information/create-edit-task-information.component';
import { TaskInformationCrisisCommitteeComponent } from './task-information/task-information.component';

@Component({
    templateUrl: 'create-edit-crisis-committee.component.html',
    styleUrls: [
        'create-edit-crisis-committee.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class CreateEditCrisisCommitteeComponent extends AppComponentBase implements OnInit {

    @ViewChild('generalInformation', { static: false }) generalInformation: GeneralInformationCrisisCommitteeComponent;
    @ViewChild('planInformation', { static: false }) planInformation: PlanInformationCrisisCommitteeComponent;
    @ViewChild('actionInformation', { static: false }) actionInformation: ActionInformationCrisisCommitteeComponent;
    @ViewChild('messageInformation', { static: false }) messageInformation: MessageInformationCrisisCommitteeComponent;
    @ViewChild('channelInformation', { static: false }) channelInformation: ChannelInformationCrisisCommitteeComponent;
    @ViewChild('sectorInformation', { static: false }) sectorInformation: SectorInformationCrisisCommitteeComponent;
    @ViewChild('agreementInformation', { static: false }) agreementInformation: AgreementInformationCrisisCommitteeComponent;
    @ViewChild('taskInformation', { static: false }) taskInformation: TaskInformationCrisisCommitteeComponent;

    @ViewChild('findInterventionPlan', { static: false }) findInterventionPlan: FindInterventionPlanComponent;
    @ViewChild('findDirectoryGovernment', { static: false }) findDirectoryGovernment: FindDirectoryGovernmentComponent;

    @ViewChild('generalInformationModal', { static: false }) generalInformationModal: CreateEditGeneralInformationCrisisCommitteeComponent;
    @ViewChild('planInformationModal', { static: false }) planInformationModal: CreateEditPlanInformationCrisisCommitteeComponent;
    @ViewChild('actionInformationModal', { static: false }) actionInformationModal: CreateEditActionInformationCrisisCommitteeComponent;
    @ViewChild('messageInformationModal', { static: false }) messageInformationModal: CreateEditMessageInformationCrisisCommitteeComponent;
    @ViewChild('channelInformationModal', { static: false }) channelInformationModal: CreateEditChannelInformationCrisisCommitteeComponent;
    @ViewChild('sectorInformationModal', { static: false }) sectorInformationModal: CreateEditSectorInformationCrisisCommitteeComponent;
    @ViewChild('agreementInformationModal', { static: false }) agreementInformationModal: CreateEditAgreementInformationCrisisCommitteeComponent;
    @ViewChild('taskInformationModal', { static: false }) taskInformationModal: CreateEditTaskInformationCrisisCommitteeComponent;

    id: number;
    crisisCommittee: CrisisCommitteeDto;

    tabIndex: number = 0;
    loaded: boolean = false;
    busy: boolean = false;

    alertResponsibles: CrisisCommitteeAlertResponsibleLocationDto[];
    jobs: CrisisCommitteeJobLocationDto[];
    persons: CrisisCommitteePersonDto[];

    constructor(_injector: Injector, private _route: ActivatedRoute, private _crisisCommitteeServiceProxy: CrisisCommitteeServiceProxy) {
        super(_injector);
    }

    ngOnInit() {
        const parameter = this._route.snapshot.paramMap.get('id');

        this.id = parameter ? +parameter.replace('[^0-9]', '') : undefined;

        if (this.id && !this.isGranted('Pages.ConflictTools.InterventionPlan.Edit')) {
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción');
            this.backButtonPressed();
            return;
        }

        if (!this.id && !this.isGranted('Pages.ConflictTools.InterventionPlan.Create')) {
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción');
            this.backButtonPressed();
            return;
        }

        setTimeout(() => {

            this.showMainSpinner(this.id ? 'Cargando información del comité de crisis' : 'Cargando información');

            this._crisisCommitteeServiceProxy
                .get(this.id)
                .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1500)))
                .subscribe(response => {
                    this.loaded = true;
                    this.alertResponsibles = response.alertResponsibles;
                    this.jobs = response.jobs;
                    this.persons = response.persons;

                    if (response.crisisCommittee)
                        this.crisisCommittee = response.crisisCommittee;
                    else
                        this.crisisCommittee = new CrisisCommitteeDto();

                }, () => this.backButtonPressed());

        }, 500);
    }

    addTeam() {
        this.generalInformationModal.show(undefined, undefined, this.alertResponsibles, this.jobs);
    }

    showTeam(event: { index: number, value: CrisisCommitteeTeamLocationDto }) {
        this.generalInformationModal.show(event.index, event.value, this.alertResponsibles, this.jobs);
    }

    saveTeam(event: { index: number, value: CrisisCommitteeTeamLocationDto }) {
        this.generalInformation.addOrUpdateItem(event);
    }

    addPlan() {
        this.planInformationModal.show(undefined, undefined);
    }

    showPlan(event: { index: number, value: CrisisCommitteePlanLocationDto }) {
        this.planInformationModal.show(event.index, event.value);
    }

    savePlan(event: { index: number, value: CrisisCommitteePlanLocationDto }) {
        this.planInformation.addOrUpdateItem(event);
    }

    addAction() {
        this.actionInformationModal.show(undefined, undefined);
    }

    showAction(event: { index: number, value: CrisisCommitteeActionLocationDto }) {
        this.actionInformationModal.show(event.index, event.value);
    }

    saveAction(event: { index: number, value: CrisisCommitteeActionLocationDto }) {
        this.actionInformation.addOrUpdateItem(event);
    }

    addMessage() {
        this.messageInformationModal.show(undefined, undefined);
    }

    showMessage(event: { index: number, value: CrisisCommitteeMessageLocationDto }) {
        this.messageInformationModal.show(event.index, event.value);
    }

    saveMessage(event: { index: number, value: CrisisCommitteeMessageLocationDto }) {
        this.messageInformation.addOrUpdateItem(event);
    }

    addChannel() {
        this.channelInformationModal.show(undefined, undefined);
    }

    showChannel(event: { index: number, value: CrisisCommitteeChannelLocationDto }) {
        this.channelInformationModal.show(event.index, event.value);
    }

    saveChannel(event: { index: number, value: CrisisCommitteeChannelLocationDto }) {
        this.channelInformation.addOrUpdateItem(event);
    }

    addSector() {
        this.sectorInformationModal.show(undefined, undefined);
    }

    showSector(event: { index: number, value: CrisisCommitteeSectorLocationDto }) {
        this.sectorInformationModal.show(event.index, event.value);
    }

    saveSector(event: { index: number, value: CrisisCommitteeSectorLocationDto }) {
        this.sectorInformation.addOrUpdateItem(event);
    }

    addAgreement() {
        this.agreementInformationModal.show(undefined, undefined);
    }

    showAgreement(event: { index: number, value: CrisisCommitteeAgreementLocationDto }) {
        this.agreementInformationModal.show(event.index, event.value);
    }

    saveAgreement(event: { index: number, value: CrisisCommitteeAgreementLocationDto }) {
        this.agreementInformation.addOrUpdateItem(event);
    }

    addTask() {
        this.taskInformationModal.show(undefined, undefined);
    }

    showTask(event: { index: number, value: CrisisCommitteeTaskLocationDto }) {
        this.taskInformationModal.show(event.index, event.value);
    }

    saveTask(event: { index: number, value: CrisisCommitteeTaskLocationDto }) {
        this.taskInformation.addOrUpdateItem(event);
    }

    showFindDirectoryGovernment() {
        this.findDirectoryGovernment.show();
    }

    saveDirectoryGovernment(event: UtilityDirectoryGovernmentDto) {
        this.sectorInformationModal.addOrUpdateDirectoryGovernmentItem(event);
    }

    showInterventionPlanSearch() {
        this.findInterventionPlan.show();
    }

    selectInterventionPlan(interventionPlan: UtilityInterventionPlanGetAllDto) {
        this.crisisCommittee.interventionPlan = CrisisCommitteeInterventionPlanLocationDto.fromJS(interventionPlan);
    }

    save() {
        if (!this.generalInformation.processCrisisCommitteeTime())
            return;

        if (!this.crisisCommittee.interventionPlan) {
            this.message.info('Debe seleccionar el plan de intervención antes de guardar los cambios.', 'Aviso');
            return;
        }

        if (this.crisisCommittee.replaceCode) {
            if (+this.crisisCommittee.replaceCode <= 0 || (<any>this.crisisCommittee.replaceCode + '').trim() == '') {
                this.message.info('El Código (Número) de reemplazo es obligatorio', 'Aviso');
                return;
            }
            if (+this.crisisCommittee.replaceYear <= 0 || (<any>this.crisisCommittee.replaceYear + '').trim() == '') {
                this.message.info('El Código (Año) de reemplazo es obligatorio', 'Aviso');
                return;
            }
        }

        this.showMainSpinner('Guardando información, por favor espere...');

        if (this.id)
            this._crisisCommitteeServiceProxy
                .update(this.crisisCommittee)
                .subscribe(() => {
                    this.loaded = false;
                    this.notify.success('Se actualizó correctamente la información', 'Aviso');
                    this.resetAndInit();
                }, () => setTimeout(() => this.hideMainSpinner(), 1500));
        else
            this._crisisCommitteeServiceProxy
                .create(this.crisisCommittee)
                .subscribe((response) => {
                    this.loaded = false;
                    this.notify.success('Se registro correctamente la información', 'Aviso');
                    this.router.navigate(['/app/conflict-tools/edit-crisis-committee', response.id]);
                }, () => setTimeout(() => this.hideMainSpinner(), 1500));
    }

    backButtonPressed() {
        this.router.navigate(['/app/conflict-tools/crisis-committee'], { queryParams: {} });
    }

    private resetAndInit() {
        this.loaded = false;
        this.busy = false;
        this.ngOnInit();
    }
}