import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DepartmentDto } from '@shared/service-proxies/application/department-proxie';
import { DistrictDto, DistrictServiceProxy } from '@shared/service-proxies/application/district-proxie';
import { ProvinceDto } from '@shared/service-proxies/application/province-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-district',
    templateUrl: 'create-edit-district.component.html',
    styleUrls: [
        'create-edit-district.component.css'
    ]
})
export class CreateEditDistrictComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    item: DistrictDto = new DistrictDto();
    department: DepartmentDto;
    province: ProvinceDto;
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector, private _districtServiceProxy: DistrictServiceProxy) {
        super(_injector);
    }

    show(department: DepartmentDto, province: ProvinceDto, id?: number): void {

        this.saving = false;
        this.item = new DistrictDto();
        this.department = department;
        this.province = province;
        this.item.enabled = true;
        this.item.provinceId = province.id;
        if (id) {
            this._districtServiceProxy
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
        this.item.ubigeo = this.department.code + this.province.code + this.item.code;

        if (this.item.id)
            this._districtServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });

        else
            this._districtServiceProxy
                .create(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Creado satisfactoriamente');
                    this.close();
                });
    }
}
