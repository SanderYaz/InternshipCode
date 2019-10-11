import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ApiService } from './api.service';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';

export interface TankType {
  id: number;
  type: string;
}
@Component({
  selector: 'app-TankCreate',
  templateUrl: './TankCreate.component.html',
  styleUrls: ['./TankCreate.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService, ToasterService]
})
export class TankCreateComponent implements OnInit {
  companies = [{ name: 'test' }];
  selectedCompany;

  projects = [{ name: 'test' }];
  selectedProject;

  facilities = [{ name: 'test' }];
  selectedFacility;

  units = [{name: 'test'}];
  selectedUnit;

  shapes = [{name: 'test2'}];
  selectedShape;

  tanks = [{name: 'test23'}];
  selectedTank;

  volum;

  constructor(private api: ApiService, private toasterService: ToasterService) {
    this.getCompanies();
    this.selectedCompany = { client: '', id: '', name: '', responsible_person: '', address: '', phone: '', tax_office: '', tax_number: '' };
    this.getFacilities();
    this.selectedFacility = {company: '', facilitytype: '', id: '', name: '', responsible_person: '', address: '', phone: '', coordinate: '', responsible_engineer: '' };
    this.getUnits();
    this.selectedUnit = {facility: '', id: '', name: '', description: ''};
    this.getProjects();
    this.selectedProject = { id: '', name: '', description: '', fish_type: '', capacity: '', remaining_capacity: '', turnover: '', company: '', project_doc_no: '', SAP_project_code: '' };
    this.getShapes();
    this.selectedShape = { id: '', name: ''};
    this.getTanks();
    this.selectedTank = { id: '', name: '', unit: '', type: '', weight: '', length: '', height: '', vol: '', shape_id: '', diameter: '', is_project: '', project: '', tanknumber: '', company: '', facility: ''};
  }
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });
  getProjects = () => {
    this.api.getAllProjects().subscribe(
      data => {
        this.projects = data;
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
  getVolume = () => {
    let shape = this.selectedTank.shape_id;
    let weight = this.selectedTank.weight;
    let length = this.selectedTank.length;
    let height = this.selectedTank.height;
    let diameter = this.selectedTank.diameter;
    if (shape == 1) {
      this.volum = 3.14 * (diameter / 2) * (diameter / 2) * height;
    } else if (shape == 2) {
      this.volum = weight * length * height;
    }
    this.volum = Number(this.volum).toFixed(2);
    return this.volum;
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

  getShapes = () => {
    this.api.getAllShapes().subscribe(
      data => {
        this.shapes = data;
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

  tankClicked = (tank) => {
    this.api.getOneTank(tank.id).subscribe(
      data => {
        this.selectedTank = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateTank = () => {
    this.api.updateTank(this.selectedTank, this.getVolume()).subscribe(
      data => {
        this.getTanks();
        this.toasterService.pop('success', 'Başarıyla Güncellendi !', 'Tank Başarılı Şekilde Güncellendi.');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
      }
    );
  }

  createTank = () => {
    for (let i = 1; i < (this.selectedTank.tanknumber) + 1; i++ ) {
      this.api.createTank(this.selectedTank, i, this.getVolume()).subscribe(
        data => {
          this.tanks.push(data);
          this.toasterService.pop('success', 'Başarıyla Kaydedildi !', 'Tank Başarılı Şekilde kaydedildi.');
        },
        error => {
          console.log(error);
          this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
        }
      );
    }
  }

  // @ts-ignore
  deleteTank = () => {
    if (!confirm('Silmek İstediğinize Emin Misiniz ?')) {
    } else {
      this.api.deleteTank(this.selectedTank.id).subscribe(
        data => {
          this.getTanks();
          this.toasterService.pop('success', 'Başarıyla Silindi!', 'Tank Başarılı Şekilde Silindi.');
        },
        error => {
          console.log(error);
          this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
        },
      );
    }
  }


  ngOnInit() {
  }

}
