import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ApiService} from './api.service';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-Incoming_Feed',
  templateUrl: './Incoming_Feed.component.html',
  styleUrls: ['./Incoming_Feed.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService, ToasterService]
})
export class Incoming_FeedComponent implements OnInit {
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
  hide: boolean = true;

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
    this.getConsumptions;
    this.selectedConsumptions = {
      id: '',
      company: '',
      unit: '',
      tank: '',
      stock: '',
      batch: '',
      fish: '',
      stocklevel: '',
      date: '',
      fishoperation: '',
      quantity: '',
      metric: '',
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
    this.getFishoperation();
    this.selectedFishoperation = {
      id: '', net_quantity: '', gross_quantity: '', fish_type: '', grading_codes: '',
      before_tank: '', before_fish_operation_id: '', kafeskodu: '', fishentry: '', is_deleted: '', life_cycle: '', project: '', weight: '',
      height: '', birth_date: '', is_egg: '', egg_fertilization_date: '', batch: '', tank: '',
      origins: '', is_transfer: '', transfer_tank: '', totalfeed: '', netfcr: ''
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
    };
  }

  displayedColumns: string[] = ['id', 'date', 'company', 'unit', 'tank', 'stock', 'batch', 'quantity', 'metric', 'update', 'delete'];
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
    this.hide = true;
    this.hide = false;
    this.api.getOneConsumptions(sy.id).subscribe(
      data => {
        this.selectedConsumptions = data;
      },
      error => {
        console.log(error);
      }
    );
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
  updateConsumptions = () => {
    this.api.updateConsumptions(this.selectedConsumptions).subscribe(
      data => {
        this.getConsumptions();
        this.toasterService.pop('success', 'Başarıyla Güncellendi !', 'Yem Girişi Başarıyla Güncellendi. ');
        this.api.getAllConsumptions().subscribe(stream => {
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
  };
  deleteConsumptions = (id, elm) => {
    if (!confirm('Silmek İstediğinize Emin Misiniz ?')) {
    } else {
      this.dataSource.data = this.dataSource.data.filter(i => i !== elm);
      this.api.deleteConsumptions(id).subscribe(
        data => {
          this.getConsumptions();
          this.toasterService.pop('success', 'Başarıyla Silindi!', 'Yem Girişi Başarılı Şekilde Silindi.');
        },
        error => {
          console.log(error);
          this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
        }
      );
    }
  };
  refreshtable = () => {
    this.api.getAllConsumptions().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  };

  ngOnInit() {
    this.api.getAllConsumptions().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

}
