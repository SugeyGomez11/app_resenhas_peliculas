<template>
    <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field
            label="Nombre:"
            v-model="nombre"
            required
            :rules="reglasNombre"
        ></v-text-field>
        <v-text-field
            name="input-7-1"
            label="Descripción:"
            v-model="descripcion"
            multi-line
        ></v-text-field>
        <v-select
            label="Año de publicación:"
            v-model="anho_publicacion"
            required
            :rules="reglasPublicacion"
            :items="anhos"
        ></v-select>
        <v-text-field
            label="Género:"
            v-model="genero"
            required
            :rules="reglasGenero"
        ></v-text-field>
        <v-btn @click="enviar" :disabled="!valid">Enviar</v-btn>
        <v-btn @click="limpiar">Limpiar</v-btn>
    </v-form>
</template>
<script>
import axios from 'axios';

export default {
  data: () => ({
    valid: true,
    nombre: '',
    descripcion: '',
    genero: '',
    anho_publicacion: '',
    anhos: ['2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'],
    reglasNombre: [
      v => !!v || 'El nombre de la película es requerido',
    ],
    reglasGenero: [
      v => !!v || 'Se requiere el género de la pelicula',
      v => (v && v.length <= 80) || 'El género debe ser de 80 caracteres o menos',
    ],
    reglasPublicacion: [
      v => !!v || 'Se requiere el año de publicación',
    ],
    select: null,
  }),
  methods: {
    enviar() {
      if (this.$refs.form.validate()) {
        const pelicula = {
          nombre: this.nombre,
          descripcion: this.descripcion,
          anho_publicacion: this.anho_publicacion,
          genero: this.genero,
        };
        this.$store.dispatch('agregarPelicula', pelicula);
        this.$refs.form.reset();
        this.$router.push({ name: 'Inicio' });
        // return axios({
        //   // como lo vamos a enviar
        //   method: 'post',
        //   data: {
        //     nombre: this.nombre,
        //     descripcion: this.descripcion,
        //     anho_publicacion: this.anho_publicacion,
        //     genero: this.genero,
        //   },
        //   // donde lo vamos a enviar
        //   url: '/peliculas/',
        //   // (headers) para que reconozca lo que enviamos como un objeto json
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // })
        //   .then(() => {
        //     // cuando termine de que enviar la informacion la mande a la pagina de inico
        //     this.$swal(
        //       '¡Excelente!',
        //       '¡Pelicula agregada satisfactoriamente!',
        //       'success',
        //     );
        //     this.$router.push({ name: 'Inicio' });
        //     this.$refs.form.reset();
        //   })
        //   .catch(() => {
        //     this.$swal(
        //       '¡Error!',
        //       'No se pudo agregar la película',
        //       'error',
        //     );
        //   });
      }
      return true;
    },
    limpiar() {
      this.$refs.form.reset();
    },
  },
};
</script>
