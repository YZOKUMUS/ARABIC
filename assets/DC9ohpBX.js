import{_ as t}from"./BLvilQ5h.js";import{_ as l,v as s,z as n,t as c}from"./DFlLP9nF.js";const i={data(){return{uploadedFile:null}},mounted(){this.loadFile()},methods:{async loadFile(){try{const e=await fetch("./esmaulhusna.xlsx");if(!e.ok)throw new Error("Dosya yüklenirken hata oluştu");const o=await e.arrayBuffer();this.uploadedFile=o}catch(e){console.error("Yükleme hatası:",e)}}}};function u(e,o,f,_,a,d){const r=t;return c(),s("div",null,[n(r,{excelFile:a.uploadedFile,shuffle:!1},null,8,["excelFile"])])}const h=l(i,[["render",u]]);export{h as default};
