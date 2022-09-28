import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import * as data from '../../../assets/to-render.json';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(private fb:FormBuilder, private router:Router) { }

  fields:any[] = [];
  signupForm = new FormGroup({});
  isSubmitted = false; //we can show validations in real time if we remove use of this var

  ngOnInit(): void {
    //console.log(this.jsonData);
    this.formatForm((data as any).default);
  }
  
  formatForm(json:[]){
    this.fields = [];
    json.forEach(f =>{
      let field:any = f;
      //in case we want to do more cleanup from json first
      this.fields.push(field);

      let control = new FormControl('');
      
      //assuming other types of validations may be added in the future 
      if(field.mandatory){
        control.setValidators(Validators.required)
      }
      this.signupForm.addControl(field['field'],control);

      this.signupForm.get

    })
  }

  submit(){
    console.log(this.signupForm);
    this.isSubmitted = true;   
    if(this.signupForm.valid){
      this.router.navigate(['/success']);
    }    
  }

}
