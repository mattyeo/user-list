import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserRecord } from './models/userRecord.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ipRegex: string = "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
  userList: UserRecord[];

  form = new FormGroup({
    nickname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    ipAddress: new FormControl('', [Validators.required, Validators.pattern(this.ipRegex)])
  });

  usernameAlreadyTaken: boolean;
  emailAlreadyTaken: boolean;

  ngOnInit() {
    // To delete 
    var user = new UserRecord();
    user.date = "2019-05-15";
    user.email = "ubaldorenna@gmail.com";
    user.ipAddress = "125.215.211.221";
    user.nickname = "ubaldorenna";
    //end delete
    this.userList = [];
    this.userList.push(user);
  }

  addUser() {
    var user = new UserRecord;
    user.date = new Date().toISOString().substr(0, 10);
    user.nickname = this.form.controls['nickname'].value;
    user.email = this.form.controls['email'].value;
    user.ipAddress = this.form.controls['ipAddress'].value;
    if (this.userList.findIndex(element => {
      if (element.nickname == user.nickname) {
        this.usernameAlreadyTaken = true;
      }
      if (element.email == user.email) {
        this.emailAlreadyTaken = true;
      }
      return element.nickname == user.nickname ||
        element.email == user.email
    }) == -1) {
      this.usernameAlreadyTaken = false;
      this.emailAlreadyTaken = false;
      this.userList.push(user);
      this.form.reset();
    }
  }

  deleteUser(user: UserRecord) {
    var confirmMessage: string = `Are you sure that you want to delete the following user record: \n${user.nickname} \n${user.email} \n${user.ipAddress}`;
    if (confirm(confirmMessage)) {
      var indexOfUser = this.userList.findIndex(element => {
        return element.nickname == user.nickname &&
          element.email == user.email &&
          element.ipAddress == user.ipAddress
      });
      this.userList.splice(indexOfUser, 1);
    }
  }

  usernameAlreadExists(): boolean {
    var indexUser = this.userList.findIndex(element => {
      return element.nickname == this.form.controls['nickname'].value
    });
    return indexUser != -1;
  }

  emailAlreadExists(): boolean {
    var indexUser = this.userList.findIndex(element => {
      return element.email == this.form.controls['email'].value
    });
    return indexUser != -1;
  }

  sorByDate() {
    this.userList.sort(((a, b) => Date.parse(a.date) > Date.parse(b.date) ? -1 : 1))
  }

  sortByNickname() {
    this.userList.sort(((a, b) => a.nickname.toLowerCase() < b.nickname.toLowerCase() ? -1 : 1))
  }

  sortByEmail() {
    this.userList.sort(((a, b) => a.email.toLowerCase() < b.email.toLowerCase() ? -1 : 1))
  }

  eraseList() {
    if (confirm("Are you sure that you want to delete the entire list ?")) {
      this.userList = [];
    }
  }




}
