(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return l(2603)}])},6801:function(e,t,l){"use strict";l.r(t),l.d(t,{default:function(){return f}});var s=l(5893),n=l(7294),r=l(3727),a=l.n(r);l(4619);let c="MOTORIST",o=c.length,i="vowel",u=e=>"AEIOU".includes(e),d=e=>{let t=[...e];for(let e=t.length;e<o;e++)if(u(c[e]))t.push(c[e]);else break;return t};function f(){let e=(0,n.useRef)(null),[t,l]=(0,n.useState)("IN_PROGRESS"),[r,f]=(0,n.useState)(!1),[m,p]=(0,n.useState)(!1),[h,x]=(0,n.useState)(d([])),[N,w]=(0,n.useState)([]),[b,g]=(0,n.useState)(0),k=async e=>{let t=await fetch("/cleaned_word_list.txt"),l=await t.text(),s=l.split("\n"),n=s.map(e=>e.toLowerCase());return n.includes(e.toLowerCase())},v=e=>{console.log("Button pressed",e),"{enter}"===e?j("Enter"):"{backspaceSymbol}"===e?j("Backspace"):j(e)},E=()=>{p(!1)},j=async e=>{if("WIN"!==t){if("Backspace"===e)x(h.slice(0,-1));else if("Enter"===e){if(h.length===o){let e=h.join(""),t=k(e),s=[];s=e===c?h.map(e=>({letter:e,color:"green"})):h.map((t,l)=>{if("AEIOU".includes(c[l]))return{letter:c[l],color:i};if(c[l]===t)return{letter:t,color:"green"};if(!c.includes(t))return{letter:t,color:"red"};{let s=c.split("").filter(e=>e===t).length,n=h.slice(0,l).filter(e=>e===t).length,r=c.split("").filter((l,s)=>l===t&&l===e[s]).length,a=c.split("").slice(0,l).filter((l,s)=>l===t&&l===e[s]).length;return n-a<s-r?{letter:t,color:"yellow"}:{letter:t,color:"red"}}}),g(b+1),await t?(w([...N,s]),x(d([])),s.every(e=>"green"===e.color)&&(l("WIN"),p(!0))):(w([...N,s.map(e=>({...e,color:"black"}))]),x(d([])))}else f(!0)}else h.length<o&&x(t=>d([...t,e]))}},_=(0,n.useCallback)(e=>{let{key:t}=e;if(/^[a-zA-Z]$/.test(t)){let e=t.toUpperCase();j(e)}else"Enter"===t?j("Enter"):"Backspace"===t&&j("Backspace")},[h]);return(0,n.useEffect)(()=>(document.addEventListener("keydown",_),()=>{document.removeEventListener("keydown",_)}),[_]),(0,s.jsxs)("div",{className:"keyboard-container",children:[(0,s.jsxs)("div",{className:"box-container",children:[N.map((e,t)=>(0,s.jsx)("div",{className:"row",children:e.map((e,t)=>(0,s.jsx)("div",{className:"box ".concat(e.color),children:" "===e.letter?"\xa0":e.letter},t))},t)),(0,s.jsx)("div",{className:"row",children:"IN_PROGRESS"===t?(0,s.jsx)(s.Fragment,{children:c.split("").map((e,t)=>{let l=u(e),n=t<h.length,r=n?h[t]:l?e:"\xa0";return console.log("content",r),console.log("isVowelInInitialWord",l),(0,s.jsx)("div",{className:"box ".concat(l?i:""),children:r},t)})}):null})]}),(0,s.jsx)("div",{className:"virtual-keyboard",children:(0,s.jsx)(a(),{keyboardRef:t=>e.current=t,layout:{default:["Q W E R T Y U I O P","A S D F G H J K L","{enter} Z X C V B N M {backspaceSymbol}"]},display:{"{enter}":"ENTER","{backspaceSymbol}":"⌫"},onKeyPress:v})}),(0,s.jsx)(function(e){let{message:t,timeout:l=3e3}=e;return(0,n.useEffect)(()=>{let e=setTimeout(()=>{f(!1)},l);return()=>clearTimeout(e)},[l]),r?(0,s.jsx)("div",{className:"dialog-box",children:(0,s.jsx)("div",{className:"message",children:t})}):null},{message:"Too few letters!",timeout:1e3}),m&&(0,s.jsx)("div",{className:"win-dialog-box",children:(0,s.jsxs)("div",{className:"message",children:[(0,s.jsx)("button",{className:"close-button",onClick:E,children:"✕"})," ",(0,s.jsxs)("p",{children:["You win! Attempts: ",b]})]})})]})}},2603:function(e,t,l){"use strict";l.r(t);var s=l(5893);l(7294);var n=l(6801);let r=()=>(0,s.jsx)(n.default,{});t.default=r}},function(e){e.O(0,[120,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);