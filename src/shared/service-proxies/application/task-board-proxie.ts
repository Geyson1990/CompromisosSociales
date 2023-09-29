import { AttachmentUploadDto, UtilityParameterDto, UtilityRecordDto, UtilityResponsibleActorDto, UtilityResponsibleSubActorDto, UtilitySocialConflictLocationDto } from "./utility-proxie";
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete, getRandomColor, pickTextColorBasedOnBgColorAdvanced, EntityDto, FileDto, PersonType } from '../service-proxies';
import * as moment from "moment";
import { CompromiseType } from "./compromise-proxie";

@Injectable()
export class TaskBoardServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getMatrixToExcel(
        compromise: number | undefined,
        filter: string | undefined,
        status: TaskStatus | undefined,
        description: string | undefined,
        compromiseName: string | undefined,
        sorting: string | undefined): Observable<FileDto> {
        let url_ = this.baseUrl + "/api/services/app/TaskManagement/GetMatrixToExcel?";

        if (compromise !== undefined)
            url_ += "Compromise=" + encodeURIComponent("" + compromise) + "&";
        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (status !== undefined)
            url_ += "Status=" + encodeURIComponent("" + status) + "&";
        if (description !== undefined)
            url_ += "Description=" + encodeURIComponent("" + description) + "&";
        if (compromiseName !== undefined)
            url_ += "CompromiseName=" + encodeURIComponent("" + compromiseName) + "&";
        if (sorting !== undefined)
            url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";

        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
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

    getAllPersons(
        taskManagementId: number | undefined,
        document: string | undefined,
        emailAddress: string | undefined,
        names: string | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultDtoOfTaskManagementPersonGetAllDtoListDto> {
        let url_ = this.baseUrl + "/api/services/app/TaskManagement/GetAllPersons?";

        if (taskManagementId !== undefined)
            url_ += "TaskManagementId=" + encodeURIComponent("" + taskManagementId) + "&";
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
                    return <Observable<PagedResultDtoOfTaskManagementPersonGetAllDtoListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfTaskManagementPersonGetAllDtoListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllPersons(response: HttpResponseBase): Observable<PagedResultDtoOfTaskManagementPersonGetAllDtoListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfTaskManagementPersonGetAllDtoListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfTaskManagementPersonGetAllDtoListDto>(<any>null);
    }

    getAllCompromises(
        filter: string | undefined,
        compromiseType: number | undefined,
        compromiseCode: string | undefined,
        recordCode: string | undefined,
        socialCode: string | undefined,
        territorialUnit: number | undefined,
        startDate: moment.Moment | undefined,
        endDate: moment.Moment | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultDtoOfTaskManagementCompromiseListDto> {
        let url_ = this.baseUrl + "/api/services/app/TaskManagement/GetAllCompromises?";

        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (compromiseType !== undefined)
            url_ += "Type=" + encodeURIComponent("" + compromiseType) + "&";
        if (compromiseCode !== undefined)
            url_ += "Code=" + encodeURIComponent("" + compromiseCode) + "&";
        if (recordCode !== undefined)
            url_ += "CodeRecord=" + encodeURIComponent("" + recordCode) + "&";
        if (socialCode !== undefined)
            url_ += "CodeSocialConflict=" + encodeURIComponent("" + socialCode) + "&";
        if (territorialUnit !== undefined)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnit) + "&";
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
            return this.processGetAllCompromises(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllCompromises(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfTaskManagementCompromiseListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfTaskManagementCompromiseListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllCompromises(response: HttpResponseBase): Observable<PagedResultDtoOfTaskManagementCompromiseListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfTaskManagementCompromiseListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfTaskManagementCompromiseListDto>(<any>null);
    }

    getCompromise(id: number | undefined): Observable<TaskManagementCompromiseDto> {
        let url_ = this.baseUrl + "/api/services/app/TaskManagement/GetCompromise?";

        if (id !== undefined)
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
            return this.processGetCompromise(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCompromise(<any>response_);
                } catch (e) {
                    return <Observable<TaskManagementCompromiseDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<TaskManagementCompromiseDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetCompromise(response: HttpResponseBase): Observable<TaskManagementCompromiseDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = TaskManagementCompromiseDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<TaskManagementCompromiseDto>(<any>null);
    }

    getAllTasks(
        compromise: number | undefined,
        filter: string | undefined,
        status: TaskStatus | undefined,
        title: string | undefined,
        description: string | undefined,
        compromiseName: string | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultDtoOfTaskManagementGetAllDtoListDto> {
        let url_ = this.baseUrl + "/api/services/app/TaskManagement/GetTaskAll?";

        if (compromise !== undefined)
            url_ += "Compromise=" + encodeURIComponent("" + compromise) + "&";
        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (status !== undefined)
            url_ += "Status=" + encodeURIComponent("" + status) + "&";
        if (description !== undefined)
            url_ += "Description=" + encodeURIComponent("" + description) + "&";
        if (title !== undefined)
            url_ += "Title=" + encodeURIComponent("" + title) + "&";
        if (compromiseName !== undefined)
            url_ += "CompromiseName=" + encodeURIComponent("" + compromiseName) + "&";
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
            return this.processGetAllTask(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllTask(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfTaskManagementGetAllDtoListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfTaskManagementGetAllDtoListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllTask(response: HttpResponseBase): Observable<PagedResultDtoOfTaskManagementGetAllDtoListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfTaskManagementGetAllDtoListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfTaskManagementGetAllDtoListDto>(<any>null);
    }

    getTask(id: number): Observable<TaskManagementDto> {
        let url_ = this.baseUrl + "/api/services/app/TaskManagement/GetTask?";
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
            return this.processGetTask(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetTask(<any>response_);
                } catch (e) {
                    return <Observable<TaskManagementDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<TaskManagementDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetTask(response: HttpResponseBase): Observable<TaskManagementDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = TaskManagementDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<TaskManagementDto>(<any>null);
    }

    createTask(item: TaskManagementDto): Observable<TaskManagementDto> {
        let url_ = this.baseUrl + "/api/services/app/TaskManagement/CreateTask";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: item.toJSON(),
            headers: new HttpHeaders({
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processCreateTask(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateTask(<any>response_);
                } catch (e) {
                    return <Observable<TaskManagementDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<TaskManagementDto>><any>_observableThrow(response_);
        }));
    }

    protected processCreateTask(response: HttpResponseBase): Observable<TaskManagementDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = TaskManagementDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<TaskManagementDto>(<any>null);
    }

    updateTask(item: TaskManagementDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/TaskManagement/UpdateTask";

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

    deleteTask(id: number): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/TaskManagement/DeleteTask?";
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

    createComment(item: TaskCommentCreateDto): Observable<TaskCommentDto> {
        let url_ = this.baseUrl + "/api/services/app/TaskManagement/CreateComment";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: item.toJSON(),
            headers: new HttpHeaders({
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processCreateComment(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateComment(<any>response_);
                } catch (e) {
                    return <Observable<TaskCommentDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<TaskCommentDto>><any>_observableThrow(response_);
        }));
    }

    protected processCreateComment(response: HttpResponseBase): Observable<TaskCommentDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = TaskCommentDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<TaskCommentDto>(<any>null);
    }

    changeStateToPending(item: EntityDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/TaskManagement/ChangeStateToPending";

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

    changeStateToNonComplete(item: EntityDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/TaskManagement/ChangeStateToNonComplete";

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

    changeStateToComplete(item: EntityDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/TaskManagement/ChangeStateToComplete";

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

    createTaskExtend(item: TaskManagementExtendCreateDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/TaskManagement/CreateTaskExtend";
        url_ = url_.replace(/[?&]$/, "");

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
    
    getEmailConfiguration(id: number): Observable<TaskManagementEmailConfigurationDto> {
        let url_ = this.baseUrl + "/api/services/app/TaskManagement/GetEmailConfiguration?";
        if (id === null)
            throw new Error("The parameter 'Id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetEmailConfiguration(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetEmailConfiguration(<any>response_);
                } catch (e) {
                    return <Observable<TaskManagementEmailConfigurationDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<TaskManagementEmailConfigurationDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetEmailConfiguration(response: HttpResponseBase): Observable<TaskManagementEmailConfigurationDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = TaskManagementEmailConfigurationDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<TaskManagementEmailConfigurationDto>(<any>null);
    }

    sendNotification(taskId: number, to: string[], copy: string[], subject: string, template: string): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/TaskManagement/SendNotification";
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
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
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

export interface IPagedResultDtoOfTaskManagementCompromiseListDto {
    totalCount: number;
    items: TaskManagementCompromiseDto[] | undefined;
}

export class PagedResultDtoOfTaskManagementCompromiseListDto implements IPagedResultDtoOfTaskManagementCompromiseListDto {
    totalCount!: number;
    items!: TaskManagementCompromiseDto[] | undefined;

    constructor(data?: IPagedResultDtoOfTaskManagementCompromiseListDto) {
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
                    this.items!.push(TaskManagementCompromiseDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfTaskManagementCompromiseListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfTaskManagementCompromiseListDto();
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

export interface IPagedResultDtoOfTaskManagementGetAllDtoListDto {
    totalCount: number;
    items: TaskManagementGetAllDto[] | undefined;
}

export class PagedResultDtoOfTaskManagementGetAllDtoListDto implements IPagedResultDtoOfTaskManagementGetAllDtoListDto {
    totalCount!: number;
    items!: TaskManagementGetAllDto[] | undefined;

    constructor(data?: IPagedResultDtoOfTaskManagementGetAllDtoListDto) {
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
                    this.items!.push(TaskManagementGetAllDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfTaskManagementGetAllDtoListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfTaskManagementGetAllDtoListDto();
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

export interface ITaskManagementCompromiseDto {
    id: number;
    code: string;
    name: string;
    description: string;
    transcription: string;
    creationTime: moment.Moment;
    record: UtilityRecordDto;
    type: CompromiseType;
    territorialUnits: string;
    status: UtilityParameterDto;
    isPriority: boolean;
    priorityReference: string;
    fromLink: boolean;
}

export class TaskManagementCompromiseDto implements ITaskManagementCompromiseDto {
    id: number;
    code: string;
    name: string;
    description: string;
    transcription: string;
    creationTime: moment.Moment;
    record: UtilityRecordDto;
    type: CompromiseType;
    territorialUnits: string;
    status: UtilityParameterDto;
    isPriority: boolean;
    priorityReference: string;
    background: string;
    color: string;
    fromLink: boolean;
    selection: TaskSelection;

    constructor(data?: ITaskManagementCompromiseDto) {
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
            this.code = data["code"];
            this.name = data["name"];
            this.description = data["description"];
            this.transcription = data["transcription"];
            this.creationTime = data["creationTime"] ? moment(data["creationTime"]) : <any>undefined;
            this.record = data["record"] ? UtilityRecordDto.fromJS(data["record"]) : <any>undefined;
            this.type = data["type"];
            this.territorialUnits = data["territorialUnits"];
            this.status = data["status"] ? UtilityParameterDto.fromJS(data["status"]) : <any>undefined;
            this.isPriority = data["isPriority"];
            this.priorityReference = data["priorityReference"];
            this.background = getRandomColor();
            this.color = pickTextColorBasedOnBgColorAdvanced(this.background);
        }
    }

    static fromJS(data: any): TaskManagementCompromiseDto {
        data = typeof data === 'object' ? data : {};
        let result = new TaskManagementCompromiseDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["code"] = this.code;
        data["name"] = this.name;
        data["description"] = this.description;
        data["transcription"] = this.transcription;
        data["record"] = this.record ? this.record.toJSON() : <any>undefined;
        data["type"] = this.type;
        data["status"] = this.status ? this.status.toJSON() : <any>undefined;
        data["isPriority"] = this.isPriority;
        data["priorityReference"] = this.priorityReference;
        data["id"] = this.id;

        return data;
    }
}

export interface ITaskManagementGetAllDto {
    id: number;
    title: string;
    description: string;
    startTime: moment.Moment;
    deadline: moment.Moment;
    status: TaskStatus;
    responsible: string;
    comments: TaskCommentDto[];
    caseCode: string;
    recordCode: string;
    compromiseCode: string;
    compromiseName: string;
    advance: string;
    compromiseId: number;
}

export class TaskManagementGetAllDto implements ITaskManagementGetAllDto {
    id: number;
    title: string;
    description: string;
    startTime: moment.Moment;
    deadline: moment.Moment;
    status: TaskStatus;
    responsible: string;
    comments: TaskCommentDto[];
    caseCode: string;
    recordCode: string;
    compromiseCode: string;
    compromiseName: string;
    advance: string;
    alert: string;
    compromiseId: number;

    constructor(data?: ITaskManagementGetAllDto) {
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
            this.responsible = data["responsible"];
            this.caseCode = data["caseCode"];
            this.recordCode = data["recordCode"];
            this.compromiseCode = data["compromiseCode"];
            this.compromiseName = data["compromiseName"];
            this.advance = data["advance"];
            this.alert = data["alert"];
            this.compromiseId = data["compromiseId"];

            if (Array.isArray(data["comments"])) {
                this.comments = [] as any;
                for (let item of data["comments"])
                    this.comments!.push(TaskCommentDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): TaskManagementGetAllDto {
        data = typeof data === 'object' ? data : {};
        let result = new TaskManagementGetAllDto();

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
        data["responsible"] = this.responsible;
        data["caseCode"] = this.caseCode;
        data["recordCode"] = this.recordCode;
        data["compromiseCode"] = this.compromiseCode;
        data["compromiseName"] = this.compromiseName;
        data["advance"] = this.advance;
        data["compromiseId"] = this.compromiseId;

        if (Array.isArray(this.comments)) {
            data["comments"] = [];
            for (let item of this.comments)
                data["comments"].push(item.toJSON());
        }

        return data;
    }
}

export interface ITaskManagementDto {
    id: number;
    title: string;
    description: string;
    startTime: moment.Moment;
    deadline: moment.Moment;
    status: TaskStatus;
    comments: TaskCommentDto[];
    compromise: TaskManagementCompromiseDto;
    persons: TaskManagementPersonRelationDto[];
}

export class TaskManagementDto implements ITaskManagementDto {
    id: number;
    title: string;
    description: string;
    startTime: moment.Moment;
    deadline: moment.Moment;
    status: TaskStatus;
    comments: TaskCommentDto[];
    compromise: TaskManagementCompromiseDto;
    persons: TaskManagementPersonRelationDto[];

    get personNames(): string {
        return this.persons.filter(p => !p.remove).map(p => p.person.name).join(' / ');
    }

    constructor(data?: ITaskManagementDto) {
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
            this.compromise = data["compromise"] ? TaskManagementCompromiseDto.fromJS(data["compromise"]) : <any>undefined;
            this.status = data["status"];

            if (Array.isArray(data["comments"])) {
                this.comments = [] as any;
                for (let item of data["comments"])
                    this.comments!.push(TaskCommentDto.fromJS(item));
            }
            if (Array.isArray(data["persons"])) {
                this.persons = [] as any;
                for (let item of data["persons"])
                    this.persons!.push(TaskManagementPersonRelationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): TaskManagementDto {
        data = typeof data === 'object' ? data : {};
        let result = new TaskManagementDto();

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
        data["compromise"] = this.compromise ? this.compromise.toJSON() : <any>undefined;
        if (Array.isArray(this.comments)) {
            data["comments"] = [];
            for (let item of this.comments)
                data["comments"].push(item.toJSON());
        }
        if (Array.isArray(this.persons)) {
            data["persons"] = [];
            for (let item of this.persons)
                data["persons"].push(item.toJSON());
        }

        return data;
    }
}

export interface ITaskManagementPersonRelationDto {
    id: number;
    person: TaskManagementPersonDto;
    remove: boolean;
}

export class TaskManagementPersonRelationDto implements ITaskManagementPersonRelationDto {
    id: number;
    person: TaskManagementPersonDto;
    remove: boolean;

    constructor(data?: ITaskManagementPersonRelationDto) {
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
            this.person = data["person"] ? TaskManagementPersonDto.fromJS(data["person"]) : <any>undefined;
        }
    }

    static fromJS(data: any): TaskManagementPersonRelationDto {
        data = typeof data === 'object' ? data : {};
        let result = new TaskManagementPersonRelationDto();

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

export interface ITaskCommentCreateDto {
    description: string;
    taskManagement: EntityDto;
}

export class TaskCommentCreateDto implements ITaskCommentCreateDto {
    description: string;
    taskManagement: EntityDto;

    constructor(data?: ITaskCommentCreateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.taskManagement = data["taskManagement"] ? EntityDto.fromJS(data["taskManagement"]) : <any>undefined;
            this.description = data["description"];
        }
    }

    static fromJS(data: any): TaskCommentDto {
        data = typeof data === 'object' ? data : {};
        let result = new TaskCommentDto();

        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["description"] = this.description;
        data["taskManagement"] = this.taskManagement ? this.taskManagement.toJSON() : <any>undefined;

        return data;
    }
}

export interface ITaskCommentDto {
    id: number;
    description: string;
    creationTime: moment.Moment;
    user: TaskUserDto;
    type: CommentType;
}

export class TaskCommentDto implements ITaskCommentDto {
    id: number;
    description: string;
    creationTime: moment.Moment;
    user: TaskUserDto;
    type: CommentType;

    constructor(data?: ITaskCommentDto) {
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

    static fromJS(data: any): TaskCommentDto {
        data = typeof data === 'object' ? data : {};
        let result = new TaskCommentDto();

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

export enum TaskStatus {
    None,
    Pending,
    Completed,
    NonCompleted
}

export enum CommentType {
    SYSTEM,
    USER
}

export interface ITaskManagementExtendCreateDto {
    description: string;
    deadline: moment.Moment;
    taskManagement: EntityDto;
}

export class TaskManagementExtendCreateDto implements ITaskManagementExtendCreateDto {
    description: string;
    deadline: moment.Moment;
    taskManagement: EntityDto;

    constructor(data?: ITaskManagementExtendCreateDto) {
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
            this.taskManagement = data["taskManagement"] ? EntityDto.fromJS(data["taskManagement"]) : <any>undefined;
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
        data["taskManagement"] = this.taskManagement ? this.taskManagement.toJSON() : <any>undefined;

        return data;
    }
}

export interface IPagedResultDtoOfTaskManagementPersonGetAllDtoListDto {
    totalCount: number;
    items: TaskManagementPersonDto[] | undefined;
}

export class PagedResultDtoOfTaskManagementPersonGetAllDtoListDto implements IPagedResultDtoOfTaskManagementPersonGetAllDtoListDto {
    totalCount!: number;
    items!: TaskManagementPersonDto[] | undefined;

    constructor(data?: IPagedResultDtoOfTaskManagementPersonGetAllDtoListDto) {
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
                    this.items!.push(TaskManagementPersonDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfTaskManagementPersonGetAllDtoListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfTaskManagementPersonGetAllDtoListDto();
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

export interface ITaskManagementPersonDto {
    id: number;
    document: string;
    name: string;
    emailAddress: string;
    type: PersonType;
}

export class TaskManagementPersonDto implements ITaskManagementPersonDto {
    id: number;
    document: string;
    name: string;
    emailAddress: string;
    type: PersonType;
    selected: boolean;

    constructor(data?: ITaskManagementPersonDto) {
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

    static fromJS(data: any): TaskManagementPersonDto {
        data = typeof data === 'object' ? data : {};
        let result = new TaskManagementPersonDto();
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

export interface ITaskManagementPersonChangeDto {
    persons: TaskManagementPersonRelationDto[];
}

export class TaskManagementPersonChangeDto implements ITaskManagementPersonChangeDto {
    persons: TaskManagementPersonRelationDto[];

    constructor(data?: ITaskManagementPersonChangeDto) {
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
                    this.persons!.push(TaskManagementPersonRelationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): TaskManagementPersonChangeDto {
        data = typeof data === 'object' ? data : {};
        let result = new TaskManagementPersonChangeDto();
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

export interface ITaskManagementAssignmentDto {
    id: number;
    person: TaskManagementPersonDto
    checked: boolean;
}

export class TaskManagementAssignmentDto implements ITaskManagementAssignmentDto {
    id: number;
    person: TaskManagementPersonDto;
    checked: boolean;

    constructor(data?: ITaskManagementAssignmentDto) {
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

    static fromJS(data: any): TaskManagementAssignmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new TaskManagementAssignmentDto();
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

export interface ITaskManagementEmailConfigurationDto {
    id: number;
    subject: string;
    template: string;
}

export class TaskManagementEmailConfigurationDto implements ITaskManagementEmailConfigurationDto {
    id: number;
    subject: string;
    template: string;

    constructor(data?: ITaskManagementEmailConfigurationDto) {
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

    static fromJS(data: any): TaskManagementEmailConfigurationDto {
        data = typeof data === 'object' ? data : {};
        let result = new TaskManagementEmailConfigurationDto();
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

export enum TaskSelection {
    List,
    Search,
    Calendar
}
