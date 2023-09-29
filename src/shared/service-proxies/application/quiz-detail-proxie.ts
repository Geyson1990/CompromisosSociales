import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete, FileDto } from '../service-proxies';
import * as moment from 'moment';

@Injectable()
export class QuizDetailServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(stateId: number | undefined, completeType: QuizCompleteType, startDate: moment.Moment | undefined, endDate: moment.Moment | undefined, filterByDate: boolean | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfQuizDetailListDto> {
        let url_ = this.baseUrl + "/api/services/app/QuizDetail/GetAll?";
        if (stateId !== undefined && stateId !== null && stateId !== -1)
            url_ += "StateId=" + encodeURIComponent("" + stateId) + "&";
        if (completeType !== undefined && completeType !== null)
            url_ += "CompleteType=" + encodeURIComponent("" + completeType) + "&";
        if (filterByDate !== undefined && completeType !== null)
            url_ += "FilterByDate=" + encodeURIComponent("" + filterByDate) + "&";
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
        if (startDate === null)
            throw new Error("The parameter 'startDate' cannot be null.");
        else if (startDate !== undefined)
            url_ += "StartTime=" + encodeURIComponent(startDate ? "" + startDate.toJSON() : "") + "&";
        if (endDate === null)
            throw new Error("The parameter 'endDate' cannot be null.");
        else if (endDate !== undefined)
            url_ += "EndTime=" + encodeURIComponent(endDate ? "" + endDate.toJSON() : "") + "&";
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
                    return <Observable<PagedResultDtoOfQuizDetailListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfQuizDetailListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfQuizDetailListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfQuizDetailListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfQuizDetailListDto>(<any>null);
    }

    exportAdministrativeMatriz(stateId: number | undefined, completeType: QuizCompleteType, startDate: moment.Moment | undefined, endDate: moment.Moment | undefined, filterByDate: boolean | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<FileDto> {
        let url_ = this.baseUrl + "/api/services/app/QuizDetail/ExportAdministrativeMatriz?";
        if (stateId !== undefined && stateId !== null && stateId !== -1)
            url_ += "StateId=" + encodeURIComponent("" + stateId) + "&";
        if (completeType !== undefined && completeType !== null)
            url_ += "CompleteType=" + encodeURIComponent("" + completeType) + "&";
        if (filterByDate !== undefined && completeType !== null)
            url_ += "FilterByDate=" + encodeURIComponent("" + filterByDate) + "&";
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
        if (startDate === null)
            throw new Error("The parameter 'startDate' cannot be null.");
        else if (startDate !== undefined)
            url_ += "StartTime=" + encodeURIComponent(startDate ? "" + startDate.toJSON() : "") + "&";
        if (endDate === null)
            throw new Error("The parameter 'endDate' cannot be null.");
        else if (endDate !== undefined)
            url_ += "EndTime=" + encodeURIComponent(endDate ? "" + endDate.toJSON() : "") + "&";
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

    exportPublicMatriz(stateId: number | undefined, completeType: QuizCompleteType, startDate: moment.Moment | undefined, endDate: moment.Moment | undefined, filterByDate: boolean | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<FileDto> {
        let url_ = this.baseUrl + "/api/services/app/QuizDetail/ExportPublicMatriz?";
        if (stateId !== undefined && stateId !== null && stateId !== -1)
            url_ += "StateId=" + encodeURIComponent("" + stateId) + "&";
        if (completeType !== undefined && completeType !== null)
            url_ += "CompleteType=" + encodeURIComponent("" + completeType) + "&";
        if (filterByDate !== undefined && completeType !== null)
            url_ += "FilterByDate=" + encodeURIComponent("" + filterByDate) + "&";
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
        if (startDate === null)
            throw new Error("The parameter 'startDate' cannot be null.");
        else if (startDate !== undefined)
            url_ += "StartTime=" + encodeURIComponent(startDate ? "" + startDate.toJSON() : "") + "&";
        if (endDate === null)
            throw new Error("The parameter 'endDate' cannot be null.");
        else if (endDate !== undefined)
            url_ += "EndTime=" + encodeURIComponent(endDate ? "" + endDate.toJSON() : "") + "&";
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

    get(id: number): Observable<QuizDetailGetDataDto> {
        let url_ = this.baseUrl + "/api/services/app/QuizDetail/Get?";
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
                    return <Observable<QuizDetailGetDataDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<QuizDetailGetDataDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<QuizDetailGetDataDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = QuizDetailGetDataDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<QuizDetailGetDataDto>(<any>null);
    }

    update(input: QuizDetailDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/QuizDetail/Update";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: input.toJSON(),
            headers: new HttpHeaders({
                "Accept": "text/plain",
                "Content-Type": "application/json-patch+json"
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
}

export interface IPagedResultDtoOfQuizDetailListDto {
    totalCount: number;
    items: QuizDetailDto[] | undefined;
}

export class PagedResultDtoOfQuizDetailListDto implements IPagedResultDtoOfQuizDetailListDto {
    totalCount!: number;
    items!: QuizDetailDto[] | undefined;

    constructor(data?: IPagedResultDtoOfQuizDetailListDto) {
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
                    this.items!.push(QuizDetailDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfQuizDetailListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfQuizDetailListDto();
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

export interface IQuizDetailGetDataDto {
    quiz: QuizDetailDto;
    states: QuizDetailStateDto[];
}

export class QuizDetailGetDataDto implements IQuizDetailGetDataDto {
    quiz: QuizDetailDto;
    states: QuizDetailStateDto[];

    constructor(data?: IQuizDetailGetDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.quiz = _data["quiz"] ? QuizDetailDto.fromJS(_data["quiz"]) : <any>undefined;
            if (Array.isArray(_data["states"])) {
                this.states = [] as any;
                for (let item of _data["states"])
                    this.states!.push(QuizDetailStateDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): QuizDetailGetDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new QuizDetailGetDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["quiz"] = this.quiz ? this.quiz.toJSON() : <any>undefined;
        if (Array.isArray(this.states)) {
            data["states"] = [];
            for (let item of this.states)
                data["states"].push(item.toJSON());
        }

        return data;
    }
}

export interface IQuizDetailDto {
    id: number;
    creationTime: moment.Moment;
    name : string;
    surname : string;
    secondSurname : string;
    emailAddress : string;
    lastModificationTime: moment.Moment;
    type: QuizCompleteType;
    quizState: QuizDetailStateDto;
    customer: QuizDetailUserDto;
    administrative: QuizDetailUserDto;
    forms: QuizDetailFormDto[];
    resources: QuizDetailResourceDto[];
}

export class QuizDetailDto implements IQuizDetailDto {
    id: number;
    creationTime: moment.Moment;
    name : string;
    surname : string;
    secondSurname : string;
    emailAddress : string;
    lastModificationTime: moment.Moment;
    type: QuizCompleteType;
    quizState: QuizDetailStateDto;
    customer: QuizDetailUserDto;
    administrative: QuizDetailUserDto;
    forms: QuizDetailFormDto[];
    resources: QuizDetailResourceDto[];

    constructor(data?: IQuizDetailFormDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.quizState = new QuizDetailStateDto({
                id: -1,
                name: undefined,
                background: undefined,
                foreground: undefined
            });
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.creationTime = _data["creationTime"] ? moment(_data["creationTime"]) : <any>undefined
            this.name = _data["name"];
            this.surname = _data["surname"];
            this.secondSurname = _data["secondSurname"];
            this.emailAddress = _data["emailAddress"];
            this.lastModificationTime = _data["lastModificationTime"] ? moment(_data["lastModificationTime"]) : <any>undefined;
            this.type = _data["type"];
            this.quizState = _data["quizState"] ? QuizDetailStateDto.fromJS(_data["quizState"]) : new QuizDetailStateDto({
                id: -1,
                name: undefined,
                background: undefined,
                foreground: undefined
            });
            this.customer = _data["customer"] ? QuizDetailUserDto.fromJS(_data["customer"]) : <any>undefined;
            this.administrative = _data["administrative"] ? QuizDetailUserDto.fromJS(_data["administrative"]) : <any>undefined;

            if (Array.isArray(_data["forms"])) {
                this.forms = [] as any;
                for (let item of _data["forms"])
                    this.forms!.push(QuizDetailFormDto.fromJS(item));
            }
            if (Array.isArray(_data["resources"])) {
                this.resources = [] as any;
                for (let item of _data["resources"])
                    this.resources!.push(QuizDetailResourceDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): QuizDetailDto {
        data = typeof data === 'object' ? data : {};
        let result = new QuizDetailDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["quizState"] = this.quizState ? this.quizState.toJSON() : new QuizDetailStateDto({
            id: -1,
            name: undefined,
            background: undefined,
            foreground: undefined
        });

        return data;
    }
}

export interface IQuizDetailFormDto {
    id: number;
    name: string;
    index: number;
    required: boolean;
    selectedOptionId: number;
    options: QuizDetailFormOptionDto[];
}

export class QuizDetailFormDto implements IQuizDetailFormDto {
    id: number;
    name: string;
    index: number;
    required: boolean;
    selectedOptionId: number;
    options: QuizDetailFormOptionDto[];

    constructor(data?: IQuizDetailFormDto) {
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
            this.required = _data["required"];
            this.selectedOptionId = _data["selectedOptionId"];
            if (Array.isArray(_data["options"])) {
                this.options = [] as any;
                for (let item of _data["options"])
                    this.options!.push(QuizDetailFormOptionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): QuizDetailFormDto {
        data = typeof data === 'object' ? data : {};
        let result = new QuizDetailFormDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["index"] = this.index;
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

export interface IQuizDetailFormOptionDto {
    id: number;
    name: string;
    index: number;
    extra: boolean;
    quizOptionReferenceId: number;
    response: string;
}

export class QuizDetailFormOptionDto {
    id: number;
    name: string;
    index: number;
    extra: boolean;
    quizOptionReferenceId: number;
    response: string;

    constructor(data?: IQuizDetailFormOptionDto) {
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
            this.index = data["index"];
            this.extra = data["extra"];
            this.quizOptionReferenceId = data["quizOptionReferenceId"];
            this.response = data["description"];
        }
    }

    static fromJS(data: any): QuizDetailFormOptionDto {
        data = typeof data === 'object' ? data : {};
        let result = new QuizDetailFormOptionDto();
        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["index"] = this.index;
        data["extra"] = this.extra;
        data["quizOptionReferenceId"] = this.quizOptionReferenceId;
        data["description"] = this.response;

        return data;
    }
}

export interface IQuizDetailResourceDto {
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

export class QuizDetailResourceDto implements IQuizDetailResourceDto {
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

    constructor(data?: IQuizDetailResourceDto) {
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

    static fromJS(data: any): QuizDetailResourceDto {
        data = typeof data === 'object' ? data : {};
        let result = new QuizDetailResourceDto();
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

export interface IQuizDetailStateDto {
    id: number;
    name: string;
    foreground: string;
    background: string;
}

export class QuizDetailStateDto implements IQuizDetailStateDto {
    id: number;
    name: string;
    foreground: string;
    background: string;

    constructor(data?: IQuizDetailStateDto) {
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
            this.background = _data["background"];
            this.foreground = _data["foreground"];
        }
    }

    static fromJS(data: any): QuizDetailStateDto {
        data = typeof data === 'object' ? data : {};
        let result = new QuizDetailStateDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["background"] = this.background;
        data["foreground"] = this.foreground;

        return data;
    }
}

export interface IQuizDetailUserDto {
    id: number;
    name: string;
    surname: string;
    secondSurname: string;
    emailAddress: string;
}

export class QuizDetailUserDto implements IQuizDetailUserDto {
    id: number;
    name: string;
    surname: string;
    secondSurname: string;
    emailAddress: string;

    constructor(data?: IQuizDetailUserDto) {
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
            this.secondSurname = data["secondSurname"];
            this.emailAddress = data["emailAddress"];
        }
    }

    static fromJS(data: any): QuizDetailUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new QuizDetailUserDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["surname"] = this.surname;
        data["secondSurname"] = this.secondSurname;
        data["emailAddress"] = this.emailAddress;

        return data;
    }
}

export const enum QuizCompleteType {
    ADMINITRATIVE,
    PUBLIC
}