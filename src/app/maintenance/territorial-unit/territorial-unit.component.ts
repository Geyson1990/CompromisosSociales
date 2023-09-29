import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import { TerritorialUnitDepartmentRelationDto, TerritorialUnitDto, TerritorialUnitPersonDto, TerritorialUnitServiceProxy } from '@shared/service-proxies/application/territorial-unit-proxie';
import { CreateEditTerritorialUnitComponent } from './create-edit-territorial-unit/create-edit-territorial-unit.component';
import { FindTerritorialUnitDepartmentComponent } from './find-territorial-unit/find-territorial-unit-department.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
    templateUrl: 'territorial-unit.component.html',
    styleUrls: [
        'territorial-unit.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class TerritorialUnitComponent extends AppComponentBase implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditTerritorialUnitModal', { static: true }) createEditTerritorialUnit: CreateEditTerritorialUnitComponent;
    @ViewChild('findTerritorialUnitDepartmentModal', { static: true }) findTerritorialUnitDepartment: FindTerritorialUnitDepartmentComponent;
    @ViewChild('findTerritorialUnitPersonModal', { static: true }) findTerritorialUnitPerson: FindTerritorialUnitDepartmentComponent; 

    filterText: string;

    constructor(_injector: Injector, private _territorialUnitServiceProxy: TerritorialUnitServiceProxy) {
        super(_injector);
    }

    ngOnInit() { }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._territorialUnitServiceProxy
            .getAll(
                this.filterText,
                this.primengTableHelper.getSorting(this.dataTable),
                this.primengTableHelper.getMaxResultCount(this.paginator, event),
                this.primengTableHelper.getSkipCount(this.paginator, event))
            .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
            .subscribe((result) => {
                this.primengTableHelper.records = result.items;
                this.primengTableHelper.totalRecordsCount = result.totalCount;
                this.primengTableHelper.hideLoadingIndicator();
            });
    }

    createTerritorialUnit() {
        this.createEditTerritorialUnit.show();
    }

    editTerritorialUnit(item: TerritorialUnitDto) {
        this.createEditTerritorialUnit.show(item.id);
    }

    deleteTerritorialUnit(item: TerritorialUnitDto) {
        this.message.confirm(`¿Esta seguro de eliminar el registro ${item.name}?`, 'Aviso',
            (isConfirmed) => {
                if (isConfirmed)
                    this._territorialUnitServiceProxy
                        .delete(item.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.error('Eliminado satisfactoriamente');
                        });
            }
        );
    }

    addTerritorialUnitDepartment(item: TerritorialUnitDto) {
        this.findTerritorialUnitDepartment.show(item);
    }

    deleteDepartmentUnit(item: TerritorialUnitDto, subitem: TerritorialUnitDepartmentRelationDto) {
        this.message.confirm(`¿Esta seguro de eliminar el departamento ${subitem.department.name} de la unidad territorial ${item.name}?`, 'Aviso',
            (isConfirmed) => {
                if (isConfirmed)
                    this._territorialUnitServiceProxy
                        .deleteDepartmentUnit(subitem.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.error('Eliminado satisfactoriamente');
                        });
            }
        );
    }

    addCoordinator(territorialUnit: TerritorialUnitDto) {
        this.findTerritorialUnitPerson.show(territorialUnit);
    }
    
    selectCoordinator(territorialUnitPerson: TerritorialUnitPersonDto) {
        this.createEditTerritorialUnit.addOrUpdateItem(territorialUnitPerson);
    }
}