var Re=e=>{throw TypeError(e)};var ae=(e,t,s)=>t.has(e)||Re("Cannot "+s);var a=(e,t,s)=>(ae(e,t,"read from private field"),s?s.call(e):t.get(e)),E=(e,t,s)=>t.has(e)?Re("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),g=(e,t,s,r)=>(ae(e,t,"write to private field"),r?r.call(e,s):t.set(e,s),s),j=(e,t,s)=>(ae(e,t,"access private method"),s);import{M as et,N as tt,r as y,O as st,s as rt,j as i,g as N,f as ye,t as at,q as xe,e as ee,l as it,n as nt,p as Te,Q as ot,U as lt,y as Ne,V as Pe,W as ct,X as Qe,E as De,Y as ut,Z as ht,$ as F,a0 as le,a1 as Y,a2 as dt,a3 as Ee,a4 as Oe,a5 as ft,a6 as mt,a7 as pt,a8 as Ie,a9 as Me,aa as Be,b as te,T as J,B as bt}from"./index-CtcFTY0g.js";import{s as vt,d as Ce,u as gt,c as yt,a as ie,b as xt,o as Ct,F as ne}from"./delay-BMHq5jaK.js";import{a as We,u as jt,F as G,b as X,I as oe,C as St}from"./userStore-C_NTiAIu.js";import{u as kt,T as Rt}from"./chunk-4IH3O7BJ-CvZKwETT.js";import{V as je}from"./chunk-NTCQBYKE-DvrqvTdJ.js";import{H as we}from"./chunk-7OLJDQMT-BYZOR64y.js";function Et(e){const{theme:t}=et(),s=tt();return y.useMemo(()=>st(t.direction,{...s,...e}),[e,t.direction,s])}var[Ot,It]=rt({name:"AvatarStylesContext",hookName:"useAvatarStyles",providerName:"<Avatar/>"});function wt(e){var t;const s=e.split(" "),r=(t=s[0])!=null?t:"",n=s.length>1?s[s.length-1]:"";return r&&n?`${r.charAt(0)}${n.charAt(0)}`:r.charAt(0)}function Ve(e){const{name:t,getInitials:s,...r}=e,n=It();return i.jsx(N.div,{role:"img","aria-label":t,...r,__css:n.label,children:t?s==null?void 0:s(t):null})}Ve.displayName="AvatarName";var ze=e=>i.jsxs(N.svg,{viewBox:"0 0 128 128",color:"#fff",width:"100%",height:"100%",className:"chakra-avatar__svg",...e,children:[i.jsx("path",{fill:"currentColor",d:"M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"}),i.jsx("path",{fill:"currentColor",d:"M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"})]});function $e(e){const{src:t,srcSet:s,onError:r,onLoad:n,getInitials:o,name:l,borderRadius:c,loading:b,iconLabel:h,icon:v=i.jsx(ze,{}),ignoreFallback:u,referrerPolicy:d,crossOrigin:m}=e,R=kt({src:t,onError:r,crossOrigin:m,ignoreFallback:u})==="loaded";return!t||!R?l?i.jsx(Ve,{className:"chakra-avatar__initials",getInitials:o,name:l}):y.cloneElement(v,{role:"img","aria-label":h}):i.jsx(N.img,{src:t,srcSet:s,alt:l,onLoad:n,referrerPolicy:d,crossOrigin:m??void 0,className:"chakra-avatar__img",loading:b,__css:{width:"100%",height:"100%",objectFit:"cover",borderRadius:c}})}$e.displayName="AvatarImage";var _t={display:"inline-flex",alignItems:"center",justifyContent:"center",textAlign:"center",textTransform:"uppercase",fontWeight:"medium",position:"relative",flexShrink:0},He=ye((e,t)=>{const s=at("Avatar",e),[r,n]=y.useState(!1),{src:o,srcSet:l,name:c,showBorder:b,borderRadius:h="full",onError:v,onLoad:u,getInitials:d=wt,icon:m=i.jsx(ze,{}),iconLabel:C=" avatar",loading:R,children:x,borderColor:I,ignoreFallback:k,crossOrigin:S,referrerPolicy:U,...A}=xe(e),se={borderRadius:h,borderWidth:b?"2px":void 0,..._t,...s.container};return I&&(se.borderColor=I),i.jsx(N.span,{ref:t,...A,className:ee("chakra-avatar",e.className),"data-loaded":it(r),__css:se,children:i.jsxs(Ot,{value:s,children:[i.jsx($e,{src:o,srcSet:l,loading:R,onLoad:nt(u,()=>{n(!0)}),onError:v,getInitials:d,name:c,borderRadius:h,icon:m,iconLabel:C,ignoreFallback:k,crossOrigin:S,referrerPolicy:U}),x]})})});He.displayName="Avatar";var Ke=ye(function(t,s){const{borderLeftWidth:r,borderBottomWidth:n,borderTopWidth:o,borderRightWidth:l,borderWidth:c,borderStyle:b,borderColor:h,...v}=Te("Divider",t),{className:u,orientation:d="horizontal",__css:m,...C}=xe(t),R={vertical:{borderLeftWidth:r||l||c||"1px",height:"100%"},horizontal:{borderBottomWidth:n||o||c||"1px",width:"100%"}};return i.jsx(N.hr,{ref:s,"aria-orientation":d,...C,__css:{...v,border:"0",borderColor:h,borderStyle:b,...R[d],...m},className:ee("chakra-divider",u)})});Ke.displayName="Divider";function Lt(e,t={}){const{ssr:s=!0,fallback:r}=t,{getWindow:n}=ot(),o=Array.isArray(e)?e:[e];let l=Array.isArray(r)?r:[r];l=l.filter(h=>h!=null);const[c,b]=y.useState(()=>o.map((h,v)=>({media:h,matches:s?!!l[v]:n().matchMedia(h).matches})));return y.useEffect(()=>{const h=n();b(o.map(d=>({media:d,matches:h.matchMedia(d).matches})));const v=o.map(d=>h.matchMedia(d)),u=d=>{b(m=>m.slice().map(C=>C.media===d.media?{...C,matches:d.matches}:C))};return v.forEach(d=>{typeof d.addListener=="function"?d.addListener(u):d.addEventListener("change",u)}),()=>{v.forEach(d=>{typeof d.removeListener=="function"?d.removeListener(u):d.removeEventListener("change",u)})}},[n]),c.map(h=>h.matches)}function Ft(e,t,s=lt){let r=Object.keys(e).indexOf(t);if(r!==-1)return e[t];let n=s.indexOf(t);for(;n>=0;){const o=s[n];if(e.hasOwnProperty(o)){r=n;break}n-=1}if(r!==-1){const o=s[r];return e[o]}}function Ut(e){var t,s;const r=Pe(e)?e:{fallback:e??"base"},o=Ne().__breakpoints.details.map(({minMaxQuery:h,breakpoint:v})=>({breakpoint:v,query:h.replace("@media screen and ","")})),l=o.map(h=>h.breakpoint===r.fallback),b=Lt(o.map(h=>h.query),{fallback:l,ssr:r.ssr}).findIndex(h=>h==!0);return(s=(t=o[b])==null?void 0:t.breakpoint)!=null?s:r.fallback}function At(e,t){var s;const r=Pe(t)?t:{fallback:"base"},n=Ut(r),o=Ne();if(!n)return;const l=Array.from(((s=o.__breakpoints)==null?void 0:s.keys)||[]),c=Array.isArray(e)?Object.fromEntries(Object.entries(ct(e,l)).map(([b,h])=>[b,h])):e;return Ft(c,n,l)}function Tt(){const e=y.useRef(!0);return y.useEffect(()=>{e.current=!1},[]),e.current}function Nt(e){const t=y.useRef();return y.useEffect(()=>{t.current=e},[e]),t.current}var Pt=N("div",{baseStyle:{boxShadow:"none",backgroundClip:"padding-box",cursor:"default",color:"transparent",pointerEvents:"none",userSelect:"none","&::before, &::after, *":{visibility:"hidden"}}}),ce=Qe("skeleton-start-color"),ue=Qe("skeleton-end-color"),Qt=De({from:{opacity:0},to:{opacity:1}}),Dt=De({from:{borderColor:ce.reference,background:ce.reference},to:{borderColor:ue.reference,background:ue.reference}}),P=ye((e,t)=>{const s={...e,fadeDuration:typeof e.fadeDuration=="number"?e.fadeDuration:.4,speed:typeof e.speed=="number"?e.speed:.8},r=Te("Skeleton",s),n=Tt(),{startColor:o="",endColor:l="",isLoaded:c,fadeDuration:b,speed:h,className:v,fitContent:u,...d}=xe(s),[m,C]=ut("colors",[o,l]),R=Nt(c),x=ee("chakra-skeleton",v),I={...m&&{[ce.variable]:m},...C&&{[ue.variable]:C}};if(c){const k=n||R?"none":`${Qt} ${b}s`;return i.jsx(N.div,{ref:t,className:x,__css:{animation:k},...d})}return i.jsx(Pt,{ref:t,className:x,...d,__css:{width:u?"fit-content":void 0,...r,...I,_dark:{...r._dark,...I},animation:`${h}s linear infinite alternate ${Dt}`}})});P.displayName="Skeleton";var qe=({size:e="2rem",...t})=>i.jsx(P,{borderRadius:"full",boxSize:e,...t});qe.displayName="SkeletonCircle";function Mt(e){return Array(e).fill(1).map((t,s)=>s+1)}var _e=3,Ze=e=>{const{noOfLines:t=_e,spacing:s="0.5rem",skeletonHeight:r="0.5rem",className:n,startColor:o,endColor:l,isLoaded:c,fadeDuration:b,speed:h,variant:v,size:u,colorScheme:d,children:m,...C}=e,R=At(typeof t=="number"?[t]:t)||_e,x=Mt(R),I=S=>R>1&&S===x.length?"80%":"100%",k=ee("chakra-skeleton__group",n);return i.jsx(N.div,{className:k,...C,children:x.map((S,U)=>{if(c&&U>0)return null;const A=c?null:{mb:S===x.length?"0":s,width:I(S),height:r};return i.jsx(P,{startColor:o,endColor:l,isLoaded:c,fadeDuration:b,speed:h,variant:v,size:u,colorScheme:d,...A,children:U===0?m:void 0},x.length.toString()+S)})})};Ze.displayName="SkeletonText";var w,f,q,O,Q,V,L,Z,z,$,D,M,T,H,p,K,he,de,fe,me,pe,be,ve,Ge,Ae,Bt=(Ae=class extends ht{constructor(t,s){super();E(this,p);E(this,w);E(this,f);E(this,q);E(this,O);E(this,Q);E(this,V);E(this,L);E(this,Z);E(this,z);E(this,$);E(this,D);E(this,M);E(this,T);E(this,H,new Set);this.options=s,g(this,w,t),g(this,L,null),this.bindMethods(),this.setOptions(s)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(a(this,f).addObserver(this),Le(a(this,f),this.options)?j(this,p,K).call(this):this.updateResult(),j(this,p,me).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return ge(a(this,f),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return ge(a(this,f),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,j(this,p,pe).call(this),j(this,p,be).call(this),a(this,f).removeObserver(this)}setOptions(t,s){const r=this.options,n=a(this,f);if(this.options=a(this,w).defaultQueryOptions(t),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof F(this.options.enabled,a(this,f))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");j(this,p,ve).call(this),a(this,f).setOptions(this.options),r._defaulted&&!le(this.options,r)&&a(this,w).getQueryCache().notify({type:"observerOptionsUpdated",query:a(this,f),observer:this});const o=this.hasListeners();o&&Fe(a(this,f),n,this.options,r)&&j(this,p,K).call(this),this.updateResult(s),o&&(a(this,f)!==n||F(this.options.enabled,a(this,f))!==F(r.enabled,a(this,f))||Y(this.options.staleTime,a(this,f))!==Y(r.staleTime,a(this,f)))&&j(this,p,he).call(this);const l=j(this,p,de).call(this);o&&(a(this,f)!==n||F(this.options.enabled,a(this,f))!==F(r.enabled,a(this,f))||l!==a(this,T))&&j(this,p,fe).call(this,l)}getOptimisticResult(t){const s=a(this,w).getQueryCache().build(a(this,w),t),r=this.createResult(s,t);return Vt(this,r)&&(g(this,O,r),g(this,V,this.options),g(this,Q,a(this,f).state)),r}getCurrentResult(){return a(this,O)}trackResult(t,s){const r={};return Object.keys(t).forEach(n=>{Object.defineProperty(r,n,{configurable:!1,enumerable:!0,get:()=>(this.trackProp(n),s==null||s(n),t[n])})}),r}trackProp(t){a(this,H).add(t)}getCurrentQuery(){return a(this,f)}refetch({...t}={}){return this.fetch({...t})}fetchOptimistic(t){const s=a(this,w).defaultQueryOptions(t),r=a(this,w).getQueryCache().build(a(this,w),s);return r.isFetchingOptimistic=!0,r.fetch().then(()=>this.createResult(r,s))}fetch(t){return j(this,p,K).call(this,{...t,cancelRefetch:t.cancelRefetch??!0}).then(()=>(this.updateResult(),a(this,O)))}createResult(t,s){var ke;const r=a(this,f),n=this.options,o=a(this,O),l=a(this,Q),c=a(this,V),h=t!==r?t.state:a(this,q),{state:v}=t;let u={...v},d=!1,m;if(s._optimisticResults){const _=this.hasListeners(),re=!_&&Le(t,s),Je=_&&Fe(t,r,s,n);(re||Je)&&(u={...u,...pt(v.data,t.options)}),s._optimisticResults==="isRestoring"&&(u.fetchStatus="idle")}let{error:C,errorUpdatedAt:R,status:x}=u;if(s.select&&u.data!==void 0)if(o&&u.data===(l==null?void 0:l.data)&&s.select===a(this,Z))m=a(this,z);else try{g(this,Z,s.select),m=s.select(u.data),m=Ie(o==null?void 0:o.data,m,s),g(this,z,m),g(this,L,null)}catch(_){g(this,L,_)}else m=u.data;if(s.placeholderData!==void 0&&m===void 0&&x==="pending"){let _;if(o!=null&&o.isPlaceholderData&&s.placeholderData===(c==null?void 0:c.placeholderData))_=o.data;else if(_=typeof s.placeholderData=="function"?s.placeholderData((ke=a(this,$))==null?void 0:ke.state.data,a(this,$)):s.placeholderData,s.select&&_!==void 0)try{_=s.select(_),g(this,L,null)}catch(re){g(this,L,re)}_!==void 0&&(x="success",m=Ie(o==null?void 0:o.data,_,s),d=!0)}a(this,L)&&(C=a(this,L),m=a(this,z),R=Date.now(),x="error");const I=u.fetchStatus==="fetching",k=x==="pending",S=x==="error",U=k&&I,A=m!==void 0;return{status:x,fetchStatus:u.fetchStatus,isPending:k,isSuccess:x==="success",isError:S,isInitialLoading:U,isLoading:U,data:m,dataUpdatedAt:u.dataUpdatedAt,error:C,errorUpdatedAt:R,failureCount:u.fetchFailureCount,failureReason:u.fetchFailureReason,errorUpdateCount:u.errorUpdateCount,isFetched:u.dataUpdateCount>0||u.errorUpdateCount>0,isFetchedAfterMount:u.dataUpdateCount>h.dataUpdateCount||u.errorUpdateCount>h.errorUpdateCount,isFetching:I,isRefetching:I&&!k,isLoadingError:S&&!A,isPaused:u.fetchStatus==="paused",isPlaceholderData:d,isRefetchError:S&&A,isStale:Se(t,s),refetch:this.refetch}}updateResult(t){const s=a(this,O),r=this.createResult(a(this,f),this.options);if(g(this,Q,a(this,f).state),g(this,V,this.options),a(this,Q).data!==void 0&&g(this,$,a(this,f)),le(r,s))return;g(this,O,r);const n={},o=()=>{if(!s)return!0;const{notifyOnChangeProps:l}=this.options,c=typeof l=="function"?l():l;if(c==="all"||!c&&!a(this,H).size)return!0;const b=new Set(c??a(this,H));return this.options.throwOnError&&b.add("error"),Object.keys(a(this,O)).some(h=>{const v=h;return a(this,O)[v]!==s[v]&&b.has(v)})};(t==null?void 0:t.listeners)!==!1&&o()&&(n.listeners=!0),j(this,p,Ge).call(this,{...n,...t})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&j(this,p,me).call(this)}},w=new WeakMap,f=new WeakMap,q=new WeakMap,O=new WeakMap,Q=new WeakMap,V=new WeakMap,L=new WeakMap,Z=new WeakMap,z=new WeakMap,$=new WeakMap,D=new WeakMap,M=new WeakMap,T=new WeakMap,H=new WeakMap,p=new WeakSet,K=function(t){j(this,p,ve).call(this);let s=a(this,f).fetch(this.options,t);return t!=null&&t.throwOnError||(s=s.catch(dt)),s},he=function(){j(this,p,pe).call(this);const t=Y(this.options.staleTime,a(this,f));if(Ee||a(this,O).isStale||!Oe(t))return;const r=ft(a(this,O).dataUpdatedAt,t)+1;g(this,D,setTimeout(()=>{a(this,O).isStale||this.updateResult()},r))},de=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(a(this,f)):this.options.refetchInterval)??!1},fe=function(t){j(this,p,be).call(this),g(this,T,t),!(Ee||F(this.options.enabled,a(this,f))===!1||!Oe(a(this,T))||a(this,T)===0)&&g(this,M,setInterval(()=>{(this.options.refetchIntervalInBackground||mt.isFocused())&&j(this,p,K).call(this)},a(this,T)))},me=function(){j(this,p,he).call(this),j(this,p,fe).call(this,j(this,p,de).call(this))},pe=function(){a(this,D)&&(clearTimeout(a(this,D)),g(this,D,void 0))},be=function(){a(this,M)&&(clearInterval(a(this,M)),g(this,M,void 0))},ve=function(){const t=a(this,w).getQueryCache().build(a(this,w),this.options);if(t===a(this,f))return;const s=a(this,f);g(this,f,t),g(this,q,t.state),this.hasListeners()&&(s==null||s.removeObserver(this),t.addObserver(this))},Ge=function(t){Me.batch(()=>{t.listeners&&this.listeners.forEach(s=>{s(a(this,O))}),a(this,w).getQueryCache().notify({query:a(this,f),type:"observerResultsUpdated"})})},Ae);function Wt(e,t){return F(t.enabled,e)!==!1&&e.state.data===void 0&&!(e.state.status==="error"&&t.retryOnMount===!1)}function Le(e,t){return Wt(e,t)||e.state.data!==void 0&&ge(e,t,t.refetchOnMount)}function ge(e,t,s){if(F(t.enabled,e)!==!1){const r=typeof s=="function"?s(e):s;return r==="always"||r!==!1&&Se(e,t)}return!1}function Fe(e,t,s,r){return(e!==t||F(r.enabled,e)===!1)&&(!s.suspense||e.state.status!=="error")&&Se(e,s)}function Se(e,t){return F(t.enabled,e)!==!1&&e.isStaleByTime(Y(t.staleTime,e))}function Vt(e,t){return!le(e.getCurrentResult(),t)}var Xe=y.createContext(!1),zt=()=>y.useContext(Xe);Xe.Provider;function $t(){let e=!1;return{clearReset:()=>{e=!1},reset:()=>{e=!0},isReset:()=>e}}var Ht=y.createContext($t()),Kt=()=>y.useContext(Ht),qt=(e,t)=>{(e.suspense||e.throwOnError)&&(t.isReset()||(e.retryOnMount=!1))},Zt=e=>{y.useEffect(()=>{e.clearReset()},[e])},Gt=({result:e,errorResetBoundary:t,throwOnError:s,query:r})=>e.isError&&!t.isReset()&&!e.isFetching&&r&&vt(s,[e.error,r]),Xt=e=>{e.suspense&&typeof e.staleTime!="number"&&(e.staleTime=1e3)},Yt=(e,t)=>(e==null?void 0:e.suspense)&&t.isPending,Jt=(e,t,s)=>t.fetchOptimistic(e).catch(()=>{s.clearReset()});function es(e,t,s){var h,v,u,d;const r=Be(),n=zt(),o=Kt(),l=r.defaultQueryOptions(e);(v=(h=r.getDefaultOptions().queries)==null?void 0:h._experimental_beforeQuery)==null||v.call(h,l),l._optimisticResults=n?"isRestoring":"optimistic",Xt(l),qt(l,o),Zt(o);const[c]=y.useState(()=>new t(r,l)),b=c.getOptimisticResult(l);if(y.useSyncExternalStore(y.useCallback(m=>{const C=n?()=>{}:c.subscribe(Me.batchCalls(m));return c.updateResult(),C},[c,n]),()=>c.getCurrentResult(),()=>c.getCurrentResult()),y.useEffect(()=>{c.setOptions(l,{listeners:!1})},[l,c]),Yt(l,b))throw Jt(l,c,o);if(Gt({result:b,errorResetBoundary:o,throwOnError:l.throwOnError,query:r.getQueryCache().get(l.queryHash)}))throw b.error;return(d=(u=r.getDefaultOptions().queries)==null?void 0:u._experimental_afterQuery)==null||d.call(u,l,b),l.notifyOnChangeProps?b:c.trackResult(b)}function ts(e,t){return es(e,Bt)}const B=[{id:"1",username:"user1",email:"user1@example.com",bio:"I am user 1"},{id:"2",username:"user2",email:"user2@example.com",bio:"I am user 2"}],ss=async({userId:e})=>{await Ce(500);const t=B.find(s=>s.id===e);if(!t)throw new Error("User not found");return{...t}},rs=async e=>{await Ce(500);const t=B.findIndex(r=>r.id===e.userId);if(t===-1)throw new Error("User not found");const s={...B[t],...e,avatar:e.avatar?URL.createObjectURL(e.avatar):B[t].avatar};return B[t]=s,{...s}},as=async()=>(await Ce(500),{...B[0]}),Ye=e=>{const{updateTrigger:t}=We();return ts({queryKey:e?["/api/users",e.userId]:["/api/users/me",t],queryFn:e?()=>ss(e):as})},is=({username:e,avatar:t,email:s,bio:r})=>i.jsx(te,{children:i.jsxs(je,{spacing:4,align:"center",children:[i.jsx(He,{size:"2xl",name:e,src:t}),i.jsx(J,{fontSize:"2xl",fontWeight:"bold",children:e}),i.jsx(J,{children:s}),i.jsx(J,{children:r||""})]})}),ns=({userId:e})=>{const{data:t,error:s,isError:r,isLoading:n}=Ye(e?{userId:e}:void 0);return n?i.jsxs(te,{padding:"6",boxShadow:"lg",bg:"white",children:[i.jsx(qe,{size:"10"}),i.jsx(Ze,{mt:"4",noOfLines:4,spacing:"4"})]}):r?i.jsxs(J,{color:"red.500",children:["Error: ",s.message]}):t?i.jsx(is,{...t}):null},W={all:["users"],lists:()=>[...W.all,"list"],list:e=>[...W.lists(),{filters:e}],details:()=>[...W.all,"detail"],detail:e=>[...W.details(),e]},os=()=>{const e=Be();return gt({mutationFn:async t=>await rs(t),onSuccess:(t,s)=>{e.invalidateQueries({queryKey:W.detail(s.userId)}),e.invalidateQueries({queryKey:W.detail("me")})}})},Ue=500,ls=2*1024*1024,cs=yt().shape({username:ie().required("Username is required"),email:ie().email("Invalid email address").required("Email is required"),bio:ie().max(Ue,`Bio must be ${Ue} characters or less`).optional(),avatar:xt().test("fileSize","File is too large",e=>e&&e instanceof File?e.size<=ls:!0).optional()}),us=()=>{var R,x,I;const{data:e,isLoading:t}=Ye(),s=os(),{register:r,handleSubmit:n,reset:o,control:l,formState:{errors:c,isSubmitting:b}}=jt({resolver:Ct(cs)}),{setCurrentUser:h,triggerUpdate:v}=We(),u=Et();y.useEffect(()=>{e&&o(e)},[e,o]);const d=y.useCallback(async k=>{try{if(!(e!=null&&e.id))return;const S=await s.mutateAsync({...k,userId:e.id});h(S),v(),u({title:"Profile updated successfully",status:"success",duration:3e3,isClosable:!0})}catch(S){u({title:"Failed to update profile",description:S instanceof Error?S.message:"An unknown error occurred",status:"error",duration:3e3,isClosable:!0})}},[e==null?void 0:e.id,s,h,v,u]),m=y.useCallback(k=>S=>{var A;const U=(A=S.target.files)==null?void 0:A[0];k.onChange(U)},[]),C=y.useCallback(k=>{k.currentTarget.value=""},[]);return i.jsx(te,{as:"form",onSubmit:n(d),children:i.jsxs(je,{spacing:4,children:[i.jsxs(G,{isInvalid:!!c.username,children:[i.jsx(X,{children:"Username"}),t?i.jsx(P,{height:"40px"}):i.jsx(oe,{...r("username")}),i.jsx(ne,{children:(R=c.username)==null?void 0:R.message})]}),i.jsxs(G,{isInvalid:!!c.email,children:[i.jsx(X,{children:"Email"}),t?i.jsx(P,{height:"40px"}):i.jsx(oe,{...r("email")}),i.jsx(ne,{children:(x=c.email)==null?void 0:x.message})]}),i.jsxs(G,{isInvalid:!!c.bio,children:[i.jsx(X,{children:"Bio"}),t?i.jsx(P,{height:"80px"}):i.jsx(Rt,{...r("bio")}),i.jsx(ne,{children:(I=c.bio)==null?void 0:I.message})]}),i.jsxs(G,{children:[i.jsx(X,{children:"Avatar"}),i.jsx(St,{name:"avatar",control:l,render:({field:k})=>t?i.jsx(P,{height:"40px"}):i.jsx(oe,{type:"file",accept:"image/*",onChange:m(k),onClick:C})})]}),i.jsx(bt,{type:"submit",colorScheme:"blue",isLoading:b||t,children:"Update Profile"})]})})},gs=()=>i.jsx(te,{maxWidth:"600px",margin:"auto",padding:8,children:i.jsxs(je,{spacing:8,align:"stretch",children:[i.jsx(we,{as:"h1",size:"xl",textAlign:"center",children:"ユーザープロフィール"}),i.jsx(ns,{}),i.jsx(Ke,{}),i.jsx(we,{as:"h2",size:"lg",children:"プロフィール編集"}),i.jsx(us,{})]})});export{gs as ProfilePage};
