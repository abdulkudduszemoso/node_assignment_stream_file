import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  lines = [];

  ngOnInit(): void {
    const sockets = io('http://localhost:3000');
    sockets.on('first content', (msg) => {
      const lines = msg.toString().split('\n');
      if (lines <= 10) {
        this.lines = lines;
      } else {
        this.lines = lines.slice(-10);
      }
    });

    sockets.on('file changes', (msg) => {
      this.lines = msg.toString().split('\n');
    });
  }
}
