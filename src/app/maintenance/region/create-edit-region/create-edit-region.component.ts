import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { RegionDepartmentGetDto, RegionDistrictGetDto, RegionDto, RegionProvinceDto, RegionProvinceGetDto, RegionServiceProxy } from '@shared/service-proxies/application/region-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-region',
    templateUrl: 'create-edit-region.component.html',
    styleUrls: [
        'create-edit-region.component.css'
    ]
})
export class CreateEditRegionComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    item: RegionDto = new RegionDto();
    departments: RegionDepartmentGetDto[];

    state: string;
    active: boolean;
    saving: boolean;

    selectedProvinces: RegionProvinceGetDto[] = [];
    selectedDistricts: RegionDistrictGetDto[] = [];

    constructor(_injector: Injector, private _regionServiceProxy: RegionServiceProxy) {
        super(_injector);
    }

    show(id?: number): void {
        this._regionServiceProxy.get(id).subscribe(result => {
            this.item = result.region;
            this.departments = result.departments;
            this.state = result.region.enabled ? 'true' : 'false';
            this.saving = false;
            this.active = true;

            if(this.item.district.province.department.id != -1) {

                const departmentIndex: number = this.departments.findIndex(p => p.id == this.item.district.province.department.id);

                if(departmentIndex == -1) {
                    this.item.resetDistrict
                } else {
                    this.selectedProvinces = this.departments[departmentIndex].provinces;
                    const provinceIndex: number = this.selectedProvinces.findIndex(p => p.id == this.item.district.province.id);

                    if(provinceIndex == -1) {
                        this.item.resetDistrict();
                    } else {
                        this.selectedDistricts = this.departments[departmentIndex].provinces[provinceIndex].districts;
                        const districtIndex: number = this.selectedDistricts.findIndex(p => p.id == this.item.district.id);

                        if(districtIndex == -1) {
                            this.item.resetDistrict();
                        }
                    }
                }
            } else {
                this.item.resetDistrict();
            }

            this.modal.show();
        });

    }

    onDepartmentChange(event: any) {
        const departmentId: number = +event.target.value;
        const index: number = this.departments.findIndex(p => p.id == departmentId);
        this.item.district.province.id = -1;
        this.item.district.id = -1;
        this.selectedProvinces = [];
        this.selectedDistricts = [];

        if (index != -1)
            this.selectedProvinces = this.departments[index].provinces;
    }

    onProvinceChange(event: any) {
        const provinceId: number = +event.target.value;
        const index: number = this.selectedProvinces.findIndex(p => p.id == provinceId);
        this.selectedDistricts = [];
        this.item.district.id = -1;
        this.selectedDistricts = this.selectedProvinces[index].districts;
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

        if(this.item.district.id == -1) {
            this.message.info('Debe seleccionar el distrito del centro poblado antes de continuar');
            return;
        }
        if(this.isNullEmptyOrWhiteSpace(this.item.code)) {
            this.message.info('Debe ingresar el código del centro poblado antes de continuar');
            return;
        }
        if(this.isNullEmptyOrWhiteSpace(this.item.name)) {
            this.message.info('Debe ingresar el nombre del centro poblado antes de continuar');
            return;
        }
        
        if (this.item.id) {
            this._regionServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        } else {
            this._regionServiceProxy
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
