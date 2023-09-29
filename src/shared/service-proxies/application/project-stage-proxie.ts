import { StaticVariableType } from "./prospective-risk-proxie";
import { StaticVariableFamilyType, StaticVariableSiteType } from "./static-variable-proxie";
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete } from '../service-proxies';

@Injectable()
export class ProjectStageServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(filter: string | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfProjectStageListDto> {
        let url_ = this.baseUrl + "/api/services/app/ProjectStage/GetAll?";
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
                    return <Observable<PagedResultDtoOfProjectStageListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfProjectStageListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfProjectStageListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfProjectStageListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfProjectStageListDto>(<any>null);
    }

    getAllStaticVariables(filter: string | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfProjectStageStaticVariableListDto> {
        let url_ = this.baseUrl + "/api/services/app/ProjectStage/GetAllStaticVariables?";
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
            return this.processGetAllStaticVariables(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllStaticVariables(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfProjectStageStaticVariableListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfProjectStageStaticVariableListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllStaticVariables(response: HttpResponseBase): Observable<PagedResultDtoOfProjectStageStaticVariableListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfProjectStageStaticVariableListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfProjectStageStaticVariableListDto>(<any>null);
    }

    get(id: number): Observable<ProjectStageDto> {
        let url_ = this.baseUrl + "/api/services/app/ProjectStage/Get?";
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
                    return <Observable<ProjectStageDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<ProjectStageDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<ProjectStageDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = ProjectStageDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<ProjectStageDto>(<any>null);
    }

    create(projectStageDto: ProjectStageDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/ProjectStage/Create";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: projectStageDto.toJSON(),
            headers: new HttpHeaders({
                "Accept": "text/plain",
                "Content-Type": "application/json-patch+json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
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

    update(projectStageDto: ProjectStageDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/ProjectStage/Update";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: projectStageDto.toJSON(),
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
        let url_ = this.baseUrl + "/api/services/app/ProjectStage/Delete?";
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

    enable(id: number): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/ProjectStage/Enable";

        const _body: string = JSON.stringify({
            id: id
        });

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: _body,
            headers: new HttpHeaders({
                "Accept": "text/plain",
                "Content-Type": "application/json-patch+json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
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

    disable(id: number): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/ProjectStage/Disable";

        const _body: string = JSON.stringify({
            id: id
        });

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: _body,
            headers: new HttpHeaders({
                "Accept": "text/plain",
                "Content-Type": "application/json-patch+json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
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

export interface IPagedResultDtoOfProjectStageListDto {
    totalCount: number;
    items: ProjectStageDto[] | undefined;
}

export class PagedResultDtoOfProjectStageListDto implements IPagedResultDtoOfProjectStageListDto {
    totalCount!: number;
    items!: ProjectStageDto[] | undefined;

    constructor(data?: IPagedResultDtoOfProjectStageListDto) {
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
                    this.items!.push(ProjectStageDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfProjectStageListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfProjectStageListDto();
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

export interface IPagedResultDtoOfProjectStageStaticVariableListDto {
    totalCount: number;
    items: ProjectStageStaticVariableDto[] | undefined;
}

export class PagedResultDtoOfProjectStageStaticVariableListDto implements IPagedResultDtoOfProjectStageStaticVariableListDto {
    totalCount!: number;
    items!: ProjectStageStaticVariableDto[] | undefined;

    constructor(data?: IPagedResultDtoOfProjectStageStaticVariableListDto) {
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
                    this.items!.push(ProjectStageStaticVariableDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfProjectStageStaticVariableListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfProjectStageStaticVariableListDto();
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

export interface IProjectStageDto {
    id: number;
    name: string;
    index: number;
    enabled: boolean;
    details: ProjectStageDetailDto[];
}

export class ProjectStageDto implements IProjectStageDto {
    id: number;
    name: string;
    index: number;
    enabled: boolean;
    details: ProjectStageDetailDto[];
    deletedDetails: ProjectStageDetailDto[];

    constructor(data?: IProjectStageDto) {
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
            this.enabled = data["enabled"];

            if (Array.isArray(data["details"])) {
                this.details = [] as any;
                for (let item of data["details"])
                    this.details!.push(ProjectStageDetailDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ProjectStageDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectStageDto();
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
        if (Array.isArray(this.deletedDetails)) {
            data["deletedDetails"] = [];
            for (let item of this.deletedDetails)
                data["deletedDetails"].push(item.toJSON());
        }

        return data;
    }
}

export interface IProjectStageDetailDto {
    id: number;
    staticVariable: ProjectStageStaticVariableDto;
}

export class ProjectStageDetailDto implements IProjectStageDetailDto {
    id: number;
    staticVariable: ProjectStageStaticVariableDto;

    constructor(data?: IProjectStageDetailDto) {
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
            this.staticVariable = data["staticVariable"] ? ProjectStageStaticVariableDto.fromJS(data["staticVariable"]) : <any>undefined;
        }
    }

    static fromJS(data: any): ProjectStageDetailDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectStageDetailDto();
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

export interface IProjectStageStaticVariableDto {
    id: number;
    name: string;
    family: StaticVariableFamilyType;
    enabled: boolean;
    options: ProjectStageStaticVariableOptionDto[];
}

export class ProjectStageStaticVariableDto implements IProjectStageStaticVariableDto {
    id: number;
    name: string;
    family: StaticVariableFamilyType;
    enabled: boolean;
    options: ProjectStageStaticVariableOptionDto[];

    constructor(data?: IProjectStageStaticVariableDto) {
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
            this.family = data["family"];
            this.enabled = data["enabled"];

            if (Array.isArray(data["options"])) {
                this.options = [] as any;
                for (let item of data["options"])
                    this.options!.push(ProjectStageStaticVariableOptionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ProjectStageStaticVariableDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectStageStaticVariableDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;

        return data;
    }
}

export interface IProjectStageStaticVariableOptionDto {
    id: number;
    name: string;
    index: number;
    enabled: boolean;
    type: StaticVariableType;
    site: StaticVariableSiteType;
    value: number;
    dinamicVariable: ProjectStageDinamicVariableDto;
}

export class ProjectStageStaticVariableOptionDto implements IProjectStageStaticVariableOptionDto {
    id: number;
    name: string;
    index: number;
    enabled: boolean;
    type: StaticVariableType;
    site: StaticVariableSiteType;
    value: number;
    dinamicVariable: ProjectStageDinamicVariableDto;

    constructor(data?: IProjectStageStaticVariableOptionDto) {
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
            this.enabled = data["enabled"];
            this.type = data["type"];
            this.site = data["site"];
            this.value = data["value"];
            this.dinamicVariable = data["dinamicVariable"] ? ProjectStageDinamicVariableDto.fromJS(data["dinamicVariable"]) : <any>undefined;
        }
    }

    static fromJS(data: any): ProjectStageStaticVariableOptionDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectStageStaticVariableOptionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["index"] = this.index;
        data["enabled"] = this.enabled;
        data["type"] = this.type;
        data["site"] = this.site;
        data["value"] = this.value;
        data["dinamicVariable"] = this.dinamicVariable ? this.dinamicVariable.toJSON() : <any>undefined;

        return data;
    }
}

export interface IProjectStageDinamicVariableDto {
    id: number;
    name: string;
}

export class ProjectStageDinamicVariableDto implements IProjectStageDinamicVariableDto {
    id: number;
    name: string;

    constructor(data?: IProjectStageDinamicVariableDto) {
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

    static fromJS(data: any): ProjectStageDinamicVariableDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectStageDinamicVariableDto();
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