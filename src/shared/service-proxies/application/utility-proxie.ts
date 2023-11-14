import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { PersonType, API_BASE_URL, blobToText, throwException, processComplete, EntityDto } from '../service-proxies';
import * as moment from 'moment';
import { ResponsibleActorType } from './responsible-actor-proxie';
import { ActorTypeDto,ActorMovementDto } from './actor-proxie';

@Injectable()
export class UtilityServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAllSocialConflicts(
        socialConflictCode: string | undefined,
        socialConflictDescription: string | undefined,
        territorialUnitId: number | undefined,
        departmentId: number | undefined,
        provinceId: number | undefined,
        districtId: number | undefined,
        conditionId: number | undefined,
        personId: number | undefined,
        typologyId: number | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultUtilitySocialConflictUnitDto> {
        let url_ = this.baseUrl + "/api/services/app/Utility/GetAllSocialConflicts?";
        if (socialConflictCode !== undefined)
            url_ += "SocialConflictCode=" + encodeURIComponent("" + socialConflictCode) + "&";
        if (socialConflictDescription !== undefined)
            url_ += "SocialConflictDescription=" + encodeURIComponent("" + socialConflictDescription) + "&";
        if (territorialUnitId !== undefined && territorialUnitId != -1)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnitId) + "&";
        if (departmentId !== undefined && departmentId != -1)
            url_ += "DepartmentId=" + encodeURIComponent("" + departmentId) + "&";
        if (provinceId !== undefined && provinceId != -1)
            url_ += "ProvinceId=" + encodeURIComponent("" + provinceId) + "&";
        if (districtId !== undefined && districtId != -1)
            url_ += "DistrictId=" + encodeURIComponent("" + districtId) + "&";
        if (conditionId !== undefined && conditionId != -1)
            url_ += "Condition=" + encodeURIComponent("" + conditionId) + "&";
        if (personId !== undefined && personId != -1)
            url_ += "PersonId=" + encodeURIComponent("" + personId) + "&";
        if (typologyId !== undefined && typologyId != -1)
            url_ += "TypologyId=" + encodeURIComponent("" + typologyId) + "&";
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
            return this.processGetAllSocialConflicts(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllSocialConflicts(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultUtilitySocialConflictUnitDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultUtilitySocialConflictUnitDto>><any>_observableThrow(response_);
        }));
    }

    getAllUserSocialConflicts(
        filter: string | undefined,
        userId: number | undefined,
        code: string | undefined,
        territorialUnit: number | undefined,
        startDate: moment.Moment | undefined,
        endDate: moment.Moment | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultUtilitySocialConflictUnitDto> {

        let url_ = this.baseUrl + "/api/services/app/Utility/GetAllUserSocialConflicts?";

        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (userId !== undefined)
            url_ += "UserId=" + encodeURIComponent("" + userId) + "&";
        if (code !== undefined)
            url_ += "Code=" + encodeURIComponent("" + code) + "&";
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
            return this.processGetAllSocialConflicts(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllSocialConflicts(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultUtilitySocialConflictUnitDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultUtilitySocialConflictUnitDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllSocialConflicts(response: HttpResponseBase): Observable<PagedResultUtilitySocialConflictUnitDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultUtilitySocialConflictUnitDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultUtilitySocialConflictUnitDto>(<any>null);
    }

    getAllRegions(
        filter: string | undefined,
        districtId: number | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultDtoOfRegionListDto> {

        let url_ = this.baseUrl + "/api/services/app/Utility/GetAllRegions?";

        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (districtId !== undefined)
            url_ += "DistrictId=" + encodeURIComponent("" + districtId) + "&";
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
            return this.processGetAllRegions(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllRegions(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfRegionListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfRegionListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllRegions(response: HttpResponseBase): Observable<PagedResultDtoOfRegionListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfRegionListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfRegionListDto>(<any>null);
    }

    getTerritorialUnits(): Observable<PagedResultUtilityTerritorialUnitDto> {
        let url_ = this.baseUrl + "/api/services/app/Utility/GetTerritorialUnits";
        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetTerritorialUnits(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetTerritorialUnits(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultUtilityTerritorialUnitDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultUtilityTerritorialUnitDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetTerritorialUnits(response: HttpResponseBase): Observable<PagedResultUtilityTerritorialUnitDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultUtilityTerritorialUnitDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultUtilityTerritorialUnitDto>(<any>null);
    }

    getAllRecords(
        filter: string | undefined,
        socialConflictCode: string | undefined,
        recordcode: string | undefined,
        territorialUnit: number | undefined,
        filterByDate: boolean | undefined,
        startDate: moment.Moment | undefined,
        endDate: moment.Moment | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultUtilityRecordDto> {
        let url_ = this.baseUrl + "/api/services/app/Utility/GetAllRecords?";
        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (recordcode !== undefined)
            url_ += "Code=" + encodeURIComponent("" + recordcode) + "&";
        if (territorialUnit !== undefined)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnit) + "&";
        if (socialConflictCode !== undefined)
            url_ += "SocialConflictCode=" + encodeURIComponent("" + socialConflictCode) + "&";
        if (filterByDate !== undefined)
            url_ += "FilterByDate=" + encodeURIComponent("" + filterByDate) + "&";
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
            return this.processGetAllRecords(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllRecords(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultUtilityRecordDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultUtilityRecordDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllRecords(response: HttpResponseBase): Observable<PagedResultUtilityRecordDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultUtilityRecordDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultUtilityRecordDto>(<any>null);
    }

    getAllPersons(
        filter: string | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultDtoOfPersonListDto> {
        let url_ = this.baseUrl + "/api/services/app/Utility/GetAllPersons?";
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
                    return <Observable<PagedResultDtoOfPersonListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfPersonListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllPersons(response: HttpResponseBase): Observable<PagedResultDtoOfPersonListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfPersonListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfPersonListDto>(<any>null);
    }

    getAllSocialConflictLocations(id: number): Observable<PagedResultDtoOfSocialConflictLocationListDto> {
        let url_ = this.baseUrl + "/api/services/app/Utility/GetAllSocialConflictLocations?";
        if (id !== undefined && id !== null)
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
            return this.processGetAllSocialConflictLocations(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllSocialConflictLocations(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfSocialConflictLocationListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfSocialConflictLocationListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllSocialConflictLocations(response: HttpResponseBase): Observable<PagedResultDtoOfSocialConflictLocationListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfSocialConflictLocationListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfSocialConflictLocationListDto>(<any>null);
    }

    getReportFilters(): Observable<UtilityGetDataDto> {
        let url_ = this.baseUrl + "/api/services/app/Utility/GetReportFilters";

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
                    return <Observable<UtilityGetDataDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<UtilityGetDataDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetReportFilters(response: HttpResponseBase): Observable<UtilityGetDataDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = UtilityGetDataDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<UtilityGetDataDto>(<any>null);
    }

    getAllSocialConflictAlertFilters(): Observable<UtilitySocialConflictAlertReportFilterGetDto> {
        let url_ = this.baseUrl + "/api/services/app/Utility/GetAllSocialConflictAlertFilters";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAllSocialConflictAlertFilters(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllSocialConflictAlertFilters(<any>response_);
                } catch (e) {
                    return <Observable<UtilitySocialConflictAlertReportFilterGetDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<UtilitySocialConflictAlertReportFilterGetDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllSocialConflictAlertFilters(response: HttpResponseBase): Observable<UtilitySocialConflictAlertReportFilterGetDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = UtilitySocialConflictAlertReportFilterGetDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<UtilitySocialConflictAlertReportFilterGetDto>(<any>null);
    }

    getAllSectorMeetFilters(): Observable<UtilitySectorMeetReportFilterGetDto> {
        let url_ = this.baseUrl + "/api/services/app/Utility/GetAllSectorMeetFilters";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAllSectorMeetFilters(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllSectorMeetFilters(<any>response_);
                } catch (e) {
                    return <Observable<UtilitySectorMeetReportFilterGetDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<UtilitySectorMeetReportFilterGetDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllSectorMeetFilters(response: HttpResponseBase): Observable<UtilitySectorMeetReportFilterGetDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = UtilitySectorMeetReportFilterGetDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<UtilitySectorMeetReportFilterGetDto>(<any>null);
    }

    getAllInterventionPlanFilters(): Observable<UtilityInterventionPlanReportFilterGetDto> {
        let url_ = this.baseUrl + "/api/services/app/Utility/GetAllInterventionPlanFilters";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAllInterventionPlanFilters(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllInterventionPlanFilters(<any>response_);
                } catch (e) {
                    return <Observable<UtilityInterventionPlanReportFilterGetDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<UtilityInterventionPlanReportFilterGetDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllInterventionPlanFilters(response: HttpResponseBase): Observable<UtilityInterventionPlanReportFilterGetDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = UtilityInterventionPlanReportFilterGetDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<UtilityInterventionPlanReportFilterGetDto>(<any>null);
    }

    getAllDepartments(): Observable<PagedResultDtoOfDeparmentListDto> {
        let url_ = this.baseUrl + "/api/services/app/Utility/GetAllDepartments";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAllDepartments(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllDepartments(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfDeparmentListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfDeparmentListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllDepartments(response: HttpResponseBase): Observable<PagedResultDtoOfDeparmentListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfDeparmentListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfDeparmentListDto>(<any>null);
    }

    getAllSocialConflictFilters(): Observable<UtilitySocialConflictReportFilterGetDto> {
        let url_ = this.baseUrl + "/api/services/app/Utility/GetAllSocialConflictFilters";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAllSocialConflictFilters(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllSocialConflictFilters(<any>response_);
                } catch (e) {
                    return <Observable<UtilitySocialConflictReportFilterGetDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<UtilitySocialConflictReportFilterGetDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllSocialConflictFilters(response: HttpResponseBase): Observable<UtilitySocialConflictReportFilterGetDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = UtilitySocialConflictReportFilterGetDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<UtilitySocialConflictReportFilterGetDto>(<any>null);
    }

    getAllDirectoryGovermentFilters(): Observable<UtilityDirectoryGovernmentFilterGetDto> {
        let url_ = this.baseUrl + "/api/services/app/Utility/GetAllDirectoryGovermentFilters";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAllDirectoryGovermentFilters(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllDirectoryGovermentFilters(<any>response_);
                } catch (e) {
                    return <Observable<UtilityDirectoryGovernmentFilterGetDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<UtilityDirectoryGovernmentFilterGetDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllDirectoryGovermentFilters(response: HttpResponseBase): Observable<UtilityDirectoryGovernmentFilterGetDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = UtilityDirectoryGovernmentFilterGetDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<UtilityDirectoryGovernmentFilterGetDto>(<any>null);
    }
    
    getAllDialogSpaceFilters(): Observable<UtilityDialogSpaceFilterGetDto> {
        let url_ = this.baseUrl + "/api/services/app/Utility/GetAllDialogSpaceFilters";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAllDialogSpaceFilters(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllDialogSpaceFilters(<any>response_);
                } catch (e) {
                    return <Observable<UtilityDialogSpaceFilterGetDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<UtilityDialogSpaceFilterGetDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllDialogSpaceFilters(response: HttpResponseBase): Observable<UtilityDialogSpaceFilterGetDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = UtilityDialogSpaceFilterGetDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<UtilityDialogSpaceFilterGetDto>(<any>null);
    }
    
    getAllDirectoryGoverments(
        name: string | undefined,
        shortName: string | undefined,
        departmentId: number | undefined,
        provinceId: number | undefined,
        districtId: number | undefined,
        sectorId: number | undefined,
        skippedDirectoryGovernmentsIds: number[],
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultDtoOfDirectoryGovernmentListDto> {
        let url_ = this.baseUrl + "/api/services/app/Utility/GetAllDirectoryGoverments?";
        url_ = url_.replace(/[?&]$/, "");

        const body: any = JSON.stringify({
            name: name,
            shortName: shortName,
            sectorId: sectorId != -1 ? sectorId: undefined,
            departmentId: departmentId != -1 ? departmentId : undefined,
            provinceId: provinceId != -1 ? provinceId : undefined,
            districtId: districtId != -1 ? districtId : undefined,
            skippedDirectoryGovernmentsIds: skippedDirectoryGovernmentsIds,
            sorting: sorting,
            maxResultCount,
            skipCount
        });

        let options_: any = {
            body: body,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain",
                "Content-Type": "application/json-patch+json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAllDirectoryGoverments(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllDirectoryGoverments(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfDirectoryGovernmentListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfDirectoryGovernmentListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllDirectoryGoverments(response: HttpResponseBase): Observable<PagedResultDtoOfDirectoryGovernmentListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfDirectoryGovernmentListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfDirectoryGovernmentListDto>(<any>null);
    }

    getAllConflictList(
        code: string | undefined,
        caseName: string | undefined,
        site: ConflictSite | undefined,
        lastCondition: ConflictSite | undefined,
        departmentId: number | undefined,
        provinceId: number | undefined,
        districtId: number | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultDtoOfConflictListDto> {
        let url_ = this.baseUrl + "/api/services/app/Utility/GetAllConflictList?";
        if (code !== undefined)
            url_ += "Code=" + encodeURIComponent("" + code) + "&";
        if (caseName !== undefined)
            url_ += "CaseName=" + encodeURIComponent("" + caseName) + "&";
        if (site !== undefined)
            url_ += "Site=" + encodeURIComponent("" + site) + "&";
        if (lastCondition !== undefined)
            url_ += "LastCondition=" + encodeURIComponent("" + lastCondition) + "&";
        if (departmentId !== undefined && departmentId != -1)
            url_ += "DepartmentId=" + encodeURIComponent("" + departmentId) + "&";
        if (provinceId !== undefined && provinceId != -1)
            url_ += "ProvinceId=" + encodeURIComponent("" + provinceId) + "&";
        if (districtId !== undefined && districtId != -1)
            url_ += "DistrictId=" + encodeURIComponent("" + districtId) + "&";
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
            return this.processGetAllConflictList(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllConflictList(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfConflictListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfConflictListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllConflictList(response: HttpResponseBase): Observable<PagedResultDtoOfConflictListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfConflictListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfConflictListDto>(<any>null);
    }

    getAllInterventionPlans(
        code: string | undefined,
        caseName: string | undefined,
        territorialUnitId: number | undefined,
        departmentId: number | undefined,
        provinceId: number | undefined,
        districtId: number | undefined,
        personId: number | undefined,
        site: ConflictSite,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultDtoOfInterventionPlanListDto> {
        let url_ = this.baseUrl + "/api/services/app/Utility/GetAllInterventionPlans?";

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
        if (personId !== undefined && personId !== null && personId !== 0 && personId !== -1)
            url_ += "PersonId=" + encodeURIComponent("" + personId) + "&";
        if (site !== undefined)
            url_ += "Site=" + encodeURIComponent("" + site) + "&";
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
            return this.processGetAllInterventionPlans(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllInterventionPlans(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfInterventionPlanListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfInterventionPlanListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllInterventionPlans(response: HttpResponseBase): Observable<PagedResultDtoOfInterventionPlanListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfInterventionPlanListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfInterventionPlanListDto>(<any>null);
    }

    getAllQuizFilters(): Observable<UtilityQuizFilterGetDto> {
        let url_ = this.baseUrl + "/api/services/app/Utility/GetAllQuizFilters";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAllQuizFilters(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllQuizFilters(<any>response_);
                } catch (e) {
                    return <Observable<UtilityQuizFilterGetDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<UtilityQuizFilterGetDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllQuizFilters(response: HttpResponseBase): Observable<UtilityQuizFilterGetDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = UtilityQuizFilterGetDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<UtilityQuizFilterGetDto>(<any>null);
    }

    getAllDirectoryIndustries(
        filter: string | undefined,
        address: string | undefined,
        departmentId: number | undefined,
        provinceId: number | undefined,
        districtId: number | undefined,
        sectorId: number | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultDtoOfirectoryIndustryListDto> {
        let url_ = this.baseUrl + "/api/services/app/Utility/GetAllDirectoryIndustries?";
        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (address !== undefined)
            url_ += "Address=" + encodeURIComponent("" + address) + "&";
        if (sectorId !== undefined && sectorId != -1)
            url_ += "SectorId=" + encodeURIComponent("" + sectorId) + "&";
        if (departmentId !== undefined && departmentId != -1)
            url_ += "DepartmentId=" + encodeURIComponent("" + departmentId) + "&";
        if (provinceId !== undefined && provinceId != -1)
            url_ += "ProvinceId=" + encodeURIComponent("" + provinceId) + "&";
        if (districtId !== undefined && districtId != -1)
            url_ += "DistrictId=" + encodeURIComponent("" + districtId) + "&";
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
            return this.processGetAllDirectoryIndustries(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllDirectoryIndustries(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfirectoryIndustryListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfirectoryIndustryListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllDirectoryIndustries(response: HttpResponseBase): Observable<PagedResultDtoOfirectoryIndustryListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfirectoryIndustryListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfirectoryIndustryListDto>(<any>null);
    }
}

export interface IPagedResultUtilityTerritorialUnitDto {
    totalCount: number;
    items: UtilityTerritorialUnitDto[] | undefined;
}

export class PagedResultUtilityTerritorialUnitDto implements IPagedResultUtilityTerritorialUnitDto {
    totalCount!: number;
    items!: UtilityTerritorialUnitDto[] | undefined;

    constructor(data?: IPagedResultUtilityTerritorialUnitDto) {
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
                    this.items!.push(UtilityTerritorialUnitDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultUtilityTerritorialUnitDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultUtilityTerritorialUnitDto();
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

export interface IUtilityTerritorialUnitDto {
    id: number;
    name: string;
}

export class UtilityTerritorialUnitDto implements IUtilityTerritorialUnitDto {
    id: number;
    name: string;

    constructor(data?: IUtilityTerritorialUnitDto) {
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

    static fromJS(data: any): UtilityTerritorialUnitDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityTerritorialUnitDto();
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

export interface IAttachmentUploadDto {
    name: string;
    fileName: string;
    token: string;
    file: File;
    size: string;
    creationTime: moment.Moment;
    creatorUserName: string;
    extension: string;
    className: string;
    recordResourceType: AttachmentResourceTypeDto;
    description?: string;
}

export class AttachmentUploadDto implements IAttachmentUploadDto {
    name: string;
    fileName: string;
    token: string;
    size: string;
    file: File;
    creationTime: moment.Moment;
    creatorUserName: string;
    extension: string;
    className: string;
    recordResourceType: AttachmentResourceTypeDto;
    description?: string;
    constructor(data?: IAttachmentUploadDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.fileName = _data["fileName"];
            this.name = _data["name"];
            this.size = _data["size"];
            this.extension = _data["extension"];
            this.className = _data["className"];
            this.token = _data["token"];
            this.recordResourceType = _data["recordResourceType"] ? AttachmentResourceTypeDto.fromJS(_data["recordResourceType"]) : <any>undefined;
            this.description = _data["description"];
        }
    }

    static fromJS(data: any): AttachmentUploadDto {
        data = typeof data === 'object' ? data : {};
        let result = new AttachmentUploadDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["fileName"] = this.fileName;
        data["name"] = this.name;
        data["size"] = this.size;
        data["extension"] = this.extension;
        data["className"] = this.className;
        data["token"] = this.token;
        data["recordResourceType"] = this.recordResourceType ? this.recordResourceType.toJSON() : <any>undefined;
        data["description"] = this.description;
        return data;
    }
}

export interface IAttachmentResourceTypeDto {
    id: number;
    name: string;
}

export class AttachmentResourceTypeDto implements IAttachmentResourceTypeDto {
    id: number;
    name: string;

    constructor(data?: IAttachmentResourceTypeDto) {
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

    static fromJS(data: any): AttachmentResourceTypeDto {
        data = typeof data === 'object' ? data : {};
        let result = new AttachmentResourceTypeDto();
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

export interface IPagedResultUtilitySocialConflictUnitDto {
    totalCount: number;
    items: UtilitySocialConflictDto[] | undefined;
}

export class PagedResultUtilitySocialConflictUnitDto implements IPagedResultUtilitySocialConflictUnitDto {
    totalCount!: number;
    items!: UtilitySocialConflictDto[] | undefined;

    constructor(data?: IPagedResultUtilitySocialConflictUnitDto) {
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
                    this.items!.push(UtilitySocialConflictDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultUtilitySocialConflictUnitDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultUtilitySocialConflictUnitDto();
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

export interface IUtilitySocialConflictDto {
    id: number;
    code: string;
    caseName: string;
    dialog: string;
    territorialUnits: string;
    lastCondition: ConditionType;
    creationTime: moment.Moment;
    typology: UtilityTypologyDto;
    locations: UtilitySocialConflictLocationDataDto[];
    womanCompromise: boolean;
    selected: boolean;
}

export class UtilitySocialConflictDto implements IUtilitySocialConflictDto {
    id: number;
    code: string;
    caseName: string;
    dialog: string;
    territorialUnits: string;
    lastCondition: ConditionType;
    creationTime: moment.Moment;
    typology: UtilityTypologyDto;
    locations: UtilitySocialConflictLocationDataDto[];
    womanCompromise: boolean;
    selected: boolean;
    //readonly
    regionsText: string[];
    constructor(data?: IUtilitySocialConflictDto) {
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
            this.lastCondition = data["lastCondition"];
            this.typology = data["typology"] ? UtilityTypologyDto.fromJS(data["typology"]) : <any>undefined;
            this.creationTime = data["creationTime"] ? moment(data["creationTime"].toString()) : <any>undefined;
            this.womanCompromise = data["womanCompromise"];
            this.selected = data["selected"];
            if (Array.isArray(data["locations"])) {
                this.locations = [] as any;
                for (let item of data["locations"])
                    this.locations!.push(UtilitySocialConflictLocationDataDto.fromJS(item));
            }
            if (Array.isArray(data["locations"])) {
                this.locations = [] as any;
                this.regionsText = [];
                for (let item of data["locations"]) {
                    this.locations!.push(UtilitySocialConflictLocationDataDto.fromJS(item));
                }
                let index: number = 0;
                for (let item of this.locations) {
                    if (item.department && item.province && item.district) {
                        this.regionsText.push(`${item.department.name} - ${item.province.name} - ${item.district.name}`);
                        index++;
                    }
                }
            }
        }
    }

    static fromJS(data: any): UtilitySocialConflictDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilitySocialConflictDto();
        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["code"] = this.code;
        data["caseName"] = this.caseName;
        data["dialog"] = this.dialog;
        data["womanCompromise"] = this.womanCompromise;
        data["selected"] = this.selected;
        if (Array.isArray(this.locations)) {
            data["locations"] = [];
            for (let item of this.locations)
                data["locations"].push(item.toJSON());
        }

        return data;
    }
}

export interface IPagedResultUtilityRecordDto {
    totalCount: number;
    items: UtilityRecordDto[] | undefined;
}

export class PagedResultUtilityRecordDto implements IPagedResultUtilityRecordDto {
    totalCount!: number;
    items!: UtilityRecordDto[] | undefined;

    constructor(data?: IPagedResultUtilityRecordDto) {
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
                    this.items!.push(UtilityRecordDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultUtilityRecordDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultUtilityRecordDto();
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

export interface IUtilityRecordDto {
    id: number;
    code: string;
    title: string;
    recordTime: moment.Moment;
    territorialUnits: string;
    socialConflict: UtilitySocialConflictDto;
}

export class UtilityRecordDto implements IUtilityRecordDto {
    id: number;
    code: string;
    title: string;
    recordTime: moment.Moment;
    territorialUnits: string;
    socialConflict: UtilitySocialConflictDto;

    constructor(data?: IUtilityRecordDto) {
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
            this.title = data["title"];
            this.recordTime = data["recordTime"] ? moment(data["recordTime"].toString()) : <any>undefined;
            this.territorialUnits = data["territorialUnits"];
            this.socialConflict = data["socialConflict"] ? UtilitySocialConflictDto.fromJS(data["socialConflict"]) : <any>undefined;
        }
    }

    static fromJS(data: any): UtilityRecordDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityRecordDto();
        result.init(data);

        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;

        return data;
    }
}

export interface IPagedResultDtoOfSocialConflictLocationListDto {
    totalCount: number;
    items: UtilitySocialConflictLocationDto[] | undefined;
}

export class PagedResultDtoOfSocialConflictLocationListDto implements IPagedResultDtoOfSocialConflictLocationListDto {
    totalCount!: number;
    items!: UtilitySocialConflictLocationDto[] | undefined;

    constructor(data?: IPagedResultDtoOfSocialConflictLocationListDto) {
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
                    this.items!.push(UtilitySocialConflictLocationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfSocialConflictLocationListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfSocialConflictLocationListDto();
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

export interface IUtilitySocialConflictLocationDto {
    id: number;
    department: UtilityDepartmentDto;
    province: UtilityProvinceDto;
    district: UtilityDistrictDto;
}

export class UtilitySocialConflictLocationDto implements IUtilitySocialConflictLocationDto {
    id: number;
    department: UtilityDepartmentDto;
    province: UtilityProvinceDto;
    district: UtilityDistrictDto;

    constructor(data?: IUtilitySocialConflictLocationDto) {
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
            this.department = data["department"] ? UtilityDepartmentDto.fromJS(data["department"]) : <any>undefined;
            this.province = data["province"] ? UtilityProvinceDto.fromJS(data["province"]) : <any>undefined;
            this.district = data["district"] ? UtilityDistrictDto.fromJS(data["district"]) : <any>undefined;
        }
    }

    static fromJS(data: any): UtilitySocialConflictLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilitySocialConflictLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["id"] = this.id;

        return data;
    }
}

export interface IUtilityDepartmentDto {
    id: number;
    name: string;
}

export class UtilityDepartmentDto implements IUtilityDepartmentDto {
    id: number;
    name: string;

    constructor(data?: IUtilityDepartmentDto) {
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

    static fromJS(data: any): UtilityDepartmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityDepartmentDto();
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

export interface IUtilityProvinceDto {
    id: number;
    name: string;
}

export class UtilityProvinceDto implements IUtilityProvinceDto {
    id: number;
    name: string;

    constructor(data?: IUtilityProvinceDto) {
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

    static fromJS(data: any): UtilityProvinceDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityProvinceDto();
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

export interface IUtilityDistrictDto {
    id: number;
    name: string;
}

export class UtilityDistrictDto implements IUtilityDistrictDto {
    id: number;
    name: string;

    constructor(data?: IUtilityDistrictDto) {
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

    static fromJS(data: any): UtilityDistrictDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityDistrictDto();
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

export interface IUtilityParameterDto {
    id: number;
    order: number;
    parentId: number;
    value: string;
}

export class UtilityParameterDto implements IUtilityParameterDto {
    id: number;
    order: number;
    parentId: number;
    value: string;

    constructor(data?: IUtilityParameterDto) {
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
            this.order = data["order"];
            this.value = data["value"];
            this.parentId = data["parentId"];
        }
    }

    static fromJS(data: any): UtilityParameterDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityParameterDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;

        return data;
    }
}

export interface IUtilityResponsibleActorDto {
    id: number;
    name: string;
    type: ResponsibleActorType;
    responsibleSubActors: UtilityResponsibleSubActorDto[];
    remove: boolean;
}

export class UtilityResponsibleActorDto implements IUtilityResponsibleActorDto {
    id: number;
    name: string;
    responsibleSubActors: UtilityResponsibleSubActorDto[];
    type: ResponsibleActorType;
    remove: boolean;

    constructor(data?: IUtilityResponsibleActorDto) {
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
            this.type = data["type"];
            this.remove = data["remove"];

            if (Array.isArray(data["responsibleSubActors"])) {
                this.responsibleSubActors = [] as any;
                for (let item of data["responsibleSubActors"])
                    this.responsibleSubActors!.push(UtilityResponsibleSubActorDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): UtilityResponsibleActorDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityResponsibleActorDto();
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

export interface IUtilityResponsibleSubActorDto {
    id: number;
    name: string;
}

export class UtilityResponsibleSubActorDto implements IUtilityResponsibleSubActorDto {
    id: number;
    name: string;

    constructor(data?: IUtilityResponsibleSubActorDto) {
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

    static fromJS(data: any): UtilityResponsibleSubActorDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityResponsibleSubActorDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;

        return data;
    }
}

export interface IUtilityDialogSpaceFilterGetDto {
    territorialUnits: UtilityTerritorialUnitDto[];
    departments: UtilityDepartmentDataDto[];
    dialogSpaceTypes: UtilityDialogSpaceTypeDto[];
}

export class UtilityDialogSpaceFilterGetDto implements IUtilityDialogSpaceFilterGetDto {
    territorialUnits: UtilityTerritorialUnitDto[];
    departments: UtilityDepartmentDataDto[];
    dialogSpaceTypes: UtilityDialogSpaceTypeDto[];

    constructor(data?: IUtilityDialogSpaceFilterGetDto) {
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
                    this.territorialUnits!.push(UtilityTerritorialUnitDto.fromJS(item));
            }

            if (Array.isArray(data["departments"])) {
                this.departments = [] as any;
                for (let item of data["departments"])
                    this.departments!.push(UtilityDepartmentDataDto.fromJS(item));
            }

            if (Array.isArray(data["dialogSpaceTypes"])) {
                this.dialogSpaceTypes = [] as any;
                for (let item of data["dialogSpaceTypes"])
                    this.dialogSpaceTypes!.push(UtilityDialogSpaceTypeDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): UtilityDialogSpaceFilterGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityDialogSpaceFilterGetDto();
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

        if (Array.isArray(this.dialogSpaceTypes)) {
            data["dialogSpaceTypes"] = [];
            for (let item of this.dialogSpaceTypes)
                data["dialogSpaceTypes"].push(item.toJSON());
        }

        return data;
    }
}

export interface IUtilityGetDataDto {
    territorialUnits: UtilityTerritorialUnitDto[];
    departments: UtilityDepartmentDataDto[];
    socialConflicts: UtilitySocialConflictDto[];
}

export class UtilityGetDataDto implements IUtilityGetDataDto {
    territorialUnits: UtilityTerritorialUnitDto[];
    departments: UtilityDepartmentDataDto[];
    socialConflicts: UtilitySocialConflictDto[];

    constructor(data?: IUtilityGetDataDto) {
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
                    this.territorialUnits!.push(UtilityTerritorialUnitDto.fromJS(item));
            }

            if (Array.isArray(data["departments"])) {
                this.departments = [] as any;
                for (let item of data["departments"])
                    this.departments!.push(UtilityDepartmentDataDto.fromJS(item));
            }

            if (Array.isArray(data["socialConflicts"])) {
                this.socialConflicts = [] as any;
                for (let item of data["socialConflicts"])
                    this.socialConflicts!.push(UtilitySocialConflictDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): UtilityGetDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityGetDataDto();
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

        return data;
    }
}

export interface IUtilityDepartmentDataDto {
    id: number;
    name: string;
    provinces: UtilityProvinceDataDto[];
    territorialUnitIds: EntityDto[];
}

export class UtilityDepartmentDataDto implements IUtilityDepartmentDataDto {
    id: number;
    name: string;
    provinces: UtilityProvinceDataDto[];
    territorialUnitIds: EntityDto[];

    constructor(data?: IUtilityDepartmentDataDto) {
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
                    this.provinces!.push(UtilityProvinceDataDto.fromJS(item));
            }
            if (Array.isArray(data["territorialUnitIds"])) {
                this.territorialUnitIds = [] as any;
                for (let item of data["territorialUnitIds"])
                    this.territorialUnitIds!.push(EntityDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): UtilityDepartmentDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityDepartmentDataDto();
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

export interface IUtilityProvinceDataDto {
    id: number;
    name: string;
    districts: UtilityDistrictDataDto[];
}

export class UtilityProvinceDataDto implements IUtilityProvinceDataDto {
    id: number;
    name: string;
    districts: UtilityDistrictDataDto[];

    constructor(data?: IUtilityProvinceDataDto) {
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
                    this.districts!.push(UtilityDistrictDataDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): UtilityProvinceDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityProvinceDataDto();
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

export interface IUtilityDistrictDataDto {
    id: number;
    name: string;
}

export class UtilityDistrictDataDto implements IUtilityDistrictDataDto {
    id: number;
    name: string;

    constructor(data?: IUtilityDistrictDataDto) {
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

    static fromJS(data: any): UtilityDistrictDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityDistrictDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;

        return data;
    }
}

export interface IUtilitySocialConflictLocationDataDto {
    territorialUnit: UtilityTerritorialUnitDto;
    department: UtilityDepartmentDto;
    province: UtilityProvinceDto;
    district: UtilityDistrictDto;
}

export class UtilitySocialConflictLocationDataDto implements IUtilitySocialConflictLocationDataDto {
    territorialUnit: UtilityTerritorialUnitDto;
    department: UtilityDepartmentDto;
    province: UtilityProvinceDto;
    district: UtilityDistrictDto;

    constructor(data?: IUtilitySocialConflictLocationDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.territorialUnit = data["territorialUnit"] ? UtilityTerritorialUnitDto.fromJS(data["territorialUnit"]) : <any>undefined;
            this.department = data["department"] ? UtilityDepartmentDto.fromJS(data["department"]) : <any>undefined;
            this.province = data["province"] ? UtilityProvinceDto.fromJS(data["province"]) : <any>undefined;
            this.district = data["territorialUnit"] ? UtilityDistrictDto.fromJS(data["district"]) : <any>undefined;
        }
    }

    static fromJS(data: any): UtilitySocialConflictLocationDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilitySocialConflictLocationDataDto();
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

export interface IPagedResultDtoOfRegionListDto {
    totalCount: number;
    items: UtilityRegionDto[] | undefined;
}

export class PagedResultDtoOfRegionListDto implements IPagedResultDtoOfRegionListDto {
    totalCount!: number;
    items!: UtilityRegionDto[] | undefined;

    constructor(data?: IPagedResultDtoOfRegionListDto) {
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
                    this.items!.push(UtilityRegionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfRegionListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfRegionListDto();
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

export interface IUtilityRegionDto {
    id: number;
    name: string;
}

export class UtilityRegionDto implements IUtilityRegionDto {
    id: number;
    name: string;

    constructor(data?: IUtilityRegionDto) {
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

    static fromJS(data: any): UtilityRegionDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityRegionDto();
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

export interface IPagedResultDtoOfPersonListDto {
    totalCount: number;
    items: UtilityPersonDto[] | undefined;
}

export class PagedResultDtoOfPersonListDto implements IPagedResultDtoOfPersonListDto {
    totalCount!: number;
    items!: UtilityPersonDto[] | undefined;

    constructor(data?: IPagedResultDtoOfPersonListDto) {
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
                    this.items!.push(UtilityPersonDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfPersonListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfPersonListDto();
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

export interface IUtilityPersonDto {
    id: number;
    name: string;
    enabled: boolean;
    type: PersonType;
    user: UtilityPersonUserDto;
}

export class UtilityPersonDto implements IUtilityPersonDto {
    id: number;
    name: string;
    enabled: boolean;
    type: PersonType;
    user: UtilityPersonUserDto;

    constructor(data?: IUtilityPersonDto) {
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
            this.enabled = data["enabled"];
            this.type = data["type"];
            this.user = data["user"] ? UtilityPersonUserDto.fromJS(data["user"]) : <any>undefined;
        }
    }

    static fromJS(data: any): UtilityPersonDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityPersonDto();
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

export interface IUtilityPersonUserDto {
    id: number;
    name: string;
    surname: string;
    emailAddress: string;
}

export class UtilityPersonUserDto implements IUtilityPersonUserDto {
    id: number;
    name: string;
    surname: string;
    emailAddress: string;

    constructor(data?: IUtilityPersonUserDto) {
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

    static fromJS(data: any): UtilityPersonUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityPersonUserDto();
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

export interface IUtilitySocialConflictAlertReportFilterGetDto {
    departments: UtilityDepartmentDataDto[];
    persons: UtilityPersonDto[];
    responsibles: UtilitySocialConflictAlertResponsibleDto[];
    territorialUnits: UtilityTerritorialUnitDto[];
    typologies: UtilityTypologyDto[];
    risks: UtilityAlertRiskDto[];
    seals: UtilitySealDto[];
}

export class UtilitySocialConflictAlertReportFilterGetDto implements IUtilitySocialConflictAlertReportFilterGetDto {
    departments: UtilityDepartmentDataDto[];
    persons: UtilityPersonDto[];
    responsibles: UtilitySocialConflictAlertResponsibleDto[];
    territorialUnits: UtilityTerritorialUnitDto[];
    typologies: UtilityTypologyDto[];
    risks: UtilityAlertRiskDto[];
    seals: UtilitySealDto[];

    constructor(data?: IUtilitySocialConflictAlertReportFilterGetDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["departments"])) {
                this.departments = [] as any;
                for (let item of _data["departments"])
                    this.departments!.push(UtilityDepartmentDataDto.fromJS(item));
            }
            if (Array.isArray(_data["persons"])) {
                this.persons = [] as any;
                for (let item of _data["persons"])
                    this.persons!.push(UtilityPersonDto.fromJS(item));
            }
            if (Array.isArray(_data["responsibles"])) {
                this.responsibles = [] as any;
                for (let item of _data["responsibles"])
                    this.responsibles!.push(UtilitySocialConflictAlertResponsibleDto.fromJS(item));
            }
            if (Array.isArray(_data["territorialUnits"])) {
                this.territorialUnits = [] as any;
                for (let item of _data["territorialUnits"])
                    this.territorialUnits!.push(UtilityTerritorialUnitDto.fromJS(item));
            }
            if (Array.isArray(_data["typologies"])) {
                this.typologies = [] as any;
                for (let item of _data["typologies"])
                    this.typologies!.push(UtilityTypologyDto.fromJS(item));
            }
            if (Array.isArray(_data["risks"])) {
                this.risks = [] as any;
                for (let item of _data["risks"])
                    this.risks!.push(UtilityAlertRiskDto.fromJS(item));
            }
            if (Array.isArray(_data["seals"])) {
                this.seals = [] as any;
                for (let item of _data["seals"])
                    this.seals!.push(UtilitySealDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): UtilitySocialConflictAlertReportFilterGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilitySocialConflictAlertReportFilterGetDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        if (Array.isArray(this.departments)) {
            data["departments"] = [];
            for (let item of this.departments)
                data["departments"].push(item.toJSON());
        }
        if (Array.isArray(this.persons)) {
            data["persons"] = [];
            for (let item of this.persons)
                data["persons"].push(item.toJSON());
        }
        if (Array.isArray(this.responsibles)) {
            data["responsibles"] = [];
            for (let item of this.responsibles)
                data["responsibles"].push(item.toJSON());
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
        if (Array.isArray(this.risks)) {
            data["risks"] = [];
            for (let item of this.risks)
                data["risks"].push(item.toJSON());
        }
        if (Array.isArray(this.seals)) {
            data["seals"] = [];
            for (let item of this.seals)
                data["seals"].push(item.toJSON());
        }
        return data;
    }
}

export interface IUtilitySectorMeetReportFilterGetDto {
    departments: UtilityDepartmentDataDto[];
    persons: UtilityPersonDto[];
}

export class UtilitySectorMeetReportFilterGetDto implements IUtilitySectorMeetReportFilterGetDto {
    departments: UtilityDepartmentDataDto[];
    persons: UtilityPersonDto[];

    constructor(data?: IUtilitySectorMeetReportFilterGetDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["departments"])) {
                this.departments = [] as any;
                for (let item of _data["departments"])
                    this.departments!.push(UtilityDepartmentDataDto.fromJS(item));
            }
            if (Array.isArray(_data["persons"])) {
                this.persons = [] as any;
                for (let item of _data["persons"])
                    this.persons!.push(UtilityPersonDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): UtilitySectorMeetReportFilterGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilitySectorMeetReportFilterGetDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        if (Array.isArray(this.departments)) {
            data["departments"] = [];
            for (let item of this.departments)
                data["departments"].push(item.toJSON());
        }
        if (Array.isArray(this.persons)) {
            data["persons"] = [];
            for (let item of this.persons)
                data["persons"].push(item.toJSON());
        }

        return data;
    }
}

export interface IPagedResultDtoOfDeparmentListDto {
    totalCount: number;
    items: UtilityDepartmentDataDto[] | undefined;
}

export class PagedResultDtoOfDeparmentListDto implements IPagedResultDtoOfDeparmentListDto {
    totalCount: number;
    items: UtilityDepartmentDataDto[] | undefined;

    constructor(data?: IPagedResultDtoOfDeparmentListDto) {
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
                    this.items!.push(UtilityDepartmentDataDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfDeparmentListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfDeparmentListDto();
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

export interface IUtilitySocialConflictReportFilterGetDto {
    departments: UtilityDepartmentDataDto[];
    persons: UtilityPersonDto[];
    territorialUnits: UtilityTerritorialUnitDto[];
    typologies: UtilityTypologyDto[];
}

export class UtilitySocialConflictReportFilterGetDto implements IUtilitySocialConflictReportFilterGetDto {
    departments: UtilityDepartmentDataDto[];
    persons: UtilityPersonDto[];
    territorialUnits: UtilityTerritorialUnitDto[];
    typologies: UtilityTypologyDto[];

    constructor(data?: IUtilitySocialConflictReportFilterGetDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["departments"])) {
                this.departments = [] as any;
                for (let item of _data["departments"])
                    this.departments!.push(UtilityDepartmentDataDto.fromJS(item));
            }
            if (Array.isArray(_data["persons"])) {
                this.persons = [] as any;
                for (let item of _data["persons"])
                    this.persons!.push(UtilityPersonDto.fromJS(item));
            }
            if (Array.isArray(_data["territorialUnits"])) {
                this.territorialUnits = [] as any;
                for (let item of _data["territorialUnits"])
                    this.territorialUnits!.push(UtilityTerritorialUnitDto.fromJS(item));
            }
            if (Array.isArray(_data["typologies"])) {
                this.typologies = [] as any;
                for (let item of _data["typologies"])
                    this.typologies!.push(UtilityTypologyDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): UtilitySocialConflictReportFilterGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilitySocialConflictReportFilterGetDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        if (Array.isArray(this.departments)) {
            data["departments"] = [];
            for (let item of this.departments)
                data["departments"].push(item.toJSON());
        }
        if (Array.isArray(this.persons)) {
            data["persons"] = [];
            for (let item of this.persons)
                data["persons"].push(item.toJSON());
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

export interface IUtilitySocialConflictAlertResponsibleDto {
    id: number;
    name: string;
}

export class UtilitySocialConflictAlertResponsibleDto implements IUtilitySocialConflictAlertResponsibleDto {
    id: number;
    name: string;

    constructor(data?: IUtilitySocialConflictAlertResponsibleDto) {
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

    static fromJS(data: any): UtilitySocialConflictAlertResponsibleDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilitySocialConflictAlertResponsibleDto();
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

export interface IUtilityTypologyDto {
    id: number;
    name: string;
}

export class UtilityTypologyDto implements IUtilityTypologyDto {
    id: number;
    name: string;

    constructor(data?: IUtilityTypologyDto) {
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

    static fromJS(data: any): UtilityTypologyDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityTypologyDto();
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

export interface IUtilityAlertRiskDto {
    id: number;
    name: string;
    color: string;
}

export class UtilityAlertRiskDto implements IUtilityAlertRiskDto {
    id: number;
    name: string;
    color: string;

    constructor(data?: IUtilityAlertRiskDto) {
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

    static fromJS(data: any): UtilityAlertRiskDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityAlertRiskDto();
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

export interface IUtilitySealDto {
    id: number;
    name: string;
}

export class UtilitySealDto implements IUtilitySealDto {
    id: number;
    name: string;

    constructor(data?: IUtilitySealDto) {
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

    static fromJS(data: any): UtilitySealDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilitySealDto();
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

export interface IUtilityDirectoryGovernmentFilterGetDto {
    departments: UtilityDepartmentDataDto[];
    sectors: UtilityDirectoryGovernmentSectorDto[];
}

export class UtilityDirectoryGovernmentFilterGetDto implements IUtilityDirectoryGovernmentFilterGetDto {
    departments: UtilityDepartmentDataDto[];
    sectors: UtilityDirectoryGovernmentSectorDto[];

    constructor(data?: IUtilityDirectoryGovernmentFilterGetDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["departments"])) {
                this.departments = [] as any;
                for (let item of _data["departments"])
                    this.departments!.push(UtilityDepartmentDataDto.fromJS(item));
            }
            if (Array.isArray(_data["sectors"])) {
                this.sectors = [] as any;
                for (let item of _data["sectors"])
                    this.sectors!.push(UtilityDirectoryGovernmentSectorDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): UtilityDirectoryGovernmentFilterGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityDirectoryGovernmentFilterGetDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        if (Array.isArray(this.departments)) {
            data["departments"] = [];
            for (let item of this.departments)
                data["departments"].push(item.toJSON());
        }
        if (Array.isArray(this.sectors)) {
            data["sectors"] = [];
            for (let item of this.sectors)
                data["sectors"].push(item.toJSON());
        }
        return data;
    }
}

export interface IPagedResultDtoOfDirectoryGovernmentListDto {
    totalCount: number;
    items: UtilityDirectoryGovernmentDto[] | undefined;
}

export class PagedResultDtoOfDirectoryGovernmentListDto implements IPagedResultDtoOfDirectoryGovernmentListDto {
    totalCount!: number;
    items!: UtilityDirectoryGovernmentDto[] | undefined;

    constructor(data?: IPagedResultDtoOfDirectoryGovernmentListDto) {
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
                    this.items!.push(UtilityDirectoryGovernmentDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfDirectoryGovernmentListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfDirectoryGovernmentListDto();
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

export interface IUtilityDirectoryGovernmentDto {
    id: number;
    name: string;
    shortName: string;
    address: string;
    phoneNumber: string;
    url: string;
    additionalInformation: string;
    enabled: boolean;
    district: UtilityDistrictRelationDto;
    directoryGovernmentSector: UtilityDirectoryGovernmentSectorDto;
}

export class UtilityDirectoryGovernmentDto implements IUtilityDirectoryGovernmentDto {
    id: number;
    name: string;
    shortName: string;
    address: string;
    phoneNumber: string;
    url: string;
    additionalInformation: string;
    enabled: boolean;
    district: UtilityDistrictRelationDto;
    directoryGovernmentSector: UtilityDirectoryGovernmentSectorDto;

    constructor(data?: IUtilityDirectoryGovernmentDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.district = new UtilityDistrictRelationDto({
                id: -1,
                name: undefined,
                province: undefined
            });
            this.directoryGovernmentSector = new UtilityDirectoryGovernmentSectorDto(({
                id: -1,
                name: undefined
            }));
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.name = data["name"];
            this.shortName = data["shortName"];
            this.address = data["address"];
            this.phoneNumber = data["phoneNumber"];
            this.url = data["url"];
            this.additionalInformation = data["additionalInformation"];
            this.enabled = data["enabled"];
            this.district = data["district"] ? UtilityDistrictRelationDto.fromJS(data["district"]) : new UtilityDistrictRelationDto({
                id: -1,
                name: undefined,
                province: undefined
            });
            this.directoryGovernmentSector = data["directoryGovernmentSector"] ? UtilityDirectoryGovernmentSectorDto.fromJS(data["directoryGovernmentSector"]) : new UtilityDirectoryGovernmentSectorDto({
                id: -1,
                name: undefined
            });
        }
    }

    static fromJS(data: any): UtilityDirectoryGovernmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityDirectoryGovernmentDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["id"] = this.id;
        data["name"] = this.name;
        data["shortName"] = this.shortName;
        data["address"] = this.address;
        data["phoneNumber"] = this.phoneNumber;
        data["url"] = this.url;
        data["additionalInformation"] = this.additionalInformation;
        data["enabled"] = this.enabled;
        data["district"] = this.district ? this.district.toJSON() : <any>undefined;
        data["directoryGovernmentSector"] = this.directoryGovernmentSector ? this.directoryGovernmentSector.toJSON() : <any>undefined;

        return data;
    }
}

export interface IUtilityDirectoryGovernmentSectorDto {
    id: number;
    name: string;
}

export class UtilityDirectoryGovernmentSectorDto implements IUtilityDirectoryGovernmentSectorDto {
    id: number;
    name: string;

    constructor(data?: IUtilityDirectoryGovernmentSectorDto) {
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

    static fromJS(data: any): UtilityDirectoryGovernmentSectorDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityDirectoryGovernmentSectorDto();
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

export interface IUtilityDistrictRelationDto {
    id: number;
    name: string;
    province: UtilityProvinceRelationDto;
}

export class UtilityDistrictRelationDto implements IUtilityDistrictRelationDto {
    id: number;
    name: string;
    province: UtilityProvinceRelationDto;

    constructor(data?: IUtilityDistrictRelationDto) {
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
            this.province = data["province"] ? UtilityProvinceRelationDto.fromJS(data["province"]) : <any>undefined;
        }
    }

    static fromJS(data: any): UtilityDistrictRelationDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityDistrictRelationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["province"] = this.province ? this.province.toJSON() : <any>undefined;

        return data;
    }
}

export interface IUtilityProvinceRelationDto {
    id: number;
    name: string;
    department: UtilityDepartmentRelationDto;
}

export class UtilityProvinceRelationDto implements IUtilityProvinceRelationDto {
    id: number;
    name: string;
    department: UtilityDepartmentRelationDto;

    constructor(data?: IUtilityProvinceRelationDto) {
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
            this.department = data["department"] ? UtilityDepartmentRelationDto.fromJS(data["department"]) : <any>undefined;
        }
    }

    static fromJS(data: any): UtilityProvinceRelationDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityProvinceRelationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["department"] = this.department ? this.department.toJSON() : <any>undefined;

        return data;
    }
}

export interface IUtilityDepartmentRelationDto {
    id: number;
    name: string;
}

export class UtilityDepartmentRelationDto implements IUtilityDepartmentRelationDto {
    id: number;
    name: string;

    constructor(data?: IUtilityDepartmentRelationDto) {
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

    static fromJS(data: any): UtilityDepartmentRelationDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityDepartmentRelationDto();
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

export interface IPagedResultDtoOfConflictListDto {
    totalCount: number;
    items: UtilityConflictListGetAllDto[] | undefined;
}

export class PagedResultDtoOfConflictListDto implements IPagedResultDtoOfConflictListDto {
    totalCount!: number;
    items!: UtilityConflictListGetAllDto[] | undefined;

    constructor(data?: IPagedResultDtoOfConflictListDto) {
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
                    this.items!.push(UtilityConflictListGetAllDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfConflictListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfConflictListDto();
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

export interface IUtilityConflictListGetAllDto {
    id: number;
    code: string;
    name: string;
    territorialUnits: string;
    site: ConflictSite;
    lastCondition: ConditionType;
}

export class UtilityConflictListGetAllDto implements IUtilityConflictListGetAllDto {
    id: number;
    code: string;
    name: string;
    territorialUnits: string;
    site: ConflictSite;
    lastCondition: ConditionType;

    constructor(data?: IUtilityConflictListGetAllDto) {
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
            this.name = data["name"];
            this.territorialUnits = data["territorialUnits"];
            this.site = data["site"];
            this.lastCondition = data["lastCondition"];
        }
    }

    static fromJS(data: any): UtilityConflictListGetAllDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityConflictListGetAllDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["id"] = this.id;
        data["code"] = this.code;
        data["name"] = this.name;
        data["territorialUnits"] = this.territorialUnits;
        data["site"] = this.site;
        data["lastCondition"] = this.lastCondition;

        return data;
    }
}

export interface IUtilityInterventionPlanReportFilterGetDto {
    departments: UtilityDepartmentDataDto[];
    persons: UtilityPersonDto[];
    territorialUnits: UtilityTerritorialUnitDto[];
}

export class UtilityInterventionPlanReportFilterGetDto implements IUtilityInterventionPlanReportFilterGetDto {
    departments: UtilityDepartmentDataDto[];
    persons: UtilityPersonDto[];
    territorialUnits: UtilityTerritorialUnitDto[];

    constructor(data?: IUtilityInterventionPlanReportFilterGetDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["departments"])) {
                this.departments = [] as any;
                for (let item of _data["departments"])
                    this.departments!.push(UtilityDepartmentDataDto.fromJS(item));
            }
            if (Array.isArray(_data["persons"])) {
                this.persons = [] as any;
                for (let item of _data["persons"])
                    this.persons!.push(UtilityPersonDto.fromJS(item));
            }
            if (Array.isArray(_data["territorialUnits"])) {
                this.territorialUnits = [] as any;
                for (let item of _data["territorialUnits"])
                    this.territorialUnits!.push(UtilityTerritorialUnitDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): UtilityInterventionPlanReportFilterGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityInterventionPlanReportFilterGetDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        if (Array.isArray(this.departments)) {
            data["departments"] = [];
            for (let item of this.departments)
                data["departments"].push(item.toJSON());
        }
        if (Array.isArray(this.persons)) {
            data["persons"] = [];
            for (let item of this.persons)
                data["persons"].push(item.toJSON());
        }
        if (Array.isArray(this.territorialUnits)) {
            data["territorialUnits"] = [];
            for (let item of this.territorialUnits)
                data["territorialUnits"].push(item.toJSON());
        }

        return data;
    }
}

export interface IPagedResultDtoOfInterventionPlanListDto {
    totalCount: number;
    items: UtilityInterventionPlanGetAllDto[] | undefined;
}

export class PagedResultDtoOfInterventionPlanListDto implements IPagedResultDtoOfInterventionPlanListDto {
    totalCount!: number;
    items!: UtilityInterventionPlanGetAllDto[] | undefined;

    constructor(data?: IPagedResultDtoOfInterventionPlanListDto) {
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
                    this.items!.push(UtilityInterventionPlanGetAllDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfInterventionPlanListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfInterventionPlanListDto();
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

export interface IUtilityInterventionPlanGetAllDto {
    id: number;
    code: string;
    caseName: string;
    interventionPlanTime: moment.Moment;
    locations: string;
    territorialUnits: string;
    conflictCode: string;
    conflictCaseName: string;
    site: ConflictSite;
}

export class UtilityInterventionPlanGetAllDto implements IUtilityInterventionPlanGetAllDto {
    id: number;
    code: string;
    caseName: string;
    interventionPlanTime: moment.Moment;
    locations: string;
    territorialUnits: string;
    conflictCode: string;
    conflictCaseName: string;
    site: ConflictSite;

    constructor(data?: IUtilityInterventionPlanGetAllDto) {
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
            this.interventionPlanTime = data["interventionPlanTime"] ? moment(data["interventionPlanTime"]) : <any>undefined;
            this.locations = data["locations"];
            this.territorialUnits = data["territorialUnits"];
            this.conflictCode = data["conflictCode"];
            this.conflictCaseName = data["conflictCaseName"];
            this.site = data["site"];
        }
    }

    static fromJS(data: any): UtilityInterventionPlanGetAllDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityInterventionPlanGetAllDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["code"] = this.code;
        data["caseName"] = this.caseName;
        data["interventionPlanTime"] = this.interventionPlanTime ? this.interventionPlanTime.toISOString() : <any>undefined;
        data["locations"] = this.locations;
        data["territorialUnits"] = this.territorialUnits;
        data["conflictCode"] = this.conflictCode;
        data["conflictCaseName"] = this.conflictCaseName;
        data["site"] = this.site;

        return data;
    }
}

export interface IUtilityQuizFilterGetDto {
    quizStates: UtilityQuizStateDto[];
}

export class UtilityQuizFilterGetDto implements IUtilityQuizFilterGetDto {
    quizStates: UtilityQuizStateDto[];

    constructor(data?: IUtilityQuizFilterGetDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["quizStates"])) {
                this.quizStates = [] as any;
                for (let item of _data["quizStates"])
                    this.quizStates!.push(UtilityQuizStateDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): UtilityQuizFilterGetDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityQuizFilterGetDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.quizStates)) {
            data["quizStates"] = [];
            for (let item of this.quizStates)
                data["quizStates"].push(item.toJSON());
        }
        return data;
    }
}

export interface IUtilityQuizStateDto {
    id: number;
    name: string;
}

export class UtilityQuizStateDto implements IUtilityQuizStateDto {
    id: number;
    name: string;

    constructor(data?: IUtilityQuizStateDto) {
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

    static fromJS(data: any): UtilityQuizStateDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityQuizStateDto();
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

export interface IPagedResultDtoOfirectoryIndustryListDto {
    totalCount: number;
    items: UtilityDirectoryIndustryDto[] | undefined;
}

export class PagedResultDtoOfirectoryIndustryListDto implements IPagedResultDtoOfirectoryIndustryListDto {
    totalCount!: number;
    items!: UtilityDirectoryIndustryDto[] | undefined;

    constructor(data?: IPagedResultDtoOfirectoryIndustryListDto) {
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
                    this.items!.push(UtilityDirectoryIndustryDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfirectoryIndustryListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfirectoryIndustryListDto();
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

export interface IUtilityDirectoryIndustryDto {
    id: number;
    name: string;
    phoneNumber: string;
    emailAddress: string;
    url: string;
    address: string;
    additionalInformation: string;
    enabled: boolean;
    district: UtilityDistrictRelationDto;
    directorySector: UtilityDirectoryIndustrySectorDto;
}

export class UtilityDirectoryIndustryDto implements IUtilityDirectoryIndustryDto {
    id: number;
    name: string;
    phoneNumber: string;
    emailAddress: string;
    url: string;
    address: string;
    additionalInformation: string;
    enabled: boolean;
    district: UtilityDistrictRelationDto;
    directorySector: UtilityDirectoryIndustrySectorDto;

    constructor(data?: IUtilityDirectoryIndustryDto) {
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
            this.phoneNumber = data["phoneNumber"];
            this.emailAddress = data["emailAddress"];
            this.url = data["url"];
            this.address = data["address"];
            this.additionalInformation = data["additionalInformation"];
            this.enabled = data["enabled"];
            this.district = data["district"] ? UtilityDistrictRelationDto.fromJS(data["district"]) : <any>undefined;
            this.directorySector = data["directorySector"] ? UtilityDirectoryIndustrySectorDto.fromJS(data["directorySector"]) : <any>undefined;
        }
    }

    static fromJS(data: any): UtilityDirectoryIndustryDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityDirectoryIndustryDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["id"] = this.id;
        data["name"] = this.name;
        data["phoneNumber"] = this.phoneNumber;
        data["emailAddress"] = this.emailAddress;
        data["url"] = this.url;
        data["address"] = this.address;
        data["additionalInformation"] = this.additionalInformation;
        data["enabled"] = this.enabled;
        data["district"] = this.district ? this.district.toJSON() : <any>undefined;
        data["directorySector"] = this.directorySector ? this.directorySector.toJSON() : <any>undefined;

        return data;
    }
}

export interface IUtilityDirectoryIndustrySectorDto {
    id: number;
    name: string;
}

export class UtilityDirectoryIndustrySectorDto implements IUtilityDirectoryIndustrySectorDto {
    id: number;
    name: string;

    constructor(data?: IUtilityDirectoryIndustrySectorDto) {
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

    static fromJS(data: any): UtilityDirectoryIndustrySectorDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityDirectoryIndustrySectorDto();
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

export interface IUtilityDialogSpaceTypeDto {
    id: number;
    name: string;
}

export class UtilityDialogSpaceTypeDto implements IUtilityDialogSpaceTypeDto {
    id: number;
    name: string;

    constructor(data?: IUtilityDialogSpaceTypeDto) {
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

    static fromJS(data: any): UtilityDialogSpaceTypeDto {
        data = typeof data === 'object' ? data : {};
        let result = new UtilityDialogSpaceTypeDto();
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

export class Audit {
    creatorUser: string;
    creationTime: moment.Moment;
    editUser?: string;
    lastModificationTime?: moment.Moment;
}

export enum ConflictSite {
    All,
    SocialConflict,
    SocialConflictAlert,
    SocialConflictSensible
}

export enum ConflictVerificationState {
    Denied,
    Process,
    Accepted
}

export enum ConditionType {
    None,
    Open,
    Closed
}

export enum InterventionPlanEntityType {
    None,
    Sector,
    Responsible,
    Other
}