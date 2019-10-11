import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-FacilityCreate',
  templateUrl: './FacilityCreate.component.html',
  styleUrls: ['./FacilityCreate.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService, ToasterService]
})
export class FacilityCreateComponent implements OnInit {

  companies = [{ name: 'test' }];
  selectedCompany;

  facilitytypes = [{ name: 'test' }];
  selectedFacilitytype;

  facilities = [{ name: 'test' }];
  selectedFacility;


  constructor(private api: ApiService, private toasterService: ToasterService) {
    this.getCompanies();
    this.selectedCompany = { client: '', id: '', name: '', responsible_person: '', address: '', phone: '', tax_office: '', tax_number: '' };

    this.getFacilitytypes();
    this.selectedFacilitytype = { id: '', name: '' };

    this.getFacilities();
    this.selectedFacility = { company: '', type: '', id: '', name: '', responsible_person: '', address: '', phone: '', coordinate: '', responsible_engineer: '' };
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
    )
  }

  getFacilitytypes = () => {
    this.api.getAllFacilitytypes().subscribe(
      data => {
        this.facilitytypes = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  getFacilities = () => {
    this.api.getAllFacilities().subscribe(
      data => {
        this.facilities = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  facilityClicked = (facility) => {
    this.api.getOneFacility(facility.id).subscribe(
      data => {
        this.selectedFacility = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateFacility = () => {
    this.api.updateFacility(this.selectedFacility).subscribe(
      data => {
        this.getFacilities();
        this.toasterService.pop('success', 'Başarıyla Güncellendi !', 'Tesis Başarıyla Güncellendi. ');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata!', 'Girdiğiniz Bilgilerde Hata Var. ');
      }
    )
  }

  createFacility = () => {
    this.api.createFacility(this.selectedFacility, this.selectedFacilitytype, this.selectedCompany).subscribe(
      data => {
        this.facilities.push(data);
        this.facilitytypes.push(data);
        this.companies.push(data);
        this.toasterService.pop('success', 'Başarıyla Kaydedildi !', 'Tesis Başarıyla Eklendi');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata', 'Girdiğiniz Bilgilerde Hata Var')
      }
    );
  }

  deleteFacility = () => {
    this.api.deleteFacility(this.selectedFacility.id).subscribe(
      data => {
        this.getFacilities();
        this.toasterService.pop('success', 'Başarıyla Silindi!', 'Tesis Başarılı Şekilde Silindi.');
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
