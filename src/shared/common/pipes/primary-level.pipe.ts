import { Injector, Pipe, PipeTransform } from '@angular/core';
import { LevelDto } from '@shared/service-proxies/service-proxies';
import { AppSessionService } from '../session/app-session.service';

@Pipe({
    name: 'primaryLevel'
})
export class PrimaryLevelPipe implements PipeTransform {

    sessionService: AppSessionService;

    constructor(injector: Injector) {
        this.sessionService = injector.get(AppSessionService);
    }

    transform(value: number): string {

        for (let level of this.sessionService.primaryLevels) {
            if (value > level.min && value <= level.max) {
                return level.name;
            }
        }

        const min: LevelDto = this.sessionService.primaryLevels.reduce((previous, current) => (previous.min < current.min) ? previous : current);

        if (value <= min.min)
            return min.name;

        const max: LevelDto = this.sessionService.primaryLevels.reduce((previous, current) => (previous.max > current.max) ? previous : current);
        
        if (value >= max.max)
            return max.name;

        return 'N/A';
    }
}
