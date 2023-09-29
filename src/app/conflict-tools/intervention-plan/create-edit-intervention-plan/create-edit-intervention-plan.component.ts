import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import { AppComponentBase } from "@shared/common/app-component-base";
import { FindConflictComponent } from "@shared/component/find-conflict/find-conflict.component";
import { FindDirectoryGovernmentComponent } from "@shared/component/find-directory-government/find-directory-government.component";
import { InterventionPlanActivityLocationDto, InterventionPlanActorLocationDto, InterventionPlanActorMovementDto, InterventionPlanActorTypeDto, InterventionPlanAlertResponsibleLocationDto, InterventionPlanDepartmentDto, InterventionPlanDto, InterventionPlanEntityLocationDto, InterventionPlanMethodologyLocationDto, InterventionPlanOptionLocationDto, InterventionPlanPersonDto, InterventionPlanRiskLevelLocationDto, InterventionPlanRiskLocationDto, InterventionPlanRoleLocationDto, InterventionPlanScheduleLocationDto, InterventionPlanServiceProxy, InterventionPlanSolutionLocationDto, InterventionPlanStateLocationDto, InterventionPlanTeamLocationDto, InterventionPlanTerritorialUnitDto } from "@shared/service-proxies/application/intervention-plan-proxie";
import { UploadServiceProxy } from "@shared/service-proxies/application/upload-proxie";
import { ConflictSite, UtilityConflictListGetAllDto, UtilityDirectoryGovernmentDto } from "@shared/service-proxies/application/utility-proxie";
import { TokenService } from "abp-ng2-module";
import { finalize } from "rxjs/operators";
import { ActorInformationInterventionPlanComponent } from "./actor-information/actor-information.component";
import { CreateEditActorInformationInterventionPlanComponent } from "./actor-information/create-edit-actor-information/create-edit-actor-information.component";
import { GeneralInformationInterventionPlanComponent } from "./general-information/general-information.component";
import { CreateEditMethodologyInformationInterventionPlanComponent } from "./methodology-information/create-edit-methodology-information/create-edit-methodology-information.component";
import { MethodologyInformationInterventionPlanComponent } from "./methodology-information/methodology-information.component";
import { CreateEditRiskInformationInterventionPlanComponent } from "./risk-information/create-edit-risk-information/create-edit-risk-information.component";
import { RiskInformationInterventionPlanComponent } from "./risk-information/risk-information.component";
import { CreateEditScheduleInformationInterventionPlanComponent } from "./schedule-information/create-edit-schedule-information/create-edit-schedule-information.component";
import { FindMethodologyComponent } from "./schedule-information/find-methodology/find-methodology.component";
import { ScheduleInformationInterventionPlanComponent } from "./schedule-information/schedule-information.component";
import { CreateEditSolutionInformationInterventionPlanComponent } from "./solution-information/create-edit-state-solution/create-edit-solution-information.component";
import { SolutionInformationInterventionPlanComponent } from "./solution-information/solution-information.component";
import { CreateEditStateInformationInterventionPlanComponent } from "./state-information/create-edit-state-information/create-edit-state-information.component";
import { StateInformationInterventionPlanComponent } from "./state-information/state-information.component";
import { CreateEditTeamInformationInterventionPlanComponent } from "./team-information/create-edit-team-information/create-edit-team-information.component";
import { TeamInformationInterventionPlanComponent } from "./team-information/team-information.component";

