
/*
 * My97 DatePicker 4.2
 * SITE: http://dp.my97.net
 * BLOG: http://my97.cnblogs.com
 * MAIL: smallcarrot@163.com
 */
var $c;
if ($FF) {
	Event.prototype.__defineSetter__("returnValue", function ($) {
		if (!$) {
			this.preventDefault();
		}
		return $;
	});
	Event.prototype.__defineGetter__("srcElement", function () {
		var $ = this.target;
		while ($.nodeType != 1) {
			$ = $.parentNode;
		}
		return $;
	});
	HTMLElement.prototype.attachEvent = function ($, _) {
		var A = $.replace(/on/, "");
		_._ieEmuEventHandler = function ($) {
			window.event = $;
			return _();
		};
		this.addEventListener(A, _._ieEmuEventHandler, false);
	};
}
function My97DP() {
	$c = this;
	$dp.$w = window;
	$dt = this.date = new DPDate();
	this.QS = [];
	$d = document.createElement("div");
	$d.className = "WdateDiv";
	$d.onmousedown = hideSel;
	$d.innerHTML = "<div id=dpTitle><div style=\"float:left\" class=\"navImg NavImgll\"></div><div style=\"float:left\" class=\"navImg NavImgl\"></div><div style=\"float:left\"><div class=\"menuSel MMenu\" style=\"z-index:1\"></div><input class=yminput tabindex=1></div><div style=\"float:left\"><div class=\"menuSel YMenu\" style=\"z-index:1\"></div><input class=yminput tabindex=2></div><div style=\"float:right\" class=\"navImg NavImgrr\"></div><div style=\"float:right\" class=\"navImg NavImgr\"></div></div><div style=\"position:absolute;overflow:hidden\"></div><div></div><div id=dpTime><div class=\"menuSel hhMenu\" style=\"z-index:1\"></div><div class=\"menuSel mmMenu\" style=\"z-index:1\"></div><div class=\"menuSel ssMenu\" style=\"z-index:1\"></div><table cellspacing=0 cellpadding=0 border=0><tr><td rowspan=2><span id=dpTimeStr></span>&nbsp;<input class=tB maxlength=2 tabindex=3><input value=\":\" class=tm readonly><input class=tE maxlength=2 tabindex=4><input value=\":\" class=tm readonly><input class=tE maxlength=2 tabindex=5></td><td><button id=dpTimeUp></button></td></tr><tr><td><button id=dpTimeDown></button></td></tr></table></div><div id=dpQS></div><div id=dpControl><input class=dpButton id=dpClearInput type=button tabindex=6> <input class=dpButton id=dpTodayInput type=button tabindex=7> <input class=dpButton id=dpOkInput type=button tabindex=8></div>";
	attachTabEvent($d, function () {
		hideSel();
	});
	_();
	this.init();
	$();
	$d.MI.attachEvent("onkeydown", A);
	$d.yI.attachEvent("onkeydown", A);
	$d.MI.onfocus = function ($) {
		this.className = "yminputfocus";
		this.value = getA(this, "realValue");
		this.select();
		$c._fM();
		showB($d.MD);
	};
	$d.MI.onblur = function () {
		var $;
		if ($lastInput == this) {
			$dt.M = pIntDef(this.value, $dt.M);
			$ = true;
		}
		c_M($dt.M, $);
		this.className = "yminput";
		hide($d.MD);
	};
	$d.yI.onfocus = function () {
		this.className = "yminputfocus";
		this.select();
		$c._fy();
		showB($d.yD);
	};
	$d.yI.onblur = function () {
		var $;
		if ($lastInput == this) {
			$dt.y = pIntDef(this.value, $dt.y);
			$ = true;
		}
		c_y($dt.y, $);
		this.className = "yminput";
		hide($d.yD);
	};
	$d.HI.onfocus = function () {
		$c.currFocus = this;
		this.select();
		$c._fH();
		showB($d.HD);
	};
	$d.HI.onblur = function () {
		var $;
		if ($lastInput == this) {
			$dt.H = pIntDef(this.value, $dt.H);
			$ = true;
		}
		c_H($dt.H, $);
		hide($d.HD);
	};
	$d.mI.onfocus = function () {
		$c.currFocus = this;
		this.select();
		$c._fm();
		showB($d.mD);
	};
	$d.mI.onblur = function () {
		var $;
		if ($lastInput == this) {
			$dt.m = pIntDef(this.value, $dt.m);
			$ = true;
		}
		c_m($dt.m, $);
		hide($d.mD);
	};
	$d.sI.onfocus = function () {
		$c.currFocus = this;
		this.select();
		$c._fs();
		showB($d.sD);
	};
	$d.sI.onblur = function () {
		var $;
		if ($lastInput == this) {
			$dt.s = pIntDef(this.value, $dt.s);
			$ = true;
		}
		c_s($dt.s, $);
		hide($d.sD);
	};
	$d.HI.attachEvent("onkeydown", A);
	$d.mI.attachEvent("onkeydown", A);
	$d.sI.attachEvent("onkeydown", A);
	$d.upButton.onclick = function () {
		updownEvent(1);
	};
	$d.downButton.onmousedown = function () {
		updownEvent(-1);
	};
	$d.qsDiv.onclick = function () {
		if ($d.qsDivSel.style.display != "block") {
			$c._fillQS();
			showB($d.qsDivSel);
		} else {
			hide($d.qsDivSel);
		}
	};
	attachTabEvent($d.okI, function () {
		$d.MI.focus();
		event.returnValue = false;
	});
	document.body.appendChild($d);
	function _() {
		var A = $d.getElementsByTagName("div"), $ = $d.getElementsByTagName("input"), B = $d.getElementsByTagName("button"), _ = $d.getElementsByTagName("span");
		$d.navLeftImg = A[1];
		$d.leftImg = A[2];
		$d.rightImg = A[8];
		$d.navRightImg = A[7];
		$d.MI = $[0];
		$d.yI = $[1];
		$d.titleDiv = A[0];
		$d.MD = A[4];
		$d.yD = A[6];
		$d.qsDivSel = A[9];
		$d.dDiv = A[10];
		$d.tDiv = A[11];
		$d.HD = A[12];
		$d.mD = A[13];
		$d.sD = A[14];
		$d.qsDiv = A[15];
		$d.bDiv = A[16];
		$d.HI = $[2];
		$d.mI = $[4];
		$d.sI = $[6];
		$d.clearI = $[7];
		$d.todayI = $[8];
		$d.okI = $[9];
		$d.upButton = B[0];
		$d.downButton = B[1];
		$d.timeSpan = _[0];
	}
	function $() {
		$d.navLeftImg.onclick = function () {
			$ny = $ny <= 0 ? $ny - 1 : -1;
			if ($ny % 5 == 0) {
				$d.yI.focus();
			}
			c_y($dt.y - 1);
		};
		$d.leftImg.onclick = function () {
			var $ = $dt.M;
			if ($ > 1) {
				$ -= 1;
			} else {
				$ = 12;
				$dt.y -= 1;
			}
			s_y($dt.y);
			c_M($);
		};
		$d.rightImg.onclick = function () {
			var $ = $dt.M;
			if ($ < 12) {
				$ += 1;
			} else {
				$ = 1;
				$dt.y += 1;
			}
			s_y($dt.y);
			c_M($);
		};
		$d.navRightImg.onclick = function () {
			$ny = $ny >= 0 ? $ny + 1 : 1;
			if ($ny % 5 == 0) {
				$d.yI.focus();
			}
			c_y($dt.y + 1);
		};
	}
	function A() {
		var $ = event, _ = ($.which == undefined) ? $.keyCode : $.which;
		if (!$OPERA && !((_ >= 48 && _ <= 57) || (_ >= 96 && _ <= 105) || _ == 8 || _ == 46 || _ == 37 || _ == 39 || _ == 9)) {
			$.returnValue = false;
		}
		$lastInput = $.srcElement;
	}
}
My97DP.prototype = {init:function () {
	$ny = 0;
	$dp.cal = this;
	if ($dp.readOnly && $dp.el.readOnly != null) {
		$dp.el.readOnly = true;
		$dp.el.blur();
	}
	$();
	this.dateFmt = $dp.dateFmt;
	this._dealFmt();
	this.autoPickDate = $dp.autoPickDate || (($dp.has.st) ? false : true);
	$tdt = this.tdate = new DPDate();
	this.ddateRe = this._initRe("disabledDates");
	this.ddayRe = this._initRe("disabledDays");
	this.loadDate();
	this.minDate = this.doCustomDate($dp.minDate, $dp.minDate != $dp.defMinDate ? $dp.realFmt : $dp.realFullFmt, $dp.defMinDate);
	this.maxDate = this.doCustomDate($dp.maxDate, $dp.maxDate != $dp.defMaxDate ? $dp.realFmt : $dp.realFullFmt, $dp.defMaxDate);
	if (this.minDate.compareWith(this.maxDate) > 0) {
		$dp.errMsg = $lang.err_1;
	}
	this._makeDateInRange();
	$sdt = this.sdate = new DPDate($dt.y, $dt.M, $dt.d, $dt.H, $dt.m, $dt.s);
	if (!$dp.alwaysUseStartDate && $dp.el[$dp.elProp] != "") {
		this.update();
	}
	this.oldValue = $dp.el[$dp.elProp];
	setA($d.MI, "realValue", $dt.M);
	$d.MI.value = $lang.aMonStr[$dt.M - 1];
	$d.yI.value = $dt.y;
	$d.HI.value = $dt.H;
	$d.mI.value = $dt.m;
	$d.sI.value = $dt.s;
	$d.timeSpan.innerHTML = $lang.timeStr;
	$d.clearI.value = $lang.clearStr;
	$d.todayI.value = $lang.todayStr;
	$d.okI.value = $lang.okStr;
	this.initShowAndHide();
	this.initBtn();
	if ($dp.errMsg) {
		alert($dp.errMsg);
	}
	this.redraw();
	hideSel();
	if ($dp.el.nodeType == 1) {
		$dp.attachEvent($dp.el, "onkeydown", function ($) {
			if ($dp.dd.style.display != "none") {
				k = ($.which == undefined) ? $.keyCode : $.which;
				if (k == 9) {
					if ($dp.el[$dp.elProp] != "") {
						$c.update();
					}
					hide($dp.dd);
				}
			}
		});
	}
	function $() {
		var _, $;
		for (_ = 0; ($ = document.getElementsByTagName("link")[_]); _++) {
			if (getA($, "rel").indexOf("style") != -1 && getA($, "title")) {
				$.disabled = true;
				if (getA($, "title") == $dp.skin) {
					$.disabled = false;
				}
			}
		}
	}
}, splitDate:function (J, C, O, E, B, G, F, K, L) {
	var $;
	if (J && J.loadDate) {
		$ = J;
	} else {
		$ = new DPDate();
		C = C || $dp.dateFmt;
		var H, N = 0, A = /yyyy|yyy|yy|y|MM|M|dd|d|HH|H|mm|m|ss|s/g, M = J.split(/\W+/), _ = C.match(A);
		A.lastIndex = 0;
		if (!L && M.length != _.length) {
			var D = 0, K = "^";
			while ((M = A.exec(C)) !== null) {
				D = M.index - D;
				K += (D == 0) ? "" : (".{" + D + "}");
				D = A.lastIndex;
				switch (M[0]) {
				  case "yyyy":
					K += "(\\d{4})";
					break;
				  case "yyy":
					K += "(\\d{3})";
					break;
				  default:
					K += "(\\d\\d?)";
					break;
				}
			}
			K += ".*$";
			M = new RegExp(K).exec(J);
			N = 1;
		}
		if (M) {
			for (H = 0; H < _.length; H++) {
				var I = M[H + N];
				if (I) {
					switch (_[H]) {
					  case "y":
					  case "yy":
						I = pIntDef(I, 0);
						if (I < 50) {
							I += 2000;
						} else {
							I += 1900;
						}
						$.y = I;
						break;
					  case "yyy":
						$.y = pIntDef(I, 0) + $dp.yearOffset;
						break;
					  default:
						$[_[H].slice(-1)] = I;
						break;
					}
				}
			}
		}
	}
	$.coverDate(O, E, B, G, F, K);
	return $;
}, _initRe:function (_) {
	var B, $ = $dp[_], A = "(?:";
	if ($) {
		for (B = 0; B < $.length; B++) {
			A += this.doExp($[B]);
			if (B != $.length - 1) {
				A += "|";
			}
		}
		A = new RegExp(A + ")");
	} else {
		A = null;
	}
	return A;
}, update:function () {
	$dp.el[$dp.elProp] = this.getDateStr();
	this.setRealValue();
}, setRealValue:function ($) {
	var _ = $dp.$($dp.vel), $ = rtn($, this.getDateStr($dp.realFmt));
	if (_) {
		_.value = $;
	}
	setA($dp.el, "realValue", $);
}, doExp:function (s) {
	var ps = "yMdHms", arr, tmpEval, re = /#\{(.*?)\}/;
	s = s + "";
	for (var i = 0; i < ps.length; i++) {
		s = s.replace("%" + ps.charAt(i), this.getP(ps.charAt(i), null, $tdt));
	}
	if (s.substring(0, 3) == "#F{") {
		s = s.substring(3, s.length - 1);
		if (s.indexOf("return ") < 0) {
			s = "return " + s;
		}
		s = $dp.win.eval("new Function(\"" + s + "\");");
		s = s();
	} else {
		while ((arr = re.exec(s)) != null) {
			arr.lastIndex = arr.index + arr[1].length + 2;
			tmpEval = pInt(eval(arr[1]));
			if (tmpEval < 0) {
				tmpEval = "9700" + (-tmpEval);
			}
			s = s.substring(0, arr.index) + tmpEval + s.substring(arr.lastIndex + 1);
		}
	}
	return s;
}, doCustomDate:function (A, B, _) {
	var $;
	A = this.doExp(A);
	if (!A || A == "") {
		A = _;
	}
	if (typeof A == "object") {
		$ = A;
	} else {
		$ = this.splitDate(A, B, null, null, 1, 0, 0, 0, true);
		$.y = ("" + $.y).replace(/^9700/, "-");
		$.M = ("" + $.M).replace(/^9700/, "-");
		$.d = ("" + $.d).replace(/^9700/, "-");
		$.H = ("" + $.H).replace(/^9700/, "-");
		$.m = ("" + $.m).replace(/^9700/, "-");
		$.s = ("" + $.s).replace(/^9700/, "-");
		if (A.indexOf("%ld") >= 0) {
			A = A.replace(/%ld/g, "0");
			$.d = 0;
			$.M = pInt($.M) + 1;
		}
		$.refresh();
	}
	return $;
}, loadDate:function () {
	var _, $;
	if ($dp.alwaysUseStartDate || ($dp.startDate != "" && $dp.el[$dp.elProp] == "")) {
		_ = this.doExp($dp.startDate);
		$ = $dp.realFmt;
	} else {
		_ = $dp.el[$dp.elProp];
		$ = this.dateFmt;
	}
	$dt.loadFromDate(this.splitDate(_, $));
	if ($dp.has.sd && !this.isDate($dt)) {
		$dt.y = $tdt.y;
		$dt.M = $tdt.M;
		$dt.d = $tdt.d;
	}
	if ($dp.has.st && !this.isTime($dt)) {
		$dt.H = $tdt.H;
		$dt.m = $tdt.m;
		$dt.s = $tdt.s;
	}
}, isDate:function ($) {
	if ($.y != null) {
		$ = doStr($.y, 4) + "-" + $.M + "-" + $.d;
	}
	return $.match(/^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s(((0?[0-9])|([1-2][0-3]))\:([0-5]?[0-9])((\s)|(\:([0-5]?[0-9])))))?$/);
}, isTime:function ($) {
	if ($.H != null) {
		$ = $.H + ":" + $.m + ":" + $.s;
	}
	return $.match(/^([0-9]|([0-1][0-9])|([2][0-3])):([0-9]|([0-5][0-9])):([0-9]|([0-5][0-9]))$/);
}, _makeDateInRange:function () {
	var _ = this.checkRange(), A = true;
	if (_ != 0) {
		A = false;
		var $;
		if (_ > 0) {
			$ = this.maxDate;
		} else {
			$ = this.minDate;
		}
		if ($dp.has.sd) {
			$dt.y = $.y;
			$dt.M = $.M;
			$dt.d = $.d;
		}
		if ($dp.has.st) {
			$dt.H = $.H;
			$dt.m = $.m;
			$dt.s = $.s;
		}
	}
	return A;
}, checkRange:function (A, $) {
	$ = $ || $dt;
	var _ = $.compareWith(this.minDate, A);
	if (_ > 0) {
		_ = $.compareWith(this.maxDate, A);
		if (_ < 0) {
			_ = 0;
		}
	}
	return _;
}, checkValid:function ($, A, B) {
	A = A || $dp.has.minUnit;
	var _ = this.checkRange(A, $);
	if (_ == 0) {
		if (A == "d" && B == null) {
			B = new Date($.y, $.M - 1, $.d).getDay();
		}
		_ = !this.testDay(B) && !this.testDate($);
	} else {
		_ = false;
	}
	return _;
}, _fd:function () {
	var F, D, E, L, H = new sb(), G, A, I, C, K = "", $ = "", _ = new DPDate($dt.y, $dt.M, $dt.d, 0, 0, 0), J = _.y, B = _.M;
	G = new Date(J, B - 1, 1).getDay();
	A = 1 - G;
	I = new Date(J, B, 0).getDay();
	C = new Date(J, B, 0).getDate();
	H.a("<table class=WdayTable width=100% border=0 cellspacing=0 cellpadding=0>");
	H.a("<tr class=MTitle align=center>");
	F = $dp.isShowWeek ? 0 : 1;
	while (F < 8) {
		H.a("<td>" + $lang.aWeekStr[F++] + "</td>");
	}
	H.a("</tr>");
	for (F = 1, D = A; F < 7; F++) {
		H.a("<tr>");
		for (E = 0; E < 7; E++) {
			_.loadDate(J, B, D++);
			_.refresh();
			if (_.M == B) {
				L = true;
				if (_.compareWith($sdt, "d") == 0) {
					K = "Wselday";
				} else {
					if (_.compareWith($tdt, "d") == 0) {
						K = "Wtoday";
					} else {
						K = (($dp.highLineWeekDay && (E == 0 || E == 6)) ? "Wwday" : "Wday");
					}
				}
				$ = (($dp.highLineWeekDay && (E == 0 || E == 6)) ? "WwdayOn" : "WdayOn");
			} else {
				if ($dp.isShowOthers) {
					L = true;
					K = "WotherDay";
					$ = "WotherDayOn";
				} else {
					L = false;
				}
			}
			if ($dp.isShowWeek && E == 0 && (F < 4 || L)) {
				H.a("<td class=Wweek>" + getWeek(_) + "</td>");
			}
			H.a("<td align=center ");
			if (L) {
				if (this.checkValid(_, "d", E)) {
					H.a("onclick=\"day_Click(" + _.y + "," + _.M + "," + _.d + ");\" ");
					H.a("onmouseover=\"this.className='" + $ + "'\" ");
					H.a("onmouseout=\"this.className='" + K + "'\" ");
				} else {
					K = "WinvalidDay";
				}
				H.a("class=" + K);
				H.a(">" + _.d + "</td>");
			} else {
				H.a("></td>");
			}
		}
		H.a("</tr>");
	}
	H.a("</table>");
	return H.j();
}, testDate:function (_) {
	var $ = this.ddateRe && this.ddateRe.test(this.getDateStr($dp.realFmt, _));
	if ($dp.disabledDates && $dp.opposite) {
		$ = !$;
	}
	return $;
}, testDay:function (_) {
	var $ = this.ddayRe && this.ddayRe.test(_);
	if ($dp.disabledDays && $dp.opposite) {
		$ = !$;
	}
	return $;
}, _f:function (p, c, r, e) {
	var s = new sb();
	bak = $dt[p];
	s.a("<table cellspacing=0 cellpadding=3 border=0");
	for (var i = 0; i < r; i++) {
		s.a("<tr nowrap=\"nowrap\">");
		for (var j = 0; j < c; j++) {
			s.a("<td align=right ");
			$dt[p] = eval(e);
			if (this.checkValid($dt, p)) {
				s.a("class='menu' onmouseover=\"this.className='menuOn'\" onmouseout=\"this.className='menu'\" onmousedown=\"");
				s.a("hide($d." + p + "D);c_" + p + "(" + $dt[p] + ");$d." + p + "I.blur()\"");
			} else {
				s.a("class='invalidMenu'");
			}
			s.a(">" + (p == "M" ? $lang.aMonStr[$dt[p] - 1] : $dt[p]) + "</td>");
		}
		s.a("</tr>");
	}
	s.a("</table>");
	$dt[p] = bak;
	return s.j();
}, _fM:function () {
	$d.MD.innerHTML = this._f("M", 2, 6, "i+j*6+1");
}, _fy:function (_) {
	var B, A = $dt.y, $ = new sb();
	_ = rtn(_, A - 5);
	$.a(this._f("y", 2, 5, _ + "+i+j*5"));
	$.a("<table cellspacing=0 cellpadding=3 border=0 align=center><tr><td ");
	$.a(this.minDate.y < _ ? "class='menu' onmouseover=\"this.className='menuOn'\" onmouseout=\"this.className='menu'\" onmousedown='if(event.preventDefault)event.preventDefault();event.cancelBubble=true;$c._fy(" + (_ - 10) + ")';" : "class='invalidMenu'");
	$.a(">\u2190</td><td align=center class='menu' onmouseover=\"this.className='menuOn'\" onmouseout=\"this.className='menu'\" onmousedown=\"hide($d.yD);$d.yI.blur();\">\xd7</td><td align=right ");
	$.a(this.maxDate.y > _ + 10 ? "class='menu' onmouseover=\"this.className='menuOn'\" onmouseout=\"this.className='menu'\" onmousedown='if(event.preventDefault)event.preventDefault();event.cancelBubble=true;$c._fy(" + (_ + 10) + ")';" : "class='invalidMenu'");
	$.a(">\u2192</td></tr></table>");
	$d.yD.innerHTML = $.j();
}, _fHMS:function (A, _, $) {
	$d[A + "D"].innerHTML = this._f(A, 6, _, $);
}, _fH:function () {
	this._fHMS("H", 4, "i * 6 + j");
}, _fm:function () {
	this._fHMS("m", 2, "i * 30 + j * 5");
}, _fs:function () {
	this._fHMS("s", 1, "j * 10");
}, _fillQS:function (A) {
	this.initQS();
	var _ = $d.qsDivSel, C = _.style, $ = new sb();
	$.a("<table class=WdayTable width=\"" + $d.dDiv.offsetWidth + "px\" height=\"" + $d.dDiv.offsetHeight + "px\" border=0 cellspacing=0 cellpadding=0>");
	$.a("<tr class=MTitle><td><div style=\"float:left\">" + $lang.quickStr + "</div>");
	if (!A) {
		$.a("<div style=\"float:right;cursor:pointer\" onclick=\"hideSel();hide($d.qsDivSel);\">\xd7</div>");
	}
	$.a("</td></tr>");
	for (var B = 0; B < this.QS.length; B++) {
		if (this.QS[B]) {
			$.a("<tr><td nowrap='nowrap' class='menu' onmouseover=\"this.className='menuOn'\" onmouseout=\"this.className='menu'\" onmousedown=\"");
			$.a("hideSel();hide($d.qsDivSel);day_Click(" + this.QS[B].y + ", " + this.QS[B].M + ", " + this.QS[B].d + "," + this.QS[B].H + "," + this.QS[B].m + "," + this.QS[B].s + ");\">");
			$.a("&nbsp;" + this.getDateStr(null, this.QS[B]));
			$.a("</td></tr>");
		} else {
			$.a("<tr><td class='menu'>&nbsp;</td></tr>");
		}
	}
	$.a("</table>");
	_.innerHTML = $.j();
}, _dealFmt:function () {
	$(/yyyy|yyy|yy|y/);
	$(/MM|M/);
	$(/dd|d/);
	$(/HH|H/);
	$(/mm|m/);
	$(/ss|s/);
	$dp.has.sd = ($dp.has.y || $dp.has.M || $dp.has.d) ? true : false;
	$dp.has.st = ($dp.has.H || $dp.has.m || $dp.has.s) ? true : false;
	$dp.realFullFmt = $dp.realFullFmt.replace(/%Date/, $dp.realDateFmt).replace(/%Time/, $dp.realTimeFmt);
	if ($dp.has.sd) {
		if ($dp.has.st) {
			$dp.realFmt = $dp.realFullFmt;
		} else {
			$dp.realFmt = $dp.realDateFmt;
		}
	} else {
		$dp.realFmt = $dp.realTimeFmt;
	}
	function $(_) {
		var $ = (_ + "").slice(1, 2);
		$dp.has[$] = _.exec($dp.dateFmt) ? ($dp.has.minUnit = $, true) : false;
	}
}, initShowAndHide:function () {
	var $ = false;
	$dp.has.y ? ($ = true, show($d.yI, $d.navLeftImg, $d.navRightImg)) : hide($d.yI, $d.navLeftImg, $d.navRightImg);
	$dp.has.M ? ($ = true, show($d.MI, $d.leftImg, $d.rightImg)) : hide($d.MI, $d.leftImg, $d.rightImg);
	$ ? show($d.titleDiv) : hide($d.titleDiv);
	if ($dp.has.st) {
		show($d.tDiv);
		disHMS($d.HI, $dp.has.H);
		disHMS($d.mI, $dp.has.m);
		disHMS($d.sI, $dp.has.s);
	} else {
		hide($d.tDiv);
	}
	shorH($d.clearI, $dp.isShowClear);
	shorH($d.todayI, $dp.isShowToday);
	shorH($d.qsDiv, ($dp.has.d && $dp.qsEnabled));
	if ($dp.eCont) {
		hide($d.bDiv);
	}
}, mark:function (B) {
	if ($cMark) {
		$cMark = false;
		return;
	}
	var A = $dp.el, _ = $FF ? "class" : "className";
	if (B) {
		C(A);
	} else {
		switch ($dp.errDealMode) {
		  case 0:
			$cMark = true;
			if (confirm($lang.errAlertMsg)) {
				A[$dp.elProp] = this.oldValue;
				C(A);
			} else {
				$(A);
			}
			break;
		  case 1:
			A[$dp.elProp] = this.oldValue;
			C(A);
			break;
		  case 2:
			$(A);
			break;
		}
	}
	function C(A) {
		var $ = A.className.replace(/WdateFmtErr/g, "");
		if (A.className != $) {
			setA(A, _, $);
		}
	}
	function $($) {
		setA($, _, $.className + " WdateFmtErr");
	}
}, getP:function (C, _, $) {
	$ = $ || $dt;
	var E, B, D, A;
	switch (C.charAt(0)) {
	  case "w":
		A = getDay($);
		break;
	  case "D":
		B = [C];
		A = $lang.aWeekStr[getDay($) + 1];
		break;
	  case "W":
		A = getWeek($);
		break;
	  case "y":
		B = ["yyyy", "yyy", "yy", "y"];
		break;
	  default:
		break;
	}
	B = B || [C + C, C];
	_ = _ || B[0];
	for (E = 0; E < B.length; E++) {
		A = rtn(A, $[C]);
		D = B[E];
		if (_.indexOf(D) >= 0) {
			_ = _.replace(D, doStr((C == "y" && D.length < 4) ? (D.length < 3 ? $.y % 100 : ($.y + 2000 - $dp.yearOffset) % 1000) : A, D.length));
		}
	}
	return _;
}, getDateStr:function (_, $) {
	$ = $ || $dt;
	_ = _ || this.dateFmt;
	var A = "yMdHmswWD";
	for (var B = 0; B < A.length; B++) {
		_ = this.getP(A.charAt(B), _, $);
	}
	return _;
}, redraw:function () {
	$d.dDiv.innerHTML = this._fd();
	if (!$dp.has.d) {
		this._fillQS(true);
		showB($d.qsDivSel);
	} else {
		hide($d.qsDivSel);
	}
	this.autoSize();
}, autoSize:function () {
	var $ = parent.document.getElementsByTagName("iframe");
	for (var _ = 0; _ < $.length; _++) {
		if ($[_].contentWindow == window) {
			$[_].style.width = $d.offsetWidth + "px";
			$[_].style.height = $d.offsetHeight + "px";
		}
	}
}, pickDate:function (D, A, $, C, B, _) {
	$dt.y = rtn(D, $dt.y);
	$dt.M = rtn(A, $dt.M);
	$dt.d = rtn($, $dt.d);
	if ($dp.has.st) {
		$dt.H = rtn(C, $dt.H);
		$dt.m = rtn(B, $dt.m);
		$dt.s = rtn(_, $dt.s);
	}
	while (!this.isDate($dt) && $dt.d > 0) {
		$dt.d--;
	}
	if (!$dp.eCont) {
		this.update();
		if (this.checkValid($dt)) {
			$c.mark(true);
			hide($dp.dd);
		} else {
			$c.mark(false);
		}
	}
	if ($dp.onpicked) {
		$dp.onpicked.call($dp.el, $dp);
	} else {
		if (this.oldValue != $dp.el[$dp.elProp] && $dp.el.onchange) {
			fireEvent($dp.el, "change");
		}
	}
}, initBtn:function () {
	$d.clearI.onclick = function () {
		var $;
		if ($dp.onclearing) {
			$ = $dp.onclearing.call($dp.el, $dp);
		}
		if (!$) {
			$dp.el[$dp.elProp] = "";
			$c.setRealValue("");
			hide($dp.dd);
			if ($dp.oncleared) {
				$dp.oncleared.call($dp.el, $dp);
			} else {
				if ($c.oldValue != $dp.el[$dp.elProp] && $dp.el.onchange) {
					fireEvent($dp.el, "change");
				}
			}
		}
	};
	$d.okI.onclick = function () {
		day_Click();
	};
	if ($dp.el[$dp.elProp] == "") {
		$d.okI.value = $lang.okStr;
	} else {
		$d.okI.value = $lang.updateStr;
	}
	if (this.checkValid($tdt)) {
		$d.todayI.disabled = false;
		$d.todayI.onclick = function () {
			var $ = $c.tdate;
			day_Click($.y, $.M, $.d, $.H, $.m, $.s);
		};
	} else {
		$d.todayI.disabled = true;
	}
}, initQS:function () {
	var H, G, A, F, C = [], $ = 5, E = $dp.quickSel.length, _ = $dp.has.minUnit;
	if (E > $) {
		E = $;
	} else {
		if (_ == "m" || _ == "s") {
			C = [0, 15, 30, 45, 59, -60, -45, -30, -15, -1];
		} else {
			for (H = 0; H < $ * 2; H++) {
				C[H] = $dt[_] - $ + 1 + H;
			}
		}
	}
	for (H = G = 0; H < E; H++) {
		A = this.doCustomDate($dp.quickSel[H]);
		if (this.checkValid(A)) {
			this.QS[G++] = A;
		}
	}
	var B = "yMdHms", D = [1, 1, 1, 0, 0, 0];
	for (H = 0; H <= B.indexOf(_); H++) {
		D[H] = $dt[B.charAt(H)];
	}
	for (H = 0; G < $; H++) {
		if (H < C.length) {
			A = new DPDate(D[0], D[1], D[2], D[3], D[4], D[5]);
			A[_] = C[H];
			A.refresh();
			if (this.checkValid(A)) {
				this.QS[G++] = A;
			}
		} else {
			this.QS[G++] = null;
		}
	}
}};
function sb() {
	this.s = new Array();
	this.i = 0;
	this.a = function ($) {
		this.s[this.i++] = $;
	};
	this.j = function () {
		return this.s.join("");
	};
}
function getWeek($) {
	var _ = new Date($.y, $.M - 1, $.d), B = _.getDay();
	_.setDate(_.getDate() - (B + 6) % 7 + 3);
	var A = _.valueOf();
	_.setMonth(0);
	_.setDate(4);
	return Math.round((A - _.valueOf()) / (7 * 86400000)) + 1;
}
function getDay($) {
	var _ = new Date($.y, $.M - 1, $.d);
	return _.getDay();
}
function show() {
	setDisp(arguments, "");
}
function showB() {
	setDisp(arguments, "block");
}
function hide() {
	setDisp(arguments, "none");
}
function setDisp(_, $) {
	for (i = 0; i < _.length; i++) {
		_[i].style.display = $;
	}
}
function shorH(_, $) {
	$ ? show(_) : hide(_);
}
function disHMS(_, $) {
	if ($) {
		_.disabled = "";
	} else {
		_.disabled = "disabled";
		_.value = "00";
	}
}
function c_y(_, $) {
	if ($ || _ != $dt.y) {
		$dt.y = _;
		dealRange("y");
		$c.redraw();
	}
}
function c_M(_, $) {
	_ = makeInRange(_, 1, 12);
	if ($ || _ != $dt.M) {
		$dt.M = _;
		dealRange("M");
		$c.redraw();
	} else {
		s_M(_);
	}
}
function day_Click(F, A, $, D, B, _) {
	var C;
	if ($dp.onpicking) {
		C = $dp.onpicking.call($dp.el, $dp);
	}
	if (!C) {
		var E = $sdt.y == F && $sdt.M == A && $sdt.d == $;
		if (!E && arguments.length != 0) {
			$sdt.y = F;
			$sdt.M = A;
			s_y(F);
			s_M(A);
			c_d($, true);
		}
		if ($c.autoPickDate || E || arguments.length == 0) {
			$c.pickDate(F, A, $, D, B, _);
		}
	}
}
function c_d($, _) {
	if (_ || $ != $dt.d) {
		$dt.d = $;
		dealRange("d");
		$c.redraw();
	}
}
function c_H(_, $) {
	_ = makeInRange(_, 0, 23);
	if ($ || _ != $dt.H) {
		$dt.H = _;
		dealRange("H");
	}
}
function c_m(_, $) {
	_ = makeInRange(_, 0, 59);
	if ($ || _ != $dt.m) {
		$dt.m = _;
		dealRange("m");
	}
}
function c_s(_, $) {
	_ = makeInRange(_, 0, 59);
	if ($ || _ != $dt.s) {
		$dt.s = _;
		dealRange("s");
	}
}
function dealRange(type) {
	var func, rv, v;
	func = "s_" + type + "($dt." + type + ")";
	rv = $c.checkRange();
	if (rv == 0) {
		eval(func);
	} else {
		if (rv < 0) {
			_setAll($c.minDate);
		} else {
			if (rv > 0) {
				_setAll($c.maxDate);
			}
		}
	}
	function _setAll($) {
		s_y($.y);
		s_M($.M);
		s_d($.d);
		if ($dp.has.st) {
			s_H($.H);
			s_m($.m);
			s_s($.s);
		}
	}
}
function s_y($) {
	$dt.y = $d.yI.value = $;
}
function s_M($) {
	$dt.M = $;
	setA($d.MI, "realValue", $);
	$d.MI.value = $lang.aMonStr[$ - 1];
}
function s_d($) {
	$sdt.d = $dt.d = $;
}
function s_H($) {
	$dt.H = $d.HI.value = $;
}
function s_m($) {
	$dt.m = $d.mI.value = $;
}
function s_s($) {
	$dt.s = $d.sI.value = $;
}
function setA(A, _, $) {
	if (A.setAttribute) {
		A.setAttribute(_, $);
	}
}
function getA(_, $) {
	return _.getAttribute($);
}
function makeInRange(_, $, A) {
	if (_ < $) {
		_ = $;
	} else {
		if (_ > A) {
			_ = A;
		}
	}
	return _;
}
function attachTabEvent($, _) {
	$.attachEvent("onkeydown", function () {
		var $ = event, A = ($.which == undefined) ? $.keyCode : $.which;
		if (A == 9) {
			_();
		}
	});
}
function doStr($, _) {
	$ = $ + "";
	while ($.length < _) {
		$ = "0" + $;
	}
	return $;
}
function hideSel() {
	hide($d.yD, $d.MD, $d.HD, $d.mD, $d.sD);
}
function updownEvent($) {
	if ($c.currFocus == undefined) {
		$c.currFocus = $d.mI;
	}
	switch ($c.currFocus) {
	  case $d.HI:
		c_H($dt.H + $);
		break;
	  case $d.mI:
		c_m($dt.m + $);
		break;
	  case $d.sI:
		c_s($dt.s + $);
		break;
	}
}
function DPDate(D, A, $, C, B, _) {
	this.loadDate = function (E, B, _, D, C, A) {
		var $ = new Date();
		this.y = pIntDef(E, $.getFullYear());
		this.M = pIntDef(B, $.getMonth() + 1);
		this.d = pIntDef(_, $.getDate());
		this.H = pIntDef(D, $.getHours());
		this.m = pIntDef(C, $.getMinutes());
		this.s = pIntDef(A, $.getSeconds());
	};
	this.loadFromDate = function ($) {
		if ($ == null) {
			return;
		}
		this.loadDate($.y, $.M, $.d, $.H, $.m, $.s);
	};
	this.coverDate = function (E, B, _, D, C, A) {
		var $ = new Date();
		this.y = pIntDef(this.y, rtn(E, $.getFullYear()));
		this.M = pIntDef(this.M, rtn(B, $.getMonth() + 1));
		this.d = $dp.has.d ? pIntDef(this.d, rtn(_, $.getDate())) : 1;
		this.H = pIntDef(this.H, rtn(D, $.getHours()));
		this.m = pIntDef(this.m, rtn(C, $.getMinutes()));
		this.s = pIntDef(this.s, rtn(A, $.getSeconds()));
	};
	this.compareWith = function ($, C) {
		var A = "yMdHms", _, B;
		C = A.indexOf(C);
		C = C >= 0 ? C : 5;
		for (var D = 0; D <= C; D++) {
			B = A.charAt(D);
			_ = this[B] - $[B];
			if (_ > 0) {
				return 1;
			} else {
				if (_ < 0) {
					return -1;
				}
			}
		}
		return 0;
	};
	this.refresh = function () {
		var $ = new Date(this.y, this.M - 1, this.d, this.H, this.m, this.s);
		this.y = $.getFullYear();
		this.M = $.getMonth() + 1;
		this.d = $.getDate();
		this.H = $.getHours();
		this.m = $.getMinutes();
		this.s = $.getSeconds();
		return !isNaN(this.y);
	};
	this.loadDate(D, A, $, C, B, _);
}
function pInt($) {
	return parseInt($, 10);
}
function pIntDef(_, $) {
	_ = pInt(_);
	if (isNaN(_)) {
		_ = $;
	}
	return _;
}
function rtn($, _) {
	return $ == null ? _ : $;
}
function fireEvent(A, $) {
	if ($IE) {
		A.fireEvent("on" + $);
	} else {
		var _ = document.createEvent("HTMLEvents");
		_.initEvent($, true, true);
		A.dispatchEvent(_);
	}
}

