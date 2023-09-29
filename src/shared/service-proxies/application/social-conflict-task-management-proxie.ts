import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete, EntityDto, FileDto, PersonType } from '../service-proxies';
import { ConflictSite } from './utility-proxie';
import * as moment from "moment";

@Injectable()
export class SocialConflictTaskManagementServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getMatrixToExcel(
        conflictId: number | undefined,
        conflictCode: string | undefined,
        conflictName: string | undefined,
        taskTitle: string | undefined,
        taskStatus: SocialConflictTaskManagementStatus | undefined,
        conflictSite: ConflictSite | undefined,
        sorting: string | undefined): Observable<FileDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictTaskManagement/GetMatrixToExcel?";

        if (conflictId !== undefined)
            url_ += "ConflictId=" + encodeURIComponent("" + conflictId) + "&";
        if (conflictCode !== undefined)
            url_ += "ConflictCode=" + encodeURIComponent("" + conflictCode) + "&";
        if (conflictName !== undefined)
            url_ += "ConflictName=" + encodeURIComponent("" + conflictName) + "&";
        if (taskTitle !== undefined)
            url_ += "TaskTitle=" + encodeURIComponent("" + taskTitle) + "&";
        if (taskStatus !== undefined)
            url_ += "TaskStatus=" + encodeURIComponent("" + taskStatus) + "&";
        if (conflictSite !== undefined)
            url_ += "ConflictSite=" + encodeURIComponent("" + conflictSite) + "&";
        if (sorting !== undefined)
            url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain",
                "Content-Type": "application/json-patch+json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetExportToExcel(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetExportToExcel(<any>response_);
                } catch (e) {
                    return <Observable<FileDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<FileDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetExportToExcel(response: HttpResponseBase): Observable<FileDto> {
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

    getAllConflicts(
        name: string | undefined,
        code: string | undefined,
        site: ConflictSite,
        startDate: moment.Moment | undefined,
        endDate: moment.Moment | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultDtoOfSocialConflictTaskManagementConflictListDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictTaskManagement/GetAllConflicts?";

        if (name !== undefined)
            url_ += "Name=" + encodeURIComponent("" + name) + "&";
        if (code !== undefined)
            url_ += "Code=" + encodeURIComponent("" + code) + "&";
        if (site !== undefined)
            url_ += "Site=" + encodeURIComponent("" + site) + "&";
        if (startDate !== undefined && startDate !== null)
            url_ += "StartTime=" + encodeURIComponent(startDate ? "" + startDate.toJSON() : "") + "&";
        if (endDate !== undefined && endDate !== null)
            url_ += "EndTime=" + encodeURIComponent(endDate ? "" + endDate.toJSON() : "") + "&";
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
                "Accept": "text/plain",
                "Content-Type": "application/json-patch+json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAllConflicts(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllConflicts(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfSocialConflictTaskManagementConflictListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfSocialConflictTaskManagementConflictListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllConflicts(response: HttpResponseBase): Observable<PagedResultDtoOfSocialConflictTaskManagementConflictListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfSocialConflictTaskManagementConflictListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfSocialConflictTaskManagementConflictListDto>(<any>null);
    }

    getAllPersons(
        socialConflictTaskManagementId: number | undefined,
        document: string | undefined,
        emailAddress: string | undefined,
        names: string | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultDtoOfSocialConflictTaskManagementPersonGetAllDtoListDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictTaskManagement/GetAllPersons?";

        if (socialConflictTaskManagementId !== undefined)
            url_ += "SocialConflictTaskManagementId=" + encodeURIComponent("" + socialConflictTaskManagementId) + "&";
        if (document !== undefined)
            url_ += "Document=" + encodeURIComponent("" + document) + "&";
        if (emailAddress !== undefined)
            url_ += "EmailAddress=" + encodeURIComponent("" + emailAddress) + "&";
        if (names !== undefined)
            url_ += "Names=" + encodeURIComponent("" + names) + "&";
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
            return this.processGetAllPersons(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllPersons(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfSocialConflictTaskManagementPersonGetAllDtoListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfSocialConflictTaskManagementPersonGetAllDtoListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllPersons(response: HttpResponseBase): Observable<PagedResultDtoOfSocialConflictTaskManagementPersonGetAllDtoListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfSocialConflictTaskManagementPersonGetAllDtoListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfSocialConflictTaskManagementPersonGetAllDtoListDto>(<any>null);
    }

    getConflict(id: number | undefined, site: ConflictSite): Observable<SocialConflictTaskManagementConflictDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictTaskManagement/GetConflict?";

        if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        if (site !== undefined)
            url_ += "Site=" + encodeURIComponent("" + site) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain",
                "Content-Type": "application/json-patch+json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetConflict(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetConflict(<any>response_);
                } catch (e) {
                    return <Observable<SocialConflictTaskManagementConflictDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<SocialConflictTaskManagementConflictDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetConflict(response: HttpResponseBase): Observable<SocialConflictTaskManagementConflictDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = SocialConflictTaskManagementConflictDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SocialConflictTaskManagementConflictDto>(<any>null);
    }

    getAllTask(
        conflictId: number | undefined,
        conflictCode: string | undefined,
        conflictName: string | undefined,
        taskTitle: string | undefined,
        taskStatus: SocialConflictTaskManagementStatus | undefined,
        conflictSite: ConflictSite | undefined,
        conflictType: ConflictSite | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultDtoOfSocialConflictTaskManagementGetAllDtoListDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictTaskManagement/GetAllTask?";

        if (conflictId !== undefined)
            url_ += "ConflictId=" + encodeURIComponent("" + conflictId) + "&";
        if (conflictCode !== undefined)
            url_ += "ConflictCode=" + encodeURIComponent("" + conflictCode) + "&";
        if (conflictName !== undefined)
            url_ += "ConflictName=" + encodeURIComponent("" + conflictName) + "&";
        if (taskTitle !== undefined)
            url_ += "TaskTitle=" + encodeURIComponent("" + taskTitle) + "&";
        if (taskStatus !== undefined)
            url_ += "TaskStatus=" + encodeURIComponent("" + taskStatus) + "&";
        if (conflictSite !== undefined)
            url_ += "ConflictSite=" + encodeURIComponent("" + conflictSite) + "&";
        if (conflictType !== undefined)
            url_ += "ConflictType=" + encodeURIComponent("" + conflictType) + "&";
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
                "Accept": "text/plain",
                "Content-Type": "application/json-patch+json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAllTask(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllTask(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfSocialConflictTaskManagementGetAllDtoListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfSocialConflictTaskManagementGetAllDtoListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllTask(response: HttpResponseBase): Observable<PagedResultDtoOfSocialConflictTaskManagementGetAllDtoListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfSocialConflictTaskManagementGetAllDtoListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfSocialConflictTaskManagementGetAllDtoListDto>(<any>null);
    }

    getTask(id: number): Observable<SocialConflictTaskManagementDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictTaskManagement/GetTask?";
        if (id === null)
            throw new Error("The parameter 'Id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");


        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain",
                "Content-Type": "application/json-patch+json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetTask(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetTask(<any>response_);
                } catch (e) {
                    return <Observable<SocialConflictTaskManagementDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<SocialConflictTaskManagementDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetTask(response: HttpResponseBase): Observable<SocialConflictTaskManagementDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = SocialConflictTaskManagementDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SocialConflictTaskManagementDto>(<any>null);
    }

    createTask(item: SocialConflictTaskManagementDto): Observable<SocialConflictTaskManagementDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictTaskManagement/CreateTask";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: item.toJSON(),
            headers: new HttpHeaders({
                "Accept": "text/plain",
                "Content-Type": "application/json-patch+json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processCreateTask(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateTask(<any>response_);
                } catch (e) {
                    return <Observable<SocialConflictTaskManagementDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<SocialConflictTaskManagementDto>><any>_observableThrow(response_);
        }));
    }

    protected processCreateTask(response: HttpResponseBase): Observable<SocialConflictTaskManagementDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = SocialConflictTaskManagementDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SocialConflictTaskManagementDto>(<any>null);
    }

    updateTask(item: SocialConflictTaskManagementDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictTaskManagement/UpdateTask";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: item.toJSON(),
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

    deleteTask(id: number): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictTaskManagement/DeleteTask?";
        if (id === null)
            throw new Error("The parameter 'Id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain",
                "Content-Type": "application/json-patch+json"
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

    createComment(item: SocialConflictTaskManagementCommentCreateDto): Observable<SocialConflictTaskManagementCommentDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictTaskManagement/CreateComment";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: item.toJSON(),
            headers: new HttpHeaders({
                "Accept": "text/plain",
                "Content-Type": "application/json-patch+json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processCreateComment(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateComment(<any>response_);
                } catch (e) {
                    return <Observable<SocialConflictTaskManagementCommentDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<SocialConflictTaskManagementCommentDto>><any>_observableThrow(response_);
        }));
    }

    protected processCreateComment(response: HttpResponseBase): Observable<SocialConflictTaskManagementCommentDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = SocialConflictTaskManagementCommentDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SocialConflictTaskManagementCommentDto>(<any>null);
    }

    changeStateToPending(item: EntityDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictTaskManagement/ChangeStateToPending";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: item.toJSON(),
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

    changeStateToNonComplete(item: EntityDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictTaskManagement/ChangeStateToNonComplete";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: item.toJSON(),
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

    changeStateToComplete(item: EntityDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictTaskManagement/ChangeStateToComplete";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: item.toJSON(),
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

    createTaskExtend(item: SocialConflictTaskManagementExtendCreateDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictTaskManagement/CreateTaskExtend";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: item.toJSON(),
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

    personChanges(taskId: number, changes: SocialConflictTaskAssignmentDto[]): Observable<SocialConflictTaskManagementPersonChangeDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictTaskManagement/PersonChanges";
        url_ = url_.replace(/[?&]$/, "");

        const _body = JSON.stringify({
            id: taskId,
            changes: changes
        });

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: _body,
            headers: new HttpHeaders({
                "Accept": "text/plain",
                "Content-Type": "application/json-patch+json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processPersonChanges(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPersonChanges(<any>response_);
                } catch (e) {
                    return <Observable<SocialConflictTaskManagementPersonChangeDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<SocialConflictTaskManagementPersonChangeDto>><any>_observableThrow(response_);
        }));
    }

    protected processPersonChanges(response: HttpResponseBase): Observable<SocialConflictTaskManagementPersonChangeDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = SocialConflictTaskManagementPersonChangeDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SocialConflictTaskManagementPersonChangeDto>(<any>null);
    }

    getEmailConfiguration(id: number): Observable<SocialConflictTaskManagementEmailConfigurationDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictTaskManagement/GetEmailConfiguration?";
        if (id === null)
            throw new Error("The parameter 'Id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain",
                "Content-Type": "application/json-patch+json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetEmailConfiguration(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetEmailConfiguration(<any>response_);
                } catch (e) {
                    return <Observable<SocialConflictTaskManagementEmailConfigurationDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<SocialConflictTaskManagementEmailConfigurationDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetEmailConfiguration(response: HttpResponseBase): Observable<SocialConflictTaskManagementEmailConfigurationDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = SocialConflictTaskManagementEmailConfigurationDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SocialConflictTaskManagementEmailConfigurationDto>(<any>null);
    }

    sendNotification(taskId: number, to: string[], copy: string[], subject: string, template: string): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictTaskManagement/SendNotification";
        url_ = url_.replace(/[?&]$/, "");

        const _body = JSON.stringify({
            id: taskId,
            subject: subject,
            template: template,
            to: to,
            copy: copy
        });

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: _body,
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

export interface IPagedResultDtoOfSocialConflictTaskManagementConflictListDto {
    totalCount: number;
    items: SocialConflictTaskManagementConflictDto[] | undefined;
}

export class PagedResultDtoOfSocialConflictTaskManagementConflictListDto implements IPagedResultDtoOfSocialConflictTaskManagementConflictListDto {
    totalCount!: number;
    items!: SocialConflictTaskManagementConflictDto[] | undefined;

    constructor(data?: IPagedResultDtoOfSocialConflictTaskManagementConflictListDto) {
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
                    this.items!.push(SocialConflictTaskManagementConflictDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfSocialConflictTaskManagementConflictListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfSocialConflictTaskManagementConflictListDto();
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

export interface IPagedResultDtoOfSocialConflictTaskManagementGetAllDtoListDto {
    totalCount: number;
    items: SocialConflictTaskManagementGetAllDto[] | undefined;
}

export class PagedResultDtoOfSocialConflictTaskManagementGetAllDtoListDto implements IPagedResultDtoOfSocialConflictTaskManagementGetAllDtoListDto {
    totalCount!: number;
    items!: SocialConflictTaskManagementGetAllDto[] | undefined;

    constructor(data?: IPagedResultDtoOfSocialConflictTaskManagementGetAllDtoListDto) {
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
                    this.items!.push(SocialConflictTaskManagementGetAllDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfSocialConflictTaskManagementGetAllDtoListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfSocialConflictTaskManagementGetAllDtoListDto();
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

export interface ISocialConflictTaskManagementConflictDto {
    id: number;
    creationTime: moment.Moment;
    code: string;
    name: string;
    tasks: number;
    type: ConflictSite;
}

export class SocialConflictTaskManagementConflictDto implements ISocialConflictTaskManagementConflictDto {
    id: number;
    creationTime: moment.Moment;
    code: string;
    name: string;
    tasks: number;
    type: ConflictSite;

    //Only for interface navigation purposes
    fromLink: boolean;
    selection: SocialConflictTaskManagementSelection;

    constructor(data?: ISocialConflictTaskManagementConflictDto) {
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
            this.creationTime = data["creationTime"] ? moment(data["creationTime"]) : <any>undefined;
            this.code = data["code"];
            this.name = data["name"];
            this.tasks = data["tasks"];
            this.type = data["type"];
        }
    }

    static fromJS(data: any): SocialConflictTaskManagementConflictDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictTaskManagementConflictDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["code"] = this.code;
        data["name"] = this.name;
        data["tasks"] = this.tasks;
        data["type"] = this.type;

        return data;
    }
}

export interface ISocialConflictTaskManagementGetAllDto {
    id: number;
    conflictId: number;
    conflictCode: string;
    conflictName: string;
    conflictTerritorialUnits: string;
    conflictSite: ConflictSite;
    title: string;
    creationTime: moment.Moment;
    description: string;
    status: SocialConflictTaskManagementStatus;
    startTime: moment.Moment;
    deadline: moment.Moment;
}

export class SocialConflictTaskManagementGetAllDto implements ISocialConflictTaskManagementGetAllDto {
    id: number;
    conflictId: number;
    conflictCode: string;
    conflictName: string;
    conflictTerritorialUnits: string;
    conflictSite: ConflictSite;
    title: string;
    creationTime: moment.Moment;
    description: string;
    status: SocialConflictTaskManagementStatus;
    startTime: moment.Moment;
    deadline: moment.Moment;

    constructor(data?: ISocialConflictTaskManagementGetAllDto) {
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
            this.conflictId = data["conflictId"];
            this.conflictCode = data["conflictCode"];
            this.conflictName = data["conflictName"];
            this.conflictTerritorialUnits = data["conflictTerritorialUnits"];
            this.conflictSite = data["conflictSite"];

            this.title = data["title"];
            this.creationTime = data["creationTime"] ? moment(data["creationTime"].toString()) : <any>undefined;
            this.description = data["description"];
            this.status = data["status"];
            this.startTime = data["startTime"] ? moment(data["startTime"].toString()) : <any>undefined;
            this.deadline = data["deadline"] ? moment(data["deadline"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): SocialConflictTaskManagementGetAllDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictTaskManagementGetAllDto();

        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["id"] = this.id;
        data["conflictId"] = this.conflictId;
        data["conflictCode"] = this.conflictCode;
        data["conflictName"] = this.conflictName;
        data["conflictTerritorialUnits"] = this.conflictTerritorialUnits;
        data["conflictSite"] = this.conflictSite;
        data["title"] = this.title;
        data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : <any>undefined;
        data["description"] = this.description;
        data["startTime"] = this.startTime ? this.startTime.toISOString() : <any>undefined;
        data["deadline"] = this.deadline ? this.deadline.toISOString() : <any>undefined;
        data["status"] = this.status;

        return data;
    }
}

export interface ISocialConflictTaskManagementDto {
    id: number;
    title: string;
    description: string;
    startTime: moment.Moment;
    deadline: moment.Moment;
    status: SocialConflictTaskManagementStatus;
    comments: SocialConflictTaskManagementCommentDto[];
    persons: SocialConflictTaskManagementPersonRelationDto[];
    resources: SocialConflictTaskManagementResourceDto[];
}

export class SocialConflictTaskManagementDto implements ISocialConflictTaskManagementDto {
    id: number;
    title: string;
    description: string;
    startTime: moment.Moment;
    deadline: moment.Moment;
    status: SocialConflictTaskManagementStatus;
    comments: SocialConflictTaskManagementCommentDto[];
    persons: SocialConflictTaskManagementPersonRelationDto[];
    resources: SocialConflictTaskManagementResourceDto[];

    get personNames(): string {
        return this.persons.filter(p => !p.remove).map(p => p.person.name).join(' / ');
    }

    //Only For Create
    conflict: SocialConflictTaskManagementConflictDto;

    constructor(data?: ISocialConflictTaskManagementDto) {
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
            this.title = data["title"];
            this.description = data["description"];
            this.startTime = data["startTime"] ? moment(data["startTime"].toString()) : <any>undefined;
            this.deadline = data["deadline"] ? moment(data["deadline"].toString()) : <any>undefined;
            this.status = data["status"];

            if (Array.isArray(data["comments"])) {
                this.comments = [] as any;
                for (let item of data["comments"])
                    this.comments!.push(SocialConflictTaskManagementCommentDto.fromJS(item));
            }
            if (Array.isArray(data["persons"])) {
                this.persons = [] as any;
                for (let item of data["persons"])
                    this.persons!.push(SocialConflictTaskManagementPersonRelationDto.fromJS(item));
            }
            if (Array.isArray(data["resources"])) {
                this.resources = [] as any;
                for (let item of data["resources"])
                    this.resources!.push(SocialConflictTaskManagementResourceDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SocialConflictTaskManagementDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictTaskManagementDto();

        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["title"] = this.title;
        data["description"] = this.description;
        data["startTime"] = this.startTime ? this.startTime.toISOString() : <any>undefined;
        data["deadline"] = this.deadline ? this.deadline.toISOString() : <any>undefined;
        data["status"] = this.status;
        data["conflictId"] = this.conflict ? this.conflict.id : <any>undefined;
        data["site"] = this.conflict ? this.conflict.type : <any>undefined;
        
        if (Array.isArray(this.persons)) {
            data["persons"] = [];
            for (let item of this.persons)
                data["persons"].push(item.toJSON());
        }
        if (Array.isArray(this.resources)) {
            data["resources"] = [];
            for (let item of this.resources)
                data["resources"].push(item.toJSON());
        }

        return data;
    }
}

export interface ISocialConflictTaskManagementPersonRelationDto {
    id: number;
    person: SocialConflictTaskManagementPersonDto;
    remove: boolean;
}

export class SocialConflictTaskManagementPersonRelationDto implements ISocialConflictTaskManagementPersonRelationDto {
    id: number;
    person: SocialConflictTaskManagementPersonDto;

    //readonly
    remove: boolean;

    constructor(data?: ISocialConflictTaskManagementPersonRelationDto) {
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
            this.person = data["person"] ? SocialConflictTaskManagementPersonDto.fromJS(data["person"]) : <any>undefined;
        }
    }

    static fromJS(data: any): SocialConflictTaskManagementPersonRelationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictTaskManagementPersonRelationDto();

        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["person"] = this.person ? this.person.toJSON() : <any>undefined;
        data["remove"] = this.remove;

        return data;
    }
}

export interface ISocialConflictTaskManagementCommentCreateDto {
    description: string;
    socialConflictTaskManagement: EntityDto;
}

export class SocialConflictTaskManagementCommentCreateDto implements ISocialConflictTaskManagementCommentCreateDto {
    description: string;
    socialConflictTaskManagement: EntityDto;

    constructor(data?: ISocialConflictTaskManagementCommentCreateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.socialConflictTaskManagement = data["socialConflictTaskManagement"] ? EntityDto.fromJS(data["socialConflictTaskManagement"]) : <any>undefined;
            this.description = data["description"];
        }
    }

    static fromJS(data: any): SocialConflictTaskManagementCommentCreateDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictTaskManagementCommentCreateDto();

        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["description"] = this.description;
        data["socialConflictTaskManagement"] = this.socialConflictTaskManagement ? this.socialConflictTaskManagement.toJSON() : <any>undefined;

        return data;
    }
}

export interface ISocialConflictTaskManagementCommentDto {
    id: number;
    description: string;
    creationTime: moment.Moment;
    user: TaskUserDto;
    type: SocialConflictTaskManagementCommentType;
}

export class SocialConflictTaskManagementCommentDto implements ISocialConflictTaskManagementCommentDto {
    id: number;
    description: string;
    creationTime: moment.Moment;
    user: TaskUserDto;
    type: SocialConflictTaskManagementCommentType;

    constructor(data?: ISocialConflictTaskManagementCommentDto) {
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
            this.description = data["description"];
            this.creationTime = data["creationTime"] ? moment(data["creationTime"].toString()) : <any>undefined;
            this.user = data["user"] ? TaskUserDto.fromJS(data["user"]) : <any>undefined;
            this.type = data["type"];
        }
    }

    static fromJS(data: any): SocialConflictTaskManagementCommentDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictTaskManagementCommentDto();

        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["id"] = this.id;
        data["description"] = this.description;

        return data;
    }
}

export interface ITaskUserDto {
    id: number;
    name: string;
    surname: string;
}

export class TaskUserDto implements ITaskUserDto {
    id: number;
    name: string;
    surname: string;

    constructor(data?: ITaskUserDto) {
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
        }
    }

    static fromJS(data: any): TaskUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new TaskUserDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["surname"] = this.surname;

        return data;
    }
}

