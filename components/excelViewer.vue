<template>
  <div v-if="excelFile !== null">
    <h1>Upload Excel File</h1>
    <v-file-input label="Choose Excel File" @change="handleFileUpload" accept=".xlsx, .xls" />
    <v-row v-if="wordCards.length">
      <v-col>
        <h2>Word Cards</h2>
        <v-row class="card-container" justify="center">
          <v-col v-for="(card, index) in wordCards" :key="index" cols="auto" class="card-col">
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
</template>

<script>
import * as XLSX from 'xlsx';

export default {
  props: {
    excelFile: {
      type: ArrayBuffer,
      default: () => null,
    },
  },
  data() {
    return {
      wordCards: [],
    };
  },
  methods: {
    loadExcel(uintArr) {
      const data = uintArr;
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], { header: 1 });

      const headers = worksheet[0];
      const arabicIndex = headers.indexOf('arabic_word');
      const turkishIndex = headers.indexOf('turkish_meaning');

      this.wordCards = this.shuffleArray(
        worksheet.slice(1).map((row) => ({
          arabic: row[arabicIndex],
          turkish: row[turkishIndex],
          flipped: false,
        }))
      );
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    toggleCard(index) {
      if (this.wordCards && this.wordCards.length > index) {
        this.wordCards[index].flipped = !this.wordCards[index].flipped;
        if (this.wordCards[index].flipped) {
          this.readAloud(this.wordCards[index].arabic);
        }
      } else {
        console.warn(
          'Attempted to flip a card but wordCards is not available or index is out of bounds'
        );
      }
    },
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
    readAloud(text) {
      // Cancel any ongoing speech before starting a new one
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar';
      window.speechSynthesis.speak(utterance);
    },

    getCardStyle(index) {
      if (this.wordCards && this.wordCards.length > index) {
        const colors = ['#ffcccb', '#add8e6', '#90ee90', '#ffffe0', '#ffb6c1', '#d3d3d3'];
        return {
          backgroundColor: this.wordCards[index].flipped
            ? colors[index % colors.length]
            : colors[(index + 1) % colors.length],
          boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
          transition: 'background-color 0.3s, box-shadow 0.3s',
        };
      }
      return {}; // Return an empty style if index is out of bounds
    },
  },
  watch: {
    excelFile: {
      immediate: true,
      handler(newFile) {
        if (newFile) {
          this.loadExcel(new Uint8Array(newFile));
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
  gap: 16px; /* Space between cards */
  justify-content: center; /* Center the cards */
}

.card-col {
  flex: 0 1 150px; /* Set a base width for the card column */
  max-width: 150px; /* Ensure maximum width for responsiveness */
}

.card {
  width: 100%; /* Ensure card fills the column */
  height: 120px;
  display: flex; /* Enable flexbox */
  align-items: center; /* Vertically center content */
  justify-content: center; /* Horizontally center content */
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-3px);
}

.card p.arabic {
  margin: 0;
  font-size: 30px; /* Adjust font size for Arabic text */
  text-align: center;
  line-height: 1.2;
  white-space: nowrap; /* Prevent Arabic text from wrapping */
  overflow: hidden; /* Hide overflowing text */
  text-overflow: ellipsis; /* Add ellipsis for overflowed text */
  max-width: 100%; /* Ensure the text doesn't exceed card width */
}

.card p.turkish {
  margin: 0;
  font-size: 16px; /* Adjust font size for Turkish text */
  text-align: center;
  line-height: 1.2;
  white-space: normal; /* Allow Turkish text to wrap */
  text-wrap: wrap;
  max-width: 100%; /* Ensure the text doesn't exceed card width */
}

</style>
