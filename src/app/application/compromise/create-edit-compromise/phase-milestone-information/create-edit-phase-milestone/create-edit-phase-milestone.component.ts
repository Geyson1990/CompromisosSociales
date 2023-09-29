import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CompromiseTimelineDto } from '@shared/service-proxies/application/compromise-proxie';
import { UtilityParameterDto } from '@shared/service-proxies/application/utility-proxie';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'create-edit-phase-milestone',
    templateUrl: 'create-edit-phase-milestone.component.html',
    styleUrls: [
        'create-edit-phase-milestone.component.css'
    ]
})
export class CompromiseCreateEditPhaseMilestoneModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<{ value: CompromiseTimelineDto, index: number }> = new EventEmitter<{ value: CompromiseTimelineDto, index: number }>();

    timeline: CompromiseTimelineDto = new CompromiseTimelineDto();
    rowIndex: number;
    proyectedTime: Date;
    completedTime: Date;
    phases: UtilityParameterDto[];
    milestones: UtilityParameterDto[];
    selectedMilestones: UtilityParameterDto[];

    active: boolean;
    saving: boolean;

    constructor(_injector: Injector) {
        super(_injector);
    }

    show(rowIndex: number, timeline: CompromiseTimelineDto, phases: UtilityParameterDto[], milestones: UtilityParameterDto[]) {

        this.selectedMilestones = [];
        this.phases = phases;
        this.milestones = milestones;

        if (timeline) {
            this.rowIndex = rowIndex;
            this.timeline = CompromiseTimelineDto.fromJS(timeline);
            this.proyectedTime = this.timeline.proyectedTime?.toDate();
            this.completedTime = this.timeline.completedTime?.toDate();

            if (this.timeline.phase && this.timeline.phase.id != -1)
                this.onPhaseChange({ target: { value: this.timeline.phase.id } });
        } else {
            this.rowIndex = undefined;
            this.proyectedTime = undefined;
            this.completedTime = undefined;
            this.timeline = new CompromiseTimelineDto();
        }

        this.active = true;
        this.modal.show();
    }

    onPhaseChange(event: any) {

        const phaseId: number = +event.target.value;
        const index: number = this.phases.findIndex(p => p.id == phaseId);

        if (index != -1) {
            this.timeline.phase.value = this.phases[index].value;
            this.timeline.phase.parentId = this.phases[index].parentId;
            this.timeline.phase.order = this.phases[index].order;
            this.selectedMilestones = this.milestones.filter(p => p.parentId == this.phases[index].id);
        } else {
            this.timeline.milestone.id = -1;
            this.selectedMilestones = [];
        }
    }

    onMilestoneChange(event: any) {

        const milestoneId: number = +event.target.value;
        const index: number = this.milestones.findIndex(p => p.id == milestoneId);

        if (index != -1) {
            this.timeline.milestone.value = this.milestones[index].value;
            this.timeline.milestone.parentId = this.milestones[index].parentId;
            this.timeline.milestone.order = this.milestones[index].order;
        } else {
            this.timeline.milestone.value = undefined;
            this.timeline.milestone.parentId = undefined;
        }
    }

    onShown(): void {

    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        if (this.timeline.phase.id == -1) {
            this.message.error('Debe seleccionar la fase o etapa antes de guardar los cambios', 'Aviso');
            return;
        }
        if (this.timeline.milestone.id == -1) {
            this.message.error('Debe seleccionar el hito antes de guardar los cambios', 'Aviso');
            return;
        }
        if ((!this.proyectedTime || (<any>this.proyectedTime == 'Invalid Date')) && (!this.completedTime || (<any>this.completedTime == 'Invalid Date'))) {
            this.message.error('Debe seleccionar la fecha proyectada o de cumplimiento antes guardar los cambios', 'Aviso');
            return;
        }

        this.timeline.proyectedTime = this.proyectedTime ? moment(this.proyectedTime) : <any>undefined;
        this.timeline.completedTime = this.completedTime ? moment(this.completedTime) : <any>undefined;
        this.modalSave.emit({ index: this.rowIndex, value: this.timeline });
        this.close();
    }
}