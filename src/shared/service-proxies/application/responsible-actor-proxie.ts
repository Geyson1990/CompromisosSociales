import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete } from '../service-proxies';

@Injectable()
export class ResponsibleActorServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(filter: string | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfResponsibleActorListDto> {
        let url_ = this.baseUrl + "/api/services/app/ResponsibleActor/GetAllResponsibleActors?";
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
                    return <Observable<PagedResultDtoOfResponsibleActorListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfResponsibleActorListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfResponsibleActorListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfResponsibleActorListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfResponsibleActorListDto>(<any>null);
    }

    get(id: number): Observable<ResponsibleActorGetDataDto> {
        let url_ = this.baseUrl + "/api/services/app/ResponsibleActor/GetResponsibleActor?";
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
                    return <Observable<ResponsibleActorGetDataDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<ResponsibleActorGetDataDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<ResponsibleActorGetDataDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = ResponsibleActorGetDataDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<ResponsibleActorGetDataDto>(<any>null);
    }

    create(item: ResponsibleActorDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/ResponsibleActor/CreateResponsibleActor";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: item.toJSON(),
            headers: new HttpHeaders({
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

    update(item: ResponsibleActorDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/ResponsibleActor/UpdateResponsibleActor";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: item.toJSON(),
            headers: new HttpHeaders({
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
        let url_ = this.baseUrl + "/api/services/app/ResponsibleActor/DeleteResponsibleAction?";
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

    getResponsibleSubActor(id: number): Observable<ResponsibleSubActorDto> {
        let url_ = this.baseUrl + "/api/services/app/ResponsibleActor/GetResponsibleSubActor?";
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
            return this.processGetResponsibleSubActor(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetResponsibleSubActor(<any>response_);
                } catch (e) {
                    return <Observable<ResponsibleSubActorDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<ResponsibleSubActorDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetResponsibleSubActor(response: HttpResponseBase): Observable<ResponsibleSubActorDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = ResponsibleSubActorDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<ResponsibleSubActorDto>(<any>null);
    }

    createResponsibleSubActor(item: ResponsibleSubActorDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/ResponsibleActor/CreateResponsibleSubActor";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: item.toJSON(),
            headers: new HttpHeaders({
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

    updateResponsibleSubActor(item: ResponsibleSubActorDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/ResponsibleActor/UpdateResponsibleSubActor";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: item.toJSON(),
            headers: new HttpHeaders({
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

    deleteResponsibleSubActor(id: number): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/ResponsibleActor/DeleteResponsibleSubActor?";
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

export interface IPagedResultDtoOfResponsibleActorListDto {
    totalCount: number;
    items: ResponsibleActorDto[] | undefined;
}

export class PagedResultDtoOfResponsibleActorListDto implements IPagedResultDtoOfResponsibleActorListDto {
    totalCount!: number;
    items!: ResponsibleActorDto[] | undefined;

    constructor(data?: IPagedResultDtoOfResponsibleActorListDto) {
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
                    this.items!.push(ResponsibleActorDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfResponsibleActorListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfResponsibleActorListDto();
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

export interface IResponsibleActorGetDataDto {
    responsibleActor: ResponsibleActorDto;
    types: ResponsibleActorTypeDto[];
}

export class ResponsibleActorGetDataDto implements IResponsibleActorGetDataDto {
    responsibleActor: ResponsibleActorDto;
    types: ResponsibleActorTypeDto[];

    constructor(data?: IResponsibleActorGetDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.responsibleActor = data["responsibleActor"] ? ResponsibleActorDto.fromJS(data["responsibleActor"]) : <any>undefined;

            if (Array.isArray(data["types"])) {
                this.types = [] as any;
                for (let item of data["types"])
                    this.types!.push(ResponsibleActorTypeDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ResponsibleActorGetDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponsibleActorGetDataDto();
        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["responsibleActor"] = this.responsibleActor ? this.responsibleActor.toJSON() : <any>undefined;

        if (Array.isArray(this.types)) {
            data["types"] = [];
            for (let item of this.types)
                data["types"].push(item.toJSON());
        }

        return data;
    }
}

export interface IResponsibleActorDto {
    id: number;
    name: string;
    responsibleType: ResponsibleActorTypeDto;
    responsibleSubType: ResponsibleActorSubTypeDto;
    responsibleSubActors: ResponsibleSubActorDto[];
}

export class ResponsibleActorDto implements IResponsibleActorDto {
    id: number;
    name: string;
    responsibleType: ResponsibleActorTypeDto;
    responsibleSubType: ResponsibleActorSubTypeDto;
    responsibleSubActors: ResponsibleSubActorDto[];

    constructor(data?: IResponsibleActorDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.responsibleType = new ResponsibleActorTypeDto({
                id: -1,
                name: undefined,
                subTypes: []
            });
            this.responsibleSubType = new ResponsibleActorSubTypeDto({
                id: -1,
                name: undefined
            });
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.name = data["name"];
            this.responsibleType = data["responsibleType"] ? ResponsibleActorTypeDto.fromJS(data["responsibleType"]) : new ResponsibleActorTypeDto({
                id: -1,
                name: undefined,
                subTypes: []
            });
            this.responsibleSubType = data["responsibleSubType"] ? ResponsibleActorSubTypeDto.fromJS(data["responsibleSubType"]) : new ResponsibleActorSubTypeDto({
                id: -1,
                name: undefined
            });

            if (Array.isArray(data["responsibleSubActors"])) {
                this.responsibleSubActors = [] as any;
                for (let item of data["responsibleSubActors"])
                    this.responsibleSubActors!.push(ResponsibleSubActorDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ResponsibleActorDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponsibleActorDto();
        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["id"] = this.id;
        data["name"] = this.name;
        data["responsibleType"] = this.responsibleType ? this.responsibleType.toJSON() : <any>undefined;
        data["responsibleSubType"] = this.responsibleSubType ? this.responsibleSubType.toJSON() : <any>undefined;

        if (Array.isArray(this.responsibleSubActors)) {
            data["responsibleSubActors"] = [];
            for (let item of this.responsibleSubActors)
                data["responsibleSubActors"].push(item.toJSON());
        }

        return data;
    }
}

export interface IResponsibleSubActorDto {
    id: number;
    name: string;
    responsibleActorId: number;
}

export class ResponsibleSubActorDto implements IResponsibleSubActorDto {
    id: number;
    name: string;
    responsibleActorId: number;

    constructor(data?: IResponsibleSubActorDto) {
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

    static fromJS(data: any): ResponsibleSubActorDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponsibleSubActorDto();

        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["id"] = this.id;
        data["name"] = this.name;
        data["responsibleActorId"] = this.responsibleActorId;

        return data;
    }
}

export interface IResponsibleActorTypeDto {
    id: number;
    name: string;
    subTypes: ResponsibleActorSubTypeDto[];
}

export class ResponsibleActorTypeDto implements IResponsibleActorTypeDto {
    id: number;
    name: string;
    subTypes: ResponsibleActorSubTypeDto[];

    constructor(data?: IResponsibleActorTypeDto) {
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
            if (Array.isArray(data["subTypes"])) {
                this.subTypes = [] as any;
                for (let item of data["subTypes"])
                    this.subTypes!.push(ResponsibleActorSubTypeDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ResponsibleActorTypeDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponsibleActorTypeDto();
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

export interface IResponsibleActorSubTypeDto {
    id: number;
    name: string;
}

export class ResponsibleActorSubTypeDto implements IResponsibleActorSubTypeDto {
    id: number;
    name: string;

    constructor(data?: IResponsibleActorSubTypeDto) {
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

    static fromJS(data: any): ResponsibleActorSubTypeDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResponsibleActorSubTypeDto();

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

export enum ResponsibleActorType {
    None,
    National,
    Regional,
    Local,
    Other
}