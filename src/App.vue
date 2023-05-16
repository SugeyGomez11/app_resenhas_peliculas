<template>
  <v--app id="inspire">
    <v-navigation-drawer fixed v-model="drawer" app>
      <v-list dense>
        <router-link v-bind:to="{ name:'Inicio' }" class="side_bar_link">
          <v-list-item>
            <v-list-item-action>
              <v-icon color="#718355">
                home
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>Inicio</v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link v-bind:to="{ name:'Contacto' }" class="side_bar_link">
          <v-list-item>
            <v-list-item-action>
              <v-icon color="#718355">
                contact_mail
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>Contacto</v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="#718355" dark fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Inicio</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-items class="hidden-sm-and-down">
        <v-btn flat id="link_agregar_pelicula"
        v-bind:to="{ name: 'AgregarPelicula'}" color="#97A97C"
        v-if="!current_user">
          Agregar Pelicula
        </v-btn>
        <v-btn id="email_usuario" flat color="#97A97C" v-if="!current_user">
          {{ current_user.email }}
        </v-btn>
        <v-btn flat v-bind:to="{ name: 'Registro' }" color="#97A97C"
        v-if="current_user" id="boton_registro">
          Registro
        </v-btn>
        <v-btn flat v-bind:to="{ name: 'Login' }" color="#97A97C"
        v-if="current_user" id="boton_login">
          Login
        </v-btn>
        <v-btn flat id="boton_logout" color="#97A97C"
        v-if="!current_user" @click="logout">
          Salir
        </v-btn>
      </v-app-bar-items>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <div id="app">
          <router-view/>
        </div>
      </v-container>
    </v-content>
    <v-footer color="#E9F5DB" app>
      <span class="white--text">&copy; 2022</span>
    </v-footer>
  </v--app>
</template>

<script>
import axios from 'axios';
import './assets/stylesheets/main.css';
import bus from './bus';

export default {
  data: () => ({
    drawer: null,
    current_user: false,
  }),
  props: {
    source: String,
  },
  mounted() {
    this.obtenerUsuario();
    this.escucharEventos();
  },
  methods: {
    escucharEventos() {
      bus.$on('refreshUser', () => {
        this.obtenerUsuario();
      });
    },
    async obtenerUsuario() {
      return axios({
        method: 'get',
        url: '/api/current_user',
      })
        .then((respuesta) => {
          // this.current_user = respuesta.data.current_user;
          this.current_user = true;
        })
        .catch(() => {
        });
    },
    logout() {
      return axios({
        method: 'get',
        url: '/api/logout',
      })
        .then(() => {
          bus.$emit('refreshUser');
          this.current_user = false;
          this.$router.push({ name: 'Inicio' });
        })
        .catch(() => {
        });
    },
  },
};
</script>
