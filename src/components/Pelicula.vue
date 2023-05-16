<template>
    <v-layout row wrap>
        <v-flex xs4>
            <v-card>
                <v-card-title primery-title>
                    <div>
                        <div class="headline">{{ pelicula.nombre }}</div>
                        <span class="grey-text">
                            {{ pelicula.anho_publicacion }} &middot; {{ pelicula.genero }}
                        </span>
                    </div>
                </v-card-title>
                <!-- <h6 class="card-title" v-if="current_user" @click="calificar"> -->
                <h6 class="card-title" @click="calificar">
                  Calificar esta pelicula
                </h6>
                <v-card-text>
                    {{ pelicula.descripcion }}
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import axios from 'axios';
import Vue from 'vue';
import StarRating from 'vue-star-rating';

const wrapper = document.createElement('div');
// estado compoartido
const estado = {
  nota: 0,
};
const ComponenteCalificacion = Vue.extend({
  data() {
    return { calificacion: 0 };
  },
  watch: {
    calificacion(nuevoValor) { estado.nota = nuevoValor; },
  },
  template: `
   <div class="rating">
    ¿Cuál fue su experiencia viendo esa pelicula?
    <star-rating v-model="calificacion" :show-rating="false"></star-rating>
   </div>`,
  components: { 'star-rating': StarRating },
});
const componente = new ComponenteCalificacion().$mount(wrapper);

export default {
  nombre: 'Pelicula',
  data() {
    return {
      pelicula: [],
    };
  },
  mounted() {
    this.obtenerPelicula();
  },
  methods: {
    async calificar() {
      this.$swal({
        content: componente.$el,
        buttons: {
          confirm: {
            value: 0,
          },
        },
      })
        .then(() => {
          const peliculaId = this.$route.params.id;
          return axios({
            method: 'post',
            data: {
              calificacion: estado.nota,
            },
            url: `http://localhost:8081/peliculas/calif/${peliculaId}`,
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(() => {
              this.$swal(`Gracias por calificar! ${estado.nota}`, 'success');
            })
            .catch((error) => {
              const mensaje = error.response.data.message;
              this.$swal('¡Error!', `${mensaje}`, 'error');
            });
        });
    },
    async obtenerPelicula() {
      return axios({
        method: 'get',
        url: `http://localhost:8081/api/peliculas/${this.$route.params.id}`,
      })
        .then((respuesta) => {
          this.pelicula = respuesta.data;
        })
        .catch(() => {
        });
    },
  },
};
</script>
