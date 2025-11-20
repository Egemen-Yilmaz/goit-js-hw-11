import{i as a,S as f}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const m=document.querySelector("#search-form"),c=document.querySelector(".gallery"),l=document.querySelector(".loader"),d="53317222-33ad4c1be86b2938ae2a211ff";function p(s){const o=`https://pixabay.com/api/?key=${d}&q=${s}&image_type=photo&orientation=horizontal&safesearch=true`;return fetch(o).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()}).then(r=>{if(r.hits.length===0)throw new Error("No images found");return r.hits})}m.addEventListener("submit",g);function g(s){s.preventDefault();const o=s.currentTarget.elements.searchQuery.value.trim();if(o===""){a.error({title:"Error",message:"Please enter a search query.",position:"topRight"});return}c.innerHTML="",l.style.display="block",p(o).then(r=>{const i=r.map(h).join("");c.insertAdjacentHTML("beforeend",i),y.refresh()}).catch(r=>{r.message=="No images found"?a.error({title:"Error",message:"Sorry, there are no images matching your search query. Please, try again!",position:"topRight"}):a.error({title:"Error",message:`An API error occurred: ${r.message}`,position:"topRight"})}).finally(()=>{l.style.display="none"}),s.currentTarget.reset()}function h(s){const{webformatURL:o,largeImageURL:r,tags:i,likes:e,views:t,comments:n,downloads:u}=s;return`
    <li class="gallery-item">
        <a class="gallery-link" href="${r}">
            <img class="gallery-image" src="${o}" alt="${i}" />
            <div class="info-box">
                <p class="info-item"><b>Likes</b>${e}</p>
                <p class="info-item"><b>Views</b>${t}</p>
                <p class="info-item"><b>Comments</b>${n}</p>
                <p class="info-item"><b>Downloads</b>${u}</p>
            </div>
        </a>
    </li>
    `}const y=new f(".gallery a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=index.js.map
