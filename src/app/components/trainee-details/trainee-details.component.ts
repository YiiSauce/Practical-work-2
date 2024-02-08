import { Component, computed, signal } from '@angular/core';
import { TraineeService } from '../../services/trainee.service';
import { Trainee } from '../../models/trainee';
import { FormsModule, NgForm } from '@angular/forms';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-trainee-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './trainee-details.component.html',
  styleUrl: './trainee-details.component.css'
})
export class TraineeDetailsComponent {
  constructor(public service: TraineeService) {
    
  }

  //formData: Trainee={id:0,traineeName:"",age:0,isWorking:false};
  onSubmit(form: NgForm) {
    this.service.formSubmitted=true;
    if (form.valid) {      
      if(this.service.t().id == 0){
        this.insertItem(this.service.t());
        this.service.resetForm(form);
      }
      else{
        this.updateItem(this.service.t());
        this.service.resetForm(form);
      }
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
