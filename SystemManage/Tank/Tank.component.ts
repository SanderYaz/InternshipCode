import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ApiService} from './api.service';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import {MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Tank',
  templateUrl: './Tank.component.html',
  styleUrls: ['./Tank.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService, ToasterService]
})
export class TankComponent implements OnInit {
  companies = [{ name: 'test' }];
  selectedCompany;

  units = [{name: 'test'}];
  selectedUnit;

  projects = [{ name: 'test' }];
  selectedProject;

  shapes = [{name: 'test2'}];
  selectedShape;

  tanks = [{name: 'test3'}];
  selectedTank;
  volum;
  hide: boolean = true;

  constructor(private api: ApiService, private toasterService: ToasterService) {
    this.getUnits();
    this.selectedUnit = {facility: '', id: '', name: '', description: ''};
    this.getCompanies();
    this.selectedCompany = { client: '', id: '', name: '', responsible_person: '', address: '', phone: '', tax_office: '', tax_number: '' };
    this.getShapes();
    this.selectedShape = { id: '', name: ''};
    this.getProjects();
    this.selectedProject = { id: '', name: '', description: '', fish_type: '', capacity: '', remaining_capacity: '', turnover: '', company: '', project_doc_no: '', SAP_project_code: '' };
    this.getTanks();
    this.selectedTank = { id: '', name: '', unit: '', type: '', weight: '', length: '', height: '', volume: '', shape_id: '', diameter: '', is_project: '', project: ''};
  }
  displayedColumns: string[] = ['id', 'name', 'company', 'unit', 'shape_id', 'type', 'weight', 'length', 'height', 'diameter', 'volume',  'is_project', 'project', 'update', 'delete'];
  dataSource = new MatTableDataSource<Element>();

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
  updateFunc = (sy) => {
    window.scroll(0, 0);
    this.hide = true;
    this.hide = false;
    this.api.getOneTank(sy.id).subscribe(
        data => {
          this.selectedTank = data;
        },
        error => {
          console.log(error);
        }
      );
  }

  getVolume = () => {
    let shape = this.selectedTank.shape_id;
    let weight = this.selectedTank.weight;
    let length = this.selectedTank.length;
    let height = this.selectedTank.height;
    let diameter = this.selectedTank.diameter;
    if (shape == 1) {
      this.volum = 3.14 * (diameter / 2) * (diameter / 2) * height;
    } else if (shape == 2) {
      this.volum = weight * length * height;
    }
    this.volum = Number(this.volum).toFixed(2);
    return this.volum;
  }

  getUnits = () => {
    this.api.getAllUnits().subscribe(
      data => {
        this.units = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getShapes = () => {
    this.api.getAllShapes().subscribe(
      data => {
        this.shapes = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getTanks = () => {
    this.api.getAllTanks().subscribe(
      data => {
        this.tanks = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateTank = (id) => {
    this.api.updateTank(id, this.getVolume()).subscribe(
      data => {
        this.getTanks();
        this.toasterService.pop('success', 'Başarıyla Güncellendi !', 'Tank Başarılı Şekilde Güncellendi.');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
      }
    );
  }
  deleteTank = (id, elm) => {
    if (!confirm('Silmek İstediğinize Emin Misiniz ?')) {
    } else {
      this.dataSource.data = this.dataSource.data.filter(i => i !== elm);
      this.api.deleteTank(id).subscribe(
        data => {
          this.getTanks();
          this.toasterService.pop('success', 'Başarıyla Silindi !', 'Tank Başarılı Şekilde Silindi.');
        },
        error => {
          console.log(error);
          this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
        }
      );
    }
  }
  refreshtable = () => {
    this.api.getAllTanks().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {
    this.api.getAllTanks().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

}
