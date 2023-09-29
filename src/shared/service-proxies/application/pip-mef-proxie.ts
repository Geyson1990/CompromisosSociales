import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete } from '../service-proxies';
import { UtilityParameterDto } from './utility-proxie';

@Injectable()
export class PIPMEFServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    get(code: string): Observable<PipMefDto> {
        let url_ = this.baseUrl + "/api/services/app/PipMef/GetPIPDetails?";
        if (code === null)
            throw new Error("The parameter 'code' cannot be null.");
        else if (code !== undefined)
            url_ += "code=" + encodeURIComponent("" + code) + "&";
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
                    return <Observable<PipMefDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PipMefDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<PipMefDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PipMefDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PipMefDto>(<any>null);
    }
}

export interface IPipMefDto {
    accrued: number;
    accumulatedAccrued: number;
    executingUnit: string;
    formulatingUnit: string;
    id: number;
    lastUpdateMEF: string;
    pia: number;
    pim: number;
    pipMilestone: string;
    pipPhase: string;
    projectName: string;
    snipCode: string;
    unifiedCode: string;
    viabilityDate: string;
    updatedCost: number;
    status: string;
    pIPPhase: UtilityParameterDto;
    pIPMilestone: UtilityParameterDto;
}

export class PipMefDto implements IPipMefDto {
    accrued: number;
    accumulatedAccrued: number;
    executingUnit: string;
    formulatingUnit: string;
    id: number;
    lastUpdateMEF: string;
    pia: number;
    pim: number;
    pipMilestone: string;
    pipPhase: string;
    projectName: string;
    snipCode: string;
    unifiedCode: string;
    viabilityDate: string;
    updatedCost: number;
    status: string;
    pIPPhase: UtilityParameterDto;
    pIPMilestone: UtilityParameterDto;

    constructor(data?: IPipMefDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {        
        if (data) {
            this.accrued = data["accrued"];
            this.accumulatedAccrued = data["accumulatedAccrued"];
            this.executingUnit = data["executingUnit"];
            this.formulatingUnit = data["formulatingUnit"];
            this.id = data["id"];
            this.lastUpdateMEF = data["lastUpdateMEF"];
            this.pia = data["pia"];
            this.pim = data["pim"];
            this.pipMilestone = data["pipMilestone"];
            this.pipPhase = data["pipPhase"];
            this.projectName = data["projectName"];
            this.snipCode = data["snipCode"];
            this.unifiedCode = data["unifiedCode"];
            this.viabilityDate = data["viabilityDate"];
            this.updatedCost = data["updatedCost"];
            this.status = data["status"];
            this.pIPPhase = data["pipPhase"] ? UtilityParameterDto.fromJS(data["pipPhase"]) : <any>undefined;
            this.pIPMilestone = data["pipMilestone"] ? UtilityParameterDto.fromJS(data["pipMilestone"]) : <any>undefined;
        }        
    }

    static fromJS(data: any): PipMefDto {
        data = typeof data === 'object' ? data : {};
        let result = new PipMefDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["snipCode"] = this.snipCode;
        data["unifiedCode"] = this.unifiedCode;
        data["pIPPhase"] = this.pIPPhase ? this.pIPPhase.toJSON() : <any>undefined;
        data["pIPMilestone"] = this.pIPMilestone ? this.pIPMilestone.toJSON() : <any>undefined;

        return data;
    }
}

export interface IPipMefLocationDto {
    codigo: number;
    departamento: string;
    provincia: string;
    distrito: string;
    centroPoblado: string;
    ubigeo: string;
    latitud: number;
    longitud: number;
}

export class PipMefLocationDto implements IPipMefLocationDto {
    codigo: number;
    departamento: string;
    provincia: string;
    distrito: string;
    centroPoblado: string;
    ubigeo: string;
    latitud: number;
    longitud: number;

    constructor(data?: IPipMefLocationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.codigo = data["codigo"];
            this.departamento = data["departamento"];
            this.provincia = data["provincia"];
            this.distrito = data["distrito"];
            this.centroPoblado = data["centroPoblado"];
            this.ubigeo = data["ubigeo"];
            this.latitud = data["latitud"];
            this.longitud = data["longitud"];
        }
    }

    static fromJS(data: any): PipMefLocationDto {
        data = typeof data === 'object' ? data : {};
        let result = new PipMefLocationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};

        data["codigo"] = this.codigo;
        data["departamento"] = this.departamento;
        data["provincia"] = this.provincia;
        data["distrito"] = this.distrito;
        data["centroPoblado"] = this.centroPoblado;
        data["ubigeo"] = this.ubigeo;
        data["latitud"] = this.latitud;
        data["longitud"] = this.longitud;

        return data;
    }
}