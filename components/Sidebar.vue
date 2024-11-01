<template>
  <div>
    <!-- Toggle Button for sidebar -->
    <button class="toggle-btn" @click="toggleSidebar">
      ☰
    </button>

    <!-- Sidebar Container with dynamic class binding for active state -->
    <div :class="['sidebar', { 'is-active': isActive }]">
      <nav>
        <ul>
          <li><nuxt-link to="/" class="menu-item">Home</nuxt-link></li>
          <li><nuxt-link to="/about" class="menu-item">About</nuxt-link></li>
          <li><nuxt-link to="/contact" class="menu-item">Contact</nuxt-link></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Sidebar'ın başlangıç durumu: açık
      isActive: true,
    };
  },
  methods: {
    /**
     * Sidebar'ın görünümünü açıp kapatmak için kullanılır.
     */
    toggleSidebar() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style scoped>
/* Sidebar temel stilleri */
.sidebar {
  position: fixed; /* Sidebar'ı sabit konumda tut */
  top: 0;
  left: 0;
  height: 100%; /* Tam yükseklik */
  width: 250px; /* Açıkken tam genişlik */
  background-color: #1a241c; /* Arka plan rengi */
  color: rgb(124, 23, 23); /* Yazı rengi */
  padding: 16px; /* İç boşluk */
  transform: translateX(0); /* Varsayılan konum */
  transition: width 0.3s ease, transform 0.3s ease; /* Geçiş efektleri */
  overflow-x: hidden; /* Yatay taşmayı gizle */
  z-index: 5; /* Diğer bileşenlerin üstünde görünmesi için */
}

/* Sidebar kapalı durumdaykenki stil */
.sidebar:not(.is-active) {
  width: 60px; /* Küçük genişlik */
  transform: translateX(-190px); /* Sola kaydır */
}

/* Sidebar içindeki liste stilleri */
.sidebar ul {
  list-style: none; /* Liste işaretlerini kaldır */
  padding: 0; /* İç boşluğu kaldır */
  margin: 0; /* Dış boşluğu kaldır */
}

.sidebar ul li {
  margin: 16px 0; /* Liste elemanları arasında boşluk */
}

/* Sekme stilleri */
.menu-item {
  color: white; /* Varsayılan yazı rengi */
  text-decoration: none; /* Alt çizgi yok */
  font-size: 18px; /* Yazı boyutu */
  padding: 8px; /* İç boşluk */
  display: block; /* Tam genişlik için */
  transition: background-color 0.3s ease; /* Geçiş efekti */
}

/* Sekmelere fare ile gelindiğinde renk değişimi */
.menu-item:hover {
  background-color: #5555557e; /* Hover rengi */
}

/* Toggle buton stilleri */
.toggle-btn {
  position: fixed; /* Sabit konum */
  top: 16px;
  left: 60px; /* Kapalı sidebar'ın yanına yerleştir */
  background-color: #444; /* Buton arka plan rengi */
  color: white; /* Buton yazı rengi */
  border: none; /* Kenar çizgisi yok */
  padding: 8px 16px; /* İç boşluk */
  cursor: pointer; /* Üzerine gelindiğinde imleç değişir */
  z-index: 10; /* Diğer bileşenlerin üstünde görünmesi için */
}

/* Toggle butonuna fare ile geldiğinde stil değişikliği */
.toggle-btn:hover {
  background-color: #55555565; /* Hover rengi */
}
</style>
