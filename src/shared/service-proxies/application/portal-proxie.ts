import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete, pickTextColorBasedOnBgColorAdvanced, getRandomColor } from '../service-proxies';
import * as moment from 'moment';

@Injectable()
export class PortalServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(territorialUnitId?: number, departmentId?: number, provinceId?: number, districtId?: number, socialConflictId?: number): Observable<PortalGetAllDto> {
        let url_ = this.baseUrl + "/api/services/app/Portal/GetAll?";

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
            return this.processGetAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(<any>response_);
                } catch (e) {
                    return <Observable<PortalGetAllDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PortalGetAllDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PortalGetAllDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PortalGetAllDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PortalGetAllDto>(<any>null);
    }

    getReportFilters(): Observable<PortalReportFilterDto> {
        let url_ = this.baseUrl + "/api/services/app/Portal/GetReportFilters";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetReportFilters(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetReportFilters(<any>response_);
                } catch (e) {
                    return <Observable<PortalReportFilterDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PortalReportFilterDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetReportFilters(response: HttpResponseBase): Observable<PortalReportFilterDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PortalReportFilterDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PortalReportFilterDto>(<any>null);
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

    getAllSocialConflictAlerts(territorialUnitId?: number, departmentId?: number, provinceId?: number, districtId?: number, socialConflictId?: number): Observable<PortalSocialConflictAlertDataDto> {
        let url_ = this.baseUrl + "/api/services/app/Portal/GetAllSocialConflictAlerts?";

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
            return this.processGetAllSocialConflictAlerts(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllSocialConflictAlerts(<any>response_);
                } catch (e) {
                    return <Observable<PortalSocialConflictAlertDataDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PortalSocialConflictAlertDataDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllSocialConflictAlerts(response: HttpResponseBase): Observable<PortalSocialConflictAlertDataDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PortalSocialConflictAlertDataDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PortalSocialConflictAlertDataDto>(<any>null);
    }

    getAllSocialConflicts(territorialUnitId?: number, departmentId?: number, provinceId?: number, districtId?: number, socialConflictId?: number, socialConflictRiskId?: number, geographicType?: number): Observable<PortalSocialConflictDataDto> {
        let url_ = this.baseUrl + "/api/services/app/Portal/GetAllSocialConflicts?";

        if (territorialUnitId !== undefined)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnitId) + "&";
        if (departmentId !== undefined)
            url_ += "DepartmentId=" + encodeURIComponent("" + departmentId) + "&";
        if (provinceId !== undefined)
            url_ += "ProvinceId=" + encodeURIComponent("" + provinceId) + "&";
        if (districtId !== undefined)
            url_ += "DistrictId=" + encodeURIComponent("" + districtId) + "&";
        if (socialConflictRiskId)
            url_ += "SocialConflictRiskId=" + encodeURIComponent("" + socialConflictRiskId) + "&";
        if (geographicType)
            url_ += "GeographicType=" + encodeURIComponent("" + geographicType) + "&";
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
            return this.processGetAllSocialConflicts(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllSocialConflicts(<any>response_);
                } catch (e) {
                    return <Observable<PortalSocialConflictDataDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PortalSocialConflictDataDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllSocialConflicts(response: HttpResponseBase): Observable<PortalSocialConflictDataDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PortalSocialConflictDataDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PortalSocialConflictDataDto>(<any>null);
    }

    getAllSocialConflictSensibles(territorialUnitId?: number, departmentId?: number, provinceId?: number, districtId?: number, socialConflictRiskId?: number, geographicType?: number): Observable<PortalSocialConflictSensibleDataDto> {
        let url_ = this.baseUrl + "/api/services/app/Portal/GetAllSocialConflictSensibles?";

        if (territorialUnitId !== undefined)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnitId) + "&";
        if (departmentId !== undefined)
            url_ += "DepartmentId=" + encodeURIComponent("" + departmentId) + "&";
        if (provinceId !== undefined)
            url_ += "ProvinceId=" + encodeURIComponent("" + provinceId) + "&";
        if (districtId !== undefined)
            url_ += "DistrictId=" + encodeURIComponent("" + districtId) + "&";
        if (socialConflictRiskId)
            url_ += "SocialConflictRiskId=" + encodeURIComponent("" + socialConflictRiskId) + "&";
        if (geographicType)
            url_ += "GeographicType=" + encodeURIComponent("" + geographicType) + "&";

        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAllSocialConflictSensibles(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllSocialConflictSensibles(<any>response_);
                } catch (e) {
                    return <Observable<PortalSocialConflictSensibleDataDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PortalSocialConflictSensibleDataDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllSocialConflictSensibles(response: HttpResponseBase): Observable<PortalSocialConflictSensibleDataDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PortalSocialConflictSensibleDataDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PortalSocialConflictSensibleDataDto>(<any>null);
    }

    getQuestions(): Observable<PagedResultDtoOfPortalQuizFormListDto> {
        let url_ = this.baseUrl + "/api/services/app/Portal/GetQuestions";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetQuestions(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetQuestions(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfPortalQuizFormListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfPortalQuizFormListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetQuestions(response: HttpResponseBase): Observable<PagedResultDtoOfPortalQuizFormListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfPortalQuizFormListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfPortalQuizFormListDto>(<any>null);
    }
}

export class IPortalGetAllDto {
    summary: ReportSummaryDto[];
    status: ReportStatusDto[];
    openStatus: ReportStatusDto[];
    responsibles: ReportResponsibleStatusDto[];
    socialConflicts: PortalSocialConflictDto[];
}

export class PortalGetAllDto implements IPortalGetAllDto {
    summary: ReportSummaryDto[];
    status: ReportStatusDto[];
    openStatus: ReportStatusDto[];
    responsibles: ReportResponsibleStatusDto[];
    socialConflicts: PortalSocialConflictDto[];

    constructor(data?: IPortalGetAllDto) {
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
            if (Array.isArray(data["responsibles"])) {
                this.responsibles = [] as any;
                for (let item of data["responsibles"])
                    this.responsibles!.push(ReportResponsibleStatusDto.fromJS(item));
            }
            if (Array.isArray(data["socialConflicts"])) {
                this.socialConflicts = [] as any;
                for (let item of data["socialConflicts"])
                    this.socialConflicts!.push(PortalSocialConflictDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PortalGetAllDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalGetAllDto();
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
        if (Array.isArray(this.responsibles)) {
            data["responsibleStatus"] = [];
            for (let item of this.responsibles)
                data["responsibleStatus"].push(item.toJSON());
        }
        if (Array.isArray(this.socialConflicts)) {
            data["socialConflicts"] = [];
            for (let item of this.socialConflicts)
                data["socialConflicts"].push(item.toJSON());
        }
        return data;
    }
}

export interface IReportSummaryDto {
    name: string;
    type: number;
    activityTotal: number;
    pipTotal: number;
    background: string;
    color: string;
}

export class ReportSummaryDto implements IReportSummaryDto {
    name: string;
    type: number;
    activityTotal: number;
    pipTotal: number;
    background: string;
    color: string;

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
            this.type = data["type"];
            this.activityTotal = data["activityTotal"];
            this.pipTotal = data["pipTotal"];
            this.background = getRandomColor();
            this.color = pickTextColorBasedOnBgColorAdvanced(this.background);
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
        data["type"] = this.type;
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
    name: string;
    activityTotal: number;
    pipTotal: number;
}

export class ReportResponsibleStatusDto implements IReportResponsibleStatusDto {
    name: string;
    activityTotal: number;
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
            this.name = data["name"];
            this.activityTotal = data["activityTotal"];
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

        data["name"] = this.name;
        data["activityTotal"] = this.activityTotal;
        data["pipTotal"] = this.pipTotal;

        return data;
    }
}

export interface IPortalReportFilterDto {
    territorialUnits: PortalTerritorialUnitDto[];
    departments: PortalDepartmentDto[];
    socialConflicts: PortalSocialConflictDto[];
    risks: PortalRiskDto[];
    geographics: PortalGeographicDto[];
    typologies: PortalTypologyDto[];
}

export class PortalReportFilterDto implements IPortalReportFilterDto {
    territorialUnits: PortalTerritorialUnitDto[];
    departments: PortalDepartmentDto[];
    socialConflicts: PortalSocialConflictDto[];
    risks: PortalRiskDto[];
    geographics: PortalGeographicDto[];
    typologies: PortalTypologyDto[];

    constructor(data?: IPortalReportFilterDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            if (Array.isArray(data["territorialUnits"])) {
                this.territorialUnits = [] as any;
                for (let item of data["territorialUnits"])
                    this.territorialUnits!.push(PortalTerritorialUnitDto.fromJS(item));
            }
            if (Array.isArray(data["departments"])) {
                this.departments = [] as any;
                for (let item of data["departments"])
                    this.departments!.push(PortalDepartmentDto.fromJS(item));
            }
            if (Array.isArray(data["socialConflicts"])) {
                this.socialConflicts = [] as any;
                for (let item of data["socialConflicts"])
                    this.socialConflicts!.push(PortalSocialConflictDto.fromJS(item));
            }
            if (Array.isArray(data["risks"])) {
                this.risks = [] as any;
                for (let item of data["risks"])
                    this.risks!.push(PortalRiskDto.fromJS(item));
            }
            if (Array.isArray(data["geographics"])) {
                this.geographics = [] as any;
                for (let item of data["geographics"])
                    this.geographics!.push(PortalGeographicDto.fromJS(item));
            }
            if (Array.isArray(data["typologies"])) {
                this.typologies = [] as any;
                for (let item of data["typologies"])
                    this.typologies!.push(PortalTypologyDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PortalReportFilterDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalReportFilterDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

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
        if (Array.isArray(this.socialConflicts)) {
            data["socialConflicts"] = [];
            for (let item of this.socialConflicts)
                data["socialConflicts"].push(item.toJSON());
        }
        if (Array.isArray(this.risks)) {
            data["risks"] = [];
            for (let item of this.risks)
                data["risks"].push(item.toJSON());
        }
        if (Array.isArray(this.geographics)) {
            data["geographics"] = [];
            for (let item of this.geographics)
                data["geographics"].push(item.toJSON());
        }
        if (Array.isArray(this.typologies)) {
            data["typologies"] = [];
            for (let item of this.typologies)
                data["typologies"].push(item.toJSON());
        }

        return data;
    }
}

export interface IPortalTerritorialUnitDto {
    id: number;
    name: string;
}

export class PortalTerritorialUnitDto implements IPortalTerritorialUnitDto {
    id: number;
    name: string;

    constructor(data?: IPortalTerritorialUnitDto) {
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

    static fromJS(data: any): PortalTerritorialUnitDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalTerritorialUnitDto();
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


export interface IPortalDepartmentDto {
    id: number;
    name: string;
    provinces: PortalProvinceDto[];
    territorialUnitIds: PortalEntityDto[];
}

export class PortalDepartmentDto implements IPortalDepartmentDto {
    id: number;
    name: string;
    provinces: PortalProvinceDto[];
    territorialUnitIds: PortalEntityDto[];

    constructor(data?: IPortalDepartmentDto) {
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
            if (Array.isArray(data["provinces"])) {
                this.provinces = [] as any;
                for (let item of data["provinces"])
                    this.provinces!.push(PortalProvinceDto.fromJS(item));
            }
            if (Array.isArray(data["territorialUnitIds"])) {
                this.territorialUnitIds = [] as any;
                for (let item of data["territorialUnitIds"])
                    this.territorialUnitIds!.push(PortalEntityDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PortalDepartmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalDepartmentDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        if (Array.isArray(this.provinces)) {
            data["provinces"] = [];
            for (let item of this.provinces)
                data["provinces"].push(item.toJSON());
        }
        if (Array.isArray(this.territorialUnitIds)) {
            data["territorialUnitIds"] = [];
            for (let item of this.territorialUnitIds)
                data["territorialUnitIds"].push(item.toJSON());
        }
        return data;
    }
}

export interface IPortalProvinceDto {
    id: number;
    name: string;
    districts: PortalDistrictDto[];
}

export class PortalProvinceDto implements IPortalProvinceDto {
    id: number;
    name: string;
    districts: PortalDistrictDto[];

    constructor(data?: IPortalProvinceDto) {
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
                    this.districts!.push(PortalDistrictDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PortalProvinceDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalProvinceDto();
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

export interface IPortalDistrictDto {
    id: number;
    name: string;
}

export class PortalDistrictDto implements IPortalDistrictDto {
    id: number;
    name: string;

    constructor(data?: IPortalDistrictDto) {
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

    static fromJS(data: any): PortalDistrictDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalDistrictDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;

        return data;
    }
}

export interface IPortalEntityDto {
    id: number;
}

export class PortalEntityDto implements IPortalEntityDto {
    id: number;

    constructor(data?: IPortalEntityDto) {
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
        }
    }

    static fromJS(data: any): PortalEntityDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalEntityDto();
        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;

        return data;
    }
}

export interface IPortalSocialConflictDto {
    id: number;
    code: string;
    caseName: string;
    dialog: string;
    territorialUnits: string;
    creationTime: moment.Moment;
    locations: PortalSocialConflictLocationDataDto[];
}

export class PortalSocialConflictDto implements IPortalSocialConflictDto {
    id: number;
    code: string;
    caseName: string;
    dialog: string;
    territorialUnits: string;
    creationTime: moment.Moment;
    locations: PortalSocialConflictLocationDataDto[];

    constructor(data?: IPortalSocialConflictDto) {
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
            this.dialog = data["dialog"];
            this.territorialUnits = data["territorialUnits"];
            this.creationTime = data["creationTime"] ? moment(data["creationTime"].toString()) : <any>undefined;
            if (Array.isArray(data["locations"])) {
                this.locations = [] as any;
                for (let item of data["locations"])
                    this.locations!.push(PortalSocialConflictLocationDataDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PortalSocialConflictDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalSocialConflictDto();
        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["code"] = this.code;
        data["caseName"] = this.caseName;
        data["dialog"] = this.dialog;
        if (Array.isArray(this.locations)) {
            data["locations"] = [];
            for (let item of this.locations)
                data["locations"].push(item.toJSON());
        }

        return data;
    }
}


export interface IPortalSocialConflictLocationDataDto {
    territorialUnit: PortalTerritorialUnitDto;
    department: PortalDepartmentDto;
    province: PortalProvinceDto;
    district: PortalDistrictDto;
}

export class PortalSocialConflictLocationDataDto implements IPortalSocialConflictLocationDataDto {
    territorialUnit: PortalTerritorialUnitDto;
    department: PortalDepartmentDto;
    province: PortalProvinceDto;
    district: PortalDistrictDto;

    constructor(data?: IPortalSocialConflictLocationDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.territorialUnit = data["territorialUnit"] ? PortalTerritorialUnitDto.fromJS(data["territorialUnit"]) : <any>undefined;
            this.department = data["department"] ? PortalDepartmentDto.fromJS(data["department"]) : <any>undefined;
            this.province = data["province"] ? PortalProvinceDto.fromJS(data["province"]) : <any>undefined;
            this.district = data["territorialUnit"] ? PortalDistrictDto.fromJS(data["district"]) : <any>undefined;
        }
    }

    static fromJS(data: any): PortalSocialConflictLocationDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalSocialConflictLocationDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["territorialUnit"] = this.territorialUnit ? this.territorialUnit.toJSON() : <any>undefined;
        data["department"] = this.department ? this.department.toJSON() : <any>undefined;
        data["province"] = this.province ? this.province.toJSON() : <any>undefined;
        data["district"] = this.district ? this.district.toJSON() : <any>undefined;

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

export interface IPortalRiskDto {
    id: number;
    name: string;
}

export class PortalRiskDto implements IPortalRiskDto {
    id: number;
    name: string;

    constructor(data?: IPortalRiskDto) {
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

    static fromJS(data: any): PortalRiskDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalRiskDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;

        return data;
    }
}

export interface IPortalGeographicDto {
    id: number;
    name: string;
}

export class PortalGeographicDto implements IPortalGeographicDto {
    id: number;
    name: string;

    constructor(data?: IPortalGeographicDto) {
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

    static fromJS(data: any): PortalGeographicDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalGeographicDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;

        return data;
    }
}

export interface IPortalTypologyDto {
    id: number;
    name: string;
}

export class PortalTypologyDto implements IPortalTypologyDto {
    id: number;
    name: string;

    constructor(data?: IPortalTypologyDto) {
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

    static fromJS(data: any): PortalTypologyDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalTypologyDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;

        return data;
    }
}

export interface IPortalSocialConflictDataDto {
    risks: PortalSocialConflictRiskDto[];
    geographycTypes: PortalSocialConflictGeographycTypeDto[];
    locations: PortalSocialConflictLocationDto[];
}

export class PortalSocialConflictDataDto implements IPortalSocialConflictDataDto {
    risks: PortalSocialConflictRiskDto[];
    geographycTypes: PortalSocialConflictGeographycTypeDto[];
    locations: PortalSocialConflictLocationDto[];

    constructor(data?: IPortalSocialConflictDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            if (Array.isArray(data["risks"])) {
                this.risks = [] as any;
                for (let item of data["risks"])
                    this.risks!.push(PortalSocialConflictRiskDto.fromJS(item));
            }
            if (Array.isArray(data["geographycTypes"])) {
                this.geographycTypes = [] as any;
                for (let item of data["geographycTypes"])
                    this.geographycTypes!.push(PortalSocialConflictGeographycTypeDto.fromJS(item));
            }
            if (Array.isArray(data["locations"])) {
                this.locations = [] as any;
                for (let item of data["locations"])
                    this.locations!.push(PortalSocialConflictLocationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PortalSocialConflictDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalSocialConflictDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.risks)) {
            data["risks"] = [];
            for (let item of this.risks)
                data["risks"].push(item.toJSON());
        }
        if (Array.isArray(this.geographycTypes)) {
            data["geographycTypes"] = [];
            for (let item of this.geographycTypes)
                data["geographycTypes"].push(item.toJSON());
        }
        if (Array.isArray(this.locations)) {
            data["locations"] = [];
            for (let item of this.locations)
                data["locations"].push(item.toJSON());
        }

        return data;
    }

}

export interface IPortalSocialConflictAlertDataDto {
    risks: PortalSocialConflictAlertRiskDto[];
    sectors: PortalSocialConflictAlertSectorDto[];
    states: PortalSocialConflictAlertStateDto[];
    territorialUnits: PortalSocialConflictAlertTerritorialUnitDto[];
    typologies: PortalSocialConflictAlertTypologyDto[];
}

export class PortalSocialConflictAlertDataDto implements IPortalSocialConflictAlertDataDto {
    risks: PortalSocialConflictAlertRiskDto[];
    sectors: PortalSocialConflictAlertSectorDto[];
    states: PortalSocialConflictAlertStateDto[];
    territorialUnits: PortalSocialConflictAlertTerritorialUnitDto[];
    typologies: PortalSocialConflictAlertTypologyDto[];

    constructor(data?: IPortalSocialConflictAlertDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            if (Array.isArray(data["risks"])) {
                this.risks = [] as any;
                for (let item of data["risks"])
                    this.risks!.push(PortalSocialConflictAlertRiskDto.fromJS(item));
            }
            if (Array.isArray(data["sectors"])) {
                this.sectors = [] as any;
                for (let item of data["sectors"])
                    this.sectors!.push(PortalSocialConflictAlertSectorDto.fromJS(item));
            }
            if (Array.isArray(data["states"])) {
                this.states = [] as any;
                for (let item of data["states"])
                    this.states!.push(PortalSocialConflictAlertStateDto.fromJS(item));
            }
            if (Array.isArray(data["territorialUnits"])) {
                this.territorialUnits = [] as any;
                for (let item of data["territorialUnits"])
                    this.territorialUnits!.push(PortalSocialConflictAlertTerritorialUnitDto.fromJS(item));
            }
            if (Array.isArray(data["typologies"])) {
                this.typologies = [] as any;
                for (let item of data["typologies"])
                    this.typologies!.push(PortalSocialConflictAlertTypologyDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PortalSocialConflictAlertDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalSocialConflictAlertDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
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
        if (Array.isArray(this.territorialUnits)) {
            data["territorialUnits"] = [];
            for (let item of this.territorialUnits)
                data["territorialUnits"].push(item.toJSON());
        }
        if (Array.isArray(this.typologies)) {
            data["typologies"] = [];
            for (let item of this.typologies)
                data["typologies"].push(item.toJSON());
        }

        return data;
    }

}

export interface IPortalSocialConflictSensibleDataDto {
    risks: PortalSocialConflictSensibleRiskDto[];
    geographycTypes: PortalSocialConflictSensibleGeographycTypeDto[];
    locations: PortalSocialConflictSensibleLocationDto[];
}

export class PortalSocialConflictSensibleDataDto implements IPortalSocialConflictSensibleDataDto {
    risks: PortalSocialConflictSensibleRiskDto[];
    geographycTypes: PortalSocialConflictSensibleGeographycTypeDto[];
    locations: PortalSocialConflictSensibleLocationDto[];

    constructor(data?: IPortalSocialConflictSensibleDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            if (Array.isArray(data["risks"])) {
                this.risks = [] as any;
                for (let item of data["risks"])
                    this.risks!.push(PortalSocialConflictSensibleRiskDto.fromJS(item));
            }
            if (Array.isArray(data["geographycTypes"])) {
                this.geographycTypes = [] as any;
                for (let item of data["geographycTypes"])
                    this.geographycTypes!.push(PortalSocialConflictSensibleGeographycTypeDto.fromJS(item));
            }
            if (Array.isArray(data["locations"])) {
                this.locations = [] as any;
                for (let item of data["locations"])
                    this.locations!.push(PortalSocialConflictSensibleLocationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PortalSocialConflictSensibleDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalSocialConflictSensibleDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.risks)) {
            data["risks"] = [];
            for (let item of this.risks)
                data["risks"].push(item.toJSON());
        }
        if (Array.isArray(this.geographycTypes)) {
            data["geographycTypes"] = [];
            for (let item of this.geographycTypes)
                data["geographycTypes"].push(item.toJSON());
        }
        if (Array.isArray(this.locations)) {
            data["locations"] = [];
            for (let item of this.locations)
                data["locations"].push(item.toJSON());
        }

        return data;
    }

}

export interface IPortalSocialConflictAlertRiskDto {
    name: string;
    count: number;
}

export class PortalSocialConflictAlertRiskDto implements IPortalSocialConflictAlertRiskDto {
    name: string;
    count: number;

    //readonly
    isHidden: boolean;

    constructor(data?: IPortalSocialConflictAlertRiskDto) {
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
            this.count = data["count"];
        }
    }

    static fromJS(data: any): PortalSocialConflictAlertRiskDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalSocialConflictAlertRiskDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["count"] = this.count;

        return data;
    }
}

export interface IPortalSocialConflictAlertSectorDto {
    name: string;
    count: number;
}

export class PortalSocialConflictAlertSectorDto implements IPortalSocialConflictAlertSectorDto {
    name: string;
    count: number;

    //readonly
    isHidden: boolean;

    constructor(data?: IPortalSocialConflictAlertSectorDto) {
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
            this.count = data["count"];
        }
    }

    static fromJS(data: any): PortalSocialConflictAlertSectorDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalSocialConflictAlertSectorDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["count"] = this.count;

        return data;
    }
}

export interface IPortalSocialConflictAlertStateDto {
    name: string;
    count: number;
}

export class PortalSocialConflictAlertStateDto implements IPortalSocialConflictAlertStateDto {
    name: string;
    count: number;

    //readonly
    isHidden: boolean;

    constructor(data?: IPortalSocialConflictAlertStateDto) {
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
            this.count = data["count"];
        }
    }

    static fromJS(data: any): PortalSocialConflictAlertStateDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalSocialConflictAlertStateDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["count"] = this.count;

        return data;
    }
}

export interface IPortalSocialConflictAlertTerritorialUnitDto {
    name: string;
    count: number;
}

export class PortalSocialConflictAlertTerritorialUnitDto implements IPortalSocialConflictAlertTerritorialUnitDto {
    name: string;
    count: number;

    //readonly
    isHidden: boolean;

    constructor(data?: IPortalSocialConflictAlertTerritorialUnitDto) {
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
            this.count = data["count"];
        }
    }

    static fromJS(data: any): PortalSocialConflictAlertTerritorialUnitDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalSocialConflictAlertTerritorialUnitDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["count"] = this.count;

        return data;
    }
}

export interface IPortalSocialConflictAlertTypologyDto {
    name: string;
    count: number;
}

export class PortalSocialConflictAlertTypologyDto implements IPortalSocialConflictAlertTypologyDto {
    name: string;
    count: number;

    //readonly
    isHidden: boolean;

    constructor(data?: IPortalSocialConflictAlertTypologyDto) {
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
            this.count = data["count"];
        }
    }

    static fromJS(data: any): PortalSocialConflictAlertTypologyDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalSocialConflictAlertTypologyDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["count"] = this.count;

        return data;
    }
}

export interface IPortalSocialConflictRiskDto {
    name: string;
    count: number;
}

export class PortalSocialConflictRiskDto implements IPortalSocialConflictRiskDto {
    name: string;
    count: number;

    //readonly
    isHidden: boolean;

    constructor(data?: IPortalSocialConflictRiskDto) {
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
            this.count = data["count"];
        }
    }

    static fromJS(data: any): PortalSocialConflictRiskDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalSocialConflictRiskDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["count"] = this.count;

        return data;
    }
}

export interface IPortalSocialConflictGeographycTypeDto {
    name: string;
    count: number;
}

export class PortalSocialConflictGeographycTypeDto implements IPortalSocialConflictGeographycTypeDto {
    name: string;
    count: number;

    //readonly
    isHidden: boolean;

    constructor(data?: IPortalSocialConflictGeographycTypeDto) {
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
            this.count = data["count"];
        }
    }

    static fromJS(data: any): PortalSocialConflictGeographycTypeDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalSocialConflictGeographycTypeDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["count"] = this.count;

        return data;
    }
}

export interface IPortalSocialConflictLocationDto {
    name: string;
    count: number;
}

export class PortalSocialConflictLocationDto implements IPortalSocialConflictLocationDto {
    name: string;
    count: number;

    //readonly
    isHidden: boolean;

    constructor(data?: IPortalSocialConflictLocationDto) {
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
            this.count = data["count"];
        }
    }

    static fromJS(data: any): PortalSocialConflictLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalSocialConflictLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["count"] = this.count;

        return data;
    }
}

