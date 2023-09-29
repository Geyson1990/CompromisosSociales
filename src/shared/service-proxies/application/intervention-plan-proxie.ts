import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete, PersonType } from '../service-proxies';
import * as moment from 'moment';
import { ConflictSite, InterventionPlanEntityType } from './utility-proxie';

@Injectable()
export class InterventionPlanServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(
        code: string | undefined,
        caseName: string | undefined,
        territorialUnitId: number | undefined,
        departmentId: number | undefined,
        provinceId: number | undefined,
        districtId: number | undefined,
        personId: number | undefined,
        site: ConflictSite,
        filterByDate: boolean | undefined,
        startDate: moment.Moment | undefined,
        endDate: moment.Moment | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultDtoOfInterventionPlanListDto> {
        let url_ = this.baseUrl + "/api/services/app/InterventionPlan/GetAll?";

        if (code !== undefined)
            url_ += "Code=" + encodeURIComponent("" + code) + "&";
        if (caseName !== undefined)
            url_ += "CaseName=" + encodeURIComponent("" + caseName) + "&";
        if (territorialUnitId !== undefined && territorialUnitId !== null && territorialUnitId !== 0 && territorialUnitId !== -1)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnitId) + "&";
        if (departmentId !== undefined && departmentId !== null && departmentId !== 0 && departmentId !== -1)
            url_ += "DepartmentId=" + encodeURIComponent("" + departmentId) + "&";
        if (provinceId !== undefined && provinceId !== null && provinceId !== 0 && provinceId !== -1)
            url_ += "ProvinceId=" + encodeURIComponent("" + provinceId) + "&";
        if (districtId !== undefined && districtId !== null && districtId !== 0 && districtId !== -1)
            url_ += "DistrictId=" + encodeURIComponent("" + districtId) + "&";
        if (personId !== undefined && personId !== null && personId !== 0 && personId !== -1)
            url_ += "PersonId=" + encodeURIComponent("" + personId) + "&";
        if (site !== undefined)
            url_ += "Site=" + encodeURIComponent("" + site) + "&";
        if (filterByDate !== undefined)
            url_ += "FilterByDate=" + encodeURIComponent("" + filterByDate) + "&";
        if (startDate === null)
            throw new Error("The parameter 'startDate' cannot be null.");
        else if (startDate !== undefined)
            url_ += "StartTime=" + encodeURIComponent(startDate ? "" + startDate.toJSON() : "") + "&";
        if (endDate === null)
            throw new Error("The parameter 'endDate' cannot be null.");
        else if (endDate !== undefined)
            url_ += "EndTime=" + encodeURIComponent(endDate ? "" + endDate.toJSON() : "") + "&";
        if (sorting !== undefined)
            url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
        if (maxResultCount === null)
            throw new Error("The parameter 'maxResultCount' cannot be null.");
        else if (maxResultCount !== undefined)
            url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
        if (skipCount === null)
            throw new Error("The parameter 'skipCount' cannot be null.");
        else if (skipCount !== undefined)
            url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfInterventionPlanListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfInterventionPlanListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfInterventionPlanListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfInterventionPlanListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfInterventionPlanListDto>(<any>null);
    }

    getAllActorByConflict(conflictId: number | undefined, site: ConflictSite | undefined): Observable<PagedResultDtoOfInterventionPlanActorListDto> {
        let url_ = this.baseUrl + "/api/services/app/InterventionPlan/GetAllActorByConflict?";
        if (conflictId !== undefined)
            url_ += "ConflictId=" + encodeURIComponent("" + conflictId) + "&";
        if (site !== undefined)
            url_ += "Site=" + encodeURIComponent("" + site) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAllActorByConflict(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllActorByConflict(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfInterventionPlanActorListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfInterventionPlanActorListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllActorByConflict(response: HttpResponseBase): Observable<PagedResultDtoOfInterventionPlanActorListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfInterventionPlanActorListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfInterventionPlanActorListDto>(<any>null);
    }

    getAllLocationByConflict(conflictId: number | undefined, site: ConflictSite | undefined): Observable<PagedResultDtoOfInterventionPlanLocationListDto> {
        let url_ = this.baseUrl + "/api/services/app/InterventionPlan/GetAllLocationByConflict?";
        if (conflictId !== undefined)
            url_ += "ConflictId=" + encodeURIComponent("" + conflictId) + "&";
        if (site !== undefined)
            url_ += "Site=" + encodeURIComponent("" + site) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAllLocationByConflict(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllLocationByConflict(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfInterventionPlanLocationListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfInterventionPlanLocationListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllLocationByConflict(response: HttpResponseBase): Observable<PagedResultDtoOfInterventionPlanLocationListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfInterventionPlanLocationListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfInterventionPlanLocationListDto>(<any>null);
    }

    get(id: number): Observable<InterventionPlanGetDataDto> {
        let url_ = this.baseUrl + "/api/services/app/InterventionPlan/Get?";
        if (id === null)
            throw new Error("The parameter 'Id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");


        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGet(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(<any>response_);
                } catch (e) {
                    return <Observable<InterventionPlanGetDataDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<InterventionPlanGetDataDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<InterventionPlanGetDataDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = InterventionPlanGetDataDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<InterventionPlanGetDataDto>(<any>null);
    }

    create(interventionPlan: InterventionPlanDto): Observable<InterventionPlanDto> {
        let url_ = this.baseUrl + "/api/services/app/InterventionPlan/Create";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: interventionPlan.toJSON(),
            headers: new HttpHeaders({
                "Accept": "text/plain",
                "Content-Type": "application/json-patch+json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processCreate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(<any>response_);
                } catch (e) {
                    return <Observable<InterventionPlanDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<InterventionPlanDto>><any>_observableThrow(response_);
        }));
    }

    protected processCreate(response: HttpResponseBase): Observable<InterventionPlanDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = InterventionPlanDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<InterventionPlanDto>(<any>null);
    }

    update(interventionPlan: InterventionPlanDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/InterventionPlan/Update";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: interventionPlan.toJSON(),
            headers: new HttpHeaders({
                "Accept": "text/plain",
                "Content-Type": "application/json-patch+json"
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return processComplete(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return processComplete(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>_observableThrow(e);
                }
            } else
                return <Observable<void>><any>_observableThrow(response_);
        }));
    }

    delete(id: number): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/InterventionPlan/Delete?";
        if (id === null)
            throw new Error("The parameter 'Id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";

        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
            })
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return processComplete(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return processComplete(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>_observableThrow(e);
                }
            } else
                return <Observable<void>><any>_observableThrow(response_);
        }));
    }
}

