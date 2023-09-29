import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CompromiseStateDto } from '@shared/service-proxies/application/compromise-state-proxie';
import { CompromiseSubStateDto, CompromiseSubStateServiceProxy, CompromiseSubStateStateDto } from '@shared/service-proxies/application/compromise-sub-state-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-compromise-sub-state',
    templateUrl: 'create-edit-sub-state.component.html',
    styleUrls: [
        'create-edit-sub-state.component.css'
    ]
})
export class CreateEditCompromiseSubStateComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    item: CompromiseSubStateDto = new CompromiseSubStateDto();
    state: string;
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector, private _compromiseSubStateServiceProxy: CompromiseSubStateServiceProxy) {
        super(_injector);
    }

    show(compromiseState: CompromiseStateDto, id?: number): void {
        this.saving = false;
        this.item = new CompromiseSubStateDto();
        this.item.compromiseState = CompromiseSubStateStateDto.fromJS(compromiseState);
        this.state = 'true';

        if (id) {
            this._compromiseSubStateServiceProxy.get(id).subscribe(result => {
                this.item = result;
                this.state = result.enabled ? 'true' : 'false';
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
        this.item.enabled = this.state && this.state == 'true';

        if (this.item.id) {
            this._compromiseSubStateServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        } else {
            this._compromiseSubStateServiceProxy
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
