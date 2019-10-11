import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

 //baseurl = "http://127.0.0.1:8000";
  baseurl = "http://fisherman.kilicdeniz.com.tr/api";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

constructor(private http: HttpClient) { }

getAllClients(): Observable<any> {
 // return this.http.get(this.baseurl + '/movies',
  return this.http.get(this.baseurl + '/clients',
  {headers: this.httpHeaders});
}

getOneClient(id): Observable<any> {
  return this.http.get(this.baseurl + '/client/' + id,
  {headers: this.httpHeaders});
}

updateClient(client): Observable<any> {
const body = {id: client.id, name: client.name, responsible_person: client.responsible_person, address: client.address, phone: client.phone, tax_office: client.tax_office, tax_number: client.tax_number};
return this.http.put(this.baseurl + '/client/' + client.id, body,
{headers:this.httpHeaders});
}

createClient(client): Observable<any> {
  const body = {id: client.id, name: client.name, responsible_person: client.responsible_person, address: client.address, phone: client.phone, tax_office: client.tax_office, tax_number: client.tax_number };
  return this.http.post(this.baseurl + '/clients' , body,
   {headers: this.httpHeaders});
}

deleteClient(id): Observable<any> {
  return this.http.delete(this.baseurl + '/client/' + id, 
  )
}

}
