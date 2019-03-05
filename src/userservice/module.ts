import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import Keycloak from 'keycloak-js';
@Module({ namespaced: true })
export default class UserModule extends VuexModule {
  private keycloak: Keycloak.KeycloakInstance = Keycloak();
  private currentUserInfo = null;

  get clientId() {
    return this.keycloak.clientId;
  }

  get authenticated() {
    return this.keycloak.authenticated;
  }

  @Action
  public async initKeycloakAction() {
    const newInstance: Keycloak.KeycloakInstance = Keycloak();
    await newInstance.init({});
    this.context.commit('setKeycloak', newInstance);
  }

  @Action({ commit: 'keycloakLogin' })
  public keycloakLoginAction() {
    const newInstance: Keycloak.KeycloakInstance = Object.create(this.keycloak);
    newInstance.login();
    this.context.commit('setKeycloak', newInstance);
  }

  @Mutation public keycloakLogin() {
    this.keycloak.login();
  }

  @Mutation public setKeycloak(keycloak: Keycloak.KeycloakInstance) {
    this.keycloak = keycloak;
  }

  @Mutation public setUserInfo(userInfo: any) {
    this.userInfo = userInfo;
  }

  @Action({ commit: 'setUserinfo' })
  private async userInfo() {
    return await this.keycloak.loadUserInfo();
  }
}
