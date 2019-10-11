import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = 'http://fisherman.kilicdeniz.com.tr/api';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  getAllCompanies(): Observable<any> {
    return this.http.get(this.baseurl + '/companies',
      {headers: this.httpHeaders});
  }

  getAllConsumptions(): Observable<any> {
    return this.http.get(this.baseurl + '/consumptions',
      {headers: this.httpHeaders});
  }

  getAllFacilities(): Observable<any> {
    return this.http.get(this.baseurl + '/facilities',
      {headers: this.httpHeaders});
  }

  getAllUnits(): Observable<any> {
    return this.http.get(this.baseurl + '/units',
      {headers: this.httpHeaders});
  }

  getAllTanks(): Observable<any> {
    return this.http.get(this.baseurl + '/tanks',
      {headers: this.httpHeaders});
  }

  getAllStocks(): Observable<any> {
    return this.http.get(this.baseurl + '/stocks',
      {headers: this.httpHeaders});
  }

  getAllBatches(): Observable<any> {
    return this.http.get(this.baseurl + '/batches',
      {headers: this.httpHeaders});
  }

  getAllFishtypes(): Observable<any> {
    return this.http.get(this.baseurl + '/fishtypes',
      {headers: this.httpHeaders});
  }

  getAllMetrics(): Observable<any> {
    return this.http.get(this.baseurl + '/metrics',
      {headers: this.httpHeaders});
  }

  getAllFishOp(): Observable<any> {
    return this.http.get(this.baseurl + '/fishoperations',
      {headers: this.httpHeaders});
  }
  getAllStockcategories(): Observable<any> {
    return this.http.get(this.baseurl + '/stockcategories',
      {headers: this.httpHeaders});
  }

  getAllStocklevels(): Observable<any> {
    return this.http.get(this.baseurl + '/stocklevels',
      {headers: this.httpHeaders});
  }

  getOneConsumptions(id): Observable<any> {
    return this.http.get(this.baseurl + '/consumptions/' + id,
      {headers: this.httpHeaders});
  }

  updateConsumptions(consumptions): Observable<any> {
    const body = {
      id: consumptions.id,
      date: consumptions.date,
      company: consumptions.company,
      unit: consumptions.unit,
      tank: consumptions.tank,
      stock: consumptions.stock,
      batch: consumptions.batch,
      stocklevel: consumptions.stocklevel,
      quantity: consumptions.quantity,
      metric: consumptions.metric,
      fishoperation: consumptions.fishoperation,
    };
    return this.http.put(this.baseurl + '/consumptions/' + consumptions.id, body,
      {headers: this.httpHeaders});
  }


  deleteConsumptions(id): Observable<any> {
    return this.http.delete(this.baseurl + '/consumptions/' + id,
    );
  }
}