export enum SocialConflictTaskManagementStatus {
    None,
    Pending,
    Completed,
    NonCompleted
}

export enum SocialConflictTaskManagementCommentType {
    SYSTEM,
    USER
}

export interface ISocialConflictTaskManagementExtendCreateDto {
    description: string;
    deadline: moment.Moment;
    socialConflictTaskManagement: EntityDto;
}

export class SocialConflictTaskManagementExtendCreateDto implements ISocialConflictTaskManagementExtendCreateDto {
    description: string;
    deadline: moment.Moment;
    socialConflictTaskManagement: EntityDto;

    constructor(data?: ISocialConflictTaskManagementExtendCreateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.description = data["description"];
            this.deadline = data["deadline"] ? moment(data["deadline"]) : <any>undefined;
            this.socialConflictTaskManagement = data["socialConflictTaskManagement"] ? EntityDto.fromJS(data["socialConflictTaskManagement"]) : <any>undefined;
        }
    }

    static fromJS(data: any): TaskUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new TaskUserDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["description"] = this.description;
        data["deadline"] = this.deadline ? this.deadline.toISOString() : <any>undefined;
        data["socialConflictTaskManagement"] = this.socialConflictTaskManagement ? this.socialConflictTaskManagement.toJSON() : <any>undefined;

        return data;
    }
}