export interface IPagedResultDtoOfInterventionPlanActorListDto {
    totalCount: number;
    items: InterventionPlanActorLocationDto[] | undefined;
}

export class PagedResultDtoOfInterventionPlanActorListDto implements IPagedResultDtoOfInterventionPlanActorListDto {
    totalCount!: number;
    items!: InterventionPlanActorLocationDto[] | undefined;

    constructor(data?: IPagedResultDtoOfInterventionPlanActorListDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.totalCount = _data["totalCount"];
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items!.push(InterventionPlanActorLocationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfInterventionPlanActorListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfInterventionPlanActorListDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalCount"] = this.totalCount;
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        return data;
    }
}

export interface IPagedResultDtoOfInterventionPlanLocationListDto {
    totalCount: number;
    items: InterventionPlanLocationDto[] | undefined;
}

export class PagedResultDtoOfInterventionPlanLocationListDto implements IPagedResultDtoOfInterventionPlanLocationListDto {
    totalCount!: number;
    items!: InterventionPlanLocationDto[] | undefined;

    constructor(data?: IPagedResultDtoOfInterventionPlanLocationListDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.totalCount = _data["totalCount"];
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items!.push(InterventionPlanLocationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfInterventionPlanLocationListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfInterventionPlanLocationListDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalCount"] = this.totalCount;
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        return data;
    }
}

export interface IInterventionPlanGetDataDto {
    interventionPlan: InterventionPlanDto;
    actorMovements: InterventionPlanActorMovementDto[];
    actorTypes: InterventionPlanActorTypeDto[];
    options: InterventionPlanOptionLocationDto[];
    departments: InterventionPlanDepartmentDto[];
    persons: InterventionPlanPersonDto[];
    territorialUnits: InterventionPlanTerritorialUnitDto[];
    risks: InterventionPlanRiskLevelLocationDto[];
    activities: InterventionPlanActivityLocationDto[];
    entities: InterventionPlanEntityLocationDto[];
    alertResponsibles: InterventionPlanAlertResponsibleLocationDto[];
    roles: InterventionPlanRoleLocationDto[];
}

export class InterventionPlanGetDataDto implements IInterventionPlanGetDataDto {
    interventionPlan: InterventionPlanDto;
    actorMovements: InterventionPlanActorMovementDto[];
    actorTypes: InterventionPlanActorTypeDto[];
    options: InterventionPlanOptionLocationDto[];
    departments: InterventionPlanDepartmentDto[];
    persons: InterventionPlanPersonDto[];
    territorialUnits: InterventionPlanTerritorialUnitDto[];
    risks: InterventionPlanRiskLevelLocationDto[];
    activities: InterventionPlanActivityLocationDto[];
    entities: InterventionPlanEntityLocationDto[];
    alertResponsibles: InterventionPlanAlertResponsibleLocationDto[];
    roles: InterventionPlanRoleLocationDto[];

    constructor(data?: IInterventionPlanGetDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.interventionPlan = data["interventionPlan"] ? InterventionPlanDto.fromJS(data["interventionPlan"]) : <any>undefined;

            if (Array.isArray(data["actorMovements"])) {
                this.actorMovements = [] as any;
                for (let item of data["actorMovements"])
                    this.actorMovements!.push(InterventionPlanActorMovementDto.fromJS(item));
            }
            if (Array.isArray(data["actorTypes"])) {
                this.actorTypes = [] as any;
                for (let item of data["actorTypes"])
                    this.actorTypes!.push(InterventionPlanActorTypeDto.fromJS(item));
            }
            if (Array.isArray(data["options"])) {
                this.options = [] as any;
                for (let item of data["options"])
                    this.options!.push(InterventionPlanOptionLocationDto.fromJS(item));
            }
            if (Array.isArray(data["departments"])) {
                this.departments = [] as any;
                for (let item of data["departments"])
                    this.departments!.push(InterventionPlanDepartmentDto.fromJS(item));
            }
            if (Array.isArray(data["persons"])) {
                this.persons = [] as any;
                for (let item of data["persons"])
                    this.persons!.push(InterventionPlanPersonDto.fromJS(item));
            }
            if (Array.isArray(data["territorialUnits"])) {
                this.territorialUnits = [] as any;
                for (let item of data["territorialUnits"])
                    this.territorialUnits!.push(InterventionPlanTerritorialUnitDto.fromJS(item));
            }
            if (Array.isArray(data["risks"])) {
                this.risks = [] as any;
                for (let item of data["risks"])
                    this.risks!.push(InterventionPlanRiskLevelLocationDto.fromJS(item));
            }
            if (Array.isArray(data["activities"])) {
                this.activities = [] as any;
                for (let item of data["activities"])
                    this.activities!.push(InterventionPlanActivityLocationDto.fromJS(item));
            }
            if (Array.isArray(data["entities"])) {
                this.entities = [] as any;
                for (let item of data["entities"])
                    this.entities!.push(InterventionPlanEntityLocationDto.fromJS(item));
            }
            if (Array.isArray(data["alertResponsibles"])) {
                this.alertResponsibles = [] as any;
                for (let item of data["alertResponsibles"])
                    this.alertResponsibles!.push(InterventionPlanAlertResponsibleLocationDto.fromJS(item));
            }
            if (Array.isArray(data["roles"])) {
                this.roles = [] as any;
                for (let item of data["roles"])
                    this.roles!.push(InterventionPlanRoleLocationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): InterventionPlanGetDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanGetDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["interventionPlan"] = this.interventionPlan ? this.interventionPlan.toJSON() : <any>undefined;

        if (Array.isArray(this.actorMovements)) {
            data["actorMovements"] = [];
            for (let item of this.actorMovements)
                data["actorMovements"].push(item.toJSON());
        }
        if (Array.isArray(this.actorTypes)) {
            data["actorTypes"] = [];
            for (let item of this.actorTypes)
                data["actorTypes"].push(item.toJSON());
        }
        if (Array.isArray(this.options)) {
            data["options"] = [];
            for (let item of this.options)
                data["options"].push(item.toJSON());
        }
        if (Array.isArray(this.departments)) {
            data["departments"] = [];
            for (let item of this.departments)
                data["departments"].push(item.toJSON());
        }
        if (Array.isArray(this.persons)) {
            data["persons"] = [];
            for (let item of this.persons)
                data["persons"].push(item.toJSON());
        }
        if (Array.isArray(this.territorialUnits)) {
            data["territorialUnits"] = [];
            for (let item of this.territorialUnits)
                data["territorialUnits"].push(item.toJSON());
        }
        if (Array.isArray(this.risks)) {
            data["risks"] = [];
            for (let item of this.risks)
                data["risks"].push(item.toJSON());
        }
        if (Array.isArray(this.activities)) {
            data["activities"] = [];
            for (let item of this.activities)
                data["activities"].push(item.toJSON());
        }
        if (Array.isArray(this.entities)) {
            data["entities"] = [];
            for (let item of this.entities)
                data["entities"].push(item.toJSON());
        }
        if (Array.isArray(this.alertResponsibles)) {
            data["alertResponsibles"] = [];
            for (let item of this.alertResponsibles)
                data["alertResponsibles"].push(item.toJSON());
        }
        if (Array.isArray(this.roles)) {
            data["roles"] = [];
            for (let item of this.roles)
                data["roles"].push(item.toJSON());
        }
        return data;
    }
}

export interface IInterventionPlanDto {
    id: number;
    count: number;
    year: number;
    creationTime: moment.Moment;
    lastModificationTime: moment.Moment;
    creatorUser: InterventionPlanUserDto;
    editUser: InterventionPlanUserDto;
    socialConflict: InterventionPlanSocialConflictDto;
    socialConflictSensible: InterventionPlanSocialConflictSensibleDto;
    code: string;
    interventionPlanTime: moment.Moment;
    caseName: string;
    site: ConflictSite;
    person: InterventionPlanPersonDto;
    locations: InterventionPlanLocationDto[];
    actors: InterventionPlanActorLocationDto[];
    states: InterventionPlanStateLocationDto[];
    methodologies: InterventionPlanMethodologyLocationDto[];
    risks: InterventionPlanRiskLocationDto[];
    schedules: InterventionPlanScheduleLocationDto[];
    teams: InterventionPlanTeamLocationDto[];
    solutions: InterventionPlanSolutionLocationDto[];
}

export class InterventionPlanDto implements IInterventionPlanDto {
    id: number;
    count: number;
    year: number;
    creationTime: moment.Moment;
    lastModificationTime: moment.Moment;
    creatorUser: InterventionPlanUserDto;
    editUser: InterventionPlanUserDto;
    socialConflict: InterventionPlanSocialConflictDto;
    socialConflictSensible: InterventionPlanSocialConflictSensibleDto;
    code: string;
    interventionPlanTime: moment.Moment;
    caseName: string;
    site: ConflictSite;
    person: InterventionPlanPersonDto;
    locations: InterventionPlanLocationDto[];
    actors: InterventionPlanActorLocationDto[];
    states: InterventionPlanStateLocationDto[];
    methodologies: InterventionPlanMethodologyLocationDto[];
    risks: InterventionPlanRiskLocationDto[];
    schedules: InterventionPlanScheduleLocationDto[];
    teams: InterventionPlanTeamLocationDto[];
    solutions: InterventionPlanSolutionLocationDto[];

