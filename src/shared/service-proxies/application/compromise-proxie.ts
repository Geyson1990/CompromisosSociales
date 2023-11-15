import { AttachmentUploadDto, UtilityParameterDto, UtilityRecordDto, UtilityResponsibleActorDto, UtilityResponsibleSubActorDto, UtilitySocialConflictLocationDto } from "./utility-proxie";
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete, FileDto } from '../service-proxies';
import * as moment from "moment";
import { PipMefDto } from "./pip-mef-proxie";

@Injectable()
export class CompromiseServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAllToExcel(
        filter: string | undefined,
        compromiseType: number | undefined,
        compromiseCode: string | undefined,
        recordCode: string | undefined,
        socialCode: string | undefined,
        territorialUnit: number | undefined,
        filterByDate: boolean | undefined,
        startDate: moment.Moment | undefined,
        endDate: moment.Moment | undefined,
        sorting: string | undefined): Observable<FileDto> {

        let url_ = this.baseUrl + "/api/services/app/Compromise/GetAllToExcel?";

        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (compromiseType !== undefined)
            url_ += "Type=" + encodeURIComponent("" + compromiseType) + "&";
        if (compromiseCode !== undefined)
            url_ += "Code=" + encodeURIComponent("" + compromiseCode) + "&";
        if (filterByDate !== undefined)
            url_ += "FilterByDate=" + encodeURIComponent("" + filterByDate) + "&";
        if (socialCode !== undefined)
            url_ += "CodeSocialConflict=" + encodeURIComponent("" + socialCode) + "&";
        if (recordCode !== undefined)
            url_ += "CodeRecord=" + encodeURIComponent("" + recordCode) + "&";
        if (territorialUnit !== undefined)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnit) + "&";
        if (sorting !== undefined)
            url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
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

    getMatrixToExcel(
        filter: string | undefined,
        compromiseType: number | undefined,
        compromiseCode: string | undefined,
        recordCode: string | undefined,
        socialCode: string | undefined,
        territorialUnit: number | undefined,
        filterByDate: boolean | undefined,
        startDate: moment.Moment | undefined,
        endDate: moment.Moment | undefined,
        sorting: string | undefined): Observable<FileDto> {

        let url_ = this.baseUrl + "/api/services/app/Compromise/GetMatrixToExcel?";

        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (compromiseType !== undefined)
            url_ += "Type=" + encodeURIComponent("" + compromiseType) + "&";
        if (compromiseCode !== undefined)
            url_ += "Code=" + encodeURIComponent("" + compromiseCode) + "&";
        if (filterByDate !== undefined)
            url_ += "FilterByDate=" + encodeURIComponent("" + filterByDate) + "&";
        if (socialCode !== undefined)
            url_ += "CodeSocialConflict=" + encodeURIComponent("" + socialCode) + "&";
        if (recordCode !== undefined)
            url_ += "CodeRecord=" + encodeURIComponent("" + recordCode) + "&";
        if (territorialUnit !== undefined)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnit) + "&";
        if (sorting !== undefined)
            url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
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

    getAll(
        filter: string | undefined,
        compromiseType: number | undefined,
        compromiseCode: string | undefined,
        recordCode: string | undefined,
        socialCode: string | undefined,
        territorialUnit: number | undefined,
        filterByDate: boolean | undefined,
        startDate: moment.Moment | undefined,
        endDate: moment.Moment | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultDtoOfCompromiseListDto> {

        let url_ = this.baseUrl + "/api/services/app/Compromise/GetAll?";

        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (compromiseType !== undefined)
            url_ += "Type=" + encodeURIComponent("" + compromiseType) + "&";
        if (compromiseCode !== undefined)
            url_ += "Code=" + encodeURIComponent("" + compromiseCode) + "&";
        if (filterByDate !== undefined)
            url_ += "FilterByDate=" + encodeURIComponent("" + filterByDate) + "&";
        if (socialCode !== undefined)
            url_ += "CodeSocialConflict=" + encodeURIComponent("" + socialCode) + "&";
        if (recordCode !== undefined)
            url_ += "CodeRecord=" + encodeURIComponent("" + recordCode) + "&";
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
            return this.processGetAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfCompromiseListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfCompromiseListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfCompromiseListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfCompromiseListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfCompromiseListDto>(<any>null);
    }

    get(id: number): Observable<CompromiseGetDataDto> {
        let url_ = this.baseUrl + "/api/services/app/Compromise/Get?";
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
                    return <Observable<CompromiseGetDataDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<CompromiseGetDataDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<CompromiseGetDataDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = CompromiseGetDataDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<CompromiseGetDataDto>(<any>null);
    }

    create(item: CompromiseDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/Compromise/Create";

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

    deleteCompromiseList(item: any): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/Compromise/DeleteList";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: item,
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

    update(item: CompromiseDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/Compromise/Update";

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
        let url_ = this.baseUrl + "/api/services/app/Compromise/Delete?";
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

export interface IPagedResultDtoOfCompromiseListDto {
    totalCount: number;
    items: CompromiseDto[] | undefined;
}

export class PagedResultDtoOfCompromiseListDto implements IPagedResultDtoOfCompromiseListDto {
    totalCount!: number;
    items!: CompromiseDto[] | undefined;

    constructor(data?: IPagedResultDtoOfCompromiseListDto) {
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
                    this.items!.push(CompromiseDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfCompromiseListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfCompromiseListDto();
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

export interface ICompromiseGetDataDto {
    compromise: CompromiseDto;
    statuses: UtilityParameterDto[];
    criteria: UtilityParameterDto[];
    pipPhases: UtilityParameterDto[];
    pipMilestones: UtilityParameterDto[];
    responsibleActors: CompromiseResponsibleActorDto[];
    responsibleTypes: CompromiseResponsibleTypeDto[];
    labels: CompromiseLabelLocationDto[];
    states: CompromiseStateLocationDto[];
}

export class CompromiseGetDataDto implements ICompromiseGetDataDto {
    compromise: CompromiseDto;
    statuses: UtilityParameterDto[];
    criteria: UtilityParameterDto[];
    pipPhases: UtilityParameterDto[];
    pipMilestones: UtilityParameterDto[];
    responsibleActors: CompromiseResponsibleActorDto[];
    responsibleTypes: CompromiseResponsibleTypeDto[];
    labels: CompromiseLabelLocationDto[];
    states: CompromiseStateLocationDto[];

    constructor(data?: ICompromiseGetDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.compromise = data["compromise"] ? CompromiseDto.fromJS(data["compromise"]) : <any>undefined;
            if (Array.isArray(data["statuses"])) {
                this.statuses = [] as any;
                for (let item of data["statuses"])
                    this.statuses!.push(UtilityParameterDto.fromJS(item));
            }
            if (Array.isArray(data["criteria"])) {
                this.criteria = [] as any;
                for (let item of data["criteria"])
                    this.criteria!.push(UtilityParameterDto.fromJS(item));
            }
            if (Array.isArray(data["pipPhases"])) {
                this.pipPhases = [] as any;
                for (let item of data["pipPhases"])
                    this.pipPhases!.push(UtilityParameterDto.fromJS(item));
            }
            if (Array.isArray(data["pipMilestones"])) {
                this.pipMilestones = [] as any;
                for (let item of data["pipMilestones"])
                    this.pipMilestones!.push(UtilityParameterDto.fromJS(item));
            }
            if (Array.isArray(data["responsibleActors"])) {
                this.responsibleActors = [] as any;
                for (let item of data["responsibleActors"])
                    this.responsibleActors!.push(CompromiseResponsibleActorDto.fromJS(item));
            }
            if (Array.isArray(data["responsibleTypes"])) {
                this.responsibleTypes = [] as any;
                for (let item of data["responsibleTypes"])
                    this.responsibleTypes!.push(CompromiseResponsibleTypeDto.fromJS(item));
            }
            if (Array.isArray(data["labels"])) {
                this.labels = [] as any;
                for (let item of data["labels"])
                    this.labels!.push(CompromiseLabelLocationDto.fromJS(item));
            }
            if (Array.isArray(data["states"])) {
                this.states = [] as any;
                for (let item of data["states"])
                    this.states!.push(CompromiseStateLocationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CompromiseGetDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new CompromiseGetDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["compromise"] = this.compromise ? this.compromise.toJSON() : <any>undefined;
        if (Array.isArray(this.statuses)) {
            data["statuses"] = [];
            for (let item of this.statuses)
                data["statuses"].push(item.toJSON());
        }
        if (Array.isArray(this.responsibleActors)) {
            data["responsibleActors"] = [];
            for (let item of this.responsibleActors)
                data["responsibleActors"].push(item.toJSON());
        }
        if (Array.isArray(this.criteria)) {
            data["criteria"] = [];
            for (let item of this.criteria)
                data["criteria"].push(item.toJSON());
        }
        if (Array.isArray(this.pipPhases)) {
            data["pipPhases"] = [];
            for (let item of this.pipPhases)
                data["pipPhases"].push(item.toJSON());
        }
        if (Array.isArray(this.pipMilestones)) {
            data["pipMilestones"] = [];
            for (let item of this.pipMilestones)
                data["pipMilestones"].push(item.toJSON());
        }
        if (Array.isArray(this.labels)) {
            data["labels"] = [];
            for (let item of this.labels)
                data["labels"].push(item.toJSON());
        } 
        if (Array.isArray(this.states)) {
            data["states"] = [];
            for (let item of this.states)
                data["states"].push(item.toJSON());
        }

        return data;
    }
}

export interface ICompromiseDto {
    id: number;
    code: string;
    name: string;
    description: string;
    transcription: string;
    creationTime: moment.Moment;
    lastModificationTime: moment.Moment;
    record: UtilityRecordDto;
    compromiseState: CompromiseStateLocationDto;
    compromiseSubState: CompromiseSubStateLocationDto;
    compromiseLocations: CompromiseLocationDto[];
    type: CompromiseType;
    territorialUnits: string;
    status: UtilityParameterDto;
    isPriority: boolean;
    womanCompromise: boolean;
    priorityReference: string;
    responsibleActor: UtilityResponsibleSubActorDto;
    responsibleSubActor: UtilityResponsibleSubActorDto;
    involved: CompromiseInvolvedLocationDto[];
    responsibles: CompromiseResponsibleDto[];
    situations: CompromiseTracingDto[];
    timelines: CompromiseTimelineDto[];
    uploads: CompromiseUploadTracingDto[];
    pipmef: PipMefDto;
    compromiseLabel: CompromiseLabelLocationDto;
    creatorUser: CompromiseUserDto;
    editUser: CompromiseUserDto;
    deadLine:moment.Moment;
    dueDate:moment.Moment;
}

export class CompromiseDto implements ICompromiseDto {
    id: number;
    code: string;
    name: string;
    description: string;
    transcription: string;
    creationTime: moment.Moment;
    lastModificationTime: moment.Moment;
    record: UtilityRecordDto;
    compromiseState: CompromiseStateLocationDto;
    compromiseSubState: CompromiseSubStateLocationDto;
    compromiseLocations: CompromiseLocationDto[];
    type: CompromiseType;
    territorialUnits: string;
    status: UtilityParameterDto;
    isPriority: boolean;
    womanCompromise: boolean;
    reversePriority: boolean;
    priorityReference: string;
    responsibleActor: CompromiseResponsibleActorDto;
    responsibleSubActor: CompromiseResponsibleSubActorDto;
    involved: CompromiseInvolvedLocationDto[];
    responsibles: CompromiseResponsibleDto[];
    situations: CompromiseTracingDto[];
    uploads: CompromiseUploadTracingDto[];
    timelines: CompromiseTimelineDto[];
    pipmef: PipMefDto;
    compromiseLabel: CompromiseLabelLocationDto;
    creatorUser: CompromiseUserDto;
    editUser: CompromiseUserDto;
    deadLine:moment.Moment;
    dueDate:moment.Moment;
    //readonly
    isWomanCompromise: string;
    //territorialUnit: string;

    constructor(data?: ICompromiseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.type = CompromiseType.None;
            this.status = new UtilityParameterDto({
                id: -1,
                order: -1,
                value: 'Seleccione',
                parentId: undefined
            });
            this.pipmef = new PipMefDto();
            this.involved = [];
            this.timelines = [];
            this.responsibles = [];
            this.compromiseLocations = [];
            this.responsibleActor = new CompromiseResponsibleActorDto({
                id: -1,
                name: undefined,
                responsibleSubType: undefined,
                responsibleType: undefined
            });
            this.responsibleSubActor = new CompromiseResponsibleSubActorDto({
                id: -1,
                name: undefined
            });
            this.compromiseLabel = new CompromiseLabelLocationDto({
                id: -1,
                name: undefined
            });
            this.compromiseState = new CompromiseStateLocationDto({
                id: -1,
                name: undefined,
                subStates: []
            });
            this.compromiseSubState = new CompromiseSubStateLocationDto({
                id: -1,
                name: undefined
            });
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
            this.dueDate = data["dueDate"] ? moment(data["dueDate"]) : <any>undefined;
            this.deadLine = data["deadLine"] ? moment(data["deadLine"]) : <any>undefined;
            this.lastModificationTime = data["lastModificationTime"] ? moment(data["lastModificationTime"]) : <any>undefined;
            this.record = data["record"] ? UtilityRecordDto.fromJS(data["record"]) : <any>undefined;
            this.type = data["type"];
            this.territorialUnits = data["territorialUnits"];
            this.status = data["status"] ? UtilityParameterDto.fromJS(data["status"]) : <any>undefined;
            this.isPriority = data["isPriority"];
            this.womanCompromise = data["womanCompromise"];
            this.isWomanCompromise = this.womanCompromise ? "true" : "false";
            this.priorityReference = data["priorityReference"];
            this.responsibleActor = data["responsibleActor"] ? CompromiseResponsibleActorDto.fromJS(data["responsibleActor"]) : new CompromiseResponsibleActorDto({
                id: -1,
                name: undefined,
                responsibleSubType: undefined,
                responsibleType: undefined
            });
            this.responsibleSubActor = data["responsibleSubActor"] ? CompromiseResponsibleSubActorDto.fromJS(data["responsibleSubActor"]) : new CompromiseResponsibleSubActorDto({
                id: -1,
                name: undefined
            });
            this.pipmef = data["pipmef"] ? PipMefDto.fromJS(data["pipmef"]) : <any>undefined;
            this.compromiseLabel = data["compromiseLabel"] ? CompromiseLabelLocationDto.fromJS(data["compromiseLabel"]) : new CompromiseLabelLocationDto({
                id: -1,
                name: undefined
            });
            this.compromiseState = data["compromiseState"] ? CompromiseStateLocationDto.fromJS(data["compromiseState"]) : new CompromiseStateLocationDto({
                id: -1,
                name: undefined,
                subStates: []
            });
            this.compromiseSubState = data["compromiseSubState"] ? CompromiseSubStateLocationDto.fromJS(data["compromiseSubState"]) : new CompromiseLabelLocationDto({
                id: -1,
                name: undefined
            });
            this.creatorUser = data["creatorUser"] ? CompromiseUserDto.fromJS(data["creatorUser"]) : <any>undefined;
            this.editUser = data["editUser"] ? CompromiseUserDto.fromJS(data["editUser"]) : <any>undefined;

            if (Array.isArray(data["compromiseLocations"])) {
                this.compromiseLocations = [] as any;
                for (let item of data["compromiseLocations"])
                    this.compromiseLocations!.push(CompromiseLocationDto.fromJS(item));
            }
            if (Array.isArray(data["involved"])) {
                this.involved = [] as any;
                for (let item of data["involved"])
                    this.involved!.push(CompromiseInvolvedLocationDto.fromJS(item));
            }
            if (Array.isArray(data["responsibles"])) {
                this.responsibles = [] as any;
                for (let item of data["responsibles"])
                    this.responsibles!.push(CompromiseResponsibleDto.fromJS(item));
            }
            if (Array.isArray(data["situations"])) {
                this.situations = [] as any;
                for (let item of data["situations"])
                    this.situations!.push(CompromiseTracingDto.fromJS(item));
            }
            if (Array.isArray(data["timelines"])) {
                this.timelines = [] as any;
                for (let item of data["timelines"])
                    this.timelines!.push(CompromiseTimelineDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CompromiseDto {
        data = typeof data === 'object' ? data : {};
        let result = new CompromiseDto();
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
        data["womanCompromise"] = this.womanCompromise;
        data["dueDate"] = this.dueDate ? this.dueDate.toISOString() : <any>undefined;
        data["deadLine"] = this.deadLine ? this.deadLine.toISOString() : <any>undefined;
        data["priorityReference"] = this.priorityReference;
        data["responsibleActor"] = this.responsibleActor ? this.responsibleActor.toJSON() : <any>undefined;
        data["responsibleSubActor"] = this.responsibleSubActor ? this.responsibleSubActor.toJSON() : <any>undefined;
        data["pipmef"] = this.pipmef ? this.pipmef.toJSON() : <any>undefined;
        data["compromiseLabel"] = this.compromiseLabel ? this.compromiseLabel.toJSON() : <any>undefined;
        data["compromiseState"] = this.compromiseState ? this.compromiseState.toJSON() : <any>undefined;
        data["compromiseSubState"] = this.compromiseSubState ? this.compromiseSubState.toJSON() : <any>undefined;

        if (Array.isArray(this.involved)) {
            data["involved"] = [];
            for (let item of this.involved)
                data["involved"].push(item.toJSON());
        }
        if (Array.isArray(this.responsibles)) {
            data["responsibles"] = [];
            for (let item of this.responsibles)
                data["responsibles"].push(item.toJSON());
        }
        if (Array.isArray(this.compromiseLocations)) {
            data["compromiseLocations"] = [];
            for (let item of this.compromiseLocations)
                data["compromiseLocations"].push(item.toJSON());
        }
        if (Array.isArray(this.situations)) {
            data["situations"] = [];
            for (let item of this.situations)
                data["situations"].push(item.toJSON());
        }
        if (Array.isArray(this.uploads)) {
            data["uploads"] = [];
            for (let item of this.uploads)
                data["uploads"].push(item.toJSON());
        }
        if (Array.isArray(this.timelines)) {
            data["timelines"] = [];
            for (let item of this.timelines)
                data["timelines"].push(item.toJSON());
        }
        return data;
    }
}

export interface ICompromiseLocationDto {
    id: number;
    socialConflictLocation: UtilitySocialConflictLocationDto;
    check: boolean;
}

export class CompromiseLocationDto implements ICompromiseLocationDto {
    id: number;
    socialConflictLocation: UtilitySocialConflictLocationDto;
    check: boolean;

    //readonly
    isHidden: boolean;
    
    constructor(data?: ICompromiseLocationDto) {
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
            this.socialConflictLocation = data["socialConflictLocation"] ? UtilitySocialConflictLocationDto.fromJS(data["socialConflictLocation"]) : <any>undefined;
            this.check = data["check"];
        }
    }

    static fromJS(data: any): CompromiseLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new CompromiseLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["socialConflictLocation"] = this.socialConflictLocation ? this.socialConflictLocation.toJSON() : <any>undefined;
        data["check"] = this.check;

        return data;
    }
}

export interface ICompromiseTracingDto {
    id: number;
    description: string;
    creationTime: moment.Moment;
    resource: CompromiseResourceDto;
    remove: boolean;
}

export class CompromiseTracingDto implements ICompromiseTracingDto {
    id: number;
    description: string;
    creationTime: moment.Moment;
    resource: CompromiseResourceDto;
    remove: boolean;

    constructor(data?: ICompromiseTracingDto) {
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
            this.resource = data["resource"] ? CompromiseResourceDto.fromJS(data["resource"]) : <any>undefined;
        }
    }

    static fromJS(data: any): CompromiseTracingDto {
        data = typeof data === 'object' ? data : {};
        let result = new CompromiseTracingDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["remove"] = this.remove;

        return data;
    }
}

export interface ICompromiseUploadTracingDto {
    creationTime: moment.Moment;
    description: string;
    uploadFile: AttachmentUploadDto;
}

export class CompromiseUploadTracingDto implements ICompromiseUploadTracingDto {
    creationTime: moment.Moment;
    description: string;
    uploadFile: AttachmentUploadDto;

    constructor(data?: ICompromiseUploadTracingDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["description"] = this.description;
        data["uploadFile"] = this.uploadFile ? this.uploadFile.toJSON() : <any>undefined;

        return data;
    }
}

export interface ICompromiseResourceDto {
    id: number;
    creationTime: moment.Moment;
    creatorUserName: string;
    resource: string;
    name: string;
    fileName: string;
    size: string;
    extension: string;
    className: string;
}

export class CompromiseResourceDto implements ICompromiseResourceDto {
    id: number;
    creationTime: moment.Moment;
    creatorUserName: string;
    resource: string;
    name: string;
    fileName: string;
    size: string;
    extension: string;
    className: string;

    constructor(data?: ICompromiseResourceDto) {
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
        }
    }

    static fromJS(data: any): CompromiseResourceDto {
        data = typeof data === 'object' ? data : {};
        let result = new CompromiseResourceDto();
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

        return data;
    }
}

export interface ICompromiseTimelineDto {
    id: number;
    phase: UtilityParameterDto;
    milestone: UtilityParameterDto;
    proyectedTime: moment.Moment;
    completedTime: moment.Moment;
    observation: string;
}

export class CompromiseTimelineDto implements ICompromiseTimelineDto {
    id: number;
    phase: UtilityParameterDto;
    milestone: UtilityParameterDto;
    proyectedTime: moment.Moment;
    completedTime: moment.Moment;
    observation: string;

    //readonly
    remove: boolean;
    isHidden: boolean;

    constructor(data?: ICompromiseTimelineDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.phase = new UtilityParameterDto({
                id: -1,
                order: -1,
                value: undefined,
                parentId: undefined
            });
            this.milestone = new UtilityParameterDto({
                id: -1,
                order: -1,
                value: undefined,
                parentId: undefined
            });
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.phase = data["phase"] ? UtilityParameterDto.fromJS(data["phase"]) : <any>undefined;
            this.milestone = data["milestone"] ? UtilityParameterDto.fromJS(data["milestone"]) : <any>undefined;
            this.proyectedTime = data["proyectedTime"] ? moment(data["proyectedTime"].toString()) : <any>undefined;
            this.completedTime = data["completedTime"] ? moment(data["completedTime"].toString()) : <any>undefined;
            this.observation = data["observation"];
        }
    }

    static fromJS(data: any): CompromiseTimelineDto {
        data = typeof data === 'object' ? data : {};
        let result = new CompromiseTimelineDto();
        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["phase"] = this.phase ? this.phase.toJSON() : <any>undefined;
        data["milestone"] = this.milestone ? this.milestone.toJSON() : <any>undefined;
        data["proyectedTime"] = this.proyectedTime ? this.proyectedTime.toISOString() : <any>undefined;
        data["completedTime"] = this.completedTime ? this.completedTime.toISOString() : <any>undefined;
        data["observation"] = this.observation;
        data["remove"] = this.remove;

        return data;
    }
}

export interface ICompromiseInvolvedLocationDto {
    id: number;
    responsibleActor: CompromiseResponsibleActorDto;
    responsibleSubActor: CompromiseResponsibleSubActorDto;
    remove: boolean;
}

export class CompromiseInvolvedLocationDto implements ICompromiseInvolvedLocationDto {
    id: number;
    responsibleActor: CompromiseResponsibleActorDto;
    responsibleSubActor: CompromiseResponsibleSubActorDto;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ICompromiseInvolvedLocationDto) {
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
            this.responsibleActor = data["responsibleActor"] ? CompromiseResponsibleActorDto.fromJS(data["responsibleActor"]) : <any>undefined;
            this.responsibleSubActor = data["responsibleSubActor"] ? CompromiseResponsibleSubActorDto.fromJS(data["responsibleSubActor"]) : <any>undefined;
            this.remove = data["remove"];
        }
    }

    static fromJS(data: any): CompromiseInvolvedLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new CompromiseInvolvedLocationDto();
        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["responsibleActor"] = this.responsibleActor ? this.responsibleActor.toJSON() : <any>undefined;
        data["responsibleSubActor"] = this.responsibleSubActor ? this.responsibleSubActor.toJSON() : <any>undefined;
        data["remove"] = this.remove;

        return data;
    }
}

export interface ICompromiseResponsibleDto {
    id: number;
    responsibleActor: CompromiseResponsibleActorDto;
    responsibleSubActor: CompromiseResponsibleSubActorDto;
    remove: boolean;
}

export class CompromiseResponsibleDto implements ICompromiseResponsibleDto {
    id: number;
    responsibleActor: CompromiseResponsibleActorDto;
    responsibleSubActor: CompromiseResponsibleSubActorDto;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ICompromiseResponsibleDto) {
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
            this.responsibleActor = data["responsibleActor"] ? CompromiseResponsibleActorDto.fromJS(data["responsibleActor"]) : <any>undefined;
            this.responsibleSubActor = data["responsibleSubActor"] ? CompromiseResponsibleSubActorDto.fromJS(data["responsibleSubActor"]) : <any>undefined;
            this.remove = data["remove"];
        }
    }

    static fromJS(data: any): CompromiseResponsibleDto {
        data = typeof data === 'object' ? data : {};
        let result = new CompromiseResponsibleDto();
        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        console.log("this.responsibleActor cccccccc:",this.responsibleActor)
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["responsibleActor"] = this.responsibleActor ? toJSON(this.responsibleActor) : <any>undefined;
        data["responsibleSubActor"] = this.responsibleSubActor ? toJSON(this.responsibleSubActor) : <any>undefined;
        data["remove"] = this.remove;

        return data;
    }
}

export interface ICompromiseResponsibleActorDto {
    id: number;
    name: string;
    responsibleType: CompromiseResponsibleTypeDto;
    responsibleSubType: CompromiseResponsibleSubTypeDto;
}

export class CompromiseResponsibleActorDto implements ICompromiseResponsibleActorDto {
    id: number;
    name: string;
    responsibleType: CompromiseResponsibleTypeDto;
    responsibleSubType: CompromiseResponsibleSubTypeDto;
    responsibleSubActors: CompromiseResponsibleSubActorDto[];

    constructor(data?: ICompromiseResponsibleActorDto) {
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
            this.responsibleType = data["responsibleType"] ? CompromiseResponsibleTypeDto.fromJS(data["responsibleType"]) : <any>undefined;
            this.responsibleSubType = data["responsibleSubType"] ? CompromiseResponsibleSubTypeDto.fromJS(data["responsibleSubType"]) : <any>undefined;
            if (Array.isArray(data["responsibleSubActors"])) {
                this.responsibleSubActors = [] as any;
                for (let item of data["responsibleSubActors"])
                    this.responsibleSubActors!.push(CompromiseResponsibleSubActorDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CompromiseResponsibleActorDto {
        data = typeof data === 'object' ? data : {};
        let result = new CompromiseResponsibleActorDto();
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

export function toJSON(data?: any) {
    console.log("data:",data)
    data = typeof data === 'object' ? data : {};
    data["id"] = data.id;
    data["name"] = data.name;

    return data;
}

export interface ICompromiseResponsibleSubActorDto {
    id: number;
    name: string;
}

export class CompromiseResponsibleSubActorDto implements ICompromiseResponsibleSubActorDto {
    id: number;
    name: string;

    constructor(data?: ICompromiseResponsibleSubActorDto) {
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

    static fromJS(data: any): CompromiseResponsibleSubActorDto {
        data = typeof data === 'object' ? data : {};
        let result = new CompromiseResponsibleSubActorDto();
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


export interface ICompromiseResponsibleTypeDto {
    id: number;
    name: string;
    subTypes: CompromiseResponsibleSubTypeDto[];
}

export class CompromiseResponsibleTypeDto implements ICompromiseResponsibleTypeDto {
    id: number;
    name: string;
    subTypes: CompromiseResponsibleSubTypeDto[];

    constructor(data?: ICompromiseResponsibleTypeDto) {
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

            if (Array.isArray(data["subTypes"])) {
                this.subTypes = [] as any;
                for (let item of data["subTypes"])
                    this.subTypes!.push(CompromiseResponsibleSubTypeDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CompromiseResponsibleTypeDto {
        data = typeof data === 'object' ? data : {};
        let result = new CompromiseResponsibleTypeDto();
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

export interface ICompromiseResponsibleSubTypeDto {
    id: number;
    name: string;
}

export class CompromiseResponsibleSubTypeDto implements ICompromiseResponsibleSubTypeDto {
    id: number;
    name: string;

    constructor(data?: ICompromiseResponsibleSubTypeDto) {
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

    static fromJS(data: any): CompromiseResponsibleSubTypeDto {
        data = typeof data === 'object' ? data : {};
        let result = new CompromiseResponsibleSubTypeDto();
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

export interface ICompromiseLabelLocationDto {
    id: number;
    name: string;
}

export class CompromiseLabelLocationDto implements ICompromiseLabelLocationDto {
    id: number;
    name: string;

    constructor(data?: ICompromiseLabelLocationDto) {
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

    static fromJS(data: any): CompromiseLabelLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new CompromiseLabelLocationDto();
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

export interface ICompromiseUserDto {
    id: number;
    name: string;
    surname: string;
}

export class CompromiseUserDto implements ICompromiseUserDto {
    id: number;
    name: string;
    surname: string;

    constructor(data?: ICompromiseUserDto) {
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

    static fromJS(data: any): CompromiseUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new CompromiseUserDto();
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

export interface ICompromiseStateLocationDto {
    id: number;
    name: string;
    subStates: CompromiseSubStateLocationDto[];
}

export class CompromiseStateLocationDto implements ICompromiseStateLocationDto {
    id: number;
    name: string;
    subStates: CompromiseSubStateLocationDto[];

    constructor(data?: ICompromiseStateLocationDto) {
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
            if (Array.isArray(data["subStates"])) {
                this.subStates = [] as any;
                for (let item of data["subStates"])
                    this.subStates!.push(CompromiseSubStateLocationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CompromiseStateLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new CompromiseStateLocationDto();
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

export interface ICompromiseSubStateLocationDto {
    id: number;
    name: string;
}

export class CompromiseSubStateLocationDto implements ICompromiseSubStateLocationDto {
    id: number;
    name: string;

    constructor(data?: ICompromiseSubStateLocationDto) {
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

    static fromJS(data: any): CompromiseSubStateLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new CompromiseSubStateLocationDto();
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


export enum CompromiseType {
    None,
    PIP,
    Activity
}