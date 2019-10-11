import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
//  export interface Client {

//    id: number;
//    client_name: string;
//  }

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-CompanyCreate',
  templateUrl: './CompanyCreate.component.html',
  styleUrls: ['./CompanyCreate.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService]
})
export class CompanyCreateComponent implements OnInit {

  clients = [{ name: 'test' }];
  selectedClient;

  companies = [{ name: 'test' }];
  selectedCompany;

  constructor(private api: ApiService, private toasterService: ToasterService) {
    this.getClients();
    this.selectedClient = { id: '', name: '', responsible_person: '', address: '', phone: '', tax_office: '', tax_number: '' };
    this.getCompanies();
    this.selectedCompany = { client: '', id: '', name: '', responsible_person: '', address: '', phone: '', tax_office: '', tax_number: '' };
  }

  public toasterconfig: ToasterConfig =
  new ToasterConfig({
    tapToDismiss: true,
    timeout: 5000
    });

  getClients = () => {
    this.api.getAllClients().subscribe(
      data => {
        this.clients = data;
      },
      error => {
        console.log(error);
      }
    )
  }

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


  companyClicked = (company) => {
    this.api.getOneCompany(company.id).subscribe(
      data => {
        this.selectedCompany = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateCompany = () => {
    this.api.updateCompany(this.selectedCompany).subscribe(
      data => {
        this.getCompanies();
        this.toasterService.pop('success', 'Başarıyla Güncellendi !', 'Şirket Başarılı Şekilde Güncellendi.');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
      }
    );
  }

  createCompany = () => {
    this.api.createCompany(this.selectedCompany, this.selectedClient).subscribe(
      data => {
        this.companies.push(data);
        this.clients.push(data);
        this.toasterService.pop('success', 'Başarıyla Kaydedildi !', 'Şirket Başarılı Şekilde kaydedildi.');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
      }
    );
  }

  deleteCompany = () => {
    this.api.deleteCompany(this.selectedCompany.id).subscribe(
      data => {
        this.getCompanies();
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
