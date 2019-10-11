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

  getAllAccounts(): Observable<any> {
    return this.http.get(this.baseurl + '/accounts',
      {headers: this.httpHeaders});
  }

  getAllStocks(): Observable<any> {
    return this.http.get(this.baseurl + '/stocks',
      {headers: this.httpHeaders});
  }

  getAllMetrics(): Observable<any> {
    return this.http.get(this.baseurl + '/metrics',
      {headers: this.httpHeaders});
  }

  getAllStockmovements(): Observable<any> {
    return this.http.get(this.baseurl + '/stockmovements',
      {headers: this.httpHeaders});
  }

  getOneStockmovement(id): Observable<any> {
    return this.http.get(this.baseurl + '/stockmovement/' + id,
      {headers: this.httpHeaders});
  }

  updateStockmovement(stockmovement): Observable<any> {
    const body = {
      movenumber: stockmovement.movenumber,
      stock: stockmovement.stock,
      sourcecompany: stockmovement.sourcecompany,
      sourcefacility: stockmovement.sourcefacility,
      sourceunit: stockmovement.sourceunit,
      sourcetank: stockmovement.sourcetank,
      targetcompany: stockmovement.targetcompany,
      targetfacility: stockmovement.targetfacility,
      targetunit: stockmovement.targetunit,
      targettank: stockmovement.targettank,
      targetmetric: stockmovement.targetmetric,
      quantity: stockmovement.quantity,
      is_transfer: stockmovement.is_transfer,
      is_deleted: stockmovement.is_deleted,
      is_entry: stockmovement.is_entry,
      is_exit: stockmovement.is_exit,
      is_countingentry: stockmovement.is_countingentry,
      is_countingexit: stockmovement.is_countingexit,
      is_stockconversion: stockmovement.is_stockconversion,
      irsaliyeno: stockmovement.irsaliyeno,
      account: stockmovement.account
    };
    return this.http.put(this.baseurl + '/stockmovement/' + stockmovement.id, body,
      {headers: this.httpHeaders});
  }

  createStockmovement(stockmovement): Observable<any> {
    const body = {
      id: stockmovement.id,
      movenumber: stockmovement.movenumber,
      stock: stockmovement.stock,
      sourcecompany: stockmovement.sourcecompany,
      sourcefacility: stockmovement.sourcefacility,
      sourceunit: stockmovement.sourceunit,
      sourcetank: stockmovement.sourcetank,
      targetcompany: stockmovement.targetcompany,
      targetfacility: stockmovement.targetfacility,
      targetunit: stockmovement.targetunit,
      targettank: stockmovement.targettank,
      targetmetric: stockmovement.targetmetric,
      quantity: stockmovement.quantity,
      is_transfer: true,
      is_deleted: false,
      is_entry: false,
      is_exit: false,
      is_countingentry: false,
      is_countingexit: false,
      is_stockconversion: false,
      irsaliyeno: stockmovement.irsaliyeno,
      account: stockmovement.account
    };
    return this.http.post(this.baseurl + '/stockmovements', body,
      {headers: this.httpHeaders});
  }

  deleteStockmovement(id): Observable<any> {
    return this.http.delete(this.baseurl + '/stockmovement/' + id,
    );
  }
}
