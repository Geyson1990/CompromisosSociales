import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DepartmentDto, DepartmentServiceProxy } from '@shared/service-proxies/application/department-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-department',
    templateUrl: 'create-edit-department.component.html',
    styleUrls: [
        'create-edit-department.component.css'
    ]
})
export class CreateEditDepartmentComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() onDepartmentSave: EventEmitter<DepartmentDto> = new EventEmitter<DepartmentDto>();

    item: DepartmentDto = new DepartmentDto();
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector, private _departmentServiceProxy: DepartmentServiceProxy) {
        super(_injector);
    }

    show(id?: number): void {

        this.saving = false;
        this.item = new DepartmentDto();
        this.item.enabled = true;

        if (id) {
            this._departmentServiceProxy
                .get(id)
                .subscribe(
                    result => {
                        this.item = result;
                        this.active = true;
                        this.modal.show();
                    });
        }
        else {
            this.active = true;
            this.modal.show();
        }

    }
    onShown(): void {
        document.getElementById('Code').focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    save(): void {
        this.saving = true;

        if (this.item.id)
            this._departmentServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.onDepartmentSave.emit(this.item);
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });

        else
            this._departmentServiceProxy
                .create(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Creado satisfactoriamente');
                    this.close();
                });
    }
}
