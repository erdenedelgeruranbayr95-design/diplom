(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();var fm={exports:{}},kl={},hm={exports:{}},ot={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Va=Symbol.for("react.element"),f_=Symbol.for("react.portal"),h_=Symbol.for("react.fragment"),p_=Symbol.for("react.strict_mode"),m_=Symbol.for("react.profiler"),g_=Symbol.for("react.provider"),v_=Symbol.for("react.context"),__=Symbol.for("react.forward_ref"),x_=Symbol.for("react.suspense"),y_=Symbol.for("react.memo"),S_=Symbol.for("react.lazy"),Sf=Symbol.iterator;function M_(t){return t===null||typeof t!="object"?null:(t=Sf&&t[Sf]||t["@@iterator"],typeof t=="function"?t:null)}var pm={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},mm=Object.assign,gm={};function Vs(t,e,n){this.props=t,this.context=e,this.refs=gm,this.updater=n||pm}Vs.prototype.isReactComponent={};Vs.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Vs.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function vm(){}vm.prototype=Vs.prototype;function Sd(t,e,n){this.props=t,this.context=e,this.refs=gm,this.updater=n||pm}var Md=Sd.prototype=new vm;Md.constructor=Sd;mm(Md,Vs.prototype);Md.isPureReactComponent=!0;var Mf=Array.isArray,_m=Object.prototype.hasOwnProperty,Ed={current:null},xm={key:!0,ref:!0,__self:!0,__source:!0};function ym(t,e,n){var i,r={},s=null,a=null;if(e!=null)for(i in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(s=""+e.key),e)_m.call(e,i)&&!xm.hasOwnProperty(i)&&(r[i]=e[i]);var o=arguments.length-2;if(o===1)r.children=n;else if(1<o){for(var c=Array(o),u=0;u<o;u++)c[u]=arguments[u+2];r.children=c}if(t&&t.defaultProps)for(i in o=t.defaultProps,o)r[i]===void 0&&(r[i]=o[i]);return{$$typeof:Va,type:t,key:s,ref:a,props:r,_owner:Ed.current}}function E_(t,e){return{$$typeof:Va,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Td(t){return typeof t=="object"&&t!==null&&t.$$typeof===Va}function T_(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Ef=/\/+/g;function lc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?T_(""+t.key):e.toString(36)}function Wo(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case Va:case f_:a=!0}}if(a)return a=t,r=r(a),t=i===""?"."+lc(a,0):i,Mf(r)?(n="",t!=null&&(n=t.replace(Ef,"$&/")+"/"),Wo(r,e,n,"",function(u){return u})):r!=null&&(Td(r)&&(r=E_(r,n+(!r.key||a&&a.key===r.key?"":(""+r.key).replace(Ef,"$&/")+"/")+t)),e.push(r)),1;if(a=0,i=i===""?".":i+":",Mf(t))for(var o=0;o<t.length;o++){s=t[o];var c=i+lc(s,o);a+=Wo(s,e,n,c,r)}else if(c=M_(t),typeof c=="function")for(t=c.call(t),o=0;!(s=t.next()).done;)s=s.value,c=i+lc(s,o++),a+=Wo(s,e,n,c,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function to(t,e,n){if(t==null)return t;var i=[],r=0;return Wo(t,i,"","",function(s){return e.call(n,s,r++)}),i}function w_(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var cn={current:null},Xo={transition:null},A_={ReactCurrentDispatcher:cn,ReactCurrentBatchConfig:Xo,ReactCurrentOwner:Ed};function Sm(){throw Error("act(...) is not supported in production builds of React.")}ot.Children={map:to,forEach:function(t,e,n){to(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return to(t,function(){e++}),e},toArray:function(t){return to(t,function(e){return e})||[]},only:function(t){if(!Td(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};ot.Component=Vs;ot.Fragment=h_;ot.Profiler=m_;ot.PureComponent=Sd;ot.StrictMode=p_;ot.Suspense=x_;ot.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=A_;ot.act=Sm;ot.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=mm({},t.props),r=t.key,s=t.ref,a=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,a=Ed.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var o=t.type.defaultProps;for(c in e)_m.call(e,c)&&!xm.hasOwnProperty(c)&&(i[c]=e[c]===void 0&&o!==void 0?o[c]:e[c])}var c=arguments.length-2;if(c===1)i.children=n;else if(1<c){o=Array(c);for(var u=0;u<c;u++)o[u]=arguments[u+2];i.children=o}return{$$typeof:Va,type:t.type,key:r,ref:s,props:i,_owner:a}};ot.createContext=function(t){return t={$$typeof:v_,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:g_,_context:t},t.Consumer=t};ot.createElement=ym;ot.createFactory=function(t){var e=ym.bind(null,t);return e.type=t,e};ot.createRef=function(){return{current:null}};ot.forwardRef=function(t){return{$$typeof:__,render:t}};ot.isValidElement=Td;ot.lazy=function(t){return{$$typeof:S_,_payload:{_status:-1,_result:t},_init:w_}};ot.memo=function(t,e){return{$$typeof:y_,type:t,compare:e===void 0?null:e}};ot.startTransition=function(t){var e=Xo.transition;Xo.transition={};try{t()}finally{Xo.transition=e}};ot.unstable_act=Sm;ot.useCallback=function(t,e){return cn.current.useCallback(t,e)};ot.useContext=function(t){return cn.current.useContext(t)};ot.useDebugValue=function(){};ot.useDeferredValue=function(t){return cn.current.useDeferredValue(t)};ot.useEffect=function(t,e){return cn.current.useEffect(t,e)};ot.useId=function(){return cn.current.useId()};ot.useImperativeHandle=function(t,e,n){return cn.current.useImperativeHandle(t,e,n)};ot.useInsertionEffect=function(t,e){return cn.current.useInsertionEffect(t,e)};ot.useLayoutEffect=function(t,e){return cn.current.useLayoutEffect(t,e)};ot.useMemo=function(t,e){return cn.current.useMemo(t,e)};ot.useReducer=function(t,e,n){return cn.current.useReducer(t,e,n)};ot.useRef=function(t){return cn.current.useRef(t)};ot.useState=function(t){return cn.current.useState(t)};ot.useSyncExternalStore=function(t,e,n){return cn.current.useSyncExternalStore(t,e,n)};ot.useTransition=function(){return cn.current.useTransition()};ot.version="18.3.1";hm.exports=ot;var ye=hm.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var C_=ye,R_=Symbol.for("react.element"),b_=Symbol.for("react.fragment"),N_=Object.prototype.hasOwnProperty,P_=C_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,L_={key:!0,ref:!0,__self:!0,__source:!0};function Mm(t,e,n){var i,r={},s=null,a=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);for(i in e)N_.call(e,i)&&!L_.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:R_,type:t,key:s,ref:a,props:r,_owner:P_.current}}kl.Fragment=b_;kl.jsx=Mm;kl.jsxs=Mm;fm.exports=kl;var l=fm.exports,gu={},Em={exports:{}},Cn={},Tm={exports:{}},wm={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(F,ee){var ie=F.length;F.push(ee);e:for(;0<ie;){var ue=ie-1>>>1,Ie=F[ue];if(0<r(Ie,ee))F[ue]=ee,F[ie]=Ie,ie=ue;else break e}}function n(F){return F.length===0?null:F[0]}function i(F){if(F.length===0)return null;var ee=F[0],ie=F.pop();if(ie!==ee){F[0]=ie;e:for(var ue=0,Ie=F.length,at=Ie>>>1;ue<at;){var X=2*(ue+1)-1,se=F[X],ve=X+1,ge=F[ve];if(0>r(se,ie))ve<Ie&&0>r(ge,se)?(F[ue]=ge,F[ve]=ie,ue=ve):(F[ue]=se,F[X]=ie,ue=X);else if(ve<Ie&&0>r(ge,ie))F[ue]=ge,F[ve]=ie,ue=ve;else break e}}return ee}function r(F,ee){var ie=F.sortIndex-ee.sortIndex;return ie!==0?ie:F.id-ee.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,o=a.now();t.unstable_now=function(){return a.now()-o}}var c=[],u=[],f=1,p=null,h=3,m=!1,x=!1,y=!1,g=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function _(F){for(var ee=n(u);ee!==null;){if(ee.callback===null)i(u);else if(ee.startTime<=F)i(u),ee.sortIndex=ee.expirationTime,e(c,ee);else break;ee=n(u)}}function T(F){if(y=!1,_(F),!x)if(n(c)!==null)x=!0,$(D);else{var ee=n(u);ee!==null&&J(T,ee.startTime-F)}}function D(F,ee){x=!1,y&&(y=!1,d(R),R=-1),m=!0;var ie=h;try{for(_(ee),p=n(c);p!==null&&(!(p.expirationTime>ee)||F&&!N());){var ue=p.callback;if(typeof ue=="function"){p.callback=null,h=p.priorityLevel;var Ie=ue(p.expirationTime<=ee);ee=t.unstable_now(),typeof Ie=="function"?p.callback=Ie:p===n(c)&&i(c),_(ee)}else i(c);p=n(c)}if(p!==null)var at=!0;else{var X=n(u);X!==null&&J(T,X.startTime-ee),at=!1}return at}finally{p=null,h=ie,m=!1}}var C=!1,A=null,R=-1,E=5,S=-1;function N(){return!(t.unstable_now()-S<E)}function G(){if(A!==null){var F=t.unstable_now();S=F;var ee=!0;try{ee=A(!0,F)}finally{ee?z():(C=!1,A=null)}}else C=!1}var z;if(typeof v=="function")z=function(){v(G)};else if(typeof MessageChannel<"u"){var te=new MessageChannel,Q=te.port2;te.port1.onmessage=G,z=function(){Q.postMessage(null)}}else z=function(){g(G,0)};function $(F){A=F,C||(C=!0,z())}function J(F,ee){R=g(function(){F(t.unstable_now())},ee)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(F){F.callback=null},t.unstable_continueExecution=function(){x||m||(x=!0,$(D))},t.unstable_forceFrameRate=function(F){0>F||125<F?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<F?Math.floor(1e3/F):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return n(c)},t.unstable_next=function(F){switch(h){case 1:case 2:case 3:var ee=3;break;default:ee=h}var ie=h;h=ee;try{return F()}finally{h=ie}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(F,ee){switch(F){case 1:case 2:case 3:case 4:case 5:break;default:F=3}var ie=h;h=F;try{return ee()}finally{h=ie}},t.unstable_scheduleCallback=function(F,ee,ie){var ue=t.unstable_now();switch(typeof ie=="object"&&ie!==null?(ie=ie.delay,ie=typeof ie=="number"&&0<ie?ue+ie:ue):ie=ue,F){case 1:var Ie=-1;break;case 2:Ie=250;break;case 5:Ie=1073741823;break;case 4:Ie=1e4;break;default:Ie=5e3}return Ie=ie+Ie,F={id:f++,callback:ee,priorityLevel:F,startTime:ie,expirationTime:Ie,sortIndex:-1},ie>ue?(F.sortIndex=ie,e(u,F),n(c)===null&&F===n(u)&&(y?(d(R),R=-1):y=!0,J(T,ie-ue))):(F.sortIndex=Ie,e(c,F),x||m||(x=!0,$(D))),F},t.unstable_shouldYield=N,t.unstable_wrapCallback=function(F){var ee=h;return function(){var ie=h;h=ee;try{return F.apply(this,arguments)}finally{h=ie}}}})(wm);Tm.exports=wm;var D_=Tm.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var U_=ye,An=D_;function fe(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Am=new Set,Aa={};function jr(t,e){Ns(t,e),Ns(t+"Capture",e)}function Ns(t,e){for(Aa[t]=e,t=0;t<e.length;t++)Am.add(e[t])}var wi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),vu=Object.prototype.hasOwnProperty,I_=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Tf={},wf={};function F_(t){return vu.call(wf,t)?!0:vu.call(Tf,t)?!1:I_.test(t)?wf[t]=!0:(Tf[t]=!0,!1)}function O_(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function k_(t,e,n,i){if(e===null||typeof e>"u"||O_(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function un(t,e,n,i,r,s,a){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=a}var Zt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Zt[t]=new un(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Zt[e]=new un(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Zt[t]=new un(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Zt[t]=new un(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Zt[t]=new un(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Zt[t]=new un(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Zt[t]=new un(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Zt[t]=new un(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Zt[t]=new un(t,5,!1,t.toLowerCase(),null,!1,!1)});var wd=/[\-:]([a-z])/g;function Ad(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(wd,Ad);Zt[e]=new un(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(wd,Ad);Zt[e]=new un(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(wd,Ad);Zt[e]=new un(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Zt[t]=new un(t,1,!1,t.toLowerCase(),null,!1,!1)});Zt.xlinkHref=new un("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Zt[t]=new un(t,1,!1,t.toLowerCase(),null,!0,!0)});function Cd(t,e,n,i){var r=Zt.hasOwnProperty(e)?Zt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(k_(e,n,r,i)&&(n=null),i||r===null?F_(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Ni=U_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,no=Symbol.for("react.element"),ls=Symbol.for("react.portal"),cs=Symbol.for("react.fragment"),Rd=Symbol.for("react.strict_mode"),_u=Symbol.for("react.profiler"),Cm=Symbol.for("react.provider"),Rm=Symbol.for("react.context"),bd=Symbol.for("react.forward_ref"),xu=Symbol.for("react.suspense"),yu=Symbol.for("react.suspense_list"),Nd=Symbol.for("react.memo"),Bi=Symbol.for("react.lazy"),bm=Symbol.for("react.offscreen"),Af=Symbol.iterator;function Ks(t){return t===null||typeof t!="object"?null:(t=Af&&t[Af]||t["@@iterator"],typeof t=="function"?t:null)}var Dt=Object.assign,cc;function da(t){if(cc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);cc=e&&e[1]||""}return`
`+cc+t}var uc=!1;function dc(t,e){if(!t||uc)return"";uc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(u){var i=u}Reflect.construct(t,[],e)}else{try{e.call()}catch(u){i=u}t.call(e.prototype)}else{try{throw Error()}catch(u){i=u}t()}}catch(u){if(u&&i&&typeof u.stack=="string"){for(var r=u.stack.split(`
`),s=i.stack.split(`
`),a=r.length-1,o=s.length-1;1<=a&&0<=o&&r[a]!==s[o];)o--;for(;1<=a&&0<=o;a--,o--)if(r[a]!==s[o]){if(a!==1||o!==1)do if(a--,o--,0>o||r[a]!==s[o]){var c=`
`+r[a].replace(" at new "," at ");return t.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",t.displayName)),c}while(1<=a&&0<=o);break}}}finally{uc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?da(t):""}function B_(t){switch(t.tag){case 5:return da(t.type);case 16:return da("Lazy");case 13:return da("Suspense");case 19:return da("SuspenseList");case 0:case 2:case 15:return t=dc(t.type,!1),t;case 11:return t=dc(t.type.render,!1),t;case 1:return t=dc(t.type,!0),t;default:return""}}function Su(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case cs:return"Fragment";case ls:return"Portal";case _u:return"Profiler";case Rd:return"StrictMode";case xu:return"Suspense";case yu:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Rm:return(t.displayName||"Context")+".Consumer";case Cm:return(t._context.displayName||"Context")+".Provider";case bd:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Nd:return e=t.displayName||null,e!==null?e:Su(t.type)||"Memo";case Bi:e=t._payload,t=t._init;try{return Su(t(e))}catch{}}return null}function z_(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Su(e);case 8:return e===Rd?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function rr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Nm(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function H_(t){var e=Nm(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(a){i=""+a,s.call(this,a)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(a){i=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function io(t){t._valueTracker||(t._valueTracker=H_(t))}function Pm(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=Nm(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function rl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Mu(t,e){var n=e.checked;return Dt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Cf(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=rr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Lm(t,e){e=e.checked,e!=null&&Cd(t,"checked",e,!1)}function Eu(t,e){Lm(t,e);var n=rr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Tu(t,e.type,n):e.hasOwnProperty("defaultValue")&&Tu(t,e.type,rr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Rf(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Tu(t,e,n){(e!=="number"||rl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var fa=Array.isArray;function Ss(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+rr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function wu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(fe(91));return Dt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function bf(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(fe(92));if(fa(n)){if(1<n.length)throw Error(fe(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:rr(n)}}function Dm(t,e){var n=rr(e.value),i=rr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function Nf(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Um(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Au(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Um(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var ro,Im=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(ro=ro||document.createElement("div"),ro.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=ro.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Ca(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var ga={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},j_=["Webkit","ms","Moz","O"];Object.keys(ga).forEach(function(t){j_.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),ga[e]=ga[t]})});function Fm(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||ga.hasOwnProperty(t)&&ga[t]?(""+e).trim():e+"px"}function Om(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Fm(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var V_=Dt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Cu(t,e){if(e){if(V_[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(fe(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(fe(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(fe(61))}if(e.style!=null&&typeof e.style!="object")throw Error(fe(62))}}function Ru(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var bu=null;function Pd(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Nu=null,Ms=null,Es=null;function Pf(t){if(t=Xa(t)){if(typeof Nu!="function")throw Error(fe(280));var e=t.stateNode;e&&(e=Vl(e),Nu(t.stateNode,t.type,e))}}function km(t){Ms?Es?Es.push(t):Es=[t]:Ms=t}function Bm(){if(Ms){var t=Ms,e=Es;if(Es=Ms=null,Pf(t),e)for(t=0;t<e.length;t++)Pf(e[t])}}function zm(t,e){return t(e)}function Hm(){}var fc=!1;function jm(t,e,n){if(fc)return t(e,n);fc=!0;try{return zm(t,e,n)}finally{fc=!1,(Ms!==null||Es!==null)&&(Hm(),Bm())}}function Ra(t,e){var n=t.stateNode;if(n===null)return null;var i=Vl(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(fe(231,e,typeof n));return n}var Pu=!1;if(wi)try{var Zs={};Object.defineProperty(Zs,"passive",{get:function(){Pu=!0}}),window.addEventListener("test",Zs,Zs),window.removeEventListener("test",Zs,Zs)}catch{Pu=!1}function G_(t,e,n,i,r,s,a,o,c){var u=Array.prototype.slice.call(arguments,3);try{e.apply(n,u)}catch(f){this.onError(f)}}var va=!1,sl=null,al=!1,Lu=null,W_={onError:function(t){va=!0,sl=t}};function X_(t,e,n,i,r,s,a,o,c){va=!1,sl=null,G_.apply(W_,arguments)}function q_(t,e,n,i,r,s,a,o,c){if(X_.apply(this,arguments),va){if(va){var u=sl;va=!1,sl=null}else throw Error(fe(198));al||(al=!0,Lu=u)}}function Vr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Vm(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Lf(t){if(Vr(t)!==t)throw Error(fe(188))}function Y_(t){var e=t.alternate;if(!e){if(e=Vr(t),e===null)throw Error(fe(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return Lf(r),t;if(s===i)return Lf(r),e;s=s.sibling}throw Error(fe(188))}if(n.return!==i.return)n=r,i=s;else{for(var a=!1,o=r.child;o;){if(o===n){a=!0,n=r,i=s;break}if(o===i){a=!0,i=r,n=s;break}o=o.sibling}if(!a){for(o=s.child;o;){if(o===n){a=!0,n=s,i=r;break}if(o===i){a=!0,i=s,n=r;break}o=o.sibling}if(!a)throw Error(fe(189))}}if(n.alternate!==i)throw Error(fe(190))}if(n.tag!==3)throw Error(fe(188));return n.stateNode.current===n?t:e}function Gm(t){return t=Y_(t),t!==null?Wm(t):null}function Wm(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Wm(t);if(e!==null)return e;t=t.sibling}return null}var Xm=An.unstable_scheduleCallback,Df=An.unstable_cancelCallback,$_=An.unstable_shouldYield,K_=An.unstable_requestPaint,It=An.unstable_now,Z_=An.unstable_getCurrentPriorityLevel,Ld=An.unstable_ImmediatePriority,qm=An.unstable_UserBlockingPriority,ol=An.unstable_NormalPriority,Q_=An.unstable_LowPriority,Ym=An.unstable_IdlePriority,Bl=null,oi=null;function J_(t){if(oi&&typeof oi.onCommitFiberRoot=="function")try{oi.onCommitFiberRoot(Bl,t,void 0,(t.current.flags&128)===128)}catch{}}var Kn=Math.clz32?Math.clz32:n0,e0=Math.log,t0=Math.LN2;function n0(t){return t>>>=0,t===0?32:31-(e0(t)/t0|0)|0}var so=64,ao=4194304;function ha(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function ll(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,a=n&268435455;if(a!==0){var o=a&~r;o!==0?i=ha(o):(s&=a,s!==0&&(i=ha(s)))}else a=n&~r,a!==0?i=ha(a):s!==0&&(i=ha(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-Kn(e),r=1<<n,i|=t[n],e&=~r;return i}function i0(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function r0(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var a=31-Kn(s),o=1<<a,c=r[a];c===-1?(!(o&n)||o&i)&&(r[a]=i0(o,e)):c<=e&&(t.expiredLanes|=o),s&=~o}}function Du(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function $m(){var t=so;return so<<=1,!(so&4194240)&&(so=64),t}function hc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ga(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Kn(e),t[e]=n}function s0(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-Kn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function Dd(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-Kn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var vt=0;function Km(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Zm,Ud,Qm,Jm,eg,Uu=!1,oo=[],qi=null,Yi=null,$i=null,ba=new Map,Na=new Map,Hi=[],a0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Uf(t,e){switch(t){case"focusin":case"focusout":qi=null;break;case"dragenter":case"dragleave":Yi=null;break;case"mouseover":case"mouseout":$i=null;break;case"pointerover":case"pointerout":ba.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Na.delete(e.pointerId)}}function Qs(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=Xa(e),e!==null&&Ud(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function o0(t,e,n,i,r){switch(e){case"focusin":return qi=Qs(qi,t,e,n,i,r),!0;case"dragenter":return Yi=Qs(Yi,t,e,n,i,r),!0;case"mouseover":return $i=Qs($i,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return ba.set(s,Qs(ba.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Na.set(s,Qs(Na.get(s)||null,t,e,n,i,r)),!0}return!1}function tg(t){var e=Rr(t.target);if(e!==null){var n=Vr(e);if(n!==null){if(e=n.tag,e===13){if(e=Vm(n),e!==null){t.blockedOn=e,eg(t.priority,function(){Qm(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function qo(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Iu(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);bu=i,n.target.dispatchEvent(i),bu=null}else return e=Xa(n),e!==null&&Ud(e),t.blockedOn=n,!1;e.shift()}return!0}function If(t,e,n){qo(t)&&n.delete(e)}function l0(){Uu=!1,qi!==null&&qo(qi)&&(qi=null),Yi!==null&&qo(Yi)&&(Yi=null),$i!==null&&qo($i)&&($i=null),ba.forEach(If),Na.forEach(If)}function Js(t,e){t.blockedOn===e&&(t.blockedOn=null,Uu||(Uu=!0,An.unstable_scheduleCallback(An.unstable_NormalPriority,l0)))}function Pa(t){function e(r){return Js(r,t)}if(0<oo.length){Js(oo[0],t);for(var n=1;n<oo.length;n++){var i=oo[n];i.blockedOn===t&&(i.blockedOn=null)}}for(qi!==null&&Js(qi,t),Yi!==null&&Js(Yi,t),$i!==null&&Js($i,t),ba.forEach(e),Na.forEach(e),n=0;n<Hi.length;n++)i=Hi[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Hi.length&&(n=Hi[0],n.blockedOn===null);)tg(n),n.blockedOn===null&&Hi.shift()}var Ts=Ni.ReactCurrentBatchConfig,cl=!0;function c0(t,e,n,i){var r=vt,s=Ts.transition;Ts.transition=null;try{vt=1,Id(t,e,n,i)}finally{vt=r,Ts.transition=s}}function u0(t,e,n,i){var r=vt,s=Ts.transition;Ts.transition=null;try{vt=4,Id(t,e,n,i)}finally{vt=r,Ts.transition=s}}function Id(t,e,n,i){if(cl){var r=Iu(t,e,n,i);if(r===null)Ec(t,e,i,ul,n),Uf(t,i);else if(o0(r,t,e,n,i))i.stopPropagation();else if(Uf(t,i),e&4&&-1<a0.indexOf(t)){for(;r!==null;){var s=Xa(r);if(s!==null&&Zm(s),s=Iu(t,e,n,i),s===null&&Ec(t,e,i,ul,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Ec(t,e,i,null,n)}}var ul=null;function Iu(t,e,n,i){if(ul=null,t=Pd(i),t=Rr(t),t!==null)if(e=Vr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Vm(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return ul=t,null}function ng(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Z_()){case Ld:return 1;case qm:return 4;case ol:case Q_:return 16;case Ym:return 536870912;default:return 16}default:return 16}}var Gi=null,Fd=null,Yo=null;function ig(){if(Yo)return Yo;var t,e=Fd,n=e.length,i,r="value"in Gi?Gi.value:Gi.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var a=n-t;for(i=1;i<=a&&e[n-i]===r[s-i];i++);return Yo=r.slice(t,1<i?1-i:void 0)}function $o(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function lo(){return!0}function Ff(){return!1}function Rn(t){function e(n,i,r,s,a){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?lo:Ff,this.isPropagationStopped=Ff,this}return Dt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=lo)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=lo)},persist:function(){},isPersistent:lo}),e}var Gs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Od=Rn(Gs),Wa=Dt({},Gs,{view:0,detail:0}),d0=Rn(Wa),pc,mc,ea,zl=Dt({},Wa,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:kd,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==ea&&(ea&&t.type==="mousemove"?(pc=t.screenX-ea.screenX,mc=t.screenY-ea.screenY):mc=pc=0,ea=t),pc)},movementY:function(t){return"movementY"in t?t.movementY:mc}}),Of=Rn(zl),f0=Dt({},zl,{dataTransfer:0}),h0=Rn(f0),p0=Dt({},Wa,{relatedTarget:0}),gc=Rn(p0),m0=Dt({},Gs,{animationName:0,elapsedTime:0,pseudoElement:0}),g0=Rn(m0),v0=Dt({},Gs,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),_0=Rn(v0),x0=Dt({},Gs,{data:0}),kf=Rn(x0),y0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},S0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},M0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function E0(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=M0[t])?!!e[t]:!1}function kd(){return E0}var T0=Dt({},Wa,{key:function(t){if(t.key){var e=y0[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=$o(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?S0[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:kd,charCode:function(t){return t.type==="keypress"?$o(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?$o(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),w0=Rn(T0),A0=Dt({},zl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Bf=Rn(A0),C0=Dt({},Wa,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:kd}),R0=Rn(C0),b0=Dt({},Gs,{propertyName:0,elapsedTime:0,pseudoElement:0}),N0=Rn(b0),P0=Dt({},zl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),L0=Rn(P0),D0=[9,13,27,32],Bd=wi&&"CompositionEvent"in window,_a=null;wi&&"documentMode"in document&&(_a=document.documentMode);var U0=wi&&"TextEvent"in window&&!_a,rg=wi&&(!Bd||_a&&8<_a&&11>=_a),zf=" ",Hf=!1;function sg(t,e){switch(t){case"keyup":return D0.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ag(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var us=!1;function I0(t,e){switch(t){case"compositionend":return ag(e);case"keypress":return e.which!==32?null:(Hf=!0,zf);case"textInput":return t=e.data,t===zf&&Hf?null:t;default:return null}}function F0(t,e){if(us)return t==="compositionend"||!Bd&&sg(t,e)?(t=ig(),Yo=Fd=Gi=null,us=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return rg&&e.locale!=="ko"?null:e.data;default:return null}}var O0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function jf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!O0[t.type]:e==="textarea"}function og(t,e,n,i){km(i),e=dl(e,"onChange"),0<e.length&&(n=new Od("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var xa=null,La=null;function k0(t){_g(t,0)}function Hl(t){var e=hs(t);if(Pm(e))return t}function B0(t,e){if(t==="change")return e}var lg=!1;if(wi){var vc;if(wi){var _c="oninput"in document;if(!_c){var Vf=document.createElement("div");Vf.setAttribute("oninput","return;"),_c=typeof Vf.oninput=="function"}vc=_c}else vc=!1;lg=vc&&(!document.documentMode||9<document.documentMode)}function Gf(){xa&&(xa.detachEvent("onpropertychange",cg),La=xa=null)}function cg(t){if(t.propertyName==="value"&&Hl(La)){var e=[];og(e,La,t,Pd(t)),jm(k0,e)}}function z0(t,e,n){t==="focusin"?(Gf(),xa=e,La=n,xa.attachEvent("onpropertychange",cg)):t==="focusout"&&Gf()}function H0(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Hl(La)}function j0(t,e){if(t==="click")return Hl(e)}function V0(t,e){if(t==="input"||t==="change")return Hl(e)}function G0(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Qn=typeof Object.is=="function"?Object.is:G0;function Da(t,e){if(Qn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!vu.call(e,r)||!Qn(t[r],e[r]))return!1}return!0}function Wf(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Xf(t,e){var n=Wf(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Wf(n)}}function ug(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?ug(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function dg(){for(var t=window,e=rl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=rl(t.document)}return e}function zd(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function W0(t){var e=dg(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&ug(n.ownerDocument.documentElement,n)){if(i!==null&&zd(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=Xf(n,s);var a=Xf(n,i);r&&a&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==a.node||t.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var X0=wi&&"documentMode"in document&&11>=document.documentMode,ds=null,Fu=null,ya=null,Ou=!1;function qf(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ou||ds==null||ds!==rl(i)||(i=ds,"selectionStart"in i&&zd(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),ya&&Da(ya,i)||(ya=i,i=dl(Fu,"onSelect"),0<i.length&&(e=new Od("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=ds)))}function co(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var fs={animationend:co("Animation","AnimationEnd"),animationiteration:co("Animation","AnimationIteration"),animationstart:co("Animation","AnimationStart"),transitionend:co("Transition","TransitionEnd")},xc={},fg={};wi&&(fg=document.createElement("div").style,"AnimationEvent"in window||(delete fs.animationend.animation,delete fs.animationiteration.animation,delete fs.animationstart.animation),"TransitionEvent"in window||delete fs.transitionend.transition);function jl(t){if(xc[t])return xc[t];if(!fs[t])return t;var e=fs[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in fg)return xc[t]=e[n];return t}var hg=jl("animationend"),pg=jl("animationiteration"),mg=jl("animationstart"),gg=jl("transitionend"),vg=new Map,Yf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function cr(t,e){vg.set(t,e),jr(e,[t])}for(var yc=0;yc<Yf.length;yc++){var Sc=Yf[yc],q0=Sc.toLowerCase(),Y0=Sc[0].toUpperCase()+Sc.slice(1);cr(q0,"on"+Y0)}cr(hg,"onAnimationEnd");cr(pg,"onAnimationIteration");cr(mg,"onAnimationStart");cr("dblclick","onDoubleClick");cr("focusin","onFocus");cr("focusout","onBlur");cr(gg,"onTransitionEnd");Ns("onMouseEnter",["mouseout","mouseover"]);Ns("onMouseLeave",["mouseout","mouseover"]);Ns("onPointerEnter",["pointerout","pointerover"]);Ns("onPointerLeave",["pointerout","pointerover"]);jr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));jr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));jr("onBeforeInput",["compositionend","keypress","textInput","paste"]);jr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));jr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));jr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var pa="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),$0=new Set("cancel close invalid load scroll toggle".split(" ").concat(pa));function $f(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,q_(i,e,void 0,t),t.currentTarget=null}function _g(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var a=i.length-1;0<=a;a--){var o=i[a],c=o.instance,u=o.currentTarget;if(o=o.listener,c!==s&&r.isPropagationStopped())break e;$f(r,o,u),s=c}else for(a=0;a<i.length;a++){if(o=i[a],c=o.instance,u=o.currentTarget,o=o.listener,c!==s&&r.isPropagationStopped())break e;$f(r,o,u),s=c}}}if(al)throw t=Lu,al=!1,Lu=null,t}function Tt(t,e){var n=e[ju];n===void 0&&(n=e[ju]=new Set);var i=t+"__bubble";n.has(i)||(xg(e,t,2,!1),n.add(i))}function Mc(t,e,n){var i=0;e&&(i|=4),xg(n,t,i,e)}var uo="_reactListening"+Math.random().toString(36).slice(2);function Ua(t){if(!t[uo]){t[uo]=!0,Am.forEach(function(n){n!=="selectionchange"&&($0.has(n)||Mc(n,!1,t),Mc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[uo]||(e[uo]=!0,Mc("selectionchange",!1,e))}}function xg(t,e,n,i){switch(ng(e)){case 1:var r=c0;break;case 4:r=u0;break;default:r=Id}n=r.bind(null,e,n,t),r=void 0,!Pu||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Ec(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var o=i.stateNode.containerInfo;if(o===r||o.nodeType===8&&o.parentNode===r)break;if(a===4)for(a=i.return;a!==null;){var c=a.tag;if((c===3||c===4)&&(c=a.stateNode.containerInfo,c===r||c.nodeType===8&&c.parentNode===r))return;a=a.return}for(;o!==null;){if(a=Rr(o),a===null)return;if(c=a.tag,c===5||c===6){i=s=a;continue e}o=o.parentNode}}i=i.return}jm(function(){var u=s,f=Pd(n),p=[];e:{var h=vg.get(t);if(h!==void 0){var m=Od,x=t;switch(t){case"keypress":if($o(n)===0)break e;case"keydown":case"keyup":m=w0;break;case"focusin":x="focus",m=gc;break;case"focusout":x="blur",m=gc;break;case"beforeblur":case"afterblur":m=gc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=Of;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=h0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=R0;break;case hg:case pg:case mg:m=g0;break;case gg:m=N0;break;case"scroll":m=d0;break;case"wheel":m=L0;break;case"copy":case"cut":case"paste":m=_0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=Bf}var y=(e&4)!==0,g=!y&&t==="scroll",d=y?h!==null?h+"Capture":null:h;y=[];for(var v=u,_;v!==null;){_=v;var T=_.stateNode;if(_.tag===5&&T!==null&&(_=T,d!==null&&(T=Ra(v,d),T!=null&&y.push(Ia(v,T,_)))),g)break;v=v.return}0<y.length&&(h=new m(h,x,null,n,f),p.push({event:h,listeners:y}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",m=t==="mouseout"||t==="pointerout",h&&n!==bu&&(x=n.relatedTarget||n.fromElement)&&(Rr(x)||x[Ai]))break e;if((m||h)&&(h=f.window===f?f:(h=f.ownerDocument)?h.defaultView||h.parentWindow:window,m?(x=n.relatedTarget||n.toElement,m=u,x=x?Rr(x):null,x!==null&&(g=Vr(x),x!==g||x.tag!==5&&x.tag!==6)&&(x=null)):(m=null,x=u),m!==x)){if(y=Of,T="onMouseLeave",d="onMouseEnter",v="mouse",(t==="pointerout"||t==="pointerover")&&(y=Bf,T="onPointerLeave",d="onPointerEnter",v="pointer"),g=m==null?h:hs(m),_=x==null?h:hs(x),h=new y(T,v+"leave",m,n,f),h.target=g,h.relatedTarget=_,T=null,Rr(f)===u&&(y=new y(d,v+"enter",x,n,f),y.target=_,y.relatedTarget=g,T=y),g=T,m&&x)t:{for(y=m,d=x,v=0,_=y;_;_=Gr(_))v++;for(_=0,T=d;T;T=Gr(T))_++;for(;0<v-_;)y=Gr(y),v--;for(;0<_-v;)d=Gr(d),_--;for(;v--;){if(y===d||d!==null&&y===d.alternate)break t;y=Gr(y),d=Gr(d)}y=null}else y=null;m!==null&&Kf(p,h,m,y,!1),x!==null&&g!==null&&Kf(p,g,x,y,!0)}}e:{if(h=u?hs(u):window,m=h.nodeName&&h.nodeName.toLowerCase(),m==="select"||m==="input"&&h.type==="file")var D=B0;else if(jf(h))if(lg)D=V0;else{D=H0;var C=z0}else(m=h.nodeName)&&m.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(D=j0);if(D&&(D=D(t,u))){og(p,D,n,f);break e}C&&C(t,h,u),t==="focusout"&&(C=h._wrapperState)&&C.controlled&&h.type==="number"&&Tu(h,"number",h.value)}switch(C=u?hs(u):window,t){case"focusin":(jf(C)||C.contentEditable==="true")&&(ds=C,Fu=u,ya=null);break;case"focusout":ya=Fu=ds=null;break;case"mousedown":Ou=!0;break;case"contextmenu":case"mouseup":case"dragend":Ou=!1,qf(p,n,f);break;case"selectionchange":if(X0)break;case"keydown":case"keyup":qf(p,n,f)}var A;if(Bd)e:{switch(t){case"compositionstart":var R="onCompositionStart";break e;case"compositionend":R="onCompositionEnd";break e;case"compositionupdate":R="onCompositionUpdate";break e}R=void 0}else us?sg(t,n)&&(R="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(R="onCompositionStart");R&&(rg&&n.locale!=="ko"&&(us||R!=="onCompositionStart"?R==="onCompositionEnd"&&us&&(A=ig()):(Gi=f,Fd="value"in Gi?Gi.value:Gi.textContent,us=!0)),C=dl(u,R),0<C.length&&(R=new kf(R,t,null,n,f),p.push({event:R,listeners:C}),A?R.data=A:(A=ag(n),A!==null&&(R.data=A)))),(A=U0?I0(t,n):F0(t,n))&&(u=dl(u,"onBeforeInput"),0<u.length&&(f=new kf("onBeforeInput","beforeinput",null,n,f),p.push({event:f,listeners:u}),f.data=A))}_g(p,e)})}function Ia(t,e,n){return{instance:t,listener:e,currentTarget:n}}function dl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Ra(t,n),s!=null&&i.unshift(Ia(t,s,r)),s=Ra(t,e),s!=null&&i.push(Ia(t,s,r))),t=t.return}return i}function Gr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Kf(t,e,n,i,r){for(var s=e._reactName,a=[];n!==null&&n!==i;){var o=n,c=o.alternate,u=o.stateNode;if(c!==null&&c===i)break;o.tag===5&&u!==null&&(o=u,r?(c=Ra(n,s),c!=null&&a.unshift(Ia(n,c,o))):r||(c=Ra(n,s),c!=null&&a.push(Ia(n,c,o)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var K0=/\r\n?/g,Z0=/\u0000|\uFFFD/g;function Zf(t){return(typeof t=="string"?t:""+t).replace(K0,`
`).replace(Z0,"")}function fo(t,e,n){if(e=Zf(e),Zf(t)!==e&&n)throw Error(fe(425))}function fl(){}var ku=null,Bu=null;function zu(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Hu=typeof setTimeout=="function"?setTimeout:void 0,Q0=typeof clearTimeout=="function"?clearTimeout:void 0,Qf=typeof Promise=="function"?Promise:void 0,J0=typeof queueMicrotask=="function"?queueMicrotask:typeof Qf<"u"?function(t){return Qf.resolve(null).then(t).catch(ex)}:Hu;function ex(t){setTimeout(function(){throw t})}function Tc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Pa(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Pa(e)}function Ki(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Jf(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Ws=Math.random().toString(36).slice(2),ri="__reactFiber$"+Ws,Fa="__reactProps$"+Ws,Ai="__reactContainer$"+Ws,ju="__reactEvents$"+Ws,tx="__reactListeners$"+Ws,nx="__reactHandles$"+Ws;function Rr(t){var e=t[ri];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Ai]||n[ri]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Jf(t);t!==null;){if(n=t[ri])return n;t=Jf(t)}return e}t=n,n=t.parentNode}return null}function Xa(t){return t=t[ri]||t[Ai],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function hs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(fe(33))}function Vl(t){return t[Fa]||null}var Vu=[],ps=-1;function ur(t){return{current:t}}function At(t){0>ps||(t.current=Vu[ps],Vu[ps]=null,ps--)}function St(t,e){ps++,Vu[ps]=t.current,t.current=e}var sr={},rn=ur(sr),mn=ur(!1),Ir=sr;function Ps(t,e){var n=t.type.contextTypes;if(!n)return sr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function gn(t){return t=t.childContextTypes,t!=null}function hl(){At(mn),At(rn)}function eh(t,e,n){if(rn.current!==sr)throw Error(fe(168));St(rn,e),St(mn,n)}function yg(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(fe(108,z_(t)||"Unknown",r));return Dt({},n,i)}function pl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||sr,Ir=rn.current,St(rn,t),St(mn,mn.current),!0}function th(t,e,n){var i=t.stateNode;if(!i)throw Error(fe(169));n?(t=yg(t,e,Ir),i.__reactInternalMemoizedMergedChildContext=t,At(mn),At(rn),St(rn,t)):At(mn),St(mn,n)}var _i=null,Gl=!1,wc=!1;function Sg(t){_i===null?_i=[t]:_i.push(t)}function ix(t){Gl=!0,Sg(t)}function dr(){if(!wc&&_i!==null){wc=!0;var t=0,e=vt;try{var n=_i;for(vt=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}_i=null,Gl=!1}catch(r){throw _i!==null&&(_i=_i.slice(t+1)),Xm(Ld,dr),r}finally{vt=e,wc=!1}}return null}var ms=[],gs=0,ml=null,gl=0,Ln=[],Dn=0,Fr=null,yi=1,Si="";function Mr(t,e){ms[gs++]=gl,ms[gs++]=ml,ml=t,gl=e}function Mg(t,e,n){Ln[Dn++]=yi,Ln[Dn++]=Si,Ln[Dn++]=Fr,Fr=t;var i=yi;t=Si;var r=32-Kn(i)-1;i&=~(1<<r),n+=1;var s=32-Kn(e)+r;if(30<s){var a=r-r%5;s=(i&(1<<a)-1).toString(32),i>>=a,r-=a,yi=1<<32-Kn(e)+r|n<<r|i,Si=s+t}else yi=1<<s|n<<r|i,Si=t}function Hd(t){t.return!==null&&(Mr(t,1),Mg(t,1,0))}function jd(t){for(;t===ml;)ml=ms[--gs],ms[gs]=null,gl=ms[--gs],ms[gs]=null;for(;t===Fr;)Fr=Ln[--Dn],Ln[Dn]=null,Si=Ln[--Dn],Ln[Dn]=null,yi=Ln[--Dn],Ln[Dn]=null}var wn=null,Tn=null,bt=!1,Yn=null;function Eg(t,e){var n=In(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function nh(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,wn=t,Tn=Ki(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,wn=t,Tn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Fr!==null?{id:yi,overflow:Si}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=In(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,wn=t,Tn=null,!0):!1;default:return!1}}function Gu(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Wu(t){if(bt){var e=Tn;if(e){var n=e;if(!nh(t,e)){if(Gu(t))throw Error(fe(418));e=Ki(n.nextSibling);var i=wn;e&&nh(t,e)?Eg(i,n):(t.flags=t.flags&-4097|2,bt=!1,wn=t)}}else{if(Gu(t))throw Error(fe(418));t.flags=t.flags&-4097|2,bt=!1,wn=t}}}function ih(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;wn=t}function ho(t){if(t!==wn)return!1;if(!bt)return ih(t),bt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!zu(t.type,t.memoizedProps)),e&&(e=Tn)){if(Gu(t))throw Tg(),Error(fe(418));for(;e;)Eg(t,e),e=Ki(e.nextSibling)}if(ih(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(fe(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Tn=Ki(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Tn=null}}else Tn=wn?Ki(t.stateNode.nextSibling):null;return!0}function Tg(){for(var t=Tn;t;)t=Ki(t.nextSibling)}function Ls(){Tn=wn=null,bt=!1}function Vd(t){Yn===null?Yn=[t]:Yn.push(t)}var rx=Ni.ReactCurrentBatchConfig;function ta(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(fe(309));var i=n.stateNode}if(!i)throw Error(fe(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(a){var o=r.refs;a===null?delete o[s]:o[s]=a},e._stringRef=s,e)}if(typeof t!="string")throw Error(fe(284));if(!n._owner)throw Error(fe(290,t))}return t}function po(t,e){throw t=Object.prototype.toString.call(e),Error(fe(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function rh(t){var e=t._init;return e(t._payload)}function wg(t){function e(d,v){if(t){var _=d.deletions;_===null?(d.deletions=[v],d.flags|=16):_.push(v)}}function n(d,v){if(!t)return null;for(;v!==null;)e(d,v),v=v.sibling;return null}function i(d,v){for(d=new Map;v!==null;)v.key!==null?d.set(v.key,v):d.set(v.index,v),v=v.sibling;return d}function r(d,v){return d=er(d,v),d.index=0,d.sibling=null,d}function s(d,v,_){return d.index=_,t?(_=d.alternate,_!==null?(_=_.index,_<v?(d.flags|=2,v):_):(d.flags|=2,v)):(d.flags|=1048576,v)}function a(d){return t&&d.alternate===null&&(d.flags|=2),d}function o(d,v,_,T){return v===null||v.tag!==6?(v=Lc(_,d.mode,T),v.return=d,v):(v=r(v,_),v.return=d,v)}function c(d,v,_,T){var D=_.type;return D===cs?f(d,v,_.props.children,T,_.key):v!==null&&(v.elementType===D||typeof D=="object"&&D!==null&&D.$$typeof===Bi&&rh(D)===v.type)?(T=r(v,_.props),T.ref=ta(d,v,_),T.return=d,T):(T=nl(_.type,_.key,_.props,null,d.mode,T),T.ref=ta(d,v,_),T.return=d,T)}function u(d,v,_,T){return v===null||v.tag!==4||v.stateNode.containerInfo!==_.containerInfo||v.stateNode.implementation!==_.implementation?(v=Dc(_,d.mode,T),v.return=d,v):(v=r(v,_.children||[]),v.return=d,v)}function f(d,v,_,T,D){return v===null||v.tag!==7?(v=Ur(_,d.mode,T,D),v.return=d,v):(v=r(v,_),v.return=d,v)}function p(d,v,_){if(typeof v=="string"&&v!==""||typeof v=="number")return v=Lc(""+v,d.mode,_),v.return=d,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case no:return _=nl(v.type,v.key,v.props,null,d.mode,_),_.ref=ta(d,null,v),_.return=d,_;case ls:return v=Dc(v,d.mode,_),v.return=d,v;case Bi:var T=v._init;return p(d,T(v._payload),_)}if(fa(v)||Ks(v))return v=Ur(v,d.mode,_,null),v.return=d,v;po(d,v)}return null}function h(d,v,_,T){var D=v!==null?v.key:null;if(typeof _=="string"&&_!==""||typeof _=="number")return D!==null?null:o(d,v,""+_,T);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case no:return _.key===D?c(d,v,_,T):null;case ls:return _.key===D?u(d,v,_,T):null;case Bi:return D=_._init,h(d,v,D(_._payload),T)}if(fa(_)||Ks(_))return D!==null?null:f(d,v,_,T,null);po(d,_)}return null}function m(d,v,_,T,D){if(typeof T=="string"&&T!==""||typeof T=="number")return d=d.get(_)||null,o(v,d,""+T,D);if(typeof T=="object"&&T!==null){switch(T.$$typeof){case no:return d=d.get(T.key===null?_:T.key)||null,c(v,d,T,D);case ls:return d=d.get(T.key===null?_:T.key)||null,u(v,d,T,D);case Bi:var C=T._init;return m(d,v,_,C(T._payload),D)}if(fa(T)||Ks(T))return d=d.get(_)||null,f(v,d,T,D,null);po(v,T)}return null}function x(d,v,_,T){for(var D=null,C=null,A=v,R=v=0,E=null;A!==null&&R<_.length;R++){A.index>R?(E=A,A=null):E=A.sibling;var S=h(d,A,_[R],T);if(S===null){A===null&&(A=E);break}t&&A&&S.alternate===null&&e(d,A),v=s(S,v,R),C===null?D=S:C.sibling=S,C=S,A=E}if(R===_.length)return n(d,A),bt&&Mr(d,R),D;if(A===null){for(;R<_.length;R++)A=p(d,_[R],T),A!==null&&(v=s(A,v,R),C===null?D=A:C.sibling=A,C=A);return bt&&Mr(d,R),D}for(A=i(d,A);R<_.length;R++)E=m(A,d,R,_[R],T),E!==null&&(t&&E.alternate!==null&&A.delete(E.key===null?R:E.key),v=s(E,v,R),C===null?D=E:C.sibling=E,C=E);return t&&A.forEach(function(N){return e(d,N)}),bt&&Mr(d,R),D}function y(d,v,_,T){var D=Ks(_);if(typeof D!="function")throw Error(fe(150));if(_=D.call(_),_==null)throw Error(fe(151));for(var C=D=null,A=v,R=v=0,E=null,S=_.next();A!==null&&!S.done;R++,S=_.next()){A.index>R?(E=A,A=null):E=A.sibling;var N=h(d,A,S.value,T);if(N===null){A===null&&(A=E);break}t&&A&&N.alternate===null&&e(d,A),v=s(N,v,R),C===null?D=N:C.sibling=N,C=N,A=E}if(S.done)return n(d,A),bt&&Mr(d,R),D;if(A===null){for(;!S.done;R++,S=_.next())S=p(d,S.value,T),S!==null&&(v=s(S,v,R),C===null?D=S:C.sibling=S,C=S);return bt&&Mr(d,R),D}for(A=i(d,A);!S.done;R++,S=_.next())S=m(A,d,R,S.value,T),S!==null&&(t&&S.alternate!==null&&A.delete(S.key===null?R:S.key),v=s(S,v,R),C===null?D=S:C.sibling=S,C=S);return t&&A.forEach(function(G){return e(d,G)}),bt&&Mr(d,R),D}function g(d,v,_,T){if(typeof _=="object"&&_!==null&&_.type===cs&&_.key===null&&(_=_.props.children),typeof _=="object"&&_!==null){switch(_.$$typeof){case no:e:{for(var D=_.key,C=v;C!==null;){if(C.key===D){if(D=_.type,D===cs){if(C.tag===7){n(d,C.sibling),v=r(C,_.props.children),v.return=d,d=v;break e}}else if(C.elementType===D||typeof D=="object"&&D!==null&&D.$$typeof===Bi&&rh(D)===C.type){n(d,C.sibling),v=r(C,_.props),v.ref=ta(d,C,_),v.return=d,d=v;break e}n(d,C);break}else e(d,C);C=C.sibling}_.type===cs?(v=Ur(_.props.children,d.mode,T,_.key),v.return=d,d=v):(T=nl(_.type,_.key,_.props,null,d.mode,T),T.ref=ta(d,v,_),T.return=d,d=T)}return a(d);case ls:e:{for(C=_.key;v!==null;){if(v.key===C)if(v.tag===4&&v.stateNode.containerInfo===_.containerInfo&&v.stateNode.implementation===_.implementation){n(d,v.sibling),v=r(v,_.children||[]),v.return=d,d=v;break e}else{n(d,v);break}else e(d,v);v=v.sibling}v=Dc(_,d.mode,T),v.return=d,d=v}return a(d);case Bi:return C=_._init,g(d,v,C(_._payload),T)}if(fa(_))return x(d,v,_,T);if(Ks(_))return y(d,v,_,T);po(d,_)}return typeof _=="string"&&_!==""||typeof _=="number"?(_=""+_,v!==null&&v.tag===6?(n(d,v.sibling),v=r(v,_),v.return=d,d=v):(n(d,v),v=Lc(_,d.mode,T),v.return=d,d=v),a(d)):n(d,v)}return g}var Ds=wg(!0),Ag=wg(!1),vl=ur(null),_l=null,vs=null,Gd=null;function Wd(){Gd=vs=_l=null}function Xd(t){var e=vl.current;At(vl),t._currentValue=e}function Xu(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function ws(t,e){_l=t,Gd=vs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(pn=!0),t.firstContext=null)}function Bn(t){var e=t._currentValue;if(Gd!==t)if(t={context:t,memoizedValue:e,next:null},vs===null){if(_l===null)throw Error(fe(308));vs=t,_l.dependencies={lanes:0,firstContext:t}}else vs=vs.next=t;return e}var br=null;function qd(t){br===null?br=[t]:br.push(t)}function Cg(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,qd(e)):(n.next=r.next,r.next=n),e.interleaved=n,Ci(t,i)}function Ci(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var zi=!1;function Yd(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Rg(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Ti(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Zi(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,ut&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Ci(t,n)}return r=i.interleaved,r===null?(e.next=e,qd(i)):(e.next=r.next,r.next=e),i.interleaved=e,Ci(t,n)}function Ko(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Dd(t,n)}}function sh(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function xl(t,e,n,i){var r=t.updateQueue;zi=!1;var s=r.firstBaseUpdate,a=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var c=o,u=c.next;c.next=null,a===null?s=u:a.next=u,a=c;var f=t.alternate;f!==null&&(f=f.updateQueue,o=f.lastBaseUpdate,o!==a&&(o===null?f.firstBaseUpdate=u:o.next=u,f.lastBaseUpdate=c))}if(s!==null){var p=r.baseState;a=0,f=u=c=null,o=s;do{var h=o.lane,m=o.eventTime;if((i&h)===h){f!==null&&(f=f.next={eventTime:m,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var x=t,y=o;switch(h=e,m=n,y.tag){case 1:if(x=y.payload,typeof x=="function"){p=x.call(m,p,h);break e}p=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=y.payload,h=typeof x=="function"?x.call(m,p,h):x,h==null)break e;p=Dt({},p,h);break e;case 2:zi=!0}}o.callback!==null&&o.lane!==0&&(t.flags|=64,h=r.effects,h===null?r.effects=[o]:h.push(o))}else m={eventTime:m,lane:h,tag:o.tag,payload:o.payload,callback:o.callback,next:null},f===null?(u=f=m,c=p):f=f.next=m,a|=h;if(o=o.next,o===null){if(o=r.shared.pending,o===null)break;h=o,o=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);if(f===null&&(c=p),r.baseState=c,r.firstBaseUpdate=u,r.lastBaseUpdate=f,e=r.shared.interleaved,e!==null){r=e;do a|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);kr|=a,t.lanes=a,t.memoizedState=p}}function ah(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(fe(191,r));r.call(i)}}}var qa={},li=ur(qa),Oa=ur(qa),ka=ur(qa);function Nr(t){if(t===qa)throw Error(fe(174));return t}function $d(t,e){switch(St(ka,e),St(Oa,t),St(li,qa),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Au(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Au(e,t)}At(li),St(li,e)}function Us(){At(li),At(Oa),At(ka)}function bg(t){Nr(ka.current);var e=Nr(li.current),n=Au(e,t.type);e!==n&&(St(Oa,t),St(li,n))}function Kd(t){Oa.current===t&&(At(li),At(Oa))}var Pt=ur(0);function yl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Ac=[];function Zd(){for(var t=0;t<Ac.length;t++)Ac[t]._workInProgressVersionPrimary=null;Ac.length=0}var Zo=Ni.ReactCurrentDispatcher,Cc=Ni.ReactCurrentBatchConfig,Or=0,Lt=null,zt=null,Xt=null,Sl=!1,Sa=!1,Ba=0,sx=0;function Qt(){throw Error(fe(321))}function Qd(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Qn(t[n],e[n]))return!1;return!0}function Jd(t,e,n,i,r,s){if(Or=s,Lt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Zo.current=t===null||t.memoizedState===null?cx:ux,t=n(i,r),Sa){s=0;do{if(Sa=!1,Ba=0,25<=s)throw Error(fe(301));s+=1,Xt=zt=null,e.updateQueue=null,Zo.current=dx,t=n(i,r)}while(Sa)}if(Zo.current=Ml,e=zt!==null&&zt.next!==null,Or=0,Xt=zt=Lt=null,Sl=!1,e)throw Error(fe(300));return t}function ef(){var t=Ba!==0;return Ba=0,t}function ti(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Xt===null?Lt.memoizedState=Xt=t:Xt=Xt.next=t,Xt}function zn(){if(zt===null){var t=Lt.alternate;t=t!==null?t.memoizedState:null}else t=zt.next;var e=Xt===null?Lt.memoizedState:Xt.next;if(e!==null)Xt=e,zt=t;else{if(t===null)throw Error(fe(310));zt=t,t={memoizedState:zt.memoizedState,baseState:zt.baseState,baseQueue:zt.baseQueue,queue:zt.queue,next:null},Xt===null?Lt.memoizedState=Xt=t:Xt=Xt.next=t}return Xt}function za(t,e){return typeof e=="function"?e(t):e}function Rc(t){var e=zn(),n=e.queue;if(n===null)throw Error(fe(311));n.lastRenderedReducer=t;var i=zt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var a=r.next;r.next=s.next,s.next=a}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var o=a=null,c=null,u=s;do{var f=u.lane;if((Or&f)===f)c!==null&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),i=u.hasEagerState?u.eagerState:t(i,u.action);else{var p={lane:f,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};c===null?(o=c=p,a=i):c=c.next=p,Lt.lanes|=f,kr|=f}u=u.next}while(u!==null&&u!==s);c===null?a=i:c.next=o,Qn(i,e.memoizedState)||(pn=!0),e.memoizedState=i,e.baseState=a,e.baseQueue=c,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,Lt.lanes|=s,kr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function bc(t){var e=zn(),n=e.queue;if(n===null)throw Error(fe(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var a=r=r.next;do s=t(s,a.action),a=a.next;while(a!==r);Qn(s,e.memoizedState)||(pn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function Ng(){}function Pg(t,e){var n=Lt,i=zn(),r=e(),s=!Qn(i.memoizedState,r);if(s&&(i.memoizedState=r,pn=!0),i=i.queue,tf(Ug.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Xt!==null&&Xt.memoizedState.tag&1){if(n.flags|=2048,Ha(9,Dg.bind(null,n,i,r,e),void 0,null),qt===null)throw Error(fe(349));Or&30||Lg(n,e,r)}return r}function Lg(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Lt.updateQueue,e===null?(e={lastEffect:null,stores:null},Lt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Dg(t,e,n,i){e.value=n,e.getSnapshot=i,Ig(e)&&Fg(t)}function Ug(t,e,n){return n(function(){Ig(e)&&Fg(t)})}function Ig(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Qn(t,n)}catch{return!0}}function Fg(t){var e=Ci(t,1);e!==null&&Zn(e,t,1,-1)}function oh(t){var e=ti();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:za,lastRenderedState:t},e.queue=t,t=t.dispatch=lx.bind(null,Lt,t),[e.memoizedState,t]}function Ha(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=Lt.updateQueue,e===null?(e={lastEffect:null,stores:null},Lt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function Og(){return zn().memoizedState}function Qo(t,e,n,i){var r=ti();Lt.flags|=t,r.memoizedState=Ha(1|e,n,void 0,i===void 0?null:i)}function Wl(t,e,n,i){var r=zn();i=i===void 0?null:i;var s=void 0;if(zt!==null){var a=zt.memoizedState;if(s=a.destroy,i!==null&&Qd(i,a.deps)){r.memoizedState=Ha(e,n,s,i);return}}Lt.flags|=t,r.memoizedState=Ha(1|e,n,s,i)}function lh(t,e){return Qo(8390656,8,t,e)}function tf(t,e){return Wl(2048,8,t,e)}function kg(t,e){return Wl(4,2,t,e)}function Bg(t,e){return Wl(4,4,t,e)}function zg(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Hg(t,e,n){return n=n!=null?n.concat([t]):null,Wl(4,4,zg.bind(null,e,t),n)}function nf(){}function jg(t,e){var n=zn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Qd(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function Vg(t,e){var n=zn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Qd(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function Gg(t,e,n){return Or&21?(Qn(n,e)||(n=$m(),Lt.lanes|=n,kr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,pn=!0),t.memoizedState=n)}function ax(t,e){var n=vt;vt=n!==0&&4>n?n:4,t(!0);var i=Cc.transition;Cc.transition={};try{t(!1),e()}finally{vt=n,Cc.transition=i}}function Wg(){return zn().memoizedState}function ox(t,e,n){var i=Ji(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},Xg(t))qg(e,n);else if(n=Cg(t,e,n,i),n!==null){var r=ln();Zn(n,t,i,r),Yg(n,e,i)}}function lx(t,e,n){var i=Ji(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(Xg(t))qg(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var a=e.lastRenderedState,o=s(a,n);if(r.hasEagerState=!0,r.eagerState=o,Qn(o,a)){var c=e.interleaved;c===null?(r.next=r,qd(e)):(r.next=c.next,c.next=r),e.interleaved=r;return}}catch{}finally{}n=Cg(t,e,r,i),n!==null&&(r=ln(),Zn(n,t,i,r),Yg(n,e,i))}}function Xg(t){var e=t.alternate;return t===Lt||e!==null&&e===Lt}function qg(t,e){Sa=Sl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Yg(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Dd(t,n)}}var Ml={readContext:Bn,useCallback:Qt,useContext:Qt,useEffect:Qt,useImperativeHandle:Qt,useInsertionEffect:Qt,useLayoutEffect:Qt,useMemo:Qt,useReducer:Qt,useRef:Qt,useState:Qt,useDebugValue:Qt,useDeferredValue:Qt,useTransition:Qt,useMutableSource:Qt,useSyncExternalStore:Qt,useId:Qt,unstable_isNewReconciler:!1},cx={readContext:Bn,useCallback:function(t,e){return ti().memoizedState=[t,e===void 0?null:e],t},useContext:Bn,useEffect:lh,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Qo(4194308,4,zg.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Qo(4194308,4,t,e)},useInsertionEffect:function(t,e){return Qo(4,2,t,e)},useMemo:function(t,e){var n=ti();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=ti();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=ox.bind(null,Lt,t),[i.memoizedState,t]},useRef:function(t){var e=ti();return t={current:t},e.memoizedState=t},useState:oh,useDebugValue:nf,useDeferredValue:function(t){return ti().memoizedState=t},useTransition:function(){var t=oh(!1),e=t[0];return t=ax.bind(null,t[1]),ti().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=Lt,r=ti();if(bt){if(n===void 0)throw Error(fe(407));n=n()}else{if(n=e(),qt===null)throw Error(fe(349));Or&30||Lg(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,lh(Ug.bind(null,i,s,t),[t]),i.flags|=2048,Ha(9,Dg.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=ti(),e=qt.identifierPrefix;if(bt){var n=Si,i=yi;n=(i&~(1<<32-Kn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=Ba++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=sx++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},ux={readContext:Bn,useCallback:jg,useContext:Bn,useEffect:tf,useImperativeHandle:Hg,useInsertionEffect:kg,useLayoutEffect:Bg,useMemo:Vg,useReducer:Rc,useRef:Og,useState:function(){return Rc(za)},useDebugValue:nf,useDeferredValue:function(t){var e=zn();return Gg(e,zt.memoizedState,t)},useTransition:function(){var t=Rc(za)[0],e=zn().memoizedState;return[t,e]},useMutableSource:Ng,useSyncExternalStore:Pg,useId:Wg,unstable_isNewReconciler:!1},dx={readContext:Bn,useCallback:jg,useContext:Bn,useEffect:tf,useImperativeHandle:Hg,useInsertionEffect:kg,useLayoutEffect:Bg,useMemo:Vg,useReducer:bc,useRef:Og,useState:function(){return bc(za)},useDebugValue:nf,useDeferredValue:function(t){var e=zn();return zt===null?e.memoizedState=t:Gg(e,zt.memoizedState,t)},useTransition:function(){var t=bc(za)[0],e=zn().memoizedState;return[t,e]},useMutableSource:Ng,useSyncExternalStore:Pg,useId:Wg,unstable_isNewReconciler:!1};function Xn(t,e){if(t&&t.defaultProps){e=Dt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function qu(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:Dt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Xl={isMounted:function(t){return(t=t._reactInternals)?Vr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=ln(),r=Ji(t),s=Ti(i,r);s.payload=e,n!=null&&(s.callback=n),e=Zi(t,s,r),e!==null&&(Zn(e,t,r,i),Ko(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=ln(),r=Ji(t),s=Ti(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Zi(t,s,r),e!==null&&(Zn(e,t,r,i),Ko(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ln(),i=Ji(t),r=Ti(n,i);r.tag=2,e!=null&&(r.callback=e),e=Zi(t,r,i),e!==null&&(Zn(e,t,i,n),Ko(e,t,i))}};function ch(t,e,n,i,r,s,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,a):e.prototype&&e.prototype.isPureReactComponent?!Da(n,i)||!Da(r,s):!0}function $g(t,e,n){var i=!1,r=sr,s=e.contextType;return typeof s=="object"&&s!==null?s=Bn(s):(r=gn(e)?Ir:rn.current,i=e.contextTypes,s=(i=i!=null)?Ps(t,r):sr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Xl,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function uh(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Xl.enqueueReplaceState(e,e.state,null)}function Yu(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Yd(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Bn(s):(s=gn(e)?Ir:rn.current,r.context=Ps(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(qu(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Xl.enqueueReplaceState(r,r.state,null),xl(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Is(t,e){try{var n="",i=e;do n+=B_(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Nc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function $u(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var fx=typeof WeakMap=="function"?WeakMap:Map;function Kg(t,e,n){n=Ti(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Tl||(Tl=!0,sd=i),$u(t,e)},n}function Zg(t,e,n){n=Ti(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){$u(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){$u(t,e),typeof i!="function"&&(Qi===null?Qi=new Set([this]):Qi.add(this));var a=e.stack;this.componentDidCatch(e.value,{componentStack:a!==null?a:""})}),n}function dh(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new fx;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=Ax.bind(null,t,e,n),e.then(t,t))}function fh(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function hh(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Ti(-1,1),e.tag=2,Zi(n,e,1))),n.lanes|=1),t)}var hx=Ni.ReactCurrentOwner,pn=!1;function on(t,e,n,i){e.child=t===null?Ag(e,null,n,i):Ds(e,t.child,n,i)}function ph(t,e,n,i,r){n=n.render;var s=e.ref;return ws(e,r),i=Jd(t,e,n,i,s,r),n=ef(),t!==null&&!pn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ri(t,e,r)):(bt&&n&&Hd(e),e.flags|=1,on(t,e,i,r),e.child)}function mh(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!df(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,Qg(t,e,s,i,r)):(t=nl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:Da,n(a,i)&&t.ref===e.ref)return Ri(t,e,r)}return e.flags|=1,t=er(s,i),t.ref=e.ref,t.return=e,e.child=t}function Qg(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(Da(s,i)&&t.ref===e.ref)if(pn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(pn=!0);else return e.lanes=t.lanes,Ri(t,e,r)}return Ku(t,e,n,i,r)}function Jg(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},St(xs,En),En|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,St(xs,En),En|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,St(xs,En),En|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,St(xs,En),En|=i;return on(t,e,r,n),e.child}function ev(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Ku(t,e,n,i,r){var s=gn(n)?Ir:rn.current;return s=Ps(e,s),ws(e,r),n=Jd(t,e,n,i,s,r),i=ef(),t!==null&&!pn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ri(t,e,r)):(bt&&i&&Hd(e),e.flags|=1,on(t,e,n,r),e.child)}function gh(t,e,n,i,r){if(gn(n)){var s=!0;pl(e)}else s=!1;if(ws(e,r),e.stateNode===null)Jo(t,e),$g(e,n,i),Yu(e,n,i,r),i=!0;else if(t===null){var a=e.stateNode,o=e.memoizedProps;a.props=o;var c=a.context,u=n.contextType;typeof u=="object"&&u!==null?u=Bn(u):(u=gn(n)?Ir:rn.current,u=Ps(e,u));var f=n.getDerivedStateFromProps,p=typeof f=="function"||typeof a.getSnapshotBeforeUpdate=="function";p||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==i||c!==u)&&uh(e,a,i,u),zi=!1;var h=e.memoizedState;a.state=h,xl(e,i,a,r),c=e.memoizedState,o!==i||h!==c||mn.current||zi?(typeof f=="function"&&(qu(e,n,f,i),c=e.memoizedState),(o=zi||ch(e,n,o,i,h,c,u))?(p||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=c),a.props=i,a.state=c,a.context=u,i=o):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{a=e.stateNode,Rg(t,e),o=e.memoizedProps,u=e.type===e.elementType?o:Xn(e.type,o),a.props=u,p=e.pendingProps,h=a.context,c=n.contextType,typeof c=="object"&&c!==null?c=Bn(c):(c=gn(n)?Ir:rn.current,c=Ps(e,c));var m=n.getDerivedStateFromProps;(f=typeof m=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==p||h!==c)&&uh(e,a,i,c),zi=!1,h=e.memoizedState,a.state=h,xl(e,i,a,r);var x=e.memoizedState;o!==p||h!==x||mn.current||zi?(typeof m=="function"&&(qu(e,n,m,i),x=e.memoizedState),(u=zi||ch(e,n,u,i,h,x,c)||!1)?(f||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,x,c),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,x,c)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=x),a.props=i,a.state=x,a.context=c,i=u):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),i=!1)}return Zu(t,e,n,i,s,r)}function Zu(t,e,n,i,r,s){ev(t,e);var a=(e.flags&128)!==0;if(!i&&!a)return r&&th(e,n,!1),Ri(t,e,s);i=e.stateNode,hx.current=e;var o=a&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&a?(e.child=Ds(e,t.child,null,s),e.child=Ds(e,null,o,s)):on(t,e,o,s),e.memoizedState=i.state,r&&th(e,n,!0),e.child}function tv(t){var e=t.stateNode;e.pendingContext?eh(t,e.pendingContext,e.pendingContext!==e.context):e.context&&eh(t,e.context,!1),$d(t,e.containerInfo)}function vh(t,e,n,i,r){return Ls(),Vd(r),e.flags|=256,on(t,e,n,i),e.child}var Qu={dehydrated:null,treeContext:null,retryLane:0};function Ju(t){return{baseLanes:t,cachePool:null,transitions:null}}function nv(t,e,n){var i=e.pendingProps,r=Pt.current,s=!1,a=(e.flags&128)!==0,o;if((o=a)||(o=t!==null&&t.memoizedState===null?!1:(r&2)!==0),o?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),St(Pt,r&1),t===null)return Wu(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(a=i.children,t=i.fallback,s?(i=e.mode,s=e.child,a={mode:"hidden",children:a},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=$l(a,i,0,null),t=Ur(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Ju(n),e.memoizedState=Qu,t):rf(e,a));if(r=t.memoizedState,r!==null&&(o=r.dehydrated,o!==null))return px(t,e,a,i,o,r,n);if(s){s=i.fallback,a=e.mode,r=t.child,o=r.sibling;var c={mode:"hidden",children:i.children};return!(a&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=c,e.deletions=null):(i=er(r,c),i.subtreeFlags=r.subtreeFlags&14680064),o!==null?s=er(o,s):(s=Ur(s,a,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,a=t.child.memoizedState,a=a===null?Ju(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=t.childLanes&~n,e.memoizedState=Qu,i}return s=t.child,t=s.sibling,i=er(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function rf(t,e){return e=$l({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function mo(t,e,n,i){return i!==null&&Vd(i),Ds(e,t.child,null,n),t=rf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function px(t,e,n,i,r,s,a){if(n)return e.flags&256?(e.flags&=-257,i=Nc(Error(fe(422))),mo(t,e,a,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=$l({mode:"visible",children:i.children},r,0,null),s=Ur(s,r,a,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Ds(e,t.child,null,a),e.child.memoizedState=Ju(a),e.memoizedState=Qu,s);if(!(e.mode&1))return mo(t,e,a,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var o=i.dgst;return i=o,s=Error(fe(419)),i=Nc(s,i,void 0),mo(t,e,a,i)}if(o=(a&t.childLanes)!==0,pn||o){if(i=qt,i!==null){switch(a&-a){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|a)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Ci(t,r),Zn(i,t,r,-1))}return uf(),i=Nc(Error(fe(421))),mo(t,e,a,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=Cx.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,Tn=Ki(r.nextSibling),wn=e,bt=!0,Yn=null,t!==null&&(Ln[Dn++]=yi,Ln[Dn++]=Si,Ln[Dn++]=Fr,yi=t.id,Si=t.overflow,Fr=e),e=rf(e,i.children),e.flags|=4096,e)}function _h(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),Xu(t.return,e,n)}function Pc(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function iv(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(on(t,e,i.children,n),i=Pt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&_h(t,n,e);else if(t.tag===19)_h(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(St(Pt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&yl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Pc(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&yl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Pc(e,!0,n,null,s);break;case"together":Pc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Jo(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Ri(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),kr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(fe(153));if(e.child!==null){for(t=e.child,n=er(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=er(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function mx(t,e,n){switch(e.tag){case 3:tv(e),Ls();break;case 5:bg(e);break;case 1:gn(e.type)&&pl(e);break;case 4:$d(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;St(vl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(St(Pt,Pt.current&1),e.flags|=128,null):n&e.child.childLanes?nv(t,e,n):(St(Pt,Pt.current&1),t=Ri(t,e,n),t!==null?t.sibling:null);St(Pt,Pt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return iv(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),St(Pt,Pt.current),i)break;return null;case 22:case 23:return e.lanes=0,Jg(t,e,n)}return Ri(t,e,n)}var rv,ed,sv,av;rv=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};ed=function(){};sv=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Nr(li.current);var s=null;switch(n){case"input":r=Mu(t,r),i=Mu(t,i),s=[];break;case"select":r=Dt({},r,{value:void 0}),i=Dt({},i,{value:void 0}),s=[];break;case"textarea":r=wu(t,r),i=wu(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=fl)}Cu(n,i);var a;n=null;for(u in r)if(!i.hasOwnProperty(u)&&r.hasOwnProperty(u)&&r[u]!=null)if(u==="style"){var o=r[u];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Aa.hasOwnProperty(u)?s||(s=[]):(s=s||[]).push(u,null));for(u in i){var c=i[u];if(o=r!=null?r[u]:void 0,i.hasOwnProperty(u)&&c!==o&&(c!=null||o!=null))if(u==="style")if(o){for(a in o)!o.hasOwnProperty(a)||c&&c.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in c)c.hasOwnProperty(a)&&o[a]!==c[a]&&(n||(n={}),n[a]=c[a])}else n||(s||(s=[]),s.push(u,n)),n=c;else u==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,o=o?o.__html:void 0,c!=null&&o!==c&&(s=s||[]).push(u,c)):u==="children"?typeof c!="string"&&typeof c!="number"||(s=s||[]).push(u,""+c):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Aa.hasOwnProperty(u)?(c!=null&&u==="onScroll"&&Tt("scroll",t),s||o===c||(s=[])):(s=s||[]).push(u,c))}n&&(s=s||[]).push("style",n);var u=s;(e.updateQueue=u)&&(e.flags|=4)}};av=function(t,e,n,i){n!==i&&(e.flags|=4)};function na(t,e){if(!bt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Jt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function gx(t,e,n){var i=e.pendingProps;switch(jd(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Jt(e),null;case 1:return gn(e.type)&&hl(),Jt(e),null;case 3:return i=e.stateNode,Us(),At(mn),At(rn),Zd(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(ho(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Yn!==null&&(ld(Yn),Yn=null))),ed(t,e),Jt(e),null;case 5:Kd(e);var r=Nr(ka.current);if(n=e.type,t!==null&&e.stateNode!=null)sv(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(fe(166));return Jt(e),null}if(t=Nr(li.current),ho(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[ri]=e,i[Fa]=s,t=(e.mode&1)!==0,n){case"dialog":Tt("cancel",i),Tt("close",i);break;case"iframe":case"object":case"embed":Tt("load",i);break;case"video":case"audio":for(r=0;r<pa.length;r++)Tt(pa[r],i);break;case"source":Tt("error",i);break;case"img":case"image":case"link":Tt("error",i),Tt("load",i);break;case"details":Tt("toggle",i);break;case"input":Cf(i,s),Tt("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},Tt("invalid",i);break;case"textarea":bf(i,s),Tt("invalid",i)}Cu(n,s),r=null;for(var a in s)if(s.hasOwnProperty(a)){var o=s[a];a==="children"?typeof o=="string"?i.textContent!==o&&(s.suppressHydrationWarning!==!0&&fo(i.textContent,o,t),r=["children",o]):typeof o=="number"&&i.textContent!==""+o&&(s.suppressHydrationWarning!==!0&&fo(i.textContent,o,t),r=["children",""+o]):Aa.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&Tt("scroll",i)}switch(n){case"input":io(i),Rf(i,s,!0);break;case"textarea":io(i),Nf(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=fl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{a=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Um(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=a.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=a.createElement(n,{is:i.is}):(t=a.createElement(n),n==="select"&&(a=t,i.multiple?a.multiple=!0:i.size&&(a.size=i.size))):t=a.createElementNS(t,n),t[ri]=e,t[Fa]=i,rv(t,e,!1,!1),e.stateNode=t;e:{switch(a=Ru(n,i),n){case"dialog":Tt("cancel",t),Tt("close",t),r=i;break;case"iframe":case"object":case"embed":Tt("load",t),r=i;break;case"video":case"audio":for(r=0;r<pa.length;r++)Tt(pa[r],t);r=i;break;case"source":Tt("error",t),r=i;break;case"img":case"image":case"link":Tt("error",t),Tt("load",t),r=i;break;case"details":Tt("toggle",t),r=i;break;case"input":Cf(t,i),r=Mu(t,i),Tt("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=Dt({},i,{value:void 0}),Tt("invalid",t);break;case"textarea":bf(t,i),r=wu(t,i),Tt("invalid",t);break;default:r=i}Cu(n,r),o=r;for(s in o)if(o.hasOwnProperty(s)){var c=o[s];s==="style"?Om(t,c):s==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Im(t,c)):s==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&Ca(t,c):typeof c=="number"&&Ca(t,""+c):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Aa.hasOwnProperty(s)?c!=null&&s==="onScroll"&&Tt("scroll",t):c!=null&&Cd(t,s,c,a))}switch(n){case"input":io(t),Rf(t,i,!1);break;case"textarea":io(t),Nf(t);break;case"option":i.value!=null&&t.setAttribute("value",""+rr(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?Ss(t,!!i.multiple,s,!1):i.defaultValue!=null&&Ss(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=fl)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Jt(e),null;case 6:if(t&&e.stateNode!=null)av(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(fe(166));if(n=Nr(ka.current),Nr(li.current),ho(e)){if(i=e.stateNode,n=e.memoizedProps,i[ri]=e,(s=i.nodeValue!==n)&&(t=wn,t!==null))switch(t.tag){case 3:fo(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&fo(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[ri]=e,e.stateNode=i}return Jt(e),null;case 13:if(At(Pt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(bt&&Tn!==null&&e.mode&1&&!(e.flags&128))Tg(),Ls(),e.flags|=98560,s=!1;else if(s=ho(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(fe(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(fe(317));s[ri]=e}else Ls(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Jt(e),s=!1}else Yn!==null&&(ld(Yn),Yn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||Pt.current&1?Ht===0&&(Ht=3):uf())),e.updateQueue!==null&&(e.flags|=4),Jt(e),null);case 4:return Us(),ed(t,e),t===null&&Ua(e.stateNode.containerInfo),Jt(e),null;case 10:return Xd(e.type._context),Jt(e),null;case 17:return gn(e.type)&&hl(),Jt(e),null;case 19:if(At(Pt),s=e.memoizedState,s===null)return Jt(e),null;if(i=(e.flags&128)!==0,a=s.rendering,a===null)if(i)na(s,!1);else{if(Ht!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(a=yl(t),a!==null){for(e.flags|=128,na(s,!1),i=a.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,t=a.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return St(Pt,Pt.current&1|2),e.child}t=t.sibling}s.tail!==null&&It()>Fs&&(e.flags|=128,i=!0,na(s,!1),e.lanes=4194304)}else{if(!i)if(t=yl(a),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),na(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!bt)return Jt(e),null}else 2*It()-s.renderingStartTime>Fs&&n!==1073741824&&(e.flags|=128,i=!0,na(s,!1),e.lanes=4194304);s.isBackwards?(a.sibling=e.child,e.child=a):(n=s.last,n!==null?n.sibling=a:e.child=a,s.last=a)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=It(),e.sibling=null,n=Pt.current,St(Pt,i?n&1|2:n&1),e):(Jt(e),null);case 22:case 23:return cf(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?En&1073741824&&(Jt(e),e.subtreeFlags&6&&(e.flags|=8192)):Jt(e),null;case 24:return null;case 25:return null}throw Error(fe(156,e.tag))}function vx(t,e){switch(jd(e),e.tag){case 1:return gn(e.type)&&hl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Us(),At(mn),At(rn),Zd(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Kd(e),null;case 13:if(At(Pt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(fe(340));Ls()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return At(Pt),null;case 4:return Us(),null;case 10:return Xd(e.type._context),null;case 22:case 23:return cf(),null;case 24:return null;default:return null}}var go=!1,nn=!1,_x=typeof WeakSet=="function"?WeakSet:Set,Pe=null;function _s(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Ut(t,e,i)}else n.current=null}function td(t,e,n){try{n()}catch(i){Ut(t,e,i)}}var xh=!1;function xx(t,e){if(ku=cl,t=dg(),zd(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,o=-1,c=-1,u=0,f=0,p=t,h=null;t:for(;;){for(var m;p!==n||r!==0&&p.nodeType!==3||(o=a+r),p!==s||i!==0&&p.nodeType!==3||(c=a+i),p.nodeType===3&&(a+=p.nodeValue.length),(m=p.firstChild)!==null;)h=p,p=m;for(;;){if(p===t)break t;if(h===n&&++u===r&&(o=a),h===s&&++f===i&&(c=a),(m=p.nextSibling)!==null)break;p=h,h=p.parentNode}p=m}n=o===-1||c===-1?null:{start:o,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(Bu={focusedElem:t,selectionRange:n},cl=!1,Pe=e;Pe!==null;)if(e=Pe,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Pe=t;else for(;Pe!==null;){e=Pe;try{var x=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var y=x.memoizedProps,g=x.memoizedState,d=e.stateNode,v=d.getSnapshotBeforeUpdate(e.elementType===e.type?y:Xn(e.type,y),g);d.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var _=e.stateNode.containerInfo;_.nodeType===1?_.textContent="":_.nodeType===9&&_.documentElement&&_.removeChild(_.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(fe(163))}}catch(T){Ut(e,e.return,T)}if(t=e.sibling,t!==null){t.return=e.return,Pe=t;break}Pe=e.return}return x=xh,xh=!1,x}function Ma(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&td(e,n,s)}r=r.next}while(r!==i)}}function ql(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function nd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function ov(t){var e=t.alternate;e!==null&&(t.alternate=null,ov(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[ri],delete e[Fa],delete e[ju],delete e[tx],delete e[nx])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function lv(t){return t.tag===5||t.tag===3||t.tag===4}function yh(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||lv(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function id(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=fl));else if(i!==4&&(t=t.child,t!==null))for(id(t,e,n),t=t.sibling;t!==null;)id(t,e,n),t=t.sibling}function rd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(rd(t,e,n),t=t.sibling;t!==null;)rd(t,e,n),t=t.sibling}var Yt=null,qn=!1;function Li(t,e,n){for(n=n.child;n!==null;)cv(t,e,n),n=n.sibling}function cv(t,e,n){if(oi&&typeof oi.onCommitFiberUnmount=="function")try{oi.onCommitFiberUnmount(Bl,n)}catch{}switch(n.tag){case 5:nn||_s(n,e);case 6:var i=Yt,r=qn;Yt=null,Li(t,e,n),Yt=i,qn=r,Yt!==null&&(qn?(t=Yt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Yt.removeChild(n.stateNode));break;case 18:Yt!==null&&(qn?(t=Yt,n=n.stateNode,t.nodeType===8?Tc(t.parentNode,n):t.nodeType===1&&Tc(t,n),Pa(t)):Tc(Yt,n.stateNode));break;case 4:i=Yt,r=qn,Yt=n.stateNode.containerInfo,qn=!0,Li(t,e,n),Yt=i,qn=r;break;case 0:case 11:case 14:case 15:if(!nn&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&td(n,e,a),r=r.next}while(r!==i)}Li(t,e,n);break;case 1:if(!nn&&(_s(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(o){Ut(n,e,o)}Li(t,e,n);break;case 21:Li(t,e,n);break;case 22:n.mode&1?(nn=(i=nn)||n.memoizedState!==null,Li(t,e,n),nn=i):Li(t,e,n);break;default:Li(t,e,n)}}function Sh(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new _x),e.forEach(function(i){var r=Rx.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function jn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,a=e,o=a;e:for(;o!==null;){switch(o.tag){case 5:Yt=o.stateNode,qn=!1;break e;case 3:Yt=o.stateNode.containerInfo,qn=!0;break e;case 4:Yt=o.stateNode.containerInfo,qn=!0;break e}o=o.return}if(Yt===null)throw Error(fe(160));cv(s,a,r),Yt=null,qn=!1;var c=r.alternate;c!==null&&(c.return=null),r.return=null}catch(u){Ut(r,e,u)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)uv(e,t),e=e.sibling}function uv(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(jn(e,t),ei(t),i&4){try{Ma(3,t,t.return),ql(3,t)}catch(y){Ut(t,t.return,y)}try{Ma(5,t,t.return)}catch(y){Ut(t,t.return,y)}}break;case 1:jn(e,t),ei(t),i&512&&n!==null&&_s(n,n.return);break;case 5:if(jn(e,t),ei(t),i&512&&n!==null&&_s(n,n.return),t.flags&32){var r=t.stateNode;try{Ca(r,"")}catch(y){Ut(t,t.return,y)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,a=n!==null?n.memoizedProps:s,o=t.type,c=t.updateQueue;if(t.updateQueue=null,c!==null)try{o==="input"&&s.type==="radio"&&s.name!=null&&Lm(r,s),Ru(o,a);var u=Ru(o,s);for(a=0;a<c.length;a+=2){var f=c[a],p=c[a+1];f==="style"?Om(r,p):f==="dangerouslySetInnerHTML"?Im(r,p):f==="children"?Ca(r,p):Cd(r,f,p,u)}switch(o){case"input":Eu(r,s);break;case"textarea":Dm(r,s);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var m=s.value;m!=null?Ss(r,!!s.multiple,m,!1):h!==!!s.multiple&&(s.defaultValue!=null?Ss(r,!!s.multiple,s.defaultValue,!0):Ss(r,!!s.multiple,s.multiple?[]:"",!1))}r[Fa]=s}catch(y){Ut(t,t.return,y)}}break;case 6:if(jn(e,t),ei(t),i&4){if(t.stateNode===null)throw Error(fe(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(y){Ut(t,t.return,y)}}break;case 3:if(jn(e,t),ei(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Pa(e.containerInfo)}catch(y){Ut(t,t.return,y)}break;case 4:jn(e,t),ei(t);break;case 13:jn(e,t),ei(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(of=It())),i&4&&Sh(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(nn=(u=nn)||f,jn(e,t),nn=u):jn(e,t),ei(t),i&8192){if(u=t.memoizedState!==null,(t.stateNode.isHidden=u)&&!f&&t.mode&1)for(Pe=t,f=t.child;f!==null;){for(p=Pe=f;Pe!==null;){switch(h=Pe,m=h.child,h.tag){case 0:case 11:case 14:case 15:Ma(4,h,h.return);break;case 1:_s(h,h.return);var x=h.stateNode;if(typeof x.componentWillUnmount=="function"){i=h,n=h.return;try{e=i,x.props=e.memoizedProps,x.state=e.memoizedState,x.componentWillUnmount()}catch(y){Ut(i,n,y)}}break;case 5:_s(h,h.return);break;case 22:if(h.memoizedState!==null){Eh(p);continue}}m!==null?(m.return=h,Pe=m):Eh(p)}f=f.sibling}e:for(f=null,p=t;;){if(p.tag===5){if(f===null){f=p;try{r=p.stateNode,u?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(o=p.stateNode,c=p.memoizedProps.style,a=c!=null&&c.hasOwnProperty("display")?c.display:null,o.style.display=Fm("display",a))}catch(y){Ut(t,t.return,y)}}}else if(p.tag===6){if(f===null)try{p.stateNode.nodeValue=u?"":p.memoizedProps}catch(y){Ut(t,t.return,y)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===t)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===t)break e;for(;p.sibling===null;){if(p.return===null||p.return===t)break e;f===p&&(f=null),p=p.return}f===p&&(f=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:jn(e,t),ei(t),i&4&&Sh(t);break;case 21:break;default:jn(e,t),ei(t)}}function ei(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(lv(n)){var i=n;break e}n=n.return}throw Error(fe(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Ca(r,""),i.flags&=-33);var s=yh(t);rd(t,s,r);break;case 3:case 4:var a=i.stateNode.containerInfo,o=yh(t);id(t,o,a);break;default:throw Error(fe(161))}}catch(c){Ut(t,t.return,c)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function yx(t,e,n){Pe=t,dv(t)}function dv(t,e,n){for(var i=(t.mode&1)!==0;Pe!==null;){var r=Pe,s=r.child;if(r.tag===22&&i){var a=r.memoizedState!==null||go;if(!a){var o=r.alternate,c=o!==null&&o.memoizedState!==null||nn;o=go;var u=nn;if(go=a,(nn=c)&&!u)for(Pe=r;Pe!==null;)a=Pe,c=a.child,a.tag===22&&a.memoizedState!==null?Th(r):c!==null?(c.return=a,Pe=c):Th(r);for(;s!==null;)Pe=s,dv(s),s=s.sibling;Pe=r,go=o,nn=u}Mh(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Pe=s):Mh(t)}}function Mh(t){for(;Pe!==null;){var e=Pe;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:nn||ql(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!nn)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Xn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&ah(e,s,i);break;case 3:var a=e.updateQueue;if(a!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}ah(e,a,n)}break;case 5:var o=e.stateNode;if(n===null&&e.flags&4){n=o;var c=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var u=e.alternate;if(u!==null){var f=u.memoizedState;if(f!==null){var p=f.dehydrated;p!==null&&Pa(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(fe(163))}nn||e.flags&512&&nd(e)}catch(h){Ut(e,e.return,h)}}if(e===t){Pe=null;break}if(n=e.sibling,n!==null){n.return=e.return,Pe=n;break}Pe=e.return}}function Eh(t){for(;Pe!==null;){var e=Pe;if(e===t){Pe=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Pe=n;break}Pe=e.return}}function Th(t){for(;Pe!==null;){var e=Pe;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{ql(4,e)}catch(c){Ut(e,n,c)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(c){Ut(e,r,c)}}var s=e.return;try{nd(e)}catch(c){Ut(e,s,c)}break;case 5:var a=e.return;try{nd(e)}catch(c){Ut(e,a,c)}}}catch(c){Ut(e,e.return,c)}if(e===t){Pe=null;break}var o=e.sibling;if(o!==null){o.return=e.return,Pe=o;break}Pe=e.return}}var Sx=Math.ceil,El=Ni.ReactCurrentDispatcher,sf=Ni.ReactCurrentOwner,On=Ni.ReactCurrentBatchConfig,ut=0,qt=null,kt=null,Kt=0,En=0,xs=ur(0),Ht=0,ja=null,kr=0,Yl=0,af=0,Ea=null,fn=null,of=0,Fs=1/0,vi=null,Tl=!1,sd=null,Qi=null,vo=!1,Wi=null,wl=0,Ta=0,ad=null,el=-1,tl=0;function ln(){return ut&6?It():el!==-1?el:el=It()}function Ji(t){return t.mode&1?ut&2&&Kt!==0?Kt&-Kt:rx.transition!==null?(tl===0&&(tl=$m()),tl):(t=vt,t!==0||(t=window.event,t=t===void 0?16:ng(t.type)),t):1}function Zn(t,e,n,i){if(50<Ta)throw Ta=0,ad=null,Error(fe(185));Ga(t,n,i),(!(ut&2)||t!==qt)&&(t===qt&&(!(ut&2)&&(Yl|=n),Ht===4&&ji(t,Kt)),vn(t,i),n===1&&ut===0&&!(e.mode&1)&&(Fs=It()+500,Gl&&dr()))}function vn(t,e){var n=t.callbackNode;r0(t,e);var i=ll(t,t===qt?Kt:0);if(i===0)n!==null&&Df(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&Df(n),e===1)t.tag===0?ix(wh.bind(null,t)):Sg(wh.bind(null,t)),J0(function(){!(ut&6)&&dr()}),n=null;else{switch(Km(i)){case 1:n=Ld;break;case 4:n=qm;break;case 16:n=ol;break;case 536870912:n=Ym;break;default:n=ol}n=xv(n,fv.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function fv(t,e){if(el=-1,tl=0,ut&6)throw Error(fe(327));var n=t.callbackNode;if(As()&&t.callbackNode!==n)return null;var i=ll(t,t===qt?Kt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Al(t,i);else{e=i;var r=ut;ut|=2;var s=pv();(qt!==t||Kt!==e)&&(vi=null,Fs=It()+500,Dr(t,e));do try{Tx();break}catch(o){hv(t,o)}while(!0);Wd(),El.current=s,ut=r,kt!==null?e=0:(qt=null,Kt=0,e=Ht)}if(e!==0){if(e===2&&(r=Du(t),r!==0&&(i=r,e=od(t,r))),e===1)throw n=ja,Dr(t,0),ji(t,i),vn(t,It()),n;if(e===6)ji(t,i);else{if(r=t.current.alternate,!(i&30)&&!Mx(r)&&(e=Al(t,i),e===2&&(s=Du(t),s!==0&&(i=s,e=od(t,s))),e===1))throw n=ja,Dr(t,0),ji(t,i),vn(t,It()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(fe(345));case 2:Er(t,fn,vi);break;case 3:if(ji(t,i),(i&130023424)===i&&(e=of+500-It(),10<e)){if(ll(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){ln(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Hu(Er.bind(null,t,fn,vi),e);break}Er(t,fn,vi);break;case 4:if(ji(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var a=31-Kn(i);s=1<<a,a=e[a],a>r&&(r=a),i&=~s}if(i=r,i=It()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*Sx(i/1960))-i,10<i){t.timeoutHandle=Hu(Er.bind(null,t,fn,vi),i);break}Er(t,fn,vi);break;case 5:Er(t,fn,vi);break;default:throw Error(fe(329))}}}return vn(t,It()),t.callbackNode===n?fv.bind(null,t):null}function od(t,e){var n=Ea;return t.current.memoizedState.isDehydrated&&(Dr(t,e).flags|=256),t=Al(t,e),t!==2&&(e=fn,fn=n,e!==null&&ld(e)),t}function ld(t){fn===null?fn=t:fn.push.apply(fn,t)}function Mx(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!Qn(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function ji(t,e){for(e&=~af,e&=~Yl,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Kn(e),i=1<<n;t[n]=-1,e&=~i}}function wh(t){if(ut&6)throw Error(fe(327));As();var e=ll(t,0);if(!(e&1))return vn(t,It()),null;var n=Al(t,e);if(t.tag!==0&&n===2){var i=Du(t);i!==0&&(e=i,n=od(t,i))}if(n===1)throw n=ja,Dr(t,0),ji(t,e),vn(t,It()),n;if(n===6)throw Error(fe(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Er(t,fn,vi),vn(t,It()),null}function lf(t,e){var n=ut;ut|=1;try{return t(e)}finally{ut=n,ut===0&&(Fs=It()+500,Gl&&dr())}}function Br(t){Wi!==null&&Wi.tag===0&&!(ut&6)&&As();var e=ut;ut|=1;var n=On.transition,i=vt;try{if(On.transition=null,vt=1,t)return t()}finally{vt=i,On.transition=n,ut=e,!(ut&6)&&dr()}}function cf(){En=xs.current,At(xs)}function Dr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,Q0(n)),kt!==null)for(n=kt.return;n!==null;){var i=n;switch(jd(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&hl();break;case 3:Us(),At(mn),At(rn),Zd();break;case 5:Kd(i);break;case 4:Us();break;case 13:At(Pt);break;case 19:At(Pt);break;case 10:Xd(i.type._context);break;case 22:case 23:cf()}n=n.return}if(qt=t,kt=t=er(t.current,null),Kt=En=e,Ht=0,ja=null,af=Yl=kr=0,fn=Ea=null,br!==null){for(e=0;e<br.length;e++)if(n=br[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var a=s.next;s.next=r,i.next=a}n.pending=i}br=null}return t}function hv(t,e){do{var n=kt;try{if(Wd(),Zo.current=Ml,Sl){for(var i=Lt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Sl=!1}if(Or=0,Xt=zt=Lt=null,Sa=!1,Ba=0,sf.current=null,n===null||n.return===null){Ht=1,ja=e,kt=null;break}e:{var s=t,a=n.return,o=n,c=e;if(e=Kt,o.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var u=c,f=o,p=f.tag;if(!(f.mode&1)&&(p===0||p===11||p===15)){var h=f.alternate;h?(f.updateQueue=h.updateQueue,f.memoizedState=h.memoizedState,f.lanes=h.lanes):(f.updateQueue=null,f.memoizedState=null)}var m=fh(a);if(m!==null){m.flags&=-257,hh(m,a,o,s,e),m.mode&1&&dh(s,u,e),e=m,c=u;var x=e.updateQueue;if(x===null){var y=new Set;y.add(c),e.updateQueue=y}else x.add(c);break e}else{if(!(e&1)){dh(s,u,e),uf();break e}c=Error(fe(426))}}else if(bt&&o.mode&1){var g=fh(a);if(g!==null){!(g.flags&65536)&&(g.flags|=256),hh(g,a,o,s,e),Vd(Is(c,o));break e}}s=c=Is(c,o),Ht!==4&&(Ht=2),Ea===null?Ea=[s]:Ea.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var d=Kg(s,c,e);sh(s,d);break e;case 1:o=c;var v=s.type,_=s.stateNode;if(!(s.flags&128)&&(typeof v.getDerivedStateFromError=="function"||_!==null&&typeof _.componentDidCatch=="function"&&(Qi===null||!Qi.has(_)))){s.flags|=65536,e&=-e,s.lanes|=e;var T=Zg(s,o,e);sh(s,T);break e}}s=s.return}while(s!==null)}gv(n)}catch(D){e=D,kt===n&&n!==null&&(kt=n=n.return);continue}break}while(!0)}function pv(){var t=El.current;return El.current=Ml,t===null?Ml:t}function uf(){(Ht===0||Ht===3||Ht===2)&&(Ht=4),qt===null||!(kr&268435455)&&!(Yl&268435455)||ji(qt,Kt)}function Al(t,e){var n=ut;ut|=2;var i=pv();(qt!==t||Kt!==e)&&(vi=null,Dr(t,e));do try{Ex();break}catch(r){hv(t,r)}while(!0);if(Wd(),ut=n,El.current=i,kt!==null)throw Error(fe(261));return qt=null,Kt=0,Ht}function Ex(){for(;kt!==null;)mv(kt)}function Tx(){for(;kt!==null&&!$_();)mv(kt)}function mv(t){var e=_v(t.alternate,t,En);t.memoizedProps=t.pendingProps,e===null?gv(t):kt=e,sf.current=null}function gv(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=vx(n,e),n!==null){n.flags&=32767,kt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ht=6,kt=null;return}}else if(n=gx(n,e,En),n!==null){kt=n;return}if(e=e.sibling,e!==null){kt=e;return}kt=e=t}while(e!==null);Ht===0&&(Ht=5)}function Er(t,e,n){var i=vt,r=On.transition;try{On.transition=null,vt=1,wx(t,e,n,i)}finally{On.transition=r,vt=i}return null}function wx(t,e,n,i){do As();while(Wi!==null);if(ut&6)throw Error(fe(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(fe(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(s0(t,s),t===qt&&(kt=qt=null,Kt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||vo||(vo=!0,xv(ol,function(){return As(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=On.transition,On.transition=null;var a=vt;vt=1;var o=ut;ut|=4,sf.current=null,xx(t,n),uv(n,t),W0(Bu),cl=!!ku,Bu=ku=null,t.current=n,yx(n),K_(),ut=o,vt=a,On.transition=s}else t.current=n;if(vo&&(vo=!1,Wi=t,wl=r),s=t.pendingLanes,s===0&&(Qi=null),J_(n.stateNode),vn(t,It()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Tl)throw Tl=!1,t=sd,sd=null,t;return wl&1&&t.tag!==0&&As(),s=t.pendingLanes,s&1?t===ad?Ta++:(Ta=0,ad=t):Ta=0,dr(),null}function As(){if(Wi!==null){var t=Km(wl),e=On.transition,n=vt;try{if(On.transition=null,vt=16>t?16:t,Wi===null)var i=!1;else{if(t=Wi,Wi=null,wl=0,ut&6)throw Error(fe(331));var r=ut;for(ut|=4,Pe=t.current;Pe!==null;){var s=Pe,a=s.child;if(Pe.flags&16){var o=s.deletions;if(o!==null){for(var c=0;c<o.length;c++){var u=o[c];for(Pe=u;Pe!==null;){var f=Pe;switch(f.tag){case 0:case 11:case 15:Ma(8,f,s)}var p=f.child;if(p!==null)p.return=f,Pe=p;else for(;Pe!==null;){f=Pe;var h=f.sibling,m=f.return;if(ov(f),f===u){Pe=null;break}if(h!==null){h.return=m,Pe=h;break}Pe=m}}}var x=s.alternate;if(x!==null){var y=x.child;if(y!==null){x.child=null;do{var g=y.sibling;y.sibling=null,y=g}while(y!==null)}}Pe=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,Pe=a;else e:for(;Pe!==null;){if(s=Pe,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Ma(9,s,s.return)}var d=s.sibling;if(d!==null){d.return=s.return,Pe=d;break e}Pe=s.return}}var v=t.current;for(Pe=v;Pe!==null;){a=Pe;var _=a.child;if(a.subtreeFlags&2064&&_!==null)_.return=a,Pe=_;else e:for(a=v;Pe!==null;){if(o=Pe,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:ql(9,o)}}catch(D){Ut(o,o.return,D)}if(o===a){Pe=null;break e}var T=o.sibling;if(T!==null){T.return=o.return,Pe=T;break e}Pe=o.return}}if(ut=r,dr(),oi&&typeof oi.onPostCommitFiberRoot=="function")try{oi.onPostCommitFiberRoot(Bl,t)}catch{}i=!0}return i}finally{vt=n,On.transition=e}}return!1}function Ah(t,e,n){e=Is(n,e),e=Kg(t,e,1),t=Zi(t,e,1),e=ln(),t!==null&&(Ga(t,1,e),vn(t,e))}function Ut(t,e,n){if(t.tag===3)Ah(t,t,n);else for(;e!==null;){if(e.tag===3){Ah(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Qi===null||!Qi.has(i))){t=Is(n,t),t=Zg(e,t,1),e=Zi(e,t,1),t=ln(),e!==null&&(Ga(e,1,t),vn(e,t));break}}e=e.return}}function Ax(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=ln(),t.pingedLanes|=t.suspendedLanes&n,qt===t&&(Kt&n)===n&&(Ht===4||Ht===3&&(Kt&130023424)===Kt&&500>It()-of?Dr(t,0):af|=n),vn(t,e)}function vv(t,e){e===0&&(t.mode&1?(e=ao,ao<<=1,!(ao&130023424)&&(ao=4194304)):e=1);var n=ln();t=Ci(t,e),t!==null&&(Ga(t,e,n),vn(t,n))}function Cx(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),vv(t,n)}function Rx(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(fe(314))}i!==null&&i.delete(e),vv(t,n)}var _v;_v=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||mn.current)pn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return pn=!1,mx(t,e,n);pn=!!(t.flags&131072)}else pn=!1,bt&&e.flags&1048576&&Mg(e,gl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;Jo(t,e),t=e.pendingProps;var r=Ps(e,rn.current);ws(e,n),r=Jd(null,e,i,t,r,n);var s=ef();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,gn(i)?(s=!0,pl(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Yd(e),r.updater=Xl,e.stateNode=r,r._reactInternals=e,Yu(e,i,t,n),e=Zu(null,e,i,!0,s,n)):(e.tag=0,bt&&s&&Hd(e),on(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(Jo(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=Nx(i),t=Xn(i,t),r){case 0:e=Ku(null,e,i,t,n);break e;case 1:e=gh(null,e,i,t,n);break e;case 11:e=ph(null,e,i,t,n);break e;case 14:e=mh(null,e,i,Xn(i.type,t),n);break e}throw Error(fe(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Xn(i,r),Ku(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Xn(i,r),gh(t,e,i,r,n);case 3:e:{if(tv(e),t===null)throw Error(fe(387));i=e.pendingProps,s=e.memoizedState,r=s.element,Rg(t,e),xl(e,i,null,n);var a=e.memoizedState;if(i=a.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Is(Error(fe(423)),e),e=vh(t,e,i,n,r);break e}else if(i!==r){r=Is(Error(fe(424)),e),e=vh(t,e,i,n,r);break e}else for(Tn=Ki(e.stateNode.containerInfo.firstChild),wn=e,bt=!0,Yn=null,n=Ag(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ls(),i===r){e=Ri(t,e,n);break e}on(t,e,i,n)}e=e.child}return e;case 5:return bg(e),t===null&&Wu(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,a=r.children,zu(i,r)?a=null:s!==null&&zu(i,s)&&(e.flags|=32),ev(t,e),on(t,e,a,n),e.child;case 6:return t===null&&Wu(e),null;case 13:return nv(t,e,n);case 4:return $d(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Ds(e,null,i,n):on(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Xn(i,r),ph(t,e,i,r,n);case 7:return on(t,e,e.pendingProps,n),e.child;case 8:return on(t,e,e.pendingProps.children,n),e.child;case 12:return on(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,a=r.value,St(vl,i._currentValue),i._currentValue=a,s!==null)if(Qn(s.value,a)){if(s.children===r.children&&!mn.current){e=Ri(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var o=s.dependencies;if(o!==null){a=s.child;for(var c=o.firstContext;c!==null;){if(c.context===i){if(s.tag===1){c=Ti(-1,n&-n),c.tag=2;var u=s.updateQueue;if(u!==null){u=u.shared;var f=u.pending;f===null?c.next=c:(c.next=f.next,f.next=c),u.pending=c}}s.lanes|=n,c=s.alternate,c!==null&&(c.lanes|=n),Xu(s.return,n,e),o.lanes|=n;break}c=c.next}}else if(s.tag===10)a=s.type===e.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(fe(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),Xu(a,n,e),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===e){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}on(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,ws(e,n),r=Bn(r),i=i(r),e.flags|=1,on(t,e,i,n),e.child;case 14:return i=e.type,r=Xn(i,e.pendingProps),r=Xn(i.type,r),mh(t,e,i,r,n);case 15:return Qg(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Xn(i,r),Jo(t,e),e.tag=1,gn(i)?(t=!0,pl(e)):t=!1,ws(e,n),$g(e,i,r),Yu(e,i,r,n),Zu(null,e,i,!0,t,n);case 19:return iv(t,e,n);case 22:return Jg(t,e,n)}throw Error(fe(156,e.tag))};function xv(t,e){return Xm(t,e)}function bx(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function In(t,e,n,i){return new bx(t,e,n,i)}function df(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Nx(t){if(typeof t=="function")return df(t)?1:0;if(t!=null){if(t=t.$$typeof,t===bd)return 11;if(t===Nd)return 14}return 2}function er(t,e){var n=t.alternate;return n===null?(n=In(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function nl(t,e,n,i,r,s){var a=2;if(i=t,typeof t=="function")df(t)&&(a=1);else if(typeof t=="string")a=5;else e:switch(t){case cs:return Ur(n.children,r,s,e);case Rd:a=8,r|=8;break;case _u:return t=In(12,n,e,r|2),t.elementType=_u,t.lanes=s,t;case xu:return t=In(13,n,e,r),t.elementType=xu,t.lanes=s,t;case yu:return t=In(19,n,e,r),t.elementType=yu,t.lanes=s,t;case bm:return $l(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Cm:a=10;break e;case Rm:a=9;break e;case bd:a=11;break e;case Nd:a=14;break e;case Bi:a=16,i=null;break e}throw Error(fe(130,t==null?t:typeof t,""))}return e=In(a,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Ur(t,e,n,i){return t=In(7,t,i,e),t.lanes=n,t}function $l(t,e,n,i){return t=In(22,t,i,e),t.elementType=bm,t.lanes=n,t.stateNode={isHidden:!1},t}function Lc(t,e,n){return t=In(6,t,null,e),t.lanes=n,t}function Dc(t,e,n){return e=In(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function Px(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=hc(0),this.expirationTimes=hc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=hc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function ff(t,e,n,i,r,s,a,o,c){return t=new Px(t,e,n,o,c),e===1?(e=1,s===!0&&(e|=8)):e=0,s=In(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Yd(s),t}function Lx(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ls,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function yv(t){if(!t)return sr;t=t._reactInternals;e:{if(Vr(t)!==t||t.tag!==1)throw Error(fe(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(gn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(fe(171))}if(t.tag===1){var n=t.type;if(gn(n))return yg(t,n,e)}return e}function Sv(t,e,n,i,r,s,a,o,c){return t=ff(n,i,!0,t,r,s,a,o,c),t.context=yv(null),n=t.current,i=ln(),r=Ji(n),s=Ti(i,r),s.callback=e??null,Zi(n,s,r),t.current.lanes=r,Ga(t,r,i),vn(t,i),t}function Kl(t,e,n,i){var r=e.current,s=ln(),a=Ji(r);return n=yv(n),e.context===null?e.context=n:e.pendingContext=n,e=Ti(s,a),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=Zi(r,e,a),t!==null&&(Zn(t,r,a,s),Ko(t,r,a)),a}function Cl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Ch(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function hf(t,e){Ch(t,e),(t=t.alternate)&&Ch(t,e)}function Dx(){return null}var Mv=typeof reportError=="function"?reportError:function(t){console.error(t)};function pf(t){this._internalRoot=t}Zl.prototype.render=pf.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(fe(409));Kl(t,e,null,null)};Zl.prototype.unmount=pf.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Br(function(){Kl(null,t,null,null)}),e[Ai]=null}};function Zl(t){this._internalRoot=t}Zl.prototype.unstable_scheduleHydration=function(t){if(t){var e=Jm();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Hi.length&&e!==0&&e<Hi[n].priority;n++);Hi.splice(n,0,t),n===0&&tg(t)}};function mf(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Ql(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Rh(){}function Ux(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var u=Cl(a);s.call(u)}}var a=Sv(e,i,t,0,null,!1,!1,"",Rh);return t._reactRootContainer=a,t[Ai]=a.current,Ua(t.nodeType===8?t.parentNode:t),Br(),a}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var o=i;i=function(){var u=Cl(c);o.call(u)}}var c=ff(t,0,!1,null,null,!1,!1,"",Rh);return t._reactRootContainer=c,t[Ai]=c.current,Ua(t.nodeType===8?t.parentNode:t),Br(function(){Kl(e,c,n,i)}),c}function Jl(t,e,n,i,r){var s=n._reactRootContainer;if(s){var a=s;if(typeof r=="function"){var o=r;r=function(){var c=Cl(a);o.call(c)}}Kl(e,a,t,r)}else a=Ux(n,e,t,r,i);return Cl(a)}Zm=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=ha(e.pendingLanes);n!==0&&(Dd(e,n|1),vn(e,It()),!(ut&6)&&(Fs=It()+500,dr()))}break;case 13:Br(function(){var i=Ci(t,1);if(i!==null){var r=ln();Zn(i,t,1,r)}}),hf(t,1)}};Ud=function(t){if(t.tag===13){var e=Ci(t,134217728);if(e!==null){var n=ln();Zn(e,t,134217728,n)}hf(t,134217728)}};Qm=function(t){if(t.tag===13){var e=Ji(t),n=Ci(t,e);if(n!==null){var i=ln();Zn(n,t,e,i)}hf(t,e)}};Jm=function(){return vt};eg=function(t,e){var n=vt;try{return vt=t,e()}finally{vt=n}};Nu=function(t,e,n){switch(e){case"input":if(Eu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=Vl(i);if(!r)throw Error(fe(90));Pm(i),Eu(i,r)}}}break;case"textarea":Dm(t,n);break;case"select":e=n.value,e!=null&&Ss(t,!!n.multiple,e,!1)}};zm=lf;Hm=Br;var Ix={usingClientEntryPoint:!1,Events:[Xa,hs,Vl,km,Bm,lf]},ia={findFiberByHostInstance:Rr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Fx={bundleType:ia.bundleType,version:ia.version,rendererPackageName:ia.rendererPackageName,rendererConfig:ia.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ni.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Gm(t),t===null?null:t.stateNode},findFiberByHostInstance:ia.findFiberByHostInstance||Dx,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var _o=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!_o.isDisabled&&_o.supportsFiber)try{Bl=_o.inject(Fx),oi=_o}catch{}}Cn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ix;Cn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!mf(e))throw Error(fe(200));return Lx(t,e,null,n)};Cn.createRoot=function(t,e){if(!mf(t))throw Error(fe(299));var n=!1,i="",r=Mv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=ff(t,1,!1,null,null,n,!1,i,r),t[Ai]=e.current,Ua(t.nodeType===8?t.parentNode:t),new pf(e)};Cn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(fe(188)):(t=Object.keys(t).join(","),Error(fe(268,t)));return t=Gm(e),t=t===null?null:t.stateNode,t};Cn.flushSync=function(t){return Br(t)};Cn.hydrate=function(t,e,n){if(!Ql(e))throw Error(fe(200));return Jl(null,t,e,!0,n)};Cn.hydrateRoot=function(t,e,n){if(!mf(t))throw Error(fe(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",a=Mv;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),e=Sv(e,null,t,1,n??null,r,!1,s,a),t[Ai]=e.current,Ua(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new Zl(e)};Cn.render=function(t,e,n){if(!Ql(e))throw Error(fe(200));return Jl(null,t,e,!1,n)};Cn.unmountComponentAtNode=function(t){if(!Ql(t))throw Error(fe(40));return t._reactRootContainer?(Br(function(){Jl(null,null,t,!1,function(){t._reactRootContainer=null,t[Ai]=null})}),!0):!1};Cn.unstable_batchedUpdates=lf;Cn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!Ql(n))throw Error(fe(200));if(t==null||t._reactInternals===void 0)throw Error(fe(38));return Jl(t,e,n,!1,i)};Cn.version="18.3.1-next-f1338f8080-20240426";function Ev(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ev)}catch(t){console.error(t)}}Ev(),Em.exports=Cn;var Ox=Em.exports,bh=Ox;gu.createRoot=bh.createRoot,gu.hydrateRoot=bh.hydrateRoot;/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const gf="165",kx=0,Nh=1,Bx=2,Tv=1,zx=2,gi=3,ar=0,_n=1,xi=2,tr=0,Cs=1,cd=2,Ph=3,Lh=4,Hx=5,Ar=100,jx=101,Vx=102,Gx=103,Wx=104,Xx=200,qx=201,Yx=202,$x=203,ud=204,dd=205,Kx=206,Zx=207,Qx=208,Jx=209,ey=210,ty=211,ny=212,iy=213,ry=214,sy=0,ay=1,oy=2,Rl=3,ly=4,cy=5,uy=6,dy=7,wv=0,fy=1,hy=2,nr=0,py=1,my=2,gy=3,vy=4,_y=5,xy=6,yy=7,Av=300,Os=301,ks=302,fd=303,hd=304,ec=306,pd=1e3,Pr=1001,md=1002,Fn=1003,Sy=1004,xo=1005,$n=1006,Uc=1007,Lr=1008,or=1009,My=1010,Ey=1011,bl=1012,Cv=1013,Bs=1014,Xi=1015,tc=1016,Rv=1017,bv=1018,zs=1020,Ty=35902,wy=1021,Ay=1022,ai=1023,Cy=1024,Ry=1025,Rs=1026,Hs=1027,by=1028,Nv=1029,Ny=1030,Pv=1031,Lv=1033,Ic=33776,Fc=33777,Oc=33778,kc=33779,Dh=35840,Uh=35841,Ih=35842,Fh=35843,Oh=36196,kh=37492,Bh=37496,zh=37808,Hh=37809,jh=37810,Vh=37811,Gh=37812,Wh=37813,Xh=37814,qh=37815,Yh=37816,$h=37817,Kh=37818,Zh=37819,Qh=37820,Jh=37821,Bc=36492,ep=36494,tp=36495,Py=36283,np=36284,ip=36285,rp=36286,Ly=3200,Dy=3201,Uy=0,Iy=1,Vi="",ni="srgb",fr="srgb-linear",vf="display-p3",nc="display-p3-linear",Nl="linear",wt="srgb",Pl="rec709",Ll="p3",Wr=7680,sp=519,Fy=512,Oy=513,ky=514,Dv=515,By=516,zy=517,Hy=518,jy=519,ap=35044,op="300 es",Mi=2e3,Dl=2001;class Xs{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],zc=Math.PI/180,gd=180/Math.PI;function Ya(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(en[t&255]+en[t>>8&255]+en[t>>16&255]+en[t>>24&255]+"-"+en[e&255]+en[e>>8&255]+"-"+en[e>>16&15|64]+en[e>>24&255]+"-"+en[n&63|128]+en[n>>8&255]+"-"+en[n>>16&255]+en[n>>24&255]+en[i&255]+en[i>>8&255]+en[i>>16&255]+en[i>>24&255]).toLowerCase()}function hn(t,e,n){return Math.max(e,Math.min(n,t))}function Vy(t,e){return(t%e+e)%e}function Hc(t,e,n){return(1-n)*t+n*e}function ra(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function dn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}class pt{constructor(e=0,n=0){pt.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(hn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class st{constructor(e,n,i,r,s,a,o,c,u){st.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,c,u)}set(e,n,i,r,s,a,o,c,u){const f=this.elements;return f[0]=e,f[1]=r,f[2]=o,f[3]=n,f[4]=s,f[5]=c,f[6]=i,f[7]=a,f[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],c=i[6],u=i[1],f=i[4],p=i[7],h=i[2],m=i[5],x=i[8],y=r[0],g=r[3],d=r[6],v=r[1],_=r[4],T=r[7],D=r[2],C=r[5],A=r[8];return s[0]=a*y+o*v+c*D,s[3]=a*g+o*_+c*C,s[6]=a*d+o*T+c*A,s[1]=u*y+f*v+p*D,s[4]=u*g+f*_+p*C,s[7]=u*d+f*T+p*A,s[2]=h*y+m*v+x*D,s[5]=h*g+m*_+x*C,s[8]=h*d+m*T+x*A,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],u=e[7],f=e[8];return n*a*f-n*o*u-i*s*f+i*o*c+r*s*u-r*a*c}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],u=e[7],f=e[8],p=f*a-o*u,h=o*c-f*s,m=u*s-a*c,x=n*p+i*h+r*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/x;return e[0]=p*y,e[1]=(r*u-f*i)*y,e[2]=(o*i-r*a)*y,e[3]=h*y,e[4]=(f*n-r*c)*y,e[5]=(r*s-o*n)*y,e[6]=m*y,e[7]=(i*c-u*n)*y,e[8]=(a*n-i*s)*y,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,a,o){const c=Math.cos(s),u=Math.sin(s);return this.set(i*c,i*u,-i*(c*a+u*o)+a+e,-r*u,r*c,-r*(-u*a+c*o)+o+n,0,0,1),this}scale(e,n){return this.premultiply(jc.makeScale(e,n)),this}rotate(e){return this.premultiply(jc.makeRotation(-e)),this}translate(e,n){return this.premultiply(jc.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const jc=new st;function Uv(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Ul(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function Gy(){const t=Ul("canvas");return t.style.display="block",t}const lp={};function Iv(t){t in lp||(lp[t]=!0,console.warn(t))}function Wy(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const cp=new st().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),up=new st().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),yo={[fr]:{transfer:Nl,primaries:Pl,toReference:t=>t,fromReference:t=>t},[ni]:{transfer:wt,primaries:Pl,toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[nc]:{transfer:Nl,primaries:Ll,toReference:t=>t.applyMatrix3(up),fromReference:t=>t.applyMatrix3(cp)},[vf]:{transfer:wt,primaries:Ll,toReference:t=>t.convertSRGBToLinear().applyMatrix3(up),fromReference:t=>t.applyMatrix3(cp).convertLinearToSRGB()}},Xy=new Set([fr,nc]),mt={enabled:!0,_workingColorSpace:fr,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!Xy.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=yo[e].toReference,r=yo[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return yo[t].primaries},getTransfer:function(t){return t===Vi?Nl:yo[t].transfer}};function bs(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Vc(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Xr;class qy{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Xr===void 0&&(Xr=Ul("canvas")),Xr.width=e.width,Xr.height=e.height;const i=Xr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Xr}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Ul("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=bs(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(bs(n[i]/255)*255):n[i]=bs(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Yy=0;class Fv{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yy++}),this.uuid=Ya(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Gc(r[a].image)):s.push(Gc(r[a]))}else s=Gc(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Gc(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?qy.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let $y=0;class xn extends Xs{constructor(e=xn.DEFAULT_IMAGE,n=xn.DEFAULT_MAPPING,i=Pr,r=Pr,s=$n,a=Lr,o=ai,c=or,u=xn.DEFAULT_ANISOTROPY,f=Vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$y++}),this.uuid=Ya(),this.name="",this.source=new Fv(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=u,this.format=o,this.internalFormat=null,this.type=c,this.offset=new pt(0,0),this.repeat=new pt(1,1),this.center=new pt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new st,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Av)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case pd:e.x=e.x-Math.floor(e.x);break;case Pr:e.x=e.x<0?0:1;break;case md:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case pd:e.y=e.y-Math.floor(e.y);break;case Pr:e.y=e.y<0?0:1;break;case md:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}xn.DEFAULT_IMAGE=null;xn.DEFAULT_MAPPING=Av;xn.DEFAULT_ANISOTROPY=1;class $t{constructor(e=0,n=0,i=0,r=1){$t.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const c=e.elements,u=c[0],f=c[4],p=c[8],h=c[1],m=c[5],x=c[9],y=c[2],g=c[6],d=c[10];if(Math.abs(f-h)<.01&&Math.abs(p-y)<.01&&Math.abs(x-g)<.01){if(Math.abs(f+h)<.1&&Math.abs(p+y)<.1&&Math.abs(x+g)<.1&&Math.abs(u+m+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const _=(u+1)/2,T=(m+1)/2,D=(d+1)/2,C=(f+h)/4,A=(p+y)/4,R=(x+g)/4;return _>T&&_>D?_<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(_),r=C/i,s=A/i):T>D?T<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(T),i=C/r,s=R/r):D<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(D),i=A/s,r=R/s),this.set(i,r,s,n),this}let v=Math.sqrt((g-x)*(g-x)+(p-y)*(p-y)+(h-f)*(h-f));return Math.abs(v)<.001&&(v=1),this.x=(g-x)/v,this.y=(p-y)/v,this.z=(h-f)/v,this.w=Math.acos((u+m+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ky extends Xs{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new $t(0,0,e,n),this.scissorTest=!1,this.viewport=new $t(0,0,e,n);const r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$n,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new xn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new Fv(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class zr extends Ky{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class Ov extends xn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Fn,this.minFilter=Fn,this.wrapR=Pr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Zy extends xn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Fn,this.minFilter=Fn,this.wrapR=Pr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $a{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,a,o){let c=i[r+0],u=i[r+1],f=i[r+2],p=i[r+3];const h=s[a+0],m=s[a+1],x=s[a+2],y=s[a+3];if(o===0){e[n+0]=c,e[n+1]=u,e[n+2]=f,e[n+3]=p;return}if(o===1){e[n+0]=h,e[n+1]=m,e[n+2]=x,e[n+3]=y;return}if(p!==y||c!==h||u!==m||f!==x){let g=1-o;const d=c*h+u*m+f*x+p*y,v=d>=0?1:-1,_=1-d*d;if(_>Number.EPSILON){const D=Math.sqrt(_),C=Math.atan2(D,d*v);g=Math.sin(g*C)/D,o=Math.sin(o*C)/D}const T=o*v;if(c=c*g+h*T,u=u*g+m*T,f=f*g+x*T,p=p*g+y*T,g===1-o){const D=1/Math.sqrt(c*c+u*u+f*f+p*p);c*=D,u*=D,f*=D,p*=D}}e[n]=c,e[n+1]=u,e[n+2]=f,e[n+3]=p}static multiplyQuaternionsFlat(e,n,i,r,s,a){const o=i[r],c=i[r+1],u=i[r+2],f=i[r+3],p=s[a],h=s[a+1],m=s[a+2],x=s[a+3];return e[n]=o*x+f*p+c*m-u*h,e[n+1]=c*x+f*h+u*p-o*m,e[n+2]=u*x+f*m+o*h-c*p,e[n+3]=f*x-o*p-c*h-u*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,u=o(i/2),f=o(r/2),p=o(s/2),h=c(i/2),m=c(r/2),x=c(s/2);switch(a){case"XYZ":this._x=h*f*p+u*m*x,this._y=u*m*p-h*f*x,this._z=u*f*x+h*m*p,this._w=u*f*p-h*m*x;break;case"YXZ":this._x=h*f*p+u*m*x,this._y=u*m*p-h*f*x,this._z=u*f*x-h*m*p,this._w=u*f*p+h*m*x;break;case"ZXY":this._x=h*f*p-u*m*x,this._y=u*m*p+h*f*x,this._z=u*f*x+h*m*p,this._w=u*f*p-h*m*x;break;case"ZYX":this._x=h*f*p-u*m*x,this._y=u*m*p+h*f*x,this._z=u*f*x-h*m*p,this._w=u*f*p+h*m*x;break;case"YZX":this._x=h*f*p+u*m*x,this._y=u*m*p+h*f*x,this._z=u*f*x-h*m*p,this._w=u*f*p-h*m*x;break;case"XZY":this._x=h*f*p-u*m*x,this._y=u*m*p-h*f*x,this._z=u*f*x+h*m*p,this._w=u*f*p+h*m*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],c=n[9],u=n[2],f=n[6],p=n[10],h=i+o+p;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(f-c)*m,this._y=(s-u)*m,this._z=(a-r)*m}else if(i>o&&i>p){const m=2*Math.sqrt(1+i-o-p);this._w=(f-c)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+u)/m}else if(o>p){const m=2*Math.sqrt(1+o-i-p);this._w=(s-u)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(c+f)/m}else{const m=2*Math.sqrt(1+p-i-o);this._w=(a-r)/m,this._x=(s+u)/m,this._y=(c+f)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(hn(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,a=e._w,o=n._x,c=n._y,u=n._z,f=n._w;return this._x=i*f+a*o+r*u-s*c,this._y=r*f+a*c+s*o-i*u,this._z=s*f+a*u+i*c-r*o,this._w=a*f-i*o-r*c-s*u,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const m=1-n;return this._w=m*a+n*this._w,this._x=m*i+n*this._x,this._y=m*r+n*this._y,this._z=m*s+n*this._z,this.normalize(),this}const u=Math.sqrt(c),f=Math.atan2(u,o),p=Math.sin((1-n)*f)/u,h=Math.sin(n*f)/u;return this._w=a*p+this._w*h,this._x=i*p+this._x*h,this._y=r*p+this._y*h,this._z=s*p+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class j{constructor(e=0,n=0,i=0){j.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(dp.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(dp.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,u=2*(a*r-o*i),f=2*(o*n-s*r),p=2*(s*i-a*n);return this.x=n+c*u+a*p-o*f,this.y=i+c*f+o*u-s*p,this.z=r+c*p+s*f-a*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,a=n.x,o=n.y,c=n.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Wc.copy(this).projectOnVector(e),this.sub(Wc)}reflect(e){return this.sub(Wc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(hn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Wc=new j,dp=new $a;class Ka{constructor(e=new j(1/0,1/0,1/0),n=new j(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Vn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Vn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Vn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Vn):Vn.fromBufferAttribute(s,a),Vn.applyMatrix4(e.matrixWorld),this.expandByPoint(Vn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),So.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),So.copy(i.boundingBox)),So.applyMatrix4(e.matrixWorld),this.union(So)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Vn),Vn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(sa),Mo.subVectors(this.max,sa),qr.subVectors(e.a,sa),Yr.subVectors(e.b,sa),$r.subVectors(e.c,sa),Di.subVectors(Yr,qr),Ui.subVectors($r,Yr),pr.subVectors(qr,$r);let n=[0,-Di.z,Di.y,0,-Ui.z,Ui.y,0,-pr.z,pr.y,Di.z,0,-Di.x,Ui.z,0,-Ui.x,pr.z,0,-pr.x,-Di.y,Di.x,0,-Ui.y,Ui.x,0,-pr.y,pr.x,0];return!Xc(n,qr,Yr,$r,Mo)||(n=[1,0,0,0,1,0,0,0,1],!Xc(n,qr,Yr,$r,Mo))?!1:(Eo.crossVectors(Di,Ui),n=[Eo.x,Eo.y,Eo.z],Xc(n,qr,Yr,$r,Mo))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Vn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Vn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(di),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const di=[new j,new j,new j,new j,new j,new j,new j,new j],Vn=new j,So=new Ka,qr=new j,Yr=new j,$r=new j,Di=new j,Ui=new j,pr=new j,sa=new j,Mo=new j,Eo=new j,mr=new j;function Xc(t,e,n,i,r){for(let s=0,a=t.length-3;s<=a;s+=3){mr.fromArray(t,s);const o=r.x*Math.abs(mr.x)+r.y*Math.abs(mr.y)+r.z*Math.abs(mr.z),c=e.dot(mr),u=n.dot(mr),f=i.dot(mr);if(Math.max(-Math.max(c,u,f),Math.min(c,u,f))>o)return!1}return!0}const Qy=new Ka,aa=new j,qc=new j;class ic{constructor(e=new j,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):Qy.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;aa.subVectors(e,this.center);const n=aa.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(aa,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(qc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(aa.copy(e.center).add(qc)),this.expandByPoint(aa.copy(e.center).sub(qc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const fi=new j,Yc=new j,To=new j,Ii=new j,$c=new j,wo=new j,Kc=new j;class kv{constructor(e=new j,n=new j(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=fi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(fi.copy(this.origin).addScaledVector(this.direction,n),fi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Yc.copy(e).add(n).multiplyScalar(.5),To.copy(n).sub(e).normalize(),Ii.copy(this.origin).sub(Yc);const s=e.distanceTo(n)*.5,a=-this.direction.dot(To),o=Ii.dot(this.direction),c=-Ii.dot(To),u=Ii.lengthSq(),f=Math.abs(1-a*a);let p,h,m,x;if(f>0)if(p=a*c-o,h=a*o-c,x=s*f,p>=0)if(h>=-x)if(h<=x){const y=1/f;p*=y,h*=y,m=p*(p+a*h+2*o)+h*(a*p+h+2*c)+u}else h=s,p=Math.max(0,-(a*h+o)),m=-p*p+h*(h+2*c)+u;else h=-s,p=Math.max(0,-(a*h+o)),m=-p*p+h*(h+2*c)+u;else h<=-x?(p=Math.max(0,-(-a*s+o)),h=p>0?-s:Math.min(Math.max(-s,-c),s),m=-p*p+h*(h+2*c)+u):h<=x?(p=0,h=Math.min(Math.max(-s,-c),s),m=h*(h+2*c)+u):(p=Math.max(0,-(a*s+o)),h=p>0?s:Math.min(Math.max(-s,-c),s),m=-p*p+h*(h+2*c)+u);else h=a>0?-s:s,p=Math.max(0,-(a*h+o)),m=-p*p+h*(h+2*c)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(Yc).addScaledVector(To,h),m}intersectSphere(e,n){fi.subVectors(e.center,this.origin);const i=fi.dot(this.direction),r=fi.dot(fi)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,n):this.at(o,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,a,o,c;const u=1/this.direction.x,f=1/this.direction.y,p=1/this.direction.z,h=this.origin;return u>=0?(i=(e.min.x-h.x)*u,r=(e.max.x-h.x)*u):(i=(e.max.x-h.x)*u,r=(e.min.x-h.x)*u),f>=0?(s=(e.min.y-h.y)*f,a=(e.max.y-h.y)*f):(s=(e.max.y-h.y)*f,a=(e.min.y-h.y)*f),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),p>=0?(o=(e.min.z-h.z)*p,c=(e.max.z-h.z)*p):(o=(e.max.z-h.z)*p,c=(e.min.z-h.z)*p),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,fi)!==null}intersectTriangle(e,n,i,r,s){$c.subVectors(n,e),wo.subVectors(i,e),Kc.crossVectors($c,wo);let a=this.direction.dot(Kc),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ii.subVectors(this.origin,e);const c=o*this.direction.dot(wo.crossVectors(Ii,wo));if(c<0)return null;const u=o*this.direction.dot($c.cross(Ii));if(u<0||c+u>a)return null;const f=-o*Ii.dot(Kc);return f<0?null:this.at(f/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Bt{constructor(e,n,i,r,s,a,o,c,u,f,p,h,m,x,y,g){Bt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,c,u,f,p,h,m,x,y,g)}set(e,n,i,r,s,a,o,c,u,f,p,h,m,x,y,g){const d=this.elements;return d[0]=e,d[4]=n,d[8]=i,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=c,d[2]=u,d[6]=f,d[10]=p,d[14]=h,d[3]=m,d[7]=x,d[11]=y,d[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Bt().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/Kr.setFromMatrixColumn(e,0).length(),s=1/Kr.setFromMatrixColumn(e,1).length(),a=1/Kr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),u=Math.sin(r),f=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){const h=a*f,m=a*p,x=o*f,y=o*p;n[0]=c*f,n[4]=-c*p,n[8]=u,n[1]=m+x*u,n[5]=h-y*u,n[9]=-o*c,n[2]=y-h*u,n[6]=x+m*u,n[10]=a*c}else if(e.order==="YXZ"){const h=c*f,m=c*p,x=u*f,y=u*p;n[0]=h+y*o,n[4]=x*o-m,n[8]=a*u,n[1]=a*p,n[5]=a*f,n[9]=-o,n[2]=m*o-x,n[6]=y+h*o,n[10]=a*c}else if(e.order==="ZXY"){const h=c*f,m=c*p,x=u*f,y=u*p;n[0]=h-y*o,n[4]=-a*p,n[8]=x+m*o,n[1]=m+x*o,n[5]=a*f,n[9]=y-h*o,n[2]=-a*u,n[6]=o,n[10]=a*c}else if(e.order==="ZYX"){const h=a*f,m=a*p,x=o*f,y=o*p;n[0]=c*f,n[4]=x*u-m,n[8]=h*u+y,n[1]=c*p,n[5]=y*u+h,n[9]=m*u-x,n[2]=-u,n[6]=o*c,n[10]=a*c}else if(e.order==="YZX"){const h=a*c,m=a*u,x=o*c,y=o*u;n[0]=c*f,n[4]=y-h*p,n[8]=x*p+m,n[1]=p,n[5]=a*f,n[9]=-o*f,n[2]=-u*f,n[6]=m*p+x,n[10]=h-y*p}else if(e.order==="XZY"){const h=a*c,m=a*u,x=o*c,y=o*u;n[0]=c*f,n[4]=-p,n[8]=u*f,n[1]=h*p+y,n[5]=a*f,n[9]=m*p-x,n[2]=x*p-m,n[6]=o*f,n[10]=y*p+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Jy,e,eS)}lookAt(e,n,i){const r=this.elements;return Sn.subVectors(e,n),Sn.lengthSq()===0&&(Sn.z=1),Sn.normalize(),Fi.crossVectors(i,Sn),Fi.lengthSq()===0&&(Math.abs(i.z)===1?Sn.x+=1e-4:Sn.z+=1e-4,Sn.normalize(),Fi.crossVectors(i,Sn)),Fi.normalize(),Ao.crossVectors(Sn,Fi),r[0]=Fi.x,r[4]=Ao.x,r[8]=Sn.x,r[1]=Fi.y,r[5]=Ao.y,r[9]=Sn.y,r[2]=Fi.z,r[6]=Ao.z,r[10]=Sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],c=i[8],u=i[12],f=i[1],p=i[5],h=i[9],m=i[13],x=i[2],y=i[6],g=i[10],d=i[14],v=i[3],_=i[7],T=i[11],D=i[15],C=r[0],A=r[4],R=r[8],E=r[12],S=r[1],N=r[5],G=r[9],z=r[13],te=r[2],Q=r[6],$=r[10],J=r[14],F=r[3],ee=r[7],ie=r[11],ue=r[15];return s[0]=a*C+o*S+c*te+u*F,s[4]=a*A+o*N+c*Q+u*ee,s[8]=a*R+o*G+c*$+u*ie,s[12]=a*E+o*z+c*J+u*ue,s[1]=f*C+p*S+h*te+m*F,s[5]=f*A+p*N+h*Q+m*ee,s[9]=f*R+p*G+h*$+m*ie,s[13]=f*E+p*z+h*J+m*ue,s[2]=x*C+y*S+g*te+d*F,s[6]=x*A+y*N+g*Q+d*ee,s[10]=x*R+y*G+g*$+d*ie,s[14]=x*E+y*z+g*J+d*ue,s[3]=v*C+_*S+T*te+D*F,s[7]=v*A+_*N+T*Q+D*ee,s[11]=v*R+_*G+T*$+D*ie,s[15]=v*E+_*z+T*J+D*ue,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],u=e[13],f=e[2],p=e[6],h=e[10],m=e[14],x=e[3],y=e[7],g=e[11],d=e[15];return x*(+s*c*p-r*u*p-s*o*h+i*u*h+r*o*m-i*c*m)+y*(+n*c*m-n*u*h+s*a*h-r*a*m+r*u*f-s*c*f)+g*(+n*u*p-n*o*m-s*a*p+i*a*m+s*o*f-i*u*f)+d*(-r*o*f-n*c*p+n*o*h+r*a*p-i*a*h+i*c*f)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],u=e[7],f=e[8],p=e[9],h=e[10],m=e[11],x=e[12],y=e[13],g=e[14],d=e[15],v=p*g*u-y*h*u+y*c*m-o*g*m-p*c*d+o*h*d,_=x*h*u-f*g*u-x*c*m+a*g*m+f*c*d-a*h*d,T=f*y*u-x*p*u+x*o*m-a*y*m-f*o*d+a*p*d,D=x*p*c-f*y*c-x*o*h+a*y*h+f*o*g-a*p*g,C=n*v+i*_+r*T+s*D;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/C;return e[0]=v*A,e[1]=(y*h*s-p*g*s-y*r*m+i*g*m+p*r*d-i*h*d)*A,e[2]=(o*g*s-y*c*s+y*r*u-i*g*u-o*r*d+i*c*d)*A,e[3]=(p*c*s-o*h*s-p*r*u+i*h*u+o*r*m-i*c*m)*A,e[4]=_*A,e[5]=(f*g*s-x*h*s+x*r*m-n*g*m-f*r*d+n*h*d)*A,e[6]=(x*c*s-a*g*s-x*r*u+n*g*u+a*r*d-n*c*d)*A,e[7]=(a*h*s-f*c*s+f*r*u-n*h*u-a*r*m+n*c*m)*A,e[8]=T*A,e[9]=(x*p*s-f*y*s-x*i*m+n*y*m+f*i*d-n*p*d)*A,e[10]=(a*y*s-x*o*s+x*i*u-n*y*u-a*i*d+n*o*d)*A,e[11]=(f*o*s-a*p*s-f*i*u+n*p*u+a*i*m-n*o*m)*A,e[12]=D*A,e[13]=(f*y*r-x*p*r+x*i*h-n*y*h-f*i*g+n*p*g)*A,e[14]=(x*o*r-a*y*r-x*i*c+n*y*c+a*i*g-n*o*g)*A,e[15]=(a*p*r-f*o*r+f*i*c-n*p*c-a*i*h+n*o*h)*A,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=e.x,o=e.y,c=e.z,u=s*a,f=s*o;return this.set(u*a+i,u*o-r*c,u*c+r*o,0,u*o+r*c,f*o+i,f*c-r*a,0,u*c-r*o,f*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,c=n._w,u=s+s,f=a+a,p=o+o,h=s*u,m=s*f,x=s*p,y=a*f,g=a*p,d=o*p,v=c*u,_=c*f,T=c*p,D=i.x,C=i.y,A=i.z;return r[0]=(1-(y+d))*D,r[1]=(m+T)*D,r[2]=(x-_)*D,r[3]=0,r[4]=(m-T)*C,r[5]=(1-(h+d))*C,r[6]=(g+v)*C,r[7]=0,r[8]=(x+_)*A,r[9]=(g-v)*A,r[10]=(1-(h+y))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=Kr.set(r[0],r[1],r[2]).length();const a=Kr.set(r[4],r[5],r[6]).length(),o=Kr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Gn.copy(this);const u=1/s,f=1/a,p=1/o;return Gn.elements[0]*=u,Gn.elements[1]*=u,Gn.elements[2]*=u,Gn.elements[4]*=f,Gn.elements[5]*=f,Gn.elements[6]*=f,Gn.elements[8]*=p,Gn.elements[9]*=p,Gn.elements[10]*=p,n.setFromRotationMatrix(Gn),i.x=s,i.y=a,i.z=o,this}makePerspective(e,n,i,r,s,a,o=Mi){const c=this.elements,u=2*s/(n-e),f=2*s/(i-r),p=(n+e)/(n-e),h=(i+r)/(i-r);let m,x;if(o===Mi)m=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===Dl)m=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=p,c[12]=0,c[1]=0,c[5]=f,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,s,a,o=Mi){const c=this.elements,u=1/(n-e),f=1/(i-r),p=1/(a-s),h=(n+e)*u,m=(i+r)*f;let x,y;if(o===Mi)x=(a+s)*p,y=-2*p;else if(o===Dl)x=s*p,y=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*u,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*f,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=y,c[14]=-x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Kr=new j,Gn=new Bt,Jy=new j(0,0,0),eS=new j(1,1,1),Fi=new j,Ao=new j,Sn=new j,fp=new Bt,hp=new $a;class bi{constructor(e=0,n=0,i=0,r=bi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],u=r[5],f=r[9],p=r[2],h=r[6],m=r[10];switch(n){case"XYZ":this._y=Math.asin(hn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-hn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,u)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(hn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-hn(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(hn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,u),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-hn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-f,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return fp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(fp,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return hp.setFromEuler(this),this.setFromQuaternion(hp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}bi.DEFAULT_ORDER="XYZ";class Bv{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let tS=0;const pp=new j,Zr=new $a,hi=new Bt,Co=new j,oa=new j,nS=new j,iS=new $a,mp=new j(1,0,0),gp=new j(0,1,0),vp=new j(0,0,1),_p={type:"added"},rS={type:"removed"},Qr={type:"childadded",child:null},Zc={type:"childremoved",child:null};class yn extends Xs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tS++}),this.uuid=Ya(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=yn.DEFAULT_UP.clone();const e=new j,n=new bi,i=new $a,r=new j(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Bt},normalMatrix:{value:new st}}),this.matrix=new Bt,this.matrixWorld=new Bt,this.matrixAutoUpdate=yn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=yn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bv,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Zr.setFromAxisAngle(e,n),this.quaternion.multiply(Zr),this}rotateOnWorldAxis(e,n){return Zr.setFromAxisAngle(e,n),this.quaternion.premultiply(Zr),this}rotateX(e){return this.rotateOnAxis(mp,e)}rotateY(e){return this.rotateOnAxis(gp,e)}rotateZ(e){return this.rotateOnAxis(vp,e)}translateOnAxis(e,n){return pp.copy(e).applyQuaternion(this.quaternion),this.position.add(pp.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(mp,e)}translateY(e){return this.translateOnAxis(gp,e)}translateZ(e){return this.translateOnAxis(vp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hi.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Co.copy(e):Co.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),oa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hi.lookAt(oa,Co,this.up):hi.lookAt(Co,oa,this.up),this.quaternion.setFromRotationMatrix(hi),r&&(hi.extractRotation(r.matrixWorld),Zr.setFromRotationMatrix(hi),this.quaternion.premultiply(Zr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(_p),Qr.child=e,this.dispatchEvent(Qr),Qr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(rS),Zc.child=e,this.dispatchEvent(Zc),Zc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hi.multiply(e.parent.matrixWorld)),e.applyMatrix4(hi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(_p),Qr.child=e,this.dispatchEvent(Qr),Qr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(oa,e,nS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(oa,iS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++){const s=n[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),n===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let u=0,f=c.length;u<f;u++){const p=c[u];s(e.shapes,p)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,u=this.material.length;c<u;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(n){const o=a(e.geometries),c=a(e.materials),u=a(e.textures),f=a(e.images),p=a(e.shapes),h=a(e.skeletons),m=a(e.animations),x=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),u.length>0&&(i.textures=u),f.length>0&&(i.images=f),p.length>0&&(i.shapes=p),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),x.length>0&&(i.nodes=x)}return i.object=r,i;function a(o){const c=[];for(const u in o){const f=o[u];delete f.metadata,c.push(f)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}yn.DEFAULT_UP=new j(0,1,0);yn.DEFAULT_MATRIX_AUTO_UPDATE=!0;yn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Wn=new j,pi=new j,Qc=new j,mi=new j,Jr=new j,es=new j,xp=new j,Jc=new j,eu=new j,tu=new j;class si{constructor(e=new j,n=new j,i=new j){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Wn.subVectors(e,n),r.cross(Wn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Wn.subVectors(r,n),pi.subVectors(i,n),Qc.subVectors(e,n);const a=Wn.dot(Wn),o=Wn.dot(pi),c=Wn.dot(Qc),u=pi.dot(pi),f=pi.dot(Qc),p=a*u-o*o;if(p===0)return s.set(0,0,0),null;const h=1/p,m=(u*c-o*f)*h,x=(a*f-o*c)*h;return s.set(1-m-x,x,m)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,mi)===null?!1:mi.x>=0&&mi.y>=0&&mi.x+mi.y<=1}static getInterpolation(e,n,i,r,s,a,o,c){return this.getBarycoord(e,n,i,r,mi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,mi.x),c.addScaledVector(a,mi.y),c.addScaledVector(o,mi.z),c)}static isFrontFacing(e,n,i,r){return Wn.subVectors(i,n),pi.subVectors(e,n),Wn.cross(pi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wn.subVectors(this.c,this.b),pi.subVectors(this.a,this.b),Wn.cross(pi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return si.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return si.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return si.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return si.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return si.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let a,o;Jr.subVectors(r,i),es.subVectors(s,i),Jc.subVectors(e,i);const c=Jr.dot(Jc),u=es.dot(Jc);if(c<=0&&u<=0)return n.copy(i);eu.subVectors(e,r);const f=Jr.dot(eu),p=es.dot(eu);if(f>=0&&p<=f)return n.copy(r);const h=c*p-f*u;if(h<=0&&c>=0&&f<=0)return a=c/(c-f),n.copy(i).addScaledVector(Jr,a);tu.subVectors(e,s);const m=Jr.dot(tu),x=es.dot(tu);if(x>=0&&m<=x)return n.copy(s);const y=m*u-c*x;if(y<=0&&u>=0&&x<=0)return o=u/(u-x),n.copy(i).addScaledVector(es,o);const g=f*x-m*p;if(g<=0&&p-f>=0&&m-x>=0)return xp.subVectors(s,r),o=(p-f)/(p-f+(m-x)),n.copy(r).addScaledVector(xp,o);const d=1/(g+y+h);return a=y*d,o=h*d,n.copy(i).addScaledVector(Jr,a).addScaledVector(es,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const zv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Oi={h:0,s:0,l:0},Ro={h:0,s:0,l:0};function nu(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class gt{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=ni){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,mt.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=mt.workingColorSpace){return this.r=e,this.g=n,this.b=i,mt.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=mt.workingColorSpace){if(e=Vy(e,1),n=hn(n,0,1),i=hn(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=nu(a,s,e+1/3),this.g=nu(a,s,e),this.b=nu(a,s,e-1/3)}return mt.toWorkingColorSpace(this,r),this}setStyle(e,n=ni){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=ni){const i=zv[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=bs(e.r),this.g=bs(e.g),this.b=bs(e.b),this}copyLinearToSRGB(e){return this.r=Vc(e.r),this.g=Vc(e.g),this.b=Vc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ni){return mt.fromWorkingColorSpace(tn.copy(this),e),Math.round(hn(tn.r*255,0,255))*65536+Math.round(hn(tn.g*255,0,255))*256+Math.round(hn(tn.b*255,0,255))}getHexString(e=ni){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=mt.workingColorSpace){mt.fromWorkingColorSpace(tn.copy(this),n);const i=tn.r,r=tn.g,s=tn.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,u;const f=(o+a)/2;if(o===a)c=0,u=0;else{const p=a-o;switch(u=f<=.5?p/(a+o):p/(2-a-o),a){case i:c=(r-s)/p+(r<s?6:0);break;case r:c=(s-i)/p+2;break;case s:c=(i-r)/p+4;break}c/=6}return e.h=c,e.s=u,e.l=f,e}getRGB(e,n=mt.workingColorSpace){return mt.fromWorkingColorSpace(tn.copy(this),n),e.r=tn.r,e.g=tn.g,e.b=tn.b,e}getStyle(e=ni){mt.fromWorkingColorSpace(tn.copy(this),e);const n=tn.r,i=tn.g,r=tn.b;return e!==ni?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Oi),this.setHSL(Oi.h+e,Oi.s+n,Oi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Oi),e.getHSL(Ro);const i=Hc(Oi.h,Ro.h,n),r=Hc(Oi.s,Ro.s,n),s=Hc(Oi.l,Ro.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const tn=new gt;gt.NAMES=zv;let sS=0;class Za extends Xs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sS++}),this.uuid=Ya(),this.name="",this.type="Material",this.blending=Cs,this.side=ar,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ud,this.blendDst=dd,this.blendEquation=Ar,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new gt(0,0,0),this.blendAlpha=0,this.depthFunc=Rl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wr,this.stencilZFail=Wr,this.stencilZPass=Wr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Cs&&(i.blending=this.blending),this.side!==ar&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ud&&(i.blendSrc=this.blendSrc),this.blendDst!==dd&&(i.blendDst=this.blendDst),this.blendEquation!==Ar&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Rl&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==sp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Wr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Wr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Wr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(n){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Hv extends Za{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bi,this.combine=wv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ot=new j,bo=new pt;class kn{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=ap,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Xi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Iv("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)bo.fromBufferAttribute(this,n),bo.applyMatrix3(e),this.setXY(n,bo.x,bo.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.applyMatrix3(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.applyMatrix4(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.applyNormalMatrix(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.transformDirection(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=ra(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=dn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=ra(n,this.array)),n}setX(e,n){return this.normalized&&(n=dn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=ra(n,this.array)),n}setY(e,n){return this.normalized&&(n=dn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=ra(n,this.array)),n}setZ(e,n){return this.normalized&&(n=dn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=ra(n,this.array)),n}setW(e,n){return this.normalized&&(n=dn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=dn(n,this.array),i=dn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=dn(n,this.array),i=dn(i,this.array),r=dn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=dn(n,this.array),i=dn(i,this.array),r=dn(r,this.array),s=dn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ap&&(e.usage=this.usage),e}}class jv extends kn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class Vv extends kn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class ir extends kn{constructor(e,n,i){super(new Float32Array(e),n,i)}}let aS=0;const Pn=new Bt,iu=new yn,ts=new j,Mn=new Ka,la=new Ka,Wt=new j;class Pi extends Xs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:aS++}),this.uuid=Ya(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Uv(e)?Vv:jv)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new st().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Pn.makeRotationFromQuaternion(e),this.applyMatrix4(Pn),this}rotateX(e){return Pn.makeRotationX(e),this.applyMatrix4(Pn),this}rotateY(e){return Pn.makeRotationY(e),this.applyMatrix4(Pn),this}rotateZ(e){return Pn.makeRotationZ(e),this.applyMatrix4(Pn),this}translate(e,n,i){return Pn.makeTranslation(e,n,i),this.applyMatrix4(Pn),this}scale(e,n,i){return Pn.makeScale(e,n,i),this.applyMatrix4(Pn),this}lookAt(e){return iu.lookAt(e),iu.updateMatrix(),this.applyMatrix4(iu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ts).negate(),this.translate(ts.x,ts.y,ts.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new ir(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ka);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new j(-1/0,-1/0,-1/0),new j(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];Mn.setFromBufferAttribute(s),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,Mn.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,Mn.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(Mn.min),this.boundingBox.expandByPoint(Mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ic);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new j,1/0);return}if(e){const i=this.boundingSphere.center;if(Mn.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];la.setFromBufferAttribute(o),this.morphTargetsRelative?(Wt.addVectors(Mn.min,la.min),Mn.expandByPoint(Wt),Wt.addVectors(Mn.max,la.max),Mn.expandByPoint(Wt)):(Mn.expandByPoint(la.min),Mn.expandByPoint(la.max))}Mn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Wt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Wt));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],c=this.morphTargetsRelative;for(let u=0,f=o.count;u<f;u++)Wt.fromBufferAttribute(o,u),c&&(ts.fromBufferAttribute(e,u),Wt.add(ts)),r=Math.max(r,i.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new kn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let R=0;R<i.count;R++)o[R]=new j,c[R]=new j;const u=new j,f=new j,p=new j,h=new pt,m=new pt,x=new pt,y=new j,g=new j;function d(R,E,S){u.fromBufferAttribute(i,R),f.fromBufferAttribute(i,E),p.fromBufferAttribute(i,S),h.fromBufferAttribute(s,R),m.fromBufferAttribute(s,E),x.fromBufferAttribute(s,S),f.sub(u),p.sub(u),m.sub(h),x.sub(h);const N=1/(m.x*x.y-x.x*m.y);isFinite(N)&&(y.copy(f).multiplyScalar(x.y).addScaledVector(p,-m.y).multiplyScalar(N),g.copy(p).multiplyScalar(m.x).addScaledVector(f,-x.x).multiplyScalar(N),o[R].add(y),o[E].add(y),o[S].add(y),c[R].add(g),c[E].add(g),c[S].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let R=0,E=v.length;R<E;++R){const S=v[R],N=S.start,G=S.count;for(let z=N,te=N+G;z<te;z+=3)d(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const _=new j,T=new j,D=new j,C=new j;function A(R){D.fromBufferAttribute(r,R),C.copy(D);const E=o[R];_.copy(E),_.sub(D.multiplyScalar(D.dot(E))).normalize(),T.crossVectors(C,E);const N=T.dot(c[R])<0?-1:1;a.setXYZW(R,_.x,_.y,_.z,N)}for(let R=0,E=v.length;R<E;++R){const S=v[R],N=S.start,G=S.count;for(let z=N,te=N+G;z<te;z+=3)A(e.getX(z+0)),A(e.getX(z+1)),A(e.getX(z+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new kn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const r=new j,s=new j,a=new j,o=new j,c=new j,u=new j,f=new j,p=new j;if(e)for(let h=0,m=e.count;h<m;h+=3){const x=e.getX(h+0),y=e.getX(h+1),g=e.getX(h+2);r.fromBufferAttribute(n,x),s.fromBufferAttribute(n,y),a.fromBufferAttribute(n,g),f.subVectors(a,s),p.subVectors(r,s),f.cross(p),o.fromBufferAttribute(i,x),c.fromBufferAttribute(i,y),u.fromBufferAttribute(i,g),o.add(f),c.add(f),u.add(f),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(y,c.x,c.y,c.z),i.setXYZ(g,u.x,u.y,u.z)}else for(let h=0,m=n.count;h<m;h+=3)r.fromBufferAttribute(n,h+0),s.fromBufferAttribute(n,h+1),a.fromBufferAttribute(n,h+2),f.subVectors(a,s),p.subVectors(r,s),f.cross(p),i.setXYZ(h+0,f.x,f.y,f.z),i.setXYZ(h+1,f.x,f.y,f.z),i.setXYZ(h+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Wt.fromBufferAttribute(e,n),Wt.normalize(),e.setXYZ(n,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(o,c){const u=o.array,f=o.itemSize,p=o.normalized,h=new u.constructor(c.length*f);let m=0,x=0;for(let y=0,g=c.length;y<g;y++){o.isInterleavedBufferAttribute?m=c[y]*o.data.stride+o.offset:m=c[y]*f;for(let d=0;d<f;d++)h[x++]=u[m++]}return new kn(h,f,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Pi,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],u=e(c,i);n.setAttribute(o,u)}const s=this.morphAttributes;for(const o in s){const c=[],u=s[o];for(let f=0,p=u.length;f<p;f++){const h=u[f],m=e(h,i);c.push(m)}n.morphAttributes[o]=c}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const u=a[o];n.addGroup(u.start,u.count,u.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const u in c)c[u]!==void 0&&(e[u]=c[u]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const c in i){const u=i[c];e.data.attributes[c]=u.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const u=this.morphAttributes[c],f=[];for(let p=0,h=u.length;p<h;p++){const m=u[p];f.push(m.toJSON(e.data))}f.length>0&&(r[c]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const u in r){const f=r[u];this.setAttribute(u,f.clone(n))}const s=e.morphAttributes;for(const u in s){const f=[],p=s[u];for(let h=0,m=p.length;h<m;h++)f.push(p[h].clone(n));this.morphAttributes[u]=f}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let u=0,f=a.length;u<f;u++){const p=a[u];this.addGroup(p.start,p.count,p.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const yp=new Bt,gr=new kv,No=new ic,Sp=new j,ns=new j,is=new j,rs=new j,ru=new j,Po=new j,Lo=new pt,Do=new pt,Uo=new pt,Mp=new j,Ep=new j,Tp=new j,Io=new j,Fo=new j;class Ei extends yn{constructor(e=new Pi,n=new Hv){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Po.set(0,0,0);for(let c=0,u=s.length;c<u;c++){const f=o[c],p=s[c];f!==0&&(ru.fromBufferAttribute(p,e),a?Po.addScaledVector(ru,f):Po.addScaledVector(ru.sub(n),f))}n.add(Po)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),No.copy(i.boundingSphere),No.applyMatrix4(s),gr.copy(e.ray).recast(e.near),!(No.containsPoint(gr.origin)===!1&&(gr.intersectSphere(No,Sp)===null||gr.origin.distanceToSquared(Sp)>(e.far-e.near)**2))&&(yp.copy(s).invert(),gr.copy(e.ray).applyMatrix4(yp),!(i.boundingBox!==null&&gr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,gr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,u=s.attributes.uv,f=s.attributes.uv1,p=s.attributes.normal,h=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,y=h.length;x<y;x++){const g=h[x],d=a[g.materialIndex],v=Math.max(g.start,m.start),_=Math.min(o.count,Math.min(g.start+g.count,m.start+m.count));for(let T=v,D=_;T<D;T+=3){const C=o.getX(T),A=o.getX(T+1),R=o.getX(T+2);r=Oo(this,d,e,i,u,f,p,C,A,R),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const x=Math.max(0,m.start),y=Math.min(o.count,m.start+m.count);for(let g=x,d=y;g<d;g+=3){const v=o.getX(g),_=o.getX(g+1),T=o.getX(g+2);r=Oo(this,a,e,i,u,f,p,v,_,T),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let x=0,y=h.length;x<y;x++){const g=h[x],d=a[g.materialIndex],v=Math.max(g.start,m.start),_=Math.min(c.count,Math.min(g.start+g.count,m.start+m.count));for(let T=v,D=_;T<D;T+=3){const C=T,A=T+1,R=T+2;r=Oo(this,d,e,i,u,f,p,C,A,R),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const x=Math.max(0,m.start),y=Math.min(c.count,m.start+m.count);for(let g=x,d=y;g<d;g+=3){const v=g,_=g+1,T=g+2;r=Oo(this,a,e,i,u,f,p,v,_,T),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function oS(t,e,n,i,r,s,a,o){let c;if(e.side===_n?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===ar,o),c===null)return null;Fo.copy(o),Fo.applyMatrix4(t.matrixWorld);const u=n.ray.origin.distanceTo(Fo);return u<n.near||u>n.far?null:{distance:u,point:Fo.clone(),object:t}}function Oo(t,e,n,i,r,s,a,o,c,u){t.getVertexPosition(o,ns),t.getVertexPosition(c,is),t.getVertexPosition(u,rs);const f=oS(t,e,n,i,ns,is,rs,Io);if(f){r&&(Lo.fromBufferAttribute(r,o),Do.fromBufferAttribute(r,c),Uo.fromBufferAttribute(r,u),f.uv=si.getInterpolation(Io,ns,is,rs,Lo,Do,Uo,new pt)),s&&(Lo.fromBufferAttribute(s,o),Do.fromBufferAttribute(s,c),Uo.fromBufferAttribute(s,u),f.uv1=si.getInterpolation(Io,ns,is,rs,Lo,Do,Uo,new pt)),a&&(Mp.fromBufferAttribute(a,o),Ep.fromBufferAttribute(a,c),Tp.fromBufferAttribute(a,u),f.normal=si.getInterpolation(Io,ns,is,rs,Mp,Ep,Tp,new j),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const p={a:o,b:c,c:u,normal:new j,materialIndex:0};si.getNormal(ns,is,rs,p.normal),f.face=p}return f}class Qa extends Pi{constructor(e=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],u=[],f=[],p=[];let h=0,m=0;x("z","y","x",-1,-1,i,n,e,a,s,0),x("z","y","x",1,-1,i,n,-e,a,s,1),x("x","z","y",1,1,e,i,n,r,a,2),x("x","z","y",1,-1,e,i,-n,r,a,3),x("x","y","z",1,-1,e,n,i,r,s,4),x("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new ir(u,3)),this.setAttribute("normal",new ir(f,3)),this.setAttribute("uv",new ir(p,2));function x(y,g,d,v,_,T,D,C,A,R,E){const S=T/A,N=D/R,G=T/2,z=D/2,te=C/2,Q=A+1,$=R+1;let J=0,F=0;const ee=new j;for(let ie=0;ie<$;ie++){const ue=ie*N-z;for(let Ie=0;Ie<Q;Ie++){const at=Ie*S-G;ee[y]=at*v,ee[g]=ue*_,ee[d]=te,u.push(ee.x,ee.y,ee.z),ee[y]=0,ee[g]=0,ee[d]=C>0?1:-1,f.push(ee.x,ee.y,ee.z),p.push(Ie/A),p.push(1-ie/R),J+=1}}for(let ie=0;ie<R;ie++)for(let ue=0;ue<A;ue++){const Ie=h+ue+Q*ie,at=h+ue+Q*(ie+1),X=h+(ue+1)+Q*(ie+1),se=h+(ue+1)+Q*ie;c.push(Ie,at,se),c.push(at,X,se),F+=6}o.addGroup(m,F,E),m+=F,h+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qa(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function js(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function an(t){const e={};for(let n=0;n<t.length;n++){const i=js(t[n]);for(const r in i)e[r]=i[r]}return e}function lS(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Gv(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:mt.workingColorSpace}const cS={clone:js,merge:an};var uS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,dS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class lr extends Za{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=uS,this.fragmentShader=dS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=js(e.uniforms),this.uniformsGroups=lS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Wv extends yn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Bt,this.projectionMatrix=new Bt,this.projectionMatrixInverse=new Bt,this.coordinateSystem=Mi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ki=new j,wp=new pt,Ap=new pt;class Un extends Wv{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=gd*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(zc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return gd*2*Math.atan(Math.tan(zc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){ki.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ki.x,ki.y).multiplyScalar(-e/ki.z),ki.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ki.x,ki.y).multiplyScalar(-e/ki.z)}getViewSize(e,n){return this.getViewBounds(e,wp,Ap),n.subVectors(Ap,wp)}setViewOffset(e,n,i,r,s,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(zc*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,u=a.fullHeight;s+=a.offsetX*r/c,n-=a.offsetY*i/u,r*=a.width/c,i*=a.height/u}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const ss=-90,as=1;class fS extends yn{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Un(ss,as,e,n);r.layers=this.layers,this.add(r);const s=new Un(ss,as,e,n);s.layers=this.layers,this.add(s);const a=new Un(ss,as,e,n);a.layers=this.layers,this.add(a);const o=new Un(ss,as,e,n);o.layers=this.layers,this.add(o);const c=new Un(ss,as,e,n);c.layers=this.layers,this.add(c);const u=new Un(ss,as,e,n);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,a,o,c]=n;for(const u of n)this.remove(u);if(e===Mi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Dl)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of n)this.add(u),u.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,u,f]=this.children,p=e.getRenderTarget(),h=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,a),e.setRenderTarget(i,2,r),e.render(n,o),e.setRenderTarget(i,3,r),e.render(n,c),e.setRenderTarget(i,4,r),e.render(n,u),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,r),e.render(n,f),e.setRenderTarget(p,h,m),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class Xv extends xn{constructor(e,n,i,r,s,a,o,c,u,f){e=e!==void 0?e:[],n=n!==void 0?n:Os,super(e,n,i,r,s,a,o,c,u,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class hS extends zr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Xv(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:$n}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Qa(5,5,5),s=new lr({name:"CubemapFromEquirect",uniforms:js(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:_n,blending:tr});s.uniforms.tEquirect.value=n;const a=new Ei(r,s),o=n.minFilter;return n.minFilter===Lr&&(n.minFilter=$n),new fS(1,10,this).update(e,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,r);e.setRenderTarget(s)}}const su=new j,pS=new j,mS=new st;class Tr{constructor(e=new j(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=su.subVectors(i,n).cross(pS.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(su),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||mS.getNormalMatrix(e),r=this.coplanarPoint(su).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const vr=new ic,ko=new j;class qv{constructor(e=new Tr,n=new Tr,i=new Tr,r=new Tr,s=new Tr,a=new Tr){this.planes=[e,n,i,r,s,a]}set(e,n,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Mi){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],c=r[3],u=r[4],f=r[5],p=r[6],h=r[7],m=r[8],x=r[9],y=r[10],g=r[11],d=r[12],v=r[13],_=r[14],T=r[15];if(i[0].setComponents(c-s,h-u,g-m,T-d).normalize(),i[1].setComponents(c+s,h+u,g+m,T+d).normalize(),i[2].setComponents(c+a,h+f,g+x,T+v).normalize(),i[3].setComponents(c-a,h-f,g-x,T-v).normalize(),i[4].setComponents(c-o,h-p,g-y,T-_).normalize(),n===Mi)i[5].setComponents(c+o,h+p,g+y,T+_).normalize();else if(n===Dl)i[5].setComponents(o,p,y,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),vr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),vr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(vr)}intersectsSprite(e){return vr.center.set(0,0,0),vr.radius=.7071067811865476,vr.applyMatrix4(e.matrixWorld),this.intersectsSphere(vr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(ko.x=r.normal.x>0?e.max.x:e.min.x,ko.y=r.normal.y>0?e.max.y:e.min.y,ko.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ko)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Yv(){let t=null,e=!1,n=null,i=null;function r(s,a){n(s,a),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function gS(t){const e=new WeakMap;function n(o,c){const u=o.array,f=o.usage,p=u.byteLength,h=t.createBuffer();t.bindBuffer(c,h),t.bufferData(c,u,f),o.onUploadCallback();let m;if(u instanceof Float32Array)m=t.FLOAT;else if(u instanceof Uint16Array)o.isFloat16BufferAttribute?m=t.HALF_FLOAT:m=t.UNSIGNED_SHORT;else if(u instanceof Int16Array)m=t.SHORT;else if(u instanceof Uint32Array)m=t.UNSIGNED_INT;else if(u instanceof Int32Array)m=t.INT;else if(u instanceof Int8Array)m=t.BYTE;else if(u instanceof Uint8Array)m=t.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)m=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:h,type:m,bytesPerElement:u.BYTES_PER_ELEMENT,version:o.version,size:p}}function i(o,c,u){const f=c.array,p=c._updateRange,h=c.updateRanges;if(t.bindBuffer(u,o),p.count===-1&&h.length===0&&t.bufferSubData(u,0,f),h.length!==0){for(let m=0,x=h.length;m<x;m++){const y=h[m];t.bufferSubData(u,y.start*f.BYTES_PER_ELEMENT,f,y.start,y.count)}c.clearUpdateRanges()}p.count!==-1&&(t.bufferSubData(u,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count),p.count=-1),c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(t.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isGLBufferAttribute){const f=e.get(o);(!f||f.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}o.isInterleavedBufferAttribute&&(o=o.data);const u=e.get(o);if(u===void 0)e.set(o,n(o,c));else if(u.version<o.version){if(u.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(u.buffer,o,c),u.version=o.version}}return{get:r,remove:s,update:a}}class rc extends Pi{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,a=n/2,o=Math.floor(i),c=Math.floor(r),u=o+1,f=c+1,p=e/o,h=n/c,m=[],x=[],y=[],g=[];for(let d=0;d<f;d++){const v=d*h-a;for(let _=0;_<u;_++){const T=_*p-s;x.push(T,-v,0),y.push(0,0,1),g.push(_/o),g.push(1-d/c)}}for(let d=0;d<c;d++)for(let v=0;v<o;v++){const _=v+u*d,T=v+u*(d+1),D=v+1+u*(d+1),C=v+1+u*d;m.push(_,T,C),m.push(T,D,C)}this.setIndex(m),this.setAttribute("position",new ir(x,3)),this.setAttribute("normal",new ir(y,3)),this.setAttribute("uv",new ir(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rc(e.width,e.height,e.widthSegments,e.heightSegments)}}var vS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_S=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,xS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,yS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,SS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,MS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ES=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,TS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,wS=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,AS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,CS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,RS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bS=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,NS=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,PS=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,LS=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,DS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,US=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,IS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,FS=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,OS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,kS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,BS=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( batchId );
	vColor.xyz *= batchingColor.xyz;
#endif`,zS=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,HS=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,jS=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,VS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,GS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,WS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,XS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,qS="gl_FragColor = linearToOutputTexel( gl_FragColor );",YS=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,$S=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,KS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ZS=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,QS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,JS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,eM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,tM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,nM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,iM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,sM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,aM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,oM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,cM=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,uM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,dM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,pM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,mM=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,gM=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,vM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,_M=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xM=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yM=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,SM=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,MM=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,EM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,TM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,wM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,AM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,CM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,RM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,NM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,PM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,LM=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,DM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,UM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,IM=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,FM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,OM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,BM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,zM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,HM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,VM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,GM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,WM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,XM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,YM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$M=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,KM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ZM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,QM=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,JM=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,eE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,tE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,nE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,iE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,rE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,sE=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,aE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,oE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cE=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,uE=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,dE=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,fE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,hE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,pE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,mE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const gE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,vE=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_E=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xE=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,SE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ME=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,EE=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,TE=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,wE=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,AE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,CE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,RE=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,bE=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,NE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,PE=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,LE=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,DE=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,UE=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,IE=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,FE=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,OE=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,kE=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,BE=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zE=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,HE=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jE=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,VE=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,GE=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,WE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,XE=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qE=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,YE=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$E=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,rt={alphahash_fragment:vS,alphahash_pars_fragment:_S,alphamap_fragment:xS,alphamap_pars_fragment:yS,alphatest_fragment:SS,alphatest_pars_fragment:MS,aomap_fragment:ES,aomap_pars_fragment:TS,batching_pars_vertex:wS,batching_vertex:AS,begin_vertex:CS,beginnormal_vertex:RS,bsdfs:bS,iridescence_fragment:NS,bumpmap_pars_fragment:PS,clipping_planes_fragment:LS,clipping_planes_pars_fragment:DS,clipping_planes_pars_vertex:US,clipping_planes_vertex:IS,color_fragment:FS,color_pars_fragment:OS,color_pars_vertex:kS,color_vertex:BS,common:zS,cube_uv_reflection_fragment:HS,defaultnormal_vertex:jS,displacementmap_pars_vertex:VS,displacementmap_vertex:GS,emissivemap_fragment:WS,emissivemap_pars_fragment:XS,colorspace_fragment:qS,colorspace_pars_fragment:YS,envmap_fragment:$S,envmap_common_pars_fragment:KS,envmap_pars_fragment:ZS,envmap_pars_vertex:QS,envmap_physical_pars_fragment:cM,envmap_vertex:JS,fog_vertex:eM,fog_pars_vertex:tM,fog_fragment:nM,fog_pars_fragment:iM,gradientmap_pars_fragment:rM,lightmap_pars_fragment:sM,lights_lambert_fragment:aM,lights_lambert_pars_fragment:oM,lights_pars_begin:lM,lights_toon_fragment:uM,lights_toon_pars_fragment:dM,lights_phong_fragment:fM,lights_phong_pars_fragment:hM,lights_physical_fragment:pM,lights_physical_pars_fragment:mM,lights_fragment_begin:gM,lights_fragment_maps:vM,lights_fragment_end:_M,logdepthbuf_fragment:xM,logdepthbuf_pars_fragment:yM,logdepthbuf_pars_vertex:SM,logdepthbuf_vertex:MM,map_fragment:EM,map_pars_fragment:TM,map_particle_fragment:wM,map_particle_pars_fragment:AM,metalnessmap_fragment:CM,metalnessmap_pars_fragment:RM,morphinstance_vertex:bM,morphcolor_vertex:NM,morphnormal_vertex:PM,morphtarget_pars_vertex:LM,morphtarget_vertex:DM,normal_fragment_begin:UM,normal_fragment_maps:IM,normal_pars_fragment:FM,normal_pars_vertex:OM,normal_vertex:kM,normalmap_pars_fragment:BM,clearcoat_normal_fragment_begin:zM,clearcoat_normal_fragment_maps:HM,clearcoat_pars_fragment:jM,iridescence_pars_fragment:VM,opaque_fragment:GM,packing:WM,premultiplied_alpha_fragment:XM,project_vertex:qM,dithering_fragment:YM,dithering_pars_fragment:$M,roughnessmap_fragment:KM,roughnessmap_pars_fragment:ZM,shadowmap_pars_fragment:QM,shadowmap_pars_vertex:JM,shadowmap_vertex:eE,shadowmask_pars_fragment:tE,skinbase_vertex:nE,skinning_pars_vertex:iE,skinning_vertex:rE,skinnormal_vertex:sE,specularmap_fragment:aE,specularmap_pars_fragment:oE,tonemapping_fragment:lE,tonemapping_pars_fragment:cE,transmission_fragment:uE,transmission_pars_fragment:dE,uv_pars_fragment:fE,uv_pars_vertex:hE,uv_vertex:pE,worldpos_vertex:mE,background_vert:gE,background_frag:vE,backgroundCube_vert:_E,backgroundCube_frag:xE,cube_vert:yE,cube_frag:SE,depth_vert:ME,depth_frag:EE,distanceRGBA_vert:TE,distanceRGBA_frag:wE,equirect_vert:AE,equirect_frag:CE,linedashed_vert:RE,linedashed_frag:bE,meshbasic_vert:NE,meshbasic_frag:PE,meshlambert_vert:LE,meshlambert_frag:DE,meshmatcap_vert:UE,meshmatcap_frag:IE,meshnormal_vert:FE,meshnormal_frag:OE,meshphong_vert:kE,meshphong_frag:BE,meshphysical_vert:zE,meshphysical_frag:HE,meshtoon_vert:jE,meshtoon_frag:VE,points_vert:GE,points_frag:WE,shadow_vert:XE,shadow_frag:qE,sprite_vert:YE,sprite_frag:$E},Ae={common:{diffuse:{value:new gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new st}},envmap:{envMap:{value:null},envMapRotation:{value:new st},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new st}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new st}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new st},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new st},normalScale:{value:new pt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new st},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new st}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new st}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new st}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0},uvTransform:{value:new st}},sprite:{diffuse:{value:new gt(16777215)},opacity:{value:1},center:{value:new pt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}}},ii={basic:{uniforms:an([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:rt.meshbasic_vert,fragmentShader:rt.meshbasic_frag},lambert:{uniforms:an([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new gt(0)}}]),vertexShader:rt.meshlambert_vert,fragmentShader:rt.meshlambert_frag},phong:{uniforms:an([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new gt(0)},specular:{value:new gt(1118481)},shininess:{value:30}}]),vertexShader:rt.meshphong_vert,fragmentShader:rt.meshphong_frag},standard:{uniforms:an([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag},toon:{uniforms:an([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new gt(0)}}]),vertexShader:rt.meshtoon_vert,fragmentShader:rt.meshtoon_frag},matcap:{uniforms:an([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:rt.meshmatcap_vert,fragmentShader:rt.meshmatcap_frag},points:{uniforms:an([Ae.points,Ae.fog]),vertexShader:rt.points_vert,fragmentShader:rt.points_frag},dashed:{uniforms:an([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:rt.linedashed_vert,fragmentShader:rt.linedashed_frag},depth:{uniforms:an([Ae.common,Ae.displacementmap]),vertexShader:rt.depth_vert,fragmentShader:rt.depth_frag},normal:{uniforms:an([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:rt.meshnormal_vert,fragmentShader:rt.meshnormal_frag},sprite:{uniforms:an([Ae.sprite,Ae.fog]),vertexShader:rt.sprite_vert,fragmentShader:rt.sprite_frag},background:{uniforms:{uvTransform:{value:new st},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:rt.background_vert,fragmentShader:rt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new st}},vertexShader:rt.backgroundCube_vert,fragmentShader:rt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:rt.cube_vert,fragmentShader:rt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:rt.equirect_vert,fragmentShader:rt.equirect_frag},distanceRGBA:{uniforms:an([Ae.common,Ae.displacementmap,{referencePosition:{value:new j},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:rt.distanceRGBA_vert,fragmentShader:rt.distanceRGBA_frag},shadow:{uniforms:an([Ae.lights,Ae.fog,{color:{value:new gt(0)},opacity:{value:1}}]),vertexShader:rt.shadow_vert,fragmentShader:rt.shadow_frag}};ii.physical={uniforms:an([ii.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new st},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new st},clearcoatNormalScale:{value:new pt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new st},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new st},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new st},sheen:{value:0},sheenColor:{value:new gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new st},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new st},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new st},transmissionSamplerSize:{value:new pt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new st},attenuationDistance:{value:0},attenuationColor:{value:new gt(0)},specularColor:{value:new gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new st},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new st},anisotropyVector:{value:new pt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new st}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag};const Bo={r:0,b:0,g:0},_r=new bi,KE=new Bt;function ZE(t,e,n,i,r,s,a){const o=new gt(0);let c=s===!0?0:1,u,f,p=null,h=0,m=null;function x(v){let _=v.isScene===!0?v.background:null;return _&&_.isTexture&&(_=(v.backgroundBlurriness>0?n:e).get(_)),_}function y(v){let _=!1;const T=x(v);T===null?d(o,c):T&&T.isColor&&(d(T,1),_=!0);const D=t.xr.getEnvironmentBlendMode();D==="additive"?i.buffers.color.setClear(0,0,0,1,a):D==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(t.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function g(v,_){const T=x(_);T&&(T.isCubeTexture||T.mapping===ec)?(f===void 0&&(f=new Ei(new Qa(1,1,1),new lr({name:"BackgroundCubeMaterial",uniforms:js(ii.backgroundCube.uniforms),vertexShader:ii.backgroundCube.vertexShader,fragmentShader:ii.backgroundCube.fragmentShader,side:_n,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(D,C,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(f)),_r.copy(_.backgroundRotation),_r.x*=-1,_r.y*=-1,_r.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(_r.y*=-1,_r.z*=-1),f.material.uniforms.envMap.value=T,f.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(KE.makeRotationFromEuler(_r)),f.material.toneMapped=mt.getTransfer(T.colorSpace)!==wt,(p!==T||h!==T.version||m!==t.toneMapping)&&(f.material.needsUpdate=!0,p=T,h=T.version,m=t.toneMapping),f.layers.enableAll(),v.unshift(f,f.geometry,f.material,0,0,null)):T&&T.isTexture&&(u===void 0&&(u=new Ei(new rc(2,2),new lr({name:"BackgroundMaterial",uniforms:js(ii.background.uniforms),vertexShader:ii.background.vertexShader,fragmentShader:ii.background.fragmentShader,side:ar,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(u)),u.material.uniforms.t2D.value=T,u.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,u.material.toneMapped=mt.getTransfer(T.colorSpace)!==wt,T.matrixAutoUpdate===!0&&T.updateMatrix(),u.material.uniforms.uvTransform.value.copy(T.matrix),(p!==T||h!==T.version||m!==t.toneMapping)&&(u.material.needsUpdate=!0,p=T,h=T.version,m=t.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null))}function d(v,_){v.getRGB(Bo,Gv(t)),i.buffers.color.setClear(Bo.r,Bo.g,Bo.b,_,a)}return{getClearColor:function(){return o},setClearColor:function(v,_=1){o.set(v),c=_,d(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,d(o,c)},render:y,addToRenderList:g}}function QE(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,a=!1;function o(S,N,G,z,te){let Q=!1;const $=p(z,G,N);s!==$&&(s=$,u(s.object)),Q=m(S,z,G,te),Q&&x(S,z,G,te),te!==null&&e.update(te,t.ELEMENT_ARRAY_BUFFER),(Q||a)&&(a=!1,T(S,N,G,z),te!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(te).buffer))}function c(){return t.createVertexArray()}function u(S){return t.bindVertexArray(S)}function f(S){return t.deleteVertexArray(S)}function p(S,N,G){const z=G.wireframe===!0;let te=i[S.id];te===void 0&&(te={},i[S.id]=te);let Q=te[N.id];Q===void 0&&(Q={},te[N.id]=Q);let $=Q[z];return $===void 0&&($=h(c()),Q[z]=$),$}function h(S){const N=[],G=[],z=[];for(let te=0;te<n;te++)N[te]=0,G[te]=0,z[te]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:G,attributeDivisors:z,object:S,attributes:{},index:null}}function m(S,N,G,z){const te=s.attributes,Q=N.attributes;let $=0;const J=G.getAttributes();for(const F in J)if(J[F].location>=0){const ie=te[F];let ue=Q[F];if(ue===void 0&&(F==="instanceMatrix"&&S.instanceMatrix&&(ue=S.instanceMatrix),F==="instanceColor"&&S.instanceColor&&(ue=S.instanceColor)),ie===void 0||ie.attribute!==ue||ue&&ie.data!==ue.data)return!0;$++}return s.attributesNum!==$||s.index!==z}function x(S,N,G,z){const te={},Q=N.attributes;let $=0;const J=G.getAttributes();for(const F in J)if(J[F].location>=0){let ie=Q[F];ie===void 0&&(F==="instanceMatrix"&&S.instanceMatrix&&(ie=S.instanceMatrix),F==="instanceColor"&&S.instanceColor&&(ie=S.instanceColor));const ue={};ue.attribute=ie,ie&&ie.data&&(ue.data=ie.data),te[F]=ue,$++}s.attributes=te,s.attributesNum=$,s.index=z}function y(){const S=s.newAttributes;for(let N=0,G=S.length;N<G;N++)S[N]=0}function g(S){d(S,0)}function d(S,N){const G=s.newAttributes,z=s.enabledAttributes,te=s.attributeDivisors;G[S]=1,z[S]===0&&(t.enableVertexAttribArray(S),z[S]=1),te[S]!==N&&(t.vertexAttribDivisor(S,N),te[S]=N)}function v(){const S=s.newAttributes,N=s.enabledAttributes;for(let G=0,z=N.length;G<z;G++)N[G]!==S[G]&&(t.disableVertexAttribArray(G),N[G]=0)}function _(S,N,G,z,te,Q,$){$===!0?t.vertexAttribIPointer(S,N,G,te,Q):t.vertexAttribPointer(S,N,G,z,te,Q)}function T(S,N,G,z){y();const te=z.attributes,Q=G.getAttributes(),$=N.defaultAttributeValues;for(const J in Q){const F=Q[J];if(F.location>=0){let ee=te[J];if(ee===void 0&&(J==="instanceMatrix"&&S.instanceMatrix&&(ee=S.instanceMatrix),J==="instanceColor"&&S.instanceColor&&(ee=S.instanceColor)),ee!==void 0){const ie=ee.normalized,ue=ee.itemSize,Ie=e.get(ee);if(Ie===void 0)continue;const at=Ie.buffer,X=Ie.type,se=Ie.bytesPerElement,ve=X===t.INT||X===t.UNSIGNED_INT||ee.gpuType===Cv;if(ee.isInterleavedBufferAttribute){const ge=ee.data,Re=ge.stride,Oe=ee.offset;if(ge.isInstancedInterleavedBuffer){for(let qe=0;qe<F.locationSize;qe++)d(F.location+qe,ge.meshPerAttribute);S.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let qe=0;qe<F.locationSize;qe++)g(F.location+qe);t.bindBuffer(t.ARRAY_BUFFER,at);for(let qe=0;qe<F.locationSize;qe++)_(F.location+qe,ue/F.locationSize,X,ie,Re*se,(Oe+ue/F.locationSize*qe)*se,ve)}else{if(ee.isInstancedBufferAttribute){for(let ge=0;ge<F.locationSize;ge++)d(F.location+ge,ee.meshPerAttribute);S.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let ge=0;ge<F.locationSize;ge++)g(F.location+ge);t.bindBuffer(t.ARRAY_BUFFER,at);for(let ge=0;ge<F.locationSize;ge++)_(F.location+ge,ue/F.locationSize,X,ie,ue*se,ue/F.locationSize*ge*se,ve)}}else if($!==void 0){const ie=$[J];if(ie!==void 0)switch(ie.length){case 2:t.vertexAttrib2fv(F.location,ie);break;case 3:t.vertexAttrib3fv(F.location,ie);break;case 4:t.vertexAttrib4fv(F.location,ie);break;default:t.vertexAttrib1fv(F.location,ie)}}}}v()}function D(){R();for(const S in i){const N=i[S];for(const G in N){const z=N[G];for(const te in z)f(z[te].object),delete z[te];delete N[G]}delete i[S]}}function C(S){if(i[S.id]===void 0)return;const N=i[S.id];for(const G in N){const z=N[G];for(const te in z)f(z[te].object),delete z[te];delete N[G]}delete i[S.id]}function A(S){for(const N in i){const G=i[N];if(G[S.id]===void 0)continue;const z=G[S.id];for(const te in z)f(z[te].object),delete z[te];delete G[S.id]}}function R(){E(),a=!0,s!==r&&(s=r,u(s.object))}function E(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:R,resetDefaultState:E,dispose:D,releaseStatesOfGeometry:C,releaseStatesOfProgram:A,initAttributes:y,enableAttribute:g,disableUnusedAttributes:v}}function JE(t,e,n){let i;function r(u){i=u}function s(u,f){t.drawArrays(i,u,f),n.update(f,i,1)}function a(u,f,p){p!==0&&(t.drawArraysInstanced(i,u,f,p),n.update(f,i,p))}function o(u,f,p){if(p===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let m=0;m<p;m++)this.render(u[m],f[m]);else{h.multiDrawArraysWEBGL(i,u,0,f,0,p);let m=0;for(let x=0;x<p;x++)m+=f[x];n.update(m,i,1)}}function c(u,f,p,h){if(p===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let x=0;x<u.length;x++)a(u[x],f[x],h[x]);else{m.multiDrawArraysInstancedWEBGL(i,u,0,f,0,h,0,p);let x=0;for(let y=0;y<p;y++)x+=f[y];for(let y=0;y<h.length;y++)n.update(x,i,h[y])}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function e1(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(C){return!(C!==ai&&i.convert(C)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const A=C===tc&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==or&&i.convert(C)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Xi&&!A)}function c(C){if(C==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=n.precision!==void 0?n.precision:"highp";const f=c(u);f!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",f,"instead."),u=f);const p=n.logarithmicDepthBuffer===!0,h=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),m=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=t.getParameter(t.MAX_TEXTURE_SIZE),y=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),g=t.getParameter(t.MAX_VERTEX_ATTRIBS),d=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),v=t.getParameter(t.MAX_VARYING_VECTORS),_=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),T=m>0,D=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:u,logarithmicDepthBuffer:p,maxTextures:h,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:y,maxAttributes:g,maxVertexUniforms:d,maxVaryings:v,maxFragmentUniforms:_,vertexTextures:T,maxSamples:D}}function t1(t){const e=this;let n=null,i=0,r=!1,s=!1;const a=new Tr,o=new st,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(p,h){const m=p.length!==0||h||i!==0||r;return r=h,i=p.length,m},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(p,h){n=f(p,h,0)},this.setState=function(p,h,m){const x=p.clippingPlanes,y=p.clipIntersection,g=p.clipShadows,d=t.get(p);if(!r||x===null||x.length===0||s&&!g)s?f(null):u();else{const v=s?0:i,_=v*4;let T=d.clippingState||null;c.value=T,T=f(x,h,_,m);for(let D=0;D!==_;++D)T[D]=n[D];d.clippingState=T,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=v}};function u(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(p,h,m,x){const y=p!==null?p.length:0;let g=null;if(y!==0){if(g=c.value,x!==!0||g===null){const d=m+y*4,v=h.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<d)&&(g=new Float32Array(d));for(let _=0,T=m;_!==y;++_,T+=4)a.copy(p[_]).applyMatrix4(v,o),a.normal.toArray(g,T),g[T+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}function n1(t){let e=new WeakMap;function n(a,o){return o===fd?a.mapping=Os:o===hd&&(a.mapping=ks),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===fd||o===hd)if(e.has(a)){const c=e.get(a).texture;return n(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const u=new hS(c.height);return u.fromEquirectangularTexture(t,a),e.set(a,u),a.addEventListener("dispose",r),n(u.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class i1 extends Wv{constructor(e=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+n,c=r-n;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,a=s+u*this.view.width,o-=f*this.view.offsetY,c=o-f*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const ys=4,Cp=[.125,.215,.35,.446,.526,.582],Cr=20,au=new i1,Rp=new gt;let ou=null,lu=0,cu=0,uu=!1;const wr=(1+Math.sqrt(5))/2,os=1/wr,bp=[new j(-wr,os,0),new j(wr,os,0),new j(-os,0,wr),new j(os,0,wr),new j(0,wr,-os),new j(0,wr,os),new j(-1,1,-1),new j(1,1,-1),new j(-1,1,1),new j(1,1,1)];class Np{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){ou=this._renderer.getRenderTarget(),lu=this._renderer.getActiveCubeFace(),cu=this._renderer.getActiveMipmapLevel(),uu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Dp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ou,lu,cu),this._renderer.xr.enabled=uu,e.scissorTest=!1,zo(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Os||e.mapping===ks?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ou=this._renderer.getRenderTarget(),lu=this._renderer.getActiveCubeFace(),cu=this._renderer.getActiveMipmapLevel(),uu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:$n,minFilter:$n,generateMipmaps:!1,type:tc,format:ai,colorSpace:fr,depthBuffer:!1},r=Pp(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Pp(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=r1(s)),this._blurMaterial=s1(s,e,n)}return r}_compileMaterial(e){const n=new Ei(this._lodPlanes[0],e);this._renderer.compile(n,au)}_sceneToCubeUV(e,n,i,r){const o=new Un(90,1,n,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,p=f.autoClear,h=f.toneMapping;f.getClearColor(Rp),f.toneMapping=nr,f.autoClear=!1;const m=new Hv({name:"PMREM.Background",side:_n,depthWrite:!1,depthTest:!1}),x=new Ei(new Qa,m);let y=!1;const g=e.background;g?g.isColor&&(m.color.copy(g),e.background=null,y=!0):(m.color.copy(Rp),y=!0);for(let d=0;d<6;d++){const v=d%3;v===0?(o.up.set(0,c[d],0),o.lookAt(u[d],0,0)):v===1?(o.up.set(0,0,c[d]),o.lookAt(0,u[d],0)):(o.up.set(0,c[d],0),o.lookAt(0,0,u[d]));const _=this._cubeSize;zo(r,v*_,d>2?_:0,_,_),f.setRenderTarget(r),y&&f.render(x,o),f.render(e,o)}x.geometry.dispose(),x.material.dispose(),f.toneMapping=h,f.autoClear=p,e.background=g}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Os||e.mapping===ks;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Dp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Lp());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Ei(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;zo(n,0,0,3*c,2*c),i.setRenderTarget(n),i.render(a,au)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=bp[(r-s-1)%bp.length];this._blur(e,s-1,s,a,o)}n.autoClear=i}_blur(e,n,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,n,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,a,o){const c=this._renderer,u=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,p=new Ei(this._lodPlanes[r],u),h=u.uniforms,m=this._sizeLods[i]-1,x=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Cr-1),y=s/x,g=isFinite(s)?1+Math.floor(f*y):Cr;g>Cr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Cr}`);const d=[];let v=0;for(let A=0;A<Cr;++A){const R=A/y,E=Math.exp(-R*R/2);d.push(E),A===0?v+=E:A<g&&(v+=2*E)}for(let A=0;A<d.length;A++)d[A]=d[A]/v;h.envMap.value=e.texture,h.samples.value=g,h.weights.value=d,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:_}=this;h.dTheta.value=x,h.mipInt.value=_-i;const T=this._sizeLods[r],D=3*T*(r>_-ys?r-_+ys:0),C=4*(this._cubeSize-T);zo(n,D,C,3*T,2*T),c.setRenderTarget(n),c.render(p,au)}}function r1(t){const e=[],n=[],i=[];let r=t;const s=t-ys+1+Cp.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);n.push(o);let c=1/o;a>t-ys?c=Cp[a-t+ys-1]:a===0&&(c=0),i.push(c);const u=1/(o-2),f=-u,p=1+u,h=[f,f,p,f,p,p,f,f,p,p,f,p],m=6,x=6,y=3,g=2,d=1,v=new Float32Array(y*x*m),_=new Float32Array(g*x*m),T=new Float32Array(d*x*m);for(let C=0;C<m;C++){const A=C%3*2/3-1,R=C>2?0:-1,E=[A,R,0,A+2/3,R,0,A+2/3,R+1,0,A,R,0,A+2/3,R+1,0,A,R+1,0];v.set(E,y*x*C),_.set(h,g*x*C);const S=[C,C,C,C,C,C];T.set(S,d*x*C)}const D=new Pi;D.setAttribute("position",new kn(v,y)),D.setAttribute("uv",new kn(_,g)),D.setAttribute("faceIndex",new kn(T,d)),e.push(D),r>ys&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function Pp(t,e,n){const i=new zr(t,e,n);return i.texture.mapping=ec,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function zo(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function s1(t,e,n){const i=new Float32Array(Cr),r=new j(0,1,0);return new lr({name:"SphericalGaussianBlur",defines:{n:Cr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:_f(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:tr,depthTest:!1,depthWrite:!1})}function Lp(){return new lr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_f(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:tr,depthTest:!1,depthWrite:!1})}function Dp(){return new lr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_f(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:tr,depthTest:!1,depthWrite:!1})}function _f(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function a1(t){let e=new WeakMap,n=null;function i(o){if(o&&o.isTexture){const c=o.mapping,u=c===fd||c===hd,f=c===Os||c===ks;if(u||f){let p=e.get(o);const h=p!==void 0?p.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return n===null&&(n=new Np(t)),p=u?n.fromEquirectangular(o,p):n.fromCubemap(o,p),p.texture.pmremVersion=o.pmremVersion,e.set(o,p),p.texture;if(p!==void 0)return p.texture;{const m=o.image;return u&&m&&m.height>0||f&&m&&r(m)?(n===null&&(n=new Np(t)),p=u?n.fromEquirectangular(o):n.fromCubemap(o),p.texture.pmremVersion=o.pmremVersion,e.set(o,p),o.addEventListener("dispose",s),p.texture):null}}}return o}function r(o){let c=0;const u=6;for(let f=0;f<u;f++)o[f]!==void 0&&c++;return c===u}function s(o){const c=o.target;c.removeEventListener("dispose",s);const u=e.get(c);u!==void 0&&(e.delete(c),u.dispose())}function a(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:a}}function o1(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&Iv("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function l1(t,e,n,i){const r={},s=new WeakMap;function a(p){const h=p.target;h.index!==null&&e.remove(h.index);for(const x in h.attributes)e.remove(h.attributes[x]);for(const x in h.morphAttributes){const y=h.morphAttributes[x];for(let g=0,d=y.length;g<d;g++)e.remove(y[g])}h.removeEventListener("dispose",a),delete r[h.id];const m=s.get(h);m&&(e.remove(m),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function o(p,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,n.memory.geometries++),h}function c(p){const h=p.attributes;for(const x in h)e.update(h[x],t.ARRAY_BUFFER);const m=p.morphAttributes;for(const x in m){const y=m[x];for(let g=0,d=y.length;g<d;g++)e.update(y[g],t.ARRAY_BUFFER)}}function u(p){const h=[],m=p.index,x=p.attributes.position;let y=0;if(m!==null){const v=m.array;y=m.version;for(let _=0,T=v.length;_<T;_+=3){const D=v[_+0],C=v[_+1],A=v[_+2];h.push(D,C,C,A,A,D)}}else if(x!==void 0){const v=x.array;y=x.version;for(let _=0,T=v.length/3-1;_<T;_+=3){const D=_+0,C=_+1,A=_+2;h.push(D,C,C,A,A,D)}}else return;const g=new(Uv(h)?Vv:jv)(h,1);g.version=y;const d=s.get(p);d&&e.remove(d),s.set(p,g)}function f(p){const h=s.get(p);if(h){const m=p.index;m!==null&&h.version<m.version&&u(p)}else u(p);return s.get(p)}return{get:o,update:c,getWireframeAttribute:f}}function c1(t,e,n){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function c(h,m){t.drawElements(i,m,s,h*a),n.update(m,i,1)}function u(h,m,x){x!==0&&(t.drawElementsInstanced(i,m,s,h*a,x),n.update(m,i,x))}function f(h,m,x){if(x===0)return;const y=e.get("WEBGL_multi_draw");if(y===null)for(let g=0;g<x;g++)this.render(h[g]/a,m[g]);else{y.multiDrawElementsWEBGL(i,m,0,s,h,0,x);let g=0;for(let d=0;d<x;d++)g+=m[d];n.update(g,i,1)}}function p(h,m,x,y){if(x===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let d=0;d<h.length;d++)u(h[d]/a,m[d],y[d]);else{g.multiDrawElementsInstancedWEBGL(i,m,0,s,h,0,y,0,x);let d=0;for(let v=0;v<x;v++)d+=m[v];for(let v=0;v<y.length;v++)n.update(d,i,y[v])}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=u,this.renderMultiDraw=f,this.renderMultiDrawInstances=p}function u1(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function d1(t,e,n){const i=new WeakMap,r=new $t;function s(a,o,c){const u=a.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=f!==void 0?f.length:0;let h=i.get(o);if(h===void 0||h.count!==p){let S=function(){R.dispose(),i.delete(o),o.removeEventListener("dispose",S)};var m=S;h!==void 0&&h.texture.dispose();const x=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],v=o.morphAttributes.normal||[],_=o.morphAttributes.color||[];let T=0;x===!0&&(T=1),y===!0&&(T=2),g===!0&&(T=3);let D=o.attributes.position.count*T,C=1;D>e.maxTextureSize&&(C=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const A=new Float32Array(D*C*4*p),R=new Ov(A,D,C,p);R.type=Xi,R.needsUpdate=!0;const E=T*4;for(let N=0;N<p;N++){const G=d[N],z=v[N],te=_[N],Q=D*C*4*N;for(let $=0;$<G.count;$++){const J=$*E;x===!0&&(r.fromBufferAttribute(G,$),A[Q+J+0]=r.x,A[Q+J+1]=r.y,A[Q+J+2]=r.z,A[Q+J+3]=0),y===!0&&(r.fromBufferAttribute(z,$),A[Q+J+4]=r.x,A[Q+J+5]=r.y,A[Q+J+6]=r.z,A[Q+J+7]=0),g===!0&&(r.fromBufferAttribute(te,$),A[Q+J+8]=r.x,A[Q+J+9]=r.y,A[Q+J+10]=r.z,A[Q+J+11]=te.itemSize===4?r.w:1)}}h={count:p,texture:R,size:new pt(D,C)},i.set(o,h),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(t,"morphTexture",a.morphTexture,n);else{let x=0;for(let g=0;g<u.length;g++)x+=u[g];const y=o.morphTargetsRelative?1:1-x;c.getUniforms().setValue(t,"morphTargetBaseInfluence",y),c.getUniforms().setValue(t,"morphTargetInfluences",u)}c.getUniforms().setValue(t,"morphTargetsTexture",h.texture,n),c.getUniforms().setValue(t,"morphTargetsTextureSize",h.size)}return{update:s}}function f1(t,e,n,i){let r=new WeakMap;function s(c){const u=i.render.frame,f=c.geometry,p=e.get(c,f);if(r.get(p)!==u&&(e.update(p),r.set(p,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==u&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const h=c.skeleton;r.get(h)!==u&&(h.update(),r.set(h,u))}return p}function a(){r=new WeakMap}function o(c){const u=c.target;u.removeEventListener("dispose",o),n.remove(u.instanceMatrix),u.instanceColor!==null&&n.remove(u.instanceColor)}return{update:s,dispose:a}}class $v extends xn{constructor(e,n,i,r,s,a,o,c,u,f=Rs){if(f!==Rs&&f!==Hs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&f===Rs&&(i=Bs),i===void 0&&f===Hs&&(i=zs),super(null,r,s,a,o,c,f,i,u),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=o!==void 0?o:Fn,this.minFilter=c!==void 0?c:Fn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const Kv=new xn,Zv=new $v(1,1);Zv.compareFunction=Dv;const Qv=new Ov,Jv=new Zy,e_=new Xv,Up=[],Ip=[],Fp=new Float32Array(16),Op=new Float32Array(9),kp=new Float32Array(4);function qs(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Up[r];if(s===void 0&&(s=new Float32Array(r),Up[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(s,o)}return s}function jt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Vt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function sc(t,e){let n=Ip[e];n===void 0&&(n=new Int32Array(e),Ip[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function h1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function p1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(jt(n,e))return;t.uniform2fv(this.addr,e),Vt(n,e)}}function m1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(jt(n,e))return;t.uniform3fv(this.addr,e),Vt(n,e)}}function g1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(jt(n,e))return;t.uniform4fv(this.addr,e),Vt(n,e)}}function v1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(jt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Vt(n,e)}else{if(jt(n,i))return;kp.set(i),t.uniformMatrix2fv(this.addr,!1,kp),Vt(n,i)}}function _1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(jt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Vt(n,e)}else{if(jt(n,i))return;Op.set(i),t.uniformMatrix3fv(this.addr,!1,Op),Vt(n,i)}}function x1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(jt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Vt(n,e)}else{if(jt(n,i))return;Fp.set(i),t.uniformMatrix4fv(this.addr,!1,Fp),Vt(n,i)}}function y1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function S1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(jt(n,e))return;t.uniform2iv(this.addr,e),Vt(n,e)}}function M1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(jt(n,e))return;t.uniform3iv(this.addr,e),Vt(n,e)}}function E1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(jt(n,e))return;t.uniform4iv(this.addr,e),Vt(n,e)}}function T1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function w1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(jt(n,e))return;t.uniform2uiv(this.addr,e),Vt(n,e)}}function A1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(jt(n,e))return;t.uniform3uiv(this.addr,e),Vt(n,e)}}function C1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(jt(n,e))return;t.uniform4uiv(this.addr,e),Vt(n,e)}}function R1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);const s=this.type===t.SAMPLER_2D_SHADOW?Zv:Kv;n.setTexture2D(e||s,r)}function b1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Jv,r)}function N1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||e_,r)}function P1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||Qv,r)}function L1(t){switch(t){case 5126:return h1;case 35664:return p1;case 35665:return m1;case 35666:return g1;case 35674:return v1;case 35675:return _1;case 35676:return x1;case 5124:case 35670:return y1;case 35667:case 35671:return S1;case 35668:case 35672:return M1;case 35669:case 35673:return E1;case 5125:return T1;case 36294:return w1;case 36295:return A1;case 36296:return C1;case 35678:case 36198:case 36298:case 36306:case 35682:return R1;case 35679:case 36299:case 36307:return b1;case 35680:case 36300:case 36308:case 36293:return N1;case 36289:case 36303:case 36311:case 36292:return P1}}function D1(t,e){t.uniform1fv(this.addr,e)}function U1(t,e){const n=qs(e,this.size,2);t.uniform2fv(this.addr,n)}function I1(t,e){const n=qs(e,this.size,3);t.uniform3fv(this.addr,n)}function F1(t,e){const n=qs(e,this.size,4);t.uniform4fv(this.addr,n)}function O1(t,e){const n=qs(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function k1(t,e){const n=qs(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function B1(t,e){const n=qs(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function z1(t,e){t.uniform1iv(this.addr,e)}function H1(t,e){t.uniform2iv(this.addr,e)}function j1(t,e){t.uniform3iv(this.addr,e)}function V1(t,e){t.uniform4iv(this.addr,e)}function G1(t,e){t.uniform1uiv(this.addr,e)}function W1(t,e){t.uniform2uiv(this.addr,e)}function X1(t,e){t.uniform3uiv(this.addr,e)}function q1(t,e){t.uniform4uiv(this.addr,e)}function Y1(t,e,n){const i=this.cache,r=e.length,s=sc(n,r);jt(i,s)||(t.uniform1iv(this.addr,s),Vt(i,s));for(let a=0;a!==r;++a)n.setTexture2D(e[a]||Kv,s[a])}function $1(t,e,n){const i=this.cache,r=e.length,s=sc(n,r);jt(i,s)||(t.uniform1iv(this.addr,s),Vt(i,s));for(let a=0;a!==r;++a)n.setTexture3D(e[a]||Jv,s[a])}function K1(t,e,n){const i=this.cache,r=e.length,s=sc(n,r);jt(i,s)||(t.uniform1iv(this.addr,s),Vt(i,s));for(let a=0;a!==r;++a)n.setTextureCube(e[a]||e_,s[a])}function Z1(t,e,n){const i=this.cache,r=e.length,s=sc(n,r);jt(i,s)||(t.uniform1iv(this.addr,s),Vt(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(e[a]||Qv,s[a])}function Q1(t){switch(t){case 5126:return D1;case 35664:return U1;case 35665:return I1;case 35666:return F1;case 35674:return O1;case 35675:return k1;case 35676:return B1;case 5124:case 35670:return z1;case 35667:case 35671:return H1;case 35668:case 35672:return j1;case 35669:case 35673:return V1;case 5125:return G1;case 36294:return W1;case 36295:return X1;case 36296:return q1;case 35678:case 36198:case 36298:case 36306:case 35682:return Y1;case 35679:case 36299:case 36307:return $1;case 35680:case 36300:case 36308:case 36293:return K1;case 36289:case 36303:case 36311:case 36292:return Z1}}class J1{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=L1(n.type)}}class eT{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=Q1(n.type)}}class tT{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,n[o.id],i)}}}const du=/(\w+)(\])?(\[|\.)?/g;function Bp(t,e){t.seq.push(e),t.map[e.id]=e}function nT(t,e,n){const i=t.name,r=i.length;for(du.lastIndex=0;;){const s=du.exec(i),a=du.lastIndex;let o=s[1];const c=s[2]==="]",u=s[3];if(c&&(o=o|0),u===void 0||u==="["&&a+2===r){Bp(n,u===void 0?new J1(o,t,e):new eT(o,t,e));break}else{let p=n.map[o];p===void 0&&(p=new tT(o),Bp(n,p)),n=p}}}class il{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),a=e.getUniformLocation(n,s.name);nT(s,a,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in n&&i.push(a)}return i}}function zp(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const iT=37297;let rT=0;function sT(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}function aT(t){const e=mt.getPrimaries(mt.workingColorSpace),n=mt.getPrimaries(t);let i;switch(e===n?i="":e===Ll&&n===Pl?i="LinearDisplayP3ToLinearSRGB":e===Pl&&n===Ll&&(i="LinearSRGBToLinearDisplayP3"),t){case fr:case nc:return[i,"LinearTransferOETF"];case ni:case vf:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function Hp(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+sT(t.getShaderSource(e),a)}else return r}function oT(t,e){const n=aT(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function lT(t,e){let n;switch(e){case py:n="Linear";break;case my:n="Reinhard";break;case gy:n="OptimizedCineon";break;case vy:n="ACESFilmic";break;case xy:n="AgX";break;case yy:n="Neutral";break;case _y:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function cT(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ma).join(`
`)}function uT(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function dT(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),a=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function ma(t){return t!==""}function jp(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Vp(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const fT=/^[ \t]*#include +<([\w\d./]+)>/gm;function vd(t){return t.replace(fT,pT)}const hT=new Map;function pT(t,e){let n=rt[e];if(n===void 0){const i=hT.get(e);if(i!==void 0)n=rt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return vd(n)}const mT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gp(t){return t.replace(mT,gT)}function gT(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Wp(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function vT(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===Tv?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===zx?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===gi&&(e="SHADOWMAP_TYPE_VSM"),e}function _T(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Os:case ks:e="ENVMAP_TYPE_CUBE";break;case ec:e="ENVMAP_TYPE_CUBE_UV";break}return e}function xT(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case ks:e="ENVMAP_MODE_REFRACTION";break}return e}function yT(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case wv:e="ENVMAP_BLENDING_MULTIPLY";break;case fy:e="ENVMAP_BLENDING_MIX";break;case hy:e="ENVMAP_BLENDING_ADD";break}return e}function ST(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function MT(t,e,n,i){const r=t.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const c=vT(n),u=_T(n),f=xT(n),p=yT(n),h=ST(n),m=cT(n),x=uT(s),y=r.createProgram();let g,d,v=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x].filter(ma).join(`
`),g.length>0&&(g+=`
`),d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x].filter(ma).join(`
`),d.length>0&&(d+=`
`)):(g=[Wp(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ma).join(`
`),d=[Wp(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.envMap?"#define "+f:"",n.envMap?"#define "+p:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==nr?"#define TONE_MAPPING":"",n.toneMapping!==nr?rt.tonemapping_pars_fragment:"",n.toneMapping!==nr?lT("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",rt.colorspace_pars_fragment,oT("linearToOutputTexel",n.outputColorSpace),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(ma).join(`
`)),a=vd(a),a=jp(a,n),a=Vp(a,n),o=vd(o),o=jp(o,n),o=Vp(o,n),a=Gp(a),o=Gp(o),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,d=["#define varying in",n.glslVersion===op?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===op?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const _=v+g+a,T=v+d+o,D=zp(r,r.VERTEX_SHADER,_),C=zp(r,r.FRAGMENT_SHADER,T);r.attachShader(y,D),r.attachShader(y,C),n.index0AttributeName!==void 0?r.bindAttribLocation(y,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function A(N){if(t.debug.checkShaderErrors){const G=r.getProgramInfoLog(y).trim(),z=r.getShaderInfoLog(D).trim(),te=r.getShaderInfoLog(C).trim();let Q=!0,$=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(Q=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,y,D,C);else{const J=Hp(r,D,"vertex"),F=Hp(r,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+G+`
`+J+`
`+F)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(z===""||te==="")&&($=!1);$&&(N.diagnostics={runnable:Q,programLog:G,vertexShader:{log:z,prefix:g},fragmentShader:{log:te,prefix:d}})}r.deleteShader(D),r.deleteShader(C),R=new il(r,y),E=dT(r,y)}let R;this.getUniforms=function(){return R===void 0&&A(this),R};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let S=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=r.getProgramParameter(y,iT)),S},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=rT++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=D,this.fragmentShader=C,this}let ET=0;class TT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new wT(e),n.set(e,i)),i}}class wT{constructor(e){this.id=ET++,this.code=e,this.usedTimes=0}}function AT(t,e,n,i,r,s,a){const o=new Bv,c=new TT,u=new Set,f=[],p=r.logarithmicDepthBuffer,h=r.vertexTextures;let m=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(E){return u.add(E),E===0?"uv":`uv${E}`}function g(E,S,N,G,z){const te=G.fog,Q=z.geometry,$=E.isMeshStandardMaterial?G.environment:null,J=(E.isMeshStandardMaterial?n:e).get(E.envMap||$),F=J&&J.mapping===ec?J.image.height:null,ee=x[E.type];E.precision!==null&&(m=r.getMaxPrecision(E.precision),m!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",m,"instead."));const ie=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,ue=ie!==void 0?ie.length:0;let Ie=0;Q.morphAttributes.position!==void 0&&(Ie=1),Q.morphAttributes.normal!==void 0&&(Ie=2),Q.morphAttributes.color!==void 0&&(Ie=3);let at,X,se,ve;if(ee){const ct=ii[ee];at=ct.vertexShader,X=ct.fragmentShader}else at=E.vertexShader,X=E.fragmentShader,c.update(E),se=c.getVertexShaderID(E),ve=c.getFragmentShaderID(E);const ge=t.getRenderTarget(),Re=z.isInstancedMesh===!0,Oe=z.isBatchedMesh===!0,qe=!!E.map,I=!!E.matcap,Qe=!!J,et=!!E.aoMap,ht=!!E.lightMap,Be=!!E.bumpMap,nt=!!E.normalMap,Je=!!E.displacementMap,Ye=!!E.emissiveMap,yt=!!E.metalnessMap,b=!!E.roughnessMap,M=E.anisotropy>0,H=E.clearcoat>0,ae=E.dispersion>0,ne=E.iridescence>0,oe=E.sheen>0,Ue=E.transmission>0,_e=M&&!!E.anisotropyMap,Se=H&&!!E.clearcoatMap,je=H&&!!E.clearcoatNormalMap,he=H&&!!E.clearcoatRoughnessMap,Ne=ne&&!!E.iridescenceMap,Ze=ne&&!!E.iridescenceThicknessMap,Ve=oe&&!!E.sheenColorMap,we=oe&&!!E.sheenRoughnessMap,Ke=!!E.specularMap,$e=!!E.specularColorMap,it=!!E.specularIntensityMap,U=Ue&&!!E.transmissionMap,Me=Ue&&!!E.thicknessMap,q=!!E.gradientMap,K=!!E.alphaMap,me=E.alphaTest>0,Ge=!!E.alphaHash,lt=!!E.extensions;let _t=nr;E.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(_t=t.toneMapping);const Mt={shaderID:ee,shaderType:E.type,shaderName:E.name,vertexShader:at,fragmentShader:X,defines:E.defines,customVertexShaderID:se,customFragmentShaderID:ve,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:m,batching:Oe,batchingColor:Oe&&z._colorsTexture!==null,instancing:Re,instancingColor:Re&&z.instanceColor!==null,instancingMorph:Re&&z.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:ge===null?t.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:fr,alphaToCoverage:!!E.alphaToCoverage,map:qe,matcap:I,envMap:Qe,envMapMode:Qe&&J.mapping,envMapCubeUVHeight:F,aoMap:et,lightMap:ht,bumpMap:Be,normalMap:nt,displacementMap:h&&Je,emissiveMap:Ye,normalMapObjectSpace:nt&&E.normalMapType===Iy,normalMapTangentSpace:nt&&E.normalMapType===Uy,metalnessMap:yt,roughnessMap:b,anisotropy:M,anisotropyMap:_e,clearcoat:H,clearcoatMap:Se,clearcoatNormalMap:je,clearcoatRoughnessMap:he,dispersion:ae,iridescence:ne,iridescenceMap:Ne,iridescenceThicknessMap:Ze,sheen:oe,sheenColorMap:Ve,sheenRoughnessMap:we,specularMap:Ke,specularColorMap:$e,specularIntensityMap:it,transmission:Ue,transmissionMap:U,thicknessMap:Me,gradientMap:q,opaque:E.transparent===!1&&E.blending===Cs&&E.alphaToCoverage===!1,alphaMap:K,alphaTest:me,alphaHash:Ge,combine:E.combine,mapUv:qe&&y(E.map.channel),aoMapUv:et&&y(E.aoMap.channel),lightMapUv:ht&&y(E.lightMap.channel),bumpMapUv:Be&&y(E.bumpMap.channel),normalMapUv:nt&&y(E.normalMap.channel),displacementMapUv:Je&&y(E.displacementMap.channel),emissiveMapUv:Ye&&y(E.emissiveMap.channel),metalnessMapUv:yt&&y(E.metalnessMap.channel),roughnessMapUv:b&&y(E.roughnessMap.channel),anisotropyMapUv:_e&&y(E.anisotropyMap.channel),clearcoatMapUv:Se&&y(E.clearcoatMap.channel),clearcoatNormalMapUv:je&&y(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:he&&y(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Ne&&y(E.iridescenceMap.channel),iridescenceThicknessMapUv:Ze&&y(E.iridescenceThicknessMap.channel),sheenColorMapUv:Ve&&y(E.sheenColorMap.channel),sheenRoughnessMapUv:we&&y(E.sheenRoughnessMap.channel),specularMapUv:Ke&&y(E.specularMap.channel),specularColorMapUv:$e&&y(E.specularColorMap.channel),specularIntensityMapUv:it&&y(E.specularIntensityMap.channel),transmissionMapUv:U&&y(E.transmissionMap.channel),thicknessMapUv:Me&&y(E.thicknessMap.channel),alphaMapUv:K&&y(E.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(nt||M),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!Q.attributes.uv&&(qe||K),fog:!!te,useFog:E.fog===!0,fogExp2:!!te&&te.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:p,skinning:z.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:ue,morphTextureStride:Ie,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:t.shadowMap.enabled&&N.length>0,shadowMapType:t.shadowMap.type,toneMapping:_t,decodeVideoTexture:qe&&E.map.isVideoTexture===!0&&mt.getTransfer(E.map.colorSpace)===wt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===xi,flipSided:E.side===_n,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:lt&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:lt&&E.extensions.multiDraw===!0&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Mt.vertexUv1s=u.has(1),Mt.vertexUv2s=u.has(2),Mt.vertexUv3s=u.has(3),u.clear(),Mt}function d(E){const S=[];if(E.shaderID?S.push(E.shaderID):(S.push(E.customVertexShaderID),S.push(E.customFragmentShaderID)),E.defines!==void 0)for(const N in E.defines)S.push(N),S.push(E.defines[N]);return E.isRawShaderMaterial===!1&&(v(S,E),_(S,E),S.push(t.outputColorSpace)),S.push(E.customProgramCacheKey),S.join()}function v(E,S){E.push(S.precision),E.push(S.outputColorSpace),E.push(S.envMapMode),E.push(S.envMapCubeUVHeight),E.push(S.mapUv),E.push(S.alphaMapUv),E.push(S.lightMapUv),E.push(S.aoMapUv),E.push(S.bumpMapUv),E.push(S.normalMapUv),E.push(S.displacementMapUv),E.push(S.emissiveMapUv),E.push(S.metalnessMapUv),E.push(S.roughnessMapUv),E.push(S.anisotropyMapUv),E.push(S.clearcoatMapUv),E.push(S.clearcoatNormalMapUv),E.push(S.clearcoatRoughnessMapUv),E.push(S.iridescenceMapUv),E.push(S.iridescenceThicknessMapUv),E.push(S.sheenColorMapUv),E.push(S.sheenRoughnessMapUv),E.push(S.specularMapUv),E.push(S.specularColorMapUv),E.push(S.specularIntensityMapUv),E.push(S.transmissionMapUv),E.push(S.thicknessMapUv),E.push(S.combine),E.push(S.fogExp2),E.push(S.sizeAttenuation),E.push(S.morphTargetsCount),E.push(S.morphAttributeCount),E.push(S.numDirLights),E.push(S.numPointLights),E.push(S.numSpotLights),E.push(S.numSpotLightMaps),E.push(S.numHemiLights),E.push(S.numRectAreaLights),E.push(S.numDirLightShadows),E.push(S.numPointLightShadows),E.push(S.numSpotLightShadows),E.push(S.numSpotLightShadowsWithMaps),E.push(S.numLightProbes),E.push(S.shadowMapType),E.push(S.toneMapping),E.push(S.numClippingPlanes),E.push(S.numClipIntersection),E.push(S.depthPacking)}function _(E,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),E.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.skinning&&o.enable(4),S.morphTargets&&o.enable(5),S.morphNormals&&o.enable(6),S.morphColors&&o.enable(7),S.premultipliedAlpha&&o.enable(8),S.shadowMapEnabled&&o.enable(9),S.doubleSided&&o.enable(10),S.flipSided&&o.enable(11),S.useDepthPacking&&o.enable(12),S.dithering&&o.enable(13),S.transmission&&o.enable(14),S.sheen&&o.enable(15),S.opaque&&o.enable(16),S.pointsUvs&&o.enable(17),S.decodeVideoTexture&&o.enable(18),S.alphaToCoverage&&o.enable(19),E.push(o.mask)}function T(E){const S=x[E.type];let N;if(S){const G=ii[S];N=cS.clone(G.uniforms)}else N=E.uniforms;return N}function D(E,S){let N;for(let G=0,z=f.length;G<z;G++){const te=f[G];if(te.cacheKey===S){N=te,++N.usedTimes;break}}return N===void 0&&(N=new MT(t,S,E,s),f.push(N)),N}function C(E){if(--E.usedTimes===0){const S=f.indexOf(E);f[S]=f[f.length-1],f.pop(),E.destroy()}}function A(E){c.remove(E)}function R(){c.dispose()}return{getParameters:g,getProgramCacheKey:d,getUniforms:T,acquireProgram:D,releaseProgram:C,releaseShaderCache:A,programs:f,dispose:R}}function CT(){let t=new WeakMap;function e(s){let a=t.get(s);return a===void 0&&(a={},t.set(s,a)),a}function n(s){t.delete(s)}function i(s,a,o){t.get(s)[a]=o}function r(){t=new WeakMap}return{get:e,remove:n,update:i,dispose:r}}function RT(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function Xp(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function qp(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function a(p,h,m,x,y,g){let d=t[e];return d===void 0?(d={id:p.id,object:p,geometry:h,material:m,groupOrder:x,renderOrder:p.renderOrder,z:y,group:g},t[e]=d):(d.id=p.id,d.object=p,d.geometry=h,d.material=m,d.groupOrder=x,d.renderOrder=p.renderOrder,d.z=y,d.group=g),e++,d}function o(p,h,m,x,y,g){const d=a(p,h,m,x,y,g);m.transmission>0?i.push(d):m.transparent===!0?r.push(d):n.push(d)}function c(p,h,m,x,y,g){const d=a(p,h,m,x,y,g);m.transmission>0?i.unshift(d):m.transparent===!0?r.unshift(d):n.unshift(d)}function u(p,h){n.length>1&&n.sort(p||RT),i.length>1&&i.sort(h||Xp),r.length>1&&r.sort(h||Xp)}function f(){for(let p=e,h=t.length;p<h;p++){const m=t[p];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:o,unshift:c,finish:f,sort:u}}function bT(){let t=new WeakMap;function e(i,r){const s=t.get(i);let a;return s===void 0?(a=new qp,t.set(i,[a])):r>=s.length?(a=new qp,s.push(a)):a=s[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function NT(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new j,color:new gt};break;case"SpotLight":n={position:new j,direction:new j,color:new gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new j,color:new gt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new j,skyColor:new gt,groundColor:new gt};break;case"RectAreaLight":n={color:new gt,position:new j,halfWidth:new j,halfHeight:new j};break}return t[e.id]=n,n}}}function PT(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pt};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pt};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pt,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let LT=0;function DT(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function UT(t){const e=new NT,n=PT(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new j);const r=new j,s=new Bt,a=new Bt;function o(u){let f=0,p=0,h=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let m=0,x=0,y=0,g=0,d=0,v=0,_=0,T=0,D=0,C=0,A=0;u.sort(DT);for(let E=0,S=u.length;E<S;E++){const N=u[E],G=N.color,z=N.intensity,te=N.distance,Q=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)f+=G.r*z,p+=G.g*z,h+=G.b*z;else if(N.isLightProbe){for(let $=0;$<9;$++)i.probe[$].addScaledVector(N.sh.coefficients[$],z);A++}else if(N.isDirectionalLight){const $=e.get(N);if($.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const J=N.shadow,F=n.get(N);F.shadowBias=J.bias,F.shadowNormalBias=J.normalBias,F.shadowRadius=J.radius,F.shadowMapSize=J.mapSize,i.directionalShadow[m]=F,i.directionalShadowMap[m]=Q,i.directionalShadowMatrix[m]=N.shadow.matrix,v++}i.directional[m]=$,m++}else if(N.isSpotLight){const $=e.get(N);$.position.setFromMatrixPosition(N.matrixWorld),$.color.copy(G).multiplyScalar(z),$.distance=te,$.coneCos=Math.cos(N.angle),$.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),$.decay=N.decay,i.spot[y]=$;const J=N.shadow;if(N.map&&(i.spotLightMap[D]=N.map,D++,J.updateMatrices(N),N.castShadow&&C++),i.spotLightMatrix[y]=J.matrix,N.castShadow){const F=n.get(N);F.shadowBias=J.bias,F.shadowNormalBias=J.normalBias,F.shadowRadius=J.radius,F.shadowMapSize=J.mapSize,i.spotShadow[y]=F,i.spotShadowMap[y]=Q,T++}y++}else if(N.isRectAreaLight){const $=e.get(N);$.color.copy(G).multiplyScalar(z),$.halfWidth.set(N.width*.5,0,0),$.halfHeight.set(0,N.height*.5,0),i.rectArea[g]=$,g++}else if(N.isPointLight){const $=e.get(N);if($.color.copy(N.color).multiplyScalar(N.intensity),$.distance=N.distance,$.decay=N.decay,N.castShadow){const J=N.shadow,F=n.get(N);F.shadowBias=J.bias,F.shadowNormalBias=J.normalBias,F.shadowRadius=J.radius,F.shadowMapSize=J.mapSize,F.shadowCameraNear=J.camera.near,F.shadowCameraFar=J.camera.far,i.pointShadow[x]=F,i.pointShadowMap[x]=Q,i.pointShadowMatrix[x]=N.shadow.matrix,_++}i.point[x]=$,x++}else if(N.isHemisphereLight){const $=e.get(N);$.skyColor.copy(N.color).multiplyScalar(z),$.groundColor.copy(N.groundColor).multiplyScalar(z),i.hemi[d]=$,d++}}g>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ae.LTC_FLOAT_1,i.rectAreaLTC2=Ae.LTC_FLOAT_2):(i.rectAreaLTC1=Ae.LTC_HALF_1,i.rectAreaLTC2=Ae.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=p,i.ambient[2]=h;const R=i.hash;(R.directionalLength!==m||R.pointLength!==x||R.spotLength!==y||R.rectAreaLength!==g||R.hemiLength!==d||R.numDirectionalShadows!==v||R.numPointShadows!==_||R.numSpotShadows!==T||R.numSpotMaps!==D||R.numLightProbes!==A)&&(i.directional.length=m,i.spot.length=y,i.rectArea.length=g,i.point.length=x,i.hemi.length=d,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=T,i.spotShadowMap.length=T,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=T+D-C,i.spotLightMap.length=D,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=A,R.directionalLength=m,R.pointLength=x,R.spotLength=y,R.rectAreaLength=g,R.hemiLength=d,R.numDirectionalShadows=v,R.numPointShadows=_,R.numSpotShadows=T,R.numSpotMaps=D,R.numLightProbes=A,i.version=LT++)}function c(u,f){let p=0,h=0,m=0,x=0,y=0;const g=f.matrixWorldInverse;for(let d=0,v=u.length;d<v;d++){const _=u[d];if(_.isDirectionalLight){const T=i.directional[p];T.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(g),p++}else if(_.isSpotLight){const T=i.spot[m];T.position.setFromMatrixPosition(_.matrixWorld),T.position.applyMatrix4(g),T.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(g),m++}else if(_.isRectAreaLight){const T=i.rectArea[x];T.position.setFromMatrixPosition(_.matrixWorld),T.position.applyMatrix4(g),a.identity(),s.copy(_.matrixWorld),s.premultiply(g),a.extractRotation(s),T.halfWidth.set(_.width*.5,0,0),T.halfHeight.set(0,_.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),x++}else if(_.isPointLight){const T=i.point[h];T.position.setFromMatrixPosition(_.matrixWorld),T.position.applyMatrix4(g),h++}else if(_.isHemisphereLight){const T=i.hemi[y];T.direction.setFromMatrixPosition(_.matrixWorld),T.direction.transformDirection(g),y++}}}return{setup:o,setupView:c,state:i}}function Yp(t){const e=new UT(t),n=[],i=[];function r(f){u.camera=f,n.length=0,i.length=0}function s(f){n.push(f)}function a(f){i.push(f)}function o(){e.setup(n)}function c(f){e.setupView(n,f)}const u={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:u,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function IT(t){let e=new WeakMap;function n(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Yp(t),e.set(r,[o])):s>=a.length?(o=new Yp(t),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}class FT extends Za{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ly,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class OT extends Za{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const kT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,BT=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function zT(t,e,n){let i=new qv;const r=new pt,s=new pt,a=new $t,o=new FT({depthPacking:Dy}),c=new OT,u={},f=n.maxTextureSize,p={[ar]:_n,[_n]:ar,[xi]:xi},h=new lr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new pt},radius:{value:4}},vertexShader:kT,fragmentShader:BT}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const x=new Pi;x.setAttribute("position",new kn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Ei(x,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Tv;let d=this.type;this.render=function(C,A,R){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||C.length===0)return;const E=t.getRenderTarget(),S=t.getActiveCubeFace(),N=t.getActiveMipmapLevel(),G=t.state;G.setBlending(tr),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const z=d!==gi&&this.type===gi,te=d===gi&&this.type!==gi;for(let Q=0,$=C.length;Q<$;Q++){const J=C[Q],F=J.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;r.copy(F.mapSize);const ee=F.getFrameExtents();if(r.multiply(ee),s.copy(F.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/ee.x),r.x=s.x*ee.x,F.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/ee.y),r.y=s.y*ee.y,F.mapSize.y=s.y)),F.map===null||z===!0||te===!0){const ue=this.type!==gi?{minFilter:Fn,magFilter:Fn}:{};F.map!==null&&F.map.dispose(),F.map=new zr(r.x,r.y,ue),F.map.texture.name=J.name+".shadowMap",F.camera.updateProjectionMatrix()}t.setRenderTarget(F.map),t.clear();const ie=F.getViewportCount();for(let ue=0;ue<ie;ue++){const Ie=F.getViewport(ue);a.set(s.x*Ie.x,s.y*Ie.y,s.x*Ie.z,s.y*Ie.w),G.viewport(a),F.updateMatrices(J,ue),i=F.getFrustum(),T(A,R,F.camera,J,this.type)}F.isPointLightShadow!==!0&&this.type===gi&&v(F,R),F.needsUpdate=!1}d=this.type,g.needsUpdate=!1,t.setRenderTarget(E,S,N)};function v(C,A){const R=e.update(y);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,m.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new zr(r.x,r.y)),h.uniforms.shadow_pass.value=C.map.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,t.setRenderTarget(C.mapPass),t.clear(),t.renderBufferDirect(A,null,R,h,y,null),m.uniforms.shadow_pass.value=C.mapPass.texture,m.uniforms.resolution.value=C.mapSize,m.uniforms.radius.value=C.radius,t.setRenderTarget(C.map),t.clear(),t.renderBufferDirect(A,null,R,m,y,null)}function _(C,A,R,E){let S=null;const N=R.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(N!==void 0)S=N;else if(S=R.isPointLight===!0?c:o,t.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const G=S.uuid,z=A.uuid;let te=u[G];te===void 0&&(te={},u[G]=te);let Q=te[z];Q===void 0&&(Q=S.clone(),te[z]=Q,A.addEventListener("dispose",D)),S=Q}if(S.visible=A.visible,S.wireframe=A.wireframe,E===gi?S.side=A.shadowSide!==null?A.shadowSide:A.side:S.side=A.shadowSide!==null?A.shadowSide:p[A.side],S.alphaMap=A.alphaMap,S.alphaTest=A.alphaTest,S.map=A.map,S.clipShadows=A.clipShadows,S.clippingPlanes=A.clippingPlanes,S.clipIntersection=A.clipIntersection,S.displacementMap=A.displacementMap,S.displacementScale=A.displacementScale,S.displacementBias=A.displacementBias,S.wireframeLinewidth=A.wireframeLinewidth,S.linewidth=A.linewidth,R.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const G=t.properties.get(S);G.light=R}return S}function T(C,A,R,E,S){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&S===gi)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,C.matrixWorld);const z=e.update(C),te=C.material;if(Array.isArray(te)){const Q=z.groups;for(let $=0,J=Q.length;$<J;$++){const F=Q[$],ee=te[F.materialIndex];if(ee&&ee.visible){const ie=_(C,ee,E,S);C.onBeforeShadow(t,C,A,R,z,ie,F),t.renderBufferDirect(R,null,z,ie,C,F),C.onAfterShadow(t,C,A,R,z,ie,F)}}}else if(te.visible){const Q=_(C,te,E,S);C.onBeforeShadow(t,C,A,R,z,Q,null),t.renderBufferDirect(R,null,z,Q,C,null),C.onAfterShadow(t,C,A,R,z,Q,null)}}const G=C.children;for(let z=0,te=G.length;z<te;z++)T(G[z],A,R,E,S)}function D(C){C.target.removeEventListener("dispose",D);for(const R in u){const E=u[R],S=C.target.uuid;S in E&&(E[S].dispose(),delete E[S])}}}function HT(t){function e(){let U=!1;const Me=new $t;let q=null;const K=new $t(0,0,0,0);return{setMask:function(me){q!==me&&!U&&(t.colorMask(me,me,me,me),q=me)},setLocked:function(me){U=me},setClear:function(me,Ge,lt,_t,Mt){Mt===!0&&(me*=_t,Ge*=_t,lt*=_t),Me.set(me,Ge,lt,_t),K.equals(Me)===!1&&(t.clearColor(me,Ge,lt,_t),K.copy(Me))},reset:function(){U=!1,q=null,K.set(-1,0,0,0)}}}function n(){let U=!1,Me=null,q=null,K=null;return{setTest:function(me){me?ve(t.DEPTH_TEST):ge(t.DEPTH_TEST)},setMask:function(me){Me!==me&&!U&&(t.depthMask(me),Me=me)},setFunc:function(me){if(q!==me){switch(me){case sy:t.depthFunc(t.NEVER);break;case ay:t.depthFunc(t.ALWAYS);break;case oy:t.depthFunc(t.LESS);break;case Rl:t.depthFunc(t.LEQUAL);break;case ly:t.depthFunc(t.EQUAL);break;case cy:t.depthFunc(t.GEQUAL);break;case uy:t.depthFunc(t.GREATER);break;case dy:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}q=me}},setLocked:function(me){U=me},setClear:function(me){K!==me&&(t.clearDepth(me),K=me)},reset:function(){U=!1,Me=null,q=null,K=null}}}function i(){let U=!1,Me=null,q=null,K=null,me=null,Ge=null,lt=null,_t=null,Mt=null;return{setTest:function(ct){U||(ct?ve(t.STENCIL_TEST):ge(t.STENCIL_TEST))},setMask:function(ct){Me!==ct&&!U&&(t.stencilMask(ct),Me=ct)},setFunc:function(ct,V,le){(q!==ct||K!==V||me!==le)&&(t.stencilFunc(ct,V,le),q=ct,K=V,me=le)},setOp:function(ct,V,le){(Ge!==ct||lt!==V||_t!==le)&&(t.stencilOp(ct,V,le),Ge=ct,lt=V,_t=le)},setLocked:function(ct){U=ct},setClear:function(ct){Mt!==ct&&(t.clearStencil(ct),Mt=ct)},reset:function(){U=!1,Me=null,q=null,K=null,me=null,Ge=null,lt=null,_t=null,Mt=null}}}const r=new e,s=new n,a=new i,o=new WeakMap,c=new WeakMap;let u={},f={},p=new WeakMap,h=[],m=null,x=!1,y=null,g=null,d=null,v=null,_=null,T=null,D=null,C=new gt(0,0,0),A=0,R=!1,E=null,S=null,N=null,G=null,z=null;const te=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Q=!1,$=0;const J=t.getParameter(t.VERSION);J.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(J)[1]),Q=$>=1):J.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),Q=$>=2);let F=null,ee={};const ie=t.getParameter(t.SCISSOR_BOX),ue=t.getParameter(t.VIEWPORT),Ie=new $t().fromArray(ie),at=new $t().fromArray(ue);function X(U,Me,q,K){const me=new Uint8Array(4),Ge=t.createTexture();t.bindTexture(U,Ge),t.texParameteri(U,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(U,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let lt=0;lt<q;lt++)U===t.TEXTURE_3D||U===t.TEXTURE_2D_ARRAY?t.texImage3D(Me,0,t.RGBA,1,1,K,0,t.RGBA,t.UNSIGNED_BYTE,me):t.texImage2D(Me+lt,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,me);return Ge}const se={};se[t.TEXTURE_2D]=X(t.TEXTURE_2D,t.TEXTURE_2D,1),se[t.TEXTURE_CUBE_MAP]=X(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[t.TEXTURE_2D_ARRAY]=X(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),se[t.TEXTURE_3D]=X(t.TEXTURE_3D,t.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),a.setClear(0),ve(t.DEPTH_TEST),s.setFunc(Rl),Be(!1),nt(Nh),ve(t.CULL_FACE),et(tr);function ve(U){u[U]!==!0&&(t.enable(U),u[U]=!0)}function ge(U){u[U]!==!1&&(t.disable(U),u[U]=!1)}function Re(U,Me){return f[U]!==Me?(t.bindFramebuffer(U,Me),f[U]=Me,U===t.DRAW_FRAMEBUFFER&&(f[t.FRAMEBUFFER]=Me),U===t.FRAMEBUFFER&&(f[t.DRAW_FRAMEBUFFER]=Me),!0):!1}function Oe(U,Me){let q=h,K=!1;if(U){q=p.get(Me),q===void 0&&(q=[],p.set(Me,q));const me=U.textures;if(q.length!==me.length||q[0]!==t.COLOR_ATTACHMENT0){for(let Ge=0,lt=me.length;Ge<lt;Ge++)q[Ge]=t.COLOR_ATTACHMENT0+Ge;q.length=me.length,K=!0}}else q[0]!==t.BACK&&(q[0]=t.BACK,K=!0);K&&t.drawBuffers(q)}function qe(U){return m!==U?(t.useProgram(U),m=U,!0):!1}const I={[Ar]:t.FUNC_ADD,[jx]:t.FUNC_SUBTRACT,[Vx]:t.FUNC_REVERSE_SUBTRACT};I[Gx]=t.MIN,I[Wx]=t.MAX;const Qe={[Xx]:t.ZERO,[qx]:t.ONE,[Yx]:t.SRC_COLOR,[ud]:t.SRC_ALPHA,[ey]:t.SRC_ALPHA_SATURATE,[Qx]:t.DST_COLOR,[Kx]:t.DST_ALPHA,[$x]:t.ONE_MINUS_SRC_COLOR,[dd]:t.ONE_MINUS_SRC_ALPHA,[Jx]:t.ONE_MINUS_DST_COLOR,[Zx]:t.ONE_MINUS_DST_ALPHA,[ty]:t.CONSTANT_COLOR,[ny]:t.ONE_MINUS_CONSTANT_COLOR,[iy]:t.CONSTANT_ALPHA,[ry]:t.ONE_MINUS_CONSTANT_ALPHA};function et(U,Me,q,K,me,Ge,lt,_t,Mt,ct){if(U===tr){x===!0&&(ge(t.BLEND),x=!1);return}if(x===!1&&(ve(t.BLEND),x=!0),U!==Hx){if(U!==y||ct!==R){if((g!==Ar||_!==Ar)&&(t.blendEquation(t.FUNC_ADD),g=Ar,_=Ar),ct)switch(U){case Cs:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case cd:t.blendFunc(t.ONE,t.ONE);break;case Ph:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Lh:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Cs:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case cd:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case Ph:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Lh:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}d=null,v=null,T=null,D=null,C.set(0,0,0),A=0,y=U,R=ct}return}me=me||Me,Ge=Ge||q,lt=lt||K,(Me!==g||me!==_)&&(t.blendEquationSeparate(I[Me],I[me]),g=Me,_=me),(q!==d||K!==v||Ge!==T||lt!==D)&&(t.blendFuncSeparate(Qe[q],Qe[K],Qe[Ge],Qe[lt]),d=q,v=K,T=Ge,D=lt),(_t.equals(C)===!1||Mt!==A)&&(t.blendColor(_t.r,_t.g,_t.b,Mt),C.copy(_t),A=Mt),y=U,R=!1}function ht(U,Me){U.side===xi?ge(t.CULL_FACE):ve(t.CULL_FACE);let q=U.side===_n;Me&&(q=!q),Be(q),U.blending===Cs&&U.transparent===!1?et(tr):et(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),s.setFunc(U.depthFunc),s.setTest(U.depthTest),s.setMask(U.depthWrite),r.setMask(U.colorWrite);const K=U.stencilWrite;a.setTest(K),K&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ye(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ve(t.SAMPLE_ALPHA_TO_COVERAGE):ge(t.SAMPLE_ALPHA_TO_COVERAGE)}function Be(U){E!==U&&(U?t.frontFace(t.CW):t.frontFace(t.CCW),E=U)}function nt(U){U!==kx?(ve(t.CULL_FACE),U!==S&&(U===Nh?t.cullFace(t.BACK):U===Bx?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):ge(t.CULL_FACE),S=U}function Je(U){U!==N&&(Q&&t.lineWidth(U),N=U)}function Ye(U,Me,q){U?(ve(t.POLYGON_OFFSET_FILL),(G!==Me||z!==q)&&(t.polygonOffset(Me,q),G=Me,z=q)):ge(t.POLYGON_OFFSET_FILL)}function yt(U){U?ve(t.SCISSOR_TEST):ge(t.SCISSOR_TEST)}function b(U){U===void 0&&(U=t.TEXTURE0+te-1),F!==U&&(t.activeTexture(U),F=U)}function M(U,Me,q){q===void 0&&(F===null?q=t.TEXTURE0+te-1:q=F);let K=ee[q];K===void 0&&(K={type:void 0,texture:void 0},ee[q]=K),(K.type!==U||K.texture!==Me)&&(F!==q&&(t.activeTexture(q),F=q),t.bindTexture(U,Me||se[U]),K.type=U,K.texture=Me)}function H(){const U=ee[F];U!==void 0&&U.type!==void 0&&(t.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function ae(){try{t.compressedTexImage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ne(){try{t.compressedTexImage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function oe(){try{t.texSubImage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ue(){try{t.texSubImage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function _e(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Se(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function je(){try{t.texStorage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function he(){try{t.texStorage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ne(){try{t.texImage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ze(){try{t.texImage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ve(U){Ie.equals(U)===!1&&(t.scissor(U.x,U.y,U.z,U.w),Ie.copy(U))}function we(U){at.equals(U)===!1&&(t.viewport(U.x,U.y,U.z,U.w),at.copy(U))}function Ke(U,Me){let q=c.get(Me);q===void 0&&(q=new WeakMap,c.set(Me,q));let K=q.get(U);K===void 0&&(K=t.getUniformBlockIndex(Me,U.name),q.set(U,K))}function $e(U,Me){const K=c.get(Me).get(U);o.get(Me)!==K&&(t.uniformBlockBinding(Me,K,U.__bindingPointIndex),o.set(Me,K))}function it(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),u={},F=null,ee={},f={},p=new WeakMap,h=[],m=null,x=!1,y=null,g=null,d=null,v=null,_=null,T=null,D=null,C=new gt(0,0,0),A=0,R=!1,E=null,S=null,N=null,G=null,z=null,Ie.set(0,0,t.canvas.width,t.canvas.height),at.set(0,0,t.canvas.width,t.canvas.height),r.reset(),s.reset(),a.reset()}return{buffers:{color:r,depth:s,stencil:a},enable:ve,disable:ge,bindFramebuffer:Re,drawBuffers:Oe,useProgram:qe,setBlending:et,setMaterial:ht,setFlipSided:Be,setCullFace:nt,setLineWidth:Je,setPolygonOffset:Ye,setScissorTest:yt,activeTexture:b,bindTexture:M,unbindTexture:H,compressedTexImage2D:ae,compressedTexImage3D:ne,texImage2D:Ne,texImage3D:Ze,updateUBOMapping:Ke,uniformBlockBinding:$e,texStorage2D:je,texStorage3D:he,texSubImage2D:oe,texSubImage3D:Ue,compressedTexSubImage2D:_e,compressedTexSubImage3D:Se,scissor:Ve,viewport:we,reset:it}}function jT(t,e,n,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new pt,f=new WeakMap;let p;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(b,M){return m?new OffscreenCanvas(b,M):Ul("canvas")}function y(b,M,H){let ae=1;const ne=yt(b);if((ne.width>H||ne.height>H)&&(ae=H/Math.max(ne.width,ne.height)),ae<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const oe=Math.floor(ae*ne.width),Ue=Math.floor(ae*ne.height);p===void 0&&(p=x(oe,Ue));const _e=M?x(oe,Ue):p;return _e.width=oe,_e.height=Ue,_e.getContext("2d").drawImage(b,0,0,oe,Ue),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+oe+"x"+Ue+")."),_e}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),b;return b}function g(b){return b.generateMipmaps&&b.minFilter!==Fn&&b.minFilter!==$n}function d(b){t.generateMipmap(b)}function v(b,M,H,ae,ne=!1){if(b!==null){if(t[b]!==void 0)return t[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let oe=M;if(M===t.RED&&(H===t.FLOAT&&(oe=t.R32F),H===t.HALF_FLOAT&&(oe=t.R16F),H===t.UNSIGNED_BYTE&&(oe=t.R8)),M===t.RED_INTEGER&&(H===t.UNSIGNED_BYTE&&(oe=t.R8UI),H===t.UNSIGNED_SHORT&&(oe=t.R16UI),H===t.UNSIGNED_INT&&(oe=t.R32UI),H===t.BYTE&&(oe=t.R8I),H===t.SHORT&&(oe=t.R16I),H===t.INT&&(oe=t.R32I)),M===t.RG&&(H===t.FLOAT&&(oe=t.RG32F),H===t.HALF_FLOAT&&(oe=t.RG16F),H===t.UNSIGNED_BYTE&&(oe=t.RG8)),M===t.RG_INTEGER&&(H===t.UNSIGNED_BYTE&&(oe=t.RG8UI),H===t.UNSIGNED_SHORT&&(oe=t.RG16UI),H===t.UNSIGNED_INT&&(oe=t.RG32UI),H===t.BYTE&&(oe=t.RG8I),H===t.SHORT&&(oe=t.RG16I),H===t.INT&&(oe=t.RG32I)),M===t.RGB&&H===t.UNSIGNED_INT_5_9_9_9_REV&&(oe=t.RGB9_E5),M===t.RGBA){const Ue=ne?Nl:mt.getTransfer(ae);H===t.FLOAT&&(oe=t.RGBA32F),H===t.HALF_FLOAT&&(oe=t.RGBA16F),H===t.UNSIGNED_BYTE&&(oe=Ue===wt?t.SRGB8_ALPHA8:t.RGBA8),H===t.UNSIGNED_SHORT_4_4_4_4&&(oe=t.RGBA4),H===t.UNSIGNED_SHORT_5_5_5_1&&(oe=t.RGB5_A1)}return(oe===t.R16F||oe===t.R32F||oe===t.RG16F||oe===t.RG32F||oe===t.RGBA16F||oe===t.RGBA32F)&&e.get("EXT_color_buffer_float"),oe}function _(b,M){let H;return b?M===null||M===Bs||M===zs?H=t.DEPTH24_STENCIL8:M===Xi?H=t.DEPTH32F_STENCIL8:M===bl&&(H=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Bs||M===zs?H=t.DEPTH_COMPONENT24:M===Xi?H=t.DEPTH_COMPONENT32F:M===bl&&(H=t.DEPTH_COMPONENT16),H}function T(b,M){return g(b)===!0||b.isFramebufferTexture&&b.minFilter!==Fn&&b.minFilter!==$n?Math.log2(Math.max(M.width,M.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?M.mipmaps.length:1}function D(b){const M=b.target;M.removeEventListener("dispose",D),A(M),M.isVideoTexture&&f.delete(M)}function C(b){const M=b.target;M.removeEventListener("dispose",C),E(M)}function A(b){const M=i.get(b);if(M.__webglInit===void 0)return;const H=b.source,ae=h.get(H);if(ae){const ne=ae[M.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&R(b),Object.keys(ae).length===0&&h.delete(H)}i.remove(b)}function R(b){const M=i.get(b);t.deleteTexture(M.__webglTexture);const H=b.source,ae=h.get(H);delete ae[M.__cacheKey],a.memory.textures--}function E(b){const M=i.get(b);if(b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let ae=0;ae<6;ae++){if(Array.isArray(M.__webglFramebuffer[ae]))for(let ne=0;ne<M.__webglFramebuffer[ae].length;ne++)t.deleteFramebuffer(M.__webglFramebuffer[ae][ne]);else t.deleteFramebuffer(M.__webglFramebuffer[ae]);M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer[ae])}else{if(Array.isArray(M.__webglFramebuffer))for(let ae=0;ae<M.__webglFramebuffer.length;ae++)t.deleteFramebuffer(M.__webglFramebuffer[ae]);else t.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&t.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let ae=0;ae<M.__webglColorRenderbuffer.length;ae++)M.__webglColorRenderbuffer[ae]&&t.deleteRenderbuffer(M.__webglColorRenderbuffer[ae]);M.__webglDepthRenderbuffer&&t.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const H=b.textures;for(let ae=0,ne=H.length;ae<ne;ae++){const oe=i.get(H[ae]);oe.__webglTexture&&(t.deleteTexture(oe.__webglTexture),a.memory.textures--),i.remove(H[ae])}i.remove(b)}let S=0;function N(){S=0}function G(){const b=S;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),S+=1,b}function z(b){const M=[];return M.push(b.wrapS),M.push(b.wrapT),M.push(b.wrapR||0),M.push(b.magFilter),M.push(b.minFilter),M.push(b.anisotropy),M.push(b.internalFormat),M.push(b.format),M.push(b.type),M.push(b.generateMipmaps),M.push(b.premultiplyAlpha),M.push(b.flipY),M.push(b.unpackAlignment),M.push(b.colorSpace),M.join()}function te(b,M){const H=i.get(b);if(b.isVideoTexture&&Je(b),b.isRenderTargetTexture===!1&&b.version>0&&H.__version!==b.version){const ae=b.image;if(ae===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ae.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{at(H,b,M);return}}n.bindTexture(t.TEXTURE_2D,H.__webglTexture,t.TEXTURE0+M)}function Q(b,M){const H=i.get(b);if(b.version>0&&H.__version!==b.version){at(H,b,M);return}n.bindTexture(t.TEXTURE_2D_ARRAY,H.__webglTexture,t.TEXTURE0+M)}function $(b,M){const H=i.get(b);if(b.version>0&&H.__version!==b.version){at(H,b,M);return}n.bindTexture(t.TEXTURE_3D,H.__webglTexture,t.TEXTURE0+M)}function J(b,M){const H=i.get(b);if(b.version>0&&H.__version!==b.version){X(H,b,M);return}n.bindTexture(t.TEXTURE_CUBE_MAP,H.__webglTexture,t.TEXTURE0+M)}const F={[pd]:t.REPEAT,[Pr]:t.CLAMP_TO_EDGE,[md]:t.MIRRORED_REPEAT},ee={[Fn]:t.NEAREST,[Sy]:t.NEAREST_MIPMAP_NEAREST,[xo]:t.NEAREST_MIPMAP_LINEAR,[$n]:t.LINEAR,[Uc]:t.LINEAR_MIPMAP_NEAREST,[Lr]:t.LINEAR_MIPMAP_LINEAR},ie={[Fy]:t.NEVER,[jy]:t.ALWAYS,[Oy]:t.LESS,[Dv]:t.LEQUAL,[ky]:t.EQUAL,[Hy]:t.GEQUAL,[By]:t.GREATER,[zy]:t.NOTEQUAL};function ue(b,M){if(M.type===Xi&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===$n||M.magFilter===Uc||M.magFilter===xo||M.magFilter===Lr||M.minFilter===$n||M.minFilter===Uc||M.minFilter===xo||M.minFilter===Lr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(b,t.TEXTURE_WRAP_S,F[M.wrapS]),t.texParameteri(b,t.TEXTURE_WRAP_T,F[M.wrapT]),(b===t.TEXTURE_3D||b===t.TEXTURE_2D_ARRAY)&&t.texParameteri(b,t.TEXTURE_WRAP_R,F[M.wrapR]),t.texParameteri(b,t.TEXTURE_MAG_FILTER,ee[M.magFilter]),t.texParameteri(b,t.TEXTURE_MIN_FILTER,ee[M.minFilter]),M.compareFunction&&(t.texParameteri(b,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(b,t.TEXTURE_COMPARE_FUNC,ie[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Fn||M.minFilter!==xo&&M.minFilter!==Lr||M.type===Xi&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");t.texParameterf(b,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function Ie(b,M){let H=!1;b.__webglInit===void 0&&(b.__webglInit=!0,M.addEventListener("dispose",D));const ae=M.source;let ne=h.get(ae);ne===void 0&&(ne={},h.set(ae,ne));const oe=z(M);if(oe!==b.__cacheKey){ne[oe]===void 0&&(ne[oe]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,H=!0),ne[oe].usedTimes++;const Ue=ne[b.__cacheKey];Ue!==void 0&&(ne[b.__cacheKey].usedTimes--,Ue.usedTimes===0&&R(M)),b.__cacheKey=oe,b.__webglTexture=ne[oe].texture}return H}function at(b,M,H){let ae=t.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(ae=t.TEXTURE_2D_ARRAY),M.isData3DTexture&&(ae=t.TEXTURE_3D);const ne=Ie(b,M),oe=M.source;n.bindTexture(ae,b.__webglTexture,t.TEXTURE0+H);const Ue=i.get(oe);if(oe.version!==Ue.__version||ne===!0){n.activeTexture(t.TEXTURE0+H);const _e=mt.getPrimaries(mt.workingColorSpace),Se=M.colorSpace===Vi?null:mt.getPrimaries(M.colorSpace),je=M.colorSpace===Vi||_e===Se?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,je);let he=y(M.image,!1,r.maxTextureSize);he=Ye(M,he);const Ne=s.convert(M.format,M.colorSpace),Ze=s.convert(M.type);let Ve=v(M.internalFormat,Ne,Ze,M.colorSpace,M.isVideoTexture);ue(ae,M);let we;const Ke=M.mipmaps,$e=M.isVideoTexture!==!0,it=Ue.__version===void 0||ne===!0,U=oe.dataReady,Me=T(M,he);if(M.isDepthTexture)Ve=_(M.format===Hs,M.type),it&&($e?n.texStorage2D(t.TEXTURE_2D,1,Ve,he.width,he.height):n.texImage2D(t.TEXTURE_2D,0,Ve,he.width,he.height,0,Ne,Ze,null));else if(M.isDataTexture)if(Ke.length>0){$e&&it&&n.texStorage2D(t.TEXTURE_2D,Me,Ve,Ke[0].width,Ke[0].height);for(let q=0,K=Ke.length;q<K;q++)we=Ke[q],$e?U&&n.texSubImage2D(t.TEXTURE_2D,q,0,0,we.width,we.height,Ne,Ze,we.data):n.texImage2D(t.TEXTURE_2D,q,Ve,we.width,we.height,0,Ne,Ze,we.data);M.generateMipmaps=!1}else $e?(it&&n.texStorage2D(t.TEXTURE_2D,Me,Ve,he.width,he.height),U&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,he.width,he.height,Ne,Ze,he.data)):n.texImage2D(t.TEXTURE_2D,0,Ve,he.width,he.height,0,Ne,Ze,he.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){$e&&it&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Me,Ve,Ke[0].width,Ke[0].height,he.depth);for(let q=0,K=Ke.length;q<K;q++)if(we=Ke[q],M.format!==ai)if(Ne!==null)if($e){if(U)if(M.layerUpdates.size>0){for(const me of M.layerUpdates){const Ge=we.width*we.height;n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,q,0,0,me,we.width,we.height,1,Ne,we.data.slice(Ge*me,Ge*(me+1)),0,0)}M.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,q,0,0,0,we.width,we.height,he.depth,Ne,we.data,0,0)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,q,Ve,we.width,we.height,he.depth,0,we.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $e?U&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,q,0,0,0,we.width,we.height,he.depth,Ne,Ze,we.data):n.texImage3D(t.TEXTURE_2D_ARRAY,q,Ve,we.width,we.height,he.depth,0,Ne,Ze,we.data)}else{$e&&it&&n.texStorage2D(t.TEXTURE_2D,Me,Ve,Ke[0].width,Ke[0].height);for(let q=0,K=Ke.length;q<K;q++)we=Ke[q],M.format!==ai?Ne!==null?$e?U&&n.compressedTexSubImage2D(t.TEXTURE_2D,q,0,0,we.width,we.height,Ne,we.data):n.compressedTexImage2D(t.TEXTURE_2D,q,Ve,we.width,we.height,0,we.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?U&&n.texSubImage2D(t.TEXTURE_2D,q,0,0,we.width,we.height,Ne,Ze,we.data):n.texImage2D(t.TEXTURE_2D,q,Ve,we.width,we.height,0,Ne,Ze,we.data)}else if(M.isDataArrayTexture)if($e){if(it&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Me,Ve,he.width,he.height,he.depth),U)if(M.layerUpdates.size>0){let q;switch(Ze){case t.UNSIGNED_BYTE:switch(Ne){case t.ALPHA:q=1;break;case t.LUMINANCE:q=1;break;case t.LUMINANCE_ALPHA:q=2;break;case t.RGB:q=3;break;case t.RGBA:q=4;break;default:throw new Error(`Unknown texel size for format ${Ne}.`)}break;case t.UNSIGNED_SHORT_4_4_4_4:case t.UNSIGNED_SHORT_5_5_5_1:case t.UNSIGNED_SHORT_5_6_5:q=1;break;default:throw new Error(`Unknown texel size for type ${Ze}.`)}const K=he.width*he.height*q;for(const me of M.layerUpdates)n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,me,he.width,he.height,1,Ne,Ze,he.data.slice(K*me,K*(me+1)));M.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,he.width,he.height,he.depth,Ne,Ze,he.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Ve,he.width,he.height,he.depth,0,Ne,Ze,he.data);else if(M.isData3DTexture)$e?(it&&n.texStorage3D(t.TEXTURE_3D,Me,Ve,he.width,he.height,he.depth),U&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,he.width,he.height,he.depth,Ne,Ze,he.data)):n.texImage3D(t.TEXTURE_3D,0,Ve,he.width,he.height,he.depth,0,Ne,Ze,he.data);else if(M.isFramebufferTexture){if(it)if($e)n.texStorage2D(t.TEXTURE_2D,Me,Ve,he.width,he.height);else{let q=he.width,K=he.height;for(let me=0;me<Me;me++)n.texImage2D(t.TEXTURE_2D,me,Ve,q,K,0,Ne,Ze,null),q>>=1,K>>=1}}else if(Ke.length>0){if($e&&it){const q=yt(Ke[0]);n.texStorage2D(t.TEXTURE_2D,Me,Ve,q.width,q.height)}for(let q=0,K=Ke.length;q<K;q++)we=Ke[q],$e?U&&n.texSubImage2D(t.TEXTURE_2D,q,0,0,Ne,Ze,we):n.texImage2D(t.TEXTURE_2D,q,Ve,Ne,Ze,we);M.generateMipmaps=!1}else if($e){if(it){const q=yt(he);n.texStorage2D(t.TEXTURE_2D,Me,Ve,q.width,q.height)}U&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,Ne,Ze,he)}else n.texImage2D(t.TEXTURE_2D,0,Ve,Ne,Ze,he);g(M)&&d(ae),Ue.__version=oe.version,M.onUpdate&&M.onUpdate(M)}b.__version=M.version}function X(b,M,H){if(M.image.length!==6)return;const ae=Ie(b,M),ne=M.source;n.bindTexture(t.TEXTURE_CUBE_MAP,b.__webglTexture,t.TEXTURE0+H);const oe=i.get(ne);if(ne.version!==oe.__version||ae===!0){n.activeTexture(t.TEXTURE0+H);const Ue=mt.getPrimaries(mt.workingColorSpace),_e=M.colorSpace===Vi?null:mt.getPrimaries(M.colorSpace),Se=M.colorSpace===Vi||Ue===_e?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);const je=M.isCompressedTexture||M.image[0].isCompressedTexture,he=M.image[0]&&M.image[0].isDataTexture,Ne=[];for(let K=0;K<6;K++)!je&&!he?Ne[K]=y(M.image[K],!0,r.maxCubemapSize):Ne[K]=he?M.image[K].image:M.image[K],Ne[K]=Ye(M,Ne[K]);const Ze=Ne[0],Ve=s.convert(M.format,M.colorSpace),we=s.convert(M.type),Ke=v(M.internalFormat,Ve,we,M.colorSpace),$e=M.isVideoTexture!==!0,it=oe.__version===void 0||ae===!0,U=ne.dataReady;let Me=T(M,Ze);ue(t.TEXTURE_CUBE_MAP,M);let q;if(je){$e&&it&&n.texStorage2D(t.TEXTURE_CUBE_MAP,Me,Ke,Ze.width,Ze.height);for(let K=0;K<6;K++){q=Ne[K].mipmaps;for(let me=0;me<q.length;me++){const Ge=q[me];M.format!==ai?Ve!==null?$e?U&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,me,0,0,Ge.width,Ge.height,Ve,Ge.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,me,Ke,Ge.width,Ge.height,0,Ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$e?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,me,0,0,Ge.width,Ge.height,Ve,we,Ge.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,me,Ke,Ge.width,Ge.height,0,Ve,we,Ge.data)}}}else{if(q=M.mipmaps,$e&&it){q.length>0&&Me++;const K=yt(Ne[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,Me,Ke,K.width,K.height)}for(let K=0;K<6;K++)if(he){$e?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Ne[K].width,Ne[K].height,Ve,we,Ne[K].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ke,Ne[K].width,Ne[K].height,0,Ve,we,Ne[K].data);for(let me=0;me<q.length;me++){const lt=q[me].image[K].image;$e?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,me+1,0,0,lt.width,lt.height,Ve,we,lt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,me+1,Ke,lt.width,lt.height,0,Ve,we,lt.data)}}else{$e?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Ve,we,Ne[K]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ke,Ve,we,Ne[K]);for(let me=0;me<q.length;me++){const Ge=q[me];$e?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,me+1,0,0,Ve,we,Ge.image[K]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,me+1,Ke,Ve,we,Ge.image[K])}}}g(M)&&d(t.TEXTURE_CUBE_MAP),oe.__version=ne.version,M.onUpdate&&M.onUpdate(M)}b.__version=M.version}function se(b,M,H,ae,ne,oe){const Ue=s.convert(H.format,H.colorSpace),_e=s.convert(H.type),Se=v(H.internalFormat,Ue,_e,H.colorSpace);if(!i.get(M).__hasExternalTextures){const he=Math.max(1,M.width>>oe),Ne=Math.max(1,M.height>>oe);ne===t.TEXTURE_3D||ne===t.TEXTURE_2D_ARRAY?n.texImage3D(ne,oe,Se,he,Ne,M.depth,0,Ue,_e,null):n.texImage2D(ne,oe,Se,he,Ne,0,Ue,_e,null)}n.bindFramebuffer(t.FRAMEBUFFER,b),nt(M)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ae,ne,i.get(H).__webglTexture,0,Be(M)):(ne===t.TEXTURE_2D||ne>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,ae,ne,i.get(H).__webglTexture,oe),n.bindFramebuffer(t.FRAMEBUFFER,null)}function ve(b,M,H){if(t.bindRenderbuffer(t.RENDERBUFFER,b),M.depthBuffer){const ae=M.depthTexture,ne=ae&&ae.isDepthTexture?ae.type:null,oe=_(M.stencilBuffer,ne),Ue=M.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,_e=Be(M);nt(M)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,_e,oe,M.width,M.height):H?t.renderbufferStorageMultisample(t.RENDERBUFFER,_e,oe,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,oe,M.width,M.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Ue,t.RENDERBUFFER,b)}else{const ae=M.textures;for(let ne=0;ne<ae.length;ne++){const oe=ae[ne],Ue=s.convert(oe.format,oe.colorSpace),_e=s.convert(oe.type),Se=v(oe.internalFormat,Ue,_e,oe.colorSpace),je=Be(M);H&&nt(M)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,je,Se,M.width,M.height):nt(M)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,je,Se,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,Se,M.width,M.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function ge(b,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,b),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),te(M.depthTexture,0);const ae=i.get(M.depthTexture).__webglTexture,ne=Be(M);if(M.depthTexture.format===Rs)nt(M)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ae,0,ne):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ae,0);else if(M.depthTexture.format===Hs)nt(M)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ae,0,ne):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ae,0);else throw new Error("Unknown depthTexture format")}function Re(b){const M=i.get(b),H=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!M.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");ge(M.__webglFramebuffer,b)}else if(H){M.__webglDepthbuffer=[];for(let ae=0;ae<6;ae++)n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer[ae]),M.__webglDepthbuffer[ae]=t.createRenderbuffer(),ve(M.__webglDepthbuffer[ae],b,!1)}else n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=t.createRenderbuffer(),ve(M.__webglDepthbuffer,b,!1);n.bindFramebuffer(t.FRAMEBUFFER,null)}function Oe(b,M,H){const ae=i.get(b);M!==void 0&&se(ae.__webglFramebuffer,b,b.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),H!==void 0&&Re(b)}function qe(b){const M=b.texture,H=i.get(b),ae=i.get(M);b.addEventListener("dispose",C);const ne=b.textures,oe=b.isWebGLCubeRenderTarget===!0,Ue=ne.length>1;if(Ue||(ae.__webglTexture===void 0&&(ae.__webglTexture=t.createTexture()),ae.__version=M.version,a.memory.textures++),oe){H.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer[_e]=[];for(let Se=0;Se<M.mipmaps.length;Se++)H.__webglFramebuffer[_e][Se]=t.createFramebuffer()}else H.__webglFramebuffer[_e]=t.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer=[];for(let _e=0;_e<M.mipmaps.length;_e++)H.__webglFramebuffer[_e]=t.createFramebuffer()}else H.__webglFramebuffer=t.createFramebuffer();if(Ue)for(let _e=0,Se=ne.length;_e<Se;_e++){const je=i.get(ne[_e]);je.__webglTexture===void 0&&(je.__webglTexture=t.createTexture(),a.memory.textures++)}if(b.samples>0&&nt(b)===!1){H.__webglMultisampledFramebuffer=t.createFramebuffer(),H.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let _e=0;_e<ne.length;_e++){const Se=ne[_e];H.__webglColorRenderbuffer[_e]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,H.__webglColorRenderbuffer[_e]);const je=s.convert(Se.format,Se.colorSpace),he=s.convert(Se.type),Ne=v(Se.internalFormat,je,he,Se.colorSpace,b.isXRRenderTarget===!0),Ze=Be(b);t.renderbufferStorageMultisample(t.RENDERBUFFER,Ze,Ne,b.width,b.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+_e,t.RENDERBUFFER,H.__webglColorRenderbuffer[_e])}t.bindRenderbuffer(t.RENDERBUFFER,null),b.depthBuffer&&(H.__webglDepthRenderbuffer=t.createRenderbuffer(),ve(H.__webglDepthRenderbuffer,b,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(oe){n.bindTexture(t.TEXTURE_CUBE_MAP,ae.__webglTexture),ue(t.TEXTURE_CUBE_MAP,M);for(let _e=0;_e<6;_e++)if(M.mipmaps&&M.mipmaps.length>0)for(let Se=0;Se<M.mipmaps.length;Se++)se(H.__webglFramebuffer[_e][Se],b,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Se);else se(H.__webglFramebuffer[_e],b,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);g(M)&&d(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Ue){for(let _e=0,Se=ne.length;_e<Se;_e++){const je=ne[_e],he=i.get(je);n.bindTexture(t.TEXTURE_2D,he.__webglTexture),ue(t.TEXTURE_2D,je),se(H.__webglFramebuffer,b,je,t.COLOR_ATTACHMENT0+_e,t.TEXTURE_2D,0),g(je)&&d(t.TEXTURE_2D)}n.unbindTexture()}else{let _e=t.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(_e=b.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(_e,ae.__webglTexture),ue(_e,M),M.mipmaps&&M.mipmaps.length>0)for(let Se=0;Se<M.mipmaps.length;Se++)se(H.__webglFramebuffer[Se],b,M,t.COLOR_ATTACHMENT0,_e,Se);else se(H.__webglFramebuffer,b,M,t.COLOR_ATTACHMENT0,_e,0);g(M)&&d(_e),n.unbindTexture()}b.depthBuffer&&Re(b)}function I(b){const M=b.textures;for(let H=0,ae=M.length;H<ae;H++){const ne=M[H];if(g(ne)){const oe=b.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,Ue=i.get(ne).__webglTexture;n.bindTexture(oe,Ue),d(oe),n.unbindTexture()}}}const Qe=[],et=[];function ht(b){if(b.samples>0){if(nt(b)===!1){const M=b.textures,H=b.width,ae=b.height;let ne=t.COLOR_BUFFER_BIT;const oe=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Ue=i.get(b),_e=M.length>1;if(_e)for(let Se=0;Se<M.length;Se++)n.bindFramebuffer(t.FRAMEBUFFER,Ue.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Ue.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Ue.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Ue.__webglFramebuffer);for(let Se=0;Se<M.length;Se++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(ne|=t.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(ne|=t.STENCIL_BUFFER_BIT)),_e){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Ue.__webglColorRenderbuffer[Se]);const je=i.get(M[Se]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,je,0)}t.blitFramebuffer(0,0,H,ae,0,0,H,ae,ne,t.NEAREST),c===!0&&(Qe.length=0,et.length=0,Qe.push(t.COLOR_ATTACHMENT0+Se),b.depthBuffer&&b.resolveDepthBuffer===!1&&(Qe.push(oe),et.push(oe),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,et)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,Qe))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),_e)for(let Se=0;Se<M.length;Se++){n.bindFramebuffer(t.FRAMEBUFFER,Ue.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.RENDERBUFFER,Ue.__webglColorRenderbuffer[Se]);const je=i.get(M[Se]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Ue.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.TEXTURE_2D,je,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Ue.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){const M=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[M])}}}function Be(b){return Math.min(r.maxSamples,b.samples)}function nt(b){const M=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Je(b){const M=a.render.frame;f.get(b)!==M&&(f.set(b,M),b.update())}function Ye(b,M){const H=b.colorSpace,ae=b.format,ne=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||H!==fr&&H!==Vi&&(mt.getTransfer(H)===wt?(ae!==ai||ne!==or)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),M}function yt(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(u.width=b.naturalWidth||b.width,u.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(u.width=b.displayWidth,u.height=b.displayHeight):(u.width=b.width,u.height=b.height),u}this.allocateTextureUnit=G,this.resetTextureUnits=N,this.setTexture2D=te,this.setTexture2DArray=Q,this.setTexture3D=$,this.setTextureCube=J,this.rebindTextures=Oe,this.setupRenderTarget=qe,this.updateRenderTargetMipmap=I,this.updateMultisampleRenderTarget=ht,this.setupDepthRenderbuffer=Re,this.setupFrameBufferTexture=se,this.useMultisampledRTT=nt}function VT(t,e){function n(i,r=Vi){let s;const a=mt.getTransfer(r);if(i===or)return t.UNSIGNED_BYTE;if(i===Rv)return t.UNSIGNED_SHORT_4_4_4_4;if(i===bv)return t.UNSIGNED_SHORT_5_5_5_1;if(i===Ty)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===My)return t.BYTE;if(i===Ey)return t.SHORT;if(i===bl)return t.UNSIGNED_SHORT;if(i===Cv)return t.INT;if(i===Bs)return t.UNSIGNED_INT;if(i===Xi)return t.FLOAT;if(i===tc)return t.HALF_FLOAT;if(i===wy)return t.ALPHA;if(i===Ay)return t.RGB;if(i===ai)return t.RGBA;if(i===Cy)return t.LUMINANCE;if(i===Ry)return t.LUMINANCE_ALPHA;if(i===Rs)return t.DEPTH_COMPONENT;if(i===Hs)return t.DEPTH_STENCIL;if(i===by)return t.RED;if(i===Nv)return t.RED_INTEGER;if(i===Ny)return t.RG;if(i===Pv)return t.RG_INTEGER;if(i===Lv)return t.RGBA_INTEGER;if(i===Ic||i===Fc||i===Oc||i===kc)if(a===wt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ic)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Fc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Oc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===kc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ic)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Fc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Oc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===kc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Dh||i===Uh||i===Ih||i===Fh)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Dh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Uh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ih)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Fh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Oh||i===kh||i===Bh)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Oh||i===kh)return a===wt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Bh)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===zh||i===Hh||i===jh||i===Vh||i===Gh||i===Wh||i===Xh||i===qh||i===Yh||i===$h||i===Kh||i===Zh||i===Qh||i===Jh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===zh)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Hh)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===jh)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Vh)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Gh)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Wh)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Xh)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===qh)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Yh)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===$h)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Kh)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Zh)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Qh)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Jh)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Bc||i===ep||i===tp)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Bc)return a===wt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ep)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===tp)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Py||i===np||i===ip||i===rp)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Bc)return s.COMPRESSED_RED_RGTC1_EXT;if(i===np)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ip)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===rp)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===zs?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}class GT extends Un{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ho extends yn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const WT={type:"move"};class fu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ho,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ho,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new j,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new j),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ho,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new j,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new j),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,u=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(u&&e.hand){a=!0;for(const y of e.hand.values()){const g=n.getJointPose(y,i),d=this._getHandJoint(u,y);g!==null&&(d.matrix.fromArray(g.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=g.radius),d.visible=g!==null}const f=u.joints["index-finger-tip"],p=u.joints["thumb-tip"],h=f.position.distanceTo(p.position),m=.02,x=.005;u.inputState.pinching&&h>m+x?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&h<=m-x&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(WT)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),u!==null&&(u.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Ho;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const XT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,qT=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class YT{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new xn,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new lr({vertexShader:XT,fragmentShader:qT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ei(new rc(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}}class $T extends Xs{constructor(e,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,u=null,f=null,p=null,h=null,m=null,x=null;const y=new YT,g=n.getContextAttributes();let d=null,v=null;const _=[],T=[],D=new pt;let C=null;const A=new Un;A.layers.enable(1),A.viewport=new $t;const R=new Un;R.layers.enable(2),R.viewport=new $t;const E=[A,R],S=new GT;S.layers.enable(1),S.layers.enable(2);let N=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let se=_[X];return se===void 0&&(se=new fu,_[X]=se),se.getTargetRaySpace()},this.getControllerGrip=function(X){let se=_[X];return se===void 0&&(se=new fu,_[X]=se),se.getGripSpace()},this.getHand=function(X){let se=_[X];return se===void 0&&(se=new fu,_[X]=se),se.getHandSpace()};function z(X){const se=T.indexOf(X.inputSource);if(se===-1)return;const ve=_[se];ve!==void 0&&(ve.update(X.inputSource,X.frame,u||a),ve.dispatchEvent({type:X.type,data:X.inputSource}))}function te(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",te),r.removeEventListener("inputsourceschange",Q);for(let X=0;X<_.length;X++){const se=T[X];se!==null&&(T[X]=null,_[X].disconnect(se))}N=null,G=null,y.reset(),e.setRenderTarget(d),m=null,h=null,p=null,r=null,v=null,at.stop(),i.isPresenting=!1,e.setPixelRatio(C),e.setSize(D.width,D.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||a},this.setReferenceSpace=function(X){u=X},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return p},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(d=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",te),r.addEventListener("inputsourceschange",Q),g.xrCompatible!==!0&&await n.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(D),r.renderState.layers===void 0){const se={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,n,se),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),v=new zr(m.framebufferWidth,m.framebufferHeight,{format:ai,type:or,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let se=null,ve=null,ge=null;g.depth&&(ge=g.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,se=g.stencil?Hs:Rs,ve=g.stencil?zs:Bs);const Re={colorFormat:n.RGBA8,depthFormat:ge,scaleFactor:s};p=new XRWebGLBinding(r,n),h=p.createProjectionLayer(Re),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),v=new zr(h.textureWidth,h.textureHeight,{format:ai,type:or,depthTexture:new $v(h.textureWidth,h.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),u=null,a=await r.requestReferenceSpace(o),at.setContext(r),at.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function Q(X){for(let se=0;se<X.removed.length;se++){const ve=X.removed[se],ge=T.indexOf(ve);ge>=0&&(T[ge]=null,_[ge].disconnect(ve))}for(let se=0;se<X.added.length;se++){const ve=X.added[se];let ge=T.indexOf(ve);if(ge===-1){for(let Oe=0;Oe<_.length;Oe++)if(Oe>=T.length){T.push(ve),ge=Oe;break}else if(T[Oe]===null){T[Oe]=ve,ge=Oe;break}if(ge===-1)break}const Re=_[ge];Re&&Re.connect(ve)}}const $=new j,J=new j;function F(X,se,ve){$.setFromMatrixPosition(se.matrixWorld),J.setFromMatrixPosition(ve.matrixWorld);const ge=$.distanceTo(J),Re=se.projectionMatrix.elements,Oe=ve.projectionMatrix.elements,qe=Re[14]/(Re[10]-1),I=Re[14]/(Re[10]+1),Qe=(Re[9]+1)/Re[5],et=(Re[9]-1)/Re[5],ht=(Re[8]-1)/Re[0],Be=(Oe[8]+1)/Oe[0],nt=qe*ht,Je=qe*Be,Ye=ge/(-ht+Be),yt=Ye*-ht;se.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(yt),X.translateZ(Ye),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert();const b=qe+Ye,M=I+Ye,H=nt-yt,ae=Je+(ge-yt),ne=Qe*I/M*b,oe=et*I/M*b;X.projectionMatrix.makePerspective(H,ae,ne,oe,b,M),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}function ee(X,se){se===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(se.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;y.texture!==null&&(X.near=y.depthNear,X.far=y.depthFar),S.near=R.near=A.near=X.near,S.far=R.far=A.far=X.far,(N!==S.near||G!==S.far)&&(r.updateRenderState({depthNear:S.near,depthFar:S.far}),N=S.near,G=S.far,A.near=N,A.far=G,R.near=N,R.far=G,A.updateProjectionMatrix(),R.updateProjectionMatrix(),X.updateProjectionMatrix());const se=X.parent,ve=S.cameras;ee(S,se);for(let ge=0;ge<ve.length;ge++)ee(ve[ge],se);ve.length===2?F(S,A,R):S.projectionMatrix.copy(A.projectionMatrix),ie(X,S,se)};function ie(X,se,ve){ve===null?X.matrix.copy(se.matrixWorld):(X.matrix.copy(ve.matrixWorld),X.matrix.invert(),X.matrix.multiply(se.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(se.projectionMatrix),X.projectionMatrixInverse.copy(se.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=gd*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(h===null&&m===null))return c},this.setFoveation=function(X){c=X,h!==null&&(h.fixedFoveation=X),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=X)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(S)};let ue=null;function Ie(X,se){if(f=se.getViewerPose(u||a),x=se,f!==null){const ve=f.views;m!==null&&(e.setRenderTargetFramebuffer(v,m.framebuffer),e.setRenderTarget(v));let ge=!1;ve.length!==S.cameras.length&&(S.cameras.length=0,ge=!0);for(let Oe=0;Oe<ve.length;Oe++){const qe=ve[Oe];let I=null;if(m!==null)I=m.getViewport(qe);else{const et=p.getViewSubImage(h,qe);I=et.viewport,Oe===0&&(e.setRenderTargetTextures(v,et.colorTexture,h.ignoreDepthValues?void 0:et.depthStencilTexture),e.setRenderTarget(v))}let Qe=E[Oe];Qe===void 0&&(Qe=new Un,Qe.layers.enable(Oe),Qe.viewport=new $t,E[Oe]=Qe),Qe.matrix.fromArray(qe.transform.matrix),Qe.matrix.decompose(Qe.position,Qe.quaternion,Qe.scale),Qe.projectionMatrix.fromArray(qe.projectionMatrix),Qe.projectionMatrixInverse.copy(Qe.projectionMatrix).invert(),Qe.viewport.set(I.x,I.y,I.width,I.height),Oe===0&&(S.matrix.copy(Qe.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ge===!0&&S.cameras.push(Qe)}const Re=r.enabledFeatures;if(Re&&Re.includes("depth-sensing")){const Oe=p.getDepthInformation(ve[0]);Oe&&Oe.isValid&&Oe.texture&&y.init(e,Oe,r.renderState)}}for(let ve=0;ve<_.length;ve++){const ge=T[ve],Re=_[ve];ge!==null&&Re!==void 0&&Re.update(ge,se,u||a)}ue&&ue(X,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),x=null}const at=new Yv;at.setAnimationLoop(Ie),this.setAnimationLoop=function(X){ue=X},this.dispose=function(){}}}const xr=new bi,KT=new Bt;function ZT(t,e){function n(g,d){g.matrixAutoUpdate===!0&&g.updateMatrix(),d.value.copy(g.matrix)}function i(g,d){d.color.getRGB(g.fogColor.value,Gv(t)),d.isFog?(g.fogNear.value=d.near,g.fogFar.value=d.far):d.isFogExp2&&(g.fogDensity.value=d.density)}function r(g,d,v,_,T){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(g,d):d.isMeshToonMaterial?(s(g,d),p(g,d)):d.isMeshPhongMaterial?(s(g,d),f(g,d)):d.isMeshStandardMaterial?(s(g,d),h(g,d),d.isMeshPhysicalMaterial&&m(g,d,T)):d.isMeshMatcapMaterial?(s(g,d),x(g,d)):d.isMeshDepthMaterial?s(g,d):d.isMeshDistanceMaterial?(s(g,d),y(g,d)):d.isMeshNormalMaterial?s(g,d):d.isLineBasicMaterial?(a(g,d),d.isLineDashedMaterial&&o(g,d)):d.isPointsMaterial?c(g,d,v,_):d.isSpriteMaterial?u(g,d):d.isShadowMaterial?(g.color.value.copy(d.color),g.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(g,d){g.opacity.value=d.opacity,d.color&&g.diffuse.value.copy(d.color),d.emissive&&g.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(g.map.value=d.map,n(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.bumpMap&&(g.bumpMap.value=d.bumpMap,n(d.bumpMap,g.bumpMapTransform),g.bumpScale.value=d.bumpScale,d.side===_n&&(g.bumpScale.value*=-1)),d.normalMap&&(g.normalMap.value=d.normalMap,n(d.normalMap,g.normalMapTransform),g.normalScale.value.copy(d.normalScale),d.side===_n&&g.normalScale.value.negate()),d.displacementMap&&(g.displacementMap.value=d.displacementMap,n(d.displacementMap,g.displacementMapTransform),g.displacementScale.value=d.displacementScale,g.displacementBias.value=d.displacementBias),d.emissiveMap&&(g.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,g.emissiveMapTransform)),d.specularMap&&(g.specularMap.value=d.specularMap,n(d.specularMap,g.specularMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest);const v=e.get(d),_=v.envMap,T=v.envMapRotation;_&&(g.envMap.value=_,xr.copy(T),xr.x*=-1,xr.y*=-1,xr.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(xr.y*=-1,xr.z*=-1),g.envMapRotation.value.setFromMatrix4(KT.makeRotationFromEuler(xr)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=d.reflectivity,g.ior.value=d.ior,g.refractionRatio.value=d.refractionRatio),d.lightMap&&(g.lightMap.value=d.lightMap,g.lightMapIntensity.value=d.lightMapIntensity,n(d.lightMap,g.lightMapTransform)),d.aoMap&&(g.aoMap.value=d.aoMap,g.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,g.aoMapTransform))}function a(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,d.map&&(g.map.value=d.map,n(d.map,g.mapTransform))}function o(g,d){g.dashSize.value=d.dashSize,g.totalSize.value=d.dashSize+d.gapSize,g.scale.value=d.scale}function c(g,d,v,_){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.size.value=d.size*v,g.scale.value=_*.5,d.map&&(g.map.value=d.map,n(d.map,g.uvTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function u(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.rotation.value=d.rotation,d.map&&(g.map.value=d.map,n(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function f(g,d){g.specular.value.copy(d.specular),g.shininess.value=Math.max(d.shininess,1e-4)}function p(g,d){d.gradientMap&&(g.gradientMap.value=d.gradientMap)}function h(g,d){g.metalness.value=d.metalness,d.metalnessMap&&(g.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,g.metalnessMapTransform)),g.roughness.value=d.roughness,d.roughnessMap&&(g.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,g.roughnessMapTransform)),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)}function m(g,d,v){g.ior.value=d.ior,d.sheen>0&&(g.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),g.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(g.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,g.sheenColorMapTransform)),d.sheenRoughnessMap&&(g.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,g.sheenRoughnessMapTransform))),d.clearcoat>0&&(g.clearcoat.value=d.clearcoat,g.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(g.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,g.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(g.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===_n&&g.clearcoatNormalScale.value.negate())),d.dispersion>0&&(g.dispersion.value=d.dispersion),d.iridescence>0&&(g.iridescence.value=d.iridescence,g.iridescenceIOR.value=d.iridescenceIOR,g.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(g.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,g.iridescenceMapTransform)),d.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),d.transmission>0&&(g.transmission.value=d.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),d.transmissionMap&&(g.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,g.transmissionMapTransform)),g.thickness.value=d.thickness,d.thicknessMap&&(g.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=d.attenuationDistance,g.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(g.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(g.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=d.specularIntensity,g.specularColor.value.copy(d.specularColor),d.specularColorMap&&(g.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,g.specularColorMapTransform)),d.specularIntensityMap&&(g.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,d){d.matcap&&(g.matcap.value=d.matcap)}function y(g,d){const v=e.get(d).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function QT(t,e,n,i){let r={},s={},a=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,_){const T=_.program;i.uniformBlockBinding(v,T)}function u(v,_){let T=r[v.id];T===void 0&&(x(v),T=f(v),r[v.id]=T,v.addEventListener("dispose",g));const D=_.program;i.updateUBOMapping(v,D);const C=e.render.frame;s[v.id]!==C&&(h(v),s[v.id]=C)}function f(v){const _=p();v.__bindingPointIndex=_;const T=t.createBuffer(),D=v.__size,C=v.usage;return t.bindBuffer(t.UNIFORM_BUFFER,T),t.bufferData(t.UNIFORM_BUFFER,D,C),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,_,T),T}function p(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const _=r[v.id],T=v.uniforms,D=v.__cache;t.bindBuffer(t.UNIFORM_BUFFER,_);for(let C=0,A=T.length;C<A;C++){const R=Array.isArray(T[C])?T[C]:[T[C]];for(let E=0,S=R.length;E<S;E++){const N=R[E];if(m(N,C,E,D)===!0){const G=N.__offset,z=Array.isArray(N.value)?N.value:[N.value];let te=0;for(let Q=0;Q<z.length;Q++){const $=z[Q],J=y($);typeof $=="number"||typeof $=="boolean"?(N.__data[0]=$,t.bufferSubData(t.UNIFORM_BUFFER,G+te,N.__data)):$.isMatrix3?(N.__data[0]=$.elements[0],N.__data[1]=$.elements[1],N.__data[2]=$.elements[2],N.__data[3]=0,N.__data[4]=$.elements[3],N.__data[5]=$.elements[4],N.__data[6]=$.elements[5],N.__data[7]=0,N.__data[8]=$.elements[6],N.__data[9]=$.elements[7],N.__data[10]=$.elements[8],N.__data[11]=0):($.toArray(N.__data,te),te+=J.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,G,N.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function m(v,_,T,D){const C=v.value,A=_+"_"+T;if(D[A]===void 0)return typeof C=="number"||typeof C=="boolean"?D[A]=C:D[A]=C.clone(),!0;{const R=D[A];if(typeof C=="number"||typeof C=="boolean"){if(R!==C)return D[A]=C,!0}else if(R.equals(C)===!1)return R.copy(C),!0}return!1}function x(v){const _=v.uniforms;let T=0;const D=16;for(let A=0,R=_.length;A<R;A++){const E=Array.isArray(_[A])?_[A]:[_[A]];for(let S=0,N=E.length;S<N;S++){const G=E[S],z=Array.isArray(G.value)?G.value:[G.value];for(let te=0,Q=z.length;te<Q;te++){const $=z[te],J=y($),F=T%D;F!==0&&D-F<J.boundary&&(T+=D-F),G.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=T,T+=J.storage}}}const C=T%D;return C>0&&(T+=D-C),v.__size=T,v.__cache={},this}function y(v){const _={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(_.boundary=4,_.storage=4):v.isVector2?(_.boundary=8,_.storage=8):v.isVector3||v.isColor?(_.boundary=16,_.storage=12):v.isVector4?(_.boundary=16,_.storage=16):v.isMatrix3?(_.boundary=48,_.storage=48):v.isMatrix4?(_.boundary=64,_.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),_}function g(v){const _=v.target;_.removeEventListener("dispose",g);const T=a.indexOf(_.__bindingPointIndex);a.splice(T,1),t.deleteBuffer(r[_.id]),delete r[_.id],delete s[_.id]}function d(){for(const v in r)t.deleteBuffer(r[v]);a=[],r={},s={}}return{bind:c,update:u,dispose:d}}class JT{constructor(e={}){const{canvas:n=Gy(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:u=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:p=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=a;const m=new Uint32Array(4),x=new Int32Array(4);let y=null,g=null;const d=[],v=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ni,this.toneMapping=nr,this.toneMappingExposure=1;const _=this;let T=!1,D=0,C=0,A=null,R=-1,E=null;const S=new $t,N=new $t;let G=null;const z=new gt(0);let te=0,Q=n.width,$=n.height,J=1,F=null,ee=null;const ie=new $t(0,0,Q,$),ue=new $t(0,0,Q,$);let Ie=!1;const at=new qv;let X=!1,se=!1;const ve=new Bt,ge=new j,Re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Oe=!1;function qe(){return A===null?J:1}let I=i;function Qe(w,k){return n.getContext(w,k)}try{const w={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:u,powerPreference:f,failIfMajorPerformanceCaveat:p};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${gf}`),n.addEventListener("webglcontextlost",Me,!1),n.addEventListener("webglcontextrestored",q,!1),n.addEventListener("webglcontextcreationerror",K,!1),I===null){const k="webgl2";if(I=Qe(k,w),I===null)throw Qe(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let et,ht,Be,nt,Je,Ye,yt,b,M,H,ae,ne,oe,Ue,_e,Se,je,he,Ne,Ze,Ve,we,Ke,$e;function it(){et=new o1(I),et.init(),we=new VT(I,et),ht=new e1(I,et,e,we),Be=new HT(I),nt=new u1(I),Je=new CT,Ye=new jT(I,et,Be,Je,ht,we,nt),yt=new n1(_),b=new a1(_),M=new gS(I),Ke=new QE(I,M),H=new l1(I,M,nt,Ke),ae=new f1(I,H,M,nt),Ne=new d1(I,ht,Ye),Se=new t1(Je),ne=new AT(_,yt,b,et,ht,Ke,Se),oe=new ZT(_,Je),Ue=new bT,_e=new IT(et),he=new ZE(_,yt,b,Be,ae,h,c),je=new zT(_,ae,ht),$e=new QT(I,nt,ht,Be),Ze=new JE(I,et,nt),Ve=new c1(I,et,nt),nt.programs=ne.programs,_.capabilities=ht,_.extensions=et,_.properties=Je,_.renderLists=Ue,_.shadowMap=je,_.state=Be,_.info=nt}it();const U=new $T(_,I);this.xr=U,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const w=et.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=et.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(w){w!==void 0&&(J=w,this.setSize(Q,$,!1))},this.getSize=function(w){return w.set(Q,$)},this.setSize=function(w,k,B=!0){if(U.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Q=w,$=k,n.width=Math.floor(w*J),n.height=Math.floor(k*J),B===!0&&(n.style.width=w+"px",n.style.height=k+"px"),this.setViewport(0,0,w,k)},this.getDrawingBufferSize=function(w){return w.set(Q*J,$*J).floor()},this.setDrawingBufferSize=function(w,k,B){Q=w,$=k,J=B,n.width=Math.floor(w*B),n.height=Math.floor(k*B),this.setViewport(0,0,w,k)},this.getCurrentViewport=function(w){return w.copy(S)},this.getViewport=function(w){return w.copy(ie)},this.setViewport=function(w,k,B,O){w.isVector4?ie.set(w.x,w.y,w.z,w.w):ie.set(w,k,B,O),Be.viewport(S.copy(ie).multiplyScalar(J).round())},this.getScissor=function(w){return w.copy(ue)},this.setScissor=function(w,k,B,O){w.isVector4?ue.set(w.x,w.y,w.z,w.w):ue.set(w,k,B,O),Be.scissor(N.copy(ue).multiplyScalar(J).round())},this.getScissorTest=function(){return Ie},this.setScissorTest=function(w){Be.setScissorTest(Ie=w)},this.setOpaqueSort=function(w){F=w},this.setTransparentSort=function(w){ee=w},this.getClearColor=function(w){return w.copy(he.getClearColor())},this.setClearColor=function(){he.setClearColor.apply(he,arguments)},this.getClearAlpha=function(){return he.getClearAlpha()},this.setClearAlpha=function(){he.setClearAlpha.apply(he,arguments)},this.clear=function(w=!0,k=!0,B=!0){let O=0;if(w){let L=!1;if(A!==null){const Y=A.texture.format;L=Y===Lv||Y===Pv||Y===Nv}if(L){const Y=A.texture.type,de=Y===or||Y===Bs||Y===bl||Y===zs||Y===Rv||Y===bv,Ce=he.getClearColor(),Le=he.getClearAlpha(),We=Ce.r,Xe=Ce.g,ze=Ce.b;de?(m[0]=We,m[1]=Xe,m[2]=ze,m[3]=Le,I.clearBufferuiv(I.COLOR,0,m)):(x[0]=We,x[1]=Xe,x[2]=ze,x[3]=Le,I.clearBufferiv(I.COLOR,0,x))}else O|=I.COLOR_BUFFER_BIT}k&&(O|=I.DEPTH_BUFFER_BIT),B&&(O|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Me,!1),n.removeEventListener("webglcontextrestored",q,!1),n.removeEventListener("webglcontextcreationerror",K,!1),Ue.dispose(),_e.dispose(),Je.dispose(),yt.dispose(),b.dispose(),ae.dispose(),Ke.dispose(),$e.dispose(),ne.dispose(),U.dispose(),U.removeEventListener("sessionstart",V),U.removeEventListener("sessionend",le),ce.stop()};function Me(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function q(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const w=nt.autoReset,k=je.enabled,B=je.autoUpdate,O=je.needsUpdate,L=je.type;it(),nt.autoReset=w,je.enabled=k,je.autoUpdate=B,je.needsUpdate=O,je.type=L}function K(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function me(w){const k=w.target;k.removeEventListener("dispose",me),Ge(k)}function Ge(w){lt(w),Je.remove(w)}function lt(w){const k=Je.get(w).programs;k!==void 0&&(k.forEach(function(B){ne.releaseProgram(B)}),w.isShaderMaterial&&ne.releaseShaderCache(w))}this.renderBufferDirect=function(w,k,B,O,L,Y){k===null&&(k=Re);const de=L.isMesh&&L.matrixWorld.determinant()<0,Ce=ci(w,k,B,O,L);Be.setMaterial(O,de);let Le=B.index,We=1;if(O.wireframe===!0){if(Le=H.getWireframeAttribute(B),Le===void 0)return;We=2}const Xe=B.drawRange,ze=B.attributes.position;let dt=Xe.start*We,Ct=(Xe.start+Xe.count)*We;Y!==null&&(dt=Math.max(dt,Y.start*We),Ct=Math.min(Ct,(Y.start+Y.count)*We)),Le!==null?(dt=Math.max(dt,0),Ct=Math.min(Ct,Le.count)):ze!=null&&(dt=Math.max(dt,0),Ct=Math.min(Ct,ze.count));const Rt=Ct-dt;if(Rt<0||Rt===1/0)return;Ke.setup(L,O,Ce,B,Le);let sn,ft=Ze;if(Le!==null&&(sn=M.get(Le),ft=Ve,ft.setIndex(sn)),L.isMesh)O.wireframe===!0?(Be.setLineWidth(O.wireframeLinewidth*qe()),ft.setMode(I.LINES)):ft.setMode(I.TRIANGLES);else if(L.isLine){let He=O.linewidth;He===void 0&&(He=1),Be.setLineWidth(He*qe()),L.isLineSegments?ft.setMode(I.LINES):L.isLineLoop?ft.setMode(I.LINE_LOOP):ft.setMode(I.LINE_STRIP)}else L.isPoints?ft.setMode(I.POINTS):L.isSprite&&ft.setMode(I.TRIANGLES);if(L.isBatchedMesh)L._multiDrawInstances!==null?ft.renderMultiDrawInstances(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount,L._multiDrawInstances):ft.renderMultiDraw(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount);else if(L.isInstancedMesh)ft.renderInstances(dt,Rt,L.count);else if(B.isInstancedBufferGeometry){const He=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Gt=Math.min(B.instanceCount,He);ft.renderInstances(dt,Rt,Gt)}else ft.render(dt,Rt)};function _t(w,k,B){w.transparent===!0&&w.side===xi&&w.forceSinglePass===!1?(w.side=_n,w.needsUpdate=!0,Fe(w,k,B),w.side=ar,w.needsUpdate=!0,Fe(w,k,B),w.side=xi):Fe(w,k,B)}this.compile=function(w,k,B=null){B===null&&(B=w),g=_e.get(B),g.init(k),v.push(g),B.traverseVisible(function(L){L.isLight&&L.layers.test(k.layers)&&(g.pushLight(L),L.castShadow&&g.pushShadow(L))}),w!==B&&w.traverseVisible(function(L){L.isLight&&L.layers.test(k.layers)&&(g.pushLight(L),L.castShadow&&g.pushShadow(L))}),g.setupLights();const O=new Set;return w.traverse(function(L){const Y=L.material;if(Y)if(Array.isArray(Y))for(let de=0;de<Y.length;de++){const Ce=Y[de];_t(Ce,B,L),O.add(Ce)}else _t(Y,B,L),O.add(Y)}),v.pop(),g=null,O},this.compileAsync=function(w,k,B=null){const O=this.compile(w,k,B);return new Promise(L=>{function Y(){if(O.forEach(function(de){Je.get(de).currentProgram.isReady()&&O.delete(de)}),O.size===0){L(w);return}setTimeout(Y,10)}et.get("KHR_parallel_shader_compile")!==null?Y():setTimeout(Y,10)})};let Mt=null;function ct(w){Mt&&Mt(w)}function V(){ce.stop()}function le(){ce.start()}const ce=new Yv;ce.setAnimationLoop(ct),typeof self<"u"&&ce.setContext(self),this.setAnimationLoop=function(w){Mt=w,U.setAnimationLoop(w),w===null?ce.stop():ce.start()},U.addEventListener("sessionstart",V),U.addEventListener("sessionend",le),this.render=function(w,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),U.enabled===!0&&U.isPresenting===!0&&(U.cameraAutoUpdate===!0&&U.updateCamera(k),k=U.getCamera()),w.isScene===!0&&w.onBeforeRender(_,w,k,A),g=_e.get(w,v.length),g.init(k),v.push(g),ve.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),at.setFromProjectionMatrix(ve),se=this.localClippingEnabled,X=Se.init(this.clippingPlanes,se),y=Ue.get(w,d.length),y.init(),d.push(y),U.enabled===!0&&U.isPresenting===!0){const Y=_.xr.getDepthSensingMesh();Y!==null&&xe(Y,k,-1/0,_.sortObjects)}xe(w,k,0,_.sortObjects),y.finish(),_.sortObjects===!0&&y.sort(F,ee),Oe=U.enabled===!1||U.isPresenting===!1||U.hasDepthSensing()===!1,Oe&&he.addToRenderList(y,w),this.info.render.frame++,X===!0&&Se.beginShadows();const B=g.state.shadowsArray;je.render(B,w,k),X===!0&&Se.endShadows(),this.info.autoReset===!0&&this.info.reset();const O=y.opaque,L=y.transmissive;if(g.setupLights(),k.isArrayCamera){const Y=k.cameras;if(L.length>0)for(let de=0,Ce=Y.length;de<Ce;de++){const Le=Y[de];be(O,L,w,Le)}Oe&&he.render(w);for(let de=0,Ce=Y.length;de<Ce;de++){const Le=Y[de];ke(y,w,Le,Le.viewport)}}else L.length>0&&be(O,L,w,k),Oe&&he.render(w),ke(y,w,k);A!==null&&(Ye.updateMultisampleRenderTarget(A),Ye.updateRenderTargetMipmap(A)),w.isScene===!0&&w.onAfterRender(_,w,k),Ke.resetDefaultState(),R=-1,E=null,v.pop(),v.length>0?(g=v[v.length-1],X===!0&&Se.setGlobalState(_.clippingPlanes,g.state.camera)):g=null,d.pop(),d.length>0?y=d[d.length-1]:y=null};function xe(w,k,B,O){if(w.visible===!1)return;if(w.layers.test(k.layers)){if(w.isGroup)B=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(k);else if(w.isLight)g.pushLight(w),w.castShadow&&g.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||at.intersectsSprite(w)){O&&ge.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ve);const de=ae.update(w),Ce=w.material;Ce.visible&&y.push(w,de,Ce,B,ge.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||at.intersectsObject(w))){const de=ae.update(w),Ce=w.material;if(O&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ge.copy(w.boundingSphere.center)):(de.boundingSphere===null&&de.computeBoundingSphere(),ge.copy(de.boundingSphere.center)),ge.applyMatrix4(w.matrixWorld).applyMatrix4(ve)),Array.isArray(Ce)){const Le=de.groups;for(let We=0,Xe=Le.length;We<Xe;We++){const ze=Le[We],dt=Ce[ze.materialIndex];dt&&dt.visible&&y.push(w,de,dt,B,ge.z,ze)}}else Ce.visible&&y.push(w,de,Ce,B,ge.z,null)}}const Y=w.children;for(let de=0,Ce=Y.length;de<Ce;de++)xe(Y[de],k,B,O)}function ke(w,k,B,O){const L=w.opaque,Y=w.transmissive,de=w.transparent;g.setupLightsView(B),X===!0&&Se.setGlobalState(_.clippingPlanes,B),O&&Be.viewport(S.copy(O)),L.length>0&&Ee(L,k,B),Y.length>0&&Ee(Y,k,B),de.length>0&&Ee(de,k,B),Be.buffers.depth.setTest(!0),Be.buffers.depth.setMask(!0),Be.buffers.color.setMask(!0),Be.setPolygonOffset(!1)}function be(w,k,B,O){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[O.id]===void 0&&(g.state.transmissionRenderTarget[O.id]=new zr(1,1,{generateMipmaps:!0,type:et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float")?tc:or,minFilter:Lr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:mt.workingColorSpace}));const Y=g.state.transmissionRenderTarget[O.id],de=O.viewport||S;Y.setSize(de.z,de.w);const Ce=_.getRenderTarget();_.setRenderTarget(Y),_.getClearColor(z),te=_.getClearAlpha(),te<1&&_.setClearColor(16777215,.5),Oe?he.render(B):_.clear();const Le=_.toneMapping;_.toneMapping=nr;const We=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),g.setupLightsView(O),X===!0&&Se.setGlobalState(_.clippingPlanes,O),Ee(w,B,O),Ye.updateMultisampleRenderTarget(Y),Ye.updateRenderTargetMipmap(Y),et.has("WEBGL_multisampled_render_to_texture")===!1){let Xe=!1;for(let ze=0,dt=k.length;ze<dt;ze++){const Ct=k[ze],Rt=Ct.object,sn=Ct.geometry,ft=Ct.material,He=Ct.group;if(ft.side===xi&&Rt.layers.test(O.layers)){const Gt=ft.side;ft.side=_n,ft.needsUpdate=!0,Z(Rt,B,O,sn,ft,He),ft.side=Gt,ft.needsUpdate=!0,Xe=!0}}Xe===!0&&(Ye.updateMultisampleRenderTarget(Y),Ye.updateRenderTargetMipmap(Y))}_.setRenderTarget(Ce),_.setClearColor(z,te),We!==void 0&&(O.viewport=We),_.toneMapping=Le}function Ee(w,k,B){const O=k.isScene===!0?k.overrideMaterial:null;for(let L=0,Y=w.length;L<Y;L++){const de=w[L],Ce=de.object,Le=de.geometry,We=O===null?de.material:O,Xe=de.group;Ce.layers.test(B.layers)&&Z(Ce,k,B,Le,We,Xe)}}function Z(w,k,B,O,L,Y){w.onBeforeRender(_,k,B,O,L,Y),w.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),L.onBeforeRender(_,k,B,O,w,Y),L.transparent===!0&&L.side===xi&&L.forceSinglePass===!1?(L.side=_n,L.needsUpdate=!0,_.renderBufferDirect(B,k,O,L,w,Y),L.side=ar,L.needsUpdate=!0,_.renderBufferDirect(B,k,O,L,w,Y),L.side=xi):_.renderBufferDirect(B,k,O,L,w,Y),w.onAfterRender(_,k,B,O,L,Y)}function Fe(w,k,B){k.isScene!==!0&&(k=Re);const O=Je.get(w),L=g.state.lights,Y=g.state.shadowsArray,de=L.state.version,Ce=ne.getParameters(w,L.state,Y,k,B),Le=ne.getProgramCacheKey(Ce);let We=O.programs;O.environment=w.isMeshStandardMaterial?k.environment:null,O.fog=k.fog,O.envMap=(w.isMeshStandardMaterial?b:yt).get(w.envMap||O.environment),O.envMapRotation=O.environment!==null&&w.envMap===null?k.environmentRotation:w.envMapRotation,We===void 0&&(w.addEventListener("dispose",me),We=new Map,O.programs=We);let Xe=We.get(Le);if(Xe!==void 0){if(O.currentProgram===Xe&&O.lightsStateVersion===de)return Ft(w,Ce),Xe}else Ce.uniforms=ne.getUniforms(w),w.onBuild(B,Ce,_),w.onBeforeCompile(Ce,_),Xe=ne.acquireProgram(Ce,Le),We.set(Le,Xe),O.uniforms=Ce.uniforms;const ze=O.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(ze.clippingPlanes=Se.uniform),Ft(w,Ce),O.needsLights=Jn(w),O.lightsStateVersion=de,O.needsLights&&(ze.ambientLightColor.value=L.state.ambient,ze.lightProbe.value=L.state.probe,ze.directionalLights.value=L.state.directional,ze.directionalLightShadows.value=L.state.directionalShadow,ze.spotLights.value=L.state.spot,ze.spotLightShadows.value=L.state.spotShadow,ze.rectAreaLights.value=L.state.rectArea,ze.ltc_1.value=L.state.rectAreaLTC1,ze.ltc_2.value=L.state.rectAreaLTC2,ze.pointLights.value=L.state.point,ze.pointLightShadows.value=L.state.pointShadow,ze.hemisphereLights.value=L.state.hemi,ze.directionalShadowMap.value=L.state.directionalShadowMap,ze.directionalShadowMatrix.value=L.state.directionalShadowMatrix,ze.spotShadowMap.value=L.state.spotShadowMap,ze.spotLightMatrix.value=L.state.spotLightMatrix,ze.spotLightMap.value=L.state.spotLightMap,ze.pointShadowMap.value=L.state.pointShadowMap,ze.pointShadowMatrix.value=L.state.pointShadowMatrix),O.currentProgram=Xe,O.uniformsList=null,Xe}function xt(w){if(w.uniformsList===null){const k=w.currentProgram.getUniforms();w.uniformsList=il.seqWithValue(k.seq,w.uniforms)}return w.uniformsList}function Ft(w,k){const B=Je.get(w);B.outputColorSpace=k.outputColorSpace,B.batching=k.batching,B.batchingColor=k.batchingColor,B.instancing=k.instancing,B.instancingColor=k.instancingColor,B.instancingMorph=k.instancingMorph,B.skinning=k.skinning,B.morphTargets=k.morphTargets,B.morphNormals=k.morphNormals,B.morphColors=k.morphColors,B.morphTargetsCount=k.morphTargetsCount,B.numClippingPlanes=k.numClippingPlanes,B.numIntersection=k.numClipIntersection,B.vertexAlphas=k.vertexAlphas,B.vertexTangents=k.vertexTangents,B.toneMapping=k.toneMapping}function ci(w,k,B,O,L){k.isScene!==!0&&(k=Re),Ye.resetTextureUnits();const Y=k.fog,de=O.isMeshStandardMaterial?k.environment:null,Ce=A===null?_.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:fr,Le=(O.isMeshStandardMaterial?b:yt).get(O.envMap||de),We=O.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Xe=!!B.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),ze=!!B.morphAttributes.position,dt=!!B.morphAttributes.normal,Ct=!!B.morphAttributes.color;let Rt=nr;O.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Rt=_.toneMapping);const sn=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ft=sn!==void 0?sn.length:0,He=Je.get(O),Gt=g.state.lights;if(X===!0&&(se===!0||w!==E)){const Et=w===E&&O.id===R;Se.setState(O,w,Et)}let P=!1;O.version===He.__version?(He.needsLights&&He.lightsStateVersion!==Gt.state.version||He.outputColorSpace!==Ce||L.isBatchedMesh&&He.batching===!1||!L.isBatchedMesh&&He.batching===!0||L.isBatchedMesh&&He.batchingColor===!0&&L.colorTexture===null||L.isBatchedMesh&&He.batchingColor===!1&&L.colorTexture!==null||L.isInstancedMesh&&He.instancing===!1||!L.isInstancedMesh&&He.instancing===!0||L.isSkinnedMesh&&He.skinning===!1||!L.isSkinnedMesh&&He.skinning===!0||L.isInstancedMesh&&He.instancingColor===!0&&L.instanceColor===null||L.isInstancedMesh&&He.instancingColor===!1&&L.instanceColor!==null||L.isInstancedMesh&&He.instancingMorph===!0&&L.morphTexture===null||L.isInstancedMesh&&He.instancingMorph===!1&&L.morphTexture!==null||He.envMap!==Le||O.fog===!0&&He.fog!==Y||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==Se.numPlanes||He.numIntersection!==Se.numIntersection)||He.vertexAlphas!==We||He.vertexTangents!==Xe||He.morphTargets!==ze||He.morphNormals!==dt||He.morphColors!==Ct||He.toneMapping!==Rt||He.morphTargetsCount!==ft)&&(P=!0):(P=!0,He.__version=O.version);let W=He.currentProgram;P===!0&&(W=Fe(O,k,L));let pe=!1,Te=!1,tt=!1;const re=W.getUniforms(),De=He.uniforms;if(Be.useProgram(W.program)&&(pe=!0,Te=!0,tt=!0),O.id!==R&&(R=O.id,Te=!0),pe||E!==w){re.setValue(I,"projectionMatrix",w.projectionMatrix),re.setValue(I,"viewMatrix",w.matrixWorldInverse);const Et=re.map.cameraPosition;Et!==void 0&&Et.setValue(I,ge.setFromMatrixPosition(w.matrixWorld)),ht.logarithmicDepthBuffer&&re.setValue(I,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&re.setValue(I,"isOrthographic",w.isOrthographicCamera===!0),E!==w&&(E=w,Te=!0,tt=!0)}if(L.isSkinnedMesh){re.setOptional(I,L,"bindMatrix"),re.setOptional(I,L,"bindMatrixInverse");const Et=L.skeleton;Et&&(Et.boneTexture===null&&Et.computeBoneTexture(),re.setValue(I,"boneTexture",Et.boneTexture,Ye))}L.isBatchedMesh&&(re.setOptional(I,L,"batchingTexture"),re.setValue(I,"batchingTexture",L._matricesTexture,Ye),re.setOptional(I,L,"batchingColorTexture"),L._colorsTexture!==null&&re.setValue(I,"batchingColorTexture",L._colorsTexture,Ye));const Nt=B.morphAttributes;if((Nt.position!==void 0||Nt.normal!==void 0||Nt.color!==void 0)&&Ne.update(L,B,W),(Te||He.receiveShadow!==L.receiveShadow)&&(He.receiveShadow=L.receiveShadow,re.setValue(I,"receiveShadow",L.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(De.envMap.value=Le,De.flipEnvMap.value=Le.isCubeTexture&&Le.isRenderTargetTexture===!1?-1:1),O.isMeshStandardMaterial&&O.envMap===null&&k.environment!==null&&(De.envMapIntensity.value=k.environmentIntensity),Te&&(re.setValue(I,"toneMappingExposure",_.toneMappingExposure),He.needsLights&&Hn(De,tt),Y&&O.fog===!0&&oe.refreshFogUniforms(De,Y),oe.refreshMaterialUniforms(De,O,J,$,g.state.transmissionRenderTarget[w.id]),il.upload(I,xt(He),De,Ye)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(il.upload(I,xt(He),De,Ye),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&re.setValue(I,"center",L.center),re.setValue(I,"modelViewMatrix",L.modelViewMatrix),re.setValue(I,"normalMatrix",L.normalMatrix),re.setValue(I,"modelMatrix",L.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const Et=O.uniformsGroups;for(let bn=0,ui=Et.length;bn<ui;bn++){const hr=Et[bn];$e.update(hr,W),$e.bind(hr,W)}}return W}function Hn(w,k){w.ambientLightColor.needsUpdate=k,w.lightProbe.needsUpdate=k,w.directionalLights.needsUpdate=k,w.directionalLightShadows.needsUpdate=k,w.pointLights.needsUpdate=k,w.pointLightShadows.needsUpdate=k,w.spotLights.needsUpdate=k,w.spotLightShadows.needsUpdate=k,w.rectAreaLights.needsUpdate=k,w.hemisphereLights.needsUpdate=k}function Jn(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(w,k,B){Je.get(w.texture).__webglTexture=k,Je.get(w.depthTexture).__webglTexture=B;const O=Je.get(w);O.__hasExternalTextures=!0,O.__autoAllocateDepthBuffer=B===void 0,O.__autoAllocateDepthBuffer||et.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),O.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,k){const B=Je.get(w);B.__webglFramebuffer=k,B.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(w,k=0,B=0){A=w,D=k,C=B;let O=!0,L=null,Y=!1,de=!1;if(w){const Le=Je.get(w);Le.__useDefaultFramebuffer!==void 0?(Be.bindFramebuffer(I.FRAMEBUFFER,null),O=!1):Le.__webglFramebuffer===void 0?Ye.setupRenderTarget(w):Le.__hasExternalTextures&&Ye.rebindTextures(w,Je.get(w.texture).__webglTexture,Je.get(w.depthTexture).__webglTexture);const We=w.texture;(We.isData3DTexture||We.isDataArrayTexture||We.isCompressedArrayTexture)&&(de=!0);const Xe=Je.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Xe[k])?L=Xe[k][B]:L=Xe[k],Y=!0):w.samples>0&&Ye.useMultisampledRTT(w)===!1?L=Je.get(w).__webglMultisampledFramebuffer:Array.isArray(Xe)?L=Xe[B]:L=Xe,S.copy(w.viewport),N.copy(w.scissor),G=w.scissorTest}else S.copy(ie).multiplyScalar(J).floor(),N.copy(ue).multiplyScalar(J).floor(),G=Ie;if(Be.bindFramebuffer(I.FRAMEBUFFER,L)&&O&&Be.drawBuffers(w,L),Be.viewport(S),Be.scissor(N),Be.setScissorTest(G),Y){const Le=Je.get(w.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+k,Le.__webglTexture,B)}else if(de){const Le=Je.get(w.texture),We=k||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,Le.__webglTexture,B||0,We)}R=-1},this.readRenderTargetPixels=function(w,k,B,O,L,Y,de){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=Je.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&de!==void 0&&(Ce=Ce[de]),Ce){Be.bindFramebuffer(I.FRAMEBUFFER,Ce);try{const Le=w.texture,We=Le.format,Xe=Le.type;if(!ht.textureFormatReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ht.textureTypeReadable(Xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=w.width-O&&B>=0&&B<=w.height-L&&I.readPixels(k,B,O,L,we.convert(We),we.convert(Xe),Y)}finally{const Le=A!==null?Je.get(A).__webglFramebuffer:null;Be.bindFramebuffer(I.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(w,k,B,O,L,Y,de){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=Je.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&de!==void 0&&(Ce=Ce[de]),Ce){Be.bindFramebuffer(I.FRAMEBUFFER,Ce);try{const Le=w.texture,We=Le.format,Xe=Le.type;if(!ht.textureFormatReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ht.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=w.width-O&&B>=0&&B<=w.height-L){const ze=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,ze),I.bufferData(I.PIXEL_PACK_BUFFER,Y.byteLength,I.STREAM_READ),I.readPixels(k,B,O,L,we.convert(We),we.convert(Xe),0),I.flush();const dt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);await Wy(I,dt,4);try{I.bindBuffer(I.PIXEL_PACK_BUFFER,ze),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,Y)}finally{I.deleteBuffer(ze),I.deleteSync(dt)}return Y}}finally{const Le=A!==null?Je.get(A).__webglFramebuffer:null;Be.bindFramebuffer(I.FRAMEBUFFER,Le)}}},this.copyFramebufferToTexture=function(w,k=null,B=0){w.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,w=arguments[1]);const O=Math.pow(2,-B),L=Math.floor(w.image.width*O),Y=Math.floor(w.image.height*O),de=k!==null?k.x:0,Ce=k!==null?k.y:0;Ye.setTexture2D(w,0),I.copyTexSubImage2D(I.TEXTURE_2D,B,0,0,de,Ce,L,Y),Be.unbindTexture()},this.copyTextureToTexture=function(w,k,B=null,O=null,L=0){w.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),O=arguments[0]||null,w=arguments[1],k=arguments[2],L=arguments[3]||0,B=null);let Y,de,Ce,Le,We,Xe;B!==null?(Y=B.max.x-B.min.x,de=B.max.y-B.min.y,Ce=B.min.x,Le=B.min.y):(Y=w.image.width,de=w.image.height,Ce=0,Le=0),O!==null?(We=O.x,Xe=O.y):(We=0,Xe=0);const ze=we.convert(k.format),dt=we.convert(k.type);Ye.setTexture2D(k,0),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,k.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,k.unpackAlignment);const Ct=I.getParameter(I.UNPACK_ROW_LENGTH),Rt=I.getParameter(I.UNPACK_IMAGE_HEIGHT),sn=I.getParameter(I.UNPACK_SKIP_PIXELS),ft=I.getParameter(I.UNPACK_SKIP_ROWS),He=I.getParameter(I.UNPACK_SKIP_IMAGES),Gt=w.isCompressedTexture?w.mipmaps[L]:w.image;I.pixelStorei(I.UNPACK_ROW_LENGTH,Gt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Gt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ce),I.pixelStorei(I.UNPACK_SKIP_ROWS,Le),w.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,L,We,Xe,Y,de,ze,dt,Gt.data):w.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,L,We,Xe,Gt.width,Gt.height,ze,Gt.data):I.texSubImage2D(I.TEXTURE_2D,L,We,Xe,ze,dt,Gt),I.pixelStorei(I.UNPACK_ROW_LENGTH,Ct),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Rt),I.pixelStorei(I.UNPACK_SKIP_PIXELS,sn),I.pixelStorei(I.UNPACK_SKIP_ROWS,ft),I.pixelStorei(I.UNPACK_SKIP_IMAGES,He),L===0&&k.generateMipmaps&&I.generateMipmap(I.TEXTURE_2D),Be.unbindTexture()},this.copyTextureToTexture3D=function(w,k,B=null,O=null,L=0){w.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,O=arguments[1]||null,w=arguments[2],k=arguments[3],L=arguments[4]||0);let Y,de,Ce,Le,We,Xe,ze,dt,Ct;const Rt=w.isCompressedTexture?w.mipmaps[L]:w.image;B!==null?(Y=B.max.x-B.min.x,de=B.max.y-B.min.y,Ce=B.max.z-B.min.z,Le=B.min.x,We=B.min.y,Xe=B.min.z):(Y=Rt.width,de=Rt.height,Ce=Rt.depth,Le=0,We=0,Xe=0),O!==null?(ze=O.x,dt=O.y,Ct=O.z):(ze=0,dt=0,Ct=0);const sn=we.convert(k.format),ft=we.convert(k.type);let He;if(k.isData3DTexture)Ye.setTexture3D(k,0),He=I.TEXTURE_3D;else if(k.isDataArrayTexture||k.isCompressedArrayTexture)Ye.setTexture2DArray(k,0),He=I.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,k.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,k.unpackAlignment);const Gt=I.getParameter(I.UNPACK_ROW_LENGTH),P=I.getParameter(I.UNPACK_IMAGE_HEIGHT),W=I.getParameter(I.UNPACK_SKIP_PIXELS),pe=I.getParameter(I.UNPACK_SKIP_ROWS),Te=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,Rt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Rt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Le),I.pixelStorei(I.UNPACK_SKIP_ROWS,We),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Xe),w.isDataTexture||w.isData3DTexture?I.texSubImage3D(He,L,ze,dt,Ct,Y,de,Ce,sn,ft,Rt.data):k.isCompressedArrayTexture?I.compressedTexSubImage3D(He,L,ze,dt,Ct,Y,de,Ce,sn,Rt.data):I.texSubImage3D(He,L,ze,dt,Ct,Y,de,Ce,sn,ft,Rt),I.pixelStorei(I.UNPACK_ROW_LENGTH,Gt),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,P),I.pixelStorei(I.UNPACK_SKIP_PIXELS,W),I.pixelStorei(I.UNPACK_SKIP_ROWS,pe),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Te),L===0&&k.generateMipmaps&&I.generateMipmap(He),Be.unbindTexture()},this.initRenderTarget=function(w){Je.get(w).__webglFramebuffer===void 0&&Ye.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?Ye.setTextureCube(w,0):w.isData3DTexture?Ye.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?Ye.setTexture2DArray(w,0):Ye.setTexture2D(w,0),Be.unbindTexture()},this.resetState=function(){D=0,C=0,A=null,Be.reset(),Ke.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===vf?"display-p3":"srgb",n.unpackColorSpace=mt.workingColorSpace===nc?"display-p3":"srgb"}}class ew extends yn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bi,this.environmentIntensity=1,this.environmentRotation=new bi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class t_ extends Za{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new gt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Il=new j,Fl=new j,$p=new Bt,ca=new kv,jo=new ic,hu=new j,Kp=new j;class tw extends yn{constructor(e=new Pi,n=new t_){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)Il.fromBufferAttribute(n,r-1),Fl.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=Il.distanceTo(Fl);e.setAttribute("lineDistance",new ir(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),jo.copy(i.boundingSphere),jo.applyMatrix4(r),jo.radius+=s,e.ray.intersectsSphere(jo)===!1)return;$p.copy(r).invert(),ca.copy(e.ray).applyMatrix4($p);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,u=this.isLineSegments?2:1,f=i.index,h=i.attributes.position;if(f!==null){const m=Math.max(0,a.start),x=Math.min(f.count,a.start+a.count);for(let y=m,g=x-1;y<g;y+=u){const d=f.getX(y),v=f.getX(y+1),_=Vo(this,e,ca,c,d,v);_&&n.push(_)}if(this.isLineLoop){const y=f.getX(x-1),g=f.getX(m),d=Vo(this,e,ca,c,y,g);d&&n.push(d)}}else{const m=Math.max(0,a.start),x=Math.min(h.count,a.start+a.count);for(let y=m,g=x-1;y<g;y+=u){const d=Vo(this,e,ca,c,y,y+1);d&&n.push(d)}if(this.isLineLoop){const y=Vo(this,e,ca,c,x-1,m);y&&n.push(y)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Vo(t,e,n,i,r,s){const a=t.geometry.attributes.position;if(Il.fromBufferAttribute(a,r),Fl.fromBufferAttribute(a,s),n.distanceSqToSegment(Il,Fl,hu,Kp)>i)return;hu.applyMatrix4(t.matrixWorld);const c=e.ray.origin.distanceTo(hu);if(!(c<e.near||c>e.far))return{distance:c,point:Kp.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,object:t}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:gf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=gf);function nw(){const t=[],e=(V,le,ce,xe)=>{V.addEventListener(le,ce,xe),t.push(()=>V.removeEventListener(le,ce,xe))},n=matchMedia("(prefers-reduced-motion: reduce)").matches;function i(V){return function(){V|=0,V=V+1831565813|0;let le=Math.imul(V^V>>>15,1|V);return le=le+Math.imul(le^le>>>7,61|le)^le,((le^le>>>14)>>>0)/4294967296}}const r=[["#7FD8E8","#1E5F7E"],["#E8C07F","#8A5A0B"],["#D98FA8","#5E2338"],["#9FB6E8","#2A3E7A"]];function s(V,le,ce){const xe=i(le*7919+31),ke=Math.min(devicePixelRatio,2),be=V.clientWidth||300,Ee=V.clientHeight||400;V.width=be*ke,V.height=Ee*ke;const Z=V.getContext("2d");Z.setTransform(ke,0,0,ke,0,0);const Fe=typeof Z.filter=="string",xt=Z.createLinearGradient(0,0,0,Ee);xt.addColorStop(0,"#060A0D"),xt.addColorStop(.5,"#0A1116"),xt.addColorStop(1,"#03060A"),Z.fillStyle=xt,Z.fillRect(0,0,be,Ee);const Ft=r[Math.floor(xe()*r.length)];Z.globalCompositeOperation="lighter",Fe&&(Z.filter="blur("+be*.012+"px)");const ci=ce==="close"?2:3+Math.floor(xe()*3);for(let B=0;B<ci;B++){const O=be*(.08+xe()*.84),L=be*(.05+xe()*.2),Y=(xe()-.5)*be*.95,de=Z.createLinearGradient(O,0,O+Y,Ee*.9),Ce=B%2?Ft[0]:Ft[1];de.addColorStop(0,Ce),de.addColorStop(.3,Ce),de.addColorStop(1,"rgba(0,0,0,0)"),Z.globalAlpha=.1+xe()*.14,Z.fillStyle=de,Z.beginPath(),Z.moveTo(O-3,-Ee*.05),Z.lineTo(O+3,-Ee*.05),Z.lineTo(O+Y+L,Ee*.95),Z.lineTo(O+Y-L,Ee*.95),Z.closePath(),Z.fill()}Fe&&(Z.filter="none");const Hn=Z.createRadialGradient(be*.5,Ee*.3,0,be*.5,Ee*.3,Ee*.8);Hn.addColorStop(0,Ft[0]),Hn.addColorStop(1,"rgba(0,0,0,0)"),Z.globalAlpha=.07,Z.fillStyle=Hn,Z.fillRect(0,0,be,Ee);const Jn=ce==="close"?42:26;for(let B=0;B<Jn;B++){const O=(ce==="close"?5:3)+xe()*(ce==="close"?24:14);Fe&&(Z.filter="blur("+O*.28+"px)");const L=xe()*be,Y=xe()*Ee*.78,de=Z.createRadialGradient(L,Y,0,L,Y,O),Ce=xe()>.55?Ft[0]:"#FFF0D2";de.addColorStop(0,Ce),de.addColorStop(.6,Ce),de.addColorStop(1,"rgba(0,0,0,0)"),Z.globalAlpha=.04+xe()*.16,Z.fillStyle=de,Z.beginPath(),Z.arc(L,Y,O,0,Math.PI*2),Z.fill()}Fe&&(Z.filter="none"),Z.globalCompositeOperation="source-over",Z.globalAlpha=1;function w(B,O,L,Y){Z.fillStyle="rgba(2,4,6,"+Y+")",Z.beginPath(),Z.arc(B,O,L,0,Math.PI*2),Z.fill(),Z.beginPath(),Z.moveTo(B-L*2.1,O+L*3.6),Z.quadraticCurveTo(B-L*1.85,O+L*1.02,B,O+L*.92),Z.quadraticCurveTo(B+L*1.85,O+L*1.02,B+L*2.1,O+L*3.6),Z.closePath(),Z.fill()}if(ce!=="close"){const B=ce==="crowd"?3:2;for(let O=0;O<B;O++){const L=O/(B-1||1);Fe&&(Z.filter="blur("+(1-L)*be*.012+"px)");const Y=Ee*(ce==="crowd"?.7+L*.28:.84+L*.17),de=be*(ce==="crowd"?.026+L*.05:.017+L*.024),Ce=.4+L*.55;let Le=-de*2;for(;Le<be+de*2;)w(Le,Y-de*(1.4+xe()*.5),de*(.85+xe()*.35),Ce),Le+=de*(2.9+xe()*1.8)}if(Fe&&(Z.filter="none"),ce==="stage"){const O=be*(.36+xe()*.28),L=be*.07,Y=Ee*.56;Z.fillStyle="rgba(1,3,5,.97)",Z.beginPath(),Z.arc(O,Y,L,0,Math.PI*2),Z.fill(),Z.beginPath(),Z.moveTo(O-L*2.4,Y+L*4.8),Z.quadraticCurveTo(O-L*2.05,Y+L*1.05,O,Y+L*.95),Z.quadraticCurveTo(O+L*2.05,Y+L*1.05,O+L*2.4,Y+L*4.8),Z.closePath(),Z.fill(),Z.lineWidth=L*.6,Z.lineCap="round",Z.strokeStyle="rgba(1,3,5,.97)",Z.beginPath(),Z.moveTo(O-L*1.5,Y+L*1.7),Z.lineTo(O-L*2.7,Y-L*1.8),Z.stroke(),Z.beginPath(),Z.moveTo(O+L*1.5,Y+L*1.7),Z.lineTo(O+L*2.8,Y-L*1.1),Z.stroke()}}else{Z.globalCompositeOperation="lighter";for(let B=0;B<3;B++){const O=Ee*(.22+xe()*.55),L=Z.createLinearGradient(0,O,be,O+(xe()-.5)*Ee*.18);L.addColorStop(0,"rgba(0,0,0,0)"),L.addColorStop(.5,Ft[0]),L.addColorStop(1,"rgba(0,0,0,0)"),Z.globalAlpha=.13,Z.fillStyle=L,Z.fillRect(0,O-1,be,2)}Z.globalCompositeOperation="source-over",Z.globalAlpha=1}const k=Z.createRadialGradient(be/2,Ee*.44,Math.min(be,Ee)*.2,be/2,Ee*.5,Math.max(be,Ee)*.82);k.addColorStop(0,"rgba(0,0,0,0)"),k.addColorStop(1,"rgba(0,0,0,.82)"),Z.fillStyle=k,Z.fillRect(0,0,be,Ee);try{const B=Z.getImageData(0,0,V.width,V.height),O=B.data;for(let L=0;L<O.length;L+=4){const Y=(xe()-.5)*24;O[L]+=Y,O[L+1]+=Y,O[L+2]+=Y}Z.putImageData(B,0,0)}catch{}}function a(){document.querySelectorAll("canvas[data-shot]").forEach(V=>s(V,+V.dataset.seed,V.dataset.shot))}const o=document.getElementById("wm"),c=document.getElementById("fitbox"),u=document.getElementById("slash"),f=o.querySelectorAll("em>i");function p(){o.style.transform="scale(1)";const V=o.offsetWidth,le=o.offsetHeight;if(!V)return;const ce=innerWidth>1240?.76:.9,xe=Math.min(innerWidth*ce/V,1.4);o.style.transform="scale("+xe+")",c.style.height=le*xe+"px"}document.fonts&&document.fonts.ready&&document.fonts.ready.then(p),e(window,"load",()=>{p(),a()});const h=setTimeout(()=>{p(),a()},260);t.push(()=>clearTimeout(h));let m;e(window,"resize",()=>{clearTimeout(m),m=setTimeout(()=>{p(),a()},250)}),t.push(()=>clearTimeout(m)),p(),a();const x=document.getElementById("hero");e(x,"mousemove",V=>{n||f.forEach(le=>{const ce=le.getBoundingClientRect(),xe=ce.left+ce.width/2,ke=ce.top+ce.height/2,be=(V.clientX-xe)/innerWidth,Ee=(V.clientY-ke)/innerHeight;le.style.transform="translate("+be*-16+"px,"+Ee*-10+"px)"})}),e(x,"mouseleave",()=>f.forEach(V=>{V.style.transform=""}));const y=document.getElementById("pct"),g=document.getElementById("pbar"),d=document.getElementById("pre");let v=0;o.querySelectorAll("em").forEach((V,le)=>{V.style.transitionDelay=le*.07+"s"});const _=setInterval(()=>{v+=Math.random()*12,v>=100&&(v=100,clearInterval(_),setTimeout(()=>{d.classList.add("done"),o.classList.add("on"),p(),a()},350)),y.textContent=Math.round(v),g.style.width=v+"%"},105);t.push(()=>clearInterval(_));const T=document.getElementById("cd"),D=document.getElementById("cr");let C=0,A=0,R=0,E=0;e(window,"mousemove",V=>{C=V.clientX,A=V.clientY,T.style.left=C+"px",T.style.top=A+"px"});let S;(function V(){R+=(C-R)*.14,E+=(A-E)*.14,D.style.left=R+"px",D.style.top=E+"px",S=requestAnimationFrame(V)})(),t.push(()=>cancelAnimationFrame(S)),e(document,"mouseover",V=>{V.target.closest("a,button,input,.crow,.slide")?D.classList.add("on"):D.classList.remove("on")}),document.querySelectorAll(".mag").forEach(V=>{e(V,"mousemove",le=>{const ce=V.getBoundingClientRect();V.style.transform="translate("+(le.clientX-ce.left-ce.width/2)*.22+"px,"+(le.clientY-ce.top-ce.height/2)*.32+"px)"}),e(V,"mouseleave",()=>{V.style.transform=""})});const N=new IntersectionObserver(V=>{V.forEach((le,ce)=>{le.isIntersecting&&(setTimeout(()=>le.target.classList.add("in"),ce*90),N.unobserve(le.target))})},{threshold:.12});document.querySelectorAll(".rv,.head").forEach(V=>N.observe(V)),t.push(()=>N.disconnect()),document.querySelectorAll("[data-go]").forEach(V=>{e(V,"click",()=>document.querySelector(V.dataset.go).scrollIntoView())});const G=document.getElementById("gal"),z=document.getElementById("track"),te=document.querySelectorAll("[data-sp]"),Q=document.getElementById("galbar"),$=document.getElementById("galno");let J=0,F=!1;function ee(){J=scrollY,F||(requestAnimationFrame(ie),F=!0)}function ie(){if(F=!1,n||te.forEach(V=>{V.style.transform="translateY("+J*+V.dataset.sp+"px)"}),!n&&G){const V=G.getBoundingClientRect(),le=G.offsetHeight-innerHeight,ce=Math.min(1,Math.max(0,-V.top/le)),xe=z.scrollWidth-innerWidth+64;z.style.transform="translateX("+-ce*Math.max(0,xe)+"px)",Q.style.width=ce*100+"%",$.textContent="0"+Math.min(6,Math.floor(ce*6)+1)}}e(window,"scroll",ee,{passive:!0}),e(window,"resize",ie),ie();const ue={bass:[230,80,230],mid:[70,50,70,50,70],high:[24,24,24,24,24,24,24,24,24]};document.querySelectorAll(".hap").forEach(V=>{V.innerHTML="";const le=ue[V.dataset.band],ce=le.reduce((xe,ke)=>xe+ke,0);le.forEach((xe,ke)=>{const be=document.createElement(ke%2?"u":"i");be.style.flex=xe/ce+" 0 0",V.appendChild(be)})});const Ie=[];document.querySelectorAll(".scope").forEach(V=>Ie.push({cv:V,band:V.dataset.band,boost:0}));function at(V,le){const ce=V.cv,xe=Math.min(devicePixelRatio,2),ke=ce.clientWidth,be=ce.clientHeight;if(!ke)return;ce.width!==ke*xe&&(ce.width=ke*xe,ce.height=be*xe);const Ee=ce.getContext("2d");Ee.setTransform(xe,0,0,xe,0,0),Ee.clearRect(0,0,ke,be),Ee.strokeStyle="rgba(242,245,244,.06)",Ee.lineWidth=1,Ee.beginPath(),Ee.moveTo(0,be/2),Ee.lineTo(ke,be/2),Ee.stroke();const Z=Math.min(1,V.boost),Fe=be*.32*(.5+V.boost*.7);Ee.beginPath(),Ee.lineWidth=1.1,Ee.strokeStyle="rgba("+Math.round(242-186*Z)+","+Math.round(245-13*Z)+","+Math.round(244-38*Z)+","+(.42+.5*Z)+")";for(let xt=0;xt<=ke;xt++){let Ft;V.band==="bass"?Ft=be/2+Math.sin(xt*.035+le*2.1)*Fe:V.band==="mid"?Ft=be/2+(Math.sin(xt*.12+le*3)*.65+Math.sin(xt*.31-le*2)*.35)*Fe:Ft=be/2+Math.sin(xt*.55+le*6)*Fe*(.55+.45*Math.abs(Math.sin(xt*.05+le))),xt===0?Ee.moveTo(xt,Ft):Ee.lineTo(xt,Ft)}Ee.stroke(),V.boost*=.94}function X(V){if(!u)return;const le=Math.min(devicePixelRatio,2),ce=u.clientWidth,xe=u.clientHeight;if(!ce)return;u.width!==ce*le&&(u.width=ce*le,u.height=xe*le);const ke=u.getContext("2d");ke.setTransform(le,0,0,le,0,0),ke.clearRect(0,0,ce,xe);for(let be=0;be<3;be++){ke.beginPath(),ke.lineWidth=be===0?1.4:.8,ke.strokeStyle="rgba(56,232,206,"+(be===0?.45:.15)+")";for(let Ee=0;Ee<=ce;Ee+=2){const Z=Math.sin(Math.PI*Ee/ce),Fe=xe/2+Math.sin(Ee*.012+V*1.4+be*1.2)*xe*.3*Z+Math.sin(Ee*.05-V*2.2)*xe*.1*Z;Ee===0?ke.moveTo(Ee,Fe):ke.lineTo(Ee,Fe)}ke.stroke()}}const se=document.getElementById("mon"),ve=document.getElementById("monwave");function ge(V){if(!ve)return;const le=Math.min(devicePixelRatio,2),ce=ve.clientWidth,xe=ve.clientHeight;if(!ce)return;ve.width!==ce*le&&(ve.width=ce*le,ve.height=xe*le);const ke=ve.getContext("2d");ke.setTransform(le,0,0,le,0,0),ke.clearRect(0,0,ce,xe);const be=34,Ee=ce/be;for(let Z=0;Z<be;Z++){let Fe;Oe&&I?Fe=qe[Math.floor(Z/be*qe.length*.6)]/255:Fe=.06+Math.abs(Math.sin(V*1.6+Z*.42))*.14;const xt=Math.max(2,Fe*xe);ke.fillStyle=I?"rgba(56,232,206,"+(.35+Fe*.65)+")":"rgba(242,245,244,.26)",ke.fillRect(Z*Ee+1,(xe-xt)/2,Ee-2,xt)}}let Re,Oe,qe,I=!1,Qe,et,ht=0;function Be(){Re=new(window.AudioContext||window.webkitAudioContext),Oe=Re.createAnalyser(),Oe.fftSize=512,Oe.smoothingTimeConstant=.8,qe=new Uint8Array(Oe.frequencyBinCount),Qe=Re.createGain(),Qe.gain.value=.42,Qe.connect(Oe),Oe.connect(Re.destination)}function nt(V,le,ce,xe){const ke=Re.createOscillator(),be=Re.createGain();ke.type=ce||"sine",ke.frequency.value=V,be.gain.setValueAtTime(0,Re.currentTime),be.gain.linearRampToValueAtTime(xe||.5,Re.currentTime+.012),be.gain.exponentialRampToValueAtTime(1e-4,Re.currentTime+le),ke.connect(be),be.connect(Qe),ke.start(),ke.stop(Re.currentTime+le+.05)}function Je(V,le){const ce=Math.floor(Re.sampleRate*V),xe=Re.createBuffer(1,ce,Re.sampleRate),ke=xe.getChannelData(0);for(let Fe=0;Fe<ce;Fe++)ke[Fe]=(Math.random()*2-1)*(1-Fe/ce);const be=Re.createBufferSource();be.buffer=xe;const Ee=Re.createBiquadFilter();Ee.type="highpass",Ee.frequency.value=6500;const Z=Re.createGain();Z.gain.value=le,be.connect(Ee),Ee.connect(Z),Z.connect(Qe),be.start()}function Ye(V){if(navigator.vibrate&&!n)try{navigator.vibrate(V)}catch{}}const yt=[0,3,7,10,7,3,5,10];function b(){const V=ht%8;(V===0||V===4)&&(nt(50,.45,"sine",.95),Ye([95])),(V===2||V===6)&&nt(170,.15,"triangle",.3),V%2===1&&Je(.055,.15),nt(220*Math.pow(2,yt[ht%yt.length]/12),.3,"sawtooth",.09),ht++}const M=document.getElementById("disc");function H(){Re||Be(),Re.state==="suspended"&&Re.resume(),I?(clearInterval(et),I=!1,M.classList.remove("spin"),se&&se.classList.remove("live")):(b(),et=setInterval(b,300),I=!0,M.classList.add("spin"),se&&se.classList.add("live"))}e(M,"click",H),se&&e(se,"click",H),t.push(()=>{clearInterval(et),Re&&Re.close()});const ae={bass:[56,.5,"sine"],mid:[300,.28,"triangle"],high:[1500,.16,"square"]};document.querySelectorAll(".crow").forEach(V=>{e(V,"click",()=>{const le=V.dataset.band;Ye(ue[le]),V.classList.remove("hit"),V.offsetWidth,V.classList.add("hit"),Ie.forEach(xe=>{xe.band===le&&(xe.boost=1.15)}),Re||Be(),Re.state==="suspended"&&Re.resume();const ce=ae[le];nt(ce[0],ce[1],ce[2],.5)}),e(V,"mouseenter",()=>Ie.forEach(le=>{le.band===V.dataset.band&&(le.boost=.5)}))});const ne=document.getElementById("bars"),oe=[];ne.innerHTML="";for(let V=0;V<72;V++){const le=document.createElement("i");ne.appendChild(le),oe.push(le)}const Ue=document.getElementById("stage"),_e=new JT({canvas:Ue,antialias:!0,alpha:!0});_e.setPixelRatio(Math.min(devicePixelRatio,1.75));const Se=new ew,je=new Un(46,1,.1,200);je.position.set(0,5.4,17),je.lookAt(0,1.2,-10);const he=58,Ne=170,Ze=62,Ve=6,we=-62,Ke=[];for(let V=0;V<he;V++){const le=V/(he-1),ce=Ve+(we-Ve)*le,xe=new Float32Array(Ne*3),ke=new Float32Array(Ne*3);for(let Fe=0;Fe<Ne;Fe++)xe[Fe*3]=-Ze/2+Ze*(Fe/(Ne-1)),xe[Fe*3+1]=0,xe[Fe*3+2]=ce;const be=new Pi;be.setAttribute("position",new kn(xe,3)),be.setAttribute("color",new kn(ke,3));const Ee=new t_({vertexColors:!0,transparent:!0,opacity:.95,blending:cd,depthWrite:!1}),Z=new tw(be,Ee);Se.add(Z),Ke.push({g:be,m:Ee,z:ce,zt:le})}t.push(()=>{Ke.forEach(V=>{V.g.dispose(),V.m.dispose()}),_e.dispose()});const $e={r:.22,g:.91,b:.81},it={r:.85,g:.65,b:.3};let U=.08,Me=.06,q=.05,K=0,me=0,Ge=0;e(window,"mousemove",V=>{me=V.clientX/innerWidth-.5,Ge=V.clientY/innerHeight-.5});function lt(){const V=Ue.clientWidth,le=Ue.clientHeight;(Ue.width!==V||Ue.height!==le)&&(_e.setSize(V,le,!1),je.aspect=V/le,je.updateProjectionMatrix())}function _t(){for(let V=0;V<Ke.length;V++){const le=Ke[V],ce=le.g.attributes.position.array,xe=le.g.attributes.color.array,ke=le.z,be=Math.pow(1-le.zt,.9);for(let Ee=0;Ee<Ne;Ee++){const Z=ce[Ee*3],Fe=Math.sqrt(Z*Z+ke*ke),xt=Math.sin(Fe*.3-K*2)*(1+U*5.2)/(1+Fe*.055)+Math.sin(Z*.16+K*.9)*Math.cos(ke*.13-K*.6)*(.35+Me*2.2)+Math.sin(Z*.62+K*3.4)*(q*.55);ce[Ee*3+1]=xt;let Ft=1-Math.pow(Math.abs(Z)/(Ze/2),2.2);Ft<0&&(Ft=0);const ci=Math.min(1,Math.abs(xt)*.5+.1),Hn=Math.min(1,U*1.4),Jn=(.16+ci*.9)*Ft*be;xe[Ee*3]=($e.r+(it.r-$e.r)*Hn)*Jn,xe[Ee*3+1]=($e.g+(it.g-$e.g)*Hn)*Jn,xe[Ee*3+2]=($e.b+(it.b-$e.b)*Hn)*Jn}le.g.attributes.position.needsUpdate=!0,le.g.attributes.color.needsUpdate=!0}}let Mt;function ct(V){Mt=requestAnimationFrame(ct);const le=(V||0)/1e3;if(Ie.forEach(ce=>at(ce,le)),K+=n?.0022:.0105,Oe&&I){Oe.getByteFrequencyData(qe);const ce=qe.length,xe=Math.floor(ce*.06),ke=Math.floor(ce*.34);let be=0,Ee=0,Z=0,Fe;for(Fe=0;Fe<xe;Fe++)be+=qe[Fe];for(Fe=xe;Fe<ke;Fe++)Ee+=qe[Fe];for(Fe=ke;Fe<ce;Fe++)Z+=qe[Fe];for(U=U*.6+be/xe/255*.4,Me=Me*.6+Ee/(ke-xe)/255*.4,q=q*.6+Z/(ce-ke)/255*.4,Fe=0;Fe<72;Fe++)oe[Fe].style.height=2+qe[Math.floor(Fe/72*ce*.72)]/255*98+"%"}else{U=U*.95+.08*.05,Me=Me*.95+.06*.05,q=q*.95+.05*.05;for(let ce=0;ce<72;ce++)oe[ce].style.height=2+Math.abs(Math.sin(K*2.2+ce*.28))*9+"%"}scrollY>innerHeight*1.2||(X(le),ge(le),lt(),_t(),je.position.x+=(me*3.4-je.position.x)*.035,je.position.y+=(5.4-Ge*1.8-je.position.y)*.035,je.lookAt(0,1.2,-10),_e.render(Se,je))}return Mt=requestAnimationFrame(ct),t.push(()=>cancelAnimationFrame(Mt)),()=>t.forEach(V=>V())}const n_="medreh_users",_d="medreh_user";function Ys(){try{return JSON.parse(localStorage.getItem(n_))||[]}catch{return[]}}function Ja(t){localStorage.setItem(n_,JSON.stringify(t))}function iw(){const t=Ys();t.some(e=>e.role==="admin")||(t.unshift({name:"Админ",email:"admin@medreh.mn",pass:xd("admin123"),role:"admin"}),Ja(t))}function xd(t){return btoa(unescape(encodeURIComponent(t+"·medreh")))}function rw(){try{return JSON.parse(localStorage.getItem(_d))}catch{return null}}function Go(t){t?localStorage.setItem(_d,JSON.stringify(t)):localStorage.removeItem(_d)}function Zp({name:t,autoComplete:e}){const[n,i]=ye.useState(!1);return l.jsxs("span",{className:"pass-wrap",children:[l.jsx("input",{name:t,type:n?"text":"password",placeholder:"••••••••",autoComplete:e}),l.jsx("button",{type:"button",className:"pass-eye",onClick:()=>i(!n),"aria-label":n?"Нууц үг нуух":"Нууц үг харах",title:n?"Нуух":"Харах",children:n?l.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("path",{d:"M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"}),l.jsx("circle",{cx:"12",cy:"12",r:"2.6"})]}):l.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("path",{d:"M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"}),l.jsx("circle",{cx:"12",cy:"12",r:"2.6"}),l.jsx("line",{x1:"4",y1:"20",x2:"20",y2:"4"})]})})]})}function sw({open:t,onClose:e,onAuth:n}){const[i,r]=ye.useState("login"),[s,a]=ye.useState(""),[o,c]=ye.useState("");if(ye.useEffect(()=>{if(!t)return;r("login"),a(""),c("");const f=p=>{p.key==="Escape"&&e()};return addEventListener("keydown",f),()=>removeEventListener("keydown",f)},[t,e]),!t)return null;function u(f){f.preventDefault(),a(""),c("");const p=new FormData(f.target),h=(p.get("email")||"").trim().toLowerCase(),m=p.get("pass")||"";if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(h)){a("Имэйл хаяг буруу байна");return}if(m.length<6){a("Нууц үг дор хаяж 6 тэмдэгт байх ёстой");return}const x=Ys();if(i==="register"){const y=(p.get("name")||"").trim(),g=p.get("pass2")||"";if(y.length<2){a("Нэрээ оруулна уу");return}if(m!==g){a("Нууц үг таарахгүй байна");return}if(x.some(d=>d.email===h)){a("Энэ имэйлээр аль хэдийн бүртгүүлсэн байна");return}x.push({name:y,email:h,pass:xd(m),role:"user",created:Date.now()}),Ja(x),c("Амжилттай бүртгүүллээ! Одоо нэвтэрнэ үү."),setTimeout(()=>{r("login"),c("Бүртгэл үүслээ — имэйл, нууц үгээрээ нэвтэрнэ үү")},900)}else{const y=x.find(g=>g.email===h);if(!y||y.pass!==xd(m)){a("Имэйл эсвэл нууц үг буруу байна");return}n({name:y.name,email:y.email,role:y.role||"user",sub:y.sub||null}),c("Тавтай морил, "+y.name+"!"),setTimeout(e,700)}}return l.jsx("div",{className:"auth-ov",onMouseDown:f=>{f.target===f.currentTarget&&e()},children:l.jsxs("div",{className:"auth-box",role:"dialog","aria-modal":"true","aria-label":"Нэвтрэх / Бүртгүүлэх",children:[l.jsx("button",{className:"auth-x",onClick:e,"aria-label":"Хаах",children:"✕"}),l.jsx("span",{className:"mono",children:"МЭДРЭХ® / Хандалт"}),l.jsxs("div",{className:"auth-tabs",children:[l.jsx("button",{className:i==="login"?"on":"",onClick:()=>{r("login"),a(""),c("")},children:"Нэвтрэх"}),l.jsx("button",{className:i==="register"?"on":"",onClick:()=>{r("register"),a(""),c("")},children:"Бүртгүүлэх"})]}),l.jsxs("form",{onSubmit:u,children:[i==="register"&&l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Нэр"}),l.jsx("input",{name:"name",type:"text",placeholder:"Таны нэр",autoComplete:"name"})]}),l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Имэйл"}),l.jsx("input",{name:"email",type:"email",placeholder:"you@mail.com",autoComplete:"email"})]}),l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Нууц үг"}),l.jsx(Zp,{name:"pass",autoComplete:i==="login"?"current-password":"new-password"})]}),i==="register"&&l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Нууц үг давтах"}),l.jsx(Zp,{name:"pass2",autoComplete:"new-password"})]}),s&&l.jsx("p",{className:"auth-err",children:s}),o&&l.jsx("p",{className:"auth-ok",children:o}),l.jsx("button",{type:"submit",className:"bt bt-a auth-sub",children:i==="login"?"Нэвтрэх →":"Бүртгүүлэх →"})]},i),l.jsx("p",{className:"auth-note mono",children:"Демо горим — өгөгдөл зөвхөн энэ төхөөрөмжид хадгалагдана"})]})})}const aw="medreh-files",Hr="files";function xf(){return new Promise((t,e)=>{const n=indexedDB.open(aw,1);n.onupgradeneeded=()=>n.result.createObjectStore(Hr),n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function Qp(t,e){const n=await xf();return new Promise((i,r)=>{const s=n.transaction(Hr,"readwrite");s.objectStore(Hr).put(e,t),s.oncomplete=()=>i(),s.onerror=()=>r(s.error)})}async function Jp(t){const e=await xf();return new Promise((n,i)=>{const r=e.transaction(Hr).objectStore(Hr).get(t);r.onsuccess=()=>n(r.result||null),r.onerror=()=>i(r.error)})}async function em(t){const e=await xf();return new Promise((n,i)=>{const r=e.transaction(Hr,"readwrite");r.objectStore(Hr).delete(t),r.oncomplete=()=>n(),r.onerror=()=>i(r.error)})}const i_="medreh_custom_tracks",r_="medreh_feed";function wa(){try{return JSON.parse(localStorage.getItem(i_))||[]}catch{return[]}}function s_(t){localStorage.setItem(i_,JSON.stringify(t)),dispatchEvent(new CustomEvent("medreh:library-changed"))}async function ow(t){const e=wa().filter(n=>n.id!==t);await em("audio-"+t).catch(()=>{}),await em("cover-"+t).catch(()=>{}),s_(e)}function Ol(){try{return JSON.parse(localStorage.getItem(r_))||[]}catch{return[]}}function yf(t,e="🎵"){const n=[{id:Date.now(),text:t,icon:e,date:Date.now()},...Ol()].slice(0,30);localStorage.setItem(r_,JSON.stringify(n)),dispatchEvent(new CustomEvent("medreh:feed-changed"))}function lw(){Ol().length===0&&yf("МЭДРЭХ-д тавтай морил! Дуугаа сонгоод мэдэрч эхлээрэй","🎉")}function cw(t){return+(localStorage.getItem("medreh_feed_read:"+t)||0)}function uw(t){localStorage.setItem("medreh_feed_read:"+t,String(Date.now()))}const tm={total:0,vib:0,byGenre:{},byTrack:{},days:{}};function nm(t){try{return{...tm,...JSON.parse(localStorage.getItem("medreh_stats:"+t))||{}}}catch{return{...tm}}}function im(t,e){localStorage.setItem("medreh_stats:"+t,JSON.stringify(e))}function rm(t=new Date){return t.toISOString().slice(0,10)}function yd(t){try{return JSON.parse(localStorage.getItem("medreh_payments:"+t))||[]}catch{return[]}}function dw(t,e){const n=[e,...yd(t)];localStorage.setItem("medreh_payments:"+t,JSON.stringify(n))}function fw({open:t,onClose:e,currentUser:n}){const[i,r]=ye.useState([]),[s,a]=ye.useState([]),[o,c]=ye.useState("users"),[u,f]=ye.useState(!1),[p,h]=ye.useState("");if(ye.useEffect(()=>{if(!t)return;r(Ys()),a(wa()),h("");const d=v=>{v.key==="Escape"&&e()};return addEventListener("keydown",d),()=>removeEventListener("keydown",d)},[t,e]),!t)return null;function m(d){if(!confirm(d+" — энэ хэрэглэгчийг устгах уу?"))return;const v=i.filter(_=>_.email!==d);Ja(v),r(v),dispatchEvent(new CustomEvent("medreh:users-changed"))}async function x(d){d.preventDefault(),h("");const v=new FormData(d.target),_=(v.get("title")||"").trim(),T=(v.get("singer")||"").trim(),D=(v.get("composer")||"").trim(),C=(v.get("genre")||"").trim()||"Бусад",A=v.get("audio"),R=v.get("cover"),E=(v.get("coverUrl")||"").trim();if(_.length<2){h("❌ Дууны нэрээ оруулна уу");return}if(T.length<2){h("❌ Дуучны нэрээ оруулна уу");return}if(!A||!A.size){h("❌ Дууны mp3 файлаа сонгоно уу — энэ нь тоглогдох дуу тул заавал шаардлагатай");return}if(!/audio\//.test(A.type)){h("❌ Аудио талбарт зөвхөн дууны файл (mp3) оруулна — зураг биш");return}if(E&&!/^https?:\/\//.test(E)){h("❌ Зургийн линк http(s)://-ээр эхлэх ёстой");return}f(!0);try{const S="c"+Date.now();await Qp("audio-"+S,A),R&&R.size&&await Qp("cover-"+S,R);const G=[{id:S,title:_,singer:T,composer:D,genre:C,hasCover:!!(R&&R.size),coverUrl:!R||!R.size?E:"",added:Date.now()},...wa()];s_(G),a(G),yf("Шинэ дуу нэмэгдлээ: «"+_+"» — "+T,"🎵"),h("✅ «"+_+"» амжилттай нэмэгдлээ. Хэрэглэгчдэд мэдэгдэл илгээгдсэн."),d.target.reset()}catch(S){h("❌ Хадгалахад алдаа гарлаа: "+S.message)}f(!1)}async function y(d){confirm("«"+d.title+"» дууг устгах уу?")&&(await ow(d.id),a(wa()))}const g=i.filter(d=>d.role!=="admin");return l.jsx("div",{className:"auth-ov",onMouseDown:d=>{d.target===d.currentTarget&&e()},children:l.jsxs("div",{className:"auth-box admin-box",role:"dialog","aria-modal":"true","aria-label":"Админ самбар",children:[l.jsx("button",{className:"auth-x",onClick:e,"aria-label":"Хаах",children:"✕"}),l.jsx("span",{className:"mono",children:"МЭДРЭХ® / Админ самбар"}),l.jsxs("div",{className:"auth-tabs",style:{marginBottom:0},children:[l.jsx("button",{className:o==="users"?"on":"",onClick:()=>c("users"),children:"Хэрэглэгчид"}),l.jsx("button",{className:o==="tracks"?"on":"",onClick:()=>c("tracks"),children:"Дууны сан"})]}),o==="users"&&l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"adm-stats",children:[l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Нийт бүртгэл"}),l.jsx("b",{children:g.length})]}),l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"PRO захиалагч"}),l.jsx("b",{children:g.filter(d=>{var v;return(v=d.sub)==null?void 0:v.active}).length})]})]}),l.jsxs("div",{className:"adm-list",children:[l.jsxs("div",{className:"adm-row adm-head",children:[l.jsx("span",{className:"mono",children:"Нэр"}),l.jsx("span",{className:"mono",children:"Имэйл"}),l.jsx("span",{className:"mono",children:"Огноо"}),l.jsx("span",{className:"mono",children:"Захиалга"}),l.jsx("span",{})]}),g.length===0&&l.jsx("p",{className:"adm-empty",children:"Одоогоор бүртгүүлсэн хэрэглэгч алга"}),g.map(d=>{var v,_;return l.jsxs("div",{className:"adm-row",children:[l.jsx("span",{children:d.name}),l.jsx("span",{className:"adm-mail",children:d.email}),l.jsx("span",{className:"adm-date",children:d.created?new Date(d.created).toLocaleDateString("mn-MN"):"—"}),l.jsx("span",{className:"adm-sub"+((v=d.sub)!=null&&v.active?" on":""),children:(_=d.sub)!=null&&_.active?"PRO":"—"}),l.jsx("button",{className:"adm-del",onClick:()=>m(d.email),"aria-label":d.email+" устгах",children:"Устгах"})]},d.email)})]})]}),o==="tracks"&&l.jsxs(l.Fragment,{children:[l.jsxs("form",{className:"adm-form",onSubmit:x,children:[l.jsx("span",{className:"mono",style:{fontSize:9.5},children:"Шинэ дуу нэмэх"}),l.jsxs("div",{className:"adm-form-row",children:[l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Дууны нэр *"}),l.jsx("input",{name:"title",type:"text",placeholder:"ж: Хөх тэнгэр"})]}),l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Дуучин *"}),l.jsx("input",{name:"singer",type:"text",placeholder:"ж: Батаа"})]})]}),l.jsxs("div",{className:"adm-form-row",children:[l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Зохиолч (заавал биш)"}),l.jsx("input",{name:"composer",type:"text",placeholder:"ж: Д.Дорж"})]}),l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Төрөл (заавал биш)"}),l.jsx("input",{name:"genre",type:"text",placeholder:"ж: Поп",list:"genres"}),l.jsxs("datalist",{id:"genres",children:[l.jsx("option",{value:"Поп"}),l.jsx("option",{value:"Рок"}),l.jsx("option",{value:"Хип хоп"}),l.jsx("option",{value:"Электрон"}),l.jsx("option",{value:"Ардын"}),l.jsx("option",{value:"Чилл"})]})]})]}),l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"🎵 Дууны файл (mp3) *"}),l.jsx("input",{name:"audio",type:"file",accept:"audio/*",className:"adm-file"})]}),l.jsxs("div",{className:"adm-cover",children:[l.jsx("span",{className:"mono",children:"🖼 Обложка зураг — заавал биш, аль нэгийг нь л оруулна"}),l.jsxs("div",{className:"adm-form-row",children:[l.jsxs("label",{children:[l.jsx("span",{className:"mono",style:{color:"var(--faint)"},children:"Файлаар"}),l.jsx("input",{name:"cover",type:"file",accept:"image/*",className:"adm-file"})]}),l.jsxs("label",{children:[l.jsx("span",{className:"mono",style:{color:"var(--faint)"},children:"Эсвэл линкээр"}),l.jsx("input",{name:"coverUrl",type:"url",placeholder:"https://..."})]})]}),l.jsx("p",{className:"adm-hint",children:"Хоёуланг нь оруулбал файл нь ашиглагдана. Юу ч оруулаагүй бол автомат обложка тавигдана."})]}),p&&l.jsx("p",{className:p.startsWith("✅")?"auth-ok":"auth-err",style:{fontSize:13},children:p}),l.jsx("button",{type:"submit",className:"bt bt-a auth-sub",disabled:u,children:u?"Хадгалж байна…":"+ Дуу нэмэх"})]}),l.jsxs("div",{className:"adm-list",children:[l.jsxs("div",{className:"adm-row adm-head adm-row-t",children:[l.jsx("span",{className:"mono",children:"Нэр"}),l.jsx("span",{className:"mono",children:"Төрөл"}),l.jsx("span",{className:"mono",children:"Огноо"}),l.jsx("span",{})]}),s.length===0&&l.jsx("p",{className:"adm-empty",children:"Админы нэмсэн дуу алга — үндсэн 6 демо дуу ажиллаж байна"}),s.map(d=>l.jsxs("div",{className:"adm-row adm-row-t",children:[l.jsxs("span",{children:[d.title," ",l.jsxs("i",{className:"adm-artist",children:["— ",d.singer||d.artist]}),d.composer&&l.jsxs("i",{className:"adm-artist",children:[" · зох. ",d.composer]})]}),l.jsx("span",{className:"adm-date",children:d.genre}),l.jsx("span",{className:"adm-date",children:new Date(d.added).toLocaleDateString("mn-MN")}),l.jsx("button",{className:"adm-del",onClick:()=>y(d),children:"Устгах"})]},d.id))]})]}),l.jsxs("p",{className:"auth-note mono",children:["Нэвтэрсэн: ",n==null?void 0:n.email]})]})})}const a_="/assets/gal-01-BmF_rInK.jpg",o_="/assets/gal-02-BmiPgtM2.jpg",l_="/assets/gal-03-CpoeRbUW.jpg",c_="/assets/gal-04-DThaAW-j.jpg",u_="/assets/gal-05-BQMWFLMO.jpg",d_="/assets/gal-06-BiTMBND7.jpg",pu=[{id:1,title:"Гүн долгион",artist:"SoundHelix",genre:"Электрон",file:"/tracks/song-1.mp3",cover:a_},{id:2,title:"Шөнийн хэмнэл",artist:"SoundHelix",genre:"Чилл",file:"/tracks/song-2.mp3",cover:o_},{id:3,title:"Хотын гэрэл",artist:"SoundHelix",genre:"Синт поп",file:"/tracks/song-3.mp3",cover:l_},{id:4,title:"Цахилгаан зүрх",artist:"SoundHelix",genre:"Данс",file:"/tracks/song-4.mp3",cover:c_},{id:5,title:"Мөрөөдлийн зам",artist:"SoundHelix",genre:"Эмбиент",file:"/tracks/song-8.mp3",cover:u_},{id:6,title:"Аянгын цохилт",artist:"SoundHelix",genre:"Электрон рок",file:"/tracks/song-9.mp3",cover:d_}],hw=[{key:"bass",label:"Бас",hz:"55 Hz",freq:55,type:"sine",dur:.7,vib:[220]},{key:"mid",label:"Дунд",hz:"330 Hz",freq:330,type:"triangle",dur:.45,vib:[60,40,60]},{key:"high",label:"Өндөр",hz:"1.8 kHz",freq:1800,type:"square",dur:.3,vib:[15,20,15,20,15]}];function pw({open:t,onClose:e,onDone:n}){const[i,r]=ye.useState(0),[s,a]=ye.useState(1),[o,c]=ye.useState(1),[u,f]=ye.useState({bass:!0,mid:!0,high:!0}),[p,h]=ye.useState(!1),m=ye.useRef(null),x=typeof navigator<"u"&&!!navigator.vibrate;if(ye.useEffect(()=>{t&&(r(0),h(!1)),!t&&m.current&&(m.current.close().catch(()=>{}),m.current=null)},[t]),!t)return null;function y(R,E,S){m.current||(m.current=new(window.AudioContext||window.webkitAudioContext));const N=m.current;N.state==="suspended"&&N.resume();const G=N.createOscillator(),z=N.createGain();G.type=S,G.frequency.value=R,z.gain.setValueAtTime(0,N.currentTime),z.gain.linearRampToValueAtTime(.5,N.currentTime+.02),z.gain.exponentialRampToValueAtTime(1e-4,N.currentTime+E),G.connect(z),z.connect(N.destination),G.start(),G.stop(N.currentTime+E+.05)}function g(R){if(x)try{navigator.vibrate(R)}catch{}}function d(){h(!0),g([300]),y(55,.8,"sine")}function v(R){y(R.freq,R.dur,R.type),g(R.vib)}function _(R){f(E=>{const S={...E,[R]:!E[R]};return!S.bass&&!S.mid&&!S.high?E:S})}function T(){n({vib:s,light:o,bands:u,calibrated:!0}),e()}const D=[{label:"Тод мэдэрсэн",hint:"Сул горим тохирно",val:0},{label:"Бага зэрэг",hint:"Дунд горим тохирно",val:1},{label:"Мэдрээгүй",hint:"Хүчтэй горим тохирно",val:2}],C=[{label:"Хэт тод байна",hint:"Бүдэг горим",val:0},{label:"Яг таарсан",hint:"Дунд горим",val:1},{label:"Бүдэг харагдсан",hint:"Тод горим",val:2}],A=["","Чичиргээ","Гэрэл","Давтамж","Дүгнэлт"];return l.jsx("div",{className:"cal-ov",role:"dialog","aria-modal":"true","aria-label":"Мэдрэхүйн калибровк",children:l.jsxs("div",{className:"cal-box",children:[i>0&&l.jsx("div",{className:"cal-prog","aria-hidden":"true",children:[1,2,3,4].map(R=>l.jsx("i",{className:i>=R?"on":""},R))}),i===0&&l.jsxs("div",{className:"cal-step",children:[l.jsx("span",{className:"cal-big","aria-hidden":"true",children:"🎛"}),l.jsx("h2",{children:"Мэдрэхүйн калибровк"}),l.jsxs("p",{children:["Сонсголын мэдрэмж хүн бүрд өөр. Богино тестээр таны ",l.jsx("b",{children:"мэдрэх босгыг"})," тодорхойлж, чичиргээ болон гэрлийн тохиргоог танд яг тааруулж өгье. Ердөө 1 минут зарцуулна."]}),l.jsxs("div",{className:"cal-row",children:[l.jsx("button",{className:"bt bt-a",onClick:()=>r(1),children:"Эхлэх →"}),l.jsx("button",{className:"bt",onClick:e,children:"Дараа хийе"})]})]}),i===1&&l.jsxs("div",{className:"cal-step",children:[l.jsxs("span",{className:"mono",children:["1 / 4 · ",A[1]]}),l.jsx("h2",{children:"Чичиргээг мэдэрч үзье"}),x?l.jsx("p",{children:"Утсаа гартаа барьж байгаад доорх товчийг дараарай — 0.3 секундын чичиргээ өгнө."}):l.jsx("p",{children:"Энэ төхөөрөмж чичиргээгүй тул дууны туршилт хийнэ. Утсан дээр дахин калибровк хийхэд чичиргээ нэмэгдэнэ."}),l.jsxs("button",{className:"cal-test"+(p?" done":""),onClick:d,children:["📳 ",p?"Дахин туршиж үзэх":"Туршиж үзэх"]}),l.jsx("div",{className:"cal-ans",children:D.map(R=>l.jsxs("button",{className:s===R.val&&p?"on":"",disabled:!p,onClick:()=>{a(R.val),r(2)},children:[l.jsx("b",{children:R.label}),l.jsx("span",{children:R.hint})]},R.val))})]}),i===2&&l.jsxs("div",{className:"cal-step",children:[l.jsxs("span",{className:"mono",children:["2 / 4 · ",A[2]]}),l.jsx("h2",{children:"Гэрлийн пульс хэр харагдаж байна?"}),l.jsx("div",{className:"cal-pulse-wrap","aria-hidden":"true",children:l.jsx("span",{className:"cal-pulse"})}),l.jsx("div",{className:"cal-ans",children:C.map(R=>l.jsxs("button",{onClick:()=>{c(R.val),r(3)},children:[l.jsx("b",{children:R.label}),l.jsx("span",{children:R.hint})]},R.val))})]}),i===3&&l.jsxs("div",{className:"cal-step",children:[l.jsxs("span",{className:"mono",children:["3 / 4 · ",A[3]]}),l.jsx("h2",{children:"Аль давтамжийг мэдэрдэг вэ?"}),l.jsx("p",{children:"Тус бүрийг туршаад, мэдэрсэн бүсүүдээ идэвхтэй үлдээгээрэй. Идэвхгүй бүс чичиргээ өгөхгүй."}),l.jsx("div",{className:"cal-bands",children:hw.map(R=>l.jsxs("div",{className:"cal-band"+(u[R.key]?" on":""),children:[l.jsx("button",{className:"cal-band-play",onClick:()=>v(R),"aria-label":R.label+" туршиж үзэх",children:"▶"}),l.jsxs("div",{className:"cal-band-meta",children:[l.jsx("b",{children:R.label}),l.jsx("span",{className:"mono",children:R.hz})]}),l.jsx("button",{className:"cal-band-tgl",onClick:()=>_(R.key),"aria-pressed":u[R.key],children:u[R.key]?"✓ Мэдэрсэн":"Мэдрээгүй"})]},R.key))}),l.jsx("div",{className:"cal-row",children:l.jsx("button",{className:"bt bt-a",onClick:()=>r(4),children:"Үргэлжлүүлэх →"})})]}),i===4&&l.jsxs("div",{className:"cal-step",children:[l.jsxs("span",{className:"mono",children:["4 / 4 · ",A[4]]}),l.jsx("span",{className:"cal-big","aria-hidden":"true",children:"✓"}),l.jsx("h2",{children:"Таны мэдрэхүйн профайл"}),l.jsxs("div",{className:"cal-sum",children:[l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Чичиргээ"}),l.jsx("b",{children:["Сул","Дунд","Хүчтэй"][s]})]}),l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Гэрэл"}),l.jsx("b",{children:["Бүдэг","Дунд","Тод"][o]})]}),l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Бүс"}),l.jsx("b",{children:[u.bass&&"Бас",u.mid&&"Дунд",u.high&&"Өндөр"].filter(Boolean).join(" · ")})]})]}),l.jsx("p",{className:"cal-note",children:"Тохиргоог хүссэн үедээ ⚙️ цэснээс өөрчилж, дахин калибровк хийж болно."}),l.jsx("div",{className:"cal-row",children:l.jsx("button",{className:"bt bt-a",onClick:T,children:"Хадгалаад эхлэх →"})})]})]})})}const yr=30,sm=[{label:"Сул",mult:.5},{label:"Дунд",mult:1},{label:"Хүчтэй",mult:1.7}],am=[{label:"Бүдэг",mult:.5},{label:"Дунд",mult:1},{label:"Тод",mult:1.7}],ua={vib:1,light:1,bands:{bass:!0,mid:!0,high:!0},calibrated:!1},om={Электрон:{bass:78,mid:52,high:38,pattern:[230,80,230],text:"Гүн бас давамгайлсан — урт, хүчтэй чичиргээ голлон мэдрэгдэнэ. Гар дээр аажуу лугшилт болж бууна."},Чилл:{bass:46,mid:62,high:30,pattern:[140,90,140,90],text:"Зөөлөн дунд давтамжтай — намуухан, урсгал мэт хэмнэлтэй чичиргээ. Тайвшруулах мэдрэмж өгнө."},"Синт поп":{bass:58,mid:72,high:55,pattern:[80,50,80,50,120],text:"Тод аялгуу, дунд бүс голлосон — хэмнэлтэй, «дуулж» буй мэт чичиргээ мэдрэгдэнэ."},Данс:{bass:86,mid:48,high:52,pattern:[95,55,95,55,95],text:"Хүчтэй тогтмол цохилт — бүжгийн хэмнэл шиг тэнцүү зайтай, эрчтэй чичиргээ. Хамгийн «мэдрэгддэг» төрөл."},Эмбиент:{bass:36,mid:56,high:46,pattern:[300,220,300],text:"Уужим, удаан өөрчлөгдөх дуу — маш зөөлөн, урт долгион мэт чичиргээ. Гэрлийн пульс нь гол мэдрэмж."},"Электрон рок":{bass:72,mid:68,high:62,pattern:[60,40,60,40,130],text:"Бүх бүс идэвхтэй — богино түргэн + урт хүчтэй чичиргээ ээлжилнэ. Эрч хүчтэй мэдрэмж."}},lm={bass:55,mid:55,high:45,pattern:[120,70,120],text:"Олон төрлийн давтамж холилдсон — дунд зэргийн хэмнэлтэй чичиргээ мэдрэгдэнэ."};function cm(t){if(!isFinite(t))return"0:00";const e=Math.floor(t/60),n=Math.floor(t%60);return e+":"+String(n).padStart(2,"0")}function mu(t){if(t<60)return t+" сек";const e=Math.floor(t/3600),n=Math.floor(t%3600/60);return e>0?e+" цаг "+n+" мин":n+" мин"}function mw(t){const e=Math.floor((Date.now()-t)/6e4);return e<1?"дөнгөж сая":e<60?e+" мин өмнө":e<1440?Math.floor(e/60)+" цаг өмнө":Math.floor(e/1440)+" өдрийн өмнө"}function gw({open:t,onClose:e,user:n,subscribed:i,onSubscribe:r,isAdmin:s,onAdmin:a,onLogout:o,onCancelSub:c}){var Gt;const[u,f]=ye.useState("home"),[p,h]=ye.useState(null),[m,x]=ye.useState(""),[y,g]=ye.useState("Бүгд"),[d,v]=ye.useState([]),[_,T]=ye.useState([]),[D,C]=ye.useState([]),[A,R]=ye.useState([]),[E,S]=ye.useState(null),[N,G]=ye.useState(!1),[z,te]=ye.useState(0),[Q,$]=ye.useState(0),[J,F]=ye.useState(!0),[ee,ie]=ye.useState(!1),[ue,Ie]=ye.useState(ua),[at,X]=ye.useState(!1),[se,ve]=ye.useState(!1),[ge,Re]=ye.useState(!1),[Oe,qe]=ye.useState(!1),[I,Qe]=ye.useState([]),[et,ht]=ye.useState(0),[Be,nt]=ye.useState(!1),[Je,Ye]=ye.useState(!1),[yt,b]=ye.useState(""),[M,H]=ye.useState(""),[,ae]=ye.useState(0),ne=ye.useRef(null),oe=ye.useRef(null),Ue=ye.useRef(null),_e=ye.useRef(null),Se=ye.useRef({lo:0,mi:0,hi:0}),je=ye.useRef(ue),he=ye.useRef(null),Ne=ye.useRef(null),Ze=ye.useRef([]),Ve=ye.useRef([]),we=ye.useRef(null),Ke=ye.useRef(!1);je.current=ue;const $e=typeof navigator<"u"&&!!navigator.vibrate,it=(n==null?void 0:n.email)||"",U="medreh_likes:"+it,Me="medreh_saves:"+it,q="medreh_prefs:"+it;ye.useEffect(()=>{if(it){try{T(JSON.parse(localStorage.getItem(U))||[])}catch{T([])}try{C(JSON.parse(localStorage.getItem(Me))||[])}catch{C([])}try{const P=JSON.parse(localStorage.getItem(q));Ie(P?{...ua,...P,bands:{...ua.bands,...P.bands}}:ua)}catch{Ie(ua)}Ne.current=nm(it),ht(cw(it)),X(!0)}},[U,Me,q,it]),ye.useEffect(()=>{t&&at&&!ue.calibrated&&!Ke.current&&!s&&(Ke.current=!0,Ye(!0))},[t,at,ue.calibrated,s]),ye.useEffect(()=>{t&&f(s?"admin":"home")},[t,s]),ye.useEffect(()=>{const P=()=>ae(W=>W+1);return addEventListener("medreh:users-changed",P),()=>removeEventListener("medreh:users-changed",P)},[]),ye.useEffect(()=>{if(!t)return;let P=!0;const W=[];async function pe(){const tt=wa(),re=[];for(const De of tt){const Nt=await Jp("audio-"+De.id).catch(()=>null);if(!Nt)continue;const Et=URL.createObjectURL(Nt);W.push(Et);let bn=null;if(De.hasCover){const ui=await Jp("cover-"+De.id).catch(()=>null);ui&&(bn=URL.createObjectURL(ui),W.push(bn))}re.push({id:De.id,title:De.title,artist:De.singer||De.artist||"Тодорхойгүй",composer:De.composer||"",genre:De.genre,file:Et,cover:bn||De.coverUrl||pu[Math.abs(De.title.length)%pu.length].cover,custom:!0})}P&&R(re)}pe();const Te=()=>pe();return addEventListener("medreh:library-changed",Te),()=>{P=!1,removeEventListener("medreh:library-changed",Te),W.forEach(tt=>URL.revokeObjectURL(tt))}},[t]),ye.useEffect(()=>{if(!t)return;Qe(Ol());const P=()=>Qe(Ol());return addEventListener("medreh:feed-changed",P),addEventListener("storage",P),()=>{removeEventListener("medreh:feed-changed",P),removeEventListener("storage",P)}},[t]);const K=I.filter(P=>P.date>et).length;function me(){const P=!Oe;qe(P),ve(!1),Re(!1),P&&it&&(uw(it),setTimeout(()=>ht(Date.now()),600))}function Ge(P){T(W=>{const pe=W.includes(P)?W.filter(Te=>Te!==P):[P,...W];return localStorage.setItem(U,JSON.stringify(pe)),pe})}function lt(P){C(W=>{const pe=W.includes(P)?W.filter(Te=>Te!==P):[P,...W];return localStorage.setItem(Me,JSON.stringify(pe)),pe})}function _t(P){Ie(W=>{const pe={...W,...P,bands:{...W.bands,...P.bands||{}}};return!pe.bands.bass&&!pe.bands.mid&&!pe.bands.high?W:(localStorage.setItem(q,JSON.stringify(pe)),pe)})}function Mt(){if(oe.current){oe.current.ctx.resume();return}const P=new(window.AudioContext||window.webkitAudioContext),W=P.createMediaElementSource(ne.current),pe=P.createAnalyser();pe.fftSize=256,pe.smoothingTimeConstant=.7,W.connect(pe),pe.connect(P.destination),oe.current={ctx:P,an:pe,data:new Uint8Array(pe.frequencyBinCount)}}function ct(P,W,pe){Ue.current||(Ue.current=new(window.AudioContext||window.webkitAudioContext));const Te=Ue.current;Te.state==="suspended"&&Te.resume();const tt=Te.createOscillator(),re=Te.createGain();tt.type=pe,tt.frequency.value=P,re.gain.setValueAtTime(0,Te.currentTime),re.gain.linearRampToValueAtTime(.45,Te.currentTime+.02),re.gain.exponentialRampToValueAtTime(1e-4,Te.currentTime+W),tt.connect(re),re.connect(Te.destination),tt.start(),tt.stop(Te.currentTime+W+.05)}if(ye.useEffect(()=>{if(!t)return;let P,W;const pe=()=>{P=requestAnimationFrame(pe);const Te=oe.current,tt=je.current,re=am[tt.light].mult;if(Te&&N){Te.an.getByteFrequencyData(Te.data);const De=Te.data.length,Nt=Math.floor(De*.08),Et=Math.floor(De*.38);let bn=0,ui=0,hr=0,Nn;for(Nn=0;Nn<Nt;Nn++)bn+=Te.data[Nn];for(Nn=Nt;Nn<Et;Nn++)ui+=Te.data[Nn];for(Nn=Et;Nn<De;Nn++)hr+=Te.data[Nn];bn/=Nt*255,ui/=(Et-Nt)*255,hr/=(De-Et)*255,Se.current={lo:bn,mi:ui,hi:hr};const eo=Math.max(tt.bands.bass?bn:0,tt.bands.mid?ui:0,tt.bands.high?hr:0);_e.current&&(_e.current.style.opacity=Math.min(1,(.1+eo*.7)*re).toFixed(3),_e.current.style.transform="translate(-50%,-50%) scale("+(1+eo*.5*re).toFixed(3)+")"),Ze.current.forEach(($s,ac)=>{if(!$s)return;const oc=Te.data[Math.floor(ac/Ze.current.length*De*.7)]/255;$s.style.height=Math.max(3,oc*22)+"px"}),Ve.current.forEach(($s,ac)=>{if(!$s)return;const oc=Te.data[Math.floor(ac/Ve.current.length*De*.72)]/255;$s.style.height=Math.max(2,oc*100*Math.min(1.2,re))+"%"}),we.current&&(we.current.style.transform="scale("+(1+eo*.9*re).toFixed(3)+")",we.current.style.opacity=Math.min(1,.25+eo*.85*re).toFixed(3))}else Ze.current.forEach(De=>{De&&(De.style.height="3px")})};return pe(),$e&&(W=setInterval(()=>{if(!N||!J)return;const{lo:Te,mi:tt,hi:re}=Se.current,De=je.current,Nt=sm[De.vib].mult;let Et=!1;De.bands.bass&&Te>.45?(navigator.vibrate(Math.round((60+Te*80)*Nt)),Et=!0):De.bands.mid&&tt>.35?(navigator.vibrate([Math.round(30*Nt),30,Math.round(30*Nt)]),Et=!0):De.bands.high&&re>.3&&(navigator.vibrate(Math.max(8,Math.round(12*Nt))),Et=!0),Et&&Ne.current&&Ne.current.vib++},170)),()=>{cancelAnimationFrame(P),clearInterval(W),$e&&navigator.vibrate(0)}},[t,N,J,$e]),ye.useEffect(()=>{if(!t||!N||!it)return;let P=0;const W=setInterval(()=>{const pe=Ne.current,Te=he.current;if(!pe||!Te)return;pe.total++,pe.byGenre[Te.genre]=(pe.byGenre[Te.genre]||0)+1,pe.byTrack[Te.id]=(pe.byTrack[Te.id]||0)+1;const tt=rm();pe.days[tt]=(pe.days[tt]||0)+1,++P%5===0&&im(it,pe)},1e3);return()=>{clearInterval(W),Ne.current&&im(it,Ne.current)}},[t,N,it]),ye.useEffect(()=>{const P=ne.current;if(!P)return;const W=()=>{te(P.currentTime),!i&&P.currentTime>=yr&&(P.pause(),ie(!0))},pe=()=>$(P.duration),Te=()=>G(!0),tt=()=>G(!1),re=()=>Hn();return P.addEventListener("timeupdate",W),P.addEventListener("loadedmetadata",pe),P.addEventListener("play",Te),P.addEventListener("pause",tt),P.addEventListener("ended",re),()=>{P.removeEventListener("timeupdate",W),P.removeEventListener("loadedmetadata",pe),P.removeEventListener("play",Te),P.removeEventListener("pause",tt),P.removeEventListener("ended",re)}}),ye.useEffect(()=>{if(!t&&ne.current&&ne.current.pause(),document.body.classList.toggle("native-cursor",t),!t)return;const P=W=>{if(W.key==="Escape"){if(Be){nt(!1);return}if(se||ge||Oe){ve(!1),Re(!1),qe(!1);return}if(!Je){if(u!=="home"){f("home");return}e()}}};return addEventListener("keydown",P),()=>{removeEventListener("keydown",P),document.body.classList.remove("native-cursor")}},[t,e,Be,se,ge,Oe,u,Je]),ye.useEffect(()=>()=>{Ue.current&&Ue.current.close().catch(()=>{})},[]),!t)return null;const V=[...pu,...A],le=["Бүгд",...new Set(V.map(P=>P.genre))],ce=V.filter(P=>{if(y!=="Бүгд"&&P.genre!==y)return!1;const W=m.trim().toLowerCase();return W?(P.title+" "+P.artist+" "+P.genre).toLowerCase().includes(W):!0}),xe=P=>V.find(W=>W.id===P),ke=d.map(xe).filter(Boolean),be=_.map(xe).filter(Boolean),Ee=D.map(xe).filter(Boolean);function Z(P){const W=ne.current;if(Mt(),ie(!1),(E==null?void 0:E.id)===P.id){N?W.pause():W.play();return}S(P),he.current=P,v(pe=>[P.id,...pe.filter(Te=>Te!==P.id)].slice(0,6)),W.src=P.file,W.play()}function Fe(){if(!E){ce[0]&&Z(ce[0]);return}Mt();const P=ne.current;if(N)P.pause();else{if(ee)return;P.play()}}function xt(P){const W=ne.current;if(!W||!E)return;let pe=Math.max(0,W.currentTime+P);i||(pe=Math.min(pe,yr-1)),W.currentTime=Math.min(pe,(W.duration||1)-.5)}function Ft(P){const W=ne.current;if(!W||!E||!Q)return;const pe=P.currentTarget.getBoundingClientRect();let Te=(P.clientX-pe.left)/pe.width*Q;i||(Te=Math.min(Te,yr-1)),W.currentTime=Te}function ci(P){if(!E)return;const W=V.findIndex(Te=>Te.id===E.id),pe=V[(W+P+V.length)%V.length];Z(pe)}function Hn(){ci(1)}function Jn(P){h(P),f("detail")}function w(P){const W=om[P.genre]||lm;if($e)try{navigator.vibrate(W.pattern)}catch{}const pe=W.bass>=W.mid&&W.bass>=W.high?[55,.7,"sine"]:W.mid>=W.high?[330,.45,"triangle"]:[1500,.3,"square"];ct(pe[0],pe[1],pe[2])}const k=Q?z/Q*100:0,B=Q&&!i?Math.min(100,yr/Q*100):100,O=((n==null?void 0:n.name)||"?").trim().charAt(0).toUpperCase(),L=(Gt=n==null?void 0:n.sub)!=null&&Gt.renews?new Date(n.sub.renews).toLocaleDateString("mn-MN"):null,Y={users:l.jsxs(l.Fragment,{children:[l.jsx("path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}),l.jsx("circle",{cx:"9",cy:"7",r:"4"}),l.jsx("path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}),l.jsx("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]}),gem:l.jsxs(l.Fragment,{children:[l.jsx("path",{d:"M6 3h12l4 6-10 12L2 9l4-6z"}),l.jsx("path",{d:"M2 9h20"}),l.jsx("path",{d:"m12 21-4-12 2.5-6"}),l.jsx("path",{d:"m12 21 4-12-2.5-6"})]}),money:l.jsxs(l.Fragment,{children:[l.jsx("rect",{x:"2",y:"6",width:"20",height:"12",rx:"2"}),l.jsx("circle",{cx:"12",cy:"12",r:"3"}),l.jsx("path",{d:"M6 10v4M18 10v4"})]}),music:l.jsxs(l.Fragment,{children:[l.jsx("path",{d:"M9 18V5l12-2v13"}),l.jsx("circle",{cx:"6",cy:"18",r:"3"}),l.jsx("circle",{cx:"18",cy:"16",r:"3"})]}),phones:l.jsxs(l.Fragment,{children:[l.jsx("path",{d:"M3 14v-2a9 9 0 0 1 18 0v2"}),l.jsx("rect",{x:"3",y:"14",width:"4",height:"6",rx:"2"}),l.jsx("rect",{x:"17",y:"14",width:"4",height:"6",rx:"2"})]}),vibrate:l.jsxs(l.Fragment,{children:[l.jsx("rect",{x:"8",y:"3",width:"8",height:"18",rx:"2"}),l.jsx("path",{d:"M3 9v6M21 9v6"}),l.jsx("path",{d:"M5.5 10.5v3M18.5 10.5v3"})]}),star:l.jsx("path",{d:"m12 2 3 6.6 7 .9-5.2 4.8 1.4 7-6.2-3.6L5.8 21l1.4-7L2 9.5l7-.9z"}),horn:l.jsxs(l.Fragment,{children:[l.jsx("path",{d:"m3 10 16-5v14L3 14v-4z"}),l.jsx("path",{d:"M7 14.5V18a2 2 0 0 0 4 0v-2.3"}),l.jsx("path",{d:"M21 9v6"})]})};function de({icon:P,color:W,value:pe,label:Te}){return l.jsxs("div",{className:"st-card",children:[l.jsx("span",{className:"st-ico "+W,"aria-hidden":"true",children:l.jsx("svg",{width:"21",height:"21",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.9",strokeLinecap:"round",strokeLinejoin:"round",children:P})}),l.jsxs("span",{className:"st-meta",children:[l.jsx("b",{children:pe}),l.jsx("span",{className:"mono",children:Te})]})]})}function Ce({id:P,row:W}){const pe=_.includes(P);return l.jsx("span",{className:"sp-like"+(W?" sp-like-row":"")+(pe?" on":""),role:"button",tabIndex:0,"aria-label":pe?"Дуртайгаас хасах":"Дуртайд нэмэх",onClick:Te=>{Te.stopPropagation(),Ge(P)},onKeyDown:Te=>{Te.key==="Enter"&&(Te.stopPropagation(),Ge(P))},children:pe?"♥":"♡"})}function Le({id:P,row:W}){const pe=D.includes(P);return l.jsx("span",{className:"sp-like"+(W?" sp-like-row sp-save-row":" sp-save")+(pe?" on":""),role:"button",tabIndex:0,"aria-label":pe?"Хадгалснаас хасах":"Хадгалах",onClick:Te=>{Te.stopPropagation(),lt(P)},onKeyDown:Te=>{Te.key==="Enter"&&(Te.stopPropagation(),lt(P))},children:l.jsx("svg",{width:W?14:15,height:W?14:15,viewBox:"0 0 24 24",fill:pe?"currentColor":"none",stroke:"currentColor",strokeWidth:"2",strokeLinejoin:"round",children:l.jsx("path",{d:"M6 3h12v18l-6-3.6L6 21V3z"})})})}function We({t:P,row:W}){return l.jsx("span",{className:"sp-like sp-info"+(W?" sp-like-row":""),role:"button",tabIndex:0,"aria-label":P.title+" — дэлгэрэнгүй",onClick:pe=>{pe.stopPropagation(),Jn(P)},onKeyDown:pe=>{pe.key==="Enter"&&(pe.stopPropagation(),Jn(P))},children:"ⓘ"})}function Xe({tracks:P}){return l.jsx("div",{className:"sp-side-recent",children:P.map(W=>l.jsxs("button",{className:"sp-rcard"+((E==null?void 0:E.id)===W.id?" on":""),onClick:()=>Z(W),children:[l.jsx("img",{src:W.cover,alt:""}),l.jsx("span",{children:W.title}),(E==null?void 0:E.id)===W.id&&N?l.jsxs("span",{className:"pl-eq sp-req","aria-hidden":"true",children:[l.jsx("u",{}),l.jsx("u",{}),l.jsx("u",{})]}):l.jsx("i",{"aria-hidden":"true",children:"▶"})]},W.id))})}function ze({title:P}){return l.jsxs("div",{className:"sp-backbar",children:[l.jsx("button",{className:"sp-back",onClick:()=>f("home"),children:"← Буцах"}),l.jsx("h2",{className:"sp-h",style:{margin:0},children:P})]})}function dt(){const P=Ne.current||nm(it),W=Object.entries(P.byGenre).sort((re,De)=>De[1]-re[1])[0],pe=Object.entries(P.byTrack).sort((re,De)=>De[1]-re[1]).slice(0,3).map(([re,De])=>({t:xe(isNaN(+re)?re:+re),sec:De})).filter(re=>re.t),Te=[];for(let re=6;re>=0;re--){const De=new Date;De.setDate(De.getDate()-re);const Nt=rm(De);Te.push({label:["Ня","Да","Мя","Лх","Пү","Ба","Бя"][De.getDay()],sec:P.days[Nt]||0,today:re===0})}const tt=Math.max(1,...Te.map(re=>re.sec));return l.jsxs(l.Fragment,{children:[l.jsx(ze,{title:"Миний статистик"}),l.jsxs("div",{className:"st-cards",children:[l.jsx(de,{icon:Y.phones,color:"c-aqua",value:mu(P.total),label:"Нийт сонссон"}),l.jsx(de,{icon:Y.vibrate,color:"c-gold",value:P.vib.toLocaleString(),label:"Мэдэрсэн чичиргээ"}),l.jsx(de,{icon:Y.music,color:"c-purple",value:Object.keys(P.byTrack).length,label:"Сонссон дуу"}),l.jsx(de,{icon:Y.star,color:"c-rose",value:W?W[0]:"—",label:"Топ төрөл"})]}),l.jsx("h3",{className:"st-h",children:"Сүүлийн 7 хоног"}),l.jsx("div",{className:"st-chart",children:Te.map((re,De)=>l.jsxs("div",{className:"st-col",children:[l.jsx("span",{className:"st-val mono",children:re.sec?mu(re.sec):""}),l.jsx("i",{className:re.today?"today":"",style:{height:Math.max(3,re.sec/tt*100)+"%"}}),l.jsx("span",{className:"mono"+(re.today?" st-today":""),children:re.label})]},De))}),pe.length>0&&l.jsxs(l.Fragment,{children:[l.jsx("h3",{className:"st-h",children:"Хамгийн их сонссон"}),l.jsx("div",{className:"sp-list",children:pe.map(({t:re,sec:De},Nt)=>l.jsxs("button",{className:"sp-lrow st-toprow",onClick:()=>Z(re),children:[l.jsx("span",{className:"sp-lno mono",children:"0"+(Nt+1)}),l.jsx("img",{className:"sp-lthumb",src:re.cover,alt:""}),l.jsxs("span",{className:"sp-lmeta",children:[l.jsx("b",{children:re.title}),l.jsx("i",{children:re.artist})]}),l.jsx("span",{className:"sp-lgenre mono",children:mu(De)}),l.jsx("span",{className:"sp-lact","aria-hidden":"true",children:"▶"})]},re.id))})]}),P.total===0&&l.jsx("p",{className:"adm-empty",children:"Дуу сонсож эхлэхэд статистик энд цуглана 🎶"})]})}function Ct(){var Te,tt;const P=yd(it),W=(Te=n==null?void 0:n.sub)==null?void 0:Te.active,pe=(tt=n==null?void 0:n.sub)!=null&&tt.renews?Math.max(0,Math.ceil((n.sub.renews-Date.now())/864e5)):0;return l.jsxs(l.Fragment,{children:[l.jsx(ze,{title:"Захиалгын удирдлага"}),l.jsxs("div",{className:"bil-plan"+(W||s?" pro":""),children:[l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Идэвхтэй план"}),l.jsx("b",{children:s?"Админ — бүх эрх":W?"МЭДРЭХ PRO":n!=null&&n.sub?"PRO (цуцлагдсан)":"Үнэгүй горим"}),l.jsx("p",{children:s?"Админ эрхтэй тул төлбөр шаардлагагүй.":W?`Дараагийн төлбөр: ${L} — ${pe} хоногийн дараа · 9'900₮`:n!=null&&n.sub?`${L} хүртэл эрх хадгалагдана, дараа нь үнэгүй горимд шилжинэ.`:`Дуу тус бүрээс ${yr} секунд сонсох эрхтэй.`}),W&&!s&&l.jsx("div",{className:"bil-count","aria-label":"Дараагийн төлбөр хүртэл",children:l.jsx("i",{style:{width:Math.min(100,(30-pe)/30*100)+"%"}})})]}),l.jsxs("div",{className:"bil-actions",children:[!s&&W&&l.jsx("button",{className:"sp-prof-btn danger",onClick:()=>{confirm("PRO захиалгаа цуцлах уу? "+L+" хүртэл эрх чинь хадгалагдана.")&&c()},children:"Захиалга цуцлах"}),!s&&!W&&l.jsx("button",{className:"sp-prof-btn accent",onClick:r,children:n!=null&&n.sub?"Сэргээх — 9'900₮/сар":"PRO болох — 9'900₮/сар"})]})]}),l.jsx("h3",{className:"st-h",children:"Төлбөрийн түүх"}),P.length===0?l.jsx("p",{className:"adm-empty",children:"Төлбөрийн түүх хоосон байна"}):l.jsxs("div",{className:"bil-table",children:[l.jsxs("div",{className:"bil-row bil-head",children:[l.jsx("span",{className:"mono",children:"Огноо"}),l.jsx("span",{className:"mono",children:"План"}),l.jsx("span",{className:"mono",children:"Төлбөрийн хэрэгсэл"}),l.jsx("span",{className:"mono",children:"Дүн"}),l.jsx("span",{className:"mono",children:"Төлөв"})]}),P.map(re=>l.jsxs("div",{className:"bil-row",children:[l.jsx("span",{children:new Date(re.date).toLocaleDateString("mn-MN")}),l.jsx("span",{children:re.plan}),l.jsx("span",{className:"bil-mth",children:re.method}),l.jsx("span",{children:l.jsx("b",{children:re.amount})}),l.jsxs("span",{className:"bil-ok",children:["✓ ",re.status]})]},re.id))]}),l.jsx("p",{className:"auth-note mono",style:{textAlign:"left"},children:"Демо горим — Stripe test. Жинхэнэ мөнгө шилжээгүй."})]})}function Rt(){const P=[{ic:"🎵",t:"Дуу сонгох",d:"Картан дээр дарахад дуу тоглоно. Хайлт болон төрлийн шүүлтүүрээр хүссэн дуугаа ол."},{ic:"📳",t:"Чичиргээ мэдрэх",d:"Утсан дээр нээвэл дууны хэмнэлээр утас чичирнэ. Бас = урт хүчтэй, өндөр = богино түргэн."},{ic:"💡",t:"Гэрлээр мэдрэх",d:"Дэлгэцийн гэрэл дууны цохилтоор лугшина. ⛶ товчоор бүтэн дэлгэцийн «Мэдрэх горим» нээгдэнэ."},{ic:"🎛",t:"Өөрт тааруулах",d:"⚙️ цэснээс чичиргээний хүч, гэрлийн эрчим, давтамжийн бүсээ тохируул. Калибровк дахин хийж болно."},{ic:"♥",t:"Цуглуулга",d:"Зүрх дарж дуртай дуугаа, 🔖 дарж дараа сонсох дуугаа хадгал. Зүүн самбарт цуглана."},{ic:"💳",t:"PRO захиалга",d:"Үнэгүй горимд 30 сек сонсоно. PRO бол бүрэн эрхтэй — профайл цэснээс захиалгаа удирдаарай."}];return l.jsxs(l.Fragment,{children:[l.jsx(ze,{title:"Тусламж — Хэрхэн ашиглах вэ?"}),l.jsx("div",{className:"hlp-grid",children:P.map(W=>l.jsxs("div",{className:"hlp-card",children:[l.jsx("span",{className:"hlp-ic","aria-hidden":"true",children:W.ic}),l.jsx("b",{children:W.t}),l.jsx("p",{children:W.d})]},W.t))}),l.jsxs("div",{className:"sp-banner",style:{marginTop:26},children:[l.jsxs("div",{children:[l.jsx("b",{children:"Мэдрэхүйн калибровк"}),l.jsx("p",{children:"Таны мэдрэх босгыг 1 минутын тестээр тодорхойлж, тохиргоог автоматаар тааруулна."})]}),l.jsx("button",{className:"bt bt-a",onClick:()=>Ye(!0),children:"🎛 Калибровк эхлүүлэх"})]})]})}function sn(){const P=p;if(!P)return null;const W=om[P.genre]||lm,pe=W.pattern.reduce((tt,re)=>tt+re,0),Te=(E==null?void 0:E.id)===P.id;return l.jsxs(l.Fragment,{children:[l.jsx(ze,{title:"Дууны дэлгэрэнгүй"}),l.jsxs("div",{className:"dt-wrap",children:[l.jsxs("div",{className:"dt-left",children:[l.jsx("img",{className:"dt-cover",src:P.cover,alt:P.title}),l.jsxs("div",{className:"dt-btns",children:[l.jsx("button",{className:"bt bt-a",onClick:()=>Z(P),children:Te&&N?"⏸ Зогсоох":"▶ Тоглуулах"}),l.jsx("button",{className:"bt",onClick:()=>w(P),children:"📳 Туршиж мэдрэх"})]})]}),l.jsxs("div",{className:"dt-right",children:[l.jsx("span",{className:"sp-chip on dt-genre",children:P.genre}),l.jsx("h2",{className:"dt-title",children:P.title}),l.jsxs("p",{className:"dt-artist",children:["Дуучин: ",P.artist,P.composer&&l.jsxs(l.Fragment,{children:[" · Зохиолч: ",P.composer]})]}),l.jsx("h3",{className:"st-h",children:"Энэ дуу хэрхэн мэдрэгдэх вэ?"}),l.jsx("p",{className:"dt-feel",children:W.text}),l.jsx("div",{className:"dt-bands",children:[["Бас",W.bass,"20—250 Hz"],["Дунд",W.mid,"250 Hz—4 kHz"],["Өндөр",W.high,"4—20 kHz"]].map(([tt,re,De])=>l.jsxs("div",{className:"dt-band",children:[l.jsxs("div",{className:"dt-band-top",children:[l.jsx("b",{children:tt}),l.jsx("span",{className:"mono",children:De}),l.jsxs("span",{className:"dt-pct",children:[re,"%"]})]}),l.jsx("div",{className:"dt-meter",children:l.jsx("i",{style:{width:re+"%"}})})]},tt))}),l.jsx("h3",{className:"st-h",children:"Чичиргээний хэв маяг"}),l.jsx("div",{className:"dt-hap","aria-label":"Чичиргээний хэв маяг",children:W.pattern.map((tt,re)=>re%2===0?l.jsx("i",{style:{flex:tt/pe+" 0 0"},title:tt+" мс чичиргээ"},re):l.jsx("u",{style:{flex:tt/pe+" 0 0"}},re))}),l.jsxs("p",{className:"dt-hap-lb mono",children:[W.pattern.join(" · ")," мс"]})]})]})]})}function ft(){const P=Ys().filter(re=>re.role!=="admin"),W=P.filter(re=>{var De;return(De=re.sub)==null?void 0:De.active}).length,pe=P.reduce((re,De)=>re+yd(De.email).length*9900,0),Te=[...P].sort((re,De)=>(De.created||0)-(re.created||0)).slice(0,5);function tt(re){re.preventDefault();const De=yt.trim();if(De.length<3){H("❌ Зарлалын текстээ бичнэ үү");return}yf(De,"📢"),b(""),H("✅ Зарлал бүх хэрэглэгчид илгээгдлээ"),setTimeout(()=>H(""),3e3)}return l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"ab-head",children:[l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Хяналтын самбар"}),l.jsx("h2",{className:"sp-h",style:{margin:"8px 0 0"},children:"Сайн уу, Админ 🛠"})]}),l.jsx("button",{className:"bt bt-a",onClick:a,children:"Хэрэглэгч · Дуу удирдах →"})]}),l.jsxs("div",{className:"st-cards",children:[l.jsx(de,{icon:Y.users,color:"c-aqua",value:P.length,label:"Нийт хэрэглэгч"}),l.jsx(de,{icon:Y.gem,color:"c-purple",value:W,label:"PRO захиалагч"}),l.jsx(de,{icon:Y.money,color:"c-gold",value:pe.toLocaleString()+"₮",label:"Нийт орлого (демо)"}),l.jsx(de,{icon:Y.music,color:"c-rose",value:V.length,label:"Дууны сан"})]}),l.jsxs("div",{className:"ab-card",children:[l.jsxs("div",{className:"ab-card-h",children:[l.jsx("span",{className:"st-ico c-gold","aria-hidden":"true",children:l.jsx("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.9",strokeLinecap:"round",strokeLinejoin:"round",children:Y.horn})}),l.jsxs("div",{children:[l.jsx("b",{children:"Бүх хэрэглэгчид зарлал илгээх"}),l.jsx("p",{children:"Зарлал хэрэглэгч бүрийн хонхонд шууд очно. Дуу нэмэхэд мэдэгдэл автоматаар илгээгддэг."})]})]}),l.jsxs("form",{className:"ab-bcast",onSubmit:tt,children:[l.jsx("input",{type:"text",value:yt,onChange:re=>b(re.target.value),placeholder:"ж: Маргааш 20:00 цагт шинэ цомог нэмэгдэнэ!","aria-label":"Зарлалын текст"}),l.jsx("button",{type:"submit",className:"bt bt-a",children:"Илгээх"})]}),M&&l.jsx("p",{className:M.startsWith("✅")?"auth-ok":"auth-err",style:{fontSize:13},children:M})]}),l.jsx("h3",{className:"st-h",children:"Сүүлийн бүртгэлүүд"}),Te.length===0?l.jsx("p",{className:"adm-empty",children:"Бүртгүүлсэн хэрэглэгч алга"}):l.jsxs("div",{className:"bil-table",children:[l.jsxs("div",{className:"bil-row bil-head ab-urow",children:[l.jsx("span",{className:"mono",children:"Хэрэглэгч"}),l.jsx("span",{className:"mono",children:"Имэйл"}),l.jsx("span",{className:"mono",children:"Огноо"}),l.jsx("span",{className:"mono",children:"Статус"})]}),Te.map(re=>{var De,Nt;return l.jsxs("div",{className:"bil-row ab-urow",children:[l.jsxs("span",{className:"ab-uname",children:[l.jsx("i",{className:"ab-uav","aria-hidden":"true",children:(re.name||"?").charAt(0).toUpperCase()}),re.name]}),l.jsx("span",{className:"bil-mth",children:re.email}),l.jsx("span",{children:re.created?new Date(re.created).toLocaleDateString("mn-MN"):"—"}),l.jsx("span",{className:(De=re.sub)!=null&&De.active?"bil-ok":"ab-free",children:(Nt=re.sub)!=null&&Nt.active?"💎 PRO":"Үнэгүй"})]},re.email)})]}),l.jsxs("div",{className:"sp-banner",style:{marginTop:30},children:[l.jsxs("div",{children:[l.jsx("b",{children:"Тоглуулагч руу шилжих"}),l.jsx("p",{children:"Хэрэглэгчийн нүдээр аппаа туршиж, дуу сонсож, мэдрэх горимыг шалгаарай."})]}),l.jsx("button",{className:"bt",onClick:()=>f("home"),children:"🎧 Тоглуулагч нээх"})]})]})}function He(){return l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"sp-chips",children:le.map(P=>l.jsx("button",{className:"sp-chip"+(y===P?" on":""),onClick:()=>g(P),children:P},P))}),l.jsx("h2",{className:"sp-h",children:"Тренд дуунууд"}),ce.length===0&&l.jsxs("p",{className:"adm-empty",children:['"',m,'" — олдсонгүй']}),l.jsx("div",{className:"sp-grid",children:ce.map(P=>{const W=(E==null?void 0:E.id)===P.id;return l.jsxs("button",{className:"sp-card"+(W?" on":""),onClick:()=>Z(P),children:[l.jsxs("span",{className:"sp-cover",children:[l.jsx("img",{src:P.cover,alt:"",loading:"lazy"}),l.jsx(Ce,{id:P.id}),l.jsx(Le,{id:P.id}),l.jsx(We,{t:P}),l.jsx("span",{className:"sp-playbtn"+(W&&N?" show":""),"aria-hidden":"true",children:W&&N?"⏸":"▶"}),W&&N&&l.jsxs("span",{className:"pl-eq sp-eq","aria-hidden":"true",children:[l.jsx("u",{}),l.jsx("u",{}),l.jsx("u",{})]})]}),l.jsxs("b",{children:[P.title,P.custom&&l.jsx("em",{className:"sp-new",children:" шинэ"})]}),l.jsxs("i",{children:[P.artist," · ",P.genre]})]},P.id)})}),ce.length>0&&l.jsxs(l.Fragment,{children:[l.jsx("h2",{className:"sp-h sp-h2",children:"Бүх дуунууд"}),l.jsx("div",{className:"sp-list",children:ce.map((P,W)=>{const pe=(E==null?void 0:E.id)===P.id;return l.jsxs("button",{className:"sp-lrow"+(pe?" on":""),onClick:()=>Z(P),children:[l.jsx("span",{className:"sp-lno mono",children:String(W+1).padStart(2,"0")}),l.jsx("img",{className:"sp-lthumb",src:P.cover,alt:"",loading:"lazy"}),l.jsxs("span",{className:"sp-lmeta",children:[l.jsxs("b",{children:[P.title,P.custom&&l.jsx("em",{className:"sp-new",children:" шинэ"})]}),l.jsx("i",{children:P.artist})]}),l.jsx("span",{className:"sp-lgenre mono",children:P.genre}),l.jsx(Ce,{id:P.id,row:!0}),l.jsx(Le,{id:P.id,row:!0}),l.jsx(We,{t:P,row:!0}),l.jsx("span",{className:"sp-lact","aria-hidden":"true",children:pe&&N?l.jsxs("span",{className:"pl-eq",style:{height:14},children:[l.jsx("u",{}),l.jsx("u",{}),l.jsx("u",{})]}):"▶"})]},P.id)})})]}),!i&&l.jsxs("div",{className:"sp-banner",children:[l.jsxs("div",{children:[l.jsx("b",{children:"МЭДРЭХ PRO болоорой"}),l.jsxs("p",{children:["Бүх дууг бүрэн сонсож, чичиргээ + гэрлийн горимыг хязгааргүй мэдэр. Үнэгүй горимд дуу тус бүрээс ",yr," секунд сонсоно."]})]}),l.jsx("button",{className:"bt bt-a",onClick:r,children:"9'900₮ / сар — Захиалах"})]})]})}return l.jsxs("div",{className:"pl-ov sp",children:[l.jsx("audio",{ref:ne,crossOrigin:"anonymous"}),l.jsx("div",{className:"pl-glow",ref:_e,"aria-hidden":"true"}),l.jsxs("header",{className:"sp-top",children:[l.jsxs("span",{className:"sp-logo",children:["МЭДРЭХ",l.jsx("sup",{children:"®"}),s&&l.jsx("em",{className:"sp-admchip",children:"АДМИН"})]}),l.jsxs("div",{className:"sp-center",children:[l.jsx("button",{className:"sp-icbtn"+(u==="home"?" on":""),onClick:()=>f("home"),"aria-label":"Нүүр",title:"Нүүр",children:l.jsxs("svg",{width:"19",height:"19",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("path",{d:"M3 10.5 12 3l9 7.5"}),l.jsx("path",{d:"M5 9.5V21h14V9.5"})]})}),l.jsxs("div",{className:"sp-search",children:[l.jsxs("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round","aria-hidden":"true",children:[l.jsx("circle",{cx:"11",cy:"11",r:"7"}),l.jsx("line",{x1:"21",y1:"21",x2:"16.5",y2:"16.5"})]}),l.jsx("input",{type:"search",placeholder:"Юу сонсмоор байна?",value:m,onFocus:()=>f("home"),onChange:P=>x(P.target.value),"aria-label":"Дуу хайх"})]}),l.jsx("div",{className:"sp-viz","aria-hidden":"true",children:[0,1,2,3,4].map(P=>l.jsx("i",{ref:W=>{Ze.current[P]=W}},P))})]}),l.jsxs("div",{className:"sp-right",children:[!i&&l.jsx("button",{className:"bt bt-a sp-subbtn",onClick:r,children:"Захиалга авах"}),s&&l.jsx("button",{className:"sp-icbtn sp-admbtn"+(u==="admin"?" on":""),onClick:()=>f("admin"),"aria-label":"Хяналтын самбар",title:"Хяналтын самбар",children:l.jsxs("svg",{width:"19",height:"19",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("rect",{x:"3",y:"3",width:"7",height:"9",rx:"1.5"}),l.jsx("rect",{x:"14",y:"3",width:"7",height:"5",rx:"1.5"}),l.jsx("rect",{x:"14",y:"12",width:"7",height:"9",rx:"1.5"}),l.jsx("rect",{x:"3",y:"16",width:"7",height:"5",rx:"1.5"})]})}),l.jsxs("div",{className:"sp-dd-wrap",children:[l.jsxs("button",{className:"sp-icbtn sp-bell"+(Oe?" on":""),onClick:me,"aria-label":"Мэдэгдэл"+(K?" — "+K+" шинэ":""),"aria-expanded":Oe,title:"Мэдэгдэл",children:[l.jsxs("svg",{width:"19",height:"19",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("path",{d:"M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"}),l.jsx("path",{d:"M13.7 21a2 2 0 0 1-3.4 0"})]}),K>0&&l.jsx("span",{className:"sp-bell-n",children:K>9?"9+":K})]}),Oe&&l.jsxs("div",{className:"sp-dd sp-notifs",role:"dialog","aria-label":"Мэдэгдлүүд",children:[l.jsx("span",{className:"mono",children:"Мэдэгдэл"}),I.length===0&&l.jsx("p",{className:"sp-side-empty",children:"Мэдэгдэл алга"}),I.map(P=>l.jsxs("div",{className:"sp-notif"+(P.date>et?" new":""),children:[l.jsx("span",{className:"sp-notif-ic","aria-hidden":"true",children:P.icon}),l.jsxs("div",{children:[l.jsx("p",{children:P.text}),l.jsx("span",{className:"mono",children:mw(P.date)})]})]},P.id))]})]}),l.jsxs("div",{className:"sp-dd-wrap",children:[l.jsx("button",{className:"sp-icbtn"+(se?" on":""),onClick:()=>{ve(!se),Re(!1),qe(!1)},"aria-label":"Мэдрэхүйн тохиргоо","aria-expanded":se,title:"Мэдрэхүйн тохиргоо",children:l.jsxs("svg",{width:"19",height:"19",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("circle",{cx:"12",cy:"12",r:"3"}),l.jsx("path",{d:"M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.11-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1.11 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.09a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.09a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z"})]})}),se&&l.jsxs("div",{className:"sp-dd sp-settings",role:"dialog","aria-label":"Мэдрэхүйн тохиргоо",children:[l.jsx("span",{className:"mono",children:"Мэдрэхүйн тохиргоо"}),l.jsx("label",{className:"sp-set-l",children:"📳 Чичиргээний хүч"}),l.jsx("div",{className:"sp-seg",children:sm.map((P,W)=>l.jsx("button",{className:ue.vib===W?"on":"",onClick:()=>_t({vib:W}),children:P.label},P.label))}),l.jsx("label",{className:"sp-set-l",children:"💡 Гэрлийн эрчим"}),l.jsx("div",{className:"sp-seg",children:am.map((P,W)=>l.jsx("button",{className:ue.light===W?"on":"",onClick:()=>_t({light:W}),children:P.label},P.label))}),l.jsx("label",{className:"sp-set-l",children:"🎚 Мэдрэх давтамжийн бүс"}),l.jsx("div",{className:"sp-bands",children:[["bass","Бас"],["mid","Дунд"],["high","Өндөр"]].map(([P,W])=>l.jsxs("button",{className:ue.bands[P]?"on":"",onClick:()=>_t({bands:{[P]:!ue.bands[P]}}),"aria-pressed":ue.bands[P],children:[ue.bands[P]?"✓ ":"",W]},P))}),l.jsx("button",{className:"sp-prof-btn",onClick:()=>{ve(!1),Ye(!0)},children:"🎛 Калибровк дахин хийх"}),l.jsx("p",{className:"sp-set-note",children:"Сонсголын мэдрэмж хүн бүрд өөр — тохиргоо автоматаар хадгалагдана."})]})]}),l.jsxs("div",{className:"sp-dd-wrap",children:[l.jsx("button",{className:"sp-avatar"+(s?" adm":"")+(ge?" on":""),onClick:()=>{Re(!ge),ve(!1),qe(!1)},"aria-label":"Профайл цэс","aria-expanded":ge,title:n==null?void 0:n.name,children:O}),ge&&l.jsxs("div",{className:"sp-dd sp-profile",role:"dialog","aria-label":"Профайл",children:[l.jsxs("div",{className:"sp-prof-top",children:[l.jsx("span",{className:"sp-avatar sp-avatar-lg","aria-hidden":"true",children:O}),l.jsxs("div",{children:[l.jsx("b",{children:n==null?void 0:n.name}),l.jsx("i",{children:n==null?void 0:n.email})]})]}),l.jsx("div",{className:"sp-prof-sub"+(i?" pro":""),children:s?l.jsxs(l.Fragment,{children:[l.jsx("b",{children:"Админ эрх"}),l.jsx("span",{children:"Бүх боломж нээлттэй"})]}):i?l.jsxs(l.Fragment,{children:[l.jsx("b",{children:"PRO идэвхтэй"}),l.jsxs("span",{children:["Дараагийн төлбөр: ",L]})]}):l.jsxs(l.Fragment,{children:[l.jsx("b",{children:"Үнэгүй горим"}),l.jsxs("span",{children:["Дуу тус бүрээс ",yr," сек"]})]})}),l.jsx("button",{className:"sp-prof-btn",onClick:()=>{Re(!1),f("stats")},children:"📊 Миний статистик"}),l.jsx("button",{className:"sp-prof-btn",onClick:()=>{Re(!1),f("billing")},children:"💳 Захиалга удирдах"}),l.jsx("button",{className:"sp-prof-btn",onClick:()=>{Re(!1),f("help")},children:"❓ Тусламж"}),s&&l.jsx("button",{className:"sp-prof-btn",onClick:()=>{Re(!1),f("admin")},children:"🛠 Хяналтын самбар"}),l.jsx("button",{className:"sp-prof-btn danger",onClick:o,children:"Гарах"})]})]}),l.jsx("button",{className:"auth-x pl-x",onClick:e,"aria-label":"Хаах",children:"✕"})]})]}),(se||ge||Oe)&&l.jsx("div",{className:"sp-dd-veil",onClick:()=>{ve(!1),Re(!1),qe(!1)}}),l.jsxs("div",{className:"sp-shell",children:[l.jsxs("aside",{className:"sp-side",children:[l.jsx("span",{className:"mono sp-side-h",children:"♥ Дуртай дуунууд"}),be.length===0?l.jsxs("div",{className:"sp-empty-tile",children:[l.jsx("span",{className:"sp-empty-ic","aria-hidden":"true",children:l.jsx("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"currentColor",children:l.jsx("path",{d:"M12 21s-7.5-4.9-10-9.2C.3 8.6 2 5 5.5 5c2 0 3.4 1.1 4.2 2.3L12 9.6l2.3-2.3C15.1 6.1 16.5 5 18.5 5 22 5 23.7 8.6 22 11.8 19.5 16.1 12 21 12 21z"})})}),l.jsxs("p",{children:["Дууны ",l.jsx("b",{children:"♥ зүрхэн"})," дээр дарахад дуртай дуу чинь энд цуглана"]})]}):l.jsx(Xe,{tracks:be}),l.jsx("span",{className:"mono sp-side-h",children:"Хадгалсан"}),Ee.length===0?l.jsxs("div",{className:"sp-empty-tile",children:[l.jsx("span",{className:"sp-empty-ic sp-empty-warm","aria-hidden":"true",children:l.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"currentColor",children:l.jsx("path",{d:"M6 2h12a1 1 0 0 1 1 1v19l-7-4.2L5 22V3a1 1 0 0 1 1-1z"})})}),l.jsxs("p",{children:["Дууг ",l.jsx("b",{children:"🔖 хадгалах"})," товчоор тэмдэглээд дараа нь сонсоорой"]})]}):l.jsx(Xe,{tracks:Ee}),ke.length>0&&l.jsxs(l.Fragment,{children:[l.jsx("span",{className:"mono sp-side-h",children:"Саяхан сонссон"}),l.jsx(Xe,{tracks:ke})]})]}),l.jsxs("main",{className:"sp-main",children:[u==="home"&&He(),u==="stats"&&dt(),u==="billing"&&Ct(),u==="help"&&Rt(),u==="detail"&&sn(),u==="admin"&&s&&ft()]})]}),ee&&!i&&l.jsxs("div",{className:"sp-limit",children:[l.jsx("p",{children:"Урьдчилан сонсголт дууслаа — бүтэн дуу сонсохын тулд PRO захиалга аваарай."}),l.jsx("button",{className:"bt bt-a",onClick:r,children:"Захиалга авах →"})]}),l.jsxs("footer",{className:"sp-bar",children:[l.jsx("div",{className:"sp-bar-l",children:E?l.jsxs(l.Fragment,{children:[l.jsx("img",{className:"sp-thumb",src:E.cover,alt:""}),l.jsxs("div",{className:"sp-bar-meta",children:[l.jsx("b",{children:E.title}),l.jsx("i",{children:E.artist})]})]}):l.jsx("span",{className:"sp-bar-hint",children:"Дуу сонгоогүй байна"})}),l.jsxs("div",{className:"sp-bar-c",children:[l.jsxs("div",{className:"sp-ctl",children:[l.jsx("button",{onClick:()=>ci(-1),"aria-label":"Өмнөх дуу",children:"⏮"}),l.jsx("button",{onClick:()=>xt(-10),"aria-label":"10 секунд ухраах",className:"sp-skip",children:"−10с"}),l.jsx("button",{className:"sp-play",onClick:Fe,"aria-label":N?"Зогсоох":"Тоглуулах",children:N?"⏸":"▶"}),l.jsx("button",{onClick:()=>xt(10),"aria-label":"10 секунд урагшлуулах",className:"sp-skip",children:"+10с"}),l.jsx("button",{onClick:()=>ci(1),"aria-label":"Дараагийн дуу",children:"⏭"})]}),l.jsxs("div",{className:"sp-seek",children:[l.jsx("span",{className:"mono",children:cm(z)}),l.jsxs("div",{className:"pl-bar",onClick:Ft,role:"slider","aria-label":"Гүйлгэх","aria-valuemin":0,"aria-valuemax":Math.round(Q),"aria-valuenow":Math.round(z),children:[!i&&l.jsx("i",{className:"pl-lock",style:{left:B+"%"}}),l.jsx("i",{className:"pl-fill",style:{width:k+"%"}})]}),l.jsx("span",{className:"mono",children:cm(Q)})]})]}),l.jsxs("div",{className:"sp-bar-r",children:[l.jsxs("button",{className:"sp-vibro"+(J?" on":""),onClick:()=>F(!J),"aria-pressed":J,title:$e?"Чичиргээ горим":"Утсан дээр чичиргээ ажиллана — энд гэрлийн пульс",children:["📳 ",J?"Асаалттай":"Унтраалттай"]}),l.jsx("button",{className:"sp-icbtn sp-immbtn",onClick:()=>nt(!0),disabled:!E,"aria-label":"Мэдрэх горим — бүтэн дэлгэц",title:E?"Мэдрэх горим":"Эхлээд дуу сонгоорой",children:l.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",children:l.jsx("path",{d:"M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"})})})]})]}),Be&&E&&l.jsxs("div",{className:"sp-imm",onClick:()=>nt(!1),role:"dialog","aria-label":"Мэдрэх горим",children:[l.jsx("img",{className:"sp-imm-bg",src:E.cover,alt:"","aria-hidden":"true"}),l.jsx("div",{className:"sp-imm-veil","aria-hidden":"true"}),l.jsxs("div",{className:"sp-imm-center",children:[l.jsx("span",{className:"sp-imm-ring",ref:we,"aria-hidden":"true"}),l.jsx("img",{className:"sp-imm-cover",src:E.cover,alt:""})]}),l.jsxs("div",{className:"sp-imm-info",children:[l.jsx("span",{className:"mono",children:"Мэдрэх горим"}),l.jsx("h2",{children:E.title}),l.jsxs("p",{children:[E.artist," · ",E.genre]})]}),l.jsx("div",{className:"sp-imm-bars","aria-hidden":"true",children:Array.from({length:28}).map((P,W)=>l.jsx("i",{ref:pe=>{Ve.current[W]=pe}},W))}),l.jsx("span",{className:"sp-imm-exit mono",children:"ESC эсвэл дарж гарна"})]}),l.jsx(pw,{open:Je,onClose:()=>Ye(!1),onDone:P=>_t(P)})]})}const Sr={name:"МЭДРЭХ PRO",price:"9'900₮",period:"сар бүр"},vw="4242424242424242";function um(t){return(t||"").replace(/\D/g,"")}function _w({open:t,onClose:e,user:n,onSubscribed:i}){const[r,s]=ye.useState(!1),[a,o]=ye.useState(""),[c,u]=ye.useState(!1);if(ye.useEffect(()=>{if(!t)return;o(""),u(!1),s(!1);const p=h=>{h.key==="Escape"&&!r&&e()};return addEventListener("keydown",p),()=>removeEventListener("keydown",p)},[t,e,r]),!t)return null;function f(p){p.preventDefault(),o("");const h=new FormData(p.target),m=um(h.get("card")),x=(h.get("exp")||"").trim(),y=um(h.get("cvc"));if(m.length!==16){o("Картын дугаар 16 оронтой байх ёстой");return}const g=x.match(/^(0[1-9]|1[0-2])\s*\/\s*(\d{2})$/);if(!g){o("Дуусах хугацаа MM/YY хэлбэрээр (ж: 08/27)");return}if(new Date(2e3+ +g[2],+g[1],1)<=new Date){o("Картын хугацаа дууссан байна");return}if(y.length<3){o("CVC 3 оронтой байх ёстой");return}if(m!==vw){o("Карт татгалзлаа. Демо горим: 4242 4242 4242 4242 ашиглана уу");return}s(!0),setTimeout(()=>{const v=new Date,_=new Date(v);_.setMonth(_.getMonth()+1);const T={active:!0,plan:Sr.name,since:v.getTime(),renews:_.getTime()},D=Ys(),C=D.find(A=>A.email===n.email);C&&(C.sub=T,Ja(D)),dw(n.email,{id:"inv-"+Date.now(),date:v.getTime(),amount:Sr.price,plan:Sr.name,method:"Карт •••• 4242",status:"Амжилттай"}),s(!1),u(!0),i(T),setTimeout(e,1400)},1600)}return l.jsx("div",{className:"auth-ov",onMouseDown:p=>{p.target===p.currentTarget&&!r&&e()},children:l.jsxs("div",{className:"auth-box sub-box",role:"dialog","aria-modal":"true","aria-label":"Сарын захиалга",children:[l.jsx("button",{className:"auth-x",onClick:e,"aria-label":"Хаах",children:"✕"}),l.jsx("span",{className:"mono",children:"МЭДРЭХ® / Захиалга"}),l.jsxs("div",{className:"sub-plan",children:[l.jsxs("div",{children:[l.jsx("b",{children:Sr.name}),l.jsx("span",{children:"Бүх дууг бүрэн сонсох · чичиргээ + гэрлийн горим · шинэ дуу нэмэгдэх бүрд"})]}),l.jsxs("div",{className:"sub-price",children:[l.jsx("b",{children:Sr.price}),l.jsx("span",{className:"mono",children:Sr.period})]})]}),c?l.jsxs("div",{className:"sub-done",children:[l.jsx("b",{children:"✓ Захиалга идэвхжлээ!"}),l.jsxs("p",{children:["Дараагийн төлбөр: ",new Date(Date.now()+2592e6).toLocaleDateString("mn-MN")]})]}):l.jsxs("form",{onSubmit:f,children:[l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Картын дугаар"}),l.jsx("input",{name:"card",inputMode:"numeric",placeholder:"4242 4242 4242 4242",autoComplete:"cc-number"})]}),l.jsxs("div",{className:"sub-row2",children:[l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Дуусах хугацаа"}),l.jsx("input",{name:"exp",inputMode:"numeric",placeholder:"MM/YY",autoComplete:"cc-exp"})]}),l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"CVC"}),l.jsx("input",{name:"cvc",inputMode:"numeric",placeholder:"123",autoComplete:"cc-csc"})]})]}),a&&l.jsx("p",{className:"auth-err",children:a}),l.jsx("button",{type:"submit",className:"bt bt-a auth-sub",disabled:r,children:r?"Боловсруулж байна…":Sr.price+" төлж захиалах"})]}),l.jsx("p",{className:"auth-note mono",children:"Демо горим (Stripe test) — жинхэнэ мөнгө шилжихгүй · туршилтын карт 4242 4242 4242 4242"})]})})}function xw(){var d;ye.useEffect(()=>(iw(),lw(),nw()),[]);const[t,e]=ye.useState(rw),[n,i]=ye.useState(!1),[r,s]=ye.useState(!1),[a,o]=ye.useState(!1),[c,u]=ye.useState(!1),f=v=>{e(v),Go(v),o(!0)},p=()=>{e(null),Go(null),s(!1),o(!1),u(!1)},h=(t==null?void 0:t.role)==="admin",m=h||!!((d=t==null?void 0:t.sub)!=null&&d.active),x=()=>{t?o(!0):i(!0)},y=v=>{const _={...t,sub:v};e(_),Go(_)},g=()=>{const v={...t,sub:{...t.sub,active:!1}};e(v),Go(v);const _=Ys(),T=_.find(D=>D.email===t.email);T&&(T.sub=v.sub,Ja(_))};return l.jsxs(l.Fragment,{children:[l.jsx(yw,{}),l.jsx("div",{className:"cr",id:"cr"}),l.jsx("div",{className:"cd",id:"cd"}),l.jsx("div",{className:"grid-bg"}),l.jsx("div",{className:"glow g1"}),l.jsx("div",{className:"glow g2"}),l.jsx(Sw,{}),l.jsx(Mw,{user:t,isAdmin:h,onLogin:()=>i(!0),onLogout:p,onAdmin:()=>s(!0),onPlayer:x}),l.jsx(Ew,{}),l.jsx(ww,{}),l.jsx(Cw,{}),l.jsx(bw,{}),l.jsx(Nw,{}),l.jsx(Pw,{}),l.jsx(sw,{open:n,onClose:()=>i(!1),onAuth:f}),l.jsx(fw,{open:r,onClose:()=>s(!1),currentUser:t}),l.jsx(gw,{open:a,onClose:()=>o(!1),user:t,subscribed:m,onSubscribe:()=>u(!0),isAdmin:h,onAdmin:()=>s(!0),onLogout:p,onCancelSub:g}),l.jsx(_w,{open:c,onClose:()=>u(!1),user:t,onSubscribed:y})]})}function yw(){return l.jsxs("div",{className:"pre",id:"pre",children:[l.jsx("b",{children:"МЭДРЭХ"}),l.jsx("b",{id:"pct",style:{fontSize:"clamp(24px,4.5vw,54px)"},children:"0"}),l.jsx("div",{className:"pre-line",children:l.jsx("i",{id:"pbar"})})]})}function Sw(){return l.jsxs("header",{className:"hero",id:"hero",children:[l.jsx("canvas",{id:"stage"}),l.jsx("div",{className:"hero-veil"}),l.jsx("span",{className:"vside vs-l",children:"Сонсголын бэрхшээлтэй хүмүүст"}),l.jsx("span",{className:"vside vs-r",children:"20 Hz — 20 000 Hz"}),l.jsxs("div",{className:"fc fc1","data-sp":"0.12",children:[l.jsxs("div",{className:"fr",children:[l.jsx("canvas",{"data-shot":"stage","data-seed":"11"}),l.jsx("div",{className:"tint t-warm"})]}),l.jsx("span",{className:"cap",children:"Тайз / 40 Hz"})]}),l.jsxs("div",{className:"mon",id:"mon","data-sp":"-0.08",children:[l.jsxs("div",{className:"mh",children:[l.jsx("span",{className:"mono",style:{fontSize:9},children:"Шууд дохио"}),l.jsx("span",{className:"dot"})]}),l.jsx("canvas",{id:"monwave"}),l.jsxs("div",{className:"mf",children:[l.jsx("span",{className:"mono",style:{fontSize:9},children:"Бас"}),l.jsx("span",{className:"mono",style:{fontSize:9},children:"Дунд"}),l.jsx("span",{className:"mono",style:{fontSize:9},children:"Өндөр"})]})]}),l.jsxs("div",{className:"word",children:[l.jsx("div",{className:"w-eyebrow",children:l.jsx("span",{className:"mono",children:"Хөгжмийг мэдрэх систем"})}),l.jsxs("div",{className:"fitbox",id:"fitbox",children:[l.jsx("canvas",{id:"slash"}),l.jsxs("h1",{id:"wm",children:[l.jsx("em",{children:l.jsx("i",{children:"М"})}),l.jsx("em",{children:l.jsx("i",{children:"Э"})}),l.jsx("em",{children:l.jsx("i",{children:"Д"})}),l.jsx("em",{children:l.jsx("i",{children:"Р"})}),l.jsx("em",{children:l.jsx("i",{children:"Э"})}),l.jsx("em",{children:l.jsx("i",{children:"Х"})}),l.jsx("sup",{children:"®"})]})]}),l.jsx("p",{className:"sub",children:"(Дуу авиаг чичиргээ, гэрэл, хөдөлгөөн болгон хөрвүүлнэ)"})]}),l.jsxs("div",{className:"hmeta",children:[l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Мэдрэхүйн суваг"}),l.jsx("b",{children:"Чичиргээ · Гэрэл · Хөдөлгөөн"})]}),l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Давтамжийн бүс"}),l.jsx("b",{children:"3 бүс, тус бүр өөр хэлбэр"})]}),l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Хоцролт"}),l.jsx("b",{children:"40 мс дотор"})]}),l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Платформ"}),l.jsx("b",{children:"Web · Android"})]})]}),l.jsxs("div",{className:"badge",children:[l.jsxs("svg",{viewBox:"0 0 100 100",children:[l.jsx("defs",{children:l.jsx("path",{id:"cp",d:"M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"})}),l.jsx("text",{fill:"#4E5B59",fontFamily:"JetBrains Mono, monospace",fontSize:"8.2",letterSpacing:"3.2",children:l.jsx("textPath",{href:"#cp",children:"ДООШ ГҮЙЛГЭЖ ҮЗ · ДООШ ГҮЙЛГЭЖ ҮЗ · "})})]}),l.jsx("span",{className:"arw",children:"↓"})]})]})}function Mw({user:t,isAdmin:e,onLogin:n,onLogout:i,onAdmin:r,onPlayer:s}){return l.jsxs("nav",{className:"dock",id:"dock",children:[l.jsxs("div",{className:"nav-left",children:[l.jsx("button",{className:"disc",id:"disc","aria-label":"Дуу эхлүүлэх"}),l.jsxs("a",{href:"#top",className:"nav-logo keep",children:["МЭДРЭХ",l.jsx("sup",{children:"®"})]})]}),l.jsxs("div",{className:"nav-links",children:[l.jsx("a",{href:"#top",className:"keep",children:"Нүүр"}),l.jsx("a",{href:"#feel",children:"Мэдрэх"}),l.jsx("a",{href:"#gal",children:"Галерей"}),l.jsx("a",{href:"#how",children:"Хэрхэн"}),l.jsx("button",{className:"nav-play keep",onClick:s,children:"♫ Тоглуулагч"})]}),l.jsxs("div",{className:"nav-right",children:[e&&l.jsx("button",{className:"dock-auth adm-btn keep",onClick:r,children:"Админ"}),t?l.jsxs("button",{className:"dock-auth keep",onClick:i,title:t.email+" · Гарах",children:[t.name," · Гарах"]}):l.jsx("button",{className:"dock-auth keep",onClick:n,children:"Нэвтрэх"})]})]})}const dm=["мэдрэх","чичиргээ","давтамж","хэмнэл","өнгө","мэдрэхүй"];function Ew(){return l.jsx("div",{className:"mq",children:l.jsx("div",{className:"mq-in",children:[...dm,...dm].map((t,e)=>l.jsx("span",{children:t},e))})})}const Tw=[{band:"bass",idx:"01",name:"Бас",hz:"20—250 Hz",ms:"230 · 80 · 230",tot:"540 ms"},{band:"mid",idx:"02",name:"Дунд",hz:"250 Hz—4 kHz",ms:"70 · 50 · 70 · 50 · 70",tot:"310 ms"},{band:"high",idx:"03",name:"Өндөр",hz:"4—20 kHz",ms:"24 × 9",tot:"216 ms"}];function ww(){return l.jsx("section",{id:"feel",children:l.jsxs("div",{className:"wrap",children:[l.jsxs("div",{className:"head rv",children:[l.jsx("div",{className:"eyebrow",children:l.jsx("span",{className:"mono",children:"01 / Хаптик самбар"})}),l.jsxs("h2",{children:[l.jsx("span",{className:"ln",children:l.jsx("i",{children:"Уншихаа боль."})}),l.jsx("span",{className:"ln",children:l.jsx("i",{children:"Дараад үз."})})]}),l.jsx("p",{children:"Давтамжийн гурван бүс, тус бүр өөрийн хаптик хэлбэртэй. Мөр дээр дарахад утас нь тэр хэлбэрээр чичрэнэ."})]}),l.jsxs("div",{className:"console rv",children:[l.jsxs("div",{className:"c-top",children:[l.jsx("span",{children:"№"}),l.jsx("span",{children:"Бүс"}),l.jsx("span",{children:"Давтамж"}),l.jsx("span",{children:"Долгион"}),l.jsx("span",{children:"Хаптик хэв маяг"}),l.jsx("span",{children:"Урт"})]}),Tw.map(t=>l.jsxs("button",{className:"crow","data-band":t.band,children:[l.jsx("span",{className:"ring"}),l.jsx("span",{className:"idx",children:t.idx}),l.jsx("h3",{children:t.name}),l.jsx("span",{className:"hz",children:t.hz}),l.jsx("canvas",{className:"scope","data-band":t.band}),l.jsxs("div",{children:[l.jsx("div",{className:"hap","data-band":t.band}),l.jsx("div",{className:"ms",children:t.ms})]}),l.jsx("span",{className:"tot",children:t.tot})]},t.band))]}),l.jsxs("div",{className:"anz rv",children:[l.jsxs("div",{className:"db",children:[l.jsx("span",{children:"0 dB"}),l.jsx("span",{children:"−20"}),l.jsx("span",{children:"−40"}),l.jsx("span",{children:"−60"})]}),l.jsxs("div",{className:"plot",children:[l.jsx("div",{className:"gl",style:{top:0}}),l.jsx("div",{className:"gl",style:{top:"33.3%"}}),l.jsx("div",{className:"gl",style:{top:"66.6%"}}),l.jsx("div",{className:"gl",style:{top:"100%"}}),l.jsx("div",{className:"bars",id:"bars"})]}),l.jsxs("div",{className:"anz-lb mono",children:[l.jsx("span",{children:"20 Hz"}),l.jsx("span",{children:"250 Hz"}),l.jsx("span",{children:"4 kHz"}),l.jsx("span",{children:"20 kHz"})]})]})]})})}const Aw=[{no:"01",img:a_,tint:"t-cool",name:"Гүн бас",hz:"40 Hz",alt:"Чанга яригчийн ойрын зураг"},{no:"02",img:o_,tint:"t-warm",name:"Танхимын нөсөө",hz:"320 Hz",alt:"Концертын танхим, гэрэлтсэн тайз"},{no:"03",img:l_,tint:"t-cool",name:"Хурц өндөр",hz:"8 kHz",alt:"Лазер гэрлийн туяа бүхий тайз"},{no:"04",img:c_,tint:"t-rose",name:"Цохилтын хэлбэр",hz:"90 Hz",alt:"Гараа өргөсөн үзэгчид"},{no:"05",img:u_,tint:"t-warm",name:"Чимээгүй завсар",hz:"0 Hz",alt:"Микрофоны ойрын зураг"},{no:"06",img:d_,tint:"t-cool",name:"Бүтэн спектр",hz:"20—20k",alt:"Олон өнгийн гэрлийн шоу"}];function Cw(){return l.jsx("div",{className:"gal-outer",id:"gal",children:l.jsxs("div",{className:"gal-sticky",children:[l.jsxs("div",{className:"gal-head",children:[l.jsxs("div",{children:[l.jsx("div",{className:"eyebrow",style:{marginBottom:16},children:l.jsx("span",{className:"mono",children:"02 / Галерей"})}),l.jsx("h2",{children:"Дуу бүр өөрийн дүр төрхтэй"})]}),l.jsxs("div",{className:"gal-prog",children:[l.jsx("span",{className:"mono",id:"galno",children:"01"}),l.jsx("div",{className:"track",children:l.jsx("i",{id:"galbar"})}),l.jsx("span",{className:"mono",children:"06"})]})]}),l.jsx("div",{className:"gal-track",id:"track",children:Aw.map(t=>l.jsxs("div",{className:"slide",children:[l.jsxs("div",{className:"fr",children:[l.jsx("span",{className:"no",children:t.no}),l.jsx("img",{src:t.img,alt:t.alt,loading:"lazy"}),l.jsx("div",{className:`tint ${t.tint}`})]}),l.jsxs("div",{className:"meta",children:[l.jsx("h3",{children:t.name}),l.jsx("span",{className:"mono",children:t.hz})]})]},t.no))})]})})}const Rw=[{n:"01",name:"Дуу орж ирнэ",text:"Утсан дээрээ дуу тоглуулах эсвэл микрофоноор орчны дууг сонсгоно. Ямар ч хөгжим байж болно."},{n:"02",name:"Систем дууг задлана",text:"Апп дууг 3 хэсэгт хуваана — бүдүүн дуу (бөмбөр), дунд дуу (хоолой, гитар), нарийн дуу (цан, исгэрэх)."},{n:"03",name:"Мэдрэмж болгон хувиргана",text:"Бүдүүн дуу = хүчтэй урт чичиргээ, дунд = зөөлөн хэмнэл, нарийн = богино түргэн чичиргээ + гэрэл."},{n:"04",name:"Та мэдэрнэ",text:"Утас гарт чинь чичирч, дэлгэц хөгжмийн хэмнэлээр гэрэлтэнэ. Дуутай бараг зэрэг — нүд ирмэхээс ч хурдан."}];function bw(){return l.jsx("section",{id:"how",children:l.jsxs("div",{className:"wrap",children:[l.jsxs("div",{className:"head rv",children:[l.jsx("div",{className:"eyebrow",children:l.jsx("span",{className:"mono",children:"03 / Хэрхэн ажилладаг вэ"})}),l.jsx("h2",{children:l.jsx("span",{className:"ln",children:l.jsx("i",{children:"Дуу хэрхэн мэдрэмж болдог вэ?"})})}),l.jsx("p",{children:"Сонсголгүй хүн хөгжмийг чихээрээ биш — гараараа, нүдээрээ мэдэрнэ. Энэ нь ердөө 4 алхмаар болдог:"})]}),l.jsx("div",{className:"steps rv",children:Rw.map(t=>l.jsxs("div",{className:"step",children:[l.jsx("span",{className:"n",children:t.n}),l.jsx("h3",{children:t.name}),l.jsx("p",{children:t.text})]},t.n))})]})})}function Nw(){return l.jsx("section",{className:"cta",children:l.jsxs("div",{className:"wrap",children:[l.jsx("span",{className:"mono",children:"Эхлэл"}),l.jsxs("h2",{className:"rv",style:{marginTop:32},children:[l.jsx("span",{className:"ln",children:l.jsx("i",{children:"ЧИМЭЭГҮЙ"})}),l.jsx("span",{className:"ln",children:l.jsx("i",{children:"БАЙДАЛ"})}),l.jsx("span",{className:"ln",children:l.jsx("i",{children:"ХООСОН БИШ"})})]}),l.jsxs("div",{className:"row",children:[l.jsx("button",{className:"bt bt-a mag","data-go":"#feel",children:"Аппыг турших"}),l.jsx("button",{className:"bt mag","data-go":"#how",children:"Хэрхэн ажилладаг вэ"})]})]})})}function Pw(){return l.jsx("footer",{children:l.jsxs("div",{className:"wrap fin",children:[l.jsx("span",{children:"МЭДРЭХ® — дипломын төслийн үзүүлэн"}),l.jsx("span",{className:"mono",children:"Canvas · WebGL · Web Audio API · Vibration API"})]})})}gu.createRoot(document.getElementById("root")).render(l.jsx(xw,{}));
