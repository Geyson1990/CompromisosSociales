import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete, EntityDto } from '../service-proxies';
import * as moment from 'moment';
import { AttachmentUploadDto } from './utility-proxie';

@Injectable()
export class DialogSpaceDocumentServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(dialogSpaceId: number | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfDialogSpaceDocumentListDto> {
        let url_ = this.baseUrl + "/api/services/app/DialogSpaceDocument/GetAll?";
        if (dialogSpaceId !== undefined)
            url_ += "DialogSpaceId=" + encodeURIComponent("" + dialogSpaceId) + "&";
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
                    return <Observable<PagedResultDtoOfDialogSpaceDocumentListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfDialogSpaceDocumentListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfDialogSpaceDocumentListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfDialogSpaceDocumentListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfDialogSpaceDocumentListDto>(<any>null);
    }

    get(dialogSpaceId: number, dialogSpaceDocumentId: number): Observable<DialogSpaceDocumentGetDataDto> {
        let url_ = this.baseUrl + "/api/services/app/DialogSpaceDocument/Get?";
        if (dialogSpaceId === null)
            throw new Error("The parameter 'Id' cannot be null.");
        else if (dialogSpaceId !== undefined)
            url_ += "DialogSpaceId=" + encodeURIComponent("" + dialogSpaceId) + "&";
        if (dialogSpaceDocumentId === null)
            throw new Error("The parameter 'Id' cannot be null.");
        else if (dialogSpaceDocumentId !== undefined)
            url_ += "DialogSpaceDocumentId=" + encodeURIComponent("" + dialogSpaceDocumentId) + "&";
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
                    return <Observable<DialogSpaceDocumentGetDataDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<DialogSpaceDocumentGetDataDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<DialogSpaceDocumentGetDataDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = DialogSpaceDocumentGetDataDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<DialogSpaceDocumentGetDataDto>(<any>null);
    }

    create(variable: DialogSpaceDocumentDto): Observable<EntityDto> {
        let url_ = this.baseUrl + "/api/services/app/DialogSpaceDocument/Create";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: variable.toJSON(),
            headers: new HttpHeaders({
                "Accept": "text/plain",
                "Content-Type": "application/json-patch+json"
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

    update(variable: DialogSpaceDocumentDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/DialogSpaceDocument/Update";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: variable.toJSON(),
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

    delete(id: number): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/DialogSpaceDocument/Delete?";
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

export interface IPagedResultDtoOfDialogSpaceDocumentListDto {
    totalCount: number;
    items: DialogSpaceDocumentGetAllDto[] | undefined;
}

export class PagedResultDtoOfDialogSpaceDocumentListDto implements IPagedResultDtoOfDialogSpaceDocumentListDto {
    totalCount!: number;
    items!: DialogSpaceDocumentGetAllDto[] | undefined;

    constructor(data?: IPagedResultDtoOfDialogSpaceDocumentListDto) {
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
                    this.items!.push(DialogSpaceDocumentGetAllDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfDialogSpaceDocumentListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfDialogSpaceDocumentListDto();
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

export interface IDialogSpaceDocumentGetDataDto {
    dialogSpaceDocument: DialogSpaceDocumentDto;
    dialogSpace: DialogSpaceDocumentDialogSpaceDto;
    documentTypes: DialogSpaceDocumentTypeRelationDto[];
    situations: DialogSpaceDocumentSituationRelationDto[];
}

export class DialogSpaceDocumentGetDataDto implements IDialogSpaceDocumentGetDataDto {
    dialogSpaceDocument: DialogSpaceDocumentDto;
    dialogSpace: DialogSpaceDocumentDialogSpaceDto;
    documentTypes: DialogSpaceDocumentTypeRelationDto[];
    situations: DialogSpaceDocumentSituationRelationDto[];

    constructor(data?: IDialogSpaceDocumentGetDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.dialogSpace = data["dialogSpace"] ? DialogSpaceDocumentDialogSpaceDto.fromJS(data["dialogSpace"]) : <any>undefined;
            this.dialogSpaceDocument = data["dialogSpaceDocument"] ? DialogSpaceDocumentDto.fromJS(data["dialogSpaceDocument"]) : <any>undefined;
            if (Array.isArray(data["documentTypes"])) {
                this.documentTypes = [] as any;
                for (let item of data["documentTypes"])
                    this.documentTypes!.push(DialogSpaceDocumentTypeRelationDto.fromJS(item));
            }
            if (Array.isArray(data["situations"])) {
                this.situations = [] as any;
                for (let item of data["situations"])
                    this.situations!.push(DialogSpaceDocumentSituationRelationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): DialogSpaceDocumentGetDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceDocumentGetDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["dialogSpace"] = this.dialogSpace ? this.dialogSpace.toJSON() : <any>undefined;
        data["dialogSpaceDocument"] = this.dialogSpaceDocument ? this.dialogSpaceDocument.toJSON() : <any>undefined;

        if (Array.isArray(this.situations)) {
            data["situations"] = [];
            for (let item of this.situations)
                data["situations"].push(item.toJSON());
        }
        if (Array.isArray(this.documentTypes)) {
            data["documentTypes"] = [];
            for (let item of this.documentTypes)
                data["documentTypes"].push(item.toJSON());
        }

        return data;
    }
}

export interface IDialogSpaceDocumentGetAllDto {
    id: number;
    documentType: string;
    situation: string;
    document: string;
    documentTime: moment.Moment;
    installationTime: moment.Moment;
    installationMaxTime: moment.Moment;
    vigencyTime: moment.Moment;
    hasInstallation: boolean;
    type: DialogSpaceDocumentType;
    range: DialogSpaceDocumentRange;
    rangeSide: DialogSpaceDocumentRangeSide;
    exposition: DialogSpaceDocumentExposition;
    days: number;
    vigencyRangeSide: DialogSpaceDocumentRangeSide;
    vigencyDays: number;
    observation: string;
}

export class DialogSpaceDocumentGetAllDto implements IDialogSpaceDocumentGetAllDto {
    id: number;
    documentType: string;
    situation: string;
    document: string;
    documentTime: moment.Moment;
    installationTime: moment.Moment;
    installationMaxTime: moment.Moment;
    vigencyTime: moment.Moment;
    hasInstallation: boolean;
    type: DialogSpaceDocumentType;
    range: DialogSpaceDocumentRange;
    rangeSide: DialogSpaceDocumentRangeSide;
    exposition: DialogSpaceDocumentExposition;
    days: number;
    vigencyRangeSide: DialogSpaceDocumentRangeSide;
    vigencyDays: number;
    observation: string;

    constructor(data?: IDialogSpaceDocumentGetAllDto) {
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
            this.documentType = data["documentType"];
            this.situation = data["situation"];
            this.document = data["document"];
            this.documentTime = data["documentTime"] ? moment(data["documentTime"]) : <any>undefined;
            this.installationTime = data["installationTime"] ? moment(data["installationTime"]) : <any>undefined;
            this.installationMaxTime = data["installationMaxTime"] ? moment(data["installationMaxTime"]) : <any>undefined;
            this.vigencyTime = data["vigencyTime"] ? moment(data["vigencyTime"]) : <any>undefined;
            this.hasInstallation = data["hasInstallation"];
            this.type = data["type"];
            this.range = data["range"];
            this.rangeSide = data["rangeSide"];
            this.exposition = data["exposition"];
            this.days = data["days"];
            this.vigencyRangeSide = data["vigencyRangeSide"];
            this.vigencyDays = data["vigencyDays"];
            this.observation = data["observation"];
        }
    }


    static fromJS(data: any): DialogSpaceDocumentGetAllDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceDocumentGetAllDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;

        return data;
    }
}

export interface IDialogSpaceDocumentDto {
    id: number;
    creationTime: moment.Moment;
    lastModificationTime: moment.Moment;
    dialogSpace: DialogSpaceDocumentDialogSpaceDto;
    dialogSpaceDocumentType: DialogSpaceDocumentTypeRelationDto;
    dialogSpaceDocumentSituation: DialogSpaceDocumentSituationRelationDto;
    document: string;
    documentTime: moment.Moment;
    installationTime: moment.Moment;
    installationMaxTime: moment.Moment;
    vigencyTime: moment.Moment;
    hasInstallation: boolean;
    type: DialogSpaceDocumentType;
    range: DialogSpaceDocumentRange;
    rangeSide: DialogSpaceDocumentRangeSide;
    exposition: DialogSpaceDocumentExposition;
    days: number;
    vigencyRangeSide: DialogSpaceDocumentRangeSide;
    vigencyDays: number;
    observation: string;
    resources: DialogSpaceDocumentResourceDto[];
}

export class DialogSpaceDocumentDto implements IDialogSpaceDocumentDto {
    id: number;
    creationTime: moment.Moment;
    lastModificationTime: moment.Moment;
    dialogSpace: DialogSpaceDocumentDialogSpaceDto;
    dialogSpaceDocumentType: DialogSpaceDocumentTypeRelationDto;
    dialogSpaceDocumentSituation: DialogSpaceDocumentSituationRelationDto;
    document: string;
    documentTime: moment.Moment;
    installationTime: moment.Moment;
    installationMaxTime: moment.Moment;
    vigencyTime: moment.Moment;
    hasInstallation: boolean;
    type: DialogSpaceDocumentType;
    range: DialogSpaceDocumentRange;
    rangeSide: DialogSpaceDocumentRangeSide;
    exposition: DialogSpaceDocumentExposition;
    days: number;
    vigencyRangeSide: DialogSpaceDocumentRangeSide;
    vigencyDays: number;
    observation: string;

    //audit
    creatorUser: DialogSpaceDocumentUserDto;
    editUser: DialogSpaceDocumentUserDto;

    resources: DialogSpaceDocumentResourceDto[];
    uploadFiles: AttachmentUploadDto[];
    uploadFilesPDF: AttachmentUploadDto[];


    constructor(data?: IDialogSpaceDocumentDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.hasInstallation = false;
            this.dialogSpaceDocumentType = new DialogSpaceDocumentTypeRelationDto({
                id: -1,
                name: undefined
            });
            this.dialogSpaceDocumentSituation = new DialogSpaceDocumentSituationRelationDto({
                id: -1,
                name: undefined
            });
            this.type = DialogSpaceDocumentType.NONE;
            this.range = DialogSpaceDocumentRange.NONE;
            this.rangeSide = DialogSpaceDocumentRangeSide.NONE;
            this.exposition = DialogSpaceDocumentExposition.NONE;
            this.days = 0;
            this.resources = [];
            this.uploadFiles = [];
            this.uploadFilesPDF = [];
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.creationTime = data["creationTime"] ? moment(data["creationTime"]) : <any>undefined;
            this.lastModificationTime = data["lastModificationTime"] ? moment(data["lastModificationTime"]) : <any>undefined;
            this.dialogSpace = data["dialogSpace"] ? DialogSpaceDocumentDialogSpaceDto.fromJS(data["dialogSpace"]) : <any>undefined;
            this.dialogSpaceDocumentType = data["dialogSpaceDocumentType"] ? DialogSpaceDocumentTypeRelationDto.fromJS(data["dialogSpaceDocumentType"]) : new DialogSpaceDocumentTypeRelationDto({
                id: -1,
                name: undefined
            });
            this.dialogSpaceDocumentSituation = data["dialogSpaceDocumentSituation"] ? DialogSpaceDocumentSituationRelationDto.fromJS(data["dialogSpaceDocumentSituation"]) : new DialogSpaceDocumentSituationRelationDto({
                id: -1,
                name: undefined
            });
            this.document = data["document"];
            this.documentTime = data["documentTime"] ? moment(data["documentTime"]) : <any>undefined;
            this.installationTime = data["installationTime"] ? moment(data["installationTime"]) : <any>undefined;
            this.installationMaxTime = data["installationMaxTime"] ? moment(data["installationMaxTime"]) : <any>undefined;
            this.vigencyTime = data["vigencyTime"] ? moment(data["vigencyTime"]) : <any>undefined;
            this.hasInstallation = data["hasInstallation"];
            this.type = data["type"];
            this.range = data["range"];
            this.rangeSide = data["rangeSide"];
            this.exposition = data["exposition"];
            this.days = data["days"];
            this.vigencyRangeSide = data["vigencyRangeSide"];
            this.vigencyDays = data["vigencyDays"];
            this.observation = data["observation"];

            this.creatorUser = data["creatorUser"] ? DialogSpaceDocumentUserDto.fromJS(data["creatorUser"]) : <any>undefined;
            this.editUser = data["editUser"] ? DialogSpaceDocumentUserDto.fromJS(data["editUser"]) : <any>undefined;

            if (Array.isArray(data["resources"])) {
                this.resources = [] as any;
                for (let item of data["resources"])
                    this.resources!.push(DialogSpaceDocumentResourceDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): DialogSpaceDocumentDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceDocumentDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["dialogSpace"] = this.dialogSpace ? this.dialogSpace.toJSON() : <any>undefined;
        data["dialogSpaceDocumentType"] = this.dialogSpaceDocumentType ? this.dialogSpaceDocumentType.toJSON() : <any>undefined;
        data["dialogSpaceDocumentSituation"] = this.dialogSpaceDocumentSituation ? this.dialogSpaceDocumentSituation.toJSON() : <any>undefined;
        data["document"] = this.document;
        data["documentTime"] = this.documentTime ? this.documentTime.toISOString() : <any>undefined;
        data["installationTime"] = this.installationTime ? this.installationTime.toISOString() : <any>undefined;
        data["installationMaxTime"] = this.installationMaxTime ? this.installationMaxTime.toISOString() : <any>undefined;
        data["vigencyTime"] = this.vigencyTime ? this.vigencyTime.toISOString() : <any>undefined;
        data["hasInstallation"] = this.hasInstallation;
        data["type"] = this.type;
        data["range"] = this.range;
        data["rangeSide"] = this.rangeSide;
        data["exposition"] = this.exposition;
        data["days"] = this.days;
        data["vigencyRangeSide"] = this.vigencyRangeSide;
        data["vigencyDays"] = this.vigencyDays;
        data["observation"] = this.observation;

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
        if (Array.isArray(this.uploadFilesPDF)) {
            data["uploadFilesPDF"] = [];
            for (let item of this.uploadFilesPDF)
                data["uploadFilesPDF"].push(item.toJSON());
        }
        
        return data;
    }
}

export interface IDialogSpaceDocumentDialogSpaceDto {
    id: number;
    code: string;
    caseName: string;
    socialConflict: DialogSpaceDocumentSocialConflictDto;
}

export class DialogSpaceDocumentDialogSpaceDto implements IDialogSpaceDocumentDialogSpaceDto {
    id: number;
    code: string;
    caseName: string;
    socialConflict: DialogSpaceDocumentSocialConflictDto;

    constructor(data?: IDialogSpaceDocumentDialogSpaceDto) {
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
            this.caseName = data["caseName"];
            this.socialConflict = data["socialConflict"] ? DialogSpaceDocumentSocialConflictDto.fromJS(data["socialConflict"]) : <any>undefined;
        }
    }

    static fromJS(data: any): DialogSpaceDocumentDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceDocumentDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["code"] = this.code;
        data["caseName"] = this.caseName;
        data["socialConflict"] = this.socialConflict ? this.socialConflict.toJSON() : <any>undefined;

        return data;
    }
}

export interface IDialogSpaceDocumentSocialConflictDto {
    id: number;
    code: string;
    caseName: string;
}

export class DialogSpaceDocumentSocialConflictDto implements IDialogSpaceDocumentSocialConflictDto {
    id: number;
    code: string;
    caseName: string;

    constructor(data?: IDialogSpaceDocumentSocialConflictDto) {
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
            this.caseName = data["caseName"];
        }
    }

    static fromJS(data: any): DialogSpaceDocumentSocialConflictDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceDocumentSocialConflictDto();
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

export interface IDialogSpaceDocumentTypeRelationDto {
    id: number;
    name: string;
}

export class DialogSpaceDocumentTypeRelationDto implements IDialogSpaceDocumentTypeRelationDto {
    id: number;
    name: string;

    constructor(data?: IDialogSpaceDocumentTypeRelationDto) {
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
        }
    }

    static fromJS(data: any): DialogSpaceDocumentTypeRelationDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceDocumentTypeRelationDto();
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

export interface IDialogSpaceDocumentSituationRelationDto {
    id: number;
    name: string;
}

export class DialogSpaceDocumentSituationRelationDto implements IDialogSpaceDocumentSituationRelationDto {
    id: number;
    name: string;

    constructor(data?: IDialogSpaceDocumentSituationRelationDto) {
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
        }
    }

    static fromJS(data: any): DialogSpaceDocumentSituationRelationDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceDocumentSituationRelationDto();
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

export interface IDialogSpaceDocumentResourceDto {
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

export class DialogSpaceDocumentResourceDto implements IDialogSpaceDocumentResourceDto {
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

    constructor(data?: IDialogSpaceDocumentResourceDto) {
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

    static fromJS(data: any): DialogSpaceDocumentResourceDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceDocumentResourceDto();
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

export interface IDialogSpaceDocumentUserDto {
    name: string;
    surname: string;
    emailAddress: string;
}

export class DialogSpaceDocumentUserDto implements IDialogSpaceDocumentUserDto {
    name: string;
    surname: string;
    emailAddress: string;

    constructor(data?: IDialogSpaceDocumentUserDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.name = data["name"];
            this.surname = data["surname"];
            this.emailAddress = data["emailAddress"];
        }
    }

    static fromJS(data: any): DialogSpaceDocumentUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceDocumentUserDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["surname"] = this.surname;
        data["emailAddress"] = this.emailAddress;

        return data;
    }
}

export const enum DialogSpaceDocumentType {
    NONE,
    CREATE,
    UPDATE
}

export const enum DialogSpaceDocumentRange {
    NONE,
    START,
    NEXT_DAY
}

export const enum DialogSpaceDocumentRangeSide {
    NONE,
    ALL,
    EXLUSIVE
}

export const enum DialogSpaceDocumentExposition {
    NONE,
    START,
    NEXT_DAY
}