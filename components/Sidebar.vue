<template>
  <div>
    <!-- Sidebar'ı açıp kapatmak için düğme -->
    <button 
      class="toggle-btn" 
      @click="toggleSidebar" 
      aria-label="Toggle sidebar" 
      :aria-expanded="isActive"
    >
      ☰
    </button>

    <!-- Sidebar Bileşeni -->
    <div 
      :class="['sidebar', { 'is-active': isActive }]" 
      role="navigation" 
      aria-label="Main Sidebar"
    >
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
  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.handleKeydown);
  },
  methods: {
    toggleSidebar(forceState) {
      this.isActive = forceState !== undefined ? forceState : !this.isActive;

      if (this.isActive) {
        this.$nextTick(() => {
          const firstLink = this.$el.querySelector(".menu-item");
          if (firstLink) firstLink.focus();
        });
      }
    },
    handleKeydown(event) {
      if (event.key === "Escape" && this.isActive) {
        this.toggleSidebar(false);
      }
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
  transform: translateX(-100%);
  transition: transform 0.2s ease;
  overflow-x: hidden;
  z-index: 99;
}

.sidebar.is-active {
  transform: translateX(0);
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar ul li {
  margin: 20px 0;
}

.menu-item {
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 8px;
  display: block;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #dcdcdc;
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
  z-index: 100;
  transition: background-color 0.2s ease;
}

.toggle-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Responsive Tasarım */
@media (max-width: 768px) {
  .sidebar {
    width: 200px;
  }
  .menu-item {
    font-size: 16px;
  }
}
</style>
