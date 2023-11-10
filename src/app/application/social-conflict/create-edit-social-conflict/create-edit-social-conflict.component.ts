import { HttpResponse } from '@angular/common/http';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    SocialConflictActorLocationDto,
    SocialConflictActorMovementDto,
    SocialConflictActorTypeDto,
    SocialConflictConditionDto,
    SocialConflictDepartmentDto,
    SocialConflictDto,
    SocialConflictFactDto,
    SocialConflictGeneralFactDto,
    SocialConflictManagementDto,
    SocialConflictManagementLocationDto,
    SocialConflictPersonDto,
    SocialConflictRiskDto,
    SocialConflictRiskLocationDto,
    SocialConflictSectorDto,
    SocialConflictServiceProxy,
    SocialConflictStateLocationDto,
    SocialConflictSugerenceDto,
    SocialConflictTerritorialUnitDto,
    SocialConflictTypologyDto,
    SocialConflictViolenceFactDto,
    SugerenceType
} from '@shared/service-proxies/application/social-conflict-proxie';
import { ConditionType } from '@shared/service-proxies/application/social-conflict-sensible-proxie';
import { UploadServiceProxy } from '@shared/service-proxies/application/upload-proxie';
import { PermissionCheckerService, TokenService } from 'abp-ng2-module';
import { finalize } from 'rxjs/operators';
import { ActorInformationSocialConflictComponent } from './actor-information/actor-information.component';
import { EditActorInformationSocialConflictComponent } from './actor-information/edit-actor-information/edit-actor-information.component';
import { ConditionInformationSocialConflictComponent } from './condition-information/condition-information.component';
import { CreateEditConditionInformationSocialConflictComponent } from './condition-information/create-edit-condition-information/create-edit-condition-information.component';
import { CreateEditFactInformationSocialConflictComponent } from './fact-information/create-edit-fact-information/create-edit-fact-information.component';
import { FactInformationSocialConflictComponent } from './fact-information/fact-information.component';
import { AttachedFileManagementInformationSocialConflictComponent } from './management-information/attached-file-management/attached-file-management.component';
import { CreateEditManagementInformationSocialConflictComponent } from './management-information/create-edit-management/create-edit-management.component';
import { ManagementInformationSocialConflictComponent } from './management-information/management-information.component';
import { CreateEditRiskInformationSocialConflictComponent } from './risk-information/create-edit-risk-information/create-edit-risk-information.component';
import { RiskInformationSocialConflictComponent } from './risk-information/risk-information.component';
import { CreateEditStateInformationSocialConflictComponent } from './state-information/create-edit-state/create-edit-state.component';
import { StateInformationSocialConflictComponent } from './state-information/state-information.component';
import { CreateEditSugerenceInformationSocialConflictComponent } from './sugerence-information/create-edit-sugerence/create-edit-sugerence-information.component';
import { SugerenceInformationSocialConflictComponent } from './sugerence-information/sugerence-information.component';
import { CreateEditViolenceFactSocialConflictComponent } from './violence-fact-information/create-edit-violence-fact/create-edit-violence-fact.component';
import { ViolenceFactInformationSocialConflictComponent } from './violence-fact-information/violence-fact-information.component';
import { EditActorInformationComponent } from 'app/application/actor/actor-information/actor-information.component'
import { FindActorComponent } from '@shared/component/find-actor/find-actor.component';
// import { ActorDto } from '@shared/service-proxies/application/actor-proxie';

enum UploadType {
    Management,
}

interface SocialConflictUploadItem {
    type: UploadType;
    parentIndex: number;
    childrenIndex: number;
    file: globalThis.File;
    token?: string;
}

