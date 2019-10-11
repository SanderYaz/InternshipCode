import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ApiService} from './api.service';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';

@Component({
  selector: 'app-accept-create',
  templateUrl: './accept-create.component.html',
  styleUrls: ['./accept-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService, ToasterService]
})
export class AcceptCreateComponent implements OnInit {

  harvests = [{name: 'test'}];
  selectedHarvest;

  fishtypes = [{name: 'test'}];
  selectedFishtype;

  fishoperations = [{name: 'test'}];
  selectedFishoperation;

  calibries = [{name: 'test'}];
  selectedCalibre;

  harvestacceptancies = [{name: 'test'}];
  selectedHarvestacceptance;
  agirlikSay = [];
  ortalamaSay = [];
  calibreSay = [];
  hour;
  date;
  constructor(private api: ApiService, private toasterService: ToasterService) {
    this.getHarvests();
    this.selectedHarvest = {
      company: '', facility: '', unit: '', tank: '', fishoperation: '', account: '', project: '',
      id: '', irsaliye: '', tahminiagirlik: '', tahminiadet: '', weight: '', harvest_hour: '', shipname: '',  hasat_date: ''
    };

    this.getCalibries();
    this.selectedCalibre = {id: '', name: '', description: ''};

    this.getHarvestacceptancies();
    this.selectedHarvestacceptance = {
      harvest: '',
      calibre: '',
      fishoperation: '',
      id: '',
      count: '',
      weight: '',
      costumerbarcode: '',
      ortalama: ''
    };
    this.getFishoperations();
    this.getFishtypes();
    this.selectedFishoperation = {
      id: '', net_quantity: '', gross_quantity: '', fish_type: '', grading_codes: '',
      before_tank: '', before_fish_operation_id: '', kafeskodu: '', fishentry: '', is_deleted: '', life_cycle: '', project: '', weight: '',
      height: '', birth_date: '', is_egg: '', egg_fertilization_date: '', batch: '', tank: '',
      origins: '', is_transfer: '', transfer_tank: '', totalfeed: '', netfcr: '', brutfcr: '', netbiomas: '', brutbiomas: ''
    };
  }


  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  getCount = (i) => {
    let agirlik = this.agirlikSay[i];
    let ortalama = this.ortalamaSay[i];
    let count = this.selectedHarvestacceptance.count;
    count = agirlik / ortalama;
    count = Number(count).toFixed(2);
    return count;
  };
  getHarvests = () => {
    this.api.getAllHarvests().subscribe(
      data => {
        this.harvests = data;
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
  getCalibries = () => {
    this.api.getAllCalibries().subscribe(
      data => {
        this.calibries = data;
      },
      error => {
        console.log(error);
      }
    );
  };
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

  getHarvestacceptancies = () => {
    this.api.getAllHarvestacceptancies().subscribe(
      data => {
        this.harvestacceptancies = data;
      },
      error => {
        console.log(error);
      }
    );
  };
  createHarvestacceptance = () => {
    for (let i = 0; i < this.calibries.length; i++) {
      if (!(this.selectedHarvestacceptance.calibre[i] == null)) {
        this.api.createHarvestacceptance(this.selectedHarvestacceptance, this.selectedHarvestacceptance.calibre[i], this.agirlikSay[i], this.ortalamaSay[i], this.getCount(i)).subscribe(stream => {
            this.toasterService.pop('success', 'Başarıyla Kaydedildi !', 'Hasat Kabul Girişi Başarıyla Kaydedildi. ');
            this.selectedHarvestacceptance = [];
            this.selectedHarvestacceptance.calibre = [];
            this.agirlikSay = [];
            this.ortalamaSay = [];
          },
          error => {
            console.log(error);
            this.toasterService.pop('error', 'Hata', 'Girdiğiniz Bilgilerde Hata Var');
          }
        );
      }
    }
  };

  ngOnInit() {
  }

}
