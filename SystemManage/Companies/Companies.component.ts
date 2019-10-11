import {Component, OnInit, ViewChild} from '@angular/core';
import { ApiService } from './api.service';
import {MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Companies',
  templateUrl: './Companies.component.html',
  styleUrls: ['./Companies.component.scss'],
  providers: [ApiService]
})
export class CompaniesComponent implements OnInit {

  clients = [{ name: 'test' }];
  selectedClient;
  companies = [{ name: 'test' }];
  selectedCompany;
  hide: boolean = true;

  constructor(private api: ApiService) {
    this.getClients();
    this.selectedClient = { id: '', name: '', responsible_person: '', address: '', phone: '', tax_office: '', tax_number: '' };
    this.getCompanies();
    this.selectedCompany = { id: '', name: '', responsible_person: '', address: '', phone: '', tax_office: '', tax_number: '' };
  }

  displayedColumns: string[] = ['id', 'name', 'responsible_person', 'address', 'phone', 'tax_office', 'tax_number', 'update', 'delete'];
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
    this.api.getOneCompany(sy.id).subscribe(
      data => {
        this.selectedCompany = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getClients = () => {
    this.api.getAllClients().subscribe(
      data => {
        this.clients = data;
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

  updateCompany = (sy) => {
    this.api.updateCompany(sy).subscribe(
      data => {
        this.getCompanies();
      },
      error => {
        console.log(error);
      }
    );
  }


  deleteCompany = (sy, elm) => {
    if (!confirm('Silmek İstediğinize Emin Misiniz ?')) {
    } else {
      this.dataSource.data = this.dataSource.data.filter(i => i !== elm);
      this.api.deleteCompany(sy).subscribe(
        data => {
          this.getCompanies();
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  refreshtable = () => {
    this.api.getAllCompanies().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  ngOnInit() {
    this.api.getAllCompanies().subscribe(stream => {
    this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  });
  }

}
