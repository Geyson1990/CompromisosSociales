import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete, FileDto, getRandomColor, pickTextColorBasedOnBgColorAdvanced } from '../service-proxies';
import * as moment from "moment";

@Injectable()
export class DashboardServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(territorialUnitId?: number, departmentId?: number, provinceId?: number, districtId?: number): Observable<DashboardGetAllDto> {
        let url_ = this.baseUrl + "/api/services/app/Dashboard/GetAll?";

        if (territorialUnitId !== undefined)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnitId) + "&";
        if (departmentId !== undefined)
            url_ += "DepartmentId=" + encodeURIComponent("" + departmentId) + "&";
        if (provinceId !== undefined)
            url_ += "ProvinceId=" + encodeURIComponent("" + provinceId) + "&";
        if (districtId !== undefined)
            url_ += "DistrictId=" + encodeURIComponent("" + districtId) + "&";

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
                    return <Observable<DashboardGetAllDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<DashboardGetAllDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<DashboardGetAllDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = DashboardGetAllDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<DashboardGetAllDto>(<any>null);
    }
}

export class IDashboardGetAllDto {
    summary: ReportDashboardSummaryDto[];
    status: ReportDashboardStatusDto[];
    openStatus: ReportDashboardStatusDto[];
    closeStatus: ReportDashboardStatusDto[];
    statusList: ReportDashboardStatusListDto[];
}

export class DashboardGetAllDto implements IDashboardGetAllDto {
    summary: ReportDashboardSummaryDto[];
    status: ReportDashboardStatusDto[];
    openStatus: ReportDashboardStatusDto[];
    closeStatus: ReportDashboardStatusDto[];
    statusList: ReportDashboardStatusListDto[];

    constructor(data?: IDashboardGetAllDto) {
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
                    this.summary!.push(ReportDashboardSummaryDto.fromJS(item));
            }
            if (Array.isArray(data["status"])) {
                this.status = [] as any;
                for (let item of data["status"])
                    this.status!.push(ReportDashboardStatusDto.fromJS(item));
            }
            if (Array.isArray(data["openStatus"])) {
                this.openStatus = [] as any;
                for (let item of data["openStatus"])
                    this.openStatus!.push(ReportDashboardStatusDto.fromJS(item));
            }
            if (Array.isArray(data["closeStatus"])) {
                this.closeStatus = [] as any;
                for (let item of data["closeStatus"])
                    this.closeStatus!.push(ReportDashboardStatusDto.fromJS(item));
            }
            if (Array.isArray(data["statusList"])) {
                this.statusList = [] as any;
                for (let item of data["statusList"])
                    this.statusList!.push(ReportDashboardStatusListDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): DashboardGetAllDto {
        data = typeof data === 'object' ? data : {};
        let result = new DashboardGetAllDto();
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
        if (Array.isArray(this.closeStatus)) {
            data["closeStatus"] = [];
            for (let item of this.closeStatus)
                data["closeStatus"].push(item.toJSON());
        }
        return data;
    }
}

export interface IReportDashboardSummaryDto {
    name: string;
    openStatus: ReportSummaryCountStatusDto[];
    closeStatus: ReportSummaryCountStatusDto[];
    total: number;
}

export class ReportDashboardSummaryDto implements IReportDashboardSummaryDto {
    name: string;
    openStatus: ReportSummaryCountStatusDto[];
    closeStatus: ReportSummaryCountStatusDto[];
    total: number;

    constructor(data?: IReportDashboardSummaryDto) {
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
            this.total = 0;

            if (Array.isArray(data["openStatus"])) {
                this.openStatus = [] as any;
                for (let item of data["openStatus"]) {
                    const value: ReportSummaryCountStatusDto = ReportSummaryCountStatusDto.fromJS(item);
                    this.total += value.count;
                    this.openStatus!.push(value);
                }

            }
            if (Array.isArray(data["closeStatus"])) {
                this.closeStatus = [] as any;
                for (let item of data["closeStatus"]) {
                    const value: ReportSummaryCountStatusDto = ReportSummaryCountStatusDto.fromJS(item);
                    this.total += value.count;
                    this.closeStatus!.push(value);
                }
            }
        }
    }

    static fromJS(data: any): ReportDashboardSummaryDto {
        data = typeof data === 'object' ? data : {};
        let result = new ReportDashboardSummaryDto();
        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        if (Array.isArray(this.openStatus)) {
            data["openStatus"] = [];
            for (let item of this.openStatus)
                data["openStatus"].push(item.toJSON());
        }
        if (Array.isArray(this.closeStatus)) {
            data["closeStatus"] = [];
            for (let item of this.closeStatus)
                data["closeStatus"].push(item.toJSON());
        }
        return data;
    }
}

export interface IReportSummaryCountStatusDto {
    id: number;
    status: string;
    count: number;
}

export class ReportSummaryCountStatusDto implements IReportSummaryCountStatusDto {
    id: number;
    status: string;
    count: number;

    constructor(data?: IReportSummaryCountStatusDto) {
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
            this.status = data["status"];
            this.count = data["count"];
        }
    }

    static fromJS(data: any): ReportSummaryCountStatusDto {
        data = typeof data === 'object' ? data : {};
        let result = new ReportSummaryCountStatusDto();
        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["status"] = this.status;
        data["count"] = this.count;

        return data;
    }
}

export interface IReportDashboardStatusDto {
    status: string;
    count: number;
}

export class ReportDashboardStatusDto implements IReportDashboardStatusDto {
    status: string;
    count: number;

    constructor(data?: IReportDashboardStatusDto) {
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

    static fromJS(data: any): ReportDashboardStatusDto {
        data = typeof data === 'object' ? data : {};
        let result = new ReportDashboardStatusDto();
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

export interface IReportDashboardStatusListDto {
    id: number;
    value: string;
}

export class ReportDashboardStatusListDto implements IReportDashboardStatusListDto {
    id: number;
    value: string;

    constructor(data?: IReportDashboardStatusListDto) {
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
            this.value = data["value"];
        }
    }

    static fromJS(data: any): ReportDashboardStatusListDto {
        data = typeof data === 'object' ? data : {};
        let result = new ReportDashboardStatusListDto();
        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["value"] = this.value;

        return data;
    }
}