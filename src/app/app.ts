import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  isDark = false;

  constructor() {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      this.applyDarkMode();
      this.isDark = true;
    }
  }

  toggleTheme() {
    this.isDark = !this.isDark;

    if (this.isDark) {
      this.applyDarkMode();
      localStorage.setItem("theme", "dark");
    } else {
      this.removeDarkMode();
      localStorage.setItem("theme", "light");
    }
  }

  applyDarkMode() {
    document.body.classList.add("dark-mode");
  }

  removeDarkMode() {
    document.body.classList.remove("dark-mode");
  }
}
