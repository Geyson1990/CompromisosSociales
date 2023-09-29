import { StaticVariableType } from "./prospective-risk-proxie";
import { StaticVariableSiteType } from "./static-variable-proxie";
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete, EntityDto } from '../service-proxies';
import * as moment from "moment";

@Injectable()
export class ProjectRiskServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(filter: string | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfProjectRiskListDto> {
        let url_ = this.baseUrl + "/api/services/app/ProjectRisk/GetAll?";
        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
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
                    return <Observable<PagedResultDtoOfProjectRiskListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfProjectRiskListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfProjectRiskListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfProjectRiskListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfProjectRiskListDto>(<any>null);
    }

    getAllHistories(filter: string | undefined, projectRiskId: number, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfProjectRiskHistoryListDto> {
        let url_ = this.baseUrl + "/api/services/app/ProjectRisk/GetAllHistories?";
        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (projectRiskId !== undefined)
            url_ += "ProjectRiskId=" + encodeURIComponent("" + projectRiskId) + "&";
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
            return this.processGetAllHistories(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllHistories(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfProjectRiskHistoryListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfProjectRiskHistoryListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllHistories(response: HttpResponseBase): Observable<PagedResultDtoOfProjectRiskHistoryListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfProjectRiskHistoryListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfProjectRiskHistoryListDto>(<any>null);
    }

    getAllDinamicValues(provinceId: number): Observable<PagedResultDtoOfProjectRiskDinamicVariableValueListDto> {
        let url_ = this.baseUrl + "/api/services/app/ProjectRisk/GetAllDinamicValues?";
        if (provinceId !== undefined)
            url_ += "Id=" + encodeURIComponent("" + provinceId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetGetAllDinamicValues(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetGetAllDinamicValues(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfProjectRiskDinamicVariableValueListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfProjectRiskDinamicVariableValueListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetGetAllDinamicValues(response: HttpResponseBase): Observable<PagedResultDtoOfProjectRiskDinamicVariableValueListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfProjectRiskDinamicVariableValueListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfProjectRiskDinamicVariableValueListDto>(<any>null);
    }

    get(id: number): Observable<ProjectRiskGetDataDto> {
        let url_ = this.baseUrl + "/api/services/app/ProjectRisk/Get?";
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
                    return <Observable<ProjectRiskGetDataDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<ProjectRiskGetDataDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<ProjectRiskGetDataDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = ProjectRiskGetDataDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<ProjectRiskGetDataDto>(<any>null);
    }

    getHistory(id: number): Observable<ProjectRiskHistoryDto> {
        let url_ = this.baseUrl + "/api/services/app/ProjectRisk/GetHistory?";
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
            return this.processGetHistory(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetHistory(<any>response_);
                } catch (e) {
                    return <Observable<ProjectRiskHistoryDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<ProjectRiskHistoryDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetHistory(response: HttpResponseBase): Observable<ProjectRiskHistoryDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = ProjectRiskHistoryDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<ProjectRiskHistoryDto>(<any>null);
    }

    createOrUpdate(item: ProjectRiskDto): Observable<EntityDto> {
        let url_ = this.baseUrl + "/api/services/app/ProjectRisk/CreateOrUpdate";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: item.toJSON(),
            headers: new HttpHeaders({
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
        let url_ = this.baseUrl + "/api/services/app/ProjectRisk/Delete?";
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

    deleteHistory(id: number): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/ProjectRisk/DeleteHistory?";
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

export interface IPagedResultDtoOfProjectRiskListDto {
    totalCount: number;
    items: ProjectRiskDto[] | undefined;
}

export class PagedResultDtoOfProjectRiskListDto implements IPagedResultDtoOfProjectRiskListDto {
    totalCount!: number;
    items!: ProjectRiskDto[] | undefined;

    constructor(data?: IPagedResultDtoOfProjectRiskListDto) {
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
                    this.items!.push(ProjectRiskDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfProjectRiskListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfProjectRiskListDto();
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

export interface IPagedResultDtoOfProjectRiskDinamicVariableValueListDto {
    totalCount: number;
    items: ProjectRiskDinamicVariableValueDto[] | undefined;
}

export class PagedResultDtoOfProjectRiskDinamicVariableValueListDto implements IPagedResultDtoOfProjectRiskDinamicVariableValueListDto {
    totalCount!: number;
    items!: ProjectRiskDinamicVariableValueDto[] | undefined;

    constructor(data?: IPagedResultDtoOfProjectRiskDinamicVariableValueListDto) {
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
                    this.items!.push(ProjectRiskDinamicVariableValueDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfProjectRiskDinamicVariableValueListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfProjectRiskDinamicVariableValueListDto();
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

export interface IPagedResultDtoOfProjectRiskHistoryListDto {
    totalCount: number;
    items: ProjectRiskHistoryDto[] | undefined;
}

export class PagedResultDtoOfProjectRiskHistoryListDto implements IPagedResultDtoOfProjectRiskHistoryListDto {
    totalCount!: number;
    items!: ProjectRiskHistoryDto[] | undefined;

    constructor(data?: IPagedResultDtoOfProjectRiskHistoryListDto) {
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
                    this.items!.push(ProjectRiskHistoryDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfProjectRiskHistoryListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfProjectRiskHistoryListDto();
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

export interface IProjectRiskGetDataDto {
    projectRisk: ProjectRiskDto;
    stages: ProjectRiskStageDto[];
    departments: ProjectRiskDepartmentDto[];
    dinamicValues: ProjectRiskDinamicVariableValueDto[];
}

export class ProjectRiskGetDataDto implements IProjectRiskGetDataDto {
    projectRisk: ProjectRiskDto;
    stages: ProjectRiskStageDto[];
    departments: ProjectRiskDepartmentDto[];
    dinamicValues: ProjectRiskDinamicVariableValueDto[];

    constructor(data?: IProjectRiskGetDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.projectRisk = data["projectRisk"] ? ProjectRiskDto.fromJS(data["projectRisk"]) : <any>undefined;
            if (Array.isArray(data["stages"])) {
                this.stages = [] as any;
                for (let item of data["stages"])
                    this.stages!.push(ProjectRiskStageDto.fromJS(item));
            }
            if (Array.isArray(data["departments"])) {
                this.departments = [] as any;
                for (let item of data["departments"])
                    this.departments!.push(ProjectRiskDepartmentDto.fromJS(item));
            }
            if (Array.isArray(data["dinamicValues"])) {
                this.dinamicValues = [] as any;
                for (let item of data["dinamicValues"])
                    this.dinamicValues!.push(ProjectRiskDinamicVariableValueDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ProjectRiskGetDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectRiskGetDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["projectRisk"] = this.projectRisk ? this.projectRisk.toJSON() : <any>undefined;
        if (Array.isArray(this.stages)) {
            data["stages"] = [];
            for (let item of this.stages)
                data["stages"].push(item.toJSON());
        }
        if (Array.isArray(this.departments)) {
            data["departments"] = [];
            for (let item of this.departments)
                data["departments"].push(item.toJSON());
        }
        if (Array.isArray(this.dinamicValues)) {
            data["dinamicValues"] = [];
            for (let item of this.dinamicValues)
                data["dinamicValues"].push(item.toJSON());
        }
        return data;
    }
}

export interface IProjectRiskDto {
    id: number;
    provinceId: number;
    stageId: number;
    code: string;
    name: string;
    evaluatedTime: moment.Moment;
    total: number;
    value: number;
    details: ProjectRiskDetailDto[];
}

export class ProjectRiskDto implements IProjectRiskDto {
    id: number;
    province: ProjectRiskProvinceDto;
    provinceId: number;
    stageId: number;
    code: string;
    name: string;
    evaluatedTime: moment.Moment;
    fixProbabilityRate: number;
    probability: number;
    impact: number;
    fixImpactRate: number;
    total: number;
    value: number;
    details: ProjectRiskDetailDto[];

    //Only read
    creationTime: moment.Moment;
    creationUser: ProjectRiskUserDto;
    lastModificationTime: moment.Moment;
    editionUser: ProjectRiskUserDto;
    stage: ProjectRiskStageDto;
    dinamicValues: ProjectRiskDinamicVariableValueDto[];
    departmentId: number;
    department: ProjectRiskDepartmentDto;
    territorialUnits: ProjectRiskTerritorialUnitDto[];
    territorialUnitText: string;

    constructor(data?: IProjectRiskDto) {
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
            this.province = data["province"] ? ProjectRiskProvinceDto.fromJS(data["province"]) : <any>undefined;
            this.provinceId = data["provinceId"];
            this.stageId = data["stageId"];
            this.stage = data["stage"] ? ProjectRiskStageDto.fromJS(data["stage"]) : <any>undefined;
            this.code = data["code"];
            this.name = data["name"];
            this.evaluatedTime = data["evaluatedTime"] ? moment(data["evaluatedTime"]) : <any>undefined;
            this.creationTime = data["creationTime"] ? moment(data["creationTime"]) : <any>undefined;
            this.lastModificationTime = data["lastModificationTime"] ? moment(data["lastModificationTime"]) : <any>undefined;
            this.creationUser = data["creationUser"] ? ProjectRiskUserDto.fromJS(data["creationUser"]) : <any>undefined;
            this.editionUser = data["editionUser"] ? ProjectRiskUserDto.fromJS(data["editionUser"]) : <any>undefined;
            this.fixProbabilityRate = data["fixProbabilityRate"];
            this.probability = data["probability"];
            this.impact = data["impact"];
            this.fixImpactRate = data["fixImpactRate"];
            this.total = data["total"];
            this.value = data["value"];
            this.departmentId = data["departmentId"];

            if (this.province) {
                this.department = data["province"]["department"] ? ProjectRiskDepartmentDto.fromJS(data["province"]["department"]) : <any>undefined;
                if (this.department) {
                    if (Array.isArray(data["province"]["department"]["territorialUnitDepartments"])) {
                        this.territorialUnits = [];
                        for (let item of data["province"]["department"]["territorialUnitDepartments"])
                            if (item["territorialUnit"])
                                this.territorialUnits!.push(ProjectRiskTerritorialUnitDto.fromJS(item["territorialUnit"]));

                        this.territorialUnitText = this.territorialUnits.map(p => p.name).join(', ');
                    }
                }
            }

            if (Array.isArray(data["details"])) {
                this.details = [] as any;
                for (let item of data["details"])
                    this.details!.push(ProjectRiskDetailDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ProjectRiskDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectRiskDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["provinceId"] = this.provinceId;
        data["stageId"] = this.stageId;
        data["code"] = this.code;
        data["name"] = this.name;
        data["evaluatedTime"] = this.evaluatedTime ? this.evaluatedTime.toISOString() : <any>undefined;
        data["fixImpactRate"] = this.fixImpactRate;
        data["fixProbabilityRate"] = this.fixProbabilityRate;
        if (Array.isArray(this.details)) {
            data["details"] = [];
            for (let item of this.details)
                data["details"].push(item.toJSON());
        }

        return data;
    }
}

export interface IProjectRiskDetailDto {
    id: number;
    projectStageDetailId: number;
    staticVariableOptionId: number;
    value: number;
}

export class ProjectRiskDetailDto implements IProjectRiskDetailDto {
    id: number;
    projectStageDetailId: number;
    staticVariableOptionId: number;
    value: number;

    constructor(data?: IProjectRiskDetailDto) {
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
            this.projectStageDetailId = data["projectStageDetailId"];
            this.staticVariableOptionId = data["staticVariableOptionId"];
            this.value = data["value"];
        }
    }

    static fromJS(data: any): ProjectRiskDetailDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectRiskDetailDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["projectStageDetailId"] = this.projectStageDetailId;
        data["staticVariableOptionId"] = this.staticVariableOptionId;
        data["value"] = this.value;

        return data;
    }
}

export interface IProjectRiskStageDto {
    id: number;
    name: string;
    index: number;
    details: ProjectRiskStageDetailDto[];
}

export class ProjectRiskStageDto implements IProjectRiskStageDto {
    id: number;
    name: string;
    index: number;
    details: ProjectRiskStageDetailDto[];

    constructor(data?: IProjectRiskStageDto) {
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
            this.index = data["index"];

            if (Array.isArray(data["details"])) {
                this.details = [] as any;
                for (let item of data["details"])
                    this.details!.push(ProjectRiskStageDetailDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ProjectRiskStageDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectRiskStageDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["index"] = this.index;

        if (Array.isArray(this.details)) {
            data["details"] = [];
            for (let item of this.details)
                data["details"].push(item.toJSON());
        }

        return data;
    }
}

export interface IProjectRiskStageDetailDto {
    id: number;
    staticVariable: ProjectRiskStaticVariableDto;
}

export class ProjectRiskStageDetailDto implements IProjectRiskStageDetailDto {
    id: number;
    staticVariable: ProjectRiskStaticVariableDto;

    constructor(data?: IProjectRiskStageDetailDto) {
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
            this.staticVariable = data["staticVariable"] ? ProjectRiskStaticVariableDto.fromJS(data["staticVariable"]) : <any>undefined;
        }
    }

    static fromJS(data: any): ProjectRiskStageDetailDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectRiskStageDetailDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["staticVariable"] = this.staticVariable ? this.staticVariable.toJSON() : <any>undefined;

        return data;
    }
}

export interface IProjectRiskStaticVariableDto {
    id: number;
    name: string;
    options: ProjectRiskStaticVariableOptionDto[];
}

export class ProjectRiskStaticVariableDto implements IProjectRiskStaticVariableDto {
    id: number;
    name: string;
    options: ProjectRiskStaticVariableOptionDto[];

    constructor(data?: IProjectRiskStaticVariableDto) {
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

            if (Array.isArray(data["options"])) {
                this.options = [] as any;
                for (let item of data["options"])
                    this.options!.push(ProjectRiskStaticVariableOptionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ProjectRiskStaticVariableDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectRiskStaticVariableDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;

        return data;
    }
}


export interface IProjectRiskStaticVariableOptionDto {
    id: number;
    name: string;
    index: number;
    type: StaticVariableType;
    site: StaticVariableSiteType;
    value: number;
    dinamicVariable: ProjectRiskDinamicVariableDto;
    details: ProjectRiskStaticVariableOptionDetailDto[];
}

export class ProjectRiskStaticVariableOptionDto implements IProjectRiskStaticVariableOptionDto {
    id: number;
    name: string;
    index: number;
    type: StaticVariableType;
    site: StaticVariableSiteType;
    value: number;
    dinamicVariable: ProjectRiskDinamicVariableDto;
    details: ProjectRiskStaticVariableOptionDetailDto[];

    relationId: number;
    relationValue: number;

    constructor(data?: IProjectRiskStaticVariableOptionDto) {
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
            this.index = data["index"];
            this.type = data["type"];
            this.site = data["site"];
            this.value = data["value"];
            this.dinamicVariable = data["dinamicVariable"] ? ProjectRiskDinamicVariableDto.fromJS(data["dinamicVariable"]) : <any>undefined;
            if (Array.isArray(data["details"])) {
                this.details = [] as any;
                for (let item of data["details"])
                    this.details!.push(ProjectRiskStaticVariableOptionDetailDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ProjectRiskStaticVariableOptionDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectRiskStaticVariableOptionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["index"] = this.index;
        data["type"] = this.type;
        data["site"] = this.site;
        data["value"] = this.value;
        data["dinamicVariable"] = this.dinamicVariable ? this.dinamicVariable.toJSON() : <any>undefined;
        if (Array.isArray(this.details)) {
            data["details"] = [];
            for (let item of this.details)
                data["details"].push(item.toJSON());
        }

        return data;
    }
}

export interface IProjectRiskStaticVariableOptionDetailDto {
    id: number;
    name: string;
    index: number;
    value: number;
}

export class ProjectRiskStaticVariableOptionDetailDto implements IProjectRiskStaticVariableOptionDetailDto {
    id: number;
    name: string;
    index: number;
    value: number;

    constructor(data?: IProjectRiskStaticVariableOptionDetailDto) {
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
            this.index = data["index"];
            this.value = data["value"];
        }
    }

    static fromJS(data: any): ProjectRiskStaticVariableOptionDetailDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectRiskStaticVariableOptionDetailDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["index"] = this.index;
        data["value"] = this.value;

        return data;
    }
}

export interface IProjectRiskDinamicVariableDto {
    id: number;
    name: string;
}

export class ProjectRiskDinamicVariableDto implements IProjectRiskDinamicVariableDto {
    id: number;
    name: string;

    constructor(data?: IProjectRiskDinamicVariableDto) {
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

    static fromJS(data: any): ProjectRiskDinamicVariableDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectRiskDinamicVariableDto();
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

export interface IProjectRiskDepartmentDto {
    id: number;
    name: string;
    provinces: ProjectRiskProvinceDto[];
    territorialUnitDepartments: ProjectRiskDepartmentTerrotorialUnitDto[];
}

export class ProjectRiskDepartmentDto implements IProjectRiskDepartmentDto {
    id: number;
    name: string;
    provinces: ProjectRiskProvinceDto[];
    territorialUnitDepartments: ProjectRiskDepartmentTerrotorialUnitDto[];
    territorialUnitText: string;

    constructor(data?: IProjectRiskDepartmentDto) {
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
                    this.provinces!.push(ProjectRiskProvinceDto.fromJS(item));
            }
            if (Array.isArray(data["territorialUnitDepartments"])) {
                this.territorialUnitDepartments = [] as any;
                for (let item of data["territorialUnitDepartments"])
                    this.territorialUnitDepartments!.push(ProjectRiskDepartmentTerrotorialUnitDto.fromJS(item));

                this.territorialUnitText = this.territorialUnitDepartments.filter(p => p.territorialUnit).map(p => p.territorialUnit.name).join(', ');
            }
        }
    }

    static fromJS(data: any): ProjectRiskDepartmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectRiskDepartmentDto();
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
        if (Array.isArray(this.territorialUnitDepartments)) {
            data["territorialUnitDepartments"] = [];
            for (let item of this.territorialUnitDepartments)
                data["territorialUnitDepartments"].push(item.toJSON());
        }

        return data;
    }
}

export interface IProjectRiskProvinceDto {
    id: number;
    name: string;
}

export class ProjectRiskProvinceDto implements IProjectRiskProvinceDto {
    id: number;
    name: string;

    constructor(data?: IProjectRiskProvinceDto) {
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

    static fromJS(data: any): ProjectRiskProvinceDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectRiskProvinceDto();
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

export interface IProjectRiskTerritorialUnitDto {
    id: number;
    name: string;
}

export class ProjectRiskTerritorialUnitDto implements IProjectRiskTerritorialUnitDto {
    id: number;
    name: string;

    constructor(data?: IProjectRiskTerritorialUnitDto) {
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

    static fromJS(data: any): ProjectRiskTerritorialUnitDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectRiskTerritorialUnitDto();
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

export interface IProjectRiskDepartmentTerrotorialUnitDto {
    territorialUnit: ProjectRiskTerritorialUnitDto;
}

export class ProjectRiskDepartmentTerrotorialUnitDto implements IProjectRiskDepartmentTerrotorialUnitDto {
    territorialUnit: ProjectRiskTerritorialUnitDto;

    constructor(data?: IProjectRiskDepartmentTerrotorialUnitDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.territorialUnit = data["territorialUnit"] ? ProjectRiskTerritorialUnitDto.fromJS(data["territorialUnit"]) : <any>undefined;
        }
    }

    static fromJS(data: any): ProjectRiskDepartmentTerrotorialUnitDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectRiskDepartmentTerrotorialUnitDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.territorialUnit ? this.territorialUnit.toJSON() : <any>undefined;

        return data;
    }
}

export interface IProjectRiskDinamicVariableValueDto {
    id: number;
    dinamicVariableId: number;
    value: number;
}

export class ProjectRiskDinamicVariableValueDto implements IProjectRiskDinamicVariableValueDto {
    id: number;
    dinamicVariableId: number;
    value: number;

    constructor(data?: IProjectRiskDinamicVariableValueDto) {
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
            this.dinamicVariableId = data["dinamicVariableId"];
            this.value = data["value"];
        }
    }

    static fromJS(data: any): ProjectRiskDinamicVariableValueDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectRiskDinamicVariableValueDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["dinamicVariableId"] = this.dinamicVariableId;
        data["value"] = this.value;

        return data;
    }
}

export interface IProjectRiskUserDto {
    id: number;
    name: string;
    surname: string;
    emailAddress: string;
}

export class ProjectRiskUserDto implements IProjectRiskUserDto {
    id: number;
    name: string;
    surname: string;
    emailAddress: string;

    constructor(data?: IProjectRiskUserDto) {
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
            this.surname = _data["surname"];
            this.emailAddress = _data["emailAddress"];
        }
    }

    static fromJS(data: any): ProjectRiskUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectRiskUserDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["surname"] = this.surname;
        data["emailAddress"] = this.emailAddress;

        return data;
    }
}

export interface IProjectRiskHistoryDto {
    id: number;
    creationUser: ProjectRiskUserDto;
    stage: ProjectRiskStageDto;
    creationTime: moment.Moment;
    evaluatedTime: moment.Moment;
    total: number;
    fixProbabilityRate: number;
    probability: number;
    probabilityWeight: number;
    impact: number;
    fixImpactRate: number;
    impactWeight: number;
    value: number;
}

export class ProjectRiskHistoryDto implements IProjectRiskHistoryDto {
    id: number;
    creationUser: ProjectRiskUserDto;
    stage: ProjectRiskStageDto;
    creationTime: moment.Moment;
    evaluatedTime: moment.Moment;
    total: number;
    fixProbabilityRate: number;
    probability: number;
    probabilityWeight: number;
    impact: number;
    fixImpactRate: number;
    impactWeight: number;
    value: number;

    constructor(data?: IProjectRiskHistoryDto) {
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
            this.creationUser = _data["creationUser"] ? ProjectRiskUserDto.fromJS(_data["creationUser"]): <any>undefined;
            this.stage = _data["stage"] ? ProjectRiskStageDto.fromJS(_data["stage"]) : <any>undefined;
            this.creationTime = _data["creationTime"] ? moment(_data["creationTime"]) : <any>undefined;
            this.evaluatedTime = _data["evaluatedTime"] ? moment(_data["evaluatedTime"]) : <any>undefined;            
            this.total = _data["total"];
            this.fixProbabilityRate = _data["fixProbabilityRate"];
            this.probability = _data["probability"];
            this.probabilityWeight = _data["probabilityWeight"];
            this.impact = _data["impact"];
            this.fixImpactRate = _data["fixImpactRate"];
            this.impactWeight = _data["impactWeight"];
            this.value = _data["value"];
        }
    }

    static fromJS(data: any): ProjectRiskHistoryDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectRiskHistoryDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["creationUser"] = this.creationUser ? this.creationUser.toJSON() : <any>undefined;
        data["stage"] = this.stage ? this.stage.toJSON() : <any>undefined;
        data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : <any>undefined;
        data["evaluatedTime"] = this.evaluatedTime ? this.evaluatedTime.toJSON() : <any>undefined;
        data["total"] = this.total;
        data["fixProbabilityRate"] = this.fixProbabilityRate;
        data["probability"] = this.probability;
        data["probabilityWeight"] = this.probabilityWeight;
        data["impact"] = this.impact;
        data["fixImpactRate"] = this.fixImpactRate;
        data["impactWeight"] = this.impactWeight;
        data["value"] = this.value;

        return data;
    }
}
