(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[357],{5762:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/SimpleKeyboard",function(){return a(9439)}])},9439:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return d}});var s=a(5893),l=a(7294),n=a(3727),r=a.n(n);a(4619);var o=JSON.parse('{"game":{"id":1,"dayOffset":1,"boardState":[],"currentRowIndex":0,"status":"NOT_STARTED","answer":"","lastPlayed":"","lastCompleted":"","lastGenerated":""},"settings":{"hardMode":false,"darkMode":false,"colorblindMode":false},"stats":{"currentStreak":1,"maxStreak":1,"guesses":{},"winPercentage":0,"gamesPlayed":0,"gamesWon":0,"averageGuesses":0,"isOnStreak":false,"hasPlayed":false},"timestamp":0,"schemaVersion":"0.0.1"}');let i="vowel",c=e=>"AEIOU".includes(e);function d(){let e=(0,l.useRef)(null),[t,a]=(0,l.useState)("IN_PROGRESS"),[n,d]=(0,l.useState)(!1),[u,m]=(0,l.useState)(!1),[g,f]=(0,l.useState)([]),[p,h]=(0,l.useState)([]),[S,w]=(0,l.useState)(0),[x,N]=(0,l.useState)(o),[b,y]=(0,l.useState)(!1),[k,E]=(0,l.useState)(""),[v,I]=(0,l.useState)(0),O=(e,t)=>{let a=[...e];for(let e=a.length;e<t.length;e++)if(c(t[e]))a.push(t[e]);else break;return a};(0,l.useEffect)(()=>{let e=async()=>{let e=await fetch("/guess_words.txt"),t=await e.text(),a=t.split("\n"),s=Math.floor(Math.random()*a.length),l=a[s].toUpperCase();E(l),I(l.length),f(O([],l)),N(e=>(e.game.answer=l,e.game.lastGenerated=new Date().toISOString(),e)),y(!0)};var t=localStorage.getItem("gameData");if(t){let a=Date.parse(JSON.parse(t).game.lastGenerated);if(new Date().getTime(),a<new Date().setHours(0,0,0,0))e();else{let e=JSON.parse(t);N(e);let a=e.game.answer;E(a);let s=e.game.boardState;h(Array(s.length).fill([])),w(s.length),s.map((e,t)=>P(e,t,a)),I(a.length),f(O([],a)),y(!0)}}else e()},[]);let _=async e=>{let t=await fetch("/cleaned_word_list.txt"),a=await t.text(),s=a.split("\n"),l=s.map(e=>e.toLowerCase());return l.includes(e.toLowerCase())},j=e=>{"{enter}"===e?D("Enter"):"{backspaceSymbol}"===e?D("Backspace"):D(e)};async function P(e,t,s){let l=e.split(""),n=R(l,e,s),r=_(e);await r?(h(e=>(e[t]=n,[...e])),n.every(e=>"green"===e.color)&&(a("WIN"),m(!0))):h(e=>(e[t]=n.map(e=>({...e,color:"black"})),[...e]))}function R(e,t,a){return t===a?e.map(e=>({letter:e,color:"green"})):e.map((s,l)=>{if("AEIOU".includes(a[l]))return{letter:a[l],color:i};if(a[l]===s)return{letter:s,color:"green"};if(!a.includes(s))return{letter:s,color:"red"};{let n=a.split("").filter(e=>e===s).length,r=e.slice(0,l).filter(e=>e===s).length,o=a.split("").filter((e,a)=>e===s&&e===t[a]).length,i=a.split("").slice(0,l).filter((e,a)=>e===s&&e===t[a]).length;return r-i<n-o?{letter:s,color:"yellow"}:{letter:s,color:"red"}}})}let C=()=>{m(!1)};(0,l.useEffect)(()=>{b&&localStorage.setItem("gameData",JSON.stringify(x))},[x,b]);let D=async e=>{if("WIN"!==t){if("Backspace"===e)f(e=>{let t=k.slice(0,e.length).split(""),a=e.length-1-t.reverse().findIndex(e=>!c(e)),s=e.slice(0,a);return O(s,k)});else if("Enter"===e){if(g.length===v){let e=g.join(""),t=_(e);N(t=>({...t,game:{...t.game,boardState:[...t.game.boardState,e]}}));let s=R(g,e,k);w(e=>e+1),await t?(h(e=>[...e,s]),f(O([],k)),s.every(e=>"green"===e.color)&&(N(e=>({...e,game:{...e.game,lastCompleted:new Date().toISOString(),lastPlayed:new Date().toISOString(),status:"WIN"}})),a("WIN"),m(!0))):(h(e=>[...e,s.map(e=>({...e,color:"black"}))]),f(O([],k)),N(e=>({...e,game:{...e.game,lastPlayed:new Date().toISOString(),status:"IN_PROGRESS"}}))),N(e=>({...e,game:{...e.game,currentRowIndex:p.length}}))}else d(!0)}else g.length<v&&f(t=>O([...t,e],k))}},T=(0,l.useCallback)(e=>{let{key:t}=e;if(/^[a-zA-Z]$/.test(t)){let e=t.toUpperCase();D(e)}else"Enter"===t?D("Enter"):"Backspace"===t&&D("Backspace")},[g]);return(0,l.useEffect)(()=>(document.addEventListener("keydown",T),()=>{document.removeEventListener("keydown",T)}),[T]),(0,s.jsxs)("div",{className:"keyboard-container",children:[(0,s.jsxs)("div",{className:"box-container",children:[p.map((e,t)=>(0,s.jsx)("div",{className:"row",children:e.map((e,t)=>(0,s.jsx)("div",{className:"box ".concat(e.color),children:" "===e.letter?"\xa0":e.letter},t))},t)),(0,s.jsx)("div",{className:"row",children:"IN_PROGRESS"===t?(0,s.jsx)(s.Fragment,{children:k.split("").map((e,t)=>{let a=c(e),l=t<g.length,n=l?g[t]:a?e:"\xa0";return(0,s.jsx)("div",{className:"box ".concat(a?i:""),children:n},t)})}):null})]}),(0,s.jsx)("div",{className:"virtual-keyboard",children:(0,s.jsx)(r(),{keyboardRef:t=>e.current=t,layout:{default:["Q W E R T Y U I O P","A S D F G H J K L","{enter} Z X C V B N M {backspaceSymbol}"]},display:{"{enter}":"ENTER","{backspaceSymbol}":"⌫"},onKeyPress:j})}),(0,s.jsx)(function(e){let{message:t,timeout:a=3e3}=e;return(0,l.useEffect)(()=>{let e=setTimeout(()=>{d(!1)},a);return()=>clearTimeout(e)},[a]),n?(0,s.jsx)("div",{className:"dialog-box",children:(0,s.jsx)("div",{className:"message",children:t})}):null},{message:"Too few letters!",timeout:1e3}),u&&(0,s.jsx)("div",{className:"win-dialog-box",children:(0,s.jsxs)("div",{className:"message",children:[(0,s.jsx)("button",{className:"close-button",onClick:C,children:"✕"})," ",(0,s.jsxs)("p",{children:["You win! Attempts: ",S]})]})})]})}}},function(e){e.O(0,[120,774,888,179],function(){return e(e.s=5762)}),_N_E=e.O()}]);