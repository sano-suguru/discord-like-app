import{u as f,a as S,j as e,S as u,B as b,T as F,b as y,c as k}from"./index-nORPXnHn.js";import{u as E,a as v,F as c,b as m,I as l}from"./userStore-DSUL5nZ6.js";import{d as I,c as U,a as x,u as B,F as d,o as L}from"./delay-B36pBFVw.js";import{V as M}from"./chunk-NTCQBYKE-DSbqkiIr.js";const P="mock-token",T=async(r,t)=>{if(await I(500),r==="user"&&t==="password")return{success:!0,token:P,user:{id:"1",username:r,email:"username@example.com",bio:"テスト用の自己紹介です。"}};throw new Error("ユーザー名またはパスワードに誤りがあります")},q=U().shape({username:x().required("ユーザー名は必須です"),password:x().required("パスワードは必須です")}),O=()=>{var a,i;const{register:r,handleSubmit:t,formState:{errors:n}}=E({resolver:L(q)}),{authenticate:p,logout:h}=f(),j=S(),{setUser:g}=v(),o=B({mutationFn:async s=>await T(s.username,s.password),onSuccess:s=>{s!=null&&s.token&&(s!=null&&s.user)&&(p(s.token),g({...s.user}),j(k))},onError:s=>{console.error(s),h()}}),w=async s=>{await o.mutateAsync(s)};return o.isPending?e.jsx(u,{}):e.jsx(b,{maxWidth:"400px",margin:"auto",mt:8,children:o.isPending?e.jsx(u,{}):e.jsx("form",{onSubmit:t(w),children:e.jsxs(M,{spacing:4,children:[e.jsxs(c,{isInvalid:!!n.username,children:[e.jsx(m,{children:"Username"}),e.jsx(l,{...r("username")}),e.jsx(d,{children:(a=n.username)==null?void 0:a.message})]}),e.jsxs(c,{isInvalid:!!n.password,children:[e.jsx(m,{children:"Password"}),e.jsx(l,{type:"password",...r("password")}),e.jsx(d,{children:(i=n.password)==null?void 0:i.message})]}),o.isError&&e.jsx(F,{color:"red.500",children:o.error.message}),e.jsx(y,{type:"submit",colorScheme:"blue",width:"full",children:"Login"})]})})})};export{O as default};
