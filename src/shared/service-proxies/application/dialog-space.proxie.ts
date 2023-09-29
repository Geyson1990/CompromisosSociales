import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete, PersonType } from '../service-proxies';
import * as moment from 'moment';
import { DialogSpaceDocumentType } from './dialog-space-document-proxie';

@Injectable()
export class DialogSpaceServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(
        code: string | undefined,
        caseName: string | undefined,
        territorialUnitId: number | undefined,
        departmentId: number | undefined,
        provinceId: number | undefined,
        districtId: number | undefined,
        dialogSpaceTypeId: number | undefined,
        filterByDate: boolean | undefined,
        startDate: moment.Moment | undefined,
        endDate: moment.Moment | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultDtoOfDialogSpaceListDto> {
        let url_ = this.baseUrl + "/api/services/app/DialogSpace/GetAll?";

        if (code !== undefined)
            url_ += "Code=" + encodeURIComponent("" + code) + "&";
        if (caseName !== undefined)
            url_ += "CaseName=" + encodeURIComponent("" + caseName) + "&";
        if (territorialUnitId !== undefined && territorialUnitId !== null && territorialUnitId !== 0 && territorialUnitId !== -1)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnitId) + "&";
        if (departmentId !== undefined && departmentId !== null && departmentId !== 0 && departmentId !== -1)
            url_ += "DepartmentId=" + encodeURIComponent("" + departmentId) + "&";
        if (provinceId !== undefined && provinceId !== null && provinceId !== 0 && provinceId !== -1)
            url_ += "ProvinceId=" + encodeURIComponent("" + provinceId) + "&";
        if (districtId !== undefined && districtId !== null && districtId !== 0 && districtId !== -1)
            url_ += "DistrictId=" + encodeURIComponent("" + districtId) + "&";
        if (dialogSpaceTypeId !== undefined)
            url_ += "DialogSpaceTypeId=" + encodeURIComponent("" + dialogSpaceTypeId) + "&";
        if (filterByDate !== undefined)
            url_ += "FilterByDate=" + encodeURIComponent("" + filterByDate) + "&";
        if (startDate === null)
            throw new Error("The parameter 'startDate' cannot be null.");
        else if (startDate !== undefined)
            url_ += "StartTime=" + encodeURIComponent(startDate ? "" + startDate.toJSON() : "") + "&";
        if (endDate === null)
            throw new Error("The parameter 'endDate' cannot be null.");
        else if (endDate !== undefined)
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
                    return <Observable<PagedResultDtoOfDialogSpaceListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfDialogSpaceListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfDialogSpaceListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfDialogSpaceListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfDialogSpaceListDto>(<any>null);
    }

    getAllLocations(conflictId: number | undefined): Observable<PagedResultDtoOfDialogSpaceLocationListDto> {
        let url_ = this.baseUrl + "/api/services/app/DialogSpace/GetAllLocations?";
        if (conflictId !== undefined)
            url_ += "ConflictId=" + encodeURIComponent("" + conflictId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAllLocationByConflict(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllLocationByConflict(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfDialogSpaceLocationListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfDialogSpaceLocationListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllLocationByConflict(response: HttpResponseBase): Observable<PagedResultDtoOfDialogSpaceLocationListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfDialogSpaceLocationListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfDialogSpaceLocationListDto>(<any>null);
    }

    get(id: number): Observable<DialogSpaceGetDataDto> {
        let url_ = this.baseUrl + "/api/services/app/DialogSpace/Get?";
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
                    return <Observable<DialogSpaceGetDataDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<DialogSpaceGetDataDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<DialogSpaceGetDataDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = DialogSpaceGetDataDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<DialogSpaceGetDataDto>(<any>null);
    }

    create(interventionPlan: DialogSpaceDto): Observable<DialogSpaceDto> {
        let url_ = this.baseUrl + "/api/services/app/DialogSpace/Create";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: interventionPlan.toJSON(),
            headers: new HttpHeaders({
                "Accept": "text/plain",
                "Content-Type": "application/json-patch+json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processCreateOrUpdate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateOrUpdate(<any>response_);
                } catch (e) {
                    return <Observable<DialogSpaceDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<DialogSpaceDto>><any>_observableThrow(response_);
        }));
    }

    update(interventionPlan: DialogSpaceDto): Observable<DialogSpaceDto> {
        let url_ = this.baseUrl + "/api/services/app/DialogSpace/Update";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: interventionPlan.toJSON(),
            headers: new HttpHeaders({
                "Accept": "text/plain",
                "Content-Type": "application/json-patch+json"
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processCreateOrUpdate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateOrUpdate(<any>response_);
                } catch (e) {
                    return <Observable<DialogSpaceDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<DialogSpaceDto>><any>_observableThrow(response_);
        }));
    }

    protected processCreateOrUpdate(response: HttpResponseBase): Observable<DialogSpaceDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = DialogSpaceDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<DialogSpaceDto>(<any>null);
    }

    delete(id: number): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/DialogSpace/Delete?";
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

