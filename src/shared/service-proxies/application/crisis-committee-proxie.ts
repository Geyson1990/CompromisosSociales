import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete, EntityDto, PersonType } from '../service-proxies';
import * as moment from 'moment';

@Injectable()
export class CrisisCommitteeServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(
        caseName: string | undefined,
        code: string | undefined,
        interventionPlanCode: string | undefined,
        interventionPlanCaseName: string | undefined,
        filterByDate: boolean | undefined,
        startDate: moment.Moment | undefined,
        endDate: moment.Moment | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultDtoOfCrisisCommitteeListDto> {
        let url_ = this.baseUrl + "/api/services/app/CrisisCommittee/GetAll?";
        if (caseName !== undefined)
            url_ += "CaseName=" + encodeURIComponent("" + caseName) + "&";
        if (code !== undefined)
            url_ += "Code=" + encodeURIComponent("" + code) + "&";
        if (interventionPlanCode !== undefined)
            url_ += "InterventionPlanCode=" + encodeURIComponent("" + interventionPlanCode) + "&";
        if (interventionPlanCaseName !== undefined)
            url_ += "InterventionPlanCaseName=" + encodeURIComponent("" + interventionPlanCaseName) + "&";
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
                    return <Observable<PagedResultDtoOfCrisisCommitteeListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfCrisisCommitteeListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfCrisisCommitteeListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfCrisisCommitteeListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfCrisisCommitteeListDto>(<any>null);
    }

    get(id: number): Observable<CrisisCommitteeGetDataDto> {
        let url_ = this.baseUrl + "/api/services/app/CrisisCommittee/Get?";
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
                    return <Observable<CrisisCommitteeGetDataDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<CrisisCommitteeGetDataDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<CrisisCommitteeGetDataDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = CrisisCommitteeGetDataDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<CrisisCommitteeGetDataDto>(<any>null);
    }


    create(crisisCommittee: CrisisCommitteeDto): Observable<EntityDto> {
        let url_ = this.baseUrl + "/api/services/app/CrisisCommittee/Create";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: crisisCommittee.toJSON(),
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
                    return <Observable<EntityDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<EntityDto>><any>_observableThrow(response_);
        }));
    }

    protected processCreate(response: HttpResponseBase): Observable<EntityDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = EntityDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<EntityDto>(<any>null);
    }

    update(crisisCommittee: CrisisCommitteeDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/CrisisCommittee/Update";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: crisisCommittee.toJSON(),
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
        let url_ = this.baseUrl + "/api/services/app/CrisisCommittee/Delete?";
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

export interface IPagedResultDtoOfCrisisCommitteeListDto {
    totalCount: number;
    items: CrisisCommitteeDto[] | undefined;
}

export class PagedResultDtoOfCrisisCommitteeListDto implements IPagedResultDtoOfCrisisCommitteeListDto {
    totalCount!: number;
    items!: CrisisCommitteeDto[] | undefined;

    constructor(data?: IPagedResultDtoOfCrisisCommitteeListDto) {
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
                    this.items!.push(CrisisCommitteeDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfCrisisCommitteeListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfCrisisCommitteeListDto();
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

export interface ICrisisCommitteeGetDataDto {
    crisisCommittee: CrisisCommitteeDto;
    alertResponsibles: CrisisCommitteeAlertResponsibleLocationDto[];
    jobs: CrisisCommitteeJobLocationDto[];
    persons: CrisisCommitteePersonDto[];
}

export class CrisisCommitteeGetDataDto implements ICrisisCommitteeGetDataDto {
    crisisCommittee: CrisisCommitteeDto;
    alertResponsibles: CrisisCommitteeAlertResponsibleLocationDto[];
    jobs: CrisisCommitteeJobLocationDto[];
    persons: CrisisCommitteePersonDto[];

    constructor(data?: ICrisisCommitteeGetDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.crisisCommittee = _data["crisisCommittee"] ? CrisisCommitteeDto.fromJS(_data["crisisCommittee"]) : <any>undefined;
            if (Array.isArray(_data["alertResponsibles"])) {
                this.alertResponsibles = [] as any;
                for (let item of _data["alertResponsibles"])
                    this.alertResponsibles!.push(CrisisCommitteeAlertResponsibleLocationDto.fromJS(item));
            }
            if (Array.isArray(_data["jobs"])) {
                this.jobs = [] as any;
                for (let item of _data["jobs"])
                    this.jobs!.push(CrisisCommitteeJobLocationDto.fromJS(item));
            }
            if (Array.isArray(_data["persons"])) {
                this.persons = [] as any;
                for (let item of _data["persons"])
                    this.persons!.push(CrisisCommitteePersonDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CrisisCommitteeGetDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new CrisisCommitteeGetDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["crisisCommittee"] = this.crisisCommittee ? this.crisisCommittee.toJSON() : <any>undefined;
        if (Array.isArray(this.alertResponsibles)) {
            data["alertResponsibles"] = [];
            for (let item of this.alertResponsibles)
                data["alertResponsibles"].push(item.toJSON());
        }
        if (Array.isArray(this.jobs)) {
            data["jobs"] = [];
            for (let item of this.jobs)
                data["jobs"].push(item.toJSON());
        }
        if (Array.isArray(this.persons)) {
            data["persons"] = [];
            for (let item of this.persons)
                data["persons"].push(item.toJSON());
        }

        return data;
    }
}

export interface ICrisisCommitteeDto {
    id: number;
    creationTime: moment.Moment;
    lastModificationTime: moment.Moment;
    creatorUser: CrisisCommitteeUserDto;
    editUser: CrisisCommitteeUserDto;
    interventionPlan: CrisisCommitteeInterventionPlanLocationDto;
    person: CrisisCommitteePersonDto;
    code: string;
    caseName: string;
    crisisCommitteeTime: moment.Moment;
    teams: CrisisCommitteeTeamLocationDto[];
    plans: CrisisCommitteePlanLocationDto[];
    actions: CrisisCommitteeActionLocationDto[];
    messages: CrisisCommitteeMessageLocationDto[];
    channels: CrisisCommitteeChannelLocationDto[];
    sectors: CrisisCommitteeSectorLocationDto[];
    agreements: CrisisCommitteeAgreementLocationDto[];
    tasks: CrisisCommitteeTaskLocationDto[];
}

export class CrisisCommitteeDto implements ICrisisCommitteeDto {
    id: number;
    count: number;
    year: number;
    creationTime: moment.Moment;
    lastModificationTime: moment.Moment;
    creatorUser: CrisisCommitteeUserDto;
    editUser: CrisisCommitteeUserDto;
    interventionPlan: CrisisCommitteeInterventionPlanLocationDto;
    person: CrisisCommitteePersonDto;
    code: string;
    caseName: string;
    crisisCommitteeTime: moment.Moment;
    teams: CrisisCommitteeTeamLocationDto[];
    plans: CrisisCommitteePlanLocationDto[];
    actions: CrisisCommitteeActionLocationDto[];
    messages: CrisisCommitteeMessageLocationDto[];
    channels: CrisisCommitteeChannelLocationDto[];
    sectors: CrisisCommitteeSectorLocationDto[];
    agreements: CrisisCommitteeAgreementLocationDto[];
    tasks: CrisisCommitteeTaskLocationDto[];

    //replacement
    replaceCode: boolean;
    replaceYear: number;
    replaceCount: number;

    constructor(data?: ICrisisCommitteeDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.person = new CrisisCommitteePersonDto({
                id: -1,
                name: undefined,
                type: PersonType.None
            });
            this.teams = [];
            this.plans = [];
            this.actions = [];
            this.messages = [];
            this.channels = [];
            this.sectors = [];
            this.agreements = [];
            this.tasks = [];
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.count = _data["count"];
            this.year = _data["year"];
            this.code = _data["code"];
            this.caseName = _data["caseName"];
            this.creationTime = _data["creationTime"] ? moment(_data["creationTime"]) : <any>undefined;
            this.lastModificationTime = _data["lastModificationTime"] ? moment(_data["lastModificationTime"]) : <any>undefined;
            this.creatorUser = _data["creatorUser"] ? CrisisCommitteeUserDto.fromJS(_data["creatorUser"]) : <any>undefined;
            this.editUser = _data["editUser"] ? CrisisCommitteeUserDto.fromJS(_data["editUser"]) : <any>undefined;
            this.interventionPlan = _data["interventionPlan"] ? CrisisCommitteeInterventionPlanLocationDto.fromJS(_data["interventionPlan"]) : <any>undefined;
            this.person = _data["person"] ? CrisisCommitteePersonDto.fromJS(_data["person"]) : new CrisisCommitteePersonDto({
                id: -1,
                name: undefined,
                type: PersonType.None
            });
            this.crisisCommitteeTime = _data["crisisCommitteeTime"] ? moment(_data["crisisCommitteeTime"]) : <any>undefined;
            if (Array.isArray(_data["teams"])) {
                this.teams = [] as any;
                for (let item of _data["teams"])
                    this.teams!.push(CrisisCommitteeTeamLocationDto.fromJS(item));
            }
            if (Array.isArray(_data["plans"])) {
                this.plans = [] as any;
                for (let item of _data["plans"])
                    this.plans!.push(CrisisCommitteePlanLocationDto.fromJS(item));
            }
            if (Array.isArray(_data["actions"])) {
                this.actions = [] as any;
                for (let item of _data["actions"])
                    this.actions!.push(CrisisCommitteeActionLocationDto.fromJS(item));
            }
            if (Array.isArray(_data["messages"])) {
                this.messages = [] as any;
                for (let item of _data["messages"])
                    this.messages!.push(CrisisCommitteeMessageLocationDto.fromJS(item));
            }
            if (Array.isArray(_data["channels"])) {
                this.channels = [] as any;
                for (let item of _data["channels"])
                    this.channels!.push(CrisisCommitteeChannelLocationDto.fromJS(item));
            }
            if (Array.isArray(_data["sectors"])) {
                this.sectors = [] as any;
                for (let item of _data["sectors"])
                    this.sectors!.push(CrisisCommitteeSectorLocationDto.fromJS(item));
            }
            if (Array.isArray(_data["agreements"])) {
                this.agreements = [] as any;
                for (let item of _data["agreements"])
                    this.agreements!.push(CrisisCommitteeAgreementLocationDto.fromJS(item));
            }
            if (Array.isArray(_data["tasks"])) {
                this.tasks = [] as any;
                for (let item of _data["tasks"])
                    this.tasks!.push(CrisisCommitteeTaskLocationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CrisisCommitteeDto {
        data = typeof data === 'object' ? data : {};
        let result = new CrisisCommitteeDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["code"] = this.code;
        data["caseName"] = this.caseName;
        data["interventionPlan"] = this.interventionPlan ? this.interventionPlan.toJSON() : <any>undefined;
        data["person"] = this.person ? this.person.toJSON() : <any>undefined;
        data["crisisCommitteeTime"] = this.crisisCommitteeTime ? this.crisisCommitteeTime.toISOString() : <any>undefined;

        data["replaceCode"] = this.replaceCode;
        data["replaceYear"] = this.replaceYear;
        data["replaceCount"] = this.replaceCount;

        if (Array.isArray(this.teams)) {
            data["teams"] = [];
            for (let item of this.teams)
                data["teams"].push(item.toJSON());
        }
        if (Array.isArray(this.plans)) {
            data["plans"] = [];
            for (let item of this.plans)
                data["plans"].push(item.toJSON());
        }
        if (Array.isArray(this.actions)) {
            data["actions"] = [];
            for (let item of this.actions)
                data["actions"].push(item.toJSON());
        }
        if (Array.isArray(this.messages)) {
            data["messages"] = [];
            for (let item of this.messages)
                data["messages"].push(item.toJSON());
        }
        if (Array.isArray(this.channels)) {
            data["channels"] = [];
            for (let item of this.channels)
                data["channels"].push(item.toJSON());
        }
        if (Array.isArray(this.sectors)) {
            data["sectors"] = [];
            for (let item of this.sectors)
                data["sectors"].push(item.toJSON());
        }
        if (Array.isArray(this.agreements)) {
            data["agreements"] = [];
            for (let item of this.agreements)
                data["agreements"].push(item.toJSON());
        }
        if (Array.isArray(this.tasks)) {
            data["tasks"] = [];
            for (let item of this.tasks)
                data["tasks"].push(item.toJSON());
        }

        return data;
    }
}

export interface ICrisisCommitteeInterventionPlanLocationDto {
    id: number;
    code: string;
    caseName: string;
    interventionPlanTime: moment.Moment;
}

export class CrisisCommitteeInterventionPlanLocationDto implements ICrisisCommitteeInterventionPlanLocationDto {
    id: number;
    code: string;
    caseName: string;
    interventionPlanTime: moment.Moment;

    constructor(data?: ICrisisCommitteeInterventionPlanLocationDto) {
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
            this.code = _data["code"];
            this.caseName = _data["caseName"];
            this.interventionPlanTime = _data["interventionPlanTime"] ? moment(_data["interventionPlanTime"]) : <any>undefined;
        }
    }

    static fromJS(data: any): CrisisCommitteeInterventionPlanLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new CrisisCommitteeInterventionPlanLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["code"] = this.code;
        data["caseName"] = this.caseName;
        data["interventionPlanTime"] = this.interventionPlanTime ? this.interventionPlanTime.toISOString() : <any>undefined;

        return data;
    }
}

export interface ICrisisCommitteeTeamLocationDto {
    id: number;
    alertResponsible: CrisisCommitteeAlertResponsibleLocationDto;
    crisisCommitteeJob: CrisisCommitteeJobLocationDto;
    job: string;
    document: string;
    name: string;
    surname: string;
    secondSurname: string;
    remove: boolean;
}

export class CrisisCommitteeTeamLocationDto implements ICrisisCommitteeTeamLocationDto {
    id: number;
    alertResponsible: CrisisCommitteeAlertResponsibleLocationDto;
    crisisCommitteeJob: CrisisCommitteeJobLocationDto;
    job: string;
    document: string;
    name: string;
    surname: string;
    secondSurname: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ICrisisCommitteeTeamLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.alertResponsible = new CrisisCommitteeAlertResponsibleLocationDto({
                id: -1,
                name: undefined,
                shortName: undefined
            });
            this.crisisCommitteeJob = new CrisisCommitteeJobLocationDto({
                id: -1,
                name: undefined,
                showDescription: undefined
            });
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.alertResponsible = _data["alertResponsible"] ? CrisisCommitteeAlertResponsibleLocationDto.fromJS(_data["alertResponsible"]) : new CrisisCommitteeAlertResponsibleLocationDto({
                id: -1,
                name: undefined,
                shortName: undefined
            });
            this.crisisCommitteeJob = _data["crisisCommitteeJob"] ? CrisisCommitteeJobLocationDto.fromJS(_data["crisisCommitteeJob"]) : this.crisisCommitteeJob = new CrisisCommitteeJobLocationDto({
                id: -1,
                name: undefined,
                showDescription: undefined
            });
            this.job = _data["job"];
            this.document = _data["document"];
            this.name = _data["name"];
            this.surname = _data["surname"];
            this.secondSurname = _data["secondSurname"];
        }
    }

    static fromJS(data: any): CrisisCommitteeTeamLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new CrisisCommitteeTeamLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["alertResponsible"] = this.alertResponsible ? this.alertResponsible.toJSON() : <any>undefined;
        data["crisisCommitteeJob"] = this.crisisCommitteeJob ? this.crisisCommitteeJob.toJSON() : <any>undefined;
        data["job"] = this.job;
        data["document"] = this.document;
        data["name"] = this.name;
        data["surname"] = this.surname;
        data["secondSurname"] = this.secondSurname;

        return data;
    }
}

export interface ICrisisCommitteeAlertResponsibleLocationDto {
    id: number;
    name: string;
    shortName: string;
}

export class CrisisCommitteeAlertResponsibleLocationDto implements ICrisisCommitteeAlertResponsibleLocationDto {
    id: number;
    name: string;
    shortName: string;

    constructor(data?: ICrisisCommitteeAlertResponsibleLocationDto) {
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

    static fromJS(data: any): CrisisCommitteeAlertResponsibleLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new CrisisCommitteeAlertResponsibleLocationDto();
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

export interface ICrisisCommitteeJobLocationDto {
    id: number;
    name: string;
    showDescription: boolean;
}

export class CrisisCommitteeJobLocationDto implements ICrisisCommitteeJobLocationDto {
    id: number;
    name: string;
    showDescription: boolean;

    constructor(data?: ICrisisCommitteeJobLocationDto) {
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
            this.showDescription = _data["showDescription"];
        }
    }

    static fromJS(data: any): CrisisCommitteeJobLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new CrisisCommitteeJobLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["showDescription"] = this.showDescription;

        return data;
    }
}

export interface ICrisisCommitteePlanLocationDto {
    id: number;
    description: string;
    remove: boolean;
}

export class CrisisCommitteePlanLocationDto implements ICrisisCommitteePlanLocationDto {
    id: number;
    description: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ICrisisCommitteePlanLocationDto) {
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
            this.description = _data["description"];
        }
    }

    static fromJS(data: any): CrisisCommitteePlanLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new CrisisCommitteePlanLocationDto();
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

export interface ICrisisCommitteeActionLocationDto {
    id: number;
    description: string;
    remove: boolean;
}

export class CrisisCommitteeActionLocationDto implements ICrisisCommitteeActionLocationDto {
    id: number;
    description: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ICrisisCommitteeActionLocationDto) {
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
            this.description = _data["description"];
        }
    }

    static fromJS(data: any): CrisisCommitteeActionLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new CrisisCommitteeActionLocationDto();
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

export interface ICrisisCommitteeMessageLocationDto {
    id: number;
    description: string;
    remove: boolean;
}

export class CrisisCommitteeMessageLocationDto implements ICrisisCommitteeMessageLocationDto {
    id: number;
    description: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ICrisisCommitteeMessageLocationDto) {
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
            this.description = _data["description"];
        }
    }

    static fromJS(data: any): CrisisCommitteeMessageLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new CrisisCommitteeMessageLocationDto();
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

export interface ICrisisCommitteeChannelLocationDto {
    id: number;
    description: string;
    remove: boolean;
}

export class CrisisCommitteeChannelLocationDto implements ICrisisCommitteeChannelLocationDto {
    id: number;
    description: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ICrisisCommitteeChannelLocationDto) {
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
            this.description = _data["description"];
        }
    }

    static fromJS(data: any): CrisisCommitteeChannelLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new CrisisCommitteeChannelLocationDto();
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

