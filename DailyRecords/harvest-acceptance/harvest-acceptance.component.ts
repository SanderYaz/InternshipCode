import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { ApiService } from './api.service';
import {MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-harvest-acceptance',
  templateUrl: './harvest-acceptance.component.html',
  styleUrls: ['./harvest-acceptance.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService, ToasterService]
})
export class HarvestAcceptanceComponent implements OnInit {
  harvests = [{ name: 'test' }];
  selectedHarvest;

  fishtypes = [{ name: 'test' }];
  selectedFishtype;

  calibries = [{ name: 'test' }];
  selectedCalibre;

  batches = [{ name: 'test'}];
  selectedBatch;
  fishoperations = [{ name: 'test'}];
  harvestacceptancies = [{ name: 'test' }];
  selectedHarvestacceptance;
  agirlikSay = [];
  ortalamaSay = [];
  calibreSay = [];
  hide: boolean = true;

  constructor(private api: ApiService, private toasterService: ToasterService) {
    this.getHarvests();
    this.selectedHarvest = {company: '', facility: '', unit: '', tank: '', fishtype: '', fishoperation: '', account: '', measurement: '',
      id: '', irsaliye: '', tahminiagirlik: '', tahminiadet: '', weight: '', harvest_hour: '', hasat_date: '', netagirlik: '', netadet: ''};

    this.getFishtypes();
    // tslint:disable-next-line:max-line-length
    this.selectedFishtype = { id: '', name: '', latin_name: '', short_code: '', wikipedia_link: '', survival_rate: '', peaces_eggs_per_gram: '', egg_to_larva_days: ''};

    this.getCalibries();
    this.selectedCalibre = { id: '', name: '', description: ''};
    this.getFishoperations();
    this.getBatches();
    this.selectedBatch = {id: '', name: '', total_feed_consumption: ''};

    this.getHarvestacceptancies();
    this.selectedHarvestacceptance = { harvest: '', fishtype: '', calibre: '', batch: '', fishoperation: '',
      id: '', count: '', weight: '', costumerbarcode: '', ortalama: '' };
  }
  displayedColumns: string[] = [ 'date', 'time', 'harvest', 'fishtype', 'calibre', 'count', 'weight', 'costumerbarcode', 'ortalama', 'update', 'delete'];
  dataSource = new MatTableDataSource<Element>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  updateFunc = (sy) => {
    this.hide = true;
    this.hide = false;
    this.api.getOneHarvestacceptance(sy.id).subscribe(
      data => {
        this.selectedHarvestacceptance = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  getCount = (i) => {
    let agirlik = this.selectedHarvestacceptance.weight;
    let ortalama = this.selectedHarvestacceptance.ortalama;
    let count = this.selectedHarvestacceptance.count;
    count = agirlik / ortalama;
    count = Number(count).toFixed(2);
    return count;
  }

  getHarvests = () => {
    this.api.getAllHarvests().subscribe(
      data => {
        this.harvests = data;
      },
      error => {
        console.log(error);
      }
    )
  }
  getFishoperations = () => {
    this.api.getAllFishoperations().subscribe(
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
    )
  }
  getCalibries = () => {
    this.api.getAllCalibries().subscribe(
      data => {
        this.calibries = data;
      },
      error => {
        console.log(error);
      }
    )
  }
  getBatches = () => {
    this.api.getAllBatches().subscribe(
      data => {
        this.batches = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  getHarvestacceptancies = () => {
    this.api.getAllHarvestacceptancies().subscribe(
      data => {
        this.harvestacceptancies = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  harvestacceptanceClicked = (harvestacceptance) => {
    this.api.getOneHarvestacceptance(harvestacceptance.id).subscribe(
      data => {
        this.selectedHarvestacceptance = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateHarvestacceptance = () => {
    for (let i = 0; i < this.calibries.length; i++) {
      if (!(this.selectedHarvestacceptance.calibre == null)) {
        this.api.updateHarvestacceptance(this.selectedHarvestacceptance, this.selectedHarvestacceptance.calibre, this.agirlikSay[i], this.ortalamaSay[i], this.getCount(i)).subscribe(
          data => {
            this.getHarvestacceptancies();
            this.toasterService.pop('success', 'Başarıyla Güncellendi !', 'Hasat Kabul Girişi Başarıyla Güncellendi. ');
            this.api.getAllHarvestacceptancies().subscribe(stream => {
              this.dataSource = new MatTableDataSource(stream);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            });

          },
          error => {
            console.log(error);
            this.toasterService.pop('error', 'Hata!', 'Girdiğiniz Bilgilerde Hata Var. ');
          }
        )
      }
    }
  }

  deleteHarvestacceptance = (id, elm) => {
    if (!confirm('Silmek İstediğinize Emin Misiniz ?')) {
    } else {
      this.dataSource.data = this.dataSource.data.filter(i => i !== elm);
      this.api.deleteHarvestacceptance(id).subscribe(
        data => {
          this.getHarvestacceptancies();
          this.toasterService.pop('success', 'Başarıyla Silindi!', 'Hasat Sonucu Girişi Başarılı Şekilde Silindi.');
        },
        error => {
          console.log(error);
          this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
        }
      );
    }
  }
  refreshtable = () => {
    this.api.getAllHarvestacceptancies().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  };

  ngOnInit() {
    this.api.getAllHarvestacceptancies().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}
