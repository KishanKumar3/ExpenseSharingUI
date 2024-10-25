import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  facts = [
    'Track your expenses in real-time.',
    'Settle expenses quickly and fairly.',
    'Analyze spending patterns to save money.'
  ];



  constructor() { }

  ngOnInit() {
  }

}
