<template>
  <v-app>
    <!-- Yan Menü (Navigation Drawer) -->
    <v-navigation-drawer app v-model="drawer" permanent>
      <v-list>
        <v-list-item
          v-for="(item, index) in navItems"
          :key="index"
          :to="item.to"
          @click="navigateTo(item.to, item.title)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <!-- Üst Menü (App Bar) -->
    <v-app-bar app>
      <v-btn icon @click="toggleDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title class="text-center" style="flex: 1; color: blue; font-size: 26px; line-height: 1.9;">
        {{ currentTitle }}
      </v-toolbar-title>
    </v-app-bar>
    
    <!-- İçerik Alanı -->
    <v-container class="main-content mt-15">
      <NuxtPage />
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      currentTitle: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ', // Varsayılan başlık
      navItems: [
        { title: 'S.MÜCERRED FİİLLER', to: '/' },
        { title: 'S.MEZİD FİİLLER', to: '/about' },
        { title: 'EMSİLEİ MUHTELİFE', to: '/ziya' },
        { title: '731 KELİME', to: '/contact' },
        { title: 'ESMAUL HUSNA', to: '/sayfa' },
        { title: 'ARAPÇA EN TEMEL 250 FİİL', to: '/fiil250' },
        { title: 'AKSAM-I SEBA', to: '/aksamiseba' },
        { title: 'ARAPÇA BABLAR', to: '/arapcabablar' },
      ],
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer; // Yan menüyü aç/kapat
    },
    navigateTo(route, title) {
      this.$router.push(route); // Rotayı değiştir
      this.drawer = false; // Yan menüyü kapatıyoruz
      this.currentTitle = title; // Üst menü başlığını güncelliyoruz
    },
  },
};
</script>

<style scoped>
.main-content {
  padding: 20px;
}
</style>
