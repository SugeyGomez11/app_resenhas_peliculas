<template>
    <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field
            label="Nombre:"
            v-model="nombre"
            required
        ></v-text-field>
        <v-text-field
            label="Email:"
            v-model="email"
            :rules="reglasEmail"
            required
        ></v-text-field>
        <v-text-field
            label="Contraseña:"
            v-model="password"
            required
        ></v-text-field>
        <v-text-field
            name="campo-7-1"
            label="Confirmar Contraseña:"
            v-model="confirmar_password"
        ></v-text-field>
        <v-btn @click="enviar" :disabled="!valid">
            Enviar
        </v-btn>
        <v-btn @click="limpiar">Limpiar</v-btn>
    </v-form>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    valid: true,
    nombre: '',
    email: '',
    password: '',
    confirmar_password: '',
    reglasEmail: [
      v => !!v || 'Se requiere el email',
      v => /\S+@\S+\.\S+/.test(v) || 'Email debe ser valido',
    ],
  }),
  methods: {
    async enviar() {
      if (this.$refs.form.validate()) {
        // acciones si es válida la forma (formulario)
        return axios({
          method: 'post',
          data: {
            nombre: this.nombre,
            email: this.email,
            password: this.password,
          },
          url: '/usuarios/registro',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              '¡Excelente!',
              'Ha sido registrado satisfactoriamente',
              'Success',
            );
            this.$router.push({ name: 'Login' });
          })
          .catch((error) => {
            const mensaje = error.response.data.message;
            this.$swal('Error', `${mensaje}`, 'error');
          });
      }
      return true;
    },
    limpiar() {
      this.$refs.form.reset();
    },
  },
};
</script>
