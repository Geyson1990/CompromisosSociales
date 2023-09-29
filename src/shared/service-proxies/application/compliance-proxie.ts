import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete, FileDto, getRandomColor, pickTextColorBasedOnBgColorAdvanced } from '../service-proxies';
import * as moment from "moment";

@Injectable()
export class ComplianceServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(territorialUnitId?: number, departmentId?: number, provinceId?: number, districtId?: number, socialConflictId?: number): Observable<ComplianceGetAllDto> {
        let url_ = this.baseUrl + "/api/services/app/Compliance/GetAll?";

        if (territorialUnitId !== undefined)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnitId) + "&";
        if (departmentId !== undefined)
            url_ += "DepartmentId=" + encodeURIComponent("" + departmentId) + "&";
        if (provinceId !== undefined)
            url_ += "ProvinceId=" + encodeURIComponent("" + provinceId) + "&";
        if (districtId !== undefined)
            url_ += "DistrictId=" + encodeURIComponent("" + districtId) + "&";
        if (socialConflictId !== undefined)
            url_ += "SocialConflictId=" + encodeURIComponent("" + socialConflictId) + "&";

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
                    return <Observable<ComplianceGetAllDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<ComplianceGetAllDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<ComplianceGetAllDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = ComplianceGetAllDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<ComplianceGetAllDto>(<any>null);
    }

    getPipMef(territorialUnitId?: number, departmentId?: number, provinceId?: number, districtId?: number, socialConflictId?: number): Observable<PortalPipMefDto> {
        let url_ = this.baseUrl + "/api/services/app/Portal/GetPipMef?";

        if (territorialUnitId !== undefined)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnitId) + "&";
        if (departmentId !== undefined)
            url_ += "DepartmentId=" + encodeURIComponent("" + departmentId) + "&";
        if (provinceId !== undefined)
            url_ += "ProvinceId=" + encodeURIComponent("" + provinceId) + "&";
        if (districtId !== undefined)
            url_ += "DistrictId=" + encodeURIComponent("" + districtId) + "&";
        if (socialConflictId)
            url_ += "SocialConflictId=" + encodeURIComponent("" + socialConflictId) + "&";

        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetPipMef(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetPipMef(<any>response_);
                } catch (e) {
                    return <Observable<PortalPipMefDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PortalPipMefDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetPipMef(response: HttpResponseBase): Observable<PortalPipMefDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PortalPipMefDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PortalPipMefDto>(<any>null);
    }
}

export class IComplianceGetAllDto {
    summary: ReportSummaryDto[];
    status: ReportStatusDto[];
    openStatus: ReportStatusDto[];
    responsibleStatus: ReportResponsibleStatusDto[];
    pipOpenStatus: ReportStatusDto[];
}

export class ComplianceGetAllDto implements IComplianceGetAllDto {
    summary: ReportSummaryDto[];
    status: ReportStatusDto[];
    openStatus: ReportStatusDto[];
    responsibleStatus: ReportResponsibleStatusDto[];
    pipOpenStatus: ReportStatusDto[];

