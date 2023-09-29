import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DepartmentDto } from '@shared/service-proxies/application/department-proxie';
import { ProvinceDto, ProvinceServiceProxy } from '@shared/service-proxies/application/province-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-province',
    templateUrl: 'create-edit-province.component.html',
    styleUrls: [
        'create-edit-province.component.css'
    ]
})
export class CreateEditProvinceComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    item: ProvinceDto = new ProvinceDto();
    department: DepartmentDto;
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector, private _provinceServiceProxy: ProvinceServiceProxy) {
        super(_injector);
    }

    show(department: DepartmentDto, id?: number): void {

        this.saving = false;
        this.item = new ProvinceDto();
        this.department = department;
        this.item.enabled = true;
        this.item.departmentId = department.id;

        if (id) {
            this._provinceServiceProxy
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
            this._provinceServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });

        else
            this._provinceServiceProxy
                .create(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Creado satisfactoriamente');
                    this.close();
                });
    }
}
