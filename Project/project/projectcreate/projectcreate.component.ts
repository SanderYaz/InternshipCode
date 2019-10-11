import {Component, OnInit} from '@angular/core';
import {ApiService} from './api.service';
import {ToasterConfig, ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-projectcreate',
  templateUrl: './projectcreate.component.html',
  styleUrls: ['./projectcreate.component.scss']
})
export class ProjectcreateComponent implements OnInit {
  companies = [{name: 'test'}];
  selectedCompany;
  projects = [{name: 'test'}];
  selectedProject;
  fishtypes = [{name: 'test2'}];
  selectedFishtype;

  constructor(private api: ApiService, private toasterService: ToasterService) {
    this.getCompanies();
    this.selectedCompany = {client: '', id: '', name: '', responsible_person: '', address: '', phone: '', tax_office: '', tax_number: ''};
    this.getFishtypes();
    this.selectedFishtype = {
      id: '',
      name: '',
      latin_name: '',
      short_code: '',
      wikipedia_link: '',
      survival_rate: '',
      peaces_eggs_per_gram: '',
      egg_to_larva_days: ''
    };
    this.getProjects();
    this.selectedProject = {
      id: '',
      name: '',
      description: '',
      fish_type: '',
      capacity: '',
      remaining_capacity: '',
      turnover: '',
      company: '',
      project_doc_no: '',
      SAP_project_code: ''};
  }

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });
  getCompanies = () => {
    this.api.getAllCompanies().subscribe(
      data => {
        this.companies = data;
      },
      error => {
        console.log(error);
      }
    );
  };
  getFishtypes = () => {
    this.api.getAllFishtypes().subscribe(
      data => {
        this.fishtypes = data;
      },
      error => {
        console.log(error);
      }
    );
  };
  getProjects = () => {
    this.api.getAllProjects().subscribe(
      data => {
        this.projects = data;
      },
      error => {
        console.log(error);
      }
    );
  };

  projectClicked = (company) => {
    this.api.getOneProject(company.id).subscribe(
      data => {
        this.selectedCompany = data;
      },
      error => {
        console.log(error);
      }
    );
  };
  createProject = () => {
    this.api.createProject(this.selectedProject).subscribe(
      data => {
        this.projects.push(data);
        this.toasterService.pop('success', 'Başarıyla Kaydedildi !', 'Proje Başarıyla Eklendi');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata', 'Girdiğiniz Bilgilerde Hata Var');
      }
    );
  };

  ngOnInit() {
  }

}
