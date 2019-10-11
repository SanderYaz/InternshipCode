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

  getAllClients(): Observable<any> {
    // return this.http.get(this.baseurl + '/movies',
    return this.http.get(this.baseurl + '/clients',
      { headers: this.httpHeaders });
  }

  getAllCompanies(): Observable<any> {
    // return this.http.get(this.baseurl + '/movies',
    return this.http.get(this.baseurl + '/companies',
      { headers: this.httpHeaders });
  }

  getOneCompany(id): Observable<any> {
    return this.http.get(this.baseurl + '/company/' + id,
      { headers: this.httpHeaders });
  }

  updateCompany(company): Observable<any> {
    const body = { client: company.client, name: company.name, responsible_person: company.responsible_person, address: company.address, phone: company.phone, tax_office: company.tax_office, tax_number: company.tax_number };
    return this.http.put(this.baseurl + '/company/' + company.id, body,
      { headers: this.httpHeaders });
  }

  createCompany(company, client): Observable<any> {
    const body = { client: company.client, id: company.id, name: company.name, responsible_person: company.responsible_person, address: company.address, phone: company.phone, tax_office: company.tax_office, tax_number: company.tax_number };
    return this.http.post(this.baseurl + '/companies', body,
      { headers: this.httpHeaders });
  }


  deleteCompany(id): Observable<any> {
    return this.http.delete(this.baseurl + '/company/' + id,
    );
  }
}
