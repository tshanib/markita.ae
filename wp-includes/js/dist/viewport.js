(function(){"use strict";var __webpack_require__={};!function(){__webpack_require__.d=function(exports,definition){for(var key in definition){if(__webpack_require__.o(definition,key)&&!__webpack_require__.o(exports,key)){Object.defineProperty(exports,key,{enumerable:true,get:definition[key]});}}};}();!function(){__webpack_require__.o=function(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop);}}();!function(){__webpack_require__.r=function(exports){if(typeof Symbol!=='undefined'&&Symbol.toStringTag){Object.defineProperty(exports,Symbol.toStringTag,{value:'Module'});}
Object.defineProperty(exports,'__esModule',{value:true});};}();var __webpack_exports__={};__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{"ifViewportMatches":function(){return if_viewport_matches;},"store":function(){return store;},"withViewportMatch":function(){return with_viewport_match;}});var actions_namespaceObject={};__webpack_require__.r(actions_namespaceObject);__webpack_require__.d(actions_namespaceObject,{"setIsMatching":function(){return setIsMatching;}});var selectors_namespaceObject={};__webpack_require__.r(selectors_namespaceObject);__webpack_require__.d(selectors_namespaceObject,{"isViewportMatch":function(){return isViewportMatch;}});;var external_lodash_namespaceObject=window["lodash"];;var external_wp_data_namespaceObject=window["wp"]["data"];;function reducer(){let state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};let action=arguments.length>1?arguments[1]:undefined;switch(action.type){case 'SET_IS_MATCHING':return action.values;}
return state;}
var store_reducer=(reducer);;function setIsMatching(values){return{type:'SET_IS_MATCHING',values};};function isViewportMatch(state,query){if(query.indexOf(' ')===-1){query='>= '+query;}
return!!state[query];};const STORE_NAME='core/viewport';const store=(0,external_wp_data_namespaceObject.createReduxStore)(STORE_NAME,{reducer:store_reducer,actions:actions_namespaceObject,selectors:selectors_namespaceObject});(0,external_wp_data_namespaceObject.register)(store);;const addDimensionsEventListener=(breakpoints,operators)=>{const setIsMatching=(0,external_lodash_namespaceObject.debounce)(()=>{const values=(0,external_lodash_namespaceObject.mapValues)(queries,query=>query.matches);(0,external_wp_data_namespaceObject.dispatch)(store).setIsMatching(values);},{leading:true});const queries=(0,external_lodash_namespaceObject.reduce)(breakpoints,(result,width,name)=>{(0,external_lodash_namespaceObject.forEach)(operators,(condition,operator)=>{const list=window.matchMedia(`(${condition}: ${width}px)`);list.addListener(setIsMatching);const key=[operator,name].join(' ');result[key]=list;});return result;},{});window.addEventListener('orientationchange',setIsMatching);setIsMatching();setIsMatching.flush();};var listener=(addDimensionsEventListener);;var external_wp_compose_namespaceObject=window["wp"]["compose"];;function _extends(){_extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}
return target;};return _extends.apply(this,arguments);};var external_wp_element_namespaceObject=window["wp"]["element"];;const withViewportMatch=queries=>{const useViewPortQueriesResult=()=>(0,external_lodash_namespaceObject.mapValues)(queries,query=>{let[operator,breakpointName]=query.split(' ');if(breakpointName===undefined){breakpointName=operator;operator='>=';}
return(0,external_wp_compose_namespaceObject.useViewportMatch)(breakpointName,operator);});return(0,external_wp_compose_namespaceObject.createHigherOrderComponent)(WrappedComponent=>{return(0,external_wp_compose_namespaceObject.pure)(props=>{const queriesResult=useViewPortQueriesResult();return(0,external_wp_element_namespaceObject.createElement)(WrappedComponent,_extends({},props,queriesResult));});},'withViewportMatch');};var with_viewport_match=(withViewportMatch);;const ifViewportMatches=query=>(0,external_wp_compose_namespaceObject.createHigherOrderComponent)((0,external_wp_compose_namespaceObject.compose)([with_viewport_match({isViewportMatch:query}),(0,external_wp_compose_namespaceObject.ifCondition)(props=>props.isViewportMatch)]),'ifViewportMatches');var if_viewport_matches=(ifViewportMatches);;const BREAKPOINTS={huge:1440,wide:1280,large:960,medium:782,small:600,mobile:480};const OPERATORS={'<':'max-width','>=':'min-width'};listener(BREAKPOINTS,OPERATORS);(window.wp=window.wp||{}).viewport=__webpack_exports__;})();