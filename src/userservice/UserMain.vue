<template>
  <div class="user-main">
    <v-card>
      <h1>USER MAIN</h1>
      <div>{{ authenticated }}</div>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Action } from 'vuex-class';
import * as UserRestService from './userRest';
import { mapGetters } from 'vuex';
import User from './user';

const namespace = { namespace: 'user' };

@Component({
  computed: mapGetters(namespace.namespace, ['authenticated']),
})
export default class UserMain extends Vue {}
</script>
