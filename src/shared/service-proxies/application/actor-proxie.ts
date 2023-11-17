import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete } from '../service-proxies';
import * as moment from 'moment';

@Injectable()
export class ActorServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(filter: string | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfActorListDto> {
        let url_ = this.baseUrl + "/api/services/app/Actor/GetAll?";
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
            return this.processGetAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfActorListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfActorListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfActorListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfActorListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfActorListDto>(<any>null);
    }

    get(id: number): Observable<ActorGetDataDto> {
        let url_ = this.baseUrl + "/api/services/app/Actor/Get?";
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
                    return <Observable<ActorGetDataDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<ActorGetDataDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<ActorGetDataDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = ActorGetDataDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<ActorGetDataDto>(<any>null);
    }

    create(variable: ActorDto): Observable<ActorDto> {
        let url_ = this.baseUrl + "/api/services/app/Actor/Create";

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
                    return <Observable<ActorDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<ActorDto>><any>_observableThrow(response_);
        }));
    }

    protected processCreate(response: HttpResponseBase): Observable<ActorDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = ActorDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<ActorDto>(<any>null);
    }

    update(variable: ActorDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/Actor/Update";

        console.log("udpate",variable.toJSON())
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
        let url_ = this.baseUrl + "/api/services/app/Actor/Delete?";
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

export interface IPagedResultDtoOfActorListDto {
    totalCount: number;
    items: ActorDto[] | undefined;
}

export class PagedResultDtoOfActorListDto implements IPagedResultDtoOfActorListDto {
    totalCount!: number;
    items!: ActorDto[] | undefined;

    constructor(data?: IPagedResultDtoOfActorListDto) {
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
                    this.items!.push(ActorDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfActorListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfActorListDto();
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

export interface IActorGetDataDto {
    actor: ActorDto;
    actorTypes: ActorTypeDto[];
    typologies: ActorTypologyDto[];
    actorMovements: ActorMovementDto[];
}

export class ActorGetDataDto implements IActorGetDataDto {
    actor: ActorDto;
    actorTypes: ActorTypeDto[];
    typologies: ActorTypologyDto[];
    actorMovements: ActorMovementDto[];
    socialConflicts: ActorSocialConflictDto[];
    socialConflictAlerts: ActorSocialConflictAlertDto[];
    socialConflictSensibles: ActorSocialConflictSensibleDto[];

    constructor(data?: IActorGetDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {

        if (_data) {
            this.actor = _data["actor"] ? ActorDto.fromJS(_data["actor"]) : <any>undefined;
            if (Array.isArray(_data["actorTypes"])) {
                this.actorTypes = [] as any;
                for (let item of _data["actorTypes"])
                    this.actorTypes!.push(ActorTypeDto.fromJS(item));
            }
            if (Array.isArray(_data["typologies"])) {
                this.typologies = [] as any;
                for (let item of _data["typologies"])
                    this.typologies!.push(ActorTypologyDto.fromJS(item));
            }
            if (Array.isArray(_data["actorMovements"])) {
                this.actorMovements = [] as any;
                for (let item of _data["actorMovements"])
                    this.actorMovements!.push(ActorMovementDto.fromJS(item));
            }
            if (Array.isArray(_data["socialConflicts"])) {
                this.socialConflicts = [] as any;
                for (let item of _data["socialConflicts"])
                    this.socialConflicts!.push(ActorSocialConflictDto.fromJS(item));
            }
            if (Array.isArray(_data["socialConflictAlerts"])) {
                this.socialConflictAlerts = [] as any;
                for (let item of _data["socialConflictAlerts"])
                    this.socialConflictAlerts!.push(ActorSocialConflictAlertDto.fromJS(item));
            }
            if (Array.isArray(_data["socialConflictSensibles"])) {
                this.socialConflictSensibles = [] as any;
                for (let item of _data["socialConflictSensibles"])
                    this.socialConflictSensibles!.push(ActorSocialConflictSensibleDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ActorGetDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new ActorGetDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["actor"] = this.actor ? this.actor.toJSON() : <any>undefined;
        if (Array.isArray(this.actorTypes)) {
            data["actorTypes"] = [];
            for (let item of this.actorTypes)
                data["actorTypes"].push(item.toJSON());
        }
        console.log("typologies",this.typologies)
        if (Array.isArray(this.typologies)) {
            data["typologies"] = [];
            for (let item of this.typologies)
                data["typologies"].push(item.toJSON());
        }
        if (Array.isArray(this.actorMovements)) {
            data["actorMovements"] = [];
            for (let item of this.actorMovements)
                data["actorMovements"].push(item.toJSON());
        }
        if (Array.isArray(this.socialConflicts)) {
            data["socialConflicts"] = [];
            for (let item of this.socialConflicts)
                data["socialConflicts"].push(item.toJSON());
        }
        if (Array.isArray(this.socialConflictAlerts)) {
            data["socialConflictAlerts"] = [];
            for (let item of this.socialConflictAlerts)
                data["socialConflictAlerts"].push(item.toJSON());
        }
        if (Array.isArray(this.socialConflictSensibles)) {
            data["socialConflictSensibles"] = [];
            for (let item of this.socialConflictSensibles)
                data["socialConflictSensibles"].push(item.toJSON());
        }
        return data;
    }
}

export interface IActorDto {
    id: number;
    fullName: string;
    documentNumber: string;
    jobPosition: string;
    institution : string;
    institutionAddress : string;
    phoneNumber : string;   
    emailAddress: string;
    position: string;
    interest: string;
    isPoliticalAssociation: boolean;
    politicalAssociation: string;
    enabled: boolean;
    actorType: ActorTypeDto;
    actorMovement: ActorMovementDto;
    creatorUser: ActorUserDto;
    editUser: ActorUserDto;
    creationTime: moment.Moment;
    lastModificationTime: moment.Moment;
}

export class ActorDto implements IActorDto {
    id: number;
    fullName: string;
    documentNumber: string;
    jobPosition: string;
    institution : string;
    institutionAddress : string;
    phoneNumber : string;   
    emailAddress: string;
    position: string;
    interest: string;
    isPoliticalAssociation: boolean;
    politicalAssociation: string;
    enabled: boolean;
    actorType: ActorTypeDto;
    actorMovement: ActorMovementDto;
    creatorUser: ActorUserDto;
    editUser: ActorUserDto;
    creationTime: moment.Moment;
    lastModificationTime: moment.Moment;

    constructor(data?: IActorDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.actorType = new ActorTypeDto()
            this.actorType.id = -1;
            this.actorMovement = new ActorMovementDto();
            this.actorMovement.id = -1;
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.fullName = _data["fullName"];
            this.documentNumber = _data["documentNumber"];
            this.jobPosition = _data["jobPosition"];
            this.institution = _data["institution"];      
            this.institutionAddress = _data["institutionAddress"];    
            this.phoneNumber = _data["phoneNumber"];       
            this.emailAddress = _data["emailAddress"];
            this.position = _data["position"];
            this.interest = _data["interest"];
            this.isPoliticalAssociation = _data["isPoliticalAssociation"];
            this.politicalAssociation = _data["politicalAssociation"];
            this.enabled = _data["enabled"];
            // this.actorType = _data["actorType"] ? ActorTypeDto.fromJS(_data["actorType"]) : <any>undefined;

            this.actorType = _data["actorType"] ? ActorTypeDto.fromJS(_data["actorType"]) : new ActorTypeDto({
                id: -1,
                name: undefined,
                showDetail: false,
                showMovement: undefined
            });

            // this.actorMovement = _data["actorMovement"] ? ActorMovementDto.fromJS(_data["actorMovement"]) : <any>undefined;
            this.actorMovement = _data["actorMovement"] ? ActorMovementDto.fromJS(_data["actorMovement"]) : new ActorMovementDto({
                id: -1,
                name: undefined,
            });

            this.creatorUser = _data["creatorUser"] ? ActorUserDto.fromJS(_data["creatorUser"]) : <any>undefined;
            this.editUser = _data["editUser"] ? ActorUserDto.fromJS(_data["editUser"]) : <any>undefined;
            this.creationTime = _data["creationTime"] ? moment(_data["creationTime"]) : <any>undefined;
            this.lastModificationTime = _data["lastModificationTime"] ? moment(_data["lastModificationTime"]) : <any>undefined;

        }
    }

    static fromJS(data: any): ActorDto {
        data = typeof data === 'object' ? data : {};
        let result = new ActorDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["fullName"] = this.fullName;
        data["documentNumber"] = this.documentNumber;
        data["jobPosition"] = this.jobPosition;
        data["institution"] = this.institution;
        data["institutionAddress"] = this.institutionAddress;
        data["phoneNumber"] = this.phoneNumber;
        data["emailAddress"] = this.emailAddress;
        data["position"] = this.position;
        data["interest"] = this.interest;
        data["isPoliticalAssociation"] = this.isPoliticalAssociation;
        data["politicalAssociation"] = this.politicalAssociation;
        data["enabled"] = this.enabled;
        data["actorType"] = this.actorType ? this.actorType.toJSON() : <any>undefined;
        data["actorMovement"] = this.actorMovement ? this.actorMovement.toJSON() : <any>undefined;
        data["creatorUser"] = this.creatorUser ? this.creatorUser.toJSON() : <any>undefined;
        data["editUser"] = this.editUser ? this.editUser.toJSON() : <any>undefined;
        data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : <any>undefined;
        data["lastModificationTime"] = this.lastModificationTime ? this.lastModificationTime.toISOString() : <any>undefined;

        return data;
    }
}

export interface IActorTypeDto {
    id: number;
    name: string;
    showDetail: boolean;
    showMovement: boolean;
}

export class ActorTypeDto implements IActorTypeDto {
    id: number;
    name: string;
    showDetail: boolean;
    showMovement: boolean;

    constructor(data?: IActorTypeDto) {
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
            this.showDetail = data["showDetail"];
            this.showMovement = data["showMovement"];
        }
    }

    static fromJS(data: any): ActorTypeDto {
        data = typeof data === 'object' ? data : {};
        let result = new ActorTypeDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["showDetail"] = this.showDetail;
        data["showMovement"] = this.showMovement;
        return data;
    }
}

export interface IActorTypologyDto {
    id: number;
    name: string;
    subTypologies: ActorSubTypologyDto[];
}

export class ActorTypologyDto implements IActorTypologyDto {
    id: number;
    name: string;
    subTypologies: ActorSubTypologyDto[];

    constructor(data?: IActorTypologyDto) {
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
            if (Array.isArray(data["subTypologies"])) {
                this.subTypologies = [] as any;
                for (let item of data["subTypologies"])
                    this.subTypologies!.push(ActorSubTypologyDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ActorTypologyDto {
        data = typeof data === 'object' ? data : {};
        let result = new ActorTypologyDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        if (Array.isArray(this.subTypologies)) {
            data["subTypologies"] = [];
            for (let item of this.subTypologies)
                data["subTypologies"].push(item.toJSON());
        }
        return data;
    }
}

export interface IActorSubTypologyDto {
    id: number;
    name: string;
}

export class ActorSubTypologyDto implements IActorSubTypologyDto {
    id: number;
    name: string;

    constructor(data?: IActorSubTypologyDto) {
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

    static fromJS(data: any): ActorSubTypologyDto {
        data = typeof data === 'object' ? data : {};
        let result = new ActorSubTypologyDto();
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

export interface IActorMovementDto {
    id: number;
    name: string;
}

export class ActorMovementDto implements IActorMovementDto {
    id: number;
    name: string;

    constructor(data?: IActorMovementDto) {
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

    static fromJS(data: any): ActorMovementDto {
        data = typeof data === 'object' ? data : {};
        let result = new ActorMovementDto();
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

export interface IActorUserDto {
    name: string;
    surname: string;
}

export class ActorUserDto implements IActorUserDto {
    name: string;
    surname: string;

    constructor(data?: IActorUserDto) {
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
        }
    }

    static fromJS(data: any): ActorUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new ActorUserDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["surname"] = this.surname;
        return data;
    }
}

export interface IActorSocialConflictDto {
    id: number;
    generation: boolean;
    year: number;
    count: number;
    code: string;
    caseName: string;
    description: string;
    territorialUnits: string;
    creationTime: moment.Moment;
    lastModificationTime: moment.Moment;
    dialog: string;
    problem: string;
    plaint: string;
    factorContext: string;
    strategy: string;
    caseNameVerification: boolean;
    descriptionVerification: boolean;
    problemVerification: boolean;
    riskVerification: boolean;
    managementVerification: boolean;
    stateVerification: boolean;
    conditionVerification: boolean;
    latitude: number;
    longitude: number;
    published: number;
}

export class ActorSocialConflictDto implements IActorSocialConflictDto {
    id: number;
    generation: boolean;
    year: number;
    count: number;
    code: string;
    caseName: string;
    description: string;
    territorialUnits: string;
    creationTime: moment.Moment;
    lastModificationTime: moment.Moment;
    dialog: string;
    problem: string;
    plaint: string;
    factorContext: string;
    strategy: string;
    caseNameVerification: boolean;
    descriptionVerification: boolean;
    problemVerification: boolean;
    riskVerification: boolean;
    managementVerification: boolean;
    stateVerification: boolean;
    conditionVerification: boolean;
    latitude: number;
    longitude: number;
    published: number;

    //verification
    caseNameVerificationState: string;
    problemVerificationState: string;
    descriptionVerificationState: string;

    caseNameVerificationChange: boolean;
    problemVerificationChange: boolean;
    descriptionVerificationChange: boolean;

    //replacement
    replaceCode: boolean;
    replaceYear: number;
    replaceCount: number;

    constructor(data?: IActorSocialConflictDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.caseNameVerificationState = 'false';
            this.problemVerificationState = 'false';
            this.descriptionVerificationState = 'false';

            this.caseNameVerificationChange = false;
            this.problemVerificationChange = false;
            this.descriptionVerificationChange = false;
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.generation = data["generation"];
            this.year = data["year"];
            this.count = data["count"];
            this.code = data["code"];
            this.caseName = data["caseName"];
            this.description = data["description"];
            this.creationTime = data["creationTime"] ? moment(data["creationTime"]) : <any>undefined;
            this.lastModificationTime = data["lastModificationTime"] ? moment(data["lastModificationTime"]) : <any>undefined;
            this.territorialUnits = data["territorialUnits"];
            this.dialog = data["dialog"];
            this.problem = data["problem"];
            this.plaint = data["plaint"];
            this.factorContext = data["factorContext"];
            this.strategy = data["strategy"];
            this.caseNameVerification = data["caseNameVerification"];
            this.descriptionVerification = data["descriptionVerification"];
            this.problemVerification = data["problemVerification"];
            this.riskVerification = data["riskVerification"];
            this.managementVerification = data["managementVerification"];
            this.stateVerification = data["stateVerification"];
            this.conditionVerification = data["conditionVerification"];
            this.latitude = data["latitude"];
            this.longitude = data["longitude"];
            this.published = data["published"];
            this.caseNameVerificationState = data["caseNameVerificationState"];
            this.problemVerificationState = data["problemVerificationState"];
            this.descriptionVerificationState = data["descriptionVerificationState"];
        }
    }

    static fromJS(data: any): ActorSocialConflictDto {
        data = typeof data === 'object' ? data : {};
        let result = new ActorSocialConflictDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["code"] = this.code;
        data["caseName"] = this.caseName;
        data["description"] = this.description;
        data["problem"] = this.problem;
        data["dialog"] = this.dialog;
        data["plaint"] = this.plaint;
        data["factorContext"] = this.factorContext;
        data["strategy"] = this.strategy;
        data["latitude"] = this.latitude;
        data["longitude"] = this.longitude;
        data["published"] = this.published;

        data["caseNameVerificationState"] = this.caseNameVerificationState;
        data["problemVerificationState"] = this.problemVerificationState;
        data["descriptionVerificationState"] = this.descriptionVerificationState;

        data["caseNameVerificationChange"] = this.caseNameVerificationChange;
        data["problemVerificationChange"] = this.problemVerificationChange;
        data["descriptionVerificationChange"] = this.descriptionVerificationChange;

        data["replaceCode"] = this.replaceCode;
        data["replaceYear"] = this.replaceYear;
        data["replaceCount"] = this.replaceCount;

        data["sugerences"] = [];
        
        return data;
    }
}

export interface IActorSocialConflictAlertDto {
    id: number;
    year: number;
    count: number;
    generation: boolean;
    code: string;
    description: string;
    information: string;
    creationTime: moment.Moment;
    lastModificationTime: moment.Moment;
    alertTime: moment.Moment;
    demand: string;
    aditionalInformation: string;
    source: string;
    sourceType: string;
    link: string;
    recommendations: string;
    actions: string;
    latitude: number;
    longitude: number;
    published: number;
}

export class ActorSocialConflictAlertDto implements IActorSocialConflictAlertDto {
    id: number;
    year: number;
    count: number;
    generation: boolean;
    code: string;
    description: string;
    information: string;
    creationTime: moment.Moment;
    lastModificationTime: moment.Moment;
    alertTime: moment.Moment;
    demand: string;
    aditionalInformation: string;
    source: string;
    sourceType: string;
    link: string;
    recommendations: string;
    actions: string;
    latitude: number;
    longitude: number;
    published: number;

    //readonly
    regionsText: string;
    actorsText: string[];

    constructor(data?: IActorSocialConflictAlertDto) {
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
            this.year = data["year"];
            this.count = data["count"];
            this.generation = data["generation"];
            this.code = data["code"];
            this.description = data["description"];
            this.information = data["information"];
            this.demand = data["demand"];
            this.aditionalInformation = data["aditionalInformation"];
            this.source = data["source"];
            this.sourceType = data["sourceType"];
            this.link = data["link"];
            this.recommendations = data["recommendations"];
            this.actions = data["actions"];
            this.creationTime = data["creationTime"] ? moment(data["creationTime"]) : <any>undefined;
            this.lastModificationTime = data["lastModificationTime"] ? moment(data["lastModificationTime"]) : <any>undefined;
            this.alertTime = data["alertTime"] ? moment(data["alertTime"]) : <any>undefined;
            this.latitude = data["latitude"];
            this.longitude = data["longitude"];
            this.published = data["published"];
        }
    }

    static fromJS(data: any): ActorSocialConflictAlertDto {
        data = typeof data === 'object' ? data : {};
        let result = new ActorSocialConflictAlertDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["description"] = this.description;
        data["information"] = this.information;
        data["demand"] = this.demand;
        data["aditionalInformation"] = this.aditionalInformation;
        data["source"] = this.source;
        data["sourceType"] = this.sourceType;
        data["link"] = this.link;
        data["recommendations"] = this.recommendations;
        data["actions"] = this.actions;
        data["alertTime"] = this.alertTime ? this.alertTime.toISOString() : <any>undefined;
        data["latitude"] = this.latitude;
        data["longitude"] = this.longitude;
        data["published"] = this.published;

        return data;
    }
}

export interface IActorSocialConflictSensibleDto {
    id: number;
    generation: boolean;
    count: number;
    year: number;
    code: string;
    caseName: string;
    territorialUnits: string;
    creationTime: moment.Moment;
    lastModificationTime: moment.Moment;
    problem: string;
    caseNameVerification: boolean;
    problemVerification: boolean;
    riskVerification: boolean;
    managementVerification: boolean;
    stateVerification: boolean;
    conditionVerification: boolean;
    latitude: number;
    longitude: number;
    published: number;
}

export class ActorSocialConflictSensibleDto implements IActorSocialConflictSensibleDto {
    id: number;
    generation: boolean;
    count: number;
    year: number;
    code: string;
    caseName: string;
    territorialUnits: string;
    creationTime: moment.Moment;
    lastModificationTime: moment.Moment;
    problem: string;
    caseNameVerification: boolean;
    problemVerification: boolean;
    riskVerification: boolean;
    managementVerification: boolean;
    stateVerification: boolean;
    conditionVerification: boolean;
    latitude: number;
    longitude: number;
    published: number;

    constructor(data?: IActorSocialConflictSensibleDto) {
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
            this.generation = data["generation"];
            this.count = data["count"];
            this.year = data["year"];
            this.code = data["code"];
            this.caseName = data["caseName"];
            this.creationTime = data["creationTime"] ? moment(data["creationTime"]) : <any>undefined;
            this.lastModificationTime = data["lastModificationTime"] ? moment(data["lastModificationTime"]) : <any>undefined;
            this.territorialUnits = data["territorialUnits"];
            this.problem = data["problem"];
            this.caseNameVerification = data["caseNameVerification"];
            this.problemVerification = data["problemVerification"];
            this.riskVerification = data["riskVerification"];
            this.managementVerification = data["managementVerification"];
            this.stateVerification = data["stateVerification"];
            this.conditionVerification = data["conditionVerification"];
            this.latitude = data["latitude"];
            this.longitude = data["longitude"];
            this.published = data["published"];        
        }
    }

    static fromJS(data: any): ActorSocialConflictSensibleDto {
        data = typeof data === 'object' ? data : {};
        let result = new ActorSocialConflictSensibleDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["code"] = this.code;
        data["caseName"] = this.caseName;
        data["problem"] = this.problem;
        data["sugerences"] = [];
        data["latitude"] = this.latitude;
        data["longitude"] = this.longitude;
        data["published"] = this.published;

        return data;
    }
}