<template>
  <div>
   <excel-viewer :excelFile="uploadedFile" :shuffle="false" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadedFile: null,
    };
  },
  mounted() {
    this.loadFile();
  },
  methods: {
    async loadFile() {
      const response = await fetch('./mezidfiiller1.xlsx');
      const arrayBuffer = await response.arrayBuffer();
      this.uploadedFile = arrayBuffer; // ArrayBuffer olarak excelFile prop'una gönderiliyor
    },
  },
};
</script>
