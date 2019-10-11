import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseurl = "http://fisherman.kilicdeniz.com.tr/api";
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getAllCompanies(): Observable<any> {
    return this.http.get(this.baseurl + '/companies',
      { headers: this.httpHeaders });
  }
  getAllLifecycles(): Observable<any> {
    return this.http.get(this.baseurl + '/lifecycles',
      {headers: this.httpHeaders});
  }
  getAllFacilities(): Observable<any> {
    return this.http.get(this.baseurl + '/facilities',
      { headers: this.httpHeaders });
  }

  getAllUnits(): Observable<any> {
    return this.http.get(this.baseurl + '/units',
      { headers: this.httpHeaders});
  }

  getAllStocks(): Observable<any> {
    return this.http.get(this.baseurl + '/stocks',
      { headers: this.httpHeaders});
  }

  getAllMetrics(): Observable<any> {
    return this.http.get(this.baseurl + '/metrics',
      {headers: this.httpHeaders});
  }

  getAllStocklevels(): Observable<any> {
    return this.http.get(this.baseurl + '/stocklevels',
      {headers: this.httpHeaders});
  }

  getOneStocklevel(id): Observable<any> {
    return this.http.get(this.baseurl + '/stocklevel/' + id,
      { headers: this.httpHeaders });
  }

  updateStocklevel(stocklevel): Observable<any> {
    const body = { company: stocklevel.company, unit: stocklevel.unit, stock: stocklevel.stock, quantity: stocklevel.quantity,  metric: stocklevel.metric};
    return this.http.put(this.baseurl + '/stocklevel/' + stocklevel.id, body,
      { headers: this.httpHeaders });
  }

  createStocklevel(stocklevel): Observable<any> {
    const body = {id: stocklevel.id, company: stocklevel.company, unit: stocklevel.unit, stock: stocklevel.stock, quantity: stocklevel.quantity, life_cycle: stocklevel.life_cycle, metric: stocklevel.metric};
    return this.http.post(this.baseurl + '/stocklevels', body,
      { headers: this.httpHeaders });
}
  deleteStocklevel(id): Observable<any> {
    return this.http.delete(this.baseurl + '/stocklevel/' + id,
    )
  }
}
