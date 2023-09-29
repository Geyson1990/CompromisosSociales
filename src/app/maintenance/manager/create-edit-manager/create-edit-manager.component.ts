import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ManagerDto, ManagerServiceProxy, ManagerTerritorialUnitDto } from '@shared/service-proxies/application/manager-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-manager',
    templateUrl: 'create-edit-manager.component.html',
    styleUrls: [
        'create-edit-manager.component.css'
    ]
})
export class CreateEditManagerComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    item: ManagerDto = new ManagerDto();
    territorialUnits: ManagerTerritorialUnitDto[];
    state: string = 'true';
    active: boolean = false;
    saving: boolean = false;

    constructor(_injector: Injector, private _managerServiceProxy: ManagerServiceProxy) {
        super(_injector);
    }

    show(id?: number): void {

        this.saving = false;
        this.item = new ManagerDto();
        this.state = 'true';

        this._managerServiceProxy.get(id).subscribe(result => {
            if (result.manager)
                this.item = result.manager;
            this.state = this.item.enabled ? 'true' : 'false';
            this.territorialUnits = result.territorialUnits;
            this.active = true;
            this.modal.show();
        });
    }

    onShown(): void {
        document.getElementById('ManagerName')?.focus();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    save(): void {
        this.saving = true;
        this.item.enabled = this.state == 'true';

        if (this.item.id)
            this._managerServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.close();
                    this.modalSave.emit();
                    this.notify.success('Registro actualizado satisfactoriamente');
                });

        else
            this._managerServiceProxy
                .create(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.close();
                    this.modalSave.emit();
                    this.notify.success('Registro creado satisfactoriamente');
                });
    }

}