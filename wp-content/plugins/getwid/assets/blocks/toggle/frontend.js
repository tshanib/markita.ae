!function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=26)}({26:function(t,e){/*!
* getwid-toggle
*/!function(t){t(document).ready(function(e){t(document.body).on("post-load",function(t){n()});var n=function(){t(".wp-block-getwid-toggle:not(.getwid-init)").each(function(e,n){t(this).addClass("getwid-init"),t(n).find(".wp-block-getwid-toggle__row .wp-block-getwid-toggle__header-wrapper").on("click",function(e){e.preventDefault(),e.stopImmediatePropagation();var n=t(this).parent(),i=n.find(".wp-block-getwid-toggle__content-wrapper").first(),o=n.find(".wp-block-getwid-toggle__content").first().outerHeight(!0);n.hasClass("is-active")?(n.removeClass("is-active"),i.css("height",o),t(i).animate({height:0},{queue:!1,duration:500,complete:function(){t(this).css("height","")}})):(t(i).animate({height:o},{queue:!1,duration:500,complete:function(){t(this).css("height","")}}),n.addClass("is-active"))})})};n()})}(jQuery)}});