import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-UnitCreate',
  templateUrl: './UnitCreate.component.html',
  styleUrls: ['./UnitCreate.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService, ToasterService]
})

export class UnitCreateComponent implements OnInit {

  companies = [{ name: 'test' }];
  selectedCompany;

  facilities = [{ name: 'test' }];
  selectedFacility;

  units = [{ name: 'test'}];
  selectedUnit;


  constructor(private api: ApiService, private toasterService: ToasterService) {
    this.getCompanies();
    this.selectedCompany = { client: '', id: '', name: '', responsible_person: '', address: '', phone: '', tax_office: '', tax_number: '' };
    this.getFacilities();
    this.selectedFacility = {company: '', facilitytype: '', id: '', name: '', responsible_person: '', address: '', phone: '', coordinate: '', responsible_engineer: '' };
    this.getUnits();
    this.selectedUnit = {facility: '', id: '', name: '', description: '', company: ''};
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

  getUnits = () => {
    this.api.getAllUnits().subscribe(
      data => {
        this.units = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  unitClicked = (unit) => {
    this.api.getOneUnit(unit.id).subscribe(
      data => {
        this.selectedUnit = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateUnit = () => {
    this.api.updateUnit(this.selectedUnit).subscribe(
      data => {
        this.getUnits();
        this.toasterService.pop('success', 'Başarıyla Güncellendi !', 'Şirket Başarılı Şekilde Güncellendi.');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
      }
    );
  }
  createUnit = () => {
    this.api.createUnit(this.selectedUnit, this.selectedFacility).subscribe(
      data => {
        this.units.push(data);
        this.facilities.push(data);
        this.toasterService.pop('success', 'Başarıyla Kaydedildi !', 'Şirket Başarılı Şekilde kaydedildi.');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
      }
    );
  }

  deleteUnit = () => {
    this.api.deleteUnit(this.selectedUnit.id).subscribe(
      data => {
        this.getUnits();
        this.toasterService.pop('success', 'Başarıyla Silindi!', 'Şirket Başarılı Şekilde Silindi.');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
      }
    );
  }
selected: any;

  ngOnInit() {
  }

}
