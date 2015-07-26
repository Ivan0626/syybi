//setCookie
function setCookie(name, value, days, path, domain, secure) {
	var sCookie = name + "=" + encodeURIComponent(value);
	if (days) {
		var _exp = new Date();
		_exp.setTime(_exp.getTime() + days * 24 * 60 * 60 * 1000);
		sCookie += "; expires=" + _exp.toGMTString();
	}
	if (path) {
		sCookie += "; path=" + path;
	} else {
		sCookie += "; path=/";
	}
	if (domain) {
		sCookie += "; domain=" + domain;
	}
	if (secure) {
		sCookie += "; secure=";
	}
	document.cookie = sCookie;
}

// getCookie
function getCookie(name) {
	var sRE = "(?:; )?" + name + "=([^;]*);?";
	var oRE = new RegExp(sRE);
	return (oRE.test(document.cookie)) ? decodeURIComponent(RegExp["$1"])
			: null;
}

// delCookie
function delCookie(name, path) {
	setCookie(name, "", -1, path);
}

// CookieRecord
var oCookieRecord = new Object();
// setCookieRecord
oCookieRecord.set = function(oParam) {
	// 配置参数
	var sTitleFilter = oParam.sTitleFilter,
	// title内容后缀筛选
	sRecordListId = oParam.sRecordListId,
	// 浏览记录id
	sRecordListTagName = oParam.sRecordListTagName,
	// 浏览记录标签名
	nRecordListLength = oParam.nRecordListLength,
	// 浏览记录限制条数
	nExpires = oParam.nExpires,
	// cookie保留天数
	sCookiePath = oParam.sCookiePath,
	// 限制cookie访问路径
	sDomain = oParam.sDomain,
	// 限制cookie域
	bSecure = oParam.bSecure; // 限制cookie是否为安全网站访问
	// 参数默认值设置

	if (!sCookiePath) {
		sCookiePath = "/";
	}

	// setCookie record
	var path = window.location.pathname.split("/");
	var pathN = path[path.length - 1].split(".")[0];

	// 筛选带逗号的同一篇文章
	if (pathN.indexOf(",") > -1) {
		pathN = pathN.slice(0, pathN.indexOf(","));
	}
	var articleTitle = document.title;

	// title后缀筛选
	if (sTitleFilter && sTitleFilter != "") {
		var tIndex = articleTitle.indexOf(sTitleFilter);
		if (tIndex > -1) {
			var tLen = sTitleFilter.length;
			var aLen = articleTitle.length;
			articleTitle = articleTitle.slice(0, tIndex)
					+ articleTitle.slice(tIndex + tLen, aLen);
		}
	}
	var sValue = location.href + "^_^" + articleTitle;
	setCookie(pathN, sValue, nExpires, sCookiePath, sDomain, bSecure);

	// getRecordList
	var oCookieList = decodeURIComponent(document.cookie).split(";");
	var cookieList = [];
	var oFragment = document.createDocumentFragment();

	// 筛选其他地方创建的cookie
	for (var i = 0, len = oCookieList.length; i < len; i++) {
		if (oCookieList[i] && oCookieList[i].split("=")[1].indexOf("^_^") > -1) {
			cookieList.unshift(oCookieList.slice(i, i + 1).toString());
		}
	}

	// cookie数超出删除
	var len = cookieList.length;
	if (len > nRecordListLength) {
		for (var i = len - 1; i > nRecordListLength - 1; i--) {
			delCookie(cookieList[i].split("=")[0], sCookiePath);
			cookieList.pop();
		}
	}

	// 浏览记录填充
	for (var i = 0; i < cookieList.length; i++) {
		// creat tag
		var aCookie = cookieList[i].split("=")[1].split("^_^");
		var aCookieLen = aCookie.length;
		var aLink = aCookie[0];
		var aTitle = "";

		// 筛选符号^_^
		if (aCookieLen > 2) {
			for (var j = 1; j < aCookieLen; j++) {
				if (j < aCookieLen - 1) {
					aTitle += aCookie[j] + "^_^";
				} else {
					aTitle += aCookie[j];
				}
			}
		} else {
			aTitle = aCookie[1];
		}

		//
		var aListTag = document.createElement(sRecordListTagName);
		var a = document.createElement("a");
		var aText = document.createTextNode(aTitle);

		// append tag
		a.setAttribute("href", aLink);
		a.setAttribute("target", "_blank");
		a.appendChild(aText);
		aListTag.appendChild(a);
		oFragment.appendChild(aListTag);
	}
	document.getElementById(sRecordListId).innerHTML = "";
	document.getElementById(sRecordListId).appendChild(oFragment);
}

// delCookieRecord
oCookieRecord.del = function(sRecordListId) {
	if (document.cookie != "") {
		// 清空cookie
		var cookieList = decodeURIComponent(document.cookie).split(";");
		for (var i = 0, len = cookieList.length; i < len; i++) {
			if (cookieList[i].split("=")[1].indexOf("^_^") > -1) {
				delCookie(cookieList[i].split("=")[0]);
			}
		}
	}

	// 清空记录
	document.getElementById(sRecordListId).innerHTML = "";
}