@Component({
    templateUrl: 'create-edit-social-conflict.component.html',
    styleUrls: [
        'create-edit-social-conflict.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class CreateEditSocialConflictComponent extends AppComponentBase implements OnInit {

    @ViewChild('actorInformation', { static: false }) actorInformation: ActorInformationSocialConflictComponent;
    @ViewChild('riskInformation', { static: false }) riskInformation: RiskInformationSocialConflictComponent;
    @ViewChild('managementInformation', { static: false }) managementInformation: ManagementInformationSocialConflictComponent;
    @ViewChild('stateInformation', { static: false }) stateInformation: StateInformationSocialConflictComponent;
    @ViewChild('violenceFactInformation', { static: false }) violenceFactInformation: ViolenceFactInformationSocialConflictComponent;
    @ViewChild('conditionInformation', { static: false }) conditionInformation: ConditionInformationSocialConflictComponent;
    @ViewChild('sugerenceInformation', { static: false }) sugerenceInformation: SugerenceInformationSocialConflictComponent;
    @ViewChild('factInformation', { static: false }) factInformation: FactInformationSocialConflictComponent;
    @ViewChild('findActorModal', { static: false }) findActorModal: FindActorComponent;
    @ViewChild('createEditRiskInformation', { static: false }) createEditRiskInformation: CreateEditRiskInformationSocialConflictComponent;
    @ViewChild('createEditFactInformation', { static: false }) createEditFactInformation: CreateEditFactInformationSocialConflictComponent;
    @ViewChild('createEditManagementInformation', { static: false }) createEditManagementInformation: CreateEditManagementInformationSocialConflictComponent;
    @ViewChild('attachedFileManagementInformation', { static: false }) attachedFileManagementInformation: AttachedFileManagementInformationSocialConflictComponent;
    @ViewChild('createEditStateInformation', { static: false }) createEditStateInformation: CreateEditStateInformationSocialConflictComponent;
    @ViewChild('createEditViolenceFactInformation', { static: false }) createEditViolenceFactInformation: CreateEditViolenceFactSocialConflictComponent;
    @ViewChild('createEditConditionInformation', { static: false }) createEditConditionInformation: CreateEditConditionInformationSocialConflictComponent;
    @ViewChild('createEditSugerenceInformation', { static: false }) createEditSugerenceInformation: CreateEditSugerenceInformationSocialConflictComponent;

    id: number;
    returnUrl: string;
 
    socialConflict: SocialConflictDto;

    actorTypes: SocialConflictActorTypeDto[];
    actorMovements: SocialConflictActorMovementDto[];
    departments: SocialConflictDepartmentDto[];
    facts: SocialConflictFactDto[];
    persons: SocialConflictPersonDto[];
    risks: SocialConflictRiskDto[];
    territorialUnits: SocialConflictTerritorialUnitDto[];
    sectors: SocialConflictSectorDto[];
    typologies: SocialConflictTypologyDto[];
    managements: SocialConflictManagementDto[];

    tabIndex: number = 0;
    loaded: boolean = false;
    busy: boolean = false;

    conditionTypes = {
        none: ConditionType.None,
        open: ConditionType.Open,
        closed: ConditionType.Closed
    }

    hasEditionPermission: boolean = false;
    hasCreationPermission: boolean = false;
    hasPermission: boolean = false;

    constructor(
        _injector: Injector,
        private _route: ActivatedRoute,
        private _socialConflictServiceProxy: SocialConflictServiceProxy,
        private _uploadServiceProxy: UploadServiceProxy,
        private _tokenService: TokenService,
        private _permissionService: PermissionCheckerService) {
        super(_injector);
        this.primengTableHelper.defaultRecordsCountPerPage = 500;
        this.hasEditionPermission = this._permissionService.isGranted('Pages.Application.SocialConflict.Edit');
        this.hasCreationPermission = this._permissionService.isGranted('Pages.Application.SocialConflict.Create');
    }

    ngOnInit() {
        const parameter = this._route.snapshot.paramMap.get('id');
        const tabId: number = +this.getQueryParameter('tab');
        this.id = parameter ? +parameter.replace('[^0-9]', '') : undefined;
        this.returnUrl = this.getQueryParameter('returnUrl');

        if (this.id && !this.isGranted('Pages.Application.SocialConflict')) {
            this.router.navigate(['/app/application/social-conflicts'], { queryParams: {} });
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción')
            return;
        }

        if (!this.id && !this.isGranted('Pages.Application.SocialConflict.Create')) {
            this.router.navigate(['/app/application/social-conflicts'], { queryParams: {} });
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción')
            return;
        }

        this.hasPermission = (this.hasEditionPermission && this.id !== undefined) || (this.hasCreationPermission && !this.id);

        setTimeout(() => {

            this.showMainSpinner(this.id ? 'Cargando información del caso de conflicto' : 'Cargando información');

            this._socialConflictServiceProxy
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
                    this.sectors = response.sectors;
                    this.typologies = response.typologies;
                    this.managements = response.managements;
                    this.socialConflict = response.socialConflict;
                    if (tabId)
                        this.tabIndex = tabId;
                }, () => this.backButtonPressed());

        }, 500);
    }


    addActor() {
        // this.editActorInformation.show(undefined, undefined);
    }

    showSocialFindActorModal() {
        this.findActorModal.show();
     }

    saveActorEdition(event: { index: number, value: SocialConflictActorLocationDto }) {
        this.actorInformation.addOrUpdateItem(event);
    }

    addFact() {
        this.createEditFactInformation.show(undefined, undefined);
    }

    showFactEdition(event: { index: number, value: SocialConflictGeneralFactDto }) {
        this.createEditFactInformation.show(event.index, event.value);
    }

    saveFactEdition(event: { index: number, value: SocialConflictGeneralFactDto }) {
        this.factInformation.addOrUpdateItem(event);
    }

    addManagement() {
        this.createEditManagementInformation.show(undefined, undefined, this.managements, this.persons);
    }

    showManagementEdition(event: { index: number, value: SocialConflictManagementLocationDto }) {
        this.createEditManagementInformation.show(event.index, event.value, this.managements, this.persons);
    }

    showManagementFiles(event: { index: number, value: SocialConflictManagementLocationDto }) {
        this.attachedFileManagementInformation.show(event.value);
    }

    saveManagement(event: { value: SocialConflictManagementLocationDto, index: number }) {
        this.managementInformation.addOrUpdateItem(event);
    }

    addState() {
        this.createEditStateInformation.show(undefined, undefined, this.persons);
    }

    showStateEdition(event: { index: number, value: SocialConflictStateLocationDto }) {
        this.createEditStateInformation.show(event.index, event.value, this.persons);
    }

    saveState(event: { value: SocialConflictStateLocationDto, index: number }) {
        this.stateInformation.addOrUpdateItem(event);
    }

    addViolenceFact() {
        this.createEditViolenceFactInformation.show(undefined, undefined, this.departments, this.facts, this.persons);
    }

    showViolenceFactEdition(event: { index: number, value: SocialConflictViolenceFactDto }) {
        this.createEditViolenceFactInformation.show(event.index, event.value, this.departments, this.facts, this.persons);
    }

    saveViolenceFact(event: { value: SocialConflictViolenceFactDto, index: number }) {
        this.violenceFactInformation.addOrUpdateItem(event);
    }

    addRisk() {
        this.createEditRiskInformation.show(undefined, undefined, this.risks);
    }

    showRiskEdition(event: { index: number, value: SocialConflictRiskLocationDto }) {
        this.createEditRiskInformation.show(event.index, event.value, this.risks);
    }

    saveRisk(event: { value: SocialConflictRiskLocationDto, index: number }) {
        this.riskInformation.addOrUpdateItem(event);
    }

    addCondition() {
        this.createEditConditionInformation.show();
    }

    showConditionEdition(event: { index: number, value: SocialConflictConditionDto }) {
        this.createEditConditionInformation.show(event.index, event.value);
    }

    saveCondition(event: { value: SocialConflictConditionDto, index: number }) {
        this.conditionInformation.addOrUpdateItem(event);
    }

    addSugerence(event: { type: SugerenceType }) {
        this.createEditSugerenceInformation.show(undefined, undefined, event.type);
    }

    showSugerenceEdition(event: { index: number, type: SugerenceType, value: SocialConflictSugerenceDto }) {
        this.createEditSugerenceInformation.show(event.index, event.value, event.type);
    }

    saveSugerence(event: { index: number, type: SugerenceType, value: SocialConflictSugerenceDto }) {
        this.sugerenceInformation.addOrUpdateItem(event);
    }

    save() {

        if (this.isNullEmptyOrWhiteSpace(this.socialConflict.caseName)) {
            this.message.info('La denominación del caso (mesa de diálogo) es obligatoria, debe ingresarla antes de continuar');
            return;
        }

        this.uploadImages();
    }

    backButtonPressed() {
        if (this.returnUrl == 'actors')
            this.router.navigate(['/app/application/social-conflict-actors'], { queryParams: {} });
        else
            this.router.navigate(['/app/application/social-conflicts'], { queryParams: {} });
    }

    private uploadImages() {

        const managementsUploadCount: number = this.socialConflict.managements.reduce((p, c) => p + c.uploadFiles.length, 0);

        if (managementsUploadCount == 0) {
            this.showMainSpinner('Guardando información, por favor espere...');
            this.completeSave();
            return;
        }

        let fileParameterArray: SocialConflictUploadItem[] = [];

        for (let i = 0; i < this.socialConflict.managements.length; i++) {
            for (let r = 0; r < this.socialConflict.managements[i].uploadFiles.length; r++) {
                fileParameterArray.push({
                    type: UploadType.Management,
                    parentIndex: i,
                    childrenIndex: r,
                    file: this.socialConflict.managements[i].uploadFiles[r].file
                });
            }
        }

        this.uploadFiles(fileParameterArray, (result) => {

            for (let item of result) {
                if (item.type == UploadType.Management) {
                    this.socialConflict.managements[item.parentIndex].uploadFiles[item.childrenIndex].token = item.token;
                }
            }

            this.completeSave();
        });
    }

    private uploadFiles(fileParameterArray: SocialConflictUploadItem[], callback: (fileParameterArray: SocialConflictUploadItem[]) => void) {

        this.showMainSpinner('Guardando información, por favor espere...');

        this._uploadServiceProxy
            .uploadFiles(fileParameterArray.map(p => p.file), this._tokenService.getToken())
            .pipe(finalize(() => this.hideMainSpinner()))
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
            this._socialConflictServiceProxy
                .update(this.socialConflict)
                .subscribe(() => {
                    this.loaded = false;
                    this.notify.success('Se actualizó correctamente el conflicto social', 'Aviso');
                    this.resetAndInit();
                }, () => setTimeout(() => this.hideMainSpinner(), 1500));
        else
            this._socialConflictServiceProxy
                .create(this.socialConflict)
                .subscribe((response) => {
                    this.loaded = false;
                    this.notify.success('Se registro correctamente conflicto social', 'Aviso');
                    this.router.navigate(['/app/application/edit-social-conflict', response.id]);
                }, () => setTimeout(() => this.hideMainSpinner(), 1500));
    }

    private resetAndInit() {
        this.loaded = false;
        this.busy = false;
        this.ngOnInit();
    }
}