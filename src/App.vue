<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer clipped app v-model="drawer">
        <v-toolbar dense dark color="primary">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <v-toolbar-title>{{title}}</v-toolbar-title>
        </v-toolbar>
        <v-list>
          <v-list-tile v-for="item in items" :key="item.title" :to="item.route">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <v-toolbar dense dark color="primary">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title>{{routerTitle}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <div v-if="authenticated">
            <v-btn @click="login">Logout</v-btn>
          </div>
          <div v-else>
            <v-btn @click="logout">Login</v-btn>
          </div>
        </v-toolbar-items>
      </v-toolbar>

      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Router from './router';
import Keycloak from 'keycloak-js';
import { Action, namespace } from 'vuex-class';
import { isAuthenticated, keycloakLogin, keycloakLogout } from '@/keycloak';

const transformationNamespace = { namespace: 'transformation' };

@Component
export default class App extends Vue {
  private title: string = 'Open-Data-Service';
  private routerTitle: string = '';
  private drawer = null;
  private items = [
    { title: 'Dashboard', route: '/' },
    { title: 'Transformers', route: '/transformation' },
    { title: 'About', route: '/about' },
  ];
  @Action('init', transformationNamespace)
  private initKeycloakAction!: () => void;

  private authenticated: boolean = false;

  private created() {
    this.routerTitle = Router.currentRoute.meta.title || '';
    Router.afterEach((to, from) => {
      this.routerTitle = to.meta.title || '';
    });
    this.initKeycloakAction();
  }

  private updated() {
    this.authenticated = isAuthenticated();
  }

  private login() {
    keycloakLogin();
  }

  private logout() {
    keycloakLogout();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
