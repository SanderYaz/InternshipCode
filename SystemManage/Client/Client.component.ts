import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Client',
  templateUrl: './Client.component.html',
  styleUrls: ['./Client.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService, ToasterService]
})
export class ClientComponent implements OnInit {

  clients= [{name: 'test'}];
  selectedClient;


  constructor(private api: ApiService, private toasterService: ToasterService) {

    this.getClients();
    this.selectedClient = {id: '', name: '', responsible_person: '', address: '', phone: '', tax_office: '', tax_number: '' };

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

   clientClicked = (client) => {
     this.api.getOneClient(client.id).subscribe(
       data => {
         this.selectedClient = data;
       },
       error => {
         console.log(error);
       }
     );
   }

   updateClient = () => {
     this.api.updateClient(this.selectedClient).subscribe(
       data => {
         this.getClients();
         this.toasterService.pop('success', 'Başarıyla Güncellendi !', 'Client Başarılı Şekilde Güncellendi.');
       },
       error => {
         console.log(error);
         this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
       }
     );
   }

   createClient = () => {
     this.api.createClient(this.selectedClient).subscribe(
       data => {
         this.clients.push(data);
         this.toasterService.pop('success', 'Başarıyla Kaydedildi !', 'Client Başarılı Şekilde kaydedildi.');
       },
       error => {
         console.log(error);
         this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
       }
     );
   }

   deleteClient = () => {
     if (!confirm('Silmek İstediğinize Emin Misiniz ?')) {
     } else {
       this.api.deleteClient(this.selectedClient.id).subscribe(
         data => {
           this.getClients();
           this.toasterService.pop('success', 'Başarıyla Silindi!', 'Client Başarılı Şekilde Silindi.');
         },
         error => {
           console.log(error);
           this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
         }
       );
     }
   }

  ngOnInit() {
  }

}
