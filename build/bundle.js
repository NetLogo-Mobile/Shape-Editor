var app=function(){"use strict";function e(){}const t=e=>e;function s(e){return e()}function n(){return Object.create(null)}function l(e){e.forEach(s)}function i(e){return"function"==typeof e}function r(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let o;function a(e,t){return o||(o=document.createElement("a")),o.href=t,e===o.href}const c="undefined"!=typeof window;let d=c?()=>window.performance.now():()=>Date.now(),h=c?e=>requestAnimationFrame(e):e;const u=new Set;function p(e){u.forEach((t=>{t.c(e)||(u.delete(t),t.f())})),0!==u.size&&h(p)}function f(e){let t;return 0===u.size&&h(p),{promise:new Promise((s=>{u.add(t={c:e,f:s})})),abort(){u.delete(t)}}}function m(e,t){e.appendChild(t)}function g(e){if(!e)return document;const t=e.getRootNode?e.getRootNode():e.ownerDocument;return t&&t.host?t:e.ownerDocument}function b(e){const t=S("style");return function(e,t){m(e.head||e,t),t.sheet}(g(e),t),t.sheet}function v(e,t,s){e.insertBefore(t,s||null)}function y(e){e.parentNode&&e.parentNode.removeChild(e)}function S(e){return document.createElement(e)}function k(e){return document.createTextNode(e)}function $(){return k(" ")}function I(e,t,s,n){return e.addEventListener(t,s,n),()=>e.removeEventListener(t,s,n)}function w(e,t,s){null==s?e.removeAttribute(t):e.getAttribute(t)!==s&&e.setAttribute(t,s)}function T(e,t){t=""+t,e.data!==t&&(e.data=t)}function L(e,t,s,n){null==s?e.style.removeProperty(t):e.style.setProperty(t,s,n?"important":"")}const x=new Map;let U,E=0;function O(e,t,s,n,l,i,r,o=0){const a=16.666/n;let c="{\n";for(let e=0;e<=1;e+=a){const n=t+(s-t)*i(e);c+=100*e+`%{${r(n,1-n)}}\n`}const d=c+`100% {${r(s,1-s)}}\n}`,h=`__svelte_${function(e){let t=5381,s=e.length;for(;s--;)t=(t<<5)-t^e.charCodeAt(s);return t>>>0}(d)}_${o}`,u=g(e),{stylesheet:p,rules:f}=x.get(u)||function(e,t){const s={stylesheet:b(t),rules:{}};return x.set(e,s),s}(u,e);f[h]||(f[h]=!0,p.insertRule(`@keyframes ${h} ${d}`,p.cssRules.length));const m=e.style.animation||"";return e.style.animation=`${m?`${m}, `:""}${h} ${n}ms linear ${l}ms 1 both`,E+=1,h}function D(e,t){const s=(e.style.animation||"").split(", "),n=s.filter(t?e=>e.indexOf(t)<0:e=>-1===e.indexOf("__svelte")),l=s.length-n.length;l&&(e.style.animation=n.join(", "),E-=l,E||h((()=>{E||(x.forEach((e=>{const{ownerNode:t}=e.stylesheet;t&&y(t)})),x.clear())})))}function _(e){U=e}function M(e){(function(){if(!U)throw new Error("Function called outside component initialization");return U})().$$.on_mount.push(e)}const C=[],N=[];let B=[];const F=[],P=Promise.resolve();let R=!1;function H(e){B.push(e)}const j=new Set;let A,X=0;function z(){if(0!==X)return;const e=U;do{try{for(;X<C.length;){const e=C[X];X++,_(e),Y(e.$$)}}catch(e){throw C.length=0,X=0,e}for(_(null),C.length=0,X=0;N.length;)N.pop()();for(let e=0;e<B.length;e+=1){const t=B[e];j.has(t)||(j.add(t),t())}B.length=0}while(C.length);for(;F.length;)F.pop()();R=!1,j.clear(),_(e)}function Y(e){if(null!==e.fragment){e.update(),l(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(H)}}function q(){return A||(A=Promise.resolve(),A.then((()=>{A=null}))),A}function G(e,t,s){e.dispatchEvent(function(e,t,{bubbles:s=!1,cancelable:n=!1}={}){const l=document.createEvent("CustomEvent");return l.initCustomEvent(e,s,n,t),l}(`${t?"intro":"outro"}${s}`))}const J=new Set;let K;function Q(){K={r:0,c:[],p:K}}function V(){K.r||l(K.c),K=K.p}function W(e,t){e&&e.i&&(J.delete(e),e.i(t))}function Z(e,t,s,n){if(e&&e.o){if(J.has(e))return;J.add(e),K.c.push((()=>{J.delete(e),n&&(s&&e.d(1),n())})),e.o(t)}else n&&n()}const ee={duration:0};function te(s,n,r,o){const a={direction:"both"};let c=n(s,r,a),h=o?0:1,u=null,p=null,m=null;function g(){m&&D(s,m)}function b(e,t){const s=e.b-h;return t*=Math.abs(s),{a:h,b:e.b,d:s,duration:t,start:e.start,end:e.start+t,group:e.group}}function v(n){const{delay:i=0,duration:r=300,easing:o=t,tick:a=e,css:v}=c||ee,y={start:d()+i,b:n};n||(y.group=K,K.r+=1),u||p?p=y:(v&&(g(),m=O(s,h,n,r,i,o,v)),n&&a(0,1),u=b(y,r),H((()=>G(s,n,"start"))),f((e=>{if(p&&e>p.start&&(u=b(p,r),p=null,G(s,u.b,"start"),v&&(g(),m=O(s,h,u.b,u.duration,0,o,c.css))),u)if(e>=u.end)a(h=u.b,1-h),G(s,u.b,"end"),p||(u.b?g():--u.group.r||l(u.group.c)),u=null;else if(e>=u.start){const t=e-u.start;h=u.a+u.d*o(t/u.duration),a(h,1-h)}return!(!u&&!p)})))}return{run(e){i(c)?q().then((()=>{c=c(a),v(e)})):v(e)},end(){g(),u=p=null}}}function se(e,t){e.d(1),t.delete(e.key)}function ne(e,t,s,n,i,r,o,a,c,d,h,u){let p=e.length,f=r.length,m=p;const g={};for(;m--;)g[e[m].key]=m;const b=[],v=new Map,y=new Map,S=[];for(m=f;m--;){const e=u(i,r,m),l=s(e);let a=o.get(l);a?n&&S.push((()=>a.p(e,t))):(a=d(l,e),a.c()),v.set(l,b[m]=a),l in g&&y.set(l,Math.abs(m-g[l]))}const k=new Set,$=new Set;function I(e){W(e,1),e.m(a,h),o.set(e.key,e),h=e.first,f--}for(;p&&f;){const t=b[f-1],s=e[p-1],n=t.key,l=s.key;t===s?(h=t.first,p--,f--):v.has(l)?!o.has(n)||k.has(n)?I(t):$.has(l)?p--:y.get(n)>y.get(l)?($.add(n),I(t)):(k.add(l),p--):(c(s,o),p--)}for(;p--;){const t=e[p];v.has(t.key)||c(t,o)}for(;f;)I(b[f-1]);return l(S),b}function le(e,t,n,r){const{fragment:o,after_update:a}=e.$$;o&&o.m(t,n),r||H((()=>{const t=e.$$.on_mount.map(s).filter(i);e.$$.on_destroy?e.$$.on_destroy.push(...t):l(t),e.$$.on_mount=[]})),a.forEach(H)}function ie(e,t){const s=e.$$;null!==s.fragment&&(!function(e){const t=[],s=[];B.forEach((n=>-1===e.indexOf(n)?t.push(n):s.push(n))),s.forEach((e=>e())),B=t}(s.after_update),l(s.on_destroy),s.fragment&&s.fragment.d(t),s.on_destroy=s.fragment=null,s.ctx=[])}function re(e,t){-1===e.$$.dirty[0]&&(C.push(e),R||(R=!0,P.then(z)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function oe(t,s,i,r,o,a,c,d=[-1]){const h=U;_(t);const u=t.$$={fragment:null,ctx:[],props:a,update:e,not_equal:o,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(s.context||(h?h.$$.context:[])),callbacks:n(),dirty:d,skip_bound:!1,root:s.target||h.$$.root};c&&c(u.root);let p=!1;if(u.ctx=i?i(t,s.props||{},((e,s,...n)=>{const l=n.length?n[0]:s;return u.ctx&&o(u.ctx[e],u.ctx[e]=l)&&(!u.skip_bound&&u.bound[e]&&u.bound[e](l),p&&re(t,e)),s})):[],u.update(),p=!0,l(u.before_update),u.fragment=!!r&&r(u.ctx),s.target){if(s.hydrate){const e=function(e){return Array.from(e.childNodes)}(s.target);u.fragment&&u.fragment.l(e),e.forEach(y)}else u.fragment&&u.fragment.c();s.intro&&W(t.$$.fragment),le(t,s.target,s.anchor,s.customElement),z()}_(h)}class ae{$destroy(){ie(this,1),this.$destroy=e}$on(t,s){if(!i(s))return e;const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(s),()=>{const e=n.indexOf(s);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}class ce{constructor(e,t){this.shapes=[],this.filteredShapes=[],this.selectedItemId=null,this.recentlyImportedShapeIds=[],this.parent=e,this.shapes=[{id:1,name:"default",image:"shapes/down-arrow.png",type:"turtle",hover:!1,deletable:!1,isDeleting:!1},{id:2,name:"default",image:"shapes/down-arrow.png",type:"link",hover:!1,deletable:!1,isDeleting:!1}],this.searchTerm="",this.filteredShapes=this.shapes,this.currentType="turtle",this.config=t,this.filterShapes(this.currentType),this.dialogOpen=!0,this.importButtonSelected=!1,this.libraryOpen=!1}toggleDialog(){this.dialogOpen=!this.dialogOpen,this.config.onUpdateDialogOpen(this.dialogOpen)}openLibrary(){this.libraryOpen=!0,this.importButtonSelected=!1,this.config.onUpdateLibraryOpen(this.libraryOpen),this.config.onUpdateImportButtonSelected(this.importButtonSelected)}closeLibrary(){console.log("close library"),this.libraryOpen=!1,this.config.onUpdateLibraryOpen(this.libraryOpen)}createShape(){this.recentlyImportedShapeIds=[],this.config.onUpdateRecentlyImportedShapes(this.recentlyImportedShapeIds);const e={id:Math.max(...this.shapes.map((e=>e.id)))+1,name:"new default",image:"shapes/down-arrow.png",type:this.currentType,hover:!1,deletable:!0,isDeleting:!1};this.shapes.unshift(e),this.shapes=[...this.shapes],this.config.onUpdateShapes(this.shapes),this.filterShapes(this.currentType),this.config.onUpdateFilteredShapes(this.filteredShapes)}importShapes(){this.importButtonSelected=!this.importButtonSelected,this.config.onUpdateImportButtonSelected(this.importButtonSelected)}duplicateShape(e){const t=this.shapes.find((t=>t.id===e));if(t){const{name:s}=t,n=s.match(/^(.*?)(\s(\d+))?$/);if(n){const s=n[1],l=[];for(const e of this.shapes)if(0===e.name.indexOf(s)){const t=e.name.match(/^.*\s(\d+)$/);t&&l.push(Number(t[1]))}let i=-1;for(let t=0;t<this.shapes.length;t++)if(this.shapes[t].id===e){i=t;break}let r=i;if(l.length>=1){const e=Math.max(...l);for(let t=0;t<this.shapes.length;t++)if(this.shapes[t].name===`${s} ${e}`){r=t;break}}const o=`${s} ${l.length?Math.max(...l)+1:1}`,a=Object.assign(Object.assign({},t),{name:o,hover:!1,deletable:!0}),c=Math.max(...this.shapes.map((e=>e.id)))+1;a.id=c,this.shapes.splice(r+1,0,a),this.shapes=[...this.shapes],this.handleSearch(this.searchTerm),this.config.onUpdateShapes(this.shapes),this.config.onUpdateFilteredShapes(this.filteredShapes)}}}addNewShapes(e){this.recentlyImportedShapeIds=[],this.config.onUpdateRecentlyImportedShapes(this.recentlyImportedShapeIds),e.forEach((e=>{e.id=Math.max(...this.shapes.map((e=>e.id)))+1,e.type=this.currentType,e.hover=!1,e.deletable=!0,"default"===e.name&&(e.deletable=!1),this.shapes.push(e),this.recentlyImportedShapeIds.push(e.id)})),this.shapes.sort(((e,t)=>"default"===e.name?-1:"default"===t.name?1:e.name.localeCompare(t.name))),this.shapes=[...this.shapes],this.config.onUpdateShapes(this.shapes),this.filterShapes(this.currentType),this.config.onUpdateRecentlyImportedShapes(this.recentlyImportedShapeIds)}deleteShape(e){console.log("delete shape");let t=-1,s=-1;for(let s=0;s<this.shapes.length;s++)this.shapes[s].id===e&&(t=s);for(let t=0;t<this.filteredShapes.length;t++)this.filteredShapes[t].id===e&&(s=t);-1!==t&&-1!==s&&(this.shapes[t].isDeleting=!0,this.filteredShapes[s].isDeleting=!0,this.shapes=[...this.shapes],this.filteredShapes=[...this.filteredShapes],this.config.onUpdateShapes(this.shapes),this.config.onUpdateFilteredShapes(this.filteredShapes),setTimeout((()=>{this.shapes.splice(t,1),this.shapes=[...this.shapes],this.handleSearch(this.searchTerm),this.config.onUpdateShapes(this.shapes),this.config.onUpdateFilteredShapes(this.filteredShapes)}),500))}filterShapes(e){this.currentType=e,this.filteredShapes=[];for(let e=0;e<this.shapes.length;e++){const t=this.shapes[e];t.type===this.currentType&&-1!==t.name.toLowerCase().indexOf(this.searchTerm.toLowerCase())&&this.filteredShapes.push(t)}this.config.onUpdateFilteredShapes(this.filteredShapes)}handleSearch(e){this.searchTerm=e,this.filterShapes(this.currentType),this.config.onUpdateFilteredShapes(this.filteredShapes)}setSelectedItemId(e){this.selectedItemId===e?this.selectedItemId=null:this.selectedItemId=e,console.log(this.shapes.find((e=>e.id===this.selectedItemId))),this.recentlyImportedShapeIds=[],this.config.onUpdateRecentlyImportedShapes(this.recentlyImportedShapeIds),this.config.onUpdateSelectedItemId(this.selectedItemId)}}class de{constructor(e,t){this.shapes=[],this.filteredShapes=[],this.selectedItemIds=[],this.parent=e,this.shapes=[{id:1,name:"default",image:"shapes/down-arrow.png",type:"turtle",hover:!1,deletable:!0,isDeleting:!1},{id:2,name:"ghost",image:"shapes/ghost.png",type:"turtle",hover:!1,deletable:!0,isDeleting:!1},{id:3,name:"turtle",image:"shapes/cute-turtle.png",type:"turtle",hover:!1,deletable:!0,isDeleting:!1},{id:4,name:"turtle",image:"shapes/cute-turtle.png",type:"turtle",hover:!1,deletable:!0,isDeleting:!1},{id:5,name:"turtle",image:"shapes/cute-turtle.png",type:"turtle",hover:!1,deletable:!0,isDeleting:!1},{id:6,name:"turtle",image:"shapes/cute-turtle.png",type:"turtle",hover:!1,deletable:!0,isDeleting:!1},{id:7,name:"turtle",image:"shapes/cute-turtle.png",type:"turtle",hover:!1,deletable:!0,isDeleting:!1},{id:8,name:"turtle",image:"shapes/cute-turtle.png",type:"turtle",hover:!1,deletable:!0,isDeleting:!1},{id:9,name:"turtle",image:"shapes/cute-turtle.png",type:"turtle",hover:!1,deletable:!0,isDeleting:!1},{id:10,name:"turtle",image:"shapes/cute-turtle.png",type:"turtle",hover:!1,deletable:!0,isDeleting:!1}],this.searchTerm="",this.filteredShapes=this.shapes,this.currentType="turtle",this.config=t,this.filterShapes(this.currentType),this.dialogOpen=!0}filterShapes(e){this.currentType=e,this.filteredShapes=[];for(let e=0;e<this.shapes.length;e++){const t=this.shapes[e];t.type===this.currentType&&-1!==t.name.toLowerCase().indexOf(this.searchTerm.toLowerCase())&&this.filteredShapes.push(t)}this.config.onUpdateFilteredShapes(this.filteredShapes)}handleSearch(e){this.searchTerm=e,this.filterShapes(this.currentType),this.config.onUpdateFilteredShapes(this.filteredShapes)}setSelectedItemId(e){const t=this.selectedItemIds.indexOf(e);t>-1?this.selectedItemIds.splice(t,1):this.selectedItemIds.push(e),console.log(this.selectedItemIds.map((e=>this.shapes.find((t=>t.id===e))))),this.config.onUpdateSelectedItemIds([...this.selectedItemIds])}}const he=[];function ue(t,s=e){let n;const l=new Set;function i(e){if(r(t,e)&&(t=e,n)){const e=!he.length;for(const e of l)e[1](),he.push(e,t);if(e){for(let e=0;e<he.length;e+=2)he[e][0](he[e+1]);he.length=0}}}return{set:i,update:function(e){i(e(t))},subscribe:function(r,o=e){const a=[r,o];return l.add(a),1===l.size&&(n=s(i)||e),r(t),()=>{l.delete(a),0===l.size&&n&&(n(),n=null)}}}}function pe(e,{delay:s=0,duration:n=400,easing:l=t}={}){const i=+getComputedStyle(e).opacity;return{delay:s,duration:n,easing:l,css:e=>"opacity: "+e*i}}function fe(e,t,s){const n=e.slice();return n[23]=t[s],n[24]=t,n[25]=s,n}function me(e,t){let s,n,i,r,o,c,d,h,u,p,f,g,b,L=t[23].name+"";function x(){return t[11](t[23],t[24],t[25])}function U(){return t[12](t[23],t[24],t[25])}function E(){return t[13](t[23],t[24],t[25])}function O(){return t[14](t[23],t[24],t[25])}function D(){return t[15](t[23])}return{key:e,first:null,c(){s=S("button"),n=S("div"),i=S("div"),r=S("img"),c=$(),d=S("div"),h=k(L),p=$(),w(r,"class","shape-selector-item-image svelte-14sk7sl"),a(r.src,o=t[23].image)||w(r,"src",o),w(r,"alt",""),w(i,"class","shape-selector-item-image-div svelte-14sk7sl"),w(d,"class",u="shape-selector-item-name "+(t[8].includes(t[23].id)?"font-selected":"")+" svelte-14sk7sl"),w(n,"class","shape-selector-details svelte-14sk7sl"),w(s,"class",f="shape-selector-item "+(t[8].includes(t[23].id)?"selected":"")+" svelte-14sk7sl"),this.first=s},m(e,t){v(e,s,t),m(s,n),m(n,i),m(i,r),m(n,c),m(n,d),m(d,h),m(s,p),g||(b=[I(s,"mouseenter",x),I(s,"mouseleave",U),I(s,"focus",E),I(s,"blur",O),I(s,"click",D)],g=!0)},p(e,n){t=e,64&n&&!a(r.src,o=t[23].image)&&w(r,"src",o),64&n&&L!==(L=t[23].name+"")&&T(h,L),320&n&&u!==(u="shape-selector-item-name "+(t[8].includes(t[23].id)?"font-selected":"")+" svelte-14sk7sl")&&w(d,"class",u),320&n&&f!==(f="shape-selector-item "+(t[8].includes(t[23].id)?"selected":"")+" svelte-14sk7sl")&&w(s,"class",f)},d(e){e&&y(s),g=!1,l(b)}}}function ge(e){let t,s,n,r,o,a,c,d,h,u,p,f,g,b,k,T,x,U,E,O,D,_,M,C,N=[],B=new Map,F=e[6];const P=e=>e[23].id;for(let t=0;t<F.length;t+=1){let s=fe(e,F,t),n=P(s);B.set(n,N[t]=me(n,s))}return{c(){t=S("div"),s=S("div"),n=S("div"),r=S("h2"),r.textContent="Library",o=$(),a=S("button"),a.innerHTML='<img src="icons/close-button.png" alt="X" class="svelte-14sk7sl"/>',c=$(),d=S("div"),h=S("div"),u=S("input"),p=$(),f=S("div"),g=S("div"),b=S("div");for(let e=0;e<N.length;e+=1)N[e].c();k=$(),T=S("div"),x=S("div"),U=S("button"),U.textContent="Import",E=$(),O=S("button"),O.textContent="Cancel",w(r,"class","svelte-14sk7sl"),w(a,"class","close-button svelte-14sk7sl"),w(n,"class","shape-selector-header svelte-14sk7sl"),u.value=e[5],w(u,"placeholder","Search"),L(u,"background-image","url('icons/search-icon.png')"),w(u,"class","svelte-14sk7sl"),w(h,"class","shape-selector-search svelte-14sk7sl"),w(b,"class","shape-selector-grid-inner svelte-14sk7sl"),w(g,"class","scrollbar-wrapper svelte-14sk7sl"),w(f,"class","shape-selector-grid svelte-14sk7sl"),w(d,"class","inner-container svelte-14sk7sl"),w(U,"class","import-button svelte-14sk7sl"),w(O,"class","cancel-button svelte-14sk7sl"),w(x,"class","import-cancel-buttons svelte-14sk7sl"),w(T,"class","import-cancel-buttons-container svelte-14sk7sl"),w(s,"class","shape-selector-library svelte-14sk7sl"),w(t,"class","shape-selector-library-dialog svelte-14sk7sl")},m(l,y){v(l,t,y),m(t,s),m(s,n),m(n,r),m(n,o),m(n,a),e[9](n),m(s,c),m(s,d),m(d,h),m(h,u),m(d,p),m(d,f),m(f,g),m(g,b);for(let e=0;e<N.length;e+=1)N[e]&&N[e].m(b,null);m(s,k),m(s,T),m(T,x),m(x,U),m(x,E),m(x,O),e[17](t),_=!0,M||(C=[I(a,"click",(function(){i(e[0])&&e[0].apply(this,arguments)})),I(u,"input",e[10]),I(U,"click",e[16]),I(O,"click",(function(){i(e[0])&&e[0].apply(this,arguments)}))],M=!0)},p(t,[s]){e=t,(!_||32&s&&u.value!==e[5])&&(u.value=e[5]),324&s&&(F=e[6],N=ne(N,s,P,1,e,F,B,b,se,me,null,fe))},i(e){_||(H((()=>{_&&(D||(D=te(t,pe,{duration:500},!0)),D.run(1))})),_=!0)},o(e){D||(D=te(t,pe,{duration:500},!1)),D.run(0),_=!1},d(s){s&&y(t),e[9](null);for(let e=0;e<N.length;e+=1)N[e].d();e[17](null),s&&D&&D.end(),M=!1,l(C)}}}function be(e,t,s){let n,l,i,r,o=[],a=[],c=[],{closeLibrary:d}=t,{addNewShapes:h}=t;const u=ue([]),p=ue([]),f=ue([]),m=ue(!1);M((()=>{const e={onUpdateShapes:e=>{u.set(e)},onUpdateFilteredShapes:e=>{p.set(e)},onUpdateSelectedItemIds:e=>{f.set(e)},onUpdateImportButtonSelected:e=>{m.set(e)}};s(2,i=new de(document.getElementById("Container"),e));let t=!1,r=[0,0];l.addEventListener("mousedown",(e=>{t=!0,r=[n.offsetLeft-e.clientX,n.offsetTop-e.clientY]}),!0),document.addEventListener("mouseup",(()=>{t=!1}),!0),document.addEventListener("mousemove",(e=>{e.preventDefault(),t&&(s(3,n.style.left=e.clientX+r[0]+"px",n),s(3,n.style.top=e.clientY+r[1]+"px",n))}),!0)})),u.subscribe((e=>{s(7,a=e)})),p.subscribe((e=>{s(6,o=e)})),f.subscribe((e=>{s(8,c=e)}));return e.$$set=e=>{"closeLibrary"in e&&s(0,d=e.closeLibrary),"addNewShapes"in e&&s(1,h=e.addNewShapes)},e.$$.update=()=>{4&e.$$.dirty&&i&&(s(5,r=i.searchTerm),i.currentType,s(6,o=i.filteredShapes),s(7,a=i.shapes),s(8,c=i.selectedItemIds))},[d,h,i,n,l,r,o,a,c,function(e){N[e?"unshift":"push"]((()=>{l=e,s(4,l)}))},e=>i.handleSearch(e.target.value),(e,t,n)=>s(6,t[n].hover=!0,o),(e,t,n)=>s(6,t[n].hover=!1,o),(e,t,n)=>s(6,t[n].hover=!0,o),(e,t,n)=>s(6,t[n].hover=!1,o),e=>i.setSelectedItemId(e.id),()=>{c.length>0&&(h(a.filter((e=>c.includes(e.id)))),d())},function(e){N[e?"unshift":"push"]((()=>{n=e,s(3,n)}))}]}class ve extends ae{constructor(e){super(),oe(this,e,be,ge,r,{closeLibrary:0,addNewShapes:1})}}function ye(e,t,s){const n=e.slice();return n[39]=t[s],n[40]=t,n[41]=s,n}function Se(e){let t,s;return t=new ve({props:{closeLibrary:e[12],addNewShapes:e[13]}}),{c(){var e;(e=t.$$.fragment)&&e.c()},m(e,n){le(t,e,n),s=!0},p(e,s){const n={};4096&s[0]&&(n.closeLibrary=e[12]),8192&s[0]&&(n.addNewShapes=e[13]),t.$set(n)},i(e){s||(W(t.$$.fragment,e),s=!0)},o(e){Z(t.$$.fragment,e),s=!1},d(e){ie(t,e)}}}function ke(e){let t,s,n,r,o,a,c,d;return{c(){t=S("div"),s=S("button"),s.innerHTML='<img class="button-image-left svelte-1rrml0c" src="icons/library-icon.png" alt="library"/>Library',n=$(),r=S("button"),r.innerHTML='<img class="button-image-left svelte-1rrml0c" src="icons/model-icon.png" alt="model"/>Model',w(s,"class","dropdown-button library-button svelte-1rrml0c"),w(r,"class","dropdown-button model-button svelte-1rrml0c"),w(t,"class","dropdown-content svelte-1rrml0c")},m(l,o){v(l,t,o),m(t,s),m(t,n),m(t,r),a=!0,c||(d=[I(s,"click",(function(){i(e[0].openLibrary())&&e[0].openLibrary().apply(this,arguments)})),I(r,"click",console.log("model"))],c=!0)},p(t,s){e=t},i(e){a||(H((()=>{a&&(o||(o=te(t,pe,{duration:500},!0)),o.run(1))})),a=!0)},o(e){o||(o=te(t,pe,{duration:500},!1)),o.run(0),a=!1},d(e){e&&y(t),e&&o&&o.end(),c=!1,l(d)}}}function $e(s,n){let r,o,c,h,u,p,g,b,x,U,E,_,M,C,N,B,F,P,R,j,A,X,z=n[39].name+"";function Y(...e){return n[20](n[39],...e)}function J(...e){return n[21](n[39],...e)}function K(...e){return n[22](n[39],...e)}function Q(...e){return n[23](n[39],...e)}function V(){return n[24](n[39],n[40],n[41])}function W(){return n[25](n[39],n[40],n[41])}function Z(){return n[26](n[39],n[40],n[41])}function te(){return n[27](n[39],n[40],n[41])}function se(){return n[28](n[39])}return{key:s,first:null,c(){r=S("button"),o=S("div"),c=S("button"),h=$(),u=S("button"),b=$(),x=S("div"),U=S("div"),E=S("img"),M=$(),C=S("div"),N=k(z),F=$(),w(c,"aria-label","Duplicate shape"),w(c,"class","duplicate-icon svelte-1rrml0c"),L(c,"display",n[39].hover?"block":"none"),L(c,"background-image","url('icons/duplicate-icon.png')"),w(u,"aria-label","Delete shape"),w(u,"class",p="delete-icon "+(n[39].deletable?"":"button-disabled")+" svelte-1rrml0c"),L(u,"display",n[39].hover?"block":"none"),L(u,"background-image","url('icons/delete-icon.png')"),u.disabled=g=!n[39].deletable,w(o,"class","shape-selector-item-buttons svelte-1rrml0c"),w(E,"class","shape-selector-item-image svelte-1rrml0c"),a(E.src,_=n[39].image)||w(E,"src",_),w(E,"alt",""),w(U,"class","shape-selector-item-image-div svelte-1rrml0c"),w(C,"class",B="shape-selector-item-name "+(n[39].id===n[7]?"font-selected":"")+" svelte-1rrml0c"),w(x,"class","shape-selector-details svelte-1rrml0c"),w(r,"class",P="shape-selector-item "+(n[39].id===n[7]?"selected":"")+" "+(n[8].includes(n[39].id)?"recently-imported":"")+" "+(n[39].isDeleting?"is-deleting":"")+" svelte-1rrml0c"),this.first=r},m(t,s){var l;v(t,r,s),m(r,o),m(o,c),m(o,h),m(o,u),m(r,b),m(r,x),m(x,U),m(U,E),m(x,M),m(x,C),m(C,N),m(r,F),A||(X=[I(c,"click",Y),I(c,"keydown",J),I(u,"click",K),I(u,"keydown",Q),(l=R=n[14].call(null,r,n[8].includes(n[39].id)),l&&i(l.destroy)?l.destroy:e),I(r,"mouseenter",V),I(r,"mouseleave",W),I(r,"focus",Z),I(r,"blur",te),I(r,"click",se)],A=!0)},p(e,t){n=e,64&t[0]&&L(c,"display",n[39].hover?"block":"none"),64&t[0]&&p!==(p="delete-icon "+(n[39].deletable?"":"button-disabled")+" svelte-1rrml0c")&&w(u,"class",p),64&t[0]&&L(u,"display",n[39].hover?"block":"none"),64&t[0]&&g!==(g=!n[39].deletable)&&(u.disabled=g),64&t[0]&&!a(E.src,_=n[39].image)&&w(E,"src",_),64&t[0]&&z!==(z=n[39].name+"")&&T(N,z),192&t[0]&&B!==(B="shape-selector-item-name "+(n[39].id===n[7]?"font-selected":"")+" svelte-1rrml0c")&&w(C,"class",B),448&t[0]&&P!==(P="shape-selector-item "+(n[39].id===n[7]?"selected":"")+" "+(n[8].includes(n[39].id)?"recently-imported":"")+" "+(n[39].isDeleting?"is-deleting":"")+" svelte-1rrml0c")&&w(r,"class",P),R&&i(R.update)&&320&t[0]&&R.update.call(null,n[8].includes(n[39].id))},i(s){j||H((()=>{j=function(s,n,l){const r={direction:"in"};let o,a,c=n(s,l,r),h=!1,u=0;function p(){o&&D(s,o)}function m(){const{delay:n=0,duration:l=300,easing:i=t,tick:r=e,css:m}=c||ee;m&&(o=O(s,0,1,l,n,i,m,u++)),r(0,1);const g=d()+n,b=g+l;a&&a.abort(),h=!0,H((()=>G(s,!0,"start"))),a=f((e=>{if(h){if(e>=b)return r(1,0),G(s,!0,"end"),p(),h=!1;if(e>=g){const t=i((e-g)/l);r(t,1-t)}}return h}))}let g=!1;return{start(){g||(g=!0,D(s),i(c)?(c=c(r),q().then(m)):m())},invalidate(){g=!1},end(){h&&(p(),h=!1)}}}(r,pe,{}),j.start()}))},o:e,d(e){e&&y(r),A=!1,l(X)}}}function Ie(e){let t,s,n,r,o,c,d,h,u,p,f,g,b,T,x,U,E,O,D,_,M,C,N,B,F,P,R,H,j,A,X,z,Y,q,G,J,K,ee,te,le,ie,re,oe,ae,ce,de,he,ue=[],pe=new Map,fe=e[11]&&Se(e),me=e[10]&&ke(e),ge=e[6];const be=e=>e[39].id;for(let t=0;t<ge.length;t+=1){let s=ye(e,ge,t),n=be(s);pe.set(n,ue[t]=$e(n,s))}return{c(){t=S("div"),fe&&fe.c(),s=$(),n=S("div"),r=S("div"),o=S("div"),c=S("div"),c.innerHTML='<img src="icons/header-logo.png" alt="header logo" class="svelte-1rrml0c"/> \n          <h2 class="svelte-1rrml0c">Shape Editor</h2>',d=$(),h=S("button"),h.innerHTML='<img src="icons/close-button.png" alt="X" class="svelte-1rrml0c"/>',u=$(),p=S("div"),f=S("div"),g=S("h3"),g.textContent="Selection Mode",b=$(),T=S("div"),x=S("div"),U=S("button"),E=S("img"),D=k("Turtle"),M=$(),C=S("button"),N=S("img"),F=k("Link"),R=$(),H=S("div"),j=S("button"),j.innerHTML='<img class="button-image-right svelte-1rrml0c" src="icons/create-new-icon.png" alt="create new"/>Create New',A=$(),X=S("div"),z=S("button"),Y=S("img"),G=k("Import From..."),K=$(),me&&me.c(),ee=$(),te=S("div"),le=S("input"),ie=$(),re=S("div"),oe=S("div"),ae=S("div");for(let e=0;e<ue.length;e+=1)ue[e].c();w(c,"class","shape-selector-header-logo svelte-1rrml0c"),w(h,"class","close-button svelte-1rrml0c"),w(o,"class","shape-selector-header svelte-1rrml0c"),w(g,"class","svelte-1rrml0c"),w(E,"class","button-image-left svelte-1rrml0c"),a(E.src,O="icons/turtle-icon.png")||w(E,"src","icons/turtle-icon.png"),w(E,"alt","turtle button"),w(U,"class",_="turtle-button "+("turtle"===e[5]?"selected-button":"unselected-button")+" svelte-1rrml0c"),w(N,"class","button-image-left svelte-1rrml0c"),a(N.src,B="icons/link-icon.png")||w(N,"src","icons/link-icon.png"),w(N,"alt","link button"),w(C,"class",P="link-button "+("link"===e[5]?"selected-button":"unselected-button")+" svelte-1rrml0c"),w(x,"class","mode-selector-buttons svelte-1rrml0c"),w(j,"class","create-new-button svelte-1rrml0c"),w(Y,"class","button-image-right svelte-1rrml0c"),a(Y.src,q="icons/import-icon.png")||w(Y,"src","icons/import-icon.png"),w(Y,"alt","import"),w(z,"class",J="import-shapes-button "+(e[10]?"clicked":"")+" svelte-1rrml0c"),w(X,"class","dropdown svelte-1rrml0c"),w(H,"class","shape-selector-buttons svelte-1rrml0c"),w(T,"class","selector-buttons svelte-1rrml0c"),w(f,"class","mode-selector svelte-1rrml0c"),le.value=e[4],w(le,"placeholder","Search"),L(le,"background-image","url('icons/search-icon.png')"),w(le,"class","svelte-1rrml0c"),w(te,"class","shape-selector-search svelte-1rrml0c"),w(ae,"class","shape-selector-grid-inner svelte-1rrml0c"),w(oe,"class","scrollbar-wrapper svelte-1rrml0c"),w(re,"class","shape-selector-grid svelte-1rrml0c"),w(p,"class","inner-container svelte-1rrml0c"),w(r,"class","shape-selector svelte-1rrml0c"),w(n,"class","shape-selector-dialog svelte-1rrml0c"),L(n,"display",e[9]?"block":"none",1)},m(l,a){v(l,t,a),fe&&fe.m(t,null),m(t,s),m(t,n),m(n,r),m(r,o),m(o,c),m(o,d),m(o,h),e[16](o),m(r,u),m(r,p),m(p,f),m(f,g),m(f,b),m(f,T),m(T,x),m(x,U),m(U,E),m(U,D),m(x,M),m(x,C),m(C,N),m(C,F),m(T,R),m(T,H),m(H,j),m(H,A),m(H,X),m(X,z),m(z,Y),m(z,G),m(X,K),me&&me.m(X,null),m(p,ee),m(p,te),m(te,le),m(p,ie),m(p,re),m(re,oe),m(oe,ae);for(let e=0;e<ue.length;e+=1)ue[e]&&ue[e].m(ae,null);e[29](ae),e[30](n),ce=!0,de||(he=[I(h,"click",e[15]),I(U,"click",e[17]),I(C,"click",e[18]),I(j,"click",(function(){i(e[0].createShape())&&e[0].createShape().apply(this,arguments)})),I(z,"click",(function(){i(e[0].importShapes())&&e[0].importShapes().apply(this,arguments)})),I(le,"input",e[19])],de=!0)},p(l,i){(e=l)[11]?fe?(fe.p(e,i),2048&i[0]&&W(fe,1)):(fe=Se(e),fe.c(),W(fe,1),fe.m(t,s)):fe&&(Q(),Z(fe,1,1,(()=>{fe=null})),V()),(!ce||32&i[0]&&_!==(_="turtle-button "+("turtle"===e[5]?"selected-button":"unselected-button")+" svelte-1rrml0c"))&&w(U,"class",_),(!ce||32&i[0]&&P!==(P="link-button "+("link"===e[5]?"selected-button":"unselected-button")+" svelte-1rrml0c"))&&w(C,"class",P),(!ce||1024&i[0]&&J!==(J="import-shapes-button "+(e[10]?"clicked":"")+" svelte-1rrml0c"))&&w(z,"class",J),e[10]?me?(me.p(e,i),1024&i[0]&&W(me,1)):(me=ke(e),me.c(),W(me,1),me.m(X,null)):me&&(Q(),Z(me,1,1,(()=>{me=null})),V()),(!ce||16&i[0]&&le.value!==e[4])&&(le.value=e[4]),449&i[0]&&(ge=e[6],ue=ne(ue,i,be,1,e,ge,pe,ae,se,$e,null,ye)),(!ce||512&i[0])&&L(n,"display",e[9]?"block":"none",1)},i(e){if(!ce){W(fe),W(me);for(let e=0;e<ge.length;e+=1)W(ue[e]);ce=!0}},o(e){Z(fe),Z(me),ce=!1},d(s){s&&y(t),fe&&fe.d(),e[16](null),me&&me.d();for(let e=0;e<ue.length;e+=1)ue[e].d();e[29](null),e[30](null),de=!1,l(he)}}}function we(e,t,s){let n,l,i,r,o,a,c,d,h=[],u=null,p=[],f=!0,m=!1,g=!1;const b=ue([]),v=ue([]),y=ue(null),S=ue([]),k=ue(!0),$=ue(!1),I=ue(!1);M((()=>{const e={onUpdateShapes:e=>{b.set(e)},onUpdateFilteredShapes:e=>{v.set(e)},onUpdateSelectedItemId:e=>{y.set(e)},onUpdateDialogOpen:e=>{k.set(e)},onUpdateImportButtonSelected:e=>{$.set(e)},onUpdateLibraryOpen:e=>{I.set(e)},onUpdateRecentlyImportedShapes:e=>{S.set(e)}};s(0,r=new ce(document.getElementById("Container"),e));let t=!1,i=[0,0];s(12,c=()=>{r.closeLibrary()}),s(13,d=e=>{r.addNewShapes(e)}),l.addEventListener("mousedown",(e=>{t=!0,i=[n.offsetLeft-e.clientX,n.offsetTop-e.clientY]}),!0),document.addEventListener("mouseup",(()=>{t=!1}),!0),document.addEventListener("mousemove",(e=>{e.preventDefault(),t&&(s(1,n.style.left=e.clientX+i[0]+"px",n),s(1,n.style.top=e.clientY+i[1]+"px",n))}),!0)})),b.subscribe((e=>{})),v.subscribe((e=>{s(6,h=e)})),y.subscribe((e=>{s(7,u=e)})),k.subscribe((e=>{s(9,f=e)})),$.subscribe((e=>{s(10,m=e)})),I.subscribe((e=>{s(11,g=e)})),S.subscribe((e=>{s(8,p=e)}));return e.$$.update=()=>{1&e.$$.dirty[0]&&r&&(s(4,o=r.searchTerm),s(5,a=r.currentType),s(6,h=r.filteredShapes),r.shapes,s(7,u=r.selectedItemId),s(8,p=r.recentlyImportedShapeIds),s(9,f=r.dialogOpen),s(10,m=r.importButtonSelected),s(11,g=r.libraryOpen))},[r,n,l,i,o,a,h,u,p,f,m,g,c,d,function(e,t){if(t){let t=e.offsetTop-i.offsetTop;(t<i.scrollTop||t>i.scrollTop+i.offsetHeight)&&s(3,i.scrollTop=t,i)}},()=>r.toggleDialog(),function(e){N[e?"unshift":"push"]((()=>{l=e,s(2,l)}))},()=>{s(5,a="turtle"),r.filterShapes("turtle")},()=>{s(5,a="link"),r.filterShapes("link")},e=>r.handleSearch(e.target.value),(e,t)=>{t.stopPropagation(),r.duplicateShape(e.id)},(e,t)=>{"Enter"===t.key&&(t.stopPropagation(),r.duplicateShape(e.id))},(e,t)=>{t.stopPropagation(),r.deleteShape(e.id)},(e,t)=>{"Enter"===t.key&&(t.stopPropagation(),r.deleteShape(e.id))},(e,t,n)=>s(6,t[n].hover=!0,h),(e,t,n)=>s(6,t[n].hover=!1,h),(e,t,n)=>s(6,t[n].hover=!0,h),(e,t,n)=>s(6,t[n].hover=!1,h),e=>r.setSelectedItemId(e.id),function(e){N[e?"unshift":"push"]((()=>{i=e,s(3,i)}))},function(e){N[e?"unshift":"push"]((()=>{n=e,s(1,n)}))}]}return new class extends ae{constructor(e){super(),oe(this,e,we,Ie,r,{},null,[-1,-1])}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
