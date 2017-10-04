import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IUser } from '../shared/data.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() name: EventEmitter<string> = new EventEmitter();
  user: IUser = {name: '', email: ''};

  constructor() { }

  ngOnInit() {
  }

  passUsername(username) {
    this.name.emit(username);
  }

}