export interface IPagedResultDtoOfDialogSpaceListDto {
    totalCount: number;
    items: DialogSpaceGetAllDto[] | undefined;
}

export class PagedResultDtoOfDialogSpaceListDto implements PagedResultDtoOfDialogSpaceListDto {
    totalCount!: number;
    items!: DialogSpaceGetAllDto[] | undefined;

    constructor(data?: PagedResultDtoOfDialogSpaceListDto) {
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
                    this.items!.push(DialogSpaceGetAllDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfDialogSpaceListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfDialogSpaceListDto();
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

export interface IPagedResultDtoOfDialogSpaceLocationListDto {
    totalCount: number;
    items: DialogSpaceLocationDto[] | undefined;
}

export class PagedResultDtoOfDialogSpaceLocationListDto implements IPagedResultDtoOfDialogSpaceLocationListDto {
    totalCount!: number;
    items!: DialogSpaceLocationDto[] | undefined;

    constructor(data?: IPagedResultDtoOfDialogSpaceLocationListDto) {
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
                    this.items!.push(DialogSpaceLocationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfDialogSpaceLocationListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfDialogSpaceLocationListDto();
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

export interface IDialogSpaceGetDataDto {
    dialogSpace: DialogSpaceDto;
    territorialUnits: DialogSpaceTerritorialUnitDto[];
    departments: DialogSpaceDepartmentDto[];
    types: DialogSpaceTypeRelationDto[];
    persons: DialogSpacePersonDto[];
}

export class DialogSpaceGetDataDto implements IDialogSpaceGetDataDto {
    dialogSpace: DialogSpaceDto;
    territorialUnits: DialogSpaceTerritorialUnitDto[];
    departments: DialogSpaceDepartmentDto[];
    types: DialogSpaceTypeRelationDto[];
    persons: DialogSpacePersonDto[];

    constructor(data?: IDialogSpaceGetDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.dialogSpace = data["dialogSpace"] ? DialogSpaceDto.fromJS(data["dialogSpace"]) : <any>undefined;
            if (Array.isArray(data["territorialUnits"])) {
                this.territorialUnits = [] as any;
                for (let item of data["territorialUnits"])
                    this.territorialUnits!.push(DialogSpaceTerritorialUnitDto.fromJS(item));
            }
            if (Array.isArray(data["departments"])) {
                this.departments = [] as any;
                for (let item of data["departments"])
                    this.departments!.push(DialogSpaceDepartmentDto.fromJS(item));
            }
            if (Array.isArray(data["types"])) {
                this.types = [] as any;
                for (let item of data["types"])
                    this.types!.push(DialogSpaceTypeRelationDto.fromJS(item));
            }
            if (Array.isArray(data["persons"])) {
                this.persons = [] as any;
                for (let item of data["persons"])
                    this.persons!.push(DialogSpacePersonDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): DialogSpaceGetDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceGetDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["dialogSpace"] = this.dialogSpace ? this.dialogSpace.toJSON() : <any>undefined;
        if (Array.isArray(this.territorialUnits)) {
            data["territorialUnits"] = [];
            for (let item of this.territorialUnits)
                data["territorialUnits"].push(item.toJSON());
        }
        if (Array.isArray(this.departments)) {
            data["departments"] = [];
            for (let item of this.departments)
                data["departments"].push(item.toJSON());
        }
        if (Array.isArray(this.types)) {
            data["types"] = [];
            for (let item of this.types)
                data["types"].push(item.toJSON());
        }
        if (Array.isArray(this.persons)) {
            data["persons"] = [];
            for (let item of this.persons)
                data["persons"].push(item.toJSON());
        }

        return data;
    }
}

export interface IDialogSpaceGetAllDto {
    id: number;
    count: number;
    year: number;
    code: string;
    caseName: string;
    socialConflictCaseName: string;
    document: string;
    documentTime: moment.Moment;
    documentType: DialogSpaceDocumentType;
    documentSituation: string;
    documentObservation: string;
    type: string;
    person: string;
    locations: string;
    territorialUnits: string;
}

export class DialogSpaceGetAllDto implements IDialogSpaceGetAllDto {
    id: number;
    count: number;
    year: number;
    code: string;
    caseName: string;
    socialConflictCaseName: string;
    document: string;
    documentTime: moment.Moment;
    documentType: DialogSpaceDocumentType;
    documentSituation: string;
    documentObservation: string;
    type: string;
    person: string;
    locations: string;
    territorialUnits: string;

    constructor(data?: IDialogSpaceGetAllDto) {
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
            this.count = data["count"];
            this.year = data["year"];
            this.code = data["code"];
            this.caseName = data["caseName"];
            this.socialConflictCaseName = data["socialConflictCaseName"];
            this.document = data["document"];
            this.documentTime = data["documentTime"] ? moment(data["documentTime"]) : <any>undefined;
            this.documentType = data["documentType"];
            this.documentSituation = data["documentSituation"];
            this.documentObservation = data["documentObservation"];
            this.type = data["type"];
            this.person = data["person"];
            this.locations = data["locations"];
            this.territorialUnits = data["territorialUnits"];
        }
    }

    static fromJS(data: any): DialogSpaceGetAllDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceGetAllDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;

        return data;
    }
}

export interface IDialogSpaceDto {
    id: number;
    code: string;
    caseName: string;
    creationTime: moment.Moment;
    lastModificationTime: moment.Moment;
    socialConflict: DialogSpaceSocialConflictDto;
    dialogSpaceType: DialogSpaceTypeRelationDto;
    person: DialogSpacePersonDto;
    leaders: DialogSpaceLeaderRelationDto[];
    locations: DialogSpaceLocationDto[];
}

export class DialogSpaceDto implements IDialogSpaceDto {
    id: number;
    code: string;
    caseName: string;
    creationTime: moment.Moment;
    lastModificationTime: moment.Moment;
    socialConflict: DialogSpaceSocialConflictDto;
    dialogSpaceType: DialogSpaceTypeRelationDto;
    person: DialogSpacePersonDto;
    leaders: DialogSpaceLeaderRelationDto[];
    locations: DialogSpaceLocationDto[];

    //audit 
    creatorUser: DialogSpaceUserDto;
    editUser: DialogSpaceUserDto;

    //replacement
    replaceCode: boolean;
    replaceYear: number;
    replaceCount: number;

    constructor(data?: IDialogSpaceDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.dialogSpaceType = new DialogSpaceTypeRelationDto({
                id: -1,
                name: undefined
            });
            this.locations = [];
            this.leaders = [];
            this.person = new DialogSpacePersonDto({
                id: -1,
                name: undefined,
                type: PersonType.None
            });
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.code = data["code"];
            this.caseName = data["caseName"];
            this.creationTime = data["creationTime"] ? moment(data["creationTime"]) : <any>undefined;
            this.lastModificationTime = data["lastModificationTime"] ? moment(data["lastModificationTime"]) : <any>undefined;
            this.socialConflict = data["socialConflict"] ? DialogSpaceSocialConflictDto.fromJS(data["socialConflict"]) : <any>undefined;
            this.dialogSpaceType = data["dialogSpaceType"] ? DialogSpaceTypeRelationDto.fromJS(data["dialogSpaceType"]) : new DialogSpaceTypeRelationDto({
                id: -1,
                name: undefined
            });
            this.person = data["person"] ? DialogSpacePersonDto.fromJS(data["person"]) : new DialogSpacePersonDto({
                id: -1,
                name: undefined,
                type: PersonType.None
            });

            this.creatorUser = data["creatorUser"] ? DialogSpaceUserDto.fromJS(data["creatorUser"]) : <any>undefined;
            this.editUser = data["editUser"] ? DialogSpaceUserDto.fromJS(data["editUser"]) : <any>undefined;

            if (Array.isArray(data["locations"])) {
                this.locations = [] as any;
                for (let item of data["locations"])
                    this.locations!.push(DialogSpaceLocationDto.fromJS(item));
            }
            if (Array.isArray(data["leaders"])) {
                this.leaders = [] as any;
                for (let item of data["leaders"])
                    this.leaders!.push(DialogSpaceLeaderRelationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): DialogSpaceDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["code"] = this.code;
        data["caseName"] = this.caseName;
        data["socialConflict"] = this.socialConflict ? this.socialConflict.toJSON() : <any>undefined;
        data["dialogSpaceType"] = this.socialConflict ? this.dialogSpaceType.toJSON() : <any>undefined;
        data["person"] = this.person ? this.person.toJSON() : <any>undefined;

        data["replaceCode"] = this.replaceCode;
        data["replaceYear"] = this.replaceYear;
        data["replaceCount"] = this.replaceCount;

        if (Array.isArray(this.leaders)) {
            data["leaders"] = [];
            for (let item of this.leaders)
                data["leaders"].push(item.toJSON());
        }
        if (Array.isArray(this.locations)) {
            data["locations"] = [];
            for (let item of this.locations)
                data["locations"].push(item.toJSON());
        }

        return data;
    }
}


export interface IDialogSpaceSocialConflictDto {
    id: number;
    code: string;
    caseName: string;
}

export class DialogSpaceSocialConflictDto implements IDialogSpaceSocialConflictDto {
    id: number;
    code: string;
    caseName: string;

    constructor(data?: IDialogSpaceSocialConflictDto) {
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

    static fromJS(data: any): DialogSpaceSocialConflictDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceSocialConflictDto();
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

export interface IDialogSpaceLocationDto {
    id: number;
    department: DialogSpaceDepartmentDto;
    province: DialogSpaceProvinceDto;
    district: DialogSpaceDistrictDto;
    territorialUnit: DialogSpaceTerritorialUnitDto;
    region: DialogSpaceRegionDto;
    ubication: string;
    remove: boolean;
}

export class DialogSpaceLocationDto implements IDialogSpaceLocationDto {
    id: number;
    department: DialogSpaceDepartmentDto;
    province: DialogSpaceProvinceDto;
    district: DialogSpaceDistrictDto;
    territorialUnit: DialogSpaceTerritorialUnitDto;
    region: DialogSpaceRegionDto;
    ubication: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: IDialogSpaceLocationDto) {
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
            this.department = data["department"] ? DialogSpaceDepartmentDto.fromJS(data["department"]) : <any>undefined;
            this.province = data["province"] ? DialogSpaceProvinceDto.fromJS(data["province"]) : <any>undefined;
            this.district = data["district"] ? DialogSpaceDistrictDto.fromJS(data["district"]) : <any>undefined;
            this.territorialUnit = data["territorialUnit"] ? DialogSpaceTerritorialUnitDto.fromJS(data["territorialUnit"]) : <any>undefined;
            this.region = data["region"] ? DialogSpaceRegionDto.fromJS(data["region"]) : <any>undefined;
            this.ubication = data["ubication"];
        }
    }

    static fromJS(data: any): DialogSpaceLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["department"] = this.department ? this.department.toJSON() : <any>undefined;
        data["province"] = this.province ? this.province.toJSON() : <any>undefined;
        data["district"] = this.district ? this.district.toJSON() : <any>undefined;
        data["territorialUnit"] = this.territorialUnit ? this.territorialUnit.toJSON() : <any>undefined;
        data["region"] = this.region ? this.region.toJSON() : <any>undefined;
        data["ubication"] = this.ubication;
        data["remove"] = this.remove;

        return data;
    }
}

export interface IDialogSpaceTerritorialUnitDto {
    id: number;
    name: string;
}

export class DialogSpaceTerritorialUnitDto implements IDialogSpaceTerritorialUnitDto {
    id: number;
    name: string;

    constructor(data?: IDialogSpaceTerritorialUnitDto) {
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

    static fromJS(data: any): DialogSpaceTerritorialUnitDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceTerritorialUnitDto();
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

export interface IDialogSpaceTypeRelationDto {
    id: number;
    name: string;
}

export class DialogSpaceTypeRelationDto implements IDialogSpaceTypeRelationDto {
    id: number;
    name: string;

    constructor(data?: IDialogSpaceTypeRelationDto) {
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

    static fromJS(data: any): DialogSpaceTypeRelationDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceTypeRelationDto();
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

export interface IDialogSpaceDepartmentDto {
    id: number;
    territorialUnitIds: number[];
    name: string;
    provinces: DialogSpaceProvinceDto[];
}

export class DialogSpaceDepartmentDto implements IDialogSpaceDepartmentDto {
    id: number;
    territorialUnitIds: number[];
    name: string;
    provinces: DialogSpaceProvinceDto[];

    constructor(data?: IDialogSpaceDepartmentDto) {
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
            if (Array.isArray(data["territorialUnitIds"])) {
                this.territorialUnitIds = [] as any;
                for (let item of data["territorialUnitIds"])
                    this.territorialUnitIds!.push(item);
            }
            if (Array.isArray(data["provinces"])) {
                this.provinces = [] as any;
                for (let item of data["provinces"])
                    this.provinces!.push(DialogSpaceProvinceDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): DialogSpaceDepartmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceDepartmentDto();
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

export interface IDialogSpaceProvinceDto {
    id: number;
    name: string;
    districts: DialogSpaceDistrictDto[];
}

export class DialogSpaceProvinceDto implements IDialogSpaceProvinceDto {
    id: number;
    name: string;
    districts: DialogSpaceDistrictDto[];

    constructor(data?: IDialogSpaceProvinceDto) {
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
            if (Array.isArray(data["districts"])) {
                this.districts = [] as any;
                for (let item of data["districts"])
                    this.districts!.push(DialogSpaceDistrictDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): DialogSpaceProvinceDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceProvinceDto();
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

export interface IDialogSpaceDistrictDto {
    id: number;
    name: string;
}

export class DialogSpaceDistrictDto implements IDialogSpaceDistrictDto {
    id: number;
    name: string;

    constructor(data?: IDialogSpaceDistrictDto) {
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

    static fromJS(data: any): DialogSpaceDistrictDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceDistrictDto();
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

export interface IDialogSpaceRegionDto {
    id: number;
    name: string;
}

export class DialogSpaceRegionDto implements IDialogSpaceRegionDto {
    id: number;
    name: string;

    constructor(data?: IDialogSpaceRegionDto) {
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

    static fromJS(data: any): DialogSpaceRegionDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceRegionDto();
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

export interface IDialogSpaceUserDto {
    name: string;
    surname: string;
    emailAddress: string;
}

export class DialogSpaceUserDto implements IDialogSpaceUserDto {
    name: string;
    surname: string;
    emailAddress: string;

    constructor(data?: IDialogSpaceUserDto) {
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

    static fromJS(data: any): DialogSpaceUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceUserDto();
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

export interface IDialogSpaceLeaderRelationDto {
    id: number;
    directoryGovernment: DialogSpaceDirectoryGovernmentLocationDto;
    teams: DialogSpaceTeamRelationDto[];
}

export class DialogSpaceLeaderRelationDto implements IDialogSpaceLeaderRelationDto {
    id: number;
    directoryGovernment: DialogSpaceDirectoryGovernmentLocationDto;
    teams: DialogSpaceTeamRelationDto[];
    remove: boolean;

    //readonly
    index: number;

    constructor(data?: IDialogSpaceLeaderRelationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.teams = [];
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.directoryGovernment = _data["directoryGovernment"] ? DialogSpaceDirectoryGovernmentLocationDto.fromJS(_data["directoryGovernment"]) : <any>undefined;
            if (Array.isArray(_data["teams"])) {
                this.teams = [] as any;
                for (let item of _data["teams"])
                    this.teams!.push(DialogSpaceTeamRelationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): DialogSpaceLeaderRelationDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceLeaderRelationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["directoryGovernment"] = this.directoryGovernment ? this.directoryGovernment.toJSON() : <any>undefined;
        data["remove"] = this.remove;
        if (Array.isArray(this.teams)) {
            data["teams"] = [];
            for (let item of this.teams)
                data["teams"].push(item.toJSON());
        }

        return data;
    }
}

export interface IDialogSpaceTeamRelationDto {
    id: number;
    name: string;
}

export class DialogSpaceTeamRelationDto implements IDialogSpaceTeamRelationDto {
    id: number;
    name: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: IDialogSpaceTeamRelationDto) {
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
        }
    }

    static fromJS(data: any): DialogSpaceTeamRelationDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceTeamRelationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["remove"] = this.remove;

        return data;
    }
}

export interface IDialogSpaceDirectoryGovernmentLocationDto {
    id: number;
    name: string;
    shortName: string;
    alias: string;
    address: string;
    phoneNumber: string;
    url: string;
    additionalInformation: string;
    directoryGovernmentSector: DialogSpaceDirectoryDirectoryGovernmentSectorLocationDto;
    district: DialogSpaceDirectoryDistrictReverseDto;
}

export class DialogSpaceDirectoryGovernmentLocationDto implements IDialogSpaceDirectoryGovernmentLocationDto {
    id: number;
    name: string;
    shortName: string;
    alias: string;
    address: string;
    phoneNumber: string;
    url: string;
    additionalInformation: string;
    directoryGovernmentSector: DialogSpaceDirectoryDirectoryGovernmentSectorLocationDto;
    district: DialogSpaceDirectoryDistrictReverseDto;

    constructor(data?: IDialogSpaceDirectoryGovernmentLocationDto) {
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
            this.shortName = _data["shortName"];
            this.alias = _data["alias"];
            this.address = _data["address"];
            this.phoneNumber = _data["phoneNumber"];
            this.url = _data["url"];
            this.additionalInformation = _data["additionalInformation"];
            this.directoryGovernmentSector = _data["directoryGovernmentSector"] ? DialogSpaceDirectoryDirectoryGovernmentSectorLocationDto.fromJS(_data["directoryGovernmentSector"]) : <any>undefined;
            this.district = _data["district"] ? DialogSpaceDirectoryDistrictReverseDto.fromJS(_data["district"]) : <any>undefined;
        }
    }

    static fromJS(data: any): DialogSpaceDirectoryGovernmentLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceDirectoryGovernmentLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["shortName"] = this.shortName;
        data["alias"] = this.alias;
        data["address"] = this.address;
        data["phoneNumber"] = this.phoneNumber;
        data["url"] = this.url;
        data["additionalInformation"] = this.additionalInformation;
        data["directoryGovernmentSector"] = this.directoryGovernmentSector ? this.directoryGovernmentSector.toJSON() : <any>undefined;

        return data;
    }
}

export interface IDialogSpaceDirectoryDirectoryGovernmentSectorLocationDto {
    id: number;
    name: string;
}

export class DialogSpaceDirectoryDirectoryGovernmentSectorLocationDto implements IDialogSpaceDirectoryDirectoryGovernmentSectorLocationDto {
    id: number;
    name: string;

    constructor(data?: IDialogSpaceDirectoryDirectoryGovernmentSectorLocationDto) {
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
        }
    }

    static fromJS(data: any): DialogSpaceDirectoryDirectoryGovernmentSectorLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceDirectoryDirectoryGovernmentSectorLocationDto();
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

export interface IDialogSpaceDirectoryDistrictReverseDto {
    id: number;
    name: string;
    province: DialogSpaceDirectoryProvinceReverseDto;
}

export class DialogSpaceDirectoryDistrictReverseDto implements IDialogSpaceDirectoryDistrictReverseDto {
    id: number;
    name: string;
    province: DialogSpaceDirectoryProvinceReverseDto;

    constructor(data?: IDialogSpaceDirectoryDistrictReverseDto) {
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
            this.province = data["province"] ? DialogSpaceDirectoryProvinceReverseDto.fromJS(data["province"]) : <any>undefined;
        }
    }

    static fromJS(data: any): DialogSpaceDirectoryDistrictReverseDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceDirectoryDistrictReverseDto();
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


export interface IDialogSpaceDirectoryProvinceReverseDto {
    id: number;
    name: string;
    department: DialogSpaceDepartmentReverseDto;
}

export class DialogSpaceDirectoryProvinceReverseDto implements IDialogSpaceDirectoryProvinceReverseDto {
    id: number;
    name: string;
    department: DialogSpaceDepartmentReverseDto;

    constructor(data?: IDialogSpaceDirectoryProvinceReverseDto) {
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
            this.department = data["department"] ? DialogSpaceDepartmentReverseDto.fromJS(data["department"]) : <any>undefined;
        }
    }

    static fromJS(data: any): DialogSpaceDirectoryProvinceReverseDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceDirectoryProvinceReverseDto();
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


export interface IDialogSpaceDepartmentReverseDto {
    id: number;
    name: string;
}

export class DialogSpaceDepartmentReverseDto implements IDialogSpaceDepartmentReverseDto {
    id: number;
    name: string;

    constructor(data?: IDialogSpaceDepartmentReverseDto) {
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

    static fromJS(data: any): DialogSpaceDepartmentReverseDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpaceDepartmentReverseDto();
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

export interface IDialogSpacePersonDto {
    id: number;
    name: string;
    type: PersonType;
}

export class DialogSpacePersonDto implements IDialogSpacePersonDto {
    id: number;
    name: string;
    type: PersonType;

    constructor(data?: IDialogSpacePersonDto) {
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
            this.type = _data["type"];
        }
    }

    static fromJS(data: any): DialogSpacePersonDto {
        data = typeof data === 'object' ? data : {};
        let result = new DialogSpacePersonDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["type"] = this.type;

        return data;
    }
}