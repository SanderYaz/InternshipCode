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

  getAllHarvests(): Observable<any> {
    return this.http.get(this.baseurl + '/harvests',
      {headers: this.httpHeaders});
  }

  getAllFishtypes(): Observable<any> {
    return this.http.get(this.baseurl + '/fishtypes',
      {headers: this.httpHeaders});
  }

  getAllCalibries(): Observable<any> {
    return this.http.get(this.baseurl + '/calibries',
      {headers: this.httpHeaders});
  }

  getAllBatches(): Observable<any> {
    return this.http.get(this.baseurl + '/batches',
      {headers: this.httpHeaders});
  }

  getAllHarvestacceptancies(): Observable<any> {
    return this.http.get(this.baseurl + '/harvestacceptancies',
      {headers: this.httpHeaders});
  }

  getOneHarvestacceptance(id): Observable<any> {
    return this.http.get(this.baseurl + '/harvestacceptance/' + id,
      {headers: this.httpHeaders});
  }
  getAllFishoperations(): Observable<any> {
    return this.http.get(this.baseurl + '/fishoperations',
      {headers: this.httpHeaders});
  }

  updateHarvestacceptance(harvestacceptance, calibre, agirlik, ortalama, count): Observable<any> {
    const body = {
      harvest: harvestacceptance.harvest,
      calibre: harvestacceptance.calibre,
      id: harvestacceptance.id,
      fishtype: harvestacceptance.fishtype,
      count: count,
      weight: harvestacceptance.weight,
      costumerbarcode: harvestacceptance.costumerbarcode,
      ortalama: harvestacceptance.ortalama,
      fishoperation: harvestacceptance.fishoperation
    };
    return this.http.put(this.baseurl + '/harvestacceptance/' + harvestacceptance.id, body,
      {headers: this.httpHeaders});
  }

  createHarvestacceptance(harvestacceptance, calibre, agirlik, ortalama, count): Observable<any> {
    const body = {
      harvest: harvestacceptance.harvest,
      calibre: calibre,
      id: harvestacceptance.id,
      fishtype: harvestacceptance.fishtype,
      count: count,
      weight: agirlik,
      costumerbarcode: harvestacceptance.costumerbarcode,
      ortalama: ortalama,
      fishoperation: harvestacceptance.fishoperation
    };
    return this.http.post(this.baseurl + '/harvestacceptancies', body,
      {headers: this.httpHeaders});
  }

  deleteHarvestacceptance(id): Observable<any> {
    return this.http.delete(this.baseurl + '/harvestacceptance/' + id,
    );
  }
}
