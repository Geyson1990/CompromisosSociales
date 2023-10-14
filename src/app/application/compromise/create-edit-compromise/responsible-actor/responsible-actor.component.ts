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

    selectedResponsibleActorsAutoComplete: CompromiseResponsibleDto[]=[];

    responsibleTypeId: number = -1;
    responsibleSubTypeId: number = -1;
    responsibleActorId: number = -1;
    responsibleSubActorId: number = -1;
    isAutoComplete : boolean = false;

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
        this.getDataAutoComplete();
    }

    getData(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    getDataAutoComplete(){
        let actores: CompromiseResponsibleActorDto[] = this.responsibleActors.filter(x=>x.responsibleSubType!== undefined && x.responsibleType!== undefined);
        let listadoGeneral: CompromiseResponsibleDto[];


        for(var i=0; i<actores.length; i++){
            for(var x=0; x<actores[i].responsibleSubActors.length; x++){
                let objeto = new CompromiseResponsibleDto;
                objeto.id = undefined;
                objeto.remove = false;
                objeto.responsibleActor = actores[i];
                objeto.responsibleSubActor = actores[i].responsibleSubActors[x];
                debugger;
                this.selectedResponsibleActorsAutoComplete.push(objeto);
            }
        }
        debugger;
        // actores.forEach(function(actor, i) {  
        //     let listado: CompromiseResponsibleDto[];
        // actor.responsibleSubActors.forEach(function(subactor, i){
        //     let objeto = new CompromiseResponsibleDto;
        //     objeto.id = undefined;
        //     objeto.remove = false;
        //     objeto.responsibleActor = actor;
        //     objeto.responsibleSubActor = subactor;
        //     debugger;
        //     listado.push(objeto);
        // });
        // listadoGeneral=listadoGeneral.concat(listado);
    // });

    // this.selectedResponsibleActorsAutoComplete = [...listadoGeneral];

    }

    onResponsibleTypeChange(event: any) {
        debugger;
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

    nameValue(event: any){

    let responsable = this.selectedResponsibleActorsAutoComplete.find(x=>x.responsibleSubActor.name=event);  
    this.responsibleActorId= responsable.responsibleActor.id;
    const responsibleTypeId: number = responsable.responsibleActor.responsibleType.id;
        const responsibleTypeIndex: number = this.responsibleTypes.findIndex(p => p.id == responsibleTypeId);

        if (responsibleTypeIndex != -1) {
            this.selectedResponsibleSubTypes = this.responsibleTypes[responsibleTypeIndex].subTypes;
        } else {
            this.selectedResponsibleSubTypes = [];
        }

    
    const responsibleSubTypeId: number = responsable.responsibleActor.responsibleSubType.id;
    const responsibleSubTypeIndex: number = this.selectedResponsibleSubTypes.findIndex(p => p.id == responsibleSubTypeId);
    const subtype: CompromiseResponsibleSubTypeDto = this.selectedResponsibleSubTypes[responsibleSubTypeIndex];
    this.selectedResponsibleActors = this.responsibleActors.filter(p => p.responsibleSubType?.id == subtype.id);

    const responsibleActorIndex: number = this.selectedResponsibleActors.findIndex(p => p.id == responsable.responsibleActor.id);
    if (responsibleActorIndex != -1) {
        this.selectedResponsibleSubActors = this.selectedResponsibleActors[responsibleActorIndex].responsibleSubActors;
    } else {
        this.selectedResponsibleSubActors = [];
    }
    //this.responsibleSubActorId = -1;


    this.responsibleSubActorId=responsable.responsibleSubActor.id;
    this.isAutoComplete = true;
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
        if(!this.isAutoComplete){
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

        //if (responsibleExists) {
        //    this.message.info('El colaborador seleccionado ya existe', 'Aviso');
        //    return;
        //} 

        this.compromise.responsibles.push(new CompromiseResponsibleDto({
            id: undefined,
            remove: false,
            responsibleActor: this.selectedResponsibleActors[responsibleActorIndex],
            responsibleSubActor: responsibleSubActorIndex < 0 ? undefined : this.selectedResponsibleSubActors[responsibleSubActorIndex]
        }));

        this.notify.success('Se agregó exitosamente el actor involucrado');
        this.formatPagination(this.skipCount, this.maxResultCount);
        this.onResponsibleSubTypeChange({ target: { value: this.responsibleSubTypeId } });
        this.isAutoComplete = false;
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