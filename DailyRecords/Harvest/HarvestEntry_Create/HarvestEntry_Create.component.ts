import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {ApiService} from './api.service';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-HarvestEntry_Create',
  templateUrl: './HarvestEntry_Create.component.html',
  styleUrls: ['./HarvestEntry_Create.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService, ToasterService]
})
// tslint:disable-next-line:class-name
export class HarvestEntry_CreateComponent implements OnInit {

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

  fishoperations = [{name: 'test'}];
  selectedFishOperation;

  fishtypes = [{name: 'test'}];
  selectedFishtype;

  measurements = [{name: 'test'}];
  selectedMeasurement;
  projects = [{name: 'test'}];
  selectedProject;

  harvests = [{name: 'test'}];
  selectedHarvest;
  adet;

  constructor(private api: ApiService, private toasterService: ToasterService) {
    this.getCompanies();
    this.selectedCompany = {client: '', id: '', name: '', responsible_person: '', address: '', phone: '', tax_office: '', tax_number: ''};
    this.getProjects();
    // tslint:disable-next-line:max-line-length
    this.selectedProject = {
      id: '',
      name: '',
      description: '',
      fish_type: '',
      capacity: '',
      remaining_capacity: '',
      turnover: '',
      company: '',
      project_doc_no: '',
      SAP_project_code: ''
    };
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

    this.getFishoperations();
    this.selectedFishOperation = {
      id: '', net_quantity: '', gross_quantity: '', fish_type: '', grading_codes: '',
      before_tank: '', before_fish_operation_id: '', kafeskodu: '', fishentry: '', is_deleted: '', life_cycle: '', project: '', weight: '',
      height: '', birth_date: '', is_egg: '', egg_fertilization_date: '', batch: '', tank: '',
      origins: '', is_transfer: '', transfer_tank: '', totalfeed: '', netfcr: '', brutfcr: '', netbiomas: '', brutbiomas: ''
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

    this.getMeasurements();
    this.selectedMeasurement = {id: '', name: '', description: '', value: ''};

    this.getHarvests();
    this.selectedHarvest = {
      company: '', facility: '', unit: '', tank: '', fishoperation: '', account: '', project: '',
      id: '', irsaliye: '',  tahminiagirlik: '', tahminiadet: '', weight: '', harvest_hour: '', shipname: '', hasat_date: ''
    };
  }

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  Hasatadet = () => {
    let weight = this.selectedHarvest.weight;
    let agirlik = 330;
    this.adet = weight * agirlik;
    this.adet = Number(this.adet).toFixed(2);
    return this.adet;
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
  getProjects = () => {
    this.api.getAllProjects().subscribe(
      data => {
        this.projects = data;
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
  getMeasurements = () => {
    this.api.getAllMeasurements().subscribe(
      data => {
        this.measurements = data;
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
  harvestClicked = (harvest) => {
    this.api.getOneHarvest(harvest.id).subscribe(
      data => {
        this.selectedHarvest = data;
      },
      error => {
        console.log(error);
      }
    );
  };
  updateHarvest = () => {
    this.api.updateHarvest(this.selectedHarvest).subscribe(
      data => {
        this.getHarvests();
        this.toasterService.pop('success', 'Başarıyla Güncellendi !', 'Hasat Girişi Başarıyla Güncellendi. ');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata!', 'Girdiğiniz Bilgilerde Hata Var. ');
      }
    );
  };
  createHarvest = () => {
    this.api.createHarvest(this.selectedHarvest, this.Hasatadet()).subscribe(
      data => {
        this.harvests.push(data);
        this.toasterService.pop('success', 'Başarıyla Kaydedildi !', 'Hasat Girişi Başarıyla Eklendi');
        this.selectedHarvest = [];
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata', 'Girdiğiniz Bilgilerde Hata Var');
      }
    );
  };
  deleteHarvest = () => {
    this.api.deleteHarvest(this.selectedHarvest.id).subscribe(
      data => {
        this.getHarvests();
        this.toasterService.pop('success', 'Başarıyla Silindi!', 'Hasat Girişi Başarılı Şekilde Silindi.');
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
