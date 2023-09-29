import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'weekFormat' })
export class WeekFormatPipe implements PipeTransform {

    transform(value: moment.MomentInput) {

        if (!value) {
            return '';
        }

        const een_week = 1000 * 60 * 60 * 24 * 7;
        const d1ms = new Date().getTime();
        const d2ms = moment(value).toDate().getTime();
        const verschilms = Math.abs(d1ms - d2ms);
        const weken = Math.floor(verschilms / een_week);

        return `${weken} semanas`;
    }
}
