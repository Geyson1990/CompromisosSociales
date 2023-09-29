import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { InterventionPlanDto, InterventionPlanMethodologyLocationDto } from '@shared/service-proxies/application/intervention-plan-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LazyLoadEvent, Paginator } from 'primeng';

@Component({
    selector: 'find-methodology',
    templateUrl: 'find-methodology.component.html',
    styleUrls: [
        'find-methodology.component.css'
    ]
})
export class FindMethodologyComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Input() interventionPlan: InterventionPlanDto;

    @Output() modalSave: EventEmitter<InterventionPlanMethodologyLocationDto> = new EventEmitter<InterventionPlanMethodologyLocationDto>();

    active: boolean = false;

    private skipCount: number;
    private maxResultCount: number;

    constructor(_injector: Injector) {
        super(_injector);
        this.primengTableHelper.defaultRecordsCountPerPage = 5;
        this.skipCount = 0;
        this.maxResultCount = this.primengTableHelper.defaultRecordsCountPerPage;
    }

    getData(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    show() {
        this.primengTableHelper.records = this.interventionPlan.methodologies.filter(p => p.id).map(p => new InterventionPlanMethodologyLocationDto(p));
        this.primengTableHelper.totalRecordsCount = this.primengTableHelper.records.length;
        this.formatPagination(this.skipCount, this.maxResultCount);

        this.active = true;
        this.modal.show();
    }

    onShown() {

    }

    close() {
        this.active = false;
        this.modal.hide();
    }

    selectObjective(objective: InterventionPlanMethodologyLocationDto) {
        this.modalSave.emit(objective);
        this.notify.success('Objetivo seleccionado satisfactoriamente');
        this.close();
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.primengTableHelper.records) {
            item.isHidden = true;

            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}