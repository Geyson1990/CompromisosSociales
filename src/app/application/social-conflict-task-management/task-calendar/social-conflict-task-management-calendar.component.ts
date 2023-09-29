import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar } from '@fullcalendar/core';
import { getRandomColor, pickTextColorBasedOnBgColorAdvanced } from '@shared/service-proxies/service-proxies';
import { SocialConflictTaskManagementGetAllDto, SocialConflictTaskManagementServiceProxy } from '@shared/service-proxies/application/social-conflict-task-management-proxie';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'social-conflict-task-management-calendar',
    templateUrl: 'social-conflict-task-management-calendar.component.html',
    styleUrls: [
        'social-conflict-task-management-calendar.component.css'
    ]
})
export class SocialConflictTaskManagementCalendarComponent extends AppComponentBase implements OnInit {

    @Input() set tasks(value: SocialConflictTaskManagementGetAllDto[]) {
        this.events = value ? value.filter(p => p.deadline).map(p => {
            let item = {
                id: p.id,
                title: p.title,
                start: p.deadline.toISOString(),
                textColor: undefined,
                color: getRandomColor()
            }

            item.textColor = pickTextColorBasedOnBgColorAdvanced(item.color);

            return item;
        }) : [];
    }

    events: any[] = [];

    options: any;

    loaded: boolean = false;

    constructor(_injector: Injector, private _socialConflictTaskManagementServiceProxy: SocialConflictTaskManagementServiceProxy) {
        super(_injector);
        const name = Calendar.name;
    }

    ngOnInit() {
        this.options = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            defaultDate: moment().startOf('day').toISOString(),
            header: {
                center: 'title'
            },
            editable: false,
            locale: 'es',
            eventClick: (info: any) => {
                //alert('Event: ' + info.event.title);
                //alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
                //alert('View: ' + info.view.type);

                // change the border color just for fun
                //info.el.style.borderColor = 'red';
            }
        };
    }

    loadTasks(refresh?: boolean) {
        if (!this.loaded || refresh) {
            this.showMainSpinner(refresh ? 'Actualizando información tareas' : 'Cargando calendario...')
            this._socialConflictTaskManagementServiceProxy.getAllTask(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1000, 0).subscribe(result => {
                this.tasks = result.items;
                this.hideMainSpinner();
            }, () => this.hideMainSpinner());
        }
    }
}