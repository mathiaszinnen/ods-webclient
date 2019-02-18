import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import User from './user';
import * as UserRestService from './userRest';

@Module({ namespaced: true })
export default class UserModule extends VuexModule {
  private users: User[] = [];

  @Mutation public setUsers(users: User[]) {
    this.users = users;
  }

  @Action({ commit: 'setUsers' })
  public async loadUsers() {
    return await UserRestService.getAllUsers();
  }

  @Action({ commit: 'setUsers' })
  public async createUser(user: User) {
    await UserRestService.addUser(user);
    return await UserRestService.getAllUsers();
  }

  @Action({ commit: 'setUsers' })
  public async deleteUser(userID: string) {
    await UserRestService.deleteUserById(userID);
    return await UserRestService.getAllUsers();
  }
}
