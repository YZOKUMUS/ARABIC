<template>
    <div>
      <!-- Yüklenen resim dosyasını göster -->
      <img v-if="uploadedImage" :src="uploadedImage" alt="Yüklenen Resim" class="image-fit" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        uploadedImage: null, // Yüklenen resmin URL'sini saklamak için değişken
      };
    },
    mounted() {
      // Bileşen monte edildiğinde dosyayı yükle
      this.loadImage();
    },
    methods: {
      /**
       * Resim dosyasını yükler ve görüntülemek için bir URL oluşturur.
       */
      async loadImage() {
        try {
          const response = await fetch('./aksamiseba.jpg'); // Resim dosyasını yükle
          if (!response.ok) {
            throw new Error('Dosya yüklenirken hata oluştu'); // Hata durumunu kontrol et
          }
          const blob = await response.blob();
          this.uploadedImage = URL.createObjectURL(blob); // Resmin URL'sini oluştur
        } catch (error) {
          console.error('Yükleme hatası:', error); // Hata durumunu konsola yazdır
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .image-fit {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
  </style>
  
  