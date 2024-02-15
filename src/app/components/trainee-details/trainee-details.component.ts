import { Component, effect, inject, signal } from '@angular/core';
import { TraineeService } from '../../services/trainee.service';
import { Trainee } from '../../models/trainee';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-trainee-details',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './trainee-details.component.html',
  styleUrl: './trainee-details.component.css'
})
export class TraineeDetailsComponent {
  toastr = inject(ToastrService)
  first = signal<Trainee>(({ id: 0, traineeName: "", age: 0, isWorking: false }));
  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.first().id),
    traineeName: new FormControl(this.first().traineeName,[Validators.required, 
      Validators.minLength(5), Validators.maxLength(100)]),
    age: new FormControl(this.first().age,[Validators.required,Validators.min(18)]),
    isWorking: new FormControl(this.first().isWorking)
  });

  constructor(public service: TraineeService) {
    effect(() => {
      this.myForm.patchValue(this.service.t(), { emitEvent: false });
    }, { allowSignalWrites: true });

    this.myForm.valueChanges.subscribe((val) =>{
      this.first.set(val ?? ({ id: 0, traineeName: "", age: 0, isWorking: false }))
      console.log("Ana Hnaaaya !?!");}
    );
  }


  onSubmit() {
    if (this.myForm.valid) {
      if (this.first().id == 0) {
        this.insertItem(this.first());
        this.toastr.success("Inserted Successfuly !", "Trainee Detail Register");
        this.myForm.reset();
      }
      else {
        this.updateItem(this.first());
        this.toastr.info("Updated Successfuly !", "Trainee Detail Register");
        this.myForm.reset();
      }
    } else {
      console.error('Form is invalid.');
    }
  }

  insertItem(form: Trainee) {
    this.service.addTrainee(form);
    this.service.t.set({ id: 0, traineeName: "", age: 0, isWorking: false })
  }
  updateItem(form: Trainee) {
    this.service.updateTrainee(form);
    this.service.t.set({ id: 0, traineeName: "", age: 0, isWorking: false })
  }
}
