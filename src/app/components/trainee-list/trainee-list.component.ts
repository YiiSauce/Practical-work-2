import { Component, computed } from '@angular/core';
import { TraineeService } from '../../services/trainee.service';
import { NgClass, NgFor } from '@angular/common';
import { Trainee } from '../../models/trainee';
import { TraineeDetailsComponent } from '../trainee-details/trainee-details.component';

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
  
  constructor(private traineeService:TraineeService){
    console.log(this.traineeService.trainees())
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
  }

  update(trainee: Trainee){
    this.traineeService.t.set(trainee);
  }
}