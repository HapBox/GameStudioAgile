<template>
  <div class="main-layout">
    <NavBar />
    <h2 class="page-title">
      {{ $route.meta.title }}
    </h2>
    <div class="page-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "MainLayout",
  components: {
    NavBar,
  },
};
</script>