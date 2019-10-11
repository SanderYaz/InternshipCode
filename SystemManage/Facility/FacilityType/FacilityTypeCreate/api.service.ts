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


  getAllFacilitytypes(): Observable<any> {
    // return this.http.get(this.baseurl + '/movies',
    return this.http.get(this.baseurl + '/facilitytypes',
      { headers: this.httpHeaders });
  }

  getOneFacilitytype(id): Observable<any> {
    return this.http.get(this.baseurl + '/facilitytype/' + id,
      { headers: this.httpHeaders });
  }

  updateFacilitytype(facilitytype): Observable<any> {
    const body = { id: facilitytype.id, name: facilitytype.name };
    return this.http.put(this.baseurl + '/facilitytype/' + facilitytype.id, body,
      { headers: this.httpHeaders });
  }

  createFacilitytype(facilitytype): Observable<any> {
    const body = { id: facilitytype.id, name: facilitytype.name };
    return this.http.post(this.baseurl + '/facilitytypes', body,
      { headers: this.httpHeaders });
  }

  deleteFacilitytype(id): Observable<any> {
    return this.http.delete(this.baseurl + '/facilitytype/' + id,
    )
  }
}
