import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CompromiseDto, CompromiseResponsibleActorDto, CompromiseResponsibleSubActorDto, CompromiseResponsibleSubTypeDto, CompromiseResponsibleTypeDto } from '@shared/service-proxies/application/compromise-proxie';

@Component({
    selector: 'compromise-responsible-actor-old',
    templateUrl: 'responsible-actor.component.html',
    styleUrls: [
        '../create-edit-compromise.component.css'
    ]
})
export class CompromiseResponsibleActorOldComponent extends AppComponentBase implements OnInit {

    private _compromise: CompromiseDto;

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

    constructor(_injector: Injector) {
        super(_injector);
    }

    ngOnInit() {
        if (this.compromise.responsibleActor?.id > 0 && this.compromise?.responsibleActor?.responsibleType) {

            const responsibleTypeIndex: number = this.responsibleTypes.findIndex(p => p.id == this.compromise.responsibleActor.responsibleType.id);

            if (responsibleTypeIndex != -1) {
                this.responsibleTypeId = this.responsibleTypes[responsibleTypeIndex].id;
                this.selectedResponsibleSubTypes = this.responsibleTypes[responsibleTypeIndex].subTypes;

                if (this.compromise.responsibleActor?.responsibleSubType) {
                    const responsibleSubTypeIndex: number = this.selectedResponsibleSubTypes.findIndex(p => p.id == this.compromise.responsibleActor.responsibleSubType.id);

                    if (responsibleTypeIndex != -1) {
                        this.responsibleSubTypeId = this.selectedResponsibleSubTypes[responsibleSubTypeIndex].id;
                        this.selectedResponsibleActors = this.responsibleActors.filter(p => p.responsibleSubType?.id == this.responsibleSubTypeId);

                        const responsibleActorIndex: number = this.selectedResponsibleActors.findIndex(p => p.id == this.compromise.responsibleActor.id);

                        if (responsibleActorIndex != -1) {
                            this.selectedResponsibleSubActors = this.selectedResponsibleActors[responsibleActorIndex].responsibleSubActors;
                        }
                    }
                }
            }
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

        this.responsibleSubTypeId = -1;
        this.compromise.responsibleActor.id = -1;
        this.compromise.responsibleActor.name = undefined;
        this.compromise.responsibleSubActor.id = -1;
        this.compromise.responsibleSubActor.name = undefined;
        this.selectedResponsibleActors = [];
        this.selectedResponsibleSubActors = [];
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
        this.compromise.responsibleActor.id = -1;
        this.compromise.responsibleActor.name = undefined;
        this.compromise.responsibleSubActor.id = -1;
        this.compromise.responsibleSubActor.name = undefined;
    }

    onResponsibleActorChange(event: any) {
        const responsibleTypeId: number = +event.target.value;
        const responsibleActorIndex: number = this.selectedResponsibleActors.findIndex(p => p.id == responsibleTypeId);

        if (responsibleActorIndex != -1) {
            this.selectedResponsibleSubActors = this.selectedResponsibleActors[responsibleActorIndex].responsibleSubActors;
            this.compromise.responsibleActor.name = this.selectedResponsibleActors[responsibleActorIndex].name;
        } else {
            this.selectedResponsibleSubActors = [];
            this.compromise.responsibleActor.name = undefined;
        }

        this.compromise.responsibleSubActor.id = -1;
        this.compromise.responsibleSubActor.name = undefined;
    }
}