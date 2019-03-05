<template>
  <div class="transformation-main">
    <h1>transformation service</h1>
    <v-card>
      <v-form>
        <v-textarea v-model="bla" full-width></v-textarea>
      </v-form>
    </v-card>
    <v-btn color="success">submit</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
@Component
export default class TransformationMain extends Vue {
  private bla: string = '{"func":"return data", "data":{"bla"}}';
}
</script>
