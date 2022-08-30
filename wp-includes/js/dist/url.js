(function(){"use strict";var __webpack_require__={};!function(){__webpack_require__.d=function(exports,definition){for(var key in definition){if(__webpack_require__.o(definition,key)&&!__webpack_require__.o(exports,key)){Object.defineProperty(exports,key,{enumerable:true,get:definition[key]});}}};}();!function(){__webpack_require__.o=function(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop);}}();!function(){__webpack_require__.r=function(exports){if(typeof Symbol!=='undefined'&&Symbol.toStringTag){Object.defineProperty(exports,Symbol.toStringTag,{value:'Module'});}
Object.defineProperty(exports,'__esModule',{value:true});};}();var __webpack_exports__={};__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{"addQueryArgs":function(){return addQueryArgs;},"buildQueryString":function(){return buildQueryString;},"cleanForSlug":function(){return cleanForSlug;},"filterURLForDisplay":function(){return filterURLForDisplay;},"getAuthority":function(){return getAuthority;},"getFilename":function(){return getFilename;},"getFragment":function(){return getFragment;},"getPath":function(){return getPath;},"getPathAndQueryString":function(){return getPathAndQueryString;},"getProtocol":function(){return getProtocol;},"getQueryArg":function(){return getQueryArg;},"getQueryArgs":function(){return getQueryArgs;},"getQueryString":function(){return getQueryString;},"hasQueryArg":function(){return hasQueryArg;},"isEmail":function(){return isEmail;},"isURL":function(){return isURL;},"isValidAuthority":function(){return isValidAuthority;},"isValidFragment":function(){return isValidFragment;},"isValidPath":function(){return isValidPath;},"isValidProtocol":function(){return isValidProtocol;},"isValidQueryString":function(){return isValidQueryString;},"normalizePath":function(){return normalizePath;},"prependHTTP":function(){return prependHTTP;},"removeQueryArgs":function(){return removeQueryArgs;},"safeDecodeURI":function(){return safeDecodeURI;},"safeDecodeURIComponent":function(){return safeDecodeURIComponent;}});;function isURL(url){try{new URL(url);return true;}catch{return false;}};const EMAIL_REGEXP=/^(mailto:)?[a-z0-9._%+-]+@[a-z0-9][a-z0-9.-]*\.[a-z]{2,63}$/i;function isEmail(email){return EMAIL_REGEXP.test(email);};function getProtocol(url){const matches=/^([^\s:]+:)/.exec(url);if(matches){return matches[1];}};function isValidProtocol(protocol){if(!protocol){return false;}
return /^[a-z\-.\+]+[0-9]*:$/i.test(protocol);};function getAuthority(url){const matches=/^[^\/\s:]+:(?:\/\/)?\/?([^\/\s#?]+)[\/#?]{0,1}\S*$/.exec(url);if(matches){return matches[1];}};function isValidAuthority(authority){if(!authority){return false;}
return /^[^\s#?]+$/.test(authority);};function getPath(url){const matches=/^[^\/\s:]+:(?:\/\/)?[^\/\s#?]+[\/]([^\s#?]+)[#?]{0,1}\S*$/.exec(url);if(matches){return matches[1];}};function isValidPath(path){if(!path){return false;}
return /^[^\s#?]+$/.test(path);};function getQueryString(url){let query;try{query=new URL(url,'http://example.com').search.substring(1);}catch(error){}
if(query){return query;}};function buildQueryString(data){let string='';const stack=Object.entries(data);let pair;while(pair=stack.shift()){let[key,value]=pair;const hasNestedData=Array.isArray(value)||value&&value.constructor===Object;if(hasNestedData){const valuePairs=Object.entries(value).reverse();for(const[member,memberValue]of valuePairs){stack.unshift([`${key}[${member}]`,memberValue]);}}else if(value!==undefined){if(value===null){value='';}
string+='&'+[key,value].map(encodeURIComponent).join('=');}}
return string.substr(1);};function isValidQueryString(queryString){if(!queryString){return false;}
return /^[^\s#?\/]+$/.test(queryString);};function getPathAndQueryString(url){const path=getPath(url);const queryString=getQueryString(url);let value='/';if(path)value+=path;if(queryString)value+=`?${queryString}`;return value;};function getFragment(url){const matches=/^\S+?(#[^\s\?]*)/.exec(url);if(matches){return matches[1];}};function isValidFragment(fragment){if(!fragment){return false;}
return /^#[^\s#?\/]*$/.test(fragment);};function setPath(object,path,value){const length=path.length;const lastIndex=length-1;for(let i=0;i<length;i++){let key=path[i];if(!key&&Array.isArray(object)){key=object.length.toString();}
key=['__proto__','constructor','prototype'].includes(key)?key.toUpperCase():key;const isNextKeyArrayIndex=!isNaN(Number(path[i+1]));object[key]=i===lastIndex?value:object[key]||(isNextKeyArrayIndex?[]:{});if(Array.isArray(object[key])&&!isNextKeyArrayIndex){object[key]={...object[key]};}
object=object[key];}}
function getQueryArgs(url){return(getQueryString(url)||'').replace(/\+/g,'%20').split('&').reduce((accumulator,keyValue)=>{const[key,value='']=keyValue.split('=').filter(Boolean).map(decodeURIComponent);if(key){const segments=key.replace(/\]/g,'').split('[');setPath(accumulator,segments,value);}
return accumulator;},Object.create(null));};function addQueryArgs(){let url=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'';let args=arguments.length>1?arguments[1]:undefined;if(!args||!Object.keys(args).length){return url;}
let baseUrl=url;const queryStringIndex=url.indexOf('?');if(queryStringIndex!==-1){args=Object.assign(getQueryArgs(url),args);baseUrl=baseUrl.substr(0,queryStringIndex);}
return baseUrl+'?'+buildQueryString(args);};function getQueryArg(url,arg){return getQueryArgs(url)[arg];};function hasQueryArg(url,arg){return getQueryArg(url,arg)!==undefined;};function removeQueryArgs(url){const queryStringIndex=url.indexOf('?');if(queryStringIndex===-1){return url;}
const query=getQueryArgs(url);const baseURL=url.substr(0,queryStringIndex);for(var _len=arguments.length,args=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){args[_key-1]=arguments[_key];}
args.forEach(arg=>delete query[arg]);const queryString=buildQueryString(query);return queryString?baseURL+'?'+queryString:baseURL;};const USABLE_HREF_REGEXP=/^(?:[a-z]+:|#|\?|\.|\/)/i;function prependHTTP(url){if(!url){return url;}
url=url.trim();if(!USABLE_HREF_REGEXP.test(url)&&!isEmail(url)){return 'http://'+url;}
return url;};function safeDecodeURI(uri){try{return decodeURI(uri);}catch(uriError){return uri;}};function safeDecodeURIComponent(uriComponent){try{return decodeURIComponent(uriComponent);}catch(uriComponentError){return uriComponent;}};function filterURLForDisplay(url){let maxLength=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;let filteredURL=url.replace(/^(?:https?:)\/\/(?:www\.)?/,'');if(filteredURL.match(/^[^\/]+\/$/)){filteredURL=filteredURL.replace('/','');}
const mediaRegexp=/([\w|:])*\.(?:jpg|jpeg|gif|png|svg)/;if(!maxLength||filteredURL.length<=maxLength||!filteredURL.match(mediaRegexp)){return filteredURL;}
filteredURL=filteredURL.split('?')[0];const urlPieces=filteredURL.split('/');const file=urlPieces[urlPieces.length-1];if(file.length<=maxLength){return '…'+filteredURL.slice(-maxLength);}
const index=file.lastIndexOf('.');const[fileName,extension]=[file.slice(0,index),file.slice(index+1)];const truncatedFile=fileName.slice(-3)+'.'+extension;return file.slice(0,maxLength-truncatedFile.length-1)+'…'+truncatedFile;};var external_lodash_namespaceObject=window["lodash"];;function cleanForSlug(string){if(!string){return '';}
return(0,external_lodash_namespaceObject.trim)((0,external_lodash_namespaceObject.deburr)(string).replace(/[\s\./]+/g,'-').replace(/[^\p{L}\p{N}_-]+/gu,'').toLowerCase(),'-');};function getFilename(url){let filename;try{filename=new URL(url,'http://example.com').pathname.split('/').pop();}catch(error){}
if(filename){return filename;}};function normalizePath(path){const splitted=path.split('?');const query=splitted[1];const base=splitted[0];if(!query){return base;}
return base+'?'+query.split('&').map(entry=>entry.split('=')).map(pair=>pair.map(decodeURIComponent)).sort((a,b)=>a[0].localeCompare(b[0])).map(pair=>pair.map(encodeURIComponent)).map(pair=>pair.join('=')).join('&');};(window.wp=window.wp||{}).url=__webpack_exports__;})();