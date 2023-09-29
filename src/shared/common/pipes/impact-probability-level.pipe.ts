import { Injector, Pipe, PipeTransform } from '@angular/core';
import { LevelDto } from '@shared/service-proxies/service-proxies';
import { AppSessionService } from '../session/app-session.service';

@Pipe({
    name: 'impactProbabilityLevel'
})
export class ImpactProbabilityLevelPipe implements PipeTransform {

    sessionService: AppSessionService;

    constructor(injector: Injector) {
        this.sessionService = injector.get(AppSessionService);
    }

    transform(impact: number, probability: number): string {

        const value: number = this.generateValue(impact, probability);

        for (let level of this.sessionService.secondaryLevels) {
            if (value > level.min && value <= level.max) {
                return level.name;
            }
        }

        const min: LevelDto = this.sessionService.secondaryLevels.reduce((previous, current) => (previous.min < current.min) ? previous : current);

        if (value <= min.min)
            return min.name;

        const max: LevelDto = this.sessionService.secondaryLevels.reduce((previous, current) => (previous.max > current.max) ? previous : current);

        if (value >= max.max)
            return max.name;

        return 'N/A';
    }

    private generateValue(impact: number, probability: number): number {

        if (impact < 0.25 && probability < 0.25)//Level 1
            return 0.1;
        if (impact < 0.25 && probability >= 0.25 && probability < 0.5)//Level 2
            return 0.2;
        if (impact >= 0.25 && impact < 0.5 && probability < 0.25)//Level 2
            return 0.2;
        if (impact >= 0.5 && impact < 0.75 && probability < 0.25)//Level 3
            return 0.3;
        if (impact < 0.25 && probability >= 0.5 && probability < 0.75)//Level 3
            return 0.3;
        if (impact >= 0.75 && probability < 0.25)//Level 4
            return 0.4;
        if (impact < 0.25 && probability >= 0.75)//Level 4
            return 0.4;
        if (impact >= 0.25 && impact < 0.5 && probability >= 0.25 && probability < 0.5)//Level 5
            return 0.5;
        if (impact >= 0.5 && impact < 0.75 && probability >= 0.25 && probability < 0.5)//Level 6
            return 0.6;
        if (impact >= 0.25 && impact < 0.5 && probability >= 0.5 && probability < 0.75)//Level 6
            return 0.6;
        if (impact >= 0.75 && probability >= 0.25 && probability < 0.5)//Level 7
            return 0.7;
        if (impact >= 0.25 && impact < 0.5 && probability >= 0.75)//Level 7
            return 0.7;
        if (impact >= 0.5 && impact < 0.75 && probability >= 0.5 && probability < 0.75)//Level 8
            return 0.8;
        if (impact >= 0.75 && probability >= 0.5 && probability < 0.75)//Level 9
            return 0.9;
        if (impact >= 0.5 && impact < 0.75 && probability >= 0.75)//Level 9
            return 0.9;
        if (impact >= 0.75 && probability >= 0.75)//Level 10
            return 1;
        return 0;
    }
}
