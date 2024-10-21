<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" permanent>
      <v-list>
        <v-list-item v-for="(item, index) in navItems" :key="index" @click="item.action">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-btn icon @click="toggleDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title>YZOKUMUS Arabic Word Cards</v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-container>
      <v-container class="main-content mt-15">
        <NuxtPage />
      </v-container>
    </v-container>
  </v-app>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const drawer = ref(false);

    const toggleDrawer = () => {
      drawer.value = !drawer.value;
    };

    const navItems = ref([
      { title: 'ARAPÇA KELİME ÖĞRENME', action: () => (window.location.href = '/') },
      { title: 'BOS SAYFA', action: () => (window.location.href = '/about') },
      { title: '24 SIGA ÇEKİM', action: () => (window.location.href = '/ziya') },
      { title: '14 FİİL ÇEKİMİ', action: () => (window.location.href = '/contact') },
      { title: 'BOS SAYFA 2', action: () => (window.location.href = '/sayfa') },
    ]);

    return {
      drawer,
      toggleDrawer,
      navItems,
    };
  },
};
</script>

<style scoped>
.main-content {
  padding: 20px; /* Optional padding around the main content */
}
</style>
