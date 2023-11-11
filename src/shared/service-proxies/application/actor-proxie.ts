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
                console.log("result200",result200)
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
    // actorTypology: ActorTypologyDto;
    // actorSubTypology: ActorSubTypologyDto;
    actorMovement: ActorMovementDto;
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
    // actorTypology: ActorTypologyDto;
    // actorSubTypology: ActorSubTypologyDto;
    actorMovement: ActorMovementDto;

    constructor(data?: IActorDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.actorType = new ActorTypeDto()
            this.actorType.id = -1;
            // this.actorTypology = new ActorTypologyDto();
            // this.actorTypology.id = -1;
            // this.actorSubTypology = new ActorSubTypologyDto();
            // this.actorSubTypology.id = -1;
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
            this.actorType = _data["actorType"] ? ActorTypeDto.fromJS(_data["actorType"]) : <any>undefined;
            // this.actorTypology = _data["typology"] ? ActorTypologyDto.fromJS(_data["typology"]) : <any>undefined;
            // this.actorSubTypology = _data["subTypology"] ? ActorSubTypologyDto.fromJS(_data["subTypology"]) : <any>undefined;
            this.actorMovement = _data["actorMovement"] ? ActorMovementDto.fromJS(_data["actorMovement"]) : <any>undefined;
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
        // data["actorTypology"] = this.actorTypology ? this.actorTypology.toJSON() : <any>undefined;
        // data["actorSubTypology"] = this.actorSubTypology ? this.actorSubTypology.toJSON() : <any>undefined;
        data["actorMovement"] = this.actorMovement ? this.actorMovement.toJSON() : <any>undefined;

        return data;
    }
}

export interface IActorTypeDto {
    id: number;
    name: string;
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