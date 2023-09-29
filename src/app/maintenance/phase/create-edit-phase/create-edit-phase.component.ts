import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PhaseDto, PhaseServiceProxy } from '@shared/service-proxies/application/phase-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-phase',
    templateUrl: 'create-edit-phase.component.html',
    styleUrls: [
        'create-edit-phase.component.css'
    ]
})
export class CreateEditPhaseModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    indexes: number[] = [];
    item: PhaseDto = new PhaseDto();
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector, private _phaseServiceProxy: PhaseServiceProxy) {
        super(_injector);
        for (let i = 0; i <= 30; i++)
            this.indexes.push(i);
    }

    show(id?: number): void {

        this.saving = false;
        this.item = new PhaseDto();
        this.item.index = 1;

        if (id) {
            this._phaseServiceProxy.get(id).subscribe(result => {
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
            this._phaseServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        } else {
            this._phaseServiceProxy
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
