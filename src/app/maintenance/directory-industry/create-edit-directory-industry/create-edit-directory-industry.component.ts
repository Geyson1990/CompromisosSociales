import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DirectoryIndustryDepartmentDto, DirectoryIndustryDistrictDto, DirectoryIndustryDistrictReverseDto, DirectoryIndustryDto, DirectoryIndustryProvinceDto, DirectoryIndustrySectorDto, DirectoryIndustryServiceProxy } from '@shared/service-proxies/application/directory-industry-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-directory-industry',
    templateUrl: 'create-edit-directory-industry.component.html',
    styleUrls: [
        'create-edit-directory-industry.component.css'
    ]
})
export class CreateEditDirectoryIndustryComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    item: DirectoryIndustryDto = new DirectoryIndustryDto();
    departments: DirectoryIndustryDepartmentDto[] = [];
    provinces: DirectoryIndustryProvinceDto[] = [];
    districts: DirectoryIndustryDistrictDto[] = [];

    departmentId: number = -1;
    provinceId: number = -1;
    districtId: number = -1;

    sectors: DirectoryIndustrySectorDto[] = [];
    sectorId: number = -1;

    state: string;
    active: boolean;
    saving: boolean;

    constructor(_injector: Injector, private _directoryindustryServiceProxy: DirectoryIndustryServiceProxy) {
        super(_injector);
    }

    show(id?: number): void {

        this.saving = false;
        this.item = new DirectoryIndustryDto();
        this.state = 'true';
        this.departmentId = -1;
        this.provinceId = -1;
        this.districtId = -1;
        this.sectorId = -1;
        
        this._directoryindustryServiceProxy.get(id).subscribe(result => {

            this.departments = result.departments;
            this.sectors = result.sectors;

            if (result.directoryIndustry) {
                this.item = result.directoryIndustry;
                this.state = result.directoryIndustry.enabled ? 'true' : 'false';

                for (let department of result.departments) {
                    for (let province of department.provinces) {
                        for (let district of province.districts) {
                            if (district.id == this.item.district.id) {

                                this.provinces = department.provinces;
                                this.districts = province.districts;
                                this.departmentId = department.id;
                                this.provinceId = province.id;
                                this.districtId = district.id;
                            }
                        }
                    }
                }

                this.sectorId = this.item.directorySector.id;

                if (this.sectorId != -1) {
                    const sectorIndex: number = this.sectors.findIndex(p => p.id == this.sectorId);
                    if (sectorIndex == -1) {
                        this.sectors.push(DirectoryIndustrySectorDto.fromJS(this.item.directorySector));
                        this.sectors = this.sectors.sort((a, b) => a.name.localeCompare(b.name));
                    }
                }
            }

            if (this.sectorId == -1)
                this.item.directorySector = undefined;
            if (this.departmentId == -1 || this.provinceId == -1 || this.districtId == -1)
                this.item.district = undefined;
            this.active = true;
            this.modal.show();
        });

    }

    onShown(): void {
        document.getElementById('Name').focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    onDepartmentChange(event: any) {
        const departmentId: number = +event.target.value;
        const index: number = this.departments.findIndex(p => p.id == departmentId);
        this.provinceId = -1;
        this.districtId = -1;
        this.provinces = [];
        this.districts = [];
        this.item.district = undefined;

        if (index != -1)
            this.provinces = this.departments[index].provinces;
    }

    onProvinceChange(event: any) {
        const provinceId: number = +event.target.value;
        const index: number = this.provinces.findIndex(p => p.id == provinceId);
        this.districts = [];
        this.districtId = -1;
        this.districts = this.provinces[index].districts;
        this.item.district = undefined;
    }

    onDistrictChange(event: any) {
        const districtId: number = +event.target.value;
        const index: number = this.districts.findIndex(p => p.id == districtId);

        if (index != -1) {
            this.item.district = DirectoryIndustryDistrictReverseDto.fromJS(this.districts[index]);
        } else {
            this.item.district = undefined;
        }
    }

    onSectorChange(event: any) {
        const sectorId: number = +event.target.value;
        const index: number = this.sectors.findIndex(p => p.id == sectorId);

        if (index != -1) {
            this.item.directorySector = this.sectors[index];
        } else {
            this.item.directorySector = undefined;
        }
    }

    save(): void {

        if (!this.item.district) {
            this.message.info('Debe seleccionar el distrito antes de continuar', 'Aviso');
            return;
        }

        if (!this.item.directorySector) {
            this.message.info('Debe seleccionar el sector antes de continuar', 'Aviso');
            return;
        }

        this.saving = true;
        this.item.enabled = this.state && this.state == 'true';

        if (this.item.id) {
            this._directoryindustryServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        } else {
            this._directoryindustryServiceProxy
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
