import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import Keycloak from 'keycloak-js';
@Module({ namespaced: true })
export default class UserModule extends VuexModule {
  private keycloak: Keycloak.KeycloakInstance = Keycloak();
  private authenticated: boolean = false;

  @Action({ commit: 'initKeycloak' })
  public initKeycloakAction() {}

  @Mutation public initKeycloak() {
    this.keycloak
      .init({ onLoad: 'login-required' })
      .success(authenticated => (this.authenticated = authenticated));
  }

  get clientId() {
    return this.keycloak.clientId;
  }
}
