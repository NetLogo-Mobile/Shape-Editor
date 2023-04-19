var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function o(e){e.forEach(t)}function r(e){return"function"==typeof e}function s(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let c,l;function i(e,t){return c||(c=document.createElement("a")),c.href=t,e===c.href}function a(e,t){e.appendChild(t)}function d(e,t,n){e.insertBefore(t,n||null)}function u(e){e.parentNode&&e.parentNode.removeChild(e)}function p(e){return document.createElement(e)}function f(e){return document.createTextNode(e)}function v(){return f(" ")}function m(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function h(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function g(e,t){e.value=null==t?"":t}function b(e){l=e}const $=[],w=[];let y=[];const k=[],x=Promise.resolve();let _=!1;function E(e){y.push(e)}const L=new Set;let M=0;function T(){if(0!==M)return;const e=l;do{try{for(;M<$.length;){const e=$[M];M++,b(e),C(e.$$)}}catch(e){throw $.length=0,M=0,e}for(b(null),$.length=0,M=0;w.length;)w.pop()();for(let e=0;e<y.length;e+=1){const t=y[e];L.has(t)||(L.add(t),t())}y.length=0}while($.length);for(;k.length;)k.pop()();_=!1,L.clear(),b(e)}function C(e){if(null!==e.fragment){e.update(),o(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(E)}}const H=new Set;function N(e,t){const n=e.$$;null!==n.fragment&&(!function(e){const t=[],n=[];y.forEach((o=>-1===e.indexOf(o)?t.push(o):n.push(o))),n.forEach((e=>e())),y=t}(n.after_update),o(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function S(e,t){-1===e.$$.dirty[0]&&($.push(e),_||(_=!0,x.then(T)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function A(s,c,i,a,d,p,f,v=[-1]){const m=l;b(s);const h=s.$$={fragment:null,ctx:[],props:p,update:e,not_equal:d,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(c.context||(m?m.$$.context:[])),callbacks:n(),dirty:v,skip_bound:!1,root:c.target||m.$$.root};f&&f(h.root);let g=!1;if(h.ctx=i?i(s,c.props||{},((e,t,...n)=>{const o=n.length?n[0]:t;return h.ctx&&d(h.ctx[e],h.ctx[e]=o)&&(!h.skip_bound&&h.bound[e]&&h.bound[e](o),g&&S(s,e)),t})):[],h.update(),g=!0,o(h.before_update),h.fragment=!!a&&a(h.ctx),c.target){if(c.hydrate){const e=function(e){return Array.from(e.childNodes)}(c.target);h.fragment&&h.fragment.l(e),e.forEach(u)}else h.fragment&&h.fragment.c();c.intro&&(($=s.$$.fragment)&&$.i&&(H.delete($),$.i(w))),function(e,n,s,c){const{fragment:l,after_update:i}=e.$$;l&&l.m(n,s),c||E((()=>{const n=e.$$.on_mount.map(t).filter(r);e.$$.on_destroy?e.$$.on_destroy.push(...n):o(n),e.$$.on_mount=[]})),i.forEach(E)}(s,c.target,c.anchor,c.customElement),T()}var $,w;b(m)}class O{$destroy(){N(this,1),this.$destroy=e}$on(t,n){if(!r(n))return e;const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(n),()=>{const e=o.indexOf(n);-1!==e&&o.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function j(e,t,n){const o=e.slice();return o[16]=t[n],o[17]=t,o[18]=n,o}function I(e){let t,n,r,s,c,l;function i(){return e[8](e[16])}function f(...t){return e[9](e[16],...t)}function g(){return e[10](e[16])}function b(...t){return e[11](e[16],...t)}return{c(){t=p("div"),n=p("div"),r=v(),s=p("div"),h(n,"role","button"),h(n,"tabindex","0"),h(n,"aria-label","Duplicate shape"),h(n,"class","duplicate-icon svelte-14pdnev"),h(s,"role","button"),h(s,"tabindex","0"),h(s,"aria-label","Delete shape"),h(s,"class","delete-icon svelte-14pdnev"),h(t,"class","shape-selector-item-buttons svelte-14pdnev")},m(e,o){d(e,t,o),a(t,n),a(t,r),a(t,s),c||(l=[m(n,"click",i),m(n,"keydown",f),m(s,"click",g),m(s,"keydown",b)],c=!0)},p(t,n){e=t},d(e){e&&u(t),c=!1,o(l)}}}function D(e){let t,n,r,s,c,l,g,b,$,w,y,k,x=e[16].name+"",_=e[16].hover&&I(e);function E(){return e[12](e[16],e[17],e[18])}function L(){return e[13](e[16],e[17],e[18])}function M(){return e[14](e[16],e[17],e[18])}function T(){return e[15](e[16],e[17],e[18])}return{c(){t=p("div"),_&&_.c(),n=v(),r=p("div"),s=p("div"),c=p("img"),g=v(),b=p("div"),$=f(x),w=v(),h(c,"class","shape-selector-item-image svelte-14pdnev"),i(c.src,l=e[16].image)||h(c,"src",l),h(c,"alt",""),h(s,"class","shape-selector-item-image-div svelte-14pdnev"),h(b,"class","shape-selector-item-name svelte-14pdnev"),h(r,"class","shape-selector-details svelte-14pdnev"),h(t,"class","shape-selector-item svelte-14pdnev")},m(e,o){d(e,t,o),_&&_.m(t,null),a(t,n),a(t,r),a(r,s),a(s,c),a(r,g),a(r,b),a(b,$),a(t,w),y||(k=[m(t,"mouseover",E),m(t,"mouseout",L),m(t,"focus",M),m(t,"blur",T)],y=!0)},p(o,r){(e=o)[16].hover?_?_.p(e,r):(_=I(e),_.c(),_.m(t,n)):_&&(_.d(1),_=null),3&r&&!i(c.src,l=e[16].image)&&h(c,"src",l),3&r&&x!==(x=e[16].name+"")&&function(e,t){t=""+t,e.data!==t&&(e.data=t)}($,x)},d(e){e&&u(t),_&&_.d(),y=!1,o(k)}}}function q(t){let n,r,s,c,l,i,f,b,$,w,y,k,x,_,E,L,M,T,C,H,N,S,A,O,I,q,P=t[0].filter(t[7]),z=[];for(let e=0;e<P.length;e+=1)z[e]=D(j(t,P,e));return{c(){n=p("div"),r=p("div"),s=p("div"),s.innerHTML='<img src="header-logo.png" alt="header logo" class="svelte-14pdnev"/> \n      <h2 class="svelte-14pdnev">Shape Editor</h2>',c=v(),l=p("div"),i=p("div"),f=p("h3"),f.textContent="Selection Mode",b=v(),$=p("div"),w=p("div"),y=p("button"),y.innerHTML='<img class="button-image-left svelte-14pdnev" src="turtle-icon.png" alt="turtle button"/>Turtle',k=v(),x=p("button"),x.innerHTML='<img class="button-image-left svelte-14pdnev" src="link-icon.png" alt="link button"/>Link',_=v(),E=p("div"),L=p("button"),L.innerHTML='<img class="button-image-right svelte-14pdnev" src="create-new-icon.png" alt="create new"/>Create New',M=v(),T=p("button"),T.innerHTML='<img class="button-image-right svelte-14pdnev" src="import-icon.png" alt="import"/>Import From...',C=v(),H=p("div"),N=p("input"),S=v(),A=p("div"),O=p("div");for(let e=0;e<z.length;e+=1)z[e].c();h(s,"class","shape-selector-header svelte-14pdnev"),h(f,"class","svelte-14pdnev"),h(y,"class","turtle-button svelte-14pdnev"),h(x,"class","link-button svelte-14pdnev"),h(w,"class","mode-selector-buttons svelte-14pdnev"),h(L,"class","create-new-button svelte-14pdnev"),h(T,"class","import-shapes-button svelte-14pdnev"),h(E,"class","shape-selector-buttons svelte-14pdnev"),h($,"class","selector-buttons svelte-14pdnev"),h(i,"class","mode-selector svelte-14pdnev"),h(N,"placeholder","Search"),h(N,"class","svelte-14pdnev"),h(H,"class","shape-selector-search svelte-14pdnev"),h(O,"class","shape-selector-grid-inner svelte-14pdnev"),h(A,"class","shape-selector-grid svelte-14pdnev"),h(l,"class","inner-container svelte-14pdnev"),h(r,"class","shape-selector svelte-14pdnev"),h(n,"class","shape-selector-dialog svelte-14pdnev")},m(e,o){d(e,n,o),a(n,r),a(r,s),a(r,c),a(r,l),a(l,i),a(i,f),a(i,b),a(i,$),a($,w),a(w,y),a(w,k),a(w,x),a($,_),a($,E),a(E,L),a(E,M),a(E,T),a(l,C),a(l,H),a(H,N),g(N,t[1]),a(l,S),a(l,A),a(A,O);for(let e=0;e<z.length;e+=1)z[e]&&z[e].m(O,null);I||(q=[m(y,"click",t[4]),m(x,"click",t[5]),m(L,"click",B),m(T,"click",F),m(N,"input",t[6])],I=!0)},p(e,[t]){if(2&t&&N.value!==e[1]&&g(N,e[1]),15&t){let n;for(P=e[0].filter(e[7]),n=0;n<P.length;n+=1){const o=j(e,P,n);z[n]?z[n].p(o,t):(z[n]=D(o),z[n].c(),z[n].m(O,null))}for(;n<z.length;n+=1)z[n].d(1);z.length=P.length}},i:e,o:e,d(e){e&&u(n),function(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}(z,e),I=!1,o(q)}}}function B(){}function F(){}function P(e,t,n){let o=[{id:1,name:"down-arrow",image:"down-arrow.png"},{id:2,name:"down-arrow",image:"down-arrow.png"},{id:3,name:"down-arrow",image:"down-arrow.png"},{id:4,name:"down-arrow",image:"down-arrow.png"},{id:5,name:"down-arrow",image:"down-arrow.png"},{id:5,name:"down-arrow",image:"down-arrow.png"},{id:5,name:"down-arrow",image:"down-arrow.png"}],r="";function s(e){const t=o.find((t=>t.id===e));if(t){const n={...t};n.id=Math.max(...o.map((e=>e.id)))+1,o.splice(o.findIndex((t=>t.id===e))+1,0,n)}}function c(e){const t=o.findIndex((t=>t.id===e));-1!==t&&o.splice(t,1)}return[o,r,s,c,()=>console.log("turtle"),()=>console.log("link"),function(){r=this.value,n(1,r)},e=>e.name.toLowerCase().includes(r.toLowerCase()),e=>s(e.id),(e,t)=>{"Enter"===t.key&&s(e.id)},e=>c(e.id),(e,t)=>{"Enter"===t.key&&c(e.id)},(e,t,s)=>n(0,t[s].hover=!0,o,n(1,r)),(e,t,s)=>n(0,t[s].hover=!1,o,n(1,r)),(e,t,s)=>n(0,t[s].hover=!0,o,n(1,r)),(e,t,s)=>n(0,t[s].hover=!1,o,n(1,r))]}return new class extends O{constructor(e){super(),A(this,e,P,q,s,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
