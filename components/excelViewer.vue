<template>
  <div>
    <!-- Yükleniyor durumu -->
    <div v-if="isLoading">
      <p>Yükleniyor...</p>
    </div>

    <!-- Yükleme tamamlandığında ve kartlar varsa -->
    <div v-else-if="wordCards.length">
      <v-row>
        <v-col>
          <v-row class="card-container" justify="center">
            <v-col
              v-for="(card, index) in wordCards"
              :key="index"
              cols="12"
              md="auto"
              class="card-col"
            >
              <div @click="toggleCard(index)" class="flip-card">
                <div :class="['flip-card-inner', { flipped: card.flipped }]">
                  <div :class="[ 'flip-card-front', getCardClass(card.arabic) ]">
                    <p class="arabic">{{ card.arabic }}</p>
                  </div>
                  <div class="flip-card-back">
                    <p class="turkish">{{ card.turkish }}</p>
                    <p v-if="card.kelime_cinsi" class="kelime-cinsi">{{ card.kelime_cinsi }}</p>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>

    <!-- Kart yoksa veya yükleme hatası varsa -->
    <div v-else>
      <p>Kart bulunamadı veya dosya yüklenemedi.</p>
    </div>
  </div>
</template>

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

.flip-card {
  perspective: 1000px;
  width: 100%;
  height: 120px;
  cursor: pointer; /* Tıklandığında el şeklinde cursor */
  display: flex;
  justify-content: center;
  align-items: center;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.2s;
  transform-style: preserve-3d;
}

.flip-card-inner.flipped {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  text-align: center;
  line-height: 1.2;
}

.flip-card-front {
  background-color: #ffcccb;
}

.gray-card {
  background-color: gray;
}

.blue-card {
  background-color: lightblue !important;
}

.flip-card-back {
  background-color: #add8e6;
  transform: rotateY(180deg);
}

.arabic {
  font-size: 30px;
}

.turkish {
  font-size: 16px;
}

.kelime-cinsi {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 10px;
  color: #000;
}
</style>

<script>
import * as XLSX from 'xlsx';

export default {
  props: {
    excelFile: {
      type: ArrayBuffer,
      default: null,
    },
    shuffle: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      wordCards: [],
      isLoading: true,
      isReading: false,  // Okuma durumunu kontrol etmek için
    };
  },
  watch: {
    excelFile: {
      immediate: true,
      handler(newFile) {
        if (newFile) {
          this.loadExcel(new Uint8Array(newFile));
        } else {
          this.resetCards();
        }
      },
    },
  },
  methods: {
    loadExcel(uintArr) {
      try {
        const workbook = XLSX.read(uintArr, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], { header: 1 });

        const headers = worksheet[0];
        const arabicIndex = headers.indexOf('arabic_word');
        const turkishIndex = headers.indexOf('turkish_meaning');
        const kelimeCinsiIndex = headers.indexOf('kelime_cinsi'); // Kelime cinsi sütunu

        if (arabicIndex === -1 || turkishIndex === -1) {
          throw new Error('Gerekli sütunlar bulunamadı.');
        }

        this.wordCards = worksheet.slice(1).map((row) => {
          return row ? {
            arabic: row[arabicIndex] || '',
            turkish: row[turkishIndex] || '',
            kelime_cinsi: row[kelimeCinsiIndex] || '', // Kelime cinsini ekle
            flipped: false,
          } : null;
        }).filter(Boolean); // Boş satırları filtrele

        if (this.shuffle) {
          this.wordCards = this.shuffleArray(this.wordCards);
        }
      } catch (error) {
        console.error('Excel yüklenirken hata oluştu:', error);
        this.resetCards();
      } finally {
        this.isLoading = false;
      }
    },

    toggleCard(index) {
      if (index < this.wordCards.length && !this.isReading) {
        const card = this.wordCards[index];
        card.flipped = !card.flipped;

        // Okuma işlemini sadece kart açıldığında başlat
        if (card.flipped) {
          this.readWord(card);

          // 2 saniye sonra kartı tekrar kapat
          setTimeout(() => {
            card.flipped = false;
          }, 2000);
        }
      }
    },

    readWord(card) {
      if (!this.isReading) {
        this.isReading = true; // Okuma başlatıldığında 'isReading' durumu true olacak

        const utterance = new SpeechSynthesisUtterance(card.arabic);
        utterance.lang = 'ar-SA';

        // Ses özelliklerini ayarlama
        utterance.rate = 0.9;   // Hızı biraz yavaşlat
        utterance.pitch = 1.2;  // Tonlamayı biraz artır
        utterance.volume = 1;   // Ses seviyesini yüksek tut

        // Tarayıcıda konuşma sentezi desteği var mı kontrol et
        if ('speechSynthesis' in window) {
          speechSynthesis.speak(utterance);
          
          // Okuma tamamlandıktan sonra 'isReading' durumunu false yap
          utterance.onend = () => {
            this.isReading = false;
          };
        } else {
          console.warn('Tarayıcınız konuşma sentezlemesini desteklemiyor.');
          this.isReading = false;
        }
      }
    },

    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },

    resetCards() {
      this.wordCards = [];
      this.isLoading = false;
    },

    // Kart rengi sınıfını döndüren fonksiyon
    getCardClass(word) {
      if (
        word.startsWith('الْ') || 
        word.startsWith('اَلْ') || 
        word.startsWith('مِنْ') || 
        word.startsWith('ال') || 
        word.startsWith('بِ') || 
        word.includes('ٌ') || 
        word.includes('ً') || 
        word.includes('ٍ') || 
        word.includes('ة')
      ) {
        return 'gray-card';
      } else if (word.startsWith('لَنْ')) {
        return 'blue-card';
      }

      return ''; // Varsayılan durumda boş
    },
  },
};
</script>
