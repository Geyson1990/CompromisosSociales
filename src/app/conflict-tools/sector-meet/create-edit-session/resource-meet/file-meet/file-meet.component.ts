import { Component, Injector } from '@angular/core';
import { SectorSessionStateService } from '@app/conflict-tools/sector-meet/shared/sector-session-state.service';
import { DownloadServiceProxy } from '@shared/service-proxies/application/resource-downloader';

@Component({
    selector: 'file-meet',
    templateUrl: 'file-meet.component.html',
    styleUrls: [
        'file-meet.component.css'
    ]
})
export class FileMeetComponent {
    state: SectorSessionStateService;

    constructor(_injector: Injector, private _downloadServiceProxy: DownloadServiceProxy) {
        this.state = _injector.get(SectorSessionStateService);
    }


    openInNewTab(index: number) {
        this._downloadServiceProxy.dowloadSource(this.state.sectorMeetSession.resourcesFile[index].resource, this.state.sectorMeetSession.resourcesFile[index].fileName).subscribe((response) => {
            const fileURL: any = URL.createObjectURL(response);
            const a = document.createElement("a");
            a.href = fileURL;
            a.download = this.state.sectorMeetSession.resourcesFile[index].fileName;
            a.click();
        });
    }

    removeResource(index: number) {
        this.state.sectorMeetSession.resourcesFile[index].remove = true;
    }

    restoreResource(index: number) {
        this.state.sectorMeetSession.resourcesFile[index].remove = false;
    }
}