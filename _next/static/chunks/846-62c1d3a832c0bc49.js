(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[846],{9439:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return m}});var r=a(5893),s=a(7294),l=a(3727),n=a.n(l);a(4619);var c=JSON.parse('{"game":{"id":1,"dayOffset":1,"boardState":[],"currentRowIndex":0,"status":"NOT_STARTED","answer":"","lastPlayed":"","lastCompleted":"","lastGenerated":""},"settings":{"hardMode":false,"darkMode":false,"colorblindMode":false},"stats":{"currentStreak":1,"maxStreak":1,"guesses":{},"winPercentage":0,"gamesPlayed":0,"gamesWon":0,"averageGuesses":0,"isOnStreak":false,"hasPlayed":false},"timestamp":0,"schemaVersion":"0.0.1"}'),i=a(6377),o=a.n(i);let u="vowel",d=e=>"AEIOU".includes(e);function m(e){let t=(0,s.useRef)(null),[a,l]=(0,s.useState)(!1),[i,m]=(0,s.useState)(!1),[g,f]=(0,s.useState)([]),[h,p]=(0,s.useState)([]),[x,S]=(0,s.useState)(0),[w,b]=(0,s.useState)(c),[j,v]=(0,s.useState)(!1),[y,N]=(0,s.useState)(""),[E,k]=(0,s.useState)(0),[O,I]=(0,s.useState)([]),R=(0,s.useRef)(null),[T,C]=(0,s.useState)("QWERTYUIOPASDFGHJKLZXCVBNM".split("").reduce((e,t)=>(e[t]=d(t)?u:"none",e),{})),D=(0,s.useRef)(!1),_=(e,t)=>{let a=[...e];for(let e=a.length;e<t.length;e++)if(d(t[e]))a.push(t[e]);else break;return a};(0,s.useEffect)(()=>{let t=async()=>{var t="";if("practice"===e.mode){let e=await fetch("/game_word_list.txt"),a=await e.text(),r=a.trim().split("\n"),s=Math.floor(Math.random()*r.length);t=r[s].toUpperCase()}else{let e=new Date("2023-04-01"),a=new Date,r=Math.floor((a.getTime()-e.getTime())/864e5),s=await fetch("/game_word_list.txt"),l=await s.text(),n=l.trim().split("\n"),c=((e,t)=>{let a=o()(t);for(let t=e.length-1;t>0;t--){let r=Math.floor(a()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e})(n.slice(),"voweldle"),i=r%n.length;t=c[i].toUpperCase()}N(t),k(t.length),D.current=!0,f(()=>(D.current=!1,_([],t))),b(e=>(e.game.boardState=[],e.game.answer=t,e.game.lastGenerated=new Date().toISOString(),e.game.status="IN_PROGRESS",e)),v(!0)};var a=localStorage.getItem("gameData");if(a&&"practice"!==e.mode){if(Date.parse(JSON.parse(a).game.lastGenerated)<new Date().setUTCHours(0,0,0,0))t();else{let e=JSON.parse(a);b(e);let t=e.game.answer;N(t);let r=e.game.boardState;p(Array(r.length).fill([])),S(r.length),r.map((e,a)=>L(e,a,t)),k(t.length),f(()=>(D.current=!1,_([],t))),v(!0)}}else t()},[]);let P=async e=>{let t=await fetch("/enable_word_list.txt"),a=await t.text(),r=a.split("\n"),s=r.map(e=>e.toLowerCase());return s.includes(e.toLowerCase())},G=e=>{"{enter}"===e?B("Enter"):"{backspaceSymbol}"===e?B("Backspace"):B(e)};function M(e,t){let a={...e};return t.forEach(e=>{d(e.letter)||("yellow"===a[e.letter]&&"green"===e.color?a[e.letter]="green":"none"!==a[e.letter]||(a[e.letter]=e.color))}),a}function A(e,t){let a={...e};return t.split("").forEach(e=>{a[e]="green"}),a}async function L(e,t,a){let r=e.split(""),s=U(r,e,a),l=P(e);await l?(p(e=>(e[t]=s,[...e])),C(e=>M(e,s)),s.every(e=>"green"===e.color)&&(m(!0),C(e=>A(e,a)))):p(e=>(e[t]=s.map(e=>({...e,color:"black"})),[...e]))}function U(e,t,a){return t===a?e.map(e=>({letter:e,color:"green"})):e.map((r,s)=>{if("AEIOU".includes(a[s]))return{letter:a[s],color:u};if(a[s]===r)return{letter:r,color:"green"};if(!a.includes(r))return{letter:r,color:"red"};{let l=a.split("").filter(e=>e===r).length,n=e.slice(0,s).filter(e=>e===r).length,c=a.split("").filter((e,a)=>e===r&&e===t[a]).length,i=a.split("").slice(0,s).filter((e,a)=>e===r&&e===t[a]).length;return n-i<l-c?{letter:r,color:"yellow"}:{letter:r,color:"red"}}})}(0,s.useEffect)(()=>{I(["green","red","yellow","none","vowel"].map(e=>({class:"key-".concat(e),buttons:Object.keys(T).filter(t=>T[t]===e).join(" ")})).filter(e=>""!==e.buttons))},[T]);let W=()=>{m(!1)};(0,s.useEffect)(()=>{j&&"practice"!==e.mode&&localStorage.setItem("gameData",JSON.stringify(w))},[w,j]),(0,s.useEffect)(()=>{R.current&&(R.current.scrollTop=R.current.scrollHeight)},[h]);let B=async e=>{if("WIN"!==w.game.status&&!D.current){if("Backspace"===e)D.current=!0,f(e=>{let t=y.slice(0,e.length).split(""),a=e.length-1-t.reverse().findIndex(e=>!d(e)),r=e.slice(0,a);return D.current=!1,_(r,y)});else if("Enter"===e){if(g.length===E){D.current=!0;let e=g.join(""),t=P(e);b(t=>({...t,game:{...t.game,boardState:[...t.game.boardState,e]}}));let a=U(g,e,y);S(e=>e+1),await t?(p(e=>[...e,a]),f(()=>(D.current=!1,_([],y))),C(e=>M(e,a)),a.every(e=>"green"===e.color)&&(b(e=>({...e,game:{...e.game,lastCompleted:new Date().toISOString(),lastPlayed:new Date().toISOString(),status:"WIN"}})),C(e=>A(e,y)),m(!0))):(p(e=>[...e,a.map(e=>({...e,color:"black"}))]),f(()=>(D.current=!1,_([],y))),b(e=>({...e,game:{...e.game,lastPlayed:new Date().toISOString(),status:"IN_PROGRESS"}}))),b(e=>({...e,game:{...e.game,currentRowIndex:h.length}}))}else l(!0)}else g.length<E&&(D.current=!0,f(t=>(D.current=!1,_([...t,e],y))))}},J=(0,s.useCallback)(e=>{let{key:t,metaKey:a}=e;if(/^[a-zA-Z]$/.test(t)&&!a){let e=t.toUpperCase();B(e)}else"Enter"===t?B("Enter"):"Backspace"===t&&B("Backspace")},[g]);return(0,s.useEffect)(()=>(document.addEventListener("keydown",J),()=>{document.removeEventListener("keydown",J)}),[J]),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"top-bar",children:(0,r.jsxs)("h1",{children:[(0,r.jsx)("span",{children:"V"}),(0,r.jsx)("span",{children:"O"}),(0,r.jsx)("span",{children:"W"}),(0,r.jsx)("span",{children:"E"}),(0,r.jsx)("span",{children:"L"}),(0,r.jsx)("span",{children:"D"}),(0,r.jsx)("span",{children:"L"}),(0,r.jsx)("span",{children:"E"})]})}),(0,r.jsxs)("div",{className:"game-container",children:[(0,r.jsxs)("div",{className:"box-container",ref:R,style:{marginTop:"5.5rem"},children:[h.map((e,t)=>(0,r.jsx)("div",{className:"row",children:e.map((e,t)=>(0,r.jsx)("div",{className:"box ".concat(e.color),children:" "===e.letter?"\xa0":e.letter},t))},t)),(0,r.jsx)("div",{className:"row",children:"IN_PROGRESS"===w.game.status?(0,r.jsx)("div",{children:y.split("").map((e,t)=>{let a=d(e),s=t<g.length,l=s?g[t]:a?e:"\xa0";return(0,r.jsx)("div",{className:"box ".concat(a?u:""),children:l},t)})}):null})]}),(0,r.jsx)("div",{className:"virtual-keyboard",children:(0,r.jsx)(n(),{keyboardRef:e=>t.current=e,layout:{default:["Q W E R T Y U I O P","A S D F G H J K L","{enter} Z X C V B N M {backspaceSymbol}"]},display:{"{enter}":"ENTER","{backspaceSymbol}":"⌫"},onKeyPress:G,buttonTheme:O})})]}),(0,r.jsxs)("div",{className:"dialog-box-wrapper",children:[(0,r.jsx)(function(e){let{message:t,timeout:n=3e3}=e;return(0,s.useEffect)(()=>{let e=setTimeout(()=>{l(!1)},n);return()=>clearTimeout(e)},[n]),a?(0,r.jsx)("div",{className:"dialog-box",children:(0,r.jsx)("div",{className:"message",children:t})}):null},{message:"Too few letters!",timeout:1e3}),i&&(0,r.jsx)("div",{className:"win-dialog-box",children:(0,r.jsxs)("div",{className:"message",children:[(0,r.jsx)("button",{className:"close-button",onClick:W,children:"✕"})," ",(0,r.jsxs)("p",{children:["You Win! Attempts: ",x]})]})})]})]})}},5042:function(){}}]);