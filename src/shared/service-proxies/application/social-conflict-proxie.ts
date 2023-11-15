import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete, EntityDto, PersonType, FileDto } from '../service-proxies';
import * as moment from 'moment';
import { CompromiseType } from './compromise-proxie';
import { AttachmentUploadDto, ConditionType, ConflictVerificationState } from './utility-proxie';

@Injectable()
export class SocialConflictServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(filter: string | undefined, verification: ConflictVerificationState, code: string | undefined, territorialUnit: number | undefined, startDate: moment.Moment | undefined, endDate: moment.Moment | undefined, filterByDate: boolean | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfSocialConflictListDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflict/GetAll?";
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
                    return <Observable<PagedResultDtoOfSocialConflictListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfSocialConflictListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfSocialConflictListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfSocialConflictListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfSocialConflictListDto>(<any>null);
    }

    // getConflictPendings(id: number): Observable<CompromiseGetDataDto> {
    //     let url_ = this.baseUrl + "/api/services/app/Compromise/Get?";
    //     if (id === null)
    //         throw new Error("The parameter 'Id' cannot be null.");
    //     else if (id !== undefined)
    //         url_ += "Id=" + encodeURIComponent("" + id) + "&";
    //     url_ = url_.replace(/[?&]$/, "");


    //     let options_: any = {
    //         observe: "response",
    //         responseType: "blob",
    //         headers: new HttpHeaders({
    //             "Accept": "text/plain"
    //         })
    //     };

    //     return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
    //         return this.processGet(response_);
    //     })).pipe(_observableCatch((response_: any) => {
    //         if (response_ instanceof HttpResponseBase) {
    //             try {
    //                 return this.processGet(<any>response_);
    //             } catch (e) {
    //                 return <Observable<CompromiseGetDataDto>><any>_observableThrow(e);
    //             }
    //         } else
    //             return <Observable<CompromiseGetDataDto>><any>_observableThrow(response_);
    //     }));
    // }

    getMatrizToExcel(filter: string | undefined, verification: ConflictVerificationState, code: string | undefined, territorialUnit: number | undefined, startDate: moment.Moment | undefined, endDate: moment.Moment | undefined, filterByDate: boolean | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<FileDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflict/GetMatrizToExcel?";
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
        let url_ = this.baseUrl + "/api/services/app/SocialConflict/GetManagementToExcel?";
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
        let url_ = this.baseUrl + "/api/services/app/SocialConflict/GetStateToExcel?";
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
    
    getActorMatrizToExcel(nameSurname: string | undefined, document: string | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<FileDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflict/GetActorMatrizToExcel?";
        if (nameSurname !== undefined && nameSurname !== null)
            url_ += "NameSurname=" + encodeURIComponent("" + nameSurname) + "&";
        if (document !== undefined && document !== null)
            url_ += "Document=" + encodeURIComponent("" + document) + "&";
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

    getAllActors(nameSurname: string | undefined, document: string | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfSocialConflictActorListDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflict/GetAllActors?";
        if (nameSurname !== undefined && nameSurname !== null)
            url_ += "NameSurname=" + encodeURIComponent("" + nameSurname) + "&";
        if (document !== undefined && document !== null)
            url_ += "Document=" + encodeURIComponent("" + document) + "&";
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
                    return <Observable<PagedResultDtoOfSocialConflictActorListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfSocialConflictActorListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllActors(response: HttpResponseBase): Observable<PagedResultDtoOfSocialConflictActorListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfSocialConflictActorListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfSocialConflictActorListDto>(<any>null);
    }

    getAllCompromises(filter: string | undefined, socialConflictId: number | undefined, sorting: string | undefined, maxResultCount: number | undefined, skipCount: number | undefined): Observable<PagedResultDtoOfSocialConflictCompromiseListDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflict/GetAllCompromises?";
        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (socialConflictId !== undefined)
            url_ += "SocialConflictId=" + encodeURIComponent("" + socialConflictId) + "&";
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
                    return <Observable<PagedResultDtoOfSocialConflictCompromiseListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfSocialConflictCompromiseListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAllCompromises(response: HttpResponseBase): Observable<PagedResultDtoOfSocialConflictCompromiseListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfSocialConflictCompromiseListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfSocialConflictCompromiseListDto>(<any>null);
    }

    get(id: number): Observable<SocialConflictGetDataDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflict/Get?";
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
                    return <Observable<SocialConflictGetDataDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<SocialConflictGetDataDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<SocialConflictGetDataDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = SocialConflictGetDataDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SocialConflictGetDataDto>(<any>null);
    }

    create(item: SocialConflictDto): Observable<EntityDto> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflict/Create";

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

    update(item: SocialConflictDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/SocialConflict/Update";

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
        let url_ = this.baseUrl + "/api/services/app/SocialConflict/Delete?";
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

export interface IPagedResultDtoOfSocialConflictTerritorialUnitsListDto {
    totalCount: number;
    items: SocialConflictTerritorialUnitDto[] | undefined;
}

export class PagedResultDtoOfSocialConflictTerritorialUnitsListDto implements IPagedResultDtoOfSocialConflictTerritorialUnitsListDto {
    totalCount!: number;
    items!: SocialConflictTerritorialUnitDto[] | undefined;

    constructor(data?: IPagedResultDtoOfSocialConflictTerritorialUnitsListDto) {
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
                    this.items!.push(SocialConflictTerritorialUnitDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfSocialConflictTerritorialUnitsListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfSocialConflictTerritorialUnitsListDto();
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

export interface IPagedResultDtoOfSocialConflictListDto {
    totalCount: number;
    items: SocialConflictDto[] | undefined;
}

export class PagedResultDtoOfSocialConflictListDto implements IPagedResultDtoOfSocialConflictListDto {
    totalCount!: number;
    items!: SocialConflictDto[] | undefined;

    constructor(data?: IPagedResultDtoOfSocialConflictListDto) {
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
                    this.items!.push(SocialConflictDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfSocialConflictListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfSocialConflictListDto();
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

export interface IPagedResultDtoOfSocialConflictCompromiseListDto {
    totalCount: number;
    items: SocialConflictCompromiseDto[] | undefined;
}

export class PagedResultDtoOfSocialConflictCompromiseListDto implements IPagedResultDtoOfSocialConflictCompromiseListDto {
    totalCount!: number;
    items!: SocialConflictCompromiseDto[] | undefined;

    constructor(data?: IPagedResultDtoOfSocialConflictCompromiseListDto) {
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
                    this.items!.push(SocialConflictCompromiseDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfSocialConflictCompromiseListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfSocialConflictCompromiseListDto();
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

export interface IPagedResultDtoOfSocialConflictActorListDto {
    totalCount: number;
    items: SocialConflictActorGetAllDto[] | undefined;
}

export class PagedResultDtoOfSocialConflictActorListDto implements IPagedResultDtoOfSocialConflictActorListDto {
    totalCount!: number;
    items!: SocialConflictActorGetAllDto[] | undefined;

    constructor(data?: IPagedResultDtoOfSocialConflictActorListDto) {
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
                    this.items!.push(SocialConflictActorGetAllDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfSocialConflictActorListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfSocialConflictActorListDto();
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

export interface ISocialConflictDto {
    id: number;
    generation: boolean;
    year: number;
    count: number;
    code: string;
    caseName: string;
    description: string;
    territorialUnits: string;
    creatorUser: SocialConflictUserDto;
    editUser: SocialConflictUserDto;
    creationTime: moment.Moment;
    lastModificationTime: moment.Moment;
    dialog: string;
    problem: string;
    plaint: string;
    factorContext: string;
    strategy: string;
    geographicType: GeographycType;
    caseNameVerification: boolean;
    descriptionVerification: boolean;
    problemVerification: boolean;
    riskVerification: boolean;
    managementVerification: boolean;
    stateVerification: boolean;
    conditionVerification: boolean;
    verification: ConflictVerificationState;
    manager: SocialConflictPersonDto;
    coordinator: SocialConflictPersonDto;
    analyst: SocialConflictPersonDto;
    sector: SocialConflictSectorDto;
    governmentLevel: GovernmentLevelType;
    latitude: number;
    longitude: number;
    published: number;
    typology: SocialConflictTypologyDto;
    subTypology: SocialConflictSubTypologyDto;
    locations: SocialConflictLocationDto[];
    actors: SocialConflictActorLocationDto[];
    generalFacts: SocialConflictGeneralFactDto[];
    sugerences: SocialConflictSugerenceDto[];
    managements: SocialConflictManagementLocationDto[];
    states: SocialConflictStateLocationDto[];
    violenceFacts: SocialConflictViolenceFactDto[];
    risks: SocialConflictRiskLocationDto[];
    conditions: SocialConflictConditionDto[];
    resources: SocialConflictResourceDto[];
}

export class SocialConflictDto implements ISocialConflictDto {
    id: number;
    generation: boolean;
    year: number;
    count: number;
    code: string;
    caseName: string;
    description: string;
    territorialUnits: string;
    creatorUser: SocialConflictUserDto;
    editUser: SocialConflictUserDto;
    creationTime: moment.Moment;
    lastModificationTime: moment.Moment;
    dialog: string;
    problem: string;
    plaint: string;
    factorContext: string;
    strategy: string;
    geographicType: GeographycType;
    caseNameVerification: boolean;
    descriptionVerification: boolean;
    problemVerification: boolean;
    riskVerification: boolean;
    managementVerification: boolean;
    stateVerification: boolean;
    conditionVerification: boolean;
    verification: ConflictVerificationState;
    manager: SocialConflictPersonDto;
    coordinator: SocialConflictPersonDto;
    analyst: SocialConflictPersonDto;
    sector: SocialConflictSectorDto;
    governmentLevel: GovernmentLevelType;
    typology: SocialConflictTypologyDto;
    subTypology: SocialConflictSubTypologyDto;
    locations: SocialConflictLocationDto[];
    actors: SocialConflictActorLocationDto[];
    generalFacts: SocialConflictGeneralFactDto[];
    sugerences: SocialConflictSugerenceDto[];
    pendingSugerences: SocialConflictSugerenceDto[];
    acceptedSugerences: SocialConflictSugerenceDto[];
    managements: SocialConflictManagementLocationDto[];
    states: SocialConflictStateLocationDto[];
    violenceFacts: SocialConflictViolenceFactDto[];
    risks: SocialConflictRiskLocationDto[];
    conditions: SocialConflictConditionDto[];
    resources: SocialConflictResourceDto[];
    notes: SocialConflictNoteLocationDto[];
    records: SocialConflictRecordDto[];
    latitude: number;
    longitude: number;
    published: number;
    lastCondition: SocialConflictConditionDto;

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

    constructor(data?: ISocialConflictDto) {
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

            this.locations = [];
            this.actors = [];
            this.generalFacts = [];
            this.managements = [];
            this.states = [];
            this.violenceFacts = [];
            this.sugerences = [];
            this.risks = [];
            this.conditions = [];
            this.pendingSugerences = [];
            this.acceptedSugerences = [];
            this.resources = [];
            this.notes = [];
            this.records = [];
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
            this.creatorUser = data["creatorUser"] ? SocialConflictUserDto.fromJS(data["creatorUser"]) : <any>undefined;
            this.editUser = data["editUser"] ? SocialConflictUserDto.fromJS(data["editUser"]) : <any>undefined;
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
            this.verification = data["verification"];
            this.latitude = data["latitude"];
            this.longitude = data["longitude"];
            this.published = data["published"];
            this.geographicType = data["geographicType"] ? data["geographicType"] : GeographycType.None;
            this.governmentLevel = data["governmentLevel"] ? data["governmentLevel"] : GovernmentLevelType.None;
            this.manager = data["manager"] ? SocialConflictPersonDto.fromJS(data["manager"]) : new SocialConflictPersonDto({ id: -1, name: undefined, type: PersonType.None });
            this.coordinator = data["coordinator"] ? SocialConflictPersonDto.fromJS(data["coordinator"]) : new SocialConflictPersonDto({ id: -1, name: undefined, type: PersonType.None });
            this.analyst = data["analyst"] ? SocialConflictPersonDto.fromJS(data["analyst"]) : new SocialConflictPersonDto({ id: -1, name: undefined, type: PersonType.None });
            this.sector = data["sector"] ? SocialConflictSectorDto.fromJS(data["sector"]) : new SocialConflictSectorDto({ id: -1, name: undefined });
            this.typology = data["typology"] ? SocialConflictTypologyDto.fromJS(data["typology"]) : new SocialConflictTypologyDto({ id: -1, name: undefined, subTypologies: [] });
            this.subTypology = data["subTypology"] ? SocialConflictSubTypologyDto.fromJS(data["subTypology"]) : new SocialConflictSubTypologyDto({ id: -1, name: undefined });

            this.caseNameVerificationState = data["caseNameVerificationState"];
            this.problemVerificationState = data["problemVerificationState"];
            this.descriptionVerificationState = data["descriptionVerificationState"];

            if (Array.isArray(data["locations"])) {
                this.locations = [] as any;
                for (let item of data["locations"])
                    this.locations!.push(SocialConflictLocationDto.fromJS(item));
            }
            if (Array.isArray(data["actors"])) {
                this.actors = [] as any;
                for (let item of data["actors"])
                    this.actors!.push(SocialConflictActorLocationDto.fromJS(item));
            }
            if (Array.isArray(data["generalFacts"])) {
                this.generalFacts = [] as any;
                for (let item of data["generalFacts"])
                    this.generalFacts!.push(SocialConflictGeneralFactDto.fromJS(item));
            }
            if (Array.isArray(data["sugerences"])) {
                this.sugerences = [] as any;
                for (let item of data["sugerences"]) {
                    this.sugerences!.push(SocialConflictSugerenceDto.fromJS(item));
                    if (item.accepted) {
                        this.acceptedSugerences!.push(SocialConflictSugerenceDto.fromJS(item));
                    } else {
                        this.pendingSugerences!.push(SocialConflictSugerenceDto.fromJS(item));
                    }
                }

            }
            if (Array.isArray(data["managements"])) {
                this.managements = [] as any;
                for (let item of data["managements"])
                    this.managements!.push(SocialConflictManagementLocationDto.fromJS(item));
            }
            if (Array.isArray(data["states"])) {
                this.states = [] as any;
                for (let item of data["states"])
                    this.states!.push(SocialConflictStateLocationDto.fromJS(item));
            }
            if (Array.isArray(data["violenceFacts"])) {
                this.violenceFacts = [] as any;
                for (let item of data["violenceFacts"])
                    this.violenceFacts!.push(SocialConflictViolenceFactDto.fromJS(item));
            }
            if (Array.isArray(data["risks"])) {
                this.risks = [] as any;
                for (let item of data["risks"])
                    this.risks!.push(SocialConflictRiskLocationDto.fromJS(item));
            }
            if (Array.isArray(data["conditions"])) {
                this.conditions = [] as any;
                for (let item of data["conditions"])
                    this.conditions!.push(SocialConflictConditionDto.fromJS(item));
            }
            if (Array.isArray(data["resources"])) {
                this.resources = [] as any;
                for (let item of data["resources"])
                    this.resources!.push(SocialConflictResourceDto.fromJS(item));
            }
            if (Array.isArray(data["notes"])) {
                this.notes = [] as any;
                for (let item of data["notes"])
                    this.notes!.push(SocialConflictNoteLocationDto.fromJS(item));
            }   
            if (Array.isArray(data["records"])) {
                this.records = [] as any;
                for (let item of data["records"])
                    this.records!.push(SocialConflictRecordDto.fromJS(item));
            }            
        }
    }

    static fromJS(data: any): SocialConflictDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictDto();
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
        data["geographicType"] = this.geographicType;
        data["governmentLevel"] = this.governmentLevel;
        data["manager"] = this.manager ? this.manager.toJSON() : <any>undefined;
        data["coordinator"] = this.coordinator ? this.coordinator.toJSON() : <any>undefined;
        data["analyst"] = this.analyst ? this.analyst.toJSON() : <any>undefined;
        data["sector"] = this.sector ? this.sector.toJSON() : <any>undefined;
        data["typology"] = this.typology ? this.typology.toJSON() : <any>undefined;
        data["subTypology"] = this.subTypology ? this.subTypology.toJSON() : <any>undefined;
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
        if (Array.isArray(this.violenceFacts)) {
            data["violenceFacts"] = [];
            for (let item of this.violenceFacts)
                data["violenceFacts"].push(item.toJSON());
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
        if (Array.isArray(this.records)) {
            data["records"] = [];
            for (let item of this.records)
                data["records"].push(item.toJSON());
        }

        return data;
    }
}

export interface ISocialConflictGetDataDto {
    socialConflict: SocialConflictDto;
    departments: SocialConflictDepartmentDto[];
    territorialUnits: SocialConflictTerritorialUnitDto[];
    actorTypes: SocialConflictActorTypeDto[];
    actorMovements: SocialConflictActorMovementDto[];
    facts: SocialConflictFactDto[];
    persons: SocialConflictPersonDto[];
    risks: SocialConflictRiskDto[];
    sectors: SocialConflictSectorDto[];
    typologies: SocialConflictTypologyDto[];
    managements: SocialConflictManagementDto[];
}

export class SocialConflictGetDataDto implements ISocialConflictGetDataDto {
    socialConflict: SocialConflictDto;
    departments: SocialConflictDepartmentDto[];
    territorialUnits: SocialConflictTerritorialUnitDto[];
    actorTypes: SocialConflictActorTypeDto[];
    actorMovements: SocialConflictActorMovementDto[];
    facts: SocialConflictFactDto[];
    persons: SocialConflictPersonDto[];
    risks: SocialConflictRiskDto[];
    sectors: SocialConflictSectorDto[];
    typologies: SocialConflictTypologyDto[];
    managements: SocialConflictManagementDto[];

    constructor(data?: ISocialConflictGetDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.socialConflict = data["socialConflict"] ? SocialConflictDto.fromJS(data["socialConflict"]) : <any>undefined;
            if (Array.isArray(data["departments"])) {
                this.departments = [] as any;
                for (let item of data["departments"])
                    this.departments!.push(SocialConflictDepartmentDto.fromJS(item));
            }
            if (Array.isArray(data["territorialUnits"])) {
                this.territorialUnits = [] as any;
                for (let item of data["territorialUnits"])
                    this.territorialUnits!.push(SocialConflictTerritorialUnitDto.fromJS(item));
            }
            if (Array.isArray(data["actorTypes"])) {
                this.actorTypes = [] as any;
                for (let item of data["actorTypes"])
                    this.actorTypes!.push(SocialConflictActorTypeDto.fromJS(item));
            }
            if (Array.isArray(data["actorMovements"])) {
                this.actorMovements = [] as any;
                for (let item of data["actorMovements"])
                    this.actorMovements!.push(SocialConflictActorMovementDto.fromJS(item));
            }
            if (Array.isArray(data["facts"])) {
                this.facts = [] as any;
                for (let item of data["facts"])
                    this.facts!.push(SocialConflictFactDto.fromJS(item));
            }
            if (Array.isArray(data["persons"])) {
                this.persons = [] as any;
                for (let item of data["persons"])
                    this.persons!.push(SocialConflictPersonDto.fromJS(item));
            }
            if (Array.isArray(data["risks"])) {
                this.risks = [] as any;
                for (let item of data["risks"])
                    this.risks!.push(SocialConflictRiskDto.fromJS(item));
            }
            if (Array.isArray(data["sectors"])) {
                this.sectors = [] as any;
                for (let item of data["sectors"])
                    this.sectors!.push(SocialConflictSectorDto.fromJS(item));
            }
            if (Array.isArray(data["typologies"])) {
                this.typologies = [] as any;
                for (let item of data["typologies"])
                    this.typologies!.push(SocialConflictTypologyDto.fromJS(item));
            }
            if (Array.isArray(data["managements"])) {
                this.managements = [] as any;
                for (let item of data["managements"])
                    this.managements!.push(SocialConflictManagementDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SocialConflictGetDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictGetDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["socialConflict"] = this.socialConflict ? this.socialConflict.toJSON() : <any>undefined;
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
        if (Array.isArray(this.sectors)) {
            data["sectors"] = [];
            for (let item of this.sectors)
                data["sectors"].push(item.toJSON());
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

export interface ISocialConflictDepartmentDto {
    id: number;
    territorialUnitIds: number[];
    name: string;
    provinces: SocialConflictProvinceDto[];
}

export class SocialConflictDepartmentDto implements ISocialConflictDepartmentDto {
    id: number;
    territorialUnitIds: number[];
    name: string;
    provinces: SocialConflictProvinceDto[];

    constructor(data?: ISocialConflictDepartmentDto) {
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
                    this.provinces!.push(SocialConflictProvinceDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SocialConflictDepartmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictDepartmentDto();
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

export interface ISocialConflictRegionDto {
    id: number;
    name: string;
}

export class SocialConflictRegionDto implements ISocialConflictRegionDto {
    id: number;
    name: string;

    constructor(data?: ISocialConflictRegionDto) {
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

    static fromJS(data: any): SocialConflictRegionDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictRegionDto();
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

export interface ISocialConflictProvinceDto {
    id: number;
    name: string;
    districts: SocialConflictDistrictDto[];
}

export class SocialConflictProvinceDto implements ISocialConflictProvinceDto {
    id: number;
    name: string;
    districts: SocialConflictDistrictDto[];

    constructor(data?: ISocialConflictProvinceDto) {
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
                    this.districts!.push(SocialConflictDistrictDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SocialConflictProvinceDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictProvinceDto();
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

export interface ISocialConflictDistrictDto {
    id: number;
    name: string;
}

export class SocialConflictDistrictDto implements ISocialConflictDistrictDto {
    id: number;
    name: string;

    constructor(data?: ISocialConflictDistrictDto) {
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

    static fromJS(data: any): SocialConflictDistrictDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictDistrictDto();
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

export interface ISocialConflictTerritorialUnitDto {
    id: number;
    name: string;
}

export class SocialConflictTerritorialUnitDto implements ISocialConflictTerritorialUnitDto {
    id: number;
    name: string;

    constructor(data?: ISocialConflictTerritorialUnitDto) {
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

    static fromJS(data: any): SocialConflictTerritorialUnitDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictTerritorialUnitDto();
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

export interface ISocialConflictLocationDto {
    id: number;
    department: SocialConflictDepartmentDto;
    province: SocialConflictProvinceDto;
    district: SocialConflictDistrictDto;
    territorialUnit: SocialConflictTerritorialUnitDto;
    region: SocialConflictRegionDto;
    ubication: string;
    remove: boolean;
}

export class SocialConflictLocationDto implements ISocialConflictLocationDto {
    id: number;
    department: SocialConflictDepartmentDto;
    province: SocialConflictProvinceDto;
    district: SocialConflictDistrictDto;
    territorialUnit: SocialConflictTerritorialUnitDto;
    region: SocialConflictRegionDto;
    ubication: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictLocationDto) {
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
            this.department = data["department"] ? SocialConflictDepartmentDto.fromJS(data["department"]) : <any>undefined;
            this.province = data["province"] ? SocialConflictProvinceDto.fromJS(data["province"]) : <any>undefined;
            this.district = data["district"] ? SocialConflictDistrictDto.fromJS(data["district"]) : <any>undefined;
            this.territorialUnit = data["territorialUnit"] ? SocialConflictTerritorialUnitDto.fromJS(data["territorialUnit"]) : <any>undefined;
            this.region = data["region"] ? SocialConflictRegionDto.fromJS(data["region"]) : <any>undefined;
            this.ubication = data["ubication"];
        }
    }

    static fromJS(data: any): SocialConflictLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictLocationDto();
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

export interface ISocialConflictActorLocationDto {
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
    actorType: SocialConflictActorTypeDto;
    actorMovement: SocialConflictActorMovementDto;
}

export class SocialConflictActorLocationDto implements ISocialConflictActorLocationDto {
    id: number;
    actorId : number;
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
    actorType: SocialConflictActorTypeDto;
    actorMovement: SocialConflictActorMovementDto;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictActorLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.actorType = new SocialConflictActorTypeDto({ id: -1, name: undefined, showDetail: false, showMovement: false });
            this.actorMovement = new SocialConflictActorMovementDto({ id: -1, name: undefined });
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
            this.actorType = data["actorType"] ? SocialConflictActorTypeDto.fromJS(data["actorType"]) : new SocialConflictActorTypeDto({ id: -1, name: undefined, showDetail: false, showMovement: false });
            this.actorMovement = data["actorMovement"] ? SocialConflictActorMovementDto.fromJS(data["actorMovement"]) : new SocialConflictActorMovementDto({ id: -1, name: undefined });
        }
    }

    static fromJS(data: any): SocialConflictActorLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictActorLocationDto();
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

export interface ISocialConflictActorGetAllDto {
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
    site: ActorSite;
    actorType: SocialConflictActorTypeDto;
    actorMovement: SocialConflictActorMovementDto;
}

export class SocialConflictActorGetAllDto implements ISocialConflictActorGetAllDto {
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
    site: ActorSite;
    actorType: SocialConflictActorTypeDto;
    actorMovement: SocialConflictActorMovementDto;

    constructor(data?: ISocialConflictActorGetAllDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.actorType = new SocialConflictActorTypeDto({ id: -1, name: undefined, showDetail: false, showMovement: false });
            this.actorMovement = new SocialConflictActorMovementDto({ id: -1, name: undefined });
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
            this.site = data["site"];
            this.actorType = data["actorType"] ? SocialConflictActorTypeDto.fromJS(data["actorType"]) : new SocialConflictActorTypeDto({ id: -1, name: undefined, showDetail: false, showMovement: false });
            this.actorMovement = data["actorMovement"] ? SocialConflictActorMovementDto.fromJS(data["actorMovement"]) : new SocialConflictActorMovementDto({ id: -1, name: undefined });
        }
    }

    static fromJS(data: any): SocialConflictActorGetAllDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictActorGetAllDto();
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
        data["site"] = this.site;
        data["actorType"] = this.actorType ? this.actorType.toJSON() : <any>undefined;
        data["actorMovement"] = this.actorMovement ? this.actorMovement.toJSON() : <any>undefined;

        return data;
    }
}

export interface ISocialConflictUserDto {
    id: number;
    name: string;
    surname: string;
}

export class SocialConflictUserDto implements ISocialConflictUserDto {
    id: number;
    name: string;
    surname: string;

    constructor(data?: ISocialConflictUserDto) {
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

    static fromJS(data: any): SocialConflictUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictUserDto();
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

export interface ISocialConflictDialogDto {
    id: number;
    name: string;
    remove: boolean;
}

export class SocialConflictDialogDto implements ISocialConflictDialogDto {
    id: number;
    name: string;
    remove: boolean;

    constructor(data?: ISocialConflictDialogDto) {
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

    static fromJS(data: any): SocialConflictDialogDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictDialogDto();
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

export interface ISocialConflictActorTypeDto {
    id: number;
    name: string;
    showDetail: boolean;
    showMovement: boolean;
}

export class SocialConflictActorTypeDto implements ISocialConflictActorTypeDto {
    id: number;
    name: string;
    showDetail: boolean;
    showMovement: boolean;

    constructor(data?: ISocialConflictActorTypeDto) {
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

    static fromJS(data: any): SocialConflictActorTypeDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictActorTypeDto();
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

export interface ISocialConflictActorMovementDto {
    id: number;
    name: string;
}

export class SocialConflictActorMovementDto implements ISocialConflictActorMovementDto {
    id: number;
    name: string;

    constructor(data?: ISocialConflictActorMovementDto) {
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

    static fromJS(data: any): SocialConflictActorMovementDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictActorMovementDto();
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

export interface ISocialConflictFactDto {
    id: number;
    name: string;
}

export class SocialConflictFactDto implements ISocialConflictFactDto {
    id: number;
    name: string;

    constructor(data?: ISocialConflictFactDto) {
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

    static fromJS(data: any): SocialConflictFactDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictFactDto();
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

export interface ISocialConflictPersonDto {
    id: number;
    name: string;
    type: PersonType;
}

export class SocialConflictPersonDto implements ISocialConflictPersonDto {
    id: number;
    name: string;
    type: PersonType;

    constructor(data?: ISocialConflictPersonDto) {
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

    static fromJS(data: any): SocialConflictPersonDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictPersonDto();
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

export interface ISocialConflictRiskDto {
    id: number;
    name: string;
    color: string;
}

export class SocialConflictRiskDto implements ISocialConflictRiskDto {
    id: number;
    name: string;
    color: string;

    constructor(data?: ISocialConflictRiskDto) {
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

    static fromJS(data: any): SocialConflictRiskDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictRiskDto();
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

export interface ISocialConflictSectorDto {
    id: number;
    name: string;
}

export class SocialConflictSectorDto implements ISocialConflictSectorDto {
    id: number;
    name: string;

    constructor(data?: ISocialConflictSectorDto) {
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

    static fromJS(data: any): SocialConflictSectorDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSectorDto();
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

export interface ISocialConflictTypologyDto {
    id: number;
    name: string;
    subTypologies: SocialConflictSubTypologyDto[];
}

export class SocialConflictTypologyDto implements ISocialConflictTypologyDto {
    id: number;
    name: string;
    subTypologies: SocialConflictSubTypologyDto[];

    constructor(data?: ISocialConflictTypologyDto) {
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
                    this.subTypologies!.push(SocialConflictSubTypologyDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SocialConflictTypologyDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictTypologyDto();
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

export interface ISocialConflictSubTypologyDto {
    id: number;
    name: string;
}

export class SocialConflictSubTypologyDto implements ISocialConflictSubTypologyDto {
    id: number;
    name: string;

    constructor(data?: ISocialConflictSubTypologyDto) {
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

    static fromJS(data: any): SocialConflictSubTypologyDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSubTypologyDto();
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

export interface ISocialConflictGeneralFactDto {
    id: number;
    creationTime: moment.Moment;
    factTime: moment.Moment;
    description: string;
    remove: boolean;
}

export class SocialConflictGeneralFactDto implements ISocialConflictGeneralFactDto {
    id: number;
    creationTime: moment.Moment;
    factTime: moment.Moment;
    description: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictGeneralFactDto) {
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

    static fromJS(data: any): SocialConflictGeneralFactDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictGeneralFactDto();
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

export interface ISocialConflictSugerenceDto {
    id: number;
    creatorUser: SocialConflictUserDto;
    creationTime: moment.Moment;
    description: string;
    accepted: boolean;
    acceptTime: moment.Moment;
    acceptedUser: SocialConflictUserDto;
    remove: boolean;
}

export class SocialConflictSugerenceDto implements ISocialConflictSugerenceDto {
    id: number;
    creatorUser: SocialConflictUserDto;
    creationTime: moment.Moment;
    description: string;
    accepted: boolean;
    acceptTime: moment.Moment;
    acceptedUser: SocialConflictUserDto;
    remove: boolean;
    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictSugerenceDto) {
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
            this.creatorUser = _data["creatorUser"] ? SocialConflictUserDto.fromJS(_data["creatorUser"]) : <any>undefined;
            this.description = _data["description"];
            this.accepted = _data["accepted"];
            this.acceptTime = _data["acceptTime"] ? moment(_data["acceptTime"]) : <any>undefined;
            this.acceptedUser = _data["acceptedUser"] ? SocialConflictUserDto.fromJS(_data["acceptedUser"]) : <any>undefined;
        }
    }

    static fromJS(data: any): SocialConflictSugerenceDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictSugerenceDto();
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

export interface ISocialConflictCompromiseDto {
    id: number;
    creationTime: moment.Moment;
    code: string;
    name: string;
    type: CompromiseType;
    status: SocialConflictParameterDto;
}

export class SocialConflictCompromiseDto implements ISocialConflictCompromiseDto {
    id: number;
    creationTime: moment.Moment;
    code: string;
    name: string;
    type: CompromiseType;
    status: SocialConflictParameterDto;

    constructor(data?: ISocialConflictCompromiseDto) {
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
            this.status = _data["status"] ? SocialConflictParameterDto.fromJS(_data["status"]) : <any>undefined;
        }
    }

    static fromJS(data: any): SocialConflictCompromiseDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictCompromiseDto();
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

export interface ISocialConflictParameterDto {
    id: number;
    value: string;
}

export class SocialConflictParameterDto implements ISocialConflictParameterDto {
    id: number;
    value: string;

    constructor(data?: ISocialConflictParameterDto) {
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

    static fromJS(data: any): SocialConflictParameterDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictParameterDto();
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

export interface ISocialConflictManagementDto {
    id: number;
    name: string;
    showDetail: boolean;
}

export class SocialConflictManagementDto implements ISocialConflictManagementDto {
    id: number;
    name: string;
    showDetail: boolean;

    constructor(data?: ISocialConflictManagementDto) {
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

    static fromJS(data: any): SocialConflictManagementDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictManagementDto();
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

export interface ISocialConflictManagementLocationDto {
    id: number;
    description: string;
    managementTime: moment.Moment;
    management: SocialConflictManagementDto;
    manager: SocialConflictPersonDto;
    civilMen: number;
    civilWomen: number;
    stateMen: number;
    stateWomen: number;
    companyMen: number;
    companyWomen: number;
    verificationLocation: boolean;
}

export class SocialConflictManagementLocationDto implements ISocialConflictManagementLocationDto {
    id: number;
    description: string;
    managementTime: moment.Moment;
    management: SocialConflictManagementDto;
    manager: SocialConflictPersonDto;
    civilMen: number;
    civilWomen: number;
    stateMen: number;
    stateWomen: number;
    companyMen: number;
    companyWomen: number;
    resources: SocialConflictResourceDto[];
    uploadFiles: AttachmentUploadDto[];
    verificationLocation: boolean;
    remove: boolean;

    //verification
    verificationState: string;
    verificationChange: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictManagementLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.management = new SocialConflictManagementDto({
                id: -1,
                name: undefined,
                showDetail: false
            });
            this.manager = new SocialConflictPersonDto({
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
            this.management = _data["management"] ? SocialConflictManagementDto.fromJS(_data["management"]) : new SocialConflictManagementDto({ id: -1, name: undefined, showDetail: false });
            this.manager = _data["manager"] ? SocialConflictPersonDto.fromJS(_data["manager"]) : new SocialConflictPersonDto({ id: -1, name: undefined, type: PersonType.None });
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
                    this.resources!.push(SocialConflictResourceDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SocialConflictManagementLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictManagementLocationDto();
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

export interface ISocialConflictResourceDto {
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

export class SocialConflictResourceDto implements ISocialConflictResourceDto {
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

    constructor(data?: ISocialConflictResourceDto) {
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

    static fromJS(data: any): SocialConflictResourceDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictResourceDto();
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

export interface ISocialConflictStateLocationDto {
    id: number;
    state: string;
    description: string;
    creationTime: moment.Moment;
    stateTime: moment.Moment;
    verificationLocation: boolean;
    manager: SocialConflictPersonDto;
    creatorUser: SocialConflictUserDto;
}

export class SocialConflictStateLocationDto implements ISocialConflictStateLocationDto {
    id: number;
    state: string;
    description: string;
    creationTime: moment.Moment;
    stateTime: moment.Moment;
    verificationLocation: boolean;
    manager: SocialConflictPersonDto;
    creatorUser: SocialConflictUserDto;
    remove: boolean;

    //verification
    verificationState: string;
    verificationChange: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictStateLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.verificationState = 'false';
            this.manager = new SocialConflictPersonDto({
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
            this.manager = _data["manager"] ? SocialConflictPersonDto.fromJS(_data["manager"]) : new SocialConflictPersonDto({ id: -1, name: undefined, type: PersonType.None });
            this.creatorUser = _data["creatorUser"] ? SocialConflictUserDto.fromJS(_data["creatorUser"]) : <any>undefined;
            this.verificationState = _data["verificationState"];
        }
    }

    static fromJS(data: any): SocialConflictStateLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictStateLocationDto();
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

export interface ISocialConflictViolenceFactDto {
    id: number;
    startTime: moment.Moment;
    endTime: moment.Moment;
    description: string;
    responsible: string;
    actions: string;
    injuredMen: number;
    injuredWomen: number;
    deadMen: number;
    deadWomen: number;
    manager: SocialConflictPersonDto;
    fact: SocialConflictFactDto;
    locations: SocialConflictViolenceFactLocationDto[];
}

export class SocialConflictViolenceFactDto implements ISocialConflictViolenceFactDto {
    id: number;
    startTime: moment.Moment;
    endTime: moment.Moment;
    description: string;
    responsible: string;
    actions: string;
    injuredMen: number;
    injuredWomen: number;
    deadMen: number;
    deadWomen: number;
    manager: SocialConflictPersonDto;
    fact: SocialConflictFactDto;
    locations: SocialConflictViolenceFactLocationDto[];
    remove: boolean;

    get totalInjured() {
        return (this.injuredMen ? +this.injuredMen : 0) + (this.injuredWomen ? +this.injuredWomen : 0);
    }

    get totalDead() {
        return (this.deadMen ? +this.deadMen : 0) + (this.deadWomen ? +this.deadWomen : 0);
    }

    get departments() {
        return this.locations
            .filter((value, index, self) => self.findIndex(p => p.department.id == value.department.id) === index)
            .map(p => p.department.name)
            .join(', ');
    }

    get provinces() {
        return this.locations
            .filter((value, index, self) => self.findIndex(p => p.province.id == value.province.id) === index)
            .map(p => p.province.name)
            .join(', ');
    }

    get districts() {
        return this.locations
            .filter((value, index, self) => self.findIndex(p => p.district.id == value.district.id) === index)
            .map(p => p.district.name)
            .join(', ');
    }

    get regions() {
        return this.locations
            .filter(p => p.region)
            .map(p => p.region.name)
            .filter(p => (p ? p : '').trim() != '')
            .filter((value, index, self) => self.indexOf(value) === index)
            .join(', ');
    }

    get ubications() {
        return this.locations
            .map(p => p.ubication)
            .filter(p => (p ? p : '').trim() != '')
            .filter((value, index, self) => self.indexOf(value) === index)
            .join(', ');
    }

    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictViolenceFactDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.injuredMen = 0;
            this.injuredWomen = 0;
            this.deadMen = 0;
            this.deadWomen = 0;
            this.fact = new SocialConflictFactDto({ id: -1, name: undefined });
            this.manager = new SocialConflictPersonDto({ id: -1, name: undefined, type: PersonType.None });
            this.locations = [];
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.startTime = _data["startTime"] ? moment(_data["startTime"]) : <any>undefined;
            this.endTime = _data["endTime"] ? moment(_data["endTime"]) : <any>undefined;
            this.description = _data["description"];
            this.responsible = _data["responsible"];
            this.actions = _data["actions"];
            this.injuredMen = _data["injuredMen"];
            this.injuredWomen = _data["injuredWomen"];
            this.deadMen = _data["deadMen"];
            this.deadWomen = _data["deadWomen"];
            this.manager = _data["manager"] ? SocialConflictPersonDto.fromJS(_data["manager"]) : new SocialConflictPersonDto({ id: -1, name: undefined, type: PersonType.None });
            this.fact = _data["fact"] ? SocialConflictFactDto.fromJS(_data["fact"]) : new SocialConflictFactDto({ id: -1, name: undefined });
            if (Array.isArray(_data["locations"])) {
                this.locations = [] as any;
                for (let item of _data["locations"])
                    this.locations!.push(SocialConflictViolenceFactLocationDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SocialConflictViolenceFactDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictViolenceFactDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["startTime"] = this.startTime ? this.startTime.toISOString() : <any>undefined;
        data["endTime"] = this.endTime ? this.endTime.toISOString() : <any>undefined;
        data["description"] = this.description;
        data["responsible"] = this.responsible;
        data["actions"] = this.actions;
        data["injuredMen"] = this.injuredMen;
        data["injuredWomen"] = this.injuredWomen;
        data["deadMen"] = this.deadMen;
        data["deadWomen"] = this.deadWomen;
        data["manager"] = this.manager ? this.manager.toJSON() : <any>undefined;
        data["fact"] = this.fact ? this.fact.toJSON() : <any>undefined;
        data["remove"] = this.remove;

        if (Array.isArray(this.locations)) {
            data["locations"] = [];
            for (let item of this.locations)
                data["locations"].push(item.toJSON());
        }

        return data;
    }
}

export interface ISocialConflictViolenceFactLocationDto {
    id: number;
    department: SocialConflictDepartmentDto;
    province: SocialConflictProvinceDto;
    district: SocialConflictDistrictDto;
    region: SocialConflictRegionDto;
    ubication: string;
    remove: boolean;
}

export class SocialConflictViolenceFactLocationDto implements ISocialConflictViolenceFactLocationDto {
    id: number;
    department: SocialConflictDepartmentDto;
    province: SocialConflictProvinceDto;
    district: SocialConflictDistrictDto;
    region: SocialConflictRegionDto;
    ubication: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictViolenceFactLocationDto) {
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
            this.department = data["department"] ? SocialConflictDepartmentDto.fromJS(data["department"]) : <any>undefined;
            this.province = data["province"] ? SocialConflictProvinceDto.fromJS(data["province"]) : <any>undefined;
            this.district = data["district"] ? SocialConflictDistrictDto.fromJS(data["district"]) : <any>undefined;
            this.region = data["region"] ? SocialConflictRegionDto.fromJS(data["region"]) : <any>undefined;
            this.ubication = data["ubication"];
        }
    }

    static fromJS(data: any): SocialConflictViolenceFactLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictViolenceFactLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["department"] = this.department ? this.department.toJSON() : <any>undefined;
        data["province"] = this.province ? this.province.toJSON() : <any>undefined;
        data["district"] = this.district ? this.district.toJSON() : <any>undefined;
        data["region"] = this.region ? this.region.toJSON() : <any>undefined;
        data["ubication"] = this.ubication;
        data["remove"] = this.remove;

        return data;
    }
}

export interface ISocialConflictRiskLocationDto {
    id: number;
    riskTime: moment.Moment;
    description: string;
    risk: SocialConflictRiskDto;
    verificationLocation: boolean;
    remove: boolean;
}

export class SocialConflictRiskLocationDto implements ISocialConflictRiskLocationDto {
    id: number;
    riskTime: moment.Moment;
    description: string;
    risk: SocialConflictRiskDto;
    verificationLocation: boolean;
    remove: boolean;

    //verification
    verificationState: string;
    verificationChange: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictRiskLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.verificationState = 'false';
            this.risk = new SocialConflictRiskDto({ id: -1, name: undefined, color: undefined });
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.riskTime = data["riskTime"] ? moment(data["riskTime"]) : <any>undefined;
            this.description = data["description"];
            this.risk = data["risk"] ? SocialConflictRiskDto.fromJS(data["risk"]) : <any>undefined;
            this.verificationState = data["verificationState"];
            this.verificationLocation = data["verificationLocation"];
        }
    }

    static fromJS(data: any): SocialConflictRiskLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictRiskLocationDto();
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

export interface ISocialConflictConditionDto {
    id: number;
    conditionTime: moment.Moment;
    description: string;
    type: ConditionType;
    verificationLocation: boolean;
}

export class SocialConflictConditionDto implements ISocialConflictConditionDto {
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

    constructor(data?: ISocialConflictConditionDto) {
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

    static fromJS(data: any): SocialConflictConditionDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictConditionDto();
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

export interface ISocialConflictNoteLocationDto {
    id: number;
    description: string;
}

export class SocialConflictNoteLocationDto implements ISocialConflictNoteLocationDto {
    id: number;
    description: string;
    remove: boolean;

    //readonly
    isHidden: boolean;

    constructor(data?: ISocialConflictNoteLocationDto) {
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

    static fromJS(data: any): SocialConflictNoteLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictNoteLocationDto();
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


export interface ISocialConflictRecordDto {
    code: string;
    title: string;
    filter: string;
    recordTime: Date;
    womanCompromise: boolean;
}

export class SocialConflictRecordDto implements ISocialConflictRecordDto {
    code: string;
    title: string;
    filter: string;
    recordTime: Date;
    womanCompromise: boolean;

    constructor(data?: ISocialConflictRecordDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.code = data["code"];
            this.title = data["title"];
            this.filter = data["filter"];
            this.recordTime = data["recordTime"];
            this.womanCompromise = data["womanCompromise"];
        }
    }

    static fromJS(data: any): SocialConflictRecordDto {
        data = typeof data === 'object' ? data : {};
        let result = new SocialConflictRecordDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["code"] = this.code;
        data["title"] = this.title;
        data["filter"] = this.filter;
        data["recordTime"] = this.recordTime;
        data["womanCompromise"] = this.womanCompromise;
        return data;
    }
}

export enum GeographycType {
    None,
    Region,
    Location,
    National
}

export enum GovernmentLevelType {
    None,
    Location,
    Region,
    National
}

export enum SugerenceType {
    None,
    Pending,
    Accepted
}

export enum ActorSite {
    SocialConflict,
    SocialConflictAlert,
    SocialConflictSensible
}