import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UsersService } from '../users.service';
import { tap } from 'rxjs/operators';
import {
  AddUsers,
  GetUsers,
  DeleteUsers,
  UpdateUsers,
} from '../actions/app.action';

export class UserStateModel {
  users: any;
}

@State<UserStateModel>({
  name: 'appState',
  defaults: {
    users: [],
  },
})
@Injectable()
export class AppState {
  constructor(private _usersService: UsersService) {}

  @Selector()
  static selectStateData(state: UserStateModel) {
    return state.users;
  }

  @Action(GetUsers)
  getDataFormState(ctx: StateContext<UserStateModel>) {
    return this._usersService.getAllUsers().pipe(
      tap((returnData) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          users: returnData,
        });
      })
    );
  }

  @Action(AddUsers)
  addDataToState(ctx: StateContext<UserStateModel>, { payload }: AddUsers) {
    return this._usersService.addUser(payload).pipe(
      tap((returnData) => {
        const state = ctx.getState();
        ctx.patchState({
          users: [...state.users, returnData],
        });
      })
    );
  }

  @Action(UpdateUsers)
  updateStateData(
    ctx: StateContext<UserStateModel>,
    { payload, id, i }: UpdateUsers
  ) {
    return this._usersService.updateUser(payload, i).pipe(
      tap((returnData) => {
        const state = ctx.getState();

        const userList = [...state.users];
        userList[i] = payload;

        ctx.setState({
          ...state,
          users: userList,
        });
      })
    );
  }

  @Action(DeleteUsers)
  deleteStateData(ctx: StateContext<UserStateModel>, { id }: DeleteUsers) {
    return this._usersService.deleteUser(id).pipe(
      tap((returnData) => {
        const state = ctx.getState();

        console.log('The is is', id);
        //Here we will create a new Array called filteredArray which won't contain the given id and set it equal to state.todo
        //@ts-ignore
        const filteredArray = state.users.filter((user) => user.id !== id);

        ctx.setState({
          ...state,
          users: filteredArray,
        });
      })
    );
  }
}
