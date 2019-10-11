import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { ApiService } from './api.service';
import {MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-facility',
  templateUrl: './Facility.component.html',
  styleUrls: ['./Facility.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService, ToasterService]
})
export class FacilityComponent implements OnInit {

  companies = [{ name: 'test' }];
  selectedCompany;

  facilitytypes = [{ name: 'test' }];
  selectedFacilitytype;

  facilities = [{ name: 'test' }];
  selectedFacility;
  hide: boolean = true;

  constructor(private api: ApiService, private toasterService: ToasterService) {
    this.getCompanies();
    this.selectedCompany = { client: '', id: '', name: '', responsible_person: '', address: '', phone: '', tax_office: '', tax_number: '' };

    this.getFacilitytypes();
    this.selectedFacilitytype = { id: '', name: '', description: '' };

    this.getFacilities();
    this.selectedFacility = { company: '', type: '', id: '', name: '', responsible_person: '', address: '', phone: '', coordinate: '', responsible_engineer: '' };
   }
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  displayedColumns: string[] = [ 'id', 'company', 'type', 'name', 'responsible_person', 'responsible_engineer', 'address', 'phone', 'coordinate', 'update', 'delete'];
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
    this.api.getOneFacility(sy.id).subscribe(
      data => {
        this.selectedFacility = data;
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

  getFacilitytypes = () => {
    this.api.getAllFacilitytypes().subscribe(
      data => {
        this.facilitytypes = data;
      },
      error => {
        console.log(error);
      }
    );
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


  updateFacility = (sy) => {
    this.api.updateFacility(sy).subscribe(
      data => {
        this.getFacilities();
        this.toasterService.pop('success', 'Başarıyla Silindi!', 'Client Başarılı Şekilde Silindi.');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
      }
    );
  }

  createFacility = () => {
    this.api.createFacility(this.selectedFacility, this.selectedFacilitytype, this.selectedCompany).subscribe(
      data => {
        this.facilities.push(data);
        this.facilitytypes.push(data);
        this.companies.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteFacility = (sy, elm) => {
    if (!confirm('Silmek İstediğinize Emin Misiniz ?')) {
    } else {
      this.dataSource.data = this.dataSource.data.filter(i => i !== elm);
      this.api.deleteFacility(sy).subscribe(
        data => {
          this.getFacilities();
          this.toasterService.pop('success', 'Başarıyla Silindi!', 'Başarılı Şekilde Silindi.');
        },
        error => {
          console.log(error);
          this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
        }
      );
    }
  }
  refreshtable = () => {
    this.api.getAllFacilities().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.api.getAllFacilities().subscribe(stream => {
    this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }
}
