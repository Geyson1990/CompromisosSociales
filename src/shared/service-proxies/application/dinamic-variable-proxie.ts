import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete, EntityDto } from '../service-proxies';

@Injectable()
export class DinamicVariableServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(filter: string | undefined, type: DinamicVariableType, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfDinamicVariableListDto> {
        let url_ = this.baseUrl + "/api/services/app/DinamicVariable/GetAll?";
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
            return this.processGetAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfDinamicVariableListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfDinamicVariableListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfDinamicVariableListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfDinamicVariableListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfDinamicVariableListDto>(<any>null);
    }

    getAllDetails(filter: string | undefined, dinamicVariableId: number | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfDinamicVariableDetailListDto> {
        let url_ = this.baseUrl + "/api/services/app/DinamicVariable/GetAllDetails?";
        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (dinamicVariableId !== undefined)
            url_ += "DinamicVariableId=" + encodeURIComponent("" + dinamicVariableId) + "&";
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
            return this.processGetAllDetails(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllDetails(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfDinamicVariableDetailListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfDinamicVariableDetailListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllDetails(response: HttpResponseBase): Observable<PagedResultDtoOfDinamicVariableDetailListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfDinamicVariableDetailListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfDinamicVariableDetailListDto>(<any>null);
    }


    get(id: number): Observable<DinamicVariableDto> {
        let url_ = this.baseUrl + "/api/services/app/DinamicVariable/Get?";
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
                    return <Observable<DinamicVariableDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<DinamicVariableDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<DinamicVariableDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = DinamicVariableDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<DinamicVariableDto>(<any>null);
    }

    create(variable: DinamicVariableDto, changes: DinamicVariableDetailDto[]): Observable<EntityDto> {
        let url_ = this.baseUrl + "/api/services/app/DinamicVariable/Create";

        const _body: string = JSON.stringify({
            variable: variable,
            changes: changes
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

    update(variable: DinamicVariableDto, changes: DinamicVariableDetailDto[]): Observable<EntityDto> {
        let url_ = this.baseUrl + "/api/services/app/DinamicVariable/Update";

        const _body: string = JSON.stringify({
            variable: variable,
            changes: changes
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

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processUpdate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processUpdate(<any>response_);
                } catch (e) {
                    return <Observable<EntityDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<EntityDto>><any>_observableThrow(response_);
        }));
    }

    protected processUpdate(response: HttpResponseBase): Observable<EntityDto> {
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
        let url_ = this.baseUrl + "/api/services/app/DinamicVariable/Delete?";
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
        let url_ = this.baseUrl + "/api/services/app/DinamicVariable/Enable";

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
        let url_ = this.baseUrl + "/api/services/app/DinamicVariable/Disable";

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

export interface IPagedResultDtoOfDinamicVariableListDto {
    totalCount: number;
    items: DinamicVariableDto[] | undefined;
}

export class PagedResultDtoOfDinamicVariableListDto implements IPagedResultDtoOfDinamicVariableListDto {
    totalCount!: number;
    items!: DinamicVariableDto[] | undefined;

    constructor(data?: IPagedResultDtoOfDinamicVariableListDto) {
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
                    this.items!.push(DinamicVariableDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfDinamicVariableListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfDinamicVariableListDto();
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

export interface IPagedResultDtoOfDinamicVariableDetailListDto {
    totalCount: number;
    items: DinamicVariableDetailDto[] | undefined;
}

export class PagedResultDtoOfDinamicVariableDetailListDto implements IPagedResultDtoOfDinamicVariableDetailListDto {
    totalCount!: number;
    items!: DinamicVariableDetailDto[] | undefined;

    constructor(data?: IPagedResultDtoOfDinamicVariableDetailListDto) {
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
                    this.items!.push(DinamicVariableDetailDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfDinamicVariableDetailListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfDinamicVariableDetailListDto();
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

export interface IDinamicVariableDto {
    id: number;
    name: string;
    enabled: boolean;
    type: DinamicVariableType;
}

export class DinamicVariableDto implements IDinamicVariableDto {
    id: number;
    name: string;
    enabled: boolean;
    type: DinamicVariableType;

    constructor(data?: IDinamicVariableDto) {
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

    static fromJS(data: any): DinamicVariableDto {
        data = typeof data === 'object' ? data : {};
        let result = new DinamicVariableDto();
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

export interface IDinamicVariableDetailDto {
    id: number;
    dinamicVariableId: number;
    value: number;
    department: DinamicVariableDepartmentDto;
    province: DinamicVariableProvinceDto;
    territorialUnits: DinamicVariableTerritorialUnitDto[];
}

export class DinamicVariableDetailDto implements IDinamicVariableDetailDto {
    id: number;
    dinamicVariableId: number;
    value: number;
    territorialUnitText: string;
    department: DinamicVariableDepartmentDto;
    province: DinamicVariableProvinceDto;
    territorialUnits: DinamicVariableTerritorialUnitDto[];

    constructor(data?: IDinamicVariableDetailDto) {
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
            this.dinamicVariableId = _data["dinamicVariableId"];
            this.value = _data["value"];
            this.department = _data["department"] ? DinamicVariableDepartmentDto.fromJS(_data["department"]) : <any>undefined;
            this.province = _data["province"] ? DinamicVariableProvinceDto.fromJS(_data["province"]) : <any>undefined;
            if (Array.isArray(_data["territorialUnits"])) {
                this.territorialUnits = [] as any;
                for (let item of _data["territorialUnits"])
                    this.territorialUnits!.push(DinamicVariableTerritorialUnitDto.fromJS(item));
                this.territorialUnitText = this.territorialUnits.map(p => p.name).join(', ');
            }
        }
    }

    static fromJS(data: any): DinamicVariableDetailDto {
        data = typeof data === 'object' ? data : {};
        let result = new DinamicVariableDetailDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["dinamicVariableId"] = this.dinamicVariableId;
        data["value"] = this.value;
        data["province"] = this.province ? this.province.toJSON() : <any>undefined;

        return data;
    }
}

export interface IDinamicVariableDepartmentDto {
    id: number;
    name: string;
}

export class DinamicVariableDepartmentDto implements IDinamicVariableDepartmentDto {
    id: number;
    name: string;

    constructor(data?: IDinamicVariableDepartmentDto) {
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

    static fromJS(data: any): DinamicVariableDepartmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new DinamicVariableDepartmentDto();
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

export interface IDinamicVariableProvinceDto {
    id: number;
    name: string;
}

export class DinamicVariableProvinceDto implements IDinamicVariableProvinceDto {
    id: number;
    name: string;

    constructor(data?: IDinamicVariableProvinceDto) {
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

    static fromJS(data: any): DinamicVariableProvinceDto {
        data = typeof data === 'object' ? data : {};
        let result = new DinamicVariableProvinceDto();
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

export interface IDinamicVariableTerritorialUnitDto {
    id: number;
    name: string;
}

export class DinamicVariableTerritorialUnitDto implements IDinamicVariableTerritorialUnitDto {
    id: number;
    name: string;

    constructor(data?: IDinamicVariableTerritorialUnitDto) {
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

    static fromJS(data: any): DinamicVariableTerritorialUnitDto {
        data = typeof data === 'object' ? data : {};
        let result = new DinamicVariableTerritorialUnitDto();
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

export enum DinamicVariableType {
    None,
    ProspectiveRisk,
    ProjectRisk
}