import { Injectable, WritableSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trainee } from '../models/trainee';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TraineeService {

  private trainees$ = this.http.get<Trainee[]>(`${environment.apiUrl}/Trainees`);
  trainees : WritableSignal<Trainee[]> = signal([]);
  formSubmitted:boolean = false;

  constructor(private http: HttpClient) { 
    this.trainees$.subscribe((t) =>{
      this.trainees.set(t);
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

  selectedTrainee = signal(0);
  setSelectedTrainee(id : number){
    this.selectedTrainee.set(id);
  }
  
}

