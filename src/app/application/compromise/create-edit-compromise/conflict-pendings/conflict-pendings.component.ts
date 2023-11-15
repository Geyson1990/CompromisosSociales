import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CompromiseDto } from '@shared/service-proxies/application/compromise-proxie';
import { SectorMeetSessionAgreementDto, SectorMeetSessionAgreementServiceProxy } from '@shared/service-proxies/application/sector-meet-session-agreement-proxie';
import { ResourceDetailModalComponent } from './resources/resource-detail-modal.component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Table } from 'primeng';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'conflict-pendings',
    templateUrl: 'conflict-pendings.component.html',
    styleUrls: [
        'conflict-pendings.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class ConflictPendingsComponent extends AppComponentBase implements OnInit {

    @ViewChild('resourceDetailModal', { static: true }) resourceDetailModal: ResourceDetailModalComponent;
    @Input() type: number;
    @Output() listConflictPending: EventEmitter<void> = new EventEmitter<void>();
    @Output() listDataConflicts: EventEmitter<void> = new EventEmitter<void>();

    private _conflict: any;
    @Input() set conflicts(value: SectorMeetSessionAgreementDto[]) {
        this._conflict = value;
    };
    selectedConflicts!: any;
    private _compromise: CompromiseDto;
   
    @Input() set compromise(value: CompromiseDto) {
        this._compromise = value;
    };

    get compromise(): CompromiseDto {
        return this._compromise;
    }

    get conflicts(): any {
        return this._conflict;
    }

    @ViewChild('dataTable', { static: true }) dataTable: Table;

    constructor(_injector: Injector, private _sectorMeetSessionAgreementServiceProxy: SectorMeetSessionAgreementServiceProxy) {
        super(_injector);
    }

    ngOnInit(): void {

    }

    saveSocialConflict() {

        for (let index = 0; index < this.selectedConflicts.length; index++) {

            let body = {
                "sectorMeetSessionAgreementId": this.selectedConflicts[index].sectorMeetSessionAgreement.id,
                "compromiseId": this.compromise.id,
                "statusId": 0,
                "id": 0
              }
            this.primengTableHelper.showLoadingIndicator();

            this._sectorMeetSessionAgreementServiceProxy.create(body).subscribe(resp => {
                
                if (resp.result !== null) {
                    console.log("save:", resp)
                }   
            });
        }

        this.listConflictPending.emit();
        this.primengTableHelper.hideLoadingIndicator();
    }

    deleteConflict(id:number) {

    this._sectorMeetSessionAgreementServiceProxy.delete(id).subscribe(resp => {
        console.log("delete:", resp)
            
        if (resp.success) {
        this.listDataConflicts.emit();
        }       
    });

    }

    showResources(record: any): void {
        this.resourceDetailModal.show(record);
    }

}