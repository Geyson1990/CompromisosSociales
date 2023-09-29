import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AnalystDto, AnalystServiceProxy } from '@shared/service-proxies/application/analyst-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-analyst',
    templateUrl: 'create-edit-analyst.component.html',
    styleUrls: [
        'create-edit-analyst.component.css'
    ]
})
export class CreateEditAnalystComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    item: AnalystDto = new AnalystDto();
    state: string = 'true';
    active: boolean = false;
    saving: boolean = false;

    constructor(_injector: Injector, private _analystServiceProxy: AnalystServiceProxy) {
        super(_injector);
    }

    show(id?: number): void {

        this.saving = false;
        this.item = new AnalystDto();
        this.state = 'true';

        if (id) {
            this._analystServiceProxy.get(id).subscribe(result => {
                this.item = result;
                this.state = this.item.enabled ? 'true' : 'false';
                this.active = true;
                this.modal.show();
            });
        } else {
            this.active = true;
            this.modal.show();
        }
    }

    onShown(): void {
        document.getElementById('AnalystName')?.focus();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    save(): void {
        this.saving = true;
        this.item.enabled = this.state == 'true';
        
        if (this.item.id)
            this._analystServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.close();
                    this.modalSave.emit();
                    this.notify.success('Registro actualizado satisfactoriamente');
                });

        else
            this._analystServiceProxy
                .create(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.close();
                    this.modalSave.emit();
                    this.notify.success('Registro creado satisfactoriamente');
                });
    }

}