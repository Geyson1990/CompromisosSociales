import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete, EntityDto, PersonType, FileDto } from '../service-proxies';
import * as moment from 'moment';
import { AttachmentUploadDto } from './utility-proxie';

@Injectable()
export class SocialConflictAlertServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(
        socialConflictAlertCode: string | undefined,
        socialConflictAlertDescription: string | undefined,
        socialConflictAlertInformation: string | undefined,
        territorialUnitId: number | undefined,
        departmentId: number | undefined,
        provinceId: number | undefined,
        districtId: number | undefined,
        personId: number | undefined,
        responsibleId: number | undefined,
        typologyId: number | undefined,
        riskId: number | undefined,
        sealId: number | undefined,
        startDate: moment.Moment | undefined,
        endDate: moment.Moment | undefined,
        filterByDate: boolean | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultDtoOfSocialConflictAlertListDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictAlert/GetAll?";

        if (socialConflictAlertCode !== undefined && socialConflictAlertCode !== null)
            url_ += "SocialConflictAlertCode=" + encodeURIComponent("" + socialConflictAlertCode) + "&";
        if (socialConflictAlertDescription !== undefined && socialConflictAlertDescription !== null)
            url_ += "SocialConflictAlertDescription=" + encodeURIComponent("" + socialConflictAlertDescription) + "&";
        if (socialConflictAlertInformation !== undefined && socialConflictAlertInformation !== null)
            url_ += "SocialConflictAlertInformation=" + encodeURIComponent("" + socialConflictAlertInformation) + "&";
        if (territorialUnitId !== undefined && territorialUnitId !== null && territorialUnitId != -1)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnitId) + "&";
        if (departmentId !== undefined && departmentId !== null && departmentId != -1)
            url_ += "DepartmentId=" + encodeURIComponent("" + departmentId) + "&";
        if (provinceId !== undefined && provinceId !== null && provinceId != -1)
            url_ += "ProvinceId=" + encodeURIComponent("" + provinceId) + "&";
        if (districtId !== undefined && districtId !== null && districtId != -1)
            url_ += "DistrictId=" + encodeURIComponent("" + districtId) + "&";
        if (personId !== undefined && personId !== null && personId != -1)
            url_ += "PersonId=" + encodeURIComponent("" + personId) + "&";
        if (responsibleId !== undefined && responsibleId !== null && responsibleId != -1)
            url_ += "ResponsibleId=" + encodeURIComponent("" + responsibleId) + "&";
        if (typologyId !== undefined && typologyId !== null && typologyId != -1)
            url_ += "TypologyId=" + encodeURIComponent("" + typologyId) + "&";
        if (riskId !== undefined && riskId !== null && riskId != -1)
            url_ += "RiskId=" + encodeURIComponent("" + riskId) + "&";
        if (sealId !== undefined && sealId !== null && sealId != -1)
            url_ += "SealId=" + encodeURIComponent("" + sealId) + "&";
        if (sorting !== undefined)
            url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
        if (filterByDate !== undefined && filterByDate != null)
            url_ += "FilterByDate=" + encodeURIComponent("" + filterByDate) + "&";
        if (maxResultCount === null)
            throw new Error("The parameter 'maxResultCount' cannot be null.");
        else if (maxResultCount !== undefined)
            url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
        if (skipCount === null)
            throw new Error("The parameter 'skipCount' cannot be null.");
        else if (skipCount !== undefined)
            url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
        if (startDate !== undefined && startDate !== null)
            url_ += "StartTime=" + encodeURIComponent(startDate ? "" + startDate.toJSON() : "") + "&";
        if (endDate !== undefined && endDate !== null)
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
                    return <Observable<PagedResultDtoOfSocialConflictAlertListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfSocialConflictAlertListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfSocialConflictAlertListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfSocialConflictAlertListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfSocialConflictAlertListDto>(<any>null);
    }

    getMatrizToExcel(
        socialConflictAlertCode: string | undefined,
        socialConflictAlertDescription: string | undefined,
        socialConflictAlertInformation: string | undefined,
        territorialUnitId: number | undefined,
        departmentId: number | undefined,
        provinceId: number | undefined,
        districtId: number | undefined,
        personId: number | undefined,
        responsibleId: number | undefined,
        typologyId: number | undefined,
        riskId: number | undefined,
        sealId: number | undefined,
        startDate: moment.Moment | undefined,
        endDate: moment.Moment | undefined,
        filterByDate: boolean | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<FileDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictAlert/GetMatrizToExcel?";

        if (socialConflictAlertCode !== undefined && socialConflictAlertCode !== null)
            url_ += "SocialConflictAlertCode=" + encodeURIComponent("" + socialConflictAlertCode) + "&";
        if (socialConflictAlertDescription !== undefined && socialConflictAlertDescription !== null)
            url_ += "SocialConflictAlertDescription=" + encodeURIComponent("" + socialConflictAlertDescription) + "&";
        if (socialConflictAlertInformation !== undefined && socialConflictAlertInformation !== null)
            url_ += "SocialConflictAlertInformation=" + encodeURIComponent("" + socialConflictAlertInformation) + "&";
        if (territorialUnitId !== undefined && territorialUnitId !== null && territorialUnitId != -1)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnitId) + "&";
        if (departmentId !== undefined && departmentId !== null && departmentId != -1)
            url_ += "DepartmentId=" + encodeURIComponent("" + departmentId) + "&";
        if (provinceId !== undefined && provinceId !== null && provinceId != -1)
            url_ += "ProvinceId=" + encodeURIComponent("" + provinceId) + "&";
        if (districtId !== undefined && districtId !== null && districtId != -1)
            url_ += "DistrictId=" + encodeURIComponent("" + districtId) + "&";
        if (personId !== undefined && personId !== null && personId != -1)
            url_ += "PersonId=" + encodeURIComponent("" + personId) + "&";
        if (responsibleId !== undefined && responsibleId !== null && responsibleId != -1)
            url_ += "ResponsibleId=" + encodeURIComponent("" + responsibleId) + "&";
        if (typologyId !== undefined && typologyId !== null && typologyId != -1)
            url_ += "TypologyId=" + encodeURIComponent("" + typologyId) + "&";
        if (riskId !== undefined && riskId !== null && riskId != -1)
            url_ += "RiskId=" + encodeURIComponent("" + riskId) + "&";
        if (sealId !== undefined && sealId !== null && sealId != -1)
            url_ += "SealId=" + encodeURIComponent("" + sealId) + "&";
        if (sorting !== undefined)
            url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
        if (filterByDate !== undefined && filterByDate != null)
            url_ += "FilterByDate=" + encodeURIComponent("" + filterByDate) + "&";
        if (maxResultCount === null)
            throw new Error("The parameter 'maxResultCount' cannot be null.");
        else if (maxResultCount !== undefined)
            url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
        if (skipCount === null)
            throw new Error("The parameter 'skipCount' cannot be null.");
        else if (skipCount !== undefined)
            url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
        if (startDate !== undefined && startDate !== null)
            url_ += "StartTime=" + encodeURIComponent(startDate ? "" + startDate.toJSON() : "") + "&";
        if (endDate !== undefined && endDate !== null)
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
            return this.processGetFile(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetFile(<any>response_);
                } catch (e) {
                    return <Observable<FileDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<FileDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetFile(response: HttpResponseBase): Observable<FileDto> {
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

    get(id: number): Observable<SocialConflictAlertGetDataDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictAlert/Get?";
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
                    return <Observable<SocialConflictAlertGetDataDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<SocialConflictAlertGetDataDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<SocialConflictAlertGetDataDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = SocialConflictAlertGetDataDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SocialConflictAlertGetDataDto>(<any>null);
    }

    getEmailConfiguration(id: number): Observable<SocialConflictAlertEmailConfiguration> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictAlert/GetEmailConfiguration?";
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
            return this.processGetEmailConfiguration(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetEmailConfiguration(<any>response_);
                } catch (e) {
                    return <Observable<SocialConflictAlertEmailConfiguration>><any>_observableThrow(e);
                }
            } else
                return <Observable<SocialConflictAlertEmailConfiguration>><any>_observableThrow(response_);
        }));
    }

    protected processGetEmailConfiguration(response: HttpResponseBase): Observable<SocialConflictAlertEmailConfiguration> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = SocialConflictAlertEmailConfiguration.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SocialConflictAlertEmailConfiguration>(<any>null);
    }

    create(item: SocialConflictAlertDto): Observable<EntityDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictAlert/Create";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: item.toJSON(),
            headers: new HttpHeaders({
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

    update(item: SocialConflictAlertDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictAlert/Update";

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
        let url_ = this.baseUrl + "/api/services/app/SocialConflictAlert/Delete?";
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

    sendAlert(id: number, to: string[], cc: string[], subject: string, template: string): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictAlert/SendAlert";

        const _body: string = JSON.stringify({
            id: id,
            to: to,
            copy: cc,
            subject: subject,
            template: template
        });

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: _body,
            headers: new HttpHeaders({
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


export interface IPagedResultDtoOfSocialConflictAlertListDto {
    totalCount: number;
    items: SocialConflictAlertDto[] | undefined;
}

export class PagedResultDtoOfSocialConflictAlertListDto implements IPagedResultDtoOfSocialConflictAlertListDto {
    totalCount!: number;
    items!: SocialConflictAlertDto[] | undefined;

    constructor(data?: IPagedResultDtoOfSocialConflictAlertListDto) {
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
                    this.items!.push(SocialConflictAlertDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfSocialConflictAlertListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfSocialConflictAlertListDto();
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

export interface ISocialConflictAlertGetDataDto {
    socialConflictAlert: SocialConflictAlertDto;
    departments: SocialConflictAlertDepartmentDto[];
    territorialUnits: SocialConflictAlertTerritorialUnitDto[];
    risks: SocialConflictAlertRiskDto[];
    sectors: SocialConflictAlertSectorDto[];
    seals: SocialConflictAlertSealDto[];
    actorTypes: SocialConflictAlertActorTypeDto[];
    actorMovements: SocialConflictAlertActorMovementDto[];
    persons: SocialConflictAlertPersonDto[];
    typologies: SocialConflictAlertTypologyDto[];
    demands: SocialConflictAlertDemandDto[];
    responsibles: SocialConflictAlertResponsibleDto[];
}

export class SocialConflictAlertGetDataDto implements ISocialConflictAlertGetDataDto {
    socialConflictAlert: SocialConflictAlertDto;
    departments: SocialConflictAlertDepartmentDto[];
    territorialUnits: SocialConflictAlertTerritorialUnitDto[];
    risks: SocialConflictAlertRiskDto[];
    sectors: SocialConflictAlertSectorDto[];
    seals: SocialConflictAlertSealDto[];
    actorTypes: SocialConflictAlertActorTypeDto[];
    actorMovements: SocialConflictAlertActorMovementDto[];
    persons: SocialConflictAlertPersonDto[];
    typologies: SocialConflictAlertTypologyDto[];
    demands: SocialConflictAlertDemandDto[];
    responsibles: SocialConflictAlertResponsibleDto[];

    constructor(data?: ISocialConflictAlertGetDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.socialConflictAlert = data["socialConflictAlert"] ? SocialConflictAlertDto.fromJS(data["socialConflictAlert"]) : <any>undefined;
            if (Array.isArray(data["departments"])) {
                this.departments = [] as any;
                for (let item of data["departments"])
                    this.departments!.push(SocialConflictAlertDepartmentDto.fromJS(item));
            }
            if (Array.isArray(data["territorialUnits"])) {
                this.territorialUnits = [] as any;
                for (let item of data["territorialUnits"])
                    this.territorialUnits!.push(SocialConflictAlertTerritorialUnitDto.fromJS(item));
            }
            if (Array.isArray(data["risks"])) {
                this.risks = [] as any;
                for (let item of data["risks"])
                    this.risks!.push(SocialConflictAlertRiskDto.fromJS(item));
            }
            if (Array.isArray(data["sectors"])) {
                this.sectors = [] as any;
                for (let item of data["sectors"])
                    this.sectors!.push(SocialConflictAlertSectorDto.fromJS(item));
            }
            if (Array.isArray(data["seals"])) {
                this.seals = [] as any;
                for (let item of data["seals"])
                    this.seals!.push(SocialConflictAlertSealDto.fromJS(item));
            }
            if (Array.isArray(data["actorTypes"])) {
                this.actorTypes = [] as any;
                for (let item of data["actorTypes"])
                    this.actorTypes!.push(SocialConflictAlertActorTypeDto.fromJS(item));
            }
            if (Array.isArray(data["actorMovements"])) {
                this.actorMovements = [] as any;
                for (let item of data["actorMovements"])
                    this.actorMovements!.push(SocialConflictAlertActorMovementDto.fromJS(item));
            }
            if (Array.isArray(data["persons"])) {
                this.persons = [] as any;
                for (let item of data["persons"])
                    this.persons!.push(SocialConflictAlertPersonDto.fromJS(item));
            }
            if (Array.isArray(data["typologies"])) {
                this.typologies = [] as any;
                for (let item of data["typologies"])
                    this.typologies!.push(SocialConflictAlertTypologyDto.fromJS(item));
            }
            if (Array.isArray(data["demands"])) {
                this.demands = [] as any;
                for (let item of data["demands"])
                    this.demands!.push(SocialConflictAlertDemandDto.fromJS(item));
            }
            if (Array.isArray(data["responsibles"])) {
                this.responsibles = [] as any;
                for (let item of data["responsibles"])
                    this.responsibles!.push(SocialConflictAlertResponsibleDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SocialConflictAlertGetDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertGetDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["socialConflictAlert"] = this.socialConflictAlert ? this.socialConflictAlert.toJSON() : <any>undefined;

        if (Array.isArray(this.departments)) {
            data["departments"] = [];
            for (let item of this.departments)
                data["departments"].push(item.toJSON());
        }
        if (Array.isArray(this.territorialUnits)) {
            data["territorialUnits"] = [];
            for (let item of this.territorialUnits)
                data["territorialUnits"].push(item.toJSON());
        }
        if (Array.isArray(this.risks)) {
            data["risks"] = [];
            for (let item of this.risks)
                data["risks"].push(item.toJSON());
        }
        if (Array.isArray(this.sectors)) {
            data["sectors"] = [];
            for (let item of this.sectors)
                data["sectors"].push(item.toJSON());
        }
        if (Array.isArray(this.seals)) {
            data["seals"] = [];
            for (let item of this.seals)
                data["seals"].push(item.toJSON());
        }
        if (Array.isArray(this.actorTypes)) {
            data["actorTypes"] = [];
            for (let item of this.actorTypes)
                data["actorTypes"].push(item.toJSON());
        }
        if (Array.isArray(this.actorMovements)) {
            data["actorMovements"] = [];
            for (let item of this.actorMovements)
                data["actorMovements"].push(item.toJSON());
        }
        if (Array.isArray(this.persons)) {
            data["persons"] = [];
            for (let item of this.persons)
                data["persons"].push(item.toJSON());
        }
        if (Array.isArray(this.typologies)) {
            data["typologies"] = [];
            for (let item of this.typologies)
                data["typologies"].push(item.toJSON());
        }
        if (Array.isArray(this.demands)) {
            data["demands"] = [];
            for (let item of this.demands)
                data["demands"].push(item.toJSON());
        }
        if (Array.isArray(this.responsibles)) {
            data["responsibles"] = [];
            for (let item of this.responsibles)
                data["responsibles"].push(item.toJSON());
        }

        return data;
    }
}

export interface ISocialConflictAlertDto {
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
    alertDemand: SocialConflictAlertDemandDto;
    typology: SocialConflictAlertTypologyDto;
    subTypology: SocialConflictAlertSubTypologyDto;
    alertResponsible: SocialConflictAlertResponsibleDto;
    analyst: SocialConflictAlertPersonDto;
    manager: SocialConflictAlertPersonDto;
    coordinator: SocialConflictAlertPersonDto;
    aditionalInformation: string;
    source: string;
    sourceType: string;
    link: string;
    recommendations: string;
    actions: string;
    latitude: number;
    longitude: number;
    published: number;
    socialConflict: SocialConflictAlertConflictDto;
    territorialUnit: SocialConflictAlertTerritorialUnitDto;
    creatorUser: SocialConflictAlertUserDto;
    editionUser: SocialConflictAlertUserDto;
    actors: SocialConflictAlertActorLocationDto[];
    locations: SocialConflictAlertLocationDto[];
    risks: SocialConflictAlertRiskLocationDto[];
    sectors: SocialConflictAlertSectorLocationDto[];
    states: SocialConflictAlertStateLocationDto[];
    seals: SocialConflictAlertSealLocationDto[];
    resources: SocialConflictAlertResourceDto[];
}

export class SocialConflictAlertDto implements ISocialConflictAlertDto {
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
    alertDemand: SocialConflictAlertDemandDto;
    typology: SocialConflictAlertTypologyDto;
    subTypology: SocialConflictAlertSubTypologyDto;
    alertResponsible: SocialConflictAlertResponsibleDto;
    analyst: SocialConflictAlertPersonDto;
    manager: SocialConflictAlertPersonDto;
    coordinator: SocialConflictAlertPersonDto;
    aditionalInformation: string;
    source: string;
    sourceType: string;
    link: string;
    recommendations: string;
    actions: string;
    latitude: number;
    longitude: number;
    published: number;
    socialConflict: SocialConflictAlertConflictDto;
    territorialUnit: SocialConflictAlertTerritorialUnitDto;
    creatorUser: SocialConflictAlertUserDto;
    editionUser: SocialConflictAlertUserDto;
    actors: SocialConflictAlertActorLocationDto[];
    locations: SocialConflictAlertLocationDto[];
    risks: SocialConflictAlertRiskLocationDto[];
    sectors: SocialConflictAlertSectorLocationDto[];
    states: SocialConflictAlertStateLocationDto[];
    seals: SocialConflictAlertSealLocationDto[];
    resources: SocialConflictAlertResourceDto[];
    uploadFiles: AttachmentUploadDto[];

    //readonly
    lastRisk: SocialConflictAlertRiskLocationDto;
    regionsText: string;
    actorsText: string[];
    risk: SocialConflictAlertRiskLocationDto;

    constructor(data?: ISocialConflictAlertDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.actors = [];
            this.locations = [];
            this.risks = [];
            this.sectors = [];
            this.states = [];
            this.seals = [];
            this.resources = [];
            this.uploadFiles = [];
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
            this.risk = data["risk"] ? SocialConflictAlertRiskLocationDto.fromJS(data["risk"]) : <any>undefined;
            this.socialConflict = data["socialConflict"] ? SocialConflictAlertConflictDto.fromJS(data["socialConflict"]) : <any>undefined;
            this.territorialUnit = data["territorialUnit"] ? SocialConflictAlertTerritorialUnitDto.fromJS(data["territorialUnit"]) : new SocialConflictAlertTerritorialUnitDto({ id: -1, name: undefined });
            this.creatorUser = data["creatorUser"] ? SocialConflictAlertUserDto.fromJS(data["creatorUser"]) : <any>undefined;
            this.editionUser = data["editionUser"] ? SocialConflictAlertUserDto.fromJS(data["editionUser"]) : <any>undefined;
            this.alertDemand = data["alertDemand"] ? SocialConflictAlertDemandDto.fromJS(data["alertDemand"]) : new SocialConflictAlertDemandDto({ id: -1, name: undefined });
            this.alertResponsible = data["alertResponsible"] ? SocialConflictAlertResponsibleDto.fromJS(data["alertResponsible"]) : new SocialConflictAlertResponsibleDto({ id: -1, name: undefined });
            this.typology = data["typology"] ? SocialConflictAlertTypologyDto.fromJS(data["typology"]) : new SocialConflictAlertTypologyDto({ id: -1, name: undefined, subTypologies: [] });
            this.subTypology = data["subTypology"] ? SocialConflictAlertSubTypologyDto.fromJS(data["subTypology"]) : new SocialConflictAlertSubTypologyDto({ id: -1, name: undefined });
            this.analyst = data["analyst"] ? SocialConflictAlertPersonDto.fromJS(data["analyst"]) : new SocialConflictAlertPersonDto({ id: -1, name: undefined, type: PersonType.None });
            this.manager = data["manager"] ? SocialConflictAlertPersonDto.fromJS(data["manager"]) : new SocialConflictAlertPersonDto({ id: -1, name: undefined, type: PersonType.None });
            this.coordinator = data["coordinator"] ? SocialConflictAlertPersonDto.fromJS(data["coordinator"]) : new SocialConflictAlertPersonDto({ id: -1, name: undefined, type: PersonType.None });

            this.latitude = data["latitude"];
            this.longitude = data["longitude"];
            this.published = data["published"];

            if (Array.isArray(data["actors"])) {
                this.actors = [] as any;
                this.actorsText = [];
                for (let item of data["actors"]) {
                    this.actors!.push(SocialConflictAlertActorLocationDto.fromJS(item));
                }
                for (let item of this.actors) {
                    this.actorsText.push(
                        `${item.name}${item.job ? (' - ' + item.job) : ''}` +
                        `${item.community ? (' - ' + item.community) : ''}` +
                        `${item.actorType ? (' - ' + item.actorType.name) : ''}` +
                        `${item?.actorType?.showMovement && item.actorMovement ? (' - ' + item.actorMovement.name) : ''}` +
                        `${item.position ? (' - ' + item.position) : ''}` +
                        `${item.interest ? (' - ' + item.interest) : ''}`);
                }
            }
            if (Array.isArray(data["locations"])) {
                this.locations = [] as any;
                this.regionsText = '';
                for (let item of data["locations"]) {
                    this.locations!.push(SocialConflictAlertLocationDto.fromJS(item));
                }
                let index: number = 0;
                for (let item of this.locations) {
                    if (item.department && item.province && item.district) {
                        this.regionsText = `${this.regionsText}${index > 0 ? ',' : ''} ${item.department.name} - ${item.province.name} - ${item.district.name}`;
                        index++;
                    }
                }
            }
            if (Array.isArray(data["risks"])) {
                this.risks = [] as any;
                for (let item of data["risks"])
                    this.risks!.push(SocialConflictAlertRiskLocationDto.fromJS(item));
            }
            if (Array.isArray(data["sectors"])) {
                this.sectors = [] as any;
                for (let item of data["sectors"])
                    this.sectors!.push(SocialConflictAlertSectorLocationDto.fromJS(item));
            }
            if (Array.isArray(data["states"])) {
                this.states = [] as any;
                for (let item of data["states"])
                    this.states!.push(SocialConflictAlertStateLocationDto.fromJS(item));
            }
            if (Array.isArray(data["seals"])) {
                this.seals = [] as any;
                for (let item of data["seals"])
                    this.seals!.push(SocialConflictAlertSealLocationDto.fromJS(item));
            }
            if (Array.isArray(data["resources"])) {
                this.resources = [] as any;
                for (let item of data["resources"])
                    this.resources!.push(SocialConflictAlertResourceDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SocialConflictAlertDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertDto();
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
        data["socialConflict"] = this.socialConflict ? this.socialConflict.toJSON() : <any>undefined;
        data["territorialUnit"] = this.territorialUnit ? this.territorialUnit.toJSON() : <any>undefined;
        data["alertDemand"] = this.alertDemand ? this.alertDemand.toJSON() : <any>undefined;
        data["alertResponsible"] = this.alertResponsible ? this.alertResponsible.toJSON() : <any>undefined;
        data["typology"] = this.typology ? this.typology.toJSON() : <any>undefined;
        data["subTypology"] = this.subTypology ? this.subTypology.toJSON() : <any>undefined;
        data["analyst"] = this.analyst ? this.analyst.toJSON() : <any>undefined;
        data["manager"] = this.manager ? this.manager.toJSON() : <any>undefined;
        data["coordinator"] = this.coordinator ? this.coordinator.toJSON() : <any>undefined;

        data["latitude"] = this.latitude;
        data["longitude"] = this.longitude;
        data["published"] = this.published;

        if (Array.isArray(this.actors)) {
            data["actors"] = [];
            for (let item of this.actors)
                data["actors"].push(item.toJSON());
        }
        if (Array.isArray(this.locations)) {
            data["locations"] = [];
            for (let item of this.locations)
                data["locations"].push(item.toJSON());
        }
        if (Array.isArray(this.risks)) {
            data["risks"] = [];
            for (let item of this.risks)
                data["risks"].push(item.toJSON());
        }
        if (Array.isArray(this.sectors)) {
            data["sectors"] = [];
            for (let item of this.sectors)
                data["sectors"].push(item.toJSON());
        }
        if (Array.isArray(this.states)) {
            data["states"] = [];
            for (let item of this.states)
                data["states"].push(item.toJSON());
        }
        if (Array.isArray(this.seals)) {
            data["seals"] = [];
            for (let item of this.seals)
                data["seals"].push(item.toJSON());
        }
        if (Array.isArray(this.resources)) {
            data["resources"] = [];
            for (let item of this.resources.filter(p => p.remove))
                data["resources"].push(item.toJSON());
        }
        if (Array.isArray(this.uploadFiles)) {
            data["uploadFiles"] = [];
            for (let item of this.uploadFiles)
                data["uploadFiles"].push(item.toJSON());
        }

        return data;
    }
}

export interface ISocialConflictAlertConflictDto {
    id: number;
    code: string;
    caseName: string;
}

export class SocialConflictAlertConflictDto implements ISocialConflictAlertConflictDto {
    id: number;
    code: string;
    caseName: string;

    constructor(data?: ISocialConflictAlertConflictDto) {
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

    static fromJS(data: any): SocialConflictAlertConflictDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertConflictDto();
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

export interface ISocialConflictAlertLocationDto {
    id: number;
    department: SocialConflictAlertDepartmentDto;
    province: SocialConflictAlertProvinceDto;
    district: SocialConflictAlertDistrictDto;
    territorialUnit: SocialConflictAlertTerritorialUnitDto;
    region: SocialConflictAlertRegionDto;
    ubication: string;
    remove: boolean;
}

export class SocialConflictAlertLocationDto implements ISocialConflictAlertLocationDto {
    id: number;
    department: SocialConflictAlertDepartmentDto;
    province: SocialConflictAlertProvinceDto;
    district: SocialConflictAlertDistrictDto;
    territorialUnit: SocialConflictAlertTerritorialUnitDto;
    region: SocialConflictAlertRegionDto;
    ubication: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictAlertLocationDto) {
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
            this.department = data["department"] ? SocialConflictAlertDepartmentDto.fromJS(data["department"]) : <any>undefined;
            this.province = data["province"] ? SocialConflictAlertProvinceDto.fromJS(data["province"]) : <any>undefined;
            this.district = data["district"] ? SocialConflictAlertDistrictDto.fromJS(data["district"]) : <any>undefined;
            this.territorialUnit = data["territorialUnit"] ? SocialConflictAlertTerritorialUnitDto.fromJS(data["territorialUnit"]) : <any>undefined;
            this.region = data["region"] ? SocialConflictAlertRegionDto.fromJS(data["region"]) : <any>undefined;
            this.ubication = data["ubication"];
        }
    }

    static fromJS(data: any): SocialConflictAlertLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertLocationDto();
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

export interface ISocialConflictAlertRegionDto {
    id: number;
    name: string;
}

export class SocialConflictAlertRegionDto implements ISocialConflictAlertRegionDto {
    id: number;
    name: string;

    constructor(data?: ISocialConflictAlertRegionDto) {
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

    static fromJS(data: any): SocialConflictAlertRegionDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertRegionDto();
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

export interface ISocialConflictAlertTerritorialUnitDto {
    id: number;
    name: string;
}

export class SocialConflictAlertTerritorialUnitDto implements ISocialConflictAlertTerritorialUnitDto {
    id: number;
    name: string;

    constructor(data?: ISocialConflictAlertTerritorialUnitDto) {
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

    static fromJS(data: any): SocialConflictAlertTerritorialUnitDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertTerritorialUnitDto();
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

export interface ISocialConflictAlertDepartmentDto {
    id: number;
    territorialUnitId: number;
    name: string;
    provinces: SocialConflictAlertProvinceDto[];
}

export class SocialConflictAlertDepartmentDto implements ISocialConflictAlertDepartmentDto {
    id: number;
    territorialUnitId: number;
    name: string;
    provinces: SocialConflictAlertProvinceDto[];

    constructor(data?: ISocialConflictAlertDepartmentDto) {
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
            this.territorialUnitId = data["territorialUnitId"];
            this.name = data["name"];
            if (Array.isArray(data["provinces"])) {
                this.provinces = [] as any;
                for (let item of data["provinces"])
                    this.provinces!.push(SocialConflictAlertProvinceDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SocialConflictAlertDepartmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertDepartmentDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["territorialUnitId"] = this.territorialUnitId;
        data["name"] = this.name;
        if (Array.isArray(this.provinces)) {
            data["provinces"] = [];
            for (let item of this.provinces)
                data["provinces"].push(item.toJSON());
        }

        return data;
    }
}

export interface ISocialConflictAlertProvinceDto {
    id: number;
    name: string;
    districts: SocialConflictAlertDistrictDto[];
}

export class SocialConflictAlertProvinceDto implements ISocialConflictAlertProvinceDto {
    id: number;
    name: string;
    districts: SocialConflictAlertDistrictDto[];

    constructor(data?: ISocialConflictAlertProvinceDto) {
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
                    this.districts!.push(SocialConflictAlertDistrictDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SocialConflictAlertProvinceDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertProvinceDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        if (Array.isArray(this.districts)) {
            data["districts"] = [];
            for (let item of this.districts)
                data["districts"].push(item.toJSON());
        }

        return data;
    }
}

export interface ISocialConflictAlertDistrictDto {
    id: number;
    name: string;
}

export class SocialConflictAlertDistrictDto implements ISocialConflictAlertDistrictDto {
    id: number;
    name: string;

    constructor(data?: ISocialConflictAlertDistrictDto) {
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

    static fromJS(data: any): SocialConflictAlertDistrictDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertDistrictDto();
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

export interface ISocialConflictAlertRiskLocationDto {
    id: number;
    creationTime: moment.Moment;
    riskTime: moment.Moment;
    alertRisk: SocialConflictAlertRiskDto;
    description: string;
    observation: string;
}

export class SocialConflictAlertRiskLocationDto implements ISocialConflictAlertRiskLocationDto {
    id: number;
    creationTime: moment.Moment;
    riskTime: moment.Moment;
    alertRisk: SocialConflictAlertRiskDto;
    description: string;
    observation: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictAlertRiskLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.alertRisk = new SocialConflictAlertRiskDto({ id: -1, name: undefined, color: undefined });
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.creationTime = data["creationTime"] ? moment(data["creationTime"]) : <any>undefined;
            this.riskTime = data["riskTime"] ? moment(data["riskTime"]) : <any>undefined;
            this.alertRisk = data["alertRisk"] ? SocialConflictAlertRiskDto.fromJS(data["alertRisk"]) : new SocialConflictAlertRiskDto({ id: -1, name: undefined, color: undefined });
            this.description = data["description"];
            this.observation = data["observation"];
        }
    }

    static fromJS(data: any): SocialConflictAlertRiskLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertRiskLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["alertRisk"] = this.alertRisk ? this.alertRisk.toJSON() : <any>undefined;
        data["riskTime"] = this.riskTime ? this.riskTime.toISOString() : <any>undefined;
        data["description"] = this.description;
        data["observation"] = this.observation;
        data["remove"] = this.remove;

        return data;
    }
}

export interface ISocialConflictAlertRiskDto {
    id: number;
    name: string;
    color: string;
}

export class SocialConflictAlertRiskDto implements ISocialConflictAlertRiskDto {
    id: number;
    name: string;
    color: string;

    constructor(data?: ISocialConflictAlertRiskDto) {
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
            this.color = data["color"];
        }
    }

    static fromJS(data: any): SocialConflictAlertRiskDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertRiskDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["color"] = this.color;

        return data;
    }
}

export interface ISocialConflictAlertSectorLocationDto {
    id: number;
    creationTime: moment.Moment;
    sectorTime: moment.Moment;
    alertSector: SocialConflictAlertSectorDto;
    description: string;
}

export class SocialConflictAlertSectorLocationDto implements ISocialConflictAlertSectorLocationDto {
    id: number;
    creationTime: moment.Moment;
    sectorTime: moment.Moment;
    alertSector: SocialConflictAlertSectorDto;
    description: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictAlertSectorLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.alertSector = new SocialConflictAlertSectorDto({ id: -1, name: undefined, index: 0 });
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.creationTime = data["creationTime"] ? moment(data["creationTime"]) : <any>undefined;
            this.sectorTime = data["sectorTime"] ? moment(data["sectorTime"]) : <any>undefined;
            this.alertSector = data["alertSector"] ? SocialConflictAlertSectorDto.fromJS(data["alertSector"]) : new SocialConflictAlertSectorDto({ id: -1, name: undefined, index: 0 });
            this.description = data["description"];
        }
    }

    static fromJS(data: any): SocialConflictAlertSectorLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertSectorLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["sectorTime"] = this.sectorTime ? this.sectorTime.toJSON() : <any>undefined;
        data["alertSector"] = this.alertSector ? this.alertSector.toJSON() : <any>undefined;
        data["description"] = this.description;
        data["remove"] = this.remove;

        return data;
    }
}

export interface ISocialConflictAlertSectorDto {
    id: number;
    name: string;
    index: number
}

export class SocialConflictAlertSectorDto implements ISocialConflictAlertSectorDto {
    id: number;
    name: string;
    index: number;

    constructor(data?: ISocialConflictAlertSectorDto) {
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
            this.index = data["index"];
        }
    }

    static fromJS(data: any): SocialConflictAlertSectorDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertSectorDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["index"] = this.index;

        return data;
    }
}

export interface ISocialConflictAlertStateLocationDto {
    id: number;
    creationTime: moment.Moment;
    stateTime: moment.Moment;
    description: string;
}

export class SocialConflictAlertStateLocationDto implements ISocialConflictAlertStateLocationDto {
    id: number;
    creationTime: moment.Moment;
    stateTime: moment.Moment;
    description: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictAlertStateLocationDto) {
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
            this.stateTime = data["stateTime"] ? moment(data["stateTime"]) : <any>undefined;
            this.description = data["description"];
        }
    }

    static fromJS(data: any): SocialConflictAlertStateLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertStateLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["stateTime"] = this.stateTime ? this.stateTime.toISOString() : <any>undefined;
        data["description"] = this.description;
        data["remove"] = this.remove;

        return data;
    }
}

export interface ISocialConflictAlertSealLocationDto {
    id: number;
    sealTime: moment.Moment;
    creationTime: moment.Moment;
    alertSeal: SocialConflictAlertSealDto;
    description: string;
}

export class SocialConflictAlertSealLocationDto implements ISocialConflictAlertSealLocationDto {
    id: number;
    sealTime: moment.Moment;
    creationTime: moment.Moment;
    alertSeal: SocialConflictAlertSealDto;
    description: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictAlertSealLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.alertSeal = new SocialConflictAlertSealDto({ id: -1, name: undefined });
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.creationTime = data["creationTime"] ? moment(data["creationTime"]) : <any>undefined;
            this.sealTime = data["sealTime"] ? moment(data["sealTime"]) : <any>undefined;
            this.alertSeal = data["alertSeal"] ? SocialConflictAlertSealDto.fromJS(data["alertSeal"]) : new SocialConflictAlertSealDto({ id: -1, name: undefined });
            this.description = data["description"];
        }
    }

    static fromJS(data: any): SocialConflictAlertSealLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertSealLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["sealTime"] = this.sealTime ? this.sealTime.toISOString() : <any>undefined;
        data["alertSeal"] = this.alertSeal ? this.alertSeal.toJSON() : <any>undefined;
        data["description"] = this.description;
        data["remove"] = this.remove;

        return data;
    }
}

export interface ISocialConflictAlertSealDto {
    id: number;
    name: string;
}

export class SocialConflictAlertSealDto implements ISocialConflictAlertSealDto {
    id: number;
    name: string;

    constructor(data?: ISocialConflictAlertSealDto) {
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

    static fromJS(data: any): SocialConflictAlertSealDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertSealDto();
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


export interface ISocialConflictAlertActorTypeDto {
    id: number;
    name: string;
    showDetail: boolean;
    showMovement: boolean;
}

export class SocialConflictAlertActorTypeDto implements ISocialConflictAlertActorTypeDto {
    id: number;
    name: string;
    showDetail: boolean;
    showMovement: boolean;

    constructor(data?: ISocialConflictAlertActorTypeDto) {
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
            this.showDetail = _data["showDetail"];
            this.showMovement = _data["showMovement"];
        }
    }

    static fromJS(data: any): SocialConflictAlertActorTypeDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertActorTypeDto();
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

export interface ISocialConflictAlertActorMovementDto {
    id: number;
    name: string;
}

export class SocialConflictAlertActorMovementDto implements ISocialConflictAlertActorMovementDto {
    id: number;
    name: string;

    constructor(data?: ISocialConflictAlertActorMovementDto) {
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

    static fromJS(data: any): SocialConflictAlertActorMovementDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertActorMovementDto();
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

export interface ISocialConflictAlertActorLocationDto {
    id: number;
    name: string;
    document: string;
    job: string;
    community: string;
    phoneNumber: string;
    emailAddress: string;
    isPoliticalAssociation: boolean;
    politicalAssociation: string;
    position: string;
    interest: string;
    actorType: SocialConflictAlertActorTypeDto;
    actorMovement: SocialConflictAlertActorMovementDto;
}

export class SocialConflictAlertActorLocationDto implements ISocialConflictAlertActorLocationDto {
    id: number;
    name: string;
    document: string;
    job: string;
    community: string;
    phoneNumber: string;
    emailAddress: string;
    isPoliticalAssociation: boolean;
    politicalAssociation: string;
    position: string;
    interest: string;
    actorType: SocialConflictAlertActorTypeDto;
    actorMovement: SocialConflictAlertActorMovementDto;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictAlertActorLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.actorType = new SocialConflictAlertActorTypeDto({ id: -1, name: undefined, showDetail: false, showMovement: false });
            this.actorMovement = new SocialConflictAlertActorMovementDto({ id: -1, name: undefined });
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.name = data["name"];
            this.document = data["document"];
            this.job = data["job"];
            this.community = data["community"];
            this.phoneNumber = data["phoneNumber"];
            this.emailAddress = data["emailAddress"];
            this.isPoliticalAssociation = data["isPoliticalAssociation"];
            this.politicalAssociation = data["politicalAssociation"];
            this.position = data["position"];
            this.interest = data["interest"];
            this.actorType = data["actorType"] ? SocialConflictAlertActorTypeDto.fromJS(data["actorType"]) : new SocialConflictAlertActorTypeDto({ id: -1, name: undefined, showDetail: false, showMovement: false });
            this.actorMovement = data["actorMovement"] ? SocialConflictAlertActorMovementDto.fromJS(data["actorMovement"]) : new SocialConflictAlertActorMovementDto({ id: -1, name: undefined });
        }
    }

    static fromJS(data: any): SocialConflictAlertActorLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertActorLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["document"] = this.document;
        data["job"] = this.job;
        data["community"] = this.community;
        data["phoneNumber"] = this.phoneNumber;
        data["emailAddress"] = this.emailAddress;
        data["isPoliticalAssociation"] = this.isPoliticalAssociation;
        data["politicalAssociation"] = this.politicalAssociation;
        data["position"] = this.position;
        data["interest"] = this.interest;
        data["actorType"] = this.actorType ? this.actorType.toJSON() : <any>undefined;
        data["actorMovement"] = this.actorMovement ? this.actorMovement.toJSON() : <any>undefined;
        data["remove"] = this.remove;

        return data;
    }
}

export interface ISocialConflictAlertUserDto {
    id: number;
    name: string;
    surname: string;
    emailAddress: string;
}

export class SocialConflictAlertUserDto implements ISocialConflictAlertUserDto {
    id: number;
    name: string;
    surname: string;
    emailAddress: string;

    constructor(data?: ISocialConflictAlertUserDto) {
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
            this.emailAddress = data["emailAddress"];
        }
    }

    static fromJS(data: any): SocialConflictAlertUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertUserDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["surname"] = this.surname;
        data["emailAddress"] = this.emailAddress;

        return data;
    }
}

export interface ISocialConflictAlertPersonDto {
    id: number;
    name: string;
    type: PersonType;
}

export class SocialConflictAlertPersonDto implements ISocialConflictAlertPersonDto {
    id: number;
    name: string;
    type: PersonType;

    constructor(data?: ISocialConflictAlertPersonDto) {
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

    static fromJS(data: any): SocialConflictAlertPersonDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertPersonDto();
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

export interface ISocialConflictAlertTypologyDto {
    id: number;
    name: string;
    subTypologies: SocialConflictAlertSubTypologyDto[];
}

export class SocialConflictAlertTypologyDto implements ISocialConflictAlertTypologyDto {
    id: number;
    name: string;
    subTypologies: SocialConflictAlertSubTypologyDto[];

    constructor(data?: ISocialConflictAlertTypologyDto) {
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
            if (Array.isArray(_data["subTypologies"])) {
                this.subTypologies = [] as any;
                for (let item of _data["subTypologies"])
                    this.subTypologies!.push(SocialConflictAlertSubTypologyDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SocialConflictAlertTypologyDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertTypologyDto();
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

export interface ISocialConflictAlertSubTypologyDto {
    id: number;
    name: string;
}

export class SocialConflictAlertSubTypologyDto implements ISocialConflictAlertSubTypologyDto {
    id: number;
    name: string;

    constructor(data?: ISocialConflictAlertSubTypologyDto) {
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

    static fromJS(data: any): SocialConflictAlertSubTypologyDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertSubTypologyDto();
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

export interface ISocialConflictAlertDemandDto {
    id: number;
    name: string;
}

export class SocialConflictAlertDemandDto implements ISocialConflictAlertDemandDto {
    id: number;
    name: string;

    constructor(data?: ISocialConflictAlertDemandDto) {
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

    static fromJS(data: any): SocialConflictAlertDemandDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertDemandDto();
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

export interface ISocialConflictAlertResponsibleDto {
    id: number;
    name: string;
}

export class SocialConflictAlertResponsibleDto implements ISocialConflictAlertResponsibleDto {
    id: number;
    name: string;

    constructor(data?: ISocialConflictAlertResponsibleDto) {
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

    static fromJS(data: any): SocialConflictAlertResponsibleDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertResponsibleDto();
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

export interface ISocialConflictAlertResourceDto {
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

export class SocialConflictAlertResourceDto implements ISocialConflictAlertResourceDto {
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

    constructor(data?: ISocialConflictAlertResourceDto) {
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

    static fromJS(data: any): SocialConflictAlertResourceDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertResourceDto();
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

export interface ISocialConflictAlertEmailConfiguration {
    subject: string;
    template: string;
}

export class SocialConflictAlertEmailConfiguration implements ISocialConflictAlertEmailConfiguration {
    subject: string;
    template: string;

    constructor(data?: ISocialConflictAlertEmailConfiguration) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.subject = data["subject"];
            this.template = data["template"];
        }
    }

    static fromJS(data: any): SocialConflictAlertEmailConfiguration {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictAlertEmailConfiguration();
        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["subject"] = this.subject;
        data["template"] = this.template;

        return data;
    }
}