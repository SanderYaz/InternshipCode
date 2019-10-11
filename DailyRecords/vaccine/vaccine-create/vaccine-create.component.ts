import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ApiService} from './api.service';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-vaccine-create',
  templateUrl: './vaccine-create.component.html',
  styleUrls: ['./vaccine-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService, ToasterService]
})
export class VaccineCreateComponent implements OnInit {
  companies = [{name: 'test'}];
  selectedCompany;
  facilities = [{name: 'test'}];
  selectedFacility;
  units = [{name: 'test'}];
  selectedUnit;
  tanks = [{name: 'test'}];
  selectedTank;
  stocks = [{name: 'test'}];
  selectedStock;
  batches = [{name: 'test'}];
  selectedBatch;
  metrics = [{name: 'test'}];
  selectedMetric;
  stockcategories = [{name: 'test'}];
  selectedStockcategory;
  stocklevels = [{name: 'test'}];
  selectedStocklevels;
  consumptions = [{name: 'test'}];
  selectedConsumptions;
  fishtypes = [{name: 'test2'}];
  selectedFishtype;
  fishoperations = [{name: 'test2'}];
  selectedFishoperation;
  tankSay = [];
  fishOP = [];
  batchSay = [];
  stokSay = [];
  slevelSay = [];
  kutucukSay = [];
  num;

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
    this.getStocks();
    this.selectedStock = {id: '', name: '', metric: '', category: '', sapstockcode: '', skt: ''};
    this.getBatches();
    this.selectedBatch = {id: '', name: '', total_feed_consumption: ''};
    this.getMetrics();
    this.selectedMetric = {id: '', name: '', shortcode: '', description: ''};
    this.getStockcategories();
    this.selectedStockcategory = {id: '', name: '', shortcode: '', maincategory: ''};
    this.getConsumptions();
    this.selectedConsumptions = {
      id: '',
      company: '',
      unit: '',
      tank: '',
      stock: '',
      is_feed: '',
      batch: '',
      stocklevel: '',
      date: '',
      fishoperation: '',
      quantity: '',
      metric: ''
    };
    this.getStocklevels();
    this.selectedStocklevels = {
      id: '',
      company: '',
      unit: '',
      life_cycle: '',
      stock: '',
      quantity: '',
      metric: '',
    }
    this.getFishoperation();
    this.selectedFishoperation = {
      id: '', net_quantity: '', gross_quantity: '', fish_type: '', grading_codes: '',
      before_tank: '', before_fish_operation_id: '', kafeskodu: '', fishentry: '', is_deleted: '', life_cycle: '', project: '', weight: '',
      height: '', birth_date: '', is_egg: '', egg_fertilization_date: '', batch: '', tank: '',
      origins: '', is_transfer: '', transfer_tank: '', totalfeed: '', netfcr: '', brutfcr: '', netbiomas: '', brutbiomas: ''
    };
    this.getFishtypes();
    this.selectedFishtype = {
      id: '',
      name: '',
      latin_name: '',
      short_code: '',
      wikipedia_link: '',
      survival_rate: '',
      peaces_eggs_per_gram: '',
      egg_to_larva_days: ''
    };
  }

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  funcAdd = (tank, slevel, stok, i, OP, batch) => {
    this.tankSay[i] = tank;
    this.slevelSay[i] = slevel;
    this.stokSay[i] = stok;
    this.num = i + 100;
    this.fishOP[i] = OP;
    this.batchSay[i] = batch;

  };
  tuketim = () => {
    for (let i = 0; i < this.num; i++) {
      if (!(this.kutucukSay[i] == null)) {
        this.api.createConsumptions(this.selectedStocklevels, this.tankSay[i], this.slevelSay[i], this.stokSay[i], this.kutucukSay[i], this.fishOP[i], this.batchSay[i]).subscribe(
          data => {
            this.consumptions.push(data);
            this.toasterService.pop('success', 'Başarıyla Kaydedildi !', 'Yem Girişi Başarıyla Eklendi');
            this.selectedStocklevels = [];
            this.tankSay[i] = [];
            this.slevelSay[i] = [];
            this.stokSay[i] = [];
            this.kutucukSay[i] = [];
          },
          error => {
            console.log(error);
            this.toasterService.pop('error', 'Hata', 'Girdiğiniz Bilgilerde Hata Var');
          }
        );
      }
    }
  };
  getFishoperation = () => {
    this.api.getAllFishOp().subscribe(
      data => {
        this.fishoperations = data;
      },
      error => {
        console.log(error);
      }
    );
  };
  getFishtypes = () => {
    this.api.getAllFishtypes().subscribe(
      data => {
        this.fishtypes = data;
      },
      error => {
        console.log(error);
      }
    );
  };
  getConsumptions = () => {
    this.api.getAllConsumptions().subscribe(
      data => {
        this.consumptions = data;
      },
      error => {
        console.log(error);
      }
    );
  };
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
  getBatches = () => {
    this.api.getAllBatches().subscribe(
      data => {
        this.batches = data;
      },
      error => {
        console.log(error);
      }
    );
  };
  getStockcategories = () => {
    this.api.getAllStockcategories().subscribe(
      data => {
        this.stockcategories = data;
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

  stocklevelsClicked = (stocklevels) => {
    this.api.getOneStocklevels(stocklevels.id).subscribe(
      data => {
        this.selectedStocklevels = data;
      },
      error => {
        console.log(error);
      }
    );
  };
  updateStocklevels = () => {
    this.api.updateStocklevels(this.selectedStocklevels).subscribe(
      data => {
        this.getStocklevels();
        this.toasterService.pop('success', 'Başarıyla Güncellendi !', 'Yem Girişi Başarıyla Güncellendi. ');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata!', 'Girdiğiniz Bilgilerde Hata Var. ');
      }
    );
  };
  createStocklevels = () => {
    this.api.createStocklevels(this.selectedStocklevels).subscribe(
      data => {
        this.stocklevels.push(data);
        this.toasterService.pop('success', 'Başarıyla Kaydedildi !', 'Yem Girişi Başarıyla Eklendi');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata', 'Girdiğiniz Bilgilerde Hata Var');
      }
    );
  };
  deleteStocklevels = () => {
    this.api.deleteStocklevels(this.selectedStocklevels.id).subscribe(
      data => {
        this.getStocklevels();
        this.toasterService.pop('success', 'Başarıyla Silindi!', 'Yem Girişi Başarılı Şekilde Silindi.');
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
