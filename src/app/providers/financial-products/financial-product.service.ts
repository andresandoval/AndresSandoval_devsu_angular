import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, mergeMap, Observable} from 'rxjs';
import {FinancialProduct} from '../../models/financial-products/financial-product';
import {ApiResponse} from '../../models/core/api-response';
import {FinancialProductCreationDto} from '../../models/financial-products/financial-product-creation-dto';
import {AlertService} from '../alert.service';
import {FinancialProductUpdateDto} from '../../models/financial-products/financial-product-update-dto';

@Injectable({
  providedIn: 'root'
})
export class FinancialProductService {

  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly alertService: AlertService = inject(AlertService);

  constructor() {
  }

  public list(): Observable<FinancialProduct[]> {
    return this.httpClient.get<ApiResponse<FinancialProduct[]>>('::api/bp/products', {observe: "response"})
      .pipe(
        map(response => response.body!.data),
      )
  }

  public verify(id: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`::api/bp/products/verification/${id}`, {observe: "response"})
      .pipe(
        map(response => response.body === true),
      )
  }

  public getById(id: string): Observable<FinancialProduct> {
    return this.httpClient.get<FinancialProduct>(`::api/bp/products/${id}`, {observe: "response"})
      .pipe(
        map(response => response.body!),
      )
  }

  public create(creationDto: FinancialProductCreationDto): Observable<FinancialProduct> {
    return this.httpClient.post<ApiResponse<FinancialProduct>>(`::api/bp/products`, creationDto, {observe: "response"})
      .pipe(
        mergeMap(response => this.alertService.success(response.body!.message)
          .pipe(
            map(() => response.body!.data)
          )
        )
      )
  }

  public update(id: string, updateDto: FinancialProductUpdateDto): Observable<FinancialProduct> {
    return this.httpClient.put<ApiResponse<FinancialProduct>>(`::api/bp/products/${id}`, updateDto, {observe: "response"})
      .pipe(
        mergeMap(response => this.alertService.success(response.body!.message)
          .pipe(
            map(() => response.body!.data)
          )
        )
      )
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<ApiResponse<void>>(`::api/bp/products/${id}`, {observe: "response"})
      .pipe(
        mergeMap(response => this.alertService.success(response.body!.message))
      )
  }
}
