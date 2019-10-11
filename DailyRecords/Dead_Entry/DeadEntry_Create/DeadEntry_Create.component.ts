import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ApiService } from './api.service';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';


@Component({
  selector: 'app-DeadEntry_Create',
  templateUrl: './DeadEntry_Create.component.html',
  styleUrls: ['./DeadEntry_Create.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService, ToasterService]
})
export class DeadEntry_CreateComponent implements OnInit {
  companies = [{ name: 'test' }];
  selectedCompany;
  facilities = [{ name: 'test' }];
  selectedFacility;
  units = [{ name: 'test' }];
  selectedUnit;
  tanks = [{ name: 'test' }];
  selectedTank;
  fishoperations = [{ name: 'test'}];
  selectedFishoperation;
  mortalitytypes = [ {name: 'test'}];
  selectedMortalitytype;
  mortalityentries = [{name: 'test'}];
  selectedMortality;
  fishtypes = [{name: 'test'}];
  tankSay = [];
  typeSay = [];
  OPSay = [];
  kutucukSay = [];

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
    this.getFishtypes();
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
    this.getFishoperations();
    this.selectedFishoperation = {
      id: '',
      net_quantity: '',
      gross_quantity: '',
      fish_type: '',
      grading_codes: '',
      before_tank: '',
      before_fish_operation_id: '',
      kafeskodu: '',
      fishentry: '',
      is_deleted: '',
      life_cycle: '',
      project: '',
      weight: '',
      height: '',
      birth_date: '',
      is_egg: '',
      egg_fertilization_date: '',
      batch: '',
      tank: '',
      origins: '',
      is_transfer: '',
      transfer_tank: '',
      totalfeed: '',
      netbiomas: '',
      brutbiomas: '',
      netfcr: '',
      brutfcr: ''
    };
    this.getMortalitytypes();
    this.selectedMortalitytype = {id: '', name: '', description: ''};
    this.getMortalityentries();
    this.selectedMortality = {
      id: '',
      date: '',
      tank: '',
      fishopr: '',
      company: '',
      facility: '',
      unit: '',
      quantity: '',
      fish: '',
      mortalitytype: ''
    };
  }
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  funcAdd = (tank, type, i, fishOP) => {
    this.tankSay[i] = tank;
    this.typeSay[i] = type;
    this.OPSay[i] = fishOP;
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
  getFishoperations = () => {
    this.api.getAllFishoperations().subscribe(
      data => {
        this.fishoperations = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  getMortalitytypes = () => {
    this.api.getAllMortalitytypes().subscribe(
      data => {
        this.mortalitytypes = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  getMortalityentries = () => {
    this.api.getAllMortalityentries().subscribe(
      data => {
        this.tanks = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  mortalityClicked = (mortalityentries) => {
    this.api.getOneMortalityentries(mortalityentries.id).subscribe(
      data => {
        this.selectedMortality = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  getFishtypes = () => {
    this.api.getAllFishtypes().subscribe(
      data => {
        this.fishtypes = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateMortalityentry = () => {
    this.api.updateMortalityentry(this.selectedMortality).subscribe(
      data => {
        this.getMortalityentries();
        this.toasterService.pop('success', 'Başarıyla Güncellendi !', 'Ölü Girişi Başarıyla Güncellendi. ');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata!', 'Girdiğiniz Bilgilerde Hata Var. ');
      }
    );
  }
  createMortalityentry = () => {
    for (let i = 0; i < (this.tanks.length * 1000); i++) {
      if (!(this.kutucukSay[i] == null)) {
        // tslint:disable-next-line:max-line-length
        this.api.createMortalityentry(this.selectedMortality, this.tankSay[i], this.typeSay[i], this.kutucukSay[i], this.OPSay[i]).subscribe(
          data => {
            this.mortalityentries.push(data);
            this.toasterService.pop('success', 'Başarıyla Kaydedildi !', 'Ölü Girişi Başarıyla Eklendi');
            this.selectedMortality = [];
          },
          error => {
            console.log(error);
            this.toasterService.pop('error', 'Hata', 'Girdiğiniz Bilgilerde Hata Var');
          }
        );
      }
    }
  }
  deleteMortalityentry = () => {
    this.api.deleteMortalityentry(this.selectedMortality.id).subscribe(
      data => {
        this.getMortalityentries();
        this.toasterService.pop('success', 'Başarıyla Silindi!', 'Ölü Girişi Başarılı Şekilde Silindi.');
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
