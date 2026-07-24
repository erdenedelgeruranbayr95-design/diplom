(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();var og={exports:{}},tc={},lg={exports:{}},tt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qa=Symbol.for("react.element"),Fx=Symbol.for("react.portal"),kx=Symbol.for("react.fragment"),Ox=Symbol.for("react.strict_mode"),Bx=Symbol.for("react.profiler"),zx=Symbol.for("react.provider"),jx=Symbol.for("react.context"),Hx=Symbol.for("react.forward_ref"),Vx=Symbol.for("react.suspense"),Gx=Symbol.for("react.memo"),Wx=Symbol.for("react.lazy"),oh=Symbol.iterator;function Xx(t){return t===null||typeof t!="object"?null:(t=oh&&t[oh]||t["@@iterator"],typeof t=="function"?t:null)}var cg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ug=Object.assign,dg={};function $s(t,e,n){this.props=t,this.context=e,this.refs=dg,this.updater=n||cg}$s.prototype.isReactComponent={};$s.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};$s.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function fg(){}fg.prototype=$s.prototype;function qd(t,e,n){this.props=t,this.context=e,this.refs=dg,this.updater=n||cg}var Yd=qd.prototype=new fg;Yd.constructor=qd;ug(Yd,$s.prototype);Yd.isPureReactComponent=!0;var lh=Array.isArray,hg=Object.prototype.hasOwnProperty,Kd={current:null},pg={key:!0,ref:!0,__self:!0,__source:!0};function mg(t,e,n){var i,r={},s=null,a=null;if(e!=null)for(i in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(s=""+e.key),e)hg.call(e,i)&&!pg.hasOwnProperty(i)&&(r[i]=e[i]);var o=arguments.length-2;if(o===1)r.children=n;else if(1<o){for(var c=Array(o),u=0;u<o;u++)c[u]=arguments[u+2];r.children=c}if(t&&t.defaultProps)for(i in o=t.defaultProps,o)r[i]===void 0&&(r[i]=o[i]);return{$$typeof:Qa,type:t,key:s,ref:a,props:r,_owner:Kd.current}}function $x(t,e){return{$$typeof:Qa,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Zd(t){return typeof t=="object"&&t!==null&&t.$$typeof===Qa}function qx(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var ch=/\/+/g;function Nc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?qx(""+t.key):e.toString(36)}function rl(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case Qa:case Fx:a=!0}}if(a)return a=t,r=r(a),t=i===""?"."+Nc(a,0):i,lh(r)?(n="",t!=null&&(n=t.replace(ch,"$&/")+"/"),rl(r,e,n,"",function(u){return u})):r!=null&&(Zd(r)&&(r=$x(r,n+(!r.key||a&&a.key===r.key?"":(""+r.key).replace(ch,"$&/")+"/")+t)),e.push(r)),1;if(a=0,i=i===""?".":i+":",lh(t))for(var o=0;o<t.length;o++){s=t[o];var c=i+Nc(s,o);a+=rl(s,e,n,c,r)}else if(c=Xx(t),typeof c=="function")for(t=c.call(t),o=0;!(s=t.next()).done;)s=s.value,c=i+Nc(s,o++),a+=rl(s,e,n,c,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function po(t,e,n){if(t==null)return t;var i=[],r=0;return rl(t,i,"","",function(s){return e.call(n,s,r++)}),i}function Yx(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var nn={current:null},sl={transition:null},Kx={ReactCurrentDispatcher:nn,ReactCurrentBatchConfig:sl,ReactCurrentOwner:Kd};function gg(){throw Error("act(...) is not supported in production builds of React.")}tt.Children={map:po,forEach:function(t,e,n){po(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return po(t,function(){e++}),e},toArray:function(t){return po(t,function(e){return e})||[]},only:function(t){if(!Zd(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};tt.Component=$s;tt.Fragment=kx;tt.Profiler=Bx;tt.PureComponent=qd;tt.StrictMode=Ox;tt.Suspense=Vx;tt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Kx;tt.act=gg;tt.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=ug({},t.props),r=t.key,s=t.ref,a=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,a=Kd.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var o=t.type.defaultProps;for(c in e)hg.call(e,c)&&!pg.hasOwnProperty(c)&&(i[c]=e[c]===void 0&&o!==void 0?o[c]:e[c])}var c=arguments.length-2;if(c===1)i.children=n;else if(1<c){o=Array(c);for(var u=0;u<c;u++)o[u]=arguments[u+2];i.children=o}return{$$typeof:Qa,type:t.type,key:r,ref:s,props:i,_owner:a}};tt.createContext=function(t){return t={$$typeof:jx,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:zx,_context:t},t.Consumer=t};tt.createElement=mg;tt.createFactory=function(t){var e=mg.bind(null,t);return e.type=t,e};tt.createRef=function(){return{current:null}};tt.forwardRef=function(t){return{$$typeof:Hx,render:t}};tt.isValidElement=Zd;tt.lazy=function(t){return{$$typeof:Wx,_payload:{_status:-1,_result:t},_init:Yx}};tt.memo=function(t,e){return{$$typeof:Gx,type:t,compare:e===void 0?null:e}};tt.startTransition=function(t){var e=sl.transition;sl.transition={};try{t()}finally{sl.transition=e}};tt.unstable_act=gg;tt.useCallback=function(t,e){return nn.current.useCallback(t,e)};tt.useContext=function(t){return nn.current.useContext(t)};tt.useDebugValue=function(){};tt.useDeferredValue=function(t){return nn.current.useDeferredValue(t)};tt.useEffect=function(t,e){return nn.current.useEffect(t,e)};tt.useId=function(){return nn.current.useId()};tt.useImperativeHandle=function(t,e,n){return nn.current.useImperativeHandle(t,e,n)};tt.useInsertionEffect=function(t,e){return nn.current.useInsertionEffect(t,e)};tt.useLayoutEffect=function(t,e){return nn.current.useLayoutEffect(t,e)};tt.useMemo=function(t,e){return nn.current.useMemo(t,e)};tt.useReducer=function(t,e,n){return nn.current.useReducer(t,e,n)};tt.useRef=function(t){return nn.current.useRef(t)};tt.useState=function(t){return nn.current.useState(t)};tt.useSyncExternalStore=function(t,e,n){return nn.current.useSyncExternalStore(t,e,n)};tt.useTransition=function(){return nn.current.useTransition()};tt.version="18.3.1";lg.exports=tt;var U=lg.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Zx=U,Qx=Symbol.for("react.element"),Jx=Symbol.for("react.fragment"),e_=Object.prototype.hasOwnProperty,t_=Zx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n_={key:!0,ref:!0,__self:!0,__source:!0};function vg(t,e,n){var i,r={},s=null,a=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);for(i in e)e_.call(e,i)&&!n_.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:Qx,type:t,key:s,ref:a,props:r,_owner:t_.current}}tc.Fragment=Jx;tc.jsx=vg;tc.jsxs=vg;og.exports=tc;var l=og.exports,Hu={},xg={exports:{}},Sn={},_g={exports:{}},yg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(O,ee){var ne=O.length;O.push(ee);e:for(;0<ne;){var le=ne-1>>>1,Re=O[le];if(0<r(Re,ee))O[le]=ee,O[ne]=Re,ne=le;else break e}}function n(O){return O.length===0?null:O[0]}function i(O){if(O.length===0)return null;var ee=O[0],ne=O.pop();if(ne!==ee){O[0]=ne;e:for(var le=0,Re=O.length,Je=Re>>>1;le<Je;){var $=2*(le+1)-1,re=O[$],xe=$+1,me=O[xe];if(0>r(re,ne))xe<Re&&0>r(me,re)?(O[le]=me,O[xe]=ne,le=xe):(O[le]=re,O[$]=ne,le=$);else if(xe<Re&&0>r(me,ne))O[le]=me,O[xe]=ne,le=xe;else break e}}return ee}function r(O,ee){var ne=O.sortIndex-ee.sortIndex;return ne!==0?ne:O.id-ee.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,o=a.now();t.unstable_now=function(){return a.now()-o}}var c=[],u=[],f=1,p=null,h=3,m=!1,y=!1,v=!1,g=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,x=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function _(O){for(var ee=n(u);ee!==null;){if(ee.callback===null)i(u);else if(ee.startTime<=O)i(u),ee.sortIndex=ee.expirationTime,e(c,ee);else break;ee=n(u)}}function E(O){if(v=!1,_(O),!y)if(n(c)!==null)y=!0,Y(P);else{var ee=n(u);ee!==null&&J(E,ee.startTime-O)}}function P(O,ee){y=!1,v&&(v=!1,d(N),N=-1),m=!0;var ne=h;try{for(_(ee),p=n(c);p!==null&&(!(p.expirationTime>ee)||O&&!I());){var le=p.callback;if(typeof le=="function"){p.callback=null,h=p.priorityLevel;var Re=le(p.expirationTime<=ee);ee=t.unstable_now(),typeof Re=="function"?p.callback=Re:p===n(c)&&i(c),_(ee)}else i(c);p=n(c)}if(p!==null)var Je=!0;else{var $=n(u);$!==null&&J(E,$.startTime-ee),Je=!1}return Je}finally{p=null,h=ne,m=!1}}var R=!1,A=null,N=-1,S=5,M=-1;function I(){return!(t.unstable_now()-M<S)}function G(){if(A!==null){var O=t.unstable_now();M=O;var ee=!0;try{ee=A(!0,O)}finally{ee?j():(R=!1,A=null)}}else R=!1}var j;if(typeof x=="function")j=function(){x(G)};else if(typeof MessageChannel<"u"){var Q=new MessageChannel,X=Q.port2;Q.port1.onmessage=G,j=function(){X.postMessage(null)}}else j=function(){g(G,0)};function Y(O){A=O,R||(R=!0,j())}function J(O,ee){N=g(function(){O(t.unstable_now())},ee)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(O){O.callback=null},t.unstable_continueExecution=function(){y||m||(y=!0,Y(P))},t.unstable_forceFrameRate=function(O){0>O||125<O?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):S=0<O?Math.floor(1e3/O):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return n(c)},t.unstable_next=function(O){switch(h){case 1:case 2:case 3:var ee=3;break;default:ee=h}var ne=h;h=ee;try{return O()}finally{h=ne}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(O,ee){switch(O){case 1:case 2:case 3:case 4:case 5:break;default:O=3}var ne=h;h=O;try{return ee()}finally{h=ne}},t.unstable_scheduleCallback=function(O,ee,ne){var le=t.unstable_now();switch(typeof ne=="object"&&ne!==null?(ne=ne.delay,ne=typeof ne=="number"&&0<ne?le+ne:le):ne=le,O){case 1:var Re=-1;break;case 2:Re=250;break;case 5:Re=1073741823;break;case 4:Re=1e4;break;default:Re=5e3}return Re=ne+Re,O={id:f++,callback:ee,priorityLevel:O,startTime:ne,expirationTime:Re,sortIndex:-1},ne>le?(O.sortIndex=ne,e(u,O),n(c)===null&&O===n(u)&&(v?(d(N),N=-1):v=!0,J(E,ne-le))):(O.sortIndex=Re,e(c,O),y||m||(y=!0,Y(P))),O},t.unstable_shouldYield=I,t.unstable_wrapCallback=function(O){var ee=h;return function(){var ne=h;h=ee;try{return O.apply(this,arguments)}finally{h=ne}}}})(yg);_g.exports=yg;var i_=_g.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r_=U,yn=i_;function ce(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Sg=new Set,Da={};function Xr(t,e){Is(t,e),Is(t+"Capture",e)}function Is(t,e){for(Da[t]=e,t=0;t<e.length;t++)Sg.add(e[t])}var Si=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Vu=Object.prototype.hasOwnProperty,s_=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,uh={},dh={};function a_(t){return Vu.call(dh,t)?!0:Vu.call(uh,t)?!1:s_.test(t)?dh[t]=!0:(uh[t]=!0,!1)}function o_(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function l_(t,e,n,i){if(e===null||typeof e>"u"||o_(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function rn(t,e,n,i,r,s,a){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=a}var Xt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Xt[t]=new rn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Xt[e]=new rn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Xt[t]=new rn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Xt[t]=new rn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Xt[t]=new rn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Xt[t]=new rn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Xt[t]=new rn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Xt[t]=new rn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Xt[t]=new rn(t,5,!1,t.toLowerCase(),null,!1,!1)});var Qd=/[\-:]([a-z])/g;function Jd(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Qd,Jd);Xt[e]=new rn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Qd,Jd);Xt[e]=new rn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Qd,Jd);Xt[e]=new rn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Xt[t]=new rn(t,1,!1,t.toLowerCase(),null,!1,!1)});Xt.xlinkHref=new rn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Xt[t]=new rn(t,1,!1,t.toLowerCase(),null,!0,!0)});function ef(t,e,n,i){var r=Xt.hasOwnProperty(e)?Xt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(l_(e,n,r,i)&&(n=null),i||r===null?a_(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Ci=r_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,mo=Symbol.for("react.element"),fs=Symbol.for("react.portal"),hs=Symbol.for("react.fragment"),tf=Symbol.for("react.strict_mode"),Gu=Symbol.for("react.profiler"),Mg=Symbol.for("react.provider"),Eg=Symbol.for("react.context"),nf=Symbol.for("react.forward_ref"),Wu=Symbol.for("react.suspense"),Xu=Symbol.for("react.suspense_list"),rf=Symbol.for("react.memo"),Bi=Symbol.for("react.lazy"),wg=Symbol.for("react.offscreen"),fh=Symbol.iterator;function ta(t){return t===null||typeof t!="object"?null:(t=fh&&t[fh]||t["@@iterator"],typeof t=="function"?t:null)}var At=Object.assign,Pc;function xa(t){if(Pc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Pc=e&&e[1]||""}return`
`+Pc+t}var Lc=!1;function Dc(t,e){if(!t||Lc)return"";Lc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(u){var i=u}Reflect.construct(t,[],e)}else{try{e.call()}catch(u){i=u}t.call(e.prototype)}else{try{throw Error()}catch(u){i=u}t()}}catch(u){if(u&&i&&typeof u.stack=="string"){for(var r=u.stack.split(`
`),s=i.stack.split(`
`),a=r.length-1,o=s.length-1;1<=a&&0<=o&&r[a]!==s[o];)o--;for(;1<=a&&0<=o;a--,o--)if(r[a]!==s[o]){if(a!==1||o!==1)do if(a--,o--,0>o||r[a]!==s[o]){var c=`
`+r[a].replace(" at new "," at ");return t.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",t.displayName)),c}while(1<=a&&0<=o);break}}}finally{Lc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?xa(t):""}function c_(t){switch(t.tag){case 5:return xa(t.type);case 16:return xa("Lazy");case 13:return xa("Suspense");case 19:return xa("SuspenseList");case 0:case 2:case 15:return t=Dc(t.type,!1),t;case 11:return t=Dc(t.type.render,!1),t;case 1:return t=Dc(t.type,!0),t;default:return""}}function $u(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case hs:return"Fragment";case fs:return"Portal";case Gu:return"Profiler";case tf:return"StrictMode";case Wu:return"Suspense";case Xu:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Eg:return(t.displayName||"Context")+".Consumer";case Mg:return(t._context.displayName||"Context")+".Provider";case nf:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case rf:return e=t.displayName||null,e!==null?e:$u(t.type)||"Memo";case Bi:e=t._payload,t=t._init;try{return $u(t(e))}catch{}}return null}function u_(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return $u(e);case 8:return e===tf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function sr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Tg(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function d_(t){var e=Tg(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(a){i=""+a,s.call(this,a)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(a){i=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function go(t){t._valueTracker||(t._valueTracker=d_(t))}function Ag(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=Tg(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function _l(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function qu(t,e){var n=e.checked;return At({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function hh(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=sr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Cg(t,e){e=e.checked,e!=null&&ef(t,"checked",e,!1)}function Yu(t,e){Cg(t,e);var n=sr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Ku(t,e.type,n):e.hasOwnProperty("defaultValue")&&Ku(t,e.type,sr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function ph(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Ku(t,e,n){(e!=="number"||_l(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var _a=Array.isArray;function Ts(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+sr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Zu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ce(91));return At({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function mh(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(ce(92));if(_a(n)){if(1<n.length)throw Error(ce(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:sr(n)}}function bg(t,e){var n=sr(e.value),i=sr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function gh(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Rg(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Qu(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Rg(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var vo,Ng=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(vo=vo||document.createElement("div"),vo.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=vo.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Ia(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Ea={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},f_=["Webkit","ms","Moz","O"];Object.keys(Ea).forEach(function(t){f_.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Ea[e]=Ea[t]})});function Pg(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Ea.hasOwnProperty(t)&&Ea[t]?(""+e).trim():e+"px"}function Lg(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Pg(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var h_=At({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ju(t,e){if(e){if(h_[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ce(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ce(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ce(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ce(62))}}function ed(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var td=null;function sf(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var nd=null,As=null,Cs=null;function vh(t){if(t=to(t)){if(typeof nd!="function")throw Error(ce(280));var e=t.stateNode;e&&(e=ac(e),nd(t.stateNode,t.type,e))}}function Dg(t){As?Cs?Cs.push(t):Cs=[t]:As=t}function Ig(){if(As){var t=As,e=Cs;if(Cs=As=null,vh(t),e)for(t=0;t<e.length;t++)vh(e[t])}}function Ug(t,e){return t(e)}function Fg(){}var Ic=!1;function kg(t,e,n){if(Ic)return t(e,n);Ic=!0;try{return Ug(t,e,n)}finally{Ic=!1,(As!==null||Cs!==null)&&(Fg(),Ig())}}function Ua(t,e){var n=t.stateNode;if(n===null)return null;var i=ac(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(ce(231,e,typeof n));return n}var id=!1;if(Si)try{var na={};Object.defineProperty(na,"passive",{get:function(){id=!0}}),window.addEventListener("test",na,na),window.removeEventListener("test",na,na)}catch{id=!1}function p_(t,e,n,i,r,s,a,o,c){var u=Array.prototype.slice.call(arguments,3);try{e.apply(n,u)}catch(f){this.onError(f)}}var wa=!1,yl=null,Sl=!1,rd=null,m_={onError:function(t){wa=!0,yl=t}};function g_(t,e,n,i,r,s,a,o,c){wa=!1,yl=null,p_.apply(m_,arguments)}function v_(t,e,n,i,r,s,a,o,c){if(g_.apply(this,arguments),wa){if(wa){var u=yl;wa=!1,yl=null}else throw Error(ce(198));Sl||(Sl=!0,rd=u)}}function $r(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Og(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function xh(t){if($r(t)!==t)throw Error(ce(188))}function x_(t){var e=t.alternate;if(!e){if(e=$r(t),e===null)throw Error(ce(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return xh(r),t;if(s===i)return xh(r),e;s=s.sibling}throw Error(ce(188))}if(n.return!==i.return)n=r,i=s;else{for(var a=!1,o=r.child;o;){if(o===n){a=!0,n=r,i=s;break}if(o===i){a=!0,i=r,n=s;break}o=o.sibling}if(!a){for(o=s.child;o;){if(o===n){a=!0,n=s,i=r;break}if(o===i){a=!0,i=s,n=r;break}o=o.sibling}if(!a)throw Error(ce(189))}}if(n.alternate!==i)throw Error(ce(190))}if(n.tag!==3)throw Error(ce(188));return n.stateNode.current===n?t:e}function Bg(t){return t=x_(t),t!==null?zg(t):null}function zg(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=zg(t);if(e!==null)return e;t=t.sibling}return null}var jg=yn.unstable_scheduleCallback,_h=yn.unstable_cancelCallback,__=yn.unstable_shouldYield,y_=yn.unstable_requestPaint,bt=yn.unstable_now,S_=yn.unstable_getCurrentPriorityLevel,af=yn.unstable_ImmediatePriority,Hg=yn.unstable_UserBlockingPriority,Ml=yn.unstable_NormalPriority,M_=yn.unstable_LowPriority,Vg=yn.unstable_IdlePriority,nc=null,ni=null;function E_(t){if(ni&&typeof ni.onCommitFiberRoot=="function")try{ni.onCommitFiberRoot(nc,t,void 0,(t.current.flags&128)===128)}catch{}}var Gn=Math.clz32?Math.clz32:A_,w_=Math.log,T_=Math.LN2;function A_(t){return t>>>=0,t===0?32:31-(w_(t)/T_|0)|0}var xo=64,_o=4194304;function ya(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function El(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,a=n&268435455;if(a!==0){var o=a&~r;o!==0?i=ya(o):(s&=a,s!==0&&(i=ya(s)))}else a=n&~r,a!==0?i=ya(a):s!==0&&(i=ya(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-Gn(e),r=1<<n,i|=t[n],e&=~r;return i}function C_(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function b_(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var a=31-Gn(s),o=1<<a,c=r[a];c===-1?(!(o&n)||o&i)&&(r[a]=C_(o,e)):c<=e&&(t.expiredLanes|=o),s&=~o}}function sd(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Gg(){var t=xo;return xo<<=1,!(xo&4194240)&&(xo=64),t}function Uc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ja(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Gn(e),t[e]=n}function R_(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-Gn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function of(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-Gn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var dt=0;function Wg(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Xg,lf,$g,qg,Yg,ad=!1,yo=[],qi=null,Yi=null,Ki=null,Fa=new Map,ka=new Map,ji=[],N_="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function yh(t,e){switch(t){case"focusin":case"focusout":qi=null;break;case"dragenter":case"dragleave":Yi=null;break;case"mouseover":case"mouseout":Ki=null;break;case"pointerover":case"pointerout":Fa.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":ka.delete(e.pointerId)}}function ia(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=to(e),e!==null&&lf(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function P_(t,e,n,i,r){switch(e){case"focusin":return qi=ia(qi,t,e,n,i,r),!0;case"dragenter":return Yi=ia(Yi,t,e,n,i,r),!0;case"mouseover":return Ki=ia(Ki,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return Fa.set(s,ia(Fa.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,ka.set(s,ia(ka.get(s)||null,t,e,n,i,r)),!0}return!1}function Kg(t){var e=Lr(t.target);if(e!==null){var n=$r(e);if(n!==null){if(e=n.tag,e===13){if(e=Og(n),e!==null){t.blockedOn=e,Yg(t.priority,function(){$g(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function al(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=od(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);td=i,n.target.dispatchEvent(i),td=null}else return e=to(n),e!==null&&lf(e),t.blockedOn=n,!1;e.shift()}return!0}function Sh(t,e,n){al(t)&&n.delete(e)}function L_(){ad=!1,qi!==null&&al(qi)&&(qi=null),Yi!==null&&al(Yi)&&(Yi=null),Ki!==null&&al(Ki)&&(Ki=null),Fa.forEach(Sh),ka.forEach(Sh)}function ra(t,e){t.blockedOn===e&&(t.blockedOn=null,ad||(ad=!0,yn.unstable_scheduleCallback(yn.unstable_NormalPriority,L_)))}function Oa(t){function e(r){return ra(r,t)}if(0<yo.length){ra(yo[0],t);for(var n=1;n<yo.length;n++){var i=yo[n];i.blockedOn===t&&(i.blockedOn=null)}}for(qi!==null&&ra(qi,t),Yi!==null&&ra(Yi,t),Ki!==null&&ra(Ki,t),Fa.forEach(e),ka.forEach(e),n=0;n<ji.length;n++)i=ji[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<ji.length&&(n=ji[0],n.blockedOn===null);)Kg(n),n.blockedOn===null&&ji.shift()}var bs=Ci.ReactCurrentBatchConfig,wl=!0;function D_(t,e,n,i){var r=dt,s=bs.transition;bs.transition=null;try{dt=1,cf(t,e,n,i)}finally{dt=r,bs.transition=s}}function I_(t,e,n,i){var r=dt,s=bs.transition;bs.transition=null;try{dt=4,cf(t,e,n,i)}finally{dt=r,bs.transition=s}}function cf(t,e,n,i){if(wl){var r=od(t,e,n,i);if(r===null)Wc(t,e,i,Tl,n),yh(t,i);else if(P_(r,t,e,n,i))i.stopPropagation();else if(yh(t,i),e&4&&-1<N_.indexOf(t)){for(;r!==null;){var s=to(r);if(s!==null&&Xg(s),s=od(t,e,n,i),s===null&&Wc(t,e,i,Tl,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Wc(t,e,i,null,n)}}var Tl=null;function od(t,e,n,i){if(Tl=null,t=sf(i),t=Lr(t),t!==null)if(e=$r(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Og(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Tl=t,null}function Zg(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(S_()){case af:return 1;case Hg:return 4;case Ml:case M_:return 16;case Vg:return 536870912;default:return 16}default:return 16}}var Gi=null,uf=null,ol=null;function Qg(){if(ol)return ol;var t,e=uf,n=e.length,i,r="value"in Gi?Gi.value:Gi.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var a=n-t;for(i=1;i<=a&&e[n-i]===r[s-i];i++);return ol=r.slice(t,1<i?1-i:void 0)}function ll(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function So(){return!0}function Mh(){return!1}function Mn(t){function e(n,i,r,s,a){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?So:Mh,this.isPropagationStopped=Mh,this}return At(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=So)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=So)},persist:function(){},isPersistent:So}),e}var qs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},df=Mn(qs),eo=At({},qs,{view:0,detail:0}),U_=Mn(eo),Fc,kc,sa,ic=At({},eo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ff,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==sa&&(sa&&t.type==="mousemove"?(Fc=t.screenX-sa.screenX,kc=t.screenY-sa.screenY):kc=Fc=0,sa=t),Fc)},movementY:function(t){return"movementY"in t?t.movementY:kc}}),Eh=Mn(ic),F_=At({},ic,{dataTransfer:0}),k_=Mn(F_),O_=At({},eo,{relatedTarget:0}),Oc=Mn(O_),B_=At({},qs,{animationName:0,elapsedTime:0,pseudoElement:0}),z_=Mn(B_),j_=At({},qs,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),H_=Mn(j_),V_=At({},qs,{data:0}),wh=Mn(V_),G_={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},W_={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},X_={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function $_(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=X_[t])?!!e[t]:!1}function ff(){return $_}var q_=At({},eo,{key:function(t){if(t.key){var e=G_[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=ll(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?W_[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ff,charCode:function(t){return t.type==="keypress"?ll(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ll(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Y_=Mn(q_),K_=At({},ic,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Th=Mn(K_),Z_=At({},eo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ff}),Q_=Mn(Z_),J_=At({},qs,{propertyName:0,elapsedTime:0,pseudoElement:0}),ey=Mn(J_),ty=At({},ic,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),ny=Mn(ty),iy=[9,13,27,32],hf=Si&&"CompositionEvent"in window,Ta=null;Si&&"documentMode"in document&&(Ta=document.documentMode);var ry=Si&&"TextEvent"in window&&!Ta,Jg=Si&&(!hf||Ta&&8<Ta&&11>=Ta),Ah=" ",Ch=!1;function ev(t,e){switch(t){case"keyup":return iy.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function tv(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ps=!1;function sy(t,e){switch(t){case"compositionend":return tv(e);case"keypress":return e.which!==32?null:(Ch=!0,Ah);case"textInput":return t=e.data,t===Ah&&Ch?null:t;default:return null}}function ay(t,e){if(ps)return t==="compositionend"||!hf&&ev(t,e)?(t=Qg(),ol=uf=Gi=null,ps=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Jg&&e.locale!=="ko"?null:e.data;default:return null}}var oy={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function bh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!oy[t.type]:e==="textarea"}function nv(t,e,n,i){Dg(i),e=Al(e,"onChange"),0<e.length&&(n=new df("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var Aa=null,Ba=null;function ly(t){hv(t,0)}function rc(t){var e=vs(t);if(Ag(e))return t}function cy(t,e){if(t==="change")return e}var iv=!1;if(Si){var Bc;if(Si){var zc="oninput"in document;if(!zc){var Rh=document.createElement("div");Rh.setAttribute("oninput","return;"),zc=typeof Rh.oninput=="function"}Bc=zc}else Bc=!1;iv=Bc&&(!document.documentMode||9<document.documentMode)}function Nh(){Aa&&(Aa.detachEvent("onpropertychange",rv),Ba=Aa=null)}function rv(t){if(t.propertyName==="value"&&rc(Ba)){var e=[];nv(e,Ba,t,sf(t)),kg(ly,e)}}function uy(t,e,n){t==="focusin"?(Nh(),Aa=e,Ba=n,Aa.attachEvent("onpropertychange",rv)):t==="focusout"&&Nh()}function dy(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return rc(Ba)}function fy(t,e){if(t==="click")return rc(e)}function hy(t,e){if(t==="input"||t==="change")return rc(e)}function py(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var $n=typeof Object.is=="function"?Object.is:py;function za(t,e){if($n(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Vu.call(e,r)||!$n(t[r],e[r]))return!1}return!0}function Ph(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Lh(t,e){var n=Ph(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Ph(n)}}function sv(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?sv(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function av(){for(var t=window,e=_l();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=_l(t.document)}return e}function pf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function my(t){var e=av(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&sv(n.ownerDocument.documentElement,n)){if(i!==null&&pf(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=Lh(n,s);var a=Lh(n,i);r&&a&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==a.node||t.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var gy=Si&&"documentMode"in document&&11>=document.documentMode,ms=null,ld=null,Ca=null,cd=!1;function Dh(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;cd||ms==null||ms!==_l(i)||(i=ms,"selectionStart"in i&&pf(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Ca&&za(Ca,i)||(Ca=i,i=Al(ld,"onSelect"),0<i.length&&(e=new df("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=ms)))}function Mo(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var gs={animationend:Mo("Animation","AnimationEnd"),animationiteration:Mo("Animation","AnimationIteration"),animationstart:Mo("Animation","AnimationStart"),transitionend:Mo("Transition","TransitionEnd")},jc={},ov={};Si&&(ov=document.createElement("div").style,"AnimationEvent"in window||(delete gs.animationend.animation,delete gs.animationiteration.animation,delete gs.animationstart.animation),"TransitionEvent"in window||delete gs.transitionend.transition);function sc(t){if(jc[t])return jc[t];if(!gs[t])return t;var e=gs[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in ov)return jc[t]=e[n];return t}var lv=sc("animationend"),cv=sc("animationiteration"),uv=sc("animationstart"),dv=sc("transitionend"),fv=new Map,Ih="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function dr(t,e){fv.set(t,e),Xr(e,[t])}for(var Hc=0;Hc<Ih.length;Hc++){var Vc=Ih[Hc],vy=Vc.toLowerCase(),xy=Vc[0].toUpperCase()+Vc.slice(1);dr(vy,"on"+xy)}dr(lv,"onAnimationEnd");dr(cv,"onAnimationIteration");dr(uv,"onAnimationStart");dr("dblclick","onDoubleClick");dr("focusin","onFocus");dr("focusout","onBlur");dr(dv,"onTransitionEnd");Is("onMouseEnter",["mouseout","mouseover"]);Is("onMouseLeave",["mouseout","mouseover"]);Is("onPointerEnter",["pointerout","pointerover"]);Is("onPointerLeave",["pointerout","pointerover"]);Xr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Xr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Xr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Xr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Xr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Xr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Sa="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),_y=new Set("cancel close invalid load scroll toggle".split(" ").concat(Sa));function Uh(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,v_(i,e,void 0,t),t.currentTarget=null}function hv(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var a=i.length-1;0<=a;a--){var o=i[a],c=o.instance,u=o.currentTarget;if(o=o.listener,c!==s&&r.isPropagationStopped())break e;Uh(r,o,u),s=c}else for(a=0;a<i.length;a++){if(o=i[a],c=o.instance,u=o.currentTarget,o=o.listener,c!==s&&r.isPropagationStopped())break e;Uh(r,o,u),s=c}}}if(Sl)throw t=rd,Sl=!1,rd=null,t}function _t(t,e){var n=e[pd];n===void 0&&(n=e[pd]=new Set);var i=t+"__bubble";n.has(i)||(pv(e,t,2,!1),n.add(i))}function Gc(t,e,n){var i=0;e&&(i|=4),pv(n,t,i,e)}var Eo="_reactListening"+Math.random().toString(36).slice(2);function ja(t){if(!t[Eo]){t[Eo]=!0,Sg.forEach(function(n){n!=="selectionchange"&&(_y.has(n)||Gc(n,!1,t),Gc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Eo]||(e[Eo]=!0,Gc("selectionchange",!1,e))}}function pv(t,e,n,i){switch(Zg(e)){case 1:var r=D_;break;case 4:r=I_;break;default:r=cf}n=r.bind(null,e,n,t),r=void 0,!id||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Wc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var o=i.stateNode.containerInfo;if(o===r||o.nodeType===8&&o.parentNode===r)break;if(a===4)for(a=i.return;a!==null;){var c=a.tag;if((c===3||c===4)&&(c=a.stateNode.containerInfo,c===r||c.nodeType===8&&c.parentNode===r))return;a=a.return}for(;o!==null;){if(a=Lr(o),a===null)return;if(c=a.tag,c===5||c===6){i=s=a;continue e}o=o.parentNode}}i=i.return}kg(function(){var u=s,f=sf(n),p=[];e:{var h=fv.get(t);if(h!==void 0){var m=df,y=t;switch(t){case"keypress":if(ll(n)===0)break e;case"keydown":case"keyup":m=Y_;break;case"focusin":y="focus",m=Oc;break;case"focusout":y="blur",m=Oc;break;case"beforeblur":case"afterblur":m=Oc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=Eh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=k_;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=Q_;break;case lv:case cv:case uv:m=z_;break;case dv:m=ey;break;case"scroll":m=U_;break;case"wheel":m=ny;break;case"copy":case"cut":case"paste":m=H_;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=Th}var v=(e&4)!==0,g=!v&&t==="scroll",d=v?h!==null?h+"Capture":null:h;v=[];for(var x=u,_;x!==null;){_=x;var E=_.stateNode;if(_.tag===5&&E!==null&&(_=E,d!==null&&(E=Ua(x,d),E!=null&&v.push(Ha(x,E,_)))),g)break;x=x.return}0<v.length&&(h=new m(h,y,null,n,f),p.push({event:h,listeners:v}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",m=t==="mouseout"||t==="pointerout",h&&n!==td&&(y=n.relatedTarget||n.fromElement)&&(Lr(y)||y[Mi]))break e;if((m||h)&&(h=f.window===f?f:(h=f.ownerDocument)?h.defaultView||h.parentWindow:window,m?(y=n.relatedTarget||n.toElement,m=u,y=y?Lr(y):null,y!==null&&(g=$r(y),y!==g||y.tag!==5&&y.tag!==6)&&(y=null)):(m=null,y=u),m!==y)){if(v=Eh,E="onMouseLeave",d="onMouseEnter",x="mouse",(t==="pointerout"||t==="pointerover")&&(v=Th,E="onPointerLeave",d="onPointerEnter",x="pointer"),g=m==null?h:vs(m),_=y==null?h:vs(y),h=new v(E,x+"leave",m,n,f),h.target=g,h.relatedTarget=_,E=null,Lr(f)===u&&(v=new v(d,x+"enter",y,n,f),v.target=_,v.relatedTarget=g,E=v),g=E,m&&y)t:{for(v=m,d=y,x=0,_=v;_;_=qr(_))x++;for(_=0,E=d;E;E=qr(E))_++;for(;0<x-_;)v=qr(v),x--;for(;0<_-x;)d=qr(d),_--;for(;x--;){if(v===d||d!==null&&v===d.alternate)break t;v=qr(v),d=qr(d)}v=null}else v=null;m!==null&&Fh(p,h,m,v,!1),y!==null&&g!==null&&Fh(p,g,y,v,!0)}}e:{if(h=u?vs(u):window,m=h.nodeName&&h.nodeName.toLowerCase(),m==="select"||m==="input"&&h.type==="file")var P=cy;else if(bh(h))if(iv)P=hy;else{P=dy;var R=uy}else(m=h.nodeName)&&m.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(P=fy);if(P&&(P=P(t,u))){nv(p,P,n,f);break e}R&&R(t,h,u),t==="focusout"&&(R=h._wrapperState)&&R.controlled&&h.type==="number"&&Ku(h,"number",h.value)}switch(R=u?vs(u):window,t){case"focusin":(bh(R)||R.contentEditable==="true")&&(ms=R,ld=u,Ca=null);break;case"focusout":Ca=ld=ms=null;break;case"mousedown":cd=!0;break;case"contextmenu":case"mouseup":case"dragend":cd=!1,Dh(p,n,f);break;case"selectionchange":if(gy)break;case"keydown":case"keyup":Dh(p,n,f)}var A;if(hf)e:{switch(t){case"compositionstart":var N="onCompositionStart";break e;case"compositionend":N="onCompositionEnd";break e;case"compositionupdate":N="onCompositionUpdate";break e}N=void 0}else ps?ev(t,n)&&(N="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(N="onCompositionStart");N&&(Jg&&n.locale!=="ko"&&(ps||N!=="onCompositionStart"?N==="onCompositionEnd"&&ps&&(A=Qg()):(Gi=f,uf="value"in Gi?Gi.value:Gi.textContent,ps=!0)),R=Al(u,N),0<R.length&&(N=new wh(N,t,null,n,f),p.push({event:N,listeners:R}),A?N.data=A:(A=tv(n),A!==null&&(N.data=A)))),(A=ry?sy(t,n):ay(t,n))&&(u=Al(u,"onBeforeInput"),0<u.length&&(f=new wh("onBeforeInput","beforeinput",null,n,f),p.push({event:f,listeners:u}),f.data=A))}hv(p,e)})}function Ha(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Al(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Ua(t,n),s!=null&&i.unshift(Ha(t,s,r)),s=Ua(t,e),s!=null&&i.push(Ha(t,s,r))),t=t.return}return i}function qr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Fh(t,e,n,i,r){for(var s=e._reactName,a=[];n!==null&&n!==i;){var o=n,c=o.alternate,u=o.stateNode;if(c!==null&&c===i)break;o.tag===5&&u!==null&&(o=u,r?(c=Ua(n,s),c!=null&&a.unshift(Ha(n,c,o))):r||(c=Ua(n,s),c!=null&&a.push(Ha(n,c,o)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var yy=/\r\n?/g,Sy=/\u0000|\uFFFD/g;function kh(t){return(typeof t=="string"?t:""+t).replace(yy,`
`).replace(Sy,"")}function wo(t,e,n){if(e=kh(e),kh(t)!==e&&n)throw Error(ce(425))}function Cl(){}var ud=null,dd=null;function fd(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var hd=typeof setTimeout=="function"?setTimeout:void 0,My=typeof clearTimeout=="function"?clearTimeout:void 0,Oh=typeof Promise=="function"?Promise:void 0,Ey=typeof queueMicrotask=="function"?queueMicrotask:typeof Oh<"u"?function(t){return Oh.resolve(null).then(t).catch(wy)}:hd;function wy(t){setTimeout(function(){throw t})}function Xc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Oa(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Oa(e)}function Zi(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Bh(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Ys=Math.random().toString(36).slice(2),Jn="__reactFiber$"+Ys,Va="__reactProps$"+Ys,Mi="__reactContainer$"+Ys,pd="__reactEvents$"+Ys,Ty="__reactListeners$"+Ys,Ay="__reactHandles$"+Ys;function Lr(t){var e=t[Jn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Mi]||n[Jn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Bh(t);t!==null;){if(n=t[Jn])return n;t=Bh(t)}return e}t=n,n=t.parentNode}return null}function to(t){return t=t[Jn]||t[Mi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function vs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(ce(33))}function ac(t){return t[Va]||null}var md=[],xs=-1;function fr(t){return{current:t}}function St(t){0>xs||(t.current=md[xs],md[xs]=null,xs--)}function gt(t,e){xs++,md[xs]=t.current,t.current=e}var ar={},Qt=fr(ar),cn=fr(!1),Br=ar;function Us(t,e){var n=t.type.contextTypes;if(!n)return ar;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function un(t){return t=t.childContextTypes,t!=null}function bl(){St(cn),St(Qt)}function zh(t,e,n){if(Qt.current!==ar)throw Error(ce(168));gt(Qt,e),gt(cn,n)}function mv(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ce(108,u_(t)||"Unknown",r));return At({},n,i)}function Rl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||ar,Br=Qt.current,gt(Qt,t),gt(cn,cn.current),!0}function jh(t,e,n){var i=t.stateNode;if(!i)throw Error(ce(169));n?(t=mv(t,e,Br),i.__reactInternalMemoizedMergedChildContext=t,St(cn),St(Qt),gt(Qt,t)):St(cn),gt(cn,n)}var hi=null,oc=!1,$c=!1;function gv(t){hi===null?hi=[t]:hi.push(t)}function Cy(t){oc=!0,gv(t)}function hr(){if(!$c&&hi!==null){$c=!0;var t=0,e=dt;try{var n=hi;for(dt=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}hi=null,oc=!1}catch(r){throw hi!==null&&(hi=hi.slice(t+1)),jg(af,hr),r}finally{dt=e,$c=!1}}return null}var _s=[],ys=0,Nl=null,Pl=0,Tn=[],An=0,zr=null,gi=1,vi="";function Tr(t,e){_s[ys++]=Pl,_s[ys++]=Nl,Nl=t,Pl=e}function vv(t,e,n){Tn[An++]=gi,Tn[An++]=vi,Tn[An++]=zr,zr=t;var i=gi;t=vi;var r=32-Gn(i)-1;i&=~(1<<r),n+=1;var s=32-Gn(e)+r;if(30<s){var a=r-r%5;s=(i&(1<<a)-1).toString(32),i>>=a,r-=a,gi=1<<32-Gn(e)+r|n<<r|i,vi=s+t}else gi=1<<s|n<<r|i,vi=t}function mf(t){t.return!==null&&(Tr(t,1),vv(t,1,0))}function gf(t){for(;t===Nl;)Nl=_s[--ys],_s[ys]=null,Pl=_s[--ys],_s[ys]=null;for(;t===zr;)zr=Tn[--An],Tn[An]=null,vi=Tn[--An],Tn[An]=null,gi=Tn[--An],Tn[An]=null}var _n=null,xn=null,Mt=!1,Hn=null;function xv(t,e){var n=bn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Hh(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,_n=t,xn=Zi(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,_n=t,xn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=zr!==null?{id:gi,overflow:vi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=bn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,_n=t,xn=null,!0):!1;default:return!1}}function gd(t){return(t.mode&1)!==0&&(t.flags&128)===0}function vd(t){if(Mt){var e=xn;if(e){var n=e;if(!Hh(t,e)){if(gd(t))throw Error(ce(418));e=Zi(n.nextSibling);var i=_n;e&&Hh(t,e)?xv(i,n):(t.flags=t.flags&-4097|2,Mt=!1,_n=t)}}else{if(gd(t))throw Error(ce(418));t.flags=t.flags&-4097|2,Mt=!1,_n=t}}}function Vh(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;_n=t}function To(t){if(t!==_n)return!1;if(!Mt)return Vh(t),Mt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!fd(t.type,t.memoizedProps)),e&&(e=xn)){if(gd(t))throw _v(),Error(ce(418));for(;e;)xv(t,e),e=Zi(e.nextSibling)}if(Vh(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ce(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){xn=Zi(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}xn=null}}else xn=_n?Zi(t.stateNode.nextSibling):null;return!0}function _v(){for(var t=xn;t;)t=Zi(t.nextSibling)}function Fs(){xn=_n=null,Mt=!1}function vf(t){Hn===null?Hn=[t]:Hn.push(t)}var by=Ci.ReactCurrentBatchConfig;function aa(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(ce(309));var i=n.stateNode}if(!i)throw Error(ce(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(a){var o=r.refs;a===null?delete o[s]:o[s]=a},e._stringRef=s,e)}if(typeof t!="string")throw Error(ce(284));if(!n._owner)throw Error(ce(290,t))}return t}function Ao(t,e){throw t=Object.prototype.toString.call(e),Error(ce(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Gh(t){var e=t._init;return e(t._payload)}function yv(t){function e(d,x){if(t){var _=d.deletions;_===null?(d.deletions=[x],d.flags|=16):_.push(x)}}function n(d,x){if(!t)return null;for(;x!==null;)e(d,x),x=x.sibling;return null}function i(d,x){for(d=new Map;x!==null;)x.key!==null?d.set(x.key,x):d.set(x.index,x),x=x.sibling;return d}function r(d,x){return d=tr(d,x),d.index=0,d.sibling=null,d}function s(d,x,_){return d.index=_,t?(_=d.alternate,_!==null?(_=_.index,_<x?(d.flags|=2,x):_):(d.flags|=2,x)):(d.flags|=1048576,x)}function a(d){return t&&d.alternate===null&&(d.flags|=2),d}function o(d,x,_,E){return x===null||x.tag!==6?(x=eu(_,d.mode,E),x.return=d,x):(x=r(x,_),x.return=d,x)}function c(d,x,_,E){var P=_.type;return P===hs?f(d,x,_.props.children,E,_.key):x!==null&&(x.elementType===P||typeof P=="object"&&P!==null&&P.$$typeof===Bi&&Gh(P)===x.type)?(E=r(x,_.props),E.ref=aa(d,x,_),E.return=d,E):(E=ml(_.type,_.key,_.props,null,d.mode,E),E.ref=aa(d,x,_),E.return=d,E)}function u(d,x,_,E){return x===null||x.tag!==4||x.stateNode.containerInfo!==_.containerInfo||x.stateNode.implementation!==_.implementation?(x=tu(_,d.mode,E),x.return=d,x):(x=r(x,_.children||[]),x.return=d,x)}function f(d,x,_,E,P){return x===null||x.tag!==7?(x=Or(_,d.mode,E,P),x.return=d,x):(x=r(x,_),x.return=d,x)}function p(d,x,_){if(typeof x=="string"&&x!==""||typeof x=="number")return x=eu(""+x,d.mode,_),x.return=d,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case mo:return _=ml(x.type,x.key,x.props,null,d.mode,_),_.ref=aa(d,null,x),_.return=d,_;case fs:return x=tu(x,d.mode,_),x.return=d,x;case Bi:var E=x._init;return p(d,E(x._payload),_)}if(_a(x)||ta(x))return x=Or(x,d.mode,_,null),x.return=d,x;Ao(d,x)}return null}function h(d,x,_,E){var P=x!==null?x.key:null;if(typeof _=="string"&&_!==""||typeof _=="number")return P!==null?null:o(d,x,""+_,E);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case mo:return _.key===P?c(d,x,_,E):null;case fs:return _.key===P?u(d,x,_,E):null;case Bi:return P=_._init,h(d,x,P(_._payload),E)}if(_a(_)||ta(_))return P!==null?null:f(d,x,_,E,null);Ao(d,_)}return null}function m(d,x,_,E,P){if(typeof E=="string"&&E!==""||typeof E=="number")return d=d.get(_)||null,o(x,d,""+E,P);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case mo:return d=d.get(E.key===null?_:E.key)||null,c(x,d,E,P);case fs:return d=d.get(E.key===null?_:E.key)||null,u(x,d,E,P);case Bi:var R=E._init;return m(d,x,_,R(E._payload),P)}if(_a(E)||ta(E))return d=d.get(_)||null,f(x,d,E,P,null);Ao(x,E)}return null}function y(d,x,_,E){for(var P=null,R=null,A=x,N=x=0,S=null;A!==null&&N<_.length;N++){A.index>N?(S=A,A=null):S=A.sibling;var M=h(d,A,_[N],E);if(M===null){A===null&&(A=S);break}t&&A&&M.alternate===null&&e(d,A),x=s(M,x,N),R===null?P=M:R.sibling=M,R=M,A=S}if(N===_.length)return n(d,A),Mt&&Tr(d,N),P;if(A===null){for(;N<_.length;N++)A=p(d,_[N],E),A!==null&&(x=s(A,x,N),R===null?P=A:R.sibling=A,R=A);return Mt&&Tr(d,N),P}for(A=i(d,A);N<_.length;N++)S=m(A,d,N,_[N],E),S!==null&&(t&&S.alternate!==null&&A.delete(S.key===null?N:S.key),x=s(S,x,N),R===null?P=S:R.sibling=S,R=S);return t&&A.forEach(function(I){return e(d,I)}),Mt&&Tr(d,N),P}function v(d,x,_,E){var P=ta(_);if(typeof P!="function")throw Error(ce(150));if(_=P.call(_),_==null)throw Error(ce(151));for(var R=P=null,A=x,N=x=0,S=null,M=_.next();A!==null&&!M.done;N++,M=_.next()){A.index>N?(S=A,A=null):S=A.sibling;var I=h(d,A,M.value,E);if(I===null){A===null&&(A=S);break}t&&A&&I.alternate===null&&e(d,A),x=s(I,x,N),R===null?P=I:R.sibling=I,R=I,A=S}if(M.done)return n(d,A),Mt&&Tr(d,N),P;if(A===null){for(;!M.done;N++,M=_.next())M=p(d,M.value,E),M!==null&&(x=s(M,x,N),R===null?P=M:R.sibling=M,R=M);return Mt&&Tr(d,N),P}for(A=i(d,A);!M.done;N++,M=_.next())M=m(A,d,N,M.value,E),M!==null&&(t&&M.alternate!==null&&A.delete(M.key===null?N:M.key),x=s(M,x,N),R===null?P=M:R.sibling=M,R=M);return t&&A.forEach(function(G){return e(d,G)}),Mt&&Tr(d,N),P}function g(d,x,_,E){if(typeof _=="object"&&_!==null&&_.type===hs&&_.key===null&&(_=_.props.children),typeof _=="object"&&_!==null){switch(_.$$typeof){case mo:e:{for(var P=_.key,R=x;R!==null;){if(R.key===P){if(P=_.type,P===hs){if(R.tag===7){n(d,R.sibling),x=r(R,_.props.children),x.return=d,d=x;break e}}else if(R.elementType===P||typeof P=="object"&&P!==null&&P.$$typeof===Bi&&Gh(P)===R.type){n(d,R.sibling),x=r(R,_.props),x.ref=aa(d,R,_),x.return=d,d=x;break e}n(d,R);break}else e(d,R);R=R.sibling}_.type===hs?(x=Or(_.props.children,d.mode,E,_.key),x.return=d,d=x):(E=ml(_.type,_.key,_.props,null,d.mode,E),E.ref=aa(d,x,_),E.return=d,d=E)}return a(d);case fs:e:{for(R=_.key;x!==null;){if(x.key===R)if(x.tag===4&&x.stateNode.containerInfo===_.containerInfo&&x.stateNode.implementation===_.implementation){n(d,x.sibling),x=r(x,_.children||[]),x.return=d,d=x;break e}else{n(d,x);break}else e(d,x);x=x.sibling}x=tu(_,d.mode,E),x.return=d,d=x}return a(d);case Bi:return R=_._init,g(d,x,R(_._payload),E)}if(_a(_))return y(d,x,_,E);if(ta(_))return v(d,x,_,E);Ao(d,_)}return typeof _=="string"&&_!==""||typeof _=="number"?(_=""+_,x!==null&&x.tag===6?(n(d,x.sibling),x=r(x,_),x.return=d,d=x):(n(d,x),x=eu(_,d.mode,E),x.return=d,d=x),a(d)):n(d,x)}return g}var ks=yv(!0),Sv=yv(!1),Ll=fr(null),Dl=null,Ss=null,xf=null;function _f(){xf=Ss=Dl=null}function yf(t){var e=Ll.current;St(Ll),t._currentValue=e}function xd(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Rs(t,e){Dl=t,xf=Ss=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(ln=!0),t.firstContext=null)}function Ln(t){var e=t._currentValue;if(xf!==t)if(t={context:t,memoizedValue:e,next:null},Ss===null){if(Dl===null)throw Error(ce(308));Ss=t,Dl.dependencies={lanes:0,firstContext:t}}else Ss=Ss.next=t;return e}var Dr=null;function Sf(t){Dr===null?Dr=[t]:Dr.push(t)}function Mv(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Sf(e)):(n.next=r.next,r.next=n),e.interleaved=n,Ei(t,i)}function Ei(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var zi=!1;function Mf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Ev(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function yi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Qi(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,st&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Ei(t,n)}return r=i.interleaved,r===null?(e.next=e,Sf(i)):(e.next=r.next,r.next=e),i.interleaved=e,Ei(t,n)}function cl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,of(t,n)}}function Wh(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Il(t,e,n,i){var r=t.updateQueue;zi=!1;var s=r.firstBaseUpdate,a=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var c=o,u=c.next;c.next=null,a===null?s=u:a.next=u,a=c;var f=t.alternate;f!==null&&(f=f.updateQueue,o=f.lastBaseUpdate,o!==a&&(o===null?f.firstBaseUpdate=u:o.next=u,f.lastBaseUpdate=c))}if(s!==null){var p=r.baseState;a=0,f=u=c=null,o=s;do{var h=o.lane,m=o.eventTime;if((i&h)===h){f!==null&&(f=f.next={eventTime:m,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var y=t,v=o;switch(h=e,m=n,v.tag){case 1:if(y=v.payload,typeof y=="function"){p=y.call(m,p,h);break e}p=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=v.payload,h=typeof y=="function"?y.call(m,p,h):y,h==null)break e;p=At({},p,h);break e;case 2:zi=!0}}o.callback!==null&&o.lane!==0&&(t.flags|=64,h=r.effects,h===null?r.effects=[o]:h.push(o))}else m={eventTime:m,lane:h,tag:o.tag,payload:o.payload,callback:o.callback,next:null},f===null?(u=f=m,c=p):f=f.next=m,a|=h;if(o=o.next,o===null){if(o=r.shared.pending,o===null)break;h=o,o=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);if(f===null&&(c=p),r.baseState=c,r.firstBaseUpdate=u,r.lastBaseUpdate=f,e=r.shared.interleaved,e!==null){r=e;do a|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Hr|=a,t.lanes=a,t.memoizedState=p}}function Xh(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(ce(191,r));r.call(i)}}}var no={},ii=fr(no),Ga=fr(no),Wa=fr(no);function Ir(t){if(t===no)throw Error(ce(174));return t}function Ef(t,e){switch(gt(Wa,e),gt(Ga,t),gt(ii,no),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Qu(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Qu(e,t)}St(ii),gt(ii,e)}function Os(){St(ii),St(Ga),St(Wa)}function wv(t){Ir(Wa.current);var e=Ir(ii.current),n=Qu(e,t.type);e!==n&&(gt(Ga,t),gt(ii,n))}function wf(t){Ga.current===t&&(St(ii),St(Ga))}var Et=fr(0);function Ul(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var qc=[];function Tf(){for(var t=0;t<qc.length;t++)qc[t]._workInProgressVersionPrimary=null;qc.length=0}var ul=Ci.ReactCurrentDispatcher,Yc=Ci.ReactCurrentBatchConfig,jr=0,wt=null,It=null,jt=null,Fl=!1,ba=!1,Xa=0,Ry=0;function $t(){throw Error(ce(321))}function Af(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!$n(t[n],e[n]))return!1;return!0}function Cf(t,e,n,i,r,s){if(jr=s,wt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,ul.current=t===null||t.memoizedState===null?Dy:Iy,t=n(i,r),ba){s=0;do{if(ba=!1,Xa=0,25<=s)throw Error(ce(301));s+=1,jt=It=null,e.updateQueue=null,ul.current=Uy,t=n(i,r)}while(ba)}if(ul.current=kl,e=It!==null&&It.next!==null,jr=0,jt=It=wt=null,Fl=!1,e)throw Error(ce(300));return t}function bf(){var t=Xa!==0;return Xa=0,t}function Kn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return jt===null?wt.memoizedState=jt=t:jt=jt.next=t,jt}function Dn(){if(It===null){var t=wt.alternate;t=t!==null?t.memoizedState:null}else t=It.next;var e=jt===null?wt.memoizedState:jt.next;if(e!==null)jt=e,It=t;else{if(t===null)throw Error(ce(310));It=t,t={memoizedState:It.memoizedState,baseState:It.baseState,baseQueue:It.baseQueue,queue:It.queue,next:null},jt===null?wt.memoizedState=jt=t:jt=jt.next=t}return jt}function $a(t,e){return typeof e=="function"?e(t):e}function Kc(t){var e=Dn(),n=e.queue;if(n===null)throw Error(ce(311));n.lastRenderedReducer=t;var i=It,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var a=r.next;r.next=s.next,s.next=a}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var o=a=null,c=null,u=s;do{var f=u.lane;if((jr&f)===f)c!==null&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),i=u.hasEagerState?u.eagerState:t(i,u.action);else{var p={lane:f,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};c===null?(o=c=p,a=i):c=c.next=p,wt.lanes|=f,Hr|=f}u=u.next}while(u!==null&&u!==s);c===null?a=i:c.next=o,$n(i,e.memoizedState)||(ln=!0),e.memoizedState=i,e.baseState=a,e.baseQueue=c,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,wt.lanes|=s,Hr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Zc(t){var e=Dn(),n=e.queue;if(n===null)throw Error(ce(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var a=r=r.next;do s=t(s,a.action),a=a.next;while(a!==r);$n(s,e.memoizedState)||(ln=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function Tv(){}function Av(t,e){var n=wt,i=Dn(),r=e(),s=!$n(i.memoizedState,r);if(s&&(i.memoizedState=r,ln=!0),i=i.queue,Rf(Rv.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||jt!==null&&jt.memoizedState.tag&1){if(n.flags|=2048,qa(9,bv.bind(null,n,i,r,e),void 0,null),Ht===null)throw Error(ce(349));jr&30||Cv(n,e,r)}return r}function Cv(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=wt.updateQueue,e===null?(e={lastEffect:null,stores:null},wt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function bv(t,e,n,i){e.value=n,e.getSnapshot=i,Nv(e)&&Pv(t)}function Rv(t,e,n){return n(function(){Nv(e)&&Pv(t)})}function Nv(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!$n(t,n)}catch{return!0}}function Pv(t){var e=Ei(t,1);e!==null&&Wn(e,t,1,-1)}function $h(t){var e=Kn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:$a,lastRenderedState:t},e.queue=t,t=t.dispatch=Ly.bind(null,wt,t),[e.memoizedState,t]}function qa(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=wt.updateQueue,e===null?(e={lastEffect:null,stores:null},wt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function Lv(){return Dn().memoizedState}function dl(t,e,n,i){var r=Kn();wt.flags|=t,r.memoizedState=qa(1|e,n,void 0,i===void 0?null:i)}function lc(t,e,n,i){var r=Dn();i=i===void 0?null:i;var s=void 0;if(It!==null){var a=It.memoizedState;if(s=a.destroy,i!==null&&Af(i,a.deps)){r.memoizedState=qa(e,n,s,i);return}}wt.flags|=t,r.memoizedState=qa(1|e,n,s,i)}function qh(t,e){return dl(8390656,8,t,e)}function Rf(t,e){return lc(2048,8,t,e)}function Dv(t,e){return lc(4,2,t,e)}function Iv(t,e){return lc(4,4,t,e)}function Uv(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Fv(t,e,n){return n=n!=null?n.concat([t]):null,lc(4,4,Uv.bind(null,e,t),n)}function Nf(){}function kv(t,e){var n=Dn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Af(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function Ov(t,e){var n=Dn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Af(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function Bv(t,e,n){return jr&21?($n(n,e)||(n=Gg(),wt.lanes|=n,Hr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,ln=!0),t.memoizedState=n)}function Ny(t,e){var n=dt;dt=n!==0&&4>n?n:4,t(!0);var i=Yc.transition;Yc.transition={};try{t(!1),e()}finally{dt=n,Yc.transition=i}}function zv(){return Dn().memoizedState}function Py(t,e,n){var i=er(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},jv(t))Hv(e,n);else if(n=Mv(t,e,n,i),n!==null){var r=tn();Wn(n,t,i,r),Vv(n,e,i)}}function Ly(t,e,n){var i=er(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(jv(t))Hv(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var a=e.lastRenderedState,o=s(a,n);if(r.hasEagerState=!0,r.eagerState=o,$n(o,a)){var c=e.interleaved;c===null?(r.next=r,Sf(e)):(r.next=c.next,c.next=r),e.interleaved=r;return}}catch{}finally{}n=Mv(t,e,r,i),n!==null&&(r=tn(),Wn(n,t,i,r),Vv(n,e,i))}}function jv(t){var e=t.alternate;return t===wt||e!==null&&e===wt}function Hv(t,e){ba=Fl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Vv(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,of(t,n)}}var kl={readContext:Ln,useCallback:$t,useContext:$t,useEffect:$t,useImperativeHandle:$t,useInsertionEffect:$t,useLayoutEffect:$t,useMemo:$t,useReducer:$t,useRef:$t,useState:$t,useDebugValue:$t,useDeferredValue:$t,useTransition:$t,useMutableSource:$t,useSyncExternalStore:$t,useId:$t,unstable_isNewReconciler:!1},Dy={readContext:Ln,useCallback:function(t,e){return Kn().memoizedState=[t,e===void 0?null:e],t},useContext:Ln,useEffect:qh,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,dl(4194308,4,Uv.bind(null,e,t),n)},useLayoutEffect:function(t,e){return dl(4194308,4,t,e)},useInsertionEffect:function(t,e){return dl(4,2,t,e)},useMemo:function(t,e){var n=Kn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=Kn();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=Py.bind(null,wt,t),[i.memoizedState,t]},useRef:function(t){var e=Kn();return t={current:t},e.memoizedState=t},useState:$h,useDebugValue:Nf,useDeferredValue:function(t){return Kn().memoizedState=t},useTransition:function(){var t=$h(!1),e=t[0];return t=Ny.bind(null,t[1]),Kn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=wt,r=Kn();if(Mt){if(n===void 0)throw Error(ce(407));n=n()}else{if(n=e(),Ht===null)throw Error(ce(349));jr&30||Cv(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,qh(Rv.bind(null,i,s,t),[t]),i.flags|=2048,qa(9,bv.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=Kn(),e=Ht.identifierPrefix;if(Mt){var n=vi,i=gi;n=(i&~(1<<32-Gn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=Xa++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=Ry++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},Iy={readContext:Ln,useCallback:kv,useContext:Ln,useEffect:Rf,useImperativeHandle:Fv,useInsertionEffect:Dv,useLayoutEffect:Iv,useMemo:Ov,useReducer:Kc,useRef:Lv,useState:function(){return Kc($a)},useDebugValue:Nf,useDeferredValue:function(t){var e=Dn();return Bv(e,It.memoizedState,t)},useTransition:function(){var t=Kc($a)[0],e=Dn().memoizedState;return[t,e]},useMutableSource:Tv,useSyncExternalStore:Av,useId:zv,unstable_isNewReconciler:!1},Uy={readContext:Ln,useCallback:kv,useContext:Ln,useEffect:Rf,useImperativeHandle:Fv,useInsertionEffect:Dv,useLayoutEffect:Iv,useMemo:Ov,useReducer:Zc,useRef:Lv,useState:function(){return Zc($a)},useDebugValue:Nf,useDeferredValue:function(t){var e=Dn();return It===null?e.memoizedState=t:Bv(e,It.memoizedState,t)},useTransition:function(){var t=Zc($a)[0],e=Dn().memoizedState;return[t,e]},useMutableSource:Tv,useSyncExternalStore:Av,useId:zv,unstable_isNewReconciler:!1};function zn(t,e){if(t&&t.defaultProps){e=At({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function _d(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:At({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var cc={isMounted:function(t){return(t=t._reactInternals)?$r(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=tn(),r=er(t),s=yi(i,r);s.payload=e,n!=null&&(s.callback=n),e=Qi(t,s,r),e!==null&&(Wn(e,t,r,i),cl(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=tn(),r=er(t),s=yi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Qi(t,s,r),e!==null&&(Wn(e,t,r,i),cl(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=tn(),i=er(t),r=yi(n,i);r.tag=2,e!=null&&(r.callback=e),e=Qi(t,r,i),e!==null&&(Wn(e,t,i,n),cl(e,t,i))}};function Yh(t,e,n,i,r,s,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,a):e.prototype&&e.prototype.isPureReactComponent?!za(n,i)||!za(r,s):!0}function Gv(t,e,n){var i=!1,r=ar,s=e.contextType;return typeof s=="object"&&s!==null?s=Ln(s):(r=un(e)?Br:Qt.current,i=e.contextTypes,s=(i=i!=null)?Us(t,r):ar),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=cc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function Kh(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&cc.enqueueReplaceState(e,e.state,null)}function yd(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Mf(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Ln(s):(s=un(e)?Br:Qt.current,r.context=Us(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(_d(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&cc.enqueueReplaceState(r,r.state,null),Il(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Bs(t,e){try{var n="",i=e;do n+=c_(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Qc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Sd(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var Fy=typeof WeakMap=="function"?WeakMap:Map;function Wv(t,e,n){n=yi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Bl||(Bl=!0,Pd=i),Sd(t,e)},n}function Xv(t,e,n){n=yi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){Sd(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Sd(t,e),typeof i!="function"&&(Ji===null?Ji=new Set([this]):Ji.add(this));var a=e.stack;this.componentDidCatch(e.value,{componentStack:a!==null?a:""})}),n}function Zh(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new Fy;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=Ky.bind(null,t,e,n),e.then(t,t))}function Qh(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Jh(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=yi(-1,1),e.tag=2,Qi(n,e,1))),n.lanes|=1),t)}var ky=Ci.ReactCurrentOwner,ln=!1;function en(t,e,n,i){e.child=t===null?Sv(e,null,n,i):ks(e,t.child,n,i)}function ep(t,e,n,i,r){n=n.render;var s=e.ref;return Rs(e,r),i=Cf(t,e,n,i,s,r),n=bf(),t!==null&&!ln?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,wi(t,e,r)):(Mt&&n&&mf(e),e.flags|=1,en(t,e,i,r),e.child)}function tp(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!Of(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,$v(t,e,s,i,r)):(t=ml(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:za,n(a,i)&&t.ref===e.ref)return wi(t,e,r)}return e.flags|=1,t=tr(s,i),t.ref=e.ref,t.return=e,e.child=t}function $v(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(za(s,i)&&t.ref===e.ref)if(ln=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(ln=!0);else return e.lanes=t.lanes,wi(t,e,r)}return Md(t,e,n,i,r)}function qv(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},gt(Es,vn),vn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,gt(Es,vn),vn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,gt(Es,vn),vn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,gt(Es,vn),vn|=i;return en(t,e,r,n),e.child}function Yv(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Md(t,e,n,i,r){var s=un(n)?Br:Qt.current;return s=Us(e,s),Rs(e,r),n=Cf(t,e,n,i,s,r),i=bf(),t!==null&&!ln?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,wi(t,e,r)):(Mt&&i&&mf(e),e.flags|=1,en(t,e,n,r),e.child)}function np(t,e,n,i,r){if(un(n)){var s=!0;Rl(e)}else s=!1;if(Rs(e,r),e.stateNode===null)fl(t,e),Gv(e,n,i),yd(e,n,i,r),i=!0;else if(t===null){var a=e.stateNode,o=e.memoizedProps;a.props=o;var c=a.context,u=n.contextType;typeof u=="object"&&u!==null?u=Ln(u):(u=un(n)?Br:Qt.current,u=Us(e,u));var f=n.getDerivedStateFromProps,p=typeof f=="function"||typeof a.getSnapshotBeforeUpdate=="function";p||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==i||c!==u)&&Kh(e,a,i,u),zi=!1;var h=e.memoizedState;a.state=h,Il(e,i,a,r),c=e.memoizedState,o!==i||h!==c||cn.current||zi?(typeof f=="function"&&(_d(e,n,f,i),c=e.memoizedState),(o=zi||Yh(e,n,o,i,h,c,u))?(p||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=c),a.props=i,a.state=c,a.context=u,i=o):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{a=e.stateNode,Ev(t,e),o=e.memoizedProps,u=e.type===e.elementType?o:zn(e.type,o),a.props=u,p=e.pendingProps,h=a.context,c=n.contextType,typeof c=="object"&&c!==null?c=Ln(c):(c=un(n)?Br:Qt.current,c=Us(e,c));var m=n.getDerivedStateFromProps;(f=typeof m=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==p||h!==c)&&Kh(e,a,i,c),zi=!1,h=e.memoizedState,a.state=h,Il(e,i,a,r);var y=e.memoizedState;o!==p||h!==y||cn.current||zi?(typeof m=="function"&&(_d(e,n,m,i),y=e.memoizedState),(u=zi||Yh(e,n,u,i,h,y,c)||!1)?(f||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,y,c),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,y,c)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=y),a.props=i,a.state=y,a.context=c,i=u):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),i=!1)}return Ed(t,e,n,i,s,r)}function Ed(t,e,n,i,r,s){Yv(t,e);var a=(e.flags&128)!==0;if(!i&&!a)return r&&jh(e,n,!1),wi(t,e,s);i=e.stateNode,ky.current=e;var o=a&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&a?(e.child=ks(e,t.child,null,s),e.child=ks(e,null,o,s)):en(t,e,o,s),e.memoizedState=i.state,r&&jh(e,n,!0),e.child}function Kv(t){var e=t.stateNode;e.pendingContext?zh(t,e.pendingContext,e.pendingContext!==e.context):e.context&&zh(t,e.context,!1),Ef(t,e.containerInfo)}function ip(t,e,n,i,r){return Fs(),vf(r),e.flags|=256,en(t,e,n,i),e.child}var wd={dehydrated:null,treeContext:null,retryLane:0};function Td(t){return{baseLanes:t,cachePool:null,transitions:null}}function Zv(t,e,n){var i=e.pendingProps,r=Et.current,s=!1,a=(e.flags&128)!==0,o;if((o=a)||(o=t!==null&&t.memoizedState===null?!1:(r&2)!==0),o?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),gt(Et,r&1),t===null)return vd(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(a=i.children,t=i.fallback,s?(i=e.mode,s=e.child,a={mode:"hidden",children:a},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=fc(a,i,0,null),t=Or(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Td(n),e.memoizedState=wd,t):Pf(e,a));if(r=t.memoizedState,r!==null&&(o=r.dehydrated,o!==null))return Oy(t,e,a,i,o,r,n);if(s){s=i.fallback,a=e.mode,r=t.child,o=r.sibling;var c={mode:"hidden",children:i.children};return!(a&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=c,e.deletions=null):(i=tr(r,c),i.subtreeFlags=r.subtreeFlags&14680064),o!==null?s=tr(o,s):(s=Or(s,a,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,a=t.child.memoizedState,a=a===null?Td(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=t.childLanes&~n,e.memoizedState=wd,i}return s=t.child,t=s.sibling,i=tr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function Pf(t,e){return e=fc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Co(t,e,n,i){return i!==null&&vf(i),ks(e,t.child,null,n),t=Pf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Oy(t,e,n,i,r,s,a){if(n)return e.flags&256?(e.flags&=-257,i=Qc(Error(ce(422))),Co(t,e,a,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=fc({mode:"visible",children:i.children},r,0,null),s=Or(s,r,a,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&ks(e,t.child,null,a),e.child.memoizedState=Td(a),e.memoizedState=wd,s);if(!(e.mode&1))return Co(t,e,a,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var o=i.dgst;return i=o,s=Error(ce(419)),i=Qc(s,i,void 0),Co(t,e,a,i)}if(o=(a&t.childLanes)!==0,ln||o){if(i=Ht,i!==null){switch(a&-a){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|a)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Ei(t,r),Wn(i,t,r,-1))}return kf(),i=Qc(Error(ce(421))),Co(t,e,a,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=Zy.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,xn=Zi(r.nextSibling),_n=e,Mt=!0,Hn=null,t!==null&&(Tn[An++]=gi,Tn[An++]=vi,Tn[An++]=zr,gi=t.id,vi=t.overflow,zr=e),e=Pf(e,i.children),e.flags|=4096,e)}function rp(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),xd(t.return,e,n)}function Jc(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function Qv(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(en(t,e,i.children,n),i=Et.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&rp(t,n,e);else if(t.tag===19)rp(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(gt(Et,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Ul(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Jc(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Ul(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Jc(e,!0,n,null,s);break;case"together":Jc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function fl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function wi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Hr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(ce(153));if(e.child!==null){for(t=e.child,n=tr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=tr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function By(t,e,n){switch(e.tag){case 3:Kv(e),Fs();break;case 5:wv(e);break;case 1:un(e.type)&&Rl(e);break;case 4:Ef(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;gt(Ll,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(gt(Et,Et.current&1),e.flags|=128,null):n&e.child.childLanes?Zv(t,e,n):(gt(Et,Et.current&1),t=wi(t,e,n),t!==null?t.sibling:null);gt(Et,Et.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return Qv(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),gt(Et,Et.current),i)break;return null;case 22:case 23:return e.lanes=0,qv(t,e,n)}return wi(t,e,n)}var Jv,Ad,e0,t0;Jv=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Ad=function(){};e0=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Ir(ii.current);var s=null;switch(n){case"input":r=qu(t,r),i=qu(t,i),s=[];break;case"select":r=At({},r,{value:void 0}),i=At({},i,{value:void 0}),s=[];break;case"textarea":r=Zu(t,r),i=Zu(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=Cl)}Ju(n,i);var a;n=null;for(u in r)if(!i.hasOwnProperty(u)&&r.hasOwnProperty(u)&&r[u]!=null)if(u==="style"){var o=r[u];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Da.hasOwnProperty(u)?s||(s=[]):(s=s||[]).push(u,null));for(u in i){var c=i[u];if(o=r!=null?r[u]:void 0,i.hasOwnProperty(u)&&c!==o&&(c!=null||o!=null))if(u==="style")if(o){for(a in o)!o.hasOwnProperty(a)||c&&c.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in c)c.hasOwnProperty(a)&&o[a]!==c[a]&&(n||(n={}),n[a]=c[a])}else n||(s||(s=[]),s.push(u,n)),n=c;else u==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,o=o?o.__html:void 0,c!=null&&o!==c&&(s=s||[]).push(u,c)):u==="children"?typeof c!="string"&&typeof c!="number"||(s=s||[]).push(u,""+c):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Da.hasOwnProperty(u)?(c!=null&&u==="onScroll"&&_t("scroll",t),s||o===c||(s=[])):(s=s||[]).push(u,c))}n&&(s=s||[]).push("style",n);var u=s;(e.updateQueue=u)&&(e.flags|=4)}};t0=function(t,e,n,i){n!==i&&(e.flags|=4)};function oa(t,e){if(!Mt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function qt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function zy(t,e,n){var i=e.pendingProps;switch(gf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return qt(e),null;case 1:return un(e.type)&&bl(),qt(e),null;case 3:return i=e.stateNode,Os(),St(cn),St(Qt),Tf(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(To(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Hn!==null&&(Id(Hn),Hn=null))),Ad(t,e),qt(e),null;case 5:wf(e);var r=Ir(Wa.current);if(n=e.type,t!==null&&e.stateNode!=null)e0(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ce(166));return qt(e),null}if(t=Ir(ii.current),To(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[Jn]=e,i[Va]=s,t=(e.mode&1)!==0,n){case"dialog":_t("cancel",i),_t("close",i);break;case"iframe":case"object":case"embed":_t("load",i);break;case"video":case"audio":for(r=0;r<Sa.length;r++)_t(Sa[r],i);break;case"source":_t("error",i);break;case"img":case"image":case"link":_t("error",i),_t("load",i);break;case"details":_t("toggle",i);break;case"input":hh(i,s),_t("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},_t("invalid",i);break;case"textarea":mh(i,s),_t("invalid",i)}Ju(n,s),r=null;for(var a in s)if(s.hasOwnProperty(a)){var o=s[a];a==="children"?typeof o=="string"?i.textContent!==o&&(s.suppressHydrationWarning!==!0&&wo(i.textContent,o,t),r=["children",o]):typeof o=="number"&&i.textContent!==""+o&&(s.suppressHydrationWarning!==!0&&wo(i.textContent,o,t),r=["children",""+o]):Da.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&_t("scroll",i)}switch(n){case"input":go(i),ph(i,s,!0);break;case"textarea":go(i),gh(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=Cl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{a=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Rg(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=a.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=a.createElement(n,{is:i.is}):(t=a.createElement(n),n==="select"&&(a=t,i.multiple?a.multiple=!0:i.size&&(a.size=i.size))):t=a.createElementNS(t,n),t[Jn]=e,t[Va]=i,Jv(t,e,!1,!1),e.stateNode=t;e:{switch(a=ed(n,i),n){case"dialog":_t("cancel",t),_t("close",t),r=i;break;case"iframe":case"object":case"embed":_t("load",t),r=i;break;case"video":case"audio":for(r=0;r<Sa.length;r++)_t(Sa[r],t);r=i;break;case"source":_t("error",t),r=i;break;case"img":case"image":case"link":_t("error",t),_t("load",t),r=i;break;case"details":_t("toggle",t),r=i;break;case"input":hh(t,i),r=qu(t,i),_t("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=At({},i,{value:void 0}),_t("invalid",t);break;case"textarea":mh(t,i),r=Zu(t,i),_t("invalid",t);break;default:r=i}Ju(n,r),o=r;for(s in o)if(o.hasOwnProperty(s)){var c=o[s];s==="style"?Lg(t,c):s==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Ng(t,c)):s==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&Ia(t,c):typeof c=="number"&&Ia(t,""+c):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Da.hasOwnProperty(s)?c!=null&&s==="onScroll"&&_t("scroll",t):c!=null&&ef(t,s,c,a))}switch(n){case"input":go(t),ph(t,i,!1);break;case"textarea":go(t),gh(t);break;case"option":i.value!=null&&t.setAttribute("value",""+sr(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?Ts(t,!!i.multiple,s,!1):i.defaultValue!=null&&Ts(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=Cl)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return qt(e),null;case 6:if(t&&e.stateNode!=null)t0(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ce(166));if(n=Ir(Wa.current),Ir(ii.current),To(e)){if(i=e.stateNode,n=e.memoizedProps,i[Jn]=e,(s=i.nodeValue!==n)&&(t=_n,t!==null))switch(t.tag){case 3:wo(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&wo(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[Jn]=e,e.stateNode=i}return qt(e),null;case 13:if(St(Et),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Mt&&xn!==null&&e.mode&1&&!(e.flags&128))_v(),Fs(),e.flags|=98560,s=!1;else if(s=To(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(ce(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(ce(317));s[Jn]=e}else Fs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;qt(e),s=!1}else Hn!==null&&(Id(Hn),Hn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||Et.current&1?Ut===0&&(Ut=3):kf())),e.updateQueue!==null&&(e.flags|=4),qt(e),null);case 4:return Os(),Ad(t,e),t===null&&ja(e.stateNode.containerInfo),qt(e),null;case 10:return yf(e.type._context),qt(e),null;case 17:return un(e.type)&&bl(),qt(e),null;case 19:if(St(Et),s=e.memoizedState,s===null)return qt(e),null;if(i=(e.flags&128)!==0,a=s.rendering,a===null)if(i)oa(s,!1);else{if(Ut!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(a=Ul(t),a!==null){for(e.flags|=128,oa(s,!1),i=a.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,t=a.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return gt(Et,Et.current&1|2),e.child}t=t.sibling}s.tail!==null&&bt()>zs&&(e.flags|=128,i=!0,oa(s,!1),e.lanes=4194304)}else{if(!i)if(t=Ul(a),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),oa(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!Mt)return qt(e),null}else 2*bt()-s.renderingStartTime>zs&&n!==1073741824&&(e.flags|=128,i=!0,oa(s,!1),e.lanes=4194304);s.isBackwards?(a.sibling=e.child,e.child=a):(n=s.last,n!==null?n.sibling=a:e.child=a,s.last=a)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=bt(),e.sibling=null,n=Et.current,gt(Et,i?n&1|2:n&1),e):(qt(e),null);case 22:case 23:return Ff(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?vn&1073741824&&(qt(e),e.subtreeFlags&6&&(e.flags|=8192)):qt(e),null;case 24:return null;case 25:return null}throw Error(ce(156,e.tag))}function jy(t,e){switch(gf(e),e.tag){case 1:return un(e.type)&&bl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Os(),St(cn),St(Qt),Tf(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return wf(e),null;case 13:if(St(Et),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(ce(340));Fs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return St(Et),null;case 4:return Os(),null;case 10:return yf(e.type._context),null;case 22:case 23:return Ff(),null;case 24:return null;default:return null}}var bo=!1,Zt=!1,Hy=typeof WeakSet=="function"?WeakSet:Set,Ae=null;function Ms(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Ct(t,e,i)}else n.current=null}function Cd(t,e,n){try{n()}catch(i){Ct(t,e,i)}}var sp=!1;function Vy(t,e){if(ud=wl,t=av(),pf(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,o=-1,c=-1,u=0,f=0,p=t,h=null;t:for(;;){for(var m;p!==n||r!==0&&p.nodeType!==3||(o=a+r),p!==s||i!==0&&p.nodeType!==3||(c=a+i),p.nodeType===3&&(a+=p.nodeValue.length),(m=p.firstChild)!==null;)h=p,p=m;for(;;){if(p===t)break t;if(h===n&&++u===r&&(o=a),h===s&&++f===i&&(c=a),(m=p.nextSibling)!==null)break;p=h,h=p.parentNode}p=m}n=o===-1||c===-1?null:{start:o,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(dd={focusedElem:t,selectionRange:n},wl=!1,Ae=e;Ae!==null;)if(e=Ae,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Ae=t;else for(;Ae!==null;){e=Ae;try{var y=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var v=y.memoizedProps,g=y.memoizedState,d=e.stateNode,x=d.getSnapshotBeforeUpdate(e.elementType===e.type?v:zn(e.type,v),g);d.__reactInternalSnapshotBeforeUpdate=x}break;case 3:var _=e.stateNode.containerInfo;_.nodeType===1?_.textContent="":_.nodeType===9&&_.documentElement&&_.removeChild(_.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ce(163))}}catch(E){Ct(e,e.return,E)}if(t=e.sibling,t!==null){t.return=e.return,Ae=t;break}Ae=e.return}return y=sp,sp=!1,y}function Ra(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Cd(e,n,s)}r=r.next}while(r!==i)}}function uc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function bd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function n0(t){var e=t.alternate;e!==null&&(t.alternate=null,n0(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Jn],delete e[Va],delete e[pd],delete e[Ty],delete e[Ay])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function i0(t){return t.tag===5||t.tag===3||t.tag===4}function ap(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||i0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Rd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Cl));else if(i!==4&&(t=t.child,t!==null))for(Rd(t,e,n),t=t.sibling;t!==null;)Rd(t,e,n),t=t.sibling}function Nd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Nd(t,e,n),t=t.sibling;t!==null;)Nd(t,e,n),t=t.sibling}var Vt=null,jn=!1;function Li(t,e,n){for(n=n.child;n!==null;)r0(t,e,n),n=n.sibling}function r0(t,e,n){if(ni&&typeof ni.onCommitFiberUnmount=="function")try{ni.onCommitFiberUnmount(nc,n)}catch{}switch(n.tag){case 5:Zt||Ms(n,e);case 6:var i=Vt,r=jn;Vt=null,Li(t,e,n),Vt=i,jn=r,Vt!==null&&(jn?(t=Vt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Vt.removeChild(n.stateNode));break;case 18:Vt!==null&&(jn?(t=Vt,n=n.stateNode,t.nodeType===8?Xc(t.parentNode,n):t.nodeType===1&&Xc(t,n),Oa(t)):Xc(Vt,n.stateNode));break;case 4:i=Vt,r=jn,Vt=n.stateNode.containerInfo,jn=!0,Li(t,e,n),Vt=i,jn=r;break;case 0:case 11:case 14:case 15:if(!Zt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&Cd(n,e,a),r=r.next}while(r!==i)}Li(t,e,n);break;case 1:if(!Zt&&(Ms(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(o){Ct(n,e,o)}Li(t,e,n);break;case 21:Li(t,e,n);break;case 22:n.mode&1?(Zt=(i=Zt)||n.memoizedState!==null,Li(t,e,n),Zt=i):Li(t,e,n);break;default:Li(t,e,n)}}function op(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new Hy),e.forEach(function(i){var r=Qy.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Fn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,a=e,o=a;e:for(;o!==null;){switch(o.tag){case 5:Vt=o.stateNode,jn=!1;break e;case 3:Vt=o.stateNode.containerInfo,jn=!0;break e;case 4:Vt=o.stateNode.containerInfo,jn=!0;break e}o=o.return}if(Vt===null)throw Error(ce(160));r0(s,a,r),Vt=null,jn=!1;var c=r.alternate;c!==null&&(c.return=null),r.return=null}catch(u){Ct(r,e,u)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)s0(e,t),e=e.sibling}function s0(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Fn(e,t),Yn(t),i&4){try{Ra(3,t,t.return),uc(3,t)}catch(v){Ct(t,t.return,v)}try{Ra(5,t,t.return)}catch(v){Ct(t,t.return,v)}}break;case 1:Fn(e,t),Yn(t),i&512&&n!==null&&Ms(n,n.return);break;case 5:if(Fn(e,t),Yn(t),i&512&&n!==null&&Ms(n,n.return),t.flags&32){var r=t.stateNode;try{Ia(r,"")}catch(v){Ct(t,t.return,v)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,a=n!==null?n.memoizedProps:s,o=t.type,c=t.updateQueue;if(t.updateQueue=null,c!==null)try{o==="input"&&s.type==="radio"&&s.name!=null&&Cg(r,s),ed(o,a);var u=ed(o,s);for(a=0;a<c.length;a+=2){var f=c[a],p=c[a+1];f==="style"?Lg(r,p):f==="dangerouslySetInnerHTML"?Ng(r,p):f==="children"?Ia(r,p):ef(r,f,p,u)}switch(o){case"input":Yu(r,s);break;case"textarea":bg(r,s);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var m=s.value;m!=null?Ts(r,!!s.multiple,m,!1):h!==!!s.multiple&&(s.defaultValue!=null?Ts(r,!!s.multiple,s.defaultValue,!0):Ts(r,!!s.multiple,s.multiple?[]:"",!1))}r[Va]=s}catch(v){Ct(t,t.return,v)}}break;case 6:if(Fn(e,t),Yn(t),i&4){if(t.stateNode===null)throw Error(ce(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(v){Ct(t,t.return,v)}}break;case 3:if(Fn(e,t),Yn(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Oa(e.containerInfo)}catch(v){Ct(t,t.return,v)}break;case 4:Fn(e,t),Yn(t);break;case 13:Fn(e,t),Yn(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(If=bt())),i&4&&op(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(Zt=(u=Zt)||f,Fn(e,t),Zt=u):Fn(e,t),Yn(t),i&8192){if(u=t.memoizedState!==null,(t.stateNode.isHidden=u)&&!f&&t.mode&1)for(Ae=t,f=t.child;f!==null;){for(p=Ae=f;Ae!==null;){switch(h=Ae,m=h.child,h.tag){case 0:case 11:case 14:case 15:Ra(4,h,h.return);break;case 1:Ms(h,h.return);var y=h.stateNode;if(typeof y.componentWillUnmount=="function"){i=h,n=h.return;try{e=i,y.props=e.memoizedProps,y.state=e.memoizedState,y.componentWillUnmount()}catch(v){Ct(i,n,v)}}break;case 5:Ms(h,h.return);break;case 22:if(h.memoizedState!==null){cp(p);continue}}m!==null?(m.return=h,Ae=m):cp(p)}f=f.sibling}e:for(f=null,p=t;;){if(p.tag===5){if(f===null){f=p;try{r=p.stateNode,u?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(o=p.stateNode,c=p.memoizedProps.style,a=c!=null&&c.hasOwnProperty("display")?c.display:null,o.style.display=Pg("display",a))}catch(v){Ct(t,t.return,v)}}}else if(p.tag===6){if(f===null)try{p.stateNode.nodeValue=u?"":p.memoizedProps}catch(v){Ct(t,t.return,v)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===t)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===t)break e;for(;p.sibling===null;){if(p.return===null||p.return===t)break e;f===p&&(f=null),p=p.return}f===p&&(f=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:Fn(e,t),Yn(t),i&4&&op(t);break;case 21:break;default:Fn(e,t),Yn(t)}}function Yn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(i0(n)){var i=n;break e}n=n.return}throw Error(ce(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Ia(r,""),i.flags&=-33);var s=ap(t);Nd(t,s,r);break;case 3:case 4:var a=i.stateNode.containerInfo,o=ap(t);Rd(t,o,a);break;default:throw Error(ce(161))}}catch(c){Ct(t,t.return,c)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Gy(t,e,n){Ae=t,a0(t)}function a0(t,e,n){for(var i=(t.mode&1)!==0;Ae!==null;){var r=Ae,s=r.child;if(r.tag===22&&i){var a=r.memoizedState!==null||bo;if(!a){var o=r.alternate,c=o!==null&&o.memoizedState!==null||Zt;o=bo;var u=Zt;if(bo=a,(Zt=c)&&!u)for(Ae=r;Ae!==null;)a=Ae,c=a.child,a.tag===22&&a.memoizedState!==null?up(r):c!==null?(c.return=a,Ae=c):up(r);for(;s!==null;)Ae=s,a0(s),s=s.sibling;Ae=r,bo=o,Zt=u}lp(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Ae=s):lp(t)}}function lp(t){for(;Ae!==null;){var e=Ae;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Zt||uc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Zt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:zn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Xh(e,s,i);break;case 3:var a=e.updateQueue;if(a!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Xh(e,a,n)}break;case 5:var o=e.stateNode;if(n===null&&e.flags&4){n=o;var c=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var u=e.alternate;if(u!==null){var f=u.memoizedState;if(f!==null){var p=f.dehydrated;p!==null&&Oa(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ce(163))}Zt||e.flags&512&&bd(e)}catch(h){Ct(e,e.return,h)}}if(e===t){Ae=null;break}if(n=e.sibling,n!==null){n.return=e.return,Ae=n;break}Ae=e.return}}function cp(t){for(;Ae!==null;){var e=Ae;if(e===t){Ae=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Ae=n;break}Ae=e.return}}function up(t){for(;Ae!==null;){var e=Ae;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{uc(4,e)}catch(c){Ct(e,n,c)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(c){Ct(e,r,c)}}var s=e.return;try{bd(e)}catch(c){Ct(e,s,c)}break;case 5:var a=e.return;try{bd(e)}catch(c){Ct(e,a,c)}}}catch(c){Ct(e,e.return,c)}if(e===t){Ae=null;break}var o=e.sibling;if(o!==null){o.return=e.return,Ae=o;break}Ae=e.return}}var Wy=Math.ceil,Ol=Ci.ReactCurrentDispatcher,Lf=Ci.ReactCurrentOwner,Nn=Ci.ReactCurrentBatchConfig,st=0,Ht=null,Pt=null,Wt=0,vn=0,Es=fr(0),Ut=0,Ya=null,Hr=0,dc=0,Df=0,Na=null,an=null,If=0,zs=1/0,fi=null,Bl=!1,Pd=null,Ji=null,Ro=!1,Wi=null,zl=0,Pa=0,Ld=null,hl=-1,pl=0;function tn(){return st&6?bt():hl!==-1?hl:hl=bt()}function er(t){return t.mode&1?st&2&&Wt!==0?Wt&-Wt:by.transition!==null?(pl===0&&(pl=Gg()),pl):(t=dt,t!==0||(t=window.event,t=t===void 0?16:Zg(t.type)),t):1}function Wn(t,e,n,i){if(50<Pa)throw Pa=0,Ld=null,Error(ce(185));Ja(t,n,i),(!(st&2)||t!==Ht)&&(t===Ht&&(!(st&2)&&(dc|=n),Ut===4&&Hi(t,Wt)),dn(t,i),n===1&&st===0&&!(e.mode&1)&&(zs=bt()+500,oc&&hr()))}function dn(t,e){var n=t.callbackNode;b_(t,e);var i=El(t,t===Ht?Wt:0);if(i===0)n!==null&&_h(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&_h(n),e===1)t.tag===0?Cy(dp.bind(null,t)):gv(dp.bind(null,t)),Ey(function(){!(st&6)&&hr()}),n=null;else{switch(Wg(i)){case 1:n=af;break;case 4:n=Hg;break;case 16:n=Ml;break;case 536870912:n=Vg;break;default:n=Ml}n=p0(n,o0.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function o0(t,e){if(hl=-1,pl=0,st&6)throw Error(ce(327));var n=t.callbackNode;if(Ns()&&t.callbackNode!==n)return null;var i=El(t,t===Ht?Wt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=jl(t,i);else{e=i;var r=st;st|=2;var s=c0();(Ht!==t||Wt!==e)&&(fi=null,zs=bt()+500,kr(t,e));do try{qy();break}catch(o){l0(t,o)}while(!0);_f(),Ol.current=s,st=r,Pt!==null?e=0:(Ht=null,Wt=0,e=Ut)}if(e!==0){if(e===2&&(r=sd(t),r!==0&&(i=r,e=Dd(t,r))),e===1)throw n=Ya,kr(t,0),Hi(t,i),dn(t,bt()),n;if(e===6)Hi(t,i);else{if(r=t.current.alternate,!(i&30)&&!Xy(r)&&(e=jl(t,i),e===2&&(s=sd(t),s!==0&&(i=s,e=Dd(t,s))),e===1))throw n=Ya,kr(t,0),Hi(t,i),dn(t,bt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(ce(345));case 2:Ar(t,an,fi);break;case 3:if(Hi(t,i),(i&130023424)===i&&(e=If+500-bt(),10<e)){if(El(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){tn(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=hd(Ar.bind(null,t,an,fi),e);break}Ar(t,an,fi);break;case 4:if(Hi(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var a=31-Gn(i);s=1<<a,a=e[a],a>r&&(r=a),i&=~s}if(i=r,i=bt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*Wy(i/1960))-i,10<i){t.timeoutHandle=hd(Ar.bind(null,t,an,fi),i);break}Ar(t,an,fi);break;case 5:Ar(t,an,fi);break;default:throw Error(ce(329))}}}return dn(t,bt()),t.callbackNode===n?o0.bind(null,t):null}function Dd(t,e){var n=Na;return t.current.memoizedState.isDehydrated&&(kr(t,e).flags|=256),t=jl(t,e),t!==2&&(e=an,an=n,e!==null&&Id(e)),t}function Id(t){an===null?an=t:an.push.apply(an,t)}function Xy(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!$n(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Hi(t,e){for(e&=~Df,e&=~dc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Gn(e),i=1<<n;t[n]=-1,e&=~i}}function dp(t){if(st&6)throw Error(ce(327));Ns();var e=El(t,0);if(!(e&1))return dn(t,bt()),null;var n=jl(t,e);if(t.tag!==0&&n===2){var i=sd(t);i!==0&&(e=i,n=Dd(t,i))}if(n===1)throw n=Ya,kr(t,0),Hi(t,e),dn(t,bt()),n;if(n===6)throw Error(ce(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Ar(t,an,fi),dn(t,bt()),null}function Uf(t,e){var n=st;st|=1;try{return t(e)}finally{st=n,st===0&&(zs=bt()+500,oc&&hr())}}function Vr(t){Wi!==null&&Wi.tag===0&&!(st&6)&&Ns();var e=st;st|=1;var n=Nn.transition,i=dt;try{if(Nn.transition=null,dt=1,t)return t()}finally{dt=i,Nn.transition=n,st=e,!(st&6)&&hr()}}function Ff(){vn=Es.current,St(Es)}function kr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,My(n)),Pt!==null)for(n=Pt.return;n!==null;){var i=n;switch(gf(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&bl();break;case 3:Os(),St(cn),St(Qt),Tf();break;case 5:wf(i);break;case 4:Os();break;case 13:St(Et);break;case 19:St(Et);break;case 10:yf(i.type._context);break;case 22:case 23:Ff()}n=n.return}if(Ht=t,Pt=t=tr(t.current,null),Wt=vn=e,Ut=0,Ya=null,Df=dc=Hr=0,an=Na=null,Dr!==null){for(e=0;e<Dr.length;e++)if(n=Dr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var a=s.next;s.next=r,i.next=a}n.pending=i}Dr=null}return t}function l0(t,e){do{var n=Pt;try{if(_f(),ul.current=kl,Fl){for(var i=wt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Fl=!1}if(jr=0,jt=It=wt=null,ba=!1,Xa=0,Lf.current=null,n===null||n.return===null){Ut=1,Ya=e,Pt=null;break}e:{var s=t,a=n.return,o=n,c=e;if(e=Wt,o.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var u=c,f=o,p=f.tag;if(!(f.mode&1)&&(p===0||p===11||p===15)){var h=f.alternate;h?(f.updateQueue=h.updateQueue,f.memoizedState=h.memoizedState,f.lanes=h.lanes):(f.updateQueue=null,f.memoizedState=null)}var m=Qh(a);if(m!==null){m.flags&=-257,Jh(m,a,o,s,e),m.mode&1&&Zh(s,u,e),e=m,c=u;var y=e.updateQueue;if(y===null){var v=new Set;v.add(c),e.updateQueue=v}else y.add(c);break e}else{if(!(e&1)){Zh(s,u,e),kf();break e}c=Error(ce(426))}}else if(Mt&&o.mode&1){var g=Qh(a);if(g!==null){!(g.flags&65536)&&(g.flags|=256),Jh(g,a,o,s,e),vf(Bs(c,o));break e}}s=c=Bs(c,o),Ut!==4&&(Ut=2),Na===null?Na=[s]:Na.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var d=Wv(s,c,e);Wh(s,d);break e;case 1:o=c;var x=s.type,_=s.stateNode;if(!(s.flags&128)&&(typeof x.getDerivedStateFromError=="function"||_!==null&&typeof _.componentDidCatch=="function"&&(Ji===null||!Ji.has(_)))){s.flags|=65536,e&=-e,s.lanes|=e;var E=Xv(s,o,e);Wh(s,E);break e}}s=s.return}while(s!==null)}d0(n)}catch(P){e=P,Pt===n&&n!==null&&(Pt=n=n.return);continue}break}while(!0)}function c0(){var t=Ol.current;return Ol.current=kl,t===null?kl:t}function kf(){(Ut===0||Ut===3||Ut===2)&&(Ut=4),Ht===null||!(Hr&268435455)&&!(dc&268435455)||Hi(Ht,Wt)}function jl(t,e){var n=st;st|=2;var i=c0();(Ht!==t||Wt!==e)&&(fi=null,kr(t,e));do try{$y();break}catch(r){l0(t,r)}while(!0);if(_f(),st=n,Ol.current=i,Pt!==null)throw Error(ce(261));return Ht=null,Wt=0,Ut}function $y(){for(;Pt!==null;)u0(Pt)}function qy(){for(;Pt!==null&&!__();)u0(Pt)}function u0(t){var e=h0(t.alternate,t,vn);t.memoizedProps=t.pendingProps,e===null?d0(t):Pt=e,Lf.current=null}function d0(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=jy(n,e),n!==null){n.flags&=32767,Pt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ut=6,Pt=null;return}}else if(n=zy(n,e,vn),n!==null){Pt=n;return}if(e=e.sibling,e!==null){Pt=e;return}Pt=e=t}while(e!==null);Ut===0&&(Ut=5)}function Ar(t,e,n){var i=dt,r=Nn.transition;try{Nn.transition=null,dt=1,Yy(t,e,n,i)}finally{Nn.transition=r,dt=i}return null}function Yy(t,e,n,i){do Ns();while(Wi!==null);if(st&6)throw Error(ce(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(ce(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(R_(t,s),t===Ht&&(Pt=Ht=null,Wt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ro||(Ro=!0,p0(Ml,function(){return Ns(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Nn.transition,Nn.transition=null;var a=dt;dt=1;var o=st;st|=4,Lf.current=null,Vy(t,n),s0(n,t),my(dd),wl=!!ud,dd=ud=null,t.current=n,Gy(n),y_(),st=o,dt=a,Nn.transition=s}else t.current=n;if(Ro&&(Ro=!1,Wi=t,zl=r),s=t.pendingLanes,s===0&&(Ji=null),E_(n.stateNode),dn(t,bt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Bl)throw Bl=!1,t=Pd,Pd=null,t;return zl&1&&t.tag!==0&&Ns(),s=t.pendingLanes,s&1?t===Ld?Pa++:(Pa=0,Ld=t):Pa=0,hr(),null}function Ns(){if(Wi!==null){var t=Wg(zl),e=Nn.transition,n=dt;try{if(Nn.transition=null,dt=16>t?16:t,Wi===null)var i=!1;else{if(t=Wi,Wi=null,zl=0,st&6)throw Error(ce(331));var r=st;for(st|=4,Ae=t.current;Ae!==null;){var s=Ae,a=s.child;if(Ae.flags&16){var o=s.deletions;if(o!==null){for(var c=0;c<o.length;c++){var u=o[c];for(Ae=u;Ae!==null;){var f=Ae;switch(f.tag){case 0:case 11:case 15:Ra(8,f,s)}var p=f.child;if(p!==null)p.return=f,Ae=p;else for(;Ae!==null;){f=Ae;var h=f.sibling,m=f.return;if(n0(f),f===u){Ae=null;break}if(h!==null){h.return=m,Ae=h;break}Ae=m}}}var y=s.alternate;if(y!==null){var v=y.child;if(v!==null){y.child=null;do{var g=v.sibling;v.sibling=null,v=g}while(v!==null)}}Ae=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,Ae=a;else e:for(;Ae!==null;){if(s=Ae,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Ra(9,s,s.return)}var d=s.sibling;if(d!==null){d.return=s.return,Ae=d;break e}Ae=s.return}}var x=t.current;for(Ae=x;Ae!==null;){a=Ae;var _=a.child;if(a.subtreeFlags&2064&&_!==null)_.return=a,Ae=_;else e:for(a=x;Ae!==null;){if(o=Ae,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:uc(9,o)}}catch(P){Ct(o,o.return,P)}if(o===a){Ae=null;break e}var E=o.sibling;if(E!==null){E.return=o.return,Ae=E;break e}Ae=o.return}}if(st=r,hr(),ni&&typeof ni.onPostCommitFiberRoot=="function")try{ni.onPostCommitFiberRoot(nc,t)}catch{}i=!0}return i}finally{dt=n,Nn.transition=e}}return!1}function fp(t,e,n){e=Bs(n,e),e=Wv(t,e,1),t=Qi(t,e,1),e=tn(),t!==null&&(Ja(t,1,e),dn(t,e))}function Ct(t,e,n){if(t.tag===3)fp(t,t,n);else for(;e!==null;){if(e.tag===3){fp(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Ji===null||!Ji.has(i))){t=Bs(n,t),t=Xv(e,t,1),e=Qi(e,t,1),t=tn(),e!==null&&(Ja(e,1,t),dn(e,t));break}}e=e.return}}function Ky(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=tn(),t.pingedLanes|=t.suspendedLanes&n,Ht===t&&(Wt&n)===n&&(Ut===4||Ut===3&&(Wt&130023424)===Wt&&500>bt()-If?kr(t,0):Df|=n),dn(t,e)}function f0(t,e){e===0&&(t.mode&1?(e=_o,_o<<=1,!(_o&130023424)&&(_o=4194304)):e=1);var n=tn();t=Ei(t,e),t!==null&&(Ja(t,e,n),dn(t,n))}function Zy(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),f0(t,n)}function Qy(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(ce(314))}i!==null&&i.delete(e),f0(t,n)}var h0;h0=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||cn.current)ln=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return ln=!1,By(t,e,n);ln=!!(t.flags&131072)}else ln=!1,Mt&&e.flags&1048576&&vv(e,Pl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;fl(t,e),t=e.pendingProps;var r=Us(e,Qt.current);Rs(e,n),r=Cf(null,e,i,t,r,n);var s=bf();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,un(i)?(s=!0,Rl(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Mf(e),r.updater=cc,e.stateNode=r,r._reactInternals=e,yd(e,i,t,n),e=Ed(null,e,i,!0,s,n)):(e.tag=0,Mt&&s&&mf(e),en(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(fl(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=eS(i),t=zn(i,t),r){case 0:e=Md(null,e,i,t,n);break e;case 1:e=np(null,e,i,t,n);break e;case 11:e=ep(null,e,i,t,n);break e;case 14:e=tp(null,e,i,zn(i.type,t),n);break e}throw Error(ce(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:zn(i,r),Md(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:zn(i,r),np(t,e,i,r,n);case 3:e:{if(Kv(e),t===null)throw Error(ce(387));i=e.pendingProps,s=e.memoizedState,r=s.element,Ev(t,e),Il(e,i,null,n);var a=e.memoizedState;if(i=a.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Bs(Error(ce(423)),e),e=ip(t,e,i,n,r);break e}else if(i!==r){r=Bs(Error(ce(424)),e),e=ip(t,e,i,n,r);break e}else for(xn=Zi(e.stateNode.containerInfo.firstChild),_n=e,Mt=!0,Hn=null,n=Sv(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Fs(),i===r){e=wi(t,e,n);break e}en(t,e,i,n)}e=e.child}return e;case 5:return wv(e),t===null&&vd(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,a=r.children,fd(i,r)?a=null:s!==null&&fd(i,s)&&(e.flags|=32),Yv(t,e),en(t,e,a,n),e.child;case 6:return t===null&&vd(e),null;case 13:return Zv(t,e,n);case 4:return Ef(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=ks(e,null,i,n):en(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:zn(i,r),ep(t,e,i,r,n);case 7:return en(t,e,e.pendingProps,n),e.child;case 8:return en(t,e,e.pendingProps.children,n),e.child;case 12:return en(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,a=r.value,gt(Ll,i._currentValue),i._currentValue=a,s!==null)if($n(s.value,a)){if(s.children===r.children&&!cn.current){e=wi(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var o=s.dependencies;if(o!==null){a=s.child;for(var c=o.firstContext;c!==null;){if(c.context===i){if(s.tag===1){c=yi(-1,n&-n),c.tag=2;var u=s.updateQueue;if(u!==null){u=u.shared;var f=u.pending;f===null?c.next=c:(c.next=f.next,f.next=c),u.pending=c}}s.lanes|=n,c=s.alternate,c!==null&&(c.lanes|=n),xd(s.return,n,e),o.lanes|=n;break}c=c.next}}else if(s.tag===10)a=s.type===e.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(ce(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),xd(a,n,e),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===e){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}en(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Rs(e,n),r=Ln(r),i=i(r),e.flags|=1,en(t,e,i,n),e.child;case 14:return i=e.type,r=zn(i,e.pendingProps),r=zn(i.type,r),tp(t,e,i,r,n);case 15:return $v(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:zn(i,r),fl(t,e),e.tag=1,un(i)?(t=!0,Rl(e)):t=!1,Rs(e,n),Gv(e,i,r),yd(e,i,r,n),Ed(null,e,i,!0,t,n);case 19:return Qv(t,e,n);case 22:return qv(t,e,n)}throw Error(ce(156,e.tag))};function p0(t,e){return jg(t,e)}function Jy(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function bn(t,e,n,i){return new Jy(t,e,n,i)}function Of(t){return t=t.prototype,!(!t||!t.isReactComponent)}function eS(t){if(typeof t=="function")return Of(t)?1:0;if(t!=null){if(t=t.$$typeof,t===nf)return 11;if(t===rf)return 14}return 2}function tr(t,e){var n=t.alternate;return n===null?(n=bn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function ml(t,e,n,i,r,s){var a=2;if(i=t,typeof t=="function")Of(t)&&(a=1);else if(typeof t=="string")a=5;else e:switch(t){case hs:return Or(n.children,r,s,e);case tf:a=8,r|=8;break;case Gu:return t=bn(12,n,e,r|2),t.elementType=Gu,t.lanes=s,t;case Wu:return t=bn(13,n,e,r),t.elementType=Wu,t.lanes=s,t;case Xu:return t=bn(19,n,e,r),t.elementType=Xu,t.lanes=s,t;case wg:return fc(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Mg:a=10;break e;case Eg:a=9;break e;case nf:a=11;break e;case rf:a=14;break e;case Bi:a=16,i=null;break e}throw Error(ce(130,t==null?t:typeof t,""))}return e=bn(a,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Or(t,e,n,i){return t=bn(7,t,i,e),t.lanes=n,t}function fc(t,e,n,i){return t=bn(22,t,i,e),t.elementType=wg,t.lanes=n,t.stateNode={isHidden:!1},t}function eu(t,e,n){return t=bn(6,t,null,e),t.lanes=n,t}function tu(t,e,n){return e=bn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function tS(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Uc(0),this.expirationTimes=Uc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Uc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Bf(t,e,n,i,r,s,a,o,c){return t=new tS(t,e,n,o,c),e===1?(e=1,s===!0&&(e|=8)):e=0,s=bn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Mf(s),t}function nS(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:fs,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function m0(t){if(!t)return ar;t=t._reactInternals;e:{if($r(t)!==t||t.tag!==1)throw Error(ce(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(un(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ce(171))}if(t.tag===1){var n=t.type;if(un(n))return mv(t,n,e)}return e}function g0(t,e,n,i,r,s,a,o,c){return t=Bf(n,i,!0,t,r,s,a,o,c),t.context=m0(null),n=t.current,i=tn(),r=er(n),s=yi(i,r),s.callback=e??null,Qi(n,s,r),t.current.lanes=r,Ja(t,r,i),dn(t,i),t}function hc(t,e,n,i){var r=e.current,s=tn(),a=er(r);return n=m0(n),e.context===null?e.context=n:e.pendingContext=n,e=yi(s,a),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=Qi(r,e,a),t!==null&&(Wn(t,r,a,s),cl(t,r,a)),a}function Hl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function hp(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function zf(t,e){hp(t,e),(t=t.alternate)&&hp(t,e)}function iS(){return null}var v0=typeof reportError=="function"?reportError:function(t){console.error(t)};function jf(t){this._internalRoot=t}pc.prototype.render=jf.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(ce(409));hc(t,e,null,null)};pc.prototype.unmount=jf.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Vr(function(){hc(null,t,null,null)}),e[Mi]=null}};function pc(t){this._internalRoot=t}pc.prototype.unstable_scheduleHydration=function(t){if(t){var e=qg();t={blockedOn:null,target:t,priority:e};for(var n=0;n<ji.length&&e!==0&&e<ji[n].priority;n++);ji.splice(n,0,t),n===0&&Kg(t)}};function Hf(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function mc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function pp(){}function rS(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var u=Hl(a);s.call(u)}}var a=g0(e,i,t,0,null,!1,!1,"",pp);return t._reactRootContainer=a,t[Mi]=a.current,ja(t.nodeType===8?t.parentNode:t),Vr(),a}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var o=i;i=function(){var u=Hl(c);o.call(u)}}var c=Bf(t,0,!1,null,null,!1,!1,"",pp);return t._reactRootContainer=c,t[Mi]=c.current,ja(t.nodeType===8?t.parentNode:t),Vr(function(){hc(e,c,n,i)}),c}function gc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var a=s;if(typeof r=="function"){var o=r;r=function(){var c=Hl(a);o.call(c)}}hc(e,a,t,r)}else a=rS(n,e,t,r,i);return Hl(a)}Xg=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=ya(e.pendingLanes);n!==0&&(of(e,n|1),dn(e,bt()),!(st&6)&&(zs=bt()+500,hr()))}break;case 13:Vr(function(){var i=Ei(t,1);if(i!==null){var r=tn();Wn(i,t,1,r)}}),zf(t,1)}};lf=function(t){if(t.tag===13){var e=Ei(t,134217728);if(e!==null){var n=tn();Wn(e,t,134217728,n)}zf(t,134217728)}};$g=function(t){if(t.tag===13){var e=er(t),n=Ei(t,e);if(n!==null){var i=tn();Wn(n,t,e,i)}zf(t,e)}};qg=function(){return dt};Yg=function(t,e){var n=dt;try{return dt=t,e()}finally{dt=n}};nd=function(t,e,n){switch(e){case"input":if(Yu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=ac(i);if(!r)throw Error(ce(90));Ag(i),Yu(i,r)}}}break;case"textarea":bg(t,n);break;case"select":e=n.value,e!=null&&Ts(t,!!n.multiple,e,!1)}};Ug=Uf;Fg=Vr;var sS={usingClientEntryPoint:!1,Events:[to,vs,ac,Dg,Ig,Uf]},la={findFiberByHostInstance:Lr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},aS={bundleType:la.bundleType,version:la.version,rendererPackageName:la.rendererPackageName,rendererConfig:la.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ci.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Bg(t),t===null?null:t.stateNode},findFiberByHostInstance:la.findFiberByHostInstance||iS,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var No=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!No.isDisabled&&No.supportsFiber)try{nc=No.inject(aS),ni=No}catch{}}Sn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=sS;Sn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Hf(e))throw Error(ce(200));return nS(t,e,null,n)};Sn.createRoot=function(t,e){if(!Hf(t))throw Error(ce(299));var n=!1,i="",r=v0;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Bf(t,1,!1,null,null,n,!1,i,r),t[Mi]=e.current,ja(t.nodeType===8?t.parentNode:t),new jf(e)};Sn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(ce(188)):(t=Object.keys(t).join(","),Error(ce(268,t)));return t=Bg(e),t=t===null?null:t.stateNode,t};Sn.flushSync=function(t){return Vr(t)};Sn.hydrate=function(t,e,n){if(!mc(e))throw Error(ce(200));return gc(null,t,e,!0,n)};Sn.hydrateRoot=function(t,e,n){if(!Hf(t))throw Error(ce(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",a=v0;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),e=g0(e,null,t,1,n??null,r,!1,s,a),t[Mi]=e.current,ja(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new pc(e)};Sn.render=function(t,e,n){if(!mc(e))throw Error(ce(200));return gc(null,t,e,!1,n)};Sn.unmountComponentAtNode=function(t){if(!mc(t))throw Error(ce(40));return t._reactRootContainer?(Vr(function(){gc(null,null,t,!1,function(){t._reactRootContainer=null,t[Mi]=null})}),!0):!1};Sn.unstable_batchedUpdates=Uf;Sn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!mc(n))throw Error(ce(200));if(t==null||t._reactInternals===void 0)throw Error(ce(38));return gc(t,e,n,!1,i)};Sn.version="18.3.1-next-f1338f8080-20240426";function x0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(x0)}catch(t){console.error(t)}}x0(),xg.exports=Sn;var oS=xg.exports,mp=oS;Hu.createRoot=mp.createRoot,Hu.hydrateRoot=mp.hydrateRoot;/**
 * react-router v7.18.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var Vf=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,_0=/^[\\/]{2}/;function lS(t,e){return e+t.replace(/\\/g,"/")}var gp="popstate";function vp(t){return typeof t=="object"&&t!=null&&"pathname"in t&&"search"in t&&"hash"in t&&"state"in t&&"key"in t}function cS(t={}){function e(i,r){var u;let s=(u=r.state)==null?void 0:u.masked,{pathname:a,search:o,hash:c}=s||i.location;return Ud("",{pathname:a,search:o,hash:c},r.state&&r.state.usr||null,r.state&&r.state.key||"default",s?{pathname:i.location.pathname,search:i.location.search,hash:i.location.hash}:void 0)}function n(i,r){return typeof r=="string"?r:Ka(r)}return dS(e,n,null,t)}function Tt(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function ri(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function uS(){return Math.random().toString(36).substring(2,10)}function xp(t,e){return{usr:t.state,key:t.key,idx:e,masked:t.mask?{pathname:t.pathname,search:t.search,hash:t.hash}:void 0}}function Ud(t,e,n=null,i,r){return{pathname:typeof t=="string"?t:t.pathname,search:"",hash:"",...typeof e=="string"?Ks(e):e,state:n,key:e&&e.key||i||uS(),mask:r}}function Ka({pathname:t="/",search:e="",hash:n=""}){return e&&e!=="?"&&(t+=e.charAt(0)==="?"?e:"?"+e),n&&n!=="#"&&(t+=n.charAt(0)==="#"?n:"#"+n),t}function Ks(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substring(n),t=t.substring(0,n));let i=t.indexOf("?");i>=0&&(e.search=t.substring(i),t=t.substring(0,i)),t&&(e.pathname=t)}return e}function dS(t,e,n,i={}){let{window:r=document.defaultView,v5Compat:s=!1}=i,a=r.history,o="POP",c=null,u=f();u==null&&(u=0,a.replaceState({...a.state,idx:u},""));function f(){return(a.state||{idx:null}).idx}function p(){o="POP";let g=f(),d=g==null?null:g-u;u=g,c&&c({action:o,location:v.location,delta:d})}function h(g,d){o="PUSH";let x=vp(g)?g:Ud(v.location,g,d);u=f()+1;let _=xp(x,u),E=v.createHref(x.mask||x);try{a.pushState(_,"",E)}catch(P){if(P instanceof DOMException&&P.name==="DataCloneError")throw P;r.location.assign(E)}s&&c&&c({action:o,location:v.location,delta:1})}function m(g,d){o="REPLACE";let x=vp(g)?g:Ud(v.location,g,d);u=f();let _=xp(x,u),E=v.createHref(x.mask||x);a.replaceState(_,"",E),s&&c&&c({action:o,location:v.location,delta:0})}function y(g){return fS(r,g)}let v={get action(){return o},get location(){return t(r,a)},listen(g){if(c)throw new Error("A history only accepts one active listener");return r.addEventListener(gp,p),c=g,()=>{r.removeEventListener(gp,p),c=null}},createHref(g){return e(r,g)},createURL:y,encodeLocation(g){let d=y(g);return{pathname:d.pathname,search:d.search,hash:d.hash}},push:h,replace:m,go(g){return a.go(g)}};return v}function fS(t,e,n=!1){let i="http://localhost";t&&(i=t.location.origin!=="null"?t.location.origin:t.location.href),Tt(i,"No window.location.(origin|href) available to create URL");let r=typeof e=="string"?e:Ka(e);return r=r.replace(/ $/,"%20"),!n&&_0.test(r)&&(r=i+r),new URL(r,i)}function y0(t,e,n="/"){return hS(t,e,n,!1)}function hS(t,e,n,i,r){let s=typeof e=="string"?Ks(e):e,a=Ti(s.pathname||"/",n);if(a==null)return null;let o=pS(t),c=null,u=TS(a);for(let f=0;c==null&&f<o.length;++f)c=wS(o[f],u,i);return c}function pS(t){let e=S0(t);return mS(e),e}function S0(t,e=[],n=[],i="",r=!1){let s=(a,o,c=r,u)=>{let f={relativePath:u===void 0?a.path||"":u,caseSensitive:a.caseSensitive===!0,childrenIndex:o,route:a};if(f.relativePath.startsWith("/")){if(!f.relativePath.startsWith(i)&&c)return;Tt(f.relativePath.startsWith(i),`Absolute route path "${f.relativePath}" nested under path "${i}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),f.relativePath=f.relativePath.slice(i.length)}let p=Xn([i,f.relativePath]),h=n.concat(f);a.children&&a.children.length>0&&(Tt(a.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${p}".`),S0(a.children,e,h,p,c)),!(a.path==null&&!a.index)&&e.push({path:p,score:MS(p,a.index),routesMeta:h.map((m,y)=>{let[v,g]=w0(m.relativePath,m.caseSensitive,y===h.length-1);return{...m,matcher:v,compiledParams:g}})})};return t.forEach((a,o)=>{var c;if(a.path===""||!((c=a.path)!=null&&c.includes("?")))s(a,o);else for(let u of M0(a.path))s(a,o,!0,u)}),e}function M0(t){let e=t.split("/");if(e.length===0)return[];let[n,...i]=e,r=n.endsWith("?"),s=n.replace(/\?$/,"");if(i.length===0)return r?[s,""]:[s];let a=M0(i.join("/")),o=[];return o.push(...a.map(c=>c===""?s:[s,c].join("/"))),r&&o.push(...a),o.map(c=>t.startsWith("/")&&c===""?"/":c)}function mS(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:ES(e.routesMeta.map(i=>i.childrenIndex),n.routesMeta.map(i=>i.childrenIndex)))}var gS=/^:[\w-]+$/,vS=3,xS=2,_S=1,yS=10,SS=-2,_p=t=>t==="*";function MS(t,e){let n=t.split("/"),i=n.length;return n.some(_p)&&(i+=SS),e&&(i+=xS),n.filter(r=>!_p(r)).reduce((r,s)=>r+(gS.test(s)?vS:s===""?_S:yS),i)}function ES(t,e){return t.length===e.length&&t.slice(0,-1).every((i,r)=>i===e[r])?t[t.length-1]-e[e.length-1]:0}function wS(t,e,n=!1){let{routesMeta:i}=t,r={},s="/",a=[];for(let o=0;o<i.length;++o){let c=i[o],u=o===i.length-1,f=s==="/"?e:e.slice(s.length)||"/",p={path:c.relativePath,caseSensitive:c.caseSensitive,end:u},h=c.matcher&&c.compiledParams?E0(p,f,c.matcher,c.compiledParams):Vl(p,f),m=c.route;if(!h&&u&&n&&!i[i.length-1].route.index&&(h=Vl({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},f)),!h)return null;Object.assign(r,h.params),a.push({params:r,pathname:Xn([s,h.pathname]),pathnameBase:bS(Xn([s,h.pathnameBase])),route:m}),h.pathnameBase!=="/"&&(s=Xn([s,h.pathnameBase]))}return a}function Vl(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,i]=w0(t.path,t.caseSensitive,t.end);return E0(t,e,n,i)}function E0(t,e,n,i){let r=e.match(n);if(!r)return null;let s=r[0],a=s.replace(/(.)\/+$/,"$1"),o=r.slice(1);return{params:i.reduce((u,{paramName:f,isOptional:p},h)=>{if(f==="*"){let y=o[h]||"";a=s.slice(0,s.length-y.length).replace(/(.)\/+$/,"$1")}const m=o[h];return p&&!m?u[f]=void 0:u[f]=(m||"").replace(/%2F/g,"/"),u},{}),pathname:s,pathnameBase:a,pattern:t}}function w0(t,e=!1,n=!0){ri(t==="*"||!t.endsWith("*")||t.endsWith("/*"),`Route path "${t}" will be treated as if it were "${t.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/,"/*")}".`);let i=[],r="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,o,c,u,f)=>{if(i.push({paramName:o,isOptional:c!=null}),c){let p=f.charAt(u+a.length);return p&&p!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return t.endsWith("*")?(i.push({paramName:"*"}),r+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?r+="\\/*$":t!==""&&t!=="/"&&(r+="(?:(?=\\/|$))"),[new RegExp(r,e?void 0:"i"),i]}function TS(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return ri(!1,`The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${e}).`),t}}function Ti(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,i=t.charAt(n);return i&&i!=="/"?null:t.slice(n)||"/"}function AS(t,e="/"){let{pathname:n,search:i="",hash:r=""}=typeof t=="string"?Ks(t):t,s;return n?(n=A0(n),n.startsWith("/")?s=yp(n.substring(1),"/"):s=yp(n,e)):s=e,{pathname:s,search:RS(i),hash:NS(r)}}function yp(t,e){let n=Gl(e).split("/");return t.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function nu(t,e,n,i){return`Cannot include a '${t}' character in a manually specified \`to.${e}\` field [${JSON.stringify(i)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function CS(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function T0(t){let e=CS(t);return e.map((n,i)=>i===e.length-1?n.pathname:n.pathnameBase)}function Gf(t,e,n,i=!1){let r;typeof t=="string"?r=Ks(t):(r={...t},Tt(!r.pathname||!r.pathname.includes("?"),nu("?","pathname","search",r)),Tt(!r.pathname||!r.pathname.includes("#"),nu("#","pathname","hash",r)),Tt(!r.search||!r.search.includes("#"),nu("#","search","hash",r)));let s=t===""||r.pathname==="",a=s?"/":r.pathname,o;if(a==null)o=n;else{let p=e.length-1;if(!i&&a.startsWith("..")){let h=a.split("/");for(;h[0]==="..";)h.shift(),p-=1;r.pathname=h.join("/")}o=p>=0?e[p]:"/"}let c=AS(r,o),u=a&&a!=="/"&&a.endsWith("/"),f=(s||a===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(u||f)&&(c.pathname+="/"),c}var A0=t=>t.replace(/[\\/]{2,}/g,"/"),Xn=t=>A0(t.join("/")),Gl=t=>t.replace(/\/+$/,""),bS=t=>Gl(t).replace(/^\/*/,"/"),RS=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,NS=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t,PS=class{constructor(t,e,n,i=!1){this.status=t,this.statusText=e||"",this.internal=i,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function LS(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}function DS(t){let e=t.map(n=>n.route.path).filter(Boolean);return Xn(e)||"/"}var C0=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function b0(t,e){let n=t;if(typeof n!="string"||!Vf.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let i=n,r=!1;if(C0)try{let s=new URL(window.location.href),a=_0.test(n)?new URL(lS(n,s.protocol)):new URL(n),o=Ti(a.pathname,e);a.origin===s.origin&&o!=null?n=o+a.search+a.hash:r=!0}catch{ri(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:i,isExternal:r,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var R0=["POST","PUT","PATCH","DELETE"];new Set(R0);var IS=["GET",...R0];new Set(IS);var US=["about:","blob:","chrome:","chrome-untrusted:","content:","data:","devtools:","file:","filesystem:","javascript:"];function FS(t){try{return US.includes(new URL(t).protocol)}catch{return!1}}var Zs=U.createContext(null);Zs.displayName="DataRouter";var vc=U.createContext(null);vc.displayName="DataRouterState";var N0=U.createContext(!1);function kS(){return U.useContext(N0)}var P0=U.createContext({isTransitioning:!1});P0.displayName="ViewTransition";var OS=U.createContext(new Map);OS.displayName="Fetchers";var BS=U.createContext(null);BS.displayName="Await";var In=U.createContext(null);In.displayName="Navigation";var io=U.createContext(null);io.displayName="Location";var bi=U.createContext({outlet:null,matches:[],isDataRoute:!1});bi.displayName="Route";var Wf=U.createContext(null);Wf.displayName="RouteError";var L0="REACT_ROUTER_ERROR",zS="REDIRECT",jS="ROUTE_ERROR_RESPONSE";function HS(t){if(t.startsWith(`${L0}:${zS}:{`))try{let e=JSON.parse(t.slice(28));if(typeof e=="object"&&e&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.location=="string"&&typeof e.reloadDocument=="boolean"&&typeof e.replace=="boolean")return e}catch{}}function VS(t){if(t.startsWith(`${L0}:${jS}:{`))try{let e=JSON.parse(t.slice(40));if(typeof e=="object"&&e&&typeof e.status=="number"&&typeof e.statusText=="string")return new PS(e.status,e.statusText,e.data)}catch{}}function GS(t,{relative:e}={}){Tt(ro(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:i}=U.useContext(In),{hash:r,pathname:s,search:a}=so(t,{relative:e}),o=s;return n!=="/"&&(o=s==="/"?n:Xn([n,s])),i.createHref({pathname:o,search:a,hash:r})}function ro(){return U.useContext(io)!=null}function Ri(){return Tt(ro(),"useLocation() may be used only in the context of a <Router> component."),U.useContext(io).location}var D0="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function I0(t){U.useContext(In).static||U.useLayoutEffect(t)}function WS(){let{isDataRoute:t}=U.useContext(bi);return t?rM():XS()}function XS(){Tt(ro(),"useNavigate() may be used only in the context of a <Router> component.");let t=U.useContext(Zs),{basename:e,navigator:n}=U.useContext(In),{matches:i}=U.useContext(bi),{pathname:r}=Ri(),s=JSON.stringify(T0(i)),a=U.useRef(!1);return I0(()=>{a.current=!0}),U.useCallback((c,u={})=>{if(ri(a.current,D0),!a.current)return;if(typeof c=="number"){n.go(c);return}let f=Gf(c,JSON.parse(s),r,u.relative==="path");t==null&&e!=="/"&&(f.pathname=f.pathname==="/"?e:Xn([e,f.pathname])),(u.replace?n.replace:n.push)(f,u.state,u)},[e,n,s,r,t])}U.createContext(null);function so(t,{relative:e}={}){let{matches:n}=U.useContext(bi),{pathname:i}=Ri(),r=JSON.stringify(T0(n));return U.useMemo(()=>Gf(t,JSON.parse(r),i,e==="path"),[t,r,i,e])}function $S(t,e){return U0(t,e)}function U0(t,e,n){var g;Tt(ro(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:i}=U.useContext(In),{matches:r}=U.useContext(bi),s=r[r.length-1],a=s?s.params:{},o=s?s.pathname:"/",c=s?s.pathnameBase:"/",u=s&&s.route;{let d=u&&u.path||"";k0(o,!u||d.endsWith("*")||d.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${o}" (under <Route path="${d}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${d}"> to <Route path="${d==="/"?"*":`${d}/*`}">.`)}let f=Ri(),p;if(e){let d=typeof e=="string"?Ks(e):e;Tt(c==="/"||((g=d.pathname)==null?void 0:g.startsWith(c)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${d.pathname}" was given in the \`location\` prop.`),p=d}else p=f;let h=p.pathname||"/",m=h;if(c!=="/"){let d=c.replace(/^\//,"").split("/");m="/"+h.replace(/^\//,"").split("/").slice(d.length).join("/")}let y=n&&n.state.matches.length?n.state.matches.map(d=>Object.assign(d,{route:n.manifest[d.route.id]||d.route})):y0(t,{pathname:m});ri(u||y!=null,`No routes matched location "${p.pathname}${p.search}${p.hash}" `),ri(y==null||y[y.length-1].route.element!==void 0||y[y.length-1].route.Component!==void 0||y[y.length-1].route.lazy!==void 0,`Matched leaf route at location "${p.pathname}${p.search}${p.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let v=QS(y&&y.map(d=>Object.assign({},d,{params:Object.assign({},a,d.params),pathname:Xn([c,i.encodeLocation?i.encodeLocation(d.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:d.pathname]),pathnameBase:d.pathnameBase==="/"?c:Xn([c,i.encodeLocation?i.encodeLocation(d.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:d.pathnameBase])})),r,n);return e&&v?U.createElement(io.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",mask:void 0,...p},navigationType:"POP"}},v):v}function qS(){let t=iM(),e=LS(t)?`${t.status} ${t.statusText}`:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,i="rgba(200,200,200, 0.5)",r={padding:"0.5rem",backgroundColor:i},s={padding:"2px 4px",backgroundColor:i},a=null;return console.error("Error handled by React Router default ErrorBoundary:",t),a=U.createElement(U.Fragment,null,U.createElement("p",null,"💿 Hey developer 👋"),U.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",U.createElement("code",{style:s},"ErrorBoundary")," or"," ",U.createElement("code",{style:s},"errorElement")," prop on your route.")),U.createElement(U.Fragment,null,U.createElement("h2",null,"Unexpected Application Error!"),U.createElement("h3",{style:{fontStyle:"italic"}},e),n?U.createElement("pre",{style:r},n):null,a)}var YS=U.createElement(qS,null),F0=class extends U.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,e){return e.location!==t.location||e.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:e.error,location:e.location,revalidation:t.revalidation||e.revalidation}}componentDidCatch(t,e){this.props.onError?this.props.onError(t,e):console.error("React Router caught the following error during render",t)}render(){let t=this.state.error;if(this.context&&typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){const n=VS(t.digest);n&&(t=n)}let e=t!==void 0?U.createElement(bi.Provider,{value:this.props.routeContext},U.createElement(Wf.Provider,{value:t,children:this.props.component})):this.props.children;return this.context?U.createElement(KS,{error:t},e):e}};F0.contextType=N0;var iu=new WeakMap;function KS({children:t,error:e}){let{basename:n}=U.useContext(In);if(typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){let i=HS(e.digest);if(i){let r=iu.get(e);if(r)throw r;let s=b0(i.location,n),a=s.absoluteURL||s.to;if(FS(a))throw new Error("Invalid redirect location");if(C0&&!iu.get(e))if(s.isExternal||i.reloadDocument)window.location.href=a;else{const o=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(s.to,{replace:i.replace}));throw iu.set(e,o),o}return U.createElement("meta",{httpEquiv:"refresh",content:`0;url=${a}`})}}return t}function ZS({routeContext:t,match:e,children:n}){let i=U.useContext(Zs);return i&&i.static&&i.staticContext&&(e.route.errorElement||e.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=e.route.id),U.createElement(bi.Provider,{value:t},n)}function QS(t,e=[],n){let i=n==null?void 0:n.state;if(t==null){if(!i)return null;if(i.errors)t=i.matches;else if(e.length===0&&!i.initialized&&i.matches.length>0)t=i.matches;else return null}let r=t,s=i==null?void 0:i.errors;if(s!=null){let f=r.findIndex(p=>p.route.id&&(s==null?void 0:s[p.route.id])!==void 0);Tt(f>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(s).join(",")}`),r=r.slice(0,Math.min(r.length,f+1))}let a=!1,o=-1;if(n&&i){a=i.renderFallback;for(let f=0;f<r.length;f++){let p=r[f];if((p.route.HydrateFallback||p.route.hydrateFallbackElement)&&(o=f),p.route.id){let{loaderData:h,errors:m}=i,y=p.route.loader&&!h.hasOwnProperty(p.route.id)&&(!m||m[p.route.id]===void 0);if(p.route.lazy||y){n.isStatic&&(a=!0),o>=0?r=r.slice(0,o+1):r=[r[0]];break}}}}let c=n==null?void 0:n.onError,u=i&&c?(f,p)=>{var h,m;c(f,{location:i.location,params:((m=(h=i.matches)==null?void 0:h[0])==null?void 0:m.params)??{},pattern:DS(i.matches),errorInfo:p})}:void 0;return r.reduceRight((f,p,h)=>{let m,y=!1,v=null,g=null;i&&(m=s&&p.route.id?s[p.route.id]:void 0,v=p.route.errorElement||YS,a&&(o<0&&h===0?(k0("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),y=!0,g=null):o===h&&(y=!0,g=p.route.hydrateFallbackElement||null)));let d=e.concat(r.slice(0,h+1)),x=()=>{let _;return m?_=v:y?_=g:p.route.Component?_=U.createElement(p.route.Component,null):p.route.element?_=p.route.element:_=f,U.createElement(ZS,{match:p,routeContext:{outlet:f,matches:d,isDataRoute:i!=null},children:_})};return i&&(p.route.ErrorBoundary||p.route.errorElement||h===0)?U.createElement(F0,{location:i.location,revalidation:i.revalidation,component:v,error:m,children:x(),routeContext:{outlet:null,matches:d,isDataRoute:!0},onError:u}):x()},null)}function Xf(t){return`${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function JS(t){let e=U.useContext(Zs);return Tt(e,Xf(t)),e}function eM(t){let e=U.useContext(vc);return Tt(e,Xf(t)),e}function tM(t){let e=U.useContext(bi);return Tt(e,Xf(t)),e}function $f(t){let e=tM(t),n=e.matches[e.matches.length-1];return Tt(n.route.id,`${t} can only be used on routes that contain a unique "id"`),n.route.id}function nM(){return $f("useRouteId")}function iM(){var i;let t=U.useContext(Wf),e=eM("useRouteError"),n=$f("useRouteError");return t!==void 0?t:(i=e.errors)==null?void 0:i[n]}function rM(){let{router:t}=JS("useNavigate"),e=$f("useNavigate"),n=U.useRef(!1);return I0(()=>{n.current=!0}),U.useCallback(async(r,s={})=>{ri(n.current,D0),n.current&&(typeof r=="number"?await t.navigate(r):await t.navigate(r,{fromRouteId:e,...s}))},[t,e])}var Sp={};function k0(t,e,n){!e&&!Sp[t]&&(Sp[t]=!0,ri(!1,n))}U.memo(sM);function sM({routes:t,manifest:e,future:n,state:i,isStatic:r,onError:s}){return U0(t,void 0,{manifest:e,state:i,isStatic:r,onError:s})}function Fd(t){Tt(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function aM({basename:t="/",children:e=null,location:n,navigationType:i="POP",navigator:r,static:s=!1,useTransitions:a}){Tt(!ro(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let o=t.replace(/^\/*/,"/"),c=U.useMemo(()=>({basename:o,navigator:r,static:s,useTransitions:a,future:{}}),[o,r,s,a]);typeof n=="string"&&(n=Ks(n));let{pathname:u="/",search:f="",hash:p="",state:h=null,key:m="default",mask:y}=n,v=U.useMemo(()=>{let g=Ti(u,o);return g==null?null:{location:{pathname:g,search:f,hash:p,state:h,key:m,mask:y},navigationType:i}},[o,u,f,p,h,m,i,y]);return ri(v!=null,`<Router basename="${o}"> is not able to match the URL "${u}${f}${p}" because it does not start with the basename, so the <Router> won't render anything.`),v==null?null:U.createElement(In.Provider,{value:c},U.createElement(io.Provider,{children:e,value:v}))}function oM({children:t,location:e}){return $S(kd(t),e)}function kd(t,e=[]){let n=[];return U.Children.forEach(t,(i,r)=>{if(!U.isValidElement(i))return;let s=[...e,r];if(i.type===U.Fragment){n.push.apply(n,kd(i.props.children,s));return}Tt(i.type===Fd,`[${typeof i.type=="string"?i.type:i.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),Tt(!i.props.index||!i.props.children,"An index route cannot have child routes.");let a={id:i.props.id||s.join("-"),caseSensitive:i.props.caseSensitive,element:i.props.element,Component:i.props.Component,index:i.props.index,path:i.props.path,middleware:i.props.middleware,loader:i.props.loader,action:i.props.action,hydrateFallbackElement:i.props.hydrateFallbackElement,HydrateFallback:i.props.HydrateFallback,errorElement:i.props.errorElement,ErrorBoundary:i.props.ErrorBoundary,hasErrorBoundary:i.props.hasErrorBoundary===!0||i.props.ErrorBoundary!=null||i.props.errorElement!=null,shouldRevalidate:i.props.shouldRevalidate,handle:i.props.handle,lazy:i.props.lazy};i.props.children&&(a.children=kd(i.props.children,s)),n.push(a)}),n}var gl="get",vl="application/x-www-form-urlencoded";function xc(t){return typeof HTMLElement<"u"&&t instanceof HTMLElement}function lM(t){return xc(t)&&t.tagName.toLowerCase()==="button"}function cM(t){return xc(t)&&t.tagName.toLowerCase()==="form"}function uM(t){return xc(t)&&t.tagName.toLowerCase()==="input"}function dM(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function fM(t,e){return t.button===0&&(!e||e==="_self")&&!dM(t)}var Po=null;function hM(){if(Po===null)try{new FormData(document.createElement("form"),0),Po=!1}catch{Po=!0}return Po}var pM=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function ru(t){return t!=null&&!pM.has(t)?(ri(!1,`"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${vl}"`),null):t}function mM(t,e){let n,i,r,s,a;if(cM(t)){let o=t.getAttribute("action");i=o?Ti(o,e):null,n=t.getAttribute("method")||gl,r=ru(t.getAttribute("enctype"))||vl,s=new FormData(t)}else if(lM(t)||uM(t)&&(t.type==="submit"||t.type==="image")){let o=t.form;if(o==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=t.getAttribute("formaction")||o.getAttribute("action");if(i=c?Ti(c,e):null,n=t.getAttribute("formmethod")||o.getAttribute("method")||gl,r=ru(t.getAttribute("formenctype"))||ru(o.getAttribute("enctype"))||vl,s=new FormData(o,t),!hM()){let{name:u,type:f,value:p}=t;if(f==="image"){let h=u?`${u}.`:"";s.append(`${h}x`,"0"),s.append(`${h}y`,"0")}else u&&s.append(u,p)}}else{if(xc(t))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=gl,i=null,r=vl,a=t}return s&&r==="text/plain"&&(a=s,s=void 0),{action:i,method:n.toLowerCase(),encType:r,formData:s,body:a}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function qf(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function O0(t,e,n,i){let r=typeof t=="string"?new URL(t,typeof window>"u"?"server://singlefetch/":window.location.origin):t;return n?r.pathname.endsWith("/")?r.pathname=`${r.pathname}_.${i}`:r.pathname=`${r.pathname}.${i}`:r.pathname==="/"?r.pathname=`_root.${i}`:e&&Ti(r.pathname,e)==="/"?r.pathname=`${Gl(e)}/_root.${i}`:r.pathname=`${Gl(r.pathname)}.${i}`,r}async function gM(t,e){if(t.id in e)return e[t.id];try{let n=await import(t.module);return e[t.id]=n,n}catch(n){return console.error(`Error loading route module \`${t.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function vM(t){return t==null?!1:t.href==null?t.rel==="preload"&&typeof t.imageSrcSet=="string"&&typeof t.imageSizes=="string":typeof t.rel=="string"&&typeof t.href=="string"}async function xM(t,e,n){let i=await Promise.all(t.map(async r=>{let s=e.routes[r.route.id];if(s){let a=await gM(s,n);return a.links?a.links():[]}return[]}));return MM(i.flat(1).filter(vM).filter(r=>r.rel==="stylesheet"||r.rel==="preload").map(r=>r.rel==="stylesheet"?{...r,rel:"prefetch",as:"style"}:{...r,rel:"prefetch"}))}function Mp(t,e,n,i,r,s){let a=(c,u)=>n[u]?c.route.id!==n[u].route.id:!0,o=(c,u)=>{var f;return n[u].pathname!==c.pathname||((f=n[u].route.path)==null?void 0:f.endsWith("*"))&&n[u].params["*"]!==c.params["*"]};return s==="assets"?e.filter((c,u)=>a(c,u)||o(c,u)):s==="data"?e.filter((c,u)=>{var p;let f=i.routes[c.route.id];if(!f||!f.hasLoader)return!1;if(a(c,u)||o(c,u))return!0;if(c.route.shouldRevalidate){let h=c.route.shouldRevalidate({currentUrl:new URL(r.pathname+r.search+r.hash,window.origin),currentParams:((p=n[0])==null?void 0:p.params)||{},nextUrl:new URL(t,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof h=="boolean")return h}return!0}):[]}function _M(t,e,{includeHydrateFallback:n}={}){return yM(t.map(i=>{let r=e.routes[i.route.id];if(!r)return[];let s=[r.module];return r.clientActionModule&&(s=s.concat(r.clientActionModule)),r.clientLoaderModule&&(s=s.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(s=s.concat(r.hydrateFallbackModule)),r.imports&&(s=s.concat(r.imports)),s}).flat(1))}function yM(t){return[...new Set(t)]}function SM(t){let e={},n=Object.keys(t).sort();for(let i of n)e[i]=t[i];return e}function MM(t,e){let n=new Set;return new Set(e),t.reduce((i,r)=>{let s=JSON.stringify(SM(r));return n.has(s)||(n.add(s),i.push({key:s,link:r})),i},[])}function Yf(){let t=U.useContext(Zs);return qf(t,"You must render this element inside a <DataRouterContext.Provider> element"),t}function EM(){let t=U.useContext(vc);return qf(t,"You must render this element inside a <DataRouterStateContext.Provider> element"),t}var Kf=U.createContext(void 0);Kf.displayName="FrameworkContext";function _c(){let t=U.useContext(Kf);return qf(t,"You must render this element inside a <HydratedRouter> element"),t}function wM(t,e){let n=U.useContext(Kf),[i,r]=U.useState(!1),[s,a]=U.useState(!1),{onFocus:o,onBlur:c,onMouseEnter:u,onMouseLeave:f,onTouchStart:p}=e,h=U.useRef(null);U.useEffect(()=>{if(t==="render"&&a(!0),t==="viewport"){let v=d=>{d.forEach(x=>{a(x.isIntersecting)})},g=new IntersectionObserver(v,{threshold:.5});return h.current&&g.observe(h.current),()=>{g.disconnect()}}},[t]),U.useEffect(()=>{if(i){let v=setTimeout(()=>{a(!0)},100);return()=>{clearTimeout(v)}}},[i]);let m=()=>{r(!0)},y=()=>{r(!1),a(!1)};return n?t!=="intent"?[s,h,{}]:[s,h,{onFocus:ca(o,m),onBlur:ca(c,y),onMouseEnter:ca(u,m),onMouseLeave:ca(f,y),onTouchStart:ca(p,m)}]:[!1,h,{}]}function ca(t,e){return n=>{t&&t(n),n.defaultPrevented||e(n)}}function TM({page:t,...e}){let n=kS(),{nonce:i}=_c(),{router:r}=Yf(),s=U.useMemo(()=>y0(r.routes,t,r.basename),[r.routes,t,r.basename]);return s?(e.nonce==null&&i&&(e={...e,nonce:i}),n?U.createElement(CM,{page:t,matches:s,...e}):U.createElement(bM,{page:t,matches:s,...e})):null}function AM(t){let{manifest:e,routeModules:n}=_c(),[i,r]=U.useState([]);return U.useEffect(()=>{let s=!1;return xM(t,e,n).then(a=>{s||r(a)}),()=>{s=!0}},[t,e,n]),i}function CM({page:t,matches:e,...n}){let i=Ri(),{future:r}=_c(),{basename:s}=Yf(),a=U.useMemo(()=>{if(t===i.pathname+i.search+i.hash)return[];let o=O0(t,s,r.v8_trailingSlashAwareDataRequests,"rsc"),c=!1,u=[];for(let f of e)typeof f.route.shouldRevalidate=="function"?c=!0:u.push(f.route.id);return c&&u.length>0&&o.searchParams.set("_routes",u.join(",")),[o.pathname+o.search]},[s,r.v8_trailingSlashAwareDataRequests,t,i,e]);return U.createElement(U.Fragment,null,a.map(o=>U.createElement("link",{key:o,rel:"prefetch",as:"fetch",href:o,...n})))}function bM({page:t,matches:e,...n}){let i=Ri(),{future:r,manifest:s,routeModules:a}=_c(),{basename:o}=Yf(),{loaderData:c,matches:u}=EM(),f=U.useMemo(()=>Mp(t,e,u,s,i,"data"),[t,e,u,s,i]),p=U.useMemo(()=>Mp(t,e,u,s,i,"assets"),[t,e,u,s,i]),h=U.useMemo(()=>{if(t===i.pathname+i.search+i.hash)return[];let v=new Set,g=!1;if(e.forEach(x=>{var E;let _=s.routes[x.route.id];!_||!_.hasLoader||(!f.some(P=>P.route.id===x.route.id)&&x.route.id in c&&((E=a[x.route.id])!=null&&E.shouldRevalidate)||_.hasClientLoader?g=!0:v.add(x.route.id))}),v.size===0)return[];let d=O0(t,o,r.v8_trailingSlashAwareDataRequests,"data");return g&&v.size>0&&d.searchParams.set("_routes",e.filter(x=>v.has(x.route.id)).map(x=>x.route.id).join(",")),[d.pathname+d.search]},[o,r.v8_trailingSlashAwareDataRequests,c,i,s,f,e,t,a]),m=U.useMemo(()=>_M(p,s),[p,s]),y=AM(p);return U.createElement(U.Fragment,null,h.map(v=>U.createElement("link",{key:v,rel:"prefetch",as:"fetch",href:v,...n})),m.map(v=>U.createElement("link",{key:v,rel:"modulepreload",href:v,...n})),y.map(({key:v,link:g})=>U.createElement("link",{key:v,nonce:n.nonce,...g,crossOrigin:g.crossOrigin??n.crossOrigin})))}function RM(...t){return e=>{t.forEach(n=>{typeof n=="function"?n(e):n!=null&&(n.current=e)})}}var NM=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{NM&&(window.__reactRouterVersion="7.18.1")}catch{}function PM({basename:t,children:e,useTransitions:n,window:i}){let r=U.useRef();r.current==null&&(r.current=cS({window:i,v5Compat:!0}));let s=r.current,[a,o]=U.useState({action:s.action,location:s.location}),c=U.useCallback(u=>{n===!1?o(u):U.startTransition(()=>o(u))},[n]);return U.useLayoutEffect(()=>s.listen(c),[s,c]),U.createElement(aM,{basename:t,children:e,location:a.location,navigationType:a.action,navigator:s,useTransitions:n})}var Zf=U.forwardRef(function({onClick:e,discover:n="render",prefetch:i="none",relative:r,reloadDocument:s,replace:a,mask:o,state:c,target:u,to:f,preventScrollReset:p,viewTransition:h,defaultShouldRevalidate:m,...y},v){let{basename:g,navigator:d,useTransitions:x}=U.useContext(In),_=typeof f=="string"&&Vf.test(f),E=b0(f,g);f=E.to;let P=GS(f,{relative:r}),R=Ri(),A=null;if(o){let X=Gf(o,[],R.mask?R.mask.pathname:"/",!0);g!=="/"&&(X.pathname=X.pathname==="/"?g:Xn([g,X.pathname])),A=d.createHref(X)}let[N,S,M]=wM(i,y),I=UM(f,{replace:a,mask:o,state:c,target:u,preventScrollReset:p,relative:r,viewTransition:h,defaultShouldRevalidate:m,useTransitions:x});function G(X){e&&e(X),X.defaultPrevented||I(X)}let j=!(E.isExternal||s),Q=U.createElement("a",{...y,...M,href:(j?A:void 0)||E.absoluteURL||P,onClick:j?G:e,ref:RM(v,S),target:u,"data-discover":!_&&n==="render"?"true":void 0});return N&&!_?U.createElement(U.Fragment,null,Q,U.createElement(TM,{page:P})):Q});Zf.displayName="Link";var LM=U.forwardRef(function({"aria-current":e="page",caseSensitive:n=!1,className:i="",end:r=!1,style:s,to:a,viewTransition:o,children:c,...u},f){let p=so(a,{relative:u.relative}),h=Ri(),m=U.useContext(vc),{navigator:y,basename:v}=U.useContext(In),g=m!=null&&zM(p)&&o===!0,d=y.encodeLocation?y.encodeLocation(p).pathname:p.pathname,x=h.pathname,_=m&&m.navigation&&m.navigation.location?m.navigation.location.pathname:null;n||(x=x.toLowerCase(),_=_?_.toLowerCase():null,d=d.toLowerCase()),_&&v&&(_=Ti(_,v)||_);const E=d!=="/"&&d.endsWith("/")?d.length-1:d.length;let P=x===d||!r&&x.startsWith(d)&&x.charAt(E)==="/",R=_!=null&&(_===d||!r&&_.startsWith(d)&&_.charAt(d.length)==="/"),A={isActive:P,isPending:R,isTransitioning:g},N=P?e:void 0,S;typeof i=="function"?S=i(A):S=[i,P?"active":null,R?"pending":null,g?"transitioning":null].filter(Boolean).join(" ");let M=typeof s=="function"?s(A):s;return U.createElement(Zf,{...u,"aria-current":N,className:S,ref:f,style:M,to:a,viewTransition:o},typeof c=="function"?c(A):c)});LM.displayName="NavLink";var DM=U.forwardRef(({discover:t="render",fetcherKey:e,navigate:n,reloadDocument:i,replace:r,state:s,method:a=gl,action:o,onSubmit:c,relative:u,preventScrollReset:f,viewTransition:p,defaultShouldRevalidate:h,...m},y)=>{let{useTransitions:v}=U.useContext(In),g=OM(),d=BM(o,{relative:u}),x=a.toLowerCase()==="get"?"get":"post",_=typeof o=="string"&&Vf.test(o),E=P=>{if(c&&c(P),P.defaultPrevented)return;P.preventDefault();let R=P.nativeEvent.submitter,A=(R==null?void 0:R.getAttribute("formmethod"))||a,N=()=>g(R||P.currentTarget,{fetcherKey:e,method:A,navigate:n,replace:r,state:s,relative:u,preventScrollReset:f,viewTransition:p,defaultShouldRevalidate:h});v&&n!==!1?U.startTransition(()=>N()):N()};return U.createElement("form",{ref:y,method:x,action:d,onSubmit:i?c:E,...m,"data-discover":!_&&t==="render"?"true":void 0})});DM.displayName="Form";function IM(t){return`${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function B0(t){let e=U.useContext(Zs);return Tt(e,IM(t)),e}function UM(t,{target:e,replace:n,mask:i,state:r,preventScrollReset:s,relative:a,viewTransition:o,defaultShouldRevalidate:c,useTransitions:u}={}){let f=WS(),p=Ri(),h=so(t,{relative:a});return U.useCallback(m=>{if(fM(m,e)){m.preventDefault();let y=n!==void 0?n:Ka(p)===Ka(h),v=()=>f(t,{replace:y,mask:i,state:r,preventScrollReset:s,relative:a,viewTransition:o,defaultShouldRevalidate:c});u?U.startTransition(()=>v()):v()}},[p,f,h,n,i,r,e,t,s,a,o,c,u])}var FM=0,kM=()=>`__${String(++FM)}__`;function OM(){let{router:t}=B0("useSubmit"),{basename:e}=U.useContext(In),n=nM(),i=t.fetch,r=t.navigate;return U.useCallback(async(s,a={})=>{let{action:o,method:c,encType:u,formData:f,body:p}=mM(s,e);if(a.navigate===!1){let h=a.fetcherKey||kM();await i(h,n,a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:f,body:p,formMethod:a.method||c,formEncType:a.encType||u,flushSync:a.flushSync})}else await r(a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:f,body:p,formMethod:a.method||c,formEncType:a.encType||u,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[i,r,e,n])}function BM(t,{relative:e}={}){let{basename:n}=U.useContext(In),i=U.useContext(bi);Tt(i,"useFormAction must be used inside a RouteContext");let[r]=i.matches.slice(-1),s={...so(t||".",{relative:e})},a=Ri();if(t==null){s.search=a.search;let o=new URLSearchParams(s.search),c=o.getAll("index");if(c.some(f=>f==="")){o.delete("index"),c.filter(p=>p).forEach(p=>o.append("index",p));let f=o.toString();s.search=f?`?${f}`:""}}return(!t||t===".")&&r.route.index&&(s.search=s.search?s.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(s.pathname=s.pathname==="/"?n:Xn([n,s.pathname])),Ka(s)}function zM(t,{relative:e}={}){let n=U.useContext(P0);Tt(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:i}=B0("useViewTransitionState"),r=so(t,{relative:e});if(!n.isTransitioning)return!1;let s=Ti(n.currentLocation.pathname,i)||n.currentLocation.pathname,a=Ti(n.nextLocation.pathname,i)||n.nextLocation.pathname;return Vl(r.pathname,a)!=null||Vl(r.pathname,s)!=null}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Qf="165",jM=0,Ep=1,HM=2,z0=1,VM=2,di=3,or=0,fn=1,pi=2,nr=0,Ps=1,Od=2,wp=3,Tp=4,GM=5,Rr=100,WM=101,XM=102,$M=103,qM=104,YM=200,KM=201,ZM=202,QM=203,Bd=204,zd=205,JM=206,eE=207,tE=208,nE=209,iE=210,rE=211,sE=212,aE=213,oE=214,lE=0,cE=1,uE=2,Wl=3,dE=4,fE=5,hE=6,pE=7,j0=0,mE=1,gE=2,ir=0,vE=1,xE=2,_E=3,yE=4,SE=5,ME=6,EE=7,H0=300,js=301,Hs=302,jd=303,Hd=304,yc=306,Vd=1e3,Ur=1001,Gd=1002,Rn=1003,wE=1004,Lo=1005,Vn=1006,su=1007,Fr=1008,lr=1009,TE=1010,AE=1011,Xl=1012,V0=1013,Vs=1014,Xi=1015,Sc=1016,G0=1017,W0=1018,Gs=1020,CE=35902,bE=1021,RE=1022,ti=1023,NE=1024,PE=1025,Ls=1026,Ws=1027,LE=1028,X0=1029,DE=1030,$0=1031,q0=1033,au=33776,ou=33777,lu=33778,cu=33779,Ap=35840,Cp=35841,bp=35842,Rp=35843,Np=36196,Pp=37492,Lp=37496,Dp=37808,Ip=37809,Up=37810,Fp=37811,kp=37812,Op=37813,Bp=37814,zp=37815,jp=37816,Hp=37817,Vp=37818,Gp=37819,Wp=37820,Xp=37821,uu=36492,$p=36494,qp=36495,IE=36283,Yp=36284,Kp=36285,Zp=36286,UE=3200,FE=3201,kE=0,OE=1,Vi="",Zn="srgb",pr="srgb-linear",Jf="display-p3",Mc="display-p3-linear",$l="linear",yt="srgb",ql="rec709",Yl="p3",Yr=7680,Qp=519,BE=512,zE=513,jE=514,Y0=515,HE=516,VE=517,GE=518,WE=519,Jp=35044,em="300 es",xi=2e3,Kl=2001;class Qs{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Yt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],du=Math.PI/180,Wd=180/Math.PI;function ao(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Yt[t&255]+Yt[t>>8&255]+Yt[t>>16&255]+Yt[t>>24&255]+"-"+Yt[e&255]+Yt[e>>8&255]+"-"+Yt[e>>16&15|64]+Yt[e>>24&255]+"-"+Yt[n&63|128]+Yt[n>>8&255]+"-"+Yt[n>>16&255]+Yt[n>>24&255]+Yt[i&255]+Yt[i>>8&255]+Yt[i>>16&255]+Yt[i>>24&255]).toLowerCase()}function on(t,e,n){return Math.max(e,Math.min(n,t))}function XE(t,e){return(t%e+e)%e}function fu(t,e,n){return(1-n)*t+n*e}function ua(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function sn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}class lt{constructor(e=0,n=0){lt.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(on(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qe{constructor(e,n,i,r,s,a,o,c,u){Qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,c,u)}set(e,n,i,r,s,a,o,c,u){const f=this.elements;return f[0]=e,f[1]=r,f[2]=o,f[3]=n,f[4]=s,f[5]=c,f[6]=i,f[7]=a,f[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],c=i[6],u=i[1],f=i[4],p=i[7],h=i[2],m=i[5],y=i[8],v=r[0],g=r[3],d=r[6],x=r[1],_=r[4],E=r[7],P=r[2],R=r[5],A=r[8];return s[0]=a*v+o*x+c*P,s[3]=a*g+o*_+c*R,s[6]=a*d+o*E+c*A,s[1]=u*v+f*x+p*P,s[4]=u*g+f*_+p*R,s[7]=u*d+f*E+p*A,s[2]=h*v+m*x+y*P,s[5]=h*g+m*_+y*R,s[8]=h*d+m*E+y*A,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],u=e[7],f=e[8];return n*a*f-n*o*u-i*s*f+i*o*c+r*s*u-r*a*c}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],u=e[7],f=e[8],p=f*a-o*u,h=o*c-f*s,m=u*s-a*c,y=n*p+i*h+r*m;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/y;return e[0]=p*v,e[1]=(r*u-f*i)*v,e[2]=(o*i-r*a)*v,e[3]=h*v,e[4]=(f*n-r*c)*v,e[5]=(r*s-o*n)*v,e[6]=m*v,e[7]=(i*c-u*n)*v,e[8]=(a*n-i*s)*v,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,a,o){const c=Math.cos(s),u=Math.sin(s);return this.set(i*c,i*u,-i*(c*a+u*o)+a+e,-r*u,r*c,-r*(-u*a+c*o)+o+n,0,0,1),this}scale(e,n){return this.premultiply(hu.makeScale(e,n)),this}rotate(e){return this.premultiply(hu.makeRotation(-e)),this}translate(e,n){return this.premultiply(hu.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const hu=new Qe;function K0(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Zl(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function $E(){const t=Zl("canvas");return t.style.display="block",t}const tm={};function Z0(t){t in tm||(tm[t]=!0,console.warn(t))}function qE(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const nm=new Qe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),im=new Qe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Do={[pr]:{transfer:$l,primaries:ql,toReference:t=>t,fromReference:t=>t},[Zn]:{transfer:yt,primaries:ql,toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[Mc]:{transfer:$l,primaries:Yl,toReference:t=>t.applyMatrix3(im),fromReference:t=>t.applyMatrix3(nm)},[Jf]:{transfer:yt,primaries:Yl,toReference:t=>t.convertSRGBToLinear().applyMatrix3(im),fromReference:t=>t.applyMatrix3(nm).convertLinearToSRGB()}},YE=new Set([pr,Mc]),ct={enabled:!0,_workingColorSpace:pr,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!YE.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=Do[e].toReference,r=Do[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return Do[t].primaries},getTransfer:function(t){return t===Vi?$l:Do[t].transfer}};function Ds(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function pu(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Kr;class KE{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Kr===void 0&&(Kr=Zl("canvas")),Kr.width=e.width,Kr.height=e.height;const i=Kr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Kr}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Zl("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Ds(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ds(n[i]/255)*255):n[i]=Ds(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ZE=0;class Q0{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ZE++}),this.uuid=ao(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(mu(r[a].image)):s.push(mu(r[a]))}else s=mu(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function mu(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?KE.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let QE=0;class hn extends Qs{constructor(e=hn.DEFAULT_IMAGE,n=hn.DEFAULT_MAPPING,i=Ur,r=Ur,s=Vn,a=Fr,o=ti,c=lr,u=hn.DEFAULT_ANISOTROPY,f=Vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:QE++}),this.uuid=ao(),this.name="",this.source=new Q0(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=u,this.format=o,this.internalFormat=null,this.type=c,this.offset=new lt(0,0),this.repeat=new lt(1,1),this.center=new lt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==H0)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Vd:e.x=e.x-Math.floor(e.x);break;case Ur:e.x=e.x<0?0:1;break;case Gd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Vd:e.y=e.y-Math.floor(e.y);break;case Ur:e.y=e.y<0?0:1;break;case Gd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}hn.DEFAULT_IMAGE=null;hn.DEFAULT_MAPPING=H0;hn.DEFAULT_ANISOTROPY=1;class Gt{constructor(e=0,n=0,i=0,r=1){Gt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const c=e.elements,u=c[0],f=c[4],p=c[8],h=c[1],m=c[5],y=c[9],v=c[2],g=c[6],d=c[10];if(Math.abs(f-h)<.01&&Math.abs(p-v)<.01&&Math.abs(y-g)<.01){if(Math.abs(f+h)<.1&&Math.abs(p+v)<.1&&Math.abs(y+g)<.1&&Math.abs(u+m+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const _=(u+1)/2,E=(m+1)/2,P=(d+1)/2,R=(f+h)/4,A=(p+v)/4,N=(y+g)/4;return _>E&&_>P?_<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(_),r=R/i,s=A/i):E>P?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=R/r,s=N/r):P<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(P),i=A/s,r=N/s),this.set(i,r,s,n),this}let x=Math.sqrt((g-y)*(g-y)+(p-v)*(p-v)+(h-f)*(h-f));return Math.abs(x)<.001&&(x=1),this.x=(g-y)/x,this.y=(p-v)/x,this.z=(h-f)/x,this.w=Math.acos((u+m+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class JE extends Qs{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new Gt(0,0,e,n),this.scissorTest=!1,this.viewport=new Gt(0,0,e,n);const r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new hn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new Q0(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gr extends JE{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class J0 extends hn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Rn,this.minFilter=Rn,this.wrapR=Ur,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class e1 extends hn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Rn,this.minFilter=Rn,this.wrapR=Ur,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class oo{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,a,o){let c=i[r+0],u=i[r+1],f=i[r+2],p=i[r+3];const h=s[a+0],m=s[a+1],y=s[a+2],v=s[a+3];if(o===0){e[n+0]=c,e[n+1]=u,e[n+2]=f,e[n+3]=p;return}if(o===1){e[n+0]=h,e[n+1]=m,e[n+2]=y,e[n+3]=v;return}if(p!==v||c!==h||u!==m||f!==y){let g=1-o;const d=c*h+u*m+f*y+p*v,x=d>=0?1:-1,_=1-d*d;if(_>Number.EPSILON){const P=Math.sqrt(_),R=Math.atan2(P,d*x);g=Math.sin(g*R)/P,o=Math.sin(o*R)/P}const E=o*x;if(c=c*g+h*E,u=u*g+m*E,f=f*g+y*E,p=p*g+v*E,g===1-o){const P=1/Math.sqrt(c*c+u*u+f*f+p*p);c*=P,u*=P,f*=P,p*=P}}e[n]=c,e[n+1]=u,e[n+2]=f,e[n+3]=p}static multiplyQuaternionsFlat(e,n,i,r,s,a){const o=i[r],c=i[r+1],u=i[r+2],f=i[r+3],p=s[a],h=s[a+1],m=s[a+2],y=s[a+3];return e[n]=o*y+f*p+c*m-u*h,e[n+1]=c*y+f*h+u*p-o*m,e[n+2]=u*y+f*m+o*h-c*p,e[n+3]=f*y-o*p-c*h-u*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,u=o(i/2),f=o(r/2),p=o(s/2),h=c(i/2),m=c(r/2),y=c(s/2);switch(a){case"XYZ":this._x=h*f*p+u*m*y,this._y=u*m*p-h*f*y,this._z=u*f*y+h*m*p,this._w=u*f*p-h*m*y;break;case"YXZ":this._x=h*f*p+u*m*y,this._y=u*m*p-h*f*y,this._z=u*f*y-h*m*p,this._w=u*f*p+h*m*y;break;case"ZXY":this._x=h*f*p-u*m*y,this._y=u*m*p+h*f*y,this._z=u*f*y+h*m*p,this._w=u*f*p-h*m*y;break;case"ZYX":this._x=h*f*p-u*m*y,this._y=u*m*p+h*f*y,this._z=u*f*y-h*m*p,this._w=u*f*p+h*m*y;break;case"YZX":this._x=h*f*p+u*m*y,this._y=u*m*p+h*f*y,this._z=u*f*y-h*m*p,this._w=u*f*p-h*m*y;break;case"XZY":this._x=h*f*p-u*m*y,this._y=u*m*p-h*f*y,this._z=u*f*y+h*m*p,this._w=u*f*p+h*m*y;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],c=n[9],u=n[2],f=n[6],p=n[10],h=i+o+p;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(f-c)*m,this._y=(s-u)*m,this._z=(a-r)*m}else if(i>o&&i>p){const m=2*Math.sqrt(1+i-o-p);this._w=(f-c)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+u)/m}else if(o>p){const m=2*Math.sqrt(1+o-i-p);this._w=(s-u)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(c+f)/m}else{const m=2*Math.sqrt(1+p-i-o);this._w=(a-r)/m,this._x=(s+u)/m,this._y=(c+f)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(on(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,a=e._w,o=n._x,c=n._y,u=n._z,f=n._w;return this._x=i*f+a*o+r*u-s*c,this._y=r*f+a*c+s*o-i*u,this._z=s*f+a*u+i*c-r*o,this._w=a*f-i*o-r*c-s*u,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const m=1-n;return this._w=m*a+n*this._w,this._x=m*i+n*this._x,this._y=m*r+n*this._y,this._z=m*s+n*this._z,this.normalize(),this}const u=Math.sqrt(c),f=Math.atan2(u,o),p=Math.sin((1-n)*f)/u,h=Math.sin(n*f)/u;return this._w=a*p+this._w*h,this._x=i*p+this._x*h,this._y=r*p+this._y*h,this._z=s*p+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(e=0,n=0,i=0){V.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(rm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(rm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,u=2*(a*r-o*i),f=2*(o*n-s*r),p=2*(s*i-a*n);return this.x=n+c*u+a*p-o*f,this.y=i+c*f+o*u-s*p,this.z=r+c*p+s*f-a*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,a=n.x,o=n.y,c=n.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return gu.copy(this).projectOnVector(e),this.sub(gu)}reflect(e){return this.sub(gu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(on(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const gu=new V,rm=new oo;class lo{constructor(e=new V(1/0,1/0,1/0),n=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(kn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(kn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=kn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,kn):kn.fromBufferAttribute(s,a),kn.applyMatrix4(e.matrixWorld),this.expandByPoint(kn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Io.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Io.copy(i.boundingBox)),Io.applyMatrix4(e.matrixWorld),this.union(Io)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,kn),kn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(da),Uo.subVectors(this.max,da),Zr.subVectors(e.a,da),Qr.subVectors(e.b,da),Jr.subVectors(e.c,da),Di.subVectors(Qr,Zr),Ii.subVectors(Jr,Qr),xr.subVectors(Zr,Jr);let n=[0,-Di.z,Di.y,0,-Ii.z,Ii.y,0,-xr.z,xr.y,Di.z,0,-Di.x,Ii.z,0,-Ii.x,xr.z,0,-xr.x,-Di.y,Di.x,0,-Ii.y,Ii.x,0,-xr.y,xr.x,0];return!vu(n,Zr,Qr,Jr,Uo)||(n=[1,0,0,0,1,0,0,0,1],!vu(n,Zr,Qr,Jr,Uo))?!1:(Fo.crossVectors(Di,Ii),n=[Fo.x,Fo.y,Fo.z],vu(n,Zr,Qr,Jr,Uo))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,kn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(kn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ai[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ai[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ai[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ai[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ai[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ai[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ai[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ai[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ai),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ai=[new V,new V,new V,new V,new V,new V,new V,new V],kn=new V,Io=new lo,Zr=new V,Qr=new V,Jr=new V,Di=new V,Ii=new V,xr=new V,da=new V,Uo=new V,Fo=new V,_r=new V;function vu(t,e,n,i,r){for(let s=0,a=t.length-3;s<=a;s+=3){_r.fromArray(t,s);const o=r.x*Math.abs(_r.x)+r.y*Math.abs(_r.y)+r.z*Math.abs(_r.z),c=e.dot(_r),u=n.dot(_r),f=i.dot(_r);if(Math.max(-Math.max(c,u,f),Math.min(c,u,f))>o)return!1}return!0}const t1=new lo,fa=new V,xu=new V;class Ec{constructor(e=new V,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):t1.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;fa.subVectors(e,this.center);const n=fa.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(fa,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(fa.copy(e.center).add(xu)),this.expandByPoint(fa.copy(e.center).sub(xu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const oi=new V,_u=new V,ko=new V,Ui=new V,yu=new V,Oo=new V,Su=new V;class ex{constructor(e=new V,n=new V(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,oi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=oi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(oi.copy(this.origin).addScaledVector(this.direction,n),oi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){_u.copy(e).add(n).multiplyScalar(.5),ko.copy(n).sub(e).normalize(),Ui.copy(this.origin).sub(_u);const s=e.distanceTo(n)*.5,a=-this.direction.dot(ko),o=Ui.dot(this.direction),c=-Ui.dot(ko),u=Ui.lengthSq(),f=Math.abs(1-a*a);let p,h,m,y;if(f>0)if(p=a*c-o,h=a*o-c,y=s*f,p>=0)if(h>=-y)if(h<=y){const v=1/f;p*=v,h*=v,m=p*(p+a*h+2*o)+h*(a*p+h+2*c)+u}else h=s,p=Math.max(0,-(a*h+o)),m=-p*p+h*(h+2*c)+u;else h=-s,p=Math.max(0,-(a*h+o)),m=-p*p+h*(h+2*c)+u;else h<=-y?(p=Math.max(0,-(-a*s+o)),h=p>0?-s:Math.min(Math.max(-s,-c),s),m=-p*p+h*(h+2*c)+u):h<=y?(p=0,h=Math.min(Math.max(-s,-c),s),m=h*(h+2*c)+u):(p=Math.max(0,-(a*s+o)),h=p>0?s:Math.min(Math.max(-s,-c),s),m=-p*p+h*(h+2*c)+u);else h=a>0?-s:s,p=Math.max(0,-(a*h+o)),m=-p*p+h*(h+2*c)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(_u).addScaledVector(ko,h),m}intersectSphere(e,n){oi.subVectors(e.center,this.origin);const i=oi.dot(this.direction),r=oi.dot(oi)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,n):this.at(o,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,a,o,c;const u=1/this.direction.x,f=1/this.direction.y,p=1/this.direction.z,h=this.origin;return u>=0?(i=(e.min.x-h.x)*u,r=(e.max.x-h.x)*u):(i=(e.max.x-h.x)*u,r=(e.min.x-h.x)*u),f>=0?(s=(e.min.y-h.y)*f,a=(e.max.y-h.y)*f):(s=(e.max.y-h.y)*f,a=(e.min.y-h.y)*f),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),p>=0?(o=(e.min.z-h.z)*p,c=(e.max.z-h.z)*p):(o=(e.max.z-h.z)*p,c=(e.min.z-h.z)*p),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,oi)!==null}intersectTriangle(e,n,i,r,s){yu.subVectors(n,e),Oo.subVectors(i,e),Su.crossVectors(yu,Oo);let a=this.direction.dot(Su),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ui.subVectors(this.origin,e);const c=o*this.direction.dot(Oo.crossVectors(Ui,Oo));if(c<0)return null;const u=o*this.direction.dot(yu.cross(Ui));if(u<0||c+u>a)return null;const f=-o*Ui.dot(Su);return f<0?null:this.at(f/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Lt{constructor(e,n,i,r,s,a,o,c,u,f,p,h,m,y,v,g){Lt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,c,u,f,p,h,m,y,v,g)}set(e,n,i,r,s,a,o,c,u,f,p,h,m,y,v,g){const d=this.elements;return d[0]=e,d[4]=n,d[8]=i,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=c,d[2]=u,d[6]=f,d[10]=p,d[14]=h,d[3]=m,d[7]=y,d[11]=v,d[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Lt().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/es.setFromMatrixColumn(e,0).length(),s=1/es.setFromMatrixColumn(e,1).length(),a=1/es.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),u=Math.sin(r),f=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){const h=a*f,m=a*p,y=o*f,v=o*p;n[0]=c*f,n[4]=-c*p,n[8]=u,n[1]=m+y*u,n[5]=h-v*u,n[9]=-o*c,n[2]=v-h*u,n[6]=y+m*u,n[10]=a*c}else if(e.order==="YXZ"){const h=c*f,m=c*p,y=u*f,v=u*p;n[0]=h+v*o,n[4]=y*o-m,n[8]=a*u,n[1]=a*p,n[5]=a*f,n[9]=-o,n[2]=m*o-y,n[6]=v+h*o,n[10]=a*c}else if(e.order==="ZXY"){const h=c*f,m=c*p,y=u*f,v=u*p;n[0]=h-v*o,n[4]=-a*p,n[8]=y+m*o,n[1]=m+y*o,n[5]=a*f,n[9]=v-h*o,n[2]=-a*u,n[6]=o,n[10]=a*c}else if(e.order==="ZYX"){const h=a*f,m=a*p,y=o*f,v=o*p;n[0]=c*f,n[4]=y*u-m,n[8]=h*u+v,n[1]=c*p,n[5]=v*u+h,n[9]=m*u-y,n[2]=-u,n[6]=o*c,n[10]=a*c}else if(e.order==="YZX"){const h=a*c,m=a*u,y=o*c,v=o*u;n[0]=c*f,n[4]=v-h*p,n[8]=y*p+m,n[1]=p,n[5]=a*f,n[9]=-o*f,n[2]=-u*f,n[6]=m*p+y,n[10]=h-v*p}else if(e.order==="XZY"){const h=a*c,m=a*u,y=o*c,v=o*u;n[0]=c*f,n[4]=-p,n[8]=u*f,n[1]=h*p+v,n[5]=a*f,n[9]=m*p-y,n[2]=y*p-m,n[6]=o*f,n[10]=v*p+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(n1,e,i1)}lookAt(e,n,i){const r=this.elements;return mn.subVectors(e,n),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),Fi.crossVectors(i,mn),Fi.lengthSq()===0&&(Math.abs(i.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),Fi.crossVectors(i,mn)),Fi.normalize(),Bo.crossVectors(mn,Fi),r[0]=Fi.x,r[4]=Bo.x,r[8]=mn.x,r[1]=Fi.y,r[5]=Bo.y,r[9]=mn.y,r[2]=Fi.z,r[6]=Bo.z,r[10]=mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],c=i[8],u=i[12],f=i[1],p=i[5],h=i[9],m=i[13],y=i[2],v=i[6],g=i[10],d=i[14],x=i[3],_=i[7],E=i[11],P=i[15],R=r[0],A=r[4],N=r[8],S=r[12],M=r[1],I=r[5],G=r[9],j=r[13],Q=r[2],X=r[6],Y=r[10],J=r[14],O=r[3],ee=r[7],ne=r[11],le=r[15];return s[0]=a*R+o*M+c*Q+u*O,s[4]=a*A+o*I+c*X+u*ee,s[8]=a*N+o*G+c*Y+u*ne,s[12]=a*S+o*j+c*J+u*le,s[1]=f*R+p*M+h*Q+m*O,s[5]=f*A+p*I+h*X+m*ee,s[9]=f*N+p*G+h*Y+m*ne,s[13]=f*S+p*j+h*J+m*le,s[2]=y*R+v*M+g*Q+d*O,s[6]=y*A+v*I+g*X+d*ee,s[10]=y*N+v*G+g*Y+d*ne,s[14]=y*S+v*j+g*J+d*le,s[3]=x*R+_*M+E*Q+P*O,s[7]=x*A+_*I+E*X+P*ee,s[11]=x*N+_*G+E*Y+P*ne,s[15]=x*S+_*j+E*J+P*le,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],u=e[13],f=e[2],p=e[6],h=e[10],m=e[14],y=e[3],v=e[7],g=e[11],d=e[15];return y*(+s*c*p-r*u*p-s*o*h+i*u*h+r*o*m-i*c*m)+v*(+n*c*m-n*u*h+s*a*h-r*a*m+r*u*f-s*c*f)+g*(+n*u*p-n*o*m-s*a*p+i*a*m+s*o*f-i*u*f)+d*(-r*o*f-n*c*p+n*o*h+r*a*p-i*a*h+i*c*f)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],u=e[7],f=e[8],p=e[9],h=e[10],m=e[11],y=e[12],v=e[13],g=e[14],d=e[15],x=p*g*u-v*h*u+v*c*m-o*g*m-p*c*d+o*h*d,_=y*h*u-f*g*u-y*c*m+a*g*m+f*c*d-a*h*d,E=f*v*u-y*p*u+y*o*m-a*v*m-f*o*d+a*p*d,P=y*p*c-f*v*c-y*o*h+a*v*h+f*o*g-a*p*g,R=n*x+i*_+r*E+s*P;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/R;return e[0]=x*A,e[1]=(v*h*s-p*g*s-v*r*m+i*g*m+p*r*d-i*h*d)*A,e[2]=(o*g*s-v*c*s+v*r*u-i*g*u-o*r*d+i*c*d)*A,e[3]=(p*c*s-o*h*s-p*r*u+i*h*u+o*r*m-i*c*m)*A,e[4]=_*A,e[5]=(f*g*s-y*h*s+y*r*m-n*g*m-f*r*d+n*h*d)*A,e[6]=(y*c*s-a*g*s-y*r*u+n*g*u+a*r*d-n*c*d)*A,e[7]=(a*h*s-f*c*s+f*r*u-n*h*u-a*r*m+n*c*m)*A,e[8]=E*A,e[9]=(y*p*s-f*v*s-y*i*m+n*v*m+f*i*d-n*p*d)*A,e[10]=(a*v*s-y*o*s+y*i*u-n*v*u-a*i*d+n*o*d)*A,e[11]=(f*o*s-a*p*s-f*i*u+n*p*u+a*i*m-n*o*m)*A,e[12]=P*A,e[13]=(f*v*r-y*p*r+y*i*h-n*v*h-f*i*g+n*p*g)*A,e[14]=(y*o*r-a*v*r-y*i*c+n*v*c+a*i*g-n*o*g)*A,e[15]=(a*p*r-f*o*r+f*i*c-n*p*c-a*i*h+n*o*h)*A,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=e.x,o=e.y,c=e.z,u=s*a,f=s*o;return this.set(u*a+i,u*o-r*c,u*c+r*o,0,u*o+r*c,f*o+i,f*c-r*a,0,u*c-r*o,f*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,c=n._w,u=s+s,f=a+a,p=o+o,h=s*u,m=s*f,y=s*p,v=a*f,g=a*p,d=o*p,x=c*u,_=c*f,E=c*p,P=i.x,R=i.y,A=i.z;return r[0]=(1-(v+d))*P,r[1]=(m+E)*P,r[2]=(y-_)*P,r[3]=0,r[4]=(m-E)*R,r[5]=(1-(h+d))*R,r[6]=(g+x)*R,r[7]=0,r[8]=(y+_)*A,r[9]=(g-x)*A,r[10]=(1-(h+v))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=es.set(r[0],r[1],r[2]).length();const a=es.set(r[4],r[5],r[6]).length(),o=es.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],On.copy(this);const u=1/s,f=1/a,p=1/o;return On.elements[0]*=u,On.elements[1]*=u,On.elements[2]*=u,On.elements[4]*=f,On.elements[5]*=f,On.elements[6]*=f,On.elements[8]*=p,On.elements[9]*=p,On.elements[10]*=p,n.setFromRotationMatrix(On),i.x=s,i.y=a,i.z=o,this}makePerspective(e,n,i,r,s,a,o=xi){const c=this.elements,u=2*s/(n-e),f=2*s/(i-r),p=(n+e)/(n-e),h=(i+r)/(i-r);let m,y;if(o===xi)m=-(a+s)/(a-s),y=-2*a*s/(a-s);else if(o===Kl)m=-a/(a-s),y=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=p,c[12]=0,c[1]=0,c[5]=f,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,s,a,o=xi){const c=this.elements,u=1/(n-e),f=1/(i-r),p=1/(a-s),h=(n+e)*u,m=(i+r)*f;let y,v;if(o===xi)y=(a+s)*p,v=-2*p;else if(o===Kl)y=s*p,v=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*u,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*f,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=v,c[14]=-y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const es=new V,On=new Lt,n1=new V(0,0,0),i1=new V(1,1,1),Fi=new V,Bo=new V,mn=new V,sm=new Lt,am=new oo;class Ai{constructor(e=0,n=0,i=0,r=Ai.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],u=r[5],f=r[9],p=r[2],h=r[6],m=r[10];switch(n){case"XYZ":this._y=Math.asin(on(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-on(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,u)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(on(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-on(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(on(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,u),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-on(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-f,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return sm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(sm,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return am.setFromEuler(this),this.setFromQuaternion(am,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ai.DEFAULT_ORDER="XYZ";class tx{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let r1=0;const om=new V,ts=new oo,li=new Lt,zo=new V,ha=new V,s1=new V,a1=new oo,lm=new V(1,0,0),cm=new V(0,1,0),um=new V(0,0,1),dm={type:"added"},o1={type:"removed"},ns={type:"childadded",child:null},Mu={type:"childremoved",child:null};class pn extends Qs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:r1++}),this.uuid=ao(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pn.DEFAULT_UP.clone();const e=new V,n=new Ai,i=new oo,r=new V(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Lt},normalMatrix:{value:new Qe}}),this.matrix=new Lt,this.matrixWorld=new Lt,this.matrixAutoUpdate=pn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new tx,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return ts.setFromAxisAngle(e,n),this.quaternion.multiply(ts),this}rotateOnWorldAxis(e,n){return ts.setFromAxisAngle(e,n),this.quaternion.premultiply(ts),this}rotateX(e){return this.rotateOnAxis(lm,e)}rotateY(e){return this.rotateOnAxis(cm,e)}rotateZ(e){return this.rotateOnAxis(um,e)}translateOnAxis(e,n){return om.copy(e).applyQuaternion(this.quaternion),this.position.add(om.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(lm,e)}translateY(e){return this.translateOnAxis(cm,e)}translateZ(e){return this.translateOnAxis(um,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(li.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?zo.copy(e):zo.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),ha.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?li.lookAt(ha,zo,this.up):li.lookAt(zo,ha,this.up),this.quaternion.setFromRotationMatrix(li),r&&(li.extractRotation(r.matrixWorld),ts.setFromRotationMatrix(li),this.quaternion.premultiply(ts.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(dm),ns.child=e,this.dispatchEvent(ns),ns.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(o1),Mu.child=e,this.dispatchEvent(Mu),Mu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),li.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),li.multiply(e.parent.matrixWorld)),e.applyMatrix4(li),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(dm),ns.child=e,this.dispatchEvent(ns),ns.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ha,e,s1),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ha,a1,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++){const s=n[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),n===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let u=0,f=c.length;u<f;u++){const p=c[u];s(e.shapes,p)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,u=this.material.length;c<u;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(n){const o=a(e.geometries),c=a(e.materials),u=a(e.textures),f=a(e.images),p=a(e.shapes),h=a(e.skeletons),m=a(e.animations),y=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),u.length>0&&(i.textures=u),f.length>0&&(i.images=f),p.length>0&&(i.shapes=p),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),y.length>0&&(i.nodes=y)}return i.object=r,i;function a(o){const c=[];for(const u in o){const f=o[u];delete f.metadata,c.push(f)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}pn.DEFAULT_UP=new V(0,1,0);pn.DEFAULT_MATRIX_AUTO_UPDATE=!0;pn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Bn=new V,ci=new V,Eu=new V,ui=new V,is=new V,rs=new V,fm=new V,wu=new V,Tu=new V,Au=new V;class ei{constructor(e=new V,n=new V,i=new V){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Bn.subVectors(e,n),r.cross(Bn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Bn.subVectors(r,n),ci.subVectors(i,n),Eu.subVectors(e,n);const a=Bn.dot(Bn),o=Bn.dot(ci),c=Bn.dot(Eu),u=ci.dot(ci),f=ci.dot(Eu),p=a*u-o*o;if(p===0)return s.set(0,0,0),null;const h=1/p,m=(u*c-o*f)*h,y=(a*f-o*c)*h;return s.set(1-m-y,y,m)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,ui)===null?!1:ui.x>=0&&ui.y>=0&&ui.x+ui.y<=1}static getInterpolation(e,n,i,r,s,a,o,c){return this.getBarycoord(e,n,i,r,ui)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,ui.x),c.addScaledVector(a,ui.y),c.addScaledVector(o,ui.z),c)}static isFrontFacing(e,n,i,r){return Bn.subVectors(i,n),ci.subVectors(e,n),Bn.cross(ci).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Bn.subVectors(this.c,this.b),ci.subVectors(this.a,this.b),Bn.cross(ci).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ei.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return ei.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return ei.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return ei.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ei.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let a,o;is.subVectors(r,i),rs.subVectors(s,i),wu.subVectors(e,i);const c=is.dot(wu),u=rs.dot(wu);if(c<=0&&u<=0)return n.copy(i);Tu.subVectors(e,r);const f=is.dot(Tu),p=rs.dot(Tu);if(f>=0&&p<=f)return n.copy(r);const h=c*p-f*u;if(h<=0&&c>=0&&f<=0)return a=c/(c-f),n.copy(i).addScaledVector(is,a);Au.subVectors(e,s);const m=is.dot(Au),y=rs.dot(Au);if(y>=0&&m<=y)return n.copy(s);const v=m*u-c*y;if(v<=0&&u>=0&&y<=0)return o=u/(u-y),n.copy(i).addScaledVector(rs,o);const g=f*y-m*p;if(g<=0&&p-f>=0&&m-y>=0)return fm.subVectors(s,r),o=(p-f)/(p-f+(m-y)),n.copy(r).addScaledVector(fm,o);const d=1/(g+v+h);return a=v*d,o=h*d,n.copy(i).addScaledVector(is,a).addScaledVector(rs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const nx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ki={h:0,s:0,l:0},jo={h:0,s:0,l:0};function Cu(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class ut{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Zn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ct.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=ct.workingColorSpace){return this.r=e,this.g=n,this.b=i,ct.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=ct.workingColorSpace){if(e=XE(e,1),n=on(n,0,1),i=on(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=Cu(a,s,e+1/3),this.g=Cu(a,s,e),this.b=Cu(a,s,e-1/3)}return ct.toWorkingColorSpace(this,r),this}setStyle(e,n=Zn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Zn){const i=nx[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ds(e.r),this.g=Ds(e.g),this.b=Ds(e.b),this}copyLinearToSRGB(e){return this.r=pu(e.r),this.g=pu(e.g),this.b=pu(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Zn){return ct.fromWorkingColorSpace(Kt.copy(this),e),Math.round(on(Kt.r*255,0,255))*65536+Math.round(on(Kt.g*255,0,255))*256+Math.round(on(Kt.b*255,0,255))}getHexString(e=Zn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=ct.workingColorSpace){ct.fromWorkingColorSpace(Kt.copy(this),n);const i=Kt.r,r=Kt.g,s=Kt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,u;const f=(o+a)/2;if(o===a)c=0,u=0;else{const p=a-o;switch(u=f<=.5?p/(a+o):p/(2-a-o),a){case i:c=(r-s)/p+(r<s?6:0);break;case r:c=(s-i)/p+2;break;case s:c=(i-r)/p+4;break}c/=6}return e.h=c,e.s=u,e.l=f,e}getRGB(e,n=ct.workingColorSpace){return ct.fromWorkingColorSpace(Kt.copy(this),n),e.r=Kt.r,e.g=Kt.g,e.b=Kt.b,e}getStyle(e=Zn){ct.fromWorkingColorSpace(Kt.copy(this),e);const n=Kt.r,i=Kt.g,r=Kt.b;return e!==Zn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(ki),this.setHSL(ki.h+e,ki.s+n,ki.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(ki),e.getHSL(jo);const i=fu(ki.h,jo.h,n),r=fu(ki.s,jo.s,n),s=fu(ki.l,jo.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Kt=new ut;ut.NAMES=nx;let l1=0;class co extends Qs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:l1++}),this.uuid=ao(),this.name="",this.type="Material",this.blending=Ps,this.side=or,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Bd,this.blendDst=zd,this.blendEquation=Rr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ut(0,0,0),this.blendAlpha=0,this.depthFunc=Wl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Yr,this.stencilZFail=Yr,this.stencilZPass=Yr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ps&&(i.blending=this.blending),this.side!==or&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Bd&&(i.blendSrc=this.blendSrc),this.blendDst!==zd&&(i.blendDst=this.blendDst),this.blendEquation!==Rr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Wl&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Qp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Yr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Yr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Yr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(n){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ix extends co{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ai,this.combine=j0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Nt=new V,Ho=new lt;class Pn{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Jp,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Xi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Z0("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Ho.fromBufferAttribute(this,n),Ho.applyMatrix3(e),this.setXY(n,Ho.x,Ho.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Nt.fromBufferAttribute(this,n),Nt.applyMatrix3(e),this.setXYZ(n,Nt.x,Nt.y,Nt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Nt.fromBufferAttribute(this,n),Nt.applyMatrix4(e),this.setXYZ(n,Nt.x,Nt.y,Nt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Nt.fromBufferAttribute(this,n),Nt.applyNormalMatrix(e),this.setXYZ(n,Nt.x,Nt.y,Nt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Nt.fromBufferAttribute(this,n),Nt.transformDirection(e),this.setXYZ(n,Nt.x,Nt.y,Nt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=ua(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=sn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=ua(n,this.array)),n}setX(e,n){return this.normalized&&(n=sn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=ua(n,this.array)),n}setY(e,n){return this.normalized&&(n=sn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=ua(n,this.array)),n}setZ(e,n){return this.normalized&&(n=sn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=ua(n,this.array)),n}setW(e,n){return this.normalized&&(n=sn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=sn(n,this.array),i=sn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=sn(n,this.array),i=sn(i,this.array),r=sn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=sn(n,this.array),i=sn(i,this.array),r=sn(r,this.array),s=sn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Jp&&(e.usage=this.usage),e}}class rx extends Pn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class sx extends Pn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class rr extends Pn{constructor(e,n,i){super(new Float32Array(e),n,i)}}let c1=0;const wn=new Lt,bu=new pn,ss=new V,gn=new lo,pa=new lo,zt=new V;class Ni extends Qs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:c1++}),this.uuid=ao(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(K0(e)?sx:rx)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Qe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return wn.makeRotationFromQuaternion(e),this.applyMatrix4(wn),this}rotateX(e){return wn.makeRotationX(e),this.applyMatrix4(wn),this}rotateY(e){return wn.makeRotationY(e),this.applyMatrix4(wn),this}rotateZ(e){return wn.makeRotationZ(e),this.applyMatrix4(wn),this}translate(e,n,i){return wn.makeTranslation(e,n,i),this.applyMatrix4(wn),this}scale(e,n,i){return wn.makeScale(e,n,i),this.applyMatrix4(wn),this}lookAt(e){return bu.lookAt(e),bu.updateMatrix(),this.applyMatrix4(bu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ss).negate(),this.translate(ss.x,ss.y,ss.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new rr(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new lo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];gn.setFromBufferAttribute(s),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,gn.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,gn.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(gn.min),this.boundingBox.expandByPoint(gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ec);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){const i=this.boundingSphere.center;if(gn.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];pa.setFromBufferAttribute(o),this.morphTargetsRelative?(zt.addVectors(gn.min,pa.min),gn.expandByPoint(zt),zt.addVectors(gn.max,pa.max),gn.expandByPoint(zt)):(gn.expandByPoint(pa.min),gn.expandByPoint(pa.max))}gn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)zt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(zt));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],c=this.morphTargetsRelative;for(let u=0,f=o.count;u<f;u++)zt.fromBufferAttribute(o,u),c&&(ss.fromBufferAttribute(e,u),zt.add(ss)),r=Math.max(r,i.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let N=0;N<i.count;N++)o[N]=new V,c[N]=new V;const u=new V,f=new V,p=new V,h=new lt,m=new lt,y=new lt,v=new V,g=new V;function d(N,S,M){u.fromBufferAttribute(i,N),f.fromBufferAttribute(i,S),p.fromBufferAttribute(i,M),h.fromBufferAttribute(s,N),m.fromBufferAttribute(s,S),y.fromBufferAttribute(s,M),f.sub(u),p.sub(u),m.sub(h),y.sub(h);const I=1/(m.x*y.y-y.x*m.y);isFinite(I)&&(v.copy(f).multiplyScalar(y.y).addScaledVector(p,-m.y).multiplyScalar(I),g.copy(p).multiplyScalar(m.x).addScaledVector(f,-y.x).multiplyScalar(I),o[N].add(v),o[S].add(v),o[M].add(v),c[N].add(g),c[S].add(g),c[M].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let N=0,S=x.length;N<S;++N){const M=x[N],I=M.start,G=M.count;for(let j=I,Q=I+G;j<Q;j+=3)d(e.getX(j+0),e.getX(j+1),e.getX(j+2))}const _=new V,E=new V,P=new V,R=new V;function A(N){P.fromBufferAttribute(r,N),R.copy(P);const S=o[N];_.copy(S),_.sub(P.multiplyScalar(P.dot(S))).normalize(),E.crossVectors(R,S);const I=E.dot(c[N])<0?-1:1;a.setXYZW(N,_.x,_.y,_.z,I)}for(let N=0,S=x.length;N<S;++N){const M=x[N],I=M.start,G=M.count;for(let j=I,Q=I+G;j<Q;j+=3)A(e.getX(j+0)),A(e.getX(j+1)),A(e.getX(j+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Pn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const r=new V,s=new V,a=new V,o=new V,c=new V,u=new V,f=new V,p=new V;if(e)for(let h=0,m=e.count;h<m;h+=3){const y=e.getX(h+0),v=e.getX(h+1),g=e.getX(h+2);r.fromBufferAttribute(n,y),s.fromBufferAttribute(n,v),a.fromBufferAttribute(n,g),f.subVectors(a,s),p.subVectors(r,s),f.cross(p),o.fromBufferAttribute(i,y),c.fromBufferAttribute(i,v),u.fromBufferAttribute(i,g),o.add(f),c.add(f),u.add(f),i.setXYZ(y,o.x,o.y,o.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(g,u.x,u.y,u.z)}else for(let h=0,m=n.count;h<m;h+=3)r.fromBufferAttribute(n,h+0),s.fromBufferAttribute(n,h+1),a.fromBufferAttribute(n,h+2),f.subVectors(a,s),p.subVectors(r,s),f.cross(p),i.setXYZ(h+0,f.x,f.y,f.z),i.setXYZ(h+1,f.x,f.y,f.z),i.setXYZ(h+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)zt.fromBufferAttribute(e,n),zt.normalize(),e.setXYZ(n,zt.x,zt.y,zt.z)}toNonIndexed(){function e(o,c){const u=o.array,f=o.itemSize,p=o.normalized,h=new u.constructor(c.length*f);let m=0,y=0;for(let v=0,g=c.length;v<g;v++){o.isInterleavedBufferAttribute?m=c[v]*o.data.stride+o.offset:m=c[v]*f;for(let d=0;d<f;d++)h[y++]=u[m++]}return new Pn(h,f,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Ni,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],u=e(c,i);n.setAttribute(o,u)}const s=this.morphAttributes;for(const o in s){const c=[],u=s[o];for(let f=0,p=u.length;f<p;f++){const h=u[f],m=e(h,i);c.push(m)}n.morphAttributes[o]=c}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const u=a[o];n.addGroup(u.start,u.count,u.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const u in c)c[u]!==void 0&&(e[u]=c[u]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const c in i){const u=i[c];e.data.attributes[c]=u.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const u=this.morphAttributes[c],f=[];for(let p=0,h=u.length;p<h;p++){const m=u[p];f.push(m.toJSON(e.data))}f.length>0&&(r[c]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const u in r){const f=r[u];this.setAttribute(u,f.clone(n))}const s=e.morphAttributes;for(const u in s){const f=[],p=s[u];for(let h=0,m=p.length;h<m;h++)f.push(p[h].clone(n));this.morphAttributes[u]=f}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let u=0,f=a.length;u<f;u++){const p=a[u];this.addGroup(p.start,p.count,p.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const hm=new Lt,yr=new ex,Vo=new Ec,pm=new V,as=new V,os=new V,ls=new V,Ru=new V,Go=new V,Wo=new lt,Xo=new lt,$o=new lt,mm=new V,gm=new V,vm=new V,qo=new V,Yo=new V;class _i extends pn{constructor(e=new Ni,n=new ix){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Go.set(0,0,0);for(let c=0,u=s.length;c<u;c++){const f=o[c],p=s[c];f!==0&&(Ru.fromBufferAttribute(p,e),a?Go.addScaledVector(Ru,f):Go.addScaledVector(Ru.sub(n),f))}n.add(Go)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Vo.copy(i.boundingSphere),Vo.applyMatrix4(s),yr.copy(e.ray).recast(e.near),!(Vo.containsPoint(yr.origin)===!1&&(yr.intersectSphere(Vo,pm)===null||yr.origin.distanceToSquared(pm)>(e.far-e.near)**2))&&(hm.copy(s).invert(),yr.copy(e.ray).applyMatrix4(hm),!(i.boundingBox!==null&&yr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,yr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,u=s.attributes.uv,f=s.attributes.uv1,p=s.attributes.normal,h=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let y=0,v=h.length;y<v;y++){const g=h[y],d=a[g.materialIndex],x=Math.max(g.start,m.start),_=Math.min(o.count,Math.min(g.start+g.count,m.start+m.count));for(let E=x,P=_;E<P;E+=3){const R=o.getX(E),A=o.getX(E+1),N=o.getX(E+2);r=Ko(this,d,e,i,u,f,p,R,A,N),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const y=Math.max(0,m.start),v=Math.min(o.count,m.start+m.count);for(let g=y,d=v;g<d;g+=3){const x=o.getX(g),_=o.getX(g+1),E=o.getX(g+2);r=Ko(this,a,e,i,u,f,p,x,_,E),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let y=0,v=h.length;y<v;y++){const g=h[y],d=a[g.materialIndex],x=Math.max(g.start,m.start),_=Math.min(c.count,Math.min(g.start+g.count,m.start+m.count));for(let E=x,P=_;E<P;E+=3){const R=E,A=E+1,N=E+2;r=Ko(this,d,e,i,u,f,p,R,A,N),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const y=Math.max(0,m.start),v=Math.min(c.count,m.start+m.count);for(let g=y,d=v;g<d;g+=3){const x=g,_=g+1,E=g+2;r=Ko(this,a,e,i,u,f,p,x,_,E),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function u1(t,e,n,i,r,s,a,o){let c;if(e.side===fn?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===or,o),c===null)return null;Yo.copy(o),Yo.applyMatrix4(t.matrixWorld);const u=n.ray.origin.distanceTo(Yo);return u<n.near||u>n.far?null:{distance:u,point:Yo.clone(),object:t}}function Ko(t,e,n,i,r,s,a,o,c,u){t.getVertexPosition(o,as),t.getVertexPosition(c,os),t.getVertexPosition(u,ls);const f=u1(t,e,n,i,as,os,ls,qo);if(f){r&&(Wo.fromBufferAttribute(r,o),Xo.fromBufferAttribute(r,c),$o.fromBufferAttribute(r,u),f.uv=ei.getInterpolation(qo,as,os,ls,Wo,Xo,$o,new lt)),s&&(Wo.fromBufferAttribute(s,o),Xo.fromBufferAttribute(s,c),$o.fromBufferAttribute(s,u),f.uv1=ei.getInterpolation(qo,as,os,ls,Wo,Xo,$o,new lt)),a&&(mm.fromBufferAttribute(a,o),gm.fromBufferAttribute(a,c),vm.fromBufferAttribute(a,u),f.normal=ei.getInterpolation(qo,as,os,ls,mm,gm,vm,new V),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const p={a:o,b:c,c:u,normal:new V,materialIndex:0};ei.getNormal(as,os,ls,p.normal),f.face=p}return f}class uo extends Ni{constructor(e=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],u=[],f=[],p=[];let h=0,m=0;y("z","y","x",-1,-1,i,n,e,a,s,0),y("z","y","x",1,-1,i,n,-e,a,s,1),y("x","z","y",1,1,e,i,n,r,a,2),y("x","z","y",1,-1,e,i,-n,r,a,3),y("x","y","z",1,-1,e,n,i,r,s,4),y("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new rr(u,3)),this.setAttribute("normal",new rr(f,3)),this.setAttribute("uv",new rr(p,2));function y(v,g,d,x,_,E,P,R,A,N,S){const M=E/A,I=P/N,G=E/2,j=P/2,Q=R/2,X=A+1,Y=N+1;let J=0,O=0;const ee=new V;for(let ne=0;ne<Y;ne++){const le=ne*I-j;for(let Re=0;Re<X;Re++){const Je=Re*M-G;ee[v]=Je*x,ee[g]=le*_,ee[d]=Q,u.push(ee.x,ee.y,ee.z),ee[v]=0,ee[g]=0,ee[d]=R>0?1:-1,f.push(ee.x,ee.y,ee.z),p.push(Re/A),p.push(1-ne/N),J+=1}}for(let ne=0;ne<N;ne++)for(let le=0;le<A;le++){const Re=h+le+X*ne,Je=h+le+X*(ne+1),$=h+(le+1)+X*(ne+1),re=h+(le+1)+X*ne;c.push(Re,Je,re),c.push(Je,$,re),O+=6}o.addGroup(m,O,S),m+=O,h+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new uo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Xs(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function Jt(t){const e={};for(let n=0;n<t.length;n++){const i=Xs(t[n]);for(const r in i)e[r]=i[r]}return e}function d1(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function ax(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ct.workingColorSpace}const f1={clone:Xs,merge:Jt};var h1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,p1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class cr extends co{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=h1,this.fragmentShader=p1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Xs(e.uniforms),this.uniformsGroups=d1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class ox extends pn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Lt,this.projectionMatrix=new Lt,this.projectionMatrixInverse=new Lt,this.coordinateSystem=xi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Oi=new V,xm=new lt,_m=new lt;class Cn extends ox{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Wd*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(du*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Wd*2*Math.atan(Math.tan(du*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z),Oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z)}getViewSize(e,n){return this.getViewBounds(e,xm,_m),n.subVectors(_m,xm)}setViewOffset(e,n,i,r,s,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(du*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,u=a.fullHeight;s+=a.offsetX*r/c,n-=a.offsetY*i/u,r*=a.width/c,i*=a.height/u}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const cs=-90,us=1;class m1 extends pn{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Cn(cs,us,e,n);r.layers=this.layers,this.add(r);const s=new Cn(cs,us,e,n);s.layers=this.layers,this.add(s);const a=new Cn(cs,us,e,n);a.layers=this.layers,this.add(a);const o=new Cn(cs,us,e,n);o.layers=this.layers,this.add(o);const c=new Cn(cs,us,e,n);c.layers=this.layers,this.add(c);const u=new Cn(cs,us,e,n);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,a,o,c]=n;for(const u of n)this.remove(u);if(e===xi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Kl)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of n)this.add(u),u.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,u,f]=this.children,p=e.getRenderTarget(),h=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),y=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,a),e.setRenderTarget(i,2,r),e.render(n,o),e.setRenderTarget(i,3,r),e.render(n,c),e.setRenderTarget(i,4,r),e.render(n,u),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),e.render(n,f),e.setRenderTarget(p,h,m),e.xr.enabled=y,i.texture.needsPMREMUpdate=!0}}class lx extends hn{constructor(e,n,i,r,s,a,o,c,u,f){e=e!==void 0?e:[],n=n!==void 0?n:js,super(e,n,i,r,s,a,o,c,u,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class g1 extends Gr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new lx(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Vn}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new uo(5,5,5),s=new cr({name:"CubemapFromEquirect",uniforms:Xs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:fn,blending:nr});s.uniforms.tEquirect.value=n;const a=new _i(r,s),o=n.minFilter;return n.minFilter===Fr&&(n.minFilter=Vn),new m1(1,10,this).update(e,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,r);e.setRenderTarget(s)}}const Nu=new V,v1=new V,x1=new Qe;class Cr{constructor(e=new V(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Nu.subVectors(i,n).cross(v1.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(Nu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||x1.getNormalMatrix(e),r=this.coplanarPoint(Nu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Sr=new Ec,Zo=new V;class cx{constructor(e=new Cr,n=new Cr,i=new Cr,r=new Cr,s=new Cr,a=new Cr){this.planes=[e,n,i,r,s,a]}set(e,n,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=xi){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],c=r[3],u=r[4],f=r[5],p=r[6],h=r[7],m=r[8],y=r[9],v=r[10],g=r[11],d=r[12],x=r[13],_=r[14],E=r[15];if(i[0].setComponents(c-s,h-u,g-m,E-d).normalize(),i[1].setComponents(c+s,h+u,g+m,E+d).normalize(),i[2].setComponents(c+a,h+f,g+y,E+x).normalize(),i[3].setComponents(c-a,h-f,g-y,E-x).normalize(),i[4].setComponents(c-o,h-p,g-v,E-_).normalize(),n===xi)i[5].setComponents(c+o,h+p,g+v,E+_).normalize();else if(n===Kl)i[5].setComponents(o,p,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Sr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Sr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Sr)}intersectsSprite(e){return Sr.center.set(0,0,0),Sr.radius=.7071067811865476,Sr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Sr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Zo.x=r.normal.x>0?e.max.x:e.min.x,Zo.y=r.normal.y>0?e.max.y:e.min.y,Zo.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Zo)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ux(){let t=null,e=!1,n=null,i=null;function r(s,a){n(s,a),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function _1(t){const e=new WeakMap;function n(o,c){const u=o.array,f=o.usage,p=u.byteLength,h=t.createBuffer();t.bindBuffer(c,h),t.bufferData(c,u,f),o.onUploadCallback();let m;if(u instanceof Float32Array)m=t.FLOAT;else if(u instanceof Uint16Array)o.isFloat16BufferAttribute?m=t.HALF_FLOAT:m=t.UNSIGNED_SHORT;else if(u instanceof Int16Array)m=t.SHORT;else if(u instanceof Uint32Array)m=t.UNSIGNED_INT;else if(u instanceof Int32Array)m=t.INT;else if(u instanceof Int8Array)m=t.BYTE;else if(u instanceof Uint8Array)m=t.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)m=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:h,type:m,bytesPerElement:u.BYTES_PER_ELEMENT,version:o.version,size:p}}function i(o,c,u){const f=c.array,p=c._updateRange,h=c.updateRanges;if(t.bindBuffer(u,o),p.count===-1&&h.length===0&&t.bufferSubData(u,0,f),h.length!==0){for(let m=0,y=h.length;m<y;m++){const v=h[m];t.bufferSubData(u,v.start*f.BYTES_PER_ELEMENT,f,v.start,v.count)}c.clearUpdateRanges()}p.count!==-1&&(t.bufferSubData(u,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count),p.count=-1),c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(t.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isGLBufferAttribute){const f=e.get(o);(!f||f.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}o.isInterleavedBufferAttribute&&(o=o.data);const u=e.get(o);if(u===void 0)e.set(o,n(o,c));else if(u.version<o.version){if(u.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(u.buffer,o,c),u.version=o.version}}return{get:r,remove:s,update:a}}class wc extends Ni{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,a=n/2,o=Math.floor(i),c=Math.floor(r),u=o+1,f=c+1,p=e/o,h=n/c,m=[],y=[],v=[],g=[];for(let d=0;d<f;d++){const x=d*h-a;for(let _=0;_<u;_++){const E=_*p-s;y.push(E,-x,0),v.push(0,0,1),g.push(_/o),g.push(1-d/c)}}for(let d=0;d<c;d++)for(let x=0;x<o;x++){const _=x+u*d,E=x+u*(d+1),P=x+1+u*(d+1),R=x+1+u*d;m.push(_,E,R),m.push(E,P,R)}this.setIndex(m),this.setAttribute("position",new rr(y,3)),this.setAttribute("normal",new rr(v,3)),this.setAttribute("uv",new rr(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wc(e.width,e.height,e.widthSegments,e.heightSegments)}}var y1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,S1=`#ifdef USE_ALPHAHASH
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
#endif`,M1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,E1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,w1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,T1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,A1=`#ifdef USE_AOMAP
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
#endif`,C1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,b1=`#ifdef USE_BATCHING
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
#endif`,R1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,N1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,P1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,L1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,D1=`#ifdef USE_IRIDESCENCE
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
#endif`,I1=`#ifdef USE_BUMPMAP
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
#endif`,U1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,F1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,k1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,O1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,B1=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,z1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,j1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,H1=`#if defined( USE_COLOR_ALPHA )
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
#endif`,V1=`#define PI 3.141592653589793
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
} // validated`,G1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,W1=`vec3 transformedNormal = objectNormal;
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
#endif`,X1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,q1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Y1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,K1="gl_FragColor = linearToOutputTexel( gl_FragColor );",Z1=`
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
}`,Q1=`#ifdef USE_ENVMAP
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
#endif`,J1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ew=`#ifdef USE_ENVMAP
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
#endif`,tw=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,nw=`#ifdef USE_ENVMAP
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
#endif`,iw=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rw=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,sw=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,aw=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ow=`#ifdef USE_GRADIENTMAP
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
}`,lw=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,cw=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,uw=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,dw=`uniform bool receiveShadow;
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
#endif`,fw=`#ifdef USE_ENVMAP
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
#endif`,hw=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,pw=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,mw=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gw=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vw=`PhysicalMaterial material;
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
#endif`,xw=`struct PhysicalMaterial {
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
}`,_w=`
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
#endif`,yw=`#if defined( RE_IndirectDiffuse )
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
#endif`,Sw=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Mw=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ew=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ww=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tw=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Aw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cw=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Rw=`#if defined( USE_POINTS_UV )
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
#endif`,Nw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Pw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Lw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Dw=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Iw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Uw=`#ifdef USE_MORPHTARGETS
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
#endif`,Fw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ow=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Bw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Hw=`#ifdef USE_NORMALMAP
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
#endif`,Vw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Gw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ww=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Xw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$w=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qw=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Yw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Kw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Zw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,eT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,tT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,nT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,iT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,rT=`float getShadowMask() {
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
}`,sT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,aT=`#ifdef USE_SKINNING
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
#endif`,oT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,lT=`#ifdef USE_SKINNING
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
#endif`,cT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,uT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,fT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,hT=`#ifdef USE_TRANSMISSION
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
#endif`,pT=`#ifdef USE_TRANSMISSION
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
#endif`,mT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _T=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,yT=`uniform sampler2D t2D;
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
}`,ST=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,MT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ET=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,TT=`#include <common>
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
}`,AT=`#if DEPTH_PACKING == 3200
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
}`,CT=`#define DISTANCE
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
}`,bT=`#define DISTANCE
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
}`,RT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,NT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,PT=`uniform float scale;
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
}`,LT=`uniform vec3 diffuse;
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
}`,DT=`#include <common>
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
}`,IT=`uniform vec3 diffuse;
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
}`,UT=`#define LAMBERT
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
}`,FT=`#define LAMBERT
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
}`,kT=`#define MATCAP
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
}`,OT=`#define MATCAP
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
}`,BT=`#define NORMAL
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
}`,zT=`#define NORMAL
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
}`,jT=`#define PHONG
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
}`,HT=`#define PHONG
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
}`,VT=`#define STANDARD
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
}`,GT=`#define STANDARD
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
}`,WT=`#define TOON
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
}`,XT=`#define TOON
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
}`,$T=`uniform float size;
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
}`,qT=`uniform vec3 diffuse;
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
}`,YT=`#include <common>
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
}`,KT=`uniform vec3 color;
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
}`,ZT=`uniform float rotation;
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
}`,QT=`uniform vec3 diffuse;
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
}`,Ze={alphahash_fragment:y1,alphahash_pars_fragment:S1,alphamap_fragment:M1,alphamap_pars_fragment:E1,alphatest_fragment:w1,alphatest_pars_fragment:T1,aomap_fragment:A1,aomap_pars_fragment:C1,batching_pars_vertex:b1,batching_vertex:R1,begin_vertex:N1,beginnormal_vertex:P1,bsdfs:L1,iridescence_fragment:D1,bumpmap_pars_fragment:I1,clipping_planes_fragment:U1,clipping_planes_pars_fragment:F1,clipping_planes_pars_vertex:k1,clipping_planes_vertex:O1,color_fragment:B1,color_pars_fragment:z1,color_pars_vertex:j1,color_vertex:H1,common:V1,cube_uv_reflection_fragment:G1,defaultnormal_vertex:W1,displacementmap_pars_vertex:X1,displacementmap_vertex:$1,emissivemap_fragment:q1,emissivemap_pars_fragment:Y1,colorspace_fragment:K1,colorspace_pars_fragment:Z1,envmap_fragment:Q1,envmap_common_pars_fragment:J1,envmap_pars_fragment:ew,envmap_pars_vertex:tw,envmap_physical_pars_fragment:fw,envmap_vertex:nw,fog_vertex:iw,fog_pars_vertex:rw,fog_fragment:sw,fog_pars_fragment:aw,gradientmap_pars_fragment:ow,lightmap_pars_fragment:lw,lights_lambert_fragment:cw,lights_lambert_pars_fragment:uw,lights_pars_begin:dw,lights_toon_fragment:hw,lights_toon_pars_fragment:pw,lights_phong_fragment:mw,lights_phong_pars_fragment:gw,lights_physical_fragment:vw,lights_physical_pars_fragment:xw,lights_fragment_begin:_w,lights_fragment_maps:yw,lights_fragment_end:Sw,logdepthbuf_fragment:Mw,logdepthbuf_pars_fragment:Ew,logdepthbuf_pars_vertex:ww,logdepthbuf_vertex:Tw,map_fragment:Aw,map_pars_fragment:Cw,map_particle_fragment:bw,map_particle_pars_fragment:Rw,metalnessmap_fragment:Nw,metalnessmap_pars_fragment:Pw,morphinstance_vertex:Lw,morphcolor_vertex:Dw,morphnormal_vertex:Iw,morphtarget_pars_vertex:Uw,morphtarget_vertex:Fw,normal_fragment_begin:kw,normal_fragment_maps:Ow,normal_pars_fragment:Bw,normal_pars_vertex:zw,normal_vertex:jw,normalmap_pars_fragment:Hw,clearcoat_normal_fragment_begin:Vw,clearcoat_normal_fragment_maps:Gw,clearcoat_pars_fragment:Ww,iridescence_pars_fragment:Xw,opaque_fragment:$w,packing:qw,premultiplied_alpha_fragment:Yw,project_vertex:Kw,dithering_fragment:Zw,dithering_pars_fragment:Qw,roughnessmap_fragment:Jw,roughnessmap_pars_fragment:eT,shadowmap_pars_fragment:tT,shadowmap_pars_vertex:nT,shadowmap_vertex:iT,shadowmask_pars_fragment:rT,skinbase_vertex:sT,skinning_pars_vertex:aT,skinning_vertex:oT,skinnormal_vertex:lT,specularmap_fragment:cT,specularmap_pars_fragment:uT,tonemapping_fragment:dT,tonemapping_pars_fragment:fT,transmission_fragment:hT,transmission_pars_fragment:pT,uv_pars_fragment:mT,uv_pars_vertex:gT,uv_vertex:vT,worldpos_vertex:xT,background_vert:_T,background_frag:yT,backgroundCube_vert:ST,backgroundCube_frag:MT,cube_vert:ET,cube_frag:wT,depth_vert:TT,depth_frag:AT,distanceRGBA_vert:CT,distanceRGBA_frag:bT,equirect_vert:RT,equirect_frag:NT,linedashed_vert:PT,linedashed_frag:LT,meshbasic_vert:DT,meshbasic_frag:IT,meshlambert_vert:UT,meshlambert_frag:FT,meshmatcap_vert:kT,meshmatcap_frag:OT,meshnormal_vert:BT,meshnormal_frag:zT,meshphong_vert:jT,meshphong_frag:HT,meshphysical_vert:VT,meshphysical_frag:GT,meshtoon_vert:WT,meshtoon_frag:XT,points_vert:$T,points_frag:qT,shadow_vert:YT,shadow_frag:KT,sprite_vert:ZT,sprite_frag:QT},we={common:{diffuse:{value:new ut(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qe}},envmap:{envMap:{value:null},envMapRotation:{value:new Qe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qe},normalScale:{value:new lt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ut(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ut(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0},uvTransform:{value:new Qe}},sprite:{diffuse:{value:new ut(16777215)},opacity:{value:1},center:{value:new lt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}}},Qn={basic:{uniforms:Jt([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Jt([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new ut(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Jt([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new ut(0)},specular:{value:new ut(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Jt([we.common,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.roughnessmap,we.metalnessmap,we.fog,we.lights,{emissive:{value:new ut(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Jt([we.common,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.gradientmap,we.fog,we.lights,{emissive:{value:new ut(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Jt([we.common,we.bumpmap,we.normalmap,we.displacementmap,we.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Jt([we.points,we.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Jt([we.common,we.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Jt([we.common,we.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Jt([we.common,we.bumpmap,we.normalmap,we.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Jt([we.sprite,we.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qe}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:Jt([we.common,we.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:Jt([we.lights,we.fog,{color:{value:new ut(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};Qn.physical={uniforms:Jt([Qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qe},clearcoatNormalScale:{value:new lt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qe},sheen:{value:0},sheenColor:{value:new ut(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qe},transmissionSamplerSize:{value:new lt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qe},attenuationDistance:{value:0},attenuationColor:{value:new ut(0)},specularColor:{value:new ut(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qe},anisotropyVector:{value:new lt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qe}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const Qo={r:0,b:0,g:0},Mr=new Ai,JT=new Lt;function eA(t,e,n,i,r,s,a){const o=new ut(0);let c=s===!0?0:1,u,f,p=null,h=0,m=null;function y(x){let _=x.isScene===!0?x.background:null;return _&&_.isTexture&&(_=(x.backgroundBlurriness>0?n:e).get(_)),_}function v(x){let _=!1;const E=y(x);E===null?d(o,c):E&&E.isColor&&(d(E,1),_=!0);const P=t.xr.getEnvironmentBlendMode();P==="additive"?i.buffers.color.setClear(0,0,0,1,a):P==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(t.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function g(x,_){const E=y(_);E&&(E.isCubeTexture||E.mapping===yc)?(f===void 0&&(f=new _i(new uo(1,1,1),new cr({name:"BackgroundCubeMaterial",uniforms:Xs(Qn.backgroundCube.uniforms),vertexShader:Qn.backgroundCube.vertexShader,fragmentShader:Qn.backgroundCube.fragmentShader,side:fn,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(P,R,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(f)),Mr.copy(_.backgroundRotation),Mr.x*=-1,Mr.y*=-1,Mr.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Mr.y*=-1,Mr.z*=-1),f.material.uniforms.envMap.value=E,f.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(JT.makeRotationFromEuler(Mr)),f.material.toneMapped=ct.getTransfer(E.colorSpace)!==yt,(p!==E||h!==E.version||m!==t.toneMapping)&&(f.material.needsUpdate=!0,p=E,h=E.version,m=t.toneMapping),f.layers.enableAll(),x.unshift(f,f.geometry,f.material,0,0,null)):E&&E.isTexture&&(u===void 0&&(u=new _i(new wc(2,2),new cr({name:"BackgroundMaterial",uniforms:Xs(Qn.background.uniforms),vertexShader:Qn.background.vertexShader,fragmentShader:Qn.background.fragmentShader,side:or,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(u)),u.material.uniforms.t2D.value=E,u.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,u.material.toneMapped=ct.getTransfer(E.colorSpace)!==yt,E.matrixAutoUpdate===!0&&E.updateMatrix(),u.material.uniforms.uvTransform.value.copy(E.matrix),(p!==E||h!==E.version||m!==t.toneMapping)&&(u.material.needsUpdate=!0,p=E,h=E.version,m=t.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null))}function d(x,_){x.getRGB(Qo,ax(t)),i.buffers.color.setClear(Qo.r,Qo.g,Qo.b,_,a)}return{getClearColor:function(){return o},setClearColor:function(x,_=1){o.set(x),c=_,d(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,d(o,c)},render:v,addToRenderList:g}}function tA(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,a=!1;function o(M,I,G,j,Q){let X=!1;const Y=p(j,G,I);s!==Y&&(s=Y,u(s.object)),X=m(M,j,G,Q),X&&y(M,j,G,Q),Q!==null&&e.update(Q,t.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,E(M,I,G,j),Q!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(Q).buffer))}function c(){return t.createVertexArray()}function u(M){return t.bindVertexArray(M)}function f(M){return t.deleteVertexArray(M)}function p(M,I,G){const j=G.wireframe===!0;let Q=i[M.id];Q===void 0&&(Q={},i[M.id]=Q);let X=Q[I.id];X===void 0&&(X={},Q[I.id]=X);let Y=X[j];return Y===void 0&&(Y=h(c()),X[j]=Y),Y}function h(M){const I=[],G=[],j=[];for(let Q=0;Q<n;Q++)I[Q]=0,G[Q]=0,j[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:G,attributeDivisors:j,object:M,attributes:{},index:null}}function m(M,I,G,j){const Q=s.attributes,X=I.attributes;let Y=0;const J=G.getAttributes();for(const O in J)if(J[O].location>=0){const ne=Q[O];let le=X[O];if(le===void 0&&(O==="instanceMatrix"&&M.instanceMatrix&&(le=M.instanceMatrix),O==="instanceColor"&&M.instanceColor&&(le=M.instanceColor)),ne===void 0||ne.attribute!==le||le&&ne.data!==le.data)return!0;Y++}return s.attributesNum!==Y||s.index!==j}function y(M,I,G,j){const Q={},X=I.attributes;let Y=0;const J=G.getAttributes();for(const O in J)if(J[O].location>=0){let ne=X[O];ne===void 0&&(O==="instanceMatrix"&&M.instanceMatrix&&(ne=M.instanceMatrix),O==="instanceColor"&&M.instanceColor&&(ne=M.instanceColor));const le={};le.attribute=ne,ne&&ne.data&&(le.data=ne.data),Q[O]=le,Y++}s.attributes=Q,s.attributesNum=Y,s.index=j}function v(){const M=s.newAttributes;for(let I=0,G=M.length;I<G;I++)M[I]=0}function g(M){d(M,0)}function d(M,I){const G=s.newAttributes,j=s.enabledAttributes,Q=s.attributeDivisors;G[M]=1,j[M]===0&&(t.enableVertexAttribArray(M),j[M]=1),Q[M]!==I&&(t.vertexAttribDivisor(M,I),Q[M]=I)}function x(){const M=s.newAttributes,I=s.enabledAttributes;for(let G=0,j=I.length;G<j;G++)I[G]!==M[G]&&(t.disableVertexAttribArray(G),I[G]=0)}function _(M,I,G,j,Q,X,Y){Y===!0?t.vertexAttribIPointer(M,I,G,Q,X):t.vertexAttribPointer(M,I,G,j,Q,X)}function E(M,I,G,j){v();const Q=j.attributes,X=G.getAttributes(),Y=I.defaultAttributeValues;for(const J in X){const O=X[J];if(O.location>=0){let ee=Q[J];if(ee===void 0&&(J==="instanceMatrix"&&M.instanceMatrix&&(ee=M.instanceMatrix),J==="instanceColor"&&M.instanceColor&&(ee=M.instanceColor)),ee!==void 0){const ne=ee.normalized,le=ee.itemSize,Re=e.get(ee);if(Re===void 0)continue;const Je=Re.buffer,$=Re.type,re=Re.bytesPerElement,xe=$===t.INT||$===t.UNSIGNED_INT||ee.gpuType===V0;if(ee.isInterleavedBufferAttribute){const me=ee.data,Ee=me.stride,Ue=ee.offset;if(me.isInstancedInterleavedBuffer){for(let je=0;je<O.locationSize;je++)d(O.location+je,me.meshPerAttribute);M.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let je=0;je<O.locationSize;je++)g(O.location+je);t.bindBuffer(t.ARRAY_BUFFER,Je);for(let je=0;je<O.locationSize;je++)_(O.location+je,le/O.locationSize,$,ne,Ee*re,(Ue+le/O.locationSize*je)*re,xe)}else{if(ee.isInstancedBufferAttribute){for(let me=0;me<O.locationSize;me++)d(O.location+me,ee.meshPerAttribute);M.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let me=0;me<O.locationSize;me++)g(O.location+me);t.bindBuffer(t.ARRAY_BUFFER,Je);for(let me=0;me<O.locationSize;me++)_(O.location+me,le/O.locationSize,$,ne,le*re,le/O.locationSize*me*re,xe)}}else if(Y!==void 0){const ne=Y[J];if(ne!==void 0)switch(ne.length){case 2:t.vertexAttrib2fv(O.location,ne);break;case 3:t.vertexAttrib3fv(O.location,ne);break;case 4:t.vertexAttrib4fv(O.location,ne);break;default:t.vertexAttrib1fv(O.location,ne)}}}}x()}function P(){N();for(const M in i){const I=i[M];for(const G in I){const j=I[G];for(const Q in j)f(j[Q].object),delete j[Q];delete I[G]}delete i[M]}}function R(M){if(i[M.id]===void 0)return;const I=i[M.id];for(const G in I){const j=I[G];for(const Q in j)f(j[Q].object),delete j[Q];delete I[G]}delete i[M.id]}function A(M){for(const I in i){const G=i[I];if(G[M.id]===void 0)continue;const j=G[M.id];for(const Q in j)f(j[Q].object),delete j[Q];delete G[M.id]}}function N(){S(),a=!0,s!==r&&(s=r,u(s.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:N,resetDefaultState:S,dispose:P,releaseStatesOfGeometry:R,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:g,disableUnusedAttributes:x}}function nA(t,e,n){let i;function r(u){i=u}function s(u,f){t.drawArrays(i,u,f),n.update(f,i,1)}function a(u,f,p){p!==0&&(t.drawArraysInstanced(i,u,f,p),n.update(f,i,p))}function o(u,f,p){if(p===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let m=0;m<p;m++)this.render(u[m],f[m]);else{h.multiDrawArraysWEBGL(i,u,0,f,0,p);let m=0;for(let y=0;y<p;y++)m+=f[y];n.update(m,i,1)}}function c(u,f,p,h){if(p===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let y=0;y<u.length;y++)a(u[y],f[y],h[y]);else{m.multiDrawArraysInstancedWEBGL(i,u,0,f,0,h,0,p);let y=0;for(let v=0;v<p;v++)y+=f[v];for(let v=0;v<h.length;v++)n.update(y,i,h[v])}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function iA(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(R){return!(R!==ti&&i.convert(R)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const A=R===Sc&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==lr&&i.convert(R)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Xi&&!A)}function c(R){if(R==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=n.precision!==void 0?n.precision:"highp";const f=c(u);f!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",f,"instead."),u=f);const p=n.logarithmicDepthBuffer===!0,h=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),m=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=t.getParameter(t.MAX_TEXTURE_SIZE),v=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),g=t.getParameter(t.MAX_VERTEX_ATTRIBS),d=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),x=t.getParameter(t.MAX_VARYING_VECTORS),_=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),E=m>0,P=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:u,logarithmicDepthBuffer:p,maxTextures:h,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:v,maxAttributes:g,maxVertexUniforms:d,maxVaryings:x,maxFragmentUniforms:_,vertexTextures:E,maxSamples:P}}function rA(t){const e=this;let n=null,i=0,r=!1,s=!1;const a=new Cr,o=new Qe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(p,h){const m=p.length!==0||h||i!==0||r;return r=h,i=p.length,m},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(p,h){n=f(p,h,0)},this.setState=function(p,h,m){const y=p.clippingPlanes,v=p.clipIntersection,g=p.clipShadows,d=t.get(p);if(!r||y===null||y.length===0||s&&!g)s?f(null):u();else{const x=s?0:i,_=x*4;let E=d.clippingState||null;c.value=E,E=f(y,h,_,m);for(let P=0;P!==_;++P)E[P]=n[P];d.clippingState=E,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function u(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(p,h,m,y){const v=p!==null?p.length:0;let g=null;if(v!==0){if(g=c.value,y!==!0||g===null){const d=m+v*4,x=h.matrixWorldInverse;o.getNormalMatrix(x),(g===null||g.length<d)&&(g=new Float32Array(d));for(let _=0,E=m;_!==v;++_,E+=4)a.copy(p[_]).applyMatrix4(x,o),a.normal.toArray(g,E),g[E+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}function sA(t){let e=new WeakMap;function n(a,o){return o===jd?a.mapping=js:o===Hd&&(a.mapping=Hs),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===jd||o===Hd)if(e.has(a)){const c=e.get(a).texture;return n(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const u=new g1(c.height);return u.fromEquirectangularTexture(t,a),e.set(a,u),a.addEventListener("dispose",r),n(u.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class aA extends ox{constructor(e=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+n,c=r-n;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,a=s+u*this.view.width,o-=f*this.view.offsetY,c=o-f*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const ws=4,ym=[.125,.215,.35,.446,.526,.582],Nr=20,Pu=new aA,Sm=new ut;let Lu=null,Du=0,Iu=0,Uu=!1;const br=(1+Math.sqrt(5))/2,ds=1/br,Mm=[new V(-br,ds,0),new V(br,ds,0),new V(-ds,0,br),new V(ds,0,br),new V(0,br,-ds),new V(0,br,ds),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)];class Em{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){Lu=this._renderer.getRenderTarget(),Du=this._renderer.getActiveCubeFace(),Iu=this._renderer.getActiveMipmapLevel(),Uu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Am(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Lu,Du,Iu),this._renderer.xr.enabled=Uu,e.scissorTest=!1,Jo(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===js||e.mapping===Hs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Lu=this._renderer.getRenderTarget(),Du=this._renderer.getActiveCubeFace(),Iu=this._renderer.getActiveMipmapLevel(),Uu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Vn,minFilter:Vn,generateMipmaps:!1,type:Sc,format:ti,colorSpace:pr,depthBuffer:!1},r=wm(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wm(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=oA(s)),this._blurMaterial=lA(s,e,n)}return r}_compileMaterial(e){const n=new _i(this._lodPlanes[0],e);this._renderer.compile(n,Pu)}_sceneToCubeUV(e,n,i,r){const o=new Cn(90,1,n,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,p=f.autoClear,h=f.toneMapping;f.getClearColor(Sm),f.toneMapping=ir,f.autoClear=!1;const m=new ix({name:"PMREM.Background",side:fn,depthWrite:!1,depthTest:!1}),y=new _i(new uo,m);let v=!1;const g=e.background;g?g.isColor&&(m.color.copy(g),e.background=null,v=!0):(m.color.copy(Sm),v=!0);for(let d=0;d<6;d++){const x=d%3;x===0?(o.up.set(0,c[d],0),o.lookAt(u[d],0,0)):x===1?(o.up.set(0,0,c[d]),o.lookAt(0,u[d],0)):(o.up.set(0,c[d],0),o.lookAt(0,0,u[d]));const _=this._cubeSize;Jo(r,x*_,d>2?_:0,_,_),f.setRenderTarget(r),v&&f.render(y,o),f.render(e,o)}y.geometry.dispose(),y.material.dispose(),f.toneMapping=h,f.autoClear=p,e.background=g}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===js||e.mapping===Hs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Am()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Tm());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new _i(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;Jo(n,0,0,3*c,2*c),i.setRenderTarget(n),i.render(a,Pu)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Mm[(r-s-1)%Mm.length];this._blur(e,s-1,s,a,o)}n.autoClear=i}_blur(e,n,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,n,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,a,o){const c=this._renderer,u=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,p=new _i(this._lodPlanes[r],u),h=u.uniforms,m=this._sizeLods[i]-1,y=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Nr-1),v=s/y,g=isFinite(s)?1+Math.floor(f*v):Nr;g>Nr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Nr}`);const d=[];let x=0;for(let A=0;A<Nr;++A){const N=A/v,S=Math.exp(-N*N/2);d.push(S),A===0?x+=S:A<g&&(x+=2*S)}for(let A=0;A<d.length;A++)d[A]=d[A]/x;h.envMap.value=e.texture,h.samples.value=g,h.weights.value=d,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:_}=this;h.dTheta.value=y,h.mipInt.value=_-i;const E=this._sizeLods[r],P=3*E*(r>_-ws?r-_+ws:0),R=4*(this._cubeSize-E);Jo(n,P,R,3*E,2*E),c.setRenderTarget(n),c.render(p,Pu)}}function oA(t){const e=[],n=[],i=[];let r=t;const s=t-ws+1+ym.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);n.push(o);let c=1/o;a>t-ws?c=ym[a-t+ws-1]:a===0&&(c=0),i.push(c);const u=1/(o-2),f=-u,p=1+u,h=[f,f,p,f,p,p,f,f,p,p,f,p],m=6,y=6,v=3,g=2,d=1,x=new Float32Array(v*y*m),_=new Float32Array(g*y*m),E=new Float32Array(d*y*m);for(let R=0;R<m;R++){const A=R%3*2/3-1,N=R>2?0:-1,S=[A,N,0,A+2/3,N,0,A+2/3,N+1,0,A,N,0,A+2/3,N+1,0,A,N+1,0];x.set(S,v*y*R),_.set(h,g*y*R);const M=[R,R,R,R,R,R];E.set(M,d*y*R)}const P=new Ni;P.setAttribute("position",new Pn(x,v)),P.setAttribute("uv",new Pn(_,g)),P.setAttribute("faceIndex",new Pn(E,d)),e.push(P),r>ws&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function wm(t,e,n){const i=new Gr(t,e,n);return i.texture.mapping=yc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Jo(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function lA(t,e,n){const i=new Float32Array(Nr),r=new V(0,1,0);return new cr({name:"SphericalGaussianBlur",defines:{n:Nr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:eh(),fragmentShader:`

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
		`,blending:nr,depthTest:!1,depthWrite:!1})}function Tm(){return new cr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:eh(),fragmentShader:`

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
		`,blending:nr,depthTest:!1,depthWrite:!1})}function Am(){return new cr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:eh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:nr,depthTest:!1,depthWrite:!1})}function eh(){return`

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
	`}function cA(t){let e=new WeakMap,n=null;function i(o){if(o&&o.isTexture){const c=o.mapping,u=c===jd||c===Hd,f=c===js||c===Hs;if(u||f){let p=e.get(o);const h=p!==void 0?p.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return n===null&&(n=new Em(t)),p=u?n.fromEquirectangular(o,p):n.fromCubemap(o,p),p.texture.pmremVersion=o.pmremVersion,e.set(o,p),p.texture;if(p!==void 0)return p.texture;{const m=o.image;return u&&m&&m.height>0||f&&m&&r(m)?(n===null&&(n=new Em(t)),p=u?n.fromEquirectangular(o):n.fromCubemap(o),p.texture.pmremVersion=o.pmremVersion,e.set(o,p),o.addEventListener("dispose",s),p.texture):null}}}return o}function r(o){let c=0;const u=6;for(let f=0;f<u;f++)o[f]!==void 0&&c++;return c===u}function s(o){const c=o.target;c.removeEventListener("dispose",s);const u=e.get(c);u!==void 0&&(e.delete(c),u.dispose())}function a(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:a}}function uA(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&Z0("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function dA(t,e,n,i){const r={},s=new WeakMap;function a(p){const h=p.target;h.index!==null&&e.remove(h.index);for(const y in h.attributes)e.remove(h.attributes[y]);for(const y in h.morphAttributes){const v=h.morphAttributes[y];for(let g=0,d=v.length;g<d;g++)e.remove(v[g])}h.removeEventListener("dispose",a),delete r[h.id];const m=s.get(h);m&&(e.remove(m),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function o(p,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,n.memory.geometries++),h}function c(p){const h=p.attributes;for(const y in h)e.update(h[y],t.ARRAY_BUFFER);const m=p.morphAttributes;for(const y in m){const v=m[y];for(let g=0,d=v.length;g<d;g++)e.update(v[g],t.ARRAY_BUFFER)}}function u(p){const h=[],m=p.index,y=p.attributes.position;let v=0;if(m!==null){const x=m.array;v=m.version;for(let _=0,E=x.length;_<E;_+=3){const P=x[_+0],R=x[_+1],A=x[_+2];h.push(P,R,R,A,A,P)}}else if(y!==void 0){const x=y.array;v=y.version;for(let _=0,E=x.length/3-1;_<E;_+=3){const P=_+0,R=_+1,A=_+2;h.push(P,R,R,A,A,P)}}else return;const g=new(K0(h)?sx:rx)(h,1);g.version=v;const d=s.get(p);d&&e.remove(d),s.set(p,g)}function f(p){const h=s.get(p);if(h){const m=p.index;m!==null&&h.version<m.version&&u(p)}else u(p);return s.get(p)}return{get:o,update:c,getWireframeAttribute:f}}function fA(t,e,n){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function c(h,m){t.drawElements(i,m,s,h*a),n.update(m,i,1)}function u(h,m,y){y!==0&&(t.drawElementsInstanced(i,m,s,h*a,y),n.update(m,i,y))}function f(h,m,y){if(y===0)return;const v=e.get("WEBGL_multi_draw");if(v===null)for(let g=0;g<y;g++)this.render(h[g]/a,m[g]);else{v.multiDrawElementsWEBGL(i,m,0,s,h,0,y);let g=0;for(let d=0;d<y;d++)g+=m[d];n.update(g,i,1)}}function p(h,m,y,v){if(y===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let d=0;d<h.length;d++)u(h[d]/a,m[d],v[d]);else{g.multiDrawElementsInstancedWEBGL(i,m,0,s,h,0,v,0,y);let d=0;for(let x=0;x<y;x++)d+=m[x];for(let x=0;x<v.length;x++)n.update(d,i,v[x])}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=u,this.renderMultiDraw=f,this.renderMultiDrawInstances=p}function hA(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function pA(t,e,n){const i=new WeakMap,r=new Gt;function s(a,o,c){const u=a.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=f!==void 0?f.length:0;let h=i.get(o);if(h===void 0||h.count!==p){let M=function(){N.dispose(),i.delete(o),o.removeEventListener("dispose",M)};var m=M;h!==void 0&&h.texture.dispose();const y=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],_=o.morphAttributes.color||[];let E=0;y===!0&&(E=1),v===!0&&(E=2),g===!0&&(E=3);let P=o.attributes.position.count*E,R=1;P>e.maxTextureSize&&(R=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const A=new Float32Array(P*R*4*p),N=new J0(A,P,R,p);N.type=Xi,N.needsUpdate=!0;const S=E*4;for(let I=0;I<p;I++){const G=d[I],j=x[I],Q=_[I],X=P*R*4*I;for(let Y=0;Y<G.count;Y++){const J=Y*S;y===!0&&(r.fromBufferAttribute(G,Y),A[X+J+0]=r.x,A[X+J+1]=r.y,A[X+J+2]=r.z,A[X+J+3]=0),v===!0&&(r.fromBufferAttribute(j,Y),A[X+J+4]=r.x,A[X+J+5]=r.y,A[X+J+6]=r.z,A[X+J+7]=0),g===!0&&(r.fromBufferAttribute(Q,Y),A[X+J+8]=r.x,A[X+J+9]=r.y,A[X+J+10]=r.z,A[X+J+11]=Q.itemSize===4?r.w:1)}}h={count:p,texture:N,size:new lt(P,R)},i.set(o,h),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(t,"morphTexture",a.morphTexture,n);else{let y=0;for(let g=0;g<u.length;g++)y+=u[g];const v=o.morphTargetsRelative?1:1-y;c.getUniforms().setValue(t,"morphTargetBaseInfluence",v),c.getUniforms().setValue(t,"morphTargetInfluences",u)}c.getUniforms().setValue(t,"morphTargetsTexture",h.texture,n),c.getUniforms().setValue(t,"morphTargetsTextureSize",h.size)}return{update:s}}function mA(t,e,n,i){let r=new WeakMap;function s(c){const u=i.render.frame,f=c.geometry,p=e.get(c,f);if(r.get(p)!==u&&(e.update(p),r.set(p,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==u&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const h=c.skeleton;r.get(h)!==u&&(h.update(),r.set(h,u))}return p}function a(){r=new WeakMap}function o(c){const u=c.target;u.removeEventListener("dispose",o),n.remove(u.instanceMatrix),u.instanceColor!==null&&n.remove(u.instanceColor)}return{update:s,dispose:a}}class dx extends hn{constructor(e,n,i,r,s,a,o,c,u,f=Ls){if(f!==Ls&&f!==Ws)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&f===Ls&&(i=Vs),i===void 0&&f===Ws&&(i=Gs),super(null,r,s,a,o,c,f,i,u),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=o!==void 0?o:Rn,this.minFilter=c!==void 0?c:Rn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const fx=new hn,hx=new dx(1,1);hx.compareFunction=Y0;const px=new J0,mx=new e1,gx=new lx,Cm=[],bm=[],Rm=new Float32Array(16),Nm=new Float32Array(9),Pm=new Float32Array(4);function Js(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Cm[r];if(s===void 0&&(s=new Float32Array(r),Cm[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(s,o)}return s}function Ft(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function kt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Tc(t,e){let n=bm[e];n===void 0&&(n=new Int32Array(e),bm[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function gA(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function vA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ft(n,e))return;t.uniform2fv(this.addr,e),kt(n,e)}}function xA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Ft(n,e))return;t.uniform3fv(this.addr,e),kt(n,e)}}function _A(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ft(n,e))return;t.uniform4fv(this.addr,e),kt(n,e)}}function yA(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ft(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),kt(n,e)}else{if(Ft(n,i))return;Pm.set(i),t.uniformMatrix2fv(this.addr,!1,Pm),kt(n,i)}}function SA(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ft(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),kt(n,e)}else{if(Ft(n,i))return;Nm.set(i),t.uniformMatrix3fv(this.addr,!1,Nm),kt(n,i)}}function MA(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ft(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),kt(n,e)}else{if(Ft(n,i))return;Rm.set(i),t.uniformMatrix4fv(this.addr,!1,Rm),kt(n,i)}}function EA(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function wA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ft(n,e))return;t.uniform2iv(this.addr,e),kt(n,e)}}function TA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ft(n,e))return;t.uniform3iv(this.addr,e),kt(n,e)}}function AA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ft(n,e))return;t.uniform4iv(this.addr,e),kt(n,e)}}function CA(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function bA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ft(n,e))return;t.uniform2uiv(this.addr,e),kt(n,e)}}function RA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ft(n,e))return;t.uniform3uiv(this.addr,e),kt(n,e)}}function NA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ft(n,e))return;t.uniform4uiv(this.addr,e),kt(n,e)}}function PA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);const s=this.type===t.SAMPLER_2D_SHADOW?hx:fx;n.setTexture2D(e||s,r)}function LA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||mx,r)}function DA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||gx,r)}function IA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||px,r)}function UA(t){switch(t){case 5126:return gA;case 35664:return vA;case 35665:return xA;case 35666:return _A;case 35674:return yA;case 35675:return SA;case 35676:return MA;case 5124:case 35670:return EA;case 35667:case 35671:return wA;case 35668:case 35672:return TA;case 35669:case 35673:return AA;case 5125:return CA;case 36294:return bA;case 36295:return RA;case 36296:return NA;case 35678:case 36198:case 36298:case 36306:case 35682:return PA;case 35679:case 36299:case 36307:return LA;case 35680:case 36300:case 36308:case 36293:return DA;case 36289:case 36303:case 36311:case 36292:return IA}}function FA(t,e){t.uniform1fv(this.addr,e)}function kA(t,e){const n=Js(e,this.size,2);t.uniform2fv(this.addr,n)}function OA(t,e){const n=Js(e,this.size,3);t.uniform3fv(this.addr,n)}function BA(t,e){const n=Js(e,this.size,4);t.uniform4fv(this.addr,n)}function zA(t,e){const n=Js(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function jA(t,e){const n=Js(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function HA(t,e){const n=Js(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function VA(t,e){t.uniform1iv(this.addr,e)}function GA(t,e){t.uniform2iv(this.addr,e)}function WA(t,e){t.uniform3iv(this.addr,e)}function XA(t,e){t.uniform4iv(this.addr,e)}function $A(t,e){t.uniform1uiv(this.addr,e)}function qA(t,e){t.uniform2uiv(this.addr,e)}function YA(t,e){t.uniform3uiv(this.addr,e)}function KA(t,e){t.uniform4uiv(this.addr,e)}function ZA(t,e,n){const i=this.cache,r=e.length,s=Tc(n,r);Ft(i,s)||(t.uniform1iv(this.addr,s),kt(i,s));for(let a=0;a!==r;++a)n.setTexture2D(e[a]||fx,s[a])}function QA(t,e,n){const i=this.cache,r=e.length,s=Tc(n,r);Ft(i,s)||(t.uniform1iv(this.addr,s),kt(i,s));for(let a=0;a!==r;++a)n.setTexture3D(e[a]||mx,s[a])}function JA(t,e,n){const i=this.cache,r=e.length,s=Tc(n,r);Ft(i,s)||(t.uniform1iv(this.addr,s),kt(i,s));for(let a=0;a!==r;++a)n.setTextureCube(e[a]||gx,s[a])}function eC(t,e,n){const i=this.cache,r=e.length,s=Tc(n,r);Ft(i,s)||(t.uniform1iv(this.addr,s),kt(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(e[a]||px,s[a])}function tC(t){switch(t){case 5126:return FA;case 35664:return kA;case 35665:return OA;case 35666:return BA;case 35674:return zA;case 35675:return jA;case 35676:return HA;case 5124:case 35670:return VA;case 35667:case 35671:return GA;case 35668:case 35672:return WA;case 35669:case 35673:return XA;case 5125:return $A;case 36294:return qA;case 36295:return YA;case 36296:return KA;case 35678:case 36198:case 36298:case 36306:case 35682:return ZA;case 35679:case 36299:case 36307:return QA;case 35680:case 36300:case 36308:case 36293:return JA;case 36289:case 36303:case 36311:case 36292:return eC}}class nC{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=UA(n.type)}}class iC{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=tC(n.type)}}class rC{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,n[o.id],i)}}}const Fu=/(\w+)(\])?(\[|\.)?/g;function Lm(t,e){t.seq.push(e),t.map[e.id]=e}function sC(t,e,n){const i=t.name,r=i.length;for(Fu.lastIndex=0;;){const s=Fu.exec(i),a=Fu.lastIndex;let o=s[1];const c=s[2]==="]",u=s[3];if(c&&(o=o|0),u===void 0||u==="["&&a+2===r){Lm(n,u===void 0?new nC(o,t,e):new iC(o,t,e));break}else{let p=n.map[o];p===void 0&&(p=new rC(o),Lm(n,p)),n=p}}}class xl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),a=e.getUniformLocation(n,s.name);sC(s,a,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in n&&i.push(a)}return i}}function Dm(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const aC=37297;let oC=0;function lC(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}function cC(t){const e=ct.getPrimaries(ct.workingColorSpace),n=ct.getPrimaries(t);let i;switch(e===n?i="":e===Yl&&n===ql?i="LinearDisplayP3ToLinearSRGB":e===ql&&n===Yl&&(i="LinearSRGBToLinearDisplayP3"),t){case pr:case Mc:return[i,"LinearTransferOETF"];case Zn:case Jf:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function Im(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+lC(t.getShaderSource(e),a)}else return r}function uC(t,e){const n=cC(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function dC(t,e){let n;switch(e){case vE:n="Linear";break;case xE:n="Reinhard";break;case _E:n="OptimizedCineon";break;case yE:n="ACESFilmic";break;case ME:n="AgX";break;case EE:n="Neutral";break;case SE:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function fC(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ma).join(`
`)}function hC(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function pC(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),a=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function Ma(t){return t!==""}function Um(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Fm(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const mC=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xd(t){return t.replace(mC,vC)}const gC=new Map;function vC(t,e){let n=Ze[e];if(n===void 0){const i=gC.get(e);if(i!==void 0)n=Ze[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Xd(n)}const xC=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function km(t){return t.replace(xC,_C)}function _C(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Om(t){let e=`precision ${t.precision} float;
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
#define LOW_PRECISION`),e}function yC(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===z0?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===VM?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===di&&(e="SHADOWMAP_TYPE_VSM"),e}function SC(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case js:case Hs:e="ENVMAP_TYPE_CUBE";break;case yc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function MC(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case Hs:e="ENVMAP_MODE_REFRACTION";break}return e}function EC(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case j0:e="ENVMAP_BLENDING_MULTIPLY";break;case mE:e="ENVMAP_BLENDING_MIX";break;case gE:e="ENVMAP_BLENDING_ADD";break}return e}function wC(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function TC(t,e,n,i){const r=t.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const c=yC(n),u=SC(n),f=MC(n),p=EC(n),h=wC(n),m=fC(n),y=hC(s),v=r.createProgram();let g,d,x=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y].filter(Ma).join(`
`),g.length>0&&(g+=`
`),d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y].filter(Ma).join(`
`),d.length>0&&(d+=`
`)):(g=[Om(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ma).join(`
`),d=[Om(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.envMap?"#define "+f:"",n.envMap?"#define "+p:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ir?"#define TONE_MAPPING":"",n.toneMapping!==ir?Ze.tonemapping_pars_fragment:"",n.toneMapping!==ir?dC("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,uC("linearToOutputTexel",n.outputColorSpace),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ma).join(`
`)),a=Xd(a),a=Um(a,n),a=Fm(a,n),o=Xd(o),o=Um(o,n),o=Fm(o,n),a=km(a),o=km(o),n.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,d=["#define varying in",n.glslVersion===em?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===em?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const _=x+g+a,E=x+d+o,P=Dm(r,r.VERTEX_SHADER,_),R=Dm(r,r.FRAGMENT_SHADER,E);r.attachShader(v,P),r.attachShader(v,R),n.index0AttributeName!==void 0?r.bindAttribLocation(v,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function A(I){if(t.debug.checkShaderErrors){const G=r.getProgramInfoLog(v).trim(),j=r.getShaderInfoLog(P).trim(),Q=r.getShaderInfoLog(R).trim();let X=!0,Y=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(X=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,v,P,R);else{const J=Im(r,P,"vertex"),O=Im(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+G+`
`+J+`
`+O)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(j===""||Q==="")&&(Y=!1);Y&&(I.diagnostics={runnable:X,programLog:G,vertexShader:{log:j,prefix:g},fragmentShader:{log:Q,prefix:d}})}r.deleteShader(P),r.deleteShader(R),N=new xl(r,v),S=pC(r,v)}let N;this.getUniforms=function(){return N===void 0&&A(this),N};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let M=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(v,aC)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=oC++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=P,this.fragmentShader=R,this}let AC=0;class CC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new bC(e),n.set(e,i)),i}}class bC{constructor(e){this.id=AC++,this.code=e,this.usedTimes=0}}function RC(t,e,n,i,r,s,a){const o=new tx,c=new CC,u=new Set,f=[],p=r.logarithmicDepthBuffer,h=r.vertexTextures;let m=r.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return u.add(S),S===0?"uv":`uv${S}`}function g(S,M,I,G,j){const Q=G.fog,X=j.geometry,Y=S.isMeshStandardMaterial?G.environment:null,J=(S.isMeshStandardMaterial?n:e).get(S.envMap||Y),O=J&&J.mapping===yc?J.image.height:null,ee=y[S.type];S.precision!==null&&(m=r.getMaxPrecision(S.precision),m!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",m,"instead."));const ne=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,le=ne!==void 0?ne.length:0;let Re=0;X.morphAttributes.position!==void 0&&(Re=1),X.morphAttributes.normal!==void 0&&(Re=2),X.morphAttributes.color!==void 0&&(Re=3);let Je,$,re,xe;if(ee){const nt=Qn[ee];Je=nt.vertexShader,$=nt.fragmentShader}else Je=S.vertexShader,$=S.fragmentShader,c.update(S),re=c.getVertexShaderID(S),xe=c.getFragmentShaderID(S);const me=t.getRenderTarget(),Ee=j.isInstancedMesh===!0,Ue=j.isBatchedMesh===!0,je=!!S.map,k=!!S.matcap,Xe=!!J,Ye=!!S.aoMap,ot=!!S.lightMap,ke=!!S.bumpMap,Ke=!!S.normalMap,$e=!!S.displacementMap,He=!!S.emissiveMap,vt=!!S.metalnessMap,D=!!S.roughnessMap,w=S.anisotropy>0,H=S.clearcoat>0,ie=S.dispersion>0,ae=S.iridescence>0,se=S.sheen>0,Ne=S.transmission>0,ge=w&&!!S.anisotropyMap,_e=H&&!!S.clearcoatMap,Be=H&&!!S.clearcoatNormalMap,ue=H&&!!S.clearcoatRoughnessMap,Ce=ae&&!!S.iridescenceMap,Ge=ae&&!!S.iridescenceThicknessMap,be=se&&!!S.sheenColorMap,Se=se&&!!S.sheenRoughnessMap,Ve=!!S.specularMap,We=!!S.specularColorMap,at=!!S.specularIntensityMap,F=Ne&&!!S.transmissionMap,Me=Ne&&!!S.thicknessMap,q=!!S.gradientMap,K=!!S.alphaMap,pe=S.alphaTest>0,ze=!!S.alphaHash,qe=!!S.extensions;let xt=ir;S.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(xt=t.toneMapping);const pt={shaderID:ee,shaderType:S.type,shaderName:S.name,vertexShader:Je,fragmentShader:$,defines:S.defines,customVertexShaderID:re,customFragmentShaderID:xe,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:m,batching:Ue,batchingColor:Ue&&j._colorsTexture!==null,instancing:Ee,instancingColor:Ee&&j.instanceColor!==null,instancingMorph:Ee&&j.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:me===null?t.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:pr,alphaToCoverage:!!S.alphaToCoverage,map:je,matcap:k,envMap:Xe,envMapMode:Xe&&J.mapping,envMapCubeUVHeight:O,aoMap:Ye,lightMap:ot,bumpMap:ke,normalMap:Ke,displacementMap:h&&$e,emissiveMap:He,normalMapObjectSpace:Ke&&S.normalMapType===OE,normalMapTangentSpace:Ke&&S.normalMapType===kE,metalnessMap:vt,roughnessMap:D,anisotropy:w,anisotropyMap:ge,clearcoat:H,clearcoatMap:_e,clearcoatNormalMap:Be,clearcoatRoughnessMap:ue,dispersion:ie,iridescence:ae,iridescenceMap:Ce,iridescenceThicknessMap:Ge,sheen:se,sheenColorMap:be,sheenRoughnessMap:Se,specularMap:Ve,specularColorMap:We,specularIntensityMap:at,transmission:Ne,transmissionMap:F,thicknessMap:Me,gradientMap:q,opaque:S.transparent===!1&&S.blending===Ps&&S.alphaToCoverage===!1,alphaMap:K,alphaTest:pe,alphaHash:ze,combine:S.combine,mapUv:je&&v(S.map.channel),aoMapUv:Ye&&v(S.aoMap.channel),lightMapUv:ot&&v(S.lightMap.channel),bumpMapUv:ke&&v(S.bumpMap.channel),normalMapUv:Ke&&v(S.normalMap.channel),displacementMapUv:$e&&v(S.displacementMap.channel),emissiveMapUv:He&&v(S.emissiveMap.channel),metalnessMapUv:vt&&v(S.metalnessMap.channel),roughnessMapUv:D&&v(S.roughnessMap.channel),anisotropyMapUv:ge&&v(S.anisotropyMap.channel),clearcoatMapUv:_e&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:Be&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ue&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ge&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:be&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:Se&&v(S.sheenRoughnessMap.channel),specularMapUv:Ve&&v(S.specularMap.channel),specularColorMapUv:We&&v(S.specularColorMap.channel),specularIntensityMapUv:at&&v(S.specularIntensityMap.channel),transmissionMapUv:F&&v(S.transmissionMap.channel),thicknessMapUv:Me&&v(S.thicknessMap.channel),alphaMapUv:K&&v(S.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(Ke||w),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:j.isPoints===!0&&!!X.attributes.uv&&(je||K),fog:!!Q,useFog:S.fog===!0,fogExp2:!!Q&&Q.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:p,skinning:j.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:Re,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:t.shadowMap.enabled&&I.length>0,shadowMapType:t.shadowMap.type,toneMapping:xt,decodeVideoTexture:je&&S.map.isVideoTexture===!0&&ct.getTransfer(S.map.colorSpace)===yt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===pi,flipSided:S.side===fn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:qe&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:qe&&S.extensions.multiDraw===!0&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return pt.vertexUv1s=u.has(1),pt.vertexUv2s=u.has(2),pt.vertexUv3s=u.has(3),u.clear(),pt}function d(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const I in S.defines)M.push(I),M.push(S.defines[I]);return S.isRawShaderMaterial===!1&&(x(M,S),_(M,S),M.push(t.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function x(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function _(S,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.skinning&&o.enable(4),M.morphTargets&&o.enable(5),M.morphNormals&&o.enable(6),M.morphColors&&o.enable(7),M.premultipliedAlpha&&o.enable(8),M.shadowMapEnabled&&o.enable(9),M.doubleSided&&o.enable(10),M.flipSided&&o.enable(11),M.useDepthPacking&&o.enable(12),M.dithering&&o.enable(13),M.transmission&&o.enable(14),M.sheen&&o.enable(15),M.opaque&&o.enable(16),M.pointsUvs&&o.enable(17),M.decodeVideoTexture&&o.enable(18),M.alphaToCoverage&&o.enable(19),S.push(o.mask)}function E(S){const M=y[S.type];let I;if(M){const G=Qn[M];I=f1.clone(G.uniforms)}else I=S.uniforms;return I}function P(S,M){let I;for(let G=0,j=f.length;G<j;G++){const Q=f[G];if(Q.cacheKey===M){I=Q,++I.usedTimes;break}}return I===void 0&&(I=new TC(t,M,S,s),f.push(I)),I}function R(S){if(--S.usedTimes===0){const M=f.indexOf(S);f[M]=f[f.length-1],f.pop(),S.destroy()}}function A(S){c.remove(S)}function N(){c.dispose()}return{getParameters:g,getProgramCacheKey:d,getUniforms:E,acquireProgram:P,releaseProgram:R,releaseShaderCache:A,programs:f,dispose:N}}function NC(){let t=new WeakMap;function e(s){let a=t.get(s);return a===void 0&&(a={},t.set(s,a)),a}function n(s){t.delete(s)}function i(s,a,o){t.get(s)[a]=o}function r(){t=new WeakMap}return{get:e,remove:n,update:i,dispose:r}}function PC(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function Bm(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function zm(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function a(p,h,m,y,v,g){let d=t[e];return d===void 0?(d={id:p.id,object:p,geometry:h,material:m,groupOrder:y,renderOrder:p.renderOrder,z:v,group:g},t[e]=d):(d.id=p.id,d.object=p,d.geometry=h,d.material=m,d.groupOrder=y,d.renderOrder=p.renderOrder,d.z=v,d.group=g),e++,d}function o(p,h,m,y,v,g){const d=a(p,h,m,y,v,g);m.transmission>0?i.push(d):m.transparent===!0?r.push(d):n.push(d)}function c(p,h,m,y,v,g){const d=a(p,h,m,y,v,g);m.transmission>0?i.unshift(d):m.transparent===!0?r.unshift(d):n.unshift(d)}function u(p,h){n.length>1&&n.sort(p||PC),i.length>1&&i.sort(h||Bm),r.length>1&&r.sort(h||Bm)}function f(){for(let p=e,h=t.length;p<h;p++){const m=t[p];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:o,unshift:c,finish:f,sort:u}}function LC(){let t=new WeakMap;function e(i,r){const s=t.get(i);let a;return s===void 0?(a=new zm,t.set(i,[a])):r>=s.length?(a=new zm,s.push(a)):a=s[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function DC(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new V,color:new ut};break;case"SpotLight":n={position:new V,direction:new V,color:new ut,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new V,color:new ut,distance:0,decay:0};break;case"HemisphereLight":n={direction:new V,skyColor:new ut,groundColor:new ut};break;case"RectAreaLight":n={color:new ut,position:new V,halfWidth:new V,halfHeight:new V};break}return t[e.id]=n,n}}}function IC(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let UC=0;function FC(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function kC(t){const e=new DC,n=IC(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new V);const r=new V,s=new Lt,a=new Lt;function o(u){let f=0,p=0,h=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let m=0,y=0,v=0,g=0,d=0,x=0,_=0,E=0,P=0,R=0,A=0;u.sort(FC);for(let S=0,M=u.length;S<M;S++){const I=u[S],G=I.color,j=I.intensity,Q=I.distance,X=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)f+=G.r*j,p+=G.g*j,h+=G.b*j;else if(I.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(I.sh.coefficients[Y],j);A++}else if(I.isDirectionalLight){const Y=e.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const J=I.shadow,O=n.get(I);O.shadowBias=J.bias,O.shadowNormalBias=J.normalBias,O.shadowRadius=J.radius,O.shadowMapSize=J.mapSize,i.directionalShadow[m]=O,i.directionalShadowMap[m]=X,i.directionalShadowMatrix[m]=I.shadow.matrix,x++}i.directional[m]=Y,m++}else if(I.isSpotLight){const Y=e.get(I);Y.position.setFromMatrixPosition(I.matrixWorld),Y.color.copy(G).multiplyScalar(j),Y.distance=Q,Y.coneCos=Math.cos(I.angle),Y.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),Y.decay=I.decay,i.spot[v]=Y;const J=I.shadow;if(I.map&&(i.spotLightMap[P]=I.map,P++,J.updateMatrices(I),I.castShadow&&R++),i.spotLightMatrix[v]=J.matrix,I.castShadow){const O=n.get(I);O.shadowBias=J.bias,O.shadowNormalBias=J.normalBias,O.shadowRadius=J.radius,O.shadowMapSize=J.mapSize,i.spotShadow[v]=O,i.spotShadowMap[v]=X,E++}v++}else if(I.isRectAreaLight){const Y=e.get(I);Y.color.copy(G).multiplyScalar(j),Y.halfWidth.set(I.width*.5,0,0),Y.halfHeight.set(0,I.height*.5,0),i.rectArea[g]=Y,g++}else if(I.isPointLight){const Y=e.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),Y.distance=I.distance,Y.decay=I.decay,I.castShadow){const J=I.shadow,O=n.get(I);O.shadowBias=J.bias,O.shadowNormalBias=J.normalBias,O.shadowRadius=J.radius,O.shadowMapSize=J.mapSize,O.shadowCameraNear=J.camera.near,O.shadowCameraFar=J.camera.far,i.pointShadow[y]=O,i.pointShadowMap[y]=X,i.pointShadowMatrix[y]=I.shadow.matrix,_++}i.point[y]=Y,y++}else if(I.isHemisphereLight){const Y=e.get(I);Y.skyColor.copy(I.color).multiplyScalar(j),Y.groundColor.copy(I.groundColor).multiplyScalar(j),i.hemi[d]=Y,d++}}g>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=we.LTC_FLOAT_1,i.rectAreaLTC2=we.LTC_FLOAT_2):(i.rectAreaLTC1=we.LTC_HALF_1,i.rectAreaLTC2=we.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=p,i.ambient[2]=h;const N=i.hash;(N.directionalLength!==m||N.pointLength!==y||N.spotLength!==v||N.rectAreaLength!==g||N.hemiLength!==d||N.numDirectionalShadows!==x||N.numPointShadows!==_||N.numSpotShadows!==E||N.numSpotMaps!==P||N.numLightProbes!==A)&&(i.directional.length=m,i.spot.length=v,i.rectArea.length=g,i.point.length=y,i.hemi.length=d,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=E+P-R,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=A,N.directionalLength=m,N.pointLength=y,N.spotLength=v,N.rectAreaLength=g,N.hemiLength=d,N.numDirectionalShadows=x,N.numPointShadows=_,N.numSpotShadows=E,N.numSpotMaps=P,N.numLightProbes=A,i.version=UC++)}function c(u,f){let p=0,h=0,m=0,y=0,v=0;const g=f.matrixWorldInverse;for(let d=0,x=u.length;d<x;d++){const _=u[d];if(_.isDirectionalLight){const E=i.directional[p];E.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(g),p++}else if(_.isSpotLight){const E=i.spot[m];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(g),E.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(g),m++}else if(_.isRectAreaLight){const E=i.rectArea[y];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(g),a.identity(),s.copy(_.matrixWorld),s.premultiply(g),a.extractRotation(s),E.halfWidth.set(_.width*.5,0,0),E.halfHeight.set(0,_.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),y++}else if(_.isPointLight){const E=i.point[h];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(g),h++}else if(_.isHemisphereLight){const E=i.hemi[v];E.direction.setFromMatrixPosition(_.matrixWorld),E.direction.transformDirection(g),v++}}}return{setup:o,setupView:c,state:i}}function jm(t){const e=new kC(t),n=[],i=[];function r(f){u.camera=f,n.length=0,i.length=0}function s(f){n.push(f)}function a(f){i.push(f)}function o(){e.setup(n)}function c(f){e.setupView(n,f)}const u={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:u,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function OC(t){let e=new WeakMap;function n(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new jm(t),e.set(r,[o])):s>=a.length?(o=new jm(t),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}class BC extends co{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=UE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class zC extends co{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const jC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,HC=`uniform sampler2D shadow_pass;
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
}`;function VC(t,e,n){let i=new cx;const r=new lt,s=new lt,a=new Gt,o=new BC({depthPacking:FE}),c=new zC,u={},f=n.maxTextureSize,p={[or]:fn,[fn]:or,[pi]:pi},h=new cr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new lt},radius:{value:4}},vertexShader:jC,fragmentShader:HC}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const y=new Ni;y.setAttribute("position",new Pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new _i(y,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=z0;let d=this.type;this.render=function(R,A,N){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||R.length===0)return;const S=t.getRenderTarget(),M=t.getActiveCubeFace(),I=t.getActiveMipmapLevel(),G=t.state;G.setBlending(nr),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const j=d!==di&&this.type===di,Q=d===di&&this.type!==di;for(let X=0,Y=R.length;X<Y;X++){const J=R[X],O=J.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;r.copy(O.mapSize);const ee=O.getFrameExtents();if(r.multiply(ee),s.copy(O.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/ee.x),r.x=s.x*ee.x,O.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/ee.y),r.y=s.y*ee.y,O.mapSize.y=s.y)),O.map===null||j===!0||Q===!0){const le=this.type!==di?{minFilter:Rn,magFilter:Rn}:{};O.map!==null&&O.map.dispose(),O.map=new Gr(r.x,r.y,le),O.map.texture.name=J.name+".shadowMap",O.camera.updateProjectionMatrix()}t.setRenderTarget(O.map),t.clear();const ne=O.getViewportCount();for(let le=0;le<ne;le++){const Re=O.getViewport(le);a.set(s.x*Re.x,s.y*Re.y,s.x*Re.z,s.y*Re.w),G.viewport(a),O.updateMatrices(J,le),i=O.getFrustum(),E(A,N,O.camera,J,this.type)}O.isPointLightShadow!==!0&&this.type===di&&x(O,N),O.needsUpdate=!1}d=this.type,g.needsUpdate=!1,t.setRenderTarget(S,M,I)};function x(R,A){const N=e.update(v);h.defines.VSM_SAMPLES!==R.blurSamples&&(h.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Gr(r.x,r.y)),h.uniforms.shadow_pass.value=R.map.texture,h.uniforms.resolution.value=R.mapSize,h.uniforms.radius.value=R.radius,t.setRenderTarget(R.mapPass),t.clear(),t.renderBufferDirect(A,null,N,h,v,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value=R.mapSize,m.uniforms.radius.value=R.radius,t.setRenderTarget(R.map),t.clear(),t.renderBufferDirect(A,null,N,m,v,null)}function _(R,A,N,S){let M=null;const I=N.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(I!==void 0)M=I;else if(M=N.isPointLight===!0?c:o,t.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const G=M.uuid,j=A.uuid;let Q=u[G];Q===void 0&&(Q={},u[G]=Q);let X=Q[j];X===void 0&&(X=M.clone(),Q[j]=X,A.addEventListener("dispose",P)),M=X}if(M.visible=A.visible,M.wireframe=A.wireframe,S===di?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:p[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,N.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const G=t.properties.get(M);G.light=N}return M}function E(R,A,N,S,M){if(R.visible===!1)return;if(R.layers.test(A.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&M===di)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,R.matrixWorld);const j=e.update(R),Q=R.material;if(Array.isArray(Q)){const X=j.groups;for(let Y=0,J=X.length;Y<J;Y++){const O=X[Y],ee=Q[O.materialIndex];if(ee&&ee.visible){const ne=_(R,ee,S,M);R.onBeforeShadow(t,R,A,N,j,ne,O),t.renderBufferDirect(N,null,j,ne,R,O),R.onAfterShadow(t,R,A,N,j,ne,O)}}}else if(Q.visible){const X=_(R,Q,S,M);R.onBeforeShadow(t,R,A,N,j,X,null),t.renderBufferDirect(N,null,j,X,R,null),R.onAfterShadow(t,R,A,N,j,X,null)}}const G=R.children;for(let j=0,Q=G.length;j<Q;j++)E(G[j],A,N,S,M)}function P(R){R.target.removeEventListener("dispose",P);for(const N in u){const S=u[N],M=R.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}function GC(t){function e(){let F=!1;const Me=new Gt;let q=null;const K=new Gt(0,0,0,0);return{setMask:function(pe){q!==pe&&!F&&(t.colorMask(pe,pe,pe,pe),q=pe)},setLocked:function(pe){F=pe},setClear:function(pe,ze,qe,xt,pt){pt===!0&&(pe*=xt,ze*=xt,qe*=xt),Me.set(pe,ze,qe,xt),K.equals(Me)===!1&&(t.clearColor(pe,ze,qe,xt),K.copy(Me))},reset:function(){F=!1,q=null,K.set(-1,0,0,0)}}}function n(){let F=!1,Me=null,q=null,K=null;return{setTest:function(pe){pe?xe(t.DEPTH_TEST):me(t.DEPTH_TEST)},setMask:function(pe){Me!==pe&&!F&&(t.depthMask(pe),Me=pe)},setFunc:function(pe){if(q!==pe){switch(pe){case lE:t.depthFunc(t.NEVER);break;case cE:t.depthFunc(t.ALWAYS);break;case uE:t.depthFunc(t.LESS);break;case Wl:t.depthFunc(t.LEQUAL);break;case dE:t.depthFunc(t.EQUAL);break;case fE:t.depthFunc(t.GEQUAL);break;case hE:t.depthFunc(t.GREATER);break;case pE:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}q=pe}},setLocked:function(pe){F=pe},setClear:function(pe){K!==pe&&(t.clearDepth(pe),K=pe)},reset:function(){F=!1,Me=null,q=null,K=null}}}function i(){let F=!1,Me=null,q=null,K=null,pe=null,ze=null,qe=null,xt=null,pt=null;return{setTest:function(nt){F||(nt?xe(t.STENCIL_TEST):me(t.STENCIL_TEST))},setMask:function(nt){Me!==nt&&!F&&(t.stencilMask(nt),Me=nt)},setFunc:function(nt,W,oe){(q!==nt||K!==W||pe!==oe)&&(t.stencilFunc(nt,W,oe),q=nt,K=W,pe=oe)},setOp:function(nt,W,oe){(ze!==nt||qe!==W||xt!==oe)&&(t.stencilOp(nt,W,oe),ze=nt,qe=W,xt=oe)},setLocked:function(nt){F=nt},setClear:function(nt){pt!==nt&&(t.clearStencil(nt),pt=nt)},reset:function(){F=!1,Me=null,q=null,K=null,pe=null,ze=null,qe=null,xt=null,pt=null}}}const r=new e,s=new n,a=new i,o=new WeakMap,c=new WeakMap;let u={},f={},p=new WeakMap,h=[],m=null,y=!1,v=null,g=null,d=null,x=null,_=null,E=null,P=null,R=new ut(0,0,0),A=0,N=!1,S=null,M=null,I=null,G=null,j=null;const Q=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,Y=0;const J=t.getParameter(t.VERSION);J.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(J)[1]),X=Y>=1):J.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),X=Y>=2);let O=null,ee={};const ne=t.getParameter(t.SCISSOR_BOX),le=t.getParameter(t.VIEWPORT),Re=new Gt().fromArray(ne),Je=new Gt().fromArray(le);function $(F,Me,q,K){const pe=new Uint8Array(4),ze=t.createTexture();t.bindTexture(F,ze),t.texParameteri(F,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(F,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let qe=0;qe<q;qe++)F===t.TEXTURE_3D||F===t.TEXTURE_2D_ARRAY?t.texImage3D(Me,0,t.RGBA,1,1,K,0,t.RGBA,t.UNSIGNED_BYTE,pe):t.texImage2D(Me+qe,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,pe);return ze}const re={};re[t.TEXTURE_2D]=$(t.TEXTURE_2D,t.TEXTURE_2D,1),re[t.TEXTURE_CUBE_MAP]=$(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[t.TEXTURE_2D_ARRAY]=$(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),re[t.TEXTURE_3D]=$(t.TEXTURE_3D,t.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),a.setClear(0),xe(t.DEPTH_TEST),s.setFunc(Wl),ke(!1),Ke(Ep),xe(t.CULL_FACE),Ye(nr);function xe(F){u[F]!==!0&&(t.enable(F),u[F]=!0)}function me(F){u[F]!==!1&&(t.disable(F),u[F]=!1)}function Ee(F,Me){return f[F]!==Me?(t.bindFramebuffer(F,Me),f[F]=Me,F===t.DRAW_FRAMEBUFFER&&(f[t.FRAMEBUFFER]=Me),F===t.FRAMEBUFFER&&(f[t.DRAW_FRAMEBUFFER]=Me),!0):!1}function Ue(F,Me){let q=h,K=!1;if(F){q=p.get(Me),q===void 0&&(q=[],p.set(Me,q));const pe=F.textures;if(q.length!==pe.length||q[0]!==t.COLOR_ATTACHMENT0){for(let ze=0,qe=pe.length;ze<qe;ze++)q[ze]=t.COLOR_ATTACHMENT0+ze;q.length=pe.length,K=!0}}else q[0]!==t.BACK&&(q[0]=t.BACK,K=!0);K&&t.drawBuffers(q)}function je(F){return m!==F?(t.useProgram(F),m=F,!0):!1}const k={[Rr]:t.FUNC_ADD,[WM]:t.FUNC_SUBTRACT,[XM]:t.FUNC_REVERSE_SUBTRACT};k[$M]=t.MIN,k[qM]=t.MAX;const Xe={[YM]:t.ZERO,[KM]:t.ONE,[ZM]:t.SRC_COLOR,[Bd]:t.SRC_ALPHA,[iE]:t.SRC_ALPHA_SATURATE,[tE]:t.DST_COLOR,[JM]:t.DST_ALPHA,[QM]:t.ONE_MINUS_SRC_COLOR,[zd]:t.ONE_MINUS_SRC_ALPHA,[nE]:t.ONE_MINUS_DST_COLOR,[eE]:t.ONE_MINUS_DST_ALPHA,[rE]:t.CONSTANT_COLOR,[sE]:t.ONE_MINUS_CONSTANT_COLOR,[aE]:t.CONSTANT_ALPHA,[oE]:t.ONE_MINUS_CONSTANT_ALPHA};function Ye(F,Me,q,K,pe,ze,qe,xt,pt,nt){if(F===nr){y===!0&&(me(t.BLEND),y=!1);return}if(y===!1&&(xe(t.BLEND),y=!0),F!==GM){if(F!==v||nt!==N){if((g!==Rr||_!==Rr)&&(t.blendEquation(t.FUNC_ADD),g=Rr,_=Rr),nt)switch(F){case Ps:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Od:t.blendFunc(t.ONE,t.ONE);break;case wp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Tp:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Ps:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Od:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case wp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Tp:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}d=null,x=null,E=null,P=null,R.set(0,0,0),A=0,v=F,N=nt}return}pe=pe||Me,ze=ze||q,qe=qe||K,(Me!==g||pe!==_)&&(t.blendEquationSeparate(k[Me],k[pe]),g=Me,_=pe),(q!==d||K!==x||ze!==E||qe!==P)&&(t.blendFuncSeparate(Xe[q],Xe[K],Xe[ze],Xe[qe]),d=q,x=K,E=ze,P=qe),(xt.equals(R)===!1||pt!==A)&&(t.blendColor(xt.r,xt.g,xt.b,pt),R.copy(xt),A=pt),v=F,N=!1}function ot(F,Me){F.side===pi?me(t.CULL_FACE):xe(t.CULL_FACE);let q=F.side===fn;Me&&(q=!q),ke(q),F.blending===Ps&&F.transparent===!1?Ye(nr):Ye(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),s.setFunc(F.depthFunc),s.setTest(F.depthTest),s.setMask(F.depthWrite),r.setMask(F.colorWrite);const K=F.stencilWrite;a.setTest(K),K&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),He(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?xe(t.SAMPLE_ALPHA_TO_COVERAGE):me(t.SAMPLE_ALPHA_TO_COVERAGE)}function ke(F){S!==F&&(F?t.frontFace(t.CW):t.frontFace(t.CCW),S=F)}function Ke(F){F!==jM?(xe(t.CULL_FACE),F!==M&&(F===Ep?t.cullFace(t.BACK):F===HM?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):me(t.CULL_FACE),M=F}function $e(F){F!==I&&(X&&t.lineWidth(F),I=F)}function He(F,Me,q){F?(xe(t.POLYGON_OFFSET_FILL),(G!==Me||j!==q)&&(t.polygonOffset(Me,q),G=Me,j=q)):me(t.POLYGON_OFFSET_FILL)}function vt(F){F?xe(t.SCISSOR_TEST):me(t.SCISSOR_TEST)}function D(F){F===void 0&&(F=t.TEXTURE0+Q-1),O!==F&&(t.activeTexture(F),O=F)}function w(F,Me,q){q===void 0&&(O===null?q=t.TEXTURE0+Q-1:q=O);let K=ee[q];K===void 0&&(K={type:void 0,texture:void 0},ee[q]=K),(K.type!==F||K.texture!==Me)&&(O!==q&&(t.activeTexture(q),O=q),t.bindTexture(F,Me||re[F]),K.type=F,K.texture=Me)}function H(){const F=ee[O];F!==void 0&&F.type!==void 0&&(t.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function ie(){try{t.compressedTexImage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ae(){try{t.compressedTexImage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function se(){try{t.texSubImage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ne(){try{t.texSubImage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ge(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function _e(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Be(){try{t.texStorage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ue(){try{t.texStorage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ce(){try{t.texImage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ge(){try{t.texImage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function be(F){Re.equals(F)===!1&&(t.scissor(F.x,F.y,F.z,F.w),Re.copy(F))}function Se(F){Je.equals(F)===!1&&(t.viewport(F.x,F.y,F.z,F.w),Je.copy(F))}function Ve(F,Me){let q=c.get(Me);q===void 0&&(q=new WeakMap,c.set(Me,q));let K=q.get(F);K===void 0&&(K=t.getUniformBlockIndex(Me,F.name),q.set(F,K))}function We(F,Me){const K=c.get(Me).get(F);o.get(Me)!==K&&(t.uniformBlockBinding(Me,K,F.__bindingPointIndex),o.set(Me,K))}function at(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),u={},O=null,ee={},f={},p=new WeakMap,h=[],m=null,y=!1,v=null,g=null,d=null,x=null,_=null,E=null,P=null,R=new ut(0,0,0),A=0,N=!1,S=null,M=null,I=null,G=null,j=null,Re.set(0,0,t.canvas.width,t.canvas.height),Je.set(0,0,t.canvas.width,t.canvas.height),r.reset(),s.reset(),a.reset()}return{buffers:{color:r,depth:s,stencil:a},enable:xe,disable:me,bindFramebuffer:Ee,drawBuffers:Ue,useProgram:je,setBlending:Ye,setMaterial:ot,setFlipSided:ke,setCullFace:Ke,setLineWidth:$e,setPolygonOffset:He,setScissorTest:vt,activeTexture:D,bindTexture:w,unbindTexture:H,compressedTexImage2D:ie,compressedTexImage3D:ae,texImage2D:Ce,texImage3D:Ge,updateUBOMapping:Ve,uniformBlockBinding:We,texStorage2D:Be,texStorage3D:ue,texSubImage2D:se,texSubImage3D:Ne,compressedTexSubImage2D:ge,compressedTexSubImage3D:_e,scissor:be,viewport:Se,reset:at}}function WC(t,e,n,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new lt,f=new WeakMap;let p;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(D,w){return m?new OffscreenCanvas(D,w):Zl("canvas")}function v(D,w,H){let ie=1;const ae=vt(D);if((ae.width>H||ae.height>H)&&(ie=H/Math.max(ae.width,ae.height)),ie<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const se=Math.floor(ie*ae.width),Ne=Math.floor(ie*ae.height);p===void 0&&(p=y(se,Ne));const ge=w?y(se,Ne):p;return ge.width=se,ge.height=Ne,ge.getContext("2d").drawImage(D,0,0,se,Ne),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+se+"x"+Ne+")."),ge}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),D;return D}function g(D){return D.generateMipmaps&&D.minFilter!==Rn&&D.minFilter!==Vn}function d(D){t.generateMipmap(D)}function x(D,w,H,ie,ae=!1){if(D!==null){if(t[D]!==void 0)return t[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let se=w;if(w===t.RED&&(H===t.FLOAT&&(se=t.R32F),H===t.HALF_FLOAT&&(se=t.R16F),H===t.UNSIGNED_BYTE&&(se=t.R8)),w===t.RED_INTEGER&&(H===t.UNSIGNED_BYTE&&(se=t.R8UI),H===t.UNSIGNED_SHORT&&(se=t.R16UI),H===t.UNSIGNED_INT&&(se=t.R32UI),H===t.BYTE&&(se=t.R8I),H===t.SHORT&&(se=t.R16I),H===t.INT&&(se=t.R32I)),w===t.RG&&(H===t.FLOAT&&(se=t.RG32F),H===t.HALF_FLOAT&&(se=t.RG16F),H===t.UNSIGNED_BYTE&&(se=t.RG8)),w===t.RG_INTEGER&&(H===t.UNSIGNED_BYTE&&(se=t.RG8UI),H===t.UNSIGNED_SHORT&&(se=t.RG16UI),H===t.UNSIGNED_INT&&(se=t.RG32UI),H===t.BYTE&&(se=t.RG8I),H===t.SHORT&&(se=t.RG16I),H===t.INT&&(se=t.RG32I)),w===t.RGB&&H===t.UNSIGNED_INT_5_9_9_9_REV&&(se=t.RGB9_E5),w===t.RGBA){const Ne=ae?$l:ct.getTransfer(ie);H===t.FLOAT&&(se=t.RGBA32F),H===t.HALF_FLOAT&&(se=t.RGBA16F),H===t.UNSIGNED_BYTE&&(se=Ne===yt?t.SRGB8_ALPHA8:t.RGBA8),H===t.UNSIGNED_SHORT_4_4_4_4&&(se=t.RGBA4),H===t.UNSIGNED_SHORT_5_5_5_1&&(se=t.RGB5_A1)}return(se===t.R16F||se===t.R32F||se===t.RG16F||se===t.RG32F||se===t.RGBA16F||se===t.RGBA32F)&&e.get("EXT_color_buffer_float"),se}function _(D,w){let H;return D?w===null||w===Vs||w===Gs?H=t.DEPTH24_STENCIL8:w===Xi?H=t.DEPTH32F_STENCIL8:w===Xl&&(H=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Vs||w===Gs?H=t.DEPTH_COMPONENT24:w===Xi?H=t.DEPTH_COMPONENT32F:w===Xl&&(H=t.DEPTH_COMPONENT16),H}function E(D,w){return g(D)===!0||D.isFramebufferTexture&&D.minFilter!==Rn&&D.minFilter!==Vn?Math.log2(Math.max(w.width,w.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?w.mipmaps.length:1}function P(D){const w=D.target;w.removeEventListener("dispose",P),A(w),w.isVideoTexture&&f.delete(w)}function R(D){const w=D.target;w.removeEventListener("dispose",R),S(w)}function A(D){const w=i.get(D);if(w.__webglInit===void 0)return;const H=D.source,ie=h.get(H);if(ie){const ae=ie[w.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&N(D),Object.keys(ie).length===0&&h.delete(H)}i.remove(D)}function N(D){const w=i.get(D);t.deleteTexture(w.__webglTexture);const H=D.source,ie=h.get(H);delete ie[w.__cacheKey],a.memory.textures--}function S(D){const w=i.get(D);if(D.depthTexture&&D.depthTexture.dispose(),D.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++){if(Array.isArray(w.__webglFramebuffer[ie]))for(let ae=0;ae<w.__webglFramebuffer[ie].length;ae++)t.deleteFramebuffer(w.__webglFramebuffer[ie][ae]);else t.deleteFramebuffer(w.__webglFramebuffer[ie]);w.__webglDepthbuffer&&t.deleteRenderbuffer(w.__webglDepthbuffer[ie])}else{if(Array.isArray(w.__webglFramebuffer))for(let ie=0;ie<w.__webglFramebuffer.length;ie++)t.deleteFramebuffer(w.__webglFramebuffer[ie]);else t.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&t.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&t.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let ie=0;ie<w.__webglColorRenderbuffer.length;ie++)w.__webglColorRenderbuffer[ie]&&t.deleteRenderbuffer(w.__webglColorRenderbuffer[ie]);w.__webglDepthRenderbuffer&&t.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const H=D.textures;for(let ie=0,ae=H.length;ie<ae;ie++){const se=i.get(H[ie]);se.__webglTexture&&(t.deleteTexture(se.__webglTexture),a.memory.textures--),i.remove(H[ie])}i.remove(D)}let M=0;function I(){M=0}function G(){const D=M;return D>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+r.maxTextures),M+=1,D}function j(D){const w=[];return w.push(D.wrapS),w.push(D.wrapT),w.push(D.wrapR||0),w.push(D.magFilter),w.push(D.minFilter),w.push(D.anisotropy),w.push(D.internalFormat),w.push(D.format),w.push(D.type),w.push(D.generateMipmaps),w.push(D.premultiplyAlpha),w.push(D.flipY),w.push(D.unpackAlignment),w.push(D.colorSpace),w.join()}function Q(D,w){const H=i.get(D);if(D.isVideoTexture&&$e(D),D.isRenderTargetTexture===!1&&D.version>0&&H.__version!==D.version){const ie=D.image;if(ie===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ie.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Je(H,D,w);return}}n.bindTexture(t.TEXTURE_2D,H.__webglTexture,t.TEXTURE0+w)}function X(D,w){const H=i.get(D);if(D.version>0&&H.__version!==D.version){Je(H,D,w);return}n.bindTexture(t.TEXTURE_2D_ARRAY,H.__webglTexture,t.TEXTURE0+w)}function Y(D,w){const H=i.get(D);if(D.version>0&&H.__version!==D.version){Je(H,D,w);return}n.bindTexture(t.TEXTURE_3D,H.__webglTexture,t.TEXTURE0+w)}function J(D,w){const H=i.get(D);if(D.version>0&&H.__version!==D.version){$(H,D,w);return}n.bindTexture(t.TEXTURE_CUBE_MAP,H.__webglTexture,t.TEXTURE0+w)}const O={[Vd]:t.REPEAT,[Ur]:t.CLAMP_TO_EDGE,[Gd]:t.MIRRORED_REPEAT},ee={[Rn]:t.NEAREST,[wE]:t.NEAREST_MIPMAP_NEAREST,[Lo]:t.NEAREST_MIPMAP_LINEAR,[Vn]:t.LINEAR,[su]:t.LINEAR_MIPMAP_NEAREST,[Fr]:t.LINEAR_MIPMAP_LINEAR},ne={[BE]:t.NEVER,[WE]:t.ALWAYS,[zE]:t.LESS,[Y0]:t.LEQUAL,[jE]:t.EQUAL,[GE]:t.GEQUAL,[HE]:t.GREATER,[VE]:t.NOTEQUAL};function le(D,w){if(w.type===Xi&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Vn||w.magFilter===su||w.magFilter===Lo||w.magFilter===Fr||w.minFilter===Vn||w.minFilter===su||w.minFilter===Lo||w.minFilter===Fr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(D,t.TEXTURE_WRAP_S,O[w.wrapS]),t.texParameteri(D,t.TEXTURE_WRAP_T,O[w.wrapT]),(D===t.TEXTURE_3D||D===t.TEXTURE_2D_ARRAY)&&t.texParameteri(D,t.TEXTURE_WRAP_R,O[w.wrapR]),t.texParameteri(D,t.TEXTURE_MAG_FILTER,ee[w.magFilter]),t.texParameteri(D,t.TEXTURE_MIN_FILTER,ee[w.minFilter]),w.compareFunction&&(t.texParameteri(D,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(D,t.TEXTURE_COMPARE_FUNC,ne[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Rn||w.minFilter!==Lo&&w.minFilter!==Fr||w.type===Xi&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||i.get(w).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");t.texParameterf(D,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,r.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy}}}function Re(D,w){let H=!1;D.__webglInit===void 0&&(D.__webglInit=!0,w.addEventListener("dispose",P));const ie=w.source;let ae=h.get(ie);ae===void 0&&(ae={},h.set(ie,ae));const se=j(w);if(se!==D.__cacheKey){ae[se]===void 0&&(ae[se]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,H=!0),ae[se].usedTimes++;const Ne=ae[D.__cacheKey];Ne!==void 0&&(ae[D.__cacheKey].usedTimes--,Ne.usedTimes===0&&N(w)),D.__cacheKey=se,D.__webglTexture=ae[se].texture}return H}function Je(D,w,H){let ie=t.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ie=t.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ie=t.TEXTURE_3D);const ae=Re(D,w),se=w.source;n.bindTexture(ie,D.__webglTexture,t.TEXTURE0+H);const Ne=i.get(se);if(se.version!==Ne.__version||ae===!0){n.activeTexture(t.TEXTURE0+H);const ge=ct.getPrimaries(ct.workingColorSpace),_e=w.colorSpace===Vi?null:ct.getPrimaries(w.colorSpace),Be=w.colorSpace===Vi||ge===_e?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,w.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Be);let ue=v(w.image,!1,r.maxTextureSize);ue=He(w,ue);const Ce=s.convert(w.format,w.colorSpace),Ge=s.convert(w.type);let be=x(w.internalFormat,Ce,Ge,w.colorSpace,w.isVideoTexture);le(ie,w);let Se;const Ve=w.mipmaps,We=w.isVideoTexture!==!0,at=Ne.__version===void 0||ae===!0,F=se.dataReady,Me=E(w,ue);if(w.isDepthTexture)be=_(w.format===Ws,w.type),at&&(We?n.texStorage2D(t.TEXTURE_2D,1,be,ue.width,ue.height):n.texImage2D(t.TEXTURE_2D,0,be,ue.width,ue.height,0,Ce,Ge,null));else if(w.isDataTexture)if(Ve.length>0){We&&at&&n.texStorage2D(t.TEXTURE_2D,Me,be,Ve[0].width,Ve[0].height);for(let q=0,K=Ve.length;q<K;q++)Se=Ve[q],We?F&&n.texSubImage2D(t.TEXTURE_2D,q,0,0,Se.width,Se.height,Ce,Ge,Se.data):n.texImage2D(t.TEXTURE_2D,q,be,Se.width,Se.height,0,Ce,Ge,Se.data);w.generateMipmaps=!1}else We?(at&&n.texStorage2D(t.TEXTURE_2D,Me,be,ue.width,ue.height),F&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ue.width,ue.height,Ce,Ge,ue.data)):n.texImage2D(t.TEXTURE_2D,0,be,ue.width,ue.height,0,Ce,Ge,ue.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){We&&at&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Me,be,Ve[0].width,Ve[0].height,ue.depth);for(let q=0,K=Ve.length;q<K;q++)if(Se=Ve[q],w.format!==ti)if(Ce!==null)if(We){if(F)if(w.layerUpdates.size>0){for(const pe of w.layerUpdates){const ze=Se.width*Se.height;n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,q,0,0,pe,Se.width,Se.height,1,Ce,Se.data.slice(ze*pe,ze*(pe+1)),0,0)}w.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,q,0,0,0,Se.width,Se.height,ue.depth,Ce,Se.data,0,0)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,q,be,Se.width,Se.height,ue.depth,0,Se.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else We?F&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,q,0,0,0,Se.width,Se.height,ue.depth,Ce,Ge,Se.data):n.texImage3D(t.TEXTURE_2D_ARRAY,q,be,Se.width,Se.height,ue.depth,0,Ce,Ge,Se.data)}else{We&&at&&n.texStorage2D(t.TEXTURE_2D,Me,be,Ve[0].width,Ve[0].height);for(let q=0,K=Ve.length;q<K;q++)Se=Ve[q],w.format!==ti?Ce!==null?We?F&&n.compressedTexSubImage2D(t.TEXTURE_2D,q,0,0,Se.width,Se.height,Ce,Se.data):n.compressedTexImage2D(t.TEXTURE_2D,q,be,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):We?F&&n.texSubImage2D(t.TEXTURE_2D,q,0,0,Se.width,Se.height,Ce,Ge,Se.data):n.texImage2D(t.TEXTURE_2D,q,be,Se.width,Se.height,0,Ce,Ge,Se.data)}else if(w.isDataArrayTexture)if(We){if(at&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Me,be,ue.width,ue.height,ue.depth),F)if(w.layerUpdates.size>0){let q;switch(Ge){case t.UNSIGNED_BYTE:switch(Ce){case t.ALPHA:q=1;break;case t.LUMINANCE:q=1;break;case t.LUMINANCE_ALPHA:q=2;break;case t.RGB:q=3;break;case t.RGBA:q=4;break;default:throw new Error(`Unknown texel size for format ${Ce}.`)}break;case t.UNSIGNED_SHORT_4_4_4_4:case t.UNSIGNED_SHORT_5_5_5_1:case t.UNSIGNED_SHORT_5_6_5:q=1;break;default:throw new Error(`Unknown texel size for type ${Ge}.`)}const K=ue.width*ue.height*q;for(const pe of w.layerUpdates)n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,pe,ue.width,ue.height,1,Ce,Ge,ue.data.slice(K*pe,K*(pe+1)));w.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,Ce,Ge,ue.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,be,ue.width,ue.height,ue.depth,0,Ce,Ge,ue.data);else if(w.isData3DTexture)We?(at&&n.texStorage3D(t.TEXTURE_3D,Me,be,ue.width,ue.height,ue.depth),F&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,Ce,Ge,ue.data)):n.texImage3D(t.TEXTURE_3D,0,be,ue.width,ue.height,ue.depth,0,Ce,Ge,ue.data);else if(w.isFramebufferTexture){if(at)if(We)n.texStorage2D(t.TEXTURE_2D,Me,be,ue.width,ue.height);else{let q=ue.width,K=ue.height;for(let pe=0;pe<Me;pe++)n.texImage2D(t.TEXTURE_2D,pe,be,q,K,0,Ce,Ge,null),q>>=1,K>>=1}}else if(Ve.length>0){if(We&&at){const q=vt(Ve[0]);n.texStorage2D(t.TEXTURE_2D,Me,be,q.width,q.height)}for(let q=0,K=Ve.length;q<K;q++)Se=Ve[q],We?F&&n.texSubImage2D(t.TEXTURE_2D,q,0,0,Ce,Ge,Se):n.texImage2D(t.TEXTURE_2D,q,be,Ce,Ge,Se);w.generateMipmaps=!1}else if(We){if(at){const q=vt(ue);n.texStorage2D(t.TEXTURE_2D,Me,be,q.width,q.height)}F&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,Ce,Ge,ue)}else n.texImage2D(t.TEXTURE_2D,0,be,Ce,Ge,ue);g(w)&&d(ie),Ne.__version=se.version,w.onUpdate&&w.onUpdate(w)}D.__version=w.version}function $(D,w,H){if(w.image.length!==6)return;const ie=Re(D,w),ae=w.source;n.bindTexture(t.TEXTURE_CUBE_MAP,D.__webglTexture,t.TEXTURE0+H);const se=i.get(ae);if(ae.version!==se.__version||ie===!0){n.activeTexture(t.TEXTURE0+H);const Ne=ct.getPrimaries(ct.workingColorSpace),ge=w.colorSpace===Vi?null:ct.getPrimaries(w.colorSpace),_e=w.colorSpace===Vi||Ne===ge?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,w.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);const Be=w.isCompressedTexture||w.image[0].isCompressedTexture,ue=w.image[0]&&w.image[0].isDataTexture,Ce=[];for(let K=0;K<6;K++)!Be&&!ue?Ce[K]=v(w.image[K],!0,r.maxCubemapSize):Ce[K]=ue?w.image[K].image:w.image[K],Ce[K]=He(w,Ce[K]);const Ge=Ce[0],be=s.convert(w.format,w.colorSpace),Se=s.convert(w.type),Ve=x(w.internalFormat,be,Se,w.colorSpace),We=w.isVideoTexture!==!0,at=se.__version===void 0||ie===!0,F=ae.dataReady;let Me=E(w,Ge);le(t.TEXTURE_CUBE_MAP,w);let q;if(Be){We&&at&&n.texStorage2D(t.TEXTURE_CUBE_MAP,Me,Ve,Ge.width,Ge.height);for(let K=0;K<6;K++){q=Ce[K].mipmaps;for(let pe=0;pe<q.length;pe++){const ze=q[pe];w.format!==ti?be!==null?We?F&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,pe,0,0,ze.width,ze.height,be,ze.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,pe,Ve,ze.width,ze.height,0,ze.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):We?F&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,pe,0,0,ze.width,ze.height,be,Se,ze.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,pe,Ve,ze.width,ze.height,0,be,Se,ze.data)}}}else{if(q=w.mipmaps,We&&at){q.length>0&&Me++;const K=vt(Ce[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,Me,Ve,K.width,K.height)}for(let K=0;K<6;K++)if(ue){We?F&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Ce[K].width,Ce[K].height,be,Se,Ce[K].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ve,Ce[K].width,Ce[K].height,0,be,Se,Ce[K].data);for(let pe=0;pe<q.length;pe++){const qe=q[pe].image[K].image;We?F&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,pe+1,0,0,qe.width,qe.height,be,Se,qe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,pe+1,Ve,qe.width,qe.height,0,be,Se,qe.data)}}else{We?F&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,be,Se,Ce[K]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ve,be,Se,Ce[K]);for(let pe=0;pe<q.length;pe++){const ze=q[pe];We?F&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,pe+1,0,0,be,Se,ze.image[K]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,pe+1,Ve,be,Se,ze.image[K])}}}g(w)&&d(t.TEXTURE_CUBE_MAP),se.__version=ae.version,w.onUpdate&&w.onUpdate(w)}D.__version=w.version}function re(D,w,H,ie,ae,se){const Ne=s.convert(H.format,H.colorSpace),ge=s.convert(H.type),_e=x(H.internalFormat,Ne,ge,H.colorSpace);if(!i.get(w).__hasExternalTextures){const ue=Math.max(1,w.width>>se),Ce=Math.max(1,w.height>>se);ae===t.TEXTURE_3D||ae===t.TEXTURE_2D_ARRAY?n.texImage3D(ae,se,_e,ue,Ce,w.depth,0,Ne,ge,null):n.texImage2D(ae,se,_e,ue,Ce,0,Ne,ge,null)}n.bindFramebuffer(t.FRAMEBUFFER,D),Ke(w)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ie,ae,i.get(H).__webglTexture,0,ke(w)):(ae===t.TEXTURE_2D||ae>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,ie,ae,i.get(H).__webglTexture,se),n.bindFramebuffer(t.FRAMEBUFFER,null)}function xe(D,w,H){if(t.bindRenderbuffer(t.RENDERBUFFER,D),w.depthBuffer){const ie=w.depthTexture,ae=ie&&ie.isDepthTexture?ie.type:null,se=_(w.stencilBuffer,ae),Ne=w.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ge=ke(w);Ke(w)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ge,se,w.width,w.height):H?t.renderbufferStorageMultisample(t.RENDERBUFFER,ge,se,w.width,w.height):t.renderbufferStorage(t.RENDERBUFFER,se,w.width,w.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Ne,t.RENDERBUFFER,D)}else{const ie=w.textures;for(let ae=0;ae<ie.length;ae++){const se=ie[ae],Ne=s.convert(se.format,se.colorSpace),ge=s.convert(se.type),_e=x(se.internalFormat,Ne,ge,se.colorSpace),Be=ke(w);H&&Ke(w)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Be,_e,w.width,w.height):Ke(w)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Be,_e,w.width,w.height):t.renderbufferStorage(t.RENDERBUFFER,_e,w.width,w.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function me(D,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,D),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),Q(w.depthTexture,0);const ie=i.get(w.depthTexture).__webglTexture,ae=ke(w);if(w.depthTexture.format===Ls)Ke(w)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ie,0,ae):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ie,0);else if(w.depthTexture.format===Ws)Ke(w)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ie,0,ae):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ie,0);else throw new Error("Unknown depthTexture format")}function Ee(D){const w=i.get(D),H=D.isWebGLCubeRenderTarget===!0;if(D.depthTexture&&!w.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");me(w.__webglFramebuffer,D)}else if(H){w.__webglDepthbuffer=[];for(let ie=0;ie<6;ie++)n.bindFramebuffer(t.FRAMEBUFFER,w.__webglFramebuffer[ie]),w.__webglDepthbuffer[ie]=t.createRenderbuffer(),xe(w.__webglDepthbuffer[ie],D,!1)}else n.bindFramebuffer(t.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer=t.createRenderbuffer(),xe(w.__webglDepthbuffer,D,!1);n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ue(D,w,H){const ie=i.get(D);w!==void 0&&re(ie.__webglFramebuffer,D,D.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),H!==void 0&&Ee(D)}function je(D){const w=D.texture,H=i.get(D),ie=i.get(w);D.addEventListener("dispose",R);const ae=D.textures,se=D.isWebGLCubeRenderTarget===!0,Ne=ae.length>1;if(Ne||(ie.__webglTexture===void 0&&(ie.__webglTexture=t.createTexture()),ie.__version=w.version,a.memory.textures++),se){H.__webglFramebuffer=[];for(let ge=0;ge<6;ge++)if(w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer[ge]=[];for(let _e=0;_e<w.mipmaps.length;_e++)H.__webglFramebuffer[ge][_e]=t.createFramebuffer()}else H.__webglFramebuffer[ge]=t.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer=[];for(let ge=0;ge<w.mipmaps.length;ge++)H.__webglFramebuffer[ge]=t.createFramebuffer()}else H.__webglFramebuffer=t.createFramebuffer();if(Ne)for(let ge=0,_e=ae.length;ge<_e;ge++){const Be=i.get(ae[ge]);Be.__webglTexture===void 0&&(Be.__webglTexture=t.createTexture(),a.memory.textures++)}if(D.samples>0&&Ke(D)===!1){H.__webglMultisampledFramebuffer=t.createFramebuffer(),H.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let ge=0;ge<ae.length;ge++){const _e=ae[ge];H.__webglColorRenderbuffer[ge]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,H.__webglColorRenderbuffer[ge]);const Be=s.convert(_e.format,_e.colorSpace),ue=s.convert(_e.type),Ce=x(_e.internalFormat,Be,ue,_e.colorSpace,D.isXRRenderTarget===!0),Ge=ke(D);t.renderbufferStorageMultisample(t.RENDERBUFFER,Ge,Ce,D.width,D.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ge,t.RENDERBUFFER,H.__webglColorRenderbuffer[ge])}t.bindRenderbuffer(t.RENDERBUFFER,null),D.depthBuffer&&(H.__webglDepthRenderbuffer=t.createRenderbuffer(),xe(H.__webglDepthRenderbuffer,D,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(se){n.bindTexture(t.TEXTURE_CUBE_MAP,ie.__webglTexture),le(t.TEXTURE_CUBE_MAP,w);for(let ge=0;ge<6;ge++)if(w.mipmaps&&w.mipmaps.length>0)for(let _e=0;_e<w.mipmaps.length;_e++)re(H.__webglFramebuffer[ge][_e],D,w,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ge,_e);else re(H.__webglFramebuffer[ge],D,w,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0);g(w)&&d(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Ne){for(let ge=0,_e=ae.length;ge<_e;ge++){const Be=ae[ge],ue=i.get(Be);n.bindTexture(t.TEXTURE_2D,ue.__webglTexture),le(t.TEXTURE_2D,Be),re(H.__webglFramebuffer,D,Be,t.COLOR_ATTACHMENT0+ge,t.TEXTURE_2D,0),g(Be)&&d(t.TEXTURE_2D)}n.unbindTexture()}else{let ge=t.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(ge=D.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ge,ie.__webglTexture),le(ge,w),w.mipmaps&&w.mipmaps.length>0)for(let _e=0;_e<w.mipmaps.length;_e++)re(H.__webglFramebuffer[_e],D,w,t.COLOR_ATTACHMENT0,ge,_e);else re(H.__webglFramebuffer,D,w,t.COLOR_ATTACHMENT0,ge,0);g(w)&&d(ge),n.unbindTexture()}D.depthBuffer&&Ee(D)}function k(D){const w=D.textures;for(let H=0,ie=w.length;H<ie;H++){const ae=w[H];if(g(ae)){const se=D.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,Ne=i.get(ae).__webglTexture;n.bindTexture(se,Ne),d(se),n.unbindTexture()}}}const Xe=[],Ye=[];function ot(D){if(D.samples>0){if(Ke(D)===!1){const w=D.textures,H=D.width,ie=D.height;let ae=t.COLOR_BUFFER_BIT;const se=D.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Ne=i.get(D),ge=w.length>1;if(ge)for(let _e=0;_e<w.length;_e++)n.bindFramebuffer(t.FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+_e,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Ne.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+_e,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Ne.__webglFramebuffer);for(let _e=0;_e<w.length;_e++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(ae|=t.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(ae|=t.STENCIL_BUFFER_BIT)),ge){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Ne.__webglColorRenderbuffer[_e]);const Be=i.get(w[_e]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Be,0)}t.blitFramebuffer(0,0,H,ie,0,0,H,ie,ae,t.NEAREST),c===!0&&(Xe.length=0,Ye.length=0,Xe.push(t.COLOR_ATTACHMENT0+_e),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Xe.push(se),Ye.push(se),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Ye)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,Xe))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),ge)for(let _e=0;_e<w.length;_e++){n.bindFramebuffer(t.FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+_e,t.RENDERBUFFER,Ne.__webglColorRenderbuffer[_e]);const Be=i.get(w[_e]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Ne.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+_e,t.TEXTURE_2D,Be,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Ne.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&c){const w=D.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[w])}}}function ke(D){return Math.min(r.maxSamples,D.samples)}function Ke(D){const w=i.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function $e(D){const w=a.render.frame;f.get(D)!==w&&(f.set(D,w),D.update())}function He(D,w){const H=D.colorSpace,ie=D.format,ae=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||H!==pr&&H!==Vi&&(ct.getTransfer(H)===yt?(ie!==ti||ae!==lr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),w}function vt(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(u.width=D.naturalWidth||D.width,u.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(u.width=D.displayWidth,u.height=D.displayHeight):(u.width=D.width,u.height=D.height),u}this.allocateTextureUnit=G,this.resetTextureUnits=I,this.setTexture2D=Q,this.setTexture2DArray=X,this.setTexture3D=Y,this.setTextureCube=J,this.rebindTextures=Ue,this.setupRenderTarget=je,this.updateRenderTargetMipmap=k,this.updateMultisampleRenderTarget=ot,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=re,this.useMultisampledRTT=Ke}function XC(t,e){function n(i,r=Vi){let s;const a=ct.getTransfer(r);if(i===lr)return t.UNSIGNED_BYTE;if(i===G0)return t.UNSIGNED_SHORT_4_4_4_4;if(i===W0)return t.UNSIGNED_SHORT_5_5_5_1;if(i===CE)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===TE)return t.BYTE;if(i===AE)return t.SHORT;if(i===Xl)return t.UNSIGNED_SHORT;if(i===V0)return t.INT;if(i===Vs)return t.UNSIGNED_INT;if(i===Xi)return t.FLOAT;if(i===Sc)return t.HALF_FLOAT;if(i===bE)return t.ALPHA;if(i===RE)return t.RGB;if(i===ti)return t.RGBA;if(i===NE)return t.LUMINANCE;if(i===PE)return t.LUMINANCE_ALPHA;if(i===Ls)return t.DEPTH_COMPONENT;if(i===Ws)return t.DEPTH_STENCIL;if(i===LE)return t.RED;if(i===X0)return t.RED_INTEGER;if(i===DE)return t.RG;if(i===$0)return t.RG_INTEGER;if(i===q0)return t.RGBA_INTEGER;if(i===au||i===ou||i===lu||i===cu)if(a===yt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===au)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ou)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===lu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===cu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===au)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ou)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===lu)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===cu)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ap||i===Cp||i===bp||i===Rp)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Ap)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Cp)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===bp)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Rp)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Np||i===Pp||i===Lp)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Np||i===Pp)return a===yt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Lp)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Dp||i===Ip||i===Up||i===Fp||i===kp||i===Op||i===Bp||i===zp||i===jp||i===Hp||i===Vp||i===Gp||i===Wp||i===Xp)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Dp)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ip)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Up)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Fp)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===kp)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Op)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Bp)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===zp)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===jp)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Hp)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Vp)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Gp)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Wp)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Xp)return a===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===uu||i===$p||i===qp)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===uu)return a===yt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===$p)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===qp)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===IE||i===Yp||i===Kp||i===Zp)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===uu)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Yp)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Kp)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Zp)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Gs?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}class $C extends Cn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class el extends pn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const qC={type:"move"};class ku{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new el,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new el,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new el,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,u=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(u&&e.hand){a=!0;for(const v of e.hand.values()){const g=n.getJointPose(v,i),d=this._getHandJoint(u,v);g!==null&&(d.matrix.fromArray(g.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=g.radius),d.visible=g!==null}const f=u.joints["index-finger-tip"],p=u.joints["thumb-tip"],h=f.position.distanceTo(p.position),m=.02,y=.005;u.inputState.pinching&&h>m+y?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&h<=m-y&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(qC)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),u!==null&&(u.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new el;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const YC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,KC=`
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

}`;class ZC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new hn,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new cr({vertexShader:YC,fragmentShader:KC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new _i(new wc(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}}class QC extends Qs{constructor(e,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,u=null,f=null,p=null,h=null,m=null,y=null;const v=new ZC,g=n.getContextAttributes();let d=null,x=null;const _=[],E=[],P=new lt;let R=null;const A=new Cn;A.layers.enable(1),A.viewport=new Gt;const N=new Cn;N.layers.enable(2),N.viewport=new Gt;const S=[A,N],M=new $C;M.layers.enable(1),M.layers.enable(2);let I=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let re=_[$];return re===void 0&&(re=new ku,_[$]=re),re.getTargetRaySpace()},this.getControllerGrip=function($){let re=_[$];return re===void 0&&(re=new ku,_[$]=re),re.getGripSpace()},this.getHand=function($){let re=_[$];return re===void 0&&(re=new ku,_[$]=re),re.getHandSpace()};function j($){const re=E.indexOf($.inputSource);if(re===-1)return;const xe=_[re];xe!==void 0&&(xe.update($.inputSource,$.frame,u||a),xe.dispatchEvent({type:$.type,data:$.inputSource}))}function Q(){r.removeEventListener("select",j),r.removeEventListener("selectstart",j),r.removeEventListener("selectend",j),r.removeEventListener("squeeze",j),r.removeEventListener("squeezestart",j),r.removeEventListener("squeezeend",j),r.removeEventListener("end",Q),r.removeEventListener("inputsourceschange",X);for(let $=0;$<_.length;$++){const re=E[$];re!==null&&(E[$]=null,_[$].disconnect(re))}I=null,G=null,v.reset(),e.setRenderTarget(d),m=null,h=null,p=null,r=null,x=null,Je.stop(),i.isPresenting=!1,e.setPixelRatio(R),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||a},this.setReferenceSpace=function($){u=$},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return p},this.getFrame=function(){return y},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(d=e.getRenderTarget(),r.addEventListener("select",j),r.addEventListener("selectstart",j),r.addEventListener("selectend",j),r.addEventListener("squeeze",j),r.addEventListener("squeezestart",j),r.addEventListener("squeezeend",j),r.addEventListener("end",Q),r.addEventListener("inputsourceschange",X),g.xrCompatible!==!0&&await n.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(P),r.renderState.layers===void 0){const re={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,n,re),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),x=new Gr(m.framebufferWidth,m.framebufferHeight,{format:ti,type:lr,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let re=null,xe=null,me=null;g.depth&&(me=g.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,re=g.stencil?Ws:Ls,xe=g.stencil?Gs:Vs);const Ee={colorFormat:n.RGBA8,depthFormat:me,scaleFactor:s};p=new XRWebGLBinding(r,n),h=p.createProjectionLayer(Ee),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),x=new Gr(h.textureWidth,h.textureHeight,{format:ti,type:lr,depthTexture:new dx(h.textureWidth,h.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),u=null,a=await r.requestReferenceSpace(o),Je.setContext(r),Je.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function X($){for(let re=0;re<$.removed.length;re++){const xe=$.removed[re],me=E.indexOf(xe);me>=0&&(E[me]=null,_[me].disconnect(xe))}for(let re=0;re<$.added.length;re++){const xe=$.added[re];let me=E.indexOf(xe);if(me===-1){for(let Ue=0;Ue<_.length;Ue++)if(Ue>=E.length){E.push(xe),me=Ue;break}else if(E[Ue]===null){E[Ue]=xe,me=Ue;break}if(me===-1)break}const Ee=_[me];Ee&&Ee.connect(xe)}}const Y=new V,J=new V;function O($,re,xe){Y.setFromMatrixPosition(re.matrixWorld),J.setFromMatrixPosition(xe.matrixWorld);const me=Y.distanceTo(J),Ee=re.projectionMatrix.elements,Ue=xe.projectionMatrix.elements,je=Ee[14]/(Ee[10]-1),k=Ee[14]/(Ee[10]+1),Xe=(Ee[9]+1)/Ee[5],Ye=(Ee[9]-1)/Ee[5],ot=(Ee[8]-1)/Ee[0],ke=(Ue[8]+1)/Ue[0],Ke=je*ot,$e=je*ke,He=me/(-ot+ke),vt=He*-ot;re.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(vt),$.translateZ(He),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert();const D=je+He,w=k+He,H=Ke-vt,ie=$e+(me-vt),ae=Xe*k/w*D,se=Ye*k/w*D;$.projectionMatrix.makePerspective(H,ie,ae,se,D,w),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}function ee($,re){re===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(re.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;v.texture!==null&&($.near=v.depthNear,$.far=v.depthFar),M.near=N.near=A.near=$.near,M.far=N.far=A.far=$.far,(I!==M.near||G!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),I=M.near,G=M.far,A.near=I,A.far=G,N.near=I,N.far=G,A.updateProjectionMatrix(),N.updateProjectionMatrix(),$.updateProjectionMatrix());const re=$.parent,xe=M.cameras;ee(M,re);for(let me=0;me<xe.length;me++)ee(xe[me],re);xe.length===2?O(M,A,N):M.projectionMatrix.copy(A.projectionMatrix),ne($,M,re)};function ne($,re,xe){xe===null?$.matrix.copy(re.matrixWorld):($.matrix.copy(xe.matrixWorld),$.matrix.invert(),$.matrix.multiply(re.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(re.projectionMatrix),$.projectionMatrixInverse.copy(re.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Wd*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(h===null&&m===null))return c},this.setFoveation=function($){c=$,h!==null&&(h.fixedFoveation=$),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=$)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let le=null;function Re($,re){if(f=re.getViewerPose(u||a),y=re,f!==null){const xe=f.views;m!==null&&(e.setRenderTargetFramebuffer(x,m.framebuffer),e.setRenderTarget(x));let me=!1;xe.length!==M.cameras.length&&(M.cameras.length=0,me=!0);for(let Ue=0;Ue<xe.length;Ue++){const je=xe[Ue];let k=null;if(m!==null)k=m.getViewport(je);else{const Ye=p.getViewSubImage(h,je);k=Ye.viewport,Ue===0&&(e.setRenderTargetTextures(x,Ye.colorTexture,h.ignoreDepthValues?void 0:Ye.depthStencilTexture),e.setRenderTarget(x))}let Xe=S[Ue];Xe===void 0&&(Xe=new Cn,Xe.layers.enable(Ue),Xe.viewport=new Gt,S[Ue]=Xe),Xe.matrix.fromArray(je.transform.matrix),Xe.matrix.decompose(Xe.position,Xe.quaternion,Xe.scale),Xe.projectionMatrix.fromArray(je.projectionMatrix),Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(),Xe.viewport.set(k.x,k.y,k.width,k.height),Ue===0&&(M.matrix.copy(Xe.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),me===!0&&M.cameras.push(Xe)}const Ee=r.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")){const Ue=p.getDepthInformation(xe[0]);Ue&&Ue.isValid&&Ue.texture&&v.init(e,Ue,r.renderState)}}for(let xe=0;xe<_.length;xe++){const me=E[xe],Ee=_[xe];me!==null&&Ee!==void 0&&Ee.update(me,re,u||a)}le&&le($,re),re.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:re}),y=null}const Je=new ux;Je.setAnimationLoop(Re),this.setAnimationLoop=function($){le=$},this.dispose=function(){}}}const Er=new Ai,JC=new Lt;function eb(t,e){function n(g,d){g.matrixAutoUpdate===!0&&g.updateMatrix(),d.value.copy(g.matrix)}function i(g,d){d.color.getRGB(g.fogColor.value,ax(t)),d.isFog?(g.fogNear.value=d.near,g.fogFar.value=d.far):d.isFogExp2&&(g.fogDensity.value=d.density)}function r(g,d,x,_,E){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(g,d):d.isMeshToonMaterial?(s(g,d),p(g,d)):d.isMeshPhongMaterial?(s(g,d),f(g,d)):d.isMeshStandardMaterial?(s(g,d),h(g,d),d.isMeshPhysicalMaterial&&m(g,d,E)):d.isMeshMatcapMaterial?(s(g,d),y(g,d)):d.isMeshDepthMaterial?s(g,d):d.isMeshDistanceMaterial?(s(g,d),v(g,d)):d.isMeshNormalMaterial?s(g,d):d.isLineBasicMaterial?(a(g,d),d.isLineDashedMaterial&&o(g,d)):d.isPointsMaterial?c(g,d,x,_):d.isSpriteMaterial?u(g,d):d.isShadowMaterial?(g.color.value.copy(d.color),g.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(g,d){g.opacity.value=d.opacity,d.color&&g.diffuse.value.copy(d.color),d.emissive&&g.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(g.map.value=d.map,n(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.bumpMap&&(g.bumpMap.value=d.bumpMap,n(d.bumpMap,g.bumpMapTransform),g.bumpScale.value=d.bumpScale,d.side===fn&&(g.bumpScale.value*=-1)),d.normalMap&&(g.normalMap.value=d.normalMap,n(d.normalMap,g.normalMapTransform),g.normalScale.value.copy(d.normalScale),d.side===fn&&g.normalScale.value.negate()),d.displacementMap&&(g.displacementMap.value=d.displacementMap,n(d.displacementMap,g.displacementMapTransform),g.displacementScale.value=d.displacementScale,g.displacementBias.value=d.displacementBias),d.emissiveMap&&(g.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,g.emissiveMapTransform)),d.specularMap&&(g.specularMap.value=d.specularMap,n(d.specularMap,g.specularMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest);const x=e.get(d),_=x.envMap,E=x.envMapRotation;_&&(g.envMap.value=_,Er.copy(E),Er.x*=-1,Er.y*=-1,Er.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Er.y*=-1,Er.z*=-1),g.envMapRotation.value.setFromMatrix4(JC.makeRotationFromEuler(Er)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=d.reflectivity,g.ior.value=d.ior,g.refractionRatio.value=d.refractionRatio),d.lightMap&&(g.lightMap.value=d.lightMap,g.lightMapIntensity.value=d.lightMapIntensity,n(d.lightMap,g.lightMapTransform)),d.aoMap&&(g.aoMap.value=d.aoMap,g.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,g.aoMapTransform))}function a(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,d.map&&(g.map.value=d.map,n(d.map,g.mapTransform))}function o(g,d){g.dashSize.value=d.dashSize,g.totalSize.value=d.dashSize+d.gapSize,g.scale.value=d.scale}function c(g,d,x,_){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.size.value=d.size*x,g.scale.value=_*.5,d.map&&(g.map.value=d.map,n(d.map,g.uvTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function u(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.rotation.value=d.rotation,d.map&&(g.map.value=d.map,n(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function f(g,d){g.specular.value.copy(d.specular),g.shininess.value=Math.max(d.shininess,1e-4)}function p(g,d){d.gradientMap&&(g.gradientMap.value=d.gradientMap)}function h(g,d){g.metalness.value=d.metalness,d.metalnessMap&&(g.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,g.metalnessMapTransform)),g.roughness.value=d.roughness,d.roughnessMap&&(g.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,g.roughnessMapTransform)),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)}function m(g,d,x){g.ior.value=d.ior,d.sheen>0&&(g.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),g.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(g.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,g.sheenColorMapTransform)),d.sheenRoughnessMap&&(g.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,g.sheenRoughnessMapTransform))),d.clearcoat>0&&(g.clearcoat.value=d.clearcoat,g.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(g.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,g.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(g.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===fn&&g.clearcoatNormalScale.value.negate())),d.dispersion>0&&(g.dispersion.value=d.dispersion),d.iridescence>0&&(g.iridescence.value=d.iridescence,g.iridescenceIOR.value=d.iridescenceIOR,g.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(g.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,g.iridescenceMapTransform)),d.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),d.transmission>0&&(g.transmission.value=d.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),d.transmissionMap&&(g.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,g.transmissionMapTransform)),g.thickness.value=d.thickness,d.thicknessMap&&(g.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=d.attenuationDistance,g.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(g.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(g.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=d.specularIntensity,g.specularColor.value.copy(d.specularColor),d.specularColorMap&&(g.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,g.specularColorMapTransform)),d.specularIntensityMap&&(g.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,g.specularIntensityMapTransform))}function y(g,d){d.matcap&&(g.matcap.value=d.matcap)}function v(g,d){const x=e.get(d).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function tb(t,e,n,i){let r={},s={},a=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,_){const E=_.program;i.uniformBlockBinding(x,E)}function u(x,_){let E=r[x.id];E===void 0&&(y(x),E=f(x),r[x.id]=E,x.addEventListener("dispose",g));const P=_.program;i.updateUBOMapping(x,P);const R=e.render.frame;s[x.id]!==R&&(h(x),s[x.id]=R)}function f(x){const _=p();x.__bindingPointIndex=_;const E=t.createBuffer(),P=x.__size,R=x.usage;return t.bindBuffer(t.UNIFORM_BUFFER,E),t.bufferData(t.UNIFORM_BUFFER,P,R),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,_,E),E}function p(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){const _=r[x.id],E=x.uniforms,P=x.__cache;t.bindBuffer(t.UNIFORM_BUFFER,_);for(let R=0,A=E.length;R<A;R++){const N=Array.isArray(E[R])?E[R]:[E[R]];for(let S=0,M=N.length;S<M;S++){const I=N[S];if(m(I,R,S,P)===!0){const G=I.__offset,j=Array.isArray(I.value)?I.value:[I.value];let Q=0;for(let X=0;X<j.length;X++){const Y=j[X],J=v(Y);typeof Y=="number"||typeof Y=="boolean"?(I.__data[0]=Y,t.bufferSubData(t.UNIFORM_BUFFER,G+Q,I.__data)):Y.isMatrix3?(I.__data[0]=Y.elements[0],I.__data[1]=Y.elements[1],I.__data[2]=Y.elements[2],I.__data[3]=0,I.__data[4]=Y.elements[3],I.__data[5]=Y.elements[4],I.__data[6]=Y.elements[5],I.__data[7]=0,I.__data[8]=Y.elements[6],I.__data[9]=Y.elements[7],I.__data[10]=Y.elements[8],I.__data[11]=0):(Y.toArray(I.__data,Q),Q+=J.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,G,I.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function m(x,_,E,P){const R=x.value,A=_+"_"+E;if(P[A]===void 0)return typeof R=="number"||typeof R=="boolean"?P[A]=R:P[A]=R.clone(),!0;{const N=P[A];if(typeof R=="number"||typeof R=="boolean"){if(N!==R)return P[A]=R,!0}else if(N.equals(R)===!1)return N.copy(R),!0}return!1}function y(x){const _=x.uniforms;let E=0;const P=16;for(let A=0,N=_.length;A<N;A++){const S=Array.isArray(_[A])?_[A]:[_[A]];for(let M=0,I=S.length;M<I;M++){const G=S[M],j=Array.isArray(G.value)?G.value:[G.value];for(let Q=0,X=j.length;Q<X;Q++){const Y=j[Q],J=v(Y),O=E%P;O!==0&&P-O<J.boundary&&(E+=P-O),G.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=E,E+=J.storage}}}const R=E%P;return R>0&&(E+=P-R),x.__size=E,x.__cache={},this}function v(x){const _={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(_.boundary=4,_.storage=4):x.isVector2?(_.boundary=8,_.storage=8):x.isVector3||x.isColor?(_.boundary=16,_.storage=12):x.isVector4?(_.boundary=16,_.storage=16):x.isMatrix3?(_.boundary=48,_.storage=48):x.isMatrix4?(_.boundary=64,_.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),_}function g(x){const _=x.target;_.removeEventListener("dispose",g);const E=a.indexOf(_.__bindingPointIndex);a.splice(E,1),t.deleteBuffer(r[_.id]),delete r[_.id],delete s[_.id]}function d(){for(const x in r)t.deleteBuffer(r[x]);a=[],r={},s={}}return{bind:c,update:u,dispose:d}}class nb{constructor(e={}){const{canvas:n=$E(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:u=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:p=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=a;const m=new Uint32Array(4),y=new Int32Array(4);let v=null,g=null;const d=[],x=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Zn,this.toneMapping=ir,this.toneMappingExposure=1;const _=this;let E=!1,P=0,R=0,A=null,N=-1,S=null;const M=new Gt,I=new Gt;let G=null;const j=new ut(0);let Q=0,X=n.width,Y=n.height,J=1,O=null,ee=null;const ne=new Gt(0,0,X,Y),le=new Gt(0,0,X,Y);let Re=!1;const Je=new cx;let $=!1,re=!1;const xe=new Lt,me=new V,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ue=!1;function je(){return A===null?J:1}let k=i;function Xe(T,B){return n.getContext(T,B)}try{const T={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:u,powerPreference:f,failIfMajorPerformanceCaveat:p};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Qf}`),n.addEventListener("webglcontextlost",Me,!1),n.addEventListener("webglcontextrestored",q,!1),n.addEventListener("webglcontextcreationerror",K,!1),k===null){const B="webgl2";if(k=Xe(B,T),k===null)throw Xe(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Ye,ot,ke,Ke,$e,He,vt,D,w,H,ie,ae,se,Ne,ge,_e,Be,ue,Ce,Ge,be,Se,Ve,We;function at(){Ye=new uA(k),Ye.init(),Se=new XC(k,Ye),ot=new iA(k,Ye,e,Se),ke=new GC(k),Ke=new hA(k),$e=new NC,He=new WC(k,Ye,ke,$e,ot,Se,Ke),vt=new sA(_),D=new cA(_),w=new _1(k),Ve=new tA(k,w),H=new dA(k,w,Ke,Ve),ie=new mA(k,H,w,Ke),Ce=new pA(k,ot,He),_e=new rA($e),ae=new RC(_,vt,D,Ye,ot,Ve,_e),se=new eb(_,$e),Ne=new LC,ge=new OC(Ye),ue=new eA(_,vt,D,ke,ie,h,c),Be=new VC(_,ie,ot),We=new tb(k,Ke,ot,ke),Ge=new nA(k,Ye,Ke),be=new fA(k,Ye,Ke),Ke.programs=ae.programs,_.capabilities=ot,_.extensions=Ye,_.properties=$e,_.renderLists=Ne,_.shadowMap=Be,_.state=ke,_.info=Ke}at();const F=new QC(_,k);this.xr=F,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const T=Ye.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Ye.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(T){T!==void 0&&(J=T,this.setSize(X,Y,!1))},this.getSize=function(T){return T.set(X,Y)},this.setSize=function(T,B,C=!0){if(F.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=T,Y=B,n.width=Math.floor(T*J),n.height=Math.floor(B*J),C===!0&&(n.style.width=T+"px",n.style.height=B+"px"),this.setViewport(0,0,T,B)},this.getDrawingBufferSize=function(T){return T.set(X*J,Y*J).floor()},this.setDrawingBufferSize=function(T,B,C){X=T,Y=B,J=C,n.width=Math.floor(T*C),n.height=Math.floor(B*C),this.setViewport(0,0,T,B)},this.getCurrentViewport=function(T){return T.copy(M)},this.getViewport=function(T){return T.copy(ne)},this.setViewport=function(T,B,C,L){T.isVector4?ne.set(T.x,T.y,T.z,T.w):ne.set(T,B,C,L),ke.viewport(M.copy(ne).multiplyScalar(J).round())},this.getScissor=function(T){return T.copy(le)},this.setScissor=function(T,B,C,L){T.isVector4?le.set(T.x,T.y,T.z,T.w):le.set(T,B,C,L),ke.scissor(I.copy(le).multiplyScalar(J).round())},this.getScissorTest=function(){return Re},this.setScissorTest=function(T){ke.setScissorTest(Re=T)},this.setOpaqueSort=function(T){O=T},this.setTransparentSort=function(T){ee=T},this.getClearColor=function(T){return T.copy(ue.getClearColor())},this.setClearColor=function(){ue.setClearColor.apply(ue,arguments)},this.getClearAlpha=function(){return ue.getClearAlpha()},this.setClearAlpha=function(){ue.setClearAlpha.apply(ue,arguments)},this.clear=function(T=!0,B=!0,C=!0){let L=0;if(T){let b=!1;if(A!==null){const z=A.texture.format;b=z===q0||z===$0||z===X0}if(b){const z=A.texture.type,te=z===lr||z===Vs||z===Xl||z===Gs||z===G0||z===W0,fe=ue.getClearColor(),he=ue.getClearAlpha(),Pe=fe.r,Le=fe.g,De=fe.b;te?(m[0]=Pe,m[1]=Le,m[2]=De,m[3]=he,k.clearBufferuiv(k.COLOR,0,m)):(y[0]=Pe,y[1]=Le,y[2]=De,y[3]=he,k.clearBufferiv(k.COLOR,0,y))}else L|=k.COLOR_BUFFER_BIT}B&&(L|=k.DEPTH_BUFFER_BIT),C&&(L|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(L)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Me,!1),n.removeEventListener("webglcontextrestored",q,!1),n.removeEventListener("webglcontextcreationerror",K,!1),Ne.dispose(),ge.dispose(),$e.dispose(),vt.dispose(),D.dispose(),ie.dispose(),Ve.dispose(),We.dispose(),ae.dispose(),F.dispose(),F.removeEventListener("sessionstart",W),F.removeEventListener("sessionend",oe),de.stop()};function Me(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function q(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const T=Ke.autoReset,B=Be.enabled,C=Be.autoUpdate,L=Be.needsUpdate,b=Be.type;at(),Ke.autoReset=T,Be.enabled=B,Be.autoUpdate=C,Be.needsUpdate=L,Be.type=b}function K(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function pe(T){const B=T.target;B.removeEventListener("dispose",pe),ze(B)}function ze(T){qe(T),$e.remove(T)}function qe(T){const B=$e.get(T).programs;B!==void 0&&(B.forEach(function(C){ae.releaseProgram(C)}),T.isShaderMaterial&&ae.releaseShaderCache(T))}this.renderBufferDirect=function(T,B,C,L,b,z){B===null&&(B=Ee);const te=b.isMesh&&b.matrixWorld.determinant()<0,fe=gr(T,B,C,L,b);ke.setMaterial(L,te);let he=C.index,Pe=1;if(L.wireframe===!0){if(he=H.getWireframeAttribute(C),he===void 0)return;Pe=2}const Le=C.drawRange,De=C.attributes.position;let et=Le.start*Pe,ht=(Le.start+Le.count)*Pe;z!==null&&(et=Math.max(et,z.start*Pe),ht=Math.min(ht,(z.start+z.count)*Pe)),he!==null?(et=Math.max(et,0),ht=Math.min(ht,he.count)):De!=null&&(et=Math.max(et,0),ht=Math.min(ht,De.count));const it=ht-et;if(it<0||it===1/0)return;Ve.setup(b,L,fe,C,he);let Ot,rt=Ge;if(he!==null&&(Ot=w.get(he),rt=be,rt.setIndex(Ot)),b.isMesh)L.wireframe===!0?(ke.setLineWidth(L.wireframeLinewidth*je()),rt.setMode(k.LINES)):rt.setMode(k.TRIANGLES);else if(b.isLine){let Fe=L.linewidth;Fe===void 0&&(Fe=1),ke.setLineWidth(Fe*je()),b.isLineSegments?rt.setMode(k.LINES):b.isLineLoop?rt.setMode(k.LINE_LOOP):rt.setMode(k.LINE_STRIP)}else b.isPoints?rt.setMode(k.POINTS):b.isSprite&&rt.setMode(k.TRIANGLES);if(b.isBatchedMesh)b._multiDrawInstances!==null?rt.renderMultiDrawInstances(b._multiDrawStarts,b._multiDrawCounts,b._multiDrawCount,b._multiDrawInstances):rt.renderMultiDraw(b._multiDrawStarts,b._multiDrawCounts,b._multiDrawCount);else if(b.isInstancedMesh)rt.renderInstances(et,it,b.count);else if(C.isInstancedBufferGeometry){const Fe=C._maxInstanceCount!==void 0?C._maxInstanceCount:1/0,Dt=Math.min(C.instanceCount,Fe);rt.renderInstances(et,it,Dt)}else rt.render(et,it)};function xt(T,B,C){T.transparent===!0&&T.side===pi&&T.forceSinglePass===!1?(T.side=fn,T.needsUpdate=!0,Ie(T,B,C),T.side=or,T.needsUpdate=!0,Ie(T,B,C),T.side=pi):Ie(T,B,C)}this.compile=function(T,B,C=null){C===null&&(C=T),g=ge.get(C),g.init(B),x.push(g),C.traverseVisible(function(b){b.isLight&&b.layers.test(B.layers)&&(g.pushLight(b),b.castShadow&&g.pushShadow(b))}),T!==C&&T.traverseVisible(function(b){b.isLight&&b.layers.test(B.layers)&&(g.pushLight(b),b.castShadow&&g.pushShadow(b))}),g.setupLights();const L=new Set;return T.traverse(function(b){const z=b.material;if(z)if(Array.isArray(z))for(let te=0;te<z.length;te++){const fe=z[te];xt(fe,C,b),L.add(fe)}else xt(z,C,b),L.add(z)}),x.pop(),g=null,L},this.compileAsync=function(T,B,C=null){const L=this.compile(T,B,C);return new Promise(b=>{function z(){if(L.forEach(function(te){$e.get(te).currentProgram.isReady()&&L.delete(te)}),L.size===0){b(T);return}setTimeout(z,10)}Ye.get("KHR_parallel_shader_compile")!==null?z():setTimeout(z,10)})};let pt=null;function nt(T){pt&&pt(T)}function W(){de.stop()}function oe(){de.start()}const de=new ux;de.setAnimationLoop(nt),typeof self<"u"&&de.setContext(self),this.setAnimationLoop=function(T){pt=T,F.setAnimationLoop(T),T===null?de.stop():de.start()},F.addEventListener("sessionstart",W),F.addEventListener("sessionend",oe),this.render=function(T,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),F.enabled===!0&&F.isPresenting===!0&&(F.cameraAutoUpdate===!0&&F.updateCamera(B),B=F.getCamera()),T.isScene===!0&&T.onBeforeRender(_,T,B,A),g=ge.get(T,x.length),g.init(B),x.push(g),xe.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Je.setFromProjectionMatrix(xe),re=this.localClippingEnabled,$=_e.init(this.clippingPlanes,re),v=Ne.get(T,d.length),v.init(),d.push(v),F.enabled===!0&&F.isPresenting===!0){const z=_.xr.getDepthSensingMesh();z!==null&&ve(z,B,-1/0,_.sortObjects)}ve(T,B,0,_.sortObjects),v.finish(),_.sortObjects===!0&&v.sort(O,ee),Ue=F.enabled===!1||F.isPresenting===!1||F.hasDepthSensing()===!1,Ue&&ue.addToRenderList(v,T),this.info.render.frame++,$===!0&&_e.beginShadows();const C=g.state.shadowsArray;Be.render(C,T,B),$===!0&&_e.endShadows(),this.info.autoReset===!0&&this.info.reset();const L=v.opaque,b=v.transmissive;if(g.setupLights(),B.isArrayCamera){const z=B.cameras;if(b.length>0)for(let te=0,fe=z.length;te<fe;te++){const he=z[te];Te(L,b,T,he)}Ue&&ue.render(T);for(let te=0,fe=z.length;te<fe;te++){const he=z[te];Oe(v,T,he,he.viewport)}}else b.length>0&&Te(L,b,T,B),Ue&&ue.render(T),Oe(v,T,B);A!==null&&(He.updateMultisampleRenderTarget(A),He.updateRenderTargetMipmap(A)),T.isScene===!0&&T.onAfterRender(_,T,B),Ve.resetDefaultState(),N=-1,S=null,x.pop(),x.length>0?(g=x[x.length-1],$===!0&&_e.setGlobalState(_.clippingPlanes,g.state.camera)):g=null,d.pop(),d.length>0?v=d[d.length-1]:v=null};function ve(T,B,C,L){if(T.visible===!1)return;if(T.layers.test(B.layers)){if(T.isGroup)C=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(B);else if(T.isLight)g.pushLight(T),T.castShadow&&g.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Je.intersectsSprite(T)){L&&me.setFromMatrixPosition(T.matrixWorld).applyMatrix4(xe);const te=ie.update(T),fe=T.material;fe.visible&&v.push(T,te,fe,C,me.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Je.intersectsObject(T))){const te=ie.update(T),fe=T.material;if(L&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),me.copy(T.boundingSphere.center)):(te.boundingSphere===null&&te.computeBoundingSphere(),me.copy(te.boundingSphere.center)),me.applyMatrix4(T.matrixWorld).applyMatrix4(xe)),Array.isArray(fe)){const he=te.groups;for(let Pe=0,Le=he.length;Pe<Le;Pe++){const De=he[Pe],et=fe[De.materialIndex];et&&et.visible&&v.push(T,te,et,C,me.z,De)}}else fe.visible&&v.push(T,te,fe,C,me.z,null)}}const z=T.children;for(let te=0,fe=z.length;te<fe;te++)ve(z[te],B,C,L)}function Oe(T,B,C,L){const b=T.opaque,z=T.transmissive,te=T.transparent;g.setupLightsView(C),$===!0&&_e.setGlobalState(_.clippingPlanes,C),L&&ke.viewport(M.copy(L)),b.length>0&&ye(b,B,C),z.length>0&&ye(z,B,C),te.length>0&&ye(te,B,C),ke.buffers.depth.setTest(!0),ke.buffers.depth.setMask(!0),ke.buffers.color.setMask(!0),ke.setPolygonOffset(!1)}function Te(T,B,C,L){if((C.isScene===!0?C.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[L.id]===void 0&&(g.state.transmissionRenderTarget[L.id]=new Gr(1,1,{generateMipmaps:!0,type:Ye.has("EXT_color_buffer_half_float")||Ye.has("EXT_color_buffer_float")?Sc:lr,minFilter:Fr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ct.workingColorSpace}));const z=g.state.transmissionRenderTarget[L.id],te=L.viewport||M;z.setSize(te.z,te.w);const fe=_.getRenderTarget();_.setRenderTarget(z),_.getClearColor(j),Q=_.getClearAlpha(),Q<1&&_.setClearColor(16777215,.5),Ue?ue.render(C):_.clear();const he=_.toneMapping;_.toneMapping=ir;const Pe=L.viewport;if(L.viewport!==void 0&&(L.viewport=void 0),g.setupLightsView(L),$===!0&&_e.setGlobalState(_.clippingPlanes,L),ye(T,C,L),He.updateMultisampleRenderTarget(z),He.updateRenderTargetMipmap(z),Ye.has("WEBGL_multisampled_render_to_texture")===!1){let Le=!1;for(let De=0,et=B.length;De<et;De++){const ht=B[De],it=ht.object,Ot=ht.geometry,rt=ht.material,Fe=ht.group;if(rt.side===pi&&it.layers.test(L.layers)){const Dt=rt.side;rt.side=fn,rt.needsUpdate=!0,Z(it,C,L,Ot,rt,Fe),rt.side=Dt,rt.needsUpdate=!0,Le=!0}}Le===!0&&(He.updateMultisampleRenderTarget(z),He.updateRenderTargetMipmap(z))}_.setRenderTarget(fe),_.setClearColor(j,Q),Pe!==void 0&&(L.viewport=Pe),_.toneMapping=he}function ye(T,B,C){const L=B.isScene===!0?B.overrideMaterial:null;for(let b=0,z=T.length;b<z;b++){const te=T[b],fe=te.object,he=te.geometry,Pe=L===null?te.material:L,Le=te.group;fe.layers.test(C.layers)&&Z(fe,B,C,he,Pe,Le)}}function Z(T,B,C,L,b,z){T.onBeforeRender(_,B,C,L,b,z),T.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),b.onBeforeRender(_,B,C,L,T,z),b.transparent===!0&&b.side===pi&&b.forceSinglePass===!1?(b.side=fn,b.needsUpdate=!0,_.renderBufferDirect(C,B,L,b,T,z),b.side=or,b.needsUpdate=!0,_.renderBufferDirect(C,B,L,b,T,z),b.side=pi):_.renderBufferDirect(C,B,L,b,T,z),T.onAfterRender(_,B,C,L,b,z)}function Ie(T,B,C){B.isScene!==!0&&(B=Ee);const L=$e.get(T),b=g.state.lights,z=g.state.shadowsArray,te=b.state.version,fe=ae.getParameters(T,b.state,z,B,C),he=ae.getProgramCacheKey(fe);let Pe=L.programs;L.environment=T.isMeshStandardMaterial?B.environment:null,L.fog=B.fog,L.envMap=(T.isMeshStandardMaterial?D:vt).get(T.envMap||L.environment),L.envMapRotation=L.environment!==null&&T.envMap===null?B.environmentRotation:T.envMapRotation,Pe===void 0&&(T.addEventListener("dispose",pe),Pe=new Map,L.programs=Pe);let Le=Pe.get(he);if(Le!==void 0){if(L.currentProgram===Le&&L.lightsStateVersion===te)return Rt(T,fe),Le}else fe.uniforms=ae.getUniforms(T),T.onBuild(C,fe,_),T.onBeforeCompile(fe,_),Le=ae.acquireProgram(fe,he),Pe.set(he,Le),L.uniforms=fe.uniforms;const De=L.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(De.clippingPlanes=_e.uniform),Rt(T,fe),L.needsLights=qn(T),L.lightsStateVersion=te,L.needsLights&&(De.ambientLightColor.value=b.state.ambient,De.lightProbe.value=b.state.probe,De.directionalLights.value=b.state.directional,De.directionalLightShadows.value=b.state.directionalShadow,De.spotLights.value=b.state.spot,De.spotLightShadows.value=b.state.spotShadow,De.rectAreaLights.value=b.state.rectArea,De.ltc_1.value=b.state.rectAreaLTC1,De.ltc_2.value=b.state.rectAreaLTC2,De.pointLights.value=b.state.point,De.pointLightShadows.value=b.state.pointShadow,De.hemisphereLights.value=b.state.hemi,De.directionalShadowMap.value=b.state.directionalShadowMap,De.directionalShadowMatrix.value=b.state.directionalShadowMatrix,De.spotShadowMap.value=b.state.spotShadowMap,De.spotLightMatrix.value=b.state.spotLightMatrix,De.spotLightMap.value=b.state.spotLightMap,De.pointShadowMap.value=b.state.pointShadowMap,De.pointShadowMatrix.value=b.state.pointShadowMatrix),L.currentProgram=Le,L.uniformsList=null,Le}function mt(T){if(T.uniformsList===null){const B=T.currentProgram.getUniforms();T.uniformsList=xl.seqWithValue(B.seq,T.uniforms)}return T.uniformsList}function Rt(T,B){const C=$e.get(T);C.outputColorSpace=B.outputColorSpace,C.batching=B.batching,C.batchingColor=B.batchingColor,C.instancing=B.instancing,C.instancingColor=B.instancingColor,C.instancingMorph=B.instancingMorph,C.skinning=B.skinning,C.morphTargets=B.morphTargets,C.morphNormals=B.morphNormals,C.morphColors=B.morphColors,C.morphTargetsCount=B.morphTargetsCount,C.numClippingPlanes=B.numClippingPlanes,C.numIntersection=B.numClipIntersection,C.vertexAlphas=B.vertexAlphas,C.vertexTangents=B.vertexTangents,C.toneMapping=B.toneMapping}function gr(T,B,C,L,b){B.isScene!==!0&&(B=Ee),He.resetTextureUnits();const z=B.fog,te=L.isMeshStandardMaterial?B.environment:null,fe=A===null?_.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:pr,he=(L.isMeshStandardMaterial?D:vt).get(L.envMap||te),Pe=L.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,Le=!!C.attributes.tangent&&(!!L.normalMap||L.anisotropy>0),De=!!C.morphAttributes.position,et=!!C.morphAttributes.normal,ht=!!C.morphAttributes.color;let it=ir;L.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(it=_.toneMapping);const Ot=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,rt=Ot!==void 0?Ot.length:0,Fe=$e.get(L),Dt=g.state.lights;if($===!0&&(re===!0||T!==S)){const En=T===S&&L.id===N;_e.setState(L,T,En)}let ft=!1;L.version===Fe.__version?(Fe.needsLights&&Fe.lightsStateVersion!==Dt.state.version||Fe.outputColorSpace!==fe||b.isBatchedMesh&&Fe.batching===!1||!b.isBatchedMesh&&Fe.batching===!0||b.isBatchedMesh&&Fe.batchingColor===!0&&b.colorTexture===null||b.isBatchedMesh&&Fe.batchingColor===!1&&b.colorTexture!==null||b.isInstancedMesh&&Fe.instancing===!1||!b.isInstancedMesh&&Fe.instancing===!0||b.isSkinnedMesh&&Fe.skinning===!1||!b.isSkinnedMesh&&Fe.skinning===!0||b.isInstancedMesh&&Fe.instancingColor===!0&&b.instanceColor===null||b.isInstancedMesh&&Fe.instancingColor===!1&&b.instanceColor!==null||b.isInstancedMesh&&Fe.instancingMorph===!0&&b.morphTexture===null||b.isInstancedMesh&&Fe.instancingMorph===!1&&b.morphTexture!==null||Fe.envMap!==he||L.fog===!0&&Fe.fog!==z||Fe.numClippingPlanes!==void 0&&(Fe.numClippingPlanes!==_e.numPlanes||Fe.numIntersection!==_e.numIntersection)||Fe.vertexAlphas!==Pe||Fe.vertexTangents!==Le||Fe.morphTargets!==De||Fe.morphNormals!==et||Fe.morphColors!==ht||Fe.toneMapping!==it||Fe.morphTargetsCount!==rt)&&(ft=!0):(ft=!0,Fe.__version=L.version);let si=Fe.currentProgram;ft===!0&&(si=Ie(L,B,b));let ho=!1,vr=!1,Cc=!1;const Bt=si.getUniforms(),Pi=Fe.uniforms;if(ke.useProgram(si.program)&&(ho=!0,vr=!0,Cc=!0),L.id!==N&&(N=L.id,vr=!0),ho||S!==T){Bt.setValue(k,"projectionMatrix",T.projectionMatrix),Bt.setValue(k,"viewMatrix",T.matrixWorldInverse);const En=Bt.map.cameraPosition;En!==void 0&&En.setValue(k,me.setFromMatrixPosition(T.matrixWorld)),ot.logarithmicDepthBuffer&&Bt.setValue(k,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(L.isMeshPhongMaterial||L.isMeshToonMaterial||L.isMeshLambertMaterial||L.isMeshBasicMaterial||L.isMeshStandardMaterial||L.isShaderMaterial)&&Bt.setValue(k,"isOrthographic",T.isOrthographicCamera===!0),S!==T&&(S=T,vr=!0,Cc=!0)}if(b.isSkinnedMesh){Bt.setOptional(k,b,"bindMatrix"),Bt.setOptional(k,b,"bindMatrixInverse");const En=b.skeleton;En&&(En.boneTexture===null&&En.computeBoneTexture(),Bt.setValue(k,"boneTexture",En.boneTexture,He))}b.isBatchedMesh&&(Bt.setOptional(k,b,"batchingTexture"),Bt.setValue(k,"batchingTexture",b._matricesTexture,He),Bt.setOptional(k,b,"batchingColorTexture"),b._colorsTexture!==null&&Bt.setValue(k,"batchingColorTexture",b._colorsTexture,He));const bc=C.morphAttributes;if((bc.position!==void 0||bc.normal!==void 0||bc.color!==void 0)&&Ce.update(b,C,si),(vr||Fe.receiveShadow!==b.receiveShadow)&&(Fe.receiveShadow=b.receiveShadow,Bt.setValue(k,"receiveShadow",b.receiveShadow)),L.isMeshGouraudMaterial&&L.envMap!==null&&(Pi.envMap.value=he,Pi.flipEnvMap.value=he.isCubeTexture&&he.isRenderTargetTexture===!1?-1:1),L.isMeshStandardMaterial&&L.envMap===null&&B.environment!==null&&(Pi.envMapIntensity.value=B.environmentIntensity),vr&&(Bt.setValue(k,"toneMappingExposure",_.toneMappingExposure),Fe.needsLights&&Un(Pi,Cc),z&&L.fog===!0&&se.refreshFogUniforms(Pi,z),se.refreshMaterialUniforms(Pi,L,J,Y,g.state.transmissionRenderTarget[T.id]),xl.upload(k,mt(Fe),Pi,He)),L.isShaderMaterial&&L.uniformsNeedUpdate===!0&&(xl.upload(k,mt(Fe),Pi,He),L.uniformsNeedUpdate=!1),L.isSpriteMaterial&&Bt.setValue(k,"center",b.center),Bt.setValue(k,"modelViewMatrix",b.modelViewMatrix),Bt.setValue(k,"normalMatrix",b.normalMatrix),Bt.setValue(k,"modelMatrix",b.matrixWorld),L.isShaderMaterial||L.isRawShaderMaterial){const En=L.uniformsGroups;for(let Rc=0,Ux=En.length;Rc<Ux;Rc++){const ah=En[Rc];We.update(ah,si),We.bind(ah,si)}}return si}function Un(T,B){T.ambientLightColor.needsUpdate=B,T.lightProbe.needsUpdate=B,T.directionalLights.needsUpdate=B,T.directionalLightShadows.needsUpdate=B,T.pointLights.needsUpdate=B,T.pointLightShadows.needsUpdate=B,T.spotLights.needsUpdate=B,T.spotLightShadows.needsUpdate=B,T.rectAreaLights.needsUpdate=B,T.hemisphereLights.needsUpdate=B}function qn(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(T,B,C){$e.get(T.texture).__webglTexture=B,$e.get(T.depthTexture).__webglTexture=C;const L=$e.get(T);L.__hasExternalTextures=!0,L.__autoAllocateDepthBuffer=C===void 0,L.__autoAllocateDepthBuffer||Ye.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),L.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,B){const C=$e.get(T);C.__webglFramebuffer=B,C.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(T,B=0,C=0){A=T,P=B,R=C;let L=!0,b=null,z=!1,te=!1;if(T){const he=$e.get(T);he.__useDefaultFramebuffer!==void 0?(ke.bindFramebuffer(k.FRAMEBUFFER,null),L=!1):he.__webglFramebuffer===void 0?He.setupRenderTarget(T):he.__hasExternalTextures&&He.rebindTextures(T,$e.get(T.texture).__webglTexture,$e.get(T.depthTexture).__webglTexture);const Pe=T.texture;(Pe.isData3DTexture||Pe.isDataArrayTexture||Pe.isCompressedArrayTexture)&&(te=!0);const Le=$e.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Le[B])?b=Le[B][C]:b=Le[B],z=!0):T.samples>0&&He.useMultisampledRTT(T)===!1?b=$e.get(T).__webglMultisampledFramebuffer:Array.isArray(Le)?b=Le[C]:b=Le,M.copy(T.viewport),I.copy(T.scissor),G=T.scissorTest}else M.copy(ne).multiplyScalar(J).floor(),I.copy(le).multiplyScalar(J).floor(),G=Re;if(ke.bindFramebuffer(k.FRAMEBUFFER,b)&&L&&ke.drawBuffers(T,b),ke.viewport(M),ke.scissor(I),ke.setScissorTest(G),z){const he=$e.get(T.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+B,he.__webglTexture,C)}else if(te){const he=$e.get(T.texture),Pe=B||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,he.__webglTexture,C||0,Pe)}N=-1},this.readRenderTargetPixels=function(T,B,C,L,b,z,te){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let fe=$e.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&te!==void 0&&(fe=fe[te]),fe){ke.bindFramebuffer(k.FRAMEBUFFER,fe);try{const he=T.texture,Pe=he.format,Le=he.type;if(!ot.textureFormatReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ot.textureTypeReadable(Le)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=T.width-L&&C>=0&&C<=T.height-b&&k.readPixels(B,C,L,b,Se.convert(Pe),Se.convert(Le),z)}finally{const he=A!==null?$e.get(A).__webglFramebuffer:null;ke.bindFramebuffer(k.FRAMEBUFFER,he)}}},this.readRenderTargetPixelsAsync=async function(T,B,C,L,b,z,te){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let fe=$e.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&te!==void 0&&(fe=fe[te]),fe){ke.bindFramebuffer(k.FRAMEBUFFER,fe);try{const he=T.texture,Pe=he.format,Le=he.type;if(!ot.textureFormatReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ot.textureTypeReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(B>=0&&B<=T.width-L&&C>=0&&C<=T.height-b){const De=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,De),k.bufferData(k.PIXEL_PACK_BUFFER,z.byteLength,k.STREAM_READ),k.readPixels(B,C,L,b,Se.convert(Pe),Se.convert(Le),0),k.flush();const et=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);await qE(k,et,4);try{k.bindBuffer(k.PIXEL_PACK_BUFFER,De),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,z)}finally{k.deleteBuffer(De),k.deleteSync(et)}return z}}finally{const he=A!==null?$e.get(A).__webglFramebuffer:null;ke.bindFramebuffer(k.FRAMEBUFFER,he)}}},this.copyFramebufferToTexture=function(T,B=null,C=0){T.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),B=arguments[0]||null,T=arguments[1]);const L=Math.pow(2,-C),b=Math.floor(T.image.width*L),z=Math.floor(T.image.height*L),te=B!==null?B.x:0,fe=B!==null?B.y:0;He.setTexture2D(T,0),k.copyTexSubImage2D(k.TEXTURE_2D,C,0,0,te,fe,b,z),ke.unbindTexture()},this.copyTextureToTexture=function(T,B,C=null,L=null,b=0){T.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),L=arguments[0]||null,T=arguments[1],B=arguments[2],b=arguments[3]||0,C=null);let z,te,fe,he,Pe,Le;C!==null?(z=C.max.x-C.min.x,te=C.max.y-C.min.y,fe=C.min.x,he=C.min.y):(z=T.image.width,te=T.image.height,fe=0,he=0),L!==null?(Pe=L.x,Le=L.y):(Pe=0,Le=0);const De=Se.convert(B.format),et=Se.convert(B.type);He.setTexture2D(B,0),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,B.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,B.unpackAlignment);const ht=k.getParameter(k.UNPACK_ROW_LENGTH),it=k.getParameter(k.UNPACK_IMAGE_HEIGHT),Ot=k.getParameter(k.UNPACK_SKIP_PIXELS),rt=k.getParameter(k.UNPACK_SKIP_ROWS),Fe=k.getParameter(k.UNPACK_SKIP_IMAGES),Dt=T.isCompressedTexture?T.mipmaps[b]:T.image;k.pixelStorei(k.UNPACK_ROW_LENGTH,Dt.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Dt.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,fe),k.pixelStorei(k.UNPACK_SKIP_ROWS,he),T.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,b,Pe,Le,z,te,De,et,Dt.data):T.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,b,Pe,Le,Dt.width,Dt.height,De,Dt.data):k.texSubImage2D(k.TEXTURE_2D,b,Pe,Le,De,et,Dt),k.pixelStorei(k.UNPACK_ROW_LENGTH,ht),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,it),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Ot),k.pixelStorei(k.UNPACK_SKIP_ROWS,rt),k.pixelStorei(k.UNPACK_SKIP_IMAGES,Fe),b===0&&B.generateMipmaps&&k.generateMipmap(k.TEXTURE_2D),ke.unbindTexture()},this.copyTextureToTexture3D=function(T,B,C=null,L=null,b=0){T.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),C=arguments[0]||null,L=arguments[1]||null,T=arguments[2],B=arguments[3],b=arguments[4]||0);let z,te,fe,he,Pe,Le,De,et,ht;const it=T.isCompressedTexture?T.mipmaps[b]:T.image;C!==null?(z=C.max.x-C.min.x,te=C.max.y-C.min.y,fe=C.max.z-C.min.z,he=C.min.x,Pe=C.min.y,Le=C.min.z):(z=it.width,te=it.height,fe=it.depth,he=0,Pe=0,Le=0),L!==null?(De=L.x,et=L.y,ht=L.z):(De=0,et=0,ht=0);const Ot=Se.convert(B.format),rt=Se.convert(B.type);let Fe;if(B.isData3DTexture)He.setTexture3D(B,0),Fe=k.TEXTURE_3D;else if(B.isDataArrayTexture||B.isCompressedArrayTexture)He.setTexture2DArray(B,0),Fe=k.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,B.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,B.unpackAlignment);const Dt=k.getParameter(k.UNPACK_ROW_LENGTH),ft=k.getParameter(k.UNPACK_IMAGE_HEIGHT),si=k.getParameter(k.UNPACK_SKIP_PIXELS),ho=k.getParameter(k.UNPACK_SKIP_ROWS),vr=k.getParameter(k.UNPACK_SKIP_IMAGES);k.pixelStorei(k.UNPACK_ROW_LENGTH,it.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,it.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,he),k.pixelStorei(k.UNPACK_SKIP_ROWS,Pe),k.pixelStorei(k.UNPACK_SKIP_IMAGES,Le),T.isDataTexture||T.isData3DTexture?k.texSubImage3D(Fe,b,De,et,ht,z,te,fe,Ot,rt,it.data):B.isCompressedArrayTexture?k.compressedTexSubImage3D(Fe,b,De,et,ht,z,te,fe,Ot,it.data):k.texSubImage3D(Fe,b,De,et,ht,z,te,fe,Ot,rt,it),k.pixelStorei(k.UNPACK_ROW_LENGTH,Dt),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,ft),k.pixelStorei(k.UNPACK_SKIP_PIXELS,si),k.pixelStorei(k.UNPACK_SKIP_ROWS,ho),k.pixelStorei(k.UNPACK_SKIP_IMAGES,vr),b===0&&B.generateMipmaps&&k.generateMipmap(Fe),ke.unbindTexture()},this.initRenderTarget=function(T){$e.get(T).__webglFramebuffer===void 0&&He.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?He.setTextureCube(T,0):T.isData3DTexture?He.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?He.setTexture2DArray(T,0):He.setTexture2D(T,0),ke.unbindTexture()},this.resetState=function(){P=0,R=0,A=null,ke.reset(),Ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===Jf?"display-p3":"srgb",n.unpackColorSpace=ct.workingColorSpace===Mc?"display-p3":"srgb"}}class ib extends pn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ai,this.environmentIntensity=1,this.environmentRotation=new Ai,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class vx extends co{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ut(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ql=new V,Jl=new V,Hm=new Lt,ma=new ex,tl=new Ec,Ou=new V,Vm=new V;class rb extends pn{constructor(e=new Ni,n=new vx){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)Ql.fromBufferAttribute(n,r-1),Jl.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=Ql.distanceTo(Jl);e.setAttribute("lineDistance",new rr(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),tl.copy(i.boundingSphere),tl.applyMatrix4(r),tl.radius+=s,e.ray.intersectsSphere(tl)===!1)return;Hm.copy(r).invert(),ma.copy(e.ray).applyMatrix4(Hm);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,u=this.isLineSegments?2:1,f=i.index,h=i.attributes.position;if(f!==null){const m=Math.max(0,a.start),y=Math.min(f.count,a.start+a.count);for(let v=m,g=y-1;v<g;v+=u){const d=f.getX(v),x=f.getX(v+1),_=nl(this,e,ma,c,d,x);_&&n.push(_)}if(this.isLineLoop){const v=f.getX(y-1),g=f.getX(m),d=nl(this,e,ma,c,v,g);d&&n.push(d)}}else{const m=Math.max(0,a.start),y=Math.min(h.count,a.start+a.count);for(let v=m,g=y-1;v<g;v+=u){const d=nl(this,e,ma,c,v,v+1);d&&n.push(d)}if(this.isLineLoop){const v=nl(this,e,ma,c,y-1,m);v&&n.push(v)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function nl(t,e,n,i,r,s){const a=t.geometry.attributes.position;if(Ql.fromBufferAttribute(a,r),Jl.fromBufferAttribute(a,s),n.distanceSqToSegment(Ql,Jl,Ou,Vm)>i)return;Ou.applyMatrix4(t.matrixWorld);const c=e.ray.origin.distanceTo(Ou);if(!(c<e.near||c>e.far))return{distance:c,point:Vm.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,object:t}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Qf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Qf);function sb(){const t=[],e=(W,oe,de,ve)=>{W.addEventListener(oe,de,ve),t.push(()=>W.removeEventListener(oe,de,ve))},n=matchMedia("(prefers-reduced-motion: reduce)").matches;function i(W){return function(){W|=0,W=W+1831565813|0;let oe=Math.imul(W^W>>>15,1|W);return oe=oe+Math.imul(oe^oe>>>7,61|oe)^oe,((oe^oe>>>14)>>>0)/4294967296}}const r=[["#7FD8E8","#1E5F7E"],["#E8C07F","#8A5A0B"],["#D98FA8","#5E2338"],["#9FB6E8","#2A3E7A"]];function s(W,oe,de){const ve=i(oe*7919+31),Oe=Math.min(devicePixelRatio,2),Te=W.clientWidth||300,ye=W.clientHeight||400;W.width=Te*Oe,W.height=ye*Oe;const Z=W.getContext("2d");Z.setTransform(Oe,0,0,Oe,0,0);const Ie=typeof Z.filter=="string",mt=Z.createLinearGradient(0,0,0,ye);mt.addColorStop(0,"#060A0D"),mt.addColorStop(.5,"#0A1116"),mt.addColorStop(1,"#03060A"),Z.fillStyle=mt,Z.fillRect(0,0,Te,ye);const Rt=r[Math.floor(ve()*r.length)];Z.globalCompositeOperation="lighter",Ie&&(Z.filter="blur("+Te*.012+"px)");const gr=de==="close"?2:3+Math.floor(ve()*3);for(let C=0;C<gr;C++){const L=Te*(.08+ve()*.84),b=Te*(.05+ve()*.2),z=(ve()-.5)*Te*.95,te=Z.createLinearGradient(L,0,L+z,ye*.9),fe=C%2?Rt[0]:Rt[1];te.addColorStop(0,fe),te.addColorStop(.3,fe),te.addColorStop(1,"rgba(0,0,0,0)"),Z.globalAlpha=.1+ve()*.14,Z.fillStyle=te,Z.beginPath(),Z.moveTo(L-3,-ye*.05),Z.lineTo(L+3,-ye*.05),Z.lineTo(L+z+b,ye*.95),Z.lineTo(L+z-b,ye*.95),Z.closePath(),Z.fill()}Ie&&(Z.filter="none");const Un=Z.createRadialGradient(Te*.5,ye*.3,0,Te*.5,ye*.3,ye*.8);Un.addColorStop(0,Rt[0]),Un.addColorStop(1,"rgba(0,0,0,0)"),Z.globalAlpha=.07,Z.fillStyle=Un,Z.fillRect(0,0,Te,ye);const qn=de==="close"?42:26;for(let C=0;C<qn;C++){const L=(de==="close"?5:3)+ve()*(de==="close"?24:14);Ie&&(Z.filter="blur("+L*.28+"px)");const b=ve()*Te,z=ve()*ye*.78,te=Z.createRadialGradient(b,z,0,b,z,L),fe=ve()>.55?Rt[0]:"#FFF0D2";te.addColorStop(0,fe),te.addColorStop(.6,fe),te.addColorStop(1,"rgba(0,0,0,0)"),Z.globalAlpha=.04+ve()*.16,Z.fillStyle=te,Z.beginPath(),Z.arc(b,z,L,0,Math.PI*2),Z.fill()}Ie&&(Z.filter="none"),Z.globalCompositeOperation="source-over",Z.globalAlpha=1;function T(C,L,b,z){Z.fillStyle="rgba(2,4,6,"+z+")",Z.beginPath(),Z.arc(C,L,b,0,Math.PI*2),Z.fill(),Z.beginPath(),Z.moveTo(C-b*2.1,L+b*3.6),Z.quadraticCurveTo(C-b*1.85,L+b*1.02,C,L+b*.92),Z.quadraticCurveTo(C+b*1.85,L+b*1.02,C+b*2.1,L+b*3.6),Z.closePath(),Z.fill()}if(de!=="close"){const C=de==="crowd"?3:2;for(let L=0;L<C;L++){const b=L/(C-1||1);Ie&&(Z.filter="blur("+(1-b)*Te*.012+"px)");const z=ye*(de==="crowd"?.7+b*.28:.84+b*.17),te=Te*(de==="crowd"?.026+b*.05:.017+b*.024),fe=.4+b*.55;let he=-te*2;for(;he<Te+te*2;)T(he,z-te*(1.4+ve()*.5),te*(.85+ve()*.35),fe),he+=te*(2.9+ve()*1.8)}if(Ie&&(Z.filter="none"),de==="stage"){const L=Te*(.36+ve()*.28),b=Te*.07,z=ye*.56;Z.fillStyle="rgba(1,3,5,.97)",Z.beginPath(),Z.arc(L,z,b,0,Math.PI*2),Z.fill(),Z.beginPath(),Z.moveTo(L-b*2.4,z+b*4.8),Z.quadraticCurveTo(L-b*2.05,z+b*1.05,L,z+b*.95),Z.quadraticCurveTo(L+b*2.05,z+b*1.05,L+b*2.4,z+b*4.8),Z.closePath(),Z.fill(),Z.lineWidth=b*.6,Z.lineCap="round",Z.strokeStyle="rgba(1,3,5,.97)",Z.beginPath(),Z.moveTo(L-b*1.5,z+b*1.7),Z.lineTo(L-b*2.7,z-b*1.8),Z.stroke(),Z.beginPath(),Z.moveTo(L+b*1.5,z+b*1.7),Z.lineTo(L+b*2.8,z-b*1.1),Z.stroke()}}else{Z.globalCompositeOperation="lighter";for(let C=0;C<3;C++){const L=ye*(.22+ve()*.55),b=Z.createLinearGradient(0,L,Te,L+(ve()-.5)*ye*.18);b.addColorStop(0,"rgba(0,0,0,0)"),b.addColorStop(.5,Rt[0]),b.addColorStop(1,"rgba(0,0,0,0)"),Z.globalAlpha=.13,Z.fillStyle=b,Z.fillRect(0,L-1,Te,2)}Z.globalCompositeOperation="source-over",Z.globalAlpha=1}const B=Z.createRadialGradient(Te/2,ye*.44,Math.min(Te,ye)*.2,Te/2,ye*.5,Math.max(Te,ye)*.82);B.addColorStop(0,"rgba(0,0,0,0)"),B.addColorStop(1,"rgba(0,0,0,.82)"),Z.fillStyle=B,Z.fillRect(0,0,Te,ye);try{const C=Z.getImageData(0,0,W.width,W.height),L=C.data;for(let b=0;b<L.length;b+=4){const z=(ve()-.5)*24;L[b]+=z,L[b+1]+=z,L[b+2]+=z}Z.putImageData(C,0,0)}catch{}}function a(){document.querySelectorAll("canvas[data-shot]").forEach(W=>s(W,+W.dataset.seed,W.dataset.shot))}const o=document.getElementById("wm"),c=document.getElementById("fitbox"),u=document.getElementById("slash"),f=o.querySelectorAll("em>i");function p(){o.style.transform="scale(1)";const W=o.offsetWidth,oe=o.offsetHeight;if(!W)return;const de=innerWidth>1240?.76:.9,ve=Math.min(innerWidth*de/W,1.4);o.style.transform="scale("+ve+")",c.style.height=oe*ve+"px"}document.fonts&&document.fonts.ready&&document.fonts.ready.then(p),e(window,"load",()=>{p(),a()});const h=setTimeout(()=>{p(),a()},260);t.push(()=>clearTimeout(h));let m;e(window,"resize",()=>{clearTimeout(m),m=setTimeout(()=>{p(),a()},250)}),t.push(()=>clearTimeout(m)),p(),a();const y=document.getElementById("hero");e(y,"mousemove",W=>{n||f.forEach(oe=>{const de=oe.getBoundingClientRect(),ve=de.left+de.width/2,Oe=de.top+de.height/2,Te=(W.clientX-ve)/innerWidth,ye=(W.clientY-Oe)/innerHeight;oe.style.transform="translate("+Te*-16+"px,"+ye*-10+"px)"})}),e(y,"mouseleave",()=>f.forEach(W=>{W.style.transform=""}));const v=document.getElementById("pct"),g=document.getElementById("pbar"),d=document.getElementById("pre");let x=0;o.querySelectorAll("em").forEach((W,oe)=>{W.style.transitionDelay=oe*.07+"s"});const _=setInterval(()=>{x+=Math.random()*12,x>=100&&(x=100,clearInterval(_),setTimeout(()=>{d.classList.add("done"),o.classList.add("on"),p(),a()},350)),v.textContent=Math.round(x),g.style.width=x+"%"},105);t.push(()=>clearInterval(_));const E=document.getElementById("cd"),P=document.getElementById("cr");let R=0,A=0,N=0,S=0;e(window,"mousemove",W=>{R=W.clientX,A=W.clientY,E.style.left=R+"px",E.style.top=A+"px"});let M;(function W(){N+=(R-N)*.14,S+=(A-S)*.14,P.style.left=N+"px",P.style.top=S+"px",M=requestAnimationFrame(W)})(),t.push(()=>cancelAnimationFrame(M)),e(document,"mouseover",W=>{W.target.closest("a,button,input,.crow,.slide")?P.classList.add("on"):P.classList.remove("on")}),document.querySelectorAll(".mag").forEach(W=>{e(W,"mousemove",oe=>{const de=W.getBoundingClientRect();W.style.transform="translate("+(oe.clientX-de.left-de.width/2)*.22+"px,"+(oe.clientY-de.top-de.height/2)*.32+"px)"}),e(W,"mouseleave",()=>{W.style.transform=""})});const I=new IntersectionObserver(W=>{W.forEach((oe,de)=>{oe.isIntersecting&&(setTimeout(()=>oe.target.classList.add("in"),de*90),I.unobserve(oe.target))})},{threshold:.12});document.querySelectorAll(".rv,.head").forEach(W=>I.observe(W)),t.push(()=>I.disconnect()),document.querySelectorAll("[data-go]").forEach(W=>{e(W,"click",()=>document.querySelector(W.dataset.go).scrollIntoView())});const G=document.getElementById("gal"),j=document.getElementById("track"),Q=document.querySelectorAll("[data-sp]"),X=document.getElementById("galbar"),Y=document.getElementById("galno");let J=0,O=!1;function ee(){J=scrollY,O||(requestAnimationFrame(ne),O=!0)}function ne(){if(O=!1,n||Q.forEach(W=>{W.style.transform="translateY("+J*+W.dataset.sp+"px)"}),!n&&G){const W=G.offsetHeight-innerHeight;if(W>0){const oe=G.getBoundingClientRect(),de=Math.min(1,Math.max(0,-oe.top/W)),ve=j.scrollWidth-innerWidth+64;j.style.transform="translateX("+-de*Math.max(0,ve)+"px)",X.style.width=de*100+"%",Y.textContent="0"+Math.min(6,Math.floor(de*6)+1)}else j.style.transform="none"}}e(window,"scroll",ee,{passive:!0}),e(window,"resize",ne),ne();const le={bass:[230,80,230],mid:[70,50,70,50,70],high:[24,24,24,24,24,24,24,24,24]};document.querySelectorAll(".hap").forEach(W=>{W.innerHTML="";const oe=le[W.dataset.band],de=oe.reduce((ve,Oe)=>ve+Oe,0);oe.forEach((ve,Oe)=>{const Te=document.createElement(Oe%2?"u":"i");Te.style.flex=ve/de+" 0 0",W.appendChild(Te)})});const Re=[];document.querySelectorAll(".scope").forEach(W=>Re.push({cv:W,band:W.dataset.band,boost:0}));function Je(W,oe){const de=W.cv,ve=Math.min(devicePixelRatio,2),Oe=de.clientWidth,Te=de.clientHeight;if(!Oe)return;de.width!==Oe*ve&&(de.width=Oe*ve,de.height=Te*ve);const ye=de.getContext("2d");ye.setTransform(ve,0,0,ve,0,0),ye.clearRect(0,0,Oe,Te),ye.strokeStyle="rgba(242,245,244,.06)",ye.lineWidth=1,ye.beginPath(),ye.moveTo(0,Te/2),ye.lineTo(Oe,Te/2),ye.stroke();const Z=Math.min(1,W.boost),Ie=Te*.32*(.5+W.boost*.7);ye.beginPath(),ye.lineWidth=1.1,ye.strokeStyle="rgba("+Math.round(242-186*Z)+","+Math.round(245-13*Z)+","+Math.round(244-38*Z)+","+(.42+.5*Z)+")";for(let mt=0;mt<=Oe;mt++){let Rt;W.band==="bass"?Rt=Te/2+Math.sin(mt*.035+oe*2.1)*Ie:W.band==="mid"?Rt=Te/2+(Math.sin(mt*.12+oe*3)*.65+Math.sin(mt*.31-oe*2)*.35)*Ie:Rt=Te/2+Math.sin(mt*.55+oe*6)*Ie*(.55+.45*Math.abs(Math.sin(mt*.05+oe))),mt===0?ye.moveTo(mt,Rt):ye.lineTo(mt,Rt)}ye.stroke(),W.boost*=.94}function $(W){if(!u)return;const oe=Math.min(devicePixelRatio,2),de=u.clientWidth,ve=u.clientHeight;if(!de)return;u.width!==de*oe&&(u.width=de*oe,u.height=ve*oe);const Oe=u.getContext("2d");Oe.setTransform(oe,0,0,oe,0,0),Oe.clearRect(0,0,de,ve);for(let Te=0;Te<3;Te++){Oe.beginPath(),Oe.lineWidth=Te===0?1.4:.8,Oe.strokeStyle="rgba(56,232,206,"+(Te===0?.45:.15)+")";for(let ye=0;ye<=de;ye+=2){const Z=Math.sin(Math.PI*ye/de),Ie=ve/2+Math.sin(ye*.012+W*1.4+Te*1.2)*ve*.3*Z+Math.sin(ye*.05-W*2.2)*ve*.1*Z;ye===0?Oe.moveTo(ye,Ie):Oe.lineTo(ye,Ie)}Oe.stroke()}}const re=document.getElementById("mon"),xe=document.getElementById("monwave");function me(W){if(!xe)return;const oe=Math.min(devicePixelRatio,2),de=xe.clientWidth,ve=xe.clientHeight;if(!de)return;xe.width!==de*oe&&(xe.width=de*oe,xe.height=ve*oe);const Oe=xe.getContext("2d");Oe.setTransform(oe,0,0,oe,0,0),Oe.clearRect(0,0,de,ve);const Te=34,ye=de/Te;for(let Z=0;Z<Te;Z++){let Ie;Ue&&k?Ie=je[Math.floor(Z/Te*je.length*.6)]/255:Ie=.06+Math.abs(Math.sin(W*1.6+Z*.42))*.14;const mt=Math.max(2,Ie*ve);Oe.fillStyle=k?"rgba(56,232,206,"+(.35+Ie*.65)+")":"rgba(242,245,244,.26)",Oe.fillRect(Z*ye+1,(ve-mt)/2,ye-2,mt)}}let Ee,Ue,je,k=!1,Xe,Ye,ot=0;function ke(){Ee=new(window.AudioContext||window.webkitAudioContext),Ue=Ee.createAnalyser(),Ue.fftSize=512,Ue.smoothingTimeConstant=.8,je=new Uint8Array(Ue.frequencyBinCount),Xe=Ee.createGain(),Xe.gain.value=.42,Xe.connect(Ue),Ue.connect(Ee.destination)}function Ke(W,oe,de,ve){const Oe=Ee.createOscillator(),Te=Ee.createGain();Oe.type=de||"sine",Oe.frequency.value=W,Te.gain.setValueAtTime(0,Ee.currentTime),Te.gain.linearRampToValueAtTime(ve||.5,Ee.currentTime+.012),Te.gain.exponentialRampToValueAtTime(1e-4,Ee.currentTime+oe),Oe.connect(Te),Te.connect(Xe),Oe.start(),Oe.stop(Ee.currentTime+oe+.05)}function $e(W,oe){const de=Math.floor(Ee.sampleRate*W),ve=Ee.createBuffer(1,de,Ee.sampleRate),Oe=ve.getChannelData(0);for(let Ie=0;Ie<de;Ie++)Oe[Ie]=(Math.random()*2-1)*(1-Ie/de);const Te=Ee.createBufferSource();Te.buffer=ve;const ye=Ee.createBiquadFilter();ye.type="highpass",ye.frequency.value=6500;const Z=Ee.createGain();Z.gain.value=oe,Te.connect(ye),ye.connect(Z),Z.connect(Xe),Te.start()}function He(W){if(navigator.vibrate&&!n)try{navigator.vibrate(W)}catch{}}const vt=[0,3,7,10,7,3,5,10];function D(){const W=ot%8;(W===0||W===4)&&(Ke(50,.45,"sine",.95),He([95])),(W===2||W===6)&&Ke(170,.15,"triangle",.3),W%2===1&&$e(.055,.15),Ke(220*Math.pow(2,vt[ot%vt.length]/12),.3,"sawtooth",.09),ot++}const w=document.getElementById("disc");function H(){Ee||ke(),Ee.state==="suspended"&&Ee.resume(),k?(clearInterval(Ye),k=!1,w.classList.remove("spin"),re&&re.classList.remove("live")):(D(),Ye=setInterval(D,300),k=!0,w.classList.add("spin"),re&&re.classList.add("live"))}e(w,"click",H),re&&e(re,"click",H),t.push(()=>{clearInterval(Ye),Ee&&Ee.close()});const ie={bass:[56,.5,"sine"],mid:[300,.28,"triangle"],high:[1500,.16,"square"]};document.querySelectorAll(".crow").forEach(W=>{e(W,"click",()=>{const oe=W.dataset.band;He(le[oe]),W.classList.remove("hit"),W.offsetWidth,W.classList.add("hit"),Re.forEach(ve=>{ve.band===oe&&(ve.boost=1.15)}),Ee||ke(),Ee.state==="suspended"&&Ee.resume();const de=ie[oe];Ke(de[0],de[1],de[2],.5)}),e(W,"mouseenter",()=>Re.forEach(oe=>{oe.band===W.dataset.band&&(oe.boost=.5)}))});const ae=document.getElementById("bars"),se=[];ae.innerHTML="";for(let W=0;W<72;W++){const oe=document.createElement("i");ae.appendChild(oe),se.push(oe)}const Ne=document.getElementById("stage"),ge=new nb({canvas:Ne,antialias:!0,alpha:!0});ge.setPixelRatio(Math.min(devicePixelRatio,1.75));const _e=new ib,Be=new Cn(46,1,.1,200);Be.position.set(0,5.4,17),Be.lookAt(0,1.2,-10);const ue=58,Ce=170,Ge=62,be=6,Se=-62,Ve=[];for(let W=0;W<ue;W++){const oe=W/(ue-1),de=be+(Se-be)*oe,ve=new Float32Array(Ce*3),Oe=new Float32Array(Ce*3);for(let Ie=0;Ie<Ce;Ie++)ve[Ie*3]=-Ge/2+Ge*(Ie/(Ce-1)),ve[Ie*3+1]=0,ve[Ie*3+2]=de;const Te=new Ni;Te.setAttribute("position",new Pn(ve,3)),Te.setAttribute("color",new Pn(Oe,3));const ye=new vx({vertexColors:!0,transparent:!0,opacity:.95,blending:Od,depthWrite:!1}),Z=new rb(Te,ye);_e.add(Z),Ve.push({g:Te,m:ye,z:de,zt:oe})}t.push(()=>{Ve.forEach(W=>{W.g.dispose(),W.m.dispose()}),ge.dispose()});const We={r:.22,g:.91,b:.81},at={r:.85,g:.65,b:.3};let F=.08,Me=.06,q=.05,K=0,pe=0,ze=0;e(window,"mousemove",W=>{pe=W.clientX/innerWidth-.5,ze=W.clientY/innerHeight-.5});function qe(){const W=Ne.clientWidth,oe=Ne.clientHeight;(Ne.width!==W||Ne.height!==oe)&&(ge.setSize(W,oe,!1),Be.aspect=W/oe,Be.updateProjectionMatrix())}function xt(){for(let W=0;W<Ve.length;W++){const oe=Ve[W],de=oe.g.attributes.position.array,ve=oe.g.attributes.color.array,Oe=oe.z,Te=Math.pow(1-oe.zt,.9);for(let ye=0;ye<Ce;ye++){const Z=de[ye*3],Ie=Math.sqrt(Z*Z+Oe*Oe),mt=Math.sin(Ie*.3-K*2)*(1+F*5.2)/(1+Ie*.055)+Math.sin(Z*.16+K*.9)*Math.cos(Oe*.13-K*.6)*(.35+Me*2.2)+Math.sin(Z*.62+K*3.4)*(q*.55);de[ye*3+1]=mt;let Rt=1-Math.pow(Math.abs(Z)/(Ge/2),2.2);Rt<0&&(Rt=0);const gr=Math.min(1,Math.abs(mt)*.5+.1),Un=Math.min(1,F*1.4),qn=(.16+gr*.9)*Rt*Te;ve[ye*3]=(We.r+(at.r-We.r)*Un)*qn,ve[ye*3+1]=(We.g+(at.g-We.g)*Un)*qn,ve[ye*3+2]=(We.b+(at.b-We.b)*Un)*qn}oe.g.attributes.position.needsUpdate=!0,oe.g.attributes.color.needsUpdate=!0}}let pt;function nt(W){pt=requestAnimationFrame(nt);const oe=(W||0)/1e3;if(Re.forEach(de=>Je(de,oe)),K+=n?.0022:.0105,Ue&&k){Ue.getByteFrequencyData(je);const de=je.length,ve=Math.floor(de*.06),Oe=Math.floor(de*.34);let Te=0,ye=0,Z=0,Ie;for(Ie=0;Ie<ve;Ie++)Te+=je[Ie];for(Ie=ve;Ie<Oe;Ie++)ye+=je[Ie];for(Ie=Oe;Ie<de;Ie++)Z+=je[Ie];for(F=F*.6+Te/ve/255*.4,Me=Me*.6+ye/(Oe-ve)/255*.4,q=q*.6+Z/(de-Oe)/255*.4,Ie=0;Ie<72;Ie++)se[Ie].style.height=2+je[Math.floor(Ie/72*de*.72)]/255*98+"%"}else{F=F*.95+.08*.05,Me=Me*.95+.06*.05,q=q*.95+.05*.05;for(let de=0;de<72;de++)se[de].style.height=2+Math.abs(Math.sin(K*2.2+de*.28))*9+"%"}scrollY>innerHeight*1.2||($(oe),me(oe),qe(),xt(),Be.position.x+=(pe*3.4-Be.position.x)*.035,Be.position.y+=(5.4-ze*1.8-Be.position.y)*.035,Be.lookAt(0,1.2,-10),ge.render(_e,Be))}return pt=requestAnimationFrame(nt),t.push(()=>cancelAnimationFrame(pt)),()=>t.forEach(W=>W())}const xx="medreh_users",$d="medreh_user";function mr(){try{return JSON.parse(localStorage.getItem(xx))||[]}catch{return[]}}function ea(t){localStorage.setItem(xx,JSON.stringify(t))}function ab(){const t=mr();t.some(e=>e.role==="admin")||(t.unshift({name:"Админ",email:"admin@medreh.mn",pass:Za("admin123"),role:"admin"}),ea(t))}function Za(t){return btoa(unescape(encodeURIComponent(t+"·medreh")))}function _x(t,e){const n=mr(),i=n.find(r=>r.email===t);return i?(Object.assign(i,e),ea(n),!0):!1}function ob(t,e){const n=mr().find(i=>i.email===t);return!!n&&n.pass===Za(e)}function lb(t,e){return _x(t,{pass:Za(e)})}function cb(){try{return JSON.parse(localStorage.getItem($d))}catch{return null}}function ga(t){t?localStorage.setItem($d,JSON.stringify(t)):localStorage.removeItem($d)}function Gm({name:t,autoComplete:e}){const[n,i]=U.useState(!1);return l.jsxs("span",{className:"pass-wrap",children:[l.jsx("input",{name:t,type:n?"text":"password",placeholder:"••••••••",autoComplete:e}),l.jsx("button",{type:"button",className:"pass-eye",onClick:()=>i(!n),"aria-label":n?"Нууц үг нуух":"Нууц үг харах",title:n?"Нуух":"Харах",children:n?l.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("path",{d:"M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"}),l.jsx("circle",{cx:"12",cy:"12",r:"2.6"})]}):l.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("path",{d:"M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"}),l.jsx("circle",{cx:"12",cy:"12",r:"2.6"}),l.jsx("line",{x1:"4",y1:"20",x2:"20",y2:"4"})]})})]})}function ub({open:t,onClose:e,onAuth:n}){const[i,r]=U.useState("login"),[s,a]=U.useState(""),[o,c]=U.useState("");if(U.useEffect(()=>{if(!t)return;r("login"),a(""),c("");const f=p=>{p.key==="Escape"&&e()};return addEventListener("keydown",f),()=>removeEventListener("keydown",f)},[t,e]),!t)return null;function u(f){f.preventDefault(),a(""),c("");const p=new FormData(f.target),h=(p.get("email")||"").trim().toLowerCase(),m=p.get("pass")||"";if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(h)){a("Имэйл хаяг буруу байна");return}if(m.length<6){a("Нууц үг дор хаяж 6 тэмдэгт байх ёстой");return}const y=mr();if(i==="register"){const v=(p.get("name")||"").trim(),g=p.get("pass2")||"";if(v.length<2){a("Нэрээ оруулна уу");return}if(m!==g){a("Нууц үг таарахгүй байна");return}if(y.some(d=>d.email===h)){a("Энэ имэйлээр аль хэдийн бүртгүүлсэн байна");return}y.push({name:v,email:h,pass:Za(m),role:"user",created:Date.now()}),ea(y),c("Амжилттай бүртгүүллээ! Одоо нэвтэрнэ үү."),setTimeout(()=>{r("login"),c("Бүртгэл үүслээ — имэйл, нууц үгээрээ нэвтэрнэ үү")},900)}else{const v=y.find(g=>g.email===h);if(!v){a("Энэ имэйл энэ төхөөрөмжид бүртгэлгүй байна. Эхлээд бүртгүүлнэ үү.");return}if(v.pass!==Za(m)){a("Нууц үг буруу байна");return}n({name:v.name,email:v.email,role:v.role||"user",sub:v.sub||null}),c("Тавтай морил, "+v.name+"!"),setTimeout(e,700)}}return l.jsx("div",{className:"auth-ov",onMouseDown:f=>{f.target===f.currentTarget&&e()},children:l.jsxs("div",{className:"auth-box",role:"dialog","aria-modal":"true","aria-label":"Нэвтрэх / Бүртгүүлэх",children:[l.jsx("button",{className:"auth-x",onClick:e,"aria-label":"Хаах",children:"✕"}),l.jsx("span",{className:"mono",children:"МЭДРЭХ® / Хандалт"}),l.jsxs("div",{className:"auth-tabs",children:[l.jsx("button",{className:i==="login"?"on":"",onClick:()=>{r("login"),a(""),c("")},children:"Нэвтрэх"}),l.jsx("button",{className:i==="register"?"on":"",onClick:()=>{r("register"),a(""),c("")},children:"Бүртгүүлэх"})]}),l.jsxs("form",{onSubmit:u,children:[i==="register"&&l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Нэр"}),l.jsx("input",{name:"name",type:"text",placeholder:"Таны нэр",autoComplete:"name"})]}),l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Имэйл"}),l.jsx("input",{name:"email",type:"email",placeholder:"you@mail.com",autoComplete:"email"})]}),l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Нууц үг"}),l.jsx(Gm,{name:"pass",autoComplete:i==="login"?"current-password":"new-password"})]}),i==="register"&&l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Нууц үг давтах"}),l.jsx(Gm,{name:"pass2",autoComplete:"new-password"})]}),s&&l.jsx("p",{className:"auth-err",children:s}),o&&l.jsx("p",{className:"auth-ok",children:o}),l.jsx("button",{type:"submit",className:"bt bt-a auth-sub",children:i==="login"?"Нэвтрэх →":"Бүртгүүлэх →"})]},i),l.jsx("p",{className:"auth-note mono",children:"Демо горим — өгөгдөл зөвхөн энэ төхөөрөмжид хадгалагдана"})]})})}const db="medreh-files",Wr="files";function th(){return new Promise((t,e)=>{const n=indexedDB.open(db,1);n.onupgradeneeded=()=>n.result.createObjectStore(Wr),n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function Wm(t,e){const n=await th();return new Promise((i,r)=>{const s=n.transaction(Wr,"readwrite");s.objectStore(Wr).put(e,t),s.oncomplete=()=>i(),s.onerror=()=>r(s.error)})}async function Xm(t){const e=await th();return new Promise((n,i)=>{const r=e.transaction(Wr).objectStore(Wr).get(t);r.onsuccess=()=>n(r.result||null),r.onerror=()=>i(r.error)})}async function $m(t){const e=await th();return new Promise((n,i)=>{const r=e.transaction(Wr,"readwrite");r.objectStore(Wr).delete(t),r.oncomplete=()=>n(),r.onerror=()=>i(r.error)})}const yx="medreh_custom_tracks",Sx="medreh_feed";function La(){try{return JSON.parse(localStorage.getItem(yx))||[]}catch{return[]}}function Mx(t){localStorage.setItem(yx,JSON.stringify(t)),dispatchEvent(new CustomEvent("medreh:library-changed"))}async function fb(t){const e=La().filter(n=>n.id!==t);await $m("audio-"+t).catch(()=>{}),await $m("cover-"+t).catch(()=>{}),Mx(e)}function ec(){try{return JSON.parse(localStorage.getItem(Sx))||[]}catch{return[]}}function nh(t,e="🎵"){const n=[{id:Date.now(),text:t,icon:e,date:Date.now()},...ec()].slice(0,30);localStorage.setItem(Sx,JSON.stringify(n)),dispatchEvent(new CustomEvent("medreh:feed-changed"))}function hb(){ec().length===0&&nh("МЭДРЭХ-д тавтай морил! Дуугаа сонгоод мэдэрч эхлээрэй","🎉")}function pb(t){return+(localStorage.getItem("medreh_feed_read:"+t)||0)}function mb(t){localStorage.setItem("medreh_feed_read:"+t,String(Date.now()))}const qm={total:0,vib:0,byGenre:{},byTrack:{},days:{}};function gb(t){try{return{...qm,...JSON.parse(localStorage.getItem("medreh_stats:"+t))||{}}}catch{return{...qm}}}function Ym(t,e){localStorage.setItem("medreh_stats:"+t,JSON.stringify(e))}function Ex(t=new Date){return t.toISOString().slice(0,10)}function ih(t){try{return JSON.parse(localStorage.getItem("medreh_payments:"+t))||[]}catch{return[]}}function vb(t,e){const n=[e,...ih(t)];localStorage.setItem("medreh_payments:"+t,JSON.stringify(n))}const wx=t=>"medreh_playlists:"+t;function fo(t){try{return JSON.parse(localStorage.getItem(wx(t)))||[]}catch{return[]}}function Ac(t,e){localStorage.setItem(wx(t),JSON.stringify(e)),dispatchEvent(new CustomEvent("medreh:playlists-changed"))}function xb(t,e){const n={id:"pl"+Date.now(),name:e,tracks:[],created:Date.now()};return Ac(t,[n,...fo(t)]),n}function _b(t,e){Ac(t,fo(t).filter(n=>n.id!==e))}function yb(t,e,n){const i=fo(t),r=i.find(s=>s.id===e);r&&!r.tracks.includes(n)&&(r.tracks=[n,...r.tracks],Ac(t,i))}function Sb(t,e,n){const i=fo(t),r=i.find(s=>s.id===e);r&&(r.tracks=r.tracks.filter(s=>s!==n),Ac(t,i))}function Mb({open:t,onClose:e,currentUser:n}){const[i,r]=U.useState([]),[s,a]=U.useState([]),[o,c]=U.useState("users"),[u,f]=U.useState(!1),[p,h]=U.useState("");if(U.useEffect(()=>{if(!t)return;r(mr()),a(La()),h("");const d=x=>{x.key==="Escape"&&e()};return addEventListener("keydown",d),()=>removeEventListener("keydown",d)},[t,e]),!t)return null;function m(d){if(!confirm(d+" — энэ хэрэглэгчийг устгах уу?"))return;const x=i.filter(_=>_.email!==d);ea(x),r(x),dispatchEvent(new CustomEvent("medreh:users-changed"))}async function y(d){d.preventDefault(),h("");const x=new FormData(d.target),_=(x.get("title")||"").trim(),E=(x.get("singer")||"").trim(),P=(x.get("composer")||"").trim(),R=(x.get("genre")||"").trim()||"Бусад",A=x.get("audio"),N=x.get("cover"),S=(x.get("coverUrl")||"").trim();if(_.length<2){h("❌ Дууны нэрээ оруулна уу");return}if(E.length<2){h("❌ Дуучны нэрээ оруулна уу");return}if(!A||!A.size){h("❌ Дууны mp3 файлаа сонгоно уу — энэ нь тоглогдох дуу тул заавал шаардлагатай");return}if(!/audio\//.test(A.type)){h("❌ Аудио талбарт зөвхөн дууны файл (mp3) оруулна — зураг биш");return}if(S&&!/^https?:\/\//.test(S)){h("❌ Зургийн линк http(s)://-ээр эхлэх ёстой");return}f(!0);try{const M="c"+Date.now();await Wm("audio-"+M,A),N&&N.size&&await Wm("cover-"+M,N);const G=[{id:M,title:_,singer:E,composer:P,genre:R,hasCover:!!(N&&N.size),coverUrl:!N||!N.size?S:"",added:Date.now()},...La()];Mx(G),a(G),nh("Шинэ дуу нэмэгдлээ: «"+_+"» — "+E,"🎵"),h("✅ «"+_+"» амжилттай нэмэгдлээ. Хэрэглэгчдэд мэдэгдэл илгээгдсэн."),d.target.reset()}catch(M){h("❌ Хадгалахад алдаа гарлаа: "+M.message)}f(!1)}async function v(d){confirm("«"+d.title+"» дууг устгах уу?")&&(await fb(d.id),a(La()))}const g=i.filter(d=>d.role!=="admin");return l.jsx("div",{className:"auth-ov",onMouseDown:d=>{d.target===d.currentTarget&&e()},children:l.jsxs("div",{className:"auth-box admin-box",role:"dialog","aria-modal":"true","aria-label":"Админ самбар",children:[l.jsx("button",{className:"auth-x",onClick:e,"aria-label":"Хаах",children:"✕"}),l.jsx("span",{className:"mono",children:"МЭДРЭХ® / Админ самбар"}),l.jsxs("div",{className:"auth-tabs",style:{marginBottom:0},children:[l.jsx("button",{className:o==="users"?"on":"",onClick:()=>c("users"),children:"Хэрэглэгчид"}),l.jsx("button",{className:o==="tracks"?"on":"",onClick:()=>c("tracks"),children:"Дууны сан"})]}),o==="users"&&l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"adm-stats",children:[l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Нийт бүртгэл"}),l.jsx("b",{children:g.length})]}),l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"PRO захиалагч"}),l.jsx("b",{children:g.filter(d=>{var x;return(x=d.sub)==null?void 0:x.active}).length})]})]}),l.jsxs("div",{className:"adm-list",children:[l.jsxs("div",{className:"adm-row adm-head",children:[l.jsx("span",{className:"mono",children:"Нэр"}),l.jsx("span",{className:"mono",children:"Имэйл"}),l.jsx("span",{className:"mono",children:"Огноо"}),l.jsx("span",{className:"mono",children:"Захиалга"}),l.jsx("span",{})]}),g.length===0&&l.jsx("p",{className:"adm-empty",children:"Одоогоор бүртгүүлсэн хэрэглэгч алга"}),g.map(d=>{var x,_;return l.jsxs("div",{className:"adm-row",children:[l.jsx("span",{children:d.name}),l.jsx("span",{className:"adm-mail",children:d.email}),l.jsx("span",{className:"adm-date",children:d.created?new Date(d.created).toLocaleDateString("mn-MN"):"—"}),l.jsx("span",{className:"adm-sub"+((x=d.sub)!=null&&x.active?" on":""),children:(_=d.sub)!=null&&_.active?"PRO":"—"}),l.jsx("button",{className:"adm-del",onClick:()=>m(d.email),"aria-label":d.email+" устгах",children:"Устгах"})]},d.email)})]})]}),o==="tracks"&&l.jsxs(l.Fragment,{children:[l.jsxs("form",{className:"adm-form",onSubmit:y,children:[l.jsx("span",{className:"mono",style:{fontSize:9.5},children:"Шинэ дуу нэмэх"}),l.jsxs("div",{className:"adm-form-row",children:[l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Дууны нэр *"}),l.jsx("input",{name:"title",type:"text",placeholder:"ж: Хөх тэнгэр"})]}),l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Дуучин *"}),l.jsx("input",{name:"singer",type:"text",placeholder:"ж: Батаа"})]})]}),l.jsxs("div",{className:"adm-form-row",children:[l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Зохиолч (заавал биш)"}),l.jsx("input",{name:"composer",type:"text",placeholder:"ж: Д.Дорж"})]}),l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Төрөл (заавал биш)"}),l.jsx("input",{name:"genre",type:"text",placeholder:"ж: Поп",list:"genres"}),l.jsxs("datalist",{id:"genres",children:[l.jsx("option",{value:"Поп"}),l.jsx("option",{value:"Рок"}),l.jsx("option",{value:"Хип хоп"}),l.jsx("option",{value:"Электрон"}),l.jsx("option",{value:"Ардын"}),l.jsx("option",{value:"Чилл"})]})]})]}),l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"🎵 Дууны файл (mp3) *"}),l.jsx("input",{name:"audio",type:"file",accept:"audio/*",className:"adm-file"})]}),l.jsxs("div",{className:"adm-cover",children:[l.jsx("span",{className:"mono",children:"🖼 Обложка зураг — заавал биш, аль нэгийг нь л оруулна"}),l.jsxs("div",{className:"adm-form-row",children:[l.jsxs("label",{children:[l.jsx("span",{className:"mono",style:{color:"var(--faint)"},children:"Файлаар"}),l.jsx("input",{name:"cover",type:"file",accept:"image/*",className:"adm-file"})]}),l.jsxs("label",{children:[l.jsx("span",{className:"mono",style:{color:"var(--faint)"},children:"Эсвэл линкээр"}),l.jsx("input",{name:"coverUrl",type:"url",placeholder:"https://..."})]})]}),l.jsx("p",{className:"adm-hint",children:"Хоёуланг нь оруулбал файл нь ашиглагдана. Юу ч оруулаагүй бол автомат обложка тавигдана."})]}),p&&l.jsx("p",{className:p.startsWith("✅")?"auth-ok":"auth-err",style:{fontSize:13},children:p}),l.jsx("button",{type:"submit",className:"bt bt-a auth-sub",disabled:u,children:u?"Хадгалж байна…":"+ Дуу нэмэх"})]}),l.jsxs("div",{className:"adm-list",children:[l.jsxs("div",{className:"adm-row adm-head adm-row-t",children:[l.jsx("span",{className:"mono",children:"Нэр"}),l.jsx("span",{className:"mono",children:"Төрөл"}),l.jsx("span",{className:"mono",children:"Огноо"}),l.jsx("span",{})]}),s.length===0&&l.jsx("p",{className:"adm-empty",children:"Админы нэмсэн дуу алга — үндсэн 6 демо дуу ажиллаж байна"}),s.map(d=>l.jsxs("div",{className:"adm-row adm-row-t",children:[l.jsxs("span",{children:[d.title," ",l.jsxs("i",{className:"adm-artist",children:["— ",d.singer||d.artist]}),d.composer&&l.jsxs("i",{className:"adm-artist",children:[" · зох. ",d.composer]})]}),l.jsx("span",{className:"adm-date",children:d.genre}),l.jsx("span",{className:"adm-date",children:new Date(d.added).toLocaleDateString("mn-MN")}),l.jsx("button",{className:"adm-del",onClick:()=>v(d),children:"Устгах"})]},d.id))]})]}),l.jsxs("p",{className:"auth-note mono",children:["Нэвтэрсэн: ",n==null?void 0:n.email]})]})})}const Tx="/assets/gal-01-BmF_rInK.jpg",rh="/assets/gal-02-BmiPgtM2.jpg",Ax="/assets/gal-03-CpoeRbUW.jpg",Cx="/assets/gal-04-DThaAW-j.jpg",bx="/assets/gal-05-BQMWFLMO.jpg",Rx="/assets/gal-06-BiTMBND7.jpg",Bu=[{id:1,title:"Гүн долгион",artist:"SoundHelix",genre:"Электрон",file:"/tracks/song-1.mp3",cover:Tx},{id:2,title:"Шөнийн хэмнэл",artist:"SoundHelix",genre:"Чилл",file:"/tracks/song-2.mp3",cover:rh},{id:3,title:"Хотын гэрэл",artist:"SoundHelix",genre:"Синт поп",file:"/tracks/song-3.mp3",cover:Ax},{id:4,title:"Цахилгаан зүрх",artist:"SoundHelix",genre:"Данс",file:"/tracks/song-4.mp3",cover:Cx},{id:5,title:"Мөрөөдлийн зам",artist:"SoundHelix",genre:"Эмбиент",file:"/tracks/song-8.mp3",cover:bx},{id:6,title:"Аянгын цохилт",artist:"SoundHelix",genre:"Электрон рок",file:"/tracks/song-9.mp3",cover:Rx}],Eb=[{key:"bass",label:"Бас",hz:"55 Hz",freq:55,type:"sine",dur:.7,vib:[220]},{key:"mid",label:"Дунд",hz:"330 Hz",freq:330,type:"triangle",dur:.45,vib:[60,40,60]},{key:"high",label:"Өндөр",hz:"1.8 kHz",freq:1800,type:"square",dur:.3,vib:[15,20,15,20,15]}];function wb({open:t,onClose:e,onDone:n}){const[i,r]=U.useState(0),[s,a]=U.useState(1),[o,c]=U.useState(1),[u,f]=U.useState({bass:!0,mid:!0,high:!0}),[p,h]=U.useState(!1),m=U.useRef(null),y=typeof navigator<"u"&&!!navigator.vibrate;if(U.useEffect(()=>{t&&(r(0),h(!1)),!t&&m.current&&(m.current.close().catch(()=>{}),m.current=null)},[t]),!t)return null;function v(N,S,M){m.current||(m.current=new(window.AudioContext||window.webkitAudioContext));const I=m.current;I.state==="suspended"&&I.resume();const G=I.createOscillator(),j=I.createGain();G.type=M,G.frequency.value=N,j.gain.setValueAtTime(0,I.currentTime),j.gain.linearRampToValueAtTime(.5,I.currentTime+.02),j.gain.exponentialRampToValueAtTime(1e-4,I.currentTime+S),G.connect(j),j.connect(I.destination),G.start(),G.stop(I.currentTime+S+.05)}function g(N){if(y)try{navigator.vibrate(N)}catch{}}function d(){h(!0),g([300]),v(55,.8,"sine")}function x(N){v(N.freq,N.dur,N.type),g(N.vib)}function _(N){f(S=>{const M={...S,[N]:!S[N]};return!M.bass&&!M.mid&&!M.high?S:M})}function E(){n({vib:s,light:o,bands:u,calibrated:!0}),e()}const P=[{label:"Тод мэдэрсэн",hint:"Сул горим тохирно",val:0},{label:"Бага зэрэг",hint:"Дунд горим тохирно",val:1},{label:"Мэдрээгүй",hint:"Хүчтэй горим тохирно",val:2}],R=[{label:"Хэт тод байна",hint:"Бүдэг горим",val:0},{label:"Яг таарсан",hint:"Дунд горим",val:1},{label:"Бүдэг харагдсан",hint:"Тод горим",val:2}],A=["","Чичиргээ","Гэрэл","Давтамж","Дүгнэлт"];return l.jsx("div",{className:"cal-ov",role:"dialog","aria-modal":"true","aria-label":"Мэдрэхүйн калибровк",children:l.jsxs("div",{className:"cal-box",children:[i>0&&l.jsx("div",{className:"cal-prog","aria-hidden":"true",children:[1,2,3,4].map(N=>l.jsx("i",{className:i>=N?"on":""},N))}),i===0&&l.jsxs("div",{className:"cal-step",children:[l.jsx("span",{className:"cal-big","aria-hidden":"true",children:"🎛"}),l.jsx("h2",{children:"Мэдрэхүйн калибровк"}),l.jsxs("p",{children:["Сонсголын мэдрэмж хүн бүрд өөр. Богино тестээр таны ",l.jsx("b",{children:"мэдрэх босгыг"})," тодорхойлж, чичиргээ болон гэрлийн тохиргоог танд яг тааруулж өгье. Ердөө 1 минут зарцуулна."]}),l.jsxs("div",{className:"cal-row",children:[l.jsx("button",{className:"bt bt-a",onClick:()=>r(1),children:"Эхлэх →"}),l.jsx("button",{className:"bt",onClick:e,children:"Дараа хийе"})]})]}),i===1&&l.jsxs("div",{className:"cal-step",children:[l.jsxs("span",{className:"mono",children:["1 / 4 · ",A[1]]}),l.jsx("h2",{children:"Чичиргээг мэдэрч үзье"}),y?l.jsx("p",{children:"Утсаа гартаа барьж байгаад доорх товчийг дараарай — 0.3 секундын чичиргээ өгнө."}):l.jsx("p",{children:"Энэ төхөөрөмж чичиргээгүй тул дууны туршилт хийнэ. Утсан дээр дахин калибровк хийхэд чичиргээ нэмэгдэнэ."}),l.jsxs("button",{className:"cal-test"+(p?" done":""),onClick:d,children:["📳 ",p?"Дахин туршиж үзэх":"Туршиж үзэх"]}),l.jsx("div",{className:"cal-ans",children:P.map(N=>l.jsxs("button",{className:s===N.val&&p?"on":"",disabled:!p,onClick:()=>{a(N.val),r(2)},children:[l.jsx("b",{children:N.label}),l.jsx("span",{children:N.hint})]},N.val))})]}),i===2&&l.jsxs("div",{className:"cal-step",children:[l.jsxs("span",{className:"mono",children:["2 / 4 · ",A[2]]}),l.jsx("h2",{children:"Гэрлийн пульс хэр харагдаж байна?"}),l.jsx("div",{className:"cal-pulse-wrap","aria-hidden":"true",children:l.jsx("span",{className:"cal-pulse"})}),l.jsx("div",{className:"cal-ans",children:R.map(N=>l.jsxs("button",{onClick:()=>{c(N.val),r(3)},children:[l.jsx("b",{children:N.label}),l.jsx("span",{children:N.hint})]},N.val))})]}),i===3&&l.jsxs("div",{className:"cal-step",children:[l.jsxs("span",{className:"mono",children:["3 / 4 · ",A[3]]}),l.jsx("h2",{children:"Аль давтамжийг мэдэрдэг вэ?"}),l.jsx("p",{children:"Тус бүрийг туршаад, мэдэрсэн бүсүүдээ идэвхтэй үлдээгээрэй. Идэвхгүй бүс чичиргээ өгөхгүй."}),l.jsx("div",{className:"cal-bands",children:Eb.map(N=>l.jsxs("div",{className:"cal-band"+(u[N.key]?" on":""),children:[l.jsx("button",{className:"cal-band-play",onClick:()=>x(N),"aria-label":N.label+" туршиж үзэх",children:"▶"}),l.jsxs("div",{className:"cal-band-meta",children:[l.jsx("b",{children:N.label}),l.jsx("span",{className:"mono",children:N.hz})]}),l.jsx("button",{className:"cal-band-tgl",onClick:()=>_(N.key),"aria-pressed":u[N.key],children:u[N.key]?"✓ Мэдэрсэн":"Мэдрээгүй"})]},N.key))}),l.jsx("div",{className:"cal-row",children:l.jsx("button",{className:"bt bt-a",onClick:()=>r(4),children:"Үргэлжлүүлэх →"})})]}),i===4&&l.jsxs("div",{className:"cal-step",children:[l.jsxs("span",{className:"mono",children:["4 / 4 · ",A[4]]}),l.jsx("span",{className:"cal-big","aria-hidden":"true",children:"✓"}),l.jsx("h2",{children:"Таны мэдрэхүйн профайл"}),l.jsxs("div",{className:"cal-sum",children:[l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Чичиргээ"}),l.jsx("b",{children:["Сул","Дунд","Хүчтэй"][s]})]}),l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Гэрэл"}),l.jsx("b",{children:["Бүдэг","Дунд","Тод"][o]})]}),l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Бүс"}),l.jsx("b",{children:[u.bass&&"Бас",u.mid&&"Дунд",u.high&&"Өндөр"].filter(Boolean).join(" · ")})]})]}),l.jsx("p",{className:"cal-note",children:"Тохиргоог хүссэн үедээ ⚙️ цэснээс өөрчилж, дахин калибровк хийж болно."}),l.jsx("div",{className:"cal-row",children:l.jsx("button",{className:"bt bt-a",onClick:E,children:"Хадгалаад эхлэх →"})})]})]})})}const Pr=30,Km=[{label:"Сул",mult:.5},{label:"Дунд",mult:1},{label:"Хүчтэй",mult:1.7}],Zm=[{label:"Бүдэг",mult:.5},{label:"Дунд",mult:1},{label:"Тод",mult:1.7}],va={vib:1,light:1,bands:{bass:!0,mid:!0,high:!0},calibrated:!1},Nx={Электрон:{bass:78,mid:52,high:38,pattern:[230,80,230],text:"Гүн бас давамгайлсан — урт, хүчтэй чичиргээ голлон мэдрэгдэнэ. Гар дээр аажуу лугшилт болж бууна."},Чилл:{bass:46,mid:62,high:30,pattern:[140,90,140,90],text:"Зөөлөн дунд давтамжтай — намуухан, урсгал мэт хэмнэлтэй чичиргээ. Тайвшруулах мэдрэмж өгнө."},"Синт поп":{bass:58,mid:72,high:55,pattern:[80,50,80,50,120],text:"Тод аялгуу, дунд бүс голлосон — хэмнэлтэй, «дуулж» буй мэт чичиргээ мэдрэгдэнэ."},Данс:{bass:86,mid:48,high:52,pattern:[95,55,95,55,95],text:"Хүчтэй тогтмол цохилт — бүжгийн хэмнэл шиг тэнцүү зайтай, эрчтэй чичиргээ. Хамгийн «мэдрэгддэг» төрөл."},Эмбиент:{bass:36,mid:56,high:46,pattern:[300,220,300],text:"Уужим, удаан өөрчлөгдөх дуу — маш зөөлөн, урт долгион мэт чичиргээ. Гэрлийн пульс нь гол мэдрэмж."},"Электрон рок":{bass:72,mid:68,high:62,pattern:[60,40,60,40,130],text:"Бүх бүс идэвхтэй — богино түргэн + урт хүчтэй чичиргээ ээлжилнэ. Эрч хүчтэй мэдрэмж."}},Px={bass:55,mid:55,high:45,pattern:[120,70,120],text:"Олон төрлийн давтамж холилдсон — дунд зэргийн хэмнэлтэй чичиргээ мэдрэгдэнэ."},mi={users:l.jsxs(l.Fragment,{children:[l.jsx("path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}),l.jsx("circle",{cx:"9",cy:"7",r:"4"}),l.jsx("path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}),l.jsx("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]}),gem:l.jsxs(l.Fragment,{children:[l.jsx("path",{d:"M6 3h12l4 6-10 12L2 9l4-6z"}),l.jsx("path",{d:"M2 9h20"}),l.jsx("path",{d:"m12 21-4-12 2.5-6"}),l.jsx("path",{d:"m12 21 4-12-2.5-6"})]}),money:l.jsxs(l.Fragment,{children:[l.jsx("rect",{x:"2",y:"6",width:"20",height:"12",rx:"2"}),l.jsx("circle",{cx:"12",cy:"12",r:"3"}),l.jsx("path",{d:"M6 10v4M18 10v4"})]}),music:l.jsxs(l.Fragment,{children:[l.jsx("path",{d:"M9 18V5l12-2v13"}),l.jsx("circle",{cx:"6",cy:"18",r:"3"}),l.jsx("circle",{cx:"18",cy:"16",r:"3"})]}),phones:l.jsxs(l.Fragment,{children:[l.jsx("path",{d:"M3 14v-2a9 9 0 0 1 18 0v2"}),l.jsx("rect",{x:"3",y:"14",width:"4",height:"6",rx:"2"}),l.jsx("rect",{x:"17",y:"14",width:"4",height:"6",rx:"2"})]}),vibrate:l.jsxs(l.Fragment,{children:[l.jsx("rect",{x:"8",y:"3",width:"8",height:"18",rx:"2"}),l.jsx("path",{d:"M3 9v6M21 9v6"}),l.jsx("path",{d:"M5.5 10.5v3M18.5 10.5v3"})]}),star:l.jsx("path",{d:"m12 2 3 6.6 7 .9-5.2 4.8 1.4 7-6.2-3.6L5.8 21l1.4-7L2 9.5l7-.9z"}),horn:l.jsxs(l.Fragment,{children:[l.jsx("path",{d:"m3 10 16-5v14L3 14v-4z"}),l.jsx("path",{d:"M7 14.5V18a2 2 0 0 0 4 0v-2.3"}),l.jsx("path",{d:"M21 9v6"})]})};function Qm(t){if(!isFinite(t))return"0:00";const e=Math.floor(t/60),n=Math.floor(t%60);return e+":"+String(n).padStart(2,"0")}function zu(t){if(t<60)return t+" сек";const e=Math.floor(t/3600),n=Math.floor(t%3600/60);return e>0?e+" цаг "+n+" мин":n+" мин"}function Tb(t){const e=Math.floor((Date.now()-t)/6e4);return e<1?"дөнгөж сая":e<60?e+" мин өмнө":e<1440?Math.floor(e/60)+" цаг өмнө":Math.floor(e/1440)+" өдрийн өмнө"}function ur({title:t,onBack:e}){return l.jsxs("div",{className:"sp-backbar",children:[l.jsx("button",{className:"sp-back",onClick:e,children:"← Буцах"}),l.jsx("h2",{className:"sp-h",style:{margin:0},children:t})]})}function ju({tracks:t,curId:e,playing:n,onPlay:i}){return l.jsx("div",{className:"sp-side-recent",children:t.map(r=>l.jsxs("button",{className:"sp-rcard"+(e===r.id?" on":""),onClick:()=>i(r),children:[l.jsx("img",{src:r.cover,alt:""}),l.jsx("span",{children:r.title}),e===r.id&&n?l.jsxs("span",{className:"pl-eq sp-req","aria-hidden":"true",children:[l.jsx("u",{}),l.jsx("u",{}),l.jsx("u",{})]}):l.jsx("i",{"aria-hidden":"true",children:"▶"})]},r.id))})}const Lx=U.createContext(null);function Ab({children:t}){var p;const[e,n]=U.useState(cb),i=(e==null?void 0:e.role)||null,r=i==="admin",s=r||!!((p=e==null?void 0:e.sub)!=null&&p.active);function a(h){n(h),ga(h)}function o(){n(null),ga(null)}function c(h){n(m=>{const y={...m,...h};return ga(y),y})}function u(h){n(m=>{const y={...m,sub:h};return ga(y),y})}function f(){n(h=>{const m={...h,sub:{...h.sub,active:!1}};ga(m);const y=mr(),v=y.find(g=>g.email===h.email);return v&&(v.sub=m.sub,ea(y)),m})}return l.jsx(Lx.Provider,{value:{user:e,role:i,isAdmin:r,subscribed:s,login:a,logout:o,updateUser:c,setSub:u,cancelSub:f},children:t})}function Dx(){const t=U.useContext(Lx);if(!t)throw new Error("useAuth-ийг AuthProvider дотор ашиглана уу");return t}const Ix=U.createContext(null);function Cb({children:t}){const[e,n]=U.useState([]),i=U.useCallback(o=>{n(c=>c.filter(u=>u.id!==o))},[]),r=U.useCallback((o,c="info",u=3800)=>{const f=Date.now()+Math.random();return n(p=>[...p,{id:f,text:o,type:c}]),u>0&&setTimeout(()=>i(f),u),f},[i]),s={show:r,success:(o,c)=>r(o,"success",c),error:(o,c)=>r(o,"error",c),info:(o,c)=>r(o,"info",c),dismiss:i},a={success:"✓",error:"⚠",info:"ℹ"};return l.jsxs(Ix.Provider,{value:s,children:[t,l.jsx("div",{className:"toast-wrap",role:"region","aria-label":"Мэдэгдэл","aria-live":"polite",children:e.map(o=>l.jsxs("div",{className:"toast toast-"+o.type,role:"status",children:[l.jsx("span",{className:"toast-ic","aria-hidden":"true",children:a[o.type]||a.info}),l.jsx("p",{children:o.text}),l.jsx("button",{className:"toast-x",onClick:()=>i(o.id),"aria-label":"Хаах",children:"✕"})]},o.id))})]})}function sh(){const t=U.useContext(Ix);if(!t)throw new Error("useToast-ийг ToastProvider дотор ашиглана уу");return t}const Jm=["#38E8CE","#D9A54C","#D98FA8","#9FB6E8","#7FD8E8","#B5E88F"],bb=[{v:"deaf",label:"Сонсголгүй"},{v:"hoh",label:"Сул сонсголтой"},{v:"hearing",label:"Сонсголтой"},{v:"",label:"Хэлэхгүй"}];function Rb({onBack:t}){var E;const{user:e,updateUser:n}=Dx(),i=sh(),[r,s]=U.useState((e==null?void 0:e.name)||""),[a,o]=U.useState((e==null?void 0:e.color)||Jm[0]),[c,u]=U.useState((e==null?void 0:e.hearing)||""),[f,p]=U.useState(""),[h,m]=U.useState(""),[y,v]=U.useState(""),g=(r||"?").trim().charAt(0).toUpperCase(),d=(e==null?void 0:e.role)==="admin";function x(P){if(P.preventDefault(),r.trim().length<2){i.error("Нэр дор хаяж 2 тэмдэгт байх ёстой");return}_x(e.email,{name:r.trim(),color:a,hearing:c}),n({name:r.trim(),color:a,hearing:c}),i.success("Профайл хадгалагдлаа")}function _(P){if(P.preventDefault(),!ob(e.email,f)){i.error("Одоогийн нууц үг буруу байна");return}if(h.length<6){i.error("Шинэ нууц үг дор хаяж 6 тэмдэгт");return}if(h!==y){i.error("Шинэ нууц үг таарахгүй байна");return}lb(e.email,h),p(""),m(""),v(""),i.success("Нууц үг амжилттай солигдлоо")}return l.jsxs(l.Fragment,{children:[l.jsx(ur,{title:"Профайл засах",onBack:t}),l.jsxs("div",{className:"pv-top",children:[l.jsx("span",{className:"sp-avatar sp-avatar-lg",style:{background:a,color:"#04100E"},"aria-hidden":"true",children:g}),l.jsxs("div",{children:[l.jsx("b",{children:r||"—"}),l.jsx("i",{children:e==null?void 0:e.email}),l.jsx("span",{className:"pv-role",children:d?"Админ эрх":(E=e==null?void 0:e.sub)!=null&&E.active?"PRO хэрэглэгч":"Үнэгүй горим"})]})]}),l.jsxs("form",{className:"pv-card",onSubmit:x,children:[l.jsx("h3",{className:"st-h",style:{marginTop:0},children:"Үндсэн мэдээлэл"}),l.jsxs("label",{className:"pv-field",children:[l.jsx("span",{className:"mono",children:"Нэр"}),l.jsx("input",{value:r,onChange:P=>s(P.target.value),placeholder:"Таны нэр"})]}),l.jsxs("label",{className:"pv-field",children:[l.jsx("span",{className:"mono",children:"Имэйл (өөрчлөх боломжгүй)"}),l.jsx("input",{value:(e==null?void 0:e.email)||"",disabled:!0})]}),l.jsxs("div",{className:"pv-field",children:[l.jsx("span",{className:"mono",children:"Аватар өнгө"}),l.jsx("div",{className:"pv-colors",children:Jm.map(P=>l.jsx("button",{type:"button",className:"pv-swatch"+(a===P?" on":""),style:{background:P},onClick:()=>o(P),"aria-label":"Өнгө "+P,"aria-pressed":a===P},P))})]}),l.jsxs("div",{className:"pv-field",children:[l.jsx("span",{className:"mono",children:"Сонсголын байдал (нууц — тохиргоог сайжруулахад)"}),l.jsx("div",{className:"sp-seg pv-hearing",children:bb.map(P=>l.jsx("button",{type:"button",className:c===P.v?"on":"",onClick:()=>u(P.v),children:P.label},P.v))})]}),l.jsx("button",{type:"submit",className:"bt bt-a",children:"Хадгалах"})]}),l.jsxs("form",{className:"pv-card",onSubmit:_,children:[l.jsx("h3",{className:"st-h",style:{marginTop:0},children:"Нууц үг солих"}),l.jsxs("label",{className:"pv-field",children:[l.jsx("span",{className:"mono",children:"Одоогийн нууц үг"}),l.jsx("input",{type:"password",value:f,onChange:P=>p(P.target.value),placeholder:"••••••••",autoComplete:"current-password"})]}),l.jsxs("label",{className:"pv-field",children:[l.jsx("span",{className:"mono",children:"Шинэ нууц үг"}),l.jsx("input",{type:"password",value:h,onChange:P=>m(P.target.value),placeholder:"••••••••",autoComplete:"new-password"})]}),l.jsxs("label",{className:"pv-field",children:[l.jsx("span",{className:"mono",children:"Шинэ нууц үг давтах"}),l.jsx("input",{type:"password",value:y,onChange:P=>v(P.target.value),placeholder:"••••••••",autoComplete:"new-password"})]}),l.jsx("button",{type:"submit",className:"bt",children:"Нууц үг солих"})]})]})}const eg=[{v:"chest",label:"Цээж"},{v:"ribs",label:"Хавирга"},{v:"shoulder",label:"Мөр"},{v:"wrist",label:"Бугуй"}],Nb={bass:"chest",mid:"ribs",high:"shoulder"},il={bass:"Бас (20–250 Hz)",mid:"Дунд (250–4k)",high:"Өндөр (4–20k)"},Pb={bass:[230,80,230],mid:[70,50,70,50,70],high:[24,24,24,24,24,24]};function Lb({prefs:t,onUpdatePrefs:e,canVibrate:n,onBack:i}){var y;const r=sh(),[s,a]=U.useState(null),o={...Nb,...t.deviceMap||{}};U.useEffect(()=>{const v=()=>{var x;const d=[...((x=navigator.getGamepads)==null?void 0:x.call(navigator))||[]].find(Boolean);a(d||null)};v(),addEventListener("gamepadconnected",v),addEventListener("gamepaddisconnected",v);const g=setInterval(v,1500);return()=>{removeEventListener("gamepadconnected",v),removeEventListener("gamepaddisconnected",v),clearInterval(g)}},[]);function c(){if(!n){r.error("Энэ төхөөрөмж чичиргээ дэмжихгүй — Android утсан дээр туршина уу");return}try{navigator.vibrate([230,80,230]),r.success("Утас чичирлээ 📳")}catch{r.error("Чичиргээ ажиллахгүй байна")}}function u(){var d;const v=[...((d=navigator.getGamepads)==null?void 0:d.call(navigator))||[]].find(Boolean);if(!v){r.error("Gamepad олдсонгүй — холбоод, нэг товч дараарай");return}const g=v.vibrationActuator;g!=null&&g.playEffect?(g.playEffect("dual-rumble",{duration:320,strongMagnitude:1,weakMagnitude:.55}),r.success("Gamepad чичирлээ 🎮")):r.error("Энэ gamepad чичиргээ дэмжихгүй")}async function f(){if(!navigator.bluetooth){r.error("Web Bluetooth дэмжигдэхгүй — Chrome/Edge (desktop/Android) ашиглана уу");return}try{const v=await navigator.bluetooth.requestDevice({acceptAllDevices:!0});r.success("Холбогдлоо: "+(v.name||"төхөөрөмж"))}catch(v){v.name!=="NotFoundError"&&r.error("Холбогдож чадсангүй")}}function p(v,g){e({deviceMap:{...o,[v]:g}})}function h(v){var g;if(n)try{navigator.vibrate(Pb[v])}catch{}r.info(il[v]+" → "+((g=eg.find(d=>d.v===o[v]))==null?void 0:g.label))}const m=[{key:"phone",icon:"📱",name:"Утас (чичиргээ)",desc:"Android Chrome дээр шууд ажиллана. iOS дэмжихгүй.",status:n?"Бэлэн":"Дэмжигдэхгүй",ok:n,action:c,actionLabel:"Тест"},{key:"gamepad",icon:"🎮",name:"Gamepad (rumble)",desc:"USB/Bluetooth джойстик — 2 моторт, эрчимтэй чичиргээ.",status:s?"Холбогдсон: "+(((y=s.id)==null?void 0:y.slice(0,22))||"gamepad"):"Холбогдоогүй",ok:!!s,action:u,actionLabel:"Тест"},{key:"ble",icon:"🦺",name:"BLE хаптик хантааз",desc:"Олон моторт хантааз/суудал — биеийн бүсээр tonotopic мэдрэмж.",status:navigator.bluetooth?"Холбоход бэлэн":"Браузер дэмжихгүй",ok:!!navigator.bluetooth,action:f,actionLabel:"Холбох"}];return l.jsxs(l.Fragment,{children:[l.jsx(ur,{title:"Төхөөрөмж холбох",onBack:i}),l.jsx("p",{className:"dv-lead",children:"Хөгжмийг илүү хүчтэй мэдрэхийн тулд төхөөрөмж холбоно. Утас хамгийн энгийн нь — хантааз хамгийн гүн мэдрэмж өгнө."}),l.jsx("div",{className:"dv-grid",children:m.map(v=>l.jsxs("div",{className:"dv-card"+(v.ok?" ok":""),children:[l.jsx("span",{className:"dv-ic","aria-hidden":"true",children:v.icon}),l.jsx("b",{children:v.name}),l.jsx("p",{children:v.desc}),l.jsxs("span",{className:"dv-status"+(v.ok?" on":""),children:[l.jsx("i",{className:"dv-dot","aria-hidden":"true"}),v.status]}),l.jsx("button",{className:"bt bt-a dv-btn",onClick:v.action,children:v.actionLabel})]},v.key))}),l.jsx("h3",{className:"st-h",children:"Давтамж → биеийн байрлал"}),l.jsx("p",{className:"dv-lead",children:"Олон моторт төхөөрөмж дээр давтамжийн бүс бүрийг биеийн өөр цэгт оноож болно (чихний дун шиг — «tonotopic»). Дараад туршиж үзээрэй."}),l.jsx("div",{className:"dv-map",children:["bass","mid","high"].map(v=>l.jsxs("div",{className:"dv-maprow",children:[l.jsx("button",{className:"dv-testz",onClick:()=>h(v),"aria-label":il[v]+" туршиж үзэх",children:"▶"}),l.jsx("span",{className:"dv-band",children:il[v]}),l.jsx("span",{className:"dv-arrow","aria-hidden":"true",children:"→"}),l.jsx("select",{className:"dv-select",value:o[v],onChange:g=>p(v,g.target.value),"aria-label":il[v]+" байрлал",children:eg.map(g=>l.jsx("option",{value:g.v,children:g.label},g.v))})]},v))}),l.jsx("div",{className:"sp-banner dv-note",children:l.jsxs("div",{children:[l.jsx("b",{children:"Санамж"}),l.jsx("p",{children:"Компьютер дээр жинхэнэ чичиргээ гарахгүй — зөвхөн гэрлийн пульс. Бүрэн туршихын тулд Android утас эсвэл gamepad холбоно уу."})]})})]})}function tg({icon:t="🎵",title:e="Хоосон байна",hint:n,action:i}){return l.jsxs("div",{className:"state state-empty",children:[l.jsx("span",{className:"state-ic","aria-hidden":"true",children:t}),l.jsx("b",{children:e}),n&&l.jsx("p",{children:n}),i]})}function Db({email:t,tracks:e,onPlay:n,curId:i,playing:r,onBack:s}){const a=sh(),[o,c]=U.useState([]),[u,f]=U.useState(""),[p,h]=U.useState(null),[m,y]=U.useState(!1),[v,g]=U.useState(""),d=()=>c(fo(t));U.useEffect(()=>{d();const A=()=>d();return addEventListener("medreh:playlists-changed",A),()=>removeEventListener("medreh:playlists-changed",A)},[t]);const x=A=>e.find(N=>N.id===A),_=o.find(A=>A.id===p);function E(A){if(A.preventDefault(),u.trim().length<2){a.error("Жагсаалтын нэрээ оруулна уу");return}xb(t,u.trim()),f(""),a.success("«"+u.trim()+"» жагсаалт үүслээ")}function P(A){_b(t,A.id),p===A.id&&h(null),a.info("«"+A.name+"» устгагдлаа")}function R(A){const N=A.tracks.map(x).find(Boolean);N?n(N):a.error("Жагсаалт хоосон байна")}if(_){const A=_.tracks.map(x).filter(Boolean),N=e.filter(S=>!_.tracks.includes(S.id)&&(S.title+" "+S.artist).toLowerCase().includes(v.trim().toLowerCase()));return l.jsxs(l.Fragment,{children:[l.jsx(ur,{title:_.name,onBack:()=>{h(null),y(!1)}}),l.jsxs("div",{className:"plv-openhead",children:[l.jsxs("span",{className:"mono",children:[A.length," дуу"]}),l.jsxs("div",{className:"plv-openact",children:[l.jsx("button",{className:"bt bt-a",onClick:()=>R(_),disabled:!A.length,children:"▶ Бүгдийг тоглуулах"}),l.jsx("button",{className:"bt",onClick:()=>y(S=>!S),children:m?"Хаах":"＋ Дуу нэмэх"})]})]}),m&&l.jsxs("div",{className:"plv-add",children:[l.jsx("input",{className:"plv-search",placeholder:"Дуу хайх…",value:v,onChange:S=>g(S.target.value)}),l.jsxs("div",{className:"sp-list",children:[N.length===0&&l.jsx("p",{className:"adm-empty",children:"Нэмэх дуу алга"}),N.slice(0,20).map(S=>l.jsxs("div",{className:"sp-lrow plv-cand",children:[l.jsx("img",{className:"sp-lthumb",src:S.cover,alt:""}),l.jsxs("span",{className:"sp-lmeta",children:[l.jsx("b",{children:S.title}),l.jsx("i",{children:S.artist})]}),l.jsx("button",{className:"bt bt-a plv-addbtn",onClick:()=>{yb(t,_.id,S.id),a.success("Нэмэгдлээ")},children:"＋"})]},S.id))]})]}),A.length===0?l.jsx(tg,{icon:"🎧",title:"Жагсаалт хоосон",hint:"«＋ Дуу нэмэх» товчоор дуу нэмээрэй"}):l.jsx("div",{className:"sp-list",children:A.map((S,M)=>{const I=i===S.id;return l.jsxs("div",{className:"sp-lrow"+(I?" on":""),children:[l.jsx("span",{className:"sp-lno mono",children:String(M+1).padStart(2,"0")}),l.jsx("img",{className:"sp-lthumb",src:S.cover,alt:""}),l.jsxs("button",{className:"sp-lmeta plv-play",onClick:()=>n(S),children:[l.jsx("b",{children:S.title}),l.jsx("i",{children:S.artist})]}),l.jsx("span",{className:"sp-lgenre mono",children:S.genre}),l.jsx("button",{className:"adm-del",onClick:()=>{Sb(t,_.id,S.id),a.info("Хасагдлаа")},children:"Хасах"}),l.jsx("span",{className:"sp-lact","aria-hidden":"true",children:I&&r?"▮▮":"▶"})]},S.id)})})]})}return l.jsxs(l.Fragment,{children:[l.jsx(ur,{title:"Миний жагсаалтууд",onBack:s}),l.jsxs("form",{className:"plv-create",onSubmit:E,children:[l.jsx("input",{value:u,onChange:A=>f(A.target.value),placeholder:"Шинэ жагсаалтын нэр…"}),l.jsx("button",{type:"submit",className:"bt bt-a",children:"＋ Үүсгэх"})]}),o.length===0?l.jsx(tg,{icon:"🎵",title:"Жагсаалт алга",hint:"Дээрээс шинэ жагсаалт үүсгээд, дуртай дуугаа цуглуулаарай"}):l.jsx("div",{className:"plv-grid",children:o.map(A=>{var S;const N=(S=A.tracks.map(x).find(Boolean))==null?void 0:S.cover;return l.jsxs("div",{className:"plv-card",children:[l.jsxs("button",{className:"plv-open",onClick:()=>h(A.id),children:[l.jsx("span",{className:"plv-cover",children:N?l.jsx("img",{src:N,alt:""}):l.jsx("span",{className:"plv-cover-empty","aria-hidden":"true",children:"♫"})}),l.jsx("b",{children:A.name}),l.jsxs("i",{children:[A.tracks.length," дуу"]})]}),l.jsxs("div",{className:"plv-cardact",children:[l.jsx("button",{className:"plv-mini",onClick:()=>R(A),disabled:!A.tracks.length,"aria-label":"Тоглуулах",children:"▶"}),l.jsx("button",{className:"plv-mini danger",onClick:()=>P(A),"aria-label":"Устгах",children:"🗑"})]})]},A.id)})})]})}const Ib=[{ic:"🎵",t:"Дуу сонгох",d:"Картан дээр дарахад дуу тоглоно. Хайлт болон төрлийн шүүлтүүрээр хүссэн дуугаа ол."},{ic:"📳",t:"Чичиргээ мэдрэх",d:"Утсан дээр нээвэл дууны хэмнэлээр утас чичирнэ. Бас = урт хүчтэй, өндөр = богино түргэн."},{ic:"💡",t:"Гэрлээр мэдрэх",d:"Дэлгэцийн гэрэл дууны цохилтоор лугшина. ⛶ товчоор бүтэн дэлгэцийн «Мэдрэх горим» нээгдэнэ."},{ic:"🎛",t:"Өөрт тааруулах",d:"⚙️ цэснээс чичиргээний хүч, гэрлийн эрчим, давтамжийн бүсээ тохируул. Калибровк дахин хийж болно."},{ic:"♥",t:"Цуглуулга",d:"Зүрх дарж дуртай дуугаа, 🔖 дарж дараа сонсох дуугаа хадгал. Зүүн самбарт цуглана."},{ic:"💳",t:"PRO захиалга",d:"Үнэгүй горимд 30 сек сонсоно. PRO бол бүрэн эрхтэй — профайл цэснээс захиалгаа удирдаарай."}];function Ub({onOpenCalibrate:t,onBack:e}){return l.jsxs(l.Fragment,{children:[l.jsx(ur,{title:"Тусламж — Хэрхэн ашиглах вэ?",onBack:e}),l.jsx("div",{className:"hlp-grid",children:Ib.map(n=>l.jsxs("div",{className:"hlp-card",children:[l.jsx("span",{className:"hlp-ic","aria-hidden":"true",children:n.ic}),l.jsx("b",{children:n.t}),l.jsx("p",{children:n.d})]},n.t))}),l.jsxs("div",{className:"sp-banner",style:{marginTop:26},children:[l.jsxs("div",{children:[l.jsx("b",{children:"Мэдрэхүйн калибровк"}),l.jsx("p",{children:"Таны мэдрэх босгыг 1 минутын тестээр тодорхойлж, тохиргоог автоматаар тааруулна."})]}),l.jsx("button",{className:"bt bt-a",onClick:t,children:"🎛 Калибровк эхлүүлэх"})]})]})}function Fb({track:t,isCurrent:e,playing:n,onPlay:i,onFeelTest:r,onBack:s}){const a=t;if(!a)return null;const o=Nx[a.genre]||Px,c=o.pattern.reduce((u,f)=>u+f,0);return l.jsxs(l.Fragment,{children:[l.jsx(ur,{title:"Дууны дэлгэрэнгүй",onBack:s}),l.jsxs("div",{className:"dt-wrap",children:[l.jsxs("div",{className:"dt-left",children:[l.jsx("img",{className:"dt-cover",src:a.cover,alt:a.title}),l.jsxs("div",{className:"dt-btns",children:[l.jsx("button",{className:"bt bt-a",onClick:i,children:e&&n?"⏸ Зогсоох":"▶ Тоглуулах"}),l.jsx("button",{className:"bt",onClick:r,children:"📳 Туршиж мэдрэх"})]})]}),l.jsxs("div",{className:"dt-right",children:[l.jsx("span",{className:"sp-chip on dt-genre",children:a.genre}),l.jsx("h2",{className:"dt-title",children:a.title}),l.jsxs("p",{className:"dt-artist",children:["Дуучин: ",a.artist,a.composer&&l.jsxs(l.Fragment,{children:[" · Зохиолч: ",a.composer]})]}),l.jsx("h3",{className:"st-h",children:"Энэ дуу хэрхэн мэдрэгдэх вэ?"}),l.jsx("p",{className:"dt-feel",children:o.text}),l.jsx("div",{className:"dt-bands",children:[["Бас",o.bass,"20—250 Hz"],["Дунд",o.mid,"250 Hz—4 kHz"],["Өндөр",o.high,"4—20 kHz"]].map(([u,f,p])=>l.jsxs("div",{className:"dt-band",children:[l.jsxs("div",{className:"dt-band-top",children:[l.jsx("b",{children:u}),l.jsx("span",{className:"mono",children:p}),l.jsxs("span",{className:"dt-pct",children:[f,"%"]})]}),l.jsx("div",{className:"dt-meter",children:l.jsx("i",{style:{width:f+"%"}})})]},u))}),l.jsx("h3",{className:"st-h",children:"Чичиргээний хэв маяг"}),l.jsx("div",{className:"dt-hap","aria-label":"Чичиргээний хэв маяг",children:o.pattern.map((u,f)=>f%2===0?l.jsx("i",{style:{flex:u/c+" 0 0"},title:u+" мс чичиргээ"},f):l.jsx("u",{style:{flex:u/c+" 0 0"}},f))}),l.jsxs("p",{className:"dt-hap-lb mono",children:[o.pattern.join(" · ")," мс"]})]})]})]})}function $i({icon:t,color:e,value:n,label:i}){return l.jsxs("div",{className:"st-card",children:[l.jsx("span",{className:"st-ico "+e,"aria-hidden":"true",children:l.jsx("svg",{width:"21",height:"21",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.9",strokeLinecap:"round",strokeLinejoin:"round",children:t})}),l.jsxs("span",{className:"st-meta",children:[l.jsx("b",{children:n}),l.jsx("span",{className:"mono",children:i})]})]})}const kb={total:0,vib:0,byGenre:{},byTrack:{},days:{}};function Ob({stats:t,byId:e,onPlay:n,onBack:i}){const r=t||kb,s=Object.entries(r.byGenre).sort((u,f)=>f[1]-u[1])[0],a=Object.entries(r.byTrack).sort((u,f)=>f[1]-u[1]).slice(0,3).map(([u,f])=>({t:e(isNaN(+u)?u:+u),sec:f})).filter(u=>u.t),o=[];for(let u=6;u>=0;u--){const f=new Date;f.setDate(f.getDate()-u);const p=Ex(f);o.push({label:["Ня","Да","Мя","Лх","Пү","Ба","Бя"][f.getDay()],sec:r.days[p]||0,today:u===0})}const c=Math.max(1,...o.map(u=>u.sec));return l.jsxs(l.Fragment,{children:[l.jsx(ur,{title:"Миний статистик",onBack:i}),l.jsxs("div",{className:"st-cards",children:[l.jsx($i,{icon:mi.phones,color:"c-aqua",value:zu(r.total),label:"Нийт сонссон"}),l.jsx($i,{icon:mi.vibrate,color:"c-gold",value:r.vib.toLocaleString(),label:"Мэдэрсэн чичиргээ"}),l.jsx($i,{icon:mi.music,color:"c-purple",value:Object.keys(r.byTrack).length,label:"Сонссон дуу"}),l.jsx($i,{icon:mi.star,color:"c-rose",value:s?s[0]:"—",label:"Топ төрөл"})]}),l.jsx("h3",{className:"st-h",children:"Сүүлийн 7 хоног"}),l.jsx("div",{className:"st-chart",children:o.map((u,f)=>l.jsxs("div",{className:"st-col",children:[l.jsx("span",{className:"st-val mono",children:u.sec?zu(u.sec):""}),l.jsx("i",{className:u.today?"today":"",style:{height:Math.max(3,u.sec/c*100)+"%"}}),l.jsx("span",{className:"mono"+(u.today?" st-today":""),children:u.label})]},f))}),a.length>0&&l.jsxs(l.Fragment,{children:[l.jsx("h3",{className:"st-h",children:"Хамгийн их сонссон"}),l.jsx("div",{className:"sp-list",children:a.map(({t:u,sec:f},p)=>l.jsxs("button",{className:"sp-lrow st-toprow",onClick:()=>n(u),children:[l.jsx("span",{className:"sp-lno mono",children:"0"+(p+1)}),l.jsx("img",{className:"sp-lthumb",src:u.cover,alt:""}),l.jsxs("span",{className:"sp-lmeta",children:[l.jsx("b",{children:u.title}),l.jsx("i",{children:u.artist})]}),l.jsx("span",{className:"sp-lgenre mono",children:zu(f)}),l.jsx("span",{className:"sp-lact","aria-hidden":"true",children:"▶"})]},u.id))})]}),r.total===0&&l.jsx("p",{className:"adm-empty",children:"Дуу сонсож эхлэхэд статистик энд цуглана 🎶"})]})}function Bb({allTracksCount:t,onOpenAdmin:e,onGoHome:n}){const[i,r]=U.useState(""),[s,a]=U.useState(""),o=mr().filter(h=>h.role!=="admin"),c=o.filter(h=>{var m;return(m=h.sub)==null?void 0:m.active}).length,u=o.reduce((h,m)=>h+ih(m.email).length*9900,0),f=[...o].sort((h,m)=>(m.created||0)-(h.created||0)).slice(0,5);function p(h){h.preventDefault();const m=i.trim();if(m.length<3){a("❌ Зарлалын текстээ бичнэ үү");return}nh(m,"📢"),r(""),a("✅ Зарлал бүх хэрэглэгчид илгээгдлээ"),setTimeout(()=>a(""),3e3)}return l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"ab-head",children:[l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Хяналтын самбар"}),l.jsx("h2",{className:"sp-h",style:{margin:"8px 0 0"},children:"Сайн уу, Админ 🛠"})]}),l.jsx("button",{className:"bt bt-a",onClick:e,children:"Хэрэглэгч · Дуу удирдах →"})]}),l.jsxs("div",{className:"st-cards",children:[l.jsx($i,{icon:mi.users,color:"c-aqua",value:o.length,label:"Нийт хэрэглэгч"}),l.jsx($i,{icon:mi.gem,color:"c-purple",value:c,label:"PRO захиалагч"}),l.jsx($i,{icon:mi.money,color:"c-gold",value:u.toLocaleString()+"₮",label:"Нийт орлого (демо)"}),l.jsx($i,{icon:mi.music,color:"c-rose",value:t,label:"Дууны сан"})]}),l.jsxs("div",{className:"ab-card",children:[l.jsxs("div",{className:"ab-card-h",children:[l.jsx("span",{className:"st-ico c-gold","aria-hidden":"true",children:l.jsx("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.9",strokeLinecap:"round",strokeLinejoin:"round",children:mi.horn})}),l.jsxs("div",{children:[l.jsx("b",{children:"Бүх хэрэглэгчид зарлал илгээх"}),l.jsx("p",{children:"Зарлал хэрэглэгч бүрийн хонхонд шууд очно. Дуу нэмэхэд мэдэгдэл автоматаар илгээгддэг."})]})]}),l.jsxs("form",{className:"ab-bcast",onSubmit:p,children:[l.jsx("input",{type:"text",value:i,onChange:h=>r(h.target.value),placeholder:"ж: Маргааш 20:00 цагт шинэ цомог нэмэгдэнэ!","aria-label":"Зарлалын текст"}),l.jsx("button",{type:"submit",className:"bt bt-a",children:"Илгээх"})]}),s&&l.jsx("p",{className:s.startsWith("✅")?"auth-ok":"auth-err",style:{fontSize:13},children:s})]}),l.jsx("h3",{className:"st-h",children:"Сүүлийн бүртгэлүүд"}),f.length===0?l.jsx("p",{className:"adm-empty",children:"Бүртгүүлсэн хэрэглэгч алга"}):l.jsxs("div",{className:"bil-table",children:[l.jsxs("div",{className:"bil-row bil-head ab-urow",children:[l.jsx("span",{className:"mono",children:"Хэрэглэгч"}),l.jsx("span",{className:"mono",children:"Имэйл"}),l.jsx("span",{className:"mono",children:"Огноо"}),l.jsx("span",{className:"mono",children:"Статус"})]}),f.map(h=>{var m,y;return l.jsxs("div",{className:"bil-row ab-urow",children:[l.jsxs("span",{className:"ab-uname",children:[l.jsx("i",{className:"ab-uav","aria-hidden":"true",children:(h.name||"?").charAt(0).toUpperCase()}),h.name]}),l.jsx("span",{className:"bil-mth",children:h.email}),l.jsx("span",{children:h.created?new Date(h.created).toLocaleDateString("mn-MN"):"—"}),l.jsx("span",{className:(m=h.sub)!=null&&m.active?"bil-ok":"ab-free",children:(y=h.sub)!=null&&y.active?"💎 PRO":"Үнэгүй"})]},h.email)})]}),l.jsxs("div",{className:"sp-banner",style:{marginTop:30},children:[l.jsxs("div",{children:[l.jsx("b",{children:"Тоглуулагч руу шилжих"}),l.jsx("p",{children:"Хэрэглэгчийн нүдээр аппаа туршиж, дуу сонсож, мэдрэх горимыг шалгаарай."})]}),l.jsx("button",{className:"bt",onClick:n,children:"🎧 Тоглуулагч нээх"})]})]})}function zb({track:t,onClose:e,barsRef:n,pulseRef:i}){return l.jsxs("div",{className:"sp-imm",onClick:e,role:"dialog","aria-label":"Мэдрэх горим",children:[l.jsx("img",{className:"sp-imm-bg",src:t.cover,alt:"","aria-hidden":"true"}),l.jsx("div",{className:"sp-imm-veil","aria-hidden":"true"}),l.jsxs("div",{className:"sp-imm-center",children:[l.jsx("span",{className:"sp-imm-ring",ref:i,"aria-hidden":"true"}),l.jsx("img",{className:"sp-imm-cover",src:t.cover,alt:""})]}),l.jsxs("div",{className:"sp-imm-info",children:[l.jsx("span",{className:"mono",children:"Мэдрэх горим"}),l.jsx("h2",{children:t.title}),l.jsxs("p",{children:[t.artist," · ",t.genre]})]}),l.jsx("div",{className:"sp-imm-bars","aria-hidden":"true",children:Array.from({length:28}).map((r,s)=>l.jsx("i",{ref:a=>{n.current[s]=a}},s))}),l.jsx("span",{className:"sp-imm-exit mono",children:"ESC эсвэл дарж гарна"})]})}function jb({email:t,user:e,isAdmin:n,subscribed:i,renewDate:r,onSubscribe:s,onCancelSub:a,onBack:o}){var p,h;const c=ih(t),u=(p=e==null?void 0:e.sub)==null?void 0:p.active,f=(h=e==null?void 0:e.sub)!=null&&h.renews?Math.max(0,Math.ceil((e.sub.renews-Date.now())/864e5)):0;return l.jsxs(l.Fragment,{children:[l.jsx(ur,{title:"Захиалгын удирдлага",onBack:o}),l.jsxs("div",{className:"bil-plan"+(u||n?" pro":""),children:[l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Идэвхтэй план"}),l.jsx("b",{children:n?"Админ — бүх эрх":u?"МЭДРЭХ PRO":e!=null&&e.sub?"PRO (цуцлагдсан)":"Үнэгүй горим"}),l.jsx("p",{children:n?"Админ эрхтэй тул төлбөр шаардлагагүй.":u?`Дараагийн төлбөр: ${r} — ${f} хоногийн дараа · 9'900₮`:e!=null&&e.sub?`${r} хүртэл эрх хадгалагдана, дараа нь үнэгүй горимд шилжинэ.`:`Дуу тус бүрээс ${Pr} секунд сонсох эрхтэй.`}),u&&!n&&l.jsx("div",{className:"bil-count","aria-label":"Дараагийн төлбөр хүртэл",children:l.jsx("i",{style:{width:Math.min(100,(30-f)/30*100)+"%"}})})]}),l.jsxs("div",{className:"bil-actions",children:[!n&&u&&l.jsx("button",{className:"sp-prof-btn danger",onClick:()=>{confirm("PRO захиалгаа цуцлах уу? "+r+" хүртэл эрх чинь хадгалагдана.")&&a()},children:"Захиалга цуцлах"}),!n&&!u&&l.jsx("button",{className:"sp-prof-btn accent",onClick:s,children:e!=null&&e.sub?"Сэргээх — 9'900₮/сар":"PRO болох — 9'900₮/сар"})]})]}),l.jsx("h3",{className:"st-h",children:"Төлбөрийн түүх"}),c.length===0?l.jsx("p",{className:"adm-empty",children:"Төлбөрийн түүх хоосон байна"}):l.jsxs("div",{className:"bil-table",children:[l.jsxs("div",{className:"bil-row bil-head",children:[l.jsx("span",{className:"mono",children:"Огноо"}),l.jsx("span",{className:"mono",children:"План"}),l.jsx("span",{className:"mono",children:"Төлбөрийн хэрэгсэл"}),l.jsx("span",{className:"mono",children:"Дүн"}),l.jsx("span",{className:"mono",children:"Төлөв"})]}),c.map(m=>l.jsxs("div",{className:"bil-row",children:[l.jsx("span",{children:new Date(m.date).toLocaleDateString("mn-MN")}),l.jsx("span",{children:m.plan}),l.jsx("span",{className:"bil-mth",children:m.method}),l.jsx("span",{children:l.jsx("b",{children:m.amount})}),l.jsxs("span",{className:"bil-ok",children:["✓ ",m.status]})]},m.id))]}),l.jsx("p",{className:"auth-note mono",style:{textAlign:"left"},children:"Демо горим — Stripe test. Жинхэнэ мөнгө шилжээгүй."})]})}function ng({id:t,row:e,active:n,onToggle:i}){return l.jsx("span",{className:"sp-like"+(e?" sp-like-row":"")+(n?" on":""),role:"button",tabIndex:0,"aria-label":n?"Дуртайгаас хасах":"Дуртайд нэмэх",onClick:r=>{r.stopPropagation(),i()},onKeyDown:r=>{r.key==="Enter"&&(r.stopPropagation(),i())},children:n?"♥":"♡"})}function ig({id:t,row:e,active:n,onToggle:i}){return l.jsx("span",{className:"sp-like"+(e?" sp-like-row sp-save-row":" sp-save")+(n?" on":""),role:"button",tabIndex:0,"aria-label":n?"Хадгалснаас хасах":"Хадгалах",onClick:r=>{r.stopPropagation(),i()},onKeyDown:r=>{r.key==="Enter"&&(r.stopPropagation(),i())},children:l.jsx("svg",{width:e?14:15,height:e?14:15,viewBox:"0 0 24 24",fill:n?"currentColor":"none",stroke:"currentColor",strokeWidth:"2",strokeLinejoin:"round",children:l.jsx("path",{d:"M6 3h12v18l-6-3.6L6 21V3z"})})})}function rg({t,row:e,onInfo:n}){return l.jsx("span",{className:"sp-like sp-info"+(e?" sp-like-row":""),role:"button",tabIndex:0,"aria-label":t.title+" — дэлгэрэнгүй",onClick:i=>{i.stopPropagation(),n()},onKeyDown:i=>{i.key==="Enter"&&(i.stopPropagation(),n())},children:"ⓘ"})}function Hb({genres:t,genre:e,onGenre:n,list:i,query:r,curId:s,playing:a,onPlay:o,likes:c,saves:u,onToggleLike:f,onToggleSave:p,onInfo:h,subscribed:m,onSubscribe:y}){return l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"sp-chips",children:t.map(v=>l.jsx("button",{className:"sp-chip"+(e===v?" on":""),onClick:()=>n(v),children:v},v))}),l.jsx("h2",{className:"sp-h",children:"Тренд дуунууд"}),i.length===0&&l.jsxs("p",{className:"adm-empty",children:['"',r,'" — олдсонгүй']}),l.jsx("div",{className:"sp-grid",children:i.map(v=>{const g=s===v.id;return l.jsxs("button",{className:"sp-card"+(g?" on":""),onClick:()=>o(v),children:[l.jsxs("span",{className:"sp-cover",children:[l.jsx("img",{src:v.cover,alt:"",loading:"lazy"}),l.jsx(ng,{id:v.id,active:c.includes(v.id),onToggle:()=>f(v.id)}),l.jsx(ig,{id:v.id,active:u.includes(v.id),onToggle:()=>p(v.id)}),l.jsx(rg,{t:v,onInfo:()=>h(v)}),l.jsx("span",{className:"sp-playbtn"+(g&&a?" show":""),"aria-hidden":"true",children:g&&a?"⏸":"▶"}),g&&a&&l.jsxs("span",{className:"pl-eq sp-eq","aria-hidden":"true",children:[l.jsx("u",{}),l.jsx("u",{}),l.jsx("u",{})]})]}),l.jsxs("b",{children:[v.title,v.custom&&l.jsx("em",{className:"sp-new",children:" шинэ"})]}),l.jsxs("i",{children:[v.artist," · ",v.genre]})]},v.id)})}),i.length>0&&l.jsxs(l.Fragment,{children:[l.jsx("h2",{className:"sp-h sp-h2",children:"Бүх дуунууд"}),l.jsx("div",{className:"sp-list",children:i.map((v,g)=>{const d=s===v.id;return l.jsxs("button",{className:"sp-lrow"+(d?" on":""),onClick:()=>o(v),children:[l.jsx("span",{className:"sp-lno mono",children:String(g+1).padStart(2,"0")}),l.jsx("img",{className:"sp-lthumb",src:v.cover,alt:"",loading:"lazy"}),l.jsxs("span",{className:"sp-lmeta",children:[l.jsxs("b",{children:[v.title,v.custom&&l.jsx("em",{className:"sp-new",children:" шинэ"})]}),l.jsx("i",{children:v.artist})]}),l.jsx("span",{className:"sp-lgenre mono",children:v.genre}),l.jsx(ng,{id:v.id,row:!0,active:c.includes(v.id),onToggle:()=>f(v.id)}),l.jsx(ig,{id:v.id,row:!0,active:u.includes(v.id),onToggle:()=>p(v.id)}),l.jsx(rg,{t:v,row:!0,onInfo:()=>h(v)}),l.jsx("span",{className:"sp-lact","aria-hidden":"true",children:d&&a?l.jsxs("span",{className:"pl-eq",style:{height:14},children:[l.jsx("u",{}),l.jsx("u",{}),l.jsx("u",{})]}):"▶"})]},v.id)})})]}),!m&&l.jsxs("div",{className:"sp-banner",children:[l.jsxs("div",{children:[l.jsx("b",{children:"МЭДРЭХ PRO болоорой"}),l.jsxs("p",{children:["Бүх дууг бүрэн сонсож, чичиргээ + гэрлийн горимыг хязгааргүй мэдэр. Үнэгүй горимд дуу тус бүрээс ",Pr," секунд сонсоно."]})]}),l.jsx("button",{className:"bt bt-a",onClick:y,children:"9'900₮ / сар — Захиалах"})]})]})}function Vb({open:t,onClose:e,user:n,subscribed:i,onSubscribe:r,isAdmin:s,onAdmin:a,onLogout:o,onCancelSub:c}){var B;const[u,f]=U.useState("home"),[p,h]=U.useState(null),[m,y]=U.useState(""),[v,g]=U.useState("Бүгд"),[d,x]=U.useState([]),[_,E]=U.useState([]),[P,R]=U.useState([]),[A,N]=U.useState([]),[S,M]=U.useState(null),[I,G]=U.useState(!1),[j,Q]=U.useState(0),[X,Y]=U.useState(0),[J,O]=U.useState(!0),[ee,ne]=U.useState(!1),[le,Re]=U.useState(va),[Je,$]=U.useState(!1),[re,xe]=U.useState(!1),[me,Ee]=U.useState(!1),[Ue,je]=U.useState(!1),[k,Xe]=U.useState([]),[Ye,ot]=U.useState(0),[ke,Ke]=U.useState(!1),[$e,He]=U.useState(!1),[,vt]=U.useState(0),D=U.useRef(null),w=U.useRef(null),H=U.useRef(null),ie=U.useRef(null),ae=U.useRef({lo:0,mi:0,hi:0}),se=U.useRef(le),Ne=U.useRef(null),ge=U.useRef(null),_e=U.useRef([]),Be=U.useRef([]),ue=U.useRef(null),Ce=U.useRef(!1);se.current=le;const Ge=typeof navigator<"u"&&!!navigator.vibrate,be=(n==null?void 0:n.email)||"",Se="medreh_likes:"+be,Ve="medreh_saves:"+be,We="medreh_prefs:"+be;U.useEffect(()=>{if(be){try{E(JSON.parse(localStorage.getItem(Se))||[])}catch{E([])}try{R(JSON.parse(localStorage.getItem(Ve))||[])}catch{R([])}try{const C=JSON.parse(localStorage.getItem(We));Re(C?{...va,...C,bands:{...va.bands,...C.bands}}:va)}catch{Re(va)}ge.current=gb(be),ot(pb(be)),$(!0)}},[Se,Ve,We,be]),U.useEffect(()=>{t&&Je&&!le.calibrated&&!Ce.current&&!s&&(Ce.current=!0,He(!0))},[t,Je,le.calibrated,s]),U.useEffect(()=>{t&&f(s?"admin":"home")},[t,s]),U.useEffect(()=>{const C=()=>vt(L=>L+1);return addEventListener("medreh:users-changed",C),()=>removeEventListener("medreh:users-changed",C)},[]),U.useEffect(()=>{if(!t)return;let C=!0;const L=[];async function b(){const te=La(),fe=[];for(const he of te){const Pe=await Xm("audio-"+he.id).catch(()=>null);if(!Pe)continue;const Le=URL.createObjectURL(Pe);L.push(Le);let De=null;if(he.hasCover){const et=await Xm("cover-"+he.id).catch(()=>null);et&&(De=URL.createObjectURL(et),L.push(De))}fe.push({id:he.id,title:he.title,artist:he.singer||he.artist||"Тодорхойгүй",composer:he.composer||"",genre:he.genre,file:Le,cover:De||he.coverUrl||Bu[Math.abs(he.title.length)%Bu.length].cover,custom:!0})}C&&N(fe)}b();const z=()=>b();return addEventListener("medreh:library-changed",z),()=>{C=!1,removeEventListener("medreh:library-changed",z),L.forEach(te=>URL.revokeObjectURL(te))}},[t]),U.useEffect(()=>{if(!t)return;Xe(ec());const C=()=>Xe(ec());return addEventListener("medreh:feed-changed",C),addEventListener("storage",C),()=>{removeEventListener("medreh:feed-changed",C),removeEventListener("storage",C)}},[t]);const at=k.filter(C=>C.date>Ye).length;function F(){const C=!Ue;je(C),xe(!1),Ee(!1),C&&be&&(mb(be),setTimeout(()=>ot(Date.now()),600))}function Me(C){E(L=>{const b=L.includes(C)?L.filter(z=>z!==C):[C,...L];return localStorage.setItem(Se,JSON.stringify(b)),b})}function q(C){R(L=>{const b=L.includes(C)?L.filter(z=>z!==C):[C,...L];return localStorage.setItem(Ve,JSON.stringify(b)),b})}function K(C){Re(L=>{const b={...L,...C,bands:{...L.bands,...C.bands||{}}};return!b.bands.bass&&!b.bands.mid&&!b.bands.high?L:(localStorage.setItem(We,JSON.stringify(b)),b)})}function pe(){if(w.current){w.current.ctx.resume();return}const C=new(window.AudioContext||window.webkitAudioContext),L=C.createMediaElementSource(D.current),b=C.createAnalyser();b.fftSize=256,b.smoothingTimeConstant=.7,L.connect(b),b.connect(C.destination),w.current={ctx:C,an:b,data:new Uint8Array(b.frequencyBinCount)}}function ze(C,L,b){H.current||(H.current=new(window.AudioContext||window.webkitAudioContext));const z=H.current;z.state==="suspended"&&z.resume();const te=z.createOscillator(),fe=z.createGain();te.type=b,te.frequency.value=C,fe.gain.setValueAtTime(0,z.currentTime),fe.gain.linearRampToValueAtTime(.45,z.currentTime+.02),fe.gain.exponentialRampToValueAtTime(1e-4,z.currentTime+L),te.connect(fe),fe.connect(z.destination),te.start(),te.stop(z.currentTime+L+.05)}if(U.useEffect(()=>{if(!t)return;let C,L;const b=()=>{C=requestAnimationFrame(b);const z=w.current,te=se.current,fe=Zm[te.light].mult;if(z&&I){z.an.getByteFrequencyData(z.data);const he=z.data.length,Pe=Math.floor(he*.08),Le=Math.floor(he*.38);let De=0,et=0,ht=0,it;for(it=0;it<Pe;it++)De+=z.data[it];for(it=Pe;it<Le;it++)et+=z.data[it];for(it=Le;it<he;it++)ht+=z.data[it];De/=Pe*255,et/=(Le-Pe)*255,ht/=(he-Le)*255,ae.current={lo:De,mi:et,hi:ht};const Ot=Math.max(te.bands.bass?De:0,te.bands.mid?et:0,te.bands.high?ht:0);ie.current&&(ie.current.style.opacity=Math.min(1,(.1+Ot*.7)*fe).toFixed(3),ie.current.style.transform="translate(-50%,-50%) scale("+(1+Ot*.5*fe).toFixed(3)+")"),_e.current.forEach((rt,Fe)=>{if(!rt)return;const Dt=z.data[Math.floor(Fe/_e.current.length*he*.7)]/255;rt.style.height=Math.max(3,Dt*22)+"px"}),Be.current.forEach((rt,Fe)=>{if(!rt)return;const Dt=z.data[Math.floor(Fe/Be.current.length*he*.72)]/255;rt.style.height=Math.max(2,Dt*100*Math.min(1.2,fe))+"%"}),ue.current&&(ue.current.style.transform="scale("+(1+Ot*.9*fe).toFixed(3)+")",ue.current.style.opacity=Math.min(1,.25+Ot*.85*fe).toFixed(3))}else _e.current.forEach(he=>{he&&(he.style.height="3px")})};return b(),Ge&&(L=setInterval(()=>{if(!I||!J)return;const{lo:z,mi:te,hi:fe}=ae.current,he=se.current,Pe=Km[he.vib].mult;let Le=!1;he.bands.bass&&z>.45?(navigator.vibrate(Math.round((60+z*80)*Pe)),Le=!0):he.bands.mid&&te>.35?(navigator.vibrate([Math.round(30*Pe),30,Math.round(30*Pe)]),Le=!0):he.bands.high&&fe>.3&&(navigator.vibrate(Math.max(8,Math.round(12*Pe))),Le=!0),Le&&ge.current&&ge.current.vib++},170)),()=>{cancelAnimationFrame(C),clearInterval(L),Ge&&navigator.vibrate(0)}},[t,I,J,Ge]),U.useEffect(()=>{if(!t||!I||!be)return;let C=0;const L=setInterval(()=>{const b=ge.current,z=Ne.current;if(!b||!z)return;b.total++,b.byGenre[z.genre]=(b.byGenre[z.genre]||0)+1,b.byTrack[z.id]=(b.byTrack[z.id]||0)+1;const te=Ex();b.days[te]=(b.days[te]||0)+1,++C%5===0&&Ym(be,b)},1e3);return()=>{clearInterval(L),ge.current&&Ym(be,ge.current)}},[t,I,be]),U.useEffect(()=>{const C=D.current;if(!C)return;const L=()=>{Q(C.currentTime),!i&&C.currentTime>=Pr&&(C.pause(),ne(!0))},b=()=>Y(C.duration),z=()=>G(!0),te=()=>G(!1),fe=()=>Ie();return C.addEventListener("timeupdate",L),C.addEventListener("loadedmetadata",b),C.addEventListener("play",z),C.addEventListener("pause",te),C.addEventListener("ended",fe),()=>{C.removeEventListener("timeupdate",L),C.removeEventListener("loadedmetadata",b),C.removeEventListener("play",z),C.removeEventListener("pause",te),C.removeEventListener("ended",fe)}}),U.useEffect(()=>{if(!t&&D.current&&D.current.pause(),document.body.classList.toggle("native-cursor",t),!t)return;const C=L=>{if(L.key==="Escape"){if(ke){Ke(!1);return}if(re||me||Ue){xe(!1),Ee(!1),je(!1);return}if(!$e){if(u!=="home"){f("home");return}e()}}};return addEventListener("keydown",C),()=>{removeEventListener("keydown",C),document.body.classList.remove("native-cursor")}},[t,e,ke,re,me,Ue,u,$e]),U.useEffect(()=>()=>{H.current&&H.current.close().catch(()=>{})},[]),!t)return null;const qe=[...Bu,...A],xt=["Бүгд",...new Set(qe.map(C=>C.genre))],pt=qe.filter(C=>{if(v!=="Бүгд"&&C.genre!==v)return!1;const L=m.trim().toLowerCase();return L?(C.title+" "+C.artist+" "+C.genre).toLowerCase().includes(L):!0}),nt=C=>qe.find(L=>L.id===C),W=d.map(nt).filter(Boolean),oe=_.map(nt).filter(Boolean),de=P.map(nt).filter(Boolean);function ve(C){const L=D.current;if(pe(),ne(!1),(S==null?void 0:S.id)===C.id){I?L.pause():L.play();return}M(C),Ne.current=C,x(b=>[C.id,...b.filter(z=>z!==C.id)].slice(0,6)),L.src=C.file,L.play()}function Oe(){if(!S){pt[0]&&ve(pt[0]);return}pe();const C=D.current;if(I)C.pause();else{if(ee)return;C.play()}}function Te(C){const L=D.current;if(!L||!S)return;let b=Math.max(0,L.currentTime+C);i||(b=Math.min(b,Pr-1)),L.currentTime=Math.min(b,(L.duration||1)-.5)}function ye(C){const L=D.current;if(!L||!S||!X)return;const b=C.currentTarget.getBoundingClientRect();let z=(C.clientX-b.left)/b.width*X;i||(z=Math.min(z,Pr-1)),L.currentTime=z}function Z(C){if(!S)return;const L=qe.findIndex(z=>z.id===S.id),b=qe[(L+C+qe.length)%qe.length];ve(b)}function Ie(){Z(1)}function mt(C){h(C),f("detail")}function Rt(C){const L=Nx[C.genre]||Px;if(Ge)try{navigator.vibrate(L.pattern)}catch{}const b=L.bass>=L.mid&&L.bass>=L.high?[55,.7,"sine"]:L.mid>=L.high?[330,.45,"triangle"]:[1500,.3,"square"];ze(b[0],b[1],b[2])}const gr=X?j/X*100:0,Un=X&&!i?Math.min(100,Pr/X*100):100,qn=((n==null?void 0:n.name)||"?").trim().charAt(0).toUpperCase(),T=(B=n==null?void 0:n.sub)!=null&&B.renews?new Date(n.sub.renews).toLocaleDateString("mn-MN"):null;return l.jsxs("div",{className:"pl-ov sp",children:[l.jsx("audio",{ref:D,crossOrigin:"anonymous"}),l.jsx("div",{className:"pl-glow",ref:ie,"aria-hidden":"true"}),l.jsxs("header",{className:"sp-top",children:[l.jsxs("span",{className:"sp-logo",children:["МЭДРЭХ",l.jsx("sup",{children:"®"}),s&&l.jsx("em",{className:"sp-admchip",children:"АДМИН"})]}),l.jsxs("div",{className:"sp-center",children:[l.jsx("button",{className:"sp-icbtn"+(u==="home"?" on":""),onClick:()=>f("home"),"aria-label":"Нүүр",title:"Нүүр",children:l.jsxs("svg",{width:"19",height:"19",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("path",{d:"M3 10.5 12 3l9 7.5"}),l.jsx("path",{d:"M5 9.5V21h14V9.5"})]})}),l.jsxs("div",{className:"sp-search",children:[l.jsxs("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round","aria-hidden":"true",children:[l.jsx("circle",{cx:"11",cy:"11",r:"7"}),l.jsx("line",{x1:"21",y1:"21",x2:"16.5",y2:"16.5"})]}),l.jsx("input",{type:"search",placeholder:"Юу сонсмоор байна?",value:m,onFocus:()=>f("home"),onChange:C=>y(C.target.value),"aria-label":"Дуу хайх"})]}),l.jsx("div",{className:"sp-viz","aria-hidden":"true",children:[0,1,2,3,4].map(C=>l.jsx("i",{ref:L=>{_e.current[C]=L}},C))})]}),l.jsxs("div",{className:"sp-right",children:[!i&&l.jsx("button",{className:"bt bt-a sp-subbtn",onClick:r,children:"Захиалга авах"}),s&&l.jsx("button",{className:"sp-icbtn sp-admbtn"+(u==="admin"?" on":""),onClick:()=>f("admin"),"aria-label":"Хяналтын самбар",title:"Хяналтын самбар",children:l.jsxs("svg",{width:"19",height:"19",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("rect",{x:"3",y:"3",width:"7",height:"9",rx:"1.5"}),l.jsx("rect",{x:"14",y:"3",width:"7",height:"5",rx:"1.5"}),l.jsx("rect",{x:"14",y:"12",width:"7",height:"9",rx:"1.5"}),l.jsx("rect",{x:"3",y:"16",width:"7",height:"5",rx:"1.5"})]})}),l.jsxs("div",{className:"sp-dd-wrap",children:[l.jsxs("button",{className:"sp-icbtn sp-bell"+(Ue?" on":""),onClick:F,"aria-label":"Мэдэгдэл"+(at?" — "+at+" шинэ":""),"aria-expanded":Ue,title:"Мэдэгдэл",children:[l.jsxs("svg",{width:"19",height:"19",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("path",{d:"M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"}),l.jsx("path",{d:"M13.7 21a2 2 0 0 1-3.4 0"})]}),at>0&&l.jsx("span",{className:"sp-bell-n",children:at>9?"9+":at})]}),Ue&&l.jsxs("div",{className:"sp-dd sp-notifs",role:"dialog","aria-label":"Мэдэгдлүүд",children:[l.jsx("span",{className:"mono",children:"Мэдэгдэл"}),k.length===0&&l.jsx("p",{className:"sp-side-empty",children:"Мэдэгдэл алга"}),k.map(C=>l.jsxs("div",{className:"sp-notif"+(C.date>Ye?" new":""),children:[l.jsx("span",{className:"sp-notif-ic","aria-hidden":"true",children:C.icon}),l.jsxs("div",{children:[l.jsx("p",{children:C.text}),l.jsx("span",{className:"mono",children:Tb(C.date)})]})]},C.id))]})]}),l.jsxs("div",{className:"sp-dd-wrap",children:[l.jsx("button",{className:"sp-icbtn"+(re?" on":""),onClick:()=>{xe(!re),Ee(!1),je(!1)},"aria-label":"Мэдрэхүйн тохиргоо","aria-expanded":re,title:"Мэдрэхүйн тохиргоо",children:l.jsxs("svg",{width:"19",height:"19",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("circle",{cx:"12",cy:"12",r:"3"}),l.jsx("path",{d:"M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.11-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1.11 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.09a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.09a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z"})]})}),re&&l.jsxs("div",{className:"sp-dd sp-settings",role:"dialog","aria-label":"Мэдрэхүйн тохиргоо",children:[l.jsx("span",{className:"mono",children:"Мэдрэхүйн тохиргоо"}),l.jsx("label",{className:"sp-set-l",children:"📳 Чичиргээний хүч"}),l.jsx("div",{className:"sp-seg",children:Km.map((C,L)=>l.jsx("button",{className:le.vib===L?"on":"",onClick:()=>K({vib:L}),children:C.label},C.label))}),l.jsx("label",{className:"sp-set-l",children:"💡 Гэрлийн эрчим"}),l.jsx("div",{className:"sp-seg",children:Zm.map((C,L)=>l.jsx("button",{className:le.light===L?"on":"",onClick:()=>K({light:L}),children:C.label},C.label))}),l.jsx("label",{className:"sp-set-l",children:"🎚 Мэдрэх давтамжийн бүс"}),l.jsx("div",{className:"sp-bands",children:[["bass","Бас"],["mid","Дунд"],["high","Өндөр"]].map(([C,L])=>l.jsxs("button",{className:le.bands[C]?"on":"",onClick:()=>K({bands:{[C]:!le.bands[C]}}),"aria-pressed":le.bands[C],children:[le.bands[C]?"✓ ":"",L]},C))}),l.jsx("button",{className:"sp-prof-btn",onClick:()=>{xe(!1),He(!0)},children:"🎛 Калибровк дахин хийх"}),l.jsx("p",{className:"sp-set-note",children:"Сонсголын мэдрэмж хүн бүрд өөр — тохиргоо автоматаар хадгалагдана."})]})]}),l.jsxs("div",{className:"sp-dd-wrap",children:[l.jsx("button",{className:"sp-avatar"+(s?" adm":"")+(me?" on":""),onClick:()=>{Ee(!me),xe(!1),je(!1)},"aria-label":"Профайл цэс","aria-expanded":me,title:n==null?void 0:n.name,children:qn}),me&&l.jsxs("div",{className:"sp-dd sp-profile",role:"dialog","aria-label":"Профайл",children:[l.jsxs("div",{className:"sp-prof-top",children:[l.jsx("span",{className:"sp-avatar sp-avatar-lg","aria-hidden":"true",children:qn}),l.jsxs("div",{children:[l.jsx("b",{children:n==null?void 0:n.name}),l.jsx("i",{children:n==null?void 0:n.email})]})]}),l.jsx("div",{className:"sp-prof-sub"+(i?" pro":""),children:s?l.jsxs(l.Fragment,{children:[l.jsx("b",{children:"Админ эрх"}),l.jsx("span",{children:"Бүх боломж нээлттэй"})]}):i?l.jsxs(l.Fragment,{children:[l.jsx("b",{children:"PRO идэвхтэй"}),l.jsxs("span",{children:["Дараагийн төлбөр: ",T]})]}):l.jsxs(l.Fragment,{children:[l.jsx("b",{children:"Үнэгүй горим"}),l.jsxs("span",{children:["Дуу тус бүрээс ",Pr," сек"]})]})}),l.jsx("button",{className:"sp-prof-btn",onClick:()=>{Ee(!1),f("profile")},children:"👤 Профайл засах"}),l.jsx("button",{className:"sp-prof-btn",onClick:()=>{Ee(!1),f("playlists")},children:"🎧 Миний жагсаалт"}),l.jsx("button",{className:"sp-prof-btn",onClick:()=>{Ee(!1),f("devices")},children:"📱 Төхөөрөмж холбох"}),l.jsx("button",{className:"sp-prof-btn",onClick:()=>{Ee(!1),f("stats")},children:"📊 Миний статистик"}),l.jsx("button",{className:"sp-prof-btn",onClick:()=>{Ee(!1),f("billing")},children:"💳 Захиалга удирдах"}),l.jsx("button",{className:"sp-prof-btn",onClick:()=>{Ee(!1),f("help")},children:"❓ Тусламж"}),s&&l.jsx("button",{className:"sp-prof-btn",onClick:()=>{Ee(!1),f("admin")},children:"🛠 Хяналтын самбар"}),l.jsx("button",{className:"sp-prof-btn danger",onClick:o,children:"Гарах"})]})]}),l.jsx("button",{className:"auth-x pl-x",onClick:e,"aria-label":"Хаах",children:"✕"})]})]}),(re||me||Ue)&&l.jsx("div",{className:"sp-dd-veil",onClick:()=>{xe(!1),Ee(!1),je(!1)}}),l.jsxs("div",{className:"sp-shell",children:[l.jsxs("aside",{className:"sp-side",children:[l.jsx("span",{className:"mono sp-side-h",children:"♥ Дуртай дуунууд"}),oe.length===0?l.jsxs("div",{className:"sp-empty-tile",children:[l.jsx("span",{className:"sp-empty-ic","aria-hidden":"true",children:l.jsx("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"currentColor",children:l.jsx("path",{d:"M12 21s-7.5-4.9-10-9.2C.3 8.6 2 5 5.5 5c2 0 3.4 1.1 4.2 2.3L12 9.6l2.3-2.3C15.1 6.1 16.5 5 18.5 5 22 5 23.7 8.6 22 11.8 19.5 16.1 12 21 12 21z"})})}),l.jsxs("p",{children:["Дууны ",l.jsx("b",{children:"♥ зүрхэн"})," дээр дарахад дуртай дуу чинь энд цуглана"]})]}):l.jsx(ju,{tracks:oe,curId:S==null?void 0:S.id,playing:I,onPlay:ve}),l.jsx("span",{className:"mono sp-side-h",children:"Хадгалсан"}),de.length===0?l.jsxs("div",{className:"sp-empty-tile",children:[l.jsx("span",{className:"sp-empty-ic sp-empty-warm","aria-hidden":"true",children:l.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"currentColor",children:l.jsx("path",{d:"M6 2h12a1 1 0 0 1 1 1v19l-7-4.2L5 22V3a1 1 0 0 1 1-1z"})})}),l.jsxs("p",{children:["Дууг ",l.jsx("b",{children:"🔖 хадгалах"})," товчоор тэмдэглээд дараа нь сонсоорой"]})]}):l.jsx(ju,{tracks:de,curId:S==null?void 0:S.id,playing:I,onPlay:ve}),W.length>0&&l.jsxs(l.Fragment,{children:[l.jsx("span",{className:"mono sp-side-h",children:"Саяхан сонссон"}),l.jsx(ju,{tracks:W,curId:S==null?void 0:S.id,playing:I,onPlay:ve})]})]}),l.jsxs("main",{className:"sp-main",children:[u==="home"&&l.jsx(Hb,{genres:xt,genre:v,onGenre:g,list:pt,query:m,curId:S==null?void 0:S.id,playing:I,onPlay:ve,likes:_,saves:P,onToggleLike:Me,onToggleSave:q,onInfo:mt,subscribed:i,onSubscribe:r}),u==="stats"&&l.jsx(Ob,{stats:ge.current,byId:nt,onPlay:ve,onBack:()=>f("home")}),u==="billing"&&l.jsx(jb,{email:be,user:n,isAdmin:s,subscribed:i,renewDate:T,onSubscribe:r,onCancelSub:c,onBack:()=>f("home")}),u==="help"&&l.jsx(Ub,{onOpenCalibrate:()=>He(!0),onBack:()=>f("home")}),u==="detail"&&l.jsx(Fb,{track:p,isCurrent:(S==null?void 0:S.id)===(p==null?void 0:p.id),playing:I,onPlay:()=>ve(p),onFeelTest:()=>Rt(p),onBack:()=>f("home")}),u==="admin"&&s&&l.jsx(Bb,{allTracksCount:qe.length,onOpenAdmin:a,onGoHome:()=>f("home")}),u==="profile"&&l.jsx(Rb,{onBack:()=>f("home")}),u==="devices"&&l.jsx(Lb,{prefs:le,onUpdatePrefs:K,canVibrate:Ge,onBack:()=>f("home")}),u==="playlists"&&l.jsx(Db,{email:be,tracks:qe,onPlay:ve,curId:S==null?void 0:S.id,playing:I,onBack:()=>f("home")})]})]}),ee&&!i&&l.jsxs("div",{className:"sp-limit",children:[l.jsx("p",{children:"Урьдчилан сонсголт дууслаа — бүтэн дуу сонсохын тулд PRO захиалга аваарай."}),l.jsx("button",{className:"bt bt-a",onClick:r,children:"Захиалга авах →"})]}),l.jsxs("footer",{className:"sp-bar",children:[l.jsx("div",{className:"sp-bar-l",children:S?l.jsxs(l.Fragment,{children:[l.jsx("img",{className:"sp-thumb",src:S.cover,alt:""}),l.jsxs("div",{className:"sp-bar-meta",children:[l.jsx("b",{children:S.title}),l.jsx("i",{children:S.artist})]})]}):l.jsx("span",{className:"sp-bar-hint",children:"Дуу сонгоогүй байна"})}),l.jsxs("div",{className:"sp-bar-c",children:[l.jsxs("div",{className:"sp-ctl",children:[l.jsx("button",{onClick:()=>Z(-1),"aria-label":"Өмнөх дуу",children:"⏮"}),l.jsx("button",{onClick:()=>Te(-10),"aria-label":"10 секунд ухраах",className:"sp-skip",children:"−10с"}),l.jsx("button",{className:"sp-play",onClick:Oe,"aria-label":I?"Зогсоох":"Тоглуулах",children:I?"⏸":"▶"}),l.jsx("button",{onClick:()=>Te(10),"aria-label":"10 секунд урагшлуулах",className:"sp-skip",children:"+10с"}),l.jsx("button",{onClick:()=>Z(1),"aria-label":"Дараагийн дуу",children:"⏭"})]}),l.jsxs("div",{className:"sp-seek",children:[l.jsx("span",{className:"mono",children:Qm(j)}),l.jsxs("div",{className:"pl-bar",onClick:ye,role:"slider","aria-label":"Гүйлгэх","aria-valuemin":0,"aria-valuemax":Math.round(X),"aria-valuenow":Math.round(j),children:[!i&&l.jsx("i",{className:"pl-lock",style:{left:Un+"%"}}),l.jsx("i",{className:"pl-fill",style:{width:gr+"%"}})]}),l.jsx("span",{className:"mono",children:Qm(X)})]})]}),l.jsxs("div",{className:"sp-bar-r",children:[l.jsxs("button",{className:"sp-vibro"+(J?" on":""),onClick:()=>O(!J),"aria-pressed":J,title:Ge?"Чичиргээ горим":"Утсан дээр чичиргээ ажиллана — энд гэрлийн пульс",children:["📳 ",J?"Асаалттай":"Унтраалттай"]}),l.jsx("button",{className:"sp-icbtn sp-immbtn",onClick:()=>Ke(!0),disabled:!S,"aria-label":"Мэдрэх горим — бүтэн дэлгэц",title:S?"Мэдрэх горим":"Эхлээд дуу сонгоорой",children:l.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",children:l.jsx("path",{d:"M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"})})})]})]}),ke&&S&&l.jsx(zb,{track:S,onClose:()=>Ke(!1),barsRef:Be,pulseRef:ue}),l.jsx(wb,{open:$e,onClose:()=>He(!1),onDone:C=>K(C)})]})}const wr={name:"МЭДРЭХ PRO",price:"9'900₮",period:"сар бүр"},Gb="4242424242424242";function sg(t){return(t||"").replace(/\D/g,"")}function Wb({open:t,onClose:e,user:n,onSubscribed:i}){const[r,s]=U.useState(!1),[a,o]=U.useState(""),[c,u]=U.useState(!1);if(U.useEffect(()=>{if(!t)return;o(""),u(!1),s(!1);const p=h=>{h.key==="Escape"&&!r&&e()};return addEventListener("keydown",p),()=>removeEventListener("keydown",p)},[t,e,r]),!t)return null;function f(p){p.preventDefault(),o("");const h=new FormData(p.target),m=sg(h.get("card")),y=(h.get("exp")||"").trim(),v=sg(h.get("cvc"));if(m.length!==16){o("Картын дугаар 16 оронтой байх ёстой");return}const g=y.match(/^(0[1-9]|1[0-2])\s*\/\s*(\d{2})$/);if(!g){o("Дуусах хугацаа MM/YY хэлбэрээр (ж: 08/27)");return}if(new Date(2e3+ +g[2],+g[1],1)<=new Date){o("Картын хугацаа дууссан байна");return}if(v.length<3){o("CVC 3 оронтой байх ёстой");return}if(m!==Gb){o("Карт татгалзлаа. Демо горим: 4242 4242 4242 4242 ашиглана уу");return}s(!0),setTimeout(()=>{const x=new Date,_=new Date(x);_.setMonth(_.getMonth()+1);const E={active:!0,plan:wr.name,since:x.getTime(),renews:_.getTime()},P=mr(),R=P.find(A=>A.email===n.email);R&&(R.sub=E,ea(P)),vb(n.email,{id:"inv-"+Date.now(),date:x.getTime(),amount:wr.price,plan:wr.name,method:"Карт •••• 4242",status:"Амжилттай"}),s(!1),u(!0),i(E),setTimeout(e,1400)},1600)}return l.jsx("div",{className:"auth-ov",onMouseDown:p=>{p.target===p.currentTarget&&!r&&e()},children:l.jsxs("div",{className:"auth-box sub-box",role:"dialog","aria-modal":"true","aria-label":"Сарын захиалга",children:[l.jsx("button",{className:"auth-x",onClick:e,"aria-label":"Хаах",children:"✕"}),l.jsx("span",{className:"mono",children:"МЭДРЭХ® / Захиалга"}),l.jsxs("div",{className:"sub-plan",children:[l.jsxs("div",{children:[l.jsx("b",{children:wr.name}),l.jsx("span",{children:"Бүх дууг бүрэн сонсох · чичиргээ + гэрлийн горим · шинэ дуу нэмэгдэх бүрд"})]}),l.jsxs("div",{className:"sub-price",children:[l.jsx("b",{children:wr.price}),l.jsx("span",{className:"mono",children:wr.period})]})]}),c?l.jsxs("div",{className:"sub-done",children:[l.jsx("b",{children:"✓ Захиалга идэвхжлээ!"}),l.jsxs("p",{children:["Дараагийн төлбөр: ",new Date(Date.now()+2592e6).toLocaleDateString("mn-MN")]})]}):l.jsxs("form",{onSubmit:f,children:[l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Картын дугаар"}),l.jsx("input",{name:"card",inputMode:"numeric",placeholder:"4242 4242 4242 4242",autoComplete:"cc-number"})]}),l.jsxs("div",{className:"sub-row2",children:[l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"Дуусах хугацаа"}),l.jsx("input",{name:"exp",inputMode:"numeric",placeholder:"MM/YY",autoComplete:"cc-exp"})]}),l.jsxs("label",{children:[l.jsx("span",{className:"mono",children:"CVC"}),l.jsx("input",{name:"cvc",inputMode:"numeric",placeholder:"123",autoComplete:"cc-csc"})]})]}),a&&l.jsx("p",{className:"auth-err",children:a}),l.jsx("button",{type:"submit",className:"bt bt-a auth-sub",disabled:r,children:r?"Боловсруулж байна…":wr.price+" төлж захиалах"})]}),l.jsx("p",{className:"auth-note mono",children:"Демо горим (Stripe test) — жинхэнэ мөнгө шилжихгүй · туршилтын карт 4242 4242 4242 4242"})]})})}function Xb(){U.useEffect(()=>(ab(),hb(),sb()),[]);const{user:t,isAdmin:e,subscribed:n,login:i,logout:r,setSub:s,cancelSub:a}=Dx(),[o,c]=U.useState(!1),[u,f]=U.useState(!1),[p,h]=U.useState(!1),[m,y]=U.useState(!1),v=E=>{i(E),h(!0)},g=()=>{r(),f(!1),h(!1),y(!1)},d=()=>{t?h(!0):c(!0)},x=E=>s(E),_=()=>a();return l.jsxs(l.Fragment,{children:[l.jsx($b,{}),l.jsx("div",{className:"cr",id:"cr"}),l.jsx("div",{className:"cd",id:"cd"}),l.jsx("div",{className:"grid-bg"}),l.jsx("div",{className:"glow g1"}),l.jsx("div",{className:"glow g2"}),l.jsx(qb,{}),l.jsx(Yb,{user:t,isAdmin:e,onLogin:()=>c(!0),onLogout:g,onAdmin:()=>f(!0),onPlayer:d}),l.jsx(Kb,{}),l.jsx(Qb,{}),l.jsx(eR,{}),l.jsx(nR,{}),l.jsx(iR,{}),l.jsx(rR,{}),l.jsx(ub,{open:o,onClose:()=>c(!1),onAuth:v}),l.jsx(Mb,{open:u,onClose:()=>f(!1),currentUser:t}),l.jsx(Vb,{open:p,onClose:()=>h(!1),user:t,subscribed:n,onSubscribe:()=>y(!0),isAdmin:e,onAdmin:()=>f(!0),onLogout:g,onCancelSub:_}),l.jsx(Wb,{open:m,onClose:()=>y(!1),user:t,onSubscribed:x})]})}function $b(){return l.jsxs("div",{className:"pre",id:"pre",children:[l.jsx("b",{children:"МЭДРЭХ"}),l.jsx("b",{id:"pct",style:{fontSize:"clamp(24px,4.5vw,54px)"},children:"0"}),l.jsx("div",{className:"pre-line",children:l.jsx("i",{id:"pbar"})})]})}function qb(){return l.jsxs("header",{className:"hero",id:"hero",children:[l.jsx("canvas",{id:"stage"}),l.jsx("div",{className:"hero-veil"}),l.jsx("span",{className:"vside vs-l",children:"Сонсголын бэрхшээлтэй хүмүүст"}),l.jsx("span",{className:"vside vs-r",children:"20 Hz — 20 000 Hz"}),l.jsxs("div",{className:"fc fc1","data-sp":"0.12",children:[l.jsxs("div",{className:"fr",children:[l.jsx("img",{src:rh,alt:"Концертын танхим, гэрэлтсэн тайз",loading:"lazy"}),l.jsx("div",{className:"tint t-warm"})]}),l.jsx("span",{className:"cap",children:"Тайз / 40 Hz"})]}),l.jsxs("div",{className:"mon",id:"mon","data-sp":"-0.08",children:[l.jsxs("div",{className:"mh",children:[l.jsx("span",{className:"mono",style:{fontSize:9},children:"Шууд дохио"}),l.jsx("span",{className:"dot"})]}),l.jsx("canvas",{id:"monwave"}),l.jsxs("div",{className:"mf",children:[l.jsx("span",{className:"mono",style:{fontSize:9},children:"Бас"}),l.jsx("span",{className:"mono",style:{fontSize:9},children:"Дунд"}),l.jsx("span",{className:"mono",style:{fontSize:9},children:"Өндөр"})]})]}),l.jsxs("div",{className:"word",children:[l.jsx("div",{className:"w-eyebrow",children:l.jsx("span",{className:"mono",children:"Хөгжмийг мэдрэх систем"})}),l.jsxs("div",{className:"fitbox",id:"fitbox",children:[l.jsx("canvas",{id:"slash"}),l.jsxs("h1",{id:"wm",children:[l.jsx("em",{children:l.jsx("i",{children:"М"})}),l.jsx("em",{children:l.jsx("i",{children:"Э"})}),l.jsx("em",{children:l.jsx("i",{children:"Д"})}),l.jsx("em",{children:l.jsx("i",{children:"Р"})}),l.jsx("em",{children:l.jsx("i",{children:"Э"})}),l.jsx("em",{children:l.jsx("i",{children:"Х"})})]})]}),l.jsx("p",{className:"sub",children:"(Дуу авиаг чичиргээ, гэрэл, хөдөлгөөн болгон хөрвүүлнэ)"})]}),l.jsxs("div",{className:"hmeta",children:[l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Мэдрэхүйн суваг"}),l.jsx("b",{children:"Чичиргээ · Гэрэл · Хөдөлгөөн"})]}),l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Давтамжийн бүс"}),l.jsx("b",{children:"3 бүс, тус бүр өөр хэлбэр"})]}),l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Хоцролт"}),l.jsx("b",{children:"40 мс дотор"})]}),l.jsxs("div",{children:[l.jsx("span",{className:"mono",children:"Платформ"}),l.jsx("b",{children:"Web · Android"})]})]}),l.jsxs("div",{className:"badge",children:[l.jsxs("svg",{viewBox:"0 0 100 100",children:[l.jsx("defs",{children:l.jsx("path",{id:"cp",d:"M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"})}),l.jsx("text",{fill:"#4E5B59",fontFamily:"JetBrains Mono, monospace",fontSize:"8.2",letterSpacing:"3.2",children:l.jsx("textPath",{href:"#cp",children:"ДООШ ГҮЙЛГЭЖ ҮЗ · ДООШ ГҮЙЛГЭЖ ҮЗ · "})})]}),l.jsx("span",{className:"arw",children:"↓"})]})]})}function Yb({user:t,isAdmin:e,onLogin:n,onLogout:i,onAdmin:r,onPlayer:s}){return l.jsxs("nav",{className:"dock",id:"dock",children:[l.jsxs("div",{className:"nav-left",children:[l.jsx("button",{className:"disc",id:"disc","aria-label":"Дуу эхлүүлэх"}),l.jsxs("a",{href:"#top",className:"nav-logo keep",children:["МЭДРЭХ",l.jsx("sup",{children:"®"})]})]}),t&&l.jsxs("div",{className:"nav-links",children:[l.jsx("a",{href:"#top",className:"keep",children:"Нүүр"}),l.jsx("a",{href:"#feel",children:"Мэдрэх"}),l.jsx("a",{href:"#gal",children:"Галерей"}),l.jsx("a",{href:"#how",children:"Хэрхэн"}),l.jsx("button",{className:"nav-play keep",onClick:s,children:"♫ Тоглуулагч"})]}),l.jsxs("div",{className:"nav-right",children:[e&&l.jsx("button",{className:"dock-auth adm-btn keep",onClick:r,children:"Админ"}),t?l.jsxs("button",{className:"dock-auth keep",onClick:i,title:t.email+" · Гарах",children:[t.name," · Гарах"]}):l.jsx("button",{className:"dock-auth keep",onClick:n,children:"Нэвтрэх"})]})]})}const ag=["мэдрэх","чичиргээ","давтамж","хэмнэл","өнгө","мэдрэхүй"];function Kb(){return l.jsx("div",{className:"mq",children:l.jsx("div",{className:"mq-in",children:[...ag,...ag].map((t,e)=>l.jsx("span",{children:t},e))})})}const Zb=[{band:"bass",idx:"01",name:"Бас",hz:"20—250 Hz",ms:"230 · 80 · 230",tot:"540 ms"},{band:"mid",idx:"02",name:"Дунд",hz:"250 Hz—4 kHz",ms:"70 · 50 · 70 · 50 · 70",tot:"310 ms"},{band:"high",idx:"03",name:"Өндөр",hz:"4—20 kHz",ms:"24 × 9",tot:"216 ms"}];function Qb(){return l.jsx("section",{id:"feel",children:l.jsxs("div",{className:"wrap",children:[l.jsxs("div",{className:"head rv",children:[l.jsx("div",{className:"eyebrow",children:l.jsx("span",{className:"mono",children:"01 / Хаптик самбар"})}),l.jsxs("h2",{children:[l.jsx("span",{className:"ln",children:l.jsx("i",{children:"Уншихаа боль."})}),l.jsx("span",{className:"ln",children:l.jsx("i",{children:"Дараад үз."})})]}),l.jsx("p",{children:"Давтамжийн гурван бүс, тус бүр өөрийн хаптик хэлбэртэй. Мөр дээр дарахад утас нь тэр хэлбэрээр чичрэнэ."})]}),l.jsxs("div",{className:"console rv",children:[l.jsxs("div",{className:"c-top",children:[l.jsx("span",{children:"№"}),l.jsx("span",{children:"Бүс"}),l.jsx("span",{children:"Давтамж"}),l.jsx("span",{children:"Долгион"}),l.jsx("span",{children:"Хаптик хэв маяг"}),l.jsx("span",{children:"Урт"})]}),Zb.map(t=>l.jsxs("button",{className:"crow","data-band":t.band,children:[l.jsx("span",{className:"ring"}),l.jsx("span",{className:"idx",children:t.idx}),l.jsx("h3",{children:t.name}),l.jsx("span",{className:"hz",children:t.hz}),l.jsx("canvas",{className:"scope","data-band":t.band}),l.jsxs("div",{children:[l.jsx("div",{className:"hap","data-band":t.band}),l.jsx("div",{className:"ms",children:t.ms})]}),l.jsx("span",{className:"tot",children:t.tot})]},t.band))]}),l.jsxs("div",{className:"anz rv",children:[l.jsxs("div",{className:"db",children:[l.jsx("span",{children:"0 dB"}),l.jsx("span",{children:"−20"}),l.jsx("span",{children:"−40"}),l.jsx("span",{children:"−60"})]}),l.jsxs("div",{className:"plot",children:[l.jsx("div",{className:"gl",style:{top:0}}),l.jsx("div",{className:"gl",style:{top:"33.3%"}}),l.jsx("div",{className:"gl",style:{top:"66.6%"}}),l.jsx("div",{className:"gl",style:{top:"100%"}}),l.jsx("div",{className:"bars",id:"bars"})]}),l.jsxs("div",{className:"anz-lb mono",children:[l.jsx("span",{children:"20 Hz"}),l.jsx("span",{children:"250 Hz"}),l.jsx("span",{children:"4 kHz"}),l.jsx("span",{children:"20 kHz"})]})]})]})})}const Jb=[{no:"01",img:Tx,tint:"t-cool",name:"Гүн бас",hz:"40 Hz",alt:"Чанга яригчийн ойрын зураг"},{no:"02",img:rh,tint:"t-warm",name:"Танхимын нөсөө",hz:"320 Hz",alt:"Концертын танхим, гэрэлтсэн тайз"},{no:"03",img:Ax,tint:"t-cool",name:"Хурц өндөр",hz:"8 kHz",alt:"Лазер гэрлийн туяа бүхий тайз"},{no:"04",img:Cx,tint:"t-rose",name:"Цохилтын хэлбэр",hz:"90 Hz",alt:"Гараа өргөсөн үзэгчид"},{no:"05",img:bx,tint:"t-warm",name:"Чимээгүй завсар",hz:"0 Hz",alt:"Микрофоны ойрын зураг"},{no:"06",img:Rx,tint:"t-cool",name:"Бүтэн спектр",hz:"20—20k",alt:"Олон өнгийн гэрлийн шоу"}];function eR(){return l.jsx("div",{className:"gal-outer",id:"gal",children:l.jsxs("div",{className:"gal-sticky",children:[l.jsxs("div",{className:"gal-head",children:[l.jsxs("div",{children:[l.jsx("div",{className:"eyebrow",style:{marginBottom:16},children:l.jsx("span",{className:"mono",children:"02 / Галерей"})}),l.jsx("h2",{children:"Дуу бүр өөрийн дүр төрхтэй"})]}),l.jsxs("div",{className:"gal-prog",children:[l.jsx("span",{className:"mono",id:"galno",children:"01"}),l.jsx("div",{className:"track",children:l.jsx("i",{id:"galbar"})}),l.jsx("span",{className:"mono",children:"06"})]})]}),l.jsx("div",{className:"gal-track",id:"track",children:Jb.map(t=>l.jsxs("div",{className:"slide",children:[l.jsxs("div",{className:"fr",children:[l.jsx("span",{className:"no",children:t.no}),l.jsx("img",{src:t.img,alt:t.alt,loading:"lazy"}),l.jsx("div",{className:`tint ${t.tint}`})]}),l.jsxs("div",{className:"meta",children:[l.jsx("h3",{children:t.name}),l.jsx("span",{className:"mono",children:t.hz})]})]},t.no))})]})})}const tR=[{n:"01",name:"Дуу орж ирнэ",text:"Утсан дээрээ дуу тоглуулах эсвэл микрофоноор орчны дууг сонсгоно. Ямар ч хөгжим байж болно."},{n:"02",name:"Систем дууг задлана",text:"Апп дууг 3 хэсэгт хуваана — бүдүүн дуу (бөмбөр), дунд дуу (хоолой, гитар), нарийн дуу (цан, исгэрэх)."},{n:"03",name:"Мэдрэмж болгон хувиргана",text:"Бүдүүн дуу = хүчтэй урт чичиргээ, дунд = зөөлөн хэмнэл, нарийн = богино түргэн чичиргээ + гэрэл."},{n:"04",name:"Та мэдэрнэ",text:"Утас гарт чинь чичирч, дэлгэц хөгжмийн хэмнэлээр гэрэлтэнэ. Дуутай бараг зэрэг — нүд ирмэхээс ч хурдан."}];function nR(){return l.jsx("section",{id:"how",children:l.jsxs("div",{className:"wrap",children:[l.jsxs("div",{className:"head rv",children:[l.jsx("div",{className:"eyebrow",children:l.jsx("span",{className:"mono",children:"03 / Хэрхэн ажилладаг вэ"})}),l.jsx("h2",{children:l.jsx("span",{className:"ln",children:l.jsx("i",{children:"Дуу хэрхэн мэдрэмж болдог вэ?"})})}),l.jsx("p",{children:"Сонсголгүй хүн хөгжмийг чихээрээ биш — гараараа, нүдээрээ мэдэрнэ. Энэ нь ердөө 4 алхмаар болдог:"})]}),l.jsx("div",{className:"steps rv",children:tR.map(t=>l.jsxs("div",{className:"step",children:[l.jsx("span",{className:"n",children:t.n}),l.jsx("h3",{children:t.name}),l.jsx("p",{children:t.text})]},t.n))})]})})}function iR(){return l.jsx("section",{className:"cta",children:l.jsxs("div",{className:"wrap",children:[l.jsx("span",{className:"mono",children:"Эхлэл"}),l.jsxs("h2",{className:"rv",style:{marginTop:32},children:[l.jsx("span",{className:"ln",children:l.jsx("i",{children:"ЧИМЭЭГҮЙ"})}),l.jsx("span",{className:"ln",children:l.jsx("i",{children:"БАЙДАЛ"})}),l.jsx("span",{className:"ln",children:l.jsx("i",{children:"ХООСОН БИШ"})})]}),l.jsxs("div",{className:"row",children:[l.jsx("button",{className:"bt bt-a mag","data-go":"#feel",children:"Аппыг турших"}),l.jsx("button",{className:"bt mag","data-go":"#how",children:"Хэрхэн ажилладаг вэ"})]})]})})}function rR(){return l.jsx("footer",{children:l.jsxs("div",{className:"wrap fin",children:[l.jsx("span",{children:"МЭДРЭХ® — дипломын төслийн үзүүлэн"}),l.jsx("span",{className:"mono",children:"Canvas · WebGL · Web Audio API · Vibration API"})]})})}function sR(){return l.jsxs("div",{className:"nf",children:[l.jsx("span",{className:"nf-code",children:"404"}),l.jsx("h1",{children:"Хуудас олдсонгүй"}),l.jsx("p",{children:"Таны хайсан хуудас байхгүй эсвэл зөөгдсөн байна."}),l.jsx(Zf,{className:"bt bt-a",to:"/",children:"← Нүүр хуудас руу буцах"})]})}Hu.createRoot(document.getElementById("root")).render(l.jsx(PM,{children:l.jsx(Ab,{children:l.jsx(Cb,{children:l.jsxs(oM,{children:[l.jsx(Fd,{path:"/",element:l.jsx(Xb,{})}),l.jsx(Fd,{path:"*",element:l.jsx(sR,{})})]})})})}));
