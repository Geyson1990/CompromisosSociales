import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CompromiseDto, CompromiseTimelineDto } from '@shared/service-proxies/application/compromise-proxie';
import { PipMefDto, PIPMEFServiceProxy } from '@shared/service-proxies/application/pip-mef-proxie';
import { UtilityParameterDto } from '@shared/service-proxies/application/utility-proxie';
import { finalize } from 'rxjs/operators';
import { CompromisePhaseMilestoneInformationComponent } from '../phase-milestone-information/phase-milestone-information.component';
@Component({
    selector: 'compromise-pip',
    templateUrl: 'pip.component.html',
    styleUrls: [
        '../create-edit-compromise.component.css'
    ]
})
export class CompromisePipComponent extends AppComponentBase implements OnInit {

    private _compromise: CompromiseDto;
    private _pipPhases: UtilityParameterDto[];
    private _pipMilestones: UtilityParameterDto[];

    @ViewChild('phaseMilestone', { static: false }) phaseMilestone: CompromisePhaseMilestoneInformationComponent;

    @Input() set compromise(value: CompromiseDto) {

        if (!value.pipmef.pIPMilestone) {
            value.pipmef.pIPMilestone = new UtilityParameterDto();
            value.pipmef.pIPMilestone.id = -1;
        }
        if (!value.pipmef.pIPPhase) {
            value.pipmef.pIPPhase = new UtilityParameterDto();
            value.pipmef.pIPPhase.id = -1;
        }
        this._compromise = value;

        this.filterSelectedPip();
    };

    get compromise(): CompromiseDto {
        return this._compromise;
    }

    @Input() set pipPhases(value: UtilityParameterDto[]) {
        this._pipPhases = value;
        this.filterSelectedPip();
    }

    get pipPhases(): UtilityParameterDto[] {
        return this._pipPhases;
    }

    @Input() set pipMilestones(value: UtilityParameterDto[]) {
        this._pipMilestones = value;
        this.filterSelectedPip();
    }

    get pipMilestones(): UtilityParameterDto[] {
        return this._pipMilestones;
    }

    selectPipMilestones: UtilityParameterDto[];

    busy: boolean = false;

    sNIPCode: string;
    unifiedCode: string;

    @Output() addCompromise: EventEmitter<void> = new EventEmitter<void>();
    @Output() editCompromise: EventEmitter<{ index: number, value: CompromiseTimelineDto }> = new EventEmitter<{ index: number, value: CompromiseTimelineDto }>();

    constructor(_injector: Injector, private _pipServiceProxy: PIPMEFServiceProxy) {
        super(_injector);
    }

    ngOnInit() { }

    addEvent() {
        this.addCompromise.emit();
    }

    editEvent(event: any) {
        this.editCompromise.emit(event);
    }

    addOrUpdateItem(event: { value: CompromiseTimelineDto, index: number }) {
        this.phaseMilestone.addOrUpdateItem(event);
    }

    searchSnipCode() {
        this.searchByCode(this.sNIPCode);
    }

    searchUnifiedCode() {
        this.searchByCode(this.unifiedCode);
    }

    filterSelectedPip() {
        if (this.pipMilestones && this.pipPhases && this.compromise) {
            this.pipPhaseChange({ target: { value: this.compromise.pipmef.pIPPhase.id } });
        }
    }

    pipPhaseChange(event: any) {
        const value: number = +event.target.value;
        const index: number = this.pipPhases.findIndex(p => p.id == value);

        if (index != -1) {
            this.selectPipMilestones = this.pipMilestones.filter(p => p.parentId == this.pipPhases[index].id);
        }
    }

    private searchByCode(code: string) {
        this.busy = true;
        this._pipServiceProxy.get(code).pipe(finalize(() => this.busy = false)).subscribe(response => {
            this.compromise.pipmef = response;

            if (!this.compromise.pipmef || (this.compromise.pipmef.snipCode == undefined && this.compromise.pipmef.unifiedCode == undefined)) {
                this.compromise.pipmef = new PipMefDto();
                this.compromise.pipmef.snipCode = this.sNIPCode;
                this.compromise.pipmef.unifiedCode = this.unifiedCode;
            }

            if (!this.compromise.pipmef.pIPMilestone) {
                this.compromise.pipmef.pIPMilestone = new UtilityParameterDto();
                this.compromise.pipmef.pIPMilestone.id = -1;
            }
            if (!this.compromise.pipmef.pIPPhase) {
                this.compromise.pipmef.pIPPhase = new UtilityParameterDto();
                this.compromise.pipmef.pIPPhase.id = -1;
            }
        });
    }

}