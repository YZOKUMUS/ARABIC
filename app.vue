<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" close-on-click>
      <v-list>
        <v-list-item
          v-for="item in navItems"
          :key="item.id"
          :to="item.to"
          @click="navigateTo(item)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-btn icon @click="toggleDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title class="text-center app-title">
        {{ currentTitle }}
      </v-toolbar-title>
    </v-app-bar>

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
      navItems: [
        { id: 1, title: 'EMSİLE-İ MUHTELİFE', to: '/ziya' },
        { id: 2, title: 'S.MÜCERRED FİİLLER', to: '/' },
        { id: 3, title: 'S.MEZİD FİİLLER', to: '/about' },
        { id: 4, title: '731 KELİME', to: '/contact' },
        { id: 5, title: 'ARAPÇA-TÜRKÇE ORTAK KELİMELER', to: '/ortakkelimeler' },
        { id: 6, title: 'ESMAUL HUSNA', to: '/sayfa' },
        { id: 7, title: 'ARAPÇA EN TEMEL 990 KELİME', to: '/kelime990' },
        { id: 8, title: 'AKSAM-I SEBA', to: '/aksamiseba' },
        { id: 9, title: 'BAB ŞEMASI', to: '/bablar' },
        { id: 10, title: 'ARAPÇA BABLAR', to: '/arapcabablar' },
        { id: 11, title: 'KURAN TAMAMI', to: '/kuran' },
        { id: 12, title: 'HARFİ CERLER', to: '/harficerler' },
        { id: 13, title: 'GÜNLÜK ARAPÇA KELİMELER', to: '/gunlukarapcakelimeler' },
      ],
    };
  },
  computed: {
    currentTitle() {
      const currentRoute = this.$route.path;
      const activeItem = this.navItems.find(item => item.to === currentRoute);
      return activeItem ? activeItem.title : 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ';
    },
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    navigateTo(item) {
      this.$router.push(item.to);
    },
  },
};
</script>

<style scoped>
.main-content {
  padding: 20px;
}
.app-title {
  flex: 1;
  color: var(--main-title-color, blue); /* Varsayılan tema rengi */
  font-size: 26px;
  line-height: 1.9;
}

.v-navigation-drawer {
  transition-duration: 0.2s !important;
}
</style>
