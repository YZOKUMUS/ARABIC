<template>
  <div>
    <!-- Excel Viewer bileşeni için dosya yükleme -->
    <excel-viewer :excelFile="uploadedFile" :shuffle="false" />
    <!-- Yüklenen dosyayı gösteren bileşen -->
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
    this.loadFile(); // loadFile metodunu çağırarak dosyayı yüklemeye başla
  },
  methods: {
    /**
     * Excel dosyasını yükler ve arrayBuffer olarak saklar.
     */
    async loadFile() {
      try {
        // Belirtilen dosyayı fetch ile yükle
        const response = await fetch('./mezidfiiller.xlsx');
        if (!response.ok) {
          throw new Error('Dosya yüklenirken hata oluştu'); // Hata durumunu yakala
        }
        // Yüklenen dosyayı ArrayBuffer formatında al
        const arrayBuffer = await response.arrayBuffer();
        this.uploadedFile = arrayBuffer; // ArrayBuffer olarak excelFile prop'una gönderiliyor
      } catch (error) {
        console.error('Yükleme hatası:', error); // Hata durumunu konsola yazdır
      }
    },
  },
};
</script>