@Component({
    templateUrl: 'create-edit-intervention-plan.component.html',
    styleUrls: [
        'create-edit-intervention-plan.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class CreateEditInterventionPlanComponent extends AppComponentBase implements OnInit {

    @ViewChild('generalInformation', { static: false }) generalInformation: GeneralInformationInterventionPlanComponent;
    @ViewChild('actorInformation', { static: false }) actorInformation: ActorInformationInterventionPlanComponent;
    @ViewChild('stateInformation', { static: false }) stateInformation: StateInformationInterventionPlanComponent;
    @ViewChild('methodologyInformation', { static: false }) methodologyInformation: MethodologyInformationInterventionPlanComponent;
    @ViewChild('riskInformation', { static: false }) riskInformation: RiskInformationInterventionPlanComponent;
    @ViewChild('scheduleInformation', { static: false }) scheduleInformation: ScheduleInformationInterventionPlanComponent;
    @ViewChild('teamInformation', { static: false }) teamInformation: TeamInformationInterventionPlanComponent;
    @ViewChild('solutionInformation', { static: false }) solutionInformation: SolutionInformationInterventionPlanComponent;

    @ViewChild('findConflictModal', { static: false }) findConflictModal: FindConflictComponent;
    @ViewChild('findDirectoryGovernmentDialog', { static: false }) findDirectoryGovernmentDialog: FindDirectoryGovernmentComponent;
    @ViewChild('findMethodologyModal', { static: false }) findMethodologyModal: FindMethodologyComponent;

    @ViewChild('actorInformationModal', { static: false }) actorInformationModal: CreateEditActorInformationInterventionPlanComponent;
    @ViewChild('stateInformationModal', { static: false }) stateInformationModal: CreateEditStateInformationInterventionPlanComponent;
    @ViewChild('methodologyInformationModal', { static: false }) methodologyInformationModal: CreateEditMethodologyInformationInterventionPlanComponent;
    @ViewChild('riskInformationModal', { static: false }) riskInformationModal: CreateEditRiskInformationInterventionPlanComponent;
    @ViewChild('scheduleInformationModal', { static: false }) scheduleInformationModal: CreateEditScheduleInformationInterventionPlanComponent;
    @ViewChild('teamInformationModal', { static: false }) teamInformationModal: CreateEditTeamInformationInterventionPlanComponent;
    @ViewChild('solutionInformationModal', { static: false }) solutionInformationModal: CreateEditSolutionInformationInterventionPlanComponent;

    id: number;
    returnUrl: string;

    interventionPlan: InterventionPlanDto;

    actorTypes: InterventionPlanActorTypeDto[];
    actorMovements: InterventionPlanActorMovementDto[];
    departments: InterventionPlanDepartmentDto[];
    persons: InterventionPlanPersonDto[];
    options: InterventionPlanOptionLocationDto[];
    territorialUnits: InterventionPlanTerritorialUnitDto[];
    risks: InterventionPlanRiskLevelLocationDto[];
    activities: InterventionPlanActivityLocationDto[];
    entities: InterventionPlanEntityLocationDto[];
    alertResponsibles: InterventionPlanAlertResponsibleLocationDto[]
    roles: InterventionPlanRoleLocationDto[];

    tabIndex: number = 0;
    loaded: boolean = false;
    busy: boolean = false;

    governmentModalSites = {
        schedule: 0,
        teams: 1
    }

    private currentGovernmentSite: number;

    constructor(
        _injector: Injector,
        private _route: ActivatedRoute,
        private _interventionPlanServiceProxy: InterventionPlanServiceProxy,
        private _uploadServiceProxy: UploadServiceProxy,
        private _tokenService: TokenService) {
        super(_injector);
        this.primengTableHelper.defaultRecordsCountPerPage = 500;
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

            this.showMainSpinner(this.id ? 'Cargando información del plan de intervención' : 'Cargando información');

            this._interventionPlanServiceProxy
                .get(this.id)
                .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1500)))
                .subscribe(response => {
                    this.loaded = true;
                    this.actorTypes = response.actorTypes;
                    this.actorMovements = response.actorMovements;
                    this.departments = response.departments;
                    this.options = response.options;
                    this.persons = response.persons;
                    this.territorialUnits = response.territorialUnits;
                    this.risks = response.risks;
                    this.activities = response.activities;
                    this.entities = response.entities;
                    this.alertResponsibles = response.alertResponsibles;
                    this.roles = response.roles;

                    if (response.interventionPlan)
                        this.interventionPlan = response.interventionPlan;
                    else
                        this.interventionPlan = new InterventionPlanDto();

                }, () => this.backButtonPressed());

        }, 500);
    }

    showConflictModal() {
        this.findConflictModal.show();
    }

    selectConflict(conflict: UtilityConflictListGetAllDto) {
        this.message.confirm(`¿Desea importar la información ${conflict.site == ConflictSite.SocialConflict ? ' del Conflicto Social' : 'de la Situación Sensible'}?`, 'Aviso', confirmation => {
            if (confirmation) {
                this._interventionPlanServiceProxy.getAllLocationByConflict(conflict.id, conflict.site).subscribe(locations => {

                    for (let location of locations.items) {
                        this.interventionPlan.locations.push(location);
                    }

                    this._interventionPlanServiceProxy.getAllActorByConflict(conflict.id, conflict.site).subscribe(response => {
                        for (let actor of response.items) {
                            actor.imported = true;
                            actor.importedId = actor.id;
                            actor.id = undefined;

                            const index: number = this.interventionPlan.actors.findIndex(p => p.importedId && p.importedId == actor.importedId);

                            if (index == -1)
                                this.interventionPlan.actors.push(actor);

                            this.notify.success('Actores importados de manera satisfactoria');
                        }
                        this.actorInformation.getData();
                        this.generalInformation.selectConflict(conflict);
                    });

                });
            } else {
                this.generalInformation.selectConflict(conflict);
            }
        });
    }

    addActor() {
        this.actorInformationModal.show(undefined, undefined, this.actorTypes, this.actorMovements);
    }

    showActorEdition(event: { index: number, value: InterventionPlanActorLocationDto }) {
        this.actorInformationModal.show(event.index, event.value, this.actorTypes, this.actorMovements);
    }

    saveActorEdition(event: { index: number, value: InterventionPlanActorLocationDto }) {
        this.actorInformation.addOrUpdateItem(event);
    }

    addState() {
        this.stateInformationModal.show(undefined, undefined);
    }

    showStateEdition(event: { index: number, value: InterventionPlanStateLocationDto }) {
        this.stateInformationModal.show(event.index, event.value);
    }

    saveStateEdition(event: { index: number, value: InterventionPlanStateLocationDto }) {
        this.stateInformation.addOrUpdateItem(event);
    }

    addMethodology() {
        this.methodologyInformationModal.show(undefined, undefined, this.options);
    }

    showMethodologyEdition(event: { index: number, value: InterventionPlanMethodologyLocationDto }) {
        this.methodologyInformationModal.show(event.index, event.value, this.options);
    }

    saveMethodologyEdition(event: { index: number, value: InterventionPlanMethodologyLocationDto }) {
        this.methodologyInformation.addOrUpdateItem(event);
    }

    addRisk() {
        this.riskInformationModal.show(undefined, undefined, this.risks);
    }

    showRiskEdition(event: { index: number, value: InterventionPlanRiskLocationDto }) {
        this.riskInformationModal.show(event.index, event.value, this.risks);
    }

    saveRiskEdition(event: { index: number, value: InterventionPlanRiskLocationDto }) {
        this.riskInformation.addOrUpdateItem(event);
    }

    addSchedule() {
        this.scheduleInformationModal.show(undefined, undefined, this.activities, this.entities, this.alertResponsibles);
    }

    showScheduleEdition(event: { index: number, value: InterventionPlanScheduleLocationDto }) {
        this.scheduleInformationModal.show(event.index, event.value, this.activities, this.entities, this.alertResponsibles);
    }

    saveScheduleEdition(event: { index: number, value: InterventionPlanScheduleLocationDto }) {
        this.scheduleInformation.addOrUpdateItem(event);
    }

    saveScheduleObjective(event: InterventionPlanMethodologyLocationDto) {
        this.scheduleInformationModal.addOrUpdateMethodology(event);
    }

    addTeam() {
        this.teamInformationModal.show(undefined, undefined, this.roles, this.entities, this.alertResponsibles);
    }

    showTeamEdition(event: { index: number, value: InterventionPlanTeamLocationDto }) {
        this.teamInformationModal.show(event.index, event.value, this.roles, this.entities, this.alertResponsibles);
    }

    saveTeamEdition(event: { index: number, value: InterventionPlanTeamLocationDto }) {
        this.teamInformation.addOrUpdateItem(event);
    }

    addSolution() {
        this.solutionInformationModal.show(undefined, undefined);
    }

    showSolutionEdition(event: { index: number, value: InterventionPlanSolutionLocationDto }) {
        this.solutionInformationModal.show(event.index, event.value);
    }

    saveSolutionEdition(event: { index: number, value: InterventionPlanSolutionLocationDto }) {
        this.solutionInformation.addOrUpdateItem(event);
    }

    showFindMethodology() {
        this.findMethodologyModal.show();
    }

    showFindDirectoryGovernment(site: number) {
        this.currentGovernmentSite = site;
        this.findDirectoryGovernmentDialog.show();
    }

    saveDirectoryGovernment(event: UtilityDirectoryGovernmentDto) {
        if (this.currentGovernmentSite == this.governmentModalSites.schedule)
            this.scheduleInformationModal.addOrUpdateDirectoryGovernmentItem(event);
        if (this.currentGovernmentSite = this.governmentModalSites.teams)
            this.teamInformationModal.addOrUpdateDirectoryGovernmentItem(event);
    }

    save() {
        if (!this.generalInformation.processInterventionPlanTime())
            return;

        if (this.isNullEmptyOrWhiteSpace(this.interventionPlan.caseName)) {
            this.message.info('Debe ingresar la denominación del plan de intervención antes de guardar los cambios');
            return;
        }

        if (this.interventionPlan.replaceCode) {
            if (+this.interventionPlan.replaceCode <= 0 || (<any>this.interventionPlan.replaceCode + '').trim() == '') {
                this.message.info('El Código (Número) de reemplazo es obligatorio', 'Aviso');
                return;
            }
            if (+this.interventionPlan.replaceYear <= 0 || (<any>this.interventionPlan.replaceYear + '').trim() == '') {
                this.message.info('El Código (Año) de reemplazo es obligatorio', 'Aviso');
                return;
            }
        }

        this.showMainSpinner('Guardando información, por favor espere...');

        if (this.id)
            this._interventionPlanServiceProxy
                .update(this.interventionPlan)
                .subscribe(() => {
                    this.loaded = false;
                    this.notify.success('Se actualizó correctamente la información', 'Aviso');
                    this.resetAndInit();
                }, () => setTimeout(() => this.hideMainSpinner(), 1500));
        else
            this._interventionPlanServiceProxy
                .create(this.interventionPlan)
                .subscribe((response) => {
                    this.loaded = false;
                    this.notify.success('Se registro correctamente la información', 'Aviso');
                    this.router.navigate(['/app/conflict-tools/edit-intervention-plan', response.id]);
                }, () => setTimeout(() => this.hideMainSpinner(), 1500));
    }

    backButtonPressed() {
        this.router.navigate(['/app/conflict-tools/intervention-plan/dashboard'], { queryParams: {} });
    }

    private resetAndInit() {
        this.loaded = false;
        this.busy = false;
        this.ngOnInit();
    }
}