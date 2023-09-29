import { AfterViewInit, Component, Injector, Input } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DialogSpaceDocumentDto, DialogSpaceDocumentExposition, DialogSpaceDocumentRange, DialogSpaceDocumentRangeSide, DialogSpaceDocumentResourceDto, DialogSpaceDocumentSituationRelationDto, DialogSpaceDocumentType, DialogSpaceDocumentTypeRelationDto, DialogSpaceDocumentUserDto } from '@shared/service-proxies/application/dialog-space-document-proxie';
import { AttachmentUploadDto } from '@shared/service-proxies/application/utility-proxie';
import { calculateAvaliableDays } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

@Component({
    selector: 'general-information-dialog-space-document',
    templateUrl: 'general-information.component.html',
    styleUrls: [
        'general-information.component.css'
    ]
})

export class DialogSpaceDocumentGeneralInformationComponent extends AppComponentBase implements AfterViewInit {

    @Input() dialogSpaceDocument: DialogSpaceDocumentDto;
    @Input() documentTypes: DialogSpaceDocumentTypeRelationDto[];
    @Input() situations: DialogSpaceDocumentSituationRelationDto[];

    documentTime: Date;
    installationTime: Date;
    vigencyTime: Date;
    installationMaxTime: Date;

    rangeSides = {
        none: DialogSpaceDocumentRangeSide.NONE,
        all: DialogSpaceDocumentRangeSide.ALL,
        exclusive: DialogSpaceDocumentRangeSide.EXLUSIVE
    }

    ranges = {
        none: DialogSpaceDocumentRange.NONE,
        start: DialogSpaceDocumentRange.START,
        nextDay: DialogSpaceDocumentRange.NEXT_DAY,
    }

    expositionTypes = {
        none: DialogSpaceDocumentExposition.NONE,
        start: DialogSpaceDocumentExposition.START,
        nextDay: DialogSpaceDocumentExposition.NEXT_DAY
    }

    spaceTypes = {
        none: DialogSpaceDocumentType.NONE,
        create: DialogSpaceDocumentType.CREATE,
        update: DialogSpaceDocumentType.UPDATE
    }

    vigencyStatuses = {
        installationComplete: 0,
        vigencyAvaliable: 1,
        vigencyOut: 2,
        none: 3
    }

    alertStatuses = {
        green: 0,
        yellow: 1,
        red: 2,
        none: 3
    }

    vigencyStatus: number = this.vigencyStatuses.none;
    vigencyDays: number;
    alertStatus: number = this.alertStatuses.none;
    alertDays: number;

    constructor(_injector: Injector) {
        super(_injector);
    }

    ngAfterViewInit(): void {
        this.documentTime = this.dialogSpaceDocument.documentTime?.toDate();
        this.installationTime = this.dialogSpaceDocument.installationTime?.toDate();
        this.installationMaxTime = this.dialogSpaceDocument.installationMaxTime?.toDate();
        this.vigencyTime = this.dialogSpaceDocument.vigencyTime?.toDate();

        this.onDateChange();
    }

    changeInstallation(state: boolean) {
        this.dialogSpaceDocument.hasInstallation = state;
        this.proccessVigencyStatus();
    }

    changeRangeSide(rangeSide: DialogSpaceDocumentRangeSide) {
        this.dialogSpaceDocument.rangeSide = rangeSide;
        this.onDateChange();
    }

    changeVigencyRangeSide(rangeSide: DialogSpaceDocumentRangeSide) {
        this.dialogSpaceDocument.vigencyRangeSide = rangeSide;
        this.onDateChange();
    }

    saveAttach(attachment: AttachmentUploadDto) {
        this.dialogSpaceDocument.uploadFiles.push(attachment);
    }

    removeResource(resource: DialogSpaceDocumentResourceDto, index: number) {
        resource.remove = true;
    }

    restoreResource(resource: DialogSpaceDocumentResourceDto) {
        resource.remove = false;
    }

