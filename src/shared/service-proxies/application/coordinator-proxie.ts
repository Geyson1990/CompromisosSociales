import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete } from '../service-proxies';
import * as moment from 'moment';

@Injectable()
export class CoordinatorServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(filter: string | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfCoordinatorListDto> {
        let url_ = this.baseUrl + "/api/services/app/Coordinator/GetAll?";
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
                    return <Observable<PagedResultDtoOfCoordinatorListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfCoordinatorListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfCoordinatorListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfCoordinatorListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfCoordinatorListDto>(<any>null);
    }

    getAllTerritorialUnits(filter: string | undefined, coordinatorId: number, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfCoordinatorTerritorialUnitListDto> {
        let url_ = this.baseUrl + "/api/services/app/Coordinator/GetAllTerritorialUnits?";
        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (coordinatorId !== undefined)
            url_ += "CoordinatorId=" + encodeURIComponent("" + coordinatorId) + "&";
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
            return this.processGetAllTerritorialUnits(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllTerritorialUnits(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfCoordinatorTerritorialUnitListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfCoordinatorTerritorialUnitListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllTerritorialUnits(response: HttpResponseBase): Observable<PagedResultDtoOfCoordinatorTerritorialUnitListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfCoordinatorTerritorialUnitListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfCoordinatorTerritorialUnitListDto>(<any>null);
    }

    get(id: number): Observable<CoordinatorDto> {
        let url_ = this.baseUrl + "/api/services/app/Coordinator/Get?";
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
                    return <Observable<CoordinatorDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<CoordinatorDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<CoordinatorDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = CoordinatorDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<CoordinatorDto>(<any>null);
    }

    addTerritorialUnit(coordinatorId: number, territorialUnitId: number): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/Coordinator/AddTerritorialUnit";

        const _body: string = JSON.stringify({
            id: coordinatorId,
            territorialUnitId: territorialUnitId
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

    create(variable: CoordinatorDto): Observable<CoordinatorDto> {
        let url_ = this.baseUrl + "/api/services/app/Coordinator/Create";

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
                    return <Observable<CoordinatorDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<CoordinatorDto>><any>_observableThrow(response_);
        }));
    }

    protected processCreate(response: HttpResponseBase): Observable<CoordinatorDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = CoordinatorDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<CoordinatorDto>(<any>null);
    }

    update(variable: CoordinatorDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/Coordinator/Update";

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
        let url_ = this.baseUrl + "/api/services/app/Coordinator/Delete?";
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

    deleteTerritorialUnit(relationId: number): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/Coordinator/DeleteTerritorialUnit?";
        if (relationId === null)
            throw new Error("The parameter 'Id' cannot be null.");
        else if (relationId !== undefined)
            url_ += "Id=" + encodeURIComponent("" + relationId) + "&";

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

export interface IPagedResultDtoOfCoordinatorListDto {
    totalCount: number;
    items: CoordinatorDto[] | undefined;
}

export class PagedResultDtoOfCoordinatorListDto implements IPagedResultDtoOfCoordinatorListDto {
    totalCount!: number;
    items!: CoordinatorDto[] | undefined;

    constructor(data?: IPagedResultDtoOfCoordinatorListDto) {
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
                    this.items!.push(CoordinatorDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfCoordinatorListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfCoordinatorListDto();
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

export interface IPagedResultDtoOfCoordinatorTerritorialUnitListDto {
    totalCount: number;
    items: CoordinatorTerritorialUnitDto[] | undefined;
}

export class PagedResultDtoOfCoordinatorTerritorialUnitListDto implements IPagedResultDtoOfCoordinatorTerritorialUnitListDto {
    totalCount!: number;
    items!: CoordinatorTerritorialUnitDto[] | undefined;

    constructor(data?: IPagedResultDtoOfCoordinatorTerritorialUnitListDto) {
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
                    this.items!.push(CoordinatorTerritorialUnitDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfCoordinatorTerritorialUnitListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfCoordinatorTerritorialUnitListDto();
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

export interface ICoordinatorDto {
    id: number;
    document: string;
    name: string;
    names: string;
    surname: string;
    surname2: string;
    emailAddress: string;
    enabled: boolean;
    territorialUnits: CoordinatorTerritorialUnitRelationDto[];
}

export class CoordinatorDto implements ICoordinatorDto {
    id: number;
    document: string;
    name: string;
    names: string;
    surname: string;
    surname2: string;
    emailAddress: string;
    enabled: boolean;
    territorialUnits: CoordinatorTerritorialUnitRelationDto[];

    constructor(data?: ICoordinatorDto) {
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
            this.names = _data["names"];
            this.surname = _data["surname"];
            this.surname2 = _data["surname2"];
            this.emailAddress = _data["emailAddress"];
            this.enabled = _data["enabled"];
            if (Array.isArray(_data["territorialUnits"])) {
                this.territorialUnits = [] as any;
                for (let item of _data["territorialUnits"])
                    this.territorialUnits!.push(CoordinatorTerritorialUnitRelationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CoordinatorDto {
        data = typeof data === 'object' ? data : {};
        let result = new CoordinatorDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["document"] = this.document;
        data["names"] = this.names;
        data["surname"] = this.surname;
        data["surname2"] = this.surname2;
        data["emailAddress"] = this.emailAddress;
        data["enabled"] = this.enabled;

        return data;
    }
}



export interface ICoordinatorTerritorialUnitRelationDto {
    id: number;
    territorialUnit: CoordinatorTerritorialUnitDto;
}

export class CoordinatorTerritorialUnitRelationDto implements ICoordinatorTerritorialUnitRelationDto {
    id: number;
    territorialUnit: CoordinatorTerritorialUnitDto;

    constructor(data?: ICoordinatorTerritorialUnitRelationDto) {
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
            this.territorialUnit = data["territorialUnit"] ? CoordinatorTerritorialUnitDto.fromJS(data["territorialUnit"]) : <any>undefined;
        }
    }

    static fromJS(data: any): CoordinatorTerritorialUnitRelationDto {
        data = typeof data === 'object' ? data : {};
        let result = new CoordinatorTerritorialUnitRelationDto();

        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["territorialUnit"] = this.territorialUnit ? this.territorialUnit.toJSON() : <any>undefined;

        return data;
    }
}

export interface ICoordinatorTerritorialUnitDto {
    id: number;
    name: string;
}

export class CoordinatorTerritorialUnitDto implements ICoordinatorTerritorialUnitDto {
    id: number;
    name: string;

    constructor(data?: ICoordinatorTerritorialUnitDto) {
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

    static fromJS(data: any): CoordinatorTerritorialUnitDto {
        data = typeof data === 'object' ? data : {};
        let result = new CoordinatorTerritorialUnitDto();
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