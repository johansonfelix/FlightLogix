(this["webpackJsonpfront-end"]=this["webpackJsonpfront-end"]||[]).push([[10],{670:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return Y}));var n=a(36),r=a.n(n),c=a(21),i=a(37),s=a(3),o=a(46),l=a(0),u=a.n(l),j=a(574),d=a(624),b=a(106),m=a(665),p=a(622),O=a(662),h=a(362),x=a(615),f=a(575),g=a(263),v=a.n(g),y=a(612),S=a(104),w=a(613),C=a(109),k=a(666),N=a(626),F=a(360),T=a(45),W=a(2);function E(){return Object(W.jsxs)(y.a,{variant:"body2",color:"textSecondary",align:"center",children:["Copyright \xa9 ",Object(W.jsx)(h.a,{color:"inherit",href:"/home",children:"FlightLogix"})," ",(new Date).getFullYear(),"."]})}function D(e){return I.apply(this,arguments)}function I(){return(I=Object(o.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(T.a)("POST","/app/register",null,JSON.stringify(t)).then((function(e){return e.json()})).then((function(e){return e})).catch((function(e){console.error("Failed to Register user => "+e)})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var R=Object(S.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:"#F4B400"},form:{width:"100%",marginTop:e.spacing(3)},submit:{margin:e.spacing(3,0,2)}}}));function A(e){var t=R(),a=Object(l.useState)(),n=Object(c.a)(a,2),i=n[0],s=n[1],u=Object(l.useState)(),g=Object(c.a)(u,2),S=g[0],k=g[1],N=Object(l.useState)(),F=Object(c.a)(N,2),T=F[0],I=F[1],A=Object(l.useState)(),P=Object(c.a)(A,2),q=P[0],B=P[1],J=Object(l.useState)(!1),U=Object(c.a)(J,2),H=U[0],L=U[1],G=Object(l.useState)(!1),Y=Object(c.a)(G,2),z=Y[0],K=Y[1],M=Object(l.useState)(null),Q=Object(c.a)(M,2),V=Q[0],X=Q[1],Z=function(){var e=Object(o.a)(r.a.mark((function e(t){var a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),L(!0),X(null),e.next=5,D({firstName:i,lastName:S,email:T,password:q});case 5:a=e.sent,L(!1),a?a.message?(console.log(a.message),X(a.message)):"CREATED"===a?(console.log("Registration successful "),K(!0)):(console.log(a),console.log(a.title),X(a.title)):(console.log("Server unavailable"),X("Server unavailable. Try again later.")),I(),s(),k(),B();case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(W.jsx)(l.Fragment,{children:Object(W.jsxs)(w.a,{maxWidth:"xs",fixed:!0,disableGutters:!0,children:[H&&Object(W.jsxs)("div",{className:t.paper,children:[Object(W.jsx)(C.a,{}),Object(W.jsx)("p",{children:"Registering User"})]}),!H&&Object(W.jsxs)("div",{children:[Object(W.jsx)(b.a,{}),Object(W.jsxs)("div",{className:t.paper,children:[Object(W.jsx)(j.a,{className:t.avatar,children:Object(W.jsx)(v.a,{})}),Object(W.jsx)(y.a,{component:"h1",variant:"h5",children:"Sign up"}),V&&Object(W.jsxs)(y.a,{component:"body2",style:{color:"red"},variant:"body2",children:[Object(W.jsx)("br",{}),V]}),Object(W.jsxs)("form",{className:t.form,onSubmit:Z,children:[Object(W.jsxs)(x.a,{container:!0,spacing:2,children:[Object(W.jsx)(x.a,{item:!0,xs:12,sm:6,children:Object(W.jsx)(m.a,{autoComplete:"fname",name:"firstName",variant:"outlined",required:!0,fullWidth:!0,id:"firstName",label:"First Name",autoFocus:!0,onChange:function(e){return s(e.target.value)}})}),Object(W.jsx)(x.a,{item:!0,xs:12,sm:6,children:Object(W.jsx)(m.a,{variant:"outlined",required:!0,fullWidth:!0,id:"lastName",label:"Last Name",name:"lastName",autoComplete:"lname",onChange:function(e){return k(e.target.value)}})}),Object(W.jsx)(x.a,{item:!0,xs:12,children:Object(W.jsx)(m.a,{variant:"outlined",required:!0,fullWidth:!0,type:"email",id:"email",label:"Email Address",name:"email",autoComplete:"email",onChange:function(e){return I(e.target.value)}})}),Object(W.jsx)(x.a,{item:!0,xs:12,children:Object(W.jsx)(m.a,{variant:"outlined",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password",onChange:function(e){return B(e.target.value)}})}),Object(W.jsx)(x.a,{item:!0,xs:12,children:Object(W.jsx)(p.a,{control:Object(W.jsx)(O.a,{value:"allowExtraEmails",color:"primary"}),label:"I want to receive inspiration, marketing promotions and updates via email."})})]}),Object(W.jsx)(d.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:t.submit,style:{backgroundColor:"#F4B400"},children:"Sign Up"}),Object(W.jsx)(x.a,{container:!0,justify:"flex-end",children:Object(W.jsx)(x.a,{item:!0,children:Object(W.jsx)(h.a,{href:"#",variant:"body2",onClick:e.closeHandler,children:"Already have an account? Sign in"})})})]})]}),Object(W.jsx)(f.a,{mt:5,children:Object(W.jsx)(E,{})})]}),z&&e.handleIsRegistered("success")]})})}var P=a(668),q=a(663);function B(e){return J.apply(this,arguments)}function J(){return(J=Object(o.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(T.a)("POST","/app/login",null,JSON.stringify(t)).then((function(e){return e.json()})).then((function(e){return e})).catch((function(e){console.error("Failed to log in user => "+e)})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var U=u.a.forwardRef((function(e,t){var a=e.in,n=e.children,r=e.onEnter,c=e.onExited,o=Object(s.a)(e,["in","children","onEnter","onExited"]),l=Object(F.useSpring)({from:{opacity:0},to:{opacity:a?1:0},onStart:function(){a&&r&&r()},onRest:function(){!a&&c&&c()}});return Object(W.jsx)(F.animated.div,Object(i.a)(Object(i.a)({ref:t,style:l},o),{},{children:n}))}));function H(){return Object(W.jsxs)(y.a,{variant:"body2",color:"textSecondary",align:"center",children:["Copyright \xa9 ",Object(W.jsx)(h.a,{color:"inherit",href:"/",children:"FlightLogix"})," ",(new Date).getFullYear(),"."]})}var L=Object(S.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:"#F4B400"},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)},modal:{display:"flex",alignItems:"center",justifyContent:"center"},modalPaper:{display:"flex",backgroundColor:e.palette.background.paper,boxShadow:e.shadows[5],padding:e.spacing(2,4,3),alignItems:"center",justifyContent:"center"},textField:{"&:focus":{backgroundColor:"red"}}}}));function G(e){return Object(W.jsx)(q.a,Object(i.a)({elevation:6,variant:"filled"},e))}function Y(e){var t=L(),a=Object(l.useState)(),n=Object(c.a)(a,2),i=n[0],s=n[1],u=Object(l.useState)(),g=Object(c.a)(u,2),S=g[0],F=g[1],T=Object(l.useState)(!1),E=Object(c.a)(T,2),D=E[0],I=E[1],R=Object(l.useState)(null),q=Object(c.a)(R,2),J=q[0],Y=q[1],z=Object(l.useState)(!1),K=Object(c.a)(z,2),M=K[0],Q=K[1],V=Object(l.useState)(!1),X=Object(c.a)(V,2),Z=X[0],$=X[1],_=function(){Q(!1)},ee=function(e,t){"clickaway"!==t&&$(!1)},te=function(){var t=Object(o.a)(r.a.mark((function t(a){var n;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("Clicked login."),a.preventDefault(),I(!0),Y(null),t.next=6,B({email:i,password:S,setIsAuthenticating:I});case 6:(n=t.sent)?n.message?(console.log(n.message),Y(n.message)):n.token&&(console.log(n),e.setToken(n.token)):(console.log("Server unavailable"),Y("Server unavailable. Try again later.")),I(!1);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(W.jsxs)(l.Fragment,{children:[Object(W.jsxs)(w.a,{component:"main",maxWidth:"xs",children:[Object(W.jsx)(b.a,{}),!D&&Object(W.jsxs)("div",{className:t.paper,children:[Object(W.jsx)(j.a,{className:t.avatar,children:Object(W.jsx)(v.a,{})}),Object(W.jsx)(y.a,{component:"h1",variant:"h5",children:"Sign in"}),J&&Object(W.jsxs)(y.a,{component:"body2",style:{color:"red"},variant:"body2",children:[Object(W.jsx)("br",{}),J]}),Object(W.jsxs)("form",{className:t.form,onSubmit:te,children:[Object(W.jsx)(m.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"email",type:"email",label:"Email Address",name:"email",autoComplete:"email",onChange:function(e){return s(e.target.value)},autoFocus:!0,className:t.textField}),Object(W.jsx)(m.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password",onChange:function(e){return F(e.target.value)}}),Object(W.jsx)(p.a,{control:Object(W.jsx)(O.a,{value:"remember",color:"primary"}),label:"Remember me"}),Object(W.jsx)(d.a,{type:"submit",fullWidth:!0,variant:"contained",style:{backgroundColor:"#F4B400",color:"#fff"},className:t.submit,children:"Sign In"}),Object(W.jsx)(x.a,{container:!0,children:Object(W.jsx)(x.a,{children:Object(W.jsx)(h.a,{href:"#",variant:"body2",onClick:function(){Q(!0)},children:Object(W.jsx)(y.a,{children:"Don't have an account? Sign Up"})})})})]}),Object(W.jsx)(f.a,{mt:8,children:Object(W.jsx)(H,{})})]}),D&&Object(W.jsxs)("div",{className:t.paper,children:[Object(W.jsx)(C.a,{}),Object(W.jsx)("p",{children:"Authenticating"})]})]}),Object(W.jsxs)(w.a,{maxWidth:"xs",fixed:!0,disableGutters:!0,children:[Object(W.jsx)(k.a,{"aria-labelledby":"spring-modal-title","aria-describedby":"spring-modal-description",className:t.modalPaper,open:M,onClose:_,closeAfterTransition:!0,BackdropComponent:N.a,BackdropProps:{timeout:600},children:Object(W.jsx)(U,{in:M,children:Object(W.jsx)("div",{className:t.modalPaper,children:Object(W.jsx)(A,{handleIsRegistered:function(e){console.log("in handle is registered"),$(!0),_()},closeHandler:_})})})}),Object(W.jsx)(P.a,{open:Z,autoHideDuration:5e3,onClose:ee,children:Object(W.jsx)(G,{onClose:ee,severity:"success",children:"User Account Created!"})})]})]})}}}]);
//# sourceMappingURL=10.449aada4.chunk.js.map