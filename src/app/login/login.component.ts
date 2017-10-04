import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() name: EventEmitter<string> = new EventEmitter();
  user: {name: string, email: string} = {name: '', email: ''};

  constructor() { }

  ngOnInit() {
  }

  passUsername(username) {
    this.name.emit(username);
  }

}
