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

  getAllFishoperations(): Observable<any> {
    return this.http.get(this.baseurl + '/fishoperations',
      {headers: this.httpHeaders});
  }

  getAllFishtypes(): Observable<any> {
    return this.http.get(this.baseurl + '/fishtypes',
      {headers: this.httpHeaders});
  }

  getAllMeasurements(): Observable<any> {
    return this.http.get(this.baseurl + '/measurements',
      {headers: this.httpHeaders});
  }

  getAllHarvests(): Observable<any> {
    return this.http.get(this.baseurl + '/harvests',
      {headers: this.httpHeaders});
  }
  getAllProjects(): Observable<any> {
    return this.http.get(this.baseurl + '/projects',
      {headers: this.httpHeaders});
  }
  getOneHarvest(id): Observable<any> {
    return this.http.get(this.baseurl + '/harvest/' + id,
      {headers: this.httpHeaders});
  }

  updateHarvest(harvest): Observable<any> {
    const body = {
      company: harvest.company,
      facility: harvest.facility,
      unit: harvest.unit,
      tank: harvest.tank,
      account: harvest.account,
      fishoperation: harvest.fishoperation,
      irsaliye: harvest.irsaliye,
      project: harvest.project,
      tahminiagirlik: 330,
      tahminiadet: harvest.tahminiadet,
      weight: harvest.weight,
      harvest_hour: harvest.harvest_hour,
      shipname: harvest.shipname,
      hasat_date: harvest.hasat_date
    };
    return this.http.put(this.baseurl + '/harvest/' + harvest.id, body,
      {headers: this.httpHeaders});
  }

  createHarvest(harvest, adet): Observable<any> {
    const body = {
      company: harvest.company,
      facility: harvest.facility,
      unit: harvest.unit,
      tank: harvest.tank,
      account: harvest.account,
      project: harvest.project,
      fishoperation: harvest.fishoperation,
      id: harvest.id,
      irsaliye: harvest.irsaliye,
      tahminiagirlik: 330,
      tahminiadet: adet,
      weight: harvest.weight,
      harvest_hour: harvest.harvest_hour,
      shipname: harvest.shipname,
      hasat_date: harvest.hasat_date
    };
    return this.http.post(this.baseurl + '/harvests', body,
      {headers: this.httpHeaders});
  }

  deleteHarvest(id): Observable<any> {
    return this.http.delete(this.baseurl + '/harvest/' + id,
    );
  }
}
