<template>
  <div v-if="excelFile !== null">
    <v-row v-if="wordCards.length">
      <v-col>
        <v-row class="card-container" justify="center">
          <v-col v-for="(card, index) in wordCards" :key="index" cols="auto" class="card-col">
            <v-card @click="toggleCard(index)" :style="getCardStyle(index)" class="card">
              <v-card-text>
                <!-- Kart ters çevrilmemişse Arapça, aksi takdirde Türkçe göster -->
                <p v-if="!card.flipped" class="arabic">{{ card.arabic }}</p>
                <p v-else class="turkish">{{ card.turkish }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';

export default {
  props: {
    // Excel dosyası için giriş özelliği (ArrayBuffer olarak)
    excelFile: {
      type: ArrayBuffer,
      default: null,
    },
    // Kelime kartları için karıştırma seçeneği
    shuffle: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      // Kelime kartları verilerini saklamak için dizi
      wordCards: [],
    };
  },
  methods: {
    /**
     * Excel dosyasını yükle ve kelime kartlarını çıkar.
     * @param {Uint8Array} uintArr - Excel dosyasının Uint8Array temsili.
     */
    loadExcel(uintArr) {
      // Çalışma kitabını oku ve ilk sayfayı al
      const workbook = XLSX.read(uintArr, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], { header: 1 });

      // Arapça ve Türkçe sütunlarının indekslerini bul
      const headers = worksheet[0];
      const arabicIndex = headers.indexOf('arabic_word');
      const turkishIndex = headers.indexOf('turkish_meaning');

      // Sayfa verilerinden kelime kartlarını oluştur
      this.wordCards = worksheet.slice(1).map((row) => ({
        arabic: row[arabicIndex] || '',  // Tanımsızsa varsayılan boş dize
        turkish: row[turkishIndex] || '', // Tanımsızsa varsayılan boş dize
        flipped: false,
      }));

      // Karıştırma seçeneği etkinse kartları karıştır
      if (this.shuffle) {
        this.wordCards = this.shuffleArray(this.wordCards);
      }
    },

    /**
     * Verilen diziyi Fisher-Yates algoritması ile karıştır.
     * @param {Array} array - Karıştırılacak dizi.
     * @returns {Array} - Karıştırılmış dizi.
     */
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Elemanları takas et
      }
      return array;
    },

    /**
     * Bir kartın ters çevirme durumunu değiştir ve ters çevrildiyse Arapça metni sesli oku.
     * @param {number} index - Ters çevrilecek kartın indeksi.
     */
    toggleCard(index) {
      if (index < this.wordCards.length) {
        this.wordCards[index].flipped = !this.wordCards[index].flipped;
        // Kart ters çevrildiyse sesli oku
        if (this.wordCards[index].flipped) {
          this.readAloud(this.wordCards[index].arabic);
        }
      } else {
        console.warn('Kartı ters çevirmek için geçersiz indeks');
      }
    },

    /**
     * Dosya yükleme işlemini yönet ve Excel dosyasını oku.
     * @param {Event} event - Dosya yükleme olayı.
     */
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.loadExcel(new Uint8Array(e.target.result));
        };
        reader.readAsArrayBuffer(file);
      }
    },

    /**
     * Verilen metni ses sentezi ile sesli oku.
     * @param {string} text - Sesli okunacak metin.
     */
    readAloud(text) {
      window.speechSynthesis.cancel(); // Devam eden konuşmayı durdur
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar'; // Dili Arapça olarak ayarla
      window.speechSynthesis.speak(utterance);
    },

    /**
     * Kartın stilini ters çevirme durumuna göre al.
     * @param {number} index - Kartın indeksi.
     * @returns {Object} - Kart için stil nesnesi.
     */
    getCardStyle(index) {
      const colors = ['#ffcccb', '#add8e6', '#90ee90', '#ffffe0', '#ffb6c1', '#d3d3d3'];
      return {
        backgroundColor: this.wordCards[index].flipped
          ? colors[index % colors.length]
          : colors[(index + 1) % colors.length],
        boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
        transition: 'background-color 0.3s, box-shadow 0.3s',
      };
    },
  },
  watch: {
    // excelFile özelliğindeki değişiklikleri izle ve yeni dosyayı yükle
    excelFile: {
      immediate: true,
      handler(newFile) {
        if (newFile) {
          this.loadExcel(new Uint8Array(newFile));
        } else {
          // Dosya yoksa temizleme yap
          this.wordCards = [];
        }
      },
    },
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.card-col {
  flex: 0 1 150px;
  max-width: 150px;
}

.card {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-3px);
}

.card p.arabic {
  margin: 0;
  font-size: 30px;
  text-align: center;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.card p.turkish {
  margin: 0;
  font-size: 16px;
  text-align: center;
  line-height: 1.2;
  white-space: normal;
  max-width: 100%;
}
</style>
