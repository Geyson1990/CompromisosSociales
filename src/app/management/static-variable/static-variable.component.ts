import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { StaticVariableDto, StaticVariableFamilyType, StaticVariableServiceProxy } from '@shared/service-proxies/application/static-variable-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'static-variable.component.html',
    styleUrls: [
        'static-variable.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class StaticVariableComponent extends AppComponentBase implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    filterText: string;
    
    constructor(_injector: Injector, private route: ActivatedRoute, private _staticVariableServiceProxy: StaticVariableServiceProxy) {
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
        this._staticVariableServiceProxy
            .getAll(
                this.filterText,
                this.route.snapshot.data.type,
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

    createItem() {
        if (this.route.snapshot.data.type == StaticVariableFamilyType.ProspectiveRisk)
            this.router.navigate(['/app/management/prospective-risk-static-variable/create']);
        if (this.route.snapshot.data.type == StaticVariableFamilyType.ProjectRisk)
            this.router.navigate(['/app/management/project-risk-static-variable/create']);
    }

    editItem(item: StaticVariableDto) {
        if (this.route.snapshot.data.type == StaticVariableFamilyType.ProspectiveRisk)
            this.router.navigate(['/app/management/prospective-risk-static-variable/edit', `${item.id}`]);
        if (this.route.snapshot.data.type == StaticVariableFamilyType.ProjectRisk)
            this.router.navigate(['/app/management/project-risk-static-variable/edit', `${item.id}`]);
    }

    deleteItem(item: StaticVariableDto) {
        this.message.confirm(`¿Esta seguro de eliminar la dimensión de riesgo ${item.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._staticVariableServiceProxy.delete(item.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.error('Dimensión de riesgo eliminada satisfactoriamente');
                });
        });
    }

    enableItem(item: StaticVariableDto) {
        this.message.confirm(`¿Esta seguro de habilitar la dimensión de riesgo ${item.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed) {
                this._staticVariableServiceProxy.enable(item.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success('Dimensión de riesgo habilitada satisfactoriamente');
                });
            }
        });
    }

    disableItem(item: StaticVariableDto) {
        this.message.confirm(`¿Esta seguro de inabilitar la dimensión de riesgo ${item.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed) {
                this.showMainSpinner('Procesando informaciíon, por favor espere...');
                this._staticVariableServiceProxy.disable(item.id).pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1000))).subscribe(() => {
                    this.reloadPage();
                    this.notify.error('Dimensión de riesgo inhabilitada satisfactoriamente');
                });
            }
        });
    }

}