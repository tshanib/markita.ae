!function(e){function t(a){if(o[a])return o[a].exports;var l=o[a]={i:a,l:!1,exports:{}};return e[a].call(l.exports,l,l.exports,t),l.l=!0,l.exports}var o={};t.m=e,t.c=o,t.d=function(e,o,a){t.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=4)}({4:function(e,t){/*!
* getwid-content-slider
*/!function(e){e(document).ready(function(t){e(document.body).on("post-load",function(e){o()});var o=function(){var t=e(".wp-block-getwid-content-slider:not(.getwid-init)");t.length&&t.each(function(t){var o,a,l,i,d,n,s,r,u,c,p,f=e(this),v=f.find(".wp-block-getwid-content-slider__wrapper").first();f.addClass("getwid-init"),v.slick({autoplay:!!f.data("autoplay"),autoplaySpeed:null!==(o=f.data("autoplay-speed"))&&void 0!==o?o:3e3,arrows:"none"!==f.data("arrows"),dots:"none"!==f.data("dots"),speed:null!==(a=f.data("animation-speed"))&&void 0!==a?a:800,infinite:!!f.data("infinite"),fade:"fade"===f.data("effect"),centerMode:!!f.data("center-mode"),adaptiveHeight:!!f.data("adaptive-height"),draggable:null===(l=f.data("draggable"))||void 0===l||l,pauseOnHover:!!f.data("pause-hover"),rows:0,slidesToShow:null!==(i=f.data("slides-show"))&&void 0!==i?i:1,slidesToScroll:null!==(d=f.data("slides-scroll"))&&void 0!==d?d:1,rtl:!!Getwid.isRTL,responsive:[{breakpoint:991,settings:{slidesToShow:null!==(n=f.data("slides-show-laptop"))&&void 0!==n?n:1,slidesToScroll:null!==(s=f.data("slides-scroll-laptop"))&&void 0!==s?s:1}},{breakpoint:768,settings:{slidesToShow:null!==(r=f.data("slides-show-tablet"))&&void 0!==r?r:1,slidesToScroll:null!==(u=f.data("slides-scroll-tablet"))&&void 0!==u?u:1}},{breakpoint:468,settings:{slidesToShow:null!==(c=f.data("slides-show-mobile"))&&void 0!==c?c:1,slidesToScroll:null!==(p=f.data("slides-scroll-mobile"))&&void 0!==p?p:1}}]})})};o()})}(jQuery)}});