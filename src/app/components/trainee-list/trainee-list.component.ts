import { Component, EventEmitter, Output, computed } from '@angular/core';
import { TraineeService } from '../../services/trainee.service';
import { NgClass, NgFor } from '@angular/common';
import { Trainee } from '../../models/trainee';
import { TraineeDetailsComponent } from '../trainee-details/trainee-details.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trainee-list',
  standalone: true,
  imports: [NgFor, NgClass, TraineeDetailsComponent],
  templateUrl: './trainee-list.component.html',
  styleUrl: './trainee-list.component.css'
})
export class TraineeListComponent {
  pageTitle="test";
  errMsg = "";
  
  constructor(private traineeService:TraineeService, private toastr: ToastrService){
  }
  trainees = computed(() => {
    try{
      return this.traineeService.trainees();
    }catch(e){
      this.errMsg = typeof e ==='string'?e:'Error';
      return[];
    }
  });
 
  remove(id:number){
    this.traineeService.deleteTrainee(id);
    this.toastr.error("Deleted Successfuly!", "Trainee Deleted");
  }

  update(trainee: Trainee){
    this.traineeService.t.set(trainee);
  }
}
