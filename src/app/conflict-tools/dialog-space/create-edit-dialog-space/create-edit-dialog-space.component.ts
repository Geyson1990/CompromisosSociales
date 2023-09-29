import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FindDirectoryGovernmentComponent } from '@shared/component/find-directory-government/find-directory-government.component';
import { FindSocialConflictComponent } from '@shared/component/find-social-conflict/find-social-conflict.component';
import { DialogSpaceDocumentGetAllDto } from '@shared/service-proxies/application/dialog-space-document-proxie';
import { DialogSpaceDepartmentDto, DialogSpaceDirectoryGovernmentLocationDto, DialogSpaceDto, DialogSpaceLeaderRelationDto, DialogSpacePersonDto, DialogSpaceServiceProxy, DialogSpaceTeamRelationDto, DialogSpaceTerritorialUnitDto, DialogSpaceTypeRelationDto } from '@shared/service-proxies/application/dialog-space.proxie';
import { UtilityDirectoryGovernmentDto, UtilitySocialConflictDto } from '@shared/service-proxies/application/utility-proxie';
import { finalize } from 'rxjs/operators';
import { CreateEditTeamInformationComponent } from './general-information/create-edit-team/create-edit-team.component';
import { DialogSpaceGeneralInformationComponent } from './general-information/general-information.component';

