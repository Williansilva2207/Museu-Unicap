import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Application shell. Each feature page renders its own chrome (public kiosk
 * headers or the management portal header), so the shell is only the outlet.
 */
@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
