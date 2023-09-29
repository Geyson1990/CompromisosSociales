import { Component, Injector, Input, OnInit } from '@angular/core';
import { PortalDepartmentDto, PortalDistrictDto, PortalProvinceDto, PortalServiceProxy, PortalSocialConflictDto } from '@shared/service-proxies/application/portal-proxie';
import { DashboardComponentBase } from '../dashboard-shared/dashboard.component';
import { SharedWindow } from '../dashboard-shared/dashboard.service';

@Component({
    selector: 'dashboard-filter',
    templateUrl: 'dashboard-filter.component.html'
})
export class DashboardFilterComponent extends DashboardComponentBase implements OnInit {

    @Input() menuIndex: number;

    selectedConflicts: PortalSocialConflictDto[];
    selectedDepartments: PortalDepartmentDto[];
    selectedProvinces: PortalProvinceDto[];
    selectedDistricts: PortalDistrictDto[];

    constructor(_injector: Injector, private _portalServiceProxy: PortalServiceProxy) {
        super(_injector);
    }

    ngOnInit(): void {
        this._portalServiceProxy.getReportFilters().subscribe(response => {
            this.shared.territorialUnits = response.territorialUnits;
            this.shared.departments = response.departments;
            this.shared.socialConflicts = response.socialConflicts;
            this.shared.risks = response.risks;
            this.shared.geographics = response.geographics;
            this.shared.typologies = response.typologies;
            this.shared.initialLoadingComplete();
            this.loadInformation();
        });
    }

    onTerritorialUnitChange(event: any) {
        const territorialUnitId: number = +event.target.value;
        const index: number = this.shared.territorialUnits.findIndex(p => p.id == territorialUnitId);

        if (index != -1) {
            this.shared.filters.territorialUnitName = this.shared.territorialUnits[index].name;
            this.selectedDepartments = this.shared.departments.filter(p => p.territorialUnitIds.find(d => d.id == territorialUnitId));
            this.selectedConflicts = this.shared.socialConflicts.filter(p => p.locations.find(d => d.territorialUnit.id == territorialUnitId));
        } else {
            this.shared.filters.territorialUnitName = undefined;
            this.selectedDepartments = this.shared.departments;
            this.selectedConflicts = this.shared.socialConflicts;
        }

        this.selectedProvinces = [];
        this.selectedDistricts = [];
        this.shared.filters.departmentId = -1;
        this.shared.filters.provinceId = -1;
        this.shared.filters.districtId = -1;
        this.shared.filters.conflictId = -1;

        this.shared.refresh.next(SharedWindow.Compromises_Project);
        this.shared.refresh.next(SharedWindow.Social_Conflict);
        this.shared.refresh.next(SharedWindow.Social_Conflict_Alert);
        this.shared.refresh.next(SharedWindow.Social_Conflict_Sensible);
    }

    onDepartmentChange(event: any) {
        const departmentId: number = +event.target.value;
        const index: number = this.shared.departments.findIndex(p => p.id == departmentId);
        this.shared.filters.provinceId = -1;
        this.shared.filters.districtId = -1;
        this.shared.filters.conflictId = -1;
        this.selectedProvinces = [];
        this.selectedDistricts = [];

        if (index != -1) {
            this.selectedProvinces = this.shared.departments[index].provinces;
            this.selectedConflicts = this.shared.socialConflicts.filter(p => p.locations.find(d => d.department.id == departmentId));
        } else {
            this.selectedConflicts = this.shared.socialConflicts.filter(p => p.locations.find(d => d.territorialUnit.id == this.shared.filters.territorialUnitId));
        }

        this.shared.refresh.next(SharedWindow.Compromises_Project);
        this.shared.refresh.next(SharedWindow.Social_Conflict);
        this.shared.refresh.next(SharedWindow.Social_Conflict_Alert);
        this.shared.refresh.next(SharedWindow.Social_Conflict_Sensible);
    }

    onProvinceChange(event: any) {
        const provinceId: number = +event.target.value;
        const index: number = this.selectedProvinces.findIndex(p => p.id == provinceId);
        this.selectedDistricts = [];
        this.shared.filters.districtId = -1;

        if (index != -1) {
            this.selectedDistricts = this.selectedProvinces[index].districts;
            this.selectedConflicts = this.shared.socialConflicts.filter(p => p.locations.find(d => d.province.id == provinceId));
        } else {
            this.selectedConflicts = this.shared.socialConflicts.filter(p => p.locations.find(d => d.department.id == this.shared.filters.departmentId));
        }

        this.shared.refresh.next(SharedWindow.Compromises_Project);
        this.shared.refresh.next(SharedWindow.Social_Conflict);
        this.shared.refresh.next(SharedWindow.Social_Conflict_Alert);
        this.shared.refresh.next(SharedWindow.Social_Conflict_Sensible);
    }

    onConflictChange(event: any) {
        this.shared.refresh.next(SharedWindow.Compromises_Project);
        this.shared.refresh.next(SharedWindow.Social_Conflict);
        this.shared.refresh.next(SharedWindow.Social_Conflict_Alert);
    }

    onRiskChange(event: any) {
        this.shared.refresh.next(SharedWindow.Social_Conflict);
        this.shared.refresh.next(SharedWindow.Social_Conflict_Sensible);
    }

    onGeographicChange(event: any) {
        this.shared.refresh.next(SharedWindow.Social_Conflict);
        this.shared.refresh.next(SharedWindow.Social_Conflict_Sensible);
    }

    private loadInformation() {
        this.selectedDepartments = this.shared.departments;
        this.selectedConflicts = this.shared.socialConflicts;
    }
}