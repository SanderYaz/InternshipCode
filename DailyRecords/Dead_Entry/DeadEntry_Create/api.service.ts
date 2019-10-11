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

  getAllFishoperations(): Observable<any> {
    return this.http.get(this.baseurl + '/fishoperations',
      {headers: this.httpHeaders});
  }

  getAllMortalitytypes(): Observable<any> {
    return this.http.get(this.baseurl + '/mortalitytypes',
      {headers: this.httpHeaders});
  }

  getAllMortalityentries(): Observable<any> {
    return this.http.get(this.baseurl + '/mortalityentries',
      {headers: this.httpHeaders});
  }

  getOneMortalityentries(id): Observable<any> {
    return this.http.get(this.baseurl + '/mortalityentry/' + id,
      {headers: this.httpHeaders});
  }
  getAllFishtypes(): Observable<any> {
    return this.http.get(this.baseurl + '/fishtypes',
      { headers: this.httpHeaders });
  }

  updateMortalityentry(mortalityentry): Observable<any> {
    const body = {
      date: mortalityentry.date,
      tank: mortalityentry.tank,
      fishopr: mortalityentry.fishopr,
      company: mortalityentry.company,
      facility: mortalityentry.facility,
      unit: mortalityentry.unit,
      quantity: mortalityentry.quantity,
      mortalitytype: mortalityentry.mortalitytype
    };
    return this.http.put(this.baseurl + '/mortalityentry/' + mortalityentry.id, body,
      {headers: this.httpHeaders});
  }

  createMortalityentry(mortalityentry, tanks, type, say, OP): Observable<any> {
    const body = {
      id: mortalityentry.id,
      date: mortalityentry.date,
      tank: tanks,
      fishopr: OP,
      company: mortalityentry.company,
      facility: mortalityentry.facility,
      unit: mortalityentry.unit,
      quantity: say,
      mortalitytype: type
    };
    return this.http.post(this.baseurl + '/mortalityentries', body,
      {headers: this.httpHeaders});
  }

  deleteMortalityentry(id): Observable<any> {
    return this.http.delete(this.baseurl + '/mortalityentry/' + id,
    );
  }
}
