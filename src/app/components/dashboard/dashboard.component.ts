import { Component, OnInit } from '@angular/core';
import { Users } from '../types/Users';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
user: Users;

  constructor() { }

  ngOnInit() {
  }

}
