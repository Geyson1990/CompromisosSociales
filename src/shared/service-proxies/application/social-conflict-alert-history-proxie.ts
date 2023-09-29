import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete, FileDto } from '../service-proxies';
import * as moment from 'moment';

@Injectable()
export class SocialConflictAlertHistoryServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(
        code: string | undefined,
        subject: string | undefined,
        template: string | undefined,
        to: string | undefined,
        copy: string | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultDtoOfSocialConflictAlertHistoryListDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictAlertHistory/GetAll?";
        if (code !== undefined)
            url_ += "Code=" + encodeURIComponent("" + code) + "&";
        if (subject !== undefined)
            url_ += "Subject=" + encodeURIComponent("" + subject) + "&";
        if (template !== undefined)
            url_ += "Template=" + encodeURIComponent("" + template) + "&";
        if (to !== undefined)
            url_ += "To=" + encodeURIComponent("" + to) + "&";
        if (copy !== undefined)
            url_ += "Copy=" + encodeURIComponent("" + copy) + "&";
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
                    return <Observable<PagedResultDtoOfSocialConflictAlertHistoryListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfSocialConflictAlertHistoryListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfSocialConflictAlertHistoryListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfSocialConflictAlertHistoryListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfSocialConflictAlertHistoryListDto>(<any>null);
    }

    getMatrizToExcel(
        code: string | undefined,
        subject: string | undefined,
        template: string | undefined,
        to: string | undefined,
        copy: string | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<FileDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictAlertHistory/GetMatrizToExcel?";
        if (code !== undefined)
            url_ += "Code=" + encodeURIComponent("" + code) + "&";
        if (subject !== undefined)
            url_ += "Subject=" + encodeURIComponent("" + subject) + "&";
        if (template !== undefined)
            url_ += "Template=" + encodeURIComponent("" + template) + "&";
        if (to !== undefined)
            url_ += "To=" + encodeURIComponent("" + to) + "&";
        if (copy !== undefined)
            url_ += "Copy=" + encodeURIComponent("" + copy) + "&";
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
            return this.processGetFile(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetFile(<any>response_);
                } catch (e) {
                    return <Observable<FileDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<FileDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetFile(response: HttpResponseBase): Observable<FileDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = FileDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<FileDto>(<any>null);
    }
}

export interface IPagedResultDtoOfSocialConflictAlertHistoryListDto {
    totalCount: number;
    items: SocialConflictAlertHistoryDto[] | undefined;
}

export class PagedResultDtoOfSocialConflictAlertHistoryListDto implements IPagedResultDtoOfSocialConflictAlertHistoryListDto {
    totalCount!: number;
    items!: SocialConflictAlertHistoryDto[] | undefined;

    constructor(data?: IPagedResultDtoOfSocialConflictAlertHistoryListDto) {
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
                    this.items!.push(SocialConflictAlertHistoryDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfSocialConflictAlertHistoryListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfSocialConflictAlertHistoryListDto();
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

export interface ISocialConflictAlertHistoryDto {
    id: number;
    creationTime: moment.Moment;
    code: string;
    subject: string;
    template: string;
    to: string;
    tos: string[];
    copy: string;
    copies: string[];
    file: string;
    files: string[];
    creatorUser: SocialConflictAlertHistoryUserDto;
}

export class SocialConflictAlertHistoryDto implements ISocialConflictAlertHistoryDto {
    id: number;
    creationTime: moment.Moment;
    code: string;
    subject: string;
    template: string;
    to: string;
    tos: string[];
    copy: string;
    copies: string[];
    file: string;
    files: string[];
    creatorUser: SocialConflictAlertHistoryUserDto;

    constructor(data?: ISocialConflictAlertHistoryDto) {
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
            this.code = _data["code"];
            this.subject = _data["subject"];
            this.template = _data["template"];
            this.creatorUser = _data["creatorUser"] ? SocialConflictAlertHistoryUserDto.fromJS(_data["creatorUser"]) : <any>undefined;
            this.copy = _data["copy"];
            this.to = _data["to"];
            this.file = _data["files"];
            this.copies = [];
            this.tos = [];
            this.files = [];
            for (let to of this.to?.split(';'))
                this.tos.push(to);
            for (let copy of this.copy?.split(';'))
                this.copies.push(copy);
            for (let file of this.file?.split(';'))
                this.files.push(file);
        }
    }

    static fromJS(data: any): SocialConflictAlertHistoryDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertHistoryDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;

        return data;
    }
}

export interface ISocialConflictAlertHistoryUserDto {
    id: number;
    name: string;
    surname: string;
    emailAddress: string;
}

export class SocialConflictAlertHistoryUserDto implements ISocialConflictAlertHistoryUserDto {
    id: number;
    name: string;
    surname: string;
    emailAddress: string;

    constructor(data?: ISocialConflictAlertHistoryUserDto) {
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

    static fromJS(data: any): SocialConflictAlertHistoryUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertHistoryUserDto();
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