import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { StaticVariableCuantitativeDto, StaticVariableDto, StaticVariableFamilyType, StaticVariableOptionDetailDto, StaticVariableOptionDto, StaticVariableOptionType, StaticVariableServiceProxy, StaticVariableSiteType } from '@shared/service-proxies/application/static-variable-proxie';
import { CreateEditOptionVariableModalComponent } from '../create-edit-option-variable/create-edit-option-variable.component';
import { FindDinamicVariableModalComponent } from '@shared/component/find-dinamic-variable/find-dinamic-variable.component';
import { finalize } from 'rxjs/operators';
import { EntityDto } from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: 'create-edit-static-variable.component.html',
    styleUrls: [
        'create-edit-static-variable.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class CreateEditStaticVariableComponent extends AppComponentBase implements OnInit {

    @ViewChild('createEditOptionVariableModal', { static: true }) createEditOptionVariableModal: CreateEditOptionVariableModalComponent;
    @ViewChild('findDinamicVariableModal', { static: true }) searchDinamicVariableModal: FindDinamicVariableModalComponent;

    id: number;
    loaded: boolean;
    editing: boolean;
    busy: boolean;

    item: StaticVariableDto = new StaticVariableDto();

    options: StaticVariableOptionDto[] = [];

    deletedOptions: EntityDto[] = [];
    deletedOptionDetails: EntityDto[] = [];

    types = {
        none: StaticVariableOptionType.None,
        cualitative: StaticVariableOptionType.Cualitative,
        cuantitative: StaticVariableOptionType.Cuantitative
    }

    families = {
        none: StaticVariableFamilyType.None,
        prospectiveRisk: StaticVariableFamilyType.ProspectiveRisk,
        projectRisk: StaticVariableFamilyType.ProjectRisk
    }

    sites = {
        none: StaticVariableSiteType.None,
        impact: StaticVariableSiteType.Impact,
        probability: StaticVariableSiteType.Probability
    }

    constructor(_injector: Injector, private route: ActivatedRoute, private _staticVaribleServiceProxy: StaticVariableServiceProxy) {
        super(_injector);
    }


    ngOnInit() {
        const parameter = this.route.snapshot.paramMap.get('id');
        this.id = parameter ? +parameter.replace('[^0-9]', '') : undefined;

        if (this.id && !this.isGranted('Pages.Management.StaticVariable.Edit')) {
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción');
            this.backButtonPressed();
            return;
        }

        if (!this.id && !this.isGranted('Pages.Management.StaticVariable.Create')) {
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción');
            this.backButtonPressed();
            return;
        }

        if (this.id) {
            this._staticVaribleServiceProxy.get(this.id).subscribe((response) => {
                this.item = response;
                this.options = response.options;
                this.loaded = true;
            }, () => this.backButtonPressed());
        } else {
            this.item.family = this.route.snapshot.data.type;
            this.loaded = true;
        }
    }

    addOption() {
        this.createEditOptionVariableModal.show(this.item);
    }

    optionSave(result: { value: StaticVariableOptionDto, editing: boolean }) {
        if (result.editing) {
            this.options[result.value.index] = result.value;
        } else {
            this.options.push(result.value);
        }
        this.item.weight = this.roundNumber(this.options.reduce((previous, current) => previous + (+current.value), 0), 2);
    }

    editOption(option: StaticVariableOptionDto, index: number) {
        option.index = index;
        this.createEditOptionVariableModal.show(this.item, new StaticVariableOptionDto(option));
    }

    deleteOption(option: StaticVariableOptionDto, index: number) {
        this.message.confirm(`¿Esta seguro de eliminar la variable ${option.name}?`, 'Aviso', confirmation => {
            if (confirmation) {
                if (option.id)
                    this.deletedOptions.push(option);
                this.options.splice(index, 1);
                this.item.weight = this.roundNumber(this.options.reduce((previous, current) => previous + (+current.value), 0), 2);
            }
        });
    }

    addOptionDetail(optionIndex: number) {
        if (!this.options[optionIndex].details)
            this.options[optionIndex].details = [];

        const index: number = this.options[optionIndex].details.length;
        const lastValue: number = index == 0 ? 0 : +this.options[optionIndex].details[index - 1].value;

        this.options[optionIndex].details.push(new StaticVariableOptionDetailDto({
            id: undefined,
            name: '',
            index: index,
            value: lastValue || (lastValue == 0 && index != 0) ? this.roundNumber(lastValue + 0.2, 2) : lastValue
        }));
    }

    deleteOptionDetail(optionDetail: StaticVariableOptionDetailDto, optionIndex: number, optionDetailIndex: number) {
        this.message.confirm(`¿Esta seguro de eliminar la categoría ${(optionDetail.name ? optionDetail.name : 'seleccionada')}?`, 'Aviso', confirmation => {
            if (confirmation) {
                if (optionDetail.id)
                    this.deletedOptionDetails.push(optionDetail);
                this.options[optionIndex].details.splice(optionDetailIndex, 1);
            }
        });
    }

    save() {
        if (this.isNullEmptyOrWhiteSpace(this.item.name)) {
            this.message.info('Debe ingresar el nombre de la dimensión de riesgo antes de continuar', 'Aviso');
            return;
        }

        if (this.item.family != this.families.projectRisk && this.item.family != this.families.prospectiveRisk) {
            this.message.info('Debe seleccionar un tipo de variable válido antes de continuar', 'Aviso');
            return;
        }

        if (this.item.family == this.families.projectRisk) {
            let index: number = 0;

            for (let option of this.options) {

                if (option.site == StaticVariableSiteType.None) {
                    this.message.confirm(`Debe ingresar el segmento de la variable N ${index + 1}, presione en "Si" editar la opción`, 'Aviso', confirmation => {
                        if (confirmation) {
                            option.index = index;
                            this.createEditOptionVariableModal.show(this.item, new StaticVariableOptionDto(option));
                        }
                    });
                    return;
                }

                if (!option.details)
                    option.details = [];

                if (option.details.length == 0) {
                    this.message.info(`Debe ingresar al menos una categoría en la variable Nº ${index + 1}`, 'Aviso');
                    return;
                }

                let detailIndex: number = 0;

                for (let detail of option.details) {
                    if (this.isNullEmptyOrWhiteSpace(detail.name)) {
                        this.message.confirm(`Debe ingresar la descripción de la categoría de la variable Nº ${index + 1}, presione en "Si" editar la categoría`, 'Aviso', confirmation => {
                            if (confirmation) {
                                setTimeout(() => {
                                    document.getElementById(`name${index}a_${detailIndex}`)?.focus();
                                }, 500);
                            }
                        });
                        return;
                    }

                    const value = +(`${detail.value ? detail.value : 0}`.replace('[^0-9]', ''));

                    if (value != 0 && (!value || isNaN(value))) {
                        this.message.confirm(`Debe ingresar el puntaje de la categoría de la variable Nº ${index + 1}, presione en "Si" editar la categoría`, 'Aviso', confirmation => {
                            if (confirmation) {
                                setTimeout(() => {
                                    document.getElementById(`name${index}b_${detailIndex}`)?.focus();
                                }, 500);
                            }
                        });
                        return;
                    }

                    if (value == 0)
                        detail.value = value;

                    detailIndex++;
                }

                for (let i: number = 0; i < option.details.length; i++) {
                    const initialValue: number = typeof option.details[i - 1] === 'undefined' ? option.details[i].value : option.details[i - 1].value;
                    const endValue: number = option.details[i].value;

                    if (i > 0 && (initialValue >= endValue || endValue <= initialValue)) {
                        this.message.info(`Las categorías de la variable Nº ${index + 1} tienen un puntaje inválido, cada nueva categoría de tener un puntaje mayor que la categoría anterior, debe editarlo antes de guardar`, 'Aviso');
                        return;
                    }
                }

                index++;
            }
        } else {
            let index: number = 0;

            for (let option of this.options) {
                if (!option.details)
                    option.details = [];

                if (option.details.length == 0) {
                    this.message.info(`Debe ingresar al menos una categoría en la variable Nº ${index + 1}`, 'Aviso');
                    return;
                }
                index++;
            }
        }

        if (this.busy)
            return;

        this.busy = true;
        this.item.options = this.options;
        this.item.deletedOptionDetails = undefined;
        this.item.deletedOptions = undefined;

        this.showMainSpinner('Guardando información, por favor espere...');

        if (this.id) {
            this.item.deletedOptionDetails = this.deletedOptionDetails;
            this.item.deletedOptions = this.deletedOptions;
            this._staticVaribleServiceProxy.update(this.item).pipe(finalize(() => setTimeout(() => {
                this.busy = false;
                this.hideMainSpinner();
            }, 1000))).subscribe(() => {
                this.notify.success('Actualizado satisfactoriamente');
                this.backButtonPressed();
            });
        } else {
            this._staticVaribleServiceProxy.create(this.item).pipe(finalize(() => setTimeout(() => {
                this.busy = false;
                this.hideMainSpinner();
            }, 1000))).subscribe((response) => {
                this.notify.success('Creado satisfactoriamente');
                this.backButtonPressed();
            });
        }
    }

    findDinamicVariable() {
        this.searchDinamicVariableModal.show();
    }

    selectDinamicVariable(dinamicVariable: StaticVariableCuantitativeDto) {
        this.createEditOptionVariableModal.selectDinamicVariable(dinamicVariable);
    }

    backButtonPressed() {
        if (this.route.snapshot.data.type == StaticVariableFamilyType.ProspectiveRisk)
            this.router.navigate(['/app/management/prospective-risk-static-variable']);
        if (this.route.snapshot.data.type == StaticVariableFamilyType.ProjectRisk)
            this.router.navigate(['/app/management/project-risk-static-variable']);
    }
}