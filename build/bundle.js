var app=function(){"use strict";function e(){}const t=e=>e;function s(e){return e()}function n(){return Object.create(null)}function i(e){e.forEach(s)}function o(e){return"function"==typeof e}function l(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let r;function a(e,t){return r||(r=document.createElement("a")),r.href=t,e===r.href}const c="undefined"!=typeof window;let d=c?()=>window.performance.now():()=>Date.now(),u=c?e=>requestAnimationFrame(e):e;const h=new Set;function p(e){h.forEach((t=>{t.c(e)||(h.delete(t),t.f())})),0!==h.size&&u(p)}function f(e){let t;return 0===h.size&&u(p),{promise:new Promise((s=>{h.add(t={c:e,f:s})})),abort(){h.delete(t)}}}function m(e,t){e.appendChild(t)}function g(e){if(!e)return document;const t=e.getRootNode?e.getRootNode():e.ownerDocument;return t&&t.host?t:e.ownerDocument}function b(e){const t=S("style");return function(e,t){m(e.head||e,t),t.sheet}(g(e),t),t.sheet}function v(e,t,s){e.insertBefore(t,s||null)}function y(e){e.parentNode&&e.parentNode.removeChild(e)}function S(e){return document.createElement(e)}function k(e){return document.createTextNode(e)}function $(){return k(" ")}function I(e,t,s,n){return e.addEventListener(t,s,n),()=>e.removeEventListener(t,s,n)}function w(e,t,s){null==s?e.removeAttribute(t):e.getAttribute(t)!==s&&e.setAttribute(t,s)}function T(e,t){t=""+t,e.data!==t&&(e.data=t)}function L(e,t,s,n){null==s?e.style.removeProperty(t):e.style.setProperty(t,s,n?"important":"")}const x=new Map;let U,E=0;function O(e,t,s,n,i,o,l,r=0){const a=16.666/n;let c="{\n";for(let e=0;e<=1;e+=a){const n=t+(s-t)*o(e);c+=100*e+`%{${l(n,1-n)}}\n`}const d=c+`100% {${l(s,1-s)}}\n}`,u=`__svelte_${function(e){let t=5381,s=e.length;for(;s--;)t=(t<<5)-t^e.charCodeAt(s);return t>>>0}(d)}_${r}`,h=g(e),{stylesheet:p,rules:f}=x.get(h)||function(e,t){const s={stylesheet:b(t),rules:{}};return x.set(e,s),s}(h,e);f[u]||(f[u]=!0,p.insertRule(`@keyframes ${u} ${d}`,p.cssRules.length));const m=e.style.animation||"";return e.style.animation=`${m?`${m}, `:""}${u} ${n}ms linear ${i}ms 1 both`,E+=1,u}function _(e,t){const s=(e.style.animation||"").split(", "),n=s.filter(t?e=>e.indexOf(t)<0:e=>-1===e.indexOf("__svelte")),i=s.length-n.length;i&&(e.style.animation=n.join(", "),E-=i,E||u((()=>{E||(x.forEach((e=>{const{ownerNode:t}=e.stylesheet;t&&y(t)})),x.clear())})))}function D(e){U=e}function M(e){(function(){if(!U)throw new Error("Function called outside component initialization");return U})().$$.on_mount.push(e)}const C=[],N=[];let B=[];const F=[],P=Promise.resolve();let R=!1;function H(e){B.push(e)}const j=new Set;let A,X=0;function z(){if(0!==X)return;const e=U;do{try{for(;X<C.length;){const e=C[X];X++,D(e),Y(e.$$)}}catch(e){throw C.length=0,X=0,e}for(D(null),C.length=0,X=0;N.length;)N.pop()();for(let e=0;e<B.length;e+=1){const t=B[e];j.has(t)||(j.add(t),t())}B.length=0}while(C.length);for(;F.length;)F.pop()();R=!1,j.clear(),D(e)}function Y(e){if(null!==e.fragment){e.update(),i(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(H)}}function q(){return A||(A=Promise.resolve(),A.then((()=>{A=null}))),A}function G(e,t,s){e.dispatchEvent(function(e,t,{bubbles:s=!1,cancelable:n=!1}={}){const i=document.createEvent("CustomEvent");return i.initCustomEvent(e,s,n,t),i}(`${t?"intro":"outro"}${s}`))}const J=new Set;let K;function Q(){K={r:0,c:[],p:K}}function V(){K.r||i(K.c),K=K.p}function W(e,t){e&&e.i&&(J.delete(e),e.i(t))}function Z(e,t,s,n){if(e&&e.o){if(J.has(e))return;J.add(e),K.c.push((()=>{J.delete(e),n&&(s&&e.d(1),n())})),e.o(t)}else n&&n()}const ee={duration:0};function te(s,n,l,r){const a={direction:"both"};let c=n(s,l,a),u=r?0:1,h=null,p=null,m=null;function g(){m&&_(s,m)}function b(e,t){const s=e.b-u;return t*=Math.abs(s),{a:u,b:e.b,d:s,duration:t,start:e.start,end:e.start+t,group:e.group}}function v(n){const{delay:o=0,duration:l=300,easing:r=t,tick:a=e,css:v}=c||ee,y={start:d()+o,b:n};n||(y.group=K,K.r+=1),h||p?p=y:(v&&(g(),m=O(s,u,n,l,o,r,v)),n&&a(0,1),h=b(y,l),H((()=>G(s,n,"start"))),f((e=>{if(p&&e>p.start&&(h=b(p,l),p=null,G(s,h.b,"start"),v&&(g(),m=O(s,u,h.b,h.duration,0,r,c.css))),h)if(e>=h.end)a(u=h.b,1-u),G(s,h.b,"end"),p||(h.b?g():--h.group.r||i(h.group.c)),h=null;else if(e>=h.start){const t=e-h.start;u=h.a+h.d*r(t/h.duration),a(u,1-u)}return!(!h&&!p)})))}return{run(e){o(c)?q().then((()=>{c=c(a),v(e)})):v(e)},end(){g(),h=p=null}}}function se(e,t){e.d(1),t.delete(e.key)}function ne(e,t,s,n,o,l,r,a,c,d,u,h){let p=e.length,f=l.length,m=p;const g={};for(;m--;)g[e[m].key]=m;const b=[],v=new Map,y=new Map,S=[];for(m=f;m--;){const e=h(o,l,m),i=s(e);let a=r.get(i);a?n&&S.push((()=>a.p(e,t))):(a=d(i,e),a.c()),v.set(i,b[m]=a),i in g&&y.set(i,Math.abs(m-g[i]))}const k=new Set,$=new Set;function I(e){W(e,1),e.m(a,u),r.set(e.key,e),u=e.first,f--}for(;p&&f;){const t=b[f-1],s=e[p-1],n=t.key,i=s.key;t===s?(u=t.first,p--,f--):v.has(i)?!r.has(n)||k.has(n)?I(t):$.has(i)?p--:y.get(n)>y.get(i)?($.add(n),I(t)):(k.add(i),p--):(c(s,r),p--)}for(;p--;){const t=e[p];v.has(t.key)||c(t,r)}for(;f;)I(b[f-1]);return i(S),b}function ie(e,t,n,l){const{fragment:r,after_update:a}=e.$$;r&&r.m(t,n),l||H((()=>{const t=e.$$.on_mount.map(s).filter(o);e.$$.on_destroy?e.$$.on_destroy.push(...t):i(t),e.$$.on_mount=[]})),a.forEach(H)}function oe(e,t){const s=e.$$;null!==s.fragment&&(!function(e){const t=[],s=[];B.forEach((n=>-1===e.indexOf(n)?t.push(n):s.push(n))),s.forEach((e=>e())),B=t}(s.after_update),i(s.on_destroy),s.fragment&&s.fragment.d(t),s.on_destroy=s.fragment=null,s.ctx=[])}function le(e,t){-1===e.$$.dirty[0]&&(C.push(e),R||(R=!0,P.then(z)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function re(t,s,o,l,r,a,c,d=[-1]){const u=U;D(t);const h=t.$$={fragment:null,ctx:[],props:a,update:e,not_equal:r,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(s.context||(u?u.$$.context:[])),callbacks:n(),dirty:d,skip_bound:!1,root:s.target||u.$$.root};c&&c(h.root);let p=!1;if(h.ctx=o?o(t,s.props||{},((e,s,...n)=>{const i=n.length?n[0]:s;return h.ctx&&r(h.ctx[e],h.ctx[e]=i)&&(!h.skip_bound&&h.bound[e]&&h.bound[e](i),p&&le(t,e)),s})):[],h.update(),p=!0,i(h.before_update),h.fragment=!!l&&l(h.ctx),s.target){if(s.hydrate){const e=function(e){return Array.from(e.childNodes)}(s.target);h.fragment&&h.fragment.l(e),e.forEach(y)}else h.fragment&&h.fragment.c();s.intro&&W(t.$$.fragment),ie(t,s.target,s.anchor,s.customElement),z()}D(u)}class ae{$destroy(){oe(this,1),this.$destroy=e}$on(t,s){if(!o(s))return e;const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(s),()=>{const e=n.indexOf(s);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}class ce{constructor(e,t){this.shapes=[],this.filteredShapes=[],this.selectedItemId=null,this.recentlyImportedShapeIds=[],this.parent=e,this.shapes=[{id:1,name:"default",image:"shapes/down-arrow.png",type:"turtle",hover:!1,deletable:!1,isDeleting:!1},{id:2,name:"default",image:"shapes/down-arrow.png",type:"link",hover:!1,deletable:!1,isDeleting:!1}],this.searchTerm="",this.filteredShapes=this.shapes,this.currentType="turtle",this.config=t,this.filterShapes(this.currentType),this.dialogOpen=!0,this.importButtonSelected=!1,this.libraryOpen=!1}toggleDialog(){this.dialogOpen=!this.dialogOpen,this.config.onUpdateDialogOpen(this.dialogOpen)}openLibrary(){this.libraryOpen=!0,this.importButtonSelected=!1,this.config.onUpdateLibraryOpen(this.libraryOpen),this.config.onUpdateImportButtonSelected(this.importButtonSelected)}closeLibrary(){console.log("close library"),this.libraryOpen=!1,this.config.onUpdateLibraryOpen(this.libraryOpen)}createShape(){this.recentlyImportedShapeIds=[],this.config.onUpdateRecentlyImportedShapes(this.recentlyImportedShapeIds);const e={id:Math.max(...this.shapes.map((e=>e.id)))+1,name:"new default",image:"shapes/down-arrow.png",type:this.currentType,hover:!1,deletable:!0,isDeleting:!1};this.shapes.unshift(e),this.shapes=[...this.shapes],this.config.onUpdateShapes(this.shapes),this.filterShapes(this.currentType),this.config.onUpdateFilteredShapes(this.filteredShapes)}importShapes(){this.importButtonSelected=!this.importButtonSelected,this.config.onUpdateImportButtonSelected(this.importButtonSelected)}duplicateShape(e){const t=this.shapes.find((t=>t.id===e));if(t){const{name:s}=t,n=s.match(/^(.*?)(\s(\d+))?$/);if(n){const s=n[1],i=[];for(const e of this.shapes)if(0===e.name.indexOf(s)){const t=e.name.match(/^.*\s(\d+)$/);t&&i.push(Number(t[1]))}let o=-1;for(let t=0;t<this.shapes.length;t++)if(this.shapes[t].id===e){o=t;break}let l=o;if(i.length>=1){const e=Math.max(...i);for(let t=0;t<this.shapes.length;t++)if(this.shapes[t].name===`${s} ${e}`){l=t;break}}const r=`${s} ${i.length?Math.max(...i)+1:1}`,a=Object.assign(Object.assign({},t),{name:r,hover:!1,deletable:!0}),c=Math.max(...this.shapes.map((e=>e.id)))+1;a.id=c,this.shapes.splice(l+1,0,a),this.shapes=[...this.shapes],this.handleSearch(this.searchTerm),this.config.onUpdateShapes(this.shapes),this.config.onUpdateFilteredShapes(this.filteredShapes)}}}addNewShapes(e){this.recentlyImportedShapeIds=[],this.config.onUpdateRecentlyImportedShapes(this.recentlyImportedShapeIds),e.forEach((e=>{e.id=Math.max(...this.shapes.map((e=>e.id)))+1,e.type=this.currentType,e.hover=!1,e.deletable=!0,"default"===e.name&&(e.deletable=!1),this.shapes.push(e),this.recentlyImportedShapeIds.push(e.id)})),this.shapes.sort(((e,t)=>"default"===e.name?-1:"default"===t.name?1:e.name.localeCompare(t.name))),this.shapes=[...this.shapes],this.config.onUpdateShapes(this.shapes),this.filterShapes(this.currentType),this.config.onUpdateRecentlyImportedShapes(this.recentlyImportedShapeIds)}deleteShape(e){console.log("delete shape");let t=-1,s=-1;for(let s=0;s<this.shapes.length;s++)this.shapes[s].id===e&&(t=s);for(let t=0;t<this.filteredShapes.length;t++)this.filteredShapes[t].id===e&&(s=t);-1!==t&&-1!==s&&(this.shapes[t].isDeleting=!0,this.filteredShapes[s].isDeleting=!0,this.shapes=[...this.shapes],this.filteredShapes=[...this.filteredShapes],this.config.onUpdateShapes(this.shapes),this.config.onUpdateFilteredShapes(this.filteredShapes),setTimeout((()=>{this.shapes.splice(t,1),this.shapes=[...this.shapes],this.handleSearch(this.searchTerm),this.config.onUpdateShapes(this.shapes),this.config.onUpdateFilteredShapes(this.filteredShapes)}),500))}filterShapes(e){this.currentType=e,this.filteredShapes=[];for(let e=0;e<this.shapes.length;e++){const t=this.shapes[e];t.type===this.currentType&&-1!==t.name.toLowerCase().indexOf(this.searchTerm.toLowerCase())&&this.filteredShapes.push(t)}this.config.onUpdateFilteredShapes(this.filteredShapes)}handleSearch(e){this.searchTerm=e,this.filterShapes(this.currentType),this.config.onUpdateFilteredShapes(this.filteredShapes)}setSelectedItemId(e){this.selectedItemId===e?this.selectedItemId=null:this.selectedItemId=e,console.log(this.shapes.find((e=>e.id===this.selectedItemId))),this.recentlyImportedShapeIds=[],this.config.onUpdateRecentlyImportedShapes(this.recentlyImportedShapeIds),this.config.onUpdateSelectedItemId(this.selectedItemId)}}class de{constructor(e,t){this.shapes=[],this.filteredShapes=[],this.selectedItemIds=[],this.parent=e,this.shapes=[{id:1,name:"default",image:"shapes/down-arrow.png",type:"turtle",hover:!1,deletable:!0,isDeleting:!1},{id:2,name:"ghost",image:"shapes/ghost.png",type:"turtle",hover:!1,deletable:!0,isDeleting:!1},{id:3,name:"turtle",image:"shapes/cute-turtle.png",type:"turtle",hover:!1,deletable:!0,isDeleting:!1}],this.searchTerm="",this.filteredShapes=this.shapes,this.currentType="turtle",this.config=t,this.filterShapes(this.currentType),this.dialogOpen=!0}filterShapes(e){this.currentType=e,this.filteredShapes=[];for(let e=0;e<this.shapes.length;e++){const t=this.shapes[e];t.type===this.currentType&&-1!==t.name.toLowerCase().indexOf(this.searchTerm.toLowerCase())&&this.filteredShapes.push(t)}this.config.onUpdateFilteredShapes(this.filteredShapes)}handleSearch(e){this.searchTerm=e,this.filterShapes(this.currentType),this.config.onUpdateFilteredShapes(this.filteredShapes)}setSelectedItemId(e){const t=this.selectedItemIds.indexOf(e);t>-1?this.selectedItemIds.splice(t,1):this.selectedItemIds.push(e),console.log(this.selectedItemIds.map((e=>this.shapes.find((t=>t.id===e))))),this.config.onUpdateSelectedItemIds([...this.selectedItemIds])}}const ue=[];function he(t,s=e){let n;const i=new Set;function o(e){if(l(t,e)&&(t=e,n)){const e=!ue.length;for(const e of i)e[1](),ue.push(e,t);if(e){for(let e=0;e<ue.length;e+=2)ue[e][0](ue[e+1]);ue.length=0}}}return{set:o,update:function(e){o(e(t))},subscribe:function(l,r=e){const a=[l,r];return i.add(a),1===i.size&&(n=s(o)||e),l(t),()=>{i.delete(a),0===i.size&&n&&(n(),n=null)}}}}function pe(e,{delay:s=0,duration:n=400,easing:i=t}={}){const o=+getComputedStyle(e).opacity;return{delay:s,duration:n,easing:i,css:e=>"opacity: "+e*o}}function fe(e,t,s){const n=e.slice();return n[23]=t[s],n[24]=t,n[25]=s,n}function me(e,t){let s,n,o,l,r,c,d,u,h,p,f,g,b,L=t[23].name+"";function x(){return t[11](t[23],t[24],t[25])}function U(){return t[12](t[23],t[24],t[25])}function E(){return t[13](t[23],t[24],t[25])}function O(){return t[14](t[23],t[24],t[25])}function _(){return t[15](t[23])}return{key:e,first:null,c(){s=S("button"),n=S("div"),o=S("div"),l=S("img"),c=$(),d=S("div"),u=k(L),p=$(),w(l,"class","shape-selector-item-image svelte-1nd47ae"),a(l.src,r=t[23].image)||w(l,"src",r),w(l,"alt",""),w(o,"class","shape-selector-item-image-div svelte-1nd47ae"),w(d,"class",h="shape-selector-item-name "+(t[8].includes(t[23].id)?"font-selected":"")+" svelte-1nd47ae"),w(n,"class","shape-selector-details svelte-1nd47ae"),w(s,"class",f="shape-selector-item "+(t[8].includes(t[23].id)?"selected":"")+" svelte-1nd47ae"),this.first=s},m(e,t){v(e,s,t),m(s,n),m(n,o),m(o,l),m(n,c),m(n,d),m(d,u),m(s,p),g||(b=[I(s,"mouseenter",x),I(s,"mouseleave",U),I(s,"focus",E),I(s,"blur",O),I(s,"click",_)],g=!0)},p(e,n){t=e,64&n&&!a(l.src,r=t[23].image)&&w(l,"src",r),64&n&&L!==(L=t[23].name+"")&&T(u,L),320&n&&h!==(h="shape-selector-item-name "+(t[8].includes(t[23].id)?"font-selected":"")+" svelte-1nd47ae")&&w(d,"class",h),320&n&&f!==(f="shape-selector-item "+(t[8].includes(t[23].id)?"selected":"")+" svelte-1nd47ae")&&w(s,"class",f)},d(e){e&&y(s),g=!1,i(b)}}}function ge(e){let t,s,n,l,r,a,c,d,u,h,p,f,g,b,k,T,x,U,E,O,_,D,M,C=[],N=new Map,B=e[6];const F=e=>e[23].id;for(let t=0;t<B.length;t+=1){let s=fe(e,B,t),n=F(s);N.set(n,C[t]=me(n,s))}return{c(){t=S("div"),s=S("div"),n=S("div"),l=S("h2"),l.textContent="Library",r=$(),a=S("button"),a.innerHTML='<img src="icons/close-button.png" alt="X" class="svelte-1nd47ae"/>',c=$(),d=S("div"),u=S("div"),h=S("input"),p=$(),f=S("div"),g=S("div");for(let e=0;e<C.length;e+=1)C[e].c();b=$(),k=S("div"),T=S("div"),x=S("button"),x.textContent="Import",U=$(),E=S("button"),E.textContent="Cancel",w(l,"class","svelte-1nd47ae"),w(a,"class","close-button svelte-1nd47ae"),w(n,"class","shape-selector-header svelte-1nd47ae"),h.value=e[5],w(h,"placeholder","Search"),L(h,"background-image","url('icons/search-icon.png')"),w(h,"class","svelte-1nd47ae"),w(u,"class","shape-selector-search svelte-1nd47ae"),w(g,"class","shape-selector-grid-inner svelte-1nd47ae"),w(f,"class","shape-selector-grid svelte-1nd47ae"),w(d,"class","inner-container svelte-1nd47ae"),w(x,"class","import-button svelte-1nd47ae"),w(E,"class","cancel-button svelte-1nd47ae"),w(T,"class","import-cancel-buttons svelte-1nd47ae"),w(k,"class","import-cancel-buttons-container svelte-1nd47ae"),w(s,"class","shape-selector-library svelte-1nd47ae"),w(t,"class","shape-selector-library-dialog svelte-1nd47ae")},m(i,y){v(i,t,y),m(t,s),m(s,n),m(n,l),m(n,r),m(n,a),e[9](n),m(s,c),m(s,d),m(d,u),m(u,h),m(d,p),m(d,f),m(f,g);for(let e=0;e<C.length;e+=1)C[e]&&C[e].m(g,null);m(s,b),m(s,k),m(k,T),m(T,x),m(T,U),m(T,E),e[17](t),_=!0,D||(M=[I(a,"click",(function(){o(e[0])&&e[0].apply(this,arguments)})),I(h,"input",e[10]),I(x,"click",e[16]),I(E,"click",(function(){o(e[0])&&e[0].apply(this,arguments)}))],D=!0)},p(t,[s]){e=t,(!_||32&s&&h.value!==e[5])&&(h.value=e[5]),324&s&&(B=e[6],C=ne(C,s,F,1,e,B,N,g,se,me,null,fe))},i(e){_||(H((()=>{_&&(O||(O=te(t,pe,{duration:500},!0)),O.run(1))})),_=!0)},o(e){O||(O=te(t,pe,{duration:500},!1)),O.run(0),_=!1},d(s){s&&y(t),e[9](null);for(let e=0;e<C.length;e+=1)C[e].d();e[17](null),s&&O&&O.end(),D=!1,i(M)}}}function be(e,t,s){let n,i,o,l,r=[],a=[],c=[],{closeLibrary:d}=t,{addNewShapes:u}=t;const h=he([]),p=he([]),f=he([]),m=he(!1);M((()=>{const e={onUpdateShapes:e=>{h.set(e)},onUpdateFilteredShapes:e=>{p.set(e)},onUpdateSelectedItemIds:e=>{f.set(e)},onUpdateImportButtonSelected:e=>{m.set(e)}};s(2,o=new de(document.getElementById("Container"),e));let t=!1,l=[0,0];i.addEventListener("mousedown",(e=>{t=!0,l=[n.offsetLeft-e.clientX,n.offsetTop-e.clientY]}),!0),document.addEventListener("mouseup",(()=>{t=!1}),!0),document.addEventListener("mousemove",(e=>{e.preventDefault(),t&&(s(3,n.style.left=e.clientX+l[0]+"px",n),s(3,n.style.top=e.clientY+l[1]+"px",n))}),!0)})),h.subscribe((e=>{s(7,a=e)})),p.subscribe((e=>{s(6,r=e)})),f.subscribe((e=>{s(8,c=e)}));return e.$$set=e=>{"closeLibrary"in e&&s(0,d=e.closeLibrary),"addNewShapes"in e&&s(1,u=e.addNewShapes)},e.$$.update=()=>{4&e.$$.dirty&&o&&(s(5,l=o.searchTerm),o.currentType,s(6,r=o.filteredShapes),s(7,a=o.shapes),s(8,c=o.selectedItemIds))},[d,u,o,n,i,l,r,a,c,function(e){N[e?"unshift":"push"]((()=>{i=e,s(4,i)}))},e=>o.handleSearch(e.target.value),(e,t,n)=>s(6,t[n].hover=!0,r),(e,t,n)=>s(6,t[n].hover=!1,r),(e,t,n)=>s(6,t[n].hover=!0,r),(e,t,n)=>s(6,t[n].hover=!1,r),e=>o.setSelectedItemId(e.id),()=>{c.length>0&&(u(a.filter((e=>c.includes(e.id)))),d())},function(e){N[e?"unshift":"push"]((()=>{n=e,s(3,n)}))}]}class ve extends ae{constructor(e){super(),re(this,e,be,ge,l,{closeLibrary:0,addNewShapes:1})}}function ye(e,t,s){const n=e.slice();return n[39]=t[s],n[40]=t,n[41]=s,n}function Se(e){let t,s;return t=new ve({props:{closeLibrary:e[12],addNewShapes:e[13]}}),{c(){var e;(e=t.$$.fragment)&&e.c()},m(e,n){ie(t,e,n),s=!0},p(e,s){const n={};4096&s[0]&&(n.closeLibrary=e[12]),8192&s[0]&&(n.addNewShapes=e[13]),t.$set(n)},i(e){s||(W(t.$$.fragment,e),s=!0)},o(e){Z(t.$$.fragment,e),s=!1},d(e){oe(t,e)}}}function ke(e){let t,s,n,l,r,a,c,d;return{c(){t=S("div"),s=S("button"),s.innerHTML='<img class="button-image-left svelte-5udk34" src="icons/library-icon.png" alt="library"/>Library',n=$(),l=S("button"),l.innerHTML='<img class="button-image-left svelte-5udk34" src="icons/model-icon.png" alt="model"/>Model',w(s,"class","dropdown-button library-button svelte-5udk34"),w(l,"class","dropdown-button model-button svelte-5udk34"),w(t,"class","dropdown-content svelte-5udk34")},m(i,r){v(i,t,r),m(t,s),m(t,n),m(t,l),a=!0,c||(d=[I(s,"click",(function(){o(e[0].openLibrary())&&e[0].openLibrary().apply(this,arguments)})),I(l,"click",console.log("model"))],c=!0)},p(t,s){e=t},i(e){a||(H((()=>{a&&(r||(r=te(t,pe,{duration:500},!0)),r.run(1))})),a=!0)},o(e){r||(r=te(t,pe,{duration:500},!1)),r.run(0),a=!1},d(e){e&&y(t),e&&r&&r.end(),c=!1,i(d)}}}function $e(s,n){let l,r,c,u,h,p,g,b,x,U,E,D,M,C,N,B,F,P,R,j,A,X,z=n[39].name+"";function Y(...e){return n[20](n[39],...e)}function J(...e){return n[21](n[39],...e)}function K(...e){return n[22](n[39],...e)}function Q(...e){return n[23](n[39],...e)}function V(){return n[24](n[39],n[40],n[41])}function W(){return n[25](n[39],n[40],n[41])}function Z(){return n[26](n[39],n[40],n[41])}function te(){return n[27](n[39],n[40],n[41])}function se(){return n[28](n[39])}return{key:s,first:null,c(){l=S("button"),r=S("div"),c=S("button"),u=$(),h=S("button"),b=$(),x=S("div"),U=S("div"),E=S("img"),M=$(),C=S("div"),N=k(z),F=$(),w(c,"aria-label","Duplicate shape"),w(c,"class","duplicate-icon svelte-5udk34"),L(c,"display",n[39].hover?"block":"none"),L(c,"background-image","url('icons/duplicate-icon.png')"),w(h,"aria-label","Delete shape"),w(h,"class",p="delete-icon "+(n[39].deletable?"":"button-disabled")+" svelte-5udk34"),L(h,"display",n[39].hover?"block":"none"),L(h,"background-image","url('icons/delete-icon.png')"),h.disabled=g=!n[39].deletable,w(r,"class","shape-selector-item-buttons svelte-5udk34"),w(E,"class","shape-selector-item-image svelte-5udk34"),a(E.src,D=n[39].image)||w(E,"src",D),w(E,"alt",""),w(U,"class","shape-selector-item-image-div svelte-5udk34"),w(C,"class",B="shape-selector-item-name "+(n[39].id===n[7]?"font-selected":"")+" svelte-5udk34"),w(x,"class","shape-selector-details svelte-5udk34"),w(l,"class",P="shape-selector-item "+(n[39].id===n[7]?"selected":"")+" "+(n[8].includes(n[39].id)?"recently-imported":"")+" "+(n[39].isDeleting?"is-deleting":"")+" svelte-5udk34"),this.first=l},m(t,s){var i;v(t,l,s),m(l,r),m(r,c),m(r,u),m(r,h),m(l,b),m(l,x),m(x,U),m(U,E),m(x,M),m(x,C),m(C,N),m(l,F),A||(X=[I(c,"click",Y),I(c,"keydown",J),I(h,"click",K),I(h,"keydown",Q),(i=R=n[14].call(null,l,n[8].includes(n[39].id)),i&&o(i.destroy)?i.destroy:e),I(l,"mouseenter",V),I(l,"mouseleave",W),I(l,"focus",Z),I(l,"blur",te),I(l,"click",se)],A=!0)},p(e,t){n=e,64&t[0]&&L(c,"display",n[39].hover?"block":"none"),64&t[0]&&p!==(p="delete-icon "+(n[39].deletable?"":"button-disabled")+" svelte-5udk34")&&w(h,"class",p),64&t[0]&&L(h,"display",n[39].hover?"block":"none"),64&t[0]&&g!==(g=!n[39].deletable)&&(h.disabled=g),64&t[0]&&!a(E.src,D=n[39].image)&&w(E,"src",D),64&t[0]&&z!==(z=n[39].name+"")&&T(N,z),192&t[0]&&B!==(B="shape-selector-item-name "+(n[39].id===n[7]?"font-selected":"")+" svelte-5udk34")&&w(C,"class",B),448&t[0]&&P!==(P="shape-selector-item "+(n[39].id===n[7]?"selected":"")+" "+(n[8].includes(n[39].id)?"recently-imported":"")+" "+(n[39].isDeleting?"is-deleting":"")+" svelte-5udk34")&&w(l,"class",P),R&&o(R.update)&&320&t[0]&&R.update.call(null,n[8].includes(n[39].id))},i(s){j||H((()=>{j=function(s,n,i){const l={direction:"in"};let r,a,c=n(s,i,l),u=!1,h=0;function p(){r&&_(s,r)}function m(){const{delay:n=0,duration:i=300,easing:o=t,tick:l=e,css:m}=c||ee;m&&(r=O(s,0,1,i,n,o,m,h++)),l(0,1);const g=d()+n,b=g+i;a&&a.abort(),u=!0,H((()=>G(s,!0,"start"))),a=f((e=>{if(u){if(e>=b)return l(1,0),G(s,!0,"end"),p(),u=!1;if(e>=g){const t=o((e-g)/i);l(t,1-t)}}return u}))}let g=!1;return{start(){g||(g=!0,_(s),o(c)?(c=c(l),q().then(m)):m())},invalidate(){g=!1},end(){u&&(p(),u=!1)}}}(l,pe,{}),j.start()}))},o:e,d(e){e&&y(l),A=!1,i(X)}}}function Ie(e){let t,s,n,l,r,c,d,u,h,p,f,g,b,T,x,U,E,O,_,D,M,C,N,B,F,P,R,H,j,A,X,z,Y,q,G,J,K,ee,te,ie,oe,le,re,ae,ce,de,ue=[],he=new Map,pe=e[11]&&Se(e),fe=e[10]&&ke(e),me=e[6];const ge=e=>e[39].id;for(let t=0;t<me.length;t+=1){let s=ye(e,me,t),n=ge(s);he.set(n,ue[t]=$e(n,s))}return{c(){t=S("div"),pe&&pe.c(),s=$(),n=S("div"),l=S("div"),r=S("div"),c=S("div"),c.innerHTML='<img src="icons/header-logo.png" alt="header logo" class="svelte-5udk34"/> \n          <h2 class="svelte-5udk34">Shape Editor</h2>',d=$(),u=S("button"),u.innerHTML='<img src="icons/close-button.png" alt="X" class="svelte-5udk34"/>',h=$(),p=S("div"),f=S("div"),g=S("h3"),g.textContent="Selection Mode",b=$(),T=S("div"),x=S("div"),U=S("button"),E=S("img"),_=k("Turtle"),M=$(),C=S("button"),N=S("img"),F=k("Link"),R=$(),H=S("div"),j=S("button"),j.innerHTML='<img class="button-image-right svelte-5udk34" src="icons/create-new-icon.png" alt="create new"/>Create New',A=$(),X=S("div"),z=S("button"),Y=S("img"),G=k("Import From..."),K=$(),fe&&fe.c(),ee=$(),te=S("div"),ie=S("input"),oe=$(),le=S("div"),re=S("div");for(let e=0;e<ue.length;e+=1)ue[e].c();w(c,"class","shape-selector-header-logo svelte-5udk34"),w(u,"class","close-button svelte-5udk34"),w(r,"class","shape-selector-header svelte-5udk34"),w(g,"class","svelte-5udk34"),w(E,"class","button-image-left svelte-5udk34"),a(E.src,O="icons/turtle-icon.png")||w(E,"src","icons/turtle-icon.png"),w(E,"alt","turtle button"),w(U,"class",D="turtle-button "+("turtle"===e[5]?"selected-button":"unselected-button")+" svelte-5udk34"),w(N,"class","button-image-left svelte-5udk34"),a(N.src,B="icons/link-icon.png")||w(N,"src","icons/link-icon.png"),w(N,"alt","link button"),w(C,"class",P="link-button "+("link"===e[5]?"selected-button":"unselected-button")+" svelte-5udk34"),w(x,"class","mode-selector-buttons svelte-5udk34"),w(j,"class","create-new-button svelte-5udk34"),w(Y,"class","button-image-right svelte-5udk34"),a(Y.src,q="icons/import-icon.png")||w(Y,"src","icons/import-icon.png"),w(Y,"alt","import"),w(z,"class",J="import-shapes-button "+(e[10]?"clicked":"")+" svelte-5udk34"),w(X,"class","dropdown svelte-5udk34"),w(H,"class","shape-selector-buttons svelte-5udk34"),w(T,"class","selector-buttons svelte-5udk34"),w(f,"class","mode-selector svelte-5udk34"),ie.value=e[4],w(ie,"placeholder","Search"),L(ie,"background-image","url('icons/search-icon.png')"),w(ie,"class","svelte-5udk34"),w(te,"class","shape-selector-search svelte-5udk34"),w(re,"class","shape-selector-grid-inner svelte-5udk34"),w(le,"class","shape-selector-grid svelte-5udk34"),w(p,"class","inner-container svelte-5udk34"),w(l,"class","shape-selector svelte-5udk34"),w(n,"class","shape-selector-dialog svelte-5udk34"),L(n,"display",e[9]?"block":"none",1)},m(i,a){v(i,t,a),pe&&pe.m(t,null),m(t,s),m(t,n),m(n,l),m(l,r),m(r,c),m(r,d),m(r,u),e[16](r),m(l,h),m(l,p),m(p,f),m(f,g),m(f,b),m(f,T),m(T,x),m(x,U),m(U,E),m(U,_),m(x,M),m(x,C),m(C,N),m(C,F),m(T,R),m(T,H),m(H,j),m(H,A),m(H,X),m(X,z),m(z,Y),m(z,G),m(X,K),fe&&fe.m(X,null),m(p,ee),m(p,te),m(te,ie),m(p,oe),m(p,le),m(le,re);for(let e=0;e<ue.length;e+=1)ue[e]&&ue[e].m(re,null);e[29](re),e[30](n),ae=!0,ce||(de=[I(u,"click",e[15]),I(U,"click",e[17]),I(C,"click",e[18]),I(j,"click",(function(){o(e[0].createShape())&&e[0].createShape().apply(this,arguments)})),I(z,"click",(function(){o(e[0].importShapes())&&e[0].importShapes().apply(this,arguments)})),I(ie,"input",e[19])],ce=!0)},p(i,o){(e=i)[11]?pe?(pe.p(e,o),2048&o[0]&&W(pe,1)):(pe=Se(e),pe.c(),W(pe,1),pe.m(t,s)):pe&&(Q(),Z(pe,1,1,(()=>{pe=null})),V()),(!ae||32&o[0]&&D!==(D="turtle-button "+("turtle"===e[5]?"selected-button":"unselected-button")+" svelte-5udk34"))&&w(U,"class",D),(!ae||32&o[0]&&P!==(P="link-button "+("link"===e[5]?"selected-button":"unselected-button")+" svelte-5udk34"))&&w(C,"class",P),(!ae||1024&o[0]&&J!==(J="import-shapes-button "+(e[10]?"clicked":"")+" svelte-5udk34"))&&w(z,"class",J),e[10]?fe?(fe.p(e,o),1024&o[0]&&W(fe,1)):(fe=ke(e),fe.c(),W(fe,1),fe.m(X,null)):fe&&(Q(),Z(fe,1,1,(()=>{fe=null})),V()),(!ae||16&o[0]&&ie.value!==e[4])&&(ie.value=e[4]),449&o[0]&&(me=e[6],ue=ne(ue,o,ge,1,e,me,he,re,se,$e,null,ye)),(!ae||512&o[0])&&L(n,"display",e[9]?"block":"none",1)},i(e){if(!ae){W(pe),W(fe);for(let e=0;e<me.length;e+=1)W(ue[e]);ae=!0}},o(e){Z(pe),Z(fe),ae=!1},d(s){s&&y(t),pe&&pe.d(),e[16](null),fe&&fe.d();for(let e=0;e<ue.length;e+=1)ue[e].d();e[29](null),e[30](null),ce=!1,i(de)}}}function we(e,t,s){let n,i,o,l,r,a,c,d,u=[],h=null,p=[],f=!0,m=!1,g=!1;const b=he([]),v=he([]),y=he(null),S=he([]),k=he(!0),$=he(!1),I=he(!1);M((()=>{const e={onUpdateShapes:e=>{b.set(e)},onUpdateFilteredShapes:e=>{v.set(e)},onUpdateSelectedItemId:e=>{y.set(e)},onUpdateDialogOpen:e=>{k.set(e)},onUpdateImportButtonSelected:e=>{$.set(e)},onUpdateLibraryOpen:e=>{I.set(e)},onUpdateRecentlyImportedShapes:e=>{S.set(e)}};s(0,l=new ce(document.getElementById("Container"),e));let t=!1,o=[0,0];s(12,c=()=>{l.closeLibrary()}),s(13,d=e=>{l.addNewShapes(e)}),i.addEventListener("mousedown",(e=>{t=!0,o=[n.offsetLeft-e.clientX,n.offsetTop-e.clientY]}),!0),document.addEventListener("mouseup",(()=>{t=!1}),!0),document.addEventListener("mousemove",(e=>{e.preventDefault(),t&&(s(1,n.style.left=e.clientX+o[0]+"px",n),s(1,n.style.top=e.clientY+o[1]+"px",n))}),!0)})),b.subscribe((e=>{})),v.subscribe((e=>{s(6,u=e)})),y.subscribe((e=>{s(7,h=e)})),k.subscribe((e=>{s(9,f=e)})),$.subscribe((e=>{s(10,m=e)})),I.subscribe((e=>{s(11,g=e)})),S.subscribe((e=>{s(8,p=e)}));return e.$$.update=()=>{1&e.$$.dirty[0]&&l&&(s(4,r=l.searchTerm),s(5,a=l.currentType),s(6,u=l.filteredShapes),l.shapes,s(7,h=l.selectedItemId),s(8,p=l.recentlyImportedShapeIds),s(9,f=l.dialogOpen),s(10,m=l.importButtonSelected),s(11,g=l.libraryOpen))},[l,n,i,o,r,a,u,h,p,f,m,g,c,d,function(e,t){if(t){let t=e.offsetTop-o.offsetTop;(t<o.scrollTop||t>o.scrollTop+o.offsetHeight)&&s(3,o.scrollTop=t,o)}},()=>l.toggleDialog(),function(e){N[e?"unshift":"push"]((()=>{i=e,s(2,i)}))},()=>{s(5,a="turtle"),l.filterShapes("turtle")},()=>{s(5,a="link"),l.filterShapes("link")},e=>l.handleSearch(e.target.value),(e,t)=>{t.stopPropagation(),l.duplicateShape(e.id)},(e,t)=>{"Enter"===t.key&&(t.stopPropagation(),l.duplicateShape(e.id))},(e,t)=>{t.stopPropagation(),l.deleteShape(e.id)},(e,t)=>{"Enter"===t.key&&(t.stopPropagation(),l.deleteShape(e.id))},(e,t,n)=>s(6,t[n].hover=!0,u),(e,t,n)=>s(6,t[n].hover=!1,u),(e,t,n)=>s(6,t[n].hover=!0,u),(e,t,n)=>s(6,t[n].hover=!1,u),e=>l.setSelectedItemId(e.id),function(e){N[e?"unshift":"push"]((()=>{o=e,s(3,o)}))},function(e){N[e?"unshift":"push"]((()=>{n=e,s(1,n)}))}]}return new class extends ae{constructor(e){super(),re(this,e,we,Ie,l,{},null,[-1,-1])}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
