import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException } from '../service-proxies';

@Injectable()
export class UploadServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    uploadFiles(files: globalThis.File[], token: string): Observable<HttpEvent<any>> {
        const form: FormData = new FormData();

        let index = 0;
        for (const file of files) {
            form.append('file[' + index + ']', file, file.name);
            index++;
        }

        const req = new HttpRequest('POST', `${this.baseUrl}/Profile/UploadResources`, form, {
            reportProgress: true,
            responseType: 'json',
            headers: new HttpHeaders({
                'authorization': 'Bearer ' + token
            })
        });

        return this.http.request(req);
    }

    uploadFile(file: File, token: string): Observable<HttpEvent<any>> {
        const form: FormData = new FormData();
        form.append('file', file, file.name);
        const req = new HttpRequest('POST', `${this.baseUrl}/Profile/UploadResource`, form, {
            reportProgress: true,
            responseType: 'json',
            headers: new HttpHeaders({
                'authorization': 'Bearer ' + token
            })
        });

        return this.http.request(req);
    }
}

