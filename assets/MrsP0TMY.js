import{_ as a}from"./jV7uTeww.js";import{_ as l,v as n,z as s,t as c}from"./jsiW8g0r.js";const i={data(){return{uploadedFile:null}},mounted(){this.loadFile()},methods:{async loadFile(){try{const e=await fetch("./mezidfiiller.xlsx");if(!e.ok)throw new Error("Dosya yüklenirken hata oluştu");const o=await e.arrayBuffer();this.uploadedFile=o}catch(e){console.error("Yükleme hatası:",e)}}}};function u(e,o,d,f,r,_){const t=a;return c(),n("div",null,[s(t,{excelFile:r.uploadedFile,shuffle:!1},null,8,["excelFile"])])}const h=l(i,[["render",u]]);export{h as default};
