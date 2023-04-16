"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[439],{9439:function(e,t,a){a.r(t),a.d(t,{default:function(){return u}});var r=a(5893),l=a(7294),s=a(3727),n=a.n(s);a(4619);var c=JSON.parse('{"game":{"id":1,"dayOffset":1,"boardState":[],"currentRowIndex":0,"status":"NOT_STARTED","answer":"","lastPlayed":"","lastCompleted":"","lastGenerated":""},"settings":{"hardMode":false,"darkMode":false,"colorblindMode":false},"stats":{"currentStreak":1,"maxStreak":1,"guesses":{},"winPercentage":0,"gamesPlayed":0,"gamesWon":0,"averageGuesses":0,"isOnStreak":false,"hasPlayed":false},"timestamp":0,"schemaVersion":"0.0.1"}');let o="vowel",i=e=>"AEIOU".includes(e);function u(){let e=(0,l.useRef)(null),[t,a]=(0,l.useState)(!1),[s,u]=(0,l.useState)(!1),[d,m]=(0,l.useState)([]),[g,f]=(0,l.useState)([]),[h,p]=(0,l.useState)(0),[S,w]=(0,l.useState)(c),[b,x]=(0,l.useState)(!1),[y,N]=(0,l.useState)(""),[k,E]=(0,l.useState)(0),[v,j]=(0,l.useState)([]),O=(0,l.useRef)(null),[I,R]=(0,l.useState)("QWERTYUIOPASDFGHJKLZXCVBNM".split("").reduce((e,t)=>(e[t]=i(t)?o:"none",e),{})),C=(0,l.useRef)(!1),D=(e,t)=>{let a=[...e];for(let e=a.length;e<t.length;e++)if(i(t[e]))a.push(t[e]);else break;return a};(0,l.useEffect)(()=>{let e=async()=>{let e=await fetch("/game_word_list.txt"),t=await e.text(),a=t.split("\n"),r=Math.floor(Math.random()*a.length),l=a[r].toUpperCase();N(l),E(l.length),C.current=!0,m(()=>(C.current=!1,D([],l))),w(e=>(e.game.boardState=[],e.game.answer=l,e.game.lastGenerated=new Date().toISOString(),e.game.status="IN_PROGRESS",e)),x(!0)};var t=localStorage.getItem("gameData");if(t){let a=Date.parse(JSON.parse(t).game.lastGenerated);if(new Date().getTime(),a<new Date().setHours(0,0,0,0))e();else{let e=JSON.parse(t);w(e);let a=e.game.answer;N(a);let r=e.game.boardState;f(Array(r.length).fill([])),p(r.length),r.map((e,t)=>A(e,t,a)),E(a.length),m(()=>(C.current=!1,D([],a))),x(!0)}}else e()},[]);let P=async e=>{let t=await fetch("/enable_word_list.txt"),a=await t.text(),r=a.split("\n");console.log(r);let l=r.map(e=>e.toLowerCase());return l.includes(e.toLowerCase())},T=e=>{"{enter}"===e?J("Enter"):"{backspaceSymbol}"===e?J("Backspace"):J(e)};function _(e,t){let a={...e};return t.forEach(e=>{i(e.letter)||("yellow"===a[e.letter]&&"green"===e.color?a[e.letter]="green":"none"!==a[e.letter]||(a[e.letter]=e.color))}),a}function G(e,t){let a={...e};return t.split("").forEach(e=>{a[e]="green"}),a}async function A(e,t,a){let r=e.split(""),l=M(r,e,a),s=P(e);await s?(f(e=>(e[t]=l,[...e])),R(e=>_(e,l)),l.every(e=>"green"===e.color)&&(u(!0),R(e=>G(e,a)))):f(e=>(e[t]=l.map(e=>({...e,color:"black"})),[...e]))}function M(e,t,a){return t===a?e.map(e=>({letter:e,color:"green"})):e.map((r,l)=>{if("AEIOU".includes(a[l]))return{letter:a[l],color:o};if(a[l]===r)return{letter:r,color:"green"};if(!a.includes(r))return{letter:r,color:"red"};{let s=a.split("").filter(e=>e===r).length,n=e.slice(0,l).filter(e=>e===r).length,c=a.split("").filter((e,a)=>e===r&&e===t[a]).length,o=a.split("").slice(0,l).filter((e,a)=>e===r&&e===t[a]).length;return n-o<s-c?{letter:r,color:"yellow"}:{letter:r,color:"red"}}})}(0,l.useEffect)(()=>{j(["green","red","yellow","none","vowel"].map(e=>({class:"key-".concat(e),buttons:Object.keys(I).filter(t=>I[t]===e).join(" ")})).filter(e=>""!==e.buttons))},[I]);let B=()=>{u(!1)};(0,l.useEffect)(()=>{b&&localStorage.setItem("gameData",JSON.stringify(S))},[S,b]),(0,l.useEffect)(()=>{O.current&&(O.current.scrollTop=O.current.scrollHeight)},[g]);let J=async e=>{if("WIN"!==S.game.status&&!C.current){if("Backspace"===e)C.current=!0,m(e=>{let t=y.slice(0,e.length).split(""),a=e.length-1-t.reverse().findIndex(e=>!i(e)),r=e.slice(0,a);return C.current=!1,D(r,y)});else if("Enter"===e){if(d.length===k){C.current=!0;let e=d.join(""),t=P(e);w(t=>({...t,game:{...t.game,boardState:[...t.game.boardState,e]}}));let a=M(d,e,y);p(e=>e+1),await t?(f(e=>[...e,a]),m(()=>(C.current=!1,D([],y))),R(e=>_(e,a)),a.every(e=>"green"===e.color)&&(w(e=>({...e,game:{...e.game,lastCompleted:new Date().toISOString(),lastPlayed:new Date().toISOString(),status:"WIN"}})),R(e=>G(e,y)),u(!0))):(f(e=>[...e,a.map(e=>({...e,color:"black"}))]),m(()=>(C.current=!1,D([],y))),w(e=>({...e,game:{...e.game,lastPlayed:new Date().toISOString(),status:"IN_PROGRESS"}}))),w(e=>({...e,game:{...e.game,currentRowIndex:g.length}}))}else a(!0)}else d.length<k&&(C.current=!0,m(t=>(C.current=!1,D([...t,e],y))))}},L=(0,l.useCallback)(e=>{let{key:t}=e;if(/^[a-zA-Z]$/.test(t)){let e=t.toUpperCase();J(e)}else"Enter"===t?J("Enter"):"Backspace"===t&&J("Backspace")},[d]);return(0,l.useEffect)(()=>(document.addEventListener("keydown",L),()=>{document.removeEventListener("keydown",L)}),[L]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"keyboard-container",children:[(0,r.jsxs)("div",{className:"box-container",ref:O,children:[g.map((e,t)=>(0,r.jsx)("div",{className:"row",children:e.map((e,t)=>(0,r.jsx)("div",{className:"box ".concat(e.color),children:" "===e.letter?"\xa0":e.letter},t))},t)),(0,r.jsx)("div",{className:"row",children:"IN_PROGRESS"===S.game.status?(0,r.jsx)(r.Fragment,{children:y.split("").map((e,t)=>{let a=i(e),l=t<d.length,s=l?d[t]:a?e:"\xa0";return(0,r.jsx)("div",{className:"box ".concat(a?o:""),children:s},t)})}):null})]}),(0,r.jsx)("div",{className:"virtual-keyboard",children:(0,r.jsx)(n(),{keyboardRef:t=>e.current=t,layout:{default:["Q W E R T Y U I O P","A S D F G H J K L","{enter} Z X C V B N M {backspaceSymbol}"]},display:{"{enter}":"ENTER","{backspaceSymbol}":"⌫"},onKeyPress:T,buttonTheme:v})})]}),(0,r.jsxs)("div",{className:"dialog-box-wrapper",children:[(0,r.jsx)(function(e){let{message:s,timeout:n=3e3}=e;return(0,l.useEffect)(()=>{let e=setTimeout(()=>{a(!1)},n);return()=>clearTimeout(e)},[n]),t?(0,r.jsx)("div",{className:"dialog-box",children:(0,r.jsx)("div",{className:"message",children:s})}):null},{message:"Too few letters!",timeout:1e3}),s&&(0,r.jsx)("div",{className:"win-dialog-box",children:(0,r.jsxs)("div",{className:"message",children:[(0,r.jsx)("button",{className:"close-button",onClick:B,children:"✕"})," ",(0,r.jsxs)("p",{children:["You win! Attempts: ",h]})]})})]})]})}}}]);