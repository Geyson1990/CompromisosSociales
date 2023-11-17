import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete, EntityDto, PersonType, FileDto } from '../service-proxies';
import * as moment from 'moment';
import { CompromiseType } from './compromise-proxie';
import { AttachmentUploadDto, ConflictVerificationState } from './utility-proxie';

@Injectable()
export class SocialConflictSensibleServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(filter: string | undefined, verification: ConflictVerificationState, code: string | undefined, territorialUnit: number | undefined, startDate: moment.Moment | undefined, endDate: moment.Moment | undefined, filterByDate: boolean | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfSocialConflictSensibleListDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictSensible/GetAll?";
        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (verification !== undefined && verification !== null)
            url_ += "Verification=" + encodeURIComponent("" + verification) + "&";
        if (code !== undefined)
            url_ += "Code=" + encodeURIComponent("" + code) + "&";
        if (territorialUnit !== undefined)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnit) + "&";
        if (sorting !== undefined)
            url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
        if (filterByDate !== undefined)
            url_ += "FilterByDate=" + encodeURIComponent("" + filterByDate) + "&";
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
                    return <Observable<PagedResultDtoOfSocialConflictSensibleListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfSocialConflictSensibleListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfSocialConflictSensibleListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfSocialConflictSensibleListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfSocialConflictSensibleListDto>(<any>null);
    }

    getMatrizToExcel(filter: string | undefined, verification: ConflictVerificationState, code: string | undefined, territorialUnit: number | undefined, startDate: moment.Moment | undefined, endDate: moment.Moment | undefined, filterByDate: boolean | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<FileDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictSensible/GetMatrizToExcel?";
        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (verification !== undefined && verification !== null)
            url_ += "Verification=" + encodeURIComponent("" + verification) + "&";
        if (code !== undefined)
            url_ += "Code=" + encodeURIComponent("" + code) + "&";
        if (territorialUnit !== undefined)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnit) + "&";
        if (sorting !== undefined)
            url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
        if (filterByDate !== undefined)
            url_ += "FilterByDate=" + encodeURIComponent("" + filterByDate) + "&";
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

    getManagementToExcel(filter: string | undefined, verification: ConflictVerificationState, code: string | undefined, territorialUnit: number | undefined, startDate: moment.Moment | undefined, endDate: moment.Moment | undefined, filterByDate: boolean | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<FileDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictSensible/GetManagementToExcel?";
        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (verification !== undefined && verification !== null)
            url_ += "Verification=" + encodeURIComponent("" + verification) + "&";
        if (code !== undefined)
            url_ += "Code=" + encodeURIComponent("" + code) + "&";
        if (territorialUnit !== undefined)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnit) + "&";
        if (sorting !== undefined)
            url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
        if (filterByDate !== undefined)
            url_ += "FilterByDate=" + encodeURIComponent("" + filterByDate) + "&";
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
    
    getStateToExcel(filter: string | undefined, verification: ConflictVerificationState, code: string | undefined, territorialUnit: number | undefined, startDate: moment.Moment | undefined, endDate: moment.Moment | undefined, filterByDate: boolean | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<FileDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictSensible/GetStateToExcel?";
        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (verification !== undefined && verification !== null)
            url_ += "Verification=" + encodeURIComponent("" + verification) + "&";
        if (code !== undefined)
            url_ += "Code=" + encodeURIComponent("" + code) + "&";
        if (territorialUnit !== undefined)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnit) + "&";
        if (sorting !== undefined)
            url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
        if (filterByDate !== undefined)
            url_ += "FilterByDate=" + encodeURIComponent("" + filterByDate) + "&";
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

    getAllActors(filter: string | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfSocialConflictSensibleActorListDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictSensible/GetAllActors?";
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
            return this.processGetAllActors(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllActors(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfSocialConflictSensibleActorListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfSocialConflictSensibleActorListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllActors(response: HttpResponseBase): Observable<PagedResultDtoOfSocialConflictSensibleActorListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfSocialConflictSensibleActorListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfSocialConflictSensibleActorListDto>(<any>null);
    }

    getAllCompromises(filter: string | undefined, socialConflictSensibleId: number | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfSocialConflictSensibleCompromiseListDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictSensible/GetAllCompromises?";
        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (socialConflictSensibleId !== undefined)
            url_ += "SocialConflictSensibleId=" + encodeURIComponent("" + socialConflictSensibleId) + "&";
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
            return this.processGetAllCompromises(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllCompromises(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfSocialConflictSensibleCompromiseListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfSocialConflictSensibleCompromiseListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllCompromises(response: HttpResponseBase): Observable<PagedResultDtoOfSocialConflictSensibleCompromiseListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfSocialConflictSensibleCompromiseListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfSocialConflictSensibleCompromiseListDto>(<any>null);
    }

    get(id: number): Observable<SocialConflictSensibleGetDataDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictSensible/Get?";
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
                    return <Observable<SocialConflictSensibleGetDataDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<SocialConflictSensibleGetDataDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<SocialConflictSensibleGetDataDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = SocialConflictSensibleGetDataDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SocialConflictSensibleGetDataDto>(<any>null);
    }

    create(item: SocialConflictSensibleDto): Observable<EntityDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictSensible/Create";

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

    update(item: SocialConflictSensibleDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflictSensible/Update";

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
        let url_ = this.baseUrl + "/api/services/app/SocialConflictSensible/Delete?";
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

export interface IPagedResultDtoOfSocialConflictSensibleTerritorialUnitsListDto {
    totalCount: number;
    items: SocialConflictSensibleTerritorialUnitDto[] | undefined;
}

export class PagedResultDtoOfSocialConflictSensibleTerritorialUnitsListDto implements IPagedResultDtoOfSocialConflictSensibleTerritorialUnitsListDto {
    totalCount!: number;
    items!: SocialConflictSensibleTerritorialUnitDto[] | undefined;

    constructor(data?: IPagedResultDtoOfSocialConflictSensibleTerritorialUnitsListDto) {
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
                    this.items!.push(SocialConflictSensibleTerritorialUnitDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfSocialConflictSensibleTerritorialUnitsListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfSocialConflictSensibleTerritorialUnitsListDto();
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

export interface IPagedResultDtoOfSocialConflictSensibleListDto {
    totalCount: number;
    items: SocialConflictSensibleDto[] | undefined;
}

export class PagedResultDtoOfSocialConflictSensibleListDto implements IPagedResultDtoOfSocialConflictSensibleListDto {
    totalCount!: number;
    items!: SocialConflictSensibleDto[] | undefined;

    constructor(data?: IPagedResultDtoOfSocialConflictSensibleListDto) {
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
                    this.items!.push(SocialConflictSensibleDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfSocialConflictSensibleListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfSocialConflictSensibleListDto();
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

export interface IPagedResultDtoOfSocialConflictSensibleCompromiseListDto {
    totalCount: number;
    items: SocialConflictSensibleCompromiseDto[] | undefined;
}

export class PagedResultDtoOfSocialConflictSensibleCompromiseListDto implements IPagedResultDtoOfSocialConflictSensibleCompromiseListDto {
    totalCount!: number;
    items!: SocialConflictSensibleCompromiseDto[] | undefined;

    constructor(data?: IPagedResultDtoOfSocialConflictSensibleCompromiseListDto) {
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
                    this.items!.push(SocialConflictSensibleCompromiseDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfSocialConflictSensibleCompromiseListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfSocialConflictSensibleCompromiseListDto();
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

export interface IPagedResultDtoOfSocialConflictSensibleActorListDto {
    totalCount: number;
    items: SocialConflictSensibleActorGetAllDto[] | undefined;
}

export class PagedResultDtoOfSocialConflictSensibleActorListDto implements IPagedResultDtoOfSocialConflictSensibleActorListDto {
    totalCount!: number;
    items!: SocialConflictSensibleActorGetAllDto[] | undefined;

    constructor(data?: IPagedResultDtoOfSocialConflictSensibleActorListDto) {
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
                    this.items!.push(SocialConflictSensibleActorGetAllDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfSocialConflictSensibleActorListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfSocialConflictSensibleActorListDto();
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

export interface ISocialConflictSensibleDto {
    id: number;
    generation: boolean;
    count: number;
    year: number;
    code: string;
    caseName: string;
    territorialUnits: string;
    creatorUser: SocialConflictSensibleUserDto;
    editUser: SocialConflictSensibleUserDto;
    creationTime: moment.Moment;
    lastModificationTime: moment.Moment;
    problem: string;
    geographicType: GeographycType;
    caseNameVerification: boolean;
    problemVerification: boolean;
    riskVerification: boolean;
    managementVerification: boolean;
    stateVerification: boolean;
    conditionVerification: boolean;
    latitude: number;
    longitude: number;
    published: number;
    verification: ConflictVerificationState;
    manager: SocialConflictSensiblePersonDto;
    coordinator: SocialConflictSensiblePersonDto;
    analyst: SocialConflictSensiblePersonDto;
    typology: SocialConflictSensibleTypologyDto;
    locations: SocialConflictSensibleLocationDto[];
    actors: SocialConflictSensibleActorLocationDto[];
    generalFacts: SocialConflictSensibleGeneralFactDto[];
    sugerences: SocialConflictSensibleSugerenceDto[];
    managements: SocialConflictSensibleManagementLocationDto[];
    states: SocialConflictSensibleStateLocationDto[];
    risks: SocialConflictSensibleRiskLocationDto[];
    conditions: SocialConflictSensibleConditionDto[];
    resources: SocialConflictSensibleResourceDto[];
}

export class SocialConflictSensibleDto implements ISocialConflictSensibleDto {
    id: number;
    generation: boolean;
    count: number;
    year: number;
    code: string;
    caseName: string;
    territorialUnits: string;
    creatorUser: SocialConflictSensibleUserDto;
    editUser: SocialConflictSensibleUserDto;
    creationTime: moment.Moment;
    lastModificationTime: moment.Moment;
    problem: string;
    geographicType: GeographycType;
    caseNameVerification: boolean;
    problemVerification: boolean;
    riskVerification: boolean;
    managementVerification: boolean;
    stateVerification: boolean;
    conditionVerification: boolean;
    latitude: number;
    longitude: number;
    published: number;
    verification: ConflictVerificationState;
    manager: SocialConflictSensiblePersonDto;
    coordinator: SocialConflictSensiblePersonDto;
    analyst: SocialConflictSensiblePersonDto;
    typology: SocialConflictSensibleTypologyDto;
    locations: SocialConflictSensibleLocationDto[];
    actors: SocialConflictSensibleActorLocationDto[];
    generalFacts: SocialConflictSensibleGeneralFactDto[];
    sugerences: SocialConflictSensibleSugerenceDto[];
    pendingSugerences: SocialConflictSensibleSugerenceDto[];
    acceptedSugerences: SocialConflictSensibleSugerenceDto[];
    managements: SocialConflictSensibleManagementLocationDto[];
    states: SocialConflictSensibleStateLocationDto[];
    risks: SocialConflictSensibleRiskLocationDto[];
    conditions: SocialConflictSensibleConditionDto[];
    resources: SocialConflictSensibleResourceDto[];
    notes: SocialConflictSensibleNoteLocationDto[];

    //paginates
    lastCondition: SocialConflictSensibleConditionDto;
    
    //verification
    caseNameVerificationState: string;
    problemVerificationState: string;

    caseNameVerificationChange: boolean;
    problemVerificationChange: boolean;

    //replacement
    replaceCode: boolean;
    replaceYear: number;
    replaceCount: number;

    constructor(data?: ISocialConflictSensibleDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.locations = [];
            this.actors = [];
            this.generalFacts = [];
            this.managements = [];
            this.states = [];
            this.sugerences = [];
            this.risks = [];
            this.conditions = [];
            this.pendingSugerences = [];
            this.acceptedSugerences = [];
            this.resources = [];
            this.notes = [];
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
            this.creatorUser = data["creatorUser"] ? SocialConflictSensibleUserDto.fromJS(data["creatorUser"]) : <any>undefined;
            this.editUser = data["editUser"] ? SocialConflictSensibleUserDto.fromJS(data["editUser"]) : <any>undefined;
            this.territorialUnits = data["territorialUnits"];
            this.problem = data["problem"];
            this.geographicType = data["geographicType"] ? data["geographicType"] : GeographycType.None;
            this.caseNameVerification = data["caseNameVerification"];
            this.problemVerification = data["problemVerification"];
            this.riskVerification = data["riskVerification"];
            this.managementVerification = data["managementVerification"];
            this.stateVerification = data["stateVerification"];
            this.conditionVerification = data["conditionVerification"];
            this.verification = data["verification"];
            this.manager = data["manager"] ? SocialConflictSensiblePersonDto.fromJS(data["manager"]) : new SocialConflictSensiblePersonDto({ id: -1, name: undefined, type: PersonType.None });
            this.coordinator = data["coordinator"] ? SocialConflictSensiblePersonDto.fromJS(data["coordinator"]) : new SocialConflictSensiblePersonDto({ id: -1, name: undefined, type: PersonType.None });
            this.analyst = data["analyst"] ? SocialConflictSensiblePersonDto.fromJS(data["analyst"]) : new SocialConflictSensiblePersonDto({ id: -1, name: undefined, type: PersonType.None });
            this.typology = data["typology"] ? SocialConflictSensibleTypologyDto.fromJS(data["typology"]) : new SocialConflictSensibleTypologyDto({ id: -1, name: undefined });

            this.caseNameVerificationState = data["caseNameVerificationState"];
            this.problemVerificationState = data["problemVerificationState"];

            this.latitude = data["latitude"];
            this.longitude = data["longitude"];
            this.published = data["published"];

            if (Array.isArray(data["locations"])) {
                this.locations = [] as any;
                for (let item of data["locations"])
                    this.locations!.push(SocialConflictSensibleLocationDto.fromJS(item));
            }
            if (Array.isArray(data["actors"])) {
                this.actors = [] as any;
                for (let item of data["actors"])
                    this.actors!.push(SocialConflictSensibleActorLocationDto.fromJS(item));
            }
            if (Array.isArray(data["generalFacts"])) {
                this.generalFacts = [] as any;
                for (let item of data["generalFacts"])
                    this.generalFacts!.push(SocialConflictSensibleGeneralFactDto.fromJS(item));
            }
            if (Array.isArray(data["sugerences"])) {
                this.sugerences = [] as any;
                for (let item of data["sugerences"]) {
                    this.sugerences!.push(SocialConflictSensibleSugerenceDto.fromJS(item));
                    if (item.accepted) {
                        this.acceptedSugerences!.push(SocialConflictSensibleSugerenceDto.fromJS(item));
                    } else {
                        this.pendingSugerences!.push(SocialConflictSensibleSugerenceDto.fromJS(item));
                    }
                }

            }
            if (Array.isArray(data["managements"])) {
                this.managements = [] as any;
                for (let item of data["managements"])
                    this.managements!.push(SocialConflictSensibleManagementLocationDto.fromJS(item));
            }
            if (Array.isArray(data["states"])) {
                this.states = [] as any;
                for (let item of data["states"])
                    this.states!.push(SocialConflictSensibleStateLocationDto.fromJS(item));
            }
            if (Array.isArray(data["risks"])) {
                this.risks = [] as any;
                for (let item of data["risks"])
                    this.risks!.push(SocialConflictSensibleRiskLocationDto.fromJS(item));
            }
            if (Array.isArray(data["conditions"])) {
                this.conditions = [] as any;
                for (let item of data["conditions"])
                    this.conditions!.push(SocialConflictSensibleConditionDto.fromJS(item));
            }
            if (Array.isArray(data["resources"])) {
                this.resources = [] as any;
                for (let item of data["resources"])
                    this.resources!.push(SocialConflictSensibleResourceDto.fromJS(item));
            }
            if (Array.isArray(data["notes"])) {
                this.notes = [] as any;
                for (let item of data["notes"])
                    this.notes!.push(SocialConflictSensibleNoteLocationDto.fromJS(item));
            }            
        }
    }

    static fromJS(data: any): SocialConflictSensibleDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["id"] = this.id;
        data["code"] = this.code;
        data["caseName"] = this.caseName;
        data["problem"] = this.problem;
        data["geographicType"] = this.geographicType;
        data["manager"] = this.manager ? this.manager.toJSON() : <any>undefined;
        data["coordinator"] = this.coordinator ? this.coordinator.toJSON() : <any>undefined;
        data["analyst"] = this.analyst ? this.analyst.toJSON() : <any>undefined;
        data["typology"] = this.typology ? this.typology.toJSON() : <any>undefined;
        data["sugerences"] = [];

        data["caseNameVerificationState"] = this.caseNameVerificationState;
        data["problemVerificationState"] = this.problemVerificationState;

        data["caseNameVerificationChange"] = this.caseNameVerificationChange;
        data["problemVerificationChange"] = this.problemVerificationChange;

        data["replaceCode"] = this.replaceCode;
        data["replaceYear"] = this.replaceYear;
        data["replaceCount"] = this.replaceCount;

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
        if (Array.isArray(this.generalFacts)) {
            data["generalFacts"] = [];
            for (let item of this.generalFacts)
                data["generalFacts"].push(item.toJSON());
        }
        if (Array.isArray(this.acceptedSugerences)) {
            for (let item of this.acceptedSugerences)
                data["sugerences"].push(item.toJSON());
        }
        if (Array.isArray(this.pendingSugerences)) {
            for (let item of this.pendingSugerences)
                data["sugerences"].push(item.toJSON());
        }
        if (Array.isArray(this.managements)) {
            data["managements"] = [];
            for (let item of this.managements)
                data["managements"].push(item.toJSON());
        }
        if (Array.isArray(this.states)) {
            data["states"] = [];
            for (let item of this.states)
                data["states"].push(item.toJSON());
        }
        if (Array.isArray(this.risks)) {
            data["risks"] = [];
            for (let item of this.risks)
                data["risks"].push(item.toJSON());
        }
        if (Array.isArray(this.conditions)) {
            data["conditions"] = [];
            for (let item of this.conditions)
                data["conditions"].push(item.toJSON());
        }
        if (Array.isArray(this.resources)) {
            data["resources"] = [];
            for (let item of this.resources)
                data["resources"].push(item.toJSON());
        }
        if (Array.isArray(this.notes)) {
            data["notes"] = [];
            for (let item of this.notes)
                data["notes"].push(item.toJSON());
        }

        return data;
    }
}

export interface ISocialConflictSensibleGetDataDto {
    socialConflictSensible: SocialConflictSensibleDto;
    departments: SocialConflictSensibleDepartmentDto[];
    territorialUnits: SocialConflictSensibleTerritorialUnitDto[];
    actorTypes: SocialConflictSensibleActorTypeDto[];
    actorMovements: SocialConflictSensibleActorMovementDto[];
    facts: SocialConflictSensibleFactDto[];
    persons: SocialConflictSensiblePersonDto[];
    risks: SocialConflictSensibleRiskDto[];
    typologies: SocialConflictSensibleTypologyDto[];
    managements: SocialConflictSensibleManagementDto[];
}

export class SocialConflictSensibleGetDataDto implements ISocialConflictSensibleGetDataDto {
    socialConflictSensible: SocialConflictSensibleDto;
    departments: SocialConflictSensibleDepartmentDto[];
    territorialUnits: SocialConflictSensibleTerritorialUnitDto[];
    actorTypes: SocialConflictSensibleActorTypeDto[];
    actorMovements: SocialConflictSensibleActorMovementDto[];
    facts: SocialConflictSensibleFactDto[];
    persons: SocialConflictSensiblePersonDto[];
    risks: SocialConflictSensibleRiskDto[];
    typologies: SocialConflictSensibleTypologyDto[];
    managements: SocialConflictSensibleManagementDto[];

    constructor(data?: ISocialConflictSensibleGetDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.socialConflictSensible = data["socialConflictSensible"] ? SocialConflictSensibleDto.fromJS(data["socialConflictSensible"]) : <any>undefined;
            if (Array.isArray(data["departments"])) {
                this.departments = [] as any;
                for (let item of data["departments"])
                    this.departments!.push(SocialConflictSensibleDepartmentDto.fromJS(item));
            }
            if (Array.isArray(data["territorialUnits"])) {
                this.territorialUnits = [] as any;
                for (let item of data["territorialUnits"])
                    this.territorialUnits!.push(SocialConflictSensibleTerritorialUnitDto.fromJS(item));
            }
            if (Array.isArray(data["actorTypes"])) {
                this.actorTypes = [] as any;
                for (let item of data["actorTypes"])
                    this.actorTypes!.push(SocialConflictSensibleActorTypeDto.fromJS(item));
            }
            if (Array.isArray(data["actorMovements"])) {
                this.actorMovements = [] as any;
                for (let item of data["actorMovements"])
                    this.actorMovements!.push(SocialConflictSensibleActorMovementDto.fromJS(item));
            }
            if (Array.isArray(data["facts"])) {
                this.facts = [] as any;
                for (let item of data["facts"])
                    this.facts!.push(SocialConflictSensibleFactDto.fromJS(item));
            }
            if (Array.isArray(data["persons"])) {
                this.persons = [] as any;
                for (let item of data["persons"])
                    this.persons!.push(SocialConflictSensiblePersonDto.fromJS(item));
            }
            if (Array.isArray(data["risks"])) {
                this.risks = [] as any;
                for (let item of data["risks"])
                    this.risks!.push(SocialConflictSensibleRiskDto.fromJS(item));
            }
            if (Array.isArray(data["typologies"])) {
                this.typologies = [] as any;
                for (let item of data["typologies"])
                    this.typologies!.push(SocialConflictSensibleTypologyDto.fromJS(item));
            }
            if (Array.isArray(data["managements"])) {
                this.managements = [] as any;
                for (let item of data["managements"])
                    this.managements!.push(SocialConflictSensibleManagementDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SocialConflictSensibleGetDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleGetDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["socialConflictSensible"] = this.socialConflictSensible ? this.socialConflictSensible.toJSON() : <any>undefined;
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
        if (Array.isArray(this.facts)) {
            data["facts"] = [];
            for (let item of this.facts)
                data["facts"].push(item.toJSON());
        }
        if (Array.isArray(this.persons)) {
            data["persons"] = [];
            for (let item of this.persons)
                data["persons"].push(item.toJSON());
        }
        if (Array.isArray(this.risks)) {
            data["risks"] = [];
            for (let item of this.risks)
                data["risks"].push(item.toJSON());
        }
        if (Array.isArray(this.typologies)) {
            data["typologies"] = [];
            for (let item of this.typologies)
                data["typologies"].push(item.toJSON());
        }
        if (Array.isArray(this.managements)) {
            data["managements"] = [];
            for (let item of this.managements)
                data["managements"].push(item.toJSON());
        }
        return data;
    }
}

export interface ISocialConflictSensibleDepartmentDto {
    id: number;
    territorialUnitIds: number[];
    name: string;
    provinces: SocialConflictSensibleProvinceDto[];
}

export class SocialConflictSensibleDepartmentDto implements ISocialConflictSensibleDepartmentDto {
    id: number;
    territorialUnitIds: number[];
    name: string;
    provinces: SocialConflictSensibleProvinceDto[];

    constructor(data?: ISocialConflictSensibleDepartmentDto) {
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
                    this.provinces!.push(SocialConflictSensibleProvinceDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SocialConflictSensibleDepartmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleDepartmentDto();
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

        return data;
    }
}

export interface ISocialConflictSensibleRegionDto {
    id: number;
    name: string;
}

export class SocialConflictSensibleRegionDto implements ISocialConflictSensibleRegionDto {
    id: number;
    name: string;

    constructor(data?: ISocialConflictSensibleRegionDto) {
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

    static fromJS(data: any): SocialConflictSensibleRegionDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleRegionDto();
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

export interface ISocialConflictSensibleProvinceDto {
    id: number;
    name: string;
    districts: SocialConflictSensibleDistrictDto[];
}

export class SocialConflictSensibleProvinceDto implements ISocialConflictSensibleProvinceDto {
    id: number;
    name: string;
    districts: SocialConflictSensibleDistrictDto[];

    constructor(data?: ISocialConflictSensibleProvinceDto) {
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
                    this.districts!.push(SocialConflictSensibleDistrictDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SocialConflictSensibleProvinceDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleProvinceDto();
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

export interface ISocialConflictSensibleDistrictDto {
    id: number;
    name: string;
}

export class SocialConflictSensibleDistrictDto implements ISocialConflictSensibleDistrictDto {
    id: number;
    name: string;

    constructor(data?: ISocialConflictSensibleDistrictDto) {
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

    static fromJS(data: any): SocialConflictSensibleDistrictDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleDistrictDto();
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

export interface ISocialConflictSensibleTerritorialUnitDto {
    id: number;
    name: string;
}

export class SocialConflictSensibleTerritorialUnitDto implements ISocialConflictSensibleTerritorialUnitDto {
    id: number;
    name: string;

    constructor(data?: ISocialConflictSensibleTerritorialUnitDto) {
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

    static fromJS(data: any): SocialConflictSensibleTerritorialUnitDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleTerritorialUnitDto();
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

export interface ISocialConflictSensibleLocationDto {
    id: number;
    department: SocialConflictSensibleDepartmentDto;
    province: SocialConflictSensibleProvinceDto;
    district: SocialConflictSensibleDistrictDto;
    territorialUnit: SocialConflictSensibleTerritorialUnitDto;
    region: SocialConflictSensibleRegionDto;
    ubication: string;
    remove: boolean;
}

export class SocialConflictSensibleLocationDto implements ISocialConflictSensibleLocationDto {
    id: number;
    department: SocialConflictSensibleDepartmentDto;
    province: SocialConflictSensibleProvinceDto;
    district: SocialConflictSensibleDistrictDto;
    territorialUnit: SocialConflictSensibleTerritorialUnitDto;
    region: SocialConflictSensibleRegionDto;
    ubication: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictSensibleLocationDto) {
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
            this.department = data["department"] ? SocialConflictSensibleDepartmentDto.fromJS(data["department"]) : <any>undefined;
            this.province = data["province"] ? SocialConflictSensibleProvinceDto.fromJS(data["province"]) : <any>undefined;
            this.district = data["district"] ? SocialConflictSensibleDistrictDto.fromJS(data["district"]) : <any>undefined;
            this.territorialUnit = data["territorialUnit"] ? SocialConflictSensibleTerritorialUnitDto.fromJS(data["territorialUnit"]) : <any>undefined;
            this.region = data["region"] ? SocialConflictSensibleRegionDto.fromJS(data["region"]) : <any>undefined;
            this.ubication = data["ubication"];
        }
    }

    static fromJS(data: any): SocialConflictSensibleLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleLocationDto();
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

export interface ISocialConflictSensibleActorLocationDto {
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
    actorType: SocialConflictSensibleActorTypeDto;
    actorMovement: SocialConflictSensibleActorMovementDto;
}

export class SocialConflictSensibleActorLocationDto implements ISocialConflictSensibleActorLocationDto {
    id: number;
    actorId: number;
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
    actorType: SocialConflictSensibleActorTypeDto;
    actorMovement: SocialConflictSensibleActorMovementDto;    
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictSensibleActorLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.actorType = new SocialConflictSensibleActorTypeDto({ id: -1, name: undefined, showDetail: false, showMovement: false });
            this.actorMovement = new SocialConflictSensibleActorMovementDto({ id: -1, name: undefined });
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.actorId = data["actorId"];
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
            this.actorType = data["actorType"] ? SocialConflictSensibleActorTypeDto.fromJS(data["actorType"]) : new SocialConflictSensibleActorTypeDto({ id: -1, name: undefined, showDetail: false, showMovement: false });
            this.actorMovement = data["actorMovement"] ? SocialConflictSensibleActorMovementDto.fromJS(data["actorMovement"]) : new SocialConflictSensibleActorMovementDto({ id: -1, name: undefined });
        }
    }

    static fromJS(data: any): SocialConflictSensibleActorLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleActorLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["actorId"] = this.actorId;
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

export interface ISocialConflictSensibleActorGetAllDto {
    id: number;
    conflictId: number;
    code: string;
    caseName: string;
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
    regions: string;
    actorType: SocialConflictSensibleActorTypeDto;
    actorMovement: SocialConflictSensibleActorMovementDto;
}

export class SocialConflictSensibleActorGetAllDto implements ISocialConflictSensibleActorGetAllDto {
    id: number;
    conflictId: number;
    code: string;
    caseName: string;
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
    regions: string;
    actorType: SocialConflictSensibleActorTypeDto;
    actorMovement: SocialConflictSensibleActorMovementDto;

    constructor(data?: ISocialConflictSensibleActorGetAllDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.actorType = new SocialConflictSensibleActorTypeDto({ id: -1, name: undefined, showDetail: false, showMovement: false });
            this.actorMovement = new SocialConflictSensibleActorMovementDto({ id: -1, name: undefined });
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.conflictId = data["conflictId"];
            this.code = data["code"];
            this.caseName = data["caseName"];
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
            this.regions = data["regions"];
            this.actorType = data["actorType"] ? SocialConflictSensibleActorTypeDto.fromJS(data["actorType"]) : new SocialConflictSensibleActorTypeDto({ id: -1, name: undefined, showDetail: false, showMovement: false });
            this.actorMovement = data["actorMovement"] ? SocialConflictSensibleActorMovementDto.fromJS(data["actorMovement"]) : new SocialConflictSensibleActorMovementDto({ id: -1, name: undefined });
        }
    }

    static fromJS(data: any): SocialConflictSensibleActorGetAllDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleActorGetAllDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["conflictId"] = this.conflictId;
        data["code"] = this.code;
        data["caseName"] = this.caseName;
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
        data["regions"] = this.regions;
        data["actorType"] = this.actorType ? this.actorType.toJSON() : <any>undefined;
        data["actorMovement"] = this.actorMovement ? this.actorMovement.toJSON() : <any>undefined;

        return data;
    }
}

export interface ISocialConflictSensibleUserDto {
    id: number;
    name: string;
    surname: string;
}

export class SocialConflictSensibleUserDto implements ISocialConflictSensibleUserDto {
    id: number;
    name: string;
    surname: string;

    constructor(data?: ISocialConflictSensibleUserDto) {
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

    static fromJS(data: any): SocialConflictSensibleUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleUserDto();
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

export interface ISocialConflictSensibleDialogDto {
    id: number;
    name: string;
    remove: boolean;
}

export class SocialConflictSensibleDialogDto implements ISocialConflictSensibleDialogDto {
    id: number;
    name: string;
    remove: boolean;

    constructor(data?: ISocialConflictSensibleDialogDto) {
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

    static fromJS(data: any): SocialConflictSensibleDialogDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleDialogDto();
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

export interface ISocialConflictSensibleActorTypeDto {
    id: number;
    name: string;
    showDetail: boolean;
    showMovement: boolean;
}

export class SocialConflictSensibleActorTypeDto implements ISocialConflictSensibleActorTypeDto {
    id: number;
    name: string;
    showDetail: boolean;
    showMovement: boolean;

    constructor(data?: ISocialConflictSensibleActorTypeDto) {
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

    static fromJS(data: any): SocialConflictSensibleActorTypeDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleActorTypeDto();
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

export interface ISocialConflictSensibleActorMovementDto {
    id: number;
    name: string;
}

export class SocialConflictSensibleActorMovementDto implements ISocialConflictSensibleActorMovementDto {
    id: number;
    name: string;

    constructor(data?: ISocialConflictSensibleActorMovementDto) {
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

    static fromJS(data: any): SocialConflictSensibleActorMovementDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleActorMovementDto();
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

export interface ISocialConflictSensibleFactDto {
    id: number;
    name: string;
}

export class SocialConflictSensibleFactDto implements ISocialConflictSensibleFactDto {
    id: number;
    name: string;

    constructor(data?: ISocialConflictSensibleFactDto) {
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

    static fromJS(data: any): SocialConflictSensibleFactDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleFactDto();
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

export interface ISocialConflictSensiblePersonDto {
    id: number;
    name: string;
    type: PersonType;
}

export class SocialConflictSensiblePersonDto implements ISocialConflictSensiblePersonDto {
    id: number;
    name: string;
    type: PersonType;

    constructor(data?: ISocialConflictSensiblePersonDto) {
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

    static fromJS(data: any): SocialConflictSensiblePersonDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensiblePersonDto();
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

export interface ISocialConflictSensibleRiskDto {
    id: number;
    name: string;
    color: string;
}

export class SocialConflictSensibleRiskDto implements ISocialConflictSensibleRiskDto {
    id: number;
    name: string;
    color: string;

    constructor(data?: ISocialConflictSensibleRiskDto) {
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
            this.color = _data["color"];
        }
    }

    static fromJS(data: any): SocialConflictSensibleRiskDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleRiskDto();
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

export interface ISocialConflictSensibleTypologyDto {
    id: number;
    name: string;
}

export class SocialConflictSensibleTypologyDto implements ISocialConflictSensibleTypologyDto {
    id: number;
    name: string;

    constructor(data?: ISocialConflictSensibleTypologyDto) {
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

    static fromJS(data: any): SocialConflictSensibleTypologyDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleTypologyDto();
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

export interface ISocialConflictSensibleGeneralFactDto {
    id: number;
    creationTime: moment.Moment;
    factTime: moment.Moment;
    description: string;
    remove: boolean;
}

export class SocialConflictSensibleGeneralFactDto implements ISocialConflictSensibleGeneralFactDto {
    id: number;
    creationTime: moment.Moment;
    factTime: moment.Moment;
    description: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictSensibleGeneralFactDto) {
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
            this.creationTime = _data["creationTime"] ? moment(_data["creationTime"]) : <any>undefined;
            this.factTime = _data["factTime"] ? moment(_data["factTime"]) : <any>undefined;
            this.description = _data["description"];
        }
    }

    static fromJS(data: any): SocialConflictSensibleGeneralFactDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleGeneralFactDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["factTime"] = this.factTime ? this.factTime.toISOString() : <any>undefined;
        data["description"] = this.description;
        data["remove"] = this.remove;

        return data;
    }
}

export interface ISocialConflictSensibleSugerenceDto {
    id: number;
    creatorUser: SocialConflictSensibleUserDto;
    creationTime: moment.Moment;
    description: string;
    accepted: boolean;
    acceptTime: moment.Moment;
    acceptedUser: SocialConflictSensibleUserDto;
    remove: boolean;
}

export class SocialConflictSensibleSugerenceDto implements ISocialConflictSensibleSugerenceDto {
    id: number;
    creatorUser: SocialConflictSensibleUserDto;
    creationTime: moment.Moment;
    description: string;
    accepted: boolean;
    acceptTime: moment.Moment;
    acceptedUser: SocialConflictSensibleUserDto;
    remove: boolean;
    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictSensibleSugerenceDto) {
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
            this.creationTime = _data["creationTime"] ? moment(_data["creationTime"]) : <any>undefined;
            this.creatorUser = _data["creatorUser"] ? SocialConflictSensibleUserDto.fromJS(_data["creatorUser"]) : <any>undefined;
            this.description = _data["description"];
            this.accepted = _data["accepted"];
            this.acceptTime = _data["acceptTime"] ? moment(_data["acceptTime"]) : <any>undefined;
            this.acceptedUser = _data["acceptedUser"] ? SocialConflictSensibleUserDto.fromJS(_data["acceptedUser"]) : <any>undefined;
        }
    }

    static fromJS(data: any): SocialConflictSensibleSugerenceDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleSugerenceDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["description"] = this.description;
        data["accepted"] = this.accepted;
        data["remove"] = this.remove;

        return data;
    }
}

export interface ISocialConflictSensibleCompromiseDto {
    id: number;
    creationTime: moment.Moment;
    code: string;
    name: string;
    type: CompromiseType;
    status: SocialConflictSensibleParameterDto;
}

export class SocialConflictSensibleCompromiseDto implements ISocialConflictSensibleCompromiseDto {
    id: number;
    creationTime: moment.Moment;
    code: string;
    name: string;
    type: CompromiseType;
    status: SocialConflictSensibleParameterDto;

    constructor(data?: ISocialConflictSensibleCompromiseDto) {
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
            this.creationTime = _data["creationTime"] ? moment(_data["creationTime"]) : <any>undefined;
            this.code = _data["code"];
            this.name = _data["name"];
            this.type = _data["type"];
            this.status = _data["status"] ? SocialConflictSensibleParameterDto.fromJS(_data["status"]) : <any>undefined;
        }
    }

    static fromJS(data: any): SocialConflictSensibleCompromiseDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleCompromiseDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : <any>undefined;
        data["code"] = this.code;
        data["name"] = this.name;
        data["type"] = this.type;
        data["status"] = this.status ? this.status.toJSON() : <any>undefined;

        return data;
    }
}

export interface ISocialConflictSensibleParameterDto {
    id: number;
    value: string;
}

export class SocialConflictSensibleParameterDto implements ISocialConflictSensibleParameterDto {
    id: number;
    value: string;

    constructor(data?: ISocialConflictSensibleParameterDto) {
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
            this.value = _data["value"];
        }
    }

    static fromJS(data: any): SocialConflictSensibleParameterDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleParameterDto();
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

export interface ISocialConflictSensibleManagementDto {
    id: number;
    name: string;
    showDetail: boolean;
}

export class SocialConflictSensibleManagementDto implements ISocialConflictSensibleManagementDto {
    id: number;
    name: string;
    showDetail: boolean;

    constructor(data?: ISocialConflictSensibleManagementDto) {
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
        }
    }

    static fromJS(data: any): SocialConflictSensibleManagementDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleManagementDto();
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

export interface ISocialConflictSensibleManagementLocationDto {
    id: number;
    description: string;
    managementTime: moment.Moment;
    management: SocialConflictSensibleManagementDto;
    manager: SocialConflictSensiblePersonDto;
    civilMen: number;
    civilWomen: number;
    stateMen: number;
    stateWomen: number;
    companyMen: number;
    companyWomen: number;
    verificationLocation: boolean;
}

export class SocialConflictSensibleManagementLocationDto implements ISocialConflictSensibleManagementLocationDto {
    id: number;
    description: string;
    managementTime: moment.Moment;
    management: SocialConflictSensibleManagementDto;
    manager: SocialConflictSensiblePersonDto;
    civilMen: number;
    civilWomen: number;
    stateMen: number;
    stateWomen: number;
    companyMen: number;
    companyWomen: number;
    resources: SocialConflictSensibleResourceDto[];
    uploadFiles: AttachmentUploadDto[];
    verificationLocation: boolean;
    remove: boolean;

    //verification
    verificationState: string;
    verificationChange: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictSensibleManagementLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.management = new SocialConflictSensibleManagementDto({
                id: -1,
                name: undefined,
                showDetail: false
            });
            this.manager = new SocialConflictSensiblePersonDto({
                id: -1,
                name: undefined,
                type: PersonType.None
            });
            this.resources = [];
            this.uploadFiles = [];
            this.verificationState = 'false';
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.description = _data["description"];
            this.managementTime = _data["managementTime"] ? moment(_data["managementTime"]) : <any>undefined;
            this.management = _data["management"] ? SocialConflictSensibleManagementDto.fromJS(_data["management"]) : new SocialConflictSensibleManagementDto({ id: -1, name: undefined, showDetail: false });
            this.manager = _data["manager"] ? SocialConflictSensiblePersonDto.fromJS(_data["manager"]) : new SocialConflictSensiblePersonDto({ id: -1, name: undefined, type: PersonType.None });
            this.civilMen = _data["civilMen"];
            this.civilWomen = _data["civilWomen"];
            this.stateMen = _data["stateMen"];
            this.stateWomen = _data["stateWomen"];
            this.companyMen = _data["companyMen"];
            this.companyWomen = _data["companyWomen"];
            this.verificationState = _data["verificationState"];
            this.verificationLocation = _data["verificationLocation"];

            if (Array.isArray(_data["resources"])) {
                this.resources = [] as any;
                for (let item of _data["resources"])
                    this.resources!.push(SocialConflictSensibleResourceDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SocialConflictSensibleManagementLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleManagementLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["description"] = this.description;
        data["managementTime"] = this.managementTime ? this.managementTime.toISOString() : <any>undefined;
        data["management"] = this.management ? this.management.toJSON() : <any>undefined;
        data["manager"] = this.manager ? this.manager.toJSON() : <any>undefined;
        data["civilMen"] = this.civilMen;
        data["civilWomen"] = this.civilWomen;
        data["stateMen"] = this.stateMen;
        data["stateWomen"] = this.stateWomen;
        data["companyMen"] = this.companyMen;
        data["companyWomen"] = this.companyWomen;
        data["verificationState"] = this.verificationState;
        data["verificationChange"] = this.verificationChange;
        data["remove"] = this.remove;

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

export interface ISocialConflictSensibleResourceDto {
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

export class SocialConflictSensibleResourceDto implements ISocialConflictSensibleResourceDto {
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

    constructor(data?: ISocialConflictSensibleResourceDto) {
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

    static fromJS(data: any): SocialConflictSensibleResourceDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleResourceDto();
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

export interface ISocialConflictSensibleStateLocationDto {
    id: number;
    state: string;
    description: string;
    creationTime: moment.Moment;
    stateTime: moment.Moment;
    verificationLocation: boolean;
    manager: SocialConflictSensiblePersonDto;
    creatorUser: SocialConflictSensibleUserDto;
}

export class SocialConflictSensibleStateLocationDto implements ISocialConflictSensibleStateLocationDto {
    id: number;
    state: string;
    description: string;
    creationTime: moment.Moment;
    stateTime: moment.Moment;
    verificationLocation: boolean;
    manager: SocialConflictSensiblePersonDto;
    creatorUser: SocialConflictSensibleUserDto;
    remove: boolean;

    //verification
    verificationState: string;
    verificationChange: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictSensibleStateLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.verificationState = 'false';
            this.manager = new SocialConflictSensiblePersonDto({
                id: -1,
                name: undefined,
                type: PersonType.None
            });
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.state = _data["state"];
            this.description = _data["description"];
            this.creationTime = _data["creationTime"] ? moment(_data["creationTime"]) : <any>undefined;
            this.stateTime = _data["stateTime"] ? moment(_data["stateTime"]) : <any>undefined;
            this.verificationLocation = _data["verificationLocation"];
            this.manager = _data["manager"] ? SocialConflictSensiblePersonDto.fromJS(_data["manager"]) : new SocialConflictSensiblePersonDto({ id: -1, name: undefined, type: PersonType.None });
            this.creatorUser = _data["creatorUser"] ? SocialConflictSensibleUserDto.fromJS(_data["creatorUser"]) : <any>undefined;
            this.verificationState = _data["verificationState"];
        }
    }

    static fromJS(data: any): SocialConflictSensibleStateLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleStateLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["state"] = this.state;
        data["description"] = this.description;
        data["stateTime"] = this.stateTime ? this.stateTime.toISOString() : <any>undefined;
        data["manager"] = this.manager ? this.manager.toJSON() : <any>undefined;
        data["verificationState"] = this.verificationState;
        data["verificationChange"] = this.verificationChange;
        data["remove"] = this.remove;

        return data;
    }
}

export interface ISocialConflictSensibleRiskLocationDto {
    id: number;
    riskTime: moment.Moment;
    description: string;
    risk: SocialConflictSensibleRiskDto;
    verificationLocation: boolean;
    remove: boolean;
}

export class SocialConflictSensibleRiskLocationDto implements ISocialConflictSensibleRiskLocationDto {
    id: number;
    riskTime: moment.Moment;
    description: string;
    risk: SocialConflictSensibleRiskDto;
    verificationLocation: boolean;
    remove: boolean;

    //verification
    verificationState: string;
    verificationChange: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictSensibleRiskLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.verificationState = 'false';
            this.risk = new SocialConflictSensibleRiskDto({ id: -1, name: undefined, color: undefined });
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.riskTime = data["riskTime"] ? moment(data["riskTime"]) : <any>undefined;
            this.description = data["description"];
            this.risk = data["risk"] ? SocialConflictSensibleRiskDto.fromJS(data["risk"]) : <any>undefined;
            this.verificationState = data["verificationState"];
            this.verificationLocation = data["verificationLocation"];
        }
    }

    static fromJS(data: any): SocialConflictSensibleRiskLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleRiskLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["description"] = this.description;
        data["riskTime"] = this.riskTime ? this.riskTime.toISOString() : <any>undefined;
        data["risk"] = this.risk ? this.risk.toJSON() : <any>undefined;
        data["verificationState"] = this.verificationState;
        data["verificationChange"] = this.verificationChange;
        data["remove"] = this.remove;

        return data;
    }
}

export interface ISocialConflictSensibleConditionDto {
    id: number;
    conditionTime: moment.Moment;
    description: string;
    type: ConditionType;
    verificationLocation: boolean;
}

export class SocialConflictSensibleConditionDto implements ISocialConflictSensibleConditionDto {
    id: number;
    conditionTime: moment.Moment;
    description: string;
    type: ConditionType;
    verificationLocation: boolean;
    remove: boolean;

    //verification
    verificationState: string;
    verificationChange: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictSensibleConditionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.verificationState = 'false';
            this.type = ConditionType.None;
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.conditionTime = data["conditionTime"] ? moment(data["conditionTime"]) : <any>undefined;
            this.description = data["description"];
            this.type = data["type"];
            this.verificationLocation = data["verificationLocation"];
            this.verificationState = data["verificationState"];
        }
    }

    static fromJS(data: any): SocialConflictSensibleConditionDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleConditionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["description"] = this.description;
        data["conditionTime"] = this.conditionTime ? this.conditionTime.toISOString() : <any>undefined;
        data["type"] = this.type;
        data["verificationState"] = this.verificationState;
        data["verificationChange"] = this.verificationChange;
        data["remove"] = this.remove;

        return data;
    }
}


export interface ISocialConflictSensibleNoteLocationDto {
    id: number;
    description: string;
}

export class SocialConflictSensibleNoteLocationDto implements ISocialConflictSensibleNoteLocationDto {
    id: number;
    description: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictSensibleNoteLocationDto) {
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
        }
    }

    static fromJS(data: any): SocialConflictSensibleNoteLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSensibleNoteLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["description"] = this.description;
        data["remove"] = this.remove;

        return data;
    }
}

export enum GeographycType {
    None,
    Region,
    Location,
    National
}

export enum ConditionType {
    None,
    Open,
    Closed
}

export enum SugerenceType {
    None,
    Pending,
    Accepted
}