import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete, EntityDto } from '../service-proxies';
import * as moment from 'moment';
import { DinamicVariableType } from './dinamic-variable-proxie';

@Injectable()
export class StaticVariableServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(filter: string | undefined, family: StaticVariableFamilyType, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfStaticVariableListDto> {
        let url_ = this.baseUrl + "/api/services/app/StaticVariable/GetAll?";
        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (family !== undefined)
            url_ += "Family=" + encodeURIComponent("" + family) + "&";
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
                    return <Observable<PagedResultDtoOfStaticVariableListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfStaticVariableListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfStaticVariableListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfStaticVariableListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfStaticVariableListDto>(<any>null);
    }

    getAllDinamicVariables(filter: string | undefined, type: DinamicVariableType, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfStaticVariableCuantitativeListDto> {
        let url_ = this.baseUrl + "/api/services/app/StaticVariable/GetAllDinamicVariables?";
        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (type !== undefined)
            url_ += "Type=" + encodeURIComponent("" + type) + "&";
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
            return this.processGetAllDinamicVariables(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllDinamicVariables(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfStaticVariableCuantitativeListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfStaticVariableCuantitativeListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllDinamicVariables(response: HttpResponseBase): Observable<PagedResultDtoOfStaticVariableCuantitativeListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfStaticVariableCuantitativeListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfStaticVariableCuantitativeListDto>(<any>null);
    }

    get(id: number): Observable<StaticVariableDto> {
        let url_ = this.baseUrl + "/api/services/app/StaticVariable/Get?";
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
                    return <Observable<StaticVariableDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<StaticVariableDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<StaticVariableDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = StaticVariableDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<StaticVariableDto>(<any>null);
    }

    create(variable: StaticVariableDto): Observable<StaticVariableDto> {
        let url_ = this.baseUrl + "/api/services/app/StaticVariable/Create";

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
            return this.processCreate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(<any>response_);
                } catch (e) {
                    return <Observable<StaticVariableDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<StaticVariableDto>><any>_observableThrow(response_);
        }));
    }

    protected processCreate(response: HttpResponseBase): Observable<StaticVariableDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = StaticVariableDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<StaticVariableDto>(<any>null);
    }

    update(variable: StaticVariableDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/StaticVariable/Update";

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
        let url_ = this.baseUrl + "/api/services/app/StaticVariable/Delete?";
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
        let url_ = this.baseUrl + "/api/services/app/StaticVariable/Enable";

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
        let url_ = this.baseUrl + "/api/services/app/StaticVariable/Disable";

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

export interface IPagedResultDtoOfStaticVariableListDto {
    totalCount: number;
    items: StaticVariableDto[] | undefined;
}

export class PagedResultDtoOfStaticVariableListDto implements IPagedResultDtoOfStaticVariableListDto {
    totalCount!: number;
    items!: StaticVariableDto[] | undefined;

    constructor(data?: IPagedResultDtoOfStaticVariableListDto) {
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
                    this.items!.push(StaticVariableDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfStaticVariableListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfStaticVariableListDto();
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

export interface IPagedResultDtoOfStaticVariableCuantitativeListDto {
    totalCount: number;
    items: StaticVariableCuantitativeDto[] | undefined;
}

export class PagedResultDtoOfStaticVariableCuantitativeListDto implements IPagedResultDtoOfStaticVariableCuantitativeListDto {
    totalCount!: number;
    items!: StaticVariableCuantitativeDto[] | undefined;

    constructor(data?: IPagedResultDtoOfStaticVariableCuantitativeListDto) {
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
                    this.items!.push(StaticVariableCuantitativeDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfStaticVariableCuantitativeListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfStaticVariableCuantitativeListDto();
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

export interface IStaticVariableDto {
    id: number;
    name: string;
    family: StaticVariableFamilyType;
    enabled: boolean;
    weight: number;
    options: StaticVariableOptionDto[];
}

export class StaticVariableDto implements IStaticVariableDto {
    id: number;
    name: string;
    family: StaticVariableFamilyType;
    enabled: boolean;
    weight: number;
    options: StaticVariableOptionDto[];
    deletedOptions: EntityDto[];
    deletedOptionDetails: EntityDto[];

    constructor(data?: IStaticVariableDto) {
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
            this.family = _data["family"];
            this.weight = _data["weight"];
            if (Array.isArray(_data["options"])) {
                this.options = [] as any;
                for (let item of _data["options"])
                    this.options!.push(StaticVariableOptionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): StaticVariableDto {
        data = typeof data === 'object' ? data : {};
        let result = new StaticVariableDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["enabled"] = this.enabled;
        data["family"] = this.family;

        if (Array.isArray(this.options)) {
            data["options"] = [];
            for (let item of this.options)
                data["options"].push(item.toJSON());
        }
        if (Array.isArray(this.deletedOptions)) {
            data["deletedOptions"] = [];
            for (let item of this.deletedOptions)
                data["deletedOptions"].push(item.toJSON());
        }
        if (Array.isArray(this.deletedOptionDetails)) {
            data["deletedOptionDetails"] = [];
            for (let item of this.deletedOptionDetails)
                data["deletedOptionDetails"].push(item.toJSON());
        }

        return data;
    }
}

export interface IStaticVariableOptionDto {
    id: number;
    name: string;
    index: number;
    value: number;
    enabled: boolean;
    type: StaticVariableOptionType;
    site: StaticVariableSiteType;
    dinamicVariable: StaticVariableCuantitativeDto;
    details: StaticVariableOptionDetailDto[];
}

export class StaticVariableOptionDto implements IStaticVariableOptionDto {
    id: number;
    name: string;
    index: number;
    value: number;
    enabled: boolean;
    type: StaticVariableOptionType;
    site: StaticVariableSiteType;
    dinamicVariable: StaticVariableCuantitativeDto;
    details: StaticVariableOptionDetailDto[];

    constructor(data?: IStaticVariableOptionDto) {
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
            this.index = _data["index"];
            this.value = _data["value"];
            this.enabled = _data["enabled"];
            this.type = _data["type"];
            this.site = _data["site"];
            this.dinamicVariable = _data["dinamicVariable"] ? StaticVariableCuantitativeDto.fromJS(_data["dinamicVariable"]) : <any>undefined;

            if (Array.isArray(_data["details"])) {
                this.details = [] as any;
                for (let item of _data["details"])
                    this.details!.push(StaticVariableOptionDetailDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): StaticVariableOptionDto {
        data = typeof data === 'object' ? data : {};
        let result = new StaticVariableOptionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["index"] = this.index;
        data["value"] = this.value;
        data["enabled"] = this.enabled;
        data["type"] = this.type;
        data["site"] = this.site;
        data["dinamicVariable"] = this.dinamicVariable ? this.dinamicVariable.toJSON() : <any>undefined;

        if (Array.isArray(this.details)) {
            data["details"] = [];
            for (let item of this.details)
                data["details"].push(item.toJSON());
        }

        return data;
    }
}

export interface IStaticVariableCuantitativeDto {
    id: number;
    name: string;
    enabled: boolean;
}

export class StaticVariableCuantitativeDto implements IStaticVariableCuantitativeDto {
    id: number;
    name: string;
    enabled: boolean;

    constructor(data?: IStaticVariableCuantitativeDto) {
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
        }
    }

    static fromJS(data: any): StaticVariableCuantitativeDto {
        data = typeof data === 'object' ? data : {};
        let result = new StaticVariableCuantitativeDto();
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

export interface IStaticVariableOptionDetailDto {
    id: number;
    name: string;
    index: number;
    value: number;
}

export class StaticVariableOptionDetailDto implements IStaticVariableOptionDetailDto {
    id: number;
    name: string;
    index: number;
    value: number;

    constructor(data?: IStaticVariableOptionDetailDto) {
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
            this.index = _data["index"];
            this.value = _data["value"];
        }
    }

    static fromJS(data: any): StaticVariableOptionDto {
        data = typeof data === 'object' ? data : {};
        let result = new StaticVariableOptionDto();
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

export enum StaticVariableOptionType {
    None,
    Cualitative,
    Cuantitative
}

export enum StaticVariableFamilyType {
    None,
    ProspectiveRisk,
    ProjectRisk
}

export enum StaticVariableSiteType {
    None,
    Impact,
    Probability
}