    getUserName(user: DialogSpaceDocumentUserDto): string {
        if (!user)
            return '';

        return (user.name ? user.name : '').trim() + ' ' + (user.surname ? user.surname : '').trim();
    }

    onDateChange() {
        setTimeout(() => {
            this.proccessVigencyStatus();
            this.proccessAlertStatus();
        }, 250);
    }

    private proccessVigencyStatus() {
        const installationTime: moment.Moment = this.installationTime ? moment(this.installationTime) : <any>undefined;

        if (installationTime && installationTime.isValid()) {
            this.vigencyStatus = this.vigencyStatuses.installationComplete;
        } else {
            if (this.dialogSpaceDocument.type == this.spaceTypes.create && this.dialogSpaceDocument.hasInstallation) {
                let installationMaxTime: moment.Moment = this.installationMaxTime ? moment(this.installationMaxTime) : <any>undefined;

                if (installationMaxTime && installationMaxTime.isValid()) {
                    if (installationMaxTime.isValid()) {
                        const currentTime: moment.Moment = moment();

                        if (this.dialogSpaceDocument.range == this.ranges.nextDay)
                            installationMaxTime = installationMaxTime.add(2, 'days');
                        if (this.dialogSpaceDocument.range == this.ranges.start)
                            installationMaxTime = installationMaxTime.add(1, 'days');

                        this.vigencyStatus = currentTime.isAfter(installationMaxTime) ? this.vigencyStatuses.vigencyOut : this.vigencyStatuses.vigencyAvaliable;

                        this.vigencyDays = installationMaxTime.diff(currentTime, 'days');

                        if (this.dialogSpaceDocument.rangeSide == this.rangeSides.exclusive) {
                            const weekendDays: number = calculateAvaliableDays(
                                this.vigencyDays < 0 ? installationMaxTime.toDate() : currentTime.toDate(),
                                this.vigencyDays < 0 ? currentTime.toDate() : installationMaxTime.toDate());

                            this.vigencyDays = (this.vigencyDays > 0 ? this.vigencyDays - weekendDays : this.vigencyDays + weekendDays);
                        }

                    } else {
                        this.vigencyStatus = this.vigencyStatuses.none;
                    }
                } else {
                    this.vigencyStatus = this.vigencyStatuses.none;
                }

            } else {
                this.vigencyStatus = this.vigencyStatuses.none;
            }
        }
    }

    private proccessAlertStatus() {
        let vigencyTime: moment.Moment = this.vigencyTime ? moment(this.vigencyTime) : <any>undefined;

        if (vigencyTime && vigencyTime.isValid()) {

            if (this.dialogSpaceDocument.exposition == this.expositionTypes.nextDay)
                vigencyTime = vigencyTime.add(2, 'days');
            if (this.dialogSpaceDocument.exposition == this.expositionTypes.start)
                vigencyTime = vigencyTime.add(1, 'days');

            const currentTime: moment.Moment = moment();

            const diff: number = vigencyTime.diff(currentTime, 'days');

            this.alertDays = diff;

            if (this.dialogSpaceDocument.vigencyRangeSide == this.rangeSides.exclusive) {
                const weekendDays: number = calculateAvaliableDays(
                    this.alertDays < 0 ? vigencyTime.toDate() : currentTime.toDate(),
                    this.alertDays < 0 ? currentTime.toDate() : vigencyTime.toDate());

                this.alertDays = (this.alertDays > 0 ? this.alertDays - weekendDays : this.alertDays + weekendDays);
            }

            if (this.alertDays >= 30)
                this.alertStatus = this.alertStatuses.green;
            if (this.alertDays >= 15 && this.alertDays < 30)
                this.alertStatus = this.alertStatuses.yellow;
            if (this.alertDays < 15)
                this.alertStatus = this.alertStatuses.red;

        } else {
            this.alertStatus = this.alertStatuses.none;
        }
    }
}