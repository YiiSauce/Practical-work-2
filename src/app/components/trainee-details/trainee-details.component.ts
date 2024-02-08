import { Component } from '@angular/core';
import { TraineeService } from '../../services/trainee.service';
import { Trainee } from '../../models/trainee';
import { FormsModule, NgForm } from '@angular/forms';

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

  formData: Trainee={id:0,traineeName:"",age:0,isWorking:false};
  onSubmit(form: NgForm) {
    this.service.formSubmitted=true;
    if (form.valid) {
      if(this.formData.id == 0)
        this.insertItem(this.formData);
      else
      this.updateItem(form);
    // form.reset();
  }
  console.log(this.formData)
}
insertItem(form: Trainee){
  this.service.addTrainee(form);
  // this.toastr.success("Inserted Successfuly !", "Payment Detail Register");
}
updateItem(form: NgForm){
}

}
