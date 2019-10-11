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

  getAllStocks(): Observable<any> {
    return this.http.get(this.baseurl + '/stocks',
      {headers: this.httpHeaders});
  }
  getAllStocklevels(): Observable<any> {
    return this.http.get(this.baseurl + '/stocklevels',
      {headers: this.httpHeaders});
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

  getAllFishoperations(): Observable<any> {
    return this.http.get(this.baseurl + '/fishoperations',
      {headers: this.httpHeaders});
  }

  getAllFishtypes(): Observable<any> {
    return this.http.get(this.baseurl + '/fishtypes',
      { headers: this.httpHeaders });
  }

  getAllGradingrecords(): Observable<any> {
    return this.http.get(this.baseurl + '/gradingrecords',
      { headers: this.httpHeaders });
  }

  getOneGradingrecords(id): Observable<any> {
    return this.http.get(this.baseurl + '/gradingrecord/' + id,
      {headers: this.httpHeaders});
  }

  updateStocklevels(gradingrecord): Observable<any> {
    const body = {
      sourcefishopr: gradingrecord.sourcefishopr,
      targetfishopr: gradingrecord.targetfishopr,
      quantity: gradingrecord.quantity,
      weight: gradingrecord.weight,
      grading: gradingrecord.grading,
      biomas: gradingrecord.biomas,
      date: gradingrecord.date,
      feed: gradingrecord.feed
    };
    return this.http.put(this.baseurl + '/gradingrecord/' + gradingrecord.id, body,
      {headers: this.httpHeaders});
  }
  createGradingrecords(gradingrecord, qua, agirlik, grad, biom, yem, Fop, TFop ): Observable<any> {
    const body = {
      sourcefishopr: Fop,
      targetfishopr: 1,
      quantity: qua,
      weight: agirlik,
      grading: grad,
      biomas: biom,
      date: gradingrecord.date,
      feed: yem
    };
    return this.http.post(this.baseurl + '/gradingrecords', body,
      {headers: this.httpHeaders});
  }

  deleteGradingrecords(id): Observable<any> {
    return this.http.delete(this.baseurl + '/gradingrecord/' + id,
    );
  }
}
