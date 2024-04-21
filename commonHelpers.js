import{a as w,S,i as c}from"./assets/vendor-6e0bf343.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();function f(r){return r.map(({webformatURL:a,largeImageURL:s,tags:i,likes:e,views:t,comments:n,downloads:b})=>`
    <li class="gallery-item">
      <div class="gallery">
       <a class="gallery-link" href="${s}">
       <img class="gallery-image"
         src="${a}"
         alt="${i}"
        />
       </a>
       
      <ul class="card-description">
        <li class="description">Likes <span class="accent">${e} </span></li>
        <li class="description">Views <span class="accent">${t} </span></li>
        <li class="description">Comments <span class="accent">${n} </span></li>
        <li class="description">Downloads <span class="accent">${b} </span></li>
      </ul>
      </div>
    </li>
    `).join("")}async function g(r,a){const s="43327574-10248a7b3676c40030810dfc2",i="https://pixabay.com/api/",e=new URLSearchParams({key:s,q:r,image_typ:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:15}),{data:t}=await w.get(`${i}?${e}`);return t}const m=document.querySelector(".form-inline"),d=document.querySelector(".js-list"),P=document.querySelector(".loader"),h=document.querySelector(".btn-load");m.addEventListener("submit",v);h.addEventListener("click",$);function u(){P.classList.toggle("is-visible")}function y(){h.classList.toggle("load-more")}const L=new S(".images a",{captionsData:"alt",captionDelay:250});let o=1,p=0,l="";async function v(r){r.preventDefault(),d.innerHTML="",o=1;const{query:a}=r.currentTarget.elements;if(l=a.value.trim(),l===""){c.error({title:"Error",message:"The field cannot be empty!!!",position:"topRight"});return}u();try{const s=await g(l,o);if(s.hits.length===0){c.warning({title:"",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}d.insertAdjacentHTML("beforeend",f(s.hits)),L.refresh(),p=Math.ceil(s.totalHits/15),o<=p&&y(),m.reset()}catch{c.error({title:"Error",message:"An error occurred while fetching data. Please try again later.",position:"topRight"})}finally{u()}}async function $(){o+=1,u();try{const r=await g(l,o);if(d.insertAdjacentHTML("beforeend",f(r.hits)),L.refresh(),o===p)return y(),c.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})}catch{c.error({title:"Error",message:"An error occurred while fetching data. Please try again later.",position:"topRight"})}finally{u()}}
//# sourceMappingURL=commonHelpers.js.map
