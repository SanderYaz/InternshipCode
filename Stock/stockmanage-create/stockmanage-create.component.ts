import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from './api.service';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-stockmanage-create',
  templateUrl: './stockmanage-create.component.html',
  styleUrls: ['./stockmanage-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService, ToasterService]
})
export class StockmanageCreateComponent implements OnInit {

  companies = [{name: 'test'}];
  selectedCompany;

  facilities = [{name: 'test'}];
  selectedFacility;

  units = [{name: 'test2'}];
  selectedUnit;

  stocks = [{name: 'test3'}];
  selectedStock;

  metrics = [{name: 'test4'}];
  selectedMetric;

  stocklevels = [{name: 'test5'}];
  selectedStocklevel;

  lifecycles = [{name: 'test'}];


  constructor(private api: ApiService, private toasterService: ToasterService) {
    this.getCompanies();
    this.selectedCompany = { client: '', id: '', name: '', responsible_person: '', address: '', phone: '', tax_office: '', tax_number: '' };
    this.getFacilities();
    this.selectedFacility = {company: '', facilitytype: '', id: '', name: '', responsible_person: '', address: '', phone: '', coordinate: '', responsible_engineer: '' };
    this.getUnits();
    this.selectedUnit = {id: '', name: '', description: '', facility: ''};
    this.getStocks();
    this.selectedStock = {id: '', name: '', metric: '', category: '', sapstockcode: '', skt: ''};
    this.getMetrics();
    this.selectedMetric = {id: '', name: '', shortcode: '', description: ''};
    this.getStocklevels();
    this.selectedStocklevel = {id: '', company: '', unit: '', stock: '', quantity: '', metric: '', life_cycle: ''};
    this.getLifecycles();
  }
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

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
  getLifecycles = () => {
    this.api.getAllLifecycles().subscribe(
      data => {
        this.lifecycles = data;
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

  updateStocklevel= () => {
    this.api.updateStocklevel(this.selectedStocklevel).subscribe(
      data => {
        this.getStocklevels();
        this.toasterService.pop('success', 'Başarıyla Güncellendi !', 'Stok Yönetimi Başarılı Şekilde Güncellendi.');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
      }
    );
  }
  createStocklevel = () => {
    this.api.createStocklevel(this.selectedStocklevel ).subscribe(
      data => {
        this.stocklevels.push(data);
        this.toasterService.pop('success', 'Başarıyla Kaydedildi !', 'Stok Yönetimi Başarılı Şekilde kaydedildi.');
        this.selectedStocklevel = [];
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
      }
    );
  }
  deleteStocklevel = () => {
    this.api.deleteStocklevel(this.selectedStocklevel.id).subscribe(
      data => {
        this.getStocklevels();
        this.toasterService.pop('success', 'Başarıyla Silindi!', 'Stok Yönetimi Başarılı Şekilde Silindi.');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
      }
    );
  }

  ngOnInit() {
  }

}
