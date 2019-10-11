import { Component, OnInit , ViewChild, ViewEncapsulation } from '@angular/core';
import { ApiService } from './api.service';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import {MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-stock-management',
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService, ToasterService]
})
export class StockManagementComponent implements OnInit {

  companies = [{ name: 'test' }];
  selectedCompany;

  units = [{ name: 'test2' }];
  selectedUnit;

  stocks = [{ name: 'test3' }];
  selectedStock;

  metrics = [{ name: 'test4' }];
  selectedMetric;
  lifecycles = [{name: 'Test4'}];

  stocklevels = [{ name: 'test5' }];
  selectedStocklevel;

  hide: boolean = true;

  constructor(private api: ApiService, private toasterService: ToasterService) {
    this.getCompanies();
    this.selectedCompany = { client: '', id: '', name: '', responsible_person: '', address: '', phone: '', tax_office: '', tax_number: '' };
    this.getUnits();
    this.selectedUnit = {id: '', name: '', description: '', facility: ''};
    this.getStocks();
    this.selectedStock = {id: '', name: '', metric: '', category: '', sapstockcode: '', skt: ''};
    this.getMetrics();
    this.selectedMetric = {id: '', name: '', shortcode: '', description: ''};
    this.getStocklevels();
    this.selectedStocklevel = {id: '', company: '', unit: '', stock: '', quantity: '', metric: ''};
    this.getLifecycles();
  }

  displayedColumns: string[] = ['id', 'sapcode', 'life_cycle', 'company', 'unit', 'stock', 'quantity', 'metric', 'update', 'delete'];
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
  updateFunc = (stocks) => {
    window.scroll(0, 0);
    this.hide = true;
    this.hide = false;
    this.api.getOneStocklevel(stocks.id).subscribe(
      data => {
        this.selectedStocklevel = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  getLifecycles = () => {
    this.api.getAllLifecycles().subscribe(
      data => {
        this.lifecycles = data;
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
  getStocklevels = () => {
    this.api.getAllStocklevels().subscribe(
      data => {
        this.stocklevels = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  stocklevelClicked = (stocklevel) => {
    this.api.getOneStocklevel(stocklevel.id).subscribe(
      data => {
        this.selectedStocklevel = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateStocklevel = (id) => {
    this.api.updateStocklevel(id).subscribe(
      data => {
        this.getStocklevels();
        this.toasterService.pop('success', 'Başarıyla Güncellendi !', 'Birim Başarılı Şekilde Güncellendi.');
        this.api.getAllStocklevels().subscribe(stream => {
          this.dataSource = new MatTableDataSource(stream);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata !', 'Güncelleme Sayfasına Gidemedi !');
      }
    );
  }

  deleteStocklevel = (id, elm) => {
    if (!confirm('Silmek İstediğinize Emin Misiniz ?')) {
    } else {
      this.dataSource.data = this.dataSource.data.filter(i => i !== elm);
      this.api.deleteStocklevel(id).subscribe(
        data => {
          this.getStocklevels();
          this.toasterService.pop('success', 'Başarıyla Silindi!', 'Stok Başarılı Şekilde Silindi.');
        },
        error => {
          console.log(error);
          this.toasterService.pop('error', 'Hata !', 'Silinemedi !');
        }
      );
    }
  }

  refreshtable = () => {
    this.api.getAllStocklevels().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {
    this.api.getAllStocklevels().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}
