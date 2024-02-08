import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TraineeListComponent } from './components/trainee-list/trainee-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TraineeListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Practical-Work-2';
}
