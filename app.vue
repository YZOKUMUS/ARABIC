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
   <v-spacer />
   <v-toolbar-title class="text-center" style="flex: 1; color: blue; font-size: 26px; line-height: 1.9;">
   {{ currentTitle }}
  </v-toolbar-title>
   <v-spacer />
   </v-app-bar>
  
   <!-- İçerik Alanı -->
   <v-container>
   <v-container class="main-content mt-15">
   <!-- Dinamik Sayfa İçeriği -->
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
   currentTitle: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ', // Varsayılan başlık
   navItems: [
   { title: 'S.MÜCERRED FİİLLER', to: '/' },
   { title: 'S.MEZİD FİİLLER', to: '/about' },
   { title: 'EMSİLEİ MUHTELİFE', to: '/ziya' },
   { title: '13 FİİL ÇEKİMİ', to: '/contact' },
   { title: 'ESMAUL HUSNA', to: '/sayfa' },
   { title: 'KURANDA GEÇEN FİİLLER', to: '/kurandagecenfiiller' },
   ],
   };
   },
   methods: {
   toggleDrawer() {
   this.drawer = !this.drawer; // Yan menüyü aç/kapat
   },
   navigateTo(route, title) {
   this.$router.push(route); // Rotayı değiştir
   
   // Yan menüyü kapatıyoruz
   this.drawer = false;
  
   // Üst menü başlığını güncelliyoruz
   this.currentTitle = title;
   },
   },
  };
  </script>
  
  <style scoped>
  .main-content {
   padding: 20px;
  }
  </style>
  