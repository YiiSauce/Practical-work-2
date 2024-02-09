import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trainee } from '../models/trainee';
import { environment } from '../../environments/environment.development';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TraineeService {

  private trainees$ = this.http.get<Trainee[]>(`${environment.apiUrl}/Trainees`);
  trainees : WritableSignal<Trainee[]> = signal([]);
  formSubmitted:boolean = false;
  t = signal<Trainee>({id:0,traineeName:"",age:0,isWorking:false});
  // OnePerson: WritableSignal<Person> = signal({ id: 0, name: '', age: 0 });

  constructor(private http: HttpClient) { 
    this.trainees$.subscribe((ts) =>{
      this.trainees.set(ts);
    });
  }

  addTrainee(trainee: Trainee) {
    this.http.post<Trainee>(`${environment.apiUrl}/Trainees`, trainee)
      .subscribe((createdTrainee) => {
        this.trainees.set([...this.trainees(), createdTrainee]);
      });
  }

  deleteTrainee(traineeId: number): void {
    this.http.delete<void>(`${environment.apiUrl}/Trainees/${traineeId}`)
      .subscribe(() => {
        this.trainees.set(this.trainees().filter(trainee => trainee.id !== traineeId));
      });
  }

  updateTrainee(updatedTrainee: Trainee): void {
    this.http.put<Trainee>(`${environment.apiUrl}/Trainees/${updatedTrainee.id}`, updatedTrainee)
      .subscribe(() => {
        this.trainees.set(this.trainees().map(trainee => (trainee.id === updatedTrainee.id) ? updatedTrainee : trainee));
      });
  }
  getById(id: number) {
    this.http.get<Trainee>(`${environment.apiUrl}/Trainees/${id}`).subscribe((trainee) => {
      this.t.set(trainee)
    });
  }

}

