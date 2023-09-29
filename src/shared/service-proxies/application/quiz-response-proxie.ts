import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete } from '../service-proxies';
import * as moment from 'moment';

@Injectable()
export class QuizResponseServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    get(): Observable<QuizResponseDto> {
        let url_ = this.baseUrl + "/api/services/app/QuizResponse/Get";


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
                    return <Observable<QuizResponseDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<QuizResponseDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<QuizResponseDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = QuizResponseDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<QuizResponseDto>(<any>null);
    }

    update(input: QuizResponseDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/QuizResponse/Update";

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

export interface IQuizResponseDto {
    customerSubject: string;
    customerBody : string;
    adminSubject: string; 
    adminBody: string;
}

export class QuizResponseDto implements IQuizResponseDto {
    customerSubject: string;
    customerBody : string;
    adminSubject: string; 
    adminBody: string;

    constructor(data?: IQuizResponseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.customerSubject = _data["customerSubject"];
            this.customerBody = _data["customerBody"];
            this.adminSubject = _data["adminSubject"];
            this.adminBody = _data["adminBody"];
        }
    }

    static fromJS(data: any): QuizResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new QuizResponseDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["customerSubject"] = this.customerSubject;
        data["customerBody"] = this.customerBody;
        data["adminSubject"] = this.adminSubject;
        data["adminBody"] = this.adminBody;

        return data;
    }
}