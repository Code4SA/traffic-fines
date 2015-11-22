function D3Tooltip(t){this.d3=t,this.id="d3-tooltip-"+ttCounter,this["class"]="d3-tooltip",this.$el=t.select("body").append("div").attr("class",this["class"]).attr("id",this.id).style("opacity",0).style("position","absolute"),this.visible=!1,ttCounter+=1}!function(){function t(t){function r(){for(;u=c<l.length&&t>f;){var n=c++,r=l[n],a=e.call(r,1);a.push(i(n)),++f,r[0].apply(null,a)}}function i(t){return function(n,e){--f,null==p&&(null!=n?(p=n,c=h=0/0,a()):(l[t]=e,--h?u||r():a()))}}function a(){null!=p?d(p):s?d(p,l):d.apply(null,[p].concat(l))}var o,u,s,l=[],c=0,f=0,h=0,p=null,d=n;return t||(t=1/0),o={defer:function(){return p||(l.push(arguments),++h,r()),o},await:function(t){return d=t,s=!1,h||a(),o},awaitAll:function(t){return d=t,s=!0,h||a(),o}}}function n(){}var e=[].slice;t.version="1.0.7","function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:this.queue=t}(),function(){var t={};this.tmpl=function n(e,r){var i=/\W/.test(e)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+e.replace(/[\r\t\n]/g," ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):t[e]=t[e]||n(document.getElementById(e).innerHTML);return r?i(r):i}}(),!function(){function t(t,n){if(n in t)return n;n=n.charAt(0).toUpperCase()+n.slice(1);for(var e=0,r=Kn.length;r>e;++e){var i=Kn[e]+n;if(i in t)return i}}function n(t){return Gn(t,ee),t}function e(t){return"function"==typeof t?t:function(){return Qn(t,this)}}function r(t){return"function"==typeof t?t:function(){return Zn(t,this)}}function i(t,n){function e(){this.removeAttribute(t)}function r(){this.removeAttributeNS(t.space,t.local)}function i(){this.setAttribute(t,n)}function a(){this.setAttributeNS(t.space,t.local,n)}function o(){var e=n.apply(this,arguments);null==e?this.removeAttribute(t):this.setAttribute(t,e)}function u(){var e=n.apply(this,arguments);null==e?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,e)}return t=Hn.ns.qualify(t),null==n?t.local?r:e:"function"==typeof n?t.local?u:o:t.local?a:i}function a(t){return t.trim().replace(/\s+/g," ")}function o(t){return new RegExp("(?:^|\\s+)"+Hn.requote(t)+"(?:\\s+|$)","g")}function u(t){return(t+"").trim().split(/^|\s+/)}function s(t,n){function e(){for(var e=-1;++e<i;)t[e](this,n)}function r(){for(var e=-1,r=n.apply(this,arguments);++e<i;)t[e](this,r)}t=u(t).map(l);var i=t.length;return"function"==typeof n?r:e}function l(t){var n=o(t);return function(e,r){if(i=e.classList)return r?i.add(t):i.remove(t);var i=e.getAttribute("class")||"";r?(n.lastIndex=0,n.test(i)||e.setAttribute("class",a(i+" "+t))):e.setAttribute("class",a(i.replace(n," ")))}}function c(t,n,e){function r(){this.style.removeProperty(t)}function i(){this.style.setProperty(t,n,e)}function a(){var r=n.apply(this,arguments);null==r?this.style.removeProperty(t):this.style.setProperty(t,r,e)}return null==n?r:"function"==typeof n?a:i}function f(t,n){function e(){delete this[t]}function r(){this[t]=n}function i(){var e=n.apply(this,arguments);null==e?delete this[t]:this[t]=e}return null==n?e:"function"==typeof n?i:r}function h(t){return"function"==typeof t?t:(t=Hn.ns.qualify(t)).local?function(){return this.ownerDocument.createElementNS(t.space,t.local)}:function(){return this.ownerDocument.createElementNS(this.namespaceURI,t)}}function p(){var t=this.parentNode;t&&t.removeChild(this)}function d(t,n){for(var e in n)Object.defineProperty(t.prototype,e,{value:n[e],enumerable:!1})}function g(){this._=Object.create(null)}function v(t){return(t+="")===ae||t[0]===oe?oe+t:t}function m(t){return(t+="")[0]===oe?t.slice(1):t}function _(t){return v(t)in this._}function y(t){return(t=v(t))in this._&&delete this._[t]}function b(){var t=[];for(var n in this._)t.push(m(n));return t}function w(){var t=0;for(var n in this._)++t;return t}function x(){for(var t in this._)return!1;return!0}function M(){this._=Object.create(null)}function A(t){return{__data__:t}}function k(t){return function(){return ne(this,t)}}function N(t,n){return n>t?-1:t>n?1:t>=n?0:0/0}function T(t){return arguments.length||(t=N),function(n,e){return n&&e?t(n.__data__,e.__data__):!n-!e}}function S(){}function q(){}function C(t){function n(){for(var n,r=e,i=-1,a=r.length;++i<a;)(n=r[i].on)&&n.apply(this,arguments);return t}var e=[],r=new g;return n.on=function(n,i){var a,o=r.get(n);return arguments.length<2?o&&o.on:(o&&(o.on=null,e=e.slice(0,a=e.indexOf(o)).concat(e.slice(a+1)),r.remove(n)),i&&e.push(r.set(n,{on:i})),t)},n}function j(t,n,e){function r(){var n=this[o];n&&(this.removeEventListener(t,n,n.$),delete this[o])}function i(){var i=s(n,Vn(arguments));r.call(this),this.addEventListener(t,this[o]=i,i.$=e),i._=n}function a(){var n,e=new RegExp("^__on([^.]+)"+Hn.requote(t)+"$");for(var r in this)if(n=r.match(e)){var i=this[r];this.removeEventListener(n[1],i,i.$),delete this[r]}}var o="__on"+t,u=t.indexOf("."),s=E;u>0&&(t=t.slice(0,u));var l=ue.get(t);return l&&(t=l,s=P),u?n?i:r:n?S:a}function E(t,n){return function(e){var r=Hn.event;Hn.event=e,n[0]=this.__data__;try{t.apply(this,n)}finally{Hn.event=r}}}function P(t,n){var e=E(t,n);return function(t){var n=this,r=t.relatedTarget;r&&(r===n||8&r.compareDocumentPosition(n))||e.call(n,t)}}function z(t,n){for(var e=0,r=t.length;r>e;e++)for(var i,a=t[e],o=0,u=a.length;u>o;o++)(i=a[o])&&n(i,o,e);return t}function R(t){return Gn(t,se),t}function L(t){var n,e;return function(r,i,a){var o,u=t[a].update,s=u.length;for(a!=e&&(e=a,n=0),i>=n&&(n=i+1);!(o=u[n])&&++n<s;);return o}}function D(t){return t}function $(t,n,e){return function(){var r=e.apply(n,arguments);return r===n?t:r}}function F(t){return function(n,e,r){return 2===arguments.length&&"function"==typeof e&&(r=e,e=null),O(n,e,t,r)}}function O(t,n,e,r){function i(){var t,n=s.status;if(!n&&X(s)||n>=200&&300>n||304===n){try{t=e.call(a,s)}catch(r){return void o.error.call(a,r)}o.load.call(a,t)}else o.error.call(a,s)}var a={},o=Hn.dispatch("beforesend","progress","load","error"),u={},s=new XMLHttpRequest,l=null;return!Wn.XDomainRequest||"withCredentials"in s||!/^(http(s)?:)?\/\//.test(t)||(s=new XDomainRequest),"onload"in s?s.onload=s.onerror=i:s.onreadystatechange=function(){s.readyState>3&&i()},s.onprogress=function(t){var n=Hn.event;Hn.event=t;try{o.progress.call(a,s)}finally{Hn.event=n}},a.header=function(t,n){return t=(t+"").toLowerCase(),arguments.length<2?u[t]:(null==n?delete u[t]:u[t]=n+"",a)},a.mimeType=function(t){return arguments.length?(n=null==t?null:t+"",a):n},a.responseType=function(t){return arguments.length?(l=t,a):l},a.response=function(t){return e=t,a},["get","post"].forEach(function(t){a[t]=function(){return a.send.apply(a,[t].concat(Vn(arguments)))}}),a.send=function(e,r,i){if(2===arguments.length&&"function"==typeof r&&(i=r,r=null),s.open(e,t,!0),null==n||"accept"in u||(u.accept=n+",*/*"),s.setRequestHeader)for(var c in u)s.setRequestHeader(c,u[c]);return null!=n&&s.overrideMimeType&&s.overrideMimeType(n),null!=l&&(s.responseType=l),null!=i&&a.on("error",i).on("load",function(t){i(null,t)}),o.beforesend.call(a,s),s.send(null==r?null:r),a},a.abort=function(){return s.abort(),a},Hn.rebind(a,o,"on"),null==r?a:a.get(I(r))}function I(t){return 1===t.length?function(n,e){t(null==n?e:null)}:t}function X(t){var n=t.responseType;return n&&"text"!==n?t.response:t.responseText}function H(){return!0}function B(){var t=V(),n=U()-t;n>24?(isFinite(n)&&(clearTimeout(pe),pe=setTimeout(B,n)),he=0):(he=1,ge(B))}function V(){var t=Date.now();for(de=ce;de;)t>=de.t&&(de.f=de.c(t-de.t)),de=de.n;return t}function U(){for(var t,n=ce,e=1/0;n;)n.f?n=t?t.n=n.n:ce=n.n:(n.t<e&&(e=n.t),n=(t=n).n);return fe=t,e}function J(t){return function(){var n,e;(n=this[t])&&(e=n[n.active])&&(--n.count?(delete n[n.active],n.active+=.5):delete this[t],e.event&&e.event.interrupt.call(this,this.__data__,e.index))}}function W(t,n,e){return Gn(t,ye),t.namespace=n,t.id=e,t}function Y(){}function G(t,n,e){return this instanceof G?(this.h=+t,this.s=+n,void(this.l=+e)):arguments.length<2?t instanceof G?new G(t.h,t.s,t.l):cn(""+t,fn,G):new G(t,n,e)}function K(t,n,e){function r(t){return t>360?t-=360:0>t&&(t+=360),60>t?a+(o-a)*t/60:180>t?o:240>t?a+(o-a)*(240-t)/60:a}function i(t){return Math.round(255*r(t))}var a,o;return t=isNaN(t)?0:(t%=360)<0?t+360:t,n=isNaN(n)?0:0>n?0:n>1?1:n,e=0>e?0:e>1?1:e,o=.5>=e?e*(1+n):e+n-e*n,a=2*e-o,new un(i(t+120),i(t),i(t-120))}function Q(t,n,e){return this instanceof Q?(this.h=+t,this.c=+n,void(this.l=+e)):arguments.length<2?t instanceof Q?new Q(t.h,t.c,t.l):t instanceof tn?en(t.l,t.a,t.b):en((t=hn((t=Hn.rgb(t)).r,t.g,t.b)).l,t.a,t.b):new Q(t,n,e)}function Z(t,n,e){return isNaN(t)&&(t=0),isNaN(n)&&(n=0),new tn(e,Math.cos(t*=ke)*n,Math.sin(t)*n)}function tn(t,n,e){return this instanceof tn?(this.l=+t,this.a=+n,void(this.b=+e)):arguments.length<2?t instanceof tn?new tn(t.l,t.a,t.b):t instanceof Q?Z(t.h,t.c,t.l):hn((t=un(t)).r,t.g,t.b):new tn(t,n,e)}function nn(t,n,e){var r=(t+16)/116,i=r+n/500,a=r-e/200;return i=rn(i)*qe,r=rn(r)*Ce,a=rn(a)*je,new un(on(3.2404542*i-1.5371385*r-.4985314*a),on(-.969266*i+1.8760108*r+.041556*a),on(.0556434*i-.2040259*r+1.0572252*a))}function en(t,n,e){return t>0?new Q(Math.atan2(e,n)*Ne,Math.sqrt(n*n+e*e),t):new Q(0/0,0/0,t)}function rn(t){return t>.206893034?t*t*t:(t-4/29)/7.787037}function an(t){return t>.008856?Math.pow(t,1/3):7.787037*t+4/29}function on(t){return Math.round(255*(.00304>=t?12.92*t:1.055*Math.pow(t,1/2.4)-.055))}function un(t,n,e){return this instanceof un?(this.r=~~t,this.g=~~n,void(this.b=~~e)):arguments.length<2?t instanceof un?new un(t.r,t.g,t.b):cn(""+t,un,K):new un(t,n,e)}function sn(t){return new un(t>>16,t>>8&255,255&t)}function ln(t){return 16>t?"0"+Math.max(0,t).toString(16):Math.min(255,t).toString(16)}function cn(t,n,e){var r,i,a,o=0,u=0,s=0;if(r=/([a-z]+)\((.*)\)/i.exec(t))switch(i=r[2].split(","),r[1]){case"hsl":return e(parseFloat(i[0]),parseFloat(i[1])/100,parseFloat(i[2])/100);case"rgb":return n(dn(i[0]),dn(i[1]),dn(i[2]))}return(a=ze.get(t))?n(a.r,a.g,a.b):(null==t||"#"!==t.charAt(0)||isNaN(a=parseInt(t.slice(1),16))||(4===t.length?(o=(3840&a)>>4,o=o>>4|o,u=240&a,u=u>>4|u,s=15&a,s=s<<4|s):7===t.length&&(o=(16711680&a)>>16,u=(65280&a)>>8,s=255&a)),n(o,u,s))}function fn(t,n,e){var r,i,a=Math.min(t/=255,n/=255,e/=255),o=Math.max(t,n,e),u=o-a,s=(o+a)/2;return u?(i=.5>s?u/(o+a):u/(2-o-a),r=t==o?(n-e)/u+(e>n?6:0):n==o?(e-t)/u+2:(t-n)/u+4,r*=60):(r=0/0,i=s>0&&1>s?0:r),new G(r,i,s)}function hn(t,n,e){t=pn(t),n=pn(n),e=pn(e);var r=an((.4124564*t+.3575761*n+.1804375*e)/qe),i=an((.2126729*t+.7151522*n+.072175*e)/Ce),a=an((.0193339*t+.119192*n+.9503041*e)/je);return tn(116*i-16,500*(r-i),200*(i-a))}function pn(t){return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function dn(t){var n=parseFloat(t);return"%"===t.charAt(t.length-1)?Math.round(2.55*n):n}function gn(t,n){t=Hn.rgb(t),n=Hn.rgb(n);var e=t.r,r=t.g,i=t.b,a=n.r-e,o=n.g-r,u=n.b-i;return function(t){return"#"+ln(Math.round(e+a*t))+ln(Math.round(r+o*t))+ln(Math.round(i+u*t))}}function vn(t,n){var e,r={},i={};for(e in t)e in n?r[e]=bn(t[e],n[e]):i[e]=t[e];for(e in n)e in t||(i[e]=n[e]);return function(t){for(e in r)i[e]=r[e](t);return i}}function mn(t,n){var e,r=[],i=[],a=t.length,o=n.length,u=Math.min(t.length,n.length);for(e=0;u>e;++e)r.push(bn(t[e],n[e]));for(;a>e;++e)i[e]=t[e];for(;o>e;++e)i[e]=n[e];return function(t){for(e=0;u>e;++e)i[e]=r[e](t);return i}}function _n(t,n){return t=+t,n=+n,function(e){return t*(1-e)+n*e}}function yn(t,n){var e,r,i,a=Re.lastIndex=Le.lastIndex=0,o=-1,u=[],s=[];for(t+="",n+="";(e=Re.exec(t))&&(r=Le.exec(n));)(i=r.index)>a&&(i=n.slice(a,i),u[o]?u[o]+=i:u[++o]=i),(e=e[0])===(r=r[0])?u[o]?u[o]+=r:u[++o]=r:(u[++o]=null,s.push({i:o,x:_n(e,r)})),a=Le.lastIndex;return a<n.length&&(i=n.slice(a),u[o]?u[o]+=i:u[++o]=i),u.length<2?s[0]?(n=s[0].x,function(t){return n(t)+""}):function(){return n}:(n=s.length,function(t){for(var e,r=0;n>r;++r)u[(e=s[r]).i]=e.x(t);return u.join("")})}function bn(t,n){for(var e,r=Hn.interpolators.length;--r>=0&&!(e=Hn.interpolators[r](t,n)););return e}function wn(t){var n=[t.a,t.b],e=[t.c,t.d],r=Mn(n),i=xn(n,e),a=Mn(An(e,n,-i))||0;n[0]*e[1]<e[0]*n[1]&&(n[0]*=-1,n[1]*=-1,r*=-1,i*=-1),this.rotate=(r?Math.atan2(n[1],n[0]):Math.atan2(-e[0],e[1]))*Ne,this.translate=[t.e,t.f],this.scale=[r,a],this.skew=a?Math.atan2(i,a)*Ne:0}function xn(t,n){return t[0]*n[0]+t[1]*n[1]}function Mn(t){var n=Math.sqrt(xn(t,t));return n&&(t[0]/=n,t[1]/=n),n}function An(t,n,e){return t[0]+=e*n[0],t[1]+=e*n[1],t}function kn(t,n){var e,r=[],i=[],a=Hn.transform(t),o=Hn.transform(n),u=a.translate,s=o.translate,l=a.rotate,c=o.rotate,f=a.skew,h=o.skew,p=a.scale,d=o.scale;return u[0]!=s[0]||u[1]!=s[1]?(r.push("translate(",null,",",null,")"),i.push({i:1,x:_n(u[0],s[0])},{i:3,x:_n(u[1],s[1])})):r.push(s[0]||s[1]?"translate("+s+")":""),l!=c?(l-c>180?c+=360:c-l>180&&(l+=360),i.push({i:r.push(r.pop()+"rotate(",null,")")-2,x:_n(l,c)})):c&&r.push(r.pop()+"rotate("+c+")"),f!=h?i.push({i:r.push(r.pop()+"skewX(",null,")")-2,x:_n(f,h)}):h&&r.push(r.pop()+"skewX("+h+")"),p[0]!=d[0]||p[1]!=d[1]?(e=r.push(r.pop()+"scale(",null,",",null,")"),i.push({i:e-4,x:_n(p[0],d[0])},{i:e-2,x:_n(p[1],d[1])})):(1!=d[0]||1!=d[1])&&r.push(r.pop()+"scale("+d+")"),e=i.length,function(t){for(var n,a=-1;++a<e;)r[(n=i[a]).i]=n.x(t);return r.join("")}}function Nn(t,n,e,r){var i=t.id,a=t.namespace;return z(t,"function"==typeof e?function(t,o,u){t[a][i].tween.set(n,r(e.call(t,t.__data__,o,u)))}:(e=r(e),function(t){t[a][i].tween.set(n,e)}))}function Tn(t){return null==t&&(t=""),function(){this.textContent=t}}function Sn(t){return function(n){return 0>=n?0:n>=1?1:t(n)}}function qn(t){return function(n){return 1-t(1-n)}}function Cn(t){return function(n){return.5*(.5>n?t(2*n):2-t(2-2*n))}}function jn(t){return t*t}function En(t){return t*t*t}function Pn(t){if(0>=t)return 0;if(t>=1)return 1;var n=t*t,e=n*t;return 4*(.5>t?e:3*(t-n)+e-.75)}function zn(t){return function(n){return Math.pow(n,t)}}function Rn(t){return 1-Math.cos(t*Ae)}function Ln(t){return Math.pow(2,10*(t-1))}function Dn(t){return 1-Math.sqrt(1-t*t)}function $n(t,n){var e;return arguments.length<2&&(n=.45),arguments.length?e=n/Me*Math.asin(1/t):(t=1,e=n/4),function(r){return 1+t*Math.pow(2,-10*r)*Math.sin((r-e)*Me/n)}}function Fn(t){return t||(t=1.70158),function(n){return n*n*((t+1)*n-t)}}function On(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375}function In(t){return null==t?"__transition__":"__transition_"+t+"__"}function Xn(t,n,e,r,i){var a=t[e]||(t[e]={active:0,count:0}),o=a[r];if(!o){var u=i.time;o=a[r]={tween:new g,time:u,delay:i.delay,duration:i.duration,ease:i.ease,index:n},i=null,++a.count,Hn.timer(function(i){function s(e){if(a.active>r)return c();var i=a[a.active];i&&(--a.count,delete a[a.active],i.event&&i.event.interrupt.call(t,t.__data__,i.index)),a.active=r,o.event&&o.event.start.call(t,t.__data__,n),o.tween.forEach(function(e,r){(r=r.call(t,t.__data__,n))&&g.push(r)}),h=o.ease,f=o.duration,Hn.timer(function(){return d.c=l(e||1)?H:l,1},0,u)}function l(e){if(a.active!==r)return 1;for(var i=e/f,u=h(i),s=g.length;s>0;)g[--s].call(t,u);return i>=1?(o.event&&o.event.end.call(t,t.__data__,n),c()):void 0}function c(){return--a.count?delete a[r]:delete t[e],1}var f,h,p=o.delay,d=de,g=[];return d.t=p+u,i>=p?s(i-p):void(d.c=s)},0,u)}}var Hn={version:"3.5.2"},Bn=[].slice,Vn=function(t){return Bn.call(t)},Un=document,Jn=Un.documentElement,Wn=window;try{Vn(Jn.childNodes)[0].nodeType}catch(Yn){Vn=function(t){for(var n=t.length,e=new Array(n);n--;)e[n]=t[n];return e}}var Gn={}.__proto__?function(t,n){t.__proto__=n}:function(t,n){for(var e in n)t[e]=n[e]},Kn=["webkit","ms","moz","Moz","o","O"],Qn=function(t,n){return n.querySelector(t)},Zn=function(t,n){return n.querySelectorAll(t)},te=Jn.matches||Jn[t(Jn,"matchesSelector")],ne=function(t,n){return te.call(t,n)};"function"==typeof Sizzle&&(Qn=function(t,n){return Sizzle(t,n)[0]||null},Zn=Sizzle,ne=Sizzle.matchesSelector),Hn.selection=function(){return le};var ee=Hn.selection.prototype=[];ee.select=function(t){var r,i,a,o,u=[];t=e(t);for(var s=-1,l=this.length;++s<l;){u.push(r=[]),r.parentNode=(a=this[s]).parentNode;for(var c=-1,f=a.length;++c<f;)(o=a[c])?(r.push(i=t.call(o,o.__data__,c,s)),i&&"__data__"in o&&(i.__data__=o.__data__)):r.push(null)}return n(u)},ee.selectAll=function(t){var e,i,a=[];t=r(t);for(var o=-1,u=this.length;++o<u;)for(var s=this[o],l=-1,c=s.length;++l<c;)(i=s[l])&&(a.push(e=Vn(t.call(i,i.__data__,l,o))),e.parentNode=i);return n(a)};var re={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};Hn.ns={prefix:re,qualify:function(t){var n=t.indexOf(":"),e=t;return n>=0&&(e=t.slice(0,n),t=t.slice(n+1)),re.hasOwnProperty(e)?{space:re[e],local:t}:t}},ee.attr=function(t,n){if(arguments.length<2){if("string"==typeof t){var e=this.node();return t=Hn.ns.qualify(t),t.local?e.getAttributeNS(t.space,t.local):e.getAttribute(t)}for(n in t)this.each(i(n,t[n]));return this}return this.each(i(t,n))},Hn.requote=function(t){return t.replace(ie,"\\$&")};var ie=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;ee.classed=function(t,n){if(arguments.length<2){if("string"==typeof t){var e=this.node(),r=(t=u(t)).length,i=-1;if(n=e.classList){for(;++i<r;)if(!n.contains(t[i]))return!1}else for(n=e.getAttribute("class");++i<r;)if(!o(t[i]).test(n))return!1;return!0}for(n in t)this.each(s(n,t[n]));return this}return this.each(s(t,n))},ee.style=function(t,n,e){var r=arguments.length;if(3>r){if("string"!=typeof t){2>r&&(n="");for(e in t)this.each(c(e,t[e],n));return this}if(2>r)return Wn.getComputedStyle(this.node(),null).getPropertyValue(t);e=""}return this.each(c(t,n,e))},ee.property=function(t,n){if(arguments.length<2){if("string"==typeof t)return this.node()[t];for(n in t)this.each(f(n,t[n]));return this}return this.each(f(t,n))},ee.text=function(t){return arguments.length?this.each("function"==typeof t?function(){var n=t.apply(this,arguments);this.textContent=null==n?"":n}:null==t?function(){this.textContent=""}:function(){this.textContent=t}):this.node().textContent},ee.html=function(t){return arguments.length?this.each("function"==typeof t?function(){var n=t.apply(this,arguments);this.innerHTML=null==n?"":n}:null==t?function(){this.innerHTML=""}:function(){this.innerHTML=t}):this.node().innerHTML},ee.append=function(t){return t=h(t),this.select(function(){return this.appendChild(t.apply(this,arguments))})},ee.insert=function(t,n){return t=h(t),n=e(n),this.select(function(){return this.insertBefore(t.apply(this,arguments),n.apply(this,arguments)||null)})},ee.remove=function(){return this.each(p)},Hn.map=function(t,n){var e=new g;if(t instanceof g)t.forEach(function(t,n){e.set(t,n)});else if(Array.isArray(t)){var r,i=-1,a=t.length;if(1===arguments.length)for(;++i<a;)e.set(i,t[i]);else for(;++i<a;)e.set(n.call(t,r=t[i],i),r)}else for(var o in t)e.set(o,t[o]);return e};var ae="__proto__",oe="\x00";d(g,{has:_,get:function(t){return this._[v(t)]},set:function(t,n){return this._[v(t)]=n},remove:y,keys:b,values:function(){var t=[];for(var n in this._)t.push(this._[n]);return t},entries:function(){var t=[];for(var n in this._)t.push({key:m(n),value:this._[n]});return t},size:w,empty:x,forEach:function(t){for(var n in this._)t.call(this,m(n),this._[n])}}),Hn.set=function(t){var n=new M;if(t)for(var e=0,r=t.length;r>e;++e)n.add(t[e]);return n},d(M,{has:_,add:function(t){return this._[v(t+="")]=!0,t},remove:y,values:b,size:w,empty:x,forEach:function(t){for(var n in this._)t.call(this,m(n))}}),ee.data=function(t,e){function r(t,n){var r,i,a,o=t.length,u=n.length,f=Math.min(o,u),h=new Array(u),p=new Array(u),d=new Array(o);if(e){var v,m=new g,_=new Array(o);for(r=-1;++r<o;)m.has(v=e.call(i=t[r],i.__data__,r))?d[r]=i:m.set(v,i),_[r]=v;for(r=-1;++r<u;)(i=m.get(v=e.call(n,a=n[r],r)))?i!==!0&&(h[r]=i,i.__data__=a):p[r]=A(a),m.set(v,!0);for(r=-1;++r<o;)m.get(_[r])!==!0&&(d[r]=t[r])}else{for(r=-1;++r<f;)i=t[r],a=n[r],i?(i.__data__=a,h[r]=i):p[r]=A(a);for(;u>r;++r)p[r]=A(n[r]);for(;o>r;++r)d[r]=t[r]}p.update=h,p.parentNode=h.parentNode=d.parentNode=t.parentNode,s.push(p),l.push(h),c.push(d)}var i,a,o=-1,u=this.length;if(!arguments.length){for(t=new Array(u=(i=this[0]).length);++o<u;)(a=i[o])&&(t[o]=a.__data__);return t}var s=R([]),l=n([]),c=n([]);if("function"==typeof t)for(;++o<u;)r(i=this[o],t.call(i,i.parentNode.__data__,o));else for(;++o<u;)r(i=this[o],t);return l.enter=function(){return s},l.exit=function(){return c},l},ee.datum=function(t){return arguments.length?this.property("__data__",t):this.property("__data__")},ee.filter=function(t){var e,r,i,a=[];"function"!=typeof t&&(t=k(t));for(var o=0,u=this.length;u>o;o++){a.push(e=[]),e.parentNode=(r=this[o]).parentNode;for(var s=0,l=r.length;l>s;s++)(i=r[s])&&t.call(i,i.__data__,s,o)&&e.push(i)}return n(a)},ee.order=function(){for(var t=-1,n=this.length;++t<n;)for(var e,r=this[t],i=r.length-1,a=r[i];--i>=0;)(e=r[i])&&(a&&a!==e.nextSibling&&a.parentNode.insertBefore(e,a),a=e);return this},Hn.ascending=N,ee.sort=function(t){t=T.apply(this,arguments);for(var n=-1,e=this.length;++n<e;)this[n].sort(t);return this.order()},Hn.dispatch=function(){for(var t=new q,n=-1,e=arguments.length;++n<e;)t[arguments[n]]=C(t);return t},q.prototype.on=function(t,n){var e=t.indexOf("."),r="";if(e>=0&&(r=t.slice(e+1),t=t.slice(0,e)),t)return arguments.length<2?this[t].on(r):this[t].on(r,n);if(2===arguments.length){if(null==n)for(t in this)this.hasOwnProperty(t)&&this[t].on(r,null);return this}},Hn.event=null,ee.on=function(t,n,e){var r=arguments.length;if(3>r){if("string"!=typeof t){2>r&&(n=!1);for(e in t)this.each(j(e,t[e],n));return this}if(2>r)return(r=this.node()["__on"+t])&&r._;e=!1}return this.each(j(t,n,e))};var ue=Hn.map({mouseenter:"mouseover",mouseleave:"mouseout"});ue.forEach(function(t){"on"+t in Un&&ue.remove(t)}),ee.each=function(t){return z(this,function(n,e,r){t.call(n,n.__data__,e,r)})},ee.call=function(t){var n=Vn(arguments);return t.apply(n[0]=this,n),this},ee.empty=function(){return!this.node()},ee.node=function(){for(var t=0,n=this.length;n>t;t++)for(var e=this[t],r=0,i=e.length;i>r;r++){var a=e[r];if(a)return a}return null},ee.size=function(){var t=0;return z(this,function(){++t}),t};var se=[];Hn.selection.enter=R,Hn.selection.enter.prototype=se,se.append=ee.append,se.empty=ee.empty,se.node=ee.node,se.call=ee.call,se.size=ee.size,se.select=function(t){for(var e,r,i,a,o,u=[],s=-1,l=this.length;++s<l;){i=(a=this[s]).update,u.push(e=[]),e.parentNode=a.parentNode;for(var c=-1,f=a.length;++c<f;)(o=a[c])?(e.push(i[c]=r=t.call(a.parentNode,o.__data__,c,s)),r.__data__=o.__data__):e.push(null)}return n(u)},se.insert=function(t,n){return arguments.length<2&&(n=L(this)),ee.insert.call(this,t,n)},Hn.select=function(t){var e=["string"==typeof t?Qn(t,Un):t];return e.parentNode=Jn,n([e])},Hn.selectAll=function(t){var e=Vn("string"==typeof t?Zn(t,Un):t);return e.parentNode=Jn,n([e])};var le=Hn.select(Jn);Hn.rebind=function(t,n){for(var e,r=1,i=arguments.length;++r<i;)t[e=arguments[r]]=$(t,n,n[e]);return t},Hn.xhr=F(D),Hn.dsv=function(t,n){function e(t,e,a){arguments.length<3&&(a=e,e=null);var o=O(t,n,null==e?r:i(e),a);return o.row=function(t){return arguments.length?o.response(null==(e=t)?r:i(t)):e},o}function r(t){return e.parse(t.responseText)}function i(t){return function(n){return e.parse(n.responseText,t)}}function a(n){return n.map(o).join(t)}function o(t){return u.test(t)?'"'+t.replace(/\"/g,'""')+'"':t}var u=new RegExp('["'+t+"\n]"),s=t.charCodeAt(0);return e.parse=function(t,n){var r;return e.parseRows(t,function(t,e){if(r)return r(t,e-1);var i=new Function("d","return {"+t.map(function(t,n){return JSON.stringify(t)+": d["+n+"]"}).join(",")+"}");r=n?function(t,e){return n(i(t),e)}:i})},e.parseRows=function(t,n){function e(){if(c>=l)return o;if(i)return i=!1,a;var n=c;if(34===t.charCodeAt(n)){for(var e=n;e++<l;)if(34===t.charCodeAt(e)){if(34!==t.charCodeAt(e+1))break;++e}c=e+2;var r=t.charCodeAt(e+1);return 13===r?(i=!0,10===t.charCodeAt(e+2)&&++c):10===r&&(i=!0),t.slice(n+1,e).replace(/""/g,'"')}for(;l>c;){var r=t.charCodeAt(c++),u=1;if(10===r)i=!0;else if(13===r)i=!0,10===t.charCodeAt(c)&&(++c,++u);else if(r!==s)continue;return t.slice(n,c-u)}return t.slice(n)}for(var r,i,a={},o={},u=[],l=t.length,c=0,f=0;(r=e())!==o;){for(var h=[];r!==a&&r!==o;)h.push(r),r=e();n&&null==(h=n(h,f++))||u.push(h)}return u},e.format=function(n){if(Array.isArray(n[0]))return e.formatRows(n);var r=new M,i=[];return n.forEach(function(t){for(var n in t)r.has(n)||i.push(r.add(n))}),[i.map(o).join(t)].concat(n.map(function(n){return i.map(function(t){return o(n[t])}).join(t)})).join("\n")},e.formatRows=function(t){return t.map(a).join("\n")},e},Hn.csv=Hn.dsv(",","text/csv"),Hn.xml=F(function(t){return t.responseXML});var ce,fe,he,pe,de,ge=Wn[t(Wn,"requestAnimationFrame")]||function(t){setTimeout(t,17)};Hn.timer=function(t,n,e){var r=arguments.length;2>r&&(n=0),3>r&&(e=Date.now());var i=e+n,a={c:t,t:i,f:!1,n:null};fe?fe.n=a:ce=a,fe=a,he||(pe=clearTimeout(pe),he=1,ge(B))},Hn.timer.flush=function(){V(),U()},ee.transition=function(t){for(var n,e,r=ve||++be,i=In(t),a=[],o=me||{time:Date.now(),ease:Pn,delay:0,duration:250},u=-1,s=this.length;++u<s;){a.push(n=[]);for(var l=this[u],c=-1,f=l.length;++c<f;)(e=l[c])&&Xn(e,c,i,r,o),n.push(e)}return W(a,i,r)},ee.interrupt=function(t){return this.each(null==t?_e:J(In(t)))};var ve,me,_e=J(In()),ye=[],be=0;ye.call=ee.call,ye.empty=ee.empty,ye.node=ee.node,ye.size=ee.size,Hn.transition=function(t,n){return t&&t.transition?ve?t.transition(n):t:le.transition(t)},Hn.transition.prototype=ye,ye.select=function(t){var n,r,i,a=this.id,o=this.namespace,u=[];t=e(t);for(var s=-1,l=this.length;++s<l;){u.push(n=[]);for(var c=this[s],f=-1,h=c.length;++f<h;)(i=c[f])&&(r=t.call(i,i.__data__,f,s))?("__data__"in i&&(r.__data__=i.__data__),Xn(r,f,o,a,i[o][a]),n.push(r)):n.push(null)}return W(u,o,a)},ye.selectAll=function(t){var n,e,i,a,o,u=this.id,s=this.namespace,l=[];t=r(t);for(var c=-1,f=this.length;++c<f;)for(var h=this[c],p=-1,d=h.length;++p<d;)if(i=h[p]){o=i[s][u],e=t.call(i,i.__data__,p,c),l.push(n=[]);for(var g=-1,v=e.length;++g<v;)(a=e[g])&&Xn(a,g,s,u,o),n.push(a)}return W(l,s,u)},ye.filter=function(t){var n,e,r,i=[];"function"!=typeof t&&(t=k(t));for(var a=0,o=this.length;o>a;a++){i.push(n=[]);for(var e=this[a],u=0,s=e.length;s>u;u++)(r=e[u])&&t.call(r,r.__data__,u,a)&&n.push(r)}return W(i,this.namespace,this.id)},Hn.color=Y,Y.prototype.toString=function(){return this.rgb()+""},Hn.hsl=G;var we=G.prototype=new Y;we.brighter=function(t){return t=Math.pow(.7,arguments.length?t:1),new G(this.h,this.s,this.l/t)},we.darker=function(t){return t=Math.pow(.7,arguments.length?t:1),new G(this.h,this.s,t*this.l)},we.rgb=function(){return K(this.h,this.s,this.l)};var xe=Math.PI,Me=2*xe,Ae=xe/2,ke=xe/180,Ne=180/xe;Hn.hcl=Q;var Te=Q.prototype=new Y;Te.brighter=function(t){return new Q(this.h,this.c,Math.min(100,this.l+Se*(arguments.length?t:1)))},Te.darker=function(t){return new Q(this.h,this.c,Math.max(0,this.l-Se*(arguments.length?t:1)))},Te.rgb=function(){return Z(this.h,this.c,this.l).rgb()},Hn.lab=tn;var Se=18,qe=.95047,Ce=1,je=1.08883,Ee=tn.prototype=new Y;Ee.brighter=function(t){return new tn(Math.min(100,this.l+Se*(arguments.length?t:1)),this.a,this.b)},Ee.darker=function(t){return new tn(Math.max(0,this.l-Se*(arguments.length?t:1)),this.a,this.b)},Ee.rgb=function(){return nn(this.l,this.a,this.b)},Hn.rgb=un;var Pe=un.prototype=new Y;Pe.brighter=function(t){t=Math.pow(.7,arguments.length?t:1);var n=this.r,e=this.g,r=this.b,i=30;return n||e||r?(n&&i>n&&(n=i),e&&i>e&&(e=i),r&&i>r&&(r=i),new un(Math.min(255,n/t),Math.min(255,e/t),Math.min(255,r/t))):new un(i,i,i)},Pe.darker=function(t){return t=Math.pow(.7,arguments.length?t:1),new un(t*this.r,t*this.g,t*this.b)},Pe.hsl=function(){return fn(this.r,this.g,this.b)},Pe.toString=function(){return"#"+ln(this.r)+ln(this.g)+ln(this.b)};var ze=Hn.map({aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074});ze.forEach(function(t,n){ze.set(t,sn(n))}),Hn.interpolateRgb=gn,Hn.interpolateObject=vn,Hn.interpolateArray=mn,Hn.interpolateNumber=_n,Hn.interpolateString=yn;var Re=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Le=new RegExp(Re.source,"g");Hn.interpolate=bn,Hn.interpolators=[function(t,n){var e=typeof n;return("string"===e?ze.has(n)||/^(#|rgb\(|hsl\()/.test(n)?gn:yn:n instanceof Y?gn:Array.isArray(n)?mn:"object"===e&&isNaN(n)?vn:_n)(t,n)}],Hn.transform=function(t){var n=Un.createElementNS(Hn.ns.prefix.svg,"g");return(Hn.transform=function(t){if(null!=t){n.setAttribute("transform",t);var e=n.transform.baseVal.consolidate()}return new wn(e?e.matrix:De)})(t)},wn.prototype.toString=function(){return"translate("+this.translate+")rotate("+this.rotate+")skewX("+this.skew+")scale("+this.scale+")"};var De={a:1,b:0,c:0,d:1,e:0,f:0};Hn.interpolateTransform=kn,ye.tween=function(t,n){var e=this.id,r=this.namespace;return arguments.length<2?this.node()[r][e].tween.get(t):z(this,null==n?function(n){n[r][e].tween.remove(t)}:function(i){i[r][e].tween.set(t,n)})},ye.attr=function(t,n){function e(){this.removeAttribute(u)
}function r(){this.removeAttributeNS(u.space,u.local)}function i(t){return null==t?e:(t+="",function(){var n,e=this.getAttribute(u);return e!==t&&(n=o(e,t),function(t){this.setAttribute(u,n(t))})})}function a(t){return null==t?r:(t+="",function(){var n,e=this.getAttributeNS(u.space,u.local);return e!==t&&(n=o(e,t),function(t){this.setAttributeNS(u.space,u.local,n(t))})})}if(arguments.length<2){for(n in t)this.attr(n,t[n]);return this}var o="transform"==t?kn:bn,u=Hn.ns.qualify(t);return Nn(this,"attr."+t,n,u.local?a:i)},ye.attrTween=function(t,n){function e(t,e){var r=n.call(this,t,e,this.getAttribute(i));return r&&function(t){this.setAttribute(i,r(t))}}function r(t,e){var r=n.call(this,t,e,this.getAttributeNS(i.space,i.local));return r&&function(t){this.setAttributeNS(i.space,i.local,r(t))}}var i=Hn.ns.qualify(t);return this.tween("attr."+t,i.local?r:e)},ye.style=function(t,n,e){function r(){this.style.removeProperty(t)}function i(n){return null==n?r:(n+="",function(){var r,i=Wn.getComputedStyle(this,null).getPropertyValue(t);return i!==n&&(r=bn(i,n),function(n){this.style.setProperty(t,r(n),e)})})}var a=arguments.length;if(3>a){if("string"!=typeof t){2>a&&(n="");for(e in t)this.style(e,t[e],n);return this}e=""}return Nn(this,"style."+t,n,i)},ye.styleTween=function(t,n,e){function r(r,i){var a=n.call(this,r,i,Wn.getComputedStyle(this,null).getPropertyValue(t));return a&&function(n){this.style.setProperty(t,a(n),e)}}return arguments.length<3&&(e=""),this.tween("style."+t,r)},ye.text=function(t){return Nn(this,"text",t,Tn)},ye.remove=function(){var t=this.namespace;return this.each("end.transition",function(){var n;this[t].count<2&&(n=this.parentNode)&&n.removeChild(this)})};var $e=function(){return D},Fe=Hn.map({linear:$e,poly:zn,quad:function(){return jn},cubic:function(){return En},sin:function(){return Rn},exp:function(){return Ln},circle:function(){return Dn},elastic:$n,back:Fn,bounce:function(){return On}}),Oe=Hn.map({"in":D,out:qn,"in-out":Cn,"out-in":function(t){return Cn(qn(t))}});Hn.ease=function(t){var n=t.indexOf("-"),e=n>=0?t.slice(0,n):t,r=n>=0?t.slice(n+1):"in";return e=Fe.get(e)||$e,r=Oe.get(r)||D,Sn(r(e.apply(null,Bn.call(arguments,1))))},ye.ease=function(t){var n=this.id,e=this.namespace;return arguments.length<1?this.node()[e][n].ease:("function"!=typeof t&&(t=Hn.ease.apply(Hn,arguments)),z(this,function(r){r[e][n].ease=t}))},ye.delay=function(t){var n=this.id,e=this.namespace;return arguments.length<1?this.node()[e][n].delay:z(this,"function"==typeof t?function(r,i,a){r[e][n].delay=+t.call(r,r.__data__,i,a)}:(t=+t,function(r){r[e][n].delay=t}))},ye.duration=function(t){var n=this.id,e=this.namespace;return arguments.length<1?this.node()[e][n].duration:z(this,"function"==typeof t?function(r,i,a){r[e][n].duration=Math.max(1,t.call(r,r.__data__,i,a))}:(t=Math.max(1,t),function(r){r[e][n].duration=t}))},ye.each=function(t,n){var e=this.id,r=this.namespace;if(arguments.length<2){var i=me,a=ve;try{ve=e,z(this,function(n,i,a){me=n[r][e],t.call(n,n.__data__,i,a)})}finally{me=i,ve=a}}else z(this,function(i){var a=i[r][e];(a.event||(a.event=Hn.dispatch("start","end","interrupt"))).on(t,n)});return this},ye.transition=function(){for(var t,n,e,r,i=this.id,a=++be,o=this.namespace,u=[],s=0,l=this.length;l>s;s++){u.push(t=[]);for(var n=this[s],c=0,f=n.length;f>c;c++)(e=n[c])&&(r=e[o][i],Xn(e,c,o,a,{time:r.time,ease:r.ease,delay:r.delay+r.duration,duration:r.duration})),t.push(e)}return W(u,o,a)},"function"==typeof define&&define.amd?define(Hn):"object"==typeof module&&module.exports&&(module.exports=Hn),this.d3=Hn}();var ttCounter=0;D3Tooltip.prototype.html=function(t){this.$el.html(t)},D3Tooltip.prototype.show=function(){this.$el.transition().duration(200).style("opacity",.9),this.$el.style("left",this.d3.event.pageX+"px").style("top",this.d3.event.pageY-28+"px"),this.visible=!0},D3Tooltip.prototype.hide=function(){this.$el.transition().duration(500).style("opacity",0),this.visible=!1},D3Tooltip.prototype.toggle=function(){this.visible?this.hide():this.show()};var w="100%",h="100%",nat_fines_per_capita=1.6489955933065668,nat_perc_budget=.445523538700578,r_max=55,r_min=2,csv2dict=function(t){data={};for(var n in t){var e=t[n],r=e.Municipality;data[r]=e}return data},create_tooltip=function(t){return perc_fines=t["Total Fines"]/t["Total Budget"]*100,fines_per_capita=t["Total Fines"]/t.Population/12,t.fpopulation=parseInt(t.population).toLocaleString(),t.ftotal_fines="R"+parseInt(t.total_fines).toLocaleString(),t.ftotal_budget="R"+parseInt(t.total_budget).toLocaleString(),t.fperc_fines=Math.round(t.perc_fines),t.ffines_per_capita="R"+Math.round(100*t.fines_per_capita)/100,t.fnat_per_capita=Math.round(100*t.nat_per_capita)/100,t.fnat_perc_budget=Math.round(100*t.nat_perc_budget)/100,tmpl("tt_template",t)},calc_radius=function(t){var n=8*Math.sqrt(t);return n>r_max?r_max:r_min>n?r_min:n},load_data=function(t,n){var e=function(n,e){{var r=calc_radius(e);d3.select(n).attr("data-munic")}d3.select(n).select("circle").transition().attr("r",r),d3.select(n).selectAll("text").text(function(t,n){return 0==n?d3.select(this).text():Math.round(e)+"x"}),t.selectAll(".buttons button").classed("btn-primary",!1).classed("btn-default",!0)},r=function(t){var n=i.append("button").classed("btn",!0).text(t).attr("type","button");return n},i=t.append("div").classed("buttons",!0);r("Per Capita").on("click",function(){t.selectAll("g.bubble").each(function(t){e(this,t.nat_per_capita)}),d3.select(this).classed("btn-primary",!0)}).classed("btn-primary",!0),r("Percentage Budget").on("click",function(){t.selectAll("g.bubble").each(function(t){e(this,t.nat_perc_budget)}),d3.select(this).classed("btn-primary",!0)}).classed("btn-default",!0);var a=t[0][0];queue().defer(d3.xml,n).defer(d3.csv,"data.csv").await(function(t,e,r){console.log(n),console.log(e);var i=document.importNode(e.documentElement,!0),o=(a.appendChild(i.cloneNode(!0)),csv2dict(r)),u=new D3Tooltip(d3);d3.selectAll("g.windows").on("click",function(){u.toggle()}),d3.select(".d3-tooltip").on("click",function(){u.toggle()}),d3.selectAll("g.bubble").style("cursor","pointer").each(function(){var t=d3.select(this),n=t.attr("data-munic"),e=o[n];t[0][0].__data__=e,perc_fines=e["Total Fines"]/e["Total Budget"]*100,fines_per_capita=e["Total Fines"]/e.Population/12,e.population=e.Population,e.total_fines=e["Total Fines"],e.total_budget=e["Total Budget"],e.perc_fines=perc_fines,e.fines_per_capita=fines_per_capita,e.nat_per_capita=fines_per_capita/nat_fines_per_capita,e.nat_perc_budget=perc_fines/nat_perc_budget}).on("click",function(t){u.html(create_tooltip(t)),u.show()})})};