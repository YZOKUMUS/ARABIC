import{_ as l}from"./pvhB1V6j.js";import{_ as t,v as n,z as s,t as c}from"./CTdnI1kB.js";const i={data(){return{uploadedFile:null}},mounted(){this.loadFile()},methods:{async loadFile(){try{const e=await fetch("./gunlukarapcakelimeler.xlsx");if(!e.ok)throw new Error("Dosya yüklenirken hata oluştu");const r=await e.arrayBuffer();this.uploadedFile=r}catch(e){console.error("Yükleme hatası:",e)}}}};function u(e,r,p,_,a,d){const o=l;return c(),n("div",null,[s(o,{excelFile:a.uploadedFile,shuffle:!1},null,8,["excelFile"])])}const h=t(i,[["render",u]]);export{h as default};
