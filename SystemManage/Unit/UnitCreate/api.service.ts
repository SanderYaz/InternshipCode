import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //baseurl = "http://127.0.0.1:8000";
  baseurl = "http://fisherman.kilicdeniz.com.tr/api";
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getAllCompanies(): Observable<any> {
    return this.http.get(this.baseurl + '/companies',
      { headers: this.httpHeaders });
  }

  getAllFacilities(): Observable<any> {
    return this.http.get(this.baseurl + '/facilities',
      { headers: this.httpHeaders });
  }

  getAllUnits(): Observable<any> {
    // return this.http.get(this.baseurl + '/movies',
    return this.http.get(this.baseurl + '/units',
      { headers: this.httpHeaders });
  }

  getOneUnit(id): Observable<any> {
    return this.http.get(this.baseurl + '/unit/' + id,
      { headers: this.httpHeaders });
  }

  updateUnit(unit): Observable<any> {
    const body = {facility: unit.facility, name: unit.name, description: unit.description};
    return this.http.put(this.baseurl + '/unit/' + unit.id, body,
      { headers: this.httpHeaders });
  }

  createUnit(unit, facility): Observable<any> {
    const body = {facility: unit.facility, id: unit.id, name: unit.name, description: unit.description};
    return this.http.post(this.baseurl + '/units', body,
      { headers: this.httpHeaders });
  }


  deleteUnit(id): Observable<any> {
    return this.http.delete(this.baseurl + '/unit/' + id,
    )
  }
}