    //replacement
    replaceCode: boolean;
    replaceYear: number;
    replaceCount: number;

    constructor(data?: IInterventionPlanDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.person = new InterventionPlanPersonDto({
                id: -1,
                name: undefined,
                type: PersonType.None
            });
            this.locations = [];
            this.actors = [];
            this.states = [];
            this.methodologies = [];
            this.risks = [];
            this.schedules = [];
            this.teams = [];
            this.solutions = [];
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.creationTime = data["creationTime"] ? moment(data["creationTime"]) : <any>undefined;
            this.lastModificationTime = data["lastModificationTime"] ? moment(data["lastModificationTime"]) : <any>undefined;
            this.creatorUser = data["creatorUser"] ? InterventionPlanUserDto.fromJS(data["creatorUser"]) : <any>undefined;
            this.editUser = data["editUser"] ? InterventionPlanUserDto.fromJS(data["editUser"]) : <any>undefined;
            this.socialConflict = data["socialConflict"] ? InterventionPlanSocialConflictDto.fromJS(data["socialConflict"]) : <any>undefined;
            this.socialConflictSensible = data["socialConflictSensible"] ? InterventionPlanSocialConflictSensibleDto.fromJS(data["socialConflictSensible"]) : <any>undefined;
            this.year = data["year"];
            this.count = data["count"];
            this.code = data["code"];
            this.interventionPlanTime = data["interventionPlanTime"] ? moment(data["interventionPlanTime"]) : <any>undefined;
            this.caseName = data["caseName"];
            this.site = data["site"];
            this.person = data["person"] ? InterventionPlanPersonDto.fromJS(data["person"]) : new InterventionPlanPersonDto({
                id: -1,
                name: undefined,
                type: PersonType.None
            });

            if (Array.isArray(data["locations"])) {
                this.locations = [] as any;
                for (let item of data["locations"])
                    this.locations!.push(InterventionPlanLocationDto.fromJS(item));
            }
            if (Array.isArray(data["actors"])) {
                this.actors = [] as any;
                for (let item of data["actors"])
                    this.actors!.push(InterventionPlanActorLocationDto.fromJS(item));
            }
            if (Array.isArray(data["states"])) {
                this.states = [] as any;
                for (let item of data["states"])
                    this.states!.push(InterventionPlanStateLocationDto.fromJS(item));
            }
            if (Array.isArray(data["methodologies"])) {
                this.methodologies = [] as any;
                for (let item of data["methodologies"])
                    this.methodologies!.push(InterventionPlanMethodologyLocationDto.fromJS(item));
            }
            if (Array.isArray(data["risks"])) {
                this.risks = [] as any;
                for (let item of data["risks"])
                    this.risks!.push(InterventionPlanRiskLocationDto.fromJS(item));
            }
            if (Array.isArray(data["schedules"])) {
                this.schedules = [] as any;
                for (let item of data["schedules"])
                    this.schedules!.push(InterventionPlanScheduleLocationDto.fromJS(item));
            }
            if (Array.isArray(data["teams"])) {
                this.teams = [] as any;
                for (let item of data["teams"])
                    this.teams!.push(InterventionPlanTeamLocationDto.fromJS(item));
            }
            if (Array.isArray(data["solutions"])) {
                this.solutions = [] as any;
                for (let item of data["solutions"])
                    this.solutions!.push(InterventionPlanSolutionLocationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): InterventionPlanDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["socialConflict"] = this.socialConflict ? this.socialConflict.toJSON() : <any>undefined;
        data["socialConflictSensible"] = this.socialConflictSensible ? this.socialConflictSensible.toJSON() : <any>undefined;
        data["code"] = this.code;
        data["interventionPlanTime"] = this.interventionPlanTime ? this.interventionPlanTime.toISOString() : <any>undefined;
        data["caseName"] = this.caseName;
        data["site"] = this.site;
        data["person"] = this.person ? this.person.toJSON() : <any>undefined;

        data["replaceCode"] = this.replaceCode;
        data["replaceYear"] = this.replaceYear;
        data["replaceCount"] = this.replaceCount;

        if (Array.isArray(this.locations)) {
            data["locations"] = [];
            for (let item of this.locations)
                data["locations"].push(item.toJSON());
        }
        if (Array.isArray(this.actors)) {
            data["actors"] = [];
            for (let item of this.actors)
                data["actors"].push(item.toJSON());
        }
        if (Array.isArray(this.states)) {
            data["states"] = [];
            for (let item of this.states)
                data["states"].push(item.toJSON());
        }
        if (Array.isArray(this.methodologies)) {
            data["methodologies"] = [];
            for (let item of this.methodologies)
                data["methodologies"].push(item.toJSON());
        }
        if (Array.isArray(this.risks)) {
            data["risks"] = [];
            for (let item of this.risks)
                data["risks"].push(item.toJSON());
        }
        if (Array.isArray(this.schedules)) {
            data["schedules"] = [];
            for (let item of this.schedules)
                data["schedules"].push(item.toJSON());
        }
        if (Array.isArray(this.teams)) {
            data["teams"] = [];
            for (let item of this.teams)
                data["teams"].push(item.toJSON());
        }
        if (Array.isArray(this.solutions)) {
            data["solutions"] = [];
            for (let item of this.solutions)
                data["solutions"].push(item.toJSON());
        }
        return data;
    }
}

export interface IInterventionPlanSocialConflictDto {
    id: number;
    code: string;
    caseName: string;
}

export class InterventionPlanSocialConflictDto implements IInterventionPlanSocialConflictDto {
    id: number;
    code: string;
    caseName: string;

