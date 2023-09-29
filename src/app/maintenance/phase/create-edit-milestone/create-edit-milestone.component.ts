import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { MilestoneDto, MilestonePhaseDto, MilestoneServiceProxy } from '@shared/service-proxies/application/milestone-proxie';
import { PhaseDto } from '@shared/service-proxies/application/phase-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-milestone',
    templateUrl: 'create-edit-milestone.component.html',
    styleUrls: [
        'create-edit-milestone.component.css'
    ]
})
export class CreateEditMilestoneModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    indexes: number[] = [];
    item: MilestoneDto = new MilestoneDto();
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector, private _milestoneServiceProxy: MilestoneServiceProxy) {
        super(_injector);
        for (let i = 0; i <= 30; i++)
            this.indexes.push(i);
    }

    show(id: number, phase: PhaseDto): void {

        this.saving = false;
        this.item = new MilestoneDto();
        this.item.phase = new MilestonePhaseDto({
            id: phase.id,
            name: phase.name
        });
        
        this.item.index = 1;

        if (id) {
            this._milestoneServiceProxy.get(id).subscribe(result => {
                this.item = result;
                this.active = true;
                this.modal.show();
            });
        } else {
            this.active = true;
            this.modal.show();
        }

    }
    onShown(): void {
        document.getElementById('Name').focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        this.saving = true;

        if (this.item.id) {
            this._milestoneServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        } else {
            this._milestoneServiceProxy
                .create(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Creado satisfactoriamente');
                    this.close();
                });
        }

    }
}
