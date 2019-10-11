import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {ApiService} from './api.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-Dead_Entry',
  templateUrl: './Dead_Entry.component.html',
  styleUrls: ['./Dead_Entry.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService, ToasterService]
})
export class Dead_EntryComponent implements OnInit {
  companies = [{name: 'test'}];
  selectedCompany;
  facilities = [{name: 'test'}];
  selectedFacility;
  units = [{name: 'test'}];
  selectedUnit;
  tanks = [{name: 'test'}];
  selectedTank;
  fishoperations = [{name: 'test'}];
  selectedFishoperation;
  mortalitytypes = [{name: 'test'}];
  selectedMortalitytype;
  mortalityentries = [{name: 'test'}];
  selectedMortality;
  tankSay = [];
  typeSay = [];
  kutucukSay = [];
  fishtypes = [{name: 'test2'}];
  hide: boolean = true;


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
    this.getFishtypes();
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
      mortalitytype: ''
  }
    ;
  }

  displayedColumns: string[] = ['id', 'date', 'company', 'facility', 'unit', 'tank', 'mortalitytype', 'quantity', 'fishopr', 'update', 'delete'];
  dataSource = new MatTableDataSource<Element>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateFunc = (sy) => {
    this.hide = true;
    this.hide = false;
    this.api.getOneMortalityentries(sy.id).subscribe(
      data => {
        this.selectedMortality = data;
      },
      error => {
        console.log(error);
      }
    );
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
  getMortalitytypes = () => {
    this.api.getAllMortalitytypes().subscribe(
      data => {
        this.mortalitytypes = data;
      },
      error => {
        console.log(error);
      }
    );
  };
  getMortalityentries = () => {
    this.api.getAllMortalityentries().subscribe(
      data => {
        this.tanks = data;
      },
      error => {
        console.log(error);
      }
    );
  };
  mortalityClicked = (mortalityentries) => {
    this.api.getOneMortalityentries(mortalityentries.id).subscribe(
      data => {
        this.selectedMortality = data;
      },
      error => {
        console.log(error);
      }
    );
  };

  updateMortalityentry = () => {
    this.api.updateMortalityentry(this.selectedMortality).subscribe(
      data => {
        this.getMortalityentries();
        this.toasterService.pop('success', 'Başarıyla Güncellendi !', 'Ölü Girişi Başarıyla Güncellendi. ');
        this.api.getAllMortalityentries().subscribe(stream => {
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
  deleteMortalityentry = (id, elm) => {
    if (!confirm('Silmek İstediğinize Emin Misiniz ?')) {
    } else {
      this.dataSource.data = this.dataSource.data.filter(i => i !== elm);
      this.api.deleteMortalityentry(id).subscribe(
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
  };
  refreshtable = () => {
    this.api.getAllMortalityentries().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  };

  ngOnInit() {
    this.api.getAllMortalityentries().subscribe(stream => {
      this.dataSource = new MatTableDataSource(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

}