export interface IPagedResultDtoOfSocialConflictTaskManagementPersonGetAllDtoListDto {
    totalCount: number;
    items: SocialConflictTaskManagementPersonDto[] | undefined;
}

export class PagedResultDtoOfSocialConflictTaskManagementPersonGetAllDtoListDto implements IPagedResultDtoOfSocialConflictTaskManagementPersonGetAllDtoListDto {
    totalCount!: number;
    items!: SocialConflictTaskManagementPersonDto[] | undefined;

    constructor(data?: IPagedResultDtoOfSocialConflictTaskManagementPersonGetAllDtoListDto) {
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
                    this.items!.push(SocialConflictTaskManagementPersonDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfSocialConflictTaskManagementPersonGetAllDtoListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfSocialConflictTaskManagementPersonGetAllDtoListDto();
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

export interface ISocialConflictTaskManagementPersonDto {
    id: number;
    document: string;
    name: string;
    emailAddress: string;
    type: PersonType;
}

export class SocialConflictTaskManagementPersonDto implements ISocialConflictTaskManagementPersonDto {
    id: number;
    document: string;
    name: string;
    emailAddress: string;
    type: PersonType;
    selected: boolean;

    constructor(data?: ISocialConflictTaskManagementPersonDto) {
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
            this.document = data["document"];
            this.name = data["name"];
            this.emailAddress = data["emailAddress"];
            this.type = data["type"];
            this.selected = data["selected"];
        }
    }

    static fromJS(data: any): SocialConflictTaskManagementPersonDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictTaskManagementPersonDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["document"] = this.document;
        data["name"] = this.name;
        data["emailAddress"] = this.emailAddress;
        data["type"] = this.type;

        return data;
    }
}

export interface ISocialConflictTaskAssignmentDto {
    id: number;
    person: SocialConflictTaskManagementPersonDto
    checked: boolean;
}

export class SocialConflictTaskAssignmentDto implements ISocialConflictTaskAssignmentDto {
    id: number;
    person: SocialConflictTaskManagementPersonDto;
    checked: boolean;

