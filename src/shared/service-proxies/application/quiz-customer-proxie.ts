import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete } from '../service-proxies';
import * as moment from 'moment';
import { AttachmentUploadDto } from './utility-proxie';

@Injectable()
export class QuizAdministrativeServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getQuestions(): Observable<PagedResultDtoOfQuizAdministrativeFormListDto> {
        let url_ = this.baseUrl + "/api/services/app/QuizAdministrative/GetQuestions";

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
                    return <Observable<PagedResultDtoOfQuizAdministrativeFormListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfQuizAdministrativeFormListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfQuizAdministrativeFormListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfQuizAdministrativeFormListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfQuizAdministrativeFormListDto>(<any>null);
    }

    create(input: QuizAdministrativeDataDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/QuizAdministrative/Create";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: input.toJSON(),
            headers: new HttpHeaders({
                "Accept": "text/plain",
                "Content-Type": "application/json-patch+json"
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

export interface IPagedResultDtoOfQuizAdministrativeFormListDto {
    totalCount: number;
    items: QuizAdministrativeFormDto[] | undefined;
}

export class PagedResultDtoOfQuizAdministrativeFormListDto implements IPagedResultDtoOfQuizAdministrativeFormListDto {
    totalCount!: number;
    items!: QuizAdministrativeFormDto[] | undefined;

    constructor(data?: IPagedResultDtoOfQuizAdministrativeFormListDto) {
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
                    this.items!.push(QuizAdministrativeFormDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfQuizAdministrativeFormListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfQuizAdministrativeFormListDto();
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

export interface IQuizAdministrativeFormDto {
    id: number;
    name: string;
    required: boolean;
    selectedOptionId: number;
    options: QuizAdministrativeFormOptionDto[];
}

export class QuizAdministrativeFormDto implements IQuizAdministrativeFormDto {
    id: number;
    name: string;
    required: boolean;
    selectedOptionId: number;
    options: QuizAdministrativeFormOptionDto[];

    constructor(data?: IQuizAdministrativeFormDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.selectedOptionId = -1;
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.required = _data["required"];
            if (Array.isArray(_data["options"])) {
                this.options = [] as any;
                for (let item of _data["options"])
                    this.options!.push(QuizAdministrativeFormOptionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): QuizAdministrativeFormDto {
        data = typeof data === 'object' ? data : {};
        let result = new QuizAdministrativeFormDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["required"] = this.required;
        data["selectedOptionId"] = this.selectedOptionId;
        if (Array.isArray(this.options)) {
            data["options"] = [];
            for (let item of this.options)
                data["options"].push(item.toJSON());
        }
        return data;
    }
}

export interface IQuizAdministrativeFormOptionDto {
    id: number;
    name: string;
    extra: boolean;
    response: string;
}

export class QuizAdministrativeFormOptionDto implements IQuizAdministrativeFormOptionDto {
    id: number;
    name: string;
    extra: boolean;
    response: string;

    constructor(data?: IQuizAdministrativeFormOptionDto) {
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
            this.extra = _data["extra"];
            this.response = _data["response"];
        }
    }

    static fromJS(data: any): QuizAdministrativeFormOptionDto {
        data = typeof data === 'object' ? data : {};
        let result = new QuizAdministrativeFormOptionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["extra"] = this.extra;
        data["response"] = this.response;

        return data;
    }
}

export interface IQuizFormResourceDto {
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

export class QuizFormResourceDto implements IQuizFormResourceDto {
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

    constructor(data?: IQuizFormResourceDto) {
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

    static fromJS(data: any): QuizFormResourceDto {
        data = typeof data === 'object' ? data : {};
        let result = new QuizFormResourceDto();
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

export interface IQuizAdministrativeDataDto {
    forms: QuizAdministrativeFormDto[];
    resources: QuizFormResourceDto[];
    uploadFiles: AttachmentUploadDto[];
}

export class QuizAdministrativeDataDto implements IQuizAdministrativeDataDto {
    forms: QuizAdministrativeFormDto[];
    resources: QuizFormResourceDto[];
    uploadFiles: AttachmentUploadDto[];

    constructor(data?: IQuizAdministrativeDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["forms"])) {
                this.forms = [] as any;
                for (let item of _data["forms"])
                    this.forms!.push(QuizAdministrativeFormDto.fromJS(item));
            }
            if (Array.isArray(_data["resources"])) {
                this.resources = [] as any;
                for (let item of _data["resources"])
                    this.resources!.push(QuizFormResourceDto.fromJS(item));
            }
            if (Array.isArray(_data["uploadFiles"])) {
                this.uploadFiles = [] as any;
                for (let item of _data["uploadFiles"])
                    this.uploadFiles!.push(AttachmentUploadDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): QuizAdministrativeDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new QuizAdministrativeDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        if (Array.isArray(this.forms)) {
            data["forms"] = [];
            for (let item of this.forms)
                data["forms"].push(item.toJSON());
        }
        if (Array.isArray(this.resources)) {
            data["resources"] = [];
            for (let item of this.resources)
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