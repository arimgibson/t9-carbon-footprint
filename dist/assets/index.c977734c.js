var g=Object.defineProperty;var f=Object.getOwnPropertySymbols;var _=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable;var h=(o,r,t)=>r in o?g(o,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[r]=t,m=(o,r)=>{for(var t in r||(r={}))_.call(r,t)&&h(o,t,r[t]);if(f)for(var t of f(r))b.call(r,t)&&h(o,t,r[t]);return o};import{j as y,a as v,F as x,l as u,b as T,S as w}from"./vendor.7d0c9bf9.js";const N=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}};N();const S="_container_182vw_1",F="_main_182vw_9",k="_footer_182vw_29",E="_title_182vw_53",H="_description_182vw_89",O="_code_182vw_109",j="_grid_182vw_127",C="_card_182vw_143",L="_logo_182vw_203";var d={container:S,main:F,footer:k,title:E,description:H,code:O,grid:j,card:C,logo:L};const s=y,l=v,P=x,p=({err:o,children:r})=>s("div",{style:m({},o?{color:"red",fontWeight:"bold"}:{}),children:r});function z(){const[o,r]=u(""),[t,c]=u(""),[n,i]=u({});function a(){c(!0),T(`https://t9-carbon-footprint.herokuapp.com/api/${o}/all`).then(e=>e.data).then(e=>{i(e)}).finally(()=>{c(!1)})}return l("div",{className:d.container,children:[l("main",{className:d.main,children:[s("h1",{className:d.title,children:"T9 Carbon Footprint"}),l("p",{className:d.description,children:[s("input",{value:o,onChange:e=>r(e.target.value)}),s("button",{onClick:a,children:t?"loading...":"Submit"})]}),n?s(P,{children:s("div",{children:Object.values(n).map(e=>s("div",{style:m({border:"1px solid black",borderRadius:"6px",margin:"20px"},e.HTTPError?{backgroundColor:"red"}:{}),children:l("ul",{children:[l("li",{children:["Filename: ",s("code",{style:{fontSize:"18px"},children:e.filename})]}),l("li",{children:["Timestamp: ",e.timestamp]}),l("li",{children:["Type: ",e.type]}),e.HTTPError?l("li",{children:[" HTTPError: ",e.HTTPError]}):null,l("li",{children:["Size: ",e.size," bytes"]}),s(p,{err:e.minified!==!0,children:l("li",{children:["Minified: ",e.minified===!0?"yes!":"NO"]})}),s(p,{err:e.compressed==="none",children:l("li",{children:["Compressed: ",e.compressed]})}),e.image?l("li",{children:[" Image: ",e.image]}):null]})},e.filename))})}):null]}),l("footer",{className:d.footer,children:["Made by ",s("a",{href:"https://github.com/arimgibson",children:"Ari"})," @ ",s("a",{href:"https://t9hacks.org",children:"T9Hacks 2022"})]})]})}w(s(z,{}),document.getElementById("app"));