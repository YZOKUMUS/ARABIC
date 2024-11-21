<template>
  <div>
    <!-- Yüklenen PDF dosyasını göster -->
    <object v-if="uploadedPdf" :data="uploadedPdf" type="application/pdf" class="pdf-fit">
      <p>
        Bu tarayıcı PDF görüntülemeyi desteklemiyor. PDF dosyasını indirmek için
        <a :href="uploadedPdf" download>buraya tıklayın</a>.
      </p>
    </object>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadedPdf: null, // Yüklenen PDF'in URL'sini saklamak için değişken
    };
  },
  mounted() {
    // Bileşen monte edildiğinde dosyayı yükle
    this.loadPdf();
  },
  methods: {
    /**
     * PDF dosyasını yükler ve görüntülemek için bir URL oluşturur.
     */
    async loadPdf() {
      try {
        const response = await fetch('./arapcabablar.pdf'); // PDF dosyasını yükle
        if (!response.ok) {
          throw new Error('Dosya yüklenirken hata oluştu'); // Hata durumunu kontrol et
        }
        const blob = await response.blob();
        this.uploadedPdf = URL.createObjectURL(blob); // PDF'in URL'sini oluştur
      } catch (error) {
        console.error('Yükleme hatası:', error); // Hata durumunu konsola yazdır
      }
    },
  },
};
</script>

<style scoped>
.pdf-fit {
  width: 100%;
  height: 100vh;
  display: block;
  margin: 0 auto;
}
</style>
