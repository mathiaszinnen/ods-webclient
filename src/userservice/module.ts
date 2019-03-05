import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import Keycloak from 'keycloak-js';
@Module({ namespaced: true })
export default class UserModule extends VuexModule {
  private keycloak: Keycloak.KeycloakInstance = Keycloak();
  private authenticated: boolean = false;
  private currentUserInfo = null;

  @Action({ commit: 'initKeycloak' })
  public initKeycloakAction() {}

  @Action({ commit: 'keycloakLogin' })
  public keycloakLoginAction() {}

  @Mutation public keycloakLogin() {
    this.keycloak.login();
  }

  @Mutation public initKeycloak() {
    this.keycloak
      .init({})
      .success(authenticated => (this.authenticated = authenticated));
  }

  @Mutation public setUserInfo(userInfo: any) {
    this.userInfo = userInfo;
  }

  get clientId() {
    return this.keycloak.clientId;
  }

  @Action({ commit: 'setUserinfo' })
  private async userInfo() {
    return await this.keycloak.loadUserInfo();
  }
}
