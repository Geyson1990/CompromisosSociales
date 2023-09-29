import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DirectoryDialogDto, DirectoryDialogGovernmentDto, DirectoryDialogResponsibleDto, DirectoryDialogServiceProxy } from '@shared/service-proxies/application/directory-dialog-proxie';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'create-edit-directory-dialog',
    templateUrl: 'create-edit-directory-dialog.component.html',
    styleUrls: [
        'create-edit-directory-dialog.component.css'
    ]
})
export class CreateEditDirectoryDialogComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() modalFindDirectoryGovernment: EventEmitter<any> = new EventEmitter<any>();

    item: DirectoryDialogDto = new DirectoryDialogDto();

    responsibles: DirectoryDialogResponsibleDto[] = [];
    responsibleId: number = -1;

    state: string;
    active: boolean;
    saving: boolean;

    get directoryGovernmentText(): string {
        return 'Buscar Entidad del Estado Peruano...';
    }

    constructor(_injector: Injector, private _directorydialogServiceProxy: DirectoryDialogServiceProxy) {
        super(_injector);
    }

    show(id?: number): void {

        this.saving = false;
        this.item = new DirectoryDialogDto();
        this.state = 'true';
        this.responsibleId = -1;
        
        this._directorydialogServiceProxy.get(id).subscribe(result => {

            this.responsibles = result.responsibles;

            if (result.directoryDialog) {
                this.item = result.directoryDialog;
                this.state = result.directoryDialog.enabled ? 'true' : 'false';

                this.responsibleId = this.item.directoryResponsible.id;

                if (this.responsibleId != -1) {
                    const sectorIndex: number = this.responsibles.findIndex(p => p.id == this.responsibleId);
                    if (sectorIndex == -1) {
                        this.responsibles.push(DirectoryDialogResponsibleDto.fromJS(this.item.directoryResponsible));
                        this.responsibles = this.responsibles.sort((a, b) => a.name.localeCompare(b.name));
                    }
                }
            }

            if (this.responsibleId == -1)
                this.item.directoryResponsible = undefined;
            this.active = true;
            this.modal.show();
        });

    }

    selectDirectoryGovernment(directoryGovernment: DirectoryDialogGovernmentDto) {
        this.item.directoryGovernment = directoryGovernment;
    }

    onShown(): void {
        document.getElementById('Name').focus();
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }

    onResponsibleChange(event: any) {
        const sectorId: number = +event.target.value;
        const index: number = this.responsibles.findIndex(p => p.id == sectorId);

        if (index != -1) {
            this.item.directoryResponsible = this.responsibles[index];
        } else {
            this.item.directoryResponsible = undefined;
        }
    }

    findDirectoryGovernment() {
        this.modalFindDirectoryGovernment.emit();
    }

    removeDirectoryGovernment() {
        this.message.confirm('Esta seguro de eliminar la Entidad seleccionada', 'Aviso', (confirmation) => {
            if (confirmation) {
                this.item.directoryGovernment = undefined;
            }
        });
    }

    save(): void {

        if (!this.item.directoryResponsible) {
            this.message.info('Debe seleccionar el responsable antes de continuar', 'Aviso');
            return;
        }

        if (!this.item.directoryGovernment) {
            this.message.info('Debe seleccionar la entidad antes de continuar', 'Aviso');
            return;
        }

        this.saving = true;
        this.item.enabled = this.state && this.state == 'true';

        if (this.item.id) {
            this._directorydialogServiceProxy
                .update(this.item)
                .pipe(finalize(() => this.saving = false))
                .subscribe(() => {
                    this.modalSave.emit();
                    this.notify.success('Actualizado satisfactoriamente');
                    this.close();
                });
        } else {
            this._directorydialogServiceProxy
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
