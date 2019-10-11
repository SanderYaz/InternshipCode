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

  getAllFacilities(): Observable<any> {
    return this.http.get(this.baseurl + '/facilities',
      { headers: this.httpHeaders });
  }
  getAllProjects(): Observable<any> {
    return this.http.get(this.baseurl + '/projects',
      {headers: this.httpHeaders});
  }
  getAllUnits(): Observable<any> {
    return this.http.get(this.baseurl + '/units',
      { headers: this.httpHeaders });
  }

  getAllShapes(): Observable<any> {
    return this.http.get(this.baseurl + '/shapes',
      { headers: this.httpHeaders });
  }
  getAllTanks(): Observable<any> {
    return this.http.get(this.baseurl + '/tanks',
      { headers: this.httpHeaders });
  }


  getOneTank(id): Observable<any> {
    return this.http.get(this.baseurl + '/tank/' + id,
      { headers: this.httpHeaders });
  }

  updateTank(tank, vol): Observable<any> {
    const body = { company: tank.company, unit: tank.unit, shape_id: tank.shape_id, name: tank.name , type: tank.type, weight: tank.weight, length: tank.length, height: tank.height, volume: vol, diameter: tank.diameter, is_project: tank.is_project, project: tank.project};
    return this.http.put(this.baseurl + '/tank/' + tank.id, body,
      { headers: this.httpHeaders });
  }

  createTank(tank, num, vol): Observable<any> {
    const body = { company: tank.company, unit: tank.unit, shape_id: tank.shape_id, id: tank.id, name: tank.name + '-' + num, type: tank.type, weight: tank.weight, length: tank.length, height: tank.height, volume: vol, diameter: tank.diameter, is_project: tank.is_project, project: tank.project};
    return this.http.post(this.baseurl + '/tanks', body,
      { headers: this.httpHeaders });
  }

  deleteTank(id): Observable<any> {
    return this.http.delete(this.baseurl + '/tank/' + id,
    )
  }
}
