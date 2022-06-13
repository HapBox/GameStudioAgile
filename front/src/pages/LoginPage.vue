<template>
  <form class="auth-form" @submit.prevent="onFormSubmit">
    <div class="form-field">
      <label for="login">Логин</label>
      <input v-model="login" id="login" type="text" required />
    </div>
    <div class="form-field">
      <label for="password">Пароль</label>
      <input v-model="password" id="password" type="password" required />
    </div>
    <div>
      <span style="color: red"> {{ errorMessage }} </span>
    </div>
    <button type="submit">Войти</button>
  </form>
</template>

<script>

import { doLogin } from "@/netClient/authService";
import sha256 from 'sha256'
export default {
  name: "LoginPage",
  data: () => ({
    errorMessage: "",
    login: "",
    password: "",
  }),
  methods: {
    redirect() {
      this.$router.push("/registration");
    },
    async onFormSubmit() {
      try {
        const token = await doLogin(this.login.trim(), sha256(this.password.trim()));
        if (token) {
          this.$router.push("/");
        }
      } catch (error) {
        this.errorMessage = error.response.data.message;
        console.error(error);
      }
    },
  },
};
</script>