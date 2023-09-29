import { Injectable, Injector } from "@angular/core";
import { PortalDepartmentDto, PortalGeographicDto, PortalRiskDto, PortalSocialConflictDto, PortalTerritorialUnitDto, PortalTypologyDto } from "@shared/service-proxies/application/portal-proxie";
import { Subject } from "rxjs";

@Injectable()
export class DashboardService {
    socialConflicts: PortalSocialConflictDto[];
    departments: PortalDepartmentDto[];
    territorialUnits: PortalTerritorialUnitDto[];
    risks: PortalRiskDto[];
    geographics: PortalGeographicDto[];
    typologies: PortalTypologyDto[];

    filters: SharedFilterDto;
    refresh: Subject<SharedWindow> = new Subject<SharedWindow>();

    constructor(_injector: Injector) {
        this.filters = new SharedFilterDto();
    }

    initialLoadingComplete() {
        this.refresh.next(SharedWindow.All);
    }
}

export const enum SharedWindow {
    All,
    Compromises_Project,
    Social_Conflict,
    Social_Conflict_Alert,
    Social_Conflict_Sensible
}

export class SharedFilterDto {
    conflictId: number = -1;
    territorialUnitName: string = undefined;
    territorialUnitId: number = -1;
    departmentId: number = -1;
    provinceId: number = -1;
    districtId: number = -1;
    riskId: number = -1;
    geographicId: number = 0;
}