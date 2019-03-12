import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { useBearer, keycloakInit, keycloakLogin } from '../keycloak';

const TRANSFORMATION_URL = 'http://localhost:4000/job';

@Module({ namespaced: true })
export default class TransformationModule extends VuexModule {
  private authenticated: boolean = false;
  private transformedObject: string = '';

  @Action
  public async fetchTransformation(functionInput: string) {
    const token = await useBearer();
    fetch(TRANSFORMATION_URL, {
      method: 'POST',
      mode: 'cors',
      body: functionInput,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => {
        return response.json();
      })
      .then(json => this.context.commit('setTransformedObject', json));
  }

  @Action
  public init() {
    keycloakInit()
      .then(instance => {
        this.context.commit('setAuthenticated', instance.authenticated);
      })
      .catch(() => this.context.commit('setAuthenticated', false));
  }

  @Action public login() {
    keycloakLogin().then(() => this.context.commit('setAuthenticated', true));
  }

  @Mutation private setAuthenticated(authenticated: boolean) {
    this.authenticated = authenticated;
  }

  @Mutation private setTransformedObject(object: string) {
    this.transformedObject = object;
  }
}
