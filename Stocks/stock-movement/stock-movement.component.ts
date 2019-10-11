import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ApiService} from './api.service';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-stock-movement',
  templateUrl: './stock-movement.component.html',
  styleUrls: ['./stock-movement.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService, ToasterService]
})
export class StockMovementComponent implements OnInit {

  companies = [{name: 'test'}];
  selectedCompany;

  facilities = [{name: 'test'}];
  selectedFacility;

  units = [{name: 'test'}];
  selectedUnit;

  tanks = [{name: 'test'}];
  selectedTank;

  accounts = [{name: 'test'}];
  selectedAccount;

  stocks = [{name: 'test'}];
  selectedStock;

  metrics = [{name: 'test'}];
  selectedMetric;

  stockmovements = [{name: 'test'}];
  selectedStockmovement;
  hide: boolean = true;
  hide2: boolean = true;

  constructor(private api: ApiService, private toasterService: ToasterService) {
    this.getCompanies();
    this.selectedCompany = {client: '', id: '', name: '', responsible_person: '', address: '', phone: '', tax_office: '', tax_number: ''};
    this.getFacilities();
    // tslint:disable-next-line:max-line-length
    this.selectedFacility = {
      company: '',
      type: '',
      id: '',
      name: '',
      responsible_person: '',
      address: '',
      phone: '',
      coordinate: '',
      responsible_engineer: ''
    };
    this.getUnits();
    this.selectedUnit = {id: '', name: '', description: '', facility: ''};
    this.getTanks();
    // tslint:disable-next-line:max-line-length
    this.selectedTank = {
      id: '',
      name: '',
      unit: '',
      type: '',
      weight: '',
      length: '',
      height: '',
      volume: '',
      shape_id: '',
      diameter: '',
      is_project: '',
      project: ''
    };
    this.getAccounts();
    this.selectedAccount = {
      id: '',
      name: '',
      is_supplier: '',
      is_customer: '',
      erp_account: '',
      tax_office: '',
      tax_number: '',
      address: '',
      email: '',
      phone: ''
    };
    this.getStocks();
    this.selectedStock = {id: '', name: '', metric: '', category: '', sapstockcode: '', skt: ''};
    this.getMetrics();
    this.selectedMetric = {id: '', name: '', shortcode: '', description: ''};
    this.getStockmovements();
    this.selectedStockmovement = {
      id: '',
      movenumber: '',
      stock: '',
      sourcecompany: '',
      sourcefacility: '',
      sourceunit: '',
      sourcetank: '',
      targetcompany: '',
      targetfacility: '',
      targetunit: '',
      targettank: '',
      targetmetric: '',
      quantity: '',
      is_transfer: '',
      is_deleted: '',
      is_entry: '',
      is_ext: '',
      is_countingentry: '',
      is_countingexit: '',
      is_stockconversion: '',
      irsaliyeno: '',
      account: ''
    };
  }

  displayedColumns: string[] = ['id', 'account', 'movenumber', 'irsaliyeno', 'sourcecompany', 'sourcefacility', 'sourceunit', 'sourcetank', 'targetcompany', 'targetfacility', 'targetunit', 'targettank', 'stockname', 'quantity', 'metric', 'detail', 'update', 'delete'];
  displayedColumns2: string[] = ['id', 'account', 'movenumber', 'irsaliyeno', 'stockname', 'quantity', 'metric', 'detail', 'update', 'delete'];

  displayHead: string[] = ['parent1', 'parent2', 'parent3', 'parent4', 'parent5', 'parent6'];
  displayHead2: string[] = ['parent1', 'parent2', 'parent5'];

  display = this.displayedColumns2;
  displayH = this.displayHead2;

  dataSource = new MatTableDataSource<Element>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  Detail = () => {
    this.hide2 = !this.hide2;
    if (this.hide2 === true) {
      this.displayH = this.displayHead2;
      this.display = this.displayedColumns2;
      this.refreshtable();
    } else {
      this.displayH = this.displayHead;
      this.display = this.displayedColumns;
      this.refreshtable();
    }
  }

  updateFunc = (sy) => {
    window.scroll(0, 0);
    this.hide = true;
    this.hide = false;
    this.api.getOneStockmovement(sy.id).subscribe(
      data => {
        this.selectedStockmovement = data;
      },
      error => {
        console.log(error);
      }
    );
  }

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
  getAccounts = () => {
    this.api.getAllAccounts().subscribe(
      data => {
        this.accounts = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  getStocks = () => {
    this.api.getAllStocks().subscribe(
      data => {
        this.stocks = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  getMetrics = () => {
    this.api.getAllMetrics().subscribe(
      data => {
        this.metrics = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  getStockmovements = () => {
    this.api.getAllStockmovements().subscribe(
      data => {
        this.stockmovements = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  stockmovementClicked = (stockmovement) => {
    this.api.getOneStockmovement(stockmovement.id).subscribe(
      data => {
        this.selectedStockmovement = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  updateStockmovement = (id) => {
    this.api.updateStockmovement(id).subscribe(
      data => {
        this.getStockmovements();
        this.toasterService.pop('success', 'Başarıyla Güncellendi !', 'Stok Hareketleri Başarıyla Güncellendi. ');
        this.api.getAllStockmovements().subscribe(stream => {
          this.dataSource = new MatTableDataSource(stream);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata!', 'Girdiğiniz Bilgilerde Hata Var. ');
      }
    );
  }
  createStockmovement = () => {
    this.api.createStockmovement(this.selectedStockmovement).subscribe(
      data => {
        this.stockmovements.push(data);
        this.companies.push(data);
        this.facilities.push(data);
        this.units.push(data);
        this.tanks.push(data);
        this.accounts.push(data);
        this.stocks.push(data);
        this.metrics.push(data);
        this.toasterService.pop('success', 'Başarıyla Kaydedildi !', 'Stok Hareketleri Girişi Başarıyla Eklendi');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata', 'Girdiğiniz Bilgilerde Hata Var')
      }
    );
  }
  deleteStockmovement = (id, elm) => {
    if (!confirm('Silmek İstediğinize Emin Misiniz ?')) {
    } else {
      this.dataSource.data = this.dataSource.data.filter(i => i !== elm);
      this.api.deleteStockmovement(id).subscribe(
        data => {
          this.getStockmovements();
          this.toasterService.pop('success', 'Başarıyla Silindi!', 'Stok Yönetimi Başarılı Şekilde Silindi.');
        },
        error => {
          console.log(error);
          this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
        }
      );
    }
  }
  refreshtable = () => {
    this.api.getAllStockmovements().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  ngOnInit() {
    this.api.getAllStockmovements().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

}
