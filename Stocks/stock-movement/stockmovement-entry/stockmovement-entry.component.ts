import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';

@Component({
  selector: 'app-stockmovement-entry',
  templateUrl: './stockmovement-entry.component.html',
  styleUrls: ['./stockmovement-entry.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService, ToasterService]
})
export class StockmovementEntryComponent implements OnInit {

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
  stocklevels = [{name: 'test'}];
  metricSay = []; // stoğun metriclerini sayması için
  stokSay = []; // stok idleri sayması için
  sayıSay; // i döngüsünün sayısı kadar
  kutucukSay = []; // transfer edilen yem miktarı. farklı id'lerde kaydedilmesini sağlıyor

  constructor(private api: ApiService, private toasterService: ToasterService) {
    this.getCompanies();
    this.getStocklevels();
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

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });
// stoksay'ın içerisine aldığımız stok id'si giriyor
  funcAdd = (s, stock) => {
    this.stokSay[s] = stock;
    this.sayıSay = s;
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
  };
  getFacilities = () => {
    this.api.getAllFacilities().subscribe(
      data => {
        this.facilities = data;
      },
      error => {
        console.log(error);
      }
    );
  };
  getUnits = () => {
    this.api.getAllUnits().subscribe(
      data => {
        this.units = data;
      },
      error => {
        console.log(error);
      }
    );
  };

  getStocklevels = () => {
    this.api.getAllStocklevels().subscribe(
      data => {
        this.stocklevels = data;
      },
      error => {
        console.log(error);
      }
    );
  };

  getTanks = () => {
    this.api.getAllTanks().subscribe(
      data => {
        this.tanks = data;
      },
      error => {
        console.log(error);
      }
    );
  };
  getAccounts = () => {
    this.api.getAllAccounts().subscribe(
      data => {
        this.accounts = data;
      },
      error => {
        console.log(error);
      }
    );
  };
  getStocks = () => {
    this.api.getAllStocks().subscribe(
      data => {
        this.stocks = data;
      },
      error => {
        console.log(error);
      }
    );
  };
  getMetrics = () => {
    this.api.getAllMetrics().subscribe(
      data => {
        this.metrics = data;
      },
      error => {
        console.log(error);
      }
    );
  };
  getStockmovements = () => {
    this.api.getAllStockmovements().subscribe(
      data => {
        this.stockmovements = data;
      },
      error => {
        console.log(error);
      }
    );
  };
  stockmovementClicked = (stockmovement) => {
    this.api.getOneStockmovement(stockmovement.id).subscribe(
      data => {
        this.selectedStockmovement = data;
      },
      error => {
        console.log(error);
      }
    );
  };

  updateStockmovement = () => {
    this.api.updateStockmovement(this.selectedStockmovement).subscribe(
      data => {
        this.getStockmovements();
        this.toasterService.pop('success', 'Başarıyla Güncellendi !', 'Stok Transferi Başarıyla Güncellendi. ');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata!', 'Girdiğiniz Bilgilerde Hata Var. ');
      }
    );
  };
  //  max 100 yem olacağını hesaplıyor. boş olanları kaydetme deniyor
  createStockmovement = () => {
    for (let s = 0; s < 100; s++) {
      if (!(this.kutucukSay[s] == null)) {
        this.api.createStockmovement(this.selectedStockmovement, this.stokSay[s], this.metricSay[s], this.kutucukSay[s]).subscribe(
          data => {
            this.stockmovements.push(data);
            this.toasterService.pop('success', 'Başarıyla Kaydedildi !', 'Stok Transferi Girişi Başarıyla Eklendi');
            this.selectedStockmovement = []; // Burası Sayfayı Temizliyor.
          },
          error => {
            console.log(error);
            this.toasterService.pop('error', 'Hata', 'Girdiğiniz Bilgilerde Hata Var');
          }
        );
      }
    }
  };
  deleteStockmovement = () => {
    this.api.deleteStockmovement(this.selectedStockmovement.id).subscribe(
      data => {
        this.getStockmovements();
        this.toasterService.pop('success', 'Başarıyla Silindi!', 'Stok Transferi Başarılı Şekilde Silindi.');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
      }
    );
  };

  ngOnInit() {
  }
}