export interface ICrisisCommitteeSectorLocationDto {
    id: number;
    directoryGovernment: CrisisCommitteeDirectoryGovernmentRelationDto;
    remove: boolean;
}

export class CrisisCommitteeSectorLocationDto implements ICrisisCommitteeSectorLocationDto {
    id: number;
    directoryGovernment: CrisisCommitteeDirectoryGovernmentRelationDto;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ICrisisCommitteeSectorLocationDto) {
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
            this.directoryGovernment = _data["directoryGovernment"] ? CrisisCommitteeDirectoryGovernmentRelationDto.fromJS(_data["directoryGovernment"]) : <any>undefined;
        }
    }

    static fromJS(data: any): CrisisCommitteeSectorLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new CrisisCommitteeSectorLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["directoryGovernment"] = this.directoryGovernment ? this.directoryGovernment.toJSON() : <any>undefined;
        data["remove"] = this.remove;

        return data;
    }
}

export interface ICrisisCommitteeDirectoryGovernmentRelationDto {
    id: number;
    name: string;
    shortName: string;
    alias: string;
    address: string;
    phoneNumber: string;
    url: string;
    additionalInformation: string;
    directoryGovernmentSector: CrisisCommitteeDirectoryGovernmentSectorRelationDto;
}

export class CrisisCommitteeDirectoryGovernmentRelationDto implements ICrisisCommitteeDirectoryGovernmentRelationDto {
    id: number;
    name: string;
    shortName: string;
    alias: string;
    address: string;
    phoneNumber: string;
    url: string;
    additionalInformation: string;
    directoryGovernmentSector: CrisisCommitteeDirectoryGovernmentSectorRelationDto;

