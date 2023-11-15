import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    ConditionType,
    SocialConflictSensibleActorLocationDto,
    SocialConflictSensibleActorMovementDto,
    SocialConflictSensibleActorTypeDto,
    SocialConflictSensibleConditionDto,
    SocialConflictSensibleDepartmentDto,
    SocialConflictSensibleDto,
    SocialConflictSensibleFactDto,
    SocialConflictSensibleGeneralFactDto,
    SocialConflictSensibleManagementDto,
    SocialConflictSensibleManagementLocationDto,
    SocialConflictSensiblePersonDto,
    SocialConflictSensibleRiskDto,
    SocialConflictSensibleRiskLocationDto,
    SocialConflictSensibleServiceProxy,
    SocialConflictSensibleStateLocationDto,
    SocialConflictSensibleSugerenceDto,
    SocialConflictSensibleTerritorialUnitDto,
    SocialConflictSensibleTypologyDto,
    SugerenceType
} from '@shared/service-proxies/application/social-conflict-sensible-proxie';
import { UploadServiceProxy } from '@shared/service-proxies/application/upload-proxie';
import { TokenService } from 'abp-ng2-module';
import { finalize } from 'rxjs/operators';
import { ActorInformationSocialConflictSensibleComponent } from './actor-information/actor-information.component';
import { EditActorInformationSocialConflictSensibleComponent } from './actor-information/edit-actor-information/edit-actor-information.component';
import { ConditionInformationSocialConflictSensibleComponent } from './condition-information/condition-information.component';
import { CreateEditConditionInformationSocialConflictSensibleComponent } from './condition-information/create-edit-condition-information/create-edit-condition-information.component';
import { CreateEditFactInformationSocialConflictSensibleComponent } from './fact-information/create-edit-fact-information/create-edit-fact-information.component';
import { FactInformationSocialConflictSensibleComponent } from './fact-information/fact-information.component';
import { AttachedFileManagementInformationSocialConflictSensibleComponent } from './management-information/attached-file-management/attached-file-management.component';
import { CreateEditManagementInformationSocialConflictSensibleComponent } from './management-information/create-edit-management/create-edit-management.component';
import { ManagementInformationSocialConflictSensibleComponent } from './management-information/management-information.component';
import { CreateEditRiskInformationSocialConflictSensibleComponent } from './risk-information/create-edit-risk-information/create-edit-risk-information.component';
import { RiskInformationSocialConflictSensibleComponent } from './risk-information/risk-information.component';
import { CreateEditStateInformationSocialConflictSensibleComponent } from './state-information/create-edit-state/create-edit-state.component';
import { StateInformationSocialConflictSensibleComponent } from './state-information/state-information.component';
import { CreateEditSugerenceInformationSocialConflictSensibleComponent } from './sugerence-information/create-edit-sugerence/create-edit-sugerence-information.component';
import { SugerenceInformationSocialConflictSensibleComponent } from './sugerence-information/sugerence-information.component';
import { FindSocialConflictComponent } from '@shared/component/find-social-conflict/find-social-conflict.component';
import { FindActorComponent } from '@shared/component/find-actor/find-actor.component';

enum UploadType {
    Management,
}

interface SocialConflictSensibleUploadItem {
    type: UploadType;
    parentIndex: number;
    childrenIndex: number;
    file: globalThis.File;
    token?: string;
}