    constructor(data?: IInterventionPlanSocialConflictDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.code = data["code"];
            this.caseName = data["caseName"];
        }
    }

    static fromJS(data: any): InterventionPlanSocialConflictDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanSocialConflictDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["code"] = this.code;
        data["caseName"] = this.caseName;

        return data;
    }
}

export interface IInterventionPlanSocialConflictSensibleDto {
    id: number;
    code: string;
    caseName: string;
}

export class InterventionPlanSocialConflictSensibleDto implements IInterventionPlanSocialConflictSensibleDto {
    id: number;
    code: string;
    caseName: string;

    constructor(data?: IInterventionPlanSocialConflictSensibleDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.code = data["code"];
            this.caseName = data["caseName"];
        }
    }

    static fromJS(data: any): InterventionPlanSocialConflictSensibleDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanSocialConflictSensibleDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["code"] = this.code;
        data["caseName"] = this.caseName;

        return data;
    }
}

export interface IInterventionPlanActorTypeDto {
    id: number;
    name: string;
    showDetail: boolean;
    showMovement: boolean;
}

export class InterventionPlanActorTypeDto implements IInterventionPlanActorTypeDto {
    id: number;
    name: string;
    showDetail: boolean;
    showMovement: boolean;

    constructor(data?: IInterventionPlanActorTypeDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.showDetail = _data["showDetail"];
            this.showMovement = _data["showMovement"];
        }
    }

    static fromJS(data: any): InterventionPlanActorTypeDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanActorTypeDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["showDetail"] = this.showDetail;
        data["showMovement"] = this.showMovement;

        return data;
    }
}

export interface IInterventionPlanActorMovementDto {
    id: number;
    name: string;
}

export class InterventionPlanActorMovementDto implements IInterventionPlanActorMovementDto {
    id: number;
    name: string;

    constructor(data?: IInterventionPlanActorMovementDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
        }
    }

    static fromJS(data: any): InterventionPlanActorMovementDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanActorMovementDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;

        return data;
    }
}

export interface IInterventionPlanOptionLocationDto {
    id: number;
    name: string;
}

export class InterventionPlanOptionLocationDto implements IInterventionPlanOptionLocationDto {
    id: number;
    name: string;

    constructor(data?: IInterventionPlanOptionLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
        }
    }

    static fromJS(data: any): InterventionPlanOptionLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanOptionLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;

        return data;
    }
}

export interface IInterventionPlanPersonDto {
    id: number;
    name: string;
    type: PersonType;
}

export class InterventionPlanPersonDto implements IInterventionPlanPersonDto {
    id: number;
    name: string;
    type: PersonType;

    constructor(data?: IInterventionPlanPersonDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.type = _data["type"];
        }
    }

    static fromJS(data: any): InterventionPlanPersonDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanPersonDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["type"] = this.type;

        return data;
    }
}

export interface IInterventionPlanLocationDto {
    id: number;
    department: InterventionPlanDepartmentDto;
    province: InterventionPlanProvinceDto;
    district: InterventionPlanDistrictDto;
    territorialUnit: InterventionPlanTerritorialUnitDto;
    region: InterventionPlanRegionDto;
    ubication: string;
    remove: boolean;
}

