import { Component, Injector } from '@angular/core';
import { SectorSessionStateService } from '@app/conflict-tools/sector-meet/shared/sector-session-state.service';
import { DownloadServiceProxy } from '@shared/service-proxies/application/resource-downloader';

@Component({
    selector: 'file-information',
    templateUrl: 'file-information.component.html',
    styleUrls: [
        'file-information.component.css'
    ]
})
export class FileInformationComponent {
    state: SectorSessionStateService;

    constructor(_injector: Injector, private _downloadServiceProxy: DownloadServiceProxy) {
        this.state = _injector.get(SectorSessionStateService);
    }


    openInNewTab(index: number) {
        this._downloadServiceProxy.dowloadSource(this.state.sectorMeetSession.resources[index].resource, this.state.sectorMeetSession.resources[index].fileName).subscribe((response) => {
            const fileURL: any = URL.createObjectURL(response);
            const a = document.createElement("a");
            a.href = fileURL;
            a.download = this.state.sectorMeetSession.resources[index].fileName;
            a.click();
        });
    }

    removeResource(index: number) {
        this.state.sectorMeetSession.resources[index].remove = true;
    }

    restoreResource(index: number) {
        this.state.sectorMeetSession.resources[index].remove = false;
    }
}