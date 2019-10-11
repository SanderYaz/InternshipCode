import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ApiService} from './api.service';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService, ToasterService]
})
export class ProjectComponent implements OnInit {
  projects = [{name: 'test'}];
  selectedProject;
  companies = [{name: 'test'}];
  selectedCompany;
  fishtypes = [{name: 'test2'}];
  selectedFishtype;
  hide: boolean = true;

  constructor(private api: ApiService, private toasterService: ToasterService) {
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
      SAP_project_code: ''
    };
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
  }
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });
  displayedColumns: string[] = ['id', 'name', 'fish_type', 'capacity', 'remaining_capacity', 'turnover', 'company', 'project_doc_no', 'SAP_project_code', 'update', 'delete'];
  dataSource = new MatTableDataSource<Element>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateFunc = (sy) => {
    window.scroll(0, 0);
    this.hide = true;
    this.hide = false;
    this.api.getOneProject(sy.id).subscribe(
      data => {
        this.selectedProject = data;
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
  updateProject = (id) => {
    this.api.updateProject(id).subscribe(
      data => {
        this.getProjects();
        this.toasterService.pop('success', 'Başarıyla Güncellendi!', 'Proje Başarılı Şekilde Güncellendi.');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
      }
    );
  };
  deleteProject = (id, elm) => {
    if (!confirm('Silmek İstediğinize Emin Misiniz ?')) {
    } else {
      this.dataSource.data = this.dataSource.data.filter(i => i !== elm);
      this.api.deleteProject(id).subscribe(
        data => {
          this.getCompanies();
          this.toasterService.pop('success', 'Başarıyla Silindi!', 'Proje Başarılı Şekilde Silindi.');
        },
        error => {
          console.log(error);
          this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
        }
      );
    }
  };
  refreshtable = () => {
    this.api.getAllProjects().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  };

  ngOnInit() {
    this.api.getAllProjects().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}