export interface IPortalSocialConflictSensibleRiskDto {
    name: string;
    count: number;
}

export class PortalSocialConflictSensibleRiskDto implements IPortalSocialConflictSensibleRiskDto {
    name: string;
    count: number;

    //readonly
    isHidden: boolean;

    constructor(data?: IPortalSocialConflictSensibleRiskDto) {
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
            this.count = data["count"];
        }
    }

    static fromJS(data: any): PortalSocialConflictSensibleRiskDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalSocialConflictSensibleRiskDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["count"] = this.count;

        return data;
    }
}

export interface IPortalSocialConflictSensibleGeographycTypeDto {
    name: string;
    count: number;
}

export class PortalSocialConflictSensibleGeographycTypeDto implements IPortalSocialConflictSensibleGeographycTypeDto {
    name: string;
    count: number;

    //readonly
    isHidden: boolean;

    constructor(data?: IPortalSocialConflictSensibleGeographycTypeDto) {
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
            this.count = data["count"];
        }
    }

    static fromJS(data: any): PortalSocialConflictSensibleGeographycTypeDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalSocialConflictSensibleGeographycTypeDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["count"] = this.count;

        return data;
    }
}

export interface IPortalSocialConflictSensibleLocationDto {
    name: string;
    count: number;
}

export class PortalSocialConflictSensibleLocationDto implements IPortalSocialConflictSensibleLocationDto {
    name: string;
    count: number;