export class InterventionPlanLocationDto implements IInterventionPlanLocationDto {
    id: number;
    department: InterventionPlanDepartmentDto;
    province: InterventionPlanProvinceDto;
    district: InterventionPlanDistrictDto;
    territorialUnit: InterventionPlanTerritorialUnitDto;
    region: InterventionPlanRegionDto;
    ubication: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: IInterventionPlanLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.department = data["department"] ? InterventionPlanDepartmentDto.fromJS(data["department"]) : <any>undefined;
            this.province = data["province"] ? InterventionPlanProvinceDto.fromJS(data["province"]) : <any>undefined;
            this.district = data["district"] ? InterventionPlanDistrictDto.fromJS(data["district"]) : <any>undefined;
            this.territorialUnit = data["territorialUnit"] ? InterventionPlanTerritorialUnitDto.fromJS(data["territorialUnit"]) : <any>undefined;
            this.region = data["region"] ? InterventionPlanRegionDto.fromJS(data["region"]) : <any>undefined;
            this.ubication = data["ubication"];
        }
    }

    static fromJS(data: any): InterventionPlanLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["department"] = this.department ? this.department.toJSON() : <any>undefined;
        data["province"] = this.province ? this.province.toJSON() : <any>undefined;
        data["district"] = this.district ? this.district.toJSON() : <any>undefined;
        data["territorialUnit"] = this.territorialUnit ? this.territorialUnit.toJSON() : <any>undefined;
        data["region"] = this.region ? this.region.toJSON() : <any>undefined;
        data["ubication"] = this.ubication;
        data["remove"] = this.remove;

        return data;
    }
}

export interface IInterventionPlanTerritorialUnitDto {
    id: number;
    name: string;
}

export class InterventionPlanTerritorialUnitDto implements IInterventionPlanTerritorialUnitDto {
    id: number;
    name: string;

    constructor(data?: IInterventionPlanTerritorialUnitDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.name = data["name"];
        }
    }

    static fromJS(data: any): InterventionPlanTerritorialUnitDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanTerritorialUnitDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;

        return data;
    }
}

export interface IInterventionPlanDepartmentDto {
    id: number;
    territorialUnitIds: number[];
    name: string;
    provinces: InterventionPlanProvinceDto[];
}

export class InterventionPlanDepartmentDto implements IInterventionPlanDepartmentDto {
    id: number;
    territorialUnitIds: number[];
    name: string;
    provinces: InterventionPlanProvinceDto[];

    constructor(data?: IInterventionPlanDepartmentDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.name = data["name"];
            if (Array.isArray(data["territorialUnitIds"])) {
                this.territorialUnitIds = [] as any;
                for (let item of data["territorialUnitIds"])
                    this.territorialUnitIds!.push(item);
            }
            if (Array.isArray(data["provinces"])) {
                this.provinces = [] as any;
                for (let item of data["provinces"])
                    this.provinces!.push(InterventionPlanProvinceDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): InterventionPlanDepartmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanDepartmentDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;

        return data;
    }
}

export interface IInterventionPlanProvinceDto {
    id: number;
    name: string;
    districts: InterventionPlanDistrictDto[];
}

export class InterventionPlanProvinceDto implements IInterventionPlanProvinceDto {
    id: number;
    name: string;
    districts: InterventionPlanDistrictDto[];

    constructor(data?: IInterventionPlanProvinceDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.name = data["name"];
            if (Array.isArray(data["districts"])) {
                this.districts = [] as any;
                for (let item of data["districts"])
                    this.districts!.push(InterventionPlanDistrictDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): InterventionPlanProvinceDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanProvinceDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;

        return data;
    }
}

export interface IInterventionPlanDistrictDto {
    id: number;
    name: string;
}

export class InterventionPlanDistrictDto implements IInterventionPlanDistrictDto {
    id: number;
    name: string;

    constructor(data?: IInterventionPlanDistrictDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.name = data["name"];
        }
    }

    static fromJS(data: any): InterventionPlanDistrictDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanDistrictDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;

        return data;
    }
}

export interface IInterventionPlanRegionDto {
    id: number;
    name: string;
}

export class InterventionPlanRegionDto implements IInterventionPlanRegionDto {
    id: number;
    name: string;

    constructor(data?: IInterventionPlanRegionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.name = data["name"];
        }
    }

    static fromJS(data: any): InterventionPlanRegionDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanRegionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;

        return data;
    }
}

export interface IInterventionPlanActorLocationDto {
    id: number;
    name: string;
    document: string;
    job: string;
    community: string;
    phoneNumber: string;
    emailAddress: string;
    isPoliticalAssociation: boolean;
    politicalAssociation: string;
    position: string;
    interest: string;
    actorType: InterventionPlanActorTypeDto;
    actorMovement: InterventionPlanActorMovementDto;
    imported: boolean;
    importedId: number;
}

export class InterventionPlanActorLocationDto implements IInterventionPlanActorLocationDto {
    id: number;
    name: string;
    document: string;
    job: string;
    community: string;
    phoneNumber: string;
    emailAddress: string;
    isPoliticalAssociation: boolean;
    politicalAssociation: string;
    position: string;
    interest: string;
    actorType: InterventionPlanActorTypeDto;
    actorMovement: InterventionPlanActorMovementDto;
    imported: boolean;
    importedId: number;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: IInterventionPlanActorLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.actorType = new InterventionPlanActorTypeDto({ id: -1, name: undefined, showDetail: false, showMovement: false });
            this.actorMovement = new InterventionPlanActorMovementDto({ id: -1, name: undefined });
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.name = data["name"];
            this.document = data["document"];
            this.job = data["job"];
            this.community = data["community"];
            this.phoneNumber = data["phoneNumber"];
            this.emailAddress = data["emailAddress"];
            this.isPoliticalAssociation = data["isPoliticalAssociation"];
            this.politicalAssociation = data["politicalAssociation"];
            this.position = data["position"];
            this.interest = data["interest"];
            this.imported = data["imported"];
            this.importedId = data["importedId"];
            this.actorType = data["actorType"] ? InterventionPlanActorTypeDto.fromJS(data["actorType"]) : new InterventionPlanActorTypeDto({ id: -1, name: undefined, showDetail: false, showMovement: false });
            this.actorMovement = data["actorMovement"] ? InterventionPlanActorMovementDto.fromJS(data["actorMovement"]) : new InterventionPlanActorMovementDto({ id: -1, name: undefined });
        }
    }

    static fromJS(data: any): InterventionPlanActorLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanActorLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["document"] = this.document;
        data["job"] = this.job;
        data["community"] = this.community;
        data["phoneNumber"] = this.phoneNumber;
        data["emailAddress"] = this.emailAddress;
        data["isPoliticalAssociation"] = this.isPoliticalAssociation;
        data["politicalAssociation"] = this.politicalAssociation;
        data["position"] = this.position;
        data["interest"] = this.interest;
        data["actorType"] = this.actorType ? this.actorType.toJSON() : <any>undefined;
        data["actorMovement"] = this.actorMovement ? this.actorMovement.toJSON() : <any>undefined;
        data["imported"] = this.imported;
        data["importedId"] = this.importedId;
        data["remove"] = this.remove;

        return data;
    }
}

