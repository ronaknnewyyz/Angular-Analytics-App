import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.username = this.dataService.getUsername();
  }

  getUsername = (name: string) => {
    this.username = name;
    this.dataService.setUsername(name);
  }

}
