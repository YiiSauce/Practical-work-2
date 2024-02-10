import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { TraineeService } from '../../services/trainee.service';
import { Trainee } from '../../models/trainee';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-trainee-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './trainee-details.component.html',
  styleUrl: './trainee-details.component.css'
})
export class TraineeDetailsComponent {
  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.service.t().id),
    traineeName: new FormControl(this.service.t().traineeName),
    age: new FormControl(this.service.t().age),
    isWorking: new FormControl(this.service.t().isWorking)
  });


  constructor(public service: TraineeService) {
    effect(() => {
      this.myForm.patchValue(this.service.t(), { emitEvent: false });
    }, { allowSignalWrites: true });

    this.myForm.valueChanges.subscribe((val) =>
      this.first.set(val ?? ({ id: 0, traineeName: "", age: 0, isWorking: false }))
    );
  }

  first = signal<Trainee>(({ id: 0, traineeName: "", age: 0, isWorking: false }));

  onSubmit() {
    console.log("-------------------------------------------");
    console.log(this.first());
    console.log("-------------------------------------------");
    if (this.myForm.valid) {
      if (this.first().id == 0) {
        this.insertItem(this.first());
      }
      else {
        this.updateItem(this.first());
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
