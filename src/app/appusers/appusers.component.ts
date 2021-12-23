import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { __assign } from 'tslib';

@Component({
  selector: 'app-appusers',
  templateUrl: './appusers.component.html',
  styleUrls: ['./appusers.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public service: UserService) { }

  ngOnInit(): void {
    console.log('before');
    this.service.getUsers();
    console.log('after');
  }


}
