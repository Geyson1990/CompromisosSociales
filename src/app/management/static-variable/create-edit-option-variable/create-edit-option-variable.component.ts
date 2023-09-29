import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { StaticVariableCuantitativeDto, StaticVariableDto, StaticVariableFamilyType, StaticVariableOptionDto, StaticVariableOptionType, StaticVariableSiteType } from '@shared/service-proxies/application/static-variable-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'create-edit-option-variable',
    templateUrl: 'create-edit-option-variable.component.html',
    styleUrls: [
        'create-edit-option-variable.component.css'
    ]
})
export class CreateEditOptionVariableModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: StaticVariableOptionDto, editing: boolean }> = new EventEmitter<{ value: StaticVariableOptionDto, editing: boolean }>();
    @Output() searchDinamicVariable: EventEmitter<void> = new EventEmitter<void>();

    item: StaticVariableOptionDto = new StaticVariableOptionDto();
    staticVariable: StaticVariableDto;
    saving: boolean = false;
    active: boolean = false;
    editing: boolean = false;

    state: string = 'false';

    types = {
        none: StaticVariableOptionType.None,
        cualitative: StaticVariableOptionType.Cualitative,
        cuantitative: StaticVariableOptionType.Cuantitative
    }

    sites = {
        none: StaticVariableSiteType.None,
        impact: StaticVariableSiteType.Impact,
        probability: StaticVariableSiteType.Probability
    }

    families = {
        none: StaticVariableFamilyType.None,
        prospectiveRisk: StaticVariableFamilyType.ProspectiveRisk,
        projectRisk: StaticVariableFamilyType.ProjectRisk
    }
    
    constructor(_injector: Injector) {
        super(_injector);
    }

    show(staticVariable: StaticVariableDto, item?: StaticVariableOptionDto): void {
        this.staticVariable = staticVariable;
        this.item = new StaticVariableOptionDto();
        this.item.enabled = false;
        this.item.type = StaticVariableOptionType.None;
        this.item.details = [];
        this.item.site = StaticVariableSiteType.None;
        this.state = 'false';
        this.saving = false;

        if (item) {
            this.editing = true;
            this.item = item;
            this.active = true;
            this.state = this.item.enabled ? 'true' : 'false';
            this.modal.show();
        }
        else {
            this.editing = false;
            this.active = true;
            this.modal.show();
        }
    }

    selectDinamicVariable(dinamicVariable: StaticVariableCuantitativeDto) {
        this.item.dinamicVariable = dinamicVariable;
    }

    onShown(): void {
        document.getElementById('Name').focus();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    save(): void {
        
        if (this.isNullEmptyOrWhiteSpace(this.item.name)) {
            this.message.info('El nombre de la variable es obligatoria', 'Aviso');
            return;
        }

        if (this.item.type == this.types.cuantitative && this.item.dinamicVariable == undefined) {
            this.message.info('Debe seleccionar la variable cuantitativa asociada antes de continuar', 'Aviso');
            return;
        }

        if (this.item.type == this.types.none) {
            this.message.info('Debes seleccionar el "Tipo" antes de continuar', 'Aviso');
            return;
        }

        if (!this.item.value || this.item.value <= 0) {
            this.message.info('Debe ingresar un peso válido para la variable', 'Aviso');
            return;
        }

        if (this.saving)
            return;

        this.saving = true;
        this.item.enabled = this.state == 'true';
        this.item.value = this.roundNumber(+this.item.value, 2);
        this.modalSave.emit({ value: this.item, editing: this.editing });
        this.close();
    }

    searchVariable() {
        this.searchDinamicVariable.emit()
    }
}