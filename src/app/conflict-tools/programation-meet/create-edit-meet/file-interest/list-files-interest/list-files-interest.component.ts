import { Component, Injector } from '@angular/core';
import { ProgramationMeetStateService } from '@app/conflict-tools/programation-meet/shared/programation-meet-state.service';
import { DownloadServiceProxy } from '@shared/service-proxies/application/resource-downloader';

@Component({
    selector: 'list-files-interest',
    templateUrl: 'list-files-interest.component.html',
    styleUrls: [
        'list-files-interest.component.css'
    ]
})
export class ListFilesInterestComponent {
    state: ProgramationMeetStateService;

    constructor(_injector: Injector, private _downloadServiceProxy: DownloadServiceProxy) {
        this.state = _injector.get(ProgramationMeetStateService);
    }

    openInNewTab(index: number) {
        this._downloadServiceProxy.dowloadSource(this.state.sectorMeet.resources[index].resource, this.state.sectorMeet.resources[index].fileName).subscribe((response) => {
            const fileURL: any = URL.createObjectURL(response);
            const a = document.createElement("a");
            a.href = fileURL;
            a.download = this.state.sectorMeet.resources[index].fileName;
            a.click();
        });
    }

    removeResource(index: number) {
        this.state.sectorMeet.resources[index].remove = true;
    }

    restoreResource(index: number) {
        this.state.sectorMeet.resources[index].remove = false;
    }
}