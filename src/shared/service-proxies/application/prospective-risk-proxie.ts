import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete } from '../service-proxies';
import * as moment from 'moment';

@Injectable()
export class ProspectiveRiskServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(filter: string | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfProspectiveRiskListDto> {
        let url_ = this.baseUrl + "/api/services/app/ProspectiveRisk/GetAll?";
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
                    return <Observable<PagedResultDtoOfProspectiveRiskListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfProspectiveRiskListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfProspectiveRiskListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfProspectiveRiskListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfProspectiveRiskListDto>(<any>null);
    }

    getAllHistories(prospectiveRiskHistoryId: number, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfProspectiveRiskHistoryListDto> {
        let url_ = this.baseUrl + "/api/services/app/ProspectiveRisk/GetAllHistories?";
        if (prospectiveRiskHistoryId !== undefined)
            url_ += "ProspectiveRiskHistoryId=" + encodeURIComponent("" + prospectiveRiskHistoryId) + "&";
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
                    return <Observable<PagedResultDtoOfProspectiveRiskHistoryListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfProspectiveRiskHistoryListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllHistories(response: HttpResponseBase): Observable<PagedResultDtoOfProspectiveRiskHistoryListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfProspectiveRiskHistoryListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfProspectiveRiskHistoryListDto>(<any>null);
    }

    get(id: number): Observable<ProspectiveRiskDto> {
        let url_ = this.baseUrl + "/api/services/app/ProspectiveRisk/Get?";
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
                    return <Observable<ProspectiveRiskDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<ProspectiveRiskDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<ProspectiveRiskDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = ProspectiveRiskDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<ProspectiveRiskDto>(<any>null);
    }

    getHistory(id: number): Observable<ProspectiveRiskHistoryDto> {
        let url_ = this.baseUrl + "/api/services/app/ProspectiveRisk/GetHistory?";
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
                    return <Observable<ProspectiveRiskHistoryDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<ProspectiveRiskHistoryDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetHistory(response: HttpResponseBase): Observable<ProspectiveRiskHistoryDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = ProspectiveRiskHistoryDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<ProspectiveRiskHistoryDto>(<any>null);
    }

    deleteHistory(id: number): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/ProspectiveRisk/DeleteHistory?";
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

    process(): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/ProspectiveRisk/Process";

        let options_: any = {
            observe: "response",
            responseType: "blob",
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

    createOrUpdate(item: ProspectiveRiskDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/ProspectiveRisk/CreateOrUpdate";

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
}

export interface IPagedResultDtoOfProspectiveRiskListDto {
    totalCount: number;
    items: ProspectiveRiskDto[] | undefined;
}

export class PagedResultDtoOfProspectiveRiskListDto implements IPagedResultDtoOfProspectiveRiskListDto {
    totalCount!: number;
    items!: ProspectiveRiskDto[] | undefined;

    constructor(data?: IPagedResultDtoOfProspectiveRiskListDto) {
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
                    this.items!.push(ProspectiveRiskDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfProspectiveRiskListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfProspectiveRiskListDto();
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

export interface IPagedResultDtoOfProspectiveRiskHistoryListDto {
    totalCount: number;
    items: ProspectiveRiskHistoryDto[] | undefined;
}

export class PagedResultDtoOfProspectiveRiskHistoryListDto implements IPagedResultDtoOfProspectiveRiskHistoryListDto {
    totalCount!: number;
    items!: ProspectiveRiskHistoryDto[] | undefined;

    constructor(data?: IPagedResultDtoOfProspectiveRiskHistoryListDto) {
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
                    this.items!.push(ProspectiveRiskHistoryDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfProspectiveRiskHistoryListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfProspectiveRiskHistoryListDto();
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

export interface IProspectiveRiskDto {
    id: number;
    creationTime: moment.Moment;
    creationUser: ProspectiveRiskUserDto;
    lastModificationTime: moment.Moment;
    editionUser: ProspectiveRiskUserDto;
    fixRate: number;
    value: number;
    evaluatedTime: moment.Moment;
    department: ProspectiveRiskDepartmentDto;
    province: ProspectiveRiskProvinceDto;
    territorialUnits: ProspectiveRiskTerritorialUnitDto[];
    variables: ProspectiveRiskStaticVariableDto[];
    details: ProspectiveRiskDetailGetDto[];
}

export class ProspectiveRiskDto implements IProspectiveRiskDto {
    id: number;
    creationTime: moment.Moment;
    creationUser: ProspectiveRiskUserDto;
    lastModificationTime: moment.Moment;
    editionUser: ProspectiveRiskUserDto;
    fixRate: number;
    value: number;
    evaluatedTime: moment.Moment;
    department: ProspectiveRiskDepartmentDto;
    province: ProspectiveRiskProvinceDto;
    territorialUnits: ProspectiveRiskTerritorialUnitDto[];
    variables: ProspectiveRiskStaticVariableDto[];
    details: ProspectiveRiskDetailGetDto[];
    territorialUnitText: string;

    constructor(data?: IProspectiveRiskDto) {
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
            this.creationTime = _data["creationTime"] ? moment(_data["creationTime"]) : <any>undefined;
            this.lastModificationTime = _data["lastModificationTime"] ? moment(_data["lastModificationTime"]) : <any>undefined;
            this.creationUser = _data["creationUser"] ? ProspectiveRiskUserDto.fromJS(_data["creationUser"]) : <any>undefined;
            this.editionUser = _data["editionUser"] ? ProspectiveRiskUserDto.fromJS(_data["editionUser"]) : <any>undefined;
            this.evaluatedTime = _data["evaluatedTime"] ? moment(_data["evaluatedTime"]) : <any>undefined;
            this.fixRate = _data["fixRate"];
            this.value = _data["value"];
            this.department = _data["department"] ? ProspectiveRiskDepartmentDto.fromJS(_data["department"]) : <any>undefined;
            this.province = _data["province"] ? ProspectiveRiskProvinceDto.fromJS(_data["province"]) : <any>undefined;
            if (Array.isArray(_data["territorialUnits"])) {
                this.territorialUnits = [] as any;
                for (let item of _data["territorialUnits"])
                    this.territorialUnits!.push(ProspectiveRiskTerritorialUnitDto.fromJS(item));

                this.territorialUnitText = this.territorialUnits.map(p => p.name).join(', ');
            }
            if (Array.isArray(_data["variables"])) {
                this.variables = [] as any;
                for (let item of _data["variables"])
                    this.variables!.push(ProspectiveRiskStaticVariableDto.fromJS(item));
            }
            if (Array.isArray(_data["details"])) {
                this.details = [] as any;
                for (let item of _data["details"])
                    this.details!.push(ProspectiveRiskDetailGetDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ProspectiveRiskDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProspectiveRiskDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        //data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : <any>undefined;
        //data["value"] = this.value;
        //data["department"] = this.department ? this.department.toJSON() : <any>undefined;
        data["province"] = this.province ? this.province.toJSON() : <any>undefined;
        data["fixRate"] = this.fixRate;
        data["evaluatedTime"] = this.evaluatedTime;
        //if (Array.isArray(this.territorialUnits)) {
        //    data["territorialUnits"] = [];
        //    for (let item of this.territorialUnits)
        //        data["territorialUnits"].push(item.toJSON());
        //}
        //if (Array.isArray(this.variables)) {
        //    data["variables"] = [];
        //    for (let item of this.variables)
        //        data["variables"].push(item.toJSON());
        //}
        if (Array.isArray(this.details)) {
            data["details"] = [];
            for (let item of this.details)
                data["details"].push(item.toJSON());
        }

        return data;
    }
}

export interface IProspectiveRiskDepartmentDto {
    id: number;
    name: string;
}

export class ProspectiveRiskDepartmentDto implements IProspectiveRiskDepartmentDto {
    id: number;
    name: string;

    constructor(data?: IProspectiveRiskDepartmentDto) {
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

    static fromJS(data: any): ProspectiveRiskDepartmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProspectiveRiskDepartmentDto();
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

export interface IProspectiveRiskProvinceDto {
    id: number;
    name: string;
}

export class ProspectiveRiskProvinceDto implements IProspectiveRiskProvinceDto {
    id: number;
    name: string;

    constructor(data?: IProspectiveRiskProvinceDto) {
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

    static fromJS(data: any): ProspectiveRiskProvinceDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProspectiveRiskProvinceDto();
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

export interface IProspectiveRiskTerritorialUnitDto {
    id: number;
    name: string;
}

export class ProspectiveRiskTerritorialUnitDto implements IProspectiveRiskTerritorialUnitDto {
    id: number;
    name: string;

    constructor(data?: IProspectiveRiskTerritorialUnitDto) {
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

    static fromJS(data: any): ProspectiveRiskTerritorialUnitDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProspectiveRiskTerritorialUnitDto();
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

export interface IProspectiveRiskStaticVariableDto {
    id: number;
    name: string;
    enabled: boolean;
    options: ProspectiveRiskStaticVariableOptionDto[];
}

export class ProspectiveRiskStaticVariableDto implements IProspectiveRiskStaticVariableDto {
    id: number;
    name: string;
    enabled: boolean;
    options: ProspectiveRiskStaticVariableOptionDto[];

    constructor(data?: IProspectiveRiskStaticVariableDto) {
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

            if (Array.isArray(_data["options"])) {
                this.options = [] as any;
                for (let item of _data["options"])
                    this.options!.push(ProspectiveRiskStaticVariableOptionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ProspectiveRiskStaticVariableDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProspectiveRiskStaticVariableDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["enabled"] = this.enabled;

        if (Array.isArray(this.options)) {
            data["options"] = [];
            for (let item of this.options)
                data["options"].push(item.toJSON());
        }

        return data;
    }
}

export interface IProspectiveRiskStaticVariableOptionDto {
    id: number;
    name: string;
    index: number;
    enabled: boolean;
    type: StaticVariableType;
    value: number;
    dinamicVariable: ProspectiveRiskDinamicVariableDto;
    details: ProspectiveRiskStaticVariableOptionDetailDto[];
    relationId: number;
}

export class ProspectiveRiskStaticVariableOptionDto implements IProspectiveRiskStaticVariableOptionDto {
    id: number;
    name: string;
    index: number;
    enabled: boolean;
    type: StaticVariableType;
    value: number;
    dinamicVariable: ProspectiveRiskDinamicVariableDto;
    details: ProspectiveRiskStaticVariableOptionDetailDto[];

    //Read Only
    relationId: number;
    relationValue: number;

    constructor(data?: IProspectiveRiskStaticVariableOptionDto) {
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
            this.enabled = _data["enabled"];
            this.type = _data["type"];
            this.value = _data["value"];
            this.dinamicVariable = _data["dinamicVariable"] ? ProspectiveRiskDinamicVariableDto.fromJS(_data["dinamicVariable"]) : <any>undefined;

            if (Array.isArray(_data["details"])) {
                this.details = [] as any;
                for (let item of _data["details"])
                    this.details!.push(ProspectiveRiskStaticVariableOptionDetailDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ProspectiveRiskStaticVariableOptionDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProspectiveRiskStaticVariableOptionDto();
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

export interface IProspectiveRiskDinamicVariableDto {
    id: number;
    name: string;
}

export class ProspectiveRiskDinamicVariableDto implements IProspectiveRiskDinamicVariableDto {
    id: number;
    name: string;

    constructor(data?: IProspectiveRiskDinamicVariableDto) {
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

    static fromJS(data: any): ProspectiveRiskDinamicVariableDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProspectiveRiskDinamicVariableDto();
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

export interface IProspectiveRiskStaticVariableOptionDetailDto {
    id: number;
    name: string;
    index: number;
    value: number;
}

export class ProspectiveRiskStaticVariableOptionDetailDto implements IProspectiveRiskStaticVariableOptionDetailDto {
    id: number;
    name: string;
    index: number;
    value: number;

    constructor(data?: IProspectiveRiskStaticVariableOptionDetailDto) {
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

    static fromJS(data: any): ProspectiveRiskStaticVariableOptionDetailDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProspectiveRiskStaticVariableOptionDetailDto();
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

export interface IProspectiveRiskDetailGetDto {
    id: number;
    staticVariableOptionId: number;
    value: number;
}

export class ProspectiveRiskDetailGetDto implements IProspectiveRiskDetailGetDto {
    id: number;
    staticVariableOptionId: number;
    value: number;

    constructor(data?: IProspectiveRiskDetailGetDto) {
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
            this.staticVariableOptionId = _data["staticVariableOptionId"];
            this.value = _data["value"];
        }
    }

    static fromJS(data: any): ProspectiveRiskDetailGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProspectiveRiskDetailGetDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["staticVariableOptionId"] = this.staticVariableOptionId;
        data["value"] = this.value;

        return data;
    }
}

export interface IProspectiveRiskUserDto {
    id: number;
    name: string;
    surname: string;
    emailAddress: string;
}

export class ProspectiveRiskUserDto implements IProspectiveRiskUserDto {
    id: number;
    name: string;
    surname: string;
    emailAddress: string;

    constructor(data?: IProspectiveRiskUserDto) {
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

    static fromJS(data: any): ProspectiveRiskUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProspectiveRiskUserDto();
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

export interface IProspectiveRiskHistoryDto {
    id: number;
    creationUser: ProspectiveRiskUserDto;
    creationTime: moment.Moment;
    evaluatedTime: moment.Moment;
    weight: number;
    fixValue: number;
    value: number;
    variables: ProspectiveRiskStaticVariableDto[];
}

export class ProspectiveRiskHistoryDto implements IProspectiveRiskHistoryDto {
    id: number;
    creationUser: ProspectiveRiskUserDto;
    creationTime: moment.Moment;
    evaluatedTime: moment.Moment;
    weight: number;
    fixValue: number;
    value: number;
    variables: ProspectiveRiskStaticVariableDto[];

    constructor(data?: IProspectiveRiskHistoryDto) {
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
            this.creationUser = _data["creationUser"] ? ProspectiveRiskUserDto.fromJS(_data["creationUser"]) : <any>undefined;
            this.creationTime = _data["creationTime"] ? moment(_data["creationTime"]) : <any>undefined;
            this.evaluatedTime = _data["evaluatedTime"] ? moment(_data["evaluatedTime"]) : <any>undefined;
            this.weight = _data["weight"];
            this.fixValue = _data["fixValue"];
            this.value = _data["value"];
            if (Array.isArray(_data["variables"])) {
                this.variables = [] as any;
                for (let item of _data["variables"])
                    this.variables!.push(ProspectiveRiskStaticVariableDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ProspectiveRiskHistoryDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProspectiveRiskHistoryDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["creationUser"] = this.creationUser ? this.creationUser.toJSON() : <any>undefined;
        data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : <any>undefined;
        data["evaluatedTime"] = this.evaluatedTime ? this.evaluatedTime.toISOString() : <any>undefined;
        data["weight"] = this.weight;
        data["fixValue"] = this.fixValue;
        data["value"] = this.value;
        if (Array.isArray(this.variables)) {
            data["variables"] = [];
            for (let item of this.variables)
                data["variables"].push(item.toJSON());
        }

        return data;
    }
}

export enum StaticVariableType {
    None,
    Cualitative,
    Cuantitative
}