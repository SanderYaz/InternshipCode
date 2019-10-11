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

  getAllFacilitytypes(): Observable<any> {
    return this.http.get(this.baseurl + '/facilitytypes',
    { headers: this.httpHeaders});
  }

  getAllFacilities(): Observable<any> {
    return this.http.get(this.baseurl + '/facilities',
    {headers: this.httpHeaders});
  }

  getOneFacility(id): Observable<any> {
    return this.http.get(this.baseurl + '/facility/' + id,
      { headers: this.httpHeaders });
  }

  updateFacility(facility): Observable<any> {
    const body = { company: facility.company,  type: facility.type, name: facility.name, responsible_person: facility.responsible_person, address: facility.address, phone: facility.phone, coordinate: facility.coordinate, responsible_engineer: facility.responsible_engineer };
    return this.http.put(this.baseurl + '/facility/' + facility.id, body,
      { headers: this.httpHeaders });
  }

  createFacility(facility, company, facilitytype): Observable<any> {
    const body = { company: facility.company, type: facility.type, id: facility.id,  name: facility.name, responsible_person: facility.responsible_person, address: facility.address, phone: facility.phone, coordinate: facility.coordinate, responsible_engineer: facility.responsible_engineer };
    return this.http.post(this.baseurl + '/facilities', body,
      { headers: this.httpHeaders });
  }

  deleteFacility(id): Observable<any> {
    return this.http.delete(this.baseurl + '/facility/' + id,
    )
  }
}
