import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete } from '../service-proxies';

@Injectable()
export class TerritorialUnitServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(filter: string | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfTerritorialUnitListDto> {
        let url_ = this.baseUrl + "/api/services/app/TerritorialUnit/GetAll?";
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
                    return <Observable<PagedResultDtoOfTerritorialUnitListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfTerritorialUnitListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfTerritorialUnitListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfTerritorialUnitListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfTerritorialUnitListDto>(<any>null);
    }

    getAllPersons(filter: string | undefined, territorialUnitId: number | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfTerritorialUnitPersonListDto> {
        let url_ = this.baseUrl + "/api/services/app/TerritorialUnit/GetAllPersons?";
        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (territorialUnitId !== undefined)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnitId) + "&";
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
            return this.processGetAllPersons(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllPersons(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfTerritorialUnitPersonListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfTerritorialUnitPersonListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllPersons(response: HttpResponseBase): Observable<PagedResultDtoOfTerritorialUnitPersonListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfTerritorialUnitPersonListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfTerritorialUnitPersonListDto>(<any>null);
    }


    getAllDepartments(filter: string | undefined, territorialUnitId: number | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfTerritorialUnitDepartmentListDto> {
        let url_ = this.baseUrl + "/api/services/app/TerritorialUnit/GetAllDepartments?";
        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (territorialUnitId !== undefined)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnitId) + "&";
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
                    return <Observable<PagedResultDtoOfTerritorialUnitDepartmentListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfTerritorialUnitDepartmentListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllDepartments(response: HttpResponseBase): Observable<PagedResultDtoOfTerritorialUnitDepartmentListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfTerritorialUnitDepartmentListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfTerritorialUnitDepartmentListDto>(<any>null);
    }

    get(id: number): Observable<TerritorialUnitDto> {
        let url_ = this.baseUrl + "/api/services/app/TerritorialUnit/Get?";
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
                    return <Observable<TerritorialUnitDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<TerritorialUnitDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<TerritorialUnitDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = TerritorialUnitDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<TerritorialUnitDto>(<any>null);
    }

    create(item: TerritorialUnitDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/TerritorialUnit/Create";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: item.toJSON(),
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
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

    addDepartment(id: number, departmentId: number): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/TerritorialUnit/AddDepartment";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: JSON.stringify({
                id: id,
                departmentId: departmentId
            }),
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
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

    update(item: TerritorialUnitDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/TerritorialUnit/Update";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: item.toJSON(),
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
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
        let url_ = this.baseUrl + "/api/services/app/TerritorialUnit/Delete?";
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

    deleteDepartmentUnit(id: number): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/TerritorialUnit/DeleteDepartmentUnit?";
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

export interface IPagedResultDtoOfTerritorialUnitPersonListDto {
    totalCount: number;
    items: TerritorialUnitPersonDto[] | undefined;
}

export class PagedResultDtoOfTerritorialUnitPersonListDto implements IPagedResultDtoOfTerritorialUnitPersonListDto {
    totalCount!: number;
    items!: TerritorialUnitPersonDto[] | undefined;

    constructor(data?: IPagedResultDtoOfTerritorialUnitPersonListDto) {
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
                    this.items!.push(TerritorialUnitPersonDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfTerritorialUnitPersonListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfTerritorialUnitPersonListDto();
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

export interface IPagedResultDtoOfTerritorialUnitDepartmentListDto {
    totalCount: number;
    items: TerritorialUnitDeparmentDto[] | undefined;
}

export class PagedResultDtoOfTerritorialUnitDepartmentListDto implements IPagedResultDtoOfTerritorialUnitDepartmentListDto {
    totalCount!: number;
    items!: TerritorialUnitDeparmentDto[] | undefined;

    constructor(data?: IPagedResultDtoOfTerritorialUnitDepartmentListDto) {
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
                    this.items!.push(TerritorialUnitDeparmentDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfTerritorialUnitDepartmentListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfTerritorialUnitDepartmentListDto();
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

export interface IPagedResultDtoOfTerritorialUnitListDto {
    totalCount: number;
    items: TerritorialUnitDto[] | undefined;
}

export class PagedResultDtoOfTerritorialUnitListDto implements IPagedResultDtoOfTerritorialUnitListDto {
    totalCount!: number;
    items!: TerritorialUnitDto[] | undefined;

    constructor(data?: IPagedResultDtoOfTerritorialUnitListDto) {
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
                    this.items!.push(TerritorialUnitDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfTerritorialUnitListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfTerritorialUnitListDto();
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

export interface ITerritorialUnitDto {
    id: number;
    name: string;
    coordinators: TerritorialUnitCoordinatorDto[];
    territorialUnitDepartments: TerritorialUnitDepartmentRelationDto[];
}

export class TerritorialUnitDto implements ITerritorialUnitDto {
    id: number;
    name: string;
    coordinators: TerritorialUnitCoordinatorDto[];
    territorialUnitDepartments: TerritorialUnitDepartmentRelationDto[];

    constructor(data?: ITerritorialUnitDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.coordinators = [];
            this.territorialUnitDepartments = [];
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.name = data["name"];

            if (Array.isArray(data["coordinators"])) {
                this.coordinators = [] as any;
                for (let item of data["coordinators"])
                    this.coordinators!.push(TerritorialUnitCoordinatorDto.fromJS(item));
            }

            if (Array.isArray(data["territorialUnitDepartments"])) {
                this.territorialUnitDepartments = [] as any;
                for (let item of data["territorialUnitDepartments"])
                    this.territorialUnitDepartments!.push(TerritorialUnitDepartmentRelationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): TerritorialUnitDto {
        data = typeof data === 'object' ? data : {};
        let result = new TerritorialUnitDto();
        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["id"] = this.id;
        data["name"] = this.name;

        if (Array.isArray(this.coordinators)) {
            data["coordinators"] = [];
            for (let item of this.coordinators)
                data["coordinators"].push(item.toJSON());
        }

        return data;
    }
}

export interface ITerritorialUnitDepartmentRelationDto {
    id: number;
    department: TerritorialUnitDeparmentDto;
}

export class TerritorialUnitDepartmentRelationDto implements ITerritorialUnitDepartmentRelationDto {
    id: number;
    department: TerritorialUnitDeparmentDto;

    constructor(data?: ITerritorialUnitDepartmentRelationDto) {
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
            this.department = data["department"] ? TerritorialUnitDeparmentDto.fromJS(data["department"]) : <any>undefined;
        }
    }

    static fromJS(data: any): TerritorialUnitDepartmentRelationDto {
        data = typeof data === 'object' ? data : {};
        let result = new TerritorialUnitDepartmentRelationDto();

        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["id"] = this.id;
        data["department"] = this.department ? this.department.toJSON() : <any>undefined;

        return data;
    }
}

export interface ITerritorialUnitDeparmentDto {
    id: number;
    name: string;
}

export class TerritorialUnitDeparmentDto implements ITerritorialUnitDeparmentDto {
    id: number;
    name: string;

    constructor(data?: ITerritorialUnitDeparmentDto) {
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

    static fromJS(data: any): TerritorialUnitDeparmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new TerritorialUnitDeparmentDto();

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

export interface ITerritorialUnitCoordinatorDto {
    id: number;
    person: TerritorialUnitPersonDto;
}

export class TerritorialUnitCoordinatorDto implements ITerritorialUnitCoordinatorDto {
    id: number;
    person: TerritorialUnitPersonDto;

    //readonly
    remove: boolean;
    isHidden: boolean;
    
    constructor(data?: ITerritorialUnitCoordinatorDto) {
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
            this.person = data["person"] ? TerritorialUnitPersonDto.fromJS(data["person"]) : <any>undefined;
        }
    }

    static fromJS(data: any): TerritorialUnitCoordinatorDto {
        data = typeof data === 'object' ? data : {};
        let result = new TerritorialUnitCoordinatorDto();

        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["id"] = this.id;
        data["person"] = this.person ? this.person.toJSON() : <any>undefined;
        data["remove"] = this.remove;

        return data;
    }
}

export interface ITerritorialUnitPersonDto {
    id: number;
    document : string;
    names : string;
    surname: string;
    surname2: string;
    emailAddress: string;
    enabled: boolean;
}

export class TerritorialUnitPersonDto implements ITerritorialUnitPersonDto {
    id: number;
    document : string;
    names : string;
    surname: string;
    surname2: string;
    emailAddress: string;
    enabled: boolean;

    constructor(data?: ITerritorialUnitPersonDto) {
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
            this.document = data["document"];
            this.names = data["names"];
            this.surname = data["surname"];
            this.surname2 = data["surname2"];
            this.emailAddress = data["emailAddress"];
            this.enabled = data["enabled"];
        }
    }

    static fromJS(data: any): TerritorialUnitPersonDto {
        data = typeof data === 'object' ? data : {};
        let result = new TerritorialUnitPersonDto();

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