export interface IInterventionPlanStateLocationDto {
    id: number;
    description: string;
}

export class InterventionPlanStateLocationDto implements IInterventionPlanStateLocationDto {
    id: number;
    description: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: IInterventionPlanStateLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.description = data["description"];
        }
    }

    static fromJS(data: any): InterventionPlanStateLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanStateLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["description"] = this.description;
        data["remove"] = this.remove;

        return data;
    }
}

export interface IInterventionPlanMethodologyLocationDto {
    id: number;
    description: string;
    methodology: string;
    interventionPlanOption: InterventionPlanOptionLocationDto;
}

export class InterventionPlanMethodologyLocationDto implements IInterventionPlanMethodologyLocationDto {
    id: number;
    description: string;
    methodology: string;
    interventionPlanOption: InterventionPlanOptionLocationDto;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: IInterventionPlanMethodologyLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.interventionPlanOption = new InterventionPlanOptionLocationDto({
                id: -1,
                name: undefined
            });
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.description = data["description"];
            this.methodology = data["methodology"];
            this.interventionPlanOption = data["interventionPlanOption"] ? InterventionPlanOptionLocationDto.fromJS(data["interventionPlanOption"]) : new InterventionPlanOptionLocationDto({
                id: -1,
                name: undefined
            });
        }
    }

    static fromJS(data: any): InterventionPlanMethodologyLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanMethodologyLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["description"] = this.description;
        data["methodology"] = this.methodology;
        data["interventionPlanOption"] = this.interventionPlanOption ? this.interventionPlanOption.toJSON() : <any>undefined;
        data["remove"] = this.remove;

        return data;
    }
}

export interface IInterventionPlanRiskLocationDto {
    id: number;
    risk: InterventionPlanRiskLevelLocationDto;
    remove: boolean;
}

export class InterventionPlanRiskLocationDto implements IInterventionPlanRiskLocationDto {
    id: number;
    risk: InterventionPlanRiskLevelLocationDto;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: IInterventionPlanRiskLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.risk = new InterventionPlanRiskLevelLocationDto({ id: -1, name: undefined, color: undefined });
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.risk = data["risk"] ? InterventionPlanRiskLevelLocationDto.fromJS(data["risk"]) : new InterventionPlanRiskLevelLocationDto({ id: -1, name: undefined, color: undefined });
        }
    }

    static fromJS(data: any): InterventionPlanRiskLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanRiskLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["risk"] = this.risk ? this.risk.toJSON() : <any>undefined;
        data["remove"] = this.remove;

        return data;
    }
}

export interface IInterventionPlanRiskLevelLocationDto {
    id: number;
    name: string;
    color: string;
}

export class InterventionPlanRiskLevelLocationDto implements IInterventionPlanRiskLevelLocationDto {
    id: number;
    name: string;
    color: string;

    constructor(data?: IInterventionPlanRiskLevelLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.color = _data["color"];
        }
    }

    static fromJS(data: any): InterventionPlanRiskLevelLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanRiskLevelLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["color"] = this.color;

        return data;
    }
}

export interface IInterventionPlanActivityLocationDto {
    id: number;
    name: string;
    enabled: boolean;
    showDescription: boolean;
}

export class InterventionPlanActivityLocationDto implements IInterventionPlanActivityLocationDto {
    id: number;
    name: string;
    enabled: boolean;
    showDescription: boolean;

    constructor(data?: IInterventionPlanActivityLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.enabled = _data["enabled"];
            this.showDescription = _data["showDescription"];
        }
    }

    static fromJS(data: any): InterventionPlanActivityLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanActivityLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["enabled"] = this.enabled;
        data["showDescription"] = this.showDescription;

        return data;
    }
}

export interface IInterventionPlanEntityLocationDto {
    id: number;
    name: string;
    enabled: boolean;
    type: InterventionPlanEntityType;
}

export class InterventionPlanEntityLocationDto implements IInterventionPlanEntityLocationDto {
    id: number;
    name: string;
    enabled: boolean;
    type: InterventionPlanEntityType;

    constructor(data?: IInterventionPlanEntityLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.enabled = _data["enabled"];
            this.type = _data["type"];
        }
    }

    static fromJS(data: any): InterventionPlanEntityLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanEntityLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["enabled"] = this.enabled;
        data["type"] = this.type;

        return data;
    }
}

export interface IInterventionPlanAlertResponsibleLocationDto {
    id: number;
    name: string;
    shortName: string;
}

export class InterventionPlanAlertResponsibleLocationDto implements IInterventionPlanAlertResponsibleLocationDto {
    id: number;
    name: string;
    shortName: string;

    constructor(data?: IInterventionPlanAlertResponsibleLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.shortName = _data["shortName"];
        }
    }

    static fromJS(data: any): InterventionPlanAlertResponsibleLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanAlertResponsibleLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["shortName"] = this.shortName;

        return data;
    }
}

export interface IInterventionPlanDirectoryGovernmentLocationDto {
    id: number;
    name: string;
    shortName: string;
    alias: string;
    address: string;
    phoneNumber: string;
    url: string;
    additionalInformation: string;
    directoryGovernmentSector: InterventionPlanDirectoryGovernmentSectorLocationDto;
}

export class InterventionPlanDirectoryGovernmentLocationDto implements IInterventionPlanDirectoryGovernmentLocationDto {
    id: number;
    name: string;
    shortName: string;
    alias: string;
    address: string;
    phoneNumber: string;
    url: string;
    additionalInformation: string;
    directoryGovernmentSector: InterventionPlanDirectoryGovernmentSectorLocationDto;

    constructor(data?: IInterventionPlanDirectoryGovernmentLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.shortName = _data["shortName"];
            this.alias = _data["alias"];
            this.address = _data["address"];
            this.phoneNumber = _data["phoneNumber"];
            this.url = _data["url"];
            this.additionalInformation = _data["additionalInformation"];
            this.directoryGovernmentSector = _data["directoryGovernmentSector"] ? InterventionPlanDirectoryGovernmentSectorLocationDto.fromJS(_data["directoryGovernmentSector"]) : <any>undefined;
        }
    }

    static fromJS(data: any): InterventionPlanDirectoryGovernmentLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanDirectoryGovernmentLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["shortName"] = this.shortName;
        data["alias"] = this.alias;
        data["address"] = this.address;
        data["phoneNumber"] = this.phoneNumber;
        data["url"] = this.url;
        data["additionalInformation"] = this.additionalInformation;
        data["directoryGovernmentSector"] = this.directoryGovernmentSector ? this.directoryGovernmentSector.toJSON() : <any>undefined;

        return data;
    }
}

