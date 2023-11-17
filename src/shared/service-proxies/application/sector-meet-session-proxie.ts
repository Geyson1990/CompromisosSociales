import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete, EntityDto, PersonType } from '../service-proxies';
import * as moment from 'moment';

@Injectable()
export class SectorMeetSessionServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(filter: string | undefined, sectorMeetId: number, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfSectorMeetSessionListDto> {
        let url_ = this.baseUrl + "/api/services/app/SectorMeetSession/GetAll?";
        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (sectorMeetId !== undefined)
            url_ += "SectorMeetId=" + encodeURIComponent("" + sectorMeetId) + "&";
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
                    return <Observable<PagedResultDtoOfSectorMeetSessionListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfSectorMeetSessionListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfSectorMeetSessionListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfSectorMeetSessionListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfSectorMeetSessionListDto>(<any>null);
    }

    getAllLeaders(filter: string | undefined, sectorMeetSessionId: number, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfSectorMeetSessionLeaderListDto> {
        console.log("getall")
       
        let url_ = this.baseUrl + "/api/services/app/SectorMeetSession/GetAllLeaders?";
        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (sectorMeetSessionId !== undefined)
            url_ += "SectorMeetSessionId=" + encodeURIComponent("" + sectorMeetSessionId) + "&";
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
            return this.processGetAllLeaders(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllLeaders(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfSectorMeetSessionLeaderListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfSectorMeetSessionLeaderListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllLeaders(response: HttpResponseBase): Observable<PagedResultDtoOfSectorMeetSessionLeaderListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfSectorMeetSessionLeaderListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfSectorMeetSessionLeaderListDto>(<any>null);
    }
    
    get(meetId: number, sessionId?: number): Observable<SectorMeetSessionGetDataDto> {
        let url_ = this.baseUrl + "/api/services/app/SectorMeetSession/Get?";
        if (meetId === null)
            throw new Error("The parameter 'Id' cannot be null.");
        else if (meetId !== undefined)
            url_ += "SectorMeetId=" + encodeURIComponent("" + meetId) + "&";
        if (sessionId === null)
            throw new Error("The parameter 'Id' cannot be null.");
        else if (sessionId !== undefined)
            url_ += "SectorMeetSessionId=" + encodeURIComponent("" + sessionId) + "&";
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
                    return <Observable<SectorMeetSessionGetDataDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<SectorMeetSessionGetDataDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<SectorMeetSessionGetDataDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = SectorMeetSessionGetDataDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SectorMeetSessionGetDataDto>(<any>null);
    }

    create(variable: SectorMeetSessionDto): Observable<EntityDto> {
        let url_ = this.baseUrl + "/api/services/app/SectorMeetSession/Create";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: variable.toJSON(),
            headers: new HttpHeaders({
                "Accept": "text/plain",
                "Content-Type": "application/json-patch+json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processCreateOrUpdate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateOrUpdate(<any>response_);
                } catch (e) {
                    return <Observable<EntityDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<EntityDto>><any>_observableThrow(response_);
        }));
    }

    update(variable: SectorMeetSessionDto): Observable<EntityDto> {
        let url_ = this.baseUrl + "/api/services/app/SectorMeetSession/Update";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: variable.toJSON(),
            headers: new HttpHeaders({
                "Accept": "text/plain",
                "Content-Type": "application/json-patch+json"
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processCreateOrUpdate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateOrUpdate(<any>response_);
                } catch (e) {
                    return <Observable<EntityDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<EntityDto>><any>_observableThrow(response_);
        }));
    }

    protected processCreateOrUpdate(response: HttpResponseBase): Observable<EntityDto> {
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

    delete(id: number): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/SectorMeetSession/Delete?";
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

export interface IPagedResultDtoOfSectorMeetSessionListDto {
    totalCount: number;
    items: SectorMeetSessionDto[] | undefined;
}

export class PagedResultDtoOfSectorMeetSessionListDto implements IPagedResultDtoOfSectorMeetSessionListDto {
    totalCount!: number;
    items!: SectorMeetSessionDto[] | undefined;

    constructor(data?: IPagedResultDtoOfSectorMeetSessionListDto) {
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
                    this.items!.push(SectorMeetSessionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfSectorMeetSessionListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfSectorMeetSessionListDto();
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

export interface IPagedResultDtoOfSectorMeetSessionLeaderListDto {
    totalCount: number;
    items: SectorMeetSessionLeaderRelationDto[] | undefined;
}

export class PagedResultDtoOfSectorMeetSessionLeaderListDto implements IPagedResultDtoOfSectorMeetSessionLeaderListDto {
    totalCount!: number;
    items!: SectorMeetSessionLeaderRelationDto[] | undefined;

    constructor(data?: IPagedResultDtoOfSectorMeetSessionLeaderListDto) {
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
                    this.items!.push(SectorMeetSessionLeaderRelationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfSectorMeetSessionLeaderListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfSectorMeetSessionLeaderListDto();
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

export interface ISectorMeetSessionGetDataDto {
    sectorMeetSession: SectorMeetSessionDto;
    departments: SectorMeetSessionDepartmentDto[];
    persons: SectorMeetSessionPersonDto[];
}

export class SectorMeetSessionGetDataDto implements ISectorMeetSessionGetDataDto {
    sectorMeetSession: SectorMeetSessionDto;
    departments: SectorMeetSessionDepartmentDto[];
    persons: SectorMeetSessionPersonDto[];

    constructor(data?: ISectorMeetSessionGetDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.sectorMeetSession = data["sectorMeetSession"] ? SectorMeetSessionDto.fromJS(data["sectorMeetSession"]) : <any>undefined;
            if (Array.isArray(data["departments"])) {
                this.departments = [] as any;
                for (let item of data["departments"])
                    this.departments!.push(SectorMeetSessionDepartmentDto.fromJS(item));
            }
            if (Array.isArray(data["persons"])) {
                this.persons = [] as any;
                for (let item of data["persons"])
                    this.persons!.push(SectorMeetSessionPersonDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SectorMeetSessionGetDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetSessionGetDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["sectorMeetSession"] = this.sectorMeetSession ? this.sectorMeetSession.toJSON() : <any>undefined;

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

        return data;
    }
}

export class ISectorMeetSessionDto {
    id: number;
    sectorMeet: SectorMeetSessionSectorMeetLocationDto;
    sessionTime: moment.Moment;
    type: SectorMeetSessionType;
    department: SectorMeetSessionDepartmentReverseDto;
    province: SectorMeetSessionProvinceReverseDto;
    district: SectorMeetSessionDistrictReverseDto;
    location: string;
    latitude: string;
    longitude: string;
    mainSummary: string;
    isDescriptionSocialConflict: boolean;
    side: string;
    personTime: moment.Moment;
    person: SectorMeetSessionPersonDto;
    actions: SectorMeetSessionActionLocationDto[];
    schedules: SectorMeetSessionScheduleLocationDto[];
    agreements: SectorMeetSessionAgreementLocationDto[];
    criticalAspects: SectorMeetSessionCriticalAspectLocationDto[];
    riskFactors: SectorMeetSessionRiskFactorDto[];
    leaders: SectorMeetSessionLeaderRelationDto[];
    resources: SectorMeetSessionResourceDto[];
    summaries: SectorMeetSessionSummaryLocationDto[];
    uploadFiles: SectorMeetSessionAttachmentUploadDto[];
    uploadFilesPDF: SectorMeetSessionAttachmentUploadDto[];
    institutionType: SectorMeetSessionEntityType;  
}
 
export class SectorMeetSessionDto implements ISectorMeetSessionDto {
    id: number;
    sectorMeet: SectorMeetSessionSectorMeetLocationDto;
    sessionTime: moment.Moment;
    type: SectorMeetSessionType;
    department: SectorMeetSessionDepartmentReverseDto;
    province: SectorMeetSessionProvinceReverseDto;
    district: SectorMeetSessionDistrictReverseDto;
    location: string;
    latitude: string;
    longitude: string;
    mainSummary: string;
    isDescriptionSocialConflict: boolean;
    side: string;
    personTime: moment.Moment;
    person: SectorMeetSessionPersonDto;
    actions: SectorMeetSessionActionLocationDto[];
    schedules: SectorMeetSessionScheduleLocationDto[];
    agreements: SectorMeetSessionAgreementLocationDto[];
    criticalAspects: SectorMeetSessionCriticalAspectLocationDto[];
    riskFactors: SectorMeetSessionRiskFactorDto[];
    leaders: SectorMeetSessionLeaderRelationDto[];
    resources: SectorMeetSessionResourceDto[];
    resourcesFile: SectorMeetSessionResourceDto[];
    summaries: SectorMeetSessionSummaryLocationDto[];
    uploadFiles: SectorMeetSessionAttachmentUploadDto[];
    uploadFilesPDF: SectorMeetSessionAttachmentUploadDto[];
    institutionType: SectorMeetSessionEntityType;

    constructor(data?: ISectorMeetSessionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.schedules = [];
            this.agreements = [];
            this.criticalAspects = [];
            this.riskFactors = [];
            this.actions = [];
            this.summaries = [];
            this.resources = [];
            this.resourcesFile = [];
            this.uploadFiles = [];
            this.uploadFilesPDF = [];
            this.leaders = [];
            this.department = new SectorMeetSessionDepartmentReverseDto({
                id: -1,
                name: undefined
            });
            this.province = new SectorMeetSessionProvinceReverseDto({
                id: -1,
                name: undefined,
                department: undefined
            });
            this.district = new SectorMeetSessionDistrictReverseDto({
                id: -1,
                name: undefined,
                province: undefined
            });
            this.person = new SectorMeetSessionPersonDto({
                id: -1,
                name: undefined,
                type: PersonType.None
            });
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.sectorMeet = data["sectorMeet"] ? SectorMeetSessionSectorMeetLocationDto.fromJS(data["sectorMeet"]) : <any>undefined;
            this.sessionTime = data["sessionTime"] ? moment(data["sessionTime"].toString()) : <any>undefined;
            this.type = data["type"];
            this.department = data["department"] ? SectorMeetSessionDepartmentReverseDto.fromJS(data["department"]) : new SectorMeetSessionDepartmentReverseDto({
                id: -1,
                name: undefined
            });
            this.province = data["province"] ? SectorMeetSessionProvinceReverseDto.fromJS(data["province"]) : new SectorMeetSessionProvinceReverseDto({
                id: -1,
                name: undefined,
                department: undefined
            });
            this.district = data["district"] ? SectorMeetSessionDistrictReverseDto.fromJS(data["district"]) : new SectorMeetSessionDistrictReverseDto({
                id: -1,
                name: undefined,
                province: undefined
            });
            this.location = data["location"];
            this.latitude = data["latitude"];
            this.longitude = data["longitude"];
            this.mainSummary = data["mainSummary"];
            this.isDescriptionSocialConflict = data["isDescriptionSocialConflict"];
            this.side = data["side"];
            this.personTime = data["personTime"] ? moment(data["personTime"].toString()) : <any>undefined;
            this.person = data["person"] ? SectorMeetSessionPersonDto.fromJS(data["person"]) : new SectorMeetSessionPersonDto({
                id: -1,
                name: undefined,
                type: PersonType.None
            });
            if (Array.isArray(data["actions"])) {
                this.actions = [] as any;
                for (let item of data["actions"])
                    this.actions!.push(SectorMeetSessionActionLocationDto.fromJS(item));
            }
            if (Array.isArray(data["schedules"])) {
                this.schedules = [] as any;
                for (let item of data["schedules"])
                    this.schedules!.push(SectorMeetSessionScheduleLocationDto.fromJS(item));
            }
            if (Array.isArray(data["agreements"])) {
                this.agreements = [] as any;
                for (let item of data["agreements"])
                    this.agreements!.push(SectorMeetSessionAgreementLocationDto.fromJS(item));
            }
            if (Array.isArray(data["criticalAspects"])) {
                this.criticalAspects = [] as any;
                for (let item of data["criticalAspects"])
                    this.criticalAspects!.push(SectorMeetSessionCriticalAspectLocationDto.fromJS(item));
            }
            if (Array.isArray(data["riskFactors"])) {
                this.riskFactors = [] as any;
                for (let item of data["riskFactors"])
                    this.riskFactors!.push(SectorMeetSessionCriticalAspectLocationDto.fromJS(item));
            }

            if (Array.isArray(data["leaders"])) {
                this.leaders = [] as any;
                for (let item of data["leaders"])
                    this.leaders!.push(SectorMeetSessionLeaderRelationDto.fromJS(item));
            }
            if (Array.isArray(data["resources"])) {
                this.resources = [] as any;
                for (let item of data["resources"])
                    this.resources!.push(SectorMeetSessionResourceDto.fromJS(item));
            }

            if (Array.isArray(data["resourcesFile"])) {
                this.resourcesFile = [] as any;
                for (let item of data["resourcesFile"])
                    this.resourcesFile!.push(SectorMeetSessionResourceDto.fromJS(item));
            }
            if (Array.isArray(data["summaries"])) {
                this.summaries = [] as any;
                for (let item of data["summaries"])
                    this.summaries!.push(SectorMeetSessionSummaryLocationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SectorMeetSessionDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetSessionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["sectorMeet"] = this.sectorMeet ? this.sectorMeet.toJSON() : <any>undefined;
        data["sessionTime"] = this.sessionTime ? this.sessionTime.toISOString() : <any>undefined;
        data["type"] = this.type;
        data["department"] = this.department ? this.department.toJSON() : <any>undefined;
        data["province"] = this.province ? this.province.toJSON() : <any>undefined;
        data["district"] = this.district ? this.district.toJSON() : <any>undefined;
        data["location"] = this.location;
        data["latitude"] = this.latitude;
        data["longitude"] = this.longitude;
        data["mainSummary"] = this.mainSummary;
        data["isDescriptionSocialConflict"] = this.isDescriptionSocialConflict;
        data["side"] = this.side;
        data["personTime"] = this.personTime ? this.personTime.toISOString() : <any>undefined;
        data["person"] = this.person ? this.person.toJSON() : <any>undefined;
        if (Array.isArray(this.actions)) {
            data["actions"] = [];
            for (let item of this.actions)
                data["actions"].push(item.toJSON());
        }
        if (Array.isArray(this.schedules)) {
            data["schedules"] = [];
            for (let item of this.schedules)
                data["schedules"].push(item.toJSON());
        }
        if (Array.isArray(this.agreements)) {
            data["agreements"] = [];
            for (let item of this.agreements)
                data["agreements"].push(item.toJSON());
        }
        if (Array.isArray(this.criticalAspects)) {
            data["criticalAspects"] = [];
            for (let item of this.criticalAspects)
                data["criticalAspects"].push(item.toJSON());
        }
        if (Array.isArray(this.riskFactors)) {
            data["riskFactors"] = [];
            for (let item of this.riskFactors)
                data["riskFactors"].push(item.toJSON());
        }
        if (Array.isArray(this.leaders)) {
            data["leaders"] = [];
            for (let item of this.leaders)
                data["leaders"].push(item.toJSON());
        }
        if (Array.isArray(this.resources)) {
            data["resources"] = [];
            for (let item of this.resources)
                data["resources"].push(item.toJSON());
        }
        if (Array.isArray(this.resourcesFile)) {
            data["resourcesFile"] = [];
            for (let item of this.resourcesFile)
                data["resourcesFile"].push(item.toJSON());
        }
        if (Array.isArray(this.summaries)) {
            data["summaries"] = [];
            for (let item of this.summaries)
                data["summaries"].push(item.toJSON());
        }
        if (Array.isArray(this.uploadFiles)) {
            data["uploadFiles"] = [];
            for (let item of this.uploadFiles)
                data["uploadFiles"].push(item.toJSON());
        }

        if (Array.isArray(this.uploadFilesPDF)) {
            data["uploadFilesPDF"] = [];
            for (let item of this.uploadFilesPDF)
                data["uploadFilesPDF"].push(item.toJSON());
        }

        return data;
    }
}

export interface ISectorMeetSessionSectorMeetLocationDto {
    id: number;
    code: string;
    meetName: string;
}

export class SectorMeetSessionSectorMeetLocationDto implements ISectorMeetSessionSectorMeetLocationDto {
    id: number;
    code: string;
    meetName: string;

    constructor(data?: ISectorMeetSessionSectorMeetLocationDto) {
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
            this.meetName = data["meetName"];
        }
    }

    static fromJS(data: any): SectorMeetSessionSectorMeetLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetSessionSectorMeetLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["code"] = this.code;
        data["meetName"] = this.meetName;

        return data;
    }
}

export interface ISectorMeetSessionScheduleLocationDto {
    id: number;
    description: string;
}

export class SectorMeetSessionScheduleLocationDto implements ISectorMeetSessionScheduleLocationDto {
    id: number;
    description: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISectorMeetSessionScheduleLocationDto) {
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

    static fromJS(data: any): SectorMeetSessionScheduleLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetSessionScheduleLocationDto();
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

export interface ISectorMeetSessionAgreementLocationDto {
    id: number;
    description: string;
}

export class SectorMeetSessionAgreementLocationDto implements ISectorMeetSessionAgreementLocationDto {
    id: number;
    description: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISectorMeetSessionAgreementLocationDto) {
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

    static fromJS(data: any): SectorMeetSessionAgreementLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetSessionAgreementLocationDto();
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

export interface ISectorMeetSessionCriticalAspectLocationDto {
    id: number;
    description: string;
}

export class SectorMeetSessionCriticalAspectLocationDto implements ISectorMeetSessionCriticalAspectLocationDto {
    id: number;
    description: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISectorMeetSessionCriticalAspectLocationDto) {
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

    static fromJS(data: any): SectorMeetSessionCriticalAspectLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetSessionCriticalAspectLocationDto();
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

export interface ISectorMeetSessionRiskFactorDto {
    id: number;
    description: string;
}

export class SectorMeetSessionRiskFactorDto implements ISectorMeetSessionRiskFactorDto {
    id: number;
    description: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISectorMeetSessionCriticalAspectLocationDto) {
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

    static fromJS(data: any): SectorMeetSessionCriticalAspectLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetSessionCriticalAspectLocationDto();
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

export interface ISectorMeetSessionActionLocationDto {
    id: number;
    description: string;
}

export class SectorMeetSessionActionLocationDto implements ISectorMeetSessionActionLocationDto {
    id: number;
    description: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISectorMeetSessionActionLocationDto) {
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

    static fromJS(data: any): SectorMeetSessionActionLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetSessionActionLocationDto();
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

export interface ISectorMeetSessionSummaryLocationDto {
    id: number;
    description: string;
    sectorMeetSessionLeader: SectorMeetSessionLeaderRelationDto;
}

export class SectorMeetSessionSummaryLocationDto implements ISectorMeetSessionSummaryLocationDto {
    id: number;
    description: string;
    sectorMeetSessionLeader: SectorMeetSessionLeaderRelationDto;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISectorMeetSessionSummaryLocationDto) {
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
            this.sectorMeetSessionLeader = data["sectorMeetSessionLeader"] ? SectorMeetSessionLeaderRelationDto.fromJS(data["sectorMeetSessionLeader"]) : <any>undefined;
        }
    }

    static fromJS(data: any): SectorMeetSessionSummaryLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetSessionSummaryLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["description"] = this.description;
        data["sectorMeetSessionLeader"] = this.sectorMeetSessionLeader ? this.sectorMeetSessionLeader.toJSON() : <any>undefined;
        data["remove"] = this.remove;

        return data;
    }
}

export interface ISectorMeetSessionDepartmentDto {
    id: number;
    name: string;
    provinces: SectorMeetSessionProvinceDto[];
}

export class SectorMeetSessionDepartmentDto implements ISectorMeetSessionDepartmentDto {
    id: number;
    name: string;
    provinces: SectorMeetSessionProvinceDto[];

    constructor(data?: ISectorMeetSessionDepartmentDto) {
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
            if (Array.isArray(data["provinces"])) {
                this.provinces = [] as any;
                for (let item of data["provinces"])
                    this.provinces!.push(SectorMeetSessionProvinceDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SectorMeetSessionDepartmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetSessionDepartmentDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        if (Array.isArray(this.provinces)) {
            data["provinces"] = [];
            for (let item of this.provinces)
                data["provinces"].push(item.toJSON());
        }

        return data;
    }
}

export interface ISectorMeetSessionDepartmentReverseDto {
    id: number;
    name: string;
}

export class SectorMeetSessionDepartmentReverseDto implements ISectorMeetSessionDepartmentReverseDto {
    id: number;
    name: string;

    constructor(data?: ISectorMeetSessionDepartmentReverseDto) {
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

    static fromJS(data: any): SectorMeetSessionDepartmentReverseDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetSessionDepartmentReverseDto();
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

export interface ISectorMeetSessionProvinceDto {
    id: number;
    name: string;
    districts: SectorMeetSessionDistrictDto[];
}

export class SectorMeetSessionProvinceDto implements ISectorMeetSessionProvinceDto {
    id: number;
    name: string;
    districts: SectorMeetSessionDistrictDto[];

    constructor(data?: ISectorMeetSessionProvinceDto) {
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
                    this.districts!.push(SectorMeetSessionDistrictDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SectorMeetSessionProvinceDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetSessionProvinceDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        if (Array.isArray(this.districts)) {
            data["districts"] = [];
            for (let item of this.districts)
                data["districts"].push(item.toJSON());
        }

        return data;
    }
}


export interface ISectorMeetSessionProvinceReverseDto {
    id: number;
    name: string;
    department: SectorMeetSessionDepartmentReverseDto;
}

export class SectorMeetSessionProvinceReverseDto implements ISectorMeetSessionProvinceReverseDto {
    id: number;
    name: string;
    department: SectorMeetSessionDepartmentReverseDto;

    constructor(data?: ISectorMeetSessionProvinceReverseDto) {
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
            this.department = data["department"] ? SectorMeetSessionDepartmentReverseDto.fromJS(data["department"]) : <any>undefined;
        }
    }

    static fromJS(data: any): SectorMeetSessionProvinceReverseDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetSessionProvinceReverseDto();
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

export interface ISectorMeetSessionDistrictDto {
    id: number;
    name: string;
}

export class SectorMeetSessionDistrictDto implements ISectorMeetSessionDistrictDto {
    id: number;
    name: string;

    constructor(data?: ISectorMeetSessionDistrictDto) {
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

    static fromJS(data: any): SectorMeetSessionDistrictDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetSessionDistrictDto();
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

export interface ISectorMeetSessionDistrictReverseDto {
    id: number;
    name: string;
    province: SectorMeetSessionProvinceReverseDto;
}

export class SectorMeetSessionDistrictReverseDto implements ISectorMeetSessionDistrictReverseDto {
    id: number;
    name: string;
    province: SectorMeetSessionProvinceReverseDto;

    constructor(data?: ISectorMeetSessionDistrictReverseDto) {
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
            this.province = data["province"] ? SectorMeetSessionProvinceReverseDto.fromJS(data["province"]) : <any>undefined;
        }
    }

    static fromJS(data: any): SectorMeetSessionDistrictReverseDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetSessionDistrictReverseDto();
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

export interface ISectorMeetSessionResourceDto {
    id: number;
    creationTime: moment.Moment;
    creatorUserName: string;
    resource: string;
    name: string;
    fileName: string;
    size: string;
    extension: string;
    className: string;
    remove: boolean;
}

export class SectorMeetSessionResourceDto implements ISectorMeetSessionResourceDto {
    id: number;
    creationTime: moment.Moment;
    creatorUserName: string;
    resource: string;
    name: string;
    fileName: string;
    size: string;
    extension: string;
    className: string;
    remove: boolean;

    constructor(data?: ISectorMeetSessionResourceDto) {
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
            this.creationTime = data["creationTime"] ? moment(data["creationTime"].toString()) : <any>undefined;
            this.creatorUserName = data["creatorUserName"];
            this.resource = data["resource"];
            this.name = data["name"];
            this.fileName = data["fileName"];
            this.size = data["size"];
            this.extension = data["extension"];
            this.className = data["className"];
            this.remove = data["remove"];
        }
    }

    static fromJS(data: any): SectorMeetSessionResourceDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetSessionResourceDto();
        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["remove"] = this.remove;

        return data;
    }
}

export interface ISectorMeetSessionPersonDto {
    id: number;
    name: string;
    type: PersonType;
}

export class SectorMeetSessionPersonDto implements ISectorMeetSessionPersonDto {
    id: number;
    name: string;
    type: PersonType;

    constructor(data?: ISectorMeetSessionPersonDto) {
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
            this.type = data["type"];
        }
    }

    static fromJS(data: any): SectorMeetSessionPersonDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetSessionPersonDto();
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

export interface ISectorMeetSessionAttachmentUploadDto {
    name: string;
    fileName: string;
    creationTime: moment.Moment;
    token: string;
    file: File;
    size: string;
    extension: string;
    className: string;
}

export class SectorMeetSessionAttachmentUploadDto implements ISectorMeetSessionAttachmentUploadDto {
    name: string;
    fileName: string;
    creationTime: moment.Moment;
    token: string;
    file: File;
    size: string;
    extension: string;
    className: string;

    constructor(data?: ISectorMeetSessionAttachmentUploadDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["fileName"] = this.fileName;
        data["name"] = this.name;
        data["size"] = this.size;
        data["extension"] = this.extension;
        data["className"] = this.className;
        data["token"] = this.token;

        return data;
    }
}

export interface ISectorMeetSessionLeaderRelationDto {
    id: number;
    type: SectorMeetSessionEntityType;
    directoryGovernment: SectorMeetSessionDirectoryGovernmentLocationDto;
    directoryIndustry: SectorMeetSessionDirectoryIndustryLocationDto;
    entity: string;
    role: string;
    teams: SectorMeetSessionTeamRelationDto[];
}

export class SectorMeetSessionLeaderRelationDto implements ISectorMeetSessionLeaderRelationDto {
    id: number;
    type: SectorMeetSessionEntityType;
    directoryGovernment: SectorMeetSessionDirectoryGovernmentLocationDto;
    directoryIndustry: SectorMeetSessionDirectoryIndustryLocationDto;
    entity: string;
    role: string;
    teams: SectorMeetSessionTeamRelationDto[];
    remove: boolean;
    //readonly
    isHidden: boolean;

    constructor(data?: ISectorMeetSessionLeaderRelationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.type = SectorMeetSessionEntityType.NONE;
            this.teams = [];
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.type = _data["type"] ? _data["type"] : SectorMeetSessionEntityType.NONE;
            this.directoryGovernment = _data["directoryGovernment"] ? SectorMeetSessionDirectoryGovernmentLocationDto.fromJS(_data["directoryGovernment"]) : <any>undefined;
            this.directoryIndustry = _data["directoryIndustry"] ? SectorMeetSessionDirectoryIndustryLocationDto.fromJS(_data["directoryIndustry"]) : <any>undefined;
            this.entity = _data["entity"];
            this.role = _data["role"];
            if (Array.isArray(_data["teams"])) {
                this.teams = [] as any;
                for (let item of _data["teams"])
                    this.teams!.push(SectorMeetSessionTeamRelationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SectorMeetSessionLeaderRelationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetSessionLeaderRelationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["type"] = this.type;
        data["directoryGovernment"] = this.directoryGovernment ? this.directoryGovernment.toJSON() : <any>undefined;
        data["directoryIndustry"] = this.directoryIndustry ? this.directoryIndustry.toJSON() : <any>undefined;
        data["entity"] = this.entity;
        data["role"] = this.role;
        data["remove"] = this.remove;
        if (Array.isArray(this.teams)) {
            data["teams"] = [];
            for (let item of this.teams)
                data["teams"].push(item.toJSON());
        }

        return data;
    }
}

export interface ISectorMeetSessionTeamRelationDto {
    id: number;
    document: string;
    name: string;
    surname: string;
    secondSurname: string;
    job: string;
    emailAddress: string;
    phoneNumber: string;
    gender: string;
}

export class SectorMeetSessionTeamRelationDto implements ISectorMeetSessionTeamRelationDto {
    id: number;
    document: string;
    name: string;
    surname: string;
    secondSurname: string;
    job: string;
    emailAddress: string;
    phoneNumber: string;
    remove: boolean;
    gender: string;
    //readonly
    isHidden: boolean;

    constructor(data?: ISectorMeetSessionTeamRelationDto) {
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
            this.document = _data["document"];
            this.name = _data["name"];
            this.surname = _data["surname"];
            this.secondSurname = _data["secondSurname"];
            this.job = _data["job"];
            this.emailAddress = _data["emailAddress"];
            this.phoneNumber = _data["phoneNumber"]; 
            this.gender = _data["gender"];
        }
    }

    static fromJS(data: any): SectorMeetSessionTeamRelationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetSessionTeamRelationDto();
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
        data["emailAddress"] = this.emailAddress;
        data["phoneNumber"] = this.phoneNumber;
        data["remove"] = this.remove; 
        data["gender"] = this.gender;

        return data;
    }
}

export interface ISectorMeetSessionDirectoryGovernmentLocationDto {
    id: number;
    name: string;
    shortName: string;
    alias: string;
    address: string;
    phoneNumber: string;
    url: string;
    additionalInformation: string;
    directoryGovernmentSector: SectorMeetSessionDirectoryGovernmentSectorLocationDto;
    district: SectorMeetSessionDistrictReverseDto;
}

export class SectorMeetSessionDirectoryGovernmentLocationDto implements ISectorMeetSessionDirectoryGovernmentLocationDto {
    id: number;
    name: string;
    shortName: string;
    alias: string;
    address: string;
    phoneNumber: string;
    url: string;
    additionalInformation: string;
    directoryGovernmentSector: SectorMeetSessionDirectoryGovernmentSectorLocationDto;
    district: SectorMeetSessionDistrictReverseDto;

    constructor(data?: ISectorMeetSessionDirectoryGovernmentLocationDto) {
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
            this.directoryGovernmentSector = _data["directoryGovernmentSector"] ? SectorMeetSessionDirectoryGovernmentSectorLocationDto.fromJS(_data["directoryGovernmentSector"]) : <any>undefined;
            this.district = _data["district"] ? SectorMeetSessionDistrictReverseDto.fromJS(_data["district"]) : <any>undefined;
        }
    }

    static fromJS(data: any): SectorMeetSessionDirectoryGovernmentLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetSessionDirectoryGovernmentLocationDto();
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

export interface ISectorMeetSessionDirectoryGovernmentSectorLocationDto {
    id: number;
    name: string;
}

export class SectorMeetSessionDirectoryGovernmentSectorLocationDto implements ISectorMeetSessionDirectoryGovernmentSectorLocationDto {
    id: number;
    name: string;

    constructor(data?: ISectorMeetSessionDirectoryGovernmentSectorLocationDto) {
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

    static fromJS(data: any): SectorMeetSessionDirectoryGovernmentSectorLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetSessionDirectoryGovernmentSectorLocationDto();
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

export interface ISectorMeetSessionDirectoryIndustryLocationDto {
    id: number;
    name: string;
    phoneNumber: string;
    emailAddress: string;
    url: string;
    address: string;
    additionalInformation: string;
    enabled: boolean;
    district: SectorMeetSessionDistrictReverseDto;
    directorySector: SectorMeetSessionDirectoryIndustrySectorDto;
}

export class SectorMeetSessionDirectoryIndustryLocationDto implements ISectorMeetSessionDirectoryIndustryLocationDto {
    id: number;
    name: string;
    phoneNumber: string;
    emailAddress: string;
    url: string;
    address: string;
    additionalInformation: string;
    enabled: boolean;
    district: SectorMeetSessionDistrictReverseDto;
    directorySector: SectorMeetSessionDirectoryIndustrySectorDto;

    constructor(data?: ISectorMeetSessionDirectoryIndustryLocationDto) {
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
            this.phoneNumber = data["phoneNumber"];
            this.emailAddress = data["emailAddress"];
            this.url = data["url"];
            this.address = data["address"];
            this.additionalInformation = data["additionalInformation"];
            this.enabled = data["enabled"];
            this.district = data["district"] ? SectorMeetSessionDistrictReverseDto.fromJS(data["district"]) : <any>undefined;
            this.directorySector = data["directorySector"] ? SectorMeetSessionDirectoryIndustrySectorDto.fromJS(data["directorySector"]) : <any>undefined;
        }
    }

    static fromJS(data: any): SectorMeetSessionDirectoryIndustryLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetSessionDirectoryIndustryLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["id"] = this.id;
        data["name"] = this.name;
        data["phoneNumber"] = this.phoneNumber;
        data["emailAddress"] = this.emailAddress;
        data["url"] = this.url;
        data["address"] = this.address;
        data["additionalInformation"] = this.additionalInformation;
        data["enabled"] = this.enabled;
        data["district"] = this.district ? this.district.toJSON() : <any>undefined;
        data["directorySector"] = this.directorySector ? this.directorySector.toJSON() : <any>undefined;

        return data;
    }
}

export interface ISectorMeetSessionDirectoryIndustrySectorDto {
    id: number;
    name: string;
}

export class SectorMeetSessionDirectoryIndustrySectorDto implements ISectorMeetSessionDirectoryIndustrySectorDto {
    id: number;
    name: string;

    constructor(data?: ISectorMeetSessionDirectoryIndustrySectorDto) {
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

    static fromJS(data: any): SectorMeetSessionDirectoryIndustrySectorDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetSessionDirectoryIndustrySectorDto();
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

export const enum SectorMeetSessionEntityType {
    NONE,
    COMPANY,
    ESTATAL_ENTITY,
    CIVIL_SOCIETY,
    OTHER,
    ALL
}

export const enum SectorMeetSessionType {
    NONE,
    PRESENTIAL,
    REMOTE
} 