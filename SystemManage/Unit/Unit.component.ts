import {Component, OnInit, ViewChild} from '@angular/core';
import { ApiService } from './api.service';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import {MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-Unit',
  templateUrl: './Unit.component.html',
  styleUrls: ['./Unit.component.scss'],
  providers: [ApiService]
})
export class UnitComponent implements OnInit {
  facilities = [{ name: 'test' }];
  selectedFacility;

  companies = [{ name: 'test' }];
  selectedCompany;

  units = [{ name: 'test' }];
  selectedUnit;
  hide: boolean = true;

  constructor(private api: ApiService, private toasterService: ToasterService) {
    this.getFacilities();
    this.selectedFacility = {company: '', facilitytype: '', id: '', name: '', responsible_person: '', address: '', phone: '', coordinate: '', responsible_engineer: ''};
    this.getUnits();
    this.selectedUnit = {id: '', name: '', description: '', facility: ''};
    this.getCompanies();
    this.selectedCompany = { client: '', id: '', name: '', responsible_person: '', address: '', phone: '', tax_office: '', tax_number: '' };
  }

  displayedColumns: string[] = ['id', 'facility', 'name', 'description', 'update', 'delete'];
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
  updateFunc = (sy) => {
    window.scroll(0, 0);
    this.hide = true;
    this.hide = false;
    this.api.getOneUnit(sy.id).subscribe(
      data => {
        this.selectedUnit = data;
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
    )
  }
  getFacilities = () => {
    this.api.getAllFacilities().subscribe(
      data => {
        this.facilities = data;
      },
      error => {
        console.log(error);
      }
    );
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

  unitClicked = (unit) => {
    this.api.getOneUnit(unit.id).subscribe(
      data => {
        this.selectedUnit = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateUnit = (id) => {
    this.api.updateUnit(id).subscribe(
      data => {
        this.getUnits();
        this.toasterService.pop('success', 'Başarıyla Güncellendi !', 'Birim Başarılı Şekilde Güncellendi.');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata !', 'Güncelleme Sayfasına Gidemedi !');
      }
    );
  }

  deleteUnit = (id, elm) => {
    if (!confirm('Silmek İstediğinize Emin Misiniz ?')) {
    } else {
      this.dataSource.data = this.dataSource.data.filter(i => i !== elm);
      this.api.deleteUnit(id).subscribe(
        data => {
          this.getUnits();
          this.toasterService.pop('success', 'Başarıyla Silindi!', 'Birim Başarılı Şekilde Silindi.');
        },
        error => {
          console.log(error);
          this.toasterService.pop('error', 'Hata !', 'Silinemedi !');
        }
      );
    }
  }
  refreshtable = () => {
    this.api.getAllUnits().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  ngOnInit() {
    this.api.getAllUnits().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}
