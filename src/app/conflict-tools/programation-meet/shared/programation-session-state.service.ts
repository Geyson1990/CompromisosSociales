import { Injectable } from "@angular/core";
import { SectorMeetSessionDepartmentDto, SectorMeetSessionDto, SectorMeetSessionPersonDto } from "@shared/service-proxies/application/sector-meet-session-proxie";

@Injectable()
export class ProgramationSessionStateService {
    
    sessionDate: Date;
    sessionTime: Date;

    personTime: Date;
    sectorMeetSession: SectorMeetSessionDto;
    
    departments: SectorMeetSessionDepartmentDto[];
    persons: SectorMeetSessionPersonDto[];
}