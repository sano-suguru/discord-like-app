import{R as l,d,j as e,b as r,T as i,B as m,L as c,c as h}from"./index-q1dgXiPT.js";import{H as n}from"./chunk-7OLJDQMT-Dh6BHxHF.js";import{S as p}from"./chunk-NEK3OOAM-BwNL4zM5.js";import{V as t}from"./chunk-NTCQBYKE-CdmoLKEz.js";const x=[{id:1,text:"New message in #general"},{id:2,text:"Friend request from User123"},{id:3,text:"Mentioned in #random"}],g=[{id:"general",name:"General"},{id:"random",name:"Random"},{id:"help",name:"Help"}],j=l.memo(()=>{const o=d("gray.100","gray.700"),a=d("white","gray.600");return e.jsx(r,{bg:o,minH:"100vh",p:8,children:e.jsxs(t,{spacing:8,align:"stretch",children:[e.jsx(n,{children:"Welcome to Discord-like App"}),e.jsxs(p,{columns:{base:1,md:2},spacing:8,children:[e.jsxs(r,{bg:a,p:6,borderRadius:"md",shadow:"md",children:[e.jsx(n,{size:"md",mb:4,children:"Recent Activity"}),e.jsx(t,{align:"stretch",spacing:2,children:x.map(s=>e.jsx(i,{children:s.text},s.id))})]}),e.jsxs(r,{bg:a,p:6,borderRadius:"md",shadow:"md",children:[e.jsx(n,{size:"md",mb:4,children:"Popular Channels"}),e.jsx(t,{align:"stretch",spacing:2,children:g.map(s=>e.jsxs(m,{as:c,to:`${h}chat/${s.id}`,variant:"ghost",justifyContent:"left",children:["# ",s.name]},s.id))})]})]}),e.jsxs(r,{bg:a,p:6,borderRadius:"md",shadow:"md",children:[e.jsx(n,{size:"md",mb:4,children:"Getting Started"}),e.jsx(i,{mb:4,children:"Welcome to our Discord-like app! Here are some tips to get you started:"}),e.jsxs(t,{align:"stretch",spacing:2,children:[e.jsx(i,{children:"1. Join a channel from the sidebar or popular channels list"}),e.jsx(i,{children:"2. Send messages and interact with other users"}),e.jsx(i,{children:"3. Customize your profile in the settings"})]})]})]})})});j.displayName="Home";export{j as Home};
