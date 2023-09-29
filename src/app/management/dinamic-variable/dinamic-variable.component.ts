import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { DinamicVariableDto, DinamicVariableServiceProxy, DinamicVariableType } from '@shared/service-proxies/application/dinamic-variable-proxie';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: 'dinamic-variable.component.html',
    styleUrls: [
        'dinamic-variable.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class DinamicVariableComponent extends AppComponentBase implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    filterText: string;

    constructor(_injector: Injector, private route: ActivatedRoute, private _dinamicVariableServiceProxy: DinamicVariableServiceProxy) {
        super(_injector);
    }

    ngOnInit() {

    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator?.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._dinamicVariableServiceProxy
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
        if (this.route.snapshot.data.type == DinamicVariableType.ProspectiveRisk)
            this.router.navigate(['/app/management/prospective-risk-dinamic-variable/create']);
        if (this.route.snapshot.data.type == DinamicVariableType.ProjectRisk)
            this.router.navigate(['/app/management/project-risk-dinamic-variable/create']);
    }

    editItem(item: DinamicVariableDto) {
        if (this.route.snapshot.data.type == DinamicVariableType.ProspectiveRisk)
            this.router.navigate(['/app/management/prospective-risk-dinamic-variable/edit', `${item.id}`]);
        if (this.route.snapshot.data.type == DinamicVariableType.ProjectRisk)
            this.router.navigate(['/app/management/project-risk-dinamic-variable/edit', `${item.id}`]);
    }

    deleteItem(item: DinamicVariableDto) {
        this.message.confirm(`¿Esta seguro de eliminar la variable ${item.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._dinamicVariableServiceProxy.delete(item.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.error('Eliminado satisfactoriamente');
                });
        });
    }

    enableItem(item: DinamicVariableDto) {
        this.message.confirm(`¿Esta seguro de habilitar la variable ${item.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed) {
                this._dinamicVariableServiceProxy.enable(item.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success('Variable habilitada satisfactoriamente');
                });
            }
        });
    }

    disableItem(item: DinamicVariableDto) {
        this.message.confirm(`¿Esta seguro de inabilitar la variable ${item.name}, este proceso es irreversible y eliminará todos los registros asociados con esta variable?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed) {
                this.showMainSpinner('Procesando informaciíon, por favor espere...');
                this._dinamicVariableServiceProxy.disable(item.id).pipe(finalize(() => setTimeout(() => this.hideMainSpinner(), 1000))).subscribe(() => {
                    this.reloadPage();
                    this.notify.error('Variable inhabilitada satisfactoriamente');
                });
            }
        });
    }

}