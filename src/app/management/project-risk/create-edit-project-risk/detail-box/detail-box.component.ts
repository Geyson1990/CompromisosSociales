import { Component, Input, OnInit } from '@angular/core';
import { ProjectRiskDto, ProjectRiskHistoryDto } from '@shared/service-proxies/application/project-risk-proxie';

@Component({
    selector: 'detail-box-project-risk',
    templateUrl: 'detail-box.component.html',
    styleUrls: [
        'detail-box.component.css'
    ]
})
export class DetailBoxProjectRiskComponent {

    @Input() item: ProjectRiskDto | ProjectRiskHistoryDto;
}