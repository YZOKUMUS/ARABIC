<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" permanent>
      <v-list>
        <v-list-item
          v-for="(item, index) in navItems"
          :key="index"
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
      currentTitle: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ',
      navItems: [
        { title: 'S.MÜCERRED FİİLLER', to: '/' },
        { title: 'S.MEZİD FİİLLER', to: '/about' },
        { title: 'EMSİLEİ MUHTELİFE', to: '/ziya' },
        { title: '731 KELİME', to: '/contact' },
        { title: 'ESMAUL HUSNA', to: '/sayfa' },
        { title: 'ARAPÇA EN TEMEL 360 FİİL', to: '/fiil360' },
        { title: 'AKSAM-I SEBA', to: '/aksamiseba' },
        { title: 'ARAPÇA BABLAR', to: '/arapcabablar' },
        { title: 'KURAN TAMAMI', to: '/kuran' },
        { title: 'HARFİ CERLER', to: '/harficerler' },
        { title: 'GÜNLÜK ARAPÇA KELİMELER', to: '/gunlukarapcakelimeler' },
      ],
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    navigateTo(item) {
      this.$router.push(item.to);
      this.drawer = false;
      this.currentTitle = item.title;
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
  color: blue;
  font-size: 26px;
  line-height: 1.9;
}

/* Yan menünün açılma ve kapanma hızını artırmak için geçiş süresi ayarı */
.v-navigation-drawer {
  transition-duration: 0.2s !important; /* Varsayılan süreyi azaltıyoruz */
}
</style>
