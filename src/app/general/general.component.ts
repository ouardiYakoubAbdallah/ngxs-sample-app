import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { AppState } from '../states/app.state';
import { Observable } from 'rxjs';
import {
  AddUsers,
  DeleteUsers,
  GetUsers,
  UpdateUsers,
} from '../actions/app.action';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {
  // Here I have used Reactive Form, you can also use Template Driven Form instead
  userForm!: FormGroup;
  userInfo!: any;
  @Select(AppState.selectStateData) _userInfo!: Observable<any>;

  constructor(private store: Store, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: [''],
      name: [''],
      username: [''],
      email: [''],
      phone: [''],
      website: [''],
    });

    this.store.dispatch(new GetUsers());
    this._userInfo.subscribe((returnData) => {
      this.userInfo = returnData;
    });
  }

  addUser() {
    const payload = this.userForm.value;
    this.store.dispatch(new AddUsers(payload));
    this.userForm.reset();
  }

  updateUser(id: number, i: number) {
    const dummyData = {
      id: id,
      name: 'Yakoub Ouardi',
      username: 'y4k0uard1',
      email: 'ouardi.yakoubabdallah@gmail.com',
      phone: '+213 777 77 77 77',
      webiste: 'mywebsite.com',
    };

    this.store.dispatch(new UpdateUsers(dummyData, id, i));
  }

  deleteUser(i: number) {
    this.store.dispatch(new DeleteUsers(i));
  }
}