@Component({
    templateUrl: 'create-edit-social-conflict-sensible.component.html',
    styleUrls: [
        'create-edit-social-conflict-sensible.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class CreateEditSocialConflictSensibleSensibleComponent extends AppComponentBase implements OnInit {

    @ViewChild('actorInformation', { static: false }) actorInformation: ActorInformationSocialConflictSensibleComponent;
    @ViewChild('riskInformation', { static: false }) riskInformation: RiskInformationSocialConflictSensibleComponent;
    @ViewChild('managementInformation', { static: false }) managementInformation: ManagementInformationSocialConflictSensibleComponent;
    @ViewChild('stateInformation', { static: false }) stateInformation: StateInformationSocialConflictSensibleComponent;
    @ViewChild('conditionInformation', { static: false }) conditionInformation: ConditionInformationSocialConflictSensibleComponent;
    @ViewChild('sugerenceInformation', { static: false }) sugerenceInformation: SugerenceInformationSocialConflictSensibleComponent;
    @ViewChild('factInformation', { static: false }) factInformation: FactInformationSocialConflictSensibleComponent;
    @ViewChild('findActorModal', { static: false }) findActorModal: FindActorComponent;
    @ViewChild('editActorInformation', { static: false }) editActorInformation: EditActorInformationSocialConflictSensibleComponent;
    @ViewChild('createEditRiskInformation', { static: false }) createEditRiskInformation: CreateEditRiskInformationSocialConflictSensibleComponent;
    @ViewChild('createEditFactInformation', { static: false }) createEditFactInformation: CreateEditFactInformationSocialConflictSensibleComponent;
    @ViewChild('createEditManagementInformation', { static: false }) createEditManagementInformation: CreateEditManagementInformationSocialConflictSensibleComponent;
    @ViewChild('attachedFileManagementInformation', { static: false }) attachedFileManagementInformation: AttachedFileManagementInformationSocialConflictSensibleComponent;
    @ViewChild('createEditStateInformation', { static: false }) createEditStateInformation: CreateEditStateInformationSocialConflictSensibleComponent;
    @ViewChild('createEditConditionInformation', { static: false }) createEditConditionInformation: CreateEditConditionInformationSocialConflictSensibleComponent;
    @ViewChild('createEditSugerenceInformation', { static: false }) createEditSugerenceInformation: CreateEditSugerenceInformationSocialConflictSensibleComponent;
    @Output() openFindActor: EventEmitter<void> = new EventEmitter<void>();
    
    id: number;
    returnUrl: string;

    socialConflictSensible: SocialConflictSensibleDto;

    actorTypes: SocialConflictSensibleActorTypeDto[];
    actorMovements: SocialConflictSensibleActorMovementDto[];
    departments: SocialConflictSensibleDepartmentDto[];
    facts: SocialConflictSensibleFactDto[];
    persons: SocialConflictSensiblePersonDto[];
    risks: SocialConflictSensibleRiskDto[];
    territorialUnits: SocialConflictSensibleTerritorialUnitDto[];
    typologies: SocialConflictSensibleTypologyDto[];
    managements: SocialConflictSensibleManagementDto[];

    tabIndex: number = 0;
    loaded: boolean = false;
    busy: boolean = false;

    conditionTypes = {
        open: ConditionType.Open,
        closed: ConditionType.Closed
    };
    
    constructor(
        _injector: Injector,
        private _route: ActivatedRoute,
        private _socialConflictSensibleServiceProxy: SocialConflictSensibleServiceProxy,
        private _uploadServiceProxy: UploadServiceProxy,
        private _tokenService: TokenService) {
        super(_injector);
        this.primengTableHelper.defaultRecordsCountPerPage = 500;
    }

    ngOnInit() {
        const parameter = this._route.snapshot.paramMap.get('id');
        this.id = parameter ? +parameter.replace('[^0-9]', '') : undefined;
        this.returnUrl = this.getQueryParameter('returnUrl');

        if (this.id && !this.isGranted('Pages.Application.SocialConflictSensible.Edit')) {
            this.router.navigate(['/app/application/social-conflicts'], { queryParams: {} });
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción')
            return;
        }

        if (!this.id && !this.isGranted('Pages.Application.SocialConflictSensible.Create')) {
            this.router.navigate(['/app/application/social-conflicts'], { queryParams: {} });
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción')
            return;
        }

        setTimeout(() => {

            this.showMainSpinner(this.id ? 'Cargando información del caso de conflicto' : 'Cargando información');

            this._socialConflictSensibleServiceProxy
                .get(this.id)
                .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1500)))
                .subscribe(response => {
                    this.loaded = true;
                    this.actorTypes = response.actorTypes;
                    this.actorMovements = response.actorMovements;
                    this.departments = response.departments;
                    this.facts = response.facts;
                    this.persons = response.persons;
                    this.risks = response.risks;
                    this.territorialUnits = response.territorialUnits;
                    this.typologies = response.typologies;
                    this.managements = response.managements;
                    this.socialConflictSensible = response.socialConflictSensible;
                }, () => this.backButtonPressed());

        }, 500);
    }

    showSocialFindActorModal() {
        this.findActorModal.show();
     }

    addActor() {
        this.editActorInformation.show(undefined, undefined, this.actorTypes, this.actorMovements);
    }

    showActorEdition(event: { index: number, value: SocialConflictSensibleActorLocationDto }) {
        this.editActorInformation.show(event.index, event.value, this.actorTypes, this.actorMovements);
    }

    saveActorEdition(event: { index: number, value: SocialConflictSensibleActorLocationDto }) {
        this.actorInformation.addOrUpdateItem(event);
    }

    addFact() {
        this.createEditFactInformation.show(undefined, undefined);
    }

    showFactEdition(event: { index: number, value: SocialConflictSensibleGeneralFactDto }) {
        this.createEditFactInformation.show(event.index, event.value);
    }

    saveFactEdition(event: { index: number, value: SocialConflictSensibleGeneralFactDto }) {
        this.factInformation.addOrUpdateItem(event);
    }

    addManagement() {
        this.createEditManagementInformation.show(undefined, undefined, this.managements, this.persons);
    }

    showManagementEdition(event: { index: number, value: SocialConflictSensibleManagementLocationDto }) {
        this.createEditManagementInformation.show(event.index, event.value, this.managements, this.persons);
    }

    showManagementFiles(event: { index: number, value: SocialConflictSensibleManagementLocationDto }) {
        this.attachedFileManagementInformation.show(event.value);
    }

    saveManagement(event: { value: SocialConflictSensibleManagementLocationDto, index: number }) {
        this.managementInformation.addOrUpdateItem(event);
    }

    addState() {
        this.createEditStateInformation.show(undefined, undefined, this.persons);
    }

    showStateEdition(event: { index: number, value: SocialConflictSensibleStateLocationDto }) {
        this.createEditStateInformation.show(event.index, event.value, this.persons);
    }

    saveState(event: { value: SocialConflictSensibleStateLocationDto, index: number }) {
        this.stateInformation.addOrUpdateItem(event);
    }

    addRisk() {
        this.createEditRiskInformation.show(undefined, undefined, this.risks);
    }

    showRiskEdition(event: { index: number, value: SocialConflictSensibleRiskLocationDto }) {
        this.createEditRiskInformation.show(event.index, event.value, this.risks);
    }

    saveRisk(event: { value: SocialConflictSensibleRiskLocationDto, index: number }) {
        this.riskInformation.addOrUpdateItem(event);
    }

    addCondition() {
        this.createEditConditionInformation.show();
    }

    showConditionEdition(event: { index: number, value: SocialConflictSensibleConditionDto }) {
        this.createEditConditionInformation.show(event.index, event.value);
    }

    saveCondition(event: { value: SocialConflictSensibleConditionDto, index: number }) {
        this.conditionInformation.addOrUpdateItem(event);
    }

    addSugerence(event: { type: SugerenceType }) {
        this.createEditSugerenceInformation.show(undefined, undefined, event.type);
    }

    showSugerenceEdition(event: { index: number, type: SugerenceType, value: SocialConflictSensibleSugerenceDto }) {
        this.createEditSugerenceInformation.show(event.index, event.value, event.type);
    }

    saveSugerence(event: { index: number, type: SugerenceType, value: SocialConflictSensibleSugerenceDto }) {
        this.sugerenceInformation.addOrUpdateItem(event);
    }

    saveActor(event: any) {
        let oSocialConflictActorLocationDto: SocialConflictSensibleActorLocationDto = new SocialConflictSensibleActorLocationDto();
        oSocialConflictActorLocationDto.id = 0;
        oSocialConflictActorLocationDto.actorId = event.id;
        oSocialConflictActorLocationDto.name= event.fullName;
        oSocialConflictActorLocationDto.document= event.documentNumber;
        oSocialConflictActorLocationDto.job= event.jobPosition;
        oSocialConflictActorLocationDto.community= event.institution;
        oSocialConflictActorLocationDto.phoneNumber= event.phoneNumber;
        oSocialConflictActorLocationDto.emailAddress= event.emailAddress;
        oSocialConflictActorLocationDto.isPoliticalAssociation= event.isPoliticalAssociation;
        oSocialConflictActorLocationDto.politicalAssociation= event.politicalAssociation;
        oSocialConflictActorLocationDto.position= event.position;
        oSocialConflictActorLocationDto.interest= event.interest;
        oSocialConflictActorLocationDto.actorType= event.actorType;
        oSocialConflictActorLocationDto.actorMovement= event.actorMovement;
        oSocialConflictActorLocationDto.remove= false;
        oSocialConflictActorLocationDto.isHidden = false;
        event.value = oSocialConflictActorLocationDto;
        console.log("event::::::::::::",event)
       this.actorInformation.addOrUpdateItem(event);
    }

    save() {

        if (this.isNullEmptyOrWhiteSpace(this.socialConflictSensible.caseName)) {
            this.message.info('El nombre de la situación sensible al conflicto es obligatoria, debe ingresarla antes de continuar');
            return;
        }

        this.uploadImages();
    }

    backButtonPressed() {
        if (this.returnUrl == 'actors')
            this.router.navigate(['/app/application/social-conflict-actors'], { queryParams: {} });
        else
            this.router.navigate(['/app/application/sensibles'], { queryParams: {} });
    }

    private uploadImages() {

        const managementsUploadCount: number = this.socialConflictSensible.managements.reduce((p, c) => p + c.uploadFiles.length, 0);

        if (managementsUploadCount == 0) {
            this.showMainSpinner('Guardando información, por favor espere...');
            this.completeSave();
            return;
        }

        let fileParameterArray: SocialConflictSensibleUploadItem[] = [];

        for (let i = 0; i < this.socialConflictSensible.managements.length; i++) {
            for (let r = 0; r < this.socialConflictSensible.managements[i].uploadFiles.length; r++) {
                fileParameterArray.push({
                    type: UploadType.Management,
                    parentIndex: i,
                    childrenIndex: r,
                    file: this.socialConflictSensible.managements[i].uploadFiles[r].file
                });
            }
        }

        this.uploadFiles(fileParameterArray, (result) => {

            for (let item of result) {
                if (item.type == UploadType.Management) {
                    this.socialConflictSensible.managements[item.parentIndex].uploadFiles[item.childrenIndex].token = item.token;
                }
            }

            this.completeSave();
        });
    }

    private uploadFiles(fileParameterArray: SocialConflictSensibleUploadItem[], callback: (fileParameterArray: SocialConflictSensibleUploadItem[]) => void) {

        this.showMainSpinner('Guardando información, por favor espere...');

        this._uploadServiceProxy
            .uploadFiles(fileParameterArray.map(p => p.file), this._tokenService.getToken())
            .subscribe(event => {
                if (event instanceof HttpResponse) {
                    if (event.body.success) {
                        let index: number = 0;
                        for (let token of event.body.result.fileTokens) {
                            fileParameterArray[index].token = token;
                            index++;
                        }
                        callback(fileParameterArray);
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
            this._socialConflictSensibleServiceProxy
                .update(this.socialConflictSensible)
                .subscribe(() => {
                    this.loaded = false;
                    this.notify.success('Se actualizó correctamente el conflicto social', 'Aviso');
                    this.resetAndInit();
                }, () => setTimeout(() => this.hideMainSpinner(), 1500));
        else
            this._socialConflictSensibleServiceProxy
                .create(this.socialConflictSensible)
                .subscribe((response) => {
                    this.loaded = false;
                    this.notify.success('Se registro correctamente conflicto social', 'Aviso');
                    this.router.navigate(['/app/application/edit-sensible', response.id]);
                }, () => setTimeout(() => this.hideMainSpinner(), 1500));
    }

    private resetAndInit() {
        this.loaded = false;
        this.busy = false;
        this.ngOnInit();
    }

    addActorEvent() {
        debugger;
        this.openFindActor.emit();
    }

    selectRecord(event:any){}
}