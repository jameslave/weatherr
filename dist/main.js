!function t(e,n,r){function o(c,a){if(!n[c]){if(!e[c]){var u="function"==typeof require&&require;if(!a&&u)return u(c,!0);if(i)return i(c,!0);throw new Error("Cannot find module '"+c+"'")}var s=n[c]={exports:{}};e[c][0].call(s.exports,function(t){var n=e[c][1][t];return o(n?n:t)},s,s.exports,t,e,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(t,e,n){"use strict";var r=t("./refresh");t("./settings-menu"),document.getElementById("refresh-icon").addEventListener("click",function(){r()}),r()},{"./refresh":5,"./settings-menu":6}],2:[function(t,e,n){"use strict";function r(t){document.getElementById("location").innerText=t.loc}function o(t){var e=document.getElementById("temp"),n=document.cookie?document.cookie.match(/temp=(f|c)/)[1]||"f":"f";e.innerText=t[n]+" °"+n.toUpperCase()}function i(t,e){var n=document.getElementById("forecast-hours"),r=document.getElementById("forecast-temp-text"),o=document.getElementById("forecast-wind-text"),i=document.getElementById("forecast-precip-text");n.innerText=e,r.innerText=t.tempStr,o.innerText=t.windStr,i.innerText=t.precipStr}function c(t){var e=document.getElementsByTagName("main")[0],n="img/backgrounds/"+t.maxForecast+".jpg",r="url('"+n+"') no-repeat center center";e.style.background="linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), "+r}function a(t){document.getElementById("current-icon").setAttribute("src","img/icons/"+t.icon+".svg")}n.inject=function(t,e){return new Promise(function(n){window.weather=t,r(t),a(t),o(t),i(t,e),c(t),n()})}},{}],3:[function(t,e,n){"use strict";n.get=function(){return new Promise(function(t,e){navigator.geolocation?navigator.geolocation.getCurrentPosition(function(e){t({lat:e.coords.latitude,lon:e.coords.longitude})}):e(Error("Browser does not support geolocation"))})},n.send=function(t){return new Promise(function(e,n){var r=new XMLHttpRequest;r.open("POST","location",!0),r.setRequestHeader("Content-Type","application/json"),r.send(JSON.stringify(t)),r.onerror=function(){n(Error("Connection to server failed"))},r.onreadystatechange=function(){4===r.readyState&&200===r.status&&e(JSON.parse(r.responseText))}})}},{}],4:[function(t,e,n){"use strict";function r(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function o(t,e,n){return t>=e&&t<n}function i(t,e){var n=parseInt(t.current_observation.feelslike_f),r=t.hourly_forecast.slice(0,e).map(function(t){return parseInt(t.temp.english)}),o=r.reduce(function(t,e){return t+e})/e,i=o-n,c={2:"very cold",3:"cold",4:"chilly",5:"cool",6:"nice",7:"really nice",8:"hot",9:"very hot"},a=function(t){var e=Math.floor(t/10);return e<2?c[2]:e>9?c[9]:c[e]}(n),u=function(t){return t>8?"get much warmer":t>3?"get warmer":Math.abs(t)<=3?"stay "+a:t<-3?"get cooler":"get much cooler"}(i),s="It's going to ";return s+=u,s+="."}function c(t,e){var n=parseInt(t.current_observation.wind_mph),r=t.hourly_forecast.slice(0,e).map(function(t){return parseInt(t.wspd.english)}),i=r.reduce(function(t,e){return t+e})/e,c=i-n,a=function(t){return t>=20?"really windy":o(t,10,20)?"windy":o(t,5,10)?"breezy":"calm"}(n),u=function(t){return t>10?"get much windier":t>5?"get windier":Math.abs(t)<=5?"stay "+a:t<-5?"get calmer":"get much calmer"}(c),s="It's going to ";return s+=u,s+="."}function a(t,e){var n=t.hourly_forecast.slice(0,e),i=n.map(function(t){return parseInt(t.pop)}),c=n.map(function(t){return parseInt(t.fctcode)}),a=Math.max.apply(Math,r(i)),u=Math.max.apply(Math,r(c));[10,12,14,18,20,22].includes(u)&&u++;var s=function(t){return t>=80?"It will be wet":o(t,40,80)?"There's a good chance of precipitation":o(t,10,40)?"There's a slight chance of precipitation":"It will be dry"}(a),f=s;return f+=".",{maxForecast:u,str:f}}n.parse=function(t,e){return new Promise(function(n){var r={},o=t.current_observation.icon_url.match(/\w\/(\w+).gif$/)[1];r.loc=t.current_observation.display_location.city,r.icon=o,r.f=t.current_observation.feelslike_f,r.c=t.current_observation.feelslike_c,r.tempStr=i(t,e),r.windStr=c(t,e);var u=a(t,e);r.precipStr=u.str,r.maxForecast=u.maxForecast,n(r)})}},{}],5:[function(t,e,n){"use strict";function r(){return new Promise(function(t){f.classList.add("animate-spin"),t()})}function o(){return new Promise(function(t){s.classList.add("animate-fade"),f.classList.remove("animate-spin"),f.classList.contains("hidden")&&f.classList.remove("hidden"),t()})}var i=t("./location"),c=t("./parser"),a=t("./injector"),u=document.cookie?document.cookie.match(/hours=(\d{1,2})/)[1]||8:8,s=document.getElementById("loading-screen"),f=document.getElementById("refresh-icon");e.exports=function(){r().then(function(){return i.get()}).then(function(t){return i.send(t)}).then(function(t){return c.parse(t,u)}).then(function(t){return a.inject(t,u)}).then(function(){return o()})}},{"./injector":2,"./location":3,"./parser":4}],6:[function(t,e,n){"use strict";function r(){return"0px"!==u.css("max-height")}function o(){s.animate({opacity:0},250,function(){u.animate({"max-height":"0px"},500)})}function i(){var t=a.position().left+a.width();u.css("left",t-u.width()),u.animate({"max-height":"100px"},500,function(){s.animate({opacity:1},250)})}function c(t){return!t.hasClass("selected")}var a=$("#settings-icon"),u=$("#settings-menu"),s=$("#temp-toggle"),f=$(".toggle-item"),l=$("#temp");a.on("click",function(){r()?o():i()}),$(document).ready(function(){var t=void 0;try{t=document.cookie.match(/temp=(f|c)/)[1]}catch(e){t="f"}$("[data-units='"+t+"']").addClass("selected")}),f.on("click",function(t){var e=$(t.target);if(c(e)){var n=e.attr("data-units");f.toggleClass("selected"),document.cookie="temp="+n,l.text(window.weather[n]+" °"+n.toUpperCase()),o()}})},{}]},{},[1]);