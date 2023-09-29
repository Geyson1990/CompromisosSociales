import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete } from '../service-proxies';

@Injectable()
export class DirectoryDialogServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(filter: string | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfDirectoryDialogListDto> {
        let url_ = this.baseUrl + "/api/services/app/DirectoryDialog/GetAll?";
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
                    return <Observable<PagedResultDtoOfDirectoryDialogListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfDirectoryDialogListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfDirectoryDialogListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfDirectoryDialogListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfDirectoryDialogListDto>(<any>null);
    }

    get(id: number): Observable<DirectoryDialogGetDataDto> {
        let url_ = this.baseUrl + "/api/services/app/DirectoryDialog/Get?";
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
                    return <Observable<DirectoryDialogGetDataDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<DirectoryDialogGetDataDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<DirectoryDialogGetDataDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = DirectoryDialogGetDataDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<DirectoryDialogGetDataDto>(<any>null);
    }

    create(item: DirectoryDialogDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/DirectoryDialog/Create";

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

    update(item: DirectoryDialogDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/DirectoryDialog/Update";

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

export interface IPagedResultDtoOfDirectoryDialogListDto {
    totalCount: number;
    items: DirectoryDialogDto[] | undefined;
}

export class PagedResultDtoOfDirectoryDialogListDto implements IPagedResultDtoOfDirectoryDialogListDto {
    totalCount!: number;
    items!: DirectoryDialogDto[] | undefined;

    constructor(data?: IPagedResultDtoOfDirectoryDialogListDto) {
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
                    this.items!.push(DirectoryDialogDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfDirectoryDialogListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfDirectoryDialogListDto();
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

export interface IDirectoryDialogGetDataDto {
    directoryDialog: DirectoryDialogDto;
    responsibles: DirectoryDialogResponsibleDto[];
}

export class DirectoryDialogGetDataDto implements IDirectoryDialogGetDataDto {
    directoryDialog: DirectoryDialogDto;
    responsibles: DirectoryDialogResponsibleDto[];

    constructor(data?: IDirectoryDialogGetDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.directoryDialog = data["directoryDialog"] ? DirectoryDialogDto.fromJS(data["directoryDialog"]) : <any>undefined;
            if (Array.isArray(data["responsibles"])) {
                this.responsibles = [] as any;
                for (let item of data["responsibles"])
                    this.responsibles!.push(DirectoryDialogResponsibleDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): DirectoryDialogGetDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new DirectoryDialogGetDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["directoryDialog"] = this.directoryDialog ? this.directoryDialog.toJSON() : <any>undefined;
        if (Array.isArray(this.responsibles)) {
            data["responsibles"] = [];
            for (let item of this.responsibles)
                data["responsibles"].push(item.toJSON());
        }

        return data;
    }
}

export interface IDirectoryDialogDto {
    id: number;
    name: string;
    firstSurname: string;
    secondSurname: string;
    job: string;
    emailAddress: string;
    phoneNumber: string;
    mobilePhoneNumber: string;
    additionalInformation: string;
    enabled: boolean;
    directoryResponsible: DirectoryDialogResponsibleDto;
    directoryGovernment: DirectoryDialogGovernmentDto;
}

export class DirectoryDialogDto implements IDirectoryDialogDto {
    id: number;
    name: string;
    firstSurname: string;
    secondSurname: string;
    job: string;
    emailAddress: string;
    phoneNumber: string;
    mobilePhoneNumber: string;
    additionalInformation: string;
    enabled: boolean;
    directoryResponsible: DirectoryDialogResponsibleDto;
    directoryGovernment: DirectoryDialogGovernmentDto;

    constructor(data?: IDirectoryDialogDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.directoryResponsible = new DirectoryDialogResponsibleDto({
                id: -1,
                name: undefined
            });
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.name = data["name"];
            this.firstSurname = data["firstSurname"];
            this.secondSurname = data["secondSurname"];
            this.job = data["job"];
            this.emailAddress = data["emailAddress"];
            this.phoneNumber = data["phoneNumber"];
            this.mobilePhoneNumber = data["mobilePhoneNumber"];
            this.additionalInformation = data["additionalInformation"];
            this.enabled = data["enabled"];
            this.directoryResponsible = data["directoryResponsible"] ? DirectoryDialogResponsibleDto.fromJS(data["directoryResponsible"]) : new DirectoryDialogResponsibleDto({
                id: -1,
                name: undefined
            });
            this.directoryGovernment = data["directoryGovernment"] ? DirectoryDialogGovernmentDto.fromJS(data["directoryGovernment"]) : <any>undefined;
        }
    }

    static fromJS(data: any): DirectoryDialogDto {
        data = typeof data === 'object' ? data : {};
        let result = new DirectoryDialogDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["id"] = this.id;
        data["name"] = this.name;
        data["firstSurname"] = this.firstSurname;
        data["secondSurname"] = this.secondSurname;
        data["job"] = this.job;
        data["emailAddress"] = this.emailAddress;
        data["phoneNumber"] = this.phoneNumber;
        data["mobilePhoneNumber"] = this.mobilePhoneNumber;
        data["additionalInformation"] = this.additionalInformation;
        data["enabled"] = this.enabled;
        data["directoryResponsible"] = this.directoryResponsible ? this.directoryResponsible.toJSON() : <any>undefined;
        data["directoryGovernment"] = this.directoryGovernment ? this.directoryGovernment.toJSON() : <any>undefined;

        return data;
    }
}

export interface IDirectoryDialogResponsibleDto {
    id: number;
    name: string;
}

export class DirectoryDialogResponsibleDto implements IDirectoryDialogResponsibleDto {
    id: number;
    name: string;

    constructor(data?: IDirectoryDialogResponsibleDto) {
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

    static fromJS(data: any): DirectoryDialogResponsibleDto {
        data = typeof data === 'object' ? data : {};
        let result = new DirectoryDialogResponsibleDto();
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

export interface IDirectoryDialogGovernmentDto {
    id: number;
    name: string;
    shortName: string;
    address: string;
    phoneNumber: string;
    url: string;
    additionalInformation: string;
    enabled: boolean;
    district: DirectoryDialogDistrictDto;
    directoryGovernmentSector: DirectoryDialogGovernmentSectorDto;
}

export class DirectoryDialogGovernmentDto implements IDirectoryDialogGovernmentDto {
    id: number;
    name: string;
    shortName: string;
    address: string;
    phoneNumber: string;
    url: string;
    additionalInformation: string;
    enabled: boolean;
    district: DirectoryDialogDistrictDto;
    directoryGovernmentSector: DirectoryDialogGovernmentSectorDto;

    constructor(data?: IDirectoryDialogGovernmentDto) {
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
            this.shortName = data["shortName"];
            this.address = data["address"];
            this.phoneNumber = data["phoneNumber"];
            this.url = data["url"];
            this.additionalInformation = data["additionalInformation"];
            this.enabled = data["enabled"];
            this.district = data["district"] ? DirectoryDialogDistrictDto.fromJS(data["district"]) : <any>undefined;
            this.directoryGovernmentSector = data["directoryGovernmentSector"] ? DirectoryDialogGovernmentSectorDto.fromJS(data["directoryGovernmentSector"]) : <any>undefined;
        }
    }

    static fromJS(data: any): DirectoryDialogGovernmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new DirectoryDialogGovernmentDto();
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

export interface IDirectoryDialogDepartmentDto {
    id: number;
    name: string;
}

export class DirectoryDialogDepartmentDto implements IDirectoryDialogDepartmentDto {
    id: number;
    name: string;

    constructor(data?: IDirectoryDialogDepartmentDto) {
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

    static fromJS(data: any): DirectoryDialogDepartmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new DirectoryDialogDepartmentDto();
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

export interface IDirectoryDialogProvinceDto {
    id: number;
    name: string;
    department: DirectoryDialogDepartmentDto;
}

export class DirectoryDialogProvinceDto implements IDirectoryDialogProvinceDto {
    id: number;
    name: string;
    department: DirectoryDialogDepartmentDto;

    constructor(data?: IDirectoryDialogProvinceDto) {
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
            this.department = data["department"] ? DirectoryDialogDepartmentDto.fromJS(data["department"]) : <any>undefined;
        }
    }

    static fromJS(data: any): DirectoryDialogProvinceDto {
        data = typeof data === 'object' ? data : {};
        let result = new DirectoryDialogProvinceDto();
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

export interface IDirectoryDialogDistrictDto {
    id: number;
    name: string;
    province: DirectoryDialogProvinceDto;
}

export class DirectoryDialogDistrictDto implements IDirectoryDialogDistrictDto {
    id: number;
    name: string;
    province: DirectoryDialogProvinceDto;

    constructor(data?: IDirectoryDialogDistrictDto) {
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
            this.province = data["province"] ? DirectoryDialogProvinceDto.fromJS(data["province"]) : <any>undefined;
        }
    }

    static fromJS(data: any): DirectoryDialogDistrictDto {
        data = typeof data === 'object' ? data : {};
        let result = new DirectoryDialogDistrictDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["id"] = this.id;
        data["name"] = this.name;
        data["province"] = this.province ? this.province.toJSON() : <any>undefined;

        return data;
    }
}

export interface IDirectoryDialogGovernmentSectorDto {
    id: number;
    name: string;
}

export class DirectoryDialogGovernmentSectorDto implements IDirectoryDialogGovernmentSectorDto {
    id: number;
    name: string;

    constructor(data?: IDirectoryDialogGovernmentSectorDto) {
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

    static fromJS(data: any): DirectoryDialogGovernmentSectorDto {
        data = typeof data === 'object' ? data : {};
        let result = new DirectoryDialogGovernmentSectorDto();
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