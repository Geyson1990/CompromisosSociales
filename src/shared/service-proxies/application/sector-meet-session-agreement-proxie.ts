import { mergeMap as _observableMergeMap, catchError as _observableCatch, map } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete, EntityDto, PersonType } from '../service-proxies';
import * as moment from 'moment';

@Injectable()
export class SectorMeetSessionAgreementServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    get(id: number): Observable<SectorMeetSessionAgreementDto[]> {
        if (id === null) {
            throw new Error("El parámetro 'id' no puede ser nulo.");
        }

        let url = `${this.baseUrl}/api/services/app/SectorMeetSessionAgreement/Get?`;

        if (id !== undefined) {
            url += `SocialConflictId=${encodeURIComponent(id.toString())}`;
        }

        url = url.replace(/[?&]$/, '');

        const options = {
            observe: 'response' as 'response',
            responseType: 'json' as 'json',
            headers: new HttpHeaders({
                'Accept': 'application/json',
            }),
        };

        return this.http.get<{ result: SectorMeetSessionAgreementDto[] }>(url, options)
        .pipe(
          map((response: HttpResponse<{ result: SectorMeetSessionAgreementDto[] }>) => {
            return response.body.result;
          })
        );
    }

    create(data: any): Observable<any> {
        let url = `${this.baseUrl}/api/services/app/SectorMeetSessionAgreement/Create`;
        // Agrega el return y devuelve el Observable resultante de la solicitud POST
        return this.http.post(url, data).pipe(
          map((response: any) => {
            if (response) {
              return response;
            } else {
              throw new Error("Error al guardar");
            }
          })
        );
      }

    delete(id: number): Observable<any> {

      if (id === null) {
        throw new Error("El parámetro 'id' no puede ser nulo.");
    }

    let url = `${this.baseUrl}/api/services/app/SectorMeetSessionAgreement/Delete?`;

    if (id !== undefined) {
        url += `Id=${encodeURIComponent(id.toString())}`;
    }

    url = url.replace(/[?&]$/, '');
    return this.http.delete(url);
    }
}

export interface ISectorMeetSessionAgreementDto {
    description: string;
    index: number;
    sectorMeetSessionId: number;
    compromiseId: number;
    sectorMeetSessionAgreementId: number;
    socialConflictId: number;
    code: string;
    caseName: string;
    sectorMeetId: number;
    meetName: string;
    personId: number;
    creationTime: string;
    acuerdoAsignado: number;
    person: any;
    resourceRelationDto: any;
    id: 0;

}

export class SectorMeetSessionAgreementDto implements ISectorMeetSessionAgreementDto {
    
    description: string;
    index: number;
    sectorMeetSessionId: number;
    compromiseId: number;
    sectorMeetSessionAgreementId: number;
    socialConflictId: number;
    code: string;
    caseName: string;
    sectorMeetId: number;
    meetName: string;
    personId: number;
    creationTime: string;
    acuerdoAsignado: number;
    person: any;
    resourceRelationDto: any;
    id: 0;

}


