<template>
  <div v-if="authenticated" class="transformation-main">
    <h1>transformation service</h1>
    <v-card>
      <v-form>
        <v-textarea v-model="functionInput" full-width></v-textarea>
      </v-form>
    </v-card>
    <v-btn color="success" @click="submit">submit</v-btn>
    <h2>{{transformedObject}}</h2>
  </div>
  <div v-else>
    <h1>please authenticate</h1>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Action, State } from 'vuex-class';

const namespace = { namespace: 'transformation' };

@Component
export default class TransformationMain extends Vue {
  @State('transformedObject', namespace) private transformedObject!: any;
  @State('authenticated', namespace) private authenticated!: boolean;
  @Action('fetchTransformation', namespace)
  private fetchTransformationAction!: (functionInput: string) => void;
  @Action('authenticate', namespace)
  private authenticateAction!: () => void;

  private functionInput: string = '{"func":"return 1", "data":null}';

  private submit() {
    this.fetchTransformationAction(this.functionInput);
  }

  private mounted() {
    this.authenticateAction();
  }
}
</script>
