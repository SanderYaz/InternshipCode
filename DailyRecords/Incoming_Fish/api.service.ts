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

  getAllFacilities(): Observable<any> {
    return this.http.get(this.baseurl + '/facilities',
      {headers: this.httpHeaders});
  }

  getAllCompanies(): Observable<any> {
    return this.http.get(this.baseurl + '/companies',
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

  getAllFishtypes(): Observable<any> {
    return this.http.get(this.baseurl + '/fishtypes',
      {headers: this.httpHeaders});
  }

  getAllBatches(): Observable<any> {
    return this.http.get(this.baseurl + '/batches',
      {headers: this.httpHeaders});
  }

  getAllOrigins(): Observable<any> {
    return this.http.get(this.baseurl + '/origins',
      {headers: this.httpHeaders});
  }
  getAllProjects(): Observable<any> {
    return this.http.get(this.baseurl + '/projects',
      {headers: this.httpHeaders});
  }

  getAllFishentries(): Observable<any> {
    return this.http.get(this.baseurl + '/fishentries',
      {headers: this.httpHeaders});
  }

  getOneFishentry(id): Observable<any> {
    return this.http.get(this.baseurl + '/fishentry/' + id,
      {headers: this.httpHeaders});
  }

  updateFishentry(fishentry, Bbio, Bbrut): Observable<any> {
    const body = {
      kafeskodu: fishentry.kafeskodu,
      geldigisirket: fishentry.geldigisirket,
      gidecegisirket: fishentry.gidecegisirket,
      geldigitesis: fishentry.geldigitesis,
      gidecegitesis: fishentry.gidecegitesis,
      geldigiunit: fishentry.geldigiunit,
      account: fishentry.account,
      facility: fishentry.facility,
      unit: fishentry.unit,
      geldigitank: fishentry.geldigitank,
      gidecegitank: fishentry.gidecegitank,
      fishtype: fishentry.fishtype,
      batch: fishentry.batch,
      origins: fishentry.origins,
      project: fishentry.project,
      id: fishentry.id,
      date: fishentry.date,
      irsaliyeno: fishentry.irsaliyeno,
      boylamakodu: fishentry.boylamakodu,
      grad: fishentry.grad,
      agirlik: fishentry.agirlik,
      net: fishentry.net,
      extra: fishentry.extra,
      deform: fishentry.deform,
      telafi: fishentry.telafi,
      brut: fishentry.brut,
      biomasnet: Bbio,
      biomasbrut: Bbrut,
      totalfeed: fishentry.totalfeed
    };
    return this.http.put(this.baseurl + '/fishentry/' + fishentry.id, body,
      {headers: this.httpHeaders});
  }

  createFishentry(fishentry, Bbio, Bbrut): Observable<any> {
    const body = {
      kafeskodu: fishentry.kafeskodu,
      geldigisirket: fishentry.geldigisirket,
      gidecegisirket: fishentry.gidecegisirket,
      geldigitesis: fishentry.geldigitesis,
      gidecegitesis: fishentry.gidecegitesis,
      geldigiunit: fishentry.geldigiunit,
      account: fishentry.account,
      facility: fishentry.facility,
      unit: fishentry.unit,
      geldigitank: fishentry.geldigitank,
      gidecegitank: fishentry.gidecegitank,
      fishtype: fishentry.fishtype,
      batch: fishentry.batch,
      origins: fishentry.origins,
      project: fishentry.project,
      id: fishentry.id,
      date: fishentry.date,
      irsaliyeno: fishentry.irsaliyeno,
      boylamakodu: fishentry.boylamakodu,
      grad: fishentry.grad,
      agirlik: fishentry.agirlik,
      net: fishentry.net,
      extra: fishentry.extra,
      deform: fishentry.deform,
      telafi: fishentry.telafi,
      brut: fishentry.brut,
      totalfeed: fishentry.totalfeed,
      biomasnet: Bbio,
      biomasbrut: Bbrut
    };
    return this.http.post(this.baseurl + '/fishentries', body,
      {headers: this.httpHeaders});
  }
// operasyon gönder alanı için ikinci kez operasyonu göndermesini engeller aşağıdaki kod
  createFishOP(fishentry, Bbio, Bbrut): Observable<any> {
    const body = {
      fishentry: fishentry.id,
      net_quantity: fishentry.net,
      gross_quantity: fishentry.brut,
      fish_type: fishentry.fishtype,
      grading_codes: fishentry.grad,
      before_tank: fishentry.geldigitank,
      kafeskodu: fishentry.kafeskodu,
      life_cycle: '5',
      weight: fishentry.agirlik,
      height: 1,
      batch: fishentry.batch,
      tank: fishentry.gidecegitank,
      origins: [fishentry.origins],
      project: fishentry.project,
      totalfeed: fishentry.totalfeed,
      netfcr: fishentry.netfcr,
      brutfcr: fishentry.brutfcr,
      netbiomas: fishentry.biomasnet,
      brutbiomas: fishentry.biomasbrut
    };
    return this.http.post(this.baseurl + '/fishoperations', body,
      {headers: this.httpHeaders});
  }

  changeFishopr(fishentry): Observable<any> {
    const body = {
      is_opr: true,
      account:  fishentry.account,
      agirlik: fishentry.agirlik,
      brut: fishentry.brut,
      date: fishentry.date,
      deform: fishentry.deform,
      extra: fishentry.extra,
      fishtype: fishentry.fishtype,
      gidecegitank: fishentry.gidecegitank,
      irsaliyeno: fishentry.irsaliyeno,
      net: fishentry.net,
      telafi: fishentry.telafi,
    };
    return this.http.put(this.baseurl + '/fishentry/' + fishentry.id, body,
      {headers: this.httpHeaders});
  }

  deleteFishentry(id): Observable<any> {
    return this.http.delete(this.baseurl + '/fishentry/' + id,
    );
  }
}
