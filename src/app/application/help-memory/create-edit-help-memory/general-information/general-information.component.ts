import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ResourceSizeType } from '@shared/component/file-uploader/file-uploader.component';
import { HelpMemoryDirectoryGovernmentDto, HelpMemoryDto, HelpMemoryResourceDto, HelpMemorySocialConflictDto, HelpMemorySocialConflictSensibleDto, HelpMemoryUserDto } from '@shared/service-proxies/application/help-memory-proxie';
import { AttachmentUploadDto, ConflictSite, UtilityConflictListGetAllDto, UtilityDirectoryGovernmentDto } from '@shared/service-proxies/application/utility-proxie';

@Component({
    selector: 'general-information-help-memory',
    templateUrl: 'general-information.component.html',
    styleUrls: [
        'general-information.component.css'
    ]
})

export class GeneralInformationHelpMemoryComponent extends AppComponentBase {

    private _busy: boolean;
    private _helpMemory: HelpMemoryDto;

    @Input() get busy(): boolean {
        return this._busy;
    }

    set busy(value: boolean) {
        this._busy = value;
    }

    @Input() get helpMemory(): HelpMemoryDto {
        return this._helpMemory;
    }

    set helpMemory(value: HelpMemoryDto) {
        this._helpMemory = value;
        this.helpMemoryDate = value && value.requestTime ? value.requestTime.toDate() : <any>undefined;
    }

    @Output() showConflictModal: EventEmitter<void> = new EventEmitter<void>();
    @Output() showDirectoryGovernmentModal: EventEmitter<void> = new EventEmitter<void>();

    sites = {
        all: ConflictSite.All,
        socialConflict: ConflictSite.SocialConflict,
        socialConflictSensible: ConflictSite.SocialConflictSensible
    };

    get directoryGovernmentTitle(): string {
        if (!this.helpMemory.directoryGovernment)
            return 'Buscar...';

        return this.helpMemory.directoryGovernment.name;
    }

    get conflictTitle(): string {
        if (!this.helpMemory.socialConflict && !this.helpMemory.socialConflictSensible)
            return 'Buscar...';

        return this.helpMemory.socialConflict ?
            this.helpMemory.socialConflict.code + " - " + this.helpMemory.socialConflict.caseName :
            this.helpMemory.socialConflictSensible.code + " - " + this.helpMemory.socialConflictSensible.caseName;
    }

    helpMemoryDate: Date;
    size: ResourceSizeType = ResourceSizeType.MB1;
    extensions: boolean = true;
    extension: string = 'docx';

    constructor(_injector: Injector) {
        super(_injector);
    }

    showFindConflict() {
        this.showConflictModal.emit();
    }

    showFindDirectoryGovernment() {
        this.showDirectoryGovernmentModal.emit();
    }

    selectConflict(conflict: UtilityConflictListGetAllDto) {
        if (conflict.site == this.sites.socialConflict) {
            this.helpMemory.site = conflict.site;
            this.helpMemory.socialConflict = new HelpMemorySocialConflictDto({
                id: conflict.id,
                code: conflict.code,
                caseName: conflict.name
            });
        }

        if (conflict.site == this.sites.socialConflictSensible) {
            this.helpMemory.site = conflict.site;
            this.helpMemory.socialConflictSensible = new HelpMemorySocialConflictSensibleDto({
                id: conflict.id,
                code: conflict.code,
                caseName: conflict.name
            });
        }
    }

    selectDirectoryGovernment(directoryGovernment: UtilityDirectoryGovernmentDto) {
        this.helpMemory.directoryGovernment = new HelpMemoryDirectoryGovernmentDto({
            id: directoryGovernment.id,
            name: directoryGovernment.name
        });
    }

    removeDirectoryGovernment() {
        this.helpMemory.directoryGovernment = undefined;
    }

    removeConflict() {
        this.helpMemory.socialConflict = undefined;
        this.helpMemory.socialConflictSensible = undefined;
    }

    removeResource(resource: HelpMemoryResourceDto, index: number) {
        resource.remove = true;
    }

    restoreResource(resource: HelpMemoryResourceDto) {
        resource.remove = false;
    }

    saveAttach(attachment: AttachmentUploadDto) {
        this.helpMemory.uploadFiles.push(attachment);
    }

    getUserName(user: HelpMemoryUserDto): string {
        if (!user)
            return '';

        return (user.name ? user.name : '').trim() + ' ' + (user.surname ? user.surname : '').trim();
    }

}