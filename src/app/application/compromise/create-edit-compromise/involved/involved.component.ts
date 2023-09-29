import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CompromiseDto, CompromiseInvolvedLocationDto, CompromiseResponsibleActorDto, CompromiseResponsibleSubActorDto, CompromiseResponsibleSubTypeDto, CompromiseResponsibleTypeDto } from '@shared/service-proxies/application/compromise-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'compromise-involved',
    templateUrl: 'involved.component.html',
    styleUrls: [
        '../create-edit-compromise.component.css'
    ]
})
export class CompromiseInvolvedComponent extends AppComponentBase implements OnInit {

    private _compromise: CompromiseDto;

    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Input() set compromise(value: CompromiseDto) {
        this._compromise = value;
    };

    get compromise(): CompromiseDto {
        return this._compromise;
    }

    @Input() responsibleActors: CompromiseResponsibleActorDto[];
    @Input() responsibleTypes: CompromiseResponsibleTypeDto[];

    selectedResponsibleActors: CompromiseResponsibleActorDto[];
    selectedResponsibleSubActors: CompromiseResponsibleSubActorDto[];
    selectedResponsibleSubTypes: CompromiseResponsibleSubTypeDto[];

    selectedInvolvedActors: CompromiseResponsibleActorDto[];
    selectedInvolvedSubActors: CompromiseResponsibleSubActorDto[];
    selectedInvolvedSubTypes: CompromiseResponsibleSubTypeDto[];

    responsibleTypeId: number = -1;
    responsibleSubTypeId: number = -1;

    involvedTypeId: number = -1;
    involvedSubTypeId: number = -1;
    involvedActorId: number = -1;
    involvedSubActorId: number = -1;

    private skipCount: number = 0;
    private maxResultCount: number = 0;

    constructor(_injector: Injector) {
        super(_injector);
        this.primengTableHelper.defaultRecordsCountPerPage = 5;
        this.skipCount = 0;
        this.maxResultCount = this.primengTableHelper.defaultRecordsCountPerPage;
    }

    ngOnInit() {
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    getData(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
    }


    onInvolvedTypeChange(event: any) {
        const involvedTypeId: number = +event.target.value;
        const involvedTypeIndex: number = this.responsibleTypes.findIndex(p => p.id == involvedTypeId);

        if (involvedTypeIndex != -1) {
            this.selectedInvolvedSubTypes = this.responsibleTypes[involvedTypeIndex].subTypes;
        } else {
            this.selectedInvolvedSubTypes = [];
        }

        this.selectedInvolvedActors = [];
        this.selectedInvolvedSubActors = [];
        this.involvedSubTypeId = -1;
        this.involvedActorId = -1;
        this.involvedSubActorId = -1;
    }

    onInvolvedSubTypeChange(event: any) {
        const involvedSubTypeId: number = +event.target.value;
        const involvedSubTypeIndex: number = this.selectedInvolvedSubTypes.findIndex(p => p.id == involvedSubTypeId);

        if (involvedSubTypeIndex != -1) {
            const subtype: CompromiseResponsibleSubTypeDto = this.selectedInvolvedSubTypes[involvedSubTypeIndex];
            this.selectedInvolvedActors = this.responsibleActors.filter(p => p.responsibleSubType?.id == subtype.id);
        } else {
            this.selectedInvolvedActors = [];
        }

        this.selectedInvolvedSubActors = [];
        this.involvedActorId = -1;
        this.involvedSubActorId = -1;
    }

    onInvolvedActorChange(event: any) {
        const involvedActorId: number = +event.target.value;
        const involvedActorIndex: number = this.selectedInvolvedActors.findIndex(p => p.id == involvedActorId);

        if (involvedActorIndex != -1) {
            this.selectedInvolvedSubActors = this.selectedInvolvedActors[involvedActorIndex].responsibleSubActors;
        } else {
            this.selectedInvolvedSubActors = [];
        }

        this.involvedSubActorId = -1;
    }

    addInvolved() {
        if (this.involvedTypeId == -1) {
            this.message.info('Debe seleccionar el tipo de colaborador antes de guardar los cambios', 'Aviso');
            return;
        }
        if (this.involvedSubTypeId == -1) {
            this.message.info('Debe seleccionar el sub tipo de colaborador antes de guardar los cambios', 'Aviso');
            return;
        }
        if (this.involvedActorId == -1) {
            this.message.info('Debe seleccionar el colaborador antes de guardar los cambios', 'Aviso');
            return;
        }

        const involvedActorIndex: number = this.selectedInvolvedActors.findIndex(p => p.id == this.involvedActorId);
        const involvedSubActorIndex: number = this.involvedSubActorId < 0 ? -1 : this.selectedInvolvedSubActors.findIndex(p => p.id == this.involvedSubActorId);

        if (involvedActorIndex == -1) {
            this.message.info('Debe seleccionar el sub tipo de colaborador antes de guardar los cambios', 'Aviso');
            return;
        }

        const involvedExists: boolean = this.involvedActorId >= 0 && this.involvedSubActorId >= 0 ?
            this.compromise.involved.findIndex(p => p.responsibleActor?.id == this.involvedActorId && p.responsibleSubActor?.id == this.involvedSubActorId) != -1 :
            this.compromise.involved.findIndex(p => p.responsibleActor?.id == this.involvedActorId && !p.responsibleSubActor) != -1;

        if (involvedExists) {
            this.message.info('El colaborador seleccionado ya existe', 'Aviso');
            return;
        }

        this.compromise.involved.push(new CompromiseInvolvedLocationDto({
            id: undefined,
            remove: false,
            responsibleActor: this.selectedInvolvedActors[involvedActorIndex],
            responsibleSubActor: involvedSubActorIndex < 0 ? undefined : this.selectedInvolvedSubActors[involvedSubActorIndex]
        }));

        this.notify.success('Se agregó exitosamente el actor involucrado');
        this.formatPagination(this.skipCount, this.maxResultCount);
        this.onInvolvedSubTypeChange({ target: { value: this.involvedSubTypeId } });
    }

    removeItem(involved: CompromiseInvolvedLocationDto, index: number) {
        if (involved.id) {
            involved.remove = true;
            this.notify.warn('Se ha marcado para eliminar la localización seleccionada');
        } else {
            this.compromise.involved.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(involved: CompromiseInvolvedLocationDto) {
        involved.remove = false;
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.compromise.involved) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}