import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete, FileDto } from '../service-proxies';
import { AttachmentResourceTypeDto, AttachmentUploadDto, UtilitySocialConflictDto } from "./utility-proxie";
import * as moment from 'moment';

@Injectable()
export class RecordServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";

    }

    getAll(
        filter: string | undefined,
        socialConflictCode: string | undefined,
        recordcode: string | undefined,
        territorialUnit: number | undefined,
        startDate: moment.Moment | undefined,
        endDate: moment.Moment | undefined,
        filterByDate: boolean | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultDtoOfRecordListDto> {
        let url_ = this.baseUrl + "/api/services/app/Record/GetAll?";
        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (recordcode !== undefined)
            url_ += "Code=" + encodeURIComponent("" + recordcode) + "&";
        if (territorialUnit !== undefined)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnit) + "&";
        if (socialConflictCode !== undefined)
            url_ += "SocialConflictCode=" + encodeURIComponent("" + socialConflictCode) + "&";
        if (sorting !== undefined)
            url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
        if (filterByDate !== undefined)
            url_ += "FilterByDate=" + encodeURIComponent("" + filterByDate) + "&";
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
                    return <Observable<PagedResultDtoOfRecordListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfRecordListDto>><any>_observableThrow(response_);
        }));
    }

    getAllPersons(
        filter: string | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultDtoOfRecordPersonsListDto> {
        let url_ = this.baseUrl + "/api/services/app/Record/GetAllPersons?";
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
            return this.processGetAllPersons(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllPersons(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfRecordPersonsListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfRecordPersonsListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllPersons(response: HttpResponseBase): Observable<PagedResultDtoOfRecordPersonsListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfRecordPersonsListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfRecordPersonsListDto>(<any>null);
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfRecordListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfRecordListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfRecordListDto>(<any>null);
    }

    getMatrixToExcel(
        filter: string | undefined,
        socialConflictCode: string | undefined,
        recordcode: string | undefined,
        territorialUnit: number | undefined,
        startDate: moment.Moment | undefined,
        endDate: moment.Moment | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<FileDto> {
        let url_ = this.baseUrl + "/api/services/app/Record/GetMatrixToExcel?";
        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (recordcode !== undefined)
            url_ += "Code=" + encodeURIComponent("" + recordcode) + "&";
        if (territorialUnit !== undefined)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnit) + "&";
        if (socialConflictCode !== undefined)
            url_ += "SocialConflictCode=" + encodeURIComponent("" + socialConflictCode) + "&";
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

    get(id: number): Observable<RecordGetDataDto> {
        let url_ = this.baseUrl + "/api/services/app/Record/Get?";
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
                    return <Observable<RecordGetDataDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<RecordGetDataDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<RecordGetDataDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = RecordGetDataDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<RecordGetDataDto>(<any>null);
    }

    create(item: RecordDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/Record/Create";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: item.toJSON(),
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

    createSendAlert(item: any): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/Record/GenerateSendAlert";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: item,
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

    update(item: RecordDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/Record/Update";

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
        let url_ = this.baseUrl + "/api/services/app/Record/Delete?";
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

    deleteResource(id: number): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/Record/DeleteResource?";
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
 
    getActasZip(
        filter: string | undefined,
        socialConflictCode: string | undefined,
        recordcode: string | undefined,
        territorialUnit: number | undefined,
        startDate: moment.Moment | undefined,
        endDate: moment.Moment | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<FileDto> {
        let url_ = this.baseUrl + "/api/services/app/Record/GetActasZip?";
        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (recordcode !== undefined)
            url_ += "Code=" + encodeURIComponent("" + recordcode) + "&";
        if (territorialUnit !== undefined)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnit) + "&";
        if (socialConflictCode !== undefined)
            url_ += "SocialConflictCode=" + encodeURIComponent("" + socialConflictCode) + "&";
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
}

export interface IPagedResultDtoOfRecordListDto {
    totalCount: number;
    items: RecordDto[] | undefined;
}

export interface IPagedResultDtoOfRecordPersonsListDto {
    totalCount: number;
    items: RecordPersonsDto[] | undefined;
}

export interface IPagedResultDtoOfRecordPersonsListDto {
    totalCount: number;
    items: RecordPersonsDto[] | undefined;
}
export class PagedResultDtoOfRecordPersonsListDto implements IPagedResultDtoOfRecordPersonsListDto {
    totalCount!: number;
    items!: RecordPersonsDto[] | undefined;

    constructor(data?: IPagedResultDtoOfRecordPersonsListDto) {
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
                    this.items!.push(RecordPersonsDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfRecordPersonsListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfRecordPersonsListDto();
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

export class PagedResultDtoOfRecordListDto implements IPagedResultDtoOfRecordListDto {
    totalCount!: number;
    items!: RecordDto[] | undefined;

    constructor(data?: IPagedResultDtoOfRecordListDto) {
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
                    this.items!.push(RecordDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfRecordListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfRecordListDto();
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

export interface IRecordGetDataDto {
    record: RecordDto;
    resourceTypes: AttachmentResourceTypeDto[];
}

export class RecordGetDataDto implements IRecordGetDataDto {
    record: RecordDto;
    resourceTypes: AttachmentResourceTypeDto[];

    constructor(data?: IRecordGetDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.resourceTypes = [];
        }
    }

    init(_data?: any) {
        if (_data) {
            this.record = _data["record"] ? RecordDto.fromJS(_data["record"]) : <any>undefined;
            if (Array.isArray(_data["resourceTypes"])) {
                this.resourceTypes = [] as any;
                for (let item of _data["resourceTypes"])
                    this.resourceTypes!.push(AttachmentResourceTypeDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): RecordGetDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new RecordGetDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["record"] = this.record ? this.record.toJSON() : <any>undefined;
        if (Array.isArray(this.resourceTypes)) {
            data["resourceTypes"] = [];
            for (let item of this.resourceTypes)
                data["resourceTypes"].push(item.toJSON());
        }

        return data;
    }
}

export interface IRecordDto {
    id: number;
    socialConflict: UtilitySocialConflictDto;
    code: string;
    title: string;
    territorialUnits: string;
    recordTime: moment.Moment;
    creationTime: moment.Moment;
    lastModificationTime: moment.Moment;
    creatorUser: RecordUserDto;
    editUser: RecordUserDto;
    womanCompromise: boolean;
    resources: RecordResourceDto[];
    uploadFiles: AttachmentUploadDto[];
}

export interface IRecordPersonsDto {
    id: number;
    name: string;
    emailAddress: string;
    type: number;
    alertSend: boolean;
}

export class RecordPersonsDto implements IRecordPersonsDto {
    id: number;
    name: string;
    emailAddress: string;
    type: number;
    alertSend: boolean;

    constructor(data?: IRecordPersonsDto) {
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
            this.emailAddress = _data["emailAddress"];
            this.type = _data["type"];
            this.alertSend = _data["alertSend"];   
        }
    }

    static fromJS(data: any): RecordPersonsDto {
        data = typeof data === 'object' ? data : {};
        let result = new RecordPersonsDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["id"] = this.id;
        data["name"] = this.name;
        data["emailAddress"] = this.emailAddress;
        data["type"] = this.type;
        data["alertSend"] = this.alertSend;
        return data;
    }
}


export class RecordDto implements IRecordDto {
    id: number;
    socialConflict: UtilitySocialConflictDto;
    code: string;
    title: string;
    territorialUnits: string;
    recordTime: moment.Moment;
    creationTime: moment.Moment;
    lastModificationTime: moment.Moment;
    creatorUser: RecordUserDto;
    editUser: RecordUserDto;
    womanCompromise: boolean;
    resources: RecordResourceDto[];
    uploadFiles: AttachmentUploadDto[];

    constructor(data?: IRecordDto) {
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
            this.socialConflict = _data["socialConflict"] ? UtilitySocialConflictDto.fromJS(_data["socialConflict"]) : <any>undefined;
            this.code = _data["code"];
            this.title = _data["title"];
            this.territorialUnits = _data["territorialUnits"];
            this.womanCompromise = _data["womanCompromise"];
            this.recordTime = _data["recordTime"] ? moment(_data["recordTime"].toString()) : <any>undefined;
            this.creationTime = _data["creationTime"] ? moment(_data["creationTime"]) : <any>undefined;
            this.lastModificationTime = _data["lastModificationTime"] ? moment(_data["lastModificationTime"]) : <any>undefined;
            this.creatorUser = _data["creatorUser"] ? RecordUserDto.fromJS(_data["creatorUser"]) : <any>undefined;
            this.editUser = _data["editUser"] ? RecordUserDto.fromJS(_data["editUser"]) : <any>undefined;

            if (Array.isArray(_data["resources"])) {
                this.resources = [] as any;
                for (let item of _data["resources"])
                    this.resources!.push(RecordResourceDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): RecordDto {
        data = typeof data === 'object' ? data : {};
        let result = new RecordDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["id"] = this.id;
        data["title"] = this.title;
        data["socialConflict"] = this.socialConflict ? this.socialConflict.toJSON() : <any>undefined;
        data["recordTime"] = this.recordTime ? this.recordTime.toISOString() : <any>undefined;
        data["code"] = this.code;

        if (Array.isArray(this.uploadFiles)) {
            data["uploadFiles"] = [];
            for (let item of this.uploadFiles)
                data["uploadFiles"].push(item.toJSON());
        }

        if (Array.isArray(this.resources)) {
            data["resources"] = [];
            for (let item of this.resources)
                data["resources"].push(item.toJSON());
        }

        return data;
    }
}

export interface IRecordResourceDto {
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

export class RecordResourceDto implements IRecordResourceDto {
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

    constructor(data?: IRecordResourceDto) {
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

    static fromJS(data: any): RecordResourceDto {
        data = typeof data === 'object' ? data : {};
        let result = new RecordResourceDto();
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

export interface IRecordUserDto {
    id: number;
    name: string;
    surname: string;
}

export class RecordUserDto implements IRecordUserDto {
    id: number;
    name: string;
    surname: string;

    constructor(data?: IRecordUserDto) {
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

    static fromJS(data: any): RecordUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new RecordUserDto();
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