    constructor(data?: IComplianceGetAllDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            if (Array.isArray(data["summary"])) {
                this.summary = [] as any;
                for (let item of data["summary"])
                    this.summary!.push(ReportSummaryDto.fromJS(item));
            }
            if (Array.isArray(data["status"])) {
                this.status = [] as any;
                for (let item of data["status"])
                    this.status!.push(ReportStatusDto.fromJS(item));
            }
            if (Array.isArray(data["openStatus"])) {
                this.openStatus = [] as any;
                for (let item of data["openStatus"])
                    this.openStatus!.push(ReportStatusDto.fromJS(item));
            }
            if (Array.isArray(data["responsibleStatus"])) {
                this.responsibleStatus = [] as any;
                for (let item of data["responsibleStatus"])
                    this.responsibleStatus!.push(ReportResponsibleStatusDto.fromJS(item));
            }
            if (Array.isArray(data["pipOpenStatus"])) {
                this.pipOpenStatus = [] as any;
                for (let item of data["pipOpenStatus"])
                    this.pipOpenStatus!.push(ReportStatusDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ComplianceGetAllDto {
        data = typeof data === 'object' ? data : {};
        let result = new ComplianceGetAllDto();
        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        if (Array.isArray(this.summary)) {
            data["summary"] = [];
            for (let item of this.summary)
                data["summary"].push(item.toJSON());
        }
        if (Array.isArray(this.status)) {
            data["status"] = [];
            for (let item of this.status)
                data["status"].push(item.toJSON());
        }
        if (Array.isArray(this.openStatus)) {
            data["openStatus"] = [];
            for (let item of this.openStatus)
                data["openStatus"].push(item.toJSON());
        }
        if (Array.isArray(this.responsibleStatus)) {
            data["responsibleStatus"] = [];
            for (let item of this.responsibleStatus)
                data["responsibleStatus"].push(item.toJSON());
        }
        if (Array.isArray(this.pipOpenStatus)) {
            data["pipOpenStatus"] = [];
            for (let item of this.pipOpenStatus)
                data["pipOpenStatus"].push(item.toJSON());
        }
        return data;
    }
}

export interface IReportSummaryDto {
    name: string;
    activityTotal: number;
    pipTotal: number;
}

export class ReportSummaryDto implements IReportSummaryDto {
    name: string;
    activityTotal: number;
    pipTotal: number;

    constructor(data?: IReportSummaryDto) {
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
            this.activityTotal = data["activityTotal"];
            this.pipTotal = data["pipTotal"];
        }
    }

    static fromJS(data: any): ReportSummaryDto {
        data = typeof data === 'object' ? data : {};
        let result = new ReportSummaryDto();
        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["activityTotal"] = this.activityTotal;
        data["pipTotal"] = this.pipTotal;

        return data;
    }
}

export interface IReportStatusDto {
    status: string;
    count: number;
}

export class ReportStatusDto implements IReportStatusDto {
    status: string;
    count: number;

    constructor(data?: IReportStatusDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.status = data["status"];
            this.count = data["count"];
        }
    }

    static fromJS(data: any): ReportStatusDto {
        data = typeof data === 'object' ? data : {};
        let result = new ReportStatusDto();
        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["status"] = this.status;
        data["count"] = this.count;

        return data;
    }
}

export interface IReportResponsibleStatusDto {
    activityCompliments: number;
    activityTotal: number;
    name: string;
    pipCompliments: number;
    pipTotal: number;
}

export class ReportResponsibleStatusDto implements IReportResponsibleStatusDto {
    activityCompliments: number;
    activityTotal: number;
    name: string;
    pipCompliments: number;
    pipTotal: number;

    //readonly
    isHidden: boolean;

    constructor(data?: IReportResponsibleStatusDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.activityCompliments = data["activityCompliments"];
            this.activityTotal = data["activityTotal"];
            this.name = data["name"];
            this.pipCompliments = data["pipCompliments"];
            this.pipTotal = data["pipTotal"];
        }
    }

    static fromJS(data: any): ReportResponsibleStatusDto {
        data = typeof data === 'object' ? data : {};
        let result = new ReportResponsibleStatusDto();
        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["activityCompliments"] = this.activityCompliments;
        data["activityTotal"] = this.activityTotal;
        data["name"] = this.name;
        data["pipCompliments"] = this.pipCompliments;
        data["pipTotal"] = this.pipTotal;

        return data;
    }
}


export interface IPortalPipMefDto {
    phases: PortalPipMefDataDto[];
    total: number;
    proyectQuantity: number;
    numberText: string;
}

export class PortalPipMefDto implements IPortalPipMefDto {
    phases: PortalPipMefDataDto[];
    total: number;
    proyectQuantity: number;
    numberText: string;

    constructor(data?: IPortalPipMefDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            if (Array.isArray(data["phases"])) {
                this.phases = [] as any;
                for (let item of data["phases"])
                    this.phases!.push(PortalPipMefDataDto.fromJS(item));
            }
            this.total = data["total"];
            this.proyectQuantity = data["proyectQuantity"];
            this.numberText = data["numberText"];
        }
    }

    static fromJS(data: any): PortalPipMefDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalPipMefDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        if (Array.isArray(this.phases)) {
            data["phases"] = [];
            for (let item of this.phases)
                data["phases"].push(item.toJSON());
        }

        data["total"] = this.total;
        data["proyectQuantity"] = this.proyectQuantity;
        data["numberText"] = this.numberText;

        return data;
    }
}

export interface IPortalPipMefDataDto {
    name: string;
    order: number;
    count: number;
    step: ParameterStep;
}

export class PortalPipMefDataDto implements IPortalPipMefDataDto {
    name: string;
    order: number;
    count: number;
    step: ParameterStep;

    constructor(data?: IPortalPipMefDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.order = data["order"];
            this.name = data["name"];
            this.count = data["count"];
            this.step = data["step"];
        }
    }

    static fromJS(data: any): PortalPipMefDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalPipMefDataDto();
        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["order"] = this.order;
        data["name"] = this.name;
        data["count"] = this.count;
        data["step"] = this.step;

        return data;
    }
}


export enum ParameterStep {
    None,
    Programation,
    PreInvertion,
    Invertion,
    Function,
    Disabled
}