import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { ApiService } from './api.service';
import {MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import {ToasterConfig, ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-ClientManage',
  templateUrl: './ClientManage.component.html',
  styleUrls: ['./ClientManage.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService, ToasterService]
})
export class ClientManageComponent implements OnInit {

  clients = [{name: 'Test'}];
  selectedClient;

  constructor(private api: ApiService, private toasterService: ToasterService) {
    this.getClients();
    this.selectedClient = {id: '', name: '', responsible_person: '', address: '', phone: '', tax_office: '', tax_number: '' };

   }

  displayedColumns: string[] = ['id', 'name', 'responsible_person', 'address', 'phone', 'tax_office', 'tax_number', 'update', 'delete'];
  dataSource = new MatTableDataSource<Element>();

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


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
     );
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

  updateClient = (sy) => {
    this.api.updateClient(sy).subscribe(
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
        this.toasterService.pop('success', 'Başarıyla Güncellendi !', 'Client Başarılı Şekilde Güncellendi.');

      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');

      }
    );
  }

  deleteClient = (sy, elm) => {
    if (!confirm('Silmek İstediğinize Emin Misiniz ?')) {
    } else {
      this.dataSource.data = this.dataSource.data.filter(i => i !== elm);
      this.api.deleteClient(sy).subscribe(
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
  }
  ngOnInit() {
    this.api.getAllClients().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

}
