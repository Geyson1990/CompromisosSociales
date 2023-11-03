import { HttpResponse } from '@angular/common/http';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FindRecordComponent } from '@shared/component/find-record/find-record.component';
import { CompromiseDto, CompromiseLocationDto, CompromiseServiceProxy, CompromiseTimelineDto, CompromiseType } from '@shared/service-proxies/application/compromise-proxie';
import { PipMefDto } from '@shared/service-proxies/application/pip-mef-proxie';
import { UploadServiceProxy } from '@shared/service-proxies/application/upload-proxie';
import { UtilityParameterDto, UtilityRecordDto, UtilityServiceProxy, UtilitySocialConflictDto } from '@shared/service-proxies/application/utility-proxie';
import { TokenService } from 'abp-ng2-module';
import { TabView } from 'primeng';
import { finalize } from 'rxjs/operators';
import { CompromiseCreateEditPhaseMilestoneModalComponent } from './phase-milestone-information/create-edit-phase-milestone/create-edit-phase-milestone.component';
import { CompromisePipComponent } from './pip/pip.component';
import { SectorMeetSessionAgreementDto, SectorMeetSessionAgreementServiceProxy } from '@shared/service-proxies/application/sector-meet-session-agreement-proxie';

@Component({
    templateUrl: 'create-edit-compromise.component.html',
    styleUrls: [
        'create-edit-compromise.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class CreateEditCompromiseComponent extends AppComponentBase implements OnInit {

    @ViewChild('findRecordModal', { static: true }) findRecord: FindRecordComponent;
    @ViewChild('createEditPhaseMilestoneModal', { static: true }) createEditPhaseMilestoneModal: CompromiseCreateEditPhaseMilestoneModalComponent;
    @ViewChild('pipInformation', { static: false }) pipInformation: CompromisePipComponent;
    @ViewChild('primeTabView', { static: false }) primeTabView: TabView;

    id: number;
    activeIndex: number = 0;
    loaded: boolean = false;

    compromise: CompromiseDto = new CompromiseDto();
    dueDate:Date;
    deadLine:Date;
    socialConflictId: any;
    isPip(): boolean {
        return this.compromise.type == CompromiseType.PIP;
    }
    listSectorMeetSessionAgreementDto: SectorMeetSessionAgreementDto[] = [];
    listConflictGeneral: SectorMeetSessionAgreementDto[] = [];
    listConflictPendings: SectorMeetSessionAgreementDto[] = [];

    type = 1;
    typeTwo = 2;
    indexes = {
        generalInformation: 0,
        responsibleActors: 1,
        pip: 2,
        compromiseTracing: (this.isPip() ? 3 : 2),
        taskManagement: (this.isPip() ? 4 : 3)
    }

    utilities = {
        statuses: [],
        responsibleActors: [],
        responsibleTypes: [],
        criteria: [],
        pipPhases: [],
        pipMilestones: [],
        labels: [],
        states: [],
    }

    compromiseTypes = {
        none: CompromiseType.None,
        pip: CompromiseType.PIP,
        activity: CompromiseType.Activity
    }

    constructor(_injector: Injector,
        private _tokenService: TokenService,
        private _uploadServiceProxy: UploadServiceProxy,
        private _utilityServiceProxy: UtilityServiceProxy,
        private _compromiseServiceProxy: CompromiseServiceProxy,
        private _sectorMeetSessionAgreementServiceProxy: SectorMeetSessionAgreementServiceProxy) {
        super(_injector);
    }

    ngOnInit() {
        this.id = +this.getQueryParameter('id') <= 0 ? undefined : +this.getQueryParameter('id');
        const tabIndex = +this.getQueryParameter('tab') <= 0 ? undefined : +this.getQueryParameter('tab');

        if (this.id && !this.isGranted('Pages.Application.Compromise.Edit')) {
            this.router.navigate(['/app/application/compromises'], { queryParams: {} });
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción')
            return;
        }

        if (!this.id && !this.isGranted('Pages.Application.Compromise.Create')) {
            this.router.navigate(['/app/application/compromises'], { queryParams: {} });
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción')
            return;
        }

        setTimeout(() => {

            this.showMainSpinner(this.id ? 'Cargando información del compromiso' : 'Cargando información');

            this._compromiseServiceProxy
                .get(this.id)
                .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1500)))
                .subscribe(response => {

                    if (this.id) {
                        if (response.compromise && !response.compromise.pipmef)
                            response.compromise.pipmef = new PipMefDto();

                        this.compromise = response.compromise;
                    }

                    if (!this.compromise.status) {
                        this.compromise.status = new UtilityParameterDto({
                            id: -1,
                            order: -1,
                            value: 'Seleccione',
                            parentId: undefined
                        });
                    }

                    this.utilities.statuses = response.statuses;
                    this.utilities.responsibleActors = response.responsibleActors;
                    this.utilities.criteria = response.criteria;
                    this.utilities.pipPhases = response.pipPhases;
                    this.utilities.pipMilestones = response.pipMilestones;
                    this.utilities.responsibleTypes = response.responsibleTypes;
                    this.utilities.labels = response.labels;
                    this.utilities.states = response.states;
                    this.socialConflictId = response?.compromise?.record?.socialConflict?.id;
                    this.loaded = true;
                    this.listConflictPending(this.socialConflictId)
                    if (tabIndex && this.compromise.isPriority) {
                        setTimeout(() => this.activeIndex = 4, 500);
                    }

                }, () => this.router.navigate(['/app/application/compromises'], { queryParams: {} }));

        }, 500)
    }

    listConflictPending (id:number) {
        this._sectorMeetSessionAgreementServiceProxy.get(id).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
            this.listSectorMeetSessionAgreementDto = result;
            this.filterConflictPending();
            console.log(" this._listSectorMeetSessionAgreementDto kkk",this.listSectorMeetSessionAgreementDto)        
            this.primengTableHelper.hideLoadingIndicator();
        });
    }    

    filterConflictPending () {

        this.listConflictPendings = this.listSectorMeetSessionAgreementDto.filter(item => (
            (item.compromiseId === 0 )
                ));

        this.listConflictGeneral = this.listSectorMeetSessionAgreementDto.filter(item => (
        (item.compromiseId !== 0 )
            ));

    }
        

    selectRecord(record: UtilityRecordDto) {
        this.showMainSpinner('Cargando localizaciones del conflicto social...');

        this._utilityServiceProxy
            .getAllSocialConflictLocations(record.socialConflict.id)
            .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1000)))
            .subscribe(response => {
                this.compromise.record = record;
                this.compromise.compromiseLocations = response.items.map(p => {
                    return new CompromiseLocationDto({
                        id: undefined,
                        socialConflictLocation: p,
                        check: false
                    });
                });
            });
    }

    addTimeline() {
        this.createEditPhaseMilestoneModal.show(undefined, undefined, this.utilities.pipPhases, this.utilities.pipMilestones);
    }

    showTimelineEdition(event: { index: number, value: CompromiseTimelineDto }) {
        this.createEditPhaseMilestoneModal.show(event.index, event.value, this.utilities.pipPhases, this.utilities.pipMilestones);
    }

    saveTimeline(event: { value: CompromiseTimelineDto, index: number }) {
        this.pipInformation.addOrUpdateItem(event);
    }

    save() {
        if (!this.compromise.record) {
            this.message.confirm(`Debe seleccionar un acta y asociarla al compromiso, ¿Desea seleccionarlo en este momento?`, 'Aviso', response => {
                if (response) {
                    this.activeIndex = this.indexes.generalInformation;
                    this.findRecord.show();
                }
            });
            return;
        }

        if (this.compromise.type == this.compromiseTypes.none) {
            this.message.info(`Debe el tipo del compromiso, antes de continuar`, 'Aviso');
            this.activeIndex = this.indexes.generalInformation;
            return;
        }

        if (this.isNullEmptyOrWhiteSpace(this.compromise.name)) {
            this.message.info(`Debe ingresar el nombre del compromiso, antes de continuar`, 'Aviso');
            this.activeIndex = this.indexes.generalInformation;
            return;
        }

        if (this.compromise.situations && this.compromise.situations.length > 0 && (!this.compromise.status || this.compromise.status.id == -1)) {
            this.message.info(`Debe seleccionar el estado actual del compromiso, antes de continuar`, 'Aviso');
            this.activeIndex = this.indexes.compromiseTracing;
            return;
        }


        if (this.compromise.type == CompromiseType.PIP && !this.compromise.pipmef) {
            this.message.info(`Debe seleccionar el PIP, antes de continuar`, 'Aviso');
            this.activeIndex = this.indexes.compromiseTracing;
            return;
        }

        this.uploadImages();
    }

    private uploadImages() {
        this.showMainSpinner('Guardando información, por favor espere...');

        if (!this.compromise.uploads || this.compromise.uploads.length == 0) {
            this.completeSave();
            return;
        }

        let indexes: number[] = [];

        for (const { index, value } of this.compromise.uploads.map((value, index) => ({ index, value }))) {
            if (value.uploadFile)
                indexes.push(index);
        }

        setTimeout(() => {

            this._uploadServiceProxy
                .uploadFiles(this.compromise.uploads.filter(p => p.uploadFile).map(p => p.uploadFile.file), this._tokenService.getToken())
                .subscribe(event => {
                    if (event instanceof HttpResponse) {
                        if (event.body.success) {
                            let index: number = 0;
                            for (let token of event.body.result.fileTokens) {
                                this.compromise.uploads[indexes[index]].uploadFile.token = token;
                                index++;
                            }
                            this.completeSave();
                        } else {
                            this.message.info('No se pudo completar la transacción, intente nuevamente mas tarde', 'Aviso');
                            this.hideMainSpinner();
                        }
                    }
                }, err => {
                    this.message.error('No se pudo completar la transacción, intente nuevamente mas tarde', 'Aviso');
                    this.hideMainSpinner();
                });

        }, 1000);

    }

    private completeSave() {
        setTimeout(() => {
            if (this.compromise.id)
                this._compromiseServiceProxy
                    .update(this.compromise)
                    .pipe(finalize(() => this.hideMainSpinner()))
                    .subscribe(() => {
                        this.notify.info('Se registro correctament el compromiso Nº')
                        this.router.navigate(['/app/application/compromises'], { queryParams: {} });
                    });
            else
                this._compromiseServiceProxy
                    .create(this.compromise)
                    .pipe(finalize(() => this.hideMainSpinner()))
                    .subscribe(() => {
                        this.notify.info('Se registro correctament el compromiso Nº')
                        this.router.navigate(['/app/application/compromises'], { queryParams: {} });
                    });
        }, 1000);

    }

    backButtonPressed() {
        this.router.navigate(['/app/application/compromises'], { queryParams: {} });
    }
}