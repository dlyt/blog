
var dxlHost = window.location.hostname.split(".").reverse();

//dxlAnalytics
if(!$dxl.cookie("_da")){
	$dxl.cookie("_da",'DA.' + Math.round(Math.random()*2147483647)+ '.' + new Date().getTime(),{expires:365,domain:"daoxila.com",path:"/"});
}

window.dxlDaPar = {
	"action_type":"in_page",//普通浏览
	"order_url":"",//虚拟页面url
	"in_time":new Date().getTime(),
	"url_referrer":document.referrer,
	"url":window.location.href,
	"pid":$dxl.cookie("_da") + window.location.href + new Date().getTime() + Math.random(),
	"keyword":"",
	"gid":$dxl.cookie("_da"),
	"search":$dxl.cookie("utm_source") || $dxl.isUrlPar("utm_source"),
	"bType":getBrowser().split("-")[1],
	"bVersion":"",
	"bJava":"",
	"bFlash":"",
	"bOS":getBrowser().split("-")[0],
	"bScr":$(window).width() + "x" + $(window).height(),
	"bColor":"",
	"bLang":navigator.language,
	"bDevice":"",
	"cid":$dxl.isUrlPar("cid","?" + window.location.href.split("#")[1]),
	"v":Math.random()
}

window.dxlDaAction = function(){
	$.getJSON('//da.daoxila.com/dxl_analytics_2.php?' + $.param(dxlDaPar) + "&callback=?");
}

// 搜索引擎来源记录cookie 2015/8/26
function searchEngineCookieSet() {
    // 声明变量
    var referrer = document.referrer,
        utm_source =$dxl.isUrlPar("utm_source"),
    // 初始化obj对象
        obj = {
            'utm_source': '',
            'utm_medium': '',
            'utm_campaign': '',
            'utm_term': '',
            'utm_content': '',
            'a_i': ''
        },
        options30 = {
            expires: 30,
            path: '/',
            domain: 'daoxila.com'
        },
        value;

    // 有referrer 且
    // 来源链接非到喜啦网站内部
    if(referrer && notFromDxl()) {
        setCookieFromReferrer();
    }

    // url含有utm_source查询参数
    if($.trim(utm_source) != "") {
        setCookieFromUrl();
    }

    // 判断referrer中是否存在daoxila.com
    // 2015/08/12
    function notFromDxl() {
        var _a, _hostname;
        _a = document.createElement('a');
        _a.href = referrer;
        _hostname = _a.hostname;
        return _hostname.indexOf('daoxila.com') === -1 ? true : false;
    }

    // seo 自然流量
    // 从referrer读取关键字
    // 如果url中没有utm_source，则设置_seo后缀，有不设置
    function setCookieFromReferrer() {
        var a, search, hostname, hostnameArray, keyReg, keyArray, searchHasQuestion, hostnameReg, isFrom6SearchEngine;
        a = document.createElement('a');
        a.href = referrer;
        hostname = a.hostname;
        searchHasQuestion = a.search;
        hostnameReg = /(baidu|so|sogou|google|bing|sm)/;
        keyReg = /(?:^|&)(wd|q|query|keyword|word)=([^&]*)(?:&|$)/;
        isFrom6SearchEngine = hostnameReg.test( hostname );
        hostnameArray = hostname.match( hostnameReg );

        // 如果来自6个搜索引擎
        if( isFrom6SearchEngine ) {

            // 如果 referrer 有查询参数
            if( search = searchHasQuestion.slice(1) ) {
                // 如果匹配到keyReg关键词的key，则设置utm_term
                if( keyArray = search.match( keyReg ) ) {
                    obj.utm_term = decodeURIComponent( keyArray[2] );
                }
            }

            obj.utm_medium = (dxlHost[dxlHost.length - 1] === 'm' ? 'wap' : 'pc') + "_" + decodeURIComponent(hostnameArray[1]) + "_seo";

        } else {
            // 来自其他seo数据
            obj.utm_term = hostname;
            obj.utm_medium = (dxlHost[dxlHost.length - 1] === 'm' ? 'wap' : 'pc') + "_referral";
        }

        obj.utm_source = "seo";

        // 设置cookie
        for (var key in obj) {
            if(value = obj[key] || "", obj.hasOwnProperty(key)) {
                $dxl.cookie(key, value, options30);
            }
        }
    }

    // 通过url来设置cookie
    function setCookieFromUrl() {
        // 从url中读取参数
        obj.utm_source = decodeURIComponent( $dxl.isUrlPar( 'utm_source' ) );
        obj.utm_medium = decodeURIComponent( $dxl.isUrlPar( 'utm_medium' ) );
        obj.utm_campaign = decodeURIComponent( $dxl.isUrlPar( 'utm_campaign' ) );
        obj.utm_term = decodeURIComponent( $dxl.isUrlPar( 'utm_term' ) );
        obj.utm_content = decodeURIComponent( $dxl.isUrlPar( 'utm_content' ) );
        obj.a_i = decodeURIComponent( $dxl.isUrlPar( 'a_i' ) );

        // 设置cookie
        for (var key in obj) {
            if(value = obj[key] || "", obj.hasOwnProperty(key)) {
                $dxl.cookie(key, value, options30);
            }
        }
    }

}

