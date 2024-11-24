<template>
  <div>
    <!-- Excel Viewer bileşeni için dosya yükleme -->
    <excel-viewer :excelFile="uploadedFile" :shuffle="false" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadedFile: null, // Yüklenen dosya burada saklanacak
    };
  },
  mounted() {
    // Bileşen monte edildiğinde dosyayı yükle
    this.loadFile();
  },
  methods: {
    /**
     * Excel dosyasını yükler ve arrayBuffer olarak saklar.
     */
    async loadFile() {
      try {
        const response = await fetch('./ortakkelimeler.xlsx'); // Excel dosyasını yükle
        if (!response.ok) {
          throw new Error('Dosya yüklenirken hata oluştu'); // Hata durumunu kontrol et
        }
        const arrayBuffer = await response.arrayBuffer();
        this.uploadedFile = arrayBuffer; // ArrayBuffer olarak excelFile prop'una gönderiliyor
      } catch (error) {
        console.error('Yükleme hatası:', error); // Hata durumunu konsola yazdır
      }
    },
  },
};
</script>
