import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete } from '../service-proxies';

@Injectable()
export class RegionServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(filter: string | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfRegionListDto> {
        let url_ = this.baseUrl + "/api/services/app/Ubigeo/GetAllRegions?";
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
                    return <Observable<PagedResultDtoOfRegionListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfRegionListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfRegionListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfRegionListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfRegionListDto>(<any>null);
    }

    get(id: number): Observable<RegionGetDataDto> {
        let url_ = this.baseUrl + "/api/services/app/Ubigeo/GetRegion?";
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
                    return <Observable<RegionGetDataDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<RegionGetDataDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<RegionGetDataDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = RegionGetDataDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<RegionGetDataDto>(<any>null);
    }

    create(item: RegionDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/Ubigeo/CreateRegion";

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

    update(item: RegionDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/Ubigeo/UpdateRegion";

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
        let url_ = this.baseUrl + "/api/services/app/Ubigeo/DeleteRegion?";
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

export interface IPagedResultDtoOfRegionListDto {
    totalCount: number;
    items: RegionDto[] | undefined;
}

export class PagedResultDtoOfRegionListDto implements IPagedResultDtoOfRegionListDto {
    totalCount!: number;
    items!: RegionDto[] | undefined;

    constructor(data?: IPagedResultDtoOfRegionListDto) {
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
                    this.items!.push(RegionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfRegionListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfRegionListDto();
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

export interface IRegionGetDataDto {
    region: RegionDto;
    departments: RegionDepartmentGetDto[];
}

export class RegionGetDataDto implements IRegionGetDataDto {
    region: RegionDto;
    departments: RegionDepartmentGetDto[];

    constructor(data?: IRegionGetDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.region = data["region"] ? RegionDto.fromJS(data["region"]) : <any>undefined;
            if (Array.isArray(data["departments"])) {
                this.departments = [] as any;
                for (let item of data["departments"])
                    this.departments!.push(RegionDepartmentGetDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): RegionGetDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new RegionGetDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["region"] = this.region ? this.region.toJSON() : <any>undefined;
        if (Array.isArray(this.departments)) {
            data["departments"] = [];
            for (let item of this.departments)
                data["departments"].push(item.toJSON());
        }

        return data;
    }
}

export interface IRegionDto {
    id: number;
    name: string;
    enabled: boolean;
    code: string;
    district: RegionDistrictDto;
}

export class RegionDto implements IRegionDto {
    id: number;
    name: string;
    enabled: boolean;
    code: string;
    district: RegionDistrictDto;

    constructor(data?: IRegionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.district = new RegionDistrictDto({
                id: -1,
                name: undefined,
                ubigeo: undefined,
                province: new RegionProvinceDto({
                    id: -1,
                    name: undefined,
                    department: new RegionDepartmentDto({
                        id: -1,
                        name: undefined
                    })
                })
            });
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.name = data["name"];
            this.enabled = data["enabled"];
            this.code = data["code"];
            this.district = data["district"] ? RegionDistrictDto.fromJS(data["district"]) : new RegionDistrictDto({
                id: -1,
                name: undefined,
                ubigeo: undefined,
                province: new RegionProvinceDto({
                    id: -1,
                    name: undefined,
                    department: new RegionDepartmentDto({
                        id: -1,
                        name: undefined
                    })
                })
            });
        }
    }

    static fromJS(data: any): RegionDto {
        data = typeof data === 'object' ? data : {};
        let result = new RegionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["id"] = this.id;
        data["name"] = this.name;
        data["enabled"] = this.enabled;
        data["code"] = this.code;
        data["districtId"] = this.district ? this.district.id : <any>undefined;

        return data;
    }

    resetDistrict() {
        this.district = new RegionDistrictDto({
            id: -1,
            name: undefined,
            ubigeo: undefined,
            province: new RegionProvinceDto({
                id: -1,
                name: undefined,
                department: new RegionDepartmentDto({
                    id: -1,
                    name: undefined
                })
            })
        });
    }
}

export interface IRegionDistrictDto {
    id: number;
    name: string;
    ubigeo: string;
    province: RegionProvinceDto;
}

export class RegionDistrictDto implements IRegionDistrictDto {
    id: number;
    name: string;
    ubigeo: string;
    province: RegionProvinceDto;

    constructor(data?: IRegionDistrictDto) {
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
            this.ubigeo = data["ubigeo"];
            this.province = data["province"] ? RegionProvinceDto.fromJS(data["province"]) : <any>undefined;
        }
    }

    static fromJS(data: any): RegionDistrictDto {
        data = typeof data === 'object' ? data : {};
        let result = new RegionDistrictDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["id"] = this.id;
        data["name"] = this.name;
        data["ubigeo"] = this.ubigeo;
        data["province"] = this.province ? this.province.toJSON() : <any>undefined;

        return data;
    }
}

export interface IRegionProvinceDto {
    id: number;
    name: string;
    department: RegionDepartmentDto;
}

export class RegionProvinceDto implements IRegionProvinceDto {
    id: number;
    name: string;
    department: RegionDepartmentDto;

    constructor(data?: IRegionProvinceDto) {
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
            this.department = data["department"] ? RegionDepartmentDto.fromJS(data["department"]) : <any>undefined;
        }
    }

    static fromJS(data: any): RegionProvinceDto {
        data = typeof data === 'object' ? data : {};
        let result = new RegionProvinceDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["id"] = this.id;
        data["name"] = this.name;
        data["department"] = this.department ? this.department.toJSON() : <any>undefined;

        return data;
    }
}
export interface IRegionDepartmentDto {
    id: number;
    name: string;
}

export class RegionDepartmentDto implements IRegionDepartmentDto {
    id: number;
    name: string;

    constructor(data?: IRegionDepartmentDto) {
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

    static fromJS(data: any): RegionDepartmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new RegionDepartmentDto();
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

export interface IRegionDepartmentGetDto {
    id: number;
    name: string;
    provinces: RegionProvinceGetDto[];
}

export class RegionDepartmentGetDto implements IRegionDepartmentGetDto {
    id: number;
    name: string;
    provinces: RegionProvinceGetDto[];

    constructor(data?: IRegionDepartmentGetDto) {
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
                    this.provinces!.push(RegionProvinceGetDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): RegionDepartmentGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new RegionDepartmentGetDto();
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

export interface IRegionProvinceGetDto {
    id: number;
    name: string;
    districts: RegionDistrictGetDto[];
}

export class RegionProvinceGetDto implements IRegionProvinceGetDto {
    id: number;
    name: string;
    districts: RegionDistrictGetDto[];

    constructor(data?: IRegionProvinceGetDto) {
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
                    this.districts!.push(RegionDistrictGetDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): RegionProvinceGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new RegionProvinceGetDto();
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

export interface IRegionDistrictGetDto {
    id: number;
    name: string;
    ubigeo: string;
}

export class RegionDistrictGetDto implements IRegionDistrictGetDto {
    id: number;
    name: string;
    ubigeo: string;

    constructor(data?: IRegionDistrictGetDto) {
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
            this.ubigeo = data["ubigeo"];
        }
    }

    static fromJS(data: any): RegionDistrictGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new RegionDistrictGetDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["id"] = this.id;
        data["name"] = this.name;
        data["ubigeo"] = this.ubigeo;

        return data;
    }
}