// 页面body写入cookie
function bodyCookieSet() {
	var bodyDcJson = $("body").attr('dc'),bodyDcObj;
	if(bodyDcJson && (bodyDcObj = $.parseJSON(bodyDcJson))) {
		for(var key in bodyDcObj) {
			if (bodyDcObj.hasOwnProperty(key)) {
				$dxl.cookie(key, bodyDcObj[key], {
					expires: 365,
					path: '/',
					domain: 'daoxila.com'
				});
			}
		}
	}
}


function getBrowser(){
	var u = window.navigator.userAgent.toLocaleLowerCase();
	var p = ""
	var b = "other";
	if(u.indexOf("windows") > 0){
		p = "windows";
		if(u.indexOf("msie") > 0){b = "msie";}
		else if(u.indexOf("firefox") > 0){b = "firefox";}
		else if(u.indexOf("chrome") > 0){b = "chrome";}
		else if(u.indexOf("opr") > 0){b = "opera";}
	}else if(u.indexOf("android") > 0){
		p = "android";
		if(u.indexOf("uc") > 0){b = "uc";}
		else{b="android"}
	}else if(u.indexOf("iphone") > 0){
		p = "iphone";
		b = "safari";
	}else if(u.indexOf("ipad") > 0){
		p = "ipad";
		b = "safari";
	}else if(u.indexOf("macintosh") > 0){
		p = "macintosh";
		if(u.indexOf("chrome") > 0){b = "chrome";}
		else if(u.indexOf("safari") > 0){b = "safari";}
	}
	return p + "-" + b;
}

$(document).ready(function(){
	searchEngineCookieSet();
	bodyCookieSet();
	dxlDaAction();

	//dxlEvent
	$("body").on("click","[dxlEvent]",function(){
		dxlDaPar.action_type = "in_page_custom";//点击事件
		dxlDaPar.dxlEvent = $(this).attr("dxlEvent");
		dxlDaAction();
	});
	
});


//UA
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//s4.dxlfile.com/public/statistics/analytics.js','ga');

ga('create', 'UA-17330707-1', 'daoxila.com');
ga('send', 'pageview');


//Baidu
if(dxlHost[2] == "m" || (dxlHost[2] == "event" && window.location.href.indexOf("M-") != -1)){
	var _hmt = _hmt || [];
	(function() {var hm = document.createElement("script");hm.src = "//hm.baidu.com/hm.js?38d51f55f078dc3453ad8bbee56abcb4";var s = document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm, s);})();
}else{
	var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
	document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F1d2519efe52fbcddc471e1b2ee80eb9e' type='text/javascript'%3E%3C/script%3E"));
}