import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ApiService} from '../api.service';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService, ToasterService]
})
export class ProjectDetailComponent implements OnInit {
  projects = [{ name: 'test' }];
  selectedProject;
  projectdetails = [{ name: 'test' }];
  selectedProjectdetails;
  companies = [{ name: 'test' }];
  selectedCompany;
  fishtypes = [{ name: 'test2' }];
  selectedFishtype;
  hide: boolean = true;
  hide2: boolean = true;
  constructor(private api: ApiService, private toasterService: ToasterService) {
    this.getProjects();
    this.selectedProject = { client: '', id: '', name: '', responsible_person: '', address: '', phone: '', tax_office: '', tax_number: '' };
    this.getCompanies();
    this.selectedCompany = { client: '', id: '', name: '', responsible_person: '', address: '', phone: '', tax_office: '', tax_number: ''};
    this.getFishtypes();
    this.selectedFishtype = { id: '', name: '', latin_name: '', short_code: '', wikipedia_link: '', survival_rate: '', peaces_eggs_per_gram: '', egg_to_larva_days: ''};
    this.getProjectdetails();
    this.selectedProjectdetails = {  id: '', project: '', fishtype: '', capacity: '', remaining_capacity: ''};
  }
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });
  displayedColumns: string[] = [ 'id', 'project', 'fishtype', 'capacity', 'remaining_capacity', 'update', 'delete'];
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
    this.api.getOneProjectdetail(sy.id).subscribe(
      data => {
        this.selectedProject = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  creaateFunc = () => {
    window.scroll(0, 0);
    this.hide2 = true;
    this.hide2 = false;
  }

  getFishtypes = () => {
    this.api.getAllFishtypes().subscribe(
      data => {
        this.fishtypes = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  getProjects = () => {
    this.api.getAllProjects().subscribe(
      data => {
        this.projects = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  getProjectdetails = () => {
    this.api.getAllProjectdetails().subscribe(
      data => {
        this.projectdetails = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getCompanies = () => {
    this.api.getAllCompanies().subscribe(
      data => {
        this.companies = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  createProjectdetail = () => {
    this.api.createProjectdetail(this.selectedProject).subscribe(
      data => {
        this.projects.push(data);
        this.toasterService.pop('success', 'Başarıyla Kaydedildi !', 'Tesis Başarıyla Eklendi');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata', 'Girdiğiniz Bilgilerde Hata Var')
      }
    );
  }

  updateProjectdetail = (id) => {
    this.api.updateProjectdetail(id).subscribe(
      data => {
        this.getProjects();
        this.toasterService.pop('success', 'Başarıyla Silindi!', 'Proje Başarılı Şekilde Güncellendi.');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
      }
    );
  }
  deleteProjectdetail = (id, elm) => {
    if (!confirm('Silmek İstediğinize Emin Misiniz ?')) {
    } else {
      this.dataSource.data = this.dataSource.data.filter(i => i !== elm);
      this.api.deleteProjectdetail(id).subscribe(
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
  }

  refreshtable = () => {
    this.api.getAllProjectdetails().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {
    this.api.getAllProjectdetails().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}
