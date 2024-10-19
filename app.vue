<template>
  <div class="card" v-if="currentCard" @click="flipCard">
    <div :class="['card-inner', { flipped }]">
      <div class="card-front">
        <h2>{{ currentCard.arabic_word }}</h2>
      </div>
      <div class="card-back">
        <h2>{{ currentCard.turkish_meaning }}</h2>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';

export default {
  data() {
    return {
      flipped: false,
      cards: [],
      currentIndex: 0,
    };
  },
  async mounted() {
    await this.loadExcelData();
  },
  methods: {
    async loadExcelData() {
      try {
        const response = await fetch('/kelimeler.xlsx');
        const data = await response.arrayBuffer();
        
        // Parse the Excel file
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        // Convert the sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Set the cards data
        this.cards = jsonData.map(item => ({
          arabic_word: item.arabic_word,
          turkish_meaning: item.turkish_meaning
        }));

        // Optional: Set the initial currentIndex to 0 if there are cards
        if (this.cards.length > 0) {
          this.currentIndex = 0; // Ensure the currentIndex is valid
        }
      } catch (error) {
        console.error("Error loading Excel data:", error);
      }
    },
    flipCard() {
      this.flipped = !this.flipped;
    },
  },
  computed: {
    currentCard() {
      return this.cards[this.currentIndex]; // This might be undefined if cards array is empty
    },
  },
};
</script>

<style scoped>
.card {
  width: 200px;
  height: 300px;
  perspective: 1000px;
  cursor: pointer;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card-inner.flipped {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

.card-front {
  background-color: #ffffff;
  border: 1px solid #ccc;
}

.card-back {
  background-color: #f1c40f;
  transform: rotateY(180deg);
}
</style>
