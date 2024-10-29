<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" permanent>
      <v-list>
        <v-list-item
          v-for="(item, index) in navItems"
          :key="index"
          :to="item.to"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-btn icon @click="toggleDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title>ARAPÇA ÖĞRENİYORUM</v-toolbar-title>
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
export default {
  data() {
    return {
      drawer: false,
      navItems: [
        { title: 'S.MÜCERRED FİİLLER', to: '/' },
        { title: 'S.MEZİD FİİLLER', to: '/about' },
        { title: 'EMSİLEİ MUHTELİFE', to: '/ziya' },
        { title: '13 FİİL ÇEKİMİ', to: '/contact' },
        { title: 'ESMAUL HUSNA', to: '/sayfa' },
      ],
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
};
</script>

<style scoped>
.main-content {
  padding: 20px;
}
</style>
