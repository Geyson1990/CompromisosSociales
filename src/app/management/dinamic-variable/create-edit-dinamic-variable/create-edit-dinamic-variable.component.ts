import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DinamicVariableDetailDto, DinamicVariableDto, DinamicVariableServiceProxy, DinamicVariableType } from '@shared/service-proxies/application/dinamic-variable-proxie';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'create-edit-dinamic-variable.component.html',
    styleUrls: [
        'create-edit-dinamic-variable.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class CreateEditDinamicVariableComponent extends AppComponentBase implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    filterText: string;

    id: number;
    item: DinamicVariableDto = new DinamicVariableDto();
    busy: boolean = false;
    loaded: boolean = false;
    editing: boolean = false;

    private changes: DinamicVariableDetailDto[] = [];
    private requestSubscription: Subscription;

    constructor(_injector: Injector, private route: ActivatedRoute, private _dinamicVariableServiceProxy: DinamicVariableServiceProxy) {
        super(_injector);
        this.primengTableHelper.resizableColumns = true;
    }

    ngOnInit() {
        const parameter = this.route.snapshot.paramMap.get('id');
        this.id = parameter ? +parameter.replace('[^0-9]', '') : undefined;

        if (this.id && !this.isGranted('Pages.Management.DinamicVariable.Edit')) {
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción');
            this.backButtonPressed();
            return;
        }

        if (!this.id && !this.isGranted('Pages.Management.DinamicVariable.Create')) {
            this.notify.error('Usted no posee permisos suficientes para realizar esta acción');
            this.backButtonPressed();
            return;
        }

        if (this.id) {
            this._dinamicVariableServiceProxy.get(this.id).subscribe((response) => {
                this.item.id = response.id;
                this.item.name = response.name;
                this.loaded = true;
                this.getData();
            }, () => this.backButtonPressed());
        }
        else {
            this.item.type = this.route.snapshot.data.type;
            this.loaded = true;
            this.getData();
        }
    }

    getData(event?: LazyLoadEvent) {
        if (!this.loaded)
            return;

        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();
        this.requestSubscription?.unsubscribe();
        this.requestSubscription = this._dinamicVariableServiceProxy
            .getAllDetails(
                this.filterText,
                this.item.id,
                this.primengTableHelper.getSorting(this.dataTable),
                this.primengTableHelper.getMaxResultCount(this.paginator, event),
                this.primengTableHelper.getSkipCount(this.paginator, event))
            .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
            .subscribe((result) => {

                if (this.changes.length > 0) {

                    for (let item of result.items) {
                        const index: number = this.changes.findIndex(p => p.province.id == item.province.id);
                        if (index != -1) {
                            item.value = this.changes[index].value;
                        }
                    }

                }

                this.primengTableHelper.records = result.items;
                this.primengTableHelper.totalRecordsCount = result.totalCount;
                this.primengTableHelper.hideLoadingIndicator();
            });
    }

    cancelEdition(event: any) {
        this.editing = false;
    }

    initEdition(event: any) {
        this.editing = true;
    }

    completeEdition(event: any) {
        const provinceId: number = event.data.province.id;
        const index: number = this.primengTableHelper.records.findIndex(p => p.province.id == provinceId);

        if (index != -1) {

            const change: DinamicVariableDetailDto = this.primengTableHelper.records[index];
            const changeIndex: number = this.changes.findIndex(p => p.province.id == change.province.id);

            if (changeIndex != -1) {
                this.changes[changeIndex].value = change.value;
            } else {
                this.changes.push(change);
            }
        }
        this.editing = false;
    }

    save() {
        if (this.editing)
            return;
        if (this.busy)
            return;
        this.busy = true;
        this.showMainSpinner('Guardando información, por favor espere...');
        if (this.item.id) {
            this._dinamicVariableServiceProxy.update(this.item, this.changes).pipe(finalize(() => setTimeout(() => {
                this.busy = false;
                this.hideMainSpinner();
            }, 1000))).subscribe(() => {
                this.notify.success('Actualizado satisfactoriamente');
                this.changes = [];
                this.getData();
            });
        } else {
            this._dinamicVariableServiceProxy.create(this.item, this.changes).pipe(finalize(() => setTimeout(() => {
                this.busy = false;
                this.hideMainSpinner();
            }, 1000))).subscribe((response) => {
                this.notify.success('Creado satisfactoriamente');
                this.changes = [];

                if (this.item.type == DinamicVariableType.ProspectiveRisk)
                    this.router.navigate(['/app/management/prospective-risk-dinamic-variable/edit', `${response.id}`]);
                if (this.item.type == DinamicVariableType.ProjectRisk)
                    this.router.navigate(['/app/management/project-risk-dinamic-variable/edit', `${response.id}`]);
            });
        }
    }

    backButtonPressed() {
        if (this.route.snapshot.data.type == DinamicVariableType.ProspectiveRisk)
            this.router.navigate(['/app/management/prospective-risk-dinamic-variable']);
        if (this.route.snapshot.data.type == DinamicVariableType.ProjectRisk)
            this.router.navigate(['/app/management/project-risk-dinamic-variable']);
    }
}