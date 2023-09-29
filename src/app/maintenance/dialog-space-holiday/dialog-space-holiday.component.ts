import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DialogSpaceHolidayDto, DialogSpaceHolidayServiceProxy, HolidayType } from '@shared/service-proxies/application/dialog-space-holiday-proxie';
import { CreateEditDialogSpaceHolidayComponent } from './create-edit-dialog-space-holiday/create-edit-dialog-space-holiday.component';
import { LazyLoadEvent, Paginator, Table } from 'primeng';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    templateUrl: 'dialog-space-holiday.component.html',
    styleUrls: [
        'dialog-space-holiday.component.css'
    ], animations: [
        appModuleAnimation()
    ]
})
export class DialogSpaceHolidayComponent extends AppComponentBase {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createEditModalDialogSpaceHoliday', { static: true }) createEditModalDialogSpaceHoliday: CreateEditDialogSpaceHolidayComponent;

    filterText: string;
    advancedFiltersAreShown: boolean;
    holidayType: HolidayType = HolidayType.NONE;
    filterByDate: boolean;
    dateRange: Date[] = [
        moment().startOf('month').toDate(),
        moment().endOf('day').toDate()
    ];

    holidayTypes = {
        none: HolidayType.NONE,
        static: HolidayType.STATIC,
        dinamic: HolidayType.DINAMIC
    }

    constructor(_injector: Injector, private _dialogSpaceHolidayServiceProxy: DialogSpaceHolidayServiceProxy) {
        super(_injector);
    }

    createItem() {
        this.createEditModalDialogSpaceHoliday.show();
    }

    editItem(dialogSpaceHoliday: DialogSpaceHolidayDto) {
        this.createEditModalDialogSpaceHoliday.show(dialogSpaceHoliday.id);
    }

    deleteItem(dialogSpaceHoliday: DialogSpaceHolidayDto) {
        this.message.confirm(`¿Esta seguro de eliminar el día feriado: ${dialogSpaceHoliday.name}?`, 'Aviso', (isConfirmed) => {
            if (isConfirmed)
                this._dialogSpaceHolidayServiceProxy.delete(dialogSpaceHoliday.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.error('Eliminado satisfactoriamente');
                });
        });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    getData(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._dialogSpaceHolidayServiceProxy
            .getAll(
                this.filterText,
                this.advancedFiltersAreShown ? this.holidayType : <any>undefined,
                this.advancedFiltersAreShown ? this.filterByDate : <any>undefined,
                this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[0]).startOf('day') : <any>undefined,
                this.advancedFiltersAreShown && this.filterByDate ? moment(this.dateRange[1]).endOf('day') : <any>undefined,
                this.primengTableHelper.getSorting(this.dataTable),
                this.primengTableHelper.getMaxResultCount(this.paginator, event),
                this.primengTableHelper.getSkipCount(this.paginator, event))
            .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
            .subscribe((result) => {
                this.primengTableHelper.records = result.items;
                this.primengTableHelper.totalRecordsCount = result.totalCount;
                this.primengTableHelper.hideLoadingIndicator();
            });
    }
}