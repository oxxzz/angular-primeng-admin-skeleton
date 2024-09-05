import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { select } from '@ngxs/store';
import { PrimeNGConfig } from 'primeng/api';
import { AuthComponent } from './layout/auth/auth.component';
import { MainComponent } from './layout/main/main.component';
import { AppState } from './states/app.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent implements OnInit {
  cfg = inject(PrimeNGConfig);
  isLoggedIn = select(AppState.loggedIn);

  ngOnInit(): void {
    this.cfg.ripple = true;
  }
}
