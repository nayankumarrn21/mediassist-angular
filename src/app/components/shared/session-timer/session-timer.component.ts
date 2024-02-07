import { Component } from '@angular/core';

@Component({
  selector: 'app-session-timer',
  templateUrl: './session-timer.component.html',
  styleUrl: './session-timer.component.css',
})
export class SessionTimerComponent {
  startTime: number = new Date().getTime();
  formattedTime: string = '00:00:00';
  private timerInterval: any;

  startSessionTimer() {
    this.timerInterval = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  stopSessionTimer() {
    clearInterval(this.timerInterval);
  }

  private updateTime() {
    const currentTime = new Date().getTime();
    const elapsedTimeInSeconds = Math.floor(
      (currentTime - this.startTime) / 1000
    );

    const hours = Math.floor(elapsedTimeInSeconds / 3600);
    const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
    const seconds = elapsedTimeInSeconds % 60;

    this.formattedTime =
      this.formatTime(hours) +
      ':' +
      this.formatTime(minutes) +
      ':' +
      this.formatTime(seconds);
  }

  private formatTime(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
}
