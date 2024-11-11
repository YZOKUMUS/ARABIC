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
                  <div
                    :class="[ 'flip-card-front', cardColor(card.arabic) ]"
                  >
                    <p class="arabic">{{ card.arabic }}</p>
                  </div>
                  <div class="flip-card-back">
                    <p class="turkish">{{ card.turkish }}</p>
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

        if (arabicIndex === -1 || turkishIndex === -1) {
          throw new Error('Gerekli sütunlar bulunamadı.');
        }

        this.wordCards = worksheet.slice(1).map((row) => ({
          arabic: row[arabicIndex] || '',
          turkish: row[turkishIndex] || '',
          flipped: false,
        }));

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
      if (index < this.wordCards.length) {
        this.wordCards[index].flipped = !this.wordCards[index].flipped;

        if (this.wordCards[index].flipped) {
          this.readWord(this.wordCards[index]);
        }
      }
    },

    readWord(card) {
      const utterance = new SpeechSynthesisUtterance(card.arabic);
      utterance.lang = 'ar-SA';
      speechSynthesis.speak(utterance);
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

    cardColor(word) {
      if (word.startsWith('لَا')) return 'red-card';
      if (word.startsWith('لِ')) return 'green-card';
      if (word.startsWith('اِ') || word.startsWith('اُ')) return 'yellow-card';
      return '';
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

.flip-card {
  perspective: 1000px;
  width: 100%;
  height: 120px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.3s;
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

.red-card {
  background-color: red;
}

.green-card {
  background-color: green;
}

.yellow-card {
  background-color: yellow;
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
</style>