export interface IInterventionPlanDirectoryGovernmentSectorLocationDto {
    id: number;
    name: string;
}

export class InterventionPlanDirectoryGovernmentSectorLocationDto implements IInterventionPlanDirectoryGovernmentSectorLocationDto {
    id: number;
    name: string;

    constructor(data?: IInterventionPlanDirectoryGovernmentSectorLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
        }
    }

    static fromJS(data: any): InterventionPlanDirectoryGovernmentSectorLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanDirectoryGovernmentSectorLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;

        return data;
    }
}

export interface IInterventionPlanScheduleLocationDto {
    id: number;
    schedule: string;
    scheduleTime: moment.Moment;
    interventionPlanActivity: InterventionPlanActivityLocationDto;
    activity: string;
    interventionPlanEntity: InterventionPlanEntityLocationDto;
    alertResponsible: InterventionPlanAlertResponsibleLocationDto;
    directoryGovernment: InterventionPlanDirectoryGovernmentLocationDto;
    interventionPlanMethodology: InterventionPlanMethodologyLocationDto;
    entity: string;
    product: string;
    remove: boolean;
}

export class InterventionPlanScheduleLocationDto implements IInterventionPlanScheduleLocationDto {
    id: number;
    schedule: string;
    scheduleTime: moment.Moment;
    interventionPlanActivity: InterventionPlanActivityLocationDto;
    activity: string;
    interventionPlanEntity: InterventionPlanEntityLocationDto;
    alertResponsible: InterventionPlanAlertResponsibleLocationDto;
    directoryGovernment: InterventionPlanDirectoryGovernmentLocationDto;
    interventionPlanMethodology: InterventionPlanMethodologyLocationDto;
    entity: string;
    product: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: IInterventionPlanScheduleLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.interventionPlanActivity = new InterventionPlanActivityLocationDto({
                id: -1,
                name: undefined,
                enabled: true,
                showDescription: false
            });
            this.interventionPlanEntity = new InterventionPlanEntityLocationDto({
                id: -1,
                name: undefined,
                enabled: true,
                type: InterventionPlanEntityType.None
            });
            this.alertResponsible = new InterventionPlanAlertResponsibleLocationDto({
                id: -1,
                name: undefined,
                shortName: undefined
            });
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.schedule = _data["schedule"];
            this.scheduleTime = _data["scheduleTime"] ? moment(_data["scheduleTime"]) : <any>undefined;
            this.interventionPlanActivity = _data["interventionPlanActivity"] ? InterventionPlanActivityLocationDto.fromJS(_data["interventionPlanActivity"]) : new InterventionPlanActivityLocationDto({
                id: -1,
                name: undefined,
                enabled: true,
                showDescription: false
            });
            this.activity = _data["activity"];
            this.interventionPlanEntity = _data["interventionPlanEntity"] ? InterventionPlanEntityLocationDto.fromJS(_data["interventionPlanEntity"]) : new InterventionPlanEntityLocationDto({
                id: -1,
                name: undefined,
                enabled: true,
                type: InterventionPlanEntityType.None
            });
            this.alertResponsible = _data["alertResponsible"] ? InterventionPlanAlertResponsibleLocationDto.fromJS(_data["alertResponsible"]) : new InterventionPlanAlertResponsibleLocationDto({
                id: -1,
                name: undefined,
                shortName: undefined
            });
            this.directoryGovernment = _data["directoryGovernment"] ? InterventionPlanDirectoryGovernmentLocationDto.fromJS(_data["directoryGovernment"]) : <any>undefined;
            this.interventionPlanMethodology = _data["interventionPlanMethodology"] ? InterventionPlanMethodologyLocationDto.fromJS(_data["interventionPlanMethodology"]) : <any>undefined;
            this.entity = _data["entity"];
            this.product = _data["product"];
        }
    }

    static fromJS(data: any): InterventionPlanScheduleLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanScheduleLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["schedule"] = this.schedule;
        data["scheduleTime"] = this.scheduleTime ? this.scheduleTime.toISOString() : <any>undefined;
        data["interventionPlanActivity"] = this.interventionPlanActivity ? this.interventionPlanActivity.toJSON() : <any>undefined;
        data["activity"] = this.activity;
        data["interventionPlanEntity"] = this.interventionPlanEntity ? this.interventionPlanEntity.toJSON() : <any>undefined;
        data["alertResponsible"] = this.alertResponsible ? this.alertResponsible.toJSON() : <any>undefined;
        data["directoryGovernment"] = this.directoryGovernment ? this.directoryGovernment.toJSON() : <any>undefined;
        data["interventionPlanMethodology"] = this.interventionPlanMethodology ? this.interventionPlanMethodology.toJSON() : <any>undefined;
        data["entity"] = this.entity;
        data["remove"] = this.remove;
        data["product"] = this.product;

        return data;
    }
}

export interface IInterventionPlanRoleLocationDto {
    id: number;
    name: string;
    enabled: boolean;
    showDescription: boolean;
}

export class InterventionPlanRoleLocationDto implements IInterventionPlanRoleLocationDto {
    id: number;
    name: string;
    enabled: boolean;
    showDescription: boolean;

    constructor(data?: IInterventionPlanRoleLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.enabled = _data["enabled"];
            this.showDescription = _data["showDescription"];
        }
    }

    static fromJS(data: any): InterventionPlanRoleLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanRoleLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["enabled"] = this.enabled;
        data["showDescription"] = this.showDescription;

        return data;
    }
}

export interface IInterventionPlanTeamLocationDto {
    id: number;
    document: string;
    name: string;
    surname: string;
    secondSurname: string;
    job: string;
    interventionPlanEntity: InterventionPlanEntityLocationDto;
    alertResponsible: InterventionPlanAlertResponsibleLocationDto;
    directoryGovernment: InterventionPlanDirectoryGovernmentLocationDto;
    entity: string;
    interventionPlanRole: InterventionPlanRoleLocationDto;
    role: string;
    remove: boolean;
}

