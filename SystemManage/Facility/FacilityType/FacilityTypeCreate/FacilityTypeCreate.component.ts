import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { ApiService } from './api.service';


@Component({
  selector: 'app-FacilityTypeCreate',
  templateUrl: './FacilityTypeCreate.component.html',
  styleUrls: ['./FacilityTypeCreate.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService, ToasterService]
})
export class FacilityTypeCreateComponent implements OnInit {

  facilitytypes = [{name: 'test'}];
  selectedFacilitytype;
  
  constructor(private api: ApiService, private toasterService: ToasterService) {

    this.getFacilitytypes();
    this.selectedFacilitytype = { id: '', name: ''};
    
  }

  public toasterconfig: ToasterConfig = 
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

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

    facilitytypeClicked = (facilitytype) => {
      this.api.getOneFacilitytype(facilitytype.id).subscribe(
        data => {
          this.selectedFacilitytype = data;
        },
        error => {
          console.log(error);
        }
      );
    }

    updateFacilitytype = () => {
      this.api.updateFacilitytype(this.selectedFacilitytype). subscribe(
        data => {
          this.getFacilitytypes();
          this.toasterService.pop('success', 'Başarıyla Güncellendi ! ', 'Tesis Tütü Başarılı Şekilde Güncellendi.');
        },
        error => {
          console.log(error);
          this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
        }
      );
    }

    createFacilitytype = () => {
      this.api.createFacilitytype(this.selectedFacilitytype).subscribe(
        data => {
          this.facilitytypes.push(data);
          this.toasterService.pop('success', 'Başarıyla Kaydedildi !', 'Tesis Türü Başarılı Şekilde Kaydedildi.');
        },
        error => {
          console.log(error);
          this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
        }
      );
    }

    deleteFacilitytype = () => {
      this.api.deleteFacilitytype(this.selectedFacilitytype.id).subscribe(
        data => {
          this.getFacilitytypes();
          this.toasterService.pop('success', 'Başarıyla Silindi', 'Tesis Türü Başarıyla Silindi. ');
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
