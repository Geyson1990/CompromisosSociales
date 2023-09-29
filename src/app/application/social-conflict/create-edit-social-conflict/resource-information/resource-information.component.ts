import { Component, Input } from '@angular/core';
import { SocialConflictDto, SocialConflictResourceDto } from '@shared/service-proxies/application/social-conflict-proxie';

@Component({
    selector: 'resource-information-social-conflict',
    templateUrl: 'resource-information.component.html',
    styleUrls: [
        'resource-information.component.css'
    ]
})
export class ResourceInformationSocialConflictComponent {

    private _busy: boolean;
    private _socialConflict: SocialConflictDto;

    @Input() get busy(): boolean {
        return this._busy;
    }

    set busy(value: boolean) {
        this._busy = value;
    }

    @Input() get socialConflict(): SocialConflictDto {
        return this._socialConflict;
    }

    set socialConflict(value: SocialConflictDto) {
        this._socialConflict = value;
    }

    @Input() hasPermission: boolean;
    
    removeResource(resource: SocialConflictResourceDto, index: number) {
        resource.remove = true;
    }

    restoreResource(resource: SocialConflictResourceDto) {
        resource.remove = false;
    }
}