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
  constructor(private http: HttpClient) { 
    this.trainees$.subscribe((t) =>{
      this.trainees.set(t);
    });
  }

  addBenefit(benefit: Trainee) {
    this.http.post<Trainee>(`${environment.apiUrl}/Trainees`, benefit)
      .subscribe((createdBenefit) => {
        this.trainees.set([...this.trainees(), createdBenefit]);
      });
  }

  deleteBenefit(benefitId: number): void {
    this.http.delete<void>(`${environment.apiUrl}/Trainees/${benefitId}`)
      .subscribe(() => {
        this.trainees.set(this.trainees().filter(benefit => benefit.id !== benefitId));
      });
  }

  updateBenefit(updatedBenefit: Trainee): void {
    this.http.put<Trainee>(`${environment.apiUrl}/Trainees/${updatedBenefit.id}`, updatedBenefit)
      .subscribe(() => {
        this.trainees.set(this.trainees().map(benefit => (benefit.id === updatedBenefit.id) ? updatedBenefit : benefit));
      });
  }

  selectedTrainee = signal(0);
  setSelectedTrainee(id : number){
    this.selectedTrainee.set(id);
  }
}

