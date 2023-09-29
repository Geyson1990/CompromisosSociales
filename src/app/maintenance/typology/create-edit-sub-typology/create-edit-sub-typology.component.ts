import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SubTypologyDto, SubTypologyServiceProxy } from '@shared/service-proxies/application/sub-typology-proxie';
import { TypologyDto } from '@shared/service-proxies/application/typology-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-sub-typology',
    templateUrl: 'create-edit-sub-typology.component.html',
    styleUrls: [
        'create-edit-sub-typology.component.css'
    ]
})
export class CreateEditSubTypologyComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    typology: TypologyDto = new TypologyDto();
    item: SubTypologyDto = new SubTypologyDto();
    state: string;
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector, private _subTypologyServiceProxy: SubTypologyServiceProxy) {
        super(_injector);
    }

    show(typology: TypologyDto, id?: number): void {
        this.typology = typology;
        this.saving = false;
        this.item = new SubTypologyDto();
        this.item.typologyId = typology.id;
        this.state = 'true';

        if (id) {
            this._subTypologyServiceProxy.get(id).subscribe(result => {
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
            this._subTypologyServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        } else {
            this._subTypologyServiceProxy
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
