import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CrisisCommitteeJobDto, CrisisCommitteeJobServiceProxy } from '@shared/service-proxies/application/crisis-committee-job-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-crisis-committee-job',
    templateUrl: 'create-edit-crisis-committee-job.component.html',
    styleUrls: [
        'create-edit-crisis-committee-job.component.css'
    ]
})
export class CreateEditCrisisCommitteeJobComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<void> = new EventEmitter<void>();

    item: CrisisCommitteeJobDto = new CrisisCommitteeJobDto();
    state: string;
    showDescription: string;
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector, private _crisisCommitteeJobServiceProxy: CrisisCommitteeJobServiceProxy) {
        super(_injector);
    }

    show(id?: number): void {

        this.saving = false;
        this.item = new CrisisCommitteeJobDto();
        this.state = 'true';
        this.showDescription = 'false';

        if (id) {
            this._crisisCommitteeJobServiceProxy.get(id).subscribe(result => {
                this.item = result;
                this.state = result.enabled ? 'true' : 'false';
                this.showDescription = result.showDescription ? 'true' : 'false';
                this.active = true;
                this.modal.show();
            });
        } else {
            this.active = true;
            this.modal.show();
        }

    }
    onShown(): void {
        document.getElementById('CrisisCommitteeJobName').focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        this.saving = true;
        this.item.enabled = this.state && this.state == 'true';
        this.item.showDescription = this.showDescription && this.showDescription == 'true';

        if (this.item.id) {
            this._crisisCommitteeJobServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        } else {
            this._crisisCommitteeJobServiceProxy
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
