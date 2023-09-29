import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete } from '../service-proxies';
import * as moment from 'moment';

@Injectable()
export class TaskManagementHistoryServiceProxy {
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
        skipCount: number | undefined): Observable<PagedResultDtoOfTaskManagementHistoryListDto> {
        let url_ = this.baseUrl + "/api/services/app/TaskManagementHistory/GetAll?";
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
                    return <Observable<PagedResultDtoOfTaskManagementHistoryListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfTaskManagementHistoryListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfTaskManagementHistoryListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfTaskManagementHistoryListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfTaskManagementHistoryListDto>(<any>null);
    }
}

export interface IPagedResultDtoOfTaskManagementHistoryListDto {
    totalCount: number;
    items: TaskManagementHistoryDto[] | undefined;
}

export class PagedResultDtoOfTaskManagementHistoryListDto implements IPagedResultDtoOfTaskManagementHistoryListDto {
    totalCount!: number;
    items!: TaskManagementHistoryDto[] | undefined;

    constructor(data?: IPagedResultDtoOfTaskManagementHistoryListDto) {
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
                    this.items!.push(TaskManagementHistoryDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfTaskManagementHistoryListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfTaskManagementHistoryListDto();
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

export interface ITaskManagementHistoryDto {
    id: number;
    creationTime: moment.Moment;
    subject: string;
    template: string;
    to: string;
    tos: string[];
    copy: string;
    copies: string[];
    creatorUser: TaskManagementHistoryUserDto;
}

export class TaskManagementHistoryDto implements ITaskManagementHistoryDto {
    id: number;
    creationTime: moment.Moment;
    subject: string;
    template: string;
    to: string;
    tos: string[];
    copy: string;
    copies: string[];
    creatorUser: TaskManagementHistoryUserDto;

    constructor(data?: ITaskManagementHistoryDto) {
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
            this.subject = _data["subject"];
            this.template = _data["template"];
            this.creatorUser = _data["creatorUser"] ? TaskManagementHistoryUserDto.fromJS(_data["creatorUser"]) : <any>undefined;
            this.copy = _data["copy"];
            this.to = _data["to"];
            this.copies = [];
            this.tos = [];
            for (let to of this.to?.split(';'))
                this.tos.push(to);
            for (let copy of this.copy?.split(';'))
                this.copies.push(copy);
        }
    }

    static fromJS(data: any): TaskManagementHistoryDto {
        data = typeof data === 'object' ? data : {};
        let result = new TaskManagementHistoryDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;

        return data;
    }
}

export interface ITaskManagementHistoryUserDto {
    id: number;
    name: string;
    surname: string;
    emailAddress: string;
}

export class TaskManagementHistoryUserDto implements ITaskManagementHistoryUserDto {
    id: number;
    name: string;
    surname: string;
    emailAddress: string;

    constructor(data?: ITaskManagementHistoryUserDto) {
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

    static fromJS(data: any): TaskManagementHistoryUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new TaskManagementHistoryUserDto();
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