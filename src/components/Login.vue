<template>
  <div>
    <div class="login">
      <a class="btn facebook" href="/login/facebook">Acceder con Facebook</a>
      <a class="btn twitter" href="/login/twitter">Acceder con Twitter</a>
      <a class="btn google" href="/login/google">Acceder con Google</a>
      <a class="btn linkedin" href="/login/linkedin">Acceder con LinkedIn</a>
    </div>
    <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field
            label="Email:"
            v-model="email"
            :rules="reglasEmail"
            required
        ></v-text-field>
        <v-text-field
            label="Contraseña:"
            v-model="password"
            type="password"
            required
        ></v-text-field>
        <v-btn @click="enviar" :disabled="!valid">Enviar</v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios';
import bus from './../bus';

export default {
  data: () => ({
    valid: true,
    email: '',
    password: '',
    reglasEmail: [
      v => !!v || 'Se requiere el email',
      v => /\S+@\S+\.\S/.test(v) || 'El email debe ser valido',
    ],
  }),
  methods: {
    async enviar() {
      return axios({
        method: 'post',
        data: {
          email: this.email,
          password: this.password,
        },
        url: '/usuarios/login',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          window.localStorage.setItem('auth', response.data.token);
          this.$swal('Felicidades!!', 'Está listo para iniciar!', 'Success');
          bus.$emit('refreshUser');
          this.$router.push({ name: 'Inicio' });
          location.reload();
        })
        .catch((error) => {
          const mensaje = error.response.data.message;
          this.$swal('Error', `${mensaje}`, 'error');
          this.$router.push({ name: 'Login' });
        });
    },
    limpiar() {
      this.$refs.form.reset();
    },
  },
};
</script>
