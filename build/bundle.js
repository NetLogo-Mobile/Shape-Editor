var app=function(){"use strict";function e(){}const t=e=>e;function s(e){return e()}function n(){return Object.create(null)}function i(e){e.forEach(s)}function o(e){return"function"==typeof e}function l(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let a;function r(e,t){return a||(a=document.createElement("a")),a.href=t,e===a.href}const c="undefined"!=typeof window;let d=c?()=>window.performance.now():()=>Date.now(),h=c?e=>requestAnimationFrame(e):e;const p=new Set;function u(e){p.forEach((t=>{t.c(e)||(p.delete(t),t.f())})),0!==p.size&&h(u)}function f(e,t){e.appendChild(t)}function m(e){if(!e)return document;const t=e.getRootNode?e.getRootNode():e.ownerDocument;return t&&t.host?t:e.ownerDocument}function g(e){const t=y("style");return function(e,t){f(e.head||e,t),t.sheet}(m(e),t),t.sheet}function v(e,t,s){e.insertBefore(t,s||null)}function b(e){e.parentNode&&e.parentNode.removeChild(e)}function y(e){return document.createElement(e)}function S(e){return document.createTextNode(e)}function w(){return S(" ")}function $(e,t,s,n){return e.addEventListener(t,s,n),()=>e.removeEventListener(t,s,n)}function I(e,t,s){null==s?e.removeAttribute(t):e.getAttribute(t)!==s&&e.setAttribute(t,s)}function k(e,t){t=""+t,e.data!==t&&(e.data=t)}function T(e,t,s,n){null==s?e.style.removeProperty(t):e.style.setProperty(t,s,n?"important":"")}const L=new Map;let x,U=0;function E(e,t,s,n,i,o,l,a=0){const r=16.666/n;let c="{\n";for(let e=0;e<=1;e+=r){const n=t+(s-t)*o(e);c+=100*e+`%{${l(n,1-n)}}\n`}const d=c+`100% {${l(s,1-s)}}\n}`,h=`__svelte_${function(e){let t=5381,s=e.length;for(;s--;)t=(t<<5)-t^e.charCodeAt(s);return t>>>0}(d)}_${a}`,p=m(e),{stylesheet:u,rules:f}=L.get(p)||function(e,t){const s={stylesheet:g(t),rules:{}};return L.set(e,s),s}(p,e);f[h]||(f[h]=!0,u.insertRule(`@keyframes ${h} ${d}`,u.cssRules.length));const v=e.style.animation||"";return e.style.animation=`${v?`${v}, `:""}${h} ${n}ms linear ${i}ms 1 both`,U+=1,h}function O(e,t){const s=(e.style.animation||"").split(", "),n=s.filter(t?e=>e.indexOf(t)<0:e=>-1===e.indexOf("__svelte")),i=s.length-n.length;i&&(e.style.animation=n.join(", "),U-=i,U||h((()=>{U||(L.forEach((e=>{const{ownerNode:t}=e.stylesheet;t&&b(t)})),L.clear())})))}function _(e){x=e}function M(e){(function(){if(!x)throw new Error("Function called outside component initialization");return x})().$$.on_mount.push(e)}const C=[],N=[];let B=[];const F=[],D=Promise.resolve();let P=!1;function H(e){B.push(e)}const R=new Set;let j,A=0;function X(){if(0!==A)return;const e=x;do{try{for(;A<C.length;){const e=C[A];A++,_(e),z(e.$$)}}catch(e){throw C.length=0,A=0,e}for(_(null),C.length=0,A=0;N.length;)N.pop()();for(let e=0;e<B.length;e+=1){const t=B[e];R.has(t)||(R.add(t),t())}B.length=0}while(C.length);for(;F.length;)F.pop()();P=!1,R.clear(),_(e)}function z(e){if(null!==e.fragment){e.update(),i(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(H)}}function Y(e,t,s){e.dispatchEvent(function(e,t,{bubbles:s=!1,cancelable:n=!1}={}){const i=document.createEvent("CustomEvent");return i.initCustomEvent(e,s,n,t),i}(`${t?"intro":"outro"}${s}`))}const q=new Set;let G;function J(){G={r:0,c:[],p:G}}function K(){G.r||i(G.c),G=G.p}function Q(e,t){e&&e.i&&(q.delete(e),e.i(t))}function V(e,t,s,n){if(e&&e.o){if(q.has(e))return;q.add(e),G.c.push((()=>{q.delete(e),n&&(s&&e.d(1),n())})),e.o(t)}else n&&n()}const W={duration:0};function Z(s,n,l,a){const r={direction:"both"};let c=n(s,l,r),f=a?0:1,m=null,g=null,v=null;function b(){v&&O(s,v)}function y(e,t){const s=e.b-f;return t*=Math.abs(s),{a:f,b:e.b,d:s,duration:t,start:e.start,end:e.start+t,group:e.group}}function S(n){const{delay:o=0,duration:l=300,easing:a=t,tick:r=e,css:S}=c||W,w={start:d()+o,b:n};n||(w.group=G,G.r+=1),m||g?g=w:(S&&(b(),v=E(s,f,n,l,o,a,S)),n&&r(0,1),m=y(w,l),H((()=>Y(s,n,"start"))),function(e){let t;0===p.size&&h(u),new Promise((s=>{p.add(t={c:e,f:s})}))}((e=>{if(g&&e>g.start&&(m=y(g,l),g=null,Y(s,m.b,"start"),S&&(b(),v=E(s,f,m.b,m.duration,0,a,c.css))),m)if(e>=m.end)r(f=m.b,1-f),Y(s,m.b,"end"),g||(m.b?b():--m.group.r||i(m.group.c)),m=null;else if(e>=m.start){const t=e-m.start;f=m.a+m.d*a(t/m.duration),r(f,1-f)}return!(!m&&!g)})))}return{run(e){o(c)?(j||(j=Promise.resolve(),j.then((()=>{j=null}))),j).then((()=>{c=c(r),S(e)})):S(e)},end(){b(),m=g=null}}}function ee(e,t){e.d(1),t.delete(e.key)}function te(e,t){V(e,1,1,(()=>{t.delete(e.key)}))}function se(e,t,s,n,o,l,a,r,c,d,h,p){let u=e.length,f=l.length,m=u;const g={};for(;m--;)g[e[m].key]=m;const v=[],b=new Map,y=new Map,S=[];for(m=f;m--;){const e=p(o,l,m),i=s(e);let r=a.get(i);r?n&&S.push((()=>r.p(e,t))):(r=d(i,e),r.c()),b.set(i,v[m]=r),i in g&&y.set(i,Math.abs(m-g[i]))}const w=new Set,$=new Set;function I(e){Q(e,1),e.m(r,h),a.set(e.key,e),h=e.first,f--}for(;u&&f;){const t=v[f-1],s=e[u-1],n=t.key,i=s.key;t===s?(h=t.first,u--,f--):b.has(i)?!a.has(n)||w.has(n)?I(t):$.has(i)?u--:y.get(n)>y.get(i)?($.add(n),I(t)):(w.add(i),u--):(c(s,a),u--)}for(;u--;){const t=e[u];b.has(t.key)||c(t,a)}for(;f;)I(v[f-1]);return i(S),v}function ne(e,t,n,l){const{fragment:a,after_update:r}=e.$$;a&&a.m(t,n),l||H((()=>{const t=e.$$.on_mount.map(s).filter(o);e.$$.on_destroy?e.$$.on_destroy.push(...t):i(t),e.$$.on_mount=[]})),r.forEach(H)}function ie(e,t){const s=e.$$;null!==s.fragment&&(!function(e){const t=[],s=[];B.forEach((n=>-1===e.indexOf(n)?t.push(n):s.push(n))),s.forEach((e=>e())),B=t}(s.after_update),i(s.on_destroy),s.fragment&&s.fragment.d(t),s.on_destroy=s.fragment=null,s.ctx=[])}function oe(e,t){-1===e.$$.dirty[0]&&(C.push(e),P||(P=!0,D.then(X)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function le(t,s,o,l,a,r,c,d=[-1]){const h=x;_(t);const p=t.$$={fragment:null,ctx:[],props:r,update:e,not_equal:a,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(s.context||(h?h.$$.context:[])),callbacks:n(),dirty:d,skip_bound:!1,root:s.target||h.$$.root};c&&c(p.root);let u=!1;if(p.ctx=o?o(t,s.props||{},((e,s,...n)=>{const i=n.length?n[0]:s;return p.ctx&&a(p.ctx[e],p.ctx[e]=i)&&(!p.skip_bound&&p.bound[e]&&p.bound[e](i),u&&oe(t,e)),s})):[],p.update(),u=!0,i(p.before_update),p.fragment=!!l&&l(p.ctx),s.target){if(s.hydrate){const e=function(e){return Array.from(e.childNodes)}(s.target);p.fragment&&p.fragment.l(e),e.forEach(b)}else p.fragment&&p.fragment.c();s.intro&&Q(t.$$.fragment),ne(t,s.target,s.anchor,s.customElement),X()}_(h)}class ae{$destroy(){ie(this,1),this.$destroy=e}$on(t,s){if(!o(s))return e;const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(s),()=>{const e=n.indexOf(s);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}class re{constructor(e,t){this.shapes=[],this.filteredShapes=[],this.selectedItemId=null,this.recentlyImportedShapeId=null,this.parent=e,this.shapes=[{id:1,name:"default",image:"shapes/down-arrow.png",type:"turtle",hover:!1,deletable:!1},{id:2,name:"apple",image:"shapes/down-arrow.png",type:"turtle",hover:!1,deletable:!0},{id:3,name:"banana",image:"shapes/down-arrow.png",type:"turtle",hover:!1,deletable:!0},{id:4,name:"peach",image:"shapes/down-arrow.png",type:"turtle",hover:!1,deletable:!0},{id:5,name:"down-arrow",image:"shapes/down-arrow.png",type:"link",hover:!1,deletable:!0},{id:6,name:"down-arrow",image:"shapes/down-arrow.png",type:"link",hover:!1,deletable:!0}],this.searchTerm="",this.filteredShapes=this.shapes,this.currentType="turtle",this.config=t,this.filterShapes(this.currentType),this.dialogOpen=!0,this.importButtonSelected=!1,this.libraryOpen=!1}toggleDialog(){this.dialogOpen=!this.dialogOpen,this.config.onUpdateDialogOpen(this.dialogOpen)}openLibrary(){this.libraryOpen=!0,this.importButtonSelected=!1,this.config.onUpdateLibraryOpen(this.libraryOpen),this.config.onUpdateImportButtonSelected(this.importButtonSelected)}closeLibrary(){console.log("close library"),this.libraryOpen=!1,this.config.onUpdateLibraryOpen(this.libraryOpen)}createShape(){const e={id:Math.max(...this.shapes.map((e=>e.id)))+1,name:"new default",image:"shapes/down-arrow.png",type:this.currentType,hover:!1,deletable:!0};this.shapes.unshift(e),this.shapes=[...this.shapes],this.config.onUpdateShapes(this.shapes),this.filterShapes(this.currentType),this.config.onUpdateFilteredShapes(this.filteredShapes)}importShapes(){this.importButtonSelected=!this.importButtonSelected,this.config.onUpdateImportButtonSelected(this.importButtonSelected)}duplicateShape(e){const t=this.shapes.find((t=>t.id===e));if(t){const{name:s}=t,n=s.match(/^(.*?)(\s(\d+))?$/);if(n){const s=n[1],i=[];for(const e of this.shapes)if(0===e.name.indexOf(s)){const t=e.name.match(/^.*\s(\d+)$/);t&&i.push(Number(t[1]))}let o=-1;for(let t=0;t<this.shapes.length;t++)if(this.shapes[t].id===e){o=t;break}let l=o;if(i.length>=1){const e=Math.max(...i);for(let t=0;t<this.shapes.length;t++)if(this.shapes[t].name===`${s} ${e}`){l=t;break}}const a=`${s} ${i.length?Math.max(...i)+1:1}`,r=Object.assign(Object.assign({},t),{name:a,hover:!1,deletable:!0}),c=Math.max(...this.shapes.map((e=>e.id)))+1;r.id=c,this.shapes.splice(l+1,0,r),this.shapes=[...this.shapes],this.handleSearch(this.searchTerm),this.config.onUpdateShapes(this.shapes),this.config.onUpdateFilteredShapes(this.filteredShapes)}}}addNewShape(e){if(e.id=Math.max(...this.shapes.map((e=>e.id)))+1,e.type=this.currentType,e.hover=!1,e.deletable=!0,"default"===e.name)return e.deletable=!1,this.shapes.unshift(e),this.shapes=[...this.shapes],this.config.onUpdateShapes(this.shapes),this.filterShapes(this.currentType),this.selectedItemId=e.id,void this.config.onUpdateSelectedItemId(this.selectedItemId);let t=-1;for(let s=0;s<this.shapes.length;s++)if("default"!=this.shapes[s].name&&this.shapes[s].name>e.name){t=s;break}-1===t&&(t=this.shapes.length),this.shapes.splice(t,0,e),this.shapes=[...this.shapes],this.config.onUpdateShapes(this.shapes),this.selectedItemId=e.id,this.recentlyImportedShapeId=e.id,this.config.onUpdateRecentlyImportedShape(this.recentlyImportedShapeId),this.filterShapes(this.currentType)}deleteShape(e){let t=-1;for(let s=0;s<this.shapes.length;s++)if(this.shapes[s].id===e){t=s;break}-1!==t&&(this.shapes.splice(t,1),this.shapes=[...this.shapes],this.handleSearch(this.searchTerm),this.config.onUpdateShapes(this.shapes),this.config.onUpdateFilteredShapes(this.filteredShapes))}filterShapes(e){this.currentType=e,this.filteredShapes=[];for(let e=0;e<this.shapes.length;e++){const t=this.shapes[e];t.type===this.currentType&&-1!==t.name.toLowerCase().indexOf(this.searchTerm.toLowerCase())&&this.filteredShapes.push(t)}this.config.onUpdateFilteredShapes(this.filteredShapes)}handleSearch(e){this.searchTerm=e,this.filterShapes(this.currentType),this.config.onUpdateFilteredShapes(this.filteredShapes)}setSelectedItemId(e){this.selectedItemId===e?this.selectedItemId=null:this.selectedItemId=e,console.log(this.shapes.find((e=>e.id===this.selectedItemId))),this.recentlyImportedShapeId=null,this.config.onUpdateRecentlyImportedShape(this.recentlyImportedShapeId),this.config.onUpdateSelectedItemId(this.selectedItemId)}}class ce{constructor(e,t){this.shapes=[],this.filteredShapes=[],this.selectedItemId=null,this.parent=e,this.shapes=[{id:1,name:"default",image:"shapes/down-arrow.png",type:"turtle",hover:!1,deletable:!1},{id:2,name:"apple",image:"shapes/down-arrow.png",type:"turtle",hover:!1,deletable:!0},{id:3,name:"banana",image:"shapes/down-arrow.png",type:"turtle",hover:!1,deletable:!0},{id:4,name:"peach",image:"shapes/down-arrow.png",type:"turtle",hover:!1,deletable:!0},{id:5,name:"down-arrow",image:"shapes/down-arrow.png",type:"link",hover:!1,deletable:!0}],this.searchTerm="",this.filteredShapes=this.shapes,this.currentType="turtle",this.config=t,this.filterShapes(this.currentType),this.dialogOpen=!0}filterShapes(e){this.currentType=e,this.filteredShapes=[];for(let e=0;e<this.shapes.length;e++){const t=this.shapes[e];t.type===this.currentType&&-1!==t.name.toLowerCase().indexOf(this.searchTerm.toLowerCase())&&this.filteredShapes.push(t)}this.config.onUpdateFilteredShapes(this.filteredShapes)}handleSearch(e){this.searchTerm=e,this.filterShapes(this.currentType),this.config.onUpdateFilteredShapes(this.filteredShapes)}setSelectedItemId(e){this.selectedItemId===e?this.selectedItemId=null:this.selectedItemId=e,console.log(this.shapes.find((e=>e.id===this.selectedItemId))),this.config.onUpdateSelectedItemId(this.selectedItemId)}}const de=[];function he(t,s=e){let n;const i=new Set;function o(e){if(l(t,e)&&(t=e,n)){const e=!de.length;for(const e of i)e[1](),de.push(e,t);if(e){for(let e=0;e<de.length;e+=2)de[e][0](de[e+1]);de.length=0}}}return{set:o,update:function(e){o(e(t))},subscribe:function(l,a=e){const r=[l,a];return i.add(r),1===i.size&&(n=s(o)||e),l(t),()=>{i.delete(r),0===i.size&&n&&(n(),n=null)}}}}function pe(e,{delay:s=0,duration:n=400,easing:i=t}={}){const o=+getComputedStyle(e).opacity;return{delay:s,duration:n,easing:i,css:e=>"opacity: "+e*o}}function ue(e,t,s){const n=e.slice();return n[23]=t[s],n[24]=t,n[25]=s,n}function fe(e,t){let s,n,o,l,a,c,d,h,p,u,m,g,T,L=t[23].name+"";function x(){return t[11](t[23],t[24],t[25])}function U(){return t[12](t[23],t[24],t[25])}function E(){return t[13](t[23],t[24],t[25])}function O(){return t[14](t[23],t[24],t[25])}function _(){return t[15](t[23])}return{key:e,first:null,c(){s=y("button"),n=y("div"),o=y("div"),l=y("img"),c=w(),d=y("div"),h=S(L),u=w(),I(l,"class","shape-selector-item-image svelte-1nd47ae"),r(l.src,a=t[23].image)||I(l,"src",a),I(l,"alt",""),I(o,"class","shape-selector-item-image-div svelte-1nd47ae"),I(d,"class",p="shape-selector-item-name "+(t[23].id===t[8]?"font-selected":"")+" svelte-1nd47ae"),I(n,"class","shape-selector-details svelte-1nd47ae"),I(s,"class",m="shape-selector-item "+(t[23].id===t[8]?"selected":"")+" svelte-1nd47ae"),this.first=s},m(e,t){v(e,s,t),f(s,n),f(n,o),f(o,l),f(n,c),f(n,d),f(d,h),f(s,u),g||(T=[$(s,"mouseenter",x),$(s,"mouseleave",U),$(s,"focus",E),$(s,"blur",O),$(s,"click",_)],g=!0)},p(e,n){t=e,64&n&&!r(l.src,a=t[23].image)&&I(l,"src",a),64&n&&L!==(L=t[23].name+"")&&k(h,L),320&n&&p!==(p="shape-selector-item-name "+(t[23].id===t[8]?"font-selected":"")+" svelte-1nd47ae")&&I(d,"class",p),320&n&&m!==(m="shape-selector-item "+(t[23].id===t[8]?"selected":"")+" svelte-1nd47ae")&&I(s,"class",m)},d(e){e&&b(s),g=!1,i(T)}}}function me(e){let t,s,n,l,a,r,c,d,h,p,u,m,g,S,k,L,x,U,E,O,_,M,C,N=[],B=new Map,F=e[6];const D=e=>e[23].id;for(let t=0;t<F.length;t+=1){let s=ue(e,F,t),n=D(s);B.set(n,N[t]=fe(n,s))}return{c(){t=y("div"),s=y("div"),n=y("div"),l=y("h2"),l.textContent="Library",a=w(),r=y("button"),r.innerHTML='<img src="icons/close-button.png" alt="X" class="svelte-1nd47ae"/>',c=w(),d=y("div"),h=y("div"),p=y("input"),u=w(),m=y("div"),g=y("div");for(let e=0;e<N.length;e+=1)N[e].c();S=w(),k=y("div"),L=y("div"),x=y("button"),x.textContent="Import",U=w(),E=y("button"),E.textContent="Cancel",I(l,"class","svelte-1nd47ae"),I(r,"class","close-button svelte-1nd47ae"),I(n,"class","shape-selector-header svelte-1nd47ae"),p.value=e[5],I(p,"placeholder","Search"),T(p,"background-image","url('icons/search-icon.png')"),I(p,"class","svelte-1nd47ae"),I(h,"class","shape-selector-search svelte-1nd47ae"),I(g,"class","shape-selector-grid-inner svelte-1nd47ae"),I(m,"class","shape-selector-grid svelte-1nd47ae"),I(d,"class","inner-container svelte-1nd47ae"),I(x,"class","import-button svelte-1nd47ae"),I(E,"class","cancel-button svelte-1nd47ae"),I(L,"class","import-cancel-buttons svelte-1nd47ae"),I(k,"class","import-cancel-buttons-container svelte-1nd47ae"),I(s,"class","shape-selector-library svelte-1nd47ae"),I(t,"class","shape-selector-library-dialog svelte-1nd47ae")},m(i,b){v(i,t,b),f(t,s),f(s,n),f(n,l),f(n,a),f(n,r),e[9](n),f(s,c),f(s,d),f(d,h),f(h,p),f(d,u),f(d,m),f(m,g);for(let e=0;e<N.length;e+=1)N[e]&&N[e].m(g,null);f(s,S),f(s,k),f(k,L),f(L,x),f(L,U),f(L,E),e[17](t),_=!0,M||(C=[$(r,"click",(function(){o(e[0])&&e[0].apply(this,arguments)})),$(p,"input",e[10]),$(x,"click",e[16]),$(E,"click",(function(){o(e[0])&&e[0].apply(this,arguments)}))],M=!0)},p(t,[s]){e=t,(!_||32&s&&p.value!==e[5])&&(p.value=e[5]),324&s&&(F=e[6],N=se(N,s,D,1,e,F,B,g,ee,fe,null,ue))},i(e){_||(H((()=>{_&&(O||(O=Z(t,pe,{duration:500},!0)),O.run(1))})),_=!0)},o(e){O||(O=Z(t,pe,{duration:500},!1)),O.run(0),_=!1},d(s){s&&b(t),e[9](null);for(let e=0;e<N.length;e+=1)N[e].d();e[17](null),s&&O&&O.end(),M=!1,i(C)}}}function ge(e,t,s){let n,i,o,l,a=[],r=[],c=null,{closeLibrary:d}=t,{addNewShape:h}=t;const p=he([]),u=he([]),f=he(null),m=he(!1);M((()=>{const e={onUpdateShapes:e=>{p.set(e)},onUpdateFilteredShapes:e=>{u.set(e)},onUpdateSelectedItemId:e=>{f.set(e)},onUpdateImportButtonSelected:e=>{m.set(e)}};s(2,o=new ce(document.getElementById("Container"),e));let t=!1,l=[0,0];i.addEventListener("mousedown",(e=>{t=!0,l=[n.offsetLeft-e.clientX,n.offsetTop-e.clientY]}),!0),document.addEventListener("mouseup",(()=>{t=!1}),!0),document.addEventListener("mousemove",(e=>{e.preventDefault(),t&&(s(3,n.style.left=e.clientX+l[0]+"px",n),s(3,n.style.top=e.clientY+l[1]+"px",n))}),!0)})),p.subscribe((e=>{s(7,r=e)})),u.subscribe((e=>{s(6,a=e)})),f.subscribe((e=>{s(8,c=e)}));return e.$$set=e=>{"closeLibrary"in e&&s(0,d=e.closeLibrary),"addNewShape"in e&&s(1,h=e.addNewShape)},e.$$.update=()=>{4&e.$$.dirty&&o&&(s(5,l=o.searchTerm),o.currentType,s(6,a=o.filteredShapes),s(7,r=o.shapes),s(8,c=o.selectedItemId))},[d,h,o,n,i,l,a,r,c,function(e){N[e?"unshift":"push"]((()=>{i=e,s(4,i)}))},e=>o.handleSearch(e.target.value),(e,t,n)=>s(6,t[n].hover=!0,a),(e,t,n)=>s(6,t[n].hover=!1,a),(e,t,n)=>s(6,t[n].hover=!0,a),(e,t,n)=>s(6,t[n].hover=!1,a),e=>o.setSelectedItemId(e.id),()=>{c&&(h(r.find((e=>e.id===c))),d())},function(e){N[e?"unshift":"push"]((()=>{n=e,s(3,n)}))}]}class ve extends ae{constructor(e){super(),le(this,e,ge,me,l,{closeLibrary:0,addNewShape:1})}}function be(e,t,s){const n=e.slice();return n[39]=t[s],n[40]=t,n[41]=s,n}function ye(e){let t,s;return t=new ve({props:{closeLibrary:e[12],addNewShape:e[13]}}),{c(){var e;(e=t.$$.fragment)&&e.c()},m(e,n){ne(t,e,n),s=!0},p(e,s){const n={};4096&s[0]&&(n.closeLibrary=e[12]),8192&s[0]&&(n.addNewShape=e[13]),t.$set(n)},i(e){s||(Q(t.$$.fragment,e),s=!0)},o(e){V(t.$$.fragment,e),s=!1},d(e){ie(t,e)}}}function Se(e){let t,s,n,l,a,r,c,d;return{c(){t=y("div"),s=y("button"),s.innerHTML='<img class="button-image-left svelte-1fvds14" src="icons/library-icon.png" alt="library"/>Library',n=w(),l=y("button"),l.innerHTML='<img class="button-image-left svelte-1fvds14" src="icons/model-icon.png" alt="model"/>Model',I(s,"class","dropdown-button library-button svelte-1fvds14"),I(l,"class","dropdown-button model-button svelte-1fvds14"),I(t,"class","dropdown-content svelte-1fvds14")},m(i,a){v(i,t,a),f(t,s),f(t,n),f(t,l),r=!0,c||(d=[$(s,"click",(function(){o(e[0].openLibrary())&&e[0].openLibrary().apply(this,arguments)})),$(l,"click",console.log("model"))],c=!0)},p(t,s){e=t},i(e){r||(H((()=>{r&&(a||(a=Z(t,pe,{duration:500},!0)),a.run(1))})),r=!0)},o(e){a||(a=Z(t,pe,{duration:500},!1)),a.run(0),r=!1},d(e){e&&b(t),e&&a&&a.end(),c=!1,i(d)}}}function we(t,s){let n,l,a,c,d,h,p,u,m,g,L,x,U,E,O,_,M,C,N,B,F,D,P,R=s[39].name+"";function j(...e){return s[20](s[39],...e)}function A(...e){return s[21](s[39],...e)}function X(...e){return s[22](s[39],...e)}function z(...e){return s[23](s[39],...e)}function Y(){return s[24](s[39],s[40],s[41])}function q(){return s[25](s[39],s[40],s[41])}function G(){return s[26](s[39],s[40],s[41])}function J(){return s[27](s[39],s[40],s[41])}function K(){return s[28](s[39])}return{key:t,first:null,c(){n=y("button"),l=y("div"),a=y("button"),c=w(),d=y("button"),u=w(),m=y("div"),g=y("div"),L=y("img"),U=w(),E=y("div"),O=S(R),M=w(),I(a,"aria-label","Duplicate shape"),I(a,"class","duplicate-icon svelte-1fvds14"),T(a,"display",s[39].hover?"block":"none"),T(a,"background-image","url('icons/duplicate-icon.png')"),I(d,"aria-label","Delete shape"),I(d,"class",h="delete-icon "+(s[39].deletable?"":"button-disabled")+" svelte-1fvds14"),T(d,"display",s[39].hover?"block":"none"),T(d,"background-image","url('icons/delete-icon.png')"),d.disabled=p=!s[39].deletable,I(l,"class","shape-selector-item-buttons svelte-1fvds14"),I(L,"class","shape-selector-item-image svelte-1fvds14"),r(L.src,x=s[39].image)||I(L,"src",x),I(L,"alt",""),I(g,"class","shape-selector-item-image-div svelte-1fvds14"),I(E,"class",_="shape-selector-item-name "+(s[39].id===s[7]?"font-selected":"")+" svelte-1fvds14"),I(m,"class","shape-selector-details svelte-1fvds14"),I(n,"class",C="shape-selector-item "+(s[39].id===s[7]?"selected":"")+" "+(s[39].id===s[8]?"recently-imported":"")+" svelte-1fvds14"),this.first=n},m(t,i){var r;v(t,n,i),f(n,l),f(l,a),f(l,c),f(l,d),f(n,u),f(n,m),f(m,g),f(g,L),f(m,U),f(m,E),f(E,O),f(n,M),F=!0,D||(P=[$(a,"click",j),$(a,"keydown",A),$(d,"click",X),$(d,"keydown",z),(r=N=s[14].call(null,n,s[39].id===s[8]),r&&o(r.destroy)?r.destroy:e),$(n,"mouseenter",Y),$(n,"mouseleave",q),$(n,"focus",G),$(n,"blur",J),$(n,"click",K)],D=!0)},p(e,t){s=e,(!F||64&t[0])&&T(a,"display",s[39].hover?"block":"none"),(!F||64&t[0]&&h!==(h="delete-icon "+(s[39].deletable?"":"button-disabled")+" svelte-1fvds14"))&&I(d,"class",h),(!F||64&t[0])&&T(d,"display",s[39].hover?"block":"none"),(!F||64&t[0]&&p!==(p=!s[39].deletable))&&(d.disabled=p),(!F||64&t[0]&&!r(L.src,x=s[39].image))&&I(L,"src",x),(!F||64&t[0])&&R!==(R=s[39].name+"")&&k(O,R),(!F||192&t[0]&&_!==(_="shape-selector-item-name "+(s[39].id===s[7]?"font-selected":"")+" svelte-1fvds14"))&&I(E,"class",_),(!F||448&t[0]&&C!==(C="shape-selector-item "+(s[39].id===s[7]?"selected":"")+" "+(s[39].id===s[8]?"recently-imported":"")+" svelte-1fvds14"))&&I(n,"class",C),N&&o(N.update)&&320&t[0]&&N.update.call(null,s[39].id===s[8])},i(e){F||(H((()=>{F&&(B||(B=Z(n,pe,{duration:500},!0)),B.run(1))})),F=!0)},o(e){B||(B=Z(n,pe,{duration:500},!1)),B.run(0),F=!1},d(e){e&&b(n),e&&B&&B.end(),D=!1,i(P)}}}function $e(e){let t,s,n,l,a,c,d,h,p,u,m,g,k,L,x,U,E,O,_,M,C,N,B,F,D,P,H,R,j,A,X,z,Y,q,G,W,Z,ee,ne,ie,oe,le,ae,re,ce,de,he=[],pe=new Map,ue=e[11]&&ye(e),fe=e[10]&&Se(e),me=e[6];const ge=e=>e[39].id;for(let t=0;t<me.length;t+=1){let s=be(e,me,t),n=ge(s);pe.set(n,he[t]=we(n,s))}return{c(){t=y("div"),ue&&ue.c(),s=w(),n=y("div"),l=y("div"),a=y("div"),c=y("div"),c.innerHTML='<img src="icons/header-logo.png" alt="header logo" class="svelte-1fvds14"/> \n          <h2 class="svelte-1fvds14">Shape Editor</h2>',d=w(),h=y("button"),h.innerHTML='<img src="icons/close-button.png" alt="X" class="svelte-1fvds14"/>',p=w(),u=y("div"),m=y("div"),g=y("h3"),g.textContent="Selection Mode",k=w(),L=y("div"),x=y("div"),U=y("button"),E=y("img"),_=S("Turtle"),C=w(),N=y("button"),B=y("img"),D=S("Link"),H=w(),R=y("div"),j=y("button"),j.innerHTML='<img class="button-image-right svelte-1fvds14" src="icons/create-new-icon.png" alt="create new"/>Create New',A=w(),X=y("div"),z=y("button"),Y=y("img"),G=S("Import From..."),Z=w(),fe&&fe.c(),ee=w(),ne=y("div"),ie=y("input"),oe=w(),le=y("div"),ae=y("div");for(let e=0;e<he.length;e+=1)he[e].c();I(c,"class","shape-selector-header-logo svelte-1fvds14"),I(h,"class","close-button svelte-1fvds14"),I(a,"class","shape-selector-header svelte-1fvds14"),I(g,"class","svelte-1fvds14"),I(E,"class","button-image-left svelte-1fvds14"),r(E.src,O="icons/turtle-icon.png")||I(E,"src","icons/turtle-icon.png"),I(E,"alt","turtle button"),I(U,"class",M="turtle-button "+("turtle"===e[5]?"selected-button":"unselected-button")+" svelte-1fvds14"),I(B,"class","button-image-left svelte-1fvds14"),r(B.src,F="icons/link-icon.png")||I(B,"src","icons/link-icon.png"),I(B,"alt","link button"),I(N,"class",P="link-button "+("link"===e[5]?"selected-button":"unselected-button")+" svelte-1fvds14"),I(x,"class","mode-selector-buttons svelte-1fvds14"),I(j,"class","create-new-button svelte-1fvds14"),I(Y,"class","button-image-right svelte-1fvds14"),r(Y.src,q="icons/import-icon.png")||I(Y,"src","icons/import-icon.png"),I(Y,"alt","import"),I(z,"class",W="import-shapes-button "+(e[10]?"clicked":"")+" svelte-1fvds14"),I(X,"class","dropdown svelte-1fvds14"),I(R,"class","shape-selector-buttons svelte-1fvds14"),I(L,"class","selector-buttons svelte-1fvds14"),I(m,"class","mode-selector svelte-1fvds14"),ie.value=e[4],I(ie,"placeholder","Search"),T(ie,"background-image","url('icons/search-icon.png')"),I(ie,"class","svelte-1fvds14"),I(ne,"class","shape-selector-search svelte-1fvds14"),I(ae,"class","shape-selector-grid-inner svelte-1fvds14"),I(le,"class","shape-selector-grid svelte-1fvds14"),I(u,"class","inner-container svelte-1fvds14"),I(l,"class","shape-selector svelte-1fvds14"),I(n,"class","shape-selector-dialog svelte-1fvds14"),T(n,"display",e[9]?"block":"none",1)},m(i,r){v(i,t,r),ue&&ue.m(t,null),f(t,s),f(t,n),f(n,l),f(l,a),f(a,c),f(a,d),f(a,h),e[16](a),f(l,p),f(l,u),f(u,m),f(m,g),f(m,k),f(m,L),f(L,x),f(x,U),f(U,E),f(U,_),f(x,C),f(x,N),f(N,B),f(N,D),f(L,H),f(L,R),f(R,j),f(R,A),f(R,X),f(X,z),f(z,Y),f(z,G),f(X,Z),fe&&fe.m(X,null),f(u,ee),f(u,ne),f(ne,ie),f(u,oe),f(u,le),f(le,ae);for(let e=0;e<he.length;e+=1)he[e]&&he[e].m(ae,null);e[29](ae),e[30](n),re=!0,ce||(de=[$(h,"click",e[15]),$(U,"click",e[17]),$(N,"click",e[18]),$(j,"click",(function(){o(e[0].createShape())&&e[0].createShape().apply(this,arguments)})),$(z,"click",(function(){o(e[0].importShapes())&&e[0].importShapes().apply(this,arguments)})),$(ie,"input",e[19])],ce=!0)},p(i,o){(e=i)[11]?ue?(ue.p(e,o),2048&o[0]&&Q(ue,1)):(ue=ye(e),ue.c(),Q(ue,1),ue.m(t,s)):ue&&(J(),V(ue,1,1,(()=>{ue=null})),K()),(!re||32&o[0]&&M!==(M="turtle-button "+("turtle"===e[5]?"selected-button":"unselected-button")+" svelte-1fvds14"))&&I(U,"class",M),(!re||32&o[0]&&P!==(P="link-button "+("link"===e[5]?"selected-button":"unselected-button")+" svelte-1fvds14"))&&I(N,"class",P),(!re||1024&o[0]&&W!==(W="import-shapes-button "+(e[10]?"clicked":"")+" svelte-1fvds14"))&&I(z,"class",W),e[10]?fe?(fe.p(e,o),1024&o[0]&&Q(fe,1)):(fe=Se(e),fe.c(),Q(fe,1),fe.m(X,null)):fe&&(J(),V(fe,1,1,(()=>{fe=null})),K()),(!re||16&o[0]&&ie.value!==e[4])&&(ie.value=e[4]),449&o[0]&&(me=e[6],J(),he=se(he,o,ge,1,e,me,pe,ae,te,we,null,be),K()),(!re||512&o[0])&&T(n,"display",e[9]?"block":"none",1)},i(e){if(!re){Q(ue),Q(fe);for(let e=0;e<me.length;e+=1)Q(he[e]);re=!0}},o(e){V(ue),V(fe);for(let e=0;e<he.length;e+=1)V(he[e]);re=!1},d(s){s&&b(t),ue&&ue.d(),e[16](null),fe&&fe.d();for(let e=0;e<he.length;e+=1)he[e].d();e[29](null),e[30](null),ce=!1,i(de)}}}function Ie(e,t,s){let n,i,o,l,a,r,c,d,h=[],p=null,u=null,f=!0,m=!1,g=!1;const v=he([]),b=he([]),y=he(null),S=he(null),w=he(!0),$=he(!1),I=he(!1);M((()=>{const e={onUpdateShapes:e=>{v.set(e)},onUpdateFilteredShapes:e=>{b.set(e)},onUpdateSelectedItemId:e=>{y.set(e)},onUpdateDialogOpen:e=>{w.set(e)},onUpdateImportButtonSelected:e=>{$.set(e)},onUpdateLibraryOpen:e=>{I.set(e)},onUpdateRecentlyImportedShape:e=>{S.set(e)}};s(0,l=new re(document.getElementById("Container"),e));let t=!1,o=[0,0];s(12,c=()=>{l.closeLibrary()}),s(13,d=e=>{l.addNewShape(e)}),i.addEventListener("mousedown",(e=>{t=!0,o=[n.offsetLeft-e.clientX,n.offsetTop-e.clientY]}),!0),document.addEventListener("mouseup",(()=>{t=!1}),!0),document.addEventListener("mousemove",(e=>{e.preventDefault(),t&&(s(1,n.style.left=e.clientX+o[0]+"px",n),s(1,n.style.top=e.clientY+o[1]+"px",n))}),!0)})),v.subscribe((e=>{})),b.subscribe((e=>{s(6,h=e)})),y.subscribe((e=>{s(7,p=e)})),w.subscribe((e=>{s(9,f=e)})),$.subscribe((e=>{s(10,m=e)})),I.subscribe((e=>{s(11,g=e)})),S.subscribe((e=>{s(8,u=e)}));return e.$$.update=()=>{1&e.$$.dirty[0]&&l&&(s(4,a=l.searchTerm),s(5,r=l.currentType),s(6,h=l.filteredShapes),l.shapes,s(7,p=l.selectedItemId),s(8,u=l.recentlyImportedShapeId),s(9,f=l.dialogOpen),s(10,m=l.importButtonSelected),s(11,g=l.libraryOpen))},[l,n,i,o,a,r,h,p,u,f,m,g,c,d,function(e,t){if(t){let t=e.offsetTop-o.offsetTop;(t<o.scrollTop||t>o.scrollTop+o.offsetHeight)&&s(3,o.scrollTop=t,o)}},()=>l.toggleDialog(),function(e){N[e?"unshift":"push"]((()=>{i=e,s(2,i)}))},()=>{s(5,r="turtle"),l.filterShapes("turtle")},()=>{s(5,r="link"),l.filterShapes("link")},e=>l.handleSearch(e.target.value),(e,t)=>{t.stopPropagation(),l.duplicateShape(e.id)},(e,t)=>{"Enter"===t.key&&(t.stopPropagation(),l.duplicateShape(e.id))},(e,t)=>{t.stopPropagation(),l.deleteShape(e.id)},(e,t)=>{"Enter"===t.key&&(t.stopPropagation(),l.deleteShape(e.id))},(e,t,n)=>s(6,t[n].hover=!0,h),(e,t,n)=>s(6,t[n].hover=!1,h),(e,t,n)=>s(6,t[n].hover=!0,h),(e,t,n)=>s(6,t[n].hover=!1,h),e=>l.setSelectedItemId(e.id),function(e){N[e?"unshift":"push"]((()=>{o=e,s(3,o)}))},function(e){N[e?"unshift":"push"]((()=>{n=e,s(1,n)}))}]}return new class extends ae{constructor(e){super(),le(this,e,Ie,$e,l,{},null,[-1,-1])}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
