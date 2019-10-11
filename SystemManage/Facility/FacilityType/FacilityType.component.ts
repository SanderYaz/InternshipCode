import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { ApiService } from './api.service';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-FacilityType',
  templateUrl: './FacilityType.component.html',
  styleUrls: ['./FacilityType.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService, ToasterService]
})
export class FacilityTypeComponent implements OnInit {

  facilitytypes = [{name: 'test'}];
  selectedFacilitytype;
  hide: boolean = true;

  constructor(private api: ApiService, private toasterService: ToasterService) {
    this.getFacilitytypes();
    this.selectedFacilitytype = {id: '', name: ''};
  }
  displayedColumns: string[] = ['id', 'name', 'update', 'delete'];
  dataSource = new MatTableDataSource<Element>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  updateFunc = (sy) => {
    window.scroll(0, 0);
    this.hide = true;
    this.hide = false;
    this.api.getOneFacilitytype(sy.id).subscribe(
      data => {
        this.selectedFacilitytype = data;
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

  facilitytypeClicked = (facilitytype) => {
    this.api.getOneFacilitytype(facilitytype.id).subscribe(
      data => {
        this.selectedFacilitytype = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateFacilitytype = (id) => {
    this.api.updateFacilitytype(id).subscribe(
      data => {
        this.getFacilitytypes();
        this.toasterService.pop('success', 'Başarıyla Güncellendi !', 'Tesis Başarılı Şekilde Güncellendi.');

      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');

      }
    );
  }

  deleteFacilitytype = (id, elm) => {
    if (!confirm('Silmek İstediğinize Emin Misiniz ?')) {
    } else {
      this.dataSource.data = this.dataSource.data.filter(i => i !== elm);
      this.api.deleteFacilitytype(id).subscribe(
        data => {
          this.getFacilitytypes();
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
    this.api.getAllFacilitytypes().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  ngOnInit() {
    this.api.getAllFacilitytypes().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
    });
  }

}
