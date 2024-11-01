<template>
  <div>
    <!-- Sidebar'ı açıp kapatmak için düğme -->
    <button class="toggle-btn" @click="toggleSidebar">
      ☰
    </button>

    <!-- Sidebar Bileşeni -->
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
      isActive: false, // Sidebar başlangıçta kapalı
    };
  },
  methods: {
    toggleSidebar() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style scoped>
/* Sidebar stilleri */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  background-color: #1a241c;
  color: white;
  padding: 16px;
  transform: translateX(-100%); /* Başlangıçta kapalı */
  transition: transform 0.3s ease;
  overflow-x: hidden;
  z-index: 5;
}

.sidebar.is-active {
  transform: translateX(0); /* Açıkken görünür */
}

/* Sidebar içindeki liste stilleri */
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar ul li {
  margin: 16px 0;
}

/* Sekme stilleri */
.menu-item {
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 8px;
  display: block;
  transition: background-color 0.3s ease;
}

.menu-item:hover {
  background-color: #5555557e;
}

/* Toggle buton stilleri */
.toggle-btn {
  position: fixed;
  top: 16px;
  left: 16px;
  background-color: #444;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.3s ease;
}

.toggle-btn:hover {
  background-color: #55555565;
}
</style>
