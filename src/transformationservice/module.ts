import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { useBearer } from '../keycloak';

const TRANSFORMATION_URL = 'http://localhost:4000/job';

@Module({ namespaced: true })
export default class TransformationModule extends VuexModule {
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

  @Mutation public setTransformedObject(object: string) {
    this.transformedObject = object;
  }
}
