import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete } from '../service-proxies';

@Injectable()
export class DirectoryGovernmentServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(filter: string | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfDirectoryGovernmentListDto> {
        let url_ = this.baseUrl + "/api/services/app/DirectoryGovernment/GetAll?";
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
                    return <Observable<PagedResultDtoOfDirectoryGovernmentListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfDirectoryGovernmentListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfDirectoryGovernmentListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfDirectoryGovernmentListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfDirectoryGovernmentListDto>(<any>null);
    }

    get(id: number): Observable<DirectoryGovernmentGetDataDto> {
        let url_ = this.baseUrl + "/api/services/app/DirectoryGovernment/Get?";
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
                    return <Observable<DirectoryGovernmentGetDataDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<DirectoryGovernmentGetDataDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<DirectoryGovernmentGetDataDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = DirectoryGovernmentGetDataDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<DirectoryGovernmentGetDataDto>(<any>null);
    }

    create(item: DirectoryGovernmentDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/DirectoryGovernment/Create";

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

    update(item: DirectoryGovernmentDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/DirectoryGovernment/Update";

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
        let url_ = this.baseUrl + "/api/services/app/DirectoryGovernment/Delete?";
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

export interface IPagedResultDtoOfDirectoryGovernmentListDto {
    totalCount: number;
    items: DirectoryGovernmentDto[] | undefined;
}

export class PagedResultDtoOfDirectoryGovernmentListDto implements IPagedResultDtoOfDirectoryGovernmentListDto {
    totalCount!: number;
    items!: DirectoryGovernmentDto[] | undefined;

    constructor(data?: IPagedResultDtoOfDirectoryGovernmentListDto) {
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
                    this.items!.push(DirectoryGovernmentDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfDirectoryGovernmentListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfDirectoryGovernmentListDto();
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

export interface IDirectoryGovernmentGetDataDto {
    directoryGovernment: DirectoryGovernmentDto;
    departments: DirectoryGovernmentDepartmentDto[];
    sectors: DirectoryGovernmentSectorDto[];
    types: DirectoryGovernmentTypeDto[];
}

export class DirectoryGovernmentGetDataDto implements IDirectoryGovernmentGetDataDto {
    directoryGovernment: DirectoryGovernmentDto;
    departments: DirectoryGovernmentDepartmentDto[];
    sectors: DirectoryGovernmentSectorDto[];
    types: DirectoryGovernmentTypeDto[];

    constructor(data?: IDirectoryGovernmentGetDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.directoryGovernment = data["directoryGovernment"] ? DirectoryGovernmentDto.fromJS(data["directoryGovernment"]) : <any>undefined;
            if (Array.isArray(data["departments"])) {
                this.departments = [] as any;
                for (let item of data["departments"])
                    this.departments!.push(DirectoryGovernmentDepartmentDto.fromJS(item));
            }
            if (Array.isArray(data["sectors"])) {
                this.sectors = [] as any;
                for (let item of data["sectors"])
                    this.sectors!.push(DirectoryGovernmentSectorDto.fromJS(item));
            }
            if (Array.isArray(data["types"])) {
                this.types = [] as any;
                for (let item of data["types"])
                    this.types!.push(DirectoryGovernmentTypeDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): DirectoryGovernmentGetDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new DirectoryGovernmentGetDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["directoryGovernment"] = this.directoryGovernment ? this.directoryGovernment.toJSON() : <any>undefined;
        if (Array.isArray(this.departments)) {
            data["departments"] = [];
            for (let item of this.departments)
                data["departments"].push(item.toJSON());
        }
        if (Array.isArray(this.sectors)) {
            data["sectors"] = [];
            for (let item of this.sectors)
                data["sectors"].push(item.toJSON());
        }
        if (Array.isArray(this.types)) {
            data["types"] = [];
            for (let item of this.types)
                data["types"].push(item.toJSON());
        }

        return data;
    }
}

export interface IDirectoryGovernmentDto {
    id: number;
    name: string;
    shortName: string;
    address: string;
    phoneNumber: string;
    url: string;
    additionalInformation: string;
    enabled: boolean;
    district: DirectoryGovernmentDistrictDto;
    directoryGovernmentSector: DirectoryGovernmentSectorDto;
    directoryGovernmentType: DirectoryGovernmentTypeDto;
}

export class DirectoryGovernmentDto implements IDirectoryGovernmentDto {
    id: number;
    name: string;
    shortName: string;
    address: string;
    phoneNumber: string;
    url: string;
    additionalInformation: string;
    enabled: boolean;
    district: DirectoryGovernmentDistrictDto;
    directoryGovernmentSector: DirectoryGovernmentSectorDto;
    directoryGovernmentType: DirectoryGovernmentTypeDto;

    constructor(data?: IDirectoryGovernmentDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.district = new DirectoryGovernmentDistrictDto({
                id: -1,
                name: undefined,
                ubigeo: undefined
            });
            this.directoryGovernmentSector = new DirectoryGovernmentSectorDto(({
                id: -1,
                name: undefined
            }));
            this.directoryGovernmentType = new DirectoryGovernmentTypeDto(({
                id: -1,
                name: undefined
            }));
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.name = data["name"];
            this.shortName = data["shortName"];
            this.address = data["address"];
            this.phoneNumber = data["phoneNumber"];
            this.url = data["url"];
            this.additionalInformation = data["additionalInformation"];
            this.enabled = data["enabled"];
            this.district = data["district"] ? DirectoryGovernmentDistrictDto.fromJS(data["district"]) : new DirectoryGovernmentDistrictDto({
                id: -1,
                name: undefined,
                ubigeo: undefined
            });
            this.directoryGovernmentSector = data["directoryGovernmentSector"] ? DirectoryGovernmentSectorDto.fromJS(data["directoryGovernmentSector"]) : new DirectoryGovernmentSectorDto({
                id: -1,
                name: undefined
            });
            this.directoryGovernmentType = data["directoryGovernmentType"] ? DirectoryGovernmentTypeDto.fromJS(data["directoryGovernmentType"]) : new DirectoryGovernmentTypeDto({
                id: -1,
                name: undefined
            });
        }
    }

    static fromJS(data: any): DirectoryGovernmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new DirectoryGovernmentDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["id"] = this.id;
        data["name"] = this.name;
        data["shortName"] = this.shortName;        
        data["address"] = this.address;
        data["phoneNumber"] = this.phoneNumber;
        data["url"] = this.url;
        data["additionalInformation"] = this.additionalInformation;
        data["enabled"] = this.enabled;
        data["district"] = this.district ? this.district.toJSON() : <any>undefined;
        data["directoryGovernmentSector"] = this.directoryGovernmentSector ? this.directoryGovernmentSector.toJSON() : <any>undefined;
        data["directoryGovernmentType"] = this.directoryGovernmentType ? this.directoryGovernmentType.toJSON() : <any>undefined;

        return data;
    }
}

export interface IDirectoryGovernmentDepartmentDto {
    id: number;
    name: string;
    provinces: DirectoryGovernmentProvinceDto[];
}

export class DirectoryGovernmentDepartmentDto implements IDirectoryGovernmentDepartmentDto {
    id: number;
    name: string;
    provinces: DirectoryGovernmentProvinceDto[];

    constructor(data?: IDirectoryGovernmentDepartmentDto) {
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
                    this.provinces!.push(DirectoryGovernmentProvinceDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): DirectoryGovernmentDepartmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new DirectoryGovernmentDepartmentDto();
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

export interface IDirectoryGovernmentProvinceDto {
    id: number;
    name: string;
    districts: DirectoryGovernmentDistrictDto[];
}

export class DirectoryGovernmentProvinceDto implements IDirectoryGovernmentProvinceDto {
    id: number;
    name: string;
    districts: DirectoryGovernmentDistrictDto[];

    constructor(data?: IDirectoryGovernmentProvinceDto) {
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
                    this.districts!.push(DirectoryGovernmentDistrictDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): DirectoryGovernmentProvinceDto {
        data = typeof data === 'object' ? data : {};
        let result = new DirectoryGovernmentProvinceDto();
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

export interface IDirectoryGovernmentDistrictDto {
    id: number;
    name: string;
    ubigeo: string;
}

export class DirectoryGovernmentDistrictDto implements IDirectoryGovernmentDistrictDto {
    id: number;
    name: string;
    ubigeo: string;

    constructor(data?: IDirectoryGovernmentDistrictDto) {
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

    static fromJS(data: any): DirectoryGovernmentDistrictDto {
        data = typeof data === 'object' ? data : {};
        let result = new DirectoryGovernmentDistrictDto();
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

export interface IDirectoryGovernmentSectorDto {
    id: number;
    name: string;
}

export class DirectoryGovernmentSectorDto implements IDirectoryGovernmentSectorDto {
    id: number;
    name: string;

    constructor(data?: IDirectoryGovernmentSectorDto) {
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

    static fromJS(data: any): DirectoryGovernmentSectorDto {
        data = typeof data === 'object' ? data : {};
        let result = new DirectoryGovernmentSectorDto();
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

export interface IDirectoryGovernmentTypeDto {
    id: number;
    name: string;
}

export class DirectoryGovernmentTypeDto implements IDirectoryGovernmentTypeDto {
    id: number;
    name: string;

    constructor(data?: IDirectoryGovernmentTypeDto) {
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

    static fromJS(data: any): DirectoryGovernmentTypeDto {
        data = typeof data === 'object' ? data : {};
        let result = new DirectoryGovernmentTypeDto();
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