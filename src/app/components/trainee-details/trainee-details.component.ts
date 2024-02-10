import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { TraineeService } from '../../services/trainee.service';
import { Trainee } from '../../models/trainee';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from "@angular/core/rxjs-interop";


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


  constructor(public service: TraineeService) {
    effect(() => {
      this.myForm.patchValue(this.first(),{emitEvent:false});
    },{allowSignalWrites:true});

    this.myForm.valueChanges.subscribe((val) =>
    this.first.set(val ?? ({id:0,traineeName:"",age:0,isWorking:false}))
  );
  }

  // first = toSignal<Trainee>(this.myForm.valueChanges);
  //first = computed(() => this.service.t())
  first = signal<Trainee>(({id:0,traineeName:"",age:0,isWorking:false}));
  //firstly = computed(() => this.service.t());

  ngOnInit():void{
  }

  onSubmit() {
    //this.service.formSubmitted=true;
    console.log("-------------------------------------------");
    // this.service.t = signal<Trainee>(this.myForm.value);
    console.log(this.myForm.value);
    console.log("-------------------------------------------");
    if (this.myForm.valid) {      
      if(this.first().id == 0){
        // this.first.set(this.service.t())
        console.log(this.first());
        this.insertItem(this.first());
      }
      else{
        console.log(this.service.t().id);
        this.updateItem(this.service.t());
        //this.myForm.reset();
      }
    } else {
      console.error('Form is invalid.');
    }
}
insertItem(form: Trainee){
  this.service.addTrainee(form);
  this.first.set({id:0,traineeName:"",age:0,isWorking:false});
  // this.service.t = signal<Trainee>({id:0,traineeName:"",age:0,isWorking:false});
  // this.service.formSubmitted = false;
}
updateItem(form: Trainee){
  this.service.updateTrainee(form);
  this.service.t = signal<Trainee>({id:0,traineeName:"",age:0,isWorking:false});
  //this.service.formSubmitted = false;
}
}
