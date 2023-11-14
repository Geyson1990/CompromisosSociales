import { Injectable } from "@angular/core";
import { SectorMeetSessionDepartmentDto, SectorMeetSessionDto, SectorMeetSessionPersonDto, ISectorMeetSessionLeaderRelationDto } from "@shared/service-proxies/application/sector-meet-session-proxie";

@Injectable()
export class SectorSessionStateService {
    
    sessionDate: Date;
    sessionTime: Date;

    personTime: Date;
    sectorMeetSession: SectorMeetSessionDto;
    
    departments: SectorMeetSessionDepartmentDto[];
    persons: SectorMeetSessionPersonDto[]; 
}