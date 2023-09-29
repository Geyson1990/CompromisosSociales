import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TerritorialUnitCoordinatorDto, TerritorialUnitDto, TerritorialUnitPersonDto, TerritorialUnitServiceProxy } from '@shared/service-proxies/application/territorial-unit-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LazyLoadEvent, Paginator } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-territorial-unit',
    templateUrl: 'create-edit-territorial-unit.component.html',
    styleUrls: [
        'create-edit-territorial-unit.component.css'
    ]
})
export class CreateEditTerritorialUnitComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('paginator', { static: false }) paginator: Paginator;

    @Output() addCoordinator: EventEmitter<TerritorialUnitDto> = new EventEmitter<TerritorialUnitDto>();
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    item: TerritorialUnitDto = new TerritorialUnitDto();
    saving: boolean;
    active: boolean;

    private skipCount: number;
    private maxResultCount: number;

    constructor(_injector: Injector, private _territorialUnitServiceProxy: TerritorialUnitServiceProxy) {
        super(_injector);
    }

    show(id?: number): void {
        this.primengTableHelper.defaultRecordsCountPerPage = 5;
        this.skipCount = 0;
        this.maxResultCount = this.primengTableHelper.defaultRecordsCountPerPage;

        this.saving = false;
        this.item = new TerritorialUnitDto();

        if (id) {
            this._territorialUnitServiceProxy.get(id).subscribe(result => {
                this.item = result;
                this.formatPagination(this.skipCount, this.maxResultCount);
                this.active = true;
                this.modal.show();
            });
        } else {
            this.formatPagination(this.skipCount, this.maxResultCount);
            this.active = true;
            this.modal.show();
        }
    }

    onShown(): void {
        document.getElementById('Name').focus();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    getData(event?: LazyLoadEvent) {
        this.maxResultCount = this.primengTableHelper.getMaxResultCount(this.paginator, event);
        this.skipCount = this.primengTableHelper.getSkipCount(this.paginator, event);
        this.formatPagination(this.skipCount, this.maxResultCount);
    }

    addNewCoordinator() {
        this.addCoordinator.emit(this.item);
    }

    removeItem(coordinator: TerritorialUnitCoordinatorDto, index: number) {
        if (coordinator.id) {
            coordinator.remove = true;
            this.notify.warn('Se ha marcado para eliminar el nivel de riesgo seleccionado');
        } else {
            this.item.coordinators.splice(index, 1);
            this.formatPagination(this.skipCount, this.maxResultCount);
        }
    }

    cancelRemove(coordinator: TerritorialUnitCoordinatorDto) {
        coordinator.remove = false;
        this.notify.success('Se deshizo el marcado de eliminar del nivel de riesgo seleccionado');
    }

    save(): void {
        this.saving = true;

        if (this.item.id)
            this._territorialUnitServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.close();
                    this.modalSave.emit();
                    this.notify.success('Registro actualizado satisfactoriamente');
                });

        else
            this._territorialUnitServiceProxy
                .create(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.close();
                    this.modalSave.emit();
                    this.notify.success('Registro creado satisfactoriamente');
                });
    }

    addOrUpdateItem(coordinator: TerritorialUnitPersonDto) {
        const index: number = this.item.coordinators.findIndex(p => p.person.id == coordinator.id);

        if(index == -1) {

            this.item.coordinators.push(new TerritorialUnitCoordinatorDto({
                id: undefined,
                person: coordinator
            }));
            this.formatPagination(this.skipCount, this.maxResultCount);

        };
    }

    private formatPagination(skipCount: number, maxResultCount: number) {
        let index: number = 0;
        let result: number = 0;

        for (let item of this.item.coordinators) {
            item.isHidden = true;
            if (index >= skipCount && result < maxResultCount) {
                item.isHidden = false;
                result++;
            }
            index++;
        }
    }
}