@Component({
    templateUrl: 'create-edit-dialog-space.component.html',
    styleUrls: [
        'create-edit-dialog-space.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class CreateEditDialogSpaceComponent extends AppComponentBase implements OnInit {

    @ViewChild('generalInformation', { static: false }) generalInformation: DialogSpaceGeneralInformationComponent;

    @ViewChild('teamInformationModal', { static: false }) teamInformationModal: CreateEditTeamInformationComponent;

    @ViewChild('findSocialConflictModal', { static: false }) findSocialConflictModal: FindSocialConflictComponent;
    @ViewChild('findDirectoryGovernmentModal', { static: false }) findDirectoryGovernmentModal: FindDirectoryGovernmentComponent;

    id: number;
    loaded: boolean;
    busy: boolean;
    tabIndex: number = 0;

    dialogSpace: DialogSpaceDto;
    territorialUnits: DialogSpaceTerritorialUnitDto[];
    departments: DialogSpaceDepartmentDto[];
    types: DialogSpaceTypeRelationDto[];
    persons: DialogSpacePersonDto[];
    
    constructor(_injector: Injector, private _activatedRoute: ActivatedRoute, private _dialogSpaceServiceProxy: DialogSpaceServiceProxy) {
        super(_injector);
    }

    ngOnInit() {
        const parameter = this._activatedRoute.snapshot.paramMap.get('id');

        this.id = parameter ? +parameter.replace('[^0-9]', '') : undefined;

        if (this.id && !this.isGranted('Pages.ConflictTools.DialogSpace.Edit')) {
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción');
            this.backButtonPressed();
            return;
        }

        if (!this.id && !this.isGranted('Pages.ConflictTools.DialogSpace.Create')) {
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción');
            this.backButtonPressed();
            return;
        }

        setTimeout(() => {
            this.showMainSpinner('Cargando información');

            this._dialogSpaceServiceProxy
                .get(this.id)
                .pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1500)))
                .subscribe(response => {
                    this.departments = response.departments;
                    this.territorialUnits = response.territorialUnits;
                    this.types = response.types;
                    this.persons = response.persons;

                    if (response.dialogSpace)
                        this.dialogSpace = response.dialogSpace;
                    else
                        this.dialogSpace = new DialogSpaceDto();

                    this.loaded = true;
                }, () => this.backButtonPressed());

        }, 500);
    }

    showConflictModal() {
        this.findSocialConflictModal.show();
    }

    selectConflict(socialConflict: UtilitySocialConflictDto) {
        this.message.confirm(`¿Desea importar la información del Conflicto Social?`, 'Aviso', confirmation => {
            if (confirmation) {
                this._dialogSpaceServiceProxy.getAllLocations(socialConflict.id).subscribe(locations => {
                    for (let location of locations.items)
                        this.dialogSpace.locations.push(location);
                    this.generalInformation.selectConflict(socialConflict);
                });
            } else {
                this.generalInformation.selectConflict(socialConflict);
            }
        });
    }

    showDirectoryGovernmentModal() {
        this.findDirectoryGovernmentModal.show(this.dialogSpace.leaders.filter(p => p.directoryGovernment).map(p => p.directoryGovernment.id));
    }

    saveDirectoryGoverment(event: UtilityDirectoryGovernmentDto) {
        const index: number = this.dialogSpace.leaders.findIndex(p => p.directoryGovernment.id == event.id);

        if (index == -1) {
            this.dialogSpace.leaders.push(new DialogSpaceLeaderRelationDto({
                id: undefined,
                directoryGovernment: DialogSpaceDirectoryGovernmentLocationDto.fromJS(event),
                teams: []
            }));
        } else {
            this.message.info('El organismo seleccionado ya está agregado. Por favor verifique la información', 'Aviso');
        }
    }

    showTeam(event: { leader: DialogSpaceLeaderRelationDto, leaderIndex: number, team: DialogSpaceTeamRelationDto, teamIndex: number }) {
        this.teamInformationModal.show(event.leader, event.leaderIndex, event.team, event.teamIndex);
    }

    saveTeam(event: { leader: DialogSpaceLeaderRelationDto, leaderIndex: number, team: DialogSpaceTeamRelationDto, teamIndex: number }) {
        this.generalInformation.addOrUpdateTeam(event);
    }

    addDocument() {
        if (this.id) {
            this.goToDocument();
        } else {
            this.message.confirm('Se registrará el Espacio de Diálogo para habilitar la creación de Documentos. ¿Esta seguro de continuar?', 'Aviso', (confirmation) => {
                if (confirmation) {
                    this.goToDocument();
                }
            });
        }
    }

    editDocument(document: DialogSpaceDocumentGetAllDto) {
        this.goToDocument(document.id);
    }

    save(callback?: (id: number) => void) {
        if (this.isNullEmptyOrWhiteSpace(this.dialogSpace.caseName)) {
            this.message.info('Debe ingresar la denominación del espacio de diálogo antes de guardar los cambios', 'Aviso');
            return;
        }

        if (!this.dialogSpace.socialConflict) {
            this.message.info('Debe seleccionar el conflicto social antes de guardar los cambios', 'Aviso');
            return;
        }
        if (this.dialogSpace.dialogSpaceType.id == -1) {
            this.message.info('Debe seleccionar el tipo de espacio de diálogo antes de guardar los cambios', 'Aviso');
            return;
        }
        if (this.dialogSpace.replaceCode) {
            if (+this.dialogSpace.replaceCode <= 0 || (<any>this.dialogSpace.replaceCode + '').trim() == '') {
                this.message.info('El Código (Número) de reemplazo es obligatorio', 'Aviso');
                return;
            }
            if (+this.dialogSpace.replaceYear <= 0 || (<any>this.dialogSpace.replaceYear + '').trim() == '') {
                this.message.info('El Código (Año) de reemplazo es obligatorio', 'Aviso');
                return;
            }
        }

        this.showMainSpinner('Guardando información, por favor espere...');

        if (this.id)
            this._dialogSpaceServiceProxy
                .update(this.dialogSpace)
                .subscribe(() => {
                    if (callback) {
                        setTimeout(() => {
                            this.hideMainSpinner();
                            callback(this.dialogSpace.id);
                        }, 1000);
                    } else {
                        this.loaded = false;
                        this.notify.success('Se actualizó correctamente la información', 'Aviso');
                        this.resetAndInit();
                    }
                }, () => setTimeout(() => this.hideMainSpinner(), 1500));
        else
            this._dialogSpaceServiceProxy
                .create(this.dialogSpace)
                .subscribe((response) => {
                    if (callback) {
                        setTimeout(() => {
                            this.hideMainSpinner();
                            callback(response.id);
                        }, 1000);
                    } else {
                        this.loaded = false;
                        this.notify.success('Se registro correctamente la información', 'Aviso');
                        this.router.navigate(['/app/conflict-tools/dialog-space/edit-dialog-space', response.id]);
                    }
                }, () => setTimeout(() => this.hideMainSpinner(), 1500));
    }

    backButtonPressed() {
        this.router.navigate(['/app/conflict-tools/dialog-space/dashboard'], { queryParams: {} });
    }

    private goToDocument(documentId?: number) {
        this.save((dialogSpaceId: number) => {
            this.hideMainSpinner();
            if (documentId)
                this.router.navigate(['/app/conflict-tools/dialog-space/edit-document', dialogSpaceId, documentId]);
            else
                this.router.navigate(['/app/conflict-tools/dialog-space/create-document', dialogSpaceId]);
        });
    }

    private resetAndInit() {
        this.loaded = false;
        this.busy = false;
        this.ngOnInit();
    }
}