import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ResourceSizeType } from '@shared/component/file-uploader/file-uploader.component';
import { SocialConflictAlertDemandDto, SocialConflictAlertDto, SocialConflictAlertPersonDto, SocialConflictAlertResourceDto, SocialConflictAlertResponsibleDto, SocialConflictAlertSubTypologyDto, SocialConflictAlertTypologyDto } from '@shared/service-proxies/application/social-conflict-alert-proxie';
import { AttachmentUploadDto } from '@shared/service-proxies/application/utility-proxie';
import { PersonType } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

@Component({
    selector: 'aditional-information-social-conflict-alert',
    templateUrl: 'aditional-information.component.html',
    styleUrls: [
        'aditional-information.component.css'
    ]
})
export class AditionalInformationSocialConflictAlertComponent extends AppComponentBase implements OnInit {

    private _socialConflictAlert: SocialConflictAlertDto;
    private _persons: SocialConflictAlertPersonDto[];

    private _busy: boolean;

    @Input() set busy(value: boolean) {
        this._busy = value;
    }

    get busy(): boolean {
        return this._busy;
    }

    @Input() set socialConflictAlert(value: SocialConflictAlertDto) {
        this._socialConflictAlert = value;
    }

    get socialConflictAlert(): SocialConflictAlertDto {
        return this._socialConflictAlert;
    }

    @Input() set persons(value: SocialConflictAlertPersonDto[]) {
        this._persons = value;
        if (value) {
            this.analysts = value.filter(p => p.type == PersonType.Analyst);
            this.managers = value.filter(p => p.type == PersonType.Manager || p.type == PersonType.Coordinator);
            this.coordinators = value.filter(p => p.type == PersonType.Coordinator);
        }
    }

    get persons(): SocialConflictAlertPersonDto[] {
        return this._persons;
    }

    @Input() typologies: SocialConflictAlertTypologyDto[];
    @Input() demands: SocialConflictAlertDemandDto[];
    @Input() responsibles: SocialConflictAlertResponsibleDto[];

    @Output() busyChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() socialConflictAlertChange: EventEmitter<SocialConflictAlertDto> = new EventEmitter<SocialConflictAlertDto>();

    selectedSubTypologies: SocialConflictAlertSubTypologyDto[] = [];
    analysts: SocialConflictAlertPersonDto[];
    managers: SocialConflictAlertPersonDto[];
    coordinators: SocialConflictAlertPersonDto[];

    size: ResourceSizeType = ResourceSizeType.MB1;
    
    personTypes = {
        none: PersonType.None,
        coordinator: PersonType.Coordinator,
        manager: PersonType.Manager,
        analyst: PersonType.Analyst
    }
    
    constructor(_injector: Injector) {
        super(_injector);
    }

    ngOnInit(): void {

        if (this.socialConflictAlert.analyst.id != -1) {
            const index: number = this.analysts.findIndex(p => p.id == this.socialConflictAlert.analyst.id);

            if (index == -1) {
                this.analysts.push(this.socialConflictAlert.analyst);
                this.analysts = this.analysts.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        if (this.socialConflictAlert.coordinator.id != -1) {
            const index: number = this.coordinators.findIndex(p => p.id == this.socialConflictAlert.coordinator.id);

            if (index == -1) {
                this.coordinators.push(this.socialConflictAlert.coordinator);
                this.coordinators = this.coordinators.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        if (this.socialConflictAlert.manager.id != -1) {
            const index: number = this.managers.findIndex(p => p.id == this.socialConflictAlert.manager.id);

            if (index == -1) {
                this.managers.push(this.socialConflictAlert.manager);
                this.managers = this.managers.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        if (this.socialConflictAlert.alertResponsible.id != -1) {
            const index: number = this.responsibles.findIndex(p => p.id == this.socialConflictAlert.alertResponsible.id);

            if (index == -1) {
                this.responsibles.push(this.socialConflictAlert.alertResponsible);
                this.responsibles = this.responsibles.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        if (this.socialConflictAlert.alertDemand.id != -1) {
            const index: number = this.demands.findIndex(p => p.id == this.socialConflictAlert.alertDemand.id);

            if (index == -1) {
                this.demands.push(this.socialConflictAlert.alertDemand);
                this.demands = this.demands.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        if (this.socialConflictAlert.typology.id != -1) {
            let index: number = this.typologies.findIndex(p => p.id == this.socialConflictAlert.typology.id);

            if (index == -1) {
                this.typologies.push(this.socialConflictAlert.typology);
                this.typologies = this.typologies.sort((a, b) => a.name.localeCompare(b.name));

                if (this.socialConflictAlert.subTypology.id != -1) {
                    this.selectedSubTypologies = [this.socialConflictAlert.subTypology];
                }
            } else {
                this.selectedSubTypologies = this.typologies[index].subTypologies;

                if (this.socialConflictAlert.subTypology.id != -1) {
                    index = this.selectedSubTypologies.findIndex(p => p.id == this.socialConflictAlert.subTypology.id);

                    if (index == -1) {
                        this.selectedSubTypologies.push(this.socialConflictAlert.subTypology);
                        this.selectedSubTypologies = this.selectedSubTypologies.sort((a, b) => a.name.localeCompare(b.name));
                    }
                }
            }
        }
    }

    onGeneralTypologyChange(event: any) {
        const typologyId: number = +event.target.value;
        const index: number = this.typologies.findIndex(p => p.id == typologyId);

        this.socialConflictAlert.subTypology = new SocialConflictAlertSubTypologyDto({ id: -1, name: undefined });

        if (index != -1) {
            this.selectedSubTypologies = this.typologies[index].subTypologies;
        } else {
            this.socialConflictAlert.typology = new SocialConflictAlertTypologyDto({ id: -1, name: undefined, subTypologies: [] });
        }
    }

    removeResource(resource: SocialConflictAlertResourceDto, index: number) {
        resource.remove = true;
    }

    restoreResource(resource: SocialConflictAlertResourceDto) {
        resource.remove = false;
    }

    saveAttach(attachment: AttachmentUploadDto) {
        this.socialConflictAlert.uploadFiles.push(attachment);
    }

}