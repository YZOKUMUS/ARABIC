<template>
  <div>
    <h1>Upload Excel File</h1>
    <input type="file" @change="handleFileUpload" accept=".xlsx, .xls" />
    
    <div v-if="wordCards.length">
      <h2>Word Cards</h2>
      <div class="card-container">
        <div 
          v-for="(card, index) in wordCards" 
          :key="index" 
          class="card"
          @click="toggleCard(index)"
          :style="getCardStyle(index)"
        >
          <p v-if="!card.flipped" class="arabic">{{ card.arabic }}</p>
          <p v-else class="turkish">{{ card.turkish }}</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import * as XLSX from "xlsx";

export default {
  data() {
    return { wordCards: [] };
  },
  async mounted() {
    const response = await fetch('./kelimeler.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    this.loadExcel(new Uint8Array(arrayBuffer));
  },
  methods: {
    async loadExcel(uintArr) {
      const workbook = XLSX.read(uintArr, { type: "array" });
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });
      const [headers, ...rows] = worksheet;
      const arabicIndex = headers.indexOf('arabic_word');
      const turkishIndex = headers.indexOf('turkish_meaning');

      this.wordCards = this.shuffleArray(rows.map(row => ({
        arabic: row[arabicIndex],
        turkish: row[turkishIndex],
        flipped: false
      })));
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => this.loadExcel(new Uint8Array(e.target.result));
        reader.readAsArrayBuffer(file);
      }
    },
    toggleCard(index) {
      this.wordCards[index].flipped = !this.wordCards[index].flipped;
    },
    getCardStyle(index) {
      const colors = ['#ffcccb', '#add8e6', '#90ee90', '#ffffe0', '#ffb6c1', '#d3d3d3'];
      return {
        backgroundColor: this.wordCards[index].flipped ? colors[index % colors.length] : colors[(index + 1) % colors.length],
        boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
        transition: 'background-color 0.3s, box-shadow 0.3s'
      };
    }
  }
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px; /* Kartlar arasındaki boşluk */
  justify-content: center; /* Kartları yatayda ortala */
  padding: 20px; /* Opsiyonel: Konteyner etrafında boşluk */
}

.card {
  width: 150px; /* Kart genişliği */
  height: 120px; /* Kart yüksekliği */
  border: 1px solid #000; /* Kart kenarlığı */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s; /* Yumuşak geçiş */
}

.card:hover {
  transform: translateY(-3px); /* Üzerine gelince kaldırma etkisi */
}

.card p.arabic {
  margin: 0; /* Varsayılan kenar boşluklarını kaldır */
  font-size: 60px; /* Arapça yazı boyutu */
  text-align: center; /* Metni ortala */
  line-height: 1.2; /* Satır yüksekliği */
}

.card p.turkish {
  margin: 0; /* Varsayılan kenar boşluklarını kaldır */
  font-size: 18px; /* Türkçe yazı boyutu (daha küçük) */
  text-align: center; /* Metni ortala */
  line-height: 1.2; /* Satır yüksekliği */
}
</style>
