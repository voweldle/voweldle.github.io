(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[967],{8111:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return p}});var r=a(5893),l=a(7294),n=a(3727),s=a.n(n);a(4619);var o=JSON.parse('{"game":{"id":1,"dayOffset":1,"boardState":[],"currentRowIndex":0,"status":"NOT_STARTED","answer":"","lastPlayed":"","lastCompleted":"","lastGenerated":""},"settings":{"hardMode":false,"darkMode":false,"colorblindMode":false},"stats":{"currentStreak":1,"maxStreak":1,"guesses":{},"winPercentage":0,"gamesPlayed":0,"gamesWon":0,"averageGuesses":0,"isOnStreak":false,"hasPlayed":false},"timestamp":0,"schemaVersion":"0.0.1"}'),c=a(6377),i=a.n(c),u=a(9008),d=a.n(u),m=a(5680),g=a(8751);let h="vowel",f=e=>"AEIOU".includes(e);function p(e){let t=(0,l.useRef)(null),[a,n]=(0,l.useState)(!1),c=(0,l.useRef)(""),[u,p]=(0,l.useState)(!1),[w,x]=(0,l.useState)([]),[S,b]=(0,l.useState)([]),[y,v]=(0,l.useState)(0),[j,k]=(0,l.useState)(o),[E,N]=(0,l.useState)(!1),[D,I]=(0,l.useState)(""),[O,R]=(0,l.useState)(0),[C,T]=(0,l.useState)([]),_=(0,l.useRef)(null),[z,P]=(0,l.useState)("QWERTYUIOPASDFGHJKLZXCVBNM".split("").reduce((e,t)=>(e[t]=f(t)?h:"none",e),{})),A=(0,l.useRef)(!1),G=(e,t)=>{let a=[...e];for(let e=a.length;e<t.length;e++)if(f(t[e]))a.push(t[e]);else break;return a};(0,l.useEffect)(()=>{let t=async()=>{var t="";if("practice"===e.mode){let e=await fetch("/game_word_list.txt"),a=await e.text(),r=a.trim().split("\n"),l=Math.floor(Math.random()*r.length);t=r[l].toUpperCase()}else{let e=new Date("2023-06-01"),a=new Date,r=Math.floor((a.getTime()-e.getTime())/864e5),l=await fetch("/game_word_list.txt"),n=await l.text(),s=n.trim().split("\n"),o=((e,t)=>{let a=i()(t);for(let t=e.length-1;t>0;t--){let r=Math.floor(a()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e})(s.slice(),"voweldle"),c=r%s.length;t=o[c].toUpperCase()}I(t),R(t.length),A.current=!0,x(()=>(A.current=!1,G([],t))),k(e=>(e.game.boardState=[],e.game.answer=t,e.game.lastGenerated=new Date().toISOString(),e.game.status="IN_PROGRESS",e)),N(!0)};var a=localStorage.getItem("gameData");if(a&&"practice"!==e.mode){if(Date.parse(JSON.parse(a).game.lastGenerated)<new Date().setUTCHours(0,0,0,0))t();else{let e=JSON.parse(a);k(e);let t=e.game.answer;I(t);let r=e.game.boardState;b(Array(r.length).fill([])),v(r.length),r.map((e,a)=>B(e,a,t)),R(t.length),x(()=>(A.current=!1,G([],t))),N(!0)}}else t()},[]);let M=async e=>{let t=await fetch("/enable_word_list.txt"),a=await t.text(),r=a.split("\n"),l=r.map(e=>e.toLowerCase());return l.includes(e.toLowerCase())},U=e=>{"{enter}"===e?W("Enter"):"{backspaceSymbol}"===e?W("Backspace"):W(e)};function F(e,t){let a={...e};return t.forEach(e=>{f(e.letter)||("yellow"===a[e.letter]&&"green"===e.color?a[e.letter]="green":"none"!==a[e.letter]||(a[e.letter]=e.color))}),a}function V(e,t){let a={...e};return t.split("").forEach(e=>{a[e]="green"}),a}async function B(e,t,a){let r=e.split(""),l=J(r,e,a),n=M(e);await n?(b(e=>(e[t]=l,[...e])),P(e=>F(e,l)),l.every(e=>"green"===e.color)&&(p(!0),P(e=>V(e,a)))):b(e=>(e[t]=l.map(e=>({...e,color:"black"})),[...e]))}function J(e,t,a){return t===a?e.map(e=>({letter:e,color:"green"})):e.map((r,l)=>{if("AEIOU".includes(a[l]))return{letter:a[l],color:h};if(a[l]===r)return{letter:r,color:"green"};if(!a.includes(r))return{letter:r,color:"red"};{let n=a.split("").filter(e=>e===r).length,s=e.slice(0,l).filter(e=>e===r).length,o=a.split("").filter((e,a)=>e===r&&e===t[a]).length,c=a.split("").slice(0,l).filter((e,a)=>e===r&&e===t[a]).length;return s-c<n-o?{letter:r,color:"yellow"}:{letter:r,color:"red"}}})}(0,l.useEffect)(()=>{T(["green","red","yellow","none","vowel"].map(e=>({class:"key-".concat(e),buttons:Object.keys(z).filter(t=>z[t]===e).join(" ")})).filter(e=>""!==e.buttons))},[z]);let L=()=>{p(!1)};(0,l.useEffect)(()=>{E&&"practice"!==e.mode&&localStorage.setItem("gameData",JSON.stringify(j))},[j,E]),(0,l.useEffect)(()=>{_.current&&(_.current.scrollTop=_.current.scrollHeight)},[S]);let W=async e=>{if("WIN"!==j.game.status&&!A.current){if("Backspace"===e)A.current=!0,x(e=>{let t=D.slice(0,e.length).split(""),a=e.length-1-t.reverse().findIndex(e=>!f(e)),r=e.slice(0,a);return A.current=!1,G(r,D)});else if("Enter"===e){if(w.length===O){A.current=!0;let e=w.join(""),t=M(e);k(t=>({...t,game:{...t.game,boardState:[...t.game.boardState,e]}}));let a=J(w,e,D);v(e=>e+1),await t?(b(e=>[...e,a]),x(()=>(A.current=!1,G([],D))),P(e=>F(e,a)),a.every(e=>"green"===e.color)&&(k(e=>({...e,game:{...e.game,lastCompleted:new Date().toISOString(),lastPlayed:new Date().toISOString(),status:"WIN"}})),P(e=>V(e,D)),p(!0))):(b(e=>[...e,a.map(e=>({...e,color:"black"}))]),x(()=>(A.current=!1,G([],D))),k(e=>({...e,game:{...e.game,lastPlayed:new Date().toISOString(),status:"IN_PROGRESS"}}))),k(e=>({...e,game:{...e.game,currentRowIndex:S.length}}))}else c.current="Too few letters!",n(!0)}else w.length<O&&(A.current=!0,x(t=>(A.current=!1,G([...t,e],D))))}},Z=(0,l.useCallback)(e=>{let{key:t,metaKey:a}=e;if(/^[a-zA-Z]$/.test(t)&&!a){let e=t.toUpperCase();W(e)}else"Enter"===t?W("Enter"):"Backspace"===t&&W("Backspace")},[w]);(0,l.useEffect)(()=>(document.addEventListener("keydown",Z),()=>{document.removeEventListener("keydown",Z)}),[Z]);let H=e=>e.map(e=>e.map(e=>"green"===e.color?"\uD83D\uDFE9":"red"===e.color?"\uD83D\uDFE5":"yellow"===e.color?"\uD83D\uDFE8":"black"===e.color?"⬛":"⬜").join("")).join("\n"),K=async(e,t)=>{let a={title:"Voweldle",text:"Voweldle in ".concat(e," attempts.\n\n").concat(t,"\n"),url:"https://voweldle.github.io"};try{await navigator.share(a)}catch(e){if(console.error("Sharing failed",e),navigator.clipboard)try{await navigator.clipboard.writeText("".concat(a.text,"\n").concat(a.url)),c.current="Copied to the clipboard!",n(!0)}catch(e){console.error("Failed to copy text: ",e)}else console.log("Clipboard API not available")}};return(0,r.jsxs)("div",{children:[(0,r.jsxs)(d(),{children:[(0,r.jsx)("title",{children:"Voweldle"}),(0,r.jsx)("meta",{name:"keywords",content:"voweldle, word game, word puzzle, word search, word search game, word search puzzle, word puzzle game, word puzzle, word puzzle game, word"}),(0,r.jsx)("meta",{name:"description",content:"Voweldle is a word game where you have to guess the word by filling in the consonants. It is a fun and challenging word puzzle game."}),(0,r.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,r.jsxs)("div",{className:"game-container",children:[(0,r.jsxs)("div",{className:"box-container",ref:_,style:{marginTop:"5.5rem"},children:[S.map((e,t)=>(0,r.jsx)("div",{className:"row",children:e.map((e,t)=>(0,r.jsx)("div",{className:"box ".concat(e.color),children:" "===e.letter?"\xa0":e.letter},t))},t)),(0,r.jsx)("div",{className:"row",children:"IN_PROGRESS"===j.game.status?(0,r.jsx)("div",{children:D.split("").map((e,t)=>{let a=f(e),l=t<w.length,n=l?w[t]:a?e:"\xa0";return(0,r.jsx)("div",{className:"box ".concat(a?h:""),children:n},t)})}):null})]}),(0,r.jsx)("div",{className:"virtual-keyboard",children:(0,r.jsx)(s(),{keyboardRef:e=>t.current=e,layout:{default:["Q W E R T Y U I O P","A S D F G H J K L","{enter} Z X C V B N M {backspaceSymbol}"]},display:{"{enter}":"ENTER","{backspaceSymbol}":"⌫"},onKeyPress:U,buttonTheme:C})})]}),(0,r.jsxs)("div",{className:"dialog-box-wrapper",children:[(0,r.jsx)(function(e){let{message:t,timeout:s=3e3}=e;return(0,l.useEffect)(()=>{let e=setTimeout(()=>{n(!1)},s);return()=>clearTimeout(e)},[s]),a?(0,r.jsx)("div",{children:(0,r.jsx)(m.Z,{open:!0,footer:null,width:150,closable:!1,children:(0,r.jsx)("p",{style:{textAlign:"center"},children:t})})}):null},{message:c.current,timeout:1e3}),u&&(0,r.jsx)("div",{className:"modal-container",children:(0,r.jsx)(m.Z,{title:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("br",{}),(0,r.jsx)(g.Z,{style:{color:"#45a049;",marginRight:"8px"}}),"You Win! Attempts: ",(0,r.jsx)("span",{style:{color:"#45a049;"},children:y})]}),footer:null,open:!0,width:250,onCancel:L,style:{top:"30%"},children:(0,r.jsx)("div",{className:"share-button-parent",children:(0,r.jsx)("button",{className:"share-button",onClick:()=>K(y,H(S)),children:"Share"})})})})]})]})}},5042:function(){}}]);