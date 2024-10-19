<template>
    <div>
      <!-- Sidebar container -->
      <div :class="['sidebar', { 'is-active': isActive }]">
        <nav>
          <ul v-if="isActive">
            <li><nuxt-link to="/">Home</nuxt-link></li>
            <li><nuxt-link to="/about">About</nuxt-link></li>
            <li><nuxt-link to="/contact">Contact</nuxt-link></li>
          </ul>
        </nav>
      </div>
  
      <!-- Toggle button outside of the sidebar -->
      <button @click="toggleSidebar" class="toggle-btn">
        {{ isActive ? 'Close' : 'Open' }} Sidebar
      </button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isActive: true // Sidebar starts open
      };
    },
    methods: {
      toggleSidebar() {
        this.isActive = !this.isActive;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Sidebar base styles */
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 250px; /* Full width when active */
    background-color: #333;
    color: white;
    padding: 16px;
    transition: width 0.3s ease, transform 0.3s ease;
    overflow-x: hidden; /* Ensure no scrollbars appear */
  }
  
  /* When the sidebar is collapsed */
  .sidebar:not(.is-active) {
    width: 60px; /* Smaller width when collapsed */
  }
  
  /* Sidebar list styles */
  .sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .sidebar ul li {
    margin: 16px 0;
  }
  
  .sidebar ul li a {
    color: white;
    text-decoration: none;
    font-size: 18px;
  }
  
  /* Toggle button styles */
  .toggle-btn {
    position: fixed;
    top: 16px;
    left: 60px; /* Positioned next to the collapsed sidebar */
    background-color: #444;
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    z-index: 10; /* Ensure the button is above content */
  }
  
  .toggle-btn:hover {
    background-color: #555;
  }
  </style>
  