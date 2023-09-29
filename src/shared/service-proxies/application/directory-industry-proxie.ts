import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete } from '../service-proxies';

@Injectable()
export class DirectoryIndustryServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(filter: string | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfDirectoryIndustryListDto> {
        let url_ = this.baseUrl + "/api/services/app/DirectoryIndustry/GetAll?";
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
                    return <Observable<PagedResultDtoOfDirectoryIndustryListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfDirectoryIndustryListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfDirectoryIndustryListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfDirectoryIndustryListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfDirectoryIndustryListDto>(<any>null);
    }

    get(id: number): Observable<DirectoryIndustryGetDataDto> {
        let url_ = this.baseUrl + "/api/services/app/DirectoryIndustry/Get?";
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
                    return <Observable<DirectoryIndustryGetDataDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<DirectoryIndustryGetDataDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<DirectoryIndustryGetDataDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = DirectoryIndustryGetDataDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<DirectoryIndustryGetDataDto>(<any>null);
    }

    create(item: DirectoryIndustryDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/DirectoryIndustry/Create";

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

    update(item: DirectoryIndustryDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/DirectoryIndustry/Update";

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
        let url_ = this.baseUrl + "/api/services/app/DirectoryIndustry/Delete?";
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

export interface IPagedResultDtoOfDirectoryIndustryListDto {
    totalCount: number;
    items: DirectoryIndustryDto[] | undefined;
}

export class PagedResultDtoOfDirectoryIndustryListDto implements IPagedResultDtoOfDirectoryIndustryListDto {
    totalCount!: number;
    items!: DirectoryIndustryDto[] | undefined;

    constructor(data?: IPagedResultDtoOfDirectoryIndustryListDto) {
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
                    this.items!.push(DirectoryIndustryDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfDirectoryIndustryListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfDirectoryIndustryListDto();
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

export interface IDirectoryIndustryGetDataDto {
    directoryIndustry: DirectoryIndustryDto;
    departments: DirectoryIndustryDepartmentDto[];
    sectors: DirectoryIndustrySectorDto[];
}

export class DirectoryIndustryGetDataDto implements IDirectoryIndustryGetDataDto {
    directoryIndustry: DirectoryIndustryDto;
    departments: DirectoryIndustryDepartmentDto[];
    sectors: DirectoryIndustrySectorDto[];

    constructor(data?: IDirectoryIndustryGetDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.directoryIndustry = data["directoryIndustry"] ? DirectoryIndustryDto.fromJS(data["directoryIndustry"]) : <any>undefined;
            if (Array.isArray(data["departments"])) {
                this.departments = [] as any;
                for (let item of data["departments"])
                    this.departments!.push(DirectoryIndustryDepartmentDto.fromJS(item));
            }
            if (Array.isArray(data["sectors"])) {
                this.sectors = [] as any;
                for (let item of data["sectors"])
                    this.sectors!.push(DirectoryIndustrySectorDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): DirectoryIndustryGetDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new DirectoryIndustryGetDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["directoryIndustry"] = this.directoryIndustry ? this.directoryIndustry.toJSON() : <any>undefined;
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

        return data;
    }
}

export interface IDirectoryIndustryDto {
    id: number;
    name: string;
    phoneNumber: string;
    emailAddress: string;
    url: string;
    address: string;
    additionalInformation: string;
    enabled: boolean;
    district: DirectoryIndustryDistrictReverseDto;
    directorySector: DirectoryIndustrySectorDto;
}

export class DirectoryIndustryDto implements IDirectoryIndustryDto {
    id: number;
    name: string;
    phoneNumber: string;
    emailAddress: string;
    url: string;
    address: string;
    additionalInformation: string;
    enabled: boolean;
    district: DirectoryIndustryDistrictReverseDto;
    directorySector: DirectoryIndustrySectorDto;

    constructor(data?: IDirectoryIndustryDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.district = new DirectoryIndustryDistrictReverseDto({
                id: -1,
                name: undefined,
                province: undefined
            });
            this.directorySector = new DirectoryIndustrySectorDto(({
                id: -1,
                name: undefined
            }));
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.name = data["name"];
            this.phoneNumber = data["phoneNumber"];
            this.emailAddress = data["emailAddress"];
            this.url = data["url"];
            this.address = data["address"];
            this.additionalInformation = data["additionalInformation"];
            this.enabled = data["enabled"];
            this.district = data["district"] ? DirectoryIndustryDistrictReverseDto.fromJS(data["district"]) : new DirectoryIndustryDistrictReverseDto({
                id: -1,
                name: undefined,
                province: undefined
            });
            this.directorySector = data["directorySector"] ? DirectoryIndustrySectorDto.fromJS(data["directorySector"]) : new DirectoryIndustrySectorDto({
                id: -1,
                name: undefined
            });
        }
    }

    static fromJS(data: any): DirectoryIndustryDto {
        data = typeof data === 'object' ? data : {};
        let result = new DirectoryIndustryDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["id"] = this.id;
        data["name"] = this.name;
        data["phoneNumber"] = this.phoneNumber;
        data["emailAddress"] = this.emailAddress;
        data["url"] = this.url;
        data["address"] = this.address;
        data["additionalInformation"] = this.additionalInformation;
        data["enabled"] = this.enabled;
        data["district"] = this.district ? this.district.toJSON() : <any>undefined;
        data["directorySector"] = this.directorySector ? this.directorySector.toJSON() : <any>undefined;

        return data;
    }
}

export interface IDirectoryIndustryDepartmentDto {
    id: number;
    name: string;
    provinces: DirectoryIndustryProvinceDto[];
}

export class DirectoryIndustryDepartmentDto implements IDirectoryIndustryDepartmentDto {
    id: number;
    name: string;
    provinces: DirectoryIndustryProvinceDto[];

    constructor(data?: IDirectoryIndustryDepartmentDto) {
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
                    this.provinces!.push(DirectoryIndustryProvinceDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): DirectoryIndustryDepartmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new DirectoryIndustryDepartmentDto();
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

export interface IDirectoryIndustryProvinceDto {
    id: number;
    name: string;
    districts: DirectoryIndustryDistrictDto[];
}

export class DirectoryIndustryProvinceDto implements IDirectoryIndustryProvinceDto {
    id: number;
    name: string;
    districts: DirectoryIndustryDistrictDto[];

    constructor(data?: IDirectoryIndustryProvinceDto) {
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
                    this.districts!.push(DirectoryIndustryDistrictDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): DirectoryIndustryProvinceDto {
        data = typeof data === 'object' ? data : {};
        let result = new DirectoryIndustryProvinceDto();
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

export interface IDirectoryIndustryDistrictDto {
    id: number;
    name: string;
}

export class DirectoryIndustryDistrictDto implements IDirectoryIndustryDistrictDto {
    id: number;
    name: string;

    constructor(data?: IDirectoryIndustryDistrictDto) {
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

    static fromJS(data: any): DirectoryIndustryDistrictDto {
        data = typeof data === 'object' ? data : {};
        let result = new DirectoryIndustryDistrictDto();
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

export interface IDirectoryIndustryDistrictReverseDto {
    id: number;
    name: string;
    province: DirectoryIndustryProvinceReverseDto;
}

export class DirectoryIndustryDistrictReverseDto implements IDirectoryIndustryDistrictReverseDto {
    id: number;
    name: string;
    province: DirectoryIndustryProvinceReverseDto;

    constructor(data?: IDirectoryIndustryDistrictReverseDto) {
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
            this.province = data["province"] ? DirectoryIndustryProvinceReverseDto.fromJS(data["province"]) : <any>undefined;
        }
    }

    static fromJS(data: any): DirectoryIndustryDistrictReverseDto {
        data = typeof data === 'object' ? data : {};
        let result = new DirectoryIndustryDistrictReverseDto();
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

export interface IDirectoryIndustryProvinceReverseDto {
    id: number;
    name: string;
    department: DirectoryIndustryDepartmentReverseDto;
}

export class DirectoryIndustryProvinceReverseDto implements IDirectoryIndustryProvinceReverseDto {
    id: number;
    name: string;
    department: DirectoryIndustryDepartmentReverseDto;

    constructor(data?: IDirectoryIndustryProvinceReverseDto) {
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
            this.department = data["department"] ? DirectoryIndustryDepartmentReverseDto.fromJS(data["department"]) : <any>undefined;
        }
    }

    static fromJS(data: any): DirectoryIndustryProvinceReverseDto {
        data = typeof data === 'object' ? data : {};
        let result = new DirectoryIndustryProvinceReverseDto();
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

export interface IDirectoryIndustryDepartmentReverseDto {
    id: number;
    name: string;
}

export class DirectoryIndustryDepartmentReverseDto implements IDirectoryIndustryDepartmentReverseDto {
    id: number;
    name: string;

    constructor(data?: IDirectoryIndustryDepartmentReverseDto) {
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

    static fromJS(data: any): DirectoryIndustryDepartmentReverseDto {
        data = typeof data === 'object' ? data : {};
        let result = new DirectoryIndustryDepartmentReverseDto();
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

export interface IDirectoryIndustrySectorDto {
    id: number;
    name: string;
}

export class DirectoryIndustrySectorDto implements IDirectoryIndustrySectorDto {
    id: number;
    name: string;

    constructor(data?: IDirectoryIndustrySectorDto) {
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

    static fromJS(data: any): DirectoryIndustrySectorDto {
        data = typeof data === 'object' ? data : {};
        let result = new DirectoryIndustrySectorDto();
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