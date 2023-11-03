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
    atucomplete:boolean = false;
    @Input() responsibleActors: CompromiseResponsibleActorDto[];
    @Input() responsibleTypes: CompromiseResponsibleTypeDto[];

    selectedResponsibleActors: CompromiseResponsibleActorDto[];
    selectedResponsibleSubActors: CompromiseResponsibleSubActorDto[];
    selectedResponsibleSubTypes: CompromiseResponsibleSubTypeDto[];
    selectedResponsibleActorsAutoComplete: any[]=[];
    listResponsibleActorsAutoComplete: any[]=[];

    responsibleTypeId: number = -1;
    responsibleSubTypeId: number = -1;
    responsibleActorId: number = -1;
    responsibleSubActorId: number = -1;
    isAutoComplete : boolean = false;
    responsibleActorsAutoComplete: any[];
    actor: any = {};
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
        for (var i = 0; i < actores.length; i++) {
            for (var x = 0; x < actores[i].responsibleSubActors.length; x++) {
                let objeto: any = {}; 
                objeto = {
                  id: actores[i].responsibleSubActors[x].id,
                  name: actores[i].responsibleSubActors[x].name,
                  responsibleActor: {
                   id: actores[i].id,
                   name: actores[i].name
                  } ,
                  responsibleSubType: {
                    id:  actores[i].responsibleSubType.id,
                    name:  actores[i].responsibleSubType.name
                   } ,
                   responsibleType: {
                    id:  actores[i].responsibleType.id,
                    name:  actores[i].responsibleType.name
                   } 
                };
                this.selectedResponsibleActorsAutoComplete.push(objeto);
            }
            console.log("this.selectedResponsibleActorsAutoComplete:",this.selectedResponsibleActorsAutoComplete)
        }
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

    onResponsibleActorSpecificComplete(){
      this.atucomplete = true;
    }

    onResponsibleSubTypeChange(event: any) {
        console.log("eventevent:",event)
        // if(this.actor === undefined || this.actor === null) {
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
        // }
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

    onResponsibleActorSpecific() {
       this.actor = null;
      this.atucomplete = false;
    }

    addResponsible() {
        console.log(this.actor)
        
        if(this.actor!== undefined && this.actor !== null){
            let responsibleActor: any = this.selectedResponsibleActorsAutoComplete.find(x => x.id === this.actor);
          
            console.log("this.responsibleActor:",responsibleActor)

            this.responsibleTypeId = responsibleActor.responsibleType.id;
            this.responsibleSubTypeId = responsibleActor.responsibleSubType.id;
            this.responsibleActorId = responsibleActor.responsibleActor.id;

            let objectDto: CompromiseResponsibleSubActorDto = new CompromiseResponsibleSubActorDto();
            objectDto.id = responsibleActor.id;
            objectDto.name =responsibleActor.name;

            let listDto: CompromiseResponsibleSubActorDto[] = [];        
            listDto.push(objectDto);
            
            let newResponsible:any =  {
                id: responsibleActor.responsibleActor!.id,
                name: responsibleActor.responsibleActor!.name,
                responsibleSubType: responsibleActor!.responsibleSubType,
                responsibleType: responsibleActor!.responsibleType,
                responsibleSubActors: listDto
            }

            this.compromise.responsibles.push(new CompromiseResponsibleDto({
                id: undefined,
                remove: false,
                responsibleActor: newResponsible,
                responsibleSubActor: objectDto
            }));

        } else {

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
    
            this.compromise.responsibles.push(new CompromiseResponsibleDto({
                id: undefined,
                remove: false,
                responsibleActor: this.selectedResponsibleActors[responsibleActorIndex],
                responsibleSubActor: responsibleSubActorIndex < 0 ? undefined : this.selectedResponsibleSubActors[responsibleSubActorIndex]
            }));

        } 

        this.notify.success('Se agregó exitosamente el actor involucrado');
        this.formatPagination(this.skipCount, this.maxResultCount);
        this.onResponsibleSubTypeChange({ target: { value: this.responsibleSubTypeId } });
        this.isAutoComplete = false;
        this.atucomplete = false;
        this.actor = null;
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

    selectEvent(item:any) {
        console.log("item:",item)
    }

    onChangeSearch(search: string) {
        // fetch remote data from here
        // And reassign the 'data' which is binded to 'data' property.
    }
    
    onFocused(e) {
    // do something
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

        console.log("thisccccccc:",this,this.compromise.responsibles)

    }
}