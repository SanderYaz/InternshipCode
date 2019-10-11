import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ApiService} from './api.service';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';

@Component({
  selector: 'app-Submersion_Create',
  templateUrl: './Submersion_Create.component.html',
  styleUrls: ['./Submersion_Create.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService, ToasterService]
})
export class Submersion_CreateComponent implements OnInit {
  companies = [{name: 'test'}];
  selectedCompany;
  facilities = [{name: 'test'}];
  selectedFacility;
  units = [{name: 'test'}];
  selectedUnit;
  tanks = [{name: 'test'}];
  selectedTank;
  fishtypes = [{name: 'test'}];
  selectedFishtype;
  fishoperations = [{name: 'test'}];
  selectedFishoperation;
  gradingrecords = [{name: 'test'}];
  selectedGradingrecord;
  stocklevels = [{ name: 'test' }];
  stocks = [{ name: 'test' }];
  OrtSay = [];
  bkatSay = [];
  BAdetSay = [];
  quaSay = [];
  fOP = [];
  targetfOP;
  NBio = [];
  tankSay = [];

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
    this.getStocks();
    this.getFishoperation();
    this.selectedFishoperation = {
      id: '', unit: '', net_quantity: '', gross_quantity: '', fish_type: '', grading_codes: '',
      before_tank: '', before_fish_operation_id: '', is_deleted: '', life_cycle: '', weight: '',
      height: '', birth_date: '', is_egg: '', egg_fertilization_date: '', batch: '', tank: '',
      origins: '', is_transfer: '', transfer_tank: '', operationpivots: ''
    };
    this.getFishtypes();
    // tslint:disable-next-line:max-line-length
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
    this.getGradingrecords();
    this.selectedGradingrecord = {
      id: '',
      sourcefishopr: '',
      targetfishopr: '',
      quantity: '',
      weight: '',
      grading: '',
      biomas: '',
      date: '',
      feed: ''
    };
  }

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });
  funcAdd = (qua, s, fOP, NetB, tank) => {
    this.fOP[s] = fOP;
    this.quaSay[s] = qua;
    this.NBio[s] = NetB;
    this.tankSay[s] = tank;
  };
  Bio = (s) => {
    const son = this.BAdetSay[s] * this.OrtSay[s];
    return son;
  };
  TarOP = (s) => {
    this.targetfOP = s;
    return this.targetfOP;
  };
  Yem = (s) => {
    const son2 = Number((this.quaSay[s] / this.NBio[s]) * this.Bio(s)).toFixed(2);
    return son2;
  };
  tuketim = () => {
    for (let s = 0; s < 100; s++) {
      if (!(this.BAdetSay[s] == null)) {
        // tslint:disable-next-line:max-line-length
        this.api.createGradingrecords(this.selectedGradingrecord, this.BAdetSay[s], this.OrtSay[s], this.bkatSay[s], this.Bio(s), this.Yem(s), this.fOP[s], this.tankSay[s]).subscribe(
          data => {
            this.gradingrecords.push(data);
            this.toasterService.pop('success', 'Başarıyla Kaydedildi !', 'Yem Girişi Başarıyla Eklendi');
            this.BAdetSay[s] = [];
            this.OrtSay[s] = [];
            this.bkatSay[s] = [];
            this.selectedGradingrecord = [];
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
    this.api.getAllFishoperations().subscribe(
      data => {
        this.fishoperations = data;
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

  getGradingrecords = () => {
    this.api.getAllGradingrecords().subscribe(
      data => {
        this.gradingrecords = data;
      },
      error => {
        console.log(error);
      }
    );
  };
  updateGradingrecords = () => {
    this.api.updateStocklevels(this.selectedGradingrecord).subscribe(
      data => {
        this.getGradingrecords();
        this.toasterService.pop('success', 'Başarıyla Güncellendi !', 'Boylama Girişi Başarıyla Güncellendi. ');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata!', 'Girdiğiniz Bilgilerde Hata Var. ');
      }
    );
  };

  deleteGradingrecors = () => {
    this.api.deleteGradingrecords(this.selectedGradingrecord.id).subscribe(
      data => {
        this.getGradingrecords();
        this.toasterService.pop('success', 'Başarıyla Silindi!', 'Boylama Girişi Başarılı Şekilde Silindi.');
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
