<template>
  <div>
    <div v-if="isLoading">
      <p>Yükleniyor...</p>
    </div>
    <div v-else-if="wordCards.length">
      <v-row>
        <v-col>
          <v-row class="card-container" justify="center">
            <v-col v-for="(card, index) in wordCards" :key="index" cols="12" md="auto" class="card-col">
              <v-card @click="toggleCard(index)" :style="getCardStyle(index)" class="card">
                <v-card-text>
                  <p v-if="!card.flipped" class="arabic">{{ card.arabic }}</p>
                  <p v-else class="turkish">{{ card.turkish }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
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
          this.wordCards = [];
          this.isLoading = false;
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
          throw new Error("Gerekli sütunlar bulunamadı.");
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
        console.error("Excel yüklenirken hata oluştu:", error);
        this.wordCards = [];
      } finally {
        this.isLoading = false;
      }
    },
    toggleCard(index) {
      if (index < this.wordCards.length) {
        this.wordCards[index].flipped = !this.wordCards[index].flipped;
      }
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
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
