import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete, EntityDto } from '../service-proxies';
import * as moment from 'moment';
import { AttachmentUploadDto, ConflictSite } from './utility-proxie';

@Injectable()
export class HelpMemoryServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(
        socialConflictId: number | undefined,
        socialConflictSensibleId: number | undefined,
        directoryGovernmentId: number | undefined,
        helpMemoryRequest: string | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultDtoOfHelpMemoryListDto> {
        let url_ = this.baseUrl + "/api/services/app/HelpMemory/GetAll?";
        if (socialConflictId !== undefined)
            url_ += "SocialConflictId=" + encodeURIComponent("" + socialConflictId) + "&";
        if (socialConflictSensibleId !== undefined)
            url_ += "SocialConflictSensibleId=" + encodeURIComponent("" + socialConflictSensibleId) + "&";
        else if (directoryGovernmentId !== undefined)
            url_ += "DirectoryGovernmentId=" + encodeURIComponent("" + directoryGovernmentId) + "&";
        else if (helpMemoryRequest !== undefined)
            url_ += "HelpMemoryRequest=" + encodeURIComponent("" + helpMemoryRequest) + "&";
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
                    return <Observable<PagedResultDtoOfHelpMemoryListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfHelpMemoryListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfHelpMemoryListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfHelpMemoryListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfHelpMemoryListDto>(<any>null);
    }

    get(id: number): Observable<HelpMemoryDto> {
        let url_ = this.baseUrl + "/api/services/app/HelpMemory/Get?";
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
                    return <Observable<HelpMemoryDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<HelpMemoryDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<HelpMemoryDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = HelpMemoryDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<HelpMemoryDto>(<any>null);
    }

    create(item: HelpMemoryDto): Observable<EntityDto> {
        let url_ = this.baseUrl + "/api/services/app/HelpMemory/Create";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: item.toJSON(),
            headers: new HttpHeaders({
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

    update(item: HelpMemoryDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/HelpMemory/Update";

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
        let url_ = this.baseUrl + "/api/services/app/HelpMemory/Delete?";
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

export interface IPagedResultDtoOfHelpMemoryListDto {
    totalCount: number;
    items: HelpMemoryDto[] | undefined;
}

export class PagedResultDtoOfHelpMemoryListDto implements IPagedResultDtoOfHelpMemoryListDto {
    totalCount!: number;
    items!: HelpMemoryDto[] | undefined;

    constructor(data?: IPagedResultDtoOfHelpMemoryListDto) {
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
                    this.items!.push(HelpMemoryDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfHelpMemoryListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfHelpMemoryListDto();
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

export interface IHelpMemoryDto {
    id: number;
    lastModificationTime: moment.Moment;
    creationTime: moment.Moment;
    code: string;
    socialConflict: HelpMemorySocialConflictDto;
    socialConflictSensible: HelpMemorySocialConflictSensibleDto;
    directoryGovernment: HelpMemoryDirectoryGovernmentDto;
    request: string;
    requestTime: moment.Moment;
    site: ConflictSite;
    resources: HelpMemoryResourceDto[];
    uploadFiles: AttachmentUploadDto[];
}

export class HelpMemoryDto implements IHelpMemoryDto {
    id: number;
    lastModificationTime: moment.Moment;
    creationTime: moment.Moment;
    code: string;
    socialConflict: HelpMemorySocialConflictDto;
    socialConflictSensible: HelpMemorySocialConflictSensibleDto;
    directoryGovernment: HelpMemoryDirectoryGovernmentDto;
    request: string;
    requestTime: moment.Moment;
    site: ConflictSite;
    resources: HelpMemoryResourceDto[];
    uploadFiles: AttachmentUploadDto[];
    creatorUser: HelpMemoryUserDto;
    editionUser: HelpMemoryUserDto;

    constructor(data?: IHelpMemoryDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.resources = [];
            this.uploadFiles = [];
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.code = _data["code"];
            this.socialConflict = _data["socialConflict"] ? HelpMemorySocialConflictDto.fromJS(_data["socialConflict"]) : <any>undefined;
            this.socialConflictSensible = _data["socialConflictSensible"] ? HelpMemorySocialConflictSensibleDto.fromJS(_data["socialConflictSensible"]) : <any>undefined;
            this.directoryGovernment = _data["directoryGovernment"] ? HelpMemoryDirectoryGovernmentDto.fromJS(_data["directoryGovernment"]) : <any>undefined;
            this.request = _data["request"];
            this.site = _data["site"];
            this.lastModificationTime = _data["lastModificationTime"] ? moment(_data["lastModificationTime"]) : <any>undefined;
            this.creationTime = _data["creationTime"] ? moment(_data["creationTime"]) : <any>undefined;
            this.requestTime = _data["requestTime"] ? moment(_data["requestTime"]) : <any>undefined;
            this.creatorUser = _data["creatorUser"] ? HelpMemoryUserDto.fromJS(_data["creatorUser"]) : <any>undefined;
            this.editionUser = _data["editionUser"] ? HelpMemoryUserDto.fromJS(_data["editionUser"]) : <any>undefined;
            if (Array.isArray(_data["resources"])) {
                this.resources = [] as any;
                for (let item of _data["resources"])
                    this.resources!.push(HelpMemoryResourceDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): HelpMemoryDto {
        data = typeof data === 'object' ? data : {};
        let result = new HelpMemoryDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["request"] = this.request;
        data["requestTime"] = this.requestTime ? this.requestTime.toISOString() : <any>undefined;
        data["socialConflict"] = this.socialConflict ? this.socialConflict.toJSON() : <any>undefined;
        data["socialConflictSensible"] = this.socialConflictSensible ? this.socialConflictSensible.toJSON() : <any>undefined;
        data["directoryGovernment"] = this.directoryGovernment ? this.directoryGovernment.toJSON() : <any>undefined;
        if (Array.isArray(this.resources)) {
            data["resources"] = [];
            for (let item of this.resources.filter(p => p.remove))
                data["resources"].push(item.toJSON());
        }
        if (Array.isArray(this.uploadFiles)) {
            data["uploadFiles"] = [];
            for (let item of this.uploadFiles)
                data["uploadFiles"].push(item.toJSON());
        }
        return data;
    }
}

export interface IHelpMemorySocialConflictDto {
    id: number;
    code: string;
    caseName: string;
}

export class HelpMemorySocialConflictDto implements IHelpMemorySocialConflictDto {
    id: number;
    code: string;
    caseName: string;

    constructor(data?: IHelpMemorySocialConflictDto) {
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

    static fromJS(data: any): HelpMemorySocialConflictDto {
        data = typeof data === 'object' ? data : {};
        let result = new HelpMemorySocialConflictDto();
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

export interface IHelpMemorySocialConflictSensibleDto {
    id: number;
    code: string;
    caseName: string;
}

export class HelpMemorySocialConflictSensibleDto implements IHelpMemorySocialConflictSensibleDto {
    id: number;
    code: string;
    caseName: string;

    constructor(data?: IHelpMemorySocialConflictSensibleDto) {
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

    static fromJS(data: any): HelpMemorySocialConflictSensibleDto {
        data = typeof data === 'object' ? data : {};
        let result = new HelpMemorySocialConflictSensibleDto();
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

export interface IHelpMemoryDirectoryGovernmentDto {
    id: number;
    name: string;
}

export class HelpMemoryDirectoryGovernmentDto implements IHelpMemoryDirectoryGovernmentDto {
    id: number;
    name: string;

    constructor(data?: IHelpMemoryDirectoryGovernmentDto) {
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

    static fromJS(data: any): HelpMemoryDirectoryGovernmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new HelpMemoryDirectoryGovernmentDto();
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


export interface IHelpMemoryResourceDto {
    id: number;
    creationTime: moment.Moment;
    creatorUserName: string;
    resource: string;
    name: string;
    fileName: string;
    size: string;
    extension: string;
    className: string;
    remove: boolean;
}

export class HelpMemoryResourceDto implements IHelpMemoryResourceDto {
    id: number;
    creationTime: moment.Moment;
    creatorUserName: string;
    resource: string;
    name: string;
    fileName: string;
    size: string;
    extension: string;
    className: string;
    remove: boolean;

    constructor(data?: IHelpMemoryResourceDto) {
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
            this.creationTime = data["creationTime"] ? moment(data["creationTime"].toString()) : <any>undefined;
            this.creatorUserName = data["creatorUserName"];
            this.resource = data["resource"];
            this.name = data["name"];
            this.fileName = data["fileName"];
            this.size = data["size"];
            this.extension = data["extension"];
            this.className = data["className"];
            this.remove = data["remove"];
        }
    }

    static fromJS(data: any): HelpMemoryResourceDto {
        data = typeof data === 'object' ? data : {};
        let result = new HelpMemoryResourceDto();
        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : <any>undefined;
        data["creatorUserName"] = this.creatorUserName;
        data["resource"] = this.resource;
        data["name"] = this.name;
        data["fileName"] = this.fileName;
        data["size"] = this.size;
        data["extension"] = this.extension;
        data["className"] = this.className;
        data["remove"] = this.remove;

        return data;
    }
}

export interface IHelpMemoryUserDto {
    id: number;
    name: string;
    surname: string;
    emailAddress: string;
}

export class HelpMemoryUserDto implements IHelpMemoryUserDto {
    id: number;
    name: string;
    surname: string;
    emailAddress: string;

    constructor(data?: IHelpMemoryUserDto) {
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
            this.surname = data["surname"];
            this.emailAddress = data["emailAddress"];
        }
    }

    static fromJS(data: any): HelpMemoryUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new HelpMemoryUserDto();
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