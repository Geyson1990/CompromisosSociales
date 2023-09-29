import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { OrderDepartmentDto, OrderDistrictDto, OrderDto, OrderProvinceDto, OrderServiceProxy, OrderType } from '@shared/service-proxies/application/order-proxie';
import { PIPMEFServiceProxy } from '@shared/service-proxies/application/pip-mef-proxie';
import { UtilityDepartmentDto, UtilityDistrictDto, UtilityParameterDto, UtilityProvinceDto, UtilitySocialConflictDto, UtilityTerritorialUnitDto } from '@shared/service-proxies/application/utility-proxie';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'create-edit-order.component.html',
    styleUrls: [
        'create-edit-order.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class CreateEditOrderComponent extends AppComponentBase implements OnInit {

    id: number;
    activeIndex: number = 0;

    order: OrderDto = new OrderDto();
    orderDate: Date;
    territorialUnits: UtilityTerritorialUnitDto[];
    departments: OrderDepartmentDto[];

    selectedDepartments: OrderDepartmentDto[];
    selectedProvinces: OrderProvinceDto[];
    selectedDistricts: OrderDistrictDto[];

    orderTypes = {
        none: OrderType.None,
        pip: OrderType.PIP,
        activity: OrderType.Activity
    }

    sNIPCode: string;
    unifiedCode: string;
    busy: boolean = false;

    constructor(_injector: Injector, private _orderServiceProxy: OrderServiceProxy, private _pipServiceProxy: PIPMEFServiceProxy) {
        super(_injector);
    }

    ngOnInit() {
        this.id = +this.getQueryParameter('id') <= 0 ? undefined : +this.getQueryParameter('id');

        if (this.id && !this.isGranted('Pages.Application.Order.Edit')) {
            this.router.navigate(['/app/application/orders'], { queryParams: {} });
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción')
            return;
        }

        if (!this.id && !this.isGranted('Pages.Application.Order.Create')) {
            this.router.navigate(['/app/application/orders'], { queryParams: {} });
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción')
            return;
        }

        this.showMainSpinner(this.id ? 'Cargando información del pedido' : 'Cargando información');

        this._orderServiceProxy
            .get(this.id)
            .subscribe(response => {
                this.hideMainSpinner();
                this.territorialUnits = response.territorialUnits;
                this.departments = response.departments;

                if (this.id) {
                    if (!response.order.territorialUnit) {
                        response.order.territorialUnit = new UtilityTerritorialUnitDto();
                        response.order.territorialUnit.id = -1;
                    }
                    if (!response.order.department) {
                        response.order.department = new UtilityDepartmentDto();
                        response.order.department.id = -1;
                    }
                    if (!response.order.province) {
                        response.order.province = new UtilityProvinceDto();
                        response.order.province.id = -1;
                    }
                    if (!response.order.district) {
                        response.order.district = new UtilityDistrictDto();
                        response.order.district.id = -1;
                    }

                    const territorialUnitIndex: number = this.territorialUnits.findIndex(p => p.id == response.order.territorialUnit.id);

                    if (territorialUnitIndex != -1) {
                        this.selectedDepartments = this.departments.filter(p => p.territorialUnitId == response.order.territorialUnit.id);
                        const departmentIndex: number = this.departments.findIndex(p => p.id == response.order.department.id && p.territorialUnitId == response.order.territorialUnit.id);

                        if (departmentIndex != -1) {
                            this.selectedProvinces = this.departments[departmentIndex].provinces;

                            const provinceIndex: number = this.departments[departmentIndex].provinces.findIndex(p => p.id == response.order.department.id);

                            if (provinceIndex != -1) {
                                this.selectedDistricts = this.departments[departmentIndex].provinces[provinceIndex].districts;
                                const districtIndex: number = this.departments[departmentIndex].provinces[provinceIndex].districts.findIndex(p => p.id == response.order.district.id);

                                if (districtIndex == -1) {
                                    response.order.district = new UtilityDistrictDto();
                                    response.order.district.id = -1;
                                }

                            } else {
                                response.order.province = new UtilityProvinceDto();
                                response.order.province.id = -1;
                                response.order.district = new UtilityDistrictDto();
                                response.order.district.id = -1;
                            }

                        } else {
                            response.order.department = new UtilityDepartmentDto();
                            response.order.department.id = -1;
                            response.order.province = new UtilityProvinceDto();
                            response.order.province.id = -1;
                            response.order.district = new UtilityDistrictDto();
                            response.order.district.id = -1;
                        }
                    } else {
                        response.order.territorialUnit = new UtilityTerritorialUnitDto();
                        response.order.territorialUnit.id = -1;
                        response.order.department = new UtilityDepartmentDto();
                        response.order.department.id = -1;
                        response.order.province = new UtilityProvinceDto();
                        response.order.province.id = -1;
                        response.order.district = new UtilityDistrictDto();
                        response.order.district.id = -1;
                    }

                    this.order = response.order;
                    this.orderDate = response.order.orderDate ? response.order.orderDate.toDate() : <any>undefined;
                }
            }, () => {
                this.hideMainSpinner();
                this.router.navigate(['/app/application/orders'], { queryParams: {} });
            });
    }

    onTerritorialUnitChange(event: any) {

        const territorialUnitId: number = +event.target.value;
        const index: number = this.territorialUnits.findIndex(p => p.id == territorialUnitId);

        if (index != -1)
            this.selectedDepartments = this.departments.filter(p => p.territorialUnitId == territorialUnitId);
        else
            this.selectedDepartments = [];

        this.selectedProvinces = [];
        this.selectedDistricts = [];
        this.order.department.id = -1;
        this.order.province.id = -1;
        this.order.district.id = -1;
    }

    onDepartmentChange(event: any) {

        const departmentId: number = +event.target.value;
        const index: number = this.departments.findIndex(p => p.id == departmentId);
        this.order.province.id = -1;
        this.order.district.id = -1;
        this.selectedProvinces = [];
        this.selectedDistricts = [];

        if (index != -1)
            this.selectedProvinces = this.departments[index].provinces;
    }

    onProvinceChange(event: any) {

        const provinceId: number = +event.target.value;
        const index: number = this.selectedProvinces.findIndex(p => p.id == provinceId);
        this.selectedDistricts = [];
        this.order.district.id = -1;

        if (index != -1)
            this.selectedDistricts = this.selectedProvinces[index].districts;
    }

    save() {

        if (this.orderDate)
            this.order.orderDate = moment(this.orderDate);

        //if (!this.order.socialConflict) {
        //    this.message.error('Debe seleccionar el conflicto social antes de continuar', 'Aviso');
        //    return;
        //}
        if (!this.order.orderDate) {
            this.message.error('La fecha del pedido es obligatoria', 'Aviso');
            return;
        }
        if (this.isNullEmptyOrWhiteSpace(this.order.document)) {
            this.message.error('El número de documento es obligatorio, debe ingresarlo antes de continuar', 'Aviso');
            return;
        }
        if (this.order.type == OrderType.None) {
            this.message.error('Seleccione el tipo de pendido antes de continuar', 'Aviso');
            return;
        }
        if (this.isNullEmptyOrWhiteSpace(this.order.document)) {
            this.message.error('La denominación del proyecto/actividad es obligatoria, debe ingresarlo antes de continuar', 'Aviso');
            return;
        }

        this.showMainSpinner('Guardando información, por favor espere...');

        if (this.id)
            this._orderServiceProxy
                .update(this.order)
                .pipe(finalize(() => this.hideMainSpinner()))
                .subscribe(() => {
                    this.notify.success('Se actualizó correctamente el pedido', 'Aviso');
                    this.router.navigate(['/app/application/orders'], { queryParams: {} });
                });
        else
            this._orderServiceProxy
                .create(this.order)
                .pipe(finalize(() => this.hideMainSpinner()))
                .subscribe(() => {
                    this.notify.success('Se registro correctamente el pedido', 'Aviso');
                    this.router.navigate(['/app/application/orders'], { queryParams: {} });
                });
    }

    selectSocialConflict(socialConflict: UtilitySocialConflictDto) {
        this.order.socialConflict = socialConflict;
    }

    searchSnipCode() {
        this.searchByCode(this.sNIPCode);
    }

    searchUnifiedCode() {
        this.searchByCode(this.unifiedCode);
    }

    private searchByCode(code: string) {
        this.busy = true;
        this._pipServiceProxy.get(code).pipe(finalize(() => this.busy = false)).subscribe(response => {
            this.order.pIPMEF = response;

            if (!this.order.pIPMEF.pIPMilestone) {
                this.order.pIPMEF.pIPMilestone = new UtilityParameterDto();
                this.order.pIPMEF.pIPMilestone.id = -1;
            }
            if (!this.order.pIPMEF.pIPPhase) {
                this.order.pIPMEF.pIPPhase = new UtilityParameterDto();
                this.order.pIPMEF.pIPPhase.id = -1;
            }
        });
    }

    backButtonPressed() {
        this.router.navigate(['/app/application/orders'], { queryParams: {} });
    }
}