<template>
  <div id="app">
    <component :is="layout">
      <!-- <router-view /> -->
    </component>
  </div>
</template>

<script>
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
export default {
  name: "App",
  components: {
    MainLayout,
    AuthLayout,
  },
  data: () => ({
    updateTask: {},
  }),
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>