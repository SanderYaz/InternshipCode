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

  getAllProjects(): Observable<any> {
    return this.http.get(this.baseurl + '/projects',
      {headers: this.httpHeaders});
  }

  getAllFishtypes(): Observable<any> {
    return this.http.get(this.baseurl + '/fishtypes',
      {headers: this.httpHeaders});
  }

  getOneProject(id): Observable<any> {
    return this.http.get(this.baseurl + '/project/' + id,
      {headers: this.httpHeaders});
  }

  updateProject(project): Observable<any> {
    const body = {
      name: project.name,
      description: project.description,
      fish_type: project.fish_type,
      capacity: project.capacity,
      remaining_capacity: project.remaining_capacity,
      turnover: project.turnover,
      company: project.company,
      project_doc_no: project.project_doc_no,
      SAP_project_code: project.SAP_project_code
    };
    return this.http.put(this.baseurl + '/project/' + project.id, body,
      {headers: this.httpHeaders});
  }

  createProject(project): Observable<any> {
    const body = {
      id: project.id,
      name: project.name,
      description: project.description,
      fish_type: project.fish_type,
      capacity: project.capacity,
      remaining_capacity: project.remaining_capacity,
      turnover: project.turnover,
      company: project.company,
      project_doc_no: project.project_doc_no,
      SAP_project_code: project.SAP_project_code
    };
    return this.http.post(this.baseurl + '/projects', body,
      {headers: this.httpHeaders});
  }

  deleteProject(id): Observable<any> {
    return this.http.delete(this.baseurl + '/project/' + id,
    );
  }
}