    constructor(data?: ICrisisCommitteeDirectoryGovernmentRelationDto) {
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
            this.directoryGovernmentSector = _data["directoryGovernmentSector"] ? CrisisCommitteeDirectoryGovernmentSectorRelationDto.fromJS(_data["directoryGovernmentSector"]) : <any>undefined;
        }
    }

    static fromJS(data: any): CrisisCommitteeDirectoryGovernmentRelationDto {
        data = typeof data === 'object' ? data : {};
        let result = new CrisisCommitteeDirectoryGovernmentRelationDto();
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

export interface ICrisisCommitteeDirectoryGovernmentSectorRelationDto {
    id: number;
    name: string;
}

export class CrisisCommitteeDirectoryGovernmentSectorRelationDto implements ICrisisCommitteeDirectoryGovernmentSectorRelationDto {
    id: number;
    name: string;

    constructor(data?: ICrisisCommitteeDirectoryGovernmentSectorRelationDto) {
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

    static fromJS(data: any): CrisisCommitteeDirectoryGovernmentSectorRelationDto {
        data = typeof data === 'object' ? data : {};
        let result = new CrisisCommitteeDirectoryGovernmentSectorRelationDto();
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

export interface ICrisisCommitteeAgreementLocationDto {
    id: number;
    description: string;
    remove: boolean;
}

export class CrisisCommitteeAgreementLocationDto implements ICrisisCommitteeAgreementLocationDto {
    id: number;
    description: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ICrisisCommitteeAgreementLocationDto) {
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
            this.description = _data["description"];
        }
    }

    static fromJS(data: any): CrisisCommitteeAgreementLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new CrisisCommitteeAgreementLocationDto();
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

export interface ICrisisCommitteeTaskLocationDto {
    id: number;
    description: string;
    remove: boolean;
}

export class CrisisCommitteeTaskLocationDto implements ICrisisCommitteeTaskLocationDto {
    id: number;
    description: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ICrisisCommitteeTaskLocationDto) {
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
            this.description = _data["description"];
        }
    }

    static fromJS(data: any): CrisisCommitteeTaskLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new CrisisCommitteeTaskLocationDto();
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


export interface ICrisisCommitteeUserDto {
    id: number;
    name: string;
    surname: string;
}

export class CrisisCommitteeUserDto implements ICrisisCommitteeUserDto {
    id: number;
    name: string;
    surname: string;

    constructor(data?: ICrisisCommitteeUserDto) {
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

    static fromJS(data: any): CrisisCommitteeUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new CrisisCommitteeUserDto();
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

export interface ICrisisCommitteePersonDto {
    id: number;
    name: string;
    type: PersonType;
}

export class CrisisCommitteePersonDto implements ICrisisCommitteePersonDto {
    id: number;
    name: string;
    type: PersonType;

    constructor(data?: ICrisisCommitteePersonDto) {
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

    static fromJS(data: any): CrisisCommitteePersonDto {
        data = typeof data === 'object' ? data : {};
        let result = new CrisisCommitteePersonDto();
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