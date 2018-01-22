/* eslint-disable */
/* From: https://c.amazon-adsystem.com/aax2/apstag.js */
/* amazon-dtb-javascript-api - v1.0.0 - 2017-12-20 11:20:33 PM */"use strict";function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _toConsumableArray(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}return Array.from(a)}var _extends=Object.assign||function(a){var b,c,d;for(b=1;b<arguments.length;b++){c=arguments[b];for(d in c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d])}return a};!function(){function _safeWindowHasOwnProperty(a){return Object.prototype.hasOwnProperty.call(window,a)}var HAS_LIBRARY_LOADED=function(){var a=!1;return _safeWindowHasOwnProperty("apstag")&&window.apstag.hasOwnProperty("debug")&&(a=!0),a}();HAS_LIBRARY_LOADED||!function(){function _debugProp(a){var b;return _safeWindowHasOwnProperty(DEBUG_GLOBAL)&&window[DEBUG_GLOBAL].hasOwnProperty(a)&&(b=window[DEBUG_GLOBAL][a]),b}function _aaxHost(){var a=DEFAULT_AAX_HOST;return _debugProp("host")&&(a=window[DEBUG_GLOBAL].host),a}function _detectIframeAndGetURL(){try{return window.top!==window.self?encodeURIComponent(document.referrer):""}catch(a){return encodeURIComponent(document.documentURI)}}function _getPageReferrerURL(){var a,b;try{try{b=window.top.document.referrer}catch(c){b=window.document.referrer}a=encodeURIComponent(b)}catch(c){}return a}function _getReferrerURL(){var a,b;if(_debugProp("url"))return a=window[DEBUG_GLOBAL].url,encodeURIComponent(a);b=encodeURIComponent(document.documentURI);try{b=encodeURIComponent(window.top.location.href),b&&"undefined"!=typeof b||(b=_detectIframeAndGetURL())}catch(c){b=_detectIframeAndGetURL()}return b}function _getCfgVersion(){return lsPresent?state.hasOwnProperty("cfg")&&state.cfg.hasOwnProperty("v")?state.cfg.v:null:NO_LOCAL_STORAGE_SUPPORT_MAGIC_NUNMBER_FOR_AAX}function _pixel(a){a&&((new Image).src=a)}function _pixelBaseURL(){return""+PROTOCOL+_aaxHost()+PIXEL_PATH}function _objToURLParam(a){return encodeURIComponent(JSON.stringify(a))}function _safeDebugSet(a){lsPresent&&window.localStorage.setItem(DEBUG_LOCAL_STORAGE_KEY,a)}function _debugConsole(a){lsPresent&&window.localStorage.setItem(DEBUG_CONSOLE_LOCAL_STORAGE_KEY,a)}function _logEvent(a){a.ts=Date.now(),dispatch({type:"LOG_EVENT",event:a})}function _doCookieMatch(a){function b(a){if(!state.cmpFired){dispatch({type:"CMP_FIRED"});var b=document.createElement("iframe");b.style.display="none",b.src=a,document.body.appendChild(b)}}document.readyState&&"loading"===document.readyState?document.addEventListener?document.addEventListener("DOMContentLoaded",function(){b(a)},!1):document.attachEvent&&document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&b(a)}):b(a)}function _doJSCookieMatch(a){_loadScriptTag(a)}function _tryCookieMatch(a){try{var b=state.cfg.COOKIE_MATCH_DELAY||COOKIE_MATCH_DELAY;window.setTimeout(function(){try{a&&a.cmp&&""!==a.cmp&&"undefined"!=typeof a.cmp?_doCookieMatch(a.cmp):a&&a.cmpjs&&""!==a.cmpjs&&"undefined"!=typeof a.cmpjs&&_doJSCookieMatch(a.cmpjs)}catch(b){}},b)}catch(c){}}function _getValidMilliseconds(a){if(!a)return!1;try{var b=~~Number(a);if(b>MINIMUM_BID_TIMEOUT)return b}catch(c){return!1}return!1}function _safeOnload(a,b,c){try{b&&"function"==typeof b&&(a.readyState?a.onreadystatechange=function(){("loaded"===a.readyState||"complete"===a.readyState)&&(a.onreadystatechange=null,b.apply(null,c))}:a.onload=function(){b.apply(null,c)})}catch(d){}}function _xhr(url,callback){var xhr,hasCallbackExecuted=!1;try{xhr=new XMLHttpRequest,xhr.onload=function(){eval(xhr.responseText),hasCallbackExecuted||(callback(),hasCallbackExecuted=!0)},xhr.onerror=function(){hasCallbackExecuted||(callback(),hasCallbackExecuted=!0)},xhr.withCredentials=!0,xhr.open("GET",url),xhr.send(null)}catch(e){hasCallbackExecuted||(callback(),hasCallbackExecuted=!0)}}function _loadScriptTag(a,b,c){var d,e;return c||(c=document),!a&&b&&"function"==typeof b?void b(!0):(d=c.getElementsByTagName("script")[0],e=c.createElement("script"),e.type="text/javascript",e.async=!0,e.src=a,b&&_safeOnload(e,b),void d.parentNode.insertBefore(e,d))}function _getPerformanceObject(a){try{return HAS_PERFORMANCE_SUPPORT?performance.getEntriesByType("resource").filter(function(b){return b.name.indexOf(a)>-1})[0]:null}catch(b){return null}}function _getPerfObjectTSFromMSMeasurement(a,b){try{return a&&b in a?parseInt(a[b]+NAV_START,10):0}catch(c){return 0}}function _getFetchStart(a){return _getPerfObjectTSFromMSMeasurement(a,"fetchStart")}function _getResponseEnd(a){return _getPerfObjectTSFromMSMeasurement(a,"responseEnd")}function _constructFetchBidsLatencyPixelSource(a,b){var c=_getPerformanceObject(b.cb),d={c:"dtb",bla:a.resTs-a.rqTs,m:"DV",pid:PAGELOAD_ID,lv:LIBRARY_VERSION,fid:b.cb,xs:HAS_XHR_SUPPORT?"1":"0",fbrq:a.rqTs,fbrs:a.resTs,nrq:_getFetchStart(c),nrs:_getResponseEnd(c),toa:a.hasOwnProperty("timedOutAt")?a.timedOutAt:"0",pto:a.timeout};return state.config.isSelfServPub?(d.src=SELF_SERVE_PUB_SRC,d.pubid=state.config.pubID):d.src=state.config.pubID,_pixelBaseURL()+"PH/"+JSON.stringify(d)}function _shouldSample(a){var b,c=parseInt(a,10);if(!isNaN(c)){if(0===c)return!1;if(100===c)return!0;if(b=100*Math.random(),c>=b)return!0}return!1}function _sendFetchBidsLatencyPixel(a){var b=state.AAXReqs.filter(function(b){return b.bidReqID===a.cb})[0],c=_constructFetchBidsLatencyPixelSource(b,a);_pixel(c)}function _getFirstPartyCookies(){var a,b,c=document.cookie.split("; ");return c.forEach(function(c){b=c.split("="),b[0]in FIRST_PARTY_COOKIE_KEYS&&(a+="&"+FIRST_PARTY_COOKIE_KEYS[b[0]].urlParam+"="+b[1])}),a}function _getCookieExpiry(a){var b=new Date;return b.setTime(b.getTime()+1e3*a),b.toGMTString()}function _setFirstPartyCookies(a){if(a[AAX_RESP_REMAP_COOKIE_KEY])try{a[AAX_RESP_REMAP_COOKIE_KEY].forEach(function(a){document.cookie=a.k+"="+a.v+";expires="+_getCookieExpiry(a.exp)+";"})}catch(b){}}function _doOnAAXResponse(a){a.hasOwnProperty("cb")&&dispatch({type:"RECORD_AAX_RESPONSE_PROP",bidReqID:a.cb,key:"resTs",value:Date.now()}),a.hasOwnProperty("cfg")&&dispatch({type:"SET_CFG",cfg:a.cfg}),metrics.addTimer("br"),metrics.set("brs",a.punt?"0":"1"),a.hasOwnProperty("rm")&&metrics.schedule(a.to,a.id),_isGoogletagDisplayAdServer()&&_determineNoBidStateForDFP(a)}function _doAfterAAXResponse(a){_tryCookieMatch(a),state.shouldSampleLatency&&_sendFetchBidsLatencyPixel(a),_setFirstPartyCookies(a),a.hasOwnProperty("cfg")&&localStorage.setItem(CFG_LOCAL_STORAGE_KEY,JSON.stringify(a.cfg))}function _wrapCallback(a,b){var c=!1,d=null,e=function(b){if(!c){try{a(b),d&&clearTimeout(d)}catch(e){}c=!0}},f=_getValidMilliseconds(b);return d=window.setTimeout(e.bind(null,!0),f||DEFAULT_TIMEOUT),e.bind(null,!1)}function _getRnd(){var a=Math.round(1e9*Math.random());return""+a+Date.now()}function _getWindowDimensions(){var a,b;try{return a=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,b=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,a+"x"+b}catch(c){}return"x"}function _mapSlotsArgToURLParam(a){var b=a.map(function(a){if(a.hasOwnProperty("mediaType")&&"video"===a.mediaType)return{id:a.slotID,mt:MEDIA_TYPES_MAGIC_STRING_FOR_AAX.video};if(a.hasOwnProperty("sizes")){var b={sd:a.slotID,s:a.sizes.filter(function(a){return _isArray(a)}).map(function(a){return a.join("x")})};return a.hasOwnProperty("slotName")&&a.slotName!==a.slotID&&(b.sn=a.slotName),b}return _extends({},a,{id:"error"})}).filter(function(a){return"error"!==a.id});return _objToURLParam(b)}function _getBlockedBidders(a){var b,c=a.blockedBidders&&_isArray(a.blockedBidders)?a.blockedBidders:state.config.blockedBidders;return c&&_isArray(c)&&(b=JSON.stringify(c)),b}function _bidURL(a,b){var c,d,e=_aaxHost(),f=DTB_PATH,g=state.config.pubID,h=PAGELOAD_ID,i=_getReferrerURL(),j=_getPageReferrerURL(),k=_getWindowDimensions(),l=LIBRARY_VERSION,m=_getFirstPartyCookies(),n=_getBlockedBidders(a),o=_getCfgVersion();return dispatch({type:"RECORD_AAX_REQUSET",data:{bidConfig:a,timeout:b,bidReqID:a.bidReqID,ws:k,url:i,rqTs:Date.now()}}),c=state.config.isSelfServPub?"src=600&pubid="+g:"src="+g,c+="&u="+i+"&pid="+h+"&cb="+a.bidReqID+"&ws="+k+"&v="+l+"&t="+b,a.hasOwnProperty("slots")&&(c+="&slots="+_mapSlotsArgToURLParam(a.slots)),state.config.hasOwnProperty("params")&&(c+="&pj="+_objToURLParam(state.config.params)),m&&(c+=m),(o||o===NO_LOCAL_STORAGE_SUPPORT_MAGIC_NUNMBER_FOR_AAX)&&(c+="&cfgv="+o),_debugProp("bidParams")&&Object.keys(window[DEBUG_GLOBAL].bidParams).forEach(function(a){c+="&"+a+"="+window[DEBUG_GLOBAL].bidParams[a]}),j&&""!==j&&(c+="&pr="+j),n&&(c+="&bb="+n),d=""+PROTOCOL+e+f+"/bid?"+c}function _QHandler(){state&&state.hasOwnProperty("Q")&&state.Q.forEach(function(a){"i"===a[0]?window.apstag.init.apply(null,a[1]):window.apstag.fetchBids.apply(null,a[1])})}function _validateConfig(a){return dispatch({type:"SET_CONFIG",config:a}),"success"}function _isOASDisplayAdServer(){return state.hasOwnProperty("config")&&state.config.hasOwnProperty("adServer")&&"oas"===state.config.adServer}function _isGoogletagDisplayAdServer(){return state.hasOwnProperty("config")&&state.config.hasOwnProperty("adServer")&&"googletag"===state.config.adServer}function _hasGoogletagLoaded(){return"undefined"!=typeof googletag&&googletag.hasOwnProperty("apiReady")&&googletag.apiReady===!0}function _hasGoogletagCmdBeenDefined(){return"undefined"!=typeof googletag?"undefined"!=typeof googletag.cmd:!1}function _safeGoogletagApplySlotTargeting(a){var b=a.slotID;a.hasOwnProperty("mediaType")||_safeWindowHasOwnProperty("googletag")&&_hasGoogletagCmdBeenDefined()&&(_hasGoogletagLoaded()?_getGoogletagSlot(b)&&_applyTargetingToGPTSlot(a):googletag.cmd.push(function(){_safeGoogletagApplySlotTargeting(a)}))}function _getGoogletagSlot(a){var b;try{b=_googletagSlots().filter(function(b){return b.getSlotElementId()===a})[0]}catch(c){}return b}function _clearTargetingFromGPTSlot(a){var b,c=DISPLAY_TARGETING_KEYS;try{_hasGoogletagLoaded()&&(b=_getGoogletagSlot(a),c.forEach(function(a){return b.setTargeting(a,"")}))}catch(d){}}function _findBidIDSetBySlotID(a){var b,c;try{c=state.slotBids,Object.keys(c).forEach(function(d){d===a&&c[d].forEach(function(a){a.bidState===BID_STATES.set&&(b=a.amzniid)})})}catch(d){}return b}function _clearbidSetOnSlot(a){try{if(state.slotBids.hasOwnProperty(a)){var b=state.slotBids[a].filter(function(a){return a.bidState===BID_STATES.set})[0];b&&b.bidState===BID_STATES.set&&dispatch({type:"BID_STATE_CHANGE",slotID:a,bidID:_findBidIDSetBySlotID(a),bidState:BID_STATES.exposed})}}catch(c){}}function _areTwoURlsTheSame(a,b){var c=decodeURIComponent(a).split("?")[0].split("#")[0],d=decodeURIComponent(b).split("?")[0].split("#")[0];return c===d}function _inArray(a,b){return a.indexOf(b)>-1}function _isArray(a){return a instanceof Array}function _hasAllItemsInArray(a,b){return a.map(function(a){return _inArray(b,a)}).filter(function(a){return a}).length===a.length}function _googletagSlots(){var a=[];try{a=googletag.pubads().getSlots()}catch(b){}return a}function _getCurrentSlotBids(){var a={};try{Object.keys(state.slotBids).forEach(function(b){var c,d=state.slotBids[b];d.filter(function(a){return a.bidState===BID_STATES.set}).length>0||(c=d.filter(function(a){return Date.now()-state.AAXReqs.filter(function(b){return b.bidReqID===a.bidReqID})[0].rqTs<24e4}).filter(function(a){return _areTwoURlsTheSame(_getReferrerURL(),state.AAXReqs.filter(function(b){return b.bidReqID===a.bidReqID})[0].url)}).filter(function(a){return a.bidState!==BID_STATES.rendered}),c.length>0&&(a[b]=c.map(function(a){var b=state.AAXReqs.filter(function(b){return b.bidReqID===a.bidReqID})[0].rqTs;return _extends({},a,{rqTs:b})}).reduce(function(a,b){return a.rqTs>b.rqTs?a:b})))})}catch(b){}return a}function _findSlotBidByBidID(a){var b,c;try{c=state.slotBids,Object.keys(c).forEach(function(d){c[d].forEach(function(c){c.amzniid===a&&(b=c)})})}catch(d){}return b}function _mergeVideoBids(a){var b={};return a.slots.forEach(function(a){"video"===!a.mediaType?b[a.slotID]=a:(a.slotID.indexOf("rsv-")>=0&&(a={slotID:a.slotID.substring(4),r_amznbid:a.amznbid,r_amzniid:a.amzniid,r_amznp:a.amznp,mediaType:"video"}),b[a.slotID]?b[a.slotID]=_extends({},b[a.slotID],a):b[a.slotID]=a)}),Object.keys(b).map(function(a){return b[a]})}function _convertAAXResponse(a){var b,c=_mergeVideoBids(a),d=["host","ev","cb","cmp"];try{b=c.map(function(b){var c={amznsz:b.size,bidState:BID_STATES["new"]};return d.forEach(function(b){var d,e;a.hasOwnProperty(b)&&(d=a[b],e=b,"cb"===b&&(e="bidReqID"),c[e]=d)}),_extends({},b,c)})}catch(e){}return b}function _applyTargetingToGPTSlot(a){try{var b,c=a.slotID,d=a.amzniid,e=_targetingKeys("display");b=_getGoogletagSlot(c),b&&(Object.keys(a).filter(function(a){return _inArray(e,a)}).forEach(function(c){return b.setTargeting(c,a[c])}),dispatch({type:"BID_STATE_CHANGE",slotID:c,bidID:d,bidState:BID_STATES.set}))}catch(f){}}function _applySuppliedSlotBidsToGoogletag(a){var b=_getCurrentSlotBids();a.forEach(function(a){b[a]&&_safeGoogletagApplySlotTargeting(b[a])})}function _applyAllCurrentSlotBidsTargetingToGoogletag(){var a=_getCurrentSlotBids();Object.keys(a).forEach(function(b){_safeGoogletagApplySlotTargeting(a[b])})}function _applyGPTSlotTargeting(a){try{a?_applySuppliedSlotBidsToGoogletag(a):_applyAllCurrentSlotBidsTargetingToGoogletag(),state.DFP.slotRenderEndedSet||(googletag.cmd.push(function(){googletag.pubads().addEventListener("slotRenderEnded",function(a){_clearTargetingFromGPTSlot(a.slot.getSlotElementId()),_clearbidSetOnSlot(a.slot.getSlotElementId())})}),dispatch({type:"DFP_SLOT_RENDER_ENDED_SET"}))}catch(b){}}function _creativeURL(a){var b,c="?b="+a.bidID+"&pp="+a.pp+"&rnd="+_getRnd()+"&p="+a.amznp+"&crid="+a.crID,d=""+a.host+DTB_PATH+"/imp";return b="1"===a.fif?d+"j"+c:d+"i"+c}function _baseIframe(a){var b=a.doc.createElement("iframe");return b.frameBorder=0,b.marginHeight=0,b.marginWidth=0,b.topMargin=0,b.leftMargin=0,b.scrolling="no",b.allowTransparency=!0,b.width=a.sizes[0]+"px",b.height=a.sizes[1]+"px",b}function _loadAdIntoFriendlyIframe(a){var b=_baseIframe(a);b.id="apstag-f-iframe-"+_getRnd(),b.srcdoc=a.html,a.doc.body.appendChild(b)}function _loadAdIntoUnfriendlyIframe(a,b){var c,d=_baseIframe(a);d.id=a.adID,d.sandbox="allow-forms allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation",debugCheck?(c='<body style="background-color: #FF9900;">'+(a.sizes[1]>50?"<h3>apstag Test Creative</h3>":"")+"<h4>amzniid - "+a.bidID+" | amznbid: "+a.pp+" | size: "+a.sizes.join("x")+"</h4></body>",d.src="javascript:'"+c+"'"):d.src=_creativeURL(a),a.doc.body.appendChild(d),b&&_safeOnload(a.doc.getElementById(a.adID),function(){return b(a.doc,a.bidID,d)})}function _triggerViewability(a,b,c){var d;_safeWindowHasOwnProperty("amzncsm")?d=window.amzncsm:a.defaultView.hasOwnProperty("amzncsm")&&(d=a.defaultView.amzncsm),d&&(d.host=_aaxHost(),d.rmD(c,b,a.defaultView,a,state.config.pubID))}function _getNewSlotBidsAndExposeForRequestedSlots(a){var b=a.map(_getSlotID),c={};return Object.keys(state.slotBids).forEach(function(a){var d=state.slotBids[a].filter(function(a){return a.bidState===BID_STATES["new"]})[0];d&&_inArray(b,a)&&(c[a]=d,dispatch({type:"BID_STATE_CHANGE",slotID:a,bidID:d.amzniid,bidState:BID_STATES.exposed}))}),c}function _createPublicStateTrackingBigObject(a,b){var c="0x0";return{slotID:a,amzniid:"",amznbid:b,amznp:b,amznsz:c,size:c}}function _constructStateTrackingBids(a,b,c){var d=b.slots.filter(_isDisplaySlot).map(_getSlotID),e=a.map(_getSlotID),f=[];return f=c?d.map(function(a){return _createPublicStateTrackingBigObject(a,slotStates.bidInFlight)}):d.reduce(function(a,b){return _inArray(e,b)||a.push(_createPublicStateTrackingBigObject(b,slotStates.noBid)),a},[]),a.concat(f)}function _bidCallbackHandler(a,b){return function(c){var d=_getNewSlotBidsAndExposeForRequestedSlots(b.slots),e=Object.keys(d),f=[];c&&dispatch({type:"RECORD_AAX_RESPONSE_PROP",bidReqID:b.bidReqID,key:"timedOutAt",value:Date.now()}),e.forEach(function(a){var b,c,e;d.hasOwnProperty(a)&&(b=d[a],b.hasOwnProperty("amznp")||(b.amznp=""),c={amzniid:b.amzniid,amznbid:b.amznbid,amznp:b.amznp,slotID:a},b.hasOwnProperty("size")&&(c.size=b.size,c.amznsz=b.amznsz),"video"===b.mediaType&&(c.mediaType="video",e="",b.amznbid?e+="&amzniid="+b.amzniid+"&amznbid="+b.amznbid+"&amznp="+b.amznp:(c.amznbid="",c.amzniid=""),b.r_amznbid?(c.r_amznbid=b.r_amznbid,c.r_amzniid=b.r_amzniid,c.r_amznp=b.r_amznp,e+="&r_amzniid="+b.r_amzniid+"&r_amznbid="+b.r_amznbid+"&r_amznp="+b.r_amznp):(c.r_amznbid="",c.r_amzniid="",c.r_amznp=""),c.qsParams=e,c.encodedQsParams=encodeURIComponent(e)),f.push(c))}),_isGoogletagDisplayAdServer()&&(f=_constructStateTrackingBids(f,b,c)),a(f)}}function _resizeIframe(a,b){try{var c;c=a.defaultView&&a.defaultView.frameElement?a.defaultView.frameElement:window.frameElement,c.width=b[0],c.height=b[1]}catch(d){}}function _sizeArrayToSring(a){return a[0]+"x"+a[1]}function _pickRandomSizeForMockBid(a){var b,c;return 1===a.length?b=_sizeArrayToSring(a[0]):(c=Math.floor(a.length*Math.random()),b=_sizeArrayToSring(a[c])),b}function _doMockBid(a,b){var c,d=_aaxHost(),e=_getReferrerURL(),f=_getRnd(),g=_getWindowDimensions(),h=_debugProp("testBidTimeout")||200;dispatch({type:"RECORD_AAX_REQUSET",data:{bidConfig:a,timeout:h,bidReqID:f,ws:g,url:e,rqTs:Date.now()}}),c=a.slots.map(function(a){var b,c={slotID:a.slotID,amzniid:MOCKBID.amzniid+"-"+_getRnd(),amznbid:MOCKBID.amznbid,amznp:MOCKBID.amznp,crid:MOCKBID.crid+"-"+_getRnd()};return a.hasOwnProperty("sizes")?(b=_pickRandomSizeForMockBid(a.sizes),c.size=b,c.amznsz=b):"video"===a.mediaType&&(c.mediaType="video",c.amznbid="v_"+c.amznbid),c}),window.setTimeout(function(){window.apstag.bids({slots:c,host:d,status:"ok",cb:f}),b(!0)},h)}function _getSlotID(a){return a.slotID}function _determineNoBidStateForDFP(a){var b,c,d,e=state.AAXReqs.filter(function(b){return b.bidReqID===a.cb})[0];e&&e.bidConfig&&e.bidConfig.slots&&(b=e.bidConfig.slots.filter(_isDisplaySlot).map(function(a){return a.slotID}),c=a.hasOwnProperty("slots")?a.slots.map(function(a){return a.slotID}):[],d=b.filter(function(a){return!_inArray(c,a)}),dispatch({type:"NO_BID_ON_DFP_SLOTS",slotIDs:d}),_hasGoogletagLoaded()?_applyNoBidFromAAXState():_hasGoogletagCmdBeenDefined()&&googletag.cmd.push(function(){_applyNoBidFromAAXState()}))}function _isRequestInFlightForThisSlot(a){return _inArray(state.AAXReqs.filter(function(a){return!a.resTs}).map(function(a){return a.bidConfig.slots}).reduce(function(a,b){return a.concat(b)},[]).map(_getSlotID),a)}function _isRealAmznbidTargetingSetOnSlot(a){var b=a.getTargeting("amznbid");return b.length>0&&b[0].length>2}function _applyNoBidFromAAXState(){_isGoogletagDisplayAdServer()&&(_hasGoogletagLoaded()&&"1"===googletag.pubads().getTargeting("amznbid")[0]&&_clearBidStateTargeting(),_googletagSlots().forEach(function(a){!_inArray(state.DFP.noBidSlotIDs,a.getSlotElementId())||_isRequestInFlightForThisSlot(a.getSlotElementId())||_isRealAmznbidTargetingSetOnSlot(a)||"2"===a.getTargeting("amznbid")[0]||_setBidState(a,"noBid")}))}function _setBidState(a,b){SLOT_STATE_KEYS.forEach(function(c){return a.setTargeting(c,slotStates[b])})}function _clearBidStateTargeting(){SLOT_STATE_KEYS.forEach(function(a){return googletag.pubads().clearTargeting(a)})}function _sendDupeBidPixel(a){var b={_type:"dupePixel",dd:Date.now()-a.renderTime},c=""+_pixelBaseURL()+a.amzniid+"/"+_objToURLParam(b);_pixel(c)}function _sendInitLatencyPixel(){var a=_getPerformanceObject("apstag"),b={pid:PAGELOAD_ID,ns:NAV_START,fs:_getFetchStart(a),re:_getResponseEnd(a)},c=_pixelBaseURL()+"PH/"+JSON.stringify(b);window.setTimeout(function(){_pixel(c)},1e3)}function _applyNoRequestToAAXState(){_isGoogletagDisplayAdServer()&&(_hasGoogletagLoaded()?_setBidState(googletag.pubads(),"noRequest"):_hasGoogletagCmdBeenDefined()&&(googletag.cmd=[function(){_setBidState(googletag.pubads(),"noRequest")}].concat(_toConsumableArray(googletag.cmd))))}function _isDisplaySlot(a){return"video"!==a.mediaType}function _setRequestToAAXInFlightState(a){_isGoogletagDisplayAdServer()&&_hasGoogletagCmdBeenDefined()&&(dispatch({type:"REQUESTED_BID_FOR_DFP_SLOTS",slotIDs:a}),googletag.cmd.push(function(){var b=_googletagSlots();"0"===googletag.pubads().getTargeting("amznbid")[0]&&_clearBidStateTargeting(),_hasAllItemsInArray(a,b.map(function(a){return a.getSlotElementId()}))?b.forEach(function(b){_inArray(a,b.getSlotElementId())&&!_isRealAmznbidTargetingSetOnSlot(b)&&_setBidState(b,"bidInFlight")}):googletag.cmd.push(function(){_setBidState(googletag.pubads(),"bidInFlight")})}))}function _debug(a){switch(a){case"getLog":return state.eventLog;case"getState":return state;case"enable":return _safeDebugSet(!0),"DEBUG MODE ENABLED";case"disable":return _safeDebugSet(!1),"DEBUG MODE DISABLED";case"enableConsole":return _debugConsole(apstagConsoleEnabled),"Debug console enabled";case"disableConsole":return _debugConsole(apstagConsoleDisabled),"Debug console disabled";default:return"unknown debug argument"}}function _renderImp(a,b){var c,d,e,f,g,h,i,j,k;try{if(c=b||a.amzniid,d=_findSlotBidByBidID(c),e=d.size.split("x").map(function(a){return parseInt(a,10)}),1===arguments.length)return void _loadAdIntoFriendlyIframe({doc:d.doc,sizes:e,html:a.html});d&&(d.bidState===BID_STATES.rendered&&_sendDupeBidPixel(d),dispatch({type:"BID_STATE_CHANGE",slotID:d.slotID,bidID:b,bidState:BID_STATES.rendered}),metrics.addTimer("imp"),f=d.amznbid,g=d.host,h="amznad"+Math.round(1e6*Math.random()),i=d.amznp,j=d.crid?d.crid:"",k={bidID:b,doc:a,pp:f,host:g,adID:h,sizes:e,amznp:i,crID:j,fif:!1},"1"===d.fif?(k.fif="1",dispatch({type:"STORE_IMPRESSION_DOC_REF",slotID:d.slotID,bidID:b,doc:a}),_loadScriptTag(_creativeURL(k),null,document)):state.viewabilityEnabled?_isOASDisplayAdServer()&&"loading"===a.readyState?a.addEventListener("DOMContentLoaded",function(){_loadViewabilityAd(k,a)}):_loadViewabilityAd(k,a):_loadAdIntoUnfriendlyIframe(k),_resizeIframe(a,e))}catch(l){}}function _loadViewabilityAd(a,b){var c=b.createElement("script");c.type="text/javascript",c.async=!0,b.body.appendChild(c),_safeOnload(c,function(){_loadAdIntoUnfriendlyIframe(a,_triggerViewability)}),c.src=CSM_JS}function _bids(a){try{_doOnAAXResponse(a),dispatch({type:"UPDATE_SLOT_BIDS",bids:_convertAAXResponse(a)}),a.hasOwnProperty("ev")&&dispatch({type:"SET_VIEWABILITY",viewability:a.ev}),_doAfterAAXResponse(a)}catch(b){}}function _fetchBids(a,b){var c,d,e,f=adjustSlotArraySizes(a.slots);f&&(a.slots=f);try{d=a.timeout||state.config.bidTimeout||DEFAULT_TIMEOUT,a.bidReqID=_getRnd(),"function"!=typeof b&&(b=function(){}),c=_wrapCallback(_bidCallbackHandler(b,a),d)}catch(g){}_setRequestToAAXInFlightState(a.slots.filter(_isDisplaySlot).map(_getSlotID)),debugCheck?_doMockBid(a,c):(e=_bidURL(a,d),HAS_XHR_SUPPORT?_xhr(e,c):_loadScriptTag(e,c))}function adjustSlotArraySizes(a){try{return a.map(function(a){return a.sizes&&_isArray(a.sizes)&&!_isArray(a.sizes[0])?_extends({},a,{sizes:[a.sizes]}):a})}catch(b){}return!1}function _punt(a){try{a.punt=!0,_doOnAAXResponse(a),_doAfterAAXResponse(a)}catch(b){}}function _setDisplayBids(a){state.config.hasOwnProperty("adServer")&&_isGoogletagDisplayAdServer()&&(_applyGPTSlotTargeting(a),_applyNoBidFromAAXState())}function _init(a,b){var c=_validateConfig(a);_applyNoRequestToAAXState(),"success"===c&&"function"==typeof b&&b()}function _targetingKeys(){var a=arguments.length<=0||void 0===arguments[0]?"display":arguments[0];switch(a){case"display":return DISPLAY_TARGETING_KEYS;case"video":return VIDEO_TARGETING_KEYS;default:return"unknown targeting type "+a}}function _fetchDebugHTML(){var a=new XMLHttpRequest,b="GET",c=DEBUG_APP_HTML;a.open(b,c,!0),a.onreadystatechange=function(){a.readyState===XMLHttpRequest.DONE&&200===a.status&&_appendDebugIframe(a.responseText)},a.send()}function _appendDebugIframe(a){var b=document.createElement("iframe");b.frameBorder=0,b.marginHeight=0,b.marginWidth=0,b.topMargin=0,b.leftMargin=0,b.scrolling="no",b.allowTransparency=!0,b.width="100%;",b.height="200px",b.id="apstag-debug-iframe",b.srcdoc=a,b.style="background: #eaeded; z-index: 2147483647; line-height: 1; text-align: center; font-size: 12px; font-family: sans-serif; font-weight: bold; bottom: 0; position: fixed !important;",document.body.appendChild(b)}function _proxyMethod(a,b){var c=b;return b=function(){for(var b=arguments.length,d=Array(b),e=0;b>e;e++)d[e]=arguments[e];return _logEvent({method:a,args:arguments}),c.apply(void 0,arguments)}}var state,store,dispatch,DEFAULT_AAX_HOST,CSM_JS,DEBUG_APP_HTML,DEFAULT_TIMEOUT,DTB_PATH,PIXEL_PATH,LATENCY_SAMPLING_RATE,COOKIE_MATCH_DELAY,metrics,LIBRARY_VERSION="6.1.0",HAS_PERFORMANCE_SUPPORT=_safeWindowHasOwnProperty("performance"),PROTOCOL=document.location.protocol+"//",NAV_START=HAS_PERFORMANCE_SUPPORT&&"timing"in window.performance&&"navigationStart"in window.performance.timing?performance.timing.navigationStart:0,DEBUG_GLOBAL="apstagDEBUG",DEBUG_LOCAL_STORAGE_KEY="apstagDebug",DEBUG_CONSOLE_LOCAL_STORAGE_KEY="apstagDebugConsole",CFG_LOCAL_STORAGE_KEY="apstagCfg",NO_LOCAL_STORAGE_SUPPORT_MAGIC_NUNMBER_FOR_AAX=0,MINIMUM_BID_TIMEOUT=0,PAGELOAD_ID=_getRnd(),MOCKBID={amznbid:"testBid",amzniid:"testImpression",amznp:"testP",crid:"testCrid"},MEDIA_TYPES_MAGIC_STRING_FOR_AAX={video:"v"},DISPLAY_TARGETING_KEYS=["amznbid","amzniid","amznsz","amznp"],VIDEO_TARGETING_KEYS=["amznbid","amzniid","amznp","r_amznbid","r_amzniid","r_amznp"],SLOT_STATE_KEYS=["amznbid","amznp"],BID_STATES={"new":"NEW",exposed:"EXPOSED",set:"SET",rendered:"RENDERED"},FIRST_PARTY_COOKIE_KEYS={__apsid:{urlParam:"ck"},__aps_id_p:{urlParam:"ckp"}},slotStates={noRequest:"0",bidInFlight:"1",noBid:"2"},apstagConsoleEnabled="apstagConsoleEnabled",apstagConsoleDisabled="apstagConsoleDisabled",AAX_RESP_REMAP_COOKIE_KEY="cr",SELF_SERVE_PUB_SRC="600",HAS_XHR_SUPPORT=function(){var a,b=!1;return"function"==typeof XMLHttpRequest&&(a=new XMLHttpRequest,"undefined"!=typeof a.withCredentials&&(b=!0)),b}(),lsPresent=function(){return _safeWindowHasOwnProperty("localStorage")}(),debugCheck=function(){if(lsPresent){var a=window.localStorage.getItem(DEBUG_LOCAL_STORAGE_KEY);if("true"===a)return!0}return!1}(),debugConsole=function(){if(lsPresent){var a=window.localStorage.getItem(DEBUG_CONSOLE_LOCAL_STORAGE_KEY);if(a===apstagConsoleEnabled)return!0}return!1}(),reducer=function(){var a,b,c=arguments.length<=0||void 0===arguments[0]?{AAXReqs:[],DFP:{slots:[],noBidSlotIDs:[]},slotBids:{},config:{},cfg:{},cmpFired:!1,eventLog:[],sdPixels:{},viewabilityEnabled:!1}:arguments[0],d=arguments[1];switch(d.type){case"LOG_EVENT":return _extends({},c,{eventLog:[].concat(_toConsumableArray(c.eventLog),[d.event])});case"SET_CONFIG":return a=_extends({},d.config),a.isSelfServPub=!1,a.pubID&&a.pubID.length>=5&&(a.isSelfServPub=!0),_extends({},c,{config:a});case"SET_Q":return _extends({},c,{Q:d.Q});case"SET_VIEWABILITY":return _extends({},c,{viewabilityEnabled:d.viewability});case"CMP_FIRED":return _extends({},c,{cmpFired:!0});case"ENABLE_DEBUG":return _extends({},c,{debugEnabled:!0});case"DISABLE_DEBUG":return _extends({},c,{debugEnabled:!1});case"RECORD_AAX_REQUSET":return _extends({},c,{AAXReqs:[].concat(_toConsumableArray(c.AAXReqs),[d.data])});case"RECORD_AAX_RESPONSE_PROP":return _extends({},c,{AAXReqs:c.AAXReqs.map(function(a){return a.bidReqID===d.bidReqID&&(a[d.key]=d.value),a})});case"UPDATE_SLOT_BIDS":return b={},d.bids.forEach(function(a){c.slotBids.hasOwnProperty(a.slotID)?b[a.slotID]=[].concat(_toConsumableArray(c.slotBids[a.slotID]),[a]):b[a.slotID]=[a]}),_extends({},c,{slotBids:_extends({},c.slotBids,b)});case"SD_PIXEL":return _extends({},c,{sdPixels:_extends({},c.sdPixels,_defineProperty({},d.id,d.json))});case"DFP_SLOT_RENDER_ENDED_SET":return _extends({},c,{DFP:_extends({},c.DFP,{slotRenderEndedSet:!0})});case"BID_STATE_CHANGE":return _extends({},c,{slotBids:_extends({},c.slotBids,_defineProperty({},d.slotID,c.slotBids[d.slotID].map(function(a){if(a.amzniid===d.bidID){var b={bidState:d.bidState};return d.bidState===BID_STATES.rendered?b.renderTime=Date.now():d.bidState===BID_STATES.set&&(b.setAtTimes=a.hasOwnProperty("setAtTime")?[].concat(_toConsumableArray(a.setAtTimes),[Date.now()]):[Date.now()]),_extends({},a,b)}return a})))});case"STORE_IMPRESSION_DOC_REF":return _extends({},c,{slotBids:_extends({},c.slotBids,_defineProperty({},d.slotID,c.slotBids[d.slotID].map(function(a){return a.amzniid===d.bidID?_extends({},a,{doc:d.doc}):a})))});case"NO_BID_ON_DFP_SLOTS":return _extends({},c,{DFP:_extends({},c.DFP,{noBidSlotIDs:c.DFP.noBidSlotIDs.concat(d.slotIDs)})});case"REQUESTED_BID_FOR_DFP_SLOTS":return _extends({},c,{DFP:_extends({},c.DFP,{noBidSlotIDs:c.DFP.noBidSlotIDs.filter(function(a){return _inArray(d.slotIDs,a)})})});case"SET_CFG":return _extends({},c,{cfg:d.cfg});case"SHOULD_SAMPLE_LATENCY":return _extends({},c,{shouldSampleLatency:_shouldSample(LATENCY_SAMPLING_RATE)});default:return c}},reduxDebuggerPresent=debugCheck&&_safeWindowHasOwnProperty("__REDUX_DEVTOOLS_EXTENSION__")?!0:null;reduxDebuggerPresent&&(store=window.__REDUX_DEVTOOLS_EXTENSION__(reducer),store.subscribe(function(){state=store.getState()})),dispatch=function(a){reduxDebuggerPresent?store.dispatch(a):state=reducer(state,a)},dispatch({type:"NOOP"}),function(){var a,b;lsPresent&&(a=localStorage.getItem(CFG_LOCAL_STORAGE_KEY),a&&"undefined"!==a&&(b=JSON.parse(a),dispatch({type:"SET_CFG",cfg:b})))}(),DEFAULT_AAX_HOST=state.cfg.DEFAULT_AAX_HOST||"aax.amazon-adsystem.com",CSM_JS=state.cfg.CSM_JS||"//c.amazon-adsystem.com/aax2/csm.js.gz",DEBUG_APP_HTML=state.cfg.DEBUG_APP_HTML||"//c.amazon-adsystem.com/aax2/debugApp.html",DEFAULT_TIMEOUT=state.cfg.DEFAULT_TIMEOUT||2e3,DTB_PATH=state.cfg.DTB_PATH||"/e/dtb",PIXEL_PATH=state.cfg.PIXEL_PATH||"/x/px/",LATENCY_SAMPLING_RATE=state.cfg.LATENCY_SAMPLING_RATE||1,COOKIE_MATCH_DELAY=state.cfg.COOKIE_MATCH_DELAY||0,metrics=function(){var a={},b=Date.now(),c=0,d=function(){var a,b=decodeURIComponent(_getReferrerURL());return a=b.indexOf("://")>-1?b.split("/")[2]:b.split("/")[0],a=a.split(":")[0]},e=function(c,d){d||(d=Date.now()),a[c]=d-b},f=function(b,c){a[b]=c},g=function(e,f){e||(e=5e3),f||(f="PH"),f+="/",setTimeout(function(){a.i=c,a.t0=b,a.site=d();var e=_pixelBaseURL()+f+_objToURLParam(a);_pixel(e),a={},b=Date.now(),c++},e)};return{addTimer:e,set:f,schedule:g}}(),metrics.addTimer("tlt");try{Object.prototype.hasOwnProperty.call(window,"apstag")&&Object.prototype.hasOwnProperty.call(window.apstag,"_Q")&&window.apstag._Q.length>0&&dispatch({type:"SET_Q",Q:window.apstag._Q})}catch(e){}window.apstag=function(){var a={punt:_punt,init:_init,debug:_debug,targetingKeys:_targetingKeys,fetchBids:_fetchBids,setDisplayBids:_setDisplayBids,renderImp:_renderImp,bids:_bids};return debugConsole&&(Object.keys(a).forEach(function(b){a[b]=_proxyMethod(b,a[b])}),_fetchDebugHTML()),a}(),function(){dispatch({type:"SHOULD_SAMPLE_LATENCY"}),state.shouldSampleLatency&&_sendInitLatencyPixel(),_QHandler()}()}()}();