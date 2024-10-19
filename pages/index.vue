<template>
  <div>
    <h1>Upload Excel File</h1>
    <v-file-input
      label="Choose Excel File"
      @change="handleFileUpload"
      accept=".xlsx, .xls"
    />
    <v-row v-if="wordCards.length">
      <v-col>
        <h2>Word Cards</h2>
        <v-row class="card-container" justify="center">
          <v-col v-for="(card, index) in wordCards" :key="index" cols="auto">
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
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const wordCards = ref([]);

    const loadExcel = (uintArr) => {
      const data = uintArr;
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], { header: 1 });

      const headers = worksheet[0];
      const arabicIndex = headers.indexOf('arabic_word');
      const turkishIndex = headers.indexOf('turkish_meaning');

      wordCards.value = shuffleArray(
        worksheet.slice(1).map((row) => ({
          arabic: row[arabicIndex],
          turkish: row[turkishIndex],
          flipped: false,
        }))
      );
    };

        // Fonksiyon: Arapça kelimeyi sesli okuma
    const readAloud = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar'; // Arapça dil kodu
      window.speechSynthesis.speak(utterance);
    };

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          loadExcel(data);
        };
        reader.readAsArrayBuffer(file);
      }
    };

    const toggleCard = (index) => {
      wordCards.value[index].flipped = !wordCards.value[index].flipped;
      if (wordCards.value[index].flipped) {
        readAloud(wordCards.value[index].arabic); // Play sound when card is flipped to Arabic
      }
    };

    const getCardStyle = (index) => {
      const colors = ['#ffcccb', '#add8e6', '#90ee90', '#ffffe0', '#ffb6c1', '#d3d3d3'];
      return {
        backgroundColor: wordCards.value[index].flipped
          ? colors[index % colors.length]
          : colors[(index + 1) % colors.length],
        boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
        transition: 'background-color 0.3s, box-shadow 0.3s',
      };
    };

    onMounted(async () => {
      const response = await fetch('./kelimeler.xlsx');
      const arrayBuffer = await response.arrayBuffer();
      loadExcel(new Uint8Array(arrayBuffer));
    });

    return {
      wordCards,
      handleFileUpload,
      toggleCard,
      getCardStyle,
    };
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px; /* Space between cards */
}

.card {
  width: 150px; /* Card width */
  height: 120px; /* Card height */
  transition: transform 0.3s; /* Smooth transition */
}

.card:hover {
  transform: translateY(-3px); /* Lift effect on hover */
}

.card p.arabic {
  margin: 0; /* Remove default margin */
  font-size: 50px; /* Arabic font size */
  text-align: center; /* Center text */
  line-height: 1.2; /* Line height */
}

.card p.turkish {
  margin: 0; /* Remove default margin */
  font-size: 18px; /* Turkish font size (smaller) */
  text-align: center; /* Center text */
  line-height: 1.2; /* Line height */
}
</style>
