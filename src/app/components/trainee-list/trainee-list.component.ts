import { Component, computed } from '@angular/core';
import { TraineeService } from '../../services/trainee.service';
import { NgClass, NgFor } from '@angular/common';
import { Trainee } from '../../models/trainee';

@Component({
  selector: 'app-trainee-list',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './trainee-list.component.html',
  styleUrl: './trainee-list.component.css'
})
export class TraineeListComponent {
  pageTitle="test";
  errMsg = "";
  
  constructor(private traineeService:TraineeService){
    console.log(this.traineeService.trainees())
  }
  selectedTrainee = this.traineeService.selectedTrainee;
  onSelected(id:number){
    this.traineeService.setSelectedTrainee(id);
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
    this.traineeService.deleteBenefit(id);
  }
  update(trainee: Trainee){
    console.log("I am returning to it !");
  }
}
