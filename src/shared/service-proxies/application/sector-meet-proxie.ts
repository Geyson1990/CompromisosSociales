import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete, EntityDto } from '../service-proxies';
import * as moment from 'moment';

@Injectable()
export class SectorMeetServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(
        sectorMeetCode: string | undefined,
        sectorMeetName: string | undefined,
        sectorMeetSessionType: number | undefined,
        departmentId: number | undefined,
        provinceId: number | undefined,
        districtId: number | undefined,
        personId: number | undefined,
        filterByDate: string | undefined,
        startDate: moment.Moment | undefined,
        endDate: moment.Moment | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultDtoOfSectorMeetListDto> {
        let url_ = this.baseUrl + "/api/services/app/SectorMeet/GetAll?";
        if (sectorMeetCode !== undefined)
            url_ += "SectorMeetCode=" + encodeURIComponent("" + sectorMeetCode) + "&";
        if (sectorMeetName !== undefined)
            url_ += "SectorMeetName=" + encodeURIComponent("" + sectorMeetName) + "&";
        if (sectorMeetSessionType !== undefined && sectorMeetSessionType !== null && sectorMeetSessionType != -1)
            url_ += "SectorMeetSessionType=" + encodeURIComponent("" + sectorMeetSessionType) + "&";
        if (departmentId !== undefined && departmentId !== null && departmentId != -1)
            url_ += "DepartmentId=" + encodeURIComponent("" + departmentId) + "&";
        if (provinceId !== undefined && provinceId !== null && provinceId != -1)
            url_ += "ProvinceId=" + encodeURIComponent("" + provinceId) + "&";
        if (districtId !== undefined && districtId !== null && districtId != -1)
            url_ += "DistrictId=" + encodeURIComponent("" + districtId) + "&";
        if (personId !== undefined && personId !== null && personId != -1)
            url_ += "PersonId=" + encodeURIComponent("" + personId) + "&";
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
                    return <Observable<PagedResultDtoOfSectorMeetListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfSectorMeetListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfSectorMeetListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfSectorMeetListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfSectorMeetListDto>(<any>null);
    }

    get(id: number): Observable<SectorMeetGetDataDto> {
        let url_ = this.baseUrl + "/api/services/app/SectorMeet/Get?";
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
                    return <Observable<SectorMeetGetDataDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<SectorMeetGetDataDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<SectorMeetGetDataDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = SectorMeetGetDataDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SectorMeetGetDataDto>(<any>null);
    }

    create(variable: SectorMeetDto): Observable<EntityDto> {
        let url_ = this.baseUrl + "/api/services/app/SectorMeet/Create";

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

    update(variable: SectorMeetDto): Observable<EntityDto> {
        let url_ = this.baseUrl + "/api/services/app/SectorMeet/Update";

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
        let url_ = this.baseUrl + "/api/services/app/SectorMeet/Delete?";
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

export interface IPagedResultDtoOfSectorMeetListDto {
    totalCount: number;
    items: SectorMeetDto[] | undefined;
}

export class PagedResultDtoOfSectorMeetListDto implements IPagedResultDtoOfSectorMeetListDto {
    totalCount!: number;
    items!: SectorMeetDto[] | undefined;

    constructor(data?: IPagedResultDtoOfSectorMeetListDto) {
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
                    this.items!.push(SectorMeetDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfSectorMeetListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfSectorMeetListDto();
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

export interface ISectorMeetGetDataDto {
    sectorMeet: SectorMeetDto;
    territorialUnits: SectorMeetTerritorialUnitDto[];
}

export class SectorMeetGetDataDto implements ISectorMeetGetDataDto {
    sectorMeet: SectorMeetDto;
    territorialUnits: SectorMeetTerritorialUnitDto[];

    constructor(data?: ISectorMeetGetDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.sectorMeet = _data["sectorMeet"] ? SectorMeetDto.fromJS(_data["sectorMeet"]) : <any>undefined;
            if (Array.isArray(_data["territorialUnits"])) {
                this.territorialUnits = [] as any;
                for (let item of _data["territorialUnits"])
                    this.territorialUnits!.push(SectorMeetTerritorialUnitDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SectorMeetGetDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetGetDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["sectorMeet"] = this.sectorMeet ? this.sectorMeet.toJSON() : <any>undefined;
        if (Array.isArray(this.territorialUnits)) {
            data["territorialUnits"] = [];
            for (let item of this.territorialUnits)
                data["territorialUnits"].push(item.toJSON());
        }
        return data;
    }
}

export interface ISectorMeetDto {
    id: number;
    creationTime: moment.Moment;
    code: string;
    meetName: string;
    territorialUnit: SectorMeetTerritorialUnitDto;
    socialConflict: SectorMeetSocialConflict;
}

export class SectorMeetDto implements ISectorMeetDto {
    id: number;
    count: number;
    year: number;
    creationTime: moment.Moment;
    code: string;
    meetName: string;
    territorialUnit: SectorMeetTerritorialUnitDto;
    socialConflict: SectorMeetSocialConflict;

    //replacement
    replaceCode: boolean;
    replaceYear: number;
    replaceCount: number;

    constructor(data?: ISectorMeetDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.territorialUnit = new SectorMeetTerritorialUnitDto({
                id: -1,
                name: undefined
            });
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.count = _data["count"];
            this.year = _data["year"];
            this.creationTime = _data["creationTime"] ? moment(_data["creationTime"]) : <any>undefined;
            this.code = _data["code"];
            this.territorialUnit = _data["territorialUnit"] ? SectorMeetTerritorialUnitDto.fromJS(_data["territorialUnit"]) : new SectorMeetTerritorialUnitDto({
                id: -1,
                name: undefined
            });
            this.socialConflict = _data["socialConflict"] ? SectorMeetSocialConflict.fromJS(_data["socialConflict"]) : <any>undefined;
            this.meetName = _data["meetName"];
        }
    }

    static fromJS(data: any): SectorMeetDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["meetName"] = this.meetName;
        data["territorialUnit"] = this.territorialUnit ? this.territorialUnit.toJSON() : <any>undefined;
        data["socialConflict"] = this.socialConflict ? this.socialConflict.toJSON() : <any>undefined;

        data["replaceCode"] = this.replaceCode;
        data["replaceYear"] = this.replaceYear;
        data["replaceCount"] = this.replaceCount;

        return data;
    }
}

export interface ISectorMeetTerritorialUnitDto {
    id: number;
    name: string;
}

export class SectorMeetTerritorialUnitDto implements ISectorMeetTerritorialUnitDto {
    id: number;
    name: string;

    constructor(data?: ISectorMeetTerritorialUnitDto) {
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

    static fromJS(data: any): SectorMeetTerritorialUnitDto {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetTerritorialUnitDto();
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


export interface ISectorMeetSocialConflict {
    id: number;
    code: string;
    caseName: string;
}

export class SectorMeetSocialConflict implements ISectorMeetSocialConflict {
    id: number;
    code: string;
    caseName: string;

    constructor(data?: ISectorMeetSocialConflict) {
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
        }
    }

    static fromJS(data: any): SectorMeetSocialConflict {
        data = typeof data === 'object' ? data : {};
        let result = new SectorMeetSocialConflict();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["code"] = this.code;
        data["caseName"] = this.caseName;

        return data;
    }
}