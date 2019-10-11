import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-Transfer_Create',
  templateUrl: './Transfer_Create.component.html',
  styleUrls: ['./Transfer_Create.component.scss']
})
export class Transfer_CreateComponent implements OnInit {

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  FormGroup: FormGroup;
  TotalRow: number;

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.FormGroup = this._fb.group({
      itemRows: this._fb.array([this.initItemRow()]),
    });
  }

  initItemRow(){
    return this._fb.group({
      lattice_name: [''],
      aktarilacak_miktar: [''],
      lattice_name2: [''],
      kalan_kapasite: [''],
    });
  }
  addNewRow() {
    const control = <FormArray>this.FormGroup.controls['itemRows'];
    control.push(this.initItemRow());
  }
  deleteRow(index: number) {
    const control = <FormArray>this.FormGroup.controls['itemRows'];
    if (control != null) {
      this.TotalRow = control.value.length;
    }
    if (this.TotalRow > 1) {
      control.removeAt(index);
    } else {
      alert('One record is mandatory.');
      return false;
    }
  }


}
