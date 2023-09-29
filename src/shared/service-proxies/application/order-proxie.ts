import { UtilityDepartmentDto, UtilityDistrictDto, UtilityParameterDto, UtilityProvinceDto, UtilitySocialConflictDto, UtilityTerritorialUnitDto } from "./utility-proxie";
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { API_BASE_URL, blobToText, throwException, processComplete, FileDto } from '../service-proxies';
import * as moment from "moment";
import { PipMefDto } from "./pip-mef-proxie";

@Injectable()
export class OrderServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getMatrixToExcel(
        filter: string | undefined,
        orderType: number | undefined,
        socialConflictCode: string | undefined,
        territorialUnit: number | undefined,
        startDate: moment.Moment | undefined,
        endDate: moment.Moment | undefined,
        sorting: string | undefined): Observable<FileDto> {

        let url_ = this.baseUrl + "/api/services/app/Order/GetMatrixToExcel?";

        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (orderType !== undefined)
            url_ += "Type=" + encodeURIComponent("" + orderType) + "&";
        if (socialConflictCode !== undefined)
            url_ += "SocialConflictCode=" + encodeURIComponent("" + socialConflictCode) + "&";
        if (territorialUnit !== undefined)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnit) + "&";
        if (sorting !== undefined)
            url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
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
            return this.processGetExportToExcel(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetExportToExcel(<any>response_);
                } catch (e) {
                    return <Observable<FileDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<FileDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetExportToExcel(response: HttpResponseBase): Observable<FileDto> {
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

    getAll(
        filter: string | undefined,
        orderType: number | undefined,
        socialConflictCode: string | undefined,
        territorialUnit: number | undefined,
        startDate: moment.Moment | undefined,
        endDate: moment.Moment | undefined,
        filterByDate: boolean | undefined,
        sorting: string | undefined,
        maxResultCount: number | undefined,
        skipCount: number | undefined): Observable<PagedResultDtoOfOrderListDto> {

        let url_ = this.baseUrl + "/api/services/app/Order/GetAll?";

        if (filter !== undefined)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (orderType !== undefined)
            url_ += "Type=" + encodeURIComponent("" + orderType) + "&";
        if (socialConflictCode !== undefined)
            url_ += "SocialConflictCode=" + encodeURIComponent("" + socialConflictCode) + "&";
        if (territorialUnit !== undefined)
            url_ += "TerritorialUnitId=" + encodeURIComponent("" + territorialUnit) + "&";
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
            return this.processGetAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfOrderListDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfOrderListDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfOrderListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoOfOrderListDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfOrderListDto>(<any>null);
    }

    get(id: number): Observable<OrderGetDataDto> {
        let url_ = this.baseUrl + "/api/services/app/Order/Get?";
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
                    return <Observable<OrderGetDataDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<OrderGetDataDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<OrderGetDataDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = OrderGetDataDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<OrderGetDataDto>(<any>null);
    }

    create(item: OrderDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/Order/Create";

        let options_: any = {
            observe: "response",
            responseType: "blob",
            body: item.toJSON(),
            headers: new HttpHeaders({
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

    update(item: OrderDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/Order/Update";

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
}

export interface IPagedResultDtoOfOrderListDto {
    totalCount: number;
    items: OrderDto[] | undefined;
}

export class PagedResultDtoOfOrderListDto implements IPagedResultDtoOfOrderListDto {
    totalCount!: number;
    items!: OrderDto[] | undefined;

    constructor(data?: IPagedResultDtoOfOrderListDto) {
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
                    this.items!.push(OrderDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfOrderListDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfOrderListDto();
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

export interface IOrderGetDataDto {
    order: OrderDto;
    departments: OrderDepartmentDto[];
    territorialUnits: UtilityTerritorialUnitDto[];
}

export class OrderGetDataDto implements IOrderGetDataDto {
    order: OrderDto;
    departments: OrderDepartmentDto[];
    territorialUnits: UtilityTerritorialUnitDto[];

    constructor(data?: IOrderGetDataDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.order = data["order"] ? OrderDto.fromJS(data["order"]) : <any>undefined;

            if (Array.isArray(data["departments"])) {
                this.departments = [] as any;
                for (let item of data["departments"])
                    this.departments!.push(OrderDepartmentDto.fromJS(item));
            }
            if (Array.isArray(data["territorialUnits"])) {
                this.territorialUnits = [] as any;
                for (let item of data["territorialUnits"])
                    this.territorialUnits!.push(UtilityTerritorialUnitDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): OrderGetDataDto {
        data = typeof data === 'object' ? data : {};
        let result = new OrderGetDataDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["order"] = this.order ? this.order.toJSON() : <any>undefined;

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

        return data;
    }
}

export interface IOrderDto {
    id: number;
    code: string;
    name: string;
    type: OrderType;
    description: string;
    observation: string;
    document: string;
    responsible: string;
    socialConflict: UtilitySocialConflictDto;
    orderDate: moment.Moment;
    territorialUnit: UtilityTerritorialUnitDto;
    department: UtilityDepartmentDto;
    province: UtilityProvinceDto;
    district: UtilityDistrictDto;
    pIPMEF: PipMefDto;
    territorialUnits: string;
}

export class OrderDto implements IOrderDto {
    id: number;
    code: string;
    name: string;
    type: OrderType;
    description: string;
    observation: string;
    document: string;
    responsible: string;
    socialConflict: UtilitySocialConflictDto;
    orderDate: moment.Moment;
    territorialUnit: UtilityTerritorialUnitDto;
    department: UtilityDepartmentDto;
    province: UtilityProvinceDto;
    district: UtilityDistrictDto;
    pIPMEF: PipMefDto;
    territorialUnits: string;

    constructor(data?: IOrderDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.type = OrderType.None;
            this.territorialUnit = new UtilityTerritorialUnitDto();
            this.territorialUnit.id = -1;
            this.department = new UtilityDepartmentDto();
            this.department.id = -1;
            this.province = new UtilityProvinceDto();
            this.province.id = -1;
            this.district = new UtilityDistrictDto();
            this.district.id = -1;
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.code = data["code"];
            this.name = data["name"];
            this.type = data["type"];
            this.description = data["description"];
            this.observation = data["observation"];
            this.document = data["document"];
            this.responsible = data["responsible"];
            this.socialConflict = data["socialConflict"] ? UtilitySocialConflictDto.fromJS(data["socialConflict"]) : <any>undefined;
            this.orderDate = data["orderDate"] ? moment(data["orderDate"]) : <any>undefined;
            this.territorialUnit = data["territorialUnit"] ? UtilityTerritorialUnitDto.fromJS(data["territorialUnit"]) : <any>undefined;
            this.department = data["department"] ? UtilityDepartmentDto.fromJS(data["department"]) : <any>undefined;
            this.province = data["province"] ? UtilityProvinceDto.fromJS(data["province"]) : <any>undefined;
            this.district = data["district"] ? UtilityDistrictDto.fromJS(data["district"]) : <any>undefined;
            this.pIPMEF = data["pIPMEF"] ? PipMefDto.fromJS(data["pIPMEF"]) : <any>undefined;
            this.territorialUnits = data["territorialUnits"];
        }
    }

    static fromJS(data: any): OrderDto {
        data = typeof data === 'object' ? data : {};
        let result = new OrderDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["code"] = this.code;
        data["name"] = this.name;
        data["type"] = this.type;
        data["description"] = this.description;
        data["observation"] = this.observation;
        data["document"] = this.document;
        data["responsible"] = this.responsible;
        data["socialConflict"] = this.socialConflict ? this.socialConflict.toJSON() : <any>undefined;
        data["orderDate"] = this.orderDate ? this.orderDate.toISOString() : <any>undefined;
        data["territorialUnit"] = this.territorialUnit ? this.territorialUnit.toJSON() : <any>undefined;
        data["department"] = this.department ? this.department.toJSON() : <any>undefined;
        data["province"] = this.province ? this.province.toJSON() : <any>undefined;
        data["district"] = this.district ? this.district.toJSON() : <any>undefined;
        data["pIPMEF"] = this.pIPMEF ? this.pIPMEF.toJSON() : <any>undefined;

        return data;
    }
}

export interface IOrderDepartmentDto {
    id: number;
    territorialUnitId: number;
    name: string;
    provinces: OrderProvinceDto[];
}

export class OrderDepartmentDto implements IOrderDepartmentDto {
    id: number;
    territorialUnitId: number;
    name: string;
    provinces: OrderProvinceDto[];

    constructor(data?: IOrderDepartmentDto) {
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
                    this.provinces!.push(OrderProvinceDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): OrderDepartmentDto {
        data = typeof data === 'object' ? data : {};
        let result = new OrderDepartmentDto();
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

export interface IOrderProvinceDto {
    id: number;
    name: string;
    districts: OrderDistrictDto[];
}

export class OrderProvinceDto implements IOrderProvinceDto {
    id: number;
    name: string;
    districts: OrderDistrictDto[];

    constructor(data?: IOrderProvinceDto) {
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
                    this.districts!.push(OrderDistrictDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): OrderProvinceDto {
        data = typeof data === 'object' ? data : {};
        let result = new OrderProvinceDto();
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

export interface IOrderDistrictDto {
    id: number;
    name: string;
}

export class OrderDistrictDto implements IOrderDistrictDto {
    id: number;
    name: string;

    constructor(data?: IOrderDistrictDto) {
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

    static fromJS(data: any): OrderDistrictDto {
        data = typeof data === 'object' ? data : {};
        let result = new OrderDistrictDto();
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


export enum OrderType {
    None,
    PIP,
    Activity
}