    //readonly
    isHidden: boolean;

    constructor(data?: IPortalSocialConflictSensibleLocationDto) {
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
            this.count = data["count"];
        }
    }

    static fromJS(data: any): PortalSocialConflictSensibleLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalSocialConflictSensibleLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["count"] = this.count;

        return data;
    }
}

export interface IPagedResultDtoOfPortalQuizFormListDto {
    totalCount: number;
    items: PortalQuizFormDto[] | undefined;
}

export class PagedResultDtoOfPortalQuizFormListDto implements IPagedResultDtoOfPortalQuizFormListDto {
    totalCount!: number;
    items!: PortalQuizFormDto[] | undefined;

    constructor(data?: IPagedResultDtoOfPortalQuizFormListDto) {
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
                    this.items!.push(PortalQuizFormDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfPortalQuizFormListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfPortalQuizFormListDto();
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

export interface IPortalQuizFormDto {
    id: number;
    name: string;
    required: boolean;
    selectedOptionId: number;
    options: PortalQuizFormOptionDto[];
}

export class PortalQuizFormDto implements IPortalQuizFormDto {
    id: number;
    name: string;
    required: boolean;
    selectedOptionId: number;
    options: PortalQuizFormOptionDto[];

    constructor(data?: IPortalQuizFormDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.selectedOptionId = -1;
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.required = _data["required"];
            if (Array.isArray(_data["options"])) {
                this.options = [] as any;
                for (let item of _data["options"])
                    this.options!.push(PortalQuizFormOptionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PortalQuizFormDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalQuizFormDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["required"] = this.required;
        data["selectedOptionId"] = this.selectedOptionId;
        if (Array.isArray(this.options)) {
            data["options"] = [];
            for (let item of this.options)
                data["options"].push(item.toJSON());
        }
        return data;
    }
}

export interface IPortalQuizFormOptionDto {
    id: number;
    name: string;
    extra: boolean;
    response: string;
}

export class PortalQuizFormOptionDto implements IPortalQuizFormOptionDto {
    id: number;
    name: string;
    extra: boolean;
    response: string;

    constructor(data?: IPortalQuizFormOptionDto) {
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
            this.extra = _data["extra"];
            this.response = _data["response"];
        }
    }

    static fromJS(data: any): PortalQuizFormOptionDto {
        data = typeof data === 'object' ? data : {};
        let result = new PortalQuizFormOptionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["extra"] = this.extra;
        data["response"] = this.response;

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