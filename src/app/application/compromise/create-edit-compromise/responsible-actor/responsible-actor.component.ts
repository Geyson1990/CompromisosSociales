import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CompromiseDto, CompromiseResponsibleDto, CompromiseResponsibleActorDto, CompromiseResponsibleSubActorDto, CompromiseResponsibleSubTypeDto, CompromiseResponsibleTypeDto } from '@shared/service-proxies/application/compromise-proxie';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'compromise-responsible-actor',
    templateUrl: 'responsible-actor.component.html',
    styleUrls: [
        '../create-edit-compromise.component.css'
    ]
})
export class CompromiseResponsibleActorComponent extends AppComponentBase implements OnInit {

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

    responsibleTypeId: number = -1;
    responsibleSubTypeId: number = -1;
    responsibleActorId: number = -1;
    responsibleSubActorId: number = -1;

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

    onResponsibleTypeChange(event: any) {
        const responsibleTypeId: number = +event.target.value;
        const responsibleTypeIndex: number = this.responsibleTypes.findIndex(p => p.id == responsibleTypeId);

        if (responsibleTypeIndex != -1) {
            this.selectedResponsibleSubTypes = this.responsibleTypes[responsibleTypeIndex].subTypes;
        } else {
            this.selectedResponsibleSubTypes = [];
        }

        this.selectedResponsibleActors = [];
        this.selectedResponsibleSubActors = [];
        this.responsibleSubTypeId = -1;
        this.responsibleActorId = -1;
        this.responsibleSubActorId = -1;
    }

    onResponsibleSubTypeChange(event: any) {
        const responsibleSubTypeId: number = +event.target.value;
        const responsibleSubTypeIndex: number = this.selectedResponsibleSubTypes.findIndex(p => p.id == responsibleSubTypeId);

        if (responsibleSubTypeIndex != -1) {
            const subtype: CompromiseResponsibleSubTypeDto = this.selectedResponsibleSubTypes[responsibleSubTypeIndex];
            this.selectedResponsibleActors = this.responsibleActors.filter(p => p.responsibleSubType?.id == subtype.id);
        } else {
            this.selectedResponsibleActors = [];
        }

        this.selectedResponsibleSubActors = [];
        this.responsibleActorId = -1;
        this.responsibleSubActorId = -1;
    }

    onResponsibleActorChange(event: any) {
        const responsibleActorId: number = +event.target.value;
        const responsibleActorIndex: number = this.selectedResponsibleActors.findIndex(p => p.id == responsibleActorId);

        if (responsibleActorIndex != -1) {
            this.selectedResponsibleSubActors = this.selectedResponsibleActors[responsibleActorIndex].responsibleSubActors;
        } else {
            this.selectedResponsibleSubActors = [];
        }

        this.responsibleSubActorId = -1;
    }

    addResponsible() {
        if (this.responsibleTypeId == -1) {
            this.message.info('Debe seleccionar el tipo de colaborador antes de guardar los cambios', 'Aviso');
            return;
        }
        if (this.responsibleSubTypeId == -1) {
            this.message.info('Debe seleccionar el sub tipo de colaborador antes de guardar los cambios', 'Aviso');
            return;
        }
        if (this.responsibleActorId == -1) {
            this.message.info('Debe seleccionar el colaborador antes de guardar los cambios', 'Aviso');
            return;
        }

        const responsibleActorIndex: number = this.selectedResponsibleActors.findIndex(p => p.id == this.responsibleActorId);
        const responsibleSubActorIndex: number = this.responsibleSubActorId < 0 ? -1 : this.selectedResponsibleSubActors.findIndex(p => p.id == this.responsibleSubActorId);

        if (responsibleActorIndex == -1) {
            this.message.info('Debe seleccionar el sub tipo de colaborador antes de guardar los cambios', 'Aviso');
            return;
        }

        const responsibleExists: boolean = this.responsibleActorId >= 0 && this.responsibleSubActorId >= 0 ?
            this.compromise.responsibles.findIndex(p => p.responsibleActor?.id == this.responsibleActorId && p.responsibleSubActor?.id == this.responsibleSubActorId) != -1 :
            this.compromise.responsibles.findIndex(p => p.responsibleActor?.id == this.responsibleActorId && !p.responsibleSubActor) != -1;

        if (responsibleExists) {
            this.message.info('El colaborador seleccionado ya existe', 'Aviso');
            return;
        }

        this.compromise.responsibles.push(new CompromiseResponsibleDto({
            id: undefined,
            remove: false,
            responsibleActor: this.selectedResponsibleActors[responsibleActorIndex],
            responsibleSubActor: responsibleSubActorIndex < 0 ? undefined : this.selectedResponsibleSubActors[responsibleSubActorIndex]
        }));

        this.notify.success('Se agregó exitosamente el actor involucrado');
        this.formatPagination(this.skipCount, this.maxResultCount);
        this.onResponsibleSubTypeChange({ target: { value: this.responsibleSubTypeId } });
    }

    removeItem(responsible: CompromiseResponsibleDto, index: number) {
        if (responsible.id) {
            responsible.remove = true;
            this.notify.warn('Se ha marcado para eliminar la localización seleccionada');
        } else {
            this.compromise.responsibles.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(responsible: CompromiseResponsibleDto) {
        responsible.remove = false;
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.compromise.responsibles) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}