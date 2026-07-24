(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();var dg={exports:{}},ic={},fg={exports:{}},it={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var to=Symbol.for("react.element"),O0=Symbol.for("react.portal"),B0=Symbol.for("react.fragment"),z0=Symbol.for("react.strict_mode"),j0=Symbol.for("react.profiler"),H0=Symbol.for("react.provider"),V0=Symbol.for("react.context"),G0=Symbol.for("react.forward_ref"),W0=Symbol.for("react.suspense"),X0=Symbol.for("react.memo"),$0=Symbol.for("react.lazy"),mh=Symbol.iterator;function q0(t){return t===null||typeof t!="object"?null:(t=mh&&t[mh]||t["@@iterator"],typeof t=="function"?t:null)}var hg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},pg=Object.assign,mg={};function Ks(t,e,n){this.props=t,this.context=e,this.refs=mg,this.updater=n||hg}Ks.prototype.isReactComponent={};Ks.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Ks.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function gg(){}gg.prototype=Ks.prototype;function ef(t,e,n){this.props=t,this.context=e,this.refs=mg,this.updater=n||hg}var tf=ef.prototype=new gg;tf.constructor=ef;pg(tf,Ks.prototype);tf.isPureReactComponent=!0;var gh=Array.isArray,vg=Object.prototype.hasOwnProperty,nf={current:null},xg={key:!0,ref:!0,__self:!0,__source:!0};function _g(t,e,n){var i,r={},s=null,a=null;if(e!=null)for(i in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(s=""+e.key),e)vg.call(e,i)&&!xg.hasOwnProperty(i)&&(r[i]=e[i]);var o=arguments.length-2;if(o===1)r.children=n;else if(1<o){for(var c=Array(o),u=0;u<o;u++)c[u]=arguments[u+2];r.children=c}if(t&&t.defaultProps)for(i in o=t.defaultProps,o)r[i]===void 0&&(r[i]=o[i]);return{$$typeof:to,type:t,key:s,ref:a,props:r,_owner:nf.current}}function Y0(t,e){return{$$typeof:to,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function rf(t){return typeof t=="object"&&t!==null&&t.$$typeof===to}function K0(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var vh=/\/+/g;function Nc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?K0(""+t.key):e.toString(36)}function al(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case to:case O0:a=!0}}if(a)return a=t,r=r(a),t=i===""?"."+Nc(a,0):i,gh(r)?(n="",t!=null&&(n=t.replace(vh,"$&/")+"/"),al(r,e,n,"",function(u){return u})):r!=null&&(rf(r)&&(r=Y0(r,n+(!r.key||a&&a.key===r.key?"":(""+r.key).replace(vh,"$&/")+"/")+t)),e.push(r)),1;if(a=0,i=i===""?".":i+":",gh(t))for(var o=0;o<t.length;o++){s=t[o];var c=i+Nc(s,o);a+=al(s,e,n,c,r)}else if(c=q0(t),typeof c=="function")for(t=c.call(t),o=0;!(s=t.next()).done;)s=s.value,c=i+Nc(s,o++),a+=al(s,e,n,c,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function go(t,e,n){if(t==null)return t;var i=[],r=0;return al(t,i,"","",function(s){return e.call(n,s,r++)}),i}function Z0(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var rn={current:null},ol={transition:null},Q0={ReactCurrentDispatcher:rn,ReactCurrentBatchConfig:ol,ReactCurrentOwner:nf};function yg(){throw Error("act(...) is not supported in production builds of React.")}it.Children={map:go,forEach:function(t,e,n){go(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return go(t,function(){e++}),e},toArray:function(t){return go(t,function(e){return e})||[]},only:function(t){if(!rf(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};it.Component=Ks;it.Fragment=B0;it.Profiler=j0;it.PureComponent=ef;it.StrictMode=z0;it.Suspense=W0;it.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Q0;it.act=yg;it.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=pg({},t.props),r=t.key,s=t.ref,a=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,a=nf.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var o=t.type.defaultProps;for(c in e)vg.call(e,c)&&!xg.hasOwnProperty(c)&&(i[c]=e[c]===void 0&&o!==void 0?o[c]:e[c])}var c=arguments.length-2;if(c===1)i.children=n;else if(1<c){o=Array(c);for(var u=0;u<c;u++)o[u]=arguments[u+2];i.children=o}return{$$typeof:to,type:t.type,key:r,ref:s,props:i,_owner:a}};it.createContext=function(t){return t={$$typeof:V0,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:H0,_context:t},t.Consumer=t};it.createElement=_g;it.createFactory=function(t){var e=_g.bind(null,t);return e.type=t,e};it.createRef=function(){return{current:null}};it.forwardRef=function(t){return{$$typeof:G0,render:t}};it.isValidElement=rf;it.lazy=function(t){return{$$typeof:$0,_payload:{_status:-1,_result:t},_init:Z0}};it.memo=function(t,e){return{$$typeof:X0,type:t,compare:e===void 0?null:e}};it.startTransition=function(t){var e=ol.transition;ol.transition={};try{t()}finally{ol.transition=e}};it.unstable_act=yg;it.useCallback=function(t,e){return rn.current.useCallback(t,e)};it.useContext=function(t){return rn.current.useContext(t)};it.useDebugValue=function(){};it.useDeferredValue=function(t){return rn.current.useDeferredValue(t)};it.useEffect=function(t,e){return rn.current.useEffect(t,e)};it.useId=function(){return rn.current.useId()};it.useImperativeHandle=function(t,e,n){return rn.current.useImperativeHandle(t,e,n)};it.useInsertionEffect=function(t,e){return rn.current.useInsertionEffect(t,e)};it.useLayoutEffect=function(t,e){return rn.current.useLayoutEffect(t,e)};it.useMemo=function(t,e){return rn.current.useMemo(t,e)};it.useReducer=function(t,e,n){return rn.current.useReducer(t,e,n)};it.useRef=function(t){return rn.current.useRef(t)};it.useState=function(t){return rn.current.useState(t)};it.useSyncExternalStore=function(t,e,n){return rn.current.useSyncExternalStore(t,e,n)};it.useTransition=function(){return rn.current.useTransition()};it.version="18.3.1";fg.exports=it;var L=fg.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var J0=L,e_=Symbol.for("react.element"),t_=Symbol.for("react.fragment"),n_=Object.prototype.hasOwnProperty,i_=J0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,r_={key:!0,ref:!0,__self:!0,__source:!0};function Sg(t,e,n){var i,r={},s=null,a=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);for(i in e)n_.call(e,i)&&!r_.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:e_,type:t,key:s,ref:a,props:r,_owner:i_.current}}ic.Fragment=t_;ic.jsx=Sg;ic.jsxs=Sg;dg.exports=ic;var l=dg.exports,Gu={},Mg={exports:{}},En={},Eg={exports:{}},wg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(k,ie){var re=k.length;k.push(ie);e:for(;0<re;){var ue=re-1>>>1,Pe=k[ue];if(0<r(Pe,ie))k[ue]=ie,k[re]=Pe,re=ue;else break e}}function n(k){return k.length===0?null:k[0]}function i(k){if(k.length===0)return null;var ie=k[0],re=k.pop();if(re!==ie){k[0]=re;e:for(var ue=0,Pe=k.length,tt=Pe>>>1;ue<tt;){var q=2*(ue+1)-1,ae=k[q],ve=q+1,ge=k[ve];if(0>r(ae,re))ve<Pe&&0>r(ge,ae)?(k[ue]=ge,k[ve]=re,ue=ve):(k[ue]=ae,k[q]=re,ue=q);else if(ve<Pe&&0>r(ge,re))k[ue]=ge,k[ve]=re,ue=ve;else break e}}return ie}function r(k,ie){var re=k.sortIndex-ie.sortIndex;return re!==0?re:k.id-ie.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,o=a.now();t.unstable_now=function(){return a.now()-o}}var c=[],u=[],f=1,p=null,h=3,m=!1,y=!1,v=!1,g=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,x=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function _(k){for(var ie=n(u);ie!==null;){if(ie.callback===null)i(u);else if(ie.startTime<=k)i(u),ie.sortIndex=ie.expirationTime,e(c,ie);else break;ie=n(u)}}function E(k){if(v=!1,_(k),!y)if(n(c)!==null)y=!0,Z(R);else{var ie=n(u);ie!==null&&ee(E,ie.startTime-k)}}function R(k,ie){y=!1,v&&(v=!1,d(b),b=-1),m=!0;var re=h;try{for(_(ie),p=n(c);p!==null&&(!(p.expirationTime>ie)||k&&!P());){var ue=p.callback;if(typeof ue=="function"){p.callback=null,h=p.priorityLevel;var Pe=ue(p.expirationTime<=ie);ie=t.unstable_now(),typeof Pe=="function"?p.callback=Pe:p===n(c)&&i(c),_(ie)}else i(c);p=n(c)}if(p!==null)var tt=!0;else{var q=n(u);q!==null&&ee(E,q.startTime-ie),tt=!1}return tt}finally{p=null,h=re,m=!1}}var A=!1,C=null,b=-1,S=5,M=-1;function P(){return!(t.unstable_now()-M<S)}function X(){if(C!==null){var k=t.unstable_now();M=k;var ie=!0;try{ie=C(!0,k)}finally{ie?j():(A=!1,C=null)}}else A=!1}var j;if(typeof x=="function")j=function(){x(X)};else if(typeof MessageChannel<"u"){var ne=new MessageChannel,$=ne.port2;ne.port1.onmessage=X,j=function(){$.postMessage(null)}}else j=function(){g(X,0)};function Z(k){C=k,A||(A=!0,j())}function ee(k,ie){b=g(function(){k(t.unstable_now())},ie)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(k){k.callback=null},t.unstable_continueExecution=function(){y||m||(y=!0,Z(R))},t.unstable_forceFrameRate=function(k){0>k||125<k?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):S=0<k?Math.floor(1e3/k):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return n(c)},t.unstable_next=function(k){switch(h){case 1:case 2:case 3:var ie=3;break;default:ie=h}var re=h;h=ie;try{return k()}finally{h=re}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(k,ie){switch(k){case 1:case 2:case 3:case 4:case 5:break;default:k=3}var re=h;h=k;try{return ie()}finally{h=re}},t.unstable_scheduleCallback=function(k,ie,re){var ue=t.unstable_now();switch(typeof re=="object"&&re!==null?(re=re.delay,re=typeof re=="number"&&0<re?ue+re:ue):re=ue,k){case 1:var Pe=-1;break;case 2:Pe=250;break;case 5:Pe=1073741823;break;case 4:Pe=1e4;break;default:Pe=5e3}return Pe=re+Pe,k={id:f++,callback:ie,priorityLevel:k,startTime:re,expirationTime:Pe,sortIndex:-1},re>ue?(k.sortIndex=re,e(u,k),n(c)===null&&k===n(u)&&(v?(d(b),b=-1):v=!0,ee(E,re-ue))):(k.sortIndex=Pe,e(c,k),y||m||(y=!0,Z(R))),k},t.unstable_shouldYield=P,t.unstable_wrapCallback=function(k){var ie=h;return function(){var re=h;h=ie;try{return k.apply(this,arguments)}finally{h=re}}}})(wg);Eg.exports=wg;var s_=Eg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var a_=L,Mn=s_;function he(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Tg=new Set,Fa={};function Yr(t,e){ks(t,e),ks(t+"Capture",e)}function ks(t,e){for(Fa[t]=e,t=0;t<e.length;t++)Tg.add(e[t])}var Ti=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Wu=Object.prototype.hasOwnProperty,o_=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,xh={},_h={};function l_(t){return Wu.call(_h,t)?!0:Wu.call(xh,t)?!1:o_.test(t)?_h[t]=!0:(xh[t]=!0,!1)}function c_(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function u_(t,e,n,i){if(e===null||typeof e>"u"||c_(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function sn(t,e,n,i,r,s,a){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=a}var $t={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){$t[t]=new sn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];$t[e]=new sn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){$t[t]=new sn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){$t[t]=new sn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){$t[t]=new sn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){$t[t]=new sn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){$t[t]=new sn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){$t[t]=new sn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){$t[t]=new sn(t,5,!1,t.toLowerCase(),null,!1,!1)});var sf=/[\-:]([a-z])/g;function af(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(sf,af);$t[e]=new sn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(sf,af);$t[e]=new sn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(sf,af);$t[e]=new sn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){$t[t]=new sn(t,1,!1,t.toLowerCase(),null,!1,!1)});$t.xlinkHref=new sn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){$t[t]=new sn(t,1,!1,t.toLowerCase(),null,!0,!0)});function of(t,e,n,i){var r=$t.hasOwnProperty(e)?$t[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(u_(e,n,r,i)&&(n=null),i||r===null?l_(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Li=a_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,vo=Symbol.for("react.element"),ms=Symbol.for("react.portal"),gs=Symbol.for("react.fragment"),lf=Symbol.for("react.strict_mode"),Xu=Symbol.for("react.profiler"),Cg=Symbol.for("react.provider"),Ag=Symbol.for("react.context"),cf=Symbol.for("react.forward_ref"),$u=Symbol.for("react.suspense"),qu=Symbol.for("react.suspense_list"),uf=Symbol.for("react.memo"),Vi=Symbol.for("react.lazy"),bg=Symbol.for("react.offscreen"),yh=Symbol.iterator;function ra(t){return t===null||typeof t!="object"?null:(t=yh&&t[yh]||t["@@iterator"],typeof t=="function"?t:null)}var bt=Object.assign,Pc;function Sa(t){if(Pc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Pc=e&&e[1]||""}return`
`+Pc+t}var Lc=!1;function Dc(t,e){if(!t||Lc)return"";Lc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(u){var i=u}Reflect.construct(t,[],e)}else{try{e.call()}catch(u){i=u}t.call(e.prototype)}else{try{throw Error()}catch(u){i=u}t()}}catch(u){if(u&&i&&typeof u.stack=="string"){for(var r=u.stack.split(`
`),s=i.stack.split(`
`),a=r.length-1,o=s.length-1;1<=a&&0<=o&&r[a]!==s[o];)o--;for(;1<=a&&0<=o;a--,o--)if(r[a]!==s[o]){if(a!==1||o!==1)do if(a--,o--,0>o||r[a]!==s[o]){var c=`
`+r[a].replace(" at new "," at ");return t.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",t.displayName)),c}while(1<=a&&0<=o);break}}}finally{Lc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Sa(t):""}function d_(t){switch(t.tag){case 5:return Sa(t.type);case 16:return Sa("Lazy");case 13:return Sa("Suspense");case 19:return Sa("SuspenseList");case 0:case 2:case 15:return t=Dc(t.type,!1),t;case 11:return t=Dc(t.type.render,!1),t;case 1:return t=Dc(t.type,!0),t;default:return""}}function Yu(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case gs:return"Fragment";case ms:return"Portal";case Xu:return"Profiler";case lf:return"StrictMode";case $u:return"Suspense";case qu:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Ag:return(t.displayName||"Context")+".Consumer";case Cg:return(t._context.displayName||"Context")+".Provider";case cf:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case uf:return e=t.displayName||null,e!==null?e:Yu(t.type)||"Memo";case Vi:e=t._payload,t=t._init;try{return Yu(t(e))}catch{}}return null}function f_(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Yu(e);case 8:return e===lf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function cr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Rg(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function h_(t){var e=Rg(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(a){i=""+a,s.call(this,a)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(a){i=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function xo(t){t._valueTracker||(t._valueTracker=h_(t))}function Ng(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=Rg(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Sl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Ku(t,e){var n=e.checked;return bt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Sh(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=cr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Pg(t,e){e=e.checked,e!=null&&of(t,"checked",e,!1)}function Zu(t,e){Pg(t,e);var n=cr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Qu(t,e.type,n):e.hasOwnProperty("defaultValue")&&Qu(t,e.type,cr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Mh(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Qu(t,e,n){(e!=="number"||Sl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Ma=Array.isArray;function bs(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+cr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Ju(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(he(91));return bt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Eh(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(he(92));if(Ma(n)){if(1<n.length)throw Error(he(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:cr(n)}}function Lg(t,e){var n=cr(e.value),i=cr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function wh(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Dg(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ed(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Dg(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var _o,Ig=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(_o=_o||document.createElement("div"),_o.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=_o.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function ka(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Ca={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},p_=["Webkit","ms","Moz","O"];Object.keys(Ca).forEach(function(t){p_.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Ca[e]=Ca[t]})});function Ug(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Ca.hasOwnProperty(t)&&Ca[t]?(""+e).trim():e+"px"}function Fg(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Ug(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var m_=bt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function td(t,e){if(e){if(m_[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(he(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(he(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(he(61))}if(e.style!=null&&typeof e.style!="object")throw Error(he(62))}}function nd(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var id=null;function df(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var rd=null,Rs=null,Ns=null;function Th(t){if(t=ro(t)){if(typeof rd!="function")throw Error(he(280));var e=t.stateNode;e&&(e=lc(e),rd(t.stateNode,t.type,e))}}function kg(t){Rs?Ns?Ns.push(t):Ns=[t]:Rs=t}function Og(){if(Rs){var t=Rs,e=Ns;if(Ns=Rs=null,Th(t),e)for(t=0;t<e.length;t++)Th(e[t])}}function Bg(t,e){return t(e)}function zg(){}var Ic=!1;function jg(t,e,n){if(Ic)return t(e,n);Ic=!0;try{return Bg(t,e,n)}finally{Ic=!1,(Rs!==null||Ns!==null)&&(zg(),Og())}}function Oa(t,e){var n=t.stateNode;if(n===null)return null;var i=lc(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(he(231,e,typeof n));return n}var sd=!1;if(Ti)try{var sa={};Object.defineProperty(sa,"passive",{get:function(){sd=!0}}),window.addEventListener("test",sa,sa),window.removeEventListener("test",sa,sa)}catch{sd=!1}function g_(t,e,n,i,r,s,a,o,c){var u=Array.prototype.slice.call(arguments,3);try{e.apply(n,u)}catch(f){this.onError(f)}}var Aa=!1,Ml=null,El=!1,ad=null,v_={onError:function(t){Aa=!0,Ml=t}};function x_(t,e,n,i,r,s,a,o,c){Aa=!1,Ml=null,g_.apply(v_,arguments)}function __(t,e,n,i,r,s,a,o,c){if(x_.apply(this,arguments),Aa){if(Aa){var u=Ml;Aa=!1,Ml=null}else throw Error(he(198));El||(El=!0,ad=u)}}function Kr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Hg(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Ch(t){if(Kr(t)!==t)throw Error(he(188))}function y_(t){var e=t.alternate;if(!e){if(e=Kr(t),e===null)throw Error(he(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return Ch(r),t;if(s===i)return Ch(r),e;s=s.sibling}throw Error(he(188))}if(n.return!==i.return)n=r,i=s;else{for(var a=!1,o=r.child;o;){if(o===n){a=!0,n=r,i=s;break}if(o===i){a=!0,i=r,n=s;break}o=o.sibling}if(!a){for(o=s.child;o;){if(o===n){a=!0,n=s,i=r;break}if(o===i){a=!0,i=s,n=r;break}o=o.sibling}if(!a)throw Error(he(189))}}if(n.alternate!==i)throw Error(he(190))}if(n.tag!==3)throw Error(he(188));return n.stateNode.current===n?t:e}function Vg(t){return t=y_(t),t!==null?Gg(t):null}function Gg(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Gg(t);if(e!==null)return e;t=t.sibling}return null}var Wg=Mn.unstable_scheduleCallback,Ah=Mn.unstable_cancelCallback,S_=Mn.unstable_shouldYield,M_=Mn.unstable_requestPaint,Pt=Mn.unstable_now,E_=Mn.unstable_getCurrentPriorityLevel,ff=Mn.unstable_ImmediatePriority,Xg=Mn.unstable_UserBlockingPriority,wl=Mn.unstable_NormalPriority,w_=Mn.unstable_LowPriority,$g=Mn.unstable_IdlePriority,rc=null,ai=null;function T_(t){if(ai&&typeof ai.onCommitFiberRoot=="function")try{ai.onCommitFiberRoot(rc,t,void 0,(t.current.flags&128)===128)}catch{}}var Yn=Math.clz32?Math.clz32:b_,C_=Math.log,A_=Math.LN2;function b_(t){return t>>>=0,t===0?32:31-(C_(t)/A_|0)|0}var yo=64,So=4194304;function Ea(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Tl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,a=n&268435455;if(a!==0){var o=a&~r;o!==0?i=Ea(o):(s&=a,s!==0&&(i=Ea(s)))}else a=n&~r,a!==0?i=Ea(a):s!==0&&(i=Ea(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-Yn(e),r=1<<n,i|=t[n],e&=~r;return i}function R_(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function N_(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var a=31-Yn(s),o=1<<a,c=r[a];c===-1?(!(o&n)||o&i)&&(r[a]=R_(o,e)):c<=e&&(t.expiredLanes|=o),s&=~o}}function od(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function qg(){var t=yo;return yo<<=1,!(yo&4194240)&&(yo=64),t}function Uc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function no(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Yn(e),t[e]=n}function P_(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-Yn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function hf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-Yn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var pt=0;function Yg(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Kg,pf,Zg,Qg,Jg,ld=!1,Mo=[],Qi=null,Ji=null,er=null,Ba=new Map,za=new Map,Wi=[],L_="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function bh(t,e){switch(t){case"focusin":case"focusout":Qi=null;break;case"dragenter":case"dragleave":Ji=null;break;case"mouseover":case"mouseout":er=null;break;case"pointerover":case"pointerout":Ba.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":za.delete(e.pointerId)}}function aa(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=ro(e),e!==null&&pf(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function D_(t,e,n,i,r){switch(e){case"focusin":return Qi=aa(Qi,t,e,n,i,r),!0;case"dragenter":return Ji=aa(Ji,t,e,n,i,r),!0;case"mouseover":return er=aa(er,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return Ba.set(s,aa(Ba.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,za.set(s,aa(za.get(s)||null,t,e,n,i,r)),!0}return!1}function ev(t){var e=Ur(t.target);if(e!==null){var n=Kr(e);if(n!==null){if(e=n.tag,e===13){if(e=Hg(n),e!==null){t.blockedOn=e,Jg(t.priority,function(){Zg(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function ll(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=cd(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);id=i,n.target.dispatchEvent(i),id=null}else return e=ro(n),e!==null&&pf(e),t.blockedOn=n,!1;e.shift()}return!0}function Rh(t,e,n){ll(t)&&n.delete(e)}function I_(){ld=!1,Qi!==null&&ll(Qi)&&(Qi=null),Ji!==null&&ll(Ji)&&(Ji=null),er!==null&&ll(er)&&(er=null),Ba.forEach(Rh),za.forEach(Rh)}function oa(t,e){t.blockedOn===e&&(t.blockedOn=null,ld||(ld=!0,Mn.unstable_scheduleCallback(Mn.unstable_NormalPriority,I_)))}function ja(t){function e(r){return oa(r,t)}if(0<Mo.length){oa(Mo[0],t);for(var n=1;n<Mo.length;n++){var i=Mo[n];i.blockedOn===t&&(i.blockedOn=null)}}for(Qi!==null&&oa(Qi,t),Ji!==null&&oa(Ji,t),er!==null&&oa(er,t),Ba.forEach(e),za.forEach(e),n=0;n<Wi.length;n++)i=Wi[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Wi.length&&(n=Wi[0],n.blockedOn===null);)ev(n),n.blockedOn===null&&Wi.shift()}var Ps=Li.ReactCurrentBatchConfig,Cl=!0;function U_(t,e,n,i){var r=pt,s=Ps.transition;Ps.transition=null;try{pt=1,mf(t,e,n,i)}finally{pt=r,Ps.transition=s}}function F_(t,e,n,i){var r=pt,s=Ps.transition;Ps.transition=null;try{pt=4,mf(t,e,n,i)}finally{pt=r,Ps.transition=s}}function mf(t,e,n,i){if(Cl){var r=cd(t,e,n,i);if(r===null)Wc(t,e,i,Al,n),bh(t,i);else if(D_(r,t,e,n,i))i.stopPropagation();else if(bh(t,i),e&4&&-1<L_.indexOf(t)){for(;r!==null;){var s=ro(r);if(s!==null&&Kg(s),s=cd(t,e,n,i),s===null&&Wc(t,e,i,Al,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Wc(t,e,i,null,n)}}var Al=null;function cd(t,e,n,i){if(Al=null,t=df(i),t=Ur(t),t!==null)if(e=Kr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Hg(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Al=t,null}function tv(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(E_()){case ff:return 1;case Xg:return 4;case wl:case w_:return 16;case $g:return 536870912;default:return 16}default:return 16}}var qi=null,gf=null,cl=null;function nv(){if(cl)return cl;var t,e=gf,n=e.length,i,r="value"in qi?qi.value:qi.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var a=n-t;for(i=1;i<=a&&e[n-i]===r[s-i];i++);return cl=r.slice(t,1<i?1-i:void 0)}function ul(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Eo(){return!0}function Nh(){return!1}function wn(t){function e(n,i,r,s,a){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Eo:Nh,this.isPropagationStopped=Nh,this}return bt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Eo)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Eo)},persist:function(){},isPersistent:Eo}),e}var Zs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},vf=wn(Zs),io=bt({},Zs,{view:0,detail:0}),k_=wn(io),Fc,kc,la,sc=bt({},io,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:xf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==la&&(la&&t.type==="mousemove"?(Fc=t.screenX-la.screenX,kc=t.screenY-la.screenY):kc=Fc=0,la=t),Fc)},movementY:function(t){return"movementY"in t?t.movementY:kc}}),Ph=wn(sc),O_=bt({},sc,{dataTransfer:0}),B_=wn(O_),z_=bt({},io,{relatedTarget:0}),Oc=wn(z_),j_=bt({},Zs,{animationName:0,elapsedTime:0,pseudoElement:0}),H_=wn(j_),V_=bt({},Zs,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),G_=wn(V_),W_=bt({},Zs,{data:0}),Lh=wn(W_),X_={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},$_={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},q_={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Y_(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=q_[t])?!!e[t]:!1}function xf(){return Y_}var K_=bt({},io,{key:function(t){if(t.key){var e=X_[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=ul(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?$_[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:xf,charCode:function(t){return t.type==="keypress"?ul(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ul(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Z_=wn(K_),Q_=bt({},sc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Dh=wn(Q_),J_=bt({},io,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:xf}),ey=wn(J_),ty=bt({},Zs,{propertyName:0,elapsedTime:0,pseudoElement:0}),ny=wn(ty),iy=bt({},sc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),ry=wn(iy),sy=[9,13,27,32],_f=Ti&&"CompositionEvent"in window,ba=null;Ti&&"documentMode"in document&&(ba=document.documentMode);var ay=Ti&&"TextEvent"in window&&!ba,iv=Ti&&(!_f||ba&&8<ba&&11>=ba),Ih=" ",Uh=!1;function rv(t,e){switch(t){case"keyup":return sy.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function sv(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var vs=!1;function oy(t,e){switch(t){case"compositionend":return sv(e);case"keypress":return e.which!==32?null:(Uh=!0,Ih);case"textInput":return t=e.data,t===Ih&&Uh?null:t;default:return null}}function ly(t,e){if(vs)return t==="compositionend"||!_f&&rv(t,e)?(t=nv(),cl=gf=qi=null,vs=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return iv&&e.locale!=="ko"?null:e.data;default:return null}}var cy={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Fh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!cy[t.type]:e==="textarea"}function av(t,e,n,i){kg(i),e=bl(e,"onChange"),0<e.length&&(n=new vf("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var Ra=null,Ha=null;function uy(t){vv(t,0)}function ac(t){var e=ys(t);if(Ng(e))return t}function dy(t,e){if(t==="change")return e}var ov=!1;if(Ti){var Bc;if(Ti){var zc="oninput"in document;if(!zc){var kh=document.createElement("div");kh.setAttribute("oninput","return;"),zc=typeof kh.oninput=="function"}Bc=zc}else Bc=!1;ov=Bc&&(!document.documentMode||9<document.documentMode)}function Oh(){Ra&&(Ra.detachEvent("onpropertychange",lv),Ha=Ra=null)}function lv(t){if(t.propertyName==="value"&&ac(Ha)){var e=[];av(e,Ha,t,df(t)),jg(uy,e)}}function fy(t,e,n){t==="focusin"?(Oh(),Ra=e,Ha=n,Ra.attachEvent("onpropertychange",lv)):t==="focusout"&&Oh()}function hy(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return ac(Ha)}function py(t,e){if(t==="click")return ac(e)}function my(t,e){if(t==="input"||t==="change")return ac(e)}function gy(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Qn=typeof Object.is=="function"?Object.is:gy;function Va(t,e){if(Qn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Wu.call(e,r)||!Qn(t[r],e[r]))return!1}return!0}function Bh(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function zh(t,e){var n=Bh(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Bh(n)}}function cv(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?cv(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function uv(){for(var t=window,e=Sl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Sl(t.document)}return e}function yf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function vy(t){var e=uv(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&cv(n.ownerDocument.documentElement,n)){if(i!==null&&yf(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=zh(n,s);var a=zh(n,i);r&&a&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==a.node||t.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var xy=Ti&&"documentMode"in document&&11>=document.documentMode,xs=null,ud=null,Na=null,dd=!1;function jh(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;dd||xs==null||xs!==Sl(i)||(i=xs,"selectionStart"in i&&yf(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Na&&Va(Na,i)||(Na=i,i=bl(ud,"onSelect"),0<i.length&&(e=new vf("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=xs)))}function wo(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var _s={animationend:wo("Animation","AnimationEnd"),animationiteration:wo("Animation","AnimationIteration"),animationstart:wo("Animation","AnimationStart"),transitionend:wo("Transition","TransitionEnd")},jc={},dv={};Ti&&(dv=document.createElement("div").style,"AnimationEvent"in window||(delete _s.animationend.animation,delete _s.animationiteration.animation,delete _s.animationstart.animation),"TransitionEvent"in window||delete _s.transitionend.transition);function oc(t){if(jc[t])return jc[t];if(!_s[t])return t;var e=_s[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in dv)return jc[t]=e[n];return t}var fv=oc("animationend"),hv=oc("animationiteration"),pv=oc("animationstart"),mv=oc("transitionend"),gv=new Map,Hh="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function pr(t,e){gv.set(t,e),Yr(e,[t])}for(var Hc=0;Hc<Hh.length;Hc++){var Vc=Hh[Hc],_y=Vc.toLowerCase(),yy=Vc[0].toUpperCase()+Vc.slice(1);pr(_y,"on"+yy)}pr(fv,"onAnimationEnd");pr(hv,"onAnimationIteration");pr(pv,"onAnimationStart");pr("dblclick","onDoubleClick");pr("focusin","onFocus");pr("focusout","onBlur");pr(mv,"onTransitionEnd");ks("onMouseEnter",["mouseout","mouseover"]);ks("onMouseLeave",["mouseout","mouseover"]);ks("onPointerEnter",["pointerout","pointerover"]);ks("onPointerLeave",["pointerout","pointerover"]);Yr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Yr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Yr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Yr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Yr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Yr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var wa="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Sy=new Set("cancel close invalid load scroll toggle".split(" ").concat(wa));function Vh(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,__(i,e,void 0,t),t.currentTarget=null}function vv(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var a=i.length-1;0<=a;a--){var o=i[a],c=o.instance,u=o.currentTarget;if(o=o.listener,c!==s&&r.isPropagationStopped())break e;Vh(r,o,u),s=c}else for(a=0;a<i.length;a++){if(o=i[a],c=o.instance,u=o.currentTarget,o=o.listener,c!==s&&r.isPropagationStopped())break e;Vh(r,o,u),s=c}}}if(El)throw t=ad,El=!1,ad=null,t}function yt(t,e){var n=e[gd];n===void 0&&(n=e[gd]=new Set);var i=t+"__bubble";n.has(i)||(xv(e,t,2,!1),n.add(i))}function Gc(t,e,n){var i=0;e&&(i|=4),xv(n,t,i,e)}var To="_reactListening"+Math.random().toString(36).slice(2);function Ga(t){if(!t[To]){t[To]=!0,Tg.forEach(function(n){n!=="selectionchange"&&(Sy.has(n)||Gc(n,!1,t),Gc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[To]||(e[To]=!0,Gc("selectionchange",!1,e))}}function xv(t,e,n,i){switch(tv(e)){case 1:var r=U_;break;case 4:r=F_;break;default:r=mf}n=r.bind(null,e,n,t),r=void 0,!sd||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Wc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var o=i.stateNode.containerInfo;if(o===r||o.nodeType===8&&o.parentNode===r)break;if(a===4)for(a=i.return;a!==null;){var c=a.tag;if((c===3||c===4)&&(c=a.stateNode.containerInfo,c===r||c.nodeType===8&&c.parentNode===r))return;a=a.return}for(;o!==null;){if(a=Ur(o),a===null)return;if(c=a.tag,c===5||c===6){i=s=a;continue e}o=o.parentNode}}i=i.return}jg(function(){var u=s,f=df(n),p=[];e:{var h=gv.get(t);if(h!==void 0){var m=vf,y=t;switch(t){case"keypress":if(ul(n)===0)break e;case"keydown":case"keyup":m=Z_;break;case"focusin":y="focus",m=Oc;break;case"focusout":y="blur",m=Oc;break;case"beforeblur":case"afterblur":m=Oc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=Ph;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=B_;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=ey;break;case fv:case hv:case pv:m=H_;break;case mv:m=ny;break;case"scroll":m=k_;break;case"wheel":m=ry;break;case"copy":case"cut":case"paste":m=G_;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=Dh}var v=(e&4)!==0,g=!v&&t==="scroll",d=v?h!==null?h+"Capture":null:h;v=[];for(var x=u,_;x!==null;){_=x;var E=_.stateNode;if(_.tag===5&&E!==null&&(_=E,d!==null&&(E=Oa(x,d),E!=null&&v.push(Wa(x,E,_)))),g)break;x=x.return}0<v.length&&(h=new m(h,y,null,n,f),p.push({event:h,listeners:v}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",m=t==="mouseout"||t==="pointerout",h&&n!==id&&(y=n.relatedTarget||n.fromElement)&&(Ur(y)||y[Ci]))break e;if((m||h)&&(h=f.window===f?f:(h=f.ownerDocument)?h.defaultView||h.parentWindow:window,m?(y=n.relatedTarget||n.toElement,m=u,y=y?Ur(y):null,y!==null&&(g=Kr(y),y!==g||y.tag!==5&&y.tag!==6)&&(y=null)):(m=null,y=u),m!==y)){if(v=Ph,E="onMouseLeave",d="onMouseEnter",x="mouse",(t==="pointerout"||t==="pointerover")&&(v=Dh,E="onPointerLeave",d="onPointerEnter",x="pointer"),g=m==null?h:ys(m),_=y==null?h:ys(y),h=new v(E,x+"leave",m,n,f),h.target=g,h.relatedTarget=_,E=null,Ur(f)===u&&(v=new v(d,x+"enter",y,n,f),v.target=_,v.relatedTarget=g,E=v),g=E,m&&y)t:{for(v=m,d=y,x=0,_=v;_;_=Zr(_))x++;for(_=0,E=d;E;E=Zr(E))_++;for(;0<x-_;)v=Zr(v),x--;for(;0<_-x;)d=Zr(d),_--;for(;x--;){if(v===d||d!==null&&v===d.alternate)break t;v=Zr(v),d=Zr(d)}v=null}else v=null;m!==null&&Gh(p,h,m,v,!1),y!==null&&g!==null&&Gh(p,g,y,v,!0)}}e:{if(h=u?ys(u):window,m=h.nodeName&&h.nodeName.toLowerCase(),m==="select"||m==="input"&&h.type==="file")var R=dy;else if(Fh(h))if(ov)R=my;else{R=hy;var A=fy}else(m=h.nodeName)&&m.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(R=py);if(R&&(R=R(t,u))){av(p,R,n,f);break e}A&&A(t,h,u),t==="focusout"&&(A=h._wrapperState)&&A.controlled&&h.type==="number"&&Qu(h,"number",h.value)}switch(A=u?ys(u):window,t){case"focusin":(Fh(A)||A.contentEditable==="true")&&(xs=A,ud=u,Na=null);break;case"focusout":Na=ud=xs=null;break;case"mousedown":dd=!0;break;case"contextmenu":case"mouseup":case"dragend":dd=!1,jh(p,n,f);break;case"selectionchange":if(xy)break;case"keydown":case"keyup":jh(p,n,f)}var C;if(_f)e:{switch(t){case"compositionstart":var b="onCompositionStart";break e;case"compositionend":b="onCompositionEnd";break e;case"compositionupdate":b="onCompositionUpdate";break e}b=void 0}else vs?rv(t,n)&&(b="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(b="onCompositionStart");b&&(iv&&n.locale!=="ko"&&(vs||b!=="onCompositionStart"?b==="onCompositionEnd"&&vs&&(C=nv()):(qi=f,gf="value"in qi?qi.value:qi.textContent,vs=!0)),A=bl(u,b),0<A.length&&(b=new Lh(b,t,null,n,f),p.push({event:b,listeners:A}),C?b.data=C:(C=sv(n),C!==null&&(b.data=C)))),(C=ay?oy(t,n):ly(t,n))&&(u=bl(u,"onBeforeInput"),0<u.length&&(f=new Lh("onBeforeInput","beforeinput",null,n,f),p.push({event:f,listeners:u}),f.data=C))}vv(p,e)})}function Wa(t,e,n){return{instance:t,listener:e,currentTarget:n}}function bl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Oa(t,n),s!=null&&i.unshift(Wa(t,s,r)),s=Oa(t,e),s!=null&&i.push(Wa(t,s,r))),t=t.return}return i}function Zr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Gh(t,e,n,i,r){for(var s=e._reactName,a=[];n!==null&&n!==i;){var o=n,c=o.alternate,u=o.stateNode;if(c!==null&&c===i)break;o.tag===5&&u!==null&&(o=u,r?(c=Oa(n,s),c!=null&&a.unshift(Wa(n,c,o))):r||(c=Oa(n,s),c!=null&&a.push(Wa(n,c,o)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var My=/\r\n?/g,Ey=/\u0000|\uFFFD/g;function Wh(t){return(typeof t=="string"?t:""+t).replace(My,`
`).replace(Ey,"")}function Co(t,e,n){if(e=Wh(e),Wh(t)!==e&&n)throw Error(he(425))}function Rl(){}var fd=null,hd=null;function pd(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var md=typeof setTimeout=="function"?setTimeout:void 0,wy=typeof clearTimeout=="function"?clearTimeout:void 0,Xh=typeof Promise=="function"?Promise:void 0,Ty=typeof queueMicrotask=="function"?queueMicrotask:typeof Xh<"u"?function(t){return Xh.resolve(null).then(t).catch(Cy)}:md;function Cy(t){setTimeout(function(){throw t})}function Xc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),ja(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);ja(e)}function tr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function $h(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Qs=Math.random().toString(36).slice(2),ii="__reactFiber$"+Qs,Xa="__reactProps$"+Qs,Ci="__reactContainer$"+Qs,gd="__reactEvents$"+Qs,Ay="__reactListeners$"+Qs,by="__reactHandles$"+Qs;function Ur(t){var e=t[ii];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Ci]||n[ii]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=$h(t);t!==null;){if(n=t[ii])return n;t=$h(t)}return e}t=n,n=t.parentNode}return null}function ro(t){return t=t[ii]||t[Ci],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function ys(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(he(33))}function lc(t){return t[Xa]||null}var vd=[],Ss=-1;function mr(t){return{current:t}}function Mt(t){0>Ss||(t.current=vd[Ss],vd[Ss]=null,Ss--)}function xt(t,e){Ss++,vd[Ss]=t.current,t.current=e}var ur={},Jt=mr(ur),dn=mr(!1),Hr=ur;function Os(t,e){var n=t.type.contextTypes;if(!n)return ur;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function fn(t){return t=t.childContextTypes,t!=null}function Nl(){Mt(dn),Mt(Jt)}function qh(t,e,n){if(Jt.current!==ur)throw Error(he(168));xt(Jt,e),xt(dn,n)}function _v(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(he(108,f_(t)||"Unknown",r));return bt({},n,i)}function Pl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||ur,Hr=Jt.current,xt(Jt,t),xt(dn,dn.current),!0}function Yh(t,e,n){var i=t.stateNode;if(!i)throw Error(he(169));n?(t=_v(t,e,Hr),i.__reactInternalMemoizedMergedChildContext=t,Mt(dn),Mt(Jt),xt(Jt,t)):Mt(dn),xt(dn,n)}var vi=null,cc=!1,$c=!1;function yv(t){vi===null?vi=[t]:vi.push(t)}function Ry(t){cc=!0,yv(t)}function gr(){if(!$c&&vi!==null){$c=!0;var t=0,e=pt;try{var n=vi;for(pt=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}vi=null,cc=!1}catch(r){throw vi!==null&&(vi=vi.slice(t+1)),Wg(ff,gr),r}finally{pt=e,$c=!1}}return null}var Ms=[],Es=0,Ll=null,Dl=0,bn=[],Rn=0,Vr=null,yi=1,Si="";function br(t,e){Ms[Es++]=Dl,Ms[Es++]=Ll,Ll=t,Dl=e}function Sv(t,e,n){bn[Rn++]=yi,bn[Rn++]=Si,bn[Rn++]=Vr,Vr=t;var i=yi;t=Si;var r=32-Yn(i)-1;i&=~(1<<r),n+=1;var s=32-Yn(e)+r;if(30<s){var a=r-r%5;s=(i&(1<<a)-1).toString(32),i>>=a,r-=a,yi=1<<32-Yn(e)+r|n<<r|i,Si=s+t}else yi=1<<s|n<<r|i,Si=t}function Sf(t){t.return!==null&&(br(t,1),Sv(t,1,0))}function Mf(t){for(;t===Ll;)Ll=Ms[--Es],Ms[Es]=null,Dl=Ms[--Es],Ms[Es]=null;for(;t===Vr;)Vr=bn[--Rn],bn[Rn]=null,Si=bn[--Rn],bn[Rn]=null,yi=bn[--Rn],bn[Rn]=null}var Sn=null,yn=null,wt=!1,$n=null;function Mv(t,e){var n=Pn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Kh(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Sn=t,yn=tr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Sn=t,yn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Vr!==null?{id:yi,overflow:Si}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Pn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Sn=t,yn=null,!0):!1;default:return!1}}function xd(t){return(t.mode&1)!==0&&(t.flags&128)===0}function _d(t){if(wt){var e=yn;if(e){var n=e;if(!Kh(t,e)){if(xd(t))throw Error(he(418));e=tr(n.nextSibling);var i=Sn;e&&Kh(t,e)?Mv(i,n):(t.flags=t.flags&-4097|2,wt=!1,Sn=t)}}else{if(xd(t))throw Error(he(418));t.flags=t.flags&-4097|2,wt=!1,Sn=t}}}function Zh(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Sn=t}function Ao(t){if(t!==Sn)return!1;if(!wt)return Zh(t),wt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!pd(t.type,t.memoizedProps)),e&&(e=yn)){if(xd(t))throw Ev(),Error(he(418));for(;e;)Mv(t,e),e=tr(e.nextSibling)}if(Zh(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(he(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){yn=tr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}yn=null}}else yn=Sn?tr(t.stateNode.nextSibling):null;return!0}function Ev(){for(var t=yn;t;)t=tr(t.nextSibling)}function Bs(){yn=Sn=null,wt=!1}function Ef(t){$n===null?$n=[t]:$n.push(t)}var Ny=Li.ReactCurrentBatchConfig;function ca(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(he(309));var i=n.stateNode}if(!i)throw Error(he(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(a){var o=r.refs;a===null?delete o[s]:o[s]=a},e._stringRef=s,e)}if(typeof t!="string")throw Error(he(284));if(!n._owner)throw Error(he(290,t))}return t}function bo(t,e){throw t=Object.prototype.toString.call(e),Error(he(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Qh(t){var e=t._init;return e(t._payload)}function wv(t){function e(d,x){if(t){var _=d.deletions;_===null?(d.deletions=[x],d.flags|=16):_.push(x)}}function n(d,x){if(!t)return null;for(;x!==null;)e(d,x),x=x.sibling;return null}function i(d,x){for(d=new Map;x!==null;)x.key!==null?d.set(x.key,x):d.set(x.index,x),x=x.sibling;return d}function r(d,x){return d=sr(d,x),d.index=0,d.sibling=null,d}function s(d,x,_){return d.index=_,t?(_=d.alternate,_!==null?(_=_.index,_<x?(d.flags|=2,x):_):(d.flags|=2,x)):(d.flags|=1048576,x)}function a(d){return t&&d.alternate===null&&(d.flags|=2),d}function o(d,x,_,E){return x===null||x.tag!==6?(x=eu(_,d.mode,E),x.return=d,x):(x=r(x,_),x.return=d,x)}function c(d,x,_,E){var R=_.type;return R===gs?f(d,x,_.props.children,E,_.key):x!==null&&(x.elementType===R||typeof R=="object"&&R!==null&&R.$$typeof===Vi&&Qh(R)===x.type)?(E=r(x,_.props),E.ref=ca(d,x,_),E.return=d,E):(E=vl(_.type,_.key,_.props,null,d.mode,E),E.ref=ca(d,x,_),E.return=d,E)}function u(d,x,_,E){return x===null||x.tag!==4||x.stateNode.containerInfo!==_.containerInfo||x.stateNode.implementation!==_.implementation?(x=tu(_,d.mode,E),x.return=d,x):(x=r(x,_.children||[]),x.return=d,x)}function f(d,x,_,E,R){return x===null||x.tag!==7?(x=jr(_,d.mode,E,R),x.return=d,x):(x=r(x,_),x.return=d,x)}function p(d,x,_){if(typeof x=="string"&&x!==""||typeof x=="number")return x=eu(""+x,d.mode,_),x.return=d,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case vo:return _=vl(x.type,x.key,x.props,null,d.mode,_),_.ref=ca(d,null,x),_.return=d,_;case ms:return x=tu(x,d.mode,_),x.return=d,x;case Vi:var E=x._init;return p(d,E(x._payload),_)}if(Ma(x)||ra(x))return x=jr(x,d.mode,_,null),x.return=d,x;bo(d,x)}return null}function h(d,x,_,E){var R=x!==null?x.key:null;if(typeof _=="string"&&_!==""||typeof _=="number")return R!==null?null:o(d,x,""+_,E);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case vo:return _.key===R?c(d,x,_,E):null;case ms:return _.key===R?u(d,x,_,E):null;case Vi:return R=_._init,h(d,x,R(_._payload),E)}if(Ma(_)||ra(_))return R!==null?null:f(d,x,_,E,null);bo(d,_)}return null}function m(d,x,_,E,R){if(typeof E=="string"&&E!==""||typeof E=="number")return d=d.get(_)||null,o(x,d,""+E,R);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case vo:return d=d.get(E.key===null?_:E.key)||null,c(x,d,E,R);case ms:return d=d.get(E.key===null?_:E.key)||null,u(x,d,E,R);case Vi:var A=E._init;return m(d,x,_,A(E._payload),R)}if(Ma(E)||ra(E))return d=d.get(_)||null,f(x,d,E,R,null);bo(x,E)}return null}function y(d,x,_,E){for(var R=null,A=null,C=x,b=x=0,S=null;C!==null&&b<_.length;b++){C.index>b?(S=C,C=null):S=C.sibling;var M=h(d,C,_[b],E);if(M===null){C===null&&(C=S);break}t&&C&&M.alternate===null&&e(d,C),x=s(M,x,b),A===null?R=M:A.sibling=M,A=M,C=S}if(b===_.length)return n(d,C),wt&&br(d,b),R;if(C===null){for(;b<_.length;b++)C=p(d,_[b],E),C!==null&&(x=s(C,x,b),A===null?R=C:A.sibling=C,A=C);return wt&&br(d,b),R}for(C=i(d,C);b<_.length;b++)S=m(C,d,b,_[b],E),S!==null&&(t&&S.alternate!==null&&C.delete(S.key===null?b:S.key),x=s(S,x,b),A===null?R=S:A.sibling=S,A=S);return t&&C.forEach(function(P){return e(d,P)}),wt&&br(d,b),R}function v(d,x,_,E){var R=ra(_);if(typeof R!="function")throw Error(he(150));if(_=R.call(_),_==null)throw Error(he(151));for(var A=R=null,C=x,b=x=0,S=null,M=_.next();C!==null&&!M.done;b++,M=_.next()){C.index>b?(S=C,C=null):S=C.sibling;var P=h(d,C,M.value,E);if(P===null){C===null&&(C=S);break}t&&C&&P.alternate===null&&e(d,C),x=s(P,x,b),A===null?R=P:A.sibling=P,A=P,C=S}if(M.done)return n(d,C),wt&&br(d,b),R;if(C===null){for(;!M.done;b++,M=_.next())M=p(d,M.value,E),M!==null&&(x=s(M,x,b),A===null?R=M:A.sibling=M,A=M);return wt&&br(d,b),R}for(C=i(d,C);!M.done;b++,M=_.next())M=m(C,d,b,M.value,E),M!==null&&(t&&M.alternate!==null&&C.delete(M.key===null?b:M.key),x=s(M,x,b),A===null?R=M:A.sibling=M,A=M);return t&&C.forEach(function(X){return e(d,X)}),wt&&br(d,b),R}function g(d,x,_,E){if(typeof _=="object"&&_!==null&&_.type===gs&&_.key===null&&(_=_.props.children),typeof _=="object"&&_!==null){switch(_.$$typeof){case vo:e:{for(var R=_.key,A=x;A!==null;){if(A.key===R){if(R=_.type,R===gs){if(A.tag===7){n(d,A.sibling),x=r(A,_.props.children),x.return=d,d=x;break e}}else if(A.elementType===R||typeof R=="object"&&R!==null&&R.$$typeof===Vi&&Qh(R)===A.type){n(d,A.sibling),x=r(A,_.props),x.ref=ca(d,A,_),x.return=d,d=x;break e}n(d,A);break}else e(d,A);A=A.sibling}_.type===gs?(x=jr(_.props.children,d.mode,E,_.key),x.return=d,d=x):(E=vl(_.type,_.key,_.props,null,d.mode,E),E.ref=ca(d,x,_),E.return=d,d=E)}return a(d);case ms:e:{for(A=_.key;x!==null;){if(x.key===A)if(x.tag===4&&x.stateNode.containerInfo===_.containerInfo&&x.stateNode.implementation===_.implementation){n(d,x.sibling),x=r(x,_.children||[]),x.return=d,d=x;break e}else{n(d,x);break}else e(d,x);x=x.sibling}x=tu(_,d.mode,E),x.return=d,d=x}return a(d);case Vi:return A=_._init,g(d,x,A(_._payload),E)}if(Ma(_))return y(d,x,_,E);if(ra(_))return v(d,x,_,E);bo(d,_)}return typeof _=="string"&&_!==""||typeof _=="number"?(_=""+_,x!==null&&x.tag===6?(n(d,x.sibling),x=r(x,_),x.return=d,d=x):(n(d,x),x=eu(_,d.mode,E),x.return=d,d=x),a(d)):n(d,x)}return g}var zs=wv(!0),Tv=wv(!1),Il=mr(null),Ul=null,ws=null,wf=null;function Tf(){wf=ws=Ul=null}function Cf(t){var e=Il.current;Mt(Il),t._currentValue=e}function yd(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Ls(t,e){Ul=t,wf=ws=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(un=!0),t.firstContext=null)}function Un(t){var e=t._currentValue;if(wf!==t)if(t={context:t,memoizedValue:e,next:null},ws===null){if(Ul===null)throw Error(he(308));ws=t,Ul.dependencies={lanes:0,firstContext:t}}else ws=ws.next=t;return e}var Fr=null;function Af(t){Fr===null?Fr=[t]:Fr.push(t)}function Cv(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Af(e)):(n.next=r.next,r.next=n),e.interleaved=n,Ai(t,i)}function Ai(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Gi=!1;function bf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Av(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function wi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function nr(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,lt&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Ai(t,n)}return r=i.interleaved,r===null?(e.next=e,Af(i)):(e.next=r.next,r.next=e),i.interleaved=e,Ai(t,n)}function dl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,hf(t,n)}}function Jh(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Fl(t,e,n,i){var r=t.updateQueue;Gi=!1;var s=r.firstBaseUpdate,a=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var c=o,u=c.next;c.next=null,a===null?s=u:a.next=u,a=c;var f=t.alternate;f!==null&&(f=f.updateQueue,o=f.lastBaseUpdate,o!==a&&(o===null?f.firstBaseUpdate=u:o.next=u,f.lastBaseUpdate=c))}if(s!==null){var p=r.baseState;a=0,f=u=c=null,o=s;do{var h=o.lane,m=o.eventTime;if((i&h)===h){f!==null&&(f=f.next={eventTime:m,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var y=t,v=o;switch(h=e,m=n,v.tag){case 1:if(y=v.payload,typeof y=="function"){p=y.call(m,p,h);break e}p=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=v.payload,h=typeof y=="function"?y.call(m,p,h):y,h==null)break e;p=bt({},p,h);break e;case 2:Gi=!0}}o.callback!==null&&o.lane!==0&&(t.flags|=64,h=r.effects,h===null?r.effects=[o]:h.push(o))}else m={eventTime:m,lane:h,tag:o.tag,payload:o.payload,callback:o.callback,next:null},f===null?(u=f=m,c=p):f=f.next=m,a|=h;if(o=o.next,o===null){if(o=r.shared.pending,o===null)break;h=o,o=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);if(f===null&&(c=p),r.baseState=c,r.firstBaseUpdate=u,r.lastBaseUpdate=f,e=r.shared.interleaved,e!==null){r=e;do a|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Wr|=a,t.lanes=a,t.memoizedState=p}}function ep(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(he(191,r));r.call(i)}}}var so={},oi=mr(so),$a=mr(so),qa=mr(so);function kr(t){if(t===so)throw Error(he(174));return t}function Rf(t,e){switch(xt(qa,e),xt($a,t),xt(oi,so),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:ed(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=ed(e,t)}Mt(oi),xt(oi,e)}function js(){Mt(oi),Mt($a),Mt(qa)}function bv(t){kr(qa.current);var e=kr(oi.current),n=ed(e,t.type);e!==n&&(xt($a,t),xt(oi,n))}function Nf(t){$a.current===t&&(Mt(oi),Mt($a))}var Tt=mr(0);function kl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var qc=[];function Pf(){for(var t=0;t<qc.length;t++)qc[t]._workInProgressVersionPrimary=null;qc.length=0}var fl=Li.ReactCurrentDispatcher,Yc=Li.ReactCurrentBatchConfig,Gr=0,Ct=null,Ft=null,Ht=null,Ol=!1,Pa=!1,Ya=0,Py=0;function qt(){throw Error(he(321))}function Lf(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Qn(t[n],e[n]))return!1;return!0}function Df(t,e,n,i,r,s){if(Gr=s,Ct=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,fl.current=t===null||t.memoizedState===null?Uy:Fy,t=n(i,r),Pa){s=0;do{if(Pa=!1,Ya=0,25<=s)throw Error(he(301));s+=1,Ht=Ft=null,e.updateQueue=null,fl.current=ky,t=n(i,r)}while(Pa)}if(fl.current=Bl,e=Ft!==null&&Ft.next!==null,Gr=0,Ht=Ft=Ct=null,Ol=!1,e)throw Error(he(300));return t}function If(){var t=Ya!==0;return Ya=0,t}function ei(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ht===null?Ct.memoizedState=Ht=t:Ht=Ht.next=t,Ht}function Fn(){if(Ft===null){var t=Ct.alternate;t=t!==null?t.memoizedState:null}else t=Ft.next;var e=Ht===null?Ct.memoizedState:Ht.next;if(e!==null)Ht=e,Ft=t;else{if(t===null)throw Error(he(310));Ft=t,t={memoizedState:Ft.memoizedState,baseState:Ft.baseState,baseQueue:Ft.baseQueue,queue:Ft.queue,next:null},Ht===null?Ct.memoizedState=Ht=t:Ht=Ht.next=t}return Ht}function Ka(t,e){return typeof e=="function"?e(t):e}function Kc(t){var e=Fn(),n=e.queue;if(n===null)throw Error(he(311));n.lastRenderedReducer=t;var i=Ft,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var a=r.next;r.next=s.next,s.next=a}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var o=a=null,c=null,u=s;do{var f=u.lane;if((Gr&f)===f)c!==null&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),i=u.hasEagerState?u.eagerState:t(i,u.action);else{var p={lane:f,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};c===null?(o=c=p,a=i):c=c.next=p,Ct.lanes|=f,Wr|=f}u=u.next}while(u!==null&&u!==s);c===null?a=i:c.next=o,Qn(i,e.memoizedState)||(un=!0),e.memoizedState=i,e.baseState=a,e.baseQueue=c,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,Ct.lanes|=s,Wr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Zc(t){var e=Fn(),n=e.queue;if(n===null)throw Error(he(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var a=r=r.next;do s=t(s,a.action),a=a.next;while(a!==r);Qn(s,e.memoizedState)||(un=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function Rv(){}function Nv(t,e){var n=Ct,i=Fn(),r=e(),s=!Qn(i.memoizedState,r);if(s&&(i.memoizedState=r,un=!0),i=i.queue,Uf(Dv.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Ht!==null&&Ht.memoizedState.tag&1){if(n.flags|=2048,Za(9,Lv.bind(null,n,i,r,e),void 0,null),Vt===null)throw Error(he(349));Gr&30||Pv(n,e,r)}return r}function Pv(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Ct.updateQueue,e===null?(e={lastEffect:null,stores:null},Ct.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Lv(t,e,n,i){e.value=n,e.getSnapshot=i,Iv(e)&&Uv(t)}function Dv(t,e,n){return n(function(){Iv(e)&&Uv(t)})}function Iv(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Qn(t,n)}catch{return!0}}function Uv(t){var e=Ai(t,1);e!==null&&Kn(e,t,1,-1)}function tp(t){var e=ei();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ka,lastRenderedState:t},e.queue=t,t=t.dispatch=Iy.bind(null,Ct,t),[e.memoizedState,t]}function Za(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=Ct.updateQueue,e===null?(e={lastEffect:null,stores:null},Ct.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function Fv(){return Fn().memoizedState}function hl(t,e,n,i){var r=ei();Ct.flags|=t,r.memoizedState=Za(1|e,n,void 0,i===void 0?null:i)}function uc(t,e,n,i){var r=Fn();i=i===void 0?null:i;var s=void 0;if(Ft!==null){var a=Ft.memoizedState;if(s=a.destroy,i!==null&&Lf(i,a.deps)){r.memoizedState=Za(e,n,s,i);return}}Ct.flags|=t,r.memoizedState=Za(1|e,n,s,i)}function np(t,e){return hl(8390656,8,t,e)}function Uf(t,e){return uc(2048,8,t,e)}function kv(t,e){return uc(4,2,t,e)}function Ov(t,e){return uc(4,4,t,e)}function Bv(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function zv(t,e,n){return n=n!=null?n.concat([t]):null,uc(4,4,Bv.bind(null,e,t),n)}function Ff(){}function jv(t,e){var n=Fn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Lf(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function Hv(t,e){var n=Fn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Lf(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function Vv(t,e,n){return Gr&21?(Qn(n,e)||(n=qg(),Ct.lanes|=n,Wr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,un=!0),t.memoizedState=n)}function Ly(t,e){var n=pt;pt=n!==0&&4>n?n:4,t(!0);var i=Yc.transition;Yc.transition={};try{t(!1),e()}finally{pt=n,Yc.transition=i}}function Gv(){return Fn().memoizedState}function Dy(t,e,n){var i=rr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},Wv(t))Xv(e,n);else if(n=Cv(t,e,n,i),n!==null){var r=nn();Kn(n,t,i,r),$v(n,e,i)}}function Iy(t,e,n){var i=rr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(Wv(t))Xv(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var a=e.lastRenderedState,o=s(a,n);if(r.hasEagerState=!0,r.eagerState=o,Qn(o,a)){var c=e.interleaved;c===null?(r.next=r,Af(e)):(r.next=c.next,c.next=r),e.interleaved=r;return}}catch{}finally{}n=Cv(t,e,r,i),n!==null&&(r=nn(),Kn(n,t,i,r),$v(n,e,i))}}function Wv(t){var e=t.alternate;return t===Ct||e!==null&&e===Ct}function Xv(t,e){Pa=Ol=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function $v(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,hf(t,n)}}var Bl={readContext:Un,useCallback:qt,useContext:qt,useEffect:qt,useImperativeHandle:qt,useInsertionEffect:qt,useLayoutEffect:qt,useMemo:qt,useReducer:qt,useRef:qt,useState:qt,useDebugValue:qt,useDeferredValue:qt,useTransition:qt,useMutableSource:qt,useSyncExternalStore:qt,useId:qt,unstable_isNewReconciler:!1},Uy={readContext:Un,useCallback:function(t,e){return ei().memoizedState=[t,e===void 0?null:e],t},useContext:Un,useEffect:np,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,hl(4194308,4,Bv.bind(null,e,t),n)},useLayoutEffect:function(t,e){return hl(4194308,4,t,e)},useInsertionEffect:function(t,e){return hl(4,2,t,e)},useMemo:function(t,e){var n=ei();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=ei();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=Dy.bind(null,Ct,t),[i.memoizedState,t]},useRef:function(t){var e=ei();return t={current:t},e.memoizedState=t},useState:tp,useDebugValue:Ff,useDeferredValue:function(t){return ei().memoizedState=t},useTransition:function(){var t=tp(!1),e=t[0];return t=Ly.bind(null,t[1]),ei().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=Ct,r=ei();if(wt){if(n===void 0)throw Error(he(407));n=n()}else{if(n=e(),Vt===null)throw Error(he(349));Gr&30||Pv(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,np(Dv.bind(null,i,s,t),[t]),i.flags|=2048,Za(9,Lv.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=ei(),e=Vt.identifierPrefix;if(wt){var n=Si,i=yi;n=(i&~(1<<32-Yn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=Ya++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=Py++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},Fy={readContext:Un,useCallback:jv,useContext:Un,useEffect:Uf,useImperativeHandle:zv,useInsertionEffect:kv,useLayoutEffect:Ov,useMemo:Hv,useReducer:Kc,useRef:Fv,useState:function(){return Kc(Ka)},useDebugValue:Ff,useDeferredValue:function(t){var e=Fn();return Vv(e,Ft.memoizedState,t)},useTransition:function(){var t=Kc(Ka)[0],e=Fn().memoizedState;return[t,e]},useMutableSource:Rv,useSyncExternalStore:Nv,useId:Gv,unstable_isNewReconciler:!1},ky={readContext:Un,useCallback:jv,useContext:Un,useEffect:Uf,useImperativeHandle:zv,useInsertionEffect:kv,useLayoutEffect:Ov,useMemo:Hv,useReducer:Zc,useRef:Fv,useState:function(){return Zc(Ka)},useDebugValue:Ff,useDeferredValue:function(t){var e=Fn();return Ft===null?e.memoizedState=t:Vv(e,Ft.memoizedState,t)},useTransition:function(){var t=Zc(Ka)[0],e=Fn().memoizedState;return[t,e]},useMutableSource:Rv,useSyncExternalStore:Nv,useId:Gv,unstable_isNewReconciler:!1};function Wn(t,e){if(t&&t.defaultProps){e=bt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Sd(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:bt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var dc={isMounted:function(t){return(t=t._reactInternals)?Kr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=nn(),r=rr(t),s=wi(i,r);s.payload=e,n!=null&&(s.callback=n),e=nr(t,s,r),e!==null&&(Kn(e,t,r,i),dl(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=nn(),r=rr(t),s=wi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=nr(t,s,r),e!==null&&(Kn(e,t,r,i),dl(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=nn(),i=rr(t),r=wi(n,i);r.tag=2,e!=null&&(r.callback=e),e=nr(t,r,i),e!==null&&(Kn(e,t,i,n),dl(e,t,i))}};function ip(t,e,n,i,r,s,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,a):e.prototype&&e.prototype.isPureReactComponent?!Va(n,i)||!Va(r,s):!0}function qv(t,e,n){var i=!1,r=ur,s=e.contextType;return typeof s=="object"&&s!==null?s=Un(s):(r=fn(e)?Hr:Jt.current,i=e.contextTypes,s=(i=i!=null)?Os(t,r):ur),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=dc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function rp(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&dc.enqueueReplaceState(e,e.state,null)}function Md(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},bf(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Un(s):(s=fn(e)?Hr:Jt.current,r.context=Os(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Sd(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&dc.enqueueReplaceState(r,r.state,null),Fl(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Hs(t,e){try{var n="",i=e;do n+=d_(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Qc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Ed(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var Oy=typeof WeakMap=="function"?WeakMap:Map;function Yv(t,e,n){n=wi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){jl||(jl=!0,Dd=i),Ed(t,e)},n}function Kv(t,e,n){n=wi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){Ed(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Ed(t,e),typeof i!="function"&&(ir===null?ir=new Set([this]):ir.add(this));var a=e.stack;this.componentDidCatch(e.value,{componentStack:a!==null?a:""})}),n}function sp(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new Oy;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=Qy.bind(null,t,e,n),e.then(t,t))}function ap(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function op(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=wi(-1,1),e.tag=2,nr(n,e,1))),n.lanes|=1),t)}var By=Li.ReactCurrentOwner,un=!1;function tn(t,e,n,i){e.child=t===null?Tv(e,null,n,i):zs(e,t.child,n,i)}function lp(t,e,n,i,r){n=n.render;var s=e.ref;return Ls(e,r),i=Df(t,e,n,i,s,r),n=If(),t!==null&&!un?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,bi(t,e,r)):(wt&&n&&Sf(e),e.flags|=1,tn(t,e,i,r),e.child)}function cp(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!Gf(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,Zv(t,e,s,i,r)):(t=vl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:Va,n(a,i)&&t.ref===e.ref)return bi(t,e,r)}return e.flags|=1,t=sr(s,i),t.ref=e.ref,t.return=e,e.child=t}function Zv(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(Va(s,i)&&t.ref===e.ref)if(un=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(un=!0);else return e.lanes=t.lanes,bi(t,e,r)}return wd(t,e,n,i,r)}function Qv(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},xt(Cs,_n),_n|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,xt(Cs,_n),_n|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,xt(Cs,_n),_n|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,xt(Cs,_n),_n|=i;return tn(t,e,r,n),e.child}function Jv(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function wd(t,e,n,i,r){var s=fn(n)?Hr:Jt.current;return s=Os(e,s),Ls(e,r),n=Df(t,e,n,i,s,r),i=If(),t!==null&&!un?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,bi(t,e,r)):(wt&&i&&Sf(e),e.flags|=1,tn(t,e,n,r),e.child)}function up(t,e,n,i,r){if(fn(n)){var s=!0;Pl(e)}else s=!1;if(Ls(e,r),e.stateNode===null)pl(t,e),qv(e,n,i),Md(e,n,i,r),i=!0;else if(t===null){var a=e.stateNode,o=e.memoizedProps;a.props=o;var c=a.context,u=n.contextType;typeof u=="object"&&u!==null?u=Un(u):(u=fn(n)?Hr:Jt.current,u=Os(e,u));var f=n.getDerivedStateFromProps,p=typeof f=="function"||typeof a.getSnapshotBeforeUpdate=="function";p||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==i||c!==u)&&rp(e,a,i,u),Gi=!1;var h=e.memoizedState;a.state=h,Fl(e,i,a,r),c=e.memoizedState,o!==i||h!==c||dn.current||Gi?(typeof f=="function"&&(Sd(e,n,f,i),c=e.memoizedState),(o=Gi||ip(e,n,o,i,h,c,u))?(p||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=c),a.props=i,a.state=c,a.context=u,i=o):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{a=e.stateNode,Av(t,e),o=e.memoizedProps,u=e.type===e.elementType?o:Wn(e.type,o),a.props=u,p=e.pendingProps,h=a.context,c=n.contextType,typeof c=="object"&&c!==null?c=Un(c):(c=fn(n)?Hr:Jt.current,c=Os(e,c));var m=n.getDerivedStateFromProps;(f=typeof m=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==p||h!==c)&&rp(e,a,i,c),Gi=!1,h=e.memoizedState,a.state=h,Fl(e,i,a,r);var y=e.memoizedState;o!==p||h!==y||dn.current||Gi?(typeof m=="function"&&(Sd(e,n,m,i),y=e.memoizedState),(u=Gi||ip(e,n,u,i,h,y,c)||!1)?(f||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,y,c),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,y,c)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=y),a.props=i,a.state=y,a.context=c,i=u):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),i=!1)}return Td(t,e,n,i,s,r)}function Td(t,e,n,i,r,s){Jv(t,e);var a=(e.flags&128)!==0;if(!i&&!a)return r&&Yh(e,n,!1),bi(t,e,s);i=e.stateNode,By.current=e;var o=a&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&a?(e.child=zs(e,t.child,null,s),e.child=zs(e,null,o,s)):tn(t,e,o,s),e.memoizedState=i.state,r&&Yh(e,n,!0),e.child}function ex(t){var e=t.stateNode;e.pendingContext?qh(t,e.pendingContext,e.pendingContext!==e.context):e.context&&qh(t,e.context,!1),Rf(t,e.containerInfo)}function dp(t,e,n,i,r){return Bs(),Ef(r),e.flags|=256,tn(t,e,n,i),e.child}var Cd={dehydrated:null,treeContext:null,retryLane:0};function Ad(t){return{baseLanes:t,cachePool:null,transitions:null}}function tx(t,e,n){var i=e.pendingProps,r=Tt.current,s=!1,a=(e.flags&128)!==0,o;if((o=a)||(o=t!==null&&t.memoizedState===null?!1:(r&2)!==0),o?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),xt(Tt,r&1),t===null)return _d(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(a=i.children,t=i.fallback,s?(i=e.mode,s=e.child,a={mode:"hidden",children:a},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=pc(a,i,0,null),t=jr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Ad(n),e.memoizedState=Cd,t):kf(e,a));if(r=t.memoizedState,r!==null&&(o=r.dehydrated,o!==null))return zy(t,e,a,i,o,r,n);if(s){s=i.fallback,a=e.mode,r=t.child,o=r.sibling;var c={mode:"hidden",children:i.children};return!(a&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=c,e.deletions=null):(i=sr(r,c),i.subtreeFlags=r.subtreeFlags&14680064),o!==null?s=sr(o,s):(s=jr(s,a,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,a=t.child.memoizedState,a=a===null?Ad(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=t.childLanes&~n,e.memoizedState=Cd,i}return s=t.child,t=s.sibling,i=sr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function kf(t,e){return e=pc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Ro(t,e,n,i){return i!==null&&Ef(i),zs(e,t.child,null,n),t=kf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function zy(t,e,n,i,r,s,a){if(n)return e.flags&256?(e.flags&=-257,i=Qc(Error(he(422))),Ro(t,e,a,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=pc({mode:"visible",children:i.children},r,0,null),s=jr(s,r,a,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&zs(e,t.child,null,a),e.child.memoizedState=Ad(a),e.memoizedState=Cd,s);if(!(e.mode&1))return Ro(t,e,a,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var o=i.dgst;return i=o,s=Error(he(419)),i=Qc(s,i,void 0),Ro(t,e,a,i)}if(o=(a&t.childLanes)!==0,un||o){if(i=Vt,i!==null){switch(a&-a){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|a)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Ai(t,r),Kn(i,t,r,-1))}return Vf(),i=Qc(Error(he(421))),Ro(t,e,a,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=Jy.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,yn=tr(r.nextSibling),Sn=e,wt=!0,$n=null,t!==null&&(bn[Rn++]=yi,bn[Rn++]=Si,bn[Rn++]=Vr,yi=t.id,Si=t.overflow,Vr=e),e=kf(e,i.children),e.flags|=4096,e)}function fp(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),yd(t.return,e,n)}function Jc(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function nx(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(tn(t,e,i.children,n),i=Tt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&fp(t,n,e);else if(t.tag===19)fp(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(xt(Tt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&kl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Jc(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&kl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Jc(e,!0,n,null,s);break;case"together":Jc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function pl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function bi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Wr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(he(153));if(e.child!==null){for(t=e.child,n=sr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=sr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function jy(t,e,n){switch(e.tag){case 3:ex(e),Bs();break;case 5:bv(e);break;case 1:fn(e.type)&&Pl(e);break;case 4:Rf(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;xt(Il,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(xt(Tt,Tt.current&1),e.flags|=128,null):n&e.child.childLanes?tx(t,e,n):(xt(Tt,Tt.current&1),t=bi(t,e,n),t!==null?t.sibling:null);xt(Tt,Tt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return nx(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),xt(Tt,Tt.current),i)break;return null;case 22:case 23:return e.lanes=0,Qv(t,e,n)}return bi(t,e,n)}var ix,bd,rx,sx;ix=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};bd=function(){};rx=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,kr(oi.current);var s=null;switch(n){case"input":r=Ku(t,r),i=Ku(t,i),s=[];break;case"select":r=bt({},r,{value:void 0}),i=bt({},i,{value:void 0}),s=[];break;case"textarea":r=Ju(t,r),i=Ju(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=Rl)}td(n,i);var a;n=null;for(u in r)if(!i.hasOwnProperty(u)&&r.hasOwnProperty(u)&&r[u]!=null)if(u==="style"){var o=r[u];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Fa.hasOwnProperty(u)?s||(s=[]):(s=s||[]).push(u,null));for(u in i){var c=i[u];if(o=r!=null?r[u]:void 0,i.hasOwnProperty(u)&&c!==o&&(c!=null||o!=null))if(u==="style")if(o){for(a in o)!o.hasOwnProperty(a)||c&&c.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in c)c.hasOwnProperty(a)&&o[a]!==c[a]&&(n||(n={}),n[a]=c[a])}else n||(s||(s=[]),s.push(u,n)),n=c;else u==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,o=o?o.__html:void 0,c!=null&&o!==c&&(s=s||[]).push(u,c)):u==="children"?typeof c!="string"&&typeof c!="number"||(s=s||[]).push(u,""+c):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Fa.hasOwnProperty(u)?(c!=null&&u==="onScroll"&&yt("scroll",t),s||o===c||(s=[])):(s=s||[]).push(u,c))}n&&(s=s||[]).push("style",n);var u=s;(e.updateQueue=u)&&(e.flags|=4)}};sx=function(t,e,n,i){n!==i&&(e.flags|=4)};function ua(t,e){if(!wt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Yt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function Hy(t,e,n){var i=e.pendingProps;switch(Mf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Yt(e),null;case 1:return fn(e.type)&&Nl(),Yt(e),null;case 3:return i=e.stateNode,js(),Mt(dn),Mt(Jt),Pf(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(Ao(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,$n!==null&&(Fd($n),$n=null))),bd(t,e),Yt(e),null;case 5:Nf(e);var r=kr(qa.current);if(n=e.type,t!==null&&e.stateNode!=null)rx(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(he(166));return Yt(e),null}if(t=kr(oi.current),Ao(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[ii]=e,i[Xa]=s,t=(e.mode&1)!==0,n){case"dialog":yt("cancel",i),yt("close",i);break;case"iframe":case"object":case"embed":yt("load",i);break;case"video":case"audio":for(r=0;r<wa.length;r++)yt(wa[r],i);break;case"source":yt("error",i);break;case"img":case"image":case"link":yt("error",i),yt("load",i);break;case"details":yt("toggle",i);break;case"input":Sh(i,s),yt("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},yt("invalid",i);break;case"textarea":Eh(i,s),yt("invalid",i)}td(n,s),r=null;for(var a in s)if(s.hasOwnProperty(a)){var o=s[a];a==="children"?typeof o=="string"?i.textContent!==o&&(s.suppressHydrationWarning!==!0&&Co(i.textContent,o,t),r=["children",o]):typeof o=="number"&&i.textContent!==""+o&&(s.suppressHydrationWarning!==!0&&Co(i.textContent,o,t),r=["children",""+o]):Fa.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&yt("scroll",i)}switch(n){case"input":xo(i),Mh(i,s,!0);break;case"textarea":xo(i),wh(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=Rl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{a=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Dg(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=a.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=a.createElement(n,{is:i.is}):(t=a.createElement(n),n==="select"&&(a=t,i.multiple?a.multiple=!0:i.size&&(a.size=i.size))):t=a.createElementNS(t,n),t[ii]=e,t[Xa]=i,ix(t,e,!1,!1),e.stateNode=t;e:{switch(a=nd(n,i),n){case"dialog":yt("cancel",t),yt("close",t),r=i;break;case"iframe":case"object":case"embed":yt("load",t),r=i;break;case"video":case"audio":for(r=0;r<wa.length;r++)yt(wa[r],t);r=i;break;case"source":yt("error",t),r=i;break;case"img":case"image":case"link":yt("error",t),yt("load",t),r=i;break;case"details":yt("toggle",t),r=i;break;case"input":Sh(t,i),r=Ku(t,i),yt("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=bt({},i,{value:void 0}),yt("invalid",t);break;case"textarea":Eh(t,i),r=Ju(t,i),yt("invalid",t);break;default:r=i}td(n,r),o=r;for(s in o)if(o.hasOwnProperty(s)){var c=o[s];s==="style"?Fg(t,c):s==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Ig(t,c)):s==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&ka(t,c):typeof c=="number"&&ka(t,""+c):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Fa.hasOwnProperty(s)?c!=null&&s==="onScroll"&&yt("scroll",t):c!=null&&of(t,s,c,a))}switch(n){case"input":xo(t),Mh(t,i,!1);break;case"textarea":xo(t),wh(t);break;case"option":i.value!=null&&t.setAttribute("value",""+cr(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?bs(t,!!i.multiple,s,!1):i.defaultValue!=null&&bs(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=Rl)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Yt(e),null;case 6:if(t&&e.stateNode!=null)sx(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(he(166));if(n=kr(qa.current),kr(oi.current),Ao(e)){if(i=e.stateNode,n=e.memoizedProps,i[ii]=e,(s=i.nodeValue!==n)&&(t=Sn,t!==null))switch(t.tag){case 3:Co(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Co(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[ii]=e,e.stateNode=i}return Yt(e),null;case 13:if(Mt(Tt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(wt&&yn!==null&&e.mode&1&&!(e.flags&128))Ev(),Bs(),e.flags|=98560,s=!1;else if(s=Ao(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(he(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(he(317));s[ii]=e}else Bs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Yt(e),s=!1}else $n!==null&&(Fd($n),$n=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||Tt.current&1?kt===0&&(kt=3):Vf())),e.updateQueue!==null&&(e.flags|=4),Yt(e),null);case 4:return js(),bd(t,e),t===null&&Ga(e.stateNode.containerInfo),Yt(e),null;case 10:return Cf(e.type._context),Yt(e),null;case 17:return fn(e.type)&&Nl(),Yt(e),null;case 19:if(Mt(Tt),s=e.memoizedState,s===null)return Yt(e),null;if(i=(e.flags&128)!==0,a=s.rendering,a===null)if(i)ua(s,!1);else{if(kt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(a=kl(t),a!==null){for(e.flags|=128,ua(s,!1),i=a.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,t=a.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return xt(Tt,Tt.current&1|2),e.child}t=t.sibling}s.tail!==null&&Pt()>Vs&&(e.flags|=128,i=!0,ua(s,!1),e.lanes=4194304)}else{if(!i)if(t=kl(a),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),ua(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!wt)return Yt(e),null}else 2*Pt()-s.renderingStartTime>Vs&&n!==1073741824&&(e.flags|=128,i=!0,ua(s,!1),e.lanes=4194304);s.isBackwards?(a.sibling=e.child,e.child=a):(n=s.last,n!==null?n.sibling=a:e.child=a,s.last=a)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Pt(),e.sibling=null,n=Tt.current,xt(Tt,i?n&1|2:n&1),e):(Yt(e),null);case 22:case 23:return Hf(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?_n&1073741824&&(Yt(e),e.subtreeFlags&6&&(e.flags|=8192)):Yt(e),null;case 24:return null;case 25:return null}throw Error(he(156,e.tag))}function Vy(t,e){switch(Mf(e),e.tag){case 1:return fn(e.type)&&Nl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return js(),Mt(dn),Mt(Jt),Pf(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Nf(e),null;case 13:if(Mt(Tt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(he(340));Bs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Mt(Tt),null;case 4:return js(),null;case 10:return Cf(e.type._context),null;case 22:case 23:return Hf(),null;case 24:return null;default:return null}}var No=!1,Qt=!1,Gy=typeof WeakSet=="function"?WeakSet:Set,Ne=null;function Ts(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Rt(t,e,i)}else n.current=null}function Rd(t,e,n){try{n()}catch(i){Rt(t,e,i)}}var hp=!1;function Wy(t,e){if(fd=Cl,t=uv(),yf(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,o=-1,c=-1,u=0,f=0,p=t,h=null;t:for(;;){for(var m;p!==n||r!==0&&p.nodeType!==3||(o=a+r),p!==s||i!==0&&p.nodeType!==3||(c=a+i),p.nodeType===3&&(a+=p.nodeValue.length),(m=p.firstChild)!==null;)h=p,p=m;for(;;){if(p===t)break t;if(h===n&&++u===r&&(o=a),h===s&&++f===i&&(c=a),(m=p.nextSibling)!==null)break;p=h,h=p.parentNode}p=m}n=o===-1||c===-1?null:{start:o,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(hd={focusedElem:t,selectionRange:n},Cl=!1,Ne=e;Ne!==null;)if(e=Ne,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Ne=t;else for(;Ne!==null;){e=Ne;try{var y=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var v=y.memoizedProps,g=y.memoizedState,d=e.stateNode,x=d.getSnapshotBeforeUpdate(e.elementType===e.type?v:Wn(e.type,v),g);d.__reactInternalSnapshotBeforeUpdate=x}break;case 3:var _=e.stateNode.containerInfo;_.nodeType===1?_.textContent="":_.nodeType===9&&_.documentElement&&_.removeChild(_.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(he(163))}}catch(E){Rt(e,e.return,E)}if(t=e.sibling,t!==null){t.return=e.return,Ne=t;break}Ne=e.return}return y=hp,hp=!1,y}function La(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Rd(e,n,s)}r=r.next}while(r!==i)}}function fc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function Nd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function ax(t){var e=t.alternate;e!==null&&(t.alternate=null,ax(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[ii],delete e[Xa],delete e[gd],delete e[Ay],delete e[by])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function ox(t){return t.tag===5||t.tag===3||t.tag===4}function pp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||ox(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Pd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Rl));else if(i!==4&&(t=t.child,t!==null))for(Pd(t,e,n),t=t.sibling;t!==null;)Pd(t,e,n),t=t.sibling}function Ld(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Ld(t,e,n),t=t.sibling;t!==null;)Ld(t,e,n),t=t.sibling}var Gt=null,Xn=!1;function Fi(t,e,n){for(n=n.child;n!==null;)lx(t,e,n),n=n.sibling}function lx(t,e,n){if(ai&&typeof ai.onCommitFiberUnmount=="function")try{ai.onCommitFiberUnmount(rc,n)}catch{}switch(n.tag){case 5:Qt||Ts(n,e);case 6:var i=Gt,r=Xn;Gt=null,Fi(t,e,n),Gt=i,Xn=r,Gt!==null&&(Xn?(t=Gt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Gt.removeChild(n.stateNode));break;case 18:Gt!==null&&(Xn?(t=Gt,n=n.stateNode,t.nodeType===8?Xc(t.parentNode,n):t.nodeType===1&&Xc(t,n),ja(t)):Xc(Gt,n.stateNode));break;case 4:i=Gt,r=Xn,Gt=n.stateNode.containerInfo,Xn=!0,Fi(t,e,n),Gt=i,Xn=r;break;case 0:case 11:case 14:case 15:if(!Qt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&Rd(n,e,a),r=r.next}while(r!==i)}Fi(t,e,n);break;case 1:if(!Qt&&(Ts(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(o){Rt(n,e,o)}Fi(t,e,n);break;case 21:Fi(t,e,n);break;case 22:n.mode&1?(Qt=(i=Qt)||n.memoizedState!==null,Fi(t,e,n),Qt=i):Fi(t,e,n);break;default:Fi(t,e,n)}}function mp(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new Gy),e.forEach(function(i){var r=eS.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function jn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,a=e,o=a;e:for(;o!==null;){switch(o.tag){case 5:Gt=o.stateNode,Xn=!1;break e;case 3:Gt=o.stateNode.containerInfo,Xn=!0;break e;case 4:Gt=o.stateNode.containerInfo,Xn=!0;break e}o=o.return}if(Gt===null)throw Error(he(160));lx(s,a,r),Gt=null,Xn=!1;var c=r.alternate;c!==null&&(c.return=null),r.return=null}catch(u){Rt(r,e,u)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)cx(e,t),e=e.sibling}function cx(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(jn(e,t),Jn(t),i&4){try{La(3,t,t.return),fc(3,t)}catch(v){Rt(t,t.return,v)}try{La(5,t,t.return)}catch(v){Rt(t,t.return,v)}}break;case 1:jn(e,t),Jn(t),i&512&&n!==null&&Ts(n,n.return);break;case 5:if(jn(e,t),Jn(t),i&512&&n!==null&&Ts(n,n.return),t.flags&32){var r=t.stateNode;try{ka(r,"")}catch(v){Rt(t,t.return,v)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,a=n!==null?n.memoizedProps:s,o=t.type,c=t.updateQueue;if(t.updateQueue=null,c!==null)try{o==="input"&&s.type==="radio"&&s.name!=null&&Pg(r,s),nd(o,a);var u=nd(o,s);for(a=0;a<c.length;a+=2){var f=c[a],p=c[a+1];f==="style"?Fg(r,p):f==="dangerouslySetInnerHTML"?Ig(r,p):f==="children"?ka(r,p):of(r,f,p,u)}switch(o){case"input":Zu(r,s);break;case"textarea":Lg(r,s);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var m=s.value;m!=null?bs(r,!!s.multiple,m,!1):h!==!!s.multiple&&(s.defaultValue!=null?bs(r,!!s.multiple,s.defaultValue,!0):bs(r,!!s.multiple,s.multiple?[]:"",!1))}r[Xa]=s}catch(v){Rt(t,t.return,v)}}break;case 6:if(jn(e,t),Jn(t),i&4){if(t.stateNode===null)throw Error(he(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(v){Rt(t,t.return,v)}}break;case 3:if(jn(e,t),Jn(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{ja(e.containerInfo)}catch(v){Rt(t,t.return,v)}break;case 4:jn(e,t),Jn(t);break;case 13:jn(e,t),Jn(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(zf=Pt())),i&4&&mp(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(Qt=(u=Qt)||f,jn(e,t),Qt=u):jn(e,t),Jn(t),i&8192){if(u=t.memoizedState!==null,(t.stateNode.isHidden=u)&&!f&&t.mode&1)for(Ne=t,f=t.child;f!==null;){for(p=Ne=f;Ne!==null;){switch(h=Ne,m=h.child,h.tag){case 0:case 11:case 14:case 15:La(4,h,h.return);break;case 1:Ts(h,h.return);var y=h.stateNode;if(typeof y.componentWillUnmount=="function"){i=h,n=h.return;try{e=i,y.props=e.memoizedProps,y.state=e.memoizedState,y.componentWillUnmount()}catch(v){Rt(i,n,v)}}break;case 5:Ts(h,h.return);break;case 22:if(h.memoizedState!==null){vp(p);continue}}m!==null?(m.return=h,Ne=m):vp(p)}f=f.sibling}e:for(f=null,p=t;;){if(p.tag===5){if(f===null){f=p;try{r=p.stateNode,u?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(o=p.stateNode,c=p.memoizedProps.style,a=c!=null&&c.hasOwnProperty("display")?c.display:null,o.style.display=Ug("display",a))}catch(v){Rt(t,t.return,v)}}}else if(p.tag===6){if(f===null)try{p.stateNode.nodeValue=u?"":p.memoizedProps}catch(v){Rt(t,t.return,v)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===t)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===t)break e;for(;p.sibling===null;){if(p.return===null||p.return===t)break e;f===p&&(f=null),p=p.return}f===p&&(f=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:jn(e,t),Jn(t),i&4&&mp(t);break;case 21:break;default:jn(e,t),Jn(t)}}function Jn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(ox(n)){var i=n;break e}n=n.return}throw Error(he(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(ka(r,""),i.flags&=-33);var s=pp(t);Ld(t,s,r);break;case 3:case 4:var a=i.stateNode.containerInfo,o=pp(t);Pd(t,o,a);break;default:throw Error(he(161))}}catch(c){Rt(t,t.return,c)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Xy(t,e,n){Ne=t,ux(t)}function ux(t,e,n){for(var i=(t.mode&1)!==0;Ne!==null;){var r=Ne,s=r.child;if(r.tag===22&&i){var a=r.memoizedState!==null||No;if(!a){var o=r.alternate,c=o!==null&&o.memoizedState!==null||Qt;o=No;var u=Qt;if(No=a,(Qt=c)&&!u)for(Ne=r;Ne!==null;)a=Ne,c=a.child,a.tag===22&&a.memoizedState!==null?xp(r):c!==null?(c.return=a,Ne=c):xp(r);for(;s!==null;)Ne=s,ux(s),s=s.sibling;Ne=r,No=o,Qt=u}gp(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Ne=s):gp(t)}}function gp(t){for(;Ne!==null;){var e=Ne;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Qt||fc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Qt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Wn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&ep(e,s,i);break;case 3:var a=e.updateQueue;if(a!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}ep(e,a,n)}break;case 5:var o=e.stateNode;if(n===null&&e.flags&4){n=o;var c=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var u=e.alternate;if(u!==null){var f=u.memoizedState;if(f!==null){var p=f.dehydrated;p!==null&&ja(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(he(163))}Qt||e.flags&512&&Nd(e)}catch(h){Rt(e,e.return,h)}}if(e===t){Ne=null;break}if(n=e.sibling,n!==null){n.return=e.return,Ne=n;break}Ne=e.return}}function vp(t){for(;Ne!==null;){var e=Ne;if(e===t){Ne=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Ne=n;break}Ne=e.return}}function xp(t){for(;Ne!==null;){var e=Ne;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{fc(4,e)}catch(c){Rt(e,n,c)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(c){Rt(e,r,c)}}var s=e.return;try{Nd(e)}catch(c){Rt(e,s,c)}break;case 5:var a=e.return;try{Nd(e)}catch(c){Rt(e,a,c)}}}catch(c){Rt(e,e.return,c)}if(e===t){Ne=null;break}var o=e.sibling;if(o!==null){o.return=e.return,Ne=o;break}Ne=e.return}}var $y=Math.ceil,zl=Li.ReactCurrentDispatcher,Of=Li.ReactCurrentOwner,Dn=Li.ReactCurrentBatchConfig,lt=0,Vt=null,It=null,Xt=0,_n=0,Cs=mr(0),kt=0,Qa=null,Wr=0,hc=0,Bf=0,Da=null,ln=null,zf=0,Vs=1/0,gi=null,jl=!1,Dd=null,ir=null,Po=!1,Yi=null,Hl=0,Ia=0,Id=null,ml=-1,gl=0;function nn(){return lt&6?Pt():ml!==-1?ml:ml=Pt()}function rr(t){return t.mode&1?lt&2&&Xt!==0?Xt&-Xt:Ny.transition!==null?(gl===0&&(gl=qg()),gl):(t=pt,t!==0||(t=window.event,t=t===void 0?16:tv(t.type)),t):1}function Kn(t,e,n,i){if(50<Ia)throw Ia=0,Id=null,Error(he(185));no(t,n,i),(!(lt&2)||t!==Vt)&&(t===Vt&&(!(lt&2)&&(hc|=n),kt===4&&Xi(t,Xt)),hn(t,i),n===1&&lt===0&&!(e.mode&1)&&(Vs=Pt()+500,cc&&gr()))}function hn(t,e){var n=t.callbackNode;N_(t,e);var i=Tl(t,t===Vt?Xt:0);if(i===0)n!==null&&Ah(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&Ah(n),e===1)t.tag===0?Ry(_p.bind(null,t)):yv(_p.bind(null,t)),Ty(function(){!(lt&6)&&gr()}),n=null;else{switch(Yg(i)){case 1:n=ff;break;case 4:n=Xg;break;case 16:n=wl;break;case 536870912:n=$g;break;default:n=wl}n=xx(n,dx.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function dx(t,e){if(ml=-1,gl=0,lt&6)throw Error(he(327));var n=t.callbackNode;if(Ds()&&t.callbackNode!==n)return null;var i=Tl(t,t===Vt?Xt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Vl(t,i);else{e=i;var r=lt;lt|=2;var s=hx();(Vt!==t||Xt!==e)&&(gi=null,Vs=Pt()+500,zr(t,e));do try{Ky();break}catch(o){fx(t,o)}while(!0);Tf(),zl.current=s,lt=r,It!==null?e=0:(Vt=null,Xt=0,e=kt)}if(e!==0){if(e===2&&(r=od(t),r!==0&&(i=r,e=Ud(t,r))),e===1)throw n=Qa,zr(t,0),Xi(t,i),hn(t,Pt()),n;if(e===6)Xi(t,i);else{if(r=t.current.alternate,!(i&30)&&!qy(r)&&(e=Vl(t,i),e===2&&(s=od(t),s!==0&&(i=s,e=Ud(t,s))),e===1))throw n=Qa,zr(t,0),Xi(t,i),hn(t,Pt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(he(345));case 2:Rr(t,ln,gi);break;case 3:if(Xi(t,i),(i&130023424)===i&&(e=zf+500-Pt(),10<e)){if(Tl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){nn(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=md(Rr.bind(null,t,ln,gi),e);break}Rr(t,ln,gi);break;case 4:if(Xi(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var a=31-Yn(i);s=1<<a,a=e[a],a>r&&(r=a),i&=~s}if(i=r,i=Pt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*$y(i/1960))-i,10<i){t.timeoutHandle=md(Rr.bind(null,t,ln,gi),i);break}Rr(t,ln,gi);break;case 5:Rr(t,ln,gi);break;default:throw Error(he(329))}}}return hn(t,Pt()),t.callbackNode===n?dx.bind(null,t):null}function Ud(t,e){var n=Da;return t.current.memoizedState.isDehydrated&&(zr(t,e).flags|=256),t=Vl(t,e),t!==2&&(e=ln,ln=n,e!==null&&Fd(e)),t}function Fd(t){ln===null?ln=t:ln.push.apply(ln,t)}function qy(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!Qn(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Xi(t,e){for(e&=~Bf,e&=~hc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Yn(e),i=1<<n;t[n]=-1,e&=~i}}function _p(t){if(lt&6)throw Error(he(327));Ds();var e=Tl(t,0);if(!(e&1))return hn(t,Pt()),null;var n=Vl(t,e);if(t.tag!==0&&n===2){var i=od(t);i!==0&&(e=i,n=Ud(t,i))}if(n===1)throw n=Qa,zr(t,0),Xi(t,e),hn(t,Pt()),n;if(n===6)throw Error(he(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Rr(t,ln,gi),hn(t,Pt()),null}function jf(t,e){var n=lt;lt|=1;try{return t(e)}finally{lt=n,lt===0&&(Vs=Pt()+500,cc&&gr())}}function Xr(t){Yi!==null&&Yi.tag===0&&!(lt&6)&&Ds();var e=lt;lt|=1;var n=Dn.transition,i=pt;try{if(Dn.transition=null,pt=1,t)return t()}finally{pt=i,Dn.transition=n,lt=e,!(lt&6)&&gr()}}function Hf(){_n=Cs.current,Mt(Cs)}function zr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,wy(n)),It!==null)for(n=It.return;n!==null;){var i=n;switch(Mf(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Nl();break;case 3:js(),Mt(dn),Mt(Jt),Pf();break;case 5:Nf(i);break;case 4:js();break;case 13:Mt(Tt);break;case 19:Mt(Tt);break;case 10:Cf(i.type._context);break;case 22:case 23:Hf()}n=n.return}if(Vt=t,It=t=sr(t.current,null),Xt=_n=e,kt=0,Qa=null,Bf=hc=Wr=0,ln=Da=null,Fr!==null){for(e=0;e<Fr.length;e++)if(n=Fr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var a=s.next;s.next=r,i.next=a}n.pending=i}Fr=null}return t}function fx(t,e){do{var n=It;try{if(Tf(),fl.current=Bl,Ol){for(var i=Ct.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Ol=!1}if(Gr=0,Ht=Ft=Ct=null,Pa=!1,Ya=0,Of.current=null,n===null||n.return===null){kt=1,Qa=e,It=null;break}e:{var s=t,a=n.return,o=n,c=e;if(e=Xt,o.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var u=c,f=o,p=f.tag;if(!(f.mode&1)&&(p===0||p===11||p===15)){var h=f.alternate;h?(f.updateQueue=h.updateQueue,f.memoizedState=h.memoizedState,f.lanes=h.lanes):(f.updateQueue=null,f.memoizedState=null)}var m=ap(a);if(m!==null){m.flags&=-257,op(m,a,o,s,e),m.mode&1&&sp(s,u,e),e=m,c=u;var y=e.updateQueue;if(y===null){var v=new Set;v.add(c),e.updateQueue=v}else y.add(c);break e}else{if(!(e&1)){sp(s,u,e),Vf();break e}c=Error(he(426))}}else if(wt&&o.mode&1){var g=ap(a);if(g!==null){!(g.flags&65536)&&(g.flags|=256),op(g,a,o,s,e),Ef(Hs(c,o));break e}}s=c=Hs(c,o),kt!==4&&(kt=2),Da===null?Da=[s]:Da.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var d=Yv(s,c,e);Jh(s,d);break e;case 1:o=c;var x=s.type,_=s.stateNode;if(!(s.flags&128)&&(typeof x.getDerivedStateFromError=="function"||_!==null&&typeof _.componentDidCatch=="function"&&(ir===null||!ir.has(_)))){s.flags|=65536,e&=-e,s.lanes|=e;var E=Kv(s,o,e);Jh(s,E);break e}}s=s.return}while(s!==null)}mx(n)}catch(R){e=R,It===n&&n!==null&&(It=n=n.return);continue}break}while(!0)}function hx(){var t=zl.current;return zl.current=Bl,t===null?Bl:t}function Vf(){(kt===0||kt===3||kt===2)&&(kt=4),Vt===null||!(Wr&268435455)&&!(hc&268435455)||Xi(Vt,Xt)}function Vl(t,e){var n=lt;lt|=2;var i=hx();(Vt!==t||Xt!==e)&&(gi=null,zr(t,e));do try{Yy();break}catch(r){fx(t,r)}while(!0);if(Tf(),lt=n,zl.current=i,It!==null)throw Error(he(261));return Vt=null,Xt=0,kt}function Yy(){for(;It!==null;)px(It)}function Ky(){for(;It!==null&&!S_();)px(It)}function px(t){var e=vx(t.alternate,t,_n);t.memoizedProps=t.pendingProps,e===null?mx(t):It=e,Of.current=null}function mx(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=Vy(n,e),n!==null){n.flags&=32767,It=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{kt=6,It=null;return}}else if(n=Hy(n,e,_n),n!==null){It=n;return}if(e=e.sibling,e!==null){It=e;return}It=e=t}while(e!==null);kt===0&&(kt=5)}function Rr(t,e,n){var i=pt,r=Dn.transition;try{Dn.transition=null,pt=1,Zy(t,e,n,i)}finally{Dn.transition=r,pt=i}return null}function Zy(t,e,n,i){do Ds();while(Yi!==null);if(lt&6)throw Error(he(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(he(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(P_(t,s),t===Vt&&(It=Vt=null,Xt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Po||(Po=!0,xx(wl,function(){return Ds(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Dn.transition,Dn.transition=null;var a=pt;pt=1;var o=lt;lt|=4,Of.current=null,Wy(t,n),cx(n,t),vy(hd),Cl=!!fd,hd=fd=null,t.current=n,Xy(n),M_(),lt=o,pt=a,Dn.transition=s}else t.current=n;if(Po&&(Po=!1,Yi=t,Hl=r),s=t.pendingLanes,s===0&&(ir=null),T_(n.stateNode),hn(t,Pt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(jl)throw jl=!1,t=Dd,Dd=null,t;return Hl&1&&t.tag!==0&&Ds(),s=t.pendingLanes,s&1?t===Id?Ia++:(Ia=0,Id=t):Ia=0,gr(),null}function Ds(){if(Yi!==null){var t=Yg(Hl),e=Dn.transition,n=pt;try{if(Dn.transition=null,pt=16>t?16:t,Yi===null)var i=!1;else{if(t=Yi,Yi=null,Hl=0,lt&6)throw Error(he(331));var r=lt;for(lt|=4,Ne=t.current;Ne!==null;){var s=Ne,a=s.child;if(Ne.flags&16){var o=s.deletions;if(o!==null){for(var c=0;c<o.length;c++){var u=o[c];for(Ne=u;Ne!==null;){var f=Ne;switch(f.tag){case 0:case 11:case 15:La(8,f,s)}var p=f.child;if(p!==null)p.return=f,Ne=p;else for(;Ne!==null;){f=Ne;var h=f.sibling,m=f.return;if(ax(f),f===u){Ne=null;break}if(h!==null){h.return=m,Ne=h;break}Ne=m}}}var y=s.alternate;if(y!==null){var v=y.child;if(v!==null){y.child=null;do{var g=v.sibling;v.sibling=null,v=g}while(v!==null)}}Ne=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,Ne=a;else e:for(;Ne!==null;){if(s=Ne,s.flags&2048)switch(s.tag){case 0:case 11:case 15:La(9,s,s.return)}var d=s.sibling;if(d!==null){d.return=s.return,Ne=d;break e}Ne=s.return}}var x=t.current;for(Ne=x;Ne!==null;){a=Ne;var _=a.child;if(a.subtreeFlags&2064&&_!==null)_.return=a,Ne=_;else e:for(a=x;Ne!==null;){if(o=Ne,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:fc(9,o)}}catch(R){Rt(o,o.return,R)}if(o===a){Ne=null;break e}var E=o.sibling;if(E!==null){E.return=o.return,Ne=E;break e}Ne=o.return}}if(lt=r,gr(),ai&&typeof ai.onPostCommitFiberRoot=="function")try{ai.onPostCommitFiberRoot(rc,t)}catch{}i=!0}return i}finally{pt=n,Dn.transition=e}}return!1}function yp(t,e,n){e=Hs(n,e),e=Yv(t,e,1),t=nr(t,e,1),e=nn(),t!==null&&(no(t,1,e),hn(t,e))}function Rt(t,e,n){if(t.tag===3)yp(t,t,n);else for(;e!==null;){if(e.tag===3){yp(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(ir===null||!ir.has(i))){t=Hs(n,t),t=Kv(e,t,1),e=nr(e,t,1),t=nn(),e!==null&&(no(e,1,t),hn(e,t));break}}e=e.return}}function Qy(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=nn(),t.pingedLanes|=t.suspendedLanes&n,Vt===t&&(Xt&n)===n&&(kt===4||kt===3&&(Xt&130023424)===Xt&&500>Pt()-zf?zr(t,0):Bf|=n),hn(t,e)}function gx(t,e){e===0&&(t.mode&1?(e=So,So<<=1,!(So&130023424)&&(So=4194304)):e=1);var n=nn();t=Ai(t,e),t!==null&&(no(t,e,n),hn(t,n))}function Jy(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),gx(t,n)}function eS(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(he(314))}i!==null&&i.delete(e),gx(t,n)}var vx;vx=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||dn.current)un=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return un=!1,jy(t,e,n);un=!!(t.flags&131072)}else un=!1,wt&&e.flags&1048576&&Sv(e,Dl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;pl(t,e),t=e.pendingProps;var r=Os(e,Jt.current);Ls(e,n),r=Df(null,e,i,t,r,n);var s=If();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,fn(i)?(s=!0,Pl(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,bf(e),r.updater=dc,e.stateNode=r,r._reactInternals=e,Md(e,i,t,n),e=Td(null,e,i,!0,s,n)):(e.tag=0,wt&&s&&Sf(e),tn(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(pl(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=nS(i),t=Wn(i,t),r){case 0:e=wd(null,e,i,t,n);break e;case 1:e=up(null,e,i,t,n);break e;case 11:e=lp(null,e,i,t,n);break e;case 14:e=cp(null,e,i,Wn(i.type,t),n);break e}throw Error(he(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Wn(i,r),wd(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Wn(i,r),up(t,e,i,r,n);case 3:e:{if(ex(e),t===null)throw Error(he(387));i=e.pendingProps,s=e.memoizedState,r=s.element,Av(t,e),Fl(e,i,null,n);var a=e.memoizedState;if(i=a.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Hs(Error(he(423)),e),e=dp(t,e,i,n,r);break e}else if(i!==r){r=Hs(Error(he(424)),e),e=dp(t,e,i,n,r);break e}else for(yn=tr(e.stateNode.containerInfo.firstChild),Sn=e,wt=!0,$n=null,n=Tv(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Bs(),i===r){e=bi(t,e,n);break e}tn(t,e,i,n)}e=e.child}return e;case 5:return bv(e),t===null&&_d(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,a=r.children,pd(i,r)?a=null:s!==null&&pd(i,s)&&(e.flags|=32),Jv(t,e),tn(t,e,a,n),e.child;case 6:return t===null&&_d(e),null;case 13:return tx(t,e,n);case 4:return Rf(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=zs(e,null,i,n):tn(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Wn(i,r),lp(t,e,i,r,n);case 7:return tn(t,e,e.pendingProps,n),e.child;case 8:return tn(t,e,e.pendingProps.children,n),e.child;case 12:return tn(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,a=r.value,xt(Il,i._currentValue),i._currentValue=a,s!==null)if(Qn(s.value,a)){if(s.children===r.children&&!dn.current){e=bi(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var o=s.dependencies;if(o!==null){a=s.child;for(var c=o.firstContext;c!==null;){if(c.context===i){if(s.tag===1){c=wi(-1,n&-n),c.tag=2;var u=s.updateQueue;if(u!==null){u=u.shared;var f=u.pending;f===null?c.next=c:(c.next=f.next,f.next=c),u.pending=c}}s.lanes|=n,c=s.alternate,c!==null&&(c.lanes|=n),yd(s.return,n,e),o.lanes|=n;break}c=c.next}}else if(s.tag===10)a=s.type===e.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(he(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),yd(a,n,e),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===e){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}tn(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Ls(e,n),r=Un(r),i=i(r),e.flags|=1,tn(t,e,i,n),e.child;case 14:return i=e.type,r=Wn(i,e.pendingProps),r=Wn(i.type,r),cp(t,e,i,r,n);case 15:return Zv(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Wn(i,r),pl(t,e),e.tag=1,fn(i)?(t=!0,Pl(e)):t=!1,Ls(e,n),qv(e,i,r),Md(e,i,r,n),Td(null,e,i,!0,t,n);case 19:return nx(t,e,n);case 22:return Qv(t,e,n)}throw Error(he(156,e.tag))};function xx(t,e){return Wg(t,e)}function tS(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Pn(t,e,n,i){return new tS(t,e,n,i)}function Gf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function nS(t){if(typeof t=="function")return Gf(t)?1:0;if(t!=null){if(t=t.$$typeof,t===cf)return 11;if(t===uf)return 14}return 2}function sr(t,e){var n=t.alternate;return n===null?(n=Pn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function vl(t,e,n,i,r,s){var a=2;if(i=t,typeof t=="function")Gf(t)&&(a=1);else if(typeof t=="string")a=5;else e:switch(t){case gs:return jr(n.children,r,s,e);case lf:a=8,r|=8;break;case Xu:return t=Pn(12,n,e,r|2),t.elementType=Xu,t.lanes=s,t;case $u:return t=Pn(13,n,e,r),t.elementType=$u,t.lanes=s,t;case qu:return t=Pn(19,n,e,r),t.elementType=qu,t.lanes=s,t;case bg:return pc(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Cg:a=10;break e;case Ag:a=9;break e;case cf:a=11;break e;case uf:a=14;break e;case Vi:a=16,i=null;break e}throw Error(he(130,t==null?t:typeof t,""))}return e=Pn(a,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function jr(t,e,n,i){return t=Pn(7,t,i,e),t.lanes=n,t}function pc(t,e,n,i){return t=Pn(22,t,i,e),t.elementType=bg,t.lanes=n,t.stateNode={isHidden:!1},t}function eu(t,e,n){return t=Pn(6,t,null,e),t.lanes=n,t}function tu(t,e,n){return e=Pn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function iS(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Uc(0),this.expirationTimes=Uc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Uc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Wf(t,e,n,i,r,s,a,o,c){return t=new iS(t,e,n,o,c),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Pn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},bf(s),t}function rS(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ms,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function _x(t){if(!t)return ur;t=t._reactInternals;e:{if(Kr(t)!==t||t.tag!==1)throw Error(he(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(fn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(he(171))}if(t.tag===1){var n=t.type;if(fn(n))return _v(t,n,e)}return e}function yx(t,e,n,i,r,s,a,o,c){return t=Wf(n,i,!0,t,r,s,a,o,c),t.context=_x(null),n=t.current,i=nn(),r=rr(n),s=wi(i,r),s.callback=e??null,nr(n,s,r),t.current.lanes=r,no(t,r,i),hn(t,i),t}function mc(t,e,n,i){var r=e.current,s=nn(),a=rr(r);return n=_x(n),e.context===null?e.context=n:e.pendingContext=n,e=wi(s,a),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=nr(r,e,a),t!==null&&(Kn(t,r,a,s),dl(t,r,a)),a}function Gl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Sp(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Xf(t,e){Sp(t,e),(t=t.alternate)&&Sp(t,e)}function sS(){return null}var Sx=typeof reportError=="function"?reportError:function(t){console.error(t)};function $f(t){this._internalRoot=t}gc.prototype.render=$f.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(he(409));mc(t,e,null,null)};gc.prototype.unmount=$f.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Xr(function(){mc(null,t,null,null)}),e[Ci]=null}};function gc(t){this._internalRoot=t}gc.prototype.unstable_scheduleHydration=function(t){if(t){var e=Qg();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Wi.length&&e!==0&&e<Wi[n].priority;n++);Wi.splice(n,0,t),n===0&&ev(t)}};function qf(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function vc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Mp(){}function aS(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var u=Gl(a);s.call(u)}}var a=yx(e,i,t,0,null,!1,!1,"",Mp);return t._reactRootContainer=a,t[Ci]=a.current,Ga(t.nodeType===8?t.parentNode:t),Xr(),a}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var o=i;i=function(){var u=Gl(c);o.call(u)}}var c=Wf(t,0,!1,null,null,!1,!1,"",Mp);return t._reactRootContainer=c,t[Ci]=c.current,Ga(t.nodeType===8?t.parentNode:t),Xr(function(){mc(e,c,n,i)}),c}function xc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var a=s;if(typeof r=="function"){var o=r;r=function(){var c=Gl(a);o.call(c)}}mc(e,a,t,r)}else a=aS(n,e,t,r,i);return Gl(a)}Kg=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Ea(e.pendingLanes);n!==0&&(hf(e,n|1),hn(e,Pt()),!(lt&6)&&(Vs=Pt()+500,gr()))}break;case 13:Xr(function(){var i=Ai(t,1);if(i!==null){var r=nn();Kn(i,t,1,r)}}),Xf(t,1)}};pf=function(t){if(t.tag===13){var e=Ai(t,134217728);if(e!==null){var n=nn();Kn(e,t,134217728,n)}Xf(t,134217728)}};Zg=function(t){if(t.tag===13){var e=rr(t),n=Ai(t,e);if(n!==null){var i=nn();Kn(n,t,e,i)}Xf(t,e)}};Qg=function(){return pt};Jg=function(t,e){var n=pt;try{return pt=t,e()}finally{pt=n}};rd=function(t,e,n){switch(e){case"input":if(Zu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=lc(i);if(!r)throw Error(he(90));Ng(i),Zu(i,r)}}}break;case"textarea":Lg(t,n);break;case"select":e=n.value,e!=null&&bs(t,!!n.multiple,e,!1)}};Bg=jf;zg=Xr;var oS={usingClientEntryPoint:!1,Events:[ro,ys,lc,kg,Og,jf]},da={findFiberByHostInstance:Ur,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},lS={bundleType:da.bundleType,version:da.version,rendererPackageName:da.rendererPackageName,rendererConfig:da.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Li.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Vg(t),t===null?null:t.stateNode},findFiberByHostInstance:da.findFiberByHostInstance||sS,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Lo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Lo.isDisabled&&Lo.supportsFiber)try{rc=Lo.inject(lS),ai=Lo}catch{}}En.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=oS;En.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!qf(e))throw Error(he(200));return rS(t,e,null,n)};En.createRoot=function(t,e){if(!qf(t))throw Error(he(299));var n=!1,i="",r=Sx;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Wf(t,1,!1,null,null,n,!1,i,r),t[Ci]=e.current,Ga(t.nodeType===8?t.parentNode:t),new $f(e)};En.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(he(188)):(t=Object.keys(t).join(","),Error(he(268,t)));return t=Vg(e),t=t===null?null:t.stateNode,t};En.flushSync=function(t){return Xr(t)};En.hydrate=function(t,e,n){if(!vc(e))throw Error(he(200));return xc(null,t,e,!0,n)};En.hydrateRoot=function(t,e,n){if(!qf(t))throw Error(he(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",a=Sx;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),e=yx(e,null,t,1,n??null,r,!1,s,a),t[Ci]=e.current,Ga(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new gc(e)};En.render=function(t,e,n){if(!vc(e))throw Error(he(200));return xc(null,t,e,!1,n)};En.unmountComponentAtNode=function(t){if(!vc(t))throw Error(he(40));return t._reactRootContainer?(Xr(function(){xc(null,null,t,!1,function(){t._reactRootContainer=null,t[Ci]=null})}),!0):!1};En.unstable_batchedUpdates=jf;En.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!vc(n))throw Error(he(200));if(t==null||t._reactInternals===void 0)throw Error(he(38));return xc(t,e,n,!1,i)};En.version="18.3.1-next-f1338f8080-20240426";function Mx(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Mx)}catch(t){console.error(t)}}Mx(),Mg.exports=En;var cS=Mg.exports,Ep=cS;Gu.createRoot=Ep.createRoot,Gu.hydrateRoot=Ep.hydrateRoot;/**
 * react-router v7.18.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var Yf=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,Ex=/^[\\/]{2}/;function uS(t,e){return e+t.replace(/\\/g,"/")}var wp="popstate";function Tp(t){return typeof t=="object"&&t!=null&&"pathname"in t&&"search"in t&&"hash"in t&&"state"in t&&"key"in t}function dS(t={}){function e(i,r){var u;let s=(u=r.state)==null?void 0:u.masked,{pathname:a,search:o,hash:c}=s||i.location;return kd("",{pathname:a,search:o,hash:c},r.state&&r.state.usr||null,r.state&&r.state.key||"default",s?{pathname:i.location.pathname,search:i.location.search,hash:i.location.hash}:void 0)}function n(i,r){return typeof r=="string"?r:Ja(r)}return hS(e,n,null,t)}function At(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function li(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function fS(){return Math.random().toString(36).substring(2,10)}function Cp(t,e){return{usr:t.state,key:t.key,idx:e,masked:t.mask?{pathname:t.pathname,search:t.search,hash:t.hash}:void 0}}function kd(t,e,n=null,i,r){return{pathname:typeof t=="string"?t:t.pathname,search:"",hash:"",...typeof e=="string"?Js(e):e,state:n,key:e&&e.key||i||fS(),mask:r}}function Ja({pathname:t="/",search:e="",hash:n=""}){return e&&e!=="?"&&(t+=e.charAt(0)==="?"?e:"?"+e),n&&n!=="#"&&(t+=n.charAt(0)==="#"?n:"#"+n),t}function Js(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substring(n),t=t.substring(0,n));let i=t.indexOf("?");i>=0&&(e.search=t.substring(i),t=t.substring(0,i)),t&&(e.pathname=t)}return e}function hS(t,e,n,i={}){let{window:r=document.defaultView,v5Compat:s=!1}=i,a=r.history,o="POP",c=null,u=f();u==null&&(u=0,a.replaceState({...a.state,idx:u},""));function f(){return(a.state||{idx:null}).idx}function p(){o="POP";let g=f(),d=g==null?null:g-u;u=g,c&&c({action:o,location:v.location,delta:d})}function h(g,d){o="PUSH";let x=Tp(g)?g:kd(v.location,g,d);u=f()+1;let _=Cp(x,u),E=v.createHref(x.mask||x);try{a.pushState(_,"",E)}catch(R){if(R instanceof DOMException&&R.name==="DataCloneError")throw R;r.location.assign(E)}s&&c&&c({action:o,location:v.location,delta:1})}function m(g,d){o="REPLACE";let x=Tp(g)?g:kd(v.location,g,d);u=f();let _=Cp(x,u),E=v.createHref(x.mask||x);a.replaceState(_,"",E),s&&c&&c({action:o,location:v.location,delta:0})}function y(g){return pS(r,g)}let v={get action(){return o},get location(){return t(r,a)},listen(g){if(c)throw new Error("A history only accepts one active listener");return r.addEventListener(wp,p),c=g,()=>{r.removeEventListener(wp,p),c=null}},createHref(g){return e(r,g)},createURL:y,encodeLocation(g){let d=y(g);return{pathname:d.pathname,search:d.search,hash:d.hash}},push:h,replace:m,go(g){return a.go(g)}};return v}function pS(t,e,n=!1){let i="http://localhost";t&&(i=t.location.origin!=="null"?t.location.origin:t.location.href),At(i,"No window.location.(origin|href) available to create URL");let r=typeof e=="string"?e:Ja(e);return r=r.replace(/ $/,"%20"),!n&&Ex.test(r)&&(r=i+r),new URL(r,i)}function wx(t,e,n="/"){return mS(t,e,n,!1)}function mS(t,e,n,i,r){let s=typeof e=="string"?Js(e):e,a=Ri(s.pathname||"/",n);if(a==null)return null;let o=gS(t),c=null,u=AS(a);for(let f=0;c==null&&f<o.length;++f)c=CS(o[f],u,i);return c}function gS(t){let e=Tx(t);return vS(e),e}function Tx(t,e=[],n=[],i="",r=!1){let s=(a,o,c=r,u)=>{let f={relativePath:u===void 0?a.path||"":u,caseSensitive:a.caseSensitive===!0,childrenIndex:o,route:a};if(f.relativePath.startsWith("/")){if(!f.relativePath.startsWith(i)&&c)return;At(f.relativePath.startsWith(i),`Absolute route path "${f.relativePath}" nested under path "${i}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),f.relativePath=f.relativePath.slice(i.length)}let p=Zn([i,f.relativePath]),h=n.concat(f);a.children&&a.children.length>0&&(At(a.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${p}".`),Tx(a.children,e,h,p,c)),!(a.path==null&&!a.index)&&e.push({path:p,score:wS(p,a.index),routesMeta:h.map((m,y)=>{let[v,g]=bx(m.relativePath,m.caseSensitive,y===h.length-1);return{...m,matcher:v,compiledParams:g}})})};return t.forEach((a,o)=>{var c;if(a.path===""||!((c=a.path)!=null&&c.includes("?")))s(a,o);else for(let u of Cx(a.path))s(a,o,!0,u)}),e}function Cx(t){let e=t.split("/");if(e.length===0)return[];let[n,...i]=e,r=n.endsWith("?"),s=n.replace(/\?$/,"");if(i.length===0)return r?[s,""]:[s];let a=Cx(i.join("/")),o=[];return o.push(...a.map(c=>c===""?s:[s,c].join("/"))),r&&o.push(...a),o.map(c=>t.startsWith("/")&&c===""?"/":c)}function vS(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:TS(e.routesMeta.map(i=>i.childrenIndex),n.routesMeta.map(i=>i.childrenIndex)))}var xS=/^:[\w-]+$/,_S=3,yS=2,SS=1,MS=10,ES=-2,Ap=t=>t==="*";function wS(t,e){let n=t.split("/"),i=n.length;return n.some(Ap)&&(i+=ES),e&&(i+=yS),n.filter(r=>!Ap(r)).reduce((r,s)=>r+(xS.test(s)?_S:s===""?SS:MS),i)}function TS(t,e){return t.length===e.length&&t.slice(0,-1).every((i,r)=>i===e[r])?t[t.length-1]-e[e.length-1]:0}function CS(t,e,n=!1){let{routesMeta:i}=t,r={},s="/",a=[];for(let o=0;o<i.length;++o){let c=i[o],u=o===i.length-1,f=s==="/"?e:e.slice(s.length)||"/",p={path:c.relativePath,caseSensitive:c.caseSensitive,end:u},h=c.matcher&&c.compiledParams?Ax(p,f,c.matcher,c.compiledParams):Wl(p,f),m=c.route;if(!h&&u&&n&&!i[i.length-1].route.index&&(h=Wl({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},f)),!h)return null;Object.assign(r,h.params),a.push({params:r,pathname:Zn([s,h.pathname]),pathnameBase:NS(Zn([s,h.pathnameBase])),route:m}),h.pathnameBase!=="/"&&(s=Zn([s,h.pathnameBase]))}return a}function Wl(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,i]=bx(t.path,t.caseSensitive,t.end);return Ax(t,e,n,i)}function Ax(t,e,n,i){let r=e.match(n);if(!r)return null;let s=r[0],a=s.replace(/(.)\/+$/,"$1"),o=r.slice(1);return{params:i.reduce((u,{paramName:f,isOptional:p},h)=>{if(f==="*"){let y=o[h]||"";a=s.slice(0,s.length-y.length).replace(/(.)\/+$/,"$1")}const m=o[h];return p&&!m?u[f]=void 0:u[f]=(m||"").replace(/%2F/g,"/"),u},{}),pathname:s,pathnameBase:a,pattern:t}}function bx(t,e=!1,n=!0){li(t==="*"||!t.endsWith("*")||t.endsWith("/*"),`Route path "${t}" will be treated as if it were "${t.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/,"/*")}".`);let i=[],r="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,o,c,u,f)=>{if(i.push({paramName:o,isOptional:c!=null}),c){let p=f.charAt(u+a.length);return p&&p!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return t.endsWith("*")?(i.push({paramName:"*"}),r+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?r+="\\/*$":t!==""&&t!=="/"&&(r+="(?:(?=\\/|$))"),[new RegExp(r,e?void 0:"i"),i]}function AS(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return li(!1,`The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${e}).`),t}}function Ri(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,i=t.charAt(n);return i&&i!=="/"?null:t.slice(n)||"/"}function bS(t,e="/"){let{pathname:n,search:i="",hash:r=""}=typeof t=="string"?Js(t):t,s;return n?(n=Nx(n),n.startsWith("/")?s=bp(n.substring(1),"/"):s=bp(n,e)):s=e,{pathname:s,search:PS(i),hash:LS(r)}}function bp(t,e){let n=Xl(e).split("/");return t.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function nu(t,e,n,i){return`Cannot include a '${t}' character in a manually specified \`to.${e}\` field [${JSON.stringify(i)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function RS(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function Rx(t){let e=RS(t);return e.map((n,i)=>i===e.length-1?n.pathname:n.pathnameBase)}function Kf(t,e,n,i=!1){let r;typeof t=="string"?r=Js(t):(r={...t},At(!r.pathname||!r.pathname.includes("?"),nu("?","pathname","search",r)),At(!r.pathname||!r.pathname.includes("#"),nu("#","pathname","hash",r)),At(!r.search||!r.search.includes("#"),nu("#","search","hash",r)));let s=t===""||r.pathname==="",a=s?"/":r.pathname,o;if(a==null)o=n;else{let p=e.length-1;if(!i&&a.startsWith("..")){let h=a.split("/");for(;h[0]==="..";)h.shift(),p-=1;r.pathname=h.join("/")}o=p>=0?e[p]:"/"}let c=bS(r,o),u=a&&a!=="/"&&a.endsWith("/"),f=(s||a===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(u||f)&&(c.pathname+="/"),c}var Nx=t=>t.replace(/[\\/]{2,}/g,"/"),Zn=t=>Nx(t.join("/")),Xl=t=>t.replace(/\/+$/,""),NS=t=>Xl(t).replace(/^\/*/,"/"),PS=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,LS=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t,DS=class{constructor(t,e,n,i=!1){this.status=t,this.statusText=e||"",this.internal=i,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function IS(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}function US(t){let e=t.map(n=>n.route.path).filter(Boolean);return Zn(e)||"/"}var Px=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function Lx(t,e){let n=t;if(typeof n!="string"||!Yf.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let i=n,r=!1;if(Px)try{let s=new URL(window.location.href),a=Ex.test(n)?new URL(uS(n,s.protocol)):new URL(n),o=Ri(a.pathname,e);a.origin===s.origin&&o!=null?n=o+a.search+a.hash:r=!0}catch{li(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:i,isExternal:r,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var Dx=["POST","PUT","PATCH","DELETE"];new Set(Dx);var FS=["GET",...Dx];new Set(FS);var kS=["about:","blob:","chrome:","chrome-untrusted:","content:","data:","devtools:","file:","filesystem:","javascript:"];function OS(t){try{return kS.includes(new URL(t).protocol)}catch{return!1}}var ea=L.createContext(null);ea.displayName="DataRouter";var _c=L.createContext(null);_c.displayName="DataRouterState";var Ix=L.createContext(!1);function BS(){return L.useContext(Ix)}var Ux=L.createContext({isTransitioning:!1});Ux.displayName="ViewTransition";var zS=L.createContext(new Map);zS.displayName="Fetchers";var jS=L.createContext(null);jS.displayName="Await";var kn=L.createContext(null);kn.displayName="Navigation";var ao=L.createContext(null);ao.displayName="Location";var Di=L.createContext({outlet:null,matches:[],isDataRoute:!1});Di.displayName="Route";var Zf=L.createContext(null);Zf.displayName="RouteError";var Fx="REACT_ROUTER_ERROR",HS="REDIRECT",VS="ROUTE_ERROR_RESPONSE";function GS(t){if(t.startsWith(`${Fx}:${HS}:{`))try{let e=JSON.parse(t.slice(28));if(typeof e=="object"&&e&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.location=="string"&&typeof e.reloadDocument=="boolean"&&typeof e.replace=="boolean")return e}catch{}}function WS(t){if(t.startsWith(`${Fx}:${VS}:{`))try{let e=JSON.parse(t.slice(40));if(typeof e=="object"&&e&&typeof e.status=="number"&&typeof e.statusText=="string")return new DS(e.status,e.statusText,e.data)}catch{}}function XS(t,{relative:e}={}){At(oo(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:i}=L.useContext(kn),{hash:r,pathname:s,search:a}=lo(t,{relative:e}),o=s;return n!=="/"&&(o=s==="/"?n:Zn([n,s])),i.createHref({pathname:o,search:a,hash:r})}function oo(){return L.useContext(ao)!=null}function Ii(){return At(oo(),"useLocation() may be used only in the context of a <Router> component."),L.useContext(ao).location}var kx="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Ox(t){L.useContext(kn).static||L.useLayoutEffect(t)}function $S(){let{isDataRoute:t}=L.useContext(Di);return t?aM():qS()}function qS(){At(oo(),"useNavigate() may be used only in the context of a <Router> component.");let t=L.useContext(ea),{basename:e,navigator:n}=L.useContext(kn),{matches:i}=L.useContext(Di),{pathname:r}=Ii(),s=JSON.stringify(Rx(i)),a=L.useRef(!1);return Ox(()=>{a.current=!0}),L.useCallback((c,u={})=>{if(li(a.current,kx),!a.current)return;if(typeof c=="number"){n.go(c);return}let f=Kf(c,JSON.parse(s),r,u.relative==="path");t==null&&e!=="/"&&(f.pathname=f.pathname==="/"?e:Zn([e,f.pathname])),(u.replace?n.replace:n.push)(f,u.state,u)},[e,n,s,r,t])}L.createContext(null);function lo(t,{relative:e}={}){let{matches:n}=L.useContext(Di),{pathname:i}=Ii(),r=JSON.stringify(Rx(n));return L.useMemo(()=>Kf(t,JSON.parse(r),i,e==="path"),[t,r,i,e])}function YS(t,e){return Bx(t,e)}function Bx(t,e,n){var g;At(oo(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:i}=L.useContext(kn),{matches:r}=L.useContext(Di),s=r[r.length-1],a=s?s.params:{},o=s?s.pathname:"/",c=s?s.pathnameBase:"/",u=s&&s.route;{let d=u&&u.path||"";jx(o,!u||d.endsWith("*")||d.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${o}" (under <Route path="${d}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${d}"> to <Route path="${d==="/"?"*":`${d}/*`}">.`)}let f=Ii(),p;if(e){let d=typeof e=="string"?Js(e):e;At(c==="/"||((g=d.pathname)==null?void 0:g.startsWith(c)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${d.pathname}" was given in the \`location\` prop.`),p=d}else p=f;let h=p.pathname||"/",m=h;if(c!=="/"){let d=c.replace(/^\//,"").split("/");m="/"+h.replace(/^\//,"").split("/").slice(d.length).join("/")}let y=n&&n.state.matches.length?n.state.matches.map(d=>Object.assign(d,{route:n.manifest[d.route.id]||d.route})):wx(t,{pathname:m});li(u||y!=null,`No routes matched location "${p.pathname}${p.search}${p.hash}" `),li(y==null||y[y.length-1].route.element!==void 0||y[y.length-1].route.Component!==void 0||y[y.length-1].route.lazy!==void 0,`Matched leaf route at location "${p.pathname}${p.search}${p.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let v=eM(y&&y.map(d=>Object.assign({},d,{params:Object.assign({},a,d.params),pathname:Zn([c,i.encodeLocation?i.encodeLocation(d.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:d.pathname]),pathnameBase:d.pathnameBase==="/"?c:Zn([c,i.encodeLocation?i.encodeLocation(d.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:d.pathnameBase])})),r,n);return e&&v?L.createElement(ao.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",mask:void 0,...p},navigationType:"POP"}},v):v}function KS(){let t=sM(),e=IS(t)?`${t.status} ${t.statusText}`:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,i="rgba(200,200,200, 0.5)",r={padding:"0.5rem",backgroundColor:i},s={padding:"2px 4px",backgroundColor:i},a=null;return console.error("Error handled by React Router default ErrorBoundary:",t),a=L.createElement(L.Fragment,null,L.createElement("p",null,"💿 Hey developer 👋"),L.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",L.createElement("code",{style:s},"ErrorBoundary")," or"," ",L.createElement("code",{style:s},"errorElement")," prop on your route.")),L.createElement(L.Fragment,null,L.createElement("h2",null,"Unexpected Application Error!"),L.createElement("h3",{style:{fontStyle:"italic"}},e),n?L.createElement("pre",{style:r},n):null,a)}var ZS=L.createElement(KS,null),zx=class extends L.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,e){return e.location!==t.location||e.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:e.error,location:e.location,revalidation:t.revalidation||e.revalidation}}componentDidCatch(t,e){this.props.onError?this.props.onError(t,e):console.error("React Router caught the following error during render",t)}render(){let t=this.state.error;if(this.context&&typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){const n=WS(t.digest);n&&(t=n)}let e=t!==void 0?L.createElement(Di.Provider,{value:this.props.routeContext},L.createElement(Zf.Provider,{value:t,children:this.props.component})):this.props.children;return this.context?L.createElement(QS,{error:t},e):e}};zx.contextType=Ix;var iu=new WeakMap;function QS({children:t,error:e}){let{basename:n}=L.useContext(kn);if(typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){let i=GS(e.digest);if(i){let r=iu.get(e);if(r)throw r;let s=Lx(i.location,n),a=s.absoluteURL||s.to;if(OS(a))throw new Error("Invalid redirect location");if(Px&&!iu.get(e))if(s.isExternal||i.reloadDocument)window.location.href=a;else{const o=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(s.to,{replace:i.replace}));throw iu.set(e,o),o}return L.createElement("meta",{httpEquiv:"refresh",content:`0;url=${a}`})}}return t}function JS({routeContext:t,match:e,children:n}){let i=L.useContext(ea);return i&&i.static&&i.staticContext&&(e.route.errorElement||e.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=e.route.id),L.createElement(Di.Provider,{value:t},n)}function eM(t,e=[],n){let i=n==null?void 0:n.state;if(t==null){if(!i)return null;if(i.errors)t=i.matches;else if(e.length===0&&!i.initialized&&i.matches.length>0)t=i.matches;else return null}let r=t,s=i==null?void 0:i.errors;if(s!=null){let f=r.findIndex(p=>p.route.id&&(s==null?void 0:s[p.route.id])!==void 0);At(f>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(s).join(",")}`),r=r.slice(0,Math.min(r.length,f+1))}let a=!1,o=-1;if(n&&i){a=i.renderFallback;for(let f=0;f<r.length;f++){let p=r[f];if((p.route.HydrateFallback||p.route.hydrateFallbackElement)&&(o=f),p.route.id){let{loaderData:h,errors:m}=i,y=p.route.loader&&!h.hasOwnProperty(p.route.id)&&(!m||m[p.route.id]===void 0);if(p.route.lazy||y){n.isStatic&&(a=!0),o>=0?r=r.slice(0,o+1):r=[r[0]];break}}}}let c=n==null?void 0:n.onError,u=i&&c?(f,p)=>{var h,m;c(f,{location:i.location,params:((m=(h=i.matches)==null?void 0:h[0])==null?void 0:m.params)??{},pattern:US(i.matches),errorInfo:p})}:void 0;return r.reduceRight((f,p,h)=>{let m,y=!1,v=null,g=null;i&&(m=s&&p.route.id?s[p.route.id]:void 0,v=p.route.errorElement||ZS,a&&(o<0&&h===0?(jx("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),y=!0,g=null):o===h&&(y=!0,g=p.route.hydrateFallbackElement||null)));let d=e.concat(r.slice(0,h+1)),x=()=>{let _;return m?_=v:y?_=g:p.route.Component?_=L.createElement(p.route.Component,null):p.route.element?_=p.route.element:_=f,L.createElement(JS,{match:p,routeContext:{outlet:f,matches:d,isDataRoute:i!=null},children:_})};return i&&(p.route.ErrorBoundary||p.route.errorElement||h===0)?L.createElement(zx,{location:i.location,revalidation:i.revalidation,component:v,error:m,children:x(),routeContext:{outlet:null,matches:d,isDataRoute:!0},onError:u}):x()},null)}function Qf(t){return`${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function tM(t){let e=L.useContext(ea);return At(e,Qf(t)),e}function nM(t){let e=L.useContext(_c);return At(e,Qf(t)),e}function iM(t){let e=L.useContext(Di);return At(e,Qf(t)),e}function Jf(t){let e=iM(t),n=e.matches[e.matches.length-1];return At(n.route.id,`${t} can only be used on routes that contain a unique "id"`),n.route.id}function rM(){return Jf("useRouteId")}function sM(){var i;let t=L.useContext(Zf),e=nM("useRouteError"),n=Jf("useRouteError");return t!==void 0?t:(i=e.errors)==null?void 0:i[n]}function aM(){let{router:t}=tM("useNavigate"),e=Jf("useNavigate"),n=L.useRef(!1);return Ox(()=>{n.current=!0}),L.useCallback(async(r,s={})=>{li(n.current,kx),n.current&&(typeof r=="number"?await t.navigate(r):await t.navigate(r,{fromRouteId:e,...s}))},[t,e])}var Rp={};function jx(t,e,n){!e&&!Rp[t]&&(Rp[t]=!0,li(!1,n))}L.memo(oM);function oM({routes:t,manifest:e,future:n,state:i,isStatic:r,onError:s}){return Bx(t,void 0,{manifest:e,state:i,isStatic:r,onError:s})}function Od(t){At(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function lM({basename:t="/",children:e=null,location:n,navigationType:i="POP",navigator:r,static:s=!1,useTransitions:a}){At(!oo(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let o=t.replace(/^\/*/,"/"),c=L.useMemo(()=>({basename:o,navigator:r,static:s,useTransitions:a,future:{}}),[o,r,s,a]);typeof n=="string"&&(n=Js(n));let{pathname:u="/",search:f="",hash:p="",state:h=null,key:m="default",mask:y}=n,v=L.useMemo(()=>{let g=Ri(u,o);return g==null?null:{location:{pathname:g,search:f,hash:p,state:h,key:m,mask:y},navigationType:i}},[o,u,f,p,h,m,i,y]);return li(v!=null,`<Router basename="${o}"> is not able to match the URL "${u}${f}${p}" because it does not start with the basename, so the <Router> won't render anything.`),v==null?null:L.createElement(kn.Provider,{value:c},L.createElement(ao.Provider,{children:e,value:v}))}function cM({children:t,location:e}){return YS(Bd(t),e)}function Bd(t,e=[]){let n=[];return L.Children.forEach(t,(i,r)=>{if(!L.isValidElement(i))return;let s=[...e,r];if(i.type===L.Fragment){n.push.apply(n,Bd(i.props.children,s));return}At(i.type===Od,`[${typeof i.type=="string"?i.type:i.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),At(!i.props.index||!i.props.children,"An index route cannot have child routes.");let a={id:i.props.id||s.join("-"),caseSensitive:i.props.caseSensitive,element:i.props.element,Component:i.props.Component,index:i.props.index,path:i.props.path,middleware:i.props.middleware,loader:i.props.loader,action:i.props.action,hydrateFallbackElement:i.props.hydrateFallbackElement,HydrateFallback:i.props.HydrateFallback,errorElement:i.props.errorElement,ErrorBoundary:i.props.ErrorBoundary,hasErrorBoundary:i.props.hasErrorBoundary===!0||i.props.ErrorBoundary!=null||i.props.errorElement!=null,shouldRevalidate:i.props.shouldRevalidate,handle:i.props.handle,lazy:i.props.lazy};i.props.children&&(a.children=Bd(i.props.children,s)),n.push(a)}),n}var xl="get",_l="application/x-www-form-urlencoded";function yc(t){return typeof HTMLElement<"u"&&t instanceof HTMLElement}function uM(t){return yc(t)&&t.tagName.toLowerCase()==="button"}function dM(t){return yc(t)&&t.tagName.toLowerCase()==="form"}function fM(t){return yc(t)&&t.tagName.toLowerCase()==="input"}function hM(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function pM(t,e){return t.button===0&&(!e||e==="_self")&&!hM(t)}var Do=null;function mM(){if(Do===null)try{new FormData(document.createElement("form"),0),Do=!1}catch{Do=!0}return Do}var gM=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function ru(t){return t!=null&&!gM.has(t)?(li(!1,`"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${_l}"`),null):t}function vM(t,e){let n,i,r,s,a;if(dM(t)){let o=t.getAttribute("action");i=o?Ri(o,e):null,n=t.getAttribute("method")||xl,r=ru(t.getAttribute("enctype"))||_l,s=new FormData(t)}else if(uM(t)||fM(t)&&(t.type==="submit"||t.type==="image")){let o=t.form;if(o==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=t.getAttribute("formaction")||o.getAttribute("action");if(i=c?Ri(c,e):null,n=t.getAttribute("formmethod")||o.getAttribute("method")||xl,r=ru(t.getAttribute("formenctype"))||ru(o.getAttribute("enctype"))||_l,s=new FormData(o,t),!mM()){let{name:u,type:f,value:p}=t;if(f==="image"){let h=u?`${u}.`:"";s.append(`${h}x`,"0"),s.append(`${h}y`,"0")}else u&&s.append(u,p)}}else{if(yc(t))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=xl,i=null,r=_l,a=t}return s&&r==="text/plain"&&(a=s,s=void 0),{action:i,method:n.toLowerCase(),encType:r,formData:s,body:a}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function eh(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function Hx(t,e,n,i){let r=typeof t=="string"?new URL(t,typeof window>"u"?"server://singlefetch/":window.location.origin):t;return n?r.pathname.endsWith("/")?r.pathname=`${r.pathname}_.${i}`:r.pathname=`${r.pathname}.${i}`:r.pathname==="/"?r.pathname=`_root.${i}`:e&&Ri(r.pathname,e)==="/"?r.pathname=`${Xl(e)}/_root.${i}`:r.pathname=`${Xl(r.pathname)}.${i}`,r}async function xM(t,e){if(t.id in e)return e[t.id];try{let n=await import(t.module);return e[t.id]=n,n}catch(n){return console.error(`Error loading route module \`${t.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function _M(t){return t==null?!1:t.href==null?t.rel==="preload"&&typeof t.imageSrcSet=="string"&&typeof t.imageSizes=="string":typeof t.rel=="string"&&typeof t.href=="string"}async function yM(t,e,n){let i=await Promise.all(t.map(async r=>{let s=e.routes[r.route.id];if(s){let a=await xM(s,n);return a.links?a.links():[]}return[]}));return wM(i.flat(1).filter(_M).filter(r=>r.rel==="stylesheet"||r.rel==="preload").map(r=>r.rel==="stylesheet"?{...r,rel:"prefetch",as:"style"}:{...r,rel:"prefetch"}))}function Np(t,e,n,i,r,s){let a=(c,u)=>n[u]?c.route.id!==n[u].route.id:!0,o=(c,u)=>{var f;return n[u].pathname!==c.pathname||((f=n[u].route.path)==null?void 0:f.endsWith("*"))&&n[u].params["*"]!==c.params["*"]};return s==="assets"?e.filter((c,u)=>a(c,u)||o(c,u)):s==="data"?e.filter((c,u)=>{var p;let f=i.routes[c.route.id];if(!f||!f.hasLoader)return!1;if(a(c,u)||o(c,u))return!0;if(c.route.shouldRevalidate){let h=c.route.shouldRevalidate({currentUrl:new URL(r.pathname+r.search+r.hash,window.origin),currentParams:((p=n[0])==null?void 0:p.params)||{},nextUrl:new URL(t,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof h=="boolean")return h}return!0}):[]}function SM(t,e,{includeHydrateFallback:n}={}){return MM(t.map(i=>{let r=e.routes[i.route.id];if(!r)return[];let s=[r.module];return r.clientActionModule&&(s=s.concat(r.clientActionModule)),r.clientLoaderModule&&(s=s.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(s=s.concat(r.hydrateFallbackModule)),r.imports&&(s=s.concat(r.imports)),s}).flat(1))}function MM(t){return[...new Set(t)]}function EM(t){let e={},n=Object.keys(t).sort();for(let i of n)e[i]=t[i];return e}function wM(t,e){let n=new Set;return new Set(e),t.reduce((i,r)=>{let s=JSON.stringify(EM(r));return n.has(s)||(n.add(s),i.push({key:s,link:r})),i},[])}function th(){let t=L.useContext(ea);return eh(t,"You must render this element inside a <DataRouterContext.Provider> element"),t}function TM(){let t=L.useContext(_c);return eh(t,"You must render this element inside a <DataRouterStateContext.Provider> element"),t}var nh=L.createContext(void 0);nh.displayName="FrameworkContext";function Sc(){let t=L.useContext(nh);return eh(t,"You must render this element inside a <HydratedRouter> element"),t}function CM(t,e){let n=L.useContext(nh),[i,r]=L.useState(!1),[s,a]=L.useState(!1),{onFocus:o,onBlur:c,onMouseEnter:u,onMouseLeave:f,onTouchStart:p}=e,h=L.useRef(null);L.useEffect(()=>{if(t==="render"&&a(!0),t==="viewport"){let v=d=>{d.forEach(x=>{a(x.isIntersecting)})},g=new IntersectionObserver(v,{threshold:.5});return h.current&&g.observe(h.current),()=>{g.disconnect()}}},[t]),L.useEffect(()=>{if(i){let v=setTimeout(()=>{a(!0)},100);return()=>{clearTimeout(v)}}},[i]);let m=()=>{r(!0)},y=()=>{r(!1),a(!1)};return n?t!=="intent"?[s,h,{}]:[s,h,{onFocus:fa(o,m),onBlur:fa(c,y),onMouseEnter:fa(u,m),onMouseLeave:fa(f,y),onTouchStart:fa(p,m)}]:[!1,h,{}]}function fa(t,e){return n=>{t&&t(n),n.defaultPrevented||e(n)}}function AM({page:t,...e}){let n=BS(),{nonce:i}=Sc(),{router:r}=th(),s=L.useMemo(()=>wx(r.routes,t,r.basename),[r.routes,t,r.basename]);return s?(e.nonce==null&&i&&(e={...e,nonce:i}),n?L.createElement(RM,{page:t,matches:s,...e}):L.createElement(NM,{page:t,matches:s,...e})):null}function bM(t){let{manifest:e,routeModules:n}=Sc(),[i,r]=L.useState([]);return L.useEffect(()=>{let s=!1;return yM(t,e,n).then(a=>{s||r(a)}),()=>{s=!0}},[t,e,n]),i}function RM({page:t,matches:e,...n}){let i=Ii(),{future:r}=Sc(),{basename:s}=th(),a=L.useMemo(()=>{if(t===i.pathname+i.search+i.hash)return[];let o=Hx(t,s,r.v8_trailingSlashAwareDataRequests,"rsc"),c=!1,u=[];for(let f of e)typeof f.route.shouldRevalidate=="function"?c=!0:u.push(f.route.id);return c&&u.length>0&&o.searchParams.set("_routes",u.join(",")),[o.pathname+o.search]},[s,r.v8_trailingSlashAwareDataRequests,t,i,e]);return L.createElement(L.Fragment,null,a.map(o=>L.createElement("link",{key:o,rel:"prefetch",as:"fetch",href:o,...n})))}function NM({page:t,matches:e,...n}){let i=Ii(),{future:r,manifest:s,routeModules:a}=Sc(),{basename:o}=th(),{loaderData:c,matches:u}=TM(),f=L.useMemo(()=>Np(t,e,u,s,i,"data"),[t,e,u,s,i]),p=L.useMemo(()=>Np(t,e,u,s,i,"assets"),[t,e,u,s,i]),h=L.useMemo(()=>{if(t===i.pathname+i.search+i.hash)return[];let v=new Set,g=!1;if(e.forEach(x=>{var E;let _=s.routes[x.route.id];!_||!_.hasLoader||(!f.some(R=>R.route.id===x.route.id)&&x.route.id in c&&((E=a[x.route.id])!=null&&E.shouldRevalidate)||_.hasClientLoader?g=!0:v.add(x.route.id))}),v.size===0)return[];let d=Hx(t,o,r.v8_trailingSlashAwareDataRequests,"data");return g&&v.size>0&&d.searchParams.set("_routes",e.filter(x=>v.has(x.route.id)).map(x=>x.route.id).join(",")),[d.pathname+d.search]},[o,r.v8_trailingSlashAwareDataRequests,c,i,s,f,e,t,a]),m=L.useMemo(()=>SM(p,s),[p,s]),y=bM(p);return L.createElement(L.Fragment,null,h.map(v=>L.createElement("link",{key:v,rel:"prefetch",as:"fetch",href:v,...n})),m.map(v=>L.createElement("link",{key:v,rel:"modulepreload",href:v,...n})),y.map(({key:v,link:g})=>L.createElement("link",{key:v,nonce:n.nonce,...g,crossOrigin:g.crossOrigin??n.crossOrigin})))}function PM(...t){return e=>{t.forEach(n=>{typeof n=="function"?n(e):n!=null&&(n.current=e)})}}var LM=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{LM&&(window.__reactRouterVersion="7.18.1")}catch{}function DM({basename:t,children:e,useTransitions:n,window:i}){let r=L.useRef();r.current==null&&(r.current=dS({window:i,v5Compat:!0}));let s=r.current,[a,o]=L.useState({action:s.action,location:s.location}),c=L.useCallback(u=>{n===!1?o(u):L.startTransition(()=>o(u))},[n]);return L.useLayoutEffect(()=>s.listen(c),[s,c]),L.createElement(lM,{basename:t,children:e,location:a.location,navigationType:a.action,navigator:s,useTransitions:n})}var ih=L.forwardRef(function({onClick:e,discover:n="render",prefetch:i="none",relative:r,reloadDocument:s,replace:a,mask:o,state:c,target:u,to:f,preventScrollReset:p,viewTransition:h,defaultShouldRevalidate:m,...y},v){let{basename:g,navigator:d,useTransitions:x}=L.useContext(kn),_=typeof f=="string"&&Yf.test(f),E=Lx(f,g);f=E.to;let R=XS(f,{relative:r}),A=Ii(),C=null;if(o){let $=Kf(o,[],A.mask?A.mask.pathname:"/",!0);g!=="/"&&($.pathname=$.pathname==="/"?g:Zn([g,$.pathname])),C=d.createHref($)}let[b,S,M]=CM(i,y),P=kM(f,{replace:a,mask:o,state:c,target:u,preventScrollReset:p,relative:r,viewTransition:h,defaultShouldRevalidate:m,useTransitions:x});function X($){e&&e($),$.defaultPrevented||P($)}let j=!(E.isExternal||s),ne=L.createElement("a",{...y,...M,href:(j?C:void 0)||E.absoluteURL||R,onClick:j?X:e,ref:PM(v,S),target:u,"data-discover":!_&&n==="render"?"true":void 0});return b&&!_?L.createElement(L.Fragment,null,ne,L.createElement(AM,{page:R})):ne});ih.displayName="Link";var IM=L.forwardRef(function({"aria-current":e="page",caseSensitive:n=!1,className:i="",end:r=!1,style:s,to:a,viewTransition:o,children:c,...u},f){let p=lo(a,{relative:u.relative}),h=Ii(),m=L.useContext(_c),{navigator:y,basename:v}=L.useContext(kn),g=m!=null&&HM(p)&&o===!0,d=y.encodeLocation?y.encodeLocation(p).pathname:p.pathname,x=h.pathname,_=m&&m.navigation&&m.navigation.location?m.navigation.location.pathname:null;n||(x=x.toLowerCase(),_=_?_.toLowerCase():null,d=d.toLowerCase()),_&&v&&(_=Ri(_,v)||_);const E=d!=="/"&&d.endsWith("/")?d.length-1:d.length;let R=x===d||!r&&x.startsWith(d)&&x.charAt(E)==="/",A=_!=null&&(_===d||!r&&_.startsWith(d)&&_.charAt(d.length)==="/"),C={isActive:R,isPending:A,isTransitioning:g},b=R?e:void 0,S;typeof i=="function"?S=i(C):S=[i,R?"active":null,A?"pending":null,g?"transitioning":null].filter(Boolean).join(" ");let M=typeof s=="function"?s(C):s;return L.createElement(ih,{...u,"aria-current":b,className:S,ref:f,style:M,to:a,viewTransition:o},typeof c=="function"?c(C):c)});IM.displayName="NavLink";var UM=L.forwardRef(({discover:t="render",fetcherKey:e,navigate:n,reloadDocument:i,replace:r,state:s,method:a=xl,action:o,onSubmit:c,relative:u,preventScrollReset:f,viewTransition:p,defaultShouldRevalidate:h,...m},y)=>{let{useTransitions:v}=L.useContext(kn),g=zM(),d=jM(o,{relative:u}),x=a.toLowerCase()==="get"?"get":"post",_=typeof o=="string"&&Yf.test(o),E=R=>{if(c&&c(R),R.defaultPrevented)return;R.preventDefault();let A=R.nativeEvent.submitter,C=(A==null?void 0:A.getAttribute("formmethod"))||a,b=()=>g(A||R.currentTarget,{fetcherKey:e,method:C,navigate:n,replace:r,state:s,relative:u,preventScrollReset:f,viewTransition:p,defaultShouldRevalidate:h});v&&n!==!1?L.startTransition(()=>b()):b()};return L.createElement("form",{ref:y,method:x,action:d,onSubmit:i?c:E,...m,"data-discover":!_&&t==="render"?"true":void 0})});UM.displayName="Form";function FM(t){return`${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Vx(t){let e=L.useContext(ea);return At(e,FM(t)),e}function kM(t,{target:e,replace:n,mask:i,state:r,preventScrollReset:s,relative:a,viewTransition:o,defaultShouldRevalidate:c,useTransitions:u}={}){let f=$S(),p=Ii(),h=lo(t,{relative:a});return L.useCallback(m=>{if(pM(m,e)){m.preventDefault();let y=n!==void 0?n:Ja(p)===Ja(h),v=()=>f(t,{replace:y,mask:i,state:r,preventScrollReset:s,relative:a,viewTransition:o,defaultShouldRevalidate:c});u?L.startTransition(()=>v()):v()}},[p,f,h,n,i,r,e,t,s,a,o,c,u])}var OM=0,BM=()=>`__${String(++OM)}__`;function zM(){let{router:t}=Vx("useSubmit"),{basename:e}=L.useContext(kn),n=rM(),i=t.fetch,r=t.navigate;return L.useCallback(async(s,a={})=>{let{action:o,method:c,encType:u,formData:f,body:p}=vM(s,e);if(a.navigate===!1){let h=a.fetcherKey||BM();await i(h,n,a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:f,body:p,formMethod:a.method||c,formEncType:a.encType||u,flushSync:a.flushSync})}else await r(a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:f,body:p,formMethod:a.method||c,formEncType:a.encType||u,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[i,r,e,n])}function jM(t,{relative:e}={}){let{basename:n}=L.useContext(kn),i=L.useContext(Di);At(i,"useFormAction must be used inside a RouteContext");let[r]=i.matches.slice(-1),s={...lo(t||".",{relative:e})},a=Ii();if(t==null){s.search=a.search;let o=new URLSearchParams(s.search),c=o.getAll("index");if(c.some(f=>f==="")){o.delete("index"),c.filter(p=>p).forEach(p=>o.append("index",p));let f=o.toString();s.search=f?`?${f}`:""}}return(!t||t===".")&&r.route.index&&(s.search=s.search?s.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(s.pathname=s.pathname==="/"?n:Zn([n,s.pathname])),Ja(s)}function HM(t,{relative:e}={}){let n=L.useContext(Ux);At(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:i}=Vx("useViewTransitionState"),r=lo(t,{relative:e});if(!n.isTransitioning)return!1;let s=Ri(n.currentLocation.pathname,i)||n.currentLocation.pathname,a=Ri(n.nextLocation.pathname,i)||n.nextLocation.pathname;return Wl(r.pathname,a)!=null||Wl(r.pathname,s)!=null}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const rh="165",VM=0,Pp=1,GM=2,Gx=1,WM=2,mi=3,dr=0,pn=1,xi=2,ar=0,Is=1,zd=2,Lp=3,Dp=4,XM=5,Lr=100,$M=101,qM=102,YM=103,KM=104,ZM=200,QM=201,JM=202,eE=203,jd=204,Hd=205,tE=206,nE=207,iE=208,rE=209,sE=210,aE=211,oE=212,lE=213,cE=214,uE=0,dE=1,fE=2,$l=3,hE=4,pE=5,mE=6,gE=7,Wx=0,vE=1,xE=2,or=0,_E=1,yE=2,SE=3,ME=4,EE=5,wE=6,TE=7,Xx=300,Gs=301,Ws=302,Vd=303,Gd=304,Mc=306,Wd=1e3,Or=1001,Xd=1002,Ln=1003,CE=1004,Io=1005,qn=1006,su=1007,Br=1008,fr=1009,AE=1010,bE=1011,ql=1012,$x=1013,Xs=1014,Ki=1015,Ec=1016,qx=1017,Yx=1018,$s=1020,RE=35902,NE=1021,PE=1022,si=1023,LE=1024,DE=1025,Us=1026,qs=1027,IE=1028,Kx=1029,UE=1030,Zx=1031,Qx=1033,au=33776,ou=33777,lu=33778,cu=33779,Ip=35840,Up=35841,Fp=35842,kp=35843,Op=36196,Bp=37492,zp=37496,jp=37808,Hp=37809,Vp=37810,Gp=37811,Wp=37812,Xp=37813,$p=37814,qp=37815,Yp=37816,Kp=37817,Zp=37818,Qp=37819,Jp=37820,em=37821,uu=36492,tm=36494,nm=36495,FE=36283,im=36284,rm=36285,sm=36286,kE=3200,OE=3201,BE=0,zE=1,$i="",ti="srgb",vr="srgb-linear",sh="display-p3",wc="display-p3-linear",Yl="linear",St="srgb",Kl="rec709",Zl="p3",Qr=7680,am=519,jE=512,HE=513,VE=514,Jx=515,GE=516,WE=517,XE=518,$E=519,om=35044,lm="300 es",Mi=2e3,Ql=2001;class ta{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],du=Math.PI/180,$d=180/Math.PI;function co(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Kt[t&255]+Kt[t>>8&255]+Kt[t>>16&255]+Kt[t>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[n&63|128]+Kt[n>>8&255]+"-"+Kt[n>>16&255]+Kt[n>>24&255]+Kt[i&255]+Kt[i>>8&255]+Kt[i>>16&255]+Kt[i>>24&255]).toLowerCase()}function cn(t,e,n){return Math.max(e,Math.min(n,t))}function qE(t,e){return(t%e+e)%e}function fu(t,e,n){return(1-n)*t+n*e}function ha(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function on(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}class dt{constructor(e=0,n=0){dt.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(cn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Je{constructor(e,n,i,r,s,a,o,c,u){Je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,c,u)}set(e,n,i,r,s,a,o,c,u){const f=this.elements;return f[0]=e,f[1]=r,f[2]=o,f[3]=n,f[4]=s,f[5]=c,f[6]=i,f[7]=a,f[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],c=i[6],u=i[1],f=i[4],p=i[7],h=i[2],m=i[5],y=i[8],v=r[0],g=r[3],d=r[6],x=r[1],_=r[4],E=r[7],R=r[2],A=r[5],C=r[8];return s[0]=a*v+o*x+c*R,s[3]=a*g+o*_+c*A,s[6]=a*d+o*E+c*C,s[1]=u*v+f*x+p*R,s[4]=u*g+f*_+p*A,s[7]=u*d+f*E+p*C,s[2]=h*v+m*x+y*R,s[5]=h*g+m*_+y*A,s[8]=h*d+m*E+y*C,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],u=e[7],f=e[8];return n*a*f-n*o*u-i*s*f+i*o*c+r*s*u-r*a*c}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],u=e[7],f=e[8],p=f*a-o*u,h=o*c-f*s,m=u*s-a*c,y=n*p+i*h+r*m;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/y;return e[0]=p*v,e[1]=(r*u-f*i)*v,e[2]=(o*i-r*a)*v,e[3]=h*v,e[4]=(f*n-r*c)*v,e[5]=(r*s-o*n)*v,e[6]=m*v,e[7]=(i*c-u*n)*v,e[8]=(a*n-i*s)*v,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,a,o){const c=Math.cos(s),u=Math.sin(s);return this.set(i*c,i*u,-i*(c*a+u*o)+a+e,-r*u,r*c,-r*(-u*a+c*o)+o+n,0,0,1),this}scale(e,n){return this.premultiply(hu.makeScale(e,n)),this}rotate(e){return this.premultiply(hu.makeRotation(-e)),this}translate(e,n){return this.premultiply(hu.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const hu=new Je;function e0(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Jl(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function YE(){const t=Jl("canvas");return t.style.display="block",t}const cm={};function t0(t){t in cm||(cm[t]=!0,console.warn(t))}function KE(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const um=new Je().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),dm=new Je().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Uo={[vr]:{transfer:Yl,primaries:Kl,toReference:t=>t,fromReference:t=>t},[ti]:{transfer:St,primaries:Kl,toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[wc]:{transfer:Yl,primaries:Zl,toReference:t=>t.applyMatrix3(dm),fromReference:t=>t.applyMatrix3(um)},[sh]:{transfer:St,primaries:Zl,toReference:t=>t.convertSRGBToLinear().applyMatrix3(dm),fromReference:t=>t.applyMatrix3(um).convertLinearToSRGB()}},ZE=new Set([vr,wc]),ft={enabled:!0,_workingColorSpace:vr,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!ZE.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=Uo[e].toReference,r=Uo[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return Uo[t].primaries},getTransfer:function(t){return t===$i?Yl:Uo[t].transfer}};function Fs(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function pu(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Jr;class QE{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Jr===void 0&&(Jr=Jl("canvas")),Jr.width=e.width,Jr.height=e.height;const i=Jr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Jr}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Jl("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Fs(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Fs(n[i]/255)*255):n[i]=Fs(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let JE=0;class n0{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:JE++}),this.uuid=co(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(mu(r[a].image)):s.push(mu(r[a]))}else s=mu(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function mu(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?QE.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let e1=0;class mn extends ta{constructor(e=mn.DEFAULT_IMAGE,n=mn.DEFAULT_MAPPING,i=Or,r=Or,s=qn,a=Br,o=si,c=fr,u=mn.DEFAULT_ANISOTROPY,f=$i){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:e1++}),this.uuid=co(),this.name="",this.source=new n0(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=u,this.format=o,this.internalFormat=null,this.type=c,this.offset=new dt(0,0),this.repeat=new dt(1,1),this.center=new dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Xx)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Wd:e.x=e.x-Math.floor(e.x);break;case Or:e.x=e.x<0?0:1;break;case Xd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Wd:e.y=e.y-Math.floor(e.y);break;case Or:e.y=e.y<0?0:1;break;case Xd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}mn.DEFAULT_IMAGE=null;mn.DEFAULT_MAPPING=Xx;mn.DEFAULT_ANISOTROPY=1;class Wt{constructor(e=0,n=0,i=0,r=1){Wt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const c=e.elements,u=c[0],f=c[4],p=c[8],h=c[1],m=c[5],y=c[9],v=c[2],g=c[6],d=c[10];if(Math.abs(f-h)<.01&&Math.abs(p-v)<.01&&Math.abs(y-g)<.01){if(Math.abs(f+h)<.1&&Math.abs(p+v)<.1&&Math.abs(y+g)<.1&&Math.abs(u+m+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const _=(u+1)/2,E=(m+1)/2,R=(d+1)/2,A=(f+h)/4,C=(p+v)/4,b=(y+g)/4;return _>E&&_>R?_<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(_),r=A/i,s=C/i):E>R?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=A/r,s=b/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=C/s,r=b/s),this.set(i,r,s,n),this}let x=Math.sqrt((g-y)*(g-y)+(p-v)*(p-v)+(h-f)*(h-f));return Math.abs(x)<.001&&(x=1),this.x=(g-y)/x,this.y=(p-v)/x,this.z=(h-f)/x,this.w=Math.acos((u+m+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class t1 extends ta{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new Wt(0,0,e,n),this.scissorTest=!1,this.viewport=new Wt(0,0,e,n);const r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new mn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new n0(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $r extends t1{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class i0 extends mn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=Or,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class n1 extends mn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=Or,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class uo{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,a,o){let c=i[r+0],u=i[r+1],f=i[r+2],p=i[r+3];const h=s[a+0],m=s[a+1],y=s[a+2],v=s[a+3];if(o===0){e[n+0]=c,e[n+1]=u,e[n+2]=f,e[n+3]=p;return}if(o===1){e[n+0]=h,e[n+1]=m,e[n+2]=y,e[n+3]=v;return}if(p!==v||c!==h||u!==m||f!==y){let g=1-o;const d=c*h+u*m+f*y+p*v,x=d>=0?1:-1,_=1-d*d;if(_>Number.EPSILON){const R=Math.sqrt(_),A=Math.atan2(R,d*x);g=Math.sin(g*A)/R,o=Math.sin(o*A)/R}const E=o*x;if(c=c*g+h*E,u=u*g+m*E,f=f*g+y*E,p=p*g+v*E,g===1-o){const R=1/Math.sqrt(c*c+u*u+f*f+p*p);c*=R,u*=R,f*=R,p*=R}}e[n]=c,e[n+1]=u,e[n+2]=f,e[n+3]=p}static multiplyQuaternionsFlat(e,n,i,r,s,a){const o=i[r],c=i[r+1],u=i[r+2],f=i[r+3],p=s[a],h=s[a+1],m=s[a+2],y=s[a+3];return e[n]=o*y+f*p+c*m-u*h,e[n+1]=c*y+f*h+u*p-o*m,e[n+2]=u*y+f*m+o*h-c*p,e[n+3]=f*y-o*p-c*h-u*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,u=o(i/2),f=o(r/2),p=o(s/2),h=c(i/2),m=c(r/2),y=c(s/2);switch(a){case"XYZ":this._x=h*f*p+u*m*y,this._y=u*m*p-h*f*y,this._z=u*f*y+h*m*p,this._w=u*f*p-h*m*y;break;case"YXZ":this._x=h*f*p+u*m*y,this._y=u*m*p-h*f*y,this._z=u*f*y-h*m*p,this._w=u*f*p+h*m*y;break;case"ZXY":this._x=h*f*p-u*m*y,this._y=u*m*p+h*f*y,this._z=u*f*y+h*m*p,this._w=u*f*p-h*m*y;break;case"ZYX":this._x=h*f*p-u*m*y,this._y=u*m*p+h*f*y,this._z=u*f*y-h*m*p,this._w=u*f*p+h*m*y;break;case"YZX":this._x=h*f*p+u*m*y,this._y=u*m*p+h*f*y,this._z=u*f*y-h*m*p,this._w=u*f*p-h*m*y;break;case"XZY":this._x=h*f*p-u*m*y,this._y=u*m*p-h*f*y,this._z=u*f*y+h*m*p,this._w=u*f*p+h*m*y;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],c=n[9],u=n[2],f=n[6],p=n[10],h=i+o+p;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(f-c)*m,this._y=(s-u)*m,this._z=(a-r)*m}else if(i>o&&i>p){const m=2*Math.sqrt(1+i-o-p);this._w=(f-c)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+u)/m}else if(o>p){const m=2*Math.sqrt(1+o-i-p);this._w=(s-u)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(c+f)/m}else{const m=2*Math.sqrt(1+p-i-o);this._w=(a-r)/m,this._x=(s+u)/m,this._y=(c+f)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(cn(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,a=e._w,o=n._x,c=n._y,u=n._z,f=n._w;return this._x=i*f+a*o+r*u-s*c,this._y=r*f+a*c+s*o-i*u,this._z=s*f+a*u+i*c-r*o,this._w=a*f-i*o-r*c-s*u,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const m=1-n;return this._w=m*a+n*this._w,this._x=m*i+n*this._x,this._y=m*r+n*this._y,this._z=m*s+n*this._z,this.normalize(),this}const u=Math.sqrt(c),f=Math.atan2(u,o),p=Math.sin((1-n)*f)/u,h=Math.sin(n*f)/u;return this._w=a*p+this._w*h,this._x=i*p+this._x*h,this._y=r*p+this._y*h,this._z=s*p+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class G{constructor(e=0,n=0,i=0){G.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(fm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(fm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,u=2*(a*r-o*i),f=2*(o*n-s*r),p=2*(s*i-a*n);return this.x=n+c*u+a*p-o*f,this.y=i+c*f+o*u-s*p,this.z=r+c*p+s*f-a*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,a=n.x,o=n.y,c=n.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return gu.copy(this).projectOnVector(e),this.sub(gu)}reflect(e){return this.sub(gu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(cn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const gu=new G,fm=new uo;class fo{constructor(e=new G(1/0,1/0,1/0),n=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Hn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Hn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Hn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Hn):Hn.fromBufferAttribute(s,a),Hn.applyMatrix4(e.matrixWorld),this.expandByPoint(Hn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Fo.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Fo.copy(i.boundingBox)),Fo.applyMatrix4(e.matrixWorld),this.union(Fo)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Hn),Hn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(pa),ko.subVectors(this.max,pa),es.subVectors(e.a,pa),ts.subVectors(e.b,pa),ns.subVectors(e.c,pa),ki.subVectors(ts,es),Oi.subVectors(ns,ts),Sr.subVectors(es,ns);let n=[0,-ki.z,ki.y,0,-Oi.z,Oi.y,0,-Sr.z,Sr.y,ki.z,0,-ki.x,Oi.z,0,-Oi.x,Sr.z,0,-Sr.x,-ki.y,ki.x,0,-Oi.y,Oi.x,0,-Sr.y,Sr.x,0];return!vu(n,es,ts,ns,ko)||(n=[1,0,0,0,1,0,0,0,1],!vu(n,es,ts,ns,ko))?!1:(Oo.crossVectors(ki,Oi),n=[Oo.x,Oo.y,Oo.z],vu(n,es,ts,ns,ko))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Hn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Hn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ui[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ui[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ui[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ui[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ui[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ui[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ui[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ui[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ui),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ui=[new G,new G,new G,new G,new G,new G,new G,new G],Hn=new G,Fo=new fo,es=new G,ts=new G,ns=new G,ki=new G,Oi=new G,Sr=new G,pa=new G,ko=new G,Oo=new G,Mr=new G;function vu(t,e,n,i,r){for(let s=0,a=t.length-3;s<=a;s+=3){Mr.fromArray(t,s);const o=r.x*Math.abs(Mr.x)+r.y*Math.abs(Mr.y)+r.z*Math.abs(Mr.z),c=e.dot(Mr),u=n.dot(Mr),f=i.dot(Mr);if(Math.max(-Math.max(c,u,f),Math.min(c,u,f))>o)return!1}return!0}const i1=new fo,ma=new G,xu=new G;class Tc{constructor(e=new G,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):i1.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ma.subVectors(e,this.center);const n=ma.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(ma,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ma.copy(e.center).add(xu)),this.expandByPoint(ma.copy(e.center).sub(xu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const di=new G,_u=new G,Bo=new G,Bi=new G,yu=new G,zo=new G,Su=new G;class r0{constructor(e=new G,n=new G(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,di)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=di.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(di.copy(this.origin).addScaledVector(this.direction,n),di.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){_u.copy(e).add(n).multiplyScalar(.5),Bo.copy(n).sub(e).normalize(),Bi.copy(this.origin).sub(_u);const s=e.distanceTo(n)*.5,a=-this.direction.dot(Bo),o=Bi.dot(this.direction),c=-Bi.dot(Bo),u=Bi.lengthSq(),f=Math.abs(1-a*a);let p,h,m,y;if(f>0)if(p=a*c-o,h=a*o-c,y=s*f,p>=0)if(h>=-y)if(h<=y){const v=1/f;p*=v,h*=v,m=p*(p+a*h+2*o)+h*(a*p+h+2*c)+u}else h=s,p=Math.max(0,-(a*h+o)),m=-p*p+h*(h+2*c)+u;else h=-s,p=Math.max(0,-(a*h+o)),m=-p*p+h*(h+2*c)+u;else h<=-y?(p=Math.max(0,-(-a*s+o)),h=p>0?-s:Math.min(Math.max(-s,-c),s),m=-p*p+h*(h+2*c)+u):h<=y?(p=0,h=Math.min(Math.max(-s,-c),s),m=h*(h+2*c)+u):(p=Math.max(0,-(a*s+o)),h=p>0?s:Math.min(Math.max(-s,-c),s),m=-p*p+h*(h+2*c)+u);else h=a>0?-s:s,p=Math.max(0,-(a*h+o)),m=-p*p+h*(h+2*c)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(_u).addScaledVector(Bo,h),m}intersectSphere(e,n){di.subVectors(e.center,this.origin);const i=di.dot(this.direction),r=di.dot(di)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,n):this.at(o,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,a,o,c;const u=1/this.direction.x,f=1/this.direction.y,p=1/this.direction.z,h=this.origin;return u>=0?(i=(e.min.x-h.x)*u,r=(e.max.x-h.x)*u):(i=(e.max.x-h.x)*u,r=(e.min.x-h.x)*u),f>=0?(s=(e.min.y-h.y)*f,a=(e.max.y-h.y)*f):(s=(e.max.y-h.y)*f,a=(e.min.y-h.y)*f),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),p>=0?(o=(e.min.z-h.z)*p,c=(e.max.z-h.z)*p):(o=(e.max.z-h.z)*p,c=(e.min.z-h.z)*p),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,di)!==null}intersectTriangle(e,n,i,r,s){yu.subVectors(n,e),zo.subVectors(i,e),Su.crossVectors(yu,zo);let a=this.direction.dot(Su),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Bi.subVectors(this.origin,e);const c=o*this.direction.dot(zo.crossVectors(Bi,zo));if(c<0)return null;const u=o*this.direction.dot(yu.cross(Bi));if(u<0||c+u>a)return null;const f=-o*Bi.dot(Su);return f<0?null:this.at(f/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ut{constructor(e,n,i,r,s,a,o,c,u,f,p,h,m,y,v,g){Ut.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,c,u,f,p,h,m,y,v,g)}set(e,n,i,r,s,a,o,c,u,f,p,h,m,y,v,g){const d=this.elements;return d[0]=e,d[4]=n,d[8]=i,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=c,d[2]=u,d[6]=f,d[10]=p,d[14]=h,d[3]=m,d[7]=y,d[11]=v,d[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ut().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/is.setFromMatrixColumn(e,0).length(),s=1/is.setFromMatrixColumn(e,1).length(),a=1/is.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),u=Math.sin(r),f=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){const h=a*f,m=a*p,y=o*f,v=o*p;n[0]=c*f,n[4]=-c*p,n[8]=u,n[1]=m+y*u,n[5]=h-v*u,n[9]=-o*c,n[2]=v-h*u,n[6]=y+m*u,n[10]=a*c}else if(e.order==="YXZ"){const h=c*f,m=c*p,y=u*f,v=u*p;n[0]=h+v*o,n[4]=y*o-m,n[8]=a*u,n[1]=a*p,n[5]=a*f,n[9]=-o,n[2]=m*o-y,n[6]=v+h*o,n[10]=a*c}else if(e.order==="ZXY"){const h=c*f,m=c*p,y=u*f,v=u*p;n[0]=h-v*o,n[4]=-a*p,n[8]=y+m*o,n[1]=m+y*o,n[5]=a*f,n[9]=v-h*o,n[2]=-a*u,n[6]=o,n[10]=a*c}else if(e.order==="ZYX"){const h=a*f,m=a*p,y=o*f,v=o*p;n[0]=c*f,n[4]=y*u-m,n[8]=h*u+v,n[1]=c*p,n[5]=v*u+h,n[9]=m*u-y,n[2]=-u,n[6]=o*c,n[10]=a*c}else if(e.order==="YZX"){const h=a*c,m=a*u,y=o*c,v=o*u;n[0]=c*f,n[4]=v-h*p,n[8]=y*p+m,n[1]=p,n[5]=a*f,n[9]=-o*f,n[2]=-u*f,n[6]=m*p+y,n[10]=h-v*p}else if(e.order==="XZY"){const h=a*c,m=a*u,y=o*c,v=o*u;n[0]=c*f,n[4]=-p,n[8]=u*f,n[1]=h*p+v,n[5]=a*f,n[9]=m*p-y,n[2]=y*p-m,n[6]=o*f,n[10]=v*p+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(r1,e,s1)}lookAt(e,n,i){const r=this.elements;return vn.subVectors(e,n),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),zi.crossVectors(i,vn),zi.lengthSq()===0&&(Math.abs(i.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),zi.crossVectors(i,vn)),zi.normalize(),jo.crossVectors(vn,zi),r[0]=zi.x,r[4]=jo.x,r[8]=vn.x,r[1]=zi.y,r[5]=jo.y,r[9]=vn.y,r[2]=zi.z,r[6]=jo.z,r[10]=vn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],c=i[8],u=i[12],f=i[1],p=i[5],h=i[9],m=i[13],y=i[2],v=i[6],g=i[10],d=i[14],x=i[3],_=i[7],E=i[11],R=i[15],A=r[0],C=r[4],b=r[8],S=r[12],M=r[1],P=r[5],X=r[9],j=r[13],ne=r[2],$=r[6],Z=r[10],ee=r[14],k=r[3],ie=r[7],re=r[11],ue=r[15];return s[0]=a*A+o*M+c*ne+u*k,s[4]=a*C+o*P+c*$+u*ie,s[8]=a*b+o*X+c*Z+u*re,s[12]=a*S+o*j+c*ee+u*ue,s[1]=f*A+p*M+h*ne+m*k,s[5]=f*C+p*P+h*$+m*ie,s[9]=f*b+p*X+h*Z+m*re,s[13]=f*S+p*j+h*ee+m*ue,s[2]=y*A+v*M+g*ne+d*k,s[6]=y*C+v*P+g*$+d*ie,s[10]=y*b+v*X+g*Z+d*re,s[14]=y*S+v*j+g*ee+d*ue,s[3]=x*A+_*M+E*ne+R*k,s[7]=x*C+_*P+E*$+R*ie,s[11]=x*b+_*X+E*Z+R*re,s[15]=x*S+_*j+E*ee+R*ue,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],u=e[13],f=e[2],p=e[6],h=e[10],m=e[14],y=e[3],v=e[7],g=e[11],d=e[15];return y*(+s*c*p-r*u*p-s*o*h+i*u*h+r*o*m-i*c*m)+v*(+n*c*m-n*u*h+s*a*h-r*a*m+r*u*f-s*c*f)+g*(+n*u*p-n*o*m-s*a*p+i*a*m+s*o*f-i*u*f)+d*(-r*o*f-n*c*p+n*o*h+r*a*p-i*a*h+i*c*f)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],u=e[7],f=e[8],p=e[9],h=e[10],m=e[11],y=e[12],v=e[13],g=e[14],d=e[15],x=p*g*u-v*h*u+v*c*m-o*g*m-p*c*d+o*h*d,_=y*h*u-f*g*u-y*c*m+a*g*m+f*c*d-a*h*d,E=f*v*u-y*p*u+y*o*m-a*v*m-f*o*d+a*p*d,R=y*p*c-f*v*c-y*o*h+a*v*h+f*o*g-a*p*g,A=n*x+i*_+r*E+s*R;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/A;return e[0]=x*C,e[1]=(v*h*s-p*g*s-v*r*m+i*g*m+p*r*d-i*h*d)*C,e[2]=(o*g*s-v*c*s+v*r*u-i*g*u-o*r*d+i*c*d)*C,e[3]=(p*c*s-o*h*s-p*r*u+i*h*u+o*r*m-i*c*m)*C,e[4]=_*C,e[5]=(f*g*s-y*h*s+y*r*m-n*g*m-f*r*d+n*h*d)*C,e[6]=(y*c*s-a*g*s-y*r*u+n*g*u+a*r*d-n*c*d)*C,e[7]=(a*h*s-f*c*s+f*r*u-n*h*u-a*r*m+n*c*m)*C,e[8]=E*C,e[9]=(y*p*s-f*v*s-y*i*m+n*v*m+f*i*d-n*p*d)*C,e[10]=(a*v*s-y*o*s+y*i*u-n*v*u-a*i*d+n*o*d)*C,e[11]=(f*o*s-a*p*s-f*i*u+n*p*u+a*i*m-n*o*m)*C,e[12]=R*C,e[13]=(f*v*r-y*p*r+y*i*h-n*v*h-f*i*g+n*p*g)*C,e[14]=(y*o*r-a*v*r-y*i*c+n*v*c+a*i*g-n*o*g)*C,e[15]=(a*p*r-f*o*r+f*i*c-n*p*c-a*i*h+n*o*h)*C,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=e.x,o=e.y,c=e.z,u=s*a,f=s*o;return this.set(u*a+i,u*o-r*c,u*c+r*o,0,u*o+r*c,f*o+i,f*c-r*a,0,u*c-r*o,f*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,c=n._w,u=s+s,f=a+a,p=o+o,h=s*u,m=s*f,y=s*p,v=a*f,g=a*p,d=o*p,x=c*u,_=c*f,E=c*p,R=i.x,A=i.y,C=i.z;return r[0]=(1-(v+d))*R,r[1]=(m+E)*R,r[2]=(y-_)*R,r[3]=0,r[4]=(m-E)*A,r[5]=(1-(h+d))*A,r[6]=(g+x)*A,r[7]=0,r[8]=(y+_)*C,r[9]=(g-x)*C,r[10]=(1-(h+v))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=is.set(r[0],r[1],r[2]).length();const a=is.set(r[4],r[5],r[6]).length(),o=is.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Vn.copy(this);const u=1/s,f=1/a,p=1/o;return Vn.elements[0]*=u,Vn.elements[1]*=u,Vn.elements[2]*=u,Vn.elements[4]*=f,Vn.elements[5]*=f,Vn.elements[6]*=f,Vn.elements[8]*=p,Vn.elements[9]*=p,Vn.elements[10]*=p,n.setFromRotationMatrix(Vn),i.x=s,i.y=a,i.z=o,this}makePerspective(e,n,i,r,s,a,o=Mi){const c=this.elements,u=2*s/(n-e),f=2*s/(i-r),p=(n+e)/(n-e),h=(i+r)/(i-r);let m,y;if(o===Mi)m=-(a+s)/(a-s),y=-2*a*s/(a-s);else if(o===Ql)m=-a/(a-s),y=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=p,c[12]=0,c[1]=0,c[5]=f,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,s,a,o=Mi){const c=this.elements,u=1/(n-e),f=1/(i-r),p=1/(a-s),h=(n+e)*u,m=(i+r)*f;let y,v;if(o===Mi)y=(a+s)*p,v=-2*p;else if(o===Ql)y=s*p,v=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*u,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*f,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=v,c[14]=-y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const is=new G,Vn=new Ut,r1=new G(0,0,0),s1=new G(1,1,1),zi=new G,jo=new G,vn=new G,hm=new Ut,pm=new uo;class Ni{constructor(e=0,n=0,i=0,r=Ni.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],u=r[5],f=r[9],p=r[2],h=r[6],m=r[10];switch(n){case"XYZ":this._y=Math.asin(cn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-cn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,u)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(cn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-cn(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(cn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,u),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-cn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-f,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return hm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(hm,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return pm.setFromEuler(this),this.setFromQuaternion(pm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ni.DEFAULT_ORDER="XYZ";class s0{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let a1=0;const mm=new G,rs=new uo,fi=new Ut,Ho=new G,ga=new G,o1=new G,l1=new uo,gm=new G(1,0,0),vm=new G(0,1,0),xm=new G(0,0,1),_m={type:"added"},c1={type:"removed"},ss={type:"childadded",child:null},Mu={type:"childremoved",child:null};class gn extends ta{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:a1++}),this.uuid=co(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=gn.DEFAULT_UP.clone();const e=new G,n=new Ni,i=new uo,r=new G(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ut},normalMatrix:{value:new Je}}),this.matrix=new Ut,this.matrixWorld=new Ut,this.matrixAutoUpdate=gn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new s0,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return rs.setFromAxisAngle(e,n),this.quaternion.multiply(rs),this}rotateOnWorldAxis(e,n){return rs.setFromAxisAngle(e,n),this.quaternion.premultiply(rs),this}rotateX(e){return this.rotateOnAxis(gm,e)}rotateY(e){return this.rotateOnAxis(vm,e)}rotateZ(e){return this.rotateOnAxis(xm,e)}translateOnAxis(e,n){return mm.copy(e).applyQuaternion(this.quaternion),this.position.add(mm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(gm,e)}translateY(e){return this.translateOnAxis(vm,e)}translateZ(e){return this.translateOnAxis(xm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(fi.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Ho.copy(e):Ho.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),ga.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fi.lookAt(ga,Ho,this.up):fi.lookAt(Ho,ga,this.up),this.quaternion.setFromRotationMatrix(fi),r&&(fi.extractRotation(r.matrixWorld),rs.setFromRotationMatrix(fi),this.quaternion.premultiply(rs.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(_m),ss.child=e,this.dispatchEvent(ss),ss.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(c1),Mu.child=e,this.dispatchEvent(Mu),Mu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),fi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),fi.multiply(e.parent.matrixWorld)),e.applyMatrix4(fi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(_m),ss.child=e,this.dispatchEvent(ss),ss.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ga,e,o1),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ga,l1,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++){const s=n[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),n===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let u=0,f=c.length;u<f;u++){const p=c[u];s(e.shapes,p)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,u=this.material.length;c<u;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(n){const o=a(e.geometries),c=a(e.materials),u=a(e.textures),f=a(e.images),p=a(e.shapes),h=a(e.skeletons),m=a(e.animations),y=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),u.length>0&&(i.textures=u),f.length>0&&(i.images=f),p.length>0&&(i.shapes=p),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),y.length>0&&(i.nodes=y)}return i.object=r,i;function a(o){const c=[];for(const u in o){const f=o[u];delete f.metadata,c.push(f)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}gn.DEFAULT_UP=new G(0,1,0);gn.DEFAULT_MATRIX_AUTO_UPDATE=!0;gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Gn=new G,hi=new G,Eu=new G,pi=new G,as=new G,os=new G,ym=new G,wu=new G,Tu=new G,Cu=new G;class ri{constructor(e=new G,n=new G,i=new G){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Gn.subVectors(e,n),r.cross(Gn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Gn.subVectors(r,n),hi.subVectors(i,n),Eu.subVectors(e,n);const a=Gn.dot(Gn),o=Gn.dot(hi),c=Gn.dot(Eu),u=hi.dot(hi),f=hi.dot(Eu),p=a*u-o*o;if(p===0)return s.set(0,0,0),null;const h=1/p,m=(u*c-o*f)*h,y=(a*f-o*c)*h;return s.set(1-m-y,y,m)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,pi)===null?!1:pi.x>=0&&pi.y>=0&&pi.x+pi.y<=1}static getInterpolation(e,n,i,r,s,a,o,c){return this.getBarycoord(e,n,i,r,pi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,pi.x),c.addScaledVector(a,pi.y),c.addScaledVector(o,pi.z),c)}static isFrontFacing(e,n,i,r){return Gn.subVectors(i,n),hi.subVectors(e,n),Gn.cross(hi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Gn.subVectors(this.c,this.b),hi.subVectors(this.a,this.b),Gn.cross(hi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ri.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return ri.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return ri.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return ri.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ri.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let a,o;as.subVectors(r,i),os.subVectors(s,i),wu.subVectors(e,i);const c=as.dot(wu),u=os.dot(wu);if(c<=0&&u<=0)return n.copy(i);Tu.subVectors(e,r);const f=as.dot(Tu),p=os.dot(Tu);if(f>=0&&p<=f)return n.copy(r);const h=c*p-f*u;if(h<=0&&c>=0&&f<=0)return a=c/(c-f),n.copy(i).addScaledVector(as,a);Cu.subVectors(e,s);const m=as.dot(Cu),y=os.dot(Cu);if(y>=0&&m<=y)return n.copy(s);const v=m*u-c*y;if(v<=0&&u>=0&&y<=0)return o=u/(u-y),n.copy(i).addScaledVector(os,o);const g=f*y-m*p;if(g<=0&&p-f>=0&&m-y>=0)return ym.subVectors(s,r),o=(p-f)/(p-f+(m-y)),n.copy(r).addScaledVector(ym,o);const d=1/(g+v+h);return a=v*d,o=h*d,n.copy(i).addScaledVector(as,a).addScaledVector(os,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const a0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ji={h:0,s:0,l:0},Vo={h:0,s:0,l:0};function Au(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class ht{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=ti){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ft.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=ft.workingColorSpace){return this.r=e,this.g=n,this.b=i,ft.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=ft.workingColorSpace){if(e=qE(e,1),n=cn(n,0,1),i=cn(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=Au(a,s,e+1/3),this.g=Au(a,s,e),this.b=Au(a,s,e-1/3)}return ft.toWorkingColorSpace(this,r),this}setStyle(e,n=ti){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=ti){const i=a0[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Fs(e.r),this.g=Fs(e.g),this.b=Fs(e.b),this}copyLinearToSRGB(e){return this.r=pu(e.r),this.g=pu(e.g),this.b=pu(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ti){return ft.fromWorkingColorSpace(Zt.copy(this),e),Math.round(cn(Zt.r*255,0,255))*65536+Math.round(cn(Zt.g*255,0,255))*256+Math.round(cn(Zt.b*255,0,255))}getHexString(e=ti){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=ft.workingColorSpace){ft.fromWorkingColorSpace(Zt.copy(this),n);const i=Zt.r,r=Zt.g,s=Zt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,u;const f=(o+a)/2;if(o===a)c=0,u=0;else{const p=a-o;switch(u=f<=.5?p/(a+o):p/(2-a-o),a){case i:c=(r-s)/p+(r<s?6:0);break;case r:c=(s-i)/p+2;break;case s:c=(i-r)/p+4;break}c/=6}return e.h=c,e.s=u,e.l=f,e}getRGB(e,n=ft.workingColorSpace){return ft.fromWorkingColorSpace(Zt.copy(this),n),e.r=Zt.r,e.g=Zt.g,e.b=Zt.b,e}getStyle(e=ti){ft.fromWorkingColorSpace(Zt.copy(this),e);const n=Zt.r,i=Zt.g,r=Zt.b;return e!==ti?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(ji),this.setHSL(ji.h+e,ji.s+n,ji.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(ji),e.getHSL(Vo);const i=fu(ji.h,Vo.h,n),r=fu(ji.s,Vo.s,n),s=fu(ji.l,Vo.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Zt=new ht;ht.NAMES=a0;let u1=0;class ho extends ta{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:u1++}),this.uuid=co(),this.name="",this.type="Material",this.blending=Is,this.side=dr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=jd,this.blendDst=Hd,this.blendEquation=Lr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ht(0,0,0),this.blendAlpha=0,this.depthFunc=$l,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=am,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qr,this.stencilZFail=Qr,this.stencilZPass=Qr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Is&&(i.blending=this.blending),this.side!==dr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==jd&&(i.blendSrc=this.blendSrc),this.blendDst!==Hd&&(i.blendDst=this.blendDst),this.blendEquation!==Lr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==$l&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==am&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Qr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Qr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(n){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class o0 extends ho{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ni,this.combine=Wx,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Dt=new G,Go=new dt;class In{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=om,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ki,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return t0("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Go.fromBufferAttribute(this,n),Go.applyMatrix3(e),this.setXY(n,Go.x,Go.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyMatrix3(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyMatrix4(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyNormalMatrix(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.transformDirection(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=ha(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=on(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=ha(n,this.array)),n}setX(e,n){return this.normalized&&(n=on(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=ha(n,this.array)),n}setY(e,n){return this.normalized&&(n=on(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=ha(n,this.array)),n}setZ(e,n){return this.normalized&&(n=on(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=ha(n,this.array)),n}setW(e,n){return this.normalized&&(n=on(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=on(n,this.array),i=on(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=on(n,this.array),i=on(i,this.array),r=on(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=on(n,this.array),i=on(i,this.array),r=on(r,this.array),s=on(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==om&&(e.usage=this.usage),e}}class l0 extends In{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class c0 extends In{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class lr extends In{constructor(e,n,i){super(new Float32Array(e),n,i)}}let d1=0;const An=new Ut,bu=new gn,ls=new G,xn=new fo,va=new fo,jt=new G;class Ui extends ta{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:d1++}),this.uuid=co(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(e0(e)?c0:l0)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Je().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return An.makeRotationFromQuaternion(e),this.applyMatrix4(An),this}rotateX(e){return An.makeRotationX(e),this.applyMatrix4(An),this}rotateY(e){return An.makeRotationY(e),this.applyMatrix4(An),this}rotateZ(e){return An.makeRotationZ(e),this.applyMatrix4(An),this}translate(e,n,i){return An.makeTranslation(e,n,i),this.applyMatrix4(An),this}scale(e,n,i){return An.makeScale(e,n,i),this.applyMatrix4(An),this}lookAt(e){return bu.lookAt(e),bu.updateMatrix(),this.applyMatrix4(bu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ls).negate(),this.translate(ls.x,ls.y,ls.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new lr(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];xn.setFromBufferAttribute(s),this.morphTargetsRelative?(jt.addVectors(this.boundingBox.min,xn.min),this.boundingBox.expandByPoint(jt),jt.addVectors(this.boundingBox.max,xn.max),this.boundingBox.expandByPoint(jt)):(this.boundingBox.expandByPoint(xn.min),this.boundingBox.expandByPoint(xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Tc);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(e){const i=this.boundingSphere.center;if(xn.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];va.setFromBufferAttribute(o),this.morphTargetsRelative?(jt.addVectors(xn.min,va.min),xn.expandByPoint(jt),jt.addVectors(xn.max,va.max),xn.expandByPoint(jt)):(xn.expandByPoint(va.min),xn.expandByPoint(va.max))}xn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)jt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(jt));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],c=this.morphTargetsRelative;for(let u=0,f=o.count;u<f;u++)jt.fromBufferAttribute(o,u),c&&(ls.fromBufferAttribute(e,u),jt.add(ls)),r=Math.max(r,i.distanceToSquared(jt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new In(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let b=0;b<i.count;b++)o[b]=new G,c[b]=new G;const u=new G,f=new G,p=new G,h=new dt,m=new dt,y=new dt,v=new G,g=new G;function d(b,S,M){u.fromBufferAttribute(i,b),f.fromBufferAttribute(i,S),p.fromBufferAttribute(i,M),h.fromBufferAttribute(s,b),m.fromBufferAttribute(s,S),y.fromBufferAttribute(s,M),f.sub(u),p.sub(u),m.sub(h),y.sub(h);const P=1/(m.x*y.y-y.x*m.y);isFinite(P)&&(v.copy(f).multiplyScalar(y.y).addScaledVector(p,-m.y).multiplyScalar(P),g.copy(p).multiplyScalar(m.x).addScaledVector(f,-y.x).multiplyScalar(P),o[b].add(v),o[S].add(v),o[M].add(v),c[b].add(g),c[S].add(g),c[M].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let b=0,S=x.length;b<S;++b){const M=x[b],P=M.start,X=M.count;for(let j=P,ne=P+X;j<ne;j+=3)d(e.getX(j+0),e.getX(j+1),e.getX(j+2))}const _=new G,E=new G,R=new G,A=new G;function C(b){R.fromBufferAttribute(r,b),A.copy(R);const S=o[b];_.copy(S),_.sub(R.multiplyScalar(R.dot(S))).normalize(),E.crossVectors(A,S);const P=E.dot(c[b])<0?-1:1;a.setXYZW(b,_.x,_.y,_.z,P)}for(let b=0,S=x.length;b<S;++b){const M=x[b],P=M.start,X=M.count;for(let j=P,ne=P+X;j<ne;j+=3)C(e.getX(j+0)),C(e.getX(j+1)),C(e.getX(j+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new In(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const r=new G,s=new G,a=new G,o=new G,c=new G,u=new G,f=new G,p=new G;if(e)for(let h=0,m=e.count;h<m;h+=3){const y=e.getX(h+0),v=e.getX(h+1),g=e.getX(h+2);r.fromBufferAttribute(n,y),s.fromBufferAttribute(n,v),a.fromBufferAttribute(n,g),f.subVectors(a,s),p.subVectors(r,s),f.cross(p),o.fromBufferAttribute(i,y),c.fromBufferAttribute(i,v),u.fromBufferAttribute(i,g),o.add(f),c.add(f),u.add(f),i.setXYZ(y,o.x,o.y,o.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(g,u.x,u.y,u.z)}else for(let h=0,m=n.count;h<m;h+=3)r.fromBufferAttribute(n,h+0),s.fromBufferAttribute(n,h+1),a.fromBufferAttribute(n,h+2),f.subVectors(a,s),p.subVectors(r,s),f.cross(p),i.setXYZ(h+0,f.x,f.y,f.z),i.setXYZ(h+1,f.x,f.y,f.z),i.setXYZ(h+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)jt.fromBufferAttribute(e,n),jt.normalize(),e.setXYZ(n,jt.x,jt.y,jt.z)}toNonIndexed(){function e(o,c){const u=o.array,f=o.itemSize,p=o.normalized,h=new u.constructor(c.length*f);let m=0,y=0;for(let v=0,g=c.length;v<g;v++){o.isInterleavedBufferAttribute?m=c[v]*o.data.stride+o.offset:m=c[v]*f;for(let d=0;d<f;d++)h[y++]=u[m++]}return new In(h,f,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Ui,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],u=e(c,i);n.setAttribute(o,u)}const s=this.morphAttributes;for(const o in s){const c=[],u=s[o];for(let f=0,p=u.length;f<p;f++){const h=u[f],m=e(h,i);c.push(m)}n.morphAttributes[o]=c}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const u=a[o];n.addGroup(u.start,u.count,u.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const u in c)c[u]!==void 0&&(e[u]=c[u]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const c in i){const u=i[c];e.data.attributes[c]=u.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const u=this.morphAttributes[c],f=[];for(let p=0,h=u.length;p<h;p++){const m=u[p];f.push(m.toJSON(e.data))}f.length>0&&(r[c]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const u in r){const f=r[u];this.setAttribute(u,f.clone(n))}const s=e.morphAttributes;for(const u in s){const f=[],p=s[u];for(let h=0,m=p.length;h<m;h++)f.push(p[h].clone(n));this.morphAttributes[u]=f}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let u=0,f=a.length;u<f;u++){const p=a[u];this.addGroup(p.start,p.count,p.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Sm=new Ut,Er=new r0,Wo=new Tc,Mm=new G,cs=new G,us=new G,ds=new G,Ru=new G,Xo=new G,$o=new dt,qo=new dt,Yo=new dt,Em=new G,wm=new G,Tm=new G,Ko=new G,Zo=new G;class Ei extends gn{constructor(e=new Ui,n=new o0){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Xo.set(0,0,0);for(let c=0,u=s.length;c<u;c++){const f=o[c],p=s[c];f!==0&&(Ru.fromBufferAttribute(p,e),a?Xo.addScaledVector(Ru,f):Xo.addScaledVector(Ru.sub(n),f))}n.add(Xo)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Wo.copy(i.boundingSphere),Wo.applyMatrix4(s),Er.copy(e.ray).recast(e.near),!(Wo.containsPoint(Er.origin)===!1&&(Er.intersectSphere(Wo,Mm)===null||Er.origin.distanceToSquared(Mm)>(e.far-e.near)**2))&&(Sm.copy(s).invert(),Er.copy(e.ray).applyMatrix4(Sm),!(i.boundingBox!==null&&Er.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Er)))}_computeIntersections(e,n,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,u=s.attributes.uv,f=s.attributes.uv1,p=s.attributes.normal,h=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let y=0,v=h.length;y<v;y++){const g=h[y],d=a[g.materialIndex],x=Math.max(g.start,m.start),_=Math.min(o.count,Math.min(g.start+g.count,m.start+m.count));for(let E=x,R=_;E<R;E+=3){const A=o.getX(E),C=o.getX(E+1),b=o.getX(E+2);r=Qo(this,d,e,i,u,f,p,A,C,b),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const y=Math.max(0,m.start),v=Math.min(o.count,m.start+m.count);for(let g=y,d=v;g<d;g+=3){const x=o.getX(g),_=o.getX(g+1),E=o.getX(g+2);r=Qo(this,a,e,i,u,f,p,x,_,E),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let y=0,v=h.length;y<v;y++){const g=h[y],d=a[g.materialIndex],x=Math.max(g.start,m.start),_=Math.min(c.count,Math.min(g.start+g.count,m.start+m.count));for(let E=x,R=_;E<R;E+=3){const A=E,C=E+1,b=E+2;r=Qo(this,d,e,i,u,f,p,A,C,b),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const y=Math.max(0,m.start),v=Math.min(c.count,m.start+m.count);for(let g=y,d=v;g<d;g+=3){const x=g,_=g+1,E=g+2;r=Qo(this,a,e,i,u,f,p,x,_,E),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function f1(t,e,n,i,r,s,a,o){let c;if(e.side===pn?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===dr,o),c===null)return null;Zo.copy(o),Zo.applyMatrix4(t.matrixWorld);const u=n.ray.origin.distanceTo(Zo);return u<n.near||u>n.far?null:{distance:u,point:Zo.clone(),object:t}}function Qo(t,e,n,i,r,s,a,o,c,u){t.getVertexPosition(o,cs),t.getVertexPosition(c,us),t.getVertexPosition(u,ds);const f=f1(t,e,n,i,cs,us,ds,Ko);if(f){r&&($o.fromBufferAttribute(r,o),qo.fromBufferAttribute(r,c),Yo.fromBufferAttribute(r,u),f.uv=ri.getInterpolation(Ko,cs,us,ds,$o,qo,Yo,new dt)),s&&($o.fromBufferAttribute(s,o),qo.fromBufferAttribute(s,c),Yo.fromBufferAttribute(s,u),f.uv1=ri.getInterpolation(Ko,cs,us,ds,$o,qo,Yo,new dt)),a&&(Em.fromBufferAttribute(a,o),wm.fromBufferAttribute(a,c),Tm.fromBufferAttribute(a,u),f.normal=ri.getInterpolation(Ko,cs,us,ds,Em,wm,Tm,new G),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const p={a:o,b:c,c:u,normal:new G,materialIndex:0};ri.getNormal(cs,us,ds,p.normal),f.face=p}return f}class po extends Ui{constructor(e=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],u=[],f=[],p=[];let h=0,m=0;y("z","y","x",-1,-1,i,n,e,a,s,0),y("z","y","x",1,-1,i,n,-e,a,s,1),y("x","z","y",1,1,e,i,n,r,a,2),y("x","z","y",1,-1,e,i,-n,r,a,3),y("x","y","z",1,-1,e,n,i,r,s,4),y("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new lr(u,3)),this.setAttribute("normal",new lr(f,3)),this.setAttribute("uv",new lr(p,2));function y(v,g,d,x,_,E,R,A,C,b,S){const M=E/C,P=R/b,X=E/2,j=R/2,ne=A/2,$=C+1,Z=b+1;let ee=0,k=0;const ie=new G;for(let re=0;re<Z;re++){const ue=re*P-j;for(let Pe=0;Pe<$;Pe++){const tt=Pe*M-X;ie[v]=tt*x,ie[g]=ue*_,ie[d]=ne,u.push(ie.x,ie.y,ie.z),ie[v]=0,ie[g]=0,ie[d]=A>0?1:-1,f.push(ie.x,ie.y,ie.z),p.push(Pe/C),p.push(1-re/b),ee+=1}}for(let re=0;re<b;re++)for(let ue=0;ue<C;ue++){const Pe=h+ue+$*re,tt=h+ue+$*(re+1),q=h+(ue+1)+$*(re+1),ae=h+(ue+1)+$*re;c.push(Pe,tt,ae),c.push(tt,q,ae),k+=6}o.addGroup(m,k,S),m+=k,h+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new po(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ys(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function en(t){const e={};for(let n=0;n<t.length;n++){const i=Ys(t[n]);for(const r in i)e[r]=i[r]}return e}function h1(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function u0(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ft.workingColorSpace}const p1={clone:Ys,merge:en};var m1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,g1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class hr extends ho{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=m1,this.fragmentShader=g1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ys(e.uniforms),this.uniformsGroups=h1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class d0 extends gn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ut,this.projectionMatrix=new Ut,this.projectionMatrixInverse=new Ut,this.coordinateSystem=Mi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Hi=new G,Cm=new dt,Am=new dt;class Nn extends d0{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=$d*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(du*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return $d*2*Math.atan(Math.tan(du*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Hi.x,Hi.y).multiplyScalar(-e/Hi.z),Hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Hi.x,Hi.y).multiplyScalar(-e/Hi.z)}getViewSize(e,n){return this.getViewBounds(e,Cm,Am),n.subVectors(Am,Cm)}setViewOffset(e,n,i,r,s,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(du*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,u=a.fullHeight;s+=a.offsetX*r/c,n-=a.offsetY*i/u,r*=a.width/c,i*=a.height/u}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const fs=-90,hs=1;class v1 extends gn{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Nn(fs,hs,e,n);r.layers=this.layers,this.add(r);const s=new Nn(fs,hs,e,n);s.layers=this.layers,this.add(s);const a=new Nn(fs,hs,e,n);a.layers=this.layers,this.add(a);const o=new Nn(fs,hs,e,n);o.layers=this.layers,this.add(o);const c=new Nn(fs,hs,e,n);c.layers=this.layers,this.add(c);const u=new Nn(fs,hs,e,n);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,a,o,c]=n;for(const u of n)this.remove(u);if(e===Mi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ql)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of n)this.add(u),u.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,u,f]=this.children,p=e.getRenderTarget(),h=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),y=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,a),e.setRenderTarget(i,2,r),e.render(n,o),e.setRenderTarget(i,3,r),e.render(n,c),e.setRenderTarget(i,4,r),e.render(n,u),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),e.render(n,f),e.setRenderTarget(p,h,m),e.xr.enabled=y,i.texture.needsPMREMUpdate=!0}}class f0 extends mn{constructor(e,n,i,r,s,a,o,c,u,f){e=e!==void 0?e:[],n=n!==void 0?n:Gs,super(e,n,i,r,s,a,o,c,u,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class x1 extends $r{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new f0(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:qn}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new po(5,5,5),s=new hr({name:"CubemapFromEquirect",uniforms:Ys(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:pn,blending:ar});s.uniforms.tEquirect.value=n;const a=new Ei(r,s),o=n.minFilter;return n.minFilter===Br&&(n.minFilter=qn),new v1(1,10,this).update(e,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,r);e.setRenderTarget(s)}}const Nu=new G,_1=new G,y1=new Je;class Nr{constructor(e=new G(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Nu.subVectors(i,n).cross(_1.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(Nu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||y1.getNormalMatrix(e),r=this.coplanarPoint(Nu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const wr=new Tc,Jo=new G;class h0{constructor(e=new Nr,n=new Nr,i=new Nr,r=new Nr,s=new Nr,a=new Nr){this.planes=[e,n,i,r,s,a]}set(e,n,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Mi){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],c=r[3],u=r[4],f=r[5],p=r[6],h=r[7],m=r[8],y=r[9],v=r[10],g=r[11],d=r[12],x=r[13],_=r[14],E=r[15];if(i[0].setComponents(c-s,h-u,g-m,E-d).normalize(),i[1].setComponents(c+s,h+u,g+m,E+d).normalize(),i[2].setComponents(c+a,h+f,g+y,E+x).normalize(),i[3].setComponents(c-a,h-f,g-y,E-x).normalize(),i[4].setComponents(c-o,h-p,g-v,E-_).normalize(),n===Mi)i[5].setComponents(c+o,h+p,g+v,E+_).normalize();else if(n===Ql)i[5].setComponents(o,p,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),wr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),wr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(wr)}intersectsSprite(e){return wr.center.set(0,0,0),wr.radius=.7071067811865476,wr.applyMatrix4(e.matrixWorld),this.intersectsSphere(wr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Jo.x=r.normal.x>0?e.max.x:e.min.x,Jo.y=r.normal.y>0?e.max.y:e.min.y,Jo.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Jo)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function p0(){let t=null,e=!1,n=null,i=null;function r(s,a){n(s,a),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function S1(t){const e=new WeakMap;function n(o,c){const u=o.array,f=o.usage,p=u.byteLength,h=t.createBuffer();t.bindBuffer(c,h),t.bufferData(c,u,f),o.onUploadCallback();let m;if(u instanceof Float32Array)m=t.FLOAT;else if(u instanceof Uint16Array)o.isFloat16BufferAttribute?m=t.HALF_FLOAT:m=t.UNSIGNED_SHORT;else if(u instanceof Int16Array)m=t.SHORT;else if(u instanceof Uint32Array)m=t.UNSIGNED_INT;else if(u instanceof Int32Array)m=t.INT;else if(u instanceof Int8Array)m=t.BYTE;else if(u instanceof Uint8Array)m=t.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)m=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:h,type:m,bytesPerElement:u.BYTES_PER_ELEMENT,version:o.version,size:p}}function i(o,c,u){const f=c.array,p=c._updateRange,h=c.updateRanges;if(t.bindBuffer(u,o),p.count===-1&&h.length===0&&t.bufferSubData(u,0,f),h.length!==0){for(let m=0,y=h.length;m<y;m++){const v=h[m];t.bufferSubData(u,v.start*f.BYTES_PER_ELEMENT,f,v.start,v.count)}c.clearUpdateRanges()}p.count!==-1&&(t.bufferSubData(u,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count),p.count=-1),c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(t.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isGLBufferAttribute){const f=e.get(o);(!f||f.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}o.isInterleavedBufferAttribute&&(o=o.data);const u=e.get(o);if(u===void 0)e.set(o,n(o,c));else if(u.version<o.version){if(u.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(u.buffer,o,c),u.version=o.version}}return{get:r,remove:s,update:a}}class Cc extends Ui{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,a=n/2,o=Math.floor(i),c=Math.floor(r),u=o+1,f=c+1,p=e/o,h=n/c,m=[],y=[],v=[],g=[];for(let d=0;d<f;d++){const x=d*h-a;for(let _=0;_<u;_++){const E=_*p-s;y.push(E,-x,0),v.push(0,0,1),g.push(_/o),g.push(1-d/c)}}for(let d=0;d<c;d++)for(let x=0;x<o;x++){const _=x+u*d,E=x+u*(d+1),R=x+1+u*(d+1),A=x+1+u*d;m.push(_,E,A),m.push(E,R,A)}this.setIndex(m),this.setAttribute("position",new lr(y,3)),this.setAttribute("normal",new lr(v,3)),this.setAttribute("uv",new lr(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cc(e.width,e.height,e.widthSegments,e.heightSegments)}}var M1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,E1=`#ifdef USE_ALPHAHASH
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
#endif`,w1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,T1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,C1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,A1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,b1=`#ifdef USE_AOMAP
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
#endif`,R1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,N1=`#ifdef USE_BATCHING
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
#endif`,P1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,L1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,D1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,I1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,U1=`#ifdef USE_IRIDESCENCE
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
#endif`,F1=`#ifdef USE_BUMPMAP
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
#endif`,k1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,O1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,B1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,z1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,j1=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,H1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,V1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,G1=`#if defined( USE_COLOR_ALPHA )
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
#endif`,W1=`#define PI 3.141592653589793
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
} // validated`,X1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,$1=`vec3 transformedNormal = objectNormal;
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
#endif`,q1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Y1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,K1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Z1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Q1="gl_FragColor = linearToOutputTexel( gl_FragColor );",J1=`
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
}`,ew=`#ifdef USE_ENVMAP
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
#endif`,tw=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,nw=`#ifdef USE_ENVMAP
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
#endif`,iw=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rw=`#ifdef USE_ENVMAP
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
#endif`,sw=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,aw=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ow=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,lw=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cw=`#ifdef USE_GRADIENTMAP
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
}`,uw=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,dw=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fw=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,hw=`uniform bool receiveShadow;
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
#endif`,pw=`#ifdef USE_ENVMAP
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
#endif`,mw=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gw=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vw=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xw=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,_w=`PhysicalMaterial material;
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
#endif`,yw=`struct PhysicalMaterial {
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
}`,Sw=`
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
#endif`,Mw=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ew=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ww=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Tw=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cw=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Aw=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,bw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rw=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Nw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Pw=`#if defined( USE_POINTS_UV )
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
#endif`,Lw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Dw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Iw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Uw=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Fw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kw=`#ifdef USE_MORPHTARGETS
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
#endif`,Ow=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,zw=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,jw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Gw=`#ifdef USE_NORMALMAP
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
#endif`,Ww=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$w=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,qw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kw=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Zw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Jw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,eT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,tT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,nT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,iT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,rT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,aT=`float getShadowMask() {
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
}`,oT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lT=`#ifdef USE_SKINNING
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
#endif`,cT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,uT=`#ifdef USE_SKINNING
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
#endif`,dT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,pT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,mT=`#ifdef USE_TRANSMISSION
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
#endif`,gT=`#ifdef USE_TRANSMISSION
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
#endif`,vT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_T=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ST=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,MT=`uniform sampler2D t2D;
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
}`,ET=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,TT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,CT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,AT=`#include <common>
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
}`,bT=`#if DEPTH_PACKING == 3200
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
}`,RT=`#define DISTANCE
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
}`,NT=`#define DISTANCE
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
}`,PT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,LT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,DT=`uniform float scale;
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
}`,IT=`uniform vec3 diffuse;
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
}`,UT=`#include <common>
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
}`,FT=`uniform vec3 diffuse;
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
}`,kT=`#define LAMBERT
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
}`,OT=`#define LAMBERT
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
}`,BT=`#define MATCAP
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
}`,zT=`#define MATCAP
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
}`,jT=`#define NORMAL
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
}`,HT=`#define NORMAL
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
}`,VT=`#define PHONG
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
}`,GT=`#define PHONG
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
}`,WT=`#define STANDARD
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
}`,XT=`#define STANDARD
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
}`,$T=`#define TOON
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
}`,qT=`#define TOON
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
}`,YT=`uniform float size;
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
}`,KT=`uniform vec3 diffuse;
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
}`,ZT=`#include <common>
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
}`,QT=`uniform vec3 color;
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
}`,JT=`uniform float rotation;
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
}`,eC=`uniform vec3 diffuse;
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
}`,Qe={alphahash_fragment:M1,alphahash_pars_fragment:E1,alphamap_fragment:w1,alphamap_pars_fragment:T1,alphatest_fragment:C1,alphatest_pars_fragment:A1,aomap_fragment:b1,aomap_pars_fragment:R1,batching_pars_vertex:N1,batching_vertex:P1,begin_vertex:L1,beginnormal_vertex:D1,bsdfs:I1,iridescence_fragment:U1,bumpmap_pars_fragment:F1,clipping_planes_fragment:k1,clipping_planes_pars_fragment:O1,clipping_planes_pars_vertex:B1,clipping_planes_vertex:z1,color_fragment:j1,color_pars_fragment:H1,color_pars_vertex:V1,color_vertex:G1,common:W1,cube_uv_reflection_fragment:X1,defaultnormal_vertex:$1,displacementmap_pars_vertex:q1,displacementmap_vertex:Y1,emissivemap_fragment:K1,emissivemap_pars_fragment:Z1,colorspace_fragment:Q1,colorspace_pars_fragment:J1,envmap_fragment:ew,envmap_common_pars_fragment:tw,envmap_pars_fragment:nw,envmap_pars_vertex:iw,envmap_physical_pars_fragment:pw,envmap_vertex:rw,fog_vertex:sw,fog_pars_vertex:aw,fog_fragment:ow,fog_pars_fragment:lw,gradientmap_pars_fragment:cw,lightmap_pars_fragment:uw,lights_lambert_fragment:dw,lights_lambert_pars_fragment:fw,lights_pars_begin:hw,lights_toon_fragment:mw,lights_toon_pars_fragment:gw,lights_phong_fragment:vw,lights_phong_pars_fragment:xw,lights_physical_fragment:_w,lights_physical_pars_fragment:yw,lights_fragment_begin:Sw,lights_fragment_maps:Mw,lights_fragment_end:Ew,logdepthbuf_fragment:ww,logdepthbuf_pars_fragment:Tw,logdepthbuf_pars_vertex:Cw,logdepthbuf_vertex:Aw,map_fragment:bw,map_pars_fragment:Rw,map_particle_fragment:Nw,map_particle_pars_fragment:Pw,metalnessmap_fragment:Lw,metalnessmap_pars_fragment:Dw,morphinstance_vertex:Iw,morphcolor_vertex:Uw,morphnormal_vertex:Fw,morphtarget_pars_vertex:kw,morphtarget_vertex:Ow,normal_fragment_begin:Bw,normal_fragment_maps:zw,normal_pars_fragment:jw,normal_pars_vertex:Hw,normal_vertex:Vw,normalmap_pars_fragment:Gw,clearcoat_normal_fragment_begin:Ww,clearcoat_normal_fragment_maps:Xw,clearcoat_pars_fragment:$w,iridescence_pars_fragment:qw,opaque_fragment:Yw,packing:Kw,premultiplied_alpha_fragment:Zw,project_vertex:Qw,dithering_fragment:Jw,dithering_pars_fragment:eT,roughnessmap_fragment:tT,roughnessmap_pars_fragment:nT,shadowmap_pars_fragment:iT,shadowmap_pars_vertex:rT,shadowmap_vertex:sT,shadowmask_pars_fragment:aT,skinbase_vertex:oT,skinning_pars_vertex:lT,skinning_vertex:cT,skinnormal_vertex:uT,specularmap_fragment:dT,specularmap_pars_fragment:fT,tonemapping_fragment:hT,tonemapping_pars_fragment:pT,transmission_fragment:mT,transmission_pars_fragment:gT,uv_pars_fragment:vT,uv_pars_vertex:xT,uv_vertex:_T,worldpos_vertex:yT,background_vert:ST,background_frag:MT,backgroundCube_vert:ET,backgroundCube_frag:wT,cube_vert:TT,cube_frag:CT,depth_vert:AT,depth_frag:bT,distanceRGBA_vert:RT,distanceRGBA_frag:NT,equirect_vert:PT,equirect_frag:LT,linedashed_vert:DT,linedashed_frag:IT,meshbasic_vert:UT,meshbasic_frag:FT,meshlambert_vert:kT,meshlambert_frag:OT,meshmatcap_vert:BT,meshmatcap_frag:zT,meshnormal_vert:jT,meshnormal_frag:HT,meshphong_vert:VT,meshphong_frag:GT,meshphysical_vert:WT,meshphysical_frag:XT,meshtoon_vert:$T,meshtoon_frag:qT,points_vert:YT,points_frag:KT,shadow_vert:ZT,shadow_frag:QT,sprite_vert:JT,sprite_frag:eC},Te={common:{diffuse:{value:new ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Je}},envmap:{envMap:{value:null},envMapRotation:{value:new Je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Je},normalScale:{value:new dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0},uvTransform:{value:new Je}},sprite:{diffuse:{value:new ht(16777215)},opacity:{value:1},center:{value:new dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}}},ni={basic:{uniforms:en([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:en([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new ht(0)}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:en([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new ht(0)},specular:{value:new ht(1118481)},shininess:{value:30}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:en([Te.common,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.roughnessmap,Te.metalnessmap,Te.fog,Te.lights,{emissive:{value:new ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:en([Te.common,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.gradientmap,Te.fog,Te.lights,{emissive:{value:new ht(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:en([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:en([Te.points,Te.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:en([Te.common,Te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:en([Te.common,Te.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:en([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:en([Te.sprite,Te.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Je}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distanceRGBA:{uniforms:en([Te.common,Te.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distanceRGBA_vert,fragmentShader:Qe.distanceRGBA_frag},shadow:{uniforms:en([Te.lights,Te.fog,{color:{value:new ht(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};ni.physical={uniforms:en([ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Je},clearcoatNormalScale:{value:new dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Je},sheen:{value:0},sheenColor:{value:new ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Je},transmissionSamplerSize:{value:new dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Je},attenuationDistance:{value:0},attenuationColor:{value:new ht(0)},specularColor:{value:new ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Je},anisotropyVector:{value:new dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Je}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};const el={r:0,b:0,g:0},Tr=new Ni,tC=new Ut;function nC(t,e,n,i,r,s,a){const o=new ht(0);let c=s===!0?0:1,u,f,p=null,h=0,m=null;function y(x){let _=x.isScene===!0?x.background:null;return _&&_.isTexture&&(_=(x.backgroundBlurriness>0?n:e).get(_)),_}function v(x){let _=!1;const E=y(x);E===null?d(o,c):E&&E.isColor&&(d(E,1),_=!0);const R=t.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(t.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function g(x,_){const E=y(_);E&&(E.isCubeTexture||E.mapping===Mc)?(f===void 0&&(f=new Ei(new po(1,1,1),new hr({name:"BackgroundCubeMaterial",uniforms:Ys(ni.backgroundCube.uniforms),vertexShader:ni.backgroundCube.vertexShader,fragmentShader:ni.backgroundCube.fragmentShader,side:pn,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(R,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(f)),Tr.copy(_.backgroundRotation),Tr.x*=-1,Tr.y*=-1,Tr.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Tr.y*=-1,Tr.z*=-1),f.material.uniforms.envMap.value=E,f.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(tC.makeRotationFromEuler(Tr)),f.material.toneMapped=ft.getTransfer(E.colorSpace)!==St,(p!==E||h!==E.version||m!==t.toneMapping)&&(f.material.needsUpdate=!0,p=E,h=E.version,m=t.toneMapping),f.layers.enableAll(),x.unshift(f,f.geometry,f.material,0,0,null)):E&&E.isTexture&&(u===void 0&&(u=new Ei(new Cc(2,2),new hr({name:"BackgroundMaterial",uniforms:Ys(ni.background.uniforms),vertexShader:ni.background.vertexShader,fragmentShader:ni.background.fragmentShader,side:dr,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(u)),u.material.uniforms.t2D.value=E,u.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,u.material.toneMapped=ft.getTransfer(E.colorSpace)!==St,E.matrixAutoUpdate===!0&&E.updateMatrix(),u.material.uniforms.uvTransform.value.copy(E.matrix),(p!==E||h!==E.version||m!==t.toneMapping)&&(u.material.needsUpdate=!0,p=E,h=E.version,m=t.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null))}function d(x,_){x.getRGB(el,u0(t)),i.buffers.color.setClear(el.r,el.g,el.b,_,a)}return{getClearColor:function(){return o},setClearColor:function(x,_=1){o.set(x),c=_,d(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,d(o,c)},render:v,addToRenderList:g}}function iC(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,a=!1;function o(M,P,X,j,ne){let $=!1;const Z=p(j,X,P);s!==Z&&(s=Z,u(s.object)),$=m(M,j,X,ne),$&&y(M,j,X,ne),ne!==null&&e.update(ne,t.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,E(M,P,X,j),ne!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(ne).buffer))}function c(){return t.createVertexArray()}function u(M){return t.bindVertexArray(M)}function f(M){return t.deleteVertexArray(M)}function p(M,P,X){const j=X.wireframe===!0;let ne=i[M.id];ne===void 0&&(ne={},i[M.id]=ne);let $=ne[P.id];$===void 0&&($={},ne[P.id]=$);let Z=$[j];return Z===void 0&&(Z=h(c()),$[j]=Z),Z}function h(M){const P=[],X=[],j=[];for(let ne=0;ne<n;ne++)P[ne]=0,X[ne]=0,j[ne]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:X,attributeDivisors:j,object:M,attributes:{},index:null}}function m(M,P,X,j){const ne=s.attributes,$=P.attributes;let Z=0;const ee=X.getAttributes();for(const k in ee)if(ee[k].location>=0){const re=ne[k];let ue=$[k];if(ue===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(ue=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(ue=M.instanceColor)),re===void 0||re.attribute!==ue||ue&&re.data!==ue.data)return!0;Z++}return s.attributesNum!==Z||s.index!==j}function y(M,P,X,j){const ne={},$=P.attributes;let Z=0;const ee=X.getAttributes();for(const k in ee)if(ee[k].location>=0){let re=$[k];re===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(re=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(re=M.instanceColor));const ue={};ue.attribute=re,re&&re.data&&(ue.data=re.data),ne[k]=ue,Z++}s.attributes=ne,s.attributesNum=Z,s.index=j}function v(){const M=s.newAttributes;for(let P=0,X=M.length;P<X;P++)M[P]=0}function g(M){d(M,0)}function d(M,P){const X=s.newAttributes,j=s.enabledAttributes,ne=s.attributeDivisors;X[M]=1,j[M]===0&&(t.enableVertexAttribArray(M),j[M]=1),ne[M]!==P&&(t.vertexAttribDivisor(M,P),ne[M]=P)}function x(){const M=s.newAttributes,P=s.enabledAttributes;for(let X=0,j=P.length;X<j;X++)P[X]!==M[X]&&(t.disableVertexAttribArray(X),P[X]=0)}function _(M,P,X,j,ne,$,Z){Z===!0?t.vertexAttribIPointer(M,P,X,ne,$):t.vertexAttribPointer(M,P,X,j,ne,$)}function E(M,P,X,j){v();const ne=j.attributes,$=X.getAttributes(),Z=P.defaultAttributeValues;for(const ee in $){const k=$[ee];if(k.location>=0){let ie=ne[ee];if(ie===void 0&&(ee==="instanceMatrix"&&M.instanceMatrix&&(ie=M.instanceMatrix),ee==="instanceColor"&&M.instanceColor&&(ie=M.instanceColor)),ie!==void 0){const re=ie.normalized,ue=ie.itemSize,Pe=e.get(ie);if(Pe===void 0)continue;const tt=Pe.buffer,q=Pe.type,ae=Pe.bytesPerElement,ve=q===t.INT||q===t.UNSIGNED_INT||ie.gpuType===$x;if(ie.isInterleavedBufferAttribute){const ge=ie.data,we=ge.stride,ke=ie.offset;if(ge.isInstancedInterleavedBuffer){for(let He=0;He<k.locationSize;He++)d(k.location+He,ge.meshPerAttribute);M.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let He=0;He<k.locationSize;He++)g(k.location+He);t.bindBuffer(t.ARRAY_BUFFER,tt);for(let He=0;He<k.locationSize;He++)_(k.location+He,ue/k.locationSize,q,re,we*ae,(ke+ue/k.locationSize*He)*ae,ve)}else{if(ie.isInstancedBufferAttribute){for(let ge=0;ge<k.locationSize;ge++)d(k.location+ge,ie.meshPerAttribute);M.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let ge=0;ge<k.locationSize;ge++)g(k.location+ge);t.bindBuffer(t.ARRAY_BUFFER,tt);for(let ge=0;ge<k.locationSize;ge++)_(k.location+ge,ue/k.locationSize,q,re,ue*ae,ue/k.locationSize*ge*ae,ve)}}else if(Z!==void 0){const re=Z[ee];if(re!==void 0)switch(re.length){case 2:t.vertexAttrib2fv(k.location,re);break;case 3:t.vertexAttrib3fv(k.location,re);break;case 4:t.vertexAttrib4fv(k.location,re);break;default:t.vertexAttrib1fv(k.location,re)}}}}x()}function R(){b();for(const M in i){const P=i[M];for(const X in P){const j=P[X];for(const ne in j)f(j[ne].object),delete j[ne];delete P[X]}delete i[M]}}function A(M){if(i[M.id]===void 0)return;const P=i[M.id];for(const X in P){const j=P[X];for(const ne in j)f(j[ne].object),delete j[ne];delete P[X]}delete i[M.id]}function C(M){for(const P in i){const X=i[P];if(X[M.id]===void 0)continue;const j=X[M.id];for(const ne in j)f(j[ne].object),delete j[ne];delete X[M.id]}}function b(){S(),a=!0,s!==r&&(s=r,u(s.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:b,resetDefaultState:S,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:g,disableUnusedAttributes:x}}function rC(t,e,n){let i;function r(u){i=u}function s(u,f){t.drawArrays(i,u,f),n.update(f,i,1)}function a(u,f,p){p!==0&&(t.drawArraysInstanced(i,u,f,p),n.update(f,i,p))}function o(u,f,p){if(p===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let m=0;m<p;m++)this.render(u[m],f[m]);else{h.multiDrawArraysWEBGL(i,u,0,f,0,p);let m=0;for(let y=0;y<p;y++)m+=f[y];n.update(m,i,1)}}function c(u,f,p,h){if(p===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let y=0;y<u.length;y++)a(u[y],f[y],h[y]);else{m.multiDrawArraysInstancedWEBGL(i,u,0,f,0,h,0,p);let y=0;for(let v=0;v<p;v++)y+=f[v];for(let v=0;v<h.length;v++)n.update(y,i,h[v])}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function sC(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(A){return!(A!==si&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const C=A===Ec&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==fr&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Ki&&!C)}function c(A){if(A==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=n.precision!==void 0?n.precision:"highp";const f=c(u);f!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",f,"instead."),u=f);const p=n.logarithmicDepthBuffer===!0,h=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),m=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=t.getParameter(t.MAX_TEXTURE_SIZE),v=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),g=t.getParameter(t.MAX_VERTEX_ATTRIBS),d=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),x=t.getParameter(t.MAX_VARYING_VECTORS),_=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),E=m>0,R=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:u,logarithmicDepthBuffer:p,maxTextures:h,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:v,maxAttributes:g,maxVertexUniforms:d,maxVaryings:x,maxFragmentUniforms:_,vertexTextures:E,maxSamples:R}}function aC(t){const e=this;let n=null,i=0,r=!1,s=!1;const a=new Nr,o=new Je,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(p,h){const m=p.length!==0||h||i!==0||r;return r=h,i=p.length,m},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(p,h){n=f(p,h,0)},this.setState=function(p,h,m){const y=p.clippingPlanes,v=p.clipIntersection,g=p.clipShadows,d=t.get(p);if(!r||y===null||y.length===0||s&&!g)s?f(null):u();else{const x=s?0:i,_=x*4;let E=d.clippingState||null;c.value=E,E=f(y,h,_,m);for(let R=0;R!==_;++R)E[R]=n[R];d.clippingState=E,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function u(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(p,h,m,y){const v=p!==null?p.length:0;let g=null;if(v!==0){if(g=c.value,y!==!0||g===null){const d=m+v*4,x=h.matrixWorldInverse;o.getNormalMatrix(x),(g===null||g.length<d)&&(g=new Float32Array(d));for(let _=0,E=m;_!==v;++_,E+=4)a.copy(p[_]).applyMatrix4(x,o),a.normal.toArray(g,E),g[E+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}function oC(t){let e=new WeakMap;function n(a,o){return o===Vd?a.mapping=Gs:o===Gd&&(a.mapping=Ws),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Vd||o===Gd)if(e.has(a)){const c=e.get(a).texture;return n(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const u=new x1(c.height);return u.fromEquirectangularTexture(t,a),e.set(a,u),a.addEventListener("dispose",r),n(u.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class lC extends d0{constructor(e=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+n,c=r-n;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,a=s+u*this.view.width,o-=f*this.view.offsetY,c=o-f*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const As=4,bm=[.125,.215,.35,.446,.526,.582],Dr=20,Pu=new lC,Rm=new ht;let Lu=null,Du=0,Iu=0,Uu=!1;const Pr=(1+Math.sqrt(5))/2,ps=1/Pr,Nm=[new G(-Pr,ps,0),new G(Pr,ps,0),new G(-ps,0,Pr),new G(ps,0,Pr),new G(0,Pr,-ps),new G(0,Pr,ps),new G(-1,1,-1),new G(1,1,-1),new G(-1,1,1),new G(1,1,1)];class Pm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){Lu=this._renderer.getRenderTarget(),Du=this._renderer.getActiveCubeFace(),Iu=this._renderer.getActiveMipmapLevel(),Uu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Im(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Lu,Du,Iu),this._renderer.xr.enabled=Uu,e.scissorTest=!1,tl(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Gs||e.mapping===Ws?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Lu=this._renderer.getRenderTarget(),Du=this._renderer.getActiveCubeFace(),Iu=this._renderer.getActiveMipmapLevel(),Uu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:qn,minFilter:qn,generateMipmaps:!1,type:Ec,format:si,colorSpace:vr,depthBuffer:!1},r=Lm(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Lm(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cC(s)),this._blurMaterial=uC(s,e,n)}return r}_compileMaterial(e){const n=new Ei(this._lodPlanes[0],e);this._renderer.compile(n,Pu)}_sceneToCubeUV(e,n,i,r){const o=new Nn(90,1,n,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,p=f.autoClear,h=f.toneMapping;f.getClearColor(Rm),f.toneMapping=or,f.autoClear=!1;const m=new o0({name:"PMREM.Background",side:pn,depthWrite:!1,depthTest:!1}),y=new Ei(new po,m);let v=!1;const g=e.background;g?g.isColor&&(m.color.copy(g),e.background=null,v=!0):(m.color.copy(Rm),v=!0);for(let d=0;d<6;d++){const x=d%3;x===0?(o.up.set(0,c[d],0),o.lookAt(u[d],0,0)):x===1?(o.up.set(0,0,c[d]),o.lookAt(0,u[d],0)):(o.up.set(0,c[d],0),o.lookAt(0,0,u[d]));const _=this._cubeSize;tl(r,x*_,d>2?_:0,_,_),f.setRenderTarget(r),v&&f.render(y,o),f.render(e,o)}y.geometry.dispose(),y.material.dispose(),f.toneMapping=h,f.autoClear=p,e.background=g}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Gs||e.mapping===Ws;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Im()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Dm());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Ei(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;tl(n,0,0,3*c,2*c),i.setRenderTarget(n),i.render(a,Pu)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Nm[(r-s-1)%Nm.length];this._blur(e,s-1,s,a,o)}n.autoClear=i}_blur(e,n,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,n,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,a,o){const c=this._renderer,u=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,p=new Ei(this._lodPlanes[r],u),h=u.uniforms,m=this._sizeLods[i]-1,y=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Dr-1),v=s/y,g=isFinite(s)?1+Math.floor(f*v):Dr;g>Dr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Dr}`);const d=[];let x=0;for(let C=0;C<Dr;++C){const b=C/v,S=Math.exp(-b*b/2);d.push(S),C===0?x+=S:C<g&&(x+=2*S)}for(let C=0;C<d.length;C++)d[C]=d[C]/x;h.envMap.value=e.texture,h.samples.value=g,h.weights.value=d,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:_}=this;h.dTheta.value=y,h.mipInt.value=_-i;const E=this._sizeLods[r],R=3*E*(r>_-As?r-_+As:0),A=4*(this._cubeSize-E);tl(n,R,A,3*E,2*E),c.setRenderTarget(n),c.render(p,Pu)}}function cC(t){const e=[],n=[],i=[];let r=t;const s=t-As+1+bm.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);n.push(o);let c=1/o;a>t-As?c=bm[a-t+As-1]:a===0&&(c=0),i.push(c);const u=1/(o-2),f=-u,p=1+u,h=[f,f,p,f,p,p,f,f,p,p,f,p],m=6,y=6,v=3,g=2,d=1,x=new Float32Array(v*y*m),_=new Float32Array(g*y*m),E=new Float32Array(d*y*m);for(let A=0;A<m;A++){const C=A%3*2/3-1,b=A>2?0:-1,S=[C,b,0,C+2/3,b,0,C+2/3,b+1,0,C,b,0,C+2/3,b+1,0,C,b+1,0];x.set(S,v*y*A),_.set(h,g*y*A);const M=[A,A,A,A,A,A];E.set(M,d*y*A)}const R=new Ui;R.setAttribute("position",new In(x,v)),R.setAttribute("uv",new In(_,g)),R.setAttribute("faceIndex",new In(E,d)),e.push(R),r>As&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function Lm(t,e,n){const i=new $r(t,e,n);return i.texture.mapping=Mc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function tl(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function uC(t,e,n){const i=new Float32Array(Dr),r=new G(0,1,0);return new hr({name:"SphericalGaussianBlur",defines:{n:Dr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ah(),fragmentShader:`

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
		`,blending:ar,depthTest:!1,depthWrite:!1})}function Dm(){return new hr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ah(),fragmentShader:`

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
		`,blending:ar,depthTest:!1,depthWrite:!1})}function Im(){return new hr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ah(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ar,depthTest:!1,depthWrite:!1})}function ah(){return`

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
	`}function dC(t){let e=new WeakMap,n=null;function i(o){if(o&&o.isTexture){const c=o.mapping,u=c===Vd||c===Gd,f=c===Gs||c===Ws;if(u||f){let p=e.get(o);const h=p!==void 0?p.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return n===null&&(n=new Pm(t)),p=u?n.fromEquirectangular(o,p):n.fromCubemap(o,p),p.texture.pmremVersion=o.pmremVersion,e.set(o,p),p.texture;if(p!==void 0)return p.texture;{const m=o.image;return u&&m&&m.height>0||f&&m&&r(m)?(n===null&&(n=new Pm(t)),p=u?n.fromEquirectangular(o):n.fromCubemap(o),p.texture.pmremVersion=o.pmremVersion,e.set(o,p),o.addEventListener("dispose",s),p.texture):null}}}return o}function r(o){let c=0;const u=6;for(let f=0;f<u;f++)o[f]!==void 0&&c++;return c===u}function s(o){const c=o.target;c.removeEventListener("dispose",s);const u=e.get(c);u!==void 0&&(e.delete(c),u.dispose())}function a(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:a}}function fC(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&t0("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function hC(t,e,n,i){const r={},s=new WeakMap;function a(p){const h=p.target;h.index!==null&&e.remove(h.index);for(const y in h.attributes)e.remove(h.attributes[y]);for(const y in h.morphAttributes){const v=h.morphAttributes[y];for(let g=0,d=v.length;g<d;g++)e.remove(v[g])}h.removeEventListener("dispose",a),delete r[h.id];const m=s.get(h);m&&(e.remove(m),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function o(p,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,n.memory.geometries++),h}function c(p){const h=p.attributes;for(const y in h)e.update(h[y],t.ARRAY_BUFFER);const m=p.morphAttributes;for(const y in m){const v=m[y];for(let g=0,d=v.length;g<d;g++)e.update(v[g],t.ARRAY_BUFFER)}}function u(p){const h=[],m=p.index,y=p.attributes.position;let v=0;if(m!==null){const x=m.array;v=m.version;for(let _=0,E=x.length;_<E;_+=3){const R=x[_+0],A=x[_+1],C=x[_+2];h.push(R,A,A,C,C,R)}}else if(y!==void 0){const x=y.array;v=y.version;for(let _=0,E=x.length/3-1;_<E;_+=3){const R=_+0,A=_+1,C=_+2;h.push(R,A,A,C,C,R)}}else return;const g=new(e0(h)?c0:l0)(h,1);g.version=v;const d=s.get(p);d&&e.remove(d),s.set(p,g)}function f(p){const h=s.get(p);if(h){const m=p.index;m!==null&&h.version<m.version&&u(p)}else u(p);return s.get(p)}return{get:o,update:c,getWireframeAttribute:f}}function pC(t,e,n){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function c(h,m){t.drawElements(i,m,s,h*a),n.update(m,i,1)}function u(h,m,y){y!==0&&(t.drawElementsInstanced(i,m,s,h*a,y),n.update(m,i,y))}function f(h,m,y){if(y===0)return;const v=e.get("WEBGL_multi_draw");if(v===null)for(let g=0;g<y;g++)this.render(h[g]/a,m[g]);else{v.multiDrawElementsWEBGL(i,m,0,s,h,0,y);let g=0;for(let d=0;d<y;d++)g+=m[d];n.update(g,i,1)}}function p(h,m,y,v){if(y===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let d=0;d<h.length;d++)u(h[d]/a,m[d],v[d]);else{g.multiDrawElementsInstancedWEBGL(i,m,0,s,h,0,v,0,y);let d=0;for(let x=0;x<y;x++)d+=m[x];for(let x=0;x<v.length;x++)n.update(d,i,v[x])}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=u,this.renderMultiDraw=f,this.renderMultiDrawInstances=p}function mC(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function gC(t,e,n){const i=new WeakMap,r=new Wt;function s(a,o,c){const u=a.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=f!==void 0?f.length:0;let h=i.get(o);if(h===void 0||h.count!==p){let M=function(){b.dispose(),i.delete(o),o.removeEventListener("dispose",M)};var m=M;h!==void 0&&h.texture.dispose();const y=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],_=o.morphAttributes.color||[];let E=0;y===!0&&(E=1),v===!0&&(E=2),g===!0&&(E=3);let R=o.attributes.position.count*E,A=1;R>e.maxTextureSize&&(A=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const C=new Float32Array(R*A*4*p),b=new i0(C,R,A,p);b.type=Ki,b.needsUpdate=!0;const S=E*4;for(let P=0;P<p;P++){const X=d[P],j=x[P],ne=_[P],$=R*A*4*P;for(let Z=0;Z<X.count;Z++){const ee=Z*S;y===!0&&(r.fromBufferAttribute(X,Z),C[$+ee+0]=r.x,C[$+ee+1]=r.y,C[$+ee+2]=r.z,C[$+ee+3]=0),v===!0&&(r.fromBufferAttribute(j,Z),C[$+ee+4]=r.x,C[$+ee+5]=r.y,C[$+ee+6]=r.z,C[$+ee+7]=0),g===!0&&(r.fromBufferAttribute(ne,Z),C[$+ee+8]=r.x,C[$+ee+9]=r.y,C[$+ee+10]=r.z,C[$+ee+11]=ne.itemSize===4?r.w:1)}}h={count:p,texture:b,size:new dt(R,A)},i.set(o,h),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(t,"morphTexture",a.morphTexture,n);else{let y=0;for(let g=0;g<u.length;g++)y+=u[g];const v=o.morphTargetsRelative?1:1-y;c.getUniforms().setValue(t,"morphTargetBaseInfluence",v),c.getUniforms().setValue(t,"morphTargetInfluences",u)}c.getUniforms().setValue(t,"morphTargetsTexture",h.texture,n),c.getUniforms().setValue(t,"morphTargetsTextureSize",h.size)}return{update:s}}function vC(t,e,n,i){let r=new WeakMap;function s(c){const u=i.render.frame,f=c.geometry,p=e.get(c,f);if(r.get(p)!==u&&(e.update(p),r.set(p,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==u&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const h=c.skeleton;r.get(h)!==u&&(h.update(),r.set(h,u))}return p}function a(){r=new WeakMap}function o(c){const u=c.target;u.removeEventListener("dispose",o),n.remove(u.instanceMatrix),u.instanceColor!==null&&n.remove(u.instanceColor)}return{update:s,dispose:a}}class m0 extends mn{constructor(e,n,i,r,s,a,o,c,u,f=Us){if(f!==Us&&f!==qs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&f===Us&&(i=Xs),i===void 0&&f===qs&&(i=$s),super(null,r,s,a,o,c,f,i,u),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=o!==void 0?o:Ln,this.minFilter=c!==void 0?c:Ln,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const g0=new mn,v0=new m0(1,1);v0.compareFunction=Jx;const x0=new i0,_0=new n1,y0=new f0,Um=[],Fm=[],km=new Float32Array(16),Om=new Float32Array(9),Bm=new Float32Array(4);function na(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Um[r];if(s===void 0&&(s=new Float32Array(r),Um[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(s,o)}return s}function Ot(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Bt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Ac(t,e){let n=Fm[e];n===void 0&&(n=new Int32Array(e),Fm[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function xC(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function _C(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ot(n,e))return;t.uniform2fv(this.addr,e),Bt(n,e)}}function yC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Ot(n,e))return;t.uniform3fv(this.addr,e),Bt(n,e)}}function SC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ot(n,e))return;t.uniform4fv(this.addr,e),Bt(n,e)}}function MC(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ot(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Bt(n,e)}else{if(Ot(n,i))return;Bm.set(i),t.uniformMatrix2fv(this.addr,!1,Bm),Bt(n,i)}}function EC(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ot(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Bt(n,e)}else{if(Ot(n,i))return;Om.set(i),t.uniformMatrix3fv(this.addr,!1,Om),Bt(n,i)}}function wC(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ot(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Bt(n,e)}else{if(Ot(n,i))return;km.set(i),t.uniformMatrix4fv(this.addr,!1,km),Bt(n,i)}}function TC(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function CC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ot(n,e))return;t.uniform2iv(this.addr,e),Bt(n,e)}}function AC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ot(n,e))return;t.uniform3iv(this.addr,e),Bt(n,e)}}function bC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ot(n,e))return;t.uniform4iv(this.addr,e),Bt(n,e)}}function RC(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function NC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ot(n,e))return;t.uniform2uiv(this.addr,e),Bt(n,e)}}function PC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ot(n,e))return;t.uniform3uiv(this.addr,e),Bt(n,e)}}function LC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ot(n,e))return;t.uniform4uiv(this.addr,e),Bt(n,e)}}function DC(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);const s=this.type===t.SAMPLER_2D_SHADOW?v0:g0;n.setTexture2D(e||s,r)}function IC(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||_0,r)}function UC(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||y0,r)}function FC(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||x0,r)}function kC(t){switch(t){case 5126:return xC;case 35664:return _C;case 35665:return yC;case 35666:return SC;case 35674:return MC;case 35675:return EC;case 35676:return wC;case 5124:case 35670:return TC;case 35667:case 35671:return CC;case 35668:case 35672:return AC;case 35669:case 35673:return bC;case 5125:return RC;case 36294:return NC;case 36295:return PC;case 36296:return LC;case 35678:case 36198:case 36298:case 36306:case 35682:return DC;case 35679:case 36299:case 36307:return IC;case 35680:case 36300:case 36308:case 36293:return UC;case 36289:case 36303:case 36311:case 36292:return FC}}function OC(t,e){t.uniform1fv(this.addr,e)}function BC(t,e){const n=na(e,this.size,2);t.uniform2fv(this.addr,n)}function zC(t,e){const n=na(e,this.size,3);t.uniform3fv(this.addr,n)}function jC(t,e){const n=na(e,this.size,4);t.uniform4fv(this.addr,n)}function HC(t,e){const n=na(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function VC(t,e){const n=na(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function GC(t,e){const n=na(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function WC(t,e){t.uniform1iv(this.addr,e)}function XC(t,e){t.uniform2iv(this.addr,e)}function $C(t,e){t.uniform3iv(this.addr,e)}function qC(t,e){t.uniform4iv(this.addr,e)}function YC(t,e){t.uniform1uiv(this.addr,e)}function KC(t,e){t.uniform2uiv(this.addr,e)}function ZC(t,e){t.uniform3uiv(this.addr,e)}function QC(t,e){t.uniform4uiv(this.addr,e)}function JC(t,e,n){const i=this.cache,r=e.length,s=Ac(n,r);Ot(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));for(let a=0;a!==r;++a)n.setTexture2D(e[a]||g0,s[a])}function eA(t,e,n){const i=this.cache,r=e.length,s=Ac(n,r);Ot(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));for(let a=0;a!==r;++a)n.setTexture3D(e[a]||_0,s[a])}function tA(t,e,n){const i=this.cache,r=e.length,s=Ac(n,r);Ot(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));for(let a=0;a!==r;++a)n.setTextureCube(e[a]||y0,s[a])}function nA(t,e,n){const i=this.cache,r=e.length,s=Ac(n,r);Ot(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(e[a]||x0,s[a])}function iA(t){switch(t){case 5126:return OC;case 35664:return BC;case 35665:return zC;case 35666:return jC;case 35674:return HC;case 35675:return VC;case 35676:return GC;case 5124:case 35670:return WC;case 35667:case 35671:return XC;case 35668:case 35672:return $C;case 35669:case 35673:return qC;case 5125:return YC;case 36294:return KC;case 36295:return ZC;case 36296:return QC;case 35678:case 36198:case 36298:case 36306:case 35682:return JC;case 35679:case 36299:case 36307:return eA;case 35680:case 36300:case 36308:case 36293:return tA;case 36289:case 36303:case 36311:case 36292:return nA}}class rA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=kC(n.type)}}class sA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=iA(n.type)}}class aA{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,n[o.id],i)}}}const Fu=/(\w+)(\])?(\[|\.)?/g;function zm(t,e){t.seq.push(e),t.map[e.id]=e}function oA(t,e,n){const i=t.name,r=i.length;for(Fu.lastIndex=0;;){const s=Fu.exec(i),a=Fu.lastIndex;let o=s[1];const c=s[2]==="]",u=s[3];if(c&&(o=o|0),u===void 0||u==="["&&a+2===r){zm(n,u===void 0?new rA(o,t,e):new sA(o,t,e));break}else{let p=n.map[o];p===void 0&&(p=new aA(o),zm(n,p)),n=p}}}class yl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),a=e.getUniformLocation(n,s.name);oA(s,a,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in n&&i.push(a)}return i}}function jm(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const lA=37297;let cA=0;function uA(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}function dA(t){const e=ft.getPrimaries(ft.workingColorSpace),n=ft.getPrimaries(t);let i;switch(e===n?i="":e===Zl&&n===Kl?i="LinearDisplayP3ToLinearSRGB":e===Kl&&n===Zl&&(i="LinearSRGBToLinearDisplayP3"),t){case vr:case wc:return[i,"LinearTransferOETF"];case ti:case sh:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function Hm(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+uA(t.getShaderSource(e),a)}else return r}function fA(t,e){const n=dA(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function hA(t,e){let n;switch(e){case _E:n="Linear";break;case yE:n="Reinhard";break;case SE:n="OptimizedCineon";break;case ME:n="ACESFilmic";break;case wE:n="AgX";break;case TE:n="Neutral";break;case EE:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function pA(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ta).join(`
`)}function mA(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function gA(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),a=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function Ta(t){return t!==""}function Vm(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Gm(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const vA=/^[ \t]*#include +<([\w\d./]+)>/gm;function qd(t){return t.replace(vA,_A)}const xA=new Map;function _A(t,e){let n=Qe[e];if(n===void 0){const i=xA.get(e);if(i!==void 0)n=Qe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return qd(n)}const yA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wm(t){return t.replace(yA,SA)}function SA(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Xm(t){let e=`precision ${t.precision} float;
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
#define LOW_PRECISION`),e}function MA(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===Gx?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===WM?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===mi&&(e="SHADOWMAP_TYPE_VSM"),e}function EA(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Gs:case Ws:e="ENVMAP_TYPE_CUBE";break;case Mc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function wA(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case Ws:e="ENVMAP_MODE_REFRACTION";break}return e}function TA(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case Wx:e="ENVMAP_BLENDING_MULTIPLY";break;case vE:e="ENVMAP_BLENDING_MIX";break;case xE:e="ENVMAP_BLENDING_ADD";break}return e}function CA(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function AA(t,e,n,i){const r=t.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const c=MA(n),u=EA(n),f=wA(n),p=TA(n),h=CA(n),m=pA(n),y=mA(s),v=r.createProgram();let g,d,x=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y].filter(Ta).join(`
`),g.length>0&&(g+=`
`),d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y].filter(Ta).join(`
`),d.length>0&&(d+=`
`)):(g=[Xm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ta).join(`
`),d=[Xm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.envMap?"#define "+f:"",n.envMap?"#define "+p:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==or?"#define TONE_MAPPING":"",n.toneMapping!==or?Qe.tonemapping_pars_fragment:"",n.toneMapping!==or?hA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,fA("linearToOutputTexel",n.outputColorSpace),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ta).join(`
`)),a=qd(a),a=Vm(a,n),a=Gm(a,n),o=qd(o),o=Vm(o,n),o=Gm(o,n),a=Wm(a),o=Wm(o),n.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,d=["#define varying in",n.glslVersion===lm?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===lm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const _=x+g+a,E=x+d+o,R=jm(r,r.VERTEX_SHADER,_),A=jm(r,r.FRAGMENT_SHADER,E);r.attachShader(v,R),r.attachShader(v,A),n.index0AttributeName!==void 0?r.bindAttribLocation(v,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function C(P){if(t.debug.checkShaderErrors){const X=r.getProgramInfoLog(v).trim(),j=r.getShaderInfoLog(R).trim(),ne=r.getShaderInfoLog(A).trim();let $=!0,Z=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if($=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,v,R,A);else{const ee=Hm(r,R,"vertex"),k=Hm(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+X+`
`+ee+`
`+k)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(j===""||ne==="")&&(Z=!1);Z&&(P.diagnostics={runnable:$,programLog:X,vertexShader:{log:j,prefix:g},fragmentShader:{log:ne,prefix:d}})}r.deleteShader(R),r.deleteShader(A),b=new yl(r,v),S=gA(r,v)}let b;this.getUniforms=function(){return b===void 0&&C(this),b};let S;this.getAttributes=function(){return S===void 0&&C(this),S};let M=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(v,lA)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=cA++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=R,this.fragmentShader=A,this}let bA=0;class RA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new NA(e),n.set(e,i)),i}}class NA{constructor(e){this.id=bA++,this.code=e,this.usedTimes=0}}function PA(t,e,n,i,r,s,a){const o=new s0,c=new RA,u=new Set,f=[],p=r.logarithmicDepthBuffer,h=r.vertexTextures;let m=r.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return u.add(S),S===0?"uv":`uv${S}`}function g(S,M,P,X,j){const ne=X.fog,$=j.geometry,Z=S.isMeshStandardMaterial?X.environment:null,ee=(S.isMeshStandardMaterial?n:e).get(S.envMap||Z),k=ee&&ee.mapping===Mc?ee.image.height:null,ie=y[S.type];S.precision!==null&&(m=r.getMaxPrecision(S.precision),m!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",m,"instead."));const re=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ue=re!==void 0?re.length:0;let Pe=0;$.morphAttributes.position!==void 0&&(Pe=1),$.morphAttributes.normal!==void 0&&(Pe=2),$.morphAttributes.color!==void 0&&(Pe=3);let tt,q,ae,ve;if(ie){const at=ni[ie];tt=at.vertexShader,q=at.fragmentShader}else tt=S.vertexShader,q=S.fragmentShader,c.update(S),ae=c.getVertexShaderID(S),ve=c.getFragmentShaderID(S);const ge=t.getRenderTarget(),we=j.isInstancedMesh===!0,ke=j.isBatchedMesh===!0,He=!!S.map,F=!!S.matcap,qe=!!ee,Ye=!!S.aoMap,ct=!!S.lightMap,Be=!!S.bumpMap,Ke=!!S.normalMap,Xe=!!S.displacementMap,Ve=!!S.emissiveMap,gt=!!S.metalnessMap,N=!!S.roughnessMap,w=S.anisotropy>0,H=S.clearcoat>0,se=S.dispersion>0,oe=S.iridescence>0,le=S.sheen>0,De=S.transmission>0,xe=w&&!!S.anisotropyMap,Se=H&&!!S.clearcoatMap,Ie=H&&!!S.clearcoatNormalMap,pe=H&&!!S.clearcoatRoughnessMap,Re=oe&&!!S.iridescenceMap,$e=oe&&!!S.iridescenceThicknessMap,ze=le&&!!S.sheenColorMap,Ee=le&&!!S.sheenRoughnessMap,We=!!S.specularMap,Ge=!!S.specularColorMap,Ze=!!S.specularIntensityMap,U=De&&!!S.transmissionMap,Me=De&&!!S.thicknessMap,Y=!!S.gradientMap,Q=!!S.alphaMap,me=S.alphaTest>0,je=!!S.alphaHash,et=!!S.extensions;let ut=or;S.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(ut=t.toneMapping);const _t={shaderID:ie,shaderType:S.type,shaderName:S.name,vertexShader:tt,fragmentShader:q,defines:S.defines,customVertexShaderID:ae,customFragmentShaderID:ve,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:m,batching:ke,batchingColor:ke&&j._colorsTexture!==null,instancing:we,instancingColor:we&&j.instanceColor!==null,instancingMorph:we&&j.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:ge===null?t.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:vr,alphaToCoverage:!!S.alphaToCoverage,map:He,matcap:F,envMap:qe,envMapMode:qe&&ee.mapping,envMapCubeUVHeight:k,aoMap:Ye,lightMap:ct,bumpMap:Be,normalMap:Ke,displacementMap:h&&Xe,emissiveMap:Ve,normalMapObjectSpace:Ke&&S.normalMapType===zE,normalMapTangentSpace:Ke&&S.normalMapType===BE,metalnessMap:gt,roughnessMap:N,anisotropy:w,anisotropyMap:xe,clearcoat:H,clearcoatMap:Se,clearcoatNormalMap:Ie,clearcoatRoughnessMap:pe,dispersion:se,iridescence:oe,iridescenceMap:Re,iridescenceThicknessMap:$e,sheen:le,sheenColorMap:ze,sheenRoughnessMap:Ee,specularMap:We,specularColorMap:Ge,specularIntensityMap:Ze,transmission:De,transmissionMap:U,thicknessMap:Me,gradientMap:Y,opaque:S.transparent===!1&&S.blending===Is&&S.alphaToCoverage===!1,alphaMap:Q,alphaTest:me,alphaHash:je,combine:S.combine,mapUv:He&&v(S.map.channel),aoMapUv:Ye&&v(S.aoMap.channel),lightMapUv:ct&&v(S.lightMap.channel),bumpMapUv:Be&&v(S.bumpMap.channel),normalMapUv:Ke&&v(S.normalMap.channel),displacementMapUv:Xe&&v(S.displacementMap.channel),emissiveMapUv:Ve&&v(S.emissiveMap.channel),metalnessMapUv:gt&&v(S.metalnessMap.channel),roughnessMapUv:N&&v(S.roughnessMap.channel),anisotropyMapUv:xe&&v(S.anisotropyMap.channel),clearcoatMapUv:Se&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:Ie&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pe&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Re&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:$e&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:ze&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&v(S.sheenRoughnessMap.channel),specularMapUv:We&&v(S.specularMap.channel),specularColorMapUv:Ge&&v(S.specularColorMap.channel),specularIntensityMapUv:Ze&&v(S.specularIntensityMap.channel),transmissionMapUv:U&&v(S.transmissionMap.channel),thicknessMapUv:Me&&v(S.thicknessMap.channel),alphaMapUv:Q&&v(S.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(Ke||w),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:j.isPoints===!0&&!!$.attributes.uv&&(He||Q),fog:!!ne,useFog:S.fog===!0,fogExp2:!!ne&&ne.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:p,skinning:j.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:ue,morphTextureStride:Pe,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:t.shadowMap.enabled&&P.length>0,shadowMapType:t.shadowMap.type,toneMapping:ut,decodeVideoTexture:He&&S.map.isVideoTexture===!0&&ft.getTransfer(S.map.colorSpace)===St,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===xi,flipSided:S.side===pn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:et&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:et&&S.extensions.multiDraw===!0&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return _t.vertexUv1s=u.has(1),_t.vertexUv2s=u.has(2),_t.vertexUv3s=u.has(3),u.clear(),_t}function d(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const P in S.defines)M.push(P),M.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(x(M,S),_(M,S),M.push(t.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function x(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function _(S,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.skinning&&o.enable(4),M.morphTargets&&o.enable(5),M.morphNormals&&o.enable(6),M.morphColors&&o.enable(7),M.premultipliedAlpha&&o.enable(8),M.shadowMapEnabled&&o.enable(9),M.doubleSided&&o.enable(10),M.flipSided&&o.enable(11),M.useDepthPacking&&o.enable(12),M.dithering&&o.enable(13),M.transmission&&o.enable(14),M.sheen&&o.enable(15),M.opaque&&o.enable(16),M.pointsUvs&&o.enable(17),M.decodeVideoTexture&&o.enable(18),M.alphaToCoverage&&o.enable(19),S.push(o.mask)}function E(S){const M=y[S.type];let P;if(M){const X=ni[M];P=p1.clone(X.uniforms)}else P=S.uniforms;return P}function R(S,M){let P;for(let X=0,j=f.length;X<j;X++){const ne=f[X];if(ne.cacheKey===M){P=ne,++P.usedTimes;break}}return P===void 0&&(P=new AA(t,M,S,s),f.push(P)),P}function A(S){if(--S.usedTimes===0){const M=f.indexOf(S);f[M]=f[f.length-1],f.pop(),S.destroy()}}function C(S){c.remove(S)}function b(){c.dispose()}return{getParameters:g,getProgramCacheKey:d,getUniforms:E,acquireProgram:R,releaseProgram:A,releaseShaderCache:C,programs:f,dispose:b}}function LA(){let t=new WeakMap;function e(s){let a=t.get(s);return a===void 0&&(a={},t.set(s,a)),a}function n(s){t.delete(s)}function i(s,a,o){t.get(s)[a]=o}function r(){t=new WeakMap}return{get:e,remove:n,update:i,dispose:r}}function DA(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function $m(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function qm(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function a(p,h,m,y,v,g){let d=t[e];return d===void 0?(d={id:p.id,object:p,geometry:h,material:m,groupOrder:y,renderOrder:p.renderOrder,z:v,group:g},t[e]=d):(d.id=p.id,d.object=p,d.geometry=h,d.material=m,d.groupOrder=y,d.renderOrder=p.renderOrder,d.z=v,d.group=g),e++,d}function o(p,h,m,y,v,g){const d=a(p,h,m,y,v,g);m.transmission>0?i.push(d):m.transparent===!0?r.push(d):n.push(d)}function c(p,h,m,y,v,g){const d=a(p,h,m,y,v,g);m.transmission>0?i.unshift(d):m.transparent===!0?r.unshift(d):n.unshift(d)}function u(p,h){n.length>1&&n.sort(p||DA),i.length>1&&i.sort(h||$m),r.length>1&&r.sort(h||$m)}function f(){for(let p=e,h=t.length;p<h;p++){const m=t[p];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:o,unshift:c,finish:f,sort:u}}function IA(){let t=new WeakMap;function e(i,r){const s=t.get(i);let a;return s===void 0?(a=new qm,t.set(i,[a])):r>=s.length?(a=new qm,s.push(a)):a=s[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function UA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new G,color:new ht};break;case"SpotLight":n={position:new G,direction:new G,color:new ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new G,color:new ht,distance:0,decay:0};break;case"HemisphereLight":n={direction:new G,skyColor:new ht,groundColor:new ht};break;case"RectAreaLight":n={color:new ht,position:new G,halfWidth:new G,halfHeight:new G};break}return t[e.id]=n,n}}}function FA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let kA=0;function OA(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function BA(t){const e=new UA,n=FA(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new G);const r=new G,s=new Ut,a=new Ut;function o(u){let f=0,p=0,h=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let m=0,y=0,v=0,g=0,d=0,x=0,_=0,E=0,R=0,A=0,C=0;u.sort(OA);for(let S=0,M=u.length;S<M;S++){const P=u[S],X=P.color,j=P.intensity,ne=P.distance,$=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)f+=X.r*j,p+=X.g*j,h+=X.b*j;else if(P.isLightProbe){for(let Z=0;Z<9;Z++)i.probe[Z].addScaledVector(P.sh.coefficients[Z],j);C++}else if(P.isDirectionalLight){const Z=e.get(P);if(Z.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const ee=P.shadow,k=n.get(P);k.shadowBias=ee.bias,k.shadowNormalBias=ee.normalBias,k.shadowRadius=ee.radius,k.shadowMapSize=ee.mapSize,i.directionalShadow[m]=k,i.directionalShadowMap[m]=$,i.directionalShadowMatrix[m]=P.shadow.matrix,x++}i.directional[m]=Z,m++}else if(P.isSpotLight){const Z=e.get(P);Z.position.setFromMatrixPosition(P.matrixWorld),Z.color.copy(X).multiplyScalar(j),Z.distance=ne,Z.coneCos=Math.cos(P.angle),Z.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),Z.decay=P.decay,i.spot[v]=Z;const ee=P.shadow;if(P.map&&(i.spotLightMap[R]=P.map,R++,ee.updateMatrices(P),P.castShadow&&A++),i.spotLightMatrix[v]=ee.matrix,P.castShadow){const k=n.get(P);k.shadowBias=ee.bias,k.shadowNormalBias=ee.normalBias,k.shadowRadius=ee.radius,k.shadowMapSize=ee.mapSize,i.spotShadow[v]=k,i.spotShadowMap[v]=$,E++}v++}else if(P.isRectAreaLight){const Z=e.get(P);Z.color.copy(X).multiplyScalar(j),Z.halfWidth.set(P.width*.5,0,0),Z.halfHeight.set(0,P.height*.5,0),i.rectArea[g]=Z,g++}else if(P.isPointLight){const Z=e.get(P);if(Z.color.copy(P.color).multiplyScalar(P.intensity),Z.distance=P.distance,Z.decay=P.decay,P.castShadow){const ee=P.shadow,k=n.get(P);k.shadowBias=ee.bias,k.shadowNormalBias=ee.normalBias,k.shadowRadius=ee.radius,k.shadowMapSize=ee.mapSize,k.shadowCameraNear=ee.camera.near,k.shadowCameraFar=ee.camera.far,i.pointShadow[y]=k,i.pointShadowMap[y]=$,i.pointShadowMatrix[y]=P.shadow.matrix,_++}i.point[y]=Z,y++}else if(P.isHemisphereLight){const Z=e.get(P);Z.skyColor.copy(P.color).multiplyScalar(j),Z.groundColor.copy(P.groundColor).multiplyScalar(j),i.hemi[d]=Z,d++}}g>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Te.LTC_FLOAT_1,i.rectAreaLTC2=Te.LTC_FLOAT_2):(i.rectAreaLTC1=Te.LTC_HALF_1,i.rectAreaLTC2=Te.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=p,i.ambient[2]=h;const b=i.hash;(b.directionalLength!==m||b.pointLength!==y||b.spotLength!==v||b.rectAreaLength!==g||b.hemiLength!==d||b.numDirectionalShadows!==x||b.numPointShadows!==_||b.numSpotShadows!==E||b.numSpotMaps!==R||b.numLightProbes!==C)&&(i.directional.length=m,i.spot.length=v,i.rectArea.length=g,i.point.length=y,i.hemi.length=d,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=E+R-A,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=C,b.directionalLength=m,b.pointLength=y,b.spotLength=v,b.rectAreaLength=g,b.hemiLength=d,b.numDirectionalShadows=x,b.numPointShadows=_,b.numSpotShadows=E,b.numSpotMaps=R,b.numLightProbes=C,i.version=kA++)}function c(u,f){let p=0,h=0,m=0,y=0,v=0;const g=f.matrixWorldInverse;for(let d=0,x=u.length;d<x;d++){const _=u[d];if(_.isDirectionalLight){const E=i.directional[p];E.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(g),p++}else if(_.isSpotLight){const E=i.spot[m];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(g),E.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(g),m++}else if(_.isRectAreaLight){const E=i.rectArea[y];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(g),a.identity(),s.copy(_.matrixWorld),s.premultiply(g),a.extractRotation(s),E.halfWidth.set(_.width*.5,0,0),E.halfHeight.set(0,_.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),y++}else if(_.isPointLight){const E=i.point[h];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(g),h++}else if(_.isHemisphereLight){const E=i.hemi[v];E.direction.setFromMatrixPosition(_.matrixWorld),E.direction.transformDirection(g),v++}}}return{setup:o,setupView:c,state:i}}function Ym(t){const e=new BA(t),n=[],i=[];function r(f){u.camera=f,n.length=0,i.length=0}function s(f){n.push(f)}function a(f){i.push(f)}function o(){e.setup(n)}function c(f){e.setupView(n,f)}const u={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:u,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function zA(t){let e=new WeakMap;function n(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Ym(t),e.set(r,[o])):s>=a.length?(o=new Ym(t),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}class jA extends ho{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=kE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class HA extends ho{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const VA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,GA=`uniform sampler2D shadow_pass;
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
}`;function WA(t,e,n){let i=new h0;const r=new dt,s=new dt,a=new Wt,o=new jA({depthPacking:OE}),c=new HA,u={},f=n.maxTextureSize,p={[dr]:pn,[pn]:dr,[xi]:xi},h=new hr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new dt},radius:{value:4}},vertexShader:VA,fragmentShader:GA}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const y=new Ui;y.setAttribute("position",new In(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ei(y,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gx;let d=this.type;this.render=function(A,C,b){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;const S=t.getRenderTarget(),M=t.getActiveCubeFace(),P=t.getActiveMipmapLevel(),X=t.state;X.setBlending(ar),X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);const j=d!==mi&&this.type===mi,ne=d===mi&&this.type!==mi;for(let $=0,Z=A.length;$<Z;$++){const ee=A[$],k=ee.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);const ie=k.getFrameExtents();if(r.multiply(ie),s.copy(k.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/ie.x),r.x=s.x*ie.x,k.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/ie.y),r.y=s.y*ie.y,k.mapSize.y=s.y)),k.map===null||j===!0||ne===!0){const ue=this.type!==mi?{minFilter:Ln,magFilter:Ln}:{};k.map!==null&&k.map.dispose(),k.map=new $r(r.x,r.y,ue),k.map.texture.name=ee.name+".shadowMap",k.camera.updateProjectionMatrix()}t.setRenderTarget(k.map),t.clear();const re=k.getViewportCount();for(let ue=0;ue<re;ue++){const Pe=k.getViewport(ue);a.set(s.x*Pe.x,s.y*Pe.y,s.x*Pe.z,s.y*Pe.w),X.viewport(a),k.updateMatrices(ee,ue),i=k.getFrustum(),E(C,b,k.camera,ee,this.type)}k.isPointLightShadow!==!0&&this.type===mi&&x(k,b),k.needsUpdate=!1}d=this.type,g.needsUpdate=!1,t.setRenderTarget(S,M,P)};function x(A,C){const b=e.update(v);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new $r(r.x,r.y)),h.uniforms.shadow_pass.value=A.map.texture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,t.setRenderTarget(A.mapPass),t.clear(),t.renderBufferDirect(C,null,b,h,v,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,t.setRenderTarget(A.map),t.clear(),t.renderBufferDirect(C,null,b,m,v,null)}function _(A,C,b,S){let M=null;const P=b.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)M=P;else if(M=b.isPointLight===!0?c:o,t.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const X=M.uuid,j=C.uuid;let ne=u[X];ne===void 0&&(ne={},u[X]=ne);let $=ne[j];$===void 0&&($=M.clone(),ne[j]=$,C.addEventListener("dispose",R)),M=$}if(M.visible=C.visible,M.wireframe=C.wireframe,S===mi?M.side=C.shadowSide!==null?C.shadowSide:C.side:M.side=C.shadowSide!==null?C.shadowSide:p[C.side],M.alphaMap=C.alphaMap,M.alphaTest=C.alphaTest,M.map=C.map,M.clipShadows=C.clipShadows,M.clippingPlanes=C.clippingPlanes,M.clipIntersection=C.clipIntersection,M.displacementMap=C.displacementMap,M.displacementScale=C.displacementScale,M.displacementBias=C.displacementBias,M.wireframeLinewidth=C.wireframeLinewidth,M.linewidth=C.linewidth,b.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const X=t.properties.get(M);X.light=b}return M}function E(A,C,b,S,M){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&M===mi)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,A.matrixWorld);const j=e.update(A),ne=A.material;if(Array.isArray(ne)){const $=j.groups;for(let Z=0,ee=$.length;Z<ee;Z++){const k=$[Z],ie=ne[k.materialIndex];if(ie&&ie.visible){const re=_(A,ie,S,M);A.onBeforeShadow(t,A,C,b,j,re,k),t.renderBufferDirect(b,null,j,re,A,k),A.onAfterShadow(t,A,C,b,j,re,k)}}}else if(ne.visible){const $=_(A,ne,S,M);A.onBeforeShadow(t,A,C,b,j,$,null),t.renderBufferDirect(b,null,j,$,A,null),A.onAfterShadow(t,A,C,b,j,$,null)}}const X=A.children;for(let j=0,ne=X.length;j<ne;j++)E(X[j],C,b,S,M)}function R(A){A.target.removeEventListener("dispose",R);for(const b in u){const S=u[b],M=A.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}function XA(t){function e(){let U=!1;const Me=new Wt;let Y=null;const Q=new Wt(0,0,0,0);return{setMask:function(me){Y!==me&&!U&&(t.colorMask(me,me,me,me),Y=me)},setLocked:function(me){U=me},setClear:function(me,je,et,ut,_t){_t===!0&&(me*=ut,je*=ut,et*=ut),Me.set(me,je,et,ut),Q.equals(Me)===!1&&(t.clearColor(me,je,et,ut),Q.copy(Me))},reset:function(){U=!1,Y=null,Q.set(-1,0,0,0)}}}function n(){let U=!1,Me=null,Y=null,Q=null;return{setTest:function(me){me?ve(t.DEPTH_TEST):ge(t.DEPTH_TEST)},setMask:function(me){Me!==me&&!U&&(t.depthMask(me),Me=me)},setFunc:function(me){if(Y!==me){switch(me){case uE:t.depthFunc(t.NEVER);break;case dE:t.depthFunc(t.ALWAYS);break;case fE:t.depthFunc(t.LESS);break;case $l:t.depthFunc(t.LEQUAL);break;case hE:t.depthFunc(t.EQUAL);break;case pE:t.depthFunc(t.GEQUAL);break;case mE:t.depthFunc(t.GREATER);break;case gE:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}Y=me}},setLocked:function(me){U=me},setClear:function(me){Q!==me&&(t.clearDepth(me),Q=me)},reset:function(){U=!1,Me=null,Y=null,Q=null}}}function i(){let U=!1,Me=null,Y=null,Q=null,me=null,je=null,et=null,ut=null,_t=null;return{setTest:function(at){U||(at?ve(t.STENCIL_TEST):ge(t.STENCIL_TEST))},setMask:function(at){Me!==at&&!U&&(t.stencilMask(at),Me=at)},setFunc:function(at,V,ce){(Y!==at||Q!==V||me!==ce)&&(t.stencilFunc(at,V,ce),Y=at,Q=V,me=ce)},setOp:function(at,V,ce){(je!==at||et!==V||ut!==ce)&&(t.stencilOp(at,V,ce),je=at,et=V,ut=ce)},setLocked:function(at){U=at},setClear:function(at){_t!==at&&(t.clearStencil(at),_t=at)},reset:function(){U=!1,Me=null,Y=null,Q=null,me=null,je=null,et=null,ut=null,_t=null}}}const r=new e,s=new n,a=new i,o=new WeakMap,c=new WeakMap;let u={},f={},p=new WeakMap,h=[],m=null,y=!1,v=null,g=null,d=null,x=null,_=null,E=null,R=null,A=new ht(0,0,0),C=0,b=!1,S=null,M=null,P=null,X=null,j=null;const ne=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,Z=0;const ee=t.getParameter(t.VERSION);ee.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(ee)[1]),$=Z>=1):ee.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),$=Z>=2);let k=null,ie={};const re=t.getParameter(t.SCISSOR_BOX),ue=t.getParameter(t.VIEWPORT),Pe=new Wt().fromArray(re),tt=new Wt().fromArray(ue);function q(U,Me,Y,Q){const me=new Uint8Array(4),je=t.createTexture();t.bindTexture(U,je),t.texParameteri(U,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(U,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let et=0;et<Y;et++)U===t.TEXTURE_3D||U===t.TEXTURE_2D_ARRAY?t.texImage3D(Me,0,t.RGBA,1,1,Q,0,t.RGBA,t.UNSIGNED_BYTE,me):t.texImage2D(Me+et,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,me);return je}const ae={};ae[t.TEXTURE_2D]=q(t.TEXTURE_2D,t.TEXTURE_2D,1),ae[t.TEXTURE_CUBE_MAP]=q(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),ae[t.TEXTURE_2D_ARRAY]=q(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),ae[t.TEXTURE_3D]=q(t.TEXTURE_3D,t.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),a.setClear(0),ve(t.DEPTH_TEST),s.setFunc($l),Be(!1),Ke(Pp),ve(t.CULL_FACE),Ye(ar);function ve(U){u[U]!==!0&&(t.enable(U),u[U]=!0)}function ge(U){u[U]!==!1&&(t.disable(U),u[U]=!1)}function we(U,Me){return f[U]!==Me?(t.bindFramebuffer(U,Me),f[U]=Me,U===t.DRAW_FRAMEBUFFER&&(f[t.FRAMEBUFFER]=Me),U===t.FRAMEBUFFER&&(f[t.DRAW_FRAMEBUFFER]=Me),!0):!1}function ke(U,Me){let Y=h,Q=!1;if(U){Y=p.get(Me),Y===void 0&&(Y=[],p.set(Me,Y));const me=U.textures;if(Y.length!==me.length||Y[0]!==t.COLOR_ATTACHMENT0){for(let je=0,et=me.length;je<et;je++)Y[je]=t.COLOR_ATTACHMENT0+je;Y.length=me.length,Q=!0}}else Y[0]!==t.BACK&&(Y[0]=t.BACK,Q=!0);Q&&t.drawBuffers(Y)}function He(U){return m!==U?(t.useProgram(U),m=U,!0):!1}const F={[Lr]:t.FUNC_ADD,[$M]:t.FUNC_SUBTRACT,[qM]:t.FUNC_REVERSE_SUBTRACT};F[YM]=t.MIN,F[KM]=t.MAX;const qe={[ZM]:t.ZERO,[QM]:t.ONE,[JM]:t.SRC_COLOR,[jd]:t.SRC_ALPHA,[sE]:t.SRC_ALPHA_SATURATE,[iE]:t.DST_COLOR,[tE]:t.DST_ALPHA,[eE]:t.ONE_MINUS_SRC_COLOR,[Hd]:t.ONE_MINUS_SRC_ALPHA,[rE]:t.ONE_MINUS_DST_COLOR,[nE]:t.ONE_MINUS_DST_ALPHA,[aE]:t.CONSTANT_COLOR,[oE]:t.ONE_MINUS_CONSTANT_COLOR,[lE]:t.CONSTANT_ALPHA,[cE]:t.ONE_MINUS_CONSTANT_ALPHA};function Ye(U,Me,Y,Q,me,je,et,ut,_t,at){if(U===ar){y===!0&&(ge(t.BLEND),y=!1);return}if(y===!1&&(ve(t.BLEND),y=!0),U!==XM){if(U!==v||at!==b){if((g!==Lr||_!==Lr)&&(t.blendEquation(t.FUNC_ADD),g=Lr,_=Lr),at)switch(U){case Is:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case zd:t.blendFunc(t.ONE,t.ONE);break;case Lp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Dp:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Is:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case zd:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case Lp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Dp:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}d=null,x=null,E=null,R=null,A.set(0,0,0),C=0,v=U,b=at}return}me=me||Me,je=je||Y,et=et||Q,(Me!==g||me!==_)&&(t.blendEquationSeparate(F[Me],F[me]),g=Me,_=me),(Y!==d||Q!==x||je!==E||et!==R)&&(t.blendFuncSeparate(qe[Y],qe[Q],qe[je],qe[et]),d=Y,x=Q,E=je,R=et),(ut.equals(A)===!1||_t!==C)&&(t.blendColor(ut.r,ut.g,ut.b,_t),A.copy(ut),C=_t),v=U,b=!1}function ct(U,Me){U.side===xi?ge(t.CULL_FACE):ve(t.CULL_FACE);let Y=U.side===pn;Me&&(Y=!Y),Be(Y),U.blending===Is&&U.transparent===!1?Ye(ar):Ye(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),s.setFunc(U.depthFunc),s.setTest(U.depthTest),s.setMask(U.depthWrite),r.setMask(U.colorWrite);const Q=U.stencilWrite;a.setTest(Q),Q&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ve(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ve(t.SAMPLE_ALPHA_TO_COVERAGE):ge(t.SAMPLE_ALPHA_TO_COVERAGE)}function Be(U){S!==U&&(U?t.frontFace(t.CW):t.frontFace(t.CCW),S=U)}function Ke(U){U!==VM?(ve(t.CULL_FACE),U!==M&&(U===Pp?t.cullFace(t.BACK):U===GM?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):ge(t.CULL_FACE),M=U}function Xe(U){U!==P&&($&&t.lineWidth(U),P=U)}function Ve(U,Me,Y){U?(ve(t.POLYGON_OFFSET_FILL),(X!==Me||j!==Y)&&(t.polygonOffset(Me,Y),X=Me,j=Y)):ge(t.POLYGON_OFFSET_FILL)}function gt(U){U?ve(t.SCISSOR_TEST):ge(t.SCISSOR_TEST)}function N(U){U===void 0&&(U=t.TEXTURE0+ne-1),k!==U&&(t.activeTexture(U),k=U)}function w(U,Me,Y){Y===void 0&&(k===null?Y=t.TEXTURE0+ne-1:Y=k);let Q=ie[Y];Q===void 0&&(Q={type:void 0,texture:void 0},ie[Y]=Q),(Q.type!==U||Q.texture!==Me)&&(k!==Y&&(t.activeTexture(Y),k=Y),t.bindTexture(U,Me||ae[U]),Q.type=U,Q.texture=Me)}function H(){const U=ie[k];U!==void 0&&U.type!==void 0&&(t.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function se(){try{t.compressedTexImage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function oe(){try{t.compressedTexImage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function le(){try{t.texSubImage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function De(){try{t.texSubImage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function xe(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Se(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ie(){try{t.texStorage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function pe(){try{t.texStorage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Re(){try{t.texImage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function $e(){try{t.texImage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ze(U){Pe.equals(U)===!1&&(t.scissor(U.x,U.y,U.z,U.w),Pe.copy(U))}function Ee(U){tt.equals(U)===!1&&(t.viewport(U.x,U.y,U.z,U.w),tt.copy(U))}function We(U,Me){let Y=c.get(Me);Y===void 0&&(Y=new WeakMap,c.set(Me,Y));let Q=Y.get(U);Q===void 0&&(Q=t.getUniformBlockIndex(Me,U.name),Y.set(U,Q))}function Ge(U,Me){const Q=c.get(Me).get(U);o.get(Me)!==Q&&(t.uniformBlockBinding(Me,Q,U.__bindingPointIndex),o.set(Me,Q))}function Ze(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),u={},k=null,ie={},f={},p=new WeakMap,h=[],m=null,y=!1,v=null,g=null,d=null,x=null,_=null,E=null,R=null,A=new ht(0,0,0),C=0,b=!1,S=null,M=null,P=null,X=null,j=null,Pe.set(0,0,t.canvas.width,t.canvas.height),tt.set(0,0,t.canvas.width,t.canvas.height),r.reset(),s.reset(),a.reset()}return{buffers:{color:r,depth:s,stencil:a},enable:ve,disable:ge,bindFramebuffer:we,drawBuffers:ke,useProgram:He,setBlending:Ye,setMaterial:ct,setFlipSided:Be,setCullFace:Ke,setLineWidth:Xe,setPolygonOffset:Ve,setScissorTest:gt,activeTexture:N,bindTexture:w,unbindTexture:H,compressedTexImage2D:se,compressedTexImage3D:oe,texImage2D:Re,texImage3D:$e,updateUBOMapping:We,uniformBlockBinding:Ge,texStorage2D:Ie,texStorage3D:pe,texSubImage2D:le,texSubImage3D:De,compressedTexSubImage2D:xe,compressedTexSubImage3D:Se,scissor:ze,viewport:Ee,reset:Ze}}function $A(t,e,n,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new dt,f=new WeakMap;let p;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(N,w){return m?new OffscreenCanvas(N,w):Jl("canvas")}function v(N,w,H){let se=1;const oe=gt(N);if((oe.width>H||oe.height>H)&&(se=H/Math.max(oe.width,oe.height)),se<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const le=Math.floor(se*oe.width),De=Math.floor(se*oe.height);p===void 0&&(p=y(le,De));const xe=w?y(le,De):p;return xe.width=le,xe.height=De,xe.getContext("2d").drawImage(N,0,0,le,De),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+oe.width+"x"+oe.height+") to ("+le+"x"+De+")."),xe}else return"data"in N&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+oe.width+"x"+oe.height+")."),N;return N}function g(N){return N.generateMipmaps&&N.minFilter!==Ln&&N.minFilter!==qn}function d(N){t.generateMipmap(N)}function x(N,w,H,se,oe=!1){if(N!==null){if(t[N]!==void 0)return t[N];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let le=w;if(w===t.RED&&(H===t.FLOAT&&(le=t.R32F),H===t.HALF_FLOAT&&(le=t.R16F),H===t.UNSIGNED_BYTE&&(le=t.R8)),w===t.RED_INTEGER&&(H===t.UNSIGNED_BYTE&&(le=t.R8UI),H===t.UNSIGNED_SHORT&&(le=t.R16UI),H===t.UNSIGNED_INT&&(le=t.R32UI),H===t.BYTE&&(le=t.R8I),H===t.SHORT&&(le=t.R16I),H===t.INT&&(le=t.R32I)),w===t.RG&&(H===t.FLOAT&&(le=t.RG32F),H===t.HALF_FLOAT&&(le=t.RG16F),H===t.UNSIGNED_BYTE&&(le=t.RG8)),w===t.RG_INTEGER&&(H===t.UNSIGNED_BYTE&&(le=t.RG8UI),H===t.UNSIGNED_SHORT&&(le=t.RG16UI),H===t.UNSIGNED_INT&&(le=t.RG32UI),H===t.BYTE&&(le=t.RG8I),H===t.SHORT&&(le=t.RG16I),H===t.INT&&(le=t.RG32I)),w===t.RGB&&H===t.UNSIGNED_INT_5_9_9_9_REV&&(le=t.RGB9_E5),w===t.RGBA){const De=oe?Yl:ft.getTransfer(se);H===t.FLOAT&&(le=t.RGBA32F),H===t.HALF_FLOAT&&(le=t.RGBA16F),H===t.UNSIGNED_BYTE&&(le=De===St?t.SRGB8_ALPHA8:t.RGBA8),H===t.UNSIGNED_SHORT_4_4_4_4&&(le=t.RGBA4),H===t.UNSIGNED_SHORT_5_5_5_1&&(le=t.RGB5_A1)}return(le===t.R16F||le===t.R32F||le===t.RG16F||le===t.RG32F||le===t.RGBA16F||le===t.RGBA32F)&&e.get("EXT_color_buffer_float"),le}function _(N,w){let H;return N?w===null||w===Xs||w===$s?H=t.DEPTH24_STENCIL8:w===Ki?H=t.DEPTH32F_STENCIL8:w===ql&&(H=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Xs||w===$s?H=t.DEPTH_COMPONENT24:w===Ki?H=t.DEPTH_COMPONENT32F:w===ql&&(H=t.DEPTH_COMPONENT16),H}function E(N,w){return g(N)===!0||N.isFramebufferTexture&&N.minFilter!==Ln&&N.minFilter!==qn?Math.log2(Math.max(w.width,w.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?w.mipmaps.length:1}function R(N){const w=N.target;w.removeEventListener("dispose",R),C(w),w.isVideoTexture&&f.delete(w)}function A(N){const w=N.target;w.removeEventListener("dispose",A),S(w)}function C(N){const w=i.get(N);if(w.__webglInit===void 0)return;const H=N.source,se=h.get(H);if(se){const oe=se[w.__cacheKey];oe.usedTimes--,oe.usedTimes===0&&b(N),Object.keys(se).length===0&&h.delete(H)}i.remove(N)}function b(N){const w=i.get(N);t.deleteTexture(w.__webglTexture);const H=N.source,se=h.get(H);delete se[w.__cacheKey],a.memory.textures--}function S(N){const w=i.get(N);if(N.depthTexture&&N.depthTexture.dispose(),N.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(w.__webglFramebuffer[se]))for(let oe=0;oe<w.__webglFramebuffer[se].length;oe++)t.deleteFramebuffer(w.__webglFramebuffer[se][oe]);else t.deleteFramebuffer(w.__webglFramebuffer[se]);w.__webglDepthbuffer&&t.deleteRenderbuffer(w.__webglDepthbuffer[se])}else{if(Array.isArray(w.__webglFramebuffer))for(let se=0;se<w.__webglFramebuffer.length;se++)t.deleteFramebuffer(w.__webglFramebuffer[se]);else t.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&t.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&t.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let se=0;se<w.__webglColorRenderbuffer.length;se++)w.__webglColorRenderbuffer[se]&&t.deleteRenderbuffer(w.__webglColorRenderbuffer[se]);w.__webglDepthRenderbuffer&&t.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const H=N.textures;for(let se=0,oe=H.length;se<oe;se++){const le=i.get(H[se]);le.__webglTexture&&(t.deleteTexture(le.__webglTexture),a.memory.textures--),i.remove(H[se])}i.remove(N)}let M=0;function P(){M=0}function X(){const N=M;return N>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+r.maxTextures),M+=1,N}function j(N){const w=[];return w.push(N.wrapS),w.push(N.wrapT),w.push(N.wrapR||0),w.push(N.magFilter),w.push(N.minFilter),w.push(N.anisotropy),w.push(N.internalFormat),w.push(N.format),w.push(N.type),w.push(N.generateMipmaps),w.push(N.premultiplyAlpha),w.push(N.flipY),w.push(N.unpackAlignment),w.push(N.colorSpace),w.join()}function ne(N,w){const H=i.get(N);if(N.isVideoTexture&&Xe(N),N.isRenderTargetTexture===!1&&N.version>0&&H.__version!==N.version){const se=N.image;if(se===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{tt(H,N,w);return}}n.bindTexture(t.TEXTURE_2D,H.__webglTexture,t.TEXTURE0+w)}function $(N,w){const H=i.get(N);if(N.version>0&&H.__version!==N.version){tt(H,N,w);return}n.bindTexture(t.TEXTURE_2D_ARRAY,H.__webglTexture,t.TEXTURE0+w)}function Z(N,w){const H=i.get(N);if(N.version>0&&H.__version!==N.version){tt(H,N,w);return}n.bindTexture(t.TEXTURE_3D,H.__webglTexture,t.TEXTURE0+w)}function ee(N,w){const H=i.get(N);if(N.version>0&&H.__version!==N.version){q(H,N,w);return}n.bindTexture(t.TEXTURE_CUBE_MAP,H.__webglTexture,t.TEXTURE0+w)}const k={[Wd]:t.REPEAT,[Or]:t.CLAMP_TO_EDGE,[Xd]:t.MIRRORED_REPEAT},ie={[Ln]:t.NEAREST,[CE]:t.NEAREST_MIPMAP_NEAREST,[Io]:t.NEAREST_MIPMAP_LINEAR,[qn]:t.LINEAR,[su]:t.LINEAR_MIPMAP_NEAREST,[Br]:t.LINEAR_MIPMAP_LINEAR},re={[jE]:t.NEVER,[$E]:t.ALWAYS,[HE]:t.LESS,[Jx]:t.LEQUAL,[VE]:t.EQUAL,[XE]:t.GEQUAL,[GE]:t.GREATER,[WE]:t.NOTEQUAL};function ue(N,w){if(w.type===Ki&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===qn||w.magFilter===su||w.magFilter===Io||w.magFilter===Br||w.minFilter===qn||w.minFilter===su||w.minFilter===Io||w.minFilter===Br)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(N,t.TEXTURE_WRAP_S,k[w.wrapS]),t.texParameteri(N,t.TEXTURE_WRAP_T,k[w.wrapT]),(N===t.TEXTURE_3D||N===t.TEXTURE_2D_ARRAY)&&t.texParameteri(N,t.TEXTURE_WRAP_R,k[w.wrapR]),t.texParameteri(N,t.TEXTURE_MAG_FILTER,ie[w.magFilter]),t.texParameteri(N,t.TEXTURE_MIN_FILTER,ie[w.minFilter]),w.compareFunction&&(t.texParameteri(N,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(N,t.TEXTURE_COMPARE_FUNC,re[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Ln||w.minFilter!==Io&&w.minFilter!==Br||w.type===Ki&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||i.get(w).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");t.texParameterf(N,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,r.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy}}}function Pe(N,w){let H=!1;N.__webglInit===void 0&&(N.__webglInit=!0,w.addEventListener("dispose",R));const se=w.source;let oe=h.get(se);oe===void 0&&(oe={},h.set(se,oe));const le=j(w);if(le!==N.__cacheKey){oe[le]===void 0&&(oe[le]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,H=!0),oe[le].usedTimes++;const De=oe[N.__cacheKey];De!==void 0&&(oe[N.__cacheKey].usedTimes--,De.usedTimes===0&&b(w)),N.__cacheKey=le,N.__webglTexture=oe[le].texture}return H}function tt(N,w,H){let se=t.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(se=t.TEXTURE_2D_ARRAY),w.isData3DTexture&&(se=t.TEXTURE_3D);const oe=Pe(N,w),le=w.source;n.bindTexture(se,N.__webglTexture,t.TEXTURE0+H);const De=i.get(le);if(le.version!==De.__version||oe===!0){n.activeTexture(t.TEXTURE0+H);const xe=ft.getPrimaries(ft.workingColorSpace),Se=w.colorSpace===$i?null:ft.getPrimaries(w.colorSpace),Ie=w.colorSpace===$i||xe===Se?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,w.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);let pe=v(w.image,!1,r.maxTextureSize);pe=Ve(w,pe);const Re=s.convert(w.format,w.colorSpace),$e=s.convert(w.type);let ze=x(w.internalFormat,Re,$e,w.colorSpace,w.isVideoTexture);ue(se,w);let Ee;const We=w.mipmaps,Ge=w.isVideoTexture!==!0,Ze=De.__version===void 0||oe===!0,U=le.dataReady,Me=E(w,pe);if(w.isDepthTexture)ze=_(w.format===qs,w.type),Ze&&(Ge?n.texStorage2D(t.TEXTURE_2D,1,ze,pe.width,pe.height):n.texImage2D(t.TEXTURE_2D,0,ze,pe.width,pe.height,0,Re,$e,null));else if(w.isDataTexture)if(We.length>0){Ge&&Ze&&n.texStorage2D(t.TEXTURE_2D,Me,ze,We[0].width,We[0].height);for(let Y=0,Q=We.length;Y<Q;Y++)Ee=We[Y],Ge?U&&n.texSubImage2D(t.TEXTURE_2D,Y,0,0,Ee.width,Ee.height,Re,$e,Ee.data):n.texImage2D(t.TEXTURE_2D,Y,ze,Ee.width,Ee.height,0,Re,$e,Ee.data);w.generateMipmaps=!1}else Ge?(Ze&&n.texStorage2D(t.TEXTURE_2D,Me,ze,pe.width,pe.height),U&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,pe.width,pe.height,Re,$e,pe.data)):n.texImage2D(t.TEXTURE_2D,0,ze,pe.width,pe.height,0,Re,$e,pe.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Ge&&Ze&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Me,ze,We[0].width,We[0].height,pe.depth);for(let Y=0,Q=We.length;Y<Q;Y++)if(Ee=We[Y],w.format!==si)if(Re!==null)if(Ge){if(U)if(w.layerUpdates.size>0){for(const me of w.layerUpdates){const je=Ee.width*Ee.height;n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,Y,0,0,me,Ee.width,Ee.height,1,Re,Ee.data.slice(je*me,je*(me+1)),0,0)}w.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,Y,0,0,0,Ee.width,Ee.height,pe.depth,Re,Ee.data,0,0)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,Y,ze,Ee.width,Ee.height,pe.depth,0,Ee.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ge?U&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,Y,0,0,0,Ee.width,Ee.height,pe.depth,Re,$e,Ee.data):n.texImage3D(t.TEXTURE_2D_ARRAY,Y,ze,Ee.width,Ee.height,pe.depth,0,Re,$e,Ee.data)}else{Ge&&Ze&&n.texStorage2D(t.TEXTURE_2D,Me,ze,We[0].width,We[0].height);for(let Y=0,Q=We.length;Y<Q;Y++)Ee=We[Y],w.format!==si?Re!==null?Ge?U&&n.compressedTexSubImage2D(t.TEXTURE_2D,Y,0,0,Ee.width,Ee.height,Re,Ee.data):n.compressedTexImage2D(t.TEXTURE_2D,Y,ze,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ge?U&&n.texSubImage2D(t.TEXTURE_2D,Y,0,0,Ee.width,Ee.height,Re,$e,Ee.data):n.texImage2D(t.TEXTURE_2D,Y,ze,Ee.width,Ee.height,0,Re,$e,Ee.data)}else if(w.isDataArrayTexture)if(Ge){if(Ze&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Me,ze,pe.width,pe.height,pe.depth),U)if(w.layerUpdates.size>0){let Y;switch($e){case t.UNSIGNED_BYTE:switch(Re){case t.ALPHA:Y=1;break;case t.LUMINANCE:Y=1;break;case t.LUMINANCE_ALPHA:Y=2;break;case t.RGB:Y=3;break;case t.RGBA:Y=4;break;default:throw new Error(`Unknown texel size for format ${Re}.`)}break;case t.UNSIGNED_SHORT_4_4_4_4:case t.UNSIGNED_SHORT_5_5_5_1:case t.UNSIGNED_SHORT_5_6_5:Y=1;break;default:throw new Error(`Unknown texel size for type ${$e}.`)}const Q=pe.width*pe.height*Y;for(const me of w.layerUpdates)n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,me,pe.width,pe.height,1,Re,$e,pe.data.slice(Q*me,Q*(me+1)));w.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,pe.width,pe.height,pe.depth,Re,$e,pe.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,ze,pe.width,pe.height,pe.depth,0,Re,$e,pe.data);else if(w.isData3DTexture)Ge?(Ze&&n.texStorage3D(t.TEXTURE_3D,Me,ze,pe.width,pe.height,pe.depth),U&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,pe.width,pe.height,pe.depth,Re,$e,pe.data)):n.texImage3D(t.TEXTURE_3D,0,ze,pe.width,pe.height,pe.depth,0,Re,$e,pe.data);else if(w.isFramebufferTexture){if(Ze)if(Ge)n.texStorage2D(t.TEXTURE_2D,Me,ze,pe.width,pe.height);else{let Y=pe.width,Q=pe.height;for(let me=0;me<Me;me++)n.texImage2D(t.TEXTURE_2D,me,ze,Y,Q,0,Re,$e,null),Y>>=1,Q>>=1}}else if(We.length>0){if(Ge&&Ze){const Y=gt(We[0]);n.texStorage2D(t.TEXTURE_2D,Me,ze,Y.width,Y.height)}for(let Y=0,Q=We.length;Y<Q;Y++)Ee=We[Y],Ge?U&&n.texSubImage2D(t.TEXTURE_2D,Y,0,0,Re,$e,Ee):n.texImage2D(t.TEXTURE_2D,Y,ze,Re,$e,Ee);w.generateMipmaps=!1}else if(Ge){if(Ze){const Y=gt(pe);n.texStorage2D(t.TEXTURE_2D,Me,ze,Y.width,Y.height)}U&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,Re,$e,pe)}else n.texImage2D(t.TEXTURE_2D,0,ze,Re,$e,pe);g(w)&&d(se),De.__version=le.version,w.onUpdate&&w.onUpdate(w)}N.__version=w.version}function q(N,w,H){if(w.image.length!==6)return;const se=Pe(N,w),oe=w.source;n.bindTexture(t.TEXTURE_CUBE_MAP,N.__webglTexture,t.TEXTURE0+H);const le=i.get(oe);if(oe.version!==le.__version||se===!0){n.activeTexture(t.TEXTURE0+H);const De=ft.getPrimaries(ft.workingColorSpace),xe=w.colorSpace===$i?null:ft.getPrimaries(w.colorSpace),Se=w.colorSpace===$i||De===xe?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,w.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);const Ie=w.isCompressedTexture||w.image[0].isCompressedTexture,pe=w.image[0]&&w.image[0].isDataTexture,Re=[];for(let Q=0;Q<6;Q++)!Ie&&!pe?Re[Q]=v(w.image[Q],!0,r.maxCubemapSize):Re[Q]=pe?w.image[Q].image:w.image[Q],Re[Q]=Ve(w,Re[Q]);const $e=Re[0],ze=s.convert(w.format,w.colorSpace),Ee=s.convert(w.type),We=x(w.internalFormat,ze,Ee,w.colorSpace),Ge=w.isVideoTexture!==!0,Ze=le.__version===void 0||se===!0,U=oe.dataReady;let Me=E(w,$e);ue(t.TEXTURE_CUBE_MAP,w);let Y;if(Ie){Ge&&Ze&&n.texStorage2D(t.TEXTURE_CUBE_MAP,Me,We,$e.width,$e.height);for(let Q=0;Q<6;Q++){Y=Re[Q].mipmaps;for(let me=0;me<Y.length;me++){const je=Y[me];w.format!==si?ze!==null?Ge?U&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,me,0,0,je.width,je.height,ze,je.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,me,We,je.width,je.height,0,je.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ge?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,me,0,0,je.width,je.height,ze,Ee,je.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,me,We,je.width,je.height,0,ze,Ee,je.data)}}}else{if(Y=w.mipmaps,Ge&&Ze){Y.length>0&&Me++;const Q=gt(Re[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,Me,We,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(pe){Ge?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Re[Q].width,Re[Q].height,ze,Ee,Re[Q].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,We,Re[Q].width,Re[Q].height,0,ze,Ee,Re[Q].data);for(let me=0;me<Y.length;me++){const et=Y[me].image[Q].image;Ge?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,me+1,0,0,et.width,et.height,ze,Ee,et.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,me+1,We,et.width,et.height,0,ze,Ee,et.data)}}else{Ge?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,ze,Ee,Re[Q]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,We,ze,Ee,Re[Q]);for(let me=0;me<Y.length;me++){const je=Y[me];Ge?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,me+1,0,0,ze,Ee,je.image[Q]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,me+1,We,ze,Ee,je.image[Q])}}}g(w)&&d(t.TEXTURE_CUBE_MAP),le.__version=oe.version,w.onUpdate&&w.onUpdate(w)}N.__version=w.version}function ae(N,w,H,se,oe,le){const De=s.convert(H.format,H.colorSpace),xe=s.convert(H.type),Se=x(H.internalFormat,De,xe,H.colorSpace);if(!i.get(w).__hasExternalTextures){const pe=Math.max(1,w.width>>le),Re=Math.max(1,w.height>>le);oe===t.TEXTURE_3D||oe===t.TEXTURE_2D_ARRAY?n.texImage3D(oe,le,Se,pe,Re,w.depth,0,De,xe,null):n.texImage2D(oe,le,Se,pe,Re,0,De,xe,null)}n.bindFramebuffer(t.FRAMEBUFFER,N),Ke(w)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,se,oe,i.get(H).__webglTexture,0,Be(w)):(oe===t.TEXTURE_2D||oe>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&oe<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,se,oe,i.get(H).__webglTexture,le),n.bindFramebuffer(t.FRAMEBUFFER,null)}function ve(N,w,H){if(t.bindRenderbuffer(t.RENDERBUFFER,N),w.depthBuffer){const se=w.depthTexture,oe=se&&se.isDepthTexture?se.type:null,le=_(w.stencilBuffer,oe),De=w.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,xe=Be(w);Ke(w)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,xe,le,w.width,w.height):H?t.renderbufferStorageMultisample(t.RENDERBUFFER,xe,le,w.width,w.height):t.renderbufferStorage(t.RENDERBUFFER,le,w.width,w.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,De,t.RENDERBUFFER,N)}else{const se=w.textures;for(let oe=0;oe<se.length;oe++){const le=se[oe],De=s.convert(le.format,le.colorSpace),xe=s.convert(le.type),Se=x(le.internalFormat,De,xe,le.colorSpace),Ie=Be(w);H&&Ke(w)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Ie,Se,w.width,w.height):Ke(w)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Ie,Se,w.width,w.height):t.renderbufferStorage(t.RENDERBUFFER,Se,w.width,w.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function ge(N,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,N),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),ne(w.depthTexture,0);const se=i.get(w.depthTexture).__webglTexture,oe=Be(w);if(w.depthTexture.format===Us)Ke(w)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,se,0,oe):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,se,0);else if(w.depthTexture.format===qs)Ke(w)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,se,0,oe):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function we(N){const w=i.get(N),H=N.isWebGLCubeRenderTarget===!0;if(N.depthTexture&&!w.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");ge(w.__webglFramebuffer,N)}else if(H){w.__webglDepthbuffer=[];for(let se=0;se<6;se++)n.bindFramebuffer(t.FRAMEBUFFER,w.__webglFramebuffer[se]),w.__webglDepthbuffer[se]=t.createRenderbuffer(),ve(w.__webglDepthbuffer[se],N,!1)}else n.bindFramebuffer(t.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer=t.createRenderbuffer(),ve(w.__webglDepthbuffer,N,!1);n.bindFramebuffer(t.FRAMEBUFFER,null)}function ke(N,w,H){const se=i.get(N);w!==void 0&&ae(se.__webglFramebuffer,N,N.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),H!==void 0&&we(N)}function He(N){const w=N.texture,H=i.get(N),se=i.get(w);N.addEventListener("dispose",A);const oe=N.textures,le=N.isWebGLCubeRenderTarget===!0,De=oe.length>1;if(De||(se.__webglTexture===void 0&&(se.__webglTexture=t.createTexture()),se.__version=w.version,a.memory.textures++),le){H.__webglFramebuffer=[];for(let xe=0;xe<6;xe++)if(w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer[xe]=[];for(let Se=0;Se<w.mipmaps.length;Se++)H.__webglFramebuffer[xe][Se]=t.createFramebuffer()}else H.__webglFramebuffer[xe]=t.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer=[];for(let xe=0;xe<w.mipmaps.length;xe++)H.__webglFramebuffer[xe]=t.createFramebuffer()}else H.__webglFramebuffer=t.createFramebuffer();if(De)for(let xe=0,Se=oe.length;xe<Se;xe++){const Ie=i.get(oe[xe]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=t.createTexture(),a.memory.textures++)}if(N.samples>0&&Ke(N)===!1){H.__webglMultisampledFramebuffer=t.createFramebuffer(),H.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let xe=0;xe<oe.length;xe++){const Se=oe[xe];H.__webglColorRenderbuffer[xe]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,H.__webglColorRenderbuffer[xe]);const Ie=s.convert(Se.format,Se.colorSpace),pe=s.convert(Se.type),Re=x(Se.internalFormat,Ie,pe,Se.colorSpace,N.isXRRenderTarget===!0),$e=Be(N);t.renderbufferStorageMultisample(t.RENDERBUFFER,$e,Re,N.width,N.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+xe,t.RENDERBUFFER,H.__webglColorRenderbuffer[xe])}t.bindRenderbuffer(t.RENDERBUFFER,null),N.depthBuffer&&(H.__webglDepthRenderbuffer=t.createRenderbuffer(),ve(H.__webglDepthRenderbuffer,N,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(le){n.bindTexture(t.TEXTURE_CUBE_MAP,se.__webglTexture),ue(t.TEXTURE_CUBE_MAP,w);for(let xe=0;xe<6;xe++)if(w.mipmaps&&w.mipmaps.length>0)for(let Se=0;Se<w.mipmaps.length;Se++)ae(H.__webglFramebuffer[xe][Se],N,w,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Se);else ae(H.__webglFramebuffer[xe],N,w,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0);g(w)&&d(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(De){for(let xe=0,Se=oe.length;xe<Se;xe++){const Ie=oe[xe],pe=i.get(Ie);n.bindTexture(t.TEXTURE_2D,pe.__webglTexture),ue(t.TEXTURE_2D,Ie),ae(H.__webglFramebuffer,N,Ie,t.COLOR_ATTACHMENT0+xe,t.TEXTURE_2D,0),g(Ie)&&d(t.TEXTURE_2D)}n.unbindTexture()}else{let xe=t.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(xe=N.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(xe,se.__webglTexture),ue(xe,w),w.mipmaps&&w.mipmaps.length>0)for(let Se=0;Se<w.mipmaps.length;Se++)ae(H.__webglFramebuffer[Se],N,w,t.COLOR_ATTACHMENT0,xe,Se);else ae(H.__webglFramebuffer,N,w,t.COLOR_ATTACHMENT0,xe,0);g(w)&&d(xe),n.unbindTexture()}N.depthBuffer&&we(N)}function F(N){const w=N.textures;for(let H=0,se=w.length;H<se;H++){const oe=w[H];if(g(oe)){const le=N.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,De=i.get(oe).__webglTexture;n.bindTexture(le,De),d(le),n.unbindTexture()}}}const qe=[],Ye=[];function ct(N){if(N.samples>0){if(Ke(N)===!1){const w=N.textures,H=N.width,se=N.height;let oe=t.COLOR_BUFFER_BIT;const le=N.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,De=i.get(N),xe=w.length>1;if(xe)for(let Se=0;Se<w.length;Se++)n.bindFramebuffer(t.FRAMEBUFFER,De.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,De.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,De.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,De.__webglFramebuffer);for(let Se=0;Se<w.length;Se++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(oe|=t.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(oe|=t.STENCIL_BUFFER_BIT)),xe){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,De.__webglColorRenderbuffer[Se]);const Ie=i.get(w[Se]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Ie,0)}t.blitFramebuffer(0,0,H,se,0,0,H,se,oe,t.NEAREST),c===!0&&(qe.length=0,Ye.length=0,qe.push(t.COLOR_ATTACHMENT0+Se),N.depthBuffer&&N.resolveDepthBuffer===!1&&(qe.push(le),Ye.push(le),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Ye)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,qe))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),xe)for(let Se=0;Se<w.length;Se++){n.bindFramebuffer(t.FRAMEBUFFER,De.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.RENDERBUFFER,De.__webglColorRenderbuffer[Se]);const Ie=i.get(w[Se]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,De.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.TEXTURE_2D,Ie,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,De.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.resolveDepthBuffer===!1&&c){const w=N.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[w])}}}function Be(N){return Math.min(r.maxSamples,N.samples)}function Ke(N){const w=i.get(N);return N.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Xe(N){const w=a.render.frame;f.get(N)!==w&&(f.set(N,w),N.update())}function Ve(N,w){const H=N.colorSpace,se=N.format,oe=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||H!==vr&&H!==$i&&(ft.getTransfer(H)===St?(se!==si||oe!==fr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),w}function gt(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(u.width=N.naturalWidth||N.width,u.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(u.width=N.displayWidth,u.height=N.displayHeight):(u.width=N.width,u.height=N.height),u}this.allocateTextureUnit=X,this.resetTextureUnits=P,this.setTexture2D=ne,this.setTexture2DArray=$,this.setTexture3D=Z,this.setTextureCube=ee,this.rebindTextures=ke,this.setupRenderTarget=He,this.updateRenderTargetMipmap=F,this.updateMultisampleRenderTarget=ct,this.setupDepthRenderbuffer=we,this.setupFrameBufferTexture=ae,this.useMultisampledRTT=Ke}function qA(t,e){function n(i,r=$i){let s;const a=ft.getTransfer(r);if(i===fr)return t.UNSIGNED_BYTE;if(i===qx)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Yx)return t.UNSIGNED_SHORT_5_5_5_1;if(i===RE)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===AE)return t.BYTE;if(i===bE)return t.SHORT;if(i===ql)return t.UNSIGNED_SHORT;if(i===$x)return t.INT;if(i===Xs)return t.UNSIGNED_INT;if(i===Ki)return t.FLOAT;if(i===Ec)return t.HALF_FLOAT;if(i===NE)return t.ALPHA;if(i===PE)return t.RGB;if(i===si)return t.RGBA;if(i===LE)return t.LUMINANCE;if(i===DE)return t.LUMINANCE_ALPHA;if(i===Us)return t.DEPTH_COMPONENT;if(i===qs)return t.DEPTH_STENCIL;if(i===IE)return t.RED;if(i===Kx)return t.RED_INTEGER;if(i===UE)return t.RG;if(i===Zx)return t.RG_INTEGER;if(i===Qx)return t.RGBA_INTEGER;if(i===au||i===ou||i===lu||i===cu)if(a===St)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===au)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ou)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===lu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===cu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===au)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ou)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===lu)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===cu)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ip||i===Up||i===Fp||i===kp)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Ip)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Up)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Fp)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===kp)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Op||i===Bp||i===zp)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Op||i===Bp)return a===St?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===zp)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===jp||i===Hp||i===Vp||i===Gp||i===Wp||i===Xp||i===$p||i===qp||i===Yp||i===Kp||i===Zp||i===Qp||i===Jp||i===em)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===jp)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Hp)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Vp)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Gp)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Wp)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Xp)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===$p)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===qp)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Yp)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Kp)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Zp)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Qp)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Jp)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===em)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===uu||i===tm||i===nm)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===uu)return a===St?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===tm)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===nm)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===FE||i===im||i===rm||i===sm)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===uu)return s.COMPRESSED_RED_RGTC1_EXT;if(i===im)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===rm)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===sm)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===$s?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}class YA extends Nn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class nl extends gn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const KA={type:"move"};class ku{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new nl,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new nl,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new nl,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,u=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(u&&e.hand){a=!0;for(const v of e.hand.values()){const g=n.getJointPose(v,i),d=this._getHandJoint(u,v);g!==null&&(d.matrix.fromArray(g.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=g.radius),d.visible=g!==null}const f=u.joints["index-finger-tip"],p=u.joints["thumb-tip"],h=f.position.distanceTo(p.position),m=.02,y=.005;u.inputState.pinching&&h>m+y?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&h<=m-y&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(KA)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),u!==null&&(u.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new nl;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const ZA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,QA=`
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

}`;class JA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new mn,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new hr({vertexShader:ZA,fragmentShader:QA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ei(new Cc(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}}class eb extends ta{constructor(e,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,u=null,f=null,p=null,h=null,m=null,y=null;const v=new JA,g=n.getContextAttributes();let d=null,x=null;const _=[],E=[],R=new dt;let A=null;const C=new Nn;C.layers.enable(1),C.viewport=new Wt;const b=new Nn;b.layers.enable(2),b.viewport=new Wt;const S=[C,b],M=new YA;M.layers.enable(1),M.layers.enable(2);let P=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let ae=_[q];return ae===void 0&&(ae=new ku,_[q]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(q){let ae=_[q];return ae===void 0&&(ae=new ku,_[q]=ae),ae.getGripSpace()},this.getHand=function(q){let ae=_[q];return ae===void 0&&(ae=new ku,_[q]=ae),ae.getHandSpace()};function j(q){const ae=E.indexOf(q.inputSource);if(ae===-1)return;const ve=_[ae];ve!==void 0&&(ve.update(q.inputSource,q.frame,u||a),ve.dispatchEvent({type:q.type,data:q.inputSource}))}function ne(){r.removeEventListener("select",j),r.removeEventListener("selectstart",j),r.removeEventListener("selectend",j),r.removeEventListener("squeeze",j),r.removeEventListener("squeezestart",j),r.removeEventListener("squeezeend",j),r.removeEventListener("end",ne),r.removeEventListener("inputsourceschange",$);for(let q=0;q<_.length;q++){const ae=E[q];ae!==null&&(E[q]=null,_[q].disconnect(ae))}P=null,X=null,v.reset(),e.setRenderTarget(d),m=null,h=null,p=null,r=null,x=null,tt.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||a},this.setReferenceSpace=function(q){u=q},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return p},this.getFrame=function(){return y},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(d=e.getRenderTarget(),r.addEventListener("select",j),r.addEventListener("selectstart",j),r.addEventListener("selectend",j),r.addEventListener("squeeze",j),r.addEventListener("squeezestart",j),r.addEventListener("squeezeend",j),r.addEventListener("end",ne),r.addEventListener("inputsourceschange",$),g.xrCompatible!==!0&&await n.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(R),r.renderState.layers===void 0){const ae={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,n,ae),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),x=new $r(m.framebufferWidth,m.framebufferHeight,{format:si,type:fr,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let ae=null,ve=null,ge=null;g.depth&&(ge=g.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ae=g.stencil?qs:Us,ve=g.stencil?$s:Xs);const we={colorFormat:n.RGBA8,depthFormat:ge,scaleFactor:s};p=new XRWebGLBinding(r,n),h=p.createProjectionLayer(we),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),x=new $r(h.textureWidth,h.textureHeight,{format:si,type:fr,depthTexture:new m0(h.textureWidth,h.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),u=null,a=await r.requestReferenceSpace(o),tt.setContext(r),tt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function $(q){for(let ae=0;ae<q.removed.length;ae++){const ve=q.removed[ae],ge=E.indexOf(ve);ge>=0&&(E[ge]=null,_[ge].disconnect(ve))}for(let ae=0;ae<q.added.length;ae++){const ve=q.added[ae];let ge=E.indexOf(ve);if(ge===-1){for(let ke=0;ke<_.length;ke++)if(ke>=E.length){E.push(ve),ge=ke;break}else if(E[ke]===null){E[ke]=ve,ge=ke;break}if(ge===-1)break}const we=_[ge];we&&we.connect(ve)}}const Z=new G,ee=new G;function k(q,ae,ve){Z.setFromMatrixPosition(ae.matrixWorld),ee.setFromMatrixPosition(ve.matrixWorld);const ge=Z.distanceTo(ee),we=ae.projectionMatrix.elements,ke=ve.projectionMatrix.elements,He=we[14]/(we[10]-1),F=we[14]/(we[10]+1),qe=(we[9]+1)/we[5],Ye=(we[9]-1)/we[5],ct=(we[8]-1)/we[0],Be=(ke[8]+1)/ke[0],Ke=He*ct,Xe=He*Be,Ve=ge/(-ct+Be),gt=Ve*-ct;ae.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(gt),q.translateZ(Ve),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert();const N=He+Ve,w=F+Ve,H=Ke-gt,se=Xe+(ge-gt),oe=qe*F/w*N,le=Ye*F/w*N;q.projectionMatrix.makePerspective(H,se,oe,le,N,w),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}function ie(q,ae){ae===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(ae.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;v.texture!==null&&(q.near=v.depthNear,q.far=v.depthFar),M.near=b.near=C.near=q.near,M.far=b.far=C.far=q.far,(P!==M.near||X!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),P=M.near,X=M.far,C.near=P,C.far=X,b.near=P,b.far=X,C.updateProjectionMatrix(),b.updateProjectionMatrix(),q.updateProjectionMatrix());const ae=q.parent,ve=M.cameras;ie(M,ae);for(let ge=0;ge<ve.length;ge++)ie(ve[ge],ae);ve.length===2?k(M,C,b):M.projectionMatrix.copy(C.projectionMatrix),re(q,M,ae)};function re(q,ae,ve){ve===null?q.matrix.copy(ae.matrixWorld):(q.matrix.copy(ve.matrixWorld),q.matrix.invert(),q.matrix.multiply(ae.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(ae.projectionMatrix),q.projectionMatrixInverse.copy(ae.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=$d*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(h===null&&m===null))return c},this.setFoveation=function(q){c=q,h!==null&&(h.fixedFoveation=q),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=q)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let ue=null;function Pe(q,ae){if(f=ae.getViewerPose(u||a),y=ae,f!==null){const ve=f.views;m!==null&&(e.setRenderTargetFramebuffer(x,m.framebuffer),e.setRenderTarget(x));let ge=!1;ve.length!==M.cameras.length&&(M.cameras.length=0,ge=!0);for(let ke=0;ke<ve.length;ke++){const He=ve[ke];let F=null;if(m!==null)F=m.getViewport(He);else{const Ye=p.getViewSubImage(h,He);F=Ye.viewport,ke===0&&(e.setRenderTargetTextures(x,Ye.colorTexture,h.ignoreDepthValues?void 0:Ye.depthStencilTexture),e.setRenderTarget(x))}let qe=S[ke];qe===void 0&&(qe=new Nn,qe.layers.enable(ke),qe.viewport=new Wt,S[ke]=qe),qe.matrix.fromArray(He.transform.matrix),qe.matrix.decompose(qe.position,qe.quaternion,qe.scale),qe.projectionMatrix.fromArray(He.projectionMatrix),qe.projectionMatrixInverse.copy(qe.projectionMatrix).invert(),qe.viewport.set(F.x,F.y,F.width,F.height),ke===0&&(M.matrix.copy(qe.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ge===!0&&M.cameras.push(qe)}const we=r.enabledFeatures;if(we&&we.includes("depth-sensing")){const ke=p.getDepthInformation(ve[0]);ke&&ke.isValid&&ke.texture&&v.init(e,ke,r.renderState)}}for(let ve=0;ve<_.length;ve++){const ge=E[ve],we=_[ve];ge!==null&&we!==void 0&&we.update(ge,ae,u||a)}ue&&ue(q,ae),ae.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ae}),y=null}const tt=new p0;tt.setAnimationLoop(Pe),this.setAnimationLoop=function(q){ue=q},this.dispose=function(){}}}const Cr=new Ni,tb=new Ut;function nb(t,e){function n(g,d){g.matrixAutoUpdate===!0&&g.updateMatrix(),d.value.copy(g.matrix)}function i(g,d){d.color.getRGB(g.fogColor.value,u0(t)),d.isFog?(g.fogNear.value=d.near,g.fogFar.value=d.far):d.isFogExp2&&(g.fogDensity.value=d.density)}function r(g,d,x,_,E){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(g,d):d.isMeshToonMaterial?(s(g,d),p(g,d)):d.isMeshPhongMaterial?(s(g,d),f(g,d)):d.isMeshStandardMaterial?(s(g,d),h(g,d),d.isMeshPhysicalMaterial&&m(g,d,E)):d.isMeshMatcapMaterial?(s(g,d),y(g,d)):d.isMeshDepthMaterial?s(g,d):d.isMeshDistanceMaterial?(s(g,d),v(g,d)):d.isMeshNormalMaterial?s(g,d):d.isLineBasicMaterial?(a(g,d),d.isLineDashedMaterial&&o(g,d)):d.isPointsMaterial?c(g,d,x,_):d.isSpriteMaterial?u(g,d):d.isShadowMaterial?(g.color.value.copy(d.color),g.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(g,d){g.opacity.value=d.opacity,d.color&&g.diffuse.value.copy(d.color),d.emissive&&g.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(g.map.value=d.map,n(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.bumpMap&&(g.bumpMap.value=d.bumpMap,n(d.bumpMap,g.bumpMapTransform),g.bumpScale.value=d.bumpScale,d.side===pn&&(g.bumpScale.value*=-1)),d.normalMap&&(g.normalMap.value=d.normalMap,n(d.normalMap,g.normalMapTransform),g.normalScale.value.copy(d.normalScale),d.side===pn&&g.normalScale.value.negate()),d.displacementMap&&(g.displacementMap.value=d.displacementMap,n(d.displacementMap,g.displacementMapTransform),g.displacementScale.value=d.displacementScale,g.displacementBias.value=d.displacementBias),d.emissiveMap&&(g.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,g.emissiveMapTransform)),d.specularMap&&(g.specularMap.value=d.specularMap,n(d.specularMap,g.specularMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest);const x=e.get(d),_=x.envMap,E=x.envMapRotation;_&&(g.envMap.value=_,Cr.copy(E),Cr.x*=-1,Cr.y*=-1,Cr.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Cr.y*=-1,Cr.z*=-1),g.envMapRotation.value.setFromMatrix4(tb.makeRotationFromEuler(Cr)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=d.reflectivity,g.ior.value=d.ior,g.refractionRatio.value=d.refractionRatio),d.lightMap&&(g.lightMap.value=d.lightMap,g.lightMapIntensity.value=d.lightMapIntensity,n(d.lightMap,g.lightMapTransform)),d.aoMap&&(g.aoMap.value=d.aoMap,g.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,g.aoMapTransform))}function a(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,d.map&&(g.map.value=d.map,n(d.map,g.mapTransform))}function o(g,d){g.dashSize.value=d.dashSize,g.totalSize.value=d.dashSize+d.gapSize,g.scale.value=d.scale}function c(g,d,x,_){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.size.value=d.size*x,g.scale.value=_*.5,d.map&&(g.map.value=d.map,n(d.map,g.uvTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function u(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.rotation.value=d.rotation,d.map&&(g.map.value=d.map,n(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function f(g,d){g.specular.value.copy(d.specular),g.shininess.value=Math.max(d.shininess,1e-4)}function p(g,d){d.gradientMap&&(g.gradientMap.value=d.gradientMap)}function h(g,d){g.metalness.value=d.metalness,d.metalnessMap&&(g.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,g.metalnessMapTransform)),g.roughness.value=d.roughness,d.roughnessMap&&(g.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,g.roughnessMapTransform)),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)}function m(g,d,x){g.ior.value=d.ior,d.sheen>0&&(g.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),g.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(g.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,g.sheenColorMapTransform)),d.sheenRoughnessMap&&(g.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,g.sheenRoughnessMapTransform))),d.clearcoat>0&&(g.clearcoat.value=d.clearcoat,g.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(g.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,g.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(g.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===pn&&g.clearcoatNormalScale.value.negate())),d.dispersion>0&&(g.dispersion.value=d.dispersion),d.iridescence>0&&(g.iridescence.value=d.iridescence,g.iridescenceIOR.value=d.iridescenceIOR,g.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(g.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,g.iridescenceMapTransform)),d.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),d.transmission>0&&(g.transmission.value=d.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),d.transmissionMap&&(g.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,g.transmissionMapTransform)),g.thickness.value=d.thickness,d.thicknessMap&&(g.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=d.attenuationDistance,g.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(g.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(g.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=d.specularIntensity,g.specularColor.value.copy(d.specularColor),d.specularColorMap&&(g.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,g.specularColorMapTransform)),d.specularIntensityMap&&(g.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,g.specularIntensityMapTransform))}function y(g,d){d.matcap&&(g.matcap.value=d.matcap)}function v(g,d){const x=e.get(d).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function ib(t,e,n,i){let r={},s={},a=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,_){const E=_.program;i.uniformBlockBinding(x,E)}function u(x,_){let E=r[x.id];E===void 0&&(y(x),E=f(x),r[x.id]=E,x.addEventListener("dispose",g));const R=_.program;i.updateUBOMapping(x,R);const A=e.render.frame;s[x.id]!==A&&(h(x),s[x.id]=A)}function f(x){const _=p();x.__bindingPointIndex=_;const E=t.createBuffer(),R=x.__size,A=x.usage;return t.bindBuffer(t.UNIFORM_BUFFER,E),t.bufferData(t.UNIFORM_BUFFER,R,A),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,_,E),E}function p(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){const _=r[x.id],E=x.uniforms,R=x.__cache;t.bindBuffer(t.UNIFORM_BUFFER,_);for(let A=0,C=E.length;A<C;A++){const b=Array.isArray(E[A])?E[A]:[E[A]];for(let S=0,M=b.length;S<M;S++){const P=b[S];if(m(P,A,S,R)===!0){const X=P.__offset,j=Array.isArray(P.value)?P.value:[P.value];let ne=0;for(let $=0;$<j.length;$++){const Z=j[$],ee=v(Z);typeof Z=="number"||typeof Z=="boolean"?(P.__data[0]=Z,t.bufferSubData(t.UNIFORM_BUFFER,X+ne,P.__data)):Z.isMatrix3?(P.__data[0]=Z.elements[0],P.__data[1]=Z.elements[1],P.__data[2]=Z.elements[2],P.__data[3]=0,P.__data[4]=Z.elements[3],P.__data[5]=Z.elements[4],P.__data[6]=Z.elements[5],P.__data[7]=0,P.__data[8]=Z.elements[6],P.__data[9]=Z.elements[7],P.__data[10]=Z.elements[8],P.__data[11]=0):(Z.toArray(P.__data,ne),ne+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,X,P.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function m(x,_,E,R){const A=x.value,C=_+"_"+E;if(R[C]===void 0)return typeof A=="number"||typeof A=="boolean"?R[C]=A:R[C]=A.clone(),!0;{const b=R[C];if(typeof A=="number"||typeof A=="boolean"){if(b!==A)return R[C]=A,!0}else if(b.equals(A)===!1)return b.copy(A),!0}return!1}function y(x){const _=x.uniforms;let E=0;const R=16;for(let C=0,b=_.length;C<b;C++){const S=Array.isArray(_[C])?_[C]:[_[C]];for(let M=0,P=S.length;M<P;M++){const X=S[M],j=Array.isArray(X.value)?X.value:[X.value];for(let ne=0,$=j.length;ne<$;ne++){const Z=j[ne],ee=v(Z),k=E%R;k!==0&&R-k<ee.boundary&&(E+=R-k),X.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=E,E+=ee.storage}}}const A=E%R;return A>0&&(E+=R-A),x.__size=E,x.__cache={},this}function v(x){const _={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(_.boundary=4,_.storage=4):x.isVector2?(_.boundary=8,_.storage=8):x.isVector3||x.isColor?(_.boundary=16,_.storage=12):x.isVector4?(_.boundary=16,_.storage=16):x.isMatrix3?(_.boundary=48,_.storage=48):x.isMatrix4?(_.boundary=64,_.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),_}function g(x){const _=x.target;_.removeEventListener("dispose",g);const E=a.indexOf(_.__bindingPointIndex);a.splice(E,1),t.deleteBuffer(r[_.id]),delete r[_.id],delete s[_.id]}function d(){for(const x in r)t.deleteBuffer(r[x]);a=[],r={},s={}}return{bind:c,update:u,dispose:d}}class rb{constructor(e={}){const{canvas:n=YE(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:u=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:p=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=a;const m=new Uint32Array(4),y=new Int32Array(4);let v=null,g=null;const d=[],x=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ti,this.toneMapping=or,this.toneMappingExposure=1;const _=this;let E=!1,R=0,A=0,C=null,b=-1,S=null;const M=new Wt,P=new Wt;let X=null;const j=new ht(0);let ne=0,$=n.width,Z=n.height,ee=1,k=null,ie=null;const re=new Wt(0,0,$,Z),ue=new Wt(0,0,$,Z);let Pe=!1;const tt=new h0;let q=!1,ae=!1;const ve=new Ut,ge=new G,we={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ke=!1;function He(){return C===null?ee:1}let F=i;function qe(T,B){return n.getContext(T,B)}try{const T={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:u,powerPreference:f,failIfMajorPerformanceCaveat:p};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${rh}`),n.addEventListener("webglcontextlost",Me,!1),n.addEventListener("webglcontextrestored",Y,!1),n.addEventListener("webglcontextcreationerror",Q,!1),F===null){const B="webgl2";if(F=qe(B,T),F===null)throw qe(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Ye,ct,Be,Ke,Xe,Ve,gt,N,w,H,se,oe,le,De,xe,Se,Ie,pe,Re,$e,ze,Ee,We,Ge;function Ze(){Ye=new fC(F),Ye.init(),Ee=new qA(F,Ye),ct=new sC(F,Ye,e,Ee),Be=new XA(F),Ke=new mC(F),Xe=new LA,Ve=new $A(F,Ye,Be,Xe,ct,Ee,Ke),gt=new oC(_),N=new dC(_),w=new S1(F),We=new iC(F,w),H=new hC(F,w,Ke,We),se=new vC(F,H,w,Ke),Re=new gC(F,ct,Ve),Se=new aC(Xe),oe=new PA(_,gt,N,Ye,ct,We,Se),le=new nb(_,Xe),De=new IA,xe=new zA(Ye),pe=new nC(_,gt,N,Be,se,h,c),Ie=new WA(_,se,ct),Ge=new ib(F,Ke,ct,Be),$e=new rC(F,Ye,Ke),ze=new pC(F,Ye,Ke),Ke.programs=oe.programs,_.capabilities=ct,_.extensions=Ye,_.properties=Xe,_.renderLists=De,_.shadowMap=Ie,_.state=Be,_.info=Ke}Ze();const U=new eb(_,F);this.xr=U,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const T=Ye.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Ye.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(T){T!==void 0&&(ee=T,this.setSize($,Z,!1))},this.getSize=function(T){return T.set($,Z)},this.setSize=function(T,B,z=!0){if(U.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=T,Z=B,n.width=Math.floor(T*ee),n.height=Math.floor(B*ee),z===!0&&(n.style.width=T+"px",n.style.height=B+"px"),this.setViewport(0,0,T,B)},this.getDrawingBufferSize=function(T){return T.set($*ee,Z*ee).floor()},this.setDrawingBufferSize=function(T,B,z){$=T,Z=B,ee=z,n.width=Math.floor(T*z),n.height=Math.floor(B*z),this.setViewport(0,0,T,B)},this.getCurrentViewport=function(T){return T.copy(M)},this.getViewport=function(T){return T.copy(re)},this.setViewport=function(T,B,z,O){T.isVector4?re.set(T.x,T.y,T.z,T.w):re.set(T,B,z,O),Be.viewport(M.copy(re).multiplyScalar(ee).round())},this.getScissor=function(T){return T.copy(ue)},this.setScissor=function(T,B,z,O){T.isVector4?ue.set(T.x,T.y,T.z,T.w):ue.set(T,B,z,O),Be.scissor(P.copy(ue).multiplyScalar(ee).round())},this.getScissorTest=function(){return Pe},this.setScissorTest=function(T){Be.setScissorTest(Pe=T)},this.setOpaqueSort=function(T){k=T},this.setTransparentSort=function(T){ie=T},this.getClearColor=function(T){return T.copy(pe.getClearColor())},this.setClearColor=function(){pe.setClearColor.apply(pe,arguments)},this.getClearAlpha=function(){return pe.getClearAlpha()},this.setClearAlpha=function(){pe.setClearAlpha.apply(pe,arguments)},this.clear=function(T=!0,B=!0,z=!0){let O=0;if(T){let D=!1;if(C!==null){const te=C.texture.format;D=te===Qx||te===Zx||te===Kx}if(D){const te=C.texture.type,I=te===fr||te===Xs||te===ql||te===$s||te===qx||te===Yx,W=pe.getClearColor(),J=pe.getClearAlpha(),de=W.r,be=W.g,Ae=W.b;I?(m[0]=de,m[1]=be,m[2]=Ae,m[3]=J,F.clearBufferuiv(F.COLOR,0,m)):(y[0]=de,y[1]=be,y[2]=Ae,y[3]=J,F.clearBufferiv(F.COLOR,0,y))}else O|=F.COLOR_BUFFER_BIT}B&&(O|=F.DEPTH_BUFFER_BIT),z&&(O|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Me,!1),n.removeEventListener("webglcontextrestored",Y,!1),n.removeEventListener("webglcontextcreationerror",Q,!1),De.dispose(),xe.dispose(),Xe.dispose(),gt.dispose(),N.dispose(),se.dispose(),We.dispose(),Ge.dispose(),oe.dispose(),U.dispose(),U.removeEventListener("sessionstart",V),U.removeEventListener("sessionend",ce),fe.stop()};function Me(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function Y(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const T=Ke.autoReset,B=Ie.enabled,z=Ie.autoUpdate,O=Ie.needsUpdate,D=Ie.type;Ze(),Ke.autoReset=T,Ie.enabled=B,Ie.autoUpdate=z,Ie.needsUpdate=O,Ie.type=D}function Q(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function me(T){const B=T.target;B.removeEventListener("dispose",me),je(B)}function je(T){et(T),Xe.remove(T)}function et(T){const B=Xe.get(T).programs;B!==void 0&&(B.forEach(function(z){oe.releaseProgram(z)}),T.isShaderMaterial&&oe.releaseShaderCache(T))}this.renderBufferDirect=function(T,B,z,O,D,te){B===null&&(B=we);const I=D.isMesh&&D.matrixWorld.determinant()<0,W=ci(T,B,z,O,D);Be.setMaterial(O,I);let J=z.index,de=1;if(O.wireframe===!0){if(J=H.getWireframeAttribute(z),J===void 0)return;de=2}const be=z.drawRange,Ae=z.attributes.position;let Le=be.start*de,rt=(be.start+be.count)*de;te!==null&&(Le=Math.max(Le,te.start*de),rt=Math.min(rt,(te.start+te.count)*de)),J!==null?(Le=Math.max(Le,0),rt=Math.min(rt,J.count)):Ae!=null&&(Le=Math.max(Le,0),rt=Math.min(rt,Ae.count));const st=rt-Le;if(st<0||st===1/0)return;We.setup(D,O,W,z,J);let Et,nt=$e;if(J!==null&&(Et=w.get(J),nt=ze,nt.setIndex(Et)),D.isMesh)O.wireframe===!0?(Be.setLineWidth(O.wireframeLinewidth*He()),nt.setMode(F.LINES)):nt.setMode(F.TRIANGLES);else if(D.isLine){let Fe=O.linewidth;Fe===void 0&&(Fe=1),Be.setLineWidth(Fe*He()),D.isLineSegments?nt.setMode(F.LINES):D.isLineLoop?nt.setMode(F.LINE_LOOP):nt.setMode(F.LINE_STRIP)}else D.isPoints?nt.setMode(F.POINTS):D.isSprite&&nt.setMode(F.TRIANGLES);if(D.isBatchedMesh)D._multiDrawInstances!==null?nt.renderMultiDrawInstances(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount,D._multiDrawInstances):nt.renderMultiDraw(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount);else if(D.isInstancedMesh)nt.renderInstances(Le,st,D.count);else if(z.isInstancedBufferGeometry){const Fe=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,mt=Math.min(z.instanceCount,Fe);nt.renderInstances(Le,st,mt)}else nt.render(Le,st)};function ut(T,B,z){T.transparent===!0&&T.side===xi&&T.forceSinglePass===!1?(T.side=pn,T.needsUpdate=!0,Ue(T,B,z),T.side=dr,T.needsUpdate=!0,Ue(T,B,z),T.side=xi):Ue(T,B,z)}this.compile=function(T,B,z=null){z===null&&(z=T),g=xe.get(z),g.init(B),x.push(g),z.traverseVisible(function(D){D.isLight&&D.layers.test(B.layers)&&(g.pushLight(D),D.castShadow&&g.pushShadow(D))}),T!==z&&T.traverseVisible(function(D){D.isLight&&D.layers.test(B.layers)&&(g.pushLight(D),D.castShadow&&g.pushShadow(D))}),g.setupLights();const O=new Set;return T.traverse(function(D){const te=D.material;if(te)if(Array.isArray(te))for(let I=0;I<te.length;I++){const W=te[I];ut(W,z,D),O.add(W)}else ut(te,z,D),O.add(te)}),x.pop(),g=null,O},this.compileAsync=function(T,B,z=null){const O=this.compile(T,B,z);return new Promise(D=>{function te(){if(O.forEach(function(I){Xe.get(I).currentProgram.isReady()&&O.delete(I)}),O.size===0){D(T);return}setTimeout(te,10)}Ye.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let _t=null;function at(T){_t&&_t(T)}function V(){fe.stop()}function ce(){fe.start()}const fe=new p0;fe.setAnimationLoop(at),typeof self<"u"&&fe.setContext(self),this.setAnimationLoop=function(T){_t=T,U.setAnimationLoop(T),T===null?fe.stop():fe.start()},U.addEventListener("sessionstart",V),U.addEventListener("sessionend",ce),this.render=function(T,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),U.enabled===!0&&U.isPresenting===!0&&(U.cameraAutoUpdate===!0&&U.updateCamera(B),B=U.getCamera()),T.isScene===!0&&T.onBeforeRender(_,T,B,C),g=xe.get(T,x.length),g.init(B),x.push(g),ve.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),tt.setFromProjectionMatrix(ve),ae=this.localClippingEnabled,q=Se.init(this.clippingPlanes,ae),v=De.get(T,d.length),v.init(),d.push(v),U.enabled===!0&&U.isPresenting===!0){const te=_.xr.getDepthSensingMesh();te!==null&&_e(te,B,-1/0,_.sortObjects)}_e(T,B,0,_.sortObjects),v.finish(),_.sortObjects===!0&&v.sort(k,ie),ke=U.enabled===!1||U.isPresenting===!1||U.hasDepthSensing()===!1,ke&&pe.addToRenderList(v,T),this.info.render.frame++,q===!0&&Se.beginShadows();const z=g.state.shadowsArray;Ie.render(z,T,B),q===!0&&Se.endShadows(),this.info.autoReset===!0&&this.info.reset();const O=v.opaque,D=v.transmissive;if(g.setupLights(),B.isArrayCamera){const te=B.cameras;if(D.length>0)for(let I=0,W=te.length;I<W;I++){const J=te[I];Ce(O,D,T,J)}ke&&pe.render(T);for(let I=0,W=te.length;I<W;I++){const J=te[I];Oe(v,T,J,J.viewport)}}else D.length>0&&Ce(O,D,T,B),ke&&pe.render(T),Oe(v,T,B);C!==null&&(Ve.updateMultisampleRenderTarget(C),Ve.updateRenderTargetMipmap(C)),T.isScene===!0&&T.onAfterRender(_,T,B),We.resetDefaultState(),b=-1,S=null,x.pop(),x.length>0?(g=x[x.length-1],q===!0&&Se.setGlobalState(_.clippingPlanes,g.state.camera)):g=null,d.pop(),d.length>0?v=d[d.length-1]:v=null};function _e(T,B,z,O){if(T.visible===!1)return;if(T.layers.test(B.layers)){if(T.isGroup)z=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(B);else if(T.isLight)g.pushLight(T),T.castShadow&&g.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||tt.intersectsSprite(T)){O&&ge.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ve);const I=se.update(T),W=T.material;W.visible&&v.push(T,I,W,z,ge.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||tt.intersectsObject(T))){const I=se.update(T),W=T.material;if(O&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),ge.copy(T.boundingSphere.center)):(I.boundingSphere===null&&I.computeBoundingSphere(),ge.copy(I.boundingSphere.center)),ge.applyMatrix4(T.matrixWorld).applyMatrix4(ve)),Array.isArray(W)){const J=I.groups;for(let de=0,be=J.length;de<be;de++){const Ae=J[de],Le=W[Ae.materialIndex];Le&&Le.visible&&v.push(T,I,Le,z,ge.z,Ae)}}else W.visible&&v.push(T,I,W,z,ge.z,null)}}const te=T.children;for(let I=0,W=te.length;I<W;I++)_e(te[I],B,z,O)}function Oe(T,B,z,O){const D=T.opaque,te=T.transmissive,I=T.transparent;g.setupLightsView(z),q===!0&&Se.setGlobalState(_.clippingPlanes,z),O&&Be.viewport(M.copy(O)),D.length>0&&ye(D,B,z),te.length>0&&ye(te,B,z),I.length>0&&ye(I,B,z),Be.buffers.depth.setTest(!0),Be.buffers.depth.setMask(!0),Be.buffers.color.setMask(!0),Be.setPolygonOffset(!1)}function Ce(T,B,z,O){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[O.id]===void 0&&(g.state.transmissionRenderTarget[O.id]=new $r(1,1,{generateMipmaps:!0,type:Ye.has("EXT_color_buffer_half_float")||Ye.has("EXT_color_buffer_float")?Ec:fr,minFilter:Br,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ft.workingColorSpace}));const te=g.state.transmissionRenderTarget[O.id],I=O.viewport||M;te.setSize(I.z,I.w);const W=_.getRenderTarget();_.setRenderTarget(te),_.getClearColor(j),ne=_.getClearAlpha(),ne<1&&_.setClearColor(16777215,.5),ke?pe.render(z):_.clear();const J=_.toneMapping;_.toneMapping=or;const de=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),g.setupLightsView(O),q===!0&&Se.setGlobalState(_.clippingPlanes,O),ye(T,z,O),Ve.updateMultisampleRenderTarget(te),Ve.updateRenderTargetMipmap(te),Ye.has("WEBGL_multisampled_render_to_texture")===!1){let be=!1;for(let Ae=0,Le=B.length;Ae<Le;Ae++){const rt=B[Ae],st=rt.object,Et=rt.geometry,nt=rt.material,Fe=rt.group;if(nt.side===xi&&st.layers.test(O.layers)){const mt=nt.side;nt.side=pn,nt.needsUpdate=!0,K(st,z,O,Et,nt,Fe),nt.side=mt,nt.needsUpdate=!0,be=!0}}be===!0&&(Ve.updateMultisampleRenderTarget(te),Ve.updateRenderTargetMipmap(te))}_.setRenderTarget(W),_.setClearColor(j,ne),de!==void 0&&(O.viewport=de),_.toneMapping=J}function ye(T,B,z){const O=B.isScene===!0?B.overrideMaterial:null;for(let D=0,te=T.length;D<te;D++){const I=T[D],W=I.object,J=I.geometry,de=O===null?I.material:O,be=I.group;W.layers.test(z.layers)&&K(W,B,z,J,de,be)}}function K(T,B,z,O,D,te){T.onBeforeRender(_,B,z,O,D,te),T.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),D.onBeforeRender(_,B,z,O,T,te),D.transparent===!0&&D.side===xi&&D.forceSinglePass===!1?(D.side=pn,D.needsUpdate=!0,_.renderBufferDirect(z,B,O,D,T,te),D.side=dr,D.needsUpdate=!0,_.renderBufferDirect(z,B,O,D,T,te),D.side=xi):_.renderBufferDirect(z,B,O,D,T,te),T.onAfterRender(_,B,z,O,D,te)}function Ue(T,B,z){B.isScene!==!0&&(B=we);const O=Xe.get(T),D=g.state.lights,te=g.state.shadowsArray,I=D.state.version,W=oe.getParameters(T,D.state,te,B,z),J=oe.getProgramCacheKey(W);let de=O.programs;O.environment=T.isMeshStandardMaterial?B.environment:null,O.fog=B.fog,O.envMap=(T.isMeshStandardMaterial?N:gt).get(T.envMap||O.environment),O.envMapRotation=O.environment!==null&&T.envMap===null?B.environmentRotation:T.envMapRotation,de===void 0&&(T.addEventListener("dispose",me),de=new Map,O.programs=de);let be=de.get(J);if(be!==void 0){if(O.currentProgram===be&&O.lightsStateVersion===I)return Lt(T,W),be}else W.uniforms=oe.getUniforms(T),T.onBuild(z,W,_),T.onBeforeCompile(W,_),be=oe.acquireProgram(W,J),de.set(J,be),O.uniforms=W.uniforms;const Ae=O.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ae.clippingPlanes=Se.uniform),Lt(T,W),O.needsLights=Tn(T),O.lightsStateVersion=I,O.needsLights&&(Ae.ambientLightColor.value=D.state.ambient,Ae.lightProbe.value=D.state.probe,Ae.directionalLights.value=D.state.directional,Ae.directionalLightShadows.value=D.state.directionalShadow,Ae.spotLights.value=D.state.spot,Ae.spotLightShadows.value=D.state.spotShadow,Ae.rectAreaLights.value=D.state.rectArea,Ae.ltc_1.value=D.state.rectAreaLTC1,Ae.ltc_2.value=D.state.rectAreaLTC2,Ae.pointLights.value=D.state.point,Ae.pointLightShadows.value=D.state.pointShadow,Ae.hemisphereLights.value=D.state.hemi,Ae.directionalShadowMap.value=D.state.directionalShadowMap,Ae.directionalShadowMatrix.value=D.state.directionalShadowMatrix,Ae.spotShadowMap.value=D.state.spotShadowMap,Ae.spotLightMatrix.value=D.state.spotLightMatrix,Ae.spotLightMap.value=D.state.spotLightMap,Ae.pointShadowMap.value=D.state.pointShadowMap,Ae.pointShadowMatrix.value=D.state.pointShadowMatrix),O.currentProgram=be,O.uniformsList=null,be}function vt(T){if(T.uniformsList===null){const B=T.currentProgram.getUniforms();T.uniformsList=yl.seqWithValue(B.seq,T.uniforms)}return T.uniformsList}function Lt(T,B){const z=Xe.get(T);z.outputColorSpace=B.outputColorSpace,z.batching=B.batching,z.batchingColor=B.batchingColor,z.instancing=B.instancing,z.instancingColor=B.instancingColor,z.instancingMorph=B.instancingMorph,z.skinning=B.skinning,z.morphTargets=B.morphTargets,z.morphNormals=B.morphNormals,z.morphColors=B.morphColors,z.morphTargetsCount=B.morphTargetsCount,z.numClippingPlanes=B.numClippingPlanes,z.numIntersection=B.numClipIntersection,z.vertexAlphas=B.vertexAlphas,z.vertexTangents=B.vertexTangents,z.toneMapping=B.toneMapping}function ci(T,B,z,O,D){B.isScene!==!0&&(B=we),Ve.resetTextureUnits();const te=B.fog,I=O.isMeshStandardMaterial?B.environment:null,W=C===null?_.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:vr,J=(O.isMeshStandardMaterial?N:gt).get(O.envMap||I),de=O.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,be=!!z.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),Ae=!!z.morphAttributes.position,Le=!!z.morphAttributes.normal,rt=!!z.morphAttributes.color;let st=or;O.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(st=_.toneMapping);const Et=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,nt=Et!==void 0?Et.length:0,Fe=Xe.get(O),mt=g.state.lights;if(q===!0&&(ae===!0||T!==S)){const Cn=T===S&&O.id===b;Se.setState(O,T,Cn)}let ot=!1;O.version===Fe.__version?(Fe.needsLights&&Fe.lightsStateVersion!==mt.state.version||Fe.outputColorSpace!==W||D.isBatchedMesh&&Fe.batching===!1||!D.isBatchedMesh&&Fe.batching===!0||D.isBatchedMesh&&Fe.batchingColor===!0&&D.colorTexture===null||D.isBatchedMesh&&Fe.batchingColor===!1&&D.colorTexture!==null||D.isInstancedMesh&&Fe.instancing===!1||!D.isInstancedMesh&&Fe.instancing===!0||D.isSkinnedMesh&&Fe.skinning===!1||!D.isSkinnedMesh&&Fe.skinning===!0||D.isInstancedMesh&&Fe.instancingColor===!0&&D.instanceColor===null||D.isInstancedMesh&&Fe.instancingColor===!1&&D.instanceColor!==null||D.isInstancedMesh&&Fe.instancingMorph===!0&&D.morphTexture===null||D.isInstancedMesh&&Fe.instancingMorph===!1&&D.morphTexture!==null||Fe.envMap!==J||O.fog===!0&&Fe.fog!==te||Fe.numClippingPlanes!==void 0&&(Fe.numClippingPlanes!==Se.numPlanes||Fe.numIntersection!==Se.numIntersection)||Fe.vertexAlphas!==de||Fe.vertexTangents!==be||Fe.morphTargets!==Ae||Fe.morphNormals!==Le||Fe.morphColors!==rt||Fe.toneMapping!==st||Fe.morphTargetsCount!==nt)&&(ot=!0):(ot=!0,Fe.__version=O.version);let zt=Fe.currentProgram;ot===!0&&(zt=Ue(O,B,D));let Bn=!1,an=!1,_r=!1;const Nt=zt.getUniforms(),zn=Fe.uniforms;if(Be.useProgram(zt.program)&&(Bn=!0,an=!0,_r=!0),O.id!==b&&(b=O.id,an=!0),Bn||S!==T){Nt.setValue(F,"projectionMatrix",T.projectionMatrix),Nt.setValue(F,"viewMatrix",T.matrixWorldInverse);const Cn=Nt.map.cameraPosition;Cn!==void 0&&Cn.setValue(F,ge.setFromMatrixPosition(T.matrixWorld)),ct.logarithmicDepthBuffer&&Nt.setValue(F,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&Nt.setValue(F,"isOrthographic",T.isOrthographicCamera===!0),S!==T&&(S=T,an=!0,_r=!0)}if(D.isSkinnedMesh){Nt.setOptional(F,D,"bindMatrix"),Nt.setOptional(F,D,"bindMatrixInverse");const Cn=D.skeleton;Cn&&(Cn.boneTexture===null&&Cn.computeBoneTexture(),Nt.setValue(F,"boneTexture",Cn.boneTexture,Ve))}D.isBatchedMesh&&(Nt.setOptional(F,D,"batchingTexture"),Nt.setValue(F,"batchingTexture",D._matricesTexture,Ve),Nt.setOptional(F,D,"batchingColorTexture"),D._colorsTexture!==null&&Nt.setValue(F,"batchingColorTexture",D._colorsTexture,Ve));const yr=z.morphAttributes;if((yr.position!==void 0||yr.normal!==void 0||yr.color!==void 0)&&Re.update(D,z,zt),(an||Fe.receiveShadow!==D.receiveShadow)&&(Fe.receiveShadow=D.receiveShadow,Nt.setValue(F,"receiveShadow",D.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(zn.envMap.value=J,zn.flipEnvMap.value=J.isCubeTexture&&J.isRenderTargetTexture===!1?-1:1),O.isMeshStandardMaterial&&O.envMap===null&&B.environment!==null&&(zn.envMapIntensity.value=B.environmentIntensity),an&&(Nt.setValue(F,"toneMappingExposure",_.toneMappingExposure),Fe.needsLights&&On(zn,_r),te&&O.fog===!0&&le.refreshFogUniforms(zn,te),le.refreshMaterialUniforms(zn,O,ee,Z,g.state.transmissionRenderTarget[T.id]),yl.upload(F,vt(Fe),zn,Ve)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(yl.upload(F,vt(Fe),zn,Ve),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&Nt.setValue(F,"center",D.center),Nt.setValue(F,"modelViewMatrix",D.modelViewMatrix),Nt.setValue(F,"normalMatrix",D.normalMatrix),Nt.setValue(F,"modelMatrix",D.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const Cn=O.uniformsGroups;for(let Rc=0,k0=Cn.length;Rc<k0;Rc++){const ph=Cn[Rc];Ge.update(ph,zt),Ge.bind(ph,zt)}}return zt}function On(T,B){T.ambientLightColor.needsUpdate=B,T.lightProbe.needsUpdate=B,T.directionalLights.needsUpdate=B,T.directionalLightShadows.needsUpdate=B,T.pointLights.needsUpdate=B,T.pointLightShadows.needsUpdate=B,T.spotLights.needsUpdate=B,T.spotLightShadows.needsUpdate=B,T.rectAreaLights.needsUpdate=B,T.hemisphereLights.needsUpdate=B}function Tn(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(T,B,z){Xe.get(T.texture).__webglTexture=B,Xe.get(T.depthTexture).__webglTexture=z;const O=Xe.get(T);O.__hasExternalTextures=!0,O.__autoAllocateDepthBuffer=z===void 0,O.__autoAllocateDepthBuffer||Ye.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),O.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,B){const z=Xe.get(T);z.__webglFramebuffer=B,z.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(T,B=0,z=0){C=T,R=B,A=z;let O=!0,D=null,te=!1,I=!1;if(T){const J=Xe.get(T);J.__useDefaultFramebuffer!==void 0?(Be.bindFramebuffer(F.FRAMEBUFFER,null),O=!1):J.__webglFramebuffer===void 0?Ve.setupRenderTarget(T):J.__hasExternalTextures&&Ve.rebindTextures(T,Xe.get(T.texture).__webglTexture,Xe.get(T.depthTexture).__webglTexture);const de=T.texture;(de.isData3DTexture||de.isDataArrayTexture||de.isCompressedArrayTexture)&&(I=!0);const be=Xe.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(be[B])?D=be[B][z]:D=be[B],te=!0):T.samples>0&&Ve.useMultisampledRTT(T)===!1?D=Xe.get(T).__webglMultisampledFramebuffer:Array.isArray(be)?D=be[z]:D=be,M.copy(T.viewport),P.copy(T.scissor),X=T.scissorTest}else M.copy(re).multiplyScalar(ee).floor(),P.copy(ue).multiplyScalar(ee).floor(),X=Pe;if(Be.bindFramebuffer(F.FRAMEBUFFER,D)&&O&&Be.drawBuffers(T,D),Be.viewport(M),Be.scissor(P),Be.setScissorTest(X),te){const J=Xe.get(T.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+B,J.__webglTexture,z)}else if(I){const J=Xe.get(T.texture),de=B||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,J.__webglTexture,z||0,de)}b=-1},this.readRenderTargetPixels=function(T,B,z,O,D,te,I){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let W=Xe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&I!==void 0&&(W=W[I]),W){Be.bindFramebuffer(F.FRAMEBUFFER,W);try{const J=T.texture,de=J.format,be=J.type;if(!ct.textureFormatReadable(de)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ct.textureTypeReadable(be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=T.width-O&&z>=0&&z<=T.height-D&&F.readPixels(B,z,O,D,Ee.convert(de),Ee.convert(be),te)}finally{const J=C!==null?Xe.get(C).__webglFramebuffer:null;Be.bindFramebuffer(F.FRAMEBUFFER,J)}}},this.readRenderTargetPixelsAsync=async function(T,B,z,O,D,te,I){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let W=Xe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&I!==void 0&&(W=W[I]),W){Be.bindFramebuffer(F.FRAMEBUFFER,W);try{const J=T.texture,de=J.format,be=J.type;if(!ct.textureFormatReadable(de))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ct.textureTypeReadable(be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(B>=0&&B<=T.width-O&&z>=0&&z<=T.height-D){const Ae=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Ae),F.bufferData(F.PIXEL_PACK_BUFFER,te.byteLength,F.STREAM_READ),F.readPixels(B,z,O,D,Ee.convert(de),Ee.convert(be),0),F.flush();const Le=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);await KE(F,Le,4);try{F.bindBuffer(F.PIXEL_PACK_BUFFER,Ae),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,te)}finally{F.deleteBuffer(Ae),F.deleteSync(Le)}return te}}finally{const J=C!==null?Xe.get(C).__webglFramebuffer:null;Be.bindFramebuffer(F.FRAMEBUFFER,J)}}},this.copyFramebufferToTexture=function(T,B=null,z=0){T.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),B=arguments[0]||null,T=arguments[1]);const O=Math.pow(2,-z),D=Math.floor(T.image.width*O),te=Math.floor(T.image.height*O),I=B!==null?B.x:0,W=B!==null?B.y:0;Ve.setTexture2D(T,0),F.copyTexSubImage2D(F.TEXTURE_2D,z,0,0,I,W,D,te),Be.unbindTexture()},this.copyTextureToTexture=function(T,B,z=null,O=null,D=0){T.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),O=arguments[0]||null,T=arguments[1],B=arguments[2],D=arguments[3]||0,z=null);let te,I,W,J,de,be;z!==null?(te=z.max.x-z.min.x,I=z.max.y-z.min.y,W=z.min.x,J=z.min.y):(te=T.image.width,I=T.image.height,W=0,J=0),O!==null?(de=O.x,be=O.y):(de=0,be=0);const Ae=Ee.convert(B.format),Le=Ee.convert(B.type);Ve.setTexture2D(B,0),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,B.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,B.unpackAlignment);const rt=F.getParameter(F.UNPACK_ROW_LENGTH),st=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Et=F.getParameter(F.UNPACK_SKIP_PIXELS),nt=F.getParameter(F.UNPACK_SKIP_ROWS),Fe=F.getParameter(F.UNPACK_SKIP_IMAGES),mt=T.isCompressedTexture?T.mipmaps[D]:T.image;F.pixelStorei(F.UNPACK_ROW_LENGTH,mt.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,mt.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,W),F.pixelStorei(F.UNPACK_SKIP_ROWS,J),T.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,D,de,be,te,I,Ae,Le,mt.data):T.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,D,de,be,mt.width,mt.height,Ae,mt.data):F.texSubImage2D(F.TEXTURE_2D,D,de,be,Ae,Le,mt),F.pixelStorei(F.UNPACK_ROW_LENGTH,rt),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,st),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Et),F.pixelStorei(F.UNPACK_SKIP_ROWS,nt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Fe),D===0&&B.generateMipmaps&&F.generateMipmap(F.TEXTURE_2D),Be.unbindTexture()},this.copyTextureToTexture3D=function(T,B,z=null,O=null,D=0){T.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,O=arguments[1]||null,T=arguments[2],B=arguments[3],D=arguments[4]||0);let te,I,W,J,de,be,Ae,Le,rt;const st=T.isCompressedTexture?T.mipmaps[D]:T.image;z!==null?(te=z.max.x-z.min.x,I=z.max.y-z.min.y,W=z.max.z-z.min.z,J=z.min.x,de=z.min.y,be=z.min.z):(te=st.width,I=st.height,W=st.depth,J=0,de=0,be=0),O!==null?(Ae=O.x,Le=O.y,rt=O.z):(Ae=0,Le=0,rt=0);const Et=Ee.convert(B.format),nt=Ee.convert(B.type);let Fe;if(B.isData3DTexture)Ve.setTexture3D(B,0),Fe=F.TEXTURE_3D;else if(B.isDataArrayTexture||B.isCompressedArrayTexture)Ve.setTexture2DArray(B,0),Fe=F.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,B.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,B.unpackAlignment);const mt=F.getParameter(F.UNPACK_ROW_LENGTH),ot=F.getParameter(F.UNPACK_IMAGE_HEIGHT),zt=F.getParameter(F.UNPACK_SKIP_PIXELS),Bn=F.getParameter(F.UNPACK_SKIP_ROWS),an=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,st.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,st.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,J),F.pixelStorei(F.UNPACK_SKIP_ROWS,de),F.pixelStorei(F.UNPACK_SKIP_IMAGES,be),T.isDataTexture||T.isData3DTexture?F.texSubImage3D(Fe,D,Ae,Le,rt,te,I,W,Et,nt,st.data):B.isCompressedArrayTexture?F.compressedTexSubImage3D(Fe,D,Ae,Le,rt,te,I,W,Et,st.data):F.texSubImage3D(Fe,D,Ae,Le,rt,te,I,W,Et,nt,st),F.pixelStorei(F.UNPACK_ROW_LENGTH,mt),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ot),F.pixelStorei(F.UNPACK_SKIP_PIXELS,zt),F.pixelStorei(F.UNPACK_SKIP_ROWS,Bn),F.pixelStorei(F.UNPACK_SKIP_IMAGES,an),D===0&&B.generateMipmaps&&F.generateMipmap(Fe),Be.unbindTexture()},this.initRenderTarget=function(T){Xe.get(T).__webglFramebuffer===void 0&&Ve.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Ve.setTextureCube(T,0):T.isData3DTexture?Ve.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Ve.setTexture2DArray(T,0):Ve.setTexture2D(T,0),Be.unbindTexture()},this.resetState=function(){R=0,A=0,C=null,Be.reset(),We.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===sh?"display-p3":"srgb",n.unpackColorSpace=ft.workingColorSpace===wc?"display-p3":"srgb"}}class sb extends gn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ni,this.environmentIntensity=1,this.environmentRotation=new Ni,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class S0 extends ho{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ht(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ec=new G,tc=new G,Km=new Ut,xa=new r0,il=new Tc,Ou=new G,Zm=new G;class ab extends gn{constructor(e=new Ui,n=new S0){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)ec.fromBufferAttribute(n,r-1),tc.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=ec.distanceTo(tc);e.setAttribute("lineDistance",new lr(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),il.copy(i.boundingSphere),il.applyMatrix4(r),il.radius+=s,e.ray.intersectsSphere(il)===!1)return;Km.copy(r).invert(),xa.copy(e.ray).applyMatrix4(Km);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,u=this.isLineSegments?2:1,f=i.index,h=i.attributes.position;if(f!==null){const m=Math.max(0,a.start),y=Math.min(f.count,a.start+a.count);for(let v=m,g=y-1;v<g;v+=u){const d=f.getX(v),x=f.getX(v+1),_=rl(this,e,xa,c,d,x);_&&n.push(_)}if(this.isLineLoop){const v=f.getX(y-1),g=f.getX(m),d=rl(this,e,xa,c,v,g);d&&n.push(d)}}else{const m=Math.max(0,a.start),y=Math.min(h.count,a.start+a.count);for(let v=m,g=y-1;v<g;v+=u){const d=rl(this,e,xa,c,v,v+1);d&&n.push(d)}if(this.isLineLoop){const v=rl(this,e,xa,c,y-1,m);v&&n.push(v)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function rl(t,e,n,i,r,s){const a=t.geometry.attributes.position;if(ec.fromBufferAttribute(a,r),tc.fromBufferAttribute(a,s),n.distanceSqToSegment(ec,tc,Ou,Zm)>i)return;Ou.applyMatrix4(t.matrixWorld);const c=e.ray.origin.distanceTo(Ou);if(!(c<e.near||c>e.far))return{distance:c,point:Zm.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,object:t}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:rh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=rh);function ob(){const t=[],e=(V,ce,fe,_e)=>{V.addEventListener(ce,fe,_e),t.push(()=>V.removeEventListener(ce,fe,_e))},n=matchMedia("(prefers-reduced-motion: reduce)").matches;function i(V){return function(){V|=0,V=V+1831565813|0;let ce=Math.imul(V^V>>>15,1|V);return ce=ce+Math.imul(ce^ce>>>7,61|ce)^ce,((ce^ce>>>14)>>>0)/4294967296}}const r=[["#7FD8E8","#1E5F7E"],["#E8C07F","#8A5A0B"],["#D98FA8","#5E2338"],["#9FB6E8","#2A3E7A"]];function s(V,ce,fe){const _e=i(ce*7919+31),Oe=Math.min(devicePixelRatio,2),Ce=V.clientWidth||300,ye=V.clientHeight||400;V.width=Ce*Oe,V.height=ye*Oe;const K=V.getContext("2d");K.setTransform(Oe,0,0,Oe,0,0);const Ue=typeof K.filter=="string",vt=K.createLinearGradient(0,0,0,ye);vt.addColorStop(0,"#060A0D"),vt.addColorStop(.5,"#0A1116"),vt.addColorStop(1,"#03060A"),K.fillStyle=vt,K.fillRect(0,0,Ce,ye);const Lt=r[Math.floor(_e()*r.length)];K.globalCompositeOperation="lighter",Ue&&(K.filter="blur("+Ce*.012+"px)");const ci=fe==="close"?2:3+Math.floor(_e()*3);for(let z=0;z<ci;z++){const O=Ce*(.08+_e()*.84),D=Ce*(.05+_e()*.2),te=(_e()-.5)*Ce*.95,I=K.createLinearGradient(O,0,O+te,ye*.9),W=z%2?Lt[0]:Lt[1];I.addColorStop(0,W),I.addColorStop(.3,W),I.addColorStop(1,"rgba(0,0,0,0)"),K.globalAlpha=.1+_e()*.14,K.fillStyle=I,K.beginPath(),K.moveTo(O-3,-ye*.05),K.lineTo(O+3,-ye*.05),K.lineTo(O+te+D,ye*.95),K.lineTo(O+te-D,ye*.95),K.closePath(),K.fill()}Ue&&(K.filter="none");const On=K.createRadialGradient(Ce*.5,ye*.3,0,Ce*.5,ye*.3,ye*.8);On.addColorStop(0,Lt[0]),On.addColorStop(1,"rgba(0,0,0,0)"),K.globalAlpha=.07,K.fillStyle=On,K.fillRect(0,0,Ce,ye);const Tn=fe==="close"?42:26;for(let z=0;z<Tn;z++){const O=(fe==="close"?5:3)+_e()*(fe==="close"?24:14);Ue&&(K.filter="blur("+O*.28+"px)");const D=_e()*Ce,te=_e()*ye*.78,I=K.createRadialGradient(D,te,0,D,te,O),W=_e()>.55?Lt[0]:"#FFF0D2";I.addColorStop(0,W),I.addColorStop(.6,W),I.addColorStop(1,"rgba(0,0,0,0)"),K.globalAlpha=.04+_e()*.16,K.fillStyle=I,K.beginPath(),K.arc(D,te,O,0,Math.PI*2),K.fill()}Ue&&(K.filter="none"),K.globalCompositeOperation="source-over",K.globalAlpha=1;function T(z,O,D,te){K.fillStyle="rgba(2,4,6,"+te+")",K.beginPath(),K.arc(z,O,D,0,Math.PI*2),K.fill(),K.beginPath(),K.moveTo(z-D*2.1,O+D*3.6),K.quadraticCurveTo(z-D*1.85,O+D*1.02,z,O+D*.92),K.quadraticCurveTo(z+D*1.85,O+D*1.02,z+D*2.1,O+D*3.6),K.closePath(),K.fill()}if(fe!=="close"){const z=fe==="crowd"?3:2;for(let O=0;O<z;O++){const D=O/(z-1||1);Ue&&(K.filter="blur("+(1-D)*Ce*.012+"px)");const te=ye*(fe==="crowd"?.7+D*.28:.84+D*.17),I=Ce*(fe==="crowd"?.026+D*.05:.017+D*.024),W=.4+D*.55;let J=-I*2;for(;J<Ce+I*2;)T(J,te-I*(1.4+_e()*.5),I*(.85+_e()*.35),W),J+=I*(2.9+_e()*1.8)}if(Ue&&(K.filter="none"),fe==="stage"){const O=Ce*(.36+_e()*.28),D=Ce*.07,te=ye*.56;K.fillStyle="rgba(1,3,5,.97)",K.beginPath(),K.arc(O,te,D,0,Math.PI*2),K.fill(),K.beginPath(),K.moveTo(O-D*2.4,te+D*4.8),K.quadraticCurveTo(O-D*2.05,te+D*1.05,O,te+D*.95),K.quadraticCurveTo(O+D*2.05,te+D*1.05,O+D*2.4,te+D*4.8),K.closePath(),K.fill(),K.lineWidth=D*.6,K.lineCap="round",K.strokeStyle="rgba(1,3,5,.97)",K.beginPath(),K.moveTo(O-D*1.5,te+D*1.7),K.lineTo(O-D*2.7,te-D*1.8),K.stroke(),K.beginPath(),K.moveTo(O+D*1.5,te+D*1.7),K.lineTo(O+D*2.8,te-D*1.1),K.stroke()}}else{K.globalCompositeOperation="lighter";for(let z=0;z<3;z++){const O=ye*(.22+_e()*.55),D=K.createLinearGradient(0,O,Ce,O+(_e()-.5)*ye*.18);D.addColorStop(0,"rgba(0,0,0,0)"),D.addColorStop(.5,Lt[0]),D.addColorStop(1,"rgba(0,0,0,0)"),K.globalAlpha=.13,K.fillStyle=D,K.fillRect(0,O-1,Ce,2)}K.globalCompositeOperation="source-over",K.globalAlpha=1}const B=K.createRadialGradient(Ce/2,ye*.44,Math.min(Ce,ye)*.2,Ce/2,ye*.5,Math.max(Ce,ye)*.82);B.addColorStop(0,"rgba(0,0,0,0)"),B.addColorStop(1,"rgba(0,0,0,.82)"),K.fillStyle=B,K.fillRect(0,0,Ce,ye);try{const z=K.getImageData(0,0,V.width,V.height),O=z.data;for(let D=0;D<O.length;D+=4){const te=(_e()-.5)*24;O[D]+=te,O[D+1]+=te,O[D+2]+=te}K.putImageData(z,0,0)}catch{}}function a(){document.querySelectorAll("canvas[data-shot]").forEach(V=>s(V,+V.dataset.seed,V.dataset.shot))}const o=document.getElementById("wm"),c=document.getElementById("fitbox"),u=document.getElementById("slash"),f=o.querySelectorAll("em>i");function p(){o.style.transform="scale(1)";const V=o.offsetWidth,ce=o.offsetHeight;if(!V)return;const fe=innerWidth>1240?.76:.9,_e=Math.min(innerWidth*fe/V,1.4);o.style.transform="scale("+_e+")",c.style.height=ce*_e+"px"}document.fonts&&document.fonts.ready&&document.fonts.ready.then(p),e(window,"load",()=>{p(),a()});const h=setTimeout(()=>{p(),a()},260);t.push(()=>clearTimeout(h));let m;e(window,"resize",()=>{clearTimeout(m),m=setTimeout(()=>{p(),a()},250)}),t.push(()=>clearTimeout(m)),p(),a();const y=document.getElementById("hero");e(y,"mousemove",V=>{n||f.forEach(ce=>{const fe=ce.getBoundingClientRect(),_e=fe.left+fe.width/2,Oe=fe.top+fe.height/2,Ce=(V.clientX-_e)/innerWidth,ye=(V.clientY-Oe)/innerHeight;ce.style.transform="translate("+Ce*-16+"px,"+ye*-10+"px)"})}),e(y,"mouseleave",()=>f.forEach(V=>{V.style.transform=""}));const v=document.getElementById("pct"),g=document.getElementById("pbar"),d=document.getElementById("pre");let x=0;o.querySelectorAll("em").forEach((V,ce)=>{V.style.transitionDelay=ce*.07+"s"});const _=setInterval(()=>{x+=Math.random()*12,x>=100&&(x=100,clearInterval(_),setTimeout(()=>{d.classList.add("done"),o.classList.add("on"),p(),a()},350)),v.textContent=Math.round(x),g.style.width=x+"%"},105);t.push(()=>clearInterval(_));const E=document.getElementById("cd"),R=document.getElementById("cr");let A=0,C=0,b=0,S=0;e(window,"mousemove",V=>{A=V.clientX,C=V.clientY,E.style.left=A+"px",E.style.top=C+"px"});let M;(function V(){b+=(A-b)*.14,S+=(C-S)*.14,R.style.left=b+"px",R.style.top=S+"px",M=requestAnimationFrame(V)})(),t.push(()=>cancelAnimationFrame(M)),e(document,"mouseover",V=>{V.target.closest("a,button,input,.crow,.slide")?R.classList.add("on"):R.classList.remove("on")}),document.querySelectorAll(".mag").forEach(V=>{e(V,"mousemove",ce=>{const fe=V.getBoundingClientRect();V.style.transform="translate("+(ce.clientX-fe.left-fe.width/2)*.22+"px,"+(ce.clientY-fe.top-fe.height/2)*.32+"px)"}),e(V,"mouseleave",()=>{V.style.transform=""})});const P=new IntersectionObserver(V=>{V.forEach((ce,fe)=>{ce.isIntersecting&&(setTimeout(()=>ce.target.classList.add("in"),fe*90),P.unobserve(ce.target))})},{threshold:.12});document.querySelectorAll(".rv,.head").forEach(V=>P.observe(V)),t.push(()=>P.disconnect()),document.querySelectorAll("[data-go]").forEach(V=>{e(V,"click",()=>document.querySelector(V.dataset.go).scrollIntoView())});const X=document.getElementById("gal"),j=document.getElementById("track"),ne=document.querySelectorAll("[data-sp]"),$=document.getElementById("galbar"),Z=document.getElementById("galno");let ee=0,k=!1;function ie(){ee=scrollY,k||(requestAnimationFrame(re),k=!0)}function re(){if(k=!1,n||ne.forEach(V=>{V.style.transform="translateY("+ee*+V.dataset.sp+"px)"}),!n&&X){const V=X.offsetHeight-innerHeight;if(V>0){const ce=X.getBoundingClientRect(),fe=Math.min(1,Math.max(0,-ce.top/V)),_e=j.scrollWidth-innerWidth+64;j.style.transform="translateX("+-fe*Math.max(0,_e)+"px)",$.style.width=fe*100+"%",Z.textContent="0"+Math.min(6,Math.floor(fe*6)+1)}else j.style.transform="none"}}e(window,"scroll",ie,{passive:!0}),e(window,"resize",re),re();const ue={bass:[230,80,230],mid:[70,50,70,50,70],high:[24,24,24,24,24,24,24,24,24]};document.querySelectorAll(".hap").forEach(V=>{V.innerHTML="";const ce=ue[V.dataset.band],fe=ce.reduce((_e,Oe)=>_e+Oe,0);ce.forEach((_e,Oe)=>{const Ce=document.createElement(Oe%2?"u":"i");Ce.style.flex=_e/fe+" 0 0",V.appendChild(Ce)})});const Pe=[];document.querySelectorAll(".scope").forEach(V=>Pe.push({cv:V,band:V.dataset.band,boost:0}));function tt(V,ce){const fe=V.cv,_e=Math.min(devicePixelRatio,2),Oe=fe.clientWidth,Ce=fe.clientHeight;if(!Oe)return;fe.width!==Oe*_e&&(fe.width=Oe*_e,fe.height=Ce*_e);const ye=fe.getContext("2d");ye.setTransform(_e,0,0,_e,0,0),ye.clearRect(0,0,Oe,Ce),ye.strokeStyle="rgba(242,245,244,.06)",ye.lineWidth=1,ye.beginPath(),ye.moveTo(0,Ce/2),ye.lineTo(Oe,Ce/2),ye.stroke();const K=Math.min(1,V.boost),Ue=Ce*.32*(.5+V.boost*.7);ye.beginPath(),ye.lineWidth=1.1,ye.strokeStyle="rgba("+Math.round(242-186*K)+","+Math.round(245-13*K)+","+Math.round(244-38*K)+","+(.42+.5*K)+")";for(let vt=0;vt<=Oe;vt++){let Lt;V.band==="bass"?Lt=Ce/2+Math.sin(vt*.035+ce*2.1)*Ue:V.band==="mid"?Lt=Ce/2+(Math.sin(vt*.12+ce*3)*.65+Math.sin(vt*.31-ce*2)*.35)*Ue:Lt=Ce/2+Math.sin(vt*.55+ce*6)*Ue*(.55+.45*Math.abs(Math.sin(vt*.05+ce))),vt===0?ye.moveTo(vt,Lt):ye.lineTo(vt,Lt)}ye.stroke(),V.boost*=.94}function q(V){if(!u)return;const ce=Math.min(devicePixelRatio,2),fe=u.clientWidth,_e=u.clientHeight;if(!fe)return;u.width!==fe*ce&&(u.width=fe*ce,u.height=_e*ce);const Oe=u.getContext("2d");Oe.setTransform(ce,0,0,ce,0,0),Oe.clearRect(0,0,fe,_e);for(let Ce=0;Ce<3;Ce++){Oe.beginPath(),Oe.lineWidth=Ce===0?1.4:.8,Oe.strokeStyle="rgba(56,232,206,"+(Ce===0?.45:.15)+")";for(let ye=0;ye<=fe;ye+=2){const K=Math.sin(Math.PI*ye/fe),Ue=_e/2+Math.sin(ye*.012+V*1.4+Ce*1.2)*_e*.3*K+Math.sin(ye*.05-V*2.2)*_e*.1*K;ye===0?Oe.moveTo(ye,Ue):Oe.lineTo(ye,Ue)}Oe.stroke()}}const ae=document.getElementById("mon"),ve=document.getElementById("monwave");function ge(V){if(!ve)return;const ce=Math.min(devicePixelRatio,2),fe=ve.clientWidth,_e=ve.clientHeight;if(!fe)return;ve.width!==fe*ce&&(ve.width=fe*ce,ve.height=_e*ce);const Oe=ve.getContext("2d");Oe.setTransform(ce,0,0,ce,0,0),Oe.clearRect(0,0,fe,_e);const Ce=34,ye=fe/Ce;for(let K=0;K<Ce;K++){let Ue;ke&&F?Ue=He[Math.floor(K/Ce*He.length*.6)]/255:Ue=.06+Math.abs(Math.sin(V*1.6+K*.42))*.14;const vt=Math.max(2,Ue*_e);Oe.fillStyle=F?"rgba(56,232,206,"+(.35+Ue*.65)+")":"rgba(242,245,244,.26)",Oe.fillRect(K*ye+1,(_e-vt)/2,ye-2,vt)}}let we,ke,He,F=!1,qe,Ye,ct=0;function Be(){we=new(window.AudioContext||window.webkitAudioContext),ke=we.createAnalyser(),ke.fftSize=512,ke.smoothingTimeConstant=.8,He=new Uint8Array(ke.frequencyBinCount),qe=we.createGain(),qe.gain.value=.42,qe.connect(ke),ke.connect(we.destination)}function Ke(V,ce,fe,_e){const Oe=we.createOscillator(),Ce=we.createGain();Oe.type=fe||"sine",Oe.frequency.value=V,Ce.gain.setValueAtTime(0,we.currentTime),Ce.gain.linearRampToValueAtTime(_e||.5,we.currentTime+.012),Ce.gain.exponentialRampToValueAtTime(1e-4,we.currentTime+ce),Oe.connect(Ce),Ce.connect(qe),Oe.start(),Oe.stop(we.currentTime+ce+.05)}function Xe(V,ce){const fe=Math.floor(we.sampleRate*V),_e=we.createBuffer(1,fe,we.sampleRate),Oe=_e.getChannelData(0);for(let Ue=0;Ue<fe;Ue++)Oe[Ue]=(Math.random()*2-1)*(1-Ue/fe);const Ce=we.createBufferSource();Ce.buffer=_e;const ye=we.createBiquadFilter();ye.type="highpass",ye.frequency.value=6500;const K=we.createGain();K.gain.value=ce,Ce.connect(ye),ye.connect(K),K.connect(qe),Ce.start()}function Ve(V){if(navigator.vibrate&&!n)try{navigator.vibrate(V)}catch{}}const gt=[0,3,7,10,7,3,5,10];function N(){const V=ct%8;(V===0||V===4)&&(Ke(50,.45,"sine",.95),Ve([95])),(V===2||V===6)&&Ke(170,.15,"triangle",.3),V%2===1&&Xe(.055,.15),Ke(220*Math.pow(2,gt[ct%gt.length]/12),.3,"sawtooth",.09),ct++}const w=document.getElementById("disc");function H(){we||Be(),we.state==="suspended"&&we.resume(),F?(clearInterval(Ye),F=!1,w.classList.remove("spin"),ae&&ae.classList.remove("live")):(N(),Ye=setInterval(N,300),F=!0,w.classList.add("spin"),ae&&ae.classList.add("live"))}e(w,"click",H),ae&&e(ae,"click",H),t.push(()=>{clearInterval(Ye),we&&we.close()});const se={bass:[56,.5,"sine"],mid:[300,.28,"triangle"],high:[1500,.16,"square"]};document.querySelectorAll(".crow").forEach(V=>{e(V,"click",()=>{const ce=V.dataset.band;Ve(ue[ce]),V.classList.remove("hit"),V.offsetWidth,V.classList.add("hit"),Pe.forEach(_e=>{_e.band===ce&&(_e.boost=1.15)}),we||Be(),we.state==="suspended"&&we.resume();const fe=se[ce];Ke(fe[0],fe[1],fe[2],.5)}),e(V,"mouseenter",()=>Pe.forEach(ce=>{ce.band===V.dataset.band&&(ce.boost=.5)}))});const oe=document.getElementById("bars"),le=[];oe.innerHTML="";for(let V=0;V<72;V++){const ce=document.createElement("i");oe.appendChild(ce),le.push(ce)}const De=document.getElementById("stage"),xe=new rb({canvas:De,antialias:!0,alpha:!0});xe.setPixelRatio(Math.min(devicePixelRatio,1.75));const Se=new sb,Ie=new Nn(46,1,.1,200);Ie.position.set(0,5.4,17),Ie.lookAt(0,1.2,-10);const pe=58,Re=170,$e=62,ze=6,Ee=-62,We=[];for(let V=0;V<pe;V++){const ce=V/(pe-1),fe=ze+(Ee-ze)*ce,_e=new Float32Array(Re*3),Oe=new Float32Array(Re*3);for(let Ue=0;Ue<Re;Ue++)_e[Ue*3]=-$e/2+$e*(Ue/(Re-1)),_e[Ue*3+1]=0,_e[Ue*3+2]=fe;const Ce=new Ui;Ce.setAttribute("position",new In(_e,3)),Ce.setAttribute("color",new In(Oe,3));const ye=new S0({vertexColors:!0,transparent:!0,opacity:.95,blending:zd,depthWrite:!1}),K=new ab(Ce,ye);Se.add(K),We.push({g:Ce,m:ye,z:fe,zt:ce})}t.push(()=>{We.forEach(V=>{V.g.dispose(),V.m.dispose()}),xe.dispose()});const Ge={r:.22,g:.91,b:.81},Ze={r:.85,g:.65,b:.3};let U=.08,Me=.06,Y=.05,Q=0,me=0,je=0;e(window,"mousemove",V=>{me=V.clientX/innerWidth-.5,je=V.clientY/innerHeight-.5});function et(){const V=De.clientWidth,ce=De.clientHeight;(De.width!==V||De.height!==ce)&&(xe.setSize(V,ce,!1),Ie.aspect=V/ce,Ie.updateProjectionMatrix())}function ut(){for(let V=0;V<We.length;V++){const ce=We[V],fe=ce.g.attributes.position.array,_e=ce.g.attributes.color.array,Oe=ce.z,Ce=Math.pow(1-ce.zt,.9);for(let ye=0;ye<Re;ye++){const K=fe[ye*3],Ue=Math.sqrt(K*K+Oe*Oe),vt=Math.sin(Ue*.3-Q*2)*(1+U*5.2)/(1+Ue*.055)+Math.sin(K*.16+Q*.9)*Math.cos(Oe*.13-Q*.6)*(.35+Me*2.2)+Math.sin(K*.62+Q*3.4)*(Y*.55);fe[ye*3+1]=vt;let Lt=1-Math.pow(Math.abs(K)/($e/2),2.2);Lt<0&&(Lt=0);const ci=Math.min(1,Math.abs(vt)*.5+.1),On=Math.min(1,U*1.4),Tn=(.16+ci*.9)*Lt*Ce;_e[ye*3]=(Ge.r+(Ze.r-Ge.r)*On)*Tn,_e[ye*3+1]=(Ge.g+(Ze.g-Ge.g)*On)*Tn,_e[ye*3+2]=(Ge.b+(Ze.b-Ge.b)*On)*Tn}ce.g.attributes.position.needsUpdate=!0,ce.g.attributes.color.needsUpdate=!0}}let _t;function at(V){_t=requestAnimationFrame(at);const ce=(V||0)/1e3;if(Pe.forEach(fe=>tt(fe,ce)),Q+=n?.0022:.0105,ke&&F){ke.getByteFrequencyData(He);const fe=He.length,_e=Math.floor(fe*.06),Oe=Math.floor(fe*.34);let Ce=0,ye=0,K=0,Ue;for(Ue=0;Ue<_e;Ue++)Ce+=He[Ue];for(Ue=_e;Ue<Oe;Ue++)ye+=He[Ue];for(Ue=Oe;Ue<fe;Ue++)K+=He[Ue];for(U=U*.6+Ce/_e/255*.4,Me=Me*.6+ye/(Oe-_e)/255*.4,Y=Y*.6+K/(fe-Oe)/255*.4,Ue=0;Ue<72;Ue++)le[Ue].style.height=2+He[Math.floor(Ue/72*fe*.72)]/255*98+"%"}else{U=U*.95+.08*.05,Me=Me*.95+.06*.05,Y=Y*.95+.05*.05;for(let fe=0;fe<72;fe++)le[fe].style.height=2+Math.abs(Math.sin(Q*2.2+fe*.28))*9+"%"}scrollY>innerHeight*1.2||(q(ce),ge(ce),et(),ut(),Ie.position.x+=(me*3.4-Ie.position.x)*.035,Ie.position.y+=(5.4-je*1.8-Ie.position.y)*.035,Ie.lookAt(0,1.2,-10),xe.render(Se,Ie))}return _t=requestAnimationFrame(at),t.push(()=>cancelAnimationFrame(_t)),()=>t.forEach(V=>V())}const M0="medreh_users",Yd="medreh_user";function xr(){try{return JSON.parse(localStorage.getItem(M0))||[]}catch{return[]}}function ia(t){localStorage.setItem(M0,JSON.stringify(t))}function lb(){const t=xr();t.some(e=>e.role==="admin")||(t.unshift({name:"Админ",email:"admin@medreh.mn",pass:eo("admin123"),role:"admin"}),ia(t))}function eo(t){return btoa(unescape(encodeURIComponent(t+"·medreh")))}function E0(t,e){const n=xr(),i=n.find(r=>r.email===t);return i?(Object.assign(i,e),ia(n),!0):!1}function cb(t,e){const n=xr().find(i=>i.email===t);return!!n&&n.pass===eo(e)}function ub(t,e){return E0(t,{pass:eo(e)})}function db(){try{return JSON.parse(localStorage.getItem(Yd))}catch{return null}}function _a(t){t?localStorage.setItem(Yd,JSON.stringify(t)):localStorage.removeItem(Yd)}function Qm({name:t,autoComplete:e}){const[n,i]=L.useState(!1);return l.jsxs("span",{className:"pass-wrap",children:[l.jsx("input",{name:t,type:n?"text":"password",placeholder:"••••••••",autoComplete:e}),l.jsx("button",{type:"button",className:"pass-eye",onClick:()=>i(!n),"aria-label":n?"Нууц үг нуух":"Нууц үг харах",title:n?"Нуух":"Харах",children:n?l.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("path",{d:"M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"}),l.jsx("circle",{cx:"12",cy:"12",r:"2.6"})]}):l.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("path",{d:"M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"}),l.jsx("circle",{cx:"12",cy:"12",r:"2.6"}),l.jsx("line",{x1:"4",y1:"20",x2:"20",y2:"4"})]})})]})}function fb({open:t,onClose:e,onAuth:n}){const[i,r]=L.useState("login"),[s,a]=L.useState(""),[o,c]=L.useState(""),[u,f]=L.useState("");if(L.useEffect(()=>{if(!t)return;r("login"),a(""),c(""),f("");const h=m=>{m.key==="Escape"&&e()};return addEventListener("keydown",h),()=>removeEventListener("keydown",h)},[t,e]),!t)return null;function p(h){h.preventDefault(),c(""),f("");const m=new FormData(h.target),y=s.trim().toLowerCase(),v=m.get("pass")||"";if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(y)){c("Имэйл хаяг буруу байна");return}if(v.length<6){c("Нууц үг дор хаяж 6 тэмдэгт байх ёстой");return}const g=xr();if(i==="register"){const d=(m.get("name")||"").trim(),x=m.get("pass2")||"";if(d.length<2){c("Нэрээ оруулна уу");return}if(v!==x){c("Нууц үг таарахгүй байна");return}if(g.some(E=>E.email===y)){r("login"),f("Энэ имэйл бүртгэлтэй байна — нууц үгээ оруулаад нэвтэрнэ үү");return}const _={name:d,email:y,pass:eo(v),role:"user",created:Date.now()};g.push(_),ia(g),n({name:_.name,email:_.email,role:"user",sub:null}),f("Тавтай морил, "+d+"!"),setTimeout(e,700)}else{const d=g.find(x=>x.email===y);if(!d){r("register"),f("Энэ имэйл бүртгэлгүй байна — нэр, нууц үгээ оруулаад бүртгүүлээрэй");return}if(d.pass!==eo(v)){c("Нууц үг буруу байна");return}n({name:d.name,email:d.email,role:d.role||"user",sub:d.sub||null}),f("Тавтай морил, "+d.name+"!"),setTimeout(e,700)}}return l.jsx("div",{className:"auth-ov",onMouseDown:h=>{h.target===h.currentTarget&&e()},children:l.jsxs("div",{className:"auth-box",role:"dialog","aria-modal":"true","aria-label":"Нэвтрэх / Бүртгүүлэх",children:[l.jsx("button",{className:"auth-x",onClick:e,"aria-label":"Хаах",children:"✕"}),l.jsx("span",{className:"mono",children:"МЭДРЭХ® / Хандалт"}),l.jsxs("div",{className:"auth-tabs",children:[l.jsx("button",{className:i==="login"?"on":"",onClick:()=>{r("login"),c(""),f("")},children:"Нэвтрэх"}),l.jsx("button",{className:i==="register"?"on":"",onClick:()=>{r("register"),c(""),f("")},children:"Бүртгүүлэх"})]}),l.jsxs("form",{onSubmit:p,children:[i==="register"&&l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Нэр"}),l.jsx("input",{name:"name",type:"text",placeholder:"Таны нэр",autoComplete:"name"})]}),l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Имэйл"}),l.jsx("input",{name:"email",type:"email",placeholder:"you@mail.com",autoComplete:"email",value:s,onChange:h=>a(h.target.value)})]}),l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Нууц үг"}),l.jsx(Qm,{name:"pass",autoComplete:i==="login"?"current-password":"new-password"})]}),i==="register"&&l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Нууц үг давтах"}),l.jsx(Qm,{name:"pass2",autoComplete:"new-password"})]}),o&&l.jsx("p",{className:"auth-err",children:o}),u&&l.jsx("p",{className:"auth-ok",children:u}),l.jsx("button",{type:"submit",className:"bt bt-a auth-sub",children:i==="login"?"Нэвтрэх →":"Бүртгүүлэх →"})]},i),l.jsx("p",{className:"auth-note mono",children:"Демо горим — өгөгдөл зөвхөн энэ төхөөрөмжид хадгалагдана"})]})})}const hb="medreh-files",qr="files";function oh(){return new Promise((t,e)=>{const n=indexedDB.open(hb,1);n.onupgradeneeded=()=>n.result.createObjectStore(qr),n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function Jm(t,e){const n=await oh();return new Promise((i,r)=>{const s=n.transaction(qr,"readwrite");s.objectStore(qr).put(e,t),s.oncomplete=()=>i(),s.onerror=()=>r(s.error)})}async function eg(t){const e=await oh();return new Promise((n,i)=>{const r=e.transaction(qr).objectStore(qr).get(t);r.onsuccess=()=>n(r.result||null),r.onerror=()=>i(r.error)})}async function tg(t){const e=await oh();return new Promise((n,i)=>{const r=e.transaction(qr,"readwrite");r.objectStore(qr).delete(t),r.oncomplete=()=>n(),r.onerror=()=>i(r.error)})}const w0="medreh_custom_tracks",T0="medreh_feed";function Ua(){try{return JSON.parse(localStorage.getItem(w0))||[]}catch{return[]}}function C0(t){localStorage.setItem(w0,JSON.stringify(t)),dispatchEvent(new CustomEvent("medreh:library-changed"))}async function pb(t){const e=Ua().filter(n=>n.id!==t);await tg("audio-"+t).catch(()=>{}),await tg("cover-"+t).catch(()=>{}),C0(e)}function nc(){try{return JSON.parse(localStorage.getItem(T0))||[]}catch{return[]}}function lh(t,e="🎵"){const n=[{id:Date.now(),text:t,icon:e,date:Date.now()},...nc()].slice(0,30);localStorage.setItem(T0,JSON.stringify(n)),dispatchEvent(new CustomEvent("medreh:feed-changed"))}function mb(){nc().length===0&&lh("МЭДРЭХ-д тавтай морил! Дуугаа сонгоод мэдэрч эхлээрэй","🎉")}function gb(t){return+(localStorage.getItem("medreh_feed_read:"+t)||0)}function vb(t){localStorage.setItem("medreh_feed_read:"+t,String(Date.now()))}const ng={total:0,vib:0,byGenre:{},byTrack:{},days:{}};function xb(t){try{return{...ng,...JSON.parse(localStorage.getItem("medreh_stats:"+t))||{}}}catch{return{...ng}}}function ig(t,e){localStorage.setItem("medreh_stats:"+t,JSON.stringify(e))}function A0(t=new Date){return t.toISOString().slice(0,10)}function ch(t){try{return JSON.parse(localStorage.getItem("medreh_payments:"+t))||[]}catch{return[]}}function _b(t,e){const n=[e,...ch(t)];localStorage.setItem("medreh_payments:"+t,JSON.stringify(n))}const b0=t=>"medreh_playlists:"+t;function mo(t){try{return JSON.parse(localStorage.getItem(b0(t)))||[]}catch{return[]}}function bc(t,e){localStorage.setItem(b0(t),JSON.stringify(e)),dispatchEvent(new CustomEvent("medreh:playlists-changed"))}function yb(t,e){const n={id:"pl"+Date.now(),name:e,tracks:[],created:Date.now()};return bc(t,[n,...mo(t)]),n}function Sb(t,e){bc(t,mo(t).filter(n=>n.id!==e))}function Mb(t,e,n){const i=mo(t),r=i.find(s=>s.id===e);r&&!r.tracks.includes(n)&&(r.tracks=[n,...r.tracks],bc(t,i))}function Eb(t,e,n){const i=mo(t),r=i.find(s=>s.id===e);r&&(r.tracks=r.tracks.filter(s=>s!==n),bc(t,i))}function wb({open:t,onClose:e,currentUser:n}){const[i,r]=L.useState([]),[s,a]=L.useState([]),[o,c]=L.useState("users"),[u,f]=L.useState(!1),[p,h]=L.useState("");if(L.useEffect(()=>{if(!t)return;r(xr()),a(Ua()),h("");const d=x=>{x.key==="Escape"&&e()};return addEventListener("keydown",d),()=>removeEventListener("keydown",d)},[t,e]),!t)return null;function m(d){if(!confirm(d+" — энэ хэрэглэгчийг устгах уу?"))return;const x=i.filter(_=>_.email!==d);ia(x),r(x),dispatchEvent(new CustomEvent("medreh:users-changed"))}async function y(d){d.preventDefault(),h("");const x=new FormData(d.target),_=(x.get("title")||"").trim(),E=(x.get("singer")||"").trim(),R=(x.get("composer")||"").trim(),A=(x.get("genre")||"").trim()||"Бусад",C=x.get("audio"),b=x.get("cover"),S=(x.get("coverUrl")||"").trim();if(_.length<2){h("❌ Дууны нэрээ оруулна уу");return}if(E.length<2){h("❌ Дуучны нэрээ оруулна уу");return}if(!C||!C.size){h("❌ Дууны mp3 файлаа сонгоно уу — энэ нь тоглогдох дуу тул заавал шаардлагатай");return}if(!/audio\//.test(C.type)){h("❌ Аудио талбарт зөвхөн дууны файл (mp3) оруулна — зураг биш");return}if(S&&!/^https?:\/\//.test(S)){h("❌ Зургийн линк http(s)://-ээр эхлэх ёстой");return}f(!0);try{const M="c"+Date.now();await Jm("audio-"+M,C),b&&b.size&&await Jm("cover-"+M,b);const X=[{id:M,title:_,singer:E,composer:R,genre:A,hasCover:!!(b&&b.size),coverUrl:!b||!b.size?S:"",added:Date.now()},...Ua()];C0(X),a(X),lh("Шинэ дуу нэмэгдлээ: «"+_+"» — "+E,"🎵"),h("✅ «"+_+"» амжилттай нэмэгдлээ. Хэрэглэгчдэд мэдэгдэл илгээгдсэн."),d.target.reset()}catch(M){h("❌ Хадгалахад алдаа гарлаа: "+M.message)}f(!1)}async function v(d){confirm("«"+d.title+"» дууг устгах уу?")&&(await pb(d.id),a(Ua()))}const g=i.filter(d=>d.role!=="admin");return l.jsx("div",{className:"auth-ov",onMouseDown:d=>{d.target===d.currentTarget&&e()},children:l.jsxs("div",{className:"auth-box admin-box",role:"dialog","aria-modal":"true","aria-label":"Админ самбар",children:[l.jsx("button",{className:"auth-x",onClick:e,"aria-label":"Хаах",children:"✕"}),l.jsx("span",{className:"mono",children:"МЭДРЭХ® / Админ самбар"}),l.jsxs("div",{className:"auth-tabs",style:{marginBottom:0},children:[l.jsx("button",{className:o==="users"?"on":"",onClick:()=>c("users"),children:"Хэрэглэгчид"}),l.jsx("button",{className:o==="tracks"?"on":"",onClick:()=>c("tracks"),children:"Дууны сан"})]}),o==="users"&&l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"adm-stats",children:[l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Нийт бүртгэл"}),l.jsx("b",{children:g.length})]}),l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"PRO захиалагч"}),l.jsx("b",{children:g.filter(d=>{var x;return(x=d.sub)==null?void 0:x.active}).length})]})]}),l.jsxs("div",{className:"adm-list",children:[l.jsxs("div",{className:"adm-row adm-head",children:[l.jsx("span",{className:"mono",children:"Нэр"}),l.jsx("span",{className:"mono",children:"Имэйл"}),l.jsx("span",{className:"mono",children:"Огноо"}),l.jsx("span",{className:"mono",children:"Захиалга"}),l.jsx("span",{})]}),g.length===0&&l.jsx("p",{className:"adm-empty",children:"Одоогоор бүртгүүлсэн хэрэглэгч алга"}),g.map(d=>{var x,_;return l.jsxs("div",{className:"adm-row",children:[l.jsx("span",{children:d.name}),l.jsx("span",{className:"adm-mail",children:d.email}),l.jsx("span",{className:"adm-date",children:d.created?new Date(d.created).toLocaleDateString("mn-MN"):"—"}),l.jsx("span",{className:"adm-sub"+((x=d.sub)!=null&&x.active?" on":""),children:(_=d.sub)!=null&&_.active?"PRO":"—"}),l.jsx("button",{className:"adm-del",onClick:()=>m(d.email),"aria-label":d.email+" устгах",children:"Устгах"})]},d.email)})]})]}),o==="tracks"&&l.jsxs(l.Fragment,{children:[l.jsxs("form",{className:"adm-form",onSubmit:y,children:[l.jsx("span",{className:"mono",style:{fontSize:9.5},children:"Шинэ дуу нэмэх"}),l.jsxs("div",{className:"adm-form-row",children:[l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Дууны нэр *"}),l.jsx("input",{name:"title",type:"text",placeholder:"ж: Хөх тэнгэр"})]}),l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Дуучин *"}),l.jsx("input",{name:"singer",type:"text",placeholder:"ж: Батаа"})]})]}),l.jsxs("div",{className:"adm-form-row",children:[l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Зохиолч (заавал биш)"}),l.jsx("input",{name:"composer",type:"text",placeholder:"ж: Д.Дорж"})]}),l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Төрөл (заавал биш)"}),l.jsx("input",{name:"genre",type:"text",placeholder:"ж: Поп",list:"genres"}),l.jsxs("datalist",{id:"genres",children:[l.jsx("option",{value:"Поп"}),l.jsx("option",{value:"Рок"}),l.jsx("option",{value:"Хип хоп"}),l.jsx("option",{value:"Электрон"}),l.jsx("option",{value:"Ардын"}),l.jsx("option",{value:"Чилл"})]})]})]}),l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"🎵 Дууны файл (mp3) *"}),l.jsx("input",{name:"audio",type:"file",accept:"audio/*",className:"adm-file"})]}),l.jsxs("div",{className:"adm-cover",children:[l.jsx("span",{className:"mono",children:"🖼 Обложка зураг — заавал биш, аль нэгийг нь л оруулна"}),l.jsxs("div",{className:"adm-form-row",children:[l.jsxs("label",{children:[l.jsx("span",{className:"mono",style:{color:"var(--faint)"},children:"Файлаар"}),l.jsx("input",{name:"cover",type:"file",accept:"image/*",className:"adm-file"})]}),l.jsxs("label",{children:[l.jsx("span",{className:"mono",style:{color:"var(--faint)"},children:"Эсвэл линкээр"}),l.jsx("input",{name:"coverUrl",type:"url",placeholder:"https://..."})]})]}),l.jsx("p",{className:"adm-hint",children:"Хоёуланг нь оруулбал файл нь ашиглагдана. Юу ч оруулаагүй бол автомат обложка тавигдана."})]}),p&&l.jsx("p",{className:p.startsWith("✅")?"auth-ok":"auth-err",style:{fontSize:13},children:p}),l.jsx("button",{type:"submit",className:"bt bt-a auth-sub",disabled:u,children:u?"Хадгалж байна…":"+ Дуу нэмэх"})]}),l.jsxs("div",{className:"adm-list",children:[l.jsxs("div",{className:"adm-row adm-head adm-row-t",children:[l.jsx("span",{className:"mono",children:"Нэр"}),l.jsx("span",{className:"mono",children:"Төрөл"}),l.jsx("span",{className:"mono",children:"Огноо"}),l.jsx("span",{})]}),s.length===0&&l.jsx("p",{className:"adm-empty",children:"Админы нэмсэн дуу алга — үндсэн 6 демо дуу ажиллаж байна"}),s.map(d=>l.jsxs("div",{className:"adm-row adm-row-t",children:[l.jsxs("span",{children:[d.title," ",l.jsxs("i",{className:"adm-artist",children:["— ",d.singer||d.artist]}),d.composer&&l.jsxs("i",{className:"adm-artist",children:[" · зох. ",d.composer]})]}),l.jsx("span",{className:"adm-date",children:d.genre}),l.jsx("span",{className:"adm-date",children:new Date(d.added).toLocaleDateString("mn-MN")}),l.jsx("button",{className:"adm-del",onClick:()=>v(d),children:"Устгах"})]},d.id))]})]}),l.jsxs("p",{className:"auth-note mono",children:["Нэвтэрсэн: ",n==null?void 0:n.email]})]})})}const R0="/assets/gal-01-BmF_rInK.jpg",uh="/assets/gal-02-BmiPgtM2.jpg",N0="/assets/gal-03-CpoeRbUW.jpg",P0="/assets/gal-04-DThaAW-j.jpg",L0="/assets/gal-05-BQMWFLMO.jpg",D0="/assets/gal-06-BiTMBND7.jpg",Bu=[{id:1,title:"Гүн долгион",artist:"SoundHelix",genre:"Электрон",file:"/tracks/song-1.mp3",cover:R0},{id:2,title:"Шөнийн хэмнэл",artist:"SoundHelix",genre:"Чилл",file:"/tracks/song-2.mp3",cover:uh},{id:3,title:"Хотын гэрэл",artist:"SoundHelix",genre:"Синт поп",file:"/tracks/song-3.mp3",cover:N0},{id:4,title:"Цахилгаан зүрх",artist:"SoundHelix",genre:"Данс",file:"/tracks/song-4.mp3",cover:P0},{id:5,title:"Мөрөөдлийн зам",artist:"SoundHelix",genre:"Эмбиент",file:"/tracks/song-8.mp3",cover:L0},{id:6,title:"Аянгын цохилт",artist:"SoundHelix",genre:"Электрон рок",file:"/tracks/song-9.mp3",cover:D0}],Tb=[{key:"bass",label:"Бас",hz:"55 Hz",freq:55,type:"sine",dur:.7,vib:[220]},{key:"mid",label:"Дунд",hz:"330 Hz",freq:330,type:"triangle",dur:.45,vib:[60,40,60]},{key:"high",label:"Өндөр",hz:"1.8 kHz",freq:1800,type:"square",dur:.3,vib:[15,20,15,20,15]}];function Cb({open:t,onClose:e,onDone:n}){const[i,r]=L.useState(0),[s,a]=L.useState(1),[o,c]=L.useState(1),[u,f]=L.useState({bass:!0,mid:!0,high:!0}),[p,h]=L.useState(!1),m=L.useRef(null),y=typeof navigator<"u"&&!!navigator.vibrate;if(L.useEffect(()=>{t&&(r(0),h(!1)),!t&&m.current&&(m.current.close().catch(()=>{}),m.current=null)},[t]),!t)return null;function v(b,S,M){m.current||(m.current=new(window.AudioContext||window.webkitAudioContext));const P=m.current;P.state==="suspended"&&P.resume();const X=P.createOscillator(),j=P.createGain();X.type=M,X.frequency.value=b,j.gain.setValueAtTime(0,P.currentTime),j.gain.linearRampToValueAtTime(.5,P.currentTime+.02),j.gain.exponentialRampToValueAtTime(1e-4,P.currentTime+S),X.connect(j),j.connect(P.destination),X.start(),X.stop(P.currentTime+S+.05)}function g(b){if(y)try{navigator.vibrate(b)}catch{}}function d(){h(!0),g([300]),v(55,.8,"sine")}function x(b){v(b.freq,b.dur,b.type),g(b.vib)}function _(b){f(S=>{const M={...S,[b]:!S[b]};return!M.bass&&!M.mid&&!M.high?S:M})}function E(){n({vib:s,light:o,bands:u,calibrated:!0}),e()}const R=[{label:"Тод мэдэрсэн",hint:"Сул горим тохирно",val:0},{label:"Бага зэрэг",hint:"Дунд горим тохирно",val:1},{label:"Мэдрээгүй",hint:"Хүчтэй горим тохирно",val:2}],A=[{label:"Хэт тод байна",hint:"Бүдэг горим",val:0},{label:"Яг таарсан",hint:"Дунд горим",val:1},{label:"Бүдэг харагдсан",hint:"Тод горим",val:2}],C=["","Чичиргээ","Гэрэл","Давтамж","Дүгнэлт"];return l.jsx("div",{className:"cal-ov",role:"dialog","aria-modal":"true","aria-label":"Мэдрэхүйн калибровк",children:l.jsxs("div",{className:"cal-box",children:[i>0&&l.jsx("div",{className:"cal-prog","aria-hidden":"true",children:[1,2,3,4].map(b=>l.jsx("i",{className:i>=b?"on":""},b))}),i===0&&l.jsxs("div",{className:"cal-step",children:[l.jsx("span",{className:"cal-big","aria-hidden":"true",children:"🎛"}),l.jsx("h2",{children:"Мэдрэхүйн калибровк"}),l.jsxs("p",{children:["Сонсголын мэдрэмж хүн бүрд өөр. Богино тестээр таны ",l.jsx("b",{children:"мэдрэх босгыг"})," тодорхойлж, чичиргээ болон гэрлийн тохиргоог танд яг тааруулж өгье. Ердөө 1 минут зарцуулна."]}),l.jsxs("div",{className:"cal-row",children:[l.jsx("button",{className:"bt bt-a",onClick:()=>r(1),children:"Эхлэх →"}),l.jsx("button",{className:"bt",onClick:e,children:"Дараа хийе"})]})]}),i===1&&l.jsxs("div",{className:"cal-step",children:[l.jsxs("span",{className:"mono",children:["1 / 4 · ",C[1]]}),l.jsx("h2",{children:"Чичиргээг мэдэрч үзье"}),y?l.jsx("p",{children:"Утсаа гартаа барьж байгаад доорх товчийг дараарай — 0.3 секундын чичиргээ өгнө."}):l.jsx("p",{children:"Энэ төхөөрөмж чичиргээгүй тул дууны туршилт хийнэ. Утсан дээр дахин калибровк хийхэд чичиргээ нэмэгдэнэ."}),l.jsxs("button",{className:"cal-test"+(p?" done":""),onClick:d,children:["📳 ",p?"Дахин туршиж үзэх":"Туршиж үзэх"]}),l.jsx("div",{className:"cal-ans",children:R.map(b=>l.jsxs("button",{className:s===b.val&&p?"on":"",disabled:!p,onClick:()=>{a(b.val),r(2)},children:[l.jsx("b",{children:b.label}),l.jsx("span",{children:b.hint})]},b.val))})]}),i===2&&l.jsxs("div",{className:"cal-step",children:[l.jsxs("span",{className:"mono",children:["2 / 4 · ",C[2]]}),l.jsx("h2",{children:"Гэрлийн пульс хэр харагдаж байна?"}),l.jsx("div",{className:"cal-pulse-wrap","aria-hidden":"true",children:l.jsx("span",{className:"cal-pulse"})}),l.jsx("div",{className:"cal-ans",children:A.map(b=>l.jsxs("button",{onClick:()=>{c(b.val),r(3)},children:[l.jsx("b",{children:b.label}),l.jsx("span",{children:b.hint})]},b.val))})]}),i===3&&l.jsxs("div",{className:"cal-step",children:[l.jsxs("span",{className:"mono",children:["3 / 4 · ",C[3]]}),l.jsx("h2",{children:"Аль давтамжийг мэдэрдэг вэ?"}),l.jsx("p",{children:"Тус бүрийг туршаад, мэдэрсэн бүсүүдээ идэвхтэй үлдээгээрэй. Идэвхгүй бүс чичиргээ өгөхгүй."}),l.jsx("div",{className:"cal-bands",children:Tb.map(b=>l.jsxs("div",{className:"cal-band"+(u[b.key]?" on":""),children:[l.jsx("button",{className:"cal-band-play",onClick:()=>x(b),"aria-label":b.label+" туршиж үзэх",children:"▶"}),l.jsxs("div",{className:"cal-band-meta",children:[l.jsx("b",{children:b.label}),l.jsx("span",{className:"mono",children:b.hz})]}),l.jsx("button",{className:"cal-band-tgl",onClick:()=>_(b.key),"aria-pressed":u[b.key],children:u[b.key]?"✓ Мэдэрсэн":"Мэдрээгүй"})]},b.key))}),l.jsx("div",{className:"cal-row",children:l.jsx("button",{className:"bt bt-a",onClick:()=>r(4),children:"Үргэлжлүүлэх →"})})]}),i===4&&l.jsxs("div",{className:"cal-step",children:[l.jsxs("span",{className:"mono",children:["4 / 4 · ",C[4]]}),l.jsx("span",{className:"cal-big","aria-hidden":"true",children:"✓"}),l.jsx("h2",{children:"Таны мэдрэхүйн профайл"}),l.jsxs("div",{className:"cal-sum",children:[l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Чичиргээ"}),l.jsx("b",{children:["Сул","Дунд","Хүчтэй"][s]})]}),l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Гэрэл"}),l.jsx("b",{children:["Бүдэг","Дунд","Тод"][o]})]}),l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Бүс"}),l.jsx("b",{children:[u.bass&&"Бас",u.mid&&"Дунд",u.high&&"Өндөр"].filter(Boolean).join(" · ")})]})]}),l.jsx("p",{className:"cal-note",children:"Тохиргоог хүссэн үедээ ⚙️ цэснээс өөрчилж, дахин калибровк хийж болно."}),l.jsx("div",{className:"cal-row",children:l.jsx("button",{className:"bt bt-a",onClick:E,children:"Хадгалаад эхлэх →"})})]})]})})}const Ir=30,rg=[{label:"Сул",mult:.5},{label:"Дунд",mult:1},{label:"Хүчтэй",mult:1.7}],sg=[{label:"Бүдэг",mult:.5},{label:"Дунд",mult:1},{label:"Тод",mult:1.7}],ya={vib:1,light:1,bands:{bass:!0,mid:!0,high:!0},calibrated:!1},dh={Электрон:{bass:78,mid:52,high:38,pattern:[230,80,230],text:"Гүн бас давамгайлсан — урт, хүчтэй чичиргээ голлон мэдрэгдэнэ. Гар дээр аажуу лугшилт болж бууна."},Чилл:{bass:46,mid:62,high:30,pattern:[140,90,140,90],text:"Зөөлөн дунд давтамжтай — намуухан, урсгал мэт хэмнэлтэй чичиргээ. Тайвшруулах мэдрэмж өгнө."},"Синт поп":{bass:58,mid:72,high:55,pattern:[80,50,80,50,120],text:"Тод аялгуу, дунд бүс голлосон — хэмнэлтэй, «дуулж» буй мэт чичиргээ мэдрэгдэнэ."},Данс:{bass:86,mid:48,high:52,pattern:[95,55,95,55,95],text:"Хүчтэй тогтмол цохилт — бүжгийн хэмнэл шиг тэнцүү зайтай, эрчтэй чичиргээ. Хамгийн «мэдрэгддэг» төрөл."},Эмбиент:{bass:36,mid:56,high:46,pattern:[300,220,300],text:"Уужим, удаан өөрчлөгдөх дуу — маш зөөлөн, урт долгион мэт чичиргээ. Гэрлийн пульс нь гол мэдрэмж."},"Электрон рок":{bass:72,mid:68,high:62,pattern:[60,40,60,40,130],text:"Бүх бүс идэвхтэй — богино түргэн + урт хүчтэй чичиргээ ээлжилнэ. Эрч хүчтэй мэдрэмж."}},fh={bass:55,mid:55,high:45,pattern:[120,70,120],text:"Олон төрлийн давтамж холилдсон — дунд зэргийн хэмнэлтэй чичиргээ мэдрэгдэнэ."},_i={users:l.jsxs(l.Fragment,{children:[l.jsx("path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}),l.jsx("circle",{cx:"9",cy:"7",r:"4"}),l.jsx("path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}),l.jsx("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]}),gem:l.jsxs(l.Fragment,{children:[l.jsx("path",{d:"M6 3h12l4 6-10 12L2 9l4-6z"}),l.jsx("path",{d:"M2 9h20"}),l.jsx("path",{d:"m12 21-4-12 2.5-6"}),l.jsx("path",{d:"m12 21 4-12-2.5-6"})]}),money:l.jsxs(l.Fragment,{children:[l.jsx("rect",{x:"2",y:"6",width:"20",height:"12",rx:"2"}),l.jsx("circle",{cx:"12",cy:"12",r:"3"}),l.jsx("path",{d:"M6 10v4M18 10v4"})]}),music:l.jsxs(l.Fragment,{children:[l.jsx("path",{d:"M9 18V5l12-2v13"}),l.jsx("circle",{cx:"6",cy:"18",r:"3"}),l.jsx("circle",{cx:"18",cy:"16",r:"3"})]}),phones:l.jsxs(l.Fragment,{children:[l.jsx("path",{d:"M3 14v-2a9 9 0 0 1 18 0v2"}),l.jsx("rect",{x:"3",y:"14",width:"4",height:"6",rx:"2"}),l.jsx("rect",{x:"17",y:"14",width:"4",height:"6",rx:"2"})]}),vibrate:l.jsxs(l.Fragment,{children:[l.jsx("rect",{x:"8",y:"3",width:"8",height:"18",rx:"2"}),l.jsx("path",{d:"M3 9v6M21 9v6"}),l.jsx("path",{d:"M5.5 10.5v3M18.5 10.5v3"})]}),star:l.jsx("path",{d:"m12 2 3 6.6 7 .9-5.2 4.8 1.4 7-6.2-3.6L5.8 21l1.4-7L2 9.5l7-.9z"}),horn:l.jsxs(l.Fragment,{children:[l.jsx("path",{d:"m3 10 16-5v14L3 14v-4z"}),l.jsx("path",{d:"M7 14.5V18a2 2 0 0 0 4 0v-2.3"}),l.jsx("path",{d:"M21 9v6"})]})};function ag(t){if(!isFinite(t))return"0:00";const e=Math.floor(t/60),n=Math.floor(t%60);return e+":"+String(n).padStart(2,"0")}function zu(t){if(t<60)return t+" сек";const e=Math.floor(t/3600),n=Math.floor(t%3600/60);return e>0?e+" цаг "+n+" мин":n+" мин"}function Ab(t){const e=Math.floor((Date.now()-t)/6e4);return e<1?"дөнгөж сая":e<60?e+" мин өмнө":e<1440?Math.floor(e/60)+" цаг өмнө":Math.floor(e/1440)+" өдрийн өмнө"}function Pi({title:t,onBack:e}){return l.jsxs("div",{className:"sp-backbar",children:[l.jsx("button",{className:"sp-back",onClick:e,children:"← Буцах"}),l.jsx("h2",{className:"sp-h",style:{margin:0},children:t})]})}function ju({tracks:t,curId:e,playing:n,onPlay:i}){return l.jsx("div",{className:"sp-side-recent",children:t.map(r=>l.jsxs("button",{className:"sp-rcard"+(e===r.id?" on":""),onClick:()=>i(r),children:[l.jsx("img",{src:r.cover,alt:""}),l.jsx("span",{children:r.title}),e===r.id&&n?l.jsxs("span",{className:"pl-eq sp-req","aria-hidden":"true",children:[l.jsx("u",{}),l.jsx("u",{}),l.jsx("u",{})]}):l.jsx("i",{"aria-hidden":"true",children:"▶"})]},r.id))})}const I0=L.createContext(null);function bb({children:t}){var p;const[e,n]=L.useState(db),i=(e==null?void 0:e.role)||null,r=i==="admin",s=r||!!((p=e==null?void 0:e.sub)!=null&&p.active);function a(h){n(h),_a(h)}function o(){n(null),_a(null)}function c(h){n(m=>{const y={...m,...h};return _a(y),y})}function u(h){n(m=>{const y={...m,sub:h};return _a(y),y})}function f(){n(h=>{const m={...h,sub:{...h.sub,active:!1}};_a(m);const y=xr(),v=y.find(g=>g.email===h.email);return v&&(v.sub=m.sub,ia(y)),m})}return l.jsx(I0.Provider,{value:{user:e,role:i,isAdmin:r,subscribed:s,login:a,logout:o,updateUser:c,setSub:u,cancelSub:f},children:t})}function U0(){const t=L.useContext(I0);if(!t)throw new Error("useAuth-ийг AuthProvider дотор ашиглана уу");return t}const F0=L.createContext(null);function Rb({children:t}){const[e,n]=L.useState([]),i=L.useCallback(o=>{n(c=>c.filter(u=>u.id!==o))},[]),r=L.useCallback((o,c="info",u=3800)=>{const f=Date.now()+Math.random();return n(p=>[...p,{id:f,text:o,type:c}]),u>0&&setTimeout(()=>i(f),u),f},[i]),s={show:r,success:(o,c)=>r(o,"success",c),error:(o,c)=>r(o,"error",c),info:(o,c)=>r(o,"info",c),dismiss:i},a={success:"✓",error:"⚠",info:"ℹ"};return l.jsxs(F0.Provider,{value:s,children:[t,l.jsx("div",{className:"toast-wrap",role:"region","aria-label":"Мэдэгдэл","aria-live":"polite",children:e.map(o=>l.jsxs("div",{className:"toast toast-"+o.type,role:"status",children:[l.jsx("span",{className:"toast-ic","aria-hidden":"true",children:a[o.type]||a.info}),l.jsx("p",{children:o.text}),l.jsx("button",{className:"toast-x",onClick:()=>i(o.id),"aria-label":"Хаах",children:"✕"})]},o.id))})]})}function hh(){const t=L.useContext(F0);if(!t)throw new Error("useToast-ийг ToastProvider дотор ашиглана уу");return t}const og=["#38E8CE","#D9A54C","#D98FA8","#9FB6E8","#7FD8E8","#B5E88F"],Nb=[{v:"deaf",label:"Сонсголгүй"},{v:"hoh",label:"Сул сонсголтой"},{v:"hearing",label:"Сонсголтой"},{v:"",label:"Хэлэхгүй"}];function Pb({onBack:t}){var E;const{user:e,updateUser:n}=U0(),i=hh(),[r,s]=L.useState((e==null?void 0:e.name)||""),[a,o]=L.useState((e==null?void 0:e.color)||og[0]),[c,u]=L.useState((e==null?void 0:e.hearing)||""),[f,p]=L.useState(""),[h,m]=L.useState(""),[y,v]=L.useState(""),g=(r||"?").trim().charAt(0).toUpperCase(),d=(e==null?void 0:e.role)==="admin";function x(R){if(R.preventDefault(),r.trim().length<2){i.error("Нэр дор хаяж 2 тэмдэгт байх ёстой");return}E0(e.email,{name:r.trim(),color:a,hearing:c}),n({name:r.trim(),color:a,hearing:c}),i.success("Профайл хадгалагдлаа")}function _(R){if(R.preventDefault(),!cb(e.email,f)){i.error("Одоогийн нууц үг буруу байна");return}if(h.length<6){i.error("Шинэ нууц үг дор хаяж 6 тэмдэгт");return}if(h!==y){i.error("Шинэ нууц үг таарахгүй байна");return}ub(e.email,h),p(""),m(""),v(""),i.success("Нууц үг амжилттай солигдлоо")}return l.jsxs(l.Fragment,{children:[l.jsx(Pi,{title:"Профайл засах",onBack:t}),l.jsxs("div",{className:"pv-top",children:[l.jsx("span",{className:"sp-avatar sp-avatar-lg",style:{background:a,color:"#04100E"},"aria-hidden":"true",children:g}),l.jsxs("div",{children:[l.jsx("b",{children:r||"—"}),l.jsx("i",{children:e==null?void 0:e.email}),l.jsx("span",{className:"pv-role",children:d?"Админ эрх":(E=e==null?void 0:e.sub)!=null&&E.active?"PRO хэрэглэгч":"Үнэгүй горим"})]})]}),l.jsxs("form",{className:"pv-card",onSubmit:x,children:[l.jsx("h3",{className:"st-h",style:{marginTop:0},children:"Үндсэн мэдээлэл"}),l.jsxs("label",{className:"pv-field",children:[l.jsx("span",{className:"mono",children:"Нэр"}),l.jsx("input",{value:r,onChange:R=>s(R.target.value),placeholder:"Таны нэр"})]}),l.jsxs("label",{className:"pv-field",children:[l.jsx("span",{className:"mono",children:"Имэйл (өөрчлөх боломжгүй)"}),l.jsx("input",{value:(e==null?void 0:e.email)||"",disabled:!0})]}),l.jsxs("div",{className:"pv-field",children:[l.jsx("span",{className:"mono",children:"Аватар өнгө"}),l.jsx("div",{className:"pv-colors",children:og.map(R=>l.jsx("button",{type:"button",className:"pv-swatch"+(a===R?" on":""),style:{background:R},onClick:()=>o(R),"aria-label":"Өнгө "+R,"aria-pressed":a===R},R))})]}),l.jsxs("div",{className:"pv-field",children:[l.jsx("span",{className:"mono",children:"Сонсголын байдал (нууц — тохиргоог сайжруулахад)"}),l.jsx("div",{className:"sp-seg pv-hearing",children:Nb.map(R=>l.jsx("button",{type:"button",className:c===R.v?"on":"",onClick:()=>u(R.v),children:R.label},R.v))})]}),l.jsx("button",{type:"submit",className:"bt bt-a",children:"Хадгалах"})]}),l.jsxs("form",{className:"pv-card",onSubmit:_,children:[l.jsx("h3",{className:"st-h",style:{marginTop:0},children:"Нууц үг солих"}),l.jsxs("label",{className:"pv-field",children:[l.jsx("span",{className:"mono",children:"Одоогийн нууц үг"}),l.jsx("input",{type:"password",value:f,onChange:R=>p(R.target.value),placeholder:"••••••••",autoComplete:"current-password"})]}),l.jsxs("label",{className:"pv-field",children:[l.jsx("span",{className:"mono",children:"Шинэ нууц үг"}),l.jsx("input",{type:"password",value:h,onChange:R=>m(R.target.value),placeholder:"••••••••",autoComplete:"new-password"})]}),l.jsxs("label",{className:"pv-field",children:[l.jsx("span",{className:"mono",children:"Шинэ нууц үг давтах"}),l.jsx("input",{type:"password",value:y,onChange:R=>v(R.target.value),placeholder:"••••••••",autoComplete:"new-password"})]}),l.jsx("button",{type:"submit",className:"bt",children:"Нууц үг солих"})]})]})}const lg=[{v:"chest",label:"Цээж"},{v:"ribs",label:"Хавирга"},{v:"shoulder",label:"Мөр"},{v:"wrist",label:"Бугуй"}],Lb={bass:"chest",mid:"ribs",high:"shoulder"},sl={bass:"Бас (20–250 Hz)",mid:"Дунд (250–4k)",high:"Өндөр (4–20k)"},Db={bass:[230,80,230],mid:[70,50,70,50,70],high:[24,24,24,24,24,24]};function Ib({prefs:t,onUpdatePrefs:e,canVibrate:n,onBack:i}){var y;const r=hh(),[s,a]=L.useState(null),o={...Lb,...t.deviceMap||{}};L.useEffect(()=>{const v=()=>{var x;const d=[...((x=navigator.getGamepads)==null?void 0:x.call(navigator))||[]].find(Boolean);a(d||null)};v(),addEventListener("gamepadconnected",v),addEventListener("gamepaddisconnected",v);const g=setInterval(v,1500);return()=>{removeEventListener("gamepadconnected",v),removeEventListener("gamepaddisconnected",v),clearInterval(g)}},[]);function c(){if(!n){r.error("Энэ төхөөрөмж чичиргээ дэмжихгүй — Android утсан дээр туршина уу");return}try{navigator.vibrate([230,80,230]),r.success("Утас чичирлээ 📳")}catch{r.error("Чичиргээ ажиллахгүй байна")}}function u(){var d;const v=[...((d=navigator.getGamepads)==null?void 0:d.call(navigator))||[]].find(Boolean);if(!v){r.error("Gamepad олдсонгүй — холбоод, нэг товч дараарай");return}const g=v.vibrationActuator;g!=null&&g.playEffect?(g.playEffect("dual-rumble",{duration:320,strongMagnitude:1,weakMagnitude:.55}),r.success("Gamepad чичирлээ 🎮")):r.error("Энэ gamepad чичиргээ дэмжихгүй")}async function f(){if(!navigator.bluetooth){r.error("Web Bluetooth дэмжигдэхгүй — Chrome/Edge (desktop/Android) ашиглана уу");return}try{const v=await navigator.bluetooth.requestDevice({acceptAllDevices:!0});r.success("Холбогдлоо: "+(v.name||"төхөөрөмж"))}catch(v){v.name!=="NotFoundError"&&r.error("Холбогдож чадсангүй")}}function p(v,g){e({deviceMap:{...o,[v]:g}})}function h(v){var g;if(n)try{navigator.vibrate(Db[v])}catch{}r.info(sl[v]+" → "+((g=lg.find(d=>d.v===o[v]))==null?void 0:g.label))}const m=[{key:"phone",icon:"📱",name:"Утас (чичиргээ)",desc:"Android Chrome дээр шууд ажиллана. iOS дэмжихгүй.",status:n?"Бэлэн":"Дэмжигдэхгүй",ok:n,action:c,actionLabel:"Тест"},{key:"gamepad",icon:"🎮",name:"Gamepad (rumble)",desc:"USB/Bluetooth джойстик — 2 моторт, эрчимтэй чичиргээ.",status:s?"Холбогдсон: "+(((y=s.id)==null?void 0:y.slice(0,22))||"gamepad"):"Холбогдоогүй",ok:!!s,action:u,actionLabel:"Тест"},{key:"ble",icon:"🦺",name:"BLE хаптик хантааз",desc:"Олон моторт хантааз/суудал — биеийн бүсээр tonotopic мэдрэмж.",status:navigator.bluetooth?"Холбоход бэлэн":"Браузер дэмжихгүй",ok:!!navigator.bluetooth,action:f,actionLabel:"Холбох"}];return l.jsxs(l.Fragment,{children:[l.jsx(Pi,{title:"Төхөөрөмж холбох",onBack:i}),l.jsx("p",{className:"dv-lead",children:"Хөгжмийг илүү хүчтэй мэдрэхийн тулд төхөөрөмж холбоно. Утас хамгийн энгийн нь — хантааз хамгийн гүн мэдрэмж өгнө."}),l.jsx("div",{className:"dv-grid",children:m.map(v=>l.jsxs("div",{className:"dv-card"+(v.ok?" ok":""),children:[l.jsx("span",{className:"dv-ic","aria-hidden":"true",children:v.icon}),l.jsx("b",{children:v.name}),l.jsx("p",{children:v.desc}),l.jsxs("span",{className:"dv-status"+(v.ok?" on":""),children:[l.jsx("i",{className:"dv-dot","aria-hidden":"true"}),v.status]}),l.jsx("button",{className:"bt bt-a dv-btn",onClick:v.action,children:v.actionLabel})]},v.key))}),l.jsx("h3",{className:"st-h",children:"Давтамж → биеийн байрлал"}),l.jsx("p",{className:"dv-lead",children:"Олон моторт төхөөрөмж дээр давтамжийн бүс бүрийг биеийн өөр цэгт оноож болно (чихний дун шиг — «tonotopic»). Дараад туршиж үзээрэй."}),l.jsx("div",{className:"dv-map",children:["bass","mid","high"].map(v=>l.jsxs("div",{className:"dv-maprow",children:[l.jsx("button",{className:"dv-testz",onClick:()=>h(v),"aria-label":sl[v]+" туршиж үзэх",children:"▶"}),l.jsx("span",{className:"dv-band",children:sl[v]}),l.jsx("span",{className:"dv-arrow","aria-hidden":"true",children:"→"}),l.jsx("select",{className:"dv-select",value:o[v],onChange:g=>p(v,g.target.value),"aria-label":sl[v]+" байрлал",children:lg.map(g=>l.jsx("option",{value:g.v,children:g.label},g.v))})]},v))}),l.jsx("div",{className:"sp-banner dv-note",children:l.jsxs("div",{children:[l.jsx("b",{children:"Санамж"}),l.jsx("p",{children:"Компьютер дээр жинхэнэ чичиргээ гарахгүй — зөвхөн гэрлийн пульс. Бүрэн туршихын тулд Android утас эсвэл gamepad холбоно уу."})]})})]})}function Kd({icon:t="🎵",title:e="Хоосон байна",hint:n,action:i}){return l.jsxs("div",{className:"state state-empty",children:[l.jsx("span",{className:"state-ic","aria-hidden":"true",children:t}),l.jsx("b",{children:e}),n&&l.jsx("p",{children:n}),i]})}function Ub({email:t,tracks:e,onPlay:n,curId:i,playing:r,onBack:s}){const a=hh(),[o,c]=L.useState([]),[u,f]=L.useState(""),[p,h]=L.useState(null),[m,y]=L.useState(!1),[v,g]=L.useState(""),d=()=>c(mo(t));L.useEffect(()=>{d();const C=()=>d();return addEventListener("medreh:playlists-changed",C),()=>removeEventListener("medreh:playlists-changed",C)},[t]);const x=C=>e.find(b=>b.id===C),_=o.find(C=>C.id===p);function E(C){if(C.preventDefault(),u.trim().length<2){a.error("Жагсаалтын нэрээ оруулна уу");return}yb(t,u.trim()),f(""),a.success("«"+u.trim()+"» жагсаалт үүслээ")}function R(C){Sb(t,C.id),p===C.id&&h(null),a.info("«"+C.name+"» устгагдлаа")}function A(C){const b=C.tracks.map(x).find(Boolean);b?n(b):a.error("Жагсаалт хоосон байна")}if(_){const C=_.tracks.map(x).filter(Boolean),b=e.filter(S=>!_.tracks.includes(S.id)&&(S.title+" "+S.artist).toLowerCase().includes(v.trim().toLowerCase()));return l.jsxs(l.Fragment,{children:[l.jsx(Pi,{title:_.name,onBack:()=>{h(null),y(!1)}}),l.jsxs("div",{className:"plv-openhead",children:[l.jsxs("span",{className:"mono",children:[C.length," дуу"]}),l.jsxs("div",{className:"plv-openact",children:[l.jsx("button",{className:"bt bt-a",onClick:()=>A(_),disabled:!C.length,children:"▶ Бүгдийг тоглуулах"}),l.jsx("button",{className:"bt",onClick:()=>y(S=>!S),children:m?"Хаах":"＋ Дуу нэмэх"})]})]}),m&&l.jsxs("div",{className:"plv-add",children:[l.jsx("input",{className:"plv-search",placeholder:"Дуу хайх…",value:v,onChange:S=>g(S.target.value)}),l.jsxs("div",{className:"sp-list",children:[b.length===0&&l.jsx("p",{className:"adm-empty",children:"Нэмэх дуу алга"}),b.slice(0,20).map(S=>l.jsxs("div",{className:"sp-lrow plv-cand",children:[l.jsx("img",{className:"sp-lthumb",src:S.cover,alt:""}),l.jsxs("span",{className:"sp-lmeta",children:[l.jsx("b",{children:S.title}),l.jsx("i",{children:S.artist})]}),l.jsx("button",{className:"bt bt-a plv-addbtn",onClick:()=>{Mb(t,_.id,S.id),a.success("Нэмэгдлээ")},children:"＋"})]},S.id))]})]}),C.length===0?l.jsx(Kd,{icon:"🎧",title:"Жагсаалт хоосон",hint:"«＋ Дуу нэмэх» товчоор дуу нэмээрэй"}):l.jsx("div",{className:"sp-list",children:C.map((S,M)=>{const P=i===S.id;return l.jsxs("div",{className:"sp-lrow"+(P?" on":""),children:[l.jsx("span",{className:"sp-lno mono",children:String(M+1).padStart(2,"0")}),l.jsx("img",{className:"sp-lthumb",src:S.cover,alt:""}),l.jsxs("button",{className:"sp-lmeta plv-play",onClick:()=>n(S),children:[l.jsx("b",{children:S.title}),l.jsx("i",{children:S.artist})]}),l.jsx("span",{className:"sp-lgenre mono",children:S.genre}),l.jsx("button",{className:"adm-del",onClick:()=>{Eb(t,_.id,S.id),a.info("Хасагдлаа")},children:"Хасах"}),l.jsx("span",{className:"sp-lact","aria-hidden":"true",children:P&&r?"▮▮":"▶"})]},S.id)})})]})}return l.jsxs(l.Fragment,{children:[l.jsx(Pi,{title:"Миний жагсаалтууд",onBack:s}),l.jsxs("form",{className:"plv-create",onSubmit:E,children:[l.jsx("input",{value:u,onChange:C=>f(C.target.value),placeholder:"Шинэ жагсаалтын нэр…"}),l.jsx("button",{type:"submit",className:"bt bt-a",children:"＋ Үүсгэх"})]}),o.length===0?l.jsx(Kd,{icon:"🎵",title:"Жагсаалт алга",hint:"Дээрээс шинэ жагсаалт үүсгээд, дуртай дуугаа цуглуулаарай"}):l.jsx("div",{className:"plv-grid",children:o.map(C=>{var S;const b=(S=C.tracks.map(x).find(Boolean))==null?void 0:S.cover;return l.jsxs("div",{className:"plv-card",children:[l.jsxs("button",{className:"plv-open",onClick:()=>h(C.id),children:[l.jsx("span",{className:"plv-cover",children:b?l.jsx("img",{src:b,alt:""}):l.jsx("span",{className:"plv-cover-empty","aria-hidden":"true",children:"♫"})}),l.jsx("b",{children:C.name}),l.jsxs("i",{children:[C.tracks.length," дуу"]})]}),l.jsxs("div",{className:"plv-cardact",children:[l.jsx("button",{className:"plv-mini",onClick:()=>A(C),disabled:!C.tracks.length,"aria-label":"Тоглуулах",children:"▶"}),l.jsx("button",{className:"plv-mini danger",onClick:()=>R(C),"aria-label":"Устгах",children:"🗑"})]})]},C.id)})})]})}const Fb=[{ic:"🎵",t:"Дуу сонгох",d:"Картан дээр дарахад дуу тоглоно. Хайлт болон төрлийн шүүлтүүрээр хүссэн дуугаа ол."},{ic:"📳",t:"Чичиргээ мэдрэх",d:"Утсан дээр нээвэл дууны хэмнэлээр утас чичирнэ. Бас = урт хүчтэй, өндөр = богино түргэн."},{ic:"💡",t:"Гэрлээр мэдрэх",d:"Дэлгэцийн гэрэл дууны цохилтоор лугшина. ⛶ товчоор бүтэн дэлгэцийн «Мэдрэх горим» нээгдэнэ."},{ic:"🎛",t:"Өөрт тааруулах",d:"⚙️ цэснээс чичиргээний хүч, гэрлийн эрчим, давтамжийн бүсээ тохируул. Калибровк дахин хийж болно."},{ic:"♥",t:"Цуглуулга",d:"Зүрх дарж дуртай дуугаа, 🔖 дарж дараа сонсох дуугаа хадгал. Зүүн самбарт цуглана."},{ic:"💳",t:"PRO захиалга",d:"Үнэгүй горимд 30 сек сонсоно. PRO бол бүрэн эрхтэй — профайл цэснээс захиалгаа удирдаарай."}],kb=[{q:"Компьютер дээр чичиргээ гарахгүй байна?",a:"Веб браузер зөвхөн утасны чичиргээг дэмждэг. Android утас эсвэл gamepad холбоод туршаарай — компьютер дээр гэрлийн пульс болон визуалаар мэдэрнэ."},{q:"iPhone дээр яагаад чичрэхгүй байна вэ?",a:"iOS Safari нь чичиргээний API-г дэмждэггүй. iPhone дээр визуал болон gamepad/хантаазаар мэдрэхийг зөвлөж байна."},{q:"Калибровкоо буруу хийчихсэн бол?",a:"Ямар ч үед ⚙️ тохиргоо эсвэл энэ хуудаснаас дахин калибровк хийж болно. Хуучин тохиргоо автоматаар шинэчлэгдэнэ."},{q:"Дуу 30 секундэд тасарч байна?",a:"Энэ бол үнэгүй горимын урьдчилан сонсголт. PRO захиалга авбал бүх дууг бүтнээр нь хязгааргүй сонсоно."},{q:"Хадгалсан дуу, тохиргоо минь алга болох уу?",a:"Одоогийн демо хувилбар өгөгдлийг зөвхөн энэ төхөөрөмжид хадгална. Production хувилбарт бүртгэлээр олон төхөөрөмж хооронд sync хийгдэнэ."}];function Ob({onOpenCalibrate:t,onBack:e}){return l.jsxs(l.Fragment,{children:[l.jsx(Pi,{title:"Тусламж — Хэрхэн ашиглах вэ?",onBack:e}),l.jsx("div",{className:"hlp-grid",children:Fb.map(n=>l.jsxs("div",{className:"hlp-card",children:[l.jsx("span",{className:"hlp-ic","aria-hidden":"true",children:n.ic}),l.jsx("b",{children:n.t}),l.jsx("p",{children:n.d})]},n.t))}),l.jsx("h3",{className:"st-h",children:"Түгээмэл асуулт"}),l.jsx("div",{className:"hlp-faq",children:kb.map(n=>l.jsxs("details",{className:"hlp-faq-item",children:[l.jsxs("summary",{children:[n.q,l.jsx("span",{className:"hlp-faq-ic","aria-hidden":"true",children:"+"})]}),l.jsx("p",{children:n.a})]},n.q))}),l.jsxs("div",{className:"sp-banner",style:{marginTop:26},children:[l.jsxs("div",{children:[l.jsx("b",{children:"Мэдрэхүйн калибровк"}),l.jsx("p",{children:"Таны мэдрэх босгыг 1 минутын тестээр тодорхойлж, тохиргоог автоматаар тааруулна."})]}),l.jsx("button",{className:"bt bt-a",onClick:t,children:"🎛 Калибровк эхлүүлэх"})]})]})}const Bb=[["Sub-бас","20–60 Hz"],["Бас","60–150 Hz"],["Доод дунд","150–400 Hz"],["Дунд","400 Hz–1 kHz"],["Дээд дунд","1–2.5 kHz"],["Present","2.5–6 kHz"],["Гялбаа","6–12 kHz"],["Агаар","12–20 kHz"]],Hu=(t,e,n)=>t+(e-t)*n,zb=t=>Math.round(Math.max(6,Math.min(100,t)));function jb(t){return[t.bass*1.05,t.bass,Hu(t.bass,t.mid,.5),t.mid,Hu(t.mid,t.high,.4),Hu(t.mid,t.high,.7),t.high,t.high*.82].map(zb)}function Hb({track:t,isCurrent:e,playing:n,onPlay:i,onFeelTest:r,onBack:s,liked:a,saved:o,onToggleLike:c,onToggleSave:u}){const f=t;if(!f)return null;const p=dh[f.genre]||fh,h=p.pattern.reduce((y,v)=>y+v,0),m=jb(p);return l.jsxs(l.Fragment,{children:[l.jsx(Pi,{title:"Дууны дэлгэрэнгүй",onBack:s}),l.jsxs("div",{className:"dt-wrap",children:[l.jsxs("div",{className:"dt-left",children:[l.jsx("img",{className:"dt-cover",src:f.cover,alt:f.title}),l.jsxs("div",{className:"dt-btns",children:[l.jsx("button",{className:"bt bt-a",onClick:i,children:e&&n?"⏸ Зогсоох":"▶ Тоглуулах"}),l.jsx("button",{className:"bt",onClick:r,children:"📳 Туршиж мэдрэх"}),l.jsxs("div",{className:"dt-collect",children:[l.jsxs("button",{className:"dt-cbtn"+(a?" on love":""),onClick:c,"aria-pressed":a,children:[l.jsx("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:a?"currentColor":"none",stroke:"currentColor",strokeWidth:"2",strokeLinejoin:"round",children:l.jsx("path",{d:"M12 21s-7.5-4.9-10-9.2C.3 8.6 2 5 5.5 5c2 0 3.4 1.1 4.2 2.3L12 9.6l2.3-2.3C15.1 6.1 16.5 5 18.5 5 22 5 23.7 8.6 22 11.8 19.5 16.1 12 21 12 21z"})}),"Дуртай"]}),l.jsxs("button",{className:"dt-cbtn"+(o?" on save":""),onClick:u,"aria-pressed":o,children:[l.jsx("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:o?"currentColor":"none",stroke:"currentColor",strokeWidth:"2",strokeLinejoin:"round",children:l.jsx("path",{d:"M6 3h12v18l-6-3.6L6 21V3z"})}),o?"Хадгалсан":"Хадгалах"]})]})]})]}),l.jsxs("div",{className:"dt-right",children:[l.jsx("span",{className:"sp-chip on dt-genre",children:f.genre}),l.jsx("h2",{className:"dt-title",children:f.title}),l.jsxs("p",{className:"dt-artist",children:["Дуучин: ",f.artist,f.composer&&l.jsxs(l.Fragment,{children:[" · Зохиолч: ",f.composer]})]}),l.jsx("h3",{className:"st-h",children:"Энэ дуу хэрхэн мэдрэгдэх вэ?"}),l.jsx("p",{className:"dt-feel",children:p.text}),l.jsx("h3",{className:"st-h",children:"Давтамжийн спектр — 8 бүс"}),l.jsx("div",{className:"dt-bands",children:Bb.map(([y,v],g)=>l.jsxs("div",{className:"dt-band",children:[l.jsxs("div",{className:"dt-band-top",children:[l.jsx("b",{children:y}),l.jsx("span",{className:"mono",children:v}),l.jsxs("span",{className:"dt-pct",children:[m[g],"%"]})]}),l.jsx("div",{className:"dt-meter",children:l.jsx("i",{style:{width:m[g]+"%"}})})]},y))}),l.jsx("h3",{className:"st-h",children:"Чичиргээний хэв маяг"}),l.jsx("div",{className:"dt-hap","aria-label":"Чичиргээний хэв маяг",children:p.pattern.map((y,v)=>v%2===0?l.jsx("i",{style:{flex:y/h+" 0 0"},title:y+" мс чичиргээ"},v):l.jsx("u",{style:{flex:y/h+" 0 0"}},v))}),l.jsxs("p",{className:"dt-hap-lb mono",children:[p.pattern.join(" · ")," мс"]})]})]})]})}function Zi({icon:t,color:e,value:n,label:i}){return l.jsxs("div",{className:"st-card",children:[l.jsx("span",{className:"st-ico "+e,"aria-hidden":"true",children:l.jsx("svg",{width:"21",height:"21",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.9",strokeLinecap:"round",strokeLinejoin:"round",children:t})}),l.jsxs("span",{className:"st-meta",children:[l.jsx("b",{children:n}),l.jsx("span",{className:"mono",children:i})]})]})}const Vb={total:0,vib:0,byGenre:{},byTrack:{},days:{}};function Gb({stats:t,byId:e,onPlay:n,onBack:i}){const r=t||Vb,s=Object.entries(r.byGenre).sort((u,f)=>f[1]-u[1])[0],a=Object.entries(r.byTrack).sort((u,f)=>f[1]-u[1]).slice(0,5).map(([u,f])=>({t:e(isNaN(+u)?u:+u),sec:f})).filter(u=>u.t),o=[];for(let u=6;u>=0;u--){const f=new Date;f.setDate(f.getDate()-u);const p=A0(f);o.push({label:["Ня","Да","Мя","Лх","Пү","Ба","Бя"][f.getDay()],sec:r.days[p]||0,today:u===0})}const c=Math.max(1,...o.map(u=>u.sec));return l.jsxs(l.Fragment,{children:[l.jsx(Pi,{title:"Миний статистик",onBack:i}),l.jsxs("div",{className:"st-cards",children:[l.jsx(Zi,{icon:_i.phones,color:"c-aqua",value:zu(r.total),label:"Нийт сонссон"}),l.jsx(Zi,{icon:_i.vibrate,color:"c-gold",value:r.vib.toLocaleString(),label:"Мэдэрсэн чичиргээ"}),l.jsx(Zi,{icon:_i.music,color:"c-purple",value:Object.keys(r.byTrack).length,label:"Сонссон дуу"}),l.jsx(Zi,{icon:_i.star,color:"c-rose",value:s?s[0]:"—",label:"Топ төрөл"})]}),l.jsx("h3",{className:"st-h",children:"Сүүлийн 7 хоног"}),l.jsx("div",{className:"st-chart",children:o.map((u,f)=>l.jsxs("div",{className:"st-col",children:[l.jsx("span",{className:"st-val mono",children:u.sec?zu(u.sec):""}),l.jsx("i",{className:u.today?"today":"",style:{height:Math.max(3,u.sec/c*100)+"%"}}),l.jsx("span",{className:"mono"+(u.today?" st-today":""),children:u.label})]},f))}),a.length>0&&l.jsxs(l.Fragment,{children:[l.jsx("h3",{className:"st-h",children:"Хамгийн их сонссон"}),l.jsx("div",{className:"sp-list",children:a.map(({t:u,sec:f},p)=>l.jsxs("button",{className:"sp-lrow st-toprow",onClick:()=>n(u),children:[l.jsx("span",{className:"sp-lno mono",children:"0"+(p+1)}),l.jsx("img",{className:"sp-lthumb",src:u.cover,alt:""}),l.jsxs("span",{className:"sp-lmeta",children:[l.jsx("b",{children:u.title}),l.jsx("i",{children:u.artist})]}),l.jsx("span",{className:"sp-lgenre mono",children:zu(f)}),l.jsx("span",{className:"sp-lact","aria-hidden":"true",children:"▶"})]},u.id))})]}),r.total===0&&l.jsx("p",{className:"adm-empty",children:"Дуу сонсож эхлэхэд статистик энд цуглана 🎶"})]})}function Wb({allTracksCount:t,onOpenAdmin:e,onGoHome:n}){const[i,r]=L.useState(""),[s,a]=L.useState(""),o=xr().filter(h=>h.role!=="admin"),c=o.filter(h=>{var m;return(m=h.sub)==null?void 0:m.active}).length,u=o.reduce((h,m)=>h+ch(m.email).length*9900,0),f=[...o].sort((h,m)=>(m.created||0)-(h.created||0)).slice(0,5);function p(h){h.preventDefault();const m=i.trim();if(m.length<3){a("❌ Зарлалын текстээ бичнэ үү");return}lh(m,"📢"),r(""),a("✅ Зарлал бүх хэрэглэгчид илгээгдлээ"),setTimeout(()=>a(""),3e3)}return l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"ab-head",children:[l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Хяналтын самбар"}),l.jsx("h2",{className:"sp-h",style:{margin:"8px 0 0"},children:"Сайн уу, Админ 🛠"})]}),l.jsx("button",{className:"bt bt-a",onClick:e,children:"Хэрэглэгч · Дуу удирдах →"})]}),l.jsxs("div",{className:"st-cards",children:[l.jsx(Zi,{icon:_i.users,color:"c-aqua",value:o.length,label:"Нийт хэрэглэгч"}),l.jsx(Zi,{icon:_i.gem,color:"c-purple",value:c,label:"PRO захиалагч"}),l.jsx(Zi,{icon:_i.money,color:"c-gold",value:u.toLocaleString()+"₮",label:"Нийт орлого (демо)"}),l.jsx(Zi,{icon:_i.music,color:"c-rose",value:t,label:"Дууны сан"})]}),l.jsxs("div",{className:"ab-card",children:[l.jsxs("div",{className:"ab-card-h",children:[l.jsx("span",{className:"st-ico c-gold","aria-hidden":"true",children:l.jsx("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.9",strokeLinecap:"round",strokeLinejoin:"round",children:_i.horn})}),l.jsxs("div",{children:[l.jsx("b",{children:"Бүх хэрэглэгчид зарлал илгээх"}),l.jsx("p",{children:"Зарлал хэрэглэгч бүрийн хонхонд шууд очно. Дуу нэмэхэд мэдэгдэл автоматаар илгээгддэг."})]})]}),l.jsxs("form",{className:"ab-bcast",onSubmit:p,children:[l.jsx("input",{type:"text",value:i,onChange:h=>r(h.target.value),placeholder:"ж: Маргааш 20:00 цагт шинэ цомог нэмэгдэнэ!","aria-label":"Зарлалын текст"}),l.jsx("button",{type:"submit",className:"bt bt-a",children:"Илгээх"})]}),s&&l.jsx("p",{className:s.startsWith("✅")?"auth-ok":"auth-err",style:{fontSize:13},children:s})]}),l.jsx("h3",{className:"st-h",children:"Сүүлийн бүртгэлүүд"}),f.length===0?l.jsx("p",{className:"adm-empty",children:"Бүртгүүлсэн хэрэглэгч алга"}):l.jsxs("div",{className:"bil-table",children:[l.jsxs("div",{className:"bil-row bil-head ab-urow",children:[l.jsx("span",{className:"mono",children:"Хэрэглэгч"}),l.jsx("span",{className:"mono",children:"Имэйл"}),l.jsx("span",{className:"mono",children:"Огноо"}),l.jsx("span",{className:"mono",children:"Статус"})]}),f.map(h=>{var m,y;return l.jsxs("div",{className:"bil-row ab-urow",children:[l.jsxs("span",{className:"ab-uname",children:[l.jsx("i",{className:"ab-uav","aria-hidden":"true",children:(h.name||"?").charAt(0).toUpperCase()}),h.name]}),l.jsx("span",{className:"bil-mth",children:h.email}),l.jsx("span",{children:h.created?new Date(h.created).toLocaleDateString("mn-MN"):"—"}),l.jsx("span",{className:(m=h.sub)!=null&&m.active?"bil-ok":"ab-free",children:(y=h.sub)!=null&&y.active?"💎 PRO":"Үнэгүй"})]},h.email)})]}),l.jsxs("div",{className:"sp-banner",style:{marginTop:30},children:[l.jsxs("div",{children:[l.jsx("b",{children:"Тоглуулагч руу шилжих"}),l.jsx("p",{children:"Хэрэглэгчийн нүдээр аппаа туршиж, дуу сонсож, мэдрэх горимыг шалгаарай."})]}),l.jsx("button",{className:"bt",onClick:n,children:"🎧 Тоглуулагч нээх"})]})]})}function Xb({track:t,onClose:e,barsRef:n,pulseRef:i,flashRef:r}){return l.jsxs("div",{className:"sp-imm",onClick:e,role:"dialog","aria-label":"Мэдрэх горим",children:[l.jsx("img",{className:"sp-imm-bg",src:t.cover,alt:"","aria-hidden":"true"}),l.jsx("div",{className:"sp-imm-veil","aria-hidden":"true"}),l.jsx("span",{className:"sp-imm-flash",ref:r,"aria-hidden":"true"}),l.jsx("button",{className:"sp-imm-x",onClick:s=>{s.stopPropagation(),e()},"aria-label":"Мэдрэх горимоос гарах",title:"Гарах (ESC)",children:l.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",children:l.jsx("path",{d:"M6 6l12 12M18 6L6 18"})})}),l.jsxs("div",{className:"sp-imm-center",children:[l.jsx("span",{className:"sp-imm-ring",ref:i,"aria-hidden":"true"}),l.jsx("img",{className:"sp-imm-cover",src:t.cover,alt:""})]}),l.jsxs("div",{className:"sp-imm-info",children:[l.jsx("span",{className:"mono",children:"Мэдрэх горим"}),l.jsx("h2",{children:t.title}),l.jsxs("p",{children:[t.artist," · ",t.genre]})]}),l.jsx("div",{className:"sp-imm-bars","aria-hidden":"true",children:Array.from({length:28}).map((s,a)=>l.jsx("i",{ref:o=>{n.current[a]=o}},a))}),l.jsx("span",{className:"sp-imm-exit mono",children:"ESC эсвэл дэлгэц дээр дарж гарна"})]})}function $b({email:t,user:e,isAdmin:n,subscribed:i,renewDate:r,onSubscribe:s,onCancelSub:a,onBack:o}){var p,h;const c=ch(t),u=(p=e==null?void 0:e.sub)==null?void 0:p.active,f=(h=e==null?void 0:e.sub)!=null&&h.renews?Math.max(0,Math.ceil((e.sub.renews-Date.now())/864e5)):0;return l.jsxs(l.Fragment,{children:[l.jsx(Pi,{title:"Захиалгын удирдлага",onBack:o}),l.jsxs("div",{className:"bil-plan"+(u||n?" pro":""),children:[l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Идэвхтэй план"}),l.jsx("b",{children:n?"Админ — бүх эрх":u?"МЭДРЭХ PRO":e!=null&&e.sub?"PRO (цуцлагдсан)":"Үнэгүй горим"}),l.jsx("p",{children:n?"Админ эрхтэй тул төлбөр шаардлагагүй.":u?`Дараагийн төлбөр: ${r} — ${f} хоногийн дараа · 9'900₮`:e!=null&&e.sub?`${r} хүртэл эрх хадгалагдана, дараа нь үнэгүй горимд шилжинэ.`:`Дуу тус бүрээс ${Ir} секунд сонсох эрхтэй.`}),u&&!n&&l.jsx("div",{className:"bil-count","aria-label":"Дараагийн төлбөр хүртэл",children:l.jsx("i",{style:{width:Math.min(100,(30-f)/30*100)+"%"}})})]}),l.jsxs("div",{className:"bil-actions",children:[!n&&u&&l.jsx("button",{className:"sp-prof-btn danger",onClick:()=>{confirm("PRO захиалгаа цуцлах уу? "+r+" хүртэл эрх чинь хадгалагдана.")&&a()},children:"Захиалга цуцлах"}),!n&&!u&&l.jsx("button",{className:"sp-prof-btn accent",onClick:s,children:e!=null&&e.sub?"Сэргээх — 9'900₮/сар":"PRO болох — 9'900₮/сар"})]})]}),l.jsx("h3",{className:"st-h",children:"Планаа харьцуулах"}),l.jsxs("div",{className:"bil-compare",children:[l.jsxs("div",{className:"bil-ccard"+(!u&&!n?" current":""),children:[!u&&!n&&l.jsx("span",{className:"bil-badge",children:"Таны план"}),l.jsx("span",{className:"mono",children:"Үнэгүй"}),l.jsxs("b",{className:"bil-price",children:["0₮",l.jsx("i",{children:"/сар"})]}),l.jsxs("ul",{className:"bil-feats",children:[l.jsxs("li",{children:["Дуу тус бүрээс ",Ir," секунд"]}),l.jsx("li",{children:"Чичиргээ + гэрэл + визуал"}),l.jsx("li",{children:"Мэдрэхүйн калибровк"}),l.jsx("li",{children:"Дуртай / Хадгалах / Playlist"}),l.jsx("li",{className:"off",children:"Бүтэн дуу — хаалттай"}),l.jsx("li",{className:"off",children:"Олон төхөөрөмж — хаалттай"})]})]}),l.jsxs("div",{className:"bil-ccard pro"+(u||n?" current":""),children:[(u||n)&&l.jsx("span",{className:"bil-badge",children:"Идэвхтэй"}),l.jsx("span",{className:"mono",children:"МЭДРЭХ PRO"}),l.jsxs("b",{className:"bil-price",children:["9'900₮",l.jsx("i",{children:"/сар"})]}),l.jsxs("ul",{className:"bil-feats",children:[l.jsx("li",{children:"Бүх дуу бүрэн, хязгааргүй"}),l.jsx("li",{children:"Олон төхөөрөмж (gamepad, хантааз)"}),l.jsx("li",{children:"Өндөр нарийвчлалтай хаптик"}),l.jsx("li",{children:"Шинэ дуунд эрт хандах"}),l.jsx("li",{children:"Реклам-гүй туршлага"}),l.jsx("li",{children:"Мэдрэх горим бүрэн нээлттэй"})]}),!n&&!u&&l.jsx("button",{className:"bt bt-a bil-ccta",onClick:s,children:e!=null&&e.sub?"Сэргээх →":"PRO болох →"})]})]}),l.jsx("h3",{className:"st-h",children:"Төлбөрийн түүх"}),c.length===0?l.jsx("p",{className:"adm-empty",children:"Төлбөрийн түүх хоосон байна"}):l.jsxs("div",{className:"bil-table",children:[l.jsxs("div",{className:"bil-row bil-head",children:[l.jsx("span",{className:"mono",children:"Огноо"}),l.jsx("span",{className:"mono",children:"План"}),l.jsx("span",{className:"mono",children:"Төлбөрийн хэрэгсэл"}),l.jsx("span",{className:"mono",children:"Дүн"}),l.jsx("span",{className:"mono",children:"Төлөв"})]}),c.map(m=>l.jsxs("div",{className:"bil-row",children:[l.jsx("span",{children:new Date(m.date).toLocaleDateString("mn-MN")}),l.jsx("span",{children:m.plan}),l.jsx("span",{className:"bil-mth",children:m.method}),l.jsx("span",{children:l.jsx("b",{children:m.amount})}),l.jsxs("span",{className:"bil-ok",children:["✓ ",m.status]})]},m.id))]}),l.jsx("p",{className:"auth-note mono",style:{textAlign:"left"},children:"Демо горим — Stripe test. Жинхэнэ мөнгө шилжээгүй."})]})}function Zd({id:t,row:e,active:n,onToggle:i}){return l.jsx("span",{className:"sp-like"+(e?" sp-like-row":"")+(n?" on":""),role:"button",tabIndex:0,"aria-label":n?"Дуртайгаас хасах":"Дуртайд нэмэх",onClick:r=>{r.stopPropagation(),i()},onKeyDown:r=>{r.key==="Enter"&&(r.stopPropagation(),i())},children:n?"♥":"♡"})}function Qd({id:t,row:e,active:n,onToggle:i}){return l.jsx("span",{className:"sp-like"+(e?" sp-like-row sp-save-row":" sp-save")+(n?" on":""),role:"button",tabIndex:0,"aria-label":n?"Хадгалснаас хасах":"Хадгалах",onClick:r=>{r.stopPropagation(),i()},onKeyDown:r=>{r.key==="Enter"&&(r.stopPropagation(),i())},children:l.jsx("svg",{width:e?14:15,height:e?14:15,viewBox:"0 0 24 24",fill:n?"currentColor":"none",stroke:"currentColor",strokeWidth:"2",strokeLinejoin:"round",children:l.jsx("path",{d:"M6 3h12v18l-6-3.6L6 21V3z"})})})}function Jd({t,row:e,onInfo:n}){return l.jsx("span",{className:"sp-like sp-info"+(e?" sp-like-row":""),role:"button",tabIndex:0,"aria-label":t.title+" — дэлгэрэнгүй",onClick:i=>{i.stopPropagation(),n()},onKeyDown:i=>{i.key==="Enter"&&(i.stopPropagation(),n())},children:"ⓘ"})}function qb({genres:t,genre:e,onGenre:n,list:i,query:r,curId:s,playing:a,onPlay:o,likes:c,saves:u,onToggleLike:f,onToggleSave:p,onInfo:h,subscribed:m,onSubscribe:y}){return l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"sp-chips",children:t.map(v=>l.jsx("button",{className:"sp-chip"+(e===v?" on":""),onClick:()=>n(v),children:v},v))}),l.jsx("h2",{className:"sp-h",children:"Тренд дуунууд"}),i.length===0&&l.jsxs("p",{className:"adm-empty",children:['"',r,'" — олдсонгүй']}),l.jsx("div",{className:"sp-grid",children:i.map(v=>{const g=s===v.id;return l.jsxs("button",{className:"sp-card"+(g?" on":""),onClick:()=>o(v),children:[l.jsxs("span",{className:"sp-cover",children:[l.jsx("img",{src:v.cover,alt:"",loading:"lazy"}),l.jsx(Zd,{id:v.id,active:c.includes(v.id),onToggle:()=>f(v.id)}),l.jsx(Qd,{id:v.id,active:u.includes(v.id),onToggle:()=>p(v.id)}),l.jsx(Jd,{t:v,onInfo:()=>h(v)}),l.jsx("span",{className:"sp-playbtn"+(g&&a?" show":""),"aria-hidden":"true",children:g&&a?"⏸":"▶"}),g&&a&&l.jsxs("span",{className:"pl-eq sp-eq","aria-hidden":"true",children:[l.jsx("u",{}),l.jsx("u",{}),l.jsx("u",{})]})]}),l.jsxs("b",{children:[v.title,v.custom&&l.jsx("em",{className:"sp-new",children:" шинэ"})]}),l.jsxs("i",{children:[v.artist," · ",v.genre]})]},v.id)})}),i.length>0&&l.jsxs(l.Fragment,{children:[l.jsx("h2",{className:"sp-h sp-h2",children:"Бүх дуунууд"}),l.jsx("div",{className:"sp-list",children:i.map((v,g)=>{const d=s===v.id;return l.jsxs("button",{className:"sp-lrow"+(d?" on":""),onClick:()=>o(v),children:[l.jsx("span",{className:"sp-lno mono",children:String(g+1).padStart(2,"0")}),l.jsx("img",{className:"sp-lthumb",src:v.cover,alt:"",loading:"lazy"}),l.jsxs("span",{className:"sp-lmeta",children:[l.jsxs("b",{children:[v.title,v.custom&&l.jsx("em",{className:"sp-new",children:" шинэ"})]}),l.jsx("i",{children:v.artist})]}),l.jsx("span",{className:"sp-lgenre mono",children:v.genre}),l.jsx(Zd,{id:v.id,row:!0,active:c.includes(v.id),onToggle:()=>f(v.id)}),l.jsx(Qd,{id:v.id,row:!0,active:u.includes(v.id),onToggle:()=>p(v.id)}),l.jsx(Jd,{t:v,row:!0,onInfo:()=>h(v)}),l.jsx("span",{className:"sp-lact","aria-hidden":"true",children:d&&a?l.jsxs("span",{className:"pl-eq",style:{height:14},children:[l.jsx("u",{}),l.jsx("u",{}),l.jsx("u",{})]}):"▶"})]},v.id)})})]})]})}function Vu({title:t,tracks:e,curId:n,playing:i,onPlay:r,likes:s,saves:a,onToggleLike:o,onToggleSave:c,onInfo:u,onBack:f,emptyIcon:p="🎵",emptyTitle:h="Хоосон байна",emptyHint:m}){const y=()=>{e[0]&&r(e[0])};return l.jsxs(l.Fragment,{children:[l.jsx(Pi,{title:t,onBack:f}),e.length===0?l.jsx(Kd,{icon:p,title:h,hint:m}):l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"plv-openhead",children:[l.jsxs("span",{className:"mono",children:[e.length," дуу"]}),l.jsx("div",{className:"plv-openact",children:l.jsx("button",{className:"bt bt-a",onClick:y,children:"▶ Бүгдийг тоглуулах"})})]}),l.jsx("div",{className:"sp-list",children:e.map((v,g)=>{const d=n===v.id;return l.jsxs("button",{className:"sp-lrow"+(d?" on":""),onClick:()=>r(v),children:[l.jsx("span",{className:"sp-lno mono",children:String(g+1).padStart(2,"0")}),l.jsx("img",{className:"sp-lthumb",src:v.cover,alt:"",loading:"lazy"}),l.jsxs("span",{className:"sp-lmeta",children:[l.jsxs("b",{children:[v.title,v.custom&&l.jsx("em",{className:"sp-new",children:" шинэ"})]}),l.jsx("i",{children:v.artist})]}),l.jsx("span",{className:"sp-lgenre mono",children:v.genre}),l.jsx(Zd,{id:v.id,row:!0,active:s.includes(v.id),onToggle:()=>o(v.id)}),l.jsx(Qd,{id:v.id,row:!0,active:a.includes(v.id),onToggle:()=>c(v.id)}),l.jsx(Jd,{t:v,row:!0,onInfo:()=>u(v)}),l.jsx("span",{className:"sp-lact","aria-hidden":"true",children:d&&i?l.jsxs("span",{className:"pl-eq",style:{height:14},children:[l.jsx("u",{}),l.jsx("u",{}),l.jsx("u",{})]}):"▶"})]},v.id)})})]})]})}const Yb=[["bass","Бас"],["mid","Дунд"],["high","Өндөр"]];function Kb({open:t,track:e,prefs:n,onToggleBand:i,vibro:r,onToggleVibro:s,onImmersive:a,onClose:o,barsRef:c}){if(!t||!e)return null;const u=dh[e.genre]||fh,f=u.pattern.reduce((p,h)=>p+h,0);return l.jsx("div",{className:"sp-np",role:"dialog","aria-label":"Мэдрэх самбар",children:l.jsxs("div",{className:"sp-np-inner",children:[l.jsxs("div",{className:"sp-np-head",children:[l.jsx("span",{className:"mono",children:"Мэдрэх самбар — амьд"}),l.jsx("button",{className:"sp-np-x",onClick:o,"aria-label":"Самбар хаах",children:l.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:l.jsx("path",{d:"M6 9l6 6 6-6"})})})]}),l.jsxs("div",{className:"sp-np-body",children:[l.jsxs("div",{className:"sp-np-track",children:[l.jsx("img",{src:e.cover,alt:""}),l.jsxs("div",{children:[l.jsx("b",{children:e.title}),l.jsxs("i",{children:[e.artist," · ",e.genre]})]})]}),l.jsx("div",{className:"sp-np-meter","aria-label":"Амьд давтамжийн спектр",children:Array.from({length:8}).map((p,h)=>l.jsx("span",{ref:m=>{c.current[h]=m}},h))}),l.jsxs("div",{className:"sp-np-side",children:[l.jsx("span",{className:"mono",children:"Чичиргээний хэв маяг"}),l.jsx("div",{className:"dt-hap sp-np-hap","aria-hidden":"true",children:u.pattern.map((p,h)=>h%2===0?l.jsx("i",{style:{flex:p/f+" 0 0"}},h):l.jsx("u",{style:{flex:p/f+" 0 0"}},h))}),l.jsx("span",{className:"mono",children:"Мэдрэх бүс"}),l.jsx("div",{className:"sp-bands sp-np-bands",children:Yb.map(([p,h])=>l.jsxs("button",{className:n.bands[p]?"on":"",onClick:()=>i(p),"aria-pressed":n.bands[p],children:[n.bands[p]?"✓ ":"",h]},p))}),l.jsxs("div",{className:"sp-np-actions",children:[l.jsxs("button",{className:"sp-vibro"+(r?" on":""),onClick:s,"aria-pressed":r,children:["📳 ",r?"Асаалттай":"Унтраалттай"]}),l.jsx("button",{className:"bt bt-a",onClick:a,children:"⛶ Мэдрэх горим"})]})]})]})]})})}function Zb({open:t,onClose:e,user:n,subscribed:i,onSubscribe:r,isAdmin:s,onAdmin:a,onLogout:o,onCancelSub:c}){var te;const[u,f]=L.useState("home"),[p,h]=L.useState(null),[m,y]=L.useState(""),[v,g]=L.useState("Бүгд"),[d,x]=L.useState([]),[_,E]=L.useState([]),[R,A]=L.useState([]),[C,b]=L.useState([]),[S,M]=L.useState(null),[P,X]=L.useState(!1),[j,ne]=L.useState(0),[$,Z]=L.useState(0),[ee,k]=L.useState(!0),[ie,re]=L.useState(!1),[ue,Pe]=L.useState(ya),[tt,q]=L.useState(!1),[ae,ve]=L.useState(!1),[ge,we]=L.useState(!1),[ke,He]=L.useState(!1),[F,qe]=L.useState([]),[Ye,ct]=L.useState(0),[Be,Ke]=L.useState(!1),[Xe,Ve]=L.useState(!1),[gt,N]=L.useState(!1),[,w]=L.useState(0),H=L.useRef(null),se=L.useRef(null),oe=L.useRef(null),le=L.useRef(null),De=L.useRef({lo:0,mi:0,hi:0}),xe=L.useRef(ue),Se=L.useRef(null),Ie=L.useRef(null),pe=L.useRef([]),Re=L.useRef([]),$e=L.useRef(null),ze=L.useRef(null),Ee=L.useRef([]),We=L.useRef(!1);xe.current=ue;const Ge=typeof navigator<"u"&&!!navigator.vibrate,Ze=(n==null?void 0:n.email)||"",U="medreh_likes:"+Ze,Me="medreh_saves:"+Ze,Y="medreh_prefs:"+Ze;L.useEffect(()=>{if(Ze){try{E(JSON.parse(localStorage.getItem(U))||[])}catch{E([])}try{A(JSON.parse(localStorage.getItem(Me))||[])}catch{A([])}try{const I=JSON.parse(localStorage.getItem(Y));Pe(I?{...ya,...I,bands:{...ya.bands,...I.bands}}:ya)}catch{Pe(ya)}Ie.current=xb(Ze),ct(gb(Ze)),q(!0)}},[U,Me,Y,Ze]),L.useEffect(()=>{t&&tt&&!ue.calibrated&&!We.current&&!s&&(We.current=!0,N(!0))},[t,tt,ue.calibrated,s]),L.useEffect(()=>{t&&f(s?"admin":"home")},[t,s]),L.useEffect(()=>{const I=()=>w(W=>W+1);return addEventListener("medreh:users-changed",I),()=>removeEventListener("medreh:users-changed",I)},[]),L.useEffect(()=>{if(!t)return;let I=!0;const W=[];async function J(){const be=Ua(),Ae=[];for(const Le of be){const rt=await eg("audio-"+Le.id).catch(()=>null);if(!rt)continue;const st=URL.createObjectURL(rt);W.push(st);let Et=null;if(Le.hasCover){const nt=await eg("cover-"+Le.id).catch(()=>null);nt&&(Et=URL.createObjectURL(nt),W.push(Et))}Ae.push({id:Le.id,title:Le.title,artist:Le.singer||Le.artist||"Тодорхойгүй",composer:Le.composer||"",genre:Le.genre,file:st,cover:Et||Le.coverUrl||Bu[Math.abs(Le.title.length)%Bu.length].cover,custom:!0})}I&&b(Ae)}J();const de=()=>J();return addEventListener("medreh:library-changed",de),()=>{I=!1,removeEventListener("medreh:library-changed",de),W.forEach(be=>URL.revokeObjectURL(be))}},[t]),L.useEffect(()=>{if(!t)return;qe(nc());const I=()=>qe(nc());return addEventListener("medreh:feed-changed",I),addEventListener("storage",I),()=>{removeEventListener("medreh:feed-changed",I),removeEventListener("storage",I)}},[t]);const Q=F.filter(I=>I.date>Ye).length;function me(){const I=!ke;He(I),ve(!1),we(!1),I&&Ze&&(vb(Ze),setTimeout(()=>ct(Date.now()),600))}function je(I){E(W=>{const J=W.includes(I)?W.filter(de=>de!==I):[I,...W];return localStorage.setItem(U,JSON.stringify(J)),J})}function et(I){A(W=>{const J=W.includes(I)?W.filter(de=>de!==I):[I,...W];return localStorage.setItem(Me,JSON.stringify(J)),J})}function ut(I){Pe(W=>{const J={...W,...I,bands:{...W.bands,...I.bands||{}}};return!J.bands.bass&&!J.bands.mid&&!J.bands.high?W:(localStorage.setItem(Y,JSON.stringify(J)),J)})}function _t(){if(se.current){se.current.ctx.resume();return}const I=new(window.AudioContext||window.webkitAudioContext),W=I.createMediaElementSource(H.current),J=I.createAnalyser();J.fftSize=256,J.smoothingTimeConstant=.7,W.connect(J),J.connect(I.destination),se.current={ctx:I,an:J,data:new Uint8Array(J.frequencyBinCount)}}function at(I,W,J){oe.current||(oe.current=new(window.AudioContext||window.webkitAudioContext));const de=oe.current;de.state==="suspended"&&de.resume();const be=de.createOscillator(),Ae=de.createGain();be.type=J,be.frequency.value=I,Ae.gain.setValueAtTime(0,de.currentTime),Ae.gain.linearRampToValueAtTime(.45,de.currentTime+.02),Ae.gain.exponentialRampToValueAtTime(1e-4,de.currentTime+W),be.connect(Ae),Ae.connect(de.destination),be.start(),be.stop(de.currentTime+W+.05)}if(L.useEffect(()=>{if(!t)return;let I,W;const J=()=>{I=requestAnimationFrame(J);const de=se.current,be=xe.current,Ae=sg[be.light].mult;if(de&&P){de.an.getByteFrequencyData(de.data);const Le=de.data.length,rt=Math.floor(Le*.08),st=Math.floor(Le*.38);let Et=0,nt=0,Fe=0,mt;for(mt=0;mt<rt;mt++)Et+=de.data[mt];for(mt=rt;mt<st;mt++)nt+=de.data[mt];for(mt=st;mt<Le;mt++)Fe+=de.data[mt];Et/=rt*255,nt/=(st-rt)*255,Fe/=(Le-st)*255,De.current={lo:Et,mi:nt,hi:Fe};const ot=Math.max(be.bands.bass?Et:0,be.bands.mid?nt:0,be.bands.high?Fe:0);le.current&&(le.current.style.opacity=Math.min(1,(.1+ot*.7)*Ae).toFixed(3),le.current.style.transform="translate(-50%,-50%) scale("+(1+ot*.5*Ae).toFixed(3)+")"),pe.current.forEach((zt,Bn)=>{if(!zt)return;const an=de.data[Math.floor(Bn/pe.current.length*Le*.7)]/255;zt.style.height=Math.max(3,an*22)+"px"}),Re.current.forEach((zt,Bn)=>{if(!zt)return;const an=de.data[Math.floor(Bn/Re.current.length*Le*.72)]/255;zt.style.height=Math.max(2,an*100*Math.min(1.2,Ae))+"%"}),$e.current&&($e.current.style.transform="scale("+(1+ot*.9*Ae).toFixed(3)+")",$e.current.style.opacity=Math.min(1,.25+ot*.85*Ae).toFixed(3)),ze.current&&(ze.current.style.opacity=Et>.5?Math.min(.55,(Et-.5)*1.8*Ae).toFixed(3):"0"),Ee.current.forEach((zt,Bn)=>{if(!zt)return;const an=Ee.current.length,_r=Math.floor(Bn/an*Le*.72),Nt=Math.max(_r+1,Math.floor((Bn+1)/an*Le*.72));let zn=0;for(let yr=_r;yr<Nt;yr++)zn+=de.data[yr];zt.style.height=Math.max(5,zn/(Nt-_r)/255*100)+"%"})}else pe.current.forEach(Le=>{Le&&(Le.style.height="3px")}),ze.current&&(ze.current.style.opacity="0"),Ee.current.forEach(Le=>{Le&&(Le.style.height="5px")})};return J(),Ge&&(W=setInterval(()=>{if(!P||!ee)return;const{lo:de,mi:be,hi:Ae}=De.current,Le=xe.current,rt=rg[Le.vib].mult;let st=!1;Le.bands.bass&&de>.45?(navigator.vibrate(Math.round((60+de*80)*rt)),st=!0):Le.bands.mid&&be>.35?(navigator.vibrate([Math.round(30*rt),30,Math.round(30*rt)]),st=!0):Le.bands.high&&Ae>.3&&(navigator.vibrate(Math.max(8,Math.round(12*rt))),st=!0),st&&Ie.current&&Ie.current.vib++},170)),()=>{cancelAnimationFrame(I),clearInterval(W),Ge&&navigator.vibrate(0)}},[t,P,ee,Ge]),L.useEffect(()=>{if(!t||!P||!Ze)return;let I=0;const W=setInterval(()=>{const J=Ie.current,de=Se.current;if(!J||!de)return;J.total++,J.byGenre[de.genre]=(J.byGenre[de.genre]||0)+1,J.byTrack[de.id]=(J.byTrack[de.id]||0)+1;const be=A0();J.days[be]=(J.days[be]||0)+1,++I%5===0&&ig(Ze,J)},1e3);return()=>{clearInterval(W),Ie.current&&ig(Ze,Ie.current)}},[t,P,Ze]),L.useEffect(()=>{const I=H.current;if(!I)return;const W=()=>{ne(I.currentTime),!i&&I.currentTime>=Ir&&(I.pause(),re(!0))},J=()=>Z(I.duration),de=()=>X(!0),be=()=>X(!1),Ae=()=>On();return I.addEventListener("timeupdate",W),I.addEventListener("loadedmetadata",J),I.addEventListener("play",de),I.addEventListener("pause",be),I.addEventListener("ended",Ae),()=>{I.removeEventListener("timeupdate",W),I.removeEventListener("loadedmetadata",J),I.removeEventListener("play",de),I.removeEventListener("pause",be),I.removeEventListener("ended",Ae)}}),L.useEffect(()=>{if(!t&&H.current&&H.current.pause(),document.body.classList.toggle("native-cursor",t),!t)return;const I=W=>{if(W.key==="Escape"){if(Be){Ke(!1);return}if(Xe){Ve(!1);return}if(ae||ge||ke){ve(!1),we(!1),He(!1);return}if(!gt){if(u!=="home"){f("home");return}e()}}};return addEventListener("keydown",I),()=>{removeEventListener("keydown",I),document.body.classList.remove("native-cursor")}},[t,e,Be,Xe,ae,ge,ke,u,gt]),L.useEffect(()=>()=>{oe.current&&oe.current.close().catch(()=>{})},[]),!t)return null;const V=[...Bu,...C],ce=["Бүгд",...new Set(V.map(I=>I.genre))],fe=V.filter(I=>{if(v!=="Бүгд"&&I.genre!==v)return!1;const W=m.trim().toLowerCase();return W?(I.title+" "+I.artist+" "+I.genre).toLowerCase().includes(W):!0}),_e=I=>V.find(W=>W.id===I),Oe=d.map(_e).filter(Boolean),Ce=_.map(_e).filter(Boolean),ye=R.map(_e).filter(Boolean);function K(I){const W=H.current;if(_t(),re(!1),(S==null?void 0:S.id)===I.id){P?W.pause():W.play();return}M(I),Se.current=I,x(J=>[I.id,...J.filter(de=>de!==I.id)].slice(0,6)),W.src=I.file,W.play()}function Ue(){if(!S){fe[0]&&K(fe[0]);return}_t();const I=H.current;if(P)I.pause();else{if(ie)return;I.play()}}function vt(I){const W=H.current;if(!W||!S)return;let J=Math.max(0,W.currentTime+I);i||(J=Math.min(J,Ir-1)),W.currentTime=Math.min(J,(W.duration||1)-.5)}function Lt(I){const W=H.current;if(!W||!S||!$)return;const J=I.currentTarget.getBoundingClientRect();let de=(I.clientX-J.left)/J.width*$;i||(de=Math.min(de,Ir-1)),W.currentTime=de}function ci(I){if(!S)return;const W=V.findIndex(de=>de.id===S.id),J=V[(W+I+V.length)%V.length];K(J)}function On(){ci(1)}function Tn(I){h(I),f("detail")}function T(I){const W=dh[I.genre]||fh;if(Ge)try{navigator.vibrate(W.pattern)}catch{}const J=W.bass>=W.mid&&W.bass>=W.high?[55,.7,"sine"]:W.mid>=W.high?[330,.45,"triangle"]:[1500,.3,"square"];at(J[0],J[1],J[2])}const B=$?j/$*100:0,z=$&&!i?Math.min(100,Ir/$*100):100,O=((n==null?void 0:n.name)||"?").trim().charAt(0).toUpperCase(),D=(te=n==null?void 0:n.sub)!=null&&te.renews?new Date(n.sub.renews).toLocaleDateString("mn-MN"):null;return l.jsxs("div",{className:"pl-ov sp",children:[l.jsx("audio",{ref:H,crossOrigin:"anonymous"}),l.jsx("div",{className:"pl-glow",ref:le,"aria-hidden":"true"}),l.jsxs("header",{className:"sp-top",children:[l.jsxs("span",{className:"sp-logo",children:["МЭДРЭХ",l.jsx("sup",{children:"®"}),s&&l.jsx("em",{className:"sp-admchip",children:"АДМИН"})]}),l.jsxs("div",{className:"sp-center",children:[l.jsx("button",{className:"sp-icbtn"+(u==="home"?" on":""),onClick:()=>f("home"),"aria-label":"Нүүр",title:"Нүүр",children:l.jsxs("svg",{width:"19",height:"19",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("path",{d:"M3 10.5 12 3l9 7.5"}),l.jsx("path",{d:"M5 9.5V21h14V9.5"})]})}),l.jsxs("div",{className:"sp-search",children:[l.jsxs("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round","aria-hidden":"true",children:[l.jsx("circle",{cx:"11",cy:"11",r:"7"}),l.jsx("line",{x1:"21",y1:"21",x2:"16.5",y2:"16.5"})]}),l.jsx("input",{type:"search",placeholder:"Юу сонсмоор байна?",value:m,onFocus:()=>f("home"),onChange:I=>y(I.target.value),"aria-label":"Дуу хайх"})]}),l.jsx("div",{className:"sp-viz","aria-hidden":"true",children:[0,1,2,3,4].map(I=>l.jsx("i",{ref:W=>{pe.current[I]=W}},I))})]}),l.jsxs("div",{className:"sp-right",children:[!i&&l.jsx("button",{className:"bt bt-a sp-subbtn",onClick:r,children:"Захиалга авах"}),s&&l.jsx("button",{className:"sp-icbtn sp-admbtn"+(u==="admin"?" on":""),onClick:()=>f("admin"),"aria-label":"Хяналтын самбар",title:"Хяналтын самбар",children:l.jsxs("svg",{width:"19",height:"19",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("rect",{x:"3",y:"3",width:"7",height:"9",rx:"1.5"}),l.jsx("rect",{x:"14",y:"3",width:"7",height:"5",rx:"1.5"}),l.jsx("rect",{x:"14",y:"12",width:"7",height:"9",rx:"1.5"}),l.jsx("rect",{x:"3",y:"16",width:"7",height:"5",rx:"1.5"})]})}),l.jsxs("div",{className:"sp-dd-wrap",children:[l.jsxs("button",{className:"sp-icbtn sp-bell"+(ke?" on":""),onClick:me,"aria-label":"Мэдэгдэл"+(Q?" — "+Q+" шинэ":""),"aria-expanded":ke,title:"Мэдэгдэл",children:[l.jsxs("svg",{width:"19",height:"19",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("path",{d:"M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"}),l.jsx("path",{d:"M13.7 21a2 2 0 0 1-3.4 0"})]}),Q>0&&l.jsx("span",{className:"sp-bell-n",children:Q>9?"9+":Q})]}),ke&&l.jsxs("div",{className:"sp-dd sp-notifs",role:"dialog","aria-label":"Мэдэгдлүүд",children:[l.jsx("span",{className:"mono",children:"Мэдэгдэл"}),F.length===0&&l.jsx("p",{className:"sp-side-empty",children:"Мэдэгдэл алга"}),F.map(I=>l.jsxs("div",{className:"sp-notif"+(I.date>Ye?" new":""),children:[l.jsx("span",{className:"sp-notif-ic","aria-hidden":"true",children:I.icon}),l.jsxs("div",{children:[l.jsx("p",{children:I.text}),l.jsx("span",{className:"mono",children:Ab(I.date)})]})]},I.id))]})]}),l.jsxs("div",{className:"sp-dd-wrap",children:[l.jsx("button",{className:"sp-icbtn"+(ae?" on":""),onClick:()=>{ve(!ae),we(!1),He(!1)},"aria-label":"Мэдрэхүйн тохиргоо","aria-expanded":ae,title:"Мэдрэхүйн тохиргоо",children:l.jsxs("svg",{width:"19",height:"19",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("circle",{cx:"12",cy:"12",r:"3"}),l.jsx("path",{d:"M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.11-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1.11 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.09a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.09a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z"})]})}),ae&&l.jsxs("div",{className:"sp-dd sp-settings",role:"dialog","aria-label":"Мэдрэхүйн тохиргоо",children:[l.jsx("span",{className:"mono",children:"Мэдрэхүйн тохиргоо"}),l.jsx("label",{className:"sp-set-l",children:"📳 Чичиргээний хүч"}),l.jsx("div",{className:"sp-seg",children:rg.map((I,W)=>l.jsx("button",{className:ue.vib===W?"on":"",onClick:()=>ut({vib:W}),children:I.label},I.label))}),l.jsx("label",{className:"sp-set-l",children:"💡 Гэрлийн эрчим"}),l.jsx("div",{className:"sp-seg",children:sg.map((I,W)=>l.jsx("button",{className:ue.light===W?"on":"",onClick:()=>ut({light:W}),children:I.label},I.label))}),l.jsx("label",{className:"sp-set-l",children:"🎚 Мэдрэх давтамжийн бүс"}),l.jsx("div",{className:"sp-bands",children:[["bass","Бас"],["mid","Дунд"],["high","Өндөр"]].map(([I,W])=>l.jsxs("button",{className:ue.bands[I]?"on":"",onClick:()=>ut({bands:{[I]:!ue.bands[I]}}),"aria-pressed":ue.bands[I],children:[ue.bands[I]?"✓ ":"",W]},I))}),l.jsx("button",{className:"sp-prof-btn",onClick:()=>{ve(!1),N(!0)},children:"🎛 Калибровк дахин хийх"}),l.jsx("p",{className:"sp-set-note",children:"Сонсголын мэдрэмж хүн бүрд өөр — тохиргоо автоматаар хадгалагдана."})]})]}),l.jsxs("div",{className:"sp-dd-wrap",children:[l.jsx("button",{className:"sp-avatar"+(s?" adm":"")+(ge?" on":""),onClick:()=>{we(!ge),ve(!1),He(!1)},"aria-label":"Профайл цэс","aria-expanded":ge,title:n==null?void 0:n.name,children:O}),ge&&l.jsxs("div",{className:"sp-dd sp-profile",role:"dialog","aria-label":"Профайл",children:[l.jsxs("div",{className:"sp-prof-top",children:[l.jsx("span",{className:"sp-avatar sp-avatar-lg","aria-hidden":"true",children:O}),l.jsxs("div",{children:[l.jsx("b",{children:n==null?void 0:n.name}),l.jsx("i",{children:n==null?void 0:n.email})]})]}),l.jsx("div",{className:"sp-prof-sub"+(i?" pro":""),children:s?l.jsxs(l.Fragment,{children:[l.jsx("b",{children:"Админ эрх"}),l.jsx("span",{children:"Бүх боломж нээлттэй"})]}):i?l.jsxs(l.Fragment,{children:[l.jsx("b",{children:"PRO идэвхтэй"}),l.jsxs("span",{children:["Дараагийн төлбөр: ",D]})]}):l.jsxs(l.Fragment,{children:[l.jsx("b",{children:"Үнэгүй горим"}),l.jsxs("span",{children:["Дуу тус бүрээс ",Ir," сек"]})]})}),l.jsx("button",{className:"sp-prof-btn",onClick:()=>{we(!1),f("profile")},children:"👤 Профайл засах"}),l.jsx("button",{className:"sp-prof-btn",onClick:()=>{we(!1),f("playlists")},children:"🎧 Миний жагсаалт"}),l.jsx("button",{className:"sp-prof-btn",onClick:()=>{we(!1),f("devices")},children:"📱 Төхөөрөмж холбох"}),l.jsx("button",{className:"sp-prof-btn",onClick:()=>{we(!1),f("stats")},children:"📊 Миний статистик"}),l.jsx("button",{className:"sp-prof-btn",onClick:()=>{we(!1),f("billing")},children:"💳 Захиалга удирдах"}),l.jsx("button",{className:"sp-prof-btn",onClick:()=>{we(!1),f("help")},children:"❓ Тусламж"}),s&&l.jsx("button",{className:"sp-prof-btn",onClick:()=>{we(!1),f("admin")},children:"🛠 Хяналтын самбар"}),l.jsx("button",{className:"sp-prof-btn danger",onClick:o,children:"Гарах"})]})]}),l.jsx("button",{className:"auth-x pl-x",onClick:e,"aria-label":"Хаах",children:"✕"})]})]}),(ae||ge||ke)&&l.jsx("div",{className:"sp-dd-veil",onClick:()=>{ve(!1),we(!1),He(!1)}}),l.jsxs("div",{className:"sp-shell",children:[l.jsxs("aside",{className:"sp-side",children:[l.jsxs("nav",{className:"sp-navcol","aria-label":"Үндсэн цэс",children:[l.jsxs("button",{className:"sp-navitem"+(u==="home"?" on":""),onClick:()=>f("home"),children:[l.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("path",{d:"M3 10.5 12 3l9 7.5"}),l.jsx("path",{d:"M5 9.5V21h14V9.5"})]}),"Нүүр"]}),l.jsxs("button",{className:"sp-navitem"+(u==="playlists"?" on":""),onClick:()=>f("playlists"),children:[l.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("path",{d:"M3 14v-2a9 9 0 0 1 18 0v2"}),l.jsx("rect",{x:"3",y:"14",width:"4",height:"6",rx:"2"}),l.jsx("rect",{x:"17",y:"14",width:"4",height:"6",rx:"2"})]}),"Жагсаалт"]}),l.jsxs("button",{className:"sp-navitem"+(u==="stats"?" on":""),onClick:()=>f("stats"),children:[l.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("path",{d:"M3 3v18h18"}),l.jsx("path",{d:"M8 17v-5M13 17V9M18 17v-8"})]}),"Статистик"]}),l.jsxs("button",{className:"sp-navitem"+(u==="billing"?" on":""),onClick:()=>f("billing"),children:[l.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("rect",{x:"2",y:"5",width:"20",height:"14",rx:"2"}),l.jsx("path",{d:"M2 10h20"})]}),"Захиалга"]})]}),l.jsx("div",{className:"sp-navdiv","aria-hidden":"true"}),l.jsxs("button",{className:"mono sp-side-h sp-side-hbtn",onClick:()=>f("liked"),children:[l.jsx("svg",{className:"sp-side-ic ic-love",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",children:l.jsx("path",{d:"M12 21s-7.5-4.9-10-9.2C.3 8.6 2 5 5.5 5c2 0 3.4 1.1 4.2 2.3L12 9.6l2.3-2.3C15.1 6.1 16.5 5 18.5 5 22 5 23.7 8.6 22 11.8 19.5 16.1 12 21 12 21z"})}),"Дуртай дуунууд",l.jsx("span",{className:"sp-side-more","aria-hidden":"true",children:"→"})]}),Ce.length===0?l.jsxs("div",{className:"sp-empty-tile",children:[l.jsx("span",{className:"sp-empty-ic","aria-hidden":"true",children:l.jsx("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"currentColor",children:l.jsx("path",{d:"M12 21s-7.5-4.9-10-9.2C.3 8.6 2 5 5.5 5c2 0 3.4 1.1 4.2 2.3L12 9.6l2.3-2.3C15.1 6.1 16.5 5 18.5 5 22 5 23.7 8.6 22 11.8 19.5 16.1 12 21 12 21z"})})}),l.jsxs("p",{children:["Дууны ",l.jsxs("b",{children:[l.jsx("svg",{className:"sp-inl-ic ic-love",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",children:l.jsx("path",{d:"M12 21s-7.5-4.9-10-9.2C.3 8.6 2 5 5.5 5c2 0 3.4 1.1 4.2 2.3L12 9.6l2.3-2.3C15.1 6.1 16.5 5 18.5 5 22 5 23.7 8.6 22 11.8 19.5 16.1 12 21 12 21z"})})," зүрхэн"]})," дээр дарахад дуртай дуу чинь энд цуглана"]})]}):l.jsx(ju,{tracks:Ce,curId:S==null?void 0:S.id,playing:P,onPlay:K}),l.jsxs("button",{className:"mono sp-side-h sp-side-hbtn",onClick:()=>f("saved"),children:[l.jsx("svg",{className:"sp-side-ic ic-save",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",children:l.jsx("path",{d:"M6 3h12v18l-6-3.6L6 21V3z"})}),"Хадгалсан",l.jsx("span",{className:"sp-side-more","aria-hidden":"true",children:"→"})]}),ye.length===0?l.jsxs("div",{className:"sp-empty-tile",children:[l.jsx("span",{className:"sp-empty-ic sp-empty-warm","aria-hidden":"true",children:l.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"currentColor",children:l.jsx("path",{d:"M6 2h12a1 1 0 0 1 1 1v19l-7-4.2L5 22V3a1 1 0 0 1 1-1z"})})}),l.jsxs("p",{children:["Дууг ",l.jsxs("b",{children:[l.jsx("svg",{className:"sp-inl-ic ic-save",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",children:l.jsx("path",{d:"M6 3h12v18l-6-3.6L6 21V3z"})})," хадгалах"]})," товчоор тэмдэглээд дараа нь сонсоорой"]})]}):l.jsx(ju,{tracks:ye,curId:S==null?void 0:S.id,playing:P,onPlay:K}),Oe.length>0&&l.jsxs(l.Fragment,{children:[l.jsxs("button",{className:"mono sp-side-h sp-side-hbtn",onClick:()=>f("recent"),children:[l.jsxs("svg",{className:"sp-side-ic",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[l.jsx("circle",{cx:"12",cy:"12",r:"9"}),l.jsx("path",{d:"M12 7.5V12l3 1.8"})]}),"Саяхан сонссон",l.jsx("span",{className:"sp-side-more","aria-hidden":"true",children:"→"})]}),l.jsx(ju,{tracks:Oe,curId:S==null?void 0:S.id,playing:P,onPlay:K})]})]}),l.jsxs("main",{className:"sp-main",children:[u==="home"&&l.jsx(qb,{genres:ce,genre:v,onGenre:g,list:fe,query:m,curId:S==null?void 0:S.id,playing:P,onPlay:K,likes:_,saves:R,onToggleLike:je,onToggleSave:et,onInfo:Tn,subscribed:i,onSubscribe:r}),u==="stats"&&l.jsx(Gb,{stats:Ie.current,byId:_e,onPlay:K,onBack:()=>f("home")}),u==="billing"&&l.jsx($b,{email:Ze,user:n,isAdmin:s,subscribed:i,renewDate:D,onSubscribe:r,onCancelSub:c,onBack:()=>f("home")}),u==="help"&&l.jsx(Ob,{onOpenCalibrate:()=>N(!0),onBack:()=>f("home")}),u==="detail"&&l.jsx(Hb,{track:p,isCurrent:(S==null?void 0:S.id)===(p==null?void 0:p.id),playing:P,onPlay:()=>K(p),onFeelTest:()=>T(p),onBack:()=>f("home"),liked:_.includes(p==null?void 0:p.id),saved:R.includes(p==null?void 0:p.id),onToggleLike:()=>je(p.id),onToggleSave:()=>et(p.id)}),u==="admin"&&s&&l.jsx(Wb,{allTracksCount:V.length,onOpenAdmin:a,onGoHome:()=>f("home")}),u==="profile"&&l.jsx(Pb,{onBack:()=>f("home")}),u==="devices"&&l.jsx(Ib,{prefs:ue,onUpdatePrefs:ut,canVibrate:Ge,onBack:()=>f("home")}),u==="playlists"&&l.jsx(Ub,{email:Ze,tracks:V,onPlay:K,curId:S==null?void 0:S.id,playing:P,onBack:()=>f("home")}),u==="liked"&&l.jsx(Vu,{title:"Дуртай дуунууд",tracks:Ce,curId:S==null?void 0:S.id,playing:P,onPlay:K,likes:_,saves:R,onToggleLike:je,onToggleSave:et,onInfo:Tn,onBack:()=>f("home"),emptyIcon:"♥",emptyTitle:"Дуртай дуу алга",emptyHint:"Дуу дээрх зүрхэн товчийг дарж дуртай дуугаа энд цуглуулаарай"}),u==="saved"&&l.jsx(Vu,{title:"Хадгалсан",tracks:ye,curId:S==null?void 0:S.id,playing:P,onPlay:K,likes:_,saves:R,onToggleLike:je,onToggleSave:et,onInfo:Tn,onBack:()=>f("home"),emptyIcon:"🔖",emptyTitle:"Хадгалсан дуу алга",emptyHint:"Дуу дээрх хавчуургыг дарж дараа сонсох дуугаа хадгалаарай"}),u==="recent"&&l.jsx(Vu,{title:"Саяхан сонссон",tracks:Oe,curId:S==null?void 0:S.id,playing:P,onPlay:K,likes:_,saves:R,onToggleLike:je,onToggleSave:et,onInfo:Tn,onBack:()=>f("home"),emptyIcon:"🕐",emptyTitle:"Түүх хоосон",emptyHint:"Дуу сонсоход энд сонссон түүх чинь үлдэнэ"})]})]}),ie&&!i&&l.jsxs("div",{className:"sp-limit",children:[l.jsx("p",{children:"Урьдчилан сонсголт дууслаа — бүтэн дуу сонсохын тулд PRO захиалга аваарай."}),l.jsx("button",{className:"bt bt-a",onClick:r,children:"Захиалга авах →"})]}),l.jsx(Kb,{open:Xe&&!!S,track:S,prefs:ue,onToggleBand:I=>ut({bands:{[I]:!ue.bands[I]}}),vibro:ee,onToggleVibro:()=>k(!ee),onImmersive:()=>{Ve(!1),Ke(!0)},onClose:()=>Ve(!1),barsRef:Ee}),l.jsxs("footer",{className:"sp-bar",children:[l.jsx("div",{className:"sp-bar-l",children:S?l.jsxs(l.Fragment,{children:[l.jsx("button",{className:"sp-np-toggle"+(Xe?" on":""),onClick:()=>Ve(I=>!I),"aria-expanded":Xe,"aria-label":"Мэдрэх самбар",title:"Мэдрэх самбар",children:l.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:l.jsx("path",{d:"M6 15l6-6 6 6"})})}),l.jsx("img",{className:"sp-thumb",src:S.cover,alt:""}),l.jsxs("button",{className:"sp-bar-meta sp-bar-metabtn",onClick:()=>Ve(I=>!I),children:[l.jsx("b",{children:S.title}),l.jsx("i",{children:S.artist})]})]}):l.jsx("span",{className:"sp-bar-hint",children:"Дуу сонгоогүй байна"})}),l.jsxs("div",{className:"sp-bar-c",children:[l.jsxs("div",{className:"sp-ctl",children:[l.jsx("button",{onClick:()=>ci(-1),"aria-label":"Өмнөх дуу",children:"⏮"}),l.jsx("button",{onClick:()=>vt(-10),"aria-label":"10 секунд ухраах",className:"sp-skip",children:"−10с"}),l.jsx("button",{className:"sp-play",onClick:Ue,"aria-label":P?"Зогсоох":"Тоглуулах",children:P?"⏸":"▶"}),l.jsx("button",{onClick:()=>vt(10),"aria-label":"10 секунд урагшлуулах",className:"sp-skip",children:"+10с"}),l.jsx("button",{onClick:()=>ci(1),"aria-label":"Дараагийн дуу",children:"⏭"})]}),l.jsxs("div",{className:"sp-seek",children:[l.jsx("span",{className:"mono",children:ag(j)}),l.jsxs("div",{className:"pl-bar",onClick:Lt,role:"slider","aria-label":"Гүйлгэх","aria-valuemin":0,"aria-valuemax":Math.round($),"aria-valuenow":Math.round(j),children:[!i&&l.jsx("i",{className:"pl-lock",style:{left:z+"%"}}),l.jsx("i",{className:"pl-fill",style:{width:B+"%"}})]}),l.jsx("span",{className:"mono",children:ag($)})]})]}),l.jsxs("div",{className:"sp-bar-r",children:[l.jsxs("button",{className:"sp-vibro"+(ee?" on":""),onClick:()=>k(!ee),"aria-pressed":ee,title:Ge?"Чичиргээ горим":"Утсан дээр чичиргээ ажиллана — энд гэрлийн пульс",children:["📳 ",ee?"Асаалттай":"Унтраалттай"]}),l.jsx("button",{className:"sp-icbtn sp-immbtn",onClick:()=>Ke(!0),disabled:!S,"aria-label":"Мэдрэх горим — бүтэн дэлгэц",title:S?"Мэдрэх горим":"Эхлээд дуу сонгоорой",children:l.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",children:l.jsx("path",{d:"M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"})})})]})]}),Be&&S&&l.jsx(Xb,{track:S,onClose:()=>Ke(!1),barsRef:Re,pulseRef:$e,flashRef:ze}),l.jsx(Cb,{open:gt,onClose:()=>N(!1),onDone:I=>ut(I)})]})}const Ar={name:"МЭДРЭХ PRO",price:"9'900₮",period:"сар бүр"},Qb="4242424242424242";function cg(t){return(t||"").replace(/\D/g,"")}function Jb({open:t,onClose:e,user:n,onSubscribed:i}){const[r,s]=L.useState(!1),[a,o]=L.useState(""),[c,u]=L.useState(!1);if(L.useEffect(()=>{if(!t)return;o(""),u(!1),s(!1);const p=h=>{h.key==="Escape"&&!r&&e()};return addEventListener("keydown",p),()=>removeEventListener("keydown",p)},[t,e,r]),!t)return null;function f(p){p.preventDefault(),o("");const h=new FormData(p.target),m=cg(h.get("card")),y=(h.get("exp")||"").trim(),v=cg(h.get("cvc"));if(m.length!==16){o("Картын дугаар 16 оронтой байх ёстой");return}const g=y.match(/^(0[1-9]|1[0-2])\s*\/\s*(\d{2})$/);if(!g){o("Дуусах хугацаа MM/YY хэлбэрээр (ж: 08/27)");return}if(new Date(2e3+ +g[2],+g[1],1)<=new Date){o("Картын хугацаа дууссан байна");return}if(v.length<3){o("CVC 3 оронтой байх ёстой");return}if(m!==Qb){o("Карт татгалзлаа. Демо горим: 4242 4242 4242 4242 ашиглана уу");return}s(!0),setTimeout(()=>{const x=new Date,_=new Date(x);_.setMonth(_.getMonth()+1);const E={active:!0,plan:Ar.name,since:x.getTime(),renews:_.getTime()},R=xr(),A=R.find(C=>C.email===n.email);A&&(A.sub=E,ia(R)),_b(n.email,{id:"inv-"+Date.now(),date:x.getTime(),amount:Ar.price,plan:Ar.name,method:"Карт •••• 4242",status:"Амжилттай"}),s(!1),u(!0),i(E),setTimeout(e,1400)},1600)}return l.jsx("div",{className:"auth-ov",onMouseDown:p=>{p.target===p.currentTarget&&!r&&e()},children:l.jsxs("div",{className:"auth-box sub-box",role:"dialog","aria-modal":"true","aria-label":"Сарын захиалга",children:[l.jsx("button",{className:"auth-x",onClick:e,"aria-label":"Хаах",children:"✕"}),l.jsx("span",{className:"mono",children:"МЭДРЭХ® / Захиалга"}),l.jsxs("div",{className:"sub-plan",children:[l.jsxs("div",{children:[l.jsx("b",{children:Ar.name}),l.jsx("span",{children:"Бүх дууг бүрэн сонсох · чичиргээ + гэрлийн горим · шинэ дуу нэмэгдэх бүрд"})]}),l.jsxs("div",{className:"sub-price",children:[l.jsx("b",{children:Ar.price}),l.jsx("span",{className:"mono",children:Ar.period})]})]}),c?l.jsxs("div",{className:"sub-done",children:[l.jsx("b",{children:"✓ Захиалга идэвхжлээ!"}),l.jsxs("p",{children:["Дараагийн төлбөр: ",new Date(Date.now()+2592e6).toLocaleDateString("mn-MN")]})]}):l.jsxs("form",{onSubmit:f,children:[l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Картын дугаар"}),l.jsx("input",{name:"card",inputMode:"numeric",placeholder:"4242 4242 4242 4242",autoComplete:"cc-number"})]}),l.jsxs("div",{className:"sub-row2",children:[l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Дуусах хугацаа"}),l.jsx("input",{name:"exp",inputMode:"numeric",placeholder:"MM/YY",autoComplete:"cc-exp"})]}),l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"CVC"}),l.jsx("input",{name:"cvc",inputMode:"numeric",placeholder:"123",autoComplete:"cc-csc"})]})]}),a&&l.jsx("p",{className:"auth-err",children:a}),l.jsx("button",{type:"submit",className:"bt bt-a auth-sub",disabled:r,children:r?"Боловсруулж байна…":Ar.price+" төлж захиалах"})]}),l.jsx("p",{className:"auth-note mono",children:"Демо горим (Stripe test) — жинхэнэ мөнгө шилжихгүй · туршилтын карт 4242 4242 4242 4242"})]})})}function eR(){L.useEffect(()=>(lb(),mb(),ob()),[]);const{user:t,isAdmin:e,subscribed:n,login:i,logout:r,setSub:s,cancelSub:a}=U0(),[o,c]=L.useState(!1),[u,f]=L.useState(!1),[p,h]=L.useState(!!t),[m,y]=L.useState(!1),v=E=>{i(E),h(!0)},g=()=>{r(),f(!1),h(!1),y(!1)},d=()=>{t?h(!0):c(!0)},x=E=>s(E),_=()=>a();return l.jsxs(l.Fragment,{children:[l.jsx(tR,{}),l.jsx("div",{className:"cr",id:"cr"}),l.jsx("div",{className:"cd",id:"cd"}),l.jsx("div",{className:"grid-bg"}),l.jsx("div",{className:"glow g1"}),l.jsx("div",{className:"glow g2"}),l.jsx(nR,{}),l.jsx(iR,{user:t,isAdmin:e,onLogin:()=>c(!0),onLogout:g,onAdmin:()=>f(!0),onPlayer:d}),l.jsx(rR,{}),l.jsx(aR,{}),l.jsx(lR,{}),l.jsx(uR,{}),l.jsx(dR,{}),l.jsx(fR,{}),l.jsx(fb,{open:o,onClose:()=>c(!1),onAuth:v}),l.jsx(wb,{open:u,onClose:()=>f(!1),currentUser:t}),l.jsx(Zb,{open:p,onClose:()=>h(!1),user:t,subscribed:n,onSubscribe:()=>y(!0),isAdmin:e,onAdmin:()=>f(!0),onLogout:g,onCancelSub:_}),l.jsx(Jb,{open:m,onClose:()=>y(!1),user:t,onSubscribed:x})]})}function tR(){return l.jsxs("div",{className:"pre",id:"pre",children:[l.jsx("b",{children:"МЭДРЭХ"}),l.jsx("b",{id:"pct",style:{fontSize:"clamp(24px,4.5vw,54px)"},children:"0"}),l.jsx("div",{className:"pre-line",children:l.jsx("i",{id:"pbar"})})]})}function nR(){return l.jsxs("header",{className:"hero",id:"hero",children:[l.jsx("canvas",{id:"stage"}),l.jsx("div",{className:"hero-veil"}),l.jsx("span",{className:"vside vs-l",children:"Сонсголын бэрхшээлтэй хүмүүст"}),l.jsx("span",{className:"vside vs-r",children:"20 Hz — 20 000 Hz"}),l.jsxs("div",{className:"fc fc1","data-sp":"0.12",children:[l.jsxs("div",{className:"fr",children:[l.jsx("img",{src:uh,alt:"Концертын танхим, гэрэлтсэн тайз",loading:"lazy"}),l.jsx("div",{className:"tint t-warm"})]}),l.jsx("span",{className:"cap",children:"Тайз / 40 Hz"})]}),l.jsxs("div",{className:"mon",id:"mon","data-sp":"-0.08",children:[l.jsxs("div",{className:"mh",children:[l.jsx("span",{className:"mono",style:{fontSize:9},children:"Шууд дохио"}),l.jsx("span",{className:"dot"})]}),l.jsx("canvas",{id:"monwave"}),l.jsxs("div",{className:"mf",children:[l.jsx("span",{className:"mono",style:{fontSize:9},children:"Бас"}),l.jsx("span",{className:"mono",style:{fontSize:9},children:"Дунд"}),l.jsx("span",{className:"mono",style:{fontSize:9},children:"Өндөр"})]})]}),l.jsxs("div",{className:"word",children:[l.jsx("div",{className:"w-eyebrow",children:l.jsx("span",{className:"mono",children:"Хөгжмийг мэдрэх систем"})}),l.jsxs("div",{className:"fitbox",id:"fitbox",children:[l.jsx("canvas",{id:"slash"}),l.jsxs("h1",{id:"wm",children:[l.jsx("em",{children:l.jsx("i",{children:"М"})}),l.jsx("em",{children:l.jsx("i",{children:"Э"})}),l.jsx("em",{children:l.jsx("i",{children:"Д"})}),l.jsx("em",{children:l.jsx("i",{children:"Р"})}),l.jsx("em",{children:l.jsx("i",{children:"Э"})}),l.jsx("em",{children:l.jsx("i",{children:"Х"})})]})]}),l.jsx("p",{className:"sub",children:"(Дуу авиаг чичиргээ, гэрэл, хөдөлгөөн болгон хөрвүүлнэ)"})]}),l.jsxs("div",{className:"hmeta",children:[l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Мэдрэхүйн суваг"}),l.jsx("b",{children:"Чичиргээ · Гэрэл · Хөдөлгөөн"})]}),l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Давтамжийн бүс"}),l.jsx("b",{children:"3 бүс, тус бүр өөр хэлбэр"})]}),l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Хоцролт"}),l.jsx("b",{children:"40 мс дотор"})]}),l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Платформ"}),l.jsx("b",{children:"Web · Android"})]})]}),l.jsxs("div",{className:"badge",children:[l.jsxs("svg",{viewBox:"0 0 100 100",children:[l.jsx("defs",{children:l.jsx("path",{id:"cp",d:"M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"})}),l.jsx("text",{fill:"#4E5B59",fontFamily:"JetBrains Mono, monospace",fontSize:"8.2",letterSpacing:"3.2",children:l.jsx("textPath",{href:"#cp",children:"ДООШ ГҮЙЛГЭЖ ҮЗ · ДООШ ГҮЙЛГЭЖ ҮЗ · "})})]}),l.jsx("span",{className:"arw",children:"↓"})]})]})}function iR({user:t,isAdmin:e,onLogin:n,onLogout:i,onAdmin:r,onPlayer:s}){return l.jsxs("nav",{className:"dock",id:"dock",children:[l.jsxs("div",{className:"nav-left",children:[l.jsx("button",{className:"disc",id:"disc","aria-label":"Дуу эхлүүлэх"}),l.jsxs("a",{href:"#top",className:"nav-logo keep",children:["МЭДРЭХ",l.jsx("sup",{children:"®"})]})]}),!t&&l.jsxs("div",{className:"nav-links",children:[l.jsx("a",{href:"#top",className:"keep",children:"Нүүр"}),l.jsx("a",{href:"#feel",children:"Мэдрэх"}),l.jsx("a",{href:"#gal",children:"Галерей"}),l.jsx("a",{href:"#how",children:"Хэрхэн"})]}),l.jsxs("div",{className:"nav-right",children:[t&&l.jsx("button",{className:"nav-play keep",onClick:s,children:"♫ Тоглуулагч"}),e&&l.jsx("button",{className:"dock-auth adm-btn keep",onClick:r,children:"Админ"}),t?l.jsxs("button",{className:"dock-auth keep",onClick:i,title:t.email+" · Гарах",children:[t.name," · Гарах"]}):l.jsx("button",{className:"dock-auth keep",onClick:n,children:"Нэвтрэх"})]})]})}const ug=["мэдрэх","чичиргээ","давтамж","хэмнэл","өнгө","мэдрэхүй"];function rR(){return l.jsx("div",{className:"mq",children:l.jsx("div",{className:"mq-in",children:[...ug,...ug].map((t,e)=>l.jsx("span",{children:t},e))})})}const sR=[{band:"bass",idx:"01",name:"Бас",hz:"20—250 Hz",ms:"230 · 80 · 230",tot:"540 ms"},{band:"mid",idx:"02",name:"Дунд",hz:"250 Hz—4 kHz",ms:"70 · 50 · 70 · 50 · 70",tot:"310 ms"},{band:"high",idx:"03",name:"Өндөр",hz:"4—20 kHz",ms:"24 × 9",tot:"216 ms"}];function aR(){return l.jsx("section",{id:"feel",children:l.jsxs("div",{className:"wrap",children:[l.jsxs("div",{className:"head rv",children:[l.jsx("div",{className:"eyebrow",children:l.jsx("span",{className:"mono",children:"01 / Хаптик самбар"})}),l.jsxs("h2",{children:[l.jsx("span",{className:"ln",children:l.jsx("i",{children:"Уншихаа боль."})}),l.jsx("span",{className:"ln",children:l.jsx("i",{children:"Дараад үз."})})]}),l.jsx("p",{children:"Давтамжийн гурван бүс, тус бүр өөрийн хаптик хэлбэртэй. Мөр дээр дарахад утас нь тэр хэлбэрээр чичрэнэ."})]}),l.jsxs("div",{className:"console rv",children:[l.jsxs("div",{className:"c-top",children:[l.jsx("span",{children:"№"}),l.jsx("span",{children:"Бүс"}),l.jsx("span",{children:"Давтамж"}),l.jsx("span",{children:"Долгион"}),l.jsx("span",{children:"Хаптик хэв маяг"}),l.jsx("span",{children:"Урт"})]}),sR.map(t=>l.jsxs("button",{className:"crow","data-band":t.band,children:[l.jsx("span",{className:"ring"}),l.jsx("span",{className:"idx",children:t.idx}),l.jsx("h3",{children:t.name}),l.jsx("span",{className:"hz",children:t.hz}),l.jsx("canvas",{className:"scope","data-band":t.band}),l.jsxs("div",{children:[l.jsx("div",{className:"hap","data-band":t.band}),l.jsx("div",{className:"ms",children:t.ms})]}),l.jsx("span",{className:"tot",children:t.tot})]},t.band))]}),l.jsxs("div",{className:"anz rv",children:[l.jsxs("div",{className:"db",children:[l.jsx("span",{children:"0 dB"}),l.jsx("span",{children:"−20"}),l.jsx("span",{children:"−40"}),l.jsx("span",{children:"−60"})]}),l.jsxs("div",{className:"plot",children:[l.jsx("div",{className:"gl",style:{top:0}}),l.jsx("div",{className:"gl",style:{top:"33.3%"}}),l.jsx("div",{className:"gl",style:{top:"66.6%"}}),l.jsx("div",{className:"gl",style:{top:"100%"}}),l.jsx("div",{className:"bars",id:"bars"})]}),l.jsxs("div",{className:"anz-lb mono",children:[l.jsx("span",{children:"20 Hz"}),l.jsx("span",{children:"250 Hz"}),l.jsx("span",{children:"4 kHz"}),l.jsx("span",{children:"20 kHz"})]})]})]})})}const oR=[{no:"01",img:R0,tint:"t-cool",name:"Гүн бас",hz:"40 Hz",alt:"Чанга яригчийн ойрын зураг"},{no:"02",img:uh,tint:"t-warm",name:"Танхимын нөсөө",hz:"320 Hz",alt:"Концертын танхим, гэрэлтсэн тайз"},{no:"03",img:N0,tint:"t-cool",name:"Хурц өндөр",hz:"8 kHz",alt:"Лазер гэрлийн туяа бүхий тайз"},{no:"04",img:P0,tint:"t-rose",name:"Цохилтын хэлбэр",hz:"90 Hz",alt:"Гараа өргөсөн үзэгчид"},{no:"05",img:L0,tint:"t-warm",name:"Чимээгүй завсар",hz:"0 Hz",alt:"Микрофоны ойрын зураг"},{no:"06",img:D0,tint:"t-cool",name:"Бүтэн спектр",hz:"20—20k",alt:"Олон өнгийн гэрлийн шоу"}];function lR(){return l.jsx("div",{className:"gal-outer",id:"gal",children:l.jsxs("div",{className:"gal-sticky",children:[l.jsxs("div",{className:"gal-head",children:[l.jsxs("div",{children:[l.jsx("div",{className:"eyebrow",style:{marginBottom:16},children:l.jsx("span",{className:"mono",children:"02 / Галерей"})}),l.jsx("h2",{children:"Дуу бүр өөрийн дүр төрхтэй"})]}),l.jsxs("div",{className:"gal-prog",children:[l.jsx("span",{className:"mono",id:"galno",children:"01"}),l.jsx("div",{className:"track",children:l.jsx("i",{id:"galbar"})}),l.jsx("span",{className:"mono",children:"06"})]})]}),l.jsx("div",{className:"gal-track",id:"track",children:oR.map(t=>l.jsxs("div",{className:"slide",children:[l.jsxs("div",{className:"fr",children:[l.jsx("span",{className:"no",children:t.no}),l.jsx("img",{src:t.img,alt:t.alt,loading:"lazy"}),l.jsx("div",{className:`tint ${t.tint}`})]}),l.jsxs("div",{className:"meta",children:[l.jsx("h3",{children:t.name}),l.jsx("span",{className:"mono",children:t.hz})]})]},t.no))})]})})}const cR=[{n:"01",name:"Дуу орж ирнэ",text:"Утсан дээрээ дуу тоглуулах эсвэл микрофоноор орчны дууг сонсгоно. Ямар ч хөгжим байж болно."},{n:"02",name:"Систем дууг задлана",text:"Апп дууг 3 хэсэгт хуваана — бүдүүн дуу (бөмбөр), дунд дуу (хоолой, гитар), нарийн дуу (цан, исгэрэх)."},{n:"03",name:"Мэдрэмж болгон хувиргана",text:"Бүдүүн дуу = хүчтэй урт чичиргээ, дунд = зөөлөн хэмнэл, нарийн = богино түргэн чичиргээ + гэрэл."},{n:"04",name:"Та мэдэрнэ",text:"Утас гарт чинь чичирч, дэлгэц хөгжмийн хэмнэлээр гэрэлтэнэ. Дуутай бараг зэрэг — нүд ирмэхээс ч хурдан."}];function uR(){return l.jsx("section",{id:"how",children:l.jsxs("div",{className:"wrap",children:[l.jsxs("div",{className:"head rv",children:[l.jsx("div",{className:"eyebrow",children:l.jsx("span",{className:"mono",children:"03 / Хэрхэн ажилладаг вэ"})}),l.jsx("h2",{children:l.jsx("span",{className:"ln",children:l.jsx("i",{children:"Дуу хэрхэн мэдрэмж болдог вэ?"})})}),l.jsx("p",{children:"Сонсголгүй хүн хөгжмийг чихээрээ биш — гараараа, нүдээрээ мэдэрнэ. Энэ нь ердөө 4 алхмаар болдог:"})]}),l.jsx("div",{className:"steps rv",children:cR.map(t=>l.jsxs("div",{className:"step",children:[l.jsx("span",{className:"n",children:t.n}),l.jsx("h3",{children:t.name}),l.jsx("p",{children:t.text})]},t.n))})]})})}function dR(){return l.jsx("section",{className:"cta",children:l.jsxs("div",{className:"wrap",children:[l.jsx("span",{className:"mono",children:"Эхлэл"}),l.jsxs("h2",{className:"rv",style:{marginTop:32},children:[l.jsx("span",{className:"ln",children:l.jsx("i",{children:"ЧИМЭЭГҮЙ"})}),l.jsx("span",{className:"ln",children:l.jsx("i",{children:"БАЙДАЛ"})}),l.jsx("span",{className:"ln",children:l.jsx("i",{children:"ХООСОН БИШ"})})]}),l.jsxs("div",{className:"row",children:[l.jsx("button",{className:"bt bt-a mag","data-go":"#feel",children:"Аппыг турших"}),l.jsx("button",{className:"bt mag","data-go":"#how",children:"Хэрхэн ажилладаг вэ"})]})]})})}function fR(){return l.jsx("footer",{children:l.jsxs("div",{className:"wrap fin",children:[l.jsx("span",{children:"МЭДРЭХ® — дипломын төслийн үзүүлэн"}),l.jsx("span",{className:"mono",children:"Canvas · WebGL · Web Audio API · Vibration API"})]})})}function hR(){return l.jsxs("div",{className:"nf",children:[l.jsx("span",{className:"nf-code",children:"404"}),l.jsx("h1",{children:"Хуудас олдсонгүй"}),l.jsx("p",{children:"Таны хайсан хуудас байхгүй эсвэл зөөгдсөн байна."}),l.jsx(ih,{className:"bt bt-a",to:"/",children:"← Нүүр хуудас руу буцах"})]})}Gu.createRoot(document.getElementById("root")).render(l.jsx(DM,{children:l.jsx(bb,{children:l.jsx(Rb,{children:l.jsxs(cM,{children:[l.jsx(Od,{path:"/",element:l.jsx(eR,{})}),l.jsx(Od,{path:"*",element:l.jsx(hR,{})})]})})})}));