    constructor(data?: ISocialConflictTaskAssignmentDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["personId"];
            this.checked = _data["checked"];
        }
    }

    static fromJS(data: any): SocialConflictTaskAssignmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictTaskAssignmentDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["personId"] = this.id;
        data["checked"] = this.checked;

        return data;
    }
}

export interface ISocialConflictTaskManagementPersonChangeDto {
    persons: SocialConflictTaskManagementPersonRelationDto[];
}

export class SocialConflictTaskManagementPersonChangeDto implements ISocialConflictTaskManagementPersonChangeDto {
    persons: SocialConflictTaskManagementPersonRelationDto[];

    constructor(data?: ISocialConflictTaskManagementPersonChangeDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["persons"])) {
                this.persons = [] as any;
                for (let item of _data["persons"])
                    this.persons!.push(SocialConflictTaskManagementPersonRelationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SocialConflictTaskManagementPersonChangeDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictTaskManagementPersonChangeDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.persons)) {
            data["persons"] = [];
            for (let item of this.persons)
                data["persons"].push(item.toJSON());
        }

        return data;
    }
}

export interface ISocialConflictTaskManagementResourceDto {
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

export class SocialConflictTaskManagementResourceDto implements ISocialConflictTaskManagementResourceDto {
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

    constructor(data?: ISocialConflictTaskManagementResourceDto) {
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

    static fromJS(data: any): SocialConflictTaskManagementResourceDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictTaskManagementResourceDto();
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

export interface ISocialConflictTaskManagementEmailConfigurationDto {
    id: number;
    subject: string;
    template: string;
}

export class SocialConflictTaskManagementEmailConfigurationDto implements ISocialConflictTaskManagementEmailConfigurationDto {
    id: number;
    subject: string;
    template: string;

    constructor(data?: ISocialConflictTaskManagementEmailConfigurationDto) {
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
            this.subject = data["subject"];
            this.template = data["template"];
        }
    }

    static fromJS(data: any): SocialConflictTaskManagementEmailConfigurationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictTaskManagementEmailConfigurationDto();
        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["subject"] = this.subject;
        data["template"] = this.template;

        return data;
    }
}

export enum SocialConflictTaskManagementSelection {
    List,
    Search,
    Calendar
}