<template>
  <div id="nav">
    <router-link to="/"> Задачи </router-link>
    <router-link to="/bugs">Баги </router-link>
    <router-link to="/games"> Игры </router-link>
    <router-link
      v-if="position === 'CommunityManager' || position === 'Gamedesigner'"
      to="/playtests"
    >
      Плейтесты
    </router-link>
    <router-link v-if="position === 'Gamedesigner'" to="/registration">
      Регистрация
    </router-link>
    <a @click="onLogoutClicked"> Выход </a>
  </div>
</template>

<script>
import { doLogout } from "@/netClient/authService";
export default {
  name: "NavBar",
  computed: {
    position() {
      return localStorage.workerPosition;
    },
  },
  methods: {
    async onLogoutClicked() {
      try {
        await doLogout();
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
