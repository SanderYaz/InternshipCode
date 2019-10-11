import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ApiService} from './api.service';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Incoming_Fish',
  templateUrl: './Incoming_Fish.component.html',
  styleUrls: ['./Incoming_Fish.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService, ToasterService]
})
// tslint:disable-next-line:class-name
export class Incoming_FishComponent implements OnInit {
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
  fishtypes = [{name: 'test'}];
  selectedFishtype;
  batches = [{name: 'test'}];
  selectedBatch;
  origins = [{name: 'test'}];
  selectedOrigin;
  projects = [{name: 'test'}];
  selectedProject;
  fishentries = [{name: 'test'}];
  selectedFishentry;
  hide: boolean = true;
  hide2: boolean = true;
  bio;
  bio2;
  bio3;
  bio4;
  bio5;
  bio6;
  bio7;

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
    this.getBatches();
    this.selectedBatch = {id: '', name: '', total_feed_consumption: ''};
    this.getOrigins();
    this.selectedOrigin = {id: '', name: '', supplier: ''};
    this.getProjects();
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
    this.getFishentries();
    this.selectedFishentry = {
      id: '',
      date: '',
      totalfeed: '',
      brutfcr: '',
      netfcr: '',
      kafeskodu: '',
      irsaliyeno: '',
      account: '',
      geldigisirket: '',
      gidecegisirket: '',
      geldigitesis: '',
      gidecegitesis: '',
      geldigiunit: '',
      gidecegiunit: '',
      geldigitank: '',
      gidecegitank: '',
      fishtype: '',
      batch: '',
      origins: '',
      boylamakodu: '',
      grad: '',
      agirlik: '',
      net: '',
      extra: '',
      deform: '',
      telafi: '',
      is_opr: '',
      project: '',
      brut: '',
      biomasnet: '',
      biomasbrut: ''
    };
  }

  displayedColumns: string[] = ['date', 'kafeskodu', 'irsaliyeno', 'project', 'geldigisirket', 'geldigitesis', 'geldigiunit', 'geldigitank', 'gidecegisirket', 'gidecegitesis', 'gidecegiunit', 'gidecegitank', 'fishtype', 'batch', 'origins', 'boylamakodu', 'grad', 'agirlik', 'extra', 'deform', 'telafi', 'net', 'biomasnet', 'brut', 'biomasbrut', 'totalfeed', 'brutfcr', 'netfcr', 'detail', 'send', 'update', 'delete'];
  displayedColumns2: string[] = ['date', 'kafeskodu', 'project', 'gidecegitank', 'fishtype', 'agirlik', 'net', 'biomasnet', 'brut', 'biomasbrut', 'totalfeed', 'brutfcr', 'netfcr', 'detail', 'send', 'update', 'delete'];

  display = this.displayedColumns2;

  dataSource = new MatTableDataSource<Element>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  Detail = () => {
    this.hide2 = !this.hide2;
    if (this.hide2 === true) {

      this.display = this.displayedColumns2;
      this.refreshtable();
    } else {

      this.display = this.displayedColumns;
      this.refreshtable();
    }
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
  getBio = () => {
    const agirlik = this.selectedFishentry.agirlik;
    const net = this.selectedFishentry.net;
    this.bio = (agirlik * net) / 1000;
    this.bio = Number(this.bio).toFixed(2);
    return this.bio;
  };
  getBrut = () => {
    const agirlik = this.selectedFishentry.agirlik;
    const brut = this.getNetBrut();
    this.bio2 = (agirlik * brut) / 1000;
    this.bio2 = Number(this.bio2).toFixed(2);
    return this.bio2;
  };
  getNetBrut = () => {
    const net = this.selectedFishentry.net;
    const extra = this.selectedFishentry.extra;
    const deform = this.selectedFishentry.deform;
    const telafi = this.selectedFishentry.telafi;
    this.bio7 = net + extra + deform + telafi;
    this.bio7 = Number(this.bio7).toFixed(2);
    return this.bio7;
  };
// --------------------------------------------
  getnetfeed = () => {
    const yem = this.selectedFishentry.totalfeed;
    const net = this.selectedFishentry.net;
    this.bio4 = (yem * 1000) / net;
    this.bio4 = Number(this.bio4).toFixed(6);
    return this.bio4;
  };
  getbrutfeed = () => {
    const yem = this.selectedFishentry.totalfeed;
    const brut = this.getBrut();
    this.bio5 = (yem * 1000) / brut;
    this.bio5 = Number(this.bio5).toFixed(6);
    return this.bio5;
  };
  getnetfcr = () => {
    const yem = this.selectedFishentry.totalfeed;
    const NetBio = this.getBio();
    this.bio6 = yem / NetBio;
    this.bio6 = Number(this.bio6).toFixed(6);
    return this.bio6;
  };
  getbrutfcr = () => {
    const yem = this.selectedFishentry.totalfeed;
    const BrutBio = this.getBrut();
    this.bio3 = yem / BrutBio;
    this.bio3 = Number(this.bio3).toFixed(6);
    return this.bio3;
  };

  getSend = (send) => {
    this.api.createFishOP(send, this.getBio(), this.getBrut()).subscribe(
      data => {
        this.fishentries.push(data);
        this.facilities.push(data);
        this.units.push(data);
        this.tanks.push(data);
        this.fishtypes.push(data);
        this.batches.push(data);
        this.origins.push(data);
        this.toasterService.pop('success', 'Başarıyla Kaydedildi !', 'Balık Girişi Başarıyla Eklendi');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata', 'Girdiğiniz Bilgilerde Hata Var');
      }
    );
  };

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateFunc = (sy) => {
    window.scroll(0, 0);
    this.hide = true;
    this.hide = false;
    this.api.getOneFishentry(sy.id).subscribe(
      data => {
        this.selectedFishentry = data;
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

  getBatches = () => {
    this.api.getAllBatches().subscribe(
      data => {
        this.batches = data;
      },
      error => {
        console.log(error);
      }
    );
  };

  getOrigins = () => {
    this.api.getAllOrigins().subscribe(
      data => {
        this.origins = data;
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

  getFishentries = () => {
    this.api.getAllFishentries().subscribe(
      data => {
        this.fishentries = data;
      },
      error => {
        console.log(error);
      }
    );
  };

  fishentryClicked = (fishentry) => {
    this.api.getOneFishentry(fishentry.id).subscribe(
      data => {
        this.selectedFishentry = data;
      },
      error => {
        console.log(error);
      }
    );
  };

  updateFishentry = (id) => {
    this.api.updateFishentry(id, this.getBio(), this.getBrut()).subscribe(
      data => {
        this.getFishentries();
        this.toasterService.pop('success', 'Başarıyla Güncellendi !', 'Balık Girişi Başarıyla Güncellendi. ');
        this.api.getAllFishentries().subscribe(stream => {
          this.dataSource = new MatTableDataSource(stream);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata!', 'Girdiğiniz Bilgilerde Hata Var. ');
      }
    );
  };

  createFishentry = () => {
    this.api.createFishentry(this.selectedFishentry, this.getBio(), this.getBrut()).subscribe(
      data => {
        this.fishentries.push(data);
        this.facilities.push(data);
        this.units.push(data);
        this.tanks.push(data);
        this.fishtypes.push(data);
        this.batches.push(data);
        this.origins.push(data);
        this.toasterService.pop('success', 'Başarıyla Kaydedildi !', 'Balık Girişi Başarıyla Eklendi');
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', 'Hata', 'Girdiğiniz Bilgilerde Hata Var');
      }
    );
  };

  deleteFishentry = (id, elm) => {
    if (!confirm('Silmek İstediğinize Emin Misiniz ?')) {
    } else {
      this.dataSource.data = this.dataSource.data.filter(i => i !== elm);
      this.api.deleteFishentry(id).subscribe(
        data => {
          this.getFishentries();
          this.toasterService.pop('success', 'Başarıyla Silindi!', 'Balık Girişi Başarılı Şekilde Silindi.');
        },
        error => {
          console.log(error);
          this.toasterService.pop('error', 'Hata !', 'Girdiğiniz Bilgilerde Hata Var');
        }
      );
    }
  };

  refreshtable = () => {
    this.api.getAllFishentries().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  };

  ngOnInit() {
    this.api.getAllFishentries().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

}
