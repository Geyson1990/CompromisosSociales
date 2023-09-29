import { Component, Input } from '@angular/core';
import { SocialConflictSensibleDto, SocialConflictSensibleResourceDto } from '@shared/service-proxies/application/social-conflict-sensible-proxie';

@Component({
    selector: 'resource-information-social-conflict-sensible',
    templateUrl: 'resource-information.component.html',
    styleUrls: [
        'resource-information.component.css'
    ]
})
export class ResourceInformationSocialConflictSensibleComponent {

    private _busy: boolean;
    private _socialConflictSensible: SocialConflictSensibleDto;

    @Input() get busy(): boolean {
        return this._busy;
    }

    set busy(value: boolean) {
        this._busy = value;
    }

    @Input() get socialConflictSensible(): SocialConflictSensibleDto {
        return this._socialConflictSensible;
    }

    set socialConflictSensible(value: SocialConflictSensibleDto) {
        this._socialConflictSensible = value;
    }

    removeResource(resource: SocialConflictSensibleResourceDto, index: number) {
        resource.remove = true;
    }

    restoreResource(resource: SocialConflictSensibleResourceDto) {
        resource.remove = false;
    }
}