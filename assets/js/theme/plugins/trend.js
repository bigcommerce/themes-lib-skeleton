/*!
 * Trend 0.1.0
 *
 * Fail-safe TransitionEnd event for jQuery.
 *
 * Adds a new "trend" event that can be used in browsers that don't
 * support "transitionend".
 *
 * NOTE: Only supports being bound with "jQuery.one".
 *
 * Copyright 2014, Pixel Union - http://pixelunion.net
 * Released under the MIT license
 */
(function(e){var a="webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";var d=["transition-duration","-moz-transition-duration","-webkit-transition-duration","-ms-transition-duration","-o-transition-duration","-khtml-transition-duration"];var c=function(g){g=g.replace(/\s/,"");var f=window.parseFloat(g);return g.match(/[^m]s$/i)?f*1000:f};var b=function(j){var l=0;for(var h=0;h<d.length;h++){var k=j.css(d[h]);if(!k){continue}if(k.indexOf(",")!==-1){var g=k.split(",");var f=(function(){var n=[];for(var m=0;m<g.length;m++){var o=c(g[m]);n.push(o)}return n})();l=Math.max.apply(Math,f)}else{l=c(k)}break}return l};e.event.special.trend={add:function(g){var h=e(this);var j=false;h.data("trend",true);var i=b(h)+20;var f=function(k){if(j){return}if(k&&k.srcElement!==h[0]){return}h.data("trend",false);j=true;if(g.handler){g.handler()}};h.one(a,f);h.data("trend-timeout",window.setTimeout(f,i))},remove:function(f){var g=e(this);g.off(a);window.clearTimeout(g.data("trend-timeout"))}}})(jQuery);
