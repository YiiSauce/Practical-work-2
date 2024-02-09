import { Component, OnInit, computed, signal } from '@angular/core';
import { TraineeService } from '../../services/trainee.service';
import { Trainee } from '../../models/trainee';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-trainee-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './trainee-details.component.html',
  styleUrl: './trainee-details.component.css'
})
export class TraineeDetailsComponent implements OnInit{
  myForm: FormGroup = new FormGroup({
    id : new FormControl(0),
    traineeName : new FormControl(""),
    age : new FormControl(0),
    isWorking : new FormControl(false)
  });
  constructor( private formBuilder: FormBuilder ,public service: TraineeService) {
  }

  ngOnInit():void{

  }

  onSubmit(form: NgForm) {
    this.service.formSubmitted=true;
    const formData = this.myForm.value;
    if (this.myForm.valid) {      
      if(this.service.t().id == 0){
        this.insertItem(this.service.t());
        this.myForm.reset();
      }
      else{
        this.updateItem(this.service.t());
        this.myForm.reset();
      }
    } else {
      console.error('Form is invalid.');
    }
}
insertItem(form: Trainee){
  this.service.addTrainee(form);
}
updateItem(form: Trainee){
  this.service.updateTrainee(form);
  this.service.t = signal<Trainee>({id:0,traineeName:"",age:0,isWorking:false});
}
}
