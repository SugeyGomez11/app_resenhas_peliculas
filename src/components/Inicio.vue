<template>
  <v-container>
  <v-layout row wrap>
    <v-flex xs4 v-for="pelicula in peliculas" :key="pelicula._id">
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">
              <v-btn flat v-bind:to="`/peliculas/${pelicula._id}`">
              {{ pelicula.nombre }}
              </v-btn>
            </div>
            <span class="grey-text">{{ pelicula.anho_publicacion }} &middot;
              {{ pelicula.genero }}</span>
          </div>
        </v-card-title>
        <v-card-text>
          {{ pelicula.descripcion }}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios';

export default {
  nombre: 'Peliculas',
  computed: {
    peliculas() {
      return this.$store.getters.obtenerPeliculas;
    },
  },
  // data() {
  //   return {
  //     peliculas: [],
  //   };
  // },
  mounted() {
    // this.obtenerPeliculas();
    this.$store.dispatch('obtenerPeliculas');
  },
  // methods: {
  //   async obtenerPeliculas() {
  //     const token = window.localStorage.getItem('auth');
  //     return axios({
  //       method: 'get',
  //       url: '/peliculas',
  //       headers: {
  //         Authorization: `JWT ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       .then((respuesta) => {
  //         this.peliculas = respuesta.data.peliculas;
  //         this.current_user = respuesta.data.current_user;
  //       })
  //       .catch(() => {
  //       });
  //   },
  // },
};
</script>