export class InterventionPlanTeamLocationDto implements IInterventionPlanTeamLocationDto {
    id: number;
    document: string;
    name: string;
    surname: string;
    secondSurname: string;
    job: string;
    interventionPlanEntity: InterventionPlanEntityLocationDto;
    alertResponsible: InterventionPlanAlertResponsibleLocationDto;
    directoryGovernment: InterventionPlanDirectoryGovernmentLocationDto;
    entity: string;
    interventionPlanRole: InterventionPlanRoleLocationDto;
    role: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: IInterventionPlanTeamLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.interventionPlanRole = new InterventionPlanRoleLocationDto({
                id: -1,
                name: undefined,
                enabled: true,
                showDescription: false
            });
            this.interventionPlanEntity = new InterventionPlanEntityLocationDto({
                id: -1,
                name: undefined,
                enabled: true,
                type: InterventionPlanEntityType.None
            });
            this.alertResponsible = new InterventionPlanAlertResponsibleLocationDto({
                id: -1,
                name: undefined,
                shortName: undefined
            });
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.document = _data["document"];
            this.name = _data["name"];
            this.surname = _data["surname"];
            this.secondSurname = _data["secondSurname"];
            this.job = _data["job"];
            this.interventionPlanEntity = _data["interventionPlanEntity"] ? InterventionPlanEntityLocationDto.fromJS(_data["interventionPlanEntity"]) : new InterventionPlanEntityLocationDto({
                id: -1,
                name: undefined,
                enabled: true,
                type: InterventionPlanEntityType.None
            });
            this.alertResponsible = _data["alertResponsible"] ? InterventionPlanAlertResponsibleLocationDto.fromJS(_data["alertResponsible"]) : new InterventionPlanAlertResponsibleLocationDto({
                id: -1,
                name: undefined,
                shortName: undefined
            });
            this.directoryGovernment = _data["directoryGovernment"] ? InterventionPlanDirectoryGovernmentLocationDto.fromJS(_data["directoryGovernment"]) : <any>undefined;
            this.entity = _data["entity"];
            this.interventionPlanRole = _data["interventionPlanRole"] ? InterventionPlanRoleLocationDto.fromJS(_data["interventionPlanRole"]) : new InterventionPlanRoleLocationDto({
                id: -1,
                name: undefined,
                enabled: true,
                showDescription: false
            });
            this.role = _data["role"];
        }
    }

    static fromJS(data: any): InterventionPlanTeamLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanTeamLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["document"] = this.document;
        data["name"] = this.name;
        data["surname"] = this.surname;
        data["secondSurname"] = this.secondSurname;
        data["job"] = this.job;
        data["interventionPlanEntity"] = this.interventionPlanEntity ? this.interventionPlanEntity.toJSON() : <any>undefined;
        data["alertResponsible"] = this.alertResponsible ? this.alertResponsible.toJSON() : <any>undefined;
        data["directoryGovernment"] = this.directoryGovernment ? this.directoryGovernment.toJSON() : <any>undefined;
        data["entity"] = this.entity;
        data["interventionPlanRole"] = this.interventionPlanRole ? this.interventionPlanRole.toJSON() : <any>undefined;
        data["role"] = this.role;
        data["remove"] = this.remove;

        return data;
    }
}

export interface IInterventionPlanSolutionLocationDto {
    id: number;
    description: string;
}

export class InterventionPlanSolutionLocationDto implements IInterventionPlanSolutionLocationDto {
    id: number;
    description: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: IInterventionPlanSolutionLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.description = data["description"];
        }
    }

    static fromJS(data: any): InterventionPlanSolutionLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanSolutionLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["description"] = this.description;
        data["remove"] = this.remove;

        return data;
    }
}

export interface IPagedResultDtoOfInterventionPlanListDto {
    totalCount: number;
    items: InterventionPlanGetAllDto[] | undefined;
}

export class PagedResultDtoOfInterventionPlanListDto implements IPagedResultDtoOfInterventionPlanListDto {
    totalCount!: number;
    items!: InterventionPlanGetAllDto[] | undefined;

    constructor(data?: IPagedResultDtoOfInterventionPlanListDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.totalCount = _data["totalCount"];
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items!.push(InterventionPlanGetAllDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfInterventionPlanListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfInterventionPlanListDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalCount"] = this.totalCount;
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        return data;
    }
}

export interface IInterventionPlanGetAllDto {
    id: number;
    year: number;
    count: number;
    code: string;
    caseName: string;
    interventionPlanTime: moment.Moment;
    locations: string;
    territorialUnits: string;
    conflictCode: string;
    conflictCaseName: string;
    site: ConflictSite;
}

export class InterventionPlanGetAllDto implements IInterventionPlanGetAllDto {
    id: number;
    year: number;
    count: number;
    code: string;
    caseName: string;
    interventionPlanTime: moment.Moment;
    locations: string;
    territorialUnits: string;
    conflictCode: string;
    conflictCaseName: string;
    site: ConflictSite;

    constructor(data?: IInterventionPlanGetAllDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.year = data["year"];
            this.count = data["count"];
            this.code = data["code"];
            this.caseName = data["caseName"];
            this.interventionPlanTime = data["interventionPlanTime"] ? moment(data["interventionPlanTime"]) : <any>undefined;
            this.locations = data["locations"];
            this.territorialUnits = data["territorialUnits"];
            this.conflictCode = data["conflictCode"];
            this.conflictCaseName = data["conflictCaseName"];
            this.site = data["site"];
        }
    }

    static fromJS(data: any): InterventionPlanGetAllDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanGetAllDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["code"] = this.code;
        data["caseName"] = this.caseName;
        data["interventionPlanTime"] = this.interventionPlanTime ? this.interventionPlanTime.toISOString() : <any>undefined;
        data["locations"] = this.locations;
        data["territorialUnits"] = this.territorialUnits;
        data["conflictCode"] = this.conflictCode;
        data["conflictCaseName"] = this.conflictCaseName;
        data["site"] = this.site;

        return data;
    }
}


export interface IInterventionPlanUserDto {
    id: number;
    name: string;
    surname: string;
}

export class InterventionPlanUserDto implements IInterventionPlanUserDto {
    id: number;
    name: string;
    surname: string;

    constructor(data?: IInterventionPlanUserDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.name = data["name"];
            this.surname = data["surname"];
        }
    }

    static fromJS(data: any): InterventionPlanUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new InterventionPlanUserDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["surname"] = this.surname;

        return